/** Fiora: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";
import { flat, ticks } from "./util";

const fiora: KitModule = {
  champion: "Fiora",
  build(kit) {
    const innate = kit.ability("Duelist's Dance");
    const q = kit.ability("Lunge");
    const w = kit.ability("Riposte");
    const e = kit.ability("Bladework");
    const r = kit.ability("Grand Challenge");

    // Duelist's Dance: a Vital becomes targetable 1.75 s after it is identified.
    const vitalDelay = innate.quoted("Vitals take 1.75 seconds to become targetable", 0);
    const vitalShare = innate.quoted("bonus true damage equal to 3% (+ 4% per 100 bonus AD) of target's maximum health", 0) / 100;
    const vitalPer100 = innate.quoted("bonus true damage equal to 3% (+ 4% per 100 bonus AD) of target's maximum health", 1) / 100;
    const vitalHeal = innate.levelValue("heal Fiora for 35 – 100 (based on level)");
    // At Grand Challenge's rank 3, the fourth of these values.
    const vitalSpeed = innate.quoted("grant her 20 / 30 / 40 / 50 (based on Grand Challenge's Rank)% bonus movement speed", 3) / 100;
    const speedSeconds = innate.quoted("that decays over 1.85 seconds", 0);
    // In one dimension Fiora walks around her target to reach a Vital's side.
    const reposition = 0.5;
    kit.assume(`Fiora needs ${reposition} seconds to step around her target to a Vital's side; Lunge reaches it at once.`);
    kit.assume("A Vital's movement speed is kept for its full duration rather than decaying.");
    kit.assume("Bladework's guaranteed critical strike adds its critical damage minus the attack's average critical damage.");
    const vitalDamage: Formula = { base: 0, ratios: { targetMaxHP: vitalShare }, products: [{ ratio: vitalPer100 / 100, stats: ["bonusAD", "targetMaxHP"] }] };
    const vital: Effect = { type: "damage", damageType: "true", amount: vitalDamage, label: "Vital" };
    const challengeVitals = 4;
    const challengeDelay = r.quoted("highlighting all four of their Vitals after a 0.5-second delay", 0);
    const victoryPerSecond = r.formula("Heal per Second");
    const victorySeconds = r.quoted("a Victory Zone is created on their death location for 5 seconds", 0);
    const challengeSeconds = r.quoted("challenges the target enemy champion for 8 seconds", 0);
    const bladeworkSlow = e.quoted("The first attack slows the target by 30% for 1 second", 0) / 100;
    const bladeworkSlowSeconds = e.quoted("The first attack slows the target by 30% for 1 second", 1);
    const bladeworkCrit = e.number("Critical damage") / 100;
    const bladeworkSeconds = e.quoted("next two basic attacks on-attack within 4 seconds", 0);
    const stabRefund = q.quoted("Stabbing a target reduces Lunge's cooldown by 50%", 0) / 100;

    // In an all-in: a passive Vital about every 3 seconds, and Grand Challenge's four.
    const vitalsPerSecond = 1 / 3 + challengeVitals / 10;
    const proc = (ctx: HookContext) => {
      ctx.apply(vital);
      ctx.apply({ type: "heal", amount: flat(vitalHeal) }, true);
      ctx.apply({ type: "stat", stat: "moveSpeedPercent", amount: flat(vitalSpeed), duration: speedSeconds }, true);
    };
    // Each damaging hit triggers a ready Vital: Grand Challenge's four first, then the passive's.
    const onHitVital = (ctx: HookContext, lunge: boolean) => {
      const left = Number(ctx.memory.challengeVitals ?? 0);
      if (left > 0 && ctx.tick >= Number(ctx.memory.challengeReady ?? 0)) {
        proc(ctx);
        ctx.memory.challengeVitals = left - 1;
        ctx.memory.challengeReady = ctx.tick + (lunge ? 0 : ticks(reposition));
        if (left - 1 === 0) {
          // All four: the Victory Zone heals Fiora while she fights on in it.
          const heal: Effect[] = [];
          for (let second = 1; second <= victorySeconds; second++) heal.push({ type: "delayed", delay: second, effects: [{ type: "heal", amount: victoryPerSecond }] });
          for (const effect of heal) ctx.apply(effect, true);
          ctx.log("Victory Zone");
        }
        return;
      }
      // Grand Challenge's target gets no new Vitals from Duelist's Dance while challenged.
      if (ctx.tick < Number(ctx.memory.challengeUntil ?? -1)) return;
      if (ctx.tick < Number(ctx.memory.vitalReady ?? ticks(vitalDelay))) return;
      if (!lunge && ctx.tick < Number(ctx.memory.vitalReady ?? 0) + ticks(reposition)) return;
      proc(ctx);
      ctx.memory.vitalReady = ctx.tick + ticks(vitalDelay);
    };

    return {
      budget: {
        damage: (self, target) => ({ true: vitalsPerSecond * evaluate(vitalDamage, self, target) }),
        // Each Vital heals; the Victory Zone heals for its 5 seconds about half the time.
        healing: (self) => vitalsPerSecond * vitalHeal + (0.5 * victorySeconds * evaluate(victoryPerSecond, self)) / 10,
      },
      hooks: {
        onDamageDealt(ctx) {
          if (ctx.persistent || ctx.amount <= 0 || ctx.ability === "Vital") return;
          onHitVital(ctx, ctx.ability === q.name);
        },
        onAttack(ctx) {
          const left = ctx.tick < Number(ctx.memory.bladeworkUntil ?? -1) ? Number(ctx.memory.bladework ?? 0) : 0;
          if (left <= 0) return;
          ctx.memory.bladework = left - 1;
          ctx.memory.bladeworkHit = left;
          if (left === 1) ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "E:attackSpeed");
        },
        onAttackHit(ctx) {
          const which = Number(ctx.memory.bladeworkHit ?? 0);
          ctx.memory.bladeworkHit = 0;
          if (which === 2) ctx.apply({ type: "cc", cc: "slow", strength: bladeworkSlow, duration: bladeworkSlowSeconds });
          if (which === 1) {
            // The second attack critically strikes for Bladework's critical damage.
            const d = derive(ctx.self);
            const average = 1 + d.critChance * (d.critDamage - 1);
            const extra = Math.max(0, bladeworkCrit - average);
            ctx.apply({ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: extra } }, label: "Bladework (critical strike)" });
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") {
            ctx.memory.bladework = 2;
            ctx.memory.bladeworkUntil = ctx.tick + ticks(bladeworkSeconds);
          }
          if (ctx.ability.key === "R") {
            ctx.memory.challengeVitals = challengeVitals;
            ctx.memory.challengeReady = ctx.tick + ticks(challengeDelay);
            ctx.memory.challengeUntil = ctx.tick + ticks(challengeSeconds);
          }
        },
        onAbilityHit(ctx) {
          // A stab refunds half of Lunge's cooldown.
          if (ctx.ability.key === "Q") ctx.apply({ type: "refund", ability: "Q", fraction: stabRefund });
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
          // Dash up to 400 units, then stab the enemy next to Fiora.
          delivery: { kind: "dash", direction: "toward", distance: Math.max(...q.fieldNumbers("targetRange")), speed: q.field("speed"), hitRadius: 50 },
          onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage") }],
          flags: { appliesOnHit: true, parry: true, grounded: true, knockdown: q.flag("knockdown") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          // Over the first 0.5 s Fiora poises, then the shock flies; the parry lasts 0.75 s from the start.
          castTime: w.quoted("over the first 0.5 seconds of the duration", 0),
          onCastStart: [{ type: "state", state: "parry", duration: w.quoted("enters a defensive stance for 0.75 seconds", 0), value: 2 }],
          delivery: { kind: "line", range: w.field("targetRange"), width: w.field("width"), speed: w.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: w.quoted("slowed and crippled by 25% for 2 seconds", 0) / 100, duration: w.quoted("slowed and crippled by 25% for 2 seconds", 1) },
            { type: "cc", cc: "cripple", strength: w.quoted("slowed and crippled by 25% for 2 seconds", 0) / 100, duration: w.quoted("slowed and crippled by 25% for 2 seconds", 1) },
          ],
          flags: { projectile: w.flag("projectile") ?? true },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            { type: "empower", attacks: 2, window: bladeworkSeconds, bonusRange: e.quoted("to gain 25 bonus range", 0), onHit: [] },
            { type: "stat", stat: "attackSpeed", amount: flat(e.fraction("Bonus Attack Speed")), duration: bladeworkSeconds },
            { type: "resetAttack" },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [{ type: "mark", key: "grandChallenge", duration: challengeSeconds }],
          roles: ["buff"],
          flags: { spellShield: false },
        },
      ],
    };
  },
};

export default fiora;
