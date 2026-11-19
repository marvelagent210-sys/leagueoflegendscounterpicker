import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { grantPermanentBonusHealth } from "../../engine/sim/healthGain";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import { cloneWorld } from "../../engine/sim/state";
import { mapForms } from "../../items/equip";
import { datasetDir } from "../../pipeline/config";
import { loadRuneCatalog } from "../../pipeline/runes/catalog";
import { overgrowthDeathsOption } from "../../pipeline/runes/effectOptions";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import { equipRuneEffects, validateCombatRuneSelection } from "../../runes/effects";
import { kit } from "../kits/helpers";
import { idle } from "../sim/helpers";
import { fighter } from "../sim/kits";

const multiplier = 1.035;
const owner = () => ({ ...fighter({ base: { hp: 2000, armor: 0, mr: 0 }, bonus: { hp: 400 } }), adaptiveType: "Physical" as const });
const enemy = () => fighter({ base: { hp: 12000, armor: 0, mr: 0 } });
let catalog: Awaited<ReturnType<typeof loadRuneCatalog>>;
let rules: Awaited<ReturnType<typeof loadCombatRuneRules>>;
beforeAll(async () => {
  catalog = await loadRuneCatalog(path.join(datasetDir("16.21"), "rune-sources"));
  rules = await loadCombatRuneRules("16.21", catalog);
});
const equip = (spec: FighterSpec, deaths: number, selection = [8451]) =>
  equipRuneEffects(spec, selection, catalog, rules, { overgrowthDeaths: deaths }).spec;
const arena = (self: FighterSpec, opponent = enemy(), health = 1) =>
  createWorld({ fighters: [self, opponent], distance: 0, modes: ["idle", "idle"], hp: [health, 1] });

describe("Overgrowth declared death history", () => {
  it.each([[0, 0, 1], [7, 0, 1], [8, 3, 1], [119, 42, 1], [120, 45, multiplier], [128, 48, multiplier], [800, 300, multiplier]])
  ("uses the flat and percentage breakpoints for %s prior deaths", (deaths, flat, factor) => {
    const [self] = arena(equip(owner(), deaths), enemy(), 0.5).units;
    const stats = derive(self);
    expect(stats.baseHp).toBeCloseTo(2000 * factor, 10);
    expect(stats.bonusHp).toBeCloseTo((400 + flat) * factor, 10);
    expect(self.hp).toBeCloseTo((2400 + flat) * factor / 2, 10);
  });

  it("gives source and target formulas their own boosted bonus pool without the boosted base", () => {
    const world = arena(equip(owner(), 120), equip(owner(), 8)), [self, target] = world.units;
    const formula = { base: 0, ratios: { bonusHP: 1, targetBonusHP: 2 } };
    expect(evaluate(formula, self, target)).toBeCloseTo(445 * multiplier + 2 * 403, 9);
  });

  it("scales later permanent health and current health once, without attributing a heal", () => {
    const world = arena(equip(owner(), 120)), [self, target] = world.units;
    const start = derive(self).maxHp;
    dealDamage(world, target, self, 100, "true");
    const copy = cloneWorld(world);
    const context = hookContext(copy, copy.units[0]);
    grantPermanentBonusHealth(context, 5, "test:award", "Test award");
    grantPermanentBonusHealth(context, 5, "test:award", "Test award");
    expect(copy.units[0].hp).toBeCloseTo(start - 100 + 5 * multiplier, 9);
    expect(derive(copy.units[0]).maxHp).toBeCloseTo(start + 5 * multiplier, 9);
    expect(copy.units[0].totals.healing).toBe(0);
    expect(derive(self).maxHp).toBe(start);
  });

  it("keeps the declared progress fixed and initializes once on the actual champion", () => {
    const spec = equip(owner(), 119), world = arena(spec), [self, target] = world.units;
    const starting = derive(self).maxHp;
    spec.hooks?.onStart?.(hookContext(world, self));
    dealDamage(world, self, target, 50000, "true");
    expect(derive(self).maxHp).toBe(starting);
    expect(self.healthMultiplier).toBeUndefined();
  });

  it("binds the last Resolve row and checks each side's declared history", () => {
    expect(validateCombatRuneSelection(catalog, [8451, 8473, 8401, 8437])).toEqual([8401, 8437, 8451, 8473]);
    expect(() => validateCombatRuneSelection(catalog, [8005, 8401, 8451, 8473])).toThrow(/cannot extend/);
    expect(() => equipRuneEffects(owner(), [8451], catalog, rules)).toThrow(/starting overgrowthDeaths/);
    expect(() => equipRuneEffects(owner(), [8401], catalog, rules, { overgrowthDeaths: 0 })).toThrow(/same fighter/);
  });

  it("requires an explicit safe decimal count with the same side's rune", () => {
    const flag = "--enemy-overgrowth-deaths";
    expect(overgrowthDeathsOption([flag, "0"], flag, [8451])).toBe(0);
    expect(overgrowthDeathsOption([flag, "120"], flag, [8451])).toBe(120);
    expect(overgrowthDeathsOption([], flag, [8401])).toBeUndefined();
    expect(() => overgrowthDeathsOption([flag, "119"], flag, [8401])).toThrow(/same side/);
    expect(() => overgrowthDeathsOption([flag, "120", flag, "119"], flag, [8451])).toThrow(/once/);
    for (const value of ["-1", "1.5", "NaN", "1e4", "9007199254740992"]) {
      expect(() => overgrowthDeathsOption([flag, value], flag, [8451])).toThrow(/integer/);
    }
  });
});

describe("Overgrowth and champion mechanics", () => {
  it("includes the active bonus in Malphite's setup shield", () => {
    const spec = kit("Malphite").spec;
    const [self] = arena(equip(spec, 120)).units;
    const shield = self.statuses.find(status => status.kind === "shield");
    expect(shield?.value).toBeCloseTo((spec.base.hp + 45) * multiplier * 0.1, 9);
  });

  it("converts the flat and percentage awards into Pyke AD", () => {
    const spec = { ...kit("Pyke").spec, bonus: { hp: 400 } }, bare = arena(spec);
    const world = arena(equip(spec, 120)), [self] = world.units;
    const before = derive(bare.units[0]), equipped = derive(self);
    const gained = (45 * multiplier + (spec.base.hp + 400) * (multiplier - 1)) / 14;
    expect(equipped.maxHp).toBe(before.maxHp);
    expect(equipped.bonusAd - before.bonusAd).toBeCloseTo(gained, 9);
    grantPermanentBonusHealth(hookContext(world, self), 5, "test:pyke-award", "Test award");
    expect(derive(self).maxHp).toBe(before.maxHp);
    expect(derive(self).bonusAd - equipped.bonusAd).toBeCloseTo(5 * multiplier / 14, 9);
  });

  it("scales Ornn's flat grant with Living Forge before the total percentage", () => {
    const spec = { ...kit("Ornn").spec, bonus: { hp: 400 } };
    const [self] = arena(equip(spec, 120)).units;
    expect(derive(self).bonusHp).toBeCloseTo((400 + 45) * 1.3 * multiplier, 9);
  });

  it("keeps Vladimir's conversions nonrecursive with the percentage active", () => {
    const spec = { ...kit("Vladimir").spec, bonus: { hp: 200, ap: 100 } };
    const [self] = arena(equip(spec, 120)).units;
    const { apToHealth, healthToAP } = spec.statConversions!;
    expect(derive(self).bonusHp).toBeCloseTo((245 + 100 * apToHealth!) * multiplier, 9);
    expect(derive(self).ap).toBeCloseTo(100 + 245 * multiplier * healthToAP!, 9);
  });

  it("keeps Kled's scaled own cap through dismount and remount", () => {
    const spec = mapForms(kit("Kled").spec, form => ({ ...form, base: { ...form.base, hpRegen: 0 } }));
    const world = arena(equip(spec, 120)), [self, target] = world.units;
    const bare = arena(spec);
    dealDamage(bare, bare.units[1], bare.units[0], 100000, "true");
    const own = bare.units[0].hp * multiplier;
    const total = derive(self).maxHp;
    dealDamage(world, target, self, 100000, "true");
    expect(self.spec.form).toBe("Kled");
    expect(self.hp).toBeCloseTo(own, 9);
    expect(self.statuses.find(status => status.key === "maximumHealthGainCap")?.value).toBeCloseTo(own, 9);
    for (let hit = 0; hit < 7; hit++) attackHit(world, self, target, false, []);
    for (let tick = 0; tick < 10; tick++) step(world, [idle, idle]);
    expect(self.spec.form).toBe("Kled & Skaarl");
    expect(self.hp).toBeCloseTo(own + 0.7 * (total - own), 8);
  });

  it("lets Shield Bash read the scaled bonus without the base health increase", () => {
    const world = arena(equip(owner(), 120, [8401, 8451])), [self, target] = world.units;
    applyEffect(world, self, self, { type: "shield", amount: { base: 100 }, duration: 3 }, { scale: 1 });
    attackHit(world, self, target, false, []);
    const expected = derive(self).ad + 560 / 17 + 0.025 * 445 * multiplier + 0.15 * 100;
    expect(derive(target).maxHp - target.hp).toBeCloseTo(expected, 9);
  });
});
