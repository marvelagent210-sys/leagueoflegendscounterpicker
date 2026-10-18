/** Dr. Mundo: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, hasState } from "../../engine/sim/derived";
import type { Effect, HookContext } from "../../engine/sim/spec";
import { FOREVER, flat, maxHp, missingShare, ticks } from "./util";

const mundo: KitModule = {
  champion: "DrMundo",
  build(kit) {
    const innate = kit.ability("Goes Where He Pleases");
    const q = kit.ability("Infected Bonesaw");
    const w = kit.ability("Heart Zapper");
    const e = kit.ability("Blunt Force Trauma");
    const r = kit.ability("Maximum Dosage");

    // Goes Where He Pleases: regeneration, and an immobilizing effect shrugged off every few seconds.
    const regenShare = innate.levelValue("Mundo regenerates an additional") / 100;
    const negateEvery = innate.field("staticCooldown");
    const negateCost = innate.quoted("Dr. Mundo pays a health cost equal to 4% of his current health", 0) / 100;
    // Heart Zapper: pulses for up to 3 seconds, storing damage taken as grey health, then detonates.
    const zapSeconds = w.quoted("charges up a defibrillator for up to 3 seconds", 0);
    const zapEvery = w.quoted("dealing magic damage every 0.25 seconds", 0);
    const zapRadius = w.field("effectRadius");
    const storedEarly = w.levelValue("storing") / 100;
    const storedLate = w.quoted("reduced to 25% after the first 0.75 seconds", 0) / 100;
    const earlyWindow = w.quoted("reduced to 25% after the first 0.75 seconds", 1);
    const recastAfter = w.quoted("Heart Zapper can be recast after 0.5 seconds within the duration", 0);
    const zapCost = w.field("cost") / 100;
    // Blunt Force Trauma: up to 40% more damage at 70% missing health.
    const traumaSeries = e.seriesIn("increased by 0 / 4 / 8 / 12 / 16 / 20 / 24 / 28 / 32 / 36 / 40");
    if (traumaSeries.kind !== "variable") throw new Error("Dr. Mundo kit: Blunt Force Trauma's missing-health bonus changed shape");
    const traumaMax = Math.max(...traumaSeries.values.map(Number)) / 100;
    const traumaFull = Math.max(...traumaSeries.points.map(Number)) / 100;
    const traumaShare = e.formula("Bonus Attack Damage").ratios?.maxHP ?? 0;
    const traumaMinimum = e.formula("Minimum Bonus Physical Damage");
    const traumaWindow = e.quoted("empowers his next basic attack within 4 seconds", 0);
    const traumaRange = e.quoted("gain 50 bonus range", 0);
    // Both cooldowns start after the effect: the empowered attack, and the detonation.
    const traumaEvery = e.cooldown();
    const zapPulse = w.formula("Magic Damage per Tick");
    const zapDetonation = w.formula("Magic Damage");
    const zapEveryCast = w.cooldown();
    // Maximum Dosage at rank 3, against one enemy champion.
    const dosageSeconds = r.quoted("to become enhanced for 10 seconds", 0);
    const perEnemy = r.quoted("are both increased by 5% for each enemy champion within 1200 units", 0) / 100;
    const baseHealth = r.shareOf("Increased Base Health") + perEnemy;
    const regenTotal = r.shareOf("Total Health Regenerated") + perEnemy;
    kit.assume("Goes Where He Pleases' canister lands past the enemy, who destroys it: Dr. Mundo doesn't pick it up.");
    kit.assume(`Heart Zapper pulses every ${zapEvery} s for its ${zapSeconds} s (the wiki's total damage implies a few more pulses) and detonates when it runs out.`);
    kit.assume("Maximum Dosage is used once Dr. Mundo is below half health, with one enemy champion nearby.");

    const zapping = (ctx: HookContext) => ctx.tick < Number(ctx.memory.zapUntil ?? -1);

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const gap = Math.abs(self.x - enemy.x) - enemy.spec.base.radius;
      const dosage = self.spec.abilities.find((a) => a.key === "R");
      if (dosage && view.mode !== "idle" && self.hp < 0.5 * maxHp(self) && canCast(world, self, dosage)) return { kind: "cast", ability: "R" };
      const zapper = self.spec.abilities.find((a) => a.key === "W");
      if (zapper && view.mode !== "idle" && view.mode !== "flee" && gap <= zapRadius && canCast(world, self, zapper)) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };

    const trauma = (ctx: HookContext): Effect => {
      // The bonus grows with missing health, up to its maximum at 70% missing.
      const increase = traumaMax * Math.min(1, missingShare(ctx.self) / traumaFull);
      const minimum = traumaMinimum;
      return {
        type: "empower",
        attacks: 1,
        window: traumaWindow,
        bonusRange: traumaRange,
        uncancellable: true,
        onHit: [{ type: "damage", damageType: "physical", amount: { base: minimum.base * (1 + increase), ratios: { bonusHP: (minimum.ratios?.bonusHP ?? 0) * (1 + increase) } }, label: e.name }],
      };
    };

    return {
      behavior,
      budget: {
        damage: (self) => {
          const d = derive(self);
          const bonusHealth = d.maxHp - self.spec.base.hp;
          // Blunt Force Trauma's AD from maximum health on every attack, and its empowered attack.
          const traumaAD = traumaShare * d.maxHp;
          const trauma = (traumaMinimum.base + (traumaMinimum.ratios?.bonusHP ?? 0) * bonusHealth) * (1 + traumaMax / 2);
          // Heart Zapper's pulses and detonation, once per cooldown and duration.
          const pulses = (zapSeconds / zapEvery) * zapPulse.base;
          const detonation = zapDetonation.base + (zapDetonation.ratios?.bonusHP ?? 0) * bonusHealth;
          return { physical: traumaAD * d.attackSpeed + trauma / (traumaEvery + 1 / d.attackSpeed), magic: (pulses + detonation) / (zapEveryCast + zapSeconds) };
        },
        // The innate regeneration, and Maximum Dosage's through an all-in.
        healing: (self) => (regenShare * maxHp(self)) / 5 + (regenTotal * maxHp(self)) / dosageSeconds,
      },
      hooks: {
        onStart(ctx) {
          ctx.apply({ type: "state", state: "ccNegate", duration: FOREVER, charges: 1 }, true);
          ctx.memory.negateArmed = true;
        },
        onTick(ctx) {
          const self = ctx.self;
          // Blunt Force Trauma's passive: bonus AD from maximum health, kept up to date.
          const wanted = Math.round(traumaShare * maxHp(self) * 10) / 10;
          if (wanted !== Number(ctx.memory.traumaAD ?? -1)) {
            ctx.memory.traumaAD = wanted;
            ctx.buff("traumaAD", "AD", wanted, 1e9);
          }
          // Regeneration every half second: the innate's, and Maximum Dosage's.
          if (ctx.tick % 15 === 0) {
            ctx.regenerate((regenShare * maxHp(self)) / 10);
          }
          const dosageAt = Number(ctx.memory.dosageAt ?? -1);
          if (dosageAt >= 0 && ctx.tick > dosageAt && ctx.tick <= Number(ctx.memory.dosageUntil ?? -1) && (ctx.tick - dosageAt) % 15 === 0) ctx.regenerate((regenTotal * maxHp(self)) / (dosageSeconds * 2));
          // Goes Where He Pleases: spent on an immobilizing effect, it costs health and comes back later.
          if (ctx.memory.negateArmed && !hasState(self, "ccNegate")) {
            ctx.memory.negateArmed = false;
            ctx.memory.negateReady = ctx.tick + ticks(negateEvery);
            self.hp -= negateCost * self.hp;
          } else if (!ctx.memory.negateArmed && ctx.tick >= Number(ctx.memory.negateReady ?? 0)) {
            ctx.apply({ type: "state", state: "ccNegate", duration: FOREVER, charges: 1 }, true);
            ctx.memory.negateArmed = true;
          }
          // Heart Zapper's pulses.
          if (zapping(ctx) && (ctx.tick - Number(ctx.memory.zapStart)) % ticks(zapEvery) === 0 && ctx.tick > Number(ctx.memory.zapStart)) {
            if (Math.abs(self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= zapRadius) {
              ctx.apply({ type: "damage", damageType: "magic", amount: zapPulse, label: w.name, persistent: true });
            }
          }
        },
        onDamageTaken(ctx) {
          // Grey health: most of the damage taken early in Heart Zapper, a quarter of it after.
          if (!zapping(ctx)) return;
          const share = ctx.tick - Number(ctx.memory.zapStart) < ticks(earlyWindow) ? storedEarly : storedLate;
          ctx.memory.grey = Number(ctx.memory.grey ?? 0) + share * ctx.mitigated;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            ctx.memory.zapStart = ctx.tick;
            ctx.memory.zapUntil = ctx.tick + ticks(zapSeconds);
            ctx.memory.grey = 0;
          }
          if (key === "W2") {
            // The detonation heals all the grey health if it hits the enemy champion, half otherwise.
            const hits = Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= zapRadius;
            const grey = Number(ctx.memory.grey ?? 0) * (hits ? 1 : 0.5);
            ctx.memory.zapUntil = -1;
            ctx.memory.grey = 0;
            if (grey > 0) ctx.apply({ type: "heal", amount: flat(grey) }, true);
          }
          if (key === "E") ctx.apply(trauma(ctx), true);
          if (key === "R") {
            ctx.memory.dosageAt = ctx.tick;
            ctx.memory.dosageUntil = ctx.tick + ticks(dosageSeconds);
            // More base health: a share of missing health, gained (and healed) for the duration.
            ctx.apply({ type: "stat", stat: "health", amount: flat(baseHealth * (maxHp(ctx.self) - ctx.self.hp)), duration: dosageSeconds }, true);
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
          costType: "health",
          castTime: q.castTime(),
          delivery: { kind: "line", range: q.fieldValues("targetRange")[0] ?? 1050, width: q.field("width"), speed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic Damage"), minimum: q.formula("Minimum Damage") },
            { type: "cc", cc: "slow", strength: q.quoted("slows them by 40% for 2 seconds", 0) / 100, duration: q.quoted("slows them by 40% for 2 seconds", 1) },
            // The health cost comes back in full for hitting a champion.
            { type: "caster", effects: [{ type: "heal", amount: flat(q.cost()) }] },
          ],
          flags: { projectile: true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: { base: 0, ratios: { currentHP: zapCost } },
          costType: "health",
          castTime: 0,
          chainCooldown: "last",
          // Cast by the behavior above, near the enemy.
          delivery: { kind: "self" },
        },
        {
          key: "W2",
          name: `${w.name} (detonation)`,
          slot: "W",
          cooldown: 0,
          castTime: 0,
          chain: { root: "W", index: 2, window: zapSeconds, delay: recastAfter, auto: true },
          usable: () => false,
          delivery: { kind: "aura", radius: zapRadius },
          onHit: [{ type: "damage", damageType: "magic", amount: zapDetonation }],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          costType: "health",
          castTime: 0,
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [{ type: "resetAttack" }],
          roles: ["damage"],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: 0,
          delivery: { kind: "self" },
          onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: flat(r.fraction("Bonus Movement Speed")), duration: dosageSeconds }],
          roles: ["defense"],
        },
      ],
    };
  },
};

export default mundo;
