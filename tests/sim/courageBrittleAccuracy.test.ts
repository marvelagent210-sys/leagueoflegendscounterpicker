import { describe, expect, it } from "vitest";
import { applyEffect, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import { kit } from "../kits/helpers";

describe("Courage's specific Brittle stacking exception", () => {
  it("tags the compiled kit effects and adds Courage to Brittle as its pinned note requires", () => {
    // Courage revision 4064595 explicitly states additive stacking with Brittle;
    // the older Tenacity revision 4021927 instead implies multiplication in group C.
    const garen = kit("Garen").spec;
    const ornn = kit("Ornn").spec;
    const world = createWorld({ fighters: [garen, ornn], distance: 0, modes: ["idle", "idle"] });
    const courage = garen.abilities.find((ability) => ability.key === "W")!;
    for (const effect of courage.onSelf ?? []) applyEffect(world, world.units[0], world.units[0], effect, { ability: courage, scale: 1 });
    const call = ornn.abilities.find((ability) => ability.key === "R")!;
    ornn.hooks!.onAbilityHit!({ ...hookContext(world, world.units[1], call), ability: call, scale: 1 });
    const tenacity = world.units[0].statuses.filter((status) => status.kind === "state" && status.key === "tenacity");
    expect(tenacity).toHaveLength(2);
    expect(tenacity.map((status) => status.tenacityGroup)).toEqual(["courage-brittle", "courage-brittle"]);
    expect(derive(world.units[0]).tenacity).toBeCloseTo(0.6 - 0.3, 12);
  });
});
