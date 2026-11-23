/** The owner heal of Font of Life in a manual plain-stat duel. */
import { toTicks } from "../engine/rules/time";
import { heal } from "../engine/sim/combat";
import { hasState } from "../engine/sim/derived";
import type { FighterSpec, HookContext, KitHooks } from "../engine/sim/spec";
import type { Status, Unit } from "../engine/sim/state";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Font of Life";
const READY = "rune:font-of-life:ready";
const DROWSY_START = "rune:font-of-life:drowsy-start";
const DROWSY_ABILITY = "rune:font-of-life:drowsy-ability";
type Rules = CombatRuneRules["fontOfLife"];

export function checkedFontOfLifeRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const cooldown = toTicks(rules.cooldown);
  if (rules.modelLevel !== 20 || ![rules.heal, rules.rangedRatio, rules.allyRadius].every(amount => Number.isFinite(amount) && amount > 0)
    || rules.rangedRatio > 1 || !Number.isSafeInteger(cooldown) || cooldown <= 0) {
    throw new Error(`${LABEL} requires positive level-20 healing, a ranged ratio, a radius and a valid cooldown`);
  }
  return { ...rules };
}

const champion = (ctx: HookContext, unit: Unit) => ctx.world.units[unit.side] === unit
  && unit.petId === undefined && unit.spec.unitClass !== "clone";
const living = (unit: Unit) => unit.alive && unit.hp > 0 && !unit.fallen && !unit.deathNotified && !unit.deathDefied && !unit.resurrection;
const slows = (target: Unit, status: Status) => status.value > 0 && (!hasState(target, "slowImmune") || status.bypassSlowImmune);

export function buildFontOfLife(form: FighterSpec, input: Pick<CombatRuneRules, "fontOfLife">): { hooks: KitHooks; assumptions: string[] } {
  if (form.id === "corki") throw new Error(`${LABEL} is unavailable for Corki. His live rune page substitutes Demolish.`);
  const rules = checkedFontOfLifeRules(input?.fontOfLife);
  const cooldown = toTicks(rules.cooldown);

  function trigger(ctx: HookContext): void {
    if (ctx.tick < Number(ctx.memory[READY] ?? 0)) return;
    ctx.memory[READY] = ctx.tick + cooldown;
    ctx.log(`${LABEL} triggers`);
    heal(ctx.world, ctx.self, rules.heal * (ctx.self.spec.attack.ranged ? rules.rangedRatio : 1));
  }

  function checkDrowsy(ctx: HookContext): void {
    const { memory, self, enemy, tick } = ctx;
    const start = memory[DROWSY_START];
    if (typeof start !== "number") return;
    const status = enemy.statuses.findLast(entry => entry.kind === "cc" && entry.key === "drowsy"
      && entry.source === self.side && entry.startTick === start && entry.endTick > tick
      && (entry.ability ?? "") === memory[DROWSY_ABILITY]);
    const eligible = champion(ctx, self) && champion(ctx, enemy) && living(self) && enemy.alive && enemy.hp > 0;
    if (eligible && status && !slows(enemy, status)) return;
    delete memory[DROWSY_START];
    delete memory[DROWSY_ABILITY];
    if (eligible && status) trigger(ctx);
  }

  return {
    hooks: {
      onEnemyCCApplied(ctx) {
        if (ctx.source === ctx.self && champion(ctx, ctx.self) && champion(ctx, ctx.target)
          && living(ctx.self) && ctx.target.side !== ctx.self.side && ctx.target.alive && ctx.target.hp > 0) trigger(ctx);
      },
      onCombatActivity(ctx) {
        const event = ctx.combatActivity;
        const { self, enemy, tick, memory } = ctx;
        if (event.kind !== "cc" || (event.cc !== "slow" && event.cc !== "drowsy") || event.source.kind !== "champion"
          || event.source.side !== self.side || event.target.kind !== "champion" || event.target.side !== enemy.side
          || !champion(ctx, self) || !champion(ctx, enemy) || !living(self) || !enemy.alive || enemy.hp <= 0) return;
        const status = enemy.statuses.findLast(entry => entry.kind === "cc" && entry.key === event.cc
          && entry.source === self.side && entry.startTick === tick && entry.endTick > tick && entry.ability === event.ability);
        if (!status) return;
        if (event.cc === "slow") {
          if (slows(enemy, status)) trigger(ctx);
        } else {
          memory[DROWSY_START] = status.startTick;
          memory[DROWSY_ABILITY] = status.ability ?? "";
          checkDrowsy(ctx);
        }
      },
      onTick: checkDrowsy,
      onTickWhileDead: checkDrowsy,
    },
    assumptions: [
      "Font of Life observes accepted native immobilizations and positive slows from the actual champion body against the opposing champion body. A growing drowsy slow qualifies when its positive component first takes effect in upkeep.",
      "The 20-second cooldown starts on activation even at full health. The immediate owner heal uses the current form's ranged ratio with native healing modifiers and caps.",
      "The manual duel represents the owner heal. The nearby ally heal, pet and clone attribution, and exact live ordering of simultaneous effects remain open.",
    ],
  };
}
