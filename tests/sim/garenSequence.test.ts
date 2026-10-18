import { describe, expect, it } from "vitest";
import { perceive } from "../../engine/sim/behavior";
import { startCast } from "../../engine/sim/actions";
import { createWorld } from "../../engine/sim/simulate";
import { dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { kit } from "../kits/helpers";
import { duel, idle, lasting } from "./helpers";
import { fighter } from "./kits";

describe("Garen's Decisive Strike before Judgment", () => {
  it("closes the remaining Q gap and lands its silence before starting the spin", () => {
    const result = duel(kit("Garen").spec, fighter({ base: { hp: 10_000, ad: 0 } }), {
      distance: 270,
      behaviors: [undefined, idle],
      settings: { maxSeconds: 4 },
    });
    const silence = result.timeline.find((entry) => entry.side === 0 && entry.text.includes("inflicts silence"));
    const spin = result.timeline.find((entry) => entry.side === 0 && entry.text === "casts Judgment");
    expect(silence).toBeDefined();
    expect(spin).toBeDefined();
    // Completion precedes the next decision even when both happen on the same game tick.
    expect(result.timeline.indexOf(silence!)).toBeLessThan(result.timeline.indexOf(spin!));
  });

  it("preserves a killing ultimate's priority over an armed Q", () => {
    const garen = kit("Garen").spec;
    const w = createWorld({ fighters: [garen, fighter()], distance: 0, modes: ["fight", "idle"] });
    const [self, enemy] = w.units;
    enemy.hp = 100;
    startCast(w, self, garen.abilities.find((a) => a.key === "Q")!);
    expect(garen.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "R" });
  });

  it("keeps hold mode from chasing just to spend an armed Q", () => {
    const garen = kit("Garen").spec;
    const w = createWorld({ fighters: [garen, fighter()], distance: 250, modes: ["hold", "idle"] });
    startCast(w, w.units[0], garen.abilities.find((a) => a.key === "Q")!);
    expect(garen.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "E" });
  });

  it("does not defer a usable spin when Q's approach haste has already ended", () => {
    const garen = kit("Garen").spec;
    const w = createWorld({ fighters: [garen, fighter()], distance: 250, modes: ["fight", "idle"] });
    const self = w.units[0];
    startCast(w, self, garen.abilities.find((a) => a.key === "Q")!);
    self.statuses = self.statuses.filter((s) => s.memoKey !== "Q:moveSpeedPercent");
    expect(garen.behavior!(perceive(w, 0))).toEqual({ kind: "cast", ability: "E" });
  });
});

describe("Garen's Perseverance lockout", () => {
  it("keeps regenerating after damage entirely absorbed by a shield", () => {
    // Perseverance rev 4038338 explicitly excludes damage dealt to shields.
    const w = createWorld({ fighters: [fighter(), kit("Garen").spec], distance: 0, modes: ["idle", "idle"] });
    const [enemy, garen] = w.units;
    garen.hp = derive(garen).maxHp - 500;
    garen.statuses.push(lasting("shield", "test", 200));
    w.tick = 60;
    expect(dealDamage(w, enemy, garen, 100, "true")).toBe(0);
    expect(garen.memory.hurtTick).toBeUndefined();
    const before = garen.hp;
    garen.spec.hooks!.onTick!(hookContext(w, garen));
    expect(garen.hp - before).toBeCloseTo(0.109 * derive(garen).maxHp / 150, 8);
  });

  it("starts on health damage and does not refresh from a later shield-only hit", () => {
    const w = createWorld({ fighters: [fighter(), kit("Garen").spec], distance: 0, modes: ["idle", "idle"] });
    const [enemy, garen] = w.units;
    w.tick = 30;
    expect(dealDamage(w, enemy, garen, 50, "true")).toBe(50);
    expect(garen.memory.hurtTick).toBe(30);
    garen.statuses.push(lasting("shield", "test", 50));
    w.tick = 90;
    expect(dealDamage(w, enemy, garen, 100, "true")).toBe(50);
    expect(garen.memory.hurtTick).toBe(90);
    garen.statuses.push(lasting("shield", "test", 200));
    w.tick = 150;
    expect(dealDamage(w, enemy, garen, 100, "true")).toBe(0);
    expect(garen.memory.hurtTick).toBe(90);
  });
});
