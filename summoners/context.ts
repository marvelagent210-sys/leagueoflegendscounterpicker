/**
 * Reading a summoner spell's wiki data for its simulator effects (summoners/modules/<spell>.ts),
 * the way items read theirs (items/context.ts).
 *
 * Every number a spell effect uses comes from its record in the spell catalog
 * (data/<dataset>/summoners.json, built from the wiki's Module:SpellData/data and each spell's
 * article): numbers written into its effect or its article's notes, named by quoting the words
 * around them, and values that depend on level, read at level 20. The rules spells follow come
 * from the catalog's rule pages. A quote that is no longer in the wiki's text makes the spell
 * fail to build, so a patch can't leave a spell effect silently out of date. Everything read is
 * recorded as evidence, and every simplification a spell makes as an assumption.
 */
import type { Series } from "../engine/abilities";
import { numbersIn } from "../engine/kits/context";
import { TOP_LANE_MAX_LEVEL } from "../engine/stats";
import type { RulePage } from "../pipeline/items/records";
import type { SpellCatalog, SpellRecord } from "../pipeline/summoners/records";

export class SpellDataError extends Error {
  constructor(spell: string, message: string) {
    super(`${spell}: ${message}`);
    this.name = "SpellDataError";
  }
}

export interface SpellEvidence {
  spell: string;
  page: string;
  revid: number;
  /** The quote or value that was read. */
  text: string;
}

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

/** One spell's record, for its module. */
export class SpellData {
  readonly name: string;
  /**
   * What the spell's effects are labeled with in fights, to tell its damage from the kit's: its
   * name, unless one of the kit's abilities has that name.
   */
  readonly label: string;

  constructor(
    readonly record: SpellRecord,
    readonly context: SpellContext,
    reserved: ReadonlySet<string> = new Set(),
  ) {
    this.name = record.name;
    this.label = reserved.has(record.name) ? `${record.name} (summoner spell)` : record.name;
  }

  private fail(message: string): never {
    throw new SpellDataError(this.name, message);
  }

  private note(page: { title: string; revid: number }, text: string): void {
    this.context.record(this.name, page.title, page.revid, text);
  }

  private get dataPage(): { title: string; revid: number } {
    return this.context.catalog.sources.spellData;
  }

  /** The effect, its further paragraphs included, whitespace normalized. */
  get text(): string {
    return normalize(this.record.text);
  }

  /** Asserts the words are in the spell's effect, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    if (!this.text.includes(wanted)) this.fail(`the wiki no longer says "${wanted}"`);
    this.note(this.dataPage, wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase of the effect. */
  quoted(words: string, index = 0): number {
    const quote = this.quote(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }

  /** Asserts the words are in one of the article's notes, verbatim; records them as evidence. */
  noted(words: string): string {
    const wanted = normalize(words);
    if (!this.record.notes.some((note) => normalize(note).includes(wanted))) this.fail(`the article's notes no longer say "${wanted}"`);
    this.note(this.record.article, wanted);
    return wanted;
  }

  /** The `index`-th number (0-based) in a quoted phrase of the notes. */
  notedNumber(words: string, index = 0): number {
    const quote = this.noted(words);
    const value = numbersIn(quote)[index];
    if (value === undefined) this.fail(`no number ${index + 1} in "${quote}"`);
    return value;
  }

  /** The `index`-th value template (0-based) in the effect's sentence containing `context`, at level 20. */
  level(context: string, index = 0): number {
    return this.valueAt20(this.record.values, this.dataPage, context, index);
  }

  /** The `index`-th value template (0-based) in the notes' sentence containing `context`, at level 20. */
  noteLevel(context: string, index = 0): number {
    return this.valueAt20(this.record.noteValues, this.record.article, context, index);
  }

  private valueAt20(values: SpellRecord["values"], page: { title: string; revid: number }, context: string, index: number): number {
    const wanted = normalize(context);
    const value = values.filter((v) => v.context.includes(wanted))[index];
    if (!value) this.fail(`no value ${index + 1} in a sentence containing "${wanted}"`);
    this.note(page, value.context);
    return at20(value.series, `${this.name}: "${wanted}"`, (message) => this.fail(message));
  }

  /** The cooldown in seconds, as the wiki's spell data gives it. */
  cooldown(): number {
    this.note(this.dataPage, `cooldown: ${this.record.cooldown}`);
    return this.record.cooldown;
  }

  /** The range, as the wiki's spell data gives it ("650", "400 (Quick cast)"). */
  range(): number {
    const value = numbersIn(this.record.range)[0];
    if (value === undefined) this.fail(`no range in units (the wiki gives "${this.record.range}")`);
    this.note(this.dataPage, `range: ${this.record.range}`);
    return value;
  }

  /** A rule page the spell follows (which crowd control stops it, what it gets past). */
  rule(title: string): SpellRule {
    return this.context.rule(title, this.name);
  }

  /** Records a simplification the spell makes, under its name. */
  assume(text: string): void {
    this.context.assume(`${this.name}: ${text}`);
  }
}

/** A wiki rule page summoner spells follow (Template:Tip data/Cast-inhibiting crowd control). */
export class SpellRule {
  constructor(
    readonly page: RulePage,
    private readonly context: SpellContext,
    private readonly spell: string,
  ) {}

  /** Asserts the words are on the rule page, verbatim; records them as evidence. */
  quote(words: string): string {
    const wanted = normalize(words);
    if (!normalize(this.page.text).includes(wanted)) throw new SpellDataError(this.spell, `${this.page.title}: the wiki no longer says "${wanted}"`);
    this.context.record(this.spell, this.page.title, this.page.revid, wanted);
    return wanted;
  }
}

/** A series at level 20 (items/context.ts reads item series the same way). */
function at20(series: Series, what: string, fail: (message: string) => never): number {
  switch (series.kind) {
    case "constant":
      return series.value;
    case "level": {
      const value = series.values[TOP_LANE_MAX_LEVEL - 1];
      if (value === undefined) fail(`${what} has no value at level ${TOP_LANE_MAX_LEVEL}`);
      return value;
    }
    case "variable": {
      if (/^level$/i.test(series.variable.trim())) {
        const at = series.points.indexOf(TOP_LANE_MAX_LEVEL);
        const value = series.values[at];
        if (at >= 0 && typeof value === "number") return value;
      }
      return fail(`${what} depends on ${series.variable}, with no value at level ${TOP_LANE_MAX_LEVEL}`);
    }
    case "rank":
      return fail(`${what} is by rank; summoner spells have none`);
  }
}

/** Reads the summoner spells of one fighter, and keeps what they read and assumed. */
export class SpellContext {
  readonly evidence: SpellEvidence[] = [];
  readonly assumptions: string[] = [];
  private sealed = false;

  constructor(readonly catalog: SpellCatalog) {}

  /** Ends reading: spells read the wiki while they are built, never during a fight. */
  seal(): void {
    this.sealed = true;
  }

  record(spell: string, page: string, revid: number, text: string): void {
    if (this.sealed) throw new Error(`${spell} reads "${text}" from ${page} during a fight; read it while building the spell`);
    if (!this.evidence.some((entry) => entry.spell === spell && entry.page === page && entry.text === text)) this.evidence.push({ spell, page, revid, text });
  }

  /** A rule page the catalog holds. */
  rule(title: string, spell: string): SpellRule {
    const page = this.catalog.rulePages.find((candidate) => candidate.title === title);
    if (!page) throw new SpellDataError(spell, `the catalog holds no rule page "${title}" (has: ${this.catalog.rulePages.map((r) => r.title).join(", ") || "none"})`);
    return new SpellRule(page, this, spell);
  }

  /** A spell's data, for a kit whose abilities have the `reserved` names. */
  spell(record: SpellRecord, reserved?: ReadonlySet<string>): SpellData {
    return new SpellData(record, this, reserved);
  }

  /** Records a simplification a spell makes. */
  assume(text: string): void {
    if (!this.assumptions.includes(text)) this.assumptions.push(text);
  }
}
