import { describe, expect, it } from "vitest";
import { applyEffect } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Behavior } from "../../engine/sim/behavior";
import { DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { castWhenReady, idle, standStill } from "./helpers";
import { ability, fighter } from "./kits";

const away: Behavior = () => ({ kind: "move", direction: -1 });
const toward: Behavior = () => ({ kind: "move", direction: 1 });

function world(distance = 300): World {
  return createWorld({ fighters: [fighter(), fighter()], distance, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, walls: false } } });
}

describe("terrain", () => {
  it("stops walking at its edge, for the units it blocks", () => {
    const w = world();
    const [a, b] = w.units;
    // A pillar 100 units behind side 1.
    const behind = b.x + b.spec.base.pathingRadius + 100;
    w.terrain.push({ id: 1, owner: 0, from: behind, to: behind + 300, endTick: 1000 });
    for (let i = 0; i < 60; i++) step(w, [standStill, away]);
    expect(b.x + b.spec.base.pathingRadius).toBeCloseTo(behind, 6);
    // Dark Procession's ring blocks only its owner's enemy.
    const ring = world();
    const owner = ring.units[0];
    ring.terrain.push({ id: 1, owner: 0, from: owner.x - 400, to: owner.x - 200, endTick: 1000, enemyOnly: true });
    for (let i = 0; i < 60; i++) step(ring, [away, standStill]);
    expect(owner.x).toBeLessThan(-400);
    expect(a.x).toBe(0);
  });

  it("goes away when it expires", () => {
    const w = world();
    const b = w.units[1];
    const behind = b.x + b.spec.base.pathingRadius;
    w.terrain.push({ id: 1, owner: 0, from: behind, to: behind + 300, endTick: 30 });
    for (let i = 0; i < 60; i++) step(w, [standStill, away]);
    expect(b.x + b.spec.base.pathingRadius).toBeGreaterThan(behind + 100);
  });

  it("stops knock backs, stunning when the knock back stuns on walls", () => {
    const shove = ability({ key: "E", delivery: { kind: "aura", radius: 400 }, onHit: [{ type: "displace", direction: "away", distance: 400, duration: 0.5, wallStun: 1.5 }] });
    const w = createWorld({ fighters: [fighter({ abilities: [shove] }), fighter()], distance: 0, modes: ["idle", "idle"], settings: { environment: { ...DEFAULT_ENVIRONMENT, walls: false }, log: true } });
    const b = w.units[1];
    const start = b.x;
    w.terrain.push({ id: 1, owner: 0, from: start + b.spec.base.pathingRadius + 200, to: start + 600, endTick: 1000 });
    step(w, [castWhenReady("E"), standStill]);
    for (let i = 0; i < 40; i++) step(w, [standStill, standStill]);
    expect(b.x - start).toBeCloseTo(200, 6);
    expect(b.statuses.some((s) => s.kind === "cc" && s.key === "stun")).toBe(true);
  });

  it("stops dashes to a location but not dashes to a unit", () => {
    const hop = ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: 500, speed: 1000 } });
    const w = createWorld({ fighters: [fighter({ abilities: [hop] }), fighter()], distance: 800, modes: ["idle", "idle"] });
    const a = w.units[0];
    w.terrain.push({ id: 1, owner: 1, from: a.x + a.spec.base.pathingRadius + 100, to: a.x + 400, endTick: 1000 });
    step(w, [castWhenReady("E"), standStill]);
    for (let i = 0; i < 30; i++) step(w, [standStill, standStill]);
    expect(a.x).toBeCloseTo(100, 6);
    const leap = ability({ key: "E", delivery: { kind: "dash", direction: "target", distance: 1000, speed: 1000 } });
    const v = createWorld({ fighters: [fighter({ abilities: [leap] }), fighter()], distance: 800, modes: ["idle", "idle"] });
    const c = v.units[0];
    v.terrain.push({ id: 1, owner: 1, from: c.x + c.spec.base.pathingRadius + 100, to: c.x + 400, endTick: 1000 });
    step(v, [castWhenReady("E"), standStill]);
    for (let i = 0; i < 40; i++) step(v, [standStill, standStill]);
    expect(c.x).toBeGreaterThan(400);
  });
});

describe("attach", () => {
  it("carries the target alongside its captor until it ends", () => {
    const w = world(400);
    const [a, b] = w.units;
    applyEffect(w, a, b, { type: "attach", offset: 200, duration: 1 }, { scale: 1 });
    for (let i = 0; i < 15; i++) step(w, [away, toward]);
    expect(b.x - a.x).toBeCloseTo(200, 6);
    for (let i = 0; i < 30; i++) step(w, [standStill, idle]);
    expect(b.attached).toBeUndefined();
  });
});
