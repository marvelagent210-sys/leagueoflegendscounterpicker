import type { ItemModule } from "../equip";
import { immolate } from "./immolate";

export const HollowRadiance: ItemModule = {
  item: "Hollow Radiance",
  build: (item) => ({ ...immolate(item, "Deal 15 (+ 1% bonus health) magic damage every second"), unmodeled: ["Desolate: it needs a kill, which ends the duel."] }),
};
