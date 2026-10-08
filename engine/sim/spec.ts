/**
 * What the duel simulator knows about a champion: level-20 stats, the basic attack, and each
 * ability as a delivery plus effects. Real champions are compiled into this form from the
 * wiki data (milestone 5); tests build synthetic ones by hand.
 */
import type { CCType } from "../rules/crowdControl";
import type { DamageType } from "../rules/damage";
import type { ShieldType } from "../rules/defense";

/** Stats a formula can read: the caster's, or the target's with a "target" prefix. */
export type StatRef =
  | "AD"
  | "baseAD"
  | "bonusAD"
  | "AP"
  | "maxHP"
  | "bonusHP"
  | "currentHP"
  | "missingHP"
  | "armor"
  | "bonusArmor"
  | "MR"
  | "bonusMR"
  | "attackSpeed"
  | "bonusAttackSpeed"
  | "critChance"
  | "moveSpeed"
  | "targetMaxHP"
  | "targetCurrentHP"
  | "targetMissingHP"
  | "targetBonusHP"
  | "targetArmor"
  | "targetMR";

/** base + sum(ratio x stat). Ratios are fractions: 0.6 for "60% AD", 0.08 for "8% of target's maximum health". */
export interface Formula {
  base: number;
  ratios?: Partial<Record<StatRef, number>>;
}

/** States a unit can be in; most come from its own abilities. */
export type StateType =
  | "untargetable"
  | "invulnerable"
  | "stasis"
  | "spellShield"
  | "parry"
  | "dodgeAttacks"
  | "blockAttacks"
  | "reflectAttacks"
  | "projectileBlock"
  | "ccImmune"
  | "displacementImmune"
  | "slowImmune"
  | "minimumHealth"
  | "damageReduction"
  | "tenacity"
  | "ghosted";

/** Stats a timed buff or debuff changes. Fractions for percentages. */
export type BuffStat =
  | "AD"
  | "AP"
  | "armor"
  | "MR"
  | "attackSpeed"
  | "moveSpeedFlat"
  | "moveSpeedPercent"
  | "armorReduction"
  | "armorReductionPercent"
  | "mrReduction"
  | "mrReductionPercent"
  | "lethality"
  | "abilityHaste"
  | "damageDealt"
  | "lifeSteal";

export type Effect =
  | { type: "damage"; damageType: DamageType; amount: Formula; canCrit?: boolean }
  | { type: "cc"; cc: CCType; duration: number; strength?: number }
  /** Knock up (distance 0), knock back ("away") or pull ("toward"): airborne plus forced movement. */
  | { type: "displace"; direction: "away" | "toward"; distance: number; duration: number }
  | { type: "shield"; amount: Formula; duration: number; shieldType?: ShieldType; priority?: boolean }
  | { type: "heal"; amount: Formula }
  /** `value`: hit points for minimumHealth, a fraction for damageReduction and tenacity, a radius for projectileBlock. */
  | { type: "state"; state: StateType; duration: number; value?: number; charges?: number }
  | { type: "stat"; stat: BuffStat; amount: Formula; duration: number }
  | { type: "dot"; damageType: DamageType; total: Formula; duration: number; interval: number }
  | { type: "grievousWounds"; duration: number }
  /** Removes the listed crowd control types from the caster, or every type when none are listed. */
  | { type: "cleanse"; types?: CCType[] }
  /** The next `attacks` basic attacks within `window` seconds gain these effects. */
  | { type: "empower"; attacks: number; window: number; onHit: Effect[]; bonusRange?: number; resetAttack?: boolean; uncancellable?: boolean }
  /** Kills the target if its health is at or below the threshold after the hit. */
  | { type: "execute"; threshold: Formula }
  | { type: "resetAttack" }
  /** A wall in front of the caster that destroys enemy projectiles crossing it. */
  | { type: "projectileWall"; distance: number; duration: number }
  /** Applies `effects` to the same target `delay` seconds later (drowsy then sleep, delayed detonations). */
  | { type: "delayed"; delay: number; effects: Effect[] };

export type Delivery =
  /** Effects on the caster only (onSelf). */
  | { kind: "self" }
  /** Hits the enemy if it is within `radius` of the caster's edge. */
  | { kind: "aura"; radius: number }
  /** Unit-targeted; a homing missile when `missileSpeed` is set. */
  | { kind: "target"; range: number; missileSpeed?: number }
  /** A skillshot: a missile (or instant line when `speed` is unset) that the target can sidestep. */
  | { kind: "line"; range: number; width: number; speed?: number }
  /** Ground-targeted area that lands after `delay` seconds. */
  | { kind: "circle"; range: number; radius: number; delay: number }
  /** A dash; `hitRadius` hits the enemy on arrival. "target" dashes stop at the enemy. */
  | { kind: "dash"; direction: "toward" | "away" | "target"; distance: number; speed: number; hitRadius?: number }
  | { kind: "blink"; direction: "toward" | "away"; distance: number; hitRadius?: number };

export interface ChannelSpec {
  duration: number;
  /** Crowd control that disables casting interrupts it unless false. */
  interruptible: boolean;
  /** Effects on the enemy every `interval` seconds while channeling, if in range. */
  interval?: number;
  onTick?: Effect[];
  /** Effects when the channel completes. */
  onComplete?: Effect[];
  /** Center-to-edge reach of the pulses and the completion effects. */
  range?: number;
  /** The caster can walk while it lasts (spins such as Judgment). */
  mobile?: boolean;
}

export interface AbilityFlags {
  /** Projectile blockers stop it (missile deliveries only). */
  projectile?: boolean;
  /** Spell shields negate it. Default: true for abilities that affect the enemy. */
  spellShield?: boolean;
  /** Dodges, blocks and blinds stop it (abilities that strike like basic attacks). */
  parry?: boolean;
  /** Fires the caster's on-hit effects. */
  appliesOnHit?: boolean;
  /** Can't be cast while grounded. Default: true for dashes and blinks. */
  grounded?: boolean;
  /** Its dash is interrupted by knockdowns and displacements. Default true. */
  knockdown?: boolean;
  /** Castable while stunned, silenced and the like (Undying Rage, cleanses). */
  usableWhileDisabled?: boolean;
}

export type AbilityRole = "damage" | "cc" | "engage" | "escape" | "defense" | "buff";

export interface AbilitySpec {
  /** Unique within the kit: "Q", "W", "E", "R", "Q2", ... */
  key: string;
  name: string;
  slot: "Q" | "W" | "E" | "R" | "I" | "other";
  /** Seconds at max rank, before ability haste. */
  cooldown: number;
  cost?: number;
  castTime: number;
  moveWhileCasting?: boolean;
  /** Most cooldowns start when the cast time ends (wiki: "Cast time"). */
  cooldownAtCastStart?: boolean;
  delivery: Delivery;
  /** Effects on the enemy when the ability lands. */
  onHit?: Effect[];
  /** Effects on the caster when the cast completes. */
  onSelf?: Effect[];
  channel?: ChannelSpec;
  flags?: AbilityFlags;
  /** Hints for the default behavior; derived from the effects when absent. */
  roles?: AbilityRole[];
}

export interface AttackSpec {
  /** Attack range, edge to edge. */
  range: number;
  ranged: boolean;
  /** Missile speed of ranged attacks; unset or 0 for attacks without a missile. */
  missileSpeed?: number;
  /** Projectile blockers stop it. */
  projectile: boolean;
  /** Effects every basic attack applies on hit (attack modifiers such as Teemo's Toxic Shot). */
  onHit?: Effect[];
}

/** Level-20 base statistics. Percentages are fractions. */
export interface BaseStats {
  hp: number;
  /** Per 5 seconds. */
  hpRegen: number;
  resource: number;
  /** Per 5 seconds. */
  resourceRegen: number;
  armor: number;
  mr: number;
  ad: number;
  attackSpeed: {
    base: number;
    ratio: number;
    /** Bonus attack speed from levels, as a fraction. */
    bonus: number;
  };
  windup: { percent: number; modifier: number };
  moveSpeed: number;
  /** Gameplay radius: what ranges and hitboxes are measured to. */
  radius: number;
  /** Pathing (collision) radius: champions can't walk closer than the sum of theirs. */
  pathingRadius: number;
  /** Multiplier on critical strike damage (Yasuo's 0.9, for example). */
  critDamageModifier: number;
}

/** Stats bought with the stat budget (engine/budget.ts). Percentages are fractions. */
export interface BonusStats {
  ad?: number;
  ap?: number;
  hp?: number;
  armor?: number;
  mr?: number;
  attackSpeed?: number;
  critChance?: number;
  abilityHaste?: number;
  lethality?: number;
  magicPen?: number;
}

/** Extension points for kits the generic effects can't express; state lives in `unit.memory`. */
export interface KitHooks {
  onAttackHit?(ctx: HookContext): void;
  onAbilityHit?(ctx: HookContext & { ability: AbilitySpec }): void;
  onTick?(ctx: HookContext): void;
}

/** What hooks can see and do. Implemented by the simulator (engine/sim/simulate.ts). */
export interface HookContext {
  tick: number;
  memory: Record<string, number | string | boolean>;
  /** Applies an effect from this unit to the enemy (or to itself when `toSelf`). */
  apply(effect: Effect, toSelf?: boolean): void;
}

export interface FighterSpec {
  id: string;
  name: string;
  base: BaseStats;
  bonus?: BonusStats;
  attack: AttackSpec;
  abilities: AbilitySpec[];
  hooks?: KitHooks;
}
