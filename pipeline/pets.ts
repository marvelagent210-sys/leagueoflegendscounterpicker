/**
 * Pets: units champions summon or place (turrets, Mist Walkers, Tentacles, Powder Kegs), from
 * the {{Infobox/Pet}} templates on the wiki's champion pages. Numeric fields keep their values
 * by level or rank, like ability fields; the rest is kept as text for kits to quote.
 */
import type { NumericField, PetRecord } from "../engine/abilities";
import { parseNumericField } from "./abilities/fields";
import type { ChampionLookup } from "./abilities/championLookup";
import type { WikiPage } from "./sources/wiki";
import { cleanText, createContext, type EvalContext, render, templateName } from "./wikitext/evaluate";
import { type TemplateNode, type WikiNode, parseWikitext, preprocess } from "./wikitext/parse";

/** Infobox fields holding numbers. */
const NUMERIC_FIELDS = new Set(["hp", "damage", "range", "armor", "magicresist", "attackspeed", "movespeed", "radius", "pathingradius", "gold", "exp", "cs"]);
/** Infobox fields that only point at images. */
const IGNORED_FIELDS = new Set(["image", "render", "name"]);

/** Every template node in the tree, nested ones included. */
function templates(nodes: WikiNode[]): TemplateNode[] {
  const found: TemplateNode[] = [];
  for (const node of nodes) {
    if (node.type !== "template") continue;
    found.push(node);
    for (const arg of node.args) found.push(...templates(arg.value));
  }
  return found;
}

export function parsePets(page: WikiPage, championId: string, championData: ChampionLookup): PetRecord[] {
  if (!page.content.includes("{{Infobox/Pet")) return [];
  const ctx: EvalContext = createContext(championData);
  const pets: PetRecord[] = [];
  for (const node of templates(parseWikitext(preprocess(page.content)))) {
    if (templateName(node, ctx) !== "infobox/pet") continue;
    const args = new Map(node.args.filter((arg) => arg.name !== undefined).map((arg) => [(arg.name ?? "").trim().toLowerCase(), arg.value]));
    const name = cleanText(render(args.get("name") ?? [], ctx));
    if (!name) continue;
    const fields: Record<string, NumericField> = {};
    const text: Record<string, string> = {};
    for (const [key, value] of args) {
      if (IGNORED_FIELDS.has(key)) continue;
      if (NUMERIC_FIELDS.has(key)) {
        const field = parseNumericField(value, ctx);
        if (field) fields[key] = field;
      }
      const rendered = cleanText(render(value, ctx)).trim();
      if (rendered) text[key] = rendered;
    }
    pets.push({ champion: championId, name, page: { title: page.title, revid: page.revid }, fields, text });
  }
  return pets;
}
