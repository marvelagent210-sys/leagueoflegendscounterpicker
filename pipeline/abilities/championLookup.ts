/**
 * The wiki's {{ccd|Champion|field}} lookup (Module:ChampionData/getter) over the raw
 * ChampionData module, including the getter's defaults and derived fields.
 */
import { formatNumber } from "../wikitext/expr";
import { type LuaTable, type LuaValue, parseLuaModule } from "../parse/lua";

const DEFAULTS: Record<string, number> = {
  crit_base: 200,
  gameplay_radius: 65,
  acquisition_radius: 750,
};

function isTable(value: LuaValue | undefined): value is LuaTable {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export type ChampionLookup = (champion: string, field: string) => string | undefined;

export function championLookup(moduleSource: string): ChampionLookup {
  const root = parseLuaModule(moduleSource);
  if (!isTable(root)) throw new Error("ChampionData module should return a table");
  return (champion, field) => {
    const entry = root[champion];
    if (!isTable(entry)) return undefined;
    const stats = isTable(entry.stats) ? entry.stats : {};
    const key = field.trim();
    if (key === "windup") {
      const cast = stats.attack_cast_time;
      const total = stats.attack_total_time;
      if (typeof cast === "number" && typeof total === "number") return formatNumber(cast / total);
      const offset = typeof stats.attack_delay_offset === "number" ? stats.attack_delay_offset : 0;
      return formatNumber(0.3 + offset);
    }
    const value = stats[key] ?? entry[key] ?? DEFAULTS[key];
    if (typeof value === "number") return formatNumber(value);
    if (typeof value === "string") return value;
    return undefined;
  };
}

/** Wiki pages that name a champion form rather than the champion. */
const FORM_OWNERS: Record<string, string> = {
  Rhaast: "Kayn",
  "Shadow Assassin": "Kayn",
};

/**
 * Data Dragon id for the champion name an ability page uses: a ChampionData name
 * ("Nunu & Willump"), an internal name ("Nunu"), or a form ("Rhaast").
 */
export function championIdResolver(
  entries: ReadonlyArray<{ name: string; apiname: string }>,
  championIds: ReadonlySet<string>,
): (wikiName: string) => string | undefined {
  const byName = new Map(entries.map((entry) => [entry.name, entry.apiname]));
  return (wikiName) => {
    const name = FORM_OWNERS[wikiName] ?? wikiName;
    const id = byName.get(name) ?? (championIds.has(name) ? name : undefined);
    return id !== undefined && championIds.has(id) ? id : undefined;
  };
}
