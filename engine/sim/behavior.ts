/**
 * How units decide what to do.
 *
 * A behavior maps what a unit can see to its next command. Fights split into copies on
 * uncertain skillshots, so a behavior keeps any state of its own in `unit.memory`.
 *
 * Perception: a unit learns of anything its enemy starts (an attack windup, a cast, a
 * missile, a ground area) only `reactionTime` after it starts. Positions, health, cooldowns
 * and statuses are always known. In a branch where a skillshot misses, the unit sidestepped
 * it, so it doesn't count it as a threat.
 *
 * The default behavior is generated from the kit (PLAN.md section 4.4): close the gap, lead
 * with crowd control, use damage on cooldown, weave attack resets between attacks, save
 * defensive tools for the threats they answer (a spell shield for a stun, a dodge for
 * attacks, untargetability for a big hit, a dash for a decisive skillshot), cleanse long
 * crowd control, and finish with executes. What it does with them depends on its mode
 * (state.ts).
 */
import { type CCType, IMMOBILIZING } from "../rules/crowdControl";
import { effectiveResist, resistMultiplier } from "../rules/damage";
import { averageCritFactor } from "../rules/defense";
import { toTicks } from "../rules/time";
import { EPSILON, attackRange, attackTiming, canCast, canStartAttack, empowerStatus, heldInPlace, heldUntil, inAttackRange, inReach } from "./actions";
import { edgeDistance, isUntargetable } from "./combat";
import { canAttack, canMove, ccTypes, derive, evaluate } from "./derived";
import { hitChance } from "./hitModel";
import type { AbilitySpec, Effect, Formula, StateType } from "./spec";
import { type Aim, type Mode, type Side, type Unit, type World, other } from "./state";

export type Command =
  | { kind: "attack" }
  /** `dodge`: the missile or area (by id) a dash or blink is cast to get out of. `aim`: where a location-targeted dash goes. */
  | { kind: "cast"; ability: string; dodge?: number; aim?: Aim }
  /** Walk toward the enemy (1), away from it (-1), or stop (0). */
  | { kind: "move"; direction: -1 | 0 | 1 };

/** Something the enemy started that will reach this unit. */
export interface Threat {
  /** "attack" or the enemy ability's key. */
  source: string;
  ability?: AbilitySpec;
  /** Ticks until it lands. */
  eta: number;
  /** The missile or area, when it is one. */
  id?: number;
  /** Unit-targeted, or a basic attack: untargetability drops it. */
  targeted: boolean;
  projectile: boolean;
  /** A skillshot the unit could dash out of. */
  skillshot: boolean;
  /** A basic attack, or an ability that strikes like one (dodges and blocks stop it). */
  attackLike: boolean;
  spellShieldable: boolean;
  immobilizes: boolean;
  cc: boolean;
  /** Damage before mitigation. */
  damage: number;
  /**
   * For areas: where they land, as positions on the line (the unit can walk out), and the
   * bands within that hit differently (a sweet spot, a handle), by where the center is.
   */
  area?: { from: number; to: number; bands?: Array<{ from: number; to: number; damage: number; cc: boolean }> };
  /** An attack expected from the enemy's attack rhythm rather than seen starting. */
  predicted?: boolean;
  /** A dash the enemy is starting or making. */
  dash?: boolean;
}

export interface View {
  world: World;
  self: Unit;
  enemy: Unit;
  mode: Mode;
  /** Edge-to-edge distance. */
  distance: number;
  threats: Threat[];
}

export type Behavior = (view: View) => Command | undefined;

// ---------------------------------------------------------------------------------------
// What an ability is for

/** States that answer a specific threat, so the default behavior saves them for one. */
const DEFENSIVE_STATES: ReadonlySet<StateType> = new Set<StateType>([
  "untargetable",
  "invulnerable",
  "stasis",
  "spellShield",
  "parry",
  "dodgeAttacks",
  "blockAttacks",
  "projectileBlock",
  "ccImmune",
  "minimumHealth",
  "antiDash",
]);

export interface Traits {
  damage: boolean;
  cc: boolean;
  immobilizes: boolean;
  /** A dash or blink toward the enemy. */
  engage: boolean;
  /** A dash or blink away from the enemy. */
  escape: boolean;
  /** Defensive states it gives the caster, with their duration in ticks. */
  defenses: Map<StateType, number>;
  /** The defensive states come up as the cast starts, not when it ends (Riposte). */
  defensesAtStart: boolean;
  /** Duration in ticks of a projectile wall it puts up (0 if none). */
  projectileWall: number;
  /** Shields, heals and damage reduction for the caster. */
  sustain: boolean;
  /** Stat buffs, empowered attacks and attack resets. */
  buff: boolean;
  /** Bonus movement speed: a way to close the gap. */
  haste: boolean;
  resetsAttack: boolean;
  execute?: Formula;
  cleanse: boolean;
}

function flatten(effects: Effect[]): Effect[] {
  return effects.flatMap((e) => (e.type === "delayed" ? flatten(e.effects) : [e]));
}

function immobilizing(effect: Effect): boolean {
  return (effect.type === "cc" && IMMOBILIZING.has(effect.cc)) || effect.type === "displace";
}

/** Effects an ability has on the enemy: on hit, while channeling and on completion. */
export function enemyEffects(ability: AbilitySpec): Effect[] {
  return flatten([...(ability.onHit ?? []), ...(ability.channel?.onTick ?? []), ...(ability.channel?.onComplete ?? [])]);
}

const traitCache = new WeakMap<AbilitySpec, Traits>();

export function traitsOf(ability: AbilitySpec): Traits {
  const cached = traitCache.get(ability);
  if (cached) return cached;
  const onEnemy = enemyEffects(ability);
  const onSelf = flatten([...(ability.onSelf ?? []), ...(ability.onCastStart ?? [])]);
  const d = ability.delivery;
  const moves = d.kind === "dash" || d.kind === "blink";
  const defenses = new Map<StateType, number>();
  let projectileWall = 0;
  for (const e of onSelf) {
    if (e.type === "state" && DEFENSIVE_STATES.has(e.state)) defenses.set(e.state, Math.max(defenses.get(e.state) ?? 0, toTicks(e.duration)));
    if (e.type === "projectileWall") projectileWall = Math.max(projectileWall, toTicks(e.duration));
  }
  const execute = onEnemy.find((e): e is Extract<Effect, { type: "execute" }> => e.type === "execute");
  // Kits whose hooks do the damage or crowd control say so with roles.
  const roles = new Set(ability.roles ?? []);
  const traits: Traits = {
    damage: roles.has("damage") || onEnemy.some((e) => e.type === "damage" || e.type === "dot"),
    cc: roles.has("cc") || onEnemy.some((e) => e.type === "cc" || e.type === "displace"),
    immobilizes: onEnemy.some(immobilizing),
    engage: moves && d.direction !== "away",
    escape: moves && d.direction === "away",
    defenses,
    defensesAtStart: (ability.onCastStart ?? []).some((e) => e.type === "state" && DEFENSIVE_STATES.has(e.state)),
    projectileWall,
    sustain: onSelf.some((e) => e.type === "shield" || e.type === "heal" || (e.type === "state" && e.state === "damageReduction")),
    buff: onSelf.some((e) => e.type === "stat" || e.type === "empower" || e.type === "resetAttack" || (e.type === "state" && e.state === "tenacity")),
    resetsAttack: onSelf.some((e) => e.type === "resetAttack" || (e.type === "empower" && e.resetAttack === true)),
    haste: onSelf.some((e) => e.type === "stat" && (e.stat === "moveSpeedPercent" || e.stat === "moveSpeedFlat")),
    ...(execute ? { execute: execute.threshold } : {}),
    cleanse: onSelf.some((e) => e.type === "cleanse"),
  };
  traitCache.set(ability, traits);
  return traits;
}

/** Abilities saved for the threats they answer instead of being used on cooldown. */
function reactive(ability: AbilitySpec, traits: Traits): boolean {
  if (ability.roles) return ability.roles.includes("defense") && !ability.roles.includes("damage") && !ability.roles.includes("cc");
  return traits.defenses.size > 0 || traits.projectileWall > 0 || traits.cleanse;
}

// ---------------------------------------------------------------------------------------
// Perception

function damageOf(effects: Effect[], caster: Unit, target: Unit, scale = 1): number {
  let total = 0;
  for (const e of effects) {
    if (e.type === "damage") total += evaluate(e.amount, caster, target);
    else if (e.type === "dot") total += evaluate(e.total, caster, target);
  }
  return total * scale;
}

function abilityThreat(ability: AbilitySpec, eta: number, caster: Unit, target: Unit, effects: Effect[], id?: number, scale = 1): Threat {
  const d = ability.delivery;
  return {
    source: ability.key,
    ability,
    eta,
    ...(id !== undefined ? { id } : {}),
    targeted: d.kind === "target",
    projectile: (d.kind === "target" && d.missileSpeed !== undefined) || (d.kind === "line" && d.speed !== undefined) ? (ability.flags?.projectile ?? true) : false,
    skillshot: d.kind === "line" || d.kind === "circle",
    attackLike: ability.flags?.parry === true,
    spellShieldable: ability.flags?.spellShield !== false,
    immobilizes: effects.some(immobilizing),
    cc: effects.some((e) => e.type === "cc" || e.type === "displace"),
    damage: damageOf(effects, caster, target, scale),
  };
}

function attackThreat(attacker: Unit, target: Unit, eta: number, bonusOnHit: Effect[], id?: number): Threat {
  const d = derive(attacker);
  const effects = [...(attacker.spec.attack.onHit ?? []), ...bonusOnHit];
  return {
    source: "attack",
    eta,
    ...(id !== undefined ? { id } : {}),
    targeted: true,
    projectile: attacker.spec.attack.projectile && Boolean(attacker.spec.attack.missileSpeed),
    skillshot: false,
    attackLike: true,
    spellShieldable: false,
    immobilizes: effects.some(immobilizing),
    cc: effects.some((e) => e.type === "cc" || e.type === "displace"),
    damage: d.ad * averageCritFactor(d.critChance, d.critDamage) + damageOf(effects, attacker, target),
  };
}

/** Ticks a missile fired now from `from` takes to reach `to`'s hitbox. */
function travelTicks(from: Unit, to: Unit, speed: number | undefined): number {
  if (!speed) return 0;
  return Math.ceil(Math.max(0, Math.abs(to.x - from.x) - to.spec.base.radius) / (speed / 30));
}

/** Threats the unit has had time to notice. */
/** Where an area lands on the line: `near` to `far` units in front of `x`, toward `toward`, with its bands. */
function areaOnLine(
  x: number,
  toward: number,
  near: number,
  far: number,
  bands: Array<{ from: number; to: number; onHit: Effect[] }> | undefined,
  caster: Unit,
  target: Unit,
  centered = false,
): NonNullable<Threat["area"]> {
  const dir = x <= toward ? 1 : -1;
  const span = (a: number, b: number) => ({ from: Math.min(x + dir * a, x + dir * b), to: Math.max(x + dir * a, x + dir * b) });
  // An area that goes by the center is, for the hitbox, smaller by its radius on each side.
  const inset = centered ? target.spec.base.radius : 0;
  const whole = span(near, far);
  return {
    from: whole.from + inset,
    to: whole.to - inset,
    ...(bands
      ? { bands: bands.map((b) => ({ ...span(b.from, b.to), damage: damageOf(b.onHit, caster, target), cc: b.onHit.some((e) => e.type === "cc" || e.type === "displace") })) }
      : {}),
  };
}

export function threatsTo(world: World, side: Side): Threat[] {
  const self = world.units[side];
  const enemy = world.units[other(side)];
  const seenBy = world.tick - toTicks(world.settings.reactionTime);
  const threats: Threat[] = [];
  // A cast held under an overlay dash still lands when the dash ends.
  const held = enemy.action?.kind === "dash" ? enemy.action.resume : undefined;
  for (const action of [enemy.action, held]) {
    if (!action || action.startTick > seenBy) continue;
    const ability = "ability" in action ? enemy.spec.abilities.find((a) => a.key === action.ability) : undefined;
    const now = world.tick;
    if (action.kind === "windup") {
      threats.push(attackThreat(enemy, self, action.launchTick - now + travelTicks(enemy, self, enemy.spec.attack.missileSpeed), action.onHit));
    } else if (action.kind === "cast" && ability) {
      const d = ability.delivery;
      const travel =
        d.kind === "line"
          ? travelTicks(enemy, self, d.speed)
          : d.kind === "target"
            ? travelTicks(enemy, self, d.missileSpeed)
            : d.kind === "circle" || d.kind === "area"
              ? toTicks(d.delay)
              : d.kind === "dash"
                ? Math.ceil(d.distance / (d.speed / 30))
                : 0;
      const threat = abilityThreat(ability, Math.max(action.endTick - now, 0) + travel, enemy, self, ability.onHit ?? []);
      if (d.kind === "dash" && d.direction !== "away") threat.dash = true;
      // Where the area will land, as far as can be told now.
      if (d.kind === "area") threat.area = areaOnLine(enemy.x, self.x, d.near, d.far, d.bands, enemy, self, d.centered);
      threats.push(threat);
    } else if (action.kind === "channel" && ability?.channel) {
      if (ability.channel.onTick && action.nextTick < action.endTick) threats.push(abilityThreat(ability, action.nextTick - now, enemy, self, ability.channel.onTick));
      if (ability.channel.onComplete) threats.push(abilityThreat(ability, action.endTick - now, enemy, self, ability.channel.onComplete));
    } else if (action.kind === "dash" && ability && ability.delivery.kind === "dash" && ability.delivery.direction !== "away") {
      threats.push({ ...abilityThreat(ability, action.endTick - now, enemy, self, ability.onHit ?? []), dash: true });
    }
  }
  // An enemy attacking on its rhythm: its next attack can be seen coming, even when windups are quicker than reactions.
  if (!threats.some((t) => t.source === "attack") && enemy.alive && !enemy.action && canAttack(enemy) && inAttackRange(enemy, self)) {
    const windup = attackTiming(enemy).windup;
    const eta = Math.max(0, enemy.attackReadyTick - world.tick) + windup + travelTicks(enemy, self, enemy.spec.attack.missileSpeed);
    threats.push({ ...attackThreat(enemy, self, eta, []), predicted: true });
  }
  for (const m of world.missiles) {
    if (m.owner !== enemy.side || m.seenTick > seenBy || !m.connects) continue;
    const eta = Math.ceil(Math.max(0, Math.abs(self.x - m.x) - self.spec.base.radius) / m.perTick);
    if (m.attack) threats.push({ ...attackThreat(enemy, self, eta, m.attack.bonusOnHit, m.id), projectile: m.projectile });
    else {
      const ability = enemy.spec.abilities.find((a) => a.key === m.source);
      if (ability) threats.push({ ...abilityThreat(ability, eta, enemy, self, m.onHit, m.id, m.scale), projectile: m.projectile });
    }
  }
  for (const z of world.zones) {
    if (z.owner !== enemy.side || z.kind !== "delayedArea" || z.seenTick > seenBy || !z.connects) continue;
    const ability = enemy.spec.abilities.find((a) => a.key === z.ability);
    if (!ability) continue;
    const threat = abilityThreat(ability, z.endTick - world.tick, enemy, self, z.onHit ?? [], z.id, z.scale ?? 1);
    if (ability.delivery.kind === "area") {
      // Where it will land: areas that follow their caster are where it is now.
      if (z.follow) threat.area = areaOnLine(enemy.x, self.x, z.follow.near, z.follow.far, z.follow.bands, enemy, self, z.centered);
      else {
        const bands = z.bands?.map((b) => ({ from: Math.min(b.from, b.to), to: Math.max(b.from, b.to), damage: damageOf(b.onHit, enemy, self), cc: b.onHit.some((e) => e.type === "cc" || e.type === "displace") }));
        const inset = z.centered ? self.spec.base.radius : 0;
        threat.area = { from: z.x - z.radius + inset, to: z.x + z.radius - inset, ...(bands ? { bands } : {}) };
      }
    }
    threats.push(threat);
  }
  return threats;
}

export function perceive(world: World, side: Side): View {
  const self = world.units[side];
  const enemy = world.units[other(side)];
  return { world, self, enemy, mode: world.modes[side], distance: edgeDistance(self, enemy), threats: threatsTo(world, side) };
}

/** Damage after the target's resistances and the caster's penetration, for deciding whether a hit kills. */
export function expectedDamage(effects: Effect[], caster: Unit, target: Unit): number {
  const c = derive(caster);
  const t = derive(target);
  const multiplier = {
    physical: resistMultiplier(effectiveResist(t.armor, t.armorReduction, { flat: c.lethality })),
    magic: resistMultiplier(effectiveResist(t.mr, t.mrReduction, { flat: c.magicPen })),
    true: 1,
  };
  const reduction = t.damageReduction.reduce((product, r) => product * (1 - r), 1);
  let total = 0;
  for (const e of effects) {
    if (e.type === "damage") total += evaluate(e.amount, caster, target) * multiplier[e.damageType] * reduction;
    else if (e.type === "dot") total += evaluate(e.total, caster, target) * multiplier[e.damageType] * reduction;
  }
  return total;
}

function shieldsOf(unit: Unit): number {
  return unit.statuses.filter((s) => s.kind === "shield").reduce((sum, s) => sum + s.value, 0);
}

// ---------------------------------------------------------------------------------------
// Reactions

function big(view: View, threat: Threat): boolean {
  return threat.immobilizes || threat.damage >= view.world.settings.decisiveDamage * derive(view.self).maxHp || threat.damage >= view.self.hp;
}

function answers(view: View, state: StateType, t: Threat): boolean {
  // Only dodges and blocks are spent on attacks that are expected but not yet seen.
  if (t.predicted && state !== "dodgeAttacks" && state !== "blockAttacks") return false;
  switch (state) {
    case "spellShield":
      return t.ability !== undefined && t.spellShieldable && big(view, t);
    case "parry":
      return t.ability !== undefined ? big(view, t) : t.damage >= view.self.hp;
    case "untargetable":
    case "invulnerable":
    case "stasis":
      return t.ability !== undefined ? big(view, t) : t.damage >= view.self.hp;
    case "dodgeAttacks":
    case "blockAttacks":
      return t.attackLike;
    case "projectileBlock":
      return t.projectile;
    case "ccImmune":
      return t.immobilizes;
    case "minimumHealth":
      return t.damage >= view.self.hp;
    case "antiDash":
      return t.dash === true;
    default:
      return false;
  }
}

/** Share of maximum health below which death-prevention abilities are used without a visible threat. */
const LOW_HEALTH = 0.15;

/** Ticks the worst crowd control on the unit still lasts, counting only types that stop it from acting. */
function disabledFor(unit: Unit, tick: number): number {
  let longest = 0;
  for (const s of unit.statuses) {
    if (s.kind === "cc" && IMMOBILIZING.has(s.key as CCType)) longest = Math.max(longest, s.endTick - tick);
  }
  return longest;
}

/**
 * Walks out of an area that is about to land, when it can make it: away past its far edge,
 * or in past its near edge when there is room between the area and its caster.
 */
/** How much an area's hit is worth avoiding: crowd control first, then damage. */
function harm(damage: number, cc: boolean): number {
  return (cc ? 1e6 : 0) + damage;
}

/**
 * Walks out of an area about to land, or failing that out of its worst part into a milder
 * one (out of a sweet spot, into a handle): the reachable spot where its hit is mildest.
 */
function sidestep(view: View): Command | undefined {
  const { self, enemy } = view;
  if (!canMove(self) || (self.action && self.action.kind !== "windup")) return undefined;
  const speed = derive(self).moveSpeed / 30;
  const r = self.spec.base.radius;
  const away = self.x >= enemy.x ? 1 : -1;
  // The closest the unit can stand to the enemy: champions don't walk through each other.
  const closest = enemy.x + away * (enemy.spec.base.pathingRadius + self.spec.base.pathingRadius);
  for (const t of view.threats) {
    // Any area worth avoiding: it hurts or disables.
    const area = t.area;
    if (!area || (t.damage <= 0 && !t.cc)) continue;
    const harmAt = (x: number) => {
      // The area hits the hitbox; its bands go by where the center is.
      if (x + r < area.from || x - r > area.to) return 0;
      const band = area.bands?.find((b) => x >= b.from - EPSILON && x <= b.to + EPSILON);
      return band ? harm(band.damage, band.cc) : harm(t.damage, t.cc);
    };
    const here = harmAt(self.x);
    if (here <= 0) continue;
    const reach = speed * (t.eta - 1);
    const spots = [area.from - r - 1, area.to + r + 1, ...(area.bands ?? []).flatMap((b) => [b.from - 1, b.to + 1])];
    let best: number | undefined;
    let bestHarm = here;
    for (const x of spots) {
      if (Math.abs(x - self.x) > reach || (x - closest) * away < 0) continue;
      const h = harmAt(x);
      if (h < bestHarm - EPSILON || (best !== undefined && Math.abs(h - bestHarm) <= EPSILON && Math.abs(x - self.x) < Math.abs(best - self.x))) {
        best = x;
        bestHarm = h;
      }
    }
    if (best !== undefined) return { kind: "move", direction: (best - self.x) * away > 0 ? -1 : 1 };
  }
  return undefined;
}

/** Uses a defensive tool, a cleanse or a dash when something it answers is about to land. */
export function react(view: View): Command | undefined {
  const step = sidestep(view);
  if (step) return step;
  const { world, self } = view;
  const low = self.hp < LOW_HEALTH * derive(self).maxHp && inCombat(view);
  for (const ability of self.spec.abilities) {
    if (!canCast(world, self, ability)) continue;
    const traits = traitsOf(ability);
    // A minimum health threshold also goes up when health runs low under steady damage.
    if (low && traits.defenses.has("minimumHealth")) return { kind: "cast", ability: ability.key };
    const activation = traits.defensesAtStart ? 0 : toTicks(ability.castTime);
    // It must be up before the threat lands and still up when it does.
    const inWindow = (t: Threat, duration: number) => t.eta > activation && t.eta < activation + duration;
    if (traits.cleanse && disabledFor(self, world.tick) >= 15) return { kind: "cast", ability: ability.key };
    for (const [state, duration] of traits.defenses) {
      if (view.threats.some((t) => inWindow(t, duration) && answers(view, state, t))) return { kind: "cast", ability: ability.key };
    }
    if (traits.projectileWall && view.threats.some((t) => inWindow(t, traits.projectileWall) && t.projectile && (t.ability !== undefined || t.damage >= self.hp))) {
      return { kind: "cast", ability: ability.key };
    }
    if (traits.engage || traits.escape) {
      if (traits.engage && view.mode === "flee") continue;
      const shot = view.threats.find((t) => t.skillshot && t.id !== undefined && t.eta > activation && big(view, t));
      if (shot?.id !== undefined) return { kind: "cast", ability: ability.key, dodge: shot.id };
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------------------
// Playing the mode

/** The enemy's center-to-center reach with its basic attack. */
function enemyAttackReach(view: View): number {
  return attackRange(view.enemy) + view.self.spec.base.radius + view.enemy.spec.base.radius;
}

function inCombat(view: View): boolean {
  return Math.abs(view.self.x - view.enemy.x) <= enemyAttackReach(view) + 150 || view.threats.length > 0;
}

/** Whether a crowd-control skillshot is worth throwing now: the enemy is likely to be hit. */
function worthThrowing(view: View, ability: AbilitySpec): boolean {
  const { world, self, enemy } = view;
  const d = ability.delivery;
  if (d.kind !== "line" && d.kind !== "circle") return true;
  const travel = d.kind === "line" ? travelTicks(self, enemy, d.speed) / 30 : d.delay;
  const timeToLand = ability.castTime + travel;
  const chance = hitChance(
    { timeToLand, reach: d.kind === "line" ? d.width / 2 : d.radius },
    { radius: enemy.spec.base.radius, moveSpeed: derive(enemy).moveSpeed, heldInPlace: heldInPlace(enemy, world.tick + toTicks(timeToLand)), heldFor: Math.max(0, heldUntil(enemy) - world.tick) / 30, hasEscape: false },
    world.settings.reactionTime,
    world.settings.hitSpread,
  );
  return chance >= 0.35;
}

/** Edge-to-edge distance within which a movement speed boost is spent to close the gap. */
const HASTE_REACH = 900;

interface OffenseOptions {
  /** Ultimates are kept out of short trades. */
  ultimates: boolean;
  /** Gap closers: off when kiting. */
  engage: boolean;
}

/** Offensive casts and attacks, best first: executes, crowd control, damage, gap closers, buffs. */
function offense(view: View, options: OffenseOptions): Command | undefined {
  const { world, self, enemy } = view;
  if (!enemy.alive) return undefined;
  const usable = self.spec.abilities.filter((a) => {
    const traits = traitsOf(a);
    if (reactive(a, traits) || (!options.ultimates && a.slot === "R")) return false;
    // Pure escapes are saved for getting away.
    if (traits.escape && !traits.damage && !traits.cc) return false;
    return canCast(world, self, a);
  });
  for (const ability of usable) {
    const threshold = traitsOf(ability).execute;
    const finisher = ability.roles?.includes("finisher");
    if (!threshold && !finisher) continue;
    if (!inReach(ability, self, enemy)) continue;
    const kills = threshold
      ? enemy.hp <= evaluate(threshold, self, enemy) + damageOf(ability.onHit ?? [], self, enemy) * 0.5
      : expectedDamage(enemyEffects(ability), self, enemy) >= enemy.hp + shieldsOf(enemy);
    if (kills) return { kind: "cast", ability: ability.key };
  }
  const rank = (a: AbilitySpec) => {
    const t = traitsOf(a);
    return t.immobilizes ? 0 : t.cc ? 1 : t.damage ? 2 : t.engage ? 3 : 4;
  };
  for (const ability of [...usable].sort((a, b) => rank(a) - rank(b))) {
    if (ability.roles?.includes("finisher")) continue;
    const traits = traitsOf(ability);
    const d = ability.delivery;
    if (traits.engage) {
      if (!options.engage) continue;
      if (traits.damage || traits.cc) {
        if (inReach(ability, self, enemy)) return { kind: "cast", ability: ability.key };
        continue;
      }
      // A gap closer: worth it when out of attack range and the dash brings the enemy into it.
      const reach = (d.kind === "dash" || d.kind === "blink" ? d.distance : 0) + attackRange(self);
      if (!inAttackRange(self, enemy) && view.distance <= reach) return { kind: "cast", ability: ability.key };
      continue;
    }
    if (traits.cc || traits.damage) {
      if (!inReach(ability, self, enemy)) continue;
      if (traits.cc && !worthThrowing(view, ability)) continue;
      return { kind: "cast", ability: ability.key };
    }
    if (traits.sustain) {
      if (inCombat(view) && self.hp < derive(self).maxHp * 0.9) return { kind: "cast", ability: ability.key };
      continue;
    }
    if (traits.haste && options.engage && !inAttackRange(self, enemy) && view.distance <= HASTE_REACH) return { kind: "cast", ability: ability.key };
    if (traits.buff || ability.roles?.includes("buff")) {
      if (!inAttackRange(self, enemy) || empowerStatus(self)?.key === ability.key) continue;
      // Attack resets go between attacks; other buffs before the next one.
      if (traits.resetsAttack ? self.attackReadyTick > world.tick + 1 : self.attackReadyTick <= world.tick + 1) return { kind: "cast", ability: ability.key };
    }
  }
  if (canStartAttack(world, self) && !outrunsWindup(view)) return { kind: "attack" };
  return undefined;
}

/** Edge-to-edge units the enemy will open up during this unit's windup if it keeps walking away. */
function escapeDuringWindup(view: View): number {
  const { self, enemy } = view;
  if (enemy.moved !== -1 || !canMove(enemy) || enemy.action !== undefined) return 0;
  return derive(enemy).moveSpeed * (attackTiming(self).windup / 30);
}

/** Whether an enemy walking away would leave attack range before the windup ends (cancelling it). */
function outrunsWindup(view: View): boolean {
  const gap = escapeDuringWindup(view);
  return gap > 0 && view.distance + gap > attackRange(view.self);
}

/** Walking: melee stay on the enemy; units that out-range it step back between attacks. */
function spacing(view: View, kite: boolean): Command {
  const { world, self, enemy } = view;
  const range = attackRange(self);
  // An enemy only targetable from up close (Hallowed Mist): go in.
  if (isUntargetable(enemy, self) && !isUntargetable(enemy)) return { kind: "move", direction: 1 };
  // Chasing: get close enough that the next windup completes before the enemy walks out of range.
  if (view.distance > range || (!kite && outrunsWindup(view))) return { kind: "move", direction: 1 };
  const outranges = range > attackRange(enemy) + 50;
  if ((kite || outranges) && self.attackReadyTick > world.tick + 1 && view.distance < range - 25) return { kind: "move", direction: -1 };
  return { kind: "move", direction: 0 };
}

function escapeCommand(view: View): Command | undefined {
  const { world, self, enemy } = view;
  for (const ability of self.spec.abilities) {
    const traits = traitsOf(ability);
    if (traits.escape && canCast(world, self, ability)) return { kind: "cast", ability: ability.key };
  }
  // Peel with crowd control that lands.
  for (const ability of self.spec.abilities) {
    const traits = traitsOf(ability);
    if (traits.cc && !traits.engage && canCast(world, self, ability) && inReach(ability, self, enemy) && worthThrowing(view, ability)) return { kind: "cast", ability: ability.key };
  }
  return undefined;
}

function trade(view: View): Command | undefined {
  const { world, self } = view;
  const memory = self.memory;
  if (memory.tradeStart === undefined && inCombat(view) && view.distance <= attackRange(self) + 50) memory.tradeStart = world.tick;
  if (!memory.tradeDone && typeof memory.tradeStart === "number") {
    const timeUp = world.tick - memory.tradeStart >= toTicks(world.settings.tradeSeconds);
    const burstLeft = self.spec.abilities.some((a) => {
      const traits = traitsOf(a);
      return a.slot !== "R" && (traits.damage || traits.cc) && !reactive(a, traits) && canCast(world, self, a);
    });
    // One attack after the burst, then out.
    const attacked = self.attackReadyTick > world.tick && self.action?.kind !== "windup";
    if (timeUp || (!burstLeft && attacked)) memory.tradeDone = true;
  }
  if (memory.tradeDone) return { kind: "move", direction: -1 };
  return offense(view, { ultimates: false, engage: true }) ?? spacing(view, false);
}

export const defaultBehavior: Behavior = (view) => {
  const { self, mode } = view;
  if (mode === "idle" || !self.alive) return undefined;
  const action = self.action;
  if (action && action.kind !== "windup") {
    // Busy: only walking, during casts and channels that allow it.
    const ability = "ability" in action ? self.spec.abilities.find((a) => a.key === action.ability) : undefined;
    const walks = (action.kind === "cast" && ability?.moveWhileCasting) || (action.kind === "channel" && ability?.channel?.mobile);
    if (!walks) return undefined;
    return { kind: "move", direction: mode === "flee" || self.memory.tradeDone ? -1 : 1 };
  }
  const reaction = react(view);
  if (reaction) return reaction;
  if (action?.kind === "windup") return undefined;
  if (ccTypes(self).size > 0 && !canAct(self)) return undefined;
  switch (mode) {
    case "fight":
      return offense(view, { ultimates: true, engage: true }) ?? spacing(view, false);
    case "trade":
      return trade(view);
    case "hold": {
      const command = offense(view, { ultimates: false, engage: true });
      if (command) return command;
      const move = spacing(view, false);
      // Don't walk after the enemy.
      return move.kind === "move" && move.direction === 1 ? { kind: "move", direction: 0 } : move;
    }
    case "kite": {
      if (view.distance < attackRange(view.enemy) + 25) {
        const escape = escapeCommand(view);
        if (escape) return escape;
      }
      return offense(view, { ultimates: true, engage: false }) ?? spacing(view, true);
    }
    case "flee":
      if (view.distance <= attackRange(view.enemy) + 300) {
        const escape = escapeCommand(view);
        if (escape) return escape;
      }
      return { kind: "move", direction: -1 };
  }
  return undefined;
};

/** Whether crowd control leaves the unit any choice at all. */
function canAct(unit: Unit): boolean {
  for (const type of ccTypes(unit)) if (IMMOBILIZING.has(type)) return false;
  return true;
}
