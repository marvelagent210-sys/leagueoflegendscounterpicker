import type { SpellModule } from "../equip";

export const Ghost: SpellModule = {
  spell: "Ghost",
  build(spell) {
    const speed = spell.level("Your champion ignores unit collision and gains") / 100;
    const seconds = spell.quoted("bonus movement speed for 10 seconds.");
    spell.noted("Ghost's movement speed stacks additively.");
    spell.assume("cast to close the gap when out of attack range, as the default behavior uses the kit's movement speed boosts.");
    return {
      actives: [{
        cooldown: spell.cooldown(),
        delivery: { kind: "self" },
        onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: speed }, duration: seconds }, { type: "state", state: "ghosted", duration: seconds }],
      }],
    };
  },
};
