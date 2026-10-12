/**
 * Downloads every source for the current patch into data/raw/<dataset>/ (not committed)
 * and writes the committed provenance files data/<dataset>/manifest.json and
 * data/<dataset>/wiki-revisions.json.
 *
 * Usage: npm run fetch
 *        npm run fetch -- --only glossary   (refetch just the glossary pages of the latest dataset)
 *        npm run fetch -- --only pets       (refetch just the champion pages with pets)
 *        npm run fetch -- --only runes      (refetch just the rune and elixir pages)
 */
import path from "node:path";
import {
  RAW_DIR,
  WIKI_BASE,
  WIKI_CHAMPION_DATA_PAGE,
  WIKI_GLOSSARY_PAGES,
  WIKI_LEVEL20_PAGE,
  WIKI_LICENSE,
  WIKI_RUNE_PAGES,
  datasetDir,
  datasetName,
  patchName,
  rawDir,
} from "./config";
import { latestDataset } from "./datasets";
import { readJson, readText, writeJson, writeText } from "./lib/files";
import { mapLimit } from "./lib/http";
import type { Manifest } from "./manifest";
import { parseChampionData } from "./parse/championData";
import * as cdragon from "./sources/cdragon";
import * as ddragon from "./sources/ddragon";
import * as wiki from "./sources/wiki";

const TEMPLATE_NAMESPACE = 10;

function log(message: string): void {
  console.log(`[fetch] ${message}`);
}

/** The wiki's glossary pages: lists of abilities by mechanic, and the definitions rules cite. */
async function fetchGlossary(raw: string): Promise<{ pages: wiki.WikiPage[]; missing: string[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  const result = await wiki.getPages(WIKI_GLOSSARY_PAGES);
  await writeJson(path.join(raw, "wiki", "glossary.json"), result.pages);
  log(`Wiki: ${result.pages.length} glossary pages${result.missing.length > 0 ? `, missing: ${result.missing.join(", ")}` : ""}`);
  return { ...result, fetchedAt };
}

/**
 * Champion pages that describe pets in an {{Infobox/Pet}}: Heimerdinger's turrets, Yorick's
 * Mist Walkers, Illaoi's Tentacles, Gangplank's Powder Kegs and the like. Every champion page
 * is checked; only those with pets are kept.
 */
async function fetchPetPages(raw: string, championNames: string[]): Promise<{ pages: wiki.WikiPage[]; checked: number; missing: string[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  const result = await wiki.getPages(championNames);
  const pages = result.pages.filter((page) => page.content.includes("{{Infobox/Pet")).sort((a, b) => a.title.localeCompare(b.title));
  await writeJson(path.join(raw, "wiki", "pet-pages.json"), pages);
  log(`Wiki: ${pages.length} of ${result.pages.length} champion pages have pets${result.missing.length > 0 ? `; missing: ${result.missing.join(", ")}` : ""}`);
  return { pages, checked: result.pages.length, missing: result.missing, fetchedAt };
}

/** The rune and elixir pages the simulator reads (Triple Tonic). */
async function fetchRunePages(raw: string): Promise<{ pages: wiki.WikiPage[]; missing: string[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  const result = await wiki.getPages(WIKI_RUNE_PAGES);
  await writeJson(path.join(raw, "wiki", "rune-pages.json"), result.pages);
  log(`Wiki: ${result.pages.length} rune and elixir pages${result.missing.length > 0 ? `, missing: ${result.missing.join(", ")}` : ""}`);
  return { ...result, fetchedAt };
}

/** Writes new wiki revisions into a dataset's wiki-revisions.json, keeping the rest. */
async function addRevisions(out: string, pages: wiki.WikiPage[]): Promise<void> {
  const revisions = await readJson<Record<string, number>>(path.join(out, "wiki-revisions.json"));
  for (const page of pages) revisions[page.title] = page.revid;
  const sorted = Object.fromEntries(Object.entries(revisions).sort(([a], [b]) => a.localeCompare(b)));
  await writeJson(path.join(out, "wiki-revisions.json"), sorted);
}

/** Refetches only the champion pages with pets into the latest dataset and updates its provenance files. */
async function petsOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const championData = await readText(path.join(raw, "wiki", "ChampionData.lua"));
  const names = parseChampionData(championData).map((entry) => entry.name);
  const pets = await fetchPetPages(raw, names);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  manifest.wiki.petPages = { pages: pets.pages.length, checked: pets.checked, missing: pets.missing, fetchedAt: pets.fetchedAt };
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, pets.pages);
}

/** Refetches only the rune and elixir pages into the latest dataset and updates its provenance files. */
async function runesOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const out = datasetDir(dataset);
  const runes = await fetchRunePages(rawDir(dataset));
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  manifest.wiki.runePages = { pages: runes.pages.length, missing: runes.missing, fetchedAt: runes.fetchedAt };
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, runes.pages);
}

/** Refetches only the glossary pages into the latest dataset and updates its provenance files. */
async function glossaryOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const out = datasetDir(dataset);
  const glossary = await fetchGlossary(rawDir(dataset));
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  manifest.wiki.glossary = { pages: glossary.pages.length, missing: glossary.missing, fetchedAt: glossary.fetchedAt };
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, glossary.pages);
}

async function main(): Promise<void> {
  const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : undefined;
  if (only === "glossary") return glossaryOnly();
  if (only === "pets") return petsOnly();
  if (only === "runes") return runesOnly();
  if (only !== undefined) throw new Error(`Unknown --only value: ${only}`);

  const ddragonVersion = await ddragon.latestVersion();
  const cdragonVersion = await cdragon.contentVersion();
  const dataset = datasetName(ddragonVersion);
  if (datasetName(cdragonVersion) !== dataset) {
    throw new Error(
      `Data Dragon is on ${ddragonVersion} but CommunityDragon is on ${cdragonVersion}. ` +
        "Refusing to mix patches; try again once both have updated.",
    );
  }
  const raw = rawDir(dataset);
  log(`Patch ${patchName(dataset)}: Data Dragon ${ddragonVersion}, CommunityDragon ${cdragonVersion}`);

  // Data Dragon: the champion roster, ability ranks and icons.
  const championFullText = await ddragon.championFullText(ddragonVersion);
  await writeText(path.join(raw, "ddragon", "championFull.json"), championFullText);
  const championFull = JSON.parse(championFullText) as ddragon.DDragonChampionFull;
  const championKeys = Object.values(championFull.data)
    .map((champion) => Number(champion.key))
    .sort((a, b) => a - b);
  log(`Data Dragon: ${championKeys.length} champions`);

  // Wiki: champion stats module (read first: it names the extra character records to fetch).
  const championData = (await wiki.getPages([WIKI_CHAMPION_DATA_PAGE])).pages[0];
  if (!championData) throw new Error(`Wiki page not found: ${WIKI_CHAMPION_DATA_PAGE}`);
  await writeText(path.join(raw, "wiki", "ChampionData.lua"), championData.content);

  // CommunityDragon: live client data per champion, and the game data file of every
  // character record the wiki describes (champions plus forms such as Mega Gnar).
  await writeText(path.join(raw, "cdragon", "champion-summary.json"), await cdragon.championSummaryText());
  await mapLimit(championKeys, 6, async (key) => {
    const text = await cdragon.championDetailText(key);
    await writeText(path.join(raw, "cdragon", "champions", `${key}.json`), text);
  });
  const characterNames = [
    ...new Set([
      ...Object.keys(championFull.data),
      ...parseChampionData(championData.content).map((entry) => entry.apiname),
    ]),
  ].sort();
  await mapLimit(characterNames, 6, async (name) => {
    const text = await cdragon.characterBinText(name);
    await writeText(path.join(raw, "cdragon", "bins", `${name}.bin.json`), text);
  });
  log(`CommunityDragon: ${championKeys.length} champion detail files, ${characterNames.length} game data files`);

  // Wiki: the level-20 oracle table and every ability data template.
  const level20 = await wiki.parsePage(WIKI_LEVEL20_PAGE);
  await writeText(path.join(raw, "wiki", "level20-table.html"), level20.html);
  log(`Wiki: ChampionData rev ${championData.revid}, level-20 table rev ${level20.revid}`);

  const templateTitles = await wiki.listPages(TEMPLATE_NAMESPACE, "Data ");
  log(`Wiki: ${templateTitles.length} data templates to fetch`);
  const templates = await wiki.getPages(templateTitles, (done, total) => {
    if (done % 500 < 50 || done === total) log(`  ${done}/${total}`);
  });
  await writeJson(path.join(raw, "wiki", "data-templates.json"), templates.pages);
  if (templates.missing.length > 0) log(`Wiki: ${templates.missing.length} listed pages were missing`);
  const glossary = await fetchGlossary(raw);
  const pets = await fetchPetPages(raw, parseChampionData(championData.content).map((entry) => entry.name));
  const runes = await fetchRunePages(raw);

  const manifest: Manifest = {
    dataset,
    patch: patchName(dataset),
    fetchedAt: new Date().toISOString(),
    ddragon: { version: ddragonVersion, champions: championKeys.length },
    cdragon: { version: cdragonVersion, championDetails: championKeys.length, characterRecords: characterNames },
    wiki: {
      site: WIKI_BASE,
      license: WIKI_LICENSE,
      championData: { title: WIKI_CHAMPION_DATA_PAGE, revid: championData.revid },
      level20Table: { title: WIKI_LEVEL20_PAGE, revid: level20.revid },
      dataTemplates: { pages: templates.pages.length, missing: templates.missing },
      glossary: { pages: glossary.pages.length, missing: glossary.missing, fetchedAt: glossary.fetchedAt },
      petPages: { pages: pets.pages.length, checked: pets.checked, missing: pets.missing, fetchedAt: pets.fetchedAt },
      runePages: { pages: runes.pages.length, missing: runes.missing, fetchedAt: runes.fetchedAt },
    },
  };
  const out = datasetDir(dataset);
  await writeJson(path.join(out, "manifest.json"), manifest);

  const revisions = Object.fromEntries(
    [
      [WIKI_LEVEL20_PAGE, level20.revid] as const,
      ...[championData, ...templates.pages, ...glossary.pages, ...pets.pages, ...runes.pages].map((page) => [page.title, page.revid] as const),
    ].sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeJson(path.join(out, "wiki-revisions.json"), revisions);
  log(`Done. Raw files in ${path.relative(process.cwd(), raw)}, provenance in ${path.relative(process.cwd(), out)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
