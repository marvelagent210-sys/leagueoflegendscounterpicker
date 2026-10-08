/**
 * Turns the raw downloads in data/raw/<dataset>/ into the committed dataset:
 *   data/<dataset>/champions.json        champion records used by the engine
 *   data/<dataset>/oracle/level20.json   the wiki's level-20 stat table (test oracle)
 *   data/<dataset>/abilities/<id>.json   every ability of each champion, read from the wiki
 *   data/<dataset>/kits/<id>.md          a readable page per champion, for auditing
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
import { buildAbilityRecords } from "./abilities/build";
import { championIdResolver, championLookup } from "./abilities/championLookup";
import { measureCoverage } from "./abilities/coverage";
import { checkValues, type LevelLink, linkLevelSeries, type ValueCheck } from "./abilities/crossCheck";
import { readGameAbilities } from "./abilities/gameSpells";
import { reconcileWithGameFiles } from "./gameFiles";
import { normalizeOracle } from "./oracle";
import { buildChampions } from "./normalize";
import { type GameRecordStats, parseCharacterRecord } from "./parse/characterRecord";
import { parseChampionData } from "./parse/championData";
import { parseLevel20Table } from "./parse/level20Table";
import { abilitiesReport, gameFilesReport, kitPage, level20Report } from "./reports";
import type { DDragonChampionFull } from "./sources/ddragon";
import type { WikiPage } from "./sources/wiki";

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

  const championDataSource = await readText(path.join(raw, "wiki", "ChampionData.lua"));
  const pages = await readJson<WikiPage[]>(path.join(raw, "wiki", "data-templates.json"));
  const byId = new Map(champions.map((champion) => [champion.id, champion]));
  const abilities = buildAbilityRecords(pages, {
    championData: championLookup(championDataSource),
    championId: championIdResolver(entries, new Set(byId.keys())),
    maxRanks: (id, slot) => byId.get(id)?.maxRanks[slot] ?? 5,
  });
  const checks: ValueCheck[] = [];
  const links: LevelLink[] = [];
  for (const champion of champions) {
    const records = abilities.records.filter((record) => record.champion === champion.id);
    const game = readGameAbilities(await readJson<unknown>(path.join(raw, "cdragon", "bins", `${champion.id}.bin.json`)));
    const client = await readJson<{ spells: Array<{ name: string }> }>(
      path.join(raw, "cdragon", "champions", `${champion.key}.json`),
    );
    const championChecks = checkValues(records, game, client.spells.map((spell) => spell.name));
    // Extends level-based values to levels 19-20 in place, before the records are written.
    const championLinks = linkLevelSeries(records, game);
    checks.push(...championChecks);
    links.push(...championLinks);
    await writeJson(path.join(out, "abilities", `${champion.id}.json`), records);
    await writeText(
      path.join(out, "kits", `${champion.id}.md`),
      kitPage(manifest, champion, records, { checks: championChecks, links: championLinks, game }),
    );
  }
  const coverage = measureCoverage(abilities.records);
  await writeText(path.join(out, "reports", "abilities.md"), abilitiesReport(manifest, abilities, coverage, checks, links));
  const parsedShare = ((100 * coverage.levelingParsed) / coverage.levelingStats).toFixed(1);
  log(
    `Abilities: ${coverage.records} records for ${coverage.champions} champions; ` +
      `${parsedShare}% of leveling values fully parsed (see reports/abilities.md)`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
