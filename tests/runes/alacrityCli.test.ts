import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { bestMatchup, simulateMatchup } from "../../engine/sim/matchup";
import type { MatchupResult } from "../../engine/sim/scenarios";
import type { FighterSpec } from "../../engine/sim/spec";
import { REPO_ROOT } from "../../pipeline/config";
import { loadFighter, loadVariants } from "../../pipeline/kitData";
import { legendPointsOption } from "../../pipeline/runes/effectOptions";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import { findChampion, loadSimData } from "../../pipeline/simData";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { equipShards, type ShardSelection } from "../../runes/shards";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;

describe("explicit starting Legend points", () => {
  it("keeps omission separate from an explicitly declared zero for each side", () => {
    expect(legendPointsOption([], "--legend-points", undefined)).toBeUndefined();
    expect(legendPointsOption(["--enemy-legend-points", "950"], "--legend-points", [8014])).toBeUndefined();
    expect(legendPointsOption(["--legend-points", " 0 "], "--legend-points", [9104])).toBe(0);
    expect(legendPointsOption(["--enemy-legend-points", "199"], "--enemy-legend-points", [8014, 9104])).toBe(199);
  });

  it.each([99, 100, 199, 950, 999, 1000, 1001, Number.MAX_SAFE_INTEGER])
  ("preserves declared integer points %s for source-qualified runtime capping", (points) => {
    expect(legendPointsOption(["--legend-points", String(points)], "--legend-points", [9104])).toBe(points);
  });

  it.each(["", " ", "-1", "+1", "0.0", "1.5", "1e3", "Infinity", "NaN", "001", "0x3e8", "9007199254740992", "9007199254740993"])
  ("rejects a noncanonical or unsafe point value: %s", (text) => {
    expect(() => legendPointsOption(["--legend-points", text], "--legend-points", [9104])).toThrow();
  });

  it("requires an explicit value only for that side's selected Alacrity", () => {
    expect(() => legendPointsOption([], "--legend-points", [9104])).toThrow(/legend-points|requires|declared/i);
    expect(() => legendPointsOption(["--legend-points"], "--legend-points", [9104])).toThrow(/requires|value/i);
    expect(() => legendPointsOption(["--legend-points", "--gold", "0"], "--legend-points", [9104])).toThrow(/requires|value/i);
    expect(() => legendPointsOption(["--legend-points", "0"], "--legend-points", undefined)).toThrow(/9104|Alacrity|selected|unused/i);
    expect(() => legendPointsOption(["--enemy-legend-points", "0"], "--enemy-legend-points", [8014])).toThrow(/9104|Alacrity|selected|unused/i);
    expect(() => legendPointsOption(["--legend-points", "0", "--legend-points", "1000"], "--legend-points", [9104])).toThrow(/once/i);
  });
});

function duel(champions: [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 90_000 });
}

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

/** Keep an outcome tied to its scenario rather than matching a similar line elsewhere. */
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
  expect(line, `${champion}'s declared Legend state`).toBeDefined();
  return line!.replaceAll(",", "");
}

describe("manual duels with declared Legend progress", () => {
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

  it("applies independent point histories, runes and shards to both sides' actual scenarios", async () => {
    const you = findChampion(data.champions, "Darius"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    const selections: [ShardSelection, ShardSelection] = [[5005, 5001, 5011], [5005, 5001, 5011]];
    const a = equipped(equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec,
      [8299, 9104], 950);
    const b = equipped(equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec,
      [8014, 9104], 0);
    const expected = simulateMatchup(...runeMatchupSpecs(a, b), 0, data.prices);
    const baseline = simulateMatchup(mine.spec, theirs.spec, 0, data.prices);
    expect(expected.scenarios).not.toEqual(baseline.scenarios);
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9104,8299", "--legend-points", "950",
      "--enemy-combat-runes", "8014,9104", "--enemy-legend-points", "0",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","));
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Legend: Alacrity (9104)");
    expect(pointsLine(result.stdout, "Darius")).toContain("950");
    expect(pointsLine(result.stdout, "Garen")).toMatch(/\b0\b/);
    expect(result.stdout).toContain("Counter score for Darius: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
  }, 90_000);

  it("reports declared above-cap points and the actual effective stack/stat cap", () => {
    const result = duel(["Darius", "Garen"], "--gold", "0", "--combat-runes", "9104", "--legend-points", "1001");
    expect(result.status, result.stderr).toBe(0);
    const line = pointsLine(result.stdout, "Darius");
    expect(line).toContain("1001");
    expect(line).toContain("1000");
    expect(line).toMatch(/\b10\b/);
    expect(line).toMatch(/18(?:\.0+)?%/);
  }, 60_000);

  it("equips every kit variant with that side's declared points before variant selection", async () => {
    const you = findChampion(data.champions, "Heimerdinger"), enemy = findChampion(data.champions, "Garen");
    const mine = await loadVariants(data.dataset, you), theirs = await loadVariants(data.dataset, enemy);
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map((variant) => ({ variant, equipment: equipped(variant.spec, [9104], 1000) }));
    const b = theirs.map((variant) => ({ variant, equipment: equipped(variant.spec, [9104], 199) }));
    const expected = bestMatchup(
      a.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(equipment, b[0]!.equipment)[0] })),
      b.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipment, equipment)[1] })), 0, data.prices);
    const result = duel(["Heimerdinger", "Garen"], "--gold", "0", "--combat-runes", "9104", "--legend-points", "1000",
      "--enemy-combat-runes", "9104", "--enemy-legend-points", "199");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      const name = chosen.side === 0 ? "Heimerdinger" : "Garen";
      expect(result.stdout).toContain(`${name} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
  }, 90_000);

  it("starts each swept budget from the declared history rather than a previous fight's points", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Garen"));
    const expected = [0, 5000, 10000, 15000, 20000].map((gold) => {
      // Fresh equipment for each expected budget, unlike the CLI's reused source spec.
      const pair = runeMatchupSpecs(equipped(mine.spec, [9104], 99), equipped(theirs.spec, [9104], 950));
      return [gold, simulateMatchup(...pair, gold, data.prices).score] as const;
    });
    const result = duel(["Darius", "Garen"], "--gold", "0", "--sweep", "--combat-runes", "9104", "--legend-points", "99",
      "--enemy-combat-runes", "9104", "--enemy-legend-points", "950");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Counter score by stat budget:");
    for (const [gold, score] of expected) expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    expect(pointsLine(result.stdout, "Darius")).toContain("99");
    expect(pointsLine(result.stdout, "Garen")).toContain("950");
  }, 120_000);

  it("preserves the ordinary duel when no Legend state or combat rune is selected", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Darius"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Garen"));
    const expected = simulateMatchup(mine.spec, theirs.spec, 0, data.prices);
    const result = duel(["Darius", "Garen"], "--gold", "0");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).not.toMatch(/Legend points|Legend: Alacrity|declared history/i);
    expectScenarios(result.stdout, expected);
  }, 60_000);

  it.each([
    [["--combat-runes", "9104"], /legend-points|requires|declared/i],
    [["--enemy-combat-runes", "9104"], /enemy-legend-points|requires|declared/i],
    [["--legend-points", "0"], /9104|Alacrity|selected|unused/i],
    [["--combat-runes", "8014", "--legend-points", "0"], /9104|Alacrity|selected|unused/i],
    [["--combat-runes", "9104", "--legend-points", "0", "--enemy-legend-points", "950"], /9104|Alacrity|selected|unused/i],
    [["--combat-runes", "9104", "--legend-points", "-1"], /integer|nonnegative|points/i],
    [["--combat-runes", "9104", "--legend-points", "0", "--legend-points", "1000"], /once/i],
    [["--combat-runes", "9104", "--legend-points"], /requires a value/i],
    [["--combat-runes", "9104", "--legend-points", "NaN"], /integer|nonnegative|points/i],
    [["--enemy-combat-runes", "9104", "--enemy-legend-points", "0", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["--combat-runes", "9104", "--legend-points", "1000", "--search"], /plain-stat duels only/],
    [["--combat-runes", "9104", "--legend-points=0"], /Unknown option/],
  ] as const)("rejects unsupported or incomplete Legend state before displaying a score: %s", (args, error) => {
    const result = duel(["Darius", "Garen"], ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
