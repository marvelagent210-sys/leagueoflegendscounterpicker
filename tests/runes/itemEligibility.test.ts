import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it, vi } from "vitest";
import { loadItemCatalog } from "../../pipeline/itemData";
import { reviewAdaptiveItemBuild } from "../../pipeline/runes/itemEligibility";

vi.mock("node:fs/promises", async () => {
  const actual = await vi.importActual<typeof import("node:fs/promises")>("node:fs/promises");
  return { ...actual, readFile: vi.fn(actual.readFile) };
});

const catalog = await loadItemCatalog("16.21");
afterEach(() => vi.mocked(readFile).mockClear());

describe("reviewed fixed-item eligibility for adaptive shards", () => {
  it("accepts every reviewed catalog item except five explicit source limitations", async () => {
    const blocked = new Set(["Rabadon's Deathcap", "Overlord's Bloodmail", "Blackfire Torch", "Hubris", "Mejai's Soulstealer"]);
    for (const item of [...catalog.items, ...catalog.transforms]) {
      if (blocked.has(item.name)) continue;
      const reviewed = await reviewAdaptiveItemBuild(catalog, [item.name]);
      expect(reviewed.items).toEqual([item.transformsInto ?? item.name]);
    }
    expect(catalog.items.length - blocked.size).toBe(108);
  });

  it("accepts an empty side's fixed build without inventing stats", async () => {
    const result = await reviewAdaptiveItemBuild(catalog, []);
    expect(result).toMatchObject({ schema: 1, dataset: "16.21", items: [] });
    expect(result.catalogSHA256).toMatch(/^[a-f0-9]{64}$/);
    expect(result.implementationSHA256).toMatch(/^[a-f0-9]{64}$/);
  });

  it("accepts fixed eligible passive stats and canonicalizes item spellings", async () => {
    const result = await reviewAdaptiveItemBuild(catalog, ["steraksgage", "Rod of Ages", "Dawncore"]);
    expect(result.items).toEqual(["Sterak's Gage", "Rod of Ages", "Dawncore"]);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.items)).toBe(true);
  });

  it("resolves Tear transformations exactly like fixed item equipment", async () => {
    const names = ["Archangel's Staff", "Manamune", "Winter's Approach"];
    expect((await reviewAdaptiveItemBuild(catalog, names)).items).toEqual(["Seraph's Embrace", "Muramana", "Fimbulwinter"]);
    expect((await reviewAdaptiveItemBuild(catalog, names, { stacked: false })).items).toEqual(names);
    expect(names).toEqual(["Archangel's Staff", "Manamune", "Winter's Approach"]);
  });

  it.each([
    ["Rabadon's Deathcap", /source-qualified AP amplification/],
    ["Overlord's Bloodmail", /dynamic eligible AD/],
    ["Blackfire Torch", /dynamic eligible AP/],
    ["Hubris", /pre-fight AD buff/],
    ["Mejai's Soulstealer", /Glory stack gains and losses/],
  ] as const)("rejects unsupported adaptive eligibility for %s", async (name, reason) => {
    await expect(reviewAdaptiveItemBuild(catalog, [name])).rejects.toThrow(reason);
  });

  it("rejects a changed source dataset or patch", async () => {
    await expect(reviewAdaptiveItemBuild({ ...catalog, dataset: "16.22" }, [])).rejects.toThrow(/reviewed 16.21/);
    await expect(reviewAdaptiveItemBuild({ ...catalog, patch: "26.22" }, [])).rejects.toThrow(/reviewed 16.21/);
  });

  it("rejects changed values, passive text, source provenance and future catalog entries", async () => {
    for (const change of ["stats", "effect", "source", "new item"] as const) {
      const changed = structuredClone(catalog);
      if (change === "stats") changed.items[0]!.stats.ad = 999;
      if (change === "effect") changed.items.find((item) => item.effects.length)!.effects[0]!.text += " Changed.";
      if (change === "source") changed.sources.itemData.revid++;
      if (change === "new item") changed.items.push({ ...changed.items[0]!, id: 999999, name: "Future item" });
      await expect(reviewAdaptiveItemBuild(changed, [])).rejects.toThrow(/catalog changed and needs review/);
    }
  });

  it("rejects an item runtime implementation that changed since review", async () => {
    vi.mocked(readFile).mockResolvedValueOnce(Buffer.from("Changed runtime module"));
    await expect(reviewAdaptiveItemBuild(catalog, [])).rejects.toThrow(/implementation changed and needs review/);
    // The failed review does not cache a result that could authorize another build.
    await expect(reviewAdaptiveItemBuild(catalog, [])).resolves.toMatchObject({ items: [] });
  });

  it("rejects unknown and duplicated items, including duplicates after transformation", async () => {
    await expect(reviewAdaptiveItemBuild(catalog, ["Future item"])).rejects.toThrow(/No item/);
    await expect(reviewAdaptiveItemBuild(catalog, ["dawncore", "Dawncore"])).rejects.toThrow(/twice/);
    await expect(reviewAdaptiveItemBuild(catalog, ["Manamune", "Muramana"])).rejects.toThrow(/twice/);
  });

  it("rejects malformed item names and option values", async () => {
    await expect(reviewAdaptiveItemBuild(catalog, [""])).rejects.toThrow(/nonempty item names/);
    await expect(reviewAdaptiveItemBuild(catalog, ["   "])).rejects.toThrow(/nonempty item names/);
    await expect(reviewAdaptiveItemBuild(catalog, new Array<string>(1))).rejects.toThrow(/nonempty item names/);
    await expect(reviewAdaptiveItemBuild(catalog, "Dawncore" as unknown as string[])).rejects.toThrow(/array/);
    await expect(reviewAdaptiveItemBuild(catalog, [], { stacked: "yes" as unknown as boolean })).rejects.toThrow(/boolean stacked/);
    await expect(reviewAdaptiveItemBuild(catalog, [], [] as unknown as { stacked?: boolean })).rejects.toThrow(/boolean stacked/);
  });
});
