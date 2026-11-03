/** Thresh: actual soul drops, one hooked body, a real lantern and five breakable walls. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, EPSILON } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, World, Zone } from "../../engine/sim/state";
import { ticks } from "./util";

const SOULS = "thresh:souls", CHARGE = "thresh:chargeStart", SHACKLE = "thresh:shackle", LANTERN = "thresh:lantern";
type Body = { unit: Unit; pet?: Pet };
const thresh: KitModule = {
  champion: "Thresh",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const pPath = "Characters/Thresh/Spells/ThreshPassiveSoulsAbility/ThreshPassiveSouls", qPath = "Characters/Thresh/Spells/ThreshQAbility/ThreshQ", qMissile = "Characters/Thresh/Spells/ThreshQAbility/ThreshQMissile", wPath = "Characters/Thresh/Spells/ThreshWAbility/ThreshW", ePath = "Characters/Thresh/Spells/ThreshEAbility/ThreshE", rPath = "Characters/Thresh/Spells/ThreshRPentaAbility/ThreshRPenta";
    const observeRange = p.field("effectRadius"), soulSeconds = p.quoted("drop a Soul for 8 seconds"), statPerSoul = p.quoted("gains 1 ability power"), epicSouls = p.quoted("Epic monsters drop 2 Souls");
    p.quote("armor does not increase through growth"); p.quote("lesser minions and monsters"); p.quote("adjusts dynamically to match the expected quota"); p.quote("Nunu & Willump drop a soul each");
    p.gameQuote('"name":"StatValuePerSoul","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]', pPath);
    p.gameQuote('"name":"SoulsToGainOnPickUp","values":[1.0,1.0,1.0,1.0,1.0,1.0,1.0]', pPath);
    const hookRange = q.fieldNumbers("range"), hookSpeed = q.field("speed", "Missile speed"), hookWidth = q.field("width"), leapSpeed = q.field("speed", "Dash speed");
    const shackleSeconds = q.quoted("mark the target Shackled for 1.5 seconds"), qStun = q.quoted("stun and reveal them for 1.5 seconds"), qAir = q.quoted("airborne for 0.4 seconds"), qRefund = q.quoted("cooldown by 2 seconds"), recastDelay = q.quoted("After 0.5 seconds of hitting an enemy"), tugOne = q.quoted("0.1-second delay"), tugTwo = q.quoted("second tug occurs after 0.7 seconds"), selfSlow = q.quoted("slowed by 20% for 1 second") / 100, selfSlowSeconds = q.quoted("slowed by 20% for 1 second", 1), revealLinger = q.quoted("reveal lingers for 0.05 seconds"), leapRange = q.field("effectRadius"), trackRange = q.quoted("moves beyond 2000 units");
    q.quote("Death Sentence cannot be recast while grounded or rooted"); q.quote("recast even while the target is untargetable"); q.quote("Spell shield will block all of Death Sentence's effects"); q.quote("mark will always persist for 1.5 seconds, unless the target uses a cleansing effect"); q.quote("will not stun enemies that are displacement immune"); q.quote("non-airborne displacement"); q.quote("not be resisted by displacement immunity or crowd control immunity"); q.quote("not be pulled with the tugs if they are too close"); q.quote("This ability will cast from wherever the caster is at the end of the cast time");
    q.quote("turn his facing direction towards the cast direction only after");
    q.gameQuote('"name":"HitBonusCooldown","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]', qPath);
    q.gameQuote('"name":"BaseDamage","values":[50.0,100.0,150.0,200.0,250.0,300.0,350.0]', qPath);
    q.gameQuote('"mMissileWidth":70.0', qMissile); q.gameQuote('"mSpeed":1900.0', qMissile);
    const lanternRange = w.field("targetRange"), shieldRadius = w.field("effectRadius", "Shield granting"), pickupRadius = w.field("effectRadius", "pickup"), lanternLeash = w.field("tetherRadius"), lanternFlight = w.quoted("over 0.5 seconds"), lanternSeconds = w.quoted("lasting for 6 seconds"), shieldSeconds = w.quoted("shield for 4 seconds"), shieldBase = w.baseOf("Shield Strength"), shieldPerSoul = w.quoted("2 per Soul collected");
    w.quote("lantern will not expire from Thresh moving too far away if he is dashing with Deathly Leap"); w.quote("Thresh will gain Dark Passage's shield from moving out of leash range"); w.quote("first ally champion to come in contact with Thresh"); w.quote("untargetable to enemies"); w.quote("lantern blocks pathing");
    w.gameQuote('"name":"BaseShieldValue","values":[30.0,50.0,70.0,90.0,110.0,130.0,150.0]', wPath);
    w.gameQuote('"name":"ShieldPerSoul","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]', wPath);
    w.gameQuote('"mTravelTime":0.5', "Characters/Thresh/Spells/ThreshWAbility/ThreshWLanternOut");
    const chargeSeconds = e.quoted("increasing over 10 seconds"), soulDamage = e.baseOf("Minimum Bonus Magic Damage"), chargedAD = e.formula("Maximum Bonus Magic Damage").ratios?.AD ?? 0, flayDamage = e.formula("Magic Damage"), flaySlow = e.fraction("Slow"), flaySlowSeconds = e.quoted("slowed for 1 second"), flayDistance = e.quoted("knocked 200 units"), flayRanges = e.fieldNumbers("range"), flayRadius = e.field("effectRadius"), flayWidth = e.field("width"), flaySpeed = e.field("speed");
    e.quote("effects start at the start of the cast time"); e.quote("enhanced attack is not consumed and the charge is not reset"); e.quote("enhanced attack is consumed and the charge is reset"); e.quote("bonus damage cannot"); e.quote("will not trigger against"); e.quote("airborne debuff is set to last longer than the forced movement");
    e.gameQuote('"name":"FullChargeDuration","values":[10.0,10.0,10.0,10.0,10.0,10.0,10.0]', ePath);
    e.gameQuote('"name":"DmgPerSoul","values":[1.7000000476837158,1.7000000476837158,1.7000000476837158,1.7000000476837158,1.7000000476837158,1.7000000476837158,1.7000000476837158]', ePath);
    e.gameQuote('"name":"PassiveDmgPerSoul","values":[1.5,1.5,1.5,1.5,1.5,1.5,1.5]', ePath);
    e.gameQuote('"mSpeed":2000.0', "Characters/Thresh/Spells/ThreshEAbility/ThreshEMissile1");
    const wallDamage = r.formula("Magic Damage"), wallSeconds = r.quoted("last for 5 seconds"), firstSlowSeconds = r.quoted("99% for 2 seconds", 1), laterSlowSeconds = r.quoted("slow for only 1 second"), wallSlow = r.quoted("slowing them by 99%") / 100, breakLockSeconds = r.quoted("cannot do so again for 1 second"), wallWidth = r.field("width"), cageRadius = r.quoted("corners of The Box are placed 400 units"), cornerAngle = r.quoted("angle of 72°");
    r.quote("The Box cannot be interrupted by any means, including death or resurrection"); r.quote("corner directly in front"); r.quote("progressing clockwise");
    r.gameQuote('"name":"ThreshRCageRadius","values":[400.0,400.0,400.0,400.0,400.0,400.0,400.0]', rPath);
    r.gameQuote('"name":"WallDuration","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]', rPath);
    r.gameQuote('"name":"ThreshRWallLength","values":[470.2279968261719,470.2279968261719,470.2279968261719,470.2279968261719,470.2279968261719,470.2279968261719,470.2279968261719]', rPath);
    const qDamage = q.formula("Magic Damage"), qCast = q.castTime(), eCast = e.castTime(), rCast = r.castTime();
    const charge = (self: Unit, tick: number) => Math.max(0, Math.min(1, (tick - Number(self.memory[CHARGE] ?? tick)) / ticks(chargeSeconds)));
    const souls = (self: Unit) => Number(self.memory[SOULS] ?? 0);
    const shackleKey = (side: number) => `${SHACKLE}:${side}`;
    const body = (world: World, self: Unit, id: number): Body | undefined => {
      if (id < -1) return undefined;
      if (id === -1) { const unit = world.units[1 - self.side]!; return unit.alive && unit.hp > 0 ? { unit } : undefined; }
      const pet = world.pets.find(pet => pet.id === id && pet.owner !== self.side && pet.hp > 0);
      return pet ? { unit: petFormulaTarget(pet, self, world.tick), pet } : undefined;
    };
    const contacts = (ctx: HookContext): Body[] => [{ unit: ctx.world.units[1 - ctx.self.side]! }, ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map(pet => ({ unit: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const sync = (contact: Body) => { if (contact.pet) { contact.pet.statuses = contact.unit.statuses; contact.pet.memory = contact.unit.memory; } };
    const hit = (ctx: HookContext, contact: Body, ability: AbilitySpec, effects: Effect[], originX: number) => {
      if (contact.pet) abilityHitPet(ctx.world, ctx.self, contact.pet, ability, effects, "area", 1, originX);
      else abilityHit(ctx.world, ctx.self, contact.unit, ability, effects, 1, originX);
    };
    const targetId = (contact: Body) => contact.pet?.id ?? -1;
    const marked = (self: Unit, world: World) => {
      const contact = body(world, self, Number(self.memory[SHACKLE] ?? -2));
      return contact?.unit.statuses.some(status => status.memoKey === shackleKey(self.side) && status.endTick > world.tick) ? contact : undefined;
    };
    const clearLocks = (ctx: HookContext, kind: "flight" | "mark" | "flay") => { ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== `thresh:lock:${kind}`); };
    const lock = (ctx: HookContext, kind: "flight" | "mark" | "flay", movement: boolean, duration: number) => {
      clearLocks(ctx, kind);
      for (const state of movement ? ["noAttacks", "noMovement"] as const : ["noAttacks"] as const) {
        applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state, duration }, { scale: 1 }); ctx.self.statuses.at(-1)!.memoKey = `thresh:lock:${kind}`;
      }
    };
    const finishShackle = (ctx: HookContext) => { clearLocks(ctx, "mark"); delete ctx.memory[SHACKLE]; delete ctx.memory[`${SHACKLE}:hit`]; };
    const hidden = (key: string, name: string): AbilitySpec => ({ key, name, slot: "other", activation: "internal", usable: () => false, cooldown: 0, castTime: 0, budgetExcluded: true, persistsAfterDeath: true, delivery: { kind: "self" }, flags: { petContactHooks: true }, roles: [] });
    const eWave = hidden("Ewave", e.name), rWall = hidden("Rwall", r.name), rTimer = hidden("Rtimer", r.name), rForecast = hidden("Rforecast", r.name);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAtCastStart: true, cost: q.cost(), castTime: qCast, preserveFacing: true, persistsAfterDeath: true, delivery: { kind: "line", range: hookRange[0]!, travelRange: hookRange[0]!, collisionRange: hookRange[1]!, width: hookWidth, radius: hookWidth / 2, speed: hookSpeed, collisionPet: true }, flags: { projectile: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "stun", duration: qStun }, { type: "cc", cc: "airborne", duration: qAir }, { type: "state", state: "revealed", duration: shackleSeconds + revealLinger }], roles: ["damage", "cc", "engage"], usable: self => self.action?.kind !== "dash" },
      { key: "Q2", name: "Deathly Leap", slot: "Q", cooldown: 0, cost: 0, castTime: 0, budgetExcluded: true, delivery: { kind: "self" }, flags: { grounded: true, knockdown: true }, roles: [], usable: (self, world) => {
        const contact = marked(self, world); return Boolean(contact && world.tick >= Number(self.memory[`${SHACKLE}:ready`] ?? Infinity) && self.action?.kind !== "dash" && !world.missiles.some(m => m.owner === self.side && m.source === "Ewave"));
      } },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, overlay: true, roles: ["defense"], usable: self => !self.action || self.action.kind === "windup" || self.action.kind === "dash" && self.action.ability === "Q2" },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: eCast, costAtCastStart: true, cooldownAtCastStart: true, castThreat: false, overlay: true, delivery: { kind: "self" }, flags: { petContactHooks: true, projectile: false }, onHit: [{ type: "damage", damageType: "magic", amount: flayDamage }, { type: "cc", cc: "slow", strength: flaySlow, duration: flaySlowSeconds }], roles: ["damage", "cc"], usable: self => !self.action || self.action.kind === "windup" || self.action.kind === "dash" && self.action.ability === "Q2" },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: rCast, costAtCastStart: true, cooldownAtCastStart: true, castThreat: false, preserveFacing: true, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: wallDamage }], persistsAfterDeath: true, roles: ["damage", "cc"] },
      eWave, rWall, rTimer, rForecast,
    ];
    const get = (key: string) => abilities.find(ability => ability.key === key)!;
    const shield = (ctx: HookContext, contact: Body) => {
      applyEffect(ctx.world, ctx.self, contact.unit, { type: "shield", amount: { base: shieldBase + shieldPerSoul * souls(ctx.self) }, duration: shieldSeconds }, { ability: get("W"), scale: 1 }); sync(contact);
    };
    const updateLantern = (ctx: HookContext, zone: Zone) => {
      const state = zone.memory ??= {};
      if (ctx.tick < zone.startTick) return;
      const leashed = Math.abs(zone.x - ctx.self.x) <= lanternLeash || ctx.self.action?.kind === "dash" && ctx.self.action.ability === "Q2";
      if (!leashed) { zone.x = ctx.self.x; state.returned = true; }
      if (!state.selfShield && (state.returned || Math.abs(ctx.self.x - zone.x) <= shieldRadius)) { shield(ctx, { unit: ctx.self }); state.selfShield = true; }
      if (!state.allyShield) {
        const ally = ctx.world.pets.filter(pet => pet.owner === ctx.self.side && pet.hp > 0 && pet.spec.targetClass === "champion" && !pet.spec.untargetable && Math.abs(pet.x - zone.x) <= shieldRadius).sort((a, b) => a.id - b.id)[0];
        if (ally) { shield(ctx, { unit: petFormulaTarget(ally, ctx.self, ctx.tick), pet: ally }); state.allyShield = ally.id; }
      }
    };
    const addSouls = (ctx: HookContext, count: number) => { ctx.memory[SOULS] = souls(ctx.self) + count; ctx.buff("thresh:soulAP", "AP", statPerSoul * souls(ctx.self), Infinity); ctx.buff("thresh:soulArmor", "armor", statPerSoul * souls(ctx.self), Infinity); };
    const collectSouls = (ctx: HookContext) => {
      for (const zone of ctx.world.zones.filter(zone => zone.owner === ctx.self.side && zone.ability === "soul" && zone.endTick > ctx.tick)) {
        const byBody = Math.abs(zone.x - ctx.self.x) <= ctx.self.spec.base.radius + EPSILON;
        const byLantern = ctx.world.zones.some(lantern => lantern.owner === ctx.self.side && lantern.ability === LANTERN && lantern.kind === "field" && lantern.startTick <= ctx.tick && lantern.endTick > ctx.tick && Math.abs(lantern.x - zone.x) <= EPSILON);
        if (byBody || byLantern) { addSouls(ctx, Number(zone.memory?.count ?? 0)); zone.endTick = ctx.tick; }
      }
    };
    const flayHit = (ctx: HookContext, m: Missile, contact: Body, originX: number) => {
      if (!contact.unit.alive || isUntargetable(contact.unit, ctx.self) || (contact.pet ? m.hitPets?.includes(contact.pet.id) : m.hitTargets?.includes(contact.unit.side))) return;
      if (contact.pet) (m.hitPets ??= []).push(contact.pet.id); else (m.hitTargets ??= []).push(contact.unit.side);
      ctx.memory["thresh:flayDirection"] = m.direction;
      hit(ctx, contact, eWave, get("E").onHit!, originX);
    };
    const distanceToWall = (x: number, ax: number, ay: number, bx: number, by: number) => {
      const dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((x - ax) * dx - ay * dy) / (dx * dx + dy * dy)));
      return { distance: Math.hypot(x - ax - t * dx, ay + t * dy), x: ax + t * dx };
    };
    const wallNear = (zone: Zone, target: Unit) => {
      const facing = Number(zone.memory?.facing ?? 1), order = [0, 4, 3, 2, 1, 0];
      return order.slice(0, -1).some((index, i) => {
        const a = index * cornerAngle * Math.PI / 180, b = order[i + 1]! * cornerAngle * Math.PI / 180;
        return distanceToWall(target.x, zone.x + facing * cageRadius * Math.cos(a), facing * cageRadius * Math.sin(a), zone.x + facing * cageRadius * Math.cos(b), facing * cageRadius * Math.sin(b)).distance <= target.spec.base.radius + wallWidth / 2 + EPSILON;
      });
    };
    const forecastFlay = (ctx: HookContext, missile: Missile) => {
      const target = ctx.world.units[1 - ctx.self.side]!, radius = target.spec.base.radius, gap = missile.direction * (target.x - missile.x);
      if (!target.alive || missile.hitTargets?.includes(target.side) || gap + radius < -EPSILON || gap - radius > missile.travelLeft + EPSILON) delete missile.impactTick;
      else missile.impactTick = ctx.tick + Math.max(0, Math.ceil(Math.max(0, gap - radius) / missile.perTick - EPSILON));
    };
    const updateBox = (ctx: HookContext, zone: Zone) => {
      const state = zone.memory ??= {}, facing = Number(state.facing ?? 1), order = [0, 4, 3, 2, 1, 0];
      const list = contacts(ctx).filter(contact => contact.unit.alive && (contact.pet ? contact.pet.spec.targetClass === "champion" : true) && !isUntargetable(contact.unit, ctx.self));
      for (let i = 0; i < order.length - 1; i++) {
        if (state[`broken:${i}`]) continue;
        const a = order[i]! * cornerAngle * Math.PI / 180, b = order[i + 1]! * cornerAngle * Math.PI / 180;
        const ax = zone.x + facing * cageRadius * Math.cos(a), ay = facing * cageRadius * Math.sin(a), bx = zone.x + facing * cageRadius * Math.cos(b), by = facing * cageRadius * Math.sin(b);
        for (const contact of list) {
          const key = String(targetId(contact)), unit = contact.unit;
          if (ctx.tick < Number(state[`lock:${key}`] ?? -1)) continue;
          const previous = Number(state[`last:${key}`] ?? unit.x), samples = [unit.x];
          if (unit.action?.kind === "dash" || unit.forced) {
            const lo = Math.min(previous, unit.x), hi = Math.max(previous, unit.x), clamp = (x: number) => Math.max(lo, Math.min(hi, x));
            samples.push(previous, clamp(ax), clamp(bx));
            if (ay * by <= 0 && Math.abs(by - ay) > EPSILON) samples.push(clamp(ax - (bx - ax) * ay / (by - ay)));
          }
          let actual = distanceToWall(samples[0]!, ax, ay, bx, by);
          for (const x of samples.slice(1)) { const sample = distanceToWall(x, ax, ay, bx, by); if (sample.distance < actual.distance) actual = sample; }
          if (actual.distance > unit.spec.base.radius + wallWidth / 2 + EPSILON) continue;
          state[`broken:${i}`] = true; state[`lock:${key}`] = ctx.tick + ticks(breakLockSeconds);
          const first = !state.first; state.first = true;
          hit(ctx, contact, rWall, [...(first ? [{ type: "damage" as const, damageType: "magic" as const, amount: wallDamage }] : []), { type: "cc", cc: "slow", strength: wallSlow, duration: first ? firstSlowSeconds : laterSlowSeconds }], actual.x);
          break;
        }
      }
      for (const contact of list) state[`last:${targetId(contact)}`] = contact.unit.x;
    };
    const behavior: Behavior = view => {
      const ordinary = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return ordinary;
      if (view.mode === "flee") {
        if (canCast(view.world, view.self, get("W"))) return { kind: "cast", ability: "W", aim: { direction: -1, distance: 0 } };
        if (!view.self.action && view.distance <= flayRadius && canCast(view.world, view.self, get("E"))) return { kind: "cast", ability: "E" };
        return ordinary?.kind === "cast" ? { kind: "move", direction: -1 } : ordinary;
      }
      if (view.mode === "fight" || view.mode === "trade") {
        if (canCast(view.world, view.self, get("Q2")) && view.distance > view.self.spec.attack.range) return { kind: "cast", ability: "Q2" };
        if (!view.self.action && canCast(view.world, view.self, get("E")) && view.distance <= flayRanges[1]! + view.enemy.spec.base.radius) return { kind: "cast", ability: "E", aim: { direction: -1 } };
        if (!view.self.action && canCast(view.world, view.self, get("R")) && Math.abs(view.distance - cageRadius) <= view.enemy.spec.base.radius + wallWidth / 2) return { kind: "cast", ability: "R" };
      }
      if (ordinary?.kind === "cast" && ordinary.ability === "W") return { kind: "cast", ability: "W", aim: { direction: 1, distance: 0 } };
      if (ordinary?.kind === "cast" && ordinary.ability === "R") return view.mode === "hold" ? { kind: "move", direction: 0 } : view.distance <= view.self.spec.attack.range ? { kind: "attack" } : { kind: "move", direction: 1 };
      return ordinary;
    };
    kit.assume("Damnation starts with zero souls and no invented pre-duel farming. Actual hostile champion deaths (two for Nunu & Willump), explicitly large minions/monsters and epic monsters produce the pinned drops within 1900. Explicit smaller minions/monsters use one-third expected soul quantity; the unpublished dynamic quota history is not invented. Unclassified summons and champion-class clones are not silently promoted to eligible farm or champion deaths. Drops expire after 8 seconds. With no pinned pickup radius, collection is restricted to confirmed gameplay-body overlap or exact overlap with a placed lantern; unsupported near-pickup distances are omitted.");
    kit.assume("Flay's passive starts at zero elapsed charge. Its known 0-to-210% AD endpoints over 10 seconds are linearly interpolated as an explicit charge-curve approximation; souls add the primary 1.7 each rather than the unused 1.5 binary field. Connected blocked attacks reset charge, dodge/parry preserve it; the primary leaves blind/reset unresolved, so failed blinded attacks conservatively preserve charge. The bonus is noncritical proc magic, separate from the ordinary critical physical attack, and triggers on actual health-based pets. No structure or ward body is fabricated.");
    kit.assume("Death Sentence uses the first actual body on its 1100 finite 1900 speed flight with 1040 center collision reach, a full 1.5-second mark separate from tenacity-shortened stun, guarded initial 0.4-second airborne and 2-second actual-hit cooldown refund. The recast is immediate for explicit minion/monster bodies and delayed 0.5 seconds otherwise, accepts untargetable marked bodies, and still respects Thresh's root/ground. Q's two 0.1/.7-second guarded tug clocks are retained, but no pull distance/speed is published; their longitudinal displacement is omitted. Deathly Leap tracks actual targets at the primary estimated 1400 speed, freezes the last location across a 2000 jump and fails beyond the estimated 3000-cast distance. Q preserves axial facing until launch; the intermediate 90-degree animation is not representable on the signed duel axis. These source estimates and omitted tugs are limits, not exact server motion.");
    kit.assume("Dark Passage has a real 0.5-second projectile flight and six-second placed lantern. Thresh and at most one actual allied champion-class body receive one four-second shield on sourced 350-radius entry. Moving beyond 1500 leash returns the lantern and grants Thresh's unclaimed shield, except during Deathly Leap. The source does not supply lantern unit health/pathing radius or allied dash speed, and the duel has no ally-click command; no artificial targetable lantern body, collision radius or automatic ally pickup dash is invented. The sourced 150 pickup radius is retained as evidence only. Ordinary budget values only Thresh's own shield, without a free ally or souls.");
    kit.assume("Flay launches its nonprojectile chain at cast start from 550 behind to 525 ahead at 2000 speed, retaining the primary estimated 270 central area and actual first contacts once. W/E overlays are allowed during Deathly Leap. Its sourced 200 knock distance follows the selected cast axis, including a backward pull; no forced-movement duration is published. The model resolves that terrain-clipped move in one 30 Hz step with only the minimum one-tick airborne interruption, then the independent one-second slow. The 220 width is transverse, not extra longitudinal reach; the final step is clamped to the exact 525 front endpoint. A finite actual carrier forecasts only uncontacted in-range bodies; no second pending-cast damage announcement is added. It does not reuse the parser's erroneous one-second airborne duration. The chain retains attack/movement locks until it completes even after the 0.3889-cast permits other spells.");
    kit.assume("The Box freezes cast-start position and facing, completes despite death/resurrection, and persists the primary five seconds rather than the binary's conflicting four. Five walls form the actual regular pentagon with 400 corner radius and 30 width; only actual champion bodies/explicit champion-class clones can break them, including spellshielded contact. Clockwise wall order decides the only damage/long slow packet; later walls only slow one second and each body has a one-second break lock. A champion inside the cage is not automatically damaged. A separate formation carrier forecasts one actual current wall contact, updating as the body moves, with no duplicate unavoidable pending-cast packet. Swept dash/forced paths and endpoint ordinary movement are tested on the duel axis; lateral champion movement and teleport-wall contacts are unavailable. Reference R damage assumes one genuine wall contact and values no extra wall or clone damage.");
    void pickupRadius;
    return {
      abilities, behavior, attack: { projectile: false, onHitToPets: true, blockStopsOnHit: true },
      budget: {
        healing: () => shieldBase / get("W").cooldown,
        damage(self) { const d = derive(self), perAttack = chargedAD * d.ad * Math.min(1, 1 / Math.max(EPSILON, d.attackSpeed * chargeSeconds)); return { magic: perAttack * d.attackSpeed }; },
      },
      hooks: {
        onStart(ctx) { ctx.memory[SOULS] = 0; ctx.memory[CHARGE] = ctx.tick; },
        onAttackBeforeDamage(ctx) {
          const fraction = charge(ctx.self, ctx.tick), amount = soulDamage * souls(ctx.self) + chargedAD * derive(ctx.self).ad * fraction;
          ctx.memory[CHARGE] = ctx.tick;
          if (!ctx.blocked && !ctx.pet?.spec.hitPoints) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: { base: amount }, noLifeSteal: true }, { scale: ctx.scale });
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q" && hasState(ctx.enemy, "displacementImmune")) return ctx.effects.filter(effect => effect.type !== "cc" || effect.cc !== "stun" && effect.cc !== "airborne");
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") ctx.self.cooldownReady.Q = Math.max(ctx.tick, (ctx.self.cooldownReady.Q ?? ctx.tick) - ticks(qRefund));
          if (ctx.ability.key === "Q" && ctx.enemy.alive && ctx.enemy.hp > 0) {
            const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find(pet => pet.id === ctx.enemy.petId);
            const id = pet?.id ?? -1;
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "lingering", duration: shackleSeconds, cleanseWithCC: true }, { ability: get("Q"), scale: 1 });
            const state = ctx.enemy.statuses.at(-1)!; state.memoKey = shackleKey(ctx.self.side);
            if (pet) pet.statuses = ctx.enemy.statuses;
            delete ctx.memory[`${SHACKLE}:leaping`]; ctx.memory[SHACKLE] = id; ctx.memory[`${SHACKLE}:hit`] = ctx.tick; ctx.memory[`${SHACKLE}:ready`] = ctx.tick + (pet && ["minion", "monster"].includes(pet.spec.targetClass ?? "") ? 0 : ticks(recastDelay));
            ctx.memory[`${SHACKLE}:x`] = ctx.enemy.x; ctx.memory[`${SHACKLE}:tug1`] = false; ctx.memory[`${SHACKLE}:tug2`] = false;
            lock(ctx, "mark", false, shackleSeconds); applyEffect(ctx.world, ctx.self, ctx.self, { type: "cc", cc: "slow", strength: selfSlow, duration: selfSlowSeconds }, { ability: get("Q"), scale: 1 });
          }
          if (ctx.ability.key === "Ewave") {
            const direction = Number(ctx.memory["thresh:flayDirection"] ?? 1);
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "displace", direction: "away", distance: flayDistance, duration: 1 / 30, originX: ctx.enemy.x - direction, stopAtWall: true, ignoreUnitCollision: true }, { ability: eWave, scale: 1 });
          }
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "E") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1, travel = flayRanges[1]! - flayRanges[0]!;
            const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Ewave", seenTick: ctx.tick, x: ctx.self.x + direction * flayRanges[0]!, perTick: flaySpeed / 30, homing: false, direction, travelLeft: travel, expiresTick: ctx.tick + ticks(travel / flaySpeed) + 1, projectile: false, connects: false, scale: 1, onHit: [...get("E").onHit!, { type: "cc", cc: "airborne", duration: 1 / 30 }], radius: flayWidth / 2, hitTargets: [], hitPets: [] };
            ctx.world.missiles.push(m); lock(ctx, "flay", true, travel / flaySpeed);
            for (const contact of contacts(ctx)) if (Math.abs(contact.unit.x - ctx.self.x) <= flayRadius + contact.unit.spec.base.radius) flayHit(ctx, m, contact, ctx.self.x);
            forecastFlay(ctx, m);
          }
          if (ctx.ability.key === "R") {
            const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, ability: "R", kind: "delayedArea", x: ctx.self.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(rCast), connects: false, onHit: get("R").onHit!, memory: { facing: ctx.self.facing ?? directionTo(ctx.self, ctx.enemy) } };
            ctx.world.zones.push(zone);
            const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Rforecast", seenTick: ctx.tick, x: zone.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, expiresTick: zone.endTick, projectile: false, connects: false, scale: 1, onHit: [...get("R").onHit!, { type: "cc", cc: "slow", strength: wallSlow, duration: firstSlowSeconds }] };
            if (wallNear(zone, ctx.enemy)) m.impactTick = zone.endTick;
            ctx.world.missiles.push(m); ctx.memory[`thresh:rZone:${m.id}`] = zone.id;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.self.facing = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1; lock(ctx, "flight", true, hookRange[0]! / hookSpeed + 1 / 30); }
          if (ctx.ability.key === "Q2") {
            const contact = marked(ctx.self, ctx.world); if (!contact) return;
            const distance = Math.abs(contact.unit.x - ctx.self.x);
            ctx.memory[`${SHACKLE}:leaping`] = true;
            if (distance > leapRange) { finishShackle(ctx); return; }
            ctx.memory["thresh:leapTarget"] = targetId(contact); ctx.memory["thresh:leapDestination"] = distance > trackRange ? Number(ctx.memory[`${SHACKLE}:x`] ?? contact.unit.x) : contact.unit.x;
            ctx.memory["thresh:leapLast"] = contact.unit.x; ctx.memory["thresh:leapFrozen"] = distance > trackRange;
            ctx.self.action = { kind: "dash", ability: "Q2", startTick: ctx.tick, endTick: ctx.tick + Math.max(1, Math.ceil(distance / (leapSpeed / 30))), perTick: directionTo(ctx.self, contact.unit) * leapSpeed / 30, stopAtContact: false, unstoppable: false, crossTerrain: true };
          }
          if (ctx.ability.key === "W") {
            ctx.world.zones = ctx.world.zones.filter(zone => zone.owner !== ctx.self.side || zone.ability !== LANTERN);
            const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * Math.min(lanternRange, Math.max(0, ctx.aim?.distance ?? 0));
            const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, ability: LANTERN, kind: "delayedArea", x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick + ticks(lanternFlight), endTick: Infinity, connects: false, onHit: [], memory: {} };
            ctx.world.zones.push(zone);
            const distance = Math.abs(x - ctx.self.x);
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "W", seenTick: ctx.tick, x: ctx.self.x, perTick: distance / ticks(lanternFlight), homing: false, direction: x >= ctx.self.x ? 1 : -1, travelLeft: distance, projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: distance <= EPSILON ? ticks(lanternFlight) : 0 } });
          }

        },
        onMissileTick(ctx) {
          if (ctx.missile.source === "Ewave") { forecastFlay(ctx, ctx.missile); return; }
          if (ctx.missile.source === "Rforecast") {
            const zone = ctx.world.zones.find(zone => zone.id === Number(ctx.memory[`thresh:rZone:${ctx.missile.id}`]));
            if (zone && wallNear(zone, ctx.enemy)) ctx.missile.impactTick = zone.endTick; else delete ctx.missile.impactTick;
            return;
          }
          if (ctx.missile.source !== "Rtimer") return;
          const zone = ctx.world.zones.find(zone => zone.id === Number(ctx.memory[`thresh:rZone:${ctx.missile.id}`]));
          if (!zone || zone.endTick <= ctx.tick) { ctx.missile.ended = true; return; }
          updateBox(ctx, zone);
        },
        onMissileMove(ctx) {
          if (ctx.missile.source !== "Ewave") return;
          const from = Math.min(ctx.from, ctx.to), to = Math.max(ctx.from, ctx.to);
          for (const contact of contacts(ctx).sort((a, b) => ctx.missile.direction * (a.unit.x - b.unit.x))) if (contact.unit.x + contact.unit.spec.base.radius >= from - EPSILON && contact.unit.x - contact.unit.spec.base.radius <= to + EPSILON) flayHit(ctx, ctx.missile, contact, ctx.from);
          forecastFlay(ctx, ctx.missile);
        },
        onMissileEnd(ctx) { if (ctx.missile.source === "Q") clearLocks(ctx, "flight"); if (ctx.missile.source === "Ewave") clearLocks(ctx, "flay"); },
        onDashTick(ctx) {
          if (ctx.ability.key !== "Q2") return;
          const contact = body(ctx.world, ctx.self, Number(ctx.memory["thresh:leapTarget"] ?? -2)), last = Number(ctx.memory["thresh:leapLast"] ?? ctx.memory["thresh:leapDestination"] ?? ctx.self.x);
          if (contact && !ctx.memory["thresh:leapFrozen"] && Math.abs(contact.unit.x - last) <= trackRange && Math.abs(contact.unit.x - ctx.self.x) <= trackRange) ctx.memory["thresh:leapDestination"] = contact.unit.x;
          else if (contact && Math.abs(contact.unit.x - last) > trackRange) ctx.memory["thresh:leapFrozen"] = true;
          if (contact) ctx.memory["thresh:leapLast"] = contact.unit.x;
          const destination = Number(ctx.memory["thresh:leapDestination"] ?? ctx.self.x), direction = destination >= ctx.self.x ? 1 : -1, gap = Math.max(0, Math.abs(destination - ctx.self.x) - ctx.self.spec.base.pathingRadius - (contact?.unit.spec.base.pathingRadius ?? 0));
          ctx.action.perTick = direction * Math.min(leapSpeed / 30, gap); ctx.action.endTick = gap <= leapSpeed / 30 + EPSILON ? ctx.tick : ctx.tick + Math.ceil(gap / (leapSpeed / 30));
        },
        onDashEnd(ctx) { if (ctx.ability.key === "Q2") { finishShackle(ctx); delete ctx.memory[`${SHACKLE}:leaping`]; } },
        onZoneLand(ctx) {
          if (ctx.zone.ability === LANTERN) { ctx.zone.kind = "field"; ctx.zone.startTick = ctx.tick; ctx.zone.endTick = ctx.tick + ticks(lanternSeconds); ctx.zone.interval = 1; ctx.zone.nextTick = ctx.tick; updateLantern(ctx, ctx.zone); }
          if (ctx.zone.ability === "R") { ctx.zone.kind = "field"; ctx.zone.ability = "Rwall"; ctx.zone.onHit = []; ctx.zone.startTick = ctx.tick; ctx.zone.endTick = ctx.tick + ticks(wallSeconds); ctx.zone.interval = 1; ctx.zone.nextTick = ctx.tick; updateBox(ctx, ctx.zone); ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rtimer", seenTick: ctx.tick, x: ctx.zone.x, perTick: 0, homing: false, direction: 1, travelLeft: Infinity, projectile: false, connects: false, scale: 1, onHit: [], expiresTick: ctx.zone.endTick + 1 }); ctx.memory[`thresh:rZone:${ctx.world.missiles.at(-1)!.id}`] = ctx.zone.id; }
        },
        onTick(ctx) {
          if (ctx.self.resurrection) { finishShackle(ctx); clearLocks(ctx, "flight"); clearLocks(ctx, "flay"); }
          for (const zone of ctx.world.zones.filter(zone => zone.owner === ctx.self.side && zone.kind === "field" && zone.endTick > ctx.tick)) {
            if (zone.ability === LANTERN) updateLantern(ctx, zone);
            
          }
          collectSouls(ctx);
          const contact = marked(ctx.self, ctx.world);
          if (!contact) { if (!ctx.memory[`${SHACKLE}:leaping`]) finishShackle(ctx); return; }
          ctx.memory[`${SHACKLE}:x`] = contact.unit.x;
          const elapsed = ctx.tick - Number(ctx.memory[`${SHACKLE}:hit`] ?? ctx.tick);
          if (!ctx.memory[`${SHACKLE}:leaping`] && contact.unit.statuses.some(status => status.kind === "cc" && status.key === "stun" && status.source === ctx.self.side && status.ability === "Q")) {
            if (elapsed >= ticks(tugOne)) ctx.memory[`${SHACKLE}:tug1`] = true;
            if (elapsed >= ticks(tugTwo)) ctx.memory[`${SHACKLE}:tug2`] = true;
          }
        },
        onDeathObserved(ctx) {
          const victim = ctx.victim, pet = ctx.targetPet;
          if ((pet ? pet.owner : (victim as Unit).side) === ctx.self.side || Math.abs(victim.x - ctx.self.x) > observeRange) return;
          let count = 0;
          if (!pet) count = (victim as Unit).spec.id === "Nunu" ? epicSouls : statPerSoul;
          else if (pet.spec.targetClass === "monster" && pet.spec.epicMonster) count = epicSouls;
          else if (["minion", "monster"].includes(pet.spec.targetClass ?? "") && pet.spec.sizeClass) count = pet.spec.sizeClass === "large" ? statPerSoul : statPerSoul / 3;
          if (!(count > 0)) return;
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, ability: "soul", kind: "delayedArea", x: victim.x, radius: 0, seenTick: ctx.tick, startTick: ctx.tick, endTick: ctx.tick + ticks(soulSeconds), connects: false, onHit: [], memory: { count } }); collectSouls(ctx);
        },
        onLethal(ctx) { finishShackle(ctx); clearLocks(ctx, "flight"); clearLocks(ctx, "flay"); return false; },
      },
    };
  },
};
export default thresh;
