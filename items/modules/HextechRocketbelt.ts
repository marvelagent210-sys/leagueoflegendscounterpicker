import type { ItemModule } from "../equip";

export const HextechRocketbelt: ItemModule = {
  item: "Hextech Rocketbelt",
  build(item) {
    const sonic = item.effect("Supersonic");
    const dash = sonic.quoted("Dash 275 units in the target direction, though not through terrain");
    const reach = sonic.quoted("unleash an arc of 7 rockets forward which travel up to 1050 units", 1);
    const words = "are dealt 135 (+ 15% AP) magic damage, once per cast.";
    sonic.quote("Supersonic resets the user's basic attack timer.");
    item.assume("Supersonic's dash and rockets land at once: the wiki gives no speed for either; its rockets hit an enemy up to 1050 units ahead.");
    return {
      actives: [{
        name: sonic.name,
        cooldown: sonic.cooldown(),
        delivery: { kind: "blink", direction: "toward", distance: dash, hitRadius: reach },
        onHit: [{ type: "damage", damageType: "magic", amount: { base: sonic.quoted(words), ratios: { AP: sonic.quoted(words, 1) / 100 } } }],
        onSelf: [{ type: "resetAttack" }],
      }],
    };
  },
};
