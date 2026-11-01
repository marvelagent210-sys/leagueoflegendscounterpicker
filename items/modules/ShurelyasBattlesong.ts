import type { ItemModule } from "../equip";

export const ShurelyasBattlesong: ItemModule = {
  item: "Shurelya's Battlesong",
  build(item) {
    const speech = item.effect("Inspiring Speech");
    const words = "Grants you and all allies within 1000 units 30% bonus movement speed for 4 seconds.";
    return { actives: [{ name: speech.name, cooldown: speech.cooldown(), delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: speech.quoted(words, 1) / 100 }, duration: speech.quoted(words, 2) }] }] };
  },
};
