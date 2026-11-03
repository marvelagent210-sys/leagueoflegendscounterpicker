import type { ItemModule } from "../equip";
import { bonusHealth, memo, setStat } from "../runtime";

export const LordDominiksRegards: ItemModule = {
  item: "Lord Dominik's Regards",
  build(item) {
    const slayer = item.effect("Giant Slayer");
    slayer.quote("Deal 0% – 15% (based on target's bonus health) increased damage against enemy champions.");
    const byHealth = slayer.series("increased damage against enemy champions");
    if (byHealth.kind !== "variable" || byHealth.variable !== "target's bonus health") throw new Error(`${item.name}: Giant Slayer should depend on the target's bonus health`);
    const top = Number(byHealth.values.at(-1)) / 100;
    const at = Number(byHealth.points.at(-1));
    item.assume(`Giant Slayer grows evenly with the target's bonus health, to ${top * 100}% at ${at}.`);
    const key = memo(item.name, "damage");
    return {
      hooks: { onTick: (ctx) => setStat(ctx.self, key, "damageDealt", top * Math.min(1, Math.max(0, bonusHealth(ctx.enemy)) / at), ctx.tick) },
      budget: { stats: (self, enemy) => [{ stat: "damageDealt", value: top * Math.min(1, Math.max(0, bonusHealth(enemy)) / at) }] },
    };
  },
};
