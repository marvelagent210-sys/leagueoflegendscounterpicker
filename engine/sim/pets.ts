/**
 * Pets: units a champion summons or places (Heimerdinger's turrets, Yorick's Mist Walkers,
 * Illaoi's Tentacles, Gangplank's Powder Kegs). Each stands on the line with its own health
 * and resistances; pets that move walk toward the enemy champion, and pets that attack hit
 * it whenever it is in reach, their damage computed from their owner's stats. The enemy can
 * attack them with basic attacks (see behavior.ts for when it does), and damaging areas hit
 * their hitboxes. Champion-specific workings (beam charge, fuses, commands) live in the kits.
 */
import { type DamageType, effectiveResist, mitigate } from "../rules/damage";
import { toTicks } from "../rules/time";
import { applyEffect, canTarget, hookContext, inStasis, isUntargetable, log, notifyKill } from "./combat";
import { CC_RULES, type CCType } from "../rules/crowdControl";
import { derive, evaluate, hasState } from "./derived";
import { petAttackEffects, petCombatHit } from "./petCombat";
import { petFormulaTarget } from "./petTarget";
import { projectileAuraBlocked } from "./projectileBlock";
import type { Effect, PetDamageCategory, PetSpec } from "./spec";
import { type Pet, type PetMissile, type Side, type Unit, type World, other } from "./state";

/** Places a pet of `owner`'s at `x`; `text` says who placed it when that isn't the owner (a Spirit pulled out of its champion). */
export function spawnPet(world: World, owner: Unit, spec: PetSpec, x: number, text?: { side: Side; text: string }): Pet {
  const targetClass = spec.targetClass ?? owner.spec.petTargetClasses?.[spec.name];
  if (targetClass !== undefined && spec.targetClass === undefined) spec = { ...spec, targetClass };
  const pet: Pet = {
    id: world.nextId++,
    owner: owner.side,
    spec,
    x,
    hp: spec.hp,
    endTick: Number.isFinite(spec.duration) ? world.tick + toTicks(spec.duration) : Number.POSITIVE_INFINITY,
    nextAttackTick: world.tick,
    statuses: [],
    memory: {},
  };
  world.pets.push(pet);
  log(world, text?.side ?? owner.side, text?.text ?? `places ${spec.name}`);
  return pet;
}

export function petsOf(world: World, side: Side, kind?: string): Pet[] {
  return world.pets.filter((p) => p.owner === side && (kind === undefined || p.spec.kind === kind));
}

/** Edge-to-edge distance between a unit and a pet. */
export function petDistance(unit: Unit, pet: Pet): number {
  return Math.abs(unit.x - pet.x) - unit.spec.base.radius - pet.spec.radius;
}

function removePet(world: World, pet: Pet, byOwner: boolean): void {
  world.pets = world.pets.filter((p) => p !== pet);
  const owner = world.units[pet.owner];
  const hook = owner.spec.hooks?.onPetDeath;
  if (hook && owner.alive) hook({ ...hookContext(world, owner), pet, byOwner });
}

/**
 * Damage to a pet from `attacker`: a basic attack (`attack`) or anything else. Pets that count
 * hits lose 1 to each champion basic attack and ignore the rest.
 */
export function damagePet(world: World, attacker: Unit, pet: Pet, raw: number, type: DamageType, attack: boolean, ability?: string, category: PetDamageCategory = attack ? "basic" : "singleTarget", packetScale = 1): number {
  if (!world.pets.includes(pet)) return 0;
  const target = petFormulaTarget(pet, attacker, world.tick);
  const outsideGuard = target.statuses.some((status) => status.kind === "state" && status.key === "invulnerableFar" && Math.abs(attacker.x - target.x) > status.value + 1e-6);
  // Existing persistent damage can continue through untargetability, just as on champions.
  if (hasState(target, "invulnerable") || outsideGuard || inStasis(target)) return 0;
  let amount: number;
  if (attack && attacker.petId === undefined && pet.spec.diesToChampionAttack) {
    amount = Math.max(0, pet.hp);
  } else if (pet.spec.fixedDamage) {
    const table = pet.spec.fixedDamage;
    amount = (attacker.petId !== undefined && attack ? table.pet ?? 0 : attack ? (attacker.spec.attack.ranged ? table.rangedBasic : table.meleeBasic) ?? table.basic ?? 0 : table[category] ?? 0) * packetScale;
  } else if (pet.spec.hitPoints) {
    if (!attack) return 0;
    amount = 1;
  } else {
    const a = derive(attacker), p = derive(target);
    const resist = type === "physical" ? effectiveResist(p.armor, p.armorReduction, { flat: a.lethality, percent: a.armorPen, bonusPercent: a.bonusArmorPen }) : type === "magic" ? effectiveResist(p.mr, p.mrReduction, { flat: a.magicPen, percent: a.magicPenPercent }) : 0;
    amount = mitigate(raw, type, resist, { dealt: a.damageDealt, received: [...p.damageReduction, ...(type === "physical" ? p.physicalReduction : type === "magic" ? p.magicReduction : [])] });
    if (attack && !attacker.spec.attack.ranged) amount *= pet.spec.meleeAttackTaken ?? 1;
  }
  const before = pet.hp;
  pet.hp -= amount;
  log(world, attacker.side, `hits ${pet.spec.name} for ${Math.round(amount)}${pet.hp <= 0 ? ", destroying it" : ""}`);
  pet.spec.onDamaged?.({ world, pet, attacker, raw, dealt: amount, before, damageType: type, attack, ...(ability ? { ability } : {}) });
  if (pet.hp <= 0 && world.pets.includes(pet)) { notifyKill(world, attacker, pet, { ...(ability ? { ability } : {}), persistent: category === "persistent" }); removePet(world, pet, attacker.side === pet.owner); }
  return amount;
}

/** A protected pet drops only the actions and projectiles actually aimed at that pet. */
function dropPetTargeting(world: World, pet: Pet, dropMissiles: boolean, stasis: boolean): void {
  if (dropMissiles) {
    world.missiles = world.missiles.filter((missile) => !(missile.pet === pet.id && missile.homing && (!missile.hitsUntargetable || stasis)));
    if (world.petMissiles) world.petMissiles = world.petMissiles.filter((missile) => typeof missile.target === "number" || missile.target.pet !== pet.id);
  }
  for (const unit of world.units) {
    if (unit.side === pet.owner) continue;
    for (const action of [unit.action, unit.pendingAttack]) {
      if (action?.kind !== "windup" || action.pet !== pet.id || (action.hitsUntargetable && !stasis)) continue;
      if (unit.action === action) unit.action = undefined;
      if (unit.pendingAttack === action) delete unit.pendingAttack;
      unit.attackReadyTick = world.tick;
    }
  }
  for (const attacker of world.pets) {
    if (attacker.owner !== pet.owner && typeof attacker.windup?.target !== "number" && attacker.windup?.target.pet === pet.id) delete attacker.windup;
  }
}

/** Effects applied to the actual pet: its CC and clocks never belong to its owner. */
export function petEffects(world: World, caster: Unit, pet: Pet, effects: readonly Effect[], category: PetDamageCategory = "singleTarget", ability?: string, scale = 1): void {
  const sourceAbility = caster.spec.abilities.find((spec) => spec.key === ability || spec.name === ability);
  const context = { scale, ...(sourceAbility ? { ability: sourceAbility } : {}) };
  for (const effect of effects) {
    if (!world.pets.includes(pet) || pet.spec.untargetable) break;
    const target = petFormulaTarget(pet, caster, world.tick);
    if (caster.side !== pet.owner && isUntargetable(target, caster)) break;
    if (effect.type === "damage") {
      const amount = Math.max(effect.amountFor?.(caster, target) ?? evaluate(effect.amount, caster, target), effect.minimum ? evaluate(effect.minimum, caster, target) : 0);
      const packetCategory = effect.petDamageCategory ?? (effect.persistent ? "persistent" : category);
      const areaScale = packetCategory === "area" || packetCategory === "persistent" ? pet.spec.areaTaken ?? 1 : 1;
      if (amount > 0) damagePet(world, caster, pet, amount * areaScale * scale, effect.damageType, false, effect.label ?? ability, packetCategory, scale);
    } else if (effect.type === "cc") {
      if (pet.spec.ccImmune?.includes(effect.cc)) continue;
      delete target.petId;
      applyEffect(world, caster, target, effect, context);
      pet.statuses = target.statuses;
      // A disabled pet loses a cancellable windup; blindness is captured at declaration.
      if (["stun", "sleep", "suppression", "airborne", "charm", "fear", "flee", "taunt", "disarm"].includes(effect.cc)) delete pet.windup;
    } else if (effect.type === "dot") {
      delete target.petId;
      applyEffect(world, caster, target, effect, context);
      pet.statuses = target.statuses;
    } else if (effect.type === "execute") {
      if (hasState(target, "invulnerable")) continue;
      if (pet.hp <= evaluate(effect.threshold, caster, target)) {
        const before = pet.hp;
        pet.hp = 0;
        pet.spec.onDamaged?.({ world, pet, attacker: caster, raw: before, dealt: before, before, damageType: "true", attack: false, ...(ability ? { ability } : {}) });
        if (pet.hp <= 0 && world.pets.includes(pet)) { notifyKill(world, caster, pet, { ...(ability ? { ability } : {}), persistent: category === "persistent" }); removePet(world, pet, caster.side === pet.owner); }
      }
    } else if (effect.type === "state" || effect.type === "stat" || effect.type === "cleanse" || effect.type === "mark") {
      delete target.petId;
      applyEffect(world, caster, target, effect, context);
      pet.statuses = target.statuses;
      if (effect.type === "state" && ["untargetable", "stasis", "invisible"].includes(effect.state)) {
        dropPetTargeting(world, pet, effect.state !== "invisible", effect.state === "stasis");
      }
    }
  }
}

/**
 * An area ability's damage to the enemy's pets in it (`from` to `to` on the line, reaching
 * their hitboxes): dynamic damage and minimum formulas read that pet's actual available
 * stats, times its share of area damage. Pets that count hits (Tentacles,
 * Powder Kegs) and untargetable ones aren't hurt.
 */
export function areaOnPets(world: World, caster: Unit, from: number, to: number, effects: Effect[]): void {
  if (world.pets.length === 0) return;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  for (const pet of [...world.pets]) {
    if (pet.owner === caster.side || pet.spec.hitPoints || pet.spec.untargetable) continue;
    if (pet.x + pet.spec.radius < lo || pet.x - pet.spec.radius > hi) continue;
    petEffects(world, caster, pet, effects, "area");
  }
}

/** Destroys one of the unit's own pets (a keg it detonates, a turret replaced). */
export function destroyPet(world: World, pet: Pet): void {
  if (world.pets.includes(pet)) removePet(world, pet, true);
}

/**
 * A pet's hit on the enemy champion: attack-like hits are dodged, parried, blocked and blinded
 * like basic attacks; the others are stopped by spell shields and parries like abilities.
 */
export function petHit(world: World, pet: Pet, target: Unit | Pet, effects: Effect[], attackLike: boolean, blinded = false): boolean { return petCombatHit(world, pet, target, effects, attackLike, blinded); }

/** Closest visible target; ties prefer the enemy champion, then stable pet id. */
export function nearestPetTarget(world: World, pet: Pet): Unit | Pet | undefined {
  const actor = petFormulaTarget(pet, world.units[pet.owner], world.tick);
  const enemy = world.units[other(pet.owner)];
  const candidates: Array<Unit | Pet> = [...(enemy.alive && canTarget(enemy, actor) ? [enemy] : []), ...world.pets.filter((target) => target.owner !== pet.owner && canTargetPet(target, actor, world.tick))];
  return candidates.sort((a, b) => Math.abs(a.x - pet.x) - ("owner" in a ? a.spec.radius : a.spec.base.radius) - Math.abs(b.x - pet.x) + ("owner" in b ? b.spec.radius : b.spec.base.radius))[0];
}

/** A pet's dynamic visibility and protection belong to the actual pet. */
export function canTargetPet(pet: Pet, by: Unit, tick?: number): boolean {
  return pet.hp > 0 && !pet.spec.untargetable && canTarget(petFormulaTarget(pet, by, tick), by);
}

const resolvePetTarget = (world: World, target: Side | { pet: number }) => typeof target === "number" ? world.units[target] : world.pets.find((pet) => pet.id === target.pet);
const targetRadius = (target: Unit | Pet) => "owner" in target ? target.spec.radius : target.spec.base.radius;
const petHasCC = (pet: Pet, key: CCType) => pet.statuses?.some((status) => status.kind === "cc" && status.key === key) ?? false;
function disabled(pet: Pet, action: "movement" | "attacking"): boolean { return pet.statuses?.some((status) => status.kind === "cc" && CC_RULES[status.key as CCType]?.[action] === "disabled") ?? false; }

/** Launched projectiles survive their pet, and can meet a projectile wall before impact. */
function advancePetMissiles(world: World): void {
  const keep: PetMissile[] = [];
  const snapshot = [...(world.petMissiles ?? [])];
  const initialIds = new Set(snapshot.map((missile) => missile.id));
  for (const missile of snapshot) {
    // Another contact can make a target untargetable and remove its pending missiles.
    if (!world.petMissiles?.some((current) => current.id === missile.id)) continue;
    const target = resolvePetTarget(world, missile.target);
    const pet = world.pets.find((candidate) => candidate.id === missile.pet) ?? missile.sourcePet;
    if (!target || !pet || ("alive" in target && !target.alive) || ("owner" in target && !world.pets.includes(target))) continue;
    const direction = target.x >= missile.x ? 1 : -1;
    const from = missile.x, remaining = Math.max(0, Math.abs(target.x - from) - targetRadius(target));
    missile.x += direction * Math.min(missile.perTick, remaining);
    const blocked = missile.projectile && (projectileAuraBlocked(world, missile.owner, from, missile.x) || world.zones.some((zone) => zone.kind === "projectileWall" && zone.owner !== missile.owner && zone.startTick <= world.tick && zone.endTick > world.tick && Math.max(Math.min(from, missile.x), zone.x - zone.radius) <= Math.min(Math.max(from, missile.x), zone.x + zone.radius)));
    if (blocked) { log(world, other(missile.owner), `blocks a projectile (${pet.spec.name})`); continue; }
    if (remaining <= missile.perTick + 1e-6) {
      petHit(world, pet, target, missile.effects, missile.attackLike ?? true, missile.blinded);
    }
    else keep.push(missile);
  }
  const current = world.petMissiles ?? [];
  const remainingIds = new Set(current.map((missile) => missile.id));
  world.petMissiles = [...keep.filter((missile) => remainingIds.has(missile.id)), ...current.filter((missile) => !initialIds.has(missile.id))];
}

function launchPetAttack(world: World, pet: Pet): void {
  const windup = pet.windup, attack = pet.spec.attack;
  if (!windup || !attack) return;
  delete pet.windup;
  const target = resolvePetTarget(world, windup.target);
  if (!target || ("alive" in target && !target.alive) || ("owner" in target && !world.pets.includes(target))) return;
  if (!canTarget("owner" in target ? petFormulaTarget(target, world.units[pet.owner], world.tick) : target, petFormulaTarget(pet, world.units[pet.owner], world.tick))) return;
  if (attack.missileSpeed) {
    (world.petMissiles ??= []).push({ id: world.nextId++, owner: pet.owner, pet: pet.id, target: windup.target, x: pet.x, perTick: attack.missileSpeed / 30, projectile: attack.projectile ?? true, effects: windup.effects, blinded: windup.blinded, attackLike: attack.attackLike, sourcePet: { ...pet, memory: { ...pet.memory }, ...(pet.statuses ? { statuses: pet.statuses.map((status) => ({ ...status })) } : {}) } });
  } else petHit(world, pet, target, windup.effects, attack.attackLike, windup.blinded);
}

/** Pets expire, walk toward the enemy, and attack it when it is in reach. */
export function advancePets(world: World): void {
  advancePetMissiles(world);
  if (world.pets.length === 0) return;
  for (const pet of [...world.pets]) {
    if (!world.pets.includes(pet)) continue;
    const owner = world.units[pet.owner];
    if (world.tick >= pet.endTick || !owner.alive) {
      world.pets = world.pets.filter((p) => p !== pet);
      continue;
    }
    for (const status of pet.statuses ?? []) {
      if (status.kind !== "dot" || !status.dot || world.tick < status.dot.nextTick || world.tick > status.endTick) continue;
      damagePet(world, world.units[status.source], pet, status.dot.perHit, status.dot.damageType, false, status.dot.label, "persistent");
      status.dot.nextTick += status.dot.intervalTicks;
    }
    if (!world.pets.includes(pet)) continue;
    pet.statuses = pet.statuses?.filter((status) => status.endTick > world.tick || (status.kind === "dot" && status.endTick === world.tick));
    if (pet.windup && world.tick >= pet.windup.launchTick) launchPetAttack(world, pet);
    const enemy = pet.spec.target ? pet.spec.target(world, pet) : world.units[other(pet.owner)];
    if (!enemy || ("alive" in enemy && !enemy.alive) || ("owner" in enemy && enemy.hp <= 0)) continue;
    const attack = pet.spec.attack;
    const reach = attack?.range ?? 0;
    const gap = Math.abs(enemy.x - pet.x) - targetRadius(enemy);
    const leash = pet.spec.leash;
    const movement = pet.spec.moveSpeed <= 0 || disabled(pet, "movement") ? 0 : derive(petFormulaTarget(pet, owner, world.tick)).moveSpeed;
    if (movement > 0 && leash !== undefined && Math.abs(owner.x - pet.x) > leash) {
      // Too far from its owner: back toward it, and no attacks on the way.
      const dir = owner.x > pet.x ? 1 : -1;
      pet.x += dir * Math.min(movement / 30, Math.abs(owner.x - pet.x) - leash);
      continue;
    }
    if (movement > 0 && gap > reach) {
      const dir = enemy.x > pet.x ? 1 : -1;
      let step = Math.min(movement / 30, gap - reach);
      // No farther than its leash allows.
      if (leash !== undefined) step = Math.max(0, Math.min(step, leash - dir * (pet.x - owner.x)));
      pet.x += dir * step;
    }
    if (!attack || pet.windup || disabled(pet, "attacking") || world.tick < pet.nextAttackTick || Math.abs(enemy.x - pet.x) - targetRadius(enemy) > reach) continue;
    const victim = "owner" in enemy ? petFormulaTarget(enemy, owner, world.tick) : enemy;
    if (!canTarget(victim, petFormulaTarget(pet, owner, world.tick))) continue;
    const cripple = (pet.statuses ?? []).filter((status) => status.kind === "cc" && status.key === "cripple").reduce((factor, status) => factor * (1 - Math.min(1, Math.max(0, status.value))), 1);
    pet.nextAttackTick = world.tick + Math.max(1, toTicks(attack.interval / Math.max(0.01, cripple)));
    pet.windup = { target: "owner" in enemy ? { pet: enemy.id } : enemy.side, launchTick: world.tick + toTicks(attack.windup ?? 0), blinded: petHasCC(pet, "blind"), effects: petAttackEffects(owner, victim, attack.effects) };
    if (pet.windup.launchTick <= world.tick) launchPetAttack(world, pet);
  }
}

/** Whether a unit can start a basic attack on a pet: in range, targetable, not its own (unless it detonates it). */
export function canAttackPet(unit: Unit, pet: Pet, range: number): boolean {
  if (!canTargetPet(pet, unit)) return false;
  return petDistance(unit, pet) <= range + 1e-6;
}
