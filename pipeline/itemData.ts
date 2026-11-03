/** The committed item catalog and summoner spell catalog, and loadouts on fighters (CLI, tests). */
import path from "node:path";
import type { BonusStats, FighterSpec } from "../engine/sim/spec";
import { type EquipOptions, type EquippedFighter, type ItemFighter, equipItems, joinParts } from "../items/equip";
import { ITEM_MODULES } from "../items/modules/index";
import { type EquippedRunes, type RunePage, runeLoadout } from "../runes/equip";
import { RUNE_MODULES } from "../runes/modules/index";
import { type EquippedSpells, findSpell, spellLoadout } from "../summoners/equip";
import { SPELL_MODULES } from "../summoners/modules/index";
import { datasetDir } from "./config";
import { readJson } from "./lib/files";
import type { ItemCatalog, ItemRecord } from "./items/records";
import type { RuneCatalog } from "./runeCatalog/records";
import type { SpellCatalog } from "./summoners/records";

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

const spellCatalogs = new Map<string, Promise<SpellCatalog>>();

/** The dataset's summoner spell catalog (data/<dataset>/summoners.json), read once. */
export function loadSpellCatalog(dataset: string): Promise<SpellCatalog> {
  let catalog = spellCatalogs.get(dataset);
  if (!catalog) {
    catalog = readJson<SpellCatalog>(path.join(datasetDir(dataset), "summoners.json")).catch(() => {
      throw new Error(`data/${dataset}/summoners.json is missing; run npm run build:summoners`);
    });
    spellCatalogs.set(dataset, catalog);
  }
  return catalog;
}

const runeCatalogs = new Map<string, Promise<RuneCatalog>>();

/** The dataset's rune catalog (data/<dataset>/rune-catalog.json), read once. */
export function loadRuneCatalog(dataset: string): Promise<RuneCatalog> {
  let catalog = runeCatalogs.get(dataset);
  if (!catalog) {
    catalog = readJson<RuneCatalog>(path.join(datasetDir(dataset), "rune-catalog.json")).catch(() => {
      throw new Error(`data/${dataset}/rune-catalog.json is missing; run npm run build:runes`);
    });
    runeCatalogs.set(dataset, catalog);
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
  /** Summoner spells the fighter holds, by name, from the spell catalog. */
  spells?: { names: readonly string[]; catalog: SpellCatalog };
  /** The fighter's rune page, from the rune catalog, with its champion's adaptive type and rune option overrides. */
  runes?: { page: RunePage; catalog: RuneCatalog; adaptiveType: "Physical" | "Magic"; options?: Record<string, Record<string, number>> };
}

/** A fighter holding a build, and the summoner spells and rune page it holds, if any. */
export interface LoadoutFighter extends EquippedFighter {
  spells?: EquippedSpells;
  runes?: EquippedRunes;
}

/** Every item module the simulator has, with the catalog's wiki source and option overrides. */
export function equipOptions(catalog: ItemCatalog, options: Record<string, Record<string, number>> = {}): EquipOptions {
  return { modules: ITEM_MODULES, source: { page: catalog.sources.itemData.title, revid: catalog.sources.itemData.revid, rules: catalog.rulePages }, options };
}

/**
 * What `use` makes of a fighter holding the named items, as the rest of its loadout sees them
 * (EquipOptions.extras): the champion's main form, its bonus stats after the items, and what
 * the items know of it. It runs while the items are equipped, as runes are built (the rune
 * estimate's parts are built this way).
 */
export function withItems<T>(spec: FighterSpec, names: string[], catalog: ItemCatalog, use: (items: { form: FighterSpec; bonus: BonusStats; fighter: ItemFighter }) => T, build: BuildOptions = {}): T {
  const stacked = build.stacked ?? true;
  const held = names.map((name) => findItem(catalog, name)).map((record) => (stacked && record.transformsInto ? findItem(catalog, record.transformsInto) : record));
  let made: { value: T } | undefined;
  equipItems(spec, held, {
    ...equipOptions(catalog, build.options),
    extras: (form, items) => {
      if (!spec.forms || form.form === spec.form) made = { value: use({ form, ...items }) };
      return joinParts([]);
    },
  });
  if (!made) throw new Error(`${spec.name}: equipping its items gave no main form`);
  return made.value;
}

/** A fighter holding the named items and summoner spells, with every item and spell module the simulator has. */
export function equipBuild(spec: FighterSpec, names: string[], catalog: ItemCatalog, build: BuildOptions = {}): LoadoutFighter {
  const stacked = build.stacked ?? true;
  const records = names.map((name) => findItem(catalog, name));
  const held = records.map((record) => (stacked && record.transformsInto ? findItem(catalog, record.transformsInto) : record));
  const spells = build.spells ? spellLoadout(build.spells.names, build.spells.catalog, SPELL_MODULES) : undefined;
  const runes = build.runes ? runeLoadout(spec, build.runes.page, build.runes.catalog, RUNE_MODULES, { adaptiveType: build.runes.adaptiveType, spells: spells ? build.spells!.names.map((name) => findSpell(build.spells!.catalog, name).name) : [], ...(build.runes.options ? { options: build.runes.options } : {}) }) : undefined;
  const extras = spells || runes ? { extras: (form: FighterSpec, items: Parameters<NonNullable<EquipOptions["extras"]>>[1]) => joinParts([spells?.part(form), runes?.part(form, items)]) } : {};
  const equipped: LoadoutFighter = equipItems(spec, held, { ...equipOptions(catalog, build.options), ...extras });
  const transformed = records.filter((record, i) => held[i] !== record);
  if (transformed.length > 0) equipped.assumptions.unshift(`The Tear items are fully stacked: ${transformed.map((record) => `${record.name} is ${record.transformsInto}`).join(", ")}.`);
  if (spells) equipped.spells = spells.finish();
  if (runes) equipped.runes = runes.finish();
  return equipped;
}
