import type { ItemModule } from "../equip";
import { bonusHealth } from "../runtime";
import { decayHooks, itemShield, joinHooks, lifeline } from "./shared";

export const SteraksGage: ItemModule = {
  item: "Sterak's Gage",
  build(item, fighter) {
    const claws = item.effect("The Claws that Catch").quoted("Gain bonus attack damage equal to 50% base AD.") / 100;
    const line = item.effect("Lifeline");
    const words = "you first gain a shield that absorbs damage equal to 60% of bonus health which decays over 4.5 seconds.";
    const share = line.quoted(words) / 100;
    const seconds = line.quoted(words, 1);
    return {
      bonus: { ad: claws * fighter.spec.base.ad },
      hooks: joinHooks(lifeline(item.name, line, (ctx) => itemShield(ctx, item.name, share * bonusHealth(ctx.self), seconds, true)), decayHooks(item.name)),
    };
  },
};
