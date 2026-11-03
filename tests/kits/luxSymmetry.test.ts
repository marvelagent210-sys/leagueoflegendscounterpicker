import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { perceive } from "../../engine/sim/behavior";
import { simulateMatchup } from "../../engine/sim/matchup";
import { createWorld } from "../../engine/sim/simulate";
import { kit } from "./helpers";

const lux = kit("Lux").spec;
const darius = kit("Darius").spec;
const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;

describe("Lux matchup reflection symmetry", () => {
  it("throws Light Binding at the same tick across floating-point sides of an exact 13-tick journey", () => {
    // Light Binding travels 40 units/tick. From a 585-unit center gap it needs
    // exactly 13 ticks to reach Darius's 65-unit hitbox. Repeated opposite-direction
    // walking produced these gaps at tick 113 of the real 15,000-gold matchup.
    // Rounding one journey to 14 ticks makes the AI postpone the root, changing
    // every subsequent cast in that branch despite identical physical geometry.
    const forward = createWorld({ fighters: [lux, darius], distance: 0, modes: ["fight", "fight"] });
    const reverse = createWorld({ fighters: [darius, lux], distance: 0, modes: ["fight", "fight"] });
    forward.units[1].x = 585.0000000000011;
    reverse.units[1].x = 584.9999999999989;
    for (const self of [forward.units[0], reverse.units[1]]) {
      self.cooldownReady.E = Infinity;
      self.cooldownReady.R = Infinity;
    }
    expect(lux.behavior!(perceive(forward, 0))).toEqual({ kind: "cast", ability: "Q" });
    expect(lux.behavior!(perceive(reverse, 1))).toEqual({ kind: "cast", ability: "Q" });
  });

  it("preserves every scenario score and the counter score when Lux and Darius are swapped", () => {
    const forward = simulateMatchup(lux, darius, 15000, prices);
    const reverse = simulateMatchup(darius, lux, 15000, prices);
    expect(forward.builds[0]).toEqual(reverse.builds[1]);
    expect(forward.builds[1]).toEqual(reverse.builds[0]);
    const counterpart = { youEngage: "enemyEngages", enemyEngages: "youEngage", brawl: "brawl", shortTrade: "shortTrade", spacing: "spacing", escape: "escape" } as const;
    for (const scenario of forward.scenarios) {
      const swapped = reverse.scenarios.find((s) => s.id === counterpart[scenario.id])!;
      expect(Math.abs((scenario.score ?? 0) + (swapped.score ?? 0)), scenario.id).toBeLessThan(1e-12);
    }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
