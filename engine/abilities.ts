/** Ability records: what each ability does, as read from the wiki's ability data pages. */

/** Q/W/E/R, "I" for innate (passive) abilities, "A" for basic attack pages. */
export type AbilityKind = "I" | "Q" | "W" | "E" | "R" | "A" | "other";

/** A number, or numbers indexed by ability rank, champion level, or another variable. */
export type Series =
  | { kind: "constant"; value: number }
  /** One value per ability rank, rank 1 first. */
  | { kind: "rank"; values: number[] }
  /**
   * One value per champion level, level 1 first. `past18` says where values for levels
   * 19-20 come from; without it the series stops at level 18 and 19-20 are unknown.
   */
  | { kind: "level"; values: number[]; past18?: "wiki" | "game files" }
  /** Values at breakpoints of another variable, e.g. stacks or bonus attack speed. */
  | { kind: "variable"; variable: string; points: Array<number | string>; values: Array<number | string> };

export interface ScalingTerm {
  /**
   * What the ratio multiplies: "AD", "bonusAD", "AP", "maxHealth", "bonusHealth",
   * "targetMaxHealth", "per100:bonusAD" and so on; "other:<phrase>" when unrecognized.
   */
  stat: string;
  /** In percent: 105 means 105%. Negative for "(- x%)". */
  ratio: Series;
  /** As written, e.g. "(+ 105% AD)". */
  text: string;
  /**
   * Terms that scale this term's ratio, e.g. Ambessa's "(+ 3% (+ 1.5% per 100 bonus AD)
   * of target's maximum health)" has a per100:bonusAD modifier on the max-health ratio.
   */
  modifiers?: ScalingTerm[];
}

export interface Amount {
  /** Display text, e.g. "50 / 80 / 110 / 140 / 170 (+ 100% AD)". */
  text: string;
  base: Series | undefined;
  /** "%", "s" or "units" when the text puts a unit right after the base. */
  unit: string | undefined;
  /** For a percentage base, the stat it is a percentage of, e.g. "targetMaxHealth". */
  baseStat?: string;
  scaling: ScalingTerm[];
  /** Text that wasn't understood; empty when everything was. */
  unparsed: string;
}

export interface LevelingStat {
  /** e.g. "Physical Damage", "Stun Duration". */
  label: string;
  amount: Amount;
}

export type MechanicCategory = "control" | "movement" | "defense" | "vision" | "offense" | "other";

export interface Mechanic {
  /** Canonical type, e.g. "stun", "airborne", "dash", "shield", "untargetable", "on-hit". */
  type: string;
  category: MechanicCategory;
  /** The words the wiki uses, e.g. "knocked up" for an airborne effect. */
  wording: string;
  /** Seconds, when the sentence states a duration ("for 1.5 seconds"). */
  duration: Series | undefined;
  /** Percent, for slows and similar ("slowed by 25%"). */
  amount: Series | undefined;
  /** The sentence it was read from. */
  evidence: string;
  /**
   * True when the sentence mentions the effect as a condition rather than applying it,
   * e.g. "if Akali is grounded". Heuristic; verified per champion later.
   */
  conditional: boolean;
}

export interface AbilityPart {
  /** The section label, e.g. "Active", "Passive", "Recast", "Gathering Storm Bonus". */
  label: string | undefined;
  text: string;
  leveling: LevelingStat[];
  mechanics: Mechanic[];
  /**
   * Numbers written into the description itself (common for innates), each with the
   * sentence around it, e.g. 30 – 230 (based on level) in "Darius gains … bonus AD".
   */
  values: Array<{ series: Series; context: string }>;
  /** Tooltips in the description: the words shown and the tooltip's text ("ground": "400 radius"). */
  tips?: Array<{ text: string; tip: string }>;
}

export interface NumericValue {
  series: Series;
  /** What the value measures when the field has several, e.g. "Thrust range". */
  label: string | undefined;
}

export interface NumericField {
  text: string;
  values: NumericValue[];
}

/**
 * The wiki's interaction flags. Values are lowercase as the wiki writes them, typically
 * "true", "false" or "special"; undefined when the page leaves the field empty.
 */
export interface AbilityFlags {
  targeting: string[];
  affects: string[];
  damageType: string[];
  spellEffects: string | undefined;
  /** Blocked by spell shields. */
  spellShield: string | undefined;
  /** Can be intercepted (Yasuo's Wind Wall and the like). */
  projectile: string | undefined;
  /** How parries, dodges and blinds treat it. */
  parry: string | undefined;
  /** Disabled while grounded. */
  grounded: string | undefined;
  /** Usable while knocked down. */
  knockdown: string | undefined;
  /** Usable while silenced. */
  silence: string | undefined;
  onHitEffects: string | undefined;
}

export interface AbilityRecord {
  /** Data Dragon id of the champion. */
  champion: string;
  kind: AbilityKind;
  name: string;
  /** Wiki page and revision the record was read from. */
  page: { title: string; revid: number };
  /** Curated historical template retained as an archive, excluded from the current kit. */
  historical?: boolean;
  /** Ranks the ability has (1 for innates and basic attacks). */
  ranks: number;
  fields: {
    cooldown?: NumericField;
    cooldownStart?: string;
    staticCooldown?: NumericField;
    /** How long the same target can't be affected again (wiki: "ontargetcdstatic"). */
    targetCooldown?: NumericField;
    recharge?: NumericField;
    cost?: NumericField;
    costType?: string;
    castTime?: NumericField;
    targetRange?: NumericField;
    range?: NumericField;
    attackRange?: NumericField;
    effectRadius?: NumericField;
    innerRadius?: NumericField;
    width?: NumericField;
    speed?: NumericField;
    angle?: NumericField;
    collisionRadius?: NumericField;
    tetherRadius?: NumericField;
  };
  flags: AbilityFlags;
  parts: AbilityPart[];
  /** Extra labeled facts from the page (customlabel/custominfo). */
  custom: Array<{ label: string; text: string }>;
  /** The wiki's notes, one entry per top-level bullet (sub-bullets included). */
  notes: string[];
  /** Supplemental pinned rules from another page, retaining their actual source revision. */
  sources?: Array<{ page: { title: string; revid: number }; text: string[] }>;
  /** Versioned game-file excerpts, separate from wiki revisions and attributed by content hash. */
  gameSources?: Array<{ version: string; url: string; sha256: string; object: string; text: string[] }>;
}

/**
 * A unit a champion summons or places (H-28G Evolution Turret, Mist Walker, Tentacle, Powder
 * Keg), read from the {{Infobox/Pet}} on the champion's wiki page.
 */
/**
 * A rune the simulator models (PLAN §4.1: Udyr's Triple Tonic): its description, what each
 * item it grants does when consumed, and its article's patch history (newer than the item data).
 */
export interface RuneRecord {
  name: string;
  /** The rune's data template. */
  page: { title: string; revid: number };
  /** The description's lines, as displayed. */
  text: string[];
  /** The items it grants: what consuming each does, from the item's data module. */
  items: Array<{ name: string; page: { title: string; revid: number }; consume: string }>;
  /** Its article's patch history, newest first: the patch and one line per change. */
  history: Array<{ patch: string; text: string }>;
  /** The article the history was read from. */
  article?: { title: string; revid: number };
}

export interface PetRecord {
  /** Data Dragon id of the champion. */
  champion: string;
  name: string;
  /** Wiki page and revision the record was read from. */
  page: { title: string; revid: number };
  /** Numeric fields by infobox name: hp, damage, range, armor, magicresist, attackspeed, movespeed, radius, ... */
  fields: Record<string, NumericField>;
  /** The other fields as displayed text: control, onhit, protection, damagemodifier, abilities, notes, ... */
  text: Record<string, string>;
}
