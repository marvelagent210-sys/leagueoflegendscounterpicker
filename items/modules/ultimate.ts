/** Ultimate haste: "Gain 30 ultimate haste." */
import type { ItemEffectData } from "../context";
import type { ItemDefinition } from "../equip";

export function ultimateHaste(effect: ItemEffectData, words: string): NonNullable<ItemDefinition["haste"]>[number] {
  return { slots: ["R"], haste: effect.quoted(words) };
}
