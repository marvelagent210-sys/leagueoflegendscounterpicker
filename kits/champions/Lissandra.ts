/** Lissandra at level 20, compiled from the pinned ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityHit, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile } from "../../engine/sim/state";
import { damagePet } from "../../engine/sim/pets";
import { fieldAt, missingShare, seriesAt, ticks } from "./util";

const lissandra: KitModule = {
  champion: "Lissandra",
  build(kit) {
    const i = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const thrallTrigger = i.field("effectRadius", "Aura radius"), thrallRadius = i.field("effectRadius", "Thrall slow");
    const thrallDamage = i.levelValue("after which they shatter"), thrallRatio = i.quoted("(+ 50% AP)") / 100;
    const thrallSpeed = i.seriesIn("Frozen Thralls are ice spirits");
    const thrallSeconds = i.quoted("chase nearby visible enemies for 4 seconds"), thrallSlow = i.quoted("slow nearby enemies by 25%") / 100;
    i.quote("Thralls are untargetable and invulnerable");
    i.quote("will not summon a Thrall against enemy champions that enter a zombie state");
    if (thrallSpeed.kind !== "variable") throw new Error("Lissandra kit: Thrall speed changed shape");
    kit.assume(`Iceborn Subjugation is a terminal effect in a one-enemy duel: no living opposing champion remains after the sole champion's final death, and zombie entry is not final death. No starting Thrall, passive slow, or passive DPS is granted. Audited level-20 values are ${thrallDamage} + ${thrallRatio} AP, ${thrallTrigger}-unit death aura, ${thrallRadius}-unit explosion/slow radius, ${thrallSlow * 100}% slow, ${thrallSeconds}-second life, and the pinned age-speed series; pets are not champion corpses.`);

    const qDamage = q.formula("Magic Damage"), qSlow = q.fraction("Slow"), qSlowSeconds = q.quoted("slows enemies hit for 1.5 seconds");
    const qReach = q.field("range", "Standard range"), qEnhancedRange = q.field("range", "Enhanced range");
    const qWidth = q.field("width", "Standard missile"), shatteredWidth = q.field("width", "after shattering");
    const shardSpeed = q.field("speed");
    const qFlight = q.quoted("initial Ice Shard missile has a range of 700 units");
    const endpointRadius = q.quoted("checks for enemies in a 100 radius");
    const endpointOffset = q.quoted("point 25 units in front of it");
    q.quote("Spell shield will block the damage and the slow but will not stop the projectile from shattering");
    q.quote("This ability will cast from wherever the caster is at the end of the cast time");
    kit.assume("Ice Shard uses its actual 700-unit initial flight and endpoint circle, followed by a wider shattered flight toward the fixed 950-unit endpoint only after a real enemy contact. A champion is damaged at most once by the combined initial/shattered cast; the pinned record does not explicitly specify duplicate-hit suppression. Flight timing uses 2200 units/s and tick quantization rather than also forcing the rounded 0.33-second note. Shatters triggered by pets recompute champion sidestep chance using their remaining geometry and wider missile, as expected damage within the current branch. Generic pre-cast forecasts use the effective 825-unit reach and initial width; they do not exactly reproduce the final 725-center/100-radius circle footprint before the actual trajectory reaches it.");
    const wDamage = w.formula("Magic Damage"), rootSeconds = w.number("Root Duration"), rootRadius = w.field("effectRadius");
    kit.assume("Ring of Frost uses a 275-unit center-to-center aura in the simulator; the source radius has no explicit edge-range annotation. Root permits ordinary attacks and non-movement spells.");
    const clawDamage = e.formula("Magic Damage"), clawRange = e.field("range"), clawWidth = e.field("width");
    const [clawSpeed, clawMinimum] = e.fieldNumbers("speed");
    if (!clawSpeed || !clawMinimum) throw new Error("Lissandra kit: claw velocity endpoints are missing");
    const clawDecelerationSeconds = e.quoted("decelerating over 1.25 seconds"), clawGate = e.quoted("recast after 0.5 seconds");
    e.quote("blinks to the claw's current location, ending its trajectory");
    const clawGraceQuote = "plus another 0.2-0.3 seconds after the claw 'sinks'";
    const clawGrace = (e.quoted(clawGraceQuote) + Math.abs(e.quoted(clawGraceQuote, 1))) / 2;
    e.quote("cannot be recast while grounded or rooted");
    e.quote("so long as the claw is at least halfway through them");
    e.quoted("enemies within 600 range");
    kit.assume("Glacial Path decelerates linearly from 1200 to 640 units/s over 1.25 seconds because the source omits its curve. The half-second recast gate starts at first cast declaration. The late recast/hit grace is 0.25 seconds, the midpoint of the recorded 0.2–0.3 range; its late hit checks the final claw point against unit hitboxes, because no separate endpoint radius is supplied. Recast is instant and free because no separate cost/cast time is supplied; its blink goes to the actual claw position and ends that projectile. The initial E is not movement and remains castable while grounded/rooted. Scalar terrain cannot reproduce the two-dimensional halfway-through-wall test; its blink crosses the line's terrain.");

    const rCooldown = r.cooldown(), rCost = r.cost(), rRange = r.field("targetRange"), iceRadius = r.field("effectRadius");
    const stunSeconds = r.quoted("stunning them for 1.5 seconds");
    const stasisSeconds = r.quoted("entering stasis for 2.5 seconds"), healInterval = r.quoted("healing herself every 0.25 seconds");
    const healMin = r.formula("Minimum Heal per Tick"); r.formula("Maximum Heal per Tick");
    r.formula("Minimum Total Heal"); r.formula("Maximum Total Heal");
    const healSeries = r.seriesIn("missing health at the time of cast");
    if (healSeries.kind !== "variable") throw new Error("Lissandra kit: missing-health heal series changed shape");
    const iceDamage = r.formula("Magic Damage"), iceSlow = r.fraction("Slow");
    const iceGrow = r.quoted("spreads out from the target over 1.5 seconds"), iceSeconds = r.quoted("covers the surrounding area for 3 seconds");
    const slowSeconds = r.quoted("slowing them for 0.5 seconds"), slowInterval = r.quoted("refreshing every 0.25 seconds");
    const iceDamageGate = r.quoted("can only be damaged by the field of ice once every 4 seconds");
    r.quote("Spell shield will block the single-targeted portion and the radiating ice damage, but will not stop it from spreading");
    r.quote("The ability is not cancelled by loss of sight of the target");
    r.quote("this ability will cancel but does not go on cooldown nor pay its cost");
    r.quote("Lissandra destroys enemy projectiles targeting her");
    kit.assume("Frozen Tomb's field has a fixed contact-position center, expands linearly through its first 1.5 seconds, and expires three seconds from creation. The source supplies neither its growth curve nor an explicit duration anchor or moving-center rule. First field entry is checked every simulation tick; slow refreshes then use quarter-second phases anchored to field creation. The damage opportunity is consumed by a guarded contact, including parry or invulnerability, rather than retried every slow pulse. The field preserves this cast's shield-blocked damage ledger while continuing to spread. Self R snapshots missing health once and heals on ten quarter-second pulses; ordinary CC restrictions still apply to declaring it.");
    kit.assume("The plain-stat budget values Frozen Tomb's one field damage hit, shared by either cast form. Its conditional self-healing and stasis are not independently added to that damage reference, avoiding credit for both enemy and self alternatives of the same cooldown. Actual combat selects one form and uses its healing and control.");

    const qHit: Effect[] = [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "slow", strength: qSlow, duration: qSlowSeconds }];
    const qSpec: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: "start", delivery: { kind: "line", range: qReach, travelRange: qFlight, width: qWidth, speed: shardSpeed, collisionPet: true }, onHit: qHit, flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") } };
    const wSpec: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "aura", radius: rootRadius }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "root", duration: rootSeconds }], flags: { spellShield: w.flag("spellShield") }, decisive: true };
    const eSpec: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cooldownAtCastStart: true, cost: e.cost(), castTime: e.castTime(), castDirection: "start", delivery: { kind: "line", range: clawRange, width: clawWidth, speed: clawSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: clawDamage }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield"), grounded: false } };
    const eRecast: AbilitySpec = { key: "E2", name: "Glacial Path (recast)", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { grounded: true }, roles: ["engage", "escape"], usable: (self, world) => self.memory.clawX !== undefined && world.tick >= Number(self.memory.clawUnlock ?? Infinity) && world.tick <= Number(self.memory.clawUntil ?? -1) };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: rCost, castTime: r.castTime("Enemy cast"), cancelOnInvalidTarget: true, retainTargetOnVisibilityLoss: true, delivery: { kind: "target", range: rRange }, onHit: [{ type: "damage", damageType: "magic", amount: iceDamage }, { type: "knockdown" }, { type: "cc", cc: "stun", duration: stunSeconds }, { type: "cc", cc: "slow", strength: iceSlow, duration: slowSeconds }], roles: ["damage", "cc"], flags: { spellShield: r.flag("spellShield") }, decisive: true };
    const selfR: AbilitySpec = { key: "Rself", name: "Frozen Tomb (self)", slot: "other", cooldownKey: "R", cooldown: rCooldown, cost: rCost, castTime: 0, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "stasis", duration: stasisSeconds }], roles: ["defense"] };
    const fieldSpec: AbilitySpec = { key: "Rice", name: "Frozen Tomb ice", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: [{ type: "damage", damageType: "magic", amount: iceDamage }, { type: "cc", cc: "slow", strength: iceSlow, duration: slowSeconds }], flags: { spellShield: r.flag("spellShield") }, usable: () => false };
    const abilities = [qSpec, wSpec, eSpec, rSpec, eRecast, selfR, fieldSpec];
    const shatter = (ctx: HookContext, missile: Missile, fromPet = false) => {
      missile.piercing = true;
      missile.travelLeft = Math.max(0, missile.direction * (Number(ctx.memory.shardEnd) - missile.x));
      if (fromPet && !missile.hitTargets?.includes(ctx.enemy.side)) {
        const distance = Math.max(0, missile.direction * (ctx.enemy.x - missile.x) - ctx.enemy.spec.base.radius);
        missile.scale = skillshotChance(ctx.world, ctx.enemy, missile.seenTick, distance / shardSpeed, shatteredWidth / 2);
        missile.connects = missile.scale > 0;
      }
    };
    const makeIce = (ctx: HookContext, center: number) => {
      ctx.memory.iceStart = ctx.tick; ctx.memory.iceDamaged = false; ctx.memory.iceBlocked = false;
      delete ctx.memory.iceLastInside; delete ctx.memory.iceSlowPhase;
      // Scan expanding contact each simulation tick; damage must not wait for a later
      // slow pulse. Slow refreshes retain the quarter-second clock separately.
      fieldAt(ctx, fieldSpec.key, center, 0, iceSeconds, 1 / 30, fieldSpec.onHit!);
      const zone = ctx.world.zones.at(-1)!;
      zone.noPets = true;
      ctx.memory.iceZone = zone.id;
      // The enemy cast's first field contact is part of its immediate targeted packet;
      // later field pulses refresh slow, preserving the linked damage/shield ledger.
      zone.nextTick = ctx.tick + 1;
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      const tradeCommand = mode === "trade" ? defaultBehavior(view) : undefined;
      if (mode === "trade" && self.memory.tradeDone) return tradeCommand;
      const incoming = view.threats.filter((t) => t.eta <= ticks(.5)).reduce((sum, t) => sum + t.damage, 0);
      if (canCast(world, self, selfR) && (self.hp / derive(self).maxHp < .4 || incoming >= self.hp * .7) && view.threats.length > 0) return { kind: "cast", ability: "Rself" };
      const reaction = react(view);
      if (reaction && reaction.kind === "cast" && reaction.ability !== "E2") return reaction;
      if (mode === "flee" && !self.action && canCast(world, self, eSpec)) return { kind: "cast", ability: "E", aim: { direction: -1, distance: clawRange } };
      if (!self.action && canCast(world, self, eRecast)) {
        const x = Number(self.memory.clawX), nextDistance = Math.abs(x - enemy.x);
        const nowDistance = Math.abs(self.x - enemy.x);
        if ((mode === "flee" && nextDistance > nowDistance + 100) || ((mode === "fight" || mode === "trade") && nextDistance < nowDistance && nextDistance <= rootRadius)) return { kind: "cast", ability: "E2" };
      }
      if (!self.action && mode !== "flee" && canCast(world, self, qSpec) && Math.abs(self.x - enemy.x) > qReach + enemy.spec.base.radius && Math.abs(self.x - enemy.x) <= qEnhancedRange + enemy.spec.base.radius) {
        const direction = directionTo(self, enemy);
        if (world.pets.some((pet) => pet.owner !== self.side && !pet.spec.untargetable && !pet.spec.hitPoints && direction * (pet.x - self.x) >= -pet.spec.radius && direction * (pet.x - self.x) <= qReach + pet.spec.radius)) return { kind: "cast", ability: "Q" };
      }
      return mode === "trade" ? tradeCommand : defaultBehavior(view);
    };
    return {
      abilities, behavior,
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "E") { ctx.memory.clawUnlock = ctx.tick + ticks(clawGate); if (ctx.aim) ctx.memory["castDirection:E"] = directionTo(ctx.self, ctx.enemy) * ctx.aim.direction; }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") ctx.memory.shardEnd = ctx.self.x + Number(ctx.memory["castDirection:Q"] ?? directionTo(ctx.self, ctx.enemy)) * qEnhancedRange;
          if (ctx.ability.key === "E") { ctx.memory.clawLaunch = ctx.tick; ctx.memory.clawUntil = Infinity; ctx.memory.clawX = ctx.self.x; ctx.memory.clawLateHit = false; }
          if (ctx.ability.key === "E2") {
            const claw = ctx.world.missiles.find((missile) => missile.owner === ctx.self.side && missile.source === "E");
            ctx.self.x = claw?.x ?? Number(ctx.memory.clawX);
            ctx.world.missiles = ctx.world.missiles.filter((missile) => missile !== claw);
            ctx.world.zones = ctx.world.zones.filter((zone) => zone.id !== Number(ctx.memory.clawLateZone ?? -1));
            delete ctx.memory.clawX; delete ctx.memory.clawUntil; delete ctx.memory.clawUnlock;
          }
          if (ctx.ability.key === "R") makeIce(ctx, ctx.enemy.x);
          if (ctx.ability.key === "Rself") {
            ctx.memory.healStart = ctx.tick; ctx.memory.healPulse = 1;
            const missing = missingShare(ctx.self);
            ctx.memory.healAmount = evaluate(healMin, ctx.self, ctx.enemy) * (1 + seriesAt(healSeries, missing * 100, true) / 100);
            makeIce(ctx, ctx.self.x);
          }
        },
        onTick(ctx) {
          const claw = ctx.world.missiles.find((missile) => missile.owner === ctx.self.side && missile.source === "E");
          if (claw) {
            ctx.memory.clawX = claw.x;
            claw.acceleration ??= { perTick: (clawMinimum - clawSpeed) / clawDecelerationSeconds / 900, minPerTick: clawMinimum / 30, maxPerTick: clawSpeed / 30 };
          }
          if (ctx.memory.clawX !== undefined && ctx.tick > Number(ctx.memory.clawUntil ?? -1)) { delete ctx.memory.clawX; delete ctx.memory.clawUntil; delete ctx.memory.clawUnlock; }
          const lateZone = ctx.world.zones.find((zone) => zone.id === Number(ctx.memory.clawLateZone ?? -1));
          if (lateZone && ctx.tick < lateZone.endTick) {
            const contacted = JSON.parse(String(ctx.memory.clawLatePets ?? "[]")) as number[];
            for (const pet of [...ctx.world.pets]) {
              if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || contacted.includes(pet.id) || Math.abs(pet.x - lateZone.x) > pet.spec.radius + 1e-6) continue;
              contacted.push(pet.id);
              damagePet(ctx.world, ctx.self, pet, evaluate(clawDamage, ctx.self, ctx.enemy) * (pet.spec.areaTaken ?? 1), "magic", false, "E");
            }
            ctx.memory.clawLatePets = JSON.stringify(contacted);
          }
          const ice = ctx.world.zones.find((zone) => zone.id === Number(ctx.memory.iceZone ?? -1));
          if (ice) {
            ice.radius = iceRadius * Math.min(1, Math.max(0, (ctx.tick - Number(ctx.memory.iceStart)) / ticks(iceGrow)));
            if (ctx.tick >= (ice.nextTick ?? ctx.tick) && ctx.tick < ice.endTick) {
              const petNext = JSON.parse(String(ctx.memory.icePetNext ?? "{}")) as Record<string, number>;
              for (const pet of [...ctx.world.pets]) {
                if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || ctx.tick < (petNext[pet.id] ?? -1) || Math.abs(pet.x - ice.x) > ice.radius + pet.spec.radius + 1e-6) continue;
                petNext[pet.id] = ctx.tick + ticks(iceDamageGate);
                damagePet(ctx.world, ctx.self, pet, evaluate(iceDamage, ctx.self, ctx.enemy) * (pet.spec.areaTaken ?? 1), "magic", false, "Rice");
              }
              ctx.memory.icePetNext = JSON.stringify(petNext);
            }
          }
          const pulse = Number(ctx.memory.healPulse ?? 0);
          if (pulse > 0 && pulse <= Math.round(stasisSeconds / healInterval) && ctx.tick >= Number(ctx.memory.healStart) + ticks(pulse * healInterval)) {
            ctx.apply({ type: "heal", amount: { base: Number(ctx.memory.healAmount) } }, true);
            ctx.memory.healPulse = pulse + 1;
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "E" && ctx.effects.some((effect) => effect.type === "damage" && effect.label === "glacialPathSink")) {
            if (ctx.memory.clawLateHit) return [];
            // A shielded/parried late contact consumes the same cast's hit opportunity,
            // just as the flight mover records contact before resolving its defenses.
            ctx.memory.clawLateHit = true;
          }
          if (ctx.ability.key === "R") {
            const ready = ctx.tick >= Number(ctx.memory.iceDamageNext ?? -1);
            ctx.memory.iceDamaged = ready;
            ctx.memory.iceLastInside = ctx.tick; ctx.memory.iceSlowPhase = 0;
            if (ready) ctx.memory.iceDamageNext = ctx.tick + ticks(iceDamageGate);
            if (ctx.defense === "spellShield") ctx.memory.iceBlocked = true;
            if (!ready) return ctx.effects.filter((effect) => effect.type !== "damage");
          }
          if (ctx.ability.key === "Rice") {
            const damageReady = !ctx.memory.iceBlocked && !ctx.memory.iceDamaged && ctx.tick >= Number(ctx.memory.iceDamageNext ?? -1);
            if (damageReady) { ctx.memory.iceDamaged = true; ctx.memory.iceDamageNext = ctx.tick + ticks(iceDamageGate); }
            if (damageReady && ctx.defense === "spellShield") ctx.memory.iceBlocked = true;
            const phase = Math.floor((ctx.tick - Number(ctx.memory.iceStart)) / (slowInterval * 30) + 1e-9);
            const slowReady = ctx.tick > Number(ctx.memory.iceLastInside ?? -2) + 1 || phase !== Number(ctx.memory.iceSlowPhase ?? -1);
            ctx.memory.iceLastInside = ctx.tick; ctx.memory.iceSlowPhase = phase;
            return ctx.effects.filter((effect) => effect.type === "damage" ? damageReady : effect.type !== "cc" || slowReady);
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") ctx.memory.clawLateHit = true;
        },
        onMissileContact(ctx) {
          if (ctx.missile.source === "Q" && !ctx.missile.piercing) shatter(ctx, ctx.missile, Boolean(ctx.targetPet));
          if (ctx.missile.source === "E") ctx.memory.clawX = ctx.missile.x;
        },
        onMissileEnd(ctx) {
          const missile = ctx.missile;
          if (missile.source === "E") {
            if (ctx.reason === "blocked" || ctx.reason === "intercepted") { delete ctx.memory.clawX; delete ctx.memory.clawUntil; delete ctx.memory.clawUnlock; }
            else {
              ctx.memory.clawX = missile.x; ctx.memory.clawUntil = ctx.tick + ticks(clawGrace);
              ctx.memory.clawLateHit = missile.hitTargets?.includes(ctx.enemy.side) ?? false;
              ctx.memory.clawLatePets = JSON.stringify(missile.hitPets ?? []);
              fieldAt(ctx, "E", missile.x, 0, clawGrace, 1 / 30, [{ type: "damage", damageType: "magic", amount: clawDamage, label: "glacialPathSink" }]);
              const zone = ctx.world.zones.at(-1)!; zone.noPets = true; ctx.memory.clawLateZone = zone.id;
            }
          }
          if (missile.source !== "Q" || ctx.reason !== "range" || missile.piercing) return;
          const circleX = missile.x + missile.direction * endpointOffset;
          let contact = false;
          if (missile.connects && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - circleX) <= endpointRadius + ctx.enemy.spec.base.radius + 1e-6 && !missile.hitTargets?.includes(ctx.enemy.side)) {
            (missile.hitTargets ??= []).push(ctx.enemy.side); contact = true;
            abilityHit(ctx.world, ctx.self, ctx.enemy, qSpec, qHit, missile.scale);
          }
          for (const pet of [...ctx.world.pets]) {
            if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || missile.hitPets?.includes(pet.id) || Math.abs(pet.x - circleX) > endpointRadius + pet.spec.radius + 1e-6) continue;
            (missile.hitPets ??= []).push(pet.id); contact = true;
            damagePet(ctx.world, ctx.self, pet, evaluate(qDamage, ctx.self, ctx.enemy) * (pet.spec.areaTaken ?? 1), "magic", false, "Q");
          }
          if (contact) {
            const shattered: Missile = { ...missile, id: ctx.world.nextId++, x: missile.x, hitTargets: [...(missile.hitTargets ?? [])], hitPets: [...(missile.hitPets ?? [])], ended: false };
            shatter(ctx, shattered, !shattered.hitTargets!.includes(ctx.enemy.side));
            ctx.world.missiles.push(shattered);
          }
        },
      },
    };
  },
};
export default lissandra;
