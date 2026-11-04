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
    if ((await simulationProvenance(dataset)).fingerprint !== simulation.fingerprint) return false;
    // The builds name items, summoner spells and runes from the catalogs: their wiki revisions and game data versions, for the attribution.
    const itemSources = builds ? (await readJson<{ sources: { ddragon: string; itemData: { title: string; revid: number } } }>(path.join(source, "items.json"))).sources : undefined;
    const spellSources = builds ? (await readJson<{ sources: { spellData: { title: string; revid: number } } }>(path.join(source, "summoners.json"))).sources : undefined;
    const runeSources = builds ? (await readJson<{ sources: { cdragon: string } }>(path.join(source, "rune-catalog.json"))).sources : undefined;
    if (builds && (await buildsProvenance(dataset)).fingerprint !== builds.fingerprint) return false;
    await writeJson(path.join(staging, "index.json"), {
      dataset,
      patch: manifest.patch,
      simulationFingerprint: simulation.fingerprint,
      ...(builds && itemSources
        ? {
            buildsFingerprint: builds.fingerprint,
            itemSources: {
              title: itemSources.itemData.title,
              revid: itemSources.itemData.revid,
              ddragon: itemSources.ddragon,
              ...(spellSources ? { spellData: { title: spellSources.spellData.title, revid: spellSources.spellData.revid } } : {}),
              ...(runeSources ? { cdragon: runeSources.cdragon } : {}),
            },
          }
        : {}),
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
