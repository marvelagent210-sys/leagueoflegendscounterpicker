/**
 * What item effects use during a fight: their memory keys, combat status, which hits were
 * ability damage, omnivamp, and stats that follow other stats. Hooks keep their state in
 * `unit.memory` and `unit.statuses`, because fights are copied when they branch.
 */
import { toTicks } from "../engine/rules/time";
import { addStatus, heal } from "../engine/sim/combat";
import { derive } from "../engine/sim/derived";
import type { AbilitySpec, BuffStat, HookContext, KitHooks } from "../engine/sim/spec";
import type { Status, Unit } from "../engine/sim/state";

/** The ability key of an item's active, set apart from the kit's abilities. */
export const activeKey = (item: string) => `item:${item}`;

export function isItemActive(ability: AbilitySpec | undefined): boolean {
  return ability?.key.startsWith("item:") === true;
}

/** A champion ability cast, as passives that trigger "after using an ability" count them: no item actives or toggles that aren't casts. */
export function championCast(ability: AbilitySpec): boolean {
  return !isItemActive(ability) && ability.countsAsCast !== false;
}

/** An item's own memory key. */
export const memo = (item: string, what: string) => `item:${item}:${what}`;

/** The tick a timer in memory runs until, or minus infinity when it isn't set. */
export function until(unit: Unit, key: string): number {
  const value = unit.memory[key];
  return typeof value === "number" ? value : Number.NEGATIVE_INFINITY;
}

// ---------------------------------------------------------------------------------------
// Combat status

const COMBAT_LAST = "item:combat:last";
const COMBAT_SINCE = "item:combat:since";

/** Whether the holder is in combat, and for how long; with the hooks that keep it. */
export interface CombatStatus {
  inCombat(unit: Unit, tick: number): boolean;
  /** Seconds since this stretch of combat began (0 out of combat): "for each second in combat". */
  seconds(unit: Unit, tick: number): number;
  /** Seconds since the holder last dealt or took damage or crowd control (infinity before the first). */
  idle(unit: Unit, tick: number): number;
  hooks: KitHooks;
}

/**
 * Wiki "Combat status": a unit is in combat on dealing or taking damage or crowd control, and
 * out-of-combat effects trigger `outOfCombat` seconds after. Champion damage and crowd control
 * only: a duel has no other units.
 */
export function combatStatus(outOfCombat: number): CombatStatus {
  const window = toTicks(outOfCombat);
  const inCombat = (unit: Unit, tick: number) => tick - until(unit, COMBAT_LAST) < window;
  const mark = (unit: Unit, tick: number) => {
    if (!inCombat(unit, tick)) unit.memory[COMBAT_SINCE] = tick;
    unit.memory[COMBAT_LAST] = tick;
  };
  return {
    inCombat,
    seconds: (unit, tick) => (inCombat(unit, tick) ? (tick - until(unit, COMBAT_SINCE)) / 30 : 0),
    idle: (unit, tick) => (tick - until(unit, COMBAT_LAST)) / 30,
    hooks: {
      onDamageDealt: (ctx) => mark(ctx.self, ctx.tick),
      onDamageTaken: (ctx) => mark(ctx.self, ctx.tick),
      onCCApplied: (ctx) => mark(ctx.self, ctx.tick),
      onEnemyCCApplied: (ctx) => mark(ctx.self, ctx.tick),
    },
  };
}

// ---------------------------------------------------------------------------------------
// Kinds of damage

/** A hit as damage hooks report it. */
export interface Hit {
  attack: boolean;
  ability?: string;
  persistent: boolean;
}

/**
 * Damage the holder's items deal is labeled with the item's name. Ability damage is what the
 * kit deals other than its basic attacks: its abilities, their damage over time and its innate.
 */
export function isAbilityDamage(hit: Hit, itemNames: ReadonlySet<string>): boolean {
  return !hit.attack && !(hit.ability !== undefined && itemNames.has(hit.ability));
}

// ---------------------------------------------------------------------------------------
// Statuses an item keeps

/** The holder's status with this memo key, if it has one. */
export function ownStatus(unit: Unit, key: string): Status | undefined {
  return unit.statuses.find((status) => status.memoKey === key);
}

/** Sets a stat status by memo key until `endTick`, replacing its value; 0 removes it. A debuff on the enemy names its `source`. */
export function setStat(unit: Unit, key: string, stat: BuffStat | typeof OMNIVAMP, value: number, tick: number, endTick = Number.POSITIVE_INFINITY, source = unit.side): void {
  const status = ownStatus(unit, key);
  if (value === 0) {
    if (status) unit.statuses = unit.statuses.filter((s) => s !== status);
    return;
  }
  if (status && status.key === stat) {
    status.value = value;
    status.endTick = endTick;
    return;
  }
  if (status) unit.statuses = unit.statuses.filter((s) => s !== status);
  addStatus(unit, { kind: "stat", key: stat, source, startTick: tick, endTick, value, memoKey: key });
}

/**
 * A stat that follows a value of the holder's (Overlord's Bloodmail's attack damage from bonus
 * health): set before the fight, and kept up to date as the value changes, in steps of `step`
 * so that small changes don't churn the holder's statuses. `value` gets the stat's current
 * amount, for stats that depend on themselves (Rabadon's Deathcap's share of total AP).
 */
export function follow(key: string, stat: BuffStat, value: (self: Unit, current: number, ctx: HookContext) => number, step = 0.5): KitHooks {
  const update = (ctx: HookContext) => {
    const current = ownStatus(ctx.self, key)?.value ?? 0;
    const wanted = value(ctx.self, current, ctx);
    if (Math.abs(wanted - current) >= step || (wanted === 0 && current !== 0)) setStat(ctx.self, key, stat, wanted, ctx.tick);
  };
  return { onStart: update, onTick: update };
}

// ---------------------------------------------------------------------------------------
// Omnivamp

/** Timed omnivamp from item passives, as a stat status of its own (the simulator has no omnivamp stat). */
export const OMNIVAMP = "item:omnivamp";

/**
 * Wiki "Vamp": omnivamp heals for a share of the post-mitigation physical, magic and true damage
 * dealt, stacks additively and doesn't benefit from heal and shield power. Its healing ignores
 * Glory in Death's ban on healing, as life steal's does.
 */
export function omnivampHooks(rate: number): KitHooks {
  return {
    onDamageDealt(ctx) {
      if (ctx.petSource) return;
      let total = rate;
      for (const status of ctx.self.statuses) if (status.kind === "stat" && status.key === OMNIVAMP) total += status.value;
      if (total > 0) heal(ctx.world, ctx.self, ctx.mitigated * total, false, true);
    },
  };
}

/** The holder's bonus health: maximum health above its base. */
export function bonusHealth(unit: Unit): number {
  return derive(unit).maxHp - unit.spec.base.hp;
}

/** The holder's bonus mana: maximum mana above its base, for mana champions. */
export function bonusMana(unit: Unit, baseMana: number): number {
  return unit.spec.resourceType === "Mana" ? Math.max(0, derive(unit).maxResource - baseMana) : 0;
}

// ---------------------------------------------------------------------------------------
// Stasis

/** Whether an item holds the unit in stasis (Zhonya's Hourglass, Guardian Angel). */
export function inItemStasis(unit: Unit): boolean {
  return unit.statuses.some((status) => status.kind === "state" && status.key === "stasis" && status.ability?.startsWith("item:") === true);
}

// ---------------------------------------------------------------------------------------
// Energized

/** One Energized item's part of the Energized attack. */
export interface EnergizedPart {
  /** What the Energized attack does on hit (or an ability hit that spends the charges). */
  onHit?(ctx: HookContext, scale: number): void;
  /** While the charges are full, until an attack spends them (Rapid Firecannon's range). */
  full?(ctx: HookContext, on: boolean): void;
  /** More charges per basic attack (Statikk Shiv's Electroshock). */
  perAttack?: number;
}

/** The holder's Energized charges, which every Energized item it holds shares. */
export interface Energized {
  add(part: EnergizedPart): void;
  hooks: KitHooks;
  /** Spends full charges outside a basic attack (Voltaic Cyclosword's Galvanize); whether there were any. */
  spend(ctx: HookContext, scale: number): boolean;
}

const CHARGES = "item:energized";
const LAST_X = "item:energized:x";
const LOADED = "item:energized:loaded";
const SHOWN = "item:energized:full";

/**
 * Wiki "Energized": charges up to `full`, `perAttack` for each basic attack and one for every
 * `unitsPerCharge` units travelled by any means; at full charges, the next basic attack spends
 * them all on hit, and every Energized item adds its effect to it.
 */
export function energizedPool(rule: { full: number; perAttack: number; unitsPerCharge: number }): Energized {
  const parts: EnergizedPart[] = [];
  const charges = (unit: Unit) => Number(unit.memory[CHARGES] ?? 0);
  const show = (ctx: HookContext, on: boolean) => {
    if (Boolean(ctx.self.memory[SHOWN]) === on) return;
    ctx.self.memory[SHOWN] = on;
    for (const part of parts) part.full?.(ctx, on);
  };
  const fire = (ctx: HookContext, scale: number) => {
    for (const part of parts) part.onHit?.(ctx, scale);
  };
  return {
    add: (part) => parts.push(part),
    spend(ctx, scale) {
      if (charges(ctx.self) < rule.full) return false;
      ctx.self.memory[CHARGES] = 0;
      show(ctx, false);
      fire(ctx, scale);
      return true;
    },
    hooks: {
      onStart(ctx) {
        ctx.self.memory[CHARGES] = rule.full;
        ctx.self.memory[LAST_X] = ctx.self.x;
        show(ctx, true);
      },
      onTick(ctx) {
        const moved = Math.abs(ctx.self.x - Number(ctx.self.memory[LAST_X] ?? ctx.self.x));
        ctx.self.memory[LAST_X] = ctx.self.x;
        if (moved > 0 && charges(ctx.self) < rule.full) ctx.self.memory[CHARGES] = Math.min(rule.full, charges(ctx.self) + moved / rule.unitsPerCharge);
        if (charges(ctx.self) >= rule.full) show(ctx, true);
      },
      onAttackLaunch(ctx) {
        if (charges(ctx.self) >= rule.full) {
          // The attack launched at full charges is the Energized one.
          ctx.self.memory[CHARGES] = 0;
          ctx.self.memory[LOADED] = true;
          show(ctx, false);
          return;
        }
        const gain = rule.perAttack + parts.reduce((sum, part) => sum + (part.perAttack ?? 0), 0);
        ctx.self.memory[CHARGES] = Math.min(rule.full, charges(ctx.self) + gain);
        if (charges(ctx.self) >= rule.full) show(ctx, true);
      },
      onAttackHit(ctx) {
        if (!ctx.self.memory[LOADED]) return;
        delete ctx.self.memory[LOADED];
        if (!ctx.blocked) fire(ctx, ctx.scale);
      },
    },
  };
}
