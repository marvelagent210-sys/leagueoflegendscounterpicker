/**
 * Reading an item's wiki data for its simulator effects (items/modules/<item>.ts), the way kits
 * read their abilities (engine/kits/context.ts).
 *
 * Every number an item effect uses comes from its record in the item catalog
 * (data/<dataset>/items.json, built from the wiki's Module:ItemData/data):
 * - the shop stats, by the wiki's stat key ("ad", "crit");
 * - numbers written into an effect's description, named by quoting the words around them;
 * - values that depend on level ("175 – 253 (based on level)"), read at level 20.
 *
 * A quote that is no longer in the wiki's text makes the item fail to build, so a patch can't
 * leave an item effect silently out of date. Everything read is recorded as evidence, and
 * every simplification an item makes is recorded as an assumption.
 */
import type { Series } from "../engine/abilities";
import { numbersIn } from "../engine/kits/context";
import { TOP_LANE_MAX_LEVEL } from "../engine/stats";
import type { ItemEffect, ItemRecord } from "../pipeline/items/records";

export class ItemDataError extends Error {
  constructor(item: string, message: string) {
    super(`${item}: ${message}`);
    this.name = "ItemDataError";
  }
}

export interface ItemEvidence {
  item: string;
  /** The effect's name, or its slot when it has none ("pass3"). */
  effect?: string;
  page: string;
  revid: number;
  /** The stat, quote or value that was read. */
  text: string;
}

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

/** Which item effect a name or slot means: "Spellblade", or "pass2" for an unnamed one. */
function findEffect(record: ItemRecord, nameOrSlot: string): ItemEffect | undefined {
  const named = record.effects.filter((effect) => effect.name === nameOrSlot);
  if (named.length > 1) throw new ItemDataError(record.name, `two effects named "${nameOrSlot}"; pick one by slot`);
  return named[0] ?? record.effects.find((effect) => effect.slot === nameOrSlot);
}

/** One effect of an item: a passive or an active. */
export class ItemEffectData {
  readonly name: string;

  constructor(
    readonly effect: ItemEffect,
    readonly item: ItemData,
  ) {
    this.name = effect.name ?? effect.slot;
  }

  private fail(message: string): never {
    throw new ItemDataError(this.item.name, `${this.name}: ${message}`);
  }

  private note(text: string): void {
    this.item.context.record(this.item.name, this.name, text);
  }

  /** The description, its notes included, whitespace normalized. */
  get text(): string {
    return normalize(this.effect.text);
  }

  /** Asserts the words are in the effect's description, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    if (!this.text.includes(wanted)) this.fail(`the wiki no longer says "${wanted}"`);
    this.note(wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase: quoted("slows them by 25% for 1.5 seconds", 1) is 1.5. */
  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }

  /**
   * A value the wiki gives for melee and for ranged champions: the phrase quoted holds
   * "<melee> (melee) / <ranged> (ranged)", and `index` picks the pair when it holds several.
   */
  meleeRanged(words: string, index = 0): { melee: number; ranged: number } {
    const quote = this.quote(words);
    const pairs = [...quote.matchAll(/(-?\d[\d,]*(?:\.\d+)?)%? \(melee\) \/ (-?\d[\d,]*(?:\.\d+)?)%? \(ranged\)/g)];
    const pair = pairs[index];
    if (!pair) this.fail(`no "(melee) / (ranged)" pair ${index + 1} in "${quote}"`);
    return { melee: Number(pair[1]!.replace(/,/g, "")), ranged: Number(pair[2]!.replace(/,/g, "")) };
  }

  /** The `index`-th value template (0-based) in the sentence containing `context`, at level 20. */
  level(context: string, index = 0): number {
    const wanted = normalize(context);
    const values = this.effect.values.filter((value) => value.context.includes(wanted));
    const value = values[index];
    if (!value) this.fail(`no value ${index + 1} in a sentence containing "${wanted}"`);
    this.note(value.context);
    return this.item.context.at20(value.series, `${this.item.name}: ${this.name}: "${wanted}"`, (message) => this.fail(message));
  }

  /**
   * The raw series of the `index`-th value template in the sentence containing `context`, for
   * values that depend on something other than level (stacks, missing health).
   */
  series(context: string, index = 0): Series {
    const wanted = normalize(context);
    const value = this.effect.values.filter((v) => v.context.includes(wanted))[index];
    if (!value) this.fail(`no value ${index + 1} in a sentence containing "${wanted}"`);
    this.note(value.context);
    return value.series;
  }

  /** The cooldown in seconds, as the wiki's cooldown field gives it. */
  cooldown(): number {
    const text = this.effect.cooldown;
    if (text === undefined || !/^\s*\d+(?:\.\d+)?\s*$/.test(text)) this.fail(`no cooldown in seconds (the wiki gives "${text ?? "none"}")`);
    this.note(`cooldown: ${text}`);
    return Number(text);
  }

  /** An active's range, as the wiki's range field gives it. */
  range(): number {
    const text = this.effect.range;
    const value = text === undefined ? undefined : numbersIn(text);
    if (!value || value.length !== 1 || value[0] === undefined) this.fail(`no single range (the wiki gives "${text ?? "none"}")`);
    this.note(`range: ${text}`);
    return value[0];
  }
}

/** One item's record, for its module. */
export class ItemData {
  readonly name: string;

  constructor(
    readonly record: ItemRecord,
    readonly context: ItemContext,
  ) {
    this.name = record.name;
  }

  private fail(message: string): never {
    throw new ItemDataError(this.name, message);
  }

  /** A shop stat by the wiki's key ("ad", "as" in percent). */
  stat(key: string): number {
    const value = this.record.stats[key];
    if (value === undefined) this.fail(`no ${key} stat (has: ${Object.keys(this.record.stats).join(", ") || "none"})`);
    this.context.record(this.name, undefined, `${key}: ${value}`);
    return value;
  }

  /** An effect by its name ("Spellblade") or, for an unnamed one, its slot ("pass2"). */
  effect(nameOrSlot: string): ItemEffectData {
    const effect = findEffect(this.record, nameOrSlot);
    if (!effect) this.fail(`no effect "${nameOrSlot}" (has: ${this.record.effects.map((e) => e.name ?? e.slot).join(", ") || "none"})`);
    return new ItemEffectData(effect, this);
  }

  /** Records a simplification the item makes, under its name. */
  assume(text: string): void {
    this.context.assume(`${this.name}: ${text}`);
  }

  /** Whether the wiki tags the item ("OnHitAppliesLifeSteal"); recorded as evidence. */
  tagged(tag: string): boolean {
    const has = this.record.tags.includes(tag);
    this.context.record(this.name, undefined, `tags: ${this.record.tags.join(", ") || "none"}`);
    return has;
  }
}

/** Where an item build's data comes from, for its evidence. */
export interface ItemSource {
  page: string;
  revid: number;
}

/** Reads the items of one build for one fighter, and keeps what they read and assumed. */
export class ItemContext {
  readonly evidence: ItemEvidence[] = [];
  readonly assumptions: string[] = [];
  private sealed = false;

  constructor(readonly source: ItemSource) {}

  /** Ends reading: items read the wiki while they are built, never during a fight. */
  seal(): void {
    this.sealed = true;
  }

  record(item: string, effect: string | undefined, text: string): void {
    if (this.sealed) throw new Error(`${item} reads "${text}" from the wiki during a fight; read it while building the item`);
    this.evidence.push({ item, ...(effect ? { effect } : {}), page: this.source.page, revid: this.source.revid, text });
  }

  item(record: ItemRecord): ItemData {
    return new ItemData(record, this);
  }

  /** Records a simplification an item makes. */
  assume(text: string): void {
    if (!this.assumptions.includes(text)) this.assumptions.push(text);
  }

  /** A series at level 20 (engine/kits/context.ts reads ability series the same way). */
  at20(series: Series, what: string, fail: (message: string) => never): number {
    switch (series.kind) {
      case "constant":
        return series.value;
      case "rank": {
        const value = series.values.at(-1);
        if (value === undefined) fail(`${what} has no values`);
        return value;
      }
      case "level": {
        const value = series.values[TOP_LANE_MAX_LEVEL - 1];
        if (value !== undefined) return value;
        const last = series.values.at(-1);
        if (last === undefined) fail(`${what} has no level values`);
        this.assume(`${what} has no value past level ${series.values.length}; its level-${series.values.length} value is used at 20.`);
        return last;
      }
      case "variable": {
        // Values by level band ("150 / 155 / ... (based on level)"): the band level 20 falls in.
        if (/^level$/i.test(series.variable.trim())) {
          let value: number | undefined;
          series.points.forEach((point, i) => {
            const v = series.values[i];
            if (typeof point === "number" && point <= TOP_LANE_MAX_LEVEL && typeof v === "number") value = v;
          });
          if (value !== undefined) return value;
        }
        return fail(`${what} depends on ${series.variable}; read it with a quote instead`);
      }
    }
  }
}
