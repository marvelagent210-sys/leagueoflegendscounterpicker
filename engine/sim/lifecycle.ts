/** Finite temporary lifecycles advance before tick effects and cast completions. */
import { hookContext, log } from "./combat";
import { abilityOf } from "./forms";
import type { World } from "./state";
import { channelIn } from "./channelState";

export function advanceLifecycles(world: World): void {
  for (const unit of world.units) {
    if (unit.resurrection && world.tick >= unit.resurrection.endTick) {
      delete unit.resurrection;
      unit.statuses = unit.statuses.filter((status) => status.ability !== "engine:resurrection");
      if (unit.alive && unit.hp > 0) log(world, unit.side, "resurrection completes with remaining health");
    }
    if (unit.deathDefied && world.tick >= unit.deathDefied.endTick) {
      const action = unit.action;
      // Remove the marker first so nested lifecycle work cannot repeat the terminal
      // callback. The kit resolves its final packet before the corpse is finalized.
      delete unit.deathDefied;
      unit.spec.hooks?.onDeathDefiedEnd?.(hookContext(world, unit));
      unit.action = undefined;
      delete unit.pendingAttack;
      const channel = channelIn(action);
      if (channel) {
        const ability = abilityOf(unit, channel.ability);
        if (ability) unit.spec.hooks?.onChannelInterrupt?.({ ...hookContext(world, unit, ability), reason: "death" });
      }
      unit.hp = 0;
      unit.alive = false;
      unit.statuses = unit.statuses.filter((status) => status.ability !== "engine:deathDefied");
      log(world, unit.side, "post-death window ends");
    }
  }
}
