/** The Tear items' Manaflow: bonus mana stacked before the fight, up to 360, after which the item transforms. */
import type { KitOption } from "../../engine/kits/compile";
import type { ItemData } from "../context";

export const MANAFLOW_OPTION: Record<string, KitOption> = { mana: { label: "Bonus mana Manaflow stacked before the fight (it transforms at 360)", default: 0 } };

/** The Manaflow mana the build holds, read from the item's words. */
export function manaflow(item: ItemData, words: string, options: Record<string, number>): number {
  const most = item.effect("Manaflow").quoted(words);
  item.effect("pass3").quote(`Transforms into ${item.record.transformsInto} at 360 bonus mana.`);
  return Math.min(most, Math.max(0, options.mana ?? 0));
}

export const STACKING = "Manaflow stacks no mana during a duel, which is too short; the mana it stacked before the fight is an option.";
