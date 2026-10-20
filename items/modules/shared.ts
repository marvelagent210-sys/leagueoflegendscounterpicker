/**
 * Mechanics several items share: what an item's own effects are applied as, Spellblade,
 * Lifeline, decaying shields, and Grievous Wounds on damage.
 */
import { toTicks } from "../../engine/rules/time";
import { addStatus, applyEffect } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext, KitHooks } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import type { ItemEffectData } from "../context";
import { activeKey, championCast, memo, ownStatus, until } from "../runtime";

const sources = new Map<string, AbilitySpec>();

/**
 * What an item's effects are applied as: their damage is labeled with the item's name, and
 * their crowd control and statuses carry its key, so neither counts as the kit's abilities.
 */
export function itemSource(item: string): AbilitySpec {
  let source = sources.get(item);
  if (!source) {
    source = { key: activeKey(item), name: item, slot: "other", cooldown: 0, castTime: 0, countsAsCast: false, delivery: { kind: "self" } };
    sources.set(item, source);
  }
  return source;
}

/** Applies an item's effect from the hook's unit to the enemy, or to itself. */
export function applyFrom(ctx: Pick<HookContext, "world" | "self" | "enemy">, item: string, effect: Effect, toSelf = false, scale = 1): void {
  applyEffect(ctx.world, ctx.self, toSelf ? ctx.self : ctx.enemy, effect, { scale, ability: itemSource(item) });
}

/** A damage effect of an item's: labeled with its name, without life steal unless the item's on-hit has it. */
export function itemDamage(item: string, damageType: "physical" | "magic" | "true", amount: Formula, lifeSteal = false): Effect {
  return { type: "damage", damageType, amount, label: item, ...(lifeSteal ? {} : { noLifeSteal: true }) };
}

// ---------------------------------------------------------------------------------------
// Grievous Wounds

/** Inflicts Grievous Wounds for `seconds`, refreshing the holder's own instead of stacking another. */
export function inflictGrievous(world: World, source: Unit, target: Unit, seconds: number): void {
  const endTick = world.tick + toTicks(seconds);
  const own = target.statuses.find((status) => status.kind === "grievousWounds" && status.source === source.side);
  if (own) own.endTick = Math.max(own.endTick, endTick);
  else addStatus(target, { kind: "grievousWounds", key: "grievousWounds", source: source.side, startTick: world.tick, endTick, value: 0.4 });
}

// ---------------------------------------------------------------------------------------
// Spellblade

export interface SpellbladeOptions {
  /** Effects of the empowered attack on its target. */
  onHit(ctx: HookContext, scale: number): void;
  /** Effects on the holder while it waits for the empowered attack (Lich Bane's attack speed). */
  armed?(ctx: HookContext, on: boolean): void;
}

/**
 * Spellblade: "After using an ability, your next basic attack within 10 seconds deals ... on-hit
 * (1.5 second cooldown, starts after using the empowered attack)". Abilities that apply on-hit
 * effects (Mystic Shot) spend it as a basic attack does.
 */
export function spellblade(item: string, effect: ItemEffectData, options: SpellbladeOptions): KitHooks {
  const window = effect.quoted("After using an ability, your next basic attack within 10 seconds");
  const cooldown = effect.quoted("(1.5 second cooldown, starts after using the empowered attack)");
  const armed = memo(item, "armed");
  const ready = memo(item, "ready");
  const spend = (ctx: HookContext, scale: number) => {
    if (ctx.tick > until(ctx.self, armed)) return;
    delete ctx.self.memory[armed];
    ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
    options.armed?.(ctx, false);
    options.onHit(ctx, scale);
  };
  return {
    onCast(ctx) {
      if (!championCast(ctx.ability) || ctx.ability.activation === "internal" || ctx.tick < until(ctx.self, ready)) return;
      ctx.self.memory[armed] = ctx.tick + toTicks(window);
      options.armed?.(ctx, true);
    },
    onTick(ctx) {
      // The window closed without an attack.
      if (ctx.self.memory[armed] !== undefined && ctx.tick > until(ctx.self, armed)) {
        delete ctx.self.memory[armed];
        options.armed?.(ctx, false);
      }
    },
    onAttackHit(ctx) {
      if (!ctx.blocked) spend(ctx, ctx.scale);
    },
    onAbilityHit(ctx) {
      if (ctx.ability.flags?.appliesOnHit) spend(ctx, ctx.scale * (ctx.ability.onHitScale ?? 1));
    },
  };
}

// ---------------------------------------------------------------------------------------
// Lifeline and decaying shields

/**
 * Lifeline: "If you would take damage that would reduce you below 30% of your maximum health,
 * you first gain ..." (cooldown in seconds). Shields the holder already has absorb first.
 */
export function lifeline(item: string, effect: ItemEffectData, trigger: (ctx: HookContext) => void, options: { magicOnly?: boolean } = {}): KitHooks {
  const threshold = effect.quoted(options.magicOnly ? "If you would take magic damage that would reduce you below 30% of your maximum health" : "If you would take damage that would reduce you below 30% of your maximum health") / 100;
  const cooldown = effect.cooldown();
  const ready = memo(item, "lifeline");
  return {
    beforeDamageTaken(ctx) {
      if (options.magicOnly && ctx.damageType !== "magic") return;
      if (ctx.tick < until(ctx.self, ready)) return;
      let shields = 0;
      for (const status of ctx.self.statuses) {
        if (status.kind === "shield" && (status.shieldType === undefined || status.shieldType === "normal" || status.shieldType === ctx.damageType)) shields += status.value;
      }
      const after = ctx.self.hp - Math.max(0, ctx.amount - shields);
      if (after >= threshold * derive(ctx.self).maxHp) return;
      ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
      trigger(ctx);
    },
  };
}

/** Gives the holder a shield of its item's for `seconds`; with `decay`, it shrinks evenly to nothing over that time. */
export function itemShield(ctx: Pick<HookContext, "self" | "tick">, item: string, amount: number, seconds: number, decay: boolean, shieldType: "normal" | "magic" = "normal"): void {
  const key = memo(item, "shield");
  ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== key);
  if (amount <= 0) return;
  addStatus(ctx.self, { kind: "shield", key: activeKey(item), source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + toTicks(seconds), value: amount, shieldType, memoKey: key });
  if (decay) ctx.self.memory[memo(item, "decay")] = amount / toTicks(seconds);
  else delete ctx.self.memory[memo(item, "decay")];
}

/** Decays the item's shield each tick, when it has one that decays. */
export function decayHooks(item: string): KitHooks {
  return {
    onTick(ctx) {
      const perTick = ctx.self.memory[memo(item, "decay")];
      if (typeof perTick !== "number") return;
      const shield = ownStatus(ctx.self, memo(item, "shield"));
      if (!shield) {
        delete ctx.self.memory[memo(item, "decay")];
        return;
      }
      shield.value = Math.max(0, shield.value - perTick);
      if (shield.value <= 0) ctx.self.statuses = ctx.self.statuses.filter((status) => status !== shield);
    },
  };
}

/** Several hooks as one, in order. */
export function joinHooks(...all: Array<KitHooks | undefined>): KitHooks {
  const present = all.filter((hooks): hooks is KitHooks => hooks !== undefined);
  const names = new Set(present.flatMap((hooks) => Object.keys(hooks)));
  const joined: Record<string, (ctx: never) => unknown> = {};
  for (const name of names) {
    const fns = present.map((hooks) => (hooks as Record<string, ((ctx: never) => unknown) | undefined>)[name]).filter((fn) => fn !== undefined);
    if (["modifyDamageAfterShields", "modifyDamageTakenRaw", "onLethal", "onAttackLaunch", "onAbilityContact"].includes(name) && fns.length > 1) {
      throw new Error(`joinHooks: ${name} returns a value; give it to one item hook only`);
    }
    joined[name] = fns.length === 1 ? fns[0]! : (ctx: never) => {
      for (const fn of fns) fn(ctx);
    };
  }
  return joined as KitHooks;
}
