/** Champion base statistics at a given level, following the game's growth formulas. */
import { interpolateByLevel } from "./levelScaling";
import type { AttackSpeedStats, FormStats, StatGrowth } from "./types";

/** Level cap after completing the Top Lane Role Quest (18 otherwise). */
export const TOP_LANE_MAX_LEVEL = 20;

/** At most one attack per 0.333 s; at least one per 5 s. */
export const ATTACK_SPEED_CAP = 1 / 0.333;
export const ATTACK_SPEED_FLOOR = 1 / 5;

/**
 * How many times a stat's per-level growth has been applied at `level`.
 * Levelling up from n-1 to n adds (0.65 + 0.035n) of the growth, so the total is
 * (level - 1) * (0.7025 + 0.0175 * (level - 1)): 17 at level 18 and 19.665 at level 20.
 */
export function growthFactor(level: number): number {
  if (!Number.isInteger(level) || level < 1 || level > TOP_LANE_MAX_LEVEL) {
    throw new RangeError(`Level must be an integer from 1 to ${TOP_LANE_MAX_LEVEL}, got ${level}`);
  }
  return (level - 1) * (0.7025 + 0.0175 * (level - 1));
}

export function statAtLevel(stat: StatGrowth, level: number): number {
  return stat.base + stat.perLevel * growthFactor(level);
}

/** Bonus attack speed gained from levels, in percent. */
export function levelBonusAttackSpeed(attackSpeed: AttackSpeedStats, level: number): number {
  return attackSpeed.bonusPerLevel * growthFactor(level);
}

/**
 * Total attack speed: base + ratio * (all bonus attack speed), within the game's cap and floor.
 * `extraBonusPercent` is bonus attack speed from other sources, such as abilities.
 */
export function attackSpeedAtLevel(attackSpeed: AttackSpeedStats, level: number, extraBonusPercent = 0): number {
  const bonusPercent = levelBonusAttackSpeed(attackSpeed, level) + extraBonusPercent;
  const total = attackSpeed.base + (attackSpeed.ratio * bonusPercent) / 100;
  return Math.min(ATTACK_SPEED_CAP, Math.max(ATTACK_SPEED_FLOOR, total));
}

/** Share of the attack time spent winding up; it changes with level only for level-scaled cast times. */
export function windupPercent(stats: FormStats, level: number): number {
  const { castTimeByLevel, attackTotalTime } = stats.windup;
  if (castTimeByLevel && attackTotalTime) return interpolateByLevel(castTimeByLevel, level) / attackTotalTime;
  return stats.windup.percent;
}

/**
 * Basic attack windup in seconds at a given level and total attack speed:
 * baseWindup + modifier * (attackTime * percent - baseWindup), with baseWindup = percent / base attack speed.
 * A modifier below 1 means bonus attack speed shortens the windup less than the rest of the attack.
 */
export function attackWindup(stats: FormStats, totalAttackSpeed: number, level: number): number {
  const percent = windupPercent(stats, level);
  const baseWindup = percent / stats.attackSpeed.base;
  return baseWindup + stats.windup.modifier * ((1 / totalAttackSpeed) * percent - baseWindup);
}

export interface LevelStats {
  level: number;
  hp: number;
  /** Per 5 seconds. */
  hpRegen: number;
  resource: number;
  /** Per 5 seconds. */
  resourceRegen: number;
  armor: number;
  magicResist: number;
  attackDamage: number;
  attackSpeed: number;
  /** Seconds from the start of one basic attack to the next. */
  attackTime: number;
  /** Seconds from starting a basic attack until it launches. */
  attackWindup: number;
  attackRange: number;
  moveSpeed: number;
}

/** Base stats only: no abilities, items or stat budget. */
export function statsAtLevel(stats: FormStats, level: number): LevelStats {
  const attackSpeed = attackSpeedAtLevel(stats.attackSpeed, level);
  return {
    level,
    hp: statAtLevel(stats.hp, level),
    hpRegen: statAtLevel(stats.hpRegen, level),
    resource: statAtLevel(stats.resource, level),
    resourceRegen: statAtLevel(stats.resourceRegen, level),
    armor: statAtLevel(stats.armor, level),
    magicResist: statAtLevel(stats.magicResist, level),
    attackDamage: statAtLevel(stats.attackDamage, level),
    attackSpeed,
    attackTime: 1 / attackSpeed,
    attackWindup: attackWindup(stats, attackSpeed, level),
    attackRange: stats.attackRange,
    moveSpeed: stats.moveSpeed,
  };
}
