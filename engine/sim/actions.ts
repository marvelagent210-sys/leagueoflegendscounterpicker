/**
 * What units do: basic attacks (windup, launch, missile), casts (cast time, cooldown, cost,
 * delivery), channels, dashes and blinks; and the missiles and zones those create.
 */
import { toTicks } from "../rules/time";
import { cooldownAfterHaste } from "../rules/timing";
import type { CCType } from "../rules/crowdControl";
import { abilityHit, applyEffect, attackHit, canSee, canTarget, contactGap, directionTo, edgeDistance, hookContext, isUntargetable, log } from "./combat";
import { canAttack, canCastUnderCC, derive, evaluate } from "./derived";
import { abilityOf, allAbilities } from "./forms";
import { terrainLimit } from "./terrain";
import { hitChance } from "./hitModel";
import { type AbilitySpec, type AttackSplit, type Effect, cooldownKeyOf } from "./spec";
import { type Action, type Aim, type Missile, type Pet, type Side, type Status, type Unit, type World, type Zone, other } from "./state";
import { canAttackPet, damagePet, petDistance } from "./pets";
import { averageCritFactor } from "../rules/defense";

export const EPSILON = 1e-6;

export function empowerStatus(unit: Unit): Status | undefined {
  return unit.statuses.find((s) => s.kind === "empower" && (s.empower?.attacks ?? 0) > 0);
}

export function attackRange(unit: Unit): number {
  let bonus = 0;
  for (const s of unit.statuses) if (s.kind === "empower" && (s.empower?.attacks ?? 0) > 0) bonus = Math.max(bonus, s.empower?.bonusRange ?? 0);
  return unit.spec.attack.range + bonus + rangeBuffs(unit);
}

/** Bonus attack range from stat buffs (Fury of the Sands). */
function rangeBuffs(unit: Unit): number {
  let total = 0;
  for (const s of unit.statuses) if (s.kind === "stat" && s.key === "attackRange") total += s.value;
  return total;
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
    canTarget(enemy, unit) &&
    inAttackRange(unit, enemy)
  );
}

/** Whether the unit can start a basic attack on one of the pets (an enemy's, or a keg of its own to set off). */
export function canStartAttackOnPet(world: World, unit: Unit, pet: Pet): boolean {
  return unit.alive && !isBusy(unit) && unit.attackReadyTick <= world.tick && canAttack(unit) && world.pets.includes(pet) && canAttackPet(unit, pet, attackRange(unit));
}

export function startAttack(world: World, unit: Unit, pet?: Pet): void {
  const bonusOnHit: Effect[] = [];
  let uncancellable = false;
  let bonusRange = 0;
  let split: AttackSplit | undefined;
  let windup: number | undefined;
  const empowered: string[] = [];
  // Every active empowerment applies to the attack and spends one of its charges.
  for (const empower of unit.statuses) {
    if (empower.kind !== "empower" || !empower.empower || empower.empower.attacks <= 0) continue;
    empowered.push(empower.key);
    bonusOnHit.push(...empower.empower.onHit);
    uncancellable ||= empower.empower.uncancellable;
    bonusRange = Math.max(bonusRange, empower.empower.bonusRange);
    split = empower.empower.split ?? split;
    if (empower.empower.windup !== undefined) windup = Math.min(windup ?? Number.POSITIVE_INFINITY, empower.empower.windup);
    empower.empower.attacks -= 1;
  }
  if (unit.statuses.some((s) => s.kind === "empower" && (s.empower?.attacks ?? 0) <= 0)) {
    unit.statuses = unit.statuses.filter((s) => s.kind !== "empower" || (s.empower?.attacks ?? 0) > 0);
  }
  const timing = attackTiming(unit);
  unit.action = {
    kind: "windup",
    startTick: world.tick,
    launchTick: world.tick + (windup !== undefined ? Math.max(1, toTicks(windup)) : timing.windup),
    uncancellable,
    // A blind counts if it is on the attacker when the attack is declared (wiki: "Types of Crowd Control").
    blinded: unit.statuses.some((s) => s.kind === "cc" && s.key === "blind"),
    onHit: bonusOnHit,
    bonusRange,
    ...(split ? { split } : {}),
    ...(pet ? { pet: pet.id } : {}),
    ...(empowered.length > 0 ? { empowered } : {}),
  };
  unit.attackReadyTick = world.tick + timing.total;
  unit.move = 0;
  const onAttack = unit.spec.hooks?.onAttack;
  if (onAttack) onAttack(hookContext(world, unit));
}

/** The windup completes: melee attacks hit at once, ranged attacks fire a missile. */
export function launchAttack(world: World, unit: Unit, action = unit.action): void {
  if (action?.kind !== "windup") return;
  if (unit.action === action) unit.action = undefined;
  // Post-effect cooldowns that waited for this empowered attack start as it lands.
  if (action.empowered) releaseCooldowns(world, unit);
  const onLaunch = unit.spec.hooks?.onAttackLaunch;
  if (onLaunch) onLaunch(hookContext(world, unit));
  if (action.pet !== undefined) {
    launchAttackOnPet(world, unit, action);
    return;
  }
  const enemy = world.units[other(unit.side)];
  if (!enemy.alive || isUntargetable(enemy, unit)) return;
  const { attack } = unit.spec;
  if (!attack.missileSpeed) {
    attackHit(world, unit, enemy, action.blinded, action.onHit, action.split);
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
    attack: { blinded: action.blinded, bonusOnHit: action.onHit, ...(action.split ? { split: action.split } : {}) },
  });
}

/** A basic attack on a pet: melee attacks hit at once, ranged attacks fire a missile at it. */
function launchAttackOnPet(world: World, unit: Unit, action: Extract<Action, { kind: "windup" }>): void {
  const pet = world.pets.find((p) => p.id === action.pet);
  if (!pet || action.blinded) return;
  const { attack } = unit.spec;
  if (!attack.missileSpeed) {
    damagePet(world, unit, pet, attackDamageOf(unit), "physical", true);
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
    direction: pet.x >= unit.x ? 1 : -1,
    travelLeft: Number.POSITIVE_INFINITY,
    projectile: attack.projectile,
    connects: true,
    scale: 1,
    onHit: [],
    pet: pet.id,
  });
}

/** A basic attack's damage before resistances, crits averaged. */
function attackDamageOf(unit: Unit): number {
  const d = derive(unit);
  return d.ad * averageCritFactor(d.critChance, d.critDamage);
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
  if (action.pet !== undefined) {
    const pet = world.pets.find((p) => p.id === action.pet);
    if (pet && petDistance(unit, pet) <= attackRange(unit) + EPSILON) return;
    unit.action = undefined;
    unit.attackReadyTick = world.tick;
    return;
  }
  const enemy = world.units[other(unit.side)];
  if (edgeDistance(unit, enemy) <= unit.spec.attack.range + action.bonusRange + rangeBuffs(unit) + EPSILON) return;
  unit.action = undefined;
  unit.attackReadyTick = world.tick;
  log(world, unit.side, "attack cancelled: target out of range");
}

// ---------------------------------------------------------------------------------------
// Casting

function isMovement(ability: AbilitySpec): boolean {
  return ability.delivery.kind === "dash" || ability.delivery.kind === "blink";
}

/** Whether a recast stage is open: the previous stage was cast long enough ago, and not too long. */
function chainOpen(world: World, unit: Unit, ability: AbilitySpec): boolean {
  const chain = ability.chain;
  if (!chain) return true;
  const state = unit.chains[chain.root];
  if (!state || state.stage !== chain.index - 1 || world.tick > state.until) return false;
  return world.tick >= state.castTick + toTicks(chain.delay ?? 0);
}

/** An ability's cost now (some scale with the caster's stats). */
export function costOf(unit: Unit, ability: AbilitySpec): number {
  const cost = ability.cost ?? 0;
  return typeof cost === "number" ? cost : evaluate(cost, unit);
}

function affordable(unit: Unit, ability: AbilitySpec): boolean {
  const cost = costOf(unit, ability);
  if (cost <= 0) return true;
  // A health cost can't be paid with the last of it.
  return ability.costType === "health" ? unit.hp > cost : unit.resource + EPSILON >= cost;
}

export function abilityReady(world: World, unit: Unit, ability: AbilitySpec): boolean {
  if ((unit.cooldownReady[cooldownKeyOf(ability)] ?? 0) > world.tick || !affordable(unit, ability) || !chainOpen(world, unit, ability)) return false;
  if (ability.charges && chargesLeft(world, unit, ability) < 1) return false;
  // A first stage can't start over while its recasts are open.
  const open = unit.chains[ability.key];
  if (!ability.chain && open && world.tick <= open.until) return false;
  if (ability.requires?.minResource !== undefined && unit.resource + EPSILON < ability.requires.minResource) return false;
  return true;
}

/** Center-to-center reach of a unit-targeted spell: its range, plus both radii for edge ranges. */
export function targetRange(d: Extract<AbilitySpec["delivery"], { kind: "target" }>, unit: Unit, enemy: Unit): number {
  return d.range + (d.edge ? unit.spec.base.radius + enemy.spec.base.radius : 0);
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
      return targetRange(d, unit, enemy);
    case "aura":
      return d.radius;
    case "line":
      return d.range + enemy.spec.base.radius;
    case "circle":
      return d.range + d.radius + (d.centered ? 0 : enemy.spec.base.radius);
    case "field":
      return (d.attached ? (d.offset ?? 0) : d.range) + d.radius + enemy.spec.base.radius;
    case "area":
      // Out to its far edge from the caster's center: the hitbox, or the center for centered areas.
      return d.far + (d.centered ? 0 : enemy.spec.base.radius);
    case "dash":
    case "blink":
      if (d.direction === "away" || d.hitRadius === undefined) return undefined;
      return d.distance + d.hitRadius + radii;
    case "self":
      return ability.channel?.range !== undefined ? ability.channel.range + enemy.spec.base.radius : undefined;
  }
}

/**
 * Whether the enemy is within an ability's reach (always true for abilities without one). An
 * invisible enemy is out of reach of everything that must be aimed at it; effects around the
 * caster still reach it.
 */
export function inReach(ability: AbilitySpec, unit: Unit, enemy: Unit): boolean {
  if (!canSee(enemy, unit) && aimed(ability)) return false;
  const reach = abilityReach(ability, unit, enemy);
  return reach === undefined || Math.abs(unit.x - enemy.x) <= reach + EPSILON;
}

/** Abilities aimed at the enemy or its location, which an invisible enemy escapes. */
function aimed(ability: AbilitySpec): boolean {
  const d = ability.delivery;
  switch (d.kind) {
    case "self":
    case "aura":
      return false;
    case "field":
      return !d.attached;
    case "area":
      // Areas around the caster (Decimate) hit whatever is there; areas thrown ahead are aimed.
      return !(d.anchor === "caster" && d.near < 0);
    case "dash":
    case "blink":
      return d.direction !== "away" && d.hitRadius !== undefined;
    default:
      return true;
  }
}

/** A recast that ends its own first stage's channel (Defiant Dance's release). */
function endsOwnChannel(unit: Unit, ability: AbilitySpec): boolean {
  return unit.action?.kind === "channel" && ability.chain !== undefined && unit.action.ability === ability.chain.root;
}

/** Whether the unit can cast the ability now; `anyRange` leaves out a unit-targeted spell's range. */
export function canCast(world: World, unit: Unit, ability: AbilitySpec, anyRange = false): boolean {
  const enemy = world.units[other(unit.side)];
  if (!unit.alive || !abilityReady(world, unit, ability)) return false;
  // Casting cancels a windup, but nothing else can be interrupted (except a channel by its own recast).
  if (unit.action && unit.action.kind !== "windup" && !endsOwnChannel(unit, ability) && !overlays(unit, ability)) return false;
  if (ability.usable && !ability.usable(unit, world)) return false;
  if (!ability.flags?.usableWhileDisabled && !canCastUnderCC(unit, isMovement(ability) || ability.flags?.grounded === true)) return false;
  if (ability.delivery.kind === "target" && (!canTarget(enemy, unit) || !enemy.alive)) return false;
  if (!anyRange && ability.delivery.kind === "target" && Math.abs(unit.x - enemy.x) > targetRange(ability.delivery, unit, enemy) + EPSILON) return false;
  if (ability.delivery.kind === "dash" && ability.delivery.direction === "target" && !canTarget(enemy, unit)) return false;
  const needs = ability.requires?.enemyCC;
  if (needs && !enemy.statuses.some((s) => s.kind === "cc" && needs.includes(s.key as CCType))) return false;
  return true;
}

/**
 * Whether an overlay ability can go on top of what the unit is doing: anything during a
 * cast; only abilities that aren't dashes during a dash.
 */
function overlays(unit: Unit, ability: AbilitySpec): boolean {
  if (!ability.overlay) return false;
  const action = unit.action;
  if (action?.kind === "cast") return action.ability !== ability.key;
  return action?.kind === "dash" && ability.delivery.kind !== "dash";
}

/** Starts a cast; instant casts complete at once and may return a skillshot to split on. */
export function startCast(world: World, unit: Unit, ability: AbilitySpec, aim?: Aim): PendingSplit | undefined {
  if (endsOwnChannel(unit, ability)) unit.action = undefined;
  if (unit.action?.kind === "windup") {
    // An interrupted windup resets the attack timer (wiki: "Attack speed", attack timer).
    unit.action = undefined;
    unit.attackReadyTick = world.tick;
  }
  if (ability.cooldownAtCastStart) startCooldown(world, unit, ability);
  log(world, unit.side, `casts ${ability.name}`);
  for (const effect of ability.onCastStart ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  const onCastStart = unit.spec.hooks?.onCastStart;
  if (onCastStart) onCastStart(hookContext(world, unit, ability));
  const castTicks = toTicks(ability.castTimeFor?.(unit) ?? ability.castTime);
  if (castTicks === 0) return completeCast(world, unit, ability, world.tick, aim);
  unit.action = { kind: "cast", ability: ability.key, startTick: world.tick, endTick: world.tick + castTicks, ...(aim ? { aim } : {}) };
  if (!ability.moveWhileCasting) unit.move = 0;
  return undefined;
}

/** Charges an ability has stocked (all of them until the first is spent), counting one due this tick. */
export function chargesLeft(world: World, unit: Unit, ability: AbilitySpec): number {
  const stock = unit.charges[cooldownKeyOf(ability)];
  if (!stock) return ability.charges?.max ?? 0;
  return stock.count + (world.tick >= stock.nextTick ? 1 : 0);
}

function spendCharge(world: World, unit: Unit, ability: AbilitySpec): void {
  const charges = ability.charges;
  if (!charges) return;
  const key = cooldownKeyOf(ability);
  const stock = unit.charges[key] ?? { count: charges.max, nextTick: Number.POSITIVE_INFINITY };
  // The recharge starts when the first charge of a full stock is spent.
  if (stock.count >= charges.max) stock.nextTick = world.tick + toTicks(cooldownAfterHaste(charges.recharge, derive(unit).abilityHaste));
  stock.count = Math.max(0, stock.count - 1);
  unit.charges[key] = stock;
}

/** Charges restock one at a time, each after the recharge time. */
export function restockCharges(world: World, unit: Unit): void {
  for (const [key, stock] of Object.entries(unit.charges)) {
    if (world.tick < stock.nextTick) continue;
    const ability = allAbilities(unit.spec).find((a) => a.charges && cooldownKeyOf(a) === key);
    if (!ability?.charges) continue;
    stock.count += 1;
    stock.nextTick = stock.count >= ability.charges.max ? Number.POSITIVE_INFINITY : world.tick + toTicks(cooldownAfterHaste(ability.charges.recharge, derive(unit).abilityHaste));
  }
}

function startCooldown(world: World, unit: Unit, ability: AbilitySpec): void {
  spendCharge(world, unit, ability);
  const key = cooldownKeyOf(ability);
  if (ability.cooldownAfter) {
    // Held until the cast's effect is over (releaseCooldowns).
    unit.cooldownReady[key] = Number.POSITIVE_INFINITY;
    unit.cooldownHeld[key] = ability.key;
    return;
  }
  const haste = derive(unit).abilityHaste;
  unit.cooldownReady[key] = world.tick + toTicks(cooldownAfterHaste(ability.cooldownFor?.(unit) ?? ability.cooldown, haste));
}

/** Post-effect cooldowns start once their cast's effect is over (wiki: "Cooldown starts"). */
export function releaseCooldowns(world: World, unit: Unit): void {
  for (const [key, abilityKey] of Object.entries(unit.cooldownHeld)) {
    const ability = abilityOf(unit, abilityKey);
    if (ability && effectLasts(world, unit, ability)) continue;
    delete unit.cooldownHeld[key];
    const haste = derive(unit).abilityHaste;
    const full = ability ? toTicks(cooldownAfterHaste(ability.cooldownFor?.(unit) ?? ability.cooldown, haste)) : 0;
    // Refunds that came while it was held.
    const pending = unit.pendingRefunds[key];
    delete unit.pendingRefunds[key];
    const cut = pending ? toTicks(pending.seconds) + Math.round(full * pending.fraction) : 0;
    unit.cooldownReady[key] = world.tick + Math.max(0, full - cut);
  }
}

function effectLasts(world: World, unit: Unit, ability: AbilitySpec): boolean {
  switch (ability.cooldownAfter) {
    case "empower": {
      // Until the empowered attack lands, a recast's included (The Darkin Glaive's recast).
      const mine = (key: string) => key === ability.key || abilityOf(unit, key)?.chain?.root === ability.key;
      if (unit.action?.kind === "windup" && unit.action.empowered?.some(mine)) return true;
      return unit.statuses.some((s) => s.kind === "empower" && mine(s.key) && (s.empower?.attacks ?? 0) > 0);
    }
    case "channel":
      return unit.action?.kind === "channel" && unit.action.ability === ability.key && unit.action.endTick > world.tick;
    case "dash":
      return unit.action?.kind === "dash" && unit.action.ability === ability.key && unit.action.endTick > world.tick;
    case "field":
      return world.zones.some((z) => z.owner === unit.side && z.kind === "field" && z.ability === ability.key && z.endTick > world.tick);
    case "state":
      return unit.statuses.some((s) => s.kind === "state" && s.ability === ability.key);
    default:
      return false;
  }
}

/** Whether a skillshot is decisive: it disables, or deals a large share of the target's health. */
function decisive(world: World, caster: Unit, target: Unit, effects: Effect[]): boolean {
  if (effects.some((e) => e.type === "cc" || e.type === "displace" || e.type === "execute")) return true;
  const damage = effects
    .filter((e): e is Extract<Effect, { type: "damage" }> => e.type === "damage")
    .reduce((sum, e) => sum + evaluate(e.amount, caster, target), 0);
  return damage >= world.settings.decisiveDamage * derive(target).maxHp;
}

const HOLDING_CC = new Set(["stun", "root", "airborne", "suppression", "sleep", "stasis", "suspension", "charm", "taunt"]);

/**
 * The last tick at which crowd control or the target's own cast, channel or dash holds it in
 * place. Casts and channels it can walk through (Decimate's windup, Judgment) don't.
 */
export function heldUntil(target: Unit): number {
  let until = -1;
  const action = target.action;
  if (action?.kind === "dash") until = action.endTick;
  else if (action?.kind === "cast" || action?.kind === "channel") {
    const ability = abilityOf(target, action.ability);
    const walks = action.kind === "cast" ? ability?.moveWhileCasting === true : ability?.channel?.mobile === true;
    if (!walks) until = action.endTick;
  }
  for (const s of target.statuses) if (s.kind === "cc" && HOLDING_CC.has(s.key)) until = Math.max(until, s.endTick);
  return until;
}

/** Whether something holds the target in place until `untilTick`. */
export function heldInPlace(target: Unit, untilTick: number): boolean {
  return heldUntil(target) >= untilTick;
}

/**
 * The chance a skillshot catches the target (engine/sim/hitModel.ts): the target has seen it
 * coming since `seenTick`, it lands `seconds` from now, and the target must move `reach` plus
 * its radius sideways to get out of it.
 */
export function skillshotChance(world: World, target: Unit, seenTick: number, seconds: number, reach: number): number {
  const timeToLand = (world.tick - seenTick) / 30 + seconds;
  const landTick = world.tick + toTicks(seconds);
  const held = heldUntil(target);
  return hitChance(
    { timeToLand, reach },
    { radius: target.spec.base.radius, moveSpeed: derive(target).moveSpeed, heldInPlace: held >= landTick, heldFor: Math.max(0, held - seenTick) / 30, hasEscape: false },
    world.settings.reactionTime,
    world.settings.hitSpread,
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
  const chance = skillshotChance(world, target, castStartTick, travelSeconds, reach);
  if (chance >= 0.98) return { connects: true, scale: 1 };
  if (chance <= 0.02) return { connects: false, scale: 1 };
  if ((ability.decisive || decisive(world, caster, target, ability.onHit ?? [])) && world.splits < Math.log2(world.settings.maxBranches)) {
    return { connects: true, scale: 1, split: chance };
  }
  return { connects: true, scale: chance };
}

export interface PendingSplit {
  /** The missile or zone (by id), or the side whose charge (`dash`), that the fight splits on. */
  missile?: number;
  zone?: number;
  dash?: Side;
  chance: number;
}

/** Ticks a charge takes to cover a distance: it moves from the tick after it starts, a step faster every `everyTicks`. */
export function rampTicks(distance: number, ramp: { from: number; amount: number; everyTicks: number; max: number }): number {
  let covered = 0;
  let ticks = 0;
  while (covered < distance - EPSILON && ticks < 30 * 60) {
    ticks += 1;
    covered += Math.min(ramp.max, ramp.from + ramp.amount * Math.floor(ticks / ramp.everyTicks)) / 30;
  }
  return Math.max(1, ticks);
}

/** The cast time ends: pay the cost, start the cooldown, and deliver the ability. */
/** Keeps track of recastable abilities: opens the next stage, and starts the cooldown when they end. */
function advanceChain(world: World, unit: Unit, ability: AbilitySpec): void {
  const root = ability.chain?.root ?? ability.key;
  const stages = allAbilities(unit.spec).filter((a) => a.chain?.root === root);
  if (stages.length === 0) return;
  const index = ability.chain?.index ?? 1;
  const next = stages.find((a) => a.chain?.index === index + 1);
  if (next?.chain) {
    unit.chains[root] = { stage: index, castTick: world.tick, until: world.tick + toTicks(next.chain.window) };
    // An automatic follow-up with no window is part of the same cast (The Weirding's recoil).
    if (next.chain.auto && toTicks(next.chain.window) === 0 && toTicks(next.chain.delay ?? 0) === 0) pendingFollowUps.push([unit, next]);
  } else {
    delete unit.chains[root];
    const first = abilityOf(unit, root);
    if (first?.chainCooldown === "last") startCooldown(world, unit, first);
  }
}

/** Recast windows that ran out: the cooldown starts then, or an automatic recast fires. */
export function expireChains(world: World, unit: Unit): void {
  for (const [root, state] of Object.entries(unit.chains)) {
    if (world.tick <= state.until) continue;
    const next = allAbilities(unit.spec).find((a) => a.chain?.root === root && a.chain.index === state.stage + 1);
    if (next?.chain?.auto && unit.alive) {
      log(world, unit.side, `${next.name} fires`);
      completeCast(world, unit, next, world.tick);
      continue;
    }
    delete unit.chains[root];
    const first = abilityOf(unit, root);
    if (first?.chainCooldown === "last") startCooldown(world, unit, first);
  }
}

/** Follow-ups to complete right after the cast that opened them (see advanceChain). */
const pendingFollowUps: Array<[Unit, AbilitySpec]> = [];

export function completeCast(world: World, unit: Unit, ability: AbilitySpec, castStartTick: number, aim?: Aim): PendingSplit | undefined {
  let split = completeOneCast(world, unit, ability, castStartTick, aim);
  for (let follow = pendingFollowUps.shift(); follow; follow = pendingFollowUps.shift()) {
    const [owner, next] = follow;
    if (!owner.alive) continue;
    log(world, owner.side, `${next.name} fires`);
    split ??= completeOneCast(world, owner, next, world.tick);
  }
  return split;
}

function completeOneCast(world: World, unit: Unit, ability: AbilitySpec, castStartTick: number, aim?: Aim): PendingSplit | undefined {
  const enemy = world.units[other(unit.side)];
  // An overlay cast leaves what the unit was doing running; its dash holds it until it ends.
  const held = ability.overlay && unit.action && unit.action.kind !== "windup" && !(unit.action.kind === "cast" && unit.action.ability === ability.key) ? unit.action : undefined;
  if (unit.action?.kind === "cast" && unit.action.ability === ability.key) unit.action = undefined;
  const cost = costOf(unit, ability);
  if (ability.costType === "health") unit.hp -= cost;
  else unit.resource -= cost;
  if (!ability.cooldownAtCastStart && !(ability.chainCooldown === "last") && !ability.chain) startCooldown(world, unit, ability);
  advanceChain(world, unit, ability);
  for (const effect of ability.onSelf ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  const onCast = unit.spec.hooks?.onCast;
  if (onCast) onCast(hookContext(world, unit, ability));
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
      if (!enemy.alive || isUntargetable(enemy, unit)) break;
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
      // A centered circle must cover the target's center: the target needs to move only its center out.
      const edge = delivery.centered ? 0 : enemy.spec.base.radius;
      // The enemy can react only once it can see where it lands.
      const seen = castStartTick + toTicks(delivery.hidden ?? 0);
      const decision =
        reach + edge > EPSILON ? resolveSkillshot(world, unit, enemy, ability, seen, delivery.delay, reach - enemy.spec.base.radius + edge) : { connects: false, scale: 1 };
      const zone = {
        id: world.nextId++,
        owner: unit.side,
        kind: "delayedArea" as const,
        seenTick: seen,
        x,
        radius: delivery.radius,
        startTick: world.tick,
        endTick: world.tick + toTicks(delivery.delay),
        ability: ability.key,
        onHit,
        connects: decision.connects,
        scale: decision.scale,
        ...(delivery.centered ? { centered: true } : {}),
      };
      world.zones.push(zone);
      if (decision.split !== undefined) split = { zone: zone.id, chance: decision.split };
      break;
    }
    case "dash": {
      // Aimed dashes go either way, as far as asked within their range.
      const aimed = aim !== undefined && delivery.minDistance !== undefined;
      const away = aimed ? aim.direction < 0 : delivery.direction === "away";
      const dir = away ? -directionTo(unit, enemy) : directionTo(unit, enemy);
      const distance = aimed ? Math.min(delivery.distance, Math.max(delivery.minDistance ?? 0, aim.distance ?? delivery.distance)) : delivery.distance;
      // A charge starts at the caster's movement speed and speeds up (Unstoppable Onslaught).
      const ramp = delivery.ramp
        ? { from: Math.min(delivery.speed, delivery.ramp.from ?? derive(unit).moveSpeed), amount: delivery.ramp.amount, everyTicks: Math.max(1, toTicks(delivery.ramp.every)), max: delivery.speed }
        : undefined;
      // A leap lands after its time however far it goes: at the enemy's side, or its full distance away.
      const leap = delivery.time !== undefined && !ramp;
      const span = leap && !away && !delivery.through ? Math.min(distance, Math.max(0, contactGap(unit, enemy))) : distance;
      const ticks = ramp ? rampTicks(distance, ramp) : leap ? Math.max(1, toTicks(delivery.time ?? 0)) : Math.max(1, Math.ceil(distance / (delivery.speed / 30) - EPSILON));
      const perTick = ramp ? (dir * ramp.from) / 30 : (dir * span) / ticks;
      const dash: Extract<Action, { kind: "dash" }> = {
        kind: "dash",
        ability: ability.key,
        startTick: world.tick,
        endTick: world.tick + ticks,
        perTick,
        stopAtContact: !away && !delivery.through,
        unstoppable: ability.flags?.knockdown === false,
        ...(held ? { resume: held } : {}),
        ...(delivery.through ? { through: true } : {}),
        ...(ramp ? { ramp } : {}),
        ...(delivery.lockOn && !away ? { lockOn: delivery.lockOn } : {}),
      };
      if (delivery.sidestep !== undefined && !away) {
        // The enemy sees it coming and can step aside until it arrives.
        const gap = Math.max(0, contactGap(unit, enemy));
        const travel = (ramp ? rampTicks(gap, ramp) : leap ? ticks : Math.ceil(gap / (delivery.speed / 30) - EPSILON)) / 30;
        const decision = resolveSkillshot(world, unit, enemy, ability, castStartTick, travel + (delivery.sidestep.later ?? 0), delivery.sidestep.reach);
        dash.connects = decision.connects;
        dash.scale = decision.scale;
        if (decision.split !== undefined) split = { dash: unit.side, chance: decision.split };
      }
      unit.action = dash;
      break;
    }
    case "area": {
      const dir = directionTo(unit, enemy);
      const ticks = toTicks(delivery.delay);
      const zone = {
        id: world.nextId++,
        owner: unit.side,
        kind: "delayedArea" as const,
        seenTick: castStartTick,
        x: unit.x + (dir * (delivery.near + delivery.far)) / 2,
        radius: (delivery.far - delivery.near) / 2,
        startTick: world.tick,
        endTick: world.tick + ticks,
        ability: ability.key,
        onHit,
        connects: true,
        scale: 1,
        ...(delivery.bands ? { bands: delivery.bands.map((b) => ({ from: unit.x + dir * b.from, to: unit.x + dir * b.to, onHit: b.onHit })) } : {}),
        ...(delivery.anchor === "caster" ? { follow: { near: delivery.near, far: delivery.far, ...(delivery.bands ? { bands: delivery.bands } : {}) } } : {}),
        ...(delivery.centered ? { centered: true } : {}),
      };
      world.zones.push(zone);
      // An area that lands at once resolves with the zones this tick.
      if (ticks === 0) advanceZones(world);
      break;
    }
    case "field": {
      const dir = directionTo(unit, enemy);
      // On the enemy as far as the range allows, or aimed along the line (`aim`: Mega Adhesive behind the caster).
      const x = delivery.attached
        ? unit.x + dir * (delivery.offset ?? 0)
        : aim?.distance !== undefined
          ? unit.x + aim.direction * dir * Math.min(delivery.range, aim.distance)
          : enemy.x - dir * Math.max(0, centerDistance - delivery.range);
      const start = world.tick + toTicks(delivery.delay ?? 0);
      world.zones.push({
        id: world.nextId++,
        owner: unit.side,
        kind: "field",
        seenTick: castStartTick,
        x,
        radius: delivery.radius,
        startTick: start,
        endTick: start + toTicks(delivery.duration),
        ability: ability.key,
        onHit,
        interval: Math.max(1, toTicks(delivery.interval)),
        nextTick: start,
        ...(delivery.attached ? { attached: { offset: delivery.offset ?? 0 } } : {}),
        ...(delivery.chase ? { chase: delivery.chase / 30 } : {}),
        ...(delivery.onOwner ? { onOwner: delivery.onOwner } : {}),
      });
      // A field that lands at once pulses with the zones this tick.
      if (start === world.tick) advanceZones(world);
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
    const intervalTicks = channelInterval(ability, unit);
    unit.action = {
      kind: "channel",
      ability: ability.key,
      startTick: world.tick,
      endTick: world.tick + toTicks(ability.channel.duration),
      nextTick: world.tick + intervalTicks,
      intervalTicks,
    };
  }
  return split;
}

/** Ticks between a channel's pulses: from its pulse count when it has one, else its interval. */
function channelInterval(ability: AbilitySpec, unit: Unit): number {
  const channel = ability.channel;
  if (!channel) return Number.POSITIVE_INFINITY;
  if (channel.pulses) {
    const pulses = Math.max(1, Math.floor(evaluate(channel.pulses, unit) + EPSILON));
    return Math.max(1, Math.floor(toTicks(channel.duration) / pulses));
  }
  return channel.interval ? Math.max(1, toTicks(channel.interval)) : Number.POSITIVE_INFINITY;
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
  const ability = abilityOf(unit, action.ability);
  const from = unit.x;
  // Dashes to a location stop at terrain; dashes to a unit go over it.
  const toUnit = ability?.delivery.kind === "dash" && ability.delivery.direction === "target";
  if (action.lockOn && action.lockedTick === undefined && Math.abs(unit.x - enemy.x) - enemy.spec.base.radius <= action.lockOn.within + EPSILON) {
    // In sight of the enemy: the charge becomes a dash at its own speed.
    action.lockedTick = world.tick;
    delete action.ramp;
    action.perTick = (Math.sign(action.perTick) * action.lockOn.speed) / 30;
  }
  if (action.ramp) {
    const ramp = action.ramp;
    action.perTick = (Math.sign(action.perTick) * Math.min(ramp.max, ramp.from + ramp.amount * Math.floor((world.tick - action.startTick) / ramp.everyTicks))) / 30;
  }
  const step = toUnit ? action.perTick : terrainLimit(world, unit, action.perTick);
  unit.x += step;
  if (stoppedByAntiDash(world, unit, enemy, action.unstoppable)) return;
  if (ability && action.through && !action.hit && ability.delivery.kind === "dash" && ability.delivery.hitRadius !== undefined) {
    // Passing the enemy: hit once its hitbox comes within reach (edge to edge) of the dash's path.
    const reach = ability.delivery.hitRadius + unit.spec.base.radius + enemy.spec.base.radius;
    const crossed = (from - enemy.x) * (unit.x - enemy.x) <= 0;
    const nearest = crossed ? 0 : Math.min(Math.abs(from - enemy.x), Math.abs(unit.x - enemy.x));
    if (nearest <= reach + EPSILON) {
      action.hit = true;
      if (action.connects === false) log(world, unit.side, `${ability.name} misses`);
      else abilityHit(world, unit, enemy, ability, ability.onHit ?? [], action.scale ?? 1);
    }
  }
  const arrived = world.tick >= action.endTick || (action.stopAtContact && contactGap(unit, enemy) <= EPSILON) || step !== action.perTick;
  if (action.stopAtContact && contactGap(unit, enemy) < 0) {
    unit.x = enemy.x - directionTo(unit, enemy) * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
  }
  if (!arrived) return;
  unit.action = action.resume;
  const delivery = ability?.delivery;
  if (ability && delivery?.kind === "dash" && !delivery.through && delivery.hitRadius !== undefined && edgeDistance(unit, enemy) <= delivery.hitRadius + EPSILON) {
    // A charge the enemy stepped aside from ends beside it without hitting.
    if (action.connects === false) log(world, unit.side, `${ability.name} misses`);
    else abilityHit(world, unit, enemy, ability, ability.onHit ?? [], action.scale ?? 1);
  }
}

/**
 * Steadfast Presence: a dash that comes within the aura's radius is stopped, and the aura's
 * effects hit the dasher, once per cast. Dashes with displacement or crowd control immunity
 * (or untargetability) go through.
 */
function stoppedByAntiDash(world: World, unit: Unit, enemy: Unit, unstoppable: boolean): boolean {
  const aura = enemy.statuses.find((s) => s.kind === "state" && s.key === "antiDash");
  if (!aura || unstoppable || Math.abs(unit.x - enemy.x) - unit.spec.base.radius > aura.value + EPSILON) return false;
  if (unit.statuses.some((s) => s.kind === "state" && ["ccImmune", "displacementImmune", "untargetable", "stasis"].includes(s.key))) return false;
  unit.action = unit.action?.kind === "dash" ? unit.action.resume : undefined;
  enemy.statuses = enemy.statuses.filter((s) => s !== aura);
  log(world, enemy.side, "stops the dash");
  const ability = abilityOf(enemy, aura.ability);
  for (const effect of aura.effects ?? []) applyEffect(world, enemy, unit, effect, { scale: 1, ...(ability ? { ability } : {}) });
  return true;
}

/** Channels hit on their interval and finish with their completion effects. */
export function progressChannel(world: World, unit: Unit): void {
  const action = unit.action;
  if (action?.kind !== "channel") return;
  const ability = abilityOf(unit, action.ability);
  const channel = ability?.channel;
  if (!ability || !channel) {
    unit.action = undefined;
    return;
  }
  const enemy = world.units[other(unit.side)];
  const inRange = channel.range === undefined || Math.abs(unit.x - enemy.x) - enemy.spec.base.radius <= channel.range + EPSILON;
  if (world.tick >= action.nextTick && world.tick <= action.endTick) {
    if (inRange && channel.onTick) abilityHit(world, unit, enemy, ability, channel.onTick);
    action.nextTick += action.intervalTicks;
  }
  if (world.tick >= action.endTick) {
    unit.action = undefined;
    if (inRange && channel.onComplete) abilityHit(world, unit, enemy, ability, channel.onComplete);
    for (const effect of channel.onCompleteSelf ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
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

/** A field's pulse: its effects on the enemy inside, and on its owner inside. */
function pulseField(world: World, zone: Zone, owner: Unit, target: Unit): void {
  if (zone.attached) zone.x = owner.x + directionTo(owner, target) * zone.attached.offset;
  if (zone.chase && target.alive && world.tick > zone.startTick) {
    const gap = target.x - zone.x;
    zone.x += Math.sign(gap) * Math.min(Math.abs(gap), zone.chase);
  }
  if (zone.nextTick === undefined || world.tick < zone.nextTick) return;
  zone.nextTick += zone.interval ?? 1;
  const ability = abilityOf(owner, zone.ability);
  if (ability && zone.onHit?.length && target.alive && Math.abs(target.x - zone.x) <= zone.radius + target.spec.base.radius + EPSILON) {
    abilityHit(world, owner, target, ability, zone.onHit, zone.scale ?? 1);
  }
  if (zone.onOwner?.length && Math.abs(owner.x - zone.x) <= zone.radius + EPSILON) {
    for (const effect of zone.onOwner) applyEffect(world, owner, owner, effect, { scale: 1, ...(ability ? { ability } : {}) });
  }
}

/** Moves every missile one tick, then resolves hits, misses and blocks. */
export function advanceMissiles(world: World): void {
  const keep: Missile[] = [];
  for (const m of world.missiles) {
    const owner = world.units[m.owner];
    const target = world.units[other(m.owner)];
    const from = m.x;
    if (m.pet !== undefined) {
      // A basic attack flying at a pet: it lands when it reaches it, or fizzles if it is gone.
      const pet = world.pets.find((p) => p.id === m.pet);
      if (!pet) continue;
      m.x += Math.sign(pet.x - m.x) * Math.min(m.perTick, Math.abs(pet.x - m.x));
      if (Math.abs(pet.x - m.x) <= pet.spec.radius + EPSILON) damagePet(world, owner, pet, attackDamageOf(owner), "physical", true);
      else keep.push(m);
      continue;
    }
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
      if (m.attack) attackHit(world, owner, target, m.attack.blinded, m.attack.bonusOnHit, m.attack.split);
      else if (m.connects) {
        const ability = abilityOf(owner, m.source);
        if (ability) abilityHit(world, owner, target, ability, m.onHit, m.scale);
      }
      if (m.homing || m.connects) continue;
    }
    if (m.travelLeft > 0 && target.alive) keep.push(m);
  }
  world.missiles = keep;
}

/** Ground areas land, traps go off on contact, fields pulse, and projectile walls expire. */
export function advanceZones(world: World): void {
  const keep = [];
  for (const zone of world.zones) {
    const owner = world.units[zone.owner];
    const target = world.units[other(zone.owner)];
    if (zone.kind === "field") {
      if (world.tick >= zone.endTick || !owner.alive) continue;
      pulseField(world, zone, owner, target);
      keep.push(zone);
      continue;
    }
    if (zone.kind === "trap") {
      if (world.tick >= zone.startTick && Math.abs(target.x - zone.x) <= zone.radius + target.spec.base.radius + EPSILON && target.alive) {
        log(world, target.side, "steps on a trap");
        for (const effect of zone.onHit ?? []) applyEffect(world, owner, target, effect, { scale: 1 });
        continue;
      }
    } else if (zone.kind === "delayedArea" && world.tick >= zone.endTick) {
      const ability = abilityOf(owner, zone.ability);
      let x = zone.x;
      let radius = zone.radius;
      let bands = zone.bands;
      if (zone.follow) {
        // Areas that move with the caster land where it is now.
        const dir = directionTo(owner, target);
        x = owner.x + (dir * (zone.follow.near + zone.follow.far)) / 2;
        radius = (zone.follow.far - zone.follow.near) / 2;
        bands = zone.follow.bands?.map((b) => ({ from: owner.x + dir * b.from, to: owner.x + dir * b.to, onHit: b.onHit }));
      }
      const inside = Math.abs(target.x - x) <= radius + (zone.centered ? 0 : target.spec.base.radius) + EPSILON;
      const band = bands?.find((b) => target.x >= Math.min(b.from, b.to) - EPSILON && target.x <= Math.max(b.from, b.to) + EPSILON);
      if (ability && zone.connects && inside) abilityHit(world, owner, target, ability, band?.onHit ?? zone.onHit ?? [], zone.scale ?? 1);
      continue;
    }
    if (world.tick < zone.endTick) keep.push(zone);
  }
  world.zones = keep;
}

