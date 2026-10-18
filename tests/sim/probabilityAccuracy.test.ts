import { describe, expect, it } from "vitest";
import { escapeChance, fightScore, tradeValue } from "../../engine/sim/scenarios";
import { createWorld, summarize } from "../../engine/sim/simulate";
import { fighter } from "./kits";

function winningBranches() {
  return [0.2 * 0.2, 0.2 * 0.8, 0.8 * 0.2, 0.8 * 0.8].map((weight) => {
    const world = createWorld({ fighters: [fighter(), fighter()], distance: 0, modes: ["idle", "idle"] });
    world.weight = weight;
    world.result = { winner: 0, reason: "death", tick: 1 };
    world.units[1].hp = 0;
    return world;
  });
}

describe("bounded scenario scores after floating-point branch arithmetic", () => {
  it("keeps certain wins and trades at one and survival probabilities at zero", () => {
    const outcome = summarize(winningBranches());
    // Four leaves of two independent 20% / 80% splits have total weight 1 + epsilon.
    expect(outcome.win[0]).toBeGreaterThan(1);
    expect(fightScore(outcome)).toBe(1);
    expect(tradeValue(outcome, 0)).toBe(1);
    expect(tradeValue(outcome, 1)).toBe(-1);
    expect(escapeChance(outcome, 1)).toBe(0);
  });

  it("preserves interior probabilities and score precision", () => {
    const worlds = winningBranches();
    worlds[3]!.result!.winner = 1;
    const outcome = summarize(worlds);
    expect(fightScore(outcome)).toBe(outcome.win[0] - outcome.win[1]);
    expect(escapeChance(outcome, 1)).toBe(1 - outcome.win[0]);
  });
});
