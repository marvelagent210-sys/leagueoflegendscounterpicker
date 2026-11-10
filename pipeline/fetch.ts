/**
 * Downloads every source for the current patch into data/raw/<dataset>/ (not committed)
 * and writes the committed provenance files data/<dataset>/manifest.json and
 * data/<dataset>/wiki-revisions.json.
 *
 * Usage: npm run fetch
 *        npm run fetch -- --only glossary   (refetch just the glossary pages of the latest dataset)
 *        npm run fetch -- --only pets       (refetch just the champion pages with pets)
 *        npm run fetch -- --only runes      (refetch just the rune and elixir pages)
 *        npm run fetch -- --only items      (refetch just the item catalog's sources)
 *        npm run fetch -- --only item-rules (refetch just the rule pages item effects quote)
 *        npm run fetch -- --only spells     (refetch just the summoner spells' sources)
 *        npm run fetch -- --only rune-records (refetch just the rune catalog's sources)
 */
import path from "node:path";
import {
  RAW_DIR,
  WIKI_BASE,
  WIKI_CHAMPION_DATA_PAGE,
  WIKI_GLOSSARY_PAGES,
  WIKI_ITEM_DATA_PAGE,
  WIKI_ITEM_RULE_PAGES,
  WIKI_LEVEL20_PAGE,
  WIKI_LICENSE,
  WIKI_RUNE_PAGES,
  datasetDir,
  datasetName,
  patchName,
  rawDir,
} from "./config";
import { excerptCharacters } from "./abilities/evidence";
import { latestDataset } from "./datasets";
import { readJson, readText, writeJson, writeText } from "./lib/files";
import { mapLimit } from "./lib/http";
import type { Manifest } from "./manifest";
import { parseChampionData } from "./parse/championData";
import { WIKI_RUNE_DATA_PREFIX, WIKI_RUNE_RULE_PAGES, currentRunes, runePage } from "./runeRecords/records";
import { WIKI_SPELL_DATA_PAGE, classicSpells } from "./summoners/records";
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

/**
 * The item catalog's sources (M8): Data Dragon's item list for the dataset's version, the items'
 * game data file, and the wiki's item data module.
 */
async function fetchItems(raw: string, ddragonVersion: string, cdragonVersion: string): Promise<{ page: wiki.WikiPage; rules: wiki.WikiPage[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  await writeText(path.join(raw, "ddragon", "item.json"), await ddragon.itemText(ddragonVersion));
  await writeText(path.join(raw, "cdragon", "items.cdtb.bin.json"), await cdragon.itemsBinText());
  const page = (await wiki.getPages([WIKI_ITEM_DATA_PAGE])).pages[0];
  if (!page) throw new Error(`Wiki page not found: ${WIKI_ITEM_DATA_PAGE}`);
  const rules = await fetchItemRules();
  await writeJson(path.join(raw, "wiki", "item-pages.json"), [page, ...rules]);
  log(`Items: Data Dragon ${ddragonVersion}, CommunityDragon ${cdragonVersion}, ${WIKI_ITEM_DATA_PAGE} rev ${page.revid}, ${rules.length} rule pages`);
  return { page, rules, fetchedAt };
}

/** The wiki's rule pages that item effects quote; every one must exist. */
async function fetchItemRules(): Promise<wiki.WikiPage[]> {
  const { pages, missing } = await wiki.getPages(WIKI_ITEM_RULE_PAGES);
  if (missing.length > 0) throw new Error(`Wiki rule pages not found: ${missing.join(", ")}`);
  return WIKI_ITEM_RULE_PAGES.map((title) => pages.find((page) => page.title === title)!);
}

/**
 * The summoner spells' sources: Data Dragon's summoner list for the dataset's version (it names
 * the spells Summoner's Rift offers), the wiki's spell data module, and each of those spells'
 * articles (their notes). Every one must exist.
 */
async function fetchSpells(raw: string, ddragonVersion: string): Promise<{ data: wiki.WikiPage; articles: wiki.WikiPage[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  const summoners = await ddragon.summonerText(ddragonVersion);
  await writeText(path.join(raw, "ddragon", "summoner.json"), summoners);
  const names = classicSpells(JSON.parse(summoners) as ddragon.DDragonSummoners).map((spell) => spell.name);
  const titles = [WIKI_SPELL_DATA_PAGE, ...names];
  const { pages, missing } = await wiki.getPages(titles);
  if (missing.length > 0) throw new Error(`Wiki pages not found: ${missing.join(", ")}`);
  const [data, ...articles] = titles.map((title) => pages.find((page) => page.title === title)!);
  await writeJson(path.join(raw, "wiki", "spell-pages.json"), [data, ...articles]);
  log(`Summoner spells: Data Dragon ${ddragonVersion}, ${WIKI_SPELL_DATA_PAGE} rev ${data!.revid}, ${articles.length} articles (${names.join(", ")})`);
  return { data: data!, articles, fetchedAt };
}

/** The manifest's record of the summoner spells' sources. */
function spellSources(ddragonVersion: string, spells: { data: wiki.WikiPage; articles: wiki.WikiPage[]; fetchedAt: string }): NonNullable<Manifest["spells"]> {
  return { ddragonVersion, spellData: { title: spells.data.title, revid: spells.data.revid }, articles: spells.articles.map(({ title, revid }) => ({ title, revid })), fetchedAt: spells.fetchedAt };
}

/**
 * The rune catalog's sources: Data Dragon's rune list for the dataset's version (the runes
 * Summoner's Rift offers), the client's perk data for the stat shards, each rune's wiki data
 * template (titled by its name, case aside) and article, and WIKI_RUNE_RULE_PAGES. Every one
 * must exist.
 */
async function fetchRuneRecords(raw: string, ddragonVersion: string): Promise<{ templates: wiki.WikiPage[]; articles: wiki.WikiPage[]; rules: wiki.WikiPage[]; fetchedAt: string }> {
  const fetchedAt = new Date().toISOString();
  const reforged = await ddragon.runesReforgedText(ddragonVersion);
  await writeText(path.join(raw, "ddragon", "runesReforged.json"), reforged);
  await writeText(path.join(raw, "cdragon", "perks.json"), await cdragon.perksText());
  await writeText(path.join(raw, "cdragon", "perkstyles.json"), await cdragon.perkStylesText());
  const runes = currentRunes(JSON.parse(reforged) as ddragon.DDragonRunePath[]);
  // Data Dragon's names can differ from the wiki's in case ("Jack Of All Trades").
  const listed = (await wiki.listPages(TEMPLATE_NAMESPACE, WIKI_RUNE_DATA_PREFIX.slice("Template:".length))).map((title) => ({ title, pageid: 0, revid: 0, timestamp: "", content: "" }));
  const templateTitles = runes.map((rune) => {
    const found = runePage(listed, rune.name, WIKI_RUNE_DATA_PREFIX);
    if (!found) throw new Error(`No wiki data template for the rune ${rune.name}`);
    return found.title;
  });
  const articleTitles = templateTitles.map((title) => title.slice(WIKI_RUNE_DATA_PREFIX.length));
  const titles = [...templateTitles, ...articleTitles, ...WIKI_RUNE_RULE_PAGES];
  const { pages, missing } = await wiki.getPages(titles);
  if (missing.length > 0) throw new Error(`Wiki pages not found: ${missing.join(", ")}`);
  const byTitle = (title: string) => pages.find((page) => page.title === title)!;
  const [templates, articles, rules] = [templateTitles.map(byTitle), articleTitles.map(byTitle), WIKI_RUNE_RULE_PAGES.map(byTitle)];
  await writeJson(path.join(raw, "wiki", "rune-records.json"), [...templates, ...articles, ...rules]);
  log(`Rune catalog: Data Dragon ${ddragonVersion}, ${templates.length} rune data templates and articles, ${rules.length} rule pages`);
  return { templates, articles, rules, fetchedAt };
}

/** The manifest's record of the rune catalog's sources. */
function runeRecordSources(ddragonVersion: string, runes: { templates: wiki.WikiPage[]; articles: wiki.WikiPage[]; rules: wiki.WikiPage[]; fetchedAt: string }): NonNullable<Manifest["runeRecords"]> {
  const pinned = (pages: wiki.WikiPage[]) => pages.map(({ title, revid }) => ({ title, revid }));
  return { ddragonVersion, templates: pinned(runes.templates), articles: pinned(runes.articles), rules: pinned(runes.rules), fetchedAt: runes.fetchedAt };
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

/** Refetches only the item catalog's sources into the latest dataset and updates its provenance files. */
async function itemsOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  // Data Dragon keeps every version; CommunityDragon serves only the latest game files.
  const cdragonVersion = await cdragon.contentVersion();
  if (datasetName(cdragonVersion) !== dataset) {
    throw new Error(`CommunityDragon is on ${cdragonVersion}, not dataset ${dataset}: its item game file would mix patches.`);
  }
  const items = await fetchItems(rawDir(dataset), manifest.ddragon.version, cdragonVersion);
  manifest.items = { ddragonVersion: manifest.ddragon.version, cdragonVersion, itemData: { title: items.page.title, revid: items.page.revid }, rules: items.rules.map(({ title, revid }) => ({ title, revid })), fetchedAt: items.fetchedAt };
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, [items.page, ...items.rules]);
}

/** Refetches only the item rule pages into the latest dataset, keeping its item sources as they are. */
async function itemRulesOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  if (!manifest.items) throw new Error("The manifest records no item sources; run npm run fetch -- --only items");
  const pages = await readJson<wiki.WikiPage[]>(path.join(raw, "wiki", "item-pages.json"));
  const itemData = pages.find((page) => page.title === manifest.items!.itemData.title);
  if (!itemData) throw new Error(`The item downloads lack ${manifest.items.itemData.title}`);
  const rules = await fetchItemRules();
  await writeJson(path.join(raw, "wiki", "item-pages.json"), [itemData, ...rules]);
  manifest.items.rules = rules.map(({ title, revid }) => ({ title, revid }));
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, rules);
  log(`Items: ${rules.length} rule pages (${rules.map((page) => `${page.title} rev ${page.revid}`).join(", ")})`);
}

/** Refetches only the summoner spells' sources into the latest dataset and updates its provenance files. */
async function spellsOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  const spells = await fetchSpells(rawDir(dataset), manifest.ddragon.version);
  manifest.spells = spellSources(manifest.ddragon.version, spells);
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, [spells.data, ...spells.articles]);
}

/** Refetches only the rune catalog's sources into the latest dataset and updates its provenance files. */
async function runeRecordsOnly(): Promise<void> {
  const dataset = await latestDataset(RAW_DIR, "ddragon");
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  // CommunityDragon serves only the latest client files.
  const cdragonVersion = await cdragon.contentVersion();
  if (datasetName(cdragonVersion) !== dataset) throw new Error(`CommunityDragon is on ${cdragonVersion}, not dataset ${dataset}: its perk data would mix patches.`);
  const runes = await fetchRuneRecords(rawDir(dataset), manifest.ddragon.version);
  manifest.runeRecords = runeRecordSources(manifest.ddragon.version, runes);
  await writeJson(path.join(out, "manifest.json"), manifest);
  await addRevisions(out, [...runes.templates, ...runes.articles, ...runes.rules]);
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
  if (only === "items") return itemsOnly();
  if (only === "item-rules") return itemRulesOnly();
  if (only === "spells") return spellsOnly();
  if (only === "rune-records") return runeRecordsOnly();
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
  // Game files the curated evidence quotes beyond the champions' own (Zyra's plants).
  const extraCharacters = excerptCharacters().filter((name) => !characterNames.includes(name));
  await mapLimit(extraCharacters, 6, async (name) => {
    const text = await cdragon.characterBinText(name);
    await writeText(path.join(raw, "cdragon", "bins", `${name}.bin.json`), text);
  });
  log(`CommunityDragon: ${championKeys.length} champion detail files, ${characterNames.length + extraCharacters.length} game data files`);

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
  const items = await fetchItems(raw, ddragonVersion, cdragonVersion);
  const spells = await fetchSpells(raw, ddragonVersion);
  const runeRecords = await fetchRuneRecords(raw, ddragonVersion);

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
    items: { ddragonVersion, cdragonVersion, itemData: { title: items.page.title, revid: items.page.revid }, rules: items.rules.map(({ title, revid }) => ({ title, revid })), fetchedAt: items.fetchedAt },
    spells: spellSources(ddragonVersion, spells),
    runeRecords: runeRecordSources(ddragonVersion, runeRecords),
  };
  const out = datasetDir(dataset);
  await writeJson(path.join(out, "manifest.json"), manifest);

  const revisions = Object.fromEntries(
    [
      [WIKI_LEVEL20_PAGE, level20.revid] as const,
      ...[championData, ...templates.pages, ...glossary.pages, ...pets.pages, ...runes.pages, items.page, ...items.rules, spells.data, ...spells.articles, ...runeRecords.templates, ...runeRecords.articles, ...runeRecords.rules].map((page) => [page.title, page.revid] as const),
    ].sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeJson(path.join(out, "wiki-revisions.json"), revisions);
  log(`Done. Raw files in ${path.relative(process.cwd(), raw)}, provenance in ${path.relative(process.cwd(), out)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
