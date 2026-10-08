/**
 * Reads ability data from a character's game data file: per-rank cooldowns and costs of
 * the Q/W/E/R spells, and every value the game scales by champion level, evaluated at
 * levels 1-20 with the game's own rules.
 */
import type { AbilityKind } from "../../engine/abilities";
import { growthFactor } from "../../engine/stats";

type Json = Record<string, unknown>;

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function numbers(value: unknown): number[] | undefined {
  return Array.isArray(value) && value.every((v) => typeof v === "number") ? (value as number[]) : undefined;
}

function num(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

export interface LevelScaledValue {
  /** Internal spell and calculation names, e.g. "DariusHemoMarker" / "NoxianMightAD". */
  spell: string;
  calculation: string;
  kind: "interpolation" | "breakpoints" | "table";
  /** Values at levels 1-20; index 0 is level 1. */
  values: number[];
  /** How the game defines it, e.g. "linear 30 → 230 over levels 1-18, continues past 18". */
  rule: string;
}

export interface GameAbility {
  /** Internal ability name, e.g. "DariusCleaveAbility". */
  name: string;
  kind: AbilityKind;
  /** The root spell's cooldown by rank: cooldowns[r] is rank r (index 0 is unused). */
  cooldowns: number[] | undefined;
  /** The root spell's cost by rank: costs[r - 1] is rank r. */
  costs: number[] | undefined;
  castTime: number | undefined;
  levelScaling: LevelScaledValue[];
}

const LEVELS = 20;
const DEFAULT_MAX_LEVEL = 18;

/** Linear from level 1 to 18, or along the stat growth curve; past 18 unless the game says not to. */
function interpolation(part: Json): { values: number[]; rule: string } {
  const start = num(part.mStartValue) ?? 0;
  const end = num(part.mEndValue) ?? 0;
  // The game writes this flag only when it is false, so absent means the value keeps scaling.
  const scalesPast = part.mScalePastDefaultMaxLevel !== false;
  const curve = part.mScaleByStatProgressionMultiplier === true;
  const values: number[] = [];
  for (let level = 1; level <= LEVELS; level++) {
    const effective = scalesPast ? level : Math.min(level, DEFAULT_MAX_LEVEL);
    const progress = curve ? growthFactor(effective) / growthFactor(DEFAULT_MAX_LEVEL) : (effective - 1) / (DEFAULT_MAX_LEVEL - 1);
    values.push(start + (end - start) * progress);
  }
  const shape = curve ? "along the stat growth curve" : "linear";
  return {
    values,
    rule: `${shape} ${clean(start)} → ${clean(end)} over levels 1-18, ${scalesPast ? "continues past 18" : "stops at 18"}`,
  };
}

/** A level-1 value, bonuses added at given levels, and per-level bonuses that start at given levels. */
function breakpoints(part: Json): { values: number[]; rule: string } {
  const points = (Array.isArray(part.mBreakpoints) ? part.mBreakpoints : []).filter(isObject);
  let value = num(part.mLevel1Value) ?? 0;
  let perLevel = num(part.mInitialBonusPerLevel) ?? 0;
  const values = [value];
  for (let level = 2; level <= LEVELS; level++) {
    for (const point of points) {
      if (num(point.mLevel) !== level) continue;
      if (point.mBonusPerLevelAtAndAfter !== undefined) perLevel = num(point.mBonusPerLevelAtAndAfter) ?? 0;
      value += num(point.mAdditionalBonusAtThisLevel) ?? 0;
    }
    value += perLevel;
    values.push(value);
  }
  const listed = points.map((p) => num(p.mLevel)).filter((l): l is number => l !== undefined);
  return { values, rule: `breakpoints at levels ${listed.join(", ") || "none"} (level 1: ${clean(values[0] ?? 0)})` };
}

/** An explicit value per level; the table starts at level 0. */
function table(part: Json): { values: number[]; rule: string } | undefined {
  const all = numbers(part.values);
  if (!all || all.length < LEVELS + 1) return undefined;
  return { values: all.slice(1, LEVELS + 1), rule: `table of values per level (${all.length - 1} levels)` };
}

function clean(value: number): number {
  return Number(value.toPrecision(6));
}

function levelParts(value: unknown, found: Json[]): void {
  if (Array.isArray(value)) {
    for (const item of value) levelParts(item, found);
  } else if (isObject(value)) {
    if (typeof value.__type === "string" && value.__type.startsWith("ByCharLevel")) found.push(value);
    for (const item of Object.values(value)) levelParts(item, found);
  }
}

function levelScalingOf(spellName: string, spell: Json): LevelScaledValue[] {
  const calculations = isObject(spell.mSpellCalculations) ? spell.mSpellCalculations : {};
  const result: LevelScaledValue[] = [];
  for (const [calculation, body] of Object.entries(calculations)) {
    const parts: Json[] = [];
    levelParts(body, parts);
    for (const part of parts) {
      const type = part.__type;
      const evaluated =
        type === "ByCharLevelInterpolationCalculationPart"
          ? { kind: "interpolation" as const, ...interpolation(part) }
          : type === "ByCharLevelBreakpointsCalculationPart"
            ? { kind: "breakpoints" as const, ...breakpoints(part) }
            : type === "ByCharLevelFormulaCalculationPart"
              ? (() => {
                  const t = table(part);
                  return t ? { kind: "table" as const, ...t } : undefined;
                })()
              : undefined;
      if (evaluated) result.push({ spell: spellName, calculation, ...evaluated });
    }
  }
  return result;
}

const SLOT_KINDS: readonly AbilityKind[] = ["Q", "W", "E", "R"];

export function readGameAbilities(bin: unknown): GameAbility[] {
  if (!isObject(bin)) return [];
  const root = Object.entries(bin).find(
    ([path, value]) => path.endsWith("/CharacterRecords/Root") && isObject(value) && value.__type === "CharacterRecord",
  )?.[1];
  if (!isObject(root)) return [];
  const spellNames = Array.isArray(root.spellNames) ? root.spellNames.map(String) : [];
  const abilities: GameAbility[] = [];
  const covered = new Set<string>();
  for (const [path, value] of Object.entries(bin)) {
    if (!isObject(value) || value.__type !== "AbilityObject") continue;
    const rootSpellPath = String(value.mRootSpell ?? "");
    const slotIndex = spellNames.findIndex((name) => rootSpellPath.endsWith(`/${name}`));
    const kind: AbilityKind =
      slotIndex >= 0 ? (SLOT_KINDS[slotIndex] as AbilityKind) : value.mType === 3 ? "I" : value.mType === 2 ? "R" : "other";
    const children = Array.isArray(value.mChildSpells) ? value.mChildSpells.map(String) : [];
    const spellPaths = [...new Set([rootSpellPath, ...children])];
    for (const spellPath of spellPaths) covered.add(spellPath);
    const rootSpell = isObject(bin[rootSpellPath]) ? (bin[rootSpellPath] as Json).mSpell : undefined;
    const levelScaling = spellPaths.flatMap((spellPath) => {
      const spell = isObject(bin[spellPath]) ? (bin[spellPath] as Json).mSpell : undefined;
      return isObject(spell) ? levelScalingOf(spellPath.slice(spellPath.lastIndexOf("/") + 1), spell) : [];
    });
    abilities.push({
      name: String(value.mName ?? path.slice(path.lastIndexOf("/") + 1)),
      kind,
      cooldowns: isObject(rootSpell) ? numbers(rootSpell.cooldownTime) : undefined,
      costs: isObject(rootSpell) ? numbers(rootSpell.mana) : undefined,
      castTime: isObject(rootSpell) ? num(rootSpell.mCastTime) : undefined,
      levelScaling,
    });
  }
  // Buffs and helper spells outside any ability object also hold level-based values (often innates').
  const others = Object.entries(bin).flatMap(([path, value]) =>
    !covered.has(path) && isObject(value) && isObject(value.mSpell)
      ? levelScalingOf(path.slice(path.lastIndexOf("/") + 1), value.mSpell)
      : [],
  );
  if (others.length > 0) {
    abilities.push({ name: "(other spells)", kind: "other", cooldowns: undefined, costs: undefined, castTime: undefined, levelScaling: others });
  }
  return abilities;
}
