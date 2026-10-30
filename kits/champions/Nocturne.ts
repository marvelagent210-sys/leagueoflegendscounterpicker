/** Pinned Nocturne: actual cleaves, persistent trail geometry, tether and tracking flight. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, canTarget, consumeSpellShield, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { AttackHitOptions, Pet, Unit } from "../../engine/sim/state";
import { attackDamage, FOREVER, innateStat, ticks } from "./util";

const UMBRA = "nocturne:umbra", TAG = "nocturne:dusk", TETHER = "nocturne:tether", FLIGHT = "nocturne:flight";
type Contact = { target: Unit; pet?: Pet };
const nocturne: KitModule = {
  champion: "Nocturne",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pTime = p.field("staticCooldown"), pRadius = p.field("effectRadius"), pRatio = p.quoted("dealing 120% AD") / 100;
    const pCrit = p.quoted("{{as|110% AD}}") / 100, pHeal = { base: p.levelValue("healing himself"), ratios: { AP: p.quoted("(+ 30% AP)") / 100 } };
    const pMinion = p.quoted("reduced by 50%") / 100, pRefund = p.quoted("cooldown by 1 second"), pBigRefund = p.quoted("increased to 3 against");
    p.quote("Parry effects will only block the damage dealt to the primary target"); p.quote("will not trigger against {{tip|structures}} nor {{tip|wards}}");
    p.gameQuote("mSpell.DataValues.TotalDamageNoCritADRatio.values: [1.2000000476837158,1.2000000476837158,1.2000000476837158,1.2000000476837158,1.2000000476837158,1.2000000476837158,1.2000000476837158]");
    p.gameQuote("mSpell.DataValues.TotalDamageCritADRatio.values: [1.100000023841858,1.100000023841858,1.100000023841858,1.100000023841858,1.100000023841858,1.100000023841858,1.100000023841858]");
    p.gameQuote("mSpell.DataValues.HealLevel18Value.values: [32.0,32.0,32.0,32.0,32.0,32.0,32.0]");
    const qDamage = q.formula("Physical damage"), qAD = q.number("Bonus Attack Damage"), qMS = q.fraction("Bonus Movement Speed"), qTime = q.quoted("Trails last 5 seconds"), qRadius = q.field("effectRadius"), qRange = q.field("range"), qExtra = q.quoted("hits targets 25 units outside"), qCD = q.cooldown();
    q.quote("damage is not increased by"); q.quote("does not disappear if"); q.quote("{{tip|stacks multiplicatively}}"); q.quote("including those shrouded by {{tip|stealth}}"); q.quote("{{Effect at cast time start}}");
    q.gameQuote("mSpell.DataValues.TrailDuration.values: [5.0,5.0,5.0,5.0,5.0,5.0,5.0]");
    const wAS = w.fraction("Bonus Attack Speed"), wExtraAS = w.fraction("Enhanced Bonus Attack Speed") - wAS, wTime = w.quoted("spell shield for 1.5 seconds"), wProcTime = w.quoted("doubled for 5 seconds"), wRefresh = w.quoted("{{fd|0.25 seconds}}");
    w.quote("If ''Shroud of Darkness'' is active when");
    w.gameQuote("mSpell.DataValues.ShieldDuration.values: [1.5,1.5,1.5,1.5,1.5,1.5,1.5]");
    const eDamage = e.formula("Magic Damage per Tick"), eTotal = e.formula("Total Magic Damage"), eTime = e.quoted("target for 2 seconds"), eInterval = e.quoted("every 0.5 seconds"), eFear = e.number("Disable Duration"), eSlow = e.quoted("slowed by 90%") / 100, eMS = e.quoted("90% bonus movement speed") / 100, eRadius = e.field("effectRadius"), eRange = e.field("targetRange"), eBreak = e.field("tetherRadius");
    e.quote("180° total angle"); e.quote("not the damage and aftereffects of one already applied"); e.gameQuote("mSpell.DataValues.LeashBreakRange.values: [465.0,465.0,465.0,465.0,465.0,465.0,465.0]"); e.gameQuote("mSpell.spellCastTime:0.25");
    const rDamage = r.formula("Physical Damage"), rTime = r.quoted("nearsighting them for 6 seconds"), rDelay = r.quoted("after 0.25 seconds"), rSight = r.tipped("300 units"), rRange = r.field("targetRange"), rSpeed = r.field("speed");
    r.quote("|effect radius= Global");
    r.quote("no maximum tracking distance"); r.quote("will persist through {{tip|death}}"); r.quote("does not apply to {{tip|clone|clones}}"); r.quote("cannot be recast while"); r.quote("cast any of his abilities"); r.textField("cooldownStart"); r.gameQuote("mSpell.DataValues.DashSpeed.values: [1800.0,1800.0,1800.0,1800.0,1800.0,1800.0,1800.0]"); r.gameQuote("mSpell.DataValues.TrackDistance.values: [3500.0,3500.0,4250.0,5000.0,5750.0,6500.0,7250.0]"); r.gameQuote("mSpell.spellCastTime:0.25");
    const contacts = (ctx: HookContext): Contact[] => [
      { target: ctx.world.units[1 - ctx.self.side]! },
      ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable).map((pet) => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet })),
    ];
    const targetClass = (target: Unit) => target.petId === undefined || target.spec.unitClass === "clone" ? "champion" : target.spec.targetClass;
    const ownMark = (target: Unit, key: string, ctx: HookContext) => target.statuses.find((s) => s.kind === "mark" && s.key === key && s.source === ctx.self.side && s.endTick > ctx.tick);
    const cleave: AbilitySpec = { key: "Icleave", name: p.name, slot: "I", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true }, usable: () => false };
    const trail: AbilitySpec = { key: "Qtrail", name: "Dusk Trail", slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, usable: () => false };
    const dot: AbilitySpec = { key: "Etick", name: e.name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage, persistent: true, petDamageCategory: "persistent" }], usable: () => false };
    const fear: AbilitySpec = { ...dot, key: "Efear", onHit: [{ type: "cc", cc: "fear", duration: eFear }, { type: "cc", cc: "slow", duration: eFear, strength: eSlow }] };
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec) => contact.pet ? abilityHitPet(ctx.world, ctx.self, contact.pet, ability, ability.onHit ?? [], "persistent") : abilityHit(ctx.world, ctx.self, contact.target, ability, ability.onHit ?? []);
    const leaveTrail = (ctx: HookContext, from: number, to: number) => {
      ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", ability: trail.key, seenTick: ctx.tick, x: (from + to) / 2, radius: qRadius + Math.abs(to - from) / 2, startTick: ctx.tick, endTick: ctx.tick + ticks(qTime), interval: 1, nextTick: ctx.tick, onHit: [], onOwner: [{ type: "state", state: "ghosted", duration: 2 / 30 }, { type: "stat", stat: "AD", amount: { base: qAD }, duration: 2 / 30 }, { type: "stat", stat: "moveSpeedMultiplier", amount: { base: qMS }, duration: 2 / 30 }] });
    };
    const umbraReady = (ctx: HookContext) => ctx.tick >= Number(ctx.memory[UMBRA] ?? 0);
    const slash = (ctx: HookContext, scale: number, primaryHeal: boolean) => {
      ctx.memory[UMBRA] = ctx.tick + ticks(pTime);
      if (primaryHeal) heal(ctx.world, ctx.self, evaluate(pHeal, ctx.self) * (targetClass(ctx.enemy) === "minion" ? pMinion : 1) * scale);
      for (const contact of contacts(ctx)) {
        if (contact.target === ctx.enemy || (ctx.enemy.petId !== undefined && contact.target.petId === ctx.enemy.petId) || !contact.target.alive || Math.abs(contact.target.x - ctx.self.x) > pRadius + EPSILON || isUntargetable(contact.target, ctx.self)) continue;
        const factor = targetClass(contact.target) === "minion" ? pMinion : 1;
        const effects = [{ type: "damage" as const, damageType: "physical" as const, amount: { base: derive(ctx.self).ad * pRatio * factor * scale }, petDamageCategory: "proc" as const, noLifeSteal: true }];
        if (contact.pet) abilityHitPet(ctx.world, ctx.self, contact.pet, cleave, effects, "proc"); else abilityHit(ctx.world, ctx.self, contact.target, cleave, effects);
        if (!hasState(contact.target, "parry") && !inStasis(contact.target)) heal(ctx.world, ctx.self, evaluate(pHeal, ctx.self) * factor * scale);
      }
    };
    const beforeBasic = (ctx: HookContext & { pet?: Pet; blocked: boolean; attack: AttackHitOptions; scale: number }) => {
      if (!umbraReady(ctx) || ctx.pet?.spec.hitPoints) return;
      ctx.attack.baseDamageScale = pRatio;
      ctx.attack.critMultiplier = derive(ctx.self).critDamage * pCrit / pRatio;
      slash(ctx, ctx.scale, !ctx.blocked);
    };
    const refund = (ctx: HookContext) => { if (Number(ctx.memory[UMBRA] ?? 0) <= ctx.tick) return; const kind = targetClass(ctx.enemy); ctx.memory[UMBRA] = Math.max(ctx.tick, Number(ctx.memory[UMBRA] ?? 0) - ticks(kind === "champion" || kind === "monster" ? pBigRefund : pRefund)); };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: q.castTime(), deliveryAtCastStart: true, castOrigin: "start", castDirection: "start", overlay: true, delivery: { kind: "line", range: qRange, travelRange: qRange + qExtra, width: q.field("width"), radius: q.field("width") / 2, speed: q.field("speed"), piercing: true, collisionPet: true }, flags: { spellShield: true, projectile: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage, petDamageCategory: "area" }], persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), overlay: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "spellShield", duration: wTime }], roles: ["defense"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, delivery: { kind: "target", range: eRange }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "mark", key: TETHER, duration: eTime + 1 / 30 }], roles: ["cc", "damage"], estimate: (self, target) => evaluate(eTotal, self, target), estimateDelay: () => eTime, usable: (self, world) => !world.units[1 - self.side]!.statuses.some((s) => s.key === TETHER && s.source === self.side && s.endTick > world.tick) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, flags: { spellShield: true, hitsUntargetable: true }, chainCooldown: "last", roles: ["engage", "damage"], estimate: (self, target) => evaluate(rDamage, self, target), usable: (self) => !self.memory[FLIGHT] },
      { key: "R2", name: `${r.name} (flight)`, slot: "R", cooldown: 0, castTime: r.castTime(), chain: { root: "R", index: 2, window: rTime, delay: rDelay }, budgetExcluded: true, cancelOnInvalidTarget: true, delivery: { kind: "dash", direction: "target", distance: rRange, speed: rSpeed, hitRadius: 0 }, flags: { grounded: true, knockdown: r.flag("knockdown"), spellShield: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }], onSelf: [{ type: "state", state: "displacementImmune", duration: FOREVER }], roles: ["engage", "damage"], usable: (self, world) => { const target = world.units[1 - self.side]!; return target.alive && target.hp > 0 && canTarget(target, self) && Math.abs(target.x - self.x) <= rRange + EPSILON; } },
      cleave, trail, dot, fear,
    ];
    const behavior: Behavior = (view) => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.mode === "flee" || view.self.memory.tradeDone || view.mode === "trade" || view.mode === "hold") return normal;
      const r2 = abilities.find((a) => a.key === "R2")!;
      if (!view.self.action && canCast(view.world, view.self, r2)) return { kind: "cast", ability: "R2" };
      return normal;
    };
    kit.assume("Umbra Blades starts ready, uses the actual primary basic packet (120% AD, or 110% AD times critical damage), and an independently guarded 360-center-radius proc slash. The primary retains blind/dodge/block/parry and ordinary on-hit rules; parrying the primary does not suppress secondary contacts. Accepted basics shorten the static twelve-second timer by three seconds against champion/monster classes and one otherwise. Explicit minions alone receive half secondary damage and healing. The exact wiki's level sequence gives32+30%AP healing at20; the binary's HealLevel18Value32 conflicts with the wiki's level18 value30 and is retained as evidence. No structures, wards or lane wave are synthesized. Secondary minion item on-hit replication is unavailable in the current item-free simulator.");
    kit.assume("Duskbringer releases at cast-time start. Its1600-speed piercing missile creates a continuous projected150-radius trail with five-second point lifetimes, retained when a projectile wall destroys the remaining flight. Its1200 range gains the sourced25 collision extension. Damage excludes all of this kit's trail AD, including a prior cast's55AD; it does not remove purchased AD. A champion/Champion-class summon hit leaves its own moving trail for five seconds; generic monster classification does not establish the required large-monster size. The trail records obscured location without granting true sight or legal targeting through stealth. The undocumented fade after five seconds is omitted. On-trail40% total MS multiplies other bonuses before soft caps; ghosting and55AD are renewed only by actual trail occupancy.");
    kit.assume("Shroud grants its permanent50%AS and a1.5-second spell shield. Only consumption of its own shield grants the additional50%AS for five seconds. Expiry or an unrelated shield grants no proc. During actual Paranoia flight the surviving shield refreshes every0.25seconds. E uses the primary instant cast rather than the binary's0.25 placeholder, a425-center target range and465-edge tether break radius. Four persistent65+25%AP ticks occur at0.5-second intervals; an accepted tether ignores later spell shields, then independently attempts2.25-second fear and90%slow. The90%fear-facing MS applies within1000center units in the forward180degrees, using directionTo at co-location. The source's nondeterministic permanent ghosting bug is not asserted.");
    kit.assume("Paranoia's initial cast spends100mana, applies six-second1050-radius nearsight to the real enemy champion even while untargetable or dead, and opens its0.25-second delayed recast. Nearsight respects spell shields and CC immunity, follows the victim and persists through death; clones are excluded. The cooldown begins on recast or timeout. The4000-center-range recast validates a live visible target and starts a real1800-speed displacement-immune dash. Tracking follows arbitrary relocation without the binary's obsolete5000 TrackDistance cutoff. Only arrival attempts400+120%bonusAD; target death or caster death/resurrection cancels the flight, target untargetability denies the arrival packet, and visibility loss after declaration does not invent a miss. The primary instant cast takes precedence over the binary's0.25 placeholder. Q/W/E overlay the actual flight. Trade/hold reserve both ultimate stages and completed trades retain retreat.");
    return { abilities, behavior, attack: { onHitToPets: true }, start: [innateStat("attackSpeed", wAS)], hooks: {
      onStart(ctx) { ctx.memory[UMBRA] = 0; },
      onTick(ctx) {
        for (const contact of contacts(ctx)) {
          const mark = ownMark(contact.target, TAG, ctx);
          if (mark && contact.target.alive && contact.target.hp > 0) { const previous = Number(contact.target.memory[`${TAG}:x`] ?? contact.target.x); leaveTrail(ctx, previous, contact.target.x); contact.target.memory[`${TAG}:x`] = contact.target.x; if (contact.pet) contact.pet.memory = contact.target.memory; }
          const tether = ownMark(contact.target, TETHER, ctx);
          if (!tether) continue;
          if (!contact.target.alive || contact.target.hp <= 0 || contact.target.resurrection || Math.abs(contact.target.x - ctx.self.x) > eBreak + contact.target.spec.base.radius + EPSILON) { contact.target.statuses = contact.target.statuses.filter((s) => s !== tether); if (contact.pet) contact.pet.statuses = contact.target.statuses; continue; }
          const due = Math.floor((ctx.tick - tether.startTick) / ticks(eInterval));
          if (due > tether.value && due <= eTime / eInterval) { tether.value = due; if (contact.pet) contact.pet.statuses = contact.target.statuses; hit(ctx, contact, dot); }
          if (ctx.tick >= tether.startTick + ticks(eTime)) { hit(ctx, contact, fear); if (contact.pet) contact.pet.statuses = (contact.pet.statuses ?? []).filter((s) => s.key !== TETHER || s.source !== ctx.self.side); else contact.target.statuses = contact.target.statuses.filter((s) => s !== tether); }
        }
        if (contacts(ctx).some(({ target }) => target.alive && target.hp > 0 && target.statuses.some((s) => s.kind === "cc" && s.key === "fear" && s.endTick > ctx.tick) && Math.abs(target.x - ctx.self.x) <= eRadius && directionTo(ctx.self, target) === ctx.self.facing)) ctx.buff("nocturne:fearSpeed", "moveSpeedPercent", eMS, 2 / 30);
        const action = ctx.self.action;
        const flying = action?.kind === "dash" && action.ability === "R2" || action?.kind === "cast" && action.resume?.kind === "dash" && action.resume.ability === "R2";
        if (ctx.memory[FLIGHT] && (!flying || ctx.self.resurrection)) { ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "R2" && s.key === "displacementImmune")); delete ctx.memory[FLIGHT]; }
        if (flying && ctx.tick >= Number(ctx.memory["nocturne:shieldRefresh"] ?? 0)) { const shield = ctx.self.statuses.find((s) => s.key === "spellShield" && s.ability === "W" && s.source === ctx.self.side && s.startTick === ctx.memory["nocturne:shieldAtLaunch"]); if (shield) shield.endTick = ctx.tick + ticks(wTime); ctx.memory["nocturne:shieldRefresh"] = ctx.tick + ticks(wRefresh); }
      },
      onCast(ctx) {
        if (ctx.ability.key === "R") {
          if (hasState(ctx.enemy, "spellShield")) consumeSpellShield(ctx.world, ctx.self, ctx.enemy, ctx.ability);
          else if (!hasState(ctx.enemy, "ccImmune") && !hasState(ctx.enemy, "parry")) ctx.enemy.statuses.push({ kind: "cc", key: "nearsight", source: ctx.self.side, ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rTime), value: rSight, persistThroughDeath: true });
        }
        if (ctx.ability.key === "R2") { ctx.memory[FLIGHT] = true; ctx.memory["nocturne:shieldRefresh"] = ctx.tick; const shield = ctx.self.statuses.find((s) => s.key === "spellShield" && s.ability === "W" && s.source === ctx.self.side); if (shield) ctx.memory["nocturne:shieldAtLaunch"] = shield.startTick; else delete ctx.memory["nocturne:shieldAtLaunch"]; }
      },
      onAbilityContact(ctx) { if (ctx.ability.key === "Q") return ctx.effects.map((effect) => effect.type === "damage" ? { ...effect, amount: { base: Math.max(0, evaluate(qDamage, ctx.self, ctx.enemy) - (ctx.self.statuses.some((s) => s.kind === "stat" && s.key === "AD" && s.source === ctx.self.side && s.memoKey === "Qtrail:AD") ? qAD * (qDamage.ratios?.bonusAD ?? 0) : 0)) } } : effect); },
      onAbilityHit(ctx) { if (ctx.ability.key === "Q" && targetClass(ctx.enemy) === "champion") { ctx.apply({ type: "mark", key: TAG, duration: qTime }); ctx.enemy.memory[`${TAG}:x`] = ctx.enemy.x; if (ctx.enemy.petId !== undefined) { const pet = ctx.world.pets.find((pet) => pet.id === ctx.enemy.petId); if (pet) pet.memory = ctx.enemy.memory; } } },
      onMissileMove(ctx) { if (ctx.missile.source === "Q") leaveTrail(ctx, ctx.from, ctx.to); },
      onAttackBeforeDamage: beforeBasic,
      onAttackHit: refund, onAttackPetHit: refund,
      onAttackResolved(ctx) { if (!ctx.missed && ctx.blocked && hasState(ctx.enemy, "parry") && umbraReady(ctx)) slash(ctx, 1, false); },
      onAttackPetResolved(ctx) { if (!ctx.missed && ctx.blocked && hasState(ctx.enemy, "parry") && umbraReady(ctx)) slash(ctx, 1, false); },
      onSpellShieldBlock(ctx) { if (ctx.shield.ability === "W" && ctx.shield.source === ctx.self.side) ctx.buff("nocturne:shroudAS", "attackSpeed", wExtraAS, wProcTime); },
      onDashTick(ctx) { if (ctx.ability.key !== "R2") return; if (!ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.resurrection || !ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection) { ctx.self.action = ctx.action.resume; ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.ability === "R2" && s.key === "displacementImmune")); delete ctx.memory[FLIGHT]; return; } ctx.action.perTick = directionTo(ctx.self, ctx.enemy) * rSpeed / 30; ctx.action.endTick = ctx.tick + ticks(Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius) / rSpeed); },
      onLethal(ctx) { ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.ability === "R2" && s.key === "displacementImmune")); delete ctx.memory[FLIGHT]; return false; },
      onDashEnd(ctx) { if (ctx.ability.key === "R2") { ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.ability === "R2" && s.key === "displacementImmune")); delete ctx.memory[FLIGHT]; } },
    }, budget: {
      damage: (self, target) => ({ physical: (pRatio - 1) * attackDamage(self) / (pTime / (1 + pBigRefund * derive(self).attackSpeed)) + qAD * derive(self).attackSpeed }),
      healing: (self) => evaluate(pHeal, self) / (pTime / (1 + pBigRefund * derive(self).attackSpeed)),
    } };
  },
};
export default nocturne;
