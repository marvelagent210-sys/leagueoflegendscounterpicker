import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, dealDamage, heal, hookContext, notifyKill } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { buildLegendBloodline } from "../../runes/legendBloodline";
import { lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";

const rules = { legendBloodline: {
  baseLifeSteal: 0, lifeStealPerStack: 0.0045, pointsPerStack: 100, maxStacks: 15, championKillPoints: 100, bonusHealth: 85,
} } satisfies Pick<CombatRuneRules, "legendBloodline">;
const POINTS = "rune:legend-bloodline:points";
const VAMP = "rune-effects:lifeSteal:9103";
const HEALTH = "rune-effects:health:9103";
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };

function equipped(points: number, hooks?: KitHooks): FighterSpec {
  const rune = buildLegendBloodline(rules, points);
  return fighter({ hooks: composeHooks(hooks, [rune.hooks], [{ onStart: rune.beforeStart }], false) });
}
function arena(points = 0, enemy = fighter()): World {
  return createWorld({ fighters: [equipped(points), enemy], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
}
const progress = (world: World, side: 0 | 1 = 0) => world.units[side].memory[POINTS];
const grants = (world: World, memo = VAMP, side: 0 | 1 = 0) => world.units[side].statuses.filter(status => status.memoKey === memo);
const kill = (world: World, side: 0 | 1 = 0) => dealDamage(world, world.units[side], world.units[side === 0 ? 1 : 0], 5000, "true");

describe("Legend: Bloodline history, cap and direct health", () => {
  it.each([[0, 0, 2000], [99, 0, 2000], [100, 0.0045, 2000], [1399, 0.0585, 2000],
    [1400, 0.063, 2000], [1499, 0.063, 2000], [1500, 0.0675, 2085], [1501, 0.0675, 2085],
    [Number.MAX_SAFE_INTEGER, 0.0675, 2085]])
  ("starts from %s declared points with %s life steal and %s health", (points, lifeSteal, hp) => {
    const world = arena(points), unit = world.units[0];
    expect(progress(world)).toBe(Math.min(points, 1500));
    expect(derive(unit).lifeSteal).toBeCloseTo(lifeSteal, 12);
    expect(derive(unit).maxHp).toBe(hp); expect(unit.hp).toBe(hp);
    expect(grants(world)).toHaveLength(1);
    expect(grants(world)[0]).toMatchObject({ kind: "stat", key: "lifeSteal", source: 0,
      endTick: Infinity, ability: "Legend: Bloodline", persistThroughDeath: true });
    expect(grants(world, HEALTH)).toHaveLength(hp === 2085 ? 1 : 0);
    expect(unit.totals.healing).toBe(0);
  });

  it("makes seeded full-stack stats visible to setup shields without counting health as healing", () => {
    const spec = equipped(1500, { onStart(ctx) { ctx.memory.shieldAtSetup = derive(ctx.self).maxHp * 0.1; } });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"], hp: [0.5, 1] });
    expect(world.units[0].memory.shieldAtSetup).toBe(208.5);
    expect(world.units[0].hp).toBe(1042.5); expect(world.units[0].totals.healing).toBe(0);
  });

  it("awards health once on an actual kill crossing the fifteenth stack", () => {
    const world = arena(1499), unit = world.units[0]; unit.hp = 1000;
    kill(world); kill(world); notifyKill(world, unit, world.units[1]);
    expect(progress(world)).toBe(1500); expect(derive(unit).maxHp).toBe(2085);
    expect(derive(unit).lifeSteal).toBeCloseTo(0.0675, 12);
    expect(unit.hp).toBe(1085); expect(unit.totals.healing).toBe(0);
    expect(grants(world, HEALTH)).toHaveLength(1);
    unit.spec.hooks!.onStart!(hookContext(world, unit));
    expect(unit.hp).toBe(1085); expect(grants(world, HEALTH)).toHaveLength(1);
  });

  it("retains remainder and advances only completed stacks below cap", () => {
    const world = arena(99); kill(world);
    expect(progress(world)).toBe(199); expect(derive(world.units[0]).lifeSteal).toBeCloseTo(0.0045, 12);
    expect(derive(world.units[0]).maxHp).toBe(2000); expect(grants(world, HEALTH)).toHaveLength(0);
    expect(world.log.filter(entry => entry.text === "Legend: Bloodline reaches 1/15 stacks")).toHaveLength(1);
  });

  it("keeps a direct cap-health award separate from Grievous Wounds, healing increases and noHealing", () => {
    const world = arena(1400), unit = world.units[0]; unit.hp = 1000;
    unit.statuses.push(lasting("grievousWounds", "grievous"), lasting("stat", "healingIncrease", 0.5), lasting("state", "noHealing"));
    kill(world);
    expect(unit.hp).toBe(1085); expect(unit.totals.healing).toBe(0);
    expect(derive(unit).maxHp).toBe(2085);
  });

  it("copies supplied numeric rules rather than closing over mutable caller objects", () => {
    const input = { legendBloodline: { baseLifeSteal: 0.01, lifeStealPerStack: 0.02, pointsPerStack: 20,
      maxStacks: 4, championKillPoints: 25, bonusHealth: 30 } };
    const effect = buildLegendBloodline(input, 59);
    input.legendBloodline.lifeStealPerStack = 0.5; input.legendBloodline.bonusHealth = 900;
    const spec = fighter({ hooks: composeHooks(undefined, [effect.hooks], [{ onStart: effect.beforeStart }], false) });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    kill(world);
    expect(progress(world)).toBe(80); expect(derive(world.units[0]).lifeSteal).toBeCloseTo(0.09, 12);
    expect(derive(world.units[0]).maxHp).toBe(2030);
  });
});

describe("Legend: Bloodline actual eligible damage and healing", () => {
  it.each(["physical", "magic", "true"] as const)("restores from an eligible %s basic damage packet after mitigation", damageType => {
    const world = arena(1500), unit = world.units[0]; unit.hp = 1000;
    const dealt = dealDamage(world, unit, world.units[1], 100, damageType, { attack: true });
    expect(dealt).toBe(damageType === "true" ? 100 : 50);
    expect(unit.hp).toBeCloseTo(1000 + dealt * 0.0675, 12);
    expect(unit.totals.healing).toBeCloseTo(dealt * 0.0675, 12);
  });

  it.each([{ attack: false }, { ability: "Q" }, { attack: true, noLifeSteal: true }])
  ("does not manufacture life steal from an ineligible packet: %j", context => {
    const world = arena(1500); world.units[0].hp = 1000;
    dealDamage(world, world.units[0], world.units[1], 100, "true", context);
    expect(world.units[0].hp).toBe(1000); expect(world.units[0].totals.healing).toBe(0);
  });

  it("respects explicit spell eligibility and adds other life steal exactly once", () => {
    const world = arena(1500), unit = world.units[0]; unit.hp = 1000;
    unit.statuses.push(lasting("stat", "lifeSteal", 0.1));
    dealDamage(world, unit, world.units[1], 100, "true", { ability: "Q", appliesLifeSteal: true });
    expect(unit.hp).toBeCloseTo(1016.75, 12); expect(unit.totals.healing).toBeCloseTo(16.75, 12);
  });

  it("uses normal life-steal healing modifiers and records actual health restored", () => {
    const world = arena(1500), unit = world.units[0]; unit.hp = 1000;
    unit.statuses.push(lasting("grievousWounds", "grievous"), lasting("stat", "healingIncrease", 0.5));
    dealDamage(world, unit, world.units[1], 100, "true", { attack: true });
    expect(unit.hp).toBeCloseTo(1006.075, 12); expect(unit.totals.healing).toBeCloseTo(6.075, 12);
  });

  it("caps life steal at maximum health and permits vamp under the existing noHealing rule", () => {
    const world = arena(1500), unit = world.units[0]; unit.hp = 2082;
    unit.statuses.push(lasting("state", "noHealing"));
    heal(world, unit, 100); expect(unit.hp).toBe(2082);
    dealDamage(world, unit, world.units[1], 100, "true", { attack: true });
    expect(unit.hp).toBe(2085); expect(unit.totals.healing).toBe(3);
  });

  it("uses the engine's shield/overkill packet convention without a second rune vamp callback", () => {
    const world = arena(1500), unit = world.units[0]; unit.hp = 1000;
    world.units[1].statuses.push(lasting("shield", "fixture", 100));
    const removed = dealDamage(world, unit, world.units[1], 100, "true", { attack: true });
    expect(removed).toBe(0); expect(unit.hp).toBeCloseTo(1006.75, 12);
    expect(unit.totals.healing).toBeCloseTo(6.75, 12);
  });

  it("keeps the lethal packet's captured pre-stack life steal separate from the new health award", () => {
    const world = arena(1400), unit = world.units[0]; unit.hp = 1000; world.units[1].hp = 50;
    dealDamage(world, unit, world.units[1], 100, "true", { attack: true });
    expect(progress(world)).toBe(1500); expect(unit.hp).toBeCloseTo(1091.3, 12);
    expect(unit.totals.healing).toBeCloseTo(6.3, 12);
  });
});

describe("Legend: Bloodline native ownership and lifecycle", () => {
  it("updates only the credited equipped side and retains its kit kill callback", () => {
    const world = createWorld({ fighters: [fighter(), equipped(99, { onKill(ctx) { ctx.memory.kitKills = Number(ctx.memory.kitKills ?? 0) + 1; } })],
      distance: 300, modes: ["idle", "idle"] });
    kill(world, 1);
    expect(progress(world, 1)).toBe(199); expect(progress(world)).toBeUndefined();
    expect(world.units[1].memory.kitKills).toBe(1);
  });

  it("credits an owned clone kill to the owner without equipping the clone", () => {
    const world = arena(1499), pet = spawnPet(world, world.units[0], { ...petSpec, unitClass: "clone", targetClass: "champion" }, 0);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(1500); expect(derive(world.units[0]).maxHp).toBe(2085);
    expect(pet.memory[POINTS]).toBeUndefined(); expect(pet.hp).toBe(100);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("does not earn Legend points from a summon with targeting class %s", targetClass => {
    const world = arena(99), victim = spawnPet(world, world.units[1], { ...petSpec, ...(targetClass ? { targetClass } : {}) }, 300);
    damagePet(world, world.units[0], victim, 1000, "true", false);
    expect(progress(world)).toBe(99); expect(derive(world.units[0]).lifeSteal).toBe(0);
  });

  it("counts the actual protected-body death once, after resurrection entry", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); } } });
    const world = arena(1499, enemy); kill(world);
    expect(world.units[1].resurrection).toBeDefined(); expect(progress(world)).toBe(1499);
    kill(world); notifyKill(world, world.units[0], world.units[1]);
    expect(progress(world)).toBe(1500); expect(grants(world, HEALTH)).toHaveLength(1);
  });

  it("counts a fallen victim even when the retained body still has positive health", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); } } });
    const world = arena(1499, enemy); kill(world);
    expect(world.units[1].fallen).toBe(true); expect(world.units[1].hp).toBe(1);
    expect(progress(world)).toBe(1500); expect(derive(world.units[0]).maxHp).toBe(2085);
  });

  it.each(["dead", "dying", "fallen", "resurrecting"] as const)
  ("keeps cap stats but grants no direct current health to a %s owner", state => {
    const world = arena(1499), unit = world.units[0], pet = spawnPet(world, unit, petSpec, 0);
    if (state === "dead") { unit.alive = false; unit.hp = 0; }
    if (state === "dying") unit.hp = 0;
    if (state === "fallen") beginDeathDefied(world, unit, { duration: 3 });
    if (state === "resurrecting") beginResurrection(world, unit, { duration: 3 });
    const hp = unit.hp, alive = unit.alive;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    expect(progress(world)).toBe(1500); expect(derive(unit).maxHp).toBe(2085);
    expect(derive(unit).lifeSteal).toBeCloseTo(0.0675, 12);
    expect(unit.hp).toBe(hp); expect(unit.alive).toBe(alive); expect(unit.totals.healing).toBe(0);
    expect(grants(world, HEALTH)[0]?.persistThroughDeath).toBe(true);
  });

  it("does not infer assists, nonlethal progress or another world's victim identity", () => {
    const world = arena(99), other = arena(99), rune = buildLegendBloodline(rules, 99);
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    other.units[1].hp = 0; rune.hooks.onKill!({ ...hookContext(world, world.units[0]), victim: other.units[1] });
    dealDamage(world, world.units[1], world.units[1], 5000, "true");
    expect(progress(world)).toBe(99);
  });

  it("rejects a copied pet recipient even when it carries owner hooks", () => {
    const world = arena(1499), pet = spawnPet(world, world.units[0], petSpec, 0), copy = petFormulaTarget(pet, world.units[0]);
    const rune = buildLegendBloodline(rules, 1499); rune.beforeStart(hookContext(world, copy)); world.units[1].hp = 0;
    rune.hooks.onKill!({ ...hookContext(world, copy), victim: world.units[1] });
    expect(copy.memory[POINTS]).toBeUndefined(); expect(copy.statuses.some(s => s.memoKey === VAMP || s.memoKey === HEALTH)).toBe(false);
  });

  it("keeps branch, form and repeated-world progress and health awards independent", () => {
    const spec = equipped(1499), small: FighterSpec = { ...spec, form: "small" }, big: FighterSpec = { ...spec, form: "big", base: { ...spec.base, hp: 3000 } };
    small.forms = big.forms = { small, big };
    const original = createWorld({ fighters: [small, fighter()], distance: 300, modes: ["idle", "idle"] });
    const branch = cloneWorld(original); branch.units[0].hp = 1000; kill(branch);
    expect(progress(branch)).toBe(1500); expect(progress(original)).toBe(1499);
    expect(grants(original, HEALTH)).toHaveLength(0); expect(grants(branch, HEALTH)).toHaveLength(1);
    setForm(branch, branch.units[0], "big"); const hp = branch.units[0].hp;
    branch.units[0].spec.hooks!.onStart!(hookContext(branch, branch.units[0]));
    expect(branch.units[0].hp).toBe(hp); expect(derive(branch.units[0]).maxHp).toBe(3085);
    const second = createWorld({ fighters: [small, fighter()], distance: 300, modes: ["idle", "idle"] });
    expect(progress(second)).toBe(1499); expect(derive(second.units[0]).maxHp).toBe(2000);
    expect(small.bonus).toBeUndefined(); expect(big.bonus).toBeUndefined();
  });

  it("initializes once when a native kill precedes the starting callback", () => {
    const rune = buildLegendBloodline(rules, 1499), world = createWorld({ fighters: [fighter({ hooks: rune.hooks }), fighter()], distance: 300, modes: ["idle", "idle"] });
    world.units[0].hp = 1000; kill(world); rune.beforeStart(hookContext(world, world.units[0]));
    expect(progress(world)).toBe(1500); expect(world.units[0].hp).toBe(1085); expect(grants(world, HEALTH)).toHaveLength(1);
  });
});

describe("Legend: Bloodline invalid rules and explicit history", () => {
  it.each([-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, undefined, "0"])("rejects invalid history %s", points => {
    expect(() => buildLegendBloodline(rules, points as number)).toThrow(/explicit nonnegative safe-integer/);
  });
  it.each(["pointsPerStack", "maxStacks", "championKillPoints"] as const)("requires positive safe-integer %s", field => {
    for (const value of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, [field]: value } }, 0)).toThrow(/safe-integer point rules/);
    }
  });
  it("rejects invalid numeric effects, unsafe caps, overflow and missing reviewed rules", () => {
    for (const field of ["baseLifeSteal", "lifeStealPerStack", "bonusHealth"] as const) {
      for (const value of [-1, NaN, Infinity]) expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, [field]: value } }, 0)).toThrow();
    }
    expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, bonusHealth: 0 } }, 0)).toThrow();
    expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, lifeStealPerStack: 0 } }, 0)).toThrow();
    expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, maxStacks: Number.MAX_SAFE_INTEGER } }, 0)).toThrow(/point cap/);
    expect(() => buildLegendBloodline({ legendBloodline: { ...rules.legendBloodline, lifeStealPerStack: Number.MAX_VALUE } }, 0)).toThrow(/maximum life steal/);
    expect(() => buildLegendBloodline({} as Pick<CombatRuneRules, "legendBloodline">, 0)).toThrow(/reviewed numeric rules/);
  });
});
