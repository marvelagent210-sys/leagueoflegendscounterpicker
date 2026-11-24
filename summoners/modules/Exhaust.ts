import type { SpellModule } from "../equip";
import { keptInStealth } from "./stealth";

export const Exhaust: SpellModule = {
  spell: "Exhaust",
  build(spell) {
    const words = "Weakens the target enemy champion for 3 seconds, slowing them by 40% and reducing their damage dealt by 35%.";
    const seconds = spell.quoted(words);
    spell.noted("Exhaust will not reduce true damage.");
    spell.noted("Exhaust applies its slow and damage reduction as separate debuffs, of which only the slow can be affected by tenacity or cleansed.");
    spell.assume("cast as soon as the enemy is in range, as the default behavior uses the kit's crowd control.");
    return {
      actives: [{
        cooldown: spell.cooldown(),
        delivery: { kind: "target", range: spell.range() },
        onHit: [
          { type: "cc", cc: "slow", duration: seconds, strength: spell.quoted(words, 1) / 100 },
          { type: "stat", stat: "damageDealt", amount: { base: -spell.quoted(words, 2) / 100 }, duration: seconds },
        ],
        usable: keptInStealth(spell),
      }],
    };
  },
};
