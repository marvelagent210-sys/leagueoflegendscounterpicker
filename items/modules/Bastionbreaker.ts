import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, until } from "../runtime";
import { applyFrom } from "./shared";

export const Bastionbreaker: ItemModule = {
  item: "Bastionbreaker",
  build(item, fighter) {
    const charge = item.effect("Shaped Charge");
    charge.quote("Your next instance of ability damage to a champion or epic monster with a champion ability deals");
    const base = charge.meleeRanged("deals 50 (melee) / 25 (ranged)");
    const perLethality = charge.meleeRanged("(+ 1.5 (melee) / 0.75 (ranged) per 1 lethality) bonus true damage.");
    const cooldown = charge.cooldown();
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const ready = memo(item.name, "ready");
    return {
      hooks: {
        onDamageDealt(ctx) {
          if (!fighter.isAbilityDamage(ctx) || ctx.persistent || ctx.tick < until(ctx.self, ready)) return;
          ctx.self.memory[ready] = ctx.tick + toTicks(cooldown);
          applyFrom(ctx, item.name, { type: "damage", damageType: "true", amount: { base: pick(base), ratios: { lethality: pick(perLethality) } }, label: item.name });
        },
      },
      unmodeled: ["Sabotage: a takedown ends the duel, and there are no turrets."],
    };
  },
};
