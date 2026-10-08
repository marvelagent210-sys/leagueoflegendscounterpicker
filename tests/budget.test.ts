import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocate, allocateBoth, BUDGET_STATS, damagePerSecond, type StatPrices } from "../engine/budget";
import { ability, fighter } from "./sim/kits";

const rules = JSON.parse(readFileSync(new URL("../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices };
const prices = rules.statPrices;

const total = (spent: Record<string, number>) => Object.values(spent).reduce((a, b) => a + b, 0);

const blast = ability({ key: "Q", cooldown: 2, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100, ratios: { AP: 1.2 } } }] });

describe("stat prices", () => {
  it("come from the wiki's gold values", () => {
    expect(prices).toEqual({ ad: 35, ap: 20, as: 25, crit: 40, ah: 50, lethality: 30, mpenflat: 46.666667, hp: 2.666667, armor: 20, mr: 20 });
  });
});

describe("stat budget", () => {
  it("spends nothing at 0 gold", () => {
    const [a, b] = allocateBoth(fighter(), fighter(), 0, prices);
    expect(a.bonus).toEqual({});
    expect(b.bonus).toEqual({});
  });

  it("buys attack stats and physical defense for an attack-only fighter against physical damage", () => {
    const result = allocate(fighter(), fighter(), 6000, prices);
    expect(total(result.spent)).toBe(6000);
    for (const stat of ["ap", "ah", "mpenflat", "mr"] as const) expect(result.spent[stat], stat).toBe(0);
    expect(result.spent.ad + result.spent.as + result.spent.crit + result.spent.lethality).toBeGreaterThan(0);
    expect(result.spent.hp + result.spent.armor).toBeGreaterThan(0);
    expect(result.bonus.critChance ?? 0).toBeLessThanOrEqual(1);
  });

  it("follows the kit's own ratios", () => {
    // 120% AP every 2 s: 50 gold of AP (2.5) adds 1.5 damage per second; of AD (1.43), 0.89 through attacks.
    const mage = fighter({ abilities: [blast] });
    const result = allocate(mage, fighter(), 6000, prices);
    expect(result.spent.ap).toBeGreaterThan(0);
    expect(result.spent.ad).toBe(0);
  });

  it("defends against the enemy's damage type", () => {
    const glass = fighter({ base: { hp: 1000, armor: 30, mr: 30 } });
    const vsPhysical = allocate(glass, fighter(), 6000, prices);
    expect(vsPhysical.spent.armor).toBeGreaterThan(0);
    expect(vsPhysical.spent.mr).toBe(0);
    const vsMagic = allocate(glass, fighter({ base: { ad: 20 }, abilities: [blast] }), 6000, prices);
    expect(vsMagic.spent.mr).toBeGreaterThan(vsMagic.spent.armor);
  });

  it("counts on-hit effects, empowered attacks and penetration in damage per second", () => {
    const plain = damagePerSecond(fighter(), fighter());
    // 100 AD x 0.625 attacks per second into 100 armor.
    expect(plain.physical).toBeCloseTo(31.25, 9);
    const lethal = damagePerSecond(fighter({ bonus: { lethality: 50 } }), fighter());
    expect(lethal.physical).toBeCloseTo((100 * 0.625 * 100) / 150, 9);
    const onHit = damagePerSecond(fighter({ attack: { onHit: [{ type: "damage", damageType: "magic", amount: { base: 40 } }] } }), fighter());
    expect(onHit.magic).toBeCloseTo(12.5, 9);
  });

  it("buys only the listed stats", () => {
    expect([...BUDGET_STATS].sort()).toEqual(Object.keys(prices).sort());
  });
});
