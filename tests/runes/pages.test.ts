import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { RuneCatalog } from "../../runes/catalog";
import { assertRunePage, type RunePage, validateRunePage } from "../../runes/pages";

/** Small patch fixture: three paths let allowed-substyle rules be checked independently. */
function catalog(): RuneCatalog {
  const paths = [100, 200, 300].map((pathId) => ({
    id: pathId,
    key: `Path${pathId}`,
    name: `Path ${pathId}`,
    icon: "path.png",
    slots: Array.from({ length: 4 }, (_, row) => [pathId + row * 10 + 1, pathId + row * 10 + 2]),
    allowedSecondaryPathIds: [100, 200, 300].filter((id) => id !== pathId),
  }));
  const wiki = { title: "Rune", revid: 1, timestamp: "2026-11-04T00:00:00Z", sha256: "0".repeat(64), content: "test source" };
  return {
    schema: 1,
    dataset: "test",
    patch: "test",
    ddragonVersion: "test",
    communityDragonVersion: "test",
    paths,
    runes: paths.flatMap((path) => path.slots.flatMap((ids, slot) => ids.map((id) => ({
      id, pathId: path.id, slot, key: `Rune${id}`, name: `Rune ${id}`, icon: "rune.png",
      shortDescription: "", longDescription: "", clientDescription: "", wiki, combatStatus: "not-implemented" as const,
    })))),
    shardSlots: [[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]],
    shards: [5008, 5005, 5007, 5010, 5001, 5011, 5013].map((id) => ({
      id, name: `Shard ${id}`, icon: "shard.png", shortDescription: "", longDescription: "", tooltip: "",
    })),
    rules: wiki,
    sources: {},
    limitations: [],
  };
}

const page = (): RunePage => ({
  primaryPathId: 100,
  secondaryPathId: 200,
  primary: [101, 111, 121, 131],
  secondary: [211, 231],
  shards: [5008, 5001, 5001],
});

function issues(value: unknown, source = catalog()): string {
  const result = validateRunePage(source, value);
  expect(result.valid).toBe(false);
  return result.issues.join("; ");
}

describe("structural rune-page validation", () => {
  it("accepts primary row choices, different secondary rows and repeated cross-row shards", () => {
    expect(validateRunePage(catalog(), page())).toEqual({ valid: true, issues: [], page: page() });
  });

  it("returns a detached canonical page with secondary choices ordered by their rows", () => {
    const input = { ...page(), secondary: [231, 211] };
    const before = structuredClone(input);
    const result = assertRunePage(catalog(), input);
    expect(result.secondary).toEqual([211, 231]);
    expect(input).toEqual(before);
    result.primary[0] = 102;
    result.secondary[0] = 212;
    result.shards[0] = 5005;
    expect(input).toEqual(before);
  });

  it.each([null, undefined, false, 3, "100", [], new Date()])("rejects a non-object page: %s", (input) => {
    expect(issues(input)).toContain("page must be an object");
  });

  it("accepts a plain JSON-like object with no prototype", () => {
    expect(assertRunePage(catalog(), Object.assign(Object.create(null), page()))).toEqual(page());
  });

  it("rejects unexpected fields instead of silently ignoring a misspelled selection", () => {
    expect(issues({ ...page(), runeEffects: true })).toContain("unknown rune page field runeEffects");
  });

  it.each([
    ["a missing primary path", { primaryPathId: undefined }, "primaryPathId"],
    ["a string path ID", { secondaryPathId: "200" }, "secondaryPathId"],
    ["a fractional ID", { primaryPathId: 100.5 }, "primaryPathId"],
    ["an infinite ID", { primaryPathId: Infinity }, "primaryPathId"],
    ["an unsafe ID", { secondaryPathId: Number.MAX_SAFE_INTEGER + 1 }, "secondaryPathId"],
    ["an unknown primary path", { primaryPathId: 999 }, "unknown primary path"],
    ["an unknown secondary path", { secondaryPathId: 999 }, "unknown secondary path"],
    ["the primary path reused as secondary", { secondaryPathId: 100 }, "paths must differ"],
    ["a missing primary row", { primary: [101, 111, 121] }, "primary must contain 4"],
    ["an extra primary row", { primary: [101, 111, 121, 131, 132] }, "primary must contain 4"],
    ["a string rune ID", { primary: ["101", 111, 121, 131] }, "primary must contain 4"],
    ["a sparse primary array", { primary: Object.assign(new Array(4), { 0: 101, 1: 111, 3: 131 }) }, "primary must contain 4"],
    ["swapped primary rows", { primary: [101, 121, 111, 131] }, "primary row 1"],
    ["another path's primary rune", { primary: [101, 211, 121, 131] }, "primary row 1"],
    ["a duplicate primary rune", { primary: [101, 111, 121, 121] }, "cannot repeat a rune"],
    ["too few secondary selections", { secondary: [211] }, "secondary must contain 2"],
    ["too many secondary selections", { secondary: [211, 221, 231] }, "secondary must contain 2"],
    ["a secondary keystone", { secondary: [201, 231] }, "must be a lesser rune"],
    ["another path's secondary rune", { secondary: [111, 231] }, "must be a lesser rune"],
    ["two runes from one secondary row", { secondary: [211, 212] }, "different rows"],
    ["a duplicate secondary rune", { secondary: [211, 211] }, "cannot repeat a rune"],
    ["an unknown secondary rune", { secondary: [999, 231] }, "must be a lesser rune"],
    ["too few shards", { shards: [5008, 5001] }, "shards must contain 3"],
    ["too many shards", { shards: [5008, 5001, 5001, 5011] }, "shards must contain 3"],
    ["a misplaced shard", { shards: [5011, 5001, 5001] }, "shard row 0"],
    ["an unknown shard", { shards: [5008, 999, 5001] }, "shard row 1"],
    ["a nonfinite shard ID", { shards: [NaN, 5001, 5001] }, "shards must contain 3"],
  ])("rejects %s", (_label, update, expected) => {
    expect(issues({ ...page(), ...update })).toContain(expected);
  });

  it("enforces the catalog's allowed secondary paths", () => {
    const source = catalog();
    source.paths[0]!.allowedSecondaryPathIds = [300];
    expect(issues(page(), source)).toContain("not an allowed secondary path");
  });

  it("throws a useful message with every independent page issue", () => {
    expect(() => assertRunePage(catalog(), { ...page(), primaryPathId: -1, shards: [] }))
      .toThrow(/Invalid rune page:.*primaryPathId.*shards/);
  });
});

describe("inconsistent catalogs fail closed", () => {
  it.each([
    ["a duplicate path", (source: RuneCatalog) => source.paths.push(source.paths[0]!), "repeats path"],
    ["a missing primary row", (source: RuneCatalog) => source.paths[0]!.slots.pop(), "four rune rows"],
    ["an empty primary row", (source: RuneCatalog) => source.paths[0]!.slots[1] = [], "one or more"],
    ["a rune in two positions", (source: RuneCatalog) => source.paths[0]!.slots[1]!.push(101), "more than one position"],
    ["a missing rune record", (source: RuneCatalog) => source.runes.shift(), "missing rune"],
    ["a duplicate rune record", (source: RuneCatalog) => source.runes.push(source.runes[0]!), "repeats rune"],
    ["a wrong rune row", (source: RuneCatalog) => source.runes[0]!.slot = 2, "does not match"],
    ["a wrong rune path", (source: RuneCatalog) => source.runes[0]!.pathId = 200, "does not match"],
    ["a nonexistent secondary path", (source: RuneCatalog) => source.paths[0]!.allowedSecondaryPathIds = [999], "invalid secondary path"],
    ["the same secondary path", (source: RuneCatalog) => source.paths[0]!.allowedSecondaryPathIds = [100], "invalid secondary path"],
    ["a duplicate secondary path", (source: RuneCatalog) => source.paths[0]!.allowedSecondaryPathIds = [200, 200], "repeats a secondary path"],
    ["too few shard rows", (source: RuneCatalog) => source.shardSlots.pop(), "three shard rows"],
    ["a duplicate choice in a shard row", (source: RuneCatalog) => source.shardSlots[0]!.push(5008), "repeats a choice"],
    ["a missing shard record", (source: RuneCatalog) => source.shards.shift(), "missing shard"],
    ["a duplicate shard record", (source: RuneCatalog) => source.shards.push(source.shards[0]!), "repeats shard"],
    ["an unused shard record", (source: RuneCatalog) => source.shards.push({ ...source.shards[0]!, id: 999 }), "no selectable row"],
    ["a rune also used as a shard", (source: RuneCatalog) => { source.shards[0]!.id = 101; source.shardSlots[0]![0] = 101; }, "both a rune and a shard"],
  ])("rejects %s", (_label, corrupt, expected) => {
    const source = catalog();
    corrupt(source);
    expect(issues(page(), source)).toContain(expected);
  });

  it("rejects untrusted null catalogs without throwing an unrelated TypeError", () => {
    expect(issues(page(), null as unknown as RuneCatalog)).toContain("catalog must have schema 1");
  });
});

describe("current patch page layout", () => {
  it("validates every primary/secondary path pair against the complete committed catalog", () => {
    const source = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
    expect(source.paths).toHaveLength(5);
    expect(source.runes).toHaveLength(62);
    expect(source.shards).toHaveLength(7);
    for (const primary of source.paths) {
      for (const secondary of source.paths) {
        if (primary.id === secondary.id) continue;
        const candidate = {
          primaryPathId: primary.id,
          secondaryPathId: secondary.id,
          primary: primary.slots.map((row) => row[0]),
          secondary: [secondary.slots[1]![0], secondary.slots[3]![0]],
          shards: [5008, 5001, 5001],
        };
        expect(validateRunePage(source, candidate), `${primary.name}/${secondary.name}`).toMatchObject({ valid: true });
      }
    }
    for (const rune of source.runes) {
      const primary = source.paths.find((path) => path.id === rune.pathId)!;
      const secondary = source.paths.find((path) => primary.allowedSecondaryPathIds.includes(path.id))!;
      const choices = primary.slots.map((row) => row[0]);
      choices[rune.slot] = rune.id;
      expect(validateRunePage(source, {
        primaryPathId: primary.id,
        secondaryPathId: secondary.id,
        primary: choices,
        secondary: [secondary.slots[1]![0], secondary.slots[3]![0]],
        shards: [5008, 5001, 5001],
      }), rune.name).toMatchObject({ valid: true });
    }
    expect(source.runes.find((rune) => rune.id === 8230)?.name).toBe("Stormraider's Surge");
    expect(source.runes.find((rune) => rune.id === 8992)?.name).toBe("Deathfire Touch");
  });
});
