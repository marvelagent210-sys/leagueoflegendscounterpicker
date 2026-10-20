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

/**
 * Wiki "Combat status" (revision 4058480): a unit is in combat on dealing or taking damage or
 * crowd control, and "most out-of-combat effects trigger 5 seconds after being in-combat".
 */
export const OUT_OF_COMBAT_SECONDS = 5;
const COMBAT_LAST = "item:combat:last";
const COMBAT_SINCE = "item:combat:since";

function markCombat(unit: Unit, tick: number): void {
  if (!inCombat(unit, tick)) unit.memory[COMBAT_SINCE] = tick;
  unit.memory[COMBAT_LAST] = tick;
}

export function inCombat(unit: Unit, tick: number): boolean {
  return tick - until(unit, COMBAT_LAST) < toTicks(OUT_OF_COMBAT_SECONDS);
}

/** Seconds since this stretch of combat began (0 out of combat): "for each second in combat". */
export function combatSeconds(unit: Unit, tick: number): number {
  return inCombat(unit, tick) ? (tick - until(unit, COMBAT_SINCE)) / 30 : 0;
}

/** Keeps the holder's combat status, for the items that need it. Champion damage and crowd control only: a duel has no other units. */
export const COMBAT_HOOKS: KitHooks = {
  onDamageDealt: (ctx) => markCombat(ctx.self, ctx.tick),
  onDamageTaken: (ctx) => markCombat(ctx.self, ctx.tick),
  onCCApplied: (ctx) => markCombat(ctx.self, ctx.tick),
  onEnemyCCApplied: (ctx) => markCombat(ctx.self, ctx.tick),
};

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
export function follow(key: string, stat: BuffStat, value: (self: Unit, current: number) => number, step = 0.5): KitHooks {
  const update = (ctx: HookContext) => {
    const current = ownStatus(ctx.self, key)?.value ?? 0;
    const wanted = value(ctx.self, current);
    if (Math.abs(wanted - current) >= step || (wanted === 0 && current !== 0)) setStat(ctx.self, key, stat, wanted, ctx.tick);
  };
  return { onStart: update, onTick: update };
}

// ---------------------------------------------------------------------------------------
// Omnivamp

/** Timed omnivamp from item passives, as a stat status of its own (the simulator has no omnivamp stat). */
export const OMNIVAMP = "item:omnivamp";

/**
 * Wiki "Vamp" (revision 4058226): omnivamp heals for a share of the post-mitigation physical,
 * magic and true damage dealt, stacks additively and doesn't benefit from heal and shield
 * power. Its healing ignores Glory in Death's ban on healing, as life steal's does.
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
