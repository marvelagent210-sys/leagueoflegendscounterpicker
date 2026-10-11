/**
 * Turns the raw downloads in data/raw/<dataset>/ into the committed dataset:
 *   data/<dataset>/champions.json        champion records used by the engine
 *   data/<dataset>/oracle/level20.json   the wiki's level-20 stat table (test oracle)
 *   data/<dataset>/abilities/<id>.json   every ability of each champion, read from the wiki
 *   data/<dataset>/kits/<id>.md          a readable page per champion, for auditing
 *   data/<dataset>/glossary.json         the wiki's lists of abilities by mechanic, and its CC rules
 *   data/<dataset>/rules.json            game rules read from the wiki for the simulator (stat gold values)
 *   data/<dataset>/profiles/<id>.json    what each ability does in a fight, for the interaction ledger
 *   data/<dataset>/counters/<id>.md      every champion ranked against each enemy by the ledger (partial),
 *                                        and by the duel simulator when both have simulator kits (full)
 *   data/<dataset>/rankings.json         the ledger rankings, machine-readable
 *   data/<dataset>/simulated.json        every simulated matchup between champions with simulator kits
 *   data/<dataset>/reports/*.md          reports for review
 *
 * Usage: npm run build:data [-- --dataset 16.20]
 */
import { rm } from "node:fs/promises";
import path from "node:path";
import type { PetRecord } from "../engine/abilities";
import type { ChampionDataset } from "../engine/types";
import { RAW_DIR, datasetDir, rawDir } from "./config";
import { latestDataset } from "./datasets";
import { readJson, readText, writeJson, writeText } from "./lib/files";
import type { Manifest } from "./manifest";
import { buildAbilityRecords } from "./abilities/build";
import { championIdResolver, championLookup } from "./abilities/championLookup";
import { currentAbilities } from "./abilities/current";
import { measureCoverage } from "./abilities/coverage";
import { checkValues, type LevelLink, linkLevelSeries, type ValueCheck } from "./abilities/crossCheck";
import { readGameAbilities } from "./abilities/gameSpells";
import { reconcileWithGameFiles } from "./gameFiles";
import { buildGlossary } from "./glossary/build";
import { parsePets } from "./pets";
import { buildProfiles } from "./profiles/build";
import { GOLD_VALUE_PAGE, parseGoldValues } from "./rules";
import { normalizeOracle } from "./oracle";
import { buildChampions } from "./normalize";
import { type GameRecordStats, parseCharacterRecord } from "./parse/characterRecord";
import { parseChampionData } from "./parse/championData";
import { parseLevel20Table } from "./parse/level20Table";
import { type KitGameData, abilitiesReport, gameFilesReport, kitPage, level20Report } from "./reports";
import { counterPage, ledgerReport } from "./ledgerPages";
import { ledgerContext, rankCounters } from "../engine/ledger/index";
import { DEFAULT_BUDGET } from "../engine/budget";
import { type CompiledKit, compileKit } from "../engine/kits/compile";
import { KITS } from "../kits/champions/index";
import { GOLDEN } from "../tests/golden/matchups";
import { simulatePairs } from "./sim/pool";
import { type SimulatedMatrix, simulatedCounterSection, simulatedJson, simulatedMatrix, simulatorReport, simulatorSection } from "./simPages";
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
  const championId = championIdResolver(entries, new Set(byId.keys()));
  const current = currentAbilities(pages, championDataSource, championId);
  const abilities = buildAbilityRecords(pages, {
    championData: championLookup(championDataSource),
    championId,
    maxRanks: (id, slot) => byId.get(id)?.maxRanks[slot] ?? 5,
    isCurrent: (id, name) => current.has(`${id}/${name}`),
  });
  const checks: ValueCheck[] = [];
  const links: LevelLink[] = [];
  const gameData = new Map<string, KitGameData>();
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
    gameData.set(champion.id, { checks: championChecks, links: championLinks, game });
  }
  // Pets: the units champions summon or place, from the pet infoboxes on their wiki pages.
  const petPages = await readJson<WikiPage[]>(path.join(raw, "wiki", "pet-pages.json")).catch(() => {
    throw new Error("Missing the champion pages with pets; run npm run fetch -- --only pets");
  });
  const petLookup = championLookup(championDataSource);
  const pets = new Map<string, PetRecord[]>();
  for (const page of petPages) {
    const id = championId(page.title);
    if (!id || !byId.has(id)) throw new Error(`Pet page "${page.title}" doesn't name a champion`);
    const found = parsePets(page, id, petLookup);
    if (found.length > 0) pets.set(id, found);
  }
  await rm(path.join(out, "pets"), { recursive: true, force: true });
  for (const [id, found] of [...pets].sort(([a], [b]) => a.localeCompare(b))) await writeJson(path.join(out, "pets", `${id}.json`), found);
  log(`Pets: ${[...pets.values()].reduce((sum, found) => sum + found.length, 0)} from ${pets.size} champion pages`);
  const glossaryPages = await readJson<WikiPage[]>(path.join(raw, "wiki", "glossary.json"));
  const glossary = buildGlossary(glossaryPages, pages, abilities.records);
  await writeJson(path.join(out, "glossary.json"), glossary);
  const goldValues = glossaryPages.find((page) => page.title === GOLD_VALUE_PAGE);
  if (!goldValues) throw new Error(`Missing wiki page ${GOLD_VALUE_PAGE}; run npm run fetch -- --only glossary`);
  await writeJson(path.join(out, "rules.json"), parseGoldValues(goldValues));
  log(
    `Glossary: ${glossary.entries.length} list entries from ${Object.keys(glossary.pages).length} wiki pages, ` +
      `${glossary.crowdControl.length} crowd control rules, ${glossary.unresolved.length} unresolved mentions`,
  );

  const profiles = buildProfiles(champions, abilities.records, glossary);
  if (profiles.staleOverrides.length > 0) {
    throw new Error(`Curated data no longer matches the wiki:\n${profiles.staleOverrides.join("\n")}`);
  }
  for (const kit of profiles.kits) await writeJson(path.join(out, "profiles", `${kit.champion}.json`), kit);
  log(`Profiles: ${profiles.kits.length} kits; ${profiles.descriptionOnly.length} effects read only from descriptions`);
  const profileOf = new Map(profiles.kits.map((kit) => [kit.champion, kit]));

  // The duel simulator: every pairing of champions with simulator kits (full confidence).
  const compiled = new Map<string, CompiledKit>();
  for (const [id, module] of Object.entries(KITS).sort(([a], [b]) => a.localeCompare(b))) {
    const champion = byId.get(id);
    if (!champion) throw new Error(`Simulator kit for unknown champion ${id}`);
    compiled.set(id, compileKit(champion, abilities.records.filter((record) => record.champion === id), module, {}, pets.get(id) ?? []));
  }
  const simulated = [...compiled.keys()];
  const pairs: Array<[string, string]> = simulated.flatMap((you, i) => simulated.slice(i + 1).map((enemy): [string, string] => [you, enemy]));
  const started = Date.now();
  const matrix: SimulatedMatrix = simulatedMatrix(simulated, DEFAULT_BUDGET, pairs, await simulatePairs(dataset, DEFAULT_BUDGET, pairs));
  await writeText(path.join(out, "simulated.json"), simulatedJson(dataset, manifest.patch, matrix));
  log(`Simulator: ${pairs.length} matchups between ${simulated.length} champions with kits in ${((Date.now() - started) / 1000).toFixed(0)} s (see simulated.json and reports/simulator.md)`);

  for (const champion of champions) {
    const records = abilities.records.filter((record) => record.champion === champion.id);
    const kit = compiled.get(champion.id);
    const page = kitPage(manifest, champion, records, gameData.get(champion.id), profileOf.get(champion.id));
    await writeText(path.join(out, "kits", `${champion.id}.md`), kit ? `${page}\n${simulatorSection(kit).join("\n").trimEnd()}\n` : page);
  }

  // Ledger-only counter ranking for every enemy (partial until the duel simulator).
  const ctx = ledgerContext(glossary);
  const names = new Map(champions.map((champion) => [champion.id, champion.name]));
  const rankings = profiles.kits.map((enemy) => rankCounters(enemy, profiles.kits, ctx));
  for (const ranking of rankings) {
    const section = compiled.has(ranking.enemy) ? simulatedCounterSection(ranking.enemy, matrix, names) : [];
    await writeText(path.join(out, "counters", `${ranking.enemy}.md`), counterPage(ranking, names, manifest.patch, section));
  }
  // One line per enemy keeps the file small and its per-patch diffs readable.
  const rankingLines = rankings.map(
    (r) => `    ${JSON.stringify(r.enemy)}: ${JSON.stringify(r.ranking.map((row) => [row.champion, row.net]))}`,
  );
  await writeText(
    path.join(out, "rankings.json"),
    `{\n  "dataset": ${JSON.stringify(dataset)},\n  "patch": ${JSON.stringify(manifest.patch)},\n  "confidence": "partial",\n  "rankings": {\n${rankingLines.join(",\n")}\n  }\n}\n`,
  );
  await writeText(path.join(out, "reports", "ledger.md"), ledgerReport(manifest.patch, glossary, profiles.kits, rankings, names, profiles.descriptionOnly));
  await writeText(path.join(out, "reports", "simulator.md"), simulatorReport(manifest.patch, matrix, names, GOLDEN));
  log(`Ledger: counter rankings for ${rankings.length} champions (partial; see counters/ and reports/ledger.md)`);

  const coverage = measureCoverage(abilities.records);
  await writeText(path.join(out, "reports", "abilities.md"), abilitiesReport(manifest, abilities, coverage, checks, links));
  const parsedShare = ((100 * coverage.levelingParsed) / coverage.levelingStats).toFixed(1);
  log(
    `Abilities: ${coverage.records} records for ${coverage.champions} champions ` +
      `(${abilities.legacy.length} pages of removed abilities skipped); ` +
      `${parsedShare}% of leveling values fully parsed (see reports/abilities.md)`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
