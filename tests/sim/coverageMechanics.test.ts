import { describe, expect, it } from "vitest";
import { abilityHit, applyCC, applyEffect, attackHit, canTarget, dealDamage } from "../../engine/sim/combat";
import { advanceMissiles, canCast, completeCast, missileArrivalTicks, progressDash, startCast } from "../../engine/sim/actions";
import { canMove } from "../../engine/sim/derived";
import { perceive } from "../../engine/sim/behavior";
import { createWorld, step } from "../../engine/sim/simulate";
import { ability, fighter } from "./kits";
import { idle, lasting } from "./helpers";
import { cloneWorld } from "../../engine/sim/state";

const makeWorld = () => createWorld({ fighters: [fighter({ id: "source" }), fighter({ id: "target" })], distance: 0, modes: ["idle", "idle"] });
const shield = { type: "shield" as const, amount: { base: 30 }, duration: 5, shieldType: "magic" as const, blackShield: true };

describe("shared mechanics needed by expanded champion coverage", () => {
  it("an empowered on-hit spell shield preserves ordinary attack damage and unrelated on-hit effects", () => {
    const world = createWorld({ fighters: [fighter({ base: { armor: 0, mr: 0 }, attack: { onHit: [{ type: "damage", damageType: "magic", amount: { base: 10 } }] } }), fighter({ base: { armor: 0, mr: 0 } })], distance: 0, modes: ["idle", "idle"] });
    const [source, target] = world.units;
    target.statuses.push(lasting("state", "spellShield"));
    attackHit(world, source, target, false, [{ type: "damage", damageType: "magic", amount: { base: 50 } }, { type: "cc", cc: "stun", duration: 1 }], undefined, false, { spellShieldOnHit: true });
    expect(target.totals.damageTaken).toBe(110);
    expect(target.statuses.some((s) => s.key === "stun" || s.key === "spellShield")).toBe(false);
  });

  it("a projectile retains explicitly locked cast-start origin and direction when both champions cross", () => {
    const shot = ability({ key: "Q", castTime: 0.25, castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: 1000, width: 100, speed: 1200 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [shot] }), fighter()], distance: 500, modes: ["idle", "idle"] });
    const [source, target] = world.units;
    source.x = 0; target.x = 500;
    startCast(world, source, shot);
    source.x = 100; target.x = -500;
    world.tick = 8; completeCast(world, source, shot, 0);
    expect(world.missiles[0]).toMatchObject({ x: 0, direction: 1 });
    advanceMissiles(world);
    expect(target.totals.damageTaken).toBe(0);
  });

  it("projectile acceleration follows the recorded curve, caps velocity, and remains independent in branches", () => {
    expect(missileArrivalTicks({ perTick: 25, acceleration: { perTick: 500 / 900, maxPerTick: 100 } }, 335)).toBe(12);
    expect(missileArrivalTicks({ perTick: 99, acceleration: { perTick: 1, maxPerTick: 100 } }, 350)).toBe(4);
    const world = makeWorld();
    world.units[1].x = 10000;
    world.missiles.push({ id: 1, owner: 0, source: "Q", seenTick: 0, x: 0, perTick: 25, acceleration: { perTick: 500 / 900, maxPerTick: 100 }, homing: true, direction: 1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: [] });
    advanceMissiles(world);
    expect(world.missiles[0]?.x).toBe(25);
    expect(world.missiles[0]?.perTick).toBeCloseTo(25 + 500 / 900, 12);
    const branch = cloneWorld(world);
    advanceMissiles(world);
    expect(world.missiles[0]?.x).toBeCloseTo(50 + 500 / 900, 12);
    expect(branch.missiles[0]?.x).toBe(25);
    world.missiles[0]!.perTick = 99.9;
    advanceMissiles(world);
    expect(world.missiles[0]?.perTick).toBe(100);
  });

  it("Black Shield protects associated CC even when the same ability breaks it, then protection ends", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    applyEffect(world, target, target, shield, { scale: 1 });
    const hit = ability({ key: "Q", delivery: { kind: "target", range: 1000 } });
    abilityHit(world, source, target, hit, [
      { type: "damage", damageType: "magic", amount: { base: 100 } },
      { type: "cc", cc: "stun", duration: 1 },
      { type: "displace", direction: "away", distance: 100, duration: 0.5 },
    ]);
    expect(target.statuses.some((s) => s.kind === "shield")).toBe(false);
    expect(target.statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(target.forced).toBeUndefined();
    expect(applyCC(world, source, target, "stun", 1)).toBe(true);
  });

  it("Black Shield is magic-only, permits nearsight, and does not leak packet protection between worlds", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    applyEffect(world, target, target, shield, { scale: 1 });
    const hp = target.hp;
    dealDamage(world, source, target, 100, "physical");
    expect(hp - target.hp).toBe(50);
    expect(target.statuses.find((s) => s.blackShield)?.value).toBe(30);
    expect(applyCC(world, source, target, "nearsight", 1, 350)).toBe(true);
    const second = makeWorld();
    expect(applyCC(second, second.units[0], second.units[1], "root", 1)).toBe(true);
  });

  it("destroying shields before an empowered attack removes Black Shield's protection", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    applyEffect(world, target, target, shield, { scale: 1 });
    attackHit(world, source, target, false, [{ type: "cc", cc: "stun", duration: 1 }], undefined, false, { breakShields: true });
    expect(target.statuses.some((s) => s.key === "stun")).toBe(true);
  });

  it("flat reduction is pre-mitigation, capped separately in ordinary and critical outcomes, and excludes true damage", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    target.statuses.push(lasting("state", "flatDamageReduction", 24));
    const before = target.hp;
    dealDamage(world, source, target, 40, "physical", { crit: { chance: 0.5, multiplier: 2 } });
    // Half the ordinary 40 becomes 20; the critical 80 becomes 56, then 100 armor halves each.
    expect(before - target.hp).toBe(19);
    const trueBefore = target.hp;
    dealDamage(world, source, target, 40, "true");
    expect(trueBefore - target.hp).toBe(40);
  });

  it("a raw-damage hook sees each critical outcome before resistances", () => {
    const seen: number[] = [];
    const defender = fighter({ hooks: { modifyDamageTakenRaw(ctx) { seen.push(ctx.raw); return ctx.raw - Math.min(ctx.raw / 2, 30); } } });
    const world = createWorld({ fighters: [fighter(), defender], distance: 0, modes: ["idle", "idle"] });
    dealDamage(world, world.units[0], world.units[1], 100, "physical", { crit: { chance: 0.5, multiplier: 2 } });
    expect(seen).toEqual([100, 200]);
    expect(world.units[1].totals.damageTaken).toBe(60);
  });

  it("cripple immunity is independent of slow immunity and does not grant stun immunity", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    target.statuses.push(lasting("state", "crippleImmune"));
    expect(applyCC(world, source, target, "cripple", 1, 0.5)).toBe(false);
    expect(applyCC(world, source, target, "slow", 1, 0.5)).toBe(true);
    expect(applyCC(world, source, target, "stun", 1)).toBe(true);
  });

  it("range-based damage immunity follows the protected champion without blocking targeting or CC", () => {
    const world = makeWorld();
    const [source, target] = world.units;
    target.statuses.push(lasting("state", "invulnerableFar", 450));
    source.x = 1000; target.x = 0;
    expect(canTarget(target, source)).toBe(true);
    expect(dealDamage(world, source, target, 100, "true", { persistent: true })).toBe(0);
    expect(applyCC(world, source, target, "root", 1)).toBe(true);
    target.x = 550;
    expect(dealDamage(world, source, target, 100, "true")).toBe(100);
  });

  it("incoming on-hit hooks fire once through an attack damage block, but not a blind, dodge or parry", () => {
    for (const defense of ["blockAttacks", "dodgeAttacks", "parry", "blind"] as const) {
      let hits = 0;
      const world = createWorld({ fighters: [fighter({ attack: { blockStopsOnHit: true } }), fighter({ hooks: { onIncomingOnHit() { hits++; } } })], distance: 0, modes: ["idle", "idle"] });
      const [source, target] = world.units;
      if (defense !== "blind") target.statuses.push(lasting("state", defense));
      attackHit(world, source, target, defense === "blind", [{ type: "cc", cc: "root", duration: 1 }]);
      expect(hits, defense).toBe(defense === "blockAttacks" ? 1 : 0);
      expect(target.statuses.some((s) => s.key === "root"), defense).toBe(false);
    }
  });

  it("a declared instant overlay keeps its channel clock; a permitted ending cast ends only a matching channel", () => {
    const buff = ability({ key: "E", delivery: { kind: "self" }, overlay: true, overlayChannels: ["Q"] });
    const ending = ability({ key: "R", delivery: { kind: "self" }, allowedDuringChannel: ["Q"] });
    const world = createWorld({ fighters: [fighter({ abilities: [buff, ending] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const unit = world.units[0];
    const channel = { kind: "channel" as const, ability: "Q", startTick: 0, endTick: 60, nextTick: 30, intervalTicks: 30 };
    unit.action = channel;
    expect(canCast(world, unit, buff)).toBe(true);
    startCast(world, unit, buff);
    expect(unit.action).toBe(channel);
    expect(canCast(world, unit, ending)).toBe(true);
    startCast(world, unit, ending);
    expect(unit.action).toBeUndefined();
    unit.action = { ...channel, ability: "W" };
    expect(canCast(world, unit, buff)).toBe(false);
    expect(canCast(world, unit, ending)).toBe(false);
  });

  it("a movement lock prevents walking while allowing a movement spell", () => {
    const dash = ability({ key: "Q", delivery: { kind: "dash", direction: "away", distance: 300, speed: 900, speedFor: () => 1800 } });
    const world = createWorld({ fighters: [fighter({ abilities: [dash] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const unit = world.units[0];
    unit.statuses.push(lasting("state", "noMovement"));
    expect(canMove(unit)).toBe(false);
    expect(canCast(world, unit, dash)).toBe(true);
    startCast(world, unit, dash);
    expect(unit.action).toMatchObject({ kind: "dash", endTick: 5, perTick: -60 });
  });

  it("dash completion hooks fire at arrival and interruption, with the correct outcome", () => {
    const outcomes: boolean[] = [];
    const dash = ability({ key: "Q", delivery: { kind: "dash", direction: "away", distance: 100, speed: 3000 } });
    const world = createWorld({ fighters: [fighter({ abilities: [dash], hooks: { onDashEnd(ctx) { outcomes.push(ctx.interrupted); } } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    const [unit, target] = world.units;
    startCast(world, unit, dash);
    world.tick = 1; progressDash(world, unit);
    expect(outcomes).toEqual([false]);
    unit.cooldownReady.Q = 0;
    startCast(world, unit, dash);
    applyCC(world, target, unit, "airborne", 1);
    expect(outcomes).toEqual([false, true]);
  });

  it("a traveling circle is perceived with a finite arrival time and releases its area after travel", () => {
    const circle = ability({ key: "Q", delivery: { kind: "circle", range: 1000, radius: 100, delay: 0.2, speed: 1200 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }] });
    const world = createWorld({ fighters: [fighter({ abilities: [circle] }), fighter()], distance: 600, modes: ["idle", "idle"], settings: { reactionTime: 0 } });
    world.units[0].x = 0;
    world.units[1].x = 600;
    world.units[1].statuses.push(lasting("cc", "root"));
    startCast(world, world.units[0], circle);
    const threat = perceive(world, 1).threats.find((t) => t.source === "Q");
    expect(threat?.eta).toBe(21);
    expect(threat?.projectile).toBe(true);
    while (world.tick < 14) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBe(0);
    while (world.tick < 22) step(world, [idle, idle]);
    expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    expect(world.zones).toHaveLength(0);
    expect(world.missiles).toHaveLength(0);
  });
});
