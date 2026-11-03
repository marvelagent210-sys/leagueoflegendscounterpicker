import type { ItemModule } from "../equip";
import { bonusMana, follow, memo } from "../runtime";
import { MANAFLOW_OPTION, STACKING, manaflow } from "./tears";

export const WintersApproach: ItemModule = {
  item: "Winter's Approach",
  options: MANAFLOW_OPTION,
  build(item, fighter, options) {
    const awe = item.effect("Awe").quoted("Grants bonus health equal to 15% bonus mana.") / 100;
    const mana = manaflow(item, "up to a maximum of 360 bonus mana.", options);
    item.assume(STACKING);
    return {
      mana,
      ...(fighter.mana ? { hooks: follow(memo(item.name, "health"), "health", (self) => awe * bonusMana(self, fighter.baseMana)), budget: { stats: (self) => [{ stat: "health", value: awe * bonusMana(self, fighter.baseMana) }] } } : {}),
    };
  },
};
