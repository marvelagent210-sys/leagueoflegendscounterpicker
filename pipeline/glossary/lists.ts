/**
 * Reads the bulleted lists of the wiki's glossary pages ("Dash", "Untargetability", ...):
 * each item's ability mentions ({{cai|Ability|Champion}}), the qualifier written after
 * each one ("(second cast)"), footnotes ({{tt|*|...}}) and the headings above the item.
 */
import { parseWikitext, preprocess, type WikiNode } from "../wikitext/parse";

export interface AbilityMention {
  /** The ability's page name ("Steadfast Presence") or slot ("Q", "I"). */
  ability: string;
  /** The champion's wiki name, e.g. "Renata Glasc". */
  champion: string;
  /** Text after the mention up to the next one, e.g. "(second cast)". */
  qualifier: string;
  /** Footnotes on the mention, e.g. "Does not destroy inbound projectiles". */
  note: string;
}

export interface ListItem {
  /** Headings, definition labels and parent bullets above the item, outermost first. */
  path: string[];
  mentions: AbilityMention[];
}

const MENTION_TEMPLATES = new Set(["cai", "ai", "cais", "ais"]);

function argText(nodes: WikiNode[] | undefined): string {
  return nodes ? plainText(nodes).trim() : "";
}

/** Visible text of wikitext, for headings and qualifiers. */
export function plainText(nodes: WikiNode[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.type === "text") out += node.value;
    else if (node.type === "link") {
      const target = plainText(node.target).trim();
      if (/^(?:file|image|category):/i.test(target)) continue;
      out += node.text ? plainText(node.text) : target;
    } else if (node.type === "template") {
      const name = plainText(node.name).trim().toLowerCase();
      const positional = node.args.filter((arg) => arg.name === undefined);
      const arg = (i: number) => argText(positional[i]?.value);
      if (name === "tip" || name === "sti" || name === "stil" || name === "ci" || name === "cis") out += arg(1) || arg(0);
      else if (MENTION_TEMPLATES.has(name)) out += arg(2) || arg(0);
      else if (name === "sbc" || name === "as" || name === "tt" || name === "color") out += name === "color" ? arg(1) : arg(0);
      else if (name === "ii" || name === "si" || name === "ri" || name === "ui" || name === "bi") out += arg(0);
      // Other templates (anchors, icons, layout) have no text worth keeping.
    }
  }
  return out;
}

function clean(text: string): string {
  return text.replace(/'{2,}/g, "").replace(/\s+/g, " ").trim();
}

/**
 * The qualifier of a mention: the text up to the next mention, without the joining words
 * between mentions ("and", ","), cut at the end of its sentence.
 */
function qualifierOf(text: string): string {
  const trimmed = clean(text).replace(/^(?:,\s*)?(?:and\b|,)?\s*/, "");
  const sentence = /^(?:\([^)]*\)|[^.;])*/.exec(trimmed)?.[0] ?? trimmed;
  return sentence.replace(/\s*(?:,|and|,\s*and)$/, "").trim();
}

/** Mentions in one list item, each with the text and footnotes that follow it. */
function mentionsOf(nodes: WikiNode[]): AbilityMention[] {
  const mentions: AbilityMention[] = [];
  let current: AbilityMention | undefined;
  for (const node of nodes) {
    if (node.type === "template") {
      const name = plainText(node.name).trim().toLowerCase();
      const positional = node.args.filter((arg) => arg.name === undefined);
      if (MENTION_TEMPLATES.has(name)) {
        current = { ability: argText(positional[0]?.value), champion: argText(positional[1]?.value), qualifier: "", note: "" };
        mentions.push(current);
        continue;
      }
      if (name === "tt" && current) {
        current.note = clean(`${current.note} ${argText(positional[1]?.value)}`);
        continue;
      }
    }
    if (current) current.qualifier += plainText([node]);
  }
  for (const mention of mentions) mention.qualifier = qualifierOf(mention.qualifier);
  return mentions.filter((mention) => mention.ability !== "" && mention.champion !== "");
}

/** Every bulleted item of a page with the headings above it. HTML comments are dropped first. */
export function parseListItems(content: string): ListItem[] {
  const items: ListItem[] = [];
  const headings: string[] = [];
  let label: string | undefined;
  const parents: string[] = [];
  for (const line of preprocess(content).split("\n")) {
    const heading = /^(={2,6})\s*(.*?)\s*\1\s*$/.exec(line);
    if (heading) {
      const level = (heading[1] as string).length - 2;
      headings.length = level;
      headings[level] = clean(plainText(parseWikitext(heading[2] as string)));
      label = undefined;
      parents.length = 0;
      continue;
    }
    const definition = /^;\s*(.*)$/.exec(line);
    if (definition) {
      label = clean(plainText(parseWikitext(definition[1] as string)));
      parents.length = 0;
      continue;
    }
    const bullet = /^([*#]+)\s*(.*)$/.exec(line);
    if (!bullet) continue;
    const depth = (bullet[1] as string).length;
    const nodes = parseWikitext(bullet[2] as string);
    const mentions = mentionsOf(nodes);
    parents.length = depth - 1;
    const path = [...headings.filter((h) => h !== undefined), ...(label ? [label] : []), ...parents.filter((p) => p !== undefined)];
    if (mentions.length > 0) items.push({ path, mentions });
    // An item can head the deeper items under it ("* Champion abilities" / "** {{cai|...}}").
    parents[depth - 1] = clean(plainText(nodes));
  }
  return items;
}

/** Mentions in the paragraphs of a page that match a phrase (for lists written as prose). */
export function proseMentions(content: string, phrase: RegExp): AbilityMention[] {
  return preprocess(content)
    .split("\n")
    .filter((line) => phrase.test(line))
    .flatMap((line) => mentionsOf(parseWikitext(line)))
    .map((mention) => ({ ...mention, qualifier: "" }));
}
