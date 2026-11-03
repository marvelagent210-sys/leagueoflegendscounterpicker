/**
 * Stored results a refresh reuses (incremental refresh, PLAN.md §13). A pairing whose inputs
 * (pairKeys.ts) equal a stored result's is the same computation: the stored result stands and
 * isn't computed again. The stores are the dataset's own committed matrix and the previous
 * dataset's, so that a new patch computes only the pairings its changes touch.
 *
 * Plain stats: simulated.json holds each pairing's scores and the variants played, and
 * simulated-spent.json the gold each side spent by stat, which the simulator report needs.
 * Item builds: simulated-builds.json holds the scores, both builds and the variants.
 */
import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { BUDGET_STATS, type BudgetStat } from "../../engine/budget";
import type { MatchupVariant } from "../../engine/sim/matchup";
import { DATA_DIR, datasetDir } from "../config";
import type { BuildsPairResult } from "./buildsCheckpoint";
import { type PairInputs, isPairInputs, samePairInputs } from "./pairKeys";
import type { PairResult } from "./pool";

export const SPENT_FILE = "simulated-spent.json";

const DATASET_NAME = /^\d+\.\d+$/;

function compareDatasets(a: string, b: string): number {
  const [aMajor = 0, aMinor = 0] = a.split(".").map(Number);
  const [bMajor = 0, bMinor = 0] = b.split(".").map(Number);
  return aMajor - bMajor || aMinor - bMinor;
}

/** The dataset itself and the newest dataset before it, each where it has `file`: the stores, nearest first. */
export async function storeDatasets(dataset: string, file: string, dataDir = DATA_DIR): Promise<string[]> {
  const names = existsSync(dataDir) ? (await readdir(dataDir)).filter((name) => DATASET_NAME.test(name)) : [];
  const earlier = names.filter((name) => compareDatasets(name, dataset) < 0 && existsSync(path.join(dataDir, name, file))).sort(compareDatasets);
  return [
    ...(existsSync(path.join(dataDir, dataset, file)) ? [dataset] : []),
    ...(earlier.length > 0 ? [earlier.at(-1)!] : []),
  ];
}

/** A stored matrix: what its results were computed from, and the result of a pairing, from `you`'s side. */
export interface Store<T> {
  dataset: string;
  inputs: PairInputs;
  result(you: string, enemy: string): T | undefined;
}

type Rows<T> = Record<string, Record<string, T> | undefined>;

/** The variants each side played, as a pairing's result lists them. */
function variantsOf(rows: Rows<Record<string, number>> | undefined, you: string, enemy: string): MatchupVariant[] | undefined {
  const mine = rows?.[you]?.[enemy];
  const theirs = rows?.[enemy]?.[you];
  const variants: MatchupVariant[] = [...(mine ? [{ side: 0 as const, options: mine }] : []), ...(theirs ? [{ side: 1 as const, options: theirs }] : [])];
  return variants.length > 0 ? variants : undefined;
}

async function readJsonFile<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

interface PlainFile {
  simulation?: { fingerprint?: string };
  inputs?: unknown;
  matchups: Rows<Array<number | null>>;
  variants?: Rows<Record<string, number>>;
}

interface SpentFile {
  simulation?: { fingerprint?: string };
  stats?: string[];
  spent: Rows<number[]>;
}

/**
 * The plain matrices a refresh of `dataset` can reuse: its own and the previous dataset's, each
 * only with its inputs and its stat spending from the same computation.
 */
export async function plainStores(dataset: string, dataDir = DATA_DIR): Promise<Array<Store<Omit<PairResult, "index">>>> {
  const stores: Array<Store<Omit<PairResult, "index">>> = [];
  for (const name of await storeDatasets(dataset, "simulated.json", dataDir)) {
    const dir = dataDir === DATA_DIR ? datasetDir(name) : path.join(dataDir, name);
    if (!existsSync(path.join(dir, SPENT_FILE))) continue;
    const file = await readJsonFile<PlainFile>(path.join(dir, "simulated.json"));
    const spent = await readJsonFile<SpentFile>(path.join(dir, SPENT_FILE));
    if (!isPairInputs(file.inputs) || !file.simulation?.fingerprint || spent.simulation?.fingerprint !== file.simulation.fingerprint) continue;
    if (JSON.stringify(spent.stats) !== JSON.stringify(BUDGET_STATS)) continue;
    const record = (values: number[]) => Object.fromEntries(BUDGET_STATS.map((stat, i) => [stat, values[i] ?? 0])) as Record<BudgetStat, number>;
    stores.push({
      dataset: name,
      inputs: file.inputs,
      result(you, enemy) {
        const values = file.matchups[you]?.[enemy];
        const mine = spent.spent[you]?.[enemy];
        const theirs = spent.spent[enemy]?.[you];
        if (!values || typeof values[0] !== "number" || !mine || !theirs) return undefined;
        const variants = variantsOf(file.variants, you, enemy);
        return { score: values[0], scenarios: values.slice(1), spent: [record(mine), record(theirs)], ...(variants ? { variants } : {}) };
      },
    });
  }
  return stores;
}

interface BuildsFile {
  format?: string;
  inputs?: unknown;
  items: string[];
  matchups: Rows<Array<number | null>>;
  builds: Rows<number[]>;
  variants?: Rows<Record<string, number>>;
}

/** The build matrices of `format` a refresh of `dataset` can reuse: its own and the previous dataset's. */
export async function buildsStores(dataset: string, format: string, file = "simulated-builds.json", dataDir = DATA_DIR): Promise<Array<Store<Omit<BuildsPairResult, "index">>>> {
  const stores: Array<Store<Omit<BuildsPairResult, "index">>> = [];
  for (const name of await storeDatasets(dataset, file, dataDir)) {
    const stored = await readJsonFile<BuildsFile>(path.join(dataDir === DATA_DIR ? datasetDir(name) : path.join(dataDir, name), file));
    if (!isPairInputs(stored.inputs) || stored.format !== format) continue;
    const names = (indices: number[] | undefined) => indices?.map((index) => stored.items[index]);
    stores.push({
      dataset: name,
      inputs: stored.inputs,
      result(you, enemy) {
        const values = stored.matchups[you]?.[enemy];
        const mine = names(stored.builds[you]?.[enemy]);
        const theirs = names(stored.builds[enemy]?.[you]);
        if (!values || typeof values[0] !== "number" || !mine || !theirs || [...mine, ...theirs].some((item) => typeof item !== "string")) return undefined;
        const variants = variantsOf(stored.variants, you, enemy);
        // Reused, not computed: no processor time of its own in this refresh.
        return { score: values[0], scenarios: values.slice(1), builds: [mine as string[], theirs as string[]], ...(variants ? { variants } : {}), seconds: 0 };
      },
    });
  }
  return stores;
}

/**
 * The pairings whose stored result stands under the current inputs, by index, and how many each
 * store gave. Pairings of a champion in `recompute` are computed again whatever is stored.
 */
export function reusable<T>(pairs: ReadonlyArray<readonly [string, string]>, current: PairInputs, stores: ReadonlyArray<Store<T>>, recompute: ReadonlySet<string> = new Set()): { results: Map<number, T>; from: Map<string, number> } {
  const results = new Map<number, T>();
  const from = new Map<string, number>();
  pairs.forEach(([you, enemy], index) => {
    if (recompute.has(you) || recompute.has(enemy)) return;
    for (const store of stores) {
      if (!samePairInputs(store.inputs, current, you, enemy)) continue;
      const result = store.result(you, enemy);
      if (result === undefined) continue;
      results.set(index, result);
      from.set(store.dataset, (from.get(store.dataset) ?? 0) + 1);
      return;
    }
  });
  return { results, from };
}

/** --recompute's comma-separated champion ids, each one a kit's. */
export function parseRecompute(value: string | undefined, ids: readonly string[]): Set<string> {
  const wanted = (value ?? "").split(",").map((id) => id.trim()).filter((id) => id.length > 0);
  const unknown = wanted.filter((id) => !ids.includes(id));
  if (unknown.length > 0) throw new Error(`--recompute: no kit for ${unknown.join(", ")}`);
  return new Set(wanted);
}

/** "i/N" for --shard: this machine's share of the pending pairings, the i-th of N (from 0). */
export function parseShard(value: string | undefined): { index: number; count: number } | undefined {
  if (value === undefined) return undefined;
  const match = /^(\d+)\/(\d+)$/.exec(value);
  const index = Number(match?.[1]);
  const count = Number(match?.[2]);
  if (!match || !Number.isSafeInteger(index) || !Number.isSafeInteger(count) || count < 1 || index >= count) throw new Error("--shard takes i/N, with 0 <= i < N");
  return { index, count };
}

/** A shard's pairings: every N-th of the pending ones, from the i-th, so that shards split them evenly and never overlap. */
export function shardOf<T>(pending: readonly T[], shard: { index: number; count: number } | undefined): T[] {
  return shard ? pending.filter((_, k) => k % shard.count === shard.index) : [...pending];
}

/** A short account of what a refresh reused, for its log. */
export function reuseSummary(total: number, from: ReadonlyMap<string, number>): string {
  const reused = [...from.values()].reduce((sum, n) => sum + n, 0);
  const sources = [...from].map(([dataset, n]) => `${n} from ${dataset}`).join(", ");
  return `${reused}/${total} pairings unchanged${reused > 0 ? ` (${sources})` : ""}, ${total - reused} to compute`;
}
