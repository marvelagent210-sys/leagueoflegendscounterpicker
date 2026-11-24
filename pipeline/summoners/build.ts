/**
 * Builds the summoner spell catalog (M8's loadouts) from the raw downloads in data/raw/<dataset>/:
 *   data/<dataset>/summoners.json        the spells Summoner's Rift offers: cooldowns, ranges, effects, notes
 *   data/<dataset>/reports/summoners.md  the same as a readable page, with the Data Dragon cross-check
 *
 * Like the item catalog it runs on its own: after npm run fetch, run npm run build:summoners.
 *
 * Usage: npm run build:summoners [-- --dataset 16.21]
 */
import path from "node:path";
import { championLookup } from "../abilities/championLookup";
import { RAW_DIR, datasetDir, rawDir } from "../config";
import { latestDataset } from "../datasets";
import { readJson, readText, writeJson, writeText } from "../lib/files";
import type { Manifest } from "../manifest";
import type { DDragonSummoners } from "../sources/ddragon";
import type { WikiPage } from "../sources/wiki";
import { buildSpellCatalog } from "./records";
import { summonersReport } from "./report";

function argValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main(): Promise<void> {
  const dataset = argValue("--dataset") ?? (await latestDataset(RAW_DIR, "ddragon"));
  const raw = rawDir(dataset);
  const out = datasetDir(dataset);
  const manifest = await readJson<Manifest>(path.join(out, "manifest.json"));
  const sources = manifest.spells;
  if (!sources) throw new Error("The manifest records no summoner spell sources; run npm run fetch -- --only spells");
  const missing = () => {
    throw new Error("Missing the summoner spell sources; run npm run fetch -- --only spells");
  };
  const [ddragon, pages, glossary, championData] = await Promise.all([
    readJson<DDragonSummoners>(path.join(raw, "ddragon", "summoner.json")).catch(missing),
    readJson<WikiPage[]>(path.join(raw, "wiki", "spell-pages.json")).catch(missing),
    readJson<WikiPage[]>(path.join(raw, "wiki", "glossary.json")).catch(() => {
      throw new Error("Missing the glossary pages; run npm run fetch -- --only glossary");
    }),
    readText(path.join(raw, "wiki", "ChampionData.lua")),
  ]);
  const pinned = (title: string, revid: number) => {
    const page = pages.find((candidate) => candidate.title === title);
    if (!page || page.revid !== revid) throw new Error(`The summoner spell downloads lack ${title} revision ${revid}; run npm run fetch -- --only spells`);
    return page;
  };
  const catalog = buildSpellCatalog({
    dataset,
    patch: manifest.patch,
    ddragon,
    spellData: pinned(sources.spellData.title, sources.spellData.revid),
    articles: sources.articles.map(({ title, revid }) => pinned(title, revid)),
    glossary,
    championData: championLookup(championData),
  });
  await writeJson(path.join(out, "summoners.json"), catalog);
  await writeText(path.join(out, "reports", "summoners.md"), summonersReport(catalog));
  console.log(`[summoners] ${catalog.spells.length} spells (${catalog.spells.map((spell) => spell.name).join(", ")}); ${catalog.checks.compared} values checked against Data Dragon, ${catalog.checks.differences.length} differences (see summoners.json and reports/summoners.md)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
