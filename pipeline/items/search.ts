/**
 * The build search (PLAN.md §13, M8): the item build each side of a matchup does best with
 * against the other's.
 *
 * 1. Candidates are the finished items a champion can buy, and in the five-items-and-boots
 *    format the tier-2 boots, each with what it adds to the quick estimate (items/estimate.ts).
 *    Tear items are held stacked, as in fights. Items that add nothing to the estimate are
 *    dropped.
 * 2. A beam search fills the build slot by slot. It keeps the best builds overall and the best
 *    of each profile (AD, crit, attack speed, AP, tank), so that it doesn't settle on one
 *    route, and one-item swaps then polish each route's best build.
 * 3. The sides answer each other's best build for a few rounds.
 * 4. Each side's route builds fight the other's, and each side takes the build that does best
 *    against the other's best answer: the rule Udyr's rank splits use (bestMatchup).
 *
 * The result is the best build found within the model, not a guaranteed optimum.
 */
import type { StatPrices } from "../../engine/budget";
import { runScenarios } from "../../engine/sim/scenarios";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { type EquipOptions, type ItemParts, itemParts, matchupSpecs } from "../../items/equip";
import { estimateAgainst, estimateUnit } from "../../items/estimate";
import { equipBuild, findItem } from "../itemData";
import type { ItemCatalog, ItemRecord } from "./records";
import { BUILD_FORMATS, BUILD_SLOTS, type BuildFormat, REVIEWED_GROUPS } from "./rules";

export const PROFILES = ["ad", "crit", "as", "ap", "tank"] as const;
export type Profile = (typeof PROFILES)[number];

/** The shop stats (wiki keys) whose gold value makes up each profile. */
const PROFILE_STATS: Record<Profile, readonly string[]> = {
  ad: ["ad", "lethality", "armpen"],
  crit: ["crit"],
  as: ["as"],
  ap: ["ap", "mpenflat", "mpen"],
  tank: ["hp", "armor", "mr"],
};

/** An item the search can put in a build. */
export interface Candidate {
  /** The item the build names (Manamune). */
  record: ItemRecord;
  /** What its holder has in fights (Muramana, when Tear items are stacked). */
  held: ItemRecord;
  boots: boolean;
  /** The reviewed one-per-build groups it belongs to. */
  groups: readonly string[];
  /** The gold value of its shop stats by profile. */
  gold: Readonly<Record<Profile, number>>;
  parts: ItemParts;
}

export interface Build {
  items: Candidate[];
  /** The quick estimate against the enemy build it answers. */
  value: number;
}

export interface SearchOptions {
  format?: BuildFormat;
  /** Builds the beam keeps at each slot, besides the best of each profile. */
  width?: number;
  /** Builds of each profile the beam keeps at each slot. */
  perProfile?: number;
  /** Rounds in which the sides answer each other. */
  rounds?: number;
  /** Route builds per side that fight the other side's. */
  routes?: number;
  /** Tear items held stacked (Muramana), as in fights; the default. */
  stacked?: boolean;
}

const DEFAULTS: Required<SearchOptions> = { format: "sixItems", width: 20, perProfile: 3, rounds: 4, routes: 3, stacked: true };

export function names(build: Build): string[] {
  return build.items.map((item) => item.record.name);
}

export function profileOf(items: readonly Candidate[]): Profile {
  let best: Profile = "tank";
  let most = -1;
  for (const profile of PROFILES) {
    const gold = items.reduce((sum, item) => sum + item.gold[profile], 0);
    if (gold > most) {
      most = gold;
      best = profile;
    }
  }
  return best;
}

/** Every item `spec` can hold in `format`, with what it adds to the estimate. */
export function candidatesFor(spec: FighterSpec, catalog: ItemCatalog, equip: EquipOptions, prices: StatPrices, format: BuildFormat, stacked = true): Candidate[] {
  const withBoots = BUILD_FORMATS[format].boots > 0;
  return catalog.items
    .filter((record) => record.kind === "legendary" || (withBoots && record.kind === "boots"))
    .filter((record) => !(record.restriction && /only be purchased on ranged champions/i.test(record.restriction) && !spec.attack.ranged))
    .map((record) => {
      const held = stacked && record.transformsInto ? findItem(catalog, record.transformsInto) : record;
      const gold = Object.fromEntries(PROFILES.map((profile) => [profile, PROFILE_STATS[profile].reduce((sum, key) => sum + (held.stats[key] ?? 0) * (prices[key as keyof StatPrices] ?? 0), 0)])) as Record<Profile, number>;
      const groups = Object.entries(REVIEWED_GROUPS).filter(([, items]) => items.includes(record.name)).map(([group]) => group);
      return { record, held, boots: record.kind === "boots", groups, gold, parts: itemParts(spec, held, equip) };
    });
}

/** Whether `item` can join `items` in `format`: not twice, boots once, and one item per group. */
export function fits(items: readonly Candidate[], item: Candidate, format: BuildFormat): boolean {
  const limits = BUILD_FORMATS[format];
  let boots = 0;
  for (const held of items) {
    if (held.record === item.record) return false;
    if (held.boots) boots++;
    if (item.groups.length && held.groups.some((group) => item.groups.includes(group))) return false;
  }
  if (item.boots) return boots < limits.boots;
  return items.length - boots < limits.finished;
}

const keyOf = (items: readonly Candidate[]) => items.map((item) => item.record.name).sort().join("|");

/** The routes `you` finds against the enemy unit: the best full build of each profile, best first. */
export function searchSide(you: FighterSpec, candidates: readonly Candidate[], enemy: Unit, options: SearchOptions = {}): Build[] {
  const o = { ...DEFAULTS, ...options };
  const score = (items: Candidate[]): Build => ({ items, value: estimateAgainst(you, items.map((item) => item.parts), enemy) });
  const bare = score([]).value;
  // Items that add nothing to the estimate on their own aren't worth a slot.
  const useful = candidates.filter((item) => score([item]).value > bare + 1e-12);
  let beam: Build[] = [{ items: [], value: bare }];
  for (let slot = 0; slot < BUILD_SLOTS; slot++) {
    const next = new Map<string, Build>();
    for (const build of beam) {
      for (const item of useful) {
        if (!fits(build.items, item, o.format)) continue;
        const items = [...build.items, item];
        const key = keyOf(items);
        if (!next.has(key)) next.set(key, score(items));
      }
    }
    beam = keep([...next.values()], o.width, o.perProfile);
  }
  // Each profile's best full build, polished by one-item swaps.
  const routes = new Map<Profile, Build>();
  for (const build of beam) {
    if (build.items.length < BUILD_SLOTS) continue;
    const profile = profileOf(build.items);
    if (!routes.has(profile)) routes.set(profile, build);
  }
  const polished = [...routes.values()].map((build) => polish(build, useful, score, o.format));
  const best = new Map<string, Build>();
  for (const build of polished.sort((a, b) => b.value - a.value)) if (!best.has(keyOf(build.items))) best.set(keyOf(build.items), build);
  return [...best.values()];
}

/** The best `width` builds, and the best `perProfile` of each profile. */
function keep(builds: Build[], width: number, perProfile: number): Build[] {
  builds.sort((a, b) => b.value - a.value);
  const kept = new Set(builds.slice(0, width));
  const counts = new Map<Profile, number>();
  for (const build of builds) {
    const profile = profileOf(build.items);
    const count = counts.get(profile) ?? 0;
    if (count >= perProfile) continue;
    counts.set(profile, count + 1);
    kept.add(build);
  }
  return [...kept].sort((a, b) => b.value - a.value);
}

/** Swaps one item at a time for a better one while any swap helps, keeping the build's profile so that routes stay apart. */
function polish(build: Build, candidates: readonly Candidate[], score: (items: Candidate[]) => Build, format: BuildFormat): Build {
  const profile = profileOf(build.items);
  let current = build;
  for (let pass = 0; pass < 5; pass++) {
    let best = current;
    for (let i = 0; i < current.items.length; i++) {
      const rest = current.items.filter((_, j) => j !== i);
      for (const item of candidates) {
        if (!fits(rest, item, format)) continue;
        const items = [...rest.slice(0, i), item, ...rest.slice(i)];
        if (profileOf(items) !== profile) continue;
        const swapped = score(items);
        if (swapped.value > best.value + 1e-12) best = swapped;
      }
    }
    if (best === current) break;
    current = best;
  }
  return current;
}

export interface SearchedMatchup {
  /** Each side's route builds, best by the estimate first, against the other's best. */
  routes: [Build[], Build[]];
  /** Fight scores, yours, of each of your routes (rows) against each of theirs (columns). */
  scores: number[][];
  /** The routes each side takes by Udyr's rule. */
  chosen: [number, number];
  score: number;
  seconds: { search: number; fights: number };
}

/** Both sides' builds, each answering the other's, settled by fights between their routes. */
export function searchMatchup(you: FighterSpec, enemy: FighterSpec, catalog: ItemCatalog, equip: EquipOptions, prices: StatPrices, options: SearchOptions = {}): SearchedMatchup {
  const o = { ...DEFAULTS, ...options };
  const started = performance.now();
  const mineCandidates = candidatesFor(you, catalog, equip, prices, o.format, o.stacked);
  const theirCandidates = candidatesFor(enemy, catalog, equip, prices, o.format, o.stacked);
  const partsOf = (build: Build | undefined) => build?.items.map((item) => item.parts) ?? [];
  let mine: Build[] = [];
  let theirs: Build[] = [];
  for (let round = 0; round < o.rounds; round++) {
    mine = searchSide(you, mineCandidates, estimateUnit(enemy, partsOf(theirs[0]), 1), o);
    theirs = searchSide(enemy, theirCandidates, estimateUnit(you, partsOf(mine[0]), 1), o);
  }
  const searched = performance.now();
  const routes: [Build[], Build[]] = [mine.slice(0, o.routes), theirs.slice(0, o.routes)];
  const build = { stacked: o.stacked };
  const equippedMine = routes[0].map((b) => equipBuild(you, names(b), catalog, build));
  const equippedTheirs = routes[1].map((b) => equipBuild(enemy, names(b), catalog, build));
  const scores = equippedMine.map((a) => equippedTheirs.map((b) => runScenarios(...matchupSpecs(a, b)).score));
  const [row, column] = chooseRoutes(scores);
  const fought = performance.now();
  return { routes, scores, chosen: [row, column], score: scores[row]![column]!, seconds: { search: (searched - started) / 1000, fights: (fought - searched) / 1000 } };
}

/**
 * Udyr's rule (bestMatchup): with `scores` yours, rows your builds and columns theirs, you take
 * the row whose worst score is highest, and they take the column whose worst score for them
 * (your highest) is lowest. Ties go to the earlier route, the better by the estimate.
 */
export function chooseRoutes(scores: readonly (readonly number[])[]): [number, number] {
  let row = 0;
  let column = 0;
  let floor = Number.NEGATIVE_INFINITY;
  let ceiling = Number.POSITIVE_INFINITY;
  scores.forEach((line, i) => {
    const worst = Math.min(...line);
    if (worst > floor + 1e-12) {
      floor = worst;
      row = i;
    }
  });
  scores[0]?.forEach((_, j) => {
    const worst = Math.max(...scores.map((line) => line[j]!));
    if (worst < ceiling - 1e-12) {
      ceiling = worst;
      column = j;
    }
  });
  return [row, column];
}
