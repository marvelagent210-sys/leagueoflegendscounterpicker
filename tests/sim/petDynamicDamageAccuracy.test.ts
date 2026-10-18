import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import { derive } from "../../engine/sim/derived";
import { areaOnPets, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect, PetSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle } from "./helpers";
import { fighter } from "./kits";

function setup(): World {
  return createWorld({ fighters: [fighter({ bonus: { ap: 100 } }), fighter({ base: { hp: 10000, armor: 300, mr: 300 } })], distance: 300, modes: ["idle", "idle"] });
}

function pet(world: World, options: Partial<PetSpec> = {}, x = 100, owner: 0 | 1 = 1) {
  return spawnPet(world, world.units[owner], { kind: "test", name: "Test pet", hp: 200, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: Infinity, ...options }, x);
}

describe("area damage uses actual pet targets and dynamic damage callbacks", () => {
  it("honors amountFor instead of its budget template, using the pet's real health and memory", () => {
    const world = setup();
    const victim = pet(world);
    victim.hp = 150;
    victim.memory.bonus = 5;
    areaOnPets(world, world.units[0], 0, 200, [{ type: "damage", damageType: "true", amount: { base: 9999 }, amountFor: (caster, target) => derive(caster).ap * 0.1 + (derive(target).maxHp - target.hp) * 0.5 + Number(target.memory.bonus) }]);
    expect(victim.hp).toBe(110);
    expect(victim.memory.bonus).toBe(5);
  });

  it("reads updated missing health for successive dynamic packets", () => {
    const world = setup();
    const victim = pet(world);
    const effects: Effect[] = [
      { type: "damage", damageType: "true", amount: { base: 50 } },
      { type: "damage", damageType: "true", amount: { base: 0 }, amountFor: (_, target) => (derive(target).maxHp - target.hp) * 0.5 },
      { type: "damage", damageType: "true", amount: { base: 0, ratios: { targetMissingHP: 0.5 } } },
    ];
    areaOnPets(world, world.units[0], 0, 200, effects);
    // 200 -> 150 -> 125 -> 87.5; neither packet reads the opposing champion's health.
    expect(victim.hp).toBe(87.5);
  });

  it("evaluates target-dependent minimums before each pet's area modifier and resistances", () => {
    const world = setup();
    const hits: Array<{ raw: number; dealt: number }> = [];
    const victim = pet(world, { armor: 100, areaTaken: 0.4, onDamaged: ({ raw, dealt }) => hits.push({ raw, dealt }) });
    victim.hp = 150;
    areaOnPets(world, world.units[0], 0, 200, [{ type: "damage", damageType: "physical", amount: { base: 9999 }, amountFor: () => 20, minimum: { base: 0, ratios: { targetCurrentHP: 0.5 } } }]);
    expect(hits).toEqual([{ raw: 30, dealt: 15 }]);
    expect(victim.hp).toBe(135);
  });

  it("evaluates ordinary target-stat formulas separately for each actual pet", () => {
    const world = setup();
    const first = pet(world, { hp: 200, mr: 50 }, 75);
    const second = pet(world, { hp: 100 }, 125);
    first.hp = 150;
    areaOnPets(world, world.units[0], 0, 200, [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { targetMissingHP: 0.5, targetMR: 0.5, targetBonusHP: 0.5 } }, minimum: { base: 0, ratios: { targetMaxHP: 0.4 } } }]);
    expect(first.hp).toBe(70);
    expect(second.hp).toBe(60);
  });

  it("retains exclusions for allied pets, untargetable pets, hit-count props and pets outside the area", () => {
    const world = setup();
    const own = pet(world, {}, 100, 0);
    const untargetable = pet(world, { untargetable: true });
    const hitCount = pet(world, { hitPoints: true });
    const outside = pet(world, {}, 400);
    let callbacks = 0;
    areaOnPets(world, world.units[0], 0, 200, [{ type: "damage", damageType: "true", amount: { base: 0 }, amountFor: () => { callbacks++; return 500; } }]);
    expect(callbacks).toBe(0);
    expect([own.hp, untargetable.hp, hitCount.hp, outside.hp]).toEqual([200, 200, 200, 200]);
  });

  it("preserves pet damage/death hooks and stops later packets after destruction", () => {
    let deaths = 0;
    let callbacks = 0;
    const reports: Array<{ raw: number; dealt: number; before: number; ability?: string }> = [];
    const world = setup();
    world.units[1].spec = { ...world.units[1].spec, hooks: { onPetDeath: () => { deaths++; } } };
    const victim = pet(world, { onDamaged: ({ raw, dealt, before, ability }) => reports.push({ raw, dealt, before, ability }) });
    const packet: Effect = { type: "damage", damageType: "true", amount: { base: 0 }, amountFor: () => { callbacks++; return 500; }, label: "Dynamic blast" };
    areaOnPets(world, world.units[0], 0, 200, [packet, packet]);
    expect(world.pets).not.toContain(victim);
    expect(callbacks).toBe(1);
    expect(deaths).toBe(1);
    expect(reports).toEqual([{ raw: 500, dealt: 500, before: 200, ability: "Dynamic blast" }]);
  });

  it.each([0, 4])("Kassadin's actual %s-stack Riftwalk deals its declared tier to both a champion and a zero-MR pet", (stacks) => {
    const compiled = kit("Kassadin").spec;
    const kassadin = { ...compiled, bonus: { ap: 100 }, base: { ...compiled.base, hpRegen: 0, resourceRegen: 0 } };
    const target = fighter({ base: { hp: 10000, armor: 0, mr: 0, moveSpeed: 0 } });
    const world = createWorld({ fighters: [kassadin, target], distance: 100, modes: ["idle", "idle"] });
    world.units[0].x = 0;
    world.units[1].x = 100;
    const caster = world.units[0];
    caster.memory.riftStacks = stacks;
    caster.memory.riftUntil = 450;
    const victim = pet(world, { hp: 10000 });
    const r = caster.spec.abilities.find((spell) => spell.key === "R")!;
    expect(derive(caster).maxResource).toBeCloseTo(2110.855, 10);
    const expected = stacks === 0 ? 110 + 0.5 * 100 + 0.02 * 2110.855 : 330 + 0.78 * 100 + 0.06 * 2110.855;
    startCast(world, caster, r, { direction: 1, distance: 0 });
    while (world.tick <= 8) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(expected, 9);
    expect(10000 - victim.hp).toBeCloseTo(expected, 9);
    expect(caster.resource).toBeCloseTo(2110.855 - (stacks === 0 ? 40 : 640), 9);
  });
});
