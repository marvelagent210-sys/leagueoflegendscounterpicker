import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AbilityRecord, PetRecord, RuneRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import type { FighterSpec } from "../../engine/sim/spec";
import type { Champion, ChampionDataset } from "../../engine/types";
import { DEFAULT_APP_SETTINGS, type AppSettings } from "../../web/src/settings";
import { combatStatSnapshots, kitFor, runMatchup, type MatchupRun, type SimSource } from "../../web/src/sim/run";

const DIR = path.join(import.meta.dirname, "..", "..", "data", "16.21");
const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as T;
const champions = new Map(read<ChampionDataset>("champions.json").champions.map((champion) => [champion.id, champion]));
const champion = (id: string): Champion => {
  const found = champions.get(id);
  if (!found) throw new Error(`No champion ${id}`);
  return found;
};
const source: SimSource = {
  champion,
  records: async (id) => read<AbilityRecord[]>(`abilities/${id}.json`),
  pets: (id) => existsSync(path.join(DIR, "pets", `${id}.json`)) ? read<PetRecord[]>(`pets/${id}.json`) : [],
  runes: read<RuneRecord[]>("runes.json"),
  prices: read<{ statPrices: StatPrices }>("rules.json").statPrices,
};
const spec = async (id: string, settings = DEFAULT_APP_SETTINGS): Promise<FighterSpec> => (await kitFor(source, id, settings)).spec;

afterEach(() => vi.unstubAllGlobals());

describe("opening combat statistics", () => {
  it("includes Yasuo's doubled crit and Garen's initial Courage resists", async () => {
    const yasuo = { ...await spec("Yasuo"), bonus: { critChance: 0.3, ad: 40 } };
    const garen = { ...await spec("Garen"), bonus: { armor: 50, mr: 20 } };
    const { stats, openingStats } = combatStatSnapshots([yasuo, garen], DEFAULT_APP_SETTINGS);
    expect(stats[0].critChance).toBe(0.3);
    expect(openingStats[0].critChance).toBe(0.6);
    expect(openingStats[1].armor - stats[1].armor).toBeCloseTo(30);
    expect(openingStats[1].mr - stats[1].mr).toBeCloseTo(30);
    // Initialization must leave the compiled kit reusable, with no statuses attached to it.
    expect(yasuo.bonus.critChance).toBe(0.3);
    expect(combatStatSnapshots([yasuo, garen], DEFAULT_APP_SETTINGS)).toEqual({ stats, openingStats });
  });

  it("reports excess Yasuo crit conversion and Ornn's starting health/resistance multipliers", async () => {
    const yasuo = { ...await spec("Yasuo"), bonus: { critChance: 0.75, ad: 40 } };
    const ornn = { ...await spec("Ornn"), bonus: { hp: 500, armor: 100, mr: 40 } };
    const { stats, openingStats } = combatStatSnapshots([yasuo, ornn], DEFAULT_APP_SETTINGS);
    expect(openingStats[0].critChance).toBe(1);
    expect(openingStats[0].ad - stats[0].ad).toBeCloseTo(25);
    expect(openingStats[1].maxHp - stats[1].maxHp).toBeCloseTo(150);
    expect(openingStats[1].armor - stats[1].armor).toBeCloseTo(30);
    expect(openingStats[1].mr - stats[1].mr).toBeCloseTo(12);
  });

  it("includes Malphite's shielded onStart armor, while preserving Poppy's before-tick boundary", async () => {
    const malphite = { ...await spec("Malphite"), bonus: { armor: 100 } };
    const poppy = { ...await spec("Poppy"), bonus: { armor: 100 } };
    const { stats, openingStats } = combatStatSnapshots([malphite, poppy], DEFAULT_APP_SETTINGS);
    expect(openingStats[0].armor).toBeCloseTo(stats[0].armor * 1.9);
    expect(openingStats[1].armor).toBe(stats[1].armor);
    expect(openingStats[1].mr).toBe(stats[1].mr);
    expect(openingStats[1].attackRange).toBe(stats[1].attackRange);
  });

  it("uses the real environment and initial range buffs without executing damaging passive ticks", async () => {
    const initial: FighterSpec = {
      ...await spec("Garen"),
      start: [{ type: "stat", stat: "attackRange", amount: { base: 75 }, duration: 1e9 }],
      hooks: {
        onStart(ctx) {
          ctx.buff("setupAP", "AP", ctx.world.settings.environment.laneSetup ? 23 : 0, 1e9);
        },
        onTick() {
          throw new Error("A stat snapshot must not execute combat ticks");
        },
      },
    };
    const enemy = await spec("Darius");
    const enabled = combatStatSnapshots([initial, enemy], DEFAULT_APP_SETTINGS);
    const disabled = combatStatSnapshots([initial, enemy], { ...DEFAULT_APP_SETTINGS, environment: { ...DEFAULT_APP_SETTINGS.environment, laneSetup: false } });
    expect(enabled.stats[0].ap).toBe(0);
    expect(enabled.openingStats[0].ap).toBe(23);
    expect(disabled.openingStats[0].ap).toBe(0);
    expect(enabled.openingStats[0].attackRange - enabled.stats[0].attackRange).toBe(75);
  });

  it("includes Urgot's initial Purge movement penalty without running its firing hook", async () => {
    const { stats, openingStats } = combatStatSnapshots([await spec("Urgot"), await spec("Darius")], DEFAULT_APP_SETTINGS);
    expect(openingStats[0].moveSpeed).toBeLessThan(stats[0].moveSpeed);
  });

  it("reports the initialized stats of the selected matchup and its explicit kit options", async () => {
    const settings: AppSettings = { ...DEFAULT_APP_SETTINGS, gold: 0, kitOptions: { Garen: { courageStacks: 40 } } };
    const run = await runMatchup(source, "Garen", "Darius", settings, false);
    expect(run.openingStats[0].armor - run.stats[0].armor).toBeCloseTo(8);
    expect(run.openingStats[0].mr - run.stats[0].mr).toBeCloseTo(8);
    const expected = combatStatSnapshots([await spec("Garen", settings), await spec("Darius", settings)], settings);
    expect(run.openingStats).toEqual(expected.openingStats);
  }, 60_000);
});

describe("combat stats display", () => {
  it("shows equipped and initialized numbers in distinct columns with the snapshot boundary", async () => {
    vi.stubGlobal("navigator", { hardwareConcurrency: 2 });
    // Dynamic import keeps the browser-only DOM and JSX types out of the Node test project.
    const pagePath = "../../web/src/pages/MatchupPage";
    const { CombatNumbers } = await import(pagePath) as { CombatNumbers: ComponentType<{ you: Champion; enemy: Champion; run: MatchupRun }> };
    const snapshots = combatStatSnapshots([
      { ...await spec("Garen"), bonus: { armor: 50 } },
      { ...await spec("Yasuo"), bonus: { critChance: 0.3 } },
    ], DEFAULT_APP_SETTINGS);
    const run: MatchupRun = {
      you: "Garen", enemy: "Yasuo", score: 0, scenarios: [],
      spent: [{}, {}] as MatchupRun["spent"], assumptions: [[], []], ...snapshots,
    };
    const html = renderToStaticMarkup(createElement(CombatNumbers, { you: champion("Garen"), enemy: champion("Yasuo"), run }));
    expect(html).toContain("before the first passive tick");
    expect(html).toContain("Equipped");
    expect(html).toContain("Fight setup");
    const row = (name: string) => {
      const found = new RegExp(`<tr><td>${name}</td>(.*?)</tr>`).exec(html)?.[1];
      if (!found) throw new Error(`No row for ${name}`);
      return Array.from(found.matchAll(/<td class="n">([^<]*)<\/td>/g), (match) => match[1]);
    };
    expect(row("Crit chance").slice(3)).toEqual(["0%", "30%", "60%"]);
    expect(row("Armor").slice(1, 3)).toEqual([String(Math.round(run.stats[0].armor)), String(Math.round(run.openingStats[0].armor))]);
  });
});
