import type { SpellModule } from "../equip";

export const Barrier: SpellModule = {
  spell: "Barrier",
  build(spell) {
    const amount = spell.level("Grants your champion a shield that absorbs");
    const seconds = spell.quoted("damage for 2.5 seconds.");
    spell.assume("cast in combat below 90% health, as the default behavior uses the kit's shields.");
    return {
      actives: [{ cooldown: spell.cooldown(), delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: { base: amount }, duration: seconds }] }],
    };
  },
};
