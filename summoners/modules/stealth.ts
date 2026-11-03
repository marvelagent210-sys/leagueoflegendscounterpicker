import type { Unit } from "../../engine/sim/state";
import type { SpellData } from "../context";

/** Whether the holder is stealthed (invisible or camouflaged). */
export function stealthed(unit: Unit): boolean {
  return unit.statuses.some((status) => status.kind === "state" && (status.key === "invisible" || status.key === "camouflage"));
}

/**
 * Exhaust and Ignite break stealth on activation (wiki: "Stealth"). Kits end their own stealth
 * in their cast hooks, which don't see summoner spells, so a stealthed holder keeps these two
 * until its stealth ends.
 */
export function keptInStealth(spell: SpellData): (unit: Unit) => boolean {
  spell.rule("Stealth").quote("The following summoner spells will break stealth upon activation: * Exhaust * Hexflash * Ignite * Mark / Dash * Smite");
  spell.assume("a stealthed holder keeps it until its stealth ends, since it would break the stealth.");
  return (unit) => !stealthed(unit);
}
