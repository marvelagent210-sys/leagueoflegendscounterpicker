/**
 * Pyke (patch 26.20): his bonus health becomes attack damage; Bone Skewer thrusts up close or,
 * charged, hooks from afar; Phantom Undertow leaves a phantom that returns to stun; Ghostwater
 * Dive speeds him away; Death from Below executes an enemy below its threshold.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, resolveSkillshot } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, scaled, seriesAt, ticks } from "./util";

const pyke: KitModule = {
  champion: "Pyke",
  build(kit) {
    const p = kit.ability("Gift of the Drowned Ones");
    const q = kit.ability("Bone Skewer");
    const w = kit.ability("Ghostwater Dive");
    const e = kit.ability("Phantom Undertow");
    const r = kit.ability("Death from Below");

    // Gift of the Drowned Ones: no bonus health, 1 bonus AD per 14 instead.
    const perAD = p.quoted("instead he gains 1 bonus attack damage per 14 bonus health", 1);
    p.quote("Pyke's maximum health cannot increase except through growth (per level)");
    p.quote("While Pyke is not visible to enemies, he rapidly consumes his grey health to heal for the same amount.");
    kit.assume("Pyke stays in sight of the enemy throughout a duel (Ghostwater Dive's camouflage doesn't hide him at fighting range), so his grey health never turns into healing and is left out.");

    // Bone Skewer: a thrust within 400 when released in 0.4 s; charged up to 1 s, a harpoon of up to 1100 that pulls and slows by 90%.
    const skewer = q.formula("Physical Damage");
    const reachSeries = q.record.fields.targetRange && typeof q.record.fields.targetRange === "object" ? q.record.fields.targetRange.values[0]?.series : undefined;
    const [thrustRange = 400] = q.fieldNumbers("targetRange");
    const quick = q.quoted("Releasing the ability within 0.4 seconds causes Pyke to instead thrust his blade in the target direction", 0);
    const chargeSlow = q.quoted("Pyke charges while being slowed by 20% for up to 3 seconds to increase Bone Skewer's range over the first second of the channel", 0) / 100;
    // Its range grows over the first second of the channel: the series' last point.
    const fullCharge = reachSeries?.kind === "variable" ? Number(reachSeries.points.at(-1) ?? 1) : 1;
    const hookSlow = q.quoted("pulling them, during which they are also revealed, then slowing them by 90% for 1 second", 0) / 100;
    const hookSlowSeconds = q.quoted("pulling them, during which they are also revealed, then slowing them by 90% for 1 second", 1);
    const hookWidth = q.field("width", "Harpoon missile");
    const thrustWidth = q.field("width", "Thrust hitbox");
    const pull = q.field("effectRadius", "Pull range");
    q.quote("Bone Skewer's mana cost is also refunded if it hits an enemy champion.");
    q.quote("becoming unable to act while it is in flight");
    const hookSpeed = 2000;
    kit.assume(`The harpoon flies at ${hookSpeed} (the game files' missile speed) and pulls its target ${pull} units toward Pyke, no farther than his side.`);
    const reachAt = (seconds: number) => (reachSeries ? seriesAt(reachSeries, seconds, true) : thrustRange);

    // Ghostwater Dive: 45% (+ 2% per lethality) movement speed decaying over 5 s; attacking or casting ends it.
    const diveWords = "Pyke submerges into water for 5 seconds, entering camouflage and gaining 45% (+ 2% per 1 Lethality) bonus movement speed that decays over the duration.";
    const diveSeconds = w.quoted(diveWords, 0);
    const diveSpeed = w.quoted(diveWords, 1) / 100;
    const divePerLethality = w.quoted(diveWords, 2) / 100;
    w.quote("Attacking or casting abilities ends Ghostwater Dive immediately.");

    // Phantom Undertow: a 550 dash; 1 s later the phantom returns, stunning for 1.25 (+ 0.1 per 10 lethality) s and dealing 300 (+ 100% bonus AD).
    const dash = e.field("targetRange");
    const phantomSpeed = e.field("speed");
    const phantomReach = e.field("width") / 2;
    const stunWords = "the Phantom homes back to Pyke to stun enemies around it and those it passes through along the way for 1.25 (+ 0.1 per 10 Lethality) seconds";
    const phantomDelay = e.quoted("After 1 second, the Phantom homes back to Pyke", 0);
    const stun = e.quoted(stunWords, 0);
    const stunPerLethality = e.quoted(stunWords, 1) / e.quoted(stunWords, 2);
    const phantom = e.formula("Physical Damage");
    e.quote("Pyke is ghosted while the Phantom is active.");

    // Death from Below: an X that executes a champion below 550 (+ 80% bonus AD) (+ 1.5 per lethality), or deals half that.
    const executeWords = "executing enemy champions within the area that are below 250 / 290 / 330 / 370 / 400 / 430 / 450 / 470 / 490 / 510 / 530 / 540 / 550 (based on level) (+ 80% bonus AD) (+ 1.5 per 1 Lethality) health";
    const threshold: Formula = { base: r.levelValue(executeWords, 0), ratios: { bonusAD: r.quoted(executeWords, 13) / 100, lethality: r.quoted(executeWords, 14) } };
    const half = r.quoted("Other enemies hit and enemy champions above the threshold are instead dealt 50% of the amount as physical damage.", 0) / 100;
    r.quote("If Death from Below hits an enemy champion or at least one is killed inside the X by the execution or an ally, Pyke will blink to the center of the X.");
    r.quote("Spell shield does not prevent Pyke from blinking.");
    const xReach = 200;
    kit.assume(`Death from Below's X reaches ${xReach} units along the duel's line (its 125 center circle and 282.5-long arms at 45°).`);

    const lethality = (unit: Unit) => derive(unit).lethality;
    const diving = (unit: Unit, tick: number) => tick < Number(unit.memory["pyke:diveUntil"] ?? -1);
    const endDive = (ctx: HookContext) => { ctx.memory["pyke:diveUntil"] = -1; ctx.buff("pyke:dive", "moveSpeedPercent", 0, 0); };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: thrustRange, width: thrustWidth },
      onHit: [{ type: "damage", damageType: "physical", amount: skewer }],
      flags: { spellShield: true },
    };
    const qcSpec: AbilitySpec = {
      key: "QC", name: `${q.name} (harpoon)`, slot: "Q", cooldown: q.cooldown(), cooldownKey: "Q", cost: q.cost(), castTime: fullCharge,
      castTimeFor: (unit) => Number(unit.memory["pyke:charge"] ?? fullCharge),
      moveWhileCasting: true,
      delivery: { kind: "line", range: reachAt(fullCharge), width: hookWidth, speed: hookSpeed },
      onHit: [
        { type: "damage", damageType: "physical", amount: skewer },
        { type: "displace", direction: "toward", distance: pull, duration: pull / hookSpeed, to: 0 },
        { type: "delayed", delay: pull / hookSpeed, effects: [{ type: "cc", cc: "slow", strength: hookSlow, duration: hookSlowSeconds }] },
      ],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      usable: (unit, world) => Math.abs(world.units[unit.side === 0 ? 1 : 0].x - unit.x) > thrustRange,
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: 0,
      delivery: { kind: "self" },
      roles: ["escape"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: 0,
      delivery: { kind: "dash", direction: "toward", distance: dash, speed: phantomSpeed, through: true, minDistance: 0 },
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["cc", "engage", "damage"],
      estimate: (self, target) => evaluate(phantom, self, target),
      estimateDelay: () => phantomDelay,
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "circle", range: r.field("targetRange"), radius: xReach, delay: 0 },
      onHit: [{ type: "execute", threshold }],
      flags: { spellShield: true, grounded: true },
      roles: ["finisher", "damage"],
      estimate: (self, target) => target.hp <= evaluate(threshold, self, target) ? target.hp : half * evaluate(threshold, self, target),
    };
    const abilities = [qSpec, qcSpec, wSpec, eSpec, rSpec];

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      const gap = Math.abs(view.enemy.x - self.x) - view.enemy.spec.base.radius;
      // Death from Below the moment the enemy is below its threshold.
      if (view.mode !== "idle" && canCast(world, self, rSpec) && view.enemy.hp <= evaluate(threshold, self, view.enemy) && Math.abs(view.enemy.x - self.x) <= r.field("targetRange") + xReach) return { kind: "cast", ability: "R" };
      // Ghostwater Dive to get away: its speed comes from a hook, so it is decided here.
      if ((view.mode === "flee" || view.mode === "kite") && canCast(world, self, wSpec) && !diving(self, world.tick)) return { kind: "cast", ability: "W" };
      // The harpoon is charged just long enough to reach the enemy.
      if ((view.mode === "fight" || view.mode === "trade") && canCast(world, self, qcSpec) && gap > thrustRange && gap <= reachAt(fullCharge)) {
        let seconds = quick;
        while (seconds < fullCharge && reachAt(seconds) < gap + 30) seconds += 1 / 30;
        self.memory["pyke:charge"] = Math.min(fullCharge, seconds);
        return { kind: "cast", ability: "QC" };
      }
      const decided = defaultBehavior(view);
      if (decided?.kind === "cast" && decided.ability === "E" && !decided.aim) return { ...decided, aim: { direction: view.mode === "flee" || view.mode === "kite" ? -1 : 1, distance: dash } };
      return decided;
    };

    return {
      abilities,
      behavior,
      hooks: {
        onStart(ctx) {
          // Bonus health becomes attack damage.
          const bonusHealth = Math.max(0, derive(ctx.self).maxHp - ctx.self.spec.base.hp);
          if (bonusHealth > 0) {
            ctx.buff("pyke:noHealth", "health", -bonusHealth, FOREVER);
            ctx.buff("pyke:healthAD", "AD", bonusHealth / perAD, FOREVER);
            ctx.self.hp = derive(ctx.self).maxHp;
          }
        },
        onCastStart(ctx) {
          if (diving(ctx.self, ctx.tick) && ctx.ability.key !== "W") endDive(ctx);
          if (ctx.ability.key === "QC") ctx.buff("pyke:charging", "moveSpeedPercent", -chargeSlow, Number(ctx.memory["pyke:charge"] ?? fullCharge));
          if (ctx.ability.key === "E") ctx.memory["pyke:phantomFrom"] = ctx.self.x;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "QC") {
            ctx.buff("pyke:charging", "moveSpeedPercent", 0, 0);
            const flight = Math.min(reachAt(Number(ctx.memory["pyke:charge"] ?? fullCharge)), Math.abs(ctx.enemy.x - ctx.self.x)) / hookSpeed;
            for (const state of ["noMovement", "noAttacks"] as const) ctx.apply({ type: "state", state, duration: flight }, true);
          }
          if (key === "W") {
            ctx.memory["pyke:diveStart"] = ctx.tick;
            ctx.memory["pyke:diveUntil"] = ctx.tick + ticks(diveSeconds);
          }
          if (key === "E") {
            ctx.apply({ type: "state", state: "ghosted", duration: phantomDelay + 0.3 }, true);
            ctx.memory["pyke:phantomAt"] = ctx.tick + ticks(phantomDelay);
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "E") return;
          ctx.memory["pyke:phantomTo"] = ctx.self.x;
        },
        onAbilityContact(ctx) {
          // Death from Below: executed below the threshold, half of it above.
          if (ctx.ability.key !== "R" || ctx.enemy.petId !== undefined) return undefined;
          const bar = evaluate(threshold, ctx.self, ctx.enemy);
          return ctx.enemy.hp <= bar ? [...ctx.effects] : [{ type: "damage", damageType: "physical", amount: { base: half * bar }, label: r.name }];
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          if (ctx.ability.key === "QC") ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + Number(ctx.ability.cost ?? 0));
          if (ctx.ability.key === "R") {
            const from = ctx.self.x;
            ctx.self.x = ctx.enemy.x - directionTo(ctx.self, ctx.enemy) * (ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius);
            notifyActualMovement(ctx.world, ctx.self, from, { kind: "blink", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "R" });
          }
        },
        onAttack(ctx) { if (diving(ctx.self, ctx.tick)) endDive(ctx); },
        onTick(ctx) {
          const self = ctx.self;
          // Ghostwater Dive's speed decays over its duration.
          if (diving(self, ctx.tick)) {
            const share = 1 - (ctx.tick - Number(ctx.memory["pyke:diveStart"])) / ticks(diveSeconds);
            ctx.buff("pyke:dive", "moveSpeedPercent", (diveSpeed + divePerLethality * lethality(self)) * Math.max(0, share), 0.1);
          } else if (ctx.memory["pyke:diveUntil"] !== undefined) { endDive(ctx); delete ctx.memory["pyke:diveUntil"]; }
          // The phantom returns along Pyke's dash, stunning and hurting the enemy in its path.
          if (ctx.memory["pyke:phantomAt"] !== undefined && ctx.tick >= Number(ctx.memory["pyke:phantomAt"])) {
            delete ctx.memory["pyke:phantomAt"];
            const from = Number(ctx.memory["pyke:phantomFrom"] ?? self.x);
            const to = self.x;
            const span = Math.abs(to - from);
            const decision = resolveSkillshot(ctx.world, self, ctx.enemy, eSpec, ctx.tick - ticks(phantomDelay), phantomDelay + span / phantomSpeed, phantomReach);
            const zone = { id: ctx.world.nextId++, owner: self.side, kind: "delayedArea" as const, seenTick: ctx.tick - ticks(phantomDelay), x: (from + to) / 2, radius: span / 2 + phantomReach, startTick: ctx.tick, endTick: ctx.tick + Math.max(1, ticks(span / phantomSpeed)), ability: "E", onHit: [{ type: "damage", damageType: "physical", amount: phantom }, { type: "cc", cc: "stun", duration: stun + stunPerLethality * lethality(self) }] as Effect[], connects: decision.connects, scale: decision.scale, centered: true };
            ctx.world.zones.push(zone);
            if (decision.split !== undefined) ctx.queueSplit({ zone: zone.id, chance: decision.split });
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { physical: evaluate(phantom, self, target) / (eSpec.cooldown / haste) };
        },
        statMultipliers: { hp: 0 },
      },
    };
  },
};

export default pyke;
