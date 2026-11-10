import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, dealDamage, hookContext, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { advanceLifecycles } from "../../engine/sim/lifecycle";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, destroyPet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { buildLegendAlacrity } from "../../runes/legendAlacrity";
import { fighter } from "../sim/kits";

const rules = { legendAlacrity: {
  baseAttackSpeed: 0.03, attackSpeedPerStack: 0.015, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100,
} } satisfies Pick<CombatRuneRules, "legendAlacrity">;
const POINTS = "rune:legend-alacrity:points";
const AS = "rune-effects:attackSpeed:9104";
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };

function equipped(points: number, own?: KitHooks): FighterSpec {
  const rune = buildLegendAlacrity(rules, points);
  return fighter({ hooks: composeHooks(own, [rune.hooks], [{ onStart: rune.beforeStart }], false) });
}
function arena(points = 0, enemy = fighter()): World {
  return createWorld({ fighters: [equipped(points), enemy], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
}
const progress = (world: World, side: 0 | 1 = 0) => world.units[side].memory[POINTS];
const grant = (world: World, side: 0 | 1 = 0) => world.units[side].statuses.filter(status => status.memoKey === AS);
const kill = (world: World, source: 0 | 1 = 0) => dealDamage(world, world.units[source], world.units[source === 0 ? 1 : 0], 5000, "true");

describe("Legend: Alacrity declared point state", () => {
  it.each([[0, 0.03], [99, 0.03], [100, 0.045], [199, 0.045], [950, 0.165], [999, 0.165], [1000, 0.18],
    [1001, 0.18], [Number.MAX_SAFE_INTEGER, 0.18]])
  ("starts from explicit %s points with %s bonus attack speed", (points, speed) => {
    const world = arena(points);
    expect(progress(world)).toBe(Math.min(points, 1000));
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(speed, 12);
    expect(grant(world)).toHaveLength(1);
    expect(grant(world)[0]).toMatchObject({ kind: "stat", key: "attackSpeed", source: 0, endTick: Infinity,
      ability: "Legend: Alacrity", memoKey: AS, persistThroughDeath: true });
    expect(world.units[0].spec.bonus?.attackSpeed).toBeUndefined();
  });

  it("shows the grant to the kit before its original start callback", () => {
    const spec = equipped(500, { onStart(ctx) { ctx.memory.seenAttackSpeed = derive(ctx.self).bonusAttackSpeed; } });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    expect(world.units[0].memory.seenAttackSpeed).toBeCloseTo(0.105, 12);
  });

  it("copies rules and declared history into a reusable immutable equipment closure", () => {
    const input = structuredClone(rules), effect = buildLegendAlacrity(input, 100);
    input.legendAlacrity.baseAttackSpeed = 0.8; input.legendAlacrity.pointsPerStack = 1;
    const spec = fighter({ hooks: composeHooks(undefined, [effect.hooks], [{ onStart: effect.beforeStart }], false) });
    const first = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    const second = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(first);
    expect(progress(first)).toBe(200); expect(progress(second)).toBe(100);
    expect(derive(first.units[0]).bonusAttackSpeed).toBeCloseTo(0.06, 12);
    expect(derive(second.units[0]).bonusAttackSpeed).toBeCloseTo(0.045, 12);
    expect(spec.bonus).toBeUndefined(); expect(spec.start).toBeUndefined();
  });

  it("does not duplicate its status or reset progress when start is dispatched again", () => {
    const world = arena(99); kill(world);
    world.units[0].spec.hooks!.onStart!(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(0.045, 12);
  });

  it("uses one initializer when a real credited kill precedes the start callback", () => {
    const effect = buildLegendAlacrity(rules, 99), spec = fighter({ hooks: effect.hooks });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(world); effect.beforeStart(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
  });

  it("reads the supplied numeric rules rather than embedding the current point increments", () => {
    const changed = { legendAlacrity: { baseAttackSpeed: 0.02, attackSpeedPerStack: 0.01,
      pointsPerStack: 20, maxStacks: 4, championKillPoints: 25 } };
    const effect = buildLegendAlacrity(changed, 19);
    const spec = fighter({ hooks: composeHooks(undefined, [effect.hooks], [{ onStart: effect.beforeStart }], false) });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(world);
    expect(progress(world)).toBe(44);
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(0.04, 12);
  });
});

describe("Legend: Alacrity actual champion-kill progression", () => {
  it("preserves99-point remainder through a real champion death", () => {
    const world = arena(99); kill(world);
    expect(progress(world)).toBe(199);
    expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(0.045, 12);
    expect(world.log.filter(entry => entry.text === "Legend: Alacrity reaches 1/10 stacks")).toHaveLength(1);
  });

  it("uses native kill deduplication across later packets and repeated notifications", () => {
    const world = arena(0); kill(world); kill(world); notifyKill(world, world.units[0], world.units[1]);
    expect(progress(world)).toBe(100); expect(grant(world)).toHaveLength(1);
  });

  it("updates the credited side and preserves its own champion kill callback", () => {
    const self = fighter(), enemy = equipped(250, { onKill(ctx) { ctx.memory.kitKills = Number(ctx.memory.kitKills ?? 0) + 1; } });
    const world = createWorld({ fighters: [self, enemy], distance: 300, modes: ["idle", "idle"] });
    kill(world, 1);
    expect(progress(world, 1)).toBe(350); expect(world.units[1].memory.kitKills).toBe(1);
    expect(progress(world, 0)).toBeUndefined();
  });

  it("credits an owned clone's actual champion kill to its owner exactly once", () => {
    const world = arena(99), clone = spawnPet(world, world.units[0], { ...petSpec, unitClass: "clone", targetClass: "champion" }, 0);
    petCombatHit(world, clone, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(199);
    expect(clone.memory[POINTS]).toBeUndefined();
    expect(clone.statuses?.some(status => status.memoKey === AS)).not.toBe(true);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("does not treat a summon classified%s as a champion-takedown victim", (targetClass) => {
    const world = arena(99), victim = spawnPet(world, world.units[1], { ...petSpec, ...(targetClass ? { targetClass } : {}) }, 300);
    damagePet(world, world.units[0], victim, 1000, "true", false);
    expect(progress(world)).toBe(99); expect(derive(world.units[0]).bonusAttackSpeed).toBeCloseTo(0.03, 12);
  });

  it("does not infer points from an epic-monster targeting body or an Illaoi-like Spirit", () => {
    const world = arena(99);
    for (const spec of [{ ...petSpec, targetClass: "monster" as const, epicMonster: true },
      { ...petSpec, targetClass: "champion" as const, kind: "spirit" }]) {
      const victim = spawnPet(world, world.units[1], spec, 300);
      damagePet(world, world.units[0], victim, 1000, "true", false);
    }
    expect(progress(world)).toBe(99);
  });

  it("waits through protected resurrection entry and awards once on actual destruction", () => {
    const target = fighter({ hooks: { onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); } } });
    const world = arena(99, target); kill(world);
    expect(world.units[1].resurrection).toBeDefined(); expect(progress(world)).toBe(99);
    kill(world); expect(progress(world)).toBe(199);
  });

  it("counts a fallen champion's initial death even while its window retains positive HP", () => {
    const target = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); } } });
    const world = arena(99, target); kill(world);
    expect(world.units[1].hp).toBe(1); expect(world.units[1].fallen).toBe(true);
    expect(progress(world)).toBe(199);
    notifyKill(world, world.units[0], world.units[1]); expect(progress(world)).toBe(199);
    world.tick = 90; advanceLifecycles(world);
    expect(world.units[1].alive).toBe(false); expect(progress(world)).toBe(199);
  });

  it.each(["fallen", "dead"] as const)("allows a%s owner's pet to progress without healing or reviving it", (mode) => {
    const world = arena(99), source = spawnPet(world, world.units[0], petSpec, 0);
    if (mode === "fallen") beginDeathDefied(world, world.units[0], { duration: 3 });
    else { world.units[0].hp = 0; world.units[0].alive = false; }
    const hp = world.units[0].hp;
    petCombatHit(world, source, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(199); expect(world.units[0].hp).toBe(hp);
    expect(world.units[0].totals.healing).toBe(0);
    expect(grant(world)).toHaveLength(1); expect(grant(world)[0]!.persistThroughDeath).toBe(true);
  });

  it("caps an award at the reviewed maximum without overflowing declared large history", () => {
    const almost = arena(999); kill(almost);
    const full = arena(Number.MAX_SAFE_INTEGER); kill(full);
    expect(progress(almost)).toBe(1000); expect(progress(full)).toBe(1000);
    expect(derive(almost.units[0]).bonusAttackSpeed).toBeCloseTo(0.18, 12);
    expect(grant(full)).toHaveLength(1);
  });

  it("does not award points for hits, shield depletion, expiry, replacement or friendly destruction", () => {
    const world = arena(99);
    world.units[1].statuses.push({ kind: "shield", key: "fixture", source: 1, value: 100, startTick: 0, endTick: Infinity });
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    const expiring = spawnPet(world, world.units[1], { ...petSpec, duration: 1 }, 300);
    const replaced = spawnPet(world, world.units[1], petSpec, 300); destroyPet(world, replaced);
    const own = spawnPet(world, world.units[0], petSpec, 0); damagePet(world, world.units[0], own, 1000, "true", false);
    world.tick = 30; advancePets(world);
    expect(world.pets).not.toContain(expiring); expect(progress(world)).toBe(99);
  });

  it("does not manufacture assist points when the observed enemy kills itself", () => {
    const world = arena(99);
    dealDamage(world, world.units[1], world.units[1], 5000, "true");
    expect(world.units[1].hp).toBeLessThanOrEqual(0);
    expect(progress(world)).toBe(99);
    expect(grant(world)[0]!.value).toBeCloseTo(0.03, 12);
  });
});

describe("Legend: Alacrity lifecycle and copied state", () => {
  it("keeps branch progress and status values independent", () => {
    const world = arena(99), branch = cloneWorld(world); kill(branch);
    expect(progress(branch)).toBe(199); expect(progress(world)).toBe(99);
    expect(grant(branch)[0]).not.toBe(grant(world)[0]);
    expect(grant(world)[0]!.value).toBeCloseTo(0.03, 12);
    kill(world); expect(progress(world)).toBe(199); expect(progress(branch)).toBe(199);
  });

  it("preserves the one status and progress through a real form change and repeated start", () => {
    const rune = buildLegendAlacrity(rules, 99);
    const hooks = composeHooks(undefined, [rune.hooks], [{ onStart: rune.beforeStart }], false);
    const small: FighterSpec = { ...fighter({ hooks }), form: "small" };
    const big: FighterSpec = { ...fighter({ hooks, base: { hp: 3000 } }), form: "big" };
    small.forms = big.forms = { small, big };
    const world = createWorld({ fighters: [small, fighter()], distance: 300, modes: ["idle", "idle"] });
    setForm(world, world.units[0], "big"); kill(world);
    world.units[0].spec.hooks!.onStart!(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
    expect(small.bonus).toBeUndefined(); expect(big.bonus).toBeUndefined();
  });

  it("does not initialize or grant progress on a copied pet recipient", () => {
    const world = arena(99), pet = spawnPet(world, world.units[0], petSpec, 0);
    const view = petFormulaTarget(pet, world.units[0]);
    const rune = buildLegendAlacrity(rules, 99); rune.beforeStart(hookContext(world, view));
    world.units[1].hp = 0;
    rune.hooks.onKill!({ ...hookContext(world, view), victim: world.units[1] });
    expect(view.memory[POINTS]).toBeUndefined(); expect(progress(world)).toBe(99);
    expect(view.statuses.some(status => status.memoKey === AS)).toBe(false);
  });

  it("does not accept an unrelated world's champion-shaped victim", () => {
    const world = arena(99), other = arena(99); other.units[1].hp = 0;
    const rune = buildLegendAlacrity(rules, 99);
    rune.hooks.onKill!({ ...hookContext(world, world.units[0]), victim: other.units[1] });
    expect(progress(world)).toBe(99);
  });

  it("states the declared history and limited progression model", () => {
    const assumptions = buildLegendAlacrity(rules, 1500).assumptions.join(" ");
    expect(assumptions).toContain("1500 points (capped to 1000)");
    expect(assumptions).toContain("No farm");
    expect(assumptions).toContain("after-kit kill callback phase");
  });
});

describe("Legend: Alacrity invalid input rules", () => {
  it.each([-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, undefined, "0"])
  ("requires explicit safe nonnegative integer history: %s", (points) => {
    expect(() => buildLegendAlacrity(rules, points as number)).toThrow(/explicit nonnegative safe-integer/);
  });

  it.each(["baseAttackSpeed", "attackSpeedPerStack"] as const)("requires a valid fraction for%s", (field) => {
    for (const value of [0, -1, NaN, Infinity, 1.1]) {
      expect(() => buildLegendAlacrity({ legendAlacrity: { ...rules.legendAlacrity, [field]: value } }, 0)).toThrow(/positive finite fractions/);
    }
  });

  it.each(["pointsPerStack", "maxStacks", "championKillPoints"] as const)("requires a positive safe integer for%s", (field) => {
    for (const value of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => buildLegendAlacrity({ legendAlacrity: { ...rules.legendAlacrity, [field]: value } }, 0)).toThrow(/positive finite fractions/);
    }
  });

  it("rejects an unsafe point cap and missing reviewed rules", () => {
    expect(() => buildLegendAlacrity({ legendAlacrity: { ...rules.legendAlacrity, maxStacks: Number.MAX_SAFE_INTEGER } }, 0)).toThrow(/point cap/);
    expect(() => buildLegendAlacrity({} as Pick<CombatRuneRules, "legendAlacrity">, 0)).toThrow(/reviewed numeric rules/);
  });
});
