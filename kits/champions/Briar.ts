/**
 * Briar (patch 26.20): Crimson Curse bleeds and heals her, Head Rush stuns and shreds, Blood
 * Frenzy forces her to attack (with Snack Attack), Chilling Scream charges into a knockback,
 * and Certain Death marks a champion, dashes to it and keeps her in Hematomania.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack, inAttackRange, startCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { FOREVER, missingShare, seriesAt, ticks } from "./util";

const BLEED = "Crimson Curse";

const briar: KitModule = {
  champion: "Briar",
  build(kit) {
    const p = kit.ability("Crimson Curse");
    const q = kit.ability("Head Rush");
    const w = kit.ability("Blood Frenzy");
    const snack = kit.ability("Snack Attack");
    const e = kit.ability("Chilling Scream");
    const r = kit.ability("Certain Death");

    // Crimson Curse: a bleed of 54.7 (+ 50% bonus AD) over 5 s, 25% more per stack beyond the first (up to 5), healing her for 25% of it before mitigation.
    const bleedWords = "The bleed deals 10 – 50 (based on level) (+ 50% bonus AD) total physical damage";
    const bleedBase: Formula = { base: p.levelValue(bleedWords, 0), ratios: { bonusAD: p.quoted(bleedWords, 2) / 100 } };
    const stackWords = "stacking up to 5 times and dealing 25% damage for stacks beyond the first";
    const maxStacks = p.quoted(stackWords, 0);
    const perStack = p.quoted(stackWords, 1) / 100;
    const bleedSeconds = p.quoted("inflict a bleed against enemies for 5 seconds, refreshing on subsequent applications", 0);
    const bleedHeal = p.quoted("The bleed always heals Briar for 25% of the pre-mitigation damage dealt.", 0) / 100;
    const bleedEvery = 0.5;
    p.quote("Briar has no base health regeneration");
    const ampWords = "Briar has no base health regeneration, but she increases healing from all sources by";
    const ampByMissing = p.seriesIn(ampWords, 0);
    const ampPerHealth = p.seriesIn(ampWords, 1);
    kit.assume(`Crimson Curse ticks every ${bleedEvery} s (the game files' BleedTickRate). Each application refreshes the whole bleed for 5 s at the damage of its new stack count. Its heal on a target that dies while bleeding is left out: a death ends the duel.`);

    // Head Rush: a leap of up to 475 that stuns for 0.85 s and shreds 20% armor and magic resistance for 5 s.
    const healthCost = (ability: typeof q): Formula => {
      ability.textField("costType");
      return { base: 0, ratios: { currentHP: ability.cost() / 100 } };
    };
    const rushWords = "stuns them for 0.85 seconds, and reduces their armor and magic resistance for 5 seconds";
    const rushStun = q.quoted(rushWords, 0);
    const shredSeconds = q.quoted(rushWords, 1);
    const shred = q.fraction("Resistances Reduction");
    const rushRange = q.field("targetRange");
    q.fieldNumbers("speed");
    const rushSpeeds = q.record.fields.speed?.values[0]?.series;
    q.quote("applies on-hit effects");
    q.quote("Head Rush resets Briar's basic attack timer.");
    q.quote("Head Rush's damage benefits from life steal.");
    q.quote("Head Rush does not force the target's armor and magic resistance to update immediately outside of the natural stat update cycle");

    // Blood Frenzy: a dash of 75 to 300, then 5 s of forced attacks with attack and movement speed.
    const [dashMin = 75, dashMax = 300] = w.fieldNumbers("targetRange");
    const frenzyRadius = w.field("effectRadius", "Frenzy target radius");
    const frenzySeconds = w.quoted("If there is a nearby enemy upon her arrival, she gains Blood Frenzy for 5 seconds", 0);
    const frenzyAS = w.fraction("Bonus Attack Speed");
    const frenzyMS = w.fraction("Bonus Movement Speed");
    w.quote("She reveals the target and gains ghosting");
    w.quote("empowering her basic attacks to have an uncancellable windup");
    w.quote("Blood Frenzy causes Briar to become unable to receive movement and attack commands.");
    w.quote("The frenzy ends early if there are no longer any nearby valid targets or Chilling Scream is cast.");
    w.quote("Blood Frenzy resets Briar's basic attack timer.");
    kit.assume("Blood Frenzy's cleave around the target is left out of the duel. Briar always charges Chilling Scream fully.");

    // Snack Attack: during Blood Frenzy, an attack with 50 more range that bites and heals.
    const snackWindow = snack.quoted("Briar empowers her next basic attack within 5 seconds during Blood Frenzy", 0);
    const snackRange = snack.quoted("gaining 50 bonus range", 0);
    const snackHealMax = snack.quoted("healing her for 5% of her maximum health plus a percentage of the post-mitigation damage dealt", 0) / 100;
    const snackHeal = snack.fraction("Heal Percentage");
    snack.quote("Snack Attack resets Briar's basic attack timer.");
    snack.quote("if the frenzy ends at any point, the empowered attack will be lost immediately");

    // Chilling Scream: charged for 1 s (35% damage reduction, healing every 0.25 s), then a 600 scream that knocks back 575.
    const chargeSeconds = e.quoted("charging for up to 1 second", 0);
    const chargeWords = "gains 35% damage reduction and heals herself every 0.25 seconds";
    const chargeReduction = e.quoted(chargeWords, 0) / 100;
    const chargeHealEvery = e.quoted(chargeWords, 1);
    const chargeHeal = e.shareOf("Heal Per Tick");
    e.quote("Chilling Scream's charge cannot be interrupted by crowd control.");
    e.quote("Chilling Scream can be recast within the duration, and does so automatically afterwards.");
    const screamRange = e.fieldNumbers("range").at(-1) ?? 600;
    const screamSlow = "slowing them by 80% for 0.5 seconds";
    const knockback = e.quoted("If Chilling Scream was charged for its full duration, enemies hit are also knocked back 575 units", 0);
    const wallWords = "become knocked up for 0.5 seconds and stunned for 1.5 seconds";

    // Certain Death: the hemolith marks the first champion hit; Briar cleanses, turns immune for 1.25 s and dashes to it.
    r.quote("marking the first enemy champion hit as her prey");
    r.quote("The mark's application disrupts the target's ongoing channels.");
    r.quote("While the target is marked, they are revealed.");
    r.quote("Briar cleanses herself from all crowd control and becomes immune to them over a cast time, afterwards dashing to them with displacement immunity");
    r.quote("She will not stop tracking the target until she reaches them, as there is no maximum tracking distance.");
    r.quote("Hematomania lasts until the mark is dispelled by any means, including Briar's or the target's death.");
    r.quote("Casting Chilling Scream removes the target's mark and ends Hematomania early.");
    r.quote("This ability will cast from wherever the caster is at the start of the cast time.");
    const lands = r.quoted("Briar lands 100 units in front of her target at the end of the dash.", 0);
    const hemaResists = r.quoted("bonus armor and bonus magic resistance equal to 20% AD", 0) / 100;
    const hemaLifeSteal = r.fraction("Life Steal");
    const hemaMS = r.fraction("Additional Bonus Movement Speed");
    const dashSpeed = r.field("speed", "Dash speed");
    const huntDamage = r.formula("Magic Damage");
    const idealDash = 0.5;
    kit.assume(`Certain Death's dash takes ${idealDash} s, at a speed between ${dashSpeed} and ${dashSpeed * 2} (the game files' IdealDashTime, MinDashSpeed and MaxDashSpeed). Its fear of other enemies has no target in a duel.`);

    const frenzyEnd = (unit: Unit) => Number(unit.memory["briar:frenzyUntil"] ?? -1);
    const hematomania = (unit: Unit) => unit.memory["briar:hema"] === true;
    const frenzied = (unit: Unit, tick: number) => tick < frenzyEnd(unit) || hematomania(unit);
    const other = (world: World, unit: Unit) => world.units[unit.side === 0 ? 1 : 0];

    const applyBleed = (ctx: HookContext, scale = 1) => {
      if (ctx.enemy.petId !== undefined || !ctx.enemy.alive) return;
      const active = ctx.tick < Number(ctx.memory["briar:bleedUntil"] ?? -1);
      const stacks = active ? Math.min(maxStacks, Number(ctx.memory["briar:bleed"] ?? 0) + 1) : 1;
      ctx.memory["briar:bleed"] = stacks;
      ctx.memory["briar:bleedUntil"] = ctx.tick + ticks(bleedSeconds);
      const total: Formula = { base: bleedBase.base * (1 + perStack * (stacks - 1)), ratios: { bonusAD: (bleedBase.ratios?.bonusAD ?? 0) * (1 + perStack * (stacks - 1)) } };
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "dot", damageType: "physical", total, duration: bleedSeconds, interval: bleedEvery, label: BLEED }, { scale });
    };
    const frenzyStates = (ctx: HookContext, seconds: number) => {
      ctx.buff("briar:frenzyAS", "attackSpeed", frenzyAS, seconds);
      ctx.buff("briar:frenzyMS", "moveSpeedPercent", frenzyMS, seconds);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "briar:ghost");
      ctx.apply({ type: "state", state: "ghosted", duration: seconds }, true);
      const ghost = ctx.self.statuses.findLast((s) => s.kind === "state" && s.key === "ghosted" && s.startTick === ctx.tick);
      if (ghost) ghost.memoKey = "briar:ghost";
      // The frenzy reveals its target.
      if (ctx.enemy.alive) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "revealed", duration: seconds }, { scale: 1 });
    };
    const endFrenzy = (ctx: HookContext) => {
      ctx.memory["briar:frenzyUntil"] = -1;
      ctx.memory["briar:hema"] = false;
      for (const key of ["briar:frenzyAS", "briar:frenzyMS", "briar:hemaArmor", "briar:hemaMR", "briar:hemaLS", "briar:hemaMS"]) ctx.buff(key, "attackSpeed", 0, 0);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "briar:ghost" && !(s.kind === "empower" && s.key === "W2"));
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s.memoKey !== "briar:mark");
    };

    /** The charge's heals, up to the `done`-th. */
    const chargeHeals = (ctx: HookContext, done: number) => {
      while (Number(ctx.memory["briar:chargeHeals"] ?? 0) < Math.min(done, Math.round(chargeSeconds / chargeHealEvery))) {
        ctx.memory["briar:chargeHeals"] = Number(ctx.memory["briar:chargeHeals"] ?? 0) + 1;
        ctx.apply({ type: "heal", amount: { base: 0, ratios: { maxHP: chargeHeal } } }, true);
      }
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: healthCost(q), costType: "health", castTime: 0,
      delivery: { kind: "dash", direction: "target", distance: rushRange, speed: 900, speedFor: (unit) => Number(unit.memory["briar:rushSpeed"] ?? 900), hitRadius: 100 },
      onHit: [
        { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
        { type: "cc", cc: "stun", duration: rushStun },
        { type: "stat", stat: "armorReductionPercent", amount: { base: shred }, duration: shredSeconds },
        { type: "stat", stat: "mrReductionPercent", amount: { base: shred }, duration: shredSeconds },
      ],
      onSelf: [{ type: "resetAttack" }],
      flags: { appliesOnHit: true, appliesLifeSteal: true, spellShield: true, knockdown: true },
      roles: ["engage", "cc", "damage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: healthCost(w), costType: "health", castTime: 0,
      delivery: { kind: "dash", direction: "toward", distance: dashMax, minDistance: dashMin, speed: w.field("speed") },
      flags: { knockdown: true },
      roles: ["engage", "buff"],
    };
    const w2Spec: AbilitySpec = {
      key: "W2", name: snack.name, slot: "W", cooldown: 0, castTime: 0,
      usable: (unit, world) => world.tick < frenzyEnd(unit) && unit.memory["briar:snack"] === true,
      delivery: { kind: "self" },
      onSelf: [{
        type: "empower", attacks: 1, window: snackWindow, bonusRange: snackRange, resetAttack: true, uncancellable: true,
        onHit: [{ type: "damage", damageType: "physical", amount: snack.formula("Bonus Physical Damage"), label: snack.name }, { type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { maxHP: snackHealMax } } }] }],
      }],
      roles: ["damage"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: healthCost(e), costType: "health", castTime: chargeSeconds,
      onCastStart: [{ type: "state", state: "damageReduction", value: chargeReduction, duration: chargeSeconds }],
      delivery: { kind: "line", range: screamRange, width: e.field("width"), speed: e.field("speed", "Missile speed") },
      onHit: [
        { type: "damage", damageType: "magic", amount: e.formula("Maximum Magic Damage") },
        { type: "cc", cc: "slow", strength: e.quoted(screamSlow, 0) / 100, duration: e.quoted(screamSlow, 1) },
        {
          type: "displace", direction: "away", distance: knockback, duration: knockback / e.field("speed", "Knockback speed"),
          wallStun: e.quoted(wallWords, 1),
          wallEffects: [{ type: "damage", damageType: "magic", amount: e.formula("Bonus Magic Damage"), label: `${e.name} (wall)` }, { type: "displace", direction: "away", distance: 0, duration: e.quoted(wallWords, 0) }],
        },
      ],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: healthCost(r), costType: "health", castTime: r.castTime("Time before kicking hemolith"), castOrigin: "start",
      delivery: { kind: "line", range: r.field("range"), width: r.field("width"), speed: r.field("speed", "Missile speed") },
      onHit: [{ type: "disrupt" }],
      flags: { projectile: true, spellShield: true },
      roles: ["engage", "damage"],
      decisive: true,
      estimate: (self, target) => evaluate(huntDamage, self, target),
    };
    const r2Spec: AbilitySpec = {
      key: "R2", name: `${r.name} (dash)`, slot: "R", cooldown: 0, castTime: r.castTime("Time before dashing to target"), budgetExcluded: true,
      usable: () => false,
      onCastStart: [{ type: "cleanse", sticky: true }, { type: "state", state: "ccImmune", duration: r.castTime("Time before dashing to target") }],
      delivery: { kind: "dash", direction: "target", distance: r.field("range"), speed: dashSpeed, speedFor: (unit) => Number(unit.memory["briar:huntSpeed"] ?? dashSpeed), hitRadius: lands },
      onHit: [{ type: "damage", damageType: "magic", amount: huntDamage }],
      flags: { knockdown: false, spellShield: true, grounded: false },
    };
    const abilities = [qSpec, wSpec, w2Spec, eSpec, rSpec, r2Spec];

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      if (frenzied(self, world.tick)) {
        // Forced to attack: no walking away, only spells that keep her on the enemy.
        if (canCast(world, self, w2Spec)) return { kind: "cast", ability: "W2" };
        if (canCast(world, self, qSpec)) return { kind: "cast", ability: "Q" };
        if (!hematomania(self) && canCast(world, self, rSpec)) return { kind: "cast", ability: "R" };
        if (canStartAttack(world, self)) return { kind: "attack" };
        if (self.action) return undefined;
        return { kind: "move", direction: inAttackRange(self, view.enemy) ? 0 : 1 };
      }
      const decided = defaultBehavior(view);
      // Blood Frenzy would turn her back around: never a way out.
      if (decided?.kind === "cast" && decided.ability === "W" && (view.mode === "flee" || view.mode === "kite" || view.mode === "hold")) return { kind: "move", direction: view.mode === "hold" ? 0 : -1 };
      return decided;
    };

    return {
      abilities,
      behavior,
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") {
            const gap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.radius - ctx.enemy.spec.base.radius);
            ctx.memory["briar:rushSpeed"] = rushSpeeds ? seriesAt(rushSpeeds, gap, true) : 900;
          }
          if (ctx.ability.key === "E") {
            endFrenzy(ctx);
            ctx.memory["briar:chargeHeals"] = 0;
          }
          if (ctx.ability.key === "R2") {
            const gap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - lands);
            ctx.memory["briar:huntSpeed"] = Math.min(dashSpeed * 2, Math.max(dashSpeed, gap / idealDash));
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "E" || key === "R2") applyBleed(ctx, ctx.scale);
          if (key === "R" && ctx.enemy.petId === undefined) {
            // The prey: marked and revealed, and Briar starts the second cast at once.
            ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s.memoKey !== "briar:mark");
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "revealed", duration: FOREVER }, { scale: 1, ability: rSpec });
            const mark = ctx.enemy.statuses.findLast((s) => s.kind === "state" && s.key === "revealed" && s.source === ctx.self.side);
            if (mark) mark.memoKey = "briar:mark";
            ctx.memory["briar:prey"] = true;
            if (ctx.self.alive) startCast(ctx.world, ctx.self, r2Spec);
          }
          if (key === "R2") {
            // Hematomania: Blood Frenzy's effects for as long as the mark holds.
            ctx.memory["briar:hema"] = ctx.memory["briar:prey"] === true;
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "W" && !ctx.interrupted) {
            const near = Math.abs(ctx.enemy.x - ctx.self.x) <= frenzyRadius + ctx.enemy.spec.base.radius && ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self);
            if (near) {
              ctx.memory["briar:frenzyUntil"] = ctx.tick + ticks(frenzySeconds);
              ctx.memory["briar:snack"] = true;
              frenzyStates(ctx, frenzySeconds);
              ctx.self.attackReadyTick = ctx.tick;
            }
          }
          if (ctx.ability.key === "R2") ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "briar:hunt");
        },
        onCast(ctx) {
          if (ctx.ability.key === "W2") ctx.memory["briar:snack"] = false;
          // A full charge heals four times, the last as the scream goes out.
          if (ctx.ability.key === "E") chargeHeals(ctx, Math.round(chargeSeconds / chargeHealEvery));
          if (ctx.ability.key === "R2") {
            ctx.apply({ type: "state", state: "displacementImmune", duration: FOREVER }, true);
            const immune = ctx.self.statuses.findLast((s) => s.kind === "state" && s.key === "displacementImmune" && s.startTick === ctx.tick);
            if (immune) immune.memoKey = "briar:hunt";
          }
        },
        onAttack(ctx) {
          if (frenzied(ctx.self, ctx.tick)) ctx.action.uncancellable = true;
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) applyBleed(ctx, ctx.scale);
        },
        onDamageDealt(ctx) {
          // Crimson Curse heals for 25% of its damage before mitigation; Snack Attack for 40% of its damage after.
          if (ctx.persistent && ctx.ability === BLEED && ctx.raw > 0) ctx.apply({ type: "heal", amount: { base: bleedHeal * ctx.raw } }, true);
          if (ctx.ability === snack.name && ctx.mitigated > 0) ctx.apply({ type: "heal", amount: { base: snackHeal * ctx.mitigated } }, true);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Briar's healing grows with her missing health (and bonus health).
          const missing = missingShare(self) * 100;
          const bonusHealth = Math.max(0, derive(self).maxHp - self.spec.base.hp);
          const amp = (seriesAt(ampByMissing, missing, true) + seriesAt(ampPerHealth, missing, true) * (bonusHealth / 100)) / 100;
          ctx.buff("briar:amp", "healingIncrease", amp, 1);
          // Chilling Scream's charge heals her every 0.25 s.
          if (self.action?.kind === "cast" && self.action.ability === "E") chargeHeals(ctx, Math.floor((ctx.tick - self.action.startTick) / (30 * chargeHealEvery) + 1e-9));
          // Blood Frenzy ends with its time or without a valid target nearby; Hematomania with its mark.
          const until = frenzyEnd(self);
          const valid = ctx.enemy.alive && !isUntargetable(ctx.enemy, self) && Math.abs(ctx.enemy.x - self.x) <= frenzyRadius + ctx.enemy.spec.base.radius;
          if (hematomania(self)) {
            if (!ctx.enemy.alive || !ctx.enemy.statuses.some((s) => s.memoKey === "briar:mark")) endFrenzy(ctx);
            else {
              const ad = derive(self).ad;
              ctx.buff("briar:frenzyAS", "attackSpeed", frenzyAS, 1);
              ctx.buff("briar:frenzyMS", "moveSpeedPercent", frenzyMS, 1);
              ctx.buff("briar:hemaArmor", "armor", hemaResists * ad, 1);
              ctx.buff("briar:hemaMR", "MR", hemaResists * ad, 1);
              ctx.buff("briar:hemaLS", "lifeSteal", hemaLifeSteal, 1);
              ctx.buff("briar:hemaMS", "moveSpeedPercent", hemaMS, 1);
              if (!self.statuses.some((s) => s.memoKey === "briar:ghost" && s.endTick > ctx.tick)) frenzyStates(ctx, 1);
            }
          } else if (until > 0 && (ctx.tick >= until || !valid)) endFrenzy(ctx);
          if (!frenzied(self, ctx.tick)) self.statuses = self.statuses.filter((s) => !(s.kind === "empower" && s.key === "W2"));
        },
      },
      budget: {
        damage(self, target) {
          const most = evaluate(bleedBase, self, target) * (1 + perStack * (maxStacks - 1));
          return { physical: most / bleedSeconds };
        },
        healing(self, target) {
          return (bleedHeal * evaluate(bleedBase, self, target) * (1 + perStack * (maxStacks - 1))) / bleedSeconds;
        },
      },
    };
  },
};

export default briar;
