/**
 * Values the game interpolates by champion level (its ByCharLevelInterpolation formula):
 * linear from `start` at level 1 to `end` at level 18. Past 18 the value keeps
 * growing at the same rate only when the game flags it to (`scalePastMaxLevel`).
 */
export const DEFAULT_MAX_LEVEL = 18;

export interface LevelInterpolation {
  start: number;
  end: number;
  scalePastMaxLevel: boolean;
}

export function interpolateByLevel(scaling: LevelInterpolation, level: number): number {
  const effectiveLevel = scaling.scalePastMaxLevel ? level : Math.min(level, DEFAULT_MAX_LEVEL);
  return scaling.start + ((scaling.end - scaling.start) * (effectiveLevel - 1)) / (DEFAULT_MAX_LEVEL - 1);
}
