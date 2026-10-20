import type { ItemModule } from "../equip";

export const SpiritVisage: ItemModule = {
  item: "Spirit Visage",
  build(item) {
    const share = item.effect("Boundless Vitality").quoted("Increases all healing and shielding received as well as health regeneration by 25%.") / 100;
    item.assume("Boundless Vitality increases healing and health regeneration; its shielding part isn't modeled, the simulator having no stat for shields received.");
    return { permanent: [{ stat: "healingIncrease", value: share }] };
  },
};
