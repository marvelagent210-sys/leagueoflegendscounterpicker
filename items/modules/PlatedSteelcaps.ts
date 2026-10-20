import type { ItemModule } from "../equip";

export const PlatedSteelcaps: ItemModule = {
  item: "Plated Steelcaps",
  build(item) {
    const share = item.effect("Plating").quoted("Reduces all incoming basic damage by 10% (excluding from turret attacks).") / 100;
    item.assume("Plating reduces the basic attack's own damage, not its on-hit effects.");
    return { hooks: { modifyDamageTakenRaw: (ctx) => (ctx.attack && ctx.ability === undefined ? ctx.raw * (1 - share) : ctx.raw) } };
  },
};
