import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import { spellKey, type SpellModule } from "../equip";

/** What no cleanse removes (the engine's rule for cleanses), with what Cleanse's effect excludes. */
const KEPT: ReadonlySet<CCType> = new Set(["stasis", "kinematics", "airborne", "nearsight", "suppression"]);

export const Cleanse: SpellModule = {
  spell: "Cleanse",
  build(spell) {
    spell.quote("Removes all disables (excluding Airborne, Nearsight, and Suppression) and summoner spell debuffs (excluding Mark) affecting your champion");
    const tenacity = "grants you 75% tenacity for 3 seconds.";
    spell.noted("Cleanse will remove the following debuff types:");
    spell.noted("Does not remove the Grievous Wounds debuff.");
    spell.noted("Cleanse cannot be activated while under the effects of suppression or stasis (both disable all summoner spells from use).");
    const types = (Object.keys(CC_RULES) as CCType[]).filter((type) => !KEPT.has(type));
    const key = spellKey(spell.name);
    // The summoner spell debuffs: Ignite's burn (not its Grievous Wounds) and both parts of Exhaust.
    const ignite = spellKey("Ignite");
    const exhaust = `${spellKey("Exhaust")}:damageDealt`;
    spell.assume("cast when crowd control holds the holder for half a second or more, as the default behavior uses cleanses.");
    return {
      actives: [{
        cooldown: spell.cooldown(),
        delivery: { kind: "self" },
        onSelf: [{ type: "cleanse", types }, { type: "state", state: "tenacity", value: spell.quoted(tenacity) / 100, duration: spell.quoted(tenacity, 1) }],
      }],
      hooks: {
        onCast(ctx) {
          if (ctx.ability.key !== key) return;
          ctx.self.statuses = ctx.self.statuses.filter((status) => status.source === ctx.self.side || !((status.kind === "dot" && status.key === ignite) || (status.kind === "stat" && status.memoKey === exhaust)));
        },
      },
    };
  },
};
