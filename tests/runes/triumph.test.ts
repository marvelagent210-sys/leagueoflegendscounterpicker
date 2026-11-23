import { describe, expect, it } from "vitest";
import { beginDeathDefied, beginResurrection, dealDamage, hookContext, notifyKill } from "../../engine/sim/combat";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, destroyPet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import type { CombatRuneRules } from "../../runes/effectRules";
import { buildTriumph } from "../../runes/triumph";
import { lasting } from "../sim/helpers";
import { fighter } from "../sim/kits";

const rules = { triumph: { maximumHealthRatio: 0.025, missingHealthRatio: 0.05, delay: 1,
  bonusGold: 20, missingHealthModel: "at-native-kill-credit" } } satisfies Pick<CombatRuneRules, "triumph">;
const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: Infinity };
function equipped(hooks?: KitHooks): FighterSpec {
  return fighter({ base: { hp: 1000 }, hooks: composeHooks(hooks, [buildTriumph(rules).hooks], [], false) });
}
function arena(enemy = fighter(), hooks?: KitHooks): World {
  return createWorld({ fighters: [equipped(hooks), enemy], distance: 300, modes: ["idle", "idle"], hp: [0.2, 1], settings: { log: true } });
}
const kill = (world: World, side: 0 | 1 = 0) => dealDamage(world, world.units[side], world.units[side === 0 ? 1 : 0], 5000, "true");
function upkeep(world: World, tick: number, side: 0 | 1 = 0): void {
  world.tick = tick;
  const unit = world.units[side], hooks = unit.spec.hooks;
  (unit.alive ? hooks?.onTick : hooks?.onTickWhileDead)?.(hookContext(world, unit));
}

describe("Triumph native snapshot and exact delayed restoration", () => {
  it("waits one second from actual credit and restores the snapshotted 65 once", () => {
    const world = arena(); world.tick = 17; kill(world);
    expect(world.units[0].hp).toBe(200); expect(world.units[0].totals.healing).toBe(0);
    upkeep(world, 46); expect(world.units[0].hp).toBe(200);
    upkeep(world, 47); expect(world.units[0].hp).toBe(265);
    upkeep(world, 48); upkeep(world, 100);
    expect(world.units[0].hp).toBe(265); expect(world.units[0].totals.healing).toBe(65);
  });

  it.each([100, 500, 900])("does not recalculate missing HP after intervening HP changes to %s", hp => {
    const world = arena(); kill(world); world.units[0].hp = hp; upkeep(world, 30);
    expect(world.units[0].hp).toBe(hp + 65); expect(world.units[0].totals.healing).toBe(65);
  });

  it("uses the native frame before a kit health award/heal and killing-packet life steal", () => {
    const world = arena(fighter(), { onKill(ctx) {
      ctx.apply({ type: "stat", stat: "health", amount: { base: 100 }, duration: 3 }, true);
      ctx.apply({ type: "heal", amount: { base: 100 } }, true);
    } });
    const unit = world.units[0]; unit.statuses.push(lasting("stat", "lifeSteal", 0.1)); world.units[1].hp = 50;
    dealDamage(world, unit, world.units[1], 100, "true", { attack: true });
    expect(unit.hp).toBe(410); expect(unit.totals.healing).toBe(110);
    upkeep(world, 30);
    expect(unit.hp).toBe(475); expect(unit.totals.healing).toBe(175);
  });

  it("does not discard the counted native event if a preceding kit changes the victim's HP", () => {
    const world = arena(fighter(), { onKill(ctx) { ctx.victim.hp = 500; } });
    kill(world); expect(world.units[1].deathNotified).toBe(true); expect(world.units[1].hp).toBe(500);
    upkeep(world, 30); expect(world.units[0].hp).toBe(265);
  });

  it("redeems at the first later upkeep without making another entitlement", () => {
    const world = arena(); kill(world); upkeep(world, 90);
    expect(world.units[0].hp).toBe(265); upkeep(world, 120); expect(world.units[0].hp).toBe(265);
    notifyKill(world, world.units[0], world.units[1]); upkeep(world, 180); expect(world.units[0].hp).toBe(265);
  });

  it("uses independently supplied numeric rules and snapshots the caller's values", () => {
    const input = { triumph: { maximumHealthRatio: 0.1, missingHealthRatio: 0.2, delay: 2,
      bonusGold: 30, missingHealthModel: "at-native-kill-credit" as const } };
    const rune = buildTriumph(input);
    input.triumph.maximumHealthRatio = 0.8; input.triumph.missingHealthRatio = 0.8; input.triumph.delay = 10;
    const spec = fighter({ base: { hp: 1000 }, hooks: rune.hooks });
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"], hp: [0.2, 1] });
    kill(world); upkeep(world, 59); expect(world.units[0].hp).toBe(200);
    upkeep(world, 60); expect(world.units[0].hp).toBe(460);
  });
});

describe("Triumph ordinary healing modifiers and receipt consumption", () => {
  it("uses healing modifiers at delivery rather than including them in the raw snapshot", () => {
    const world = arena(); kill(world);
    world.units[0].statuses.push(lasting("stat", "healingIncrease", 0.5), lasting("grievousWounds", "grievous"));
    upkeep(world, 30);
    expect(world.units[0].hp).toBeCloseTo(258.5, 12); expect(world.units[0].totals.healing).toBeCloseTo(58.5, 12);
  });

  it("does not retain a healing increase removed during the delay", () => {
    const world = arena(); world.units[0].statuses.push(lasting("stat", "healingIncrease", 0.5)); kill(world);
    world.units[0].statuses = world.units[0].statuses.filter(s => s.key !== "healingIncrease");
    upkeep(world, 30); expect(world.units[0].hp).toBe(265); expect(world.units[0].totals.healing).toBe(65);
  });

  it.each(["maximum", "fraction", "absolute"] as const)("clamps actual healing at the %s ceiling", cap => {
    const world = arena(); kill(world); const unit = world.units[0];
    if (cap === "maximum") unit.hp = 999;
    else {
      unit.hp = 499;
      unit.statuses.push(lasting("state", cap === "fraction" ? "healthCap" : "healthCapAbsolute", cap === "fraction" ? 0.5 : 500));
    }
    upkeep(world, 30); expect(unit.hp).toBe(cap === "maximum" ? 1000 : 500); expect(unit.totals.healing).toBe(1);
  });

  it("consumes an entitlement at full health instead of banking it for later damage", () => {
    const world = arena(); kill(world); world.units[0].hp = 1000; upkeep(world, 30);
    world.units[0].hp = 500; upkeep(world, 60);
    expect(world.units[0].hp).toBe(500); expect(world.units[0].totals.healing).toBe(0);
  });

  it("does not bypass noHealing as vamp or regeneration and cannot redeem it after denial ends", () => {
    const world = arena(); kill(world); world.units[0].statuses.push(lasting("state", "noHealing")); upkeep(world, 30);
    expect(world.units[0].hp).toBe(200);
    world.units[0].statuses = world.units[0].statuses.filter(s => s.key !== "noHealing"); upkeep(world, 60);
    expect(world.units[0].hp).toBe(200); expect(world.units[0].totals.healing).toBe(0);
  });

  it("does not reject a living recipient merely because it is in stasis", () => {
    const world = arena(); kill(world); world.units[0].statuses.push(lasting("state", "stasis")); upkeep(world, 30);
    expect(world.units[0].hp).toBe(265); expect(world.units[0].totals.healing).toBe(65);
  });
});

describe("Triumph body identity and native credit eligibility", () => {
  it("applies to the credited equipped side only", () => {
    const world = createWorld({ fighters: [fighter(), equipped()], distance: 300, modes: ["idle", "idle"], hp: [1, 0.2] });
    kill(world, 1); upkeep(world, 30, 1);
    expect(world.units[1].hp).toBe(265); expect(world.units[1].totals.healing).toBe(65);
    expect(world.units[0].totals.healing).toBe(0);
  });

  it("credits an owned clone's real champion kill to the owner, not the clone", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], { ...petSpec, unitClass: "clone", targetClass: "champion" }, 0);
    pet.hp = 50;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    upkeep(world, 30);
    expect(world.units[0].hp).toBe(265); expect(pet.hp).toBe(50);
    expect(Object.keys(pet.memory).some(key => key.startsWith("rune:triumph:"))).toBe(false);
  });

  it.each(["champion", "minion", "monster", "other", undefined] as const)
  ("does not turn a summon victim of targeting class %s into a champion takedown", targetClass => {
    const world = arena(), victim = spawnPet(world, world.units[1], { ...petSpec, ...(targetClass ? { targetClass } : {}) }, 300);
    damagePet(world, world.units[0], victim, 5000, "true", false); upkeep(world, 30);
    expect(world.units[0].hp).toBe(200); expect(world.units[0].totals.healing).toBe(0);
  });

  it("does not grant for natural expiry, scripted replacement, nonlethal hits or a self-kill", () => {
    const world = arena(), expired = spawnPet(world, world.units[1], { ...petSpec, duration: 0.1 }, 300);
    const removed = spawnPet(world, world.units[1], petSpec, 300); destroyPet(world, removed);
    world.tick = 4; advancePets(world); expect(world.pets).not.toContain(expired);
    dealDamage(world, world.units[0], world.units[1], 100, "true");
    dealDamage(world, world.units[1], world.units[1], 5000, "true"); upkeep(world, 40);
    expect(world.units[0].hp).toBe(200); expect(world.units[0].totals.healing).toBe(0);
  });

  it("waits through protected victim resurrection entry and credits its actual destruction once", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginResurrection(ctx.world, ctx.self, { duration: 6 }); } } });
    const world = arena(enemy); kill(world); upkeep(world, 30); expect(world.units[0].hp).toBe(200);
    kill(world); upkeep(world, 59); expect(world.units[0].hp).toBe(200);
    upkeep(world, 60); expect(world.units[0].hp).toBe(265);
    notifyKill(world, world.units[0], world.units[1]); upkeep(world, 90); expect(world.units[0].hp).toBe(265);
  });

  it("accepts a counted fallen victim even though its retained window has positive HP", () => {
    const enemy = fighter({ hooks: { onLethal(ctx) { return beginDeathDefied(ctx.world, ctx.self, { duration: 3 }); } } });
    const world = arena(enemy); kill(world);
    expect(world.units[1].hp).toBe(1); expect(world.units[1].fallen).toBe(true);
    upkeep(world, 30); expect(world.units[0].hp).toBe(265);
  });

  it("does not let copied pet contact views redeem owner state or demand fake credit", () => {
    const world = arena(), pet = spawnPet(world, world.units[0], petSpec, 0), copy = petFormulaTarget(pet, world.units[0]);
    const rune = buildTriumph(rules); world.units[1].hp = 0;
    expect(() => rune.hooks.onKill!({ ...hookContext(world, copy), victim: world.units[1] })).not.toThrow();
    world.tick = 30; rune.hooks.onTick!(hookContext(world, copy));
    expect(copy.totals.healing).toBe(0); expect(Object.keys(copy.memory).some(key => key.startsWith("rune:triumph:"))).toBe(false);
  });
});

describe("Triumph lifecycle and isolated scalar entitlement", () => {
  it.each(["dead", "dying", "fallen", "counted-dead"] as const)("creates no entitlement for a %s owner at credit", state => {
    const world = arena(), unit = world.units[0], pet = spawnPet(world, unit, petSpec, 0);
    if (state === "dead") { unit.alive = false; unit.hp = 0; }
    if (state === "dying") unit.hp = 0;
    if (state === "fallen") beginDeathDefied(world, unit, { duration: 3 });
    if (state === "counted-dead") unit.deathNotified = true;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 5000 } }], false);
    const hp = unit.hp; upkeep(world, 30);
    expect(unit.hp).toBe(hp); expect(unit.totals.healing).toBe(0);
  });

  it.each(["dead", "dying", "fallen", "counted-dead"] as const)("cancels when a pending recipient becomes %s", state => {
    const world = arena(), unit = world.units[0]; kill(world);
    if (state === "dead") { unit.alive = false; unit.hp = 0; }
    if (state === "dying") unit.hp = 0;
    if (state === "fallen") beginDeathDefied(world, unit, { duration: 3 });
    if (state === "counted-dead") unit.deathNotified = true;
    upkeep(world, 15);
    // Fixture recovery must not bank a cancelled entitlement across invalid upkeep.
    unit.alive = true; unit.hp = 200; delete unit.fallen; delete unit.deathDefied; delete unit.deathNotified;
    upkeep(world, 30); expect(unit.hp).toBe(200); expect(unit.totals.healing).toBe(0);
  });

  it("uses sticky counted death even if a fixture restores HP before the first upkeep", () => {
    const world = arena(); kill(world); world.units[0].deathNotified = true;
    upkeep(world, 30); expect(world.units[0].hp).toBe(200); expect(world.units[0].totals.healing).toBe(0);
  });

  it("allows ordinary healing on a living positive-HP attackable resurrection body", () => {
    const world = arena(), unit = world.units[0]; beginResurrection(world, unit, { duration: 3 }); unit.hp = 200;
    kill(world); upkeep(world, 30);
    expect(unit.resurrection).toBeDefined(); expect(unit.hp).toBe(265); expect(unit.totals.healing).toBe(65);
  });

  it("cancels a zero-HP protected recipient during the delay without later revival", () => {
    const world = arena(), unit = world.units[0]; kill(world); beginResurrection(world, unit, { duration: 3 });
    unit.hp = 0;
    expect(unit.resurrection).toBeDefined();
    upkeep(world, 15); unit.hp = 200; upkeep(world, 30);
    expect(unit.hp).toBe(200); expect(unit.totals.healing).toBe(0);
  });

  it("keeps entitlement and delivery independent through branch clones and repeated worlds", () => {
    const world = arena(); kill(world); const branch = cloneWorld(world);
    branch.units[0].hp = 100; upkeep(branch, 30);
    expect(branch.units[0].hp).toBe(165); expect(world.units[0].hp).toBe(200);
    upkeep(world, 30); expect(world.units[0].hp).toBe(265); expect(branch.units[0].hp).toBe(165);
    const second = arena(); upkeep(second, 30); expect(second.units[0].hp).toBe(200); expect(second.units[0].totals.healing).toBe(0);
  });

  it("cannot transfer a side-local entitlement into a replacement Unit", () => {
    const world = arena(); kill(world); const old = world.units[0], replacement = arena().units[0];
    world.units[0] = replacement; upkeep(world, 30);
    old.spec.hooks!.onTick!(hookContext(world, old));
    expect(replacement.hp).toBe(200); expect(replacement.totals.healing).toBe(0); expect(old.totals.healing).toBe(0);
  });

  it("retains a fixed raw entitlement through an ordinary same-body form change", () => {
    const spec = equipped(), small: FighterSpec = { ...spec, form: "small" }, large: FighterSpec = { ...spec, base: { ...spec.base, hp: 2000 }, form: "large" };
    small.forms = large.forms = { small, large };
    const world = createWorld({ fighters: [small, fighter()], distance: 300, modes: ["idle", "idle"], hp: [0.2, 1] });
    kill(world); setForm(world, world.units[0], "large"); expect(world.units[0].hp).toBe(400);
    upkeep(world, 30); expect(world.units[0].hp).toBe(465); expect(world.units[0].totals.healing).toBe(65);
  });
});

describe("Triumph validated source rules and explicit scope", () => {
  it("fails closed on a missing or mutable native frame instead of reading callback HP", () => {
    const world = arena(), rune = buildTriumph(rules); world.units[1].hp = 0;
    expect(() => rune.hooks.onKill!({ ...hookContext(world, world.units[0]), victim: world.units[1] })).toThrow(/immutable native kill-credit/);
  });

  it.each(["maximumHealthRatio", "missingHealthRatio"] as const)("rejects invalid %s", field => {
    for (const value of [0, -1, NaN, Infinity, 1.1]) {
      expect(() => buildTriumph({ triumph: { ...rules.triumph, [field]: value } })).toThrow(/positive finite/);
    }
  });

  it("rejects invalid timing, economic references, absent rules and incompatible snapshot policies", () => {
    for (const delay of [0, -1, NaN, Infinity]) expect(() => buildTriumph({ triumph: { ...rules.triumph, delay } })).toThrow(/positive finite/);
    for (const delay of [Number.MIN_VALUE, Number.MAX_VALUE]) expect(() => buildTriumph({ triumph: { ...rules.triumph, delay } })).toThrow(/safe-integer ticks/);
    for (const bonusGold of [0, -1, 1.5, NaN, Infinity]) expect(() => buildTriumph({ triumph: { ...rules.triumph, bonusGold } })).toThrow(/economic reference/);
    expect(() => buildTriumph({} as Pick<CombatRuneRules, "triumph">)).toThrow(/reviewed numeric rules/);
    expect(() => buildTriumph({ triumph: { ...rules.triumph, missingHealthModel: "at-delivery" } } as unknown as Pick<CombatRuneRules, "triumph">)).toThrow(/snapshot policy/);
  });

  it("states the native phase, lifecycle, gold and bounded-queue policies without granting combat gold", () => {
    const world = arena(), before = structuredClone(world.units[0].spec.bonus); kill(world); upkeep(world, 30);
    expect(world.units[0].spec.bonus).toEqual(before);
    const assumptions = buildTriumph(rules).assumptions.join(" ");
    expect(assumptions).toContain("before composed onKill callbacks"); expect(assumptions).toContain("20 extra gold");
    expect(assumptions).toContain("neither awarded nor added"); expect(assumptions).toContain("single-hostile-body");
    expect(assumptions).toContain("unmeasured"); expect(assumptions).toContain("not prolong");
  });
});
