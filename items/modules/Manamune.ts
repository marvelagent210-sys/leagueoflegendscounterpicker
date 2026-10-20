import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { follow, memo } from "../runtime";
import { MANAFLOW_OPTION, STACKING, manaflow } from "./tears";

export const Manamune: ItemModule = {
  item: "Manamune",
  options: MANAFLOW_OPTION,
  build(item, fighter, options) {
    const awe = item.effect("Awe").quoted("Grants bonus attack damage equal to 2% maximum mana.") / 100;
    const mana = manaflow(item, "up to a maximum of 360 bonus mana.", options);
    item.assume(STACKING);
    return {
      mana,
      ...(fighter.mana ? { hooks: follow(memo(item.name, "AD"), "AD", (self) => awe * derive(self).maxResource) } : {}),
    };
  },
};
