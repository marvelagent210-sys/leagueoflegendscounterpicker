/** Runs golden matchups through the simulator at the default stat budget. */
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_BUDGET, type StatPrices } from "../../engine/budget";
import { type KitVariant, bestMatchup } from "../../engine/sim/matchup";
import { kit } from "../kits/helpers";
import { type GoldenMatchup, MARGINS } from "./matchups";

const rules = JSON.parse(readFileSync(path.join(import.meta.dirname, "..", "..", "data", "16.20", "rules.json"), "utf8")) as { statPrices: StatPrices };

const fighters = new Map<string, KitVariant[]>();
/** The champion's kit, or each of its variants when it has a choice to make (Udyr's rank splits). */
function variants(id: string): KitVariant[] {
  let found = fighters.get(id);
  if (!found) {
    const compiled = kit(id);
    found = compiled.variants.length === 0 ? [{ spec: compiled.spec }] : compiled.variants.map((options) => ({ spec: kit(id, options).spec, options }));
    fighters.set(id, found);
  }
  return found;
}

/** The winner's counter score against the loser, each side playing its best variant. */
export function goldenScore(matchup: GoldenMatchup): number {
  return bestMatchup(variants(matchup.winner), variants(matchup.loser), DEFAULT_BUDGET, rules.statPrices).score;
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
