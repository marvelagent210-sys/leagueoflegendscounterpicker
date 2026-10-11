/** Urgot: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive } from "../../engine/sim/derived";
import type { Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, flat, innateStat, maxHp, ticks } from "./util";

const urgot: KitModule = {
  champion: "Urgot",
  build(kit) {
    const innate = kit.ability("Echoing Flames");
    const q = kit.ability("Corrosive Charge");
    const w = kit.ability("Purge");
    const e = kit.ability("Disdain");
    const r = kit.ability("Fear Beyond Death");

    // Echoing Flames: a leg's shotgun fires on an attack's hit, then waits out its own cooldown.
    const legSeries = innate.seriesIn("Urgot's next basic attack on-hit within the arc of a shotgun");
    const legAD = innate.at20(legSeries, "shotgun AD ratio") / 100;
    const legHealth = innate.levelValue("Urgot's next basic attack on-hit within the arc of a shotgun", 1) / 100;
    innate.quote("Per-Leg Cooldown: 30 / 20 / 10 / 5 / 2.5 (based on level)");
    const legCooldown = 2.5;
    const legsFacing = 2;
    // Purge: toggled on for good at rank 5, firing 3 times a second at the enemy within 490 units.
    w.quote("at maximum rank, Purge lasts indefinitely and becomes a toggled ability");
    const purgeSpeed = w.quoted("firing at the nearest enemy at a fixed 3.0 attack speed", 0);
    const purgeRange = w.field("effectRadius");
    const purgeShot: Formula = w.formula("Modified Physical Damage");
    const purgeSlowResist = w.quoted("gains 40% slow resist", 0) / 100;
    const purgeSlowdown = w.quoted("his movement speed is reduced by 125", 0);
    // Quiet times: what stops Purge firing.
    const quiet: Record<string, number> = {
      E: e.quoted("Disdain prevents Purge from firing for 1.25 seconds", 0),
      Q: q.quoted("Corrosive Charge prevents Purge from firing for 0.05 seconds after the cast time", 0),
      R: r.quoted("Fear Beyond Death prevents Purge from firing for 0.8 seconds", 0),
      R2: r.quoted("The recast prevents Purge from firing for 1.5 seconds", 0),
    };
    // Corrosive Charge lands 0.1 s after the cast, flies 0.2 s and explodes 0.3 s later (game files).
    const chargeDelay = 0.1 + 0.2 + q.quoted("it explodes after 0.3 seconds", 0);
    // Fear Beyond Death: below 25% health, the leashed target can be reeled in and executed.
    const leash = r.quoted("leashing the target for 4 seconds", 0);
    const threshold = r.quoted("if the leashed target is below 25% of their maximum health", 0) / 100;
    const reel = r.quoted("channels for 1.5 seconds once they latch on", 0);
    const leashSlow = r.seriesIn("revealed and slowed by");
    if (leashSlow.kind !== "variable") throw new Error("Urgot kit: Fear Beyond Death's slow changed shape");
    const slowMax = Math.max(...leashSlow.values.map(Number)) / 100;
    const slowFull = Math.max(...leashSlow.points.map(Number)) / 100;
    kit.assume(`Purge is on for the whole fight (it replaces Urgot's basic attacks); its bolts hit at once rather than as missiles.`);
    kit.assume(`Urgot keeps ${legsFacing} legs facing the enemy, so a shotgun can fire every ${legCooldown / legsFacing} s (each leg every ${legCooldown} s at level 20).`);
    kit.assume("Disdain's fling over Urgot is left out.");
    kit.assume("Fear Beyond Death's slow is set when the drill hits, from the target's missing health then.");

    // Purge fires unless crowd control stops attacks (forced attacks still fire it).
    const firing = (self: Unit) => !self.forced && [...ccTypes(self)].every((type) => CC_RULES[type].attacking !== "disabled" && type !== "blind");
    const shoot = (ctx: HookContext) => {
      ctx.apply({ type: "damage", damageType: "physical", amount: purgeShot, label: w.name });
      if (ctx.tick < Number(ctx.memory.legReady ?? 0)) return;
      ctx.memory.legReady = ctx.tick + ticks(legCooldown / legsFacing);
      ctx.apply({ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: legAD, targetMaxHP: legHealth } }, label: innate.name });
    };
    const drilled = (unit: Unit, enemy: Unit, tick: number) => tick < Number(unit.memory.leashUntil ?? -1) && enemy.hp < threshold * maxHp(enemy);

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const mercy = self.spec.abilities.find((a) => a.key === "R2");
      if (mercy && drilled(self, enemy, world.tick) && canCast(world, self, mercy)) return { kind: "cast", ability: "R2" };
      return defaultBehavior(view);
    };

    return {
      behavior,
      budget: {
        attacks: false,
        damage: (self, target) => {
          const d = derive(self);
          const bolts = purgeSpeed * (purgeShot.base + (purgeShot.ratios?.AD ?? 0) * d.ad);
          const legs = (legAD * d.ad + legHealth * derive(target).maxHp) / (legCooldown / legsFacing);
          return { physical: bolts + legs };
        },
      },
      start: [
        { type: "state", state: "noAttacks", duration: FOREVER },
        innateStat("moveSpeedFlat", -purgeSlowdown),
        innateStat("slowResist", purgeSlowResist),
      ],
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          const enemy = ctx.enemy;
          const dashing = self.action?.kind === "dash" && self.action.ability === "E";
          if (dashing || ctx.tick < Number(ctx.memory.quietUntil ?? -1) || ctx.tick < Number(ctx.memory.purgeReady ?? 0)) return;
          if (!enemy.alive || !firing(self) || isUntargetable(enemy, self)) return;
          if (Math.abs(self.x - enemy.x) - enemy.spec.base.radius > purgeRange) return;
          ctx.memory.purgeReady = ctx.tick + Math.round(30 / purgeSpeed);
          shoot(ctx);
        },
        onCastStart(ctx) {
          // Purge holds its fire from the cast on: Corrosive Charge's pause comes after its cast time.
          const key = ctx.ability.key;
          const pause = key === "Q" ? ctx.ability.castTime + (quiet.Q ?? 0) : quiet[key];
          if (pause !== undefined) ctx.memory.quietUntil = Math.max(Number(ctx.memory.quietUntil ?? -1), ctx.tick + ticks(pause));
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "R") return;
          // The leash: slowed by up to 75%, the more health the target is missing.
          const missing = 1 - ctx.enemy.hp / derive(ctx.enemy).maxHp;
          ctx.memory.leashUntil = ctx.tick + ticks(leash);
          ctx.apply({ type: "cc", cc: "slow", strength: slowMax * Math.min(1, missing / slowFull), duration: leash });
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
          delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius"), delay: chargeDelay },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
            { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: q.quoted("slow them for 1.25 seconds", 0) },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          // The shield goes up as the cast starts; the dash follows.
          onCastStart: [{ type: "shield", amount: e.formula("Shield Strength"), duration: e.quoted("Urgot grants himself a shield for 4 seconds", 0) }],
          delivery: { kind: "dash", direction: "toward", distance: e.field("targetRange", "Minimum range"), speed: e.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 330) - purgeSlowdown, hitRadius: 50 },
          onHit: [
            { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
            { type: "cc", cc: "stun", duration: e.quoted("stunning them for 1.5 seconds", 0) },
          ],
          flags: { grounded: true, knockdown: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          chainCooldown: "first",
          delivery: { kind: "line", range: r.field("targetRange"), width: r.field("width"), speed: r.field("speed") },
          onHit: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage") }],
          flags: { projectile: true },
        },
        {
          key: "R2",
          name: `${r.name} (Mercy)`,
          slot: "R",
          cooldown: 0,
          castTime: 0,
          chain: { root: "R", index: 2, window: leash },
          usable: (unit, world) => drilled(unit, world.units[unit.side === 0 ? 1 : 0], world.tick),
          delivery: { kind: "target", range: 5000 },
          onHit: [{ type: "cc", cc: "suppression", duration: reel }],
          channel: { duration: reel, interruptible: false, mobile: true, range: 5000, onComplete: [{ type: "execute", threshold: flat(Number.MAX_SAFE_INTEGER) }] },
          flags: { usableWhileDisabled: true, spellShield: false },
        },
      ],
    };
  },
};

export default urgot;
