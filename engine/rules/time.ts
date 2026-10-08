/**
 * Game time. The server simulates the game in ticks of about 1/30 s, and timed effects
 * end on the tick after their duration ("Template:Rounded up to next game tick").
 */

export const TICK_RATE = 30;
export const TICK = 1 / TICK_RATE;

/** Seconds to ticks, rounded up to the next game tick. */
export function toTicks(seconds: number): number {
  if (seconds <= 0) return 0;
  return Math.ceil(seconds * TICK_RATE - 1e-9);
}

export function toSeconds(ticks: number): number {
  return ticks / TICK_RATE;
}
