/** Ziggs' ground objects retain their cast identity in copied world state. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, evaluate, hasState } from "../../engine/sim/derived";
import { areaOnPets, petEffects } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Aim, Unit, Zone } from "../../engine/sim/state";
import { ticks } from "./util";

const ziggs: KitModule = {
  champion: "Ziggs",
  options: {
    firstBounceShare: { label: "Share of extra bomb range on first bounce (325/550 from pinned maximum distances)", default: 325 / 550 },
    innerMineRadius: { label: "Assumed unmeasured inner mine-ring radius", default: 100 },
  },
  build(kit, options) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const passive: Formula = { base: p.levelValue("bonus magic damage"), ratios: { AP: p.quoted("(+ 50% AP)") / 100 } };
    const fuseCooldown = p.field("staticCooldown"), fuseRefund = p.levelValue("cooldown is reduced");
    p.quote("The cooldown reduction is granted at the start of the abilities' cast time");
    p.quote("Short Fuse will go on cooldown but not deal any damage if the attack misses due to blind");
    const qRange = q.field("targetRange"), qMaximum = q.field("range"), qRadius = q.field("effectRadius"), qTrigger = q.field("collisionRadius"), qSpeed = q.field("speed"), qDamage = q.formula("Magic Damage");
    const bounceSeconds = q.quoted("each bounce occurring over 0.495 seconds");
    const firstMaximum = q.gameQuoted("mSpell.DataValues.MaxRangeFirstBounce.values: [325,325,325,325,325,325,325]"), secondMaximum = q.gameQuoted("mSpell.DataValues.MaxRangeSecondBounce.values: [225,225,225,225,225,225,225]");
    if (Math.abs(qRange + firstMaximum + secondMaximum - qMaximum) > 1e-6) throw new Error("Ziggs pinned Q landing maxima do not match its total reach");
    q.quote("bounces forward up to two times"); q.quote("Bouncing Bomb can be thrown or bounce over units/terrain");
    q.quote("towards the pre-clamped cast location");
    const firstShare = options.firstBounceShare ?? firstMaximum / (firstMaximum + secondMaximum), innerMineRadius = options.innerMineRadius ?? 100;
    if (!Number.isFinite(firstShare) || firstShare < 0 || firstShare > 1) throw new Error("Ziggs firstBounceShare must be between zero and one");
    if (!Number.isFinite(innerMineRadius) || innerMineRadius < 0 || innerMineRadius > 200) throw new Error("Ziggs innerMineRadius must be between zero and the sourced outer radius 200");
    const wRange = w.field("targetRange"), wRadius = w.field("effectRadius", "explosion"), wSpeed = w.field("speed"), wDamage = w.formula("Magic Damage");
    const wLifetime = w.quoted("remaining there for 4 seconds"), pushSeconds = w.quoted("over 0.5 seconds"), pushMaximum = w.quoted("up to 500 units"), selfMaximum = w.quoted("up to 825 units");
    w.gameQuoted('"mSpeed":1750');
    const gameSelfMaximum = w.gameQuoted("mSpell.DataValues.KnockbackDistanceAlly.values: [775,775,775,775,775,775,775]");
    w.quote("If recast while in flight, the charge will explode immediately upon landing");
    w.quote("Detonating the ability manually does not"); w.quote("He can cast any of his abilities during the dash");
    w.quote("resulting in being knocked straight up when aligned directly on top of it");
    w.baseOf("Demolition Threshold");
    const eRange = e.field("targetRange"), eFieldRadius = e.field("effectRadius", "Effective"), mineRadius = e.field("effectRadius", "individual"), eSpeed = e.field("speed");
    const mineCount = e.quoted("a cluster of 11 proximity mines"), mineArm = e.quoted("arming after 0.5 seconds"), mineLifetime = e.quoted("for up to 10 seconds");
    const mineDamage = e.formula("Magic Damage per Mine"), mineReduced = e.formula("Reduced Damage per Mine"), mineMaximum = e.formula("Maximum Total Magic Damage"), mineSlow = e.fraction("Slow"), mineSlowSeconds = e.quoted("slowing them for 1.5 seconds");
    const innerCount = e.quoted("3 mines in the inner ring"), outerCount = e.quoted("8 mines on the other ring"), outerRadius = e.quoted("(200 radius)");
    e.quote("The angular offset is randomized on each cast"); e.quote("Mines will not explode upon contact with player-generated terrain"); e.quote("Spell shield will block the effects of a single detonation");
    const rRange = r.field("targetRange"), rRadius = r.field("effectRadius", "Explosion"), rInner = r.field("innerRadius"), rSpeed = r.field("speed"), rDamage = r.formula("Epicenter Magic Damage"), rOuter = r.formula("Reduced Damage");
    const rShortDelay = r.quoted("1.617 seconds from the start of the cast time"), rShortRange = r.quoted("when casting within 2700 units");
    r.quote("2.64 seconds from the start of the cast time"); r.flag("projectile");
    kit.assume("Short Fuse starts ready. Eligibility is captured when an attack windup is declared; its static twelve-second cooldown starts on launch, so an interrupted windup does not consume it. Blind, parry, dodge and block consume a launched proc; the last three interactions are unresolved in the pinned source. The captured separate magic packet never critically strikes and does not consume ordinary attack spell shields.");
    kit.assume("Bouncing Bomb has three landing checks, each using the separate 180-unit detection radius, and only one 240-radius explosion. Version-pinned game data supplies first/second maximum bounce distances 325/225. The source does not establish short-throw scaling: total additional range is assumed to scale linearly with original throw length, with the firstBounceShare option defaulting to 325/550. Each bounce uses the pinned 0.495-second clock; cumulative absolute times are rounded once. Arc height and transverse wall interception are outside the one-axis model.");
    kit.assume(`Satchel Charge enemy push uses a linear proximity curve from the sourced 500-unit maximum, but has zero horizontal movement exactly at its center as explicitly sourced. Self travel uses the pinned wiki maximum825 rather than the conflicting version-pinned game KnockbackDistanceAlly ${gameSelfMaximum}, a linear proximity curve, a chosen 0.5-second dash duration, and direction away from the satchel (away from the rival at exact center); these curves and self speed are not pinned. The game movement-component speed1750 describes the thrown projectile and does not prove self-dash speed. Terrain stops the push without granting a wall stun. The self dash is independent of the rival's defenses and is suppressed by immobilization or grounding.`);
    kit.assume("Minefield's unmeasured inner-ring radius is the explicit innerMineRadius option. Its three inner and eight outer mines are equally spaced in two dimensions and projected onto the duel line with circle/gameplay-hitbox intersections; whether the source's detection radius is center-only is unresolved. A rival with radius 65 exactly at field center can therefore touch all eight outer 200-radius mines in this model. A deterministic cast-ordinal angular phase stands in for the sourced random rotation and is preserved on copied branches. Mines arm 0.5 seconds after the initial projectile lands and last ten seconds from arming. A shielded contact consumes that mine and the victim's first-hit allowance; each victim/cast has its own falloff. Player terrain does not consume mines.");
    kit.assume("Mega Inferno Bomb lands 1.617 seconds after declaration through 2700 range, then adds (distance-2700)/2250; this continuous interpolation reproduces the pinned rounded 2.64-second maximum despite the source's omitted launch overhead. Epicenter uses rival center within 250; outer explosion intersects gameplay hitbox within 525. It is not projectile-blockable. Sight/reveal does not grant true sight.");
    kit.assume("Manual bomb bounces, satchel and finite mine objects use actual one-axis spatial outcomes; transverse evasion probability is not fabricated. Normal-HP enemy pets can trigger bombs/mines and receive spatial area damage with individual mine falloff. When champion and pet touch a mine on the same tick the champion is the trigger, but all overlapping victims receive the explosion. Short Fuse on pet-directed basic attacks remains outside the current attack-pet API. No champion receives Satchel Charge's turret-only execute.");
    kit.assume("The stat budget assumes one Q explosion, one W explosion, three mines per E (one full plus two 40% hits), and one epicenter R per cooldown. Short Fuse rate is bounded by attack speed and continuous six-second refunds from valid initial casts; clipping, misses and mana limits remain fight-simulation effects. Recasts add no independent damage/cost term.");

    const rootUsable = (self: Unit) => self.action === undefined || self.action.kind === "windup" || (self.action.kind === "dash" && self.action.ability === "satchelDash" && self.action.resume === undefined);
    const internal = (key: string, name: string, onHit: Effect[] = []): AbilitySpec => ({ key, name, slot: "other", cooldown: 0, castTime: 0, activation: "internal", delivery: { kind: "self" }, onHit, usable: () => false, roles: [] });
    const satchelHit = internal("satchelHit", `${w.name}: detonation`, [{ type: "damage", damageType: "magic", amount: wDamage }]);
    const mineHit = internal("mineHit", e.name);
    const dashAbility = { ...internal("satchelDash", `${w.name}: self dash`), delivery: { kind: "dash", direction: "away", distance: selfMaximum, speed: selfMaximum / pushSeconds, through: true } } satisfies AbilitySpec;
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), overlay: true, usable: rootUsable, delivery: { kind: "circle", range: qRange, radius: qRadius, delay: 10 }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }], flags: { projectile: true, spellShield: q.flag("spellShield") }, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cooldownAtCastStart: true, chainCooldown: "first", cost: w.cost(), castTime: w.castTime(), overlay: true, usable: rootUsable, delivery: { kind: "circle", range: wRange, radius: wRadius, delay: 0, speed: wSpeed }, onHit: [], flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield") }, roles: ["damage", "cc"], estimate: (self, target) => evaluate(wDamage, self, target) },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, usable: rootUsable, delivery: { kind: "circle", range: eRange, radius: eFieldRadius, delay: 0, speed: eSpeed }, onHit: [], flags: { projectile: true, spellShield: true }, roles: ["damage", "cc"], estimate: (self, target) => evaluate(mineDamage, self, target) + 2 * evaluate(mineReduced, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, usable: rootUsable, delivery: { kind: "circle", range: rRange, radius: rRadius, delay: rShortDelay }, onHit: [{ type: "damage", damageType: "magic", amount: rOuter }], flags: { projectile: false, spellShield: r.flag("spellShield") }, roles: ["damage"], estimate: (self, target) => evaluate(rDamage, self, target) - evaluate(rOuter, self, target) },
      { key: "Wdetonate", name: `${w.name}: detonate`, slot: "other", cooldown: 0, castTime: 0, activation: "internal", overlay: true, delivery: { kind: "self" }, chain: { root: "W", index: 2, window: wLifetime + wRange / wSpeed + 1 }, usable: (self, world) => world.zones.some((zone) => zone.owner === self.side && zone.ability === "W") && rootUsable(self), roles: [] },
      satchelHit, mineHit, dashAbility,
    ];
    const qAbility = abilities[0]!, wAbility = abilities[1]!, eAbility = abilities[2]!, rAbility = abilities[3]!, detonateAbility = abilities[4]!;
    const capture = (ctx: HookContext & { aim?: Aim }, key: string, range: number) => {
      const direction = ctx.enemy.x >= ctx.self.x ? 1 : -1, distance = Math.min(range, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
      ctx.memory[`ziggs:${key}:location`] = ctx.self.x + direction * (ctx.aim?.direction ?? 1) * distance;
      ctx.memory[`ziggs:${key}:direction`] = direction * (ctx.aim?.direction ?? 1);
      ctx.memory[`ziggs:${key}:distance`] = distance; ctx.memory[`ziggs:${key}:declared`] = ctx.tick;
    };
    const launchGround = (ctx: HookContext, zone: Zone, from: number, flightTicks: number, projectile = true) => {
      const distance = Math.abs(zone.x - from), span = Math.max(1, flightTicks);
      zone.endTick = distance > 0 ? Number.POSITIVE_INFINITY : ctx.tick + span - 1;
      if (distance === 0) return;
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: zone.ability ?? "Q", seenTick: zone.seenTick, x: from, direction: zone.x > from ? 1 : -1, perTick: distance / span, homing: false, travelLeft: distance, projectile, connects: false, scale: 1, onHit: [], landingZone: { id: zone.id, delayTicks: 0 } });
    };
    const detonate = (ctx: HookContext, zone: Zone) => {
      if (zone.memory?.detonated) return;
      (zone.memory ??= {}).detonated = true; zone.endTick = ctx.tick;
      const center = zone.x, distance = Math.abs(ctx.enemy.x - center);
      if (distance <= wRadius + ctx.enemy.spec.base.radius) {
        const push = distance <= 1e-6 ? 0 : pushMaximum * Math.max(0, 1 - distance / wRadius);
        abilityHit(ctx.world, ctx.self, ctx.enemy, satchelHit, [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "displace", direction: "away", originX: center, distance: push, duration: pushSeconds, stopAtWall: true }]);
      }
      areaOnPets(ctx.world, ctx.self, center - wRadius, center + wRadius, satchelHit.onHit!);
      const selfDistance = Math.abs(ctx.self.x - center), immobilized = [...ccTypes(ctx.self)].some((cc) => ["stun", "root", "airborne", "suppression", "sleep", "suspension", "charm", "taunt", "fear", "berserk", "ground"].includes(cc));
      if (selfDistance <= wRadius && !immobilized && !hasState(ctx.self, "stasis")) {
        const direction = ctx.self.x === center ? (ctx.self.x >= ctx.enemy.x ? 1 : -1) : Math.sign(ctx.self.x - center);
        const travel = selfMaximum * Math.max(0, 1 - selfDistance / wRadius);
        const resume = ctx.self.action?.kind === "cast" ? ctx.self.action : undefined;
        ctx.self.action = { kind: "dash", ability: dashAbility.key, startTick: ctx.tick, endTick: ctx.tick + ticks(pushSeconds), perTick: direction * travel / ticks(pushSeconds), stopAtContact: false, unstoppable: false, ...(resume ? { resume } : {}) };
      }
      delete ctx.self.chains.W;
    };
    const minePets = (ctx: HookContext, zone: Zone) => {
      const transverse = Number(zone.memory?.transverse ?? 0), cast = Number(zone.memory?.cast ?? 0);
      for (const pet of [...ctx.world.pets]) {
        if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || (pet.x - zone.x) ** 2 + transverse ** 2 > (mineRadius + pet.spec.radius) ** 2 + 1e-6) continue;
        const key = `ziggs:mineHit:${ctx.self.side}:${cast}`, prior = Number(pet.memory[key] ?? 0); pet.memory[key] = prior + 1;
        petEffects(ctx.world, ctx.self, pet, [{ type: "damage", damageType: "magic", amount: prior > 0 ? mineReduced : mineDamage }, { type: "cc", cc: "slow", strength: mineSlow, duration: mineSlowSeconds }], "area", mineHit.key);
      }
    };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      const satchel = view.world.zones.find((zone) => zone.owner === view.self.side && zone.ability === "W" && !zone.memory?.detonated);
      if (satchel && canCast(view.world, view.self, detonateAbility) && !view.self.memory.tradeDone && view.mode !== "idle") {
        const useful = Math.abs(view.enemy.x - satchel.x) <= wRadius + view.enemy.spec.base.radius || ((view.mode === "flee" || view.mode === "kite") && Math.abs(view.self.x - satchel.x) <= wRadius);
        if (useful) return { kind: "cast", ability: "Wdetonate" };
      }
      if (command?.kind === "cast" && command.ability === "W" && (view.mode === "flee" || (view.mode === "kite" && view.distance < view.enemy.spec.attack.range + 100))) return { ...command, aim: { direction: 1, distance: Math.min(100, Math.max(0, Math.abs(view.enemy.x - view.self.x) / 2)) } };
      return command;
    };
    return {
      abilities, behavior,
      hooks: {
        onStart(ctx) { ctx.memory.shortFuseReady = 0; ctx.memory.mineCast = 0; },
        onAttack(ctx) {
          const action = ctx.self.action;
          const captured = ctx.tick >= Number(ctx.memory.shortFuseReady ?? 0) && action?.kind === "windup";
          ctx.memory.fuseLaunch = captured;
          if (captured && action?.kind === "windup") action.onHit = [...action.onHit, { type: "damage", damageType: "magic", amount: passive, label: p.name }];
        },
        onAttackLaunch(ctx) { if (ctx.memory.fuseLaunch) ctx.memory.shortFuseReady = ctx.tick + ticks(fuseCooldown); ctx.memory.fuseLaunch = false; },
        onCastStart(ctx) {
          if (["Q", "W", "E", "R"].includes(ctx.ability.key)) {
            ctx.memory.shortFuseReady = Math.max(ctx.tick, Number(ctx.memory.shortFuseReady ?? 0) - ticks(fuseRefund));
            if (ctx.self.action?.kind !== "windup") ctx.memory.fuseLaunch = false;
            capture(ctx, ctx.ability.key, ctx.ability.key === "Q" ? qRange : ctx.ability.key === "W" ? wRange : ctx.ability.key === "E" ? eRange : rRange);
          }
          if (ctx.ability.key === "E") ctx.memory.mineCast = Number(ctx.memory.mineCast ?? 0) + 1;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory.qLaunchOrigin = ctx.self.x; ctx.memory.qLaunchTick = ctx.tick; }
          if (ctx.ability.key === "Wdetonate") for (const zone of ctx.world.zones) if (zone.owner === ctx.self.side && zone.ability === "W") { (zone.memory ??= {}).requested = true; if (zone.memory.landed) detonate(ctx, zone); }
        },
        onTick(ctx) {
          for (const zone of ctx.world.zones) {
            if (zone.owner !== ctx.self.side) continue;
            const memory = zone.memory ??= {};
            if (zone.ability === "mineHit") {
              // Gnar and other form changes can resize a victim after the field lands.
              const transverse = Number(memory.transverse ?? 0), combined = mineRadius + ctx.enemy.spec.base.radius;
              zone.radius = Math.abs(transverse) > combined ? -1 : Math.sqrt(Math.max(0, combined * combined - transverse * transverse));
            }
            if (zone.ability === "mineHit" && ctx.tick >= zone.startTick && ctx.tick < zone.endTick) {
              const championTriggers = ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - zone.x) <= zone.radius + 1e-6;
              if (!championTriggers) {
                const transverse = Number(memory.transverse ?? 0);
                const petTriggers = ctx.world.pets.some((pet) => pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && (pet.x - zone.x) ** 2 + transverse ** 2 <= (mineRadius + pet.spec.radius) ** 2 + 1e-6);
                if (petTriggers) { minePets(ctx, zone); zone.endTick = ctx.tick; }
              }
            }
            if (zone.ability === "Q" && !memory.prepared) {
              memory.prepared = true; memory.landing = 0;
              // Real flight and landing overlap replace the generic placeholder's
              // provisional lateral-miss calculation, including its threat scaling.
              zone.connects = true; zone.scale = 1;
              zone.x = Number(ctx.memory["ziggs:Q:location"]); memory.origin = Number(ctx.memory.qLaunchOrigin); memory.direction = zone.x >= Number(memory.origin) ? 1 : -1; memory.throw = Math.abs(zone.x - Number(memory.origin));
              memory.start = Number(ctx.memory.qLaunchTick); memory.firstSeconds = Math.abs(zone.x - Number(memory.origin)) / qSpeed;
              launchGround(ctx, zone, Number(memory.origin), Math.max(1, ticks(Number(memory.firstSeconds))));
            }
            if (zone.ability === "R" && !memory.prepared) {
              memory.prepared = true; zone.x = Number(ctx.memory["ziggs:R:location"]);
              const distance = Number(ctx.memory["ziggs:R:distance"]), total = rShortDelay + Math.max(0, distance - rShortRange) / rSpeed;
              zone.endTick = Number(ctx.memory["ziggs:R:declared"]) + ticks(total);
              zone.bands = [{ from: zone.x - rInner, to: zone.x + rInner, onHit: [{ type: "damage", damageType: "magic", amount: rDamage }] }];
              zone.connects = true; zone.scale = 1;
            }
            if ((zone.ability === "W" || zone.ability === "E") && !memory.prepared) {
              memory.prepared = true;
              zone.connects = true; zone.scale = 1;
              zone.x = Number(ctx.memory[`ziggs:${zone.ability}:location`]); memory.cast = Number(ctx.memory.mineCast ?? 0); memory.direction = Number(ctx.memory[`ziggs:${zone.ability}:direction`]);
              const missile = ctx.world.missiles.find((candidate) => candidate.landingZone?.id === zone.id);
              if (missile) { missile.direction = zone.x >= missile.x ? 1 : -1; missile.travelLeft = Math.abs(zone.x - missile.x); }
            }
            if (zone.ability === "W" && memory.landed && !memory.detonated && (memory.requested || ctx.tick >= zone.endTick)) detonate(ctx, zone);
          }
        },
        onZoneLand(ctx) {
          const zone = ctx.zone, memory = zone.memory ??= {};
          if (zone.ability === "Q") {
            const landing = Number(memory.landing ?? 0);
            const nearChampion = ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - zone.x) <= qTrigger + ctx.enemy.spec.base.radius;
            const nearPet = ctx.world.pets.some((pet) => pet.owner !== ctx.self.side && !pet.spec.untargetable && !pet.spec.hitPoints && Math.abs(pet.x - zone.x) <= qTrigger + pet.spec.radius);
            const terrain = ctx.world.terrain.some((wall) => zone.x >= wall.from && zone.x <= wall.to);
            if (nearChampion || nearPet || terrain || landing >= 2) { zone.radius = qRadius; zone.onHit = qAbility.onHit; zone.connects = true; zone.scale = 1; return; }
            zone.onHit = []; zone.connects = false; zone.noPets = true;
            const throwLength = Number(memory.throw), extra = throwLength * (qMaximum - qRange) / qRange;
            const distance = extra * (landing === 0 ? firstShare : 1 - firstShare);
            const next: Zone = { ...zone, id: ctx.world.nextId++, x: zone.x + Number(memory.direction) * distance, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, onHit: qAbility.onHit, connects: true, scale: 1, noPets: false, memory: { ...memory, landing: landing + 1 } };
            const absolute = Number(memory.start) + ticks(Number(memory.firstSeconds) + (landing + 1) * bounceSeconds);
            ctx.world.zones.push(next); launchGround(ctx, next, zone.x, Math.max(1, absolute - ctx.tick));
          } else if (zone.ability === "W") {
            memory.landed = true; zone.kind = "field"; zone.onHit = []; zone.nextTick = Number.POSITIVE_INFINITY; zone.endTick = ctx.tick + ticks(wLifetime);
            if (ctx.self.chains.W) ctx.self.chains.W.until = zone.endTick;
            if (memory.requested) detonate(ctx, zone);
          } else if (zone.ability === "E") {
            zone.onHit = []; zone.connects = false; zone.noPets = true;
            const cast = Number(memory.cast ?? ctx.memory.mineCast ?? 1), phase = ((cast * 0.6180339887498949) % 1) * Math.PI * 2;
            const direction = Number(memory.direction ?? (ctx.enemy.x >= ctx.self.x ? 1 : -1));
            for (let index = 0; index < mineCount; index += 1) {
              const inner = index < innerCount, count = inner ? innerCount : outerCount, ordinal = inner ? index : index - innerCount;
              const angle = phase + ordinal * Math.PI * 2 / count, radius = inner ? innerMineRadius : outerRadius;
              const transverse = Math.sin(angle) * radius, combined = mineRadius + ctx.enemy.spec.base.radius;
              ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: zone.seenTick, x: zone.x + direction * Math.cos(angle) * radius, radius: Math.abs(transverse) > combined ? -1 : Math.sqrt(Math.max(0, combined * combined - transverse * transverse)), centered: true, startTick: ctx.tick + ticks(mineArm), endTick: ctx.tick + ticks(mineArm + mineLifetime), ability: mineHit.key, onHit: [{ type: "damage", damageType: "magic", amount: mineDamage, label: `ziggsMine:${cast}` }, { type: "cc", cc: "slow", strength: mineSlow, duration: mineSlowSeconds }], scale: 1, connects: true, noPets: true, memory: { cast, transverse, mineRadius, origin: zone.x } });
            }
          } else if (zone.ability === "R") {
            for (const pet of [...ctx.world.pets]) {
              if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || Math.abs(pet.x - zone.x) > rRadius + pet.spec.radius) continue;
              petEffects(ctx.world, ctx.self, pet, [{ type: "damage", damageType: "magic", amount: Math.abs(pet.x - zone.x) <= rInner ? rDamage : rOuter }], "area", "R");
            }
            zone.noPets = true;
          }
        },
        onZoneTrigger(ctx) { if (ctx.zone.ability === mineHit.key) minePets(ctx, ctx.zone); },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== mineHit.key) return;
          const damage = ctx.effects.find((effect) => effect.type === "damage"), cast = damage?.type === "damage" ? damage.label : "";
          const memo = `ziggs:mineHit:${ctx.self.side}:${cast}`;
          const previous = Number(ctx.enemy.memory[memo] ?? 0); ctx.enemy.memory[memo] = previous + 1;
          return ctx.effects.map((effect) => effect.type === "damage" ? { ...effect, amount: previous > 0 ? mineReduced : mineDamage } : { ...effect });
        },
      },
      budget: { damage(self, target) {
        const d = derive(self);
        const rate = (ability: AbilitySpec) => 1 / (cooldownAfterHaste(ability.cooldown, d.abilityHaste) + ability.castTime);
        const castRate = [qAbility, wAbility, eAbility, rAbility].reduce((sum, ability) => sum + rate(ability), 0);
        const procRate = Math.min(d.attackSpeed, (1 + fuseRefund * castRate) / fuseCooldown);
        return { magic: evaluate(passive, self, target) * procRate + evaluate(wDamage, self, target) * rate(wAbility) + (evaluate(mineDamage, self, target) + 2 * evaluate(mineReduced, self, target)) * rate(eAbility) + (evaluate(rDamage, self, target) - evaluate(rOuter, self, target)) * rate(rAbility) };
      } },
    };
  },
};
export default ziggs;
