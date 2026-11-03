import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { allocate, allocateBoth, damagePerSecond, effectiveHealth, type StatPrices } from "../engine/budget";
import type { Effect, FighterSpec } from "../engine/sim/spec";
import { createWorld } from "../engine/sim/simulate";
import { derive } from "../engine/sim/derived";
import { kit } from "./kits/helpers";
import { ability, fighter } from "./sim/kits";

const prices = (JSON.parse(readFileSync(new URL("../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
const totalSpent = (spent: Record<string, number>) => Object.values(spent).reduce((sum, cost) => sum + cost, 0);
const damage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

describe("channel shots valued through their parent cycle", () => {
  it("excludes a finite manual recast from independent DPS while retaining its explicit parent hint", () => {
    const shot = ability({ key: "R4", cooldown: 1, castTime: 0.25, delivery: { kind: "self" },
      budgetExcluded: true, onHit: [damage(1000)] });
    const spec = { ...fighter({ abilities: [shot] }), budget: { attacks: false, damage: () => ({ true: 4000 / 100 }) } };
    expect(damagePerSecond(spec, fighter()).true).toBe(40);
    expect(damagePerSecond({ ...spec, budget: { attacks: false } }, fighter()).true).toBe(0);
    expect(damagePerSecond({ ...spec, abilities: [{ ...shot, budgetExcluded: false }], budget: { attacks: false } }, fighter()).true).toBe(800);
  });

  it("excludes marked recasts from chained damage and duplicated reference sustain", () => {
    const root = ability({ key: "R", cooldown: 10, delivery: { kind: "self" }, onHit: [damage(100)] });
    const shot = ability({ key: "R2", cooldown: 1, delivery: { kind: "self" }, budgetExcluded: true,
      chain: { root: "R", index: 2, window: 10 }, onHit: [damage(1000)],
      onSelf: [{ type: "heal", amount: { base: 1000 } }] });
    const spec = { ...fighter({ abilities: [root, shot] }), budget: { attacks: false } };
    const without = { ...spec, abilities: [root] };
    expect(damagePerSecond(spec, fighter()).true).toBe(10);
    expect(effectiveHealth(spec, fighter())).toBe(effectiveHealth(without, fighter()));
  });
});

describe("feasible stat allocations", () => {
  it.each([0.25, 49, 51, 6013])("spends the full %s gold, including its final fraction", (gold) => {
    const result = allocate(fighter(), fighter(), gold, prices);
    expect(totalSpent(result.spent)).toBeCloseTo(gold, 8);
    const [a, b] = allocateBoth(fighter(), fighter(), gold, prices);
    expect(totalSpent(a.spent)).toBeCloseTo(gold, 8);
    expect(totalSpent(b.spent)).toBeCloseTo(gold, 8);
  });

  it("finishes a capped stat with a partial purchase and spends the rest elsewhere", () => {
    // A cheap critical chance reaches 100% after exactly 300 gold, between 50-gold steps.
    const expensive = Object.fromEntries(Object.keys(prices).map((key) => [key, 10000])) as StatPrices;
    const result = allocate(fighter(), fighter(), 351, { ...expensive, crit: 3 });
    expect(result.bonus.critChance).toBeCloseTo(1, 12);
    expect(result.spent.crit).toBeCloseTo(300, 8);
    expect(totalSpent(result.spent)).toBeCloseTo(351, 8);
    expect(result.spent.ad + result.spent.as + result.spent.hp + result.spent.armor).toBeGreaterThan(0);
  });

  it("does not buy critical chance past a kit's effective cap", () => {
    const doubleCrit: FighterSpec = { ...fighter(), budget: { statMultipliers: { crit: 2 } } };
    const expensive = Object.fromEntries(Object.keys(prices).map((key) => [key, 10000])) as StatPrices;
    const result = allocate(doubleCrit, fighter(), 200, { ...expensive, crit: 3 });
    expect(result.bonus.critChance).toBeCloseTo(0.5, 12);
    expect(result.spent.crit).toBeCloseTo(150, 8);
    expect(totalSpent(result.spent)).toBeCloseTo(200, 8);
  });

  it("does not credit health with survival against purely maximum-health true damage", () => {
    const enemy: FighterSpec = {
      ...fighter({ abilities: [ability({ key: "Q", cooldown: 1, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { targetMaxHP: 0.1 } } }] })] }),
      budget: { attacks: false },
    };
    const result = allocate(fighter(), enemy, 6000, prices);
    expect(result.spent.hp).toBe(0);
    expect(result.spent.armor).toBe(0);
    expect(result.spent.mr).toBe(0);
    expect(totalSpent(result.spent)).toBeCloseTo(6000, 8);
  });

  it("has the same builds when the players are swapped", () => {
    const a = fighter();
    const b = fighter({ abilities: [ability({ key: "Q", cooldown: 3, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100, ratios: { AP: 1 } } }] })] });
    const forward = allocateBoth(a, b, 6013, prices);
    const reverse = allocateBoth(b, a, 6013, prices);
    expect(forward).toEqual([reverse[1], reverse[0]]);
  });

  it("rejects inputs that would produce negative stats, NaN or a nonterminating allocation", () => {
    for (const gold of [-1, NaN, Infinity]) expect(() => allocate(fighter(), fighter(), gold, prices)).toThrow(RangeError);
    for (const step of [0, -1, NaN, Infinity]) expect(() => allocate(fighter(), fighter(), 100, prices, step)).toThrow(RangeError);
    for (const price of [0, -1, NaN, Infinity]) expect(() => allocate(fighter(), fighter(), 100, { ...prices, ad: price })).toThrow(RangeError);
    for (const rounds of [0, -1, 1.5, Infinity]) expect(() => allocateBoth(fighter(), fighter(), 100, prices, rounds)).toThrow(RangeError);
  });
});

describe("the budget's combat reference", () => {
  it("includes innate penetration, resistances and stack health before evaluating ratios", () => {
    const penetration: FighterSpec = { ...fighter(), start: [{ type: "stat", stat: "armorPen", amount: { base: 0.5 }, duration: Infinity }] };
    expect(damagePerSecond(penetration, fighter()).physical).toBeCloseTo(100 * 0.625 / 1.5, 10);
    const armored: FighterSpec = { ...fighter(), start: [{ type: "stat", stat: "armor", amount: { base: 100 }, duration: Infinity }] };
    expect(damagePerSecond(fighter(), armored).physical).toBeCloseTo(100 * 0.625 / 3, 10);
    expect(effectiveHealth(armored, fighter())).toBeCloseTo(6000, 10);
    const stacked: FighterSpec = { ...fighter(), start: [{ type: "stat", stat: "health", amount: { base: 1000 }, duration: Infinity }] };
    const percentHealth = fighter({ abilities: [ability({ key: "Q", cooldown: 10, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { targetCurrentHP: 0.1 } } }] })] });
    expect(damagePerSecond(percentHealth, stacked).true).toBeCloseTo(30, 10);
  });

  it("applies total resistance passives to base and bonus while preserving bonus-only multipliers", () => {
    const total: FighterSpec = { ...fighter({ bonus: { armor: 50, mr: 50 } }), budget: { totalResistanceMultipliers: { armor: 1.2, mr: 1.2 }, statMultipliers: { armor: 1.2, mr: 1.2 } } };
    // (100 base + 50 bought) * 1.2 = 180 armor, once.
    expect(effectiveHealth(total, fighter())).toBeCloseTo(2000 * 2.8, 10);
    const innate: FighterSpec = { ...total, start: [{ type: "stat", stat: "armorPercent", amount: { base: 0.2 }, duration: Infinity }] };
    expect(effectiveHealth(innate, fighter())).toBeCloseTo(2000 * 2.8, 10);
    const bonusOnly: FighterSpec = { ...fighter({ bonus: { armor: 50 } }), budget: { statMultipliers: { armor: 1.3 } } };
    // Ornn's bonus-only multiplier must leave the 100 base armor unchanged.
    expect(effectiveHealth(bonusOnly, fighter())).toBeCloseTo(2000 * 2.65, 10);
    const innateArmor: FighterSpec = { ...total, start: [{ type: "stat", stat: "armor", amount: { base: 20 }, duration: Infinity }] };
    expect(effectiveHealth(innateArmor, fighter())).toBeCloseTo(2000 * (1 + 170 * 1.2 / 100), 10);
  });

  it("accounts for a mixed basic attack in both damage and defensive allocations", () => {
    const mixed: FighterSpec = { ...fighter(), budget: { attackSplit: { physical: 0.75, magic: 0.25 } } };
    const damage = damagePerSecond(mixed, fighter({ base: { armor: 0, mr: 0 } }));
    expect(damage.physical).toBeCloseTo(100 * 0.625 * 0.75, 10);
    expect(damage.magic).toBeCloseTo(100 * 0.625 * 0.25, 10);
    const defender = fighter({ base: { armor: 1000, mr: 0 } });
    const result = allocate(defender, mixed, 6000, prices);
    expect(result.spent.mr).toBeGreaterThan(0);
    expect(result.spent.mr).toBeGreaterThan(result.spent.armor);
    expect(allocate(defender, fighter(), 6000, prices).spent.mr).toBe(0);
  });

  it("uses post-mitigation damage for Gwen's healing reference", () => {
    const gwen = kit("Gwen").spec;
    const healing = gwen.budget!.healing!;
    const against = (mr: number) => {
      const world = createWorld({ fighters: [gwen, fighter({ base: { hp: 3000, mr } })], distance: 0, modes: ["idle", "idle"] });
      return healing(world.units[0], world.units[1]);
    };
    // At zero AP the 1%-HP Cuts and its heal stay below the per-instance healing cap.
    // 300 MR quarters post-mitigation damage and therefore quarters the healing, too.
    expect(against(300)).toBeCloseTo(against(0) / 4, 10);
  });

  it("uses ability and on-hit critical multipliers and damage floors", () => {
    const self: FighterSpec = {
      ...fighter({ bonus: { critChance: 0.5 }, abilities: [ability({ key: "Q", cooldown: 2, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 10 }, minimum: { base: 100 }, canCrit: true, critMultiplier: 1.3 }] })] }),
      budget: { attacks: false },
    };
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100 * 1.15 / 2, 10);
    const onHit = fighter({ bonus: { critChance: 0.5 }, attack: { onHit: [{ type: "damage", damageType: "true", amount: { base: 40 }, canCrit: true }] } });
    expect(damagePerSecond(onHit, fighter()).true).toBeCloseTo(40 * 1.5 * 0.625, 10);
  });

  it("reevaluates state-dependent damage for candidate units instead of its reference formula", () => {
    const blast = ability({ key: "Q", cooldown: 2, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 9999 }, amountFor: (caster, target) => derive(caster).ap * 2 + target.hp * 0.1 }] });
    const self = fighter({ abilities: [blast] });
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100, 10);
    expect(damagePerSecond({ ...self, bonus: { ap: 50 } }, fighter({ bonus: { hp: 600 } })).true).toBeCloseTo(180, 10);
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100, 10);
    const minimum = ability({ key: "Q", cooldown: 2, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 9999 }, amountFor: () => 0, minimum: { base: 100 }, canCrit: true }] });
    expect(damagePerSecond(fighter({ abilities: [minimum], bonus: { critChance: 0.5 } }), fighter()).true).toBeCloseTo(75, 10);
  });

  it("values stat-scaled channel pulse counts at the same integer count as combat", () => {
    const spin = ability({ key: "E", cooldown: 10, delivery: { kind: "self" }, channel: { duration: 3, interval: 3 / 7, pulses: { base: 7, ratios: { bonusAttackSpeed: 4 } }, onTick: [damage(100)], interruptible: false, mobile: true } });
    expect(damagePerSecond(fighter({ abilities: [spin], bonus: { attackSpeed: 0.49 } }), fighter()).true).toBeCloseTo(80, 10);
    expect(damagePerSecond(fighter({ abilities: [spin], bonus: { attackSpeed: 0.5 } }), fighter()).true).toBeCloseTo(90, 10);
  });

  it("reevaluates dynamic cast times for every candidate build and rounds them to server ticks", () => {
    const blast = ability({ key: "Q", cooldown: 2, castTime: 5, castTimeFor: (unit) => 0.5 / (1 + derive(unit).bonusAttackSpeed), delivery: { kind: "target", range: 500 }, onHit: [damage(100)] });
    const self = fighter({ abilities: [blast] });
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100 / 2.5, 10);
    // 0.25 seconds occupies eight server ticks; the shared ability cache must recompute it.
    expect(damagePerSecond({ ...self, bonus: { attackSpeed: 1 } }, fighter()).true).toBeCloseTo(100 / (2 + 8 / 30), 10);
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100 / 2.5, 10);
  });

  it("uses dynamic cast completion time for sustain cycles and the initial cast window", () => {
    const shield = ability({ key: "W", cooldown: 4, castTime: 100, castTimeFor: (unit) => 1 / (1 + derive(unit).ap / 100), delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 100 }, duration: 3 }] });
    const self = fighter({ abilities: [shield] });
    // A one-second cast completes at seconds 1 and 6 in the ten-second reference.
    expect(effectiveHealth(self, fighter())).toBeCloseTo((2000 + 200) * 2, 10);
    // A half-second cast completes at seconds 0.5, 5 and 9.5.
    expect(effectiveHealth({ ...self, bonus: { ap: 100 } }, fighter())).toBeCloseTo((2000 + 300) * 2, 10);
  });

  it("does not haste static dynamic cooldowns, while ordinary cooldowns still receive haste", () => {
    const blast = ability({ key: "Q", cooldown: 100, cooldownFor: (unit) => 8 / (1 + derive(unit).bonusAttackSpeed), staticCooldown: true, delivery: { kind: "target", range: 500 }, onHit: [damage(100)] });
    const self = fighter({ abilities: [blast] });
    expect(damagePerSecond(self, fighter()).true).toBeCloseTo(100 / 8, 10);
    expect(damagePerSecond({ ...self, bonus: { abilityHaste: 100 } }, fighter()).true).toBeCloseTo(100 / 8, 10);
    expect(damagePerSecond({ ...self, bonus: { abilityHaste: 100, attackSpeed: 1 } }, fighter()).true).toBeCloseTo(100 / 4, 10);
    const ordinary = fighter({ abilities: [{ ...blast, staticCooldown: false }], bonus: { abilityHaste: 100, attackSpeed: 1 } });
    expect(damagePerSecond(ordinary, fighter()).true).toBeCloseTo(100 / 2, 10);
  });

  it("keeps static sustain cooldowns fixed while charge recharge remains independently haste-scaled", () => {
    const shield = ability({ key: "W", cooldown: 6, staticCooldown: true, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 100 }, duration: 3 }] });
    expect(effectiveHealth(fighter({ abilities: [shield], bonus: { abilityHaste: 100 } }), fighter())).toBeCloseTo((2000 + 200) * 2, 10);
    expect(effectiveHealth(fighter({ abilities: [{ ...shield, staticCooldown: false }], bonus: { abilityHaste: 100 } }), fighter())).toBeCloseTo((2000 + 400) * 2, 10);
    const charged = ability({ key: "Q", cooldown: 1, staticCooldown: true, charges: { max: 2, recharge: 6 }, delivery: { kind: "target", range: 500 }, onHit: [damage(100)] });
    expect(damagePerSecond(fighter({ abilities: [charged], bonus: { abilityHaste: 100 } }), fighter()).true).toBeCloseTo(100 / 3, 10);
  });

  it("limits timed attack empowerments by attacks possible during their window", () => {
    const empowered = ability({ key: "W", cooldown: 10, delivery: { kind: "self" }, onSelf: [{ type: "empower", attacks: 99, window: 5, onHit: [damage(100)] }] });
    // The 99-attack sentinel means every attack for 5 seconds; it is not 99 damage hits.
    expect(damagePerSecond(fighter({ abilities: [empowered] }), fighter()).true).toBeCloseTo(100 * 5 * 0.625 / 10, 10);
    expect(damagePerSecond(fighter({ abilities: [empowered], bonus: { attackSpeed: 1 } }), fighter()).true).toBeCloseTo(100 * 5 * 1.25 / 10, 10);
    const limited = { ...empowered, onSelf: [{ type: "empower" as const, attacks: 2, window: 5, onHit: [damage(100)] }] };
    expect(damagePerSecond(fighter({ abilities: [limited], bonus: { attackSpeed: 1 } }), fighter()).true).toBeCloseTo(20, 10);
  });

  it("chooses shared-cooldown alternatives by damage per second into the target", () => {
    const rapid = ability({ key: "Q", cooldown: 2, delivery: { kind: "target", range: 500 }, onHit: [damage(100)] });
    const slow = ability({ key: "Q2", cooldownKey: "Q", cooldown: 20, delivery: { kind: "target", range: 500 }, onHit: [damage(500)] });
    expect(damagePerSecond(fighter({ abilities: [rapid, slow] }), fighter()).true).toBeCloseTo(50, 10);
    const physical = ability({ key: "Q", delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 200 } }] });
    const magic = ability({ key: "Q2", cooldownKey: "Q", delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] });
    expect(damagePerSecond(fighter({ abilities: [physical, magic] }), fighter({ base: { armor: 1000, mr: 0 } })).magic).toBeCloseTo(10, 10);
  });

  it("counts the first sustain cast and does not add mutually exclusive shield variants", () => {
    const shield = ability({ key: "W", cooldown: 6, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 100 }, duration: 3 }] });
    const alternative = ability({ key: "W2", cooldownKey: "W", cooldown: 6, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 50 }, duration: 3 }] });
    // Two 100-point shields within 10 seconds, through 100 armor.
    expect(effectiveHealth(fighter({ abilities: [shield, alternative] }), fighter())).toBeCloseTo((2000 + 200) * 2, 10);
  });

  it("does not count a magic-only shield against purely physical damage", () => {
    const shield = ability({ key: "W", cooldown: 6, delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: 1000 }, duration: 3, shieldType: "magic" }] });
    expect(effectiveHealth(fighter({ abilities: [shield] }), fighter())).toBeCloseTo(4000, 10);
  });
});
