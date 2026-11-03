/**
 * The plan of a sharded refresh on GitHub Actions (.github/workflows/refresh.yml): which
 * matrices have pairings to compute, and how many shards each splits into.
 *
 *   npx tsx pipeline/sim/ciPlan.ts [--request .github/refresh-request.json]
 *
 * The request is a JSON file, and the workflow's inputs (REFRESH_DATASET, REFRESH_MATRICES,
 * REFRESH_RECOMPUTE) take precedence over it. It names the dataset (the newest by default), the
 * matrices ("sim" for plain stats, "builds" for item builds; both by default), the champions
 * whose pairings are computed again whatever is stored, and optionally each matrix's shard
 * count. Without one, a matrix gets a shard per hour of computing on a four-core runner, at most
 * MAX_SHARDS. The plan goes to $GITHUB_OUTPUT and $GITHUB_STEP_SUMMARY when they are set, and
 * to stdout as JSON.
 */
import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { KITS } from "../../kits/champions/index";
import { REPO_ROOT } from "../config";

export type Matrix = "sim" | "builds";
export const MATRICES: readonly Matrix[] = ["sim", "builds"];

/** Processor-seconds a pairing takes on average: the 26.20 refreshes took 6.9 and 19.4 hours on four threads. */
export const SECONDS_PER_PAIRING: Readonly<Record<Matrix, number>> = { sim: 6.7, builds: 18.8 };
/** Threads per shard: GitHub's standard Linux runner for a public repository has four cores. */
export const THREADS = 4;
/** The computing a shard gets by default, well inside a job's six-hour limit. */
export const TARGET_SECONDS = 3600;
/** Shards per matrix by default: twenty jobs run at once on GitHub's free plan; more would queue. */
export const MAX_SHARDS = 20;
/** GitHub runs at most 256 jobs from one matrix. */
const MATRIX_LIMIT = 256;

export interface RefreshRequest {
  dataset?: string;
  matrices: Matrix[];
  recompute: string[];
  shards: Partial<Record<Matrix, number>>;
}

function list(value: unknown, what: string): string[] {
  if (value === undefined || value === null) return [];
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) return value.map((item) => item.trim()).filter((item) => item.length > 0);
  throw new Error(`The request's ${what} must be a list of names`);
}

/** A refresh request from its file and the workflow's inputs (which take precedence), checked. */
export function parseRequest(file: unknown, env: Readonly<Record<string, string | undefined>>, kits: readonly string[]): RefreshRequest {
  if (file === null || typeof file !== "object" || Array.isArray(file)) throw new Error("The refresh request must be a JSON object");
  const record = file as Record<string, unknown>;
  const known = new Set(["dataset", "matrices", "recompute", "shards", "note"]);
  const extra = Object.keys(record).filter((key) => !known.has(key));
  if (extra.length > 0) throw new Error(`Unknown refresh request field ${extra.join(", ")}`);
  const given = (name: string) => (env[name]?.trim() ? env[name]!.trim() : undefined);

  const dataset = given("REFRESH_DATASET") ?? (record.dataset === undefined ? undefined : String(record.dataset));
  if (dataset !== undefined && !/^\d+\.\d+$/.test(dataset)) throw new Error(`Dataset "${dataset}" isn't a Data Dragon version such as 16.20`);

  const matrices = list(given("REFRESH_MATRICES") ?? record.matrices, "matrices");
  const unknownMatrix = matrices.filter((matrix) => !MATRICES.includes(matrix as Matrix));
  if (unknownMatrix.length > 0) throw new Error(`Unknown matrix ${unknownMatrix.join(", ")}: use sim or builds`);

  const recompute = list(given("REFRESH_RECOMPUTE") ?? record.recompute, "recompute");
  const unknownKit = recompute.filter((id) => !kits.includes(id));
  if (unknownKit.length > 0) throw new Error(`No kit for ${unknownKit.join(", ")}`);

  const shards: Partial<Record<Matrix, number>> = {};
  if (record.shards !== undefined) {
    if (record.shards === null || typeof record.shards !== "object" || Array.isArray(record.shards)) throw new Error("The request's shards must map a matrix to a count");
    for (const [matrix, count] of Object.entries(record.shards as Record<string, unknown>)) {
      if (!MATRICES.includes(matrix as Matrix)) throw new Error(`Unknown matrix ${matrix} in shards`);
      if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 1 || count > MATRIX_LIMIT) throw new Error(`${matrix}: a shard count is a whole number from 1 to ${MATRIX_LIMIT}`);
      shards[matrix as Matrix] = count;
    }
  }
  return { ...(dataset ? { dataset } : {}), matrices: matrices.length > 0 ? [...new Set(matrices as Matrix[])] : [...MATRICES], recompute: [...new Set(recompute)], shards };
}

/** How many shards `pending` pairings split into: as requested, or one per TARGET_SECONDS of computing, never more than there are pairings. */
export function shardCount(pending: number, secondsPerPairing: number, requested?: number): number {
  if (pending <= 0) return 0;
  const wanted = requested ?? Math.min(MAX_SHARDS, Math.ceil((pending * secondsPerPairing) / (THREADS * TARGET_SECONDS)));
  return Math.max(1, Math.min(wanted, pending, MATRIX_LIMIT));
}

interface MatrixPlan {
  pairings: number;
  reused: number;
  pending: number;
  shards: number;
}

const SCRIPTS: Record<Matrix, string> = { sim: "pipeline/sim/refresh.ts", builds: "pipeline/sim/builds.ts" };

/** A matrix's own --plan: how many of its pairings are pending. */
function matrixPlan(matrix: Matrix, request: RefreshRequest): { dataset: string; pairings: number; reused: number; pending: number } {
  const args = ["tsx", SCRIPTS[matrix], "--plan", ...(request.dataset ? ["--dataset", request.dataset] : []), ...(request.recompute.length > 0 ? ["--recompute", request.recompute.join(",")] : [])];
  const output = execFileSync("npx", args, { cwd: REPO_ROOT, encoding: "utf8" });
  const last = output.trim().split("\n").at(-1) ?? "";
  return JSON.parse(last) as { dataset: string; pairings: number; reused: number; pending: number };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const at = args.indexOf("--request");
  const file = at >= 0 ? args[at + 1] : undefined;
  if (at >= 0 && !file) throw new Error("--request requires a file");
  const requestFile = file ? path.resolve(REPO_ROOT, file) : undefined;
  const raw = requestFile && existsSync(requestFile) ? (JSON.parse(readFileSync(requestFile, "utf8")) as unknown) : {};
  const request = parseRequest(raw, process.env, Object.keys(KITS));

  const plans: Partial<Record<Matrix, MatrixPlan>> = {};
  let dataset = request.dataset;
  for (const matrix of request.matrices) {
    const plan = matrixPlan(matrix, request);
    dataset ??= plan.dataset;
    if (plan.dataset !== dataset) throw new Error(`The ${matrix} plan is for ${plan.dataset}, not ${dataset}`);
    plans[matrix] = { pairings: plan.pairings, reused: plan.reused, pending: plan.pending, shards: shardCount(plan.pending, SECONDS_PER_PAIRING[matrix], request.shards[matrix]) };
  }
  if (!dataset) throw new Error("No dataset to refresh");

  const outputs: Record<string, string> = { dataset, matrices: request.matrices.join(","), recompute: request.recompute.join(",") };
  for (const matrix of MATRICES) {
    const plan = plans[matrix];
    outputs[`${matrix}_count`] = String(plan?.shards ?? 0);
    outputs[`${matrix}_pending`] = String(plan?.pending ?? 0);
    outputs[`${matrix}_shards`] = JSON.stringify(Array.from({ length: plan?.shards ?? 0 }, (_, index) => index));
  }
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(outputs).map(([key, value]) => `${key}=${value}\n`).join(""));
  if (process.env.GITHUB_STEP_SUMMARY) {
    const rows = request.matrices.map((matrix) => {
      const plan = plans[matrix]!;
      const hours = (plan.pending * SECONDS_PER_PAIRING[matrix]) / 3600;
      return `| ${matrix === "sim" ? "Plain stats" : "Item builds"} | ${plan.pairings} | ${plan.reused} | ${plan.pending} | ${plan.shards} | about ${hours.toFixed(1)} |`;
    });
    const recomputed = request.recompute.length > 0 ? `\n\nComputed again whatever is stored: ${request.recompute.join(", ")}.` : "";
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## Refresh plan for ${dataset}\n\n| Matrix | Pairings | Reused | To compute | Shards | Processor-hours |\n|---|---|---|---|---|---|\n${rows.join("\n")}${recomputed}\n`);
  }
  console.log(JSON.stringify({ dataset, matrices: request.matrices, recompute: request.recompute, plans }));
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
