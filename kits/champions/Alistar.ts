/** Alistar: pinned wiki rules and exact game objects, with actual timed contacts. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, startCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, heal, inStasis } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const alistar: KitModule = {
  champion: "Alistar",
  build(kit) {
    const p = kit.ability("Triumphant Roar"), q = kit.ability("Pulverize"), w = kit.ability("Headbutt"), e = kit.ability("Trample"), r = kit.ability("Unbreakable Will");
    // Each object and all its arrays remain independently attributed in the committed record.
    p.gameQuote('"name":"PassiveMaxStacks","values":[7.0,7.0,7.0,7.0,7.0,7.0,7.0]');
    p.gameQuote('"name":"PassiveCooldown","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]');
    q.gameQuote('"mAffectsTypeFlags":14346');
    q.gameQuote('"name":"KnockupDuration","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]');
    w.gameQuote('"cantCastWhileRooted":true');
    w.gameQuote('"name":"KnockUpDuration","values":[0.75,0.75,0.75,0.75,0.75,0.75,0.75]');
    e.gameQuote('"mAffectsTypeFlags":9221');
    const bonusRange = e.gameQuoted('"name":"BonusAARange","values":[50.0,50.0,50.0,50.0,50.0,50.0,50.0]');
    e.gameQuote('"name":"FullChargeDuration","values":[5.0,5.0,5.0,5.0,5.0,5.0,5.0]');
    r.gameQuote('"canCastWhileDisabled":true');
    r.gameQuote('"cannotBeSuppressed":true');
    r.gameQuote('"SpecialCase_StasisLocked"');
    const roarCap = p.quoted("At 7 stacks, Alistar consumes them all"), roarCooldown = p.field("staticCooldown");
    const deathRadius = p.field("effectRadius", "generating stacks"), healRadius = p.field("effectRadius", "Heal radius");
    const selfHeal = p.quoted("heal himself for 5% of his maximum health") / 100;
    const allyHeal = p.quoted("nearby allied champions for 7% of his maximum health") / 100;
    p.quote("each time a nearby enemy minion or non-epic monster dies");
    p.quote("He generates 7 stacks if a nearby enemy champion or epic monster dies");
    p.quote("Alistar does not gain stacks for unsuccessfully trying to apply crowd control");
    p.quote("Alistar loses all Triumph stacks upon dying");
    p.quote("Healing occurs simultaneously for Alistar and his allies");
    const qRadius = q.field("effectRadius"), qTime = q.field("castTime", "Standard"), bufferedTime = q.field("castTime", "Reduced");
    const qCC = q.quoted("simultaneously for 1 second");
    q.quote("Displacement immunity will also resist the application of the stun");
    q.quote("Pulverize can be buffered during Headbutt to cast with reduced cast time when the dash ends");
    const wRange = w.field("targetRange"), wSpeed = w.field("speed"), arrivalRadius = w.quoted("within 400 units upon arrival");
    const knockback = w.quoted("knocks them back 700 units over 0.5 seconds", 0), knockbackTime = w.quoted("knocks them back 700 units over 0.5 seconds", 1);
    const wStun = w.quoted("stunning them for 0.75 seconds"), bufferedKnockback = w.tipped("700 units");
    w.quote("(1200 × dash distance) / (dash distance - sum of radiuses)");
    w.quote("If Alistar's radius overlaps with his target's, he will dash with 1200 speed");
    w.quote("from Alistar's original location at start of cast and the enemy when Alistar's dash ends");
    w.quote("Displacement immunity will not resist the application of the stun");
    w.quote("Headbutt can knock enemies through terrain");
    const eInterval = e.quoted("every 0.5 seconds over 5 seconds", 0), eDuration = e.quoted("every 0.5 seconds over 5 seconds", 1);
    const eCap = e.quoted("stacking up to 5 times"), eWindow = e.quoted("against a champion within 6 seconds");
    const eStun = e.quoted("stun the target for 1 second"), eProc = e.levelValue("bonus magic damage and stun the target"), eRadius = e.field("effectRadius");
    e.quote("Each time this damages at least one enemy champion");
    e.quote("The on-hit effect is consumed if the attack is blocked, but not if it is dodged or missed while Alistar is blinded");
    e.quote("The on-hit effect can be blocked by spell shield, but the attack cannot");
    const rDuration = r.quoted("For the next 7 seconds"), reduction = r.fraction("Damage Reduction");
    r.quote("cleanses himself of all crowd control");
    r.quote("True damage cannot be reduced by any means");
    r.quote("stacks additively with Hemoplague");
    const eCooldown = e.cooldown();
    const qDamage: Effect = { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") };
    const wDamage: Effect = { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") };
    const tickDamage: Effect = { type: "damage", damageType: "magic", amount: e.formula("Magic Damage Per Tick"), persistent: true };
    const champion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion";
    const charged = (self: Unit, tick: number) => Number(self.memory["alistar:chargeUntil"] ?? -1) > tick;
    const clearTrample = (ctx: HookContext) => {
      for (const key of ["alistar:eNext", "alistar:eEnd", "alistar:eStacks", "alistar:chargeUntil"]) delete ctx.memory[key];
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.source === ctx.self.side && s.key === "ghosted" && s.ability === "E"));
    };
    const roar = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection || Number(ctx.memory["alistar:roarStacks"] ?? 0) < roarCap || ctx.tick < Number(ctx.memory["alistar:roarReady"] ?? 0)) return;
      ctx.memory["alistar:roarStacks"] = 0;
      ctx.memory["alistar:roarReady"] = ctx.tick + ticks(roarCooldown);
      const maximum = derive(ctx.self).maxHp;
      heal(ctx.world, ctx.self, maximum * selfHeal);
      // Only actual allied champions are healed; the normal arena has none besides Alistar.
      for (const ally of ctx.world.units) if (ally !== ctx.self && ally.side === ctx.self.side && ally.alive && Math.abs(ally.x - ctx.self.x) <= healRadius) heal(ctx.world, ally, maximum * allyHeal);
      for (const pet of ctx.world.pets) if (pet.owner === ctx.self.side && pet.spec.targetClass === "champion" && Math.abs(pet.x - ctx.self.x) <= healRadius) { const ally = petFormulaTarget(pet, ctx.self, ctx.tick); heal(ctx.world, ally, maximum * allyHeal); pet.hp = ally.hp; }
      ctx.log("Triumphant Roar heals nearby champions");
    };
    const addRoar = (ctx: HookContext, count: number) => { ctx.memory["alistar:roarStacks"] = Math.min(roarCap, Number(ctx.memory["alistar:roarStacks"] ?? 0) + count); roar(ctx); };
    const creditCC = (ctx: HookContext, key: string, target: Unit) => {
      if (!champion(target)) return;
      const stamp = Number(ctx.memory[`alistar:cast:${key}`] ?? -1);
      if (stamp < 0) return;
      const targetKey = target.petId === undefined ? `champion:${target.side}` : `pet:${target.petId}`;
      const memo = `alistar:credit:${key}:${targetKey}`;
      if (ctx.memory[memo] === stamp) return;
      ctx.memory[memo] = stamp;
      addRoar(ctx, 1);
    };
    const castStamp = (ctx: HookContext, key: string) => {
      ctx.memory["alistar:serial"] = Number(ctx.memory["alistar:serial"] ?? 0) + 1;
      ctx.memory[`alistar:cast:${key}`] = ctx.memory["alistar:serial"]!;
    };
    const pulse = (ctx: HookContext, ability: AbilitySpec, radius: number) => {
      if (Math.abs(ctx.enemy.x - ctx.self.x) <= radius) abilityHit(ctx.world, ctx.self, ctx.enemy, ability, ability.onHit ?? []);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.self.x) <= radius + pet.spec.radius) abilityHitPet(ctx.world, ctx.self, pet, ability, ability.onHit ?? [], "persistent");
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: qTime, delivery: { kind: "aura", radius: qRadius }, usable: self => self.action?.kind !== "dash", onHit: [qDamage, { type: "cc", cc: "stun", duration: qCC }, { type: "cc", cc: "airborne", duration: qCC }], flags: { spellShield: q.flag("spellShield"), petContactHooks: true } },
      { key: "Qbuffer", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownKey: "Q", budgetExcluded: true, cost: q.cost(), castTime: 0, delivery: { kind: "self" }, overlay: true, usable: self => self.action?.kind === "dash" && self.action.ability === "W" && !self.memory["alistar:qBuffered"], roles: ["cc"] },
      { key: "Qimpact", name: q.name, countsAsCast: false, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, cost: 0, castTime: bufferedTime, delivery: { kind: "aura", radius: qRadius }, usable: () => false, onHit: [qDamage, { type: "cc", cc: "stun", duration: qCC }, { type: "cc", cc: "airborne", duration: qCC }], flags: { spellShield: true, petContactHooks: true } },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, usable: (self, world) => { const enemy = world.units[self.side === 0 ? 1 : 0]; return (canTarget(enemy, self) && Math.abs(enemy.x - self.x) <= wRange) || world.pets.some(pet => pet.owner !== self.side && canTargetPet(pet, self, world.tick) && Math.abs(pet.x - self.x) <= wRange); }, roles: ["damage", "cc", "engage"], onHit: [wDamage, { type: "displace", direction: "away", distance: knockback, duration: knockbackTime, stopAtWall: true, ignoreUnitCollision: true }, { type: "cc", cc: "stun", duration: wStun }], flags: { grounded: w.flag("grounded"), knockdown: w.flag("knockdown"), spellShield: w.flag("spellShield"), petContactHooks: true } },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, overlay: true, preserveAttackWindup: true, onSelf: [{ type: "state", state: "ghosted", duration: eDuration }], onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Total Magic Damage"), persistent: true }], roles: ["damage", "buff"] },
      { key: "Etick", name: `${e.name} (pulse)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, onHit: [tickDamage], flags: { spellShield: false, petContactHooks: true } },
      { key: "Eattack", name: `${e.name} (empowered attack)`, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false, onHit: [{ type: "damage", damageType: "magic", amount: { base: eProc }, noLifeSteal: true }, { type: "cc", cc: "stun", duration: eStun }], flags: { spellShield: true, petContactHooks: true } },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "self" }, flags: { usableWhileDisabled: true }, usable: self => !inStasis(self), onSelf: [{ type: "cleanse" }, { type: "state", state: "damageReduction", value: reduction, duration: rDuration }], roles: ["defense"] },
    ];
    const spell = (key: string) => abilities.find(a => a.key === key)!;
    const policy: Behavior = view => {
      // Let the common trade state advance before choosing a combo overlay.
      const command = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return command;
      const buffered = spell("Qbuffer");
      if (view.mode !== "flee" && view.mode !== "hold" && canCast(view.world, view.self, buffered)) return { kind: "cast", ability: buffered.key };
      if (command?.kind === "cast" && command.ability === "R") return command;
      if (view.mode === "fight" && !view.self.action && canCast(view.world, view.self, spell("R")) && view.self.hp < derive(view.self).maxHp * .65) return { kind: "cast", ability: "R" };
      if ((view.mode === "fight" || view.mode === "trade") && !view.self.action && canCast(view.world, view.self, spell("W")) && Math.abs(view.enemy.x - view.self.x) > qRadius && canCast(view.world, view.self, spell("Q"))) return { kind: "cast", ability: "W" };
      return command;
    };
    kit.assume("Triumphant Roar starts with zero stacks; only accepted Alistar ability stuns/displacements and real qualifying enemy deaths count. Simultaneous stun and airborne on one cast/target count once. No ambient minions, monsters or allied champions are invented.");
    kit.assume("Headbutt travels to the target's cast-time position using its documented inverse-radius speed and checks the target within 400 center units on arrival. Knockback uses the fixed cast origin and arrival target position; co-location uses directionTo's stable facing. Its 0.5-second displacement and independent 0.75-second stun follow the wiki; the binary labels KnockUpDuration as 0.75. Terrain stops forced movement at an impassable wall without shortening control.");
    kit.assume("Pulverize is explicitly buffered during Headbutt: Q's cost/cooldown are paid on buffer and a reduced 0.15-second cast begins at successful dash completion. An interrupted dash cancels the buffered follow-up. Buffered Headbutt knockback is 200 units before Pulverize can stop it.");
    kit.assume("Trample pulses after each 0.5-second interval, ten times over five seconds, and grants at most one stack per pulse with actual champion HP or shield damage. Its empowered basic is single-use, retains ordinary attack damage, and never procs on unclassified or minion/monster pets. The wiki's six-second empowered window is used over the binary FullChargeDuration array of five seconds; its sourced 50 bonus attack range is retained.");
    kit.assume("The default fight policy buffers W-Q when engaging outside Q radius, then uses E and ordinary attacks. Hold and trade reserve a ready R for the ordinary reactive cleanse policy; completed trades retreat before any new combo. Unbreakable Will cleanses at cast completion and reduces non-true damage for seven seconds; The specifically named Hemoplague exception adds its accepted amplification to the remaining R damage fraction, while other received-damage modifiers retain ordinary multiplication. Stasis locks R despite its disabled-cast permission.");
    return { abilities, behavior: policy, attack: { onHitToPets: true, blockStopsOnHit: true, bonusRangeFor: (self, target) => champion(target) && charged(self, Number(self.memory["alistar:now"] ?? 0)) ? bonusRange : 0 },
      budget: { damage: () => ({ magic: eProc / eCooldown }) },
      hooks: {
        modifyDamageTakenRaw(ctx) {
          if (ctx.damageType === "true") return ctx.raw;
          const guard = ctx.self.statuses.find(s => s.kind === "state" && s.key === "damageReduction" && s.ability === "R" && s.source === ctx.self.side && s.endTick > ctx.tick);
          const infection = ctx.self.statuses.find(s => s.kind === "state" && s.memoKey === (ctx.damageType === "physical" ? "vladimir:infectionPhysical" : "vladimir:infectionMagic") && s.endTick > ctx.tick);
          if (!guard || !infection) return ctx.raw;
          const amplified = Math.max(0, -infection.value), remaining = 1 - guard.value;
          return ctx.raw * (remaining + amplified) / (remaining * (1 + amplified));
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qimpact") castStamp(ctx, ctx.ability.key);
          if (ctx.ability.key === "Qbuffer") ctx.memory["alistar:qBuffered"] = true;
          if (ctx.ability.key === "W") {
            castStamp(ctx, "W");
            const eligible = ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && canTargetPet(pet, ctx.self, ctx.tick) && Math.abs(pet.x - ctx.self.x) <= wRange);
            const aimX = ctx.aim?.distance === undefined ? undefined : ctx.self.x + directionTo(ctx.self, ctx.enemy) * ctx.aim.direction * ctx.aim.distance;
            const pet = aimX === undefined ? (!canTarget(ctx.enemy, ctx.self) || Math.abs(ctx.enemy.x - ctx.self.x) > wRange ? eligible.sort((a,b) => Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x) || a.id-b.id)[0] : undefined) : eligible.sort((a,b) => Math.abs(a.x-aimX)-Math.abs(b.x-aimX) || a.id-b.id)[0];
            const target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.enemy;
            if (pet) ctx.memory["alistar:wPet"] = pet.id; else delete ctx.memory["alistar:wPet"];
            const delta = target.x - ctx.self.x, distance = Math.abs(delta), radii = ctx.self.spec.base.radius + target.spec.base.radius;
            const speed = distance <= radii ? wSpeed : wSpeed * distance / (distance - radii);
            const duration = Math.max(1, ticks(distance / speed));
            ctx.memory["alistar:wOrigin"] = ctx.self.x; ctx.memory["alistar:wDestination"] = target.x; ctx.memory["alistar:wSpeed"] = speed;
            ctx.memory["alistar:wDirection"] = directionTo(ctx.self, target);
            delete ctx.memory["alistar:qBuffered"];
            ctx.self.action = { kind: "dash", ability: "W", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: delta / duration, stopAtContact: false, unstoppable: false, through: true, crossTerrain: true };
          }
          if (ctx.ability.key === "E") { clearTrample(ctx); applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "ghosted", duration: eDuration }, { ability: ctx.ability, scale: 1 }); ctx.memory["alistar:eEnd"] = ctx.tick + ticks(eDuration); ctx.memory["alistar:eNext"] = ctx.tick + ticks(eInterval); ctx.memory["alistar:eStacks"] = 0; }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "W") return;
          if (!ctx.interrupted && ctx.self.alive && !ctx.self.resurrection) {
            const petId = ctx.memory["alistar:wPet"], pet = petId === undefined ? undefined : ctx.world.pets.find(pet => pet.id === petId);
            const target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.enemy;
            if ((petId === undefined || pet) && Math.abs(target.x - ctx.self.x) <= arrivalRadius) {
              const original = Number(ctx.memory["alistar:wOrigin"] ?? ctx.self.x);
              const origin = original === target.x ? original - Number(ctx.memory["alistar:wDirection"] ?? directionTo(ctx.self, target)) * 1e-9 : original;
              const effects = (spell("W").onHit ?? []).map(effect => effect.type === "displace" ? { ...effect, originX: origin, distance: ctx.memory["alistar:qBuffered"] ? bufferedKnockback : knockback } : effect);
              if (pet) abilityHitPet(ctx.world, ctx.self, pet, spell("W"), effects); else abilityHit(ctx.world, ctx.self, target, spell("W"), effects);
            }
            if (ctx.memory["alistar:qBuffered"]) startCast(ctx.world, ctx.self, spell("Qimpact"));
          }
          delete ctx.memory["alistar:qBuffered"];
        },
        onAbilityContact(ctx) {
          if ((ctx.ability.key === "Q" || ctx.ability.key === "Qimpact") && hasState(ctx.enemy, "displacementImmune")) return ctx.effects.filter(effect => effect.type !== "cc" && effect.type !== "displace");
        },
        onEnemyCCApplied(ctx) {
          if (ctx.source !== ctx.self || (ctx.cc !== "stun" && ctx.cc !== "airborne") || !ctx.ability || !["Q", "Qimpact", "W", "Eattack"].includes(ctx.ability)) return;
          creditCC(ctx, ctx.ability, ctx.target);
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined && ctx.enemy.statuses.some(s => s.kind === "cc" && s.source === ctx.self.side && s.ability === ctx.ability.key && s.startTick === ctx.tick && (s.key === "stun" || s.key === "airborne"))) creditCC(ctx, ctx.ability.key, ctx.enemy);
        },
        onDamageObserved(ctx) {
          if (ctx.source !== ctx.self || (ctx.ability !== spell("Etick").name && ctx.ability !== "Etick") || !champion(ctx.target) || ctx.amount + ctx.absorbed <= 0 || ctx.tick === Number(ctx.memory["alistar:eCreditTick"] ?? -1)) return;
          ctx.memory["alistar:eCreditTick"] = ctx.tick;
          const stacks = Math.min(eCap, Number(ctx.memory["alistar:eStacks"] ?? 0) + 1); ctx.memory["alistar:eStacks"] = stacks;
          if (stacks === eCap && !charged(ctx.self, ctx.tick)) { ctx.memory["alistar:chargeUntil"] = ctx.tick + ticks(eWindow); ctx.log("Trample fully charged"); }
        },
        onAttackHit(ctx) {
          if (!champion(ctx.enemy) || !charged(ctx.self, ctx.tick)) return;
          clearTrample(ctx); if (ctx.blocked) return;
          castStamp(ctx, "Eattack"); abilityHit(ctx.world, ctx.self, ctx.enemy, spell("Eattack"), spell("Eattack").onHit ?? [], ctx.scale);
        },
        onAttackResolved(ctx) { if (ctx.blocked && !ctx.missed && charged(ctx.self, ctx.tick)) clearTrample(ctx); },
        onAttackPetResolved(ctx) { if (ctx.pet.spec.targetClass === "champion" && ctx.blocked && !ctx.missed && charged(ctx.self, ctx.tick)) clearTrample(ctx); },
        onAttackPetHit(ctx) {
          if (ctx.pet.spec.targetClass !== "champion" || !charged(ctx.self, ctx.tick)) return;
          clearTrample(ctx); if (ctx.blocked) return;
          castStamp(ctx, "Eattack"); abilityHitPet(ctx.world, ctx.self, ctx.pet, spell("Eattack"), spell("Eattack").onHit ?? [], "proc", ctx.scale);
        },
        onDeathObserved(ctx) {
          const target = ctx.victim;
          if (("side" in target ? target.side : target.owner) === ctx.self.side) return;
          if (Math.abs(target.x - ctx.self.x) > deathRadius) return;
          if ("side" in target) addRoar(ctx, roarCap);
          else if (target.spec.targetClass === "champion" || target.spec.epicMonster) addRoar(ctx, roarCap);
          else if (target.spec.targetClass === "minion" || target.spec.targetClass === "monster") addRoar(ctx, 1);
        },
        onLethal(ctx) { clearTrample(ctx); ctx.memory["alistar:roarStacks"] = 0; delete ctx.memory["alistar:qAt"]; delete ctx.memory["alistar:qBuffered"]; return false; },
        onTick(ctx) {
          ctx.memory["alistar:now"] = ctx.tick;
          if (ctx.self.resurrection) { clearTrample(ctx); ctx.memory["alistar:roarStacks"] = 0; delete ctx.memory["alistar:qAt"]; delete ctx.memory["alistar:qBuffered"]; return; }
          const next = Number(ctx.memory["alistar:eNext"] ?? Infinity), end = Number(ctx.memory["alistar:eEnd"] ?? -1);
          if (ctx.tick >= next && next <= end) { ctx.memory["alistar:eNext"] = next + ticks(eInterval); pulse(ctx, spell("Etick"), eRadius); }
          if (ctx.tick > end && end >= 0) { delete ctx.memory["alistar:eEnd"]; delete ctx.memory["alistar:eNext"]; if (!charged(ctx.self, ctx.tick)) delete ctx.memory["alistar:eStacks"]; }
          if (Number(ctx.memory["alistar:chargeUntil"] ?? Infinity) <= ctx.tick) clearTrample(ctx);
          roar(ctx);
        },
      },
    };
  },
};
export default alistar;
