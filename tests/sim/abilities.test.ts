import { describe, expect, it } from "vitest";
import type { Behavior } from "../../engine/sim/behavior";
import { abilityHit } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { ability, fighter } from "./kits";
import { duel, idle, lasting, standStill, ticksOf } from "./helpers";

const stun = (duration: number, extra: Partial<AbilitySpec> = {}) =>
  ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "stun", duration }], ...extra });

const nuke = (amount: number, extra: Partial<AbilitySpec> = {}) =>
  ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "damage", damageType: "true", amount: { base: amount } }], ...extra });

/** Casts `key` on the first tick it can, then plays like the default behavior's attacks. */
function castFirst(key: string): Behavior {
  return (view) => {
    const spec = view.self.spec.abilities.find((a) => a.key === key);
    if (spec && (view.self.cooldownReady[key] ?? 0) <= view.world.tick && !view.self.memory.cast) {
      view.self.memory.cast = true;
      return { kind: "cast", ability: key };
    }
    return undefined;
  };
}

describe("crowd control", () => {
  it("stuns: no attacks until it ends", () => {
    // Side 0 stuns on tick 0 for 1.5 s (45 ticks); side 1's first windup starts on tick 45.
    const outcome = duel(fighter({ abilities: [stun(1.5)] }), fighter(), { settings: { maxSeconds: 3 } });
    expect(ticksOf(outcome.timeline, 1, "attack deals")[0]).toBe(60);
  });

  it("shortens it with tenacity", () => {
    // 1.5 s x (1 - 0.3) = 1.05 s: 32 ticks.
    const outcome = duel(fighter({ abilities: [stun(1.5)] }), fighter(), {
      settings: { maxSeconds: 3 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "tenacity", 0.3)),
    });
    expect(ticksOf(outcome.timeline, 1, "attack deals")[0]).toBe(47);
  });

  it("is stopped by crowd control immunity", () => {
    const outcome = duel(fighter({ abilities: [stun(1.5)] }), fighter(), {
      settings: { maxSeconds: 1 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "ccImmune")),
    });
    expect(ticksOf(outcome.timeline, 1, "attack deals")[0]).toBe(15);
  });

  it("applies only the strongest slow, then the speed soft cap", () => {
    const outcome = duel(fighter(), fighter(), {
      behaviors: [idle, idle],
      settings: { maxSeconds: 0.1 },
      setup: (world) => {
        const unit = world.units[1];
        unit.statuses.push(lasting("cc", "slow", 0.3), lasting("cc", "slow", 0.5));
        // 350 x 0.5 = 175, under 220: 110 + 175 / 2.
        expect(derive(unit).moveSpeed).toBe(197.5);
        unit.statuses.push(lasting("state", "slowImmune"));
        expect(derive(unit).moveSpeed).toBe(350);
      },
    });
    expect(outcome.timeout).toBe(1);
  });

  it("sleeps until damaged by a hit, but not by damage over time", () => {
    const sleep = ability({ key: "E", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "cc", cc: "sleep", duration: 3 }] });
    const poison = ability({ key: "W", cooldown: 100, castTime: 0, delivery: { kind: "target", range: 600 }, onHit: [{ type: "dot", damageType: "magic", total: { base: 300 }, duration: 3, interval: 1 }] });
    // Sleep, then only poison: the sleeper stays asleep for the whole 3 s.
    const dotOnly = duel(fighter({ abilities: [sleep, poison] }), fighter(), {
      behaviors: [castInOrder(["E", "W"]), undefined],
      settings: { maxSeconds: 4 },
    });
    expect(ticksOf(dotOnly.timeline, 1, "wakes up")).toEqual([]);
    expect(ticksOf(dotOnly.timeline, 1, "attack deals")[0]).toBe(90 + 15);
    // Sleep, then attack: the first attack wakes it.
    const woken = duel(fighter({ abilities: [sleep] }), fighter(), { settings: { maxSeconds: 4 } });
    expect(ticksOf(woken.timeline, 1, "wakes up")).toEqual([15]);
  });

  it("drags charmed units toward the source and drives feared ones away", () => {
    for (const [cc, sign] of [
      ["charm", -1],
      ["fear", 1],
    ] as const) {
      const spell = ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "cc", cc, duration: 1 }] });
      const world = createWorld({ fighters: [fighter({ abilities: [spell] }), fighter()], distance: 500, modes: ["fight", "fight"] });
      const start = world.units[1].x;
      // Side 1 (on the right) walks 350 units in its 30 ticks of crowd control, whatever it wants.
      for (let i = 0; i < 40; i++) step(world, [castFirst("Q"), standStill]);
      expect(world.units[1].x - start).toBeCloseTo(sign * 350, 6);
    }
  });

  it("makes taunted units walk up and attack the source", () => {
    const taunt = ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 1000 }, onHit: [{ type: "cc", cc: "taunt", duration: 2 }] });
    const outcome = duel(fighter({ abilities: [taunt] }), fighter(), { distance: 300, behaviors: [castFirst("Q"), idle], settings: { maxSeconds: 2 } });
    // 175 units to close at 350 per second: 15 ticks, then a 15-tick windup.
    expect(ticksOf(outcome.timeline, 1, "attack deals")[0]).toBe(30);
  });
});

describe("delivery", () => {
  it("lands delayed effects later", () => {
    const delayed = ability({ key: "Q", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "delayed", delay: 1, effects: [{ type: "damage", damageType: "true", amount: { base: 100 } }] }] });
    const outcome = duel(fighter({ abilities: [delayed] }), fighter(), { behaviors: [castFirst("Q"), idle], settings: { maxSeconds: 2 } });
    expect(ticksOf(outcome.timeline, 0, "Q deals 100 true")).toEqual([30]);
  });

  it("ends dashes on arrival and hits there", () => {
    const dash = ability({
      key: "E",
      cooldown: 100,
      delivery: { kind: "dash", direction: "toward", distance: 600, speed: 1200, hitRadius: 100 },
      onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }],
    });
    // 600 units at 1200 per second: 15 ticks, moving from tick 1.
    const outcome = duel(fighter({ abilities: [dash] }), fighter(), { distance: 600, behaviors: [castFirst("E"), idle], settings: { maxSeconds: 1 } });
    expect(ticksOf(outcome.timeline, 0, "E deals 100 true")).toEqual([15]);
  });

  it("knocks down dashes with airborne crowd control, unless they are unstoppable", () => {
    const dash = (knockdown: boolean) =>
      ability({
        key: "E",
        cooldown: 100,
        delivery: { kind: "dash", direction: "toward", distance: 600, speed: 600, hitRadius: 100 },
        onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }],
        flags: { knockdown },
      });
    const knockUp = ability({ key: "Q", cooldown: 100, delivery: { kind: "aura", radius: 1000 }, onHit: [{ type: "displace", direction: "away", distance: 0, duration: 0.5 }] });
    const knockAt = (tick: number): Behavior => (view) => (view.world.tick === tick ? { kind: "cast", ability: "Q" } : undefined);
    const stopped = duel(fighter({ abilities: [dash(true)] }), fighter({ abilities: [knockUp] }), { distance: 600, behaviors: [castFirst("E"), knockAt(10)], settings: { maxSeconds: 2 } });
    expect(ticksOf(stopped.timeline, 0, "dash knocked down")).toEqual([10]);
    expect(ticksOf(stopped.timeline, 0, "E deals")).toEqual([]);
    const unstoppable = duel(fighter({ abilities: [dash(false)] }), fighter({ abilities: [knockUp] }), { distance: 600, behaviors: [castFirst("E"), knockAt(10)], settings: { maxSeconds: 2 } });
    expect(ticksOf(unstoppable.timeline, 0, "E deals 100 true")).toEqual([30]);
  });

  it("interrupts channels with crowd control unless they can't be", () => {
    const channel = (interruptible: boolean) =>
      ability({
        key: "R",
        cooldown: 100,
        delivery: { kind: "self" },
        channel: { duration: 2, interruptible, onComplete: [{ type: "damage", damageType: "true", amount: { base: 500 } }], range: 1000 },
      });
    const stunAt30: Behavior = (view) => (view.world.tick === 30 ? { kind: "cast", ability: "Q" } : undefined);
    const interrupted = duel(fighter({ abilities: [channel(true)] }), fighter({ abilities: [stun(1)] }), { behaviors: [castFirst("R"), stunAt30], settings: { maxSeconds: 3 } });
    expect(ticksOf(interrupted.timeline, 0, "interrupted by stun")).toEqual([30]);
    expect(interrupted.damage[0]).toBe(0);
    const solid = duel(fighter({ abilities: [channel(false)] }), fighter({ abilities: [stun(1)] }), { behaviors: [castFirst("R"), stunAt30], settings: { maxSeconds: 3 } });
    expect(ticksOf(solid.timeline, 0, "R deals 500 true")).toEqual([60]);
  });

  it("blocks projectile abilities with a wall, but not instant ones", () => {
    const bolt = (speed?: number) => ability({ key: "Q", cooldown: 100, delivery: speed ? { kind: "target", range: 1000, missileSpeed: speed } : { kind: "target", range: 1000 }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }] });
    const wall = (world: World) =>
      world.zones.push({ id: 999, owner: 1, kind: "projectileWall", seenTick: 0, x: 400, radius: 0, startTick: 0, endTick: 1000 });
    const missile = duel(fighter({ abilities: [bolt(1500)] }), fighter(), { distance: 600, behaviors: [castFirst("Q"), idle], settings: { maxSeconds: 2 }, setup: wall });
    expect(missile.damage[0]).toBe(0);
    const instant = duel(fighter({ abilities: [bolt()] }), fighter(), { distance: 600, behaviors: [castFirst("Q"), idle], settings: { maxSeconds: 2 }, setup: wall });
    expect(instant.damage[0]).toBe(100);
  });
});

describe("ability defenses", () => {
  it("negates one ability with a spell shield", () => {
    const outcome = duel(fighter({ abilities: [stun(1.5, { cooldown: 1 })] }), fighter(), {
      behaviors: [undefined, idle],
      settings: { maxSeconds: 1.5 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 })),
    });
    expect(ticksOf(outcome.timeline, 1, "spell shield blocks Q")).toEqual([0]);
    expect(ticksOf(outcome.timeline, 0, "stun 0%").length + ticksOf(outcome.timeline, 0, "stun for").length).toBe(1);
  });

  it("raises a spell shield in time against a telegraphed stun, but not a quick one", () => {
    const shield = ability({ key: "E", cooldown: 20, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: 1.5, charges: 1 }] });
    // Reaction 0.25 s: a 0.5 s cast is seen in time, a 0.2 s cast is not.
    const slow = duel(fighter({ abilities: [stun(1.5, { castTime: 0.5 })] }), fighter({ abilities: [shield] }), { settings: { maxSeconds: 1 } });
    expect(ticksOf(slow.timeline, 1, "spell shield blocks")).toEqual([15]);
    const quick = duel(fighter({ abilities: [stun(1.5, { castTime: 0.2 })] }), fighter({ abilities: [shield] }), { settings: { maxSeconds: 1 } });
    expect(ticksOf(quick.timeline, 1, "spell shield blocks")).toEqual([]);
  });

  it("parries an immobilizing ability and stuns back, but not a damage-only one", () => {
    const riposte = ability({ key: "W", cooldown: 20, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "parry", duration: 0.75, value: 1.5 }] });
    const slowStun = stun(1, { castTime: 0.5 });
    const stunned = duel(fighter({ abilities: [slowStun] }), fighter({ abilities: [riposte] }), { settings: { maxSeconds: 1 } });
    expect(ticksOf(stunned.timeline, 1, "parries Q")).toEqual([15]);
    expect(ticksOf(stunned.timeline, 1, "stun")).toEqual([15]);
    const damage = duel(fighter({ abilities: [nuke(500, { castTime: 0.5 })] }), fighter({ abilities: [riposte] }), { settings: { maxSeconds: 1 } });
    expect(ticksOf(damage.timeline, 1, "parries Q")).toEqual([15]);
    expect(ticksOf(damage.timeline, 1, "stun")).toEqual([]);
  });

  it("dodges a targeted spell by turning untargetable during its cast time", () => {
    const vanish = ability({ key: "W", cooldown: 20, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "untargetable", duration: 1 }] });
    // The 0.5 s (15-tick) cast is seen on tick 8; untargetability (30 ticks) cancels it.
    const outcome = duel(fighter({ abilities: [nuke(800, { castTime: 0.5 })] }), fighter({ abilities: [vanish] }), { behaviors: [undefined, onlyReact], settings: { maxSeconds: 2 } });
    expect(ticksOf(outcome.timeline, 1, "casts W")).toEqual([8]);
    // A cancelled cast doesn't go on cooldown: it is cast again the moment the target reappears.
    expect(ticksOf(outcome.timeline, 0, "casts Q")).toEqual([0, 38]);
    expect(ticksOf(outcome.timeline, 0, "Q deals 800 true")).toEqual([53]);
  });

  it("cleanses long crowd control", () => {
    const cleanse = ability({ key: "W", cooldown: 20, delivery: { kind: "self" }, onSelf: [{ type: "cleanse" }], flags: { usableWhileDisabled: true } });
    const outcome = duel(fighter({ abilities: [stun(3)] }), fighter({ abilities: [cleanse] }), { settings: { maxSeconds: 2 } });
    expect(ticksOf(outcome.timeline, 1, "cleanses crowd control")).toEqual([0]);
    expect(ticksOf(outcome.timeline, 1, "attack deals")[0]).toBe(15);
  });

  it("keeps an execute from killing below a minimum health threshold", () => {
    const execute = ability({ key: "R", cooldown: 100, delivery: { kind: "target", range: 600 }, onHit: [{ type: "execute", threshold: { base: 2500 } }] });
    const outcome = duel(fighter({ abilities: [execute] }), fighter(), {
      behaviors: [castFirst("R"), idle],
      settings: { maxSeconds: 0.5 },
      setup: (world) => world.units[1].statuses.push(lasting("state", "minimumHealth", 100)),
    });
    expect(outcome.win[0]).toBe(0);
    expect(outcome.hp[1]).toBeCloseTo(100 / 2000, 9);
    const unprotected = duel(fighter({ abilities: [execute] }), fighter(), { behaviors: [castFirst("R"), idle], settings: { maxSeconds: 0.5 } });
    expect(unprotected.win[0]).toBe(1);
  });
});

/** Uses abilities in the given order, one per tick, as soon as they are castable. */
function castInOrder(keys: string[]): Behavior {
  return (view) => {
    const done = Number(view.self.memory.done ?? 0);
    const key = keys[done];
    if (key === undefined) return undefined;
    view.self.memory.done = done + 1;
    return { kind: "cast", ability: key };
  };
}

/** Never attacks; only answers threats (the default behavior's reactions). */
const onlyReact: Behavior = (view) => {
  for (const spec of view.self.spec.abilities) {
    const state = (spec.onSelf ?? []).find((e: Effect) => e.type === "state");
    if (state && view.threats.some((t) => t.eta > 0 && t.damage > 0)) return { kind: "cast", ability: spec.key };
  }
  return undefined;
};

describe("falloff", () => {
  const slam = ability({ key: "Q", cooldown: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "true", amount: { base: 100 } }], falloff: { group: "slam", window: 0.66, per: 0.5, floor: 0.25 } });

  it("cuts a hit by its share for each hit of the group the target took in the window, down to the floor", () => {
    const w = createWorld({ fighters: [fighter({ abilities: [slam] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const [caster, target] = w.units;
    const hit = (scale = 1) => {
      const before = target.hp;
      abilityHit(w, caster, target, slam, slam.onHit ?? [], scale);
      return before - target.hp;
    };
    // Three at once: full, half and a quarter; never less than a quarter.
    expect([hit(), hit(), hit(), hit()]).toEqual([100, 50, 25, 25]);
    // 0.66 s is 20 ticks: by then the earlier hits no longer count.
    for (let i = 0; i < 20; i++) step(w, [idle, idle]);
    // A hit counted at half its value (a skillshot by expected value) takes a quarter off the next.
    expect(hit(0.5)).toBe(50);
    expect(hit()).toBe(75);
  });
});

