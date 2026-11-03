/** Zeri: spell zaps, independently contacting burst rounds, terrain laser and timed overcharge. */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast, EPSILON, notifyEnemyCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, attackHit, canSee, directionTo, isUntargetable } from "../../engine/sim/combat";
import { canAttack, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import { dashDistance } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, Formula, HookContext, PetDamageCategory } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

const CHARGE = "zeri:charge", LASTX = "zeri:lastX", LIGHTNING = "zeri:lightningEnd", OVER = "zeri:overchargeEnd", HYPER = "zeri:hyper", HYPEREND = "zeri:hyperEnd";
const CONVERT = "zeri:conversion", CAP = "zeri:cap", RAS = "zeri:rAS";
const zeri: KitModule = {
  champion: "Zeri",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const zapRange = p.field("attackRange");
    const maxCharge = p.quoted("maximum of 100 charge"), moveCharge = p.quoted("generates 1 charge"), moveDistance = p.quoted("every 40 units"), qCharge = p.quoted("and 10 charge"), zapCost = p.field("cost", "Regular zaps"), chargedCost = p.field("cost", "Full charge zap");
    const zapDamage: Formula = { base: p.levelValue("Basic Attack: Zeri zaps", 0), ratios: { AP: p.quoted("(+ 3% AP)") / 100 } }, execute: Formula = { base: p.levelValue("Basic Attack: Zeri zaps", 1), ratios: { AP: p.quoted("(+ 20% AP)") / 100 } };
    const chargedBase = p.levelValue("At full charge", 0), chargedAP = p.quoted("(+ 110% AP)") / 100, chargedHP = p.levelValue("At full charge", 1) / 100, monsterCap = p.quoted("capped at 300 against monsters");
    p.quote("gains maximum charge when the game starts and upon respawning"); p.quote("does not apply nor trigger on-hit and on-attack effects"); p.quote("Uncharged attacks do not execute enemies that are shielded or invulnerable"); p.quote("Uncharged attacks are not blocked"); p.quote("Charged attacks only deal the base damage to structures");
    const qTotal = q.formula("Total Physical Damage"), rounds = q.quoted("burst of 7 rounds"), cap = q.quoted("maximum of 1.5 attacks per second"), convert = q.quoted("60% of attack speed") / 100, range = q.field("range"), width = q.field("width"), qSpeed = q.field("speed", "Active spray missile speed"), qRSpeed = q.field("speed", "Empowered spray missile speed"), angles = q.fieldNumbers("angle");
    const windup = q.gameQuoted('"mAttackCastTime":0.25') / q.gameQuoted('"mAttackTotalTime":1.600000023841858'), windupShare = q.quoted("100% of Zeri's windup time") / 100, rWindupShare = q.quoted("80% of Zeri's windup time") / 100;
    q.gameQuote('"TriggerOncePerParent":true'); q.gameQuote('"mSpeed":2600.0'); q.gameQuote('"mSpeed":3400.0');
    q.quote("can cast Burst Fire even while silenced"); q.quote("does not trigger spell effects"); q.quote("area of effect when damaging targets after the first"); q.quote("does not cancel previous attack"); q.quote("Burst Fire is parried by dodge and block"); q.quote("Blind causes Burst Fire to cast in a random direction"); q.quote("excess bonus attack speed percent"); q.quote("after any cripple effects"); q.quote("before Lightning Crash applies its effects"); q.quote("Only attack speed granted by being Overcharged can exceed the cap"); q.quote("counts as an ability activation"); q.quote("does not count as an ability activation for Spellblade");
    const eDamage = e.formula("Burst Fire Bonus Magic Damage"), eSecondary = e.fraction("Burst Fire Secondary Target Damage"), eSeconds = e.quoted("Lightning Rounds for 5 seconds"), eRefund = e.quoted("reduced by 0.5 seconds"), eCritRefund = e.quoted("to 1.5 seconds"), eRange = e.field("range"), eNear = e.quoted("within 50 units"), eSpeedBase = e.field("speed"), eSpeedRatio = e.fieldNumbers("speed")[1]! / 100;
    const eWallMax = e.gameQuoted('"name":"MaxDistanceOverWalls","values":[3000.0'), eCritLow = e.quoted("{{critical damage|0 to 100|critScaling=true}}", 0) / 100, eCritHigh = e.quoted("{{critical damage|0 to 100|critScaling=true}}", 1) / 100;
    e.quote("does not apply on-hit effects or life steal nor trigger on-attack effects"); e.quote("resets Zeri's basic attack timer and Burst Fire cooldown"); e.quote("Q|Zeri}} is disabled"); e.quote("W|Zeri}} and {{ai|R|Zeri}} are usable"); e.quote("current cooldown");
    const wDamage = w.formula("Physical Damage"), wCritical = w.formula("Critical Strike Damage"), wSlow = w.fraction("Slow"), wSlowSeconds = w.quoted("slows them for 2 seconds"), wDelay = w.quoted("after 0.85 seconds"), wVision = w.quoted("for 1.75 seconds"), wSpeed = w.field("speed"), wReach = w.fieldNumbers("range"), wWidths = w.fieldNumbers("width");
    const wCastBase = w.quoted("0.55-0.09 per 100%", 0), wCastAS = w.quoted("0.55-0.09 per 100%", 1), wCastMin = w.fieldNumbers("castTime").at(-1)!;
    w.gameQuote('"name":"MinCastTime","values":[0.30000001192092896');
    w.quote("Applies spell damage for the pulse and area damage for the laser"); w.quote("blocked by projectile-interception effects but not the laser"); w.quote("This ability will cast from wherever the caster is at the start"); w.gameQuote('"mSpeed":2500.0');
    const rDamage = r.formula("Magic Damage"), rRange = r.field("effectRadius"), rSeconds = r.quoted("Overcharged for 5 seconds"), rExtend = r.quoted("duration by 2.5 seconds"), rAS = r.quoted("30% bonus attack speed") / 100, rMS = r.quoted("15% bonus movement speed") / 100, rRounds = r.quoted("fires 3 rounds"), chainRange = r.quoted("within 650 units"), chainTargets = r.quoted("up to 4 subsequent targets"), chainAD = r.quoted("40% AD physical damage") / 100;
    const hyperSeconds = r.quoted("last 2.5 seconds"), hyperNormal = r.quoted("generates 1 stack"), hyperCrit = r.quoted("increased to 3 on abilities"), hyperMS = r.quoted("1.5% bonus movement speed") / 100, hyperCap = r.quoted("up to 100,000 times");
    r.quote("Spell shield blocks Lightning Crash's initial nova but does not prevent Zeri from becoming Overcharged"); r.quote("It does not block Burst Fire electricity chain"); r.quote("nearest visible enemy"); r.quote("Burst Fire grants stacks only against the first target hit"); r.quote("will not chain across structures"); r.quote("area damage for the nova and proc damage for the chain"); r.quote("will not trigger if the first target hit is a ward or trap"); r.quote("Entering resurrection causes Zeri to lose all stacks of Hypercharged"); r.quote("will not be able to gain stacks of Hypercharged again after reviving while Overcharged is active");
    const hidden = (key: string, name: string, flags: AbilitySpec["flags"] = {}): AbilitySpec => ({ key, name, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, flags: { spellShield: false, petContactHooks: true, ...flags }, budgetExcluded: true, roles: [], persistsAfterDeath: true });
    const zap = hidden("zap", p.name, { parry: p.flag("parry") }), chargedZap = hidden("chargedZap", `${p.name} (charged)`, { spellShield: true, parry: p.flag("parry") }), qRound = hidden("Qround", q.name, { basicDamage: true, parry: true, appliesLifeSteal: true }), qSecondary = hidden("Qsecondary", `${q.name} (piercing)`, { basicDamage: true, parry: true }), eRound = hidden("Eround", e.name, { parry: true }), laser = hidden("Wlaser", `${w.name} (laser)`, { spellShield: true }), chain = hidden("Rchain", `${r.name} (chain)`);
    const over = (unit: Unit, tick: number) => tick < Number(unit.memory[OVER] ?? -1);
    // Remove only our own conversion/cap statuses; derive sees current bought stats, cripples and external buffs.
    const unconverted = (self: Unit, includeR: boolean) => {
      const statuses = self.statuses.filter((s) => s.memoKey !== CONVERT && s.memoKey !== CAP && (includeR || s.memoKey !== RAS));
      const uncapped: Unit = { ...self, statuses: [...statuses, { kind: "stat", key: "attackSpeedCap", source: self.side, startTick: 0, endTick: Infinity, value: Number.MAX_VALUE }] };
      return { d: derive(uncapped), multiplier: Math.max(0, 1 + statuses.reduce((n, s) => n + (s.kind === "stat" && s.key === "attackSpeedMultiplier" ? s.value : 0), 0)) };
    };
    const statValues = (self: Unit) => {
      const before = unconverted(self, false), withR = unconverted(self, true), ratio = self.spec.base.attackSpeed.ratio;
      return { attackSpeed: Math.max(EPSILON, Math.min(cap, before.d.attackSpeed) + Math.max(0, withR.d.attackSpeed - before.d.attackSpeed)), conversion: Math.max(0, before.d.attackSpeed - cap) / Math.max(EPSILON, ratio) * 100 * convert, multiplier: withR.multiplier, raw: withR.d.attackSpeed, d: before.d };
    };
    const syncStats = (ctx: HookContext) => {
      const s = statValues(ctx.self); ctx.self.statuses = ctx.self.statuses.filter((x) => x.memoKey !== CAP && x.memoKey !== CONVERT);
      ctx.self.statuses.push({ kind: "stat", key: "AD", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: s.conversion, memoKey: CONVERT }, { kind: "stat", key: "attackSpeedMultiplier", source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: s.raw > 0 ? s.multiplier * (s.attackSpeed / s.raw - 1) : 0, memoKey: CAP });
    };
    const qTime = (self: Unit) => windup / statValues(self).attackSpeed * (over(self, Number(self.memory["zeri:tick"] ?? 0)) ? rWindupShare : windupShare);
    const wTime = (self: Unit) => Math.max(wCastMin, wCastBase - wCastAS * unconverted(self, true).d.bonusAttackSpeed);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: 1 / cap, staticCooldown: true, cooldownAtCastStart: true, cooldownFor: (self) => 1 / statValues(self).attackSpeed, castTime: windup / cap, castTimeFor: qTime, preserveAttackWindup: true, moveWhileCasting: true, delivery: { kind: "self" }, flags: { usableWhileSilenced: true, spellShield: false, parry: true, basicDamage: true, petContactHooks: true }, usable: (self) => canAttack(self) && !(self.action?.kind === "dash" && self.action.ability === "E"), estimate: (self, target) => evaluate(qTotal, self, target), roles: ["damage"], persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: wCastBase, castTimeFor: wTime, castOrigin: "start", overlay: true, usable: (self) => !self.action || self.action.kind === "windup" || (self.action.kind === "dash" && self.action.ability === "E"), delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, estimate: (self, target) => evaluate(wDamage, self, target), roles: ["damage", "cc"], persistsAfterDeath: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), cooldownAtCastStart: true, castTime: e.castTime(), delivery: { kind: "self" }, flags: { grounded: e.flag("grounded"), knockdown: e.flag("knockdown") }, roles: ["engage", "escape", "defense"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAfter: "state", cost: r.cost(), castTime: r.castTime(), moveWhileCasting: true, preserveAttackWindup: true, overlay: true, usable: (self) => !self.action || self.action.kind === "windup" || (self.action.kind === "dash" && self.action.ability === "E"), delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, estimate: (self, target) => evaluate(rDamage, self, target), roles: ["damage", "buff"] }, zap, chargedZap, qRound, qSecondary, eRound, laser, chain,
    ];
    type Victim = { target: Unit; pet?: Pet };
    const targets = (ctx: HookContext): Victim[] => [{ target: ctx.world.units[ctx.self.side === 0 ? 1 : 0] }, ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const valid = (ctx: HookContext, v: Victim, visible = false) => v.target.alive && !isUntargetable(v.target, ctx.self) && (!visible || canSee(v.target, ctx.self));
    const champion = (v: Victim) => !v.pet || v.pet.spec.targetClass === "champion";
    const guarded = (target: Unit) => hasState(target, "parry") || hasState(target, "dodgeAttacks") || hasState(target, "blockAttacks");
    const hit = (ctx: HookContext, v: Victim, ability: AbilitySpec, effects: Effect[], category: PetDamageCategory = "singleTarget", share = 1, originX = ctx.self.x) => { if (v.pet) abilityHitPet(ctx.world, ctx.self, v.pet, ability, effects, category, share, originX); else abilityHit(ctx.world, ctx.self, v.target, ability, effects, share, originX); };
    const packet = (amount: Formula, damageType: "physical" | "magic", canCrit = false): Effect => ({ type: "damage", damageType, amount, ...(canCrit ? { canCrit } : {}) });
    const identity = (v: Victim) => v.pet ? `p${v.pet.id}` : `u${v.target.side}`;
    const refund = (ctx: HookContext, seconds: number) => applyEffect(ctx.world, ctx.self, ctx.self, { type: "refund", ability: "E", seconds }, { scale: 1 });
    const syncOver = (ctx: HookContext) => {
      const end = Number(ctx.memory[OVER] ?? -1), active = ctx.tick < end;
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== RAS && s.memoKey !== "zeri:rMS" && s.memoKey !== "zeri:rState" && s.memoKey !== "zeri:hyperMS");
      if (active) {
        ctx.self.statuses.push({ kind: "stat", key: "attackSpeed", source: ctx.self.side, startTick: ctx.tick, endTick: end, value: rAS, memoKey: RAS }, { kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: end, value: rMS, memoKey: "zeri:rMS" }, { kind: "state", key: "lingering", ability: "R", source: ctx.self.side, startTick: ctx.tick, endTick: end, value: 1, memoKey: "zeri:rState" });
        if (ctx.tick < Number(ctx.memory[HYPEREND] ?? -1)) ctx.self.statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: Math.min(end, Number(ctx.memory[HYPEREND])), value: Number(ctx.memory[HYPER] ?? 0) * hyperMS, memoKey: "zeri:hyperMS" });
      }
      syncStats(ctx);
    };
    const extend = (ctx: HookContext, v: Victim, criticalChance = 0) => {
      if (!champion(v) || !over(ctx.self, ctx.tick)) return;
      ctx.memory[OVER] = Math.min(ctx.tick + ticks(rSeconds), Number(ctx.memory[OVER]) + ticks(rExtend));
      if (!ctx.memory["zeri:hyperLocked"]) { ctx.memory[HYPER] = Math.min(hyperCap, Number(ctx.memory[HYPER] ?? 0) + hyperNormal + (hyperCrit - hyperNormal) * criticalChance); ctx.memory[HYPEREND] = ctx.tick + ticks(hyperSeconds); }
      syncOver(ctx);
    };
    const chainFrom = (ctx: HookContext, first: Victim, critChance: number) => {
      const seen = new Set([identity(first)]); let current = first;
      for (let i = 0; i < chainTargets; i++) {
        const next = targets(ctx).filter((v) => !seen.has(identity(v)) && !v.pet?.spec.hitPoints && valid(ctx, v, true) && Math.abs(v.target.x - current.target.x) <= chainRange).sort((a, b) => Math.abs(a.target.x - current.target.x) - Math.abs(b.target.x - current.target.x))[0];
        if (!next) break;
        seen.add(identity(next));
        const d = derive(ctx.self), amount = d.ad * chainAD * (1 + critChance * (d.critDamage - 1));
        hit(ctx, next, chain, [packet({ base: amount }, "physical")], "proc", 1, current.target.x); current = next;
      }
    };
    const missile = (ctx: HookContext, source: string, x: number, dir: 1 | -1, reach: number, speed: number, extra: Partial<Missile> = {}) => {
      const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source, seenTick: ctx.tick, x, direction: dir, perTick: speed / 30, travelLeft: reach, homing: false, projectile: true, interceptable: true, connects: false, scale: 1, onHit: [], radius: source === "Qround" ? width / 2 : source === "W" ? wWidths[0]! / 2 : 0, expiresTick: ctx.tick + ticks(reach / Math.max(1, speed) + wDelay + rSeconds), ...extra }; ctx.world.missiles.push(m); return m;
    };
    const contacts = (ctx: HookContext, m: Missile, from: number, to: number, radius: number, angle = 0) => {
      const origin = Number(ctx.memory[`zeri:origin:${m.id}`] ?? from), cosine = Math.cos(angle);
      return targets(ctx).flatMap((v) => {
        if (!valid(ctx, v) || (v.pet ? m.hitPets?.includes(v.pet.id) : m.hitTargets?.includes(v.target.side))) return [];
        const d = (v.target.x - origin) * m.direction, reach = v.target.spec.base.radius + radius, transverse = d * Math.sin(angle);
        if (d < -reach || Math.abs(transverse) > reach) return [];
        const axial = Math.max(0, d * cosine - Math.sqrt(Math.max(0, reach * reach - transverse * transverse))) * cosine, x = origin + m.direction * axial;
        if ((x - from) * m.direction < -EPSILON || (x - to) * m.direction > EPSILON) return [];
        return [{ ...v, x, distance: (x - from) * m.direction }];
      }).sort((a, b) => a.distance - b.distance || (a.pet?.id ?? -1) - (b.pet?.id ?? -1));
    };
    const launchRound = (ctx: HookContext, group: number, i: number) => {
      const empowered = ctx.memory[`zeri:over:${group}`] === true, count = Number(ctx.memory[`zeri:rounds:${group}`]), dir = Number(ctx.memory[`zeri:direction:${group}`]) as 1 | -1, angle = (i / Math.max(1, count - 1) - .5) * (empowered ? angles[1]! : angles[0]!) * Math.PI / 180;
      const reach = range + Math.max(0, attackRange(ctx.self) - zapRange);
      const m = missile(ctx, "Qround", ctx.self.x, dir, reach * Math.cos(angle), (empowered ? qRSpeed : qSpeed) * Math.cos(angle), { onHit: [packet(scaled(qTotal, 1 / count), "physical")] });
      ctx.memory[`zeri:origin:${m.id}`] = ctx.self.x; ctx.memory[`zeri:angle:${m.id}`] = angle; ctx.memory[`zeri:group:${m.id}`] = group;
      const candidate = contacts(ctx, m, m.x, m.x + dir * m.travelLeft, width / 2, angle)[0]; if (candidate && !candidate.pet) m.impactTick = ctx.tick + Math.max(1, Math.ceil(candidate.distance / m.perTick));
    };
    // Full-burst bookkeeping is local to this world. R/E flags and crit chance are snapped at declaration.
    const startBurst = (ctx: HookContext, direction: 1 | -1) => {
      const group = ctx.world.nextId++, active = over(ctx.self, ctx.tick), count = active ? rRounds : rounds, duration = ticks(qTime(ctx.self));
      ctx.memory[`zeri:over:${group}`] = active; ctx.memory[`zeri:lightning:${group}`] = ctx.tick < Number(ctx.memory[LIGHTNING] ?? -1); ctx.memory[`zeri:crit:${group}`] = derive(ctx.self).critChance; ctx.memory[`zeri:rounds:${group}`] = count;
      ctx.memory[`zeri:direction:${group}`] = ctx.self.statuses.some((s) => s.kind === "cc" && s.key === "blind") ? -direction : direction;
      ctx.memory[`zeri:start:${group}`] = ctx.tick; ctx.memory[`zeri:duration:${group}`] = duration; ctx.memory[`zeri:next:${group}`] = 1; ctx.memory[`zeri:burst:${group}`] = true;
      launchRound(ctx, group, 0);
    };
    const zapAt = (ctx: HookContext, v: Victim) => {
      if (!valid(ctx, v)) return;
      const full = Number(ctx.memory[CHARGE] ?? 0) >= maxCharge, d = derive(ctx.self), ability = full ? chargedZap : zap;
      ctx.memory[CHARGE] = Math.max(0, Number(ctx.memory[CHARGE] ?? 0) - (full ? chargedCost : zapCost));
      notifyEnemyCast(ctx.world, ctx.self, ability);
      let amount = evaluate(zapDamage, ctx.self, v.target);
      if (full) { const health = derive(v.target).maxHp * chargedHP; amount = chargedBase + chargedAP * d.ap + (v.pet?.spec.targetClass === "monster" ? Math.min(monsterCap, health) : health); }
      const effects: Effect[] = [packet({ base: amount }, "magic")];
      if (!full && !v.target.statuses.some((s) => s.kind === "shield") && v.target.hp < evaluate(execute, ctx.self, v.target)) effects.push({ type: "execute", threshold: execute });
      const denied = hasState(v.target, "parry") || (full && hasState(v.target, "spellShield"));
      hit(ctx, v, ability, effects);
      if (full && !denied) { refund(ctx, eRefund); extend(ctx, v); }
    };
    const moveMissile = (ctx: HookContext & { missile: Missile; from: number; to: number }) => {
          const m = ctx.missile;
          if (m.source === "W") {
            const first = contacts(ctx, m, ctx.from, ctx.to, wWidths[0]! / 2).filter((v) => !v.pet?.spec.hitPoints)[0];
            if (first) { hit(ctx, first, abilities[1]!, [packet(wDamage, "physical"), { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }], "singleTarget", 1, ctx.from); m.x = first.x; m.ended = true; return; }
            if (ctx.memory[`zeri:wall:${m.id}`]) { m.ended = true; ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, ability: "Wlaser", kind: "delayedArea", x: m.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(wDelay), connects: false, onHit: [packet(wCritical, "physical")], noPets: true, memory: { direction: m.direction, visionEnd: ctx.tick + ticks(wVision) } }); } return;
          }
          if (m.source !== "Qround") return;
          const group = Number(ctx.memory[`zeri:group:${m.id}`]), count = Number(ctx.memory[`zeri:rounds:${group}`]), piercing = ctx.memory[`zeri:lightning:${group}`] === true, critical = Number(ctx.memory[`zeri:crit:${group}`]), firstKey = `zeri:first:${group}`;
          for (const v of contacts(ctx, m, ctx.from, ctx.to, width / 2, Number(ctx.memory[`zeri:angle:${m.id}`]))) {
            if (v.pet) (m.hitPets ??= []).push(v.pet.id); else (m.hitTargets ??= []).push(v.target.side);
            const id = identity(v); if (ctx.memory[firstKey] === undefined) ctx.memory[firstKey] = id;
            const trapPrimary = Boolean(v.pet && ctx.world.zones.some((z) => z.kind === "trap" && z.owner === v.pet!.owner && z.memory?.pet === v.pet!.id));
            const primary = ctx.memory[firstKey] === id, onceKey = `zeri:onhit:${group}`, canConnect = !guarded(v.target), firstPacket = primary && !ctx.memory[onceKey];
            const damage = scaled(qTotal, 1 / count), critFactor = 1 + critical * (derive(ctx.self).critDamage - 1), propKey = `zeri:prop:${group}:${id}`;
            if (!v.pet?.spec.hitPoints || !ctx.memory[propKey]) {
              if (firstPacket) { ctx.memory[onceKey] = true; const d = derive(ctx.self), amount = evaluate(damage, ctx.self, v.target); attackHit(ctx.world, ctx.self, v.target, false, [], undefined, false, { critChance: critical, baseDamageScale: d.ad > 0 ? amount / d.ad : 0 }, m.scale, ctx.from); }
              else hit(ctx, v, primary ? qRound : qSecondary, [{ ...packet(scaled(damage, critFactor * (primary ? 1 : eSecondary)), "physical"), ...(primary ? {} : { noLifeSteal: true }) }], primary ? "basic" : "area", m.scale, ctx.from);
              if (v.pet?.spec.hitPoints) ctx.memory[propKey] = true;
            }
            if (canConnect && !ctx.memory[`zeri:refund:${group}`]) { ctx.memory[`zeri:refund:${group}`] = true; refund(ctx, eRefund + critical * (eCritRefund - eRefund)); }
            if (primary && canConnect && !ctx.memory[`zeri:bonus:${group}`]) {
              ctx.memory[`zeri:bonus:${group}`] = true;
              if (piercing) { const factor = 1 + eCritLow + (eCritHigh - eCritLow) * critical * (derive(ctx.self).critDamage - 1); hit(ctx, v, eRound, [packet(scaled(eDamage, factor), "magic")], "proc", 1, ctx.from); }
              extend(ctx, v, critical);
              if (ctx.memory[`zeri:over:${group}`] && !trapPrimary) chainFrom(ctx, v, critical);
            }
            if (!piercing) { m.x = v.x; m.ended = true; break; }
          }
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return defaultBehavior(view);
      if (["fight", "trade", "kite"].includes(view.mode) && !view.self.memory.tradeDone) {
        if (!over(view.self, view.world.tick) && Math.abs(view.enemy.x - view.self.x) <= rRange && canCast(view.world, view.self, abilities[3]!)) return { kind: "cast", ability: "R" };
        if (view.distance <= zapRange && Number(view.self.memory[CHARGE] ?? 0) >= maxCharge && !view.self.action && view.self.attackReadyTick <= view.world.tick) return { kind: "attack" };
        if (view.distance <= range && canCast(view.world, view.self, abilities[0]!)) return { kind: "cast", ability: "Q" };
        if (view.distance <= wReach[0]! && canCast(view.world, view.self, abilities[1]!)) return { kind: "cast", ability: "W" };
        if (view.distance > range && view.distance <= range + eRange && canCast(view.world, view.self, abilities[2]!)) return { kind: "cast", ability: "E" };
      }
      const normal = defaultBehavior(view);
      if (normal?.kind === "cast" && ["Q", "W", "R"].includes(normal.ability)) return { kind: "move", direction: view.mode === "flee" ? -1 : 1 };
      return normal;
    };
    kit.assume("Living Battery replaces ordinary attacks at actual windup completion with a nonprojectile spell-damage zap, without ordinary AD, crits or on-hit/on-attack packets. It notifies enemy cast listeners once at committed launch, including a spellshielded charged zap. Uncharged zaps bypass spellshield, full charge is shieldable. Execute is checked before the damage against unshielded targets and respects shared invulnerability/minimum-health protection. Starts fully charged; fractional charge from every 40 units of actual displacement is kept and each declared Q adds 10. The level 20 wiki formulas are used beyond 18. Structures, wards/plants and respawn-only edge cases are outside ordinary duel entities; unclassified summons are not guessed to be structures.");
    kit.assume("Burst Fire fires seven real 80-width rounds across 5 degrees (three across 2 degrees during R), scheduled over its sourced windup fraction; all rounds share one crit chance snapshot. Circular target hitboxes intersect each ray independently, and the closest actual champion/pet intercepts each nonpiercing round. E rounds can pass to further actual targets; only the burst's first enemy gets one on-hit/attack event, later packets remain basic damage but secondary targets use area classification and no life steal. Hit-count props take one hit per burst and still stop later normal rounds. Blind deterministically fires away from the declared target as the one-dimensional random-direction approximation. No lateral sidestep branch is invented; actual axial movement, death, untargetability, dodge/block/parry and projectile walls determine contacts.");
    kit.assume("Q is usable during silence but must also pass ordinary attack/disarm and other cast CC guards; polymorph still denies it. It counts as one cast activation for enemy listeners, preserving a declared zap windup. There is no item Spellblade system. Q cooldown starts at declaration and is 1/currentAS without haste; 100% windup (80% R) is read from the pinned custom fields and root attack timings. Excess post-cripple bonus AS percent converts 60% into AD; only R's 30% AS can raise the 1.5 cap. Current external stats/cripples are recomputed each upkeep; RAS is excluded from conversion, so R does not itself grant converted AD.");
    kit.assume("W uses physical damage despite its stale Magic damage-type flag, because the exact primary description/leveling and game-file calculations agree. The normal 2500 speed pulse hits the closest real enemy or actual terrain. Actual wall contact anchors a laser from-50 to 1550 units (primary 1600 total; client WallBeamRange 1500 conflicts), width 200 after 0.85 seconds; no environment-wall boolean invents a location. Pulse is single-target spell damage, laser area damage and 150% versus champions/explicit monsters. Directional interception retains the actual pulse collision damage and debuff, then destroys its remaining flight without creating a terrain laser; it never erases an already anchored laser. Both custom rays and anchored laser packets retain their actual damage origins for directional defenses. Cast time follows primary 0.55 - 0.09 * bonus AS with pinned 0.3 minimum; the targeter retains 1.75 seconds of ground warning/vision, with no invented global fog reveal.");
    kit.assume("E dashes 300 at 600+currentMS, and only actual terrain within 50 at declaration extends the destination to its far clear edge, capped at pinned 3000 distance. Terrain thickness and landing clearance are axial, not a two-dimensional wall ride. Q/attacks are locked during the dash; W/R overlays remain available. E resets both attack and Q clocks immediately and grants its five-second piercing rounds after the dash ends. Interrupting E ends it at its actual position and still starts the postdash empowerment. Unobstructed 800 vision is descriptive because the duel has no terrain fog. E's magic bonus scales continuously with critical chance as its pinned calculation; refund occurs once per actual Q burst hit (0.5–1.5 seconds averaged by crit chance) or connected charged zap.");
    kit.assume("R nova hits actual targetable entities in 825 radius and enters five-second Overcharge only with champion/explicit clone contact, including a spellshielded contact. Each connected champion ability/charged zap extends by 2.5 seconds capped at five remaining, and grants 1 or expected 1–3 Hypercharged stacks for 2.5 seconds; Q uses only its first target. W wall counts as critical against champions. A first contact with an actual trap body linked to a real trap zone cannot trigger electricity; hit-count alone does not make other props traps. Wards are absent from this duel. Chains seek up to four distinct nearby visible actual enemies within 650, exclude their triggering target and hit-count props, and deal proc physical damage without spellshield or attack-defense checks. Chains and E bonus never recursively refresh R or grant stacks. Entering resurrection clears Hypercharge and prevents gaining it during that existing Overcharge; ordinary duel resurrection does not receive the game-respawn charge reset. R cooldown starts after Overcharge ends; no free stacks or infinite R are preloaded. The reference budget has finite sustained Q, charged zap every 10 casts, regular W and one R cycle; it excludes E/R's conditional repeated empowerments/chains rather than assigning free secondary targets.");
    return { attack: { ranged: true, projectile: false, missileSpeed: 0, range: zapRange, onHitToPets: false }, abilities, behavior,
      budget: { attacks: false, damage(self, target) { const s = statValues(self), d = s.d, proxy: Unit = { ...self, statuses: [...self.statuses.filter((x) => x.memoKey !== CONVERT), { kind: "stat", key: "AD", source: self.side, startTick: 0, endTick: Infinity, value: s.conversion }] }, qD = evaluate(qTotal, proxy, target) * (1 + d.critChance * (d.critDamage - 1)), charged = chargedBase + chargedAP * d.ap + chargedHP * derive(target).maxHp; return { physical: qD * s.attackSpeed + evaluate(wDamage, proxy, target) / (abilities[1]!.cooldown / (1 + d.abilityHaste / 100) + wTime(self)), magic: charged / (maxCharge / qCharge / s.attackSpeed + windup / s.attackSpeed) + evaluate(rDamage, proxy, target) / (abilities[3]!.cooldown / (1 + d.abilityHaste / 100) + rSeconds + abilities[3]!.castTime) }; } },
      hooks: {
        onStart(ctx) { ctx.memory[CHARGE] = maxCharge; ctx.memory[LASTX] = ctx.self.x; ctx.memory["zeri:tick"] = ctx.tick; syncStats(ctx); },
        onAttackLaunch(ctx) { zapAt(ctx, { target: ctx.enemy, ...(ctx.targetPet ? { pet: ctx.targetPet } : {}) }); return false; },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory[CHARGE] = Math.min(maxCharge, Number(ctx.memory[CHARGE] ?? 0) + qCharge); startBurst(ctx, directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1); }
          if (ctx.ability.key === "W") { ctx.memory["zeri:wOrigin"] = ctx.self.x; ctx.memory["zeri:wDirection"] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1); }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") { const x = Number(ctx.memory["zeri:wOrigin"] ?? ctx.self.x), dir = Number(ctx.memory["zeri:wDirection"] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1, m = missile(ctx, "W", x, dir, wReach[0]!, wSpeed); ctx.memory[`zeri:origin:${m.id}`] = x; m.onHit = [packet(wDamage, "physical"), { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }]; const candidate = contacts(ctx, m, x, x + dir * m.travelLeft, wWidths[0]! / 2).filter((v) => !v.pet?.spec.hitPoints)[0]; if (candidate && !candidate.pet) m.impactTick = ctx.tick + Math.max(1, Math.ceil(candidate.distance / m.perTick)); }
          if (ctx.ability.key === "E") {
            ctx.self.attackReadyTick = ctx.tick; ctx.self.cooldownReady.Q = ctx.tick;
            const dir = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1, self = ctx.self, radius = self.spec.base.pathingRadius;
            let distance = Math.max(0, Math.min(eRange, ctx.aim?.distance ?? eRange)), wall = false;
            const terrain = ctx.world.terrain.filter((t) => t.endTick > ctx.tick && (!t.enemyOnly || t.owner !== self.side)).filter((t) => { const edge = dir > 0 ? t.from : t.to, gap = (edge - self.x) * dir; return gap >= -radius && gap <= eNear; }).sort((a, b) => dir * ((dir > 0 ? a.from : a.to) - (dir > 0 ? b.from : b.to)))[0];
            if (terrain) { wall = true; distance = Math.min(eWallMax, Math.max(distance, ((dir > 0 ? terrain.to : terrain.from) - self.x) * dir + radius)); }
            const actual = dashDistance(ctx.world, self, dir * distance), duration = Math.max(1, ticks(Math.abs(actual) / (eSpeedBase + eSpeedRatio * derive(self).moveSpeed)));
            self.action = { kind: "dash", ability: "E", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: actual / duration, stopAtContact: false, unstoppable: false, through: true, crossTerrain: true };
            ctx.memory["zeri:eWall"] = wall; ctx.memory["zeri:eDashEnd"] = ctx.tick + duration;
          }
          if (ctx.ability.key === "R") {
            const inRange = targets(ctx).filter((v) => valid(ctx, v) && !v.pet?.spec.hitPoints && Math.abs(v.target.x - ctx.self.x) <= rRange);
            if (inRange.some(champion)) { ctx.memory[OVER] = ctx.tick + ticks(rSeconds); delete ctx.memory["zeri:hyperLocked"]; syncOver(ctx); }
            for (const v of inRange) hit(ctx, v, abilities[3]!, [packet(rDamage, "magic")], "area");
          }
        },
        onDashEnd(ctx) { if (ctx.ability.key === "E") { ctx.memory[LIGHTNING] = ctx.tick + ticks(eSeconds); delete ctx.memory["zeri:eDashEnd"]; } },
        onTick(ctx) {
          ctx.memory["zeri:tick"] = ctx.tick; const traveled = Math.abs(ctx.self.x - Number(ctx.memory[LASTX] ?? ctx.self.x)); ctx.memory[LASTX] = ctx.self.x; ctx.memory[CHARGE] = Math.min(maxCharge, Number(ctx.memory[CHARGE] ?? 0) + traveled / moveDistance * moveCharge);
          if (ctx.tick >= Number(ctx.memory[HYPEREND] ?? Infinity)) { delete ctx.memory[HYPER]; delete ctx.memory[HYPEREND]; }
          if (ctx.self.resurrection) { delete ctx.memory[HYPER]; delete ctx.memory[HYPEREND]; if (over(ctx.self, ctx.tick)) ctx.memory["zeri:hyperLocked"] = true; }
          if (ctx.tick >= Number(ctx.memory[OVER] ?? Infinity)) { delete ctx.memory[OVER]; delete ctx.memory[HYPER]; delete ctx.memory[HYPEREND]; delete ctx.memory["zeri:hyperLocked"]; }
          syncOver(ctx);
          for (const key of Object.keys(ctx.memory).filter((key) => key.startsWith("zeri:burst:"))) {
            const group = Number(key.slice("zeri:burst:".length)), count = Number(ctx.memory[`zeri:rounds:${group}`]), start = Number(ctx.memory[`zeri:start:${group}`]), duration = Number(ctx.memory[`zeri:duration:${group}`]); let i = Number(ctx.memory[`zeri:next:${group}`]);
            while (i < count && ctx.tick >= start + Math.round(i * duration / Math.max(1, count - 1))) { launchRound(ctx, group, i); i++; }
            ctx.memory[`zeri:next:${group}`] = i; if (i >= count) delete ctx.memory[key];
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "W" || ctx.ability.key === "Wlaser") extend(ctx, { target: ctx.enemy, ...(ctx.enemy.petId !== undefined ? { pet: ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId) } : {}) }, ctx.ability.key === "Wlaser" ? 1 : 0);
        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source === "Qround") {
            const to = m.x + m.direction * Math.min(m.perTick, m.travelLeft), group = Number(ctx.memory[`zeri:group:${m.id}`]), piercing = ctx.memory[`zeri:lightning:${group}`] === true;
            const cs = contacts(ctx, m, m.x, to, width / 2, Number(ctx.memory[`zeri:angle:${m.id}`])), contact = piercing ? cs.find(c => !c.pet) : cs[0];
            if (contact && !contact.pet) interceptProjectile(ctx.world, m, m.x, to, contact.x);
            return;
          }
          if (m.source !== "W") return;
          for (const t of ctx.world.terrain.filter((t) => t.endTick > ctx.tick)) {
            const edge = m.direction > 0 ? t.from : t.to, gap = (edge - m.x) * m.direction;
            if (gap >= -EPSILON && gap <= m.perTick && gap <= m.travelLeft) { m.perTick = Math.max(0, gap); ctx.memory[`zeri:wall:${m.id}`] = true; }
          }
          if (m.perTick <= EPSILON && ctx.memory[`zeri:wall:${m.id}`]) { m.ended = true; ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, ability: "Wlaser", kind: "delayedArea", x: m.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(wDelay), connects: false, onHit: [packet(wCritical, "physical")], noPets: true, memory: { direction: m.direction } }); }
          if (!m.ended) {
            const to = m.x + m.direction * Math.min(m.perTick, m.travelLeft), contact = contacts(ctx, m, m.x, to, wWidths[0]! / 2).filter(c => !c.pet?.spec.hitPoints)[0];
            if (contact && !contact.pet) interceptProjectile(ctx.world, m, m.x, to, contact.x);
          }
        },
        canProjectileIntercept(ctx) { return !["Qround", "W"].includes(ctx.missile.source) || ctx.exactPoint !== undefined; },
        onMissileMove: moveMissile,
        onProjectileIntercept(ctx) { moveMissile(ctx); return true; },
        onZoneLand(ctx) {
          const z = ctx.zone; if (z.ability !== "Wlaser") return;
          const dir = Number(z.memory?.direction ?? 1), from = z.x + dir * wReach[1]!, to = z.x + dir * wReach[2]!;
          for (const v of targets(ctx)) if (valid(ctx, v) && !v.pet?.spec.hitPoints && v.target.x + v.target.spec.base.radius >= Math.min(from, to) && v.target.x - v.target.spec.base.radius <= Math.max(from, to)) hit(ctx, v, laser, [packet(champion(v) || v.pet?.spec.targetClass === "monster" ? wCritical : wDamage, "physical"), { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }], "area", 1, z.x);
        },
      },
    };
  },
};
export default zeri;
