import type { ItemModule } from "../equip";
import { inflictGrievous } from "./shared";

export const MortalReminder: ItemModule = {
  item: "Mortal Reminder",
  build(item) {
    const seconds = item.effect("Grievous Wounds").quoted("Dealing physical damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.");
    return { hooks: { onDamageDealt: (ctx) => { if (ctx.damageType === "physical") inflictGrievous(ctx.world, ctx.self, ctx.enemy, seconds); } } };
  },
};
