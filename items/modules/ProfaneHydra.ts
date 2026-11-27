import type { ItemModule } from "../equip";
import { cleave } from "./hydras";

export const ProfaneHydra: ItemModule = {
  item: "Profane Hydra",
  build(item, fighter) {
    const active = item.effect("Heretical Cleave");
    const words = "Deal 80% AD physical damage to enemies in a 450 radius in front of you.";
    return {
      hooks: cleave(item, fighter, "Damaging basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other enemies in a 350 radius centered around the target."),
      actives: [{ name: active.name, cooldown: active.cooldown(), delivery: { kind: "aura", radius: active.quoted(words, 1) }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: active.quoted(words) / 100 } } }] }],
    };
  },
};
