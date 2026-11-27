import { toTicks } from "../../engine/rules/time";
import type { AbilitySpec } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";
import { castTimes, coverage, overFights } from "../hints";
import { memo, setStat } from "../runtime";

/** How far from the caster an ability can deal its damage, for the estimate: its cast range, 0 for self-cast and area abilities. */
function reachOf(ability: AbilitySpec): number {
  const delivery = ability.delivery;
  return delivery.kind === "target" || delivery.kind === "line" || delivery.kind === "circle" ? delivery.range : 0;
}

export const HorizonFocus: ItemModule = {
  item: "Horizon Focus",
  build(item, fighter) {
    const shot = item.effect("Hypershot");
    const words = "Dealing ability damage to a champion with a champion ability at 600 or more units away from the cast position marks them for 6 seconds, revealing them and increasing your damage dealt to them by 10%.";
    const reach = shot.quoted(words);
    const seconds = shot.quoted(words, 1);
    const share = shot.quoted(words, 2) / 100;
    item.assume("Hypershot measures 600 units from where the holder stands when the damage lands, center to center.");
    item.assume("The build search's estimate counts Hypershot's mark after each cast of a damaging ability that reaches 600 units or more, as if cast from its full range.");
    return {
      budget: {
        stats: (self) => [{ stat: "damageDealt", value: share * overFights(castTimes(self, (use) => use.damaging && reachOf(use.ability) >= reach), (times) => coverage(times, seconds)) }],
      },
      hooks: {
        onDamageDealt(ctx) {
          if (!fighter.isAbilityDamage(ctx) || ctx.persistent || Math.abs(ctx.self.x - ctx.enemy.x) < reach) return;
          setStat(ctx.self, memo(item.name, "mark"), "damageDealt", share, ctx.tick, ctx.tick + toTicks(seconds));
        },
      },
      unmodeled: ["Focus: its sight and marks on other enemies don't matter in a duel."],
    };
  },
};
