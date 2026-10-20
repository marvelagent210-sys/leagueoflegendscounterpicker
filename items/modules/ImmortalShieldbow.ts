import type { ItemModule } from "../equip";
import { itemShield, lifeline } from "./shared";

export const ImmortalShieldbow: ItemModule = {
  item: "Immortal Shieldbow",
  build(item, fighter) {
    const line = item.effect("Lifeline");
    const amount = line.level("you first gain a shield that absorbs", fighter.ranged ? 1 : 0);
    const seconds = line.quoted("damage for 3 seconds.");
    return { hooks: lifeline(item.name, line, (ctx) => itemShield(ctx, item.name, amount, seconds, false)) };
  },
};
