import { describe, expect, it } from "vitest";
import { expectedDamage } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { createWorld } from "../../engine/sim/simulate";
import { ability, fighter } from "./kits";
import { duel, idle, ticksOf } from "./helpers";

describe("damage-aware decisions", () => {
  it("estimates armor penetration, critical hits and minimum damage through the real damage rules", () => {
    const w = createWorld({ fighters: [fighter({ bonus: { critChance: 0.5 } }), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "armorPen", amount: { base: 0.5 }, duration: 10 }, { scale: 1 });
    expect(expectedDamage([{ type: "damage", damageType: "physical", amount: { base: 10 }, minimum: { base: 100 }, canCrit: true }], w.units[0], w.units[1])).toBeCloseTo(100 * 1.5 / 1.5, 12);
  });

  it("uses true damage finishers despite damage reduction and an unrelated magic shield", () => {
    const r = ability({ key: "R", slot: "R", cooldown: 100, delivery: { kind: "target", range: 600 }, roles: ["finisher"], onHit: [{ type: "damage", damageType: "true", amount: { base: 1000 } }] });
    const outcome = duel(fighter({ abilities: [r] }), fighter({ base: { hp: 900 } }), {
      behaviors: [undefined, idle], settings: { maxSeconds: 0.5 }, setup(w) {
        applyEffect(w, w.units[1], w.units[1], { type: "state", state: "damageReduction", value: 0.8, duration: 10 }, { scale: 1 });
        applyEffect(w, w.units[1], w.units[1], { type: "shield", shieldType: "magic", amount: { base: 2000 }, duration: 10 }, { scale: 1 });
      },
    });
    expect(ticksOf(outcome.timeline, 0, "casts R")).toEqual([0]);
    expect(outcome.win).toEqual([1, 0]);
  });

  it("estimates a mixed hit with shared shields without spending them", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    applyEffect(w, w.units[1], w.units[1], { type: "shield", amount: { base: 80 }, duration: 10 }, { scale: 1 });
    const effects = [{ type: "damage" as const, damageType: "physical" as const, amount: { base: 100 } }, { type: "damage" as const, damageType: "magic" as const, amount: { base: 100 } }];
    expect(expectedDamage(effects, w.units[0], w.units[1], true)).toBe(20);
    expect(w.units[1].statuses.find((s) => s.kind === "shield")?.value).toBe(80);
  });
});
