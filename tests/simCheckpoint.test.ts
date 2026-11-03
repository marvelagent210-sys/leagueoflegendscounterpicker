import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { BUDGET_STATS, type BudgetStat } from "../engine/budget";
import { SCENARIOS, SCENARIO_WEIGHTS } from "../engine/sim/scenarios";
import { readCheckpoint, writeCheckpoint, type CheckpointContext } from "../pipeline/sim/checkpoint";
import type { PairResult } from "../pipeline/sim/pool";

const dataset = "16.21";
const gold = 15000;
const pair: [string, string] = ["Aatrox", "Darius"];
const spent = () => Object.fromEntries(BUDGET_STATS.map((stat) => [stat, stat === "ad" ? gold : 0])) as Record<BudgetStat, number>;
const result = (): PairResult => {
  const scenarios = [1, -1, 0.5, 0.2, null, 0];
  let total = 0, score = 0;
  SCENARIOS.forEach((id, i) => { if (scenarios[i] !== null) { total += SCENARIO_WEIGHTS[id]; score += SCENARIO_WEIGHTS[id] * scenarios[i]!; } });
  return { index: 7, score: score / total, scenarios, spent: [spent(), spent()], variants: [{ side: 1, options: { rankQ: 6, rankW: 0 } }] };
};
let context: CheckpointContext;
beforeEach(async () => { context = { directory: await mkdtemp(path.join(tmpdir(), "sim-checkpoint-")), fingerprint: "model-fingerprint" }; });
afterEach(async () => { await rm(context.directory, { recursive: true, force: true }); });
const checkpointFile = async () => path.join(context.directory, (await readdir(context.directory))[0]!);

describe("persistent simulation checkpoints", () => {
  it("resumes a valid saved pair while preserving its exact numbers and variant choice", async () => {
    const saved = result();
    await writeCheckpoint(context, dataset, gold, pair, saved);
    expect(await readCheckpoint(context, dataset, gold, pair)).toEqual(saved);
    expect(await readdir(context.directory)).toHaveLength(1);
    expect((await readdir(context.directory))[0]).toMatch(/\.json$/);
  });

  it("recomputes missing, corrupt, and mismatched fingerprint/dataset/gold outputs", async () => {
    expect(await readCheckpoint(context, dataset, gold, pair)).toBeUndefined();
    await writeCheckpoint(context, dataset, gold, pair, result());
    expect(await readCheckpoint({ ...context, fingerprint: "changed" }, dataset, gold, pair)).toBeUndefined();
    expect(await readCheckpoint(context, "16.19", gold, pair)).toBeUndefined();
    expect(await readCheckpoint(context, dataset, 5000, pair)).toBeUndefined();
    const file = await checkpointFile();
    await writeFile(file, "{partial", "utf8");
    expect(await readCheckpoint(context, dataset, gold, pair)).toBeUndefined();
  });

  it("rejects malformed result shape, spent stats, scores and variants instead of resuming them", async () => {
    await writeCheckpoint(context, dataset, gold, pair, result());
    const file = await checkpointFile();
    const original = JSON.parse(await readFile(file, "utf8"));
    const corruptions: Array<(entry: typeof original) => void> = [
      (entry) => { entry.schema = 2; },
      (entry) => { entry.pair = ["Darius", "Aatrox"]; },
      (entry) => { entry.result.index = -1; },
      (entry) => { entry.result.score = 2; },
      (entry) => { entry.result.score += 0.01; },
      (entry) => { entry.result.scenarios.pop(); },
      (entry) => { entry.result.scenarios[0] = null; },
      (entry) => { entry.result.scenarios[0] = "1"; },
      (entry) => { entry.result.spent.pop(); },
      (entry) => { delete entry.result.spent[0].armor; },
      (entry) => { entry.result.spent[1].ad = -1; },
      (entry) => { entry.result.spent[1].ad = Infinity; },
      (entry) => { entry.result.variants.push({ side: 1, options: {} }); },
      (entry) => { entry.result.variants[0].side = 2; },
      (entry) => { entry.result.variants[0].options.rankQ = "6"; },
      (entry) => { entry.result.variants[0].options = []; },
    ];
    for (const corrupt of corruptions) {
      const changed = structuredClone(original);
      corrupt(changed);
      await writeFile(file, JSON.stringify(changed), "utf8");
      expect(await readCheckpoint(context, dataset, gold, pair)).toBeUndefined();
    }
  });

  it("encodes champion identifiers so path syntax cannot escape the checkpoint directory", async () => {
    const unusual: [string, string] = ["../Aatrox", "Darius/../../"];
    await writeCheckpoint(context, dataset, gold, unusual, result());
    expect(await readdir(context.directory)).toHaveLength(1);
    expect(await readCheckpoint(context, dataset, gold, unusual)).toEqual(result());
  });

  it("cleans its temporary file after a failed rename and surfaces the IO error", async () => {
    await writeCheckpoint(context, dataset, gold, pair, result());
    const file = await checkpointFile();
    await rm(file);
    await mkdir(file);
    await expect(writeCheckpoint(context, dataset, gold, pair, result())).rejects.toMatchObject({ code: "EISDIR" });
    expect(await readdir(context.directory)).toEqual([path.basename(file)]);
    await expect(readCheckpoint(context, dataset, gold, pair)).rejects.toMatchObject({ code: "EISDIR" });
  });

  it("refuses to persist a malformed result", async () => {
    const broken = result();
    broken.score = Number.NaN;
    await expect(writeCheckpoint(context, dataset, gold, pair, broken)).rejects.toThrow(TypeError);
    expect(await readdir(context.directory)).toEqual([]);
  });
});
