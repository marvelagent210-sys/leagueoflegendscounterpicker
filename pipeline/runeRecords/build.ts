/**
 * Builds the rune catalog (M8's loadouts) from the raw downloads in data/raw/<dataset>/:
 *   data/<dataset>/rune-records.json  every rune Summoner's Rift offers, the stat shards, and the rule pages
 *   data/<dataset>/reports/rune-records.md   the same as a readable page, with the cross-checks
 *
 * Like the item catalog it runs on its own: after npm run fetch, run npm run build:rune-records. (The
 * runes.json that build:data writes holds the one rune kits read, Udyr's Triple Tonic.)
 *
 * Usage: npm run build:rune-records [-- --dataset 16.21]
 */
import path from "node:path";
import { championLookup } from "../abilities/championLookup";
import { RAW_DIR, datasetDir, rawDir } from "../config";
import { latestDataset } from "../datasets";
import { readJson, readText, writeJson, writeText } from "../lib/files";
import type { Manifest } from "../manifest";
import type { DDragonRunePath } from "../sources/ddragon";
import type { WikiPage } from "../sources/wiki";
import { type ClientPerk, type ClientPerkStyles, buildRuneRecords } from "./records";
import { runesReport } from "./report";

function argValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main(): Promise<void> {
  const dataset = argValue("--dataset") ?? (await latestDataset(RAW_DIR, "ddragon"));
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  const sources = manifest.runeRecords;
  if (!sources) throw new Error("The manifest records no rune catalog sources; run npm run fetch -- --only rune-records");
  const missing = () => {
    throw new Error("Missing the rune catalog sources; run npm run fetch -- --only rune-records");
  };
  const [ddragon, perks, perkStyles, pages, championData] = await Promise.all([
    readJson<DDragonRunePath[]>(path.join(raw, "ddragon", "runesReforged.json")).catch(missing),
    readJson<ClientPerk[]>(path.join(raw, "cdragon", "perks.json")).catch(missing),
    readJson<ClientPerkStyles>(path.join(raw, "cdragon", "perkstyles.json")).catch(missing),
    readJson<WikiPage[]>(path.join(raw, "wiki", "rune-records.json")).catch(missing),
    readText(path.join(raw, "wiki", "ChampionData.lua")),
  ]);
  for (const { title, revid } of [...sources.templates, ...sources.articles, ...sources.rules]) {
    if (!pages.some((page) => page.title === title && page.revid === revid)) throw new Error(`The rune downloads lack ${title} revision ${revid}; run npm run fetch -- --only rune-records`);
  }
  const catalog = buildRuneRecords({
    dataset,
    patch: manifest.patch,
    ddragonVersion: sources.ddragonVersion,
    ddragon,
    cdragonVersion: manifest.cdragon.version,
    perks,
    perkStyles,
    pages,
    championData: championLookup(championData),
  });
  await writeJson(path.join(out, "rune-records.json"), catalog);
  await writeText(path.join(out, "reports", "rune-records.md"), runesReport(catalog));
  const shards = catalog.shards.reduce((sum, slot) => sum + slot.options.length, 0);
  console.log(`[runes] ${catalog.runes.length} runes in ${catalog.paths.length} paths, ${shards} shard options in ${catalog.shards.length} slots; ${catalog.checks.compared} checked, ${catalog.checks.differences.length} differences (see rune-records.json and reports/rune-records.md)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
