/** The committed item catalog and item builds on fighters (CLI, tests). */
import path from "node:path";
import type { FighterSpec } from "../engine/sim/spec";
import { type EquippedFighter, equipItems } from "../items/equip";
import { ITEM_MODULES } from "../items/modules/index";
import { datasetDir } from "./config";
import { readJson } from "./lib/files";
import type { ItemCatalog, ItemRecord } from "./items/records";

const catalogs = new Map<string, Promise<ItemCatalog>>();

/** The dataset's item catalog (data/<dataset>/items.json), read once. */
export function loadItemCatalog(dataset: string): Promise<ItemCatalog> {
  let catalog = catalogs.get(dataset);
  if (!catalog) {
    catalog = readJson<ItemCatalog>(path.join(datasetDir(dataset), "items.json")).catch(() => {
      throw new Error(`data/${dataset}/items.json is missing; run npm run build:items`);
    });
    catalogs.set(dataset, catalog);
  }
  return catalog;
}

const simplify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** A catalog item or transformed item by name; case, spaces and punctuation don't matter. */
export function findItem(catalog: ItemCatalog, name: string): ItemRecord {
  const all = [...catalog.items, ...catalog.transforms];
  const wanted = simplify(name);
  const found = all.find((record) => simplify(record.name) === wanted);
  if (found) return found;
  const close = all.filter((record) => simplify(record.name).includes(wanted)).map((record) => record.name);
  throw new Error(`No item "${name}"${close.length ? ` (did you mean ${close.slice(0, 5).join(", ")}?)` : ""}`);
}

export interface BuildOptions {
  /** Option overrides, by item name and option (items/modules/). */
  options?: Record<string, Record<string, number>>;
  /**
   * Whether the Tear items are fully stacked: then a build's Manamune is Muramana, and so on.
   * Default true: a level-20 champion has had a long game to stack them.
   */
  stacked?: boolean;
}

/** A fighter holding the named items, with every item module the simulator has. */
export function equipBuild(spec: FighterSpec, names: string[], catalog: ItemCatalog, build: BuildOptions = {}): EquippedFighter {
  const stacked = build.stacked ?? true;
  const records = names.map((name) => findItem(catalog, name));
  const held = records.map((record) => (stacked && record.transformsInto ? findItem(catalog, record.transformsInto) : record));
  const equipped = equipItems(spec, held, {
    modules: ITEM_MODULES,
    source: { page: catalog.sources.itemData.title, revid: catalog.sources.itemData.revid, rules: catalog.rulePages },
    options: build.options ?? {},
  });
  const transformed = records.filter((record, i) => held[i] !== record);
  if (transformed.length > 0) equipped.assumptions.unshift(`The Tear items are fully stacked: ${transformed.map((record) => `${record.name} is ${record.transformsInto}`).join(", ")}.`);
  return equipped;
}
