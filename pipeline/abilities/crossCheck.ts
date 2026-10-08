/**
 * Checks ability records against the game files and extends level-based values to
 * levels 19-20 using the game's own formulas.
 */
import type { AbilityKind, AbilityRecord, Series } from "../../engine/abilities";
import type { GameAbility, LevelScaledValue } from "./gameSpells";

export interface ValueCheck {
  champion: string;
  ability: string;
  kind: AbilityKind;
  field: "cooldown" | "cost";
  wiki: number[];
  game: number[];
  matches: boolean;
}

export interface LevelLink {
  champion: string;
  ability: string;
  /** Where the series sits, e.g. "Physical Damage" or "stun duration". */
  where: string;
  outcome: "extended" | "confirmed" | "differs" | "ambiguous" | "no match";
  /** The game formula used or compared against. */
  rule: string | undefined;
  /** Values at levels 18, 19 and 20 after linking. */
  at18to20: Array<number | undefined>;
}

const SLOTS: readonly AbilityKind[] = ["Q", "W", "E", "R"];
const SCALES = [1, 100, 0.01];

function close(a: number, b: number): boolean {
  return Math.abs(a - b) <= Math.max(0.006, 1e-3 * Math.abs(b));
}

/** The wiki record for a slot: the one the game client names, else the first of that kind. */
function primaryRecord(records: AbilityRecord[], kind: AbilityKind, clientName: string | undefined): AbilityRecord | undefined {
  const names = (clientName ?? "").split(" / ").map((n) => n.trim().toLowerCase());
  const ofKind = records.filter((record) => record.kind === kind);
  return ofKind.find((record) => names.includes(record.name.toLowerCase())) ?? ofKind[0];
}

function perRank(series: Series | undefined, ranks: number): number[] | undefined {
  if (!series) return undefined;
  if (series.kind === "constant") return Array.from({ length: ranks }, () => series.value);
  if (series.kind === "rank") return series.values;
  return undefined;
}

export function checkValues(
  records: AbilityRecord[],
  game: GameAbility[],
  clientNames: ReadonlyArray<string | undefined>,
): ValueCheck[] {
  const checks: ValueCheck[] = [];
  SLOTS.forEach((kind, index) => {
    const record = primaryRecord(records, kind, clientNames[index]);
    const gameAbility = game.find((ability) => ability.kind === kind);
    if (!record || !gameAbility) return;
    const cooldown = perRank(record.fields.cooldown?.values[0]?.series, record.ranks);
    // A root spell with a near-zero cooldown hands its real cooldown to another system
    // (charges, ammo, a resource such as Rengar's Ferocity), so it isn't comparable.
    const comparableCooldowns = gameAbility.cooldowns?.slice(1).some((value) => value > 0.25);
    if (cooldown && gameAbility.cooldowns && comparableCooldowns) {
      const gameValues = gameAbility.cooldowns.slice(1, cooldown.length + 1);
      checks.push({
        champion: record.champion,
        ability: record.name,
        kind,
        field: "cooldown",
        wiki: cooldown,
        game: gameValues,
        matches: cooldown.every((value, i) => gameValues[i] !== undefined && close(value, gameValues[i] as number)),
      });
    }
    const cost = perRank(record.fields.cost?.values[0]?.series, record.ranks);
    // The game's cost array is mana or energy; other costs (health, stacks) live elsewhere.
    const manaOrEnergy = /mana|energy/i.test(record.fields.costType ?? "");
    if (cost && manaOrEnergy && gameAbility.costs && gameAbility.costs.some((value) => value !== 0)) {
      const gameValues = gameAbility.costs.slice(0, cost.length);
      checks.push({
        champion: record.champion,
        ability: record.name,
        kind,
        field: "cost",
        wiki: cost,
        game: gameValues,
        matches: cost.every((value, i) => gameValues[i] !== undefined && close(value, gameValues[i] as number)),
      });
    }
  });
  return checks;
}

type LevelSeries = Extract<Series, { kind: "level" }>;

/** Every level series in a record, with a description of where it sits. */
function levelSeriesOf(record: AbilityRecord): Array<{ series: LevelSeries; where: string }> {
  const found: Array<{ series: LevelSeries; where: string }> = [];
  const add = (series: Series | undefined, where: string) => {
    if (series?.kind === "level") found.push({ series, where });
  };
  for (const part of record.parts) {
    for (const stat of part.leveling) {
      add(stat.amount.base, stat.label);
      for (const term of stat.amount.scaling) {
        add(term.ratio, `${stat.label} ratio (${term.stat})`);
        for (const modifier of term.modifiers ?? []) add(modifier.ratio, `${stat.label} modifier (${modifier.stat})`);
      }
    }
    for (const mechanic of part.mechanics) {
      add(mechanic.duration, `${mechanic.type} duration`);
      add(mechanic.amount, `${mechanic.type} amount`);
    }
    for (const value of part.values) add(value.series, `description: ${value.context.slice(0, 80)}`);
  }
  for (const [name, field] of Object.entries(record.fields)) {
    if (typeof field === "object") for (const value of field.values) add(value.series, name);
  }
  return found;
}

/** Game formulas whose level-1 and level-18 values match the series, with the scale that matches. */
function candidates(series: LevelSeries, scaling: LevelScaledValue[]): Array<{ value: LevelScaledValue; scale: number }> {
  const first = series.values[0];
  const at18 = series.values[17];
  if (first === undefined || at18 === undefined || first === at18) return [];
  const matches: Array<{ value: LevelScaledValue; scale: number }> = [];
  for (const value of scaling) {
    for (const scale of SCALES) {
      const g1 = (value.values[0] ?? NaN) * scale;
      const g18 = (value.values[17] ?? NaN) * scale;
      if (close(first, g1) && close(at18, g18)) matches.push({ value, scale });
    }
  }
  return matches;
}

/**
 * Links each level series to a game formula. Series that stop at 18 are extended to 20
 * when exactly one formula (or several that agree) matches; series the wiki already
 * defines to 20 are compared at level 20.
 */
export function linkLevelSeries(records: AbilityRecord[], game: GameAbility[]): LevelLink[] {
  const scaling = game.flatMap((ability) => ability.levelScaling);
  const links: LevelLink[] = [];
  for (const record of records) {
    for (const { series, where } of levelSeriesOf(record)) {
      if (series.values.length < 18) continue;
      const found = candidates(series, scaling);
      const at19 = new Set(found.map(({ value, scale }) => Number(((value.values[18] ?? 0) * scale).toPrecision(6))));
      const at20 = new Set(found.map(({ value, scale }) => Number(((value.values[19] ?? 0) * scale).toPrecision(6))));
      const base = { champion: record.champion, ability: record.name, where };
      if (found.length === 0) {
        links.push({ ...base, outcome: "no match", rule: undefined, at18to20: [series.values[17], series.values[18], series.values[19]] });
        continue;
      }
      const [first] = found;
      const rule = first ? `${first.value.spell}.${first.value.calculation}: ${first.value.rule}` : undefined;
      if (at19.size > 1 || at20.size > 1) {
        links.push({ ...base, outcome: "ambiguous", rule, at18to20: [series.values[17], undefined, undefined] });
        continue;
      }
      const g19 = [...at19][0] as number;
      const g20 = [...at20][0] as number;
      if (series.values.length >= 20) {
        const agrees = close(series.values[19] as number, g20) && close(series.values[18] as number, g19);
        links.push({ ...base, outcome: agrees ? "confirmed" : "differs", rule, at18to20: [series.values[17], g19, g20] });
        continue;
      }
      series.values = [...series.values.slice(0, 18), g19, g20];
      series.past18 = "game files";
      links.push({ ...base, outcome: "extended", rule, at18to20: [series.values[17], g19, g20] });
    }
  }
  return links;
}
