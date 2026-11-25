import type { ItemModule } from "../equip";

/** Ionian Insight: summoner spell haste, which only summoner spells' cooldowns take (engine/sim/cooldowns.ts). */
export const IonianBoots: ItemModule = {
  item: "Ionian Boots of Lucidity",
  build(item) {
    const haste = item.effect("Ionian Insight").quoted("Gain 10 summoner spell haste.");
    return { bonus: { summonerSpellHaste: haste } };
  },
};
