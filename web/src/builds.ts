/**
 * The duel results with item builds in the app (npm run build:builds): each side's build, its
 * summoner spells and the scores, read from a precomputed build matrix: six items, or five
 * items and boots. The
 * build and loadout searches take seconds a pairing,
 * too slow for the browser, so these results hold at the default fight settings only. The
 * plain stat budget's gold doesn't enter them (the builds buy items), and changed scenario
 * weights reweigh their scenarios.
 */
import { type MatrixLoadout, type PrecomputedBuilds, decodeLoadout } from "../../engine/sim/precomputed";
import { type AppSettings, DEFAULT_APP_SETTINGS, KIT_OPTIONS, blend, fightKey, weightsChanged } from "./settings";

/** Which duels rank the champions: with six-item builds, with five items and boots, or with the plain stat budget. */
export type ResultsMode = "builds" | "boots" | "plain";

export const RESULTS_MODES: ResultsMode[] = ["builds", "boots", "plain"];

export const RESULTS_LABELS: Record<ResultsMode, string> = { builds: "Six items", boots: "Five items and boots", plain: "Plain stats" };

/** What each build matrix's builds hold, for the notes. */
export const BUILD_TEXT: Record<Exclude<ResultsMode, "plain">, string> = { builds: "six finished items", boots: "five finished items and boots" };

/** The dataset's current build matrices: six items, and five items and boots. */
export interface BuildMatrices {
  builds?: PrecomputedBuilds;
  boots?: PrecomputedBuilds;
}

/** The build matrix of a results mode, if the dataset has it. */
export function matrixOf(matrices: BuildMatrices | undefined, mode: ResultsMode): PrecomputedBuilds | undefined {
  return mode === "builds" ? matrices?.builds : mode === "boots" ? matrices?.boots : undefined;
}

/** The results modes the dataset can show: plain stats always, each build matrix it has. */
export function availableModes(matrices: BuildMatrices | undefined): ResultsMode[] {
  return RESULTS_MODES.filter((mode) => mode === "plain" || matrixOf(matrices, mode) !== undefined);
}

/** Whether the build matrix's fights are the ones these settings play: every fight setting at its default but the plain stats' gold. */
export function buildsApply(settings: AppSettings): boolean {
  return fightKey({ ...settings, gold: DEFAULT_APP_SETTINGS.gold }) === fightKey(DEFAULT_APP_SETTINGS);
}

/** The results the app shows: a build matrix when the visitor wants it, the dataset has it and it holds for the settings; plain stats otherwise. */
export function shownResults(matrices: BuildMatrices | undefined, wanted: ResultsMode, settings: AppSettings): ResultsMode {
  return matrixOf(matrices, wanted) && buildsApply(settings) ? wanted : "plain";
}

/** The build matrix the app shows, if any (shownResults). */
export function shownMatrix(matrices: BuildMatrices | undefined, wanted: ResultsMode, settings: AppSettings): PrecomputedBuilds | undefined {
  return matrixOf(matrices, shownResults(matrices, wanted, settings));
}

/** One matchup of the build matrix, from `you`'s side. */
export interface BuildsMatchup {
  score: number;
  /** Scenario scores in SCENARIOS order; null where a scenario doesn't apply. */
  scenarios: Array<number | null>;
  /** Your build against the enemy's, then theirs against yours: item names. */
  builds: [string[], string[]];
  /** Your summoner spells, then theirs: none from a matrix without loadouts. */
  loadouts: [MatrixLoadout | undefined, MatrixLoadout | undefined];
  /** The kit options each side played, where its kit has variants (Udyr's rank splits). */
  variants: [Record<string, number> | undefined, Record<string, number> | undefined];
}

export function buildsMatchup(file: PrecomputedBuilds, you: string, enemy: string, settings: AppSettings): BuildsMatchup | undefined {
  const values = file.matchups[you]?.[enemy];
  const mine = file.builds[you]?.[enemy];
  const theirs = file.builds[enemy]?.[you];
  const score = values?.[0];
  if (!values || typeof score !== "number" || !mine || !theirs) return undefined;
  const scenarios = values.slice(1);
  const item = (index: number) => file.items[index] ?? `item ${index}`;
  return {
    score: weightsChanged(settings) ? blend(scenarios, settings.weights) : score,
    scenarios,
    builds: [mine.map(item), theirs.map(item)],
    loadouts: [decodeLoadout(file.loadouts?.[you]?.[enemy], file.loadoutNames ?? []), decodeLoadout(file.loadouts?.[enemy]?.[you], file.loadoutNames ?? [])],
    variants: [file.variants?.[you]?.[enemy], file.variants?.[enemy]?.[you]],
  };
}

/**
 * A kit variant's options in words, by the kit's own option labels without their asides, and
 * leaving out those at their defaults: "Wilding Claw's rank 6, Iron Mantle's rank 5". Empty
 * when every option is at its default.
 */
export function variantText(champion: string, options: Record<string, number>): string {
  return Object.entries(options)
    .flatMap(([key, value]) => {
      const option = KIT_OPTIONS.find((o) => o.champion === champion && o.key === key);
      if (option && value === option.default) return [];
      return [`${option ? option.label.replace(/\s*\([^)]*\)/g, "") : key} ${value}`];
    })
    .join(", ");
}

/** How many of the item builds' matchups each item appears in, for one champion against every enemy: most first. */
export function itemShares(file: PrecomputedBuilds, you: string): Array<{ item: string; share: number }> {
  const row = file.builds[you];
  if (!row) return [];
  const builds = Object.values(row);
  const counts = new Map<number, number>();
  for (const build of builds) for (const index of build) counts.set(index, (counts.get(index) ?? 0) + 1);
  return [...counts]
    .map(([index, count]) => ({ item: file.items[index] ?? `item ${index}`, share: count / builds.length }))
    .sort((a, b) => b.share - a.share || a.item.localeCompare(b.item));
}
