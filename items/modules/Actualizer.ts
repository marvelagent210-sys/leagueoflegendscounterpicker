import type { ItemModule } from "../equip";
import { bonusMana, memo, setStat } from "../runtime";

/**
 * Mana Made Real: for 8 seconds the holder's mana is Empowered. Its abilities cost 100% more mana
 * (the manaCostIncrease stat costOf reads), deal 15% (+ 0.5% per 100 bonus mana) more ability and
 * pet damage, heal and shield power, and its basic abilities' cooldowns progress 30% faster.
 * The status the active gives marks the Empowered window.
 */
export const Actualizer: ItemModule = {
  item: "Actualizer",
  build(item, fighter) {
    const real = item.effect("Mana Made Real");
    const words = "For 8 seconds, your mana is Empowered. While Empowered: your abilities cost 100% more mana; you gain 15% (+ 0.5% per 100 bonus mana) increased ability and pet damage, healing, and shielding; and your basic abilities' cooldowns progress 30% faster.";
    const seconds = real.quoted(words);
    const cost = real.quoted(words, 1) / 100;
    const base = real.quoted(words, 2) / 100;
    const perMana = real.quoted(words, 3) / 100;
    const per = real.quoted(words, 4);
    const faster = real.quoted(words, 5) / 100;
    item.assume("Mana Made Real's increased damage is on the kit's ability damage (as Liandry's Torment's and Spear of Shojin's), its pet damage included where the kit deals it as ability damage.");
    item.assume("Empowered basic abilities' cooldowns progress 30% faster: each tick takes 1.3 ticks off a running cooldown of Q, W or E; their charges' recharge isn't sped up.");
    item.assume("Mana Made Real's increased healing and shielding is heal and shield power (the wiki's \"Template:Healing modifiers\" gives the two one column), adding to the holder's other heal and shield power.");
    const window = (self: Parameters<typeof bonusMana>[0], tick: number) =>
      self.statuses.find((status) => status.kind === "stat" && status.key === "manaCostIncrease" && status.endTick > tick);
    const empowered = (self: Parameters<typeof bonusMana>[0], tick: number) => window(self, tick) !== undefined;
    const increase = (self: Parameters<typeof bonusMana>[0]) => base + (perMana * bonusMana(self, fighter.baseMana)) / per;
    const power = memo(item.name, "power");
    if (!fighter.mana) return { unmodeled: ["Mana Made Real: it changes only mana, and this champion has none."] };
    return {
      actives: [{ name: real.name, cooldown: real.cooldown(), delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "manaCostIncrease", amount: { base: cost }, duration: seconds }] }],
      hooks: {
        onTick(ctx) {
          const active = window(ctx.self, ctx.tick);
          setStat(ctx.self, power, "healShieldPower", active ? increase(ctx.self) : 0, ctx.tick, active?.endTick);
          if (!active) return;
          for (const ability of ctx.self.spec.abilities) {
            if (ability.slot !== "Q" && ability.slot !== "W" && ability.slot !== "E") continue;
            const key = ability.cooldownKey ?? ability.key;
            const ready = ctx.self.cooldownReady[key];
            if (ready !== undefined && Number.isFinite(ready) && ready > ctx.tick) ctx.self.cooldownReady[key] = Math.max(ctx.tick, ready - faster);
          }
        },
      },
      enemyHooks: {
        modifyDamageTakenRaw(ctx) {
          if (!fighter.isAbilityDamage(ctx) || !empowered(ctx.enemy, ctx.tick)) return ctx.raw;
          return ctx.raw * (1 + increase(ctx.enemy));
        },
      },
    };
  },
};
