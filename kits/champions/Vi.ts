/** Vi's charge/release, actual target-local Denting Blows and committed tracking ultimate. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { attackRange, canCast, canStartAttack, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { attackDamage, between, extraAttacks, ticks } from "./util";

const STACK = "vi:denting", CHARGE = "vi:charge", SHIELD = "vi:shield", RACTIVE = "vi:rActive";
type Contact = { target: Unit; pet?: Pet };
const vi: KitModule = {
  champion: "Vi",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const shieldFraction = p.quoted("equal to 10% of her maximum health") / 100, shieldSeconds = p.quoted("health for 3 seconds"), shieldCD = p.field("staticCooldown"), shieldRefund = p.quoted("reduced by 4 seconds");
    p.quote("Vault Breaker will trigger Blast Shield even if it's blocked by a spell shield"); p.quote("Cease and Desist will not"); p.quote("Denting Blows will not activate Blast Shield");
    const qMaxSeconds = q.quoted("for up to 4 seconds"), qFull = q.quoted("over the first 1.25 seconds"), qSlow = q.quoted("slowed by 15%") / 100, qRefund = q.quoted("50% of the mana cost") / 100, qInterrupted = q.quoted("a 3-second cooldown");
    const qMin = q.formula("Minimum Physical Damage"), qMax = q.formula("Maximum Physical Damage"), qRanges = q.fieldNumbers("targetRange"), qSpeeds = q.fieldNumbers("speed"), qRadius = q.field("collisionRadius"), qCD = q.cooldown(), qCost = q.cost();
    const qAir = q.quoted("back over 0.75 seconds"), qWall = q.quoted("up to 50 units"), qLockout = q.quoted("for about 1.25 seconds");
    q.quote("knockback direction will be toward Vi's facing direction"); q.quote("Relentless Force and Cease and Desist can be cast during the dash"); q.quote("interrupts=death, ground, root, silence"); q.textField("cooldownStart");
    const wDamage = w.formula("Bonus Physical Damage"), stackSeconds = w.quoted("enemies hit for 4 seconds"), stackMax = w.quoted("stacking up to 3 times"), wCap = w.quoted("capped at 300"), wShred = w.quoted("20% armor reduction") / 100, wAS = w.fraction("Bonus Attack Speed");
    w.quote("armor penetration will apply after the triggering damage"); w.quote("cannot be dodged nor missed while Vi is blinded"); w.quote("can be blocked"); w.quote("do not affect structures nor wards");
    const eDamage = e.formula("Physical Damage"), eWindow = e.quoted("within 6 seconds"), eRange = e.quoted("gain 50 bonus range"), eCharges = e.quoted("maximum of 2"), eCD = e.field("staticCooldown"), eRecharge = e.field("recharge"), eRadius = e.field("effectRadius"), eCrit = e.quoted("for 100% AD bonus physical damage") / 100;
    e.quote("uncancellable windup"); e.quote("same windup time as Vi's basic attacks"); e.quote("resets Vi's basic attack timer"); e.quote("Spell shield will block damage to secondary targets, but not to the primary target"); e.quote("only apply a stack of Denting Blows to the primary target"); e.quote("applies basic damage required effects on the primary target"); e.textField("cooldownStart");
    const rDamage = r.formula("Physical Damage"), rCD = r.cooldown(), rCast = r.castTime(), rRange = r.field("targetRange"), rSpeed = r.field("speed"), rGrabAt = r.quoted("within 300 units"), rGrabSeconds = r.quoted("over 1.05 seconds"), rAir = r.quoted("up for 1.3 seconds"), rDamageAt = r.quoted("after 0.75 seconds into the grab");
    const rSideDistance = r.quoted("aside by 350 units"), rSideAir = r.quoted("over 0.25 seconds"), rSideStun = r.quoted("stunned for 0.75 seconds"), rSideLockout = r.quoted("again for ~4 seconds"), rTrackLimit = r.quoted("beyond 1500 units"), rBugSeconds = r.quoted("remain for 7 seconds");
    r.quote("will track the target if they change locations"); r.quote("displacement immunity"); r.quote("will not resist the application of the stun"); r.quote("will not dash through the target if she would not be able to land to the opposite side"); r.quote("If the target becomes untargetable during the dash"); r.quote("not deal any damage"); r.quote("interrupts=death"); r.textField("cooldownStart");
    // Preserve and read complete arrays, including unused rank zero/overrank entries.
    p.gameQuote('"name":"ShieldDuration","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]');
    p.gameQuote('"name":"CDReductionOn3Hit","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]');
    q.gameQuote('"name":"MinDashRange","values":[250.0,250.0,250.0,250.0,250.0,250.0,250.0]');
    q.gameQuote('"name":"DashWallCheating","values":[50.0,50.0,50.0,50.0,50.0,50.0,50.0]');
    w.gameQuote('"name":"MaxHealthDamage","values":[3.0,4.0,5.0,6.0,7.0,8.0,9.0]');
    w.gameQuote('"name":"StacksBeforeEffect","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');
    e.gameQuote('"mMaxAmmo":[2,2,2,2,2,2,2]');
    const eAngle = e.gameQuoted('"castConeAngle":35.0', 0, "Characters/Vi/Spells/ViEArea");
    r.gameQuote('"name":"RBaseSpeed","values":[800.0,800.0,800.0,800.0,800.0,800.0,800.0]');
    r.gameQuote('"name":"SecondaryTargetKnockbackDistance","values":[350.0,350.0,350.0,350.0,350.0,350.0,350.0]');

    const contacts = (ctx: HookContext): Contact[] => [{ target: ctx.world.units[1 - ctx.self.side]! }, ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const actualPet = (ctx: HookContext) => ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find(pet => pet.id === ctx.enemy.petId);
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects: Effect[], scale = 1) => {
      if (contact.pet) { contact.pet.statuses = contact.target.statuses; contact.pet.memory = contact.target.memory; abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area", scale); contact.target.statuses = contact.pet.statuses ?? []; contact.target.hp = contact.pet.hp; contact.target.memory = contact.pet.memory; }
      else abilityHit(ctx.world, ctx.self, contact.target, ability, effects, scale);
    };
    const hidden = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, budgetExcluded: true, flags: { spellShield: shield, petContactHooks: true } });
    const shieldSpec = hidden("I", p.name, [], false), procSpec = hidden("Wproc", w.name, [], false), qHit = hidden("Qhit", q.name, []), ePrimary = hidden("Eprimary", e.name, [], false), eCone = hidden("Econe", `${e.name} (cone)`, []), rGrab = hidden("Rgrab", r.name, [{ type: "cc", cc: "airborne", duration: rAir }]), rImpact = hidden("Rimpact", r.name, [{ type: "damage", damageType: "physical", amount: rDamage, petDamageCategory: "singleTarget" }], false), rSide = hidden("Rside", `${r.name} (secondary)`, [{ type: "damage", damageType: "physical", amount: rDamage, petDamageCategory: "area" }, { type: "cc", cc: "airborne", duration: rSideAir }, { type: "cc", cc: "stun", duration: rSideStun }]);
    ePrimary.flags!.appliesLifeSteal = true;
    const shield = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.resurrection || ctx.tick < Number(ctx.memory[SHIELD] ?? 0)) return;
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "shield", amount: { base: 0, ratios: { maxHP: shieldFraction } }, duration: shieldSeconds }, { ability: shieldSpec, scale: 1 });
      ctx.memory[SHIELD] = ctx.tick + ticks(shieldCD);
    };
    const dent = (ctx: HookContext, scale: number) => {
      const pet = actualPet(ctx);
      if (ctx.enemy.petId !== undefined && (!pet || pet.spec.hitPoints || pet.spec.fixedDamage)) return;
      const mark = ctx.enemy.statuses.find(s => s.key === STACK && s.source === ctx.self.side && s.endTick > ctx.tick), count = (mark?.value ?? 0) + scale;
      ctx.enemy.statuses = ctx.enemy.statuses.filter(s => s.key !== STACK || s.source !== ctx.self.side);
      if (count < stackMax - EPSILON) ctx.enemy.statuses.push({ kind: "mark", key: STACK, source: ctx.self.side, ability: "W", startTick: ctx.tick, endTick: ctx.tick + ticks(stackSeconds), value: count });
      else {
        const champion = ctx.enemy.petId === undefined || ctx.enemy.spec.targetClass === "champion";
        const amount = Math.min(champion ? Infinity : wCap, evaluate(wDamage, ctx.self, ctx.enemy));
        if (pet) pet.statuses = ctx.enemy.statuses;
        const effects: Effect[] = [{ type: "damage", damageType: "physical", amount: { base: amount }, noLifeSteal: true, petDamageCategory: "proc" }, { type: "stat", stat: "armorReductionPercent", amount: { base: wShred }, duration: stackSeconds }];
        hit(ctx, { target: ctx.enemy, ...(pet ? { pet } : {}) }, procSpec, effects);
        ctx.buff("vi:dentingAS", "attackSpeed", wAS, stackSeconds);
        ctx.memory[SHIELD] = Math.max(ctx.tick, Number(ctx.memory[SHIELD] ?? 0) - ticks(shieldRefund));
      }
      if (pet) pet.statuses = ctx.enemy.statuses;
    };
    const endCharge = (ctx: HookContext, refund: boolean, interrupted: boolean) => {
      if (ctx.memory[CHARGE] === undefined) return;
      ctx.memory["vi:released"] = Math.min(qFull, (ctx.tick - Number(ctx.memory[CHARGE])) / 30) / qFull;
      delete ctx.memory[CHARGE]; delete ctx.self.chains.Q;
      ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== "vi:qSlow");
      if (refund) {
        delete ctx.self.cooldownHeld.Q;
        ctx.self.cooldownReady.Q = ctx.tick + ticks(interrupted ? qInterrupted : cooldownAfterHaste(qCD, derive(ctx.self).abilityHaste));
        ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + qCost * qRefund);
      }
    };
    const clearR = (ctx: HookContext, linger = false) => {
      ctx.memory[RACTIVE] = false; delete ctx.memory["vi:rDealt"];
      const keep = (s: Unit["statuses"][number]) => s.memoKey !== "vi:r";
      ctx.self.statuses = ctx.self.statuses.filter(keep); ctx.enemy.statuses = ctx.enemy.statuses.filter(keep);
      if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "R") ctx.self.action = undefined;
      if (linger && ctx.self.alive) applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "displacementImmune", duration: rBugSeconds }, { ability: abilities[3]!, scale: 1 });
    };
    const rState = (ctx: HookContext, target: Unit, state: "displacementImmune" | "revealed" | "noAttacks" | "noMovement") => { applyEffect(ctx.world, ctx.self, target, { type: "state", state, duration: Infinity }, { ability: abilities[3]!, scale: 1 }); target.statuses.at(-1)!.memoKey = "vi:r"; };
    const clearEndpoint = (world: World, self: Unit, x: number) => !world.terrain.some(wall => wall.endTick > world.tick && x + self.spec.base.pathingRadius > wall.from + EPSILON && x - self.spec.base.pathingRadius < wall.to - EPSILON);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: qCost, castTime: q.castTime(), cooldownAfter: "state", delivery: { kind: "self" }, channel: { duration: qMaxSeconds, interruptible: true, mobile: true }, usable: self => !self.memory[RACTIVE], flags: { grounded: true }, roles: ["damage", "engage"], estimate: (self, target) => evaluate(qMax, self, target) },
      { key: "Q2", name: `${q.name} (release)`, slot: "Q", cooldown: 0, castTime: 0, chain: { root: "Q", index: 2, window: qMaxSeconds }, delivery: { kind: "self" }, usable: self => self.memory[CHARGE] !== undefined, flags: { grounded: true }, budgetExcluded: true, roles: ["damage", "engage"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, staticCooldown: true, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, cooldownAfter: "empower", charges: { max: eCharges, recharge: eRecharge }, overlay: true, usable: self => self.memory[CHARGE] === undefined, onSelf: [{ type: "empower", attacks: 1, window: eWindow, bonusRange: eRange, resetAttack: true, uncancellable: true, onHit: [] }], roles: ["buff", "damage"], estimate: (self, target) => evaluate(eDamage, self, target) - derive(self).ad },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: rCast, delivery: { kind: "target", range: rRange }, cancelOnInvalidTarget: true, overlay: true, usable: self => !self.memory[RACTIVE] && self.memory[CHARGE] === undefined, flags: { grounded: true, knockdown: false }, roles: ["damage", "cc", "engage"], estimate: (self, target) => evaluate(rDamage, self, target), estimateDelay: () => rDamageAt },
      shieldSpec, procSpec, qHit, ePrimary, eCone, rGrab, rImpact, rSide,
    ];
    const byKey = (key: string) => abilities.find(a => a.key === key)!;
    const behavior: Behavior = view => {
      const normal = defaultBehavior(view), self = view.self;
      if (view.mode === "idle" || self.memory.tradeDone) return normal;
      if (self.memory[CHARGE] !== undefined) {
        const age = (view.world.tick - Number(self.memory[CHARGE])) / 30, full = Math.min(1, age / qFull), reach = qRanges[0]! + (qRanges.at(-1)! - qRanges[0]!) * full;
        if (age >= qFull && Math.abs(view.enemy.x - self.x) <= reach + qRadius + view.enemy.spec.base.radius && canCast(view.world, self, byKey("Q2"))) return { kind: "cast", ability: "Q2" };
        return { kind: "move", direction: view.mode === "flee" ? -1 : view.mode === "hold" ? 0 : 1 };
      }
      if (self.memory[RACTIVE]) { if (canCast(view.world, self, byKey("E")) && !self.statuses.some(s => s.kind === "empower")) return { kind: "cast", ability: "E" }; return { kind: "move", direction: 0 }; }
      if (view.mode === "flee" || self.action) return normal;
      const ready = (key: string) => canCast(view.world, self, byKey(key));
      if (view.mode !== "hold" && view.mode !== "trade" && ready("R") && Math.abs(view.enemy.x - self.x) > attackRange(self, view.enemy)) return { kind: "cast", ability: "R" };
      if (canStartAttack(view.world, self)) return { kind: "attack" };
      if (ready("E") && !self.statuses.some(s => s.kind === "empower") && Math.abs(view.enemy.x - self.x) <= attackRange(self, view.enemy) + eRange) return { kind: "cast", ability: "E" };
      if (view.mode !== "hold" && ready("Q") && Math.abs(view.enemy.x - self.x) <= qRanges.at(-1)! + qRadius + view.enemy.spec.base.radius) return { kind: "cast", ability: "Q" };
      if (normal?.kind === "cast" && ["R", "Q", "Q2", "E"].includes(normal.ability)) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      return normal;
    };
    kit.assume("Blast Shield starts ready with no preloaded Denting stacks. An actual Q/E/R hit grants 10% max HP shield for 3 seconds on a static 12-second level 20 cooldown. Q triggers through spell shield, but parry does not; R requires an accepted grab or secondary hit. W never triggers it; each consumed three-stack W removes 4 seconds from its current clock. The primary capped 12 seconds takes precedence over the binary's extra level 19 breakpoint.");
    kit.assume("Denting Blows is stored on each actual target for 4 seconds; basic hits and accepted Q contacts add one stack. Three consume for 8% + 3.5% per 100 bonus AD max HP physical proc, before 20% armor reduction and 50% AS for 4 seconds. All nonchampion classes cap at 300; only explicitly champion-class clones avoid the cap. Structures, wards, hit-count and fixed-damage objects never acquire stacks. Blind/dodge miss still applies W, but block/parry does not. Its proc cannot critically strike or life steal.");
    kit.assume("Q is an actual mobile interruptible 4-second channel with 15% self slow, explicit release and half-mana timeout/interrupt refunds. CC interrupt uses static 3 seconds; timeout uses full hasted cooldown. Charge scales linearly to 300 + 150% bonus AD, 725 range and 1540 speed at 1.25 seconds. The wiki 4-second duration and 725 range take precedence over binary 6-second internal duration/715 client indicator. A swept 55-radius body contacts actual hitboxes, passes nonchampions and stops at champion-class bodies even under spell shield; a 1.25-second target lockout prevents repeats. Terrain allows at most the sourced 50 extra units to a clear endpoint. Q knockback distance and nonchampion pull distance/duration are absent from these sources: the champion 0.75-second airborne is modeled without invented displacement, and the unsized nonchampion pull has no forced movement. Facing is retained for any later sourced displacement implementation.");
    kit.assume(`E stocks two real charges, recharges at 8 seconds hasted, pays 50 mana per cast and starts static 1-second cooldown after its real empowered attack resolves/expires. It resets the basic timer, adds 50 range, keeps the ordinary uncancellable basic windup, and captures the entitlement at declaration. The primary spell packet replaces ordinary AD damage with 90 + 110% AD + 100% AP plus 100% AD times critical chance; basic-required/onhit effects still resolve once and W marks only this primary. A separately guarded 600-range forward cone copies that raw damage to actual secondary hitboxes without critical classification/onhits. Binary cone angle ${eAngle} degrees is retained; lateral cone width cannot be represented in the duel axis, and the primary 600 range overrides the older 535 client cone.`);
    kit.assume(`R validates its 800-range champion target through the 0.25-second cast and then follows actual relocation until within 300. It uses the sourced initial 800 speed; the unpublished acceleration curve is not invented and generic binary missileSpeed 1400 is not treated as dash speed. The 1.05-second estimated grab tracks the target to the opposite pathing boundary if terrain permits, applies 1.3-second airborne at grab start and 350 + 90% bonus AD after 0.75 seconds. Spell shield guards the whole grab once; later damage retains ordinary invulnerability/stasis guards. Only displacement immunity is granted: stun still applies while the committed dash continues. Reveal/immunity/no attack/movement locks end with the grab; E alone may overlay. Actual secondary bodies encountered by Vi's swept physical hitbox receive full damage, ${rSideAir}-second airborne and ${rSideStun}-second stun with ${rSideLockout}-second lockout. Their sourced ${rSideDistance} lateral knock-aside has no invented forward displacement in one dimension. A target beyond the estimated 1500 limit cancels and retains the sourced 7-second immunity bug. Untargetable pursuit stops immediately outside grab range because the brief forced-walk duration is unpublished; inside range it can still apply airborne without damage. No Urgot execution, summoner blink or ally bodies are fabricated.`);
    kit.assume("Ordinary hold/trade reserve offensive R and completed trade retains retreat. Reference damage includes fully charged Q with its real 1.25-second charge, one E replacement addition per actual charge cycle, ordinary R, and target-local W constrained by achievable basic/Q contact cadence. Added W attack speed respects the ordinary cap; no free armor-shred damage multiplier or preduel stack/kill resources are supplied.");
    return { abilities, behavior, attack: { onHitToPets: true },
      budget: { damage(self, target) {
        const d = derive(self), haste = 1 + d.abilityHaste / 100, qRate = 1 / (qCD / haste + qFull), eRate = Math.min(d.attackSpeed, haste / eRecharge), rRate = 1 / (rCD / haste + rCast + rGrabSeconds), added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, wAS)) - d.attackSpeed), procs = (d.attackSpeed + added + qRate) / stackMax;
        return { physical: evaluate(qMax, self, target) * qRate + Math.max(0, evaluate(eDamage, self, target) + d.ad * eCrit * d.critChance - attackDamage(self)) * eRate + evaluate(rDamage, self, target) * rRate + evaluate(wDamage, self, target) * procs + attackDamage(self) * added };
      }, healing: self => derive(self).maxHp * shieldFraction / shieldCD },
      hooks: {
        onAttack(ctx) { if (ctx.action.empowered?.includes("E")) { ctx.action.attackTag = "vi:E"; ctx.action.baseDamageScale = ctx.targetPet && (ctx.targetPet.spec.hitPoints || ctx.targetPet.spec.fixedDamage || ctx.targetPet.spec.diesToChampionAttack) ? 1 : 0; } },
        onAttackBeforeDamage(ctx) {
          if (ctx.blocked || ctx.attack.attackTag !== "vi:E") return;
          const base = evaluate(eDamage, ctx.self, ctx.enemy), ad = derive(ctx.self).ad, amount = base + ad * eCrit * ctx.critChance, origin = ctx.self.x, dir = directionTo(ctx.self, ctx.enemy);
          applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "physical", amount: { base }, canCrit: true, critMultiplier: base > 0 ? 1 + ad * eCrit / base : 1, petDamageCategory: "singleTarget" }, { ability: ePrimary, scale: ctx.scale, critChance: ctx.critChance });
          shield(ctx);
          for (const contact of contacts(ctx)) {
            if (contact.target.petId === ctx.enemy.petId && (contact.target.petId !== undefined || !contact.pet)) continue;
            const dx = (contact.target.x - origin) * dir;
            if (dx >= -contact.target.spec.base.radius - EPSILON && dx <= eRadius + contact.target.spec.base.radius + EPSILON) hit(ctx, contact, eCone, [{ type: "damage", damageType: "physical", amount: { base: amount }, petDamageCategory: "area" }], ctx.scale);
          }
        },
        onAttackHit(ctx) { if (!ctx.blocked) dent(ctx, ctx.scale); },
        onAttackPetHit(ctx) { if (!ctx.blocked) dent(ctx, ctx.scale); },
        onAttackResolved(ctx) { if (ctx.missed && !ctx.blocked && !hasState(ctx.enemy, "parry") && !hasState(ctx.enemy, "blockAttacks")) dent(ctx, 1); },
        onAttackPetResolved(ctx) { if (ctx.missed && !ctx.blocked && !hasState(ctx.enemy, "parry") && !hasState(ctx.enemy, "blockAttacks")) dent(ctx, 1); },
        onAbilityContact(ctx) { if (ctx.ability.key === "Qhit" && ctx.defense === "spellShield") shield(ctx); },
        onAbilityHit(ctx) {
          if (["Qhit", "Eprimary", "Econe", "Rgrab", "Rside"].includes(ctx.ability.key)) shield(ctx);
          if (ctx.ability.key === "Qhit") dent(ctx, ctx.scale);
          if (ctx.ability.key === "Rgrab") ctx.memory["vi:rAccepted"] = true;
        },
        onCCApplied(ctx) { if ((ctx.cc === "root" || ctx.cc === "ground") && ctx.self.action?.kind === "channel" && ctx.self.action.ability === "Q") { ctx.self.action = undefined; endCharge(ctx, true, true); } },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "Q") endCharge(ctx, ctx.reason !== "recast", ctx.reason !== "recast"); },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory[CHARGE] = ctx.tick;
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "Q", memoKey: "vi:qSlow", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: 0 }, { kind: "cc", key: "slow", ability: "Q", memoKey: "vi:qSlow", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(qMaxSeconds), value: qSlow });
          }
          if (ctx.ability.key === "Q2") {
            endCharge(ctx, false, false);
            const share = Number(ctx.memory["vi:released"]), distance = qRanges[0]! + (qRanges.at(-1)! - qRanges[0]!) * share, speed = qSpeeds[0]! + (qSpeeds.at(-1)! - qSpeeds[0]!) * share, dir = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1;
            let endpoint = ctx.self.x + dir * Math.min(distance, ctx.aim?.distance ?? distance);
            if (!clearEndpoint(ctx.world, ctx.self, endpoint)) {
              const walls = ctx.world.terrain.filter(wall => wall.endTick > ctx.tick && endpoint + ctx.self.spec.base.pathingRadius > wall.from && endpoint - ctx.self.spec.base.pathingRadius < wall.to), far = dir > 0 ? Math.max(...walls.map(wall => wall.to)) + ctx.self.spec.base.pathingRadius : Math.min(...walls.map(wall => wall.from)) - ctx.self.spec.base.pathingRadius;
              if (Math.abs(far - endpoint) <= qWall + EPSILON && clearEndpoint(ctx.world, ctx.self, far)) endpoint = far;
              else { const near = dir > 0 ? Math.min(...walls.map(wall => wall.from)) - ctx.self.spec.base.pathingRadius : Math.max(...walls.map(wall => wall.to)) + ctx.self.spec.base.pathingRadius; endpoint = ctx.self.x + dir * Math.max(0, (near - ctx.self.x) * dir); }
            }
            ctx.memory["vi:qEnd"] = endpoint; ctx.memory["vi:qDirection"] = dir; ctx.memory["vi:qShare"] = share;
            const duration = Math.max(1, Math.ceil(Math.abs(endpoint - ctx.self.x) / (speed / 30) - EPSILON));
            ctx.self.action = { kind: "dash", ability: "Q2", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: dir * speed / 30, stopAtContact: false, crossTerrain: true, unstoppable: false };
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "Q", memoKey: "vi:qDash", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: 0 });
          }
          if (ctx.ability.key === "R") {
            ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== "vi:qDash");
            ctx.memory[RACTIVE] = true; ctx.memory["vi:rGrab"] = false; ctx.memory["vi:rNoDamage"] = false; ctx.memory["vi:rDirection"] = directionTo(ctx.self, ctx.enemy);
            rState(ctx, ctx.self, "displacementImmune"); rState(ctx, ctx.self, "noAttacks"); rState(ctx, ctx.self, "noMovement"); rState(ctx, ctx.enemy, "revealed");
            ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: Infinity, perTick: 0, stopAtContact: false, crossTerrain: true, unstoppable: true };
          }
        },
        onTick(ctx) {
          // Resurrection is installed after the shared dash-end callback. Resolve
          // the source's lingering-immunity exception only after that real event.
          if (ctx.memory["vi:rInterruptedAt"] !== undefined) {
            if (ctx.self.resurrection && ctx.tick <= Number(ctx.memory["vi:rInterruptedAt"]) + 1) clearR(ctx, true);
            delete ctx.memory["vi:rInterruptedAt"];
          }
          if (ctx.self.resurrection && ctx.self.action?.kind === "cast" && ctx.self.action.ability === "R") ctx.self.action = undefined;
          if (ctx.memory[CHARGE] !== undefined && ctx.tick >= Number(ctx.memory[CHARGE]) + ticks(qMaxSeconds)) endCharge(ctx, true, false);
        },
        onDashTick(ctx) {
          if (ctx.ability.key === "Q2") {
            const dir = Number(ctx.memory["vi:qDirection"]) as 1 | -1, remaining = Math.max(0, (Number(ctx.memory["vi:qEnd"]) - ctx.self.x) * dir);
            ctx.action.perTick = dir * Math.min(Math.abs(ctx.action.perTick), remaining);
            const proposed = ctx.self.x + ctx.action.perTick;
            const candidates = contacts(ctx).filter(contact => !isUntargetable(contact.target, ctx.self) && !inStasis(contact.target) && ctx.tick >= Number(contact.target.memory[`vi:qLock:${ctx.self.side}`] ?? 0) && Math.max(ctx.self.x, proposed) >= contact.target.x - contact.target.spec.base.radius - qRadius - EPSILON && Math.min(ctx.self.x, proposed) <= contact.target.x + contact.target.spec.base.radius + qRadius + EPSILON).sort((a, b) => (a.target.x - b.target.x) * dir || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
            for (const contact of candidates) {
              const champion = !contact.pet || contact.pet.spec.targetClass === "champion";
              contact.target.memory[`vi:qLock:${ctx.self.side}`] = ctx.tick + ticks(qLockout);
              const effects: Effect[] = [{ type: "damage", damageType: "physical", amount: between(qMin, qMax, Number(ctx.memory["vi:qShare"])), petDamageCategory: "area" }, ...(champion ? [{ type: "cc", cc: "airborne", duration: qAir } as Effect] : [])];
              hit(ctx, contact, qHit, effects);
              if (champion) { const stop = contact.target.x - dir * (contact.target.spec.base.radius + qRadius); ctx.action.perTick = dir * Math.max(0, (stop - ctx.self.x) * dir); ctx.action.endTick = ctx.tick; break; }
            }
          }
          if (ctx.ability.key !== "R") return;
          const distance = Math.abs(ctx.enemy.x - ctx.self.x), grabbing = !!ctx.memory["vi:rGrab"];
          if (!ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.self.resurrection || (!grabbing && distance > rTrackLimit)) { clearR(ctx, !!ctx.self.resurrection || distance > rTrackLimit); return; }
          if (!grabbing && (isUntargetable(ctx.enemy, ctx.self) || inStasis(ctx.enemy))) { ctx.memory["vi:rNoDamage"] = true; if (distance > rGrabAt) { clearR(ctx); return; } }
          if (!grabbing && distance <= rGrabAt + EPSILON) {
            ctx.memory["vi:rGrab"] = true; ctx.memory["vi:rGrabStart"] = ctx.tick; ctx.memory["vi:rAccepted"] = false;
            const grab = ctx.memory["vi:rNoDamage"] ? { ...rGrab, flags: { ...rGrab.flags, hitsUntargetable: true } } : rGrab;
            abilityHit(ctx.world, ctx.self, ctx.enemy, grab, grab.onHit!);
          }
          const dir = Number(ctx.memory["vi:rDirection"]) as 1 | -1, boundary = ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius;
          if (ctx.memory["vi:rGrab"]) {
            const age = ctx.tick - Number(ctx.memory["vi:rGrabStart"]), end = Number(ctx.memory["vi:rGrabStart"]) + ticks(rGrabSeconds), far = ctx.enemy.x + dir * boundary, endpoint = clearEndpoint(ctx.world, ctx.self, far) ? far : ctx.enemy.x - dir * boundary;
            ctx.action.perTick = (endpoint - ctx.self.x) / Math.max(1, end - ctx.tick + 1); ctx.action.endTick = end;
            if (!ctx.memory["vi:rDealt"] && age >= ticks(rDamageAt)) { ctx.memory["vi:rDealt"] = true; if (ctx.memory["vi:rAccepted"] && !ctx.memory["vi:rNoDamage"]) abilityHit(ctx.world, ctx.self, ctx.enemy, rImpact, rImpact.onHit!); }
          } else { const dx = ctx.enemy.x - ctx.self.x, step = Math.max(0, Math.abs(dx) - rGrabAt); ctx.action.perTick = directionTo(ctx.self, ctx.enemy) * Math.min(rSpeed / 30, step); }
          const to = ctx.self.x + ctx.action.perTick;
          for (const contact of contacts(ctx).filter(contact => !!contact.pet)) if (ctx.tick >= Number(contact.target.memory[`vi:rLock:${ctx.self.side}`] ?? 0) && Math.max(ctx.self.x, to) >= contact.target.x - contact.target.spec.base.radius - ctx.self.spec.base.radius - EPSILON && Math.min(ctx.self.x, to) <= contact.target.x + contact.target.spec.base.radius + ctx.self.spec.base.radius + EPSILON) { contact.target.memory[`vi:rLock:${ctx.self.side}`] = ctx.tick + ticks(rSideLockout); hit(ctx, contact, rSide, rSide.onHit!); }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Q2") ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== "vi:qDash");
          if (ctx.ability.key === "R") {
            if (ctx.interrupted && ctx.memory[RACTIVE]) ctx.memory["vi:rInterruptedAt"] = ctx.tick;
            clearR(ctx, !!ctx.self.resurrection); delete ctx.memory["vi:rDealt"];
          }
        },
        onLethal(ctx) { if (ctx.memory[RACTIVE]) clearR(ctx); return false; },
      },
    };
  },
};
export default vi;
