/**
 * A simulated matchup: both sides spend the stat budget against each other, then fight the
 * six scenarios (PLAN.md sections 6 and 10).
 */
import { type Allocation, type StatPrices, allocateBoth } from "../budget";
import { type MatchupResult, type ScenarioOptions, runScenarios } from "./scenarios";
import type { FighterSpec } from "./spec";

export interface SimulatedMatchup extends MatchupResult {
  /** What each side bought: you, then the enemy. */
  builds: [Allocation, Allocation];
}

export function simulateMatchup(you: FighterSpec, enemy: FighterSpec, gold: number, prices: StatPrices, options: ScenarioOptions = {}): SimulatedMatchup {
  const builds = allocateBoth(you, enemy, gold, prices);
  const result = runScenarios({ ...you, bonus: builds[0].bonus }, { ...enemy, bonus: builds[1].bonus }, options);
  return { ...result, builds };
}

/** A kit compiled with one of its option sets (a rank split of Udyr's). */
export interface KitVariant {
  spec: FighterSpec;
  /** The options that made it, when the kit has a choice to make. */
  options?: Record<string, number>;
}

/** The kit options a side played: 0 is you, 1 the enemy. */
export interface MatchupVariant {
  side: 0 | 1;
  options: Record<string, number>;
}

export interface BestMatchup extends SimulatedMatchup {
  /** The variants chosen, one for each side that had several (both, Heimerdinger against Udyr). */
  variants?: MatchupVariant[];
}

/**
 * Both sides choose their kit variant simultaneously (Udyr's rank splits, PLAN §4.1).
 * Each chooses the pure variant with the best worst-case score against the other's choices:
 * your largest row minimum, and the enemy's smallest column maximum. Returning their actual
 * intersection preserves concrete builds and scenario evidence and treats the sides equally.
 * When no pure saddle point exists, these conservative choices are a model assumption,
 * rather than a mixed-strategy equilibrium or one side choosing after seeing the other.
 */
export function bestMatchup(you: KitVariant[], enemy: KitVariant[], gold: number, prices: StatPrices, options: ScenarioOptions = {}): BestMatchup {
  if (!you.length || !enemy.length) throw new Error("bestMatchup: a side has no kit");
  // Stable keyed ordering makes tied choices independent of the caller's variant list order.
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  const key = (variant: KitVariant) => `${variant.spec.id}:${JSON.stringify(Object.entries(variant.options ?? {}).sort(([a], [b]) => compare(a, b)))}`;
  const mine = [...you].sort((a, b) => compare(key(a), key(b)));
  const theirs = [...enemy].sort((a, b) => compare(key(a), key(b)));
  const matrix = mine.map((a) => theirs.map((b) => simulateMatchup(a.spec, b.spec, gold, prices, options)));
  let row = 0;
  let column = 0;
  let floor = Number.NEGATIVE_INFINITY;
  let ceiling = Number.POSITIVE_INFINITY;
  for (let i = 0; i < mine.length; i++) {
    const worst = Math.min(...matrix[i]!.map((result) => result.score));
    if (worst > floor + 1e-12) {
      floor = worst;
      row = i;
    }
  }
  for (let j = 0; j < theirs.length; j++) {
    const worst = Math.max(...matrix.map((results) => results[j]!.score));
    if (worst < ceiling - 1e-12) {
      ceiling = worst;
      column = j;
    }
  }
  const result: BestMatchup = matrix[row]![column]!;
  const chosen: MatchupVariant[] = [];
  const yourOptions = mine[row]!.options;
  const enemyOptions = theirs[column]!.options;
  if (you.length > 1 && yourOptions) chosen.push({ side: 0, options: yourOptions });
  if (enemy.length > 1 && enemyOptions) chosen.push({ side: 1, options: enemyOptions });
  if (chosen.length) result.variants = chosen;
  return result;
}
