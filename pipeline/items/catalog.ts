/**
 * The item catalog the build search will choose from (PLAN.md §13, M8): the finished items and
 * tier-2 boots sold on Summoner's Rift, selected from Data Dragon's item list.
 */

/** The parts of Data Dragon's item.json the catalog reads. */
export interface DDragonItem {
  name: string;
  description?: string;
  tags?: string[];
  maps?: Record<string, boolean>;
  gold: { base: number; total: number; purchasable: boolean };
  from?: string[];
  into?: string[];
  inStore?: boolean;
  hideFromAll?: boolean;
  consumed?: boolean;
  requiredChampion?: string;
  requiredAlly?: string;
}

export interface DDragonItems {
  version: string;
  data: Record<string, DDragonItem>;
}

export interface CatalogEntry {
  id: number;
  item: DDragonItem;
  kind: "legendary" | "boots";
}

const SUMMONERS_RIFT = "11";
/** The support quest's last stage; the items built from it are its final forms. */
const SUPPORT_QUEST = "Bounty of Worlds";
/** Mejai's Soulstealer is the cheapest finished item. */
const FINISHED_GOLD = 1500;

/** How the catalog is selected, in words; the item report prints them. */
export const CATALOG_RULES = [
  "Sold in the Summoner's Rift shop to any champion: purchasable, in the store, not hidden, not limited to one champion or its ally. Other modes' copies of an item have six-digit IDs and are left out.",
  `Finished items are built from components, build into nothing, and cost at least ${FINISHED_GOLD.toLocaleString("en-US")} gold. Boots, trinkets and consumables are not finished items, nor are items built from boots (the tier-3 boots) or from ${SUPPORT_QUEST} (the support quest's final forms).`,
  "Boots are the tier-2 boots: boots built from Boots that build into a tier-3 upgrade. Basic Boots and the tier-3 boots are left out.",
];

const has = (item: DDragonItem, tag: string) => (item.tags ?? []).includes(tag);

/** The finished items and tier-2 boots of Summoner's Rift, by ID. */
export function catalogItems(items: DDragonItems): CatalogEntry[] {
  const byId = items.data;
  const isBoots = (id: string) => byId[id] !== undefined && has(byId[id], "Boots");
  const entries: CatalogEntry[] = [];
  for (const [key, item] of Object.entries(byId)) {
    const id = Number(key);
    const sold = id < 10000 && item.maps?.[SUMMONERS_RIFT] === true && item.gold.purchasable && item.inStore !== false
      && !item.hideFromAll && !item.requiredChampion && !item.requiredAlly;
    if (!sold) continue;
    const from = item.from ?? [];
    const into = item.into ?? [];
    if (has(item, "Boots")) {
      if (from.some(isBoots) && into.length > 0) entries.push({ id, item, kind: "boots" });
      continue;
    }
    const finished = from.length > 0 && into.length === 0 && item.gold.total >= FINISHED_GOLD && !item.consumed
      && !has(item, "Trinket") && !has(item, "Consumable") && !from.some(isBoots)
      && !from.some((part) => byId[part]?.name === SUPPORT_QUEST);
    if (finished) entries.push({ id, item, kind: "legendary" });
  }
  return entries.sort((a, b) => a.item.name.localeCompare(b.item.name));
}
