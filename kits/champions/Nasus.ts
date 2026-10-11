/** Nasus: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { evaluate } from "../../engine/sim/derived";
import type { Effect } from "../../engine/sim/spec";
import { flat, innateStat } from "./util";

const nasus: KitModule = {
  champion: "Nasus",
  options: { siphoningStacks: { label: "Siphoning Strike stacks by level 20", default: 300 } },
  build(kit, options) {
    const innate = kit.ability("Soul Eater");
    const q = kit.ability("Siphoning Strike");
    const w = kit.ability("Wither");
    const e = kit.ability("Spirit Fire");
    const r = kit.ability("Fury of the Sands");

    const stacks = options.siphoningStacks ?? 0;
    // "+ 100% of Siphoning Strike stacks": the stacks are an assumption, added to the base.
    const qBase = q.baseOf("Bonus Physical Damage");
    q.quote("(+ 100% of Siphoning Strike stacks)");
    // Wither: the slow starts at 35% and grows every second up to its maximum; the cripple is 75% of it.
    const witherSeconds = w.quoted("ages the target enemy champion for 5 seconds", 0);
    const slowStart = w.quoted("slowing them by 35%", 0) / 100;
    const slowGrowth = w.fraction("Additional Slow Per Second");
    const slowMax = w.fraction("Maximum Slow");
    const crippleShare = w.quoted("crippling them by 75% of that amount", 0) / 100;
    const wither: Effect[] = [];
    for (let second = 0; second < witherSeconds; second++) {
      const slow = Math.min(slowMax, slowStart + slowGrowth * second);
      const left = witherSeconds - second;
      const effects: Effect[] = [
        { type: "cc", cc: "slow", strength: slow, duration: left },
        { type: "cc", cc: "cripple", strength: slow * crippleShare, duration: left },
      ];
      wither.push(...(second === 0 ? effects : [{ type: "delayed", delay: second, effects } as Effect]));
    }
    const fireSeconds = e.quoted("The fire then remains for 5 seconds", 0);
    const furySeconds = r.quoted("Nasus empowers himself for 15 seconds", 0);
    const furyTick = r.quoted("he deals magic damage every 0.5 seconds", 0);
    const auraDamage = r.formula("Magic Damage Per Tick");
    const auraCap = r.quoted("capped at 240 per second", 0) * furyTick;
    const furyRadius = r.field("effectRadius") + (kit.champion.forms[0]?.stats.gameplayRadius ?? 80);
    r.quote("Siphoning Strike cooldown is halved");
    kit.assume("Spirit Fire's enemy stays in the fire for its full 5 seconds.");

    return {
      // Fury of the Sands' burn through an all-in.
      budget: { damage: (self, target) => ({ magic: Math.min(auraCap, evaluate(auraDamage, self, target)) / furyTick }) },
      start: [innateStat("lifeSteal", innate.levelValue("Nasus gains") / 100)],
      hooks: {
        onTick(ctx) {
          const until = Number(ctx.memory.furyUntil ?? -1);
          if (ctx.tick >= until || (until - ctx.tick) % Math.round(furyTick * 30) !== 0) return;
          if (Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= furyRadius) ctx.apply({ type: "damage", damageType: "magic", amount: flat(Math.min(auraCap, evaluate(auraDamage, ctx.self, ctx.enemy))), label: "Fury of the Sands (aura)" });
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") ctx.memory.furyUntil = ctx.tick + Math.ceil(furySeconds * 30);
          // Siphoning Strike's cooldown is halved during Fury of the Sands.
          if (ctx.ability.key === "Q" && ctx.tick < Number(ctx.memory.furyUntil ?? -1)) ctx.apply({ type: "refund", ability: "Q", fraction: 0.5 });
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: q.quoted("next basic attack within 10 seconds", 0),
              bonusRange: q.quoted("gain 50 bonus range", 0),
              uncancellable: true,
              resetAttack: true,
              // The flat bonus damage (base plus stacks) is affected by critical strikes.
              onHit: [{ type: "damage", damageType: "physical", amount: { base: qBase + stacks }, canCrit: true }],
            },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "target", range: w.field("targetRange") },
          onHit: wither,
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          delivery: { kind: "circle", range: e.field("targetRange"), radius: e.field("effectRadius", "Area of effect radius"), delay: e.quoted("after a 0.264 delay", 0) },
          onHit: [
            { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
            { type: "dot", damageType: "magic", total: e.formula("Total Magic Damage"), duration: fireSeconds, interval: 1 },
            { type: "stat", stat: "armorReductionPercent", amount: { base: e.shareOf("Armor Reduction") }, duration: fireSeconds },
          ],
          flags: { spellShield: e.flag("spellShield") ?? false },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "health", amount: { base: r.number("Bonus Health") }, duration: furySeconds },
            { type: "stat", stat: "armor", amount: { base: r.number("Bonus Resistances") }, duration: furySeconds },
            { type: "stat", stat: "MR", amount: { base: r.number("Bonus Resistances") }, duration: furySeconds },
            { type: "stat", stat: "attackRange", amount: { base: r.quoted("and 50 bonus attack range for the duration", 0) }, duration: furySeconds },
          ],
          roles: ["buff"],
        },
      ],
    };
  },
};

export default nasus;
