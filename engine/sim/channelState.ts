import type { Action, Unit } from "./state";

export type ChannelAction = Extract<Action, { kind: "channel" }>;

/** A permitted cast or dash may carry a channel with its original absolute clocks. */
export function channelIn(action: Action | undefined): ChannelAction | undefined {
  while (action) {
    if (action.kind === "channel") return action;
    action = action.kind === "cast" || action.kind === "dash" ? action.resume : undefined;
  }
  return undefined;
}

/** Removes that channel without discarding an independently committed cast above it. */
export function clearChannel(unit: Unit, channel: ChannelAction): void {
  if (unit.action === channel) { unit.action = undefined; return; }
  let action = unit.action;
  while (action?.kind === "cast" || action?.kind === "dash") {
    if (action.resume === channel) { delete action.resume; return; }
    action = action.resume;
  }
}
