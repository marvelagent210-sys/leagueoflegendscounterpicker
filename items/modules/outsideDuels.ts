/**
 * Items whose effects can't act in a duel, each with why: they work through allies, a
 * takedown (which ends the duel), other enemies, or things a duel doesn't have.
 */
import type { ItemModule } from "../equip";

const ALLIES = "it works through allied champions, which a duel doesn't have.";
const TAKEDOWN = "a takedown ends the duel.";

function outside(item: string, reasons: Record<string, string>): ItemModule {
  return {
    item,
    build(data) {
      for (const effect of data.record.effects) if (!((effect.name ?? effect.slot) in reasons)) throw new Error(`${item}: no reason given for ${effect.name ?? effect.slot}`);
      return { unmodeled: Object.entries(reasons).map(([effect, why]) => `${effect}: ${why}`) };
    },
  };
}

export const OUTSIDE_DUELS: ItemModule[] = [
  outside("Ardent Censer", { Sanctify: ALLIES }),
  outside("Echoes of Helia", { "Soul Siphon": ALLIES }),
  outside("Moonstone Renewer", { "Starlit Grace": ALLIES }),
  outside("Staff of Flowing Water", { Rapids: ALLIES }),
  outside("Knight's Vow", { Sacrifice: ALLIES, Pledge: ALLIES }),
  outside("Axiom Arc", { Flux: TAKEDOWN }),
  outside("Cryptbloom", { "Life From Death": TAKEDOWN }),
  outside("Hubris", { Eminence: TAKEDOWN }),
  outside("Gluttonous Greaves", { Slay: TAKEDOWN }),
  outside("Ionian Boots of Lucidity", { "Ionian Insight": "the simulator has no summoner spells." }),
  outside("Runaan's Hurricane", { "Wind's Fury": "its bolts go to enemies other than the target, which in a duel can only be pets, and aren't modeled." }),
  outside("Actualizer", { "Mana Made Real": "its doubled mana costs and faster cooldowns aren't modeled yet, so it isn't cast." }),
];
