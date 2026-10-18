import { describe, expect, it } from "vitest";
import { ccDuration, combineTenacity } from "../../engine/rules/crowdControl";
import { combineSlowResist, movementSpeed } from "../../engine/rules/movement";
import { applyCC } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import type { Status } from "../../engine/sim/state";
import { fighter } from "./kits";

function status(kind: Status["kind"], key: string, value: number): Status {
  return { kind, key, value, source: 1, startTick: 0, endTick: 30 };
}

describe("derived combat rules from the dataset's pinned wiki revisions", () => {
  it("combines slow resistance multiplicatively, including the wiki's Urgot/Swiftness example", () => {
    // Slow resist, revision 4058780: Purge's 40% and Swiftness's 25% leave
    // 60% * 75% = 45% of a slow's strength, for 55% resistance.
    expect(combineSlowResist([0.4, 0.25])).toBeCloseTo(0.55, 12);
    expect(combineSlowResist([])).toBe(0);
    expect(combineSlowResist([1, 0.4])).toBe(1);
    expect(movementSpeed(350, { slows: [0.4], slowResist: 1.2 })).toBe(350);
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 100, modes: ["idle", "idle"] });
    const unit = world.units[0];
    unit.statuses = [status("cc", "slow", 0.4), status("stat", "slowResist", 0.4), status("stat", "slowResist", 0.25)];
    expect(derive(unit).moveSpeed).toBeCloseTo(350 * (1 - 0.4 * 0.6 * 0.75), 12);
  });

  it("caps total tenacity at 100% while allowing negative tenacity", () => {
    // Tenacity, revision 4021927: modifier groups add, then cap at 100%.
    expect(combineTenacity([[0.8], [0.6]])).toBe(1);
    expect(combineTenacity([[-0.3]])).toBeCloseTo(-0.3, 12);
    expect(ccDuration(2, "stun", -0.3)).toBeCloseTo(2.6, 12);
  });

  it("stacks independent cripples while counting a refreshed/ramping cripple once", () => {
    // Attack speed, revision 4073067: distinct reductions multiply. Wither's
    // increasing pulses refresh the same W debuff, rather than adding new sources.
    const world = createWorld({ fighters: [fighter({ base: { attackSpeed: { base: 1.25, ratio: 0, bonus: 0 } } }), fighter()], distance: 100, modes: ["idle", "idle"] });
    const unit = world.units[0];
    unit.statuses = [
      { ...status("cc", "cripple", 0.25), ability: "W" },
      { ...status("cc", "cripple", 0.4), ability: "E" },
    ];
    expect(derive(unit).attackSpeed).toBeCloseTo(1.25 * 0.75 * 0.6, 12);

    unit.statuses = [
      { ...status("cc", "cripple", 0.2625), ability: "W" },
      { ...status("cc", "cripple", 0.3825), ability: "W" },
    ];
    expect(derive(unit).attackSpeed).toBeCloseTo(1.25 * (1 - 0.3825), 12);
    // Direct hook applications without an ability key still distinguish casters.
    unit.statuses = [status("cc", "cripple", 0.25), { ...status("cc", "cripple", 0.4), source: 0 }];
    expect(derive(unit).attackSpeed).toBeCloseTo(1.25 * 0.75 * 0.6, 12);
  });

  it("preserves the 0.3-second minimum when tenacity shortens a disable", () => {
    // Tenacity, revision 4021927: duration is determined when applied and
    // cannot be reduced below 0.3 s. Naturally shorter pulses are not extended.
    expect(ccDuration(0.5, "stun", 0.6)).toBeCloseTo(0.3, 12);
    expect(ccDuration(2, "root", 1)).toBeCloseTo(0.3, 12);
    expect(ccDuration(2, "root", 1.5)).toBeCloseTo(0.3, 12);
    expect(ccDuration(0.1, "slow", 0.6)).toBeCloseTo(0.1, 12);
    expect(ccDuration(0, "stun", 0.6)).toBe(0);
    expect(ccDuration(0.1, "slow", -0.3)).toBeCloseTo(0.13, 12);
  });

  it("does not apply tenacity or its duration floor to excluded CC types", () => {
    for (const type of ["airborne", "drowsy", "nearsight", "stasis", "suppression"] as const) {
      expect(ccDuration(0.1, type, 1)).toBe(0.1);
      expect(ccDuration(2, type, -0.3)).toBe(2);
    }
  });

  it("snapshots tenacity on application instead of changing an ongoing disable", () => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 100, modes: ["idle", "idle"] });
    const [source, target] = world.units;
    target.statuses = [status("state", "tenacity", 0.6)];
    expect(applyCC(world, source, target, "stun", 0.5)).toBe(true);
    const stun = target.statuses.find((s) => s.key === "stun")!;
    expect(stun.endTick).toBe(9);
    target.statuses = target.statuses.filter((s) => s.kind !== "state");
    expect(derive(target).tenacity).toBe(0);
    expect(stun.endTick).toBe(9);
  });

  it("never turns a large negative movement modifier into reverse movement", () => {
    // Movement speed, revision 4064468: movement speed cannot fall below 0.
    expect(movementSpeed(350, { flat: -12000 })).toBe(0);
    expect(movementSpeed(350, { flat: -10350 })).toBe(10);
  });
});
