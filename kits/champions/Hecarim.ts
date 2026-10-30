/** Hecarim: sampled Warpath, contact-built Rampage, damage leech and an actual charge attack. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, launchBonusAttack, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, directionTo, edgeDistance, heal, immediateDisplace, inStasis, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Pet, Unit } from "../../engine/sim/state";
import { dashDistance, terrainLimit } from "../../engine/sim/terrain";
import { FOREVER, seriesAt, ticks } from "./util";

const STACKS = "hecarim:rampage", CHARGE = "hecarim:charge", SPIRIT = "hecarim:spirit", FLIGHT = "hecarim:flight";
type Contact = { target: Unit; pet?: Pet };
const hecarim: KitModule = {
  champion: "Hecarim",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pRatio = p.levelValue("bonus attack damage equal to") / 100, pRefresh = p.quoted("{{fd|0.25}} seconds");
    p.quote("will adjust itself to any temporary movement speed"); p.quote("will not dip below his regular attack damage");
    p.gameQuote('"mLevel1Value":0.11999999731779099'); p.gameQuote('"mLevel":18,"mAdditionalBonusAtThisLevel":0.019999999552965164');
    const qDamage = q.formula("Physical Damage"), qMinion = q.quoted("reduced to 60%") / 100, qRadius = q.field("effectRadius");
    const qBaseCD = q.fieldNumbers("cooldown")[0]!, qReduction = q.quoted("base cooldown by 0.75 seconds"), qTime = q.quoted("Rampage for 8 seconds"), qCap = q.quoted("stacking up to 3 times"), qDecay = q.quoted("every 1 second");
    const qPerStack = q.quoted("damage by 3%") / 100, qPerAD = q.quoted("(+ 3% per 100 bonus AD)") / 10000;
    q.gameQuote("mSpell.DataValues.RampageDuration.values: [6.0,6.0,6.0,6.0,6.0,6.0,6.0]");
    q.gameQuote("mSpell.DataValues.BuffDuration.values: [8.0,8.0,8.0,8.0,8.0,8.0,8.0]");
    q.gameQuote("mSpell.DataValues.RampageCooldownReduction.values: [0.75,0.75,0.75,0.75,0.75,0.75,0.75]");
    const wDamage = w.formula("Magic Damage Per Tick"), wTotal = w.formula("Total Magic Damage"), wTime = w.quoted("Dread for 4 seconds"), wInterval = wTime / (wTotal.base / wDamage.base);
    const wCD = w.cooldown(), eCD = e.cooldown(), rCD = r.cooldown();
    const wRadius = w.field("effectRadius"), wResist = w.number("Bonus Resistances"), wLeech = w.quoted("healed for 25%") / 100, wAllyLeech = w.quoted("halved to 12.5%") / 100, wCap = w.number("Capped Healing");
    w.quote("every second"); w.quote("post-mitigation damage"); w.quote("accounts for every single one");
    w.gameQuote("mSpell.DataValues.TickTime.values: [0.5,0.5,0.5,0.5,0.5,0.5,0.5]");
    w.gameQuote("mSpell.DataValues.ResistAmount.values: [0.0,5.0,10.0,15.0,20.0,25.0,30.0]");
    w.gameQuote("mSpell.DataValues.HealBonusADRatio.values: [0.019999999552965164,0.019999999552965164,0.019999999552965164,0.019999999552965164,0.019999999552965164,0.019999999552965164,0.019999999552965164]");
    w.gameQuote("mSpell.spellCastTime: 0.4393500089645386");
    const eTime = e.quoted("movement speed for 4 seconds"), eMove = e.seriesIn("bonus total movement speed"), eRange = e.seriesIn("bonus range"), eKnock = e.seriesIn("knocks them back"), eIncrease = e.seriesIn("increased by", 1);
    const eMinimum = e.formula("Minimum Physical Damage"), eReveal = e.quoted("revealing them for 1 second"), eStun = e.quoted("stuns them for 0.25 seconds"), eCrit = e.quoted("100% AD bonus physical damage") / 100;
    const eStep = e.quoted("every 0.25 seconds"), eMaxMoveTime = e.quoted("capped at 3 seconds");
    e.quote("resets Hecarim's basic attack timer"); e.quote("paused during Onslaught of Shadows"); e.quote("stacks multiplicatively");
    e.quote("simple movement as well as dashing and blinking"); e.quote("will still deal damage while blinded"); e.quote("knock back will still be applied"); e.quote("will not use the empowered attack while rooted"); e.quote("The dash does not follow targets"); e.quote("not if he goes into resurrection");
    e.gameQuote("mSpell.DataValues.TimeToMaxMoveSpeed.values: [2.5,2.5,2.5,2.5,2.5,2.5,2.5]");
    e.gameQuote("mSpell.DataValues.DistanceToMaxDamage.values: [1200.0,1200.0,1200.0,1200.0,1200.0,1200.0,1200.0]");
    e.gameQuote('"spellCastTime":0.3461499810218811', "Characters/Hecarim/Spells/HecarimRampAbility/HecarimRampAttack");
    const rDamage = r.formula("Magic damage"), [rMinimum, rMaximum] = r.fieldNumbers("targetRange"), rRange = r.field("range"), rSpeed = r.field("speed"), rRadius = r.field("effectRadius"), rWidth = r.field("width", "Individual");
    const rFear = r.seriesIn("fears nearby enemies"), rSlow = r.seriesIn("slows them by", 1), rReveal = r.quoted("revealing them for 2.5 seconds");
    r.field("width", "full effect"); r.quote("summons 5 spectral riders"); r.quote("145 units behind and 100 units"); r.quote("290 units behind and 200 units"); r.quote("Only the spectral riders deal damage"); r.quote("wave of spectral riders travels independently"); r.quote("additive percent movement speed modifier"); r.quote("unaffected by slow resist");
    r.gameQuote("mSpell.DataValues.DashSpeed.values: [1100.0,1100.0,1100.0,1100.0,1100.0,1100.0,1100.0]");
    r.gameQuote("mSpell.DataValues.RangeForMaxFearDuration.values: [950.0,950.0,950.0,950.0,950.0,950.0,950.0]"); r.gameQuote("mSpell.spellCastTime: 0.75"); r.gameQuote("mSpell.missileSpeed: 1200.0");

    const contacts = (ctx: HookContext): Contact[] => [{ target: ctx.world.units[1 - ctx.self.side]! }, ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints).map(pet => ({ pet, target: petFormulaTarget(pet, ctx.self, ctx.tick) }))];
    const hit = (ctx: HookContext, contact: Contact, ability: AbilitySpec, effects = ability.onHit ?? []) => contact.pet ? abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area") : abilityHit(ctx.world, ctx.self, contact.target, ability, effects);
    const inside = (self: Unit, target: Unit, radius: number) => Math.abs(self.x - target.x) <= radius + 1e-6;
    const chargeActive = (self: Unit) => !!self.memory[CHARGE];
    const stacks = (self: Unit) => Number(self.memory[STACKS] ?? 0);
    const chargeDistance = (self: Unit) => Number(self.memory[`${CHARGE}:distance`] ?? 0);
    const grounded = (self: Unit) => { const cc = ccTypes(self); return cc.has("ground") || cc.has("root"); };
    const sampledWarpath = (ctx: HookContext) => { ctx.buff("hecarim:warpath", "AD", Math.max(0, derive(ctx.self).moveSpeed - ctx.self.spec.base.moveSpeed) * pRatio, FOREVER); const next = Math.floor(ctx.tick / (pRefresh * 30) + 1e-9) + 1; ctx.memory["hecarim:warpathNext"] = ticks(next * pRefresh); };
    const endCharge = (ctx: HookContext) => {
      delete ctx.memory[CHARGE];
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.source === ctx.self.side && (s.memoKey === "buff:hecarim:chargeMS" || s.ability === "E" && s.key === "ghosted")));
    };
    const qContact: AbilitySpec = { key: "Qhit", name: q.name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: q.flag("spellShield"), petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage, petDamageCategory: "area" }], usable: () => false };
    const wContact: AbilitySpec = { ...qContact, key: "Wtick", name: w.name, flags: { spellShield: w.flag("spellShield"), petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage, persistent: true, petDamageCategory: "persistent" }] };
    const chargeControl: AbilitySpec = { ...qContact, key: "Eimpact", name: e.name, flags: { spellShield: true, petContactHooks: true }, onHit: [] };
    const rWave: AbilitySpec = { ...qContact, key: "Rwave", name: r.name, flags: { spellShield: r.flag("spellShield"), projectile: true, petContactHooks: true }, persistsAfterDeath: true, onHit: [{ type: "damage", damageType: "magic", amount: rDamage, petDamageCategory: "area" }, { type: "state", state: "standardSight", duration: rReveal }] };
    const rControl: AbilitySpec = { ...qContact, key: "Rfear", name: `${r.name} (fear)`, flags: { spellShield: true, petContactHooks: true }, onHit: [] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qBaseCD, cooldownFor: self => qBaseCD - qReduction * stacks(self), cost: q.cost(), castTime: q.castTime(), overlay: true, overlayResumedDash: true, preserveAttackWindup: true, delivery: { kind: "self" }, roles: ["damage"], estimate: (self, target) => evaluate(qDamage, self, target) * (1 + stacks(self) * (qPerStack + derive(self).bonusAd * qPerAD)), usable: (self, world) => inside(self, world.units[1 - self.side]!, qRadius) || world.pets.some(pet => pet.owner !== self.side && pet.hp > 0 && !pet.spec.hitPoints && Math.abs(pet.x - self.x) <= qRadius) },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), overlay: true, overlayResumedDash: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "armor", amount: { base: wResist }, duration: wTime }, { type: "stat", stat: "MR", amount: { base: wResist }, duration: wTime }], roles: ["damage", "defense"], estimate: (self, target) => evaluate(wTotal, self, target), usable: (self, world) => !self.memory[SPIRIT] && inside(self, world.units[1 - self.side]!, wRadius) },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: e.castTime(), overlay: true, overlayResumedDash: true, delivery: { kind: "self" }, onSelf: [{ type: "resetAttack" }, { type: "state", state: "ghosted", duration: eTime }], roles: ["buff", "engage"], estimate: (self, target) => evaluate(eMinimum, self, target), usable: self => !chargeActive(self) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "dash", direction: "toward", distance: rMaximum!, minDistance: rMinimum!, speed: rSpeed, through: true, crossTerrain: true }, flags: { grounded: r.flag("grounded"), knockdown: r.flag("knockdown") }, onSelf: [{ type: "state", state: "displacementImmune", duration: FOREVER }], roles: ["damage", "cc", "engage"], estimate: (self, target) => evaluate(rDamage, self, target), usable: self => !self.memory[FLIGHT] },
      qContact, wContact, chargeControl, rWave, rControl,
    ];
    const behavior: Behavior = view => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.mode === "flee" || view.mode === "hold" || view.mode === "trade" || view.self.memory.tradeDone) return normal;
      if (normal?.kind === "cast" && normal.ability === "R") return { ...normal, aim: { direction: 1, distance: Math.max(rMinimum!, Math.min(rMaximum!, Math.abs(view.enemy.x - view.self.x))) } };
      const eSpec = abilities.find(a => a.key === "E")!;
      if (!view.self.action && canCast(view.world, view.self, eSpec) && !chargeActive(view.self) && edgeDistance(view.self, view.enemy) > view.self.spec.attack.range && edgeDistance(view.self, view.enemy) <= derive(view.self).moveSpeed * eTime) return { kind: "cast", ability: "E" };
      return normal;
    };
    kit.assume("Warpath converts24%of positive final movement speed above base into bonusAD, refreshed every0.25seconds with ceil-rounded30Hz deadlines. It samples actual movement buffs, soft caps and slows; below-base speed grants0AD. A keyed ordinary bonusAD contribution participates once in totalAD reductions and other AD conversions without recursively evaluating derive. No speed or damage is granted from fictional travel before the duel.");
    kit.assume("Rampage starts at zero stacks. Each actual damaging cast grants at most one of three stacks, refreshes the eight-second lifetime and adjusts that cast's base cooldown by0.75per current stack before haste. Damage snapshots pre-hit stacks across all bodies, increases3%plus3%per100bonusAD per stack, and minions alone receive60%. Expiry loses one stack at eight seconds, then one per second. The primary eight-second duration wins over the binary's conflicting RampageDuration6; binary BuffDuration8 agrees.");
    kit.assume("Spirit of Dread lasts four seconds and makes four60+20%AP persistent ticks at one-second deadlines; primary timing wins over binary TickTime0.5 and its unused0.43935cast metadata. It grants25armor/MR while active. Healing uses actual observed post-mitigation damage, including shield absorption and damage later negated by Riposte under its explicit vamp rule, within525center range:25%from Hecarim and12.5%from allies. The240nonchampion healing allowance is shared across all minions/monsters during that cast, before ordinary healing modifiers. Unused binary HealBonusADRatio0.02 does not invent a primary bonusAD healing coefficient. No allied champion or lane wave is supplied.");
    kit.assume("Devastating Charge is a four-second movement buff with a0.25-second stepped25–65%totalMS multiplier reaching its cap at three seconds. Primary three seconds wins over binary TimeToMaxMoveSpeed2.5. Only real movement/dashes/blinks add distance, up to the primary1200scaling cap; R pauses the E lifetime and ramp. E resets the basic timer and its real next declared basic gains50–250range except under root/ground. Root preserves E and allows an ordinary basic. The empowered basic uses its actual target/critical snapshot/on-hits/life steal, ignores blind, and adds the sourced90+50%bonusAD minimum packet scaled up to double; critical strikes add100%AD. Dodge/block deny damage while a separate spell-shield/parry/CC-guarded knockback/stun still attempts. E's dash speed is unquantified in both primary and exact RampAttack record, so the explicit fallback immediately relocates along the declaration's fixed direction at launch; it never invents a finite speed or tracking flight. Knockback duration is also unquantified, so its guarded displacement uses the same immediate fallback, followed by the sourced0.25-second stun. Terrain clips relocation and the knockback. No travel-time interruption window, target chase or resurrection hit is fabricated.");
    kit.assume("Onslaught travels at primary1100speed over the requested300–1000distance, with displacement immunity and cross-terrain endpoint validation. Its independently traveling central spectral rider pierces for350+100%AP out to primary estimated1510range and grants2.5seconds standard sight. The four off-axis riders'145/290longitudinal and100/200lateral offsets and full480width remain evidence; this scalar duel resolves the central80width rider, never fivefold damage. A projectile wall stops that rider without cancelling dash/fear; released flight persists after owner death. Arrival independently fears actual enemies within315center radius for0.75–1.5seconds based on actual travel to1000. The primary wins over binary RangeForMaxFearDuration950, spellCastTime0.75and missileSpeed1200. During accepted fear, its0–99%distance slow is the sourced negative additiveMS modifier, bypassing slow resist and stacking ordinary slows. Fear, slow and standard sight belong to actual pet statuses. Hold/trade reserve ready R and completed trades retreat.");
    return { abilities, behavior, attack: { onHitToPets: true, bonusRangeFor: self => chargeActive(self) && !grounded(self) ? seriesAt(eRange, chargeDistance(self), true) : 0 }, hooks: {
      onStart(ctx) { ctx.memory[STACKS] = 0; sampledWarpath(ctx); },
      onTick(ctx) {
        if (ctx.self.resurrection) { endCharge(ctx); delete ctx.memory[SPIRIT]; ctx.memory[STACKS] = 0; }
        if (chargeActive(ctx.self)) {
          const previous = Number(ctx.memory[`${CHARGE}:x`] ?? ctx.self.x); ctx.memory[`${CHARGE}:distance`] = chargeDistance(ctx.self) + Math.abs(ctx.self.x - previous); ctx.memory[`${CHARGE}:x`] = ctx.self.x;
          const flight = ctx.self.action?.kind === "dash" && ctx.self.action.ability === "R" ? ctx.self.action : ctx.self.action?.kind === "cast" && ctx.self.action.resume?.kind === "dash" && ctx.self.action.resume.ability === "R" ? ctx.self.action.resume : undefined;
          if (flight && ctx.tick > flight.startTick) { ctx.memory[`${CHARGE}:start`] = Number(ctx.memory[`${CHARGE}:start`]) + 1; ctx.memory[`${CHARGE}:end`] = Number(ctx.memory[`${CHARGE}:end`]) + 1; const ghost = ctx.self.statuses.find(s => s.ability === "E" && s.key === "ghosted" && s.source === ctx.self.side); if (ghost) ghost.endTick++; }
          if (ctx.tick >= Number(ctx.memory[`${CHARGE}:end`])) endCharge(ctx);
          else { const time = Math.min(eMaxMoveTime, Math.floor((ctx.tick - Number(ctx.memory[`${CHARGE}:start`])) / (eStep * 30) + 1e-9) * eStep); ctx.buff("hecarim:chargeMS", "moveSpeedMultiplier", seriesAt(eMove, time, true) / 100, 2 / 30); }
        }
        if (ctx.tick >= Number(ctx.memory["hecarim:warpathNext"] ?? 0)) sampledWarpath(ctx);
        if (stacks(ctx.self) > 0 && ctx.tick >= Number(ctx.memory[`${STACKS}:until`])) { const lost = 1 + Math.floor((ctx.tick - Number(ctx.memory[`${STACKS}:until`])) / ticks(qDecay)); ctx.memory[STACKS] = Math.max(0, stacks(ctx.self) - lost); ctx.memory[`${STACKS}:until`] = Number(ctx.memory[`${STACKS}:until`]) + lost * ticks(qDecay); }
        if (ctx.memory[SPIRIT]) {
          const next = Number(ctx.memory[`${SPIRIT}:next`]), end = Number(ctx.memory[`${SPIRIT}:end`]);
          if (ctx.tick >= next && ctx.tick <= end) { ctx.memory[`${SPIRIT}:next`] = next + ticks(wInterval); for (const contact of contacts(ctx)) if (inside(ctx.self, contact.target, wRadius)) hit(ctx, contact, wContact); }
          if (ctx.tick >= end) delete ctx.memory[SPIRIT];
        }
        for (const contact of contacts(ctx)) {
          const fear = contact.target.statuses.find(s => s.kind === "cc" && s.key === "fear" && s.ability === rControl.key && s.source === ctx.self.side && s.endTick > ctx.tick);
          if (!fear) continue;
          const value = -seriesAt(rSlow, Math.abs(contact.target.x - ctx.self.x), true) / 100;
          const key = `hecarim:rSlow:${ctx.self.side}`, statuses = contact.pet ? (contact.pet.statuses ??= []) : contact.target.statuses;
          const slow = statuses.find(s => s.memoKey === key); if (slow) { slow.value = value; slow.endTick = ctx.tick + 2; } else statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, ability: rControl.key, startTick: ctx.tick, endTick: ctx.tick + 2, value, memoKey: key });
        }
        const flying = ctx.self.action?.kind === "dash" && ctx.self.action.ability === "R" || ctx.self.action?.kind === "cast" && ctx.self.action.resume?.kind === "dash" && ctx.self.action.resume.ability === "R";
        if (ctx.memory[FLIGHT] && !flying) { ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.key === "displacementImmune" && s.source === ctx.self.side)); delete ctx.memory[FLIGHT]; }
      },
      onCast(ctx) {
        if (ctx.ability.key === "Q") {
          ctx.memory[`${STACKS}:cast`] = stacks(ctx.self); ctx.memory[`${STACKS}:gained`] = false;
          for (const contact of contacts(ctx)) if (inside(ctx.self, contact.target, qRadius)) hit(ctx, contact, qContact);
        }
        if (ctx.ability.key === "W") { ctx.memory[SPIRIT] = true; ctx.memory[`${SPIRIT}:next`] = ctx.tick + ticks(wInterval); ctx.memory[`${SPIRIT}:end`] = ctx.tick + ticks(wTime); ctx.memory[`${SPIRIT}:healed`] = 0; }
        if (ctx.ability.key === "E") { ctx.memory[CHARGE] = true; ctx.memory[`${CHARGE}:start`] = ctx.tick; ctx.memory[`${CHARGE}:end`] = ctx.tick + ticks(eTime); ctx.memory[`${CHARGE}:x`] = ctx.self.x; ctx.memory[`${CHARGE}:distance`] = 0; ctx.buff("hecarim:chargeMS", "moveSpeedMultiplier", seriesAt(eMove, 0, true) / 100, 2 / 30); }
        if (ctx.ability.key === "R") {
          ctx.memory[FLIGHT] = true; ctx.memory[`${FLIGHT}:x`] = ctx.self.x;
          const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1;
          const distance = Math.max(rMinimum!, Math.min(rMaximum!, ctx.aim?.distance ?? rMaximum!)); ctx.memory[`${FLIGHT}:to`] = ctx.self.x + dashDistance(ctx.world, ctx.self, direction * distance);
          const travel = Math.max(0, (ctx.enemy.x - ctx.self.x) * direction - ctx.enemy.spec.base.radius) / rSpeed;
          ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: rWave.key, seenTick: ctx.tick, x: ctx.self.x, perTick: rSpeed / 30, piercing: true, collisionPet: true, radius: rWidth / 2, homing: false, direction, travelLeft: rRange, projectile: true, connects: true, scale: skillshotChance(ctx.world, ctx.enemy, ctx.tick, travel, rWidth / 2), onHit: rWave.onHit ?? [] });
        }
      },
      onAbilityContact(ctx) {
        if (ctx.ability.key !== qContact.key) return;
        const scale = (1 + Number(ctx.memory[`${STACKS}:cast`] ?? stacks(ctx.self)) * (qPerStack + derive(ctx.self).bonusAd * qPerAD)) * (ctx.enemy.spec.targetClass === "minion" ? qMinion : 1);
        return [{ type: "damage", damageType: "physical", amount: { base: evaluate(qDamage, ctx.self, ctx.enemy) * scale }, petDamageCategory: "area" }];
      },
      beforeAbilityHit(ctx) {
        if (ctx.ability.key !== chargeControl.key) return;
        const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find(pet => pet.id === ctx.enemy.petId);
        if (pet?.spec.ccImmune?.includes("airborne")) return;
        if (immediateDisplace(ctx.world, ctx.self, ctx.enemy, directionTo(ctx.self, ctx.enemy) * seriesAt(eKnock, chargeDistance(ctx.self), true), chargeControl.key) && pet) { pet.x = ctx.enemy.x; delete pet.windup; }
      },
      onDamageObserved(ctx) {
        if (ctx.source.side !== ctx.self.side || ctx.target.side === ctx.self.side || !(ctx.mitigated > 0)) return;
        if (ctx.source.petId === undefined && ctx.ability === q.name && ctx.amount + ctx.absorbed > 0 && !ctx.memory[`${STACKS}:gained`]) {
          ctx.memory[`${STACKS}:gained`] = true; ctx.memory[STACKS] = Math.min(qCap, stacks(ctx.self) + 1); ctx.memory[`${STACKS}:until`] = ctx.tick + ticks(qTime);
          ctx.self.cooldownReady.Q = ctx.tick + ticks(cooldownAfterHaste(qBaseCD - qReduction * stacks(ctx.self), derive(ctx.self).abilityHaste));
        }
        if (!ctx.memory[SPIRIT] || ctx.tick > Number(ctx.memory[`${SPIRIT}:end`]) || !inside(ctx.self, ctx.target, wRadius)) return;
        const pet = ctx.targetPet;
        if (pet?.spec.hitPoints || pet?.spec.fixedDamage || pet?.spec.diesToChampionAttack) return;
        const ratio = ctx.source.petId === undefined ? wLeech : wAllyLeech;
        let amount = ctx.mitigated * ratio;
        if (ctx.target.spec.targetClass === "minion" || ctx.target.spec.targetClass === "monster") { amount = Math.min(amount, Math.max(0, wCap - Number(ctx.memory[`${SPIRIT}:healed`] ?? 0))); ctx.memory[`${SPIRIT}:healed`] = Number(ctx.memory[`${SPIRIT}:healed`] ?? 0) + amount; }
        heal(ctx.world, ctx.self, amount);
      },
      onAttack(ctx) {
        if (!chargeActive(ctx.self) || ccTypes(ctx.self).has("root") || ctx.self.resurrection) return;
        ctx.action.attackTag = CHARGE; ctx.action.blinded = false;
        ctx.memory[`${CHARGE}:targetX`] = ctx.enemy.x; ctx.memory[`${CHARGE}:direction`] = directionTo(ctx.self, ctx.enemy);
      },
      onAttackLaunch(ctx) {
        if (ctx.action.attackTag !== CHARGE || !chargeActive(ctx.self) || ctx.self.resurrection || ccTypes(ctx.self).has("root") || !ctx.enemy.alive || ctx.enemy.hp <= 0 || inStasis(ctx.enemy) || isUntargetable(ctx.enemy, ctx.self)) return;
        const direction = Number(ctx.memory[`${CHARGE}:direction`]) as 1 | -1, targetX = Number(ctx.memory[`${CHARGE}:targetX`]);
        const movement = grounded(ctx.self) ? 0 : direction * Math.max(0, (targetX - ctx.self.x) * direction - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
        const dx = terrainLimit(ctx.world, ctx.self, movement); ctx.self.x += dx;
        ctx.memory[`${CHARGE}:distance`] = chargeDistance(ctx.self) + Math.abs(ctx.self.x - Number(ctx.memory[`${CHARGE}:x`])); ctx.memory[`${CHARGE}:x`] = ctx.self.x;
        if (edgeDistance(ctx.self, ctx.enemy) > ctx.self.spec.attack.range + 1e-6) return false;
        const distance = chargeDistance(ctx.self), multiplier = 1 + seriesAt(eIncrease, distance, true) / 100;
        const options = { critChance: ctx.action.critChance, critMultiplier: 1 + eCrit, bonusPhysical: { base: evaluate(eMinimum, ctx.self, ctx.enemy) * multiplier }, attackTag: CHARGE };
        const control: Effect[] = [{ type: "state", state: "standardSight", duration: eReveal }, { type: "cc", cc: "stun", duration: eStun }];
        const shielded = hasState(ctx.enemy, "spellShield"), parried = hasState(ctx.enemy, "parry");
        hit(ctx, { target: ctx.enemy, ...(ctx.targetPet ? { pet: ctx.targetPet } : {}) }, chargeControl, control);
        endCharge(ctx);
        if (!shielded && !parried) launchBonusAttack(ctx.world, ctx.self, ctx.targetPet ?? ctx.enemy, { ...options, blinded: false }, ctx.action.onHit);
        return false;
      },
      onDashEnd(ctx) {
        if (ctx.ability.key !== "R") return;
        ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.key === "displacementImmune" && s.source === ctx.self.side)); delete ctx.memory[FLIGHT];
        if (ctx.interrupted || !ctx.self.alive || ctx.self.resurrection) return;
        const duration = seriesAt(rFear, Math.abs(ctx.self.x - Number(ctx.memory[`${FLIGHT}:x`])), true);
        for (const contact of contacts(ctx)) if (inside(ctx.self, contact.target, rRadius)) hit(ctx, contact, rControl, [{ type: "cc", cc: "fear", duration }]);
      },
      onDashTick(ctx) { if (ctx.ability.key === "R") { const remaining = Number(ctx.memory[`${FLIGHT}:to`]) - ctx.self.x; ctx.action.perTick = Math.sign(remaining) * Math.min(rSpeed / 30, Math.abs(remaining)); if (Math.abs(remaining) <= rSpeed / 30 + 1e-6) ctx.action.endTick = ctx.tick; } },
      onLethal(ctx) { endCharge(ctx); delete ctx.memory[SPIRIT]; delete ctx.memory[FLIGHT]; ctx.memory[STACKS] = 0; ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === "R" && s.key === "displacementImmune")); return false; },
    }, budget: {
      damage: (self, target) => ({ physical: evaluate(qDamage, self, target) * (1 + qCap * (qPerStack + derive(self).bonusAd * qPerAD)) * (1 + derive(self).abilityHaste / 100) / (qBaseCD - qReduction * qCap) + evaluate(eMinimum, self, target) * 2 * (1 + derive(self).abilityHaste / 100) / eCD, magic: (evaluate(wTotal, self, target) / wCD + evaluate(rDamage, self, target) / rCD) * (1 + derive(self).abilityHaste / 100) }),
      healing: (self, target) => (evaluate(wTotal, self, target) + derive(self).ad * derive(self).attackSpeed * wTime) * wLeech * (1 + derive(self).abilityHaste / 100) / wCD,
    } };
  },
};
export default hecarim;
