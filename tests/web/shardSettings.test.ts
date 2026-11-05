import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { PrecomputedBuilds } from "../../engine/sim/precomputed";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import { type StatShardData, sanitizeShardSelection, shardEffectLabel, validateStatShardData } from "../../runes/shardData";
import { buildsApply, shownResults } from "../../web/src/builds";
import { matchupCacheKey, needsSimulation } from "../../web/src/sim/cache";
import { DEFAULT_APP_SETTINGS, fightKey, sanitize, shardSelections, shardsSelected, simulationKey, swapShardSides } from "../../web/src/settings";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const data: StatShardData = {
  schema: 1, dataset: "16.21", patch: "26.21", simulationFingerprint: "revision-a",
  catalog: { schema: 1, dataset: catalog.dataset, patch: catalog.patch, shards: catalog.shards, shardSlots: catalog.shardSlots },
  rules: await loadShardRules("16.21", catalog),
};

describe("compact browser shard inputs", () => {
  it("accepts the compiled sources and returns an independent snapshot", () => {
    const input = structuredClone(data);
    const validated = validateStatShardData(input, "16.21", "26.21", "revision-a");
    expect(validated).toEqual(data);
    input.catalog.shards[0]!.name = "Changed";
    input.catalog.shardSlots[0]![0] = 9999;
    input.rules.evidence[0]!.text = "Changed";
    expect(validated).toEqual(data);
  });

  it("rejects another dataset, patch, source revision or an unbound compact file", () => {
    expect(() => validateStatShardData(data, "16.22", "26.22")).toThrow(/dataset/);
    expect(() => validateStatShardData(data, "16.21", "26.22")).toThrow(/patch/);
    expect(() => validateStatShardData(data, "16.21", "26.21", "revision-b")).toThrow(/source revision/);
    const unbound = { ...data, simulationFingerprint: undefined };
    expect(() => validateStatShardData(unbound, "16.21", "26.21", "revision-a")).toThrow(/source revision/);
    expect(validateStatShardData(unbound, "16.21").simulationFingerprint).toBeUndefined();
  });

  it("rejects catalog layouts and inventory that no longer match the reviewed sources", () => {
    const layout = structuredClone(data); layout.catalog.shardSlots[0]![0] = 5011;
    expect(() => validateStatShardData(layout, "16.21")).toThrow(/rows/);
    const duplicate = structuredClone(data); duplicate.catalog.shards[1] = duplicate.catalog.shards[0]!;
    expect(() => validateStatShardData(duplicate, "16.21")).toThrow(/inventory/);
    const missing = structuredClone(data); missing.catalog.shards.pop();
    expect(() => validateStatShardData(missing, "16.21")).toThrow(/seven/);
    const future = structuredClone(data); future.catalog.shards[0]!.id = 5999;
    expect(() => validateStatShardData(future, "16.21")).toThrow(/inventory/);
  });

  it("rejects changed numeric rules and incomplete or changed pinned evidence", () => {
    const rule = structuredClone(data); rule.rules.healthPerLevel = 9;
    expect(() => validateStatShardData(rule, "16.21")).toThrow(/healthPerLevel/);
    const revision = structuredClone(data); revision.rules.evidence[0]!.revid++;
    expect(() => validateStatShardData(revision, "16.21")).toThrow(/evidence/);
    const missing = structuredClone(data); missing.rules.evidence = missing.rules.evidence.filter((entry) => entry.title !== "Tenacity");
    expect(() => validateStatShardData(missing, "16.21")).toThrow(/six/);
    expect(() => validateStatShardData(null, "16.21")).toThrow(/object/);
  });

  it("labels the compiled level-20 amounts instead of the client's 180-health endpoint", () => {
    expect(shardEffectLabel(5001, data)).toBe("+200 health at level 20");
    expect(shardEffectLabel(5008, data)).toBe("+5.4 AD or +9 AP");
    expect(shardEffectLabel(5010, data)).toBe("+2.5% movement speed");
    expect(() => shardEffectLabel(5999, data)).toThrow(/Unsupported/);
  });
});

describe("persisted browser shard settings", () => {
  it("keeps old stored settings and explicitly disabled shards on the legacy default cache key", () => {
    const legacy = { ...DEFAULT_APP_SETTINGS }; delete legacy.shards;
    const expected = [legacy.gold, legacy.reactionTime, legacy.environment.walls, legacy.environment.minions, legacy.environment.laneSetup, legacy.environment.brush].join("|");
    expect(sanitize(legacy)).toEqual(DEFAULT_APP_SETTINGS);
    expect(shardSelections(legacy)).toEqual({ you: null, enemy: null });
    expect(shardsSelected(legacy)).toBe(false);
    expect(fightKey(legacy)).toBe(expected);
    expect(fightKey(DEFAULT_APP_SETTINGS)).toBe(expected);
    expect(needsSimulation(DEFAULT_APP_SETTINGS, true)).toBe(false);
    expect(buildsApply(DEFAULT_APP_SETTINGS)).toBe(true);
  });

  it("accepts every source-defined combination, including two scaling-health shards", () => {
    for (const offense of catalog.shardSlots[0]!) for (const flex of catalog.shardSlots[1]!) for (const defense of catalog.shardSlots[2]!) {
      const selected = [offense, flex, defense];
      const settings = sanitize({ shards: { you: selected, enemy: null } });
      expect(settings.shards?.you).toEqual(selected);
      expect(settings.shards?.you).not.toBe(selected);
    }
  });

  it.each([undefined, null, "5005,5001,5001", [], [5005, 5001], [5005, 5001, 5001, 5011],
    ["5005", 5001, 5001], [NaN, 5001, 5001], [5005.1, 5001, 5001], [5011, 5001, 5001],
    [5005, 5013, 5001], [5005, 5001, 5008], [5999, 5001, 5001], new Array(3)].map((selection) => ({ selection })))
  ("drops an entire malformed side selection: $selection", ({ selection }) => {
    expect(sanitizeShardSelection(selection)).toBeNull();
    expect(sanitize({ shards: { you: selection, enemy: [5007, 5010, 5013] } }).shards)
      .toEqual({ you: null, enemy: [5007, 5010, 5013] });
  });

  it("ignores unknown sides and refuses arrays in place of the side-settings object", () => {
    expect(sanitize({ shards: { friend: [5005, 5001, 5001] } }).shards).toEqual({ you: null, enemy: null });
    expect(sanitize({ shards: [[5005, 5001, 5001]] }).shards).toEqual({ you: null, enemy: null });
  });

  it("separates role selections and shard changes from all precomputed and live caches", () => {
    const yours = sanitize({ shards: { you: [5005, 5001, 5001], enemy: null } });
    const theirs = sanitize({ shards: { you: null, enemy: [5005, 5001, 5001] } });
    const another = sanitize({ shards: { you: [5008, 5001, 5001], enemy: null } });
    const keys = [DEFAULT_APP_SETTINGS, yours, theirs, another].map((settings) => fightKey(settings));
    expect(new Set(keys).size).toBe(4);
    expect(simulationKey(yours)).not.toBe(simulationKey(theirs));
    expect(matchupCacheKey("revision-a", "Garen", "Darius", yours, false))
      .not.toBe(matchupCacheKey("revision-a", "Garen", "Darius", theirs, false));
    for (const settings of [yours, theirs, another]) {
      expect(shardsSelected(settings)).toBe(true);
      expect(needsSimulation(settings, true)).toBe(true);
      expect(buildsApply(settings)).toBe(false);
      // Only matrix availability matters to this gating check.
      expect(shownResults({} as PrecomputedBuilds, "builds", settings)).toBe("plain");
    }
  });

  it("swaps both roles with independent arrays and preserves other fight settings", () => {
    const original = sanitize({ gold: 1000, reactionTime: 0.3, shards: { you: [5005, 5001, 5001], enemy: [5008, 5010, 5013] } });
    const swapped = swapShardSides(original);
    expect(swapped.shards).toEqual({ you: [5008, 5010, 5013], enemy: [5005, 5001, 5001] });
    expect(swapped.gold).toBe(1000);
    expect(swapped.reactionTime).toBe(0.3);
    expect(swapShardSides(swapped)).toEqual(original);
    swapped.shards!.enemy![0] = 5008;
    expect(original.shards!.you![0]).toBe(5005);
  });

  it("swaps a single enabled side without enabling either side in legacy settings", () => {
    const single = sanitize({ shards: { you: [5005, 5001, 5001], enemy: null } });
    expect(swapShardSides(single).shards).toEqual({ you: null, enemy: [5005, 5001, 5001] });
    expect(swapShardSides(swapShardSides(single))).toEqual(single);
    expect(swapShardSides({ ...DEFAULT_APP_SETTINGS, shards: undefined }).shards).toEqual({ you: null, enemy: null });
  });
});
