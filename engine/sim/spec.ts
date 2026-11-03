/**
 * What the duel simulator knows about a champion: level-20 stats, the basic attack, and each
 * ability as a delivery plus effects. Real champions are compiled into this form from the
 * wiki data (milestone 5); tests build synthetic ones by hand.
 */
import type { CCType } from "../rules/crowdControl";
import type { DamageType } from "../rules/damage";
import type { ShieldType } from "../rules/defense";
import type { Behavior } from "./behavior";
import type { Action, Aim, AttackHitOptions, Missile, Pet, Status, Unit, World, Zone } from "./state";
import type { PendingSplit } from "./actions";

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
  | "maxMana"
  | "bonusMana"
  | "currentMana"
  | "missingMana"
  | "targetMaxMana"
  | "targetBonusMana"
  | "targetCurrentMana"
  | "targetMissingMana"
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
  /** Redirects a frontal projectile onto this body's hitbox before ending its flight. */
  | "projectileIntercept"
  /** Timed effective movement speed, before ordinary movement modifiers and soft caps. */
  | "moveSpeedOverride"
  | "ccImmune"
  | "displacementImmune"
  | "slowImmune"
  | "crippleImmune"
  /** Damage immunity outside a radius measured from the moving protected unit. Does not prevent targeting or CC. */
  | "invulnerableFar"
  /** Flat pre-mitigation reduction for each non-true damage instance, capped at half its damage. */
  | "flatDamageReduction"
  | "minimumHealth"
  /** Sight limited around an anchored position independently of crowd-control immunity. */
  | "sightLimit"
  | "damageReduction"
  /** Damage reduction against one damage type only (Defiant Dance). */
  | "physicalReduction"
  | "magicReduction"
  | "tenacity"
  | "ghosted"
  /** Voluntary walking may cross terrain; forced movement keeps its normal collision. */
  | "terrainIgnore"
  /** Stops enemy dashes that come within `value` units and applies the status's effects to the dasher (Steadfast Presence). */
  | "antiDash"
  /** Negates the next immobilizing crowd control (Goes Where He Pleases). */
  | "ccNegate"
  /** Untargetable to enemies farther than `value` units from the status's position (Hallowed Mist). */
  | "untargetableFar"
  /** Can't declare basic attacks, without being crowd control (Purge fires in their place). */
  | "noAttacks"
  /** Prevents voluntary walking without being crowd control or grounding the unit. */
  | "noMovement"
  /** Healing and regeneration have no effect, except life steal and omnivamp (Glory in Death). */
  | "noHealing"
  /**
   * Can't be seen (Twilight Shroud): enemies can't start attacks or unit-targeted spells on it
   * or aim at it, but areas still hit it and missiles already on their way still land.
   */
  | "invisible"
  /** Concealed beyond `value` center-distance from an actual enemy champion; true sight reveals it. */
  | "camouflage"
  /** True sight exposes invisibility without overriding nearsight or untargetability. */
  | "revealed"
  /** Standard vision of a unit; records sight without exposing invisibility or overriding nearsight. */
  | "standardSight"
  /** An ability still at work in a way its kit's hooks model (Twilight Shroud's smoke): no rule of its own, but it holds a post-effect cooldown. */
  | "lingering"
  /** Health can't go above `value` (a share of maximum health); gaining it lowers health to it (All Out's 65%). */
  | "healthCap";

/** Stats a timed buff or debuff changes. Fractions for percentages. */
export type BuffStat =
  | "AD"
  | "AP"
  /** Each source multiplies total AP by one plus this fraction. */
  | "APMultiplier"
  | "armor"
  | "MR"
  | "attackSpeed"
  /** Multiplies total attack speed by one plus the sum of these fractions. */
  | "attackSpeedMultiplier"
  /** Raises the normal attack speed cap to this value while active. */
  | "attackSpeedCap"
  | "moveSpeedFlat"
  /** Flat loss of total movement speed after bonuses, before slows and soft caps. */
  | "totalMoveSpeedReduction"
  | "moveSpeedPercent"
  /** Independent percentage bonuses to total movement speed; each multiplies before soft caps. */
  | "moveSpeedMultiplier"
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
  | "healingIncrease"
  /** More maximum resource (Twilight Shroud's 100 energy). */
  | "maxResource"
  /** Percentage penetration of bonus armor only (All Out's 50%). */
  | "bonusArmorPen"
  /** Bonus armor ignored by critical strikes, additive with total percentage armor penetration (Last Breath). */
  | "criticalBonusArmorIgnore"
  /** Flat loss of total AD; bonus AD floors at zero without reducing base AD ratios (Mocking Shout). */
  | "totalADReduction";

/** How a basic attack's damage divides between damage types, as shares of the attack. */
export interface AttackSplit {
  physical: number;
  magic: number;
  true?: number;
}

export type PetDamageCategory = "basic" | "singleTarget" | "area" | "persistent" | "proc" | "pet";

export type Effect =
  /**
   * `canCrit`: averaged over the attacker's crit chance; `critMultiplier` replaces its crit
   * damage (Judgment crits for 130%). `lifesteal`: the caster heals this share of the damage.
   * `label` names the hit in logs and kit hooks (Decimate's handle). `minimum`: it deals at
   * least this much before mitigation (Infected Bonesaw's minimum damage).
   */
  /** `noLifeSteal`: life steal doesn't heal from it, though it comes with a basic attack (Glory in Death's on-hit). */
  | { type: "damage"; damageType: DamageType; amount: Formula; amountFor?: (caster: Unit, target: Unit) => number; canCrit?: boolean; critMultiplier?: number; lifesteal?: number; label?: string; minimum?: Formula; noLifeSteal?: boolean; persistent?: boolean; petDamageCategory?: PetDamageCategory }
  /** `strength`: a slow's fraction, or for nearsight the sight radius left (Blinding Assault's 350). */
  /** `sticky`: non-dispellable, so most cleanses leave it (Mega Adhesive's slow and ground). */
  | { type: "cc"; cc: CCType; duration: number; strength?: number; sticky?: boolean; spellShield?: boolean; bypassSlowImmune?: boolean; slowStackGroup?: string;
      /** An explicitly placed fear epicenter, independent of later caster movement. */
      fearOriginX?: number;
      /** Active only while this source and ability retain the named accepted control. */
      whileCC?: CCType }
  /** Immediate guarded channel interruption without a lasting crowd-control status. */
  | { type: "disrupt" }
  /** Stops an interruptible dash without inventing an airborne duration. */
  | { type: "knockdown" }
  /**
   * Knock up (distance 0), knock back ("away") or pull ("toward"): airborne plus forced
   * movement. `to`: pull only until the target's center is this far from the caster's
   * (Apprehend's rebound). `wallStun`: stun duration if a knock back hits a wall (with walls
   * nearby), and `wallEffects` anything else that happens then (Heroic Charge's second hit).
   */
  /**
   * Knock ups (distance 0), knock backs and pulls. `over`: thrown over the caster, landing
   * `distance` units from where it was (Fling), over terrain too.
   */
  | { type: "displace"; direction: "away" | "toward"; distance: number; duration: number; airborneDuration?: number; to?: number; wallStun?: number; wallEffects?: Effect[]; over?: boolean; interruptUncancellable?: boolean; originX?: number; stopAtWall?: boolean; ignoreUnitCollision?: boolean }
  | { type: "shield"; amount: Formula; duration: number; shieldType?: ShieldType; priority?: boolean; blackShield?: boolean; firstDamageBypass?: number }
  | { type: "heal"; amount: Formula }
  /**
   * `value`: hit points for minimumHealth, a fraction for damageReduction and tenacity, a
   * radius for projectileBlock, antiDash and untargetableFar. `effects`: what the state does
   * when triggered (antiDash). States with a position are anchored where the target stands.
   */
  | { type: "state"; state: StateType; duration: number; value?: number; charges?: number; effects?: Effect[]; tenacityGroup?: string; hostileOnly?: boolean; revealWhileCC?: CCType; cleanseWithCC?: boolean }
  | { type: "stat"; stat: BuffStat; amount: Formula; duration: number;
      /** Active only while this source and ability retain a positive shield on the recipient. */
      requiresShield?: boolean;
      /** Active only while this source and ability retain the specified crowd control. */
      whileCC?: CCType;
    }
  /** `stacks`: a new application runs alongside the old one instead of refreshing it (Trial by Fire). */
  | { type: "dot"; damageType: DamageType; total: Formula; duration: number; interval: number; label?: string; stacks?: boolean }
  | { type: "grievousWounds"; duration: number }
  /** Removes the listed crowd control types from the caster, or every type when none are listed. */
  /** `sticky`: also removes non-dispellable crowd control, as cleanses that grant immunity do (Ragnarok). */
  | { type: "cleanse"; types?: CCType[]; sticky?: boolean }
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
      /** The empowered windup still hits a target that becomes untargetable (Decisive Strike). */
      hitsUntargetable?: boolean;
      /** A spell shield blocks this entire empowered attack, including its ordinary damage. */
      spellShield?: boolean;
      /** A spell shield negates only this empowered on-hit packet, preserving the ordinary attack. */
      spellShieldOnHit?: boolean;
      /** Replaces ordinary attack on-hits only when this empowered packet is unshielded. */
      attackOnHitReplacement?: Effect[];
      /** Breaks damage shields on contact, including when a spell shield blocks the attack. */
      breakShields?: boolean;
      split?: AttackSplit;
      windup?: number;
    }
  /** Kills the target if its health is at or below the threshold after the hit. */
  | { type: "execute"; threshold: Formula; minimumHealthFloor?: number }
  | { type: "resetAttack" }
  /** A wall in front of the caster that destroys enemy projectiles crossing it. */
  | { type: "projectileWall"; distance: number; duration: number }
  /** Applies `effects` to the same target `delay` seconds later (drowsy then sleep, delayed detonations). */
  | { type: "delayed"; delay: number; effects: Effect[] }
  /** Changes the target's resource (Fury gained or lost). */
  | { type: "resource"; amount: Formula }
  /**
   * Shortens a cooldown of the caster's (by its cooldown key): by seconds, or by a share of what
   * remains, or (`total`) of the whole cooldown. A cooldown still held for its post-effect is
   * shortened when it starts.
   */
  | { type: "refund"; ability: string; seconds?: number; fraction?: number; total?: boolean }
  /** A marker on the target for kit hooks to read (Flawless Duet's mark, Frenzied Maul's mark). */
  | { type: "mark"; key: string; duration: number; value?: number }
  /** Effects on the caster when this hit lands (Decimate's heal). */
  | { type: "caster"; effects: Effect[] }
  /** The target is carried by the caster for `duration` seconds, `offset` units from its center (Devour, Ixtal's Impact). */
  | { type: "attach"; offset: number; duration: number }
  /** The target reappears `distance` units away from its enemy, or toward it (Grand Starfall's landing). */
  | { type: "reposition"; direction: "away" | "toward"; distance: number };

export type Delivery =
  /** Effects on the caster only (onSelf). */
  | { kind: "self" }
  /** Hits the enemy if it is within `radius` of the caster's edge. */
  | { kind: "aura"; radius: number }
  /** Unit-targeted; a homing missile when `missileSpeed` is set. */
  /** `edge`: the range reaches from the caster's edge to the target's (the wiki's "edge range", Devour) rather than center to center. */
  | { kind: "target"; range: number; rangeFor?: (caster: Unit, target: Unit) => number; missileSpeed?: number; edge?: boolean }
  /** A skillshot: a missile (or instant line when `speed` is unset) that the target can sidestep. */
  | { kind: "line"; range: number; width: number; speed?: number; travelRange?: number; collisionRange?: number; piercing?: boolean; radius?: number; collisionPet?: boolean }
  /**
   * Ground-targeted area that lands after `delay` seconds. `centered`: its radius reaches the
   * target's center rather than its edge (the wiki's "center range", Rupture).
   */
  /** `hidden`: seconds into the cast before the enemy can see where it will land (Abyssal Dive's indicator). */
  /** `flight`: a projectile that lands this many seconds after it is thrown however far it goes (Explosive Cask), in place of a `speed`. */
  | { kind: "circle"; range: number; radius: number; delay: number;
      /** Pure source-backed radius used for both hit probability and actual contacts. */
      radiusFor?: (caster: Unit, target: Unit, aim?: Aim) => number;
      /** Source-backed delay for the actual declared destination; delay remains the summary/budget value. */
      delayFor?: (caster: Unit, target: Unit, aim?: Aim) => number;
      centered?: boolean; hidden?: number; speed?: number; flight?: number }
  /**
   * A dash; `hitRadius` hits the enemy on arrival. "target" dashes stop at the enemy. Dashes
   * to a location can be aimed (a cast's `aim`) anywhere from `minDistance` to `distance`.
   * `through` dashes don't stop at the enemy: they hit it on the way past (Shadow Dash).
   */
  /**
   * `ramp`: a charge (Unstoppable Onslaught) that starts at the caster's movement speed, or at
   * `from` (Ixtal's Impact's 150), and gains `amount` every `every` seconds, up to `speed`. A dash
   * with `interruptible` set stops under crowd control that breaks channels or roots (Ixtal's
   * Impact). `sidestep`: the enemy can step aside
   * from it, so its hit is a skillshot of half-width `reach` that lands when the dash reaches
   * the enemy, `later` seconds after that when a follow-up still catches it (a recast's slam).
   * `time`: a leap that lands `time` seconds after it starts however far it goes (the game files'
   * TravelTime: Hop, Crunch); `speed` is then its speed over the full `distance`. `lockOn`: a
   * charge that, once the enemy is within `within` units (center to edge), dashes the rest of the
   * way at `speed` (Chaaaaaaaarge!!!'s search range).
   */
  | {
      kind: "dash";
      direction: "toward" | "away" | "target";
      distance: number;
      speed: number;
      /** Speed resolved at dash declaration from the caster's current stats. */
      speedFor?: (unit: Unit) => number;
      /**
       * Distance resolved at dash declaration from the caster's current stats (Infinite Duress:
       * 250% of movement speed); `distance` stays the reference for setting up scenarios.
       */
      distanceFor?: (unit: Unit) => number;
      /** Crosses intervening terrain when its endpoint is clear; never extends to escape a wall. */
      crossTerrain?: boolean;
      hitRadius?: number;
      /** Hit range between centers, rather than the default hitbox edges (Lunge's stab). */
      hitCentered?: boolean;
      minDistance?: number;
      through?: boolean;
      ramp?: { amount: number; every: number; from?: number };
      sidestep?: { reach: number; later?: number };
      time?: number;
      lockOn?: { within: number; speed: number };
    }
  | { kind: "blink"; direction: "toward" | "away"; distance: number; hitRadius?: number; through?: boolean; minDistance?: number; hitCentered?: boolean }
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
      /** Sweet spots: where the enemy's center is between `from` and `to`, these effects apply in place of `onHit`. */
      bands?: Array<{ from: number; to: number; onHit: Effect[] }>;
      centered?: boolean;
    }
  /**
   * A lingering field: on the enemy as far as `range` allows, or around the caster when
   * `attached` (its center `offset` units toward the enemy, moving with the caster). It lands
   * after `delay`, lasts `duration` seconds, and every `interval` seconds applies the ability's
   * `onHit` to the enemy if its hitbox is inside and `onOwner` to the caster if its center is.
   * `chase`: a field that moves toward the enemy at this speed (Wingborne Storm's awakened storm).
   * `burst`: each pulse is `count` hits `gap` seconds apart (Cannon Barrage's clusters of waves).
   */
  | {
      kind: "field";
      range: number;
      radius: number;
      duration: number;
      interval: number;
      delay?: number;
      attached?: boolean;
      offset?: number;
      onOwner?: Effect[];
      chase?: number;
      burst?: { count: number; gap: number };
    };

export interface ChannelSpec {
  duration: number;
  /** Voluntary movement may cancel only after this many seconds of channeling. */
  cancelAfter?: number;
  /** A voluntary basic attack may cancel after this delay; absent means it cannot. */
  cancelAttackAfter?: number;
  /** Voluntary movement/attack cancellation is locked for this final duration. CC is unaffected. */
  cancelBeforeEnd?: number;
  /** An attack on a different target (a pet in a duel) may cancel after this delay. */
  cancelAttackOtherAfter?: number;
  /** The kit starts the declared channel after its projectile attaches (Mercy), rather than at cast completion. */
  manualStart?: boolean;
  /** Crowd control that disables casting interrupts it unless false. */
  interruptible: boolean;
  /** When supplied, only these accepted CC types interrupt this channel. */
  interrupts?: CCType[];
  /** Effects on the enemy every `interval` seconds while channeling, if in range. */
  interval?: number;
  onTick?: Effect[];
  /** Effects when the channel completes. */
  onComplete?: Effect[];
  /** A real kit-owned packet announced for channel completion; perception only, with its own delivery defenses. */
  completionThreat?: string;
  /** Effects on the caster when the channel completes uninterrupted (Grand Starfall's leap). */
  onCompleteSelf?: Effect[];
  /** Center-to-edge reach of the pulses and the completion effects. */
  range?: number;
  /** The caster can walk while it lasts (spins such as Judgment). */
  mobile?: boolean;
  /** Number of pulses, evaluated (and rounded down) at the cast; overrides `interval` (Judgment's spins). */
  pulses?: Formula;
  /** Spell shields block only the completion effects, not the pulses (Apotheosis: "Spell shield will only block the burst damage"). */
  pulsesPassSpellShields?: boolean;
}

export interface AbilityFlags {
  /** Projectile blockers stop it (missile deliveries only). */
  projectile?: boolean;
  /** Spell shields negate it. Default: true for abilities that affect the enemy. */
  spellShield?: boolean;
  /** Dodges, blocks and blinds stop it (abilities that strike like basic attacks). */
  parry?: boolean;
  /** Overrides the attack-like shorthand for dodge or block independently. */
  dodge?: boolean;
  block?: boolean;
  /** Dodge denies attached on-hits while the spell's own damage and effects still connect. */
  dodgeStopsOnHit?: boolean;
  /** Attack defenses negate damage/on-hits while the spell's other effects still connect (Steel Tempest). */
  dodgeKeepsEffects?: boolean;
  /** A failed matching CC application cancels the remaining hit packet (Devour). */
  requiresCC?: CCType;
  /** This ability's whole hit packet also requires absence of displacement immunity. */
  blockedByDisplacementImmunity?: boolean;
  /** Fires the caster's on-hit effects. */
  appliesOnHit?: boolean;
  /** Its own basic damage benefits from life steal (Lunge, Parrrley, Purge). */
  appliesLifeSteal?: boolean;
  /** Classifies its damage as basic damage while preserving spell delivery and defenses. */
  basicDamage?: boolean;
  /** Alternative attack spell explicitly copies basic-attack interactions against hit-count pets. */
  petBasicAttack?: boolean;
  /** Resolve spell contact, on-hits and kit hooks against the actual contacted pet. */
  petContactHooks?: boolean;
  /** An attached packet can resolve on an untargetable target; stasis still denies it. */
  hitsUntargetable?: boolean;
  /** Can't be cast while grounded. Default: true for dashes and blinks. */
  grounded?: boolean;
  /** Its dash is interrupted by knockdowns and displacements. Default true. */
  knockdown?: boolean;
  /** Castable while stunned, silenced and the like (Undying Rage, cleanses). */
  usableWhileDisabled?: boolean;
  /** Silence alone does not prevent this activation; other crowd-control restrictions remain. */
  usableWhileSilenced?: boolean;
}

/**
 * A pet at level 20 (engine/sim/pets.ts): a unit a champion summons or places, built by its
 * kit from the wiki's pet infobox (H-28G Evolution Turret, Mist Walker, Tentacle, Powder Keg).
 */
export interface PetSpec {
  /** Explicit source exception to removal when its owner dies; its own expiry still applies. */
  persistsAfterOwnerDeath?: boolean;
  /** An actual clone remains distinct from its champion targeting class. */
  unitClass?: "clone";
  /** Explicit targeting class from the pet's pinned source; absence means unclassified. */
  targetClass?: "minion" | "monster" | "champion" | "other";
  /** Existing pet bodies are summons by default. False identifies an actual native
   * minion, monster or structure independently present in the represented world. */
  summoned?: boolean;
  /** Only an explicit source classification establishes epic-monster rewards. */
  epicMonster?: boolean;
  /** Explicit gameplay size class; neither collision radius nor a generic monster class implies it. */
  sizeClass?: "small" | "medium" | "large";
  /** An actual structure's class; summoned units named "turret" do not imply it. */
  structureClass?: "turret";
  /** Explicit large-pet targeting category, independent of physical radius. */
  largePet?: boolean;
  fixedDamage?: Partial<Record<PetDamageCategory, number>> & { rangedBasic?: number; meleeBasic?: number };
  diesToChampionAttack?: boolean;
  ccImmune?: CCType[];
  /** Explicit pet state immunities (distinct from crowd-control immunity). */
  stateImmune?: StateType[];
  target?: (world: World, pet: Pet) => Unit | Pet | undefined;
  onAttackHit?: (ctx: { world: World; pet: Pet; target: Unit | Pet; blocked: boolean }) => void;
  /** Contact-time packets, selected only after attack avoidance checks succeed. */
  effectsForHit?: (ctx: { world: World; pet: Pet; target: Unit | Pet; effects: readonly Effect[] }) => Effect[];
  /** The kit's name for the kind of pet ("turret", "walker", "keg", ...). */
  kind: string;
  name: string;
  hp: number;
  armor: number;
  mr: number;
  /** Takes 1 damage from each champion basic attack and nothing else (Tentacles, Powder Kegs). */
  hitPoints?: boolean;
  /** Damage taken from area abilities, as a multiplier (Mist Walkers' 40% at level 20); default 1. */
  areaTaken?: number;
  /** Damage taken from melee champions' basic attacks, as a multiplier (turrets 1.4, Mist Walkers 2). */
  meleeAttackTaken?: number;
  radius: number;
  /** Separate collision radius when sourced; otherwise uses the gameplay radius. */
  pathingRadius?: number;
  /** 0 for pets that stay where they are placed; others walk toward the enemy champion. */
  moveSpeed: number;
  /** The supplied speed already overrides this pet's own speed modifiers; movement-disabling CC still applies. */
  ignoreOwnMoveSpeedModifiers?: boolean;
  /** The supplied attack interval already overrides this pet's own attack-speed slows; attack-disabling CC still applies. */
  ignoreOwnAttackSpeedSlows?: boolean;
  /** How far from its owner it goes: it chases no farther, and walks back from farther (Mist Walkers' 1600). */
  leash?: number;
  /** Seconds it lasts until killed or replaced; Infinity for no limit. */
  duration: number;
  /** Can't be attacked (Tentacles during Leap of Faith). */
  untargetable?: boolean;
  /**
   * Whether the enemy should attack it before anything else when it can (a Powder Keg about to
   * blow up on it). Otherwise the enemy attacks pets only when it can't attack their owner.
   */
  urgent?: (pet: Pet, enemy: Unit, world: World) => boolean;
  /** Its own attacks on the enemy champion, when it has any. */
  attack?: PetAttack;
  /**
   * Damage it took: `raw` before its resistances, `dealt` after, `before` its health before
   * the hit (now lower). Test of Spirit's Spirit echoes a share to its champion.
   */
  onDamaged?: (hit: { world: World; pet: Pet; attacker: Unit; raw: number; dealt: number; before: number; damageType: DamageType; attack: boolean; ability?: string;
    /** A legacy custom shield may refund HP and report that refund as shield absorption. */
    absorbed?: number;
  }) => void;
}

export interface PetAttack {
  /** Explicit melee/ranged classification; projectile presence alone is not a reliable classification. */
  ranged?: boolean;
  /** A clone's attack animation has no hit, on-hit, projectile or retaliation events. */
  cosmetic?: boolean;
  windup?: number;
  missileSpeed?: number;
  projectile?: boolean;
  category?: PetDamageCategory;
  /** Reach of its attacks, from its center to the enemy's edge. */
  range: number;
  /** Seconds between attacks. */
  interval: number;
  /** Bonus attack-speed basis when distinct from the declared base rate (1 / interval). */
  attackSpeedRatio?: number;
  /** Only a supplied source cap limits a pet's modified attack rate. */
  attackSpeedCap?: number;
  /** Each attack's effects on the enemy, as its owner's: damage formulas read the owner's stats. */
  effects: Effect[];
  /** Strikes like a basic attack: dodges, parries, blocks and blinds stop it. Otherwise spell shields and parries do. */
  attackLike: boolean;
}

/** What a post-effect cooldown waits for (AbilitySpec.cooldownAfter). */
export type CooldownAfter = "empower" | "channel" | "dash" | "field" | "state";

/** "finisher": used only when its damage kills (Demacian Justice). */
export type AbilityRole = "damage" | "cc" | "engage" | "escape" | "defense" | "buff" | "finisher";

export interface AbilitySpec {
  /** False for explicit non-activation toggles; own implementation hooks still run. */
  countsAsCast?: boolean;
  /** Unique within the kit: "Q", "W", "E", "R", "Q2", ... */
  key: string;
  name: string;
  slot: "Q" | "W" | "E" | "R" | "I" | "other";
  /** Seconds at max rank, before ability haste. */
  cooldown: number;
  /** An explicit manual stage already counted by its root spell's reference budget. */
  budgetExcluded?: boolean;
  /** The cast cooldown is unaffected by ability haste (Steel Tempest); charge recharge remains separate. */
  staticCooldown?: boolean;
  /** A number, or a formula of the caster's stats (Reckless Swing's health cost). */
  cost?: number | Formula;
  /** Opt-in payment at declaration; generic completion retains zero unpaid cost. */
  costAtCastStart?: boolean;
  /** Declaration retains the actor's current facing rather than turning toward its aim. */
  preserveFacing?: boolean;
  /** False when kit-owned stage telegraphs replace the generic pending-cast announcement. */
  castThreat?: boolean;
  /** Descriptive continuous drain; the kit's independent toggle clock pays it. */
  resourceDrainPerSecond?: number;
  /** Dynamic cost captured when the cast is declared. */
  costFor?: (unit: Unit, ability: AbilitySpec) => number;
  activation?: "cast" | "toggle" | "transformation" | "internal";
  /** What the cost is paid with. Default: the champion's resource. */
  costType?: "resource" | "health";
  castTime: number;
  /** Line/projectile delivery retains the caster's position or facing from cast declaration. */
  castOrigin?: "start";
  castDirection?: "start";
  /** Select a circle's absolute ground destination at declaration, before later motion. */
  captureGroundAim?: "start";
  /** Revalidate unit-target or target-dash range/visibility at completion; invalid casts cost no resource/cooldown. */
  cancelOnInvalidTarget?: boolean;
  /** Override the default free completion cancellation for range-only or all invalid targets. */
  invalidTargetCost?: "range" | "all";
  /** Pure completion-time validation of an explicitly captured target, including an actual ally.
   * Return "range" for an otherwise valid body beyond reach, preserving range-only cost policies. */
  validTargetAtCompletion?: (world: World, unit: Unit) => boolean | "range";
  retainTargetOnVisibilityLoss?: boolean;
  retainTargetOnInvalidation?: boolean;
  /** Ground or line delivery starts at declaration, independently of cast completion. */
  deliveryAtCastStart?: boolean;
  /** Retain a dash created by onCastStart while the independent cast clock completes. */
  preserveCastStartDash?: boolean;
  /** Permit an instant, non-dash overlay while a dash already holds an independent action. */
  overlayResumedDash?: boolean;
  /** A line is delivered this many seconds into its cast; the original cast lock and completion costs remain. */
  deliveryDuringCastAt?: number;
  /** Already-created impacts remain relevant to the result after this caster dies. */
  persistsAfterDeath?: boolean;
  /** These CC types during the cast prevent delivery while retaining normal completion cost/cooldown. */
  failCastOnCC?: CCType[];
  moveWhileCasting?: boolean;
  /** A timed recast temporarily overlays its allowed channel, retaining its absolute clock. */
  preserveChannel?: boolean;
  /** Most cooldowns start when the cast time ends (wiki: "Cast time"). */
  cooldownAtCastStart?: boolean;
  /**
   * Wiki "Cooldown starts: post-effect": the cooldown waits until the cast's effect is over: its
   * empowered attacks are spent or run out, its channel or dash ends, its field fades, or the
   * states it put on the caster end.
   */
  cooldownAfter?: CooldownAfter;
  delivery: Delivery;
  /** Effects on the enemy when the ability lands. */
  onHit?: Effect[];
  /** Share of attached attack on-hit effects, when flags.appliesOnHit is set (Purge: 0.5). */
  onHitScale?: number;
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
   * Its hit matters beyond its effects (it builds toward a stun, Mark of the Storm): as a
   * skillshot, the fight splits on whether it lands instead of counting it by expected value.
   */
  decisive?: boolean;
  /**
   * Raw damage its hit deals beyond its `onHit` effects, for abilities whose hooks deal the
   * damage (Haymaker's grows with the Grit spent): what the enemy sees coming.
   */
  estimate?: (caster: Unit, target: Unit) => number;
  /** Additional delay before hook-delivered forecast damage, beyond ordinary cast and delivery time. */
  estimateDelay?: (caster: Unit, target: Unit) => number;
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
  /** The cast time now, when the caster's stats change it (Ntofo Strikes by bonus resistances); `castTime` stays the reference. */
  castTimeFor?: (unit: Unit) => number;
  /** The cooldown now, when the caster's stats or state change it; `cooldown` stays the reference. */
  cooldownFor?: (unit: Unit) => number;
  /**
   * Holds up to `max` charges (wiki: "Recharge"): each cast spends one and one restocks every
   * `recharge` seconds; `cooldown` is then the wait between casts. Fights start with all of them.
   */
  charges?: { max: number; recharge: number };
  /**
   * Castable during the caster's other casts and dashes without cancelling them (Umbral
   * Dash during The Darkin Blade). A dash cast this way holds the other cast until it ends.
   */
  overlay?: boolean;
  /** Instant overlay casts allowed during these channels, preserving their original clocks. */
  overlayChannels?: string[];
  /** Casts allowed to end these channels, without bypassing ordinary CC restrictions. */
  allowedDuringChannel?: string[];
  /**
   * This cast retains an already-declared windup at its original launch time (Bloodlust,
   * Decimate); "uncancellable" retains only an uncancellable windup, and cancels the others as
   * casting usually does (Crushing Blow's attack: "Other abilities can be used during the attack's animation").
   */
  preserveAttackWindup?: boolean | "uncancellable";
  /**
   * Its cast time is a charge or channel that crowd control interrupts as it would a channel
   * (Decimating Smash, Abyssal Dive): the cost is spent and, when `cooldown` is given, the
   * ability goes on that many seconds of cooldown (otherwise the one it started keeps running).
   */
  interruptible?: { cooldown?: number };
  /**
   * Repeated hits deal less (Tentacle slams): every hit of an ability of the same `group` the
   * target took in the last `window` seconds cuts this hit's damage by `per`, down to `floor`
   * of it. Hits counted by expected value count by their share.
   */
  falloff?: { group: string; window: number; per: number; floor: number };
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
  /** This kit's attached on-hit packet is also denied when basic attack damage is blocked. */
  blockStopsOnHit?: boolean;
  /** Opt in to basic modifiers and on-hits against real pets, without champion hit hooks. */
  onHitToPets?: boolean;
  /** Extra range against this particular target, in addition to ordinary range buffs. */
  bonusRangeFor?: (self: Unit, target: Unit) => number;
  /** Pure raw physical addition selected at impact, after ordinary critical damage. */
  bonusPhysicalFor?: (self: Unit, target: Unit, attack: AttackHitOptions) => number;
  /** Opt-in packets resolved before ordinary basic damage, with the attack's critical snapshot. */
  beforeDamage?: Effect[];
  /** The kit's attached on-hits precede its basic damage, without applying them twice. */
  onHitBeforeDamage?: boolean;
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
export interface ActualMovement {
  kind: "walk" | "dash" | "forced" | "blink" | "attached";
  from: number;
  to: number;
  startTick?: number;
  endTick: number;
  ended: boolean;
  ability?: string;
}

export interface KitHooks {
  /** Once, before the first tick. */
  onStart?(ctx: HookContext): void;
  onTick?(ctx: HookContext): void;
  /** Opt-in upkeep for already released effects on actual surviving recipients; no new actions. */
  onTickWhileDead?(ctx: HookContext): void;
  /** Explicit upkeep of a previously released movement-sensitive field after owner death. */
  movementEventsAfterDeath?: boolean;
  /** Actual clamped body movement; interruption may emit a zero-length final event. */
  onActualMovement?(ctx: HookContext & { target: Unit; targetPet?: Pet; movement: ActualMovement }): void;
  /** Explicit continuation of already granted allied pet attack effects after this owner dies. */
  ownedPetEventsAfterDeath?: boolean;
  /** Pure declaration-time target restriction. Already declared or launched attacks keep their entitlement. */
  canAttackTarget?(ctx: HookContext & { target: Unit; targetPet?: Pet }): boolean;
  /** A basic attack is declared (its windup starts). */
  onAttack?(ctx: HookContext & { action: Extract<Action, { kind: "windup" }>; targetPet?: Pet }): void;
  /** The windup ends. False replaces the default launch; a returned split also branches on the replacement missile. */
  onAttackLaunch?(ctx: HookContext & { action: Extract<Action, { kind: "windup" }>; targetPet?: Pet }): boolean | PendingSplit | void;
  /** A connected basic's target-local packet before ordinary on-hits and physical damage.
   * Blind, dodge, parry and whole-attack spell shields deny this callback. A damage
   * block is supplied explicitly; each passive decides whether it can still apply. */
  onAttackBeforeDamage?(ctx: HookContext & { pet?: Pet; blocked: boolean; critChance: number; attack: AttackHitOptions; scale: number }): void;
  /** A connected attack; blocked damage can still trigger some effects (Ragnarok). */
  onAttackHit?(ctx: HookContext & { blocked: boolean; critChance: number; attack: AttackHitOptions; scale: number }): void;
  /** A champion basic attack contacts a pet; champion-only hit hooks are separate. */
  onAttackPetHit?(ctx: HookContext & { pet: Pet; blocked: boolean; critChance: number; attack: AttackHitOptions; scale: number }): void;
  /** A declared attack reached resolution, including misses/avoidance, after its damage. */
  onAttackResolved?(ctx: HookContext & { blocked: boolean; missed: boolean }): void;
  /** Resolution of an actual pet target, kept separate from champion-only callbacks. */
  onAttackPetResolved?(ctx: HookContext & { pet: Pet; blocked: boolean; missed: boolean }): void;
  /** A hostile packet actually consumed this champion's spell shield, after charge removal. */
  onSpellShieldBlock?(ctx: HookContext & { source: Unit; shield: Readonly<Status>; ability?: AbilitySpec; effects: readonly Effect[]; originX: number }): void;
  /** The stance negated a hit; immobilizing says Riposte itself prevented an immobilize. */
  onParry?(ctx: HookContext & { immobilizing: boolean }): void;
  /**
   * Contact before defenses resolve. Return a replacement packet for effects that depend
   * on impact state; the supplied hit-band template must remain reusable by other worlds.
   */
  onAbilityContact?(ctx: HookContext & { ability: AbilitySpec; effects: readonly Effect[]; scale: number; originX: number; defense?: "parry" | "spellShield" | "dodge" | "block" | "immunity" }): Effect[] | void;
  /** A connected ability, after defensive guards and before applying its effects. */
  beforeAbilityHit?(ctx: HookContext & { ability: AbilitySpec; effects: Effect[]; scale: number }): void;
  /** `scale`: the share of the hit that counts, below 1 for skillshots resolved by expected value. */
  onAbilityHit?(ctx: HookContext & { ability: AbilitySpec; scale: number }): void;
  /** One of this unit's casts starts (before its cast time). */
  onCastStart?(ctx: HookContext & { ability: AbilitySpec; aim?: Aim }): void;
  /** One of this unit's casts completes. */
  onCast?(ctx: HookContext & { ability: AbilitySpec; aim?: Aim }): void;
  /** A completion-time target cancellation, after its explicit free/paid policy resolves. */
  onCastCancelled?(ctx: HookContext & { ability: AbilitySpec; reason: "range" | "target"; paid: boolean }): void;
  onEnemyCast?(ctx: HookContext & { ability: AbilitySpec; caster: Unit }): void;
  onChannelInterrupt?(ctx: HookContext & { ability: AbilitySpec; reason: "cc" | "recast" | "cast" | "move" | "attack" | "resurrection" | "death"; cc?: CCType }): void;
  onCCAttempt?(ctx: HookContext & { cc: CCType; source: Unit; ability?: string }): void;
  onCCApplied?(ctx: HookContext & { cc: CCType; source: Unit; ability?: string }): void;
  /** Accepted channel disruption, including kit-owned mobile channels without an Action. */
  onDisrupted?(ctx: HookContext & { source: Unit; ability?: string }): void;
  /** An enemy champion received hostile immobilization, after its own accepted-CC callback. */
  onEnemyCCApplied?(ctx: HookContext & { target: Unit; cc: CCType; source: Unit; ability?: string }): void;
  onTargetResurrection?(ctx: HookContext & { target: Unit }): void;
  onKill?(ctx: HookContext & { victim: Unit | Pet; pet?: Pet; damage?: { ability?: string; persistent?: boolean } }): void;
  /** One actual hostile combat death, once; expiry/replacement/despawn is excluded. */
  onDeathObserved?(ctx: HookContext & { source: Unit; victim: Unit | Pet; targetPet?: Pet }): void;
  /** Once before a special missile moves, including zero-speed and post-death phases. */
  onMissileTick?(ctx: HookContext & { missile: Missile }): void;
  /** A generic spell missile's core flight and payload are initialized, before insertion.
   * Callers may subsequently add special-flight options; kit-owned missiles remain kit-owned. */
  onMissileCreated?(ctx: HookContext & { ability: AbilitySpec; missile: Missile }): void;
  /** A generic ground-delivery zone is fully initialized, before insertion or immediate resolution. */
  onZoneCreated?(ctx: HookContext & { ability: AbilitySpec; zone: Zone }): void;
  onMissileMove?(ctx: HookContext & { missile: Missile; from: number; to: number }): void;
  /** Pure veto for custom fan/curve geometry or a collision-generated departing bounce. */
  canProjectileIntercept?(ctx: HookContext & { missile: Missile; from: number; to: number; target: Unit; exactPoint?: number }): boolean;
  /** A custom projectile resolves its real collision here; true claims the payload. */
  onProjectileIntercept?(ctx: HookContext & { missile: Missile; from: number; to: number; target: Unit }): boolean;
  onZoneTrigger?(ctx: HookContext & { zone: Zone; targetPet?: Pet }): void;
  onMissileContact?(ctx: HookContext & { missile: Missile; targetPet?: Pet }): void;
  onMissileEnd?(ctx: HookContext & { missile: Missile; reason: "range" | "owner" | "blocked" | "intercepted" }): void;
  onZoneLand?(ctx: HookContext & { zone: Zone }): void;
  /** Damage about to reach this unit, after mitigation and before shields. */
  beforeDamageTaken?(ctx: HookContext & { amount: number; damageType: DamageType; attack: boolean; persistent: boolean; ability?: string; petSource?: boolean }): void;
  /** Once after critical averaging and mitigation, before shields; state changes are allowed. */
  modifyDamageBeforeShields?(ctx: HookContext & { amount: number; damageType: DamageType; attack: boolean; persistent: boolean; ability?: string; petSource?: boolean; originX: number }): number;
  /** Pure adjustment of remaining HP damage after normal shields. */
  modifyDamageAfterShields?(ctx: HookContext & { amount: number; damageType: DamageType; attack: boolean; persistent: boolean; ability?: string; petSource?: boolean }): number;
  /** Pure pre-mitigation adjustment, independently evaluated for normal and critical outcomes. */
  modifyDamageTakenRaw?(ctx: HookContext & { raw: number; damageType: DamageType; attack: boolean; ability?: string; persistent: boolean }): number;
  /** Connected incoming on-hit application, including damage blocks but excluding misses, dodges and parries. */
  onIncomingOnHit?(ctx: HookContext & { attack: boolean; ability?: string; scale: number }): void;
  /** Immediately before a live dash moves, after this tick's cast completions. */
  onDashTick?(ctx: HookContext & { ability: AbilitySpec; action: Extract<Action, { kind: "dash" }> }): void;
  /** A dash ends at its actual completion/interrupt tick, after its contact effects. */
  onDashEnd?(ctx: HookContext & { ability: AbilitySpec; interrupted: boolean }): void;
  /** A blink has finished moving, before its landing effects. */
  onBlinkEnd?(ctx: HookContext & { ability: AbilitySpec }): void;
  /**
   * Damage or an execute brought this unit to 0 health. Returning true keeps it alive: the
   * hook has set its health and state (Glory in Death's reanimation, Skaarl fleeing).
   */
  onLethal?(ctx: HookContext): boolean;
  /** The death-defied timer expires, before the unit is finalized as dead. */
  onDeathDefiedEnd?(ctx: HookContext): void;
  /** `amount`: health lost; `mitigated`: the damage after resistances, shields included; `raw`: before resistances. */
  onDamageTaken?(ctx: HookContext & DamageReport): void;
  onDamageDealt?(ctx: HookContext & DamageReport & { attack: boolean; ability?: string; persistent: boolean }): void;
  /** A positive packet after mitigation and critical averaging, before shields, HP and
   * ordinary sleep removal. Source/target identify the real packet bodies. A proc may
   * resolve here before its triggering damage; consume its entitlement before recursion.
   * The triggering amount remains captured if that proc changes target defenses. */
  onBeforeDamageObserved?(ctx: HookContext & { source: Unit; target: Unit; targetPet?: Pet; amount: number; raw: number; damageType: DamageType; attack: boolean; persistent: boolean; ability?: string; petSource?: boolean }): void;
  /** Continue only a source's already granted before-damage entitlement after death.
   * Does not itself keep a duel running or invent another damage packet. */
  beforeDamageEventsAfterDeath?: boolean;
  /** Observes resolved damage packets, including actual pet actors and victims.
   * `mitigated` precedes late Riposte negation, as with onDamageDealt and vamp;
   * `amount` and `absorbed` report actual health loss and shield absorption.
   * Source/target are packet identities, distinct from this observing champion.
   * Read their state here; target-local mutations belong in contact hooks. */
  onDamageObserved?(ctx: HookContext & DamageReport & { source: Unit; target: Unit; targetPet?: Pet; attack: boolean }): void;
  /** One connected attack-like hit from an actual owned pet, once for the whole hit.
   * `enemy`/`target` are the actual victim; `blocked` distinguishes damage-only blocks.
   * Blind, dodge, parry and whole-attack spell shields deny the callback. */
  onOwnedPetBasicHit?(ctx: HookContext & { pet: Pet; target: Unit; targetPet?: Pet; blocked: boolean }): void;
  /** A real owned pet declares an actual basic attack, before its windup and hit defenses resolve.
   * Cosmetic and ability-like attacks do not emit this event. */
  onOwnedPetAttack?(ctx: HookContext & { pet: Pet; target: Unit; targetPet?: Pet }): void;
  /** One of the enemy's basic attacks was dodged, parried or blocked by this unit. */
  onAttackAvoided?(ctx: HookContext): void;
  /** One of this unit's pets was destroyed (by the enemy, or by its own owner when `byOwner`). */
  onPetDeath?(ctx: HookContext & { pet: Pet; byOwner: boolean }): void;
}

/** One hit of damage, as damage hooks see it. */
export interface DamageReport {
  amount: number;
  absorbed: number;
  /** Exact standard shields consumed by this packet, with their pre-consumption identities.
   * Custom legacy refunds remain in aggregate absorbed without an invented shield identity. */
  absorbedShields?: readonly { shield: Readonly<Status>; amount: number }[];
  petSource?: boolean;
  /** Post-mitigation packet, including shields, before late Riposte negation and HP floors/overkill. */
  mitigated: number;
  raw: number;
  damageType: DamageType;
  /** Persistent damage (DoT) is distinct from a direct ability or attack hit. */
  persistent: boolean;
  ability?: string;
}

/** What hooks can see and do. Implemented by the simulator (engine/sim/combat.ts). */
export interface HookContext {
  tick: number;
  world: World;
  self: Unit;
  enemy: Unit;
  memory: Record<string, number | string | boolean>;
  /** Register a real uncertain packet created by a kit hook for normal end-of-tick branching. */
  queueSplit(split: PendingSplit): void;
  /** Applies an effect from this unit to the enemy (or to itself when `toSelf`). */
  apply(effect: Effect, toSelf?: boolean): void;
  /** Sets a timed stat buff on this unit, replacing any earlier one with the same key. */
  buff(key: string, stat: BuffStat, amount: number, seconds: number): void;
  /** Restores health like regeneration (reduced by Grievous Wounds, not counted as healing). */
  regenerate(amount: number): void;
  /** Switches this unit to another of its forms (engine/sim/forms.ts). */
  transform(form: string, hp?: FormHealth): void;
  log(text: string): void;
}

/**
 * Health after a change of form: the same share of maximum health ("share", Mini Gnar), the
 * same missing health so that the gain in maximum health heals ("gain", Mega Gnar), or a
 * number of hit points (Kled's own health when Skaarl flees).
 */
export type FormHealth = "share" | "gain" | number;

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
  /** Average basic-attack damage split before mitigation (Yone's alternating swords: 75% physical, 25% magic). */
  attackSplit?: AttackSplit;
  /** Damage per second from hooks, before the target's resistances. */
  damage?: (self: Unit, target: Unit) => Partial<DamageByType>;
  /** Healing and shielding per second from hooks. Healing increases and Grievous Wounds scale it as healing. */
  healing?: (self: Unit, target: Unit) => number;
  /** Shielding per second from hooks, which healing increases and Grievous Wounds don't change (item shields, for the build search). */
  shielding?: (self: Unit, target: Unit) => number;
  /** Bought stats the kit's hooks multiply in fights (Living Forge's 30% more bonus armor), for the budget to value them so. */
  statMultipliers?: Partial<Record<"ad" | "ap" | "as" | "crit" | "ah" | "lethality" | "armpen" | "mpenflat" | "mpen" | "hp" | "armor" | "mr", number>>;
  /** Total resistance multipliers from hooks, including base resistance (Poppy, Malphite). Replaces the corresponding purchased-stat multiplier. */
  totalResistanceMultipliers?: Partial<Record<"armor" | "mr", number>>;
  /** The kit's own fights against the reference's counts (pipeline/items/calibrate.ts): set by the build search's estimate only. */
  calibration?: BudgetCalibration;
}

/**
 * Shares of the stat budget's reference counts that a kit's fights have: of its damage (basic
 * attacks, abilities and what its hooks add), of its basic attacks and of its casts. The
 * reference scales its terms by them.
 */
export interface BudgetCalibration {
  damage: number;
  attacks: number;
  casts: number;
  /** When the kit cast in its calibration fights, by ability name: one list per fight. */
  schedule?: ReadonlyArray<ReadonlyArray<{ at: number; ability: string }>>;
}

export interface FighterSpec {
  /** Target metadata of a real pet contact view; ordinary fighters are champions. */
  targetClass?: PetSpec["targetClass"];
  unitClass?: "clone";
  sizeClass?: PetSpec["sizeClass"];
  structureClass?: PetSpec["structureClass"];
  /** Pinned targeting classes keyed by exact summoned-unit name. */
  petTargetClasses?: Record<string, NonNullable<PetSpec["targetClass"]>>;
  id: string;
  name: string;
  resourceType?: string;
  /** Simultaneous passive conversions, without recursive gains or direct healing. */
  statConversions?: {
    healthToAP?: number; apToHealth?: number; moveSpeedBonusEffectiveness?: number;
    /** Mana-only: multiply maximum mana by one plus current AP times this coefficient. */
    apToManaPercent?: number;
    /** Source-mandated final movement speed, without own modifiers or another soft cap. */
    totalMoveSpeedOverride?: number;
    /** Source-mandated floor after ordinary modifiers, slows, soft caps and overrides. */
    minimumMoveSpeed?: number;
    /** Additional total AD from the post-reduction total, also counted as bonus AD. */
    attackDamageMultiplier?: { base: number; critChance: number; bonusAttackSpeed: number };
    /** Only base and growth attack speed affect attacks; bonus AS remains available to formulas. */
    fixedAttackSpeed?: boolean;
  };
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
  /** Which of the champion's forms this is (Mega Gnar, Cannon Stance), for kits with several. */
  form?: string;
  /**
   * Every form of the champion by name, this one included: a unit switches by taking another
   * form's spec (engine/sim/forms.ts). Ability keys are unique across forms; versions of a
   * spell that share a cooldown say so with `cooldownKey`.
   */
  forms?: Readonly<Record<string, FighterSpec>>;
}
