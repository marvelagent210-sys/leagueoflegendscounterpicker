/** Runs golden matchups through the simulator at the default stat budget. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_BUDGET, type StatPrices } from "../../engine/budget";
import { simulateMatchup } from "../../engine/sim/matchup";
import type { FighterSpec } from "../../engine/sim/spec";
import { kit } from "../kits/helpers";
import { type GoldenMatchup, MARGINS } from "./matchups";

const rules = JSON.parse(readFileSync(path.join(import.meta.dirname, "..", "..", "data", "16.20", "rules.json"), "utf8")) as { statPrices: StatPrices };

const specs = new Map<string, FighterSpec>();
function spec(id: string): FighterSpec {
  let found = specs.get(id);
  if (!found) {
    found = kit(id).spec;
    specs.set(id, found);
  }
  return found;
}

/** The winner's counter score against the loser. */
export function goldenScore(matchup: GoldenMatchup): number {
  return simulateMatchup(spec(matchup.winner), spec(matchup.loser), DEFAULT_BUDGET, rules.statPrices).score;
}

export function goldenSuite(name: string, matchups: GoldenMatchup[]): void {
  describe(name, () => {
    for (const matchup of matchups) {
      const title = `${matchup.winner} beats ${matchup.loser}${matchup.margin === "slight" ? "" : ` (${matchup.margin})`}: ${matchup.why}`;
      if (matchup.disputed) {
        it.skip(`${title} [disputed: ${matchup.disputed}]`, () => {});
        continue;
      }
      it(title, { timeout: 60_000 }, () => {
        const score = goldenScore(matchup);
        expect(score, `counter score ${score.toFixed(2)}`).toBeGreaterThan(MARGINS[matchup.margin]);
      });
    }
  });
}
