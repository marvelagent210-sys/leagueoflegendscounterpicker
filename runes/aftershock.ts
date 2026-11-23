/** Aftershock for explicit manual plain-stat duels. */
import { allocateCastInstance, withCastInstance } from "../engine/sim/castInstance";
import { applyEffect, isUntargetable } from "../engine/sim/combat";
import { derive, hasState } from "../engine/sim/derived";
import { toTicks } from "../engine/rules/time";
import type { Effect, FighterSpec, HookContext, KitHooks } from "../engine/sim/spec";
import type { Unit } from "../engine/sim/state";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Aftershock";
const ARMOR = "rune:aftershock:armor";
const MAGIC_RESISTANCE = "rune:aftershock:magic-resistance";
const BURST = "rune:aftershock:burst";
const READY = "rune:aftershock:ready";
type Rules = CombatRuneRules["aftershock"];

export function checkedAftershockRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const duration = toTicks(rules.duration), cooldown = toTicks(rules.cooldown);
  if (rules.modelLevel !== 20 || ![rules.flatResistance, rules.bonusResistanceRatio, rules.maxResistance,
    rules.baseDamage, rules.bonusHealthRatio, rules.radius].every(number => Number.isFinite(number) && number > 0)
    || rules.maxResistance < rules.flatResistance || rules.bonusResistanceRatio > 1 || rules.bonusHealthRatio > 1
    || !Number.isSafeInteger(duration) || !Number.isSafeInteger(cooldown) || duration <= 0 || cooldown <= duration) {
    throw new Error(`${LABEL} requires finite level-20 damage, capped resistances, a radius and valid timers`);
  }
  return { ...rules };
}

const champion = (ctx: HookContext, unit: Unit) => ctx.world.units[unit.side] === unit
  && unit.petId === undefined && unit.spec.unitClass !== "clone";
const living = (unit: Unit) => unit.alive && unit.hp > 0 && !unit.fallen
  && !unit.deathNotified && !unit.deathDefied && !unit.resurrection;

export function buildAftershock(form: FighterSpec, input: Pick<CombatRuneRules, "aftershock">): {
  hooks: KitHooks;
  assumptions: string[];
} {
  if (form.id === "yorick") throw new Error("Aftershock normally substitutes Grasp of the Undying for Yorick. Select Grasp explicitly for this manual duel.");
  const { flatResistance, bonusResistanceRatio, maxResistance, baseDamage, bonusHealthRatio, duration, cooldown, radius } =
    checkedAftershockRules(input?.aftershock);
  const durationTicks = toTicks(duration), cooldownTicks = toTicks(cooldown);
  const bonus = (value: number) => Math.min(maxResistance, flatResistance + bonusResistanceRatio * Math.max(0, value));
  const damage: Effect = {
    type: "damage", damageType: "magic", label: LABEL, observedDamageKind: "proc", petDamageCategory: "area", noLifeSteal: true,
    amount: { base: baseDamage, ratios: { bonusHP: bonusHealthRatio } },
  };

  function upkeep(ctx: HookContext): void {
    const { world, self, enemy, memory, tick } = ctx;
    const burst = memory[BURST];
    if (typeof burst !== "number" || !champion(ctx, self)) return;
    const active = living(self);
    if (active && tick < burst) return;
    delete memory[BURST];
    ctx.buff(ARMOR, "armor", 0, 0);
    ctx.buff(MAGIC_RESISTANCE, "MR", 0, 0);
    if (!active || !champion(ctx, enemy) || !enemy.alive || enemy.hp <= 0
      || isUntargetable(enemy, self) || Math.abs(enemy.x - self.x) > radius + 1e-6) return;

    const cast = allocateCastInstance(world, self);
    const apply = () => applyEffect(world, self, enemy, damage, { scale: 1 });
    if (cast === undefined) apply();
    else withCastInstance(world, self, cast, apply);
  }

  return {
    hooks: {
      onEnemyCCApplied(ctx) {
        const { self, source, target, memory, tick } = ctx;
        if (source !== self || !champion(ctx, self) || !living(self) || !champion(ctx, target)
          || target.side === self.side || !target.alive || target.hp <= 0 || hasState(target, "displacementImmune")) return;
        if (tick < Number(memory[READY] ?? 0)) return;
        const stats = derive(self);
        const armor = bonus(stats.armor.bonus), magicResistance = bonus(stats.mr.bonus);
        memory[BURST] = tick + durationTicks;
        memory[READY] = tick + cooldownTicks;
        ctx.buff(ARMOR, "armor", armor, duration);
        ctx.buff(MAGIC_RESISTANCE, "MR", magicResistance, duration);
        ctx.log(`${LABEL} gains ${Math.round(armor)} armor and ${Math.round(magicResistance)} magic resistance`);
      },
      onTick: upkeep,
      onTickWhileDead: upkeep,
    },
    assumptions: [
      "Aftershock uses accepted native immobilization from the actual champion body against the opposing champion. A target's displacement immunity can prevent activation even when its other control applies.",
      "Each grant uses the current bonus resistance at activation, with each input floored at zero. The two grants expire after 2.5 seconds. The simulator starts the cooldown at activation.",
      "The shockwave uses the current bonus health and the champion bodies' center distance at detonation. It is a separate area proc with its own damage instance and cast identity when required. Native protection and spell-shield rules apply.",
      "The manual duel cancels a pending shockwave when the owner dies, falls or enters resurrection. Live detonation order during these transitions remains unmeasured.",
    ],
  };
}
