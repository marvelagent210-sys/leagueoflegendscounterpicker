/**
 * Decides which ability data pages describe a champion's current kit. The wiki keeps the
 * pages of removed abilities (Kayle's Intervention, Dr. Mundo's Burning Agony and other
 * pre-rework kits) under the same names, so a page is current only when the wiki links it
 * to the live kit:
 *   - a slot redirect points at it ("Template:Data Corki/W" -> "Valkyrie"; also variant
 *     slots such as "W2", "W*" and Hwei's "QW");
 *   - the champion's skill list in Module:ChampionData names it ("The Darkin Blade 2");
 *   - it describes a basic attack.
 */
import { type LuaTable, type LuaValue, parseLuaModule } from "../parse/lua";
import type { WikiPage } from "../sources/wiki";
import { isRedirect } from "./page";

const SLOT_REDIRECT = /^Template:Data ([^/]+)\/([IQWERA][IQWERA2*]?)$/;
const SKILL_FIELDS = ["skill_i", "skill_q", "skill_w", "skill_e", "skill_r"];

/** Current pages that nothing above reaches: Gnar's form pages, which his article shows. */
const ALSO_CURRENT = ["Template:Data Gnar/Mini Gnar", "Template:Data Gnar/Mega Gnar"];

export type CurrentReason = "slot" | "skill list" | "basic attack" | "form page";

function isTable(value: LuaValue | undefined): value is LuaTable {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** MediaWiki title normalization for the cases the data pages use: "Template: Data X" and underscores. */
export function normalizeTitle(title: string): string {
  return title.replace(/_/g, " ").replace(/^Template:\s*/i, "Template:").replace(/\s+/g, " ").trim();
}

/** "Template:Data Dr. Mundo/Infected Bonesaw" -> ["Dr. Mundo", "Infected Bonesaw"]. */
export function splitDataTitle(title: string): [champion: string, ability: string] | undefined {
  const match = /^Template:Data ([^/]+)\/(.+)$/.exec(normalizeTitle(title));
  return match ? [match[1] as string, match[2] as string] : undefined;
}

function redirectTarget(page: WikiPage): string | undefined {
  const match = /#redirect\s*\[\[([^\]|#]+)/i.exec(page.content);
  return match?.[1] ? normalizeTitle(match[1]) : undefined;
}

/** Keys "<champion id>/<ability page name>" of current abilities, with how each was found. */
export function currentAbilities(
  pages: readonly WikiPage[],
  championDataSource: string,
  championId: (wikiName: string) => string | undefined,
): Map<string, CurrentReason> {
  const current = new Map<string, CurrentReason>();
  const add = (wikiChampion: string, ability: string, reason: CurrentReason) => {
    const id = championId(wikiChampion);
    const key = `${id}/${ability}`;
    if (id !== undefined && !current.has(key)) current.set(key, reason);
  };
  const addTitle = (title: string, reason: CurrentReason) => {
    const parts = splitDataTitle(title);
    if (parts) add(parts[0], parts[1], reason);
  };
  for (const page of pages) {
    if (!isRedirect(page) || !SLOT_REDIRECT.test(normalizeTitle(page.title))) continue;
    const target = redirectTarget(page);
    if (target) addTitle(target, "slot");
  }
  const root = parseLuaModule(championDataSource);
  if (isTable(root)) {
    for (const [champion, entry] of Object.entries(root)) {
      if (!isTable(entry)) continue;
      for (const field of SKILL_FIELDS) {
        const list = entry[field];
        const names = Array.isArray(list) ? list : isTable(list) ? Object.values(list) : [];
        for (const name of names) if (typeof name === "string") add(champion, name, "skill list");
      }
    }
  }
  for (const page of pages) {
    if (!isRedirect(page) && /\/Basic Attack$/.test(normalizeTitle(page.title))) addTitle(page.title, "basic attack");
  }
  for (const title of ALSO_CURRENT) addTitle(title, "form page");
  return current;
}
