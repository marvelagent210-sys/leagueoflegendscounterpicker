/**
 * Resolving hits: every interaction rule the ledger lists, applied as the fight happens.
 *
 * Ability hits: untargetable targets are missed; a spell shield negates the ability and is
 * consumed; a parry (Riposte) negates it and can empower its shock if it negated an immobilize;
 * abilities that strike like attacks are dodged and blocked like attacks.
 * Basic attacks: miss if the attacker was blinded when it declared the attack, are dodged
 * (Counter Strike) or parried, or have their damage blocked (Spirit's Refuge).
 * Crowd control: crowd control immunity, displacement immunity and slow immunity stop it,
 * tenacity shortens it, and it interrupts windups, channels and dashes as the rules say.
 * Damage: invulnerability, resistances and penetration, damage modifiers, shields, minimum
 * health thresholds and executes.
 */
import { CC_RULES, type CCType, DISPLACEMENTS, IMMOBILIZING, ccDuration } from "../rules/crowdControl";
import { type DamageType, effectiveResist, mitigate } from "../rules/damage";
import { type Shield, absorbWithShields, averageCritFactor, healingReceived } from "../rules/defense";
import { toTicks } from "../rules/time";
import { cooldownAfterHaste } from "../rules/timing";
import { derive, evaluate, hasState } from "./derived";
import { abilityOf, setForm } from "./forms";
import { terrainGap, terrainLimit } from "./terrain";
import { damagePet, petEffects } from "./pets";
import { type AbilitySpec, type AttackSplit, type BuffStat, type Effect, type HookContext, type PetDamageCategory, cooldownKeyOf } from "./spec";
import { type AttackHitOptions, type Pet, type Side, type Status, type Unit, type World, other } from "./state";

export function log(world: World, side: Side, text: string): void {
  if (world.settings.log) world.log.push({ tick: world.tick, side, text });
}

export function addStatus(unit: Unit, status: Status): void {
  unit.statuses.push(status);
}

function stateStatus(unit: Unit, state: string): Status | undefined {
  return unit.statuses.find((s) => s.kind === "state" && s.key === state);
}

const blackShieldPackets: Array<{ world: World; target: Unit }> = [];
const negatePackets: Array<{ world: World; target: Unit; negated: boolean }> = [];
function hasBlackShield(world: World, unit: Unit): boolean {
  return unit.statuses.some((status) => status.kind === "shield" && status.blackShield && status.value > 0 && status.endTick > world.tick);
}
function blackShieldProtected(world: World, unit: Unit): boolean {
  return hasBlackShield(world, unit) || blackShieldPackets.some((packet) => packet.world === world && packet.target === unit);
}
/** CC associated with the hit breaking Black Shield remains blocked until that packet ends. */
function withBlackShieldPacket(world: World, target: Unit, apply: () => void): void {
  const protectedPacket = hasBlackShield(world, target);
  if (protectedPacket) blackShieldPackets.push({ world, target });
  negatePackets.push({ world, target, negated: false });
  try { apply(); } finally { negatePackets.pop(); if (protectedPacket) blackShieldPackets.pop(); }
}

function negateImmobilization(world: World, target: Unit): boolean {
  const packet = [...negatePackets].reverse().find((p) => p.world === world && p.target === target);
  if (packet?.negated) return true;
  const negate = stateStatus(target, "ccNegate");
  if (!negate) return false;
  negate.charges = (negate.charges ?? 1) - 1;
  if (negate.charges <= 0) target.statuses = target.statuses.filter((s) => s !== negate);
  if (packet) packet.negated = true;
  return true;
}

/** Stasis from the unit's own ability (a state) or from an enemy's (crowd control). */
export function inStasis(unit: Unit): boolean {
  return unit.statuses.some((s) => s.key === "stasis" && (s.kind === "state" || s.kind === "cc"));
}

/**
 * Whether a unit can't be targeted, by `by` when given: untargetability and stasis, and
 * anchored states such as Hallowed Mist that only keep out enemies outside an area.
 */
export function isUntargetable(unit: Unit, by?: Unit): boolean {
  if (hasState(unit, "untargetable") || inStasis(unit)) return true;
  if (!by) return false;
  return unit.statuses.some((s) => s.kind === "state" && s.key === "untargetableFar" && Math.abs(by.x - (s.x ?? unit.x)) > s.value);
}

/** Invisible: can't be targeted or aimed at, though areas and missiles in flight still hit it. */
export function isHidden(unit: Unit): boolean {
  return hasState(unit, "invisible");
}

/**
 * Whether `by` can see the unit: nearsight shrinks its sight to the radius the crowd control
 * carries as its strength (Blinding Assault's 350), measured from its center to the unit's.
 */
export function canSee(unit: Unit, by: Unit): boolean {
  const revealed = unit.statuses.some((status) => status.kind === "state" && status.key === "revealed" && (!status.revealWhileCC || unit.statuses.some((cc) => cc.kind === "cc" && cc.key === status.revealWhileCC && cc.source === status.source && cc.ability === status.ability)));
  if (isHidden(unit) && !revealed) return false;
  for (const s of by.statuses) if (s.kind === "cc" && s.key === "nearsight" && Math.abs(unit.x - by.x) > s.value) return false;
  return true;
}

/** Whether `by` can start an attack or a unit-targeted spell on the unit. */
export function canTarget(unit: Unit, by: Unit): boolean {
  return !isUntargetable(unit, by) && canSee(unit, by);
}

/** Units per tick a unit at `from` moves to get closer to `to`. */
export function directionTo(from: Unit, to: Unit): 1 | -1 {
  if (to.x === from.x) return from.side === 0 ? 1 : -1;
  return to.x > from.x ? 1 : -1;
}

export function edgeDistance(a: Unit, b: Unit): number {
  return Math.abs(a.x - b.x) - a.spec.base.radius - b.spec.base.radius;
}

/** Room left before the two units collide (their pathing radii touch). */
export function contactGap(a: Unit, b: Unit): number {
  return Math.abs(a.x - b.x) - a.spec.base.pathingRadius - b.spec.base.pathingRadius;
}

// ---------------------------------------------------------------------------------------
// Damage and healing

export interface DamageContext {
  petDamageCategory?: PetDamageCategory;
  attack?: boolean;
  /** This spell's basic damage benefits from life steal without being a basic attack. */
  appliesLifeSteal?: boolean;
  ability?: string;
  /** Damage over time: it doesn't wake sleeping units (wiki: "Template:Tip data/Sleep"). */
  persistent?: boolean;
  /** The source heals this share of post-mitigation damage, including shield damage. */
  lifesteal?: number;
  /** Life steal doesn't heal from it (Glory in Death's on-hit). */
  noLifeSteal?: boolean;
  /** Average critical and ordinary outcomes before shields, preserving this as one damage event. */
  crit?: { chance: number; multiplier: number };
}

/** How deep kit hooks are nested: a hook's damage can trigger hooks, but not without end. */
let hookDepth = 0;

function runHook(fn: () => void): void {
  if (hookDepth >= 3) return;
  hookDepth += 1;
  try {
    fn();
  } finally {
    hookDepth -= 1;
  }
}

/** Deals one hit of damage; returns the health removed. */
export function dealDamage(world: World, source: Unit, target: Unit, raw: number, type: DamageType, ctx: DamageContext = {}): number {
  if (raw <= 0 || !target.alive) return 0;
  if (target.petId !== undefined) {
    const pet = world.pets.find((candidate) => candidate.id === target.petId);
    if (!pet) return 0;
    const hp = pet.hp;
    damagePet(world, source, pet, raw, type, ctx.attack === true, ctx.ability, ctx.petDamageCategory ?? (ctx.attack ? "basic" : ctx.persistent ? "persistent" : "proc"));
    target.hp = pet.hp;
    target.alive = pet.hp > 0;
    target.statuses = pet.statuses ?? [];
    return Math.max(0, hp) - Math.max(0, pet.hp);
  }
  const outsideGuard = target.statuses.some((status) => status.kind === "state" && status.key === "invulnerableFar" && Math.abs(source.x - target.x) > status.value + 1e-6);
  if (hasState(target, "invulnerable") || outsideGuard || inStasis(target)) {
    log(world, target.side, `is invulnerable: ${Math.round(raw)} ${type} damage ignored`);
    return 0;
  }
  const s = derive(source);
  const t = derive(target);
  const beforeCrit = raw;
  const critChance = Math.min(1, Math.max(0, ctx.crit?.chance ?? 0));
  if (ctx.crit) raw *= averageCritFactor(critChance, ctx.crit.multiplier);
  const resist =
    type === "physical"
      ? effectiveResist(t.armor, t.armorReduction, { flat: s.lethality, percent: s.armorPen, bonusPercent: s.bonusArmorPen })
      : type === "magic"
        ? effectiveResist(t.mr, t.mrReduction, { flat: s.magicPen, percent: s.magicPenPercent })
        : 0;
  const typed = type === "physical" ? t.physicalReduction : type === "magic" ? t.magicReduction : [];
  const modifiers = { dealt: s.damageDealt, received: [...t.damageReduction, ...typed] };
  const criticalResist = type === "physical" && critChance > 0 && s.criticalBonusArmorIgnore > 0
    ? effectiveResist(t.armor, t.armorReduction, { flat: s.lethality, percent: s.armorPen, bonusPercent: s.bonusArmorPen, bonusIgnoreAdditive: s.criticalBonusArmorIgnore })
    : resist;
  // Armor differs between ordinary and critical outcomes. Average their mitigated
  // damage once, so shields, floors, vamp and damage hooks still see one hit.
  const flatReduction = type === "true" ? 0 : Math.max(0, ...target.statuses.filter((status) => status.kind === "state" && status.key === "flatDamageReduction").map((status) => status.value));
  const adjustRaw = target.spec.hooks?.modifyDamageTakenRaw;
  const reduceRaw = (amount: number) => {
    amount -= Math.min(flatReduction, amount / 2);
    return adjustRaw ? Math.max(0, adjustRaw({ ...hookContext(world, target, undefined, source), raw: amount, damageType: type, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) })) : amount;
  };
  const splitCritical = ctx.crit && (criticalResist !== resist || flatReduction > 0 || adjustRaw);
  const mitigated = splitCritical
    ? (critChance < 1 ? (1 - critChance) * mitigate(reduceRaw(beforeCrit), type, resist, modifiers) : 0) + (critChance > 0 ? critChance * mitigate(reduceRaw(beforeCrit * ctx.crit!.multiplier), type, criticalResist, modifiers) : 0)
    : mitigate(reduceRaw(raw), type, resist, modifiers);
  const before = target.spec.hooks?.beforeDamageTaken;
  if (before && mitigated > 0) runHook(() => before({ ...hookContext(world, target, undefined, source), amount: mitigated, damageType: type, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(source.petId !== undefined ? { petSource: true } : {}), ...(ctx.ability ? { ability: ctx.ability } : {}) }));
  const shields = target.statuses.filter((st) => st.kind === "shield");
  const views: Shield[] = shields.map((st) => ({
    amount: st.value,
    type: st.shieldType ?? "normal",
    endTick: st.endTick,
    ...(st.priority ? { priority: true } : {}),
  }));
  const unshielded = absorbWithShields(mitigated, type, views);
  shields.forEach((st, i) => {
    st.value = views[i]?.amount ?? 0;
  });
  target.statuses = target.statuses.filter((st) => st.kind !== "shield" || st.value > 0);
  target.totals.absorbed += mitigated - unshielded;
  // Riposte is a late damage immunity: shields are spent and vamp works before it negates
  // health damage (the committed Riposte notes). It also stops damage already in progress.
  const afterShield = target.spec.hooks?.modifyDamageAfterShields;
  const healthDamage = afterShield && unshielded > 0 ? Math.max(0, afterShield({ ...hookContext(world, target, undefined, source), amount: unshielded, damageType: type, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}), ...(source.petId !== undefined ? { petSource: true } : {}) })) : unshielded;
  const resolvedDamage = mitigated - unshielded + healthDamage;
  const left = stateStatus(target, "parry") ? 0 : healthDamage;
  // Sleep ends on any hit above 10 damage after mitigation, except damage over time.
  if (!ctx.persistent && resolvedDamage > 10 && target.statuses.some((st) => st.kind === "cc" && st.key === "sleep")) {
    target.statuses = target.statuses.filter((st) => st.kind !== "cc" || st.key !== "sleep");
    log(world, target.side, "wakes up");
  }
  const floor = stateStatus(target, "minimumHealth")?.value;
  const hpBefore = target.hp;
  target.hp -= left;
  if (floor !== undefined && target.hp < floor) target.hp = Math.min(hpBefore, floor);
  // Overkill doesn't count as damage dealt.
  const removed = Math.max(0, hpBefore) - Math.max(0, target.hp);
  target.totals.damageTaken += removed;
  source.totals.damageDealt += removed;
  log(world, source.side, `${ctx.ability ?? (ctx.attack ? "attack" : "effect")} deals ${Math.round(resolvedDamage)} ${type} damage${mitigated > unshielded ? ` (${Math.round(mitigated - unshielded)} absorbed)` : ""}${healthDamage > left ? " (parried)" : ""}`);
  if (target.hp <= 0) lethal(world, target, source);
  if ((ctx.appliesLifeSteal ?? ctx.attack) && !ctx.noLifeSteal && s.lifeSteal > 0) heal(world, source, resolvedDamage * s.lifeSteal, false, true);
  if (ctx.lifesteal) heal(world, source, resolvedDamage * ctx.lifesteal, false, true);
  const report = { amount: removed, absorbed: mitigated - unshielded, ...(source.petId !== undefined ? { petSource: true } : {}), mitigated: resolvedDamage, raw, damageType: type, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) };
  const taken = target.spec.hooks?.onDamageTaken;
  if (taken && mitigated > 0) runHook(() => taken({ ...hookContext(world, target, undefined, source), ...report }));
  const dealt = source.spec.hooks?.onDamageDealt;
  if (dealt && mitigated > 0) {
    runHook(() => dealt({ ...hookContext(world, source, undefined, target), ...report, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) }));
  }
  return removed;
}

/**
 * A unit brought to 0 health: its kit may keep it alive (onLethal), as Glory in Death and
 * Skaarl do. The hook runs whatever the hook nesting depth, since it only ever saves a unit.
 */
function lethal(world: World, unit: Unit, killer?: Unit): void {
  if (!unit.alive) return;
  const hook = unit.spec.hooks?.onLethal;
  if (hook && hook(hookContext(world, unit)) && unit.hp <= 0) throw new Error(`${unit.spec.name} kit: onLethal kept the unit alive without giving it health`);
  if (killer && (unit.hp <= 0 || unit.fallen)) notifyKill(world, killer, unit);
}

/** First counted champion death or an actual enemy pet kill; expiry is not a kill. */
export function notifyKill(world: World, killer: Unit, victim: Unit | Pet): void {
  if ("side" in victim) {
    if (victim.side === killer.side || victim.deathNotified) return;
    victim.deathNotified = true;
  } else {
    if (victim.owner === killer.side || victim.memory["engine:killNotified"]) return;
    victim.memory["engine:killNotified"] = true;
  }
  const credited = killer.petId === undefined ? killer : world.units[killer.side];
  const hook = credited.spec.hooks?.onKill;
  // Deduplication above bounds kill callbacks; a legitimate chained kill must not
  // disappear merely because its lethal packet was nested inside another hook.
  if (hook) hook({ ...hookContext(world, credited, undefined, "side" in victim ? victim : undefined), victim, ...("side" in victim ? {} : { pet: victim }) });
}

/** Attackable resurrection preserves an existing cast but forbids future declarations. */
export function beginResurrection(world: World, unit: Unit, options: { duration: number; armor?: number; mr?: number; ability?: string }): boolean {
  if (!unit.alive || unit.resurrection || unit.deathDefied || !(options.duration > 0)) return false;
  const endTick = world.tick + toTicks(options.duration);
  const action = unit.action;
  if (action?.kind === "channel") {
    const ability = abilityOf(unit, action.ability);
    unit.action = undefined;
    if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "resurrection" });
  } else if (action?.kind === "dash") {
    unit.action = action.resume;
    notifyDashEnd(world, unit, action.ability, true);
  } else if (action?.kind === "windup") unit.action = undefined;
  delete unit.pendingAttack;
  delete unit.forced;
  delete unit.attached;
  unit.move = 0;
  unit.moved = 0;
  // Hostile CC and periodic debuffs dispel; self buffs and ordinary shields persist.
  unit.statuses = unit.statuses.filter((status) => status.source === unit.side || !["cc", "dot", "mark", "grievousWounds", "stat"].includes(status.kind));
  unit.resurrection = { endTick, ...(options.ability ? { ability: options.ability } : {}) };
  const tag = "engine:resurrection";
  for (const key of ["noMovement", "noAttacks"] as const) addStatus(unit, { kind: "state", key, source: unit.side, startTick: world.tick, endTick, value: 0, ability: tag });
  for (const [key, value] of [["armor", options.armor ?? 0], ["MR", options.mr ?? 0]] as const) if (value) addStatus(unit, { kind: "stat", key, source: unit.side, startTick: world.tick, endTick, value, ability: tag });
  unit.hp = derive(unit).maxHp;
  const observer = world.units[other(unit.side)];
  observer.spec.hooks?.onTargetResurrection?.({ ...hookContext(world, observer, undefined, unit), target: unit });
  log(world, unit.side, "begins attackable resurrection");
  return true;
}

/** A counted death with a finite window for spells, without movement or attacks. */
export function beginDeathDefied(world: World, unit: Unit, options: { duration: number; ability?: string }): boolean {
  if (!unit.alive || unit.resurrection || unit.deathDefied || unit.fallen || !(options.duration > 0)) return false;
  const action = unit.action;
  unit.action = undefined;
  if (action?.kind === "channel") { const ability = abilityOf(unit, action.ability); if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "death" }); }
  if (action?.kind === "dash") notifyDashEnd(world, unit, action.ability, true);
  delete unit.pendingAttack; delete unit.forced; delete unit.attached;
  unit.move = 0; unit.moved = 0;
  unit.statuses = [];
  const endTick = world.tick + toTicks(options.duration);
  unit.deathDefied = { endTick, ...(options.ability ? { ability: options.ability } : {}) };
  unit.fallen = true;
  unit.hp = 1;
  // Direct statuses retain already-launched inbound projectiles; they expire normally.
  for (const key of ["untargetable", "invulnerable", "ccImmune", "noMovement", "noAttacks"] as const) addStatus(unit, { kind: "state", key, source: unit.side, startTick: world.tick, endTick, value: 0, ability: "engine:deathDefied" });
  log(world, unit.side, "continues casting after death");
  return true;
}

/** Guarded zero-duration ejection, used only when source timing is explicitly unquantified. */
export function immediateDisplace(world: World, source: Unit, target: Unit, delta: number, ability?: string): boolean {
  if (!target.alive || inStasis(target) || isUntargetable(target, source)) return false;
  target.spec.hooks?.onCCAttempt?.({ ...hookContext(world, target, undefined, source), cc: "airborne", source, ...(ability ? { ability } : {}) });
  if (ccImmuneTo(target, source) || hasState(target, "displacementImmune") || blackShieldProtected(world, target) || negateImmobilization(world, target)) return false;
  interrupt(world, target, "airborne");
  target.x += terrainLimit(world, target, delta, false);
  target.spec.hooks?.onCCApplied?.({ ...hookContext(world, target, undefined, source), cc: "airborne", source, ...(ability ? { ability } : {}) });
  return true;
}

/**
 * Heals a unit; Grievous Wounds cuts healing and health regeneration alike. A unit brought to
 * 0 health this tick is dying and can't be healed back. Units under "noHealing" (Glory in
 * Death) are healed only by life steal and omnivamp (`lifesteal`).
 */
export function heal(world: World, unit: Unit, amount: number, regeneration = false, lifesteal = false): void {
  if (!unit.alive || unit.hp <= 0 || amount <= 0) return;
  if (!lifesteal && hasState(unit, "noHealing")) return;
  const grievous = unit.statuses.some((s) => s.kind === "grievousWounds");
  const d = derive(unit);
  const cap = stateStatus(unit, "healthCap");
  const most = cap ? Math.min(d.maxHp, cap.value * d.maxHp) : d.maxHp;
  const healed = Math.min(most - unit.hp, healingReceived(amount * (1 + d.healingIncrease), grievous));
  if (healed <= 0) return;
  unit.hp += healed;
  if (regeneration) return;
  unit.totals.healing += healed;
  log(world, unit.side, `heals ${Math.round(healed)}`);
}

// ---------------------------------------------------------------------------------------
// Crowd control

/** Ends the target's windup, channel or dash when new crowd control stops it. */
function interrupt(world: World, unit: Unit, type: CCType): void {
  const rule = CC_RULES[type];
  const stopsAttack = rule.attacking === "disabled" || (rule.attacking === "uncontrollable" && type !== "taunt" && type !== "berserk");
  const pending = unit.pendingAttack;
  if (pending && stopsAttack && (!pending.uncancellable || type === "polymorph")) {
    delete unit.pendingAttack;
    log(world, unit.side, `pending attack windup interrupted by ${type}`);
  }
  const action = unit.action;
  if (!action) return;
  if (action.kind === "windup") {
    // Taunt and berserk spare windups against their target, which in a duel is every windup.
    const stops = rule.attacking === "disabled" || (rule.attacking === "uncontrollable" && type !== "taunt" && type !== "berserk");
    // Uncancellable windups survive everything but polymorph (and death).
    if (stops && (!action.uncancellable || type === "polymorph")) {
      unit.action = undefined;
      log(world, unit.side, `attack windup interrupted by ${type}`);
    }
  } else if (action.kind === "channel") {
    const ability = abilityOf(unit, action.ability);
    const moves = ability?.delivery.kind === "dash" || ability?.delivery.kind === "blink";
    const stops = rule.interruptsChannels === "yes" || (rule.interruptsChannels === "movement" && moves);
    if (stops && ability?.channel?.interruptible !== false) {
      unit.action = undefined;
      if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "cc", cc: type });
      log(world, unit.side, `${ability?.name ?? "channel"} interrupted by ${type}`);
    }
  } else if (action.kind === "cast") {
    // A charge (Decimating Smash) breaks like a channel: its cost is spent and a short cooldown follows.
    const ability = abilityOf(unit, action.ability);
    if (ability?.failCastOnCC?.includes(type)) unit.memory[`failedCast:${ability.key}`] = true;
    if (ability?.interruptible && rule.interruptsChannels === "yes") {
      unit.action = undefined;
      const cost = action.cost ?? ability.costFor?.(unit, ability) ?? (typeof ability.cost === "object" ? evaluate(ability.cost, unit) : (ability.cost ?? 0));
      if (ability.costType === "health") unit.hp -= cost;
      else unit.resource -= cost;
      if (ability.interruptible.cooldown !== undefined) unit.cooldownReady[cooldownKeyOf(ability)] = world.tick + toTicks(ability.interruptible.cooldown);
      log(world, unit.side, `${ability.name} interrupted by ${type}`);
    }
  } else if (action.kind === "dash" && abilityOf(unit, action.ability)?.interruptible && rule.interruptsChannels !== "no") {
    // A charge that crowd control stops (Ixtal's Impact).
    unit.action = action.resume;
    notifyDashEnd(world, unit, action.ability, true);
    log(world, unit.side, `${abilityOf(unit, action.ability)?.name ?? "dash"} interrupted by ${type}`);
  } else if (action.kind === "dash" && type === "airborne" && !action.unstoppable) {
    // A cast the dash was made during carries on: cast times can't be interrupted.
    unit.action = action.resume;
    notifyDashEnd(world, unit, action.ability, true);
    log(world, unit.side, "dash knocked down");
  }
}

/** Applies crowd control unless an immunity stops it; returns whether it took hold. */
function ccImmuneTo(target: Unit, source: Unit): boolean {
  return target.statuses.some((status) => status.kind === "state" && status.key === "ccImmune" && (!status.hostileOnly || source.side !== target.side));
}

export function applyCC(world: World, source: Unit, target: Unit, type: CCType, duration: number, strength = 0, sticky = false, ability?: string, bypassSlowImmune = false): boolean {
  if (!target.alive || inStasis(target)) return false;
  if (!isUntargetable(target, source)) target.spec.hooks?.onCCAttempt?.({ ...hookContext(world, target, undefined, source), cc: type, source, ...(ability ? { ability } : {}) });
  if (ccImmuneTo(target, source)) {
    log(world, target.side, `is immune to ${type}`);
    return false;
  }
  if (type !== "nearsight" && blackShieldProtected(world, target)) return false;
  if (DISPLACEMENTS.has(type) && hasState(target, "displacementImmune")) return false;
  // Slow immunity prevents the slow component of drowsy, but not sleep or a separate
  // attack-speed reduction (wiki: "Slow resist", separate slow/cripple immunity lists).
  if ((type === "slow" || type === "drowsy") && hasState(target, "slowImmune") && !bypassSlowImmune) return false;
  if (type === "cripple" && hasState(target, "crippleImmune")) return false;
  if (IMMOBILIZING.has(type) && negateImmobilization(world, target)) {
    log(world, target.side, `negates ${type}`);
    return false;
  }
  const ticks = toTicks(ccDuration(duration, type, derive(target).tenacity));
  if (ticks <= 0) return false;
  // Topping up crowd control that is still on (a field's slow, pulse after pulse) isn't logged again.
  const ongoing = target.statuses.some((s) => s.kind === "cc" && s.key === type && s.source === source.side && s.value === strength && s.endTick > world.tick);
  addStatus(target, { kind: "cc", key: type, source: source.side, startTick: world.tick, endTick: world.tick + ticks, value: strength, ...(sticky ? { sticky } : {}), ...(ability ? { ability } : {}), ...(bypassSlowImmune ? { bypassSlowImmune: true } : {}) });
  const shown = type === "nearsight" ? ` to ${Math.round(strength)} units` : strength ? ` ${Math.round(strength * 100)}%` : "";
  if (!ongoing) log(world, source.side, `inflicts ${type}${shown} for ${(ticks / 30).toFixed(2)} s`);
  interrupt(world, target, type);
  target.spec.hooks?.onCCApplied?.({ ...hookContext(world, target, undefined, source), cc: type, source, ...(ability ? { ability } : {}) });
  return true;
}

/**
 * Knock ups, knock backs and pulls: airborne, plus forced movement while it lasts. With walls
 * nearby, a knock back that reaches the wall behind the target stops there and stuns it.
 */
function displace(world: World, source: Unit, target: Unit, effect: Extract<Effect, { type: "displace" }>): void {
  const { direction, duration } = effect;
  const originX = effect.originX ?? source.x;
  if (!applyCC(world, source, target, "airborne", effect.airborneDuration ?? duration)) return;
  // Vault's recorded exception: its knockback even interrupts uncancellable windups.
  // Other displacements continue to respect the windup's ordinary protection.
  if (effect.interruptUncancellable && target.action?.kind === "windup") {
    target.action = undefined;
    target.attackReadyTick = world.tick;
    log(world, target.side, "uncancellable attack windup interrupted by displacement");
  }
  if (effect.interruptUncancellable && target.pendingAttack) {
    delete target.pendingAttack;
    target.attackReadyTick = world.tick;
    log(world, target.side, "pending uncancellable attack windup interrupted by displacement");
  }
  const ticks = Math.max(1, toTicks(duration));
  if (effect.over) {
    // Over the caster to the far side: along the line, through the caster and any terrain.
    const toward = target.x === source.x ? (target.side === 0 ? 1 : -1) : source.x > target.x ? 1 : -1;
    if (effect.distance > 0) target.forced = { endTick: world.tick + ticks, perTick: (toward * effect.distance) / ticks, over: true };
    return;
  }
  const env = world.settings.environment;
  // The wall behind the target: the lane's, with walls nearby, or terrain an ability raised.
  const away = effect.originX !== undefined && target.x === originX ? 0 : target.x === originX ? (target.side === 0 ? -1 : 1) : target.x > originX ? 1 : -1;
  const wallAt = away === 0 ? Number.POSITIVE_INFINITY : Math.min(env.walls ? env.wallDistance : Number.POSITIVE_INFINITY, terrainGap(world, target, away));
  const intoWall = (effect.wallStun !== undefined || effect.stopAtWall) && direction === "away" && effect.distance >= wallAt;
  let distance = intoWall ? wallAt : effect.distance;
  if (effect.to !== undefined) distance = Math.max(0, Math.min(distance, Math.abs(target.x - originX) - effect.to));
  const impact = intoWall ? Math.max(1, Math.ceil(ticks * distance / Math.max(effect.distance, 1e-6) - 1e-6)) : ticks;
  if (distance > 0) target.forced = { endTick: world.tick + impact, perTick: ((direction === "away" ? 1 : -1) * (effect.originX === undefined ? 1 : away) * (intoWall ? effect.distance : distance)) / ticks, ...(effect.originX !== undefined ? { absolute: true } : {}), ...(intoWall ? { remaining: distance } : {}) };
  if (intoWall && effect.wallStun !== undefined) {
    const effects: Effect[] = [...(effect.wallEffects ?? []), { type: "cc", cc: "stun", duration: effect.wallStun }];
    world.scheduled.push({ tick: world.tick + impact, owner: source.side, target: target.side, effects, scale: 1 });
    log(world, source.side, "knocks the target into a wall");
  }
}

// ---------------------------------------------------------------------------------------
// Effects

export interface HitContext {
  ability?: AbilitySpec;
  attack?: boolean;
  /** Share of damage that counts, for skillshots resolved by expected value. */
  scale: number;
  /** Nested caster effects retain the original victim for target-stat formula references. */
  formulaTarget?: Unit;
  /** The declaring attack's critical chance, for attached critical effects. */
  critChance?: number;
}

/**
 * Becoming untargetable drops every attack and targeted spell aimed at the unit; becoming
 * invisible drops those still being wound up or cast, but not missiles already on their way.
 */
function dropTargeting(world: World, unit: Unit, missiles = true): void {
  const enemy = world.units[other(unit.side)];
  const stasis = inStasis(unit);
  if (missiles) world.missiles = world.missiles.filter((m) => !(m.owner === enemy.side && m.homing && (!m.hitsUntargetable || stasis)));
  const action = enemy.action;
  if (action?.kind === "windup" && (!action.hitsUntargetable || stasis)) {
    // The attack is lost and the attack timer resets, as with any cancelled windup.
    enemy.action = undefined;
    enemy.attackReadyTick = world.tick;
  }
  if (enemy.pendingAttack && (!enemy.pendingAttack.hitsUntargetable || stasis)) {
    delete enemy.pendingAttack;
    enemy.attackReadyTick = world.tick;
  }
  if (action?.kind === "cast") {
    const ability = abilityOf(enemy, action.ability);
    // A targeted spell whose target vanishes during its cast time is cancelled without a cooldown.
    if (ability?.delivery.kind === "target" && !ability.retainTargetOnInvalidation && !(ability.retainTargetOnVisibilityLoss && !missiles)) enemy.action = undefined;
  }
}

export function applyEffect(world: World, caster: Unit, target: Unit, effect: Effect, ctx: HitContext): boolean | void {
  if (target.petId !== undefined && effect.type !== "damage") {
    const pet = world.pets.find((candidate) => candidate.id === target.petId);
    if (!pet) return false;
    petEffects(world, caster, pet, [effect], ctx.attack ? "basic" : "singleTarget", ctx.ability?.name, ctx.scale);
    target.hp = pet.hp;
    target.alive = pet.hp > 0;
    target.statuses = pet.statuses ?? [];
    return;
  }
  const tick = world.tick;
  const formulaTarget = ctx.formulaTarget ?? target;
  switch (effect.type) {
    case "damage": {
      const d = derive(caster);
      const amount = Math.max(effect.amountFor?.(caster, formulaTarget) ?? evaluate(effect.amount, caster, formulaTarget, ctx.critChance), effect.minimum ? evaluate(effect.minimum, caster, formulaTarget, ctx.critChance) : 0);
      dealDamage(world, caster, target, amount * ctx.scale, effect.damageType, {
        ...(effect.canCrit ? { crit: { chance: ctx.critChance ?? d.critChance, multiplier: effect.critMultiplier ?? d.critDamage } } : {}),
        ...(ctx.attack ? { attack: true } : {}),
        ...(ctx.ability?.flags?.appliesLifeSteal ? { appliesLifeSteal: true } : {}),
        ...(effect.label || ctx.ability ? { ability: effect.label ?? ctx.ability?.name } : {}),
        ...(effect.lifesteal ? { lifesteal: effect.lifesteal } : {}),
        ...(effect.noLifeSteal ? { noLifeSteal: true } : {}),
        ...(effect.persistent ? { persistent: true } : {}),
        ...(effect.petDamageCategory ? { petDamageCategory: effect.petDamageCategory } : {}),
      });
      return;
    }
    case "cc": {
      // Some empowered attacks retain their damage through a spell shield while just the
      // debuff is negated (Decisive Strike); ordinary attack on-hit effects don't consume it.
      const spellShield = effect.spellShield ? stateStatus(target, "spellShield") : undefined;
      if (spellShield) {
        spellShield.charges = (spellShield.charges ?? 1) - 1;
        if (spellShield.charges <= 0) target.statuses = target.statuses.filter((s) => s !== spellShield);
        log(world, target.side, `spell shield blocks ${ctx.ability?.name ?? effect.cc}`);
        return false;
      }
      return applyCC(world, caster, target, effect.cc, effect.duration, effect.strength ?? 0, effect.sticky, ctx.ability?.key, effect.bypassSlowImmune);
    }
    case "disrupt": {
      if (!target.alive || isUntargetable(target, caster) || inStasis(target) || ccImmuneTo(target, caster) || blackShieldProtected(world, target)) return false;
      interrupt(world, target, "silence");
      return true;
    }
    case "knockdown": {
      if (!target.alive || isUntargetable(target, caster) || inStasis(target) || ccImmuneTo(target, caster) || hasState(target, "displacementImmune") || blackShieldProtected(world, target)) return false;
      const action = target.action;
      if (action?.kind === "dash" && !action.unstoppable) {
        if (negateImmobilization(world, target)) return false;
        target.action = action.resume;
        notifyDashEnd(world, target, action.ability, true);
        log(world, target.side, "dash knocked down");
      }
      return true;
    }
    case "displace":
      displace(world, caster, target, effect);
      return;
    case "shield":
      addStatus(target, {
        kind: "shield",
        key: ctx.ability?.key ?? "shield",
        source: caster.side,
        startTick: tick,
        endTick: tick + toTicks(effect.duration),
        value: evaluate(effect.amount, caster, formulaTarget),
        shieldType: effect.shieldType ?? "normal",
        ...(effect.priority ? { priority: true } : {}),
        ...(effect.blackShield ? { blackShield: true } : {}),
      });
      return;
    case "heal":
      heal(world, target, evaluate(effect.amount, caster, formulaTarget) * ctx.scale);
      return;
    case "state":
      addStatus(target, {
        kind: "state",
        key: effect.state,
        source: caster.side,
        startTick: tick,
        endTick: tick + toTicks(effect.duration),
        value: effect.value ?? 0,
        ...(effect.charges ? { charges: effect.charges } : {}),
        ...(effect.effects ? { effects: effect.effects } : {}),
        ...(effect.tenacityGroup ? { tenacityGroup: effect.tenacityGroup } : {}),
        ...(effect.hostileOnly ? { hostileOnly: true } : {}),
        ...(effect.revealWhileCC ? { revealWhileCC: effect.revealWhileCC } : {}),
        ...(ctx.ability ? { ability: ctx.ability.key } : {}),
        x: target.x,
      });
      if (effect.state === "untargetable" || effect.state === "stasis") dropTargeting(world, target);
      if (effect.state === "healthCap") target.hp = Math.min(target.hp, (effect.value ?? 1) * derive(target).maxHp);
      if (effect.state === "invisible") dropTargeting(world, target, false);
      return;
    case "stat": {
      const value = evaluate(effect.amount, caster, formulaTarget);
      // The same ability's buff or debuff refreshes instead of stacking.
      const memoKey = `${ctx.ability?.key ?? (ctx.attack ? "attack" : "effect")}:${effect.stat}`;
      if (target.statuses.some((s) => s.kind === "stat" && s.source === caster.side && s.memoKey === memoKey)) {
        target.statuses = target.statuses.filter((s) => !(s.kind === "stat" && s.source === caster.side && s.memoKey === memoKey));
      }
      addStatus(target, { kind: "stat", key: effect.stat, source: caster.side, startTick: tick, endTick: tick + toTicks(effect.duration), value, memoKey });
      // Gaining maximum health heals by the same amount.
      if (effect.stat === "health" && value > 0) target.hp += value;
      return;
    }
    case "dot": {
      const intervalTicks = Math.max(1, toTicks(effect.interval));
      const hits = Math.max(1, Math.round(effect.duration / effect.interval));
      const source = ctx.ability?.key ?? (ctx.attack ? "attack" : "dot");
      const key = effect.stacks ? `${source}:${world.nextId++}` : source;
      // A new application from the same source refreshes the old one (poisons, bleeds),
      // keeping its tick timer, unless they stack.
      const old = effect.stacks ? undefined : target.statuses.find((st) => st.kind === "dot" && st.source === caster.side && st.key === key);
      if (old) target.statuses = target.statuses.filter((st) => st !== old);
      const first = old?.dot && old.dot.nextTick > tick ? old.dot.nextTick : tick + intervalTicks;
      addStatus(target, {
        kind: "dot",
        key,
        source: caster.side,
        startTick: tick,
        endTick: first + intervalTicks * (hits - 1),
        value: 0,
        dot: {
          damageType: effect.damageType,
          perHit: (evaluate(effect.total, caster, formulaTarget) * ctx.scale) / hits,
          intervalTicks,
          nextTick: first,
          ...(effect.label || ctx.ability ? { label: effect.label ?? ctx.ability?.name } : {}),
        },
      });
      return;
    }
    case "grievousWounds":
      addStatus(target, { kind: "grievousWounds", key: "grievousWounds", source: caster.side, startTick: tick, endTick: tick + toTicks(effect.duration), value: 0.4 });
      return;
    case "cleanse": {
      const removable = (s: Status) =>
        (effect.types ? effect.types.includes(s.key as CCType) : s.key !== "stasis" && s.key !== "kinematics") && (!s.sticky || effect.sticky === true);
      const before = target.statuses.length;
      target.statuses = target.statuses.filter((s) => s.kind !== "cc" || !removable(s));
      if (target.statuses.length < before) {
        if (!target.statuses.some((s) => s.kind === "cc" && s.key === "airborne")) delete target.forced;
        log(world, target.side, "cleanses crowd control");
      }
      return;
    }
    case "empower":
      addStatus(target, {
        kind: "empower",
        key: ctx.ability?.key ?? "empower",
        source: caster.side,
        startTick: tick,
        endTick: tick + toTicks(effect.window),
        value: 0,
        empower: {
          attacks: effect.attacks,
          onHit: effect.onHit,
          bonusRange: effect.bonusRange ?? 0,
          uncancellable: effect.uncancellable ?? false,
          ...(effect.hitsUntargetable ? { hitsUntargetable: true } : {}),
          ...(effect.spellShield ? { spellShield: true } : {}),
          ...(effect.spellShieldOnHit ? { spellShieldOnHit: true } : {}),
          ...(effect.attackOnHitReplacement ? { attackOnHitReplacement: effect.attackOnHitReplacement } : {}),
          ...(effect.breakShields ? { breakShields: true } : {}),
          ...(effect.split ? { split: effect.split } : {}),
          ...(effect.windup !== undefined ? { windup: effect.windup } : {}),
        },
      });
      if (effect.resetAttack) target.attackReadyTick = tick;
      return;
    case "resetAttack":
      target.attackReadyTick = tick;
      return;
    case "execute": {
      const threshold = evaluate(effect.threshold, caster, formulaTarget);
      if (!target.alive || target.hp > threshold) return;
      if (hasState(target, "invulnerable") || inStasis(target)) return;
      // Executes leave units under a minimum health threshold at that threshold (wiki: "Minimum health threshold").
      const protectedFloor = stateStatus(target, "minimumHealth");
      const floor = protectedFloor ? Math.min(protectedFloor.value, Math.max(0, effect.minimumHealthFloor ?? protectedFloor.value)) : 0;
      const removed = Math.max(0, target.hp - floor);
      target.totals.damageTaken += removed;
      caster.totals.damageDealt += removed;
      target.hp = Math.min(target.hp, floor);
      log(world, caster.side, floor === 0 ? "executes" : "execute stopped by a minimum health threshold");
      if (target.hp <= 0) lethal(world, target, caster);
      return;
    }
    case "resource":
      target.resource = Math.max(0, Math.min(derive(target).maxResource, target.resource + evaluate(effect.amount, caster, formulaTarget)));
      return;
    case "refund": {
      const ready = caster.cooldownReady[effect.ability] ?? 0;
      if (ready === Number.POSITIVE_INFINITY) {
        // Held until its effect is over: the cut comes off when it starts (releaseCooldowns).
        const pending = caster.pendingRefunds[effect.ability] ?? { seconds: 0, fraction: 0 };
        caster.pendingRefunds[effect.ability] = { seconds: pending.seconds + (effect.seconds ?? 0), fraction: pending.fraction + (effect.fraction ?? 0) };
        return;
      }
      const left = Math.max(0, ready - tick);
      const spec = abilityOf(caster, effect.ability);
      const whole = effect.total && spec ? toTicks(cooldownAfterHaste(spec.cooldownFor?.(caster) ?? spec.cooldown, spec.staticCooldown ? 0 : derive(caster).abilityHaste)) : left;
      const cut = (effect.seconds !== undefined ? toTicks(effect.seconds) : 0) + Math.round(whole * (effect.fraction ?? 0));
      if (left > 0) caster.cooldownReady[effect.ability] = tick + Math.max(0, left - cut);
      return;
    }
    case "caster":
      for (const inner of effect.effects) applyEffect(world, caster, caster, inner, { ...ctx, formulaTarget });
      return;
    case "mark":
      target.statuses = target.statuses.filter((s) => s.kind !== "mark" || s.key !== effect.key);
      addStatus(target, { kind: "mark", key: effect.key, source: caster.side, startTick: tick, endTick: tick + toTicks(effect.duration), value: effect.value ?? 0 });
      return;
    case "delayed":
      world.scheduled.push({
        tick: tick + Math.max(1, toTicks(effect.delay)),
        owner: caster.side,
        target: target.side,
        effects: effect.effects,
        ...(ctx.ability ? { ability: ctx.ability.key } : {}),
        scale: ctx.scale,
      });
      return;
    case "reposition": {
      const enemy = world.units[other(target.side)];
      const away = target.x === enemy.x ? (target.side === 0 ? -1 : 1) : target.x > enemy.x ? 1 : -1;
      const gap = Math.abs(target.x - enemy.x) - target.spec.base.pathingRadius - enemy.spec.base.pathingRadius;
      target.x += effect.direction === "away" ? away * effect.distance : -away * Math.min(effect.distance, Math.max(0, gap));
      log(world, target.side, `reappears ${effect.direction === "away" ? `${Math.round(effect.distance)} units away` : "beside the enemy"}`);
      return;
    }
    case "attach":
      target.attached = { offset: effect.offset, dir: target.x === caster.x ? (target.side === 0 ? -1 : 1) : target.x > caster.x ? 1 : -1, endTick: tick + toTicks(effect.duration) };
      return;
    case "projectileWall": {
      const enemy = world.units[other(caster.side)];
      world.zones.push({
        id: world.nextId++,
        owner: caster.side,
        kind: "projectileWall",
        seenTick: tick,
        x: caster.x + directionTo(caster, enemy) * effect.distance,
        radius: 0,
        startTick: tick,
        endTick: tick + toTicks(effect.duration),
      });
      return;
    }
  }
}

function negates(effect: Effect): boolean {
  return effect.type !== "heal" && effect.type !== "shield";
}

function immobilizes(effect: Effect): boolean {
  return (effect.type === "cc" && IMMOBILIZING.has(effect.cc)) || effect.type === "displace";
}

/** Riposte itself must negate an immobilize; an independent immunity doesn't empower it. */
function reportParry(world: World, source: Unit, target: Unit, effects: Effect[]): void {
  const onParry = target.spec.hooks?.onParry;
  if (!onParry) return;
  const immobilizing = !ccImmuneTo(target, source) && !stateStatus(target, "ccNegate") && effects.some((effect) =>
    immobilizes(effect) && !(effect.type === "displace" && hasState(target, "displacementImmune")),
  );
  runHook(() => onParry({ ...hookContext(world, target, undefined, source), immobilizing }));
}

/** An ability's effects reaching the enemy, after spell shields, parries, dodges and blocks. */
export function abilityHit(world: World, caster: Unit, target: Unit, ability: AbilitySpec, effects: Effect[], scale = 1): void {
  if (!target.alive || effects.length === 0) return;
  if (isUntargetable(target, caster)) {
    log(world, target.side, `is untargetable: ${ability.name} misses`);
    return;
  }
  const defense = stateStatus(target, "parry") ? "parry"
    : stateStatus(target, "spellShield") && ability.flags?.spellShield !== false ? "spellShield"
      : ability.flags?.parry && hasState(target, "dodgeAttacks") ? "dodge"
        : ability.flags?.parry && hasState(target, "blockAttacks") ? "block"
          : ability.flags?.blockedByDisplacementImmunity && hasState(target, "displacementImmune") ? "immunity" : undefined;
  const contact = caster.spec.hooks?.onAbilityContact;
  if (contact) runHook(() => {
    const replacement = contact({ ...hookContext(world, caster, ability), effects, scale, ...(defense ? { defense } : {}) });
    if (replacement) effects = replacement;
  });
  if (effects.length === 0) return;
  return withBlackShieldPacket(world, target, () => {
  // Riposte takes priority over spell shields and negates debuffs, but its damage immunity
  // happens after shields and vamp. Its shock, rather than the incoming spell, applies stun.
  if (stateStatus(target, "parry")) {
    log(world, target.side, `parries ${ability.name}`);
    reportParry(world, caster, target, effects);
    for (const effect of effects) if (effect.type === "damage") applyEffect(world, caster, target, effect, { ability, scale });
    if (ability.flags?.appliesOnHit) applyOnHit(world, caster, target, [], false, scale * (ability.onHitScale ?? 1), true);
    return;
  }
  const spellShield = stateStatus(target, "spellShield");
  if (spellShield && ability.flags?.spellShield !== false) {
    spellShield.charges = (spellShield.charges ?? 1) - 1;
    if (spellShield.charges <= 0) target.statuses = target.statuses.filter((s) => s !== spellShield);
    log(world, target.side, `spell shield blocks ${ability.name}`);
    return;
  }
  const dodged = ability.flags?.parry === true && hasState(target, "dodgeAttacks");
  if (dodged) {
      log(world, target.side, `dodges ${ability.name}`);
      const avoided = target.spec.hooks?.onAttackAvoided;
      if (avoided) runHook(() => avoided(hookContext(world, target)));
      if (!ability.flags?.dodgeKeepsEffects) return;
  }
  const blocked = dodged || (ability.flags?.parry === true && hasState(target, "blockAttacks"));
  if (ability.flags?.blockedByDisplacementImmunity && hasState(target, "displacementImmune")) return;
  const before = caster.spec.hooks?.beforeAbilityHit;
  if (before) runHook(() => before({ ...hookContext(world, caster, ability), effects, scale }));
  const avoided = target.spec.hooks?.onAttackAvoided;
  if (blocked && !dodged && avoided) runHook(() => avoided(hookContext(world, target)));
  const falloff = ability.falloff ? falloffShare(world, target, ability.falloff) : 1;
  for (const effect of effects) {
    if (blocked && effect.type === "damage") continue;
    if (!target.alive && negates(effect)) continue;
    const share = effect.type === "damage" || effect.type === "dot" ? falloff : 1;
    const applied = applyEffect(world, caster, target, effect, { ability, scale: scale * share });
    if (effect.type === "cc" && ability.flags?.requiresCC === effect.cc && applied !== true) return;
  }
  if (ability.falloff) {
    // Each hit counts toward the next ones' falloff for the window, by its share.
    const { group, window } = ability.falloff;
    addStatus(target, { kind: "mark", key: `falloff:${group}:${world.nextId++}`, source: caster.side, startTick: world.tick, endTick: world.tick + toTicks(window), value: scale });
  }
  if (ability.flags?.appliesOnHit) applyOnHit(world, caster, target, [], blocked, scale * (ability.onHitScale ?? 1), false, undefined, ability, dodged);
  const onAbilityHit = caster.spec.hooks?.onAbilityHit;
  if (onAbilityHit) runHook(() => onAbilityHit({ ...hookContext(world, caster, ability), scale }));
  });
}

/** The share of its damage a hit with falloff deals: less for each hit of its group the target took within the window. */
function falloffShare(world: World, target: Unit, falloff: NonNullable<AbilitySpec["falloff"]>): number {
  const prefix = `falloff:${falloff.group}:`;
  const recent = target.statuses.reduce((sum, s) => (s.kind === "mark" && s.key.startsWith(prefix) && s.endTick > world.tick ? sum + s.value : sum), 0);
  return Math.max(falloff.floor, 1 - falloff.per * recent);
}

function applyOnHit(world: World, attacker: Unit, target: Unit, bonus: Effect[], blocked: boolean, scale = 1, parried = false, critChance?: number, ability?: AbilitySpec, missed = false, replacement?: Effect[]): void {
  for (const effect of [...(replacement ?? attacker.spec.attack.onHit ?? []), ...bonus]) {
    if (blocked && (effect.type === "damage" || attacker.spec.attack.blockStopsOnHit)) continue;
    if (parried && effect.type !== "damage") continue;
    applyEffect(world, attacker, target, effect, { attack: true, scale, ...(critChance !== undefined ? { critChance } : {}) });
  }
  if (!parried && !missed) notifyIncomingOnHit(world, target, ability, attacker);
}

export function notifyIncomingOnHit(world: World, target: Unit, ability?: AbilitySpec, attacker?: Unit): void {
  const incoming = target.spec.hooks?.onIncomingOnHit;
  if (incoming) runHook(() => incoming({ ...hookContext(world, target, undefined, attacker), attack: ability === undefined, ...(ability ? { ability: ability.name } : {}) }));
}

/** A basic attack reaching its target; `split` deals its damage as shares of physical, magic and true damage. */
export function attackHit(world: World, attacker: Unit, target: Unit, blinded: boolean, bonusOnHit: Effect[], split?: AttackSplit, hitsUntargetable = false, options: AttackHitOptions = {}): void {
  if (!target.alive || inStasis(target) || (!hitsUntargetable && isUntargetable(target, attacker))) return;
  const critChance = Math.min(1, Math.max(0, options.critChance ?? derive(attacker).critChance));
  const resolved = (blocked: boolean, missed: boolean) => {
    const hook = attacker.spec.hooks?.onAttackResolved;
    if (hook) runHook(() => hook({ ...hookContext(world, attacker, undefined, target), blocked, missed }));
  };
  if (blinded) {
    log(world, attacker.side, "attack misses (blinded)");
    resolved(false, true);
    return;
  }
  const avoided = target.spec.hooks?.onAttackAvoided;
  if (hasState(target, "dodgeAttacks")) {
    log(world, target.side, "dodges the attack");
    if (avoided) runHook(() => avoided(hookContext(world, target, undefined, attacker)));
    resolved(false, true);
    return;
  }
  const parried = !!stateStatus(target, "parry");
  if (!parried && options.breakShields) target.statuses = target.statuses.filter((status) => status.kind !== "shield");
  const spellShield = !parried && options.spellShield ? stateStatus(target, "spellShield") : undefined;
  if (spellShield) {
    spellShield.charges = (spellShield.charges ?? 1) - 1;
    if (spellShield.charges <= 0) target.statuses = target.statuses.filter((status) => status !== spellShield);
    log(world, target.side, "spell shield blocks the empowered attack");
    resolved(true, false);
    return;
  }
  const onHitShield = !parried && options.spellShieldOnHit ? stateStatus(target, "spellShield") : undefined;
  if (onHitShield) {
    onHitShield.charges = (onHitShield.charges ?? 1) - 1;
    if (onHitShield.charges <= 0) target.statuses = target.statuses.filter((status) => status !== onHitShield);
    log(world, target.side, "spell shield blocks the empowered on-hit packet");
    bonusOnHit = [];
  }
  return withBlackShieldPacket(world, target, () => {
  if (parried) {
    log(world, target.side, "parries the attack");
    reportParry(world, attacker, target, [...(attacker.spec.attack.onHit ?? []), ...bonusOnHit]);
    if (avoided) runHook(() => avoided(hookContext(world, target, undefined, attacker)));
  }
  const blocked = !parried && hasState(target, "blockAttacks");
  if (blocked) {
    log(world, target.side, "blocks the attack's damage");
    if (avoided) runHook(() => avoided(hookContext(world, target, undefined, attacker)));
  }
  else {
    const d = derive(attacker);
    const damage = d.ad;
    const crit = { chance: critChance, multiplier: d.critDamage };
    if (split) {
      if (split.physical > 0) dealDamage(world, attacker, target, damage * split.physical, "physical", { attack: true, crit });
      if (split.magic > 0) dealDamage(world, attacker, target, damage * split.magic, "magic", { attack: true, crit });
      if ((split.true ?? 0) > 0) dealDamage(world, attacker, target, damage * (split.true ?? 0), "true", { attack: true, crit });
    } else dealDamage(world, attacker, target, damage, "physical", { attack: true, crit });
  }
  applyOnHit(world, attacker, target, bonusOnHit, blocked, 1, parried, critChance, undefined, false, onHitShield ? undefined : options.attackOnHitReplacement);
  if (parried) {
    resolved(true, false);
    return;
  }
  // Damage returned to attackers (Defensive Ball Curl): the state's value is the damage per attack.
  const reflect = stateStatus(target, "reflectAttacks");
  if (reflect && attacker.alive) dealDamage(world, target, attacker, reflect.value, "magic", { ability: "reflected damage" });
  const onAttackHit = attacker.spec.hooks?.onAttackHit;
  if (onAttackHit) runHook(() => onAttackHit({ ...hookContext(world, attacker, undefined, target), blocked, critChance }));
  resolved(blocked, false);
  });
}

export function notifyDashEnd(world: World, unit: Unit, key: string, interrupted: boolean): void {
  const ability = abilityOf(unit, key);
  const ended = unit.spec.hooks?.onDashEnd;
  if (ability && ended) runHook(() => ended({ ...hookContext(world, unit, ability), interrupted }));
}

export function hookContext(world: World, unit: Unit): HookContext;
export function hookContext(world: World, unit: Unit, ability: AbilitySpec, enemyOverride?: Unit): HookContext & { ability: AbilitySpec };
export function hookContext(world: World, unit: Unit, ability: undefined, enemyOverride?: Unit): HookContext;
export function hookContext(world: World, unit: Unit, ability?: AbilitySpec, enemyOverride?: Unit): HookContext & { ability?: AbilitySpec } {
  const enemy = enemyOverride ?? world.units[other(unit.side)];
  return {
    tick: world.tick,
    world,
    self: unit,
    enemy,
    memory: unit.memory,
    ...(ability ? { ability } : {}),
    apply(effect: Effect, toSelf = false) {
      applyEffect(world, unit, toSelf ? unit : enemy, effect, { scale: 1, ...(ability ? { ability } : {}) });
    },
    buff(key: string, stat: BuffStat, amount: number, seconds: number) {
      const id = `buff:${key}`;
      const existing = unit.statuses.find((s) => s.kind === "stat" && s.source === unit.side && s.memoKey === id);
      if (existing && existing.value === amount && existing.key === stat) {
        existing.endTick = world.tick + toTicks(seconds);
        return;
      }
      // Nothing to clear: the statuses (and the stats derived from them) stay as they are.
      if (!existing && amount === 0) return;
      unit.statuses = unit.statuses.filter((s) => s !== existing);
      if (amount !== 0) addStatus(unit, { kind: "stat", key: stat, source: unit.side, startTick: world.tick, endTick: world.tick + toTicks(seconds), value: amount, memoKey: id });
    },
    regenerate(amount: number) {
      heal(world, unit, amount, true);
    },
    transform(form, hp) {
      setForm(world, unit, form, hp);
    },
    log(text: string) {
      log(world, unit.side, text);
    },
  };
}
