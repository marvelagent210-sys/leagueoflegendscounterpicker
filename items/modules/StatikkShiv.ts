import type { ItemModule } from "../equip";
import { applyFrom } from "./shared";

export const StatikkShiv: ItemModule = {
  item: "Statikk Shiv",
  build(item, fighter) {
    item.effect("Energized").quote("Moving and basic attacking generates Energize stacks, up to 100.");
    const extra = item.effect("Electroshock").quoted("Basic attacks generate 9 bonus Energize stacks, for a total of 15 stacks per attack.");
    const spark = item.effect("Electrospark");
    const damage = spark.quoted("When fully Energized, your next basic attack on-hit is empowered to form chain lightning, dealing 60 bonus magic damage");
    fighter.energized().add({ perAttack: extra, onHit: (ctx, scale) => applyFrom(ctx, item.label, { type: "damage", damageType: "magic", amount: { base: damage }, label: item.label }, false, scale) });
    item.assume("Electrospark's bounces to other targets aren't modeled: in a duel they can only be pets.");
    return {};
  },
};
