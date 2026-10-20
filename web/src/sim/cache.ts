/** Cache compatibility includes model/data provenance and every input to variant choice. */
import { precomputedCurrent } from "../../../engine/sim/precomputed";
import { DEFAULT_APP_SETTINGS, type AppSettings, fightsChanged, weightsChanged, simulationKey } from "../settings";

export function precomputedCompatible(file: unknown, dataset: string, patch: string, fingerprint: string | undefined, kitIds: string[]): boolean {
  return precomputedCurrent(file, dataset, patch, fingerprint, DEFAULT_APP_SETTINGS.gold, kitIds);
}

export function needsSimulation(settings: AppSettings, compatible: boolean): boolean {
  // Weights can change the optimal variant, even when each individual fight is unchanged.
  return !compatible || fightsChanged(settings) || weightsChanged(settings);
}

export function matchupCacheKey(dataKey: string, you: string, enemy: string, settings: AppSettings, log: boolean): string {
  return JSON.stringify([dataKey, you, enemy, simulationKey(settings), log]);
}
