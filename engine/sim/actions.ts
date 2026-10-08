/**
 * What units do: basic attacks (windup, launch, missile), casts (cast time, cooldown, cost,
 * delivery), channels, dashes and blinks; and the missiles and zones those create.
 */
import { toTicks } from "../rules/time";
import { cooldownAfterHaste } from "../rules/timing";
import { abilityHit, applyEffect, attackHit, contactGap, directionTo, edgeDistance, isUntargetable, log } from "./combat";
import { canAttack, canCastUnderCC, derive, evaluate } from "./derived";
import { hitChance } from "./hitModel";
import type { AbilitySpec, Effect } from "./spec";
import { type Missile, type Status, type Unit, type World, other } from "./state";

const EPSILON = 1e-6;

export function empowerStatus(unit: Unit): Status | undefined {
  return unit.statuses.find((s) => s.kind === "empower" && (s.empower?.attacks ?? 0) > 0);
}

export function attackRange(unit: Unit): number {
  return unit.spec.attack.range + (empowerStatus(unit)?.empower?.bonusRange ?? 0);
}

export function inAttackRange(unit: Unit, enemy: Unit): boolean {
  return edgeDistance(unit, enemy) <= attackRange(unit) + EPSILON;
}

/** Windup and total attack time in ticks at the unit's current attack speed (wiki: "Attack speed"). */
export function attackTiming(unit: Unit): { windup: number; total: number } {
  const d = derive(unit);
  const total = 1 / d.attackSpeed;
  const { percent, modifier } = unit.spec.base.windup;
  const baseWindup = percent / unit.spec.base.attackSpeed.base;
  const windup = baseWindup + modifier * (total * percent - baseWindup);
  return { windup: Math.max(1, toTicks(windup)), total: Math.max(1, toTicks(total)) };
}

/** Free to start something new: not winding up, casting, channeling or dashing. */
export function isBusy(unit: Unit): boolean {
  return unit.action !== undefined;
}

export function canStartAttack(world: World, unit: Unit): boolean {
  const enemy = world.units[other(unit.side)];
  return (
    unit.alive &&
    enemy.alive &&
    !isBusy(unit) &&
    unit.attackReadyTick <= world.tick &&
    canAttack(unit) &&
    !isUntargetable(enemy) &&
    inAttackRange(unit, enemy)
  );
}

export function startAttack(world: World, unit: Unit): void {
  const empower = empowerStatus(unit);
  const bonusOnHit: Effect[] = [];
  let uncancellable = false;
  let bonusRange = 0;
  if (empower?.empower) {
    bonusOnHit.push(...empower.empower.onHit);
    uncancellable = empower.empower.uncancellable;
    bonusRange = empower.empower.bonusRange;
    empower.empower.attacks -= 1;
    if (empower.empower.attacks <= 0) unit.statuses = unit.statuses.filter((s) => s !== empower);
  }
  const timing = attackTiming(unit);
  unit.action = {
    kind: "windup",
    startTick: world.tick,
    launchTick: world.tick + timing.windup,
    uncancellable,
    // A blind counts if it is on the attacker when the attack is declared (wiki: "Types of Crowd Control").
    blinded: unit.statuses.some((s) => s.kind === "cc" && s.key === "blind"),
    onHit: bonusOnHit,
    bonusRange,
  };
  unit.attackReadyTick = world.tick + timing.total;
  unit.move = 0;
}

/** The windup completes: melee attacks hit at once, ranged attacks fire a missile. */
export function launchAttack(world: World, unit: Unit, action = unit.action): void {
  if (action?.kind !== "windup") return;
  if (unit.action === action) unit.action = undefined;
  const enemy = world.units[other(unit.side)];
  if (!enemy.alive || isUntargetable(enemy)) return;
  const { attack } = unit.spec;
  if (!attack.missileSpeed) {
    attackHit(world, unit, enemy, action.blinded, action.onHit);
    return;
  }
  world.missiles.push({
    id: world.nextId++,
    owner: unit.side,
    source: "attack",
    seenTick: action.startTick,
    x: unit.x,
    perTick: attack.missileSpeed / 30,
    homing: true,
    direction: directionTo(unit, enemy),
    travelLeft: Number.POSITIVE_INFINITY,
    projectile: attack.projectile,
    connects: true,
    scale: 1,
    onHit: [],
    attack: { blinded: action.blinded, bonusOnHit: action.onHit },
  });
}

/**
 * A target that leaves attack range during the windup cancels the attack, which resets the
 * attack timer; uncancellable windups complete anyway (wiki: "Basic attack", uncancellable
 * windup). How far past its range the target must get is not documented; this takes the
 * attack range itself.
 */
export function cancelOutOfRange(world: World, unit: Unit): void {
  const action = unit.action;
  if (action?.kind !== "windup" || action.uncancellable) return;
  const enemy = world.units[other(unit.side)];
  if (edgeDistance(unit, enemy) <= unit.spec.attack.range + action.bonusRange + EPSILON) return;
  unit.action = undefined;
  unit.attackReadyTick = world.tick;
  log(world, unit.side, "attack cancelled: target out of range");
}

// ---------------------------------------------------------------------------------------
// Casting

function isMovement(ability: AbilitySpec): boolean {
  return ability.delivery.kind === "dash" || ability.delivery.kind === "blink";
}

export function abilityReady(world: World, unit: Unit, ability: AbilitySpec): boolean {
  return (unit.cooldownReady[ability.key] ?? 0) <= world.tick && unit.resource + EPSILON >= (ability.cost ?? 0);
}

/**
 * Center-to-center distance from which an ability reaches the enemy (wiki: "Range"): unit-
 * targeted spells and auras use centered range, skillshots reach the target's edge, ground
 * areas hit what their radius touches, and dashes and blinks hit on arrival. Undefined for
 * abilities that don't need the enemy in reach.
 */
export function abilityReach(ability: AbilitySpec, unit: Unit, enemy: Unit): number | undefined {
  const d = ability.delivery;
  const radii = unit.spec.base.radius + enemy.spec.base.radius;
  switch (d.kind) {
    case "target":
      return d.range;
    case "aura":
      return d.radius;
    case "line":
      return d.range + enemy.spec.base.radius;
    case "circle":
      return d.range + d.radius + enemy.spec.base.radius;
    case "dash":
    case "blink":
      if (d.direction === "away" || d.hitRadius === undefined) return undefined;
      return d.distance + d.hitRadius + radii;
    case "self":
      return ability.channel?.range !== undefined ? ability.channel.range + enemy.spec.base.radius : undefined;
  }
}

/** Whether the enemy is within an ability's reach (always true for abilities without one). */
export function inReach(ability: AbilitySpec, unit: Unit, enemy: Unit): boolean {
  const reach = abilityReach(ability, unit, enemy);
  return reach === undefined || Math.abs(unit.x - enemy.x) <= reach + EPSILON;
}

export function canCast(world: World, unit: Unit, ability: AbilitySpec): boolean {
  const enemy = world.units[other(unit.side)];
  if (!unit.alive || !abilityReady(world, unit, ability)) return false;
  // Casting cancels a windup, but nothing else can be interrupted.
  if (unit.action && unit.action.kind !== "windup") return false;
  if (!ability.flags?.usableWhileDisabled && !canCastUnderCC(unit, isMovement(ability) || ability.flags?.grounded === true)) return false;
  if (ability.delivery.kind === "target" && (isUntargetable(enemy) || !enemy.alive)) return false;
  if (ability.delivery.kind === "target" && Math.abs(unit.x - enemy.x) > ability.delivery.range + EPSILON) return false;
  if (ability.delivery.kind === "dash" && ability.delivery.direction === "target" && isUntargetable(enemy)) return false;
  return true;
}

/** Starts a cast; instant casts complete at once and may return a skillshot to split on. */
export function startCast(world: World, unit: Unit, ability: AbilitySpec): PendingSplit | undefined {
  if (unit.action?.kind === "windup") {
    // An interrupted windup resets the attack timer (wiki: "Attack speed", attack timer).
    unit.action = undefined;
    unit.attackReadyTick = world.tick;
  }
  if (ability.cooldownAtCastStart) startCooldown(world, unit, ability);
  log(world, unit.side, `casts ${ability.name}`);
  const castTicks = toTicks(ability.castTime);
  if (castTicks === 0) return completeCast(world, unit, ability, world.tick);
  unit.action = { kind: "cast", ability: ability.key, startTick: world.tick, endTick: world.tick + castTicks };
  if (!ability.moveWhileCasting) unit.move = 0;
  return undefined;
}

function startCooldown(world: World, unit: Unit, ability: AbilitySpec): void {
  const haste = derive(unit).abilityHaste;
  unit.cooldownReady[ability.key] = world.tick + toTicks(cooldownAfterHaste(ability.cooldown, haste));
}

/** Whether a skillshot is decisive: it disables, or deals a large share of the target's health. */
function decisive(world: World, caster: Unit, target: Unit, effects: Effect[]): boolean {
  if (effects.some((e) => e.type === "cc" || e.type === "displace" || e.type === "execute")) return true;
  const damage = effects
    .filter((e): e is Extract<Effect, { type: "damage" }> => e.type === "damage")
    .reduce((sum, e) => sum + evaluate(e.amount, caster, target), 0);
  return damage >= world.settings.decisiveDamage * derive(target).maxHp;
}

/** Whether something holds the target in place until `untilTick`. */
export function heldInPlace(target: Unit, untilTick: number): boolean {
  const action = target.action;
  if (action?.kind === "cast" || action?.kind === "channel" || action?.kind === "dash") {
    if (action.endTick >= untilTick) return true;
  }
  return target.statuses.some(
    (s) => s.kind === "cc" && ["stun", "root", "airborne", "suppression", "sleep", "stasis", "suspension", "charm", "taunt"].includes(s.key) && s.endTick >= untilTick,
  );
}

/**
 * Decides whether a skillshot connects. Certain outcomes are settled at once; uncertain
 * decisive ones are marked for the simulator to split the fight on (`split`); uncertain
 * minor ones count by their expected value.
 */
function resolveSkillshot(
  world: World,
  caster: Unit,
  target: Unit,
  ability: AbilitySpec,
  castStartTick: number,
  travelSeconds: number,
  reach: number,
): { connects: boolean; scale: number; split?: number } {
  const timeToLand = (world.tick - castStartTick) / 30 + travelSeconds;
  const landTick = world.tick + toTicks(travelSeconds);
  const chance = hitChance(
    { timeToLand, reach },
    { radius: target.spec.base.radius, moveSpeed: derive(target).moveSpeed, heldInPlace: heldInPlace(target, landTick), hasEscape: false },
    world.settings.reactionTime,
    world.settings.hitSpread,
  );
  if (chance >= 0.98) return { connects: true, scale: 1 };
  if (chance <= 0.02) return { connects: false, scale: 1 };
  if (decisive(world, caster, target, ability.onHit ?? []) && world.splits < Math.log2(world.settings.maxBranches)) {
    return { connects: true, scale: 1, split: chance };
  }
  return { connects: true, scale: chance };
}

export interface PendingSplit {
  /** The missile or zone (by id) whose landing the fight splits on. */
  missile?: number;
  zone?: number;
  chance: number;
}

/** The cast time ends: pay the cost, start the cooldown, and deliver the ability. */
export function completeCast(world: World, unit: Unit, ability: AbilitySpec, castStartTick: number): PendingSplit | undefined {
  const enemy = world.units[other(unit.side)];
  if (unit.action?.kind === "cast") unit.action = undefined;
  unit.resource -= ability.cost ?? 0;
  if (!ability.cooldownAtCastStart) startCooldown(world, unit, ability);
  for (const effect of ability.onSelf ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  const onHit = ability.onHit ?? [];
  const delivery = ability.delivery;
  const centerDistance = Math.abs(unit.x - enemy.x);
  let split: PendingSplit | undefined;
  switch (delivery.kind) {
    case "self":
      break;
    case "aura":
      if (centerDistance <= delivery.radius + EPSILON) abilityHit(world, unit, enemy, ability, onHit);
      break;
    case "target":
      if (!enemy.alive || isUntargetable(enemy)) break;
      if (delivery.missileSpeed) {
        world.missiles.push(missile(world, unit, enemy, ability, castStartTick, delivery.missileSpeed, true, Number.POSITIVE_INFINITY, true, 1));
      } else {
        abilityHit(world, unit, enemy, ability, onHit);
      }
      break;
    case "line": {
      const reachable = centerDistance - enemy.spec.base.radius <= delivery.range + EPSILON;
      const travel = delivery.speed ? Math.max(0, centerDistance - enemy.spec.base.radius) / delivery.speed : 0;
      const decision = reachable ? resolveSkillshot(world, unit, enemy, ability, castStartTick, travel, delivery.width / 2) : { connects: false, scale: 1 };
      if (delivery.speed) {
        const m = missile(world, unit, enemy, ability, castStartTick, delivery.speed, false, delivery.range, decision.connects, decision.scale);
        world.missiles.push(m);
        if (decision.split !== undefined) split = { missile: m.id, chance: decision.split };
      } else if (decision.split !== undefined) {
        // An instant line the fight splits on lands next tick, as an area on the target.
        const zone = instantArea(world, unit, enemy, ability, castStartTick, delivery.width / 2);
        split = { zone: zone.id, chance: decision.split };
      } else if (decision.connects) {
        abilityHit(world, unit, enemy, ability, onHit, decision.scale);
      }
      break;
    }
    case "circle": {
      // Aimed at the enemy, or as far toward it as the cast range allows.
      const offset = Math.max(0, centerDistance - delivery.range);
      const x = enemy.x - directionTo(unit, enemy) * offset;
      const reach = delivery.radius - offset;
      const decision =
        reach + enemy.spec.base.radius > EPSILON ? resolveSkillshot(world, unit, enemy, ability, castStartTick, delivery.delay, reach) : { connects: false, scale: 1 };
      const zone = {
        id: world.nextId++,
        owner: unit.side,
        kind: "delayedArea" as const,
        seenTick: castStartTick,
        x,
        radius: delivery.radius,
        startTick: world.tick,
        endTick: world.tick + toTicks(delivery.delay),
        ability: ability.key,
        onHit,
        connects: decision.connects,
        scale: decision.scale,
      };
      world.zones.push(zone);
      if (decision.split !== undefined) split = { zone: zone.id, chance: decision.split };
      break;
    }
    case "dash": {
      const dir = delivery.direction === "away" ? -directionTo(unit, enemy) : directionTo(unit, enemy);
      const ticks = Math.max(1, Math.ceil(delivery.distance / (delivery.speed / 30) - EPSILON));
      const perTick = (dir * delivery.distance) / ticks;
      unit.action = {
        kind: "dash",
        ability: ability.key,
        startTick: world.tick,
        endTick: world.tick + ticks,
        perTick,
        stopAtContact: delivery.direction !== "away",
        unstoppable: ability.flags?.knockdown === false,
      };
      break;
    }
    case "blink": {
      const dir = delivery.direction === "away" ? -directionTo(unit, enemy) : directionTo(unit, enemy);
      let x = unit.x + dir * delivery.distance;
      if (delivery.direction === "toward") {
        // Blinks land next to the enemy at most, not through them.
        const contact = enemy.x - dir * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
        if ((dir > 0 && x > contact) || (dir < 0 && x < contact)) x = contact;
      }
      unit.x = x;
      if (delivery.hitRadius !== undefined && edgeDistance(unit, enemy) <= delivery.hitRadius + EPSILON) abilityHit(world, unit, enemy, ability, onHit);
      break;
    }
  }
  if (ability.channel) {
    const intervalTicks = ability.channel.interval ? Math.max(1, toTicks(ability.channel.interval)) : Number.POSITIVE_INFINITY;
    unit.action = {
      kind: "channel",
      ability: ability.key,
      startTick: world.tick,
      endTick: world.tick + toTicks(ability.channel.duration),
      nextTick: world.tick + intervalTicks,
    };
  }
  return split;
}

function instantArea(world: World, unit: Unit, enemy: Unit, ability: AbilitySpec, seenTick: number, radius: number) {
  const zone = {
    id: world.nextId++,
    owner: unit.side,
    kind: "delayedArea" as const,
    seenTick,
    x: enemy.x,
    radius,
    startTick: world.tick,
    endTick: world.tick + 1,
    ability: ability.key,
    onHit: ability.onHit ?? [],
    connects: true,
    scale: 1,
  };
  world.zones.push(zone);
  return zone;
}

function missile(
  world: World,
  unit: Unit,
  enemy: Unit,
  ability: AbilitySpec,
  seenTick: number,
  speed: number,
  homing: boolean,
  range: number,
  connects: boolean,
  scale: number,
): Missile {
  return {
    id: world.nextId++,
    owner: unit.side,
    source: ability.key,
    seenTick,
    x: unit.x,
    perTick: speed / 30,
    homing,
    direction: directionTo(unit, enemy),
    travelLeft: range,
    projectile: ability.flags?.projectile ?? true,
    connects,
    scale,
    onHit: ability.onHit ?? [],
  };
}

/** Dashes move their unit each tick and end at their distance, or on reaching the enemy. */
export function progressDash(world: World, unit: Unit): void {
  const action = unit.action;
  // A dash moves from the tick after it starts until its end tick.
  if (action?.kind !== "dash" || world.tick <= action.startTick) return;
  const enemy = world.units[other(unit.side)];
  const ability = unit.spec.abilities.find((a) => a.key === action.ability);
  unit.x += action.perTick;
  const arrived = world.tick >= action.endTick || (action.stopAtContact && contactGap(unit, enemy) <= EPSILON);
  if (action.stopAtContact && contactGap(unit, enemy) < 0) {
    unit.x = enemy.x - directionTo(unit, enemy) * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
  }
  if (!arrived) return;
  unit.action = undefined;
  const delivery = ability?.delivery;
  if (ability && delivery?.kind === "dash" && delivery.hitRadius !== undefined && edgeDistance(unit, enemy) <= delivery.hitRadius + EPSILON) {
    abilityHit(world, unit, enemy, ability, ability.onHit ?? []);
  }
}

/** Channels hit on their interval and finish with their completion effects. */
export function progressChannel(world: World, unit: Unit): void {
  const action = unit.action;
  if (action?.kind !== "channel") return;
  const ability = unit.spec.abilities.find((a) => a.key === action.ability);
  const channel = ability?.channel;
  if (!ability || !channel) {
    unit.action = undefined;
    return;
  }
  const enemy = world.units[other(unit.side)];
  const inRange = channel.range === undefined || Math.abs(unit.x - enemy.x) - enemy.spec.base.radius <= channel.range + EPSILON;
  if (world.tick >= action.nextTick && world.tick < action.endTick) {
    if (inRange && channel.onTick) abilityHit(world, unit, enemy, ability, channel.onTick);
    action.nextTick += channel.interval ? Math.max(1, toTicks(channel.interval)) : Number.POSITIVE_INFINITY;
  }
  if (world.tick >= action.endTick) {
    unit.action = undefined;
    if (inRange && channel.onComplete) abilityHit(world, unit, enemy, ability, channel.onComplete);
  }
}

/** Projectiles die on an enemy projectile wall they cross or in a projectile-blocking aura. */
function blocked(world: World, m: Missile, from: number, to: number): boolean {
  if (!m.projectile) return false;
  const targetSide = other(m.owner);
  const target = world.units[targetSide];
  for (const zone of world.zones) {
    if (zone.kind !== "projectileWall" || zone.owner !== targetSide) continue;
    if ((from - zone.x) * (to - zone.x) <= 0) return true;
  }
  const aura = target.statuses.find((s) => s.kind === "state" && s.key === "projectileBlock");
  return aura !== undefined && Math.abs(target.x - to) <= target.spec.base.radius + aura.value;
}

/** Moves every missile one tick, then resolves hits, misses and blocks. */
export function advanceMissiles(world: World): void {
  const keep: Missile[] = [];
  for (const m of world.missiles) {
    const owner = world.units[m.owner];
    const target = world.units[other(m.owner)];
    const from = m.x;
    const step = m.homing ? Math.sign(target.x - m.x) * Math.min(m.perTick, Math.abs(target.x - m.x)) : m.direction * m.perTick;
    m.x += step;
    m.travelLeft -= Math.abs(step);
    if (blocked(world, m, from, m.x)) {
      log(world, target.side, `blocks a projectile (${m.source === "attack" ? "attack" : m.source})`);
      continue;
    }
    // Whether the target's hitbox touches the stretch the missile covered this tick.
    const reached = target.x >= Math.min(from, m.x) - target.spec.base.radius - EPSILON && target.x <= Math.max(from, m.x) + target.spec.base.radius + EPSILON;
    if (reached) {
      if (m.attack) attackHit(world, owner, target, m.attack.blinded, m.attack.bonusOnHit);
      else if (m.connects) {
        const ability = owner.spec.abilities.find((a) => a.key === m.source);
        if (ability) abilityHit(world, owner, target, ability, m.onHit, m.scale);
      }
      if (m.homing || m.connects) continue;
    }
    if (m.travelLeft > 0 && target.alive) keep.push(m);
  }
  world.missiles = keep;
}

/** Ground-targeted areas land; projectile walls expire. */
export function advanceZones(world: World): void {
  const keep = [];
  for (const zone of world.zones) {
    if (zone.kind === "delayedArea" && world.tick >= zone.endTick) {
      const owner = world.units[zone.owner];
      const target = world.units[other(zone.owner)];
      const ability = owner.spec.abilities.find((a) => a.key === zone.ability);
      const inside = Math.abs(target.x - zone.x) <= zone.radius + target.spec.base.radius + EPSILON;
      if (ability && zone.connects && inside) abilityHit(world, owner, target, ability, zone.onHit ?? [], zone.scale ?? 1);
      continue;
    }
    if (world.tick < zone.endTick) keep.push(zone);
  }
  world.zones = keep;
}

