/**
 * Reading a champion's wiki ability data for its simulator kit (kits/champions/<id>.ts).
 *
 * Every number a kit uses comes from the ability records (data/<dataset>/abilities/), read at
 * level 20 with every ability at its maximum rank:
 * - leveling values by their label ("Physical Damage"), with their ratios as a formula;
 * - fields (cooldown, cast time, range, width, speed, radius), by label when there are several;
 * - numbers written into the descriptions, named by quoting the words around them.
 *
 * A label or quote that is no longer on the wiki page makes the kit fail to build, so a patch
 * can't leave a kit silently out of date. Everything read is recorded as evidence, and every
 * simplification a kit makes is recorded as an assumption, for its kit page.
 */
import type { AbilityKind, AbilityRecord, Amount, PetRecord, RuneRecord, ScalingTerm, Series } from "../abilities";
import type { Formula, StatRef } from "../sim/spec";
import { TOP_LANE_MAX_LEVEL } from "../stats";
import type { Champion } from "../types";

export class KitDataError extends Error {
  constructor(champion: string, ability: string, message: string) {
    super(`${champion} kit, ${ability}: ${message}`);
    this.name = "KitDataError";
  }
}

export interface KitEvidence {
  ability: string;
  page: string;
  revid: number;
  /** The label, field or quote that was read. */
  text: string;
  /** Exact versioned URL for non-wiki evidence; wiki evidence uses its page and revision. */
  url?: string;
  sourceVersion?: string;
  sourceSha256?: string;
}

/** Which wiki stat each scaling term reads, as a simulator stat. */
const STAT_REFS: Record<string, StatRef> = {
  AD: "AD",
  bonusAD: "bonusAD",
  AP: "AP",
  maxHealth: "maxHP",
  bonusHealth: "bonusHP",
  missingHealth: "missingHP",
  currentHealth: "currentHP",
  maxMana: "maxMana",
  currentMana: "currentMana",
  missingMana: "missingMana",
  armor: "armor",
  bonusArmor: "bonusArmor",
  MR: "MR",
  bonusMR: "bonusMR",
  bonusMoveSpeed: "bonusMoveSpeed",
  lethality: "lethality",
  targetMaxHealth: "targetMaxHP",
  targetMissingHealth: "targetMissingHP",
  targetCurrentHealth: "targetCurrentHP",
  targetBonusHealth: "targetBonusHP",
  targetMaxMana: "targetMaxMana",
  targetCurrentMana: "targetCurrentMana",
  targetMissingMana: "targetMissingMana",
  targetArmor: "targetArmor",
  targetMR: "targetMR",
  targetBonusArmor: "targetBonusArmor",
  targetBonusMR: "targetBonusMR",
};

/** Field names of ability records that hold numbers. */
export type NumberField =
  | "cooldown"
  | "staticCooldown"
  | "targetCooldown"
  | "recharge"
  | "cost"
  | "castTime"
  | "targetRange"
  | "range"
  | "attackRange"
  | "effectRadius"
  | "innerRadius"
  | "width"
  | "speed"
  | "angle"
  | "collisionRadius"
  | "tetherRadius";

/** Fields whose full wording, rather than a parsed numeric series, defines the rule. */
export type TextField = "costType" | "cooldownStart";

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

/** All numbers in a piece of text, in order ("1,050" and "0.5" included). */
export function numbersIn(text: string): number[] {
  return [...text.matchAll(/(?<![\w.])-?\d[\d,]*(?:\.\d+)?/g)].map((m) => Number(m[0].replace(/,/g, "")));
}

export class AbilityData {
  readonly name: string;
  readonly kind: AbilityKind;
  /** Rank at level 20: every ability is maxed by level 18 (Udyr's ranks are a choice, see atRank). */
  readonly rank: number;

  constructor(
    readonly record: AbilityRecord,
    private readonly kit: KitContext,
    rank = record.ranks,
  ) {
    this.name = record.name;
    this.kind = record.kind;
    if (!Number.isInteger(rank) || rank < 1 || rank > record.ranks) throw new KitDataError(record.champion, record.name, `no rank ${rank} (it has ${record.ranks})`);
    this.rank = rank;
  }

  /** The same ability read at another rank (Udyr's rank split leaves some ranks empty). */
  atRank(rank: number): AbilityData {
    return new AbilityData(this.record, this.kit, rank);
  }

  private fail(message: string): never {
    throw new KitDataError(this.record.champion, this.name, message);
  }

  private note(text: string, page = this.record.page): void {
    this.kit.checkOpen(`${this.name}: ${text}`);
    this.kit.evidence.push({ ability: this.name, page: page.title, revid: page.revid, text });
  }

  /** A series at level 20 and this ability's maximum rank. */
  at20(series: Series | undefined, what: string): number {
    if (!series) this.fail(`${what} has no value`);
    switch (series.kind) {
      case "constant":
        return series.value;
      case "rank": {
        const value = series.values[this.rank - 1] ?? series.values.at(-1);
        if (value === undefined) this.fail(`${what} has no rank values`);
        return value;
      }
      case "level": {
        const value = series.values[TOP_LANE_MAX_LEVEL - 1];
        if (value !== undefined) return value;
        const last = series.values.at(-1);
        if (last === undefined) this.fail(`${what} has no level values`);
        this.kit.assume(`${this.name}: ${what} has no value past level ${series.values.length}; its level-${series.values.length} value is used at 20.`);
        return last;
      }
      case "variable": {
        // Values by level band ("5 / 6.5 / ... (based on level)"): the band level 20 falls in.
        if (/^level$/i.test(series.variable.trim())) {
          let value: number | undefined;
          series.points.forEach((point, i) => {
            const v = series.values[i];
            if (typeof point === "number" && point <= TOP_LANE_MAX_LEVEL && typeof v === "number") value = v;
          });
          if (value !== undefined) return value;
        }
        this.fail(`${what} depends on ${series.variable}; read it with a quote instead`);
      }
    }
  }

  /** A numeric field at level 20; `label` picks one of several labeled values (by substring). */
  field(name: NumberField, label?: string): number {
    const field = this.record.fields[name];
    if (!field || typeof field !== "object") this.fail(`no ${name} field`);
    // "none", "false" and blank cast times are instant.
    if (name === "castTime" && /^\s*(none|false|n\/a)?\s*$/i.test(field.text)) {
      this.note(`${name}: none`);
      return 0;
    }
    const values = label ? field.values.filter((v) => v.label?.toLowerCase().includes(label.toLowerCase())) : field.values;
    if (values.length === 0) this.fail(`no ${name} value${label ? ` labeled "${label}"` : ""} in "${field.text}"`);
    if (!label && values.length > 1) this.fail(`${name} has several values ("${field.text}"); pick one by label`);
    this.note(`${name}${label ? ` (${label})` : ""}: ${field.text}`);
    return this.at20(values[0]?.series, name);
  }

  /** Every number written in a field's text, for fields the parser keeps only part of ("50 - 400"). */
  fieldNumbers(name: NumberField): number[] {
    const field = this.record.fields[name];
    if (!field || typeof field !== "object") this.fail(`no ${name} field`);
    this.note(`${name}: ${field.text}`);
    return numbersIn(field.text);
  }

  /** A text-only field, recorded verbatim as evidence; missing or blank rules fail closed. */
  textField(name: TextField): string {
    const field = this.record.fields[name];
    if (typeof field !== "string" || normalize(field) === "") this.fail(`no ${name} text field`);
    this.note(`${name}: ${field}`);
    return field;
  }

  /** Every value of a field at level 20, in order (a cost with a separate ratio, for example). */
  fieldValues(name: NumberField): number[] {
    const field = this.record.fields[name];
    if (!field || typeof field !== "object") this.fail(`no ${name} field`);
    this.note(`${name}: ${field.text}`);
    return field.values.map((v) => this.at20(v.series, name));
  }

  /** The raw series of a number in the description that depends on something else ("based on missing health"). */
  seriesIn(context: string, index = 0): Series {
    const wanted = normalize(context);
    const values = this.record.parts.flatMap((p) => p.values).filter((v) => normalize(v.context).includes(wanted));
    const value = values[index];
    if (!value) this.fail(`no value in a sentence containing "${wanted}"`);
    this.note(normalize(value.context));
    return value.series;
  }

  cooldown(label?: string): number {
    return this.field("cooldown", label);
  }

  castTime(label?: string): number {
    if (!this.record.fields.castTime) return 0;
    return this.field("castTime", label);
  }

  cost(): number {
    return this.record.fields.cost ? this.field("cost") : 0;
  }

  /** The `occurrence`-th (0-based) leveling value with this label: recasts often repeat one ("Magic Damage"). */
  private leveling(label: string, occurrence = 0): Amount {
    const wanted = label.toLowerCase();
    let seen = 0;
    for (const part of this.record.parts) {
      for (const stat of part.leveling) if (stat.label.toLowerCase() === wanted && seen++ === occurrence) {
        this.note(`${stat.label}: ${stat.amount.text}`);
        return stat.amount;
      }
    }
    const labels = this.record.parts.flatMap((p) => p.leveling.map((l) => l.label));
    return this.fail(`no value labeled "${label}" (has: ${labels.join(", ") || "none"})`);
  }

  /** A leveling value without ratios, at level 20 ("Stun Duration": 1.5; "Slow": 60 for 60%). */
  number(label: string): number {
    const amount = this.leveling(label);
    if (amount.scaling.length > 0 || amount.baseStat) this.fail(`"${label}" scales with stats; read it with formula()`);
    return this.at20(amount.base, label);
  }

  /** The base of a leveling value, leaving out its ratios, for kits that apply the ratios themselves (stacks). */
  baseOf(label: string): number {
    const amount = this.leveling(label);
    return this.at20(amount.base, label);
  }

  /** A percentage leveling value as a fraction ("Slow: 60%" is 0.6). */
  fraction(label: string): number {
    return this.number(label) / 100;
  }

  /** A leveling value with its ratios, at level 20; `occurrence` picks among values sharing the label. */
  formula(label: string, occurrence = 0): Formula {
    const amount = this.leveling(label, occurrence);
    return this.amountFormula(amount, label);
  }

  /**
   * A leveling value's base and the ratios of the listed stats only, for values that also show
   * terms of another ability that the kit adds as their own hit (Tongue Lash's "+ [An Acquired Taste …]").
   */
  formulaPart(label: string, stats: StatRef[]): Formula {
    const amount = this.leveling(label);
    const formula: Formula = { base: amount.base ? this.at20(amount.base, label) : 0 };
    for (const term of amount.scaling) {
      const ref = STAT_REFS[term.stat];
      if (!ref || !stats.includes(ref) || term.modifiers?.length) continue;
      formula.ratios = { ...formula.ratios, [ref]: (formula.ratios?.[ref] ?? 0) + this.at20(term.ratio, `${label} ${term.text}`) / 100 };
    }
    for (const stat of stats) if (formula.ratios?.[stat] === undefined) this.fail(`"${label}" has no ${stat} ratio`);
    return formula;
  }

  private amountFormula(amount: Amount, label: string): Formula {
    if (amount.unparsed) this.fail(`"${label}" has text the parser didn't understand: "${amount.unparsed}"`);
    const formula: Formula = { base: 0 };
    const add = (ref: StatRef, ratio: number) => {
      formula.ratios = { ...formula.ratios, [ref]: (formula.ratios?.[ref] ?? 0) + ratio };
    };
    const base = amount.base ? this.at20(amount.base, label) : 0;
    const baseStat = amount.baseStat ? this.statRef(amount.baseStat, label) : undefined;
    if (baseStat) add(baseStat, base / 100);
    else formula.base = base;
    for (const term of amount.scaling) this.addTerm(formula, add, term, baseStat, label);
    return formula;
  }

  private addTerm(formula: Formula, add: (ref: StatRef, ratio: number) => void, term: ScalingTerm, baseStat: StatRef | undefined, label: string): void {
    const ratio = this.at20(term.ratio, `${label} ${term.text}`) / 100;
    const per100 = /^per100:(.+)$/.exec(term.stat);
    if (per100?.[1]) {
      // "(+ 1% per 100 AP)" of a percentage of another stat: a product of both.
      if (!baseStat) this.fail(`"${label}" has "${term.text}" without a stat it is a percentage of`);
      const by = this.statRef(per100[1], label);
      formula.products = [...(formula.products ?? []), { ratio: ratio / 100, stats: [by, baseStat] }];
      return;
    }
    const ref = this.statRef(term.stat, label);
    add(ref, ratio);
    for (const modifier of term.modifiers ?? []) {
      const mod = /^per100:(.+)$/.exec(modifier.stat);
      if (!mod?.[1]) this.fail(`"${label}" has an unsupported modifier "${modifier.text}"`);
      const modRatio = this.at20(modifier.ratio, `${label} ${modifier.text}`) / 100;
      formula.products = [...(formula.products ?? []), { ratio: modRatio / 100, stats: [this.statRef(mod[1], label), ref] }];
    }
  }

  private statRef(stat: string, label: string): StatRef {
    const ref = STAT_REFS[stat];
    if (!ref) this.fail(`"${label}" scales with "${stat}", which the simulator doesn't read`);
    return ref;
  }

  /** Each independently attributed source; a quote must be present within one source. */
  private get textSources(): Array<{ page: { title: string; revid: number }; text: string }> {
    return [
      {
        page: this.record.page,
        text: normalize([
          ...this.record.parts.flatMap((p) => [p.text, ...p.leveling.map((l) => `${l.label}: ${l.amount.text}`)]),
          ...this.record.notes,
          ...this.record.custom.map((c) => `${c.label}: ${c.text}`),
        ].join(" \n ")),
      },
      ...(this.record.sources ?? []).map((source) => ({ page: source.page, text: normalize(source.text.join(" \n ")) })),
    ];
  }

  /** The ability's description, notes and supplemental source text, whitespace normalized. */
  get text(): string {
    return normalize(this.textSources.map((source) => source.text).join(" \n "));
  }

  /** A leveling value that is a percentage of one stat ("30% armor"), as a fraction. */
  shareOf(label: string): number {
    const formula = this.formula(label);
    const ratios = Object.values(formula.ratios ?? {});
    if (formula.base !== 0 || ratios.length !== 1 || formula.products) this.fail(`"${label}" is not a plain percentage of one stat`);
    return ratios[0] ?? 0;
  }

  /** Asserts the words are in the ability's description or notes, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    const source = this.textSources.find((entry) => entry.text.includes(wanted));
    if (!source) this.fail(`the wiki no longer says "${wanted}"`);
    this.note(wanted, source.page);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase: quoted("gains 35% bonus movement speed") is 35. */
  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }

  /** A verbatim excerpt of an explicitly versioned game file, with its own attribution. */
  gameQuote(words: string, object?: string): string {
    const wanted = normalize(words);
    if (!wanted) this.fail("a game evidence quote cannot be blank");
    const source = this.record.gameSources?.find((entry) => (object === undefined || entry.object === object) && normalize(entry.text.join(" \n ")).includes(wanted));
    if (!source) this.fail(`the pinned game data no longer says "${wanted}"`);
    const patch = typeof source.version === "string" ? /^(\d+\.\d+)(?:\.|$)/.exec(source.version)?.[1] : undefined;
    if (!patch || typeof source.object !== "string" || !source.object.trim() || typeof source.url !== "string" || !source.url.startsWith(`https://raw.communitydragon.org/${patch}/`) || typeof source.sha256 !== "string" || !/^[a-f0-9]{64}$/i.test(source.sha256)) {
      this.fail(`incomplete game source attribution for "${wanted}"`);
    }
    this.kit.checkOpen(`${this.name}: ${wanted}`);
    this.kit.evidence.push({
      ability: this.name,
      page: source.object,
      revid: 0,
      text: wanted,
      url: source.url,
      sourceVersion: source.version,
      sourceSha256: source.sha256,
    });
    return wanted;
  }

  /** The index-th number in a strictly pinned game-file excerpt. */
  gameQuoted(words: string, index = 0, object?: string): number {
    const quote = this.gameQuote(words, object);
    // JSON commas separate values; unlike prose, "280,280" is never a thousands separator.
    const values = [...quote.matchAll(/(?<![\w.])-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g)].map((match) => Number(match[0]));
    const value = values[index];
    if (value === undefined) this.fail(`no number ${index + 1} in game excerpt "${quote}"`);
    return value;
  }

  /** The tooltip on these words in the description: tip("ground") is "400 radius" (numbers the wiki keeps in tooltips). */
  tip(shown: string): string {
    const wanted = normalize(shown);
    const tips = this.record.parts.flatMap((p) => p.tips ?? []);
    const found = tips.find((t) => normalize(t.text) === wanted) ?? tips.find((t) => normalize(t.text).includes(wanted));
    if (!found) this.fail(`no tooltip on "${wanted}"`);
    this.note(`"${wanted}" (tooltip: ${found.tip})`);
    return found.tip;
  }

  /** The `index`-th number (0-based) in the tooltip on these words: tipped("ground") is 400. */
  tipped(shown: string, index = 0): number {
    const tip = this.tip(shown);
    const value = numbersIn(tip)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in the tooltip "${tip}"`);
    return value;
  }

  /** A number written into the description that depends on level ("13 – 30 (based on level)"), at level 20. */
  levelValue(context: string, index = 0): number {
    const wanted = normalize(context);
    const values = this.record.parts.flatMap((p) => p.values).filter((v) => normalize(v.context).includes(wanted));
    const value = values[index];
    if (!value) this.fail(`no level-based value in a sentence containing "${wanted}"`);
    this.note(normalize(value.context));
    return this.at20(value.series, `"${wanted}"`);
  }

  /** The wiki's interaction flag as the simulator's: true, false, or undefined for "special" and unset. */
  flag(name: "projectile" | "spellShield" | "parry" | "knockdown" | "grounded" | "silence"): boolean | undefined {
    const value = this.record.flags[name];
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
  }
}

/**
 * A pet of the champion (a turret, a Mist Walker, a Tentacle), read from the pet infobox on
 * its wiki page at level 20. Values by ability rank are read at the ability's maximum rank.
 */
export class PetData {
  readonly name: string;

  constructor(
    readonly record: PetRecord,
    private readonly kit: KitContext,
  ) {
    this.name = record.name;
  }

  private fail(message: string): never {
    throw new KitDataError(this.record.champion, this.name, message);
  }

  private note(text: string): void {
    this.kit.checkOpen(`${this.name}: ${text}`);
    this.kit.evidence.push({ ability: this.name, page: this.record.page.title, revid: this.record.page.revid, text });
  }

  private at20(series: Series | undefined, what: string): number {
    if (!series) this.fail(`${what} has no value`);
    switch (series.kind) {
      case "constant":
        return series.value;
      case "rank": {
        const value = series.values.at(-1);
        if (value === undefined) this.fail(`${what} has no rank values`);
        return value;
      }
      case "level": {
        const value = series.values[TOP_LANE_MAX_LEVEL - 1];
        if (value !== undefined) return value;
        const last = series.values.at(-1);
        if (last === undefined) this.fail(`${what} has no level values`);
        this.kit.assume(`${this.name}: ${what} has no value past level ${series.values.length}; its level-${series.values.length} value is used at 20.`);
        return last;
      }
      case "variable": {
        if (/^level$/i.test(series.variable.trim())) {
          let value: number | undefined;
          series.points.forEach((point, i) => {
            const v = series.values[i];
            if (typeof point === "number" && point <= TOP_LANE_MAX_LEVEL && typeof v === "number") value = v;
          });
          if (value !== undefined) return value;
        }
        this.fail(`${what} depends on ${series.variable}`);
      }
    }
  }

  /** The `index`-th value of a numeric infobox field (hp, damage, armor, attackspeed, ...) at level 20. */
  stat(field: string, index = 0): number {
    const found = this.record.fields[field];
    if (!found) this.fail(`no ${field} field (has: ${Object.keys(this.record.fields).join(", ")})`);
    const value = found.values[index];
    if (!value) this.fail(`${field} has no value ${index + 1} in "${found.text}"`);
    this.note(`${field}: ${found.text}`);
    return this.at20(value.series, field);
  }

  /** Every text field, whitespace normalized. */
  get text(): string {
    return normalize(Object.values(this.record.text).join(" \n "));
  }

  /** Asserts the words are in the pet's infobox, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    if (!this.text.includes(wanted)) this.fail(`the wiki no longer says "${wanted}"`);
    this.note(wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase. */
  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }
}

/**
 * A rune's data (Triple Tonic): its description, what consuming each item it grants does, and
 * its article's patch history, which can be newer than the item data.
 */
export class RuneData {
  readonly name: string;

  constructor(
    readonly record: RuneRecord,
    private readonly kit: KitContext,
  ) {
    this.name = record.name;
  }

  /** Each source's text, whitespace normalized, with the page it comes from. */
  private get sources(): Array<{ page: { title: string; revid: number }; text: string }> {
    const { record } = this;
    return [
      { page: record.page, text: normalize(record.text.join(" \n ")) },
      ...record.items.map((item) => ({ page: item.page, text: normalize(`${item.name}: ${item.consume}`) })),
      ...(record.article ? [{ page: record.article, text: normalize(record.history.map((h) => `${h.patch}: ${h.text}`).join(" \n ")) }] : []),
    ];
  }

  /** Asserts the words are in the rune's description, an item's effect or the patch history, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    const source = this.sources.find((s) => s.text.includes(wanted));
    if (!source) throw new KitDataError(this.kit.champion.id, this.name, `the wiki no longer says "${wanted}"`);
    this.kit.checkOpen(`${this.name}: ${wanted}`);
    this.kit.evidence.push({ ability: this.name, page: source.page.title, revid: source.page.revid, text: wanted });
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase. */
  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) throw new KitDataError(this.kit.champion.id, this.name, `no number ${index + 1} in "${quote}"`);
    return value;
  }
}

export class KitContext {
  readonly evidence: KitEvidence[] = [];
  readonly assumptions: string[] = [];
  private readonly byName = new Map<string, AbilityData>();
  private sealed = false;

  /**
   * Ends reading: kits read the wiki while they are built, never during a fight (a read in a
   * hook would parse the data again on every tick).
   */
  seal(): void {
    this.sealed = true;
  }

  /** Throws if the kit is reading the wiki after it was built. */
  checkOpen(what: string): void {
    if (this.sealed) throw new Error(`${this.champion.id} kit reads ${what} from the wiki during a fight; read it while building the kit`);
  }

  constructor(
    readonly champion: Champion,
    readonly records: AbilityRecord[],
    readonly pets: PetRecord[] = [],
    readonly runes: RuneRecord[] = [],
  ) {}

  /** A rune the simulator models, by name ("Triple Tonic"). */
  rune(name: string): RuneData {
    const record = this.runes.find((r) => r.name === name);
    if (!record) throw new KitDataError(this.champion.id, name, `no such rune (has: ${this.runes.map((r) => r.name).join(", ") || "none"})`);
    return new RuneData(record, this);
  }

  /** A pet of the champion by its infobox name ("H-28G Evolution Turret"). */
  pet(name: string): PetData {
    const record = this.pets.find((p) => p.name === name);
    if (!record) throw new KitDataError(this.champion.id, name, `no such pet (has: ${this.pets.map((p) => p.name).join(", ") || "none"})`);
    return new PetData(record, this);
  }

  /** An ability by its name ("Decisive Strike") or slot ("Q", "W", "E", "R", "I" for the innate). */
  ability(nameOrSlot: string): AbilityData {
    const cached = this.byName.get(nameOrSlot);
    if (cached) return cached;
    const bySlot = /^[IQWER]$/.test(nameOrSlot) ? this.records.filter((r) => r.kind === nameOrSlot) : [];
    const matches = bySlot.length > 0 ? bySlot : this.records.filter((r) => r.name === nameOrSlot);
    if (matches.length !== 1 || !matches[0]) {
      const names = this.records.map((r) => `${r.kind} ${r.name}`).join(", ");
      throw new KitDataError(this.champion.id, nameOrSlot, matches.length === 0 ? `no such ability (has: ${names})` : `ambiguous (${matches.map((r) => r.name).join(", ")})`);
    }
    const data = new AbilityData(matches[0], this);
    this.byName.set(nameOrSlot, data);
    return data;
  }

  /** Records a simplification the kit makes, shown on its kit page. */
  assume(text: string): void {
    if (!this.assumptions.includes(text)) this.assumptions.push(text);
  }
}
