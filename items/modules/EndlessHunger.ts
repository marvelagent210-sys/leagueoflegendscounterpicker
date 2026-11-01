import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { follow, memo } from "../runtime";

export const EndlessHunger: ItemModule = {
  item: "Endless Hunger",
  build(item, fighter) {
    const famine = item.effect("Famine");
    const base = famine.quoted("Gain 5 (+ 13% (melee) / 10% (ranged) bonus AD) ability haste.");
    const share = famine.meleeRanged("Gain 5 (+ 13% (melee) / 10% (ranged) bonus AD) ability haste.");
    const ratio = (fighter.ranged ? share.ranged : share.melee) / 100;
    return {
      hooks: follow(memo(item.name, "haste"), "abilityHaste", (self) => base + ratio * derive(self).bonusAd),
      unmodeled: ["Feast: a takedown ends the duel."],
    };
  },
};
