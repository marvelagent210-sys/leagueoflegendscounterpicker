/**
 * What units do: basic attacks (windup, launch, missile), casts (cast time, cooldown, cost,
 * delivery), channels, dashes and blinks; and the missiles and zones those create.
 */
import { toTicks } from "../rules/time";
import { cooldownAfterHaste } from "../rules/timing";
import type { CCType } from "../rules/crowdControl";
import { abilityHit, applyEffect, attackHit, canSee, canTarget, contactGap, directionTo, edgeDistance, hookContext, isUntargetable, log, notifyDashEnd } from "./combat";
import { canAttack, canCastUnderCC, derive, evaluate, hasState } from "./derived";
import { abilityOf, allAbilities } from "./forms";
import { terrainLimit } from "./terrain";
import { hitChance } from "./hitModel";
import { type AbilitySpec, type AttackSplit, type Effect, cooldownKeyOf } from "./spec";
import { type Action, type Aim, type Missile, type Pet, type Side, type Status, type Unit, type World, type Zone, other } from "./state";
import { areaOnPets, canAttackPet, canTargetPet, damagePet, petDistance } from "./pets";
import { averageCritFactor } from "../rules/defense";
import { advanceSpecialMissile } from "./projectiles";
import { petFormulaTarget } from "./petTarget";

export const EPSILON = 1e-6;

/** Future discrete movement of a projectile, including its acceleration and speed cap. */
export function missileArrivalTicks(missile: Pick<Missile, "perTick" | "acceleration">, distance: number): number {
  distance = Math.max(0, distance);
  const acceleration = missile.acceleration;
  if (!acceleration || acceleration.perTick <= 0) return Math.max(0, Math.ceil(distance / missile.perTick - EPSILON));
  const speed = missile.perTick;
  const rampTicks = Math.max(0, Math.ceil((acceleration.maxPerTick - speed) / acceleration.perTick - EPSILON));
  const rampDistance = rampTicks * speed + acceleration.perTick * rampTicks * (rampTicks - 1) / 2;
  if (distance > rampDistance + EPSILON) return rampTicks + Math.ceil((distance - rampDistance) / acceleration.maxPerTick - EPSILON);
  const linear = speed - acceleration.perTick / 2;
  const ticks = (Math.sqrt(linear * linear + 2 * acceleration.perTick * distance) - linear) / acceleration.perTick;
  return Math.max(0, Math.ceil(ticks - EPSILON));
}

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
    !unit.resurrection && !unit.deathDefied &&
    enemy.alive &&
    !isBusy(unit) &&
    unit.attackReadyTick <= world.tick &&
    !unit.pendingAttack && canAttack(unit) &&
    canTarget(enemy, unit) &&
    inAttackRange(unit, enemy)
  );
}

/** Whether the unit can start a basic attack on one of the pets (an enemy's, or a keg of its own to set off). */
export function canStartAttackOnPet(world: World, unit: Unit, pet: Pet): boolean {
  return unit.alive && !unit.resurrection && !unit.deathDefied && !unit.pendingAttack && !isBusy(unit) && unit.attackReadyTick <= world.tick && canAttack(unit) && world.pets.includes(pet) && canTargetPet(pet, unit, world.tick) && canAttackPet(unit, pet, attackRange(unit));
}

export function startAttack(world: World, unit: Unit, pet?: Pet): void {
  unit.facing = Math.sign((pet?.x ?? world.units[other(unit.side)].x) - unit.x) < 0 ? -1 : 1;
  const bonusOnHit: Effect[] = [];
  let attackOnHitReplacement: Effect[] | undefined;
  let uncancellable = false;
  let hitsUntargetable = false;
  let spellShield = false;
  let spellShieldOnHit = false;
  let breakShields = false;
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
    hitsUntargetable ||= empower.empower.hitsUntargetable === true;
    spellShield ||= empower.empower.spellShield === true;
    spellShieldOnHit ||= empower.empower.spellShieldOnHit === true;
    attackOnHitReplacement = empower.empower.attackOnHitReplacement ?? attackOnHitReplacement;
    breakShields ||= empower.empower.breakShields === true;
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
    ...(hitsUntargetable ? { hitsUntargetable } : {}),
    ...(spellShield ? { spellShield } : {}),
    ...(spellShieldOnHit ? { spellShieldOnHit } : {}),
    ...(attackOnHitReplacement ? { attackOnHitReplacement } : {}),
    ...(breakShields ? { breakShields } : {}),
    critChance: derive(unit).critChance,
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
  if (unit.pendingAttack === action) delete unit.pendingAttack;
  // Post-effect cooldowns that waited for this empowered attack start as it lands.
  if (action.empowered) releaseCooldowns(world, unit);
  const onLaunch = unit.spec.hooks?.onAttackLaunch;
  if (onLaunch) onLaunch(hookContext(world, unit));
  if (action.pet !== undefined) {
    launchAttackOnPet(world, unit, action);
    return;
  }
  const enemy = world.units[other(unit.side)];
  if (!enemy.alive || (isUntargetable(enemy, unit) && !action.hitsUntargetable)) return;
  const { attack } = unit.spec;
  if (!attack.missileSpeed) {
    attackHit(world, unit, enemy, action.blinded, action.onHit, action.split, action.hitsUntargetable, { critChance: action.critChance, spellShield: action.spellShield, spellShieldOnHit: action.spellShieldOnHit, attackOnHitReplacement: action.attackOnHitReplacement, breakShields: action.breakShields });
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
    attack: { blinded: action.blinded, bonusOnHit: action.onHit, ...(action.split ? { split: action.split } : {}), critChance: action.critChance, ...(action.spellShield ? { spellShield: true } : {}), ...(action.spellShieldOnHit ? { spellShieldOnHit: true } : {}), ...(action.attackOnHitReplacement ? { attackOnHitReplacement: action.attackOnHitReplacement } : {}), ...(action.breakShields ? { breakShields: true } : {}) },
    ...(action.hitsUntargetable ? { hitsUntargetable: true } : {}),
  });
}

/** A basic attack on a pet: melee attacks hit at once, ranged attacks fire a missile at it. */
function resolveAttackOnPet(world: World, unit: Unit, pet: Pet, critChance?: number): void {
  if (!world.pets.includes(pet) || pet.spec.untargetable) return;
  const target = petFormulaTarget(pet, unit, world.tick);
  if (isUntargetable(target, unit) || hasState(target, "parry") || hasState(target, "dodgeAttacks")) return;
  if (!hasState(target, "blockAttacks")) damagePet(world, unit, pet, attackDamageOf(unit, critChance), "physical", true);
  target.hp = pet.hp;
  target.alive = pet.hp > 0;
  target.statuses = pet.statuses ?? [];
  unit.spec.hooks?.onAttackPetHit?.({ ...hookContext(world, unit, undefined, target), pet });
}

function launchAttackOnPet(world: World, unit: Unit, action: Extract<Action, { kind: "windup" }>): void {
  const pet = world.pets.find((p) => p.id === action.pet);
  if (!pet || action.blinded) return;
  const { attack } = unit.spec;
  if (!attack.missileSpeed) {
    resolveAttackOnPet(world, unit, pet, action.critChance);
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
    attack: { blinded: action.blinded, bonusOnHit: [], critChance: action.critChance },
  });
}

/** A basic attack's damage before resistances, crits averaged. */
function attackDamageOf(unit: Unit, critChance?: number): number {
  const d = derive(unit);
  return d.ad * averageCritFactor(critChance ?? d.critChance, d.critDamage);
}

/**
 * A target that leaves attack range during the windup cancels the attack, which resets the
 * attack timer; uncancellable windups complete anyway (wiki: "Basic attack", uncancellable
 * windup). How far past its range the target must get is not documented; this takes the
 * attack range itself.
 */
export function cancelOutOfRange(world: World, unit: Unit): void {
  for (const action of [unit.action, unit.pendingAttack]) {
    if (action?.kind !== "windup" || action.uncancellable) continue;
    if (action.pet !== undefined) {
      const pet = world.pets.find((p) => p.id === action.pet);
      if (pet && petDistance(unit, pet) <= attackRange(unit) + EPSILON) continue;
    } else {
      const enemy = world.units[other(unit.side)];
      if (edgeDistance(unit, enemy) <= unit.spec.attack.range + action.bonusRange + rangeBuffs(unit) + EPSILON) continue;
      log(world, unit.side, "attack cancelled: target out of range");
    }
    if (unit.action === action) unit.action = undefined;
    if (unit.pendingAttack === action) delete unit.pendingAttack;
    unit.attackReadyTick = world.tick;
  }
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
  if (ability.costFor) return Math.max(0, ability.costFor(unit, ability));
  const cost = ability.cost ?? 0;
  return typeof cost === "number" ? cost : evaluate(cost, unit);
}

function affordable(unit: Unit, ability: AbilitySpec): boolean {
  const cost = costOf(unit, ability);
  if (cost <= 0) return true;
  // A health cost can't be paid with the last of it.
  const held = unit.action?.kind === "dash" ? unit.action.resume : undefined;
  const pending = [unit.action, held].reduce((sum, action) => {
    if (action?.kind !== "cast") return sum;
    const declared = abilityOf(unit, action.ability);
    if (!declared || (declared.costType ?? "resource") !== (ability.costType ?? "resource")) return sum;
    return sum + (action.cost ?? costOf(unit, declared));
  }, 0);
  return ability.costType === "health" ? unit.hp - pending > cost : unit.resource - pending + EPSILON >= cost;
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
      return (d.kind === "dash" ? d.distanceFor?.(unit) ?? d.distance : d.distance) + d.hitRadius + (d.hitCentered ? 0 : radii);
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
  if (!unit.alive || unit.resurrection || !abilityReady(world, unit, ability)) return false;
  // Casting cancels a windup, but nothing else can be interrupted (except a channel by its own recast).
  const allowedChannel = unit.action?.kind === "channel" && ability.allowedDuringChannel?.includes(unit.action.ability);
  if (unit.action && unit.action.kind !== "windup" && !endsOwnChannel(unit, ability) && !overlays(unit, ability) && !allowedChannel) return false;
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
  if (action?.kind === "channel") return (ability.castTimeFor?.(unit) ?? ability.castTime) === 0 && ability.overlayChannels?.includes(action.ability) === true;
  return action?.kind === "dash" && !action.resume && ability.delivery.kind !== "dash";
}

/** Starts a cast; instant casts complete at once and may return a skillshot to split on. */
export function startCast(world: World, unit: Unit, ability: AbilitySpec, aim?: Aim): PendingSplit | undefined {
  const declaredCost = costOf(unit, ability);
  unit.facing = (directionTo(unit, world.units[other(unit.side)]) * (aim?.direction ?? 1)) as 1 | -1;
  delete unit.memory[`failedCast:${ability.key}`];
  if (ability.castOrigin === "start") unit.memory[`castOrigin:${ability.key}`] = unit.x;
  if (ability.castDirection === "start") unit.memory[`castDirection:${ability.key}`] = directionTo(unit, world.units[other(unit.side)]);
  if (endsOwnChannel(unit, ability)) {
    const old = unit.action?.kind === "channel" ? abilityOf(unit, unit.action.ability) : undefined;
    unit.action = undefined;
    if (old) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, old), reason: "recast" });
  }
  const endingChannel = unit.action?.kind === "channel" && ability.allowedDuringChannel?.includes(unit.action.ability) && !overlays(unit, ability) ? unit.action : undefined;
  const overlayDash = unit.action?.kind === "dash" && ability.overlay ? unit.action : undefined;
  const castTicks = toTicks(ability.castTimeFor?.(unit) ?? ability.castTime);
  if (unit.action?.kind === "windup") {
    if (ability.preserveAttackWindup === true || (ability.preserveAttackWindup === "uncancellable" && unit.action.uncancellable)) {
      if (castTicks > 0 || ability.delivery.kind === "dash" || (ability.channel && !ability.channel.manualStart)) {
        unit.pendingAttack = unit.action;
        unit.action = undefined;
      }
    } else {
      // An interrupted windup resets the attack timer (wiki: "Attack speed", attack timer).
      unit.action = undefined;
      unit.attackReadyTick = world.tick;
    }
  }
  if (ability.cooldownAtCastStart) startCooldown(world, unit, ability);
  log(world, unit.side, `casts ${ability.name}`);
  for (const effect of ability.onCastStart ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  const onCastStart = unit.spec.hooks?.onCastStart;
  if (onCastStart) onCastStart({ ...hookContext(world, unit, ability), ...(aim ? { aim } : {}) });
  const enemy = world.units[other(unit.side)];
  enemy.spec.hooks?.onEnemyCast?.({ ...hookContext(world, enemy), ability, caster: unit });
  if (endingChannel && unit.action === endingChannel) {
    unit.action = undefined;
    const old = abilityOf(unit, endingChannel.ability);
    if (old) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, old), reason: "cast" });
  }
  let early: PendingSplit | undefined;
  if (ability.deliveryAtCastStart) early = completeOneCast(world, unit, ability, world.tick, aim, declaredCost, true);
  if (castTicks === 0) return completeCast(world, unit, ability, world.tick, aim, declaredCost) ?? early;
  const cast: Extract<Action, { kind: "cast" }> = { kind: "cast", ability: ability.key, startTick: world.tick, endTick: world.tick + castTicks, cost: declaredCost, ...(aim ? { aim } : {}) };
  if (overlayDash && unit.action === overlayDash) overlayDash.resume = cast;
  else unit.action = cast;
  if (!ability.moveWhileCasting) unit.move = 0;
  return early;
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
  const haste = ability.staticCooldown ? 0 : derive(unit).abilityHaste;
  unit.cooldownReady[key] = world.tick + toTicks(cooldownAfterHaste(ability.cooldownFor?.(unit) ?? ability.cooldown, haste));
}

/** Post-effect cooldowns start once their cast's effect is over (wiki: "Cooldown starts"). */
export function releaseCooldowns(world: World, unit: Unit): void {
  for (const [key, abilityKey] of Object.entries(unit.cooldownHeld)) {
    const ability = abilityOf(unit, abilityKey);
    if (ability && effectLasts(world, unit, ability)) continue;
    delete unit.cooldownHeld[key];
    const haste = ability?.staticCooldown ? 0 : derive(unit).abilityHaste;
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
      if (unit.pendingAttack?.empowered?.some(mine)) return true;
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

const HOLDING_CC = new Set(["stun", "root", "airborne", "suppression", "sleep", "stasis", "suspension", "charm", "taunt", "fear", "berserk"]);

/**
 * The last tick at which crowd control or the target's own cast, channel or dash prevents
 * voluntary sidestepping. Forced actions (charm, taunt, fear, berserk) still move along the
 * line, but cannot dodge sideways. Mobile casts/channels (Decimate, Judgment) don't hold it.
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
  /** Additional simultaneous skillshots from automatic stages of this cast. */
  followUps?: PendingSplit[];
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

export function completeCast(world: World, unit: Unit, ability: AbilitySpec, castStartTick: number, aim?: Aim, declaredCost?: number): PendingSplit | undefined {
  let split = completeOneCast(world, unit, ability, castStartTick, aim, declaredCost);
  for (let follow = pendingFollowUps.shift(); follow; follow = pendingFollowUps.shift()) {
    const [owner, next] = follow;
    if (!owner.alive) continue;
    log(world, owner.side, `${next.name} fires`);
    // Always execute the follow-up, even when the first stage already produced a split.
    const followSplit = completeOneCast(world, owner, next, world.tick);
    if (followSplit) {
      if (split) (split.followUps ??= []).push(followSplit);
      else split = followSplit;
    }
  }
  return split;
}

function completeOneCast(world: World, unit: Unit, ability: AbilitySpec, castStartTick: number, aim?: Aim, declaredCost?: number, earlyDelivery = false): PendingSplit | undefined {
  const enemy = world.units[other(unit.side)];
  if (earlyDelivery && ability.delivery.kind !== "circle" && ability.delivery.kind !== "field") throw new Error("Cast-start delivery requires a ground area");
  const capturedCost = declaredCost ?? (unit.action?.kind === "cast" && unit.action.ability === ability.key ? unit.action.cost : undefined);
  // An overlay cast leaves what the unit was doing running; its dash holds it until it ends.
  const held = ability.overlay && unit.action && unit.action.kind !== "windup" && !(unit.action.kind === "cast" && unit.action.ability === ability.key) ? unit.action : undefined;
  if (!earlyDelivery && unit.action?.kind === "cast" && unit.action.ability === ability.key) unit.action = undefined;
  if (!earlyDelivery) {
  if (ability.cancelOnInvalidTarget && ability.delivery.kind === "target" &&
    (!enemy.alive || (!ability.retainTargetOnInvalidation && (isUntargetable(enemy, unit) || (!ability.retainTargetOnVisibilityLoss && !canSee(enemy, unit)))) || Math.abs(unit.x - enemy.x) > targetRange(ability.delivery, unit, enemy) + EPSILON)) {
    log(world, unit.side, `${ability.name} cancelled: target is out of reach`);
    return undefined;
  }
  const cost = capturedCost ?? costOf(unit, ability);
  if (ability.costType === "health") unit.hp -= cost;
  else unit.resource -= cost;
  if (!ability.cooldownAtCastStart && !(ability.chainCooldown === "last") && !ability.chain) startCooldown(world, unit, ability);
  if (unit.memory[`failedCast:${ability.key}`]) {
    delete unit.memory[`failedCast:${ability.key}`];
    log(world, unit.side, `${ability.name} fails to deliver after crowd control`);
    return undefined;
  }
  advanceChain(world, unit, ability);
  for (const effect of ability.onSelf ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  const onCast = unit.spec.hooks?.onCast;
  if (onCast) onCast({ ...hookContext(world, unit, ability), ...(aim ? { aim } : {}) });
  if (ability.deliveryAtCastStart) return undefined;
  }
  const onHit = ability.onHit ?? [];
  const delivery = ability.delivery;
  const centerDistance = Math.abs(unit.x - enemy.x);
  const origin = ability.castOrigin === "start" ? Number(unit.memory[`castOrigin:${ability.key}`] ?? unit.x) : unit.x;
  const direction = ability.castDirection === "start" ? Number(unit.memory[`castDirection:${ability.key}`] ?? directionTo(unit, enemy)) : directionTo(unit, enemy);
  let split: PendingSplit | undefined;
  switch (delivery.kind) {
    case "self":
      break;
    case "aura":
      if (centerDistance <= delivery.radius + EPSILON) abilityHit(world, unit, enemy, ability, onHit);
      areaOnPets(world, unit, unit.x - delivery.radius, unit.x + delivery.radius, onHit);
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
      const forward = (enemy.x - origin) * direction;
      const reachable = forward >= -enemy.spec.base.radius - EPSILON && forward - enemy.spec.base.radius <= delivery.range + EPSILON;
      const travel = delivery.speed ? Math.max(0, Math.abs(origin - enemy.x) - enemy.spec.base.radius) / delivery.speed : 0;
      const decision = reachable ? resolveSkillshot(world, unit, enemy, ability, castStartTick, travel, delivery.width / 2) : { connects: false, scale: 1 };
      if (delivery.speed) {
        const m = missile(world, unit, enemy, ability, castStartTick, delivery.speed, false, delivery.travelRange ?? delivery.range, decision.connects, decision.scale);
        if (delivery.piercing) m.piercing = true;
        if (delivery.collisionPet) m.collisionPet = true;
        if (delivery.radius !== undefined) m.radius = delivery.radius;
        if (delivery.collisionRange !== undefined) m.collisionDistanceLeft = delivery.collisionRange;
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
      const x = aim?.distance !== undefined ? unit.x + directionTo(unit, enemy) * aim.direction * Math.min(delivery.range, Math.max(0, aim.distance)) : enemy.x - directionTo(unit, enemy) * offset;
      const reach = aim?.distance !== undefined ? delivery.radius - Math.abs(enemy.x - x) : delivery.radius - offset;
      // A centered circle must cover the target's center: the target needs to move only its center out.
      const edge = delivery.centered ? 0 : enemy.spec.base.radius;
      // The enemy can react only once it can see where it lands.
      const seen = castStartTick + toTicks(delivery.hidden ?? 0);
      const span = Math.abs(x - unit.x);
      const travel = span <= 0 ? 0 : delivery.flight ?? (delivery.speed ? span / delivery.speed : 0);
      const flight = (delivery.speed !== undefined || delivery.flight !== undefined) && travel > 0;
      const decision =
        reach + edge > EPSILON ? resolveSkillshot(world, unit, enemy, ability, seen, travel + delivery.delay, reach - enemy.spec.base.radius + edge) : { connects: false, scale: 1 };
      const zone = {
        id: world.nextId++,
        owner: unit.side,
        kind: "delayedArea" as const,
        seenTick: seen,
        x,
        radius: delivery.radius,
        startTick: world.tick,
        endTick: flight ? Number.POSITIVE_INFINITY : world.tick + toTicks(delivery.delay),
        ability: ability.key,
        onHit,
        connects: decision.connects,
        scale: decision.scale,
        ...(delivery.centered ? { centered: true } : {}),
      };
      world.zones.push(zone);
      if (flight) {
        world.missiles.push({
          ...missile(world, unit, enemy, ability, castStartTick, delivery.flight !== undefined ? span / delivery.flight : delivery.speed!, false, span, false, 1),
          landingZone: { id: zone.id, delayTicks: toTicks(delivery.delay) },
        });
      }
      if (decision.split !== undefined) split = { zone: zone.id, chance: decision.split };
      break;
    }
    case "dash": {
      // Aimed dashes go either way, as far as asked within their range.
      const aimed = aim !== undefined && delivery.minDistance !== undefined;
      const away = aimed ? aim.direction < 0 : delivery.direction === "away";
      const dir = away ? -directionTo(unit, enemy) : directionTo(unit, enemy);
      const full = delivery.distanceFor?.(unit) ?? delivery.distance;
      const distance = aimed ? Math.min(full, Math.max(delivery.minDistance ?? 0, aim.distance ?? full)) : full;
      const speed = delivery.speedFor?.(unit) ?? delivery.speed;
      // A charge starts at the caster's movement speed and speeds up (Unstoppable Onslaught).
      const ramp = delivery.ramp
        ? { from: Math.min(speed, delivery.ramp.from ?? derive(unit).moveSpeed), amount: delivery.ramp.amount, everyTicks: Math.max(1, toTicks(delivery.ramp.every)), max: speed }
        : undefined;
      // A leap lands after its time however far it goes: at the enemy's side, or its full distance away.
      const leap = delivery.time !== undefined && !ramp;
      const span = leap && !away && !delivery.through ? Math.min(distance, Math.max(0, contactGap(unit, enemy))) : distance;
      const ticks = ramp ? rampTicks(distance, ramp) : leap ? Math.max(1, toTicks(delivery.time ?? 0)) : Math.max(1, Math.ceil(distance / (speed / 30) - EPSILON));
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
        const travel = (ramp ? rampTicks(gap, ramp) : leap ? ticks : Math.ceil(gap / (speed / 30) - EPSILON)) / 30;
        const decision = resolveSkillshot(world, unit, enemy, ability, castStartTick, travel + (delivery.sidestep.later ?? 0), delivery.sidestep.reach);
        dash.connects = decision.connects;
        dash.scale = decision.scale;
        if (decision.split !== undefined) split = { dash: unit.side, chance: decision.split };
      }
      unit.action = dash;
      break;
    }
    case "area": {
      const dir = direction;
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
        ...(delivery.burst ? { burst: { count: delivery.burst.count, gap: Math.max(1, toTicks(delivery.burst.gap)) }, burstHit: 0 } : {}),
        ...(delivery.onOwner ? { onOwner: delivery.onOwner } : {}),
      });
      // A field that lands at once pulses with the zones this tick.
      if (start === world.tick) advanceZones(world);
      break;
    }
    case "blink": {
      const aimed = aim !== undefined && delivery.minDistance !== undefined;
      const dir = aimed ? aim.direction * direction : delivery.direction === "away" ? -direction : direction;
      const distance = aimed ? Math.min(delivery.distance, Math.max(delivery.minDistance ?? 0, aim.distance ?? delivery.distance)) : delivery.distance;
      let x = unit.x + dir * distance;
      if (!aimed && delivery.direction === "toward" && delivery.through) {
        x = enemy.x + dir * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
      } else if (!aimed && delivery.direction === "toward") {
        // Blinks land next to the enemy at most, not through them.
        const contact = enemy.x - dir * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
        if ((dir > 0 && x > contact) || (dir < 0 && x < contact)) x = contact;
      }
      unit.x = x;
      if (delivery.hitRadius !== undefined) {
        if ((delivery.hitCentered ? Math.abs(unit.x - enemy.x) : edgeDistance(unit, enemy)) <= delivery.hitRadius + EPSILON) abilityHit(world, unit, enemy, ability, onHit);
        areaOnPets(world, unit, unit.x - delivery.hitRadius, unit.x + delivery.hitRadius, onHit);
      }
      break;
    }
  }
  if (!earlyDelivery && ability.channel && !ability.channel.manualStart) {
    const intervalTicks = channelInterval(ability, unit);
    const durationTicks = toTicks(ability.channel.duration);
    const pulseCount = ability.channel.pulses ? Math.max(1, Math.floor(evaluate(ability.channel.pulses, unit) + EPSILON)) : undefined;
    unit.action = {
      kind: "channel",
      ability: ability.key,
      startTick: world.tick,
      endTick: world.tick + durationTicks,
      nextTick: world.tick + (pulseCount ? Math.max(1, Math.ceil(durationTicks / pulseCount)) : intervalTicks),
      intervalTicks,
      ...(pulseCount ? { pulseCount, pulsesDone: 0 } : {}),
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
    x: ability.castOrigin === "start" ? Number(unit.memory[`castOrigin:${ability.key}`] ?? unit.x) : unit.x,
    perTick: speed / 30,
    homing,
    direction: ability.castDirection === "start" ? Number(unit.memory[`castDirection:${ability.key}`] ?? directionTo(unit, enemy)) as 1 | -1 : directionTo(unit, enemy),
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
  let step = toUnit ? action.perTick : terrainLimit(world, unit, action.perTick);
  if (action.stopAtContact) {
    // Clamp against the starting direction. Recomputing it after crossing the enemy would
    // put fast dashes on the far side, or let a whole tick skip contact altogether.
    const dir = Math.sign(action.perTick);
    const contact = enemy.x - dir * (unit.spec.base.pathingRadius + enemy.spec.base.pathingRadius);
    step = dir * Math.min(Math.abs(step), Math.max(0, (contact - unit.x) * dir));
  }
  unit.x += step;
  if (stoppedByAntiDash(world, unit, enemy, action.unstoppable, from)) return;
  if (ability && action.through && !action.hit && ability.delivery.kind === "dash" && ability.delivery.hitRadius !== undefined) {
    // Passing the enemy: hit once its hitbox comes within reach (edge to edge) of the dash's path.
    const reach = ability.delivery.hitRadius + (ability.delivery.hitCentered ? 0 : unit.spec.base.radius + enemy.spec.base.radius);
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
  if (ability && delivery?.kind === "dash" && !delivery.through && delivery.hitRadius !== undefined && (delivery.hitCentered ? Math.abs(unit.x - enemy.x) : edgeDistance(unit, enemy)) <= delivery.hitRadius + EPSILON) {
    // A charge the enemy stepped aside from ends beside it without hitting.
    if (action.connects === false) log(world, unit.side, `${ability.name} misses`);
    else abilityHit(world, unit, enemy, ability, ability.onHit ?? [], action.scale ?? 1);
  }
  notifyDashEnd(world, unit, action.ability, false);
}

/**
 * Steadfast Presence: a dash that comes within the aura's radius is stopped, and the aura's
 * effects hit the dasher, once per cast. Immunity prevents the knock-up (and its following
 * slow/ground), but the aura still triggers and deals damage. Spell shields consume the
 * trigger and negate all effects; untargetable units never trigger it (Poppy's wiki notes).
 */
function stoppedByAntiDash(world: World, unit: Unit, enemy: Unit, unstoppable: boolean, from: number): boolean {
  const aura = enemy.statuses.find((s) => s.kind === "state" && s.key === "antiDash");
  if (!aura || isUntargetable(unit, enemy)) return false;
  const radius = aura.value + unit.spec.base.radius;
  const crosses = Math.max(from, unit.x) >= enemy.x - radius - EPSILON && Math.min(from, unit.x) <= enemy.x + radius + EPSILON;
  if (!crosses) return false;
  const immune = unstoppable || unit.statuses.some((s) => s.kind === "state" && ["ccImmune", "displacementImmune"].includes(s.key));
  const protectedHit = unit.statuses.some((s) => s.kind === "state" && ["spellShield", "parry"].includes(s.key));
  const dash = unit.action;
  enemy.statuses = enemy.statuses.filter((s) => s !== aura);
  const ability = abilityOf(enemy, aura.ability) ?? { key: "antiDash", name: "anti-dash aura", slot: "W", cooldown: 0, castTime: 0, delivery: { kind: "self" } } satisfies AbilitySpec;
  const effects = immune ? (aura.effects ?? []).filter((e) => e.type !== "cc" && e.type !== "displace") : aura.effects ?? [];
  abilityHit(world, enemy, unit, ability, effects);
  if (immune || protectedHit) return false;
  // A fast dash cannot cross the complete aura between two ticks. Stop at its entry edge.
  if (Math.abs(from - enemy.x) > radius) unit.x = enemy.x + Math.sign(from - enemy.x) * radius;
  // The knock-up may already have ended the overlay dash and restored its parent cast.
  if (unit.action === dash) {
    unit.action = dash?.kind === "dash" ? dash.resume : undefined;
    if (dash?.kind === "dash") notifyDashEnd(world, unit, dash.ability, true);
  }
  log(world, enemy.side, "stops the dash");
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
  // Pulses with a reach around the caster hit the enemy's pets in it too.
  const onPets = (effects: Effect[]) => {
    if (channel.range !== undefined) areaOnPets(world, unit, unit.x - channel.range, unit.x + channel.range, effects);
  };
  while (world.tick >= action.nextTick && world.tick <= action.endTick) {
    if (inRange && channel.onTick) abilityHit(world, unit, enemy, ability, channel.onTick);
    if (channel.onTick) onPets(channel.onTick);
    if (action.pulseCount) {
      action.pulsesDone = (action.pulsesDone ?? 0) + 1;
      action.nextTick = action.pulsesDone >= action.pulseCount
        ? Number.POSITIVE_INFINITY
        : action.startTick + Math.max(1, Math.ceil(((action.endTick - action.startTick) * (action.pulsesDone + 1)) / action.pulseCount));
    } else action.nextTick += action.intervalTicks;
    // A pulse's effects can interrupt the channel (reflected damage and kit hooks).
    if (unit.action !== action) return;
  }
  if (world.tick >= action.endTick) {
    unit.action = undefined;
    if (inRange && channel.onComplete) abilityHit(world, unit, enemy, ability, channel.onComplete);
    if (channel.onComplete) onPets(channel.onComplete);
    for (const effect of channel.onCompleteSelf ?? []) applyEffect(world, unit, unit, effect, { ability, scale: 1 });
  }
}

/** Projectiles die on an enemy projectile wall they cross or in a projectile-blocking aura. */
function blocked(world: World, m: Missile, from: number, to: number): boolean {
  if (!m.projectile) return false;
  const targetSide = other(m.owner);
  const target = world.units[targetSide];
  for (const zone of world.zones) {
    if (zone.kind !== "projectileWall" || zone.owner !== targetSide || world.tick < zone.startTick || world.tick >= zone.endTick) continue;
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
  if (zone.burst) {
    // The hits of a cluster `gap` apart; the next cluster `interval` after this one began.
    zone.burstHit = ((zone.burstHit ?? 0) + 1) % zone.burst.count;
    zone.nextTick += zone.burstHit === 0 ? Math.max(1, (zone.interval ?? 1) - (zone.burst.count - 1) * zone.burst.gap) : zone.burst.gap;
  } else zone.nextTick += zone.interval ?? 1;
  const ability = abilityOf(owner, zone.ability);
  if (ability && zone.onHit?.length && target.alive && Math.abs(target.x - zone.x) <= zone.radius + target.spec.base.radius + EPSILON) {
    abilityHit(world, owner, target, ability, zone.onHit, zone.scale ?? 1);
  }
  if (ability && zone.onHit?.length && !zone.noPets) areaOnPets(world, owner, zone.x - zone.radius, zone.x + zone.radius, zone.onHit);
  if (zone.onOwner?.length && Math.abs(owner.x - zone.x) <= zone.radius + EPSILON) {
    for (const effect of zone.onOwner) applyEffect(world, owner, owner, effect, { scale: 1, ...(ability ? { ability } : {}) });
  }
}

/** Moves every missile one tick, then resolves hits, misses and blocks. */
export function advanceMissiles(world: World): void {
  const keep: Missile[] = [];
  const initial = [...world.missiles];
  const initialIds = new Set(initial.map((m) => m.id));
  for (const m of initial) {
    if (m.piercing || m.followOwner || m.collisionPet || m.expiresTick !== undefined) {
      if (advanceSpecialMissile(world, m, blocked)) keep.push(m);
      continue;
    }
    const owner = world.units[m.owner];
    const target = world.units[other(m.owner)];
    const from = m.x;
    if (m.pet !== undefined) {
      // A basic attack flying at a pet: it lands when it reaches it, or fizzles if it is gone.
      const pet = world.pets.find((p) => p.id === m.pet);
      if (!pet) continue;
      m.x += Math.sign(pet.x - m.x) * Math.min(m.perTick, Math.abs(pet.x - m.x));
      if (Math.abs(pet.x - m.x) <= pet.spec.radius + EPSILON) {
        if (!m.attack?.blinded) resolveAttackOnPet(world, owner, pet, m.attack?.critChance);
      } else keep.push(m);
      continue;
    }
    const step = m.homing ? Math.sign(target.x - m.x) * Math.min(m.perTick, Math.abs(target.x - m.x)) : m.direction * (m.landingZone ? Math.min(m.perTick, m.travelLeft) : m.perTick);
    m.x += step;
    m.travelLeft -= Math.abs(step);
    if (m.acceleration) m.perTick = Math.min(m.acceleration.maxPerTick, m.perTick + m.acceleration.perTick);
    if (blocked(world, m, from, m.x)) {
      if (m.landingZone) world.zones = world.zones.filter((zone) => zone.id !== m.landingZone?.id);
      log(world, target.side, `blocks a projectile (${m.source === "attack" ? "attack" : m.source})`);
      continue;
    }
    owner.spec.hooks?.onMissileMove?.({ ...hookContext(world, owner), missile: m, from, to: m.x });
    if (m.landingZone) {
      if (m.travelLeft <= EPSILON) {
        const zone = world.zones.find((candidate) => candidate.id === m.landingZone?.id);
        if (zone) zone.endTick = world.tick + m.landingZone.delayTicks;
      } else keep.push(m);
      continue;
    }
    // Whether the target's hitbox touches the stretch the missile covered this tick.
    const reached = target.x >= Math.min(from, m.x) - target.spec.base.radius - EPSILON && target.x <= Math.max(from, m.x) + target.spec.base.radius + EPSILON;
    if (reached) {
      if (m.attack) attackHit(world, owner, target, m.attack.blinded, m.attack.bonusOnHit, m.attack.split, m.hitsUntargetable, { critChance: m.attack.critChance, spellShield: m.attack.spellShield, spellShieldOnHit: m.attack.spellShieldOnHit, attackOnHitReplacement: m.attack.attackOnHitReplacement, breakShields: m.attack.breakShields });
      else if (m.connects) {
        const ability = abilityOf(owner, m.source);
        if (ability) abilityHit(world, owner, target, ability, m.onHit, m.scale);
      }
      if (m.homing || m.connects) continue;
    }
    if (m.travelLeft > 0 && target.alive) keep.push(m);
  }
  world.missiles = [...keep, ...world.missiles.filter((m) => !initialIds.has(m.id))];
}

/** Ground areas land, traps go off on contact, fields pulse, and projectile walls expire. */
export function advanceZones(world: World): void {
  const keep: Zone[] = [];
  const initial = [...world.zones];
  const initialIds = new Set(initial.map((zone) => zone.id));
  for (const zone of initial) {
    // Hooks can cancel later zones or append a subsequent stage. New stages advance
    // next tick; filtering the live collection must not resurrect a cancelled zone.
    if (!world.zones.some((candidate) => candidate.id === zone.id)) continue;
    const owner = world.units[zone.owner];
    const target = world.units[other(zone.owner)];
    if (zone.kind === "field") {
      if (world.tick >= zone.endTick || !owner.alive) continue;
      pulseField(world, zone, owner, target);
      keep.push(zone);
      continue;
    }
    if (zone.kind === "trap") {
      if (world.tick >= zone.endTick) continue;
      if (world.tick >= zone.startTick && Math.abs(target.x - zone.x) <= zone.radius + (zone.centered ? 0 : target.spec.base.radius) + EPSILON && target.alive && !isUntargetable(target, owner)) {
        owner.spec.hooks?.onZoneTrigger?.({ ...hookContext(world, owner), zone });
        log(world, target.side, "steps on a trap");
        const ability = abilityOf(owner, zone.ability);
        if (ability) abilityHit(world, owner, target, ability, zone.onHit ?? [], zone.scale ?? 1);
        else for (const effect of zone.onHit ?? []) applyEffect(world, owner, target, effect, { scale: 1 });
        continue;
      }
    } else if (zone.kind === "delayedArea" && world.tick >= zone.endTick) {
      owner.spec.hooks?.onZoneLand?.({ ...hookContext(world, owner), zone });
      if ((zone.kind as Zone["kind"]) === "trap") { if (world.tick < zone.endTick) keep.push(zone); continue; }
      if ((zone.kind as Zone["kind"]) === "field") {
        pulseField(world, zone, owner, target);
        if (world.tick < zone.endTick) keep.push(zone);
        continue;
      }
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
      // Pets in it take the hit too, unless it is a line (an instant one the fight split on) or its kit handles them.
      if (ability && ability.delivery.kind !== "line" && !zone.noPets) areaOnPets(world, owner, x - radius, x + radius, zone.onHit ?? []);
      continue;
    }
    if (world.tick < zone.endTick) keep.push(zone);
  }
  const remainingIds = new Set(world.zones.map((zone) => zone.id));
  world.zones = [...keep.filter((zone) => remainingIds.has(zone.id)), ...world.zones.filter((zone) => !initialIds.has(zone.id))];
}

