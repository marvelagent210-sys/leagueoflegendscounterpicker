/**
 * The simulator's runtime state: two units on a line, missiles and zones in flight, and the
 * probability weight of this branch of the fight. Everything here can be copied, so a fight
 * can split on a skillshot that may or may not land.
 */
import type { DamageType } from "../rules/damage";
import type { ShieldType } from "../rules/defense";
import type { CCType } from "../rules/crowdControl";
import type { AttackSplit, Effect, FighterSpec, Formula, PetSpec } from "./spec";
import type { PendingSplit } from "./actions";

export type Side = 0 | 1;

export interface Status {
  kind: "cc" | "state" | "stat" | "dot" | "shield" | "grievousWounds" | "empower" | "mark";
  /** The crowd control type, state, stat or source ability, depending on the kind. */
  key: string;
  source: Side;
  startTick: number;
  endTick: number;
  /** Strength: slow fraction, stat amount, minimum health, shield amount, ... */
  value: number;
  charges?: number;
  shieldType?: ShieldType;
  priority?: boolean;
  /** One incoming packet's HP damage that precedes a newly triggered shield. */
  firstDamageBypass?: number;
  /** Black Shield's CC protection follows this shield's lifetime and its incoming hit packet. */
  blackShield?: boolean;
  /** `label`: what its ticks are logged as (the ability's name). */
  dot?: { damageType: DamageType; perHit: number; intervalTicks: number; nextTick: number; label?: string; originX?: number };
  empower?: { attacks: number; onHit: Effect[]; bonusRange: number; uncancellable: boolean; hitsUntargetable?: boolean; spellShield?: boolean; spellShieldOnHit?: boolean; attackOnHitReplacement?: Effect[]; breakShields?: boolean; split?: AttackSplit; windup?: number };
  /** What a triggered state does (antiDash), and the ability it comes from. */
  effects?: Effect[];
  ability?: string;
  /** Where an anchored state is (untargetableFar). */
  x?: number;
  /** Identifies a kit hook's buff, so setting it again replaces it. */
  memoKey?: string;
  /** Crowd control most cleanses can't remove (non-dispellable). */
  sticky?: boolean;
  /** An explicit source exception to death/resurrection cleansing; normal expiry still applies. */
  persistThroughDeath?: boolean;
  tenacityGroup?: string;
  /** This particular slow is an explicit source exception to slow immunity. */
  bypassSlowImmune?: boolean;
  /** Explicit same-source group whose distinct slow applications multiply. */
  slowStackGroup?: string;
  /** Fixed epicenter of a sourced fear; omitted fears follow their actual caster. */
  fearOriginX?: number;
  /** This immunity applies to hostile sources only (Void Shift). */
  hostileOnly?: boolean;
  /** A reveal lasts only while this same-source, same-ability crowd control exists. */
  revealWhileCC?: CCType;
  /** Explicitly removed by an unrestricted CC cleanse, even during a mark-only tail. */
  cleanseWithCC?: boolean;
  /** A timed stat depends on a positive shield from this exact source and ability. */
  requiresShield?: boolean;
  /** A timed stat or control depends on this exact source and ability's crowd control. */
  whileCC?: CCType;
}

/** Attack properties captured with the windup and retained by an in-flight missile. */
export interface AttackHitOptions {
  /** Replaces the whole ordinary basic-damage packet; on-hits and attack defenses remain separate. */
  baseDamage?: { damageType: DamageType; amount: Formula; canCrit?: boolean; label?: string };
  critChance?: number;
  /** Scales the ordinary AD part, including its critical outcome, without scaling on-hits. */
  baseDamageScale?: number;
  /** Added after the ordinary critical outcome, inside the same basic physical packet. */
  bonusPhysical?: Formula;
  critMultiplier?: number;
  missileSpeed?: number;
  /** Identifies this launched attack independently of mutable kit memory. */
  attackTag?: string;
  spellShield?: boolean;
  spellShieldOnHit?: boolean;
  attackOnHitReplacement?: Effect[];
  breakShields?: boolean;
}

export type Action =
  | {
      kind: "windup";
      startTick: number;
      launchTick: number;
      uncancellable: boolean;
      hitsUntargetable?: boolean;
      critChance?: number;
      baseDamage?: AttackHitOptions["baseDamage"];
      baseDamageScale?: number;
      bonusPhysical?: Formula;
      critMultiplier?: number;
      missileSpeed?: number;
      attackTag?: string;
      spellShield?: boolean;
      spellShieldOnHit?: boolean;
      attackOnHitReplacement?: Effect[];
      breakShields?: boolean;
      blinded: boolean;
      onHit: Effect[];
      bonusRange: number;
      split?: AttackSplit;
      /** An attack on a pet (by id) rather than on the enemy champion. */
      pet?: number;
      /** The abilities whose empowerments this attack spent: their post-effect cooldowns wait for it to land. */
      empowered?: string[];
    }
  | { kind: "cast"; ability: string; startTick: number; endTick: number; aim?: Aim; cost?: number; resume?: Action; delivered?: boolean;
      /** Explicit target cancellation settles this declaration once, including an already collected due action. */
      cancelled?: boolean;
    }
  | {
      kind: "channel";
      ability: string;
      startTick: number;
      endTick: number;
      nextTick: number;
      intervalTicks: number;
      /** Exact formula-based pulse count and progress, without rounding every interval down. */
      pulseCount?: number;
      pulsesDone?: number;
    }
  | {
      kind: "dash";
      ability: string;
      startTick: number;
      endTick: number;
      perTick: number;
      stopAtContact: boolean;
      unstoppable: boolean;
      /** This dash's declaration already validated a clear endpoint across terrain. */
      crossTerrain?: boolean;
      /** A cast this dash was made during (an overlay dash): it carries on when the dash ends. */
      resume?: Action;
      /** Passes through the enemy, hitting it once on the way (`hit` once it has). */
      through?: boolean;
      hit?: boolean;
      /** A charge's speed: `from` (units a second) plus `amount` every `everyTicks`, up to `max`. */
      ramp?: { from: number; amount: number; everyTicks: number; max: number };
      /** A charge the enemy may sidestep: whether it lands, or the share of its hit that counts. */
      connects?: boolean;
      scale?: number;
      /** A charge that dashes at `speed` once within `within` units of the enemy, and the tick it did (`lockedTick`). */
      lockOn?: { within: number; speed: number };
      lockedTick?: number;
    };

/** Where a location-targeted dash or field goes: toward the enemy (1) or away (-1), and how far. */
export interface Aim {
  direction: -1 | 1;
  distance?: number;
}

export interface Unit {
  /** Present only on a temporary view of a real pet in combat transactions. */
  petId?: number;
  resurrection?: { endTick: number; ability?: string };
  deathDefied?: { endTick: number; ability?: string; allowMovement?: boolean; allowCasting?: boolean };
  deathNotified?: boolean;
  side: Side;
  spec: FighterSpec;
  /** Position on the line, in game units. */
  x: number;
  /** Persistent absolute facing; forced movement does not normally turn it. */
  facing?: 1 | -1;
  hp: number;
  resource: number;
  statuses: Status[];
  /** Tick each ability is next ready, by ability key. */
  cooldownReady: Record<string, number>;
  /** Post-effect cooldowns waiting for their cast's effect to end: cooldown key to ability key. */
  cooldownHeld: Record<string, string>;
  /** Refunds that came while a cooldown was held (post-effect): they shorten it when it starts. */
  pendingRefunds: Record<string, { seconds: number; fraction: number }>;
  /** Abilities with charges, by cooldown key: how many are stocked and when the next one comes (absent: full). */
  charges: Record<string, { count: number; nextTick: number }>;
  /** First tick a new attack windup may start. */
  attackReadyTick: number;
  action?: Action;
  /** A declared attack whose windup continues independently through an explicit cast/dash. */
  pendingAttack?: Extract<Action, { kind: "windup" }>;
  /** Movement intent: toward the enemy (1), away (-1) or none. */
  move: -1 | 0 | 1;
  /** Which way the unit actually walked last tick, relative to the enemy: what the enemy sees. */
  moved: -1 | 0 | 1;
  /**
   * Forced movement from a knock back or pull, in units per tick (positive is away from the
   * enemy). A throw over the enemy (`over`, Fling) moves along the line instead (positive is
   * toward larger x), passing through it.
   */
  forced?: { endTick: number; perTick: number; over?: boolean; absolute?: boolean; remaining?: number; ignoreUnitCollision?: boolean; startTick?: number; ability?: string };
  /**
   * Carried by the enemy until `endTick` (Ixtal's Impact, Devour): held `offset` units from its
   * center, on the side (`dir`, +1 or -1 along the line) it was on when grabbed.
   */
  attached?: { offset: number; dir: 1 | -1; endTick: number };
  /** Recastable abilities in progress, by root ability key: the last stage cast and when the window closes. */
  chains: Record<string, { stage: number; castTick: number; until: number }>;
  /** Free-form state for behaviors and kit hooks. */
  memory: Record<string, number | string | boolean>;
  alive: boolean;
  /**
   * Died, but fights on for a while (Glory in Death): the death counts, and if the enemy dies
   * before it is over, both have died.
   */
  fallen?: boolean;
  totals: { damageDealt: number; damageTaken: number; healing: number; absorbed: number };
}

export interface Missile {
  /** Kit-resolved collisions may hide a forecast without changing the actual flight or hit entitlement. */
  perceptionHidden?: boolean;
  /** Absolute contact clock for an explicitly kit-resolved fixed-time projectile.
   * Only perception uses this; movement and collision remain owned by its kit. */
  impactTick?: number;
  id: number;
  owner: Side;
  /** "attack" or the key of the ability that fired it. */
  source: string;
  /** Tick the enemy could first see it coming: the start of the cast or windup. */
  seenTick: number;
  x: number;
  /** Units per tick. */
  perTick: number;
  /** Velocity increase per tick and its cap, in units per tick (acceleration in units/s² divided by 900). */
  acceleration?: { perTick: number; maxPerTick: number; minPerTick?: number };
  piercing?: boolean;
  hitTargets?: number[];
  hitPets?: number[];
  followOwner?: boolean;
  radius?: number;
  collisionPet?: boolean;
  /** A kit-owned landing projectile has no ordinary hit packet but can be intercepted. */
  interceptable?: boolean;
  /** Collision payload still resolves, but this flight cannot continue or return. */
  intercepted?: boolean;
  collisionDistanceLeft?: number;
  ended?: boolean;
  expiresTick?: number;
  /** Homing missiles follow their target; others fly along the line until `travelLeft` runs out. */
  homing: boolean;
  direction: 1 | -1;
  travelLeft: number;
  projectile: boolean;
  /** Whether a skillshot connects: decided when it launches (see hitModel.ts). */
  connects: boolean;
  /** For expected-value skillshots: the share of their damage that counts. */
  scale: number;
  onHit: Effect[];
  /** For basic attacks: the attack's state when it launched. */
  attack?: { blinded: boolean; bonusOnHit: Effect[]; split?: AttackSplit } & AttackHitOptions;
  /** A specifically documented attack that survives its target becoming untargetable. */
  hitsUntargetable?: boolean;
  /** A basic attack flying at a pet (by id). */
  pet?: number;
  /** A location projectile releases this dormant area after reaching its destination. */
  landingZone?: { id: number; delayTicks: number };
}

/** A pet on the line (engine/sim/pets.ts). */
export interface Pet {
  /** Carried without changing this body's identity, ownership, health or launched packets. */
  carriedBy?: Side;
  /** Forced movement belongs to this actual body, never its owner. */
  forced?: Unit["forced"];
  statuses?: Status[];
  windup?: { target: Side | { pet: number }; launchTick: number; blinded: boolean; effects: Effect[] };
  id: number;
  owner: Side;
  spec: PetSpec;
  x: number;
  hp: number;
  endTick: number;
  /** The first tick it may attack again. */
  nextAttackTick: number;
  /** Free-form state for its owner's kit hooks (a turret's beam charge, ...). */
  memory: Record<string, number | string | boolean>;
}

export interface Zone {
  /** A real finite released effect whose next pulse is advanced by its kit hook. */
  pendingAfterDeath?: boolean;
  /** A shared spatial floor: evaluated for both sides, with optional healing denial at the floor. */
  healthProtection?: { minimumHealthFraction: number; preventHealingAtFloor?: boolean };
  memory?: Record<string, number | string | boolean>;
  id: number;
  owner: Side;
  /** A trap goes off when the enemy's hitbox touches it; a field pulses while it lasts. */
  kind: "projectileWall" | "delayedArea" | "trap" | "field";
  /** Tick the enemy could first see it coming (the start of the cast). */
  seenTick: number;
  x: number;
  radius: number;
  startTick: number;
  endTick: number;
  ability?: string;
  onHit?: Effect[];
  connects?: boolean;
  scale?: number;
  /** Effects in place of `onHit` where the enemy's center is, as absolute positions (sweet spots). */
  bands?: Array<{ from: number; to: number; onHit: Effect[] }>;
  /** For areas that move with the caster: offsets from its center when they land. */
  follow?: { near: number; far: number; bands?: Array<{ from: number; to: number; onHit: Effect[] }> };
  /** Hits by where the enemy's center is rather than its hitbox. */
  centered?: boolean;
  /** Fields: ticks between pulses and the tick of the next one. */
  interval?: number;
  nextTick?: number;
  /** Fields that move with their owner, centered `offset` units toward the enemy. */
  attached?: { offset: number };
  /** Fields that move toward the enemy, this many units a tick. */
  chase?: number;
  /** Fields whose pulses come in clusters: hits per cluster and ticks between them (left unchanged, so clones can share it). */
  burst?: { count: number; gap: number };
  /** The next pulse's place in its cluster (0 for the cluster's first). */
  burstHit?: number;
  /** Fields: effects on the owner while its center is inside. */
  onOwner?: Effect[];
  /** Its kit deals with the enemy's pets in it (Illaoi's slams on a Spirit): the engine leaves them be. */
  noPets?: boolean;
}

/**
 * Terrain an ability raised on the line (Pillar of Ice, Dark Procession's ring): units can't
 * dash or be pushed into it, and a knock back that meets it stops there.
 */
export interface Terrain {
  id: number;
  owner: Side;
  /** The stretch of the line it fills. */
  from: number;
  to: number;
  endTick: number;
  /** Impassable to the owner's enemy only (Dark Procession). */
  enemyOnly?: boolean;
  /**
   * A round obstacle in open ground (Pillar of Ice): walking units go around it, which along
   * the line is crossing it at 2/pi of their speed (half its circumference for its diameter).
   * Without it the terrain is a wall across the line, as a ring around a unit is.
   */
  round?: boolean;
}

/** Effects waiting for their tick (see the "delayed" effect). */
export interface Scheduled {
  targetPet?: number;
  tick: number;
  owner: Side;
  target: Side;
  effects: Effect[];
  /** Key of the ability they belong to. */
  ability?: string;
  scale: number;
}

export interface LogEntry {
  tick: number;
  side: Side;
  text: string;
}

export interface SimSettings {
  /** Seconds before a unit can respond to what the enemy starts doing. */
  reactionTime: number;
  /** Fights longer than this end in a timeout. */
  maxSeconds: number;
  /** Most branches a fight may split into on uncertain skillshots. */
  maxBranches: number;
  /** Spread of the skillshot hit model, in seconds. */
  hitSpread: number;
  /** A skillshot is decisive (worth branching on) if it disables, or deals this share of the target's health. */
  decisiveDamage: number;
  /** A fleeing unit has escaped once this far (edge to edge) from its enemy. */
  escapeDistance: number;
  /** A short trade is over once the trading unit has backed off this far (edge to edge). */
  disengageDistance: number;
  /** Seconds a short trade may last before the trading unit backs off anyway. */
  tradeSeconds: number;
  /** Lane surroundings (PLAN.md section 6). */
  environment: Environment;
  /**
   * The side that decides first on even ticks (the other on odd ones). Instant casts take
   * effect as they are decided, so the first word matters; scenarios run both ways.
   */
  firstMover: Side;
  log: boolean;
}

export interface Environment {
  /** Walls nearby: knock backs into terrain stun, wall dashes work (Camille's Hookshot). */
  walls: boolean;
  /** How far a knock back must push a unit to reach the wall behind it. */
  wallDistance: number;
  /** A minion wave: dash targets (Sweeping Blade). */
  minions: boolean;
  /** Brush nearby. */
  brush: boolean;
  /** Traps and turrets placed in advance (Noxious Trap). */
  laneSetup: boolean;
}

export const DEFAULT_ENVIRONMENT: Environment = { walls: true, wallDistance: 300, minions: true, brush: true, laneSetup: true };

export const DEFAULT_SETTINGS: SimSettings = {
  reactionTime: 0.25,
  maxSeconds: 30,
  maxBranches: 64,
  hitSpread: 0.06,
  decisiveDamage: 0.15,
  escapeDistance: 1400,
  disengageDistance: 700,
  tradeSeconds: 4,
  environment: DEFAULT_ENVIRONMENT,
  firstMover: 0,
  log: false,
};

/**
 * How a unit plays this fight:
 * - fight: all-in, close the gap and use everything;
 * - trade: walk in, spend the burst, back off;
 * - hold: hit back at whatever comes in reach, but don't walk after it;
 * - kite: keep the enemy at the edge of its own attack range;
 * - flee: run, using escapes and crowd control to get away;
 * - idle: do nothing (tests).
 */
export type Mode = "fight" | "trade" | "hold" | "kite" | "flee" | "idle";

export interface PetMissile {
  id: number;
  owner: Side;
  pet: number;
  target: Side | { pet: number };
  x: number;
  perTick: number;
  projectile: boolean;
  effects: Effect[];
  blinded: boolean;
  attackLike?: boolean;
  sourcePet?: Pet;
}

export interface World {
  petMissiles?: PetMissile[];
  tick: number;
  units: [Unit, Unit];
  missiles: Missile[];
  zones: Zone[];
  terrain: Terrain[];
  pets: Pet[];
  scheduled: Scheduled[];
  nextId: number;
  /** Probability of this branch. */
  weight: number;
  /** Times this branch has split. */
  splits: number;
  /** Hook-created packets waiting for normal branching; they cannot land before that fork. */
  pendingSplits?: PendingSplit[];
  modes: [Mode, Mode];
  settings: SimSettings;
  log: LogEntry[];
  /** Set when the fight is over. */
  result?: { winner: Side | "draw" | "none"; reason: "death" | "timeout" | "escaped" | "disengaged"; tick: number };
}

export function newUnit(spec: FighterSpec, side: Side, x: number, maxHp: number, resource: number): Unit {
  return {
    side,
    spec,
    x,
    hp: maxHp,
    facing: side === 0 ? 1 : -1,
    resource,
    statuses: [],
    cooldownReady: {},
    cooldownHeld: {},
    pendingRefunds: {},
    charges: {},
    attackReadyTick: 0,
    move: 0,
    moved: 0,
    chains: {},
    memory: {},
    alive: true,
    totals: { damageDealt: 0, damageTaken: 0, healing: 0, absorbed: 0 },
  };
}

function cloneStatus(status: Status): Status {
  return {
    ...status,
    ...(status.dot ? { dot: { ...status.dot } } : {}),
    ...(status.empower ? { empower: { ...status.empower } } : {}),
  };
}

/** Launch hooks can append on-hits to any retained windup after a world branches. */
function cloneWindup(action: Extract<Action, { kind: "windup" }>): Extract<Action, { kind: "windup" }> {
  return { ...action, ...(action.baseDamage ? { baseDamage: structuredClone(action.baseDamage) } : {}), onHit: [...action.onHit], ...(action.empowered ? { empowered: [...action.empowered] } : {}) };
}

function cloneAction(action: Action): Action {
  if (action.kind === "windup") return cloneWindup(action);
  return (action.kind === "cast" || action.kind === "dash") && action.resume
    ? { ...action, resume: cloneAction(action.resume) }
    : { ...action };
}

function cloneUnit(unit: Unit): Unit {
  return {
    ...unit,
    statuses: unit.statuses.map(cloneStatus),
    cooldownReady: { ...unit.cooldownReady },
    cooldownHeld: { ...unit.cooldownHeld },
    pendingRefunds: Object.fromEntries(Object.entries(unit.pendingRefunds).map(([k, v]) => [k, { ...v }])),
    charges: Object.fromEntries(Object.entries(unit.charges).map(([k, v]) => [k, { ...v }])),
    chains: Object.fromEntries(Object.entries(unit.chains).map(([k, v]) => [k, { ...v }])),
    ...(unit.action ? { action: cloneAction(unit.action) } : {}),
    ...(unit.pendingAttack ? { pendingAttack: cloneWindup(unit.pendingAttack) } : {}),
    ...(unit.forced ? { forced: { ...unit.forced } } : {}),
    ...(unit.attached ? { attached: { ...unit.attached } } : {}),
    ...(unit.resurrection ? { resurrection: { ...unit.resurrection } } : {}),
    ...(unit.deathDefied ? { deathDefied: { ...unit.deathDefied } } : {}),
    memory: { ...unit.memory },
    totals: { ...unit.totals },
  };
}

function clonePet(pet: Pet): Pet {
  return { ...pet, ...(pet.forced ? { forced: { ...pet.forced } } : {}), memory: { ...pet.memory }, ...(pet.statuses ? { statuses: pet.statuses.map((s) => ({ ...s, ...(s.dot ? { dot: { ...s.dot } } : {}), ...(s.empower ? { empower: { ...s.empower, onHit: [...s.empower.onHit] } } : {}) })) } : {}), ...(pet.windup ? { windup: { ...pet.windup, target: typeof pet.windup.target === "number" ? pet.windup.target : { ...pet.windup.target }, effects: [...pet.windup.effects] } } : {}) };
}

export function cloneWorld(world: World): World {
  return {
    ...world,
    ...(world.pendingSplits ? { pendingSplits: structuredClone(world.pendingSplits) } : {}),
    units: [cloneUnit(world.units[0]), cloneUnit(world.units[1])],
    missiles: world.missiles.map((m) => ({ ...m, ...(m.attack ? { attack: { ...m.attack, ...(m.attack.baseDamage ? { baseDamage: structuredClone(m.attack.baseDamage) } : {}) } } : {}), ...(m.acceleration ? { acceleration: { ...m.acceleration } } : {}), ...(m.hitTargets ? { hitTargets: [...m.hitTargets] } : {}), ...(m.hitPets ? { hitPets: [...m.hitPets] } : {}) })),
    zones: world.zones.map((z) => ({ ...z, ...(z.memory ? { memory: { ...z.memory } } : {}), ...(z.healthProtection ? { healthProtection: { ...z.healthProtection } } : {}) })),
    terrain: world.terrain.map((t) => ({ ...t })),
    pets: world.pets.map(clonePet),
    ...(world.petMissiles ? { petMissiles: world.petMissiles.map((m) => ({ ...m, target: typeof m.target === "number" ? m.target : { ...m.target }, effects: [...m.effects], ...(m.sourcePet ? { sourcePet: clonePet(m.sourcePet) } : {}) })) } : {}),
    scheduled: world.scheduled.map((e) => ({ ...e })),
    modes: [...world.modes],
    log: world.settings.log ? [...world.log] : world.log,
    ...(world.result ? { result: { ...world.result } } : {}),
  };
}

export function other(side: Side): Side {
  return side === 0 ? 1 : 0;
}

/** A hook may create a packet before the flight phase; defer it until its probability is resolved. */
export function awaitsSplit(world: World, kind: "missile" | "zone" | "dash", id: number): boolean {
  const contains = (splits: PendingSplit[]): boolean => splits.some(split => split[kind] === id || (split.followUps ? contains(split.followUps) : false));
  return world.pendingSplits ? contains(world.pendingSplits) : false;
}
