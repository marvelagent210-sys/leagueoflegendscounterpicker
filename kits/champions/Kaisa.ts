/** Kai'Sa: target-local Plasma, committed individual Q missiles and permanent-stat evolutions. */
import type { KitModule } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { EPSILON, canCast, inAttackRange } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import { dashDistance } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, scaled, ticks } from "./util";

const PLASMA = "kaisa:plasma", RECENT = "kaisa:recentPlasma", EUNTIL = "kaisa:superchargeUntil";
const kaisa: KitModule = {
  champion: "Kaisa",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const plasmaSeconds = p.quoted("Plasma to enemies for 4 seconds"), maxStacks = p.quoted("stacking up to 5 times"), basicStacks = p.quoted("Basic attacks each apply 1 stack"), wStacks = p.quoted("Void Seeker applies 2 stacks"), evolvedWStacks = p.quoted("increased to 3 if it is evolved");
    const flatBase = p.at20(p.seriesIn("additional magic damage plus", 0), "Caustic Wounds flat"), stackBase = p.at20(p.seriesIn("additional magic damage plus", 1), "Caustic Wounds per prior stack");
    const flatAP = p.quoted("(+ 12% AP) additional magic damage") / 100, stackAP = p.quoted("(+ 3% AP) additional magic damage per Plasma stack") / 100;
    const ruptureBase = p.quoted("15% (+ 6% per 100 AP) of the target's missing health") / 100, ruptureAP = p.quoted("15% (+ 6% per 100 AP) of the target's missing health", 1) / 10000;
    p.quote("before a triggering basic attack's"); p.quote("remaining stacks are reapplied afterwards"); p.quote("permanent stats from items and stat growth"); p.quote("Adaptive force from items does not count");
    const qMissiles = q.quoted("swarm of 6 missiles"), evolvedQMissiles = q.quoted("instead fires 12 missiles"), qDelay = q.quoted("after 0.4 seconds"), qReleaseSeconds = q.quoted("takes 1 second for all missiles"), qRepeat = q.quoted("Non-minions take 25% damage") / 100, qDamage = q.formula("Physical Damage Per Missile"), qRange = q.field("targetRange");
    const qMinionThreshold = q.quoted("Minions below 35% health take double damage") / 100;
    q.gameQuote('"mTravelTime":0.4000000059604645,"__type":"FixedTimeSplineMovement"');
    q.quote("Spell shields only block the damage from a single missile"); q.quote("acquires its targets upon cast"); q.quote("visible enemies"); q.quote("the rest on the same target apply persistent area damage");
    const evolutionAD = q.quoted("Requires 100"), evolutionAP = w.quoted("Requires 100 ability power"), evolutionAS = e.quoted("Requires 100") / 100;
    const firstAD = kit.champion.forms[0]!.stats.attackDamage.base;
    const qEvolved = (self: Unit) => self.spec.base.ad - firstAD + (self.spec.bonus?.ad ?? 0) + EPSILON >= evolutionAD;
    const wEvolved = (self: Unit) => (self.spec.bonus?.ap ?? 0) + EPSILON >= evolutionAP;
    const eEvolved = (self: Unit) => self.spec.base.attackSpeed.bonus + (self.spec.bonus?.attackSpeed ?? 0) + EPSILON >= evolutionAS;
    const wDamage = w.formula("Magic Damage"), wReveal = w.quoted("reveals them for 4 seconds"), wRefund = w.quoted("refunds 75% of its cooldown") / 100;
    w.quote("{{tip|true sight|reveals}} them for 4 seconds");
    const eAS = e.fraction("Bonus Attack Speed"), eBuffSeconds = e.quoted("bonus attack speed for 4 seconds"), eMinMS = e.fraction("Minimum Movement Speed"), eMaxMS = e.fraction("Maximum Movement Speed"), eRefund = e.quoted("reduced by 0.5 seconds on-attack"), eInvisible = e.quoted("invisibility at the start of the cast time for 0.5 seconds"), eWindup = e.quoted("lower windup of 6.4433%") / 100, eMissileSpeed = e.quoted("Attack Missile Speed: 2500");
    const eCastValues = e.fieldNumbers("castTime"), eMaxCast = eCastValues[0]!, eMinCast = eCastValues.at(-1)!;
    e.quote("formula= 1.2 /(1 + '''bonus''' attack speed/100)");
    e.gameQuote(e.record.gameSources![0]!.text[0]!);
    const eCast = (self: Unit) => Math.max(eMinCast, eMaxCast / (1 + Math.max(0, derive(self).bonusAttackSpeed)));
    const rShield = r.formula("Shield Strength"), rShieldSeconds = r.quoted("shield for 2 seconds"), rRange = r.field("targetRange"), rRadius = r.field("effectRadius"), rSpeed = r.field("speed");
    r.quote("duration is refreshed when the dash ends"); r.quote("resets Kai'Sa's basic attack timer"); r.quote("cast any of her abilities during the dash"); r.quote("Stack application or consumption");
    const plasmaCount = (target: Unit, self: Unit, tick: number) => target.statuses.find((s) => s.kind === "mark" && s.key === PLASMA && s.source === self.side && s.endTick > tick)?.value ?? 0;
    const qFirst: AbilitySpec = { key: "Qfirst", name: `${q.name} (first missile)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage, petDamageCategory: "area" }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true };
    const qRepeatAbility: AbilitySpec = { ...qFirst, key: "Qrepeat", name: `${q.name} (subsequent missile)`, onHit: [{ type: "damage", damageType: "physical", amount: scaled(qDamage, qRepeat), persistent: true, petDamageCategory: "persistent" }] };
    const targets = (self: Unit, world: HookContext["world"]) => {
      const enemy = world.units[1 - self.side]!, found: Array<{ unit: Unit; pet?: Pet }> = [];
      if (enemy.alive && canSee(enemy, self) && !isUntargetable(enemy, self) && Math.abs(enemy.x - self.x) <= qRange + EPSILON) found.push({ unit: enemy });
      for (const pet of world.pets) if (pet.owner !== self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints) {
        const unit = petFormulaTarget(pet, self, world.tick);
        if (canSee(unit, self) && !isUntargetable(unit, self) && Math.abs(unit.x - self.x) <= qRange + EPSILON) found.push({ unit, pet });
      }
      return found;
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, usable: (self, world) => !(self.action?.kind === "cast" && self.action.ability === "E") && targets(self, world).length > 0, roles: ["damage"], budgetExcluded: true, estimate: (self, target) => evaluate(qDamage, self, target) * (1 + ((qEvolved(self) ? evolvedQMissiles : qMissiles) - 1) * qRepeat), estimateDelay: () => qDelay },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), overlay: true, usable: (self) => self.action?.kind !== "cast", delivery: { kind: "line", range: w.field("targetRange"), width: w.field("width"), speed: w.field("speed"), collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true, roles: ["damage"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: eMaxCast, castTimeFor: eCast, moveWhileCasting: true, overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: eAS }, duration: eBuffSeconds }], roles: ["buff", "engage", "escape"], usable: (self, world) => self.action?.kind !== "cast" && world.tick >= Number(self.memory[EUNTIL] ?? -1) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, flags: { grounded: true, knockdown: true }, onSelf: [{ type: "shield", amount: rShield, duration: rShieldSeconds }, { type: "resetAttack" }], usable: (self, world) => { const target = world.units[1 - self.side]!; return target.alive && canSee(target, self) && !isUntargetable(target, self) && Math.abs(self.x - target.x) <= rRange + EPSILON && target.statuses.some((s) => s.key === RECENT && s.source === self.side && s.endTick > world.tick); }, roles: ["defense", "engage", "escape"] },
      qFirst, qRepeatAbility,
    ];
    const plasma = (ctx: HookContext, count: number, damage: boolean, scale = 1) => {
      let current = plasmaCount(ctx.enemy, ctx.self, ctx.tick);
      // A capped expected-value branch can carry fractional applications; no random proc is invented.
      let left = count * scale;
      while (left > EPSILON) {
        const share = Math.min(1, left), d = derive(ctx.self);
        if (damage) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: { base: flatBase + flatAP * d.ap + current * (stackBase + stackAP * d.ap) }, label: p.name, noLifeSteal: true, petDamageCategory: "proc" }, { scale: share });
        current += share; left -= share;
        if (current + EPSILON >= maxStacks) {
          applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: { base: Math.max(0, derive(ctx.enemy).maxHp - ctx.enemy.hp) * (ruptureBase + ruptureAP * d.ap) }, label: `${p.name} (rupture)`, noLifeSteal: true, petDamageCategory: "proc" }, { scale: 1 });
          current = Math.max(0, current - maxStacks);
        }
      }
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: PLASMA, duration: plasmaSeconds, value: current }, { scale: 1 });
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: RECENT, duration: plasmaSeconds }, { scale: 1 });
    };
    const cleanMissile = (ctx: HookContext, id: number) => { for (const suffix of ["release", "due", "origin", "pet", "repeat"]) delete ctx.memory[`kaisa:q:${id}:${suffix}`]; };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && command.ability === "R" && command.dodge === undefined) {
        const destination = Math.max(0, view.distance - Math.min(rRadius, view.self.spec.attack.range));
        return { ...command, aim: { direction: 1, distance: destination } };
      }
      if ((view.mode === "fight" || view.mode === "trade" || view.mode === "kite") && !view.self.action && command?.kind !== "cast" && inAttackRange(view.self, view.enemy) && canCast(view.world, view.self, abilities[0]!)) return { kind: "cast", ability: "Q" };
      return command;
    };
    kit.assume("Living Weapon counts only permanent level-growth stats plus directly allocated stat-budget AD/AP/attack speed. Base level-one AD, temporary buffs and adaptive-force items do not qualify; the abstract budget contains no such items. At level 20 the growth contribution is 51.129 AD and 35.397% AS. Evolutions are available before the duel without a free in-combat two-second upgrade cast, and are removed when qualifying permanent stats are absent.");
    kit.assume("Plasma is target-local, expires after 4 seconds and starts empty. Every accepted ordinary attack applies its flat magic on-hit, then a possible fifth-stack missing-health rupture, before ordinary critical physical damage. Void Seeker deals its own magic first, then applies two or three sequential flat passive packets and any rupture; overflow stacks remain. Blind/dodge/parry/block deny the basic passive. Expected-value branch-cap hits carry fractional stack progress. Only actual own accepted immobilization/polymorph can supply a non-damaging stack; no allied champion is invented. The duel has no jungle monsters, so the monster-only 400 rupture cap is not applied to ordinary summons.");
    kit.assume("Icathian Rain locks visible targets within 600 center units at cast, distributes six/twelve individual missiles evenly in stable champion-then-pet order, and assigns any remainder in that order. It commits its one-second release sequence even if Kai'Sa dies. Every release has an exact 0.4-second flight and target-following straight-line interpolation; the source's cosmetic spline is absent. Each crossed projectile wall can destroy that missile. Ordinary targetability/stasis/parry and each target's own spell shield are checked per impact. First missiles are area packets and repeats persistent-area packets. Non-minion repeats deal 25%; summons explicitly classified as Minion by their pinned pet record instead take full repeat damage, doubled for each packet whose impact finds them below 35% maximum health. Champion-class Spirits and unclassified pets retain the non-minion rule. A target's death does not retarget its committed missiles.");
    kit.assume("Supercharge snapshots its bonus-AS cast time and movement-speed multiplier when declared: max(0.6, 1.2 / (1 + bonus AS)) seconds and 75%–150% movement speed. This uses the pinned raw wiki formula; the client tooltip calculation instead references total attack speed with a linear subtraction, an unresolved source conflict. Charging is mobile and ghosted, prevents attacks, and grants 80% AS for 4 seconds only on completion. Evolved E gives 0.5-second invisibility at declaration. Charged attacks use 6.4433% windup and 2500 missile speed; every declared attack refunds 0.5 actual seconds of current E cooldown, independently of later avoidance.");
    kit.assume("Void Seeker collides with the first real champion or summon, uses the ordinary skillshot branching model, grants four-second true sight according to the exact pinned reveal tooltip, and refunds 75% of its total haste-adjusted cooldown only on an evolved champion hit. New Q/W casts are denied during E charging; already-committed Q missiles continue. Q/W/E can overlay R's dash, while timed W/E casts cannot replace another ongoing cast. Killer Instinct requires a visible actual champion within 3000 whose Plasma was applied or consumed in the last 4 seconds. Its shield is applied once on departure and its remaining amount lasts another 2 seconds after landing; it is not refilled. Its 3800 dash speed is a wiki estimate. The normal policy lands on the near side 525 units from the enemy; free-angle positioning is absent, and caller-selected line endpoints are clipped to the sourced 525-unit landing circle.");
    kit.assume("The budget values an isolated full Q sequence, the average continuous-attack flat passive and a rupture against half-missing health, plus capped four-second E attack-speed uptime. W is priced by its ordinary packet and sequential passive contribution, with evolved champion-hit cooldown refunds. Runtime missile sharing, shields, death and stack expiration remain resolved by the duel.");
    return {
      attack: { onHitToPets: true }, abilities, behavior,
      budget: {
        damage(self, target) {
          const d = derive(self), haste = 1 + d.abilityHaste / 100, passiveAverage = flatBase + flatAP * d.ap + (maxStacks - 1) / 2 * (stackBase + stackAP * d.ap), rupture = derive(target).maxHp * .5 * (ruptureBase + ruptureAP * d.ap), n = qEvolved(self) ? evolvedQMissiles : qMissiles;
          const eCycle = eCast(self) + abilities[2]!.cooldown / haste / (1 + d.attackSpeed * eRefund), added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, eAS)) - d.attackSpeed) * Math.min(1, eBuffSeconds / eCycle);
          const wCycle = abilities[1]!.cooldown / haste * (wEvolved(self) ? 1 - wRefund : 1) + abilities[1]!.castTime;
          return { physical: evaluate(qDamage, self, target) * (1 + (n - 1) * qRepeat) / (abilities[0]!.cooldown / haste) + attackDamage(self) * added, magic: (passiveAverage + rupture / maxStacks) * (d.attackSpeed + added) + (wEvolved(self) ? evolvedWStacks : wStacks) * passiveAverage / wCycle + evaluate(wDamage, self, target) * (1 / wCycle - 1 / (abilities[1]!.cooldown / haste + abilities[1]!.castTime)) };
        },
      },
      hooks: {
        onAttackBeforeDamage(ctx) { if (!ctx.blocked) plasma(ctx, basicStacks, true, ctx.scale); },
        onAttack(ctx) {
          ctx.apply({ type: "refund", ability: "E", seconds: eRefund }, true);
          if (ctx.tick < Number(ctx.memory[EUNTIL] ?? -1)) { ctx.action.launchTick = ctx.tick + ticks(eWindup / derive(ctx.self).attackSpeed); ctx.action.missileSpeed = eMissileSpeed; }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "E") {
            const duration = eCast(ctx.self), share = Math.min(1, Math.max(0, derive(ctx.self).bonusAttackSpeed));
            ctx.apply({ type: "state", state: "ghosted", duration }, true); ctx.apply({ type: "state", state: "noAttacks", duration }, true);
            ctx.buff("kaisa:chargeSpeed", "moveSpeedPercent", eMinMS + (eMaxMS - eMinMS) * share, duration);
            if (eEvolved(ctx.self)) ctx.apply({ type: "state", state: "invisible", duration: eInvisible }, true);
          }
          if (ctx.ability.key === "R") {
            const relative = ctx.enemy.x - ctx.self.x, direction = relative < 0 ? -1 : 1, requested = ctx.aim?.direction === -1 ? -(ctx.aim.distance ?? 0) : ctx.aim?.distance ?? Math.max(0, Math.abs(relative) - rRadius);
            const clamped = Math.max(Math.abs(relative) - rRadius, Math.min(Math.abs(relative) + rRadius, requested));
            // startCast retains the same aim object for delivery.
            if (ctx.aim) { ctx.aim.direction = clamped < 0 ? -1 : 1; ctx.aim.distance = Math.abs(clamped); }
            ctx.memory["kaisa:rDestination"] = ctx.self.x + direction * clamped;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") ctx.memory[EUNTIL] = ctx.tick + ticks(eBuffSeconds);
          if (ctx.ability.key === "R") { const distance = dashDistance(ctx.world, ctx.self, Number(ctx.memory["kaisa:rDestination"]) - ctx.self.x), duration = Math.max(1, ticks(Math.abs(distance) / rSpeed)); ctx.self.action = { kind: "dash", ability: "R", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: distance / duration, stopAtContact: false, unstoppable: false, crossTerrain: true }; }
          if (ctx.ability.key !== "Q") return;
          const chosen = targets(ctx.self, ctx.world), count = qEvolved(ctx.self) ? evolvedQMissiles : qMissiles, seen = new Set<number>();
          if (!chosen.length) return;
          for (let i = 0; i < count; i++) {
            const target = chosen[i % chosen.length]!, identity = target.pet?.id ?? -1, repeat = seen.has(identity), id = ctx.world.nextId++, prefix = `kaisa:q:${id}:`, release = ctx.tick + ticks(qReleaseSeconds * i / Math.max(1, count - 1)); seen.add(identity);
            ctx.memory[`${prefix}release`] = release; ctx.memory[`${prefix}due`] = release + ticks(qDelay); ctx.memory[`${prefix}origin`] = ctx.self.x; ctx.memory[`${prefix}repeat`] = repeat;
            if (target.pet) ctx.memory[`${prefix}pet`] = target.pet.id;
            const minion = target.pet?.spec.targetClass === "minion";
            const onHit: Effect[] = [{ type: "damage", damageType: "physical", amount: scaled(qDamage, minion || !repeat ? 1 : qRepeat), amountFor: (self, victim) => evaluate(qDamage, self, victim) * (minion ? victim.hp < derive(victim).maxHp * qMinionThreshold ? 2 : 1 : repeat ? qRepeat : 1), ...(repeat ? { persistent: true } : {}), petDamageCategory: repeat ? "persistent" : "area" }];
            ctx.world.missiles.push({ id, owner: ctx.self.side, source: repeat ? "Qrepeat" : "Qfirst", seenTick: ctx.tick, x: ctx.self.x, perTick: 0, homing: true, direction: target.unit.x >= ctx.self.x ? 1 : -1, travelLeft: Infinity, projectile: true, connects: false, scale: 1, onHit, impactTick: release + ticks(qDelay), expiresTick: release + ticks(qDelay) + 1, ...(target.pet ? { pet: target.pet.id } : {}) });
          }
        },
        onMissileTick(ctx) {
          if (!["Qfirst", "Qrepeat"].includes(ctx.missile.source)) return;
          const m = ctx.missile, prefix = `kaisa:q:${m.id}:`, release = Number(ctx.memory[`${prefix}release`]), due = Number(ctx.memory[`${prefix}due`]);
          if (ctx.tick < release) return;
          const petId = ctx.memory[`${prefix}pet`], pet = typeof petId === "number" ? ctx.world.pets.find((p) => p.id === petId) : undefined;
          if (typeof petId === "number" && !pet) { m.ended = true; cleanMissile(ctx, m.id); return; }
          const target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.enemy;
          if (!target.alive || isUntargetable(target, ctx.self) || inStasis(target)) { m.ended = true; cleanMissile(ctx, m.id); return; }
          if (ctx.tick === release) { ctx.memory[`${prefix}origin`] = ctx.self.x; m.x = ctx.self.x; }
          const origin = Number(ctx.memory[`${prefix}origin`]), phase = Math.min(1, (ctx.tick - release) / Math.max(1, due - release)), next = origin + (target.x - origin) * phase;
          if (projectileBlocked(ctx.world, ctx.self.side, m.x, next)) { m.ended = true; cleanMissile(ctx, m.id); return; }
          m.x = next;
          if (ctx.tick >= due) { const ability = m.source === "Qfirst" ? qFirst : qRepeatAbility; if (pet) abilityHitPet(ctx.world, ctx.self, pet, ability, m.onHit, m.source === "Qfirst" ? "area" : "persistent"); else abilityHit(ctx.world, ctx.self, target, ability, m.onHit); m.ended = true; cleanMissile(ctx, m.id); }
        },
        onMissileEnd(ctx) { if (["Qfirst", "Qrepeat"].includes(ctx.missile.source)) cleanMissile(ctx, ctx.missile.id); },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "W") return;
          plasma(ctx, wEvolved(ctx.self) ? evolvedWStacks : wStacks, true, ctx.scale);
          ctx.apply({ type: "state", state: "revealed", duration: wReveal });
          if (ctx.enemy.petId === undefined && wEvolved(ctx.self)) ctx.apply({ type: "refund", ability: "W", fraction: wRefund, total: true }, true);
        },
        onEnemyCCApplied(ctx) { if (ctx.source.side === ctx.self.side && ctx.target.petId === undefined && ["airborne", "berserk", "charm", "fear", "root", "sleep", "stun", "suppression", "suspension", "taunt", "polymorph"].includes(ctx.cc)) plasma({ ...ctx, enemy: ctx.target }, 1, false); },
        onDashEnd(ctx) { if (ctx.ability.key === "R") for (const status of ctx.self.statuses) if (status.kind === "shield" && status.source === ctx.self.side && status.key === "R") status.endTick = ctx.tick + ticks(rShieldSeconds); },
      },
    };
  },
};
export default kaisa;
