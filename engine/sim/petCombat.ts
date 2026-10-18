/** Pet attack actors: incoming hooks see the attacking pet, without lending it owner actions. */
import { applyEffect, attackHit, inStasis, isUntargetable, log } from "./combat";
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
  actor.spec = { ...actor.spec, attack: { range: pet.spec.attack?.range ?? 0, ranged: Boolean(pet.spec.attack?.missileSpeed), projectile: pet.spec.attack?.projectile ?? false } };
  actor.spec.bonus = { lethality: owner.spec.bonus?.lethality ?? 0, magicPen: owner.spec.bonus?.magicPen ?? 0, armorPenPoints: owner.spec.bonus?.armorPenPoints ?? 0, magicPenPoints: owner.spec.bonus?.magicPenPoints ?? 0 };
  const inherited = new Set(["lethality", "magicPen", "armorPen", "magicPenPercent", "bonusArmorPen", "criticalBonusArmorIgnore", "damageDealt"]);
  actor.statuses.push(...owner.statuses.filter((status) => status.kind === "stat" && inherited.has(status.key)).map((status) => ({ ...status })));
  return actor;
}

/** Resolve one launched packet. It may still arrive after its actual pet dies. */
export function petCombatHit(world: World, pet: Pet, target: Unit | Pet, effects: readonly Effect[], attackLike: boolean, blinded = false): boolean {
  const owner = world.units[pet.owner], actor = petAttackActor(pet, owner, world.tick);
  const targetPet = "owner" in target ? target : undefined;
  const victim = targetPet ? petFormulaTarget(targetPet, owner, world.tick) : target as Unit;
  if (targetPet) victim.petId = targetPet.id;
  if (!victim.alive || isUntargetable(victim, actor) || inStasis(victim) || targetPet?.spec.untargetable) return false;
  const mayConnect = !attackLike || (!blinded && !hasState(victim, "dodgeAttacks") && !hasState(victim, "parry"));
  const actualEffects = mayConnect ? pet.spec.effectsForHit?.({ world, pet, target, effects }) ?? effects : effects;
  const packets = petAttackEffects(owner, victim, actualEffects);
  let connected = false, blocked = false;
  if (attackLike) {
    actor.spec.hooks = { onAttackResolved(ctx) { connected = !ctx.missed && !(ctx.blocked && hasState(victim, "parry")); blocked = ctx.blocked; } };
    attackHit(world, actor, victim, blinded, packets, undefined, false, { critChance: 0 });
  } else {
    const shield = victim.statuses.find((status) => status.kind === "state" && status.key === "spellShield");
    if (shield) {
      shield.charges = (shield.charges ?? 1) - 1;
      if (shield.charges <= 0) victim.statuses = victim.statuses.filter((status) => status !== shield);
      log(world, victim.side, `spell shield blocks ${pet.spec.name}`);
    } else if (!hasState(victim, "parry")) {
      for (const effect of packets) applyEffect(world, actor, victim, effect, { scale: 1 });
      connected = true;
    }
  }
  owner.totals.damageDealt += actor.totals.damageDealt;
  if (targetPet) targetPet.statuses = victim.statuses;
  if (connected) pet.spec.onAttackHit?.({ world, pet, target, blocked });
  return connected;
}
