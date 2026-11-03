/**
 * Reading a rune's wiki data for its simulator effects (runes/modules/<rune>.ts), the way items
 * and summoner spells read theirs (items/context.ts, summoners/context.ts).
 *
 * Every number a rune effect uses comes from its record in the rune catalog
 * (data/<dataset>/rune-catalog.json, built from each rune's wiki data template and article):
 * numbers written into its description or notes, named by quoting the words around them;
 * values for melee and for ranged champions; and values that depend on level, read at level 20.
 * A quote that is no longer in the wiki's text makes the rune fail to build. Everything read is
 * recorded as evidence, and every simplification as an assumption.
 */
import type { Series } from "../engine/abilities";
import { numbersIn } from "../engine/kits/context";
import { TOP_LANE_MAX_LEVEL } from "../engine/stats";
import type { RulePage } from "../pipeline/items/records";
import type { RuneCatalog, RuneEntry, ShardOption } from "../pipeline/runeCatalog/records";

export class RuneDataError extends Error {
  constructor(rune: string, message: string) {
    super(`${rune}: ${message}`);
    this.name = "RuneDataError";
  }
}

export interface RuneEvidence {
  rune: string;
  page: string;
  revid: number;
  text: string;
}

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

/**
 * A series at level 20 (items/context.ts reads item series the same way): a series that stops
 * at level 18 gives its level-18 value, which `assume` records.
 */
export function valueAt20(series: Series, what: string, fail: (message: string) => never, assume: (text: string) => void = () => {}): number {
  switch (series.kind) {
    case "constant":
      return series.value;
    case "level": {
      const value = series.values[TOP_LANE_MAX_LEVEL - 1];
      if (value !== undefined) return value;
      const last = series.values.at(-1);
      if (last === undefined) fail(`${what} has no level values`);
      assume(`${what} has no value past level ${series.values.length}; its level-${series.values.length} value is used at 20.`);
      return last;
    }
    case "variable": {
      if (/^level$/i.test(series.variable.trim())) {
        const value = series.values[series.points.indexOf(TOP_LANE_MAX_LEVEL)];
        if (typeof value === "number") return value;
      }
      return fail(`${what} depends on ${series.variable}, with no value at level ${TOP_LANE_MAX_LEVEL}; read it with a quote`);
    }
    case "rank":
      return fail(`${what} is by rank; runes have none`);
  }
}

/** What a rune's text and notes say, for its module; or a stat shard's (`shard`). */
export class RuneData {
  readonly name: string;
  /** What the rune's effects are labeled with in fights: its name, unless one of the kit's abilities has that name. */
  readonly label: string;

  constructor(
    readonly record: RuneEntry | (ShardOption & { notes?: undefined }),
    readonly context: RuneContext,
    reserved: ReadonlySet<string> = new Set(),
    private readonly page: { title: string; revid: number },
  ) {
    this.name = record.name;
    this.label = reserved.has(record.name) ? `${record.name} (rune)` : record.name;
  }

  private fail(message: string): never {
    throw new RuneDataError(this.name, message);
  }

  private note(page: { title: string; revid: number }, text: string): void {
    this.context.record(this.name, page.title, page.revid, text);
  }

  /** The description, its further paragraphs included, whitespace normalized. */
  get text(): string {
    return normalize(this.record.text);
  }

  /** Asserts the words are in the rune's description, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    if (!this.text.includes(wanted)) this.fail(`the wiki no longer says "${wanted}"`);
    this.note(this.page, wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase. */
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

  /** Asserts the words are in one of the article's notes, verbatim; records them as evidence. */
  noted(words: string): string {
    const wanted = normalize(words);
    const notes = this.record.notes ?? [];
    if (!notes.some((note) => normalize(note).includes(wanted))) this.fail(`the article's notes no longer say "${wanted}"`);
    if ("article" in this.record) this.note(this.record.article, wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase of the notes. */
  notedNumber(words: string, index = 0): number {
    const quote = this.noted(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }

  /** The `index`-th value template (0-based) in the description's sentence containing `context`, at level 20. */
  level(context: string, index = 0): number {
    const wanted = normalize(context);
    const value = this.record.values.filter((v) => v.context.includes(wanted))[index];
    if (!value) this.fail(`no value ${index + 1} in a sentence containing "${wanted}"`);
    this.note(this.page, value.context);
    return valueAt20(value.series, `"${wanted}"`, (message) => this.fail(message), (text) => this.assume(text));
  }

  /** The cooldown in seconds, at level 20 when it depends on level, as the template gives it. */
  cooldown(): number {
    const text = "cooldown" in this.record ? this.record.cooldown : undefined;
    if (text === undefined) this.fail("no cooldown");
    const numbers = numbersIn(text);
    // "20 – 6.58823529412 (based on level)": the last is level 20's.
    const value = /based on level/.test(text) ? numbers.at(-1) : numbers.length === 1 ? numbers[0] : undefined;
    if (value === undefined) this.fail(`no cooldown in seconds (the template gives "${text}")`);
    this.note(this.page, `cooldown: ${text}`);
    return value;
  }

  /** A rule page runes follow (the Rune article, adaptive force). */
  rule(title: string): RuneRule {
    return this.context.rule(title, this.name);
  }

  /** Records a simplification the rune makes, under its name. */
  assume(text: string): void {
    this.context.assume(`${this.name}: ${text}`);
  }
}

/** A wiki rule page runes follow. */
export class RuneRule {
  constructor(
    readonly page: RulePage,
    private readonly context: RuneContext,
    private readonly rune: string,
  ) {}

  quote(words: string): string {
    const wanted = normalize(words);
    if (!normalize(this.page.text).includes(wanted)) throw new RuneDataError(this.rune, `${this.page.title}: the wiki no longer says "${wanted}"`);
    this.context.record(this.rune, this.page.title, this.page.revid, wanted);
    return wanted;
  }

  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) throw new RuneDataError(this.rune, `${this.page.title}: no number ${index + 1} in "${quote}"`);
    return value;
  }
}

/** Reads the runes of one rune page for one fighter, and keeps what they read and assumed. */
export class RuneContext {
  readonly evidence: RuneEvidence[] = [];
  readonly assumptions: string[] = [];
  private sealed = false;

  constructor(readonly catalog: RuneCatalog) {}

  seal(): void {
    this.sealed = true;
  }

  record(rune: string, page: string, revid: number, text: string): void {
    if (this.sealed) throw new Error(`${rune} reads "${text}" from ${page} during a fight; read it while building the rune`);
    if (!this.evidence.some((entry) => entry.rune === rune && entry.page === page && entry.text === text)) this.evidence.push({ rune, page, revid, text });
  }

  rule(title: string, rune: string): RuneRule {
    const page = this.catalog.rulePages.find((candidate) => candidate.title === title);
    if (!page) throw new RuneDataError(rune, `the catalog holds no rule page "${title}" (has: ${this.catalog.rulePages.map((r) => r.title).join(", ")})`);
    return new RuneRule(page, this, rune);
  }

  /** A rune's data, for a kit whose abilities have the `reserved` names. */
  rune(record: RuneEntry, reserved?: ReadonlySet<string>): RuneData {
    return new RuneData(record, this, reserved, record.template);
  }

  /** A stat shard's data: its text is the Rune article's shard table. */
  shard(option: ShardOption): RuneData {
    const article = this.catalog.rulePages.find((page) => page.title === "Rune");
    if (!article) throw new RuneDataError(option.name, "the catalog holds no Rune article");
    return new RuneData(option, this, new Set(), article);
  }

  assume(text: string): void {
    if (!this.assumptions.includes(text)) this.assumptions.push(text);
  }
}
