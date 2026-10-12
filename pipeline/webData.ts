/**
 * Copies what the web app reads from a committed dataset into web/public/data/ (not
 * committed; rebuilt for every web build):
 *   data/index.json                  the dataset and patch the app shows
 *   data/<dataset>/champions.json    level-20 stats and kits' champion records
 *   data/<dataset>/rules.json        the stat budget's gold values
 *   data/<dataset>/glossary.json     the wiki's lists the ledger reads
 *   data/<dataset>/profiles.json     every champion's fight profile, in one file, for the ledger
 *   data/<dataset>/simulated.json    the duel results at the default settings
 *   data/<dataset>/abilities/<id>.json  each champion's ability records, for kit pages and kits
 *   data/<dataset>/pets.json         every champion's pets (turrets, Mist Walkers, ...), by champion
 *   data/<dataset>/runes.json        the runes the simulator models (Triple Tonic)
 *
 * Usage: npm run web:data [-- --dataset 16.20]
 */
import { cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { DATA_DIR, REPO_ROOT, datasetDir } from "./config";
import { latestDataset } from "./datasets";
import { readJson, writeJson, writeText } from "./lib/files";
import type { Manifest } from "./manifest";

const OUT = path.join(REPO_ROOT, "web", "public", "data");

async function main(): Promise<void> {
  const index = process.argv.indexOf("--dataset");
  const dataset = index >= 0 ? (process.argv[index + 1] ?? "") : await latestDataset(DATA_DIR, "simulated.json");
  const source = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(source, "manifest.json"));
  const out = path.join(OUT, dataset);
  await rm(OUT, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  for (const file of ["champions.json", "rules.json", "glossary.json", "simulated.json", "runes.json"]) await cp(path.join(source, file), path.join(out, file));
  await cp(path.join(source, "abilities"), path.join(out, "abilities"), { recursive: true });
  const petFiles = (await readdir(path.join(source, "pets"))).filter((file) => file.endsWith(".json")).sort();
  const pets = Object.fromEntries(
    await Promise.all(petFiles.map(async (file) => [file.replace(/\.json$/, ""), JSON.parse(await readFile(path.join(source, "pets", file), "utf8")) as unknown] as const)),
  );
  await writeText(path.join(out, "pets.json"), JSON.stringify(pets));
  const profileFiles = (await readdir(path.join(source, "profiles"))).filter((file) => file.endsWith(".json")).sort();
  const profiles = await Promise.all(profileFiles.map(async (file) => JSON.parse(await readFile(path.join(source, "profiles", file), "utf8")) as unknown));
  await writeText(path.join(out, "profiles.json"), JSON.stringify(profiles));
  await writeJson(path.join(OUT, "index.json"), { dataset, patch: manifest.patch });
  console.log(`[web] data for patch ${manifest.patch} (dataset ${dataset}) in web/public/data/`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
