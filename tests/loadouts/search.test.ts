/**
 * The loadout search (pipeline/loadouts/search.ts): the keystones and summoner spells it fights
 * for, the pages it completes by the quick estimate, and its rounds, between synthetic fighters
 * with plain numbers (tests/sim/kits.ts), whose fights are quick.
 */
import { describe, expect, it } from "vitest";
import { type ItemParts, itemParts } from "../../items/equip";
import { equipOptions, findItem } from "../../pipeline/itemData";
import { FLASH, type LoadoutSide, keystonePages, searchLoadouts } from "../../pipeline/loadouts/search";
import { pageProblems } from "../../runes/equip";
import { catalog as runes, items, spells } from "../runes/helpers";
import { ability, fighter } from "../sim/kits";

const catalogs = { items, runes, spells };
const partsOf = (spec: LoadoutSide["spec"], build: string[]): ItemParts[] => build.map((name) => itemParts(spec, findItem(items, name), equipOptions(items)));
const side = (spec: LoadoutSide["spec"], build: string[]): LoadoutSide => ({ spec, estimate: spec, build, parts: partsOf(spec, build), adaptiveType: "Physical" });

const fighterBuild = ["Infinity Edge", "Plated Steelcaps", "Thornmail"];
const plain = side(fighter(), fighterBuild);
const enemy = side(fighter({ id: "enemy" }), ["Sunfire Aegis", "Plated Steelcaps", "Spirit Visage"]);
/** A fighter whose Q stuns: it plays Aftershock and Glacial Augment rather than their substitutes. */
const stunner = side(fighter({ abilities: [ability({ key: "Q", cooldown: 8, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] })] }), fighterBuild);

describe("the keystones and spells a side fights for", () => {
  it("are every keystone the champion can play, the Rune article's substitutions made once each, Unsealed Spellbook left out", () => {
    const keystones = keystonePages([plain, enemy], 0, undefined, catalogs).map((page) => page.keystone);
    expect(keystones).toContain("Grasp of the Undying");
    expect(keystones).toContain("First Strike");
    expect(keystones).not.toContain("Aftershock");
    expect(keystones).not.toContain("Glacial Augment");
    expect(keystones).not.toContain("Unsealed Spellbook");
    expect(new Set(keystones).size).toBe(keystones.length);
    // Of the catalog's 17: Unsealed Spellbook out, Aftershock and Glacial Augment played as Grasp and First Strike.
    expect(keystones.length).toBe(runes.runes.filter((entry) => entry.row === 0).length - 3);
    const immobilizing = keystonePages([stunner, enemy], 0, undefined, catalogs).map((page) => page.keystone);
    expect(immobilizing).toContain("Aftershock");
    expect(immobilizing).toContain("Glacial Augment");
  });

  it("are Flash and each of the six other summoner spells that do something in a duel", () => {
    const found = searchLoadouts([plain, enemy], catalogs, { rounds: 1 });
    expect(found.screens[0][0]!.spells.map((entry) => entry.candidate).sort()).toEqual(["Barrier", "Cleanse", "Exhaust", "Ghost", "Heal", "Ignite"]);
    for (const loadout of found.loadouts) expect(loadout.spells[0]).toBe(FLASH);
  });
});

describe("a keystone's page", () => {
  const pages = keystonePages([plain, enemy], 0, undefined, catalogs);

  it("follows the wiki's rules for every keystone", () => {
    for (const page of pages) expect(pageProblems(page, runes), page.keystone).toEqual([]);
  });

  it("takes the runes and shards the estimate values over those it doesn't: no movement speed or tenacity shard, no rune that works outside duels where another can go", () => {
    for (const page of pages) {
      expect(page.shards.some((shard) => shard === "Move Speed" || shard === "Tenacity and Slow Resist"), page.keystone).toBe(false);
      for (const name of [...page.primary, ...page.secondary]) expect(["Waterwalking", "Treasure Hunter", "Cash Back", "Demolish"], `${page.keystone}: ${name}`).not.toContain(name);
    }
    // A fighter that deals physical damage and takes it: its shards are attack speed or adaptive force, and health.
    const conqueror = pages.find((page) => page.keystone === "Conqueror")!;
    expect(["Attack Speed", "Adaptive Force"]).toContain(conqueror.shards[0]);
    expect(["Health Scaling", "Health"]).toContain(conqueror.shards[2]);
  });
});

describe("the loadout search", () => {
  const found = searchLoadouts([plain, enemy], catalogs);

  it("fights every keystone and spell in the first round, and each side's three best keystones and two best spells in the second", () => {
    const keystones = keystonePages([plain, enemy], 0, undefined, catalogs).length;
    for (const rounds of found.screens) {
      expect(rounds.map((round) => [round.keystones.length, round.spells.length])).toEqual([[keystones, 6], [3, 2]]);
      const [first, second] = rounds;
      const best = (entries: Array<{ candidate: string; score: number }>, count: number) => [...entries].sort((a, b) => b.score - a.score).slice(0, count).map((entry) => entry.candidate);
      expect(second!.keystones.map((entry) => entry.candidate)).toEqual(best(first!.keystones, 3));
      expect(second!.spells.map((entry) => entry.candidate)).toEqual(best(first!.spells, 2));
    }
    expect(found.fights).toBe(2 * (keystones + 6 + 3 + 2));
  });

  it("gives each side the keystone and spell that did best in its last round, on a legal page", () => {
    ([0, 1] as const).forEach((side) => {
      const loadout = found.loadouts[side];
      const last = found.screens[side].at(-1)!;
      const top = (entries: Array<{ candidate: string; score: number }>) => entries.reduce((best, entry) => (entry.score > best.score + 1e-12 ? entry : best)).candidate;
      expect(loadout.page.keystone).toBe(top(last.keystones));
      expect(loadout.spells).toEqual([FLASH, top(last.spells)]);
      expect(pageProblems(loadout.page, runes)).toEqual([]);
    });
  });

  it("is deterministic", () => {
    expect(searchLoadouts([plain, enemy], catalogs).loadouts).toEqual(found.loadouts);
  });
});
