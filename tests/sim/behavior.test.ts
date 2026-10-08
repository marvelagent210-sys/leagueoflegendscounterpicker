import { describe, expect, it } from "vitest";
import { traitsOf } from "../../engine/sim/behavior";
import { ability, fighter, RANGED } from "./kits";
import { duel, idle, ticksOf } from "./helpers";

const dodge = ability({ key: "E", cooldown: 20, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "dodgeAttacks", duration: 2 }] });
const spellShield = ability({ key: "W", cooldown: 30, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: 1.5, charges: 1 }] });

describe("default behavior", () => {
  it("reads what each ability is for from its effects", () => {
    expect(traitsOf(dodge).defenses.get("dodgeAttacks")).toBe(60);
    const dash = traitsOf(ability({ key: "E", delivery: { kind: "dash", direction: "toward", distance: 400, speed: 1200, hitRadius: 100 }, onHit: [{ type: "cc", cc: "stun", duration: 1 }] }));
    expect([dash.engage, dash.escape, dash.cc, dash.immobilizes, dash.damage]).toEqual([true, false, true, true, false]);
    const reset = traitsOf(ability({ key: "W", delivery: { kind: "self" }, onSelf: [{ type: "empower", attacks: 1, window: 4, onHit: [], resetAttack: true }] }));
    expect([reset.buff, reset.resetsAttack]).toEqual([true, true]);
  });

  it("dodges attacks as they come in, once it sees the first windup", () => {
    // The first windup (tick 0) is seen on tick 8, before it lands on tick 15.
    const outcome = duel(fighter(), fighter({ abilities: [dodge] }), { settings: { maxSeconds: 2.5 } });
    expect(ticksOf(outcome.timeline, 1, "casts E")).toEqual([8]);
    expect(ticksOf(outcome.timeline, 1, "dodges the attack")).toEqual([15, 63]);
  });

  it("saves a spell shield for crowd control instead of spending it on a small poke", () => {
    const poke = ability({ key: "Q", cooldown: 3, castTime: 0.5, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 60 } }] });
    const stun = ability({ key: "R", cooldown: 100, castTime: 0.5, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration: 2 }] });
    // Poke on tick 0 and every 3 s; the stun once, at 2 s.
    const caster = fighter({ abilities: [poke, stun] });
    const outcome = duel(caster, fighter({ abilities: [spellShield] }), {
      behaviors: [(view) => (view.world.tick === 0 || view.world.tick === 90 ? { kind: "cast", ability: "Q" } : view.world.tick === 60 ? { kind: "cast", ability: "R" } : undefined), undefined],
      settings: { maxSeconds: 3.5 },
    });
    expect(ticksOf(outcome.timeline, 1, "spell shield blocks")).toEqual([75]);
  });

  it("uses a gap closer to reach an enemy out of attack range", () => {
    const dash = ability({ key: "E", cooldown: 10, delivery: { kind: "dash", direction: "toward", distance: 400, speed: 1500 } });
    const outcome = duel(fighter({ abilities: [dash] }), fighter(), { distance: 450, behaviors: [undefined, idle], settings: { maxSeconds: 1 } });
    expect(ticksOf(outcome.timeline, 0, "casts E")).toEqual([0]);
  });

  it("closes in on a fleeing enemy before attacking, so the windup can't be outrun", () => {
    const fast = fighter({ base: { moveSpeed: 420 } });
    const outcome = duel(fast, fighter({ base: { moveSpeed: 300 } }), { distance: 100, modes: ["fight", "flee"], settings: { maxSeconds: 6 } });
    // Only the first windup, started before the enemy was seen running, is cancelled.
    expect(ticksOf(outcome.timeline, 0, "attack cancelled")).toEqual([2]);
    expect(ticksOf(outcome.timeline, 0, "attack deals")).toEqual([58, 110, 163]);
  });

  it("lets a ranged fighter kite a melee fighter between attacks", () => {
    const outcome = duel(fighter({ attack: RANGED, base: { moveSpeed: 450 } }), fighter({ base: { moveSpeed: 300 } }), { distance: 550, settings: { maxSeconds: 70 } });
    expect(outcome.win[0]).toBe(1);
    expect(outcome.damage[1]).toBe(0);
  });
});
