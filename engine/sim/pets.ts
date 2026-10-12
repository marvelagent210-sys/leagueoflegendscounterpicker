/**
 * Pets: units a champion summons or places (Heimerdinger's turrets, Yorick's Mist Walkers,
 * Illaoi's Tentacles, Gangplank's Powder Kegs). Each stands on the line with its own health
 * and resistances; pets that move walk toward the enemy champion, and pets that attack hit
 * it whenever it is in reach, their damage computed from their owner's stats. The enemy can
 * attack them with basic attacks (see behavior.ts for when it does); area abilities don't
 * hit them. Champion-specific workings (beam charge, fuses, commands) live in the kits.
 */
import { type DamageType, effectiveResist, mitigate } from "../rules/damage";
import { toTicks } from "../rules/time";
import { applyEffect, canTarget, hookContext, inStasis, log } from "./combat";
import { derive, evaluate, hasState } from "./derived";
import type { Effect, PetSpec } from "./spec";
import { type Pet, type Side, type Unit, type World, other } from "./state";

/** Places a pet of `owner`'s at `x`; `text` says who placed it when that isn't the owner (a Spirit pulled out of its champion). */
export function spawnPet(world: World, owner: Unit, spec: PetSpec, x: number, text?: { side: Side; text: string }): Pet {
  const pet: Pet = {
    id: world.nextId++,
    owner: owner.side,
    spec,
    x,
    hp: spec.hp,
    endTick: Number.isFinite(spec.duration) ? world.tick + toTicks(spec.duration) : Number.POSITIVE_INFINITY,
    nextAttackTick: world.tick,
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
export function damagePet(world: World, attacker: Unit, pet: Pet, raw: number, type: DamageType, attack: boolean): void {
  if (!world.pets.includes(pet)) return;
  let amount: number;
  if (pet.spec.hitPoints) {
    if (!attack) return;
    amount = 1;
  } else {
    const a = derive(attacker);
    const resist = type === "physical" ? effectiveResist({ base: pet.spec.armor, bonus: 0 }, {}, { flat: a.lethality, percent: a.armorPen }) : type === "magic" ? effectiveResist({ base: pet.spec.mr, bonus: 0 }, {}, { flat: a.magicPen, percent: a.magicPenPercent }) : 0;
    amount = mitigate(raw, type, resist, { dealt: a.damageDealt, received: [] });
    if (attack && !attacker.spec.attack.ranged) amount *= pet.spec.meleeAttackTaken ?? 1;
  }
  const before = pet.hp;
  pet.hp -= amount;
  log(world, attacker.side, `hits ${pet.spec.name} for ${pet.spec.hitPoints ? 1 : Math.round(amount)}${pet.hp <= 0 ? ", destroying it" : ""}`);
  pet.spec.onDamaged?.({ world, pet, attacker, raw, dealt: amount, before, damageType: type, attack });
  if (pet.hp <= 0 && world.pets.includes(pet)) removePet(world, pet, attacker.side === pet.owner);
}

/**
 * An area ability's damage to the enemy's pets in it (`from` to `to` on the line, reaching
 * their hitboxes): its damage effects at the caster's stats, terms of the target's stats
 * counting as 0, times each pet's share of area damage. Pets that count hits (Tentacles,
 * Powder Kegs) and untargetable ones aren't hurt.
 */
export function areaOnPets(world: World, caster: Unit, from: number, to: number, effects: Effect[]): void {
  if (world.pets.length === 0) return;
  const lo = Math.min(from, to);
  const hi = Math.max(from, to);
  for (const pet of [...world.pets]) {
    if (pet.owner === caster.side || pet.spec.hitPoints || pet.spec.untargetable) continue;
    if (pet.x + pet.spec.radius < lo || pet.x - pet.spec.radius > hi) continue;
    for (const effect of effects) {
      if (effect.type !== "damage" || !world.pets.includes(pet)) continue;
      const amount = Math.max(evaluate(effect.amount, caster), effect.minimum ? evaluate(effect.minimum, caster) : 0);
      const raw = amount * (pet.spec.areaTaken ?? 1);
      if (raw > 0) damagePet(world, caster, pet, raw, effect.damageType, false);
    }
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
export function petHit(world: World, pet: Pet, target: Unit, effects: Effect[], attackLike: boolean): boolean {
  const owner = world.units[pet.owner];
  if (!target.alive || !canTarget(target, owner) || inStasis(target)) return false;
  const stops = (state: string) => target.statuses.find((s) => s.kind === "state" && s.key === state);
  if (attackLike && (stops("dodgeAttacks") || stops("parry"))) {
    log(world, target.side, `avoids ${pet.spec.name}'s attack`);
    return false;
  }
  if (!attackLike) {
    const shield = stops("spellShield");
    if (shield) {
      shield.charges = (shield.charges ?? 1) - 1;
      if (shield.charges <= 0) target.statuses = target.statuses.filter((s) => s !== shield);
      log(world, target.side, `spell shield blocks ${pet.spec.name}`);
      return false;
    }
    if (stops("parry")) {
      log(world, target.side, `parries ${pet.spec.name}`);
      return false;
    }
  }
  const blocked = attackLike && hasState(target, "blockAttacks");
  for (const effect of effects) {
    if (blocked && effect.type === "damage") continue;
    applyEffect(world, owner, target, effect, { scale: 1 });
  }
  return true;
}

/** Pets expire, walk toward the enemy, and attack it when it is in reach. */
export function advancePets(world: World): void {
  if (world.pets.length === 0) return;
  for (const pet of [...world.pets]) {
    if (!world.pets.includes(pet)) continue;
    const owner = world.units[pet.owner];
    if (world.tick >= pet.endTick || !owner.alive) {
      world.pets = world.pets.filter((p) => p !== pet);
      continue;
    }
    const enemy = world.units[other(pet.owner)];
    if (!enemy.alive) continue;
    const attack = pet.spec.attack;
    const reach = attack?.range ?? 0;
    const gap = Math.abs(enemy.x - pet.x) - enemy.spec.base.radius;
    const leash = pet.spec.leash;
    if (pet.spec.moveSpeed > 0 && leash !== undefined && Math.abs(owner.x - pet.x) > leash) {
      // Too far from its owner: back toward it, and no attacks on the way.
      const dir = owner.x > pet.x ? 1 : -1;
      pet.x += dir * Math.min(pet.spec.moveSpeed / 30, Math.abs(owner.x - pet.x) - leash);
      continue;
    }
    if (pet.spec.moveSpeed > 0 && gap > reach) {
      const dir = enemy.x > pet.x ? 1 : -1;
      let step = Math.min(pet.spec.moveSpeed / 30, gap - reach);
      // No farther than its leash allows.
      if (leash !== undefined) step = Math.max(0, Math.min(step, leash - dir * (pet.x - owner.x)));
      pet.x += dir * step;
    }
    if (!attack || world.tick < pet.nextAttackTick || Math.abs(enemy.x - pet.x) - enemy.spec.base.radius > reach) continue;
    if (!canTarget(enemy, owner)) continue;
    pet.nextAttackTick = world.tick + Math.max(1, toTicks(attack.interval));
    petHit(world, pet, enemy, attack.effects, attack.attackLike);
  }
}

/** Whether a unit can start a basic attack on a pet: in range, targetable, not its own (unless it detonates it). */
export function canAttackPet(unit: Unit, pet: Pet, range: number): boolean {
  if (pet.spec.untargetable) return false;
  return petDistance(unit, pet) <= range + 1e-6;
}
