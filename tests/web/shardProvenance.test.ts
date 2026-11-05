import { readFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { REPO_ROOT } from "../../pipeline/config";
import { buildsProvenance, simulationProvenance } from "../../pipeline/sim/fingerprint";
import { pairInputs } from "../../pipeline/sim/pairKeys";

vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  return { ...actual, readFile: vi.fn(actual.readFile) };
});
const actual = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
afterEach(() => vi.mocked(readFile).mockImplementation(actual.readFile));

describe("browser shard provenance and default pairing reuse", () => {
  it.each([
    ["runes/shards.ts", false],
    ["pipeline/runes/shardRules.ts", false],
    ["data/16.21/rune-shard-sources.json", false],
    ["items/equip.ts", true],
  ] as const)("changing %s invalidates browser results without hiding default-worker dependencies", async (file, changesBuildWorker) => {
    const [plain, builds, plainPairs, buildPairs] = await Promise.all([
      simulationProvenance("16.21"), buildsProvenance("16.21"),
      pairInputs("16.21", "sim"), pairInputs("16.21", "builds", "sixItems"),
    ]);
    const target = path.join(REPO_ROOT, file);
    vi.mocked(readFile).mockImplementation(async (...args) => {
      const value = await actual.readFile(...args);
      if (path.resolve(String(args[0])) !== target) return value;
      return typeof value === "string" ? `${value}\n` : Buffer.concat([value, Buffer.from("\n")]);
    });
    const [changedPlain, changedBuilds, changedPlainPairs, changedBuildPairs] = await Promise.all([
      simulationProvenance("16.21"), buildsProvenance("16.21"),
      pairInputs("16.21", "sim"), pairInputs("16.21", "builds", "sixItems"),
    ]);
    expect(changedPlain.fingerprint).not.toBe(plain.fingerprint);
    expect(changedBuilds.fingerprint).not.toBe(builds.fingerprint);
    expect(changedPlainPairs).toEqual(plainPairs);
    expect(changedBuildPairs.kits).toEqual(buildPairs.kits);
    if (changesBuildWorker) expect(changedBuildPairs.shared).not.toBe(buildPairs.shared);
    else expect(changedBuildPairs).toEqual(buildPairs);
  });
});
