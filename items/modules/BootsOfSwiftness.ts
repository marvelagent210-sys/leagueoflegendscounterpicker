import type { ItemModule } from "../equip";

export const BootsOfSwiftness: ItemModule = {
  item: "Boots of Swiftness",
  build(item) {
    return { permanent: [{ stat: "slowResist", value: item.effect("Fleetfooted").quoted("Gain 25% slow resist.") / 100 }] };
  },
};
