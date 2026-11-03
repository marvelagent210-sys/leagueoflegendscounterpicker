/**
 * The incremental refresh (PLAN.md §13): the keys a pairing's result is reused under
 * (pipeline/sim/pairKeys.ts), the stores it is reused from and the shards pending pairings
 * split into (pipeline/sim/reuse.ts), and that the committed matrices were computed from the
 * current inputs.
 */
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { BUDGET_STATS, DEFAULT_BUDGET } from "../../engine/budget";
import { KITS } from "../../kits/champions/index";
import { DATA_DIR } from "../../pipeline/config";
import { type PairInputs, canonicalJson, codeClosure, kitKey, localImports, pairInputs, samePairInputs, withoutProvenance } from "../../pipeline/sim/pairKeys";
import { simulatePairs } from "../../pipeline/sim/pool";
import { SPENT_FILE, buildsStores, parseRecompute, parseShard, plainStores, reusable, shardOf, storeDatasets } from "../../pipeline/sim/reuse";
import { type SimulatedMatrix, simulatedMatrix } from "../../pipeline/simPages";

const directories: string[] = [];
afterAll(async () => {
  for (const directory of directories) await rm(directory, { recursive: true, force: true });
});

describe("pair keys", () => {
  it("hash data whatever its key order, and leave out provenance at every depth", () => {
    expect(canonicalJson({ b: 1, a: [{ d: 2, c: 3 }] })).toBe('{"a":[{"c":3,"d":2}],"b":1}');
    expect(withoutProvenance({ page: { title: "Template:Data Darius/Decimate", revid: 1 }, gameSources: [{ version: "16.20", url: "u", sha256: "h", text: ["x"] }] })).toEqual({
      page: { title: "Template:Data Darius/Decimate" },
      gameSources: [{ text: ["x"] }],
    });
  });

  it("follow a module's run-time imports, not its type-only ones", () => {
    const source = [
      'import { a } from "./util";',
      'import type { B } from "../../engine/types";',
      'import { type C, d } from "../../engine/budget";',
      'export * from "./sections";',
      'await import("./worker.ts");',
    ].join("\n");
    expect(localImports("pipeline/sim/refresh.ts", source.replace("./util", "./pool"))).toEqual(["pipeline/sim/pool.ts", "engine/budget.ts", "pipeline/sim/sections.ts", "pipeline/sim/worker.ts"]);
  });

  it("take a fight's code from what its worker runs: the engine and shared kit code, not the refresh, the pages or the golden list", async () => {
    const sim = await codeClosure(["pipeline/sim/worker.ts"]);
    expect(sim).toContain("engine/sim/matchup.ts");
    expect(sim).toContain("kits/champions/util.ts");
    expect(sim).toContain("kits/champions/Darius.ts");
    for (const driver of ["pipeline/sim/refresh.ts", "pipeline/simPages.ts", "tests/golden/matchups.ts", "pipeline/sim/pool.ts"]) expect(sim).not.toContain(driver);
    expect(sim.some((file) => file.startsWith("engine/ledger/"))).toBe(false);
    const builds = await codeClosure(["pipeline/sim/buildsWorker.ts"]);
    for (const file of ["items/equip.ts", "pipeline/items/search.ts", "pipeline/itemData.ts"]) expect(builds).toContain(file);
    expect(builds).not.toContain("pipeline/sim/builds.ts");
  });

  it("change a kit's key with what it fights with, not with where its data came from", () => {
    const parts = {
      module: "export default {}",
      champion: { id: "Darius", lastChanged: "26.08", icon: "Darius.png", forms: [{ stats: { hp: { base: 652, perLevel: 114 } } }] },
      abilities: [{ name: "Decimate", page: { title: "Template:Data Darius/Decimate", revid: 1 }, fields: { cooldown: { values: [9, 8, 7, 6, 5] } }, gameSources: [{ version: "16.20", url: "a", text: ["x"] }] }],
      pets: null,
    };
    const key = kitKey(parts);
    const moved = structuredClone(parts);
    moved.champion.lastChanged = "26.21";
    moved.abilities[0]!.page.revid = 2;
    moved.abilities[0]!.gameSources[0]!.version = "16.21";
    moved.abilities[0]!.gameSources[0]!.url = "b";
    expect(kitKey(moved)).toBe(key);
    const changed = structuredClone(parts);
    changed.abilities[0]!.fields.cooldown.values = [9, 7.75, 6.5, 5.25, 4];
    expect(kitKey(changed)).not.toBe(key);
    expect(kitKey({ ...parts, module: "export default { changed: true }" })).not.toBe(key);
  });

  it("match a stored pairing only when the shared key and both kits' keys are the same", () => {
    const stored: PairInputs = { schema: 1, shared: "s", kits: { A: "a", B: "b", C: "c" } };
    expect(samePairInputs(stored, { ...stored }, "A", "B")).toBe(true);
    expect(samePairInputs(stored, { ...stored, kits: { ...stored.kits, C: "c2" } }, "A", "B")).toBe(true);
    expect(samePairInputs(stored, { ...stored, kits: { ...stored.kits, C: "c2" } }, "A", "C")).toBe(false);
    expect(samePairInputs(stored, { ...stored, shared: "s2" }, "A", "B")).toBe(false);
    expect(samePairInputs(stored, { ...stored, kits: { ...stored.kits, D: "d" } }, "A", "D")).toBe(false);
  });
});

describe("the committed matrices", () => {
  it("were computed from the current inputs, pairing by pairing", async () => {
    const dir = path.join(DATA_DIR, "16.21");
    const simulated = JSON.parse(await readFile(path.join(dir, "simulated.json"), "utf8")) as { inputs: PairInputs; simulation: { fingerprint: string } };
    expect(simulated.inputs).toEqual(await pairInputs("16.21", "sim"));
    const builds = JSON.parse(await readFile(path.join(dir, "simulated-builds.json"), "utf8")) as { inputs: PairInputs };
    expect(builds.inputs).toEqual(await pairInputs("16.21", "builds", "sixItems"));
    expect(Object.keys(simulated.inputs.kits).sort()).toEqual(Object.keys(KITS).sort());
    const spent = JSON.parse(await readFile(path.join(dir, SPENT_FILE), "utf8")) as { simulation: { fingerprint: string }; stats: string[]; spent: Record<string, Record<string, number[]>> };
    expect(spent.simulation.fingerprint).toBe(simulated.simulation.fingerprint);
    expect(spent.stats).toEqual([...BUDGET_STATS]);
    const ids = Object.keys(KITS);
    expect(ids.every((you) => Object.keys(spent.spent[you] ?? {}).length === ids.length - 1)).toBe(true);
  });

  it("give back a reused pairing exactly as computing it again writes it, kit variants included", async () => {
    const pairs: Array<[string, string]> = [["Darius", "Garen"], ["Heimerdinger", "Jax"]];
    const ids = [...new Set(pairs.flat())];
    const { results } = reusable(pairs, await pairInputs("16.21", "sim"), await plainStores("16.21"));
    expect(results.size).toBe(pairs.length);
    const fresh = await simulatePairs("16.21", DEFAULT_BUDGET, pairs, 2);
    const written = (matrix: SimulatedMatrix) => JSON.stringify([matrix.scores, matrix.spent, matrix.variants].map((rows) => [...rows].map(([id, row]) => [id, [...row]])));
    const reused = simulatedMatrix(ids, DEFAULT_BUDGET, pairs, pairs.map((_, index) => ({ ...results.get(index)!, index })));
    const computed = simulatedMatrix(ids, DEFAULT_BUDGET, pairs, fresh.sort((a, b) => a.index - b.index));
    expect(written(reused)).toBe(written(computed));
    expect(reused.variants.get("Heimerdinger")?.get("Jax")).toBeDefined();
  }, 120_000);
});

describe("reusing stored results", () => {
  const inputs: PairInputs = { schema: 1, shared: "s", kits: { A: "a", B: "b", C: "c" } };
  const none = BUDGET_STATS.map(() => 0);

  async function dataset(root: string, name: string, kits: Record<string, string>, extra: Record<string, unknown> = {}): Promise<void> {
    const dir = path.join(root, name);
    await mkdir(dir, { recursive: true });
    const simulation = { schema: 1, fingerprint: `f-${name}` };
    await writeFile(
      path.join(dir, "simulated.json"),
      JSON.stringify({
        simulation,
        inputs: { schema: 1, shared: "s", kits },
        matchups: { A: { B: [0.5, 1, -1, 0.5, 0.2, null, 0], C: [0.1, 0, 0, 0, 0, null, 0] }, B: { A: [-0.5, 1, -1, -0.5, -0.2, null, 0], C: [0.2, 0, 0, 0, 0, null, 0] }, C: { A: [-0.1, 0, 0, 0, 0, null, 0], B: [-0.2, 0, 0, 0, 0, null, 0] } },
        variants: { B: { A: { rankQ: 6 } } },
        ...extra,
      }),
    );
    await writeFile(path.join(dir, SPENT_FILE), JSON.stringify({ simulation, stats: BUDGET_STATS, spent: { A: { B: [100, ...none.slice(1)], C: none }, B: { A: none, C: none }, C: { A: none, B: none } } }));
  }

  it("take each pairing from the nearest dataset whose inputs match, and compute the rest", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "reuse-"));
    directories.push(root);
    // 16.20 computed every pairing; 16.21 has none of its own yet, and C changed in it.
    await dataset(root, "16.20", { A: "a", B: "b", C: "c-old" });
    await dataset(root, "16.19", { A: "a", B: "b", C: "c" });
    expect(await storeDatasets("16.21", "simulated.json", root)).toEqual(["16.20"]);
    const stores = await plainStores("16.21", root);
    const pairs: Array<[string, string]> = [["A", "B"], ["A", "C"], ["B", "C"]];
    const { results, from } = reusable(pairs, inputs, stores);
    expect([...results.keys()]).toEqual([0]);
    expect(from.get("16.20")).toBe(1);
    const reused = results.get(0)!;
    expect(reused.score).toBe(0.5);
    expect(reused.scenarios).toEqual([1, -1, 0.5, 0.2, null, 0]);
    expect(reused.spent[0].ad).toBe(100);
    expect(reused.variants).toEqual([{ side: 1, options: { rankQ: 6 } }]);
    // A dataset's own results come first.
    expect(await storeDatasets("16.20", "simulated.json", root)).toEqual(["16.20", "16.19"]);
    // --recompute: a champion's pairings are computed again whatever is stored.
    expect([...reusable(pairs, inputs, stores, new Set(["B"])).results.keys()]).toEqual([]);
    expect([...reusable(pairs, inputs, stores, new Set(["C"])).results.keys()]).toEqual([0]);
  });

  it("ignore a store whose spending isn't from the same computation, or that records no inputs", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "reuse-"));
    directories.push(root);
    await dataset(root, "16.20", inputs.kits);
    const spentFile = path.join(root, "16.20", SPENT_FILE);
    const spent = JSON.parse(await readFile(spentFile, "utf8")) as { simulation: { fingerprint: string } };
    spent.simulation.fingerprint = "other";
    await writeFile(spentFile, JSON.stringify(spent));
    expect(await plainStores("16.21", root)).toEqual([]);
    await dataset(root, "16.19", inputs.kits, { inputs: undefined });
    expect(await plainStores("16.20", root)).toEqual([]);
  });

  it("read item builds and loadouts back by name, from a file of the same format only, and none from a file without loadouts", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "reuse-"));
    directories.push(root);
    await mkdir(path.join(root, "16.20"), { recursive: true });
    const loadoutNames = ["Barrier", "Bone Plating", "Conqueror", "Flash", "Health", "Health Scaling", "Last Stand", "Legend: Alacrity", "Triumph", "Unflinching"];
    const at = (...names: string[]) => names.map((name) => loadoutNames.indexOf(name));
    const loadout = at("Flash", "Barrier", "Conqueror", "Triumph", "Legend: Alacrity", "Last Stand", "Bone Plating", "Unflinching", "Health Scaling", "Health Scaling", "Health");
    const stored = { format: "sixItems", inputs, items: ["Guardian Angel", "Infinity Edge", "Thornmail"], matchups: { A: { B: [0.25, 0.25, 0.25, 0.25, 0.25, null, 0.25] }, B: { A: [-0.25, -0.25, -0.25, -0.25, -0.25, null, -0.25] } }, builds: { A: { B: [0, 1] }, B: { A: [2] } } };
    await writeFile(path.join(root, "16.20", "simulated-builds.json"), JSON.stringify({ ...stored, loadoutNames, loadouts: { A: { B: loadout }, B: { A: loadout } } }));
    const [store] = await buildsStores("16.21", "sixItems", "simulated-builds.json", root);
    const played = { spells: ["Flash", "Barrier"], page: { keystone: "Conqueror", primary: ["Triumph", "Legend: Alacrity", "Last Stand"], secondary: ["Bone Plating", "Unflinching"], shards: ["Health Scaling", "Health Scaling", "Health"] } };
    expect(store!.result("A", "B")).toEqual({ score: 0.25, scenarios: [0.25, 0.25, 0.25, 0.25, null, 0.25], builds: [["Guardian Angel", "Infinity Edge"], ["Thornmail"]], loadouts: [played, played], seconds: 0 });
    expect(await buildsStores("16.21", "fiveItemsWithBoots", "simulated-builds.json", root)).toEqual([]);
    await writeFile(path.join(root, "16.20", "simulated-builds.json"), JSON.stringify(stored));
    const [older] = await buildsStores("16.21", "sixItems", "simulated-builds.json", root);
    expect(older!.result("A", "B")).toBeUndefined();
  });
});

describe("shards", () => {
  it("split the pending pairings evenly, without overlap, and parse i/N and --recompute", () => {
    const pending = Array.from({ length: 10 }, (_, i) => i * 3);
    const shards = [0, 1, 2].map((index) => shardOf(pending, { index, count: 3 }));
    expect(shards.map((share) => share.length)).toEqual([4, 3, 3]);
    expect(shards.flat().sort((a, b) => a - b)).toEqual(pending);
    expect(shardOf(pending, undefined)).toEqual(pending);
    expect(parseShard("2/5")).toEqual({ index: 2, count: 5 });
    expect(parseShard(undefined)).toBeUndefined();
    for (const bad of ["5/5", "1/0", "a/2", "1"]) expect(() => parseShard(bad)).toThrow();
    expect([...parseRecompute("Darius, Garen", ["Darius", "Garen", "Jax"])]).toEqual(["Darius", "Garen"]);
    expect(parseRecompute(undefined, ["Darius"]).size).toBe(0);
    expect(() => parseRecompute("Darius,Nobody", ["Darius"])).toThrow(/Nobody/);
  });
});
