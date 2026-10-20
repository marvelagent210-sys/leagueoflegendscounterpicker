/**
 * Builds the item catalog (PLAN.md §13, M8) from the raw downloads in data/raw/<dataset>/:
 *   data/<dataset>/items.json          the finished items and tier-2 boots: stats, effects, limits
 *   data/<dataset>/reports/items.md    the same as a readable page, with the game-file cross-check
 *
 * The simulator doesn't read items yet, so this runs on its own, outside build.ts and the
 * simulation fingerprint: after npm run fetch, run npm run build:data and npm run build:items.
 *
 * Usage: npm run build:items [-- --dataset 16.20]
 */
import path from "node:path";
import { championLookup } from "../abilities/championLookup";
import { RAW_DIR, datasetDir, rawDir } from "../config";
import { latestDataset } from "../datasets";
import { readJson, readText, writeJson, writeText } from "../lib/files";
import type { Manifest } from "../manifest";
import type { WikiPage } from "../sources/wiki";
import type { DDragonItems } from "./catalog";
import { buildItemCatalog } from "./records";
import { itemsReport } from "./report";

function argValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main(): Promise<void> {
  const dataset = argValue("--dataset") ?? (await latestDataset(RAW_DIR, "ddragon"));
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  if (!manifest.items) throw new Error("The manifest records no item sources; run npm run fetch -- --only items");
  const missing = () => {
    throw new Error("Missing the item sources; run npm run fetch -- --only items");
  };
  const [ddragon, gameFile, itemPages, championData] = await Promise.all([
    readJson<DDragonItems>(path.join(raw, "ddragon", "item.json")).catch(missing),
    readJson<Record<string, unknown>>(path.join(raw, "cdragon", "items.cdtb.bin.json")).catch(missing),
    readJson<WikiPage[]>(path.join(raw, "wiki", "item-pages.json")).catch(missing),
    readText(path.join(raw, "wiki", "ChampionData.lua")),
  ]);
  const itemData = itemPages.find((page) => page.title === manifest.items!.itemData.title);
  if (!itemData) throw new Error(`The item downloads lack ${manifest.items.itemData.title}`);
  const catalog = buildItemCatalog({
    dataset,
    patch: manifest.patch,
    ddragon,
    gameFile,
    cdragonVersion: manifest.items.cdragonVersion,
    itemData,
    championData: championLookup(championData),
  });
  await writeJson(path.join(out, "items.json"), catalog);
  await writeText(path.join(out, "reports", "items.md"), itemsReport(catalog));
  const counts = { legendary: catalog.items.filter((item) => item.kind === "legendary").length, boots: catalog.items.filter((item) => item.kind === "boots").length };
  console.log(`[items] ${counts.legendary} finished items and ${counts.boots} tier-2 boots; ${catalog.groups.length} one-per-build groups; ${catalog.checks.stats} stats checked against the game file, ${catalog.checks.differences.length} differences (see items.json and reports/items.md)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
