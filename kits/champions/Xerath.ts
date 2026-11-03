/** Xerath: mobile charge, actual-distance stun and finite, independently aimed barrage shots. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, EPSILON, resolveSkillshot } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { seriesAt, ticks } from "./util";

const CHARGE = "xerath:charge", RITE = "xerath:rite", SLOW = "xerath:qSlow", W_SLOW = "xerath:wSlow";
const xerath: KitModule = {
  champion: "Xerath",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pCD = p.field("staticCooldown"), pMana = p.levelValue("restore 30"), pChampionMana = p.levelValue("restore 30", 1), pKillRefund = p.quoted("reduced by 3.5 seconds");
    p.quote("does not trigger if Xerath would restore above his maximum mana"); p.quote("trigger even if the attack is blocked, but not if it misses due to blind");
    const missileSpeed = p.gameQuoted("mSpell.missileSpeed: 2000.0");
    const qCD = q.cooldown(), qCost = q.cost(), qDuration = q.quoted("for up to 3 seconds"), qDelay = q.quoted("unable to act for 0.528"), qRefund = q.number("Mana Refunded");
    const qDamage = q.formula("Magic Damage"), qWidth = q.field("width"), qRanges = q.record.fields.range;
    if (typeof qRanges !== "object" || !qRanges.values[0]?.series) throw new Error("Xerath Q range series is missing");
    // Record the whole field through KitContext, then retain its parsed series for the actual charge age.
    q.fieldNumbers("range");
    const qRangeSeries = qRanges.values[0].series, qSlowSeries = q.seriesIn("slowed by"), qFull = q.quoted("over the first 1.5 to 1.75 seconds", 1), qMaximum = seriesAt(qRangeSeries, qFull, false);
    q.textField("cooldownStart"); q.quote("cancelled and refunds half the mana cost");
    q.quote("{{ct|charge|attack=false|move=true|cast=false");
    q.quote("{{ct|attack=false|move=false|cast=false|items=false,true|consume=true|spells=true,false,false,false,false|interrupts=death}}");
    q.quote("dies during the 0.528 recast delay");
    const wCD = w.cooldown(), wCast = w.castTime(), wCost = w.cost(), wRange = w.field("targetRange"), wRadius = w.field("effectRadius", "Effect radius"), wInner = w.field("effectRadius", "Inner radius"), wDelay = w.quoted("after 0.528"), wSlow = w.quoted("slowing them by 25%") / 100, wSeconds = w.quoted("for 2.5 seconds");
    const wDamage = w.formula("Magic Damage"), wSweet = w.formula("Increased Damage"), wSweetSlow = w.fraction("Increased Slow");
    const wRevealDistance = w.quoted("within 100 units"), wRevealSeconds = w.quoted("radius for 4.5 seconds");
    w.quote("decaying to 25% over the duration"); w.quote("dies during the 0.25s cast time"); w.quote("valid enemy at the start of the cast time");
    const eDamage = e.formula("Magic Damage"), eRange = e.field("range"), eWidth = e.field("width"), eSpeed = e.field("speed"), eStuns = e.seriesIn("stuns them for");
    const rCD = r.cooldown(), rCost = r.cost(), rDuration = r.quoted("for up to 10 seconds"), rFirst = r.quoted("after 0.5 seconds"), rDelay = r.quoted("after a 0.627 delay"), rInterval = r.quoted("static cooldown of 0.627"), rShots = r.number("Number of Recasts"), rMaxStacks = r.number("Maximum Stacks"), rDamage = r.formula("Magic Damage"), rStackDamage = r.formula("Increased Damage per Stack"), rRange = r.field("targetRange"), rRadius = r.field("effectRadius"), rMoveLock = r.quoted("first {{fd|1.25}} seconds");
    r.textField("cooldownStart"); r.quote("half of its cooldown is refunded"); r.quote("Only successive casts of the ability will benefit"); r.quote("Each cast counts as an ability activation"); r.quote("{{ct|channel|cast=false|attack=interrupts|move=Disabled");

    const settleCooldown = (ctx: HookContext, key: string, seconds: number, fraction = 1) => {
      const pending = ctx.self.pendingRefunds[key];
      const full = ticks(cooldownAfterHaste(seconds, derive(ctx.self).abilityHaste));
      delete ctx.self.cooldownHeld[key]; delete ctx.self.pendingRefunds[key];
      ctx.self.cooldownReady[key] = ctx.tick + Math.max(0, Math.round(full * fraction) - ticks(pending?.seconds ?? 0) - Math.round(full * (pending?.fraction ?? 0)));
    };
    const finishQ = (ctx: HookContext, refund: boolean, release = false) => {
      if (ctx.memory[CHARGE] === undefined) return;
      const age = Math.max(0, (ctx.tick - Number(ctx.memory[CHARGE])) / 30);
      ctx.memory["xerath:qRange"] = seriesAt(qRangeSeries, age, false);
      delete ctx.memory[CHARGE]; delete ctx.self.chains.Q;
      ctx.self.statuses = ctx.self.statuses.filter(s => s.memoKey !== SLOW);
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "Q") ctx.self.action = undefined;
      if (release) {
        ctx.memory["xerath:qReleasing"] = true;
        ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === "state" && s.key === "lingering" && s.ability === "Q"));
        ctx.self.statuses.push({ kind: "state", key: "lingering", source: ctx.self.side, ability: "Q", startTick: ctx.tick, endTick: ctx.tick + ticks(qDelay), value: 1 });
      } else {
        ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === "state" && s.key === "lingering" && s.ability === "Q"));
        settleCooldown(ctx, "Q", qCD);
      }
      if (refund) ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + qRefund);
    };
    const finishR = (ctx: HookContext) => {
      if (ctx.memory[RITE] === undefined) return;
      const used = Number(ctx.memory["xerath:rUsed"] ?? 0);
      delete ctx.memory[RITE]; delete ctx.memory["xerath:rStacks"];
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "R") ctx.self.action = undefined;
      settleCooldown(ctx, "R", rCD, used === 0 ? 1 / 2 : 1);
    };
    const surge = (ctx: HookContext, champion: boolean, scale: number) => {
      if (ctx.tick < Number(ctx.memory["xerath:surgeReady"] ?? 0)) return;
      const amount = (champion ? pChampionMana : pMana) * scale;
      if (ctx.self.resource + amount > derive(ctx.self).maxResource + EPSILON) return;
      ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + amount);
      ctx.memory["xerath:surgeReady"] = ctx.tick + ticks(pCD);
    };
    const add = (a: Formula, b: Formula, times: number): Formula => ({ base: a.base + b.base * times, ratios: Object.fromEntries([...new Set([...Object.keys(a.ratios ?? {}), ...Object.keys(b.ratios ?? {})])].map(key => [key, (a.ratios?.[key as keyof NonNullable<Formula["ratios"]>] ?? 0) + (b.ratios?.[key as keyof NonNullable<Formula["ratios"]>] ?? 0) * times])) });
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: qCost, castTime: q.castTime(), cooldownAfter: "state", delivery: { kind: "self" }, onSelf: [{ type: "state", state: "lingering", duration: qDuration }], channel: { duration: qDuration, interruptible: true, mobile: true }, estimate: (self, target) => evaluate(qDamage, self, target), estimateDelay: () => qFull + qDelay, budgetExcluded: true, roles: ["damage"] },
      { key: "Q2", name: `${q.name} (release)`, slot: "Q", cooldown: 0, castTime: qDelay, chain: { root: "Q", index: 2, window: qDuration }, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }], flags: { projectile: false, spellShield: q.flag("spellShield"), petContactHooks: true }, budgetExcluded: true, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: wCost, castTime: wCast, captureGroundAim: "start", delivery: { kind: "circle", range: wRange, radius: wRadius, delay: wDelay }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "slow", duration: wSeconds, strength: wSlow }], flags: { projectile: false, spellShield: w.flag("spellShield"), petContactHooks: true }, persistsAfterDeath: true, roles: ["damage", "cc"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "line", range: eRange, width: eWidth, radius: eWidth / 2, speed: eSpeed, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }, { type: "cc", cc: "stun", duration: seriesAt(eStuns, 0, false) }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield"), petContactHooks: true }, decisive: true, persistsAfterDeath: true, roles: ["damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: rCost, castTime: r.castTime(), cooldownAfter: "channel", delivery: { kind: "self" }, channel: { duration: rDuration, interruptible: true, cancelAfter: rMoveLock, cancelAttackAfter: 0, cancelAttackOtherAfter: 0 }, estimate: (self, target) => evaluate(rDamage, self, target) * rShots, estimateDelay: () => rFirst + rDelay, budgetExcluded: true, roles: ["damage"] },
      { key: "R2", name: `${r.name} (Arcane Barrage)`, slot: "R", activation: "internal", cooldown: rInterval, staticCooldown: true, castTime: 0, overlay: true, overlayChannels: ["R"], delivery: { kind: "circle", range: rRange, radius: rRadius, delay: rDelay }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }], flags: { projectile: false, spellShield: r.flag("spellShield"), petContactHooks: true }, usable: (self, world) => self.action?.kind === "channel" && self.action.ability === "R" && self.memory[RITE] !== undefined && world.tick >= Number(self.memory[RITE]) + ticks(rFirst) && Number(self.memory["xerath:rUsed"] ?? 0) < rShots, persistsAfterDeath: true, budgetExcluded: true, roles: ["damage"] },
      { key: "Rend", name: `${r.name} (cancel)`, slot: "other", activation: "internal", countsAsCast: false, cooldown: 0, castTime: 0, allowedDuringChannel: ["R"], delivery: { kind: "self" }, usable: (self, world) => self.memory[RITE] !== undefined && world.tick >= Number(self.memory[RITE]) + ticks(rMoveLock), budgetExcluded: true, roles: [] },
    ];
    const behavior: Behavior = view => {
      const { self, enemy, world } = view;
      if (view.mode === "idle") return defaultBehavior(view);
      if (self.memory[CHARGE] !== undefined) {
        const age = (world.tick - Number(self.memory[CHARGE])) / 30, range = seriesAt(qRangeSeries, age, false);
        // The beam's damage is constant: release as soon as the actual target is reachable.
        if (Math.abs(enemy.x - self.x) <= range + enemy.spec.base.radius + EPSILON && canCast(world, self, abilities[1]!)) return { kind: "cast", ability: "Q2" };
        return { kind: "move", direction: view.mode === "flee" || self.memory.tradeDone ? -1 : Math.abs(enemy.x - self.x) > qMaximum + enemy.spec.base.radius ? 1 : 0 };
      }
      if (self.memory[RITE] !== undefined && self.action?.kind === "channel" && self.action.ability === "R") {
        if (view.mode === "flee" || self.memory.tradeDone) return canCast(world, self, abilities[6]!) ? { kind: "cast", ability: "Rend" } : undefined;
        if (Math.abs(enemy.x - self.x) <= rRange + rRadius + enemy.spec.base.radius + EPSILON && canCast(world, self, abilities[5]!)) return { kind: "cast", ability: "R2" };
        return undefined;
      }
      const ordinary = defaultBehavior(view);
      if (ordinary?.kind === "cast" && ordinary.ability === "R" && Math.abs(enemy.x - self.x) > rRange + rRadius + enemy.spec.base.radius + EPSILON) return { kind: "move", direction: 1 };
      if (!self.action && !self.memory.tradeDone && ["fight", "trade", "kite"].includes(view.mode) && Math.abs(enemy.x - self.x) <= qMaximum + enemy.spec.base.radius + EPSILON && canCast(world, self, abilities[0]!)) {
        if (ordinary?.kind !== "cast" || ordinary.ability === "R") return { kind: "cast", ability: "Q" };
      }
      return ordinary;
    };
    const decaySlow = (unit: Unit, tick: number) => {
      for (const status of unit.statuses) if (status.memoKey === W_SLOW && status.endTick > tick) status.value = wSlow + (wSweetSlow - wSlow) * Math.max(0, (status.endTick - tick) / ticks(wSeconds));
    };
    kit.assume("Mana Surge starts ready but never grants mana unless an actual connected attack can restore its complete sourced amount without exceeding maximum mana. Level 20 uses 225 against nonchampions and 450 against champions from the full wiki progression. Ordinary damage blocks still trigger; blind, dodge, parry and untargetability do not. The raw primary marks dodge interactions pending for test; retaining ordinary dodge denial is an explicit unresolved interaction, rather than verified server behavior. Actual kills shorten its static 16-second timer by 3.5 seconds; no imaginary minion history is added.");
    kit.assume("Arcanopulse models the conservative 0.25-second onset of the source's random 0–0.25-second charge lattice. Range 700→1450 and self-slow 0→40% advance at the exact parsed quarter-second points, reaching maximum at 1.75 seconds; the versioned binary's conflicting 4 second ChargeTime and different old slow parameters are retained, while the primary wiki 3-second maximum wins. AI releases as soon as the actual target is in current range. Damage is constant at all charge ages.");
    kit.assume("Q is an interruptible mobile channel that forbids attacks and other spells. Timeout and accepted interruption refund 60 mana at max rank and start the ordinary hasted 5-second cooldown. Release ends the slow and starts an independently uninterruptible 0.528-second immobile cast; only death denies its beam. The rectangle uses actual end-of-lockout origin, declaration direction and captured charge range. The post-effect cooldown starts when the beam is released; no cooldown reduction equal to charge age is invented.");
    kit.assume("Eye of Destruction uses its 0.25-second cast plus 0.528-second landing delay and actual ground destination fixed at declaration, even if either body moves during the cast. The separate source cast and delay values do not specify the server timer's start event, so applying the landing delay after cast completion is an explicit timing interpretation. Each recipient independently uses its center against the 125 inner radius, otherwise the 275 outer overlap. Inner damage is exactly the primary 316.73 + 108.355% AP, not a rounded replacement. Its 80% slow decays linearly to 25% over 2.5 seconds because the primary text names no decay function; the binary's multiplicative decay coefficient is retained as conflicting client evidence. The 100-unit declaration-time reveal bug checks actual live, targetable enemy champions and pet bodies, and grants 4.5 seconds ordinary sight of Xerath, never true sight. The source's unenumerated valid-enemy restriction is interpreted as excluding untargetability and stasis.");
    kit.assume("Shocking Orb stops on the first actual eligible enemy body, including summons, obeys projectile walls and uses its 120-width/1400 speed. Stun interpolates the pinned 0.75→2.25-second table using actual missile travel to the contact point, rather than target launch distance or caster position at impact. Damage and stun retain normal spell shields, parry, CC immunity and tenacity; released E/W persist after caster death.");
    kit.assume("Rite of the Arcane starts with six actual shots and zero ArcanePerfection, waits 0.5 seconds and allows independently aimed, free, nonprojectile 200-radius impacts after 0.627 seconds with astatic 0.627-second shot lock. Each shot captures stacks at its own declaration; a connected champion hit grants at most one stack capped five only while that same channel remains. Ordinary pets and clones cannot grant champion stacks; an explicitly classified actual additional champion can, with one shared credit per actual impact. Shielded/parried/missed shots grant none. The six-shot primary table wins over stale alternate-client wrappers; all retained binary objects remain separately attributed.");
    kit.assume("R lasts at most 10 seconds. Movement is disabled for first 1.25 seconds and subsequently cancels; actual basic attacks may cancel immediately. Accepted CC/death cancel; already released shots survive. Cooldown begins when channel ends, at 100/haste seconds, halved only if zero shots were used. The last shot ends the channel on the next 30 Hz upkeep tick; its damage still uses its captured stacks. Channel reveal grants ordinary sight while a champion is within 5000; unsourced far-unit reveal duration is omitted.");
    kit.assume("Budget reference adds one fully charged Q per 1.75+0.528+5/haste seconds, W's center bonus over its ordinary outer damage, and a complete six-hit R with 0+1+2+3+4+5-stack bonuses over its firing time plus cooldown. This is a nominal valuation reference, excluding misses, mana clipping, passive kill refunds and attack suppression during channels; actual fights use their finite resources and timers.");
    return {
      abilities, behavior, attack: { ranged: true, projectile: true, missileSpeed },
      budget: { damage(self, target) { const h = 1 + derive(self).abilityHaste / 100; return { magic: evaluate(qDamage, self, target) / (qFull + qDelay + qCD / h) + (evaluate(wSweet, self, target) - evaluate(wDamage, self, target)) / (wCD / h + wCast) + (rShots * evaluate(rDamage, self, target) + rShots * (rShots - 1) / 2 * evaluate(rStackDamage, self, target)) / (rCD / h + rFirst + (rShots - 1) * rInterval) }; } },
      hooks: {
        onAttackHit(ctx) { surge(ctx, true, ctx.scale); },
        onAttackPetHit(ctx) { surge(ctx, ctx.pet.spec.targetClass === "champion", ctx.scale); },
        onKill(ctx) { ctx.memory["xerath:surgeReady"] = Math.max(ctx.tick, Number(ctx.memory["xerath:surgeReady"] ?? 0) - ticks(pKillRefund)); },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q2") { ctx.memory["xerath:qSeen"] = ctx.tick; ctx.memory["xerath:qDirection"] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1); }
          if (ctx.ability.key === "W") {
            const point = Number(ctx.memory["castGroundX:W"] ?? ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * Math.min(wRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x))));
            const valid = (target: Unit) => target.alive && target.hp > 0 && !inStasis(target) && !isUntargetable(target, ctx.self) && Math.abs(target.x - point) <= wRevealDistance + EPSILON;
            const enemyNearby = valid(ctx.enemy) || ctx.world.pets.some(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && valid(petFormulaTarget(pet, ctx.self, ctx.tick)));
            if (enemyNearby) ctx.apply({ type: "state", state: "standardSight", duration: wRevealSeconds }, true);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory[CHARGE] = ctx.tick; ctx.self.statuses.push({ kind: "cc", key: "slow", source: ctx.self.side, ability: "Q", startTick: ctx.tick, endTick: ctx.tick + ticks(qDuration), value: 0, memoKey: SLOW }); }
          if (ctx.ability.key === "Q2") {
            const range = Number(ctx.memory["xerath:qRange"] ?? seriesAt(qRangeSeries, 0, false)), direction = Number(ctx.memory["xerath:qDirection"] ?? 1), origin = ctx.self.x;
            const forward = (ctx.enemy.x - origin) * direction, reachable = forward >= -ctx.enemy.spec.base.radius - EPSILON && forward <= range + ctx.enemy.spec.base.radius + EPSILON;
            const decision = reachable ? resolveSkillshot(ctx.world, ctx.self, ctx.enemy, ctx.ability, Number(ctx.memory["xerath:qSeen"] ?? ctx.tick), 0, qWidth / 2) : { connects: false, scale: 1 };
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, x: origin + direction * range / 2, radius: range / 2, seenTick: Number(ctx.memory["xerath:qSeen"] ?? ctx.tick), startTick: ctx.tick, endTick: ctx.tick, ability: "Q2", onHit: ctx.ability.onHit, connects: decision.connects, scale: decision.scale };
            ctx.world.zones.push(zone); if (decision.split !== undefined) ctx.queueSplit({ zone: zone.id, chance: decision.split });
            delete ctx.memory["xerath:qReleasing"]; ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === "state" && s.key === "lingering" && s.ability === "Q")); settleCooldown(ctx, "Q", qCD);
          }
          if (ctx.ability.key === "R") { ctx.memory[RITE] = ctx.tick; ctx.memory["xerath:rUsed"] = 0; ctx.memory["xerath:rStacks"] = 0; delete ctx.memory["xerath:rReveal"]; ctx.self.cooldownReady.R2 = 0; }
          if (ctx.ability.key === "R2") { ctx.memory["xerath:rShotStacks"] = Number(ctx.memory["xerath:rStacks"] ?? 0); ctx.memory["xerath:rUsed"] = Number(ctx.memory["xerath:rUsed"] ?? 0) + 1; ctx.memory["xerath:rReveal"] = true; }
          if (ctx.ability.key === "Rend") finishR(ctx);
        },
        onZoneCreated(ctx) { if (ctx.ability.key === "R2") { ctx.zone.onHit = [{ type: "damage", damageType: "magic", amount: add(rDamage, rStackDamage, Number(ctx.memory["xerath:rShotStacks"] ?? 0)) }, { type: "mark", key: `xerath:riteImpact:${String(ctx.memory[RITE])}:${ctx.zone.id}`, duration: 1 / 30 }]; } },
        onMissileCreated(ctx) { if (ctx.ability.key === "E") ctx.memory[`xerath:eOrigin:${ctx.missile.id}`] = ctx.missile.x; },
        onMissileMove(ctx) { if (ctx.missile.source === "E") ctx.missile.onHit = [{ type: "damage", damageType: "magic", amount: eDamage }, { type: "cc", cc: "stun", duration: seriesAt(eStuns, Math.abs(ctx.to - Number(ctx.memory[`xerath:eOrigin:${ctx.missile.id}`] ?? ctx.from)), true) }]; },
        onMissileEnd(ctx) { if (ctx.missile.source === "E") delete ctx.memory[`xerath:eOrigin:${ctx.missile.id}`]; },
        onAbilityContact(ctx) { if (ctx.ability.key === "W") { const sweet = Math.abs(ctx.enemy.x - ctx.originX) <= wInner + EPSILON; return [{ type: "damage", damageType: "magic", amount: sweet ? wSweet : wDamage }, { type: "cc", cc: "slow", strength: sweet ? wSweetSlow : wSlow, duration: wSeconds }]; } },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "W") { const status = ctx.enemy.statuses.find(s => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.ability === "W" && s.startTick === ctx.tick); if (status && status.value > wSlow) status.memoKey = W_SLOW; }
          if (ctx.ability.key === "R2" && ctx.memory[RITE] !== undefined) {
            const champion = ctx.enemy.petId === undefined || (ctx.enemy.spec.targetClass === "champion" && ctx.enemy.spec.unitClass !== "clone");
            const mark = ctx.enemy.statuses.find(s => s.kind === "mark" && s.key.startsWith(`xerath:riteImpact:${String(ctx.memory[RITE])}:`) && s.source === ctx.self.side && s.startTick === ctx.tick);
            if (champion && mark && !ctx.memory[`xerath:credited:${mark.key}`]) {
              ctx.memory[`xerath:credited:${mark.key}`] = true;
              ctx.memory["xerath:rStacks"] = Math.min(rMaxStacks, Number(ctx.memory["xerath:rStacks"] ?? 0) + ctx.scale);
            }
          }
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "Q") finishQ(ctx, ctx.reason !== "recast", ctx.reason === "recast"); if (ctx.ability.key === "R") finishR(ctx); },
        onLethal(ctx) { if (ctx.memory[CHARGE] !== undefined) finishQ(ctx, true); if (ctx.memory["xerath:qReleasing"]) { delete ctx.memory["xerath:qReleasing"]; ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === "state" && s.key === "lingering" && s.ability === "Q")); settleCooldown(ctx, "Q", qCD); } finishR(ctx); return false; },
        onTick(ctx) {
          if (ctx.memory[CHARGE] !== undefined) {
            const age = (ctx.tick - Number(ctx.memory[CHARGE])) / 30;
            if (age >= qDuration) finishQ(ctx, true);
            else { const status = ctx.self.statuses.find(s => s.memoKey === SLOW); if (status) status.value = seriesAt(qSlowSeries, age, false) / 100; }
          }
          if (ctx.memory[RITE] !== undefined) {
            if (Number(ctx.memory["xerath:rUsed"] ?? 0) >= rShots || ctx.tick >= Number(ctx.memory[RITE]) + ticks(rDuration) || ctx.self.action?.kind !== "channel" || ctx.self.action.ability !== "R") finishR(ctx);
            else if (ctx.memory["xerath:rReveal"]) {
              const championNearby = ctx.enemy.alive && ctx.enemy.hp > 0 && Math.abs(ctx.enemy.x - ctx.self.x) <= rRange + EPSILON
                || ctx.world.pets.some(pet => pet.owner !== ctx.self.side && pet.hp > 0 && pet.spec.targetClass === "champion" && pet.spec.unitClass !== "clone" && Math.abs(pet.x - ctx.self.x) <= rRange + EPSILON);
              if (championNearby) ctx.apply({ type: "state", state: "standardSight", duration: 1 / 30 }, true);
            }
          }
          decaySlow(ctx.enemy, ctx.tick); for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.statuses) for (const status of pet.statuses) if (status.memoKey === W_SLOW && status.endTick > ctx.tick) status.value = wSlow + (wSweetSlow - wSlow) * Math.max(0, (status.endTick - ctx.tick) / ticks(wSeconds));
        },
        onTickWhileDead(ctx) { decaySlow(ctx.enemy, ctx.tick); for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.statuses) for (const status of pet.statuses) if (status.memoKey === W_SLOW && status.endTick > ctx.tick) status.value = wSlow + (wSweetSlow - wSlow) * Math.max(0, (status.endTick - ctx.tick) / ticks(wSeconds)); },
      },
    };
  },
};
export default xerath;
