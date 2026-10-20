import type { ItemModule } from "../equip";

export const ZhonyasHourglass: ItemModule = {
  item: "Zhonya's Hourglass",
  build(item) {
    const stop = item.effect("Time Stop");
    const seconds = stop.quoted("Put yourself in stasis for 2.5 seconds");
    stop.quote("rendering you untargetable and invulnerable for the duration but also unable to move, declare basic attacks, cast abilities, use summoner spells, or activate items.");
    return {
      stasis: true,
      actives: [{
        name: stop.name,
        cooldown: stop.cooldown(),
        delivery: { kind: "self" },
        onSelf: [
          { type: "state", state: "stasis", duration: seconds },
          { type: "state", state: "noAttacks", duration: seconds },
          { type: "state", state: "noMovement", duration: seconds },
        ],
        roles: ["defense"],
      }],
    };
  },
};
