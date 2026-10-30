/**
 * Kayn (patch 26.20): by level 20 both of his forms are unlocked, so he fights as whichever
 * suits the matchup: Darkin Slayer (Rhaast) heals from his spells' physical damage and knocks
 * up with Blade's Reach; Shadow Assassin amplifies his first seconds of combat and strikes from
 * farther. Umbral Trespass hides him inside a recently damaged enemy.
 */
import type { KitModule } from "../../engine/kits/compile";
import { resolveSkillshot } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, directionTo, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const SLAYER = 0;
const ASSASSIN = 1;
const EPS = 1e-6;

const kayn: KitModule = {
  champion: "Kayn",
  options: {
    form: { label: "Form at level 20 (-1 tries both, as both are unlocked by then; 0 Darkin Slayer, 1 Shadow Assassin)", default: -1 },
  },
  variants(options) {
    return (options.form ?? -1) >= 0 ? [] : [{ form: SLAYER }, { form: ASSASSIN }];
  },
  build(kit, options) {
    const form = (options.form ?? -1) === ASSASSIN ? ASSASSIN : SLAYER;
    const assassin = form === ASSASSIN;
    const p = kit.ability("Template:Data Kayn/The Darkin Scythe");
    const q = kit.ability("Reaping Slash");
    const w = kit.ability("Blade's Reach");
    const e = kit.ability("Shadow Step");
    const r = kit.ability("Umbral Trespass");

    // The Darkin Scythe: both forms are open by level 20.
    p.quote("Once he has earned enough orbs, he unlocks a form based on whether he earned more from melee or ranged champions (for Darkin Slayer and Shadow Assassin, respectively), with the other form unlocked later.");
    const slayerHeal = p.quoted("Darkin Slayer Bonus: Rhaast heals for 25% (+ 0.5% per 100 bonus health) of the post-mitigation physical damage that he deals to enemy champions with his abilities.", 0) / 100;
    const slayerHealPerHealth = p.quoted("Darkin Slayer Bonus: Rhaast heals for 25% (+ 0.5% per 100 bonus health)", 1) / 100 / 100;
    const ampShare = p.levelValue("Shadow Assassin Bonus: Upon entering combat with enemy champions", 0) / 100;
    const ampWords = "Kayn becomes empowered for 3 seconds to deal 20 – 40 (based on level)% of post-mitigation physical and magic damage dealt against enemy champions as bonus magic damage. This effect cannot trigger again until Kayn has been out of combat with champions for over 8 seconds";
    const ampSeconds = p.quoted(ampWords, 0);
    const ampRest = p.quoted(ampWords, 3);
    p.quote("The Shadow Assassin Bonus will not be triggered nor have its out-of-combat timer be refreshed if Kayn deals true damage.");
    p.quote("If the Shadow Assassin Bonus is granted by Kayn dealing damage, the triggering instance of damage will benefit from the bonus.");
    kit.assume(`Kayn fights as ${assassin ? "the Shadow Assassin" : "the Darkin Slayer"}: both forms are unlocked by level 20, and the duel tries each. Shadow Step's terrain (its heal, its 70% speed and vision inside walls) is left out: it is a 1.5 s burst of speed in a fight.`);

    // Reaping Slash: a 350 dash through the enemy, then a swing within 300, each for 195 (+ 85% bonus AD);
    // as Rhaast, 65% AD (+ 6% (+ 3.5% per 100 bonus AD) of maximum health) each.
    const slashDash = q.field("targetRange");
    const slashBase = q.formula("Physical Damage");
    const slayerWords = "Reaping Slash's damage is modified to deal 65% AD (+ 6% (+ 3.5% per 100 bonus AD) of the target's maximum health) physical damage with each hit";
    const slayerSlash: Formula = { base: 0, ratios: { AD: q.quoted(slayerWords, 0) / 100, targetMaxHP: q.quoted(slayerWords, 1) / 100 }, products: [{ ratio: q.quoted(slayerWords, 2) / 100 / q.quoted(slayerWords, 3), stats: ["bonusAD", "targetMaxHP"] }] };
    const slash = assassin ? slashBase : slayerSlash;
    q.quote("Reaping Slash's dash speed is increased by Kayn's bonus movement speed.");
    q.quote("Spell shields will block only a single instance of damage - either the dash or the slash.");
    q.quote("If the dash is interrupted, Kayn will not swing his scythe.");
    const swingLock = q.quoted("The swing's animation has a 0.25-second lockout time.", 0);
    const swingRadius = 300;
    const slashSpeed = 1200;
    kit.assume(`Reaping Slash's dash moves at ${slashSpeed} plus Kayn's bonus movement speed (the base is unsourced) and its swing reaches ${swingRadius} (the game files' AoERadius).`);

    // Blade's Reach: 265 (+ 110% bonus AD) and a 90% slow decaying over 1.5 s; Rhaast's knocks up for 1 s after a 0.55 s cast,
    // the Shadow Assassin's reaches 900 and is swept by a shadow over 0.55 s with no cast time.
    const reach = assassin ? w.field("targetRange", "Enhanced range for Shadow Assassin") : w.field("targetRange", "Standard range");
    const sweep = w.castTime("Cast time for Kayn and Darkin Slayer");
    const bladeWords = "slowing them by 90% decaying over 1.5 seconds";
    const bladeSlow = w.quoted(bladeWords, 0) / 100;
    const bladeSlowSeconds = w.quoted(bladeWords, 1);
    w.quote("Darkin Slayer Bonus: Blade's Reach knocks up enemies hit for 1 second.");
    w.quote("Kayn conjures an untargetable shadow at the casting position to perform Blade's Reach's sweep over 0.55 seconds in his stead, removing the ability's cast time.");
    w.quote("This ability will cast from wherever the caster is at the start of the cast time.");
    const bladeWidth = 175;
    kit.assume(`Blade's Reach is ${bladeWidth} wide (the game files' line width); its decaying slow counts as half its strength throughout.`);
    const bladeDamage = w.formula("Physical Damage");
    const bladeHit: Effect[] = [
      { type: "damage", damageType: "physical", amount: bladeDamage },
      { type: "cc", cc: "slow", strength: bladeSlow / 2, duration: bladeSlowSeconds },
      ...(assassin ? [] : [{ type: "displace" as const, direction: "away" as const, distance: 0, duration: w.quoted("Darkin Slayer Bonus: Blade's Reach knocks up enemies hit for 1 second.", 0) }]),
    ];

    // Shadow Step: 40% movement speed and ghosting, 1.5 s in a fight.
    const stepSpeed = e.quoted("Kayn gains 40% bonus total movement speed, ghosting and the ability to ignore terrain collision for a duration", 0) / 100;
    const stepFight = e.quoted("If he has been in combat with enemy champions within the last 3 seconds, Shadow Step will instead last 1.5 seconds.", 1);
    const stepCooldown = assassin ? e.quoted("Shadow Assassin Bonus: Shadow Step's cooldown is reduced to 10 seconds at all ranks.", 0) : e.cooldown();
    e.quote("will cancel immediately if Kayn performs a basic attack or becomes immobilized or polymorphed");

    // Umbral Trespass: onto an enemy he damaged in the last 3.15 s, hidden inside it for up to 2.5 s, then out for 350 (+ 150% bonus AD),
    // as Rhaast 15% (+ 10% per 100 bonus AD) of its maximum health, healing 11.25% (+ 7.5% per 100 bonus AD) of it.
    const markSeconds = r.quoted("Kayn marks enemy champions he damaged in the last 3.15 seconds.", 0);
    const rRange = assassin ? r.field("targetRange", "Enhanced cast range for Shadow Assassin") : r.field("targetRange", "Standard cast range");
    const inWords = "Kayn vanishes and dashes to a marked enemy champion over 0.25 seconds, attaching himself to them at the end of the dash. After 0.5 seconds of his arrival, he channels for up to 2 seconds";
    const rDash = r.quoted(inWords, 0);
    const rSettle = r.quoted(inWords, 1);
    const rChannel = r.quoted(inWords, 2);
    const outDelay = r.quoted("Recast: After a delay of 0.5 seconds to 0.75 seconds, Kayn deals physical damage to the target", 0);
    const [standardOut = 300] = r.fieldNumbers("effectRadius");
    const emerge = assassin ? 500 : standardOut;
    r.quote("If Umbral Trespass is targeted on an enemy with a spell shield or a Fiora with her Riposte active, the ability will fail to cast entirely, being placed on full cooldown");
    r.quote("Spell shield will not block the damage from the recast.");
    r.quote("Shadow Assassin Bonus: Umbral Trespass gains 200 bonus cast range and emerge range. Additionally, emerging will reset The Darkin Scythe's cooldown.");
    const rSlayerWords = "Darkin Slayer Bonus: Umbral Trespass is modified to deal physical damage equal to 15% (+ 10% per 100 bonus AD) of the target's maximum health, and also heals Rhaast for 11.25% (+ 7.5% per 100 bonus AD) of the target's maximum health after the recast's delay.";
    const rDamage: Formula = assassin ? r.formula("Physical Damage") : { base: 0, ratios: { targetMaxHP: r.quoted(rSlayerWords, 0) / 100 }, products: [{ ratio: r.quoted(rSlayerWords, 1) / 100 / r.quoted(rSlayerWords, 2), stats: ["bonusAD", "targetMaxHP"] }] };
    const rHeal: Formula | undefined = assassin ? undefined : { base: 0, ratios: { targetMaxHP: r.quoted(rSlayerWords, 3) / 100 }, products: [{ ratio: r.quoted(rSlayerWords, 4) / 100 / r.quoted(rSlayerWords, 5), stats: ["bonusAD", "targetMaxHP"] }] };
    kit.assume(`Kayn stays inside his target for the whole ${rChannel} s channel, then emerges ${emerge} units back toward where he came from, ${outDelay} s after the recast.`);

    const marked = (unit: Unit, tick: number) => tick < Number(unit.memory["kayn:markUntil"] ?? -1);
    const inside = (unit: Unit, tick: number) => tick < Number(unit.memory["kayn:insideUntil"] ?? -1);

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: 0,
      delivery: { kind: "dash", direction: "toward", distance: slashDash, speed: slashSpeed, speedFor: (unit) => slashSpeed + Math.max(0, derive(unit).moveSpeed - unit.spec.base.moveSpeed), through: true, hitRadius: 100, minDistance: 0 },
      onHit: [{ type: "damage", damageType: "physical", amount: slash }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["damage", "engage"],
      estimate: (self, target) => 2 * evaluate(slash, self, target),
      usable: (unit, world) => !inside(unit, world.tick),
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: assassin ? 0 : sweep, castOrigin: "start",
      delivery: assassin ? { kind: "self" } : { kind: "line", range: reach, width: bladeWidth },
      onHit: assassin ? [] : bladeHit,
      flags: { spellShield: true },
      roles: assassin ? ["damage", "cc"] : undefined,
      estimate: assassin ? (self, target) => evaluate(bladeDamage, self, target) : undefined,
      usable: (unit, world) => !inside(unit, world.tick) && (!assassin || Math.abs(world.units[unit.side === 0 ? 1 : 0].x - unit.x) <= reach),
      decisive: !assassin,
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: stepCooldown, cost: e.cost(), castTime: 0,
      delivery: { kind: "self" },
      onSelf: [{ type: "stat", stat: "moveSpeedMultiplier", amount: { base: stepSpeed }, duration: stepFight }, { type: "state", state: "ghosted", duration: stepFight }],
      roles: ["escape", "engage"],
      usable: (unit, world) => !inside(unit, world.tick),
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: 0,
      delivery: { kind: "target", range: rRange },
      onHit: [],
      flags: { spellShield: false },
      roles: ["damage", "defense"],
      estimate: (self, target) => evaluate(rDamage, self, target),
      usable: (unit, world) => marked(unit, world.tick),
    };
    const abilities = [qSpec, wSpec, eSpec, rSpec];

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      if (inside(self, world.tick) || self.memory["kayn:outAt"] !== undefined) return undefined;
      return defaultBehavior(view);
    };

    // Shadow Assassin: the amplified damage, triggered by entering combat.
    const amplify = (ctx: HookContext, mitigated: number, damageType: string) => {
      if (!assassin || damageType === "true") return;
      const active = ctx.tick < Number(ctx.memory["kayn:ampUntil"] ?? -1);
      const rested = ctx.memory["kayn:ampReady"] !== false || ctx.tick - Number(ctx.memory["kayn:combat"] ?? -1e9) > ticks(ampRest);
      if (!active && rested) {
        ctx.memory["kayn:ampUntil"] = ctx.tick + ticks(ampSeconds);
        ctx.memory["kayn:ampReady"] = false;
      }
      if (ctx.tick < Number(ctx.memory["kayn:ampUntil"] ?? -1) && mitigated > 0) {
        applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: { base: ampShare * mitigated }, label: "The Darkin Scythe" }, { scale: 1 });
      }
    };

    return {
      abilities,
      behavior,
      hooks: {
        onStart(ctx) { ctx.memory["kayn:ampReady"] = true; },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W" && assassin) {
            // The shadow sweeps from where Kayn stood, 0.55 s later.
            const dir = directionTo(ctx.self, ctx.enemy);
            const decision = resolveSkillshot(ctx.world, ctx.self, ctx.enemy, wSpec, ctx.tick, sweep, bladeWidth / 2);
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, seenTick: ctx.tick, x: ctx.self.x + (dir * reach) / 2, radius: reach / 2, startTick: ctx.tick, endTick: ctx.tick + ticks(sweep), ability: "W", onHit: bladeHit, connects: decision.connects, scale: decision.scale };
            ctx.world.zones.push(zone);
            if (decision.split !== undefined) ctx.queueSplit({ zone: zone.id, chance: decision.split });
          }
          if (key === "R") {
            // A spell shield or a parry on the target spoils the whole cast.
            if (hasState(ctx.enemy, "spellShield") || hasState(ctx.enemy, "parry")) { ctx.log("Umbral Trespass fails"); return; }
            const from = ctx.self.x;
            ctx.memory["kayn:enteredFrom"] = from;
            ctx.memory["kayn:insideUntil"] = ctx.tick + ticks(rDash + rSettle + rChannel);
            for (const state of ["untargetable", "noMovement", "noAttacks", "displacementImmune"] as const) {
              ctx.apply({ type: "state", state, duration: rDash + rSettle + rChannel + outDelay }, true);
              const made = ctx.self.statuses.findLast((s) => s.kind === "state" && s.key === state && s.startTick === ctx.tick);
              if (made) made.memoKey = "kayn:inside";
            }
            ctx.memory["kayn:attachAt"] = ctx.tick + ticks(rDash);
          }
          if (key === "E") ctx.memory["kayn:stepping"] = true;
        },
        onAbilityHit(ctx) {
          // Reaping Slash: the swing follows the dash.
          if (ctx.ability.key === "Q" && ctx.memory["kayn:swinging"] !== true) ctx.memory["kayn:swingDue"] = true;
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "Q") return;
          if (!ctx.interrupted && ctx.enemy.alive && Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= swingRadius + EPS) {
            ctx.memory["kayn:swinging"] = true;
            abilityHit(ctx.world, ctx.self, ctx.enemy, qSpec, [{ type: "damage", damageType: "physical", amount: slash, label: `${q.name} (swing)` }]);
            ctx.memory["kayn:swinging"] = false;
          }
          for (const state of ["noMovement", "noAttacks"] as const) ctx.apply({ type: "state", state, duration: swingLock }, true);
        },
        onAttack(ctx) {
          // A basic attack ends Shadow Step.
          if (ctx.memory["kayn:stepping"] === true) {
            ctx.memory["kayn:stepping"] = false;
            ctx.self.statuses = ctx.self.statuses.filter((s) => s.ability !== "E");
          }
        },
        onDamageDealt(ctx) {
          if (ctx.ability === "The Darkin Scythe" || ctx.ability === "Darkin Slayer") return;
          ctx.memory["kayn:markUntil"] = ctx.tick + ticks(markSeconds);
          if (ctx.damageType !== "true") ctx.memory["kayn:combat"] = ctx.tick;
          amplify(ctx, ctx.mitigated, ctx.damageType);
          // Darkin Slayer: his spells' physical damage heals him.
          if (!assassin && !ctx.attack && ctx.damageType === "physical" && ctx.mitigated > 0) {
            const bonusHealth = Math.max(0, derive(ctx.self).maxHp - ctx.self.spec.base.hp);
            ctx.apply({ type: "heal", amount: { base: (slayerHeal + slayerHealPerHealth * bonusHealth) * ctx.mitigated } }, true);
          }
        },
        onDamageTaken(ctx) {
          if (ctx.amount > 0) ctx.memory["kayn:combat"] = ctx.tick;
        },
        onTick(ctx) {
          const self = ctx.self;
          const enemy = ctx.enemy;
          // Inside the enemy: attached, then out at the end of the channel.
          if (ctx.memory["kayn:attachAt"] !== undefined && ctx.tick >= Number(ctx.memory["kayn:attachAt"])) {
            if (inside(self, ctx.tick)) {
              const from = self.x;
              self.x = enemy.x;
              if (Math.abs(from - self.x) > EPS) notifyActualMovement(ctx.world, self, from, { kind: "dash", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "R" });
            }
            if (!enemy.alive && inside(self, ctx.tick)) ctx.memory["kayn:insideUntil"] = ctx.tick;
          }
          if (ctx.memory["kayn:attachAt"] !== undefined && !inside(self, ctx.tick)) {
            delete ctx.memory["kayn:attachAt"];
            ctx.memory["kayn:outAt"] = ctx.tick + ticks(outDelay);
          }
          if (ctx.memory["kayn:outAt"] !== undefined && ctx.tick >= Number(ctx.memory["kayn:outAt"])) {
            delete ctx.memory["kayn:outAt"];
            if (enemy.alive) {
              // The recast's damage ignores spell shields.
              applyEffect(ctx.world, self, enemy, { type: "damage", damageType: "physical", amount: rDamage, label: r.name }, { scale: 1, ability: rSpec });
              if (rHeal) ctx.apply({ type: "heal", amount: { base: evaluate(rHeal, self, enemy) } }, true);
            }
            const back = Math.sign(Number(ctx.memory["kayn:enteredFrom"] ?? self.x) - enemy.x) || -directionTo(self, enemy);
            const from = self.x;
            self.x = enemy.x + back * emerge;
            notifyActualMovement(ctx.world, self, from, { kind: "dash", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "R" });
            self.statuses = self.statuses.filter((s) => s.memoKey !== "kayn:inside");
            // The Shadow Assassin emerges with The Darkin Scythe ready again.
            if (assassin) ctx.memory["kayn:ampReady"] = true;
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { physical: (2 * evaluate(slash, self, target)) / (qSpec.cooldown / haste) / 4 };
        },
        ...(assassin ? {} : { healing: (self: Unit, target: Unit) => (slayerHeal * 2 * evaluate(slash, self, target)) / (qSpec.cooldown / (1 + derive(self).abilityHaste / 100)) }),
      },
    };
  },
};

export default kayn;
