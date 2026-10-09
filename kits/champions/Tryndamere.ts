/** Tryndamere: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import { flat, maxHp, missingShare } from "./util";

const tryndamere: KitModule = {
  champion: "Tryndamere",
  build(kit) {
    const innate = kit.ability("Battle Fury");
    const q = kit.ability("Bloodlust");
    const w = kit.ability("Mocking Shout");
    const e = kit.ability("Spinning Slash");
    const r = kit.ability("Undying Rage");

    const furyPerHit = innate.quoted("Tryndamere generates 5 Fury on his basic attacks on-hit", 0);
    const furyPerCrit = innate.quoted("and 10 Fury on critical strikes", 0);
    const decayAfter = innate.quoted("After 8 seconds without dealing or taking damage", 0);
    const decayPerSecond = innate.quoted("Tryndamere loses 5 Fury per second", 0);
    // 0 to 50% critical strike chance from 0 to 100 Fury.
    const critPerFury = innate.quoted("Tryndamere gains 0 / 2.5 / 5", 1) / 100 / 5;
    const adPerMissing = q.number("Bonus Attack Damage per 1% missing health");
    const adCap = q.number("Maximum Bonus Attack Damage");
    const minHeal = q.formula("Minimum Heal");
    const healPerFury = q.formula("Heal Per 1 Fury");
    const furyPerSlashHit = e.quoted("increased to 5 Fury against champions", 0);
    const slashRefund = e.quoted("doubled to 1.5 seconds against champions", 0);
    const rageSeconds = r.quoted("a minimum health threshold for 5 seconds", 0);
    kit.assume("Spinning Slash's dash speed isn't on the wiki; it is taken as 1,300 units per second.");
    kit.assume("Critical strikes count by their average: Fury and Spinning Slash's cooldown refund grow with crit chance on every hit.");

    const behavior: Behavior = (view) => {
      const self = view.self;
      const bloodlust = self.spec.abilities.find((a) => a.key === "Q");
      if (bloodlust && canCast(view.world, self, bloodlust) && self.resource >= 50) {
        const rageLeft = Number(self.memory.rageUntil ?? -1) - view.world.tick;
        // Heal as Undying Rage runs out, or when low without it.
        const ending = rageLeft > 0 && rageLeft <= 15;
        const low = rageLeft <= 0 && self.hp < 0.3 * maxHp(self);
        if (ending || low) return { kind: "cast", ability: "Q" };
      }
      return defaultBehavior(view);
    };

    return {
      resourceStart: 0,
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Battle Fury: crit chance from Fury; Bloodlust: attack damage from missing health.
          ctx.buff("battleFury", "critChance", self.resource * critPerFury, 1e9);
          ctx.buff("bloodlust", "AD", Math.min(adCap, adPerMissing * 100 * missingShare(self)), 1e9);
          const active = Number(ctx.memory.lastDamage ?? 0);
          if (ctx.tick - active > decayAfter * 30) self.resource = Math.max(0, self.resource - decayPerSecond / 30);
        },
        onAttackHit(ctx) {
          const crit = derive(ctx.self).critChance;
          ctx.apply({ type: "resource", amount: flat(furyPerHit + (furyPerCrit - furyPerHit) * crit) }, true);
          ctx.apply({ type: "refund", ability: "E", seconds: slashRefund * crit });
        },
        onDamageDealt(ctx) {
          ctx.memory.lastDamage = ctx.tick;
        },
        onDamageTaken(ctx) {
          ctx.memory.lastDamage = ctx.tick;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const fury = ctx.self.resource;
            const heal = Math.min(evaluate(q.formula("Maximum Heal"), ctx.self), evaluate(minHeal, ctx.self) + fury * evaluate(healPerFury, ctx.self));
            ctx.self.resource = 0;
            ctx.apply({ type: "heal", amount: flat(heal) }, true);
          }
          if (ctx.ability.key === "R") ctx.memory.rageUntil = ctx.tick + Math.ceil(rageSeconds * 30);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") ctx.apply({ type: "resource", amount: flat(furyPerSlashHit) }, true);
          if (ctx.ability.key === "W") {
            // The shout lowers the enemy's bonus attack damage; the curse slows it while it runs away.
            const cut = Math.min(w.number("Attack Damage Reduction"), derive(ctx.enemy).bonusAd);
            ctx.apply({ type: "stat", stat: "AD", amount: flat(-cut), duration: w.quoted("of nearby enemy champions for 4 seconds", 0) });
            if (ctx.enemy.moved === -1) ctx.apply({ type: "cc", cc: "slow", strength: w.fraction("Slow"), duration: w.quoted("curse to all nearby enemy champions for 3.25 seconds", 0) });
          }
        },
      },
      behavior,
      abilities: [
        { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: q.castTime(), delivery: { kind: "self" }, roles: ["defense"] },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "aura", radius: w.field("effectRadius") },
          // Its effects are applied by the hook above, against the enemy's bonus attack damage.
          onHit: [{ type: "mark", key: "mockingShout", duration: 4 }],
          roles: ["cc"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "toward", distance: e.field("targetRange", "Maximum dash distance"), speed: 1300, hitRadius: e.field("effectRadius") },
          onHit: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
          flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "state", state: "minimumHealth", value: r.number("Minimum Health Threshold"), duration: rageSeconds },
            { type: "resource", amount: flat(r.number("Fury Gained")) },
          ],
          flags: { usableWhileDisabled: Boolean(r.quote("Undying Rage can be used while affected by cast-inhibiting crowd control")) },
        },
      ],
    };
  },
};

export default tryndamere;
