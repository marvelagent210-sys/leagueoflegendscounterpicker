/**
 * Pets: units a champion summons or places (Heimerdinger's turrets, Yorick's Mist Walkers,
 * Illaoi's Tentacles, Gangplank's Powder Kegs). Each stands on the line with its own health
 * and resistances; pets that move walk toward the enemy champion, and pets that attack hit
 * it whenever it is in reach, their damage computed from their owner's stats. The enemy can
 * attack them with basic attacks (see behavior.ts for when it does), and damaging areas hit
 * their hitboxes. Champion-specific workings (beam charge, fuses, commands) live in the kits.
 */
import { type DamageType, effectiveResist, mitigate } from "../rules/damage";
import { absorbWithShields, type Shield } from "../rules/defense";
import { toTicks } from "../rules/time";
import { applyEffect, canTarget, endForcedMovement, heal, hookContext, inStasis, isUntargetable, log, notifyActualMovement, notifyKill, observeBeforeDamage, observeDamage, observeOwnedPetAttack, withMovementTransition } from "./combat";
import type { VisibilityPolicy } from "./combat";
import { healthProtection } from "./healthProtection";
import { CC_RULES, type CCType } from "../rules/crowdControl";
import { derive, evaluate, hasState, statIsActive } from "./derived";
import { petAttackEffects, petCombatHit } from "./petCombat";
import { petFormulaTarget } from "./petTarget";
import { projectileAuraBlocked, projectileBlockPoint, projectileInterceptPoint } from "./projectileBlock";
import { terrainLimit } from "./terrain";
import type { DamageReport, Effect, PetDamageCategory, PetSpec } from "./spec";
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
  let target = petFormulaTarget(pet, attacker, world.tick);
  const outsideGuard = target.statuses.some((status) => status.kind === "state" && status.key === "invulnerableFar" && Math.abs(attacker.x - target.x) > status.value + 1e-6);
  // Existing persistent damage can continue through untargetability, just as on champions.
  let protection = healthProtection(world, pet);
  if (hasState(target, "invulnerable") || hasState(target, "parry") || outsideGuard || inStasis(target) || protection.invulnerable) return 0;
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
  if (observeBeforeDamage(world, attacker, target, amount, raw, type, attack, category === "persistent", ability, pet)) {
    if (!world.pets.includes(pet) || pet.hp <= 0) return 0;
    target = petFormulaTarget(pet, attacker, world.tick);
    protection = healthProtection(world, pet);
    if (hasState(target, "invulnerable") || hasState(target, "parry") || inStasis(target) || protection.invulnerable) return 0;
  }
  const before = pet.hp;
  const packetAfterMitigation = amount;
  const shields = (pet.statuses ?? []).filter(status => status.kind === "shield" && status.endTick > world.tick);
  const views: Shield[] = shields.map(status => ({ amount: status.value, type: status.shieldType ?? "normal", endTick: status.endTick, ...(status.priority ? { priority: true } : {}), ...(status.firstDamageBypass !== undefined ? { firstDamageBypass: status.firstDamageBypass } : {}) }));
  const unshielded = absorbWithShields(amount, type, views);
  const absorbedShields: NonNullable<DamageReport["absorbedShields"]>[number][] = [];
  shields.forEach((status, index) => {
    const amount = status.value - views[index]!.amount;
    if (amount > 0) absorbedShields.push(Object.freeze({ shield: Object.freeze({ ...status }), amount }));
    status.value = views[index]!.amount; delete status.firstDamageBypass;
  });
  pet.statuses = (pet.statuses ?? []).filter(status => status.kind !== "shield" || (status.endTick > world.tick && status.value > 0));
  const floor = Math.max(protection.minimumHealth, target.statuses.find((status) => status.kind === "state" && status.key === "minimumHealth")?.value ?? 0);
  const healthDamage = floor > 0 ? Math.min(unshielded, Math.max(0, before - floor)) : unshielded;
  const absorbed = amount - unshielded;
  // The same ordinary sleep rule applies to this actual body, including damage
  // absorbed by shields; persistent damage and packets of at most ten spare it.
  if (category !== "persistent" && packetAfterMitigation > 10 && pet.statuses?.some(status => status.kind === "cc" && status.key === "sleep")) {
    pet.statuses = pet.statuses.filter(status => status.kind !== "cc" || status.key !== "sleep");
    log(world, pet.owner, `${pet.spec.name} wakes up`);
  }
  amount = absorbed + healthDamage;
  pet.hp -= healthDamage;
  const hpAfterPacket = pet.hp;
  log(world, attacker.side, `hits ${pet.spec.name} for ${Math.round(amount)}${absorbed > 0 ? ` (${Math.round(absorbed)} absorbed)` : ""}${pet.hp <= 0 ? ", destroying it" : ""}`);
  const hit = { world, pet, attacker, raw, dealt: healthDamage, before, damageType: type, attack, absorbed: 0, ...(ability ? { ability } : {}) };
  pet.spec.onDamaged?.(hit);
  const refunded = Math.min(healthDamage, Math.max(0, pet.hp - hpAfterPacket));
  const customAbsorbed = Math.min(refunded, Math.max(0, hit.absorbed));
  const removed = Math.max(0, Math.max(0, before) - Math.max(0, pet.hp));
  target.hp = pet.hp;
  target.alive = pet.hp > 0;
  target.statuses = pet.statuses ?? [];
  target.memory = pet.memory;
  observeDamage(world, attacker, target, {
    amount: removed, absorbed: absorbed + customAbsorbed, mitigated: packetAfterMitigation - refunded + customAbsorbed, raw,
    ...(absorbedShields.length ? { absorbedShields: Object.freeze(absorbedShields) } : {}),
    damageType: type, persistent: category === "persistent", ...(ability ? { ability } : {}),
    ...(attacker.petId !== undefined ? { petSource: true } : {}),
  }, attack, pet);
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
export function petEffects(world: World, caster: Unit, pet: Pet, effects: readonly Effect[], category: PetDamageCategory = "singleTarget", ability?: string, scale = 1, originX?: number): boolean | void {
  const sourceAbility = caster.spec.abilities.find((spec) => spec.key === ability || spec.name === ability);
  const context = { scale, ...(sourceAbility ? { ability: sourceAbility } : {}), ...(originX !== undefined ? { originX } : {}) };
  let ccAccepted: boolean | undefined;
  for (const effect of effects) {
    if (!world.pets.includes(pet) || pet.spec.untargetable) break;
    if (effect.type === "state" && pet.spec.stateImmune?.includes(effect.state)) continue;
    const target = petFormulaTarget(pet, caster, world.tick);
    if (caster.side !== pet.owner && isUntargetable(target, caster)) break;
    if (effect.type === "damage") {
      const amount = Math.max(effect.amountFor?.(caster, target) ?? evaluate(effect.amount, caster, target), effect.minimum ? evaluate(effect.minimum, caster, target) : 0);
      const packetCategory = effect.petDamageCategory ?? (effect.persistent ? "persistent" : category);
      const areaScale = packetCategory === "area" || packetCategory === "persistent" ? pet.spec.areaTaken ?? 1 : 1;
      if (amount > 0) damagePet(world, caster, pet, amount * areaScale * scale, effect.damageType, false, effect.label ?? ability, packetCategory, scale);
    } else if (effect.type === "cc") {
      if (pet.spec.ccImmune?.includes(effect.cc)) { ccAccepted = false; continue; }
      delete target.petId;
      ccAccepted = applyEffect(world, caster, target, effect, context) === true;
      pet.statuses = target.statuses;
      // A disabled pet loses a cancellable windup; blindness is captured at declaration.
      if (ccAccepted && ["disabled", "uncontrollable"].includes(CC_RULES[effect.cc].attacking)) delete pet.windup;
    } else if (effect.type === "displace") {
      if (pet.spec.ccImmune?.includes("airborne")) { ccAccepted = false; continue; }
      delete target.petId;
      // The view clones forced movement. Only replacement of that view-local pointer
      // proves the effect changed motion; a denied or zero-distance control does not.
      const previous = target.forced;
      withMovementTransition(world, () => {
        ccAccepted = applyEffect(world, caster, target, effect, context) === true;
        pet.statuses = target.statuses;
        if (target.forced !== previous) {
          endForcedMovement(world, petFormulaTarget(pet, world.units[pet.owner], world.tick), pet);
          if (target.forced) pet.forced = target.forced;
          else delete pet.forced;
        }
      });
      if (ccAccepted) delete pet.windup;
    } else if (effect.type === "dot") {
      delete target.petId;
      applyEffect(world, caster, target, effect, context);
      pet.statuses = target.statuses;
    } else if (effect.type === "heal") {
      heal(world, target, evaluate(effect.amount, caster, target) * scale);
    } else if (effect.type === "execute") {
      const protection = healthProtection(world, pet);
      if (hasState(target, "invulnerable") || protection.invulnerable) continue;
      if (pet.hp <= evaluate(effect.threshold, caster, target)) {
        const before = pet.hp;
        const legacyFloor = target.statuses.find((status) => status.kind === "state" && status.key === "minimumHealth")?.value;
        const floor = Math.max(protection.minimumHealth, legacyFloor === undefined ? 0 : Math.min(legacyFloor, Math.max(0, effect.minimumHealthFloor ?? legacyFloor)));
        pet.hp = Math.min(before, floor);
        pet.spec.onDamaged?.({ world, pet, attacker: caster, raw: before, dealt: before - pet.hp, before, damageType: "true", attack: false, ...(ability ? { ability } : {}) });
        if (pet.hp <= 0 && world.pets.includes(pet)) { notifyKill(world, caster, pet, { ...(ability ? { ability } : {}), persistent: category === "persistent" }); removePet(world, pet, caster.side === pet.owner); }
      }
    } else if (effect.type === "shield" || effect.type === "state" || effect.type === "stat" || effect.type === "cleanse" || effect.type === "mark" || effect.type === "grievousWounds") {
      delete target.petId;
      applyEffect(world, caster, target, effect, context);
      pet.statuses = target.statuses;
      if (effect.type === "stat" && effect.stat === "health") pet.hp = target.hp;
      if (effect.type === "cleanse") {
        if (pet.forced && !target.forced) endForcedMovement(world, petFormulaTarget(pet, world.units[pet.owner], world.tick), pet);
        if (target.forced) pet.forced = target.forced;
        else delete pet.forced;
      }
      if (effect.type === "state" && ["untargetable", "stasis", "invisible"].includes(effect.state)) {
        if (effect.state === "stasis") delete pet.windup;
        dropPetTargeting(world, pet, effect.state !== "invisible", effect.state === "stasis");
      }
    }
  }
  return ccAccepted;
}

/**
 * An area ability's damage to the enemy's pets in it (`from` to `to` on the line, reaching
 * their hitboxes): dynamic damage and minimum formulas read that pet's actual available
 * stats, times its share of area damage. Pets that count hits (Tentacles,
 * Powder Kegs) and untargetable ones aren't hurt.
 */
export function areaOnPets(world: World, caster: Unit, from: number, to: number, effects: Effect[], scale = 1, originX?: number): void {
  if (world.pets.length === 0) return;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  for (const pet of [...world.pets]) {
    if (pet.owner === caster.side || pet.spec.hitPoints || pet.spec.untargetable) continue;
    if (pet.x + pet.spec.radius < lo || pet.x - pet.spec.radius > hi) continue;
    petEffects(world, caster, pet, effects, "area", undefined, scale, originX);
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
export function petHit(world: World, pet: Pet, target: Unit | Pet, effects: Effect[], attackLike: boolean, blinded = false): boolean {
  // Already launched missiles call petCombatHit directly and retain their entitlement.
  if (attackLike && (pet.carriedBy !== undefined || inStasis(petFormulaTarget(pet, world.units[pet.owner], world.tick)))) return false;
  return petCombatHit(world, pet, target, effects, attackLike, blinded);
}

/** Closest visible target; ties prefer the enemy champion, then stable pet id. */
export function nearestPetTarget(world: World, pet: Pet): Unit | Pet | undefined {
  const actor = petFormulaTarget(pet, world.units[pet.owner], world.tick);
  const enemy = world.units[other(pet.owner)];
  const owner = world.units[pet.owner];
  const candidates: Array<Unit | Pet> = [...(enemy.alive && canTarget(enemy, actor, owner) ? [enemy] : []), ...world.pets.filter((target) => target.owner !== pet.owner && canTargetPet(target, actor, world.tick, owner))];
  return candidates.sort((a, b) => Math.abs(a.x - pet.x) - ("owner" in a ? a.spec.radius : a.spec.base.radius) - Math.abs(b.x - pet.x) + ("owner" in b ? b.spec.radius : b.spec.base.radius))[0];
}

/** A pet's dynamic visibility and protection belong to the actual pet. */
export function canTargetPet(pet: Pet, by: Unit, tick?: number, camouflageObserver: Unit = by, policy?: VisibilityPolicy): boolean {
  return pet.hp > 0 && !pet.spec.untargetable && canTarget(petFormulaTarget(pet, by, tick), by, camouflageObserver, policy);
}

const resolvePetTarget = (world: World, target: Side | { pet: number }) => typeof target === "number" ? world.units[target] : world.pets.find((pet) => pet.id === target.pet);
const targetRadius = (target: Unit | Pet) => "owner" in target ? target.spec.radius : target.spec.base.radius;
const petHasCC = (pet: Pet, key: CCType) => pet.statuses?.some((status) => status.kind === "cc" && status.key === key) ?? false;
function disabled(pet: Pet, action: "movement" | "attacking"): boolean {
  return pet.carriedBy !== undefined || (pet.statuses?.some(status =>
    (status.key === "stasis" && (status.kind === "cc" || status.kind === "state"))
    || (status.kind === "cc" && CC_RULES[status.key as CCType]?.[action] === "disabled")) ?? false);
}

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
    const interceptedAt = missile.projectile ? projectileInterceptPoint(world, missile.owner, from, missile.x) : undefined;
    const destroyedAt = missile.projectile ? projectileBlockPoint(world, missile.owner, from, missile.x) : undefined;
    if (interceptedAt !== undefined && (destroyedAt === undefined || Math.abs(interceptedAt - from) < Math.abs(destroyedAt - from) - 1e-6)) {
      missile.x = interceptedAt;
      petCombatHit(world, pet, world.units[other(missile.owner)], missile.effects, missile.attackLike ?? true, missile.blinded, from);
      continue;
    }
    const blocked = missile.projectile && (projectileAuraBlocked(world, missile.owner, from, missile.x) || world.zones.some((zone) => zone.kind === "projectileWall" && zone.owner !== missile.owner && zone.startTick <= world.tick && zone.endTick > world.tick && Math.max(Math.min(from, missile.x), zone.x - zone.radius) <= Math.min(Math.max(from, missile.x), zone.x + zone.radius)));
    if (blocked) { log(world, other(missile.owner), `blocks a projectile (${pet.spec.name})`); continue; }
    if (remaining <= missile.perTick + 1e-6) {
      petCombatHit(world, pet, target, missile.effects, missile.attackLike ?? true, missile.blinded, from);
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
  if (disabled(pet, "attacking")) return;
  const target = resolvePetTarget(world, windup.target);
  if (!target || ("alive" in target && !target.alive) || ("owner" in target && !world.pets.includes(target))) return;
  if (!canTarget("owner" in target ? petFormulaTarget(target, world.units[pet.owner], world.tick) : target, petFormulaTarget(pet, world.units[pet.owner], world.tick), world.units[pet.owner])) return;
  if (attack.cosmetic) {
    pet.statuses = pet.statuses?.filter((status) => !(status.kind === "state" && status.key === "invisible"));
    return;
  }
  if (attack.missileSpeed) {
    (world.petMissiles ??= []).push({ id: world.nextId++, owner: pet.owner, pet: pet.id, target: windup.target, x: pet.x, perTick: attack.missileSpeed / 30, projectile: attack.projectile ?? true, effects: windup.effects, blinded: windup.blinded, attackLike: attack.attackLike, sourcePet: { ...pet, memory: { ...pet.memory }, ...(pet.statuses ? { statuses: pet.statuses.map((status) => ({ ...status })) } : {}) } });
  } else petHit(world, pet, target, windup.effects, attack.attackLike, windup.blinded);
}

/** Pets expire, walk toward the enemy, and attack it when it is in reach. */
export function advancePets(world: World): void {
  expirePetHealth(world);
  advancePetMissiles(world);
  if (world.pets.length === 0) return;
  for (const pet of [...world.pets]) {
    if (!world.pets.includes(pet)) continue;
    const owner = world.units[pet.owner];
    if (world.tick >= pet.endTick || (!owner.alive && !pet.spec.persistsAfterOwnerDeath)) {
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
    if (pet.carriedBy !== undefined) {
      const previous = pet.x;
      pet.x = world.units[pet.carriedBy].x;
      delete pet.windup;
      if (pet.forced) endForcedMovement(world, petFormulaTarget(pet, owner, world.tick), pet);
      notifyActualMovement(world, petFormulaTarget(pet, owner, world.tick), previous, { kind: "attached", endTick: world.tick, ended: false }, pet);
    }
    if (pet.forced && pet.forced.endTick <= world.tick) endForcedMovement(world, petFormulaTarget(pet, owner, world.tick), pet);
    if (pet.forced && !inStasis(petFormulaTarget(pet, owner, world.tick))) {
      const view = petFormulaTarget(pet, owner, world.tick);
      const previous = pet.x, forced = pet.forced;
      const opponent = world.units[other(pet.owner)];
      let dx = pet.forced.over || pet.forced.absolute ? pet.forced.perTick : -(opponent.x >= pet.x ? 1 : -1) * pet.forced.perTick;
      if (pet.forced.remaining !== undefined) { dx = Math.sign(dx) * Math.min(Math.abs(dx), pet.forced.remaining); pet.forced.remaining -= Math.abs(dx); }
      const limited = pet.forced.over ? dx : terrainLimit(world, view, dx, false);
      pet.x += limited;
      if (limited !== dx) delete pet.forced;
      view.x = pet.x;
      notifyActualMovement(world, view, previous, { kind: "forced", endTick: limited !== dx ? world.tick : forced.endTick,
        ended: limited !== dx, ...(forced.startTick !== undefined ? { startTick: forced.startTick } : {}), ...(forced.ability ? { ability: forced.ability } : {}) }, pet);
    }
    if (pet.windup && world.tick >= pet.windup.launchTick) launchPetAttack(world, pet);
    const fear = pet.statuses?.findLast(status => status.kind === "cc" && status.key === "fear");
    if (fear && !pet.forced && !disabled(pet, "movement")) {
      const origin = fear.fearOriginX ?? world.units[fear.source].x;
      const direction = Math.abs(pet.x - origin) <= 1e-6 ? (pet.owner === 0 ? -1 : 1) : Math.sign(pet.x - origin);
      const previous = pet.x, view = petFormulaTarget(pet, owner, world.tick);
      const speed = pet.spec.moveSpeed <= 0 ? 0 : pet.spec.ignoreOwnMoveSpeedModifiers ? pet.spec.moveSpeed : derive(view).moveSpeed;
      pet.x += terrainLimit(world, view, direction * speed / 30, true);
      notifyActualMovement(world, petFormulaTarget(pet, owner, world.tick), previous, { kind: "walk", endTick: world.tick, ended: true }, pet);
      continue;
    }
    const enemy = pet.spec.target ? pet.spec.target(world, pet) : world.units[other(pet.owner)];
    if (!enemy || ("alive" in enemy && !enemy.alive) || ("owner" in enemy && enemy.hp <= 0)) continue;
    const attack = pet.spec.attack;
    const reach = attack?.range ?? 0;
    const gap = Math.abs(enemy.x - pet.x) - targetRadius(enemy);
    const leash = pet.spec.leash;
    const movement = pet.forced || pet.spec.moveSpeed <= 0 || disabled(pet, "movement") ? 0 : pet.spec.ignoreOwnMoveSpeedModifiers ? pet.spec.moveSpeed : derive(petFormulaTarget(pet, owner, world.tick)).moveSpeed;
    if (movement > 0 && leash !== undefined && Math.abs(owner.x - pet.x) > leash) {
      // Too far from its owner: back toward it, and no attacks on the way.
      const dir = owner.x > pet.x ? 1 : -1;
      const previous = pet.x;
      pet.x += dir * Math.min(movement / 30, Math.abs(owner.x - pet.x) - leash);
      notifyActualMovement(world, petFormulaTarget(pet, owner, world.tick), previous, { kind: "walk", endTick: world.tick, ended: true }, pet);
      continue;
    }
    if (movement > 0 && gap > reach) {
      const dir = enemy.x > pet.x ? 1 : -1;
      let step = Math.min(movement / 30, gap - reach);
      // No farther than its leash allows.
      if (leash !== undefined) step = Math.max(0, Math.min(step, leash - dir * (pet.x - owner.x)));
      const previous = pet.x;
      pet.x += dir * step;
      notifyActualMovement(world, petFormulaTarget(pet, owner, world.tick), previous, { kind: "walk", endTick: world.tick, ended: true }, pet);
    }
    if (!attack || pet.windup || disabled(pet, "attacking") || world.tick < pet.nextAttackTick || Math.abs(enemy.x - pet.x) - targetRadius(enemy) > reach) continue;
    const victim = "owner" in enemy ? petFormulaTarget(enemy, owner, world.tick) : enemy;
    if (!canTarget(victim, petFormulaTarget(pet, owner, world.tick), owner)) continue;
    const cripple = pet.spec.ignoreOwnAttackSpeedSlows ? 1 : (pet.statuses ?? []).filter((status) => status.kind === "cc" && status.key === "cripple").reduce((factor, status) => factor * (1 - Math.min(1, Math.max(0, status.value))), 1);
    let bonusAS = 0, totalAS = 0;
    for (const status of pet.statuses ?? []) {
      if (status.kind !== "stat" || !statIsActive(status, pet.statuses ?? [])) continue;
      if (status.key === "attackSpeed") bonusAS += status.value;
      if (status.key === "attackSpeedMultiplier") totalAS += status.value;
    }
    // Keep the original arithmetic when no new rate modifier is present; a
    // reciprocal round trip can otherwise move an exact tick boundary.
    let interval = attack.interval / Math.max(0.01, cripple);
    if (bonusAS !== 0 || totalAS !== 0 || attack.attackSpeedCap !== undefined) {
      const baseRate = 1 / attack.interval;
      let factor = Math.max(0.01, (1 + (attack.attackSpeedRatio ?? baseRate) / baseRate * bonusAS) * Math.max(0, 1 + totalAS) * cripple);
      if (attack.attackSpeedCap !== undefined) factor = Math.min(factor, Math.max(0.01, attack.attackSpeedCap / baseRate));
      interval = attack.interval / factor;
    }
    pet.nextAttackTick = world.tick + Math.max(1, toTicks(interval));
    pet.windup = { target: "owner" in enemy ? { pet: enemy.id } : enemy.side, launchTick: world.tick + toTicks(attack.windup ?? 0), blinded: petHasCC(pet, "blind"), effects: petAttackEffects(owner, victim, attack.effects) };
    if (attack.attackLike && !attack.cosmetic) observeOwnedPetAttack(world, pet, victim, "owner" in enemy ? enemy : undefined);
    if (pet.windup && pet.windup.launchTick <= world.tick) launchPetAttack(world, pet);
  }
}

/** Temporary maximum health ends before any due packet can use that expired health. */
export function expirePetHealth(world: World): void {
  for (const pet of world.pets) {
    if (!pet.statuses?.some(status => status.kind === "stat" && status.key === "health" && status.endTick <= world.tick)) continue;
    pet.statuses = pet.statuses.filter(status => !(status.kind === "stat" && status.key === "health" && status.endTick <= world.tick));
    pet.hp = Math.min(pet.hp, derive(petFormulaTarget(pet, world.units[pet.owner], world.tick)).maxHp);
  }
}

/** Whether a unit can start a basic attack on a pet: in range, targetable, not its own (unless it detonates it). */
export function canAttackPet(unit: Unit, pet: Pet, range: number): boolean {
  if (!canTargetPet(pet, unit)) return false;
  return petDistance(unit, pet) <= range + 1e-6;
}
