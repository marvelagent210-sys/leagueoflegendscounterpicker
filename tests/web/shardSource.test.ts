import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import type { ChampionDataset } from "../../engine/types";
import { loadShardRules } from "../../pipeline/runes/shardRules";
import type { RuneCatalog } from "../../runes/catalog";
import type { StatShardData } from "../../runes/shardData";
import { createSourceLoader, type JsonLoader } from "../../web/src/sim/source";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadShardRules("16.21", catalog);
const champions = JSON.parse(readFileSync("data/16.21/champions.json", "utf8")) as ChampionDataset;
const dataUrl = "https://test/current/";

function shardData(fingerprint = "revision-a"): StatShardData {
  return {
    schema: 1, dataset: "16.21", patch: "26.21", simulationFingerprint: fingerprint,
    catalog: {
      schema: 1, dataset: "16.21", patch: "26.21",
      shardSlots: structuredClone(catalog.shardSlots), shards: structuredClone(catalog.shards),
    },
    rules: structuredClone(rules),
  };
}

function loader(shards: (url: string) => unknown | Promise<unknown> = () => shardData()) {
  const fetcher = vi.fn(async <T>(url: string): Promise<T> => {
    const value = url.endsWith("champions.json") ? champions
      : url.endsWith("rules.json") ? { statPrices: {} }
        : url.endsWith("pets.json") ? {}
          : url.endsWith("stat-shards.json") ? await shards(url) : [];
    return value as T;
  });
  return {
    load: createSourceLoader(fetcher as JsonLoader), fetcher,
    shardRequests: () => fetcher.mock.calls.filter(([url]) => url.endsWith("stat-shards.json")),
  };
}

describe("browser stat-shard source loading", () => {
  it("keeps ordinary dataset and ability loads independent of optional shard data", async () => {
    const { load, fetcher, shardRequests } = loader(() => { throw new Error("Unavailable optional data"); });
    const source = await load(dataUrl, "revision-a");
    expect(source.champion("Garen").id).toBe("Garen");
    await expect(source.records("Garen")).resolves.toEqual([]);
    expect(shardRequests()).toHaveLength(0);
    expect(fetcher).toHaveBeenCalledTimes(5);
  });

  it("coalesces simultaneous explicit requests and reuses the validated result", async () => {
    let finish!: (value: unknown) => void;
    const pending = new Promise<unknown>((resolve) => { finish = resolve; });
    const { load, shardRequests } = loader(() => pending);
    const source = await load(dataUrl, "revision-a");
    const first = source.statShards!(), second = source.statShards!();
    expect(second).toBe(first);
    expect(shardRequests()).toHaveLength(1);
    const raw = shardData();
    finish(raw);
    const [a, b] = await Promise.all([first, second]);
    expect(a).toBe(b);
    expect(a).not.toBe(raw);
    expect(await source.statShards!()).toBe(a);
    expect(shardRequests()).toHaveLength(1);
  });

  it("retries a failed shard fetch without discarding the healthy dataset source", async () => {
    let attempts = 0;
    const { load, fetcher, shardRequests } = loader(() => {
      if (attempts++ === 0) throw new Error("Shard data offline");
      return shardData();
    });
    const source = await load(dataUrl, "revision-a");
    await expect(source.statShards!()).rejects.toThrow("Shard data offline");
    await expect(source.statShards!()).resolves.toMatchObject({ dataset: "16.21", simulationFingerprint: "revision-a" });
    expect(await load(dataUrl, "revision-a")).toBe(source);
    expect(shardRequests()).toHaveLength(2);
    expect(fetcher.mock.calls.filter(([url]) => url.endsWith("champions.json"))).toHaveLength(1);
  });

  it.each([
    ["dataset", /dataset/], ["patch", /patch/], ["revision", /source revision/],
    ["missing revision", /source revision/], ["numeric rule", /health differs/], ["missing evidence", /source evidence/],
  ] as const)("rejects mismatched %s data and retries validation on the next request", async (change, message) => {
    const invalid = shardData();
    if (change === "dataset") invalid.dataset = "16.20";
    if (change === "patch") invalid.patch = "26.20";
    if (change === "revision") invalid.simulationFingerprint = "old-revision";
    if (change === "missing revision") delete invalid.simulationFingerprint;
    if (change === "numeric rule") invalid.rules.health = 999;
    if (change === "missing evidence") invalid.rules.evidence = [];
    let attempts = 0;
    const { load, shardRequests } = loader(() => attempts++ === 0 ? invalid : shardData());
    const source = await load(dataUrl, "revision-a");
    await expect(source.statShards!()).rejects.toThrow(message);
    await expect(source.statShards!()).resolves.toMatchObject({ dataset: "16.21", patch: "26.21", simulationFingerprint: "revision-a" });
    expect(shardRequests()).toHaveLength(2);
  });

  it("isolates shard results across source revisions and dataset URLs", async () => {
    let current = shardData("revision-a");
    const { load, shardRequests } = loader(() => current);
    const oldSource = await load(dataUrl, "revision-a");
    const oldData = await oldSource.statShards!();
    current = shardData("revision-b");
    const freshSource = await load(dataUrl, "revision-b");
    const freshData = await freshSource.statShards!();
    expect(freshSource).not.toBe(oldSource);
    expect(freshData.simulationFingerprint).toBe("revision-b");
    expect(await oldSource.statShards!()).toBe(oldData);
    expect(oldData.simulationFingerprint).toBe("revision-a");
    current = shardData("revision-a");
    const otherSource = await load("https://test/other/", "revision-a");
    expect(otherSource).not.toBe(oldSource);
    expect(await otherSource.statShards!()).not.toBe(oldData);
    expect(shardRequests()).toHaveLength(3);
  });

  it("retains a defensive snapshot if the fetched object is later mutated", async () => {
    const raw = shardData();
    const { load } = loader(() => raw);
    const source = await load(dataUrl, "revision-a");
    const loaded = await source.statShards!();
    raw.rules.health = 999;
    raw.rules.evidence[0]!.text = "Changed after validation";
    raw.catalog.shardSlots[0]![0] = 9999;
    raw.catalog.shards[0]!.name = "Changed shard";
    expect(loaded.rules.health).toBe(65);
    expect(loaded.rules.evidence[0]!.text).not.toBe(raw.rules.evidence[0]!.text);
    expect(loaded.catalog.shardSlots[0]![0]).toBe(5008);
    expect(loaded.catalog.shards[0]!.name).not.toBe("Changed shard");
    expect(await source.statShards!()).toBe(loaded);
  });
});
