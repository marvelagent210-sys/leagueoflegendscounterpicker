import type { ItemModule } from "../equip";
import { activeKey } from "../runtime";
import { decayActiveShield, decayHooks, joinHooks } from "./shared";

export const LocketOfTheIronSolari: ItemModule = {
  item: "Locket of the Iron Solari",
  build(item) {
    const devotion = item.effect("Devotion");
    devotion.quote("Grants you and allied champions within 850 units a shield for");
    const byLevel = devotion.series("Grants you and allied champions within 850 units a shield for");
    if (byLevel.kind !== "variable" || byLevel.variable !== "target's level") throw new Error(`${item.name}: Devotion's shield should depend on the target's level`);
    // The holder is the target: its band at level 20.
    const amount = Number(byLevel.values[byLevel.points.findLastIndex((point) => Number(point) <= 20)]);
    const seconds = devotion.quoted("that decays over 2.5 seconds.");
    return {
      actives: [{ name: devotion.name, cooldown: devotion.cooldown(), delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: amount }, duration: seconds }] }],
      hooks: joinHooks({ onCast: (ctx) => { if (ctx.ability.key === activeKey(item.name)) decayActiveShield(ctx, item.name, seconds); } }, decayHooks(item.name)),
    };
  },
};
