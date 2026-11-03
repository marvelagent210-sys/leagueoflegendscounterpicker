/**
 * The build matrix's pipeline (npm run build:builds, pipeline/sim/builds.ts): its checkpoints,
 * the file it writes and the check the app and --check run on it. The matrix itself takes hours
 * to compute, so its freshness is `npm run build:builds -- --check`'s, not the test suite's.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { type PrecomputedBuilds, buildsComplete, precomputedBuildsCurrent } from "../../engine/sim/precomputed";
import { BUILDS_FILE, buildsReport, simulatedBuildsJson } from "../../pipeline/sim/builds";
import { type BuildsPairResult, readBuildsCheckpoint, validBuildsResult, writeBuildsCheckpoint } from "../../pipeline/sim/buildsCheckpoint";

// Every scenario at 0.5 but spacing, which doesn't apply: a weighted mean of 0.5.
const result = (index: number, score = 0.5): BuildsPairResult => ({
  index,
  score,
  scenarios: [score, score, score, score, null, score],
  builds: [["Infinity Edge", "Guardian Angel"], ["Sunfire Aegis", "Thornmail", "Frozen Heart"]],
  seconds: 12,
});

const directories: string[] = [];
afterAll(async () => {
  for (const directory of directories) await rm(directory, { recursive: true, force: true });
});

describe("build matrix checkpoints", () => {
  it("round-trip a pairing's builds, and recompute anything that doesn't match", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "builds-"));
    directories.push(directory);
    const context = { directory, fingerprint: "f1", format: "sixItems" };
    await writeBuildsCheckpoint(context, "16.21", ["Darius", "Garen"], result(0));
    expect(await readBuildsCheckpoint(context, "16.21", ["Darius", "Garen"])).toEqual(result(0));
    expect(await readBuildsCheckpoint({ ...context, fingerprint: "f2" }, "16.21", ["Darius", "Garen"])).toBeUndefined();
    expect(await readBuildsCheckpoint({ ...context, format: "fiveItemsWithBoots" }, "16.21", ["Darius", "Garen"])).toBeUndefined();
    expect(await readBuildsCheckpoint(context, "16.21", ["Garen", "Darius"])).toBeUndefined();
    const file = path.join(directory, `${["Darius", "Garen"].map((id) => Buffer.from(id).toString("base64url")).join(".")}.json`);
    await writeFile(file, (await readFile(file, "utf8")).slice(0, 40));
    expect(await readBuildsCheckpoint(context, "16.21", ["Darius", "Garen"])).toBeUndefined();
  });

  it("refuse results whose score isn't their scenarios' weighted mean, or whose builds aren't builds", async () => {
    expect(validBuildsResult(result(0))).toBe(true);
    expect(validBuildsResult({ ...result(0), score: 0.4 })).toBe(false);
    expect(validBuildsResult({ ...result(0), builds: [["Infinity Edge", "Infinity Edge"], ["Thornmail"]] })).toBe(false);
    expect(validBuildsResult({ ...result(0), builds: [[], ["Thornmail"]] })).toBe(false);
    await expect(writeBuildsCheckpoint({ directory: tmpdir(), fingerprint: "f1", format: "sixItems" }, "16.21", ["A", "B"], { ...result(0), score: 2 })).rejects.toThrow(TypeError);
  });
});

describe("the build matrix file", () => {
  const ids = ["Ahri", "Darius", "Garen"];
  const pairs: Array<[string, string]> = [["Ahri", "Darius"], ["Ahri", "Garen"], ["Darius", "Garen"]];
  const results = [result(0, 0.5), { ...result(1, -0.25), variants: [{ side: 1 as const, options: { tripleTonic: 1 } }] }, result(2, 0)];
  const provenance = { schema: 1 as const, fingerprint: "abc" };
  const file = JSON.parse(simulatedBuildsJson("16.21", "26.21", "sixItems", ids, pairs, results, provenance)) as PrecomputedBuilds;

  it("holds every pairing both ways, each side's build by index, and passes its own check", () => {
    expect(precomputedBuildsCurrent(file, "16.21", "26.21", "abc", "sixItems", ids)).toBe(true);
    expect(file.matchups.Darius!.Ahri![0]).toBe(-0.5);
    expect(file.builds.Ahri!.Darius!.map((i) => file.items[i])).toEqual(["Infinity Edge", "Guardian Angel"]);
    expect(file.builds.Darius!.Ahri!.map((i) => file.items[i])).toEqual(["Sunfire Aegis", "Thornmail", "Frozen Heart"]);
    expect(file.variants).toEqual({ Garen: { Ahri: { tripleTonic: 1 } } });
    expect(BUILDS_FILE).toBe("simulated-builds.json");
  });

  it("fails the check for other inputs, another format, or a missing build", () => {
    expect(precomputedBuildsCurrent(file, "16.21", "26.21", "other", "sixItems", ids)).toBe(false);
    expect(precomputedBuildsCurrent(file, "16.21", "26.21", "abc", "fiveItemsWithBoots", ids)).toBe(false);
    const missing = structuredClone(file);
    delete missing.builds.Garen!.Ahri;
    expect(buildsComplete(missing as unknown as Record<string, unknown>, ids)).toBe(false);
    expect(precomputedBuildsCurrent(missing, "16.21", "26.21", "abc", "sixItems", ids)).toBe(false);
  });

  it("reports each champion's items across its matchups", () => {
    const report = buildsReport("26.21", "sixItems", ids, pairs, results, new Map([["Ahri", "Ahri"]]));
    expect(report).toContain("3 pairings");
    expect(report).toContain("| Ahri | Guardian Angel 100%, Infinity Edge 100% |");
  });
});
