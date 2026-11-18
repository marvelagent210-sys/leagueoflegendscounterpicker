import { describe, expect, it } from "vitest";
import { cancelOutOfRange, launchAttack, launchBonusAttack, startAttack } from "../../engine/sim/actions";
import { attackHit, captureMovementObserved, notifyActualMovement, notifyMovementObserved, observeMovementSegment, withMovementTransition } from "../../engine/sim/combat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { ActualMovement, BasicAttackLaunchedSnapshot, KitHooks, MovementSnapshot, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import { composeHooks } from "../../items/equip";
import { lasting } from "./helpers";
import { fighter } from "./kits";

const petSpec: PetSpec = { kind: "fixture", name: "Fixture pet", hp: 1000, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: Infinity };
const arena = (hooks?: KitHooks, enemyHooks?: KitHooks): World => createWorld({ fighters: [
  fighter({ id: "source", base: { hp: 10000, armor: 0, mr: 0 }, hooks }),
  fighter({ id: "target", base: { hp: 10000, armor: 0, mr: 0 }, hooks: enemyHooks }),
], distance: 0, modes: ["idle", "idle"] });
function launch(world: World): void {
  startAttack(world, world.units[0]);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("Expected native windup");
  world.tick = action.launchTick;
  launchAttack(world, world.units[0], action);
}
function move(world: World, to: number, metadata: Partial<Omit<ActualMovement, "from" | "to">> = {}): void {
  const target = world.units[0], from = target.x;
  target.x = to;
  notifyActualMovement(world, target, from, { kind: "walk", endTick: world.tick, ended: false, ...metadata });
}

describe("immutable completed-basic-windup observations", () => {
  it("observes completion rather than declaration, before legacy immediate replacement contact", () => {
    const order: string[] = [], events: BasicAttackLaunchedSnapshot[] = [];
    const world = arena({
      onBasicAttackLaunched(ctx) { order.push("completed"); events.push(ctx.launch); ctx.memory.completed = true; },
      onAttackLaunch(ctx) {
        order.push("legacy-launch"); expect(ctx.memory.completed).toBe(true);
        attackHit(ctx.world, ctx.self, ctx.enemy, false, []);
        return false;
      },
      onResolvedOnHit() { order.push("contact"); },
    });
    startAttack(world, world.units[0]); expect(events).toHaveLength(0);
    const action = world.units[0].action;
    if (action?.kind !== "windup") throw new Error("Expected windup");
    action.attackTag = "declared-target"; world.tick = action.launchTick;
    launchAttack(world, world.units[0], action);
    expect(order).toEqual(["completed", "legacy-launch", "contact"]);
    expect(events[0]).toMatchObject({ tick: action.launchTick, sequence: 1, blinded: false, attackTag: "declared-target",
      source: { side: 0, fighterId: "source", kind: "champion" }, target: { side: 1, fighterId: "target", kind: "champion" } });
    launchAttack(world, world.units[0]); expect(events).toHaveLength(1);
  });

  it("does not emit for an out-of-range canceled windup or an independently launched bonus attack", () => {
    const events: BasicAttackLaunchedSnapshot[] = [];
    const world = arena({ onBasicAttackLaunched(ctx) { events.push(ctx.launch); } });
    startAttack(world, world.units[0]); world.units[1].x = 10000;
    cancelOutOfRange(world, world.units[0]); launchAttack(world, world.units[0]);
    expect(events).toHaveLength(0);
    launchBonusAttack(world, world.units[0], world.units[1]);
    expect(events).toHaveLength(0); expect(world.combatEventSequence).toBeUndefined();
  });

  it.each(["blind", "dodgeAttacks", "blockAttacks", "parry", "stasis", "untargetable", "dead"])("retains completed windups before eventual %s impact denial", defense => {
    const events: BasicAttackLaunchedSnapshot[] = [];
    const world = arena({ onBasicAttackLaunched(ctx) { events.push(ctx.launch); } });
    if (defense === "blind") world.units[0].statuses.push(lasting("cc", "blind"));
    startAttack(world, world.units[0]);
    const action = world.units[0].action;
    if (action?.kind !== "windup") throw new Error("Expected windup");
    if (defense === "dead") world.units[1].alive = false;
    else if (defense !== "blind") world.units[1].statuses.push(lasting("state", defense));
    world.tick = action.launchTick; launchAttack(world, world.units[0], action);
    expect(events).toHaveLength(1); expect(events[0]!.blinded).toBe(defense === "blind");
  });

  it("does not fabricate a champion target when the declared pet has disappeared", () => {
    const events: BasicAttackLaunchedSnapshot[] = [];
    const world = arena({ onBasicAttackLaunched(ctx) { events.push(ctx.launch); } });
    const pet = spawnPet(world, world.units[1], petSpec, world.units[0].x + 20);
    startAttack(world, world.units[0], pet);
    const action = world.units[0].action;
    if (action?.kind !== "windup") throw new Error("Expected pet windup");
    world.pets = []; world.tick = action.launchTick;
    launchAttack(world, world.units[0], action);
    expect(events).toHaveLength(1); expect(events[0]!.declaredPetId).toBe(pet.id);
    expect(events[0]!.target).toBeUndefined(); expect(world.units[1].totals.damageTaken).toBe(0);
  });

  it("freezes completed facts across composed observers and later legacy mutations", () => {
    const events: BasicAttackLaunchedSnapshot[] = [];
    const hooks = composeHooks({ onBasicAttackLaunched(ctx) {
      expect(Object.isFrozen(ctx.launch)).toBe(true); expect(Object.isFrozen(ctx.launch.source)).toBe(true);
      expect(Object.isFrozen(ctx.launch.target)).toBe(true);
      expect(Reflect.set(ctx, "launch", {})).toBe(false); expect(Reflect.set(ctx.launch.source, "fighterId", "fake")).toBe(false);
      ctx.self.spec = { ...ctx.self.spec, id: "changed" }; events.push(ctx.launch);
    }, onAttackLaunch(ctx) { ctx.enemy.spec = { ...ctx.enemy.spec, id: "changed-target" }; return false; } }, [{
      onBasicAttackLaunched(ctx) { events.push(ctx.launch); expect(ctx.launch.source.fighterId).toBe("source"); },
    }], [], false);
    const world = arena(hooks); launch(world);
    expect(events).toHaveLength(2); expect(events[0]).toBe(events[1]); expect(events[0]!.target!.fighterId).toBe("target");
  });

  it("has no observational counter allocation when launch hooks are absent", () => {
    const world = arena(); launch(world); expect(world.combatEventSequence).toBeUndefined();
  });
});

describe("immutable actual movement segments", () => {
  it("records cumulative same-tick out-and-back travel before mutable legacy observers can alter facts", () => {
    const events: MovementSnapshot[] = [], order: string[] = [];
    const world = arena({ onActualMovement(ctx) {
      order.push("legacy"); ctx.movement.from = -900; ctx.movement.to = 900;
    }, onMovementObserved(ctx) { order.push("immutable"); events.push(ctx.movementEvent); } });
    const start = world.units[0].x; move(world, start + 24); move(world, start);
    expect(order).toEqual(["legacy", "immutable", "legacy", "immutable"]);
    expect(events.map(event => [event.from, event.to])).toEqual([[start, start + 24], [start + 24, start]]);
    expect(events.reduce((sum, event) => sum + Math.abs(event.to - event.from), 0)).toBe(48);
    expect(events.map(event => event.sequence)).toEqual([1, 2]);
  });

  it("captures queued end endpoints/tick before later body or callback mutations", () => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    const start = world.units[0].x;
    withMovementTransition(world, () => {
      move(world, start + 60, { kind: "dash", startTick: 0, endTick: 3, ended: true, ability: "Q" });
      expect(events).toHaveLength(0);
      world.units[0].x = start + 200; world.tick = 7;
    });
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ tick: 0, from: start, to: start + 60, kind: "dash", startTick: 0, endTick: 3, ended: true, ability: "Q" });
  });

  it("freezes nested body facts and the context reference across composed observers", () => {
    const events: MovementSnapshot[] = [];
    const hooks = composeHooks({ onMovementObserved(ctx) {
      expect(Object.isFrozen(ctx.movementEvent)).toBe(true); expect(Object.isFrozen(ctx.movementEvent.body)).toBe(true);
      expect(Reflect.set(ctx, "movementEvent", {})).toBe(false); expect(Reflect.set(ctx.movementEvent, "to", 999)).toBe(false);
      expect(Reflect.set(ctx.movementEvent.body, "fighterId", "fake")).toBe(false);
      ctx.memory.sawSegment = true; events.push(ctx.movementEvent);
    } }, [{ onMovementObserved(ctx) { expect(ctx.memory.sawSegment).toBe(true); events.push(ctx.movementEvent); } }], [], false);
    const world = arena(hooks); move(world, world.units[0].x + 10);
    expect(events[0]).toBe(events[1]);
  });

  it.each(["walk", "dash", "forced", "blink", "attached"] as const)("preserves the actual %s segment kind without inventing extra travel", kind => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    const from = world.units[0].x; move(world, from + 24, { kind });
    expect(events).toHaveLength(1); expect(events[0]).toMatchObject({ kind, from, to: from + 24 });
    move(world, from + 24, { kind, ended: true });
    expect(events.reduce((sum, event) => sum + Math.abs(event.to - event.from), 0)).toBe(24);
    expect(events).toHaveLength(kind === "walk" ? 1 : 2);
  });

  it("supports explicit direct-kit segments without invoking legacy movement callbacks", () => {
    const events: MovementSnapshot[] = [];
    let legacy = 0;
    const world = arena({ onActualMovement() { legacy++; }, onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    const self = world.units[0], from = self.x; self.x += 100;
    observeMovementSegment(world, self, from, { kind: "blink", ended: true, endTick: world.tick, ability: "E" });
    expect(legacy).toBe(0); expect(events).toHaveLength(1); expect(events[0]).toMatchObject({ from, to: from + 100, ability: "E" });
  });

  it("lets callers capture before their own effects and dispatch the same immutable segment afterward", () => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    const self = world.units[0], from = self.x; self.x += 5;
    const snapshot = captureMovementObserved(world, self, from, { kind: "forced", ended: false, endTick: 10 });
    self.x += 100; notifyMovementObserved(world, snapshot);
    expect(events).toEqual([snapshot]); expect(events[0]!.to).toBe(from + 5);
  });

  it.each([undefined, "clone"] as const)("reports actual pet/clone body identity (class %s), even from a temporary view", unitClass => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    const pet = spawnPet(world, world.units[0], { ...petSpec, ...(unitClass ? { unitClass } : {}) }, 30);
    const target = petFormulaTarget(pet, world.units[1], world.tick), from = target.x;
    target.x += 10; delete target.petId;
    notifyActualMovement(world, target, from, { kind: "walk", endTick: 0, ended: false }, pet);
    expect(events).toHaveLength(1); expect(events[0]!.body).toMatchObject({ side: 0, kind: unitClass ?? "pet", petId: pet.id });
  });

  it("keeps the explicit dead-observer opt-in and no extra world continuation", () => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    world.units[0].alive = false; move(world, world.units[0].x + 24); expect(events).toHaveLength(0);
    world.units[0].spec.hooks!.movementEventsAfterDeath = true;
    move(world, world.units[0].x + 24); expect(events).toHaveLength(1); expect(world.result).toBeUndefined();
  });

  it("copies branch-local primitive sequences while keeping gameplay IDs independent", () => {
    const events: MovementSnapshot[] = [];
    const world = arena({ onMovementObserved(ctx) { events.push(ctx.movementEvent); } });
    move(world, world.units[0].x + 2); const gameplayId = world.nextId;
    const a = cloneWorld(world), b = cloneWorld(world);
    move(a, a.units[0].x + 24); move(b, b.units[0].x + 48);
    expect(events.map(event => event.sequence)).toEqual([1, 2, 2]);
    expect(world.combatEventSequence).toBe(1); expect(a.nextId).toBe(gameplayId); expect(b.nextId).toBe(gameplayId);
    expect(a.units[0].x).not.toBe(b.units[0].x);
  });

  it("does not allocate a counter or invoke legacy hooks from unsubscribed direct reports", () => {
    let legacy = 0;
    const world = arena({ onActualMovement() { legacy++; } });
    observeMovementSegment(world, world.units[0], 0, { kind: "blink", ended: true, endTick: 0 });
    expect(world.combatEventSequence).toBeUndefined(); expect(legacy).toBe(0);
  });
});
