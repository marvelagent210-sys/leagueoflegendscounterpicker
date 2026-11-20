import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { bestMatchup, simulateMatchup } from "../../engine/sim/matchup";
import type { MatchupResult } from "../../engine/sim/scenarios";
import type { FighterSpec } from "../../engine/sim/spec";
import { REPO_ROOT } from "../../pipeline/config";
import { loadFighter, loadVariants } from "../../pipeline/kitData";
import { combatRuneOption, legendPointsOption } from "../../pipeline/runes/effectOptions";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import { findChampion, loadSimData } from "../../pipeline/simData";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { equipShards, type ShardSelection } from "../../runes/shards";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;
const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
function duel(champions: readonly [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 60_000 });
}

/** Inspect native scenario outcomes as well as the rounded command score. */
function expectScenarios(output: string, expected: MatchupResult): void {
  const lines = output.split("\n");
  for (const scenario of expected.scenarios) {
    const score = scenario.score === undefined ? "  n/a" : signed(scenario.score);
    const index = lines.indexOf(`${score}  ${scenario.id} (${scenario.note})`);
    expect(index, scenario.id).toBeGreaterThanOrEqual(0);
    for (const [at, outcome] of scenario.outcomes.entries()) {
      expect(lines[index + at + 1]).toContain(`you win ${Math.round(outcome.win[0] * 100)}%, enemy wins ${Math.round(outcome.win[1] * 100)}%`);
      expect(lines[index + at + 1]).toContain(`health left ${Math.round(outcome.hp[0] * 100)}% vs ${Math.round(outcome.hp[1] * 100)}%, ${outcome.seconds.toFixed(1)} s`);
    }
  }
}
function expectTimeline(output: string, expected: MatchupResult, names: readonly [string, string]): void {
  const timeline = expected.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!.timeline!;
  expect(timeline.length).toBeGreaterThan(0);
  const lines = timeline.map(entry => `  ${(entry.tick / 30).toFixed(2).padStart(6)} s  ${names[entry.side]}: ${entry.text}`);
  expect(output.split(`Timeline of brawl (most likely branch; side 0 is ${names[0]}):\n`)[1]?.trimEnd()).toBe(lines.join("\n"));
}

describe("Press the Attack's first manual keystone selection", () => {
  it.each(["--combat-runes", "--enemy-combat-runes"])("accepts a compatible keystone and lesser-row selection on %s", flag => {
    expect(combatRuneOption([flag, "8444,8014,8009,8005"], flag, catalog)).toEqual([8005, 8009, 8014, 8444]);
    const pointsFlag = flag === "--combat-runes" ? "--legend-points" : "--enemy-legend-points";
    expect(legendPointsOption([], pointsFlag, [8005])).toBeUndefined();
    expect(() => legendPointsOption([pointsFlag, "0"], pointsFlag, [8005])).toThrow(/same side/);
    expect(combatRuneOption([flag, "8005,9104"], flag, catalog)).toEqual([8005, 9104]);
    expect(() => legendPointsOption([], pointsFlag, [8005, 9104])).toThrow(/requires.*legend-points/);
    expect(legendPointsOption([pointsFlag, "0"], pointsFlag, [8005, 9104])).toBe(0);
  });
  it("keeps unsupported keystones, row conflicts and duplicates explicit", () => {
    expect(() => combatRuneOption(["--combat-runes", "8005,8465"], "--combat-runes", catalog)).toThrow(/no combat implementation/);
    expect(() => combatRuneOption(["--combat-runes", "8005,8439"], "--combat-runes", catalog)).toThrow(/more than one keystone/);
    for (const selection of ["8005,8005", "8005,8010", "8005,8009,9111", "8005,9103,9104", "8005,8014,8299"]) {
      expect(() => combatRuneOption(["--combat-runes", selection], "--combat-runes", catalog)).toThrow(/cannot repeat|same path row/);
    }
  });
});

describe("actual manual command-line duels with Press the Attack", () => {
  let data: Awaited<ReturnType<typeof loadSimData>>;
  let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
  let shardRules: Awaited<ReturnType<typeof loadShardRules>>;
  beforeAll(async () => {
    [data, rules, shardRules] = await Promise.all([
      loadSimData("16.21"), loadCombatRuneRules("16.21", catalog), loadShardRules("16.21", catalog),
    ]);
  });
  const equipped = (spec: FighterSpec, selection: number[], legendPoints?: number) =>
    equipRuneEffects(spec, selection, catalog, rules, legendPoints === undefined ? undefined : { legendPoints });

  it.each([0, 1] as const)("binds side %s's actual proc and amplification to that side's CLI flag", async side => {
    const lucian = await loadFighter(data.dataset, findChampion(data.champions, "Lucian"));
    const sion = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const names = side === 0 ? ["Lucian", "Sion"] as const : ["Sion", "Lucian"] as const;
    const plain = side === 0 ? [lucian.spec, sion.spec] as const : [sion.spec, lucian.spec] as const;
    const pair = runeMatchupSpecs(equipped(plain[0], side === 0 ? [8005] : []), equipped(plain[1], side === 1 ? [8005] : []));
    const expected = simulateMatchup(...pair, 0, data.prices, { settings: { log: true } });
    const baseline = simulateMatchup(...plain, 0, data.prices, { settings: { log: true } });
    expect(Math.abs(expected.score - baseline.score)).toBeGreaterThan(0.001);
    const result = duel(names, "--gold", "0", side === 0 ? "--combat-runes" : "--enemy-combat-runes", "8005", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Lucian combat runes (partial selection): Press the Attack (8005)");
    expect(result.stdout).not.toContain("Sion combat runes (partial selection):");
    expect(result.stdout).not.toMatch(/Legend points:/);
    expect(result.stdout).toContain("The plain-stat allocation remains its no-rune reference");
    expect(result.stdout).toContain(`Counter score for ${names[0]}: ` + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, names);
  }, 90_000);

  it("combines both sides' explicit keystones, lesser runes and stat shards before combat", async () => {
    const names = ["Lucian", "Sion"] as const;
    const you = findChampion(data.champions, names[0]), enemy = findChampion(data.champions, names[1]);
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    const selections: [ShardSelection, ShardSelection] = [[5005, 5008, 5001], [5008, 5008, 5011]];
    const a = equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec;
    const b = equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec;
    const expected = simulateMatchup(...runeMatchupSpecs(equipped(a, [8005, 9111, 8014]), equipped(b, [8005, 9101, 8017])), 0, data.prices, { settings: { log: true } });
    const result = duel(names, "--gold", "0", "--combat-runes", "8005,9111,8014", "--enemy-combat-runes", "8005,9101,8017",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","), "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Selected stat shards accompany the explicit partial combat-rune selection.");
    expect(result.stdout).toContain("Lucian combat runes (partial selection): Press the Attack (8005), Coup de Grace (8014), Triumph (9111)");
    expect(result.stdout).toContain("Sion combat runes (partial selection): Press the Attack (8005), Cut Down (8017), Absorb Life (9101)");
    expect(result.stdout).toContain("Counter score for Lucian: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, names);
  }, 90_000);

  it("equips every variant with its keystone and independent declared Legend state before selection", async () => {
    const names = ["Heimerdinger", "Karthus"] as const;
    const mine = await loadVariants(data.dataset, findChampion(data.champions, names[0]));
    const theirs = await loadVariants(data.dataset, findChampion(data.champions, names[1]));
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map(variant => ({ variant, equipment: equipped(variant.spec, [8005, 9104], 199) }));
    const b = theirs.map(variant => ({ variant, equipment: equipped(variant.spec, [8005, 9105], 99) }));
    const expected = bestMatchup(
      a.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(equipment, b[0]!.equipment)[0] })),
      b.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipment, equipment)[1] })),
      0, data.prices, { settings: { log: true } });
    const result = duel(names, "--gold", "0", "--combat-runes", "8005,9104", "--legend-points", "199",
      "--enemy-combat-runes", "8005,9105", "--enemy-legend-points", "99", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      expect(result.stdout).toContain(`${names[chosen.side]} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(result.stdout).toMatch(/Heimerdinger Legend points: 199; 1 stacks, 4\.5% bonus attack speed/);
    expect(result.stdout).toMatch(/Karthus Legend points: 99; 0 stacks, 0 basic ability haste/);
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, names);
  }, 90_000);

  it("recreates keystone state for every swept stat budget while preserving declared Legend history", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Lucian"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const expected = [0, 5000, 10000, 15000, 20000].map(gold => {
      const pair = runeMatchupSpecs(equipped(mine.spec, [8005, 9104], 199), equipped(theirs.spec, [9105], 99));
      return [gold, simulateMatchup(...pair, gold, data.prices).score] as const;
    });
    const without = runeMatchupSpecs(equipped(mine.spec, [9104], 199), equipped(theirs.spec, [9105], 99));
    expect(Math.abs(expected[0]![1] - simulateMatchup(...without, 0, data.prices).score)).toBeGreaterThan(0.001);
    const result = duel(["Lucian", "Sion"], "--gold", "0", "--sweep", "--combat-runes", "8005,9104", "--legend-points", "199",
      "--enemy-combat-runes", "9105", "--enemy-legend-points", "99");
    expect(result.status, result.stderr).toBe(0);
    for (const [gold, score] of expected) expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    expect(result.stdout).toMatch(/Lucian Legend points: 199; 1 stacks, 4\.5% bonus attack speed/);
    expect(result.stdout).toMatch(/Sion Legend points: 99; 0 stacks, 0 basic ability haste/);
  }, 120_000);

  it.each([
    [["Lucian", "Sion"], ["--combat-runes", "8005,8005"], /cannot repeat/],
    [["Lucian", "Sion"], ["--enemy-combat-runes", "8005,8010"], /same path row/],
    [["Lucian", "Sion"], ["--combat-runes", "8005,8009,9111"], /same path row/],
    [["Lucian", "Sion"], ["--combat-runes", "8005,9104"], /requires.*legend-points/],
    [["Lucian", "Sion"], ["--enemy-combat-runes", "8005", "--enemy-legend-points", "0"], /same side/],
    [["Lucian", "Sion"], ["--combat-runes", "8005", "--pta-stacks", "2"], /Unknown option/],
    [["Lucian", "Sion"], ["--combat-runes", "8005", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["Lucian", "Sion"], ["--enemy-combat-runes", "8005", "--enemy-items", "Frozen Heart"], /plain-stat duels only/],
    [["Lucian", "Sion"], ["--combat-runes", "8005", "--search"], /plain-stat duels only/],
  ] as const)("rejects incompatible keystone inputs before scoring: %s %s", (names, args, error) => {
    const result = duel(names, ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
