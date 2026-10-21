import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import type { ItemModule } from "../equip";

export const MercurialScimitar: ItemModule = {
  item: "Mercurial Scimitar",
  build(item) {
    const silver = item.effect("Quicksilver");
    const words = "Removes all crowd control debuffs (except Airborne) from your champion and grants 50% bonus total movement speed and ghosting for 2 seconds.";
    const speed = silver.quoted(words) / 100;
    const seconds = silver.quoted(words, 1);
    const types = (Object.keys(CC_RULES) as CCType[]).filter((type) => type !== "airborne" && type !== "stasis");
    return {
      actives: [{
        name: silver.name,
        cooldown: silver.cooldown(),
        delivery: { kind: "self" },
        usableWhileStunned: true,
        onSelf: [{ type: "cleanse", types }, { type: "stat", stat: "moveSpeedPercent", amount: { base: speed }, duration: seconds }, { type: "state", state: "ghosted", duration: seconds }],
        roles: ["defense"],
      }],
    };
  },
};
