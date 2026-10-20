import type { ItemModule } from "../equip";

export const PhantomDancer: ItemModule = {
  item: "Phantom Dancer",
  build(item) {
    item.effect("Spectral Waltz").quote("Become permanently ghosted.");
    return { permanent: [{ state: "ghosted" }] };
  },
};
