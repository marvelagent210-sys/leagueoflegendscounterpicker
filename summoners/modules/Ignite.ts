import { SpellDataError } from "../context";
import type { SpellModule } from "../equip";
import { keptInStealth } from "./stealth";

export const Ignite: SpellModule = {
  spell: "Ignite",
  build(spell) {
    const seconds = spell.quoted("Sets the target enemy champion on fire for 5 seconds");
    const total = spell.level("true damage over the duration");
    const perTick = spell.noteLevel("Each tick of Ignite deals");
    spell.quote("with the first tick of damage occurring briefly after the cast");
    const interval = spell.quoted("subsequent ticks occurring every 1.056 seconds after the previous");
    spell.quote("The target is also inflicted with Grievous Wounds for the same duration.");
    // The first tick comes with the cast, then one every interval: five within the 5 seconds.
    const ticks = Math.round(total / perTick);
    if (Math.abs(ticks * perTick - total) > 1e-6 || (ticks - 1) * interval > seconds || ticks * interval <= seconds) {
      throw new SpellDataError(spell.name, `${total} true damage in ticks of ${perTick} every ${interval} seconds doesn't fit ${seconds} seconds`);
    }
    spell.noted("Ignite deals proc damage and is tagged as periodic without applying spell effects.");
    spell.noted("Ignite's damage cannot be amplified by damage amplifiers.");
    spell.assume("its first tick lands with the cast, the start of the wiki's [0 to 0.264] seconds.");
    spell.assume("the true damage amplifiers the simulator applies amplify it, though the wiki says nothing can: the simulator has no unamplified damage yet.");
    spell.assume("cast as soon as the enemy is in range, as the default behavior uses the kit's damage.");
    return {
      actives: [{
        cooldown: spell.cooldown(),
        delivery: { kind: "target", range: spell.range() },
        onHit: [
          { type: "damage", damageType: "true", amount: { base: perTick }, persistent: true, label: spell.label },
          { type: "dot", damageType: "true", total: { base: total - perTick }, duration: (ticks - 1) * interval, interval, label: spell.label },
          { type: "grievousWounds", duration: seconds },
        ],
        usable: keptInStealth(spell),
      }],
      unmodeled: ["Its reveal: duels have no sight."],
    };
  },
};
