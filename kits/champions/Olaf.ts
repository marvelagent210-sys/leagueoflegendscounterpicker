/** Olaf: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive } from "../../engine/sim/derived";
import { attackDamage, extraAttacks, innateStat, missingShare } from "./util";

const olaf: KitModule = {
  champion: "Olaf",
  build(kit) {
    const innate = kit.ability("Berserker Rage");
    const q = kit.ability("Undertow");
    const w = kit.ability("Tough It Out");
    const e = kit.ability("Reckless Swing");
    const r = kit.ability("Ragnarok");

    // Berserker Rage: up to the full bonus at 70% missing health.
    const byMissing = innate.seriesIn("(based on missing health)% of 50 – 100 (based on level)% bonus attack speed");
    const lastPoint = byMissing.kind === "variable" ? byMissing.points.at(-1) : undefined;
    if (typeof lastPoint !== "number") throw new Error("Olaf kit: Berserker Rage's missing health scale changed");
    const fullAt = lastPoint / 100;
    // The sentence's values: the missing-health scale, then the attack speed and life steal by level.
    const maxAttackSpeed = innate.levelValue("of 50 – 100 (based on level)% bonus attack speed", 1) / 100;
    const maxLifeSteal = innate.levelValue("of 50 – 100 (based on level)% bonus attack speed", 2) / 100;
    const swingRefund = e.quoted("Basic attacks reduce Reckless Swing's cooldown by 1 second", 0);
    const ragnarokSeconds = r.quoted("Olaf becomes enraged for 3 seconds", 0);
    const ragnarokExtension = r.quoted("increased by and up to 2.5 seconds", 0);
    const axeSlowSeconds = 1.5;
    kit.assume(`Undertow slows for ${axeSlowSeconds} seconds (the wiki scales it from 1 to 3 seconds with the distance thrown).`);
    kit.assume("In melee range Olaf picks his axe back up about a second after it lands, so Undertow is ready again 4 seconds after a cast.");
    kit.assume("Reckless Swing's cast time is taken at 0 bonus attack speed (0.25 seconds).");

    // Berserker Rage at about half its strength through a fight.
    const rage = 0.5;
    return {
      budget: {
        damage: (self) => ({ physical: attackDamage(self) * extraAttacks(self, rage * maxAttackSpeed) }),
        healing: (self) => rage * maxLifeSteal * attackDamage(self) * (derive(self).attackSpeed + extraAttacks(self, rage * maxAttackSpeed)),
      },
      start: [innateStat("armor", r.number("Bonus Resistances")), innateStat("MR", r.number("Bonus Resistances"))],
      hooks: {
        onTick(ctx) {
          const rage = Math.min(1, missingShare(ctx.self) / fullAt);
          ctx.buff("berserkerSpeed", "attackSpeed", rage * maxAttackSpeed, 1e9);
          ctx.buff("berserkerSteal", "lifeSteal", rage * maxLifeSteal, 1e9);
        },
        onAttackHit(ctx) {
          ctx.apply({ type: "refund", ability: "E", seconds: swingRefund });
          // Each hit keeps Ragnarok going for at least another 2.5 seconds.
          const until = ctx.tick + Math.ceil(ragnarokExtension * 30);
          for (const s of ctx.self.statuses) {
            const ragnarok = s.memoKey === "R:AD" || (s.kind === "state" && s.key === "ccImmune" && s.source === ctx.self.side);
            if (ragnarok && s.endTick > ctx.tick && s.endTick < until) s.endTick = until;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q" && Math.abs(ctx.self.x - ctx.enemy.x) < 450) {
            const ready = ctx.tick + 4 * 30;
            if ((ctx.self.cooldownReady.Q ?? 0) > ready) ctx.self.cooldownReady.Q = ready;
          }
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
          delivery: { kind: "line", range: q.field("targetRange", "Maximum missile range"), width: q.field("width"), speed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
            { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: axeSlowSeconds },
            { type: "stat", stat: "armorReductionPercent", amount: { base: q.quoted("inflicted with 20% armor reduction for 4 seconds", 0) / 100 }, duration: q.quoted("inflicted with 20% armor reduction for 4 seconds", 1) },
          ],
          flags: { projectile: q.flag("projectile") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "attackSpeed", amount: { base: w.fraction("Bonus Attack Speed") }, duration: w.quoted("bonus attack speed for 5 seconds", 0) },
            { type: "shield", amount: w.formula("Shield Strength"), duration: w.quoted("a shield for 2.5 seconds", 0) },
            { type: "resetAttack" },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          // "28 / 46 / 64 / 82 / 100 (+ 20% AD)" health.
          cost: { base: e.fieldValues("cost")[0] ?? 0, ratios: { AD: (e.fieldValues("cost")[1] ?? 0) / 100 } },
          costType: "health",
          castTime: 0.25,
          delivery: { kind: "target", range: e.field("targetRange") },
          onHit: [{ type: "damage", damageType: "true", amount: e.formula("True Damage") }],
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
            { type: "cleanse" },
            { type: "state", state: "ccImmune", duration: ragnarokSeconds },
            { type: "stat", stat: "AD", amount: r.formula("Bonus Attack Damage"), duration: ragnarokSeconds },
            // "For the first second of Ragnarok".
            { type: "stat", stat: "moveSpeedPercent", amount: { base: r.fraction("Bonus Movement Speed") }, duration: r.quote("For the first second of Ragnarok") ? 1 : 0 },
          ],
          flags: { usableWhileDisabled: true },
        },
      ],
    };
  },
};

export default olaf;
