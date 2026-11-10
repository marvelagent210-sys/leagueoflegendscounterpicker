import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { simulateMatchup, bestMatchup } from "../../engine/sim/matchup";
import type { MatchupResult } from "../../engine/sim/scenarios";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { equipShards, type ShardSelection } from "../../runes/shards";
import { REPO_ROOT } from "../../pipeline/config";
import { loadFighter, loadVariants } from "../../pipeline/kitData";
import { combatRuneOption } from "../../pipeline/runes/effectOptions";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import { findChampion, loadSimData } from "../../pipeline/simData";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;

describe("explicit duel combat-rune arguments", () => {
  it("distinguishes omission from a canonical, detached partial selection for either side", () => {
    expect(combatRuneOption([], "--combat-runes", catalog)).toBeUndefined();
    expect(combatRuneOption(["--combat-runes", "8444, 8014"], "--combat-runes", catalog)).toEqual([8014, 8444]);
    expect(combatRuneOption(["--enemy-combat-runes", "8299"], "--enemy-combat-runes", catalog)).toEqual([8299]);
    expect(combatRuneOption(["--combat-runes", "9101,8014,8444"], "--combat-runes", catalog)).toEqual([8014, 8444, 9101]);
    expect(combatRuneOption(["--combat-runes", "8444"], "--enemy-combat-runes", catalog)).toBeUndefined();
  });

  it.each(["", "0", "-8014", "8014,", "8014,,8444", "8.014e3", "8014.0", "Infinity", "9007199254740993"])
  ("rejects malformed or unavailable values: %s", (value) => {
    expect(() => combatRuneOption(["--combat-runes", value], "--combat-runes", catalog)).toThrow();
  });

  it("rejects repetition, missing values, unimplemented effects and incompatible rows", () => {
    expect(() => combatRuneOption(["--combat-runes", "8444", "--combat-runes", "8014"], "--combat-runes", catalog)).toThrow(/given once/);
    expect(() => combatRuneOption(["--combat-runes"], "--combat-runes", catalog)).toThrow(/requires/);
    expect(() => combatRuneOption(["--combat-runes", "--log", "brawl"], "--combat-runes", catalog)).toThrow(/requires/);
    expect(() => combatRuneOption(["--combat-runes", "8010"], "--combat-runes", catalog)).toThrow(/no combat implementation/);
    expect(() => combatRuneOption(["--combat-runes", "8014,8014"], "--combat-runes", catalog)).toThrow(/cannot repeat/);
    expect(() => combatRuneOption(["--combat-runes", "8014,8017"], "--combat-runes", catalog)).toThrow(/same path row/);
  });
});

function duel(champions: [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 40_000 });
}

const signed = (score: number) => `${score >= 0 ? "+" : ""}${score.toFixed(2)}`;
/** Compare every scenario and outcome, rather than relying on the rounded total alone. */
function expectScenarioOutput(output: string, expected: MatchupResult) {
  for (const scenario of expected.scenarios) {
    expect(output).toContain(`${scenario.score === undefined ? "  n/a" : signed(scenario.score)}  ${scenario.id} (${scenario.note})`);
    for (const outcome of scenario.outcomes) {
      expect(output).toContain(`health left ${Math.round(outcome.hp[0] * 100)}% vs ${Math.round(outcome.hp[1] * 100)}%, ${outcome.seconds.toFixed(1)} s`);
    }
  }
}

describe("manual duels with partial combat-rune effects", () => {
  let data: Awaited<ReturnType<typeof loadSimData>>;
  let combatRules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
  let shardRules: Awaited<ReturnType<typeof loadShardRules>>;
  beforeAll(async () => {
    [data, combatRules, shardRules] = await Promise.all([
      loadSimData("16.21"), loadCombatRuneRules("16.21", catalog), loadShardRules("16.21", catalog),
    ]);
  });

  it("equips both sides with their own runes and shards, and prints the actual resulting scenarios", async () => {
    const you = findChampion(data.champions, "Darius"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    const selections: [ShardSelection, ShardSelection] = [[5005, 5001, 5001], [5008, 5008, 5011]];
    const a = equipRuneEffects(equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec,
      [8014, 8444, 9101], catalog, combatRules);
    const b = equipRuneEffects(equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec,
      [8299, 8444], catalog, combatRules);
    const expected = simulateMatchup(...runeMatchupSpecs(a, b), 0, data.prices);
    const baseline = simulateMatchup(mine.spec, theirs.spec, 0, data.prices);
    expect(expected.scenarios).not.toEqual(baseline.scenarios);
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9101,8444,8014", "--enemy-combat-runes", "8299,8444",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","));
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius combat runes (partial selection): Coup de Grace (8014), Second Wind (8444), Absorb Life (9101)");
    expect(result.stdout).toContain("Garen combat runes (partial selection): Last Stand (8299), Second Wind (8444)");
    expect(result.stdout).toContain("Selected stat shards accompany the explicit partial combat-rune selection.");
    expect(result.stdout).toContain("a complete rune page is not implied");
    expect(result.stdout).toContain("Counter score for Darius: " + signed(expected.score));
    expectScenarioOutput(result.stdout, expected);
  }, 60_000);

  it("applies effects to every selectable kit variant before choosing its best matchup", async () => {
    const you = findChampion(data.champions, "Heimerdinger"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadVariants(data.dataset, you), theirs = await loadVariants(data.dataset, enemy);
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map((variant) => ({ variant, equipped: equipRuneEffects(variant.spec, [8017], catalog, combatRules) }));
    const b = theirs.map((variant) => ({ variant, equipped: equipRuneEffects(variant.spec, [8444], catalog, combatRules) }));
    const expected = bestMatchup(
      a.map(({ variant, equipped }) => ({ ...variant, spec: runeMatchupSpecs(equipped, b[0]!.equipped)[0] })),
      b.map(({ variant, equipped }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipped, equipped)[1] })), 0, data.prices);
    const result = duel(["Heimerdinger", "Garen"], "--gold", "0", "--combat-runes", "8017", "--enemy-combat-runes", "8444");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      const name = chosen.side === 0 ? "Heimerdinger" : "Garen";
      expect(result.stdout).toContain(`${name} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarioOutput(result.stdout, expected);
  }, 60_000);

  it("preserves an ordinary duel's scenarios when neither side requests combat runes", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Garen"));
    const expected = simulateMatchup(mine.spec, theirs.spec, 0, data.prices);
    const result = duel(["Darius", "Garen"], "--gold", "0");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).not.toContain("combat runes");
    expect(result.stdout).not.toContain("partial selection");
    expect(result.stdout).toContain("Counter score for Darius: " + signed(expected.score));
    expectScenarioOutput(result.stdout, expected);
  }, 60_000);

  it.each([
    [["--combat-runes"], /requires a value/],
    [["--enemy-combat-runes", ""], /requires comma-separated/],
    [["--combat-runes", "8444", "--combat-runes", "8014"], /given once/],
    [["--enemy-combat-runes", "8010"], /no combat implementation/],
    [["--combat-runes", "8014,8017"], /same path row/],
    [["--combat-runes=8014"], /Unknown option/],
    [["--combat-runes", "8014", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["--enemy-combat-runes", "8444", "--enemy-items", "Frozen Heart"], /plain-stat duels only/],
    [["--combat-runes", "8444", "--items", ""], /plain-stat duels only/],
    [["--enemy-combat-runes", "8017", "--search"], /plain-stat duels only/],
  ] as const)("fails unsupported or malformed inputs before presenting a score: %s", (args, expected) => {
    const result = duel(["Darius", "Garen"], ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(expected);
    expect(result.stdout).not.toContain("Counter score");
  });
});
