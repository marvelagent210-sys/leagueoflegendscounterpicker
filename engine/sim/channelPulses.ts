/** Shared channel pulse valuation: retain callbacks, and snapshot their result only at cast. */
import { evaluate } from "./derived";
import type { ChannelSpec } from "./spec";
import type { Unit } from "./state";

type PulseSource = Pick<ChannelSpec, "pulses" | "pulsesFor">;

/** The callback is pure; callers decide when its current-unit result becomes a cast snapshot. */
export function channelPulseCount(channel: PulseSource, self: Unit): number | undefined {
  if (channel.pulsesFor) {
    const count = channel.pulsesFor(self);
    if (!Number.isFinite(count) || count <= 0) throw new Error("Channel pulse callback must return a finite positive count");
    return Math.max(1, Math.floor(count + 1e-6));
  }
  return channel.pulses ? Math.max(1, Math.floor(evaluate(channel.pulses, self) + 1e-6)) : undefined;
}
