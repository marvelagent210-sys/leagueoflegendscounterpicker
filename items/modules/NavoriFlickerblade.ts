import { cooldownKeyOf } from "../../engine/sim/spec";
import type { ItemModule } from "../equip";

export const NavoriFlickerblade: ItemModule = {
  item: "Navori Flickerblade",
  build(item, fighter) {
    const share = item.effect("Transcendence").quoted("Basic attacks on-attack reduce the remaining cooldowns of your basic abilities by 15%.") / 100;
    const basic = [...new Set(fighter.spec.abilities.filter((ability) => ability.slot === "Q" || ability.slot === "W" || ability.slot === "E").map(cooldownKeyOf))];
    return {
      hooks: {
        onAttackLaunch(ctx) {
          for (const key of basic) ctx.apply({ type: "refund", ability: key, fraction: share }, true);
        },
      },
    };
  },
};
