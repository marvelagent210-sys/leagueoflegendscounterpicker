/** Vladimir: non-recursive Crimson Pact, actual Rush clocks, charged blood and delayed infection. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityHit, addStatus, applyCC, directionTo, heal, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { between, flat, ticks } from "./util";

const vladimir: KitModule = {
  champion: "Vladimir",
  build(kit) {
    const passive = kit.ability("Crimson Pact");
    const q = kit.ability("Transfusion"), w = kit.ability("Sanguine Pool"), e = kit.ability("Tides of Blood"), r = kit.ability("Hemoplague");
    const apPerBonusHP = passive.quoted("(3.333% bonus health)") / 100;
    const hpPerAP = passive.quoted("(160% AP)") / 100;
    passive.quote("These two bonuses do not stack with each other");
    passive.quote("will not increase Vladimir's current health");
    const qDamage = q.formula("Magic Damage"), empoweredDamage = q.formula("Increased Damage"), qHeal = q.formula("Heal");
    const rushSeconds = q.quoted("Crimson Rush depletes over 2.5 seconds");
    const rushSlowClock = 1 - q.quoted("depletes 75% slower") / 100;
    const rushSpeedSeconds = q.quoted("decaying over 0.5 seconds");
    const rushSpeed = q.quoted("10% / 20% / 30% / 40% (based on level)", 3) / 100;
    const additionalHeal: Formula = { base: q.levelValue("Casting Transfusion during the surge"), ratios: { missingHP: q.quoted("(+ 5% (+ 4% per 100 AP) of his missing health)") / 100 }, products: [{ ratio: q.quoted("(+ 5% (+ 4% per 100 AP) of his missing health)", 1) / 10000, stats: ["AP", "missingHP"] }] };
    q.quote("White while generating the first stack and while at 1 stack (there is no time-out period)");
    q.quote("Vladimir can cast Sanguine Pool and Hemoplague during Transfusion's cast time");
    q.quote("not be cancelled if the target becomes untargetable, dies, or is too far away or no longer in sight");
    q.quote("will not deal them damage but still grant Vladimir the healing");
    const poolDuration = w.quoted("untargetable and ghosted for 2 seconds");
    const poolInterval = w.quoted("magic damage every 0.5 seconds");
    const poolDamage = w.formula("Magic Damage Per Tick");
    const poolHealShare = w.quoted("heals himself for 30% of the pre-mitigation damage dealt") / 100;
    const poolSlow = w.quoted("slowed by 40%") / 100;
    const poolSpeed = w.quoted("37.5% bonus movement speed") / 100;
    const poolSpeedDuration = w.quoted("decays exponentially over 1 second");
    const poolCost = w.cost() / 100;
    const poolRadius = w.field("effectRadius");
    w.quote("The first tick damages immediately");
    w.quote("The slow ends immediately once affected enemies get out of range");
    w.quote("that ability may still be recast");
    const chargeDuration = e.quoted("charges for up to 1.5 seconds");
    const fullCharge = e.quoted("charged for at least 1 second");
    const eSlowSeconds = e.quoted("slowed for 0.5 seconds");
    const eSlow = e.fraction("Slow"), chargeSelfSlow = e.quoted("slowed by 20% afterwards") / 100;
    const eMin = e.formula("Minimum Magic Damage"), eMax = e.formula("Maximum Magic Damage");
    const costNumbers = e.fieldNumbers("cost");
    const chargeCostStages = costNumbers.slice(0, 4).map((value) => value / 100);
    const costStopShare = e.quoted("below 12% of his maximum health") / 100;
    e.quote("does so automatically afterwards or if it is interrupted");
    e.quote("nova of 15 blood bolts");
    e.quote("Enemies can intercept multiple bolts, but can be damaged only once");
    const eRange = e.field("effectRadius"), eSpeed = e.field("speed"), eWidth = e.field("width");
    const infectionSeconds = r.quoted("infects enemies hit for 4 seconds");
    const infectionIncrease = r.quoted("increasing the damage they take from all sources by 10%") / 100;
    const infectionHealDelay = r.quoted("after a 0.4-second delay");
    const rDamage = r.formula("Magic damage"), rHeal = r.formula("Heal");
    r.quote("True damage will however not be amplified");
    r.quote("Spell shield does not negate the detonation");
    r.quote("stacks additively with Unbreakable Will");
    const qCD = q.cooldown(), qCast = q.castTime(), wCD = w.cooldown(), eCD = e.cooldown(), rCD = r.cooldown();
    const pooled = (self: Unit, tick: number) => tick < Number(self.memory.poolUntil ?? -1);
    const surge = (self: Unit) => Number(self.memory.rushRemaining ?? 0) > 0;
    const canUse = (self: Unit, world: HookContext["world"]) => !pooled(self, world.tick);
    const chargeShare = (self: Unit, tick: number) => Math.min(1, Math.max(0, (tick - Number(self.memory.bloodChargeStart ?? tick)) / ticks(fullCharge)));
    const chargeHit = (self: Unit, tick: number): Effect[] => {
      const share = chargeShare(self, tick);
      return [{ type: "damage", damageType: "magic", amount: between(eMin, eMax, share) }, ...(share >= 1 ? [{ type: "cc" as const, cc: "slow" as const, strength: eSlow, duration: eSlowSeconds }] : [])];
    };
    const burstSpec: AbilitySpec = { key: "RB", name: `${r.name} detonation`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, projectile: false }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }], usable: () => false };
    const poolSpec: AbilitySpec = { key: "WP", name: w.name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, projectile: false }, onHit: [{ type: "damage", damageType: "magic", amount: poolDamage, persistent: true }, { type: "cc", cc: "slow", strength: poolSlow, duration: 2 / 30 }], usable: () => false };
    const release = (ctx: HookContext) => {
      if (ctx.memory.bloodChargeStart === undefined) return;
      const effects = chargeHit(ctx.self, ctx.tick);
      delete ctx.memory.bloodChargeStart;
      delete ctx.memory.bloodNextCost;
      delete ctx.self.chains.E;
      ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "cc" && status.ability === "Echarge" && status.source === ctx.self.side));
      const direction = directionTo(ctx.self, ctx.enemy);
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "E2", seenTick: ctx.tick, x: ctx.self.x, perTick: eSpeed / 30, direction, homing: false, projectile: true, travelLeft: eRange, connects: true, scale: 1, onHit: effects });
      ctx.log("Tides of Blood releases");
    };
    const pulsePool = (ctx: HookContext) => {
      if (Math.abs(ctx.self.x - ctx.enemy.x) > poolRadius + 1e-6) return;
      abilityHit(ctx.world, ctx.self, ctx.enemy, poolSpec, poolSpec.onHit!);
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, castTime: qCast, delivery: { kind: "target", range: q.field("targetRange") }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, usable: canUse, retainTargetOnInvalidation: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, castTime: w.castTime(), cost: { base: 0, ratios: { currentHP: poolCost } }, costType: "health", delivery: { kind: "self" }, overlay: true, overlayChannels: ["E"], usable: canUse, onSelf: [{ type: "state", state: "untargetable", duration: poolDuration }, { type: "state", state: "ghosted", duration: poolDuration }, { type: "state", state: "noAttacks", duration: poolDuration }], roles: ["defense"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, castTime: e.castTime(), cooldownAtCastStart: true, delivery: { kind: "self" }, channel: { duration: chargeDuration, interruptible: true, mobile: true, onComplete: [] }, chainCooldown: "first", roles: ["damage"], usable: canUse, estimate: (self, enemy) => evaluate(eMax, self, enemy) },
      { key: "E2", name: `${e.name} release`, slot: "E", cooldown: 0, castTime: 0, delivery: { kind: "self" }, chain: { root: "E", index: 2, window: chargeDuration, auto: true }, usable: (self) => self.memory.bloodChargeStart !== undefined, roles: ["damage"], estimate: (self, enemy) => evaluate(eMax, self, enemy) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, castTime: r.castTime(), delivery: { kind: "circle", range: r.field("targetRange"), radius: r.field("effectRadius"), delay: 0 }, onHit: [{ type: "mark", key: "vladimir:infection", duration: infectionSeconds + 1 / 30 }], flags: { projectile: r.flag("projectile"), spellShield: true }, overlay: true, usable: canUse, roles: ["damage"] },
      poolSpec, burstSpec,
    ];
    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      if (view.mode === "idle") return undefined;
      // Advance the shared short-trade clock even when the kit chooses its own combo.
      const tradeCommand = view.mode === "trade" ? defaultBehavior(view) : undefined;
      const e2 = abilities.find((ability) => ability.key === "E2")!;
      if (self.memory.bloodChargeStart !== undefined && world.tick - Number(self.memory.bloodChargeStart) >= ticks(fullCharge) && canCast(world, self, e2) && Math.abs(self.x - enemy.x) <= eRange + enemy.spec.base.radius + 1e-6) return { kind: "cast", ability: "E2" };
      if (pooled(self, world.tick)) return { kind: "move", direction: view.mode === "flee" || self.memory.tradeDone ? -1 : view.mode !== "hold" && Math.abs(self.x - enemy.x) > poolRadius ? 1 : 0 };
      const reaction = react(view);
      if (reaction) return reaction;
      if (view.mode === "trade" && self.memory.tradeDone) return tradeCommand ?? defaultBehavior(view);
      if (view.mode === "hold" && self.action?.kind === "channel") return { kind: "move", direction: 0 };
      const rSpec = abilities.find((ability) => ability.key === "R")!;
      if ((view.mode === "fight" || view.mode === "kite") && canCast(world, self, rSpec) && inReach(rSpec, self, enemy)) return { kind: "cast", ability: "R" };
      const qSpec = abilities[0]!;
      if (canCast(world, self, qSpec)) return { kind: "cast", ability: "Q" };
      if (!self.action && Math.abs(self.x - enemy.x) <= eRange + 200 && (view.mode === "fight" || view.mode === "trade" || view.mode === "kite") && canCast(world, self, abilities[2]!)) return { kind: "cast", ability: "E" };
      return tradeCommand ?? defaultBehavior(view);
    };
    kit.assume("Crimson Rush starts empty. Ordinary Transfusion generates one point over its cooldown; the empowered cast consumes both points and does not generate another, giving one empowered Q per three casts. This reset policy reconciles the base spell's generation wording with the empowered spell's consume-all wording. Empowered entitlement is captured at declaration. Ordinary Q healing survives spell shields/parries as a separate completion heal; the source explicitly confirms only the untargetability exception.");
    kit.assume("Crimson Rush's 0.5-second movement-speed bonus decays linearly. Pool's unpinned exponential decay uses exp(-5*t) over its sourced one-second duration, then zero.");
    kit.assume("Tides of Blood damage interpolates linearly through its first second. The missing channel-interaction table is represented by ordinary non-movement channel interrupts; W overlays the charge and a pre-existing E can release while pooled.");
    kit.assume("The default policy releases E at one second when the champion is in reach, otherwise at maximum charge. Its charge telegraph reports the maximum 1.5-second release deadline to enemy reactions; the earlier policy recast is visible as its resulting missile.");
    kit.assume("The fifteen-bolt nova is represented by its target-facing bolt on the duel axis. Enemy pet interception and lateral bolt coverage are not represented; the enemy champion can receive only one packet.");
    kit.assume("Pool affects the sole enemy champion within 350 center units. Its zero-damage ending proc, minion healing, pets and item/summoner actions are outside the modeled duel.");
    kit.assume("Hemoplague is blocked by a spell shield at infection, but a shield acquired after infection does not block its burst. Untargetability/parry still guard the burst; an infected living champion grants its delayed heal even if its burst is guarded. A champion already dead at detonation grants no heal.");
    kit.assume("Hemoplague uses separate physical/magic amplification, preserving true damage. Its named additive exception with Alistar's Unbreakable Will requires that future kit's explicit implementation; item and monster sources are absent.");
    kit.assume("The pinned Hemoplague text does not establish owner-death persistence. A detonation whose clock has not elapsed when Vladimir dies does not prolong this duel; no posthumous burst or heal is granted.");
    kit.assume("The budget assumes one empowered Q every three casts, a half-health reference for its additional heal, four Pool contacts, full-charge E with eight-percent max-health self-cost, and one Hemoplague champion; it does not price Pool untargetability or repeated minion healing.");
    return {
      abilities, behavior, resourceStart: 0, statConversions: { healthToAP: apPerBonusHP, apToHealth: hpPerAP },
      budget: {
        damage(self, target) {
          const haste = derive(self).abilityHaste;
          return { magic: (evaluate(empoweredDamage, self, target) - evaluate(qDamage, self, target)) / (3 * (cooldownAfterHaste(qCD, haste) + qCast)) + evaluate(poolDamage, self, target) * (poolDuration / poolInterval) / cooldownAfterHaste(wCD, haste) + evaluate(eMax, self, target) / cooldownAfterHaste(eCD, haste) + evaluate(rDamage, self, target) * (1 + infectionIncrease) / cooldownAfterHaste(rCD, haste) };
        },
        healing(self, target) {
          const d = derive(self), qCycle = cooldownAfterHaste(qCD, d.abilityHaste) + 0.25;
          const additional = additionalHeal.base + d.maxHp * 0.5 * ((additionalHeal.ratios?.missingHP ?? 0) + (additionalHeal.products?.[0]?.ratio ?? 0) * d.ap);
          return (evaluate(qHeal, self) + additional / 3) / qCycle + (evaluate(poolDamage, self, target) * 4 * poolHealShare - d.maxHp * 0.5 * poolCost) / cooldownAfterHaste(wCD, d.abilityHaste) - d.maxHp * chargeCostStages.at(-1)! / cooldownAfterHaste(eCD, d.abilityHaste) + evaluate(rHeal, self) / cooldownAfterHaste(rCD, d.abilityHaste);
        },
      },
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.qEmpowered = surge(ctx.self);
            if (ctx.memory.qEmpowered) { ctx.memory.rushRemaining = 0; ctx.memory.rushStacks = 0; }
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const amount = evaluate(qHeal, ctx.self) + (ctx.memory.qEmpowered ? evaluate(additionalHeal, ctx.self) : 0);
            heal(ctx.world, ctx.self, amount);
            if (!ctx.memory.qEmpowered) {
              ctx.memory.rushGenerateAt = ctx.self.cooldownReady.Q!;
            } else delete ctx.memory.rushGenerateAt;
          } else if (ctx.ability.key === "W") {
            ctx.memory.poolUntil = ctx.tick + ticks(poolDuration);
            ctx.memory.poolStart = ctx.tick;
            ctx.memory.poolNextPulse = ctx.tick + ticks(poolInterval);
            ctx.buff("vladimir:poolRange", "attackRange", -ctx.self.spec.attack.range, poolDuration);
            ctx.buff("vladimir:poolSpeed", "moveSpeedPercent", poolSpeed, 2 / 30);
            pulsePool(ctx);
          } else if (ctx.ability.key === "E") {
            ctx.memory.bloodChargeStart = ctx.tick;
            ctx.memory.bloodNextCost = 1;
            if (ctx.self.hp >= derive(ctx.self).maxHp * costStopShare) ctx.self.hp -= derive(ctx.self).maxHp * chargeCostStages[0]!;
          } else if (ctx.ability.key === "E2") release(ctx);
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "E") release(ctx); },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q" && ctx.memory.qEmpowered) return [{ type: "damage", damageType: "magic", amount: empoweredDamage }];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "WP") heal(ctx.world, ctx.self, evaluate(poolDamage, ctx.self, ctx.enemy) * ctx.scale * poolHealShare);
          if (ctx.ability.key === "R") {
            ctx.memory.infectionAt = ctx.tick + ticks(infectionSeconds);
            addStatus(ctx.enemy, { kind: "state", key: "physicalReduction", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(infectionSeconds) + 1, value: -infectionIncrease, memoKey: "vladimir:infectionPhysical" });
            addStatus(ctx.enemy, { kind: "state", key: "magicReduction", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(infectionSeconds) + 1, value: -infectionIncrease, memoKey: "vladimir:infectionMagic" });
          }
        },
        onTick(ctx) {
          if (ctx.memory.rushGenerateAt !== undefined && ctx.tick >= Number(ctx.memory.rushGenerateAt)) {
            delete ctx.memory.rushGenerateAt;
            ctx.memory.rushStacks = Number(ctx.memory.rushStacks ?? 0) + 1;
            if (Number(ctx.memory.rushStacks) >= 2) { ctx.memory.rushStacks = 0; ctx.memory.rushRemaining = ticks(rushSeconds); ctx.memory.rushStart = ctx.tick; }
          }
          if (surge(ctx.self)) {
            const slowClock = pooled(ctx.self, ctx.tick) || ctx.memory.bloodChargeStart !== undefined || hasState(ctx.self, "stasis");
            ctx.memory.rushRemaining = Math.max(0, Number(ctx.memory.rushRemaining) - (slowClock ? rushSlowClock : 1));
            const age = ctx.tick - Number(ctx.memory.rushStart);
            ctx.buff("vladimir:rushSpeed", "moveSpeedPercent", rushSpeed * Math.max(0, 1 - age / ticks(rushSpeedSeconds)), 1 / 30);
          }
          if (pooled(ctx.self, ctx.tick)) {
            const age = (ctx.tick - Number(ctx.memory.poolStart)) / 30;
            ctx.buff("vladimir:poolSpeed", "moveSpeedPercent", age < poolSpeedDuration ? poolSpeed * Math.exp(-5 * age) : 0, 1 / 30);
            if (ctx.tick >= Number(ctx.memory.poolNextPulse)) { ctx.memory.poolNextPulse = Number(ctx.memory.poolNextPulse) + ticks(poolInterval); pulsePool(ctx); }
            if (Math.abs(ctx.self.x - ctx.enemy.x) <= poolRadius + 1e-6 && !isUntargetable(ctx.enemy, ctx.self)) {
              if (!ctx.enemy.statuses.some((status) => status.kind === "cc" && status.ability === "WP" && status.source === ctx.self.side)) applyCC(ctx.world, ctx.self, ctx.enemy, "slow", 2 / 30, poolSlow, false, "WP");
              else ctx.enemy.statuses = ctx.enemy.statuses.map((status) => status.kind === "cc" && status.ability === "WP" && status.source === ctx.self.side ? { ...status, endTick: ctx.tick + 2 } : status);
            } else ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "cc" && status.ability === "WP" && status.source === ctx.self.side));
          } else ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "cc" && status.ability === "WP" && status.source === ctx.self.side));
          if (ctx.memory.bloodChargeStart !== undefined) {
            const elapsed = ctx.tick - Number(ctx.memory.bloodChargeStart);
            while (Number(ctx.memory.bloodNextCost) < chargeCostStages.length && elapsed >= ticks(Number(ctx.memory.bloodNextCost) * 0.25)) {
              const stage = Number(ctx.memory.bloodNextCost), max = derive(ctx.self).maxHp;
              if (ctx.self.hp >= max * costStopShare) ctx.self.hp -= max * (chargeCostStages[stage]! - chargeCostStages[stage - 1]!);
              ctx.memory.bloodNextCost = stage + 1;
            }
            if (elapsed > ticks(fullCharge)) {
              const existing = ctx.self.statuses.some((status) => status.kind === "cc" && status.ability === "Echarge" && status.source === ctx.self.side);
              if (existing) ctx.self.statuses = ctx.self.statuses.map((status) => status.kind === "cc" && status.ability === "Echarge" && status.source === ctx.self.side ? { ...status, endTick: ctx.tick + 2 } : status);
              else applyCC(ctx.world, ctx.self, ctx.self, "slow", 2 / 30, chargeSelfSlow, false, "Echarge");
            }
            if (!ctx.self.action && ctx.self.statuses.some((status) => status.kind === "cc" && CC_RULES[status.key as keyof typeof CC_RULES]?.interruptsChannels === "yes")) release(ctx);
          }
          if (ctx.memory.infectionAt !== undefined && ctx.tick >= Number(ctx.memory.infectionAt)) {
            delete ctx.memory.infectionAt;
            if (ctx.enemy.alive) {
              abilityHit(ctx.world, ctx.self, ctx.enemy, burstSpec, burstSpec.onHit!);
              ctx.world.scheduled.push({ tick: ctx.tick + ticks(infectionHealDelay), owner: ctx.self.side, target: ctx.self.side, effects: [{ type: "heal", amount: rHeal }], ability: "R", scale: 1 });
            }
            ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => status.memoKey !== "vladimir:infectionPhysical" && status.memoKey !== "vladimir:infectionMagic");
          }
        },
      },
    };
  },
};

export default vladimir;
