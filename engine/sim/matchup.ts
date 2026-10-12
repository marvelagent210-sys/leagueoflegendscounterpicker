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

export interface BestMatchup extends SimulatedMatchup {
  /** The variant chosen, when a side had several: whose (0 you, 1 the enemy) and its options. */
  variant?: { side: 0 | 1; options: Record<string, number> };
}

/**
 * The matchup with each side's kit variants (Udyr's rank splits, PLAN §4.1): a side with
 * several plays the one best for it, so yours raise the score and the enemy's lower it.
 */
export function bestMatchup(you: KitVariant[], enemy: KitVariant[], gold: number, prices: StatPrices, options: ScenarioOptions = {}): BestMatchup {
  let best: BestMatchup | undefined;
  for (const mine of you) {
    let worst: BestMatchup | undefined;
    for (const theirs of enemy) {
      const result: BestMatchup = simulateMatchup(mine.spec, theirs.spec, gold, prices, options);
      if (enemy.length > 1 && theirs.options) result.variant = { side: 1, options: theirs.options };
      if (!worst || result.score < worst.score) worst = result;
    }
    if (!worst) continue;
    if (you.length > 1 && mine.options) worst.variant = { side: 0, options: mine.options };
    if (!best || worst.score > best.score) best = worst;
  }
  if (!best) throw new Error("bestMatchup: a side has no kit");
  return best;
}
