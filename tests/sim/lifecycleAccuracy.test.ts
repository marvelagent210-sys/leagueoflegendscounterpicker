import { describe, expect, it } from "vitest";
import { completeCast, heldUntil, launchAttack, progressDash, startAttack, startCast } from "../../engine/sim/actions";
import { applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { cloneWorld, other, type Status } from "../../engine/sim/state";
import { createWorld, step } from "../../engine/sim/simulate";
import { ability, fighter, RANGED } from "./kits";
import { castWhenReady, duel, idle, ticksOf } from "./helpers";
import { kit } from "../kits/helpers";

describe("combat lifecycle accuracy", () => {
  it.each([7, 14, 19, 31])("delivers exactly %i channel pulses across its duration", (pulses) => {
    const spin = ability({
      key: "E", cooldown: 100, delivery: { kind: "self" },
      channel: {
        duration: 3, interruptible: false, range: 400, pulses: { base: pulses },
        onTick: [{ type: "damage", damageType: "true", amount: { base: 10 } }],
      },
    });
    const outcome = duel(fighter({ abilities: [spin] }), fighter(), {
      behaviors: [castWhenReady("E"), idle], settings: { maxSeconds: 3.1 },
    });
    const hits = ticksOf(outcome.timeline, 0, "E deals 10 true");
    expect(hits).toHaveLength(pulses);
    expect(hits).toEqual(Array.from({ length: pulses }, (_, i) => Math.ceil((90 * (i + 1)) / pulses)));
    expect(outcome.damage[0]).toBe(10 * pulses);
  });

  it("expires immunity before damage scheduled for its ending tick", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(w, w.units[1], w.units[1], { type: "state", state: "invulnerable", duration: 0.5 }, { scale: 1 });
    w.scheduled.push({ tick: 15, owner: 0, target: 1, scale: 1, effects: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    w.tick = 15;
    step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1900);
  });

  it("keeps the final damage-over-time pulse when expiring other effects first", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(w, w.units[0], w.units[1], { type: "dot", damageType: "true", total: { base: 100 }, duration: 1, interval: 0.5 }, { scale: 1 });
    for (let i = 0; i <= 30; i++) step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1900);
    expect(w.units[1].statuses.some((s) => s.kind === "dot")).toBe(false);
  });

  it.each([0, 1] as const)("stops side %i at contact even if one dash step crosses the target", (side) => {
    const dash = ability({ key: "E", delivery: { kind: "dash", direction: "target", distance: 1000, speed: 30000, hitRadius: 100 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const w = createWorld({ fighters: side === 0 ? [fighter({ abilities: [dash] }), fighter()] : [fighter(), fighter({ abilities: [dash] })], distance: 200, modes: ["idle", "idle"] });
    startCast(w, w.units[side], dash);
    w.tick = 1;
    progressDash(w, w.units[side]);
    expect(w.units[side].action).toBeUndefined();
    expect(w.units[side].x).toBe(side === 0 ? 260 : 70);
    expect(w.units[other(side)].hp).toBe(1900);
  });

  it("lets a projectile cross a wall on the wall's ending tick", () => {
    const w = createWorld({ fighters: [fighter({ attack: RANGED }), fighter()], distance: 200, modes: ["idle", "idle"] });
    w.zones.push({ id: 1, owner: 1, kind: "projectileWall", seenTick: 0, x: 100, radius: 0, startTick: 0, endTick: 15 });
    w.missiles.push({ id: 2, owner: 0, source: "attack", seenTick: 0, x: 50, perTick: 400, homing: true, direction: 1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: [], attack: { blinded: false, bonusOnHit: [] } });
    w.tick = 15;
    step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1950);
  });

  it("branches channel progress independently", () => {
    const spin = ability({ key: "E", delivery: { kind: "self" }, channel: { duration: 3, interruptible: false, range: 400, pulses: { base: 14 }, onTick: [{ type: "damage", damageType: "true", amount: { base: 10 } }] } });
    const w = createWorld({ fighters: [fighter({ abilities: [spin] }), fighter()], distance: 0, modes: ["idle", "idle"] });
    startCast(w, w.units[0], spin);
    const fork = cloneWorld(w);
    for (let i = 0; i <= 90; i++) step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(1860);
    expect(fork.units[1].hp).toBe(2000);
    for (let i = 0; i <= 90; i++) step(fork, [idle, idle]);
    expect(fork.units[1].hp).toBe(1860);
  });

  it("does not trigger a trap that expired before the target enters it", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 200, modes: ["idle", "idle"] });
    w.zones.push({ id: 1, owner: 0, kind: "trap", seenTick: 0, x: w.units[1].x, radius: 100, startTick: 0, endTick: 15, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    w.tick = 15;
    step(w, [idle, idle]);
    expect(w.units[1].hp).toBe(2000);
    expect(w.zones).toHaveLength(0);
  });

  it.each(["fear", "berserk", "taunt", "charm"] as const)("does not allow voluntary sidestepping while under %s", (cc) => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(w, w.units[0], w.units[1], { type: "cc", cc, duration: 1 }, { scale: 1 });
    expect(heldUntil(w.units[1])).toBe(30);
  });

  it("executes an automatic next stage even when the first skillshot branches", () => {
    const q = ability({ key: "Q", cooldown: 100, castTime: 0.25, delivery: { kind: "line", range: 1000, width: 140, speed: 1600 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] });
    const follow = ability({ key: "Q2", cooldown: 0, delivery: { kind: "self" }, chain: { root: "Q", index: 2, window: 0, auto: true }, onSelf: [{ type: "stat", stat: "AD", amount: { base: 100 }, duration: 10 }] });
    const w = createWorld({ fighters: [fighter({ abilities: [q, follow] }), fighter()], distance: 600, modes: ["idle", "idle"] });
    startCast(w, w.units[0], q);
    w.tick = 8;
    const split = completeCast(w, w.units[0], q, 0);
    expect(split?.missile).toBeDefined();
    expect(derive(w.units[0]).ad).toBe(200);
    expect(w.units[0].chains.Q).toBeUndefined();
  });

  it("cancels Garen's ultimate without cooldown if the target leaves cast range", () => {
    const garen = kit("Garen").spec;
    const r = garen.abilities.find((a) => a.key === "R")!;
    const w = createWorld({ fighters: [garen, fighter()], distance: 0, modes: ["idle", "idle"] });
    startCast(w, w.units[0], r);
    w.units[1].x = 1000;
    w.tick = 15;
    step(w, [idle, idle]);
    expect(w.units[0].cooldownReady.R ?? 0).toBe(0);
    expect(w.units[0].action).toBeUndefined();
    expect(w.units[1].hp).toBe(2000);
  });

  it("preserves Garen's enhanced attack when the target becomes untargetable during windup", () => {
    const garen = kit("Garen").spec;
    const q = garen.abilities.find((a) => a.key === "Q")!;
    const w = createWorld({ fighters: [garen, fighter()], distance: 0, modes: ["idle", "idle"] });
    startCast(w, w.units[0], q);
    startAttack(w, w.units[0]);
    const attack = w.units[0].action;
    expect(attack?.kind).toBe("windup");
    applyEffect(w, w.units[1], w.units[1], { type: "state", state: "untargetable", duration: 1 }, { scale: 1 });
    expect(w.units[0].action).toBe(attack);
    if (attack?.kind !== "windup") throw new Error("Expected enhanced windup");
    w.tick = attack.launchTick;
    launchAttack(w, w.units[0]);
    expect(w.units[1].hp).toBeLessThan(2000);
    expect(w.units[1].statuses.some((s) => s.kind === "cc" && s.key === "silence")).toBe(true);
  });

  const dashAuraWorld = () => {
    const dash = ability({ key: "E", delivery: { kind: "dash", direction: "toward", through: true, distance: 2000, speed: 60000, hitRadius: 50 } });
    const w = createWorld({ fighters: [fighter({ abilities: [dash] }), fighter()], distance: 600, modes: ["idle", "idle"] });
    const aura: Status = { kind: "state", key: "antiDash", source: 1, startTick: 0, endTick: 60, value: 400, effects: [{ type: "damage", damageType: "true", amount: { base: 100 } }, { type: "displace", direction: "away", distance: 0, duration: 0.5 }, { type: "cc", cc: "ground", duration: 2 }, { type: "cc", cc: "slow", strength: 0.25, duration: 2 }] };
    w.units[1].statuses.push(aura);
    startCast(w, w.units[0], dash);
    w.tick = 1;
    return w;
  };

  it("intercepts a dash that would traverse the whole anti-dash aura in one tick", () => {
    const w = dashAuraWorld();
    progressDash(w, w.units[0]);
    expect(w.units[0].action).toBeUndefined();
    expect(w.units[0].x).toBe(265);
    expect(w.units[0].hp).toBe(1900);
  });

  it.each(["ccImmune", "displacementImmune"] as const)("damages a dash protected by %s without stopping, grounding or slowing it", (state) => {
    const w = dashAuraWorld();
    applyEffect(w, w.units[0], w.units[0], { type: "state", state, duration: 2 }, { scale: 1 });
    progressDash(w, w.units[0]);
    expect(w.units[0].x).toBe(2000);
    expect(w.units[0].hp).toBe(1900);
    expect(w.units[0].statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(w.units[1].statuses.some((s) => s.key === "antiDash")).toBe(false);
  });

  it("consumes a spell shield without stopping or damaging its holder's dash", () => {
    const w = dashAuraWorld();
    applyEffect(w, w.units[0], w.units[0], { type: "state", state: "spellShield", duration: 2, charges: 1 }, { scale: 1 });
    progressDash(w, w.units[0]);
    expect(w.units[0].x).toBe(2000);
    expect(w.units[0].hp).toBe(2000);
    expect(w.units[0].statuses.some((s) => s.kind === "cc" || s.key === "spellShield")).toBe(false);
    expect(w.units[1].statuses.some((s) => s.key === "antiDash")).toBe(false);
  });

  it("stops an overlay dash without discarding the cast it was made during", () => {
    const q = ability({ key: "Q", castTime: 1, delivery: { kind: "self" } });
    const e = ability({ key: "E", overlay: true, delivery: { kind: "dash", direction: "toward", distance: 300, speed: 1000 } });
    const w = createWorld({ fighters: [fighter({ abilities: [q, e] }), fighter()], distance: 200, modes: ["idle", "idle"] });
    w.units[1].statuses.push({ kind: "state", key: "antiDash", source: 1, startTick: 0, endTick: 60, value: 400, effects: [{ type: "displace", direction: "away", distance: 0, duration: 0.5 }] });
    startCast(w, w.units[0], q);
    const parent = w.units[0].action;
    startCast(w, w.units[0], e);
    w.tick = 1;
    progressDash(w, w.units[0]);
    expect(w.units[0].action).toBe(parent);
  });

  it("allows a documented knockback exception to interrupt an uncancellable attack", () => {
    for (const interruptUncancellable of [false, true]) {
      const w = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
      applyEffect(w, w.units[0], w.units[0], { type: "empower", attacks: 1, window: 4, uncancellable: true, onHit: [] }, { scale: 1 });
      startAttack(w, w.units[0]);
      applyEffect(w, w.units[1], w.units[0], { type: "displace", direction: "away", distance: 50, duration: 0.25, interruptUncancellable }, { scale: 1 });
      expect(w.units[0].action?.kind).toBe(interruptUncancellable ? undefined : "windup");
    }
  });
});
