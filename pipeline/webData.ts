/**
 * Copies what the web app reads from a committed dataset into web/public/data/ (not
 * committed; rebuilt for every web build):
 *   data/index.json                  the dataset and patch the app shows
 *   data/<dataset>/champions.json    level-20 stats and kits' champion records
 *   data/<dataset>/rules.json        the stat budget's gold values
 *   data/<dataset>/glossary.json     the wiki's lists the ledger reads
 *   data/<dataset>/profiles.json     every champion's fight profile, in one file, for the ledger
 *   data/<dataset>/simulated.json    the duel results at the default settings
 *   data/<dataset>/simulated-builds.json  the duel results with item builds, when built (npm run build:builds)
 *   data/<dataset>/abilities/<id>.json  each champion's ability records, for kit pages and kits
 *   data/<dataset>/pets.json         every champion's pets (turrets, Mist Walkers, ...), by champion
 *   data/<dataset>/runes.json        the runes the simulator models (Triple Tonic)
 *   data/<dataset>/stat-shards.json  reviewed stat-shard choices and combat rules, when available
 *
 * Usage: npm run web:data [-- --dataset 16.20]
 */
import { cp, mkdir, readFile, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { DATA_DIR, REPO_ROOT, datasetDir } from "./config";
import { latestDataset } from "./datasets";
import { readJson, writeJson, writeText } from "./lib/files";
import type { Manifest } from "./manifest";
import { buildsProvenance, simulationProvenance } from "./sim/fingerprint";
import { loadRuneCatalog, RUNE_SOURCE_FILES } from "./runes/catalog";
import { loadShardRules } from "./runes/shardRules";
import { type StatShardData, validateStatShardData } from "../runes/shardData";

const OUT = path.join(REPO_ROOT, "web", "public", "data");

async function exists(file: string): Promise<boolean> {
  try {
    await readFile(file);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
}

/** Legacy datasets have no shard inputs; a partial or stale bundle must not be published. */
async function loadStatShards(dataset: string, source: string, patch: string, fingerprint: string): Promise<StatShardData | undefined> {
  const files = ["rune-catalog.json", "rune-shard-sources.json", "rune-sources/manifest.json", ...RUNE_SOURCE_FILES.map((file) => `rune-sources/${file}`)];
  const present = await Promise.all(files.map((file) => exists(path.join(source, file))));
  if (!present.some(Boolean)) return undefined;
  const missing = files.filter((_, index) => !present[index]);
  if (missing.length) throw new Error(`Stat shards: incomplete source bundle; missing ${missing.join(", ")}`);
  const catalog = await loadRuneCatalog(path.join(source, "rune-sources"));
  if (catalog.dataset !== dataset || catalog.patch !== patch) throw new Error("Stat shards: source dataset or patch does not match the export");
  // The source catalog's normal offline build is authoritative; no stale hand-edited
  // output can change the browser's choices or contradict its retained raw sources.
  if (await readFile(path.join(source, "rune-catalog.json"), "utf8") !== `${JSON.stringify(catalog, null, 2)}\n`) {
    throw new Error("Stat shards: committed rune catalog is stale; run npm run build:runes");
  }
  const rules = await loadShardRules(dataset, catalog);
  return validateStatShardData({
    schema: 1, dataset, patch, simulationFingerprint: fingerprint,
    catalog: { schema: catalog.schema, dataset, patch, shardSlots: catalog.shardSlots, shards: catalog.shards },
    rules,
  }, dataset, patch, fingerprint);
}

/** Used by the CLI and Vite's development watcher; importing this module performs no IO. */
export async function exportWebData(selected?: string, output = OUT): Promise<void> {
  const dataset = selected ?? await latestDataset(DATA_DIR, "simulated.json");
  const source = datasetDir(dataset);
  for (let attempt = 0; attempt < 3; attempt++) {
    if (await exportSnapshot(dataset, source, output)) {
      console.log(`[web] data for dataset ${dataset} in ${path.relative(REPO_ROOT, output)}`);
      return;
    }
  }
  throw new Error("Dataset inputs changed during export. The previous export was preserved; retry after edits finish.");
}

/** A changed input snapshot is discarded before publication, never stamped as current. */
async function exportSnapshot(dataset: string, source: string, output: string): Promise<boolean> {
  const simulation = await simulationProvenance(dataset);
  const builds = await exists(path.join(source, "simulated-builds.json")) ? await buildsProvenance(dataset) : undefined;
  const manifest = await readJson<Manifest>(path.join(source, "manifest.json"));
  const statShards = await loadStatShards(dataset, source, manifest.patch, simulation.fingerprint);
  const operation = `${process.pid}-${randomUUID()}`;
  const staging = path.join(path.dirname(output), `.data-staging-${operation}`);
  const backup = path.join(path.dirname(output), `.data-backup-${operation}`);
  const out = path.join(staging, dataset);
  try {
    await mkdir(out, { recursive: true });
    for (const file of ["champions.json", "rules.json", "glossary.json", "simulated.json", "runes.json", ...(builds ? ["simulated-builds.json"] : [])]) await cp(path.join(source, file), path.join(out, file));
    await cp(path.join(source, "abilities"), path.join(out, "abilities"), { recursive: true });
    const petFiles = (await readdir(path.join(source, "pets"))).filter((file) => file.endsWith(".json")).sort();
    const pets = Object.fromEntries(
      await Promise.all(petFiles.map(async (file) => [file.replace(/\.json$/, ""), JSON.parse(await readFile(path.join(source, "pets", file), "utf8")) as unknown] as const)),
    );
    await writeText(path.join(out, "pets.json"), JSON.stringify(pets));
    const profileFiles = (await readdir(path.join(source, "profiles"))).filter((file) => file.endsWith(".json")).sort();
    const profiles = await Promise.all(profileFiles.map(async (file) => JSON.parse(await readFile(path.join(source, "profiles", file), "utf8")) as unknown));
    await writeText(path.join(out, "profiles.json"), JSON.stringify(profiles));
    if (statShards) await writeJson(path.join(out, "stat-shards.json"), statShards);
    if ((await simulationProvenance(dataset)).fingerprint !== simulation.fingerprint) return false;
    // The builds name items from the catalog: its wiki revision and Data Dragon version, for the attribution.
    const itemSources = builds ? (await readJson<{ sources: { ddragon: string; itemData: { title: string; revid: number } } }>(path.join(source, "items.json"))).sources : undefined;
    if (builds && (await buildsProvenance(dataset)).fingerprint !== builds.fingerprint) return false;
    await writeJson(path.join(staging, "index.json"), {
      dataset,
      patch: manifest.patch,
      simulationFingerprint: simulation.fingerprint,
      ...(statShards ? { statShards: true } : {}),
      ...(builds && itemSources ? { buildsFingerprint: builds.fingerprint, itemSources: { title: itemSources.itemData.title, revid: itemSources.itemData.revid, ddragon: itemSources.ddragon } } : {}),
    });
    // Serve the previous complete export until its replacement is fully written.
    await rm(backup, { recursive: true, force: true });
    let hadPreviousOutput = false;
    try {
      await rename(output, backup);
      hadPreviousOutput = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    let preserveBackup = false;
    try {
      await rename(staging, output);
    } catch (error) {
      if (hadPreviousOutput) {
        try {
          await rename(backup, output);
        } catch (rollbackError) {
          preserveBackup = true;
          throw new AggregateError([error, rollbackError], `Export publication and rollback failed. The previous complete export is preserved at ${backup}`);
        }
      }
      throw error;
    } finally {
      if (!preserveBackup) await rm(backup, { recursive: true, force: true });
    }
    return true;
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = process.argv.indexOf("--dataset");
  void exportWebData(index >= 0 ? (process.argv[index + 1] ?? "") : undefined).catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}
