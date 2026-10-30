/**
 * Nilah (patch 26.20): her critical strike chance sets her armor penetration, the healing her
 * attacks and Formless Blade give (what overflows becomes a shield), Formless Blade's damage and
 * Apotheosis's healing. Formless Blade's hit lengthens and speeds up her attacks; Jubilant Veil
 * dodges attacks and blunts magic damage; Slipstream dashes through the enemy on two charges,
 * and Formless Blade cast during it is instant; Apotheosis whirls, then bursts and pulls.
 */
import type { Series } from "../../engine/abilities";
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor, healingReceived } from "../../engine/rules/defense";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, between, seriesAt } from "./util";

const nilah: KitModule = {
  champion: "Nilah",
  build(kit) {
    const p = kit.ability("Joy Unending");
    const q = kit.ability("Formless Blade");
    const w = kit.ability("Jubilant Veil");
    const e = kit.ability("Slipstream");
    const r = kit.ability("Apotheosis");

    // Joy Unending: allies' heals and shields and shared minion experience only.
    p.quote("Whenever a nearby allied champion uses an ability to heal or shield either Nilah or themselves");
    p.quote("Whenever Nilah kills a minion, she and the nearest allied champion gain an additional 50% of the experience");
    kit.assume("Joy Unending works only with allied champions and minions, so it does nothing in a duel.");

    const byCrit = (series: Series, what: string): Series => {
      if (series.kind !== "variable" || series.variable !== "critical strike chance") throw new Error(`Nilah: ${what} no longer depends on critical strike chance`);
      return series;
    };
    // Values "based on critical strike chance" run in steps of 10%; between them they're read in a straight line.
    const atCrit = (series: Series, unit: Unit) => seriesAt(series, 100 * derive(unit).critChance, true) / 100;

    // Formless Blade's passive: 0–30% armor penetration, and a heal of 0–20% of her attacks' and Formless Blade's damage to champions, by critical strike chance; a heal past maximum health becomes a shield for 6 s.
    const penetration = byCrit(q.seriesIn("(based on critical strike chance)% armor penetration"), "armor penetration");
    const bladeHeal = byCrit(q.seriesIn("Her basic attacks and Formless Blade heal her for"), "Formless Blade's healing");
    const overflowSeconds = q.quoted("converting each heal instance beyond maximum health into a shield that lasts 6 seconds", 0);

    // Formless Blade: a 600 line for 40 (+ 100% AD) at 0% critical strike chance to 76.4 (+ 191% AD) at 100%; its cast time falls from 0.35 s with bonus attack speed.
    const bladeLeast = q.formula("Minimum Physical Damage");
    const bladeMost = q.formula("Maximum Physical Damage");
    q.quote("deals physical damage to enemies hit, increased by critical strike damage (based on critical strike chance)");
    kit.assume("Formless Blade's damage runs in a straight line from its minimum at 0% critical strike chance to its maximum at 100%, as the wiki writes them, whatever Nilah's critical strike damage.");
    const blade = (unit: Unit) => between(bladeLeast, bladeMost, derive(unit).critChance);
    const castSeries = q.fieldSeries("castTime");
    if (castSeries.kind !== "variable" || castSeries.variable !== "bonus attack speed") throw new Error("Nilah: Formless Blade's cast time no longer depends on bonus attack speed");
    const bladeCast = Number(castSeries.values[0] ?? 0);
    // The rectangle runs from 0 to 600 in front of her ("0 - 600"; the parser keeps only its start).
    const [bladeStart, bladeRange] = q.fieldNumbers("range");
    if (bladeStart !== 0 || bladeRange === undefined) throw new Error("Nilah: Formless Blade's rectangle no longer starts at Nilah");
    q.fieldLabel("range", "Rectangle length, starts at 0 distance from Nilah");
    q.quote("Formless Blade can hit structures and applies life steal at 100% effectiveness to one target.");
    // A hit empowers her attacks for 4 s: 125 range and 10 – 60% (based on level) attack speed (65.9% at 20).
    const empowerWords = "If Formless Blade hits an enemy, Nilah empowers herself for 4 seconds: gaining 125 bonus attack range and 10 – 60 (based on level)% bonus attack speed";
    const empowerSeconds = q.quoted(empowerWords, 0);
    const empowerRange = q.quoted(empowerWords, 1);
    const empowerSpeed = q.levelValue(empowerWords, 0) / 100;
    q.quote("causing her basic attacks to strike in a cone that deals 100% AD physical damage to enemies hit");
    q.quote("On-hit effects are applied only to the primary target.");
    kit.assume("Formless Blade's empowered attacks strike the enemy champion as ordinary attacks; the cone's damage to other units (pets included) is left out.");
    // During Slipstream it is instant, and its wave follows her to the end of the dash.
    e.quote("Formless Blade and Apotheosis can be cast during the dash.");
    q.quote("If Formless Blade is cast during Slipstream, Nilah leaves behind a wave that is sent towards her location at the end of the dash, dealing the same damage to enemies hit.");
    kit.assume("Formless Blade's second cast time, none, is its cast during Slipstream. An enemy takes Formless Blade's damage once per cast, from the blade or its wave.");

    // Jubilant Veil: 2.25 s of mist: ghosted, 25% movement speed, 25% less magic damage, and basic attacks dodged.
    const veilWords = "Nilah envelops herself in mist for 2.25 seconds, during which she becomes ghosted, gains bonus movement speed, reduces all incoming magic damage taken by 25%, and dodges all non-turret basic attacks.";
    const veilSeconds = w.quoted(veilWords, 0);
    const veilMagic = w.quoted(veilWords, 1) / 100;
    if (w.textField("cooldownStart") !== "post-effect") throw new Error("Nilah: Jubilant Veil's cooldown timing changed");

    // Slipstream: two charges (one per 12 s), a 450 dash at 2200 toward an enemy within 550, 100 (+ 20% bonus AD) to enemies passed; resets her attack.
    const charges = e.quoted("Nilah periodically stocks a Slipstream charge, up to a maximum of 2.", 0);
    const slipRange = e.field("targetRange");
    e.quote("Nilah dashes a fixed distance in the direction of the target unit, dealing physical damage to enemies she passes through.");
    e.quote("Slipstream resets Nilah's basic attack timer.");

    // Apotheosis: 4 hits of 35 (+ 10% bonus AD) over 1 s within 450, then a burst of 325 (+ 100% bonus AD) that pulls 250; every hit slows by 10% for 3 s. Heals 20–50% (by critical strike chance) of its damage to champions.
    const whirlWords = "Nilah whirls her whip-blade over 1 second, dealing physical damage to nearby enemies every 0.25 seconds.";
    const whirlSeconds = r.quoted(whirlWords, 0);
    const whirlEvery = r.quoted(whirlWords, 1);
    const pull = r.quoted("She then unleashes a burst that deals physical damage and pulls them 250 units towards her.", 0);
    const slowWords = "Each hit also slows targets by 10% for 3 seconds, refreshing on subsequent hits.";
    const slow: Effect = { type: "cc", cc: "slow", strength: r.quoted(slowWords, 0) / 100, duration: r.quoted(slowWords, 1) };
    const whirlTick = r.formula("Physical Damage per Tick");
    const burst = r.formula("Burst Physical Damage");
    const ultHeal = byCrit(r.seriesIn("Nilah heals herself and nearby allied champions for"), "Apotheosis's healing");
    r.quote("Nilah is unable to basic attack and cast her other abilities during Apotheosis, but she is able to move.");
    r.quote("Spell shield will only block the burst damage.");
    const pullSeconds = 0.25;
    const burstLabel = `${r.name} (burst)`;
    kit.assume(`Apotheosis's pull takes ${pullSeconds} s (the wiki gives no speed). Crowd control that stops casting interrupts the whirl, as it does channels in general.`);

    const slipstreaming = (unit: Unit) => unit.action?.kind === "dash" && unit.action.ability === "E";

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: bladeCast,
      castTimeFor: (unit) => (slipstreaming(unit) ? 0 : seriesAt(castSeries, 100 * Math.max(0, derive(unit).bonusAttackSpeed), true)),
      overlay: true,
      delivery: { kind: "line", range: bladeRange, width: q.field("width") },
      onHit: [{ type: "damage", damageType: "physical", amount: bladeLeast, amountFor: (caster, target) => evaluate(blade(caster), caster, target) }],
      flags: { projectile: false, appliesLifeSteal: true },
      roles: ["damage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), cooldownAfter: "state",
      delivery: { kind: "self" },
      onSelf: [
        { type: "state", state: "ghosted", duration: veilSeconds },
        { type: "state", state: "dodgeAttacks", duration: veilSeconds },
        { type: "state", state: "magicReduction", value: veilMagic, duration: veilSeconds },
        { type: "stat", stat: "moveSpeedPercent", amount: { base: w.fraction("Bonus Movement Speed") }, duration: veilSeconds },
      ],
      roles: ["defense"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.field("staticCooldown"), charges: { max: charges, recharge: e.field("recharge") }, cost: e.cost(), castTime: e.castTime(),
      usable: (unit, world) => {
        const enemy = world.units[1 - unit.side]!;
        return Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= slipRange;
      },
      delivery: { kind: "dash", direction: "toward", distance: e.field("range", "Dash distance"), speed: e.field("speed"), through: true, hitRadius: e.field("collisionRadius"), hitCentered: true },
      onSelf: [{ type: "resetAttack" }],
      onHit: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
      flags: { spellShield: e.flag("spellShield") ?? true, grounded: e.flag("grounded") ?? true, knockdown: e.flag("knockdown") ?? true },
      roles: ["engage", "damage"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "self" },
      channel: {
        duration: whirlSeconds,
        pulses: { base: whirlSeconds / whirlEvery },
        interruptible: true,
        mobile: true,
        range: r.field("effectRadius", "Damage radius"),
        pulsesPassSpellShields: true,
        onTick: [{ type: "damage", damageType: "physical", amount: whirlTick }, slow],
        onComplete: [{ type: "damage", damageType: "physical", amount: burst, label: burstLabel }, { type: "displace", direction: "toward", distance: pull, duration: pullSeconds }, slow],
      },
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };

    // A heal; what would go past maximum health becomes a shield that lasts 6 s.
    const healOrShield = (ctx: HookContext, amount: number) => {
      const self = ctx.self;
      if (amount <= 0 || !self.alive || hasState(self, "noHealing")) return;
      const d = derive(self);
      const received = healingReceived(amount * (1 + d.healingIncrease), self.statuses.some((s) => s.kind === "grievousWounds"));
      const beyond = received - (d.maxHp - self.hp);
      ctx.apply({ type: "heal", amount: { base: amount } }, true);
      if (beyond > 0) ctx.apply({ type: "shield", amount: { base: beyond }, duration: overflowSeconds }, true);
    };

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      // Formless Blade is instant during Slipstream: crack it as she passes.
      if (slipstreaming(self) && canCast(world, self, qSpec) && Math.abs(view.enemy.x - self.x) - view.enemy.spec.base.radius <= bladeRange) return { kind: "cast", ability: "Q" };
      const decided = defaultBehavior(view);
      // Slipstream carries her a fixed 450 through the enemy: within her attack range that only takes her out of it, so she keeps it to close in (or to dodge).
      if (decided?.kind === "cast" && decided.ability === "E" && decided.dodge === undefined && inAttackRange(self, view.enemy)) return { kind: "attack" };
      return decided;
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onStart(ctx) {
          ctx.buff("nilah:penetration", "armorPen", atCrit(penetration, ctx.self), FOREVER);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q") return;
          ctx.buff("nilah:bladeRange", "attackRange", empowerRange, empowerSeconds);
          ctx.buff("nilah:bladeSpeed", "attackSpeed", empowerSpeed, empowerSeconds);
        },
        onDamageDealt(ctx) {
          if (ctx.mitigated <= 0 || ctx.persistent || ctx.petSource) return;
          // Damage reports name the ability (or its labeled hit).
          if (ctx.attack || ctx.ability === q.name) healOrShield(ctx, ctx.mitigated * atCrit(bladeHeal, ctx.self));
          else if (ctx.ability === r.name || ctx.ability === burstLabel) healOrShield(ctx, ctx.mitigated * atCrit(ultHeal, ctx.self));
        },
      },
      budget: {
        healing(self, target) {
          const d = derive(self);
          const haste = 1 + d.abilityHaste / 100;
          const attacks = d.ad * averageCritFactor(d.critChance, d.critDamage) * d.attackSpeed;
          const blades = (evaluate(blade(self), self, target) * haste) / qSpec.cooldown;
          const whirls = (((whirlSeconds / whirlEvery) * evaluate(whirlTick, self, target) + evaluate(burst, self, target)) * haste) / rSpec.cooldown;
          return atCrit(bladeHeal, self) * (attacks + blades) + atCrit(ultHeal, self) * whirls;
        },
      },
    };
  },
};

export default nilah;
