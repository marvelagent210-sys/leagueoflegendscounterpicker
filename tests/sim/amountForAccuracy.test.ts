import { describe, expect, it } from "vitest";
import { expectedDamage, perceive, react, threatsTo } from "../../engine/sim/behavior";
import { effectText } from "../../engine/sim/describe";
import { createWorld } from "../../engine/sim/simulate";
import type { Effect } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";

describe("state-dependent damage decisions and descriptions", () => {
  it("uses current caster and target state for threat perception and mitigated decisions", () => {
    const hit: Effect = { type: "damage", damageType: "physical", amount: { base: 9999 }, amountFor: (caster, target) => Number(caster.memory.power ?? 100) + target.hp * 0.1 };
    const blast = ability({ key: "Q", castTime: 1, delivery: { kind: "target", range: 500 }, onHit: [hit] });
    const world = createWorld({ fighters: [fighter({ abilities: [blast] }), fighter()], distance: 0, modes: ["idle", "idle"], settings: { reactionTime: 0 } });
    const [caster, target] = world.units;
    caster.action = { kind: "cast", ability: "Q", startTick: 0, endTick: 30 };
    expect(threatsTo(world, 1)[0]?.damage).toBe(300);
    expect(expectedDamage([hit], caster, target)).toBe(150);
    target.hp = 1000;
    caster.memory.power = 500;
    expect(threatsTo(world, 1)[0]?.damage).toBe(600);
    expect(expectedDamage([hit], caster, target)).toBe(300);
  });

  it("keeps callback damage floors and responds only when the actual damage warrants a shield", () => {
    const hit: Effect = { type: "damage", damageType: "physical", amount: { base: 9999 }, amountFor: () => 0, minimum: { base: 100 } };
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    expect(expectedDamage([hit], world.units[0], world.units[1])).toBe(50);
    const blast = ability({ key: "Q", castTime: 1, delivery: { kind: "target", range: 500 }, onHit: [{ type: "damage", damageType: "magic", amount: { base: 10 }, amountFor: (caster) => Number(caster.memory.power ?? 0) }] });
    const shield = ability({ key: "W", delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: 1.5, charges: 1 }] });
    const threatened = createWorld({ fighters: [fighter({ abilities: [blast] }), fighter({ abilities: [shield] })], distance: 0, modes: ["idle", "fight"], settings: { reactionTime: 0 } });
    threatened.units[0].action = { kind: "cast", ability: "Q", startTick: 0, endTick: 30 };
    threatened.units[0].memory.power = 400;
    expect(react(perceive(threatened, 1))).toEqual({ kind: "cast", ability: "W" });
    threatened.units[0].memory.power = 20;
    expect(react(perceive(threatened, 1))).toBeUndefined();
  });

  it("labels the baseline as a reference without executing the damage callback", () => {
    const effect: Effect = { type: "damage", damageType: "physical", amount: { base: 100, ratios: { AD: 0.5 } }, amountFor: () => { throw new Error("Descriptions cannot evaluate combat state"); } };
    expect(effectText(effect)).toBe("100 + 50% AD physical damage, varies with combat state; formula is a reference");
    expect(effectText({ type: "damage", damageType: "physical", amount: { base: 100 } })).toBe("100 physical damage");
  });
});
