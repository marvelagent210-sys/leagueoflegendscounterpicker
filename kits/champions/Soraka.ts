/** Soraka: actual allied health donations, independently traveling stardust and persistent silence. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { seriesAt, ticks } from "./util";

const EPSILON = 1e-6;
const REGEN = "soraka:rejuvenation", SALVATION = "soraka:salvation";
type Body = { target: Unit; pet?: Pet };
const soraka: KitModule = {
  champion: "Soraka",
  build(kit) {
    const p = kit.ability("Salvation"), q = kit.ability("Starcall"), w = kit.ability("Astral Infusion"), e = kit.ability("Equinox"), r = kit.ability("Wish");
    const pSpeed = p.quoted("90% bonus movement speed") / 100, pHealth = p.quoted("below 40% of their maximum health") / 100, pRange = p.field("effectRadius");
    const qRange = q.field("targetRange"), qRadius = q.field("effectRadius"), qDelay = q.seriesIn("based on target range"), qDamage = q.formula("Magic Damage"), qHeal = q.formula("Total Heal"), qSpeed = q.number("Bonus Movement Speed") / 100;
    const regenDuration = q.quoted("Rejuvenation for 2.5 seconds"), regenInterval = q.quoted("Heal every 0.2 seconds"), healCount = q.quoted("heals over 12 ticks"), healGroup = q.quoted("first 4 each healing for about 15%", 0);
    const healWeights = [q.quoted("first 4 each healing for about 15%", 1) / 100, q.quoted("next 4 ticks for about 5.5%", 1) / 100, q.quoted("last 4 for about 4.5%", 1) / 100];
    const qSlow = q.quoted("slowing them by 30%") / 100, qSlowTime = q.quoted("30% for 1.5 seconds", 1);
    const returnSpeed = q.gameQuoted('"mSpeed":1400.0', 0, "Characters/Soraka/Spells/SorakaQAbility/SorakaQReturnMissile");
    q.quote("counts as hitting even if it gets blocked by spell shield"); q.quote("Both the initial hit and the Rejuvenation projectile can be intercepted");
    q.quote("until the projectile gets to her"); q.quote("able to Rejuvenate allies as soon as the target is hit");
    q.gameQuote('"missileSpeed":1100.0', "Characters/Soraka/Spells/SorakaQAbility/SorakaQMissile");
    const wRange = w.field("targetRange"), wHeal = w.formula("Heal"), wHealth = w.cost() / 100, wReduced = w.number("Health Cost Reduction") / 100, wMin = w.quoted("below 5% of her maximum health") / 100;
    const wMana = w.gameQuoted('"mana":[40.0,45.0,50.0,55.0,60.0,60.0]', 4, "Characters/Soraka/Spells/SorakaWAbility/SorakaW");
    const wFloor = w.quoted("health below 1"), wForgive = w.quoted("forgiveness radius of 175 units");
    w.quote("Astral Infusion's effects occur before the cast time"); w.quote("targeted on allied decoys"); w.textField("costType");
    const eRange = e.field("targetRange"), eRadius = e.field("effectRadius"), eDuration = e.quoted("persists for 1.5 seconds"), eDamage = e.formula("Magic Damage"), eRoot = e.number("Root Duration");
    e.quote("silence is marked as non-dispellable"); e.quote("Spell shield will not block the silence"); e.quote("very slightly larger radius than the damage and root radius checks cover");
    e.gameQuote('"castRange":[875.0,875.0,875.0,875.0,875.0,875.0,875.0]', "Characters/Soraka/Spells/SorakaEAbility/SorakaE");
    const rHeal = r.formula("Heal"), rIncreased = r.formula("Increased Heal"), rHealth = r.quoted("below 40% of their maximum health") / 100;
    r.quote("Untargetability does not invalidate the targeting of the heal"); r.quote("Wish's effects occur before the cast time"); r.quote("not in the same realm");
    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), eCooldown = e.cooldown(), rCooldown = r.cooldown();
    const champion = (target: Unit) => target.petId === undefined || target.spec.targetClass === "champion";
    const friendlyPets = (world: World, self: Unit) => world.pets.filter(pet => pet.owner === self.side && pet.hp > 0 && pet.spec.targetClass === "champion" && !pet.spec.hitPoints && !pet.spec.fixedDamage);
    const allyBodies = (world: World, self: Unit): Body[] => friendlyPets(world, self).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet }));
    const sync = (body: Body) => { if (body.pet) { body.pet.hp = body.target.hp; body.pet.statuses = body.target.statuses; } };
    const selectable = (world: World, self: Unit, body: Body) => body.target.alive && body.target.hp > 0 && !inStasis(body.target) && !isUntargetable(body.target, self) && canSee(body.target, self) && !!body.pet && canTargetPet(body.pet, self, world.tick);
    const chooseAlly = (world: World, self: Unit, aim?: Aim) => {
      const cursor = aim?.distance === undefined ? self.x : self.x + directionTo(self, world.units[self.side === 0 ? 1 : 0]) * aim.direction * aim.distance;
      return allyBodies(world, self).filter(body => selectable(world, self, body) && Math.abs(body.target.x - self.x) <= wRange + EPSILON)
        .sort((a, b) => aim?.distance === undefined ? a.target.hp / derive(a.target).maxHp - b.target.hp / derive(b.target).maxHp || Math.abs(a.target.x - self.x) - Math.abs(b.target.x - self.x) || a.pet!.id - b.pet!.id : Math.abs(a.target.x - cursor) - Math.abs(b.target.x - cursor) || a.pet!.id - b.pet!.id)[0];
    };
    const recipient = (ctx: HookContext, missile: Missile): Body | undefined => {
      const id = Number(ctx.memory[`${REGEN}:target:${missile.id}`] ?? -1);
      if (id < 0) return ctx.self.alive && ctx.self.hp > 0 && !ctx.self.resurrection && !ctx.self.deathDefied ? { target: ctx.self } : undefined;
      const pet = friendlyPets(ctx.world, ctx.self).find(body => body.id === id);
      return pet ? { target: petFormulaTarget(pet, ctx.self, ctx.tick), pet } : undefined;
    };
    const recipientMemory = (body: Body) => body.pet?.memory ?? body.target.memory;
    const updateRegen = (ctx: HookContext, missile: Missile) => {
      const body = recipient(ctx, missile), serial = Number(ctx.memory[`${REGEN}:serial:${missile.id}`]);
      if (!body || recipientMemory(body)[`${REGEN}:${ctx.self.side}`] !== serial) { missile.ended = true; return; }
      const until = Number(ctx.memory[`${REGEN}:until:${missile.id}`]), start = until - ticks(regenDuration), memoKey = `${REGEN}:${ctx.self.side}`;
      body.target.statuses = body.target.statuses.filter(status => status.memoKey !== memoKey);
      if (ctx.tick >= until) { missile.ended = true; sync(body); return; }
      body.target.statuses.push({ kind: "stat", key: "moveSpeedPercent", value: qSpeed * (until - ctx.tick) / ticks(regenDuration), source: ctx.self.side, startTick: ctx.tick, endTick: until, ability: "Q", memoKey });
      let done = Number(ctx.memory[`${REGEN}:done:${missile.id}`] ?? 0);
      while (done < healCount && ctx.tick >= start + ticks((done + 1) * regenInterval)) {
        const weight = healWeights[Math.min(healWeights.length - 1, Math.floor(done / healGroup))]!;
        heal(ctx.world, body.target, Number(ctx.memory[`${REGEN}:amount:${missile.id}`]) * weight); done++;
      }
      ctx.memory[`${REGEN}:done:${missile.id}`] = done; sync(body);
    };
    const grantRegen = (ctx: HookContext, body: Body) => {
      if (!body.target.alive || body.target.hp <= 0 || body.target.resurrection || body.target.deathDefied) return;
      const id = ctx.world.nextId++, serial = id;
      recipientMemory(body)[`${REGEN}:${ctx.self.side}`] = serial;
      if (!body.pet) { ctx.memory[`${REGEN}:selfUntil`] = ctx.tick + ticks(regenDuration); ctx.memory[`${REGEN}:shareUntil`] = ctx.tick + ticks(regenDuration); }
      ctx.memory[`${REGEN}:target:${id}`] = body.pet?.id ?? -1; ctx.memory[`${REGEN}:serial:${id}`] = serial;
      ctx.memory[`${REGEN}:until:${id}`] = ctx.tick + ticks(regenDuration); ctx.memory[`${REGEN}:amount:${id}`] = evaluate(qHeal, ctx.self);
      const carrier: Missile = { id, owner: ctx.self.side, source: "Q-rejuvenation", seenTick: ctx.tick, x: body.target.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, projectile: false, connects: false, scale: 1, onHit: [], piercing: true, perceptionHidden: true, expiresTick: ctx.tick + ticks(regenDuration) + 1 };
      ctx.world.missiles.push(carrier); updateRegen(ctx, carrier);
    };
    const returnDust = (ctx: HookContext, x: number, group: string) => {
      if (ctx.memory[`soraka:qReturn:${group}`] || !ctx.self.alive || ctx.self.resurrection) return;
      ctx.memory[`soraka:qReturn:${group}`] = true; ctx.memory[`${REGEN}:shareUntil`] = Math.max(Number(ctx.memory[`${REGEN}:shareUntil`] ?? 0), ctx.tick + ticks(regenDuration));
      if (Math.abs(x - ctx.self.x) <= EPSILON) { grantRegen(ctx, { target: ctx.self }); return; }
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Q-return", seenTick: ctx.tick, x, perTick: returnSpeed / 30, direction: x > ctx.self.x ? -1 : 1, homing: false, travelLeft: Infinity, projectile: true, connects: false, scale: 1, onHit: [], followOwner: true, piercing: true, interceptable: true, perceptionHidden: true });
    };
    const silence: Effect[] = [{ type: "cc", cc: "silence", duration: 1 / 30, sticky: true, spellShield: false }];
    const burst: Effect[] = [{ type: "damage", damageType: "magic", amount: eDamage }, { type: "cc", cc: "root", duration: eRoot }];
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime(), decisive: true, delivery: { kind: "circle", range: qRange, radius: qRadius, centered: true, delay: seriesAt(qDelay, qRange, true), delayFor: (self, target, aim) => seriesAt(qDelay, Math.min(qRange, aim?.distance ?? Math.abs(target.x - self.x)), true) }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "slow", strength: qSlow, duration: qSlowTime }], roles: ["damage", "cc"], persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCooldown, cost: wMana, costAtCastStart: true, cooldownAtCastStart: true, castTime: w.castTime(), delivery: { kind: "self" }, castThreat: false, budgetExcluded: true, roles: ["defense"], usable: (self, world) => self.hp + EPSILON >= derive(self).maxHp * wMin && !!chooseAlly(world, self) },
      { key: "E", name: e.name, slot: "E", cooldown: eCooldown, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "circle", range: eRange, radius: eRadius, centered: true, delay: 0 }, flags: { projectile: false, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], roles: ["damage", "cc"], persistsAfterDeath: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: r.cost(), costAtCastStart: true, cooldownAtCastStart: true, castTime: r.castTime(), delivery: { kind: "self" }, castThreat: false, roles: ["defense"], budgetExcluded: true },
      ...(["Q-flight", "Q-return", "Q-rejuvenation"] as const).map(key => ({ key, name: `${q.name} (${key.slice(2)})`, slot: "other" as const, activation: "internal" as const, countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" as const }, usable: () => false, persistsAfterDeath: true })),
      { key: "E-silence", name: `${e.name} (silence)`, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true }, onHit: silence, usable: () => false, persistsAfterDeath: true },
      { key: "E-eruption", name: `${e.name} (eruption)`, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "circle", range: eRange, radius: eRadius, centered: true, delay: eDuration }, flags: { spellShield: true, petContactHooks: true }, onHit: burst, usable: () => false, persistsAfterDeath: true },
    ];
    const byKey = (key: string) => abilities.find(ability => ability.key === key)!;
    const policy: Behavior = view => {
      const { self, enemy, world, mode } = view, normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [] } } });
      if (mode === "idle") return normal;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (self.action) return normal;
      const ready = (key: string) => canCast(world, self, byKey(key)), missing = derive(self).maxHp - self.hp;
      if (mode === "fight" && ready("R") && missing >= evaluate(self.hp < rHealth * derive(self).maxHp ? rIncreased : rHeal, self)) return { kind: "cast", ability: "R" };
      const ally = chooseAlly(world, self);
      if (ally && ready("W") && derive(ally.target).maxHp - ally.target.hp >= evaluate(wHeal, self) / 2 && self.hp > derive(self).maxHp * pHealth) return { kind: "cast", ability: "W", aim: { direction: (directionTo(self, enemy) * Math.sign(ally.target.x - self.x || directionTo(self, enemy))) as 1 | -1, distance: Math.abs(ally.target.x - self.x) } };
      if (ready("Q") && Math.abs(enemy.x - self.x) <= qRange + qRadius) return { kind: "cast", ability: "Q" };
      if (ready("E") && Math.abs(enemy.x - self.x) <= eRange + eRadius) return { kind: "cast", ability: "E" };
      if (mode !== "flee" && canStartAttack(world, self)) return { kind: "attack" };
      return normal;
    };
    kit.assume("Salvation only sees actual living allied Champion-class bodies below40%maximumHP within2500center-distance and in Soraka's facing direction. No ally is fabricated in a solo duel. A coincident body supplies no direction. The90%bonus remains subject to ordinary movement speed soft caps.");
    kit.assume("Starcall uses primary225+35%AP damage,800range and265center-radius. Its post-cast landing delay interpolates the pinned50-to800range series from0.25to1second. A committed fixed-time projectile projects the unknown sky trajectory onto the declared ground axis for destruction/interception; the binary1100speed and210radius do not replace primary timing/geometry. A real champion contact, including a spell-shielded one, creates at most one1400speed return per star. Parry, untargetability and a destroyed initial projectile grant no return. Returning dust follows Soraka's actual center; interception/destruction denies self Rejuvenation. Already launched stars can finish after death but cannot rejuvenate dead or resurrecting Soraka. Ground sight has no supplied vision radius and is not converted to true sight.");
    kit.assume("Rejuvenation lasts2.5seconds, heals12times at0.2second intervals and uses the retained raw note's approximate four15%,four5.5%andfour4.5%distribution, preserving exactly the primary total120+30%AP; the equal Heal-per-Tick table conflicts with that distribution. Its30%movement bonus decays linearly. Heal amounts snapshot current SorakaAP separately when each recipient buff is granted, while recipient modifiers are read at each pulse; an alternative server AP snapshot moment is unpublished. Actual ally buffs continue after Soraka's death through independent recipient clocks; refresh replaces an older clock. Primary notes allow allied Rejuvenation immediately at champion contact before the return arrives: that early sharing window lasts one sourced buff duration and is refreshed on self receipt, an explicit boundary where the server's separate sharing flag duration is unpublished.");
    kit.assume(`Astral Infusion targets only an actual eligible ally or Champion-class decoy within${wRange}, with the sourced${wForgive}forgiveness retained as evidence rather than extending declaration range. Mana and10%maximumHP are paid once on declaration, the latter reduced100%at maximum W rank while self Rejuvenation has actually arrived; it clamps health at1and accepts a cast at exactly5%HP despite insufficient health for the nominal cost. The ally heal and shared Rejuvenation occur before the0.25second cast lock. Self is never substituted for an absent ally, and all healing modifiers belong to the recipient.`);
    kit.assume("Equinox uses primary925cast range rather than binary875and the retained260center-radius for silence and damage/root checks; primary says the true damage/root radius is slightly smaller but supplies no exact boundary. Initial and1.5second eruption damage/root affect actual enemy Champion-class bodies; continuous non-dispellable silence can affect other real enemy bodies, ignores spell shields and remains subject to true CC immunity/Black Shield/parry. Silence is refreshed for one server tick and expires at the exact zone end, then a separate spell-shieldable eruption resolves. A completed field and eruption persist after caster death. No unsupported smaller damage radius is guessed.");
    kit.assume("Wish heals Soraka and every actual living allied Champion-class body globally on declaration before its0.25second cast, including untargetable allies. Each recipient independently receives the primary350+50%AP or525+75%AP strictly below40%HP, with local healing modifiers and Grievous Wounds preserved; no unsourced wounds cleanse is added. The reported respawn-frame bug and separate realms lack arena lifecycle/frame metadata and remain unsupported. Fight may spend R for a full useful self heal; hold/trade reserve it, completed trades retreat, and flee can Q/E peel without inventing an ally W.");
    kit.assume("Reference allocation includes Q plus both E damage phases, source-total Q self regeneration per hasted Q cooldown and ordinary self Wish healing per hasted R cooldown. It prices no imaginary allied heal, Salvation speed, ally stats or health donation. Actual fights require real hits, a surviving return, missing health, resources and usable recipients.");
    return { abilities, behavior: policy, budget: { damage(self, target) { return { magic: evaluate(eDamage, self, target) * (1 + derive(self).abilityHaste / 100) / eCooldown }; }, healing(self) { const haste = 1 + derive(self).abilityHaste / 100; return evaluate(qHeal, self) * haste / qCooldown + evaluate(rHeal, self) * haste / rCooldown; } }, hooks: {
      onCastStart(ctx) {
        if (ctx.ability.key === "W") {
          const body = chooseAlly(ctx.world, ctx.self, ctx.aim); if (!body) return;
          const reduced = ctx.tick < Number(ctx.memory[`${REGEN}:selfUntil`] ?? 0);
          ctx.self.hp = Math.max(wFloor, ctx.self.hp - derive(ctx.self).maxHp * wHealth * (reduced ? 1 - wReduced : 1));
          heal(ctx.world, body.target, evaluate(wHeal, ctx.self)); sync(body);
          if (ctx.tick < Math.max(Number(ctx.memory[`${REGEN}:selfUntil`] ?? 0), Number(ctx.memory[`${REGEN}:shareUntil`] ?? 0))) grantRegen(ctx, body);
        }
        if (ctx.ability.key === "R") for (const body of [{ target: ctx.self }, ...allyBodies(ctx.world, ctx.self)] as Body[]) { if (!body.target.alive || body.target.hp <= 0 || body.target.resurrection) continue; heal(ctx.world, body.target, evaluate(body.target.hp < rHealth * derive(body.target).maxHp ? rIncreased : rHeal, ctx.self)); sync(body); }
      },
      onZoneCreated(ctx) {
        if (ctx.ability.key !== "Q") return;
        const zone = ctx.zone, duration = Math.max(1, zone.endTick - ctx.tick), distance = Math.abs(zone.x - ctx.self.x);
        zone.onHit = zone.onHit?.map(effect => effect.type === "damage" ? { ...effect, label: `soraka:star:${zone.id}` } : effect);
        if (distance <= EPSILON) return;
        ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Q-flight", seenTick: zone.seenTick, x: ctx.self.x, perTick: distance / duration, homing: false, direction: zone.x > ctx.self.x ? 1 : -1, travelLeft: distance, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
        zone.endTick = Infinity;
      },
      onZoneLand(ctx) {
        if (ctx.zone.ability !== "E") return;
        const x = ctx.zone.x, endTick = ctx.tick + ticks(eDuration);
        ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", seenTick: ctx.tick, x, radius: eRadius, centered: true, startTick: ctx.tick, endTick, ability: "E-silence", interval: 1, nextTick: ctx.tick + 1, onHit: silence });
        ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x, radius: eRadius, centered: true, startTick: ctx.tick, endTick, ability: "E-eruption", onHit: burst, connects: true, scale: 1 });
        if (ctx.enemy.alive && Math.abs(ctx.enemy.x - x) <= eRadius + EPSILON) abilityHit(ctx.world, ctx.self, ctx.enemy, byKey("E-silence"), silence, 1, x);
        for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints && Math.abs(pet.x - x) <= eRadius + EPSILON) abilityHitPet(ctx.world, ctx.self, pet, byKey("E-silence"), silence, "area", 1, x);
      },
      onAbilityContact(ctx) {
        if ((ctx.ability.key === "E" || ctx.ability.key === "E-eruption") && !champion(ctx.enemy)) return [];
        if (ctx.ability.key === "Q" && champion(ctx.enemy) && (!ctx.defense || ctx.defense === "spellShield")) {
          const label = ctx.effects.find(effect => effect.type === "damage")?.label ?? `direct:${ctx.world.nextId++}`;
          returnDust(ctx, ctx.enemy.x, label);
        }
      },
      onMissileTick(ctx) { if (ctx.missile.source === "Q-rejuvenation") updateRegen(ctx, ctx.missile); if (ctx.missile.source === "Q-return" && (!ctx.self.alive || ctx.self.resurrection || ctx.self.deathDefied)) ctx.missile.ended = true; },
      onMissileEnd(ctx) { if (ctx.missile.source === "Q-return" && ctx.reason === "owner" && ctx.self.alive && ctx.self.hp > 0 && !ctx.self.resurrection && !ctx.self.deathDefied) grantRegen(ctx, { target: ctx.self }); },
      onTick(ctx) {
        if (ctx.self.resurrection || ctx.self.deathDefied) {
          ctx.memory[`${REGEN}:selfUntil`] = 0; ctx.memory[`${REGEN}:shareUntil`] = 0;
          delete ctx.memory[`${REGEN}:${ctx.self.side}`];
          ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== `${REGEN}:${ctx.self.side}` && status.memoKey !== SALVATION);
          return;
        }
        const active = allyBodies(ctx.world, ctx.self).some(body => body.target.hp < pHealth * derive(body.target).maxHp && Math.abs(body.target.x - ctx.self.x) <= pRange + EPSILON && (body.target.x - ctx.self.x) * (ctx.self.facing ?? (ctx.self.side === 0 ? 1 : -1)) > EPSILON);
        ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== SALVATION);
        if (active) ctx.self.statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + 1, value: pSpeed, memoKey: SALVATION, ability: "I" });
      },
      onTargetResurrection(ctx) { if (ctx.target === ctx.self) { ctx.memory[`${REGEN}:selfUntil`] = 0; ctx.memory[`${REGEN}:shareUntil`] = 0; delete ctx.memory[`${REGEN}:${ctx.self.side}`]; } },
    } };
  },
};
export default soraka;
