/**
 * Reads base stats from a character's game data file (CommunityDragon's JSON form of
 * the game's .bin). Only values the file states explicitly are returned: the game
 * omits fields equal to their defaults, and those defaults aren't documented.
 * Values are converted to the wiki's conventions (regeneration per 5 seconds,
 * windup as a share of the attack time).
 */
import type { LevelInterpolation } from "../../engine/levelScaling";
import type { StatPath } from "../../engine/statPaths";

export interface GameRecordStats {
  /** Stats the file states explicitly. */
  stated: Partial<Record<StatPath, number>>;
  /** 0 = mana, 1 = energy; other values are resources the wiki models differently. */
  resourceType: number | undefined;
  windupSource: "castTime" | "offset" | undefined;
  /** Level-scaled attack cast time that replaces the fixed one (Senna). */
  castTimeByLevel: LevelInterpolation | undefined;
  attackTotalTime: number | undefined;
}

type Json = Record<string, unknown>;

const DEFAULT_WINDUP_PERCENT = 0.3;
const REGEN_SECONDS = 5;

/** Fields stored as { baseValue } or as plain numbers in the root CharacterRecord. */
const RECORD_FIELDS: ReadonlyArray<readonly [StatPath, string, number?]> = [
  ["hp.base", "baseHPModifiable"],
  ["hp.perLevel", "hpPerLevelModifiable"],
  ["hpRegen.base", "baseStaticHPRegenModifiable", REGEN_SECONDS],
  ["hpRegen.perLevel", "hpRegenPerLevelModifiable", REGEN_SECONDS],
  ["armor.base", "baseArmorModifiable"],
  ["armor.perLevel", "armorPerLevelModifiable"],
  ["magicResist.base", "baseMR"],
  ["magicResist.perLevel", "mrPerLevel"],
  ["attackDamage.base", "baseDamageModifiable"],
  ["attackDamage.perLevel", "damagePerLevelModifiable"],
  ["attackSpeed.base", "attackSpeedModifiable"],
  ["attackSpeed.ratio", "attackSpeedRatioModifiable"],
  ["attackSpeed.bonusPerLevel", "attackSpeedPerLevelModifiable"],
  ["attackRange", "attackRangeModifiable"],
  ["moveSpeed", "baseMoveSpeedModifiable"],
  ["gameplayRadius", "overrideGameplayCollisionRadius"],
  ["pathingRadius", "pathfindingCollisionRadius"],
  ["selectionRadius", "selectionRadius"],
];

/** Resource fields by readable name, or by the hash CommunityDragon shows when the name is unknown. */
const RESOURCE_FIELDS: ReadonlyArray<readonly [StatPath, readonly string[], number?]> = [
  ["resource.base", ["arBase", "{726ee5cd}"]],
  ["resource.perLevel", ["arPerLevel", "{6216bf7b}"]],
  ["resourceRegen.base", ["arBaseStaticRegen", "{c4ab3550}"], REGEN_SECONDS],
  ["resourceRegen.perLevel", ["arRegenPerLevel", "{3a509002}"], REGEN_SECONDS],
];

function isObject(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A number the game stores either plainly or as { baseValue }; undefined when absent. */
function read(record: Json, key: string): number | undefined {
  const value = record[key];
  if (typeof value === "number") return value;
  if (isObject(value) && typeof value.baseValue === "number") return value.baseValue;
  return undefined;
}

export function findRootRecord(bin: unknown, name: string): Json {
  if (!isObject(bin)) throw new Error(`Game data for ${name} is not an object`);
  for (const [path, value] of Object.entries(bin)) {
    if (path.endsWith("/CharacterRecords/Root") && isObject(value) && value.__type === "CharacterRecord") return value;
  }
  throw new Error(`Game data for ${name} has no root CharacterRecord`);
}

function levelInterpolation(calculation: unknown): LevelInterpolation | undefined {
  if (!isObject(calculation) || !Array.isArray(calculation.mFormulaParts)) return undefined;
  const [part, ...rest] = calculation.mFormulaParts as unknown[];
  if (rest.length > 0 || !isObject(part) || part.__type !== "ByCharLevelInterpolationCalculationPart") {
    throw new Error("Unsupported attack cast time formula");
  }
  return {
    start: Number(part.mStartValue ?? 0),
    end: Number(part.mEndValue ?? 0),
    scalePastMaxLevel: part.mScalePastDefaultMaxLevel === true,
  };
}

export function parseCharacterRecord(bin: unknown, name: string): GameRecordStats {
  const record = findRootRecord(bin, name);
  const stated: Partial<Record<StatPath, number>> = {};
  for (const [path, key, scale = 1] of RECORD_FIELDS) {
    const value = read(record, key);
    if (value !== undefined) stated[path] = value * scale;
  }

  const resource = isObject(record.primaryAbilityResource) ? record.primaryAbilityResource : {};
  const resourceType = read(resource, "arType");
  for (const [path, keys, scale = 1] of RESOURCE_FIELDS) {
    const value = keys.map((key) => read(resource, key)).find((v) => v !== undefined);
    if (value !== undefined) stated[path] = value * scale;
  }

  const attack = isObject(record.basicAttack) ? record.basicAttack : {};
  const castTime = read(attack, "mAttackCastTime");
  const totalTime = read(attack, "mAttackTotalTime");
  const offset = read(attack, "mAttackDelayCastOffsetPercent");
  let windupSource: GameRecordStats["windupSource"];
  if (castTime !== undefined && totalTime !== undefined) {
    stated["windup.percent"] = castTime / totalTime;
    windupSource = "castTime";
  } else if (offset !== undefined) {
    stated["windup.percent"] = DEFAULT_WINDUP_PERCENT + offset;
    windupSource = "offset";
  }
  const modifier = read(attack, "mAttackDelayCastOffsetPercentAttackSpeedRatio");
  if (modifier !== undefined) stated["windup.modifier"] = modifier;

  const override = isObject(attack.mOverrideAutoattackCastTime) ? attack.mOverrideAutoattackCastTime : undefined;
  return {
    stated,
    resourceType,
    windupSource,
    castTimeByLevel: levelInterpolation(override?.mOverrideAutoattackCastTimeCalculation),
    attackTotalTime: totalTime,
  };
}
