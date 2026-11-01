/** Sivir: independently defended boomerang passes and real Ricochet target identities. */
import type { KitModule } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { missileArrivalTicks, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, scaled, ticks } from "./util";

const FLEET = "sivir:fleet", WUNTIL = "sivir:ricochetUntil", RUNTIL = "sivir:huntUntil";
const identity = (unit: Unit) => unit.petId === undefined ? `champion:${unit.side}` : `pet:${unit.petId}`;
interface BounceChain { counts: Record<string, number>; left: number; crit: number }
const sivir: KitModule = {
  champion: "Sivir",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const fleetMS = p.levelValue("grant her 55"), fleetSeconds = p.quoted("decaying over 1.5 seconds");
    p.quote("will trigger even if the attack is dodged, blocked or misses due to blind"); p.quote("ability is negated by a spell shield");
    const basicSpeed = p.gameQuoted("mSpell.missileSpeed: 1750.0");
    const qDamage = q.formula("Physical Damage"), qRange = q.field("targetRange"), qOutWidth = q.field("width", "Outgoing"), qBackWidth = q.field("width", "Returning"), qOutSpeed = q.field("speed", "Outgoing"), qBackSpeed = q.field("speed", "Returning");
    q.formula("Minimum Damage"); const qTotal = q.formula("Total Maximum Champion Damage");
    q.fieldNumbers("castTime"); q.quote("Enemies can be hit only once per pass"); q.quote("returns to her, resetting the damage modifier"); q.quote("Spell shield only blocks one instance of damage"); q.quote("still return to Sivir even if she dies"); q.quote("at the end of the cast time");
    const game = q.record.gameSources!.find((source) => source.text.some((text) => text.startsWith("mSpell.DataValues:")))!;
    const dataText = game.text.find((text) => text.startsWith("mSpell.DataValues:"))!;
    const calculationText = game.text.find((text) => text.startsWith("mSpell.mSpellCalculations.TotalDamage:"))!;
    q.gameQuote(dataText, game.object); q.gameQuote(calculationText, game.object);
    const gameValues = JSON.parse(dataText.slice(dataText.indexOf(":") + 1)) as Array<{ name: string; values: number[] }>;
    const gameValue = (name: string) => { const found = gameValues.find((value) => value.name === name)?.values[0]; if (found === undefined) throw new Error(`Sivir Q: missing pinned ${name}`); return Math.round(found * 1e6) / 1e6; };
    const qBaseCast = gameValue("QBaseCastTime"), qCastReduction = gameValue("QAttackSpeedCastReductionPercent"), qMaximumReduction = gameValue("QAttackSpeedCastReductionMax"), qCriticalRatio = gameValue("CritRatio"), qFalloff = gameValue("FallOffRatio"), qFloor = gameValue("FallOffMinimum");
    const wSeconds = w.quoted("next 4 seconds"), wAS = w.fraction("Bonus Attack Speed"), wDamage = w.formula("Bounce Damage"), wRange = w.field("effectRadius"), wSpeed = w.field("speed", "Bounced"), wBounces = w.quoted("up to 8 times"), wMinionFactor = w.quoted("deals 65% damage against minions") / 100, wExecute = w.quoted("below 15 health"), wCritical = w.quoted("for 200% damage") / 100;
    w.quote("can target each enemy up to one additional time"); w.quote("prioritize the nearest new target"); w.quote("does not have to be visible"); w.quote("Refreshing the buff will not grant an attack reset");
    const shieldSeconds = e.quoted("spell shield for 1.5 seconds"), shieldDelay = e.quoted("after 0.25 seconds"), shieldHeal = e.formula("Heal");
    e.quote("Upon successfully blocking a hostile effect");
    const huntSeconds = r.number("Buff Duration"), huntMS = r.fraction("Bonus Movement Speed"), huntRefund = r.quoted("by 0.5 seconds each"), huntTakedown = r.quoted("within 3 seconds of damaging them");
    r.field("effectRadius"); r.quote("refresh the duration"); r.textField("cooldownStart");
    const fleet = (ctx: HookContext) => { ctx.memory[FLEET] = ctx.tick; ctx.buff(FLEET, "moveSpeedFlat", fleetMS, fleetSeconds); };
    const qPacket = (): Effect[] => [{ type: "damage", damageType: "physical", amount: qDamage }];
    const returning: AbilitySpec = { key: "Qreturn", name: `${q.name} (return)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, persistsAfterDeath: true, delivery: { kind: "line", range: qRange, width: qBackWidth, speed: qBackSpeed }, onHit: qPacket(), flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: [] };
    const bounce: AbilitySpec = { key: "Wbounce", name: `${w.name} (bounce)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: true, spellShield: false, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: wDamage }], roles: [] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: qBaseCast, castTimeFor: (self) => qBaseCast * (1 - Math.min(qMaximumReduction, qCastReduction * Math.max(0, derive(self).bonusAttackSpeed))), castDirection: "start", persistsAfterDeath: true, delivery: { kind: "line", range: qRange, width: qOutWidth, radius: qOutWidth / 2, speed: qOutSpeed, piercing: true, collisionPet: true }, onHit: qPacket(), flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: wAS }, duration: wSeconds }], roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), castTime: e.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: shieldSeconds, charges: 1 }], roles: ["defense"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: huntMS }, duration: huntSeconds }], roles: ["buff", "engage", "escape"] },
      returning, bounce,
    ];
    const launchBounce = (ctx: HookContext, fromX: number, previous: Unit, chain: BounceChain) => {
      if (chain.left <= 0) return;
      const candidates: Array<{ unit: Unit; pet?: Pet }> = [];
      const enemy = ctx.world.units[1 - ctx.self.side]!;
      if (enemy.alive && !isUntargetable(enemy, ctx.self)) candidates.push({ unit: enemy });
      for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints) {
        const target = petFormulaTarget(pet, ctx.self, ctx.tick); if (!isUntargetable(target, ctx.self)) candidates.push({ unit: target, pet });
      }
      const next = candidates.filter(({ unit }) => identity(unit) !== identity(previous) && (chain.counts[identity(unit)] ?? 0) < 2 && Math.abs(unit.x - fromX) <= wRange + 1e-6).sort((a, b) => Number((chain.counts[identity(a.unit)] ?? 0) > 0) - Number((chain.counts[identity(b.unit)] ?? 0) > 0) || Math.abs(a.unit.x - fromX) - Math.abs(b.unit.x - fromX) || (a.pet?.id ?? -1) - (b.pet?.id ?? -1))[0];
      if (!next) return;
      const id = ctx.world.nextId++, key = `sivir:bounce:${id}`;
      chain.left--; chain.counts[identity(next.unit)] = (chain.counts[identity(next.unit)] ?? 0) + 1;
      ctx.memory[key] = JSON.stringify(chain);
      const critical = 1 + chain.crit * (wCritical - 1), factor = next.pet ? wMinionFactor : 1;
      const onHit: Effect[] = [{ type: "damage", damageType: "physical", amount: scaled(wDamage, critical * factor), petDamageCategory: "proc" }];
      if (next.pet && !next.pet.spec.fixedDamage) onHit.push({ type: "execute", threshold: { base: wExecute } });
      ctx.world.missiles.push({ id, owner: ctx.self.side, source: "Wbounce", seenTick: ctx.tick, x: fromX, perTick: wSpeed / 30, homing: true, direction: next.unit.x >= fromX ? 1 : -1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit, ...(next.pet ? { pet: next.pet.id } : {}) });
    };
    const behavior: Behavior = (view) => defaultBehavior(view);
    kit.assume("Fleet of Foot starts on a basic attack declaration against an actual champion, including attacks later blinded, dodged or blocked, and on a champion ability contact even through a spell shield. It grants 75 flat movement speed at level 20 and decays linearly for 1.5 seconds. Pets do not grant the passive. Successful own E consumption schedules its heal and passive together 0.25 seconds later; ordinary expiry grants neither.");
    kit.assume("Boomerang Blade has two separate once-per-target traveling passes. Outbound 1450-speed/180-width and returning 1200-speed/200-width projectiles have independently checked spell shields and can be destroyed by projectile walls. The return follows Sivir's actual position, including after her death. Each actual non-champion contact reduces later damage on that pass by 15 percentage points down to 40%; a new return starts at full damage. Champion contacts do not reduce it. Its version-pinned game calculation multiplies each impact by 1 + 0.4 × critChance × (critDamage − 1). Cast time uses the wiki table's formula 0.25 × (1 − min(0.6, 0.5 × bonus AS)) with matching pinned game parameters, rather than the rendered wiki note's conflicting 0.198-second minimum at 99.8% bonus AS. Return sidestep probability is independently estimated at turnaround using current geometry; it creates no extra branch.");
    kit.assume("Ricochet grants 40% bonus attack speed for 4 seconds, resetting the attack timer only on inactive-to-active casts. Each empowered missile contact searches actual hostile targets within 500 center units, including unseen targets, preferring nearest never-hit targets before repeats. Each target receives at most two contacts from a chain (the primary basic counts as one), and at most 8 bounces launch; a lone champion receives no invented second hit. Bounces use 50% AD, retain the triggering attack's expected crit outcome, apply no basic on-hits or life steal, ignore spell shields, and use the sourced 65% minion factor for modeled ordinary summons. The pinned wiki explicitly leaves dodge/block/blind interactions pending for testing; this model allows the bounce search after any actual primary missile contact, including a denied primary, and treats bounce damage as a proc rather than a second basic attack. That unresolved interaction remains a documented limitation.");
    kit.assume("On the Hunt gives Sivir 30% movement speed for 12 seconds and each declared basic attack refunds 0.5 actual seconds from Q/W/E current cooldowns. Champion takedowns within 3 seconds of her damage refresh only an already-active own buff. The duel contains no additional allied champions. The budget prices both Q passes with its critical multiplier and W's capped four-second attack-speed uptime; it assumes one eligible E shield heal per cooldown and no free Ricochet target lane or takedown reset.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: basicSpeed, onHitToPets: true }, abilities, behavior,
      budget: {
        damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, qCycle = abilities[0]!.cooldown / haste + qBaseCast * (1 - Math.min(qMaximumReduction, qCastReduction * Math.max(0, d.bonusAttackSpeed))), critical = 1 + qCriticalRatio * d.critChance * (d.critDamage - 1), added = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, wAS)) - d.attackSpeed); return { physical: evaluate(qTotal, self, target) * critical / qCycle - evaluate(qDamage, self, target) / (abilities[0]!.cooldown / haste + qBaseCast) + attackDamage(self) * added * Math.min(1, wSeconds / (abilities[1]!.cooldown / haste)) }; },
        healing(self, target) { return evaluate(shieldHeal, self, target) / (abilities[2]!.cooldown / (1 + derive(self).abilityHaste / 100)); },
      },
      hooks: {
        onTick(ctx) {
          if (ctx.memory[FLEET] !== undefined) ctx.buff(FLEET, "moveSpeedFlat", fleetMS * Math.max(0, 1 - (ctx.tick - Number(ctx.memory[FLEET])) / ticks(fleetSeconds)), 2 / 30);
          if (ctx.memory["sivir:shieldHealAt"] !== undefined && ctx.tick >= Number(ctx.memory["sivir:shieldHealAt"])) { delete ctx.memory["sivir:shieldHealAt"]; ctx.apply({ type: "heal", amount: shieldHeal }, true); fleet(ctx); }
        },
        onAttack(ctx) {
          if (ctx.enemy.petId === undefined) fleet(ctx);
          if (ctx.tick < Number(ctx.memory[WUNTIL] ?? -1)) ctx.action.attackTag = "sivir:ricochet";
          if (ctx.tick < Number(ctx.memory[RUNTIL] ?? -1)) for (const key of ["Q", "W", "E"]) ctx.apply({ type: "refund", ability: key, seconds: huntRefund }, true);
        },
        onCastStart(ctx) { if (ctx.ability.key === "W") ctx.memory["sivir:wWasActive"] = ctx.tick < Number(ctx.memory[WUNTIL] ?? -1); },
        onCast(ctx) {
          if (ctx.ability.key === "W") { if (!ctx.memory["sivir:wWasActive"]) ctx.apply({ type: "resetAttack" }, true); ctx.memory[WUNTIL] = ctx.tick + ticks(wSeconds); }
          if (ctx.ability.key === "R") ctx.memory[RUNTIL] = ctx.tick + ticks(huntSeconds);
        },
        onAbilityContact(ctx) {
          if (ctx.enemy.petId === undefined && ["Q", "Qreturn", "Wbounce"].includes(ctx.ability.key)) fleet(ctx);
          if (!["Q", "Qreturn"].includes(ctx.ability.key)) return;
          const d = derive(ctx.self), factor = 1 + qCriticalRatio * d.critChance * (d.critDamage - 1);
          return ctx.effects.map((effect) => effect.type === "damage" ? { ...effect, amount: scaled(effect.amount, factor) } : effect);
        },
        onSpellShieldBlock(ctx) { if (ctx.shield.ability === "E") ctx.memory["sivir:shieldHealAt"] = ctx.tick + ticks(shieldDelay); },
        onDamageDealt(ctx) { if (ctx.enemy.petId === undefined && ctx.amount + ctx.absorbed > 0) ctx.memory["sivir:lastChampionDamage"] = ctx.tick; },
        onKill(ctx) {
          if (ctx.pet || ctx.tick >= Number(ctx.memory[RUNTIL] ?? -1)) return;
          // A counted own champion kill is itself qualifying damage at this tick.
          ctx.memory["sivir:lastChampionDamage"] = ctx.tick;
          ctx.memory[RUNTIL] = ctx.tick + ticks(huntSeconds); ctx.buff("sivir:huntRefresh", "moveSpeedPercent", huntMS, huntSeconds);
          ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "stat" && status.memoKey === "R:moveSpeedPercent"));
        },
        onMissileContact(ctx) {
          if (["Q", "Qreturn"].includes(ctx.missile.source) && ctx.targetPet) ctx.missile.onHit = [{ type: "damage", damageType: "physical", amount: scaled(qDamage, Math.max(qFloor, 1 - qFalloff * (ctx.missile.hitPets?.length ?? 0))) }];
          if (ctx.missile.source === "attack" && ctx.missile.attack?.attackTag === "sivir:ricochet") launchBounce(ctx, ctx.enemy.x, ctx.enemy, { counts: { [identity(ctx.enemy)]: 1 }, left: wBounces, crit: ctx.missile.attack.critChance ?? derive(ctx.self).critChance });
          if (ctx.missile.source === "Wbounce") { const key = `sivir:bounce:${ctx.missile.id}`, stored = ctx.memory[key]; delete ctx.memory[key]; if (typeof stored === "string") launchBounce(ctx, ctx.enemy.x, ctx.enemy, JSON.parse(stored) as BounceChain); }
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source === "Wbounce") delete ctx.memory[`sivir:bounce:${ctx.missile.id}`];
          if (ctx.missile.source !== "Q" || ctx.reason !== "range" || ctx.missile.intercepted) return;
          const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Qreturn", seenTick: ctx.missile.seenTick, x: ctx.missile.x, perTick: qBackSpeed / 30, homing: false, followOwner: true, direction: ctx.self.x >= ctx.missile.x ? 1 : -1, travelLeft: Infinity, expiresTick: ticks(ctx.world.settings.maxSeconds), projectile: true, connects: true, scale: 1, piercing: true, collisionPet: true, radius: qBackWidth / 2, hitTargets: [], hitPets: [], onHit: qPacket() };
          const eta = missileArrivalTicks(missile, Math.max(0, Math.abs(ctx.enemy.x - missile.x) - ctx.enemy.spec.base.radius)); missile.scale = skillshotChance(ctx.world, ctx.enemy, missile.seenTick, eta / 30, qBackWidth / 2); ctx.world.missiles.push(missile);
        },
      },
    };
  },
};
export default sivir;
