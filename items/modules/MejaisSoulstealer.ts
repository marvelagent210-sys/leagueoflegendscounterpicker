import type { ItemModule } from "../equip";

export const MejaisSoulstealer: ItemModule = {
  item: "Mejai's Soulstealer",
  options: { stacks: { label: "Glory stacks from kills and assists before the fight (25 at most)", default: 0 } },
  build(item, _fighter, options) {
    const glory = item.effect("Glory");
    const most = glory.quoted("up to a maximum of 25 stacks.");
    const perStack = glory.quoted("For every stack, gain 5 ability power, up to 125 at maximum stacks.");
    const speedWords = "If you have at least 10 stacks, also gain 10% bonus movement speed.";
    const stacks = Math.min(most, Math.max(0, Math.round(options.stacks ?? 0)));
    return {
      bonus: { ap: perStack * stacks },
      ...(stacks >= glory.quoted(speedWords) ? { permanent: [{ stat: "moveSpeedPercent" as const, value: glory.quoted(speedWords, 1) / 100 }] } : {}),
      unmodeled: [],
    };
  },
};
