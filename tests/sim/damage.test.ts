import { describe, expect, it } from "vitest";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { createWorld, step } from "../../engine/sim/simulate";
import type { Effect } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { fighter } from "./kits";
import { idle, lasting } from "./helpers";

function world(): World {
  return createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
}

function apply(w: World, effect: Effect, toSelf = false): void {
  applyEffect(w, w.units[0], toSelf ? w.units[0] : w.units[1], effect, { scale: 1 });
}

describe("damage and mitigation in the simulator", () => {
  it("mitigates by resistances, penetration and damage modifiers", () => {
    const w = world();
    const [a, b] = w.units;
    // 100 armor: half of 200 physical damage.
    expect(dealDamage(w, a, b, 200, "physical")).toBe(100);
    // 30 lethality: 70 armor, 200 x 100 / 170.
    a.statuses.push(lasting("stat", "lethality", 30));
    expect(dealDamage(w, a, b, 200, "physical")).toBeCloseTo(200 / 1.7, 9);
    // 20% damage reduction on the target, true damage.
    b.statuses.push(lasting("state", "damageReduction", 0.2));
    expect(dealDamage(w, a, b, 100, "true")).toBeCloseTo(80, 9);
  });

  it("absorbs with shields of the right type, soonest to expire first", () => {
    const w = world();
    const [a, b] = w.units;
    apply(w, { type: "shield", amount: { base: 100 }, duration: 2, shieldType: "magic" });
    apply(w, { type: "shield", amount: { base: 50 }, duration: 1 });
    apply(w, { type: "shield", amount: { base: 50 }, duration: 3 });
    // 200 physical into 100 armor is 100: the normal shields take it (the 1 s one first).
    expect(dealDamage(w, a, b, 200, "physical")).toBe(0);
    expect(b.statuses.filter((s) => s.kind === "shield").map((s) => s.value)).toEqual([100]);
    // Magic damage: the magic shield absorbs 100 of 150.
    expect(dealDamage(w, a, b, 300, "magic")).toBe(50);
    expect(b.totals.absorbed).toBe(200);
  });

  it("heals less under Grievous Wounds, never past maximum health, and not a dying unit", () => {
    const w = world();
    const b = w.units[1];
    b.hp = 1000;
    apply(w, { type: "heal", amount: { base: 100 } });
    expect(b.hp).toBe(1100);
    apply(w, { type: "grievousWounds", duration: 3 });
    apply(w, { type: "heal", amount: { base: 100 } });
    expect(b.hp).toBe(1160);
    apply(w, { type: "heal", amount: { base: 5000 } });
    expect(b.hp).toBe(2000);
    b.hp = -5;
    apply(w, { type: "heal", amount: { base: 100 } });
    expect(b.hp).toBe(-5);
  });

  it("deals damage over time on its interval, and regenerates health", () => {
    const w = createWorld({
      fighters: [fighter(), fighter({ base: { hpRegen: 50 } })],
      distance: 0,
      modes: ["idle", "idle"],
    });
    const b = w.units[1];
    b.hp = 1000;
    apply(w, { type: "dot", damageType: "true", total: { base: 300 }, duration: 3, interval: 1 });
    const seen: number[] = [];
    for (let i = 0; i <= 150; i++) {
      const before = b.hp;
      step(w, [idle, idle]);
      if (before - b.hp > 50) seen.push(w.tick - 1);
    }
    // Hits of 100 on ticks 30, 60 and 90; 50 health per 5 s regenerated meanwhile.
    expect(seen).toEqual([30, 60, 90]);
    expect(b.hp).toBeCloseTo(1000 - 300 + (50 / 150) * 151, 6);
  });

  it("caps damage at the health left (no overkill) and credits executes", () => {
    const w = world();
    const [a, b] = w.units;
    b.hp = 30;
    expect(dealDamage(w, a, b, 1000, "true")).toBe(30);
    b.hp = 400;
    apply(w, { type: "execute", threshold: { base: 500 } });
    expect(b.hp).toBe(0);
    expect(a.totals.damageDealt).toBe(430);
  });
});
