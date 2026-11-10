/**
 * What the rune tests share: the latest dataset's catalogs, pages of runes that do nothing in
 * the tests' fights but the ones under test, and fights between synthetic fighters with plain
 * numbers (tests/sim/kits.ts: 2,000 health, 100 armor and magic resistance, 100 AD).
 */
import type { Behavior } from "../../engine/sim/behavior";
import { defaultBehavior } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Mode, World } from "../../engine/sim/state";
import { matchupSpecs } from "../../items/equip";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { type LoadoutFighter, equipBuild, loadItemCatalog, loadRuneRecords, loadSpellCatalog } from "../../pipeline/itemData";
import type { NamedRunePage } from "../../runes/equip";
import { fighter } from "../sim/kits";

export const dataset = await latestDataset(DATA_DIR, "rune-records.json");
export const [items, catalog, spells] = await Promise.all([loadItemCatalog(dataset), loadRuneRecords(dataset), loadSpellCatalog(dataset)]);

/** Lesser runes and shards that do nothing in these fights, by path and row. */
export const QUIET: Record<string, string[]> = {
  Precision: ["Triumph", "Legend: Haste", "Last Stand"],
  Domination: ["Sudden Impact", "Sixth Sense", "Treasure Hunter"],
  Sorcery: ["Nimbus Cloak", "Transcendence", "Waterwalking"],
  Resolve: ["Demolish", "Conditioning", "Revitalize"],
  Inspiration: ["Cash Back", "Time Warp Tonic", "Cosmic Insight"],
};
export const QUIET_SHARDS = ["Ability Haste", "Move Speed", "Tenacity and Slow Resist"];
/** Shards that leave movement speed and slow resist alone, for the tests of movement. */
export const STILL_SHARDS = ["Ability Haste", "Health Scaling", "Health"];

const entryOf = (name: string) => {
  const entry = catalog.runes.find((rune) => rune.name === name);
  if (!entry) throw new Error(`No rune ${name}`);
  return entry;
};
export const pathOf = (name: string) => entryOf(name).path;

/**
 * A page with `keystone` and quiet runes, and `lesser` runes in their rows: of the keystone's
 * path, or else of the secondary path (that of the first such rune), with quiet runes filling
 * the other rows.
 */
export function pageWith(keystone: string, lesser: string[] = [], shards = QUIET_SHARDS): NamedRunePage {
  const path = pathOf(keystone);
  const primary = [...QUIET[path]!];
  const outside = lesser.filter((name) => pathOf(name) !== path);
  for (const name of lesser) if (pathOf(name) === path) primary[entryOf(name).row - 1] = name;
  if (outside.length === 0) return { keystone, primary, secondary: path === "Domination" ? QUIET.Inspiration!.slice(0, 2) : QUIET.Domination!.slice(1), shards };
  const quiet = QUIET[pathOf(outside[0]!)]!.filter((_, row) => !outside.some((name) => entryOf(name).row === row + 1));
  return { keystone, primary, secondary: [...outside, ...quiet].slice(0, 2), shards };
}

/**
 * A page for testing one lesser rune: a keystone that does nothing in these fights (Unsealed
 * Spellbook works outside duels; Guardian, for Inspiration runes, waits for 178 damage in 2.5
 * seconds), quiet runes, and the rune in the secondary path.
 */
export function lesserPage(rune: string, shards = QUIET_SHARDS): NamedRunePage {
  return pageWith(pathOf(rune) === "Inspiration" ? "Guardian" : "Unsealed Spellbook", [rune], shards);
}

export const holding = (spec: FighterSpec, page: NamedRunePage, build: string[] = [], adaptiveType: "Physical" | "Magic" = "Physical", options?: Record<string, Record<string, number>>, spellNames?: string[]): LoadoutFighter =>
  equipBuild(spec, build, items, { runes: { page, catalog, adaptiveType, ...(options ? { options } : {}) }, ...(spellNames ? { spells: { names: spellNames, catalog: spells } } : {}) });

export function world(a: LoadoutFighter | FighterSpec, b: LoadoutFighter | FighterSpec = fighter({ id: "enemy" }), modes: [Mode, Mode] = ["fight", "idle"], distance = 0): World {
  // A plain fighter holds nothing: the other side's enemy hooks still go on it.
  const loadout = (x: LoadoutFighter | FighterSpec): LoadoutFighter => ("enemyHooks" in x ? x : ({ spec: x, enemyHooks: [] } as unknown as LoadoutFighter));
  const [left, right] = matchupSpecs(loadout(a), loadout(b));
  return createWorld({ fighters: [left, right], distance, modes, settings: { log: true } });
}

/** Steps the fight; the default behavior plays each side's mode ("idle" does nothing). */
export function run(w: World, seconds: number, behaviors: [Behavior, Behavior] = [defaultBehavior, defaultBehavior]): World {
  for (let tick = 0; tick < seconds * 30 && w.units.every((unit) => unit.alive); tick++) step(w, behaviors);
  return w;
}

/** Steps the fight `ticks` ticks. */
export function ticks(w: World, count: number, behaviors: [Behavior, Behavior] = [defaultBehavior, defaultBehavior]): World {
  for (let i = 0; i < count && w.units.every((unit) => unit.alive); i++) step(w, behaviors);
  return w;
}

/** A side's damage numbers from a source, as the log shows them. */
export const hits = (w: World, side: 0 | 1, source: string) => w.log.filter((entry) => entry.side === side && entry.text.startsWith(`${source} deals `)).map((entry) => Number(/deals (\d+)/.exec(entry.text)?.[1]));

/** Casts `key` on the first tick, then plays the default behavior. */
export function castingFirst(key: string): Behavior {
  return (view) => (view.world.tick === 0 ? { kind: "cast", ability: key } : defaultBehavior(view));
}
