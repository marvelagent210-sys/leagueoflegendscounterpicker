/** A damage formula's view of one actual pet, shared by areas and piercing missiles. */
import type { FighterSpec } from "./spec";
import { newUnit, type Pet, type Unit } from "./state";

/**
 * PetSpec supplies health, resistances and movement. Champion-only AD/AP/resource/bonus
 * stats are absent, rather than borrowed from either champion. Build a fresh view for
 * each packet so current/missing health and memory reflect earlier hits in the same area.
 */
export function petFormulaTarget(pet: Pet, caster: Unit, tick = Number.NEGATIVE_INFINITY): Unit {
  const spec: FighterSpec = {
    id: pet.spec.kind,
    name: pet.spec.name,
    ...(pet.spec.targetClass ? { targetClass: pet.spec.targetClass } : {}),
    ...(pet.spec.unitClass ? { unitClass: pet.spec.unitClass } : {}),
    ...(pet.spec.sizeClass ? { sizeClass: pet.spec.sizeClass } : {}),
    ...(pet.spec.structureClass ? { structureClass: pet.spec.structureClass } : {}),
    ...(pet.spec.ignoreOwnMoveSpeedModifiers ? { statConversions: { totalMoveSpeedOverride: pet.spec.moveSpeed } } : {}),
    base: {
      ...caster.spec.base,
      hp: pet.spec.hp,
      hpRegen: 0,
      resource: 0,
      resourceRegen: 0,
      armor: pet.spec.armor,
      mr: pet.spec.mr,
      ad: 0,
      attackSpeed: { base: 0, ratio: 0, bonus: 0 },
      moveSpeed: pet.spec.moveSpeed,
      radius: pet.spec.radius,
      pathingRadius: pet.spec.pathingRadius ?? pet.spec.radius,
      critDamageModifier: 1,
    },
    attack: { range: 0, ranged: false, projectile: false },
    abilities: [],
  };
  const target = newUnit(spec, pet.owner, pet.x, pet.spec.hp, 0);
  target.hp = pet.hp;
  target.petId = pet.id;
  if (pet.forced) target.forced = { ...pet.forced };
  target.statuses = (pet.statuses ?? []).filter((status) => status.endTick > tick || (status.kind === "dot" && status.endTick === tick)).map((status) => ({ ...status, ...(status.dot ? { dot: { ...status.dot } } : {}) }));
  target.memory = { ...pet.memory };
  return target;
}
