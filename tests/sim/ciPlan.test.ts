/**
 * The sharded refresh's plan (pipeline/sim/ciPlan.ts, .github/workflows/refresh.yml): the
 * request it reads, checked, and the number of shards the pending pairings split into.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KITS } from "../../kits/champions/index";
import { REPO_ROOT } from "../../pipeline/config";
import { MAX_SHARDS, SECONDS_PER_PAIRING, THREADS, TARGET_SECONDS, parseRequest, shardCount } from "../../pipeline/sim/ciPlan";

const kits = ["Darius", "Garen", "Jax"];

describe("a refresh request", () => {
  it("defaults to both matrices of the newest dataset, with nothing forced", () => {
    expect(parseRequest({}, {}, kits)).toEqual({ matrices: ["sim", "builds"], recompute: [], shards: {} });
  });

  it("reads the file, and the workflow's inputs over it", () => {
    const file = { dataset: "16.20", matrices: ["builds"], recompute: ["Darius"], shards: { builds: 3 }, note: "why" };
    expect(parseRequest(file, {}, kits)).toEqual({ dataset: "16.20", matrices: ["builds"], recompute: ["Darius"], shards: { builds: 3 } });
    expect(parseRequest(file, { REFRESH_DATASET: "16.21", REFRESH_MATRICES: "sim, builds", REFRESH_RECOMPUTE: "Garen,Jax", REFRESH_SHARDS: "ignored" }, kits)).toEqual({
      dataset: "16.21",
      matrices: ["sim", "builds"],
      recompute: ["Garen", "Jax"],
      shards: { builds: 3 },
    });
    // Empty inputs (a push, or a dispatch left blank) leave the file's values.
    expect(parseRequest(file, { REFRESH_DATASET: "", REFRESH_MATRICES: " ", REFRESH_RECOMPUTE: "" }, kits).dataset).toBe("16.20");
  });

  it("refuses what it can't run", () => {
    expect(() => parseRequest([], {}, kits)).toThrow(/object/);
    expect(() => parseRequest({ datset: "16.20" }, {}, kits)).toThrow(/datset/);
    expect(() => parseRequest({ dataset: "16.20; rm -rf /" }, {}, kits)).toThrow(/Data Dragon version/);
    expect(() => parseRequest({ matrices: ["runes"] }, {}, kits)).toThrow(/runes/);
    expect(() => parseRequest({ recompute: ["Nobody"] }, {}, kits)).toThrow(/Nobody/);
    expect(() => parseRequest({}, { REFRESH_RECOMPUTE: "Darius,$(id)" }, kits)).toThrow(/\$\(id\)/);
    for (const shards of [{ sim: 0 }, { sim: 1.5 }, { sim: 257 }, { runes: 2 }, [2]]) expect(() => parseRequest({ shards }, {}, kits)).toThrow();
  });

  it("is a valid request as committed", async () => {
    const file = JSON.parse(await readFile(path.join(REPO_ROOT, ".github", "refresh-request.json"), "utf8")) as unknown;
    expect(() => parseRequest(file, {}, Object.keys(KITS))).not.toThrow();
  });
});

describe("shards", () => {
  it("give each shard about an hour of computing, at most twenty, never more than the pairings", () => {
    expect(shardCount(0, SECONDS_PER_PAIRING.builds)).toBe(0);
    expect(shardCount(1, SECONDS_PER_PAIRING.builds)).toBe(1);
    // A full build matrix: 14,878 pairings of about 19 s on four threads a shard, 19.4 shard-hours.
    expect((14878 * SECONDS_PER_PAIRING.builds) / (THREADS * TARGET_SECONDS)).toBeCloseTo(19.4, 1);
    expect(shardCount(14878, SECONDS_PER_PAIRING.builds)).toBe(MAX_SHARDS);
    // More than that still runs on the twenty runners that run at once, each for longer.
    expect(shardCount(30000, SECONDS_PER_PAIRING.builds)).toBe(MAX_SHARDS);
    // 26.21's plain-stats refresh: 9,522 pairings of about 6.7 s.
    expect(shardCount(9522, SECONDS_PER_PAIRING.sim)).toBe(5);
    expect(shardCount(172, SECONDS_PER_PAIRING.sim)).toBe(1);
    // As requested, but no shard without a pairing.
    expect(shardCount(172, SECONDS_PER_PAIRING.sim, 3)).toBe(3);
    expect(shardCount(2, SECONDS_PER_PAIRING.sim, 3)).toBe(2);
  });
});
