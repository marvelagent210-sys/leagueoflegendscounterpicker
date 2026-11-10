import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RuneCatalog } from "../../runes/catalog";
import type { StatShardData } from "../../runes/shardData";
import { loadShardRules } from "../../pipeline/runes/shardRules";

const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
const rules = await loadShardRules("16.21", catalog);
const shardData = (): StatShardData => ({
  schema: 1, dataset: "16.21", patch: "26.21", simulationFingerprint: "browser-model",
  catalog: { schema: 1, dataset: "16.21", patch: "26.21", shards: structuredClone(catalog.shards), shardSlots: structuredClone(catalog.shardSlots) },
  rules: structuredClone(rules),
});

function files(advertised: unknown = true): Map<string, unknown> {
  return new Map<string, unknown>([
    ["data/index.json", { dataset: "16.21", patch: "26.21", simulationFingerprint: "browser-model", ...(advertised === undefined ? {} : { statShards: advertised }) }],
    ["data/16.21/champions.json", { dataset: "16.21", patch: "26.21", champions: [] }],
    ["data/16.21/profiles.json", []],
    ["data/16.21/glossary.json", JSON.parse(readFileSync("data/16.21/glossary.json", "utf8"))],
    ["data/16.21/simulated.json", { dataset: "16.21", patch: "26.21", gold: 15000, values: [], matchups: {} }],
    ["data/16.21/rules.json", { statPrices: {} }],
    ["data/16.21/pets.json", {}],
    ["data/16.21/runes.json", []],
    ["data/16.21/stat-shards.json", shardData()],
  ]);
}

function serve(input: Map<string, unknown>) {
  const fetcher = vi.fn(async (url: string | URL | Request) => {
    const key = new URL(String(url)).pathname.slice(1);
    if (!input.has(key)) return new Response("missing", { status: 404 });
    return new Response(JSON.stringify(input.get(key)), { headers: { "Content-Type": "application/json" } });
  });
  vi.stubGlobal("fetch", fetcher);
  return fetcher;
}

beforeEach(() => {
  vi.resetModules();
  vi.stubGlobal("document", { baseURI: "https://test/" });
});
afterEach(() => vi.unstubAllGlobals());

describe("browser advertised stat-shard data", () => {
  it.each([undefined, false])("keeps legacy or disabled availability %s from fetching a shard bundle", async (availability) => {
    const input = files(availability);
    // A default parameter would turn explicit undefined back into true.
    if (availability === undefined) input.set("data/index.json", { dataset: "16.21", patch: "26.21", simulationFingerprint: "browser-model" });
    const fetcher = serve(input);
    const { loadAppData } = await import("../../web/src/data");
    expect((await loadAppData()).statShards).toBeUndefined();
    expect(fetcher.mock.calls.some(([url]) => String(url).endsWith("stat-shards.json"))).toBe(false);
  });

  it("loads only the advertised compact bundle with matching dataset, patch and model", async () => {
    serve(files());
    const { loadAppData } = await import("../../web/src/data");
    const data = await loadAppData();
    expect(data.statShards?.catalog.shards).toHaveLength(7);
    expect(data.statShards?.simulationFingerprint).toBe("browser-model");
    expect(data.statShards?.rules.healthPerLevel).toBe(10);
    expect(await loadAppData()).toBe(data);
  });

  it("fails closed on an advertised missing bundle and retries after it becomes available", async () => {
    const input = files(); input.delete("data/16.21/stat-shards.json");
    const fetcher = serve(input);
    const { loadAppData } = await import("../../web/src/data");
    await expect(loadAppData()).rejects.toThrow(/stat-shards.json.*404/);
    input.set("data/16.21/stat-shards.json", shardData());
    expect((await loadAppData()).statShards?.catalog.shards).toHaveLength(7);
    expect(fetcher.mock.calls.filter(([url]) => String(url).endsWith("stat-shards.json"))).toHaveLength(2);
  });

  it.each(["dataset", "patch", "fingerprint", "rule"] as const)("rejects an advertised changed %s and retries its corrected JSON", async (field) => {
    const input = files(), changed = shardData();
    if (field === "dataset") changed.dataset = "16.20";
    if (field === "patch") changed.patch = "26.20";
    if (field === "fingerprint") changed.simulationFingerprint = "stale-model";
    if (field === "rule") changed.rules.healthPerLevel = 999;
    input.set("data/16.21/stat-shards.json", changed);
    const fetcher = serve(input);
    const { loadAppData } = await import("../../web/src/data");
    await expect(loadAppData()).rejects.toThrow();
    input.set("data/16.21/stat-shards.json", shardData());
    expect((await loadAppData()).statShards?.rules.healthPerLevel).toBe(10);
    expect(fetcher.mock.calls.filter(([url]) => String(url).endsWith("stat-shards.json"))).toHaveLength(2);
  });

  it("rejects malformed availability metadata rather than silently enabling controls", async () => {
    const fetcher = serve(files("yes"));
    const { loadAppData } = await import("../../web/src/data");
    await expect(loadAppData()).rejects.toThrow(/Invalid stat-shard availability/);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("reloads the index and parsed inputs after a failed deployment snapshot", async () => {
    const input = files();
    input.set("data/index.json", { dataset: "16.21", patch: "26.21", simulationFingerprint: "old-model", statShards: true });
    serve(input);
    const { loadAppData } = await import("../../web/src/data");
    await expect(loadAppData()).rejects.toThrow();
    input.set("data/index.json", { dataset: "16.21", patch: "26.21", simulationFingerprint: "browser-model", statShards: true });
    input.set("data/16.21/rules.json", { statPrices: { ad: 99 } });
    const recovered = await loadAppData();
    expect(recovered.simulationFingerprint).toBe("browser-model");
    expect(recovered.prices.ad).toBe(99);
    expect(recovered.statShards?.simulationFingerprint).toBe("browser-model");
  });
});
