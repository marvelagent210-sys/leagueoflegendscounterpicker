/** Dotted paths to the numeric fields of FormStats, for overrides and cross-checks. */
import type { FormStats } from "./types";

export const STAT_PATHS = [
  "hp.base",
  "hp.perLevel",
  "hpRegen.base",
  "hpRegen.perLevel",
  "resource.base",
  "resource.perLevel",
  "resourceRegen.base",
  "resourceRegen.perLevel",
  "armor.base",
  "armor.perLevel",
  "magicResist.base",
  "magicResist.perLevel",
  "attackDamage.base",
  "attackDamage.perLevel",
  "attackSpeed.base",
  "attackSpeed.ratio",
  "attackSpeed.bonusPerLevel",
  "attackRange",
  "moveSpeed",
  "windup.percent",
  "windup.modifier",
  "gameplayRadius",
  "pathingRadius",
  "selectionRadius",
] as const;

export type StatPath = (typeof STAT_PATHS)[number];

export function isStatPath(value: string): value is StatPath {
  return (STAT_PATHS as readonly string[]).includes(value);
}

function split(path: StatPath): [keyof FormStats, string | undefined] {
  const [head, tail] = path.split(".");
  return [head as keyof FormStats, tail];
}

export function getStat(stats: FormStats, path: StatPath): number | undefined {
  const [head, tail] = split(path);
  const value: unknown = stats[head];
  const field = tail === undefined ? value : (value as Record<string, unknown> | undefined)?.[tail];
  return typeof field === "number" ? field : undefined;
}

/** Returns a copy of `stats` with one field replaced. */
export function withStat(stats: FormStats, path: StatPath, value: number): FormStats {
  const [head, tail] = split(path);
  if (tail === undefined) return { ...stats, [head]: value };
  return { ...stats, [head]: { ...(stats[head] as object), [tail]: value } };
}
