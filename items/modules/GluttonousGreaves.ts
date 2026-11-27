import { budgetDamage } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { OMNIVAMP, memo, setStat } from "../runtime";

/**
 * Slay: takedowns before the fight give 0.6% omnivamp each, up to 10. A duel has no takedown
 * until it ends, so the stacks are an option, full by default (an item bought to stack).
 */
export const GluttonousGreaves: ItemModule = {
  item: "Gluttonous Greaves",
  options: { stacks: { label: "Slay stacks from takedowns before the fight (10 at most)", default: 10 } },
  build(item, _fighter, options) {
    const slay = item.effect("Slay");
    const words = "Scoring a takedown against an enemy champion grants you 0.6% omnivamp, stacking up to 10 times for a total of 6%.";
    const perStack = slay.quoted(words) / 100;
    const most = slay.quoted(words, 1);
    const stacks = Math.min(most, Math.max(0, Math.round(options.stacks ?? most)));
    const vamp = perStack * stacks;
    if (vamp <= 0) return {};
    return {
      omnivamp: true,
      budget: {
        vampHealing(self, enemy) {
          const dealt = budgetDamage(self, enemy);
          return vamp * (dealt.physical + dealt.magic + dealt.true);
        },
      },
      hooks: { onStart(ctx) { setStat(ctx.self, memo(item.name, "omnivamp"), OMNIVAMP, vamp, ctx.tick); } },
    };
  },
};
