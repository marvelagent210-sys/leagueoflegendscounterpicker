/** Engine features added for the first wave of champion kits (milestone 5). */
import { describe, expect, it } from "vitest";
import { allocateBoth, damagePerSecond } from "../../engine/budget";
import { canAttack, derive } from "../../engine/sim/derived";
import { canCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, heal } from "../../engine/sim/combat";
import { MAX_ENGAGE_RANGE, engageRange, runScenarios } from "../../engine/sim/scenarios";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";
import { duel, idle, lasting, standStill, ticksOf } from "./helpers";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });
const PRICES = { ad: 35, ap: 20, as: 25, crit: 40, ah: 50, lethality: 30, armpen: 41.666667, mpenflat: 46.666667, mpen: 46.15, hp: 2.666667, armor: 20, mr: 20 };

/** Casts each command once, in order, as soon as it is accepted; then stands still (or attacks). */
function script(commands: Array<{ ability: string; aim?: { direction: -1 | 1; distance?: number }; at?: number }>, then: "stand" | "attack" = "stand"): Behavior {
  return (view) => {
    const done = Number(view.self.memory.done ?? 0);
    const next = commands[done];
    if (!next) return then === "attack" ? { kind: "attack" } : { kind: "move", direction: 0 };
    if (next.at !== undefined && view.world.tick < next.at) return { kind: "move", direction: 0 };
    const spec = view.self.spec.abilities.find((a) => a.key === next.ability);
    if (!spec || !canCast(view.world, view.self, spec)) return { kind: "move", direction: 0 };
    view.self.memory.done = done + 1;
    return { kind: "cast", ability: next.ability, ...(next.aim ? { aim: next.aim } : {}) };
  };
}

describe("shared cooldowns", () => {
  it("puts every version of a spell on the cooldown of the one cast", () => {
    const plain = ability({ key: "Q", cooldown: 5, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(10)] });
    const empowered = ability({ key: "Qfury", cooldownKey: "Q", cooldown: 5, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(30)] });
    const world = createWorld({ fighters: [fighter({ abilities: [plain, empowered] }), fighter()], distance: 0, modes: ["fight", "idle"] });
    step(world, [script([{ ability: "Q" }]), idle]);
    expect(canCast(world, world.units[0], empowered)).toBe(false);
  });

  it("counts the versions once, as the strongest, in the stat budget", () => {
    const plain = ability({ key: "Q", cooldown: 5, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(10)] });
    const empowered = ability({ key: "Qfury", cooldownKey: "Q", cooldown: 5, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(30)] });
    const both = damagePerSecond(fighter({ abilities: [plain, empowered] }), fighter());
    const strongest = damagePerSecond(fighter({ abilities: [{ ...empowered, cooldownKey: undefined, key: "Q" }] }), fighter());
    expect(both.true).toBeCloseTo(strongest.true, 9);
  });
});

describe("overlay casts and aimed dashes", () => {
  const strike = ability({ key: "Q", castTime: 0.6, delivery: { kind: "area", near: 0, far: 300, delay: 0, anchor: "caster" }, onHit: [trueDamage(100)] });
  const dash = ability({ key: "E", overlay: true, cooldown: 5, delivery: { kind: "dash", direction: "toward", distance: 300, minDistance: 75, speed: 900 } });

  it("dashes during a cast without cancelling it; the area lands where the caster ends up", () => {
    // Centers 380 apart: out of the strike's reach (300 plus the target's 65) until a 100-unit dash closes in.
    const outcome = duel(fighter({ abilities: [strike, dash] }), fighter(), {
      distance: 380 - 130,
      behaviors: [script([{ ability: "Q" }, { ability: "E", aim: { direction: 1, distance: 100 }, at: 3 }]), standStill],
      settings: { maxSeconds: 1.5 },
    });
    expect(ticksOf(outcome.timeline, 0, "casts")).toEqual([0, 3]);
    expect(outcome.damage[0]).toBe(100);
    // The strike still lands at the end of its own cast time.
    expect(ticksOf(outcome.timeline, 0, "Q deals")).toEqual([18]);
  });

  it("aims dashes within their range, either way", () => {
    const world = createWorld({ fighters: [fighter({ abilities: [dash] }), fighter()], distance: 800, modes: ["fight", "idle"] });
    const x0 = world.units[0].x;
    const away = world.units[0].x < world.units[1].x ? -1 : 1;
    step(world, [script([{ ability: "E", aim: { direction: -1, distance: 30 } }]), idle]);
    for (let i = 0; i < 10; i++) step(world, [standStill, idle]);
    // 30 is below the minimum of 75.
    expect(world.units[0].x - x0).toBeCloseTo(away * 75, 6);
  });

  it("brings the held cast back when the dash is knocked down", () => {
    // Centers 230 apart, well within the strike's reach either way the dash goes.
    const knock = ability({ key: "W", delivery: { kind: "aura", radius: 900 }, onHit: [{ type: "displace", direction: "away", distance: 0, duration: 0.5 }] });
    const outcome = duel(fighter({ abilities: [strike, dash] }), fighter({ abilities: [knock] }), {
      distance: 100,
      behaviors: [script([{ ability: "Q" }, { ability: "E", aim: { direction: -1, distance: 75 }, at: 3 }]), script([{ ability: "W", at: 5 }])],
      settings: { maxSeconds: 1.5 },
    });
    expect(ticksOf(outcome.timeline, 0, "dash knocked down")).toEqual([5]);
    expect(ticksOf(outcome.timeline, 0, "Q deals")).toEqual([18]);
  });
});

describe("dashes through the enemy", () => {
  it("hit the enemy once on the way past and end beyond it", () => {
    const through = ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: 600, speed: 1200, hitRadius: 0, through: true }, onHit: [trueDamage(50)] });
    const world = createWorld({ fighters: [fighter({ abilities: [through] }), fighter()], distance: 300, modes: ["fight", "idle"] });
    const side = Math.sign(world.units[1].x - world.units[0].x);
    for (let i = 0; i < 25; i++) step(world, [i === 0 ? script([{ ability: "E" }]) : standStill, idle]);
    expect(world.units[1].totals.damageTaken).toBe(50);
    expect(Math.sign(world.units[0].x - world.units[1].x)).toBe(side);
  });
});

describe("areas by the center", () => {
  it("miss a target whose hitbox overlaps but whose center is outside", () => {
    const edge = ability({ key: "Q", delivery: { kind: "area", near: 0, far: 200, delay: 0, anchor: "caster" }, onHit: [trueDamage(10)] });
    const center = { ...edge, key: "W", delivery: { ...edge.delivery, centered: true } as AbilitySpec["delivery"] };
    // Centers 240 apart: the target's 65-unit hitbox reaches into 200, its center doesn't.
    const hits = (spec: AbilitySpec) => duel(fighter({ abilities: [spec] }), fighter(), { distance: 240 - 130, behaviors: [script([{ ability: spec.key }]), idle], settings: { maxSeconds: 0.2 } }).damage[0];
    expect(hits(edge)).toBe(10);
    expect(hits(center)).toBe(0);
  });
});

describe("dodging an area's worst part", () => {
  it("steps out of a sweet spot into the milder part when the whole area can't be left", () => {
    // 0.5 s to land, seen after 0.25 s: 350 units/s walks about 80 units, not out of 0-600.
    const sweet = ability({
      key: "Q",
      castTime: 0.5,
      delivery: { kind: "area", near: 0, far: 600, delay: 0, anchor: "caster", bands: [{ from: 400, to: 600, onHit: [trueDamage(300), { type: "cc", cc: "stun", duration: 1 }] }] },
      onHit: [trueDamage(100)],
    });
    // Centers 430 apart: in the sweet spot, 30 units from its near edge.
    const outcome = duel(fighter({ abilities: [sweet] }), fighter(), { distance: 430 - 130, behaviors: [script([{ ability: "Q" }]), undefined], modes: ["fight", "hold"], settings: { maxSeconds: 1 } });
    expect(outcome.damage[0]).toBe(100);
  });
});

describe("damage, attacks and healing", () => {
  it("deals at least a damage minimum", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(world, world.units[0], world.units[1], { type: "damage", damageType: "true", amount: { base: 0, ratios: { targetCurrentHP: 0.01 } }, minimum: { base: 280 } }, { scale: 1 });
    expect(world.units[1].hp).toBe(2000 - 280);
  });

  it("gives an empowered attack its own windup", () => {
    const quick = ability({ key: "Q", delivery: { kind: "self" }, onSelf: [{ type: "empower", attacks: 1, window: 5, onHit: [], windup: 0.1 }] });
    const outcome = duel(fighter({ abilities: [quick] }), fighter(), { behaviors: [script([{ ability: "Q" }], "attack"), idle], settings: { maxSeconds: 1 } });
    // Default windup at 0.625 attack speed is 0.3 / 0.625 = 0.48 s; this one is 3 ticks.
    expect(outcome.timeline.find((e) => e.side === 0 && e.text.startsWith("attack deals"))?.tick).toBe(3);
  });

  it("can't declare attacks with noAttacks, resists slows by a share, and heals more with healing increase", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    const unit = world.units[0];
    unit.statuses.push(lasting("state", "noAttacks"));
    expect(canAttack(unit)).toBe(false);
    unit.statuses = [lasting("cc", "slow", 0.5), lasting("stat", "slowResist", 0.4)];
    expect(derive(unit).moveSpeed).toBeCloseTo(350 * (1 - 0.5 * 0.6), 6);
    unit.statuses = [lasting("stat", "healingIncrease", 1)];
    unit.hp = 1000;
    heal(world, unit, 100);
    expect(unit.hp).toBe(1200);
  });

  it("runs the cast-start hook before the cast time", () => {
    const slow = ability({ key: "Q", castTime: 0.5, delivery: { kind: "self" } });
    let started = -1;
    const spec = fighter({ abilities: [slow], hooks: { onCastStart: (ctx) => void (started = ctx.tick) } });
    duel(spec, fighter(), { behaviors: [script([{ ability: "Q" }]), idle], settings: { maxSeconds: 0.2 } });
    expect(started).toBe(0);
  });
});

describe("stat budget hints", () => {
  it("leaves attack stats alone for a kit without basic attacks", () => {
    const bolts = fighter({ abilities: [] });
    bolts.budget = { attacks: false, damage: (self) => ({ physical: 3 * derive(self).ad }) };
    const [mine] = allocateBoth(bolts, fighter(), 5000, PRICES);
    expect(mine.spent.as).toBe(0);
    expect(mine.spent.crit).toBe(0);
    expect(mine.spent.ad).toBeGreaterThan(0);
  });

  it("values stats the kit multiplies, and spends the kit's extra gold", () => {
    const forge = fighter();
    forge.budget = { statMultipliers: { armor: 3 } };
    forge.extraGold = 1000;
    const [mine] = allocateBoth(forge, fighter(), 5000, PRICES);
    expect(Object.values(mine.spent).reduce((a, b) => a + b, 0)).toBe(6000);
    const [plain] = allocateBoth(fighter(), fighter(), 5000, PRICES);
    expect(mine.spent.armor).toBeGreaterThan(plain.spent.armor);
  });
});

describe("fair fights", () => {
  it("score a matchup the same from either side, though instant crowd control lands as it is decided", () => {
    const stunner = fighter({ abilities: [ability({ key: "Q", cooldown: 8, delivery: { kind: "aura", radius: 300 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }, trueDamage(100)] })] });
    const brute = fighter({ base: { ad: 130 } });
    expect(runScenarios(stunner, brute).score).toBeCloseTo(-runScenarios(brute, stunner).score, 9);
  });
});

describe("engage range", () => {
  it("leaves out areas that take long to land, and stays within a screen", () => {
    const slowBolt = ability({ key: "E", delivery: { kind: "circle", range: 1200, radius: 300, delay: 2 }, onHit: [trueDamage(100)] });
    const longShot = ability({ key: "R", delivery: { kind: "line", range: 2500, width: 160, speed: 3000 }, onHit: [trueDamage(100)] });
    expect(engageRange(fighter({ abilities: [slowBolt] }), fighter())).toBe(125);
    expect(engageRange(fighter({ abilities: [longShot] }), fighter())).toBe(MAX_ENGAGE_RANGE);
  });
});
