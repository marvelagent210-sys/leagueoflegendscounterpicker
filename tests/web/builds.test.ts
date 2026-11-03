/**
 * The item builds in the app (web/src/builds.ts): which results the app shows for a visitor's
 * settings, and each matchup's scores and builds from either side, read from a build matrix
 * file as npm run build:builds writes it.
 */
import { describe, expect, it } from "vitest";
import type { PrecomputedBuilds } from "../../engine/sim/precomputed";
import { SCENARIO_WEIGHTS } from "../../engine/sim/scenarios";
import type { BuildsPairResult } from "../../pipeline/sim/buildsCheckpoint";
import { simulatedBuildsJson } from "../../pipeline/sim/builds";
import { buildsApply, buildsMatchup, itemShares, shownResults, variantText } from "../../web/src/builds";
import { DEFAULT_APP_SETTINGS, blend } from "../../web/src/settings";

const ids = ["Darius", "Garen", "Udyr"];
const pairs: Array<[string, string]> = [["Darius", "Garen"], ["Darius", "Udyr"], ["Garen", "Udyr"]];
// You engage, they engage, brawl, short trade, spacing (not applying here), escape.
const scenarios = [0.6, -0.2, 0.3, 0.5, null, 0.1];
const ignite = { spells: ["Flash", "Ignite"], page: { keystone: "Conqueror", primary: ["Triumph", "Legend: Alacrity", "Last Stand"], secondary: ["Bone Plating", "Unflinching"], shards: ["Attack Speed", "Health Scaling", "Health Scaling"] } };
const barrier = { spells: ["Flash", "Barrier"], page: { keystone: "Grasp of the Undying", primary: ["Demolish", "Second Wind", "Overgrowth"], secondary: ["Legend: Haste", "Last Stand"], shards: ["Ability Haste", "Health Scaling", "Health"] } };
const result = (index: number, builds: [string[], string[]], variants?: BuildsPairResult["variants"]): BuildsPairResult => ({
  index,
  score: blend(scenarios, SCENARIO_WEIGHTS),
  scenarios,
  builds,
  loadouts: [ignite, barrier],
  ...(variants ? { variants } : {}),
  seconds: 10,
});
const results = [
  result(0, [["Stridebreaker", "Sterak's Gage"], ["Trinity Force", "Thornmail"]]),
  result(1, [["Stridebreaker", "Dead Man's Plate"], ["Sunfire Aegis", "Thornmail"]], [{ side: 1, options: { tripleTonic: 1, rankQ: 5, rankW: 5, rankE: 5, rankR: 6 } }]),
  result(2, [["Trinity Force", "Force of Nature"], ["Sunfire Aegis", "Spirit Visage"]]),
];
const file = JSON.parse(simulatedBuildsJson("16.21", "26.21", "sixItems", ids, pairs, results, { schema: 1, fingerprint: "abc" })) as PrecomputedBuilds;

describe("the results the app shows", () => {
  it("are the item builds when the visitor wants them and the fights are the defaults, whatever the plain stats' gold", () => {
    expect(shownResults(file, "builds", DEFAULT_APP_SETTINGS)).toBe("builds");
    expect(shownResults(file, "plain", DEFAULT_APP_SETTINGS)).toBe("plain");
    expect(shownResults(undefined, "builds", DEFAULT_APP_SETTINGS)).toBe("plain");
    expect(buildsApply({ ...DEFAULT_APP_SETTINGS, gold: 0 })).toBe(true);
    expect(buildsApply({ ...DEFAULT_APP_SETTINGS, weights: { ...SCENARIO_WEIGHTS, escape: 0 } })).toBe(true);
  });

  it("fall back to plain stats when a setting changes the fights: the builds can't be searched again in the browser", () => {
    for (const settings of [
      { ...DEFAULT_APP_SETTINGS, reactionTime: 0.4 },
      { ...DEFAULT_APP_SETTINGS, environment: { ...DEFAULT_APP_SETTINGS.environment, walls: !DEFAULT_APP_SETTINGS.environment.walls } },
      { ...DEFAULT_APP_SETTINGS, kitOptions: { Udyr: { tripleTonic: 0 } } },
    ]) {
      expect(buildsApply(settings)).toBe(false);
      expect(shownResults(file, "builds", settings)).toBe("plain");
    }
  });
});

describe("a matchup with item builds", () => {
  it("gives both builds and the scores from either side", () => {
    const darius = buildsMatchup(file, "Darius", "Garen", DEFAULT_APP_SETTINGS)!;
    expect(darius.score).toBeCloseTo(results[0]!.score, 12);
    expect(darius.scenarios).toEqual(scenarios);
    expect(darius.builds).toEqual([["Stridebreaker", "Sterak's Gage"], ["Trinity Force", "Thornmail"]]);
    const garen = buildsMatchup(file, "Garen", "Darius", DEFAULT_APP_SETTINGS)!;
    expect(garen.score).toBeCloseTo(-results[0]!.score, 12);
    // Engaging and being engaged trade places; the rest change sign.
    expect(garen.scenarios).toEqual([0.2, -0.6, -0.3, -0.5, null, -0.1]);
    expect(garen.builds).toEqual([darius.builds[1], darius.builds[0]]);
    expect(buildsMatchup(file, "Darius", "Ahri", DEFAULT_APP_SETTINGS)).toBeUndefined();
  });

  it("reweighs the scenarios by the visitor's weights", () => {
    const weights = { youEngage: 1, enemyEngages: 0, brawl: 0, shortTrade: 0, spacing: 0, escape: 0 };
    expect(buildsMatchup(file, "Darius", "Garen", { ...DEFAULT_APP_SETTINGS, weights })!.score).toBeCloseTo(0.6, 9);
  });

  it("names the kit variant a side played, by its kit's option labels", () => {
    const matchup = buildsMatchup(file, "Darius", "Udyr", DEFAULT_APP_SETTINGS)!;
    expect(matchup.variants[0]).toBeUndefined();
    expect(matchup.variants[1]).toEqual({ tripleTonic: 1, rankQ: 5, rankW: 5, rankE: 5, rankR: 6 });
    expect(buildsMatchup(file, "Udyr", "Darius", DEFAULT_APP_SETTINGS)!.variants[0]).toEqual(matchup.variants[1]);
    // Triple Tonic at its default goes unsaid.
    expect(variantText("Udyr", matchup.variants[1]!)).toBe("Wilding Claw's rank 5, Iron Mantle's rank 5, Blazing Stampede's rank 5, Wingborne Storm's rank 6");
    expect(variantText("Udyr", { tripleTonic: 1 })).toBe("");
    expect(variantText("Udyr", { unknown: 2 })).toBe("unknown 2");
  });

  it("counts how often each item is in a champion's builds", () => {
    expect(itemShares(file, "Darius")).toEqual([
      { item: "Stridebreaker", share: 1 },
      { item: "Dead Man's Plate", share: 0.5 },
      { item: "Sterak's Gage", share: 0.5 },
    ]);
    expect(itemShares(file, "Ahri")).toEqual([]);
  });
});
