import type { ItemModule } from "../equip";
import { memo, setStat } from "../runtime";

export const YoumuusGhostblade: ItemModule = {
  item: "Youmuu's Ghostblade",
  build(item, fighter) {
    const haunt = item.effect("Haunt");
    const speed = haunt.meleeRanged("Gain 20 (melee) / 10 (ranged) bonus movement speed");
    const calm = haunt.quoted("while out-of-combat with enemy champions for 3 seconds.");
    const step = item.effect("Wraith Step");
    const share = step.meleeRanged("Gain 20% (melee) / 15% (ranged) bonus movement speed and ghosting");
    const seconds = step.meleeRanged("ghosting for 6 (melee) / 4 (ranged) seconds.");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee);
    const combat = fighter.combat();
    const key = memo(item.name, "haunt");
    return {
      hooks: { onTick: (ctx) => setStat(ctx.self, key, "moveSpeedFlat", combat.idle(ctx.self, ctx.tick) >= calm ? pick(speed) : 0, ctx.tick) },
      actives: [{
        name: step.name,
        cooldown: step.cooldown(),
        delivery: { kind: "self" },
        onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: pick(share) / 100 }, duration: pick(seconds) }, { type: "state", state: "ghosted", duration: pick(seconds) }],
      }],
    };
  },
};
