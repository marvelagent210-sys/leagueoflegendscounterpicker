import type { ItemModule } from "../equip";
import { annul } from "./annul";

export const BansheesVeil: ItemModule = { item: "Banshee's Veil", build: (item) => annul(item) };
