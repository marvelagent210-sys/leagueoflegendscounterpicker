import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { canCast } from "../../engine/sim/actions";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { castWhenReady, standStill } from "./helpers";
import { ability, fighter } from "./kits";

const trueDamage = (amount: number): Effect => ({ type: "damage", damageType: "true", amount: { base: amount } });

/** Steps until `key` is castable again; returns the tick. */
function readyTick(world: World, key: string, limit = 900): number {
  const self = world.units[0];
  const spec = self.spec.abilities.find((a) => a.key === key);
  if (!spec) throw new Error(key);
  for (let i = 0; i < limit; i++) {
    if (canCast(world, self, spec)) return world.tick;
    step(world, [standStill, standStill]);
  }
  return -1;
}

describe("post-effect cooldowns (wiki: Cooldown starts: post-effect)", () => {
  it("wait for the empowered attack", () => {
    // A 5 s cooldown that starts only once the empowered attack is spent.
    const bite: AbilitySpec = ability({
      key: "Q",
      cooldown: 5,
      cooldownAfter: "empower",
      delivery: { kind: "self" },
      onSelf: [{ type: "empower", attacks: 1, window: 7, onHit: [trueDamage(10)] }],
    });
    const world = createWorld({ fighters: [fighter({ abilities: [bite] }), fighter()], distance: 1000, modes: ["idle", "idle"] });
    step(world, [castWhenReady("Q"), standStill]);
    // Out of range, the empowerment waits its 7 s, then the cooldown runs 5 s more.
    expect(readyTick(world, "Q")).toBe(360);
  });

  it("start once the empowered attack lands", () => {
    const bite: AbilitySpec = ability({
      key: "Q",
      cooldown: 5,
      cooldownAfter: "empower",
      delivery: { kind: "self" },
      onSelf: [{ type: "empower", attacks: 1, window: 7, onHit: [trueDamage(10)] }],
    });
    const world = createWorld({ fighters: [fighter({ abilities: [bite] }), fighter()], distance: 100, modes: ["fight", "idle"] });
    const self = world.units[0];
    // Cast, then attack: the windup spends the empowerment, and the cooldown starts as the attack lands.
    step(world, [castWhenReady("Q"), standStill]);
    let spent = -1;
    let landed = -1;
    for (let i = 0; i < 120 && landed < 0; i++) {
      const tick = world.tick;
      step(world, [() => ({ kind: "attack" }), standStill]);
      if (spent < 0 && !self.statuses.some((s) => s.kind === "empower")) {
        spent = tick;
        expect(self.action?.kind).toBe("windup");
      }
      if (spent >= 0 && self.action === undefined) landed = tick;
      else if (spent >= 0) expect(self.cooldownReady.Q).toBe(Number.POSITIVE_INFINITY);
    }
    expect(landed).toBeGreaterThan(spent);
    expect(self.cooldownReady.Q).toBe(landed + 150);
  });

  it("wait for the channel", () => {
    const spin: AbilitySpec = ability({
      key: "E",
      cooldown: 6,
      cooldownAfter: "channel",
      delivery: { kind: "self" },
      channel: { duration: 3, interruptible: false, mobile: true, range: 300, interval: 0.5, onTick: [trueDamage(5)] },
    });
    const world = createWorld({ fighters: [fighter({ abilities: [spin] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    step(world, [castWhenReady("E"), standStill]);
    // 3 s of spinning, then 6 s of cooldown.
    expect(readyTick(world, "E")).toBe(270);
  });

  it("wait for the field to fade", () => {
    const mist: AbilitySpec = ability({
      key: "W",
      cooldown: 10,
      cooldownAfter: "field",
      delivery: { kind: "field", range: 0, radius: 200, duration: 4, interval: 1, attached: true },
    });
    const world = createWorld({ fighters: [fighter({ abilities: [mist] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    step(world, [castWhenReady("W"), standStill]);
    expect(readyTick(world, "W")).toBe(420);
  });

  it("wait for the state on the caster", () => {
    const evade: AbilitySpec = ability({
      key: "E",
      cooldown: 8,
      cooldownAfter: "state",
      delivery: { kind: "self" },
      onSelf: [{ type: "state", state: "dodgeAttacks", duration: 2 }],
    });
    const world = createWorld({ fighters: [fighter({ abilities: [evade] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    step(world, [castWhenReady("E"), standStill]);
    expect(readyTick(world, "E")).toBe(300);
  });

  it("count the wait in the stat budget", () => {
    const spin = (cooldownAfter?: "channel"): AbilitySpec =>
      ability({
        key: "E",
        cooldown: 6,
        ...(cooldownAfter ? { cooldownAfter } : {}),
        delivery: { kind: "self" },
        channel: { duration: 3, interruptible: false, mobile: true, range: 300, interval: 0.5, onTick: [trueDamage(5)] },
      });
    // 6 pulses of 5 per cycle: every 6 s, or every 9 s when the cooldown waits for the spin.
    expect(damagePerSecond(fighter({ abilities: [spin()], attack: { range: 0 } }), fighter()).true).toBeCloseTo(30 / 6, 9);
    expect(damagePerSecond(fighter({ abilities: [spin("channel")], attack: { range: 0 } }), fighter()).true).toBeCloseTo(30 / 9, 9);
  });
});

describe("charges", () => {
  const harpoon = (): AbilitySpec =>
    ability({ key: "E", cooldown: 0.5, charges: { max: 2, recharge: 6 }, delivery: { kind: "aura", radius: 500 }, onHit: [trueDamage(10)] });

  it("start full, are spent one a cast with the cooldown between casts, and restock one at a time", () => {
    const world = createWorld({ fighters: [fighter({ abilities: [harpoon()] }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const self = world.units[0];
    const spec = self.spec.abilities[0];
    if (!spec) throw new Error("no ability");
    step(world, [castWhenReady("E"), standStill]);
    // The second charge waits out the 0.5 s between casts.
    expect(canCast(world, self, spec)).toBe(false);
    expect(readyTick(world, "E")).toBe(15);
    step(world, [castWhenReady("E"), standStill]);
    // Both spent: the first restocks 6 s after the first cast, the second 6 s after that.
    expect(readyTick(world, "E")).toBe(180);
    step(world, [castWhenReady("E"), standStill]);
    expect(readyTick(world, "E")).toBe(360);
  });

  it("pace the stat budget by their recharge", () => {
    // 10 damage per charge, one charge every 6 s.
    expect(damagePerSecond(fighter({ abilities: [harpoon()], attack: { range: 0 } }), fighter()).true).toBeCloseTo(10 / 6, 9);
  });
});
