/**
 * Turns the raw downloads in data/raw/<dataset>/ into the committed dataset:
 *   data/<dataset>/champions.json        champion records used by the engine
 *   data/<dataset>/oracle/level20.json   the wiki's level-20 stat table (test oracle)
 *   data/<dataset>/reports/*.md          reports for review
 *
 * Usage: npm run build:data [-- --dataset 16.20]
 */
import path from "node:path";
import type { ChampionDataset } from "../engine/types";
import { RAW_DIR, datasetDir, rawDir } from "./config";
import { latestDataset } from "./datasets";
import { readJson, readText, writeJson, writeText } from "./lib/files";
import type { Manifest } from "./manifest";
import { reconcileWithGameFiles } from "./gameFiles";
import { normalizeOracle } from "./oracle";
import { buildChampions } from "./normalize";
import { type GameRecordStats, parseCharacterRecord } from "./parse/characterRecord";
import { parseChampionData } from "./parse/championData";
import { parseLevel20Table } from "./parse/level20Table";
import { gameFilesReport, level20Report } from "./reports";
import type { DDragonChampionFull } from "./sources/ddragon";

function argValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function log(message: string): void {
  console.log(`[build] ${message}`);
}

async function main(): Promise<void> {
  const dataset = argValue("--dataset") ?? (await latestDataset(RAW_DIR, "ddragon"));
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));

  const ddragon = await readJson<DDragonChampionFull>(path.join(raw, "ddragon", "championFull.json"));
  const entries = parseChampionData(await readText(path.join(raw, "wiki", "ChampionData.lua")));

  const records = new Map<string, GameRecordStats>();
  for (const name of manifest.cdragon.characterRecords) {
    const bin = await readJson<unknown>(path.join(raw, "cdragon", "bins", `${name}.bin.json`));
    records.set(name, parseCharacterRecord(bin, name));
  }
  const reconciled = reconcileWithGameFiles(entries, records);
  log(
    `Game files: ${reconciled.applied.length} wiki values replaced, ` +
      `${reconciled.notApplied.length} differences reported only (see reports/game-files.md)`,
  );

  const champions = buildChampions(reconciled.entries, ddragon, reconciled.overrides);
  const forms = champions.reduce((sum, champion) => sum + champion.forms.length, 0);
  log(`Patch ${manifest.patch}: ${champions.length} champions, ${forms} forms`);
  const championFile: ChampionDataset = { dataset, patch: manifest.patch, champions };
  await writeJson(path.join(out, "champions.json"), championFile);

  const rows = parseLevel20Table(await readText(path.join(raw, "wiki", "level20-table.html")));
  await writeJson(path.join(out, "oracle", "level20.json"), normalizeOracle(manifest, rows));
  log(`Level-20 oracle: ${rows.length} rows`);

  await writeText(path.join(out, "reports", "game-files.md"), gameFilesReport(manifest, reconciled));
  await writeText(path.join(out, "reports", "level20-stats.md"), level20Report(manifest, champions));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
