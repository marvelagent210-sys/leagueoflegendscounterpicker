import type { ItemModule } from "../equip";

export const RanduinsOmen: ItemModule = {
  item: "Randuin's Omen",
  build(item) {
    const humility = item.effect("Humility");
    const words = "Unleash a shockwave around you that slows nearby enemies by 70% for 2 seconds.";
    return {
      actives: [{ name: humility.name, cooldown: humility.cooldown(), delivery: { kind: "aura", radius: humility.range() }, onHit: [{ type: "cc", cc: "slow", duration: humility.quoted(words, 1), strength: humility.quoted(words) / 100 }] }],
      unmodeled: ["Resilience: the simulator's damage hooks can't tell a critical outcome from an ordinary one yet."],
    };
  },
};
