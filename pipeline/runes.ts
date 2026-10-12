/**
 * Runes the simulator models (PLAN §4.1: Udyr's Triple Tonic), from the rune's data template,
 * the data modules of the items it grants, and its article's patch history.
 */
import type { RuneRecord } from "../engine/abilities";
import type { ChampionLookup } from "./abilities/championLookup";
import type { WikiPage } from "./sources/wiki";
import { cleanText, createContext, type EvalContext, render, templateName } from "./wikitext/evaluate";
import { type TemplateNode, type WikiNode, parseWikitext, preprocess } from "./wikitext/parse";

const RUNE_DATA_PREFIX = "Template:Rune data ";
const ITEM_DATA_PREFIX = "Module:ItemData/data/";

function templates(nodes: WikiNode[]): TemplateNode[] {
  const found: TemplateNode[] = [];
  for (const node of nodes) {
    if (node.type !== "template") continue;
    found.push(node);
    for (const arg of node.args) found.push(...templates(arg.value));
  }
  return found;
}

function shown(source: string, ctx: EvalContext): string {
  return cleanText(render(parseWikitext(preprocess(source)), ctx)).trim();
}

/** A string field of a Lua data module: `["consume"] = "..."`. */
function luaString(source: string, key: string): string | undefined {
  const match = new RegExp(`\\["${key}"\\]\\s*=\\s*"((?:[^"\\\\]|\\\\.)*)"`).exec(source);
  return match?.[1]?.replace(/\\"/g, '"');
}

/** The patch history section's changes, newest first: ";[[V26.03]]" headings and their "*" lines. */
function patchHistory(article: string, ctx: EvalContext): RuneRecord["history"] {
  const start = article.indexOf("== Patch History ==");
  if (start < 0) return [];
  const section = article.slice(start).split(/\n==[^=]/)[0] ?? "";
  // The changes sit in a {{Scroll box|content=...}}.
  const box = templates(parseWikitext(preprocess(section))).find((node) => templateName(node, ctx) === "scroll box");
  const content = box?.args.find((arg) => arg.name?.trim() === "content");
  const lines = content ? render(content.value, ctx).split("\n") : section.split("\n");
  const history: RuneRecord["history"] = [];
  let patch = "";
  for (const line of lines) {
    const heading = /^;\s*(?:\[\[)?(V[\d.]+)/.exec(line.trim());
    if (heading?.[1]) {
      patch = heading[1];
      continue;
    }
    const change = /^\*+\s*(.+)$/.exec(line.trim());
    if (patch && change?.[1]) history.push({ patch, text: cleanText(change[1]).trim() });
  }
  return history;
}

export function parseRunes(pages: WikiPage[], championData: ChampionLookup): RuneRecord[] {
  const ctx = createContext(championData);
  const runes: RuneRecord[] = [];
  for (const page of pages.filter((p) => p.title.startsWith(RUNE_DATA_PREFIX))) {
    const name = page.title.slice(RUNE_DATA_PREFIX.length);
    const data = templates(parseWikitext(preprocess(page.content)))[0];
    const field = (key: string) => data?.args.find((arg) => arg.name?.trim() === key);
    const text = ["description", "description2"].flatMap((key) => {
      const arg = field(key);
      return arg ? cleanText(render(arg.value, ctx)).split("\n").map((line) => line.replace(/^\*\s*/, "").trim()).filter(Boolean) : [];
    });
    if (text.length === 0) throw new Error(`${page.title}: no description`);
    // The items it grants: every item named in the description that has a data module here.
    const items = pages
      .filter((p) => p.title.startsWith(ITEM_DATA_PREFIX) && page.content.includes(p.title.slice(ITEM_DATA_PREFIX.length)))
      .map((p) => {
        const consume = luaString(p.content, "consume");
        if (consume === undefined) throw new Error(`${p.title}: no consume effect`);
        return { name: luaString(p.content, "name") ?? p.title.slice(ITEM_DATA_PREFIX.length), page: { title: p.title, revid: p.revid }, consume: shown(consume, ctx) };
      });
    const article = pages.find((p) => p.title === name);
    runes.push({
      name,
      page: { title: page.title, revid: page.revid },
      text,
      items,
      history: article ? patchHistory(article.content, ctx) : [],
      ...(article ? { article: { title: article.title, revid: article.revid } } : {}),
    });
  }
  return runes;
}
