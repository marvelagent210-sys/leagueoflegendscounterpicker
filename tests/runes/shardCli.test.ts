import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { RuneCatalog } from "../../runes/catalog";
import { REPO_ROOT } from "../../pipeline/config";
import { shardOption } from "../../pipeline/runes/shardOptions";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;

describe("explicit duel shard arguments", () => {
  it("keeps omissions separate from a selection and accepts repeated cross-row shards", () => {
    expect(shardOption([], "--shards", catalog)).toBeUndefined();
    expect(shardOption(["--shards", "5005, 5001, 5001"], "--shards", catalog)).toEqual([5005, 5001, 5001]);
    expect(shardOption(["--enemy-shards", "5008,5008,5011"], "--enemy-shards", catalog)).toEqual([5008, 5008, 5011]);
  });

  it.each(["5005,5001", "5005,,5001", "5005,5e3,5001", "5005,5001.0,5001", "5005,Infinity,5001"])("rejects incomplete or noninteger selections: %s", (value) => {
    expect(() => shardOption(["--shards", value], "--shards", catalog)).toThrow(/three comma-separated integer/);
  });

  it("rejects a repeated flag, missing value and shard in the wrong row", () => {
    expect(() => shardOption(["--shards", "5005,5001,5001", "--shards", "5008,5008,5011"], "--shards", catalog)).toThrow(/given once/);
    expect(() => shardOption(["--shards", "--log", "brawl"], "--shards", catalog)).toThrow(/requires three/);
    expect(() => shardOption(["--shards", "5011,5001,5001"], "--shards", catalog)).toThrow(/row 0/);
  });
});

function duel(...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), "Darius", "Garen", "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 25_000 });
}

describe("manual duels with stat shards", () => {
  it.each(["5005,5001,5001", "5008,5008,5011"])("runs Kai'Sa with explicit shards %s and reports evolution eligibility", (selection) => {
    const result = spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
      path.join(REPO_ROOT, "pipeline/cli/duel.ts"), "Kaisa", "Garen", "--dataset", "16.21", "--gold", "0", "--shards", selection],
    { cwd: REPO_ROOT, encoding: "utf8", timeout: 25_000 });
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("stat shards:");
    expect(result.stdout).toContain("do not qualify for Kai'Sa's Living Weapon");
    expect(result.stdout).toContain("Counter score");
  });

  it("runs both sides' selected shards through actual scenarios without enabling full rune pages", () => {
    const result = duel("--gold", "0", "--shards", "5005,5001,5001", "--enemy-shards", "5008,5008,5011");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius stat shards: Attack Speed (5005), Health Scaling (5001), Health Scaling (5001)");
    expect(result.stdout).toContain("Garen stat shards: Adaptive Force (5008), Adaptive Force (5008), Health (5011)");
    expect(result.stdout).toContain("Full rune-page effects");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it("supports nonadaptive shards with a fixed item build", () => {
    const result = duel("--items", "Mercury's Treads", "--shards", "5007,5010,5013");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius stat shards:");
    expect(result.stdout).toContain("Mercury's Treads");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it("supports adaptive shards from the holder's reviewed build while an unsharded opponent holds Deathcap", () => {
    const result = duel("--items", "Frozen Heart", "--enemy-items", "Rabadon's Deathcap", "--shards", "5008,5008,5011");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius stat shards: Adaptive Force");
    expect(result.stdout).toContain("Awe and Void Infusion do not qualify");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it("reviews and applies both sides' adaptive builds with fixed passive options", () => {
    const result = duel("--items", "Rod of Ages", "--enemy-items", "Sterak's Gage", "--item-option", "Rod of Ages.minutes=5",
      "--shards", "5008,5008,5011", "--enemy-shards", "5008,5001,5011");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius stat shards:");
    expect(result.stdout).toContain("Garen stat shards:");
    expect(result.stdout).toContain("Rod of Ages");
    expect(result.stdout).toContain("Sterak's Gage");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it("permits an empty adaptive side when only the opponent selects items", () => {
    const result = duel("--enemy-items", "Frozen Heart", "--shards", "5008,5001,5011");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius holds no items");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it("keeps the ordinary duel available when neither side selects shards", () => {
    const result = duel("--gold", "0");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).not.toContain("stat shards:");
    expect(result.stdout).toContain("Counter score for Darius:");
  });

  it.each([
    [["--items", "Rabadon's Deathcap", "--shards", "5008,5001,5001"], /Rabadon's Deathcap.*not supported/],
    [["--items", "Overlord's Bloodmail", "--shards", "5008,5001,5001"], /Overlord's Bloodmail.*not supported/],
    [["--items", "Blackfire Torch", "--shards", "5008,5001,5001"], /Blackfire Torch.*not supported/],
    [["--items", "Hubris", "--shards", "5008,5001,5001"], /Hubris.*not supported/],
    [["--enemy-items", "Rabadon's Deathcap", "--enemy-shards", "5008,5001,5001"], /Rabadon's Deathcap.*not supported/],
    [["--search", "--shards", "5005,5001,5001"], /not supported by --search/],
    [["--shards=5005,5001,5001"], /Unknown option/],
    [["--enemy-shards"], /requires a value/],
    [["--shards", "5011,5001,5001"], /row 0/],
  ] as const)("rejects unsupported or malformed selections before presenting a score: %s", (args, expected) => {
    const result = duel(...args);
    expect(result.status).toBe(1);
    expect(result.stderr).toMatch(expected);
    expect(result.stdout).not.toContain("Counter score for Darius:");
  });
});
