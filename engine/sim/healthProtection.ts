/** Spatial health thresholds are queried at contact, including after same-tick movement. */
import { derive } from "./derived";
import type { Pet, Unit, World } from "./state";

export interface HealthProtection {
  minimumHealth: number;
  invulnerable: boolean;
  preventHealing: boolean;
}

const NONE: Readonly<HealthProtection> = Object.freeze({ minimumHealth: 0, invulnerable: false, preventHealing: false });
const SPATIAL_EPSILON = 1e-6;

/** Ordinary champions and explicitly classified minions/monsters, excluding clones and props. */
export function healthProtectionEligible(world: World, target: Unit | Pet): boolean {
  const pet = "owner" in target ? target : target.petId === undefined ? undefined : world.pets.find((candidate) => candidate.id === target.petId);
  if ("owner" in target || target.petId !== undefined) {
    return !!pet && world.pets.includes(pet) && pet.hp > 0 && !pet.spec.hitPoints && (pet.spec.targetClass === "minion" || pet.spec.targetClass === "monster");
  }
  return target.alive && target.hp > 0 && !target.resurrection && !target.deathDefied && !target.fallen;
}

/** Boundaries are [start,end); centered fields use centers, other fields include collision radii. */
export function healthProtection(world: World, target: Unit | Pet): Readonly<HealthProtection> {
  let minimumHealth = 0, preventHealing = false;
  let eligible: boolean | undefined;
  const pet = "owner" in target ? target : undefined;
  const hp = target.hp;
  let maxHp: number | undefined;
  for (const zone of world.zones) {
    const protection = zone.healthProtection;
    if (!protection || world.tick < zone.startTick || world.tick >= zone.endTick) continue;
    const fraction = protection.minimumHealthFraction;
    if (!Number.isFinite(fraction) || fraction <= 0) continue;
    const radius = pet ? pet.spec.radius : (target as Unit).spec.base.radius;
    if (Math.abs(target.x - zone.x) > zone.radius + (zone.centered ? 0 : radius) + SPATIAL_EPSILON) continue;
    eligible ??= healthProtectionEligible(world, target);
    if (!eligible) return NONE;
    maxHp ??= pet ? pet.spec.hp : derive(target as Unit).maxHp;
    const floor = fraction * maxHp;
    minimumHealth = Math.max(minimumHealth, floor);
    if (protection.preventHealingAtFloor && hp <= floor) preventHealing = true;
  }
  return minimumHealth > 0 ? { minimumHealth, invulnerable: hp <= minimumHealth, preventHealing } : NONE;
}
