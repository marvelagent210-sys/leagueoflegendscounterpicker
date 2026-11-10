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
 *    against the other's best answer: the rule Udyr's rank splits use (bestMatchup). The route
 *    fights are a screen, the all-in scenarios with one branch each (screenScore); the pair
 *    taken then plays every scenario, for the matchup's result.
 * 5. With `loadouts`, the sides then choose their summoner spells and rune pages for the builds
 *    taken (pipeline/loadouts/search.ts), and the matchup's result is played with them.
 *
 * The result is the best build found within the model, not a guaranteed optimum.
 */
import type { StatPrices } from "../../engine/budget";
import { type MatchupResult, SCENARIO_WEIGHTS, engageRange, fightScore, runScenarios } from "../../engine/sim/scenarios";
import { fairFight } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { type EquipOptions, type EquippedFighter, type ItemParts, itemParts, matchupSpecs } from "../../items/equip";
import { type EstimateSide, estimateAgainst, estimateSide } from "../../items/estimate";
import { type CalibrationFight, calibrate, calibrated } from "./calibrate";
import { equipBuild, findItem } from "../itemData";
import { type LoadoutOptions, type SearchedLoadouts, equipLoadout, searchLoadouts } from "../loadouts/search";
import type { RuneRecords } from "../runeRecords/records";
import type { SpellCatalog } from "../summoners/records";
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
  /** Rounds in which the sides answer each other, at most: they stop once a pair of best builds comes back. */
  rounds?: number;
  /** Route builds per side that fight the other side's. */
  routes?: number;
  /** Tear items held stacked (Muramana), as in fights; the default. */
  stacked?: boolean;
  /** Each kit's estimate calibrated to a fight of its own (pipeline/items/calibrate.ts); the default. */
  calibrate?: boolean;
  /** Routes chosen by a screen of the all-in scenarios (screenScore), the default, or by every scenario. */
  screen?: boolean;
  /**
   * The sides' summoner spells and rune pages chosen too, for the builds taken, from these
   * catalogs (each champion's adaptive type for adaptive force on a tie); none by default.
   */
  loadouts?: { runes: RuneRecords; spells: SpellCatalog; adaptiveTypes: ["Physical" | "Magic", "Physical" | "Magic"]; options?: LoadoutOptions };
}

const DEFAULTS: Required<Omit<SearchOptions, "loadouts">> = { format: "sixItems", width: 8, perProfile: 1, rounds: 4, routes: 3, stacked: true, calibrate: true, screen: true };

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

/** The routes `you` finds against the enemy side: the best full build of each profile, best first. */
export function searchSide(you: FighterSpec, candidates: readonly Candidate[], enemy: EstimateSide, options: SearchOptions = {}): Build[] {
  const o = { ...DEFAULTS, ...options };
  const score = (items: Candidate[]): Build => ({ items, value: estimateAgainst(you, items.map((item) => item.parts), enemy) });
  const bare = score([]).value;
  // Items that add nothing to the estimate on their own aren't worth a slot, unless too few do
  // to fill a build (the one-per-group rules taking their share): then every item may.
  const helping = candidates.filter((item) => score([item]).value > bare + 1e-12);
  const useful = helping.length >= 2 * BUILD_SLOTS ? helping : candidates;
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
  /** Fight scores, yours, of each of your routes (rows) against each of theirs (columns): screens, or every scenario. */
  scores: number[][];
  /** The routes each side takes by Udyr's rule. */
  chosen: [number, number];
  /** The chosen builds' matchup, every scenario played. */
  result: MatchupResult;
  score: number;
  /** Rounds the sides answered each other in: until a pair of best builds came back. */
  rounds: number;
  /** Each kit's calibration, when the search calibrates. */
  calibrations?: [CalibrationFight, CalibrationFight];
  /** The sides' summoner spells and rune pages, when the search chooses them. */
  loadouts?: SearchedLoadouts;
  seconds: { calibration: number; search: number; fights: number; loadouts?: number };
}

/** Both sides' builds, each answering the other's, settled by fights between their routes. */
export function searchMatchup(you: FighterSpec, enemy: FighterSpec, catalog: ItemCatalog, equip: EquipOptions, prices: StatPrices, options: SearchOptions = {}): SearchedMatchup {
  const o = { ...DEFAULTS, ...options };
  const started = performance.now();
  // The estimate's kits, calibrated to their fights; the fights between routes use the kits themselves.
  const calibrations: [CalibrationFight, CalibrationFight] | undefined = o.calibrate ? [calibrate(you, enemy, prices), calibrate(enemy, you, prices)] : undefined;
  const [mySpec, theirSpec] = calibrations ? [calibrated(you, calibrations[0]), calibrated(enemy, calibrations[1])] : [you, enemy];
  const ready = performance.now();
  const mineCandidates = candidatesFor(you, catalog, equip, prices, o.format, o.stacked);
  const theirCandidates = candidatesFor(enemy, catalog, equip, prices, o.format, o.stacked);
  const partsOf = (build: Build | undefined) => build?.items.map((item) => item.parts) ?? [];
  let mine: Build[] = [];
  let theirs: Build[] = [];
  let rounds = 0;
  // Each side's best answer by round, until a pair of them comes back: the answers settle, or
  // go round a cycle (often two builds each, one answering the other's).
  const bests: Array<[Build, Build]> = [];
  let cycle: Array<[Build, Build]> = [];
  while (rounds < o.rounds) {
    mine = searchSide(mySpec, mineCandidates, estimateSide(theirSpec, partsOf(theirs[0]), 1), o);
    theirs = searchSide(theirSpec, theirCandidates, estimateSide(mySpec, partsOf(mine[0]), 1), o);
    rounds++;
    if (!mine[0] || !theirs[0]) throw new Error(`${mine[0] ? enemy.name : you.name}: the build search found no full build`);
    const pair: [Build, Build] = [mine[0], theirs[0]];
    const seen = bests.findIndex(([a, b]) => keyOf(a.items) === keyOf(pair[0].items) && keyOf(b.items) === keyOf(pair[1].items));
    if (seen >= 0) {
      cycle = bests.slice(seen);
      break;
    }
    bests.push(pair);
  }
  const searched = performance.now();
  // The last round's routes, with the cycle's other best answers first, so that fights see them.
  const routes: [Build[], Build[]] = [withCycle(mine, cycle.map(([a]) => a), o.routes), withCycle(theirs, cycle.map(([, b]) => b), o.routes)];
  const build = { stacked: o.stacked };
  const equippedMine = routes[0].map((b) => equipBuild(you, names(b), catalog, build));
  const equippedTheirs = routes[1].map((b) => equipBuild(enemy, names(b), catalog, build));
  const scores = equippedMine.map((a) => equippedTheirs.map((b) => (o.screen ? screenScore(...matchupSpecs(a, b)) : runScenarios(...matchupSpecs(a, b)).score)));
  const [row, column] = chooseRoutes(scores);
  let taken: [EquippedFighter, EquippedFighter] = [equippedMine[row]!, equippedTheirs[column]!];
  let loadouts: SearchedLoadouts | undefined;
  if (options.loadouts) {
    const { runes, spells, adaptiveTypes, options: settings } = options.loadouts;
    const catalogs = { items: catalog, runes, spells };
    const side = (spec: FighterSpec, estimate: FighterSpec, build: Build, adaptiveType: "Physical" | "Magic") => ({ spec, estimate, build: names(build), parts: build.items.map((item) => item.parts), adaptiveType });
    const sides = [side(you, mySpec, routes[0][row]!, adaptiveTypes[0]), side(enemy, theirSpec, routes[1][column]!, adaptiveTypes[1])] as const;
    loadouts = searchLoadouts([sides[0], sides[1]], catalogs, settings);
    taken = [equipLoadout(sides[0], loadouts.loadouts[0], catalogs), equipLoadout(sides[1], loadouts.loadouts[1], catalogs)];
  }
  const result = runScenarios(...matchupSpecs(...taken));
  const fought = performance.now();
  const loadoutSeconds = loadouts?.seconds;
  return {
    routes,
    scores,
    chosen: [row, column],
    result,
    score: result.score,
    rounds,
    ...(calibrations ? { calibrations } : {}),
    ...(loadouts ? { loadouts } : {}),
    seconds: { calibration: (ready - started) / 1000, search: (searched - ready) / 1000, fights: (fought - searched) / 1000 - (loadoutSeconds ?? 0), ...(loadoutSeconds !== undefined ? { loadouts: loadoutSeconds } : {}) },
  };
}

/**
 * A screen of a matchup for choosing between routes: the all-in scenarios (engaging either way,
 * and a brawl), which carry most of the scenarios' weight, with one branch each, weighted as
 * runScenarios weighs them. Against every scenario on ten matchups it chose another pair of
 * routes in half of them, whose full score was within 0.05 of the full choice's, in a fifth to
 * a half of the time (PLAN.md §13).
 */
export function screenScore(you: FighterSpec, enemy: FighterSpec): number {
  const settings = { maxBranches: 1 };
  const run = (distance: number) => fightScore(fairFight({ fighters: [you, enemy], distance, modes: ["fight", "fight"], settings }));
  const w = SCENARIO_WEIGHTS;
  return (w.youEngage * run(engageRange(you, enemy, settings)) + w.enemyEngages * run(engageRange(enemy, you, settings)) + w.brawl * run(0)) / (w.youEngage + w.enemyEngages + w.brawl);
}

/** A side's routes: its best build, the cycle's other best builds, then its other routes, `count` in all. */
export function withCycle(last: Build[], cycle: Build[], count: number): Build[] {
  const routes: Build[] = [];
  for (const build of [last[0]!, ...cycle, ...last.slice(1)]) {
    if (routes.length >= count) break;
    if (!routes.some((route) => keyOf(route.items) === keyOf(build.items))) routes.push(build);
  }
  return routes;
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
