/**
 * What each ability does in a fight, in the terms the interaction ledger reasons with:
 * how it is delivered (and so what can stop it), the crowd control it applies, how it
 * moves its caster, and the defensive states it grants. Built from the ability records,
 * the wiki's glossary lists and the base stats; committed as data/<dataset>/profiles/<id>.json.
 */
import type { AbilityKind } from "./abilities";

/** A wiki interaction flag: "yes" (true), "no" (false), "partly" (special), or undefined when not stated. */
export type Tri = "yes" | "no" | "partly";

/** Where a fact comes from, so every ledger entry can show it. */
export interface Evidence {
  /** Wiki page title (an ability data page or a glossary page). */
  page: string;
  revid?: number;
  /** The sentence, list item or note it was read from. */
  quote?: string;
}

/** Crowd control and debuffs applied to the enemy champion. */
export interface Applied {
  /** "stun", "airborne", "root", "slow", "blind", "grievous wounds", "reveal", ... */
  type: string;
  /** Sub-type from the wiki's list, e.g. "pull" or "knock back" for airborne. */
  variant?: string;
  /** Seconds at max rank and level 20. */
  duration?: number;
  /** Percent, for slows and cripples. */
  amount?: number;
  /** Only under a condition (a part of the ability, a recast, an empowered version). */
  condition?: string;
  evidence: Evidence[];
}

export type MovementType = "dash" | "blink" | "lunge";

export interface Movement {
  type: MovementType;
  /** For dashes: the targeting the wiki's dash list gives ("direction-targeted", ...). */
  targeting?: string;
  condition?: string;
  /**
   * Whether enemy knockdowns and displacements interrupt it (the wiki's knockdown flag):
   * false for dashes with displacement or crowd control immunity, such as Malphite's R.
   */
  interruptible?: boolean;
  /** Interrupted by any immobilizing or polymorphing crowd control (the wiki's list). */
  interruptedByCC?: boolean;
  evidence: Evidence[];
}

/** Defensive and utility states the ability gives its caster. */
export type SelfStateType =
  | "projectile block"
  | "spell shield"
  | "parry"
  | "dodge attacks"
  | "block attacks"
  | "reflect attacks"
  | "untargetable"
  | "invulnerable"
  | "stasis"
  | "minimum health"
  | "resurrection"
  | "cc immune"
  | "displacement immune"
  | "slow immune"
  | "cleanse"
  | "tenacity"
  | "damage reduction"
  | "shield"
  | "heal"
  | "camouflage"
  | "invisible";

export interface SelfState {
  state: SelfStateType;
  duration?: number;
  /** For cleanses: the crowd control types removed. For tenacity and reductions: percent. */
  removes?: string[];
  amount?: number;
  condition?: string;
  /** Limits the wiki notes, e.g. "Does not destroy inbound projectiles". */
  note?: string;
  evidence: Evidence[];
}

export interface Delivery {
  /** Lowercase targeting types: unit, direction, location, auto, passive, self, vector, ... */
  targeting: string[];
  affectsEnemies: boolean;
  /** Intercepted by projectile blockers such as Wind Wall. */
  projectile?: Tri;
  /** Negated by spell shields. */
  spellShield?: Tri;
  /** Negated by blinds, blocks and dodges (the wiki's parry flag). */
  parry?: Tri;
  /** Can't be cast while grounded. */
  grounded?: Tri;
  /** Its movement is interrupted by knockdowns and displacements. */
  knockdown?: Tri;
  /** Its primary effect can be disrupted (silences, stuns, ... interrupt it). */
  disruptable?: Tri;
  /**
   * How it relates to basic attacks: an empowered basic attack ("attack"), an ability that
   * applies on-hit effects without being an attack ("on-hit"), or a change to every basic
   * attack ("attack modifier", such as Teemo's Toxic Shot).
   */
  attack?: "attack" | "on-hit" | "attack modifier";
}

export interface Channel {
  /** "normal", "movement", "objective", "uninterruptible" (the wiki's channel lists) or "charged". */
  type: string;
  evidence: Evidence[];
}

export interface AbilityProfile {
  champion: string;
  kind: AbilityKind;
  name: string;
  page: { title: string; revid: number };
  /** Seconds at max rank (or level 20 for level-based cooldowns). */
  cooldown?: number;
  castTime?: number;
  /** Longest stated range, in units. */
  range?: number;
  /** Missile speed, in units per second. */
  speed?: number;
  damageTypes: string[];
  delivery: Delivery;
  applies: Applied[];
  movement: Movement[];
  states: SelfState[];
  channel?: Channel[];
  /** Deals damage equal to the target's remaining health below a threshold. */
  execute?: Evidence[];
  /** Can be cast (or recast) while stunned, silenced and the like. */
  usableWhileDisabled?: { which: "cast" | "recast"; evidence: Evidence[] };
  /** The wiki's notes about interactions (projectiles, spell shields, parries, dashes, ...), verbatim. */
  notes?: string[];
  /** Grants attack speed, attack damage or critical strike chance, or resets the attack timer. */
  boostsAttacks?: boolean;
}

export interface BasicAttackProfile {
  /** Form id, e.g. "gnar" or "mega-gnar". */
  form: string;
  formName: string;
  /** Attack range in units, edge to edge. */
  range: number;
  ranged: boolean;
  /** Ranged attacks that fire a missile (Wind Wall and similar can block them). */
  projectile: boolean;
  missileSpeed?: number;
  /** At level 20 with no bonus attack speed. */
  attackSpeed: number;
  attackDamage: number;
  /** Seconds. */
  windup: number;
  /** Abilities that change every basic attack (Teemo's Toxic Shot, Darius's Hemorrhage, ...). */
  modifiers: string[];
}

export interface KitProfile {
  champion: string;
  name: string;
  /** Edge-to-edge collision radius of the base form. */
  gameplayRadius: number;
  moveSpeed: number;
  attacks: BasicAttackProfile[];
  abilities: AbilityProfile[];
}

export function triOf(flag: string | undefined): Tri | undefined {
  if (flag === "true") return "yes";
  if (flag === "false") return "no";
  if (flag === "special") return "partly";
  return undefined;
}
