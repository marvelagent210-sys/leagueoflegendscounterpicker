import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { applyFrom, itemDamage } from "./shared";

export const BladeOfTheRuinedKing: ItemModule = {
  item: "Blade of the Ruined King",
  build(item, fighter) {
    const edge = item.effect("Mist's Edge");
    const share = edge.meleeRanged("bonus physical damage on-hit equal to 9% (melee) / 6% (ranged) of the target's current health");
    edge.quote("with a maximum of 100 against minions and monsters");
    const claws = item.effect("Clawing Shadows");
    const stackSeconds = claws.quoted("Basic attacks on-hit against enemy champions apply a stack for 6 seconds");
    const maxStacks = claws.quoted("stacking up to 3 times");
    const slow = claws.quoted("The third stack consumes them all to slow the target by 30% for 1 second.") / 100;
    const slowSeconds = claws.quoted("The third stack consumes them all to slow the target by 30% for 1 second.", 1);
    const cooldown = claws.cooldown();
    const stacks = memo(item.name, "stacks");
    const expires = memo(item.name, "stacksUntil");
    const ready = memo(item.name, "ready");
    return {
      onHit: [itemDamage(item.name, "physical", { base: 0, ratios: { targetCurrentHP: (fighter.ranged ? share.ranged : share.melee) / 100 } }, item.tagged("OnHitAppliesLifeSteal"))],
      hooks: {
        onAttackHit(ctx) {
          if (ctx.blocked || ctx.tick < until(ctx.self, ready)) return;
          const held = ctx.tick <= until(ctx.self, expires) ? Number(ctx.self.memory[stacks] ?? 0) : 0;
          if (held + 1 < maxStacks) {
            ctx.self.memory[stacks] = held + 1;
            ctx.self.memory[expires] = ctx.tick + toTicks(stackSeconds);
            return;
          }
          delete ctx.self.memory[stacks];
          delete ctx.self.memory[expires];
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          applyFrom(ctx, item.name, { type: "cc", cc: "slow", duration: slowSeconds, strength: slow });
        },
      },
    };
  },
};
