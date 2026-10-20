import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { bonusHealth, follow, memo } from "../runtime";
import { joinHooks } from "./shared";

export const OverlordsBloodmail: ItemModule = {
  item: "Overlord's Bloodmail",
  build(item) {
    const tyranny = item.effect("Tyranny").quoted("Gain bonus attack damage equal to 2.5% bonus health.") / 100;
    const retribution = item.effect("Retribution");
    retribution.quote("of your total attack damage from other sources.");
    const byMissing = retribution.series("Gain bonus attack damage equal to");
    if (byMissing.kind !== "variable" || byMissing.variable !== "missing health") throw new Error(`${item.name}: Retribution should depend on missing health`);
    const top = Number(byMissing.values.at(-1)) / 100;
    const at = Number(byMissing.points.at(-1)) / 100;
    item.assume(`Retribution grows evenly with missing health, to ${top * 100}% at ${Math.round(at * 100)}% missing health (the wiki shows it in 1% steps).`);
    const share = (self: Parameters<typeof bonusHealth>[0]) => top * Math.min(1, Math.max(0, 1 - self.hp / derive(self).maxHp) / at);
    return {
      hooks: joinHooks(
        follow(memo(item.name, "tyranny"), "AD", (self) => tyranny * bonusHealth(self)),
        follow(memo(item.name, "retribution"), "AD", (self, current) => share(self) * (derive(self).ad - current), 1),
      ),
    };
  },
};
