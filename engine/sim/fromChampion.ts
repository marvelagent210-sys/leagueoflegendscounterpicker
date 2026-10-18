/**
 * Level-20 fighters from champion records: base stats and the basic attack. Abilities are
 * compiled from the wiki data and behaviors in milestone 5; until then a fighter fights with
 * its stats and basic attacks only.
 */
import { TOP_LANE_MAX_LEVEL, levelBonusAttackSpeed, statAtLevel, windupPercent } from "../stats";
import type { Champion, ChampionForm } from "../types";
import type { FighterSpec } from "./spec";

/** Pathing radius of most champions, for forms whose data lacks one. */
const DEFAULT_PATHING_RADIUS = 35;

/**
 * Whether a form of the champion attacks at range: a ranged champion's forms with a melee
 * range don't (Mega Gnar, Jayce's Hammer Stance), whatever the champion's range type says.
 */
export function rangedAttack(champion: Champion, range: number): boolean {
  return champion.rangeType === "Ranged" && range > 250;
}

export function baseFighter(champion: Champion, form: ChampionForm | undefined = champion.forms[0], level = TOP_LANE_MAX_LEVEL): FighterSpec {
  if (!form) throw new Error(`${champion.name} has no forms`);
  const s = form.stats;
  const ranged = rangedAttack(champion, s.attackRange);
  return {
    id: form.id,
    name: form.name,
    resourceType: champion.resource,
    base: {
      hp: statAtLevel(s.hp, level),
      hpRegen: statAtLevel(s.hpRegen, level),
      resource: statAtLevel(s.resource, level),
      resourceRegen: statAtLevel(s.resourceRegen, level),
      armor: statAtLevel(s.armor, level),
      mr: statAtLevel(s.magicResist, level),
      ad: statAtLevel(s.attackDamage, level),
      attackSpeed: { base: s.attackSpeed.base, ratio: s.attackSpeed.ratio, bonus: levelBonusAttackSpeed(s.attackSpeed, level) / 100 },
      windup: { percent: windupPercent(s, level), modifier: s.windup.modifier },
      moveSpeed: s.moveSpeed,
      radius: s.gameplayRadius,
      pathingRadius: s.pathingRadius ?? DEFAULT_PATHING_RADIUS,
      critDamageModifier: s.critDamageModifier,
    },
    attack: {
      range: s.attackRange,
      ranged,
      ...(ranged && s.missileSpeed ? { missileSpeed: s.missileSpeed } : {}),
      projectile: ranged,
    },
    abilities: [],
  };
}
