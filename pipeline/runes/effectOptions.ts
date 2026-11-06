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
