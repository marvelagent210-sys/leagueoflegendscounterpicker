import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { AbilityRecord, PetRecord, RuneRecord } from "../../engine/abilities";
import type { StatPrices } from "../../engine/budget";
import type { KitModule } from "../../engine/kits/compile";
import type { PrecomputedMatchups } from "../../engine/sim/precomputed";
import { SCENARIOS } from "../../engine/sim/scenarios";
import type { Champion, ChampionDataset } from "../../engine/types";
import { KITS } from "../../kits/champions/index";
import { fingerprintEntries, simulationProvenance } from "../../pipeline/sim/fingerprint";
import { replaceSimulatorSection } from "../../pipeline/sim/sections";
import { DEFAULT_APP_SETTINGS } from "../../web/src/settings";
import { matchupCacheKey, needsSimulation, precomputedCompatible } from "../../web/src/sim/cache";
import { kitFor, runMatchup, type SimSource } from "../../web/src/sim/run";
import { createSourceLoader, type JsonLoader } from "../../web/src/sim/source";
import { createRefreshQueue, refreshesModel } from "../../web/dataRefresh";

const DIR = path.join(import.meta.dirname, "..", "..", "data", "16.21");
const read = <T>(file: string): T => JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as T;
const champions = new Map(read<ChampionDataset>("champions.json").champions.map((c) => [c.id, c]));
const champion = (id: string): Champion => {
  const found = champions.get(id);
  if (!found) throw new Error(`No champion ${id}`);
  return found;
};
const source = (getChampion = champion): SimSource => ({
  champion: getChampion,
  records: async (id) => read<AbilityRecord[]>(`abilities/${id}.json`),
  prices: read<{ statPrices: StatPrices }>("rules.json").statPrices,
  pets: () => [],
  runes: read<RuneRecord[]>("runes.json"),
});

afterEach(() => vi.restoreAllMocks());

describe("simulation cache accuracy", () => {
  it("does not reuse a champion's compiled stats from another source", async () => {
    const changed = structuredClone(champion("Garen"));
    const form = changed.forms[0];
    if (!form) throw new Error("Garen has no form");
    form.stats.attackDamage.base += 37;
    const oldSource = source();
    const newSource = source((id) => id === "Garen" ? changed : champion(id));
    const old = await kitFor(oldSource, "Garen", DEFAULT_APP_SETTINGS);
    const fresh = await kitFor(newSource, "Garen", DEFAULT_APP_SETTINGS);
    expect(fresh.spec.base.ad - old.spec.base.ad).toBeCloseTo(37);
    expect(await kitFor(oldSource, "Garen", DEFAULT_APP_SETTINGS)).toBe(old);
  });

  it("shares concurrent compilation and retries failed input loads", async () => {
    const data = source();
    const records = vi.fn(data.records);
    data.records = records;
    const [a, b] = await Promise.all([kitFor(data, "Garen", DEFAULT_APP_SETTINGS), kitFor(data, "Garen", DEFAULT_APP_SETTINGS)]);
    expect(a).toBe(b);
    expect(records).toHaveBeenCalledTimes(1);
    const failed = source();
    const retry = vi.fn(failed.records).mockRejectedValueOnce(new Error("temporary input failure"));
    failed.records = retry;
    await expect(kitFor(failed, "Garen", DEFAULT_APP_SETTINGS)).rejects.toThrow("temporary input failure");
    await expect(kitFor(failed, "Garen", DEFAULT_APP_SETTINGS)).resolves.toMatchObject({ champion: "Garen" });
    expect(retry).toHaveBeenCalledTimes(2);
  });

  it("does not pin a live run to a variant hint from a different ranking", async () => {
    // The stronger basic-attack-only variant wins under every weighted scenario.
    const modules = KITS as Record<string, KitModule>;
    const original = modules.Garen;
    if (!original) throw new Error("No Garen module");
    modules.Garen = {
      champion: "Garen",
      options: { power: { label: "Test attack damage", default: 1 } },
      variants: () => [{ power: 1 }, { power: 5000 }],
      build: (_kit, options) => ({ base: { ad: options.power ?? 1 }, abilities: [] }),
    };
    try {
      const data = source();
      const settings = { ...DEFAULT_APP_SETTINGS, gold: 0 };
      const optimized = await runMatchup(data, "Garen", "Darius", settings, false);
      const hinted = await runMatchup(data, "Garen", "Darius", settings, false, [{ side: 0, options: { power: 1 } }]);
      expect(optimized.variants?.find((v) => v.side === 0)?.options.power).toBe(5000);
      expect(hinted.variants).toEqual(optimized.variants);
      expect(hinted.score).toBe(optimized.score);
    } finally {
      modules.Garen = original;
    }
  }, 60_000);

  it("keys result caches by dataset, scenario weights and logging as well as fights", () => {
    const key = matchupCacheKey("patch-a", "Garen", "Darius", DEFAULT_APP_SETTINGS, false);
    expect(matchupCacheKey("patch-b", "Garen", "Darius", DEFAULT_APP_SETTINGS, false)).not.toBe(key);
    expect(matchupCacheKey("patch-a", "Garen", "Darius", { ...DEFAULT_APP_SETTINGS, weights: { ...DEFAULT_APP_SETTINGS.weights, brawl: 1 } }, false)).not.toBe(key);
    expect(matchupCacheKey("patch-a", "Garen", "Darius", DEFAULT_APP_SETTINGS, true)).not.toBe(key);
    expect(needsSimulation(DEFAULT_APP_SETTINGS, false)).toBe(true);
    expect(needsSimulation(DEFAULT_APP_SETTINGS, true)).toBe(false);
    expect(needsSimulation({ ...DEFAULT_APP_SETTINGS, weights: { ...DEFAULT_APP_SETTINGS.weights, brawl: 1 } }, true)).toBe(true);
  });
});

describe("worker dataset loading", () => {
  function loader(): { load: ReturnType<typeof createSourceLoader>; fetcher: ReturnType<typeof vi.fn> } {
    const fetcher = vi.fn(async <T>(url: string): Promise<T> => {
      const old = url.startsWith("https://test/old/");
      const c = structuredClone(champion("Garen"));
      c.name = old ? "Old Garen" : "New Garen";
      const value = url.endsWith("champions.json") ? { champions: [c] } : url.endsWith("rules.json") ? { statPrices: source().prices } : url.endsWith("pets.json") ? {} : [];
      return value as T;
    });
    return { load: createSourceLoader(fetcher as JsonLoader), fetcher };
  }

  it("isolates datasets and revisions while reusing a successful source", async () => {
    const { load, fetcher } = loader();
    const old = await load("https://test/old/", "a");
    const fresh = await load("https://test/new/", "b");
    expect(old.champion("Garen").name).toBe("Old Garen");
    expect(fresh.champion("Garen").name).toBe("New Garen");
    expect(await load("https://test/old/", "a")).toBe(old);
    expect(await load("https://test/old/", "changed")).not.toBe(old);
    expect(fetcher).toHaveBeenCalledTimes(12);
  });

  it("retries failed sources and failed ability fetches", async () => {
    const { load, fetcher } = loader();
    fetcher.mockRejectedValueOnce(new Error("offline"));
    await expect(load("https://test/old/")).rejects.toThrow("offline");
    const data = await load("https://test/old/");
    fetcher.mockRejectedValueOnce(new Error("missing ability"));
    await expect(data.records("Garen")).rejects.toThrow("missing ability");
    await expect(data.records("Garen")).resolves.toEqual([]);
    expect(fetcher).toHaveBeenCalledTimes(10);
  });
});

describe("precomputed provenance", () => {
  const valid = (): PrecomputedMatchups => ({
    dataset: "example", patch: "patch", gold: DEFAULT_APP_SETTINGS.gold,
    values: ["score", ...SCENARIOS], simulation: { schema: 1, fingerprint: "current" },
    matchups: { A: { B: [0, 0, 0, 0, 0, null, 0] }, B: { A: [0, 0, 0, 0, 0, null, 0] } },
  });
  const compatible = (file: PrecomputedMatchups) => precomputedCompatible(file, "example", "patch", "current", ["A", "B"]);

  it("rejects legacy, stale, mismatched and incomplete matrices", () => {
    expect(compatible(valid())).toBe(true);
    expect(compatible({ ...valid(), simulation: undefined })).toBe(false);
    expect(compatible({ ...valid(), simulation: { schema: 1, fingerprint: "old" } })).toBe(false);
    expect(compatible({ ...valid(), dataset: "old-dataset" })).toBe(false);
    expect(compatible({ ...valid(), patch: "old-patch" })).toBe(false);
    expect(compatible({ ...valid(), gold: 0 })).toBe(false);
    expect(compatible({ ...valid(), values: ["score", ...[...SCENARIOS].reverse()] })).toBe(false);
    expect(compatible({ ...valid(), matchups: { A: {} } })).toBe(false);
    expect(compatible({ ...valid(), matchups: { ...valid().matchups, A: { B: [Number.NaN, 0, 0, 0, 0, null, 0] } } })).toBe(false);
  });

  it("safely rejects malformed shapes, empty scenarios and inconsistent directions or aggregates", () => {
    for (const file of [null, {}, { ...valid(), matchups: [] }, { ...valid(), matchups: { A: null, B: {} } }]) {
      expect(precomputedCompatible(file, "example", "patch", "current", ["A", "B"])).toBe(false);
    }
    expect(compatible({ ...valid(), matchups: { A: { B: [0, null, null, null, null, null, null] }, B: { A: [0, null, null, null, null, null, null] } } })).toBe(false);
    expect(compatible({ ...valid(), matchups: { A: { B: [0, null, null, null, null, null, 0] }, B: { A: [0, null, null, null, null, null, 0] } } })).toBe(false);
    const asymmetric = valid();
    asymmetric.matchups.A!.B![1] = 1;
    expect(compatible(asymmetric)).toBe(false);
    const badAggregate = valid();
    badAggregate.matchups.A!.B![0] = 0.5;
    badAggregate.matchups.B!.A![0] = -0.5;
    expect(compatible(badAggregate)).toBe(false);
    const swapsEngage = valid();
    swapsEngage.matchups.A!.B! = [0, 1, -1, 0, 0, null, 0];
    swapsEngage.matchups.B!.A! = [0, 1, -1, 0, 0, null, 0];
    expect(compatible(swapsEngage)).toBe(true);
  });

  it("fingerprints file content and paths, independent of traversal order", () => {
    const a: Array<[string, string]> = [["engine/fight.ts", "old engine"], ["data/abilities.json", "old data"]];
    const fingerprint = fingerprintEntries(a);
    expect(fingerprintEntries([...a].reverse())).toBe(fingerprint);
    expect(fingerprintEntries([["engine/fight.ts", "new engine"], a[1]!])).not.toBe(fingerprint);
    expect(fingerprintEntries([a[0]!, ["data/abilities.json", "new data"]])).not.toBe(fingerprint);
    expect(fingerprintEntries([["engine/other.ts", "old engine"], a[1]!])).not.toBe(fingerprint);
  });

  it("the committed matrix is generated by the current model and parsed inputs", async () => {
    const file = read<PrecomputedMatchups>("simulated.json");
    const provenance = await simulationProvenance("16.21");
    expect(precomputedCompatible(file, "16.21", "26.21", provenance.fingerprint, Object.keys(KITS)), "Run npm run build:sim after changing simulator inputs").toBe(true);
  });
});

describe("simulation-only report refresh", () => {
  it("replaces generated sections while keeping source evidence and ledger text", () => {
    const page = "# Champion\n\n## Wiki evidence\n\nOriginal.\n\n## Duel simulator kit (old)\n\nOld generated.\n\n## Other evidence\n\nPreserved.\n";
    const refreshed = replaceSimulatorSection(page, "## Duel simulator kit", ["## Duel simulator kit (new)", "", "Fresh generated."]);
    expect(refreshed).toContain("## Wiki evidence\n\nOriginal.");
    expect(refreshed).toContain("## Other evidence\n\nPreserved.");
    expect(refreshed).toContain("Fresh generated.");
    expect(refreshed).not.toContain("Old generated.");
    const counter = replaceSimulatorSection("# Counters\n\n## Interaction ledger\n\nOriginal ledger.\n", "## Simulated duels", ["## Simulated duels", "", "New ranking."], true);
    expect(counter.indexOf("New ranking.")).toBeLessThan(counter.indexOf("Original ledger."));
  });
});

describe("development model refresh", () => {
  it("watches model and parsed inputs without watching generated exports or raw downloads", () => {
    const repo = path.resolve(DIR, "..", "..");
    expect(refreshesModel(path.join(repo, "engine/sim/actions.ts"))).toBe(true);
    expect(refreshesModel(path.join(repo, "kits/champions/Garen.ts"))).toBe(true);
    expect(refreshesModel(path.join(repo, "data/16.21/simulated.json"))).toBe(true);
    expect(refreshesModel(path.join(repo, "web/src/sim/run.ts"))).toBe(true);
    // The build matrix's inputs.
    expect(refreshesModel(path.join(repo, "items/modules/TrinityForce.ts"))).toBe(true);
    expect(refreshesModel(path.join(repo, "pipeline/items/search.ts"))).toBe(true);
    expect(refreshesModel(path.join(repo, "pipeline/itemData.ts"))).toBe(true);
    expect(refreshesModel(path.join(repo, "data/16.21/items.json"))).toBe(true);
    expect(refreshesModel(path.join(repo, "web/public/data/index.json"))).toBe(false);
    expect(refreshesModel(path.join(repo, "data/raw/16.20/large.json"))).toBe(false);
  });

  it("debounces model edits and reloads only after the new export finishes", async () => {
    vi.useFakeTimers();
    try {
      let finish!: () => void;
      const exporter = vi.fn(() => new Promise<void>((resolve) => { finish = resolve; }));
      const reload = vi.fn();
      const queue = createRefreshQueue(exporter, reload);
      const first = queue.refresh();
      const second = queue.refresh();
      await vi.advanceTimersByTimeAsync(100);
      expect(exporter).toHaveBeenCalledTimes(1);
      expect(reload).not.toHaveBeenCalled();
      finish();
      await Promise.all([first, second]);
      expect(reload).toHaveBeenCalledTimes(1);
      queue.close();
    } finally {
      vi.useRealTimers();
    }
  });
});
