import { describe, expect, it } from "vitest";
import { startAttack, startCast } from "../../engine/sim/actions";
import { createWorld, step } from "../../engine/sim/simulate";
import { DEFAULT_ENVIRONMENT } from "../../engine/sim/state";
import { AROUND, aroundFactor, exitTerrain, terrainLimit } from "../../engine/sim/terrain";
import { fighter, ability } from "./kits";
import { idle, lasting } from "./helpers";

const arena = () => createWorld({ fighters: [fighter(), fighter()], distance: 1000, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, walls: false, minions: false } } });

describe("terrain-crossing flight boundaries", () => {
  it.each([false, true])("flight=%s scopes ghosting through champion collision", (flying) => {
    const w = arena(), self = w.units[0]; w.units[1].x = 200;
    self.statuses.push(lasting("state", "ghosted"));
    if (flying) self.statuses.push(lasting("state", "terrainIgnore"));
    for (let tick = 0; tick < 15; tick++) step(w, [() => ({ kind: "move", direction: 1 }), idle]);
    expect(self.x).toBeCloseTo(flying ? 350 / 30 * 15 : 130, 8);
  });
  it("crosses blocking terrain only for opted-in voluntary walking", () => {
    const w = arena(), self = w.units[0];
    w.terrain.push({ id: 1, owner: 1, from: 40, to: 100, endTick: 100 });
    expect(terrainLimit(w, self, 80, true)).toBe(5);
    self.statuses.push(lasting("state", "terrainIgnore"));
    expect(terrainLimit(w, self, 80, true)).toBe(80);
    expect(terrainLimit(w, self, 80, false)).toBe(5);
  });
  it("retains full flight speed across round obstacles", () => {
    const w = arena(), self = w.units[0];
    w.terrain.push({ id: 1, owner: 1, from: 40, to: 100, endTick: 100, round: true });
    expect(aroundFactor(w, self, 20)).toBe(AROUND);
    self.statuses.push(lasting("state", "terrainIgnore"));
    expect(aroundFactor(w, self, 20)).toBe(1);
  });
  it("lands at the nearest clear boundary of overlapping expanded walls", () => {
    const w = arena(), self = w.units[0];
    w.terrain.push({ id: 1, owner: 1, from: 0, to: 100, endTick: 100 }, { id: 2, owner: 1, from: 80, to: 200, endTick: 100 });
    self.x = 80; exitTerrain(w, self);
    expect(self.x).toBe(-35);
    self.x = 130; exitTerrain(w, self);
    expect(self.x).toBe(235);
  });
  it("reflects equal-distance exits with current facing", () => {
    const w = arena();
    w.terrain.push({ id: 1, owner: 1, from: -100, to: 100, endTick: 100 });
    w.units[0].x = 0; w.units[0].facing = 1; exitTerrain(w, w.units[0]);
    expect(w.units[0].x).toBe(135);
    w.units[1].x = 0; w.units[1].facing = -1; exitTerrain(w, w.units[1]);
    expect(w.units[1].x).toBe(-135);
  });
  it("ignores expired and nonblocking friendly terrain during landing", () => {
    const w = arena(), self = w.units[0];
    w.terrain.push({ id: 1, owner: 0, from: -100, to: 100, endTick: 100, enemyOnly: true }, { id: 2, owner: 1, from: -100, to: 100, endTick: 0 });
    exitTerrain(w, self); expect(self.x).toBe(0);
  });
});

describe("explicit non-activations", () => {
  it.each([false, true])("countsAsCast=%s preserves own hooks and controls enemy cast reactions", (countsAsCast) => {
    const cast = ability({ key: "W", delivery: { kind: "self" }, countsAsCast });
    const own = fighter({ abilities: [cast], hooks: { onCast(ctx) { ctx.memory.ownCasts = Number(ctx.memory.ownCasts ?? 0) + 1; } } });
    const enemy = fighter({ hooks: { onEnemyCast(ctx) { ctx.memory.enemyCasts = Number(ctx.memory.enemyCasts ?? 0) + 1; } } });
    const w = createWorld({ fighters: [own, enemy], distance: 1000, modes: ["idle", "idle"] });
    startCast(w, w.units[0], cast);
    expect(w.units[0].memory.ownCasts).toBe(1);
    expect(w.units[1].memory.enemyCasts ?? 0).toBe(countsAsCast ? 1 : 0);
  });
});

describe("buffered movement during uncancellable attacks", () => {
  it.each([false, true])("uncancellable=%s controls whether a move command cancels the windup", (uncancellable) => {
    const w = arena(); w.units[1].x = 100;
    startAttack(w, w.units[0]);
    const action = w.units[0].action;
    if (action?.kind !== "windup") throw new Error("Expected an active windup");
    action.uncancellable = uncancellable;
    step(w, [() => ({ kind: "move", direction: -1 }), idle]);
    expect(w.units[0].action?.kind === "windup").toBe(uncancellable);
    expect(w.units[0].x === 0).toBe(uncancellable);
  });
});
