import type { ItemModule } from "../equip";
import { memo } from "../runtime";
import { applyFrom } from "./shared";

export const Stormrazor: ItemModule = {
  item: "Stormrazor",
  build(item, fighter) {
    item.effect("Energized").quote("Moving and basic attacking generates Energize stacks, up to 100.");
    const bolt = item.effect("Bolt");
    const words = "When fully Energized, your next basic attack deals 100 bonus magic damage on-hit and grants you 45% bonus movement speed for 1.5 seconds.";
    const damage = bolt.quoted(words);
    const speed = bolt.quoted(words, 1) / 100;
    const seconds = bolt.quoted(words, 2);
    fighter.energized().add({
      onHit(ctx, scale) {
        applyFrom(ctx, item.name, { type: "damage", damageType: "magic", amount: { base: damage }, label: item.name }, false, scale);
        ctx.buff(memo(item.name, "speed"), "moveSpeedPercent", speed, seconds);
      },
    });
    return {};
  },
};
