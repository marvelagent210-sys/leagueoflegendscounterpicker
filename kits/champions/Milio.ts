/**
 * Milio (patch 26.20), on himself: his own shields and heals Fire him Up, so his next hit adds
 * magic damage and a burn. Ultra Mega Fire Kick knocks the enemy back and explodes; Cozy
 * Campfire lengthens his attacks and heals him; Warm Hugs shields and speeds him on two charges;
 * Breath of Life heals and cleanses him.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { FOREVER, seriesAt, ticks } from "./util";

const milio: KitModule = {
  champion: "Milio",
  build(kit) {
    const p = kit.ability("Fired Up!");
    const q = kit.ability("Ultra Mega Fire Kick");
    const w = kit.ability("Cozy Campfire");
    const e = kit.ability("Warm Hugs");
    const r = kit.ability("Breath of Life");

    // Fired Up!: his ability hits on himself enchant his next hit on the enemy (4 s): 15% of his AD (7 / 11 / 15 by level) as magic damage, and a burn of 54.7 (10 – 50 by level) (+ 20% AP) over 1.5 s.
    const firedWords = "Milio's ability hits on himself and allied champions grant an enchantment for 4 seconds, which causes the next basic attack or ability hit against enemies to deal 7 / 11 / 15 (based on level)% of enchanted target's AD bonus magic damage and apply a burn that deals 10 – 50 (based on level) (+ 20% of Milio's AP) magic damage over 1.5 seconds.";
    const firedSeconds = p.quoted(firedWords, 0);
    const firedShare = seriesAt(p.seriesIn("Milio's ability hits on himself and allied champions grant an enchantment for 4 seconds", 0), 20, false) / 100;
    const burn: Formula = { base: p.levelValue("Milio's ability hits on himself and allied champions grant an enchantment for 4 seconds", 1), ratios: { AP: p.quoted(firedWords, 6) / 100 } };
    const burnSeconds = p.quoted(firedWords, 7);

    // Ultra Mega Fire Kick: after 0.25 s, a fireball (1200, 120, 1200) knocking the first enemy back 190 and stunning it over 1 s, then exploding for 320 (+ 120% AP) and a 60% (+ 5% per 100 AP) slow for 1.5 s; half its cost back on a champion.
    const kickWords = "After a 0.25-second delay, Milio kicks a fireball in the target direction that grants sight of its path and knocks back and stuns the first enemy it hits over 1 second.";
    const kickDelay = q.quoted(kickWords, 0);
    const kickDisable = q.quoted(kickWords, 1);
    const knock = q.field("effectRadius", "Champion knock back distance");
    const slowWords = "Slow: 40 / 45 / 50 / 55 / 60% (+ 5% per 100 AP)";
    const kickSlow: Formula = { base: q.baseOf("Slow") / 100, ratios: { AP: q.quoted(slowWords, 5) / 100 / 100 } };
    const kickSlowSeconds = q.quoted("dealing magic damage to enemies hit and slowing them for 1.5 seconds", 0);
    const refund = q.quoted("Ultra Mega Fire Kick refunds 50% of its mana cost if it hits at least one champion with the fireball or explosion.", 0) / 100;
    q.quote("Milio cannot cast other abilities during Ultra Mega Fire Kick's delay.");
    const blastDelay = 0.5;
    kit.assume(`Ultra Mega Fire Kick's knock back and stun are one 1 s displacement, and its bounce explodes on the enemy ${blastDelay} s after the hit.`);

    // Cozy Campfire on himself: 6 s of 20% more of his base attack range and 6 (+ 0.6% AP) healing every 0.264 s; it Fires him Up on arrival and every 3 s.
    const fireWords = "Milio summons a fuemigo at the target location or upon the target allied champion for 6 seconds";
    const fireSeconds = w.quoted(fireWords, 0);
    const fireRange = w.fraction("Base Attack Range Scaling");
    const fireHeal = w.formula("Heal per Tick");
    const fireEvery = w.quoted("Allied champions near the fuemigo gain bonus attack range equal to a percentage of their base attack range and heal every 0.264 over the duration.", 0);
    const fireUp = w.quoted("Cozy Campfire may grant Fired Up! upon being summoned and at most once every 3 seconds thereafter.", 0);
    w.quote("Milio counts as an allied champion for this ability.");

    // Warm Hugs: two charges (one per 13 s): a 165 (+ 45% AP) shield and 20% movement speed for 2.5 s, stacking twice.
    const hugSeconds = e.quoted("Milio envelops himself or the target allied champion in protective flames, granting the target a shield and bonus movement speed for 2.5 seconds.", 0);
    const hugCharges = e.quoted("Milio periodically stocks a Warm Hugs charge, up to a maximum of 2.", 0);
    e.quote("Warm Hugs' effects can stack up to 2 times.");

    // Breath of Life: heals 350 (+ 50% AP), cleanses non-airborne crowd control, 65% tenacity for 3 s; no other casts for 0.75 s.
    const lifeWords = "Milio explodes in soothing flames, healing and cleansing himself and nearby allied champions of non-airborne crowd control, and granting them 65% tenacity for 3 seconds.";
    const tenacity = r.quoted(lifeWords, 0) / 100;
    const tenacitySeconds = r.quoted(lifeWords, 1);
    const lockout = r.quoted("Milio cannot cast his other abilities for 0.75 seconds after Breath of Life's activation.", 0);
    r.quote("Breath of Life cannot be used while affected by cast-inhibiting crowd control.");

    const baseRange = kit.champion.forms[0]?.stats.attackRange ?? 525;
    const fireUpNow = (ctx: HookContext) => { ctx.memory["milio:firedUntil"] = ctx.tick + ticks(firedSeconds); };
    // The enchanted hit: 15% of his AD as magic damage, and the burn.
    const spendFired = (ctx: HookContext) => {
      if (ctx.tick >= Number(ctx.memory["milio:firedUntil"] ?? -1) || ctx.enemy.petId !== undefined) return;
      delete ctx.memory["milio:firedUntil"];
      ctx.apply({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { AD: firedShare } }, label: p.name });
      ctx.apply({ type: "dot", damageType: "magic", total: burn, duration: burnSeconds, interval: 0.25, label: `${p.name} (burn)` });
    };
    const locked = (unit: { memory: Record<string, number | string | boolean> }, tick: number) => tick < Number(unit.memory["milio:lockedUntil"] ?? -1);

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: kickDelay,
      usable: (unit, world) => !locked(unit, world.tick),
      delivery: { kind: "line", range: q.field("range"), width: q.field("width"), speed: q.field("speed") },
      onHit: [
        { type: "displace", direction: "away", distance: knock, duration: kickDisable },
        { type: "delayed", delay: blastDelay, effects: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage"), label: q.name }] },
      ],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.field("castTime", "Initial cast"),
      usable: (unit, world) => !locked(unit, world.tick),
      delivery: { kind: "self" },
      onSelf: [{ type: "stat", stat: "attackRange", amount: { base: fireRange * baseRange }, duration: fireSeconds }],
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.field("staticCooldown"), charges: { max: hugCharges, recharge: e.field("recharge") }, cost: e.cost(), castTime: e.castTime(),
      usable: (unit, world) => !locked(unit, world.tick),
      delivery: { kind: "self" },
      onSelf: [{ type: "shield", amount: e.formula("Shield Strength"), duration: hugSeconds }, { type: "stat", stat: "moveSpeedPercent", amount: { base: e.fraction("Bonus Movement Speed") }, duration: hugSeconds }],
      roles: ["buff"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "self" },
      onSelf: [
        { type: "heal", amount: r.formula("Heal") },
        { type: "cleanse", types: ["blind", "charm", "cripple", "disarm", "drowsy", "fear", "ground", "nearsight", "polymorph", "root", "silence", "sleep", "slow", "stun", "suppression", "taunt", "berserk"] },
        { type: "state", state: "tenacity", value: tenacity, duration: tenacitySeconds },
      ],
      roles: ["defense"],
    };

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      if (view.mode === "idle") return undefined;
      // Breath of Life out of crowd control, or when low.
      if (canCast(world, self, rSpec)) {
        const types = ccTypes(self);
        const held = ["root", "slow", "charm", "fear", "taunt", "polymorph", "ground", "nearsight", "blind", "disarm"].some((t) => types.has(t as never));
        if (held || self.hp <= 0.35 * derive(self).maxHp) return { kind: "cast", ability: "R" };
      }
      // The campfire for the fight, and a hug when hit.
      if ((view.mode === "fight" || view.mode === "trade") && canCast(world, self, wSpec) && Math.abs(view.enemy.x - self.x) <= 900) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          // His own shield and heal Fire him Up; the campfire on arrival and every 3 s.
          if (key === "E" || key === "R") fireUpNow(ctx);
          if (key === "W") {
            fireUpNow(ctx);
            ctx.memory["milio:fireFrom"] = ctx.tick;
            ctx.memory["milio:fireUpAt"] = ctx.tick + ticks(fireUp);
            ctx.memory["milio:healAt"] = ctx.tick + ticks(fireEvery);
          }
          if (key === "R") ctx.memory["milio:lockedUntil"] = ctx.tick + ticks(lockout);
        },
        onAbilityContact(ctx) {
          // The explosion's slow, scaled by his AP.
          if (ctx.ability.key !== "Q" || ctx.enemy.petId !== undefined) return undefined;
          const slow: Effect = { type: "delayed", delay: blastDelay, effects: [{ type: "cc", cc: "slow", strength: Math.min(0.99, evaluate(kickSlow, ctx.self)), duration: kickSlowSeconds }] };
          return [...ctx.effects, slow];
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          if (ctx.ability.key === "Q") ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + refund * Number(qSpec.cost ?? 0));
          spendFired(ctx);
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) spendFired(ctx);
        },
        onTick(ctx) {
          const from = ctx.memory["milio:fireFrom"];
          if (from === undefined) return;
          if (ctx.tick >= Number(from) + ticks(fireSeconds)) {
            delete ctx.memory["milio:fireFrom"];
            return;
          }
          if (ctx.tick >= Number(ctx.memory["milio:healAt"] ?? Number.POSITIVE_INFINITY)) {
            ctx.memory["milio:healAt"] = Number(ctx.memory["milio:healAt"]) + Math.max(1, ticks(fireEvery));
            ctx.apply({ type: "heal", amount: fireHeal }, true);
          }
          if (ctx.tick >= Number(ctx.memory["milio:fireUpAt"] ?? Number.POSITIVE_INFINITY)) {
            ctx.memory["milio:fireUpAt"] = ctx.tick + ticks(fireUp);
            fireUpNow(ctx);
          }
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          const haste = 1 + d.abilityHaste / 100;
          const fired = haste / wSpec.cooldown * (fireSeconds / fireUp + 1) + 2 * haste / eSpec.charges!.recharge;
          return { magic: fired * (firedShare * d.ad + evaluate(burn, self, target)) };
        },
        healing(self) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return ((fireSeconds / fireEvery) * evaluate(fireHeal, self) * haste) / wSpec.cooldown;
        },
      },
    };
  },
};

export default milio;
