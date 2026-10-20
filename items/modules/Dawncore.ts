import type { ItemModule } from "../equip";

export const Dawncore: ItemModule = {
  item: "Dawncore",
  build(item, fighter) {
    const light = item.effect("First Light");
    const words = "Gain 2% heal and shield power and 10 ability power for every additional 100% base mana regeneration.";
    const ap = light.quoted(words, 1);
    const per = light.quoted(words, 2);
    const regeneration = fighter.build.reduce((sum, record) => sum + (record.stats.mp5 ?? 0), 0);
    item.assume("First Light counts the base mana regeneration the build's items give in the shop, in proportion; its heal and shield power isn't modeled yet.");
    return { bonus: { ap: (ap * regeneration) / per } };
  },
};
