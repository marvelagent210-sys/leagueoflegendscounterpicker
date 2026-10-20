import type { ItemModule } from "../equip";
import { itemDamage } from "./shared";

export const NashorsTooth: ItemModule = {
  item: "Nashor's Tooth",
  build(item) {
    const bite = item.effect("Icathian Bite");
    const words = "Basic attacks deal 15 (+ 15% AP) bonus magic damage on-hit.";
    return { onHit: [itemDamage(item.label, "magic", { base: bite.quoted(words), ratios: { AP: bite.quoted(words, 1) / 100 } }, item.tagged("OnHitAppliesLifeSteal"))] };
  },
};
