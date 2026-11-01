import { toTicks } from "../../engine/rules/time";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Formula } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { memo, ownStatus, setStat, until } from "../runtime";
import { applyFrom } from "./shared";

export const Heartsteel: ItemModule = {
  item: "Heartsteel",
  options: { stacked: { label: "Bonus health Colossal Consumption gave before the fight", default: 0 } },
  build(item, _fighter, options) {
    const meal = item.effect("Colossal Consumption");
    const range = meal.quoted("While within 700 units of an enemy champion, generate a stack on them each second, stacking up to 3 times.");
    const maxStacks = meal.quoted("While within 700 units of an enemy champion, generate a stack on them each second, stacking up to 3 times.", 1);
    const words = "consume them all to deal 70 (+ 6% maximum health) bonus physical damage on-hit and grant you permanent bonus health equal to 10% of that amount (30 second cooldown per target).";
    const amount: Formula = { base: meal.quoted(words), ratios: { maxHP: meal.quoted(words, 1) / 100 } };
    const growth = meal.quoted(words, 2) / 100;
    const cooldown = meal.quoted(words, 3);
    const lifeSteal = item.tagged("OnHitAppliesLifeSteal");
    const stacks = memo(item.name, "stacks");
    const nextStack = memo(item.name, "nextStack");
    const ready = memo(item.name, "ready");
    const health = memo(item.name, "health");
    item.assume("Colossal Consumption stacks while the enemy is within 700 units of the holder's edge; the permanent health it gives is pre-mitigation damage's 10%.");
    return {
      hooks: {
        onStart(ctx) {
          if (options.stacked) setStat(ctx.self, health, "health", options.stacked, ctx.tick);
        },
        onTick(ctx) {
          if (ctx.tick < until(ctx.self, ready)) return;
          const near = Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.radius <= range;
          if (!near) {
            delete ctx.self.memory[nextStack];
            return;
          }
          if (ctx.self.memory[nextStack] === undefined) ctx.self.memory[nextStack] = ctx.tick + toTicks(1);
          if (ctx.tick >= until(ctx.self, nextStack)) {
            ctx.self.memory[stacks] = Math.min(maxStacks, Number(ctx.self.memory[stacks] ?? 0) + 1);
            ctx.self.memory[nextStack] = ctx.tick + toTicks(1);
          }
        },
        onAttackHit(ctx) {
          if (ctx.blocked || Number(ctx.self.memory[stacks] ?? 0) < maxStacks) return;
          delete ctx.self.memory[stacks];
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          const dealt = evaluate(amount, ctx.self, ctx.enemy) * ctx.scale;
          applyFrom(ctx, item.label, { type: "damage", damageType: "physical", amount: { base: dealt }, label: item.label, ...(lifeSteal ? { lifesteal: derive(ctx.self).lifeSteal } : {}) });
          const gained = (ownStatus(ctx.self, health)?.value ?? 0) + growth * dealt;
          setStat(ctx.self, health, "health", gained, ctx.tick);
          ctx.self.hp += growth * dealt;
        },
      },
      unmodeled: ["Goliath: the simulator doesn't change champions' size."],
    };
  },
};
