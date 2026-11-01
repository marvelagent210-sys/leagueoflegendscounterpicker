import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import type { ItemModule } from "../equip";

export const MikaelsBlessing: ItemModule = {
  item: "Mikael's Blessing",
  build(item) {
    const purify = item.effect("Purify");
    purify.quote("Remove all crowd control debuffs (except Airborne, Blind, Disarm, Nearsight, and Suppression) from yourself or the target allied champion");
    const kept = new Set<string>(["airborne", "blind", "disarm", "nearsight", "suppression", "stasis"]);
    const types = (Object.keys(CC_RULES) as CCType[]).filter((type) => !kept.has(type));
    const heal = purify.level("and heal the target for");
    return {
      // Like every item but the cleanse item, not while knocked up or stunned (equip.ts STOPS_ITEMS).
      actives: [{ name: purify.name, cooldown: purify.cooldown(), delivery: { kind: "self" }, onSelf: [{ type: "cleanse", types }, { type: "heal", amount: { base: heal } }], roles: ["defense"] }],
    };
  },
};
