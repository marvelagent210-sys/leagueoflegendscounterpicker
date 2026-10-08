import { describe, expect, it } from "vitest";
import { fight } from "../../engine/sim/simulate";
import { ability, fighter, RANGED } from "./kits";
import { duel, idle, lasting, ticksOf } from "./helpers";

// The plain fighter: 100 AD into 100 armor is 50 damage per attack; 2000 health is 40 attacks.
// 0.625 attacks per second is 1.6 s (48 ticks) per attack; the 30% windup is 0.48 s (15 ticks).

describe("basic attacks", () => {
  it("lands each attack after its windup and repeats on the attack timer", () => {
    const outcome = duel(fighter(), fighter(), { settings: { maxSeconds: 120 } });
    const hits = ticksOf(outcome.timeline, 0, "attack deals 50 physical");
    expect(hits.slice(0, 3)).toEqual([15, 63, 111]);
    expect(hits).toHaveLength(40);
    // A mirror match ends with both attacks landing on the same tick: a draw.
    expect(outcome.draw).toBe(1);
    expect(outcome.seconds).toBeCloseTo((15 + 39 * 48) / 30, 6);
  });

  it("shortens the windup and attack time with bonus attack speed", () => {
    // 0.625 + 0.625 x 0.5 = 0.9375 attacks per second: 1.0667 s (32 ticks); windup
    // 0.48 + (1.0667 x 0.3 - 0.48) = 0.32 s (10 ticks).
    const outcome = duel(fighter({ bonus: { attackSpeed: 0.5 } }), fighter(), { behaviors: [undefined, idle] });
    expect(ticksOf(outcome.timeline, 0, "attack deals").slice(0, 3)).toEqual([10, 42, 74]);
  });

  it("keeps the windup longer when the windup modifier is below 1", () => {
    // modifier 0.5: 0.48 + 0.5 x (0.32 - 0.48) = 0.4 s (12 ticks).
    const outcome = duel(fighter({ bonus: { attackSpeed: 0.5 }, base: { windup: { percent: 0.3, modifier: 0.5 } } }), fighter(), {
      behaviors: [undefined, idle],
    });
    expect(ticksOf(outcome.timeline, 0, "attack deals")[0]).toBe(12);
  });

  it("flies ranged attacks to the target's edge at their missile speed", () => {
    // Launch on tick 15 from the attacker's center; the target's edge is 630 - 65 = 565 units
    // away; at 2000 units per second (66.7 per tick) that is 9 ticks.
    const outcome = duel(fighter({ attack: RANGED }), fighter(), { distance: 500, behaviors: [undefined, idle] });
    expect(ticksOf(outcome.timeline, 0, "attack deals")[0]).toBe(24);
  });

  it("walks into attack range first", () => {
    // 300 - 125 = 175 units to close at 350 + 350 units per second: 7.5 ticks, so the
    // first windup starts on tick 8.
    const outcome = duel(fighter(), fighter(), { distance: 300 });
    expect(ticksOf(outcome.timeline, 0, "attack deals")[0]).toBe(23);
  });

  it("averages critical strikes into each attack", () => {
    // 50% crit chance at 200% damage: 1.5 x 50 = 75 per attack.
    const outcome = duel(fighter({ bonus: { critChance: 0.5 } }), fighter(), { behaviors: [undefined, idle] });
    expect(outcome.timeline.find((e) => e.side === 0)?.text).toBe("attack deals 75 physical damage");
  });

  it("lets the stronger side win and keeps the loser's last attack (same-tick hits both land)", () => {
    // 55 per attack kills in 37 attacks; the loser's 37 attacks deal 1850.
    const outcome = duel(fighter(), fighter({ base: { ad: 110 } }), { settings: { maxSeconds: 120 } });
    expect(outcome.win).toEqual([0, 1]);
    expect(outcome.damage[0]).toBe(1850);
    expect(outcome.hp[1]).toBeCloseTo(150 / 2000, 9);
  });

  it("is symmetric: swapping the sides mirrors the outcome", () => {
    const a = fighter({ id: "a", attack: RANGED, base: { ad: 90, moveSpeed: 330 } });
    const b = fighter({ id: "b", base: { ad: 120, armor: 60, moveSpeed: 345 } });
    const ab = fight({ fighters: [a, b], distance: 400, modes: ["fight", "fight"], settings: { maxSeconds: 60 } });
    const ba = fight({ fighters: [b, a], distance: 400, modes: ["fight", "fight"], settings: { maxSeconds: 60 } });
    expect(ab.win[0]).toBeCloseTo(ba.win[1], 9);
    expect(ab.win[1]).toBeCloseTo(ba.win[0], 9);
    expect(ab.hp[0]).toBeCloseTo(ba.hp[1], 9);
    expect(ab.seconds).toBeCloseTo(ba.seconds, 9);
  });
});

describe("attack modifiers", () => {
  it("applies on-hit effects with every attack", () => {
    const onHit = fighter({ attack: { onHit: [{ type: "damage", damageType: "magic", amount: { base: 40 } }] } });
    const outcome = duel(onHit, fighter(), { behaviors: [undefined, idle] });
    expect(outcome.timeline.filter((e) => e.side === 0).slice(0, 2).map((e) => e.text)).toEqual([
      "attack deals 50 physical damage",
      "attack deals 20 magic damage",
    ]);
  });

  it("adds empowered attacks' effects to the next attacks", () => {
    const empower = ability({
      key: "Q",
      delivery: { kind: "self" },
      onSelf: [{ type: "empower", attacks: 1, window: 5, onHit: [{ type: "damage", damageType: "physical", amount: { base: 100 } }] }],
    });
    const outcome = duel(fighter({ abilities: [empower] }), fighter(), { behaviors: [undefined, idle] });
    // The attack and its empowered bonus land together; the next attack is plain again.
    const hit = (tick: number) => outcome.timeline.filter((e) => e.side === 0 && e.tick === tick && e.text.includes("deals")).map((e) => e.text);
    expect(hit(15)).toEqual(["attack deals 50 physical damage", "attack deals 50 physical damage"]);
    expect(hit(63)).toEqual(["attack deals 50 physical damage"]);
  });

  it("resets the attack timer with an attack reset between attacks", () => {
    const reset = ability({ key: "W", cooldown: 4, delivery: { kind: "self" }, onSelf: [{ type: "resetAttack" }] });
    const plain = duel(fighter(), fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 120 } });
    const resetting = duel(fighter({ abilities: [reset] }), fighter(), { behaviors: [undefined, idle], settings: { maxSeconds: 120 } });
    expect(plain.win[0]).toBe(1);
    expect(resetting.win[0]).toBe(1);
    expect(resetting.seconds).toBeLessThan(plain.seconds - 5);
    // The reset is used right after an attack lands, and the next windup starts on the same tick.
    const hits = ticksOf(resetting.timeline, 0, "attack deals");
    expect(hits.slice(0, 2)).toEqual([15, 30]);
  });
});

describe("attack defenses", () => {
  it("misses attacks declared while blinded, but not the one already winding up", () => {
    const blind = ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "blind", duration: 2 }] });
    // Tick 0: side 0 starts its windup before side 1 blinds it.
    const outcome = duel(fighter(), fighter({ abilities: [blind] }), { settings: { maxSeconds: 4 } });
    expect(ticksOf(outcome.timeline, 0, "attack deals")[0]).toBe(15);
    expect(ticksOf(outcome.timeline, 0, "attack misses (blinded)")).toEqual([63]);
  });

  it("dodges attacks while dodging and blocks their damage while blocking", () => {
    for (const state of ["dodgeAttacks", "blockAttacks"] as const) {
      const outcome = duel(fighter(), fighter(), {
        behaviors: [undefined, idle],
        settings: { maxSeconds: 3 },
        setup: (world) => world.units[1].statuses.push(lasting("state", state)),
      });
      expect(outcome.damage[0]).toBe(0);
    }
  });

  it("parries attacks", () => {
    const outcome = duel(fighter(), fighter(), {
      behaviors: [undefined, idle],
      settings: { maxSeconds: 3 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "parry")),
    });
    expect(ticksOf(outcome.timeline, 1, "parries the attack").length).toBeGreaterThan(0);
    expect(outcome.damage[0]).toBe(0);
  });

  it("destroys projectile attacks at a projectile wall but not melee attacks", () => {
    const wall = ability({ key: "W", cooldown: 100, delivery: { kind: "self" }, onSelf: [{ type: "projectileWall", distance: 200, duration: 4 }], roles: ["buff"] });
    const ranged = duel(fighter({ attack: RANGED }), fighter({ abilities: [wall] }), { distance: 500, settings: { maxSeconds: 3 }, behaviors: [undefined, alwaysCast("W")] });
    expect(ranged.damage[0]).toBe(0);
    expect(ticksOf(ranged.timeline, 1, "blocks a projectile").length).toBeGreaterThan(0);
    const melee = duel(fighter(), fighter({ abilities: [wall] }), { settings: { maxSeconds: 3 }, behaviors: [undefined, alwaysCast("W")] });
    expect(melee.damage[0]).toBeGreaterThan(0);
  });

  it("stops projectiles inside a projectile-blocking aura", () => {
    const outcome = duel(fighter({ attack: RANGED }), fighter(), {
      distance: 500,
      behaviors: [undefined, idle],
      settings: { maxSeconds: 3 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "projectileBlock", 100)),
    });
    expect(outcome.damage[0]).toBe(0);
  });

  it("reflects damage to attackers", () => {
    const outcome = duel(fighter(), fighter(), {
      behaviors: [undefined, idle],
      settings: { maxSeconds: 1 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "reflectAttacks", 30)),
    });
    // 30 magic damage into 100 magic resistance: 15 per attack.
    expect(outcome.damage[1]).toBe(15);
  });
});

describe("kiting", () => {
  it("keeps a slower melee fighter out of reach", () => {
    const kiter = fighter({ attack: RANGED, base: { moveSpeed: 450 } });
    const chaser = fighter({ base: { moveSpeed: 300 } });
    const outcome = duel(kiter, chaser, { distance: 550, modes: ["kite", "fight"], settings: { maxSeconds: 90 } });
    expect(outcome.win).toEqual([1, 0]);
    expect(outcome.damage[1]).toBe(0);
  });

  it("is caught by a melee fighter that is as fast", () => {
    const kiter = fighter({ attack: RANGED });
    const outcome = duel(kiter, fighter(), { distance: 550, modes: ["kite", "fight"], settings: { maxSeconds: 90 } });
    expect(outcome.damage[1]).toBeGreaterThan(0);
  });
});

function alwaysCast(key: string) {
  return () => ({ kind: "cast" as const, ability: key });
}
