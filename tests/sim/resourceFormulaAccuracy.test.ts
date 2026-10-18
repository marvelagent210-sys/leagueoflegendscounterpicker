import { describe, expect, it } from "vitest";
import { derive, evaluate } from "../../engine/sim/derived";
import { baseFighter } from "../../engine/sim/fromChampion";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, StatRef } from "../../engine/sim/spec";
import { cloneWorld } from "../../engine/sim/state";
import { championData, context } from "../kits/helpers";
import { fighter } from "./kits";

const manaFighter = (maximum: number): FighterSpec => ({
  ...fighter({ base: { resource: maximum } }),
  resourceType: "Mana",
});

function manaWorld(maximum = 1000, targetMaximum = 600) {
  return createWorld({ fighters: [manaFighter(maximum), manaFighter(targetMaximum)], distance: 0, modes: ["idle", "idle"] });
}

const read = (ref: StatRef, world: ReturnType<typeof manaWorld>) => evaluate({ base: 0, ratios: { [ref]: 1 } }, world.units[0], world.units[1]);

describe("mana formulas read the pinned ability records", () => {
  it("reads every Riftwalk damage ratio at maximum rank without treating mana as health", () => {
    const r = context("Kassadin").ability("Riftwalk");
    expect(r.formula("Magic Damage")).toEqual({ base: 110, ratios: { AP: 0.5, maxMana: 0.02 } });
    expect(r.formula("Bonus Damage Per Stack")).toEqual({ base: 55, ratios: { AP: 0.07, maxMana: 0.01 } });
    expect(r.formula("Maximum Bonus Damage")).toEqual({ base: 220, ratios: { AP: 0.28, maxMana: 0.04 } });
    expect(r.formula("Maximum Magic Damage")).toEqual({ base: 330, ratios: { AP: 0.78, maxMana: 0.06 } });
  });

  it("reads Nether Blade's separate normal and champion missing-mana restorations", () => {
    const w = context("Kassadin").ability("Nether Blade");
    expect(w.formula("Mana Restored")).toEqual({ base: 0, ratios: { missingMana: 0.06 } });
    expect(w.formula("Mana Restored Against Champions")).toEqual({ base: 0, ratios: { missingMana: 0.3 } });
    const world = manaWorld();
    world.units[0].resource = 250;
    world.units[0].hp = 10;
    expect(evaluate(w.formula("Mana Restored"), world.units[0])).toBe(45);
    expect(evaluate(w.formula("Mana Restored Against Champions"), world.units[0])).toBe(225);
  });

  it("preserves the actual champion resource kind when constructing a fighter", () => {
    expect(baseFighter(championData("Kassadin")).resourceType).toBe("Mana");
    expect(baseFighter(championData("Akali")).resourceType).toBe("Energy");
    const world = createWorld({ fighters: [baseFighter(championData("Kassadin")), baseFighter(championData("Akali"))], distance: 0, modes: ["idle", "idle"] });
    expect(read("maxMana", world)).toBe(derive(world.units[0]).maxResource);
    expect(read("targetMaxMana", world)).toBe(0);
  });
});

describe("live mana formula evaluation", () => {
  it("keeps caster and target maximum, current and missing mana independent", () => {
    const world = manaWorld();
    world.units[0].resource = 350;
    world.units[1].resource = 125;
    world.units[0].hp = 12;
    world.units[1].hp = 23;
    expect([read("maxMana", world), read("currentMana", world), read("missingMana", world)]).toEqual([1000, 350, 650]);
    expect([read("targetMaxMana", world), read("targetCurrentMana", world), read("targetMissingMana", world)]).toEqual([600, 125, 475]);
  });

  it("includes maximum-resource buffs dynamically and leaves current mana unchanged", () => {
    const world = manaWorld();
    const self = world.units[0];
    self.resource = 350;
    self.statuses.push({ kind: "stat", key: "maxResource", source: 0, startTick: 0, endTick: 100, value: 200 });
    expect(evaluate(context("Kassadin").ability("Riftwalk").formula("Magic Damage"), self)).toBe(134);
    expect([read("maxMana", world), read("currentMana", world), read("missingMana", world)]).toEqual([1200, 350, 850]);
    self.statuses.length = 0;
    expect([read("maxMana", world), read("currentMana", world), read("missingMana", world)]).toEqual([1000, 350, 650]);
    expect(self.resource).toBe(350);
  });

  it("supports mana terms multiplied by another stat", () => {
    const world = manaWorld();
    world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100 } };
    world.units[1].resource = 100;
    expect(evaluate({ base: 7, ratios: { currentMana: 0.02 }, products: [{ ratio: 0.001, stats: ["AP", "targetMissingMana"] }] }, world.units[0], world.units[1])).toBe(77);
  });

  it.each(["Energy", "Fury", "Rage", "None", undefined])("returns zero for all mana references on a %s resource", (resourceType) => {
    const spec: FighterSpec = { ...fighter({ base: { resource: 1000 } }), ...(resourceType === undefined ? {} : { resourceType }) };
    const world = createWorld({ fighters: [spec, spec], distance: 0, modes: ["idle", "idle"] });
    world.units[0].resource = 400;
    world.units[1].resource = 300;
    world.units[0].statuses.push({ kind: "stat", key: "maxResource", source: 0, startTick: 0, endTick: 100, value: 200 });
    const refs: StatRef[] = ["maxMana", "currentMana", "missingMana", "targetMaxMana", "targetCurrentMana", "targetMissingMana"];
    expect(refs.map((ref) => read(ref, world))).toEqual([0, 0, 0, 0, 0, 0]);
    expect(derive(world.units[0]).maxResource).toBe(1200);
  });

  it.each([
    { resource: -50, expectedCurrent: 0, expectedMissing: 1000 },
    { resource: 1250, expectedCurrent: 1000, expectedMissing: 0 },
  ])("clamps a $resource current pool without changing runtime state", ({ resource, expectedCurrent, expectedMissing }) => {
    const world = manaWorld();
    world.units[0].resource = resource;
    world.units[1].resource = resource;
    expect(read("currentMana", world)).toBe(expectedCurrent);
    expect(read("missingMana", world)).toBe(expectedMissing);
    expect(read("targetCurrentMana", world)).toBe(Math.min(600, expectedCurrent));
    expect(read("targetMissingMana", world)).toBe(resource < 0 ? 600 : 0);
    expect(world.units.map((unit) => unit.resource)).toEqual([resource, resource]);
  });

  it("clamps negative maximum mana and returns zero for an absent target", () => {
    const world = manaWorld(-100);
    const self = world.units[0];
    expect([read("maxMana", world), read("currentMana", world), read("missingMana", world)]).toEqual([0, 0, 0]);
    for (const ref of ["targetMaxMana", "targetCurrentMana", "targetMissingMana"] as const) {
      expect(evaluate({ base: 0, ratios: { [ref]: 1 } }, self)).toBe(0);
    }
    expect(self.resource).toBe(-100);
  });

  it("reads each probability branch's current pool and buffs without mutating its sibling", () => {
    const original = manaWorld();
    original.units[0].resource = 400;
    original.units[0].statuses.push({ kind: "stat", key: "maxResource", source: 0, startTick: 0, endTick: 100, value: 200 });
    const branch = cloneWorld(original);
    branch.units[0].resource = 100;
    branch.units[0].statuses[0]!.value = 500;
    branch.units[1].resource = 50;
    const formula = context("Kassadin").ability("Nether Blade").formula("Mana Restored Against Champions");
    expect(evaluate(formula, original.units[0])).toBe(240);
    expect(evaluate(formula, branch.units[0])).toBe(420);
    expect(read("targetMissingMana", original)).toBe(0);
    expect(read("targetMissingMana", branch)).toBe(550);
    expect(original.units[0].resource).toBe(400);
    expect(original.units[0].statuses[0]?.value).toBe(200);
  });
});
