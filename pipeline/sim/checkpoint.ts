/** Atomic, validated per-pair outputs that survive interrupted dataset regeneration. */
import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { BUDGET_STATS } from "../../engine/budget";
import { SCENARIOS, SCENARIO_WEIGHTS } from "../../engine/sim/scenarios";
import type { PairResult } from "./pool";

export interface CheckpointContext {
  directory: string;
  fingerprint: string;
}

interface Checkpoint {
  schema: 1;
  fingerprint: string;
  dataset: string;
  gold: number;
  pair: [string, string];
  result: PairResult;
}

const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value);
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);
const bounded = (value: unknown): value is number => finite(value) && Math.abs(value) <= 1;

function filename(context: CheckpointContext, pair: [string, string]): string {
  if (!pair.every((id) => typeof id === "string" && id.length > 0)) throw new TypeError("Checkpoint champion identifiers must be nonempty strings");
  // Base64url contains neither path separators nor '.', making the pair delimiter
  // unambiguous even for identifiers containing punctuation or traversal sequences.
  const key = pair.map((id) => Buffer.from(id, "utf8").toString("base64url")).join(".");
  return path.join(context.directory, `${key}.json`);
}

function validResult(value: unknown): value is PairResult {
  if (!record(value) || !Number.isSafeInteger(value.index) || (value.index as number) < 0 || !bounded(value.score)) return false;
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
  if (!Array.isArray(value.spent) || value.spent.length !== 2 || !value.spent.every((side: unknown) => record(side) && BUDGET_STATS.every((stat) => finite(side[stat]) && side[stat] >= 0))) return false;
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

/** Writes only complete, valid results; failed writes never leave a partial final JSON. */
export async function writeCheckpoint(context: CheckpointContext, dataset: string, gold: number, pair: [string, string], result: PairResult): Promise<void> {
  if (!context.fingerprint || !dataset || !finite(gold) || gold < 0 || !validResult(result)) throw new TypeError("Invalid simulation checkpoint metadata or result");
  const file = filename(context, pair);
  const temporary = `${file}.${process.pid}.${randomUUID()}.tmp`;
  const checkpoint: Checkpoint = { schema: 1, fingerprint: context.fingerprint, dataset, gold, pair, result };
  await mkdir(context.directory, { recursive: true });
  try {
    await writeFile(temporary, JSON.stringify(checkpoint), { encoding: "utf8", flag: "wx" });
    await rename(temporary, file);
  } finally {
    await rm(temporary, { force: true });
  }
}

/** Corrupt, missing, or incompatible outputs are recomputed; genuine IO failures surface. */
export async function readCheckpoint(context: CheckpointContext, dataset: string, gold: number, pair: [string, string]): Promise<PairResult | undefined> {
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
  if (!record(checkpoint) || checkpoint.schema !== 1 || checkpoint.fingerprint !== context.fingerprint || checkpoint.dataset !== dataset || checkpoint.gold !== gold || !Array.isArray(checkpoint.pair) || checkpoint.pair.length !== 2 || checkpoint.pair[0] !== pair[0] || checkpoint.pair[1] !== pair[1] || !validResult(checkpoint.result)) return undefined;
  return checkpoint.result;
}
