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
  const legend = selection?.includes(9103) ? "Legend: Bloodline (9103)"
    : selection?.includes(9104) ? "Legend: Alacrity (9104)" : selection?.includes(9105) ? "Legend: Haste (9105)" : undefined;
  const positions = args.flatMap((value, index) => value === flag ? [index] : []);
  if (positions.length > 1) throw new Error(`${flag} must be given once`);
  if (positions.length === 0) {
    if (legend) throw new Error(`${legend} requires ${flag}, including an explicit 0 for no starting points`);
    return undefined;
  }
  if (!legend) throw new Error(`${flag} requires Legend: Bloodline (9103), Legend: Alacrity (9104) or Legend: Haste (9105) on the same side`);
  const value = args[positions[0]! + 1]?.trim();
  if (!value || !/^(0|[1-9]\d*)$/.test(value)) throw new Error(`${flag} requires a nonnegative decimal integer`);
  const points = Number(value);
  if (!Number.isSafeInteger(points)) throw new Error(`${flag} requires a nonnegative safe integer`);
  return points;
}

/** Fleet's starting charge pool is history, not an automatic full precharge. */
export function energizedChargesOption(args: readonly string[], flag: string, selection: readonly number[] | undefined): number | undefined {
  const fleet = selection?.includes(8021) === true;
  const positions = args.flatMap((value, index) => value === flag ? [index] : []);
  if (positions.length > 1) throw new Error(`${flag} must be given once`);
  if (positions.length === 0) {
    if (fleet) throw new Error(`Fleet Footwork (8021) requires ${flag}, including an explicit 0 for no starting charges`);
    return undefined;
  }
  if (!fleet) throw new Error(`${flag} requires Fleet Footwork (8021) on the same side`);
  const value = args[positions[0]! + 1];
  // Check the upper bound before converting: 100.000000000000001 rounds to 100 in JavaScript.
  if (!value || !/^(?:(?:0|[1-9]\d?)(?:\.\d+)?|100(?:\.0+)?)$/.test(value)) {
    throw new Error(`${flag} requires a finite decimal charge amount from 0 through 100`);
  }
  return Number(value);
}

/** A manual Overgrowth side declares the prior eligible deaths it has absorbed. */
export function overgrowthDeathsOption(args: readonly string[], flag: string, selection: readonly number[] | undefined): number | undefined {
  const overgrowth = selection?.includes(8451) === true;
  const positions = args.flatMap((value, index) => value === flag ? [index] : []);
  if (positions.length > 1) throw new Error(`${flag} must be given once`);
  if (positions.length === 0) {
    if (overgrowth) throw new Error(`Overgrowth (8451) requires ${flag}, including an explicit 0 for no starting deaths`);
    return undefined;
  }
  if (!overgrowth) throw new Error(`${flag} requires Overgrowth (8451) on the same side`);
  const value = args[positions[0]! + 1]?.trim();
  if (!value || !/^(0|[1-9]\d*)$/.test(value)) throw new Error(`${flag} requires a nonnegative decimal integer`);
  const deaths = Number(value);
  if (!Number.isSafeInteger(deaths)) throw new Error(`${flag} requires a nonnegative safe integer`);
  return deaths;
}
