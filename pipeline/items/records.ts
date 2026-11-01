/**
 * Item records for the catalog (PLAN.md §13, M8), read from the wiki's item data module and
 * cross-checked against the items' game data file. The item effects (items/) read them.
 */
import type { Series } from "../../engine/abilities";
import { descriptionValues } from "../abilities/build";
import type { ChampionLookup } from "../abilities/championLookup";
import { renderMarked } from "../abilities/marked";
import { type LuaTable, type LuaValue, parseLuaModule } from "../parse/lua";
import type { WikiPage } from "../sources/wiki";
import { cleanText, createContext, type EvalContext, render } from "../wikitext/evaluate";
import { parseWikitext, preprocess } from "../wikitext/parse";
import { CATALOG_RULES, type CatalogEntry, type DDragonItems, catalogItems } from "./catalog";

/** One effect of an item: a passive, a further passive, an active. */
export interface ItemEffect {
  /** The wiki's slot: "pass", "pass2", "pass3", "act". */
  slot: string;
  name?: string;
  /** A unique effect doesn't add up with another of the same name. */
  unique: boolean;
  /** The description as the wiki shows it, values included; its further paragraphs (notes) each on a line of their own. */
  text: string;
  /** The description's wikitext, paragraph by paragraph on lines of their own. */
  wikitext: string;
  /**
   * Numbers the description writes as value templates, each with the sentence around it: by
   * level ("175 – 253 (based on level)"), or by another variable (stacks, missing health).
   */
  values: Array<{ series: Series; context: string }>;
  /** The cooldown as the wiki writes it: seconds, or a formula. */
  cooldown?: string;
  /** An active's range as the wiki writes it ("700"). */
  range?: string;
}

export interface ItemRecord {
  id: number;
  name: string;
  kind: CatalogEntry["kind"];
  /** Total cost, from Data Dragon. */
  gold: number;
  /** The wiki's cost, when it differs. */
  wikiGold?: number;
  /** Stats under the wiki's keys: ad, ap, as (%), crit (%), critdamage (%), hp, armor, mr, ah, lethality, armpen (%), mpen (%), ... */
  stats: Record<string, number>;
  effects: ItemEffect[];
  /** A restriction the wiki states in words, e.g. "Can only be purchased on ranged champions." */
  restriction?: string;
  /** The wiki's named limits, e.g. "Lifeline". */
  limits: string[];
  /** The exclusive groups from the game file that this item shares with other catalog items. */
  groups: string[];
  /** Its components, by name. */
  recipe: string[];
  /** The wiki's tags, e.g. "OnHitAppliesLifeSteal" for on-hit damage that life steal heals from. */
  tags: string[];
  /** The item it turns into once stacked (Manamune's Muramana), a record of `ItemCatalog.transforms`. */
  transformsInto?: string;
  /** For a transformed item, the catalog item it comes from. */
  transformsFrom?: string;
}

/** A game-file item group that caps how many of its items a build holds, shared by two or more catalog items. */
export interface ItemGroup {
  /** The game file's group ID; hashed IDs are written as "{57352a0f}". */
  id: string;
  /** The wiki limit with the same items, when there is one. */
  wiki?: string;
  max: number;
  items: string[];
}

export interface ItemCatalog {
  dataset: string;
  patch: string;
  sources: { ddragon: string; cdragon: string; itemData: { title: string; revid: number } };
  rules: string[];
  items: ItemRecord[];
  /** What catalog items turn into once stacked (Muramana, Seraph's Embrace, Fimbulwinter); the shop doesn't sell them. */
  transforms: ItemRecord[];
  /** The wiki's rule pages that item effects quote (how Energized charges build, when combat ends). */
  rulePages: RulePage[];
  groups: ItemGroup[];
  /** Every stat the wiki gives, compared with the game file's; and every difference found. */
  checks: { stats: number; differences: string[] };
  /** The rules the build search uses (rules.ts), and the builds they allow. */
  search?: BuildSearchRules;
}

/** A wiki rule page as item effects quote it. */
export interface RulePage {
  title: string;
  revid: number;
  /** Tip data by its descriptions, other templates by their wikitext, articles as the wiki shows them; whitespace normalized. */
  text: string;
}

export interface BuildCount {
  sixItems: number;
  fiveItemsWithBoots: number;
}

export interface BuildSearchRules {
  /** One item per build from each group, as confirmed on review. */
  groups: Record<string, string[]>;
  /** Builds per side under those rules, and under the game file's caps instead. */
  builds: BuildCount;
  gameFileBuilds: BuildCount;
}

/** The wiki's stat keys and the game file's fields, with the factor from the game file's fraction to the wiki's percent. */
export const GAME_STAT_FIELDS: Record<string, readonly [string, number]> = {
  ad: ["mFlatPhysicalDamageMod", 1],
  ap: ["mFlatMagicDamageMod", 1],
  hp: ["mFlatHPPoolMod", 1],
  armor: ["mFlatArmorMod", 1],
  mr: ["mFlatSpellBlockMod", 1],
  as: ["mPercentAttackSpeedMod", 100],
  crit: ["mFlatCritChanceMod", 100],
  critdamage: ["mFlatCritDamageMod", 100],
  ah: ["mAbilityHasteMod", 1],
  ms: ["mPercentMovementSpeedMod", 100],
  msflat: ["mFlatMovementSpeedMod", 1],
  mana: ["flatMPPoolMod", 1],
  mp5: ["percentBaseMPRegenMod", 100],
  hp5: ["mPercentBaseHPRegenMod", 100],
  tenacity: ["mPercentTenacityItemMod", 100],
  omnivamp: ["PercentOmnivampMod", 100],
  lethality: ["PhysicalLethality", 1],
  armpen: ["mPercentArmorPenetrationMod", 100],
  lifesteal: ["mPercentLifeStealMod", 100],
  hsp: ["mPercentHealingAmountMod", 100],
  mpen: ["mPercentMagicPenetrationMod", 100],
  mpenflat: ["mFlatMagicPenetrationMod", 1],
};

const EFFECT_SLOTS = ["pass", "pass2", "pass3", "pass4", "act"];
/** An effect's paragraphs: its description, then further notes ("description2", ...). */
const PARAGRAPH = /^description(\d*)$/;
/** The effect that says what a stacked item becomes: "Transforms into Muramana at 360 bonus mana." */
const TRANSFORMS = /^Transforms into (.+?) at /;

export interface GameItem {
  mItemGroups?: string[];
  [field: string]: unknown;
}

export interface ItemSources {
  dataset: string;
  patch: string;
  ddragon: DDragonItems;
  /** The items' game data file, keyed "Items/<id>" for items and by hash for item groups. */
  gameFile: Record<string, unknown>;
  cdragonVersion: string;
  itemData: WikiPage;
  /** The rule pages item effects quote (WIKI_ITEM_RULE_PAGES). */
  rulePages?: WikiPage[];
  championData: ChampionLookup;
}

const isTable = (value: LuaValue | undefined): value is LuaTable => typeof value === "object" && value !== null && !Array.isArray(value);
const strings = (value: LuaValue | undefined): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : typeof value === "string" ? [value] : []);

/** The index just past the "}}" that closes the template opening at `start`. */
function templateEnd(text: string, start: number): number {
  let depth = 0;
  for (let i = start; i < text.length - 1; i++) {
    if (text.startsWith("{{", i)) {
      depth++;
      i++;
    } else if (text.startsWith("}}", i)) {
      depth--;
      i++;
      if (depth === 0) return i + 1;
    }
  }
  throw new Error(`Unclosed template in: ${text.slice(start, start + 60)}`);
}

/** A template's arguments: its text split at the pipes outside nested templates and links. */
function templateArgs(inner: string): string[] {
  const args: string[] = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < inner.length; i++) {
    const pair = inner.slice(i, i + 2);
    if (pair === "{{" || pair === "[[") {
      depth++;
      current += pair;
      i++;
    } else if (pair === "}}" || pair === "]]") {
      depth--;
      current += pair;
      i++;
    } else if (inner[i] === "|" && depth === 0) {
      args.push(current);
      current = "";
    } else {
      current += inner[i];
    }
  }
  args.push(current);
  return args;
}

/**
 * {{rd|melee|ranged}} gives a value for melee and for ranged champions; with pp=true each is a
 * progression over `levels`. The shared evaluator shows the melee value alone, so item text
 * spells out both, as {{pp}} progressions where they are ones.
 */
export function spellOutRanged(wikitext: string): string {
  let out = "";
  let at = 0;
  for (;;) {
    const start = wikitext.toLowerCase().indexOf("{{rd|", at);
    if (start < 0) return out + wikitext.slice(at);
    const end = templateEnd(wikitext, start);
    out += wikitext.slice(at, start);
    const args = templateArgs(wikitext.slice(start + 2, end - 2)).slice(1);
    const isNamed = (arg: string) => /^\s*\w+\s*=/.test(arg);
    const named = new Map(args.filter(isNamed).map((arg) => [arg.slice(0, arg.indexOf("=")).trim(), arg.slice(arg.indexOf("=") + 1).trim()]));
    const [melee = "", ranged = melee] = args.filter((arg) => !isNamed(arg)).map((arg) => spellOutRanged(arg.trim()));
    const value = (text: string) => (named.get("pp") === "true" ? `{{pp|${text}${named.has("levels") ? `|${named.get("levels")}` : ""}${named.has("key") ? `|key=${named.get("key")}` : ""}}}` : text);
    out += melee === ranged ? value(melee) : `${value(melee)} (melee) / ${value(ranged)} (ranged)`;
    at = end;
  }
}

function shown(wikitext: string, ctx: EvalContext): string {
  return cleanText(render(parseWikitext(preprocess(spellOutRanged(wikitext))), ctx)).replace(/\s+/g, " ").trim();
}

/** A rule page's text for quoting: a tip data template's descriptions, another template's wikitext, or an article as shown. */
export function rulePage(page: WikiPage, ctx: EvalContext): RulePage {
  const squash = (text: string) => text.replace(/\s+/g, " ").trim();
  let text: string;
  if (page.title.startsWith("Template:Tip data/")) {
    const call = parseWikitext(preprocess(page.content)).find((node) => node.type === "template");
    const descriptions = call?.type === "template" ? call.args.filter((arg) => arg.name?.trim().startsWith("description")) : [];
    if (descriptions.length === 0) throw new Error(`${page.title} has no description`);
    text = descriptions.map((arg) => cleanText(render(arg.value, ctx))).join("\n");
  } else if (page.title.startsWith("Template:")) {
    text = page.content.replace(/<noinclude>[\s\S]*?<\/noinclude>/g, "");
  } else {
    text = cleanText(render(parseWikitext(preprocess(page.content)), ctx));
  }
  return { title: page.title, revid: page.revid, text: text.split("\n").map(squash).filter(Boolean).join("\n") };
}

/** The value templates of a paragraph, with their sentences, read like an ability's description. */
function valuesOf(wikitext: string, ctx: EvalContext): ItemEffect["values"] {
  return descriptionValues(renderMarked(parseWikitext(preprocess(spellOutRanged(wikitext))), ctx)).map(({ series, context }) => ({ series, context: context.replace(/\s+/g, " ").trim() }));
}

/**
 * The module writes "=>Manamune" for a field that is the same as another item's (Muramana's
 * attack damage): the entry with every such field replaced by that item's.
 */
function resolveEntry(module: LuaTable, entry: LuaTable, name: string): LuaTable {
  const resolve = (value: LuaValue, path: string[]): LuaValue => {
    if (typeof value === "string" && value.startsWith("=>")) {
      let found: LuaValue | undefined = module[value.slice(2)];
      for (const key of path) found = isTable(found) ? found[key] : undefined;
      if (found === undefined) throw new Error(`${name}: ${path.join(".")} refers to ${value.slice(2)}, which has no such field`);
      return resolve(found, path);
    }
    if (isTable(value)) return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, resolve(inner, [...path, key])]));
    return value;
  };
  return resolve(entry, []) as LuaTable;
}

/** Rounds away the game file's float noise (0.30000001192092896 is 30%). */
const tidy = (value: number) => Math.round(value * 1e4) / 1e4;

export function buildItemCatalog(sources: ItemSources): ItemCatalog {
  const ctx = createContext(sources.championData);
  const module = parseLuaModule(sources.itemData.content);
  if (!isTable(module)) throw new Error(`${sources.itemData.title} should return a table`);
  const wikiById = new Map<number, [string, LuaTable]>();
  for (const [name, entry] of Object.entries(module)) {
    if (isTable(entry) && typeof entry.id === "number") wikiById.set(entry.id, [name, entry]);
  }
  const entries = catalogItems(sources.ddragon);
  const differences: string[] = [];
  let compared = 0;
  const groupDef = (key: string) => {
    const def = sources.gameFile[key] as { mItemGroupID?: string; mMaxGroupOwnable?: number } | undefined;
    return def && typeof def.mMaxGroupOwnable === "number" ? { id: def.mItemGroupID ?? key, max: def.mMaxGroupOwnable } : undefined;
  };
  const members = new Map<string, string[]>();
  // `sold`: a shop item, which joins the game file's one-per-build groups (a transformed item doesn't).
  const recordOf = (id: number, name: string, raw: LuaTable, kind: CatalogEntry["kind"], gold: number, sold = true): ItemRecord => {
    const entry = resolveEntry(module, raw, name);
    const stats: Record<string, number> = {};
    for (const [key, value] of Object.entries(isTable(entry.stats) ? entry.stats : {})) {
      if (typeof value !== "number") throw new Error(`${name}: stat ${key} is ${JSON.stringify(value)}, not a number`);
      stats[key] = value;
    }
    const effects: ItemEffect[] = [];
    const effectTable = isTable(entry.effects) ? entry.effects : {};
    for (const slot of [...EFFECT_SLOTS, ...Object.keys(effectTable).filter((key) => !EFFECT_SLOTS.includes(key))]) {
      const effect = effectTable[slot];
      if (!isTable(effect)) continue;
      const paragraphs = Object.entries(effect)
        .flatMap(([key, value]) => {
          const match = PARAGRAPH.exec(key);
          return match && typeof value === "string" ? [[Number(match[1] || 1), value] as const] : [];
        })
        .sort(([a], [b]) => a - b)
        .map(([, value]) => value);
      const range = typeof effect.range === "string" || typeof effect.range === "number" ? shown(String(effect.range), ctx) : undefined;
      effects.push({
        slot,
        ...(typeof effect.name === "string" ? { name: effect.name } : {}),
        unique: effect.unique === true,
        text: paragraphs.map((paragraph) => shown(paragraph, ctx)).join("\n"),
        wikitext: paragraphs.join("\n"),
        values: paragraphs.flatMap((paragraph) => valuesOf(paragraph, ctx)),
        ...(effect.cd !== undefined && effect.cd !== null ? { cooldown: String(effect.cd) } : {}),
        ...(range ? { range } : {}),
      });
    }
    // The game file's stats and price, against the wiki's.
    const game = sources.gameFile[`Items/${id}`] as GameItem | undefined;
    if (!game) throw new Error(`Item ${id} (${name}) is missing from the items' game file`);
    for (const [key, value] of Object.entries(stats)) {
      const field = GAME_STAT_FIELDS[key];
      if (!field) {
        differences.push(`${name}: the wiki's ${key} has no game-file field to compare`);
        continue;
      }
      compared++;
      const inGame = tidy(Number(game[field[0]] ?? 0) * field[1]);
      if (Math.abs(inGame - value) > 1e-6) differences.push(`${name}: ${key} is ${value} on the wiki, ${inGame} in the game file`);
    }
    for (const [key, [field]] of Object.entries(GAME_STAT_FIELDS)) {
      if (typeof game[field] === "number" && game[field] !== 0 && !(key in stats)) differences.push(`${name}: the game file's ${field} (${tidy(game[field] as number)}) has no ${key} on the wiki`);
    }
    const buy = typeof entry.buy === "number" ? entry.buy : undefined;
    if (buy !== undefined && buy !== gold) differences.push(`${name}: costs ${buy.toLocaleString("en-US")} gold on the wiki, ${gold.toLocaleString("en-US")} in Data Dragon`);
    for (const key of sold ? (game.mItemGroups ?? []) : []) {
      if (groupDef(key)) members.set(key, [...(members.get(key) ?? []), name]);
    }
    const restriction = typeof entry.limit === "string" ? shown(entry.limit, ctx) : undefined;
    const transformsInto = effects.map((effect) => TRANSFORMS.exec(effect.text)?.[1]).find((into) => into !== undefined);
    return {
      id,
      name,
      kind,
      gold,
      ...(buy !== undefined && buy !== gold ? { wikiGold: buy } : {}),
      stats,
      effects,
      ...(restriction ? { restriction } : {}),
      limits: [entry.itemlimit, entry.itemlimit2].flatMap(strings),
      groups: [],
      recipe: strings(entry.recipe),
      tags: strings(entry.tags),
      ...(transformsInto ? { transformsInto } : {}),
    };
  };
  const items = entries.map(({ id, item, kind }): ItemRecord => {
    const found = wikiById.get(id);
    if (!found) throw new Error(`Item ${id} (${item.name}) has no entry in ${sources.itemData.title}`);
    return recordOf(id, found[0], found[1], kind, item.gold.total);
  });
  // What stacked items become: the module's entry of that name, with Data Dragon's price.
  const transforms = items.flatMap((record): ItemRecord[] => {
    if (!record.transformsInto) return [];
    const entry = module[record.transformsInto];
    if (!isTable(entry) || typeof entry.id !== "number") throw new Error(`${record.name} transforms into ${record.transformsInto}, which has no entry in ${sources.itemData.title}`);
    const shop = sources.ddragon.data[String(entry.id)];
    if (!shop) throw new Error(`${record.transformsInto} (${entry.id}) is missing from Data Dragon`);
    return [{ ...recordOf(entry.id, record.transformsInto, entry, record.kind, shop.gold.total, false), transformsFrom: record.name }];
  });
  // Exclusive groups: a cap the game file sets that more catalog items share than it allows.
  // Groups with the same items and cap are one rule (Boots and BootsWithoutActives).
  const wikiLimits = new Map<string, string[]>();
  for (const record of items) for (const limit of record.limits) wikiLimits.set(limit, [...(wikiLimits.get(limit) ?? []), record.name]);
  const sameItems = (a: string[], b: string[]) => a.length === b.length && a.every((name) => b.includes(name));
  const binding = new Map<string, { ids: string[]; max: number; items: string[] }>();
  for (const [key, names] of members) {
    const def = groupDef(key);
    if (!def || names.length <= def.max) continue;
    const sorted = [...names].sort();
    const rule = `${def.max}|${sorted.join("|")}`;
    const known = binding.get(rule);
    if (known) known.ids.push(def.id);
    else binding.set(rule, { ids: [def.id], max: def.max, items: sorted });
  }
  const groups: ItemGroup[] = [...binding.values()].map(({ ids, max, items: names }) => {
    const wiki = [...wikiLimits].find(([, limited]) => sameItems(limited, names))?.[0];
    return { id: ids.sort().join(", "), ...(wiki ? { wiki } : {}), max, items: names };
  });
  groups.sort((a, b) => a.items[0]!.localeCompare(b.items[0]!) || a.id.localeCompare(b.id));
  for (const group of groups) {
    for (const name of group.items) items.find((record) => record.name === name)!.groups.push(group.wiki ?? group.id);
  }
  return {
    dataset: sources.dataset,
    patch: sources.patch,
    sources: { ddragon: sources.ddragon.version, cdragon: sources.cdragonVersion, itemData: { title: sources.itemData.title, revid: sources.itemData.revid } },
    rules: CATALOG_RULES,
    items,
    transforms,
    rulePages: (sources.rulePages ?? []).map((page) => rulePage(page, ctx)),
    groups,
    checks: { stats: compared, differences },
  };
}
