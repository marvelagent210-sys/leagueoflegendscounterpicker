/**
 * Mel (patch 26.20): every instance of her damage stores Overwhelm on the enemy, and once the
 * store would finish it the next one does; her ability casts load her next attack with blazing
 * projectiles. Radiant Volley rains ten bolts, Solar Snare roots, Rebuttal shields her and sends
 * enemy projectiles back, and Golden Eclipse blasts an Overwhelmed enemy.
 */
import type { KitModule } from "../../engine/kits/compile";
import { effectiveResist, resistMultiplier } from "../../engine/rules/damage";
import { averageCritFactor } from "../../engine/rules/defense";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Missile, Unit, World } from "../../engine/sim/state";
import { FOREVER, seriesAt, ticks } from "./util";

const OVERWHELM = "mel:overwhelm";

const mel: KitModule = {
  champion: "Mel",
  build(kit) {
    const p = kit.ability("Searing Brilliance");
    const q = kit.ability("Radiant Volley");
    const w = kit.ability("Rebuttal");
    const e = kit.ability("Solar Snare");
    const r = kit.ability("Golden Eclipse");

    // Overwhelm: each damage instance stacks it for 5 s; the store is 80 (+ 10% AP) and 5 (+ 0.75% AP) more per stack (at Golden Eclipse rank 3); once it exceeds the enemy's health and shields after mitigation, the next stack deals it.
    const overwhelmWords = "Mel's basic attacks and abilities apply a stack of Overwhelm for each instance of damage they deal to enemies for 5 seconds, refreshing on subsequent damage instances and stacking infinitely.";
    const overwhelmSeconds = p.quoted(overwhelmWords, 0);
    const storeWords = "Store 50 / 60 / 70 / 80 (based on Golden Eclipse's rank) (+ 10% AP) magic damage on the affected enemy with the first stack";
    const firstStore: Formula = { base: seriesAt(p.seriesIn("Overwhelm: Store 50 / 60 / 70 / 80"), 3, false), ratios: { AP: p.quoted(storeWords, 4) / 100 } };
    const perStackWords = "For each stack, store an additional 2 / 3 / 4 / 5 (based on Golden Eclipse's rank) (+ 0.75% AP) magic damage on the target.";
    const perStack: Formula = { base: seriesAt(p.seriesIn("For each stack, store an additional"), 3, false), ratios: { AP: p.quoted(perStackWords, 4) / 100 } };
    p.quote("If the total post-mitigation damage stored exceeds the target's current health and shields, the next stack applied against them will consume them all to deal the stored damage.");
    // Searing Brilliance: each cast gives 3 stacks (5 s, up to 9); her next attack fires that many projectiles of 32.6 (8 – 30 by level) (+ 4% AP).
    const brillianceWords = "Mel's ability casts each generate 3 stacks of Searing Brilliance for 5 seconds, refreshing on subsequent casts and stacking up to 9 times.";
    const perCast = p.quoted(brillianceWords, 0);
    const brillianceSeconds = p.quoted(brillianceWords, 1);
    const maxBrilliance = p.quoted(brillianceWords, 2);
    const blazeWords = "Each projectile deals 8 – 30 (based on level) (+ 4% AP) magic damage";
    const blaze: Formula = { base: p.levelValue(blazeWords, 0), ratios: { AP: p.quoted(blazeWords, 2) / 100 } };

    // Radiant Volley: ten bolts at a point within 950 over 0.5 s: 160 (+ 55% AP), then 13 (+ 5% AP) each.
    const volleyWords = "Mel launches a barrage of luminous bolts at the target location over 0.5 seconds which distribute evenly in the area.";
    const volleySeconds = q.quoted(volleyWords, 0);
    const bolts = q.number("Number of Bolts");
    const firstBolt = q.formula("Initial Explosion Magic Damage");
    const laterBolt = q.formula("Magic Damage per Subsequent Explosion");
    q.quote("= 200 + 50 = 250 units");
    kit.assume("Radiant Volley's bolts all land on an enemy caught in their 250 area, each one a damage instance.");

    // Rebuttal: 0.75 s of a 200 (+ 70% AP) shield and 40% movement speed decaying; enemy projectiles reaching her barrier (175) are destroyed and sent back with 60% (+ 5% per 100 AP) of their damage as magic damage (physical first reduced to 70%).
    const rebuttalWords = "Mel forms a protective barrier around herself for 0.75 seconds, granting herself a shield for the duration, and gaining 40% bonus movement speed that decays over 0.75 seconds.";
    const rebuttalSeconds = w.quoted(rebuttalWords, 0);
    const rebuttalSpeed = w.quoted(rebuttalWords, 1) / 100;
    const barrier = w.field("effectRadius");
    const replicaWords = "Replicated Projectile Magic Damage Modifier: 40 / 45 / 50 / 55 / 60% (+ 5% per 100 AP) of the original damage";
    const replica: Formula = { base: w.baseOf("Replicated Projectile Magic Damage Modifier") / 100, ratios: { AP: w.quoted(replicaWords, 5) / 100 / 100 } };
    const physicalShare = w.quoted("with physical damage instances being reduced to 70% before conversion", 0) / 100;
    w.quote("all hostile projectiles sourced from enemy champions that collide with the barrier will be destroyed instantly before Mel fires the same projectiles as her own");
    w.quote("The scaling of the effects of the copied missile is calculated using the original missile source's attributes");
    kit.assume("Rebuttal's replicas fly straight back at the enemy at the speed they came, carrying the same effects; a basic attack's replica carries the attack's average damage.");

    // Solar Snare: an orb (1000, 1100) for 240 (+ 70% AP) that roots for 1.5 s.
    const snareRoot = e.quoted("Enemies hit by the orb are dealt magic damage and rooted for 1.5 seconds.", 0);
    kit.assume("Solar Snare's field of radiation around its orb is left out (its damage is small next to the orb's).");

    // Golden Eclipse: a blast on an Overwhelmed enemy for 275 (+ 30% AP) (+ 10 (+ 4% AP) per stack).
    const eclipse: Formula = r.formulaPart("Magic Damage", ["AP"]);
    const eclipseWords = "Magic Damage: 125 / 200 / 275 (+ 30% AP) (+ 4 / 7 / 10 (+ 4% AP) per Overwhelm stack on the target)";
    const eclipsePerStack: Formula = { base: r.quoted(eclipseWords, 6), ratios: { AP: r.quoted(eclipseWords, 7) / 100 } };
    r.quote("An enemy champion affected by Overwhelm is required to cast this ability.");

    const overwhelmOn = (enemy: Unit, self: Unit) => enemy.statuses.find((s) => s.kind === "mark" && s.key === OVERWHELM && s.source === self.side && s.endTick > 0);
    const stored = (self: Unit, stacks: number, target: Unit) => (stacks <= 0 ? 0 : evaluate(firstStore, self, target) + (stacks - 1) * evaluate(perStack, self, target));
    const magicShare = (self: Unit, target: Unit) => {
      const s = derive(self);
      const t = derive(target);
      return resistMultiplier(effectiveResist(t.mr, t.mrReduction, { flat: s.magicPen, percent: s.magicPenPercent }));
    };
    const shieldsOf = (unit: Unit) => unit.statuses.reduce((sum, s) => (s.kind === "shield" ? sum + s.value : sum), 0);

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius", "Explosion radius") + 50, delay: 0.25 },
      onHit: [
        { type: "damage", damageType: "magic", amount: firstBolt, label: q.name },
        ...Array.from({ length: Math.max(0, bolts - 1) }, (_, i): Effect => ({ type: "delayed", delay: ((i + 1) * volleySeconds) / bolts, effects: [{ type: "damage", damageType: "magic", amount: laterBolt, label: q.name }] })),
      ],
      flags: { projectile: true, spellShield: true },
      roles: ["damage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "shield", amount: w.formula("Shield"), duration: rebuttalSeconds }],
      roles: ["defense"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "line", range: e.field("range"), width: 2 * e.field("effectRadius", "Orb radius"), speed: e.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Orb Magic Damage") }, { type: "cc", cc: "root", duration: snareRoot }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      usable: (unit, world) => overwhelmOn(world.units[1 - unit.side]!, unit) !== undefined,
      delivery: { kind: "target", range: 50000 },
      onHit: [{ type: "damage", damageType: "magic", amount: eclipse, label: r.name }],
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage"],
    };

    // A damage instance on the enemy: Overwhelm stacks, or finishes it.
    const overwhelm = (ctx: HookContext) => {
      const enemy = ctx.enemy;
      if (!enemy.alive || enemy.petId !== undefined) return;
      const mark = overwhelmOn(enemy, ctx.self);
      const stacks = mark?.value ?? 0;
      if (stacks > 0 && stored(ctx.self, stacks, enemy) * magicShare(ctx.self, enemy) > enemy.hp + shieldsOf(enemy)) {
        enemy.statuses = enemy.statuses.filter((s) => s !== mark);
        applyEffect(ctx.world, ctx.self, enemy, { type: "damage", damageType: "magic", amount: { base: stored(ctx.self, stacks, enemy) }, label: "Overwhelm" }, { scale: 1 });
        return;
      }
      enemy.statuses = enemy.statuses.filter((s) => s !== mark);
      ctx.apply({ type: "mark", key: OVERWHELM, duration: overwhelmSeconds, value: stacks + 1 });
    };
    // A projectile reaching Rebuttal's barrier: destroyed, and its replica sent back.
    const reflect = (ctx: HookContext, missile: Missile) => {
      const self = ctx.self;
      const enemy = ctx.enemy;
      ctx.world.missiles = ctx.world.missiles.filter((m) => m !== missile);
      const share = evaluate(replica, self, enemy);
      const effects: Effect[] = [];
      if (missile.source === "attack") {
        const d = derive(enemy);
        effects.push({ type: "damage", damageType: "magic", amount: { base: physicalShare * share * d.ad * averageCritFactor(d.critChance, d.critDamage) }, label: `${w.name} (replica)` });
      }
      for (const effect of missile.onHit) {
        if (effect.type === "damage") {
          const raw = (effect.amountFor?.(enemy, enemy) ?? evaluate(effect.amount, enemy, enemy)) * missile.scale;
          effects.push({ type: "damage", damageType: "magic", amount: { base: (effect.damageType === "physical" ? physicalShare : 1) * share * raw }, label: `${w.name} (replica)` });
        } else if (effect.type === "cc" || effect.type === "displace") effects.push(effect);
      }
      if (effects.length === 0) return;
      const speed = Math.max(1, missile.perTick * 30);
      ctx.apply({ type: "delayed", delay: Math.abs(enemy.x - self.x) / speed, effects });
    };
    const incoming = (world: World, self: Unit) =>
      world.missiles.filter((m) => m.owner !== self.side && m.projectile && !m.ended && m.pet === undefined && Math.sign(self.x - m.x) === m.direction);

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      // Rebuttal when an enemy projectile is about to arrive.
      if (view.mode !== "idle" && canCast(world, self, wSpec)) {
        const soon = incoming(world, self).some((m) => (Math.abs(m.x - self.x) - barrier) / Math.max(1, m.perTick * 30) <= 0.25);
        if (soon) return { kind: "cast", ability: "W" };
      }
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          // Every cast loads Searing Brilliance.
          ctx.memory["mel:brilliance"] = Math.min(maxBrilliance, Number(ctx.memory["mel:brilliance"] ?? 0) + perCast);
          ctx.memory["mel:brillianceUntil"] = ctx.tick + ticks(brillianceSeconds);
          if (ctx.ability.key === "W") ctx.memory["mel:rebuttalFrom"] = ctx.tick;
        },
        onAbilityContact(ctx) {
          // Golden Eclipse grows with the Overwhelm stacks.
          if (ctx.ability.key !== "R" || ctx.enemy.petId !== undefined) return undefined;
          const stacks = overwhelmOn(ctx.enemy, ctx.self)?.value ?? 0;
          return [{ type: "damage", damageType: "magic", amount: { base: evaluate(eclipse, ctx.self, ctx.enemy) + stacks * evaluate(eclipsePerStack, ctx.self, ctx.enemy) }, label: r.name }];
        },
        onAttackHit(ctx) {
          if (ctx.blocked || ctx.enemy.petId !== undefined) return;
          // Searing Brilliance's projectiles, one damage instance each.
          const loaded = ctx.tick < Number(ctx.memory["mel:brillianceUntil"] ?? -1) ? Number(ctx.memory["mel:brilliance"] ?? 0) : 0;
          ctx.memory["mel:brilliance"] = 0;
          for (let i = 0; i < loaded; i++) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: blaze, label: `${p.name} (projectile)` }, { scale: 1 });
        },
        onDamageDealt(ctx) {
          if (ctx.ability === "Overwhelm" || ctx.persistent || ctx.mitigated <= 0) return;
          overwhelm(ctx);
        },
        onTick(ctx) {
          const self = ctx.self;
          const from = ctx.memory["mel:rebuttalFrom"];
          if (from === undefined) return;
          const age = (ctx.tick - Number(from)) / 30;
          if (age > rebuttalSeconds) {
            delete ctx.memory["mel:rebuttalFrom"];
            ctx.buff("mel:rebuttal", "moveSpeedPercent", 0, 0);
            return;
          }
          ctx.buff("mel:rebuttal", "moveSpeedPercent", rebuttalSpeed * (1 - age / rebuttalSeconds), FOREVER);
          // Projectiles that reach the barrier during this tick's flight.
          for (const missile of incoming(ctx.world, self)) {
            if (Math.abs(missile.x - self.x) - barrier - (missile.radius ?? 0) <= missile.perTick) reflect(ctx, missile);
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const casts = haste / qSpec.cooldown + haste / eSpec.cooldown;
          return { magic: casts * perCast * evaluate(blaze, self, target) + evaluate(firstStore, self, target) / 10 };
        },
      },
    };
  },
};

export default mel;
