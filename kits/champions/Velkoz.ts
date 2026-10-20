/** Vel'Koz, compiled only from the pinned 16.20 records. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { areaOnPets, damagePet, petEffects } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, Zone } from "../../engine/sim/state";
import { seriesAt, ticks } from "./util";

const STACK = "velkoz:deconstruction", RESEARCH = "velkoz:research", SLOW = "velkoz:qSlow";
const velkoz: KitModule = {
  champion: "Velkoz",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const stackSeconds = p.quoted("for 7 seconds");
    const stackMaximum = p.quoted("stacking up to 3 times");
    const proc: Formula = { base: p.levelValue("bonus true damage"), ratios: { AP: p.quoted("(+ 60% AP)") / 100 } };
    p.quote("The stack duration will not be refreshed if the attack misses due to blind");
    const researchSeconds = r.quoted("Researched for 7 seconds");
    r.quote("refreshing on basic attacks and ability hits against them");
    const qDamage = q.formula("Magic Damage"), qSlow = q.quoted("slows them by 70%") / 100, qSlowSeconds = q.number("Slow Duration");
    const qRange = q.field("range", "Primary"), qWidth = q.field("width", "Primary"), qSpeed = q.field("speed", "Primary");
    q.field("range", "Split"); q.field("width", "Split"); q.field("speed", "Split");
    q.quote("perpendicularly in opposite directions"); q.quote("An enemy cannot be hit by multiple bolts even when having blocked one with a spell shield");
    q.quote("Plasma Fission's damage applies before Organic Deconstruction");
    const qRefund = q.number("Mana Restored per Kill"), qRefundMaximum = q.number("Maximum Mana Restored");
    const ripple = w.formula("Magic Damage"), collapse = w.formula("Magic Damage", 1);
    w.formula("Total Magic Damage");
    const wOpen = w.quoted("after a 0.25-second delay"), wCollapse = w.quoted("After 0.75 seconds");
    const wRange = w.field("range", "Ripple"), wBack = w.field("range", "backwards"), wWidth = w.field("width", "Ripple"), wSpeed = w.field("speed");
    w.field("range", "collapse distance"); w.field("width", "collapse width");
    const wCharges = w.quoted("up to a maximum of 2"), wRecharge = w.field("recharge"), wLock = w.field("staticCooldown");
    w.quote("they will not destroy the section that was created already"); w.quote("Spell shield only blocks one instance of damage");
    const eDamage = e.formula("Magic Damage"), eRange = e.field("targetRange"), eRadius = e.field("effectRadius");
    const eDelay = e.seriesIn("after"), eAir = e.quoted("stunning them for 0.75 seconds");
    e.quote("Displacement immunity will also resist the application of the stun");
    e.gameQuoted("mSpell.DataValues.MoveDistance.values: [225,225,225,225,225,225,225]");
    e.quote("This ability will cast from wherever the caster is at the start of the cast time");
    const rDelay = r.quoted("After a 0.2-second delay"), rDuration = r.quoted("for up to 2.6 seconds");
    const rInterval = r.quoted("every 0.2 seconds"), rStacks = r.quoted("every 0.7 seconds"), rRecast = r.quoted("after 1 second");
    const rSlow = r.quoted("slows them by 20%") / 100, rSlowSeconds = r.quoted("lingering for 1 second"), rCooldown = r.cooldown();
    const rayTick = r.formula("Damage Per Tick"), rayTotal = r.formula("Maximum Damage"), rRange = r.field("range"), rWidth = r.field("width");
    r.quote("The beam hits in a rectangular shape, intersecting with the edge of an enemy gameplay radius");
    r.quote("Life Form Disintegration Ray's direction updates gradually");
    kit.assume("Plasma Fission models its primary bolt and its first enemy collision only. Its perpendicular split/recast is excluded from this one-axis duel; it never creates invented forward split bolts or a second hit on a shielded rival.");
    kit.assume("Deconstruction and Researched start empty and expire at their exact seven-second boundary. Connected unblocked basic attacks refresh existing marks; parried, dodged and blocked attacks do not refresh them, since the pinned interaction note is unresolved. The separately guarded passive proc follows its spell-shield flag, with ordinary spell parry semantics.");
    kit.assume("Void Rift's collapse occurs 0.75 seconds after its 0.25-second opening delay, at cast +1 second. Its formed prefix grows at the pinned 1700 speed and retains the 95-unit rear section; projectile-wall stopping is quantized to the collision tick. The pinned text does not identify the collapse delay's reference.");
    kit.assume("Tectonic Disruption's sampled distance delay is interpolated linearly and begins after its cast time; origin and target location are captured at cast declaration. Version-pinned game data supplies MoveDistance 225, but its close-range directional knockback is omitted because the qualifying proximity threshold and forced-movement speed remain unpinned. Displacement immunity suppresses both stun and airborne, while preserving damage and Deconstruction.");
    kit.assume("Life Form Disintegration Ray retains its declaration direction on the duel axis; transverse steering and the unsourced angular speed are excluded. The beam starts after 0.2 seconds and its thirteen pulses land at cast +0.4 through +2.8 seconds. The independent Deconstruction clock starts at beam opening and fires at +0.9,+1.6,+2.3 seconds; simultaneous clocks resolve Deconstruction before damage. Beam packets use ordinary spell shields/parry because the pinned R record lacks the interaction table.");
    kit.assume("Void Rift, Tectonic Disruption and the ray use actual one-axis ground/rectangle overlap rather than fabricated lateral projectile outcomes. Enemy normal-HP pets receive spatial spell damage and separate Deconstruction but never champion research; hit-count and untargetable pets retain their existing exclusions. Basic attacks on pets do not refresh their Deconstruction under the current attack-pet hook API.");
    kit.assume("The stat budget uses one full nominal W collapse, one Q and E per cooldown, and an initially researched full ray for its true-damage reference. Passive procs are estimated from qualifying Q/W/E contacts and the independent three ray stack events; this reference omits misses, mana clipping, opening stored W charges and evolving research.");

    const hidden = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: effects, usable: () => false, activation: "internal", flags: { spellShield: shield }, roles: [] });
    const procAbility = hidden("deconstruction", p.name, [{ type: "damage", damageType: "true", amount: proc }]);
    const collapseAbility = hidden("riftCollapse", `${w.name}: collapse`, [{ type: "damage", damageType: "magic", amount: collapse }]);
    const rayMagic = { ...hidden("rayMagic", r.name, [{ type: "damage", damageType: "magic", amount: rayTick }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowSeconds }]), delivery: { kind: "area", near: 0, far: rRange, delay: 0, anchor: "ground" } } satisfies AbilitySpec;
    const rayTrue = { ...hidden("rayTrue", r.name, [{ type: "damage", damageType: "true", amount: rayTick }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowSeconds }]), delivery: { kind: "area", near: 0, far: rRange, delay: 0, anchor: "ground" } } satisfies AbilitySpec;
    const stackAbility = hidden("rayStack", `${r.name}: Deconstruction`, [{ type: "mark", key: STACK, duration: stackSeconds }]);
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAtCastStart: true, cost: q.cost(), castTime: q.castTime(), delivery: { kind: "line", range: qRange, width: qWidth, radius: qWidth / 2, speed: qSpeed, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "slow", strength: qSlow, duration: qSlowSeconds }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, roles: ["damage", "cc"], decisive: true },
      { key: "W", name: w.name, slot: "W", cooldown: wLock, staticCooldown: true, charges: { max: wCharges, recharge: wRecharge }, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "line", range: wRange, width: wWidth, speed: wSpeed, piercing: true, collisionPet: true, radius: wWidth / 2 }, onHit: [{ type: "damage", damageType: "magic", amount: ripple }], flags: { projectile: true, spellShield: true }, roles: ["damage"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castOrigin: "start", delivery: { kind: "circle", range: eRange, radius: eRadius, delay: seriesAt(eDelay, eRange, true) }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }, { type: "displace", direction: "away", distance: 0, duration: eAir }, { type: "cc", cc: "stun", duration: eAir }], flags: { projectile: true, spellShield: e.flag("spellShield") }, roles: ["damage", "cc"], decisive: true },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), cooldownAfter: "channel", delivery: { kind: "area", near: 0, far: rRange, delay: 0, anchor: "ground" }, channel: { duration: rDelay + rDuration, manualStart: true, interruptible: true }, estimate: (self, target) => evaluate(rayTotal, self, target), roles: ["damage", "cc"] },
      { key: "Rend", name: `${r.name}: end`, slot: "other", cooldown: 0, cost: 0, castTime: 0, delivery: { kind: "self" }, activation: "internal", allowedDuringChannel: ["R"], chain: { root: "R", index: 2, delay: rDelay + rRecast, window: rDelay + rDuration }, usable: (self) => self.action?.kind === "channel" && self.action.ability === "R", roles: [] },
      procAbility, collapseAbility, rayMagic, rayTrue, stackAbility,
    ];
    const qAbility = abilities[0]!, wAbility = abilities[1]!, eAbility = abilities[2]!;
    const isResearched = (self: Unit, tick: number) => tick < Number(self.memory[`${RESEARCH}:until`] ?? -1);
    const refresh = (ctx: HookContext) => {
      if (ctx.tick < Number(ctx.memory[`${STACK}:until`] ?? -1)) ctx.memory[`${STACK}:until`] = ctx.tick + ticks(stackSeconds);
      if (isResearched(ctx.self, ctx.tick)) ctx.memory[`${RESEARCH}:until`] = ctx.tick + ticks(researchSeconds);
    };
    const addStack = (ctx: HookContext) => {
      refresh(ctx);
      const prior = ctx.tick < Number(ctx.memory[`${STACK}:until`] ?? -1) ? Number(ctx.memory[STACK] ?? 0) : 0;
      const next = prior + 1;
      ctx.memory[STACK] = next >= stackMaximum ? 0 : next;
      ctx.memory[`${STACK}:until`] = ctx.tick + ticks(stackSeconds);
      if (next >= stackMaximum) {
        ctx.memory[`${RESEARCH}:until`] = ctx.tick + ticks(researchSeconds);
        abilityHit(ctx.world, ctx.self, ctx.enemy, procAbility, procAbility.onHit!);
      }
    };
    const petStack = (ctx: HookContext, pet: Pet) => {
      if (!ctx.world.pets.includes(pet) || pet.spec.hitPoints || pet.spec.untargetable) return;
      const next = (ctx.tick < Number(pet.memory[`${STACK}:${ctx.self.side}:until`] ?? -1) ? Number(pet.memory[`${STACK}:${ctx.self.side}`] ?? 0) : 0) + 1;
      pet.memory[`${STACK}:${ctx.self.side}`] = next >= stackMaximum ? 0 : next;
      pet.memory[`${STACK}:${ctx.self.side}:until`] = ctx.tick + ticks(stackSeconds);
      if (next >= stackMaximum) damagePet(ctx.world, ctx.self, pet, evaluate(proc, ctx.self, petFormulaTarget(pet, ctx.self)), "true", false, procAbility.key, "proc");
    };
    const groundPets = (ctx: HookContext, zone: Zone, stack = true) => {
      const inside = ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && !pet.spec.hitPoints && !pet.spec.untargetable && Math.abs(pet.x - zone.x) <= zone.radius + pet.spec.radius);
      const effects = zone.ability === "E" ? (zone.onHit ?? []).map((effect): Effect => effect.type === "displace" ? { type: "cc", cc: "airborne", duration: eAir } : effect) : zone.onHit ?? [];
      areaOnPets(ctx.world, ctx.self, zone.x - zone.radius, zone.x + zone.radius, effects);
      if (stack) for (const pet of inside) petStack(ctx, pet);
      zone.noPets = true;
    };
    const updatePrefix = (ctx: HookContext, missile: Missile) => {
      const zone = ctx.world.zones.find((candidate) => candidate.id === Number(ctx.memory[`riftZone:${missile.id}`]));
      if (!zone) return;
      const origin = Number(ctx.memory[`riftOrigin:${missile.id}`]);
      const back = origin - missile.direction * wBack;
      zone.x = (back + missile.x) / 2; zone.radius = Math.abs(missile.x - back) / 2;
    };
    const captureLocation = (ctx: HookContext & { aim?: Aim }, key: string, range: number) => {
      const direction = ctx.enemy.x >= ctx.self.x ? 1 : -1;
      const distance = Math.min(range, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
      ctx.memory[`location:${key}`] = ctx.self.x + direction * (ctx.aim?.direction ?? 1) * distance;
      ctx.memory[`distance:${key}`] = distance;
      ctx.memory[`declared:${key}`] = ctx.tick;
    };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      // Default behavior owns trade/hold/flee decisions. Recasts never manufacture a new
      // cast while it has chosen to retreat or remain busy.
      if (view.self.action?.kind === "channel" && view.self.action.ability === "R" && (view.mode === "flee" || view.self.memory.tradeDone)) {
        const end = abilities.find((ability) => ability.key === "Rend")!;
        if (canCast(view.world, view.self, end)) return { kind: "cast", ability: "Rend" };
      }
      return command;
    };
    return {
      abilities, behavior, attack: { projectile: false, missileSpeed: 0 },
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "E") captureLocation(ctx, "E", eRange);
          if (ctx.ability.key === "R") { ctx.memory.rayDirection = ctx.enemy.x >= ctx.self.x ? 1 : -1; ctx.memory.rayStart = ctx.tick; }
          if (ctx.ability.key === "Q") { ctx.memory.qCast = Number(ctx.memory.qCast ?? 0) + 1; ctx.memory.qRefunded = 0; }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") ctx.memory.wOpening = ctx.tick;
          if (ctx.ability.key === "R") {
            ctx.self.action = { kind: "channel", ability: "R", startTick: ctx.tick, endTick: ctx.tick + ticks(rDelay + rDuration), nextTick: Number.POSITIVE_INFINITY, intervalTicks: 1 };
            ctx.memory.rayStackNext = ctx.tick + ticks(rDelay + rStacks);
            ctx.memory.rayPulses = 0;
            const direction = Number(ctx.memory.rayDirection ?? 1);
            for (let pulse = 1; pulse <= Math.round(rDuration / rInterval); pulse += 1) {
              ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: ctx.tick, x: ctx.self.x + direction * rRange / 2, radius: rRange / 2, startTick: ctx.tick, endTick: ctx.tick + ticks(rDelay + pulse * rInterval), ability: rayMagic.key, onHit: rayMagic.onHit, scale: 1, connects: true, noPets: true, memory: { rayPulse: true, channelStart: ctx.tick } });
            }
          }
        },
        onTick(ctx) {
          ctx.enemy.statuses = ctx.enemy.statuses.map((status) => status.memoKey === SLOW ? { ...status, value: qSlow * Math.max(0, (status.endTick - ctx.tick) / Math.max(1, status.endTick - status.startTick)) } : status);
          // A just-completed generic W missile is retained, but waits at its launch
          // origin until the sourced opening delay; after that its normal mover owns it.
          for (const missile of ctx.world.missiles) {
            if (missile.owner !== ctx.self.side || missile.source !== "W") continue;
            if (ctx.memory[`riftZone:${missile.id}`] === undefined) {
              missile.connects = true; missile.scale = 1;
              const opened = Number(ctx.memory.wOpening ?? ctx.tick);
              const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", seenTick: opened, x: missile.x - missile.direction * wBack / 2, radius: wBack / 2, startTick: opened, endTick: opened + ticks(wOpen + wCollapse), ability: collapseAbility.key, onHit: collapseAbility.onHit, connects: true, scale: 1, noPets: true };
              ctx.world.zones.push(zone); ctx.memory[`riftZone:${missile.id}`] = zone.id; ctx.memory[`riftOrigin:${missile.id}`] = missile.x; ctx.memory[`riftOpen:${missile.id}`] = opened + ticks(wOpen);
            }
            missile.perTick = ctx.tick >= Number(ctx.memory[`riftOpen:${missile.id}`]) ? wSpeed / 30 : 0;
            updatePrefix(ctx, missile);
          }
          for (const zone of ctx.world.zones) {
            if (zone.owner !== ctx.self.side || zone.ability !== "E" || ctx.memory[`ePrepared:${zone.id}`]) continue;
            ctx.memory[`ePrepared:${zone.id}`] = true;
            zone.connects = true; zone.scale = 1;
            zone.x = Number(ctx.memory["location:E"]); zone.seenTick = Number(ctx.memory["declared:E"]) + ticks(eAbility.castTime);
            const delay = seriesAt(eDelay, Number(ctx.memory["distance:E"]), true);
            const origin = Number(ctx.memory["castOrigin:E"] ?? ctx.self.x);
            zone.endTick = Number.POSITIVE_INFINITY;
            const flightTicks = Math.max(1, ticks(delay));
            if (zone.x !== origin) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "E", seenTick: zone.seenTick, x: origin, perTick: Math.abs(zone.x - origin) / flightTicks, direction: zone.x >= origin ? 1 : -1, homing: false, travelLeft: Math.abs(zone.x - origin), projectile: true, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
            else zone.endTick = ctx.tick + flightTicks - 1;
          }
          const action = ctx.self.action;
          if (action?.kind !== "channel" || action.ability !== "R") return;
          const forward = (ctx.enemy.x - ctx.self.x) * Number(ctx.memory.rayDirection ?? 1);
          const inside = forward >= -ctx.enemy.spec.base.radius && forward <= rRange + ctx.enemy.spec.base.radius;
          if (ctx.tick >= Number(ctx.memory.rayStackNext)) {
            ctx.memory.rayStackNext = Number(ctx.memory.rayStackNext) + ticks(rStacks);
            if (inside) abilityHit(ctx.world, ctx.self, ctx.enemy, stackAbility, stackAbility.onHit!);
            const origin = ctx.self.x, direction = Number(ctx.memory.rayDirection ?? 1);
            for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && (pet.x - origin) * direction >= -pet.spec.radius && (pet.x - origin) * direction <= rRange + pet.spec.radius) petStack(ctx, pet);
          }
        },
        onMissileContact(ctx) {
          if (ctx.missile.source === "W") updatePrefix(ctx, ctx.missile);
          if (ctx.targetPet && (ctx.missile.source === "W" || ctx.missile.source === "Q")) {
            if (ctx.missile.source === "Q") petEffects(ctx.world, ctx.self, ctx.targetPet, [{ type: "cc", cc: "slow", strength: qSlow, duration: qSlowSeconds }], "singleTarget", "Q");
            petStack(ctx, ctx.targetPet);
            if (ctx.missile.source === "Q" && ctx.targetPet.hp <= 0 && !ctx.targetPet.memory[`velkoz:refund:${ctx.missile.id}`]) {
              const restore = Math.min(qRefund, qRefundMaximum - Number(ctx.memory.qRefunded ?? 0));
              ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + restore); ctx.memory.qRefunded = Number(ctx.memory.qRefunded ?? 0) + restore; ctx.targetPet.memory[`velkoz:refund:${ctx.missile.id}`] = true;
            }
          }
        },
        onMissileEnd(ctx) { if (ctx.missile.source === "W") updatePrefix(ctx, ctx.missile); },
        onZoneLand(ctx) {
          if (ctx.zone.ability === "E" || ctx.zone.ability === collapseAbility.key) groundPets(ctx, ctx.zone);
          if (ctx.zone.memory?.rayPulse) {
            const action = ctx.self.action;
            if (action?.kind !== "channel" || action.ability !== "R" || action.startTick !== ctx.zone.memory.channelStart) { ctx.zone.connects = false; ctx.zone.onHit = []; return; }
            ctx.memory.rayPulses = Number(ctx.memory.rayPulses ?? 0) + 1;
            const pulse = isResearched(ctx.self, ctx.tick) ? rayTrue : rayMagic;
            ctx.zone.ability = pulse.key; ctx.zone.onHit = pulse.onHit;
            areaOnPets(ctx.world, ctx.self, ctx.zone.x - ctx.zone.radius, ctx.zone.x + ctx.zone.radius, rayMagic.onHit!);
          }
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") ctx.world.zones = ctx.world.zones.filter((zone) => zone.owner !== ctx.self.side || !zone.memory?.rayPulse); },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E" && hasState(ctx.enemy, "displacementImmune")) return ctx.effects.filter((effect) => effect.type !== "displace" && effect.type !== "cc");
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (["Q", "W", "E", collapseAbility.key, stackAbility.key].includes(key)) { ctx.memory.procFromQ = key === "Q"; addStack(ctx); ctx.memory.procFromQ = false; }
          else if (key === rayMagic.key || key === rayTrue.key) refresh(ctx);
          if (key === "Q") {
            const slow = [...ctx.enemy.statuses].reverse().find((status) => status.kind === "cc" && status.key === "slow" && status.source === ctx.self.side && status.ability === "Q");
            if (slow) slow.memoKey = SLOW;
          }
        },
        onAttackHit(ctx) { if (!ctx.blocked) refresh(ctx); },
        onDamageDealt(ctx) {
          if (ctx.amount <= 0 || (ctx.enemy.alive && ctx.enemy.hp > 0 && !ctx.enemy.fallen) || ctx.memory.qKillClaim === ctx.memory.qCast) return;
          if (ctx.ability !== q.name && ctx.ability !== "Q" && !((ctx.ability === p.name || ctx.ability === procAbility.key) && ctx.memory.procFromQ)) return;
          const restore = Math.min(qRefund, qRefundMaximum - Number(ctx.memory.qRefunded ?? 0));
          ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + restore); ctx.memory.qRefunded = Number(ctx.memory.qRefunded ?? 0) + restore; ctx.memory.qKillClaim = Number(ctx.memory.qCast ?? 0);
        },
      },
      budget: { damage(self, target) {
        const d = derive(self), qRate = 1 / (cooldownAfterHaste(qAbility.cooldown, d.abilityHaste) + qAbility.castTime), wRate = 1 / cooldownAfterHaste(wRecharge, d.abilityHaste), eRate = 1 / (cooldownAfterHaste(eAbility.cooldown, d.abilityHaste) + eAbility.castTime), rRate = 1 / (cooldownAfterHaste(rCooldown, d.abilityHaste) + rDelay + rDuration);
        // Empty manual channels are absent from the generic damage reference.
        return { magic: evaluate(collapse, self, target) * wRate, true: evaluate(rayTotal, self, target) * rRate + evaluate(proc, self, target) * (qRate + 2 * wRate + eRate + 3 * rRate) / stackMaximum };
      } },
    };
  },
};
export default velkoz;
