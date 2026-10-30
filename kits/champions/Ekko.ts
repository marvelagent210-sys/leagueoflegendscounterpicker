/** Ekko's distinct contacts, returning grenade and recorded four-second rewind. */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast, EPSILON, releaseCooldowns, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, edgeDistance, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { dashDistance } from "../../engine/sim/terrain";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Missile, Unit, Zone } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

const STACK = "ekko:resonance", LOCK = "ekko:lockout", E = "ekko:phaseDive", HISTORY = "ekko:history:", LOSS = "ekko:loss:", REWIND = "ekko:rewind:";
const ekko: KitModule = {
  champion: "Ekko",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const stackDuration = p.quoted("enemies hit for 4 seconds"), stackCount = p.quoted("stacking up to 3 times"), lockout = p.field("targetCooldown"), monsterMod = p.quoted("deals 270% damage against monsters") / 100;
    const proc = { base: p.levelValue("The third stack consumes them all"), ratios: { AP: p.quoted("(+ 80% AP)") / 100 } }, move = p.levelValue("Triggering Resonance against a champion") / 100, moveTime = p.levelValue("Triggering Resonance against a champion", 1);
    p.quote("Resonance stacks will not be applied nor consumed if the basic attack is dodged or blocked or if the attack misses");
    const outDamage = q.formula("Initial Magic Damage"), backDamage = q.formula("Return Magic Damage"), qCD = q.cooldown(), qRange = q.field("targetRange"), qOutSpeed = q.field("speed", "Outward"), qBackSpeed = q.field("speed", "Returning"), qWidths = q.fieldValues("width"), qSlow = q.fraction("Slow"), expandAt = q.quoted("At 700 units"), expandTime = q.quoted("slows down for 1.75 seconds"), expandTravel = q.quoted("travelling for another 190 units"), expandRadii = q.fieldNumbers("effectRadius");
    const qCast = q.castTime(), rCD = r.cooldown();
    q.quote("Enemies can be hit only once per pass"); q.quote("Spell shield will block only a single instance of damage"); q.quote("This ability will cast from wherever the caster is at the end of the cast time"); q.field("speed", "Temporal Sickness");
    q.gameQuote("mSpell.DataValues.SlowZoneRadius.values: [165.0,165.0,165.0,165.0,165.0,165.0,165.0]");
    const wRange = w.field("targetRange"), wRadius = w.field("effectRadius"), wDelay = w.quoted("after 2 seconds") + w.quoted("travelling over 1.25 seconds"), wDuration = w.quoted("lasts for 1.5 seconds"), wSlow = w.quoted("slows enemies within by 40%") / 100, wShield = w.formula("Shield Strength"), shieldTime = w.quoted("a shield for 2 seconds"), stunTime = w.quoted("stun enemies within for 2.25 seconds"), wHidden = w.quoted("2 seconds after casting");
    const executeShare = w.quoted("equal to 3%") / 100, executeAP = w.quoted("(+ 3% per 100 AP)") / 10000, executeThreshold = w.quoted("below 30% of their maximum health") / 100, executeMin = w.quoted("minimum threshold of 15"), executeCap = w.quoted("capped at 150 against minions and monsters");
    w.quote("The passive will proc with the attack that triggers the final stack of Resonance if it reduces a target's health below the 30% threshold"); w.quote("Ekko can detonate the expansion even while untargetable"); w.quote("but not if he is resurrecting"); w.quote("Parallel Convergence will continue to slow enemies even if its expansion is detonated"); w.textField("cooldownStart");
    w.gameQuote("mSpell.DataValues.DelayBeforeDetonation.values: [3.0,3.0,3.0,3.0,3.0,3.0,3.0]");
    const eDistance = e.field("targetRange", "Dash distance"), eWallMax = e.field("targetRange", "Maximum increased"), eTime = e.quoted("next basic attack within 3 seconds"), eWindup = e.quoted("a 0.25-second cast time"), eRange = e.quoted("gain 300 bonus range"), eLanding = e.quoted("blink within 125 range"), eDamage = e.formula("Bonus Magic Damage"), eCD = e.cooldown();
    e.quote("While grounded or rooted, Ekko loses the bonus attack range from Phase Dive"); e.quote("If the target becomes untargetable, dies, or is too far away during the empowered attack's cast time, it is cancelled but not consumed"); e.quote("Phase Dive's attack can miss and be blocked and dodged, consuming the basic attack without dealing any damage"); e.quote("Phase Dive's attack breaks stealth at the start of its cast time"); e.quote("resets Ekko's basic attack timer"); e.quote("Ekko can cast any of his abilities during the dash"); e.textField("cooldownStart"); e.gameQuote("mSpell.mCantCancelWhileWindingUp: true");
    e.gameQuote("mSpell.DataValues.DashDistance.values: [350.0,350.0,350.0,350.0,350.0,350.0,350.0]");
    const historyTime = r.quoted("tracks where he was 4 seconds ago"), historyTicks = ticks(historyTime), rCast = r.castTime(), rTravel = r.quoted("over 0.5 seconds"), rRadius = r.field("effectRadius", "Damage"), rDamage = r.formula("Magic Damage"), rHeal = r.formula("Minimum Heal"), healAmp = r.quoted("formula=3% per 1% of health lost in the last 4 seconds") / 100 * 100;
    r.formula("Maximum Heal"); r.quote("Ekko enters stasis at the start of the cast time"); r.quote("The afterimage's location will explode even if Ekko's dash is interrupted"); r.quote("travels full distance through the link"); r.quote("Chronobreak provides immunity only to displacements that apply airborne"); r.gameQuote("mSpell.manaValues.values: [100.0,100.0,100.0,0.0,0.0,0.0]");

    const targetClass = (ctx: Pick<HookContext, "enemy">) => ctx.enemy.spec.targetClass ?? (ctx.enemy.petId === undefined ? "champion" : "other");
    const realTarget = (ctx: HookContext) => ctx.enemy.petId === undefined || !ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId)?.spec.hitPoints;
    const phaseReady = (self: Unit) => Number(self.memory[E] ?? -1) > Number(self.memory["ekko:now"] ?? 0);
    const canBlink = (self: Unit) => !self.statuses.some((status) => status.kind === "cc" && ["root", "ground"].includes(status.key));
    const syncPet = (ctx: HookContext) => { const pet = ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId); if (pet) { pet.statuses = ctx.enemy.statuses; pet.memory = ctx.enemy.memory; } };
    const passive: AbilitySpec = { key: "Resonance", name: p.name, slot: "I", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: proc, noLifeSteal: true, petDamageCategory: "singleTarget" }], flags: { spellShield: true, petContactHooks: true }, usable: () => false, budgetExcluded: true, persistsAfterDeath: true };
    const resonance = (ctx: HookContext, share: number) => {
      if (!realTarget(ctx) || !ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.statuses.some((s) => s.key === LOCK && s.source === ctx.self.side && s.endTick > ctx.tick)) return;
      const old = ctx.enemy.statuses.find((s) => s.key === STACK && s.source === ctx.self.side && s.endTick > ctx.tick), count = (old?.value ?? 0) + share;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== old);
      if (count + EPSILON < stackCount) { ctx.enemy.statuses.push({ kind: "mark", key: STACK, value: count, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(stackDuration) }); syncPet(ctx); return; }
      ctx.enemy.statuses.push({ kind: "mark", key: LOCK, value: 0, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(lockout) }); syncPet(ctx);
      const factor = targetClass(ctx) === "monster" ? monsterMod : 1;
      abilityHit(ctx.world, ctx.self, ctx.enemy, passive, [{ ...passive.onHit![0]!, ...{ type: "damage" as const, damageType: "magic" as const, amount: scaled(proc, factor) } }], Math.min(1, share));
    };
    const execute = (ctx: HookContext, share: number) => {
      if (!realTarget(ctx) || !ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.hp >= derive(ctx.enemy).maxHp * executeThreshold) return;
      const kind = targetClass(ctx), amount = Math.max(executeMin, (executeShare + executeAP * derive(ctx.self).ap) * (derive(ctx.enemy).maxHp - ctx.enemy.hp));
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: { base: Math.min(kind === "minion" || kind === "monster" ? executeCap : Infinity, amount) }, noLifeSteal: true, label: "Parallel Convergence", petDamageCategory: "proc" }, { scale: share });
    };
    const qOut: AbilitySpec = { key: "Qout", name: `${q.name} (outward)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "line", range: qRange, width: qWidths[0]!, speed: qOutSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: outDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: () => false, budgetExcluded: true, persistsAfterDeath: true };
    const qBack: AbilitySpec = { ...qOut, key: "Qreturn", name: `${q.name} (return)`, delivery: { kind: "line", range: qRange, width: qWidths[1]!, speed: qBackSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: backDamage }] };
    const qField: AbilitySpec = { ...qOut, key: "Qslow", name: `${q.name} (Temporal Sickness)`, delivery: { kind: "self" }, onHit: [{ type: "cc", cc: "slow", duration: 1 / 30, strength: qSlow }], flags: { spellShield: false, petContactHooks: true } };
    const wField: AbilitySpec = { key: "Wzone", name: `${w.name} (chronosphere)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "cc", cc: "slow", duration: 1 / 30, strength: wSlow }], flags: { spellShield: false, petContactHooks: true }, usable: () => false, budgetExcluded: true, persistsAfterDeath: true };
    const wStun: AbilitySpec = { ...wField, key: "Wstun", name: `${w.name} (detonation)`, onHit: [{ type: "cc", cc: "stun", duration: stunTime }], flags: { spellShield: true, petContactHooks: true } };
    const rBurst: AbilitySpec = { ...wStun, key: "Rburst", name: `${r.name} (explosion)`, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }] };
    const inArea = (ctx: HookContext, ability: AbilitySpec, x: number, radius: number) => {
      if (Math.abs(ctx.enemy.x - x) <= radius + ctx.enemy.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, ability, ability.onHit!);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.hitPoints && Math.abs(pet.x - x) <= radius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, ability, ability.onHit!, "area");
    };
    const detonate = (ctx: HookContext, zone: Zone) => {
      if (zone.memory?.detonated || !ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection) return;
      (zone.memory ??= {}).detonated = true;
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "shield", amount: wShield, duration: shieldTime }, { scale: 1 });
      inArea(ctx, wStun, zone.x, wRadius);
    };
    const checkSpheres = (ctx: HookContext, from = ctx.self.x, to = ctx.self.x) => {
      for (const zone of ctx.world.zones) if (zone.owner === ctx.self.side && zone.ability === "Wzone" && zone.kind === "field" && zone.startTick <= ctx.tick && zone.endTick > ctx.tick && Math.max(from, to) >= zone.x - wRadius - EPSILON && Math.min(from, to) <= zone.x + wRadius + EPSILON) detonate(ctx, zone);
    };
    const endPhase = (ctx: HookContext) => { delete ctx.memory[E]; ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== E); releaseCooldowns(ctx.world, ctx.self); };
    const beginExpansion = (ctx: HookContext, missile: Missile) => {
      if (ctx.memory[`ekko:q:expand:${missile.id}`] !== undefined) return;
      ctx.memory[`ekko:q:expand:${missile.id}`] = ctx.tick; missile.travelLeft = expandTravel; missile.perTick = expandTravel / ticks(expandTime);
    };
    const launchReturn = (ctx: HookContext, missile: Missile) => {
      if (ctx.memory[`ekko:q:returned:${missile.id}`]) return;
      ctx.memory[`ekko:q:returned:${missile.id}`] = true;
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Qreturn", seenTick: missile.seenTick, x: missile.x, direction: missile.direction === 1 ? -1 : 1, perTick: qBackSpeed / 30, homing: false, followOwner: true, piercing: true, collisionPet: true, radius: qWidths[1]! / 2, travelLeft: Infinity, projectile: true, connects: missile.connects, scale: missile.scale, onHit: qBack.onHit! });
    };
    const ordinary = (self: Unit) => !self.memory[`${REWIND}active`] && (self.action?.kind !== "cast");
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: qCast, overlay: true, delivery: { kind: "self" }, roles: ["damage", "cc"], flags: { projectile: true }, usable: ordinary, budgetExcluded: true, estimate: (self, target) => evaluate(outDamage, self, target) + evaluate(backDamage, self, target), estimateDelay: (self, target) => Math.min(expandAt, Math.abs(target.x - self.x)) / qOutSpeed },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cooldownAtCastStart: true, cost: w.cost(), castTime: w.castTime(), overlay: true, delivery: { kind: "self" }, roles: ["cc", "defense"], usable: ordinary, budgetExcluded: true },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cooldownAfter: "state", cost: e.cost(), castTime: e.castTime(), overlay: true, delivery: { kind: "self" }, flags: { grounded: true, knockdown: true }, roles: ["engage", "escape", "buff"], usable: (self) => ordinary(self) && !phaseReady(self), budgetExcluded: true, estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: rCast, overlay: true, delivery: { kind: "self" }, onCastStart: [{ type: "state", state: "stasis", duration: rCast + rTravel }], flags: { grounded: true, knockdown: false }, roles: ["damage", "defense", "escape"], usable: (self, world) => ordinary(self) && self.memory[`${HISTORY}${world.tick - historyTicks}`] !== undefined, budgetExcluded: true, estimate: (self, target) => Math.abs(Number(self.memory[`${HISTORY}${Number(self.memory["ekko:now"] ?? 0) - historyTicks}`] ?? Infinity) - target.x) <= rRadius + target.spec.base.radius ? evaluate(rDamage, self, target) : 0, estimateDelay: () => rTravel },
      passive, qOut, qBack, qField, wField, wStun, rBurst,
    ];
    const get = (key: string) => abilities.find((ability) => ability.key === key)!;
    const behavior: Behavior = (view) => {
      // The common trade clock and retreat decision precede optional zone entry.
      const result = defaultBehavior(view);
      if (view.mode === "trade" && view.self.memory.tradeDone) return result;
      if (view.mode !== "idle" && !view.self.action) {
        const zones = view.world.zones.filter((zone) => zone.owner === view.self.side && zone.ability === "Wzone" && !zone.memory?.detonated && zone.endTick > view.world.tick);
        const zone = zones.sort((a, b) => a.endTick - b.endTick)[0];
        if (zone && view.world.tick >= zone.startTick && Math.abs(view.self.x - zone.x) > wRadius && Math.abs(view.self.x - zone.x) <= wRadius + eDistance && canCast(view.world, view.self, get("E"))) return { kind: "cast", ability: "E", aim: { direction: (zone.x - view.self.x) * directionTo(view.self, view.enemy) >= 0 ? 1 : -1, distance: Math.max(0, Math.abs(view.self.x - zone.x) - wRadius) } };
        if ((view.mode === "fight" || view.mode === "kite") && canCast(view.world, view.self, get("R")) && (view.self.hp < derive(view.self).maxHp * .5 || Math.abs(Number(view.self.memory[`${HISTORY}${view.world.tick - historyTicks}`]) - view.enemy.x) <= rRadius + view.enemy.spec.base.radius)) return { kind: "cast", ability: "R" };
      }
      if (result?.kind === "cast" && result.ability === "Q" && view.distance > qRange) return { kind: "move", direction: view.mode === "flee" ? -1 : 1 };
      if (result?.kind === "cast" && result.ability === "W" && view.distance > wRange) return { kind: "move", direction: view.mode === "flee" ? -1 : 1 };
      return result;
    };
    kit.assume("Resonance stacks and its four-second post-proc lockout belong to each actual contacted enemy. Three accepted damaging contacts consume them; the proc is separately spell-shieldable and grants 80% movement speed for 3 seconds only against actual champions or explicitly Champion-class summons. Only explicit Monster summons take 270% proc damage. E's enhanced basic is one passive contact. Blind, dodge, block and parry do not generate basic stacks. The source's piecewise passive damage progression evaluates to 150 at the simulator's level 20. Fractional skillshot fallback adds contact weight and scales a completed proc by the final contact's bounded share, an explicit scalar approximation.");
    kit.assume("Timewinder flies at 1650 until its first actual Champion contact or 700 units, then covers the published 190 further units over 1.75 seconds before returning at 2300 to Ekko's current position. Outward and return each damage every actual target at most once and have separate spell-shield checks. The primary estimated 200 expansion speed is inconsistent with 190/1.75; the model interpolates the published distance over duration, and linearly grows the published 160-to-210 slow radius. The server's precise deceleration/growth curves are unavailable. The binary SlowZoneRadius 165 disagrees with the primary range; the primary endpoints win. Slows are membership states renewed each simulation tick, not repeated damaging contacts. Projectiles survive caster death and projectile walls erase the whole remaining flight. The return retains the outward scalar skillshot weight; independently correlated sidestep outcomes are not represented.");
    kit.assume("Parallel Convergence's sphere arms 3.25 seconds after declaration (the primary 2-second afterimage plus 1.25 travel), stays 1.5 seconds and slows 40%. The exact binary DelayBeforeDetonation 3 is retained as a source conflict. Enemy visibility begins 2 seconds after declaration. Actual Ekko entry, including a swept Chronobreak path during untargetability, grants one 180 + 150% AP shield for 2 seconds and separately attempts a 2.25-second stun on each actual enemy. The slow persists after detonation. Death or resurrection cannot invent an entering Ekko. W's basic passive checks below 30% after Resonance and before the ordinary basic packet, then deals max(15, (3% + 3% per 100 AP) * actual missing HP); only source-classified minions/monsters cap at 150.");
    kit.assume("Phase Dive's primary supplies 325 travel, 550 maximum wall extension, 3-second empowerment, 300 bonus attack range, 0.25-second empowered cast and estimated 125 landing range. The exact binary DashDistance array contains seven 350 values, conflicting with the primary's 325; primary 325 remains the runtime displacement. Neither it nor the exact 16.20 binary supplies dash speed. Its initial displacement is therefore immediate and terrain-aware; finite dash travel, knockdown timing and casting during that travel remain an explicit gap rather than inventing a speed. Wall extension occurs only as far as a clear endpoint needs, within 550. The empowered attack is an actual critical basic with E's separate 150 + 40% AP on-hit packet. It validates life, targetability and current reach again at launch, retains E on invalidation, and consumes it on blind/dodge/block. Root/ground remove extra range and suppress the blink; an accepted melee contact can still spend E. E's cooldown starts after the attack is spent or the 3-second window expires.");
    kit.assume("Chronobreak requires four seconds of real in-duel position history; no preduel location or damage history is fabricated. Cast declaration snapshots that historical endpoint, actual path and four-second health-loss total, enters stasis for 0.5 cast + 0.5 travel, then heals at cast completion and traverses the reversed path over 0.5 seconds before the endpoint explosion. Travel is distributed uniformly by recorded path length; exact traversal acceleration is unpublished. Healing is (200 + 60% AP) * (1 + 3 * min(1, actual HP lost in the previous 4 seconds / max HP)); shield absorption does not count and intervening healing does not erase real loss. The primary 100 mana cost wins over the exact binary's rank-3 zero, retained as evidence. No mana is restored. Incoming airborne displacements cannot interrupt the protected travel. Health costs bypassing damage reports and paths before duel start are outside the recorded history.");
    kit.assume("The behavior's contextual Chronobreak for survival or endpoint damage is reserved for fight and kite modes. Trade and hold retain the ordinary ultimate reservation and defensive reactions. The common short-trade clock runs before optional Phase Dive entry into an armed W sphere; a completed trade follows its ordinary retreat instead of entering the sphere or choosing a fresh offensive rewind.");
    kit.assume("The reference budget prices both Q passes, one E enhancement per post-effect cycle, one proc per achievable three-contact-plus-lockout cycle, W's passive at the midpoint of its below-30% window for 30% of attacks, and R's minimum heal/damage. W's shield is conditional on entry, so it receives no guaranteed reference defense. Runtime checks, history, shields, guard interactions and endpoint occupancy determine scored results; no coefficients are tuned to matchup scores.");
    return { abilities, attack: { onHitToPets: true, blockStopsOnHit: true, bonusRangeFor: (self) => phaseReady(self) && canBlink(self) ? eRange : 0 }, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, qRate = 1 / (qCD / haste + qCast), eRate = 1 / (eCD / haste + Math.min(eTime, 1 / Math.max(EPSILON, d.attackSpeed))), rRate = 1 / (rCD / haste + rCast + rTravel), contacts = d.attackSpeed + 2 * qRate + rRate; const executeRate = d.attackSpeed * executeThreshold * Math.max(executeMin, (executeShare + executeAP * d.ap) * derive(target).maxHp * (1 - executeThreshold / 2)); return { magic: (evaluate(outDamage, self, target) + evaluate(backDamage, self, target)) * qRate + evaluate(eDamage, self, target) * eRate + evaluate(proc, self, target) / (lockout + stackCount / Math.max(EPSILON, contacts)) + evaluate(rDamage, self, target) * rRate + executeRate }; }, healing: (self, target) => evaluate(rHeal, self, target) / (rCD / (1 + derive(self).abilityHaste / 100) + rCast + rTravel) },
      hooks: {
        onStart(ctx) { ctx.memory["ekko:now"] = ctx.tick; ctx.memory[`${HISTORY}${ctx.tick}`] = ctx.self.x; },
        onAttackBeforeDamage(ctx) { if (!ctx.blocked) { resonance(ctx, ctx.scale); execute(ctx, ctx.scale); } },
        onAbilityHit(ctx) { if (["Qout", "Qreturn", "Rburst"].includes(ctx.ability.key)) resonance(ctx, ctx.scale); if (ctx.ability.key === "Resonance" && targetClass(ctx) === "champion") ctx.buff("ekko:stolenTime", "moveSpeedPercent", move, moveTime); },
        onAttack(ctx) {
          if (!phaseReady(ctx.self)) return;
          ctx.self.statuses = ctx.self.statuses.filter((status) => status.kind !== "state" || !["invisible", "camouflage"].includes(status.key));
          ctx.action.launchTick = ctx.tick + ticks(eWindup); ctx.action.uncancellable = true; ctx.action.attackTag = E; ctx.action.onHit.push({ type: "damage", damageType: "magic", amount: eDamage, noLifeSteal: true, petDamageCategory: "singleTarget" }); ctx.action.spellShieldOnHit = true;
        },
        onAttackLaunch(ctx) {
          if (ctx.action.attackTag !== E) return;
          const victim = ctx.targetPet ? petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick) : ctx.enemy;
          if ((ctx.action.pet !== undefined && !ctx.targetPet) || !victim.alive || victim.hp <= 0 || inStasis(victim) || isUntargetable(victim, ctx.self) || !canSee(victim, ctx.self) || edgeDistance(ctx.self, victim) > attackRange(ctx.self, victim) + EPSILON) { ctx.self.attackReadyTick = ctx.tick; return false; }
          if (canBlink(ctx.self)) { const direction = victim.x >= ctx.self.x ? 1 : -1; ctx.self.x = victim.x - direction * Math.min(eLanding, Math.abs(victim.x - ctx.self.x)); }
          endPhase(ctx);
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "W") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.min(wRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", ability: "Wzone", seenTick: ctx.tick + ticks(wHidden), startTick: ctx.tick + ticks(wDelay), endTick: ctx.tick + ticks(wDelay), x: ctx.self.x + direction * distance, radius: wRadius, connects: false, onHit: [], memory: { detonated: false } });
          }
          if (ctx.ability.key !== "R") return;
          ctx.memory[`${REWIND}active`] = true; ctx.memory[`${REWIND}declared`] = ctx.tick; ctx.memory[`${REWIND}target`] = Number(ctx.memory[`${HISTORY}${ctx.tick - historyTicks}`]);
          let lost = 0; for (let t = ctx.tick - historyTicks; t <= ctx.tick; t++) lost += Number(ctx.memory[`${LOSS}${t}`] ?? 0);
          ctx.memory[`${REWIND}heal`] = evaluate(rHeal, ctx.self, ctx.self) * (1 + healAmp * Math.min(1, lost / derive(ctx.self).maxHp));
          let length = 0, prior = ctx.self.x;
          for (let i = 0; i <= historyTicks; i++) { const x = i === 0 ? ctx.self.x : Number(ctx.memory[`${HISTORY}${ctx.tick - i}`] ?? prior); ctx.memory[`${REWIND}path:${i}`] = x; if (i > 0) length += Math.abs(x - prior); prior = x; }
          ctx.memory[`${REWIND}length`] = length;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1, chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(qCast), Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius) / qOutSpeed, qWidths[0]! / 2);
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Qout", seenTick: ctx.tick - ticks(qCast), x: ctx.self.x, direction, perTick: qOutSpeed / 30, homing: false, piercing: true, collisionPet: true, radius: qWidths[0]! / 2, travelLeft: expandAt, projectile: true, connects: chance > .02, scale: chance >= .98 ? 1 : chance, onHit: qOut.onHit! });
          }
          if (ctx.ability.key === "E") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), requested = Math.min(eDistance, Math.max(0, ctx.aim?.distance ?? eDistance));
            let dx = direction * requested, endpoint = ctx.self.x + dx, extension = requested;
            for (const terrain of ctx.world.terrain) if (terrain.endTick > ctx.tick && (!terrain.enemyOnly || terrain.owner !== ctx.self.side) && endpoint + ctx.self.spec.base.pathingRadius > terrain.from && endpoint - ctx.self.spec.base.pathingRadius < terrain.to) extension = Math.max(extension, (direction > 0 ? terrain.to + ctx.self.spec.base.pathingRadius - ctx.self.x : ctx.self.x - terrain.from + ctx.self.spec.base.pathingRadius));
            if (extension <= eWallMax) dx = direction * extension;
            const from = ctx.self.x; ctx.self.x += dashDistance(ctx.world, ctx.self, dx); checkSpheres(ctx, from, ctx.self.x);
            ctx.memory[E] = ctx.tick + ticks(eTime); ctx.self.attackReadyTick = ctx.tick;
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "E", memoKey: E, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(eTime), value: 0 });
          }
          if (ctx.ability.key === "R") {
            applyEffect(ctx.world, ctx.self, ctx.self, { type: "heal", amount: { base: Number(ctx.memory[`${REWIND}heal`] ?? 0) } }, { scale: 1 });
            ctx.memory[`${REWIND}travel`] = ctx.tick;
            ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rTravel), perTick: 0, stopAtContact: false, unstoppable: true, crossTerrain: true };
          }
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "Wzone") return;
          ctx.zone.kind = "field"; ctx.zone.startTick = ctx.tick; ctx.zone.endTick = ctx.tick + ticks(wDuration); ctx.zone.interval = 1; ctx.zone.nextTick = ctx.tick; ctx.zone.onHit = wField.onHit; ctx.zone.connects = true;
          if (Math.abs(ctx.self.x - ctx.zone.x) <= wRadius + EPSILON) detonate(ctx, ctx.zone);
        },
        onMissileContact(ctx) { if (ctx.missile.source === "Qout" && !ctx.missile.intercepted && (!ctx.targetPet || ctx.targetPet.spec.targetClass === "champion")) beginExpansion(ctx, ctx.missile); },
        onMissileMove(ctx) {
          // Change phase before the mover retires the original flight at its range.
          if (ctx.missile.source === "Qout" && ctx.missile.travelLeft <= EPSILON && ctx.memory[`ekko:q:expand:${ctx.missile.id}`] === undefined) beginExpansion(ctx, ctx.missile);
        },
        onMissileTick(ctx) {
          const missile = ctx.missile;
          if (missile.source !== "Qout") return;
          const started = ctx.memory[`ekko:q:expand:${missile.id}`];
          if (started === undefined) return;
          const elapsed = ctx.tick - Number(started);
          if (elapsed >= ticks(expandTime)) { launchReturn(ctx, missile); missile.ended = true; return; }
          const radius = expandRadii[0]! + (expandRadii[1]! - expandRadii[0]!) * elapsed / ticks(expandTime);
          inArea(ctx, qField, missile.x, radius);
        },
        onMissileEnd(ctx) { if (ctx.missile.source === "Qout" && ctx.reason === "range" && !ctx.missile.intercepted && ctx.memory[`ekko:q:expand:${ctx.missile.id}`] !== undefined) launchReturn(ctx, ctx.missile); },
        onTick(ctx) {
          ctx.memory["ekko:now"] = ctx.tick; ctx.memory[`${HISTORY}${ctx.tick}`] = ctx.self.x; delete ctx.memory[`${HISTORY}${ctx.tick - historyTicks - 1}`]; delete ctx.memory[`${LOSS}${ctx.tick - historyTicks - 1}`];
          if (ctx.memory[E] !== undefined && ctx.tick >= Number(ctx.memory[E])) endPhase(ctx);
          if (ctx.memory[`${REWIND}active`] && ctx.memory[`${REWIND}travel`] !== undefined) {
            const elapsed = ctx.tick - Number(ctx.memory[`${REWIND}travel`]), share = Math.min(1, elapsed / ticks(rTravel)), desired = Number(ctx.memory[`${REWIND}length`]) * share;
            let remaining = desired, x = Number(ctx.memory[`${REWIND}path:0`]);
            for (let i = 1; i <= historyTicks; i++) { const next = Number(ctx.memory[`${REWIND}path:${i}`]), distance = Math.abs(next - x); if (remaining <= distance + EPSILON) { x += Math.sign(next - x) * Math.min(distance, remaining); break; } remaining -= distance; x = next; }
            const from = ctx.self.x; ctx.self.x = x; checkSpheres(ctx, from, x);
          }
          checkSpheres(ctx);
        },
        onDashEnd(ctx) { if (ctx.ability.key !== "R") return; inArea(ctx, rBurst, Number(ctx.memory[`${REWIND}target`]), rRadius); ctx.memory[`${REWIND}active`] = false; delete ctx.memory[`${REWIND}travel`]; },
        onDamageTaken(ctx) { ctx.memory[`${LOSS}${ctx.tick}`] = Number(ctx.memory[`${LOSS}${ctx.tick}`] ?? 0) + ctx.amount; },
      },
    };
  },
};
export default ekko;
