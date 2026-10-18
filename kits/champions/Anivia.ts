/** Anivia's level-20 kit, with separate flight, storm and attackable-rebirth lifecycles. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityHit, addStatus, beginResurrection, canTarget, directionTo, immediateDisplace, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { areaOnPets } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Unit, World, Zone } from "../../engine/sim/state";
import { scaled, seriesAt, ticks } from "./util";

const anivia: KitModule = {
  champion: "Anivia",
  build(kit) {
    const i = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const eggSeconds = i.quoted("enters resurrection for 6 seconds"), eggCooldown = i.field("staticCooldown");
    const eggResists = i.levelValue("While under resurrection");
    i.quote("restores all of her health"); i.quote("revived with her current health");
    i.quote("Triggering Rebirth will break tethers on Anivia");
    i.quote("All other channels will be interrupted upon triggering Rebirth");
    i.quote("Entering resurrection does not cancel cast times."); i.quote("Resurrection effects do not count for kills or assists.");
    i.quote("move=false; cast=false; attack=false");
    const passDamage = q.formula("Magic Damage", 0), burstDamage = q.formula("Magic Damage", 1);
    q.formula("Total Magic Damage");
    const qRange = q.field("range"), qWidth = q.field("width"), qSpeed = q.field("speed"), burstRadius = q.field("effectRadius");
    const slowSeries = q.seriesIn("based on Glacial Storm's Rank");
    if (slowSeries.kind !== "variable" || slowSeries.variable !== "Glacial Storm's Rank") throw new Error("Anivia: Q slow no longer scales with R rank");
    const qSlow = seriesAt(slowSeries, r.rank, false) / 100;
    const icedSeconds = e.quoted("become Iced for 3 seconds"), qStun = q.number("Stun Duration");
    q.quote("Flash Frost will fire from wherever Anivia was at the start of the cast time");
    q.quote("automatically at maximum range"); q.quote("Spell shield can block the effects of either the active or the recast, but not both");
    q.quote("the secondary effect will trigger without being considered as an ability activation");
    const wallRange = w.field("targetRange", "Maximum"), wallMin = w.field("targetRange", "Minimum");
    const wallSeconds = w.quoted("impassable terrain for 5 seconds"), wallRadius = w.quoted("100 units pathing radius and gameplay radius");
    const wallPush = w.quoted("Champions are knocked 120 units"), petPush = w.quoted("non-champions 250 units");
    if (w.gameQuoted("mSpell.DataValues.ChampPushDistance.values: [120,120,120,120,120,120,120]") !== wallPush) throw new Error("Anivia: pinned wall push sources disagree");
    w.number("Width"); w.number("Number of ice segments"); w.number("Distance between outermost segments"); w.number("Distance between individual segments");
    w.quote("perpendicular to her facing"); w.quote("though not through terrain"); w.quote("does not block sight");
    w.quote("dealing 0 proc true damage"); w.quote("Knockback speed?");
    const eDamage = e.formula("Magic Damage"), enhancedDamage = e.formula("Enhanced Damage");
    e.quote("The damage of Frostbite is calculated once it hits"); e.quote("does not go on cooldown nor pay its cost");
    const rNormal = r.formula("Magic Damage per Tick"), rMature = r.formula("Empowered Damage per Tick");
    const rRange = r.field("targetRange"), rTether = r.field("tetherRadius");
    // The radius field is a sourced series rather than one constant field value.
    r.fieldNumbers("effectRadius");
    const radiusSeries = r.record.fields.effectRadius!.values[0]!.series;
    if (radiusSeries.kind !== "variable" || radiusSeries.variable !== "time active" || radiusSeries.points.at(-1) !== "1.5+" || radiusSeries.values.at(-1) !== 400) throw new Error("Anivia: storm radius source shape changed");
    const growSeconds = r.quoted("increases in size over 1.5 seconds");
    const damageEvery = r.quoted("dealing magic damage every 0.5 seconds");
    const slowEvery = r.quoted("refreshes every 0.25 seconds"), normalSlow = r.fraction("Slow"), matureSlow = r.fraction("Empowered Slow");
    const normalSlowSeconds = r.quoted("slowing them for 1 second"), matureSlowSeconds = r.quoted("instead lasts 1.5 seconds");
    const staticToggle = r.field("staticCooldown");
    r.quote("deals 3 half ticks"); r.quote("Toggling Glacial Storm off triggers a final tick of damage");
    r.quote("cast-inhibiting crowd control"); r.quote("Stasis via Zhonya's Hourglass doesn't interrupt Glacial Storm");
    const manaText = r.textField("costType");
    if (manaText !== "mana + 35 / 45 / 55 per second") throw new Error("Anivia: ongoing R mana field changed");
    const rDrain = Number(manaText.match(/(\d+) per second$/)![1]);
    kit.assume("Flash Frost's Iced mark is applied only after the packet passes spell-shield/parry guards; the record does not settle blocked Iced. Its explosion independently checks its actual control point and current defensive states, even after a missed pass. Callback explosions use the shared hit model's expected share rather than creating a second branch; independent lateral escapes between the linked packets are an approximation.");
    kit.assume("Crystallize is a perpendicular 200-unit-thick impassable slab on the duel axis, affecting both sides; the eight lateral ice chunks and walking around a finite wall are outside this one-dimensional model. Its unknown knockback speed is represented by immediate ejection by the sourced 120/250 units, from the wall rather than the caster, respecting displacement/CC immunity and existing terrain. An exactly centered unit is ejected toward its own side of the lane. The zero-damage proc's turret/rune/item triggers are outside the plain-stat duel.");
    kit.assume("Glacial Storm interpolates its sourced radius points. Its inferred startup clock deals three half-normal packets at 0, 0.5 and 1.0 s, then full empowered damage from 1.5 s every 0.5 s. Mature slows refresh on an independent cumulative 0.25-s clock. Mana drains continuously at 30 Hz after activation, reserving the already-declared cost of any concurrent cast. Its unexplained static one-second field is used as a minimum manual-toggle interval; automatic CC/range/mana shutdown bypasses it. Final damage uses the current growth tier, with half-normal damage while growing, and is coalesced with a nominal damage tick on the same tick. Self-owned stasis is interpreted as the recorded Zhonya exception; hostile stasis and attachment end the storm.");
    kit.assume("Generic defensive threat forecasts omit pending Glacial Storm damage because its field pulses are resolved by hooks. This limits preemptive shield, dodge and invulnerability decisions against those packets. Frostbite forecasts use the current Iced mark without predicting future mark application or expiry; its actual damage rechecks Iced at impact.");
    kit.assume("The budget estimates ten seconds with full storm occupancy, enhanced Frostbite, one Q explosion per Q, and available mana allocated first to Q/E then to storm upkeep. Rebirth contributes no guaranteed healing or permanent defenses to this heuristic because an attackable egg can be killed.");

    // Forecasts read the active status list; impact hooks also check their exact tick.
    const iced = (unit: Unit, source: Unit, tick?: number) => unit.statuses.some((status) => status.kind === "mark" && status.key === "aniviaIced" && status.source === source.side && (tick === undefined || status.endTick > tick));
    const markIced = (ctx: HookContext) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "mark" && status.key === "aniviaIced" && status.source === ctx.self.side));
      addStatus(ctx.enemy, { kind: "mark", key: "aniviaIced", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(icedSeconds), value: 1 });
    };
    const flight = (world: World, unit: Unit) => world.missiles.find((missile) => missile.owner === unit.side && missile.source === "Q" && !missile.ended);
    const storm = (world: World, unit: Unit) => world.zones.find((zone) => zone.owner === unit.side && zone.ability === "R" && zone.kind === "field");
    const qSpec: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAfter: "state", cost: q.cost(), castTime: q.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "line", range: qRange + burstRadius, travelRange: qRange, width: qWidth, speed: qSpeed, piercing: true, collisionPet: true, radius: qWidth / 2 }, onHit: [{ type: "damage", damageType: "magic", amount: passDamage }, { type: "cc", cc: "slow", strength: qSlow, duration: icedSeconds }], flags: { projectile: q.flag("projectile"), spellShield: true }, decisive: true, usable: (self, world) => !flight(world, self) };
    const qBurst: AbilitySpec = { key: "Qburst", name: "Flash Frost (explosion)", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: burstDamage }, { type: "cc", cc: "slow", strength: qSlow, duration: icedSeconds }, { type: "cc", cc: "stun", duration: qStun }], flags: { spellShield: true }, usable: () => false };
    const qRecast: AbilitySpec = { key: "Q2", name: "Flash Frost (recast)", slot: "Q", cooldown: 0, cost: 0, castTime: 0, delivery: { kind: "self" }, overlay: true, preserveAttackWindup: true, usable: (self, world) => flight(world, self) !== undefined };
    const wSpec: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), castDirection: "start", delivery: { kind: "circle", range: wallRange, radius: wallRadius, delay: 0 }, roles: ["cc"], flags: { spellShield: w.flag("spellShield") }, usable: (self, world) => Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= wallRange };
    const eSpec: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cancelOnInvalidTarget: true, delivery: { kind: "target", range: e.field("targetRange"), missileSpeed: e.field("speed") }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage, amountFor: (self, target) => evaluate(iced(target, self) ? enhancedDamage : eDamage, self, target) }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") } };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", activation: "toggle", cooldown: r.cooldown(), cooldownAfter: "field", cost: r.cost(), resourceDrainPerSecond: rDrain, castTime: r.castTime(), delivery: { kind: "self" }, roles: ["damage"], flags: { spellShield: r.flag("spellShield") }, usable: (self, world) => !storm(world, self), estimate: (self, target) => evaluate(rMature, self, target) };
    const rOff: AbilitySpec = { key: "Roff", name: "Glacial Storm (toggle off)", slot: "R", activation: "toggle", cooldown: 0, castTime: 0, delivery: { kind: "self" }, overlay: true, preserveAttackWindup: true, usable: (self, world) => !!storm(world, self) && world.tick >= Number(self.memory.stormStart ?? 0) + ticks(staticToggle) };
    const abilities = [qSpec, wSpec, eSpec, rSpec, qRecast, qBurst, rOff];

    const explode = (ctx: HookContext, missile: Missile, rangedEnd = false) => {
      if (missile.ended && !rangedEnd) return;
      missile.ended = true;
      const gap = Math.abs(ctx.enemy.x - missile.x);
      if (gap <= burstRadius + ctx.enemy.spec.base.radius + 1e-6 && !isUntargetable(ctx.enemy, ctx.self)) {
        const share = skillshotChance(ctx.world, ctx.enemy, missile.seenTick, 0, burstRadius - gap);
        if (share > 0) abilityHit(ctx.world, ctx.self, ctx.enemy, qBurst, qBurst.onHit!, share);
      }
      areaOnPets(ctx.world, ctx.self, missile.x - burstRadius, missile.x + burstRadius, qBurst.onHit!);
      ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.ability === "Q"));
      delete ctx.self.cooldownHeld.Q;
      ctx.self.cooldownReady.Q = ctx.tick + ticks(cooldownAfterHaste(qSpec.cooldown, derive(ctx.self).abilityHaste));
    };
    const pulse = (ctx: HookContext, zone: Zone, damage: boolean, slow: boolean) => {
      const enemy = ctx.world.units[ctx.self.side === 0 ? 1 : 0];
      const mature = ctx.tick - zone.startTick >= ticks(growSeconds);
      const effects: Effect[] = [
        ...(damage ? [{ type: "damage" as const, damageType: "magic" as const, amount: mature ? rMature : scaled(rNormal, .5), persistent: true }] : []),
        ...(slow ? [{ type: "cc" as const, cc: "slow" as const, strength: mature ? matureSlow : normalSlow, duration: mature ? matureSlowSeconds : normalSlowSeconds }] : []),
      ];
      if (Math.abs(enemy.x - zone.x) <= zone.radius + enemy.spec.base.radius + 1e-6) abilityHit(ctx.world, ctx.self, enemy, rSpec, effects);
      areaOnPets(ctx.world, ctx.self, zone.x - zone.radius, zone.x + zone.radius, effects);
      if (damage) ctx.memory.stormLastDamage = ctx.tick;
    };
    const stopStorm = (ctx: HookContext) => {
      const zone = storm(ctx.world, ctx.self); if (!zone) return;
      if (Number(ctx.memory.stormLastDamage ?? -1) !== ctx.tick) pulse(ctx, zone, true, false);
      ctx.world.zones = ctx.world.zones.filter((entry) => entry.id !== zone.id);
      delete ctx.self.cooldownHeld.R;
      ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rSpec.cooldown, derive(ctx.self).abilityHaste));
      delete ctx.memory.stormStart;
    };
    const raisedWall = (ctx: HookContext, aim?: { direction: 1 | -1; distance?: number }) => {
      const dir = Number(ctx.memory["castDirection:W"] ?? directionTo(ctx.self, ctx.enemy));
      const distance = Math.max(wallMin, Math.min(wallRange, aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
      const center = Number(ctx.memory.wallCenter ?? (ctx.self.x + dir * (aim?.direction ?? 1) * distance));
      for (const unit of ctx.world.units) {
        if (!unit.alive || Math.abs(unit.x - center) > wallRadius + unit.spec.base.radius || isUntargetable(unit, ctx.self)) continue;
        const side = unit.x === center ? (unit.side === 0 ? -1 : 1) : unit.x > center ? 1 : -1;
        immediateDisplace(ctx.world, ctx.self, unit, side * wallPush, "W");
      }
      for (const pet of ctx.world.pets) {
        if (Math.abs(pet.x - center) > wallRadius + pet.spec.radius || pet.spec.untargetable) continue;
        const side = pet.x === center ? (pet.owner === 0 ? -1 : 1) : pet.x > center ? 1 : -1;
        if (pet.spec.ccImmune?.includes("airborne")) continue;
        const proxy = petFormulaTarget(pet, ctx.self);
        if (immediateDisplace(ctx.world, ctx.self, proxy, side * petPush, "W")) pet.x = proxy.x;
      }
      ctx.world.terrain.push({ id: ctx.world.nextId++, owner: ctx.self.side, from: center - wallRadius, to: center + wallRadius, endTick: ctx.tick + ticks(wallSeconds) });
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      if (self.resurrection) return { kind: "move", direction: 0 };
      const tradeCommand = mode === "trade" ? defaultBehavior(view) : undefined;
      if (mode === "trade" && self.memory.tradeDone) return tradeCommand;
      const reaction = react(view); if (reaction) return reaction;
      const missile = flight(world, self);
      if (missile && canCast(world, self, qRecast) && Math.abs(enemy.x - missile.x) <= burstRadius + enemy.spec.base.radius && (missile.hitTargets?.includes(enemy.side) || missile.direction * (enemy.x - missile.x) <= 0)) return { kind: "cast", ability: "Q2" };
      const zone = storm(world, self);
      if (zone && canCast(world, self, rOff) && (mode === "flee" || Math.abs(enemy.x - zone.x) > zone.radius + enemy.spec.base.radius + 150)) return { kind: "cast", ability: "Roff" };
      if ((mode === "fight" || mode === "kite") && !self.action && canTarget(enemy, self) && Math.abs(enemy.x - self.x) <= rRange && self.resource >= Number(rSpec.cost) + rDrain * growSeconds + Number(eSpec.cost) && canCast(world, self, rSpec)) return { kind: "cast", ability: "R", aim: { direction: 1, distance: Math.min(rRange, Math.abs(enemy.x - self.x)) } };
      if (!self.action && canCast(world, self, wSpec) && canTarget(enemy, self) && ((zone && Math.abs(enemy.x - zone.x) <= zone.radius + enemy.spec.base.radius) || (mode === "flee" && view.distance < 400))) return { kind: "cast", ability: "W", aim: { direction: 1, distance: Math.min(wallRange, Math.max(wallMin, Math.abs(enemy.x - self.x) + (mode === "flee" ? -wallPush : wallPush))) } };
      if (!self.action && mode !== "flee" && canCast(world, self, eSpec) && iced(enemy, self, world.tick)) return { kind: "cast", ability: "E" };
      // Internal recasts and hook-only storm casts are handled above; prevent the
      // generic chooser from repeatedly toggling them or raising untactical walls.
      const chosen = mode === "trade" ? tradeCommand : defaultBehavior(view);
      if (chosen?.kind === "cast" && ["R", "Roff", "Q2", "W"].includes(chosen.ability)) {
        if (canCast(world, self, qSpec) && canTarget(enemy, self) && Math.abs(enemy.x - self.x) <= qRange + burstRadius + enemy.spec.base.radius) return { kind: "cast", ability: "Q" };
        if (mode !== "flee" && canCast(world, self, eSpec)) return { kind: "cast", ability: "E" };
        return { kind: "move", direction: mode === "hold" ? 0 : mode === "flee" || mode === "kite" ? -1 : 1 };
      }
      return chosen;
    };
    return {
      abilities, behavior,
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "W") {
            const distance = Math.max(wallMin, Math.min(wallRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            ctx.memory.wallCenter = ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * distance;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") ctx.apply({ type: "state", state: "lingering", duration: qRange / qSpeed + 1 / 30 }, true);
          if (ctx.ability.key === "Q2") { const missile = flight(ctx.world, ctx.self); if (missile) explode(ctx, missile); }
          if (ctx.ability.key === "W") raisedWall(ctx, ctx.aim);
          if (ctx.ability.key === "R") {
            const center = ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * Math.min(rRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", ability: "R", seenTick: ctx.tick, startTick: ctx.tick, endTick: ticks(ctx.world.settings.maxSeconds) + 1, x: center, radius: seriesAt(radiusSeries, 0, true), interval: ticks(ctx.world.settings.maxSeconds) + 1, nextTick: ticks(ctx.world.settings.maxSeconds) + 1, onHit: [] };
            ctx.world.zones.push(zone); ctx.memory.stormStart = ctx.tick; ctx.memory.stormDamageOrdinal = 1; ctx.memory.stormSlowOrdinal = 0;
            pulse(ctx, zone, true, true);
          }
          if (ctx.ability.key === "Roff") stopStorm(ctx);
        },
        onTick(ctx) {
          const zone = storm(ctx.world, ctx.self); if (!zone) return;
          const age = ctx.tick - zone.startTick;
          zone.radius = seriesAt(radiusSeries, Math.min(growSeconds, age / 30), true);
          const hostileStasis = ctx.self.statuses.some((status) => status.kind === "state" && status.key === "stasis" && status.source !== ctx.self.side);
          const pending = ctx.self.action?.kind === "cast" ? ctx.self.action.cost ?? 0 : 0;
          const castDisabled = ctx.self.statuses.some((status) => status.kind === "cc" && CC_RULES[status.key as CCType]?.abilities === "disabled" && !(status.key === "stasis" && status.source === ctx.self.side));
          if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.self.resurrection || hostileStasis || castDisabled || ctx.self.attached || Math.abs(ctx.self.x - zone.x) > rTether || (age > 0 && ctx.self.resource - pending + 1e-9 < rDrain / 30)) { stopStorm(ctx); return; }
          if (age > 0) ctx.self.resource -= rDrain / 30;
          const ordinal = Number(ctx.memory.stormDamageOrdinal ?? 1);
          const damage = age >= ticks(ordinal * damageEvery);
          if (damage) ctx.memory.stormDamageOrdinal = ordinal + 1;
          const mature = age >= ticks(growSeconds);
          const slowOrdinal = Number(ctx.memory.stormSlowOrdinal ?? 0);
          const slow = mature && age >= ticks(growSeconds + slowOrdinal * slowEvery);
          if (slow) ctx.memory.stormSlowOrdinal = slowOrdinal + 1;
          if (damage || slow) pulse(ctx, zone, damage, mature ? slow : damage);
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E") return [{ type: "damage", damageType: "magic", amount: iced(ctx.enemy, ctx.self, ctx.tick) ? enhancedDamage : eDamage }];
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qburst" || (ctx.ability.key === "R" && ctx.effects.some((effect) => effect.type === "damage") && ctx.tick - Number(ctx.memory.stormStart ?? ctx.tick) >= ticks(growSeconds))) markIced(ctx);
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "Q") return;
          if (ctx.reason === "range") { explode(ctx, ctx.missile, true); }
          else {
            ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.ability === "Q"));
            delete ctx.self.cooldownHeld.Q;
            ctx.self.cooldownReady.Q = ctx.tick + ticks(cooldownAfterHaste(qSpec.cooldown, derive(ctx.self).abilityHaste));
          }
        },
        onCCApplied(ctx) {
          if (CC_RULES[ctx.cc].abilities === "disabled" && !(ctx.cc === "stasis" && ctx.source.side === ctx.self.side)) stopStorm(ctx);
        },
        onLethal(ctx) {
          if (ctx.tick < Number(ctx.memory.eggReady ?? 0)) return false;
          stopStorm(ctx);
          const started = beginResurrection(ctx.world, ctx.self, { duration: eggSeconds, armor: eggResists, mr: eggResists, ability: "I" });
          if (started) ctx.memory.eggReady = ctx.tick + ticks(eggCooldown);
          return started;
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const qCycle = qSpec.cooldown / haste + qSpec.castTime + qRange / qSpeed;
          const qDps = (evaluate(passDamage, self, target) + evaluate(burstDamage, self, target)) / qCycle - evaluate(passDamage, self, target) / (qSpec.cooldown / haste + qSpec.castTime);
          const eExtraDps = Math.max(0, evaluate(enhancedDamage, self, target) - evaluate(eDamage, self, target)) / (eSpec.cooldown / haste + eSpec.castTime);
          const spellMana = 10 * (Number(qSpec.cost) / (qSpec.cooldown / haste + qSpec.castTime + qRange / qSpeed) + Number(eSpec.cost) / (eSpec.cooldown / haste + eSpec.castTime));
          const stormSeconds = Math.max(0, Math.min(10, (derive(self).maxResource + self.spec.base.resourceRegen * 2 - Number(rSpec.cost) - spellMana) / rDrain));
          const startup = Math.min(3, Math.max(0, Math.ceil(stormSeconds / damageEvery))) * evaluate(rNormal, self, target) * .5;
          const mature = Math.max(0, stormSeconds - growSeconds) * evaluate(rMature, self, target) / damageEvery;
          return { magic: qDps + eExtraDps + (startup + mature) / 10 };
        },
      },
    };
  },
};
export default anivia;
