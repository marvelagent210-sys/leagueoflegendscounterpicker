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
