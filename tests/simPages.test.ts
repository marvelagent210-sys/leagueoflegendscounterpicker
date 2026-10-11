import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BUDGET_STATS, type BudgetStat } from "../engine/budget";
import { SCENARIOS } from "../engine/sim/scenarios";
import { KITS } from "../kits/champions/index";
import type { PairResult } from "../pipeline/sim/pool";
import { deliveryText, effectText, formulaText, simulatedCounterSection, simulatedJson, simulatedMatrix } from "../pipeline/simPages";

const none = Object.fromEntries(BUDGET_STATS.map((s) => [s, 0])) as Record<BudgetStat, number>;

describe("simulator pages", () => {
  it("write formulas as the wiki does", () => {
    expect(formulaText({ base: 70, ratios: { AD: 0.9 } })).toBe("70 + 90% AD");
    expect(formulaText({ base: 0, ratios: { targetMaxHP: 0.01 }, products: [{ ratio: 0.00006, stats: ["AP", "targetMaxHP"] }] })).toBe(
      "1% target's maximum health + 0.6% of target's maximum health per 100 AP",
    );
    expect(formulaText({ base: 0 })).toBe("0");
  });

  it("describe effects and deliveries", () => {
    expect(effectText({ type: "cc", cc: "slow", strength: 0.4, duration: 2 })).toBe("slow 40% for 2 s");
    expect(effectText({ type: "displace", direction: "away", distance: 0, duration: 0.75 })).toBe("knock up over 0.75 s");
    expect(effectText({ type: "empower", attacks: 1, window: 4.5, onHit: [{ type: "cc", cc: "silence", duration: 1.5 }], resetAttack: true })).toBe(
      "next 1 attack within 4.5 s: silence for 1.5 s (resets the attack timer)",
    );
    expect(deliveryText({ kind: "line", range: 1050, width: 120, speed: 2000 })).toBe("skillshot 1050 long, 120 wide, at 2000/s");
  });

  it("fill both directions of each matchup from one simulation", () => {
    const pairs: Array<[string, string]> = [["A", "B"]];
    const results: PairResult[] = [{ index: 0, score: 0.5, scenarios: [1, -1, 0.5, 0.2, null, 0], spent: [none, none] }];
    const matrix = simulatedMatrix(["A", "B"], 15000, pairs, results);
    expect(matrix.scores.get("A")?.get("B")).toEqual([0.5, 1, -1, 0.5, 0.2, null, 0]);
    // Seen from B: B engaging A is A's "enemy engages", negated.
    expect(matrix.scores.get("B")?.get("A")).toEqual([-0.5, 1, -1, -0.5, -0.2, null, 0]);
    const json = JSON.parse(simulatedJson("16.20", "26.20", matrix)) as { values: string[]; matchups: Record<string, Record<string, number[]>> };
    expect(json.values).toEqual(["score", ...SCENARIOS]);
    expect(json.matchups.B?.A?.[0]).toBe(-0.5);
    const section = simulatedCounterSection("B", matrix, new Map([["A", "Alpha"]]));
    expect(section.find((line) => line.startsWith("| 1 |"))).toBe("| 1 | Alpha | +0.50 | +1.00 | −1.00 | +0.50 | +0.20 | – | +0.00 |");
  });
});

describe("simulated.json", () => {
  const file = JSON.parse(readFileSync(new URL("../data/16.20/simulated.json", import.meta.url), "utf8")) as {
    confidence: string;
    matchups: Record<string, Record<string, Array<number | null>>>;
  };

  it("has every matchup between champions with simulator kits, both ways and antisymmetric", () => {
    const ids = Object.keys(KITS).sort();
    expect(Object.keys(file.matchups).sort()).toEqual(ids);
    expect(file.confidence).toBe("full");
    for (const a of ids) {
      expect(Object.keys(file.matchups[a] ?? {}).sort()).toEqual(ids.filter((id) => id !== a));
      for (const b of ids) {
        if (a === b) continue;
        expect(file.matchups[a]?.[b]?.[0], `${a} vs ${b}`).toBeCloseTo(-(file.matchups[b]?.[a]?.[0] ?? Number.NaN), 9);
      }
    }
  });
});
