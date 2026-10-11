import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import type { AbilityRecord, PetRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import type { ChampionDataset } from "../../engine/types";
import { DEFAULT_APP_SETTINGS } from "../../web/src/settings";
import { type SimSource, kitFor, runMatchup } from "../../web/src/sim/run";

/** simulated.json, as pipeline/simPages.ts writes it (web/src/data.ts reads it in the browser). */
interface SimulatedFile {
  gold: number;
  values: string[];
  matchups: Record<string, Record<string, Array<number | null>>>;
}

const DIR = path.join(import.meta.dirname, "..", "..", "data", "16.20");
const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as T;

const champions = new Map(read<ChampionDataset>("champions.json").champions.map((c) => [c.id, c]));
const simulated = read<SimulatedFile>("simulated.json");

/** The dataset as the app's workers see it, read from disk instead of fetched. */
const source: SimSource = {
  champion(id) {
    const champion = champions.get(id);
    if (!champion) throw new Error(`No champion ${id}`);
    return champion;
  },
  records: async (id) => read<AbilityRecord[]>(path.join("abilities", `${id}.json`)),
  prices: read<{ statPrices: StatPrices }>("rules.json").statPrices,
  pets: (id) => (existsSync(path.join(DIR, "pets", `${id}.json`)) ? read<PetRecord[]>(path.join("pets", `${id}.json`)) : []),
};

describe("matchups run in the browser", () => {
  // Walls (Camille, Poppy), the lane set up in advance (Teemo's trap) and kit options (Garen, Nasus).
  it.each([
    ["Fiora", "Darius"],
    ["Teemo", "Darius"],
    ["Camille", "Poppy"],
    ["Garen", "Nasus"],
  ])("%s vs %s at the default settings matches the precomputed result", async (you, enemy) => {
    const run = await runMatchup(source, you, enemy, DEFAULT_APP_SETTINGS, false);
    const [score, ...scenarios] = simulated.matchups[you]?.[enemy] ?? [];
    // simulated.json keeps three decimals.
    const near = (actual: number | null, expected: number | null | undefined) =>
      expected === null || expected === undefined ? actual === null : actual !== null && Math.abs(actual - expected) <= 0.0005 + 1e-9;
    expect(near(run.score, score), `score ${run.score} vs ${score}`).toBe(true);
    run.scenarios.forEach((s, i) => expect(near(s.score, scenarios[i]), `${s.id}: ${s.score} vs ${scenarios[i]}`).toBe(true));
  }, 60_000);

  it("logs the fights only when asked", async () => {
    const quiet = await runMatchup(source, "Fiora", "Darius", DEFAULT_APP_SETTINGS, false);
    const logged = await runMatchup(source, "Fiora", "Darius", DEFAULT_APP_SETTINGS, true);
    expect(quiet.scenarios.flatMap((s) => s.outcomes).every((o) => o.timeline.length === 0)).toBe(true);
    expect(logged.scenarios[0]?.outcomes[0]?.timeline.some((e) => e.text.startsWith("casts "))).toBe(true);
    expect(logged.score).toBe(quiet.score);
  }, 60_000);

  it("compiles kits with the visitor's kit options", async () => {
    const settings = { ...DEFAULT_APP_SETTINGS, kitOptions: { Garen: { courageStacks: 0 } } };
    expect((await kitFor(source, "Garen", DEFAULT_APP_SETTINGS)).options).toEqual({ courageStacks: 150 });
    expect((await kitFor(source, "Garen", settings)).options).toEqual({ courageStacks: 0 });
  });
});
