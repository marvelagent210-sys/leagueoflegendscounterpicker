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
import { equipRuneEffects, runeMatchupSpecs, validateCombatRuneSelection } from "../../runes/effects";
import { equipShards, type ShardSelection } from "../../runes/shards";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;

describe("Legend: Bloodline CLI history and source-defined row", () => {
  it.each([9103, 9104, 9105])("requires an explicit zero or history on either side selecting %s", (id) => {
    for (const flag of ["--legend-points", "--enemy-legend-points"]) {
      expect(legendPointsOption([flag, "0"], flag, [id])).toBe(0);
      expect(() => legendPointsOption([], flag, [id])).toThrow(/requires.*legend-points/i);
    }
  });

  it.each([99, 100, 199, 1499, 1500, 1501, Number.MAX_SAFE_INTEGER])
  ("retains %s declared Bloodline points for source-qualified runtime capping", (points) => {
    expect(legendPointsOption(["--legend-points", String(points)], "--legend-points", [9103])).toBe(points);
  });

  it.each(["", " ", "-1", "+1", "0.0", "1.5", "1e3", "Infinity", "NaN", "001", "0x5dc", "9007199254740992", "9007199254740993"])
  ("rejects malformed or unsafe Bloodline points: %s", (text) => {
    expect(() => legendPointsOption(["--legend-points", text], "--legend-points", [9103])).toThrow();
  });

  it("rejects missing, duplicated and unused values without borrowing the opponent's declaration", () => {
    expect(legendPointsOption(["--enemy-legend-points", "1500"], "--legend-points", undefined)).toBeUndefined();
    expect(() => legendPointsOption(["--enemy-legend-points", "1500"], "--legend-points", [9103])).toThrow(/requires/);
    expect(() => legendPointsOption(["--legend-points"], "--legend-points", [9103])).toThrow(/integer/);
    expect(() => legendPointsOption(["--legend-points", "--gold", "0"], "--legend-points", [9103])).toThrow(/integer/);
    expect(() => legendPointsOption(["--legend-points", "0", "--legend-points", "1500"], "--legend-points", [9103])).toThrow(/once/);
    expect(() => legendPointsOption(["--legend-points", "0"], "--legend-points", undefined)).toThrow(/same side/);
    expect(() => legendPointsOption(["--enemy-legend-points", "0"], "--enemy-legend-points", [8014])).toThrow(/same side/);
  });

  it("accepts detached canonical Bloodline selections and rejects every competing Legend pair", () => {
    const selected = [9103, 8444, 8014];
    const before = [...selected];
    const canonical = validateCombatRuneSelection(catalog, selected);
    expect(canonical).toEqual([8014, 8444, 9103]);
    canonical.push(9101);
    expect(selected).toEqual(before);
    expect(combatRuneOption(["--enemy-combat-runes", "9103, 8014"], "--enemy-combat-runes", catalog)).toEqual([8014, 9103]);
    for (const pair of [[9103, 9104], [9103, 9105], [9104, 9105]]) {
      expect(() => validateCombatRuneSelection(catalog, pair)).toThrow(/same.*row|same.*slot/i);
    }
    expect(() => validateCombatRuneSelection(catalog, [8014, 8017, 8299, 8444, 9101, 9103, 9104])).toThrow(/at most six/);
    expect(() => validateCombatRuneSelection(catalog, [9103, 9103])).toThrow(/cannot repeat/);
  });
});

function duel(champions: [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 90_000 });
}

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

/** Keep every result and health line tied to the scenario that produced it. */
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

function pointsLine(output: string, champion: string): string {
  const line = output.split("\n").find((value) => value.includes(champion) && /Legend.*points/i.test(value));
  expect(line, `${champion}'s declared Legend history`).toBeDefined();
  return line!.replaceAll(",", "");
}

describe("actual manual command-line duels with Legend: Bloodline", () => {
  let data: Awaited<ReturnType<typeof loadSimData>>;
  let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
  let shardRules: Awaited<ReturnType<typeof loadShardRules>>;
  beforeAll(async () => {
    [data, rules, shardRules] = await Promise.all([
      loadSimData("16.21"), loadCombatRuneRules("16.21", catalog), loadShardRules("16.21", catalog),
    ]);
  });

  const equipped = (spec: FighterSpec, selection: number[], legendPoints: number) =>
    equipRuneEffects(spec, selection, catalog, rules, { legendPoints });

  it("applies each side's Bloodline history, runes and shards and reports the fifteen-stack cap", async () => {
    const you = findChampion(data.champions, "Darius"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    const selections: [ShardSelection, ShardSelection] = [[5005, 5001, 5011], [5005, 5001, 5011]];
    const a = equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec;
    const b = equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec;
    const expected = simulateMatchup(...runeMatchupSpecs(equipped(a, [8299, 9103], 1501), equipped(b, [8014, 9103], 1499)), 0, data.prices);
    expect(expected.scenarios).not.toEqual(simulateMatchup(mine.spec, theirs.spec, 0, data.prices).scenarios);
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9103,8299", "--legend-points", "1501",
      "--enemy-combat-runes", "8014,9103", "--enemy-legend-points", "1499",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","));
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Legend: Bloodline (9103)");
    expect(pointsLine(result.stdout, "Darius")).toMatch(/1501.*1500.*capped.*15 stacks.*6\.75% life steal.*85 bonus health before champion conversions/);
    expect(pointsLine(result.stdout, "Garen")).toMatch(/1499.*14 stacks.*6\.3% life steal.*0 bonus health/);
    expect(pointsLine(result.stdout, "Darius")).not.toMatch(/attack speed|ability haste/);
    expect(result.stdout).toContain("Counter score for Darius: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
  }, 90_000);

  it("equips every variant before selecting its matchup and keeps opposing Haste independent", async () => {
    const you = findChampion(data.champions, "Heimerdinger"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadVariants(data.dataset, you), theirs = await loadVariants(data.dataset, enemy);
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map((variant) => ({ variant, equipment: equipped(variant.spec, [9103], 1500) }));
    const b = theirs.map((variant) => ({ variant, equipment: equipped(variant.spec, [9105], 199) }));
    const expected = bestMatchup(
      a.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(equipment, b[0]!.equipment)[0] })),
      b.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipment, equipment)[1] })), 0, data.prices);
    const result = duel(["Heimerdinger", "Garen"], "--gold", "0", "--combat-runes", "9103", "--legend-points", "1500",
      "--enemy-combat-runes", "9105", "--enemy-legend-points", "199");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      const name = chosen.side === 0 ? "Heimerdinger" : "Garen";
      expect(result.stdout).toContain(`${name} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(pointsLine(result.stdout, "Garen")).toMatch(/199.*1 stacks.*1\.5 basic ability haste/);
    expect(pointsLine(result.stdout, "Garen")).not.toContain("life steal");
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
  }, 90_000);

  it("starts each swept budget from fresh declared Bloodline histories", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Garen"));
    const expected = [0, 5000, 10000, 15000, 20000].map((gold) => {
      const pair = runeMatchupSpecs(equipped(mine.spec, [9103], 99), equipped(theirs.spec, [9103], 1499));
      return [gold, simulateMatchup(...pair, gold, data.prices).score] as const;
    });
    const result = duel(["Darius", "Garen"], "--gold", "0", "--sweep", "--combat-runes", "9103", "--legend-points", "99",
      "--enemy-combat-runes", "9103", "--enemy-legend-points", "1499");
    expect(result.status, result.stderr).toBe(0);
    for (const [gold, score] of expected) expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    expect(pointsLine(result.stdout, "Darius")).toMatch(/99.*0 stacks.*0% life steal.*0 bonus health/);
    expect(pointsLine(result.stdout, "Garen")).toMatch(/1499.*14 stacks.*6\.3% life steal.*0 bonus health/);
  }, 120_000);

  it("accepts explicit zero with the ordinary duel's outcomes and gives no level-based Bloodline benefit", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Garen"));
    const baseline = simulateMatchup(mine.spec, theirs.spec, 0, data.prices);
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9103", "--legend-points", "0",
      "--enemy-combat-runes", "9103", "--enemy-legend-points", "0");
    expect(result.status, result.stderr).toBe(0);
    expect(pointsLine(result.stdout, "Darius")).toMatch(/0.*0 stacks.*0% life steal.*0 bonus health/);
    expect(pointsLine(result.stdout, "Garen")).toMatch(/0.*0 stacks.*0% life steal.*0 bonus health/);
    expectScenarios(result.stdout, baseline);
  }, 60_000);

  it.each([
    [["--combat-runes", "9103"], /legend-points|requires|declared/i],
    [["--enemy-combat-runes", "9103"], /enemy-legend-points|requires|declared/i],
    [["--combat-runes", "9103", "--legend-points", "0", "--enemy-combat-runes", "9104"], /enemy-legend-points|requires/i],
    [["--combat-runes", "8014", "--legend-points", "0"], /same side/],
    [["--combat-runes", "9103", "--legend-points", "0", "--enemy-legend-points", "1500"], /same side/],
    [["--combat-runes", "9103,9104", "--legend-points", "0"], /same.*row|same.*slot/i],
    [["--enemy-combat-runes", "9103,9105", "--enemy-legend-points", "0"], /same.*row|same.*slot/i],
    [["--combat-runes", "9103", "--legend-points", "-1"], /integer|nonnegative|points/i],
    [["--enemy-combat-runes", "9103", "--enemy-legend-points", "9007199254740992"], /safe integer/],
    [["--combat-runes", "9103", "--legend-points", "0", "--legend-points", "1500"], /once/i],
    [["--enemy-combat-runes", "9103", "--enemy-legend-points", "0", "--enemy-legend-points", "1500"], /once/i],
    [["--combat-runes", "9103", "--legend-points"], /requires a value/i],
    [["--combat-runes", "9103", "--legend-points", "NaN"], /integer/],
    [["--combat-runes", "9103", "--legend-points", "1500", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["--enemy-combat-runes", "9103", "--enemy-legend-points", "0", "--enemy-items", "Frozen Heart"], /plain-stat duels only/],
    [["--combat-runes", "9103", "--legend-points", "1500", "--search"], /plain-stat duels only/],
    [["--combat-runes", "9103", "--legend-points=0"], /Unknown option/],
  ] as const)("rejects unsupported or incomplete Bloodline inputs before showing a score: %s", (args, error) => {
    const result = duel(["Darius", "Garen"], ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
