/** Tristana keeps charges on their actual targets, including after her own death. */
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import type { KitModule } from "../../engine/kits/compile";
import { attackTiming, canCast, EPSILON, inAttackRange } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, hookContext } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { terrainLimit } from "../../engine/sim/terrain";
import type { Unit, Zone } from "../../engine/sim/state";
import { attackDamage, extraAttacks, ticks } from "./util";
const BOMB = "tristana:bomb", TIMER = "tristana:timer", R_TIMER = "tristana:rTimer";
const tristana: KitModule = {
  champion: "Tristana",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const bonusRange = p.at20(p.seriesIn("bonus range", 0), "bonus range"), range = kit.champion.forms[0]!.stats.attackRange + bonusRange, basicSpeed = p.gameQuoted("mSpell.missileSpeed: 2250.0");
    const qAS = q.fraction("Bonus Attack Speed"), qSeconds = q.quoted("for 7 seconds"); q.quote("non-refreshing buff");
    const wDamage = w.formula("Magic Damage"), wRange = w.field("targetRange"), wRadius = w.field("effectRadius"), wSpeed = w.field("speed"), wSlow = w.quoted("slows them by 40%") / 100, wSlowSeconds = w.quoted("for 2 seconds");
    w.quote("can cast any of her abilities during the dash"); w.quote("detonating Explosive Charge at maximum stacks on a champion will reset"); w.quote("Killing clones or detonating Explosive Charge on them also resets");
    const ePassive = e.formula("Magic Damage"), eBase = e.formula("Minimum Physical Damage"), eSeconds = e.quoted("attaches to them for 4 seconds"), eStack = e.quoted("damage by 25%") / 100, eMax = e.quoted("stacking up to 4 times"), eRadius = e.field("effectRadius", "Active"), passiveRadius = e.field("effectRadius", "Passive");
    e.quote("Dodge, block and blind all prevent"); e.quote("detonation will deal damage to the primary target even if they have become untargetable"); e.quote("delayed until the end of the knock back or the 4 seconds expire"); e.quote("does not go on cooldown nor pay its cost"); e.quote("initial application deals 0 physical damage"); e.quote("always 100% of the caster's attack windup time");
    const eReferenceCast = e.quoted("base attack speed, Tristana's attack windup is 0.225625 seconds");
    const critModifier = Number(e.gameQuoted("mSpell.DataValues.CritChanceModifier.values: [0.4000000059604645").toFixed(6));
    e.gameQuote('"mPart1":{"mStat":8,"mDataValue":"CritChanceModifier","__type":"StatByNamedDataValueCalculationPart"},"mPart2":{"mSubparts":[{"mStat":9,"mCoefficient":1.0,"__type":"StatByCoefficientCalculationPart"},{"mNumber":-1.0,"__type":"NumberCalculationPart"}]');
    const rDamage = r.formula("Magic Damage"), knockDistance = r.number("Knock Back Distance"), stunSeconds = r.number("Stun Duration"), rSpeed = r.field("speed", "Missile speed"), pushSpeed = r.field("speed", "Knockback speed"), rRadius = r.field("effectRadius");
    r.quote("0 default damage to secondary targets"); r.quote("does not stack Explosive Charge"); r.quote("location at the end of the cast time"); r.quote("airborne debuff is removed early when the forced movement stops"); r.quote("Displacement immunity will also resist the application of the stun"); r.quote("does not go on cooldown nor pay its cost");
    const critAmp = (self: Unit) => { const d = derive(self); return 1 + critModifier * d.critChance * (d.critDamage - 1); };
    const bombRaw = (self: Unit, target: Unit, stacks: number) => evaluate(eBase, self, target) * (1 + eStack * stacks) * critAmp(self);
    const hidden = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, flags: { spellShield: shield, projectile: false, petContactHooks: true }, persistsAfterDeath: true });
    const burst = hidden("Eburst", `${e.name} (detonation)`, [{ type: "damage", damageType: "physical", amount: eBase }]);
    const primary = { ...burst, key: "Eprimary", flags: { ...burst.flags, hitsUntargetable: true } };
    const passive = hidden("Epassive", `${e.name} (kill explosion)`, [{ type: "damage", damageType: "magic", amount: ePassive }]);
    const clock = hidden("Eclock", `${e.name} (attached timer)`, [{ type: "damage", damageType: "physical", amount: { base: 0 } }], false);
    const rControl = hidden("Rcontrol", `${r.name} (knockback)`, [], false);
    const secondaryControl = hidden("Rsecondary", `${r.name} (collateral control)`, [{ type: "damage", damageType: "magic", amount: { base: 0 } }]);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: qAS }, duration: qSeconds }], roles: ["buff"], usable: (self, world) => world.tick >= Number(self.memory["tristana:qEnd"] ?? -1) },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "dash", direction: "toward", distance: wRange, minDistance: 0, speed: wSpeed, through: true, crossTerrain: true }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "slow", strength: wSlow, duration: wSlowSeconds }], flags: { grounded: true, knockdown: true, spellShield: true, petContactHooks: true }, roles: ["engage", "escape", "damage"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: eReferenceCast, castTimeFor: (self) => attackTiming(self).windup / 30, overlay: true, cancelOnInvalidTarget: true, delivery: { kind: "target", range, missileSpeed: e.field("speed") }, onHit: [{ type: "damage", damageType: "physical", amount: { base: 0 } }], flags: { projectile: true, spellShield: true, petContactHooks: true }, estimate: (self, target) => bombRaw(self, target, eMax), estimateDelay: () => eSeconds, roles: ["damage"], budgetExcluded: true, persistsAfterDeath: true },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, cancelOnInvalidTarget: true, delivery: { kind: "target", range, missileSpeed: rSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage"], persistsAfterDeath: true }, burst, primary, passive, clock, rControl, secondaryControl,
    ];
    const targetOf = (ctx: HookContext, zone: Zone): Unit | undefined => { const id = zone.memory?.pet; if (id !== undefined) { const pet = ctx.world.pets.find((pet) => pet.id === id); if (!pet) return undefined; const target = petFormulaTarget(pet, ctx.self, ctx.tick); const end = Number(pet.memory["tristana:forcedEnd"] ?? -1); if (ctx.tick < end) target.forced = { endTick: end, perTick: 0 }; return target; } return ctx.world.units[ctx.self.side === 0 ? 1 : 0]; };
    const matching = (ctx: HookContext) => ctx.world.zones.find((zone) => zone.owner === ctx.self.side && zone.memory?.[BOMB] && zone.memory.pet === ctx.enemy.petId);
    const rawEffects = (raw: number): Effect[] => [{ type: "damage", damageType: "physical", amount: { base: raw }, petDamageCategory: "area" }];
    const detonate = (ctx: HookContext, zone: Zone) => {
      if (!ctx.world.zones.includes(zone)) return;
      const target = targetOf(ctx, zone), x = target?.x ?? zone.x, count = Number(zone.memory?.stacks ?? 0), raw = bombRaw(ctx.self, target ?? ctx.enemy, count), packet = rawEffects(raw);
      ctx.world.zones = ctx.world.zones.filter((candidate) => candidate.id !== zone.id && candidate.memory?.bomb !== zone.id);
      zone.onHit = []; zone.noPets = true;
      if (target?.alive) { if (target.petId === undefined) abilityHit(ctx.world, ctx.self, target, primary, packet); else { const pet = ctx.world.pets.find((pet) => pet.id === target.petId); if (pet) abilityHitPet(ctx.world, ctx.self, pet, primary, packet, "area"); } }
      const champion = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
      if (zone.memory?.pet !== undefined && champion.alive && Math.abs(champion.x - x) <= eRadius + champion.spec.base.radius + 1e-6) abilityHit(ctx.world, ctx.self, champion, burst, packet);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && pet.id !== target?.petId && Math.abs(pet.x - x) <= eRadius + pet.spec.radius + 1e-6) abilityHitPet(ctx.world, ctx.self, pet, burst, packet, "area");
      if (count >= eMax && zone.memory?.pet === undefined) ctx.self.cooldownReady.W = ctx.tick;
      ctx.log(`Explosive Charge detonates at ${count} stacks`);
    };
    const addStack = (ctx: HookContext, fromR = false) => {
      const zone = matching(ctx); if (!zone) return;
      zone.memory!.stacks = Math.min(eMax, Number(zone.memory!.stacks ?? 0) + 1);
      zone.onHit = rawEffects(bombRaw(ctx.self, ctx.enemy, Number(zone.memory!.stacks)));
      if (Number(zone.memory!.stacks) < eMax) return;
      if (fromR && ctx.enemy.forced) { zone.memory!.rWait = true; zone.endTick = Math.min(Number(zone.memory!.until), ctx.enemy.forced.endTick); }
      else detonate(ctx, zone);
    };
    const blastPassive = (ctx: HookContext) => {
      const x = ctx.enemy.x, champion = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
      if (ctx.enemy.petId !== undefined && champion.alive && Math.abs(champion.x - x) <= passiveRadius + champion.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, champion, passive, passive.onHit!);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && pet.id !== ctx.enemy.petId && Math.abs(pet.x - x) <= passiveRadius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, passive, passive.onHit!, "area");
    };
    const connectedAttack = (ctx: HookContext & { blocked: boolean }) => { if (!ctx.blocked) { const killedByBasic = ctx.enemy.hp <= 0; addStack(ctx); if (killedByBasic) blastPassive(ctx); } };
    const control = (ctx: HookContext, target: Unit, primaryTarget: boolean) => {
      if (hasState(target, "displacementImmune")) return;
      const pet = target.petId === undefined ? undefined : ctx.world.pets.find((pet) => pet.id === target.petId);
      if (pet?.spec.ccImmune?.includes("airborne")) return;
      const direction = Number(ctx.memory["tristana:rDirection"] ?? directionTo(ctx.self, target));
      const origin = primaryTarget ? Number(ctx.memory["tristana:rOrigin"] ?? ctx.self.x) : target.x - direction;
      const proxy = pet ? { ...target, statuses: [...target.statuses] } : target;
      if (pet) delete proxy.petId;
      const before = proxy.forced, previousStatuses = new Set(proxy.statuses);
      applyEffect(ctx.world, ctx.self, proxy, { type: "displace", direction: "away", distance: knockDistance, duration: knockDistance / pushSpeed, originX: origin, stopAtWall: true }, { ability: rControl, scale: 1 });
      const airborne = proxy.statuses.find((status) => !previousStatuses.has(status) && status.kind === "cc" && status.key === "airborne" && status.source === ctx.self.side);
      if (!airborne) return;
      airborne.ability = rControl.key;
      const moving = proxy.forced && proxy.forced !== before;
      // A touching wall ends airborne immediately, while the separately ranked stun remains.
      if (!moving) proxy.statuses = proxy.statuses.filter((status) => status !== airborne);
      if (pet) { target.forced = proxy.forced; target.statuses = proxy.statuses; }
      if (!pet?.spec.ccImmune?.includes("stun")) applyEffect(ctx.world, ctx.self, proxy, { type: "cc", cc: "stun", duration: stunSeconds }, { ability: rControl, scale: 1 });
      applyEffect(ctx.world, ctx.self, proxy, { type: "mark", key: "tristana:busterSight", duration: stunSeconds }, { ability: rControl, scale: 1 });
      if (pet) { target.statuses = proxy.statuses; pet.statuses = proxy.statuses; pet.memory["tristana:forcedEnd"] = moving ? proxy.forced!.endTick : ctx.tick; delete pet.windup; }
      if (moving) ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: target.x, radius: 0, startTick: ctx.tick, endTick: ctx.tick, ability: clock.key, onHit: [], noPets: true, memory: { [R_TIMER]: true, end: ctx.tick + ticks(stunSeconds), ...(pet ? { pet: pet.id, moveEnd: proxy.forced!.endTick, perTick: proxy.forced!.perTick, remaining: proxy.forced!.remaining ?? knockDistance } : {}) } });
      if (primaryTarget) ctx.memory["tristana:rConnected"] = ctx.tick;
    };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (view.mode !== "fight" && view.mode !== "trade" && view.mode !== "kite") return command;
      if (command?.kind === "cast" && command.dodge !== undefined) return command;
      if (!view.self.action && inAttackRange(view.self, view.enemy)) {
        const ctx = hookContext(view.world, view.self), bomb = matching(ctx);
        if (!bomb && canCast(view.world, view.self, abilities[2]!)) return { kind: "cast", ability: "E" };
        if (bomb && canCast(view.world, view.self, abilities[0]!)) return { kind: "cast", ability: "Q" };
        if (bomb && view.self.attackReadyTick <= view.world.tick) return { kind: "attack" };
        if (bomb && Number(bomb.memory?.stacks ?? 0) < eMax - 1 && command?.kind === "cast" && command.ability === "R") return { kind: "move", direction: 0 };
      }
      if (command?.kind === "cast" && command.ability === "W") return { ...command, aim: { direction: 1, distance: Math.min(wRange, view.distance) } };
      return command;
    };
    kit.assume("Draw a Bead uses the pinned level-20 167.647058823529 bonus range for attacks, E and R, yielding 717.647058823529 total. Their separate target-range tables stop at level 18 and do not cap the passive. Rapid Fire retains its non-refreshing seven-second buff, mana cost and cooldown, and preserves a declared attack windup.");
    kit.assume("Rocket Jump uses the sourced 1100 speed and 0.25-second cast, with an explicit variable-distance one-axis endpoint up to 900. It crosses intervening terrain when the requested endpoint is clear; an endpoint inside terrain clips to its near boundary. The vertical arc, distance-dependent server speed and two-dimensional landings are absent. Q/E/R overlay the active jump; knockdown interrupts it and prevents its landing packet. Only counted champion kills and max-stack champion detonations reset W; ordinary summons are not treated as clones.");
    kit.assume("Explosive Charge travels at 2400 after its current rounded attack windup. Invalid targeting cancels the cast without mana or cooldown. Application is a separately shieldable zero physical packet; the four-second fuse starts at attachment. Connected ordinary attacks and damaging abilities add one stack, while blinded/dodged/blocked attacks and spell-shielded spells add none. Four stacks multiply base damage by two. The exact pinned game calculation additionally multiplies by 1 + 0.4 × critical chance × (critical damage − 1), giving 1.4 at current default full critical chance; it is not a normal critical strike.");
    kit.assume("Each charge follows its actual champion or summon via branch-copyable target IDs and a lightweight timer, surviving Tristana's death. Damage uses caster stats at detonation, since the pinned text does not specify an earlier snapshot. The primary detonation explicitly hits untargetable units but still respects stasis, invulnerability, parry and a fresh spell shield; collateral targets retain ordinary targetability and their own defenses. A killed or expired summon leaves its last observed bomb position until the fuse expires; target-death early detonation is not asserted by the pinned page. Ordinary attack kills trigger E's passive explosion; unrelated spell kills do not.");
    kit.assume("Buster Shot stores the caster's cast-completion origin, deals its magic packet only to its primary target and displaces nearby secondary targets without stacking their charge. Its knockback uses the sourced 1500 speed and stops at terrain; accepted airborne control is required before applying stun. Only airborne is removed when forced movement stops; the ranked stun and ordinary sight retain their separate duration. A fourth stack supplied by the primary R waits until that displacement ends or the original fuse expires, including early wall stops and dead-caster cases. Sight is recorded without claiming true sight over stealth.");
    kit.assume("The offensive policy places E before its attack sequence, activates Q while that charge is attached, and spends available basic attacks before another spell. The budget values Q's haste-adjusted seven-second uptime and a maximum-stack, critical-scaled charge per E cycle; it does not pre-award kill resets, passive collateral targets, or a guaranteed landing hit.");
    return {
      attack: { range, ranged: true, projectile: true, missileSpeed: basicSpeed, onHitToPets: true }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, qAS)) - d.attackSpeed) * Math.min(1, qSeconds / (abilities[0]!.cooldown / haste)); return { physical: attackDamage(self) * added + bombRaw(self, target, eMax) / (abilities[2]!.cooldown / haste + abilities[2]!.castTime) }; } },
      hooks: {
        onCast(ctx) { if (ctx.ability.key === "Q") ctx.memory["tristana:qEnd"] = ctx.tick + ticks(qSeconds); if (ctx.ability.key === "R") ctx.memory["tristana:rOrigin"] = ctx.self.x; },
        onDashEnd(ctx) { if (ctx.ability.key !== "W" || ctx.interrupted) return; if (ctx.enemy.alive && Math.abs(ctx.enemy.x - ctx.self.x) <= wRadius + ctx.enemy.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, abilities[1]!, abilities[1]!.onHit!); for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.self.x) <= wRadius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, abilities[1]!, abilities[1]!.onHit!, "area"); },
        onAttackHit: connectedAttack, onAttackPetHit: connectedAttack,
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") {
            const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.enemy.x, radius: eRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(eSeconds), ability: burst.key, onHit: rawEffects(bombRaw(ctx.self, ctx.enemy, 0)), connects: true, noPets: true, memory: { [BOMB]: true, stacks: 0, until: ctx.tick + ticks(eSeconds), ...(ctx.enemy.petId !== undefined ? { pet: ctx.enemy.petId } : {}) } };
            ctx.world.zones.push(zone, { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.enemy.x, radius: 0, startTick: ctx.tick, endTick: ctx.tick + 1, ability: clock.key, onHit: [], noPets: true, memory: { [TIMER]: true, bomb: zone.id } });
          } else if (ctx.ability.key === "R") {
            const x = ctx.enemy.x, origin = Number(ctx.memory["tristana:rOrigin"] ?? ctx.self.x);
            ctx.memory["tristana:rDirection"] = x === origin ? directionTo(ctx.self, ctx.enemy) : Math.sign(x - origin);
            control(ctx, ctx.enemy, true);
            const champion = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
            if (ctx.enemy.petId !== undefined && champion.alive && Math.abs(champion.x - x) <= rRadius + champion.spec.base.radius + EPSILON) abilityHit(ctx.world, ctx.self, champion, secondaryControl, secondaryControl.onHit!);
            for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && pet.id !== ctx.enemy.petId && Math.abs(pet.x - x) <= rRadius + pet.spec.radius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, secondaryControl, secondaryControl.onHit!, "area");
            addStack(ctx, true);
          } else if (ctx.ability.key === "Rsecondary") control(ctx, ctx.enemy, false);
          else if (ctx.ability.key === "W" || ctx.ability.key === "Epassive") addStack(ctx);
        },
        onKill(ctx) { if (!ctx.pet && !("owner" in ctx.victim)) ctx.self.cooldownReady.W = ctx.tick; },
        onZoneLand(ctx) {
          const zone = ctx.zone;
          if (zone.memory?.[BOMB]) { detonate(ctx, zone); return; }
          if (zone.memory?.[TIMER]) {
            const bomb = ctx.world.zones.find((candidate) => candidate.id === zone.memory!.bomb); if (!bomb) return;
            const target = targetOf(ctx, bomb); if (target) bomb.x = target.x;
            if (bomb.memory?.rWait && !target?.forced) { detonate(ctx, bomb); return; }
            bomb.onHit = rawEffects(bombRaw(ctx.self, target ?? ctx.enemy, Number(bomb.memory?.stacks ?? 0)));
            ctx.world.zones.push({ ...zone, id: ctx.world.nextId++, endTick: ctx.tick + 1, memory: { ...zone.memory } });
          } else if (zone.memory?.[R_TIMER]) {
            const pet = zone.memory.pet === undefined ? undefined : ctx.world.pets.find((pet) => pet.id === zone.memory!.pet);
            if (zone.memory.pet !== undefined && !pet) return;
            let moving = !!ctx.enemy.forced;
            if (pet) {
              moving = ctx.tick < Number(zone.memory.moveEnd) && Number(zone.memory.remaining) > 1e-6;
              if (moving) {
                const target = petFormulaTarget(pet, ctx.self, ctx.tick), requested = Math.sign(Number(zone.memory.perTick)) * Math.min(Math.abs(Number(zone.memory.perTick)), Number(zone.memory.remaining));
                const distance = terrainLimit(ctx.world, target, requested, false);
                pet.x += distance; zone.memory.remaining = Number(zone.memory.remaining) - Math.abs(distance);
                if (Math.abs(distance - requested) > 1e-6 || Number(zone.memory.remaining) <= 1e-6) moving = false;
              }
              if (!moving) pet.memory["tristana:forcedEnd"] = ctx.tick;
            }
            const statuses = pet ? pet.statuses ?? [] : ctx.enemy.statuses;
            if (!moving || ctx.tick >= Number(zone.memory.end)) {
              const remaining = statuses.filter((status) => !(status.source === ctx.self.side && status.ability === rControl.key && status.key === "airborne"));
              if (pet) pet.statuses = remaining; else ctx.enemy.statuses = remaining;
            } else ctx.world.zones.push({ ...zone, id: ctx.world.nextId++, endTick: ctx.tick + 1, memory: { ...zone.memory } });
          }
        },
      },
    };
  },
};
export default tristana;
