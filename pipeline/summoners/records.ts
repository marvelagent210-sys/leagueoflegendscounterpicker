/**
 * Summoner spell records (M8's loadouts): the spells Summoner's Rift offers, from Data Dragon's
 * summoner list, read from the wiki's spell data module and each spell's article, and checked
 * against Data Dragon. The spell effects (summoners/) read them.
 */
import type { Series } from "../../engine/abilities";
import { descriptionValues } from "../abilities/build";
import type { ChampionLookup } from "../abilities/championLookup";
import { renderMarked } from "../abilities/marked";
import { type RulePage, rulePage } from "../items/records";
import { type LuaTable, type LuaValue, parseLuaModule } from "../parse/lua";
import type { DDragonSummoners } from "../sources/ddragon";
import type { WikiPage } from "../sources/wiki";
import { cleanText, createContext, type EvalContext, render } from "../wikitext/evaluate";
import { parseWikitext, preprocess } from "../wikitext/parse";

export interface SpellRecord {
  /** The name on the wiki and in Data Dragon, e.g. "Ignite". */
  name: string;
  /** Data Dragon's ID, e.g. "SummonerDot". */
  id: string;
  /** In seconds; for a spell with charges, the time between two casts. */
  cooldown: number;
  /** A spell that holds charges (Smite): how many, and the seconds each takes to come back. */
  charges?: { count: number; recharge: number };
  /** As the wiki writes it: "Self", "650", "400 (Quick cast)", "Global". */
  range: string;
  /** The effect as the wiki shows it, values included; each further paragraph on a line of its own. */
  text: string;
  /** The effect's wikitext, paragraph by paragraph on lines of their own. */
  wikitext: string;
  /** Numbers the effect writes as value templates, each with its sentence: by level, or by another variable. */
  values: Array<{ series: Series; context: string }>;
  /** The article's notes as the wiki shows them, one bullet a line; a nested bullet is indented two spaces a level. */
  notes: string[];
  /** The values the notes write as value templates (Ignite's damage per tick). */
  noteValues: Array<{ series: Series; context: string }>;
  article: { title: string; revid: number };
  /** Data Dragon's cooldown, range and description, which the catalog's checks compare with the wiki's. */
  ddragon: { cooldown: number; range: number; description: string };
}

export interface SpellCatalog {
  dataset: string;
  patch: string;
  sources: { ddragon: string; spellData: { title: string; revid: number } };
  spells: SpellRecord[];
  /** The wiki's rule pages the spell effects quote (SPELL_RULE_PAGES): which crowd control stops them, what they get past. */
  rulePages: RulePage[];
  /** Data Dragon's cooldowns and numeric ranges compared with the wiki's, and every difference found. */
  checks: { compared: number; differences: string[] };
}

export interface SpellSources {
  dataset: string;
  patch: string;
  ddragon: DDragonSummoners;
  spellData: WikiPage;
  /** Each spell's article, titled by its name. */
  articles: WikiPage[];
  /** The glossary pages (data/raw/<dataset>/wiki/glossary.json), which hold SPELL_RULE_PAGES. */
  glossary: WikiPage[];
  championData: ChampionLookup;
}

/**
 * Glossary pages (WIKI_GLOSSARY_PAGES) whose rules the spell effects follow: which crowd control
 * stops summoner spells, that spell shields don't block them, which of them break stealth, and
 * that their damage is the wiki's "Item" damage rather than a champion's.
 */
export const SPELL_RULE_PAGES = ["Template:Tip data/Cast-inhibiting crowd control", "Template:Tip data/Spell shield", "Stealth", "Damage"];

/**
 * The wiki's summoner spell data (cooldowns, ranges, effects), read with each spell's article.
 * Kept out of pipeline/config.ts, which every fight's code imports (pipeline/sim/pairKeys.ts).
 */
export const WIKI_SPELL_DATA_PAGE = "Module:SpellData/data";

/** The game mode of Summoner's Rift in Data Dragon's summoner list. */
const CLASSIC = "CLASSIC";
/** An effect's paragraphs: "effect", then "effect2", "effect3", ... */
const PARAGRAPH = /^effect(\d*)$/;

const isTable = (value: LuaValue | undefined): value is LuaTable => typeof value === "object" && value !== null && !Array.isArray(value);

/** Wikitext as the wiki shows it, on one line (as item effects read it, pipeline/items/records.ts). */
function shown(wikitext: string, ctx: EvalContext): string {
  return cleanText(render(parseWikitext(preprocess(wikitext)), ctx)).replace(/\s+/g, " ").trim();
}

/** The value templates of a text, with their sentences, read like an ability's description. */
function valuesOf(wikitext: string, ctx: EvalContext): SpellRecord["values"] {
  return descriptionValues(renderMarked(parseWikitext(preprocess(wikitext)), ctx)).map(({ series, context }) => ({ series, context: context.replace(/\s+/g, " ").trim() }));
}

/** The spells Summoner's Rift offers, by name. */
export function classicSpells(ddragon: DDragonSummoners): Array<DDragonSummoners["data"][string]> {
  return Object.values(ddragon.data)
    .filter((spell) => spell.modes.includes(CLASSIC))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** A number field of the module, which writes numbers as strings ("180"). */
function numberField(entry: LuaTable, key: string, name: string): number {
  const value = Number(entry[key]);
  if (typeof entry[key] !== "string" && typeof entry[key] !== "number") throw new Error(`${name}: the spell data has no ${key}`);
  if (!Number.isFinite(value)) throw new Error(`${name}: ${key} is ${JSON.stringify(entry[key])}, not a number`);
  return value;
}

/**
 * The bullets of an article's "== Notes ==" section as the wiki shows them. The section is
 * rendered whole, since a template can span several bullets.
 */
export function articleNotes(article: string, ctx: EvalContext): { notes: string[]; values: SpellRecord["noteValues"] } {
  const section = /^==\s*Notes\s*==\s*$([\s\S]*?)(?=^==[^=]|(?![\s\S]))/m.exec(article)?.[1] ?? "";
  const notes: string[] = [];
  for (const line of render(parseWikitext(preprocess(section)), ctx).split("\n")) {
    const bullet = /^(\*+)\s*(.*)$/.exec(line.trim());
    if (!bullet?.[2]) continue;
    const text = cleanText(bullet[2]).replace(/\s+/g, " ").trim();
    if (text) notes.push(`${"  ".repeat(bullet[1]!.length - 1)}${text}`);
  }
  const values = valuesOf(section, ctx).map(({ series, context }) => ({ series, context: context.replace(/^\*+\s*/, "") }));
  return { notes, values };
}

/**
 * The shared evaluator shows {{ccib|icon|link|text}} as its icon alone; a spell's effect
 * names a kind of debuff with it ("summoner spell debuffs"), so it reads like {{cci}}: its text.
 */
const iconText = (wikitext: string) => wikitext.replace(/\{\{\s*ccib\s*\|/gi, "{{cci|");

export function buildSpellCatalog(sources: SpellSources): SpellCatalog {
  const ctx = createContext(sources.championData);
  const module = parseLuaModule(sources.spellData.content);
  if (!isTable(module)) throw new Error(`${sources.spellData.title} should return a table`);
  const differences: string[] = [];
  let compared = 0;
  const spells = classicSpells(sources.ddragon).map((spell): SpellRecord => {
    const entry = module[spell.name];
    if (!isTable(entry)) throw new Error(`${spell.name} (${spell.id}) has no entry in ${sources.spellData.title}`);
    if (!isTable(entry.maps) || entry.maps.sr !== true) throw new Error(`${spell.name}: ${sources.spellData.title} doesn't list it on Summoner's Rift`);
    const article = sources.articles.find((page) => page.title === spell.name);
    if (!article) throw new Error(`${spell.name} has no article in the downloads`);
    const paragraphs = Object.entries(entry)
      .flatMap(([key, value]) => {
        const match = PARAGRAPH.exec(key);
        return match && typeof value === "string" ? [[Number(match[1] || 1), value] as const] : [];
      })
      .sort(([a], [b]) => a - b)
      .map(([, value]) => value);
    if (paragraphs.length === 0) throw new Error(`${spell.name}: the spell data has no effect`);
    const cooldown = numberField(entry, "cooldown", spell.name);
    const charges = entry.charges === undefined ? undefined : { count: numberField(entry, "charges", spell.name), recharge: numberField(entry, "recharge", spell.name) };
    const range = shown(String(entry.range ?? ""), ctx);
    const ddragon = { cooldown: spell.cooldown[0] ?? Number.NaN, range: spell.range[0] ?? Number.NaN, description: spell.description };
    compared++;
    if (ddragon.cooldown !== cooldown) differences.push(`${spell.name}: the cooldown is ${cooldown} seconds on the wiki, ${ddragon.cooldown} in Data Dragon`);
    // Data Dragon gives every spell a number; the wiki writes "Self" or "Global" for most of the ones without a target.
    const wikiRange = /^\d+/.exec(range)?.[0];
    if (wikiRange !== undefined) {
      compared++;
      if (Number(wikiRange) !== ddragon.range) differences.push(`${spell.name}: the range is ${wikiRange} on the wiki, ${ddragon.range} in Data Dragon`);
    }
    const notes = articleNotes(iconText(article.content), ctx);
    return {
      name: spell.name,
      id: spell.id,
      cooldown,
      ...(charges ? { charges } : {}),
      range,
      text: paragraphs.map((paragraph) => shown(iconText(paragraph), ctx)).join("\n"),
      wikitext: paragraphs.join("\n"),
      values: paragraphs.flatMap((paragraph) => valuesOf(iconText(paragraph), ctx)),
      notes: notes.notes,
      noteValues: notes.values,
      article: { title: article.title, revid: article.revid },
      ddragon,
    };
  });
  const rulePages = SPELL_RULE_PAGES.map((title) => {
    const page = sources.glossary.find((candidate) => candidate.title === title);
    if (!page) throw new Error(`The glossary downloads lack ${title}; run npm run fetch -- --only glossary`);
    return rulePage({ ...page, content: iconText(page.content) }, ctx);
  });
  return {
    dataset: sources.dataset,
    patch: sources.patch,
    sources: { ddragon: sources.ddragon.version, spellData: { title: sources.spellData.title, revid: sources.spellData.revid } },
    spells,
    rulePages,
    checks: { compared, differences },
  };
}
