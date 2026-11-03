/** Karthus, compiled exclusively from the pinned ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { KitDataError } from "../../engine/kits/context";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { attackRange, canCast, inReach } from "../../engine/sim/actions";
import { defaultBehavior, enemyEffects, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, beginDeathDefied, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { areaOnPets, petEffects } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const ON = "defileOn";
const START = "defileStart";
const PULSES = "defilePulses";
const zombie = (unit: Unit) => unit.deathDefied !== undefined;

const karthus: KitModule = {
  champion: "Karthus",
  build(kit) {
    const innate = kit.ability("Death Defied");
    const q = kit.ability("Lay Waste");
    const w = kit.ability("Wall of Pain");
    const e = kit.ability("Defile");
    const r = kit.ability("Requiem");
    const zombieSeconds = innate.quoted("zombie state for 7 seconds");
    const rDisable = innate.quoted("Requiem becomes disabled after 4 seconds");
    innate.quote("cast his abilities at no cost");
    innate.quote("it will remain toggled on for Death Defied's entire duration");
    innate.quote("untargetable and immune to crowd control as well as prevents all incoming damage");
    innate.quote("unable to move, declare basic attacks");
    innate.quote("Death Defied's untargetability does not destroy in-flight projectiles");
    innate.quote("Karthus is set to 1 health");
    innate.quote("Karthus can still regenerate his health over the duration, but he will always die at the end of it");
    const qDamage = q.formula("Magic Damage");
    const qIsolated = q.formula("Isolated Enhanced Damage");
    const qDelay = q.quoted("detonates after 0.528−0.759");
    q.quote("doubled when only one target is struck");
    q.quote("The delay between the cast and the detonation is inconsistent");
    q.quote("Applies spell damage if it hits a single target and area damage if it hits multiple targets");
    const qRange = q.field("targetRange");
    const qRadius = q.field("effectRadius");
    const qCost = q.cost();
    const qCooldown = q.cooldown();
    const qCast = q.castTime();
    const wallSeconds = w.quoted("lasts 5 seconds");
    const wallDebuffSeconds = w.quoted("become slowed for 5 seconds");
    const wallShred = w.quoted("25% magic resistance reduction") / 100;
    const wallSlow = w.fraction("Slow");
    const wallEndSlow = w.fraction("Reduced Slow");
    const wallRange = w.field("targetRange");
    w.number("Wall Length");
    w.quote("perpendicular to his facing");
    w.quote("This can affect enemies only once per cast");
    const wallCost = w.cost();
    const defileRate = e.cost();
    const defileInterval = e.quoted("deals magic damage every 0.25 seconds");
    const defileDamage = e.formula("Magic Damage Per Tick");
    const defileRadius = e.field("effectRadius");
    const manaRestore = e.number("Mana Restored");
    e.quote("restores mana whenever he kills an enemy");
    e.quote("Toggling Defile off triggers a final tick of damage");
    e.quote("Defile is toggled off automatically if Karthus becomes unable to pay its mana cost");
    e.quote("Defile cannot be toggled off during Death Defied");
    e.quote("Toggled abilities do not count as ability activations");
    e.quote("Defile re-calculates its damage with each tick");
    e.quote("Defile will toggle off automatically if Karthus enters resurrection");
    const rCost = r.cost();
    const rDamage = r.formula("Magic Damage");
    const channelSeconds = r.quoted("channels for 3 seconds");
    r.quote("all targetable enemy champions upon completion");
    r.quote("Requiem will affect clones");
    r.quote("including if they are untargetable or even dead");
    if (r.record.fields.effectRadius?.text !== "Global") throw new KitDataError("Karthus", r.name, "Requiem must have the literal Global effect radius");
    // Quote the nonnumeric field through its record, without trying to parse Global as a number.
    kit.evidence.push({ ability: r.name, page: r.record.page.title, revid: r.record.page.revid, text: "effectRadius: Global" });

    kit.assume("Lay Waste uses the pinned 0.528-second lower delay bound after its 0.25-second cast; the source reports an inconsistent 0.528–0.759-second delay without a distribution or unambiguous cast-time composition. This deterministic policy is not a claim that its in-game delay is fixed.");
    kit.assume("Lay Waste snapshots its location at cast completion and reads AP when the blast lands. Isolation counts the targetable, non-stasis enemy champion actually hit and overlapping targetable health-based enemy pets; invulnerability, parry and spell shields do not remove otherwise struck units from the count. Hit-point pets and untargetable pets do not count. With one pet and a fractional champion-hit chance, that pet receives the corresponding expected mixture of isolated spell damage and ordinary area damage, preserving its category-specific defenses. These hit-classification details are not pinned. An already-created blast persists through initial and final death.");
    kit.assume("Wall of Pain is a zero-thickness crossing perpendicular to the one-axis arena, expanded by each enemy unit's hitbox, rather than a 1200-unit wall along the combat axis. Its center is locked at declaration; each champion or pet contacts once per cast, with a linear 80% to 40% slow decay over the actual slow duration. Thickness and decay shape are absent from the source. Map sight is not simulated.");
    kit.assume("Defile begins off. Toggling on deals its first packet immediately; subsequent nominal 0.25-second packets use cumulative tick rounding, with dynamic AP. Mana drains continuously at 78 per second while alive, without spending a pending declared spell's reserved mana. Toggling off or running out of unreserved mana deals the sourced final packet. The first-pulse offset and the source's reported timing inconsistency after the first pulse are unresolved.");
    kit.assume("Requiem uses its separate 0.25-second cast followed by the pinned 3-second normal channel. During Death Defied it must be declared strictly before four seconds have elapsed, and final death interrupts any unfinished channel; the source does not reconcile the four-second cutoff with the separate cast field. Ordinary summons are excluded; the arena has no clone/disguise classification, map vision, minions, structures, items or summoner spells.");
    kit.assume("The initial fatal hit clears existing statuses and cancels unfinished casts/channels and attack windups before Death Defied starts; already-created blasts continue. The pinned passive does not specify this cleanup or resurrection priority. Initial death counts once for takedowns even though the seven-second untargetable zombie can still cast; its mandatory final death grants no second kill. Entering resurrection switches Defile off without an extra off packet; that specific transition's packet is unpinned.");
    kit.assume("The stat allocator uses an isolated opponent and a ten-second opening resource window: one W and one R reserve their costs, Q casts consume mana at their haste-adjusted cast/cooldown rate, and remaining starting mana plus regeneration bounds Defile uptime. It does not value Death Defied as surviving health or assume repeated kill refunds. Requiem's ordinary channel remains in the generic budget once per cooldown; Q's budget correction replaces its unlimited-mana reference rather than adding a second Q.");

    const cost = (normal: number) => (unit: Unit) => zombie(unit) ? 0 : normal;
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: qCost, costFor: cost(qCost), castTime: qCast,
        delivery: { kind: "circle", range: qRange, radius: qRadius, delay: qDelay },
        onHit: [{ type: "damage", damageType: "magic", amount: qIsolated }],
        flags: { projectile: false, spellShield: q.flag("spellShield") }, persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: wallCost, costFor: cost(wallCost), castTime: w.castTime(),
        delivery: { kind: "circle", range: wallRange, radius: 0, delay: 0 },
        onHit: [], roles: ["cc"], flags: { projectile: false, spellShield: w.flag("spellShield") } },
      { key: "E", name: e.name, slot: "E", activation: "toggle", cooldown: e.field("staticCooldown"), staticCooldown: true,
        cost: 0, resourceDrainPerSecond: defileRate, castTime: e.castTime(), delivery: { kind: "self" }, flags: { spellShield: e.flag("spellShield") },
        usable: (self) => !zombie(self) && (self.memory[ON] === true || self.resource >= defileRate / 30) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, cost: rCost, costFor: cost(rCost), castTime: r.castTime(),
        delivery: { kind: "self" }, channel: { duration: channelSeconds, interruptible: true, onComplete: [{ type: "damage", damageType: "magic", amount: rDamage }] },
        flags: { projectile: false, spellShield: r.flag("spellShield") },
        usable: (self, world) => !zombie(self) || world.tick < Number(self.memory.deathDefiedStart) + ticks(rDisable) },
    ];
    const [layWaste, wall, defile, requiem] = abilities as [AbilitySpec, AbilitySpec, AbilitySpec, AbilitySpec];
    const aura: AbilitySpec = { ...defile, onHit: [{ type: "damage", damageType: "magic", amount: defileDamage, persistent: true }] };
    const wallPacket: Effect[] = [
      { type: "cc", cc: "slow", strength: wallSlow, duration: wallDebuffSeconds },
      { type: "stat", stat: "mrReductionPercent", amount: { base: wallShred }, duration: wallDebuffSeconds },
    ];
    const affectPets = (ctx: HookContext, serial: number, x: number) => {
      for (const pet of ctx.world.pets) {
        if (pet.owner === ctx.self.side) continue;
        const prefix = `wallPet:${serial}:${pet.id}`;
        const previous = Number(ctx.memory[`${prefix}:x`] ?? pet.x);
        ctx.memory[`${prefix}:x`] = pet.x;
        if (ctx.memory[prefix] || pet.spec.untargetable || pet.statuses?.some((status) => (status.kind === "state" && (status.key === "untargetable" || status.key === "stasis")) || (status.kind === "cc" && status.key === "stasis"))) continue;
        if (Math.min(previous, pet.x) <= x + pet.spec.radius + 1e-9 && Math.max(previous, pet.x) >= x - pet.spec.radius - 1e-9) {
          ctx.memory[prefix] = true;
          petEffects(ctx.world, ctx.self, pet, wallPacket, "area", "W");
        }
      }
    };
    const decayWallSlows = (ctx: HookContext, statuses: Unit["statuses"]) => {
      for (const status of statuses) if (status.kind === "cc" && status.key === "slow" && status.ability === "W" && status.source === ctx.self.side) {
        const progress = Math.min(1, Math.max(0, (ctx.tick - status.startTick) / Math.max(1, status.endTick - status.startTick)));
        status.value = wallSlow + (wallEndSlow - wallSlow) * progress;
      }
    };
    const pulse = (ctx: HookContext) => {
      if (ctx.enemy.alive && Math.abs(ctx.self.x - ctx.enemy.x) <= defileRadius + ctx.enemy.spec.base.radius + 1e-9) abilityHit(ctx.world, ctx.self, ctx.enemy, aura, aura.onHit!);
      areaOnPets(ctx.world, ctx.self, ctx.self.x - defileRadius, ctx.self.x + defileRadius, aura.onHit!);
    };
    const turnOn = (ctx: HookContext) => {
      ctx.memory[ON] = true; ctx.memory[START] = ctx.tick; ctx.memory[PULSES] = 1; pulse(ctx);
    };
    const turnOff = (ctx: HookContext) => { ctx.memory[ON] = false; pulse(ctx); };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view); // Also updates the ordinary trade clock.
      const { self, enemy, world, mode } = view;
      if (mode === "idle" || !self.alive) return command;
      if (self.action && self.action.kind !== "windup") return command;
      const offensive = mode !== "flee" && !self.memory.tradeDone;
      const close = Math.abs(self.x - enemy.x) <= defileRadius + enemy.spec.base.radius;
      if (!zombie(self) && canCast(world, self, defile) && ((self.memory[ON] === true && (!close || !offensive)) || (self.memory[ON] !== true && close && offensive && self.resource >= defileRate / 2 + qCost))) return { kind: "cast", ability: "E" };
      if (!offensive) return command;
      const allowR = mode === "fight" || mode === "kite";
      if (allowR && zombie(self) && canCast(world, self, requiem)) return { kind: "cast", ability: "R" };
      // Alive: use the long channel at a safe distance, or once the available basics are spent.
      const interrupts = (effect: Effect) => effect.type === "disrupt" || effect.type === "displace" || (effect.type === "cc" && CC_RULES[effect.cc].interruptsChannels !== "no");
      const readyInterrupt = enemy.spec.abilities.some((spell) => enemyEffects(spell).some(interrupts) && canCast(world, enemy, spell) && inReach(spell, enemy, self));
      const safeChannel = Math.abs(self.x - enemy.x) > attackRange(enemy) + enemy.spec.base.radius + 150 && !readyInterrupt && !view.threats.some((threat) => threat.immobilizes || threat.cc || threat.damage >= self.hp);
      if (command?.kind === "cast" && command.ability === "R" && (!allowR || (!zombie(self) && !safeChannel))) {
        if (canCast(world, self, layWaste) && inReach(layWaste, self, enemy)) return { kind: "cast", ability: "Q" };
        return { kind: "move", direction: mode === "hold" ? 0 : -1 };
      }
      return command;
    };
    return {
      abilities, behavior,
      budget: {
        damage(self, target) {
          const d = derive(self);
          const window = 10;
          const unlimitedQRate = 1 / (qCooldown / (1 + d.abilityHaste / 100) + qCast);
          const available = Math.max(0, d.maxResource + self.spec.base.resourceRegen * window / 5 - wallCost - rCost);
          const qRate = Math.min(unlimitedQRate, available / window / qCost);
          const auraShare = Math.max(0, Math.min(1, (available - qRate * window * qCost) / (window * defileRate)));
          return { magic: (qRate - unlimitedQRate) * evaluate(qIsolated, self, target) + auraShare * evaluate(defileDamage, self, target) / defileInterval };
        },
      },
      hooks: {
        onStart(ctx) { ctx.memory[ON] = false; ctx.memory.wallPreviousEnemyX = ctx.enemy.x; },
        onCastStart(ctx) {
          if (ctx.ability.key !== "W") return;
          const distance = ctx.aim ? Math.min(wallRange, Math.max(0, ctx.aim.distance ?? wallRange)) * ctx.aim.direction : Math.min(wallRange, Math.abs(ctx.enemy.x - ctx.self.x));
          ctx.memory.wallCenter = ctx.self.x + directionTo(ctx.self, ctx.enemy) * distance;
          ctx.memory.wallSeenTick = ctx.tick;
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") { if (ctx.memory[ON] === true) turnOff(ctx); else turnOn(ctx); }
          if (ctx.ability.key === "W") {
            ctx.memory.wallPreviousEnemyX = ctx.enemy.x;
            const x = Number(ctx.memory.wallCenter);
            const serial = Number(ctx.memory.wallPetCasts ?? 0) + 1;
            ctx.memory.wallPetCasts = serial;
            ctx.memory[`wallPetCenter:${serial}`] = x;
            ctx.memory[`wallPetUntil:${serial}`] = ctx.tick + ticks(wallSeconds);
            affectPets(ctx, serial, x);
            if (ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - x) <= ctx.enemy.spec.base.radius + 1e-9) abilityHit(ctx.world, ctx.self, ctx.enemy, wall, wallPacket);
            else ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", ability: "W", seenTick: Number(ctx.memory.wallSeenTick), x, radius: 0, startTick: ctx.tick, endTick: ctx.tick + ticks(wallSeconds), onHit: wallPacket, noPets: true });
          }
        },
        onTick(ctx) {
          // Resurrection is separate from the counted-death spell window. The pinned
          // Defile note explicitly turns it off on entering resurrection.
          if (ctx.self.resurrection) ctx.memory[ON] = false;
          decayWallSlows(ctx, ctx.enemy.statuses);
          for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.statuses) decayWallSlows(ctx, pet.statuses);
          for (let serial = 1; serial <= Number(ctx.memory.wallPetCasts ?? 0); serial++) if (ctx.tick < Number(ctx.memory[`wallPetUntil:${serial}`] ?? -1)) affectPets(ctx, serial, Number(ctx.memory[`wallPetCenter:${serial}`]));
          const previous = Number(ctx.memory.wallPreviousEnemyX ?? ctx.enemy.x);
          for (const zone of [...ctx.world.zones]) {
            if (zone.kind !== "trap" || zone.owner !== ctx.self.side || zone.ability !== "W" || ctx.tick < zone.startTick || ctx.tick >= zone.endTick || !ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)) continue;
            const radius = ctx.enemy.spec.base.radius;
            if (Math.min(previous, ctx.enemy.x) <= zone.x + radius + 1e-9 && Math.max(previous, ctx.enemy.x) >= zone.x - radius - 1e-9) {
              abilityHit(ctx.world, ctx.self, ctx.enemy, wall, zone.onHit ?? []);
              ctx.world.zones = ctx.world.zones.filter((candidate) => candidate.id !== zone.id);
            }
          }
          ctx.memory.wallPreviousEnemyX = ctx.enemy.x;
          if (ctx.memory[ON] !== true) return;
          if (!zombie(ctx.self)) {
            const action = ctx.self.action;
            const reserved = action?.kind === "cast" ? action.cost ?? 0 : 0;
            const manaTick = defileRate / 30;
            if (ctx.self.resource - reserved + 1e-9 < manaTick) { turnOff(ctx); return; }
            ctx.self.resource -= manaTick;
          }
          while (ctx.tick >= Number(ctx.memory[START]) + ticks(Number(ctx.memory[PULSES]) * defileInterval)) {
            pulse(ctx); ctx.memory[PULSES] = Number(ctx.memory[PULSES]) + 1;
          }
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "Q") return;
          const inside = (x: number, radius: number) => Math.abs(x - ctx.zone.x) <= qRadius + radius + 1e-9;
          const championShare = ctx.enemy.alive && ctx.zone.connects && inside(ctx.enemy.x, ctx.enemy.spec.base.radius) && !isUntargetable(ctx.enemy, ctx.self) && !inStasis(ctx.enemy) ? Math.max(0, Math.min(1, ctx.zone.scale ?? 1)) : 0;
          const hitPets = ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && !isUntargetable(petFormulaTarget(pet, ctx.self), ctx.self) && inside(pet.x, pet.spec.radius));
          const targets = (championShare > 0 ? 1 : 0) + hitPets.length;
          ctx.zone.onHit = [{ type: "damage", damageType: "magic", amount: targets === 1 ? qIsolated : qDamage }];
          // Count all struck units before any damage can kill one. An expected-value
          // champion miss leaves a lone pet isolated in that share of the outcomes.
          ctx.zone.noPets = true;
          if (hitPets.length === 1) {
            if (championShare > 0) petEffects(ctx.world, ctx.self, hitPets[0]!, [{ type: "damage", damageType: "magic", amount: qDamage }], "area", "Q", championShare);
            if (championShare < 1) petEffects(ctx.world, ctx.self, hitPets[0]!, [{ type: "damage", damageType: "magic", amount: qIsolated }], "singleTarget", "Q", 1 - championShare);
          } else {
            for (const pet of hitPets) petEffects(ctx.world, ctx.self, pet, [{ type: "damage", damageType: "magic", amount: qDamage }], "area", "Q");
          }
        },
        onLethal(ctx) {
          if (!beginDeathDefied(ctx.world, ctx.self, { duration: zombieSeconds, ability: innate.name })) return false;
          ctx.memory.deathDefiedStart = ctx.tick;
          if (ctx.memory[ON] !== true) turnOn(ctx);
          return true;
        },
        onKill(ctx) {
          ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + manaRestore);
        },
      },
    };
  },
};

export default karthus;
