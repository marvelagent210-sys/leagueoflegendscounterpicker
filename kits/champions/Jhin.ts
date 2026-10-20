/** Jhin: four distinct rounds, reloads, bouncing grenades and finite Curtain Call. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackTiming, canCast, inReach } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petEffects, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlocked } from "../../engine/sim/projectileBlock";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Pet, Unit, Zone } from "../../engine/sim/state";
import { flat, missingShare, ticks } from "./util";

const CAUGHT = "jhin:caught", RELOAD = "jhin:reload";
const jhin: KitModule = {
  champion: "Jhin",
  build(kit) {
    const a = kit.ability("Basic Attack"), p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const maxAmmo = p.quoted("within 4 rounds"), reloadSeconds = p.quoted("reload over 2.5 seconds"), calmSeconds = p.quoted("after 10 seconds");
    const fourthMissing = p.levelValue("target's missing health") / 100;
    p.quote("final round attack has an uncancellable windup, always critically strikes");
    p.quote("The missing health damage benefits from life steal");
    p.quote("Attack damage reductions apply before the multiplier");
    p.quote("44% base modifier at level 18");
    // The parsed level series already retains the same game-file continuation at 19/20.
    const levelMultiplier = p.levelValue("Jhin gains bonus attack damage") / 100;
    p.gameQuote('"mLevel":12,"mBonusPerLevelAtAndAfter":0.03999999910593033');
    const rounded = (value: number) => Math.round(value * 1e6) / 1e6;
    const multiplier = { base: rounded(levelMultiplier), critChance: rounded(p.gameQuoted('"mCoefficient":0.3499999940395355')), bonusAttackSpeed: rounded(p.gameQuoted('"mCoefficient":0.30000001192092896')) };
    const speedBase = p.quoted("14% (+ 0.44% per 1% bonus attack speed)") / 100;
    const speedRatio = p.quoted("14% (+ 0.44% per 1% bonus attack speed)", 1), speedSeconds = p.quoted("for 2 seconds");
    const ordinarySpeed = a.field("speed", "Standard missile speed"), criticalSpeed = a.field("speed", "Critical strike missile speed");
    const criticalDamage = a.quoted("deal only 150% AD") / 100;
    a.quote("attack speed cannot be reduced, and can only be increased through growth");
    const qDamage = q.formula("Physical Damage"), qRange = q.field("targetRange"), bounceRange = q.field("effectRadius");
    const qSpeed = q.field("speed", "Initial"), bounceSpeed = q.field("speed", "Bounce");
    q.quote("up to three additional nearby enemies"); const bounceCount = 4;
    const bounceBonus = q.quoted("increased by 35%") / 100;
    q.quote("Spell shield will not prevent the canister from bouncing");
    const caughtSeconds = w.quoted("marked for 4 seconds"), wDamage = w.formula("Physical Damage"), wPetDamage = w.formula("Minion Damage");
    const wRoot = w.number("Root Duration"), wRange = w.field("range", "Estimated"), wWidth = w.field("width");
    w.quote("functionally is not a missile");
    w.quote("This ability will cast from wherever the caster is at the start of the cast time");
    const eDamage = e.formula("Magic Damage"), eReduced = e.formula("Reduced Damage"), eRange = e.field("targetRange");
    const eArm = e.quoted("after arming over 1 second"), eDuration = e.quoted("up to 180 seconds"), eRadius = e.field("effectRadius", "On-trigger reveal and explosion radius");
    const eTrigger = e.field("collisionRadius"), eSlow = e.quoted("by 35%") / 100, eBloom = e.quoted("for 2 seconds"), eFalloff = e.quoted("last 1 second");
    const eCharges = e.quoted("up to a maximum of 2"), eReveal = e.quoted("revealed for 4 seconds"), eRecharge = e.field("recharge");
    const lotus = kit.pet("Lotus Trap"), eHP = lotus.stat("hp");
    lotus.quote("stealths and becomes untargetable after 1 second");
    e.quote("Beauty in Death does not consume Lotus Trap charges");
    const rDamage = r.formula("Minimum Physical Damage per Bullet"), rRange = r.field("range"), rWidth = r.field("width"), rSpeed = r.field("speed");
    const rCooldown = r.cooldown(), rOpenCast = r.castTime("Active");
    const rDuration = r.quoted("up to 10 seconds"), rRounds = r.quoted("recast Curtain Call 4 times"), rShotCast = r.castTime("Recast");
    const rEmit = r.quoted("After 0.2 seconds into the cast time"), rSpacing = r.quoted("static cooldown of 1 second"), rFourth = r.quoted("critically strikes for 200%") / 100;
    const rSlow = r.quoted("slowing them by 80%") / 100, rSlowSeconds = r.quoted("for 0.5 seconds"), rReveal = r.quoted("revealing them for 2 seconds");
    const rMissing = r.seriesIn("based on target's missing health");
    if (rMissing.kind !== "variable") throw new Error("Jhin R missing-health source needs review");
    const rMissingMaximum = Number(rMissing.values.at(-1)) / 100;
    r.gameQuote("mSpell.mCantCancelWhileWindingUp: true"); r.gameQuote("mSpell.mDoesntBreakChannels: true");
    const caught = (self: Unit, target: Unit, tick: number) => target.petId === undefined && target.statuses.some((status) => status.kind === "mark" && status.key === CAUGHT && status.source === self.side && status.endTick > tick);
    const haste = (ctx: HookContext, chance = 1) => ctx.buff("jhin:criticalMove", "moveSpeedPercent", chance * (speedBase + speedRatio * derive(ctx.self).bonusAttackSpeed), speedSeconds);
    const mark = (ctx: HookContext, seconds = caughtSeconds) => { if (ctx.enemy.petId === undefined) ctx.apply({ type: "mark", key: CAUGHT, duration: seconds }); };
    const blast: AbilitySpec = { key: "Ebloom", name: e.name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "circle", range: eRange, radius: eRadius, delay: eBloom }, activation: "internal", usable: () => false, flags: { spellShield: e.flag("spellShield") }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage, amountFor: (self, target) => evaluate(target.petId !== undefined || Number(self.memory["jhinElast:champion"] ?? -Infinity) > Number(self.memory.jhinTick ?? 0) - ticks(eFalloff) ? eReduced : eDamage, self, target) }], roles: [] };
    const qBounce: AbilitySpec = { key: "Qbounce", name: q.name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "target", range: bounceRange, missileSpeed: bounceSpeed }, activation: "internal", usable: () => false, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: true, spellShield: q.flag("spellShield"), petContactHooks: true }, roles: [] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), delivery: { kind: "target", range: qRange, missileSpeed: qSpeed }, cancelOnInvalidTarget: true, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield"), petContactHooks: true }, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), castOrigin: "start", delivery: { kind: "line", range: wRange, width: wWidth }, onHit: [{ type: "damage", damageType: "physical", amount: wDamage }], flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield") }, roles: ["damage", "cc"], decisive: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), charges: { max: eCharges, recharge: eRecharge }, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, usable: (self, world) => Math.abs(world.units[1 - self.side]!.x - self.x) <= eRange + eTrigger, roles: ["damage", "cc"], estimate: (self, target) => evaluate(eDamage, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: r.cost(), castTime: rOpenCast, cooldownAfter: "channel", delivery: { kind: "self" }, channel: { duration: rDuration, interruptible: true }, roles: ["damage"], usable: (self, world) => Math.abs(world.units[1 - self.side]!.x - self.x) <= rRange, estimate: (self, target) => evaluate(rDamage, self, target) * (1 + rMissingMaximum * missingShare(target)), estimateDelay: (self, target) => rEmit + Math.max(0, Math.abs(target.x - self.x) - target.spec.base.radius) / rSpeed, flags: { projectile: true, spellShield: true } },
      qBounce, blast,
    ];
    for (let round = 1; round <= rRounds; round++) abilities.push({
      key: `R${round}`, name: `${r.name}: shot ${round}`, slot: "other", cooldown: rSpacing, cooldownKey: "Rshot", staticCooldown: true, cooldownAtCastStart: true, cost: 0, castTime: rShotCast, deliveryDuringCastAt: rEmit, castDirection: "start", preserveChannel: true, budgetExcluded: true, allowedDuringChannel: ["R"], delivery: { kind: "line", range: rRange, width: rWidth, radius: rWidth / 2, speed: rSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage, amountFor: (self, target) => evaluate(rDamage, self, target) * (round === rRounds ? rFourth : 1) * (1 + rMissingMaximum * missingShare(target)) }, { type: "cc", cc: "slow", strength: rSlow, duration: rSlowSeconds }], flags: { projectile: true, spellShield: true, petContactHooks: true }, usable: (self, world) => self.action?.kind === "channel" && self.action.ability === "R" && Number(self.memory.jhinRround ?? 0) === round - 1 && (world.units[1 - self.side]!.x - self.x) * Number(self.memory.jhinRdirection ?? 1) >= -world.units[1 - self.side]!.spec.base.radius, roles: ["damage", "cc"], decisive: true,
    });
    const setReload = (ctx: HookContext, soft: boolean) => {
      ctx.memory.jhinReloadUntil = ctx.tick + ticks(reloadSeconds); ctx.memory.jhinSoftReload = soft;
      if (!soft) { ctx.apply({ type: "state", state: "noAttacks", duration: reloadSeconds }, true); const status = ctx.self.statuses.at(-1); if (status?.key === "noAttacks") status.memoKey = RELOAD; }
    };
    const clearReload = (ctx: HookContext, refill: boolean) => {
      if (refill) ctx.memory.jhinAmmo = maxAmmo;
      delete ctx.memory.jhinReloadUntil; delete ctx.memory.jhinSoftReload;
      ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== RELOAD);
    };
    const bloom = (ctx: HookContext, zone: Zone) => {
      const petId = Number(zone.memory?.pet); ctx.world.pets = ctx.world.pets.filter((pet) => pet.id !== petId);
      zone.kind = "delayedArea"; zone.ability = "Ebloom"; zone.radius = eRadius; zone.startTick = ctx.tick; zone.endTick = ctx.tick + ticks(eBloom); zone.onHit = blast.onHit; zone.connects = true; zone.scale = 1; zone.noPets = true;
      zone.memory = { blooming: true };
      if (ctx.enemy.alive && Math.abs(ctx.enemy.x - zone.x) <= eRadius + 1e-6 && !isUntargetable(ctx.enemy, ctx.self)) mark(ctx, eReveal);
    };
    const place = (ctx: HookContext, x: number, immediate = false) => {
      const pet = immediate ? undefined : spawnPet(ctx.world, ctx.self, { kind: "lotus", name: lotus.name, hp: eHP, armor: 0, mr: 0, radius: 0, moveSpeed: 0, hitPoints: true, duration: eDuration }, x);
      const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: ctx.tick, x, radius: eTrigger, startTick: ctx.tick + ticks(eArm), endTick: ctx.tick + ticks(eDuration), ability: "E", noPets: true, memory: { pet: pet?.id ?? -1 } };
      ctx.world.zones.push(zone); if (immediate) bloom(ctx, zone);
    };
    interface Grenade { id: number; visited: string[]; damaged: string[]; deaths: string[]; contacts: number; pending?: { identity: string; x: number; tick: number } }
    const identity = (target: Unit | Pet) => "side" in target ? `champion:${target.side}` : `pet:${target.id}`;
    const grenade = (ctx: HookContext): Grenade | undefined => typeof ctx.memory[`jhinGrenade:${ctx.memory.jhinActiveGrenade}`] === "string" ? JSON.parse(String(ctx.memory[`jhinGrenade:${ctx.memory.jhinActiveGrenade}`])) as Grenade : undefined;
    const saveGrenade = (ctx: HookContext, state: Grenade) => { ctx.memory[`jhinGrenade:${state.id}`] = JSON.stringify(state); };
    const isDead = (ctx: HookContext, id: string) => id.startsWith("champion:") ? ctx.world.units[Number(id.slice(9)) as 0 | 1].hp <= 0 : !ctx.world.pets.some((pet) => pet.id === Number(id.slice(4)) && pet.hp > 0);
    const recordContact = (ctx: HookContext, missile: Missile, pet?: Pet) => {
      const state = grenade(ctx); if (!state || (missile.source !== "Q" && missile.source !== "Qbounce") || !ctx.memory[`jhinGrenadeValid:${missile.id}`]) return;
      const target = pet ?? ctx.enemy, id = identity(target);
      if (state.visited.includes(id)) return;
      state.visited.push(id); state.damaged.push(id); state.contacts += 1;
      state.pending = { identity: id, x: target.x, tick: ctx.tick + 1 };
      saveGrenade(ctx, state);
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return undefined;
      const { self, world, enemy } = view;
      if (self.action?.kind === "channel" && self.action.ability === "R") {
        if (view.mode === "flee" || self.memory.tradeDone) return { kind: "move", direction: -1 };
        const shot = abilities.find((spell) => spell.key === `R${Number(self.memory.jhinRround ?? 0) + 1}`);
        return shot && canCast(world, self, shot) && inReach(shot, self, enemy) ? { kind: "cast", ability: shot.key } : undefined;
      }
      const ordinary = defaultBehavior(view), reaction = react(view); if (reaction) return reaction;
      if (view.mode === "flee" || self.memory.tradeDone || self.action && self.action.kind !== "windup") return ordinary;
      const spell = (key: string) => abilities.find((candidate) => candidate.key === key)!;
      if (caught(self, enemy, world.tick) && canCast(world, self, spell("W")) && inReach(spell("W"), self, enemy)) return { kind: "cast", ability: "W" };
      if (canCast(world, self, spell("Q"))) return { kind: "cast", ability: "Q" };
      if ((view.mode === "fight" || view.mode === "kite") && view.distance > self.spec.attack.range && canCast(world, self, spell("R"))) return { kind: "cast", ability: "R" };
      if (ordinary?.kind === "cast" && ordinary.ability === "R" && view.distance <= self.spec.attack.range) return { kind: "attack" };
      return ordinary;
    };
    kit.assume("Whisper starts with four ordinary rounds and no free fourth shot. Ammunition is spent when the windup launches, so a canceled windup costs no round. The fourth shot is an uncancellable guaranteed 150% AD critical attack plus 25% of the target's missing health at impact, folded into its single life-stealing physical packet. R shots neither spend nor reload basic ammunition.");
    kit.assume("The wiki's AD table explicitly caps at level 18 (44%); the exact 16.20 game calculation continues its +4 percentage points per level beyond 18, giving 52% at this simulator's level 20. The model uses that versioned continuation, with six-decimal rounding of float32 coefficients, plus 35% of critical chance and 30% of all bonus attack speed. The 10-second idle reload and one-second trap arming retain the explicit wiki mechanics despite client constants of eight seconds and 0.75 seconds without corroborating server script.");
    kit.assume("Ordinary critical outcomes are averaged by the engine: Jhin's first three rounds use a probability-weighted missile speed from 2600 to 3000, and the two-second critical movement buff is multiplied by their declaration-time crit chance. The fourth uses 3000 and the full movement buff. Fixed basic attack speed includes growth only and ignores cripples, while all external bonus attack speed still increases AD and movement speed.");
    kit.assume("Dancing Grenade begins on the enemy champion, then bounces at most three times to the closest unvisited enemy champion or eligible non-ward pet within 450 units, with stable identity ties. A previously struck target's death before the next contact adds 35% of the original packet; it cannot hit the same target twice. Spell shields do not stop bouncing. There is no minion wave outside the actual summoned pets.");
    kit.assume("Deadly Flourish retains its start position but aims toward the enemy at completion. It is an instantaneous line intercepted by projectile walls and blockers despite having no travel speed. Enemy pets before its first champion collision take the pinned 25% minion reduction as area damage; a mark acquired from that same W hit cannot retroactively root. The source's estimated rear 20-unit extension is excluded from aimed forward duels.");
    kit.assume("Lotus Traps are placed after their cast and stop at an intervening projectile blocker. No validated throw speed is pinned, so placement has no additional invented flight. Their three-hit ward body is targetable for the first second and then untargetable; its unpinned body radius is represented by a point. Enemy champions or eligible enemy pets can bloom a trap. The slow is refreshed while actually inside the fixed two-second bloom, with normal CC immunity; each shield-guarded explosion is independent. Trap and Curtain Call reveals grant ordinary sight, so they never expose invisibility in the no-fog duel.");
    kit.assume("Curtain Call's one-second activation opens a ten-second stationary channel, with four separately cast 0.25-second shots and one-second intervals unaffected by haste. Its original facing fixes the cone on the duel axis. Shots pierce enemy pets, stop on the first champion even through a spell shield, evaluate missing health at contact and double the fourth packet. Versioned recast flags say its windup is uncancellable and does not break the parent channel; an announced shot therefore completes when ordinary CC interrupts the retained channel, an interpretation without server-script confirmation.");
    kit.assume("The budget values sustained basic rounds plus reload time, one full-health trap explosion per recharge, and all four base Curtain Call packets over the parent cooldown plus actual activation/recast duration. Manual shots are excluded from independent per-second ability estimates; conditional grenade kills and R missing-health escalation are not guaranteed. The combat policy establishes marks with Q/basic damage, prefers marked W, and channels R outside basic attack reach in fight/kite modes.");
    return {
      abilities, behavior, base: { critDamageModifier: criticalDamage / 2 }, statConversions: { attackDamageMultiplier: multiplier, fixedAttackSpeed: true }, attack: { range: a.field("attackRange"), onHitToPets: true },
      budget: { attacks: false, damage(self, target) { const d = derive(self), cycle = (maxAmmo - 1) / d.attackSpeed + reloadSeconds + attackTiming(self).windup / 30; return { physical: ((maxAmmo - 1) * d.ad * (1 + d.critChance * (criticalDamage - 1)) + d.ad * criticalDamage + fourthMissing * Math.max(0, derive(target).maxHp - target.hp)) / cycle + evaluate(rDamage, self, target) * (rRounds - 1 + rFourth) / (cooldownAfterHaste(rCooldown, d.abilityHaste) + rOpenCast + (rRounds - 1) * rSpacing + rShotCast), magic: evaluate(eDamage, self, target) / eRecharge }; } },
      hooks: {
        onStart(ctx) { ctx.memory.jhinAmmo = maxAmmo; ctx.memory.jhinLastCombat = ctx.tick; ctx.memory.jhinTick = ctx.tick; },
        onTick(ctx) {
          ctx.memory.jhinTick = ctx.tick;
          if (ctx.memory.jhinReloadUntil !== undefined && ctx.tick >= Number(ctx.memory.jhinReloadUntil)) clearReload(ctx, true);
          if (ctx.memory.jhinReloadUntil === undefined && Number(ctx.memory.jhinAmmo) < maxAmmo && ctx.tick - Number(ctx.memory.jhinLastCombat ?? ctx.tick) >= ticks(calmSeconds) && !ctx.self.action && !ctx.self.statuses.some((status) => status.kind === "cc")) setReload(ctx, true);
          for (const zone of [...ctx.world.zones]) {
            if (zone.owner !== ctx.self.side) continue;
            if (zone.ability === "E" && zone.kind === "trap") {
              const pet = ctx.world.pets.find((candidate) => candidate.id === Number(zone.memory?.pet));
              if (!pet) { ctx.world.zones = ctx.world.zones.filter((candidate) => candidate !== zone); continue; }
              if (ctx.tick >= zone.startTick) {
                if (!pet.spec.untargetable) pet.spec = { ...pet.spec, untargetable: true };
                const otherPet = ctx.world.pets.some((candidate) => candidate.owner !== ctx.self.side && !candidate.spec.untargetable && !candidate.spec.hitPoints && Math.abs(candidate.x - zone.x) <= eTrigger + candidate.spec.radius && !isUntargetable(petFormulaTarget(candidate, ctx.self, ctx.tick), ctx.self));
                if (otherPet || ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - zone.x) <= eTrigger + ctx.enemy.spec.base.radius) bloom(ctx, zone);
              }
            }
            if (zone.ability === "Ebloom" && ctx.tick < zone.endTick) {
              if (ctx.enemy.alive && Math.abs(ctx.enemy.x - zone.x) <= eRadius + ctx.enemy.spec.base.radius && !isUntargetable(ctx.enemy, ctx.self)) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "cc", cc: "slow", strength: eSlow, duration: 1 / 30 }, { ability: blast, scale: 1 });
              for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && Math.abs(pet.x - zone.x) <= eRadius + pet.spec.radius) petEffects(ctx.world, ctx.self, pet, [{ type: "cc", cc: "slow", strength: eSlow, duration: 1 / 30 }], "area", "Ebloom");
            }
          }
          for (const [key, raw] of Object.entries(ctx.memory)) {
            if (!key.startsWith("jhinGrenade:")) continue;
            const state = JSON.parse(String(raw)) as Grenade;
            for (const id of state.damaged) if (isDead(ctx, id) && !state.deaths.includes(id)) state.deaths.push(id);
            if (state.pending && ctx.tick >= state.pending.tick) {
              const pending = state.pending; delete state.pending;
              if (state.contacts < bounceCount) {
                const candidates: (Unit | Pet)[] = [...ctx.world.units.filter((unit) => unit.side !== ctx.self.side && unit.alive && unit.hp > 0 && !isUntargetable(unit, ctx.self)), ...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable && !isUntargetable(petFormulaTarget(pet, ctx.self, ctx.tick), ctx.self))];
                const next = candidates.filter((target) => !state.visited.includes(identity(target)) && Math.abs(target.x - pending.x) <= bounceRange + 1e-6).sort((x, y) => Math.abs(x.x - pending.x) - Math.abs(y.x - pending.x) || identity(x).localeCompare(identity(y)))[0];
                if (next) { const missileId = ctx.world.nextId++; ctx.memory[`jhinGrenadeMissile:${missileId}`] = state.id; ctx.world.missiles.push({ id: missileId, owner: ctx.self.side, source: "Qbounce", seenTick: ctx.tick, x: pending.x, perTick: bounceSpeed / 30, homing: true, direction: next.x >= pending.x ? 1 : -1, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: qBounce.onHit!, ...("side" in next ? {} : { pet: next.id }) }); }
              }
            }
            saveGrenade(ctx, state);
          }
        },
        onAttack(ctx) {
          if (ctx.memory.jhinSoftReload) clearReload(ctx, false);
          const fourth = Number(ctx.memory.jhinAmmo ?? maxAmmo) === 1;
          ctx.action.attackTag = fourth ? "jhin:fourth" : "jhin:ordinary";
          if (fourth) { ctx.action.uncancellable = true; ctx.action.critChance = 1; if (!ctx.targetPet?.spec.hitPoints) ctx.action.bonusPhysical = { base: 0, ratios: { targetMissingHP: fourthMissing } }; }
          const chance = ctx.action.critChance ?? derive(ctx.self).critChance;
          ctx.action.missileSpeed = ordinarySpeed + (criticalSpeed - ordinarySpeed) * chance;
        },
        onAttackLaunch(ctx) { ctx.memory.jhinAmmo = Math.max(0, Number(ctx.memory.jhinAmmo ?? maxAmmo) - 1); ctx.memory.jhinLastCombat = ctx.tick; if (ctx.memory.jhinAmmo === 0) setReload(ctx, false); },
        onAttackHit(ctx) { if (!ctx.blocked) haste(ctx, ctx.critChance); },
        onAttackPetHit(ctx) { if (!ctx.blocked) haste(ctx, ctx.critChance); },
        onDamageDealt(ctx) { if (ctx.amount + ctx.absorbed <= 0) return; ctx.memory.jhinLastCombat = ctx.tick; if (ctx.enemy.petId === undefined) mark(ctx); if (ctx.ability === e.name) ctx.memory["jhinElast:champion"] = ctx.tick; },
        onDamageTaken(ctx) { if (ctx.amount + ctx.absorbed > 0) ctx.memory.jhinLastCombat = ctx.tick; },
        onCastStart(ctx) {
          if (ctx.memory.jhinSoftReload) clearReload(ctx, false);
          if (ctx.ability.key === "Q") { const id = ctx.world.nextId++; ctx.memory.jhinActiveGrenade = id; ctx.memory[`jhinGrenadeStart:${ctx.tick}`] = id; saveGrenade(ctx, { id, visited: [], damaged: [], deaths: [], contacts: 0 }); }
          if (ctx.ability.key === "R") { ctx.memory.jhinRround = 0; ctx.memory.jhinRdirection = directionTo(ctx.self, ctx.enemy); }
          if (/^R[1-4]$/.test(ctx.ability.key)) { ctx.memory.jhinRround = Number(ctx.ability.key.slice(1)); ctx.memory[`castDirection:${ctx.ability.key}`] = Number(ctx.memory.jhinRdirection ?? directionTo(ctx.self, ctx.enemy)); }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") { const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * Math.min(eRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)); if (!projectileBlocked(ctx.world, ctx.self.side, ctx.self.x, x)) place(ctx, x); }
          if (ctx.ability.key === "W") {
            const origin = Number(ctx.memory["castOrigin:W"] ?? ctx.self.x), direction = directionTo(ctx.self, ctx.enemy), championFront = (ctx.enemy.x - origin) * direction - ctx.enemy.spec.base.radius;
            for (const pet of [...ctx.world.pets]) { const forward = (pet.x - origin) * direction; if (pet.owner !== ctx.self.side && forward >= -pet.spec.radius && forward <= wRange + pet.spec.radius && forward - pet.spec.radius <= championFront + 1e-6 && !projectileBlocked(ctx.world, ctx.self.side, origin, pet.x - direction * pet.spec.radius)) petEffects(ctx.world, ctx.self, pet, [{ type: "damage", damageType: "physical", amount: wPetDamage }], "area", "W"); }
          }
          if (ctx.ability.key === "R4" && ctx.self.action?.kind === "channel") ctx.self.action = undefined;
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && caught(ctx.self, ctx.enemy, ctx.tick)) return [...ctx.effects, { type: "cc", cc: "root", duration: wRoot }, { type: "caster", effects: [{ type: "stat", stat: "moveSpeedPercent", duration: speedSeconds, amount: { base: speedBase, ratios: { bonusAttackSpeed: speedRatio } } }] }];
          if (ctx.ability.key === "Q" || ctx.ability.key === "Qbounce") {
            const state = grenade(ctx); if (state) { for (const id of state.damaged) if (isDead(ctx, id) && !state.deaths.includes(id)) state.deaths.push(id); saveGrenade(ctx, state); } const scale = 1 + bounceBonus * (state?.deaths.length ?? 0);
            return [{ type: "damage", damageType: "physical", amount: qDamage, amountFor: (self, target) => evaluate(qDamage, self, target) * scale }];
          }
          if (/^R[1-4]$/.test(ctx.ability.key) && ctx.enemy.petId !== undefined) return ctx.effects.filter((effect) => effect.type === "damage");
        },
        onAbilityHit(ctx) {
          if (/^R[1-4]$/.test(ctx.ability.key)) mark(ctx, rReveal);
        },
        onMissileContact(ctx) {
          recordContact(ctx, ctx.missile, ctx.targetPet);
          if (/^R[1-4]$/.test(ctx.missile.source) && !ctx.targetPet) ctx.missile.ended = true;
        },
        onMissileMove(ctx) {
          if (ctx.missile.source !== "Q" && ctx.missile.source !== "Qbounce") return;
          const id = ctx.memory[`jhinGrenadeMissile:${ctx.missile.id}`] ?? ctx.memory[`jhinGrenadeStart:${ctx.missile.seenTick}`];
          if (id !== undefined) { ctx.memory.jhinActiveGrenade = id; ctx.memory[`jhinGrenadeMissile:${ctx.missile.id}`] = id; }
          const pet = ctx.missile.pet === undefined ? undefined : ctx.world.pets.find((candidate) => candidate.id === ctx.missile.pet), target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.enemy;
          ctx.memory[`jhinGrenadeValid:${ctx.missile.id}`] = target.alive && target.hp > 0 && !isUntargetable(target, ctx.self);
        },
        onZoneTrigger(ctx) { if (ctx.zone.ability === "E") bloom(ctx, ctx.zone); },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "Ebloom") return;
          for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.zone.x) <= ctx.zone.radius + pet.spec.radius) {
            const before = pet.hp; petEffects(ctx.world, ctx.self, pet, blast.onHit!, "area", "Ebloom"); if (pet.hp < before) ctx.memory[`jhinElast:pet:${pet.id}`] = ctx.tick;
          }
        },
        onKill(ctx) { if (!ctx.pet) place(ctx, ctx.victim.x, true); },
      },
    };
  },
};
export default jhin;
