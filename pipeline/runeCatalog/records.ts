/**
 * The rune catalog (M8's loadouts): every rune Summoner's Rift offers, from Data Dragon's rune
 * list, read from each rune's wiki data template and article; the stat shards from the wiki's
 * Rune article, named and checked against the client's perk data from CommunityDragon; and the
 * rules of a rune page and of adaptive force, from the wiki. The rune effects (runes/) read them.
 */
import type { Series } from "../../engine/abilities";
import { numbersIn } from "../../engine/kits/context";
import { descriptionValues } from "../abilities/build";
import type { ChampionLookup } from "../abilities/championLookup";
import { renderMarked } from "../abilities/marked";
import { type RulePage, rulePage, spellOutRanged } from "../items/records";
import type { DDragonRunePath } from "../sources/ddragon";
import type { WikiPage } from "../sources/wiki";
import { articleNotes, iconText } from "../summoners/records";
import { cleanText, createContext, type EvalContext, render } from "../wikitext/evaluate";
import { parseWikitext, preprocess } from "../wikitext/parse";

/** Each rune's data template: "Template:Rune data Conqueror". */
export const WIKI_RUNE_DATA_PREFIX = "Template:Rune data ";
/**
 * The wiki pages rune effects follow: what a rune page holds, its shards and the runes a
 * champion gets in place of others (Rune); what adaptive force gives (Adaptive force, and the
 * template the rune data writes it with); and what adaptive damage deals.
 */
export const WIKI_RUNE_RULE_PAGES = ["Rune", "Adaptive force", "Template:Adaptive", "Template:Tip data/Adaptive damage"];

export interface RuneEntry {
  /** The wiki's name ("Jack of All Trades"); Data Dragon's may differ in case. */
  name: string;
  /** Data Dragon's perk ID. */
  id: number;
  path: string;
  /** 0 for the keystone row, 1 to 3 for the lesser rows (the wiki's slots 1 to 3). */
  row: number;
  /** The description as the wiki shows it, values included; each further paragraph on a line of its own. */
  text: string;
  /** The description's wikitext, paragraph by paragraph on lines of their own. */
  wikitext: string;
  /** Numbers the description writes as value templates, each with its sentence. */
  values: Array<{ series: Series; context: string }>;
  /** As the template writes them, when it does. */
  cooldown?: string;
  range?: string;
  /** The article's notes as the wiki shows them, one bullet a line; a nested bullet is indented two spaces a level. */
  notes: string[];
  noteValues: Array<{ series: Series; context: string }>;
  template: { title: string; revid: number };
  article: { title: string; revid: number };
}

export interface RunePath {
  name: string;
  id: number;
  /** Rune names by row: the keystones first. */
  rows: string[][];
}

/** A stat shard choice: the client's name for it, and the wiki's text. */
export interface ShardOption {
  /** CommunityDragon's perk ID and name ("Adaptive Force"). */
  id: number;
  name: string;
  /** As the wiki's shard table shows it. */
  text: string;
  wikitext: string;
  values: Array<{ series: Series; context: string }>;
}

export interface ShardSlot {
  /** "Offense", "Flex", "Defense". */
  slot: string;
  options: ShardOption[];
}

export interface RuneCatalog {
  dataset: string;
  patch: string;
  sources: { ddragon: string; cdragon: string };
  paths: RunePath[];
  runes: RuneEntry[];
  shards: ShardSlot[];
  /** The runes a champion gets in place of others, as the wiki's Rune article lists them. */
  substitutions: string[];
  /** The wiki pages rune effects quote (WIKI_RUNE_RULE_PAGES). */
  rulePages: RulePage[];
  /** The wiki's shard values against the client's, and where each template's path and row differ from Data Dragon's. */
  checks: { compared: number; differences: string[] };
}

/** CommunityDragon's perk data: a perk's ID, name and short description. */
export interface ClientPerk {
  id: number;
  name: string;
  shortDesc: string;
}

/** CommunityDragon's rune paths, of which only the stat shard slots are read. */
export interface ClientPerkStyles {
  styles: Array<{ slots: Array<{ type: string; slotLabel: string; perks: number[] }> }>;
}

export interface RuneSources {
  dataset: string;
  patch: string;
  ddragonVersion: string;
  ddragon: DDragonRunePath[];
  cdragonVersion: string;
  perks: ClientPerk[];
  perkStyles: ClientPerkStyles;
  /** Each rune's data template and article, and WIKI_RUNE_RULE_PAGES. */
  pages: WikiPage[];
  championData: ChampionLookup;
}

/** Every rune Summoner's Rift offers, by path and row, as Data Dragon lists them. */
export function currentRunes(paths: readonly DDragonRunePath[]): Array<{ name: string; id: number; path: string; row: number }> {
  return paths.flatMap((path) => path.slots.flatMap((slot, row) => slot.runes.map((rune) => ({ name: rune.name, id: rune.id, path: path.name, row }))));
}

/** A rune's wiki page among `pages` (its data template with the prefix, or its article without), case aside. */
export function runePage(pages: readonly WikiPage[], name: string, prefix = ""): WikiPage | undefined {
  return pages.find((page) => page.title.startsWith(prefix) && page.title.slice(prefix.length).toLowerCase() === name.toLowerCase());
}

// ---------------------------------------------------------------------------------------
// Template calls in wikitext

/** The index just past the "}}" closing the call that opens at `start`. */
function callEnd(text: string, start: number): number {
  let depth = 0;
  for (let i = start; i < text.length - 1; i++) {
    if (text.startsWith("{{", i)) {
      depth++;
      i++;
    } else if (text.startsWith("}}", i)) {
      depth--;
      i++;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error(`Unclosed template in: ${text.slice(start, start + 60)}`);
}

/** A call's arguments: its inner text split at the pipes outside nested calls and links. */
function callArgs(inner: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < inner.length; i++) {
    const pair = inner.slice(i, i + 2);
    if (pair === "{{" || pair === "[[") {
      depth++;
      current += pair;
      i++;
    } else if (pair === "}}" || pair === "]]") {
      depth--;
      current += pair;
      i++;
    } else if (inner[i] === "|" && depth === 0) {
      args.push(current);
      current = "";
    } else current += inner[i];
  }
  args.push(current);
  return args;
}

/** The wikitext with each call of the template `name` (case aside) replaced by `replace(args)`. */
function rewriteCalls(wikitext: string, name: string, replace: (args: string[]) => string): string {
  const opening = new RegExp(`\\{\\{\\s*${name.replace(/[/]/g, "\\/")}\\s*(?=[|}])`, "i");
  let out = "";
  let rest = wikitext;
  for (;;) {
    const match = opening.exec(rest);
    if (!match) return out + rest;
    const end = callEnd(rest, match.index);
    out += rest.slice(0, match.index) + replace(callArgs(rest.slice(match.index + 2, end - 2)).slice(1).map((arg) => arg.trim()));
    rest = rest.slice(end);
  }
}

/** The adaptive force ratio of attack damage (Template:Adaptive's af outside Wild Rift). */
const ADAPTIVE_AD = 0.6;

/**
 * {{adaptive|amount|levels}} as Template:Adaptive writes it: so much bonus attack damage or
 * ability power, a progression over the levels when the amount is a formula of x. The shared
 * evaluator doesn't know the template, so rune text spells it out first.
 */
export function spellOutAdaptive(wikitext: string): string {
  return rewriteCalls(wikitext, "adaptive", (args) => {
    const [amount = "0", levels] = args.filter((arg) => !/^\w+\s*=/.test(arg));
    if (/\bto\b/.test(amount)) throw new Error(`{{adaptive|${amount}}}: ranges with "to" aren't read`);
    const span = levels ? ` for ${levels}` : "";
    return /x/.test(amount)
      ? `{{as|{{pp|(${amount})*${ADAPTIVE_AD}${span}}} '''bonus''' attack damage}} or {{as|{{pp|${amount}${span}}} ability power}} (adaptive)`
      : `{{as|${Math.round(Number(amount) * ADAPTIVE_AD * 100) / 100} '''bonus''' attack damage}} or {{as|${amount} ability power}} (adaptive)`;
  });
}

/** What rune text writes that the shared evaluator doesn't show: {{Unique|name|text}}, and tip data transcluded whole. */
function runeWikitext(wikitext: string): string {
  const unique = rewriteCalls(wikitext, "unique", ([name = "", text = ""]) => `${name}: ${text}`);
  const tips = rewriteCalls(unique, "tip data/[^|}]+", () => "");
  return iconText(spellOutAdaptive(spellOutRanged(tips)));
}

function shown(wikitext: string, ctx: EvalContext): string {
  return cleanText(render(parseWikitext(preprocess(runeWikitext(wikitext))), ctx)).replace(/\s+/g, " ").trim();
}

function valuesOf(wikitext: string, ctx: EvalContext): RuneEntry["values"] {
  return descriptionValues(renderMarked(parseWikitext(preprocess(runeWikitext(wikitext))), ctx)).map(({ series, context }) => ({ series, context: context.replace(/\s+/g, " ").trim() }));
}

/**
 * A data template's fields by name, as wikitext: each "|name = value" at the data call's
 * level, the value running to the next such field or the call's end. `prelude` is what comes
 * before the call: variables its fields read ({{#vardefine:cdb|270}}, Unsealed Spellbook's).
 */
export function templateFields(source: string): { fields: Map<string, string>; prelude: string } {
  const text = preprocess(source);
  // The data call: "{{{{{1}}}|Conqueror|..." once preprocessed.
  const start = text.indexOf("{{{{{1}}}");
  if (start < 0) throw new Error(`No data call in: ${text.slice(0, 80)}`);
  const fields = new Map<string, string>();
  let depth = 0;
  let current: { name: string; start: number } | undefined;
  const close = (end: number) => {
    if (current) fields.set(current.name, text.slice(current.start, end).trim());
  };
  for (let i = start; i < text.length; i++) {
    if (text.startsWith("{{", i)) {
      depth++;
      i++;
      continue;
    }
    if (text.startsWith("}}", i)) {
      depth--;
      if (depth === 0) {
        close(i);
        return { fields, prelude: text.slice(0, start) };
      }
      i++;
      continue;
    }
    if (depth === 1 && text[i] === "\n" && text[i + 1] === "|") {
      const field = /^\|\s*([\w ]+?)\s*=/.exec(text.slice(i + 1));
      if (!field) continue;
      close(i);
      current = { name: field[1]!, start: i + 1 + field[0].length };
    }
  }
  throw new Error(`Unclosed data call in: ${text.slice(start, start + 80)}`);
}

/** The rows of the Rune article's shard table: each slot's name, and its options' wikitext. */
function shardTable(article: string): Array<{ slot: string; options: string[] }> {
  const section = /^===\s*Shards\s*===\s*$([\s\S]*?)^\|\}/m.exec(article)?.[1];
  if (!section) throw new Error("The Rune article has no shard table");
  return section
    .split(/^\|-.*$/m)
    .slice(1)
    .map((row) => {
      const lines = row.split("\n").map((line) => line.trim()).filter(Boolean);
      const slot = /\{\{sbc\|([^}]+)\}\}/i.exec(lines.find((line) => line.startsWith("!")) ?? "")?.[1];
      if (!slot) throw new Error(`A shard row without a slot name: ${row.slice(0, 80)}`);
      const options = lines.filter((line) => line.startsWith("|")).map((line) => line.replace(/^\|\s*/, "").replace(/^\[\[File:[^\]]*\]\]\s*<br\s*\/?>/i, "").trim());
      return { slot, options };
    });
}

/** The bullets of the Rune article's substitutions, as the wiki shows them. */
function substitutions(article: string, ctx: EvalContext): string[] {
  const section = /^===\s*Substitutions\s*===\s*$([\s\S]*?)(?=^==)/m.exec(article)?.[1] ?? "";
  return render(parseWikitext(preprocess(section)), ctx)
    .split("\n")
    .map((line) => /^(\*+)\s*(.*)$/.exec(line.trim()))
    .filter((match): match is RegExpExecArray => match?.[2] !== undefined && match[2].length > 0)
    .map((match) => `${"  ".repeat(match[1]!.length - 1)}${cleanText(match[2]!).replace(/\s+/g, " ").trim()}`);
}

const SLOT_OF_ROW = ["Keystone", "1", "2", "3"];

export function buildRuneCatalog(sources: RuneSources): RuneCatalog {
  const ctx = createContext(sources.championData);
  const differences: string[] = [];
  let compared = 0;
  const runes = currentRunes(sources.ddragon).map(({ name: ddragonName, id, path, row }): RuneEntry => {
    const template = runePage(sources.pages, ddragonName, WIKI_RUNE_DATA_PREFIX);
    if (!template) throw new Error(`${ddragonName} has no data template (${WIKI_RUNE_DATA_PREFIX}${ddragonName})`);
    const name = template.title.slice(WIKI_RUNE_DATA_PREFIX.length);
    const article = runePage(sources.pages, name);
    if (!article) throw new Error(`${name} has no article in the downloads`);
    const { fields, prelude } = templateFields(template.content);
    // Each field reads the variables its template sets before the data call.
    const show = (wikitext: string) => shown(prelude + wikitext, ctx);
    if (fields.get("removed") === "true") throw new Error(`${template.title} says the rune was removed, but Data Dragon lists it`);
    compared++;
    if (fields.get("path") !== path) differences.push(`${name}: the wiki's path is ${fields.get("path") ?? "missing"}, Data Dragon's ${path}`);
    if (fields.get("slot") !== SLOT_OF_ROW[row]) differences.push(`${name}: the wiki's slot is ${fields.get("slot") ?? "missing"}, Data Dragon's row ${row} (${SLOT_OF_ROW[row]})`);
    const paragraphs = [...fields]
      .flatMap(([key, value]) => {
        const match = /^description(\d*)$/.exec(key);
        return match && value ? [[Number(match[1] || 1), value] as const] : [];
      })
      .sort(([a], [b]) => a - b)
      .map(([, value]) => value)
      .filter((paragraph) => show(paragraph).length > 0);
    if (paragraphs.length === 0) throw new Error(`${template.title}: no description`);
    const notes = articleNotes(iconText(article.content), ctx);
    const cooldown = fields.get("cooldown");
    const range = fields.get("range");
    return {
      name,
      id,
      path,
      row,
      text: paragraphs.map(show).join("\n"),
      wikitext: paragraphs.join("\n"),
      values: paragraphs.flatMap((paragraph) => valuesOf(prelude + paragraph, ctx)),
      ...(cooldown && show(cooldown) ? { cooldown: show(cooldown) } : {}),
      ...(range && show(range) ? { range: show(range) } : {}),
      notes: notes.notes,
      noteValues: notes.values,
      template: { title: template.title, revid: template.revid },
      article: { title: article.title, revid: article.revid },
    };
  });
  const runeArticle = sources.pages.find((page) => page.title === "Rune");
  if (!runeArticle) throw new Error("The rune downloads lack the Rune article");
  // The client's shard slots, in order, against the wiki's table.
  const clientSlots = sources.perkStyles.styles[0]?.slots.filter((slot) => slot.type === "kStatMod") ?? [];
  const table = shardTable(runeArticle.content);
  if (clientSlots.length !== table.length) throw new Error(`The wiki's shard table has ${table.length} slots, the client's perk data ${clientSlots.length}`);
  const shards = table.map(({ slot, options }, index): ShardSlot => {
    const client = clientSlots[index]!;
    if (client.slotLabel !== slot) differences.push(`Shard slot ${index + 1}: the wiki calls it ${slot}, the client ${client.slotLabel}`);
    if (client.perks.length !== options.length) throw new Error(`Shard slot ${slot}: ${options.length} options on the wiki, ${client.perks.length} in the client's perk data`);
    return {
      slot,
      options: options.map((wikitext, i): ShardOption => {
        const perk = sources.perks.find((candidate) => candidate.id === client.perks[i]);
        if (!perk) throw new Error(`Shard slot ${slot}: perk ${client.perks[i]} is missing from the client's perk data`);
        const text = shown(wikitext, ctx);
        const values = valuesOf(wikitext, ctx);
        // Every number the client gives ("+10-180 Health (based on level)") must be one the wiki gives.
        const clientText = perk.shortDesc.replace(/<[^>]+>/g, "").trim();
        const wikiNumbers = new Set([...numbersIn(text), ...values.flatMap(({ series }) => (series.kind === "constant" ? [series.value] : series.values.filter((v): v is number => typeof v === "number")))]);
        compared++;
        if (!numbersIn(clientText).every((n) => wikiNumbers.has(Math.abs(n)))) differences.push(`Shard ${perk.name} (${slot}): the wiki says "${text}", the client "${clientText}"`);
        return { id: perk.id, name: perk.name, text, wikitext, values };
      }),
    };
  });
  const rulePages = WIKI_RUNE_RULE_PAGES.map((title) => {
    const page = sources.pages.find((candidate) => candidate.title === title);
    if (!page) throw new Error(`The rune downloads lack ${title}`);
    return rulePage({ ...page, content: iconText(page.content) }, ctx);
  });
  return {
    dataset: sources.dataset,
    patch: sources.patch,
    sources: { ddragon: sources.ddragonVersion, cdragon: sources.cdragonVersion },
    paths: sources.ddragon.map((path) => ({ name: path.name, id: path.id, rows: path.slots.map((slot) => slot.runes.map((rune) => runePage(sources.pages, rune.name, WIKI_RUNE_DATA_PREFIX)?.title.slice(WIKI_RUNE_DATA_PREFIX.length) ?? rune.name)) })),
    runes,
    shards,
    substitutions: substitutions(runeArticle.content, ctx),
    rulePages,
    checks: { compared, differences },
  };
}
