import type { ItemModule } from "../equip";
import { immolate } from "./immolate";

export const SunfireAegis: ItemModule = { item: "Sunfire Aegis", build: (item) => immolate(item, "Deal 20 (+ 1.5% bonus health) magic damage every second") };
