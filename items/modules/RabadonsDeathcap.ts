import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { follow, memo } from "../runtime";

export const RabadonsDeathcap: ItemModule = {
  item: "Rabadon's Deathcap",
  build(item) {
    const share = item.effect("Magical Opus").quoted("Increase your ability power by 30%.") / 100;
    // A share of all the holder's AP, its other conversions and buffs included, but not of itself.
    return {
      hooks: follow(memo(item.name, "AP"), "AP", (self, current) => share * (derive(self).ap - current)),
      budget: { stats: (self) => [{ stat: "AP", value: share * derive(self).ap }], late: true },
    };
  },
};
