import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { bestMatchup, simulateMatchup } from "../../engine/sim/matchup";
import type { AbilitySpec } from "../../engine/sim/spec";
import { ability, fighter } from "./kits";

const prices = (JSON.parse(readFileSync(path.join(import.meta.dirname, "..", "..", "data", "16.20", "rules.json"), "utf8")) as { statPrices: StatPrices }).statPrices;
const nuke = (amount: number): AbilitySpec => ability({ key: "Q", cooldown: 4, delivery: { kind: "target", range: 400 }, onHit: [{ type: "damage", damageType: "true", amount: { base: amount } }] });

describe("matchups with kit variants (Udyr's rank splits)", () => {
  const weak = { spec: fighter({ abilities: [nuke(50)] }), options: { power: 1 } };
  const strong = { spec: fighter({ abilities: [nuke(400)] }), options: { power: 2 } };
  const plain = { spec: fighter({ abilities: [nuke(200)] }) };

  it("play the variant best for its side, whichever side has the choice", () => {
    const mine = bestMatchup([weak, strong], [plain], 0, prices);
    expect(mine.variants).toEqual([{ side: 0, options: { power: 2 } }]);
    expect(mine.score).toBe(simulateMatchup(strong.spec, plain.spec, 0, prices).score);
    expect(mine.score).toBeGreaterThan(simulateMatchup(weak.spec, plain.spec, 0, prices).score);
    const theirs = bestMatchup([plain], [weak, strong], 0, prices);
    expect(theirs.variants).toEqual([{ side: 1, options: { power: 2 } }]);
    expect(theirs.score).toBe(simulateMatchup(plain.spec, strong.spec, 0, prices).score);
  });

  it("record both sides' choices when both have one", () => {
    // Each side's best answer: your strong nuke wins whatever the enemy plays, and against it
    // the enemy's strong nuke loses least.
    const both = bestMatchup([weak, strong], [weak, strong], 0, prices);
    expect(both.variants).toEqual([
      { side: 0, options: { power: 2 } },
      { side: 1, options: { power: 2 } },
    ]);
    expect(both.score).toBe(simulateMatchup(strong.spec, strong.spec, 0, prices).score);
  });

  it("record no choice with one kit a side", () => {
    expect(bestMatchup([plain], [{ spec: fighter() }], 0, prices).variants).toBeUndefined();
  });
});
