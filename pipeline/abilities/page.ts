/** Reads the named fields of a wiki ability data page ({{Ability data|...|field = value}}). */
import type { WikiPage } from "../sources/wiki";
import { parseWikitext, type TemplateNode, type WikiNode } from "../wikitext/parse";

export interface AbilityPage {
  title: string;
  revid: number;
  /** Top-level nodes before the data template, usually {{#vardefine}} calls. */
  prelude: WikiNode[];
  /** Field name (lowercase, single spaces) to its wikitext nodes, in page order. */
  fields: Map<string, WikiNode[]>;
}

export function isRedirect(page: WikiPage): boolean {
  return /^\s*#redirect/i.test(page.content);
}

function fieldsOf(template: TemplateNode): Map<string, WikiNode[]> {
  const fields = new Map<string, WikiNode[]>();
  for (const arg of template.args) {
    if (arg.name !== undefined) fields.set(arg.name.toLowerCase().replace(/\s+/g, " "), arg.value);
  }
  return fields;
}

export function readAbilityPage(page: WikiPage): AbilityPage | undefined {
  if (isRedirect(page)) return undefined;
  const nodes = parseWikitext(page.content);
  const index = nodes.findIndex((node) => {
    if (node.type !== "template") return false;
    const fields = fieldsOf(node);
    return fields.has("skill") && fields.has("champion");
  });
  const wrapper = nodes[index];
  if (index < 0 || wrapper?.type !== "template") return undefined;
  return { title: page.title, revid: page.revid, prelude: nodes.slice(0, index), fields: fieldsOf(wrapper) };
}
