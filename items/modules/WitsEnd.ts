import type { ItemModule } from "../equip";
import { itemDamage } from "./shared";

export const WitsEnd: ItemModule = {
  item: "Wit's End",
  build(item) {
    const damage = item.effect("Fray").quoted("Basic attacks deal 45 bonus magic damage on-hit.");
    return { onHit: [itemDamage(item.name, "magic", { base: damage }, item.tagged("OnHitAppliesLifeSteal"))] };
  },
};
