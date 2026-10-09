/** Sett: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackTiming, canCast, heldInPlace } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { hitChance } from "../../engine/sim/hitModel";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { attackDamage, flat, maxHp, missingShare, ticks } from "./util";

const RIGHT = "Right Punch";

const sett: KitModule = {
  champion: "Sett",
  options: {
    facebreakerStun: { label: "Facebreaker has an enemy minion on its other side, so it stuns (1 = yes, 0 = no)", default: 1 },
  },
  build(kit, options) {
    const innate = kit.ability("Pit Grit");
    const q = kit.ability("Knuckle Down");
    const w = kit.ability("Haymaker");
    const e = kit.ability("Facebreaker");
    const r = kit.ability("The Show Stopper");

    // Pit Grit: punches alternate; the Right Punch comes at once and hits harder.
    const rightBonus: Formula = { base: innate.levelValue("Sett's Right Punch is empowered to gain 50 bonus range"), ratios: { bonusAD: innate.quoted("(+ 55% bonus AD) bonus physical damage", 0) / 100 } };
    const rightRange = innate.quoted("Sett's Right Punch is empowered to gain 50 bonus range", 0);
    const rightSpeed = innate.quoted("attack at 8 times the Left Punch's attack speed", 0);
    const rightWindupShare = innate.quoted("its windup is sped up and fixed at 12.5% of a Left Punch's windup time", 0) / 100;
    const leftReset = innate.quoted("will reset back to it after 2 seconds of not performing a Right Punch", 0);
    const regenSeries = innate.seriesIn("Sett regenerates an additional");
    const regenPer5 = innate.at20(regenSeries, "Heart of the Half-Beast regeneration");
    // Haymaker: damage taken becomes Grit, which becomes a shield and a blow.
    const gritCap = w.quoted("up to a cap of 50% of his maximum health", 0) / 100;
    const gritDecay = w.quoted("decays in value by 30% every second after 4 seconds", 0) / 100;
    const gritAfter = w.quoted("decays in value by 30% every second after 4 seconds", 1);
    const shieldSeconds = w.quoted("equal to the expended Grit for 3 seconds", 0);
    const blowBase = w.baseOf("Damage");
    const blowShare = w.quoted("(+ 25% (+ 25% per 100 bonus AD) of expended Grit)", 0) / 100;
    const blowPer100 = w.quoted("(+ 25% (+ 25% per 100 bonus AD) of expended Grit)", 1) / 100;
    const centerWidth = w.fieldNumbers("width")[2] ?? 70;
    const [blowNear = 25, blowFar = 720] = w.fieldNumbers("range");
    // Facebreaker: pulls to 150 units on either side.
    const pullTo = 150;
    const faceRange = e.field("range");
    // The Show Stopper: the slam lands about 1.23 seconds after the cast at most.
    const slamAfter = 1.23;
    const slam: Formula = (() => {
      const amount = r.record.parts.flatMap((p) => p.leveling).find((l) => l.label === "Physical Damage")?.amount;
      if (!amount) throw new Error("Sett kit: The Show Stopper's damage is gone from the wiki");
      const ratios: Formula["ratios"] = {};
      for (const term of amount.scaling) {
        const value = r.at20(term.ratio, `The Show Stopper ${term.text}`) / 100;
        if (term.stat === "bonusAD") ratios.bonusAD = value;
        else if (term.stat.includes("bonus health")) ratios.targetBonusHP = value;
        else throw new Error(`Sett kit: The Show Stopper scales with ${term.stat}`);
      }
      return { base: r.at20(amount.base, "The Show Stopper damage"), ratios };
    })();
    kit.assume(`Facebreaker ${options.facebreakerStun ? "always has an enemy minion on its other side, so it stuns" : "never stuns (no enemy on its other side)"}; its 0.25 s lockout is left out.`);
    kit.assume(`The Show Stopper suppresses its target until the slam, ${slamAfter} s after the cast; where the leap carries the two isn't modeled.`);
    kit.assume("Haymaker's true-damage center lands as often as a skillshot of its width would; the rest of the blast is physical.");
    kit.assume("Grit decays per instance by 30% a second after 4 seconds; Haymaker's shield doesn't decay.");

    // Grit is a log of instances, kept as text in kit memory: "tick:amount;tick:amount".
    const gritLog = (unit: Unit): Array<[number, number]> =>
      String(unit.memory.grit ?? "")
        .split(";")
        .filter(Boolean)
        .map((entry) => entry.split(":").map(Number) as [number, number]);
    const gritNow = (unit: Unit, now: number): number => {
      let total = 0;
      for (const [tick, amount] of gritLog(unit)) {
        const late = Math.max(0, (now - tick) / 30 - gritAfter);
        total += amount * (1 - gritDecay) ** late;
      }
      return Math.min(total, gritCap * maxHp(unit));
    };

    // Haymaker once the Grit is nearly full, or sooner when health runs low.
    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const haymaker = self.spec.abilities.find((a) => a.key === "W");
      const busy = self.action && self.action.kind !== "windup";
      if (!busy && haymaker && view.mode !== "idle" && view.mode !== "flee" && canCast(world, self, haymaker)) {
        const grit = gritNow(self, world.tick) / (gritCap * maxHp(self));
        const reach = Math.abs(self.x - enemy.x) - enemy.spec.base.radius <= blowFar;
        if (reach && (grit >= 0.8 || (grit >= 0.3 && self.hp < 0.4 * maxHp(self)))) return { kind: "cast", ability: "W" };
      }
      return defaultBehavior(view);
    };

    const right = (ctx: HookContext): Effect => ({
      type: "empower",
      attacks: 1,
      window: leftReset,
      bonusRange: rightRange,
      windup: (rightWindupShare * attackTiming(ctx.self).windup) / 30,
      onHit: [{ type: "damage", damageType: "physical", amount: rightBonus, label: RIGHT }],
    });

    // Two punches every 1 + 1/8 attack timers: the Right Punch nearly doubles the attack rate.
    const punchRate = 2 / (1 + 1 / rightSpeed);
    // Haymaker thrown with most of a full Grit bar.
    const gritThrown = 0.8 * gritCap;
    return {
      behavior,
      budget: {
        damage: (self) => {
          const d = derive(self);
          const right = rightBonus.base + (rightBonus.ratios?.bonusAD ?? 0) * d.bonusAd;
          const blow = blowBase + gritThrown * d.maxHp * (blowShare + (blowPer100 * d.bonusAd) / 100);
          return { physical: d.attackSpeed * ((punchRate - 1) * attackDamage(self) + (punchRate / 2) * right), true: blow / w.cooldown() };
        },
        healing: (self) => (gritThrown * maxHp(self)) / w.cooldown(),
      },
      hooks: {
        onAttack(ctx) {
          // A Left Punch readies the Right; the Right Punch's attack timer is an eighth of the Left's.
          const punch = Number(ctx.memory.punch ?? 0);
          if (punch === 0) {
            ctx.memory.punch = 1;
            ctx.apply(right(ctx), true);
          } else {
            ctx.memory.punch = 0;
            ctx.self.attackReadyTick = ctx.tick + Math.max(1, Math.round(attackTiming(ctx.self).total / rightSpeed));
          }
          ctx.memory.lastPunch = ctx.tick;
        },
        onTick(ctx) {
          // Back to the Left Punch after 2 seconds without a Right.
          if (Number(ctx.memory.punch ?? 0) === 1 && ctx.tick - Number(ctx.memory.lastPunch ?? 0) > ticks(leftReset)) ctx.memory.punch = 0;
          // Heart of the Half-Beast: regeneration for every 5% of missing health, every half second.
          if (ctx.tick % 15 === 0) ctx.regenerate(regenPer5 * Math.floor((missingShare(ctx.self) * 100) / 5));
        },
        onDamageTaken(ctx) {
          // Grit from health lost (not from damage shields took).
          if (ctx.amount <= 0) return;
          const log = gritLog(ctx.self).filter(([tick]) => ctx.tick - tick < 30 * 12);
          log.push([ctx.tick, ctx.amount]);
          ctx.memory.grit = log.map(([tick, amount]) => `${tick}:${amount.toFixed(1)}`).join(";");
        },
        onCastStart(ctx) {
          if (ctx.ability.key !== "W") return;
          // All the Grit goes into a shield at once, and into the blow's damage.
          const grit = gritNow(ctx.self, ctx.tick);
          ctx.memory.grit = "";
          ctx.memory.expended = grit;
          if (grit > 0) ctx.apply({ type: "shield", amount: flat(grit), duration: shieldSeconds }, true);
          // How likely the narrow true-damage center is to land on the enemy.
          const enemy = ctx.enemy;
          const settings = ctx.world.settings;
          ctx.memory.centerChance = hitChance(
            { timeToLand: w.castTime(), reach: centerWidth / 2 },
            { radius: enemy.spec.base.radius, moveSpeed: derive(enemy).moveSpeed, heldInPlace: heldInPlace(enemy, ctx.tick + ticks(w.castTime())), hasEscape: false },
            settings.reactionTime,
            settings.hitSpread,
          );
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            // Knuckle Down's two attacks are a Left then a Right Punch.
            ctx.memory.punch = 0;
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && s.empower?.onHit.some((h) => h.type === "damage" && h.label === RIGHT)));
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "W") return;
          const grit = Number(ctx.memory.expended ?? 0);
          const total = blowBase + grit * (blowShare + (blowPer100 * derive(ctx.self).bonusAd) / 100);
          const center = Number(ctx.memory.centerChance ?? 0);
          ctx.apply({ type: "damage", damageType: "true", amount: flat(total * center), label: `${w.name} (center)` });
          ctx.apply({ type: "damage", damageType: "physical", amount: flat(total * (1 - center)), label: w.name });
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          castTime: 0,
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 2,
              window: q.quoted("empowers his next two basic attacks within 5 seconds", 0),
              bonusRange: q.quoted("to gain 50 bonus range", 0),
              resetAttack: true,
              onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage") }],
            },
            { type: "stat", stat: "moveSpeedPercent", amount: flat(q.quoted("gains 30% bonus movement speed", 0) / 100), duration: q.quoted("For 1.5 seconds", 0) },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "area", near: -blowNear, far: blowFar, delay: 0, anchor: "caster" },
          // The blow's damage depends on the Grit spent: see onAbilityHit. Thrown by the behavior above.
          onHit: [{ type: "mark", key: "haymaker", duration: 0.1 }],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          delivery: { kind: "area", near: -faceRange, far: faceRange, delay: 0, anchor: "caster" },
          onHit: [
            { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
            { type: "displace", direction: "toward", distance: faceRange, duration: 0.25, to: pullTo },
            { type: "cc", cc: "slow", strength: e.quoted("slowing them by 70% for 0.5 seconds", 0) / 100, duration: e.quoted("slowing them by 70% for 0.5 seconds", 1) },
            ...(options.facebreakerStun ? [{ type: "delayed" as const, delay: 0.25, effects: [{ type: "cc" as const, cc: "stun" as const, duration: e.quoted("all enemies are stunned for 1 second upon landing", 0) }] }] : []),
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: 0,
          onCastStart: [{ type: "state", state: "displacementImmune", duration: slamAfter + 0.1 }],
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [{ type: "cc", cc: "suppression", duration: slamAfter }],
          channel: {
            duration: slamAfter,
            interruptible: false,
            range: 2000,
            onComplete: [
              { type: "damage", damageType: "physical", amount: slam },
              { type: "cc", cc: "slow", strength: r.quoted("All targets hit are slowed by 99% for 1 second", 0) / 100, duration: r.quoted("All targets hit are slowed by 99% for 1 second", 1) },
            ],
          },
          flags: { grounded: true },
        },
      ],
    };
  },
};

export default sett;
