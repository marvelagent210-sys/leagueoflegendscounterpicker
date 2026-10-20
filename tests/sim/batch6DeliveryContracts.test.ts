import { describe, expect, it } from "vitest";
import { startCast } from "../../engine/sim/actions";
import { threatsTo } from "../../engine/sim/behavior";
import { channelIn } from "../../engine/sim/channelState";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { idle, lasting } from "./helpers";

describe("fixed-time projectile perception", () => {
  it("sees an explicit kit-controlled contact clock while ordinary nonconnecting missiles remain absent", () => {
    const q = ability({ key: "Qfixed", delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 100 } }] });
    const w = createWorld({ fighters: [fighter({ abilities: [q] }), fighter()], distance: 1000, modes: ["idle", "idle"], settings: { reactionTime: .25 } });
    w.missiles.push({ id: 1, owner: 0, source: q.key, seenTick: 0, x: 0, perTick: 0, homing: true, direction: 1, travelLeft: Infinity, projectile: true, connects: false, impactTick: 12, scale: 1, onHit: q.onHit! });
    w.tick = 7; expect(threatsTo(w, 1).filter(t => t.source === q.key)).toHaveLength(0);
    w.tick = 8; const threat = threatsTo(w, 1).find(t => t.source === q.key)!;
    expect(threat.eta).toBe(4); expect(threat.targeted).toBe(true); expect(threat.skillshot).toBe(false); expect(threat.damage).toBeGreaterThan(0);
    const copy = cloneWorld(w); copy.missiles[0]!.impactTick = 18; expect(w.missiles[0]!.impactTick).toBe(12);
    delete w.missiles[0]!.impactTick; expect(threatsTo(w, 1).filter(t => t.source === q.key)).toHaveLength(0);
  });
});

describe("a channel declared during a committed dash", () => {
  it("keeps the dash and the channel's absolute clocks, including pulses before landing", () => {
    const dash = ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: 300, speed: 300, through: true } });
    const r = ability({ key: "R", overlay: true, delivery: { kind: "self" }, channel: { duration: 2, interval: .2, interruptible: true, mobile: true, range: 2000, onTick: [{ type: "damage", damageType: "true", amount: { base: 10 } }] } });
    const w = createWorld({ fighters: [fighter({ abilities: [dash, r] }), fighter()], distance: 1000, modes: ["idle", "idle"] });
    startCast(w, w.units[0], dash); const committed = w.units[0].action!; expect(committed.kind).toBe("dash");
    step(w, [idle, idle]); startCast(w, w.units[0], r);
    expect(w.units[0].action).toBe(committed); const channel = channelIn(w.units[0].action)!;
    expect(channel.startTick).toBe(1); expect(channel.endTick).toBe(61);
    for (let i = 0; i < 10; i++) step(w, [idle, idle]);
    expect(w.units[0].action?.kind).toBe("dash"); expect(w.units[0].x).toBeGreaterThan(0); expect(w.units[1].hp).toBeLessThan(2000);
    for (let i = 0; i < 22; i++) step(w, [idle, idle]);
    expect(w.units[0].action?.kind).toBe("channel"); expect(channelIn(w.units[0].action)?.endTick).toBe(61);
  });
});

describe("opted-in area spell contacts with pets", () => {
  it.each([false, true])("runs actual pet hooks and defenses for delayed=%s without damaging a second pet", (delayed) => {
    const q = ability({ key: "Q", delivery: delayed ? { kind: "circle", range: 1000, radius: 100, delay: .1 } : { kind: "aura", radius: 100 }, flags: { petContactHooks: true, spellShield: true }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 10 } }] });
    const own = fighter({ abilities: [q], hooks: { onAbilityContact(ctx) { if (ctx.enemy.petId !== undefined) return [...ctx.effects, { type: "damage", damageType: "magic", amount: { base: 20 } }]; }, onAbilityHit(ctx) { ctx.enemy.memory.contacts = Number(ctx.enemy.memory.contacts ?? 0) + 1; } } });
    const w = createWorld({ fighters: [own, fighter()], distance: delayed ? 200 : 1000, modes: ["idle", "idle"] });
    w.units[1].x = delayed ? 200 : 1000;
    const x = delayed ? 200 : 50;
    const spec = { kind: "test", name: "Pet", hp: 1000, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100 };
    const pet = spawnPet(w, w.units[1], spec, x), shielded = spawnPet(w, w.units[1], spec, x + 20), outside = spawnPet(w, w.units[1], spec, 2000);
    shielded.statuses = [lasting("state", "spellShield", 0, { source: 1 })];
    startCast(w, w.units[0], q); for (let i = 0; i < 5; i++) step(w, [idle, idle]);
    expect(pet.hp).toBe(970); expect(pet.memory.contacts).toBe(1); expect(shielded.hp).toBe(1000); expect(shielded.statuses?.some(s => s.key === "spellShield")).toBe(false); expect(outside.hp).toBe(1000); expect(outside.memory.contacts).toBeUndefined();
  });
});
