/** Every summoner spell's module, by the spell's name in the catalog. */
import type { SpellModule } from "../equip";
import { Barrier } from "./Barrier";
import { Cleanse } from "./Cleanse";
import { Exhaust } from "./Exhaust";
import { Flash } from "./Flash";
import { Ghost } from "./Ghost";
import { Heal } from "./Heal";
import { Ignite } from "./Ignite";
import { Smite, Teleport } from "./outsideDuels";

export const SPELL_MODULES: Readonly<Record<string, SpellModule>> = Object.fromEntries(
  [Barrier, Cleanse, Exhaust, Flash, Ghost, Heal, Ignite, Smite, Teleport].map((module) => [module.spell, module]),
);
