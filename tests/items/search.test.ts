/** The build search (PLAN.md §13, M8): its quick estimate, its rules and how it picks between routes. */
import { describe, expect, it } from "vitest";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { itemParts } from "../../items/equip";
import { estimate, estimateSpec, estimateUnit } from "../../items/estimate";
import { DATA_DIR } from "../../pipeline/config";
import { latestDataset } from "../../pipeline/datasets";
import { equipBuild, equipOptions, findItem, loadItemCatalog } from "../../pipeline/itemData";
import { REVIEWED_GROUPS, buildProblems } from "../../pipeline/items/rules";
import { type Candidate, candidatesFor, chooseRoutes, fits, names, profileOf, searchSide } from "../../pipeline/items/search";
import { loadSimData } from "../../pipeline/simData";
import { kit } from "../kits/helpers";

const dataset = await latestDataset(DATA_DIR, "items.json");
const catalog = await loadItemCatalog(dataset);
const equip = equipOptions(catalog);
const { prices } = await loadSimData(dataset);
const darius = kit("Darius").spec;
const garen = kit("Garen").spec;
const ahri = kit("Ahri").spec;
const vayne = kit("Vayne").spec;
const parts = (spec: FighterSpec, items: string[]) => items.map((name) => itemParts(spec, findItem(catalog, name), equip));
/**
 * The item stat statuses a fighter starts a fight with, but those that items' hooks set
 * (Rabadon's Deathcap's AP, Dead Man's Plate's speed): the estimate leaves those to hints.
 */
const itemStats = (statuses: Array<{ kind: string; memoKey?: string; key: string; value: number }>) =>
  statuses.filter((s) => s.kind === "stat" && s.memoKey?.startsWith("item:")).map((s) => `${s.memoKey}=${s.value}`).filter((s) => !/:(speed|AP)=/.test(s)).sort();

describe("the quick estimate", () => {
  const builds: Array<[FighterSpec, string[]]> = [
    [darius, ["Black Cleaver", "Sterak's Gage", "Dead Man's Plate", "Lord Dominik's Regards", "Infinity Edge", "Mercury's Treads"]],
    [ahri, ["Luden's Echo", "Rabadon's Deathcap", "Void Staff", "Zhonya's Hourglass", "Shadowflame", "Sorcerer's Shoes"]],
    [vayne, ["Nashor's Tooth", "Blade of the Ruined King", "Kraken Slayer", "Infinity Edge", "Phantom Dancer", "Berserker's Greaves"]],
  ];

  it.each(builds)("sees a build's stats, critical strike damage and on-hit effects as equipItems puts them on the champion: %#", (spec, items) => {
    const equipped = equipBuild(spec, items, catalog).spec;
    const seen = estimateSpec(spec, parts(spec, items));
    expect(seen.bonus).toEqual(equipped.bonus);
    expect(seen.base.critDamageModifier).toBeCloseTo(equipped.base.critDamageModifier, 12);
    expect(seen.attack.onHit?.length ?? 0).toBe(equipped.attack.onHit?.length ?? 0);
  });

  it.each(builds)("and the stats items keep as statuses, percentage penetration among them: %#", (spec, items) => {
    const equipped = equipBuild(spec, items, catalog).spec;
    const fought = createWorld({ fighters: [equipped, garen], distance: 500, modes: ["idle", "idle"] }).units[0];
    expect(itemStats(estimateUnit(spec, parts(spec, items), 0).statuses)).toEqual(itemStats(fought.statuses));
  });

  it("values items: a full build beats none, and Lord Dominik's Regards counts against an armored enemy", () => {
    const tank = parts(garen, ["Randuin's Omen", "Thornmail", "Frozen Heart"]);
    const bare = estimate(darius, [], garen, tank);
    expect(estimate(darius, parts(darius, ["Infinity Edge"]), garen, tank)).toBeGreaterThan(bare);
    const withPen = estimate(darius, parts(darius, ["Infinity Edge", "Lord Dominik's Regards"]), garen, tank);
    // The same shop stats but its armor penetration: Lord Dominik's Regards against Bloodthirster's AD and crit, roughly.
    expect(withPen).toBeGreaterThan(estimate(darius, parts(darius, ["Infinity Edge"]), garen, tank));
  });
});

describe("the build rules the search keeps", () => {
  const six = candidatesFor(darius, catalog, equip, prices, "sixItems");
  const five = candidatesFor(darius, catalog, equip, prices, "fiveItemsWithBoots");
  const item = (list: Candidate[], name: string) => list.find((c) => c.record.name === name)!;

  it("six items have no boots; five items and boots add the seven tier-2 boots", () => {
    expect(six.some((c) => c.boots)).toBe(false);
    expect(five.filter((c) => c.boots)).toHaveLength(7);
  });

  it("an item only ranged champions can buy is left out for melee champions", () => {
    expect(six.some((c) => c.record.name === "Runaan's Hurricane")).toBe(false);
    expect(candidatesFor(vayne, catalog, equip, prices, "sixItems").some((c) => c.record.name === "Runaan's Hurricane")).toBe(true);
  });

  it("no item twice, one item per group, one pair of boots, and five finished items beside it", () => {
    const ldr = item(six, "Lord Dominik's Regards");
    expect(fits([ldr], ldr, "sixItems")).toBe(false);
    expect(fits([ldr], item(six, "Serylda's Grudge"), "sixItems")).toBe(false);
    expect(fits([ldr], item(six, "Infinity Edge"), "sixItems")).toBe(true);
    const treads = item(five, "Plated Steelcaps");
    expect(fits([item(five, "Mercury's Treads")], treads, "fiveItemsWithBoots")).toBe(false);
    const finished = ["Infinity Edge", "Black Cleaver", "Sterak's Gage", "Dead Man's Plate", "Death's Dance"].map((name) => item(five, name));
    expect(fits(finished, item(five, "Thornmail"), "fiveItemsWithBoots")).toBe(false);
    expect(fits(finished, treads, "fiveItemsWithBoots")).toBe(true);
  });

  it("a Tear item is held stacked: Manamune is Muramana", () => {
    expect(item(six, "Manamune").held.name).toBe("Muramana");
    expect(candidatesFor(darius, catalog, equip, prices, "sixItems", false).find((c) => c.record.name === "Manamune")!.held.name).toBe("Manamune");
  });
});

describe("a side's search", () => {
  const routes = searchSide(darius, candidatesFor(darius, catalog, equip, prices, "fiveItemsWithBoots"), estimateUnit(garen, [], 1), { format: "fiveItemsWithBoots", width: 6, perProfile: 2 });

  it("finds full builds within the rules, one route per profile, best first", () => {
    expect(routes.length).toBeGreaterThan(1);
    for (const route of routes) {
      expect(route.items).toHaveLength(6);
      expect(buildProblems(route.items.map((c) => c.record), REVIEWED_GROUPS, "fiveItemsWithBoots")).toEqual([]);
    }
    expect(new Set(routes.map((route) => profileOf(route.items))).size).toBe(routes.length);
    for (let i = 1; i < routes.length; i++) expect(routes[i]!.value).toBeLessThanOrEqual(routes[i - 1]!.value);
    expect(routes[0]!.value).toBeGreaterThan(estimate(darius, [], garen, []));
  });

  it("no single swap that keeps its profile improves a route", () => {
    const best = routes[0]!;
    const useful = candidatesFor(darius, catalog, equip, prices, "fiveItemsWithBoots");
    const enemy = estimateUnit(garen, [], 1);
    for (let i = 0; i < best.items.length; i++) {
      const rest = best.items.filter((_, j) => j !== i);
      for (const candidate of useful) {
        if (!fits(rest, candidate, "fiveItemsWithBoots")) continue;
        const swapped = [...rest, candidate];
        if (profileOf(swapped) !== profileOf(best.items)) continue;
        expect(estimate(darius, swapped.map((c) => c.parts), garen, []), names({ items: swapped, value: 0 }).join(", ")).toBeLessThanOrEqual(best.value + 1e-9);
      }
    }
    expect(enemy.spec.id).toBe(garen.id);
  });
});

describe("picking between routes (Udyr's rule)", () => {
  it("you take the route whose worst result is best, they the one that holds you lowest", () => {
    expect(chooseRoutes([[0.5, -0.2], [0.1, 0]])).toEqual([1, 1]);
    expect(chooseRoutes([[0.3, 0.6], [0.2, 0.1]])).toEqual([0, 0]);
  });

  it("ties go to the earlier route, the better by the estimate", () => {
    expect(chooseRoutes([[0, 0], [0, 0]])).toEqual([0, 0]);
  });
});
