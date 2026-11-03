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
import { petFormulaTarget } from "./petTarget";
import { healthProtection } from "./healthProtection";
import { channelIn, clearChannel } from "./channelState";
import { cancelTargetCast } from "./actions";
import { type AbilitySpec, type ActualMovement, type AttackSplit, type BuffStat, type DamageReport, type Effect, type HookContext, type PetDamageCategory, cooldownKeyOf } from "./spec";
import { type AttackHitOptions, type Pet, type Side, type Status, type Unit, type World, other } from "./state";

export function log(world: World, side: Side, text: string): void {
  if (world.settings.log) world.log.push({ tick: world.tick, side, text });
}

export function addStatus(unit: Unit, status: Status): void {
  unit.statuses.push(status);
}

type MovementObservation = { target: Unit; targetPet?: Pet; movement: ActualMovement };
const movementTransitions = new WeakMap<World, MovementObservation[]>();

/** Replacement control settles before general end observers; the body's own hooks run immediately. */
export function withMovementTransition<T>(world: World, apply: () => T): T {
  if (movementTransitions.has(world)) return apply();
  const pending: MovementObservation[] = [];
  movementTransitions.set(world, pending);
  try { return apply(); }
  finally {
    movementTransitions.delete(world);
    for (const observation of pending) observeMovement(world, observation);
  }
}

function observeMovement(world: World, observation: MovementObservation): void {
  const { targetPet, movement } = observation;
  // A pet formula view is a snapshot; observers read the canonical body's settled state.
  const target = targetPet ? petFormulaTarget(targetPet, world.units[targetPet.owner], world.tick) : observation.target;
  for (const observer of world.units) {
    const hooks = observer.spec.hooks, callback = hooks?.onActualMovement;
    if (!callback || (!observer.alive && !hooks?.movementEventsAfterDeath)) continue;
    runHook(() => callback({ ...hookContext(world, observer), target, ...(targetPet ? { targetPet } : {}), movement }));
  }
}

/** Observers see the actual moved body and endpoint, never its intended endpoint. */
export function notifyActualMovement(world: World, target: Unit, from: number, movement: Omit<ActualMovement, "from" | "to">, targetPet?: Pet): void {
  targetPet ??= target.petId === undefined ? undefined : world.pets.find(pet => pet.id === target.petId);
  // A pet transaction can temporarily strip petId to suppress champion hooks.
  // Its caller emits a correctly identified event when synchronizing the body.
  if (!targetPet && world.units[target.side] !== target) return;
  if (targetPet) targetPet.x = target.x;
  if (from === target.x && (!movement.ended || movement.kind === "walk")) return;
  if (!targetPet && world.units[target.side] === target) {
    for (const pet of world.pets) {
      if (pet.carriedBy !== target.side) continue;
      const previous = pet.x;
      pet.x = target.x;
      notifyActualMovement(world, petFormulaTarget(pet, world.units[pet.owner], world.tick), previous,
        { kind: "attached", endTick: world.tick, ended: false }, pet);
    }
  }
  const observation: MovementObservation = { target, ...(targetPet ? { targetPet } : {}), movement: { ...movement, from, to: target.x } };
  const pending = movement.ended && movement.kind !== "walk" ? movementTransitions.get(world) : undefined;
  if (pending) pending.push(observation);
  else observeMovement(world, observation);
}

/** Delete first so accepted end-of-move control cannot recursively end the same move. */
export function endForcedMovement(world: World, target: Unit, targetPet?: Pet): void {
  const forced = targetPet?.forced ?? target.forced;
  if (!forced) return;
  delete target.forced;
  if (targetPet) delete targetPet.forced;
  notifyActualMovement(world, target, target.x, { kind: "forced", endTick: world.tick, ended: true,
    ...(forced.startTick !== undefined ? { startTick: forced.startTick } : {}), ...(forced.ability ? { ability: forced.ability } : {}) }, targetPet);
}

function stateStatus(unit: Unit, state: string): Status | undefined {
  return unit.statuses.find((s) => s.kind === "state" && s.key === state);
}

/** Consume one spell-shield charge and report only an actual champion's hostile block. */
export function consumeSpellShield(world: World, source: Unit, target: Unit, ability?: AbilitySpec, effects: readonly Effect[] = [], originX = source.x): boolean {
  const shield = stateStatus(target, "spellShield");
  if (!shield) return false;
  shield.charges = (shield.charges ?? 1) - 1;
  if (shield.charges <= 0) target.statuses = target.statuses.filter((status) => status !== shield);
  if (target.petId !== undefined) {
    const pet = world.pets.find(body => body.id === target.petId);
    if (pet) pet.statuses = target.statuses;
  }
  const blocked = target.spec.hooks?.onSpellShieldBlock;
  if (blocked && source.side !== target.side && target.petId === undefined && world.units[target.side] === target) {
    runHook(() => blocked({ ...hookContext(world, target, undefined, source), source, shield, effects, originX, ...(ability ? { ability } : {}) }));
  }
  return true;
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
export interface VisibilityPolicy { alliedInvisibility?: boolean }
export function canSee(unit: Unit, by: Unit, camouflageObserver: Unit = by, policy?: VisibilityPolicy): boolean {
  const revealed = unit.statuses.some((status) => status.kind === "state" && status.key === "revealed" && (!status.revealWhileCC || unit.statuses.some((cc) => cc.kind === "cc" && cc.key === status.revealWhileCC && cc.source === status.source && cc.ability === status.ability)));
  if (isHidden(unit) && !revealed && !(policy?.alliedInvisibility === true && unit.side === by.side)) return false;
  if (!revealed && unit.side !== by.side && unit.statuses.some((s) => s.kind === "state" && s.key === "camouflage" && (camouflageObserver.petId !== undefined || camouflageObserver.side !== by.side || !camouflageObserver.alive || Math.abs(unit.x - camouflageObserver.x) > s.value + 1e-6))) return false;
  for (const s of by.statuses) if (s.kind === "cc" && s.key === "nearsight" && Math.abs(unit.x - (s.x ?? by.x)) > s.value + 1e-6) return false;
  for (const s of by.statuses) if (s.kind === "state" && s.key === "sightLimit" && Math.abs(unit.x - (s.x ?? by.x)) > s.value + 1e-6) return false;
  return true;
}

/** Whether `by` can start an attack or a unit-targeted spell on the unit. */
export function canTarget(unit: Unit, by: Unit, camouflageObserver: Unit = by, policy?: VisibilityPolicy): boolean {
  return !isUntargetable(unit, by) && canSee(unit, by, camouflageObserver, policy);
}

/** Units per tick a unit at `from` moves to get closer to `to`. */
export function directionTo(from: Unit, to: Unit): 1 | -1 {
  // Match the simulator's 1e-6 spatial precision: mirrored leap arithmetic
  // can otherwise leave physically coincident bodies a few ulps apart.
  if (Math.abs(to.x - from.x) <= 1e-6) return from.side === 0 ? 1 : -1;
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
  /** Actual spatial origin of a packet (a field's center or projectile approach). */
  originX?: number;
  /** Sourced alternative attack retains basic-attack interactions against actual pets. */
  petBasicAttack?: boolean;
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
  crit?: { chance: number; multiplier: number; bonus?: number };
  /** Damage amplifiers on either side don't raise it; reductions still apply (Ignite). */
  unamplified?: boolean;
}

/** How deep kit hooks are nested: a hook's damage can trigger hooks, but not without end. */
let hookDepth = 0;

/** A synchronous packet's spatial origin also belongs to its nested proc/hit hooks. */
const damageOrigins: Array<{ world: World; source: Unit; x: number }> = [];
function packetOrigin(world: World, source: Unit, explicit?: number): number {
  return explicit ?? damageOrigins.findLast(entry => entry.world === world && entry.source === source)?.x ?? source.x;
}
function withDamageOrigin<T>(world: World, source: Unit, originX: number | undefined, run: () => T): T {
  if (originX === undefined) return run();
  damageOrigins.push({ world, source, x: originX });
  try { return run(); } finally { damageOrigins.pop(); }
}

function runHook(fn: () => void): void {
  if (hookDepth >= 3) return;
  hookDepth += 1;
  try {
    fn();
  } finally {
    hookDepth -= 1;
  }
}

/** One resolved packet, once per live champion observer; existing hit hooks stay local. */
export function observeDamage(world: World, source: Unit, target: Unit, report: DamageReport, attack: boolean, targetPet?: Pet): void {
  if (!(report.mitigated > 0)) return;
  for (const observer of world.units) {
    const hook = observer.spec.hooks?.onDamageObserved;
    if (hook && observer.alive && observer.hp > 0) runHook(() => hook({
      ...hookContext(world, observer), ...report, source, target, attack, ...(targetPet ? { targetPet } : {}),
    }));
  }
}

/** Source-owned procs that precede the triggering packet, including actual pet bodies. */
export function observeBeforeDamage(world: World, source: Unit, target: Unit, amount: number, raw: number, damageType: DamageType, attack: boolean, persistent: boolean, ability?: string, targetPet?: Pet): boolean {
  if (!(amount > 0)) return false;
  let observed = false;
  for (const observer of world.units) {
    const hook = observer.spec.hooks?.onBeforeDamageObserved;
    if (!hook || !((observer.alive && observer.hp > 0) || observer.spec.hooks?.beforeDamageEventsAfterDeath === true)) continue;
    if (targetPet && (!world.pets.includes(targetPet) || targetPet.hp <= 0)) break;
    const currentTarget = targetPet ? petFormulaTarget(targetPet, world.units[targetPet.owner], world.tick) : target;
    if (!currentTarget.alive || currentTarget.hp <= 0) break;
    observed = true;
    runHook(() => hook({
      ...hookContext(world, observer), source, target: currentTarget, amount, raw, damageType, attack, persistent,
      ...(ability ? { ability } : {}), ...(source.petId !== undefined ? { petSource: true } : {}), ...(targetPet ? { targetPet } : {}),
    }));
  }
  return observed;
}

/** Whole pet hits are separate from damage packets: an on-hit may deal several packets. */
export function observeOwnedPetBasicHit(world: World, pet: Pet, target: Unit, blocked: boolean, targetPet?: Pet): void {
  const owner = world.units[pet.owner], hook = owner.spec.hooks?.onOwnedPetBasicHit;
  if (hook && ((owner.alive && owner.hp > 0) || owner.spec.hooks?.ownedPetEventsAfterDeath === true)) runHook(() => hook({
    ...hookContext(world, owner, undefined, target), pet, target, blocked, ...(targetPet ? { targetPet } : {}),
  }));
}

/** Declaration is distinct from contact: blind, dodge and later cancellation do not undo it. */
export function observeOwnedPetAttack(world: World, pet: Pet, target: Unit, targetPet?: Pet): void {
  const owner = world.units[pet.owner], hook = owner.spec.hooks?.onOwnedPetAttack;
  if (hook && ((owner.alive && owner.hp > 0) || owner.spec.hooks?.ownedPetEventsAfterDeath === true)) runHook(() => hook({
    ...hookContext(world, owner, undefined, target), pet, target, ...(targetPet ? { targetPet } : {}),
  }));
}

/** Deals one hit of damage; returns the health removed. */
export function dealDamage(world: World, source: Unit, target: Unit, raw: number, type: DamageType, ctx: DamageContext = {}): number {
  if (ctx.originX === undefined) return resolveDamage(world, source, target, raw, type, ctx);
  return withDamageOrigin(world, source, ctx.originX, () => resolveDamage(world, source, target, raw, type, ctx));
}
function resolveDamage(world: World, source: Unit, target: Unit, raw: number, type: DamageType, ctx: DamageContext): number {
  if (raw <= 0 || !target.alive) return 0;
  if (target.petId !== undefined) {
    const pet = world.pets.find((candidate) => candidate.id === target.petId);
    if (!pet) return 0;
    const hp = pet.hp;
    const packet = ctx.crit ? raw * averageCritFactor(Math.min(1, Math.max(0, ctx.crit.chance)), ctx.crit.multiplier) + (ctx.crit.bonus ?? 0) : raw;
    const actualBasic = ctx.petBasicAttack === true || (ctx.attack === true && ctx.ability === undefined && (ctx.petDamageCategory === undefined || ctx.petDamageCategory === "basic"));
    const category = ctx.petDamageCategory ?? (actualBasic ? "basic" : ctx.persistent ? "persistent" : ctx.ability ? "singleTarget" : "proc");
    const areaScale = category === "area" || category === "persistent" ? pet.spec.areaTaken ?? 1 : 1;
    const dealt = damagePet(world, source, pet, packet * areaScale, type, actualBasic, ctx.ability, category);
    target.hp = pet.hp;
    target.alive = pet.hp > 0;
    target.statuses = pet.statuses ?? [];
    if (!pet.spec.hitPoints && !pet.spec.fixedDamage && !pet.spec.diesToChampionAttack) {
      if ((ctx.appliesLifeSteal ?? ctx.attack) && !ctx.noLifeSteal) heal(world, source, dealt * derive(source).lifeSteal, false, true);
      if (ctx.lifesteal) heal(world, source, dealt * ctx.lifesteal, false, true);
    }
    return Math.max(0, hp) - Math.max(0, pet.hp);
  }
  const outsideGuard = target.statuses.some((status) => status.kind === "state" && status.key === "invulnerableFar" && Math.abs(source.x - target.x) > status.value + 1e-6);
  if (hasState(target, "invulnerable") || outsideGuard || inStasis(target) || healthProtection(world, target).invulnerable) {
    log(world, target.side, `is invulnerable: ${Math.round(raw)} ${type} damage ignored`);
    return 0;
  }
  const s = derive(source);
  const t = derive(target);
  const beforeCrit = raw;
  const critChance = Math.min(1, Math.max(0, ctx.crit?.chance ?? 0));
  if (ctx.crit) raw = raw * averageCritFactor(critChance, ctx.crit.multiplier) + (ctx.crit.bonus ?? 0);
  const resist =
    type === "physical"
      ? effectiveResist(t.armor, t.armorReduction, { flat: s.lethality, percent: s.armorPen, bonusPercent: s.bonusArmorPen })
      : type === "magic"
        ? effectiveResist(t.mr, t.mrReduction, { flat: s.magicPen, percent: s.magicPenPercent })
        : 0;
  const typed = type === "physical" ? t.physicalReduction : type === "magic" ? t.magicReduction : [];
  const received = [...t.damageReduction, ...typed];
  // Amplifiers are dealt-damage increases and received-damage reductions below zero.
  const modifiers = ctx.unamplified ? { dealt: s.damageDealt.filter((m) => m < 0), received: received.filter((m) => m > 0) } : { dealt: s.damageDealt, received };
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
  let mitigated = splitCritical
    ? (critChance < 1 ? (1 - critChance) * mitigate(reduceRaw(beforeCrit + (ctx.crit!.bonus ?? 0)), type, resist, modifiers) : 0) + (critChance > 0 ? critChance * mitigate(reduceRaw(beforeCrit * ctx.crit!.multiplier + (ctx.crit!.bonus ?? 0)), type, criticalResist, modifiers) : 0)
    : mitigate(reduceRaw(raw), type, resist, modifiers);
  const adjustMitigated = target.spec.hooks?.modifyDamageBeforeShields;
  if (adjustMitigated && mitigated > 0) runHook(() => {
    mitigated = Math.max(0, adjustMitigated({ ...hookContext(world, target, undefined, source), amount: mitigated, damageType: type, attack: ctx.attack === true, persistent: ctx.persistent === true, originX: packetOrigin(world, source, ctx.originX), ...(ctx.ability ? { ability: ctx.ability } : {}), ...(source.petId !== undefined ? { petSource: true } : {}) }));
  });
  const observedBeforeDamage = observeBeforeDamage(world, source, target, mitigated, raw, type, ctx.attack === true, ctx.persistent === true, ctx.ability);
  // A preceding proc can kill the body or enter a protected resurrection state.
  // Its initiating packet keeps its captured damage but cannot hit a vanished victim.
  if (observedBeforeDamage && (target.hp <= 0 || !target.alive || hasState(target, "invulnerable") || inStasis(target) || healthProtection(world, target).invulnerable)) return 0;
  const before = target.spec.hooks?.beforeDamageTaken;
  if (before && mitigated > 0) runHook(() => before({ ...hookContext(world, target, undefined, source), amount: mitigated, damageType: type, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(source.petId !== undefined ? { petSource: true } : {}), ...(ctx.ability ? { ability: ctx.ability } : {}) }));
  const shields = target.statuses.filter((st) => st.kind === "shield");
  const views: Shield[] = shields.map((st) => ({
    amount: st.value,
    type: st.shieldType ?? "normal",
    endTick: st.endTick,
    ...(st.priority ? { priority: true } : {}),
    ...(st.firstDamageBypass !== undefined ? { firstDamageBypass: st.firstDamageBypass } : {}),
  }));
  const unshielded = absorbWithShields(mitigated, type, views);
  const absorbedShields: NonNullable<DamageReport["absorbedShields"]>[number][] = [];
  shields.forEach((st, i) => {
    const amount = st.value - (views[i]?.amount ?? 0);
    if (amount > 0) absorbedShields.push(Object.freeze({ shield: Object.freeze({ ...st }), amount }));
    st.value = views[i]?.amount ?? 0;
    delete st.firstDamageBypass;
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
  const floor = Math.max(stateStatus(target, "minimumHealth")?.value ?? 0, healthProtection(world, target).minimumHealth);
  const hpBefore = target.hp;
  target.hp -= left;
  if (floor > 0 && target.hp < floor) target.hp = Math.min(hpBefore, floor);
  // Overkill doesn't count as damage dealt.
  const removed = Math.max(0, hpBefore) - Math.max(0, target.hp);
  target.totals.damageTaken += removed;
  source.totals.damageDealt += removed;
  log(world, source.side, `${ctx.ability ?? (ctx.attack ? "attack" : "effect")} deals ${Math.round(resolvedDamage)} ${type} damage${mitigated > unshielded ? ` (${Math.round(mitigated - unshielded)} absorbed)` : ""}${healthDamage > left ? " (parried)" : ""}`);
  if (target.hp <= 0) lethal(world, target, source);
  if ((ctx.appliesLifeSteal ?? ctx.attack) && !ctx.noLifeSteal && s.lifeSteal > 0) heal(world, source, resolvedDamage * s.lifeSteal, false, true);
  if (ctx.lifesteal) heal(world, source, resolvedDamage * ctx.lifesteal, false, true);
  const report = { amount: removed, absorbed: mitigated - unshielded, ...(absorbedShields.length ? { absorbedShields: Object.freeze(absorbedShields) } : {}), ...(source.petId !== undefined ? { petSource: true } : {}), mitigated: resolvedDamage, raw, damageType: type, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) };
  const taken = target.spec.hooks?.onDamageTaken;
  if (taken && mitigated > 0) runHook(() => taken({ ...hookContext(world, target, undefined, source), ...report }));
  const dealt = source.spec.hooks?.onDamageDealt;
  if (dealt && mitigated > 0) {
    runHook(() => dealt({ ...hookContext(world, source, undefined, target), ...report, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) }));
  }
  // Vamp observes the same pre-Riposte damage as life steal and onDamageDealt.
  // Consumers requiring actual damage use amount + absorbed instead.
  observeDamage(world, source, target, report, ctx.attack === true);
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
export function notifyKill(world: World, killer: Unit, victim: Unit | Pet, damage?: { ability?: string; persistent?: boolean }): void {
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
  if (hook) hook({ ...hookContext(world, credited, undefined, "side" in victim ? victim : undefined), victim, ...("side" in victim ? {} : { pet: victim }), ...(damage ? { damage } : {}) });
  for (const observer of world.units) {
    const observed = observer.spec.hooks?.onDeathObserved;
    if (observed && observer.alive && observer.hp > 0) runHook(() => observed({ ...hookContext(world, observer), source: killer, victim, ...("side" in victim ? {} : { targetPet: victim }) }));
  }
}

/** Attackable resurrection preserves an existing cast but forbids future declarations. */
export function beginResurrection(world: World, unit: Unit, options: { duration: number; armor?: number; mr?: number; ability?: string }): boolean {
  if (!unit.alive || unit.resurrection || unit.deathDefied || !(options.duration > 0)) return false;
  const endTick = world.tick + toTicks(options.duration);
  const action = unit.action;
  const channel = channelIn(action);
  if (channel) {
    const ability = abilityOf(unit, channel.ability);
    clearChannel(unit, channel);
    if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "resurrection" });
  }
  if (action?.kind === "dash") {
    unit.action = action.resume;
    notifyDashEnd(world, unit, action.ability, true);
  } else if (action?.kind === "windup") unit.action = undefined;
  delete unit.pendingAttack;
  endForcedMovement(world, unit);
  delete unit.attached;
  unit.move = 0;
  unit.moved = 0;
  // Hostile debuffs dispel except explicitly sourced death-persistent effects.
  unit.statuses = unit.statuses.filter((status) => status.persistThroughDeath || status.source === unit.side || !["cc", "dot", "mark", "grievousWounds", "stat"].includes(status.kind));
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

/** A counted death with a finite protected window; attacks always remain disabled. */
export function beginDeathDefied(world: World, unit: Unit, options: { duration: number; ability?: string; allowMovement?: boolean; allowCasting?: boolean }): boolean {
  if (!unit.alive || unit.resurrection || unit.deathDefied || unit.fallen || !(options.duration > 0)) return false;
  const action = unit.action;
  unit.action = undefined;
  const channel = channelIn(action);
  if (channel) { const ability = abilityOf(unit, channel.ability); if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "death" }); }
  if (action?.kind === "dash") notifyDashEnd(world, unit, action.ability, true);
  delete unit.pendingAttack; endForcedMovement(world, unit); delete unit.attached;
  unit.move = 0; unit.moved = 0;
  unit.statuses = unit.statuses.filter((status) => status.persistThroughDeath);
  const endTick = world.tick + toTicks(options.duration);
  unit.deathDefied = { endTick, ...(options.ability ? { ability: options.ability } : {}), ...(options.allowMovement !== undefined ? { allowMovement: options.allowMovement } : {}), ...(options.allowCasting !== undefined ? { allowCasting: options.allowCasting } : {}) };
  unit.fallen = true;
  unit.hp = 1;
  // Direct statuses retain already-launched inbound projectiles; they expire normally.
  for (const key of ["untargetable", "invulnerable", "ccImmune", "noAttacks", ...(!options.allowMovement ? ["noMovement" as const] : [])] as const) addStatus(unit, { kind: "state", key, source: unit.side, startTick: world.tick, endTick, value: 0, ability: "engine:deathDefied" });
  log(world, unit.side, options.allowMovement ? "continues moving after death" : "continues casting after death");
  return true;
}

/** Guarded zero-duration ejection, used only when source timing is explicitly unquantified. */
export function immediateDisplace(world: World, source: Unit, target: Unit, delta: number, ability?: string): boolean {
  if (!target.alive || inStasis(target) || isUntargetable(target, source)) return false;
  target.spec.hooks?.onCCAttempt?.({ ...hookContext(world, target, undefined, source), cc: "airborne", source, ...(ability ? { ability } : {}) });
  if (ccImmuneTo(target, source) || hasState(target, "displacementImmune") || blackShieldProtected(world, target) || negateImmobilization(world, target)) return false;
  interrupt(world, target, "airborne");
  endForcedMovement(world, target);
  const from = target.x;
  target.x += terrainLimit(world, target, delta, false);
  notifyActualMovement(world, target, from, { kind: "forced", startTick: world.tick, endTick: world.tick, ended: true, ...(ability ? { ability } : {}) });
  notifyCCApplied(world, source, target, "airborne", ability);
  return true;
}

/**
 * Heals a unit; Grievous Wounds cuts healing and health regeneration alike. A unit brought to
 * 0 health this tick is dying and can't be healed back. Units under "noHealing" (Glory in
 * Death) are healed only by life steal and omnivamp (`lifesteal`).
 */
export function heal(world: World, unit: Unit, amount: number, regeneration = false, lifesteal = false): void {
  const pet = unit.petId === undefined ? undefined : world.pets.find((candidate) => candidate.id === unit.petId);
  if (unit.petId !== undefined && !pet) return;
  if (pet) unit.hp = pet.hp;
  if (!unit.alive || unit.hp <= 0 || amount <= 0) return;
  if (!lifesteal && hasState(unit, "noHealing")) return;
  if (!regeneration && healthProtection(world, unit).preventHealing) return;
  const grievous = unit.statuses.some((s) => s.kind === "grievousWounds");
  const d = derive(unit);
  const cap = stateStatus(unit, "healthCap");
  const most = cap ? Math.min(d.maxHp, cap.value * d.maxHp) : d.maxHp;
  const healed = Math.min(most - unit.hp, healingReceived(amount * (1 + d.healingIncrease), grievous));
  if (healed <= 0) return;
  unit.hp += healed;
  if (pet) pet.hp = unit.hp;
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
  const heldChannel = (action.kind === "cast" || action.kind === "dash") ? channelIn(action.resume) : undefined;
  if (heldChannel) {
    const heldAbility = abilityOf(unit, heldChannel.ability);
    const moves = heldAbility?.delivery.kind === "dash" || heldAbility?.delivery.kind === "blink";
    const stops = heldAbility?.channel?.interrupts ? heldAbility.channel.interrupts.includes(type) : rule.interruptsChannels === "yes" || (rule.interruptsChannels === "movement" && moves);
    if (stops && heldAbility?.channel?.interruptible !== false) {
      clearChannel(unit, heldChannel);
      if (heldAbility) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, heldAbility), reason: "cc", cc: type });
      log(world, unit.side, `${heldAbility?.name ?? "channel"} interrupted by ${type}`);
    }
  }
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
    const stops = ability?.channel?.interrupts ? ability.channel.interrupts.includes(type) : rule.interruptsChannels === "yes" || (rule.interruptsChannels === "movement" && moves);
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
      // Completion collects due casts before resolving either side. Invalidate
      // that same captured action when accepted control interrupts it first.
      action.cancelled = true;
      unit.action = undefined;
      const cost = action.cost ?? ability.costFor?.(unit, ability) ?? (typeof ability.cost === "object" ? evaluate(ability.cost, unit) : (ability.cost ?? 0));
      if (ability.costType === "health") {
        if (unit.hp >= healthProtection(world, unit).minimumHealth) unit.hp -= cost;
      }
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

export function applyCC(world: World, source: Unit, target: Unit, type: CCType, duration: number, strength = 0, sticky = false, ability?: string, bypassSlowImmune = false, slowStackGroup?: string, fearOriginX?: number, whileCC?: CCType): boolean {
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
  addStatus(target, { kind: "cc", key: type, source: source.side, startTick: world.tick, endTick: world.tick + ticks, value: strength, ...(sticky ? { sticky } : {}), ...(ability ? { ability } : {}), ...(bypassSlowImmune ? { bypassSlowImmune: true } : {}), ...(slowStackGroup ? { slowStackGroup } : {}), ...(type === "fear" && fearOriginX !== undefined ? { fearOriginX } : {}), ...(whileCC ? { whileCC } : {}) });
  const shown = type === "nearsight" ? ` to ${Math.round(strength)} units` : strength ? ` ${Math.round(strength * 100)}%` : "";
  if (!ongoing) log(world, source.side, `inflicts ${type}${shown} for ${(ticks / 30).toFixed(2)} s`);
  interrupt(world, target, type);
  notifyCCApplied(world, source, target, type, ability);
  return true;
}

/**
 * Accepted hostile crowd control on a champion notifies the opposing champion's observer: of
 * every type (onEnemyCrowdControlled), and of immobilizations (onEnemyCCApplied).
 */
function notifyCCApplied(world: World, source: Unit, target: Unit, cc: CCType, ability?: string): void {
  target.spec.hooks?.onCCApplied?.({ ...hookContext(world, target, undefined, source), cc, source, ...(ability ? { ability } : {}) });
  if (target !== world.units[target.side] || source.side === target.side) return;
  const observer = world.units[other(target.side)];
  observer.spec.hooks?.onEnemyCrowdControlled?.({ ...hookContext(world, observer, undefined, target), target, cc, source, ...(ability ? { ability } : {}) });
  if (!IMMOBILIZING.has(cc)) return;
  observer.spec.hooks?.onEnemyCCApplied?.({ ...hookContext(world, observer, undefined, target), target, cc, source, ...(ability ? { ability } : {}) });
}

/**
 * Knock ups, knock backs and pulls: airborne, plus forced movement while it lasts. With walls
 * nearby, a knock back that reaches the wall behind the target stops there and stuns it.
 */
function displace(world: World, source: Unit, target: Unit, effect: Extract<Effect, { type: "displace" }>, ability?: string): boolean {
  return withMovementTransition(world, () => applyDisplacement(world, source, target, effect, ability));
}

function applyDisplacement(world: World, source: Unit, target: Unit, effect: Extract<Effect, { type: "displace" }>, ability?: string): boolean {
  const { direction, duration } = effect;
  const originX = effect.originX ?? source.x;
  if (!applyCC(world, source, target, "airborne", effect.airborneDuration ?? duration, 0, false, ability)) return false;
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
    const toward = target.x === originX ? (target.side === 0 ? 1 : -1) : originX > target.x ? 1 : -1;
    if (effect.distance > 0) {
      endForcedMovement(world, target);
      target.forced = { startTick: world.tick, ...(ability ? { ability } : {}), endTick: world.tick + ticks, perTick: (toward * effect.distance) / ticks, over: true };
    }
    return true;
  }
  const env = world.settings.environment;
  // The wall behind the target: the lane's, with walls nearby, or terrain an ability raised.
  const away = effect.originX !== undefined && target.x === originX ? 0 : target.x === originX ? (target.side === 0 ? -1 : 1) : target.x > originX ? 1 : -1;
  const wallAt = away === 0 ? Number.POSITIVE_INFINITY : Math.min(env.walls ? env.wallDistance : Number.POSITIVE_INFINITY, terrainGap(world, target, away));
  const intoWall = (effect.wallStun !== undefined || effect.stopAtWall) && direction === "away" && effect.distance >= wallAt;
  let distance = intoWall ? wallAt : effect.distance;
  if (effect.to !== undefined) distance = Math.max(0, Math.min(distance, Math.abs(target.x - originX) - effect.to));
  const impact = intoWall ? Math.max(1, Math.ceil(ticks * distance / Math.max(effect.distance, 1e-6) - 1e-6)) : ticks;
  if (distance > 0) {
    endForcedMovement(world, target);
    target.forced = { startTick: world.tick, ...(ability ? { ability } : {}), endTick: world.tick + impact, perTick: ((direction === "away" ? 1 : -1) * (effect.originX === undefined ? 1 : away) * (intoWall ? effect.distance : distance)) / ticks, ...(effect.originX !== undefined ? { absolute: true } : {}), ...(intoWall ? { remaining: distance } : {}), ...(effect.ignoreUnitCollision ? { ignoreUnitCollision: true } : {}) };
  }
  if (intoWall && effect.wallStun !== undefined) {
    const effects: Effect[] = [...(effect.wallEffects ?? []), { type: "cc", cc: "stun", duration: effect.wallStun }];
    world.scheduled.push({ tick: world.tick + impact, owner: source.side, target: target.side, effects, scale: 1 });
    log(world, source.side, "knocks the target into a wall");
  }
  return true;
}

// ---------------------------------------------------------------------------------------
// Effects

export interface HitContext {
  originX?: number;
  petDamageCategory?: PetDamageCategory;
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
  // Formula views of pets are distinct actors; their protection never drops
  // targeting of the champion that happens to share their side.
  if (unit !== world.units[unit.side]) return;
  const enemy = world.units[other(unit.side)];
  const stasis = inStasis(unit);
  if (missiles) world.missiles = world.missiles.filter((m) => !(m.owner === enemy.side && m.pet === undefined && m.homing && (!m.hitsUntargetable || stasis)));
  const action = enemy.action;
  if (action?.kind === "windup" && action.pet === undefined && (!action.hitsUntargetable || stasis)) {
    // The attack is lost and the attack timer resets, as with any cancelled windup.
    enemy.action = undefined;
    enemy.attackReadyTick = world.tick;
  }
  if (enemy.pendingAttack && enemy.pendingAttack.pet === undefined && (!enemy.pendingAttack.hitsUntargetable || stasis)) {
    delete enemy.pendingAttack;
    enemy.attackReadyTick = world.tick;
  }
  if (action?.kind === "cast") {
    const ability = abilityOf(enemy, action.ability);
    // A targeted spell whose target vanishes during its cast time is cancelled without a cooldown.
    if (ability?.delivery.kind === "target" && !ability.retainTargetOnInvalidation && !(ability.retainTargetOnVisibilityLoss && !missiles)) cancelTargetCast(world, enemy, ability, "target", action.cost);
  }
}

export function applyEffect(world: World, caster: Unit, target: Unit, effect: Effect, ctx: HitContext): boolean | void {
  if (target.petId !== undefined && effect.type !== "damage") {
    const pet = world.pets.find((candidate) => candidate.id === target.petId);
    if (!pet) return false;
    const applied = petEffects(world, caster, pet, [effect], ctx.attack ? "basic" : "singleTarget", ctx.ability?.key, ctx.scale, ctx.originX);
    target.hp = pet.hp;
    target.alive = pet.hp > 0;
    target.statuses = pet.statuses ?? [];
    return applied;
  }
  const tick = world.tick;
  const formulaTarget = ctx.formulaTarget ?? target;
  switch (effect.type) {
    case "damage": {
      const d = derive(caster);
      const amount = Math.max(effect.amountFor?.(caster, formulaTarget) ?? evaluate(effect.amount, caster, formulaTarget, ctx.critChance), effect.minimum ? evaluate(effect.minimum, caster, formulaTarget, ctx.critChance) : 0);
      dealDamage(world, caster, target, amount * ctx.scale, effect.damageType, {
        ...(ctx.originX !== undefined ? { originX: ctx.originX } : {}),
        ...(effect.canCrit ? { crit: { chance: ctx.critChance ?? d.critChance, multiplier: effect.critMultiplier ?? d.critDamage } } : {}),
        ...(ctx.attack || ctx.ability?.flags?.basicDamage ? { attack: true } : {}),
        ...(ctx.ability?.flags?.petBasicAttack ? { petBasicAttack: true } : {}),
        ...(ctx.ability?.flags?.appliesLifeSteal ? { appliesLifeSteal: true } : {}),
        ...(effect.label || ctx.ability ? { ability: effect.label ?? ctx.ability?.name } : {}),
        ...(effect.lifesteal ? { lifesteal: effect.lifesteal } : {}),
        ...(effect.noLifeSteal ? { noLifeSteal: true } : {}),
        ...(effect.persistent ? { persistent: true } : {}),
        ...(effect.unamplified ? { unamplified: true } : {}),
        ...((effect.petDamageCategory ?? ctx.petDamageCategory) ? { petDamageCategory: effect.petDamageCategory ?? ctx.petDamageCategory } : {}),
      });
      return;
    }
    case "cc": {
      // Some empowered attacks retain their damage through a spell shield while just the
      // debuff is negated (Decisive Strike); ordinary attack on-hit effects don't consume it.
      const spellShield = effect.spellShield ? stateStatus(target, "spellShield") : undefined;
      if (spellShield) {
        consumeSpellShield(world, caster, target, ctx.ability);
        log(world, target.side, `spell shield blocks ${ctx.ability?.name ?? effect.cc}`);
        return false;
      }
      return applyCC(world, caster, target, effect.cc, effect.duration, effect.strength ?? 0, effect.sticky, ctx.ability?.key, effect.bypassSlowImmune, effect.slowStackGroup, effect.fearOriginX, effect.whileCC);
    }
    case "disrupt": {
      if (!target.alive || isUntargetable(target, caster) || inStasis(target) || ccImmuneTo(target, caster) || blackShieldProtected(world, target)) return false;
      interrupt(world, target, "silence");
      target.spec.hooks?.onDisrupted?.({ ...hookContext(world, target, undefined, caster), source: caster, ...(ctx.ability ? { ability: ctx.ability.key } : {}) });
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
      return displace(world, caster, target, effect, ctx.ability?.key);
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
        ...(effect.firstDamageBypass !== undefined ? { firstDamageBypass: effect.firstDamageBypass } : {}),
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
        ...(effect.cleanseWithCC ? { cleanseWithCC: true } : {}),
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
      const previous = target.statuses.find((s) => s.kind === "stat" && s.source === caster.side && s.memoKey === memoKey);
      if (previous) {
        target.statuses = target.statuses.filter((s) => !(s.kind === "stat" && s.source === caster.side && s.memoKey === memoKey));
      }
      addStatus(target, { kind: "stat", key: effect.stat, source: caster.side, startTick: tick, endTick: tick + toTicks(effect.duration), value, memoKey,
        ...(effect.requiresShield ? { requiresShield: true, ability: ctx.ability?.key } : {}),
        ...(effect.whileCC ? { whileCC: effect.whileCC, ability: ctx.ability?.key } : {}),
      });
      // Only newly gained maximum health grants current health; a refresh cannot heal twice.
      if (effect.stat === "health") target.hp = Math.min(derive(target).maxHp, target.hp + Math.max(0, value - (previous?.value ?? 0)));
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
      const first = old?.dot && old.dot.nextTick >= tick ? old.dot.nextTick : tick + intervalTicks;
      addStatus(target, {
        kind: "dot",
        key,
        source: caster.side,
        startTick: tick,
        // A pet's due pulse runs after field refresh. Retain that old pulse in
        // addition to the refreshed duration, rather than shortening its linger.
        endTick: first + intervalTicks * (hits - 1 + (old?.dot?.nextTick === tick ? 1 : 0)),
        value: 0,
        ...(ctx.ability ? { ability: ctx.ability.key } : {}),
        dot: {
          ...((ctx.originX ?? damageOrigins.findLast(entry => entry.world === world && entry.source === caster)?.x) !== undefined ? { originX: packetOrigin(world, caster, ctx.originX) } : {}),
          damageType: effect.damageType,
          perHit: (evaluate(effect.total, caster, formulaTarget) * ctx.scale) / hits,
          intervalTicks,
          nextTick: first,
          ...(effect.label || ctx.ability ? { label: effect.label ?? ctx.ability?.name } : {}),
          ...(effect.unamplified ? { unamplified: true } : {}),
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
      const removedCC = target.statuses.some((s) => s.kind === "cc" && removable(s));
      target.statuses = target.statuses.filter((s) => !((s.kind === "cc" || (s.kind === "state" && s.cleanseWithCC && effect.types === undefined)) && removable(s)));
      if (target.statuses.length < before) {
        if (removedCC && !target.statuses.some((s) => s.kind === "cc" && s.key === "airborne")) endForcedMovement(world, target);
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
      const protection = healthProtection(world, target);
      if (hasState(target, "invulnerable") || inStasis(target) || protection.invulnerable) return;
      // Executes leave units under a minimum health threshold at that threshold (wiki: "Minimum health threshold").
      const protectedFloor = stateStatus(target, "minimumHealth");
      const floor = Math.max(protection.minimumHealth, protectedFloor ? Math.min(protectedFloor.value, Math.max(0, effect.minimumHealthFloor ?? protectedFloor.value)) : 0);
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
      const from = target.x;
      const enemy = world.units[other(target.side)];
      const away = target.x === enemy.x ? (target.side === 0 ? -1 : 1) : target.x > enemy.x ? 1 : -1;
      const gap = Math.abs(target.x - enemy.x) - target.spec.base.pathingRadius - enemy.spec.base.pathingRadius;
      target.x += effect.direction === "away" ? away * effect.distance : -away * Math.min(effect.distance, Math.max(0, gap));
      notifyActualMovement(world, target, from, { kind: "blink", startTick: tick, endTick: tick, ended: true, ...(ctx.ability ? { ability: ctx.ability.key } : {}) });
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
export function abilityHit(world: World, caster: Unit, target: Unit, ability: AbilitySpec, effects: Effect[], scale = 1, originX?: number, petDamageCategory?: PetDamageCategory): void {
  if (originX === undefined) return resolveAbilityHit(world, caster, target, ability, effects, scale, petDamageCategory);
  return withDamageOrigin(world, caster, originX, () => resolveAbilityHit(world, caster, target, ability, effects, scale, petDamageCategory));
}
function resolveAbilityHit(world: World, caster: Unit, target: Unit, ability: AbilitySpec, effects: Effect[], scale: number, petDamageCategory?: PetDamageCategory): void {
  if (!target.alive || effects.length === 0) return;
  if (inStasis(target) || (!ability.flags?.hitsUntargetable && isUntargetable(target, caster))) {
    log(world, target.side, `is untargetable: ${ability.name} misses`);
    return;
  }
  const defense = stateStatus(target, "parry") ? "parry"
    : stateStatus(target, "spellShield") && ability.flags?.spellShield !== false ? "spellShield"
      : (ability.flags?.dodge ?? ability.flags?.parry) && hasState(target, "dodgeAttacks") ? "dodge"
        : (ability.flags?.block ?? ability.flags?.parry) && hasState(target, "blockAttacks") ? "block"
          : ability.flags?.blockedByDisplacementImmunity && hasState(target, "displacementImmune") ? "immunity" : undefined;
  const contact = caster.spec.hooks?.onAbilityContact;
  if (contact) runHook(() => {
    const replacement = contact({ ...hookContext(world, caster, ability, target), effects, scale, originX: packetOrigin(world, caster), ...(defense ? { defense } : {}) });
    if (replacement) effects = replacement;
  });
  if (effects.length === 0) return;
  return withBlackShieldPacket(world, target, () => {
  // Riposte takes priority over spell shields and negates debuffs, but its damage immunity
  // happens after shields and vamp. Its shock, rather than the incoming spell, applies stun.
  if (stateStatus(target, "parry")) {
    log(world, target.side, `parries ${ability.name}`);
    reportParry(world, caster, target, effects);
    for (const effect of effects) if (effect.type === "damage") applyEffect(world, caster, target, effect, { ability, scale, ...(petDamageCategory ? { petDamageCategory } : {}) });
    if (ability.flags?.appliesOnHit && !(ability.flags.dodgeStopsOnHit && hasState(target, "dodgeAttacks"))) applyOnHit(world, caster, target, [], false, scale * (ability.onHitScale ?? 1), true);
    return;
  }
  const spellShield = stateStatus(target, "spellShield");
  if (spellShield && ability.flags?.spellShield !== false) {
    consumeSpellShield(world, caster, target, ability, effects, packetOrigin(world, caster));
    log(world, target.side, `spell shield blocks ${ability.name}`);
    return;
  }
  const dodged = (ability.flags?.dodge ?? ability.flags?.parry) === true && hasState(target, "dodgeAttacks");
  if (dodged) {
      log(world, target.side, `dodges ${ability.name}`);
      const avoided = target.spec.hooks?.onAttackAvoided;
      if (avoided) runHook(() => avoided(hookContext(world, target)));
      if (!ability.flags?.dodgeKeepsEffects) return;
  }
  const blocked = dodged || ((ability.flags?.block ?? ability.flags?.parry) === true && hasState(target, "blockAttacks"));
  if (ability.flags?.blockedByDisplacementImmunity && hasState(target, "displacementImmune")) return;
  const before = caster.spec.hooks?.beforeAbilityHit;
  if (before) runHook(() => before({ ...hookContext(world, caster, ability, target), effects, scale }));
  const avoided = target.spec.hooks?.onAttackAvoided;
  if (blocked && !dodged && avoided) runHook(() => avoided(hookContext(world, target)));
  const falloff = ability.falloff ? falloffShare(world, target, ability.falloff) : 1;
  for (const effect of effects) {
    if (blocked && effect.type === "damage") continue;
    if (!target.alive && negates(effect)) continue;
    const share = effect.type === "damage" || effect.type === "dot" ? falloff : 1;
    const applied = applyEffect(world, caster, target, effect, { ability, scale: scale * share, ...(petDamageCategory ? { petDamageCategory } : {}) });
    if (effect.type === "cc" && ability.flags?.requiresCC === effect.cc && applied !== true) return;
  }
  if (ability.falloff) {
    // Each hit counts toward the next ones' falloff for the window, by its share.
    const { group, window } = ability.falloff;
    addStatus(target, { kind: "mark", key: `falloff:${group}:${world.nextId++}`, source: caster.side, startTick: world.tick, endTick: world.tick + toTicks(window), value: scale });
  }
  if (ability.flags?.appliesOnHit && !(ability.flags.dodgeStopsOnHit && hasState(target, "dodgeAttacks"))) applyOnHit(world, caster, target, [], blocked, scale * (ability.onHitScale ?? 1), false, undefined, ability, dodged, undefined, scale);
  const onAbilityHit = caster.spec.hooks?.onAbilityHit;
  if (onAbilityHit) runHook(() => onAbilityHit({ ...hookContext(world, caster, ability, target), scale }));
  });
}

/** The share of its damage a hit with falloff deals: less for each hit of its group the target took within the window. */
function falloffShare(world: World, target: Unit, falloff: NonNullable<AbilitySpec["falloff"]>): number {
  const prefix = `falloff:${falloff.group}:`;
  const recent = target.statuses.reduce((sum, s) => (s.kind === "mark" && s.key.startsWith(prefix) && s.endTick > world.tick ? sum + s.value : sum), 0);
  return Math.max(falloff.floor, 1 - falloff.per * recent);
}

/** Opt-in spell contact against a real pet, preserving its own guards and status state. */
export function abilityHitPet(world: World, caster: Unit, pet: Pet, ability: AbilitySpec, effects: Effect[], category: PetDamageCategory = "singleTarget", scale = 1, originX?: number): void {
  if (!world.pets.includes(pet) || pet.spec.untargetable) return;
  const target = petFormulaTarget(pet, caster, world.tick);
  if (!ability.flags?.petContactHooks) { petEffects(world, caster, pet, effects, category, ability.key, scale, originX); return; }
  // Hooks may use either the actual summon or this contact view. Share their memory
  // during the packet so a direct pet update is not replaced by the older view.
  pet.memory = target.memory;
  const packets = effects.map((effect) => effect.type === "damage" ? { ...effect, petDamageCategory: effect.petDamageCategory ?? category } : effect);
  abilityHit(world, caster, target, ability, packets, scale, originX, category);
  pet.statuses = target.statuses;
  pet.memory = target.memory;
}

function applyOnHit(world: World, attacker: Unit, target: Unit, bonus: Effect[], blocked: boolean, scale = 1, parried = false, critChance?: number, ability?: AbilitySpec, missed = false, replacement?: Effect[], incomingScale = scale): void {
  for (const effect of [...(replacement ?? attacker.spec.attack.onHit ?? []), ...bonus]) {
    if (blocked && (effect.type === "damage" || attacker.spec.attack.blockStopsOnHit)) continue;
    if (parried && effect.type !== "damage") continue;
    // A separate on-hit is a proc against hit-count pets, never another champion basic hit.
    applyEffect(world, attacker, target, effect, { attack: target.petId === undefined, scale, ...(critChance !== undefined ? { critChance } : {}) });
  }
  if (!parried && !missed) notifyIncomingOnHit(world, target, ability, attacker, incomingScale);
}

export function notifyIncomingOnHit(world: World, target: Unit, ability?: AbilitySpec, attacker?: Unit, scale = 1): void {
  const incoming = target.spec.hooks?.onIncomingOnHit;
  if (incoming) runHook(() => incoming({
    ...hookContext(world, target, undefined, attacker), attack: ability === undefined, scale, ...(ability ? { ability: ability.name } : {}),
    apply(effect, toSelf = false) {
      const packet = effect.type === "refund" && effect.seconds !== undefined ? { ...effect, seconds: effect.seconds * scale } : effect;
      applyEffect(world, target, toSelf ? target : attacker ?? world.units[other(target.side)], packet, { scale });
    },
  }));
}

/** A basic attack reaching its target; `split` deals its damage as shares of physical, magic and true damage. */
export function attackHit(world: World, attacker: Unit, target: Unit, blinded: boolean, bonusOnHit: Effect[], split?: AttackSplit, hitsUntargetable = false, options: AttackHitOptions = {}, scale = 1, originX?: number): void {
  if (originX === undefined) return resolveAttackHit(world, attacker, target, blinded, bonusOnHit, split, hitsUntargetable, options, scale);
  return withDamageOrigin(world, attacker, originX, () => resolveAttackHit(world, attacker, target, blinded, bonusOnHit, split, hitsUntargetable, options, scale));
}
function resolveAttackHit(world: World, attacker: Unit, target: Unit, blinded: boolean, bonusOnHit: Effect[], split: AttackSplit | undefined, hitsUntargetable: boolean, options: AttackHitOptions, scale: number): void {
  if (!(scale > 0) || !target.alive || inStasis(target) || (!hitsUntargetable && isUntargetable(target, attacker))) return;
  const critChance = Math.min(1, Math.max(0, options.critChance ?? derive(attacker).critChance));
  const targetPet = target.petId === undefined ? undefined : world.pets.find((pet) => pet.id === target.petId);
  const resolved = (blocked: boolean, missed: boolean) => {
    if (targetPet) {
      const hook = attacker.spec.hooks?.onAttackPetResolved;
      if (hook) runHook(() => hook({ ...hookContext(world, attacker, undefined, target), pet: targetPet, blocked, missed }));
      return;
    }
    const hook = attacker.spec.hooks?.onAttackResolved;
    if (hook && !targetPet) runHook(() => hook({ ...hookContext(world, attacker, undefined, target), blocked, missed }));
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
    const baseType = options.baseDamage?.damageType ?? (split && split.physical <= 0 ? split.magic > 0 ? "magic" : "true" : "physical");
    consumeSpellShield(world, attacker, target, undefined, [{ type: "damage", damageType: baseType, amount: options.baseDamage?.amount ?? { base: derive(attacker).ad } }, ...(attacker.spec.attack.onHit ?? []), ...bonusOnHit], packetOrigin(world, attacker));
    log(world, target.side, "spell shield blocks the empowered attack");
    resolved(true, false);
    return;
  }
  const onHitShield = !parried && options.spellShieldOnHit ? stateStatus(target, "spellShield") : undefined;
  if (onHitShield) {
    consumeSpellShield(world, attacker, target, undefined, bonusOnHit, packetOrigin(world, attacker));
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
  const beforeAttack = attacker.spec.hooks?.onAttackBeforeDamage;
  if (!parried && beforeAttack) runHook(() => {
    // The contact view is authoritative during the callback, as for abilityHitPet.
    if (targetPet) targetPet.memory = target.memory;
    beforeAttack({ ...hookContext(world, attacker, undefined, target), ...(targetPet ? { pet: targetPet } : {}), blocked, critChance, attack: options, scale });
    if (targetPet) { targetPet.memory = target.memory; targetPet.statuses = target.statuses; }
  });
  if (attacker.spec.attack.onHitBeforeDamage) applyOnHit(world, attacker, target, bonusOnHit, blocked, scale, parried, critChance, undefined, false, onHitShield ? undefined : options.attackOnHitReplacement);
  if (blocked) {
    log(world, target.side, "blocks the attack's damage");
    if (avoided) runHook(() => avoided(hookContext(world, target, undefined, attacker)));
  }
  else {
    for (const effect of attacker.spec.attack.beforeDamage ?? []) {
      const packet = targetPet && effect.type === "damage" ? { ...effect, petDamageCategory: effect.petDamageCategory ?? "proc" as const } : effect;
      applyEffect(world, attacker, target, packet, { attack: true, scale, critChance });
    }
    const d = derive(attacker);
    const damage = d.ad * (options.baseDamageScale ?? 1) * scale;
    const bonus = (options.bonusPhysical ? evaluate(options.bonusPhysical, attacker, target, critChance) : 0)
      + (attacker.spec.attack.bonusPhysicalFor?.(attacker, target, options) ?? 0);
    const scaledBonus = bonus * scale;
    const crit = { chance: critChance, multiplier: options.critMultiplier ?? d.critDamage, bonus: scaledBonus };
    if (options.baseDamage) {
      const replacement = options.baseDamage;
      dealDamage(world, attacker, target, evaluate(replacement.amount, attacker, target, critChance) * scale,
        replacement.damageType, { attack: true, petBasicAttack: true, ...(replacement.label ? { ability: replacement.label } : {}),
          ...(replacement.canCrit ? { crit: { chance: critChance, multiplier: options.critMultiplier ?? d.critDamage } } : {}) });
    } else if (split) {
      if (split.physical > 0) dealDamage(world, attacker, target, damage * split.physical, "physical", { attack: true, crit });
      if (split.magic > 0) dealDamage(world, attacker, target, damage * split.magic, "magic", { attack: true, crit: { ...crit, bonus: 0 } });
      if ((split.true ?? 0) > 0) dealDamage(world, attacker, target, damage * (split.true ?? 0), "true", { attack: true, crit: { ...crit, bonus: 0 } });
    } else dealDamage(world, attacker, target, damage, "physical", { attack: true, crit });
  }
  if (!attacker.spec.attack.onHitBeforeDamage) applyOnHit(world, attacker, target, bonusOnHit, blocked, scale, parried, critChance, undefined, false, onHitShield ? undefined : options.attackOnHitReplacement);
  if (parried) {
    resolved(true, false);
    return;
  }
  // Damage returned to attackers (Defensive Ball Curl): the state's value is the damage per attack.
  const reflect = stateStatus(target, "reflectAttacks");
  if (reflect && attacker.alive) dealDamage(world, target, attacker, reflect.value * scale, "magic", { ability: "reflected damage" });
  if (targetPet) {
    const onPetHit = attacker.spec.hooks?.onAttackPetHit;
    if (onPetHit) runHook(() => onPetHit({ ...hookContext(world, attacker, undefined, target), pet: targetPet, blocked, critChance, attack: options, scale }));
  } else {
    const onAttackHit = attacker.spec.hooks?.onAttackHit;
    if (onAttackHit) runHook(() => onAttackHit({ ...hookContext(world, attacker, undefined, target), blocked, critChance, attack: options, scale }));
  }
  resolved(blocked, false);
  });
}

export function notifyDashEnd(world: World, unit: Unit, key: string, interrupted: boolean): void {
  notifyActualMovement(world, unit, unit.x, { kind: "dash", endTick: world.tick, ended: true, ability: key });
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
    queueSplit(split) {
      const validate = (entry: import("./actions").PendingSplit): void => {
        if (!Number.isFinite(entry.chance) || entry.chance < 0 || entry.chance > 1) throw new Error("Invalid queued skillshot chance");
        for (const follow of entry.followUps ?? []) validate(follow);
      };
      validate(split);
      (world.pendingSplits ??= []).push(structuredClone(split));
    },
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
