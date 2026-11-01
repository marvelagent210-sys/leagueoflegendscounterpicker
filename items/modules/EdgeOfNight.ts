import type { ItemModule } from "../equip";
import { annul } from "./annul";

export const EdgeOfNight: ItemModule = { item: "Edge of Night", build: (item) => annul(item) };
