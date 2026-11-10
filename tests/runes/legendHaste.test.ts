import { describe, expect, it } from "vitest";
import { toTicks } from "../../engine/rules/time";
import { completeCast } from "../../engine/sim/actions";
import { beginDeathDefied, beginResurrection, dealDamage, hookContext, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { buildLegendHaste } from "../../runes/legendHaste";
import { ability, fighter } from "../sim/kits";

const rules = { legendHaste: {
  baseHaste: 0, hastePerStack: 1.5, pointsPerStack: 100, maxStacks: 10, championKillPoints: 100,
} } satisfies Pick<CombatRuneRules, "legendHaste">;
const POINTS = "rune:legend-haste:points";
const HASTE = "rune-effects:basicAbilityHaste:9105";
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };
const spell = (key: "Q" | "W" | "R") => ability({ key, slot: key, cooldown: 10, delivery: { kind: "self" } });

function equipped(points: number, options: { hooks?: KitHooks; abilities?: AbilitySpec[]; genericHaste?: number } = {}): FighterSpec {
  const rune = buildLegendHaste(rules, points);
  return fighter({ abilities: options.abilities, bonus: options.genericHaste === undefined ? undefined : { abilityHaste: options.genericHaste },
    hooks: composeHooks(options.hooks, [rune.hooks], [{ onStart: rune.beforeStart }], false) });
}
function arena(points = 0, enemy = fighter()): World {
  return createWorld({ fighters: [equipped(points), enemy], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
}
const progress = (world: World, side: 0 | 1 = 0) => world.units[side].memory[POINTS];
const grant = (world: World, side: 0 | 1 = 0) => world.units[side].statuses.filter(status => status.memoKey === HASTE);
const kill = (world: World, side: 0 | 1 = 0) => dealDamage(world, world.units[side], world.units[side === 0 ? 1 : 0], 5000, "true");

describe("Legend: Haste declared history and scheduling", () => {
  it.each([[0, 0], [99, 0], [100, 1.5], [199, 1.5], [950, 13.5], [999, 13.5], [1000, 15],
    [1001, 15], [Number.MAX_SAFE_INTEGER, 15]])
  ("starts from explicit %s points with %s basic ability haste", (points, haste) => {
    const world = arena(points);
    expect(progress(world)).toBe(Math.min(points, 1000));
    expect(derive(world.units[0]).basicAbilityHaste).toBe(haste);
    expect(derive(world.units[0]).abilityHaste).toBe(0);
    expect(grant(world)).toHaveLength(1);
    expect(grant(world)[0]).toMatchObject({ kind: "stat", key: "basicAbilityHaste", source: 0, value: haste,
      endTick: Infinity, ability: "Legend: Haste", persistThroughDeath: true });
    expect(world.units[0].spec.bonus?.basicAbilityHaste).toBeUndefined();
  });

  it.each([[0, 0], [100, 1.5], [1000, 15]])
  ("schedules actual basic and ultimate cooldowns from %s points without turning basic haste into generic haste", (points, haste) => {
    const q = spell("Q"), r = spell("R"), spec = equipped(points, { abilities: [q, r], genericHaste: 40 });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    completeCast(world, world.units[0], q, world.tick);
    completeCast(world, world.units[0], r, world.tick);
    expect(world.units[0].cooldownReady.Q).toBe(toTicks(10 * 100 / (140 + haste)));
    expect(world.units[0].cooldownReady.R).toBe(toTicks(10 * 100 / 140));
    if (haste > 0) expect(world.units[0].cooldownReady.Q).toBeLessThan(world.units[0].cooldownReady.R!);
    else expect(world.units[0].cooldownReady.Q).toBe(world.units[0].cooldownReady.R);
  });

  it("is installed before a kit's onStart cooldown scheduling", () => {
    const q = spell("Q"), spec = equipped(1000, { abilities: [q], hooks: {
      onStart(ctx) { completeCast(ctx.world, ctx.self, q, ctx.tick); },
    } });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    expect(world.units[0].cooldownReady.Q).toBe(toTicks(10 * 100 / 115));
  });

  it("uses stack progress for newly scheduled cooldowns without rescaling a running timer", () => {
    const q = spell("Q"), w = spell("W");
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 30 }); } } });
    const world = createWorld({ fighters: [equipped(99, { abilities: [q, w], genericHaste: 100 }), enemy],
      distance: 300, modes: ["idle", "idle"] });
    completeCast(world, world.units[0], q, 0);
    const ready = world.units[0].cooldownReady.Q;
    world.tick = 30; kill(world);
    expect(progress(world)).toBe(199);
    expect(derive(world.units[0]).basicAbilityHaste).toBe(1.5);
    expect(world.units[0].cooldownReady.Q).toBe(ready);
    completeCast(world, world.units[0], w, world.tick);
    expect(world.units[0].cooldownReady.W).toBe(world.tick + toTicks(10 * 100 / 201.5));
    expect(world.units[0].cooldownReady.W).toBeLessThan(world.tick + toTicks(10 * 100 / 200));
  });

  it("snapshots caller rules and starts each reused equipment world from its declared history", () => {
    const input = structuredClone(rules), effect = buildLegendHaste(input, 99);
    input.legendHaste.hastePerStack = 50; input.legendHaste.pointsPerStack = 1;
    const spec = fighter({ hooks: composeHooks(undefined, [effect.hooks], [{ onStart: effect.beforeStart }], false) });
    const first = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    const second = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(first);
    expect(progress(first)).toBe(199); expect(progress(second)).toBe(99);
    expect(derive(first.units[0]).basicAbilityHaste).toBe(1.5);
    expect(derive(second.units[0]).basicAbilityHaste).toBe(0);
    expect(spec.bonus).toBeUndefined(); expect(spec.start).toBeUndefined();
  });

  it("uses supplied numeric point rules and preserves their remainders", () => {
    const input = { legendHaste: { baseHaste: 2, hastePerStack: 3, pointsPerStack: 20, maxStacks: 4, championKillPoints: 25 } };
    const effect = buildLegendHaste(input, 19);
    const spec = fighter({ hooks: composeHooks(undefined, [effect.hooks], [{ onStart: effect.beforeStart }], false) });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(world);
    expect(progress(world)).toBe(44);
    expect(derive(world.units[0]).basicAbilityHaste).toBe(8);
  });
});

describe("Legend: Haste native champion kill progress", () => {
  it("preserves the remainder and awards one stack through native deduplicated champion death", () => {
    const world = arena(99); kill(world); kill(world); notifyKill(world, world.units[0], world.units[1]);
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
    expect(derive(world.units[0]).basicAbilityHaste).toBe(1.5);
    expect(world.log.filter(entry => entry.text === "Legend: Haste reaches 1/10 stacks")).toHaveLength(1);
  });

  it("updates only the credited equipped side and preserves that side's kit kill callback", () => {
    const enemy = equipped(250, { hooks: { onKill(ctx) { ctx.memory.kitKills = Number(ctx.memory.kitKills ?? 0) + 1; } } });
    const world = createWorld({ fighters: [fighter(), enemy], distance: 300, modes: ["idle", "idle"] });
    kill(world, 1);
    expect(progress(world, 1)).toBe(350); expect(world.units[1].memory.kitKills).toBe(1);
    expect(progress(world)).toBeUndefined();
  });

  it("credits an owned clone's champion kill to its champion owner without a pet rune grant", () => {
    const world = arena(99), clone = spawnPet(world, world.units[0], { ...petSpec, unitClass: "clone", targetClass: "champion" }, 0);
    petCombatHit(world, clone, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(199); expect(clone.memory[POINTS]).toBeUndefined();
    expect(clone.statuses?.some(status => status.memoKey === HASTE)).not.toBe(true);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("does not award from a summon with targeting class %s", (targetClass) => {
    const world = arena(99), pet = spawnPet(world, world.units[1], { ...petSpec, ...(targetClass ? { targetClass } : {}) }, 300);
    damagePet(world, world.units[0], pet, 1000, "true", false);
    expect(progress(world)).toBe(99); expect(derive(world.units[0]).basicAbilityHaste).toBe(0);
  });

  it("waits through protected resurrection entry and counts actual destruction once", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); } } });
    const world = arena(99, enemy); kill(world);
    expect(world.units[1].resurrection).toBeDefined(); expect(progress(world)).toBe(99);
    kill(world); expect(progress(world)).toBe(199);
  });

  it("counts a fallen champion death even when its post-death window retains positive health", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); } } });
    const world = arena(99, enemy); kill(world);
    expect(world.units[1].fallen).toBe(true); expect(world.units[1].hp).toBeGreaterThan(0);
    expect(progress(world)).toBe(199);
    notifyKill(world, world.units[0], world.units[1]); expect(progress(world)).toBe(199);
  });

  it.each(["dead", "fallen"] as const)("allows a %s owner's committed pet kill without healing or reviving it", (state) => {
    const world = arena(99), pet = spawnPet(world, world.units[0], petSpec, 0);
    if (state === "fallen") beginDeathDefied(world, world.units[0], { duration: 3 });
    else { world.units[0].alive = false; world.units[0].hp = 0; }
    const hp = world.units[0].hp;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(199); expect(world.units[0].hp).toBe(hp);
    expect(world.units[0].totals.healing).toBe(0);
    expect(grant(world)[0]!.persistThroughDeath).toBe(true);
    if (state === "dead") expect(world.units[0].alive).toBe(false);
  });

  it("caps real kill progress while retaining one status", () => {
    const almost = arena(999), full = arena(Number.MAX_SAFE_INTEGER); kill(almost); kill(full);
    expect(progress(almost)).toBe(1000); expect(progress(full)).toBe(1000);
    expect(derive(almost.units[0]).basicAbilityHaste).toBe(15);
    expect(grant(full)).toHaveLength(1);
  });

  it("does not infer assists from an enemy's self-kill or points from nonlethal hits", () => {
    const world = arena(99);
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    expect(progress(world)).toBe(99);
    dealDamage(world, world.units[1], world.units[1], 5000, "true");
    expect(progress(world)).toBe(99);
  });
});

describe("Legend: Haste lifecycle and isolated identity", () => {
  it("does not reset earned progress or duplicate statuses on repeated start", () => {
    const world = arena(99); kill(world);
    world.units[0].spec.hooks!.onStart!(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
  });

  it("initializes once even if native kill credit precedes onStart", () => {
    const rune = buildLegendHaste(rules, 99), spec = fighter({ hooks: rune.hooks });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(world); rune.beforeStart(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(199); expect(grant(world)).toHaveLength(1);
  });

  it("keeps branch progress and mutable stat values independent", () => {
    const world = arena(99), branch = cloneWorld(world); kill(branch);
    expect(progress(branch)).toBe(199); expect(progress(world)).toBe(99);
    expect(grant(branch)[0]).not.toBe(grant(world)[0]); expect(grant(world)[0]!.value).toBe(0);
    kill(world); expect(progress(world)).toBe(199); expect(progress(branch)).toBe(199);
  });

  it("retains one grant through real form transitions and repeated starts", () => {
    const rune = buildLegendHaste(rules, 99);
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

  it("rejects copied pet recipients and unrelated champion-shaped victims", () => {
    const world = arena(99), other = arena(99), pet = spawnPet(world, world.units[0], petSpec, 0);
    const copied = petFormulaTarget(pet, world.units[0]), rune = buildLegendHaste(rules, 99);
    rune.beforeStart(hookContext(world, copied));
    world.units[1].hp = 0;
    rune.hooks.onKill!({ ...hookContext(world, copied), victim: world.units[1] });
    expect(copied.memory[POINTS]).toBeUndefined(); expect(copied.statuses.some(status => status.memoKey === HASTE)).toBe(false);
    other.units[1].hp = 0;
    rune.hooks.onKill!({ ...hookContext(world, world.units[0]), victim: other.units[1] });
    expect(progress(world)).toBe(99);
  });

  it("states history, limited kill progress and scheduling assumptions", () => {
    const assumptions = buildLegendHaste(rules, 1500).assumptions.join(" ");
    expect(assumptions).toContain("1500 points (capped to 1000)");
    expect(assumptions).toContain("No farm"); expect(assumptions).toContain("after-kit kill callback phase");
    expect(assumptions).toContain("does not rescale a cooldown already running");
  });
});

describe("Legend: Haste invalid rules and history", () => {
  it.each([-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, undefined, "0"])
  ("requires explicit safe nonnegative integer history: %s", (points) => {
    expect(() => buildLegendHaste(rules, points as number)).toThrow(/explicit nonnegative safe-integer/);
  });

  it("allows zero base haste and rejects invalid haste amounts", () => {
    expect(() => buildLegendHaste(rules, 0)).not.toThrow();
    for (const baseHaste of [-1, NaN, Infinity]) {
      expect(() => buildLegendHaste({ legendHaste: { ...rules.legendHaste, baseHaste } }, 0)).toThrow(/nonnegative base haste/);
    }
    for (const hastePerStack of [0, -1, NaN, Infinity]) {
      expect(() => buildLegendHaste({ legendHaste: { ...rules.legendHaste, hastePerStack } }, 0)).toThrow(/positive per-stack haste/);
    }
  });

  it.each(["pointsPerStack", "maxStacks", "championKillPoints"] as const)("requires positive safe-integer %s", (field) => {
    for (const value of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => buildLegendHaste({ legendHaste: { ...rules.legendHaste, [field]: value } }, 0)).toThrow(/safe-integer point rules/);
    }
  });

  it("rejects unsafe caps, nonfinite resulting haste and missing reviewed rules", () => {
    expect(() => buildLegendHaste({ legendHaste: { ...rules.legendHaste, maxStacks: Number.MAX_SAFE_INTEGER } }, 0)).toThrow(/point cap/);
    expect(() => buildLegendHaste({ legendHaste: { ...rules.legendHaste, hastePerStack: Number.MAX_VALUE } }, 0)).toThrow(/maximum basic ability haste/);
    expect(() => buildLegendHaste({} as Pick<CombatRuneRules, "legendHaste">, 0)).toThrow(/reviewed numeric rules/);
  });
});
