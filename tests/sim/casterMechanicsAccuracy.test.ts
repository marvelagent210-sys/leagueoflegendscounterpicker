import { describe, expect, it } from "vitest";
import { advanceZones, canCast, completeCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, KitHooks } from "../../engine/sim/spec";
import { cloneWorld, type Action, type Unit, type World } from "../../engine/sim/state";
import { idle } from "./helpers";
import { ability, fighter } from "./kits";

const damage = { type: "damage" as const, damageType: "true" as const, amount: { base: 100 } };
const simple = (spec: Partial<AbilitySpec> = {}) => ability({ key: "Q", delivery: { kind: "self" }, ...spec });

function setup(abilities: AbilitySpec[] = [], hooks?: KitHooks, enemy: FighterSpec = fighter()): World {
  const world = createWorld({ fighters: [fighter({ base: { resource: 500 }, abilities, hooks }), enemy], distance: 300, modes: ["idle", "idle"] });
  world.units[0].x = 0;
  world.units[1].x = 300;
  return world;
}

function completeAt(world: World, tick: number): void {
  world.tick = tick;
  step(world, [idle, idle]);
}

function channel(world: World, unit: Unit, interruptible = true): Action {
  unit.spec = { ...unit.spec, abilities: [simple({ key: "channel", channel: { duration: 5, interruptible } })] };
  const action: Action = { kind: "channel", ability: "channel", startTick: 0, endTick: 150, nextTick: 150, intervalTicks: 150 };
  unit.action = action;
  return action;
}

function dash(unit: Unit, unstoppable = false, resume?: Action): Action {
  const action: Action = { kind: "dash", ability: "dash", startTick: 0, endTick: 30, perTick: 20, stopAtContact: false, unstoppable, ...(resume ? { resume } : {}) };
  unit.action = action;
  return action;
}

describe("shared caster declaration, interruption and targeting rules", () => {
  it.each(["resource", "health"] as const)("captures a dynamic %s cost before a cast-start hook changes it, including cloned casts", (costType) => {
    const q = simple({ castTime: 0.25, costType, costFor: (unit) => Number(unit.memory.price) });
    const world = setup([q], { onCastStart: ({ memory }) => { memory.price = 200; } });
    const caster = world.units[0];
    caster.memory.price = 50;
    expect(canCast(world, caster, q)).toBe(true);
    startCast(world, caster, q);
    expect(caster.action).toMatchObject({ kind: "cast", endTick: 8, cost: 50 });
    expect(caster.memory.price).toBe(200);
    const branch = cloneWorld(world);
    caster.memory.price = 400;
    branch.units[0].memory.price = 450;
    completeAt(world, 8);
    completeAt(branch, 8);
    for (const unit of [caster, branch.units[0]]) {
      expect(unit.resource).toBe(costType === "resource" ? 450 : 500);
      expect(unit.hp).toBe(costType === "health" ? 1950 : 2000);
      expect(unit.cooldownReady.Q).toBe(308);
    }
  });

  it("a target leaving range cancels a declared dynamic-cost spell without payment or cooldown", () => {
    const q = simple({ delivery: { kind: "target", range: 500 }, castTime: 0.25, cancelOnInvalidTarget: true, costFor: (unit) => Number(unit.memory.price), onHit: [damage] });
    const world = setup([q], { onCastStart: ({ memory }) => { memory.price = 400; } });
    world.units[0].memory.price = 50;
    startCast(world, world.units[0], q);
    world.units[1].x = 1000;
    completeAt(world, 8);
    expect(world.units[0].resource).toBe(500);
    expect(world.units[0].cooldownReady.Q).toBeUndefined();
    expect(world.units[0].action).toBeUndefined();
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("notifies once at declaration for a cast, instant overlay and recast, with no completion or basic-attack duplicates", () => {
    const seen: string[] = [];
    const q = simple({ castTime: 0.25 });
    const overlay = simple({ key: "E", overlay: true });
    const recast = simple({ key: "Q2", chain: { root: "Q", index: 2, window: 2 } });
    const enemy = fighter({ hooks: { onEnemyCast: ({ ability, caster }) => seen.push(`${ability.key}:${caster.side}`) } });
    const world = setup([q, overlay, recast], undefined, enemy);
    startCast(world, world.units[0], q);
    const declared = world.units[0].action;
    expect(canCast(world, world.units[0], overlay)).toBe(true);
    startCast(world, world.units[0], overlay);
    expect(world.units[0].action).toBe(declared);
    completeAt(world, 8);
    expect(canCast(world, world.units[0], recast)).toBe(true);
    startCast(world, world.units[0], recast);
    world.units[1].x = 100;
    startAttack(world, world.units[0]);
    launchAttack(world, world.units[0]);
    expect(seen).toEqual(["Q:0", "E:0", "Q2:0"]);
  });

  it("retains activation classification so a receiver can exclude toggles, transformations and internal activations", () => {
    const activations: string[] = [];
    let qualifying = 0;
    const enemy = fighter({ hooks: { onEnemyCast: ({ ability }) => {
      activations.push(ability.activation ?? "cast");
      if (!ability.activation || ability.activation === "cast") qualifying++;
    } } });
    const spells = [simple(), simple({ key: "W", activation: "cast" }), simple({ key: "E", activation: "toggle" }), simple({ key: "R", activation: "transformation" }), simple({ key: "internal", activation: "internal" })];
    const world = setup(spells, undefined, enemy);
    for (const spell of spells) startCast(world, world.units[0], spell);
    completeCast(world, world.units[0], spells[4]!, world.tick);
    expect(activations).toEqual(["cast", "cast", "toggle", "transformation", "internal"]);
    expect(qualifying).toBe(2);
  });

  it("failed affordability emits no declaration event", () => {
    let declarations = 0;
    const q = simple({ costFor: () => 501 });
    const world = setup([q], undefined, fighter({ hooks: { onEnemyCast: () => { declarations++; } } }));
    step(world, [() => ({ kind: "cast", ability: "Q" }), idle]);
    expect(declarations).toBe(0);
    expect(world.units[0].resource).toBe(500);
  });

  it("disrupt interrupts an eligible channel without a lasting CC status and permits another ordinary cast", () => {
    const interruptions: string[] = [];
    const world = setup([], undefined, fighter({ hooks: { onChannelInterrupt: ({ reason }) => interruptions.push(reason) } }));
    channel(world, world.units[1]);
    applyEffect(world, world.units[0], world.units[1], { type: "disrupt" }, { scale: 1 });
    expect(world.units[1].action).toBeUndefined();
    expect(world.units[1].statuses).toEqual([]);
    expect(interruptions).toEqual(["cc"]);
    expect(canCast(world, world.units[1], simple())).toBe(true);
  });

  it("disrupt preserves ordinary cast times and explicitly uninterruptible channels", () => {
    const world = setup();
    const casting: Action = { kind: "cast", ability: "ordinary", startTick: 0, endTick: 8, cost: 0 };
    world.units[1].action = casting;
    applyEffect(world, world.units[0], world.units[1], { type: "disrupt" }, { scale: 1 });
    expect(world.units[1].action).toBe(casting);
    const protectedChannel = channel(world, world.units[1], false);
    applyEffect(world, world.units[0], world.units[1], { type: "disrupt" }, { scale: 1 });
    expect(world.units[1].action).toBe(protectedChannel);
    expect(world.units[1].statuses).toEqual([]);
  });

  it.each(["ccImmune", "stasis", "untargetable"])("%s guards immediate disruption", (state) => {
    const world = setup();
    const action = channel(world, world.units[1]);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: state as "ccImmune" | "stasis" | "untargetable", duration: 1 }, { scale: 1 });
    applyEffect(world, world.units[0], world.units[1], { type: "disrupt" }, { scale: 1 });
    expect(world.units[1].action).toBe(action);
  });

  it.each(["spellShield", "parry"] as const)("a %s can negate an incoming disrupt packet", (state) => {
    const hit = simple({ delivery: { kind: "target", range: 500 }, onHit: [{ type: "disrupt" }] });
    const world = setup([hit]);
    const action = channel(world, world.units[1]);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 1 }, { scale: 1 });
    abilityHit(world, world.units[0], world.units[1], hit, hit.onHit!);
    expect(world.units[1].action).toBe(action);
  });

  it("Black Shield guards disruption through the packet that breaks its shield", () => {
    const hit = simple({ delivery: { kind: "target", range: 500 }, onHit: [{ ...damage, damageType: "magic" }, { type: "disrupt" }] });
    const world = setup([hit]);
    const action = channel(world, world.units[1]);
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 10 }, duration: 1, shieldType: "magic", blackShield: true }, { scale: 1 });
    abilityHit(world, world.units[0], world.units[1], hit, hit.onHit!);
    expect(world.units[1].statuses.some((s) => s.kind === "shield")).toBe(false);
    expect(world.units[1].action).toBe(action);
    applyEffect(world, world.units[0], world.units[1], { type: "disrupt" }, { scale: 1 });
    expect(world.units[1].action).toBeUndefined();
  });

  it("knockdown restores a dash's underlying cast and emits one interrupt without invented airborne", () => {
    const interrupted: boolean[] = [];
    const world = setup([], undefined, fighter({ abilities: [simple({ key: "dash" })], hooks: { onDashEnd: ({ interrupted: value }) => interrupted.push(value) } }));
    const resume: Action = { kind: "cast", ability: "underlying", startTick: 0, endTick: 8, cost: 40 };
    dash(world.units[1], false, resume);
    applyEffect(world, world.units[0], world.units[1], { type: "knockdown" }, { scale: 1 });
    expect(world.units[1].action).toBe(resume);
    expect(world.units[1].statuses).toEqual([]);
    expect(world.units[1].forced).toBeUndefined();
    expect(interrupted).toEqual([true]);
  });

  it("knockdown preserves an unstoppable dash", () => {
    const world = setup();
    const action = dash(world.units[1], true);
    applyEffect(world, world.units[0], world.units[1], { type: "knockdown" }, { scale: 1 });
    expect(world.units[1].action).toBe(action);
    expect(world.units[1].statuses).toEqual([]);
  });

  it.each(["ccImmune", "displacementImmune", "stasis", "untargetable"] as const)("%s guards an otherwise interruptible dash against knockdown", (state) => {
    const world = setup();
    const action = dash(world.units[1]);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state, duration: 1 }, { scale: 1 });
    applyEffect(world, world.units[0], world.units[1], { type: "knockdown" }, { scale: 1 });
    expect(world.units[1].action).toBe(action);
  });

  it("Black Shield guards knockdown without consuming it or adding airborne", () => {
    const world = setup();
    const action = dash(world.units[1]);
    applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 10 }, duration: 1, shieldType: "magic", blackShield: true }, { scale: 1 });
    applyEffect(world, world.units[0], world.units[1], { type: "knockdown" }, { scale: 1 });
    expect(world.units[1].action).toBe(action);
    expect(world.units[1].statuses).toHaveLength(1);
    expect(world.units[1].statuses[0]!.value).toBe(10);
  });

  it("only an opted-in slow bypasses slow immunity, and it actually reduces derived movement speed", () => {
    const world = setup();
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "slowImmune", duration: 2 }, { scale: 1 });
    const slow = { type: "cc" as const, cc: "slow" as const, duration: 1, strength: 0.65 };
    applyEffect(world, world.units[0], world.units[1], slow, { scale: 1 });
    expect(derive(world.units[1]).moveSpeed).toBe(350);
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false);
    applyEffect(world, world.units[0], world.units[1], { ...slow, bypassSlowImmune: true }, { scale: 1 });
    expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(true);
    expect(derive(world.units[1]).moveSpeed).toBeCloseTo(171.25, 10);
    expect(world.units[1].statuses.some((s) => s.key === "slowImmune")).toBe(true);
  });

  it("the slow-immunity exception still respects CC immunity and Black Shield", () => {
    const slow = { type: "cc" as const, cc: "slow" as const, duration: 1, strength: 0.65, bypassSlowImmune: true };
    for (const guard of ["cc", "shield"] as const) {
      const world = setup();
      if (guard === "cc") applyEffect(world, world.units[1], world.units[1], { type: "state", state: "ccImmune", duration: 1 }, { scale: 1 });
      else applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 10 }, duration: 1, shieldType: "magic", blackShield: true }, { scale: 1 });
      applyEffect(world, world.units[0], world.units[1], slow, { scale: 1 });
      expect(world.units[1].statuses.some((s) => s.key === "slow")).toBe(false);
    }
  });

  it("ordinary targeted casts drop on visibility loss without payment", () => {
    const q = simple({ delivery: { kind: "target", range: 500 }, castTime: 0.25, cost: 50, cancelOnInvalidTarget: true, onHit: [damage] });
    const world = setup([q]);
    startCast(world, world.units[0], q);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 1 }, { scale: 1 });
    expect(world.units[0].action).toBeUndefined();
    completeAt(world, 8);
    expect(world.units[0].resource).toBe(500);
    expect(world.units[0].cooldownReady.Q).toBeUndefined();
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("visibility retention preserves the declared targeted cast and lets it hit an invisible target", () => {
    const q = simple({ delivery: { kind: "target", range: 500 }, castTime: 0.25, cost: 50, cancelOnInvalidTarget: true, retainTargetOnVisibilityLoss: true, onHit: [damage] });
    const world = setup([q]);
    startCast(world, world.units[0], q);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "invisible", duration: 1 }, { scale: 1 });
    expect(world.units[0].action?.kind).toBe("cast");
    completeAt(world, 8);
    expect(world.units[0].resource).toBe(450);
    expect(world.units[1].totals.damageTaken).toBe(100);
  });

  it("visibility retention alone does not preserve a cast through untargetability", () => {
    const q = simple({ delivery: { kind: "target", range: 500 }, castTime: 0.25, cost: 50, cancelOnInvalidTarget: true, retainTargetOnVisibilityLoss: true, onHit: [damage] });
    const world = setup([q]);
    startCast(world, world.units[0], q);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "untargetable", duration: 1 }, { scale: 1 });
    expect(world.units[0].action).toBeUndefined();
    completeAt(world, 8);
    expect(world.units[0].resource).toBe(500);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("full retention completes through untargetability, paying its cost while contact defenses still deny damage", () => {
    const completed: string[] = [];
    const q = simple({ delivery: { kind: "target", range: 500 }, castTime: 0.25, cost: 50, cancelOnInvalidTarget: true, retainTargetOnInvalidation: true, onHit: [damage] });
    const world = setup([q], { onCast: ({ ability }) => completed.push(ability.key) });
    startCast(world, world.units[0], q);
    applyEffect(world, world.units[1], world.units[1], { type: "state", state: "untargetable", duration: 1 }, { scale: 1 });
    expect(world.units[0].action?.kind).toBe("cast");
    completeAt(world, 8);
    expect(completed).toEqual(["Q"]);
    expect(world.units[0].resource).toBe(450);
    expect(world.units[0].cooldownReady.Q).toBe(308);
    expect(world.units[1].totals.damageTaken).toBe(0);
  });
});

describe("cast-start ground delivery and persistent facing", () => {
  it("declares a single ground area before cast completion and its landing survives the caster's death", () => {
    const q = simple({ castTime: 0.25, deliveryAtCastStart: true, delivery: { kind: "circle", range: 500, radius: 200, delay: 0.5 }, onHit: [damage] });
    const world = setup([q], undefined, fighter({ base: { moveSpeed: 0 } }));
    startCast(world, world.units[0], q);
    expect(world.zones).toHaveLength(1);
    expect(world.zones[0]).toMatchObject({ kind: "delayedArea", seenTick: 0, endTick: 15 });
    completeAt(world, 8);
    expect(world.zones).toHaveLength(1);
    expect(world.units[1].totals.damageTaken).toBe(0);
    world.units[0].hp = 0;
    world.units[0].alive = false;
    world.tick = 15;
    advanceZones(world);
    expect(world.units[1].totals.damageTaken).toBe(100);
    expect(world.zones).toEqual([]);
  });

  it("keeps an early damaging ground delivery pending after death and permits its later draw", () => {
    const q = simple({ castTime: 0.25, deliveryAtCastStart: true, delivery: { kind: "circle", range: 500, radius: 200, delay: 0.2 }, onHit: [{ ...damage, amount: { base: 1000 } }] });
    const source = fighter({ base: { hp: 1, armor: 0 }, abilities: [q] });
    const target = fighter({ base: { hp: 500, moveSpeed: 0, ad: 10, windup: { percent: 0, modifier: 1 } }, attack: { range: 500 } });
    const world = createWorld({ fighters: [source, target], distance: 100, modes: ["idle", "idle"], settings: { maxSeconds: 1 } });
    startCast(world, world.units[0], q);
    const outcome = runWorld(world, [idle, (view) => view.world.tick === 0 ? { kind: "attack" } : undefined]);
    expect(outcome.draw).toBe(1);
    expect(outcome.win).toEqual([0, 0]);
    expect(outcome.seconds).toBeCloseTo(0.2, 12);
  });

  it("ordinary death with no opted-in pending damage ends immediately", () => {
    const world = setup();
    world.units[0].hp = 0;
    world.units[0].alive = false;
    step(world, [idle, idle]);
    expect(world.result).toMatchObject({ winner: 1, reason: "death", tick: 0 });
  });

  it("onZoneLand can convert a delayed area into a pulsing field exactly once", () => {
    let landings = 0;
    const q = simple({ delivery: { kind: "circle", range: 500, radius: 200, delay: 0.5 }, onHit: [damage] });
    const world = setup([q], { onZoneLand: ({ tick, zone }) => {
      landings++;
      zone.kind = "field";
      zone.startTick = tick;
      zone.endTick = tick + 30;
      zone.interval = 15;
      zone.nextTick = tick;
    } }, fighter({ base: { moveSpeed: 0 } }));
    startCast(world, world.units[0], q);
    world.tick = 15;
    advanceZones(world);
    expect(landings).toBe(1);
    expect(world.units[1].totals.damageTaken).toBe(100);
    expect(world.zones[0]!.kind).toBe("field");
    world.tick = 30;
    advanceZones(world);
    expect(landings).toBe(1);
    expect(world.units[1].totals.damageTaken).toBe(200);
    world.tick = 45;
    advanceZones(world);
    expect(world.zones).toEqual([]);
  });

  it("actual voluntary movement turns facing, which persists while idle even when the enemy crosses", () => {
    const world = setup();
    const source = world.units[0];
    source.facing = 1;
    step(world, [() => ({ kind: "move", direction: -1 }), idle]);
    expect(source.x).toBeLessThan(0);
    expect(source.facing).toBe(-1);
    source.move = 0;
    world.units[1].x = -300;
    step(world, [idle, idle]);
    expect(source.facing).toBe(-1);
  });

  it("a prevented walking command does not turn a rooted champion", () => {
    const world = setup();
    const source = world.units[0];
    source.facing = 1;
    applyEffect(world, world.units[1], source, { type: "cc", cc: "root", duration: 1 }, { scale: 1 });
    step(world, [() => ({ kind: "move", direction: -1 }), idle]);
    expect(source.x).toBe(0);
    expect(source.facing).toBe(1);
  });

  it("forced movement preserves the champion's previous facing", () => {
    const world = setup();
    const source = world.units[0];
    source.facing = -1;
    source.forced = { endTick: 10, perTick: 30, over: true };
    step(world, [idle, idle]);
    expect(source.x).toBe(30);
    expect(source.facing).toBe(-1);
  });

  it("an attack declaration faces its actual champion or pet target", () => {
    const world = setup();
    const source = world.units[0];
    source.facing = -1;
    startAttack(world, source);
    expect(source.facing).toBe(1);
    source.action = undefined;
    const pet = spawnPet(world, world.units[1], { kind: "test", name: "Test", hp: 100, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: Infinity }, -100);
    startAttack(world, source, pet);
    expect(source.facing).toBe(-1);
  });

  it("a cast retains its explicit aimed facing through completion and subsequent idle ticks", () => {
    const q = simple({ castTime: 0.25 });
    const world = setup([q]);
    startCast(world, world.units[0], q, { direction: -1 });
    expect(world.units[0].facing).toBe(-1);
    completeAt(world, 8);
    expect(world.units[0].facing).toBe(-1);
    world.units[1].x = -300;
    completeAt(world, 9);
    expect(world.units[0].facing).toBe(-1);
  });
});
