/** Warwick's five pinned templates: real on-hits, jaw attachment and champion collision. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, heal, inStasis, isUntargetable, notifyIncomingOnHit } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { FOREVER, scaled, ticks } from "./util";

const HUNT = "warwick:hunt", ACTIVE = "warwick:activeHunt", EBUFF = "warwick:howl", RLOCK = "warwick:duress";
type Body = { target: Unit; pet?: Pet };
const warwick: KitModule = {
  champion: "Warwick",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pDamage = { base: p.levelValue("Warwick deals"), ratios: { bonusAD: p.quoted("(+ 15% bonus AD)") / 100, AP: p.quoted("(+ 10% AP)") / 100 } };
    const pThreshold = p.quoted("below 50% maximum health") / 100, pLow = p.quoted("below 25% maximum health") / 100, pHeal = p.quoted("heals for 100%") / 100, pEmpowered = p.quoted("increased to 250%") / 100;
    p.quote("damage is applied before the damage"); p.quote("Tentacles"); p.quote("kegs");
    p.gameQuote("mSpell.DataValues.EmpoweredHealingRatio.values: [2.5,2.5,2.5,2.5,2.5,2.5,2.5]");
    const qDamage = q.formula("Magic Damage"), qCap = q.formula("Capped Monster Damage"), qHeal = q.fraction("Healing Percentage"), qCD = q.cooldown(), qCost = q.cost(), qRange = q.field("targetRange"), qDelay = q.quoted("{{rutngt|0.2475}}"), qHold = q.quoted("charge for 0.5 seconds"), qMaxLunge = q.quoted("up to 0.5 seconds when cast at maximum range");
    q.textField("cooldownStart"); q.quote("both the damage and the heal occur even after"); q.quote("healing is calculated only from Jaws of the Beast's damage"); q.quote("channel will '''not''' be interrupted"); q.quote("displacement immune"); q.gameQuote("mSpell.castRange:[365.0,365.0,365.0,365.0,365.0,365.0,365.0]");
    const wAS = w.fraction("Bonus Attack Speed"), wMS = w.fraction("Bonus Movement Speed"), wDouble = w.fraction("Increased Attack Speed") / wAS, wThreshold = w.quoted("below 50% of their maximum health") / 100, wLow = w.quoted("below 25% of their maximum health") / 100, wASDuration = w.quoted("for 1.25 seconds"), wDuration = w.quoted("for 8 seconds"), wLost = w.quoted("lost for 0.5 seconds"), wBuild = w.quoted("over 3.5 seconds"), wRefund = w.quoted("reduced by 30%") / 100, wRadius = w.field("effectRadius"), wCD = w.cooldown(), wCost = w.cost(), wCast = w.castTime();
    w.quote("obscured vision"); w.quote("does not refresh the duration"); w.quote("wherever '''Warwick''' was at the start"); w.quote("decoys");
    w.gameQuote("mSpell.DataValues.SecondHPThreshold.values: [0.25,0.25,0.25,0.25,0.25,0.25,0.25]"); w.gameQuote("mSpell.castRangeDisplayOverride:[4000.0,4000.0,4000.0,4000.0,4000.0,4000.0,4000.0]"); w.gameQuote("mSpell.castRange:[3000.0,3000.0,3000.0,3000.0,3000.0,3000.0,3000.0]");
    const eReduction = e.fraction("Damage Reduction"), eDuration = e.quoted("up to 2.75 seconds"), eDelay = e.quoted("recast after 1 second"), eFear = e.quoted("nearby enemies for 1 second"), eSlow = e.quoted("slowing them by 90%") / 100, eLockout = e.quoted("0.25-second lockout"), eRadius = e.field("effectRadius"), eCD = e.cooldown(), eCost = e.cost();
    e.textField("cooldownStart"); e.quote("without ending the damage reduction buff prematurely"); e.quote("without being considered as an ability activation"); e.gameQuote("mSpell.DataValues.DRDuration.values: [2.75,2.75,2.75,2.75,2.75,2.75,2.75]"); e.gameQuote("mSpell.DataValues.DRDurationTooltipOnly.values: [2.5,2.5,2.5,2.5,2.5,2.5,2.5]");
    const rDamage = r.formula("Total Magic Damage"), rDuration = r.quoted("up to 1.5 seconds"), rInterval = r.quoted("every 0.25 seconds"), rHits = r.quoted("total of 6 damage instances"), rOnHits = r.quoted("effects 3 times"), rLargeNumerator = r.quoted("2/9ths", 0), rDenominator = r.quoted("2/9ths", 1), rSmallNumerator = r.quoted("1/9ths", 0), rRangeScale = r.quoted("250% movement speed") / 100, rHistory = r.quoted("last 2.5 seconds"), rSample = r.quoted("every 0.25 seconds"), rRadius = r.field("collisionRadius"), rCD = r.cooldown(), rCost = r.cost(), rCast = r.castTime(), rHeal = r.quoted("heals for 100%") / 100;
    r.quote("will not start the channel"); r.quote("Spell shield will not prevent"); r.quote("continue to strike but not deal any damage"); r.quote("at the start of the cast time"); r.gameQuote("mSpell.mCastTime:0.10000000149011612"); r.gameQuote("mSpell.spellCastTime:0.25"); r.gameQuote("mSpell.missileSpeed:0.0");
    const passive: Effect = { type: "damage", damageType: "magic", amount: pDamage, label: p.name, noLifeSteal: true, petDamageCategory: "proc" };
    const bodies = (ctx: HookContext): Body[] => [{ target: ctx.world.units[1 - ctx.self.side]! }, ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const champion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion" || target.spec.unitClass === "clone";
    const mark = (ctx: HookContext, target: Unit, key: string, duration = FOREVER) => {
      const prior = target.statuses.find(s => s.key === key && s.source === ctx.self.side);
      if (prior) prior.endTick = ctx.tick + ticks(duration);
      else target.statuses.push({ kind: "mark", key, source: ctx.self.side, value: 1, startTick: ctx.tick, endTick: ctx.tick + ticks(duration) });
    };
    const marked = (ctx: HookContext, target: Unit, key: string) => target.statuses.some(s => s.key === key && s.source === ctx.self.side && s.endTick > ctx.tick);
    const hunted = (ctx: HookContext, target: Unit) => marked(ctx, target, ACTIVE) || marked(ctx, target, HUNT) && target.hp / derive(target).maxHp <= wThreshold;
    const qualifies = (ctx: HookContext, target: Unit) => target.hp / derive(target).maxHp < wThreshold || marked(ctx, target, ACTIVE);
    const frenzy = (ctx: HookContext, refresh: boolean) => {
      if (!qualifies(ctx, ctx.enemy)) return;
      const current = ctx.self.statuses.find(s => s.memoKey === "buff:warwick:frenzy" && s.endTick > ctx.tick);
      if (!refresh && current) return;
      ctx.buff("warwick:frenzy", "attackSpeed", wAS * (ctx.enemy.hp / derive(ctx.enemy).maxHp < wLow ? wDouble : 1), wASDuration);
    };
    const hit = (ctx: HookContext, body: Body, spell: AbilitySpec) => body.pet ? abilityHitPet(ctx.world, ctx.self, body.pet, spell, spell.onHit ?? [], "singleTarget") : abilityHit(ctx.world, ctx.self, body.target, spell, spell.onHit ?? []);
    const startCooldown = (ctx: HookContext, key: string, seconds: number) => { delete ctx.self.cooldownHeld[key]; ctx.self.cooldownReady[key] = ctx.tick + ticks(cooldownAfterHaste(seconds, derive(ctx.self).abilityHaste)); };
    const endJaw = (ctx: HookContext) => { ctx.memory["warwick:jaw"] = false; ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== "warwick:jawImmune"); startCooldown(ctx, "Q", qCD); };
    const range = (self: Unit) => Number(self.memory["warwick:rRange"] ?? derive(self).moveSpeed * rRangeScale);
    const internal = (key: string, name: string, effects: Effect[], flags: AbilitySpec["flags"] = {}): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { petContactHooks: true, ...flags }, onHit: effects, usable: () => false });
    const bite = internal("Qbite", q.name, [{ type: "damage", damageType: "magic", amount: qDamage, amountFor: (self, target) => Math.min(evaluate(qDamage, self, target), target.spec.targetClass === "monster" ? evaluate(qCap, self, target) : Infinity) }], { parry: true, basicDamage: true, appliesLifeSteal: true, spellShield: true }); bite.persistsAfterDeath = true;
    const fear = internal("Efear", e.name, [{ type: "cc", cc: "fear", duration: eFear }, { type: "cc", cc: "slow", duration: eFear, strength: eSlow }], { spellShield: true });
    const duress = internal("Rattach", r.name, [{ type: "disrupt" }, { type: "cc", cc: "suppression", duration: rDuration }, { type: "state", state: "revealed", duration: rDuration, revealWhileCC: "suppression" }], { spellShield: true, requiresCC: "suppression" });
    const strike = internal("Rstrike", r.name, [{ type: "damage", damageType: "magic", amount: rDamage }], { spellShield: false, parry: true, basicDamage: true, appliesLifeSteal: true });
    const pulse = internal("Rpulse", r.name, [{ type: "damage", damageType: "magic", amount: rDamage }], { spellShield: false, parry: true, basicDamage: true, appliesLifeSteal: true });
    const roar = (ctx: HookContext, retainReduction: boolean, lock: boolean) => {
      if (!ctx.memory[EBUFF] || ctx.memory["warwick:howled"]) return;
      ctx.memory["warwick:howled"] = true; ctx.self.attackReadyTick = ctx.tick;
      for (const body of bodies(ctx)) if (body.target.alive && Math.abs(body.target.x - ctx.self.x) <= eRadius + body.target.spec.base.radius + EPSILON && !body.pet?.spec.hitPoints) hit(ctx, body, fear);
      if (!retainReduction) { ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== EBUFF); ctx.memory[EBUFF] = false; startCooldown(ctx, "E", eCD); }
      if (lock) ctx.self.action = { kind: "cast", ability: "Elock", startTick: ctx.tick, endTick: ctx.tick + ticks(eLockout) };
    };
    const finishR = (ctx: HookContext) => {
      const id = Number(ctx.memory["warwick:rTarget"] ?? -2), body = id < 0 ? { target: ctx.world.units[1 - ctx.self.side]! } : bodies(ctx).find(b => b.pet?.id === id);
      if (body) { body.target.statuses = body.target.statuses.filter(s => !(s.source === ctx.self.side && s.ability === "Rattach")); if (body.pet) body.pet.statuses = body.target.statuses; }
      ctx.memory[RLOCK] = false;
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "R") ctx.self.action = undefined;
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: qCost, castTime: q.castTime(), cooldownAfter: "dash", delivery: { kind: "target", range: qRange }, roles: ["damage", "engage"], flags: { grounded: false }, estimate: (self, target) => evaluate(qDamage, self, target) + evaluate(pDamage, self), estimateDelay: () => qDelay, usable: self => !self.memory["warwick:jaw"] },
      { key: "Qhold", name: `${q.name} (hold)`, slot: "Q", cooldown: qCD, cooldownKey: "Q", budgetExcluded: true, cost: qCost, castTime: q.castTime(), cooldownAfter: "dash", delivery: { kind: "target", range: qRange }, flags: { grounded: true }, roles: ["damage", "engage"], usable: self => !self.memory["warwick:jaw"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: wCost, castTime: wCast, delivery: { kind: "self" }, roles: ["buff"], usable: self => !self.memory["warwick:jaw"] },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: eCost, castTime: e.castTime(), cooldownAfter: "state", overlay: true, overlayResumedDash: true, overlayChannels: ["Qhold"], delivery: { kind: "self" }, onSelf: [{ type: "state", state: "damageReduction", duration: eDuration, value: eReduction }], roles: ["defense"], usable: self => !self.memory[EBUFF] },
      { key: "E2", name: `${e.name} (recast)`, slot: "E", cooldown: 0, castTime: 0, activation: "internal", budgetExcluded: true, delivery: { kind: "self" }, overlay: true, overlayResumedDash: true, usable: (self, world) => !!self.memory[EBUFF] && !self.memory["warwick:howled"] && world.tick >= Number(self.memory["warwick:eStart"]) + ticks(eDelay), roles: ["cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: rCost, castTime: rCast, castDirection: "start", cooldownAtCastStart: true, delivery: { kind: "self" }, channel: { duration: rDuration, manualStart: true, interruptible: true }, flags: { grounded: true }, onCastStart: [{ type: "state", state: "ccImmune", duration: FOREVER }], roles: ["engage", "damage", "cc"], estimate: (self, target) => evaluate(rDamage, self, target) + rOnHits * evaluate(pDamage, self), usable: (self, world) => !self.memory["warwick:jaw"] && !self.memory[RLOCK] && Math.abs(world.units[1 - self.side]!.x - self.x) <= range(self) + rRadius + world.units[1 - self.side]!.spec.base.radius },
      bite, fear, duress, strike, pulse, internal("Elock", e.name, []),
    ];
    const behavior: Behavior = view => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return normal;
      const ready = (key: string) => canCast(view.world, view.self, abilities.find(a => a.key === key)!);
      if (ready("E") && (view.distance <= eRadius || view.threats.some(threat => threat.damage > 0 && threat.eta <= ticks(eDuration)))) return { kind: "cast", ability: "E" };
      if (view.self.action) return normal;
      if (ready("E2") && view.distance <= eRadius) return { kind: "cast", ability: "E2" };
      if (view.mode === "flee") return normal;
      if (ready("W") && view.enemy.alive && Math.abs(view.enemy.x - view.self.x) <= wRadius) return { kind: "cast", ability: "W" };
      if (view.mode !== "hold" && view.mode !== "trade" && ready("R")) return { kind: "cast", ability: "R" };
      if (normal?.kind === "cast" && normal.ability === "R" && (view.mode === "hold" || view.mode === "trade")) return { kind: "move", direction: view.mode === "hold" ? 0 : 1 };
      if (normal?.kind === "cast" && normal.ability === "Q" && view.mode !== "hold" && view.mode !== "trade" && ready("Qhold")) return { kind: "cast", ability: "Qhold" };
      return normal;
    };
    kit.assume("Eternal Hunger uses the primary's explicit level20 value60.7647058823529+15%bonusAD+10%AP, precedes ordinary basic damage, and heals100% of its own post-mitigation damage only below50%HP or250% below25%. No fabricated farm or prior attacks. Damage-based healing uses the pre-late-Riposte packet under its explicit vamp rule; denied health/shield damage does not fabricate combat or hunt events. Real pet basics opt into attached on-hits; hit-count objects retain their sourced proc immunity.");
    kit.assume("Q uses raw pinned rutngt0.2475 bite delay (8 simulation ticks), retaining parsed0.264 text unchanged. The independent bite survives caster death/resurrection, has ordinary spell/attack guards, applies passive before its own packet, and heals75% only from its own damage. Tap and hold track arbitrary target movement with displacement immunity. The distance-proportional lunge lasts at most0.5seconds; hold remains0.5seconds after bite, extends during target dash/displacement, and lands behind the target. Root/ground deny initiating hold but preserve tap and do not interrupt an existing hold. Other channel-interrupting CC ends attachment while preserving the committed bite. Cooldown starts after attachment; tap refunds it if the target dies before bite, without refunding mana.");
    kit.assume("Blood Hunt uses actual below50%/below25% thresholds and110%/220%AS for1.25seconds. Attack initiation only grants a missing buff; qualifying damage refreshes it. Own actual champion damage marks a trail; no allied minions or history are invented. The active senses the nearest actual champion-class body/clone within4000 from cast-start position for8seconds; empty search reduces cooldown30%. Following a real mark grants65%/130%MS while facing it. Actual champion damage dealt/received removes trailMS for0.5seconds and rebuilds it over3.5seconds; pet and minion combat is excluded unless the actual target is champion class. Obscured trails never legalize targeting invisible units. The stale20% blurb and binary3000 search range are retained but not used.");
    kit.assume("Primal Howl grants55%damage reduction up to2.75seconds, gated manual recast after1second, automatic expiry, independent375-radius1secondfear/90%slow contacts, and a0.25second recast lockout that cancels attacks and resets their timer. Manual recast is a cast; expiry/R-triggered roar is not. Starting a real accepted R channel automatically howls but retains reduction to original expiry. Binary2.5 tooltip duration conflicts with the primary2.75.");
    kit.assume("R range is250% of the average observed movement-speed samples in the preceding2.5seconds, sampled every0.25seconds with the existing30Hz clock; startup uses observed samples only. The pinned sources provide no finite dash speed (binary missileSpeed0 is not a dash speed). Flight is explicitly projected as one swept movement step after the0.1second cast, crossing terrain and contacting the first actual champion-class body/clone, including overlap via directionTo. Flight CC immunity starts at cast declaration and ends at collision. Shield/CC-immunity at contact prevents channel. Accepted channel suppresses/reveals for1.5seconds and attempts six packets at0/.25/.5/.75/1/1.25seconds: alternating2/9 and1/9 of525+167%bonusAD; the three larger contacts trigger on-hit/on-attack effects. Each own damage packet during the channel heals100% post-mitigation and the R packets also apply life steal. A later spellshield cannot block established ticks; cleansing suppression leaves the channel striking without damage. Interrupting casterCC, stasis, death/resurrection or targetdeath/resurrection ends remaining contacts. Singed-specific immunity, zombie0.5second cutoff and unsourced slide timing are unavailable; no generic channel CC immunity is asserted.");
    return { abilities, behavior, attack: { onHit: [passive], onHitBeforeDamage: true, onHitToPets: true },
      budget: { damage(self, target) { const haste = 1 + derive(self).abilityHaste / 100; return { magic: evaluate(pDamage, self) * (haste / qCD + rOnHits * haste / rCD) + evaluate(qDamage, self, target) * haste / qCD + evaluate(rDamage, self, target) * haste / rCD }; }, healing(self, target) { return evaluate(qDamage, self, target) * qHeal * (1 + derive(self).abilityHaste / 100) / qCD; } },
      hooks: {
        onStart(ctx) { ctx.memory["warwick:rRange"] = derive(ctx.self).moveSpeed * rRangeScale; },
        onAttack(ctx) { frenzy(ctx, false); },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key !== "Qbite" && ctx.ability.key !== "Rstrike") return;
          if (hasState(ctx.enemy, "blockAttacks") || hasState(ctx.enemy, "dodgeAttacks") || hasState(ctx.self, "blind")) return;
          for (const effect of ctx.self.spec.attack.onHit ?? []) applyEffect(ctx.world, ctx.self, ctx.enemy, effect, { scale: ctx.scale });
          frenzy(ctx, true); notifyIncomingOnHit(ctx.world, ctx.enemy, ctx.ability, ctx.self, ctx.scale);
        },
        onAbilityContact(ctx) {
          // Riposte skips beforeAbilityHit, but damage on-hits still resolve before
          // the triggering packet for shields and vamp. It denies their debuffs.
          if (ctx.defense !== "parry" || ctx.ability.key !== "Qbite" && ctx.ability.key !== "Rstrike") return;
          if (hasState(ctx.enemy, "blockAttacks") || hasState(ctx.enemy, "dodgeAttacks") || hasState(ctx.self, "blind")) return;
          for (const effect of ctx.self.spec.attack.onHit ?? []) if (effect.type === "damage") applyEffect(ctx.world, ctx.self, ctx.enemy, effect, { scale: ctx.scale });
        },
        onDamageObserved(ctx) {
          if (ctx.source === ctx.self) {
            const valid = !ctx.targetPet?.spec.hitPoints && !ctx.targetPet?.spec.fixedDamage && !ctx.targetPet?.spec.diesToChampionAttack && !inStasis(ctx.target);
            if (valid && ctx.ability === p.name) { const fraction = ctx.self.hp / derive(ctx.self).maxHp; if (fraction < pThreshold) heal(ctx.world, ctx.self, ctx.mitigated * (fraction < pLow ? pEmpowered : pHeal)); }
            if (valid && ctx.ability === q.name) heal(ctx.world, ctx.self, ctx.mitigated * qHeal);
            if (valid && ctx.memory[RLOCK] && Number(ctx.memory["warwick:rTarget"]) === (ctx.target.petId ?? -1)) heal(ctx.world, ctx.self, ctx.mitigated * rHeal);
            if (ctx.amount + ctx.absorbed <= 0) return;
            if (ctx.attack || ctx.ability) frenzy({ ...ctx, enemy: ctx.target }, true);
            if (champion(ctx.target)) { ctx.memory["warwick:combat"] = ctx.tick; if (ctx.target.hp / derive(ctx.target).maxHp < wThreshold) ctx.memory[`warwick:hunted:${ctx.target.petId ?? -1}`] = true; }
          }
          if (ctx.target === ctx.self && ctx.amount + ctx.absorbed > 0 && champion(ctx.source)) ctx.memory["warwick:combat"] = ctx.tick;
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "W") { const body = bodies(ctx).filter(b => champion(b.target) && b.target.alive && Math.abs(b.target.x - ctx.self.x) <= wRadius).sort((a, b) => Math.abs(a.target.x - ctx.self.x) - Math.abs(b.target.x - ctx.self.x) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1))[0]; ctx.memory["warwick:wTarget"] = body ? body.pet?.id ?? -1 : -2; }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "Qhold") {
            const hold = key === "Qhold", duration = hold ? qDelay + qHold : Math.max(qDelay, qMaxLunge * Math.abs(ctx.enemy.x - ctx.self.x) / qRange);
            ctx.memory["warwick:jaw"] = true; ctx.memory["warwick:jawHold"] = hold; ctx.memory["warwick:jawDirection"] = directionTo(ctx.self, ctx.enemy); ctx.memory["warwick:jawEnd"] = ctx.tick + ticks(duration);
            ctx.self.statuses.push({ kind: "state", key: "displacementImmune", value: 0, source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, memoKey: "warwick:jawImmune" });
            ctx.self.action = { kind: "dash", ability: key, startTick: ctx.tick, endTick: ctx.tick + ticks(duration), perTick: 0, stopAtContact: false, crossTerrain: true, unstoppable: true };
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Qbite", seenTick: ctx.tick, impactTick: ctx.tick + ticks(qDelay), x: ctx.self.x, direction: directionTo(ctx.self, ctx.enemy), perTick: 0, homing: false, piercing: true, travelLeft: Infinity, projectile: false, connects: true, scale: 1, onHit: [] });
          }
          if (key === "W") { const id = Number(ctx.memory["warwick:wTarget"]), body = bodies(ctx).find(b => (b.pet?.id ?? -1) === id); if (body?.target.alive) { mark(ctx, body.target, ACTIVE, wDuration); if (body.pet) body.pet.statuses = body.target.statuses; } else ctx.self.cooldownReady.W = ctx.tick + ticks(cooldownAfterHaste(wCD * (1 - wRefund), derive(ctx.self).abilityHaste)); }
          if (key === "E") { ctx.memory[EBUFF] = true; ctx.memory["warwick:howled"] = false; ctx.memory["warwick:eStart"] = ctx.tick; const status = ctx.self.statuses.findLast(s => s.key === "damageReduction" && s.ability === "E"); if (status) status.memoKey = EBUFF; }
          if (key === "E2") roar(ctx, false, true);
          if (key === "R") { ctx.memory["warwick:rDirection"] = Number(ctx.memory["castDirection:R"] ?? directionTo(ctx.self, ctx.enemy)); ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: ctx.tick + 1, perTick: Number(ctx.memory["warwick:rDirection"]) * range(ctx.self), stopAtContact: false, crossTerrain: true, unstoppable: true }; }
        },
        onMissileTick(ctx) {
          if (ctx.missile.source !== "Qbite" || ctx.tick < ctx.missile.impactTick!) return;
          ctx.missile.ended = true;
          if (!ctx.enemy.alive || ctx.enemy.hp <= 0) { if (!ctx.memory["warwick:jawHold"]) { delete ctx.self.cooldownHeld.Q; ctx.self.cooldownReady.Q = ctx.tick; ctx.memory["warwick:qRefund"] = true; } return; }
          abilityHit(ctx.world, ctx.self, ctx.enemy, bite, bite.onHit!);
        },
        onDashTick(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qhold") {
            if (!ctx.self.alive || ctx.self.resurrection || !ctx.enemy.alive) { ctx.self.action = undefined; endJaw(ctx); return; }
            const hold = !!ctx.memory["warwick:jawHold"], direction = Number(ctx.memory["warwick:jawDirection"]), range = ctx.self.spec.attack.range, target = hold ? ctx.enemy.x + direction * (range + ctx.enemy.spec.base.radius) : ctx.enemy.x - direction * Math.min(range, Math.abs(ctx.enemy.x - ctx.self.x));
            if (hold && ctx.tick >= Number(ctx.memory["warwick:jawEnd"]) && (ctx.enemy.action?.kind === "dash" || ctx.enemy.forced)) ctx.action.endTick = ctx.tick + 1;
            const remaining = Math.max(1, ctx.action.endTick - ctx.tick + 1); ctx.action.perTick = (target - ctx.self.x) / remaining;
          }
          if (ctx.ability.key === "R") {
            if (inStasis(ctx.self) || ctx.self.resurrection) { ctx.self.action = undefined; ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.key === "ccImmune")); return; }
            const direction = Number(ctx.memory["warwick:rDirection"]) as 1 | -1, distance = Math.abs(ctx.action.perTick);
            const candidates = bodies(ctx).filter(b => champion(b.target) && b.target.alive && !isUntargetable(b.target, ctx.self) && Math.max(0, direction * (b.target.x - ctx.self.x) - rRadius - b.target.spec.base.radius) <= distance && direction * (b.target.x - ctx.self.x) >= -rRadius - b.target.spec.base.radius);
            candidates.sort((a,b) => Math.max(0, direction*(a.target.x-ctx.self.x)-rRadius-a.target.spec.base.radius) - Math.max(0,direction*(b.target.x-ctx.self.x)-rRadius-b.target.spec.base.radius) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
            const body = candidates[0]; if (!body) return;
            ctx.action.perTick = direction * Math.max(0, direction * (body.target.x - ctx.self.x) - rRadius - body.target.spec.base.radius);
            ctx.memory["warwick:rTarget"] = body.pet?.id ?? -1; ctx.memory["warwick:rContact"] = true;
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qhold") { const refund = !!ctx.memory["warwick:qRefund"]; endJaw(ctx); if (refund) { ctx.self.cooldownReady.Q = ctx.tick; delete ctx.memory["warwick:qRefund"]; } }
          if (ctx.ability.key !== "R") return;
          ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.key === "ccImmune"));
          if (ctx.interrupted || !ctx.memory["warwick:rContact"]) return;
          delete ctx.memory["warwick:rContact"];
          const body = bodies(ctx).find(b => (b.pet?.id ?? -1) === Number(ctx.memory["warwick:rTarget"])); if (!body) return;
          hit(ctx, body, duress);
          const target = body.pet ? petFormulaTarget(body.pet, ctx.self, ctx.tick) : body.target;
          if (!target.statuses.some(s => s.key === "suppression" && s.ability === "Rattach" && s.source === ctx.self.side)) return;
          ctx.memory[RLOCK] = true; ctx.memory["warwick:rStart"] = ctx.tick; ctx.memory["warwick:rNext"] = 0;
          ctx.self.action = { kind: "channel", ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rDuration), nextTick: Infinity, intervalTicks: Infinity };
          applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "revealed", duration: rDuration }, { scale: 1 });
          roar(ctx, true, false);
        },
        onCCApplied(ctx) { const action = ctx.self.action; if (action?.kind === "dash" && (action.ability === "Q" || action.ability === "Qhold") && CC_RULES[ctx.cc].interruptsChannels === "yes") { ctx.self.action = undefined; endJaw(ctx); } },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") finishR(ctx); },
        onTargetResurrection(ctx) { if (ctx.memory[RLOCK]) finishR(ctx); },
        onTick(ctx) {
          if (ctx.memory[EBUFF] && ctx.self.resurrection) roar(ctx, false, false);
          if (ctx.memory[EBUFF] && ctx.tick >= Number(ctx.memory["warwick:eStart"]) + ticks(eDuration)) { roar(ctx, false, !ctx.memory[RLOCK]); ctx.memory[EBUFF] = false; startCooldown(ctx, "E", eCD); }
          if (ctx.memory["warwick:jaw"] && ctx.self.action?.kind !== "dash") endJaw(ctx);
          let speed = 0;
          for (const body of bodies(ctx)) {
            const target = body.target;
            if (ctx.memory[`warwick:hunted:${target.petId ?? -1}`]) mark(ctx, target, HUNT);
            if (target.hp / derive(target).maxHp > wThreshold) { target.statuses = target.statuses.filter(s => !(s.key === HUNT && s.source === ctx.self.side)); delete ctx.memory[`warwick:hunted:${target.petId ?? -1}`]; }
            if (target.alive && champion(target) && hunted(ctx, target) && (ctx.self.facing ?? directionTo(ctx.self, target)) === directionTo(ctx.self, target)) speed = Math.max(speed, wMS * (target.hp / derive(target).maxHp < wLow ? wDouble : 1));
            if (body.pet) body.pet.statuses = target.statuses;
          }
          const sinceCombat = (ctx.tick - Number(ctx.memory["warwick:combat"] ?? -Infinity)) / 30;
          speed *= Math.min(1, Math.max(0, (sinceCombat - wLost) / wBuild));
          ctx.buff("warwick:trail", "moveSpeedPercent", speed, 2 / 30);
          if (ctx.tick >= Number(ctx.memory["warwick:sampleNext"] ?? 0)) {
            const count = Math.min(Math.round(rHistory / rSample), Number(ctx.memory["warwick:sampleCount"] ?? 0) + 1), index = Number(ctx.memory["warwick:sampleIndex"] ?? 0);
            ctx.memory[`warwick:sample:${index}`] = derive(ctx.self).moveSpeed; ctx.memory["warwick:sampleIndex"] = (index + 1) % Math.round(rHistory / rSample); ctx.memory["warwick:sampleCount"] = count; ctx.memory["warwick:sampleNext"] = ctx.tick + ticks(rSample);
            let total = 0; for (let i = 0; i < count; i++) total += Number(ctx.memory[`warwick:sample:${i}`]); ctx.memory["warwick:rRange"] = total / count * rRangeScale;
          }
          if (!ctx.memory[RLOCK]) return;
          const body = bodies(ctx).find(b => (b.pet?.id ?? -1) === Number(ctx.memory["warwick:rTarget"]));
          if (!body || !body.target.alive || ctx.self.resurrection || inStasis(ctx.self) || ctx.self.action?.kind !== "channel" || ctx.self.action.ability !== "R" || ctx.tick >= Number(ctx.memory["warwick:rStart"]) + ticks(rDuration)) { finishR(ctx); return; }
          let next = Number(ctx.memory["warwick:rNext"]);
          while (next < rHits && ctx.tick >= Number(ctx.memory["warwick:rStart"]) + ticks(next * rInterval)) {
            ctx.memory["warwick:rNext"] = ++next;
            if (!body.target.statuses.some(s => s.key === "suppression" && s.source === ctx.self.side && s.ability === "Rattach" && s.endTick > ctx.tick)) continue;
            const spell = (next - 1) % 2 === 0 ? strike : pulse, amount = scaled(rDamage, ((next - 1) % 2 === 0 ? rLargeNumerator : rSmallNumerator) / rDenominator);
            const contact = { ...spell, onHit: [{ type: "damage" as const, damageType: "magic" as const, amount }] };
            hit(ctx, body, contact);
            if (!ctx.memory[RLOCK]) break;
          }
        },
      },
    };
  },
};
export default warwick;
