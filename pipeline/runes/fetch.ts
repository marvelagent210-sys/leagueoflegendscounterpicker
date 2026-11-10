/** Fetch pinned-version rune inputs separately from the legacy combat rune data. */
import { createHash, randomUUID } from "node:crypto";
import { lstat, mkdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DATA_DIR, WIKI_API, datasetDir } from "../config";
import { latestDataset } from "../datasets";
import { readJson } from "../lib/files";
import { fetchText } from "../lib/http";
import type { Manifest } from "../manifest";
import { getPages } from "../sources/wiki";
import { buildRuneCatalog, type RuneSourceManifest } from "./catalog";

const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");

/** Data Dragon capitalizes this title differently from the wiki. IDs stay authoritative. */
const wikiName = (name: string) => name === "Jack Of All Trades" ? "Jack of All Trades" : name;

/** Replace a whole verified bundle, restoring the old directory if promotion fails. */
export async function promoteRuneSources(staging: string, destination: string): Promise<void> {
  const backup = `${destination}.backup-${randomUUID()}`;
  let previous = false;
  try {
    const entry = await lstat(destination);
    if (!entry.isDirectory() || entry.isSymbolicLink()) throw new Error("Rune sources must be a regular directory");
    previous = true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (previous) await rename(destination, backup);
  try {
    await rename(staging, destination);
  } catch (error) {
    if (previous) {
      try { await rename(backup, destination); }
      catch { throw new Error(`Rune source promotion failed; the previous verified bundle is preserved at ${backup}`, { cause: error }); }
    }
    throw error;
  }
  if (previous) await rm(backup, { recursive: true });
}

export async function fetchRuneCatalogSources(dataset: string): Promise<void> {
  if (!/^\d+\.\d+$/.test(dataset)) throw new Error("Expected a dataset such as 16.21");
  const datasetManifest = await readJson<Manifest>(path.join(datasetDir(dataset), "manifest.json"));
  if (datasetManifest.dataset !== dataset || !datasetManifest.ddragon.version.startsWith(`${dataset}.`)) {
    throw new Error("The dataset manifest and Data Dragon version disagree");
  }
  const version = datasetManifest.ddragon.version;
  const gameData = `https://raw.communitydragon.org/${dataset}/plugins/rcp-be-lol-game-data/global/default/v1`;
  const urls: Record<string, string> = {
    "runesReforged.json": `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`,
    "perks.json": `${gameData}/perks.json`,
    "perkstyles.json": `${gameData}/perkstyles.json`,
    "wiki-pages.json": WIKI_API,
  };
  const files: Record<string, string> = {};
  // Wiki requests use the existing serial, rate-limited API client.
  for (const name of ["runesReforged.json", "perks.json", "perkstyles.json"]) {
    files[name] = await fetchText(urls[name]!);
  }
  const paths: unknown = JSON.parse(files["runesReforged.json"]!);
  if (!Array.isArray(paths)) throw new Error("Data Dragon rune paths must be an array");
  const names: string[] = [];
  for (const entry of paths) {
    if (!entry || !Array.isArray(entry.slots)) throw new Error("Data Dragon rune path has no slots");
    for (const slot of entry.slots) {
      if (!slot || !Array.isArray(slot.runes)) throw new Error("Data Dragon rune slot has no choices");
      for (const rune of slot.runes) {
        if (!rune || typeof rune.name !== "string" || !rune.name.trim()) throw new Error("Rune has no name");
        names.push(rune.name);
      }
    }
  }
  if (new Set(names).size !== names.length) throw new Error("Duplicate Data Dragon rune names");
  const titles = [...names.map((name) => `Template:Rune data ${wikiName(name)}`), "Rune"];
  const wiki = await getPages(titles);
  if (wiki.missing.length || wiki.pages.length !== titles.length) {
    throw new Error(`Incomplete rune wiki sources: ${wiki.missing.join(", ") || "missing revisions"}`);
  }
  files["wiki-pages.json"] = `${JSON.stringify(wiki.pages.sort((a, b) => a.title.localeCompare(b.title)), null, 2)}\n`;
  const manifest: RuneSourceManifest = {
    dataset,
    patch: datasetManifest.patch,
    ddragonVersion: version,
    communityDragonVersion: dataset,
    files: Object.fromEntries(Object.entries(files).map(([name, content]) => [name, { url: urls[name]!, sha256: sha256(content) }])),
  };
  // Validate every downloaded source before replacing any committed input.
  const catalog = buildRuneCatalog(manifest, files);
  const destination = path.join(datasetDir(dataset), "rune-sources");
  const staging = `${destination}.staging-${process.pid}`;
  await mkdir(staging);
  try {
    for (const [name, text] of Object.entries(files)) await writeFile(path.join(staging, name), text, "utf8");
    await writeFile(path.join(staging, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    await promoteRuneSources(staging, destination);
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
  console.log(`[runes] Fetched ${catalog.runes.length} runes, ${catalog.paths.length} paths, ${catalog.shards.length} shards; ${wiki.pages.length} exact wiki revisions. Combat inputs were not changed.`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--help") {
    console.log("Usage: npm run fetch:runes -- [--dataset 16.21]\nFetches source-catalog inputs only; build them with npm run build:runes.");
    return;
  }
  if (args.length !== 0 && (args.length !== 2 || args[0] !== "--dataset" || !args[1])) {
    throw new Error("Usage: npm run fetch:runes -- [--dataset 16.21]");
  }
  await fetchRuneCatalogSources(args[1] ?? await latestDataset(DATA_DIR, "manifest.json"));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
}
