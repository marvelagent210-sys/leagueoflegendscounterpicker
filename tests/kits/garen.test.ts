import { describe, expect, it } from "vitest";
import { derive, evaluate } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import { kit } from "./helpers";

describe("Garen", () => {
  const garen = kit("Garen");
  const ability = (key: string) => {
    const found = garen.spec.abilities.find((a) => a.key === key);
    if (!found) throw new Error(key);
    return found;
  };

  it("reads his numbers from the wiki at level 20", () => {
    expect(ability("R").onHit).toEqual([{ type: "damage", damageType: "true", amount: { base: 275, ratios: { targetMissingHP: 0.35 } } }]);
    expect(ability("R").delivery).toEqual({ kind: "target", range: 400 });
    expect(ability("E").cooldown).toBe(6);
    expect(ability("W").cooldown).toBe(12);
    expect(garen.assumptions).toContain("Courage stacks collected by level 20 (0.2 armor and magic resistance each, up to 150): 150.");
  });

  it("spins at least 9 times at level 20, as the wiki's note says", () => {
    const world = createWorld({ fighters: [garen.spec, garen.spec], distance: 0, modes: ["idle", "idle"] });
    const spins = ability("E").channel?.pulses;
    expect(spins).toBeDefined();
    expect(Math.floor(evaluate(spins ?? { base: 0 }, world.units[0]))).toBe(9);
  });

  it("has 30 bonus armor and magic resistance from full Courage stacks", () => {
    const world = createWorld({ fighters: [garen.spec, garen.spec], distance: 0, modes: ["idle", "idle"] });
    const d = derive(world.units[0]);
    expect(d.armor.bonus).toBeCloseTo(30, 9);
    expect(d.mr.bonus).toBeCloseTo(30, 9);
  });
});
