/**
 * The loadout search (pipeline/loadouts/search.ts): the summoner spells it fights for and its
 * rounds, between synthetic fighters with plain numbers (tests/sim/kits.ts), whose fights are
 * quick.
 */
import { describe, expect, it } from "vitest";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { loadItemCatalog, loadSpellCatalog } from "../../pipeline/itemData";
import { FLASH, type LoadoutSide, type LoadoutScreen, searchLoadouts } from "../../pipeline/loadouts/search";
import { fighter } from "../sim/kits";

const dataset = await latestDataset(DATA_DIR, "summoners.json");
const [items, spells] = await Promise.all([loadItemCatalog(dataset), loadSpellCatalog(dataset)]);
const catalogs = { items, spells };

const plain: LoadoutSide = { spec: fighter(), build: ["Infinity Edge", "Plated Steelcaps", "Thornmail"] };
const enemy: LoadoutSide = { spec: fighter({ id: "enemy" }), build: ["Sunfire Aegis", "Plated Steelcaps", "Spirit Visage"] };
const ranked = (entries: LoadoutScreen[], count: number) => [...entries].sort((a, b) => b.score - a.score).slice(0, count).map((entry) => entry.candidate);

describe("the loadout search", () => {
  const found = searchLoadouts([plain, enemy], catalogs);

  it("fights for each of the six spells besides Flash that do something in a duel, and every loadout holds Flash", () => {
    expect(found.screens[0][0]!.map((entry) => entry.candidate).sort()).toEqual(["Barrier", "Cleanse", "Exhaust", "Ghost", "Heal", "Ignite"]);
    for (const loadout of found.loadouts) expect(loadout.spells[0]).toBe(FLASH);
  });

  it("fights every spell in the first round, and each side's two best again in the second", () => {
    for (const rounds of found.screens) {
      expect(rounds.map((round) => round.length)).toEqual([6, 2]);
      expect(rounds[1]!.map((entry) => entry.candidate)).toEqual(ranked(rounds[0]!, 2));
    }
    expect(found.fights).toBe(2 * (6 + 2));
  });

  it("gives each side the spell that did best in its last round", () => {
    ([0, 1] as const).forEach((side) => {
      const last = found.screens[side].at(-1)!;
      const top = last.reduce((best, entry) => (entry.score > best.score + 1e-12 ? entry : best)).candidate;
      expect(found.loadouts[side].spells).toEqual([FLASH, top]);
    });
  });

  it("answers in as many rounds as asked, keeping as many spells as asked", () => {
    const one = searchLoadouts([plain, enemy], catalogs, { rounds: 1 });
    expect(one.screens.map((rounds) => rounds.length)).toEqual([1, 1]);
    const three = searchLoadouts([plain, enemy], catalogs, { rounds: 3, keep: 3 });
    expect(three.screens[0].map((round) => round.length)).toEqual([6, 3, 3]);
  });

  it("is deterministic", () => {
    expect(searchLoadouts([plain, enemy], catalogs).loadouts).toEqual(found.loadouts);
  });
});
