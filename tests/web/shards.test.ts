import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AbilityRecord, PetRecord, RuneRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import * as matchups from "../../engine/sim/matchup";
import { startCast } from "../../engine/sim/actions";
import { derive } from "../../engine/sim/derived";
import { createWorld } from "../../engine/sim/simulate";
import type { ChampionDataset } from "../../engine/types";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import type { StatShardData } from "../../runes/shardData";
import type { ShardSelection } from "../../runes/shards";
import { DEFAULT_APP_SETTINGS, type AppSettings } from "../../web/src/settings";
import { kitFor, runMatchup, type SimSource } from "../../web/src/sim/run";
import { fighter } from "../sim/kits";

const DIR = path.join(import.meta.dirname, "..", "..", "data", "16.21");
const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as T;
const champions = new Map(read<ChampionDataset>("champions.json").champions.map((champion) => [champion.id, champion]));
const catalog = read<RuneCatalog>("rune-catalog.json");
const rules = await loadShardRules("16.21", catalog);
const shardData: StatShardData = {
  schema: 1, dataset: "16.21", patch: "26.21",
  catalog: { schema: 1, dataset: "16.21", patch: "26.21", shards: catalog.shards, shardSlots: catalog.shardSlots },
  rules,
};

function source(): SimSource {
  return {
    champion(id) {
      const champion = champions.get(id);
      if (!champion) throw new Error(`No champion ${id}`);
      return champion;
    },
    records: async (id) => read<AbilityRecord[]>(`abilities/${id}.json`),
    pets: (id) => existsSync(path.join(DIR, "pets", `${id}.json`)) ? read<PetRecord[]>(`pets/${id}.json`) : [],
    runes: read<RuneRecord[]>("runes.json"),
    prices: read<{ statPrices: StatPrices }>("rules.json").statPrices,
    statShards: vi.fn(async () => shardData),
  };
}

const settings = (you: ShardSelection | null, enemy: ShardSelection | null = null): AppSettings => ({
  ...DEFAULT_APP_SETTINGS, gold: 0, shards: { you, enemy },
});

afterEach(() => vi.restoreAllMocks());

describe("stat shards in browser matchups", () => {
  it("keeps legacy/default duels identical without loading optional shard data", async () => {
    const data = source();
    data.statShards = vi.fn(async () => { throw new Error("Default duels must not load this"); });
    const defaults = { ...DEFAULT_APP_SETTINGS, gold: 0 };
    const oldSettings = { ...defaults };
    delete oldSettings.shards;
    const legacy = { ...data };
    delete legacy.statShards;
    const expected = await runMatchup(legacy, "Garen", "Darius", oldSettings, false);
    expect(await runMatchup(data, "Garen", "Darius", defaults, false)).toEqual(expected);
    expect(data.statShards).not.toHaveBeenCalled();
  });

  it("reports 400 shard health and 10% bonus AS in fight setup while retaining purchased-only Equipped stats", async () => {
    const data = source();
    const bare = await runMatchup(data, "Garen", "Darius", { ...settings(null), gold: 1000 }, false);
    const withShards = await runMatchup(data, "Garen", "Darius", { ...settings([5005, 5001, 5001]), gold: 1000 }, false);
    const attackSpeedRatio = (await kitFor(data, "Garen", DEFAULT_APP_SETTINGS)).spec.base.attackSpeed.ratio;
    expect(withShards.stats).toEqual(bare.stats);
    expect(withShards.openingStats[0].maxHp - bare.openingStats[0].maxHp).toBeCloseTo(400, 10);
    expect(withShards.openingStats[0].attackSpeed - bare.openingStats[0].attackSpeed).toBeCloseTo(0.1 * attackSpeedRatio, 10);
    expect(withShards.openingStats[1]).toEqual(bare.openingStats[1]);
    expect(withShards.spent).toEqual(bare.spent);
    expect(Object.values(withShards.spent[0]).reduce((sum, amount) => sum + amount, 0)).toBeGreaterThan(0);
    expect(withShards.assumptions[0].join(" ")).toContain("no-shard reference");
    expect(withShards.assumptions[1]).toEqual(bare.assumptions[1]);
  });

  it("applies both asymmetric choices from one rule load and uses each champion's own adaptive type", async () => {
    const data = source();
    const run = await runMatchup(data, "Garen", "Darius", settings([5008, 5008, 5011], [5007, 5010, 5013]), false);
    expect(data.statShards).toHaveBeenCalledTimes(1);
    expect(run.openingStats[0].maxHp - run.stats[0].maxHp).toBe(65);
    expect(run.openingStats[0].ad - run.stats[0].ad).toBeCloseTo(10.8, 10);
    expect(run.openingStats[1].abilityHaste - run.stats[1].abilityHaste).toBe(8);
    expect(run.openingStats[1].moveSpeed).toBeCloseTo(run.stats[1].moveSpeed * 1.025, 10);
    expect(run.openingStats[1].ad).toBe(run.stats[1].ad);
    expect(run.assumptions.every((side) => side.some((note) => note.includes("Stat shards are applied at level 20")))).toBe(true);
  });

  it("equips every candidate variant before optimization and uses the chosen wrapper for snapshots", async () => {
    const data = source();
    const observed = vi.spyOn(matchups, "bestMatchup");
    const run = await runMatchup(data, "Heimerdinger", "Garen", settings([5005, 5001, 5001], [5007, 5010, 5011]), false);
    expect(observed).toHaveBeenCalledTimes(1);
    const [mine, theirs] = observed.mock.calls[0]!;
    expect(mine).toHaveLength(3);
    for (const variant of mine) {
      const world = createWorld({ fighters: [variant.spec, theirs[0]!.spec], distance: 300, modes: ["idle", "idle"] });
      expect(derive(world.units[0]).maxHp - variant.spec.base.hp).toBeCloseTo(400, 10);
      expect(world.units[0].memory["rune-shards:attackSpeed"]).toBe(0.1);
      expect(derive(world.units[1]).maxHp - theirs[0]!.spec.base.hp).toBe(65);
    }
    expect(run.openingStats[0].maxHp - run.stats[0].maxHp).toBe(400);
    expect(run.openingStats[1].maxHp - run.stats[1].maxHp).toBe(65);
    expect(run.variants?.find((variant) => variant.side === 0)?.options.upgrade).toBeGreaterThan(0);
  });

  it("passes Kai'Sa's wrapper into real evolution checks without counting rune AD", async () => {
    const data = source();
    const observed = vi.spyOn(matchups, "bestMatchup");
    const run = await runMatchup(data, "Kaisa", "Garen", settings([5008, 5008, 5011]), false);
    const [mine] = observed.mock.calls[0]!;
    // Put the actual browser-selected wrapper just below the known bought-AD
    // threshold. Its 10.8 rune AD must remain combat damage, not evolution AD.
    const spec = { ...mine[0]!.spec, bonus: { ad: 48.86 } };
    const world = createWorld({ fighters: [spec, fighter()], distance: 300, modes: ["idle", "idle"] });
    const q = world.units[0].spec.abilities.find((ability) => ability.key === "Q")!;
    startCast(world, world.units[0], q);
    expect(world.missiles).toHaveLength(6);
    expect(world.units[0].memory["rune-shards:ad"]).toBeCloseTo(10.8, 10);
    expect(run.assumptions[0].join(" ")).toContain("Living Weapon");
  });

  it("does not leak selected shard stats or equipment into cached compiled kits or later plain runs", async () => {
    const data = source();
    const kit = await kitFor(data, "Garen", DEFAULT_APP_SETTINGS);
    const originalSpec = kit.spec, originalBonus = kit.spec.bonus, originalHooks = kit.spec.hooks;
    const before = await runMatchup(data, "Garen", "Darius", settings(null), false);
    await runMatchup(data, "Garen", "Darius", settings([5008, 5001, 5001]), false);
    const after = await runMatchup(data, "Garen", "Darius", settings(null), false);
    expect(after).toEqual(before);
    expect((await kitFor(data, "Garen", DEFAULT_APP_SETTINGS)).spec).toBe(originalSpec);
    expect(kit.spec.bonus).toBe(originalBonus);
    expect(kit.spec.hooks).toBe(originalHooks);
  });

  it("rejects unavailable or failed requested shard data instead of presenting a plain duel", async () => {
    const missing = source();
    delete missing.statShards;
    await expect(runMatchup(missing, "Garen", "Darius", settings([5005, 5001, 5001]), false)).rejects.toThrow(/Stat-shard data is unavailable/);
    const failed = source();
    failed.statShards = async () => { throw new Error("Shard source revision changed"); };
    await expect(runMatchup(failed, "Garen", "Darius", settings([5005, 5001, 5001]), false)).rejects.toThrow(/source revision changed/);
    const empty = source();
    empty.statShards = async () => undefined as unknown as StatShardData;
    await expect(runMatchup(empty, "Garen", "Darius", settings([5005, 5001, 5001]), false)).rejects.toThrow(/Stat-shard data is unavailable/);
  });

  it("validates both sides' choices against the reviewed row layout before combat", async () => {
    const data = source();
    await expect(runMatchup(data, "Garen", "Darius", settings([5011, 5001, 5001]), false)).rejects.toThrow(/row 0/);
    await expect(runMatchup(data, "Garen", "Darius", settings(null, [5005, 5013, 5001]), false)).rejects.toThrow(/row 1/);
  });
});
