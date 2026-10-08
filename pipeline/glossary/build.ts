/**
 * Builds data/<dataset>/glossary.json: the wiki's glossary lists resolved to ability
 * records, and its crowd control rules table.
 */
import type { AbilityRecord } from "../../engine/abilities";
import { GLOSSARY_LISTS, type Glossary, type GlossaryEntry, type GlossaryList } from "../../engine/glossary";
import { normalizeTitle } from "../abilities/current";
import { isRedirect } from "../abilities/page";
import type { WikiPage } from "../sources/wiki";
import { parseCrowdControlTable } from "./crowdControl";
import { type AbilityMention, type ListItem, parseListItems, proseMentions } from "./lists";

interface ListDefinition {
  /** Selects the page's items for this list by their heading path (lowercase). */
  where?: (path: string[]) => boolean;
  /** For lists written as prose: the sentence that introduces them. */
  prose?: RegExp;
  /** Sub-list label from the item's path. */
  label?: (path: string[]) => string | undefined;
}

const has = (path: string[], heading: string) => path.includes(heading);
const championAbilities = (path: string[]) => path.at(-1) === "champion abilities";

/** Crowd control sources: the most specific heading names the type ("Knock up" under "Airborne"). */
function crowdControlLabel(path: string[]): string | undefined {
  const [type, sub] = path;
  if (!type) return undefined;
  const name = type === "drowsy & sleep" ? "sleep" : type === "forced action" ? sub : type;
  if (type === "airborne" && sub) return `airborne: ${sub}`;
  if (name === "fear / flee") return "fear";
  if (type !== "forced action" && sub) return sub; // ";Polymorph" under Silence, ";Attack speed reduction" under Cripple
  return name;
}

const DEFINITIONS: Record<GlossaryList, ListDefinition> = {
  projectileBlock: { prose: /can be blocked or destroyed by/ },
  spellShield: { where: (p) => has(p, "single ability") && championAbilities(p) },
  untargetable: { where: (p) => p[0] === "untargetability" && p.length === 2 && championAbilities(p) },
  vanish: { where: (p) => p[0] === "untargetability" && has(p, "vanish") && championAbilities(p) },
  stasis: { where: (p) => p[0] === "untargetability" && has(p, "stasis") && championAbilities(p) },
  invulnerable: { where: (p) => p[0] === "invulnerability" && p.length === 2 && championAbilities(p) },
  dash: {
    where: (p) => /^(?:auto|direction|location|unit|terrain)-targeted dashes$/.test(p[0] ?? ""),
    label: (p) => p[0]?.replace(/ dashes$/, ""),
  },
  dashNoTerrain: { where: (p) => p[0] === "dashes that can't bypass terrain" },
  dashCancel: { where: (p) => has(p, "dash cancels") },
  knockdown: { where: (p) => has(p, "knockdowns") },
  dashInterruptibleByCC: { where: (p) => has(p, "dashes that are interruptible by cc") },
  lunge: { where: (p) => p[0] === "lunge" },
  blink: { where: (p) => p[0] === "blinks" && championAbilities(p) },
  channel: {
    where: (p) => p[0] === "list of channels" && championAbilities(p),
    label: (p) => p[1]?.replace(/ channels$/, ""),
  },
  charged: { where: (p) => p[0] === "charged abilities" && championAbilities(p) },
  camouflage: { where: (p) => p[0] === "camouflage" && championAbilities(p) },
  invisibility: { where: (p) => p[0] === "invisibility" && championAbilities(p) },
  stealthTrap: { where: (p) => p[0] === "stealthed traps and wards" && championAbilities(p) },
  trueSight: {},
  grievousWounds: { where: (p) => p[0] === "sources" && championAbilities(p) },
  tenacity: { where: (p) => p[0] === "increasing tenacity" && championAbilities(p) },
  tenacityReduction: { where: (p) => p[0] === "decreasing tenacity" },
  minimumHealth: {},
  resurrection: {},
  slowImmune: {},
  crowdControl: { label: crowdControlLabel },
};

/**
 * Finds the ability record a mention names: "{{cai|Q|Teemo}}" by slot redirect,
 * "{{cai|Bola Strike 2|Rengar}}" by page, falling back to the base ability for a numbered
 * variant without its own page.
 */
export function mentionResolver(
  pages: readonly WikiPage[],
  records: readonly AbilityRecord[],
): (mention: AbilityMention) => AbilityRecord | undefined {
  const byTitle = new Map(records.map((record) => [normalizeTitle(record.page.title), record]));
  const redirects = new Map<string, string>();
  for (const page of pages) {
    if (!isRedirect(page)) continue;
    const target = /#redirect\s*\[\[([^\]|#]+)/i.exec(page.content)?.[1];
    if (target) redirects.set(normalizeTitle(page.title), normalizeTitle(target));
  }
  const find = (champion: string, ability: string) => {
    let title = normalizeTitle(`Template:Data ${champion}/${ability}`);
    for (let hop = 0; hop < 4 && !byTitle.has(title); hop++) {
      const next = redirects.get(title);
      if (!next) break;
      title = next;
    }
    return byTitle.get(title);
  };
  return (mention) =>
    find(mention.champion, mention.ability) ?? find(mention.champion, mention.ability.replace(/\s+\d+$/, ""));
}

export function buildGlossary(
  glossaryPages: readonly WikiPage[],
  dataPages: readonly WikiPage[],
  records: readonly AbilityRecord[],
): Glossary {
  const resolve = mentionResolver(dataPages, records);
  const byTitle = new Map(glossaryPages.map((page) => [page.title, page]));
  const entries: GlossaryEntry[] = [];
  const unresolved: Glossary["unresolved"] = [];
  const seen = new Set<string>();
  for (const [list, title] of Object.entries(GLOSSARY_LISTS) as Array<[GlossaryList, string]>) {
    const page = byTitle.get(title);
    if (!page) {
      unresolved.push({ list, page: title, mention: "(page not fetched)" });
      continue;
    }
    const definition = DEFINITIONS[list];
    const items: ListItem[] = definition.prose
      ? [{ path: [], mentions: proseMentions(page.content, definition.prose) }]
      : parseListItems(page.content).map((item) => ({ ...item, path: item.path.map((p) => p.toLowerCase()) }));
    for (const item of items) {
      if (definition.where && !definition.where(item.path)) continue;
      const label = definition.label?.(item.path);
      for (const mention of item.mentions) {
        const record = resolve(mention);
        if (!record) {
          unresolved.push({ list, page: title, mention: `${mention.champion}: ${mention.ability}` });
          continue;
        }
        const entry: GlossaryEntry = {
          list,
          ...(label ? { label } : {}),
          champion: record.champion,
          ability: record.name,
          kind: record.kind,
          ...(mention.qualifier ? { qualifier: mention.qualifier } : {}),
          ...(mention.note ? { note: mention.note } : {}),
        };
        const key = JSON.stringify(entry);
        if (seen.has(key)) continue;
        seen.add(key);
        entries.push(entry);
      }
    }
  }
  const ccPage = byTitle.get("Types of Crowd Control/Summary");
  const crowdControl = ccPage
    ? parseCrowdControlTable(ccPage.content).map((row) => ({
        types: row.types,
        movement: row.movement,
        attacking: row.attacking,
        abilities: row.abilities,
        interruptsChannels: row.interruptsChannels,
        tenacity: row.tenacity,
        removedBy: row.removedBy.flatMap((mention) => {
          const record = resolve(mention);
          if (!record) {
            unresolved.push({ list: "crowdControl", page: "Types of Crowd Control/Summary", mention: `${mention.champion}: ${mention.ability}` });
            return [];
          }
          return [{ champion: record.champion, ability: record.name, kind: record.kind }];
        }),
      }))
    : [];
  const pages = Object.fromEntries(glossaryPages.map((page) => [page.title, page.revid]).sort(([a], [b]) => String(a).localeCompare(String(b))));
  return { pages, entries, crowdControl, unresolved };
}
