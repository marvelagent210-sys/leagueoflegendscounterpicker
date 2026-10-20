import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { perceive } from "../../engine/sim/behavior";
import { simulateMatchup } from "../../engine/sim/matchup";
import { createWorld } from "../../engine/sim/simulate";
import { kit } from "./helpers";

const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;

describe("Darius positioning after swapping champion sides", () => {
  const darius = kit("Darius").spec;
  const xin = kit("XinZhao").spec;

  it.each([
    [0, -28.000000000000014, 252.00000000000017],
    [1, 727.9999999999997, 447.9999999999999],
  ] as const)("holds side%i at the reflected 280-unit Decimate movement boundary", (side, selfX, enemyX) => {
    const world = createWorld({ fighters: side === 0 ? [darius, xin] : [xin, darius], distance: 150, modes: ["idle", "idle"] });
    const self = world.units[side];
    const enemy = world.units[side === 0 ? 1 : 0];
    self.x = selfX;
    enemy.x = enemyX;
    world.tick = 54;
    self.action = { kind: "cast", ability: "Q", startTick: 33, endTick: 56 };
    // Real Xin/Darius trade positions round the same center gap to opposite sides
    // of 280. An extra step changes the disengagement tick and passive regeneration.
    expect(darius.behavior!(perceive(world, side))).toEqual({ kind: "move", direction: 0 });
  });

  it("still steps away from the handle and toward an enemy meaningfully beyond the blade", () => {
    const world = createWorld({ fighters: [darius, xin], distance: 150, modes: ["idle", "idle"] });
    const self = world.units[0];
    self.action = { kind: "cast", ability: "Q", startTick: 0, endTick: 23 };
    world.units[1].x = 279.999;
    expect(darius.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    world.units[1].x = 440.001;
    expect(darius.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: 1 });
  });

  it("uses the same builds and opposite scenario scores for Xin/Darius at 15,000 gold", () => {
    const forward = simulateMatchup(xin, darius, 15000, prices);
    const reverse = simulateMatchup(darius, xin, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else {
        expect(other.score).toBeDefined();
        expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
      }
    }
    const yourTrade = forward.scenarios[3]!.outcomes;
    const theirTrade = reverse.scenarios[3]!.outcomes;
    expect(yourTrade.map((outcome) => outcome.seconds)).toEqual([...theirTrade].reverse().map((outcome) => outcome.seconds));
  }, 15000);
});
