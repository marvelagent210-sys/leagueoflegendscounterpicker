import type { ItemModule } from "../equip";
import { memo, setStat } from "../runtime";

export const Dawncore: ItemModule = {
  item: "Dawncore",
  build(item, fighter) {
    const light = item.effect("First Light");
    const words = "Gain 2% heal and shield power and 15 ability power for every additional 100% base mana regeneration.";
    const power = light.quoted(words) / 100;
    const ap = light.quoted(words, 1);
    const per = light.quoted(words, 2);
    const regeneration = fighter.build.reduce((sum, record) => sum + (record.stats.mp5 ?? 0), 0);
    item.assume("First Light counts the base mana regeneration the build's items give in the shop, in proportion.");
    // Its own key: the shop's heal and shield power is a permanent status under the item's stat key.
    const key = memo(item.name, "First Light");
    const share = (power * regeneration) / per;
    return { bonus: { ap: (ap * regeneration) / per }, hooks: { onStart(ctx) { setStat(ctx.self, key, "healShieldPower", share, ctx.tick); } } };
  },
};
