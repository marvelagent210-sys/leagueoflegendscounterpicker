import type { ItemModule } from "../equip";

export const RanduinsOmen: ItemModule = {
  item: "Randuin's Omen",
  build(item) {
    const humility = item.effect("Humility");
    const words = "Unleash a shockwave around you that slows nearby enemies by 70% for 2 seconds.";
    // Critical strikes are expected values in the simulator: the cut applies to the critical share.
    const resilience = item.effect("Resilience").quoted("Reduces incoming damage from critical strikes by 30%.") / 100;
    return {
      permanent: [{ stat: "critDamageTaken", value: resilience }],
      actives: [{ name: humility.name, cooldown: humility.cooldown(), delivery: { kind: "aura", radius: humility.range() }, onHit: [{ type: "cc", cc: "slow", duration: humility.quoted(words, 1), strength: humility.quoted(words) / 100 }] }],
    };
  },
};
