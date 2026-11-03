import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { lifelineShield } from "../hints";
import { bonusMana, follow, memo } from "../runtime";
import { itemShield, joinHooks, lifeline } from "./shared";

export const SeraphsEmbrace: ItemModule = {
  item: "Seraph's Embrace",
  build(item, fighter) {
    const awe = item.effect("Awe").quoted("Grants ability power equal to 2% bonus mana.") / 100;
    const line = item.effect("Lifeline");
    const words = "you first gain a shield for 3 seconds that absorbs damage equal to 18% maximum mana for 3 seconds.";
    const seconds = line.quoted(words);
    const share = line.quoted(words, 1) / 100;
    if (!fighter.mana) return { unmodeled: ["Awe: the champion has no mana.", "Lifeline: its shield is a share of mana, which the champion doesn't have."] };
    return {
      budget: {
        stats: (self) => [{ stat: "AP", value: awe * bonusMana(self, fighter.baseMana) }],
        shielding: (self, enemy) => lifelineShield(self, enemy, share * derive(self).maxResource, seconds, false),
      },
      hooks: joinHooks(
        follow(memo(item.name, "AP"), "AP", (self) => awe * bonusMana(self, fighter.baseMana)),
        lifeline(item.name, line, (ctx) => itemShield(ctx, item.name, share * derive(ctx.self).maxResource, seconds, false)),
      ),
    };
  },
};
