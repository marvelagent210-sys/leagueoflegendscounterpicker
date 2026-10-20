import type { ItemModule } from "../equip";
import { itemDamage } from "./shared";

export const TitanicHydra: ItemModule = {
  item: "Titanic Hydra",
  build(item, fighter) {
    const cleave = item.effect("Cleave");
    const share = cleave.meleeRanged("Basic attacks on-hit deal 1% (melee) / 0.5% (ranged) maximum health bonus physical damage to the target");
    const crescent = item.effect("Titanic Crescent");
    const empowered = crescent.meleeRanged("empowers Cleave to deal 4% (melee) / 2% (ranged) maximum health bonus physical damage to the primary target");
    const window = crescent.quoted("Your next basic attack on-hit within 10 seconds");
    const cooldown = crescent.quoted("(10 second cooldown, starts after using the empowered attack)");
    crescent.quote("Titanic Crescent resets the user's basic attack timer.");
    const pick = (pair: { melee: number; ranged: number }) => (fighter.ranged ? pair.ranged : pair.melee) / 100;
    item.assume("Cleave's and Titanic Crescent's damage to other enemies has no target in a duel.");
    return {
      onHit: [itemDamage(item.name, "physical", { base: 0, ratios: { maxHP: pick(share) } }, item.tagged("OnHitAppliesLifeSteal"))],
      actives: [{
        name: crescent.name,
        cooldown,
        cooldownAfter: "empower",
        delivery: { kind: "self" },
        // The empowered Cleave replaces the ordinary one's damage on the target: the rest of it.
        onSelf: [{ type: "empower", attacks: 1, window, resetAttack: true, onHit: [itemDamage(item.name, "physical", { base: 0, ratios: { maxHP: pick(empowered) - pick(share) } })] }],
        roles: ["buff"],
      }],
    };
  },
};
