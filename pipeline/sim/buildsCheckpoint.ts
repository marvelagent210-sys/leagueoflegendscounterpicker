/**
 * The build matrix's per-pair checkpoints (npm run build:builds): checkpoint.ts's atomic,
 * validated files, with each side's build and loadout. A long run that stops resumes from them.
 */
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { MatchupVariant } from "../../engine/sim/matchup";
import type { MatrixLoadout } from "../../engine/sim/precomputed";
import { SCENARIOS, SCENARIO_WEIGHTS } from "../../engine/sim/scenarios";

/** A side's summoner spells and rune page, by name (pipeline/loadouts/search.ts). */
export type LoadoutRecord = MatrixLoadout;

/** One pairing of the build matrix. */
export interface BuildsPairResult {
  index: number;
  score: number;
  /** Scenario scores in SCENARIOS order; null where a scenario doesn't apply. */
  scenarios: Array<number | null>;
  /** Each side's build, item names: you, then the enemy. */
  builds: [string[], string[]];
  /** Each side's summoner spells and rune page: you, then the enemy. */
  loadouts: [LoadoutRecord, LoadoutRecord];
  /** The kit variants played by the sides that had several, with the builds found. */
  variants?: MatchupVariant[];
  /** Seconds the pairing took: calibration, search and fights. */
  seconds: number;
}

export interface BuildsCheckpointContext {
  directory: string;
  fingerprint: string;
  format: string;
}

interface Checkpoint {
  schema: 2;
  fingerprint: string;
  dataset: string;
  format: string;
  pair: [string, string];
  result: BuildsPairResult;
}

const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const bounded = (value: unknown): value is number => finite(value) && Math.abs(value) <= 1;
const build = (value: unknown): value is string[] => Array.isArray(value) && value.length >= 1 && value.length <= 6 && value.every((item) => typeof item === "string" && item.length > 0) && new Set(value).size === value.length;
const names = (value: unknown, count: number): value is string[] => Array.isArray(value) && value.length === count && value.every((name) => typeof name === "string" && name.length > 0);
/** Two different spells, and a page's keystone, three primary runes, two secondary runes and three shards, by name. */
export const validLoadout = (value: unknown): value is LoadoutRecord =>
  record(value) && names(value.spells, 2) && new Set(value.spells).size === 2 && record(value.page) && typeof value.page.keystone === "string" && value.page.keystone.length > 0 && names(value.page.primary, 3) && names(value.page.secondary, 2) && names(value.page.shards, 3);

function filename(context: BuildsCheckpointContext, pair: [string, string]): string {
  if (!pair.every((id) => typeof id === "string" && id.length > 0)) throw new TypeError("Checkpoint champion identifiers must be nonempty strings");
  const key = pair.map((id) => Buffer.from(id, "utf8").toString("base64url")).join(".");
  return path.join(context.directory, `${key}.json`);
}

export function validBuildsResult(value: unknown): value is BuildsPairResult {
  if (!record(value) || !Number.isSafeInteger(value.index) || (value.index as number) < 0 || !bounded(value.score) || !finite(value.seconds) || value.seconds < 0) return false;
  if (!Array.isArray(value.scenarios) || value.scenarios.length !== SCENARIOS.length) return false;
  let weight = 0;
  let weighted = 0;
  for (let i = 0; i < SCENARIOS.length; i++) {
    const id = SCENARIOS[i]!;
    const score: unknown = value.scenarios[i];
    if (score === null && id === "spacing") continue;
    if (!bounded(score)) return false;
    weight += SCENARIO_WEIGHTS[id];
    weighted += SCENARIO_WEIGHTS[id] * score;
  }
  if (Math.abs(value.score - weighted / weight) > 1e-9) return false;
  if (!Array.isArray(value.builds) || value.builds.length !== 2 || !value.builds.every(build)) return false;
  if (!Array.isArray(value.loadouts) || value.loadouts.length !== 2 || !value.loadouts.every(validLoadout)) return false;
  if (value.variants !== undefined) {
    if (!Array.isArray(value.variants) || value.variants.length > 2) return false;
    const sides = new Set<number>();
    for (const variant of value.variants as unknown[]) {
      if (!record(variant) || (variant.side !== 0 && variant.side !== 1) || sides.has(variant.side) || !record(variant.options) || !Object.values(variant.options).every(finite)) return false;
      sides.add(variant.side);
    }
  }
  return true;
}

/** Writes only complete, valid results; a failed write never leaves a partial final file. */
export async function writeBuildsCheckpoint(context: BuildsCheckpointContext, dataset: string, pair: [string, string], result: BuildsPairResult): Promise<void> {
  if (!context.fingerprint || !dataset || !context.format || !validBuildsResult(result)) throw new TypeError("Invalid build matrix checkpoint metadata or result");
  const file = filename(context, pair);
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  const checkpoint: Checkpoint = { schema: 2, fingerprint: context.fingerprint, dataset, format: context.format, pair, result };
  await mkdir(context.directory, { recursive: true });
  try {
    await writeFile(temporary, JSON.stringify(checkpoint), { encoding: "utf8", flag: "wx" });
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
}

/** Corrupt, missing or incompatible checkpoints are recomputed; genuine IO failures surface. */
export async function readBuildsCheckpoint(context: BuildsCheckpointContext, dataset: string, pair: [string, string]): Promise<BuildsPairResult | undefined> {
  let text: string;
  try {
    text = await readFile(filename(context, pair), "utf8");
  } catch (error) {
    if (record(error) && error.code === "ENOENT") return undefined;
    throw error;
  }
  let checkpoint: unknown;
  try {
    checkpoint = JSON.parse(text);
  } catch (error) {
    if (error instanceof SyntaxError) return undefined;
    throw error;
  }
  if (!record(checkpoint) || checkpoint.schema !== 2 || checkpoint.fingerprint !== context.fingerprint || checkpoint.dataset !== dataset || checkpoint.format !== context.format || !Array.isArray(checkpoint.pair) || checkpoint.pair.length !== 2 || checkpoint.pair[0] !== pair[0] || checkpoint.pair[1] !== pair[1] || !validBuildsResult(checkpoint.result)) return undefined;
  return checkpoint.result;
}
