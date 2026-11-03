/** Summoner spells that do nothing in a duel: the loadout search leaves them out. */
import type { SpellModule } from "../equip";

export const Smite: SpellModule = {
  spell: "Smite",
  build(spell) {
    spell.quote("Deals 600 true damage to the target medium / large monster or enemy minion.");
    spell.quote("Transforms into Unleashed Smite once a jungle pet is fed 15 treats.");
    spell.noted("Role Binding: In Summoner's Rift permanent queues, Smite is only available to players drafted in the Jungle role and must occupy one of their summoner spell slots.");
    return { outsideDuels: "A jungler's spell (Role Binding): it hits monsters and minions, and champions only once a jungle pet makes it Unleashed Smite. A duel has neither jungle nor roles." };
  },
};

export const Teleport: SpellModule = {
  spell: "Teleport",
  build(spell) {
    spell.quote("causes your champion to dash to the location of the target allied turret, minion, or ward");
    return { outsideDuels: "It travels to an allied turret, minion or ward, and a duel has none." };
  },
};
