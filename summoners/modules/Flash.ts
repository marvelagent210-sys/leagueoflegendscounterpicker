import { attackRange } from "../../engine/sim/actions";
import type { Unit, World } from "../../engine/sim/state";
import { other } from "../../engine/sim/state";
import { spellKey, type SpellModule } from "../equip";

/** Attack range by which a side out-ranges the other, as the default behavior's spacing has it. */
const OUTRANGES = 50;

function outranges(unit: Unit, world: World): boolean {
  const enemy = world.units[other(unit.side)];
  return attackRange(unit, enemy) > attackRange(enemy, unit) + OUTRANGES;
}

const escaping = (unit: Unit, world: World) => world.modes[unit.side] === "flee" || world.modes[unit.side] === "kite";

export const Flash: SpellModule = {
  spell: "Flash",
  build(spell) {
    spell.quote("Blinks your champion a short distance toward the target location.");
    const distance = spell.range();
    spell.noted("Flash cannot be used while rooted, grounded, or unable to cast.");
    spell.noted("Flash will cast at max range if cast beyond that.");
    spell.assume("kept to dodge a decisive skillshot, toward the enemy or, for a side that out-ranges it, away; and to get away when fleeing or kiting. It isn't used to close the gap.");
    const cooldown = spell.cooldown();
    // Saved for what the default behavior answers with a blink: decisive skillshots, and escapes.
    const roles = ["defense" as const];
    return {
      movement: true,
      actives: [
        { cooldown, delivery: { kind: "blink", direction: "toward", distance }, roles, usable: (unit, world) => !outranges(unit, world) && !escaping(unit, world) },
        { variant: "away", cooldownKey: spellKey(spell.name), cooldown, delivery: { kind: "blink", direction: "away", distance }, roles, usable: (unit, world) => outranges(unit, world) || escaping(unit, world) },
      ],
    };
  },
};
