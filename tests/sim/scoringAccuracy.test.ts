import { describe, expect, it, vi } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { bestMatchup, type KitVariant } from "../../engine/sim/matchup";
import { fighter } from "./kits";

const fixture = vi.hoisted(() => ({ scores: {} as Record<string, Record<string, number>> }));
// Controlled zero-sum payoffs isolate variant selection from combat winner tuning.
vi.mock("../../engine/sim/scenarios", () => ({
  runScenarios: (you: { id: string }, enemy: { id: string }) => {
    const score = fixture.scores[you.id]?.[enemy.id];
    if (score === undefined) throw new Error(`Missing fixture ${you.id}/${enemy.id}`);
    return { score, scenarios: [] };
  },
}));

const prices: StatPrices = { ad: 35, ap: 20, as: 25, crit: 40, ah: 50, lethality: 30, armpen: 42, mpenflat: 47, mpen: 46, hp: 3, armor: 20, mr: 20 };
const variant = (id: string): KitVariant => ({ spec: fighter({ id }), options: { build: id.charCodeAt(0) } });

describe("simultaneous conservative kit variants", () => {
  it("returns a real pairing with opposite scores and the same choices after swapping sides without a pure saddle point", () => {
    // Neither row/column pair is a pure equilibrium: maximin = -0.2, minimax = 0.6.
    // A is the safest row; D is the safest column. The actual A/D duel scores -0.2.
    fixture.scores = { A: { C: 0.8, D: -0.2 }, B: { C: -0.4, D: 0.6 }, C: { A: -0.8, B: 0.4 }, D: { A: 0.2, B: -0.6 } };
    const mine = [variant("A"), variant("B")];
    const theirs = [variant("C"), variant("D")];
    const forward = bestMatchup(mine, theirs, 0, prices);
    const reverse = bestMatchup(theirs, mine, 0, prices);
    expect(forward.score).toBe(-0.2);
    expect(reverse.score).toBe(0.2);
    expect(forward.variants).toEqual([{ side: 0, options: mine[0]!.options }, { side: 1, options: theirs[1]!.options }]);
    expect(reverse.variants).toEqual([{ side: 0, options: theirs[1]!.options }, { side: 1, options: mine[0]!.options }]);
  });

  it("breaks tied conservative choices by stable variant keys, regardless of list order", () => {
    fixture.scores = { A: { C: 0.5, D: -0.5 }, B: { C: -0.5, D: 0.5 }, C: { A: -0.5, B: 0.5 }, D: { A: 0.5, B: -0.5 } };
    const mine = [variant("A"), variant("B")];
    const theirs = [variant("C"), variant("D")];
    const result = bestMatchup(mine, theirs, 0, prices);
    expect(result.score).toBe(0.5);
    expect(bestMatchup([...mine].reverse(), [...theirs].reverse(), 0, prices)).toEqual(result);
    expect(bestMatchup(theirs, mine, 0, prices).score).toBe(-result.score);
  });

  it("keeps a mirror matchup neutral when variants counter each other in a cycle", () => {
    fixture.scores = { A: { A: 0, B: 1, C: -1 }, B: { A: -1, B: 0, C: 1 }, C: { A: 1, B: -1, C: 0 } };
    const variants = [variant("A"), variant("B"), variant("C")];
    const result = bestMatchup(variants, [...variants].reverse(), 0, prices);
    expect(result.score).toBe(0);
    expect(result.variants?.[0]?.options).toEqual(result.variants?.[1]?.options);
  });
});
