/** Evelynn's target-local marks, Demon Shade and delayed backwards Last Caress. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHitPet, canTarget, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { Status, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const evelynn: KitModule = {
  champion: "Evelynn",
  build(kit) {
    const p = kit.ability("Demon Shade"), q = kit.ability("Hate Spike"), w = kit.ability("Allure"), e = kit.ability("Whiplash"), ee = kit.ability("Empowered Whiplash"), r = kit.ability("Last Caress");
    const shadeWait = p.quoted("break stealth for 4 seconds");
    const shadeRWait = p.quoted("reduced to 1.25 seconds from casting Last Caress");
    const shadeHurtWait = p.quoted("places it on a 1.5-second static cooldown");
    const shadeCap = p.levelValue("While below 250 – 590 (based on level)");
    const shadeAp = p.quoted("(+ 250% AP) health") / 100;
    const shadeHeal = p.levelValue("heals herself for 15 – 150 (based on level)", 1);
    const shadeDetection = p.quoted("Detection Radius: 700");
    p.quoted("From level 6 onward");
    p.quote("cooldown incurs upon starting the attack windup");
    const qDamage = q.formula("Magic Damage"), qBonus = q.formula("Bonus Magic Damage");
    const qMarkSeconds = q.quoted("marking them for 4 seconds");
    const qMarks = q.quoted("next 3 basic attacks");
    const qStock = q.quoted("recast up to 3 times at no cost");
    const qSpacing = q.quoted("Barrage Cooldown: 0.5");
    const qCooldown = q.cooldown();
    const qRange = q.field("targetRange", "Dart range"), spikeRange = q.field("targetRange", "Spike range"), recastRange = q.field("effectRadius");
    const qWidth = q.field("width", "Dart width"), spikeWidth = q.field("width", "Spike width");
    const spikeObject = "Characters/Evelynn/Spells/EvelynnQAbility/EvelynnQLineMissile";
    const spikeSpeed = q.gameQuoted('"mInitialSpeed":3000.0', 0, spikeObject);
    const spikeAcceleration = q.gameQuoted('"mAcceleration":-4200.0', 0, spikeObject);
    const spikeFloor = q.gameQuoted('"mMinSpeed":800.0', 0, spikeObject);
    q.quote("The dart applies spell damage and the spikes deal area damage");
    q.quote("This ability will cast from wherever the caster is at the start of the cast time");
    q.quote("A nearby visible enemy is required to recast");
    const wSeconds = w.quoted("curse for 5 seconds");
    const wCharge = w.quoted("marked for at least 2.5 seconds");
    const wSlow = w.quoted("slowing them by 45% for 0.75 seconds", 0) / 100;
    const wSlowSeconds = w.quoted("slowing them by 45% for 0.75 seconds", 1);
    const wCharm = w.number("Charm Duration"), wReduction = w.fraction("Magic Resistance Reduction");
    const wReductionSeconds = w.quoted("magic resistance reduction for 4 seconds");
    const wCost = w.cost(), wCooldown = w.cooldown(), wRange = w.field("targetRange");
    w.quote("Casting Allure does not break Demon Shade nor its fade into it");
    w.quote("mark application on a target cannot be blocked by spell shield");
    w.quote("mark's consumption will not occur if the ability is blocked by a spell shield");
    w.quote("reduction will be applied to the attack or ability that triggers it");
    w.quote("Allure will restart its cooldown whenever the mark debuff is removed");
    const eDamage = e.formula("Magic Damage"), empoweredDamage = ee.formula("Empowered Magic Damage");
    const eMinimum = e.quoted("deals a minimum of 25");
    const eMonsterCap = e.quoted("capped at 450 against monsters");
    const eTrackingBreak = ee.quoted("2000 or more units away");
    const eSpeed = e.fraction("Bonus Movement Speed"), eSpeedSeconds = e.quoted("movement speed for 2 seconds");
    const eRange = e.field("targetRange"), eCooldown = e.cooldown(), eCost = e.cost(), eCast = e.castTime();
    e.quote("can be dodged and blocked but may not miss if Evelynn is blinded");
    ee.quote("can be blocked but cannot be dodged and/or missed if Evelynn is blinded");
    ee.quote("only applies on-hit effects to the primary target");
    ee.quote("will track the target if they change locations");
    const rDamage = r.formula("Magic Damage"), rEmpowered = r.formula("Empowered Damage");
    const rThreshold = r.quoted("below 30% of their maximum health") / 100;
    const rDelay = r.quoted("After 0.5 seconds");
    const rBack = r.quoted("blinks 700 units in the opposite direction");
    const rCast = r.castTime(), rRadius = r.field("effectRadius");
    r.quote("becoming untargetable at the start of the cast time");
    r.field("angle");

    kit.assume("The duel starts with no prepared Demon Shade, empowered Whiplash, Hate Spike mark or Allure. Demon Shade first arms after four seconds without a breaking action. Regeneration is evaluated each tick against the dynamic level-20 630 + 250% AP ceiling (the repository extrapolates the pinned level curve through level 20); health above that ceiling is never removed. Camouflage uses the actual observing champion and the pinned 700-unit detection radius.");
    kit.assume("Hate Spike recasts use the pinned game-file decelerating missile (3000 initial speed, -4200 acceleration, 800 floor), strike all actual contacts, and consume only marks on the contacted target. The initial dart does not consume the mark it creates. The one-dimensional policy prioritizes a visible champion in recast range, then a visible damageable pet; champion-only unit-targeted spells cannot be manually retargeted to pets by the current command interface.");
    kit.assume("Allure is applied at cast completion without a damaging projectile. The raw pin specifies the 0.25-second cast but no mark-delivery travel duration. Its mature MR reduction precedes the triggering packet independently of charm immunity. Mark removal restarts the pinned cooldown. Pets are not legal Allure targets unless their source explicitly classifies them as champions or qualifying monsters; this duel command interface targets the champion.");
    kit.assume("Empowered Whiplash uses an interruptible target-tracking dash with earliest-tick arrival: neither the exact wiki pin nor the versioned binary quantifies dash speed. The binary's generic missileSpeed is not treated as a dash-speed claim. It updates the actual target location at arrival; a relocation of at least the source's estimated 2000 units instead ends at the prior location. Invalid targets during the cast cancel without cost/cooldown; invalid targets after commitment stop the dash without damage. Path pets receive area damage without primary-target on-hits. Normal Whiplash is dodgeable; empowered Whiplash ignores dodge; both ignore blind and respect attack blocks, parry and spell shields.");
    kit.assume("Last Caress is a directed 500-unit interval on the one-dimensional line. It deals ordinary magic damage, with the 240% packet selected strictly below 30% health, never an execute. Its backwards blink follows the direction selected at declaration after the separate 0.5-second post-cast delay; untargetability and the movement lock end at that blink. The wiki's 500-unit radius is explicitly estimated. Terrain-specific blink relocation and lateral cone geometry are outside this model.");

    kit.assume("The ordinary policy reserves offensive Last Caress in hold and short-trade modes, preserves completed-trade retreat, and waits stationary for Allure in hold mode. Shared reactive defenses may still answer a real incoming threat.");

    const ownMark = (target: Unit, key: string, side: number, tick: number): Status | undefined => target.statuses.find((s) => s.kind === "mark" && s.key === key && s.source === side && s.endTick > tick);
    const clearShade = (ctx: HookContext, seconds: number) => {
      ctx.memory.shade = false;
      ctx.memory.shadeAt = Math.max(Number(ctx.memory.shadeAt ?? 0), ctx.tick + ticks(seconds));
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "camouflage" && s.source === ctx.self.side));
    };
    const restartAllure = (ctx: HookContext) => {
      ctx.self.cooldownReady.W = ctx.tick + ticks(cooldownAfterHaste(wCooldown, abilityHasteFor(ctx.self, { slot: "W" })));
      delete ctx.memory.allureTarget;
    };
    const persistTargetStatuses = (ctx: HookContext) => {
      if (ctx.enemy.petId === undefined) return;
      const pet = ctx.world.pets.find((candidate) => candidate.id === ctx.enemy.petId);
      if (pet) pet.statuses = ctx.enemy.statuses;
    };
    const consumeAllure = (ctx: HookContext): Effect[] => {
      const mark = ownMark(ctx.enemy, "allure", ctx.self.side, ctx.tick);
      if (!mark) return [];
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== mark);
      persistTargetStatuses(ctx);
      ctx.apply({ type: "resource", amount: { base: wCost } }, true);
      restartAllure(ctx);
      if (ctx.tick - mark.startTick < ticks(wCharge)) return [{ type: "cc", cc: "slow", duration: wSlowSeconds, strength: wSlow }];
      return [{ type: "stat", stat: "mrReductionPercent", amount: { base: wReduction }, duration: wReductionSeconds }, { type: "cc", cc: "charm", duration: wCharm }, { type: "cc", cc: "slow", duration: wCharm, strength: wSlow }];
    };
    const qProc = (ctx: HookContext): Effect[] => {
      const mark = ownMark(ctx.enemy, "hateSpike", ctx.self.side, ctx.tick);
      if (!mark || mark.value <= 0) return [];
      mark.value -= 1;
      persistTargetStatuses(ctx);
      return [{ type: "damage", damageType: "magic", amount: qBonus, label: "Hate Spike (mark)", petDamageCategory: "proc", noLifeSteal: true }];
    };
    const healthDamage = (formula: typeof eDamage, self: Unit, target: Unit) => {
      const ratioPart = evaluate({ ...formula, base: 0 }, self, target);
      const pet = target.spec.targetClass;
      return formula.base + (pet === "monster" ? Math.min(eMonsterCap, Math.max(eMinimum, ratioPart)) : Math.max(eMinimum, ratioPart));
    };
    const recastTarget = (self: Unit, world: World): Unit | undefined => {
      const enemy = world.units[self.side === 0 ? 1 : 0];
      const visible = (target: Unit) => canTarget(target, self) && Math.abs(self.x - target.x) <= recastRange + target.spec.base.radius;
      if (visible(enemy)) return enemy;
      return world.pets.filter((pet) => pet.owner !== self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable)
        .sort((a, b) => Math.abs(a.x - self.x) - Math.abs(b.x - self.x))
        .map((pet) => petFormulaTarget(pet, self, world.tick)).find(visible);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime("Initial cast"), cooldownAtCastStart: true, castOrigin: "start", castDirection: "start",
        delivery: { kind: "line", range: qRange, width: qWidth, radius: qWidth / 2, speed: q.field("speed"), collisionPet: true },
        onHit: [{ type: "damage", damageType: "magic", amount: qDamage, petDamageCategory: "singleTarget" }, { type: "mark", key: "hateSpike", duration: qMarkSeconds, value: qMarks }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true },
      { key: "Q2", name: `${q.name} (spikes)`, slot: "Q", cooldown: qSpacing, castTime: 0, budgetExcluded: true,
        delivery: { kind: "line", range: spikeRange, width: spikeWidth, radius: spikeWidth / 2, speed: spikeSpeed, piercing: true, collisionPet: true },
        usable: (self, world) => Number(self.memory.spikes ?? 0) > 0 && world.tick < (self.cooldownReady.Q ?? 0) && !!recastTarget(self, world),
        onHit: [{ type: "damage", damageType: "magic", amount: qDamage, petDamageCategory: "area" }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: wCost, castTime: w.castTime(), delivery: { kind: "target", range: wRange }, flags: { spellShield: false },
        onHit: [{ type: "mark", key: "allure", duration: wSeconds }], roles: ["cc"],
        usable: (self, world) => !ownMark(world.units[self.side === 0 ? 1 : 0], "allure", self.side, world.tick) },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: eCost, castTime: eCast, cancelOnInvalidTarget: true, delivery: { kind: "target", range: eRange, edge: true },
        onHit: [{ type: "damage", damageType: "magic", amount: eDamage, amountFor: (self, target) => healthDamage(eDamage, self, target), petDamageCategory: "singleTarget" }],
        onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: eSpeed }, duration: eSpeedSeconds }], flags: { parry: true, appliesOnHit: true, petContactHooks: true }, usable: (self) => !self.memory.empoweredE },
      { key: "E2", name: ee.name, slot: "E", cooldown: eCooldown, cooldownKey: "E", cost: eCost, castTime: eCast, cancelOnInvalidTarget: true,
        delivery: { kind: "dash", direction: "target", distance: eRange, speed: Infinity, hitRadius: 0 },
        onHit: [{ type: "damage", damageType: "magic", amount: empoweredDamage, amountFor: (self, target) => healthDamage(empoweredDamage, self, target), petDamageCategory: "area" }],
        onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: eSpeed }, duration: eSpeedSeconds }], flags: { parry: true, dodge: false, appliesOnHit: true, petContactHooks: true, grounded: true, knockdown: true }, usable: (self, world) => !!self.memory.empoweredE && Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= eRange + self.spec.base.radius + world.units[self.side === 0 ? 1 : 0].spec.base.radius },
      { key: "Epath", name: `${ee.name} (path)`, slot: "other", cooldown: 0, castTime: 0, activation: "internal", budgetExcluded: true, usable: () => false, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true },
        onHit: [{ type: "damage", damageType: "magic", amount: empoweredDamage, amountFor: (self, target) => healthDamage(empoweredDamage, self, target), petDamageCategory: "area" }] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: rCast, castDirection: "start", delivery: { kind: "area", near: 0, far: rRadius, delay: 0, anchor: "ground" },
        onCastStart: [{ type: "state", state: "untargetable", duration: rCast + rDelay }, { type: "state", state: "noMovement", duration: rCast + rDelay }],
        onHit: [{ type: "damage", damageType: "magic", amount: rDamage, amountFor: (self, target) => evaluate(target.hp < derive(target).maxHp * rThreshold ? rEmpowered : rDamage, self, target), petDamageCategory: "area" }], flags: { spellShield: true, grounded: true, petContactHooks: true }, roles: ["damage", "escape", "defense"] },
    ];
    const behavior: Behavior = (view) => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.self.action || view.self.memory.tradeDone) return normal;
      const reaction = react(view); if (reaction) return reaction;
      const ready = (key: string) => canCast(view.world, view.self, abilities.find((a) => a.key === key)!);
      if (view.mode === "flee") return normal;
      if (ready("W") && view.distance <= wRange) return { kind: "cast", ability: "W" };
      const mark = ownMark(view.enemy, "allure", view.self.side, view.world.tick);
      if (mark && view.world.tick - mark.startTick < ticks(wCharge)) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      if (ready("E2")) return { kind: "cast", ability: "E2" };
      if (ready("E") && view.distance <= eRange) return { kind: "cast", ability: "E" };
      if (ready("Q2")) return { kind: "cast", ability: "Q2" };
      if (ready("Q") && view.distance <= qRange) return { kind: "cast", ability: "Q" };
      if (view.mode !== "trade" && view.mode !== "hold" && ready("R") && view.distance <= rRadius && view.enemy.hp < derive(view.enemy).maxHp * rThreshold) return { kind: "cast", ability: "R" };
      return normal;
    };
    return {
      abilities, behavior, attack: { onHitToPets: true },
      hooks: {
        onStart(ctx) { ctx.memory.shadeAt = ticks(shadeWait); },
        onTick(ctx) {
          const action = ctx.self.action;
          if (action?.kind === "cast" && action.ability === "E2" &&
            (!ctx.enemy.alive || ctx.enemy.hp <= 0 || !canTarget(ctx.enemy, ctx.self) || Math.abs(ctx.self.x - ctx.enemy.x) > eRange + ctx.self.spec.base.radius + ctx.enemy.spec.base.radius)) {
            ctx.self.action = undefined;
            ctx.log("Empowered Whiplash cancels: target invalid during cast");
          }
          if (!ctx.memory.shade && ctx.tick >= Number(ctx.memory.shadeAt ?? Infinity)) {
            ctx.memory.shade = true; ctx.memory.empoweredE = true; ctx.self.cooldownReady.E = ctx.tick;
          }
          if (ctx.memory.shade) {
            ctx.apply({ type: "state", state: "camouflage", value: shadeDetection, duration: 2 / 30 }, true);
            ctx.regenerate(Math.max(0, Math.min(shadeHeal / 30, shadeCap + shadeAp * derive(ctx.self).ap - ctx.self.hp)));
          }
          if (ctx.memory.allureTarget !== undefined && !ownMark(ctx.enemy, "allure", ctx.self.side, ctx.tick)) restartAllure(ctx);
          if (ctx.memory.blinkAt !== undefined && ctx.tick >= Number(ctx.memory.blinkAt)) {
            ctx.self.x -= Number(ctx.memory.rDirection) * rBack;
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "R" && s.kind === "state"));
            delete ctx.memory.blinkAt; ctx.log("Last Caress blinks backwards");
          }
        },
        onAttack(ctx) { clearShade(ctx, shadeWait); },
        onCastStart(ctx) {
          if (ctx.ability.key === "W" || ctx.ability.activation === "internal") return;
          clearShade(ctx, ctx.ability.key === "R" ? shadeRWait : shadeWait);
          if (ctx.ability.key === "R") ctx.memory.shadeAt = ctx.tick + ticks(shadeRWait);
          if (ctx.ability.key === "R") {
            ctx.memory.rDirection = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1);
            ctx.memory["castDirection:R"] = ctx.memory.rDirection;
          }
          if (ctx.ability.key === "E2") { ctx.memory.eTargetX = ctx.enemy.x; ctx.memory.eStartX = ctx.self.x; }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E2") ctx.memory.empoweredE = false;
          if (ctx.ability.key === "W") ctx.memory.invalidAllure = !canTarget(ctx.enemy, ctx.self) || Math.abs(ctx.self.x - ctx.enemy.x) > wRange;
          if (ctx.ability.key === "Q") { ctx.memory.spikes = qStock; ctx.self.cooldownReady.Q2 = ctx.tick + ticks(cooldownAfterHaste(qSpacing, abilityHasteFor(ctx.self, { key: "Q2", slot: "Q" }))); }
          if (ctx.ability.key === "Q2") {
            ctx.memory.spikes = Number(ctx.memory.spikes ?? 0) - 1;
            const target = recastTarget(ctx.self, ctx.world);
            if (target) ctx.memory.spikeDirection = directionTo(ctx.self, target);
          }
          if (ctx.ability.key === "R") ctx.memory.blinkAt = ctx.tick + ticks(rDelay);
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && ctx.memory.invalidAllure) return [];
          return [...ctx.effects];
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key === "W") return;
          // These effects precede the triggering damage and share its guarded contact.
          const prefix = [...consumeAllure(ctx), ...(ctx.ability.key === "Q" ? [] : qProc(ctx))];
          if (prefix.length) ctx.effects.unshift(...prefix);
        },
        onAbilityHit(ctx) { if (ctx.ability.key === "W") ctx.memory.allureTarget = ctx.enemy.side; },
        onAttackBeforeDamage(ctx) { for (const effect of [...consumeAllure(ctx), ...qProc(ctx)]) ctx.apply(effect); },
        onDamageTaken(ctx) {
          if (ctx.mitigated > 0 && (!ctx.petSource || ctx.enemy.spec.targetClass === "champion")) clearShade(ctx, shadeHurtWait);
        },
        onMissileTick(ctx) {
          if (ctx.missile.source === "Q2" && !ctx.missile.acceleration) {
            ctx.missile.direction = Number(ctx.memory.spikeDirection ?? ctx.missile.direction) as 1 | -1;
            ctx.missile.acceleration = { perTick: spikeAcceleration / 900, minPerTick: spikeFloor / 30, maxPerTick: spikeSpeed / 30 };
          }
        },
        onDashTick(ctx) {
          const action = ctx.action;
          if (ctx.ability.key === "E2") {
            if (!ctx.enemy.alive || ctx.enemy.hp <= 0 || !canTarget(ctx.enemy, ctx.self) || ctx.self.hp <= 0) {
              ctx.self.action = action.resume;
            } else {
              const previous = Number(ctx.memory.eTargetX ?? ctx.enemy.x);
              const target = Math.abs(ctx.enemy.x - previous) >= eTrackingBreak ? previous : ctx.enemy.x;
              const direction = target >= ctx.self.x ? 1 : -1;
              const gap = Math.max(0, Math.abs(target - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
              action.perTick = direction * gap;
              action.endTick = ctx.tick;
              action.stopAtContact = false;
              ctx.memory.eTargetX = target;
            }
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "E2" || ctx.interrupted || !ctx.self.alive || ctx.self.hp <= 0) return;
          const path = abilities.find((a) => a.key === "Epath")!;
          for (const pet of [...ctx.world.pets]) {
            if (pet.owner === ctx.self.side || pet.spec.hitPoints || pet.spec.untargetable || pet.x + pet.spec.radius < Math.min(Number(ctx.memory.eStartX), ctx.self.x) || pet.x - pet.spec.radius > Math.max(Number(ctx.memory.eStartX), ctx.self.x)) continue;
            abilityHitPet(ctx.world, ctx.self, pet, path, path.onHit!, "area");
          }
        },
      },
      budget: { damage: (self, target) => ({ magic: (3 * evaluate(qDamage, self, target) + qMarks * evaluate(qBonus, self, target)) / cooldownAfterHaste(qCooldown, derive(self).abilityHaste) }) },
    };
  },
};
export default evelynn;
