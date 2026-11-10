import { existsSync } from "node:fs";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import * as fs from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DATA_DIR } from "../../pipeline/config";
import * as fingerprint from "../../pipeline/sim/fingerprint";
import { exportWebData } from "../../pipeline/webData";
import { validateStatShardData } from "../../runes/shardData";

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  return { ...actual, rename: vi.fn(actual.rename) };
});

let temporary: string;
let output: string;

beforeEach(async () => {
  // A test that fails renames must not leave them failing for the next.
  vi.mocked(fs.rename).mockImplementation((await vi.importActual<typeof fs>("node:fs/promises")).rename);
  temporary = await mkdtemp(path.join(tmpdir(), "counter-export-"));
  output = path.join(temporary, "data");
  await mkdir(output);
  await writeFile(path.join(output, "index.json"), JSON.stringify({ previous: true }));
  vi.spyOn(console, "log").mockImplementation(() => {});
});

afterEach(async () => {
  vi.restoreAllMocks();
  await rm(temporary, { recursive: true, force: true });
});

describe("web export snapshots", () => {
  it("exports compact reviewed stat shards bound to the same dataset revision", async () => {
    vi.spyOn(fingerprint, "simulationProvenance").mockResolvedValue({ schema: 1, fingerprint: "shard-model" });
    await exportWebData("16.21", output);
    const index = JSON.parse(await readFile(path.join(output, "index.json"), "utf8")) as Record<string, unknown>;
    const text = await readFile(path.join(output, "16.21", "stat-shards.json"), "utf8");
    const data = validateStatShardData(JSON.parse(text), "16.21", "26.21", "shard-model");
    expect(index.statShards).toBe(true);
    expect(data.catalog.shards).toHaveLength(7);
    expect(data.catalog.shardSlots).toEqual([[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]]);
    expect(data.rules.healthPerLevel).toBe(10);
    expect(data.rules.evidence.length).toBeGreaterThan(0);
    expect(Object.keys(data.catalog).sort()).toEqual(["dataset", "patch", "schema", "shardSlots", "shards"]);
    expect(text.length).toBeLessThan(20000);
    expect(data.catalog).not.toHaveProperty("runes");
    expect(data.catalog).not.toHaveProperty("rules");
  });

  it("keeps legacy datasets without shard sources usable without advertising shard controls", async () => {
    vi.spyOn(fingerprint, "simulationProvenance").mockResolvedValue({ schema: 1, fingerprint: "legacy-model" });
    await exportWebData("16.20", output);
    expect(JSON.parse(await readFile(path.join(output, "index.json"), "utf8"))).not.toHaveProperty("statShards");
    expect(existsSync(path.join(output, "16.20", "stat-shards.json"))).toBe(false);
  });

  it("rejects partial shard sources before publishing over an existing export", async () => {
    const actual = (await vi.importActual<typeof fs>("node:fs/promises")).readFile;
    vi.spyOn(fs, "readFile").mockImplementation(((file: Parameters<typeof readFile>[0], ...args: unknown[]) => {
      if (String(file) === path.join(DATA_DIR, "16.21", "rune-shard-sources.json")) {
        return Promise.reject(Object.assign(new Error("missing shard source"), { code: "ENOENT" }));
      }
      return Reflect.apply(actual, fs, [file, ...args]);
    }) as typeof readFile);
    await expect(exportWebData("16.21", output)).rejects.toThrow(/incomplete source bundle.*rune-shard-sources/);
    expect(JSON.parse(await readFile(path.join(output, "index.json"), "utf8"))).toEqual({ previous: true });
    expect(await readdir(temporary)).toEqual(["data"]);
  });

  it("rejects a stale committed catalog and changed raw shard evidence without replacing the prior export", async () => {
    const actual = (await vi.importActual<typeof fs>("node:fs/promises")).readFile;
    for (const filename of ["rune-catalog.json", "rune-shard-sources.json"]) {
      vi.spyOn(fs, "readFile").mockImplementation(((file: Parameters<typeof readFile>[0], ...args: unknown[]) => {
        return Reflect.apply(actual, fs, [file, ...args]).then((value: string | Buffer) => {
          if (String(file) !== path.join(DATA_DIR, "16.21", filename)) return value;
          const data = JSON.parse(value.toString()) as { shards: Array<{ name: string }>; pages: Array<{ content: string }> };
          if (filename === "rune-catalog.json") data.shards[0]!.name += " changed";
          else data.pages[0]!.content += " changed";
          const changed = JSON.stringify(data, null, 2) + "\n";
          return typeof value === "string" ? changed : Buffer.from(changed);
        });
      }) as typeof readFile);
      await expect(exportWebData("16.21", output)).rejects.toThrow(filename === "rune-catalog.json" ? /catalog is stale/ : /content hash differs/);
      expect(JSON.parse(await readFile(path.join(output, "index.json"), "utf8"))).toEqual({ previous: true });
      vi.mocked(fs.readFile).mockRestore();
    }
  });

  it("discards changed snapshots before publishing, then retries against stable inputs", async () => {
    let reads = 0;
    vi.spyOn(fingerprint, "simulationProvenance").mockImplementation(async () => {
      reads++;
      if (reads === 2) {
        expect(JSON.parse(await readFile(path.join(output, "index.json"), "utf8"))).toEqual({ previous: true });
      }
      return { schema: 1, fingerprint: reads === 1 ? "old-inputs" : "stable-inputs" };
    });
    await exportWebData("16.21", output);
    const index = JSON.parse(await readFile(path.join(output, "index.json"), "utf8")) as { simulationFingerprint: string };
    expect(index.simulationFingerprint).toBe("stable-inputs");
    expect(reads).toBe(4);
    expect(JSON.parse(await readFile(path.join(output, "16.21", "champions.json"), "utf8"))).toHaveProperty("champions");
    expect(await readdir(temporary)).toEqual(["data"]);
  });

  it("retains the previous complete export when inputs keep changing", async () => {
    let reads = 0;
    vi.spyOn(fingerprint, "simulationProvenance").mockImplementation(async () => ({ schema: 1, fingerprint: `revision-${reads++}` }));
    await expect(exportWebData("16.21", output)).rejects.toThrow("previous export was preserved");
    expect(JSON.parse(await readFile(path.join(output, "index.json"), "utf8"))).toEqual({ previous: true });
    expect(reads).toBe(6);
    expect(await readdir(temporary)).toEqual(["data"]);
  });

  it("keeps the previous complete export if publication and rollback both fail", async () => {
    vi.spyOn(fingerprint, "simulationProvenance").mockResolvedValue({ schema: 1, fingerprint: "stable" });
    const rename = (await vi.importActual<typeof fs>("node:fs/promises")).rename;
    let renames = 0;
    vi.spyOn(fs, "rename").mockImplementation(async (from, to) => {
      renames++;
      if (renames === 1) return rename(from, to);
      throw new Error(renames === 2 ? "publication failed" : "rollback failed");
    });
    await expect(exportWebData("16.21", output)).rejects.toThrow("previous complete export is preserved at");
    const backups = (await readdir(temporary)).filter((file) => file.startsWith(".data-backup-"));
    expect(backups).toHaveLength(1);
    expect(JSON.parse(await readFile(path.join(temporary, backups[0]!, "index.json"), "utf8"))).toEqual({ previous: true });
  });

  it("publishes the build matrix with its inputs' fingerprint and the item, summoner spell and rune catalogs' sources when the dataset has one, and nothing of it otherwise", async () => {
    vi.spyOn(fingerprint, "simulationProvenance").mockResolvedValue({ schema: 1, fingerprint: "stable" });
    vi.spyOn(fingerprint, "buildsProvenance").mockResolvedValue({ schema: 1, fingerprint: "builds" });
    await exportWebData("16.21", output);
    const index = JSON.parse(await readFile(path.join(output, "index.json"), "utf8")) as Record<string, unknown>;
    const exported = existsSync(path.join(output, "16.21", "simulated-builds.json"));
    // The matrix takes hours to build (npm run build:builds), so a checkout may not have it yet.
    if (existsSync(path.join(DATA_DIR, "16.21", "simulated-builds.json"))) {
      expect(exported).toBe(true);
      expect(index.buildsFingerprint).toBe("builds");
      expect(index.itemSources).toEqual({ title: "Module:ItemData/data", revid: expect.any(Number), ddragon: expect.any(String), spellData: { title: "Module:SpellData/data", revid: expect.any(Number) }, cdragon: expect.any(String) });
    } else {
      expect(exported).toBe(false);
      expect(index).not.toHaveProperty("buildsFingerprint");
      expect(index).not.toHaveProperty("itemSources");
    }
  });
});
