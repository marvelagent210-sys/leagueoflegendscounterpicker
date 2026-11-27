import type { ItemModule } from "../equip";
import { cleave } from "./hydras";

export const RavenousHydra: ItemModule = {
  item: "Ravenous Hydra",
  build(item, fighter) {
    const active = item.effect("Ravenous Crescent");
    const words = "Deal 80% AD physical damage to enemies within a 450 radius in front of you.";
    active.quote("This damage benefits from life steal at 100% effectiveness.");
    return {
      hooks: cleave(item, fighter, "Basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other enemies in a 350 radius centered around the target.", true),
      actives: [{ name: active.name, cooldown: active.cooldown(), delivery: { kind: "aura", radius: active.quoted(words, 1) }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: active.quoted(words) / 100 } } }], flags: { appliesLifeSteal: true } }],
    };
  },
};
