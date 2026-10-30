/** Pet attack actors: incoming hooks see the attacking pet, without lending it owner actions. */
import { applyEffect, attackHit, consumeSpellShield, inStasis, isUntargetable, log, observeOwnedPetBasicHit } from "./combat";
import { evaluate, hasState } from "./derived";
import { petFormulaTarget } from "./petTarget";
import type { Effect } from "./spec";
import type { Pet, Unit, World } from "./state";

/** Snapshot only attack formulas. The pet has its owner's penetration, never its on-hits or vamp. */
export function petAttackEffects(owner: Unit, target: Unit, effects: readonly Effect[]): Effect[] {
  return effects.map((effect) => effect.type === "damage" ? {
    ...effect, amount: { base: Math.max(effect.amountFor?.(owner, target) ?? evaluate(effect.amount, owner, target), effect.minimum ? evaluate(effect.minimum, owner, target) : 0) },
    amountFor: undefined, minimum: undefined, canCrit: false, lifesteal: undefined, noLifeSteal: true,
  } : effect);
}

export function petAttackActor(pet: Pet, owner: Unit, tick?: number): Unit {
  const actor = petFormulaTarget(pet, owner, tick);
  actor.petId = pet.id;
  actor.spec = { ...actor.spec, attack: { range: pet.spec.attack?.range ?? 0, ranged: pet.spec.attack?.ranged ?? Boolean(pet.spec.attack?.missileSpeed), projectile: pet.spec.attack?.projectile ?? false } };
  actor.spec.bonus = { lethality: owner.spec.bonus?.lethality ?? 0, magicPen: owner.spec.bonus?.magicPen ?? 0, armorPenPoints: owner.spec.bonus?.armorPenPoints ?? 0, magicPenPoints: owner.spec.bonus?.magicPenPoints ?? 0 };
  const inherited = new Set(["lethality", "magicPen", "armorPen", "magicPenPercent", "bonusArmorPen", "criticalBonusArmorIgnore", "damageDealt"]);
  actor.statuses.push(...owner.statuses.filter((status) => status.kind === "stat" && inherited.has(status.key)).map((status) => ({ ...status })));
  return actor;
}

/** Resolve one launched packet. It may still arrive after its actual pet dies. */
export function petCombatHit(world: World, pet: Pet, target: Unit | Pet, effects: readonly Effect[], attackLike: boolean, blinded = false, originX?: number): boolean {
  const owner = world.units[pet.owner], actor = petAttackActor(pet, owner, world.tick);
  const targetPet = "owner" in target ? target : undefined;
  const victim = targetPet ? petFormulaTarget(targetPet, owner, world.tick) : target as Unit;
  if (targetPet) victim.petId = targetPet.id;
  if (!victim.alive || isUntargetable(victim, actor) || inStasis(victim) || targetPet?.spec.untargetable) return false;
  const mayConnect = !attackLike || (!blinded && !hasState(victim, "dodgeAttacks") && !hasState(victim, "parry"));
  if (targetPet && !mayConnect) return false;
  const actualEffects = mayConnect ? pet.spec.effectsForHit?.({ world, pet, target, effects }) ?? effects : effects;
  const packets = petAttackEffects(owner, victim, actualEffects);
  let connected = false, blocked = false;
  if (attackLike) {
    actor.spec.hooks = {
      onAttackResolved(ctx) { connected = mayConnect && !ctx.missed && !(ctx.blocked && hasState(victim, "parry")); blocked = ctx.blocked; },
      onAttackPetHit(ctx) { connected = true; blocked = ctx.blocked; },
    };
    attackHit(world, actor, victim, blinded, packets, undefined, false, { critChance: 0 }, 1, originX);
  } else {
    const shield = victim.statuses.find((status) => status.kind === "state" && status.key === "spellShield");
    if (hasState(victim, "parry")) {
      // Riposte negates health damage after shields and damage-based healing.
      // It keeps priority over spell shields and denies debuffs/hit callbacks.
      for (const effect of packets) if (effect.type === "damage") applyEffect(world, actor, victim, effect, { scale: 1, ...(originX !== undefined ? { originX } : {}) });
    } else if (shield) {
      consumeSpellShield(world, actor, victim, undefined, packets, originX ?? actor.x);
      log(world, victim.side, `spell shield blocks ${pet.spec.name}`);
    } else {
      for (const effect of packets) applyEffect(world, actor, victim, effect, { scale: 1, ...(originX !== undefined ? { originX } : {}) });
      connected = true;
    }
  }
  owner.totals.damageDealt += actor.totals.damageDealt;
  if (targetPet) targetPet.statuses = victim.statuses;
  if (attackLike && connected) observeOwnedPetBasicHit(world, pet, victim, blocked, targetPet);
  if (connected) pet.spec.onAttackHit?.({ world, pet, target, blocked });
  return connected;
}
