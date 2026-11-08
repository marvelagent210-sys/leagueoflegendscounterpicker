import { describe, expect, it } from "vitest";
import { budgetAbilityDamage, budgetUnit } from "../../engine/budget";
import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import { itemParts, withItemHaste } from "../../items/equip";
import { estimateSpec } from "../../items/estimate";
import { equipBuild, equipOptions, findItem, loadItemCatalog } from "../../pipeline/itemData";
import { castWhenReady, standStill } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const catalog = await loadItemCatalog("16.21");
const options = equipOptions(catalog);
const equip = (spec: FighterSpec, ...names: string[]) => equipBuild(spec, names, catalog).spec;
const parts = (spec: FighterSpec, ...names: string[]) => names.map(name =>
  itemParts(spec, findItem(catalog, name), options));
const spell = (key: string, slot: AbilitySpec["slot"], extra: Partial<AbilitySpec> = {}) =>
  ability({ key, slot, cooldown: 10, delivery: { kind: "self" }, ...extra });
const arena = (spec: FighterSpec) => createWorld({ fighters: [spec, fighter({ id: "enemy" })],
  distance: 1000, modes: ["idle", "idle"] });
const readyAfterCast = (spec: FighterSpec, key: string) => {
  const world = arena(spec);
  step(world, [castWhenReady(key), standStill]);
  return world.units[0].cooldownReady[key];
};

describe("qualified item haste", () => {
  const both = ["Spear of Shojin", "Experimental Hexplate"];

  it("schedules basic and ultimate casts from distinct additive item stats", () => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell("Q", "Q"), spell("R", "R")] });
    const held = equip(input, ...both);
    const stats = derive(arena(held).units[0]);
    expect(stats.abilityHaste).toBe(20);
    expect(stats.basicAbilityHaste).toBe(25);
    expect(stats.ultimateAbilityHaste).toBe(30);
    expect(readyAfterCast(held, "Q")).toBe(toTicks(10 * 100 / 145));
    expect(readyAfterCast(held, "R")).toBe(toTicks(10 * 100 / 150));
    expect(held.abilities.every(a => a.cooldownFor === undefined)).toBe(true);
    expect(input.bonus).toEqual({ abilityHaste: 20 });
  });

  it("gives a reviewed R-slot basic spell Shojin rather than ultimate item haste", () => {
    const input = fighter({ bonus: { abilityHaste: 20 },
      abilities: [spell("R", "R", { hasteType: "basic" })] });
    expect(readyAfterCast(equip(input, ...both), "R")).toBe(toTicks(10 * 100 / 145));
    expect(readyAfterCast(equip(input, "Experimental Hexplate"), "R")).toBe(toTicks(10 * 100 / 120));
  });

  it("promotes broad item haste once in both actual equipment and estimate inputs", () => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell("Q", "Q"), spell("R", "R")] });
    const inputs = parts(input, ...both);
    expect(inputs.map(p => p.haste)).toEqual([[], []]);
    expect(inputs[0]!.bonus.basicAbilityHaste).toBe(25);
    expect(inputs[1]!.bonus.ultimateAbilityHaste).toBe(30);
    const estimated = estimateSpec(input, inputs), held = equip(input, ...both);
    expect(estimated.bonus).toEqual(held.bonus);
    expect(readyAfterCast(estimated, "Q")).toBe(readyAfterCast(held, "Q"));
    expect(readyAfterCast(estimated, "R")).toBe(readyAfterCast(held, "R"));
  });

  it("uses the qualified haste in the reference damage rate without a second wrapper", () => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell("Q", "Q", {
      onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }],
    }), spell("R", "R", {
      onHit: [{ type: "damage", damageType: "true", amount: { base: 200 } }],
    })] });
    const estimated = estimateSpec(input, parts(input, ...both));
    const amount = budgetAbilityDamage(budgetUnit(estimated, 0), budgetUnit(fighter(), 1)).true;
    expect(amount).toBeCloseTo(100 / (10 * 100 / 145) + 200 / (10 * 100 / 150), 10);
  });

  it("adds Mandate's conditional haste to the eligible spell alongside generic and basic haste", () => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell("Q", "Q"), spell("E", "E", {
      onHit: [{ type: "cc", cc: "stun", duration: 1 }],
    })] });
    const held = equip(input, "Spear of Shojin", "Imperial Mandate");
    expect(derive(arena(held).units[0]).abilityHaste).toBe(35);
    expect(held.abilities.find(a => a.key === "E")!.bonusAbilityHaste).toBe(20);
    expect(held.abilities.find(a => a.key === "Q")!.bonusAbilityHaste).toBeUndefined();
    expect(readyAfterCast(held, "E")).toBe(toTicks(10 * 100 / 180));
    expect(readyAfterCast(held, "Q")).toBe(toTicks(10 * 100 / 160));
    const estimated = estimateSpec(input, parts(input, "Spear of Shojin", "Imperial Mandate"));
    expect(readyAfterCast(estimated, "E")).toBe(readyAfterCast(held, "E"));
  });

  it("applies the 500 total-haste cap after all conditional and broad bonuses", () => {
    const input = fighter({ bonus: { abilityHaste: 475 }, abilities: [spell("E", "E", {
      onHit: [{ type: "cc", cc: "stun", duration: 1 }],
    })] });
    const held = equip(input, "Spear of Shojin", "Imperial Mandate");
    expect(derive(arena(held).units[0]).abilityHaste).toBe(490);
    expect(readyAfterCast(held, "E")).toBe(toTicks(10 / 6));
  });

  it.each(["Q", "R"] as const)("shortens an independent %s charge timer without changing a static cast cooldown", slot => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell(slot, slot, {
      cooldown: 1, staticCooldown: true, charges: { max: 2, recharge: 20 },
    })] });
    const world = arena(equip(input, ...both));
    step(world, [castWhenReady(slot), standStill]);
    expect(world.units[0].cooldownReady[slot]).toBe(toTicks(1));
    const ready = toTicks(20 * 100 / (slot === "Q" ? 145 : 150));
    expect(world.units[0].charges[slot]!.nextTick).toBe(ready);
    while (world.tick <= ready) step(world, [standStill, standStill]);
    expect(world.units[0].charges[slot]!.count).toBe(2);
  });

  it("applies conditional haste to a charge recharge while its static cast cooldown stays fixed", () => {
    const input = fighter({ bonus: { abilityHaste: 20 }, abilities: [spell("E", "E", {
      cooldown: 1, staticCooldown: true, charges: { max: 2, recharge: 20 },
      onHit: [{ type: "cc", cc: "stun", duration: 1 }],
    })] });
    const world = arena(equip(input, "Spear of Shojin", "Imperial Mandate"));
    step(world, [castWhenReady("E"), standStill]);
    expect(world.units[0].cooldownReady.E).toBe(toTicks(1));
    expect(world.units[0].charges.E!.nextTick).toBe(toTicks(20 * 100 / 180));
  });

  it("leaves item actives outside ability-specific haste and preserves the source spell", () => {
    const active = spell("item:test", "other", {
      onHit: [{ type: "cc", cc: "stun", duration: 1 }],
    });
    expect(withItemHaste(active, [{ slots: [], immobilizing: true, haste: 20 }])).toBe(active);
    const original = spell("E", "E", {
      bonusAbilityHaste: 5, onHit: [{ type: "cc", cc: "stun", duration: 1 }],
    });
    const equipped = withItemHaste(original, [{ slots: [], immobilizing: true, haste: 20 }]);
    expect(equipped.bonusAbilityHaste).toBe(25);
    expect(original.bonusAbilityHaste).toBe(5);
    expect(equipped.cooldownFor).toBeUndefined();
  });
});
