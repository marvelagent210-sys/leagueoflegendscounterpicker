import type { ItemModule } from "../equip";

export const HextechGunblade: ItemModule = {
  item: "Hextech Gunblade",
  build(item) {
    const bolt = item.effect("Lightning Bolt");
    const ap = bolt.quoted("(+ 30% AP) magic damage") / 100;
    const words = "slowing them by 25% for 1.5 seconds";
    item.assume(`${bolt.name} lands at once: the wiki gives no speed for the bolt.`);
    return {
      actives: [{
        name: bolt.name,
        cooldown: bolt.cooldown(),
        delivery: { kind: "target", range: bolt.range() },
        onHit: [
          { type: "damage", damageType: "magic", amount: { base: bolt.level("Shocks the target enemy champion with a bolt of lightning"), ratios: { AP: ap } } },
          { type: "cc", cc: "slow", duration: bolt.quoted(words, 1), strength: bolt.quoted(words) / 100 },
        ],
      }],
    };
  },
};
