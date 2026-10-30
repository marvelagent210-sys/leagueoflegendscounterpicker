/** Shared impact path for ordinary and piercing basic missiles against an actual pet. */
import { averageCritFactor } from "../rules/defense";
import { attackHit, hookContext, isUntargetable } from "./combat";
import { derive, hasState } from "./derived";
import { petFormulaTarget } from "./petTarget";
import { damagePet } from "./pets";
import type { AttackSplit, Effect } from "./spec";
import type { AttackHitOptions, Pet, Unit, World } from "./state";

/** Pet parity is explicit: existing champion-only on-hit hooks remain separate. */
export function resolveAttackOnPet(world: World, unit: Unit, pet: Pet, blinded: boolean, onHit: Effect[], options: AttackHitOptions, split?: AttackSplit, scale = 1): void {
  if (!(scale > 0) || !world.pets.includes(pet) || pet.spec.untargetable) return;
  const target = petFormulaTarget(pet, unit, world.tick);
  const resolved = (blocked: boolean, missed: boolean) => unit.spec.hooks?.onAttackPetResolved?.({ ...hookContext(world, unit, undefined, target), pet, blocked, missed });
  if (isUntargetable(target, unit)) return;
  if (blinded) { resolved(false, true); return; }
  if (hasState(target, "parry")) { resolved(true, false); return; }
  if (hasState(target, "dodgeAttacks")) { resolved(false, true); return; }
  if (unit.spec.attack.onHitToPets || options.baseDamage) {
    attackHit(world, unit, target, blinded, onHit, split, false, options, scale);
    return;
  }
  const blocked = hasState(target, "blockAttacks");
  if (!blocked) damagePet(world, unit, pet, attackDamageOf(unit, options.critChance) * scale, "physical", true, undefined, "basic", scale);
  target.hp = pet.hp; target.alive = pet.hp > 0; target.statuses = pet.statuses ?? [];
  unit.spec.hooks?.onAttackPetHit?.({ ...hookContext(world, unit, undefined, target), pet, blocked, critChance: options.critChance ?? derive(unit).critChance, attack: options, scale });
  resolved(blocked, false);
}

/** A basic attack's damage before resistances, crits averaged. */
function attackDamageOf(unit: Unit, critChance?: number): number {
  const d = derive(unit);
  return d.ad * averageCritFactor(critChance ?? d.critChance, d.critDamage);
}

