import { toTicks } from "../../engine/rules/time";
import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { damagingCasts, triggers } from "../hints";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const LudensEcho: ItemModule = {
  item: "Luden's Echo",
  build(item, fighter) {
    const echo = item.effect("Echo");
    const stacks = echo.quoted("Gain 6 Echo stacks.");
    echo.quote("Dealing ability damage to an enemy consumes all Echo stacks to deal 75 (+ 5% AP) bonus magic damage to them");
    echo.quote("If the number of additional targets fired at is less than the number of stacks consumed, deal an additional");
    const total = echo.series("for a total of", 2);
    const totalAP = echo.series("for a total of", 3);
    if (total.kind !== "variable" || totalAP.kind !== "variable") throw new Error(`${item.name}: Echo's total should depend on remaining Echo stacks`);
    // Every stack beyond the first stays for the primary target, as when there are no other enemies.
    item.assume("Echo's orbs for other enemies within 600 units add to the primary target's damage instead: in a duel they can only be pets.");
    const remaining = stacks - 1;
    const at = total.points.indexOf(remaining);
    if (at < 0) throw new Error(`${item.name}: no total for ${remaining} remaining Echo stacks`);
    const base = Number(total.values[at]);
    const ap = Number(totalAP.values[at]) / 100;
    const cooldown = echo.cooldown();
    const ready = memo(item.name, "ready");
    return {
      budget: { damage: (self) => ({ magic: (base + ap * derive(self).ap) * Math.min(damagingCasts(self), triggers(cooldown)) }) },
      hooks: {
        onDamageDealt(ctx) {
          if (!fighter.isAbilityDamage(ctx) || ctx.persistent || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base, ratios: { AP: ap } }, label: item.label });
        },
      },
    };
  },
};
