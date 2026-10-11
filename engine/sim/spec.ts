/**
 * What the duel simulator knows about a champion: level-20 stats, the basic attack, and each
 * ability as a delivery plus effects. Real champions are compiled into this form from the
 * wiki data (milestone 5); tests build synthetic ones by hand.
 */
import type { CCType } from "../rules/crowdControl";
import type { DamageType } from "../rules/damage";
import type { ShieldType } from "../rules/defense";
import type { Behavior } from "./behavior";
import type { Unit, World } from "./state";

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
  | "bonusMoveSpeed"
  | "lethality"
  | "targetMoveSpeed"
  | "targetAD"
  | "targetBonusAD"
  | "targetAP"
  | "targetMaxHP"
  | "targetCurrentHP"
  | "targetMissingHP"
  | "targetBonusHP"
  | "targetArmor"
  | "targetBonusArmor"
  | "targetMR"
  | "targetBonusMR";

/**
 * base + sum(ratio x stat) + sum(ratio x stat x stat ...). Ratios are fractions: 0.6 for
 * "60% AD", 0.08 for "8% of target's maximum health".
 */
export interface Formula {
  base: number;
  ratios?: Partial<Record<StatRef, number>>;
  /**
   * Terms that multiply stats together: "1% (+ 0.6% per 100 AP) of the target's maximum
   * health" is 0.01 x targetMaxHP plus 0.00006 x AP x targetMaxHP.
   */
  products?: Array<{ ratio: number; stats: StatRef[] }>;
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
  /** Damage reduction against one damage type only (Defiant Dance). */
  | "physicalReduction"
  | "magicReduction"
  | "tenacity"
  | "ghosted"
  /** Stops enemy dashes that come within `value` units and applies the status's effects to the dasher (Steadfast Presence). */
  | "antiDash"
  /** Negates the next immobilizing crowd control (Goes Where He Pleases). */
  | "ccNegate"
  /** Untargetable to enemies farther than `value` units from the status's position (Hallowed Mist). */
  | "untargetableFar"
  /** Can't declare basic attacks, without being crowd control (Purge fires in their place). */
  | "noAttacks";

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
  | "lifeSteal"
  | "critChance"
  /** Bonus maximum health; gaining it heals by the same amount. */
  | "health"
  /** Increases total armor or magic resistance by a fraction (Steadfast Presence's passive). */
  | "armorPercent"
  | "mrPercent"
  /** Percentage armor or magic penetration (Apprehend's passive). */
  | "armorPen"
  | "magicPenPercent"
  | "attackRange"
  /** Reduces the strength of slows by a fraction (Purge's 40%). */
  | "slowResist"
  /** Increases healing and health regeneration received by a fraction (World Ender). */
  | "healingIncrease";

/** How a basic attack's damage divides between damage types, as shares of the attack. */
export interface AttackSplit {
  physical: number;
  magic: number;
  true?: number;
}

export type Effect =
  /**
   * `canCrit`: averaged over the attacker's crit chance; `critMultiplier` replaces its crit
   * damage (Judgment crits for 130%). `lifesteal`: the caster heals this share of the damage.
   * `label` names the hit in logs and kit hooks (Decimate's handle). `minimum`: it deals at
   * least this much before mitigation (Infected Bonesaw's minimum damage).
   */
  | { type: "damage"; damageType: DamageType; amount: Formula; canCrit?: boolean; critMultiplier?: number; lifesteal?: number; label?: string; minimum?: Formula }
  | { type: "cc"; cc: CCType; duration: number; strength?: number }
  /**
   * Knock up (distance 0), knock back ("away") or pull ("toward"): airborne plus forced
   * movement. `to`: pull only until the target's center is this far from the caster's
   * (Apprehend's rebound). `wallStun`: stun duration if a knock back hits a wall (with walls
   * nearby), and `wallEffects` anything else that happens then (Heroic Charge's second hit).
   */
  | { type: "displace"; direction: "away" | "toward"; distance: number; duration: number; to?: number; wallStun?: number; wallEffects?: Effect[] }
  | { type: "shield"; amount: Formula; duration: number; shieldType?: ShieldType; priority?: boolean }
  | { type: "heal"; amount: Formula }
  /**
   * `value`: hit points for minimumHealth, a fraction for damageReduction and tenacity, a
   * radius for projectileBlock, antiDash and untargetableFar. `effects`: what the state does
   * when triggered (antiDash). States with a position are anchored where the target stands.
   */
  | { type: "state"; state: StateType; duration: number; value?: number; charges?: number; effects?: Effect[] }
  | { type: "stat"; stat: BuffStat; amount: Formula; duration: number }
  | { type: "dot"; damageType: DamageType; total: Formula; duration: number; interval: number }
  | { type: "grievousWounds"; duration: number }
  /** Removes the listed crowd control types from the caster, or every type when none are listed. */
  | { type: "cleanse"; types?: CCType[] }
  /**
   * The next `attacks` basic attacks within `window` seconds gain these effects. `split`
   * deals the attack's own damage as these shares of physical and magic damage (Yone's
   * Azakana Sword). `windup`: the empowered attack's windup in seconds, when it has its own
   * (Thundering Smash's pounce).
   */
  | {
      type: "empower";
      attacks: number;
      window: number;
      onHit: Effect[];
      bonusRange?: number;
      resetAttack?: boolean;
      uncancellable?: boolean;
      split?: AttackSplit;
      windup?: number;
    }
  /** Kills the target if its health is at or below the threshold after the hit. */
  | { type: "execute"; threshold: Formula }
  | { type: "resetAttack" }
  /** A wall in front of the caster that destroys enemy projectiles crossing it. */
  | { type: "projectileWall"; distance: number; duration: number }
  /** Applies `effects` to the same target `delay` seconds later (drowsy then sleep, delayed detonations). */
  | { type: "delayed"; delay: number; effects: Effect[] }
  /** Changes the target's resource (Fury gained or lost). */
  | { type: "resource"; amount: Formula }
  /** Shortens the remaining cooldown of one of the caster's abilities, by seconds or by a share of it. */
  | { type: "refund"; ability: string; seconds?: number; fraction?: number }
  /** A marker on the target for kit hooks to read (Flawless Duet's mark, Frenzied Maul's mark). */
  | { type: "mark"; key: string; duration: number; value?: number }
  /** Effects on the caster when this hit lands (Decimate's heal). */
  | { type: "caster"; effects: Effect[] };

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
  /**
   * A dash; `hitRadius` hits the enemy on arrival. "target" dashes stop at the enemy. Dashes
   * to a location can be aimed (a cast's `aim`) anywhere from `minDistance` to `distance`.
   * `through` dashes don't stop at the enemy: they hit it on the way past (Shadow Dash).
   */
  | { kind: "dash"; direction: "toward" | "away" | "target"; distance: number; speed: number; hitRadius?: number; minDistance?: number; through?: boolean }
  | { kind: "blink"; direction: "toward" | "away"; distance: number; hitRadius?: number }
  /**
   * A stretch of the line from `near` to `far` units in front of the caster's center that
   * lands `delay` seconds after the cast: it hits the enemy if its hitbox overlaps it.
   * "caster" areas move with the caster until they land (Decimate); "ground" areas stay where
   * they were cast. `bands` give other effects where the enemy's center is (a sweet spot, a
   * weaker handle); outside every band, `onHit` applies. `centered` areas hit by where the
   * enemy's center is, like their bands (The Darkin Blade's third strike).
   */
  | {
      kind: "area";
      near: number;
      far: number;
      delay: number;
      anchor: "caster" | "ground";
      bands?: Array<{ from: number; to: number; onHit: Effect[] }>;
      centered?: boolean;
    };

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
  /** Number of pulses, evaluated (and rounded down) at the cast; overrides `interval` (Judgment's spins). */
  pulses?: Formula;
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

/** "finisher": used only when its damage kills (Demacian Justice). */
export type AbilityRole = "damage" | "cc" | "engage" | "escape" | "defense" | "buff" | "finisher";

export interface AbilitySpec {
  /** Unique within the kit: "Q", "W", "E", "R", "Q2", ... */
  key: string;
  name: string;
  slot: "Q" | "W" | "E" | "R" | "I" | "other";
  /** Seconds at max rank, before ability haste. */
  cooldown: number;
  /** A number, or a formula of the caster's stats (Reckless Swing's health cost). */
  cost?: number | Formula;
  /** What the cost is paid with. Default: the champion's resource. */
  costType?: "resource" | "health";
  castTime: number;
  moveWhileCasting?: boolean;
  /** Most cooldowns start when the cast time ends (wiki: "Cast time"). */
  cooldownAtCastStart?: boolean;
  delivery: Delivery;
  /** Effects on the enemy when the ability lands. */
  onHit?: Effect[];
  /** Effects on the caster when the cast completes. */
  onSelf?: Effect[];
  /** Effects on the caster as soon as the cast starts (Riposte's parry during its cast time). */
  onCastStart?: Effect[];
  channel?: ChannelSpec;
  flags?: AbilityFlags;
  /** Hints for the default behavior; derived from the effects when absent. */
  roles?: AbilityRole[];
  /** Conditions for casting it (Last Breath needs an airborne target). */
  requires?: { enemyCC?: CCType[]; minResource?: number };
  /** A kit's own condition for casting it (Steel Tempest's whirlwind needs two stacks). */
  usable?: (unit: Unit, world: World) => boolean;
  /**
   * Raw damage its hit deals beyond its `onHit` effects, for abilities whose hooks deal the
   * damage (Haymaker's grows with the Grit spent): what the enemy sees coming.
   */
  estimate?: (caster: Unit, target: Unit) => number;
  /**
   * A recast: castable within `window` seconds of the previous stage of `root` (stage
   * `index - 1`), at least `delay` seconds after it; `auto` casts it when the window closes
   * (Counter Strike).
   */
  chain?: { root: string; index: number; window: number; delay?: number; auto?: boolean };
  /** For the first stage of recastable abilities: whether the cooldown starts at the first cast or after the last. */
  chainCooldown?: "first" | "last";
  /** Shares the cooldown of the ability with this key (an empowered version of the same spell). */
  cooldownKey?: string;
  /**
   * Castable during the caster's other casts and dashes without cancelling them (Umbral
   * Dash during The Darkin Blade). A dash cast this way holds the other cast until it ends.
   */
  overlay?: boolean;
}

/** The cooldown an ability uses. */
export function cooldownKeyOf(ability: AbilitySpec): string {
  return ability.cooldownKey ?? ability.key;
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
  /**
   * Percentage armor and magic penetration bought, in points. Each point counts as its own
   * source of 1%, and sources stack multiplicatively (wiki: "Armor penetration"): 50 points
   * remove 1 - 0.99^50 = 39.5% of the target's armor.
   */
  armorPenPoints?: number;
  magicPenPoints?: number;
}

/**
 * Extension points for kits the generic effects can't express. State lives in
 * `unit.memory`, because fights are copied when they branch.
 */
export interface KitHooks {
  /** Once, before the first tick. */
  onStart?(ctx: HookContext): void;
  onTick?(ctx: HookContext): void;
  /** A basic attack is declared (its windup starts). */
  onAttack?(ctx: HookContext): void;
  onAttackHit?(ctx: HookContext): void;
  onAbilityHit?(ctx: HookContext & { ability: AbilitySpec }): void;
  /** One of this unit's casts starts (before its cast time). */
  onCastStart?(ctx: HookContext & { ability: AbilitySpec }): void;
  /** One of this unit's casts completes. */
  onCast?(ctx: HookContext & { ability: AbilitySpec }): void;
  /** Damage about to reach this unit, after mitigation and before shields. */
  beforeDamageTaken?(ctx: HookContext & { amount: number }): void;
  /** `amount`: health lost; `mitigated`: the damage after resistances, shields included; `raw`: before resistances. */
  onDamageTaken?(ctx: HookContext & DamageReport): void;
  onDamageDealt?(ctx: HookContext & DamageReport & { attack: boolean; ability?: string; persistent: boolean }): void;
  /** One of the enemy's basic attacks was dodged, parried or blocked by this unit. */
  onAttackAvoided?(ctx: HookContext): void;
}

/** One hit of damage, as damage hooks see it. */
export interface DamageReport {
  amount: number;
  mitigated: number;
  raw: number;
  damageType: DamageType;
}

/** What hooks can see and do. Implemented by the simulator (engine/sim/combat.ts). */
export interface HookContext {
  tick: number;
  world: World;
  self: Unit;
  enemy: Unit;
  memory: Record<string, number | string | boolean>;
  /** Applies an effect from this unit to the enemy (or to itself when `toSelf`). */
  apply(effect: Effect, toSelf?: boolean): void;
  /** Sets a timed stat buff on this unit, replacing any earlier one with the same key. */
  buff(key: string, stat: BuffStat, amount: number, seconds: number): void;
  /** Restores health like regeneration (reduced by Grievous Wounds, not counted as healing). */
  regenerate(amount: number): void;
  log(text: string): void;
}

/** Damage by type. */
export interface DamageByType {
  physical: number;
  magic: number;
  true: number;
}

/**
 * What a kit tells the stat budget (engine/budget.ts) that its effects don't show: damage and
 * healing its hooks add, whether its basic attacks happen at all, and stats it gets more of
 * per point bought.
 */
export interface BudgetHints {
  /** False when its basic attacks don't happen (Purge fires in their place). */
  attacks?: boolean;
  /** Damage per second from hooks, before the target's resistances. */
  damage?: (self: Unit, target: Unit) => Partial<DamageByType>;
  /** Healing and shielding per second from hooks. */
  healing?: (self: Unit, target: Unit) => number;
  /** Bought stats the kit's hooks multiply in fights (Living Forge's 30% more bonus armor), for the budget to value them so. */
  statMultipliers?: Partial<Record<"ad" | "ap" | "as" | "crit" | "ah" | "lethality" | "armpen" | "mpenflat" | "mpen" | "hp" | "armor" | "mr", number>>;
}

export interface FighterSpec {
  id: string;
  name: string;
  base: BaseStats;
  bonus?: BonusStats;
  attack: AttackSpec;
  abilities: AbilitySpec[];
  hooks?: KitHooks;
  /** Effects on itself before the fight starts: innate stats and states that are always on. */
  start?: Effect[];
  /** Resource at the start (Fury starts empty); default full. */
  resourceStart?: number;
  /** Gold the kit adds to its stat budget (Master Craftsman's Masterwork upgrade). */
  extraGold?: number;
  budget?: BudgetHints;
  /** How it plays; the default behavior when unset. */
  behavior?: Behavior;
}
