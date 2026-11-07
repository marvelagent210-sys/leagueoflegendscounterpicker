import type { RuneCatalog } from "../../runes/catalog";
import { validateCombatRuneSelection } from "../../runes/effects";

/** Explicit partial selections; a missing flag keeps the ordinary duel unchanged. */
export function combatRuneOption(args: readonly string[], flag: string, catalog: RuneCatalog): number[] | undefined {
  const positions = args.flatMap((value, index) => value === flag ? [index] : []);
  if (positions.length === 0) return undefined;
  if (positions.length !== 1) throw new Error(`${flag} must be given once`);
  const text = args[positions[0]! + 1];
  if (!text || text.startsWith("--")) throw new Error(`${flag} requires comma-separated combat-rune IDs`);
  const values = text.split(",").map((value) => value.trim());
  if (values.length === 0 || values.some((value) => !/^[1-9]\d*$/.test(value))) {
    throw new Error(`${flag} requires comma-separated positive integer combat-rune IDs`);
  }
  return validateCombatRuneSelection(catalog, values.map(Number));
}

/** A side must declare history explicitly; an unused flag is never silently ignored. */
export function legendPointsOption(args: readonly string[], flag: string, selection: readonly number[] | undefined): number | undefined {
  const positions = args.flatMap((value, index) => value === flag ? [index] : []);
  if (positions.length > 1) throw new Error(`${flag} must be given once`);
  if (positions.length === 0) {
    if (selection?.includes(9104)) throw new Error(`Legend: Alacrity (9104) requires ${flag}, including an explicit 0 for no starting points`);
    return undefined;
  }
  if (!selection?.includes(9104)) throw new Error(`${flag} requires Legend: Alacrity (9104) on the same side`);
  const value = args[positions[0]! + 1]?.trim();
  if (!value || !/^(0|[1-9]\d*)$/.test(value)) throw new Error(`${flag} requires a nonnegative decimal integer`);
  const points = Number(value);
  if (!Number.isSafeInteger(points)) throw new Error(`${flag} requires a nonnegative safe integer`);
  return points;
}
