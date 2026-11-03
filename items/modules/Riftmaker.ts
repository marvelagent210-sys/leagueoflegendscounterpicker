import { budgetDamage } from "../../engine/budget";
import type { ItemModule } from "../equip";
import { FIGHT } from "../hints";
import { OMNIVAMP, bonusHealth, follow, memo, setStat } from "../runtime";
import { joinHooks } from "./shared";

export const Riftmaker: ItemModule = {
  item: "Riftmaker",
  build(item, fighter) {
    const corruption = item.effect("Void Corruption");
    const words = "For each second in combat with champions, deal 2% increased damage, stacking up to 4 times for a total of 8% increased damage.";
    const perStack = corruption.quoted(words) / 100;
    const maxStacks = corruption.quoted(words, 1);
    const vamp = corruption.meleeRanged("At maximum stacks, gain 10% (melee) / 6% (ranged) omnivamp.");
    const infusion = item.effect("Void Infusion").quoted("Gain ability power equal to 2% bonus health.") / 100;
    const combat = fighter.combat();
    const stacksBySecond = Array.from({ length: FIGHT }, (_, second) => Math.min(maxStacks, second));
    const vampShare = stacksBySecond.filter((stacks) => stacks >= maxStacks).length / FIGHT;
    return {
      omnivamp: true,
      // Its stacks over the seconds of the fight, and its omnivamp once they are full.
      budget: {
        stats: (self) => [{ stat: "AP", value: infusion * bonusHealth(self) }, { stat: "damageDealt", value: perStack * stacksBySecond.reduce((a, b) => a + b, 0) / FIGHT }],
        healing(self, enemy) {
          const dealt = budgetDamage(self, enemy);
          return ((fighter.ranged ? vamp.ranged : vamp.melee) / 100) * vampShare * (dealt.physical + dealt.magic + dealt.true);
        },
      },
      hooks: joinHooks(follow(memo(item.name, "AP"), "AP", (self) => infusion * bonusHealth(self)), {
        onTick(ctx) {
          const stacks = Math.min(maxStacks, Math.floor(combat.seconds(ctx.self, ctx.tick)));
          setStat(ctx.self, memo(item.name, "damage"), "damageDealt", stacks * perStack, ctx.tick);
          setStat(ctx.self, memo(item.name, "omnivamp"), OMNIVAMP, stacks >= maxStacks ? (ctx.self.spec.attack.ranged ? vamp.ranged : vamp.melee) / 100 : 0, ctx.tick);
        },
      }),
    };
  },
};
