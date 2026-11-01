import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, setStat, until } from "../runtime";
import { itemDamage } from "./shared";

export const Terminus: ItemModule = {
  item: "Terminus",
  build(item) {
    const shadow = item.effect("Shadow");
    const words = "Basic attacks deal 30 (+10% bonus AD) (+ 10% AP) bonus magic damage on-hit.";
    const jux = item.effect("Juxtaposition");
    const seconds = jux.quoted("each one granting a bonus for 5 seconds that stacks up to 3 times");
    const maxStacks = jux.quoted("each one granting a bonus for 5 seconds that stacks up to 3 times", 1);
    const resists = jux.level("Light hits grant");
    const pen = jux.quoted("while Dark hits grant 10% armor penetration and magic penetration") / 100;
    jux.quote("Basic attacks on-hit against champions alternate between Light and Dark hits");
    item.assume("Juxtaposition starts with a Light hit; each kind's stacks last 5 seconds from its last hit, and its penetration is one source of 10% a stack.");
    const next = memo(item.name, "dark");
    const stack = (self: Parameters<typeof until>[0], kind: string, tick: number) => {
      const key = memo(item.name, kind);
      const held = tick <= until(self, `${key}:until`) ? Number(self.memory[key] ?? 0) : 0;
      const now = Math.min(maxStacks, held + 1);
      self.memory[key] = now;
      self.memory[`${key}:until`] = tick + toTicks(seconds);
      return now;
    };
    return {
      onHit: [itemDamage(item.label, "magic", { base: shadow.quoted(words), ratios: { bonusAD: shadow.quoted(words, 1) / 100, AP: shadow.quoted(words, 2) / 100 } }, item.tagged("OnHitAppliesLifeSteal"))],
      hooks: {
        onAttackHit(ctx) {
          if (ctx.blocked) return;
          const dark = ctx.self.memory[next] === true;
          ctx.self.memory[next] = !dark;
          const end = ctx.tick + toTicks(seconds);
          if (dark) {
            const stacks = stack(ctx.self, "darkStacks", ctx.tick);
            setStat(ctx.self, memo(item.name, "armorPen"), "armorPen", stacks * pen, ctx.tick, end);
            setStat(ctx.self, memo(item.name, "magicPen"), "magicPenPercent", stacks * pen, ctx.tick, end);
          } else {
            const stacks = stack(ctx.self, "lightStacks", ctx.tick);
            setStat(ctx.self, memo(item.name, "armor"), "armor", stacks * resists, ctx.tick, end);
            setStat(ctx.self, memo(item.name, "MR"), "MR", stacks * resists, ctx.tick, end);
          }
        },
      },
    };
  },
};
