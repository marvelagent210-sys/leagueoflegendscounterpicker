/** Annul (Banshee's Veil, Edge of Night): a spell shield that comes back once the holder goes unhurt long enough. */
import { toTicks } from "../../engine/rules/time";
import { addStatus } from "../../engine/sim/combat";
import type { KitHooks } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import type { ItemData } from "../context";
import type { ItemDefinition } from "../equip";
import { activeKey, memo } from "../runtime";

export function annul(item: ItemData): ItemDefinition {
  const words = "Grants a spell shield that blocks the next hostile ability (40 second cooldown, timer restarts upon taking damage from champions).";
  const seconds = item.effect("Annul").quoted(words);
  item.assume("Annul is up when the fight starts.");
  const since = memo(item.name, "since");
  const up = (statuses: Array<{ memoKey?: string }>) => statuses.some((status) => status.memoKey === memo(item.name, "shield"));
  const grant = (ctx: { self: Unit; tick: number }) => {
    delete ctx.self.memory[since];
    if (!up(ctx.self.statuses)) addStatus(ctx.self, { kind: "state", key: "spellShield", source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0, charges: 1, ability: activeKey(item.name), memoKey: memo(item.name, "shield") });
  };
  const hooks: KitHooks = {
    onStart: (ctx) => grant(ctx),
    onSpellShieldBlock(ctx) {
      if (!up(ctx.self.statuses)) ctx.self.memory[since] = ctx.tick;
    },
    onDamageTaken(ctx) {
      if (ctx.self.memory[since] !== undefined && !ctx.petSource) ctx.self.memory[since] = ctx.tick;
    },
    onTick(ctx) {
      const from = ctx.self.memory[since];
      if (typeof from === "number" && ctx.tick - from >= toTicks(seconds) && !up(ctx.self.statuses)) grant(ctx);
    },
  };
  return { hooks };
}
