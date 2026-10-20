/** Shared impact path for ordinary and piercing basic missiles against an actual pet. */
import { averageCritFactor } from "../rules/defense";
import { attackHit, hookContext, isUntargetable } from "./combat";
import { derive, hasState } from "./derived";
import { petFormulaTarget } from "./petTarget";
import { damagePet } from "./pets";
import type { AttackSplit, Effect } from "./spec";
import type { AttackHitOptions, Pet, Unit, World } from "./state";

/** Pet parity is explicit: existing champion-only on-hit hooks remain separate. */
export function resolveAttackOnPet(world: World, unit: Unit, pet: Pet, blinded: boolean, onHit: Effect[], options: AttackHitOptions, split?: AttackSplit): void {
  if (!world.pets.includes(pet) || pet.spec.untargetable || blinded) return;
  const target = petFormulaTarget(pet, unit, world.tick);
  if (isUntargetable(target, unit) || hasState(target, "parry") || hasState(target, "dodgeAttacks")) return;
  if (unit.spec.attack.onHitToPets) {
    attackHit(world, unit, target, blinded, onHit, split, false, options);
    return;
  }
  const blocked = hasState(target, "blockAttacks");
  if (!blocked) damagePet(world, unit, pet, attackDamageOf(unit, options.critChance), "physical", true);
  target.hp = pet.hp; target.alive = pet.hp > 0; target.statuses = pet.statuses ?? [];
  unit.spec.hooks?.onAttackPetHit?.({ ...hookContext(world, unit, undefined, target), pet, blocked, critChance: options.critChance ?? derive(unit).critChance, attack: options, scale: 1 });
}

/** A basic attack's damage before resistances, crits averaged. */
function attackDamageOf(unit: Unit, critChance?: number): number {
  const d = derive(unit);
  return d.ad * averageCritFactor(critChance ?? d.critChance, d.critDamage);
}

