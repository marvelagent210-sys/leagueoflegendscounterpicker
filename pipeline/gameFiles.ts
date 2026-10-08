/**
 * Reconciles the wiki's base stats with the game data files. The game files are what
 * the game runs, so a value they state explicitly replaces the wiki's for a champion's
 * base form. Alternate forms are only reported: their records may not be what the game
 * applies when the champion transforms.
 */
import { getStat, type StatPath, withStat } from "../engine/statPaths";
import type { StatOverride } from "../engine/types";
import type { WikiChampionEntry } from "./parse/championData";
import type { GameRecordStats } from "./parse/characterRecord";

export interface Difference {
  /** Wiki name of the champion form. */
  form: string;
  stat: StatPath;
  wiki: number | null;
  game: number;
}

export interface UnappliedDifference extends Difference {
  reason: string;
}

export interface Reconciled {
  /** Wiki entries with game-file values applied. */
  entries: WikiChampionEntry[];
  /** Overrides applied to each entry, by entry name. */
  overrides: Map<string, StatOverride[]>;
  applied: Difference[];
  notApplied: UnappliedDifference[];
}

/** Wiki entries whose game record describes something else, by wiki name. */
const RECORD_MISMATCH: Record<string, string> = {
  Kled: 'The game\'s Kled record is the mounted form; the wiki\'s "Kled" entry is Kled on foot.',
  "Kled & Skaarl": "The wiki adds Skaarl's health to Kled's; the game record holds Kled's own health.",
};
const ALTERNATE_FORM =
  "Alternate form: its game record may not be what the game applies on transformation, so it is reported only.";

const RESOURCE_PATHS = new Set<StatPath>(["resource.base", "resource.perLevel", "resourceRegen.base", "resourceRegen.perLevel"]);
const MANA_OR_ENERGY = new Set(["Mana", "Energy"]);

/** Game files store 32-bit floats (5.2 is 5.199999809...), and the wiki rounds some values. */
function same(a: number, b: number): boolean {
  return Math.abs(a - b) <= 5e-4 * Math.max(1, Math.abs(a), Math.abs(b));
}

/** The game value with float32 noise removed, e.g. 5.199999809265137 -> 5.2. */
function clean(value: number): number {
  return Number(value.toPrecision(7));
}

export function reconcileWithGameFiles(
  entries: WikiChampionEntry[],
  records: ReadonlyMap<string, GameRecordStats>,
): Reconciled {
  const result: Reconciled = { entries: [], overrides: new Map(), applied: [], notApplied: [] };
  for (const entry of entries) {
    const record = records.get(entry.apiname);
    if (!record) throw new Error(`No game data for ${entry.name} (${entry.apiname})`);
    const blocked = RECORD_MISMATCH[entry.name] ?? (Number.isInteger(entry.id) ? undefined : ALTERNATE_FORM);
    const overrides: StatOverride[] = [];
    let stats = entry.stats;

    for (const [path, rawGame] of Object.entries(record.stated) as Array<[StatPath, number]>) {
      if (RESOURCE_PATHS.has(path) && !MANA_OR_ENERGY.has(entry.resource)) continue;
      const game = clean(rawGame);
      const wiki = getStat(entry.stats, path) ?? null;
      if (wiki !== null && same(wiki, game)) continue;
      const difference: Difference = { form: entry.name, stat: path, wiki, game };
      if (blocked) {
        result.notApplied.push({ ...difference, reason: blocked });
        continue;
      }
      stats = withStat(stats, path, game);
      overrides.push({ stat: path, wiki, game });
      result.applied.push(difference);
      if (path === "windup.percent" && record.windupSource) {
        stats = { ...stats, windup: { ...stats.windup, source: record.windupSource } };
      }
    }

    if (record.castTimeByLevel && !blocked) {
      const { start, end, scalePastMaxLevel } = record.castTimeByLevel;
      const castTimeByLevel = { start: clean(start), end: clean(end), scalePastMaxLevel };
      stats = {
        ...stats,
        windup: {
          ...stats.windup,
          castTimeByLevel,
          ...(record.attackTotalTime === undefined ? {} : { attackTotalTime: clean(record.attackTotalTime) }),
        },
      };
      overrides.push({ stat: "windup.castTimeByLevel", wiki: null, game: castTimeByLevel });
    }

    result.entries.push({ ...entry, stats });
    result.overrides.set(entry.name, overrides);
  }
  return result;
}
