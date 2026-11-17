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

describe("Presence of Mind CLI selection and declared Legend history", () => {
  it.each(["--combat-runes", "--enemy-combat-runes"])("accepts Presence without inventing history on %s", flag => {
    expect(combatRuneOption([flag, "8444,8009,8014"], flag, catalog)).toEqual([8009, 8014, 8444]);
    const pointsFlag = flag === "--combat-runes" ? "--legend-points" : "--enemy-legend-points";
    expect(legendPointsOption([], pointsFlag, [8009])).toBeUndefined();
    expect(() => legendPointsOption([pointsFlag, "0"], pointsFlag, [8009])).toThrow(/same side/);
  });

  it.each([9103, 9104, 9105])("accepts one Legend %s with that side's explicit points", legend => {
    for (const flag of ["--combat-runes", "--enemy-combat-runes"]) {
      expect(combatRuneOption([flag, `${legend},8009`], flag, catalog)).toEqual([8009, legend]);
      const pointsFlag = flag === "--combat-runes" ? "--legend-points" : "--enemy-legend-points";
      expect(() => legendPointsOption([], pointsFlag, [8009, legend])).toThrow(/requires.*legend-points/);
      expect(legendPointsOption([pointsFlag, "0"], pointsFlag, [8009, legend])).toBe(0);
    }
  });

  it("rejects both same-row alternatives, duplicates and history supplied to the wrong side", () => {
    for (const selection of ["8009,9101", "8009,9111", "8009,8009", "8009,9103,9104"]) {
      expect(() => combatRuneOption(["--combat-runes", selection], "--combat-runes", catalog)).toThrow(/same path row|cannot repeat/);
    }
    expect(() => legendPointsOption(["--enemy-legend-points", "0"], "--legend-points", [8009, 9103])).toThrow(/requires.*legend-points/);
    expect(() => legendPointsOption(["--legend-points", "0"], "--enemy-legend-points", [8009, 9104])).toThrow(/requires.*enemy-legend-points/);
  });
});

function duel(champions: readonly [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 60_000 });
}

const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

/** Check each native scenario and branch result, rather than just the rounded total. */
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

function expectTimeline(output: string, expected: MatchupResult, scenarioId: string, names: readonly [string, string]): void {
  const timeline = expected.scenarios.find(scenario => scenario.id === scenarioId)!.outcomes[0]!.timeline!;
  expect(timeline.length).toBeGreaterThan(0);
  const lines = timeline.map(entry => `  ${(entry.tick / 30).toFixed(2).padStart(6)} s  ${names[entry.side]}: ${entry.text}`);
  expect(output.split(`Timeline of ${scenarioId} (most likely branch; side 0 is ${names[0]}):\n`)[1]?.trimEnd()).toBe(lines.join("\n"));
}

describe("actual manual command-line duels with Presence of Mind", () => {
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

  it("equips real Mana and Energy bodies with shards and no Presence history flag", async () => {
    const names = ["Cassiopeia", "Akali"] as const;
    const you = findChampion(data.champions, names[0]), enemy = findChampion(data.champions, names[1]);
    const mine = await loadFighter(data.dataset, you), theirs = await loadFighter(data.dataset, enemy);
    expect(mine.spec.resourceType).toBe("Mana"); expect(theirs.spec.resourceType).toBe("Energy");
    const selections: [ShardSelection, ShardSelection] = [[5005, 5001, 5011], [5008, 5008, 5001]];
    const a = equipShards(mine.spec, selections[0], catalog, shardRules, { adaptiveType: you.adaptiveType }).spec;
    const b = equipShards(theirs.spec, selections[1], catalog, shardRules, { adaptiveType: enemy.adaptiveType }).spec;
    const expected = simulateMatchup(...runeMatchupSpecs(equipped(a, [8009]), equipped(b, [8009])), 0, data.prices, { settings: { log: true } });
    const result = duel(names, "--gold", "0", "--combat-runes", "8009", "--enemy-combat-runes", "8009",
      "--shards", selections[0].join(","), "--enemy-shards", selections[1].join(","), "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Cassiopeia combat runes (partial selection): Presence of Mind (8009)");
    expect(result.stdout).toContain("Akali combat runes (partial selection): Presence of Mind (8009)");
    expect(result.stdout).not.toMatch(/Legend points:/);
    expect(result.stdout).toContain("Selected stat shards accompany the explicit partial combat-rune selection.");
    expect(result.stdout).toContain("The plain-stat allocation remains its no-rune reference");
    expect(result.stdout).toContain("Stat budget 0 gold: Cassiopeia buys nothing; Akali buys nothing");
    expect(result.stdout).toContain("Counter score for Cassiopeia: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", names);
  }, 90_000);

  it.each([0, 1] as const)("includes side %s's resource-limited native benefit in the command's result", async side => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Cassiopeia"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const names = side === 0 ? ["Cassiopeia", "Sion"] as const : ["Sion", "Cassiopeia"] as const;
    const pair = side === 0
      ? runeMatchupSpecs(equipped(mine.spec, [8009]), equipped(theirs.spec, []))
      : runeMatchupSpecs(equipped(theirs.spec, []), equipped(mine.spec, [8009]));
    const expected = simulateMatchup(...pair, 0, data.prices, { settings: { log: true } });
    const baseline = simulateMatchup(side === 0 ? mine.spec : theirs.spec, side === 0 ? theirs.spec : mine.spec, 0, data.prices, { settings: { log: true } });
    const ownerSign = side === 0 ? 1 : -1;
    expect(ownerSign * (expected.score - baseline.score)).toBeGreaterThan(0.005);
    expect(signed(expected.score)).not.toBe(signed(baseline.score));
    const casts = (result: MatchupResult) => result.scenarios.find(scenario => scenario.id === "brawl")!
      .outcomes[0]!.timeline!.filter(entry => entry.side === side && entry.text.startsWith("casts ")).length;
    expect(casts(expected)).toBeGreaterThan(casts(baseline));
    // No resource-gain log is invented by this test: actual changed combat
    // outcomes and the complete native timeline expose whether the flag ran.
    const result = duel(names, "--gold", "0", side === 0 ? "--combat-runes" : "--enemy-combat-runes", "8009", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).not.toMatch(/Legend points:/);
    expect(result.stdout).toContain(`Counter score for ${names[0]}: ` + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", names);
  }, 90_000);

  it("equips every variant with Presence and its side's declared Legend history before selection", async () => {
    const names = ["Heimerdinger", "Karthus"] as const;
    const mine = await loadVariants(data.dataset, findChampion(data.champions, names[0]));
    const theirs = await loadVariants(data.dataset, findChampion(data.champions, names[1]));
    expect(mine.length).toBeGreaterThan(1);
    const a = mine.map(variant => ({ variant, equipment: equipped(variant.spec, [8009, 9103], 1500) }));
    const b = theirs.map(variant => ({ variant, equipment: equipped(variant.spec, [8009, 9105], 199) }));
    const expected = bestMatchup(
      a.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(equipment, b[0]!.equipment)[0] })),
      b.map(({ variant, equipment }) => ({ ...variant, spec: runeMatchupSpecs(a[0]!.equipment, equipment)[1] })),
      0, data.prices, { settings: { log: true } });
    const result = duel(names, "--gold", "0", "--combat-runes", "8009,9103", "--legend-points", "1500",
      "--enemy-combat-runes", "8009,9105", "--enemy-legend-points", "199", "--log", "brawl");
    expect(result.status, result.stderr).toBe(0);
    for (const chosen of expected.variants ?? []) {
      expect(result.stdout).toContain(`${names[chosen.side]} plays ${Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ")}`);
    }
    expect(result.stdout).toMatch(/Heimerdinger Legend points: 1500; 15 stacks, 6\.75% life steal, 85 bonus health/);
    expect(result.stdout).toMatch(/Karthus Legend points: 199; 1 stacks, 1\.5 basic ability haste/);
    expect(result.stdout).toContain("Counter score for Heimerdinger: " + signed(expected.score));
    expectScenarios(result.stdout, expected);
    expectTimeline(result.stdout, expected, "brawl", names);
  }, 90_000);

  it("recreates Presence and the separate Legend state for every swept stat budget", async () => {
    const mine = await loadFighter(data.dataset, findChampion(data.champions, "Cassiopeia"));
    const theirs = await loadFighter(data.dataset, findChampion(data.champions, "Sion"));
    const expected = [0, 5000, 10000, 15000, 20000].map(gold => {
      const pair = runeMatchupSpecs(equipped(mine.spec, [8009, 9105], 99), equipped(theirs.spec, [8009, 9104], 199));
      return [gold, simulateMatchup(...pair, gold, data.prices).score] as const;
    });
    const legendOnly = runeMatchupSpecs(equipped(mine.spec, [9105], 99), equipped(theirs.spec, [9104], 199));
    const reference = simulateMatchup(...legendOnly, 5000, data.prices).score;
    const swept = expected.find(([gold]) => gold === 5000)![1];
    expect(swept - reference).toBeGreaterThan(0.01);
    expect(signed(swept)).not.toBe(signed(reference));
    const result = duel(["Cassiopeia", "Sion"], "--gold", "0", "--sweep", "--combat-runes", "8009,9105", "--legend-points", "99",
      "--enemy-combat-runes", "8009,9104", "--enemy-legend-points", "199");
    expect(result.status, result.stderr).toBe(0);
    for (const [gold, score] of expected) expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    expect(result.stdout).toMatch(/Cassiopeia Legend points: 99; 0 stacks, 0 basic ability haste/);
    expect(result.stdout).toMatch(/Sion Legend points: 199; 1 stacks, 4\.5% bonus attack speed/);
  }, 120_000);

  it.each([
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009,9101"], /same path row/],
    [["Cassiopeia", "Sion"], ["--enemy-combat-runes", "8009,9111"], /same path row/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009,8009"], /cannot repeat/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009,9103"], /requires.*legend-points/],
    [["Cassiopeia", "Sion"], ["--enemy-combat-runes", "8009,9105"], /requires.*enemy-legend-points/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009", "--legend-points", "0"], /same side/],
    [["Cassiopeia", "Sion"], ["--enemy-combat-runes", "8009", "--enemy-legend-points", "0"], /same side/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009", "--presence-points", "0"], /Unknown option/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["Cassiopeia", "Sion"], ["--enemy-combat-runes", "8009", "--enemy-items", "Frozen Heart"], /plain-stat duels only/],
    [["Cassiopeia", "Sion"], ["--combat-runes", "8009", "--search"], /plain-stat duels only/],
    [["Garen", "Kennen"], ["--combat-runes", "8009"], /Presence of Mind.*Mana.*Energy/],
    [["Cassiopeia", "Garen"], ["--enemy-combat-runes", "8009"], /Presence of Mind.*Mana.*Energy/],
    [["Gnar", "Sion"], ["--combat-runes", "8009"], /Presence of Mind.*Mana.*Energy/],
  ] as const)("rejects incompatible or unsupported Presence inputs before scoring: %s %s", (names, args, error) => {
    const result = duel(names, ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
