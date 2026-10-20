import { derive } from "../../engine/sim/derived";
import type { ItemModule } from "../equip";
import { OMNIVAMP, memo, setStat } from "../runtime";
import { itemShield, joinHooks, lifeline } from "./shared";

export const MawOfMalmortius: ItemModule = {
  item: "Maw of Malmortius",
  build(item, fighter) {
    const line = item.effect("Lifeline");
    const base = line.meleeRanged("you first gain a shield that absorbs 200 (melee) / 150 (ranged)");
    const share = line.meleeRanged("(+ 150% (melee) / 112.5% (ranged) bonus AD) magic damage for 3 seconds.");
    const seconds = line.quoted("magic damage for 3 seconds.");
    const vamp = line.quoted("Additionally, triggering this effect grants you 10% omnivamp until the end of combat.") / 100;
    const combat = fighter.combat();
    const key = memo(item.name, "omnivamp");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    return {
      omnivamp: true,
      hooks: joinHooks(
        lifeline(item.name, line, (ctx) => {
          itemShield(ctx, item.name, pick(base) + (pick(share) / 100) * derive(ctx.self).bonusAd, seconds, false, "magic");
          setStat(ctx.self, key, OMNIVAMP, vamp, ctx.tick);
        }, { magicOnly: true }),
        // "Until the end of combat".
        { onTick: (ctx) => { if (!combat.inCombat(ctx.self, ctx.tick)) setStat(ctx.self, key, OMNIVAMP, 0, ctx.tick); } },
      ),
    };
  },
};
