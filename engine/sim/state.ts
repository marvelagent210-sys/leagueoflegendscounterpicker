/**
 * The simulator's runtime state: two units on a line, missiles and zones in flight, and the
 * probability weight of this branch of the fight. Everything here can be copied, so a fight
 * can split on a skillshot that may or may not land.
 */
import type { DamageType } from "../rules/damage";
import type { ShieldType } from "../rules/defense";
import type { AttackSplit, Effect, FighterSpec, PetSpec } from "./spec";

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
  dot?: { damageType: DamageType; perHit: number; intervalTicks: number; nextTick: number };
  empower?: { attacks: number; onHit: Effect[]; bonusRange: number; uncancellable: boolean; split?: AttackSplit; windup?: number };
  /** What a triggered state does (antiDash), and the ability it comes from. */
  effects?: Effect[];
  ability?: string;
  /** Where an anchored state is (untargetableFar). */
  x?: number;
  /** Identifies a kit hook's buff, so setting it again replaces it. */
  memoKey?: string;
}

export type Action =
  | {
      kind: "windup";
      startTick: number;
      launchTick: number;
      uncancellable: boolean;
      blinded: boolean;
      onHit: Effect[];
      bonusRange: number;
      split?: AttackSplit;
      /** An attack on a pet (by id) rather than on the enemy champion. */
      pet?: number;
    }
  | { kind: "cast"; ability: string; startTick: number; endTick: number; aim?: Aim }
  | { kind: "channel"; ability: string; startTick: number; endTick: number; nextTick: number; intervalTicks: number }
  | {
      kind: "dash";
      ability: string;
      startTick: number;
      endTick: number;
      perTick: number;
      stopAtContact: boolean;
      unstoppable: boolean;
      /** A cast this dash was made during (an overlay dash): it carries on when the dash ends. */
      resume?: Action;
      /** Passes through the enemy, hitting it once on the way (`hit` once it has). */
      through?: boolean;
      hit?: boolean;
    };

/** Where a location-targeted dash goes: toward the enemy (1) or away (-1), and how far. */
export interface Aim {
  direction: -1 | 1;
  distance?: number;
}

export interface Unit {
  side: Side;
  spec: FighterSpec;
  /** Position on the line, in game units. */
  x: number;
  hp: number;
  resource: number;
  statuses: Status[];
  /** Tick each ability is next ready, by ability key. */
  cooldownReady: Record<string, number>;
  /** First tick a new attack windup may start. */
  attackReadyTick: number;
  action?: Action;
  /** Movement intent: toward the enemy (1), away (-1) or none. */
  move: -1 | 0 | 1;
  /** Which way the unit actually walked last tick, relative to the enemy: what the enemy sees. */
  moved: -1 | 0 | 1;
  /** Forced movement from a knock back or pull, in units per tick (positive is away from the enemy). */
  forced?: { endTick: number; perTick: number };
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
  totals: { damageDealt: number; damageTaken: number; healing: number; absorbed: number };
}

export interface Missile {
  id: number;
  owner: Side;
  /** "attack" or the key of the ability that fired it. */
  source: string;
  /** Tick the enemy could first see it coming: the start of the cast or windup. */
  seenTick: number;
  x: number;
  /** Units per tick. */
  perTick: number;
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
  attack?: { blinded: boolean; bonusOnHit: Effect[]; split?: AttackSplit };
  /** A basic attack flying at a pet (by id). */
  pet?: number;
}

/** A pet on the line (engine/sim/pets.ts). */
export interface Pet {
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
  /** Other effects where the enemy's center is, as absolute positions (sweet spots). */
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
  /** Fields: effects on the owner while its center is inside. */
  onOwner?: Effect[];
}

/**
 * Terrain an ability raised on the line (Pillar of Ice, Dark Procession's ring): units can't
 * walk, dash or be pushed into it, and a knock back that meets it stops there.
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
}

/** Effects waiting for their tick (see the "delayed" effect). */
export interface Scheduled {
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

export interface World {
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
    resource,
    statuses: [],
    cooldownReady: {},
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

function cloneUnit(unit: Unit): Unit {
  return {
    ...unit,
    statuses: unit.statuses.map(cloneStatus),
    cooldownReady: { ...unit.cooldownReady },
    chains: Object.fromEntries(Object.entries(unit.chains).map(([k, v]) => [k, { ...v }])),
    ...(unit.action ? { action: unit.action.kind === "dash" && unit.action.resume ? { ...unit.action, resume: { ...unit.action.resume } } : { ...unit.action } } : {}),
    ...(unit.forced ? { forced: { ...unit.forced } } : {}),
    ...(unit.attached ? { attached: { ...unit.attached } } : {}),
    memory: { ...unit.memory },
    totals: { ...unit.totals },
  };
}

export function cloneWorld(world: World): World {
  return {
    ...world,
    units: [cloneUnit(world.units[0]), cloneUnit(world.units[1])],
    missiles: world.missiles.map((m) => ({ ...m, ...(m.attack ? { attack: { ...m.attack } } : {}) })),
    zones: world.zones.map((z) => ({ ...z })),
    terrain: world.terrain.map((t) => ({ ...t })),
    pets: world.pets.map((p) => ({ ...p, memory: { ...p.memory } })),
    scheduled: world.scheduled.map((e) => ({ ...e })),
    modes: [...world.modes],
    log: world.settings.log ? [...world.log] : world.log,
    ...(world.result ? { result: { ...world.result } } : {}),
  };
}

export function other(side: Side): Side {
  return side === 0 ? 1 : 0;
}
