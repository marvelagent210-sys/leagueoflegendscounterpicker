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

describe("Triumph CLI selection and Legend history", () => {
  it.each(["--combat-runes", "--enemy-combat-runes"])("accepts Triumph without history on %s", (flag) => {
    expect(combatRuneOption([flag, "9111,8444,8014"], flag, catalog)).toEqual([8014, 8444, 9111]);
    const pointsFlag = flag === "--combat-runes" ? "--legend-points" : "--enemy-legend-points";
    expect(legendPointsOption([], pointsFlag, [9111])).toBeUndefined();
    expect(() => legendPointsOption([pointsFlag, "0"], pointsFlag, [9111])).toThrow(/same side/);
  });

  it.each([9103, 9104, 9105])("permits one Legend %s beside Triumph and requires its own explicit history", (legend) => {
    for (const flag of ["--combat-runes", "--enemy-combat-runes"]) {
      expect(combatRuneOption([flag, `9111,${legend}`], flag, catalog)).toEqual([legend, 9111]);
      const pointsFlag = flag === "--combat-runes" ? "--legend-points" : "--enemy-legend-points";
      expect(() => legendPointsOption([], pointsFlag, [9111, legend])).toThrow(/requires.*legend-points/);
      expect(legendPointsOption([pointsFlag, "0"], pointsFlag, [9111, legend])).toBe(0);
    }
  });

  it("rejects same-row alternatives, repeated Triumph and an unused opposing history", () => {
    for (const selection of ["9101,9111", "9111,9111", "9111,9103,9104"]) {
      expect(() => combatRuneOption(["--combat-runes", selection], "--combat-runes", catalog)).toThrow(/same path row|cannot repeat/);
    }
    expect(() => legendPointsOption(["--enemy-legend-points", "0"], "--enemy-legend-points", [9111])).toThrow(/same side/);
    expect(() => legendPointsOption(["--enemy-legend-points", "0"], "--legend-points", [9111, 9103])).toThrow(/requires/);
  });
});

function duel(champions: [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 60_000 });
}

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

/** Tie every outcome to its scenario instead of checking only the rounded total. */
function expectScenarios(output: string, expected: MatchupResult) {
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

function expectTimeline(output: string, expected: MatchupResult, scenarioId: string, names: [string, string]) {
  const timeline = expected.scenarios.find(scenario => scenario.id === scenarioId)!.outcomes[0]!.timeline!;
  expect(timeline.length).toBeGreaterThan(0);
  const lines = timeline.map(entry => `  ${(entry.tick / 30).toFixed(2).padStart(6)} s  ${names[entry.side]}: ${entry.text}`);
  expect(output.split(`Timeline of ${scenarioId} (most likely branch; side 0 is ${names[0]}):\n`)[1]?.trimEnd()).toBe(lines.join("\n"));
}

describe("actual manual command-line duels with Triumph", () => {
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

  it("runs both Triumph bodies with shards and logs native outcomes without extending completed duels for healing or gold", async () => {
    const you = findChampion(data.champions, "Darius"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    const selections: [ShardSelection, ShardSelection] = [[5005, 5001, 5011], [5008, 5008, 5001]];
    const a = equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec;
    const b = equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec;
    const expected = simulateMatchup(...runeMatchupSpecs(equipped(a, [9111]), equipped(b, [9111])), 0, data.prices, { settings: { log: true } });
    const baseline = simulateMatchup(a, b, 0, data.prices, { settings: { log: true } });
    // The ordinary duel finishes on the champion kill, before Triumph's delayed
    // heal. Equipping it must not invent another second of combat or gold stats.
    expect(expected.scenarios).toEqual(baseline.scenarios);
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9111", "--enemy-combat-runes", "9111",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","), "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Darius combat runes (partial selection): Triumph (9111)");
    expect(result.stdout).toContain("Garen combat runes (partial selection): Triumph (9111)");
    expect(result.stdout).not.toMatch(/Legend points:/);
    expect(result.stdout).toContain("Selected stat shards accompany the explicit partial combat-rune selection.");
    expect(result.stdout).toMatch(/20 extra gold.*economic.*unmodeled/);
    expect(result.stdout).toMatch(/pending heal does not prolong an otherwise completed duel/);
    expect(result.stdout).toContain("Stat budget 0 gold: Darius buys nothing; Garen buys nothing");
    expect(result.stdout).toContain("Counter score for Darius: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", ["Darius", "Garen"]);
  }, 90_000);

  it.each([0, 1] as const)("delivers side %s's native delayed heal while Sion's counted-death window keeps the duel running", async (side) => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const pair = side === 0
      ? runeMatchupSpecs(equipped(mine.spec, [9111]), equipped(theirs.spec, []))
      : runeMatchupSpecs(equipped(theirs.spec, []), equipped(mine.spec, [9111]));
    const names: [string, string] = side === 0 ? ["Darius", "Sion"] : ["Sion", "Darius"];
    const expected = simulateMatchup(...pair, 0, data.prices, { settings: { log: true } });
    const baseline = simulateMatchup(side === 0 ? mine.spec : theirs.spec, side === 0 ? theirs.spec : mine.spec, 0, data.prices, { settings: { log: true } });
    const brawl = expected.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!;
    const death = brawl.timeline!.find(entry => entry.side !== side && entry.text === "dies: Glory in Death");
    expect(death).toBeDefined();
    const dueTick = death!.tick + 30;
    expect(brawl.timeline!.some(entry => entry.side === side && entry.tick === dueTick && /^heals [1-9]\d*$/.test(entry.text))).toBe(true);
    const ordinaryTimeline = baseline.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!.timeline!;
    expect(ordinaryTimeline.some(entry => entry.side === side && entry.tick === dueTick && entry.text.startsWith("heals "))).toBe(false);
    expect(brawl.hp[side]).toBeGreaterThan(baseline.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!.hp[side]);
    const result = duel(names, "--gold", "0", side === 0 ? "--combat-runes" : "--enemy-combat-runes", "9111", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).not.toMatch(/Legend points:/);
    expect(result.stdout).toContain(`Counter score for ${names[0]}: ` + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", names);
  }, 90_000);

  it("equips Triumph and separate Legend histories on every variant before choosing the native matchup", async () => {
    const you = findChampion(data.champions, "Heimerdinger"), enemy = findChampion(data.champions, "Karthus");
    const mine = await loadVariants(data.dataset, you), theirs = await loadVariants(data.dataset, enemy);
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map(variant => ({ variant, equipment: equipped(variant.spec, [9103, 9111], 1500) }));
    const b = theirs.map(variant => ({ variant, equipment: equipped(variant.spec, [9105, 9111], 199) }));
    const expected = bestMatchup(
      a.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(equipment, b[0]!.equipment)[0] })),
      b.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipment, equipment)[1] })), 0, data.prices, { settings: { log: true } });
    const chosenOptions = expected.variants?.find(variant => variant.side === 0)?.options;
    const chosenSpec = mine.find(variant => variant.options === chosenOptions)!.spec;
    const legendOnly = runeMatchupSpecs(equipped(chosenSpec, [9103], 1500), equipped(theirs[0]!.spec, [9105], 199));
    const baseline = simulateMatchup(...legendOnly, 0, data.prices, { settings: { log: true } });
    const brawl = expected.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!;
    const death = brawl.timeline!.find(entry => entry.side === 1 && entry.text === "continues casting after death");
    expect(death).toBeDefined();
    const dueTick = death!.tick + 30;
    expect(brawl.timeline!.some(entry => entry.side === 0 && entry.tick === dueTick && /^heals [1-9]\d*$/.test(entry.text))).toBe(true);
    const ordinaryBrawl = baseline.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!;
    expect(ordinaryBrawl.timeline!.some(entry => entry.side === 0 && entry.tick === dueTick && entry.text.startsWith("heals "))).toBe(false);
    expect(brawl.hp[0]).toBeGreaterThan(ordinaryBrawl.hp[0]);
    const result = duel(["Heimerdinger", "Karthus"], "--gold", "0", "--combat-runes", "9111,9103", "--legend-points", "1500",
      "--enemy-combat-runes", "9111,9105", "--enemy-legend-points", "199", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      const name = chosen.side === 0 ? "Heimerdinger" : "Karthus";
      expect(result.stdout).toContain(`${name} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(result.stdout).toMatch(/Heimerdinger Legend points: 1500; 15 stacks, 6\.75% life steal, 85 bonus health/);
    expect(result.stdout).toMatch(/Karthus Legend points: 199; 1 stacks, 1\.5 basic ability haste/);
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", ["Heimerdinger", "Karthus"]);
  }, 90_000);

  it("recreates Triumph with each side's declared Legend state for every swept budget", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const expected = [0, 5000, 10000, 15000, 20000].map(gold => {
      const pair = runeMatchupSpecs(equipped(mine.spec, [9103, 9111], 99), equipped(theirs.spec, [9104, 9111], 199));
      return [gold, simulateMatchup(...pair, gold, data.prices).score] as const;
    });
    const legendOnly = runeMatchupSpecs(equipped(mine.spec, [9103], 99), equipped(theirs.spec, [9104], 199));
    expect(expected.find(([gold]) => gold === 10000)![1]).not.toBeCloseTo(simulateMatchup(...legendOnly, 10000, data.prices).score, 2);
    const result = duel(["Darius", "Sion"], "--gold", "0", "--sweep", "--combat-runes", "9111,9103", "--legend-points", "99",
      "--enemy-combat-runes", "9111,9104", "--enemy-legend-points", "199");
    expect(result.status, result.stderr).toBe(0);
    for (const [gold, score] of expected) expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    expect(result.stdout).toMatch(/Darius Legend points: 99; 0 stacks, 0% life steal, 0 bonus health/);
    expect(result.stdout).toMatch(/Sion Legend points: 199; 1 stacks, 4\.5% bonus attack speed/);
  }, 120_000);

  it.each([
    [["--combat-runes", "9111,9101"], /same path row/],
    [["--enemy-combat-runes", "9111,9111"], /cannot repeat/],
    [["--combat-runes", "9111,9103"], /legend-points|requires/i],
    [["--enemy-combat-runes", "9111,9105"], /enemy-legend-points|requires/i],
    [["--combat-runes", "9111", "--legend-points", "0"], /same side/],
    [["--enemy-combat-runes", "9111", "--enemy-legend-points", "0"], /same side/],
    [["--combat-runes", "9111,9103", "--enemy-legend-points", "0"], /requires.*legend-points/],
    [["--combat-runes", "9111", "--legend-points"], /requires a value/],
    [["--enemy-combat-runes", "9111", "--enemy-legend-points"], /requires a value/],
    [["--combat-runes", "9111", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["--enemy-combat-runes", "9111", "--enemy-items", "Frozen Heart"], /plain-stat duels only/],
    [["--combat-runes", "9111", "--search"], /plain-stat duels only/],
    [["--combat-runes", "9111", "--triumph-points", "0"], /Unknown option/],
  ] as const)("rejects incompatible or unused Triumph inputs before scoring: %s", (args, error) => {
    const result = duel(["Darius", "Garen"], ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
