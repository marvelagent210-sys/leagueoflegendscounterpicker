import { describe, expect, it } from "vitest";
import { applyEffect, beginDeathDefied, beginResurrection, dealDamage, hookContext } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import type { CombatRuneRules } from "../../runes/effectRules";
import { SECOND_WIND_ASSUMPTIONS, secondWindHooks } from "../../runes/secondWind";
import { idle, lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";

const rules: CombatRuneRules = {
  schema: 1, dataset: "16.21", patch: "26.21",
  coupDeGrace: { healthThreshold: 0.4, damageIncrease: 0.08 },
  cutDown: { healthThreshold: 0.6, damageIncrease: 0.08 },
  lastStand: { healthThreshold: 0.6, maximumHealthThreshold: 0.3, minimumDamageIncrease: 0.05, maximumDamageIncrease: 0.11 },
  secondWind: { duration: 10, missingHealthPerSecond: 0.004, tickInterval: 0.5, missingHealthModel: "current-at-regeneration-tick" },
  absorbLife: { heal: 27 },
  triumph: { maximumHealthRatio: 0.025, missingHealthRatio: 0.05, delay: 1, bonusGold: 20, missingHealthModel: "at-native-kill-credit" },
  legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85 },
  legendAlacrity: { baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  legendHaste: { baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100 },
  evidence: [{ title: "Synthetic Second Wind fixture", revid: 1, text: "Numeric rules isolate runtime regeneration behavior." }],
};
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 1000, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };
const equipped = () => fighter({ hooks: secondWindHooks(rules) });
function arena(spec = equipped()): World {
  return createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true } });
}
function hurt(world: World, amount = 1000): void {
  dealDamage(world, world.units[1], world.units[0], amount, "true", { ability: "Fixture damage" });
}
function through(world: World, tick: number): void {
  while (world.tick <= tick && !world.result) step(world, [idle, idle]);
}

describe("Second Wind regeneration timing", () => {
  it("begins after half a second and samples current missing health each half-second", () => {
    const world = arena(); hurt(world);
    through(world, 14);
    expect(world.units[0].hp).toBe(1000);
    through(world, 15);
    expect(world.units[0].hp).toBe(1002);
    through(world, 30);
    expect(world.units[0].hp).toBeCloseTo(1002 + 998 * 0.002, 10);
  });

  it("includes all twenty pulses through ten seconds, then expires", () => {
    const world = arena(); hurt(world);
    through(world, 299);
    expect(world.units[0].hp).toBeCloseTo(2000 - 1000 * 0.998 ** 19, 10);
    through(world, 300);
    const final = world.units[0].hp;
    expect(final).toBeCloseTo(2000 - 1000 * 0.998 ** 20, 10);
    through(world, 330);
    expect(world.units[0].hp).toBe(final);
  });

  it("refreshes duration without delaying the existing clock", () => {
    const world = arena(); hurt(world);
    through(world, 9); hurt(world, 100); // The second hit is on tick 10.
    through(world, 14);
    expect(world.units[0].hp).toBe(900);
    through(world, 15);
    expect(world.units[0].hp).toBeCloseTo(902.2, 10);
    through(world, 300);
    const lastPulse = world.units[0].hp;
    through(world, 315); // Refresh ended at 310; it cannot add a pulse at 315.
    expect(world.units[0].hp).toBe(lastPulse);
  });

  it("starts a new half-second clock after the prior buff expires", () => {
    const world = arena(); hurt(world); through(world, 330);
    hurt(world, 100);
    const hp = world.units[0].hp;
    through(world, 345);
    expect(world.units[0].hp).toBe(hp);
    through(world, 346); // The new hit occurred at tick 331.
    expect(world.units[0].hp).toBeGreaterThan(hp);
  });

  it("does not duplicate a pulse when the same tick is dispatched twice", () => {
    const world = arena(); hurt(world); world.tick = 15;
    const ctx = hookContext(world, world.units[0]);
    world.units[0].spec.hooks!.onTick!(ctx);
    const hp = world.units[0].hp;
    world.units[0].spec.hooks!.onTick!(ctx);
    expect(world.units[0].hp).toBe(hp);
  });
});

describe("Second Wind damage eligibility", () => {
  it.each(["zero", "shield", "invulnerability"] as const)("does not trigger from %s damage", (kind) => {
    const world = arena(); world.units[0].hp = 1000;
    if (kind === "shield") applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: 1000 }, duration: 10 }, { scale: 1 });
    if (kind === "invulnerability") world.units[0].statuses.push(lasting("state", "invulnerable"));
    hurt(world, kind === "zero" ? 0 : 100);
    through(world, 60);
    expect(world.units[0].hp).toBe(1000);
  });

  it("triggers only from the health damage remaining after a partial shield", () => {
    const world = arena(); world.units[0].hp = 1000;
    applyEffect(world, world.units[0], world.units[0], { type: "shield", amount: { base: 50 }, duration: 10 }, { scale: 1 });
    hurt(world, 100); through(world, 15);
    expect(world.units[0].hp).toBeCloseTo(950 + 1050 * 0.002, 10);
  });

  it("does not trigger or refresh from self damage", () => {
    const world = arena();
    dealDamage(world, world.units[0], world.units[0], 1000, "true");
    through(world, 30);
    expect(world.units[0].hp).toBe(1000);
    hurt(world, 100); through(world, 329);
    dealDamage(world, world.units[0], world.units[0], 100, "true");
    through(world, 331); // Include the existing buff's final pulse, due at 331.
    const final = world.units[0].hp;
    through(world, 361);
    expect(world.units[0].hp).toBe(final);
  });

  it("attributes a real enemy pet's damage to its champion", () => {
    const world = arena();
    const pet = spawnPet(world, world.units[1], petSpec, 300);
    petCombatHit(world, pet, world.units[0], [{ type: "damage", damageType: "true", amount: { base: 1000 } }], false);
    through(world, 15);
    expect(world.units[0].hp).toBe(1002);
  });

  it("does not regenerate a pet victim through a copied champion hook", () => {
    const world = arena();
    const pet = spawnPet(world, world.units[0], petSpec, 0);
    const view = petFormulaTarget(pet, world.units[0]);
    view.spec.hooks = secondWindHooks(rules);
    dealDamage(world, world.units[1], view, 100, "true");
    world.tick = 15;
    view.spec.hooks.onTick!(hookContext(world, view));
    expect(view.hp).toBe(900);
    expect(world.units[0].hp).toBe(2000);
  });

  it("accepts actual persistent champion damage", () => {
    const world = arena();
    dealDamage(world, world.units[1], world.units[0], 1000, "true", { persistent: true, ability: "Fixture DoT" });
    through(world, 15);
    expect(world.units[0].hp).toBe(1002);
  });
});

describe("Second Wind modifiers and lifecycle", () => {
  it("uses regeneration: Grievous Wounds applies and healing totals remain zero", () => {
    const world = arena(); hurt(world);
    applyEffect(world, world.units[1], world.units[0], { type: "grievousWounds", duration: 10 }, { scale: 1 });
    through(world, 15);
    expect(world.units[0].hp).toBeCloseTo(1001.2, 10);
    expect(world.units[0].totals.healing).toBe(0);
    expect(world.log.some((entry) => entry.text.startsWith("heals "))).toBe(false);
  });

  it("retains regeneration-specific healing increases from the existing engine", () => {
    const world = arena(); hurt(world);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "healingIncrease", amount: { base: 0.5 }, duration: 10 }, { scale: 1 });
    through(world, 15);
    expect(world.units[0].hp).toBe(1003);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("samples changed maximum health rather than its initial snapshot", () => {
    const world = arena(); hurt(world);
    // Replace a live bonus pool without granting current HP, so the rune must
    // observe the changed derived maximum rather than a trigger-time amount.
    world.units[0].spec = { ...world.units[0].spec, bonus: { hp: 500 } };
    through(world, 15);
    expect(world.units[0].hp).toBe(1003);
  });

  it("carries its independent clock through an ordinary form change", () => {
    const hooks = secondWindHooks(rules);
    const small: FighterSpec = { ...fighter({ hooks }), form: "small" };
    const big: FighterSpec = { ...fighter({ hooks, base: { hp: 3000 } }), form: "big" };
    small.forms = big.forms = { small, big };
    const world = arena(small); hurt(world);
    setForm(world, world.units[0], "big");
    through(world, 15);
    expect(world.units[0].hp).toBe(1503);
  });

  it("isolates the clock and sampled health in cloned worlds", () => {
    const world = arena(); hurt(world);
    const clone = cloneWorld(world); clone.units[0].hp = 500;
    through(clone, 15);
    expect(clone.units[0].hp).toBe(503);
    expect(world.units[0].hp).toBe(1000);
    through(world, 15);
    expect(world.units[0].hp).toBe(1002);
    expect(clone.units[0].hp).toBe(503);
  });

  it("clears on counted death instead of healing the protected corpse", () => {
    const world = arena(); hurt(world);
    expect(beginDeathDefied(world, world.units[0], { duration: 3 })).toBe(true);
    through(world, 15);
    expect(world.units[0].hp).toBe(1);
  });

  it("retains living-body regeneration in an attackable resurrection", () => {
    const world = arena();
    expect(beginResurrection(world, world.units[0], { duration: 6 })).toBe(true);
    hurt(world); through(world, 15);
    expect(world.units[0].resurrection).toBeDefined();
    expect(world.units[0].hp).toBe(1002);
  });

  it("takes a numeric snapshot and leaves the reusable source fighter unchanged", () => {
    const mutable = structuredClone(rules);
    const spec = fighter({ hooks: secondWindHooks(mutable) });
    mutable.secondWind.missingHealthPerSecond = 1;
    const first = arena(spec), second = arena(spec);
    hurt(first); through(first, 15);
    expect(first.units[0].hp).toBe(1002);
    expect(second.units[0].hp).toBe(2000);
    expect(spec.bonus).toBeUndefined();
  });

  it("states the source's unresolved missing-health and server-phase interpretation", () => {
    expect(SECOND_WIND_ASSUMPTIONS.join(" ")).toMatch(/does not establish whether missing health is snapshotted/);
    expect(SECOND_WIND_ASSUMPTIONS.join(" ")).toMatch(/server's tick phase is not established/);
  });

  it("rejects a positive interval that rounds to zero game ticks instead of stalling upkeep", () => {
    const invalid = structuredClone(rules);
    invalid.secondWind.tickInterval = Number.MIN_VALUE;
    expect(() => secondWindHooks(invalid)).toThrow(/positive whole game-tick intervals/);
  });
});
