/** Builds an AbilityRecord for every ability data page on the wiki. */
import type { AbilityKind, AbilityPart, AbilityRecord, LevelingStat, Mechanic } from "../../engine/abilities";
import type { AbilitySlot } from "../../engine/types";
import type { WikiPage } from "../sources/wiki";
import { cleanText, createContext, type EvalContext, render, templateName } from "../wikitext/evaluate";
import type { WikiNode } from "../wikitext/parse";
import { parseAmount } from "./amount";
import type { ChampionLookup } from "./championLookup";
import { flagValue, listValue, notesOf, parseNumericField, partLabel } from "./fields";
import { type Marked, PLACEHOLDER, displayText, renderMarked } from "./marked";
import { mechanicsOf } from "./mechanics";
import { type AbilityPage, readAbilityPage } from "./page";

export interface AbilityBuildOptions {
  championData: ChampionLookup;
  /** Data Dragon id for a wiki champion name, e.g. "Nunu & Willump" -> "Nunu". */
  championId: (wikiName: string) => string | undefined;
  /** Maximum ranks of a champion's Q/W/E/R. */
  maxRanks: (championId: string, slot: AbilitySlot) => number;
  /**
   * Whether a page describes a current ability (see current.ts). Pages of removed
   * abilities are skipped and listed in `legacy`. Defaults to every page.
   */
  isCurrent?: (championId: string, abilityName: string) => boolean;
}

export interface AbilityBuild {
  records: AbilityRecord[];
  /** Pages of abilities that are no longer in the game, which get no record. */
  legacy: Array<{ champion: string; title: string; revid: number }>;
  /** Templates rendered without a dedicated handler, across all pages. */
  unknownTemplates: Map<string, number>;
  warnings: string[];
}

const KINDS = new Set<AbilityKind>(["I", "Q", "W", "E", "R", "A"]);
const PART_SUFFIXES = ["", "2", "3", "4", "5", "6", "7", "8"];
const MAX_PAGE_FIELD_DEPTH = 3;

function levelingStats(nodes: WikiNode[] | undefined, ctx: EvalContext): LevelingStat[] {
  if (!nodes) return [];
  const stats: LevelingStat[] = [];
  for (const node of nodes) {
    if (node.type !== "template") continue;
    const name = templateName(node, ctx);
    if (name !== "st" && name !== "skill tabs") continue;
    const args = node.args.filter((arg) => arg.name === undefined);
    for (let i = 0; i + 1 < args.length; i += 2) {
      const label = cleanText(render(args[i]?.value ?? [], ctx));
      stats.push({ label, amount: parseAmount(renderMarked(args[i + 1]?.value ?? [], ctx)) });
    }
  }
  return stats;
}

/** Words a leveling label uses for each timed effect, e.g. "Knock Up Duration" for airborne. */
const DURATION_LABELS: Record<string, RegExp> = {
  airborne: /knock ?(?:up|back|aside)|airborne|pull/i,
  stun: /stun/i,
  root: /root|snare/i,
  slow: /slow/i,
  charm: /charm/i,
  fear: /fear|flee/i,
  taunt: /taunt/i,
  silence: /silence/i,
  sleep: /sleep|drowsy/i,
  polymorph: /polymorph/i,
  suppression: /suppress/i,
  ground: /ground/i,
  blind: /blind/i,
  disarm: /disarm/i,
  nearsight: /nearsight/i,
  cripple: /cripple/i,
  stasis: /stasis/i,
  shield: /shield/i,
  untargetable: /untargetable/i,
  invisible: /invisib|stealth/i,
  camouflage: /camouflage/i,
  "cc-immune": /immun/i,
};

/**
 * Fills durations and slow amounts the description leaves to the leveling table
 * ("charming them for a duration" + "Charm Duration: 1.4 / 1.55 / ...").
 */
function fillFromLeveling(mechanics: Mechanic[], leveling: LevelingStat[]): void {
  for (const mechanic of mechanics) {
    const words = DURATION_LABELS[mechanic.type];
    if (!words || mechanic.conditional) continue;
    if (!mechanic.duration) {
      const stat = leveling.find((s) => /duration/i.test(s.label) && words.test(s.label) && s.amount.base);
      if (stat?.amount.base) mechanic.duration = stat.amount.base;
    }
    if ((mechanic.type === "slow" || mechanic.type === "cripple") && !mechanic.amount) {
      const stat = leveling.find((s) => !/duration/i.test(s.label) && words.test(s.label) && s.amount.unit === "%");
      if (stat?.amount.base) mechanic.amount = stat.amount.base;
    }
  }
}

/** Leveling rows that depend on an item (Infinity Edge); items are out of scope. */
const ITEM_ROW = /\b(?:IE|Infinity Edge)\b/;

/**
 * Second pass over a whole ability: a duration may sit in another part's leveling table,
 * or under a plain "Duration" label when the ability has only one timed effect.
 */
function fillAcrossParts(parts: AbilityPart[]): void {
  const leveling = parts.flatMap((part) => part.leveling);
  const mechanics = parts.flatMap((part) => part.mechanics);
  fillFromLeveling(mechanics, leveling);
  const timed = mechanics.filter((m) => !m.conditional && m.category === "control" && !m.duration);
  const types = new Set(timed.map((m) => m.type));
  const generic = leveling.find((s) => /^duration$/i.test(s.label.trim()) && s.amount.base);
  if (generic?.amount.base && types.size === 1) for (const mechanic of timed) mechanic.duration = generic.amount.base;
}

/** Each value template in a description with the sentence it appears in (item effects read them too). */
export function descriptionValues(marked: Marked): AbilityPart["values"] {
  const values: AbilityPart["values"] = [];
  for (const match of marked.text.matchAll(PLACEHOLDER)) {
    const series = marked.series[Number(match[1])];
    if (!series) continue;
    const index = match.index ?? 0;
    const start = Math.max(0, marked.text.lastIndexOf(". ", index) + 1, marked.text.lastIndexOf("\n", index) + 1);
    const nextStop = marked.text.slice(index).search(/\.(?:\s|$)|\n/);
    const end = nextStop < 0 ? marked.text.length : index + nextStop + 1;
    values.push({ series, context: displayText({ text: marked.text.slice(start, end), series: marked.series }) });
  }
  return values;
}

function partsOf(page: AbilityPage, ctx: EvalContext): AbilityPart[] {
  const parts: AbilityPart[] = [];
  for (const suffix of PART_SUFFIXES) {
    const description = page.fields.get(`description${suffix}`);
    const leveling = page.fields.get(`leveling${suffix}`);
    if (!description && !leveling) continue;
    const marked = description ? renderMarked(description, ctx) : undefined;
    const stats = levelingStats(leveling, ctx).filter((stat) => !ITEM_ROW.test(stat.label));
    const mechanics = marked ? mechanicsOf(marked) : [];
    fillFromLeveling(mechanics, stats);
    parts.push({
      label: description ? partLabel(description, ctx) : undefined,
      text: marked ? displayText(marked) : "",
      leveling: stats,
      mechanics,
      values: marked ? descriptionValues(marked) : [],
      ...(marked && marked.tips.length > 0 ? { tips: marked.tips } : {}),
    });
  }
  fillAcrossParts(parts);
  return parts;
}

function customOf(page: AbilityPage, ctx: EvalContext): Array<{ label: string; text: string }> {
  const custom: Array<{ label: string; text: string }> = [];
  for (const suffix of PART_SUFFIXES) {
    const label = page.fields.get(`customlabel${suffix}`);
    const info = page.fields.get(`custominfo${suffix}`);
    if (!label || !info) continue;
    custom.push({ label: cleanText(render(label, ctx)), text: displayText(renderMarked(info, ctx)) });
  }
  return custom;
}

export function buildAbilityRecords(pages: WikiPage[], options: AbilityBuildOptions): AbilityBuild {
  const registry = new Map<string, AbilityPage>();
  for (const page of pages) {
    const ability = readAbilityPage(page);
    if (ability) registry.set(page.title, ability);
  }
  const unknownTemplates = new Map<string, number>();
  const warnings: string[] = [];

  const contextFor = (page: AbilityPage, depth: number): EvalContext => {
    const ctx = createContext(options.championData);
    ctx.pageField = (title, field) => {
      const target = registry.get(title);
      const nodes = target?.fields.get(field.toLowerCase());
      if (!target || !nodes || depth >= MAX_PAGE_FIELD_DEPTH) return undefined;
      return cleanText(render(nodes, contextFor(target, depth + 1)));
    };
    // Evaluate variable definitions in page order before reading any field.
    render(page.prelude, ctx);
    const skill = cleanText(render(page.fields.get("skill") ?? [], ctx));
    ctx.skill = skill;
    ctx.vars.set("abilityprogressionname", skill);
    for (const nodes of page.fields.values()) render(nodes, ctx);
    ctx.unknown.clear();
    return ctx;
  };

  const records: AbilityRecord[] = [];
  const legacy: AbilityBuild["legacy"] = [];
  for (const page of registry.values()) {
    const ctx = contextFor(page, 0);
    const wikiChampion = cleanText(render(page.fields.get("champion") ?? [], ctx));
    const champion = options.championId(wikiChampion);
    if (!champion) {
      warnings.push(`${page.title}: unknown champion "${wikiChampion}"`);
      continue;
    }
    const name = page.title.slice(page.title.indexOf("/") + 1);
    if (options.isCurrent && !options.isCurrent(champion, name)) {
      legacy.push({ champion, title: page.title, revid: page.revid });
      continue;
    }
    const skill = (ctx.skill ?? "").toUpperCase();
    const kind: AbilityKind = KINDS.has(skill as AbilityKind) ? (skill as AbilityKind) : "other";
    const field = (name: string) => page.fields.get(name);
    const numeric = (name: string) => {
      const nodes = field(name);
      return nodes ? parseNumericField(nodes, ctx) : undefined;
    };
    const record: AbilityRecord = {
      champion,
      kind,
      name,
      page: { title: page.title, revid: page.revid },
      ranks: kind === "Q" || kind === "W" || kind === "E" || kind === "R" ? options.maxRanks(champion, kind) : 1,
      fields: {},
      flags: {
        targeting: listValue(field("targeting"), ctx),
        affects: listValue(field("affects"), ctx),
        damageType: listValue(field("damagetype"), ctx),
        spellEffects: flagValue(field("spelleffects"), ctx),
        spellShield: flagValue(field("spellshield") ?? field("spellshields"), ctx),
        projectile: flagValue(field("projectile"), ctx),
        parry: flagValue(field("parry"), ctx),
        grounded: flagValue(field("grounded"), ctx),
        knockdown: flagValue(field("knockdown"), ctx),
        silence: flagValue(field("silence"), ctx),
        onHitEffects: flagValue(field("onhiteffects"), ctx),
      },
      parts: partsOf(page, ctx),
      custom: customOf(page, ctx),
      notes: notesOf(field("notes"), ctx),
    };
    const set = <K extends keyof AbilityRecord["fields"]>(key: K, value: AbilityRecord["fields"][K] | undefined) => {
      if (value !== undefined) record.fields[key] = value;
    };
    set("cooldown", numeric("cooldown"));
    set("cooldownStart", flagValue(field("cdstart"), ctx));
    set("staticCooldown", numeric("static"));
    set("targetCooldown", numeric("ontargetcdstatic") ?? numeric("ontargetcd"));
    set("recharge", numeric("recharge"));
    set("cost", numeric("cost"));
    set("costType", flagValue(field("costtype"), ctx));
    set("castTime", numeric("cast time"));
    set("targetRange", numeric("target range"));
    set("range", numeric("range"));
    set("attackRange", numeric("attack range"));
    set("effectRadius", numeric("effect radius"));
    set("innerRadius", numeric("inner radius"));
    set("width", numeric("width"));
    set("speed", numeric("speed"));
    set("angle", numeric("angle"));
    set("collisionRadius", numeric("collision radius") ?? numeric("collisionradius"));
    set("tetherRadius", numeric("tether radius"));

    for (const [name, count] of ctx.unknown) unknownTemplates.set(name, (unknownTemplates.get(name) ?? 0) + count);
    records.push(record);
  }
  records.sort((a, b) => a.champion.localeCompare(b.champion) || a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
  legacy.sort((a, b) => a.title.localeCompare(b.title));
  return { records, legacy, unknownTemplates, warnings };
}
