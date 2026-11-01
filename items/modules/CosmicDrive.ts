import type { ItemModule } from "../equip";
import { memo } from "../runtime";

export const CosmicDrive: ItemModule = {
  item: "Cosmic Drive",
  build(item) {
    const words = "Dealing magic or true damage to an enemy champion grants you 20 bonus movement speed for 4 seconds.";
    const dance = item.effect("Spelldance");
    const speed = dance.quoted(words);
    const seconds = dance.quoted(words, 1);
    return { hooks: { onDamageDealt: (ctx) => { if (!ctx.petSource && (ctx.damageType === "magic" || ctx.damageType === "true")) ctx.buff(memo(item.name, "speed"), "moveSpeedFlat", speed, seconds); } } };
  },
};
