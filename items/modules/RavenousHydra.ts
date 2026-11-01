import type { ItemModule } from "../equip";
import { CLEAVE } from "./hydras";

export const RavenousHydra: ItemModule = {
  item: "Ravenous Hydra",
  build(item) {
    const active = item.effect("Ravenous Crescent");
    const words = "Deal 80% AD physical damage to enemies within a 450 radius in front of you.";
    active.quote("This damage benefits from life steal at 100% effectiveness.");
    return {
      unmodeled: [CLEAVE],
      actives: [{ name: active.name, cooldown: active.cooldown(), delivery: { kind: "aura", radius: active.quoted(words, 1) }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: active.quoted(words) / 100 } } }], flags: { appliesLifeSteal: true } }],
    };
  },
};
