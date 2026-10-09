/**
 * Resolving hits: every interaction rule the ledger lists, applied as the fight happens.
 *
 * Ability hits: untargetable targets are missed; a spell shield negates the ability and is
 * consumed; a parry (Riposte) negates it and stuns back if it negated an immobilizing effect;
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
import { derive, evaluate, hasState } from "./derived";
import type { AbilitySpec, BuffStat, Effect, HookContext } from "./spec";
import { type Side, type Status, type Unit, type World, other } from "./state";

export function log(world: World, side: Side, text: string): void {
  if (world.settings.log) world.log.push({ tick: world.tick, side, text });
}

export function addStatus(unit: Unit, status: Status): void {
  unit.statuses.push(status);
}

function stateStatus(unit: Unit, state: string): Status | undefined {
  return unit.statuses.find((s) => s.kind === "state" && s.key === state);
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
  attack?: boolean;
  ability?: string;
  /** Damage over time: it doesn't wake sleeping units (wiki: "Template:Tip data/Sleep"). */
  persistent?: boolean;
  /** The source heals this share of the health it removes. */
  lifesteal?: number;
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
  if (hasState(target, "invulnerable") || inStasis(target)) {
    log(world, target.side, `is invulnerable: ${Math.round(raw)} ${type} damage ignored`);
    return 0;
  }
  const s = derive(source);
  const t = derive(target);
  const resist =
    type === "physical"
      ? effectiveResist(t.armor, t.armorReduction, { flat: s.lethality, percent: s.armorPen })
      : type === "magic"
        ? effectiveResist(t.mr, t.mrReduction, { flat: s.magicPen, percent: s.magicPenPercent })
        : 0;
  const mitigated = mitigate(raw, type, resist, { dealt: s.damageDealt, received: t.damageReduction });
  const before = target.spec.hooks?.beforeDamageTaken;
  if (before && mitigated > 0) runHook(() => before({ ...hookContext(world, target), amount: mitigated }));
  const shields = target.statuses.filter((st) => st.kind === "shield");
  const views: Shield[] = shields.map((st) => ({
    amount: st.value,
    type: st.shieldType ?? "normal",
    endTick: st.endTick,
    ...(st.priority ? { priority: true } : {}),
  }));
  const left = absorbWithShields(mitigated, type, views);
  shields.forEach((st, i) => {
    st.value = views[i]?.amount ?? 0;
  });
  target.statuses = target.statuses.filter((st) => st.kind !== "shield" || st.value > 0);
  target.totals.absorbed += mitigated - left;
  // Sleep ends on any hit above 10 damage after mitigation, except damage over time.
  if (!ctx.persistent && mitigated > 10 && target.statuses.some((st) => st.kind === "cc" && st.key === "sleep")) {
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
  log(world, source.side, `${ctx.attack ? "attack" : (ctx.ability ?? "effect")} deals ${Math.round(mitigated)} ${type} damage${mitigated > left ? ` (${Math.round(mitigated - left)} absorbed)` : ""}`);
  if (ctx.attack && s.lifeSteal > 0) heal(world, source, removed * s.lifeSteal);
  if (ctx.lifesteal) heal(world, source, removed * ctx.lifesteal);
  const taken = target.spec.hooks?.onDamageTaken;
  if (taken && mitigated > 0) runHook(() => taken({ ...hookContext(world, target), amount: removed }));
  const dealt = source.spec.hooks?.onDamageDealt;
  if (dealt && mitigated > 0) {
    runHook(() =>
      dealt({ ...hookContext(world, source), amount: removed, attack: ctx.attack === true, persistent: ctx.persistent === true, ...(ctx.ability ? { ability: ctx.ability } : {}) }),
    );
  }
  return removed;
}

/**
 * Heals a unit; Grievous Wounds cuts healing and health regeneration alike. A unit brought to
 * 0 health this tick is dying and can't be healed back.
 */
export function heal(world: World, unit: Unit, amount: number, regeneration = false): void {
  if (!unit.alive || unit.hp <= 0 || amount <= 0) return;
  const grievous = unit.statuses.some((s) => s.kind === "grievousWounds");
  const healed = Math.min(derive(unit).maxHp - unit.hp, healingReceived(amount, grievous));
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
  const action = unit.action;
  if (!action) return;
  const rule = CC_RULES[type];
  if (action.kind === "windup") {
    // Taunt and berserk spare windups against their target, which in a duel is every windup.
    const stops = rule.attacking === "disabled" || (rule.attacking === "uncontrollable" && type !== "taunt" && type !== "berserk");
    // Uncancellable windups survive everything but polymorph (and death).
    if (stops && (!action.uncancellable || type === "polymorph")) {
      unit.action = undefined;
      log(world, unit.side, `attack windup interrupted by ${type}`);
    }
  } else if (action.kind === "channel") {
    const ability = unit.spec.abilities.find((a) => a.key === action.ability);
    const moves = ability?.delivery.kind === "dash" || ability?.delivery.kind === "blink";
    const stops = rule.interruptsChannels === "yes" || (rule.interruptsChannels === "movement" && moves);
    if (stops && ability?.channel?.interruptible !== false) {
      unit.action = undefined;
      log(world, unit.side, `${ability?.name ?? "channel"} interrupted by ${type}`);
    }
  } else if (action.kind === "dash" && type === "airborne" && !action.unstoppable) {
    unit.action = undefined;
    log(world, unit.side, "dash knocked down");
  }
}

/** Applies crowd control unless an immunity stops it; returns whether it took hold. */
export function applyCC(world: World, source: Unit, target: Unit, type: CCType, duration: number, strength = 0): boolean {
  if (!target.alive || inStasis(target)) return false;
  if (hasState(target, "ccImmune")) {
    log(world, target.side, `is immune to ${type}`);
    return false;
  }
  if (DISPLACEMENTS.has(type) && hasState(target, "displacementImmune")) return false;
  if ((type === "slow" || type === "cripple") && hasState(target, "slowImmune")) return false;
  const negate = IMMOBILIZING.has(type) ? stateStatus(target, "ccNegate") : undefined;
  if (negate) {
    negate.charges = (negate.charges ?? 1) - 1;
    if (negate.charges <= 0) target.statuses = target.statuses.filter((s) => s !== negate);
    log(world, target.side, `negates ${type}`);
    return false;
  }
  const ticks = toTicks(ccDuration(duration, type, derive(target).tenacity));
  if (ticks <= 0) return false;
  addStatus(target, { kind: "cc", key: type, source: source.side, startTick: world.tick, endTick: world.tick + ticks, value: strength });
  log(world, source.side, `${type}${strength ? ` ${Math.round(strength * 100)}%` : ""} for ${(ticks / 30).toFixed(2)} s`);
  interrupt(world, target, type);
  return true;
}

/**
 * Knock ups, knock backs and pulls: airborne, plus forced movement while it lasts. With walls
 * nearby, a knock back that reaches the wall behind the target stops there and stuns it.
 */
function displace(world: World, source: Unit, target: Unit, effect: Extract<Effect, { type: "displace" }>): void {
  const { direction, duration } = effect;
  if (!applyCC(world, source, target, "airborne", duration)) return;
  const ticks = Math.max(1, toTicks(duration));
  const env = world.settings.environment;
  const intoWall = effect.wallStun !== undefined && direction === "away" && env.walls && effect.distance >= env.wallDistance;
  let distance = intoWall ? env.wallDistance : effect.distance;
  if (effect.to !== undefined) distance = Math.max(0, Math.min(distance, Math.abs(target.x - source.x) - effect.to));
  if (distance > 0) target.forced = { endTick: world.tick + ticks, perTick: ((direction === "away" ? 1 : -1) * distance) / ticks };
  if (intoWall && effect.wallStun !== undefined) {
    const impact = Math.max(1, Math.round((ticks * env.wallDistance) / effect.distance));
    world.scheduled.push({ tick: world.tick + impact, owner: source.side, target: target.side, effects: [{ type: "cc", cc: "stun", duration: effect.wallStun }], scale: 1 });
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
}

/** Becoming untargetable drops every attack and targeted spell aimed at the unit. */
function dropTargeting(world: World, unit: Unit): void {
  const enemy = world.units[other(unit.side)];
  world.missiles = world.missiles.filter((m) => !(m.owner === enemy.side && m.homing));
  const action = enemy.action;
  if (action?.kind === "windup") {
    // The attack is lost and the attack timer resets, as with any cancelled windup.
    enemy.action = undefined;
    enemy.attackReadyTick = world.tick;
  }
  if (action?.kind === "cast") {
    const ability = enemy.spec.abilities.find((a) => a.key === action.ability);
    // A targeted spell whose target vanishes during its cast time is cancelled without a cooldown.
    if (ability?.delivery.kind === "target") enemy.action = undefined;
  }
}

export function applyEffect(world: World, caster: Unit, target: Unit, effect: Effect, ctx: HitContext): void {
  const tick = world.tick;
  switch (effect.type) {
    case "damage": {
      const d = derive(caster);
      const crit = effect.canCrit ? averageCritFactor(d.critChance, effect.critMultiplier ?? d.critDamage) : 1;
      dealDamage(world, caster, target, evaluate(effect.amount, caster, target) * crit * ctx.scale, effect.damageType, {
        ...(ctx.attack ? { attack: true } : {}),
        ...(effect.label || ctx.ability ? { ability: effect.label ?? ctx.ability?.name } : {}),
        ...(effect.lifesteal ? { lifesteal: effect.lifesteal } : {}),
      });
      return;
    }
    case "cc":
      applyCC(world, caster, target, effect.cc, effect.duration, effect.strength ?? 0);
      return;
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
        value: evaluate(effect.amount, caster, target),
        shieldType: effect.shieldType ?? "normal",
        ...(effect.priority ? { priority: true } : {}),
      });
      return;
    case "heal":
      heal(world, target, evaluate(effect.amount, caster, target) * ctx.scale);
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
        x: target.x,
      });
      if (effect.state === "untargetable" || effect.state === "stasis") dropTargeting(world, target);
      return;
    case "stat": {
      const value = evaluate(effect.amount, caster, target);
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
      const key = ctx.ability?.key ?? (ctx.attack ? "attack" : "dot");
      // A new application from the same source refreshes the old one (poisons, bleeds),
      // keeping its tick timer.
      const old = target.statuses.find((st) => st.kind === "dot" && st.source === caster.side && st.key === key);
      if (old) target.statuses = target.statuses.filter((st) => st !== old);
      const first = old?.dot && old.dot.nextTick > tick ? old.dot.nextTick : tick + intervalTicks;
      addStatus(target, {
        kind: "dot",
        key,
        source: caster.side,
        startTick: tick,
        endTick: first + intervalTicks * (hits - 1),
        value: 0,
        dot: { damageType: effect.damageType, perHit: (evaluate(effect.total, caster, target) * ctx.scale) / hits, intervalTicks, nextTick: first },
      });
      return;
    }
    case "grievousWounds":
      addStatus(target, { kind: "grievousWounds", key: "grievousWounds", source: caster.side, startTick: tick, endTick: tick + toTicks(effect.duration), value: 0.4 });
      return;
    case "cleanse": {
      const removable = (type: string) => (effect.types ? effect.types.includes(type as CCType) : type !== "stasis" && type !== "kinematics");
      const before = target.statuses.length;
      target.statuses = target.statuses.filter((s) => s.kind !== "cc" || !removable(s.key));
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
        empower: { attacks: effect.attacks, onHit: effect.onHit, bonusRange: effect.bonusRange ?? 0, uncancellable: effect.uncancellable ?? false },
      });
      if (effect.resetAttack) target.attackReadyTick = tick;
      return;
    case "resetAttack":
      target.attackReadyTick = tick;
      return;
    case "execute": {
      const threshold = evaluate(effect.threshold, caster, target);
      if (!target.alive || target.hp > threshold) return;
      if (hasState(target, "invulnerable") || inStasis(target)) return;
      // Executes leave units under a minimum health threshold at that threshold (wiki: "Minimum health threshold").
      const floor = stateStatus(target, "minimumHealth")?.value ?? 0;
      const removed = Math.max(0, target.hp - floor);
      target.totals.damageTaken += removed;
      caster.totals.damageDealt += removed;
      target.hp = Math.min(target.hp, floor);
      log(world, caster.side, floor === 0 ? "executes" : "execute stopped by a minimum health threshold");
      return;
    }
    case "resource":
      target.resource = Math.max(0, Math.min(target.spec.base.resource, target.resource + evaluate(effect.amount, caster, target)));
      return;
    case "refund": {
      const ready = caster.cooldownReady[effect.ability] ?? 0;
      const left = Math.max(0, ready - tick);
      const cut = (effect.seconds !== undefined ? toTicks(effect.seconds) : 0) + Math.round(left * (effect.fraction ?? 0));
      if (left > 0) caster.cooldownReady[effect.ability] = tick + Math.max(0, left - cut);
      return;
    }
    case "caster":
      for (const inner of effect.effects) applyEffect(world, caster, caster, inner, ctx);
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

/** An ability's effects reaching the enemy, after spell shields, parries, dodges and blocks. */
export function abilityHit(world: World, caster: Unit, target: Unit, ability: AbilitySpec, effects: Effect[], scale = 1): void {
  if (!target.alive || effects.length === 0) return;
  if (isUntargetable(target, caster)) {
    log(world, target.side, `is untargetable: ${ability.name} misses`);
    return;
  }
  const spellShield = stateStatus(target, "spellShield");
  if (spellShield && ability.flags?.spellShield !== false) {
    spellShield.charges = (spellShield.charges ?? 1) - 1;
    if (spellShield.charges <= 0) target.statuses = target.statuses.filter((s) => s !== spellShield);
    log(world, target.side, `spell shield blocks ${ability.name}`);
    return;
  }
  const parry = stateStatus(target, "parry");
  if (parry) {
    log(world, target.side, `parries ${ability.name}`);
    if (parry.value > 0 && effects.some(immobilizes)) applyCC(world, target, caster, "stun", parry.value);
    return;
  }
  if (ability.flags?.parry) {
    if (hasState(target, "dodgeAttacks")) {
      log(world, target.side, `dodges ${ability.name}`);
      return;
    }
  }
  const blocked = ability.flags?.parry === true && hasState(target, "blockAttacks");
  for (const effect of effects) {
    if (blocked && effect.type === "damage") continue;
    if (!target.alive && negates(effect)) continue;
    applyEffect(world, caster, target, effect, { ability, scale });
  }
  if (ability.flags?.appliesOnHit) applyOnHit(world, caster, target, [], blocked);
  const onAbilityHit = caster.spec.hooks?.onAbilityHit;
  if (onAbilityHit) runHook(() => onAbilityHit(hookContext(world, caster, ability)));
}

function applyOnHit(world: World, attacker: Unit, target: Unit, bonus: Effect[], blocked: boolean): void {
  for (const effect of [...(attacker.spec.attack.onHit ?? []), ...bonus]) {
    if (blocked && effect.type === "damage") continue;
    applyEffect(world, attacker, target, effect, { attack: true, scale: 1 });
  }
}

/** A basic attack reaching its target. */
export function attackHit(world: World, attacker: Unit, target: Unit, blinded: boolean, bonusOnHit: Effect[]): void {
  if (!target.alive || isUntargetable(target, attacker)) return;
  if (blinded) {
    log(world, attacker.side, "attack misses (blinded)");
    return;
  }
  const avoided = target.spec.hooks?.onAttackAvoided;
  if (hasState(target, "dodgeAttacks")) {
    log(world, target.side, "dodges the attack");
    if (avoided) runHook(() => avoided(hookContext(world, target)));
    return;
  }
  if (stateStatus(target, "parry")) {
    log(world, target.side, "parries the attack");
    if (avoided) runHook(() => avoided(hookContext(world, target)));
    return;
  }
  const blocked = hasState(target, "blockAttacks");
  if (blocked) {
    log(world, target.side, "blocks the attack's damage");
    if (avoided) runHook(() => avoided(hookContext(world, target)));
  }
  else {
    const d = derive(attacker);
    dealDamage(world, attacker, target, d.ad * averageCritFactor(d.critChance, d.critDamage), "physical", { attack: true });
  }
  applyOnHit(world, attacker, target, bonusOnHit, blocked);
  // Damage returned to attackers (Defensive Ball Curl): the state's value is the damage per attack.
  const reflect = stateStatus(target, "reflectAttacks");
  if (reflect && attacker.alive) dealDamage(world, target, attacker, reflect.value, "magic", { ability: "reflected damage" });
  const onAttackHit = attacker.spec.hooks?.onAttackHit;
  if (onAttackHit) runHook(() => onAttackHit(hookContext(world, attacker)));
}

export function hookContext(world: World, unit: Unit): HookContext;
export function hookContext(world: World, unit: Unit, ability: AbilitySpec): HookContext & { ability: AbilitySpec };
export function hookContext(world: World, unit: Unit, ability?: AbilitySpec): HookContext & { ability?: AbilitySpec } {
  const enemy = world.units[other(unit.side)];
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
      unit.statuses = unit.statuses.filter((s) => s !== existing);
      if (amount !== 0) addStatus(unit, { kind: "stat", key: stat, source: unit.side, startTick: world.tick, endTick: world.tick + toTicks(seconds), value: amount, memoKey: id });
    },
    regenerate(amount: number) {
      heal(world, unit, amount, true);
    },
    log(text: string) {
      log(world, unit.side, text);
    },
  };
}
