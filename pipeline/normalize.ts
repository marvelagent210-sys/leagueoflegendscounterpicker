/** Joins wiki champion entries with Data Dragon into the engine's Champion records. */
import type { AbilitySlot, Champion, ChampionForm, StatOverride } from "../engine/types";
import type { WikiChampionEntry } from "./parse/championData";
import type { DDragonChampion, DDragonChampionFull } from "./sources/ddragon";

/**
 * Champions that start the game in a form other than the wiki's base entry.
 * The wiki's "Kled" entry is Kled on foot; he starts mounted on Skaarl.
 */
const STARTING_FORM: Record<string, string> = {
  Kled: "Kled & Skaarl",
};

const SLOTS: readonly AbilitySlot[] = ["Q", "W", "E", "R"];

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function comparePatches(a: string, b: string): number {
  const [aMajor = 0, aMinor = 0] = a.split(".").map(Number);
  const [bMajor = 0, bMinor = 0] = b.split(".").map(Number);
  return aMajor - bMajor || aMinor - bMinor;
}

function buildChampion(
  ddragon: DDragonChampion,
  entries: WikiChampionEntry[],
  overrides: ReadonlyMap<string, StatOverride[]>,
): Champion {
  const key = Number(ddragon.key);
  const base = entries.find((entry) => entry.id === key);
  if (!base) throw new Error(`No wiki base entry for ${ddragon.id} (key ${key})`);
  if (base.apiname !== ddragon.id) {
    throw new Error(`Wiki entry "${base.name}" has apiname ${base.apiname}, Data Dragon id is ${ddragon.id}`);
  }

  const startingName = STARTING_FORM[ddragon.id] ?? base.name;
  const starting = entries.find((entry) => entry.name === startingName);
  if (!starting) throw new Error(`Starting form "${startingName}" not found for ${ddragon.id}`);
  const ordered = [starting, ...entries.filter((entry) => entry !== starting).sort((a, b) => a.id - b.id)];
  const forms: ChampionForm[] = ordered.map((entry) => ({
    id: slugify(entry.name),
    name: entry.name,
    stats: entry.stats,
    overrides: overrides.get(entry.name) ?? [],
  }));

  const maxRanks = Object.fromEntries(
    SLOTS.map((slot, index) => {
      const spell = ddragon.spells[index];
      if (!spell) throw new Error(`${ddragon.id} has no ${slot} spell in Data Dragon`);
      return [slot, spell.maxrank];
    }),
  ) as Record<AbilitySlot, number>;

  return {
    id: ddragon.id,
    key,
    name: ddragon.name,
    title: ddragon.title,
    resource: base.resource,
    rangeType: starting.rangeType,
    adaptiveType: base.adaptiveType,
    positions: base.positions,
    roles: base.roles,
    lastChanged: entries.map((entry) => entry.lastChanged).sort(comparePatches).at(-1) ?? base.lastChanged,
    maxRanks,
    icon: ddragon.image.full,
    forms,
  };
}

/** Builds one record per Data Dragon champion; every wiki entry must be used exactly once. */
export function buildChampions(
  entries: WikiChampionEntry[],
  ddragon: DDragonChampionFull,
  overrides: ReadonlyMap<string, StatOverride[]> = new Map(),
): Champion[] {
  const byKey = new Map<number, WikiChampionEntry[]>();
  for (const entry of entries) {
    const key = Math.floor(entry.id);
    byKey.set(key, [...(byKey.get(key) ?? []), entry]);
  }

  const champions = Object.values(ddragon.data).map((champion) => {
    const key = Number(champion.key);
    const forms = byKey.get(key);
    if (!forms) throw new Error(`No wiki entry for ${champion.id} (key ${key})`);
    byKey.delete(key);
    return buildChampion(champion, forms, overrides);
  });

  if (byKey.size > 0) {
    const unused = [...byKey.values()].flat().map((entry) => entry.name);
    throw new Error(`Wiki entries with no Data Dragon champion: ${unused.join(", ")}`);
  }
  return champions.sort((a, b) => a.name.localeCompare(b.name));
}
