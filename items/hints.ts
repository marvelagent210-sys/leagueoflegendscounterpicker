/**
 * What item hints (ItemBudget, items/equip.ts) share: the stat budget's ten-second reference
 * fight (engine/budget.ts), and how often an item's passive triggers in it. Everything is ready
 * when the fight starts, as for the budget's sustain: an effect on a long cooldown triggers once.
 * These are averages for ranking builds; fights play the passives themselves.
 */
import { SUSTAIN_WINDOW, budgetCasts, budgetDamage, budgetOnHit, budgetUses } from "../engine/budget";
import { IMMOBILIZING } from "../engine/rules/crowdControl";
import { averageCritFactor } from "../engine/rules/defense";
import { derive, evaluate } from "../engine/sim/derived";
import type { AbilitySpec, DamageByType, Effect } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import type { ItemBudget, ItemDefinition } from "./equip";

/** The reference fight's length in seconds. */
export const FIGHT = SUSTAIN_WINDOW;

/** Basic attacks per second the holder makes in the reference fight: none when its kit doesn't attack (budget hint `attacks`). */
export function attacks(self: Unit): number {
  return self.spec.budget?.attacks === false ? 0 : derive(self).attackSpeed;
}

/** Ability casts per second in the reference fight, recasts included (engine/budget.ts budgetCasts). */
export function casts(self: Unit): number {
  return budgetCasts(self).casts;
}

/** Ability uses per second that deal damage. */
export function damagingCasts(self: Unit): number {
  return budgetCasts(self).damaging;
}

/**
 * The share of the fight the enemy stays within `radius` units of the holder: all of it when
 * the holder attacks from within the radius, a quarter when it attacks from further away (what
 * ranged champions holding Sunfire Aegis keep in fights).
 */
export function nearby(self: Unit, radius: number): number {
  return self.spec.attack.range <= radius ? 1 : 0.25;
}

/** Uses per second of the kit's abilities that `match` (budgetUses). */
export function usesOf(self: Unit, match: (ability: AbilitySpec) => boolean): number {
  return budgetUses(self).reduce((sum, use) => (match(use.ability) ? sum + use.perSecond : sum), 0);
}

/** Whether an ability has an effect that `match`es: on its hits, its channel, its empowered attacks or itself. */
export function abilityHas(ability: AbilitySpec, match: (effect: Effect) => boolean): boolean {
  const all = (effects: readonly Effect[] | undefined): boolean =>
    (effects ?? []).some((e) => match(e) || (e.type === "delayed" && all(e.effects)) || (e.type === "empower" && all(e.onHit)));
  return all(ability.onHit) || all(ability.onSelf) || all(ability.onCastStart) || all(ability.channel?.onTick) || all(ability.channel?.onComplete);
}

/** The kit's ultimate. */
export const ultimate = (ability: AbilitySpec) => ability.slot === "R";

/** An ability that immobilizes the enemy (stuns, roots, knock-ups...). */
export const immobilizes = (ability: AbilitySpec) => abilityHas(ability, (e) => (e.type === "cc" && IMMOBILIZING.has(e.cc)) || e.type === "displace");

/** An ability that slows or immobilizes the enemy. */
export const slowsOrImmobilizes = (ability: AbilitySpec) => immobilizes(ability) || abilityHas(ability, (e) => e.type === "cc" && e.cc === "slow");

/** An ability that makes its caster invisible. */
export const stealths = (ability: AbilitySpec) => abilityHas(ability, (e) => e.type === "state" && e.state === "invisible");

/**
 * Triggers per second over the fight of an effect with a cooldown: the first after `wait`
 * seconds, then every cooldown plus `wait`, before the fight's end (a ten-second cooldown
 * triggers once). No cooldown: one every `wait`.
 */
export function triggers(cooldown: number, wait = 0): number {
  if (!(wait < FIGHT)) return 0;
  const cycle = cooldown + wait;
  return (cycle > 0 ? 1 + Math.floor((FIGHT - wait) / cycle - 1e-9) : 0) / FIGHT;
}

/**
 * Spellblade's procs per second: an empowered attack half an attack after a cast, then
 * `cooldown` seconds before a cast arms it again. With casts every P seconds, a proc every P
 * times the casts that cooldown and wait take.
 */
export function spellbladeProcs(self: Unit, cooldown: number): number {
  const rate = attacks(self);
  const cast = casts(self);
  if (rate <= 0 || cast <= 0) return 0;
  const every = 1 / cast;
  return 1 / (every * Math.max(1, Math.ceil((cooldown + 0.5 / rate) / every - 1e-9)));
}

/** The stacks held on average over the fight, gaining `rate` a second from none up to `most` (a stack that would expire is renewed first). */
export function averageStacks(most: number, rate: number): number {
  if (rate <= 0 || most <= 0) return 0;
  const full = most / rate;
  return full >= FIGHT ? (rate * FIGHT) / 2 : most - (most * full) / (2 * FIGHT);
}

/** The enemy's damage per second against the holder, by type, after the holder's resistances. */
export function incoming(self: Unit, enemy: Unit): DamageByType {
  return budgetDamage(enemy, self);
}

/**
 * What a shield of `amount` absorbs from damage arriving at `rate` a second while it lasts
 * `seconds`: all of it up to what arrives, or, decaying evenly to nothing, what arrives before
 * the decay and the damage use it up.
 */
export function absorbed(amount: number, seconds: number, rate: number, decays: boolean): number {
  if (amount <= 0 || rate <= 0 || seconds <= 0) return 0;
  const arriving = rate * seconds;
  return decays ? (amount * arriving) / (amount + arriving) : Math.min(amount, arriving);
}

/**
 * Lifeline (shared.ts): a shield once a fight, when damage would take the holder below the
 * threshold; per second of the fight. `type` limits the shield and its trigger to that damage.
 */
export function lifelineShield(self: Unit, enemy: Unit, amount: number, seconds: number, decays: boolean, type?: "magic"): number {
  const coming = incoming(self, enemy);
  const rate = type ? coming[type] : coming.physical + coming.magic + coming.true;
  return absorbed(amount, seconds, rate, decays) / FIGHT;
}

/**
 * Energized attacks per second (wiki "Energized"): full charges when the fight starts, then the
 * charges basic attacks give, `extra` more each from the holder's items (Statikk Shiv). Charges
 * from moving are left out: a duel moves little.
 */
export function energized(self: Unit, rule: { full: number; perAttack: number }, extra = 0): number {
  return (1 + Math.floor((attacks(self) * FIGHT * (rule.perAttack + extra)) / rule.full + 1e-9)) / FIGHT;
}

/** The average of a share that grows evenly with the missing health, to all of it at `at`, over a fight from full health to none. */
export function overMissingHealth(at: number): number {
  return at >= 1 ? 0.5 / at : 1 - at / 2;
}

type Active = NonNullable<ItemDefinition["actives"]>[number];

function flat(effects: readonly Effect[]): Effect[] {
  return effects.flatMap((e) => (e.type === "delayed" ? flat(e.effects) : e.type === "empower" ? flat(e.onHit) : [e]));
}

/** One basic attack's damage before resistances, with its on-hit effects: what an attack reset adds. */
export function attackDamage(self: Unit, enemy: Unit): DamageByType {
  const d = derive(self);
  const split = self.spec.budget?.attackSplit ?? { physical: 1, magic: 0 };
  const attack = d.ad * averageCritFactor(d.critChance, d.critDamage);
  const onHit = budgetOnHit(self, enemy);
  return { physical: attack * split.physical + onHit.physical, magic: attack * split.magic + onHit.magic, true: attack * (split.true ?? 0) + onHit.true };
}

/**
 * What item actives deal, shield and heal over the reference fight: each is used when ready,
 * its static cooldown from the start; its damage, its empowered attack's included, lands on
 * the enemy, an attack reset adds an attack, and its shields absorb the enemy's damage while
 * they last.
 */
export function activeBudget(actives: readonly Active[]): ItemBudget | undefined {
  const hits: Array<{ effect: Extract<Effect, { type: "damage" | "dot" }>; uses: number }> = [];
  const shields: Array<{ effect: Extract<Effect, { type: "shield" }>; uses: number }> = [];
  const heals: Array<{ effect: Extract<Effect, { type: "heal" }>; uses: number }> = [];
  let resets = 0;
  for (const active of actives) {
    const uses = triggers(active.cooldown);
    if ((active.onSelf ?? []).some((e) => e.type === "resetAttack" || (e.type === "empower" && e.resetAttack))) resets += uses;
    for (const effect of flat([...(active.onHit ?? []), ...(active.onSelf ?? []).filter((e) => e.type === "empower")])) {
      if (effect.type === "damage" || effect.type === "dot") hits.push({ effect, uses });
    }
    for (const effect of active.onSelf ?? []) {
      if (effect.type === "shield") shields.push({ effect, uses });
      else if (effect.type === "heal") heals.push({ effect, uses });
    }
  }
  if (!hits.length && !shields.length && !heals.length && !resets) return undefined;
  const budget: ItemBudget = {};
  if (hits.length || resets) {
    budget.damage = (self, enemy) => {
      const total: DamageByType = { physical: 0, magic: 0, true: 0 };
      for (const { effect, uses } of hits) total[effect.damageType] += evaluate(effect.type === "dot" ? effect.total : effect.amount, self, enemy) * uses;
      if (resets && attacks(self) > 0) {
        const attack = attackDamage(self, enemy);
        total.physical += attack.physical * resets;
        total.magic += attack.magic * resets;
        total.true += attack.true * resets;
      }
      return total;
    };
  }
  if (shields.length) {
    budget.shielding = (self, enemy) => {
      const coming = incoming(self, enemy);
      const rate = coming.physical + coming.magic + coming.true;
      return shields.reduce((sum, { effect, uses }) => sum + absorbed(evaluate(effect.amount, self), effect.duration, rate, false) * uses, 0);
    };
  }
  if (heals.length) budget.healing = (self) => heals.reduce((sum, { effect, uses }) => sum + evaluate(effect.amount, self) * uses, 0);
  return budget;
}
