import type { ItemModule } from "../equip";
import { CLEAVE } from "./hydras";

export const ProfaneHydra: ItemModule = {
  item: "Profane Hydra",
  build(item) {
    const active = item.effect("Heretical Cleave");
    const words = "Deal 80% AD physical damage to enemies in a 450 radius in front of you.";
    return {
      unmodeled: [CLEAVE],
      actives: [{ name: active.name, cooldown: active.cooldown(), delivery: { kind: "aura", radius: active.quoted(words, 1) }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: active.quoted(words) / 100 } } }] }],
    };
  },
};
