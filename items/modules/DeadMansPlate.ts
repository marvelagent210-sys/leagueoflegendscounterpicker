import { toTicks } from "../../engine/rules/time";
import type { ItemModule } from "../equip";
import { memo, setStat } from "../runtime";
import { applyFrom } from "./shared";

export const DeadMansPlate: ItemModule = {
  item: "Dead Man's Plate",
  build(item) {
    const ship = item.effect("Shipwrecker");
    const words = "While moving, generates 7 stacks of Momentum every 0.25 seconds, granting up to 20 bonus movement speed at 100 stacks after 3.75 seconds of moving.";
    const perStep = ship.quoted(words);
    const step = ship.quoted(words, 1);
    const speed = ship.quoted(words, 2);
    const maxStacks = ship.quoted(words, 3);
    const flat = ship.series("Basic attacks consume all stacks to deal", 0);
    const share = ship.series("Basic attacks consume all stacks to deal", 1);
    if (flat.kind !== "variable" || share.kind !== "variable") throw new Error(`${item.name}: Shipwrecker's damage should depend on stacks of Momentum`);
    const perStack = Number(flat.values.at(-1)) / Number(flat.points.at(-1));
    const sharePerStack = Number(share.values.at(-1)) / 100 / Number(share.points.at(-1));
    const resist = item.effect("Unsinkable").quoted("Gain 15% slow resist.") / 100;
    item.assume("Shipwrecker has 100 stacks of Momentum when the fight starts, from walking to it; its damage grows evenly with the stacks.");
    const stacks = memo(item.name, "momentum");
    const next = memo(item.name, "next");
    const show = (ctx: { self: Parameters<typeof setStat>[0]; tick: number }, held: number) => setStat(ctx.self, memo(item.name, "speed"), "moveSpeedFlat", (speed * held) / maxStacks, ctx.tick);
    return {
      permanent: [{ stat: "slowResist", value: resist }],
      hooks: {
        onStart(ctx) {
          ctx.self.memory[stacks] = maxStacks;
          show(ctx, maxStacks);
        },
        onTick(ctx) {
          if (ctx.self.moved === 0) {
            delete ctx.self.memory[next];
            return;
          }
          const due = ctx.self.memory[next];
          if (due === undefined) ctx.self.memory[next] = ctx.tick + toTicks(step);
          else if (ctx.tick >= Number(due)) {
            const held = Math.min(maxStacks, Number(ctx.self.memory[stacks] ?? 0) + perStep);
            ctx.self.memory[stacks] = held;
            ctx.self.memory[next] = ctx.tick + toTicks(step);
            show(ctx, held);
          }
        },
        onAttackHit(ctx) {
          const held = Number(ctx.self.memory[stacks] ?? 0);
          if (held <= 0) return;
          ctx.self.memory[stacks] = 0;
          show(ctx, 0);
          if (!ctx.blocked) applyFrom(ctx, item.name, { type: "damage", damageType: "physical", amount: { base: perStack * held, ratios: { baseAD: sharePerStack * held } }, label: item.name }, false, ctx.scale);
        },
      },
    };
  },
};
