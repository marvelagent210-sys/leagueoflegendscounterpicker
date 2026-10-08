import type { LevelInterpolation } from "./levelScaling";

/** A stat that grows with champion level: value = base + perLevel * growthFactor(level). */
export interface StatGrowth {
  base: number;
  perLevel: number;
}

export interface AttackSpeedStats {
  /** Attack speed at level 1 with no bonuses (attacks per second). */
  base: number;
  /** Multiplier applied to every source of bonus attack speed. */
  ratio: number;
  /** Bonus attack speed gained per level, in percent, before the growth curve. */
  bonusPerLevel: number;
}

export interface WindupStats {
  /** Share of the attack's total time spent winding up (0-1). */
  percent: number;
  /** How strongly bonus attack speed shortens the windup (1 = fully). */
  modifier: number;
  /** Which game value the percent was derived from. */
  source: "castTime" | "offset" | "default";
  /**
   * Set when the game overrides the attack cast time by level (Senna). The windup
   * percent is then castTime(level) / attackTotalTime.
   */
  castTimeByLevel?: LevelInterpolation;
  attackTotalTime?: number;
}

/** Base statistics of one champion form (most champions have exactly one form). */
export interface FormStats {
  hp: StatGrowth;
  /** Health regeneration per 5 seconds. */
  hpRegen: StatGrowth;
  /** Mana, energy or other resource pool; zero for resourceless champions. */
  resource: StatGrowth;
  /** Resource regeneration per 5 seconds. */
  resourceRegen: StatGrowth;
  armor: StatGrowth;
  magicResist: StatGrowth;
  attackDamage: StatGrowth;
  attackSpeed: AttackSpeedStats;
  attackRange: number;
  moveSpeed: number;
  windup: WindupStats;
  /** Multiplier on critical strike damage (1 for most champions). */
  critDamageModifier: number;
  /** Basic attack missile speed, for ranged attacks. */
  missileSpeed?: number;
  /** Collision radius used by skillshots and attack range checks. */
  gameplayRadius: number;
  pathingRadius?: number;
  selectionRadius?: number;
}

/** A base stat where the game files' value replaced the wiki's. */
export interface StatOverride {
  /** Dotted path into FormStats, e.g. "attackDamage.perLevel". */
  stat: string;
  /** The wiki's value; null when the wiki has no equivalent. */
  wiki: number | null;
  game: number | LevelInterpolation;
}

export interface ChampionForm {
  /** Stable id, e.g. "gnar" or "mega-gnar". */
  id: string;
  /** Wiki name of the form, e.g. "Mega Gnar" or "Kled & Skaarl". */
  name: string;
  stats: FormStats;
  /** Stats taken from the game files instead of the wiki. */
  overrides: StatOverride[];
}

export type AbilitySlot = "Q" | "W" | "E" | "R";

export interface Champion {
  /** Data Dragon id, e.g. "MonkeyKing". */
  id: string;
  /** Numeric champion key, e.g. 62. */
  key: number;
  name: string;
  title: string;
  /** Resource type as the wiki names it, e.g. "Mana", "Energy", "Fury", "None". */
  resource: string;
  rangeType: "Melee" | "Ranged";
  adaptiveType: "Physical" | "Magic";
  /** Lanes the game client suggests, e.g. ["Top"]. Used only to order lists. */
  positions: string[];
  /** Wiki class roles, e.g. ["Juggernaut"]. */
  roles: string[];
  /** Patch of the champion's most recent change, e.g. "26.20". */
  lastChanged: string;
  /** Maximum ranks per slot. */
  maxRanks: Record<AbilitySlot, number>;
  /** Data Dragon icon file name. */
  icon: string;
  /** The champion's forms; the first is the form it starts the game in. */
  forms: ChampionForm[];
}

/** The committed champion file for one patch: data/<dataset>/champions.json. */
export interface ChampionDataset {
  /** Data Dragon major.minor, e.g. "16.20". */
  dataset: string;
  /** Player-facing patch, e.g. "26.20". */
  patch: string;
  champions: Champion[];
}
