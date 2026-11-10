/**
 * The duel loop. Each tick (1/30 s):
 *
 *  1. expired statuses and forced movement end, retaining a DoT's final due pulse;
 *  2. delayed effects land; kit hooks, damage over time and regeneration run;
 *  3. missiles fly and ground areas land;
 *  4. attack windups and cast times that are due complete: all of them are collected first,
 *     then applied, so neither unit gets the first word on a shared tick;
 *  5. dashes move and channels pulse;
 *  6. behaviors choose what to do (up to three commands, for instant casts);
 *  7. units walk, crowd control drags them, and knock backs push them; edges can't overlap;
 *  8. deaths: both on the same tick is a draw.
 *
 * The two units take turns going first within a phase, by tick parity.
 *
 * A skillshot whose landing is uncertain and that decides fights (it disables, or deals a
 * large share of the target's health) splits the fight into a world where it lands and one
 * where it misses, weighted by the hit model's chance; minor ones count by their expected
 * value. The outcome sums every finished world by its weight, so it is exact for the model
 * and deterministic.
 */
import { CC_RULES } from "../rules/crowdControl";
import { toTicks } from "../rules/time";
import {
  type PendingSplit,
  EPSILON,
  advanceMissiles,
  advanceZones,
  canCast,
  canStartAttack,
  canStartAttackOnPet,
  cancelOutOfRange,
  completeCast,
  deliverDuringCast,
  expireChains,
  inAttackRange,
  launchAttack,
  progressChannel,
  progressDash,
  releaseCooldowns,
  restockCharges,
  startAttack,
  startCast,
} from "./actions";
import { type Behavior, type Command, defaultBehavior, perceive, traitsOf } from "./behavior";
import { applyEffect, contactGap, dealDamage, directionTo, edgeDistance, endForcedMovement, heal, hookContext, log, notifyActualMovement } from "./combat";
import { canMove, ccTypes, derive, hasState } from "./derived";
import { abilityOf } from "./forms";
import { advancePets, expirePetHealth, petEffects } from "./pets";
import { advanceLifecycles } from "./lifecycle";
import { aroundFactor, expireTerrain, terrainLimit } from "./terrain";
import type { FighterSpec } from "./spec";
import { DEFAULT_SETTINGS, type Action, type LogEntry, type Mode, type Side, type SimSettings, type Unit, type World, cloneWorld, newUnit, other } from "./state";

export interface FightSetup {
  fighters: [FighterSpec, FighterSpec];
  /** Edge-to-edge distance at the start. */
  distance: number;
  modes: [Mode, Mode];
  behaviors?: [Behavior | undefined, Behavior | undefined];
  settings?: Partial<SimSettings>;
  /** Starting health as a share of maximum health. */
  hp?: [number, number];
}

export interface Leaf {
  weight: number;
  winner: Side | "draw" | "none";
  reason: "death" | "timeout" | "escaped" | "disengaged";
  seconds: number;
  /** Health left as a share of maximum health. */
  hp: [number, number];
  damage: [number, number];
}

export interface FightOutcome {
  /** Chance each side kills the other and lives. */
  win: [number, number];
  /** Both die on the same tick. */
  draw: number;
  /** Chances of the ways a fight ends without a kill. */
  timeout: number;
  escaped: number;
  disengaged: number;
  /** Expected health left, as a share of maximum health (0 when dead). */
  hp: [number, number];
  /** Expected damage dealt (health removed). */
  damage: [number, number];
  /** Expected length in seconds. */
  seconds: number;
  branches: number;
  /** The log of the most likely branch (when `settings.log` is on). */
  timeline: LogEntry[];
  leaves: Leaf[];
}

const MAX_COMMANDS_PER_TICK = 3;

export function createWorld(setup: FightSetup): World {
  const settings = { ...DEFAULT_SETTINGS, ...setup.settings };
  const [a, b] = setup.fighters;
  const units = setup.fighters.map((spec, i) => {
    const side = i as Side;
    const x = side === 0 ? 0 : a.base.radius + b.base.radius + setup.distance;
    const maxHp = spec.base.hp + (spec.bonus?.hp ?? 0);
    return newUnit(spec, side, x, maxHp, spec.resourceStart ?? spec.base.resource);
  }) as [Unit, Unit];
  const world: World = {
    tick: 0,
    units,
    missiles: [],
    zones: [],
    terrain: [],
    pets: [],
    scheduled: [],
    nextId: 1,
    weight: 1,
    splits: 0,
    modes: [...setup.modes],
    settings: { ...settings, environment: { ...DEFAULT_SETTINGS.environment, ...setup.settings?.environment } },
    log: [],
  };
  // Innate effects and kit setup (traps placed in advance, ...) before the first tick.
  for (const unit of units) {
    for (const effect of unit.spec.start ?? []) applyEffect(world, unit, unit, effect, { scale: 1 });
  }
  for (const unit of units) unit.spec.hooks?.onStart?.(hookContext(world, unit));
  units.forEach((unit, i) => {
    const directCaps = unit.statuses.filter(status => status.kind === "state" && status.key === "maximumHealthGainCap");
    unit.hp = Math.min(derive(unit).maxHp * (setup.hp?.[i] ?? 1), ...directCaps.map(status => status.value));
    // Innate mana conversion establishes the full pool once, after setup. Later
    // changes affect the cap without refunding mana spent during the fight.
    if (unit.spec.resourceType === "Mana" && unit.spec.statConversions?.apToManaPercent !== undefined
        && unit.spec.resourceStart === undefined) unit.resource = derive(unit).maxResource;
  });
  return world;
}

function order(world: World): [Side, Side] {
  return (world.tick + world.settings.firstMover) % 2 === 0 ? [0, 1] : [1, 0];
}

// ---------------------------------------------------------------------------------------
// Phases

function runScheduled(world: World): void {
  if (world.scheduled.length === 0) return;
  const due = world.scheduled.filter((e) => e.tick <= world.tick);
  if (due.length === 0) return;
  world.scheduled = world.scheduled.filter((e) => e.tick > world.tick);
  for (const entry of due) {
    const owner = world.units[entry.owner];
    if (entry.targetPet !== undefined) {
      const pet = world.pets.find((candidate) => candidate.id === entry.targetPet);
      if (pet) petEffects(world, owner, pet, entry.effects, "persistent", entry.ability, entry.scale);
      continue;
    }
    const target = world.units[entry.target];
    if (!target.alive) continue;
    const ability = abilityOf(owner, entry.ability);
    for (const effect of entry.effects) applyEffect(world, owner, target, effect, { scale: entry.scale, ...(ability ? { ability } : {}) });
  }
}

/** Kit hooks, damage over time and regeneration. */
function upkeep(world: World, unit: Unit): void {
  if (!unit.alive) { unit.spec.hooks?.onTickWhileDead?.(hookContext(world, unit)); return; }
  unit.spec.hooks?.onTick?.(hookContext(world, unit));
  for (const status of unit.statuses) {
    const dot = status.dot;
    if (status.kind !== "dot" || !dot || world.tick < dot.nextTick || world.tick > status.endTick) continue;
    dot.nextTick += dot.intervalTicks;
    dealDamage(world, world.units[status.source], unit, dot.perHit, dot.damageType, { ability: dot.label ?? status.key, persistent: true, ...(dot.originX !== undefined ? { originX: dot.originX } : {}) });
  }
  const { base } = unit.spec;
  heal(world, unit, base.hpRegen / 5 / 30, true);
  // Regeneration fills up to the maximum, which also caps what is left when a bonus to it ends.
  unit.resource = Math.min(derive(unit).maxResource, unit.resource + base.resourceRegen / 5 / 30);
}

function expire(world: World, unit: Unit, keepFinalDot = false): void {
  const active = (s: Unit["statuses"][number]) => s.endTick > world.tick || (keepFinalDot && s.kind === "dot" && s.endTick === world.tick && s.dot !== undefined && s.dot.nextTick <= world.tick);
  if (unit.statuses.some((s) => !active(s))) {
    unit.statuses = unit.statuses.filter(active);
    // Losing bonus maximum health doesn't take current health with it, but caps it.
    unit.hp = Math.min(unit.hp, derive(unit).maxHp);
  }
  if (unit.forced && unit.forced.endTick <= world.tick) endForcedMovement(world, unit);
  expireChains(world, unit);
  releaseCooldowns(world, unit);
  restockCharges(world, unit);
}

/** Windups and casts due this tick: all are collected before any is applied. */
function completeActions(world: World, splits: PendingSplit[]): void {
  const due = order(world)
    .flatMap((side) => {
      const unit = world.units[side];
      // A permitted spell can run alongside an older attack; both retain their own
      // completion times. Collect both before applying either side's due actions.
      const actions: Array<{ unit: Unit; action: Action | undefined; overlay?: Extract<Action, { kind: "dash" }> }> = [{ unit, action: unit.pendingAttack }, { unit, action: unit.action }];
      // A permitted nonzero cast during a dash keeps its own deadline. The dash
      // remains the movement action until its independently scheduled end.
      if (unit.action?.kind === "dash" && unit.action.resume?.kind === "cast") actions.push({ unit, action: unit.action.resume, overlay: unit.action });
      return actions;
    })
    .filter(({ unit, action }) => {
      if (!unit.alive || !action) return false;
      if (action.kind === "windup") return action.launchTick <= world.tick;
      if (action.kind !== "cast") return false;
      const offset = abilityOf(unit, action.ability)?.deliveryDuringCastAt;
      return action.endTick <= world.tick || (!action.delivered && offset !== undefined && world.tick >= action.startTick + toTicks(offset));
    });
  for (const { unit, action, overlay } of due) {
    if (action?.kind === "windup") {
      const split = launchAttack(world, unit, action);
      if (split) splits.push(split);
    }
    else if (action?.kind === "cast") {
      if (action.cancelled) continue;
      const ability = abilityOf(unit, action.ability);
      if (!ability) continue;
      if (!action.delivered && ability.deliveryDuringCastAt !== undefined && world.tick >= action.startTick + toTicks(ability.deliveryDuringCastAt)) {
        action.delivered = true;
        const early = deliverDuringCast(world, unit, ability, action.startTick, action.aim);
        if (early) splits.push(early);
      }
      if (action.endTick > world.tick) continue;
      if (unit.action === action) unit.action = action.resume;
      else if (overlay?.resume === action) overlay.resume = action.resume;
      const split = completeCast(world, unit, ability, action.startTick, action.aim, action.cost);
      if (split) splits.push(split);
    }
  }
}

/** Crowd control that takes over: taunt and berserk make the unit attack its source. */
function forcedAttack(world: World, unit: Unit): void {
  const types = ccTypes(unit);
  if (!types.has("taunt") && !types.has("berserk")) return;
  // Forced action can't make a unit do what other crowd control disables.
  for (const type of types) {
    if (type === "taunt" || type === "berserk") continue;
    const rule = CC_RULES[type].attacking;
    if (rule === "disabled" || rule === "uncontrollable") return;
  }
  const enemy = world.units[other(unit.side)];
  if (unit.action === undefined && !unit.pendingAttack && unit.attackReadyTick <= world.tick && enemy.alive && inAttackRange(unit, enemy)) startAttack(world, unit);
}

function beginTrade(world: World, unit: Unit): void {
  if (world.modes[unit.side] === "trade" && unit.memory.tradeStart === undefined) unit.memory.tradeStart = world.tick;
}

function execute(world: World, unit: Unit, command: Command): { acted: boolean; split?: PendingSplit } {
  switch (command.kind) {
    case "move":
      if (unit.resurrection || (unit.deathDefied && !unit.deathDefied.allowMovement)) { unit.move = 0; return { acted: false }; }
      if (command.direction !== 0 && unit.action?.kind === "channel") {
        const action = unit.action;
        const ability = abilityOf(unit, action.ability);
        const cancelAfter = ability?.channel?.cancelAfter;
        if (cancelAfter !== undefined && !ability?.channel?.mobile) {
          if (world.tick < action.startTick + toTicks(cancelAfter) || (ability?.channel?.cancelBeforeEnd !== undefined && world.tick >= action.endTick - toTicks(ability.channel.cancelBeforeEnd))) { unit.move = 0; return { acted: false }; }
          unit.action = undefined;
          if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "move" });
        }
      }
      if (command.direction !== 0 && unit.action?.kind === "windup" && !unit.action.uncancellable) {
        // Walking off cancels the windup and resets the attack timer.
        unit.action = undefined;
        unit.attackReadyTick = world.tick;
      }
      unit.move = command.direction;
      return { acted: true };
    case "attack": {
      if (command.pet !== undefined) {
        const pet = world.pets.find((p) => p.id === command.pet);
        if (!pet) return { acted: false };
        if (unit.action?.kind === "channel") {
          const action = unit.action;
          const ability = abilityOf(unit, action.ability);
          const cancelAfter = ability?.channel?.cancelAttackOtherAfter ?? ability?.channel?.cancelAttackAfter;
          if (cancelAfter === undefined || world.tick < action.startTick + toTicks(cancelAfter) || (ability?.channel?.cancelBeforeEnd !== undefined && world.tick >= action.endTick - toTicks(ability.channel.cancelBeforeEnd))) return { acted: false };
          unit.action = undefined;
          if (!canStartAttackOnPet(world, unit, pet)) { unit.action = action; return { acted: false }; }
          if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "attack" });
        }
        if (!canStartAttackOnPet(world, unit, pet)) return { acted: false };
        if (pet.owner !== unit.side) beginTrade(world, unit);
        startAttack(world, unit, pet);
        return { acted: true };
      }
      if (unit.action?.kind === "channel") {
        const action = unit.action;
        const ability = abilityOf(unit, action.ability);
        const cancelAfter = ability?.channel?.cancelAttackAfter;
        if (cancelAfter === undefined || world.tick < action.startTick + toTicks(cancelAfter) || (ability?.channel?.cancelBeforeEnd !== undefined && world.tick >= action.endTick - toTicks(ability.channel.cancelBeforeEnd))) return { acted: false };
        unit.action = undefined;
        if (!canStartAttack(world, unit)) { unit.action = action; return { acted: false }; }
        if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "attack" });
      }
      if (!canStartAttack(world, unit)) return { acted: false };
      beginTrade(world, unit);
      startAttack(world, unit);
      return { acted: true };
    }
    case "cast": {
      const ability = unit.spec.abilities.find((a) => a.key === command.ability);
      if (!ability || !canCast(world, unit, ability)) return { acted: false };
      const traits = traitsOf(ability);
      if (traits.damage || traits.cc) beginTrade(world, unit);
      if (command.dodge !== undefined) {
        // A dash or blink in answer to a skillshot gets the unit out of its way.
        const missile = world.missiles.find((m) => m.id === command.dodge);
        const zone = world.zones.find((z) => z.id === command.dodge);
        if (missile) missile.connects = false;
        if (zone) zone.connects = false;
        log(world, unit.side, `dodges with ${ability.name}`);
      }
      const split = startCast(world, unit, ability, command.aim);
      return split ? { acted: true, split } : { acted: true };
    }
  }
}

function decide(world: World, unit: Unit, behavior: Behavior, splits: PendingSplit[]): void {
  if (!unit.alive) return;
  forcedAttack(world, unit);
  for (let i = 0; i < MAX_COMMANDS_PER_TICK; i++) {
    const command = behavior(perceive(world, unit.side));
    if (!command) break;
    const result = execute(world, unit, command);
    if (result.split) splits.push(result.split);
    if (!result.acted || command.kind === "move" || unit.action) break;
  }
}

/** Whether the unit's current action lets it walk. */
function walksDuringAction(unit: Unit): boolean {
  const action = unit.action;
  if (!action) return true;
  if (action.kind === "windup" || action.kind === "dash") return false;
  const ability = abilityOf(unit, action.ability);
  return action.kind === "cast" ? ability?.moveWhileCasting === true : ability?.channel?.mobile === true;
}

function walk(world: World, unit: Unit): void {
  if (!unit.alive || (unit.deathDefied && !unit.deathDefied.allowMovement)) return;
  const from = unit.x;
  const enemy = world.units[other(unit.side)];
  if (unit.attached) {
    // Carried by the enemy: held at its side.
    if (world.tick < unit.attached.endTick && enemy.alive) {
      unit.x = enemy.x + unit.attached.dir * unit.attached.offset;
      notifyActualMovement(world, unit, from, { kind: "attached", endTick: unit.attached.endTick, ended: false });
      unit.moved = 0;
      return;
    }
    delete unit.attached;
  }
  const toward = directionTo(unit, enemy);
  const forced = unit.forced;
  let dx = 0;
  if (unit.forced) {
    dx = unit.forced.over || unit.forced.absolute ? unit.forced.perTick : -toward * unit.forced.perTick;
    if (unit.forced.remaining !== undefined) {
      dx = Math.sign(dx) * Math.min(Math.abs(dx), unit.forced.remaining);
      unit.forced.remaining -= Math.abs(dx);
    }
  } else {
    const types = ccTypes(unit);
    const held = [...types].some((t) => CC_RULES[t].movement === "disabled");
    let direction = 0;
    if (!held && walksDuringAction(unit)) {
      if (types.has("taunt") || types.has("berserk")) direction = inAttackRange(unit, enemy) ? 0 : 1;
      else if (types.has("charm")) direction = 1;
      else if (types.has("fear")) {
        const fear = unit.statuses.findLast(status => status.kind === "cc" && status.key === "fear");
        const origin = fear?.fearOriginX;
        direction = origin === undefined ? -1 : Math.abs(unit.x - origin) <= 1e-6
          ? (unit.side === 0 ? -1 : 1) * toward : Math.sign(unit.x - origin) * toward;
      }
      else if (canMove(unit)) direction = unit.move;
    }
    dx = direction * toward * (derive(unit).moveSpeed / 30);
  }
  if (unit.forced?.over) {
    // Thrown over the enemy: no collision, no terrain.
    unit.x += dx;
    notifyActualMovement(world, unit, from, { kind: "forced", endTick: forced!.endTick, ended: false,
      ...(forced!.startTick !== undefined ? { startTick: forced!.startTick } : {}), ...(forced!.ability ? { ability: forced!.ability } : {}) });
    unit.moved = 0;
    return;
  }
  // Champions collide: moving toward the enemy stops where their pathing radii touch.
  const postDeathGhosted = unit.deathDefied?.allowMovement && hasState(unit, "ghosted");
  const flyingGhosted = !unit.forced && hasState(unit, "terrainIgnore") && hasState(unit, "ghosted");
  if (dx * toward > 0 && !unit.forced?.ignoreUnitCollision && !postDeathGhosted && !flyingGhosted) dx = toward * Math.min(Math.abs(dx), Math.max(0, contactGap(unit, enemy)));
  // Terrain stops knock backs, and walking into walls; walking around a round obstacle is slower along the line.
  const walking = !unit.forced;
  const limited = terrainLimit(world, unit, dx, walking);
  const forcedStopped = limited !== dx && unit.forced !== undefined;
  if (forcedStopped) delete unit.forced;
  dx = walking ? limited * aroundFactor(world, unit, limited) : limited;
  unit.x += dx;
  notifyActualMovement(world, unit, from, { kind: walking ? "walk" : "forced", endTick: forcedStopped ? world.tick : forced?.endTick ?? world.tick,
    ended: walking || forcedStopped, ...(forced?.startTick !== undefined ? { startTick: forced.startTick } : {}), ...(forced?.ability ? { ability: forced.ability } : {}) });
  if (walking && dx !== 0) unit.facing = dx > 0 ? 1 : -1;
  unit.moved = dx === 0 ? 0 : dx * toward > 0 ? 1 : -1;
}

function threatsInFlight(world: World, side: Side): boolean {
  return (
    world.missiles.some((m) => m.owner !== side) ||
    (world.petMissiles ?? []).some((m) => m.owner !== side && m.target === side) ||
    world.zones.some((z) => z.owner !== side && z.kind === "delayedArea") ||
    world.scheduled.some((e) => e.target === side)
  );
}

function checkEnd(world: World): void {
  const [a, b] = world.units;
  const deadA = a.hp <= 0;
  const deadB = b.hp <= 0;
  if (deadA) a.alive = false;
  if (deadB) b.alive = false;
  const end = (winner: Side | "draw" | "none", reason: NonNullable<World["result"]>["reason"]) => {
    world.result = { winner, reason, tick: world.tick };
  };
  // A unit that has fallen (Glory in Death) has died already.
  if ((deadA || a.fallen) && (deadB || b.fallen) && (deadA || deadB)) return end("draw", "death");
  const pendingPersistent = (owner: Unit, survivor: Unit) => {
    const persistent = (key: string | undefined) => {
      const ability = abilityOf(owner, key);
      return ability?.persistsAfterDeath || ability?.deliveryAtCastStart;
    };
    return world.tick < toTicks(world.settings.maxSeconds) && (
      world.missiles.some((m) => m.owner === owner.side && (m.source === "attack" || m.attack !== undefined || persistent(m.source))) ||
      (world.petMissiles ?? []).some((m) => m.owner === owner.side && m.target === survivor.side) ||
      world.zones.some((z) => z.owner === owner.side && (z.kind === "delayedArea" || (z.kind === "field" && z.endTick > world.tick && (z.nextTick ?? Infinity) < z.endTick)) && (z.onHit?.length ?? 0) > 0 && persistent(z.ability)) ||
      world.zones.some((z) => z.owner === owner.side && z.pendingAfterDeath === true && z.endTick > world.tick
        && abilityOf(owner, z.ability)?.persistsAfterDeath === true) ||
      world.scheduled.some((e) => e.owner === owner.side && e.target === survivor.side && persistent(e.ability)) ||
      survivor.statuses.some((status) => status.kind === "dot" && status.source === owner.side && status.dot && status.dot.perHit > 0 && status.dot.nextTick <= status.endTick && status.endTick > world.tick && persistent(status.ability ?? status.key))
    );
  };
  if (deadA) { if (pendingPersistent(a, b)) return; return end(1, "death"); }
  if (deadB) { if (pendingPersistent(b, a)) return; return end(0, "death"); }
  const distance = edgeDistance(a, b);
  const lifecyclePending = world.units.some((unit) => unit.resurrection || unit.deathDefied);
  for (const unit of world.units) {
    const mode = world.modes[unit.side];
    if (!lifecyclePending && mode === "flee" && distance + EPSILON >= world.settings.escapeDistance && !threatsInFlight(world, unit.side)) return end("none", "escaped");
    if (!lifecyclePending && mode === "trade" && unit.memory.tradeDone && distance + EPSILON >= world.settings.disengageDistance && !threatsInFlight(world, unit.side)) {
      return end("none", "disengaged");
    }
  }
  if (world.tick >= toTicks(world.settings.maxSeconds)) end("none", "timeout");
}

/** Runs one tick; returns the skillshots the fight should split on. */
export function step(world: World, behaviors: [Behavior, Behavior]): PendingSplit[] {
  const splits: PendingSplit[] = [];
  advanceLifecycles(world);
  const sides = order(world);
  // Incoming effects at t must not see protection that ended at t. DoTs intentionally
  // include their final scheduled pulse, which upkeep delivers before the second expiry.
  for (const side of sides) expire(world, world.units[side], true);
  expirePetHealth(world);
  expireTerrain(world);
  runScheduled(world);
  for (const side of sides) upkeep(world, world.units[side]);
  for (const side of sides) expire(world, world.units[side]);
  advanceMissiles(world);
  advanceZones(world);
  advancePets(world);
  completeActions(world, splits);
  for (const side of sides) {
    progressDash(world, world.units[side]);
    progressChannel(world, world.units[side]);
  }
  for (const side of sides) decide(world, world.units[side], behaviors[side], splits);
  for (const side of sides) walk(world, world.units[side]);
  for (const side of sides) cancelOutOfRange(world, world.units[side]);
  checkEnd(world);
  if (!world.result) world.tick += 1;
  if (world.pendingSplits) {
    splits.push(...world.pendingSplits);
    delete world.pendingSplits;
  }
  return splits;
}

// ---------------------------------------------------------------------------------------
// Branching

function splitTarget(world: World, split: PendingSplit): { connects?: boolean; scale?: number } | undefined {
  if (split.missile !== undefined) return world.missiles.find((m) => m.id === split.missile);
  if (split.zone !== undefined) return world.zones.find((z) => z.id === split.zone);
  if (split.dash !== undefined) {
    const action = world.units[split.dash].action;
    return action?.kind === "dash" ? action : undefined;
  }
  return undefined;
}

/** Splits a world on each uncertain skillshot: one copy where it lands, one where it misses. */
export function fork(world: World, splits: PendingSplit[]): World[] {
  const maxSplits = Math.floor(Math.log2(world.settings.maxBranches));
  let worlds = [world];
  const allSplits = (pending: PendingSplit[]): PendingSplit[] => pending.flatMap((s) => [s, ...allSplits(s.followUps ?? [])]);
  for (const split of allSplits(splits)) {
    const next: World[] = [];
    for (const w of worlds) {
      const target = splitTarget(w, split);
      if (!target) {
        next.push(w);
        continue;
      }
      if (w.splits >= maxSplits) {
        // Out of branches: count it by its expected value instead.
        target.scale = (target.scale ?? 1) * split.chance;
        next.push(w);
        continue;
      }
      const miss = cloneForMiss(w, split);
      w.weight *= split.chance;
      w.splits += 1;
      next.push(w, miss);
    }
    worlds = next;
  }
  return worlds;
}

function cloneForMiss(world: World, split: PendingSplit): World {
  const miss = cloneWorld(world);
  const target = splitTarget(miss, split);
  if (target) target.connects = false;
  miss.weight *= 1 - split.chance;
  miss.splits += 1;
  if (miss.settings.log) miss.log.push({ tick: miss.tick, side: 0, text: `(branch: skillshot misses, ${Math.round((1 - split.chance) * 100)}%)` });
  if (world.settings.log) world.log.push({ tick: world.tick, side: 0, text: `(branch: skillshot lands, ${Math.round(split.chance * 100)}%)` });
  return miss;
}


// ---------------------------------------------------------------------------------------
// Running a fight

export function fight(setup: FightSetup): FightOutcome {
  return runWorld(createWorld(setup), setup.behaviors);
}

/**
 * The fight played twice, each side deciding first on the opening tick once, as one outcome
 * (each half weighted equally): neither side gets the first word.
 */
export function fairFight(setup: FightSetup): FightOutcome {
  const leaves: World[] = [];
  for (const firstMover of [0, 1] as const) {
    for (const world of runLeaves(createWorld({ ...setup, settings: { ...setup.settings, firstMover } }), setup.behaviors)) {
      world.weight /= 2;
      leaves.push(world);
    }
  }
  return summarize(leaves);
}

/** Runs a prepared world (and every branch it splits into) to the end. */
export function runWorld(start: World, behaviorPair?: FightSetup["behaviors"]): FightOutcome {
  return summarize(runLeaves(start, behaviorPair));
}

/** Every branch of a fight, run to its end. */
function runLeaves(start: World, behaviorPair?: FightSetup["behaviors"]): World[] {
  const [a, b] = start.units;
  const behaviors: [Behavior, Behavior] = [behaviorPair?.[0] ?? a.spec.behavior ?? defaultBehavior, behaviorPair?.[1] ?? b.spec.behavior ?? defaultBehavior];
  const stack = [start];
  const leaves: World[] = [];
  while (stack.length > 0) {
    const world = stack.pop() as World;
    while (!world.result) {
      const splits = step(world, behaviors);
      if (splits.length > 0 && !world.result) stack.push(...fork(world, splits).slice(1));
    }
    leaves.push(world);
  }
  return leaves;
}

function hpShare(unit: Unit): number {
  return unit.alive && !unit.fallen ? Math.max(0, unit.hp) / derive(unit).maxHp : 0;
}

export function summarize(worlds: World[]): FightOutcome {
  const outcome: FightOutcome = {
    win: [0, 0],
    draw: 0,
    timeout: 0,
    escaped: 0,
    disengaged: 0,
    hp: [0, 0],
    damage: [0, 0],
    seconds: 0,
    branches: worlds.length,
    timeline: [],
    leaves: [],
  };
  let likeliest: World | undefined;
  for (const world of worlds) {
    const result = world.result ?? { winner: "none" as const, reason: "timeout" as const, tick: world.tick };
    const w = world.weight;
    if (result.winner === 0 || result.winner === 1) outcome.win[result.winner] += w;
    else if (result.winner === "draw") outcome.draw += w;
    else if (result.reason === "escaped") outcome.escaped += w;
    else if (result.reason === "disengaged") outcome.disengaged += w;
    else outcome.timeout += w;
    const [a, b] = world.units;
    const hp: [number, number] = [hpShare(a), hpShare(b)];
    const damage: [number, number] = [a.totals.damageDealt, b.totals.damageDealt];
    outcome.hp[0] += w * hp[0];
    outcome.hp[1] += w * hp[1];
    outcome.damage[0] += w * damage[0];
    outcome.damage[1] += w * damage[1];
    outcome.seconds += (w * result.tick) / 30;
    outcome.leaves.push({ weight: w, winner: result.winner, reason: result.reason, seconds: result.tick / 30, hp, damage });
    if (!likeliest || w > likeliest.weight) likeliest = world;
  }
  outcome.timeline = likeliest?.log ?? [];
  return outcome;
}
