import { derive } from "../../engine/sim/derived";
import type { SpellModule } from "../equip";

export const Heal: SpellModule = {
  spell: "Heal",
  build(spell) {
    const amount = spell.level("Heals your champion and the allied champion nearest to the cursor for");
    const speed = "while also granting both of you 30% bonus total movement speed for 1 second.";
    spell.quote("Champions affected by Heal within 35 seconds cause subsequent Heal casts on them to restore 50% less health.");
    spell.assume("cast in combat below 90% health, as the default behavior uses the kit's heals, once it would restore its whole amount.");
    return {
      actives: [{
        cooldown: spell.cooldown(),
        delivery: { kind: "self" },
        onSelf: [{ type: "heal", amount: { base: amount } }, { type: "stat", stat: "moveSpeedPercent", amount: { base: spell.quoted(speed) / 100 }, duration: spell.quoted(speed, 1) }],
        usable: (unit) => derive(unit).maxHp - unit.hp >= amount,
      }],
      unmodeled: ["Its heal on an allied champion: a duel has none.", "Its smaller heal within 35 seconds of the last: its 240-second cooldown allows one Heal a fight."],
    };
  },
};
