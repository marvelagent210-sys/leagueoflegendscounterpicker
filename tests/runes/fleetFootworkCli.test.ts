import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { bestMatchup, simulateMatchup } from "../../engine/sim/matchup";
import { REPO_ROOT } from "../../pipeline/config";
import { loadFighter, loadVariants } from "../../pipeline/kitData";
import { energizedChargesOption } from "../../pipeline/runes/effectOptions";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import { findChampion, loadSimData } from "../../pipeline/simData";
import type { RuneCatalog } from "../../runes/catalog";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { equipShards } from "../../runes/shards";

const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;
const signed = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;

function duel(champions: readonly [string, string], ...args: string[]) {
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/cli/duel.ts"), ...champions, "--dataset", "16.21", ...args],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 90_000 });
}

describe("explicit Energized history on each fighter", () => {
  it.each(["--energized-charges", "--enemy-energized-charges"])("accepts zero, fractional and full pools on %s", flag => {
    expect(energizedChargesOption([], flag, undefined)).toBeUndefined();
    expect(() => energizedChargesOption([], flag, [8021])).toThrow(/requires.*energized-charges/);
    expect(() => energizedChargesOption([flag, "0"], flag, [8005])).toThrow(/same side/);
    expect(() => energizedChargesOption([flag, "10", flag, "20"], flag, [8021])).toThrow(/once/);
    for (const value of ["0", "0.5", "93.75", "99.99", "100", "100.00"]) {
      expect(energizedChargesOption([flag, value], flag, [8021, 9104])).toBe(Number(value));
    }
  });

  it.each(["", " ", " 0", "0 ", ".5", "0.", "-1", "+1", "01", "0x10", "1e2", "NaN", "Infinity",
    "101", "100.000000000000001"])("rejects invalid decimal charge text %j", value => {
    expect(() => energizedChargesOption(["--energized-charges", value], "--energized-charges", [8021])).toThrow(/0 through 100/);
  });
});

describe("manual Fleet Footwork duels", () => {
  let data: Awaited<ReturnType<typeof loadSimData>>;
  let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
  let shards: Awaited<ReturnType<typeof loadShardRules>>;
  beforeAll(async () => {
    [data, rules, shards] = await Promise.all([
      loadSimData("16.21"), loadCombatRuneRules("16.21", catalog), loadShardRules("16.21", catalog),
    ]);
  });

  it("uses each fighter's own declared charges with shards and Legend points in the scenarios and budget sweep", async () => {
    const names = ["Lucian", "Sion"] as const;
    const you = findChampion(data.champions, names[0]);
    const enemy = findChampion(data.champions, names[1]);
    const mine = (await loadFighter(data.dataset, you)).spec;
    const theirs = (await loadFighter(data.dataset, enemy)).spec;
    const a = equipShards(mine, [5005, 5008, 5001], catalog, shards, { adaptiveType: you.adaptiveType }).spec;
    const b = equipShards(theirs, [5008, 5008, 5011], catalog, shards, { adaptiveType: enemy.adaptiveType }).spec;
    const pair = (ownCharges: number, enemyCharges: number) => runeMatchupSpecs(
      equipRuneEffects(a, [8021, 9104], catalog, rules, { energizedCharges: ownCharges, legendPoints: 199 }),
      equipRuneEffects(b, [8021], catalog, rules, { energizedCharges: enemyCharges }),
    );
    const specs = pair(100, 0);
    const expected = simulateMatchup(...specs, 0, data.prices, { settings: { log: true } });
    for (const alternative of [pair(0, 0), pair(100, 100)]) {
      const other = simulateMatchup(...alternative, 0, data.prices, { settings: { log: true } });
      expect(other.scenarios).not.toEqual(expected.scenarios);
    }

    const result = duel(names, "--gold", "0", "--sweep", "--log", "brawl",
      "--shards", "5005,5008,5001", "--combat-runes", "8021,9104", "--energized-charges", "100", "--legend-points", "199",
      "--enemy-shards", "5008,5008,5011", "--enemy-combat-runes", "8021", "--enemy-energized-charges", "0");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Lucian combat runes (partial selection): Fleet Footwork (8021), Legend: Alacrity (9104)");
    expect(result.stdout).toContain("Sion combat runes (partial selection): Fleet Footwork (8021)");
    expect(result.stdout).toContain("Lucian Energized starting charges: 100 / 100");
    expect(result.stdout).toContain("Sion Energized starting charges: 0 / 100");
    expect(result.stdout).toContain("Lucian Legend points: 199");
    expect(result.stdout).toContain("Selected stat shards accompany the explicit partial combat-rune selection.");
    expect(result.stdout).toContain(`Counter score for Lucian: ${signed(expected.score)}`);
    for (const scenario of expected.scenarios) {
      expect(result.stdout).toContain(`${scenario.score === undefined ? "  n/a" : signed(scenario.score)}  ${scenario.id} (${scenario.note})`);
    }
    const timeline = expected.scenarios.find(scenario => scenario.id === "brawl")!.outcomes[0]!.timeline!;
    expect(timeline.length).toBeGreaterThan(0);
    const lines = timeline.map(entry => `  ${(entry.tick / 30).toFixed(2).padStart(6)} s  ${names[entry.side]}: ${entry.text}`);
    expect(result.stdout).toContain("Timeline of brawl (most likely branch; side 0 is Lucian):\n" + lines.join("\n") + "\n");
    for (const gold of [0, 5000, 10000, 15000, 20000]) {
      const score = gold === 0 ? expected.score : simulateMatchup(...specs, gold, data.prices).score;
      expect(result.stdout).toContain(`${String(gold).padStart(6)} gold: ${signed(score)}`);
    }
  }, 120_000);

  it("equips both champions' variants before choosing their matchup", async () => {
    const names = ["Heimerdinger", "Kayn"] as const;
    const [mine, theirs] = await Promise.all(names.map(name => loadVariants(data.dataset, findChampion(data.champions, name))));
    expect(mine!.length).toBeGreaterThan(1);
    expect(theirs!.length).toBeGreaterThan(1);
    const a = mine!.map(variant => ({ ...variant, gear: equipRuneEffects(variant.spec, [8021], catalog, rules, { energizedCharges: 93.5 }) }));
    const b = theirs!.map(variant => ({ ...variant, gear: equipRuneEffects(variant.spec, [8021, 9105], catalog, rules, { energizedCharges: 100, legendPoints: 99 }) }));
    const expected = bestMatchup(
      a.map(({ gear, options }) => ({ options, spec: runeMatchupSpecs(gear, b[0]!.gear)[0] })),
      b.map(({ gear, options }) => ({ options, spec: runeMatchupSpecs(a[0]!.gear, gear)[1] })),
      0, data.prices,
    );
    const result = duel(names, "--gold", "0", "--combat-runes", "8021", "--energized-charges", "93.5",
      "--enemy-combat-runes", "8021,9105", "--enemy-energized-charges", "100", "--enemy-legend-points", "99");
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Heimerdinger Energized starting charges: 93.5 / 100");
    expect(result.stdout).toContain("Kayn Energized starting charges: 100 / 100");
    expect(result.stdout).toContain("Kayn Legend points: 99");
    expect(expected.variants).toHaveLength(2);
    for (const chosen of expected.variants!) {
      const choice = Object.entries(chosen.options).map(([key, value]) => `${key} ${value}`).join(", ");
      expect(result.stdout).toContain(`${names[chosen.side]} plays ${choice}:`);
    }
    expect(result.stdout).toContain(`Counter score for Heimerdinger: ${signed(expected.score)}`);
  }, 120_000);

  it.each([
    [["--combat-runes", "8021"], /requires --energized-charges/],
    [["--enemy-combat-runes", "8021"], /requires --enemy-energized-charges/],
    [["--enemy-combat-runes", "8021", "--energized-charges", "0"], /on the same side/],
    [["--energized-charges", "0"], /on the same side/],
    [["--combat-runes", "8021,8005", "--energized-charges", "0"], /same path row/],
    [["--combat-runes", "8021", "--energized-charges", "0", "--items", "Frozen Heart"], /plain-stat duels only/],
    [["--enemy-combat-runes", "8021", "--enemy-energized-charges", "100", "--search"], /plain-stat duels only/],
  ] as const)("rejects invalid or unsupported inputs before scoring %s", (args, error) => {
    const result = duel(["Lucian", "Sion"], ...args);
    expect(result.status, result.stderr).toBe(1);
    expect(result.stderr).toMatch(error);
    expect(result.stdout).not.toContain("Counter score");
  });
});
