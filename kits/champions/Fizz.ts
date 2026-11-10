/** Fizz: actual bleed/empowered contacts, two-hop untargetability, attached delayed shark. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, react, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, directionTo, inStasis } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Zone } from "../../engine/sim/state";
import { FOREVER, areaAt, ticks } from "./util";

const fizz: KitModule = {
  champion: "Fizz",
  build(kit) {
    const p = kit.ability("Nimble Fighter"), q = kit.ability("Urchin Strike"), w = kit.ability("Seastone Trident"), e = kit.ability("Playful"), e2 = kit.ability("Trickster"), r = kit.ability("Chum the Waters");
    const reduction = p.quoted("damage taken by 4 (+ 1% AP)", 0), reductionAp = p.quoted("damage taken by 4 (+ 1% AP)", 1) / 100;
    const reductionCap = p.quoted("maximum of 50% reduction") / 100;
    p.quote("permanently ghosted");
    const qMagic = q.formula("Magic Damage"), qAD = q.quoted("plus 100% AD physical damage") / 100;
    const qRange = q.field("targetRange"), qDistance = q.field("range"), qContact = q.quoted("within 200 units of their original location");
    const qCooldown = q.cooldown();
    q.quote("Seastone Trident and Chum the Waters can be cast during the dash");
    q.quote("Life steal applies only on the physical damage component");
    const bleedTotal = w.formula("Total Passive Magic Damage"), activeDamage = w.formula("Active Magic Damage"), onHitDamage = w.formula("Active On-Hit Magic Damage");
    const bleedInterval = w.quoted("every 0.5 seconds over 3 seconds", 0), bleedSeconds = w.quoted("every 0.5 seconds over 3 seconds", 1);
    const activeWindow = w.quoted("next basic attack within 4 seconds"), activeRange = w.quoted("gain 50 bonus range");
    const buffWindow = w.quoted("on-hit for the next 5 seconds");
    const killCooldown = w.quoted("cooldown is reduced to 1 second"), wCost = w.cost();
    w.quote("the empowered attack won't be consumed");
    w.quote("the attack will apply the passive bonus damage of Seastone Trident");
    w.quote("spell damage on the empowered attack"); w.quote("persistent damage additionally tagged as indirect damage"); w.quote("proc damage on the bonus damage on-hit");
    w.quote("Seastone Trident resets Fizz's basic attack timer");
    const eDamage = e.formula("Magic Damage"), eSlow = e.fraction("Slow"), eSlowSeconds = e.quoted("slows them for 2 seconds");
    const balanceSeconds = e.quoted("balancing on his trident for 0.75 seconds");
    const recastAfter = e.quoted("after 0.15 seconds into the duration");
    const hopSeconds = e.quoted("hop off of his trident over 0.5 seconds");
    const hopSpeed = e.quoted("gains 50% bonus movement speed") / 100;
    const qELockout = e.quoted("approximately 0.5 seconds after using Urchin Strike");
    const [eMin, eMax] = e.fieldNumbers("targetRange"), [e2Min, e2Max] = e2.fieldNumbers("targetRange");
    if (eMin === undefined || eMax === undefined || e2Min === undefined || e2Max === undefined) throw new Error("Fizz: missing hop distance endpoints");
    const eRadius = e.field("effectRadius"), e2Radius = e2.field("effectRadius");
    e2.formula("Magic Damage"); e2.quote("not applying the slow"); e2.quote("does not count as an ability activation");
    e.quote("If the first dash is interrupted, Fizz initiates the hop immediately");
    e.quote("if the second one is, the splash will not occur");
    e.quote("In either cases, Fizz loses the untargetability");
    e.quote("the splash occurs after the stasis ends");
    const rSmall = r.formula("Guppy Damage"), rMid = r.formula("Chomper Damage"), rLarge = r.formula("Gigalodon Damage");
    const threshold1 = r.quoted("Guppy (<455)"), threshold2 = r.quoted("Chomper (455-910)", 1);
    const smallSlow = r.quoted("40% slow, 200 eruption radius and 150 unit knock back distance", 0) / 100;
    const smallRadius = r.quoted("40% slow, 200 eruption radius and 150 unit knock back distance", 1), smallBack = r.quoted("40% slow, 200 eruption radius and 150 unit knock back distance", 2);
    const midSlow = r.quoted("60% slow, 325 eruption radius and 250 unit knock back distance", 0) / 100;
    const midRadius = r.quoted("60% slow, 325 eruption radius and 250 unit knock back distance", 1), midBack = r.quoted("60% slow, 325 eruption radius and 250 unit knock back distance", 2);
    const largeSlow = r.quoted("80% slow, 450 eruption radius and 350 unit knock back distance", 0) / 100;
    const largeRadius = r.quoted("80% slow, 450 eruption radius and 350 unit knock back distance", 1), largeBack = r.quoted("80% slow, 450 eruption radius and 350 unit knock back distance", 2);
    const rDelay = r.quoted("after 2 seconds"), rSlowSeconds = r.quoted("slowing them for 2 seconds"), rAirborne = r.quoted("knocked up for 1 second");
    const rRadius = r.gameQuoted('"mMissileWidth": 80.0');
    const rRange = r.field("targetRange"), rSpeed = r.field("speed");
    r.quote("Enemy champions can intercept the lure while it is in flight");
    r.quote("will not attach the lure to an enemy champion if they have a spell shield");
    r.quote("the target will intercept the lure without getting attached to it");
    r.quote("stop its movement upon colliding with Blade Whirl or Wind Wall");
    r.quote("Collision with Rebuttal will destroy it altogether");
    r.quote("This ability will cast from wherever the caster is at the end of the cast time");

    kit.assume("Nimble Fighter dynamically subtracts 4 + 1% AP from each non-true pre-mitigation damage instance, capped at half that instance. No bleed, empowered attack, on-hit buff, hop or shark is prepared before the fight. Monster-specific bonus damage and reduction do not apply to ordinary champion pets.");
    kit.assume("Urchin Strike and both Playful/Trickster dashes retain a real interruptible dash action but use earliest-tick arrival because the exact wiki revisions and versioned game binary do not quantify their dash speeds. Urchin Strike travels its fixed 550 units and checks the target within 200 units of its original position only at completion; it does not hit along the path. W and R can overlay the dash. The wiki's approximate 0.5-second Q-to-E lockout is used as written. Terrain crossing follows the shared clear-endpoint dash rule.");
    kit.assume("Seastone Trident's empowered attack is restored after blind or dodge only within its original four-second window, including actual pet attacks. A blocked empowered attack is consumed and applies the passive bleed. The active damage is a separate spell-shieldable packet, the bleed is persistent damage and the five-second follow-up is proc damage. The reduced one-second kill cooldown is absolute and refunds the paid mana; cooldown starts when the empowered attack is consumed or expires. A Q contact consumes the active on-hit only after Q's defensive checks.");
    kit.assume("Playful balances until 0.75 seconds from declaration, then permits directed movement with 50% bonus speed during the separate 0.5-second hop, retaining untargetability until landing. Trickster is available after 0.15 seconds and before the balance ends, then lands with its smaller radius and no slow. A first-dash interruption immediately starts the targetable hop; a second-dash interruption cancels damage. Landing waits through stasis. The pinned minimum dash distances and the two radius variants are preserved; lateral landing geometry, Flash and move-block bugs are outside the one-dimensional duel.");
    kit.assume("Chum the Waters uses the exact versioned lure missile's 80-unit collision radius and 1300 speed. Only the enemy champion intercepts the lure; pets do not attach it and receive the actual shark area's area damage. Fish tier is determined by the initial flight's actual traveled distance (<455, 455–910, >910). A blocked attachment leaves the eruption on the ground; projectile walls and blocking auras stop flight and also leave the eruption. Rebuttal-specific missile reflection/destruction is not a separate shared projectile state. Ground knockback distance is sourced but its travel duration is unquantified: it is applied on the earliest simulation tick without inventing a lasting airborne duration. The attached holder instead receives the exact one-second knockup. The two-second eruption timer begins when initial flight ends, including interception.");

    kit.assume("The ordinary policy reserves offensive Chum the Waters in hold and short-trade modes and preserves completed-trade retreat. Shared reactive defenses remain available against actual incoming threats.");

    const bleed: Effect = { type: "dot", damageType: "magic", total: bleedTotal, duration: bleedSeconds, interval: bleedInterval, label: "Seastone Trident (bleed)" };
    const spellDamage: Effect = { type: "damage", damageType: "magic", amount: activeDamage, label: "Seastone Trident (active)", noLifeSteal: true, petDamageCategory: "singleTarget" };
    let abilities: AbilitySpec[];
    const wSpec = () => abilities.find((a) => a.key === "W")!;
    const activeSpec = () => abilities.find((a) => a.key === "Wactive")!;
    const armW = (ctx: HookContext, seconds: number) => {
      applyEffect(ctx.world, ctx.self, ctx.self, { type: "empower", attacks: 1, window: seconds, bonusRange: activeRange, uncancellable: true, onHit: [] }, { scale: 1, ability: wSpec() });
    };
    const consumeQEmpower = (ctx: HookContext) => {
      const has = ctx.self.statuses.some((s) => s.kind === "empower" && s.key === "W" && (s.empower?.attacks ?? 0) > 0);
      if (!has) return false;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && s.key === "W"));
      ctx.memory.wAttack = true; ctx.memory.wKilled = false;
      return true;
    };
    const finishW = (ctx: HookContext, missed: boolean) => {
      if (!ctx.memory.wAttack) return;
      ctx.memory.wAttack = false;
      if (missed && ctx.tick < Number(ctx.memory.wUntil ?? -1)) {
        armW(ctx, (Number(ctx.memory.wUntil) - ctx.tick) / 30);
        ctx.self.cooldownHeld.W = "W"; ctx.self.cooldownReady.W = Infinity;
        return;
      }
      if (ctx.memory.wKilled) {
        delete ctx.self.cooldownHeld.W;
        ctx.self.cooldownReady.W = ctx.tick + ticks(killCooldown);
        ctx.apply({ type: "resource", amount: { base: wCost } }, true);
      } else {
        delete ctx.self.cooldownHeld.W;
        ctx.self.cooldownReady.W = ctx.tick + ticks(cooldownAfterHaste(wSpec().cooldown, abilityHasteFor(ctx.self, { slot: "W" })));
        ctx.memory.wBuffUntil = ctx.tick + ticks(buffWindow);
      }
    };
    const beginHop = (ctx: HookContext) => {
      ctx.memory.ePhase = 2; ctx.memory.eLandAt = ctx.tick + ticks(hopSeconds);
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && s.ability === "E" && s.kind === "state" && s.key === "noMovement"));
      ctx.buff("playfulHop", "moveSpeedPercent", hopSpeed, hopSeconds);
    };
    const land = (ctx: HookContext, early: boolean, splash: boolean) => {
      ctx.memory.ePhase = 0;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.source === ctx.self.side && (s.ability === "E" || s.ability === "E2") && s.kind === "state"));
      ctx.buff("playfulHop", "moveSpeedPercent", 0, 0);
      if (splash && ctx.self.alive) areaAt(ctx, early ? "Eearly" : "Eland", ctx.self.x, early ? e2Radius : eRadius, 0, early ? [eHit] : [eHit, { type: "cc", cc: "slow", duration: eSlowSeconds, strength: eSlow }]);
    };
    const eHit: Effect = { type: "damage", damageType: "magic", amount: eDamage, petDamageCategory: "area" };
    const tier = (distance: number) => distance < threshold1 - 1e-6 ? { damage: rSmall, slow: smallSlow, radius: smallRadius, back: smallBack } : distance <= threshold2 + 1e-6 ? { damage: rMid, slow: midSlow, radius: midRadius, back: midBack } : { damage: rLarge, slow: largeSlow, radius: largeRadius, back: largeBack };
    const fish = (ctx: HookContext, missile: Missile, attached: boolean) => {
      if (missile.ended) return;
      missile.ended = true;
      // Interception reports both its real collision and the end of that flight.
      // Both callbacks refer to one lure and must retain exactly one eruption.
      const spawned = `fizz:shark:${missile.id}`;
      if (ctx.memory[spawned]) return;
      ctx.memory[spawned] = true;
      const flight = Math.abs(missile.x - Number(ctx.memory.rOrigin));
      const size = tier(flight);
      const zone: Zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea", ability: "Rshark", x: attached ? ctx.enemy.x : missile.x, radius: size.radius, seenTick: missile.seenTick, startTick: ctx.tick, endTick: ctx.tick + ticks(rDelay), connects: true, scale: missile.scale,
        memory: { attached, distance: flight }, onHit: [{ type: "damage", damageType: "magic", amount: size.damage, petDamageCategory: "area" }, { type: "displace", direction: "away", distance: attached ? 0 : size.back, duration: attached ? rAirborne : 0, originX: missile.x, stopAtWall: true }, { type: "cc", cc: "slow", duration: rSlowSeconds, strength: size.slow }] };
      ctx.world.zones.push(zone);
      if (attached) {
        ctx.apply({ type: "cc", cc: "slow", duration: rDelay, strength: size.slow });
        ctx.apply({ type: "state", state: "revealed", duration: rDelay });
      }
    };
    abilities = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCooldown, cost: q.cost(), castTime: q.castTime(), delivery: { kind: "dash", direction: "toward", distance: qDistance, speed: Infinity, through: true, crossTerrain: true }, flags: { grounded: true, knockdown: true, parry: true, appliesOnHit: true, petContactHooks: true },
        onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: qAD } }, petDamageCategory: "singleTarget", lifesteal: 0 }, { type: "damage", damageType: "magic", amount: qMagic, noLifeSteal: true, petDamageCategory: "singleTarget" }],
        usable: (self, world) => !self.memory.ePhase && Math.abs(self.x - world.units[self.side === 0 ? 1 : 0].x) <= qRange },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: wCost, castTime: w.castTime(), delivery: { kind: "self" }, cooldownAfter: "empower", overlay: true, usable: (self) => !self.memory.ePhase },
      { key: "Wactive", name: `${w.name} (active)`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, activation: "internal", usable: () => false, budgetExcluded: true, onHit: [spellDamage], flags: { spellShield: true, petContactHooks: true } },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cooldownAfter: "state", delivery: { kind: "dash", direction: "toward", distance: eMax, minDistance: eMin, speed: Infinity, through: true, crossTerrain: true }, flags: { grounded: true, knockdown: true },
        usable: (self, world) => !self.memory.ePhase && world.tick >= Number(self.memory.eLockedUntil ?? 0), roles: ["damage", "defense", "engage", "escape"] },
      { key: "E2", name: e2.name, slot: "E", cooldown: 0, castTime: 0, activation: "internal", budgetExcluded: true, delivery: { kind: "dash", direction: "toward", distance: e2Max, minDistance: e2Min, speed: Infinity, through: true, crossTerrain: true }, flags: { grounded: true, knockdown: true },
        usable: (self, world) => Number(self.memory.ePhase) === 1 && world.tick >= Number(self.memory.eRecastAt) && world.tick < Number(self.memory.eBalanceUntil) },
      { key: "Eland", name: `${e.name} (landing)`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, activation: "internal", budgetExcluded: true, usable: () => false, onHit: [eHit, { type: "cc", cc: "slow", duration: eSlowSeconds, strength: eSlow }], flags: { petContactHooks: true } },
      { key: "Eearly", name: `${e2.name} (landing)`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, activation: "internal", budgetExcluded: true, usable: () => false, onHit: [eHit], flags: { petContactHooks: true } },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "line", range: rRange, speed: rSpeed, width: rRadius * 2, radius: rRadius, piercing: true }, onHit: [{ type: "mark", key: "fizzLure", duration: rDelay }], flags: { projectile: true, spellShield: true }, persistsAfterDeath: true, usable: (self) => !self.memory.ePhase },
      { key: "Rshark", name: `${r.name} (shark)`, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "circle", range: rRange, radius: largeRadius, delay: rDelay }, activation: "internal", budgetExcluded: true, usable: () => false, persistsAfterDeath: true, flags: { spellShield: true, petContactHooks: true } },
    ];
    const behavior: Behavior = (view) => {
      const normal = defaultBehavior(view);
      if (view.mode === "idle" || view.self.memory.tradeDone) return normal;
      const reaction = react(view); if (reaction) return reaction;
      if (view.self.action) return normal;
      const ready = (key: string) => canCast(view.world, view.self, abilities.find((a) => a.key === key)!);
      if (view.mode === "flee") return normal;
      if (ready("W") && view.distance <= view.self.spec.attack.range + activeRange) return { kind: "cast", ability: "W" };
      if (view.mode !== "trade" && view.mode !== "hold" && ready("R") && view.distance <= rRange && view.distance >= threshold1) return { kind: "cast", ability: "R" };
      if (ready("Q")) return { kind: "cast", ability: "Q" };
      if (ready("E") && view.distance <= eMax + eRadius) return { kind: "cast", ability: "E", aim: { direction: 1, distance: Math.min(eMax, Math.abs(view.self.x - view.enemy.x)) } };
      return normal;
    };
    return {
      abilities, behavior, attack: { onHit: [bleed], blockStopsOnHit: true, onHitToPets: true }, start: [{ type: "state", state: "ghosted", duration: FOREVER }],
      hooks: {
        modifyDamageTakenRaw(ctx) { return ctx.damageType === "true" ? ctx.raw : Math.max(ctx.raw * (1 - reductionCap), ctx.raw - reduction - reductionAp * derive(ctx.self).ap); },
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory.qTargetX = ctx.enemy.x; ctx.memory.eLockedUntil = ctx.tick + ticks(qELockout); }
          if (ctx.ability.key === "E") {
            ctx.memory.ePhase = 1; ctx.memory.eBalanceUntil = ctx.tick + ticks(balanceSeconds); ctx.memory.eRecastAt = ctx.tick + ticks(recastAfter);
            for (const state of ["untargetable", "noAttacks", "noMovement", "lingering"] as const) applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state, duration: Infinity }, { ability: ctx.ability, scale: 1 });
          }
          if (ctx.ability.key === "E2") ctx.memory.ePhase = 3;
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") { ctx.memory.wUntil = ctx.tick + ticks(activeWindow); armW(ctx, activeWindow); ctx.self.attackReadyTick = ctx.tick; }
          if (ctx.ability.key === "R") {
            ctx.memory.rOrigin = ctx.self.x;
            ctx.memory.rAimDistance = Math.min(rRange, Math.max(0, ctx.aim?.distance ?? rRange));
            ctx.memory.rAimDirection = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1);
          }
        },
        onTick(ctx) {
          if (Number(ctx.memory.ePhase) === 1 && ctx.tick >= Number(ctx.memory.eBalanceUntil)) beginHop(ctx);
          if (Number(ctx.memory.ePhase) === 2 && ctx.tick >= Number(ctx.memory.eLandAt) && !inStasis(ctx.self)) land(ctx, false, true);
          if (Number(ctx.memory.ePhase) === 4 && !inStasis(ctx.self)) land(ctx, true, true);
          for (const zone of ctx.world.zones) if (zone.owner === ctx.self.side && zone.ability === "Rshark" && zone.memory?.attached) zone.x = ctx.enemy.x;
        },
        onAttack(ctx) {
          if (ctx.action.empowered?.includes("W")) { ctx.action.attackTag = "fizzW"; ctx.memory.wAttack = true; ctx.memory.wKilled = false; }
        },
        onAttackBeforeDamage(ctx) {
          if (ctx.attack.attackTag === "fizzW") {
            if (ctx.blocked) ctx.apply(bleed);
            else abilityHit(ctx.world, ctx.self, ctx.enemy, activeSpec(), [spellDamage], ctx.scale);
          } else if (!ctx.blocked && ctx.tick < Number(ctx.memory.wBuffUntil ?? -1)) ctx.apply({ type: "damage", damageType: "magic", amount: onHitDamage, label: "Seastone Trident (on-hit)", noLifeSteal: true, petDamageCategory: "proc" });
        },
        onAttackResolved(ctx) { finishW(ctx, ctx.missed); },
        onAttackPetResolved(ctx) { finishW(ctx, ctx.missed); },
        onKill(ctx) { if (ctx.memory.wAttack) ctx.memory.wKilled = true; },
        onMissileTick(ctx) {
          if (ctx.missile.source !== "R" || ctx.memory.rConfiguredMissile === ctx.missile.id) return;
          ctx.memory.rConfiguredMissile = ctx.missile.id;
          ctx.missile.travelLeft = Number(ctx.memory.rAimDistance ?? rRange);
          ctx.missile.direction = Number(ctx.memory.rAimDirection ?? ctx.missile.direction) as 1 | -1;
        },
        onAbilityContact(ctx) { return [...ctx.effects]; },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key === "Q" && consumeQEmpower(ctx)) ctx.effects.push(spellDamage);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") finishW(ctx, false);
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "Q" && !ctx.interrupted && ctx.self.alive && Math.abs(ctx.enemy.x - Number(ctx.memory.qTargetX)) <= qContact) {
            const qSpec = abilities[0]!;
            const effects = qSpec.onHit!.map((effect): Effect => effect.type === "damage" && effect.damageType === "physical" ? { ...effect, lifesteal: derive(ctx.self).lifeSteal } : effect);
            abilityHit(ctx.world, ctx.self, ctx.enemy, qSpec, effects);
          }
          if (ctx.ability.key === "E" && ctx.interrupted) {
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "untargetable" && s.ability === "E"));
            if (ctx.self.alive) beginHop(ctx); else land(ctx, false, false);
          }
          if (ctx.ability.key === "E2") {
            if (inStasis(ctx.self) && !ctx.interrupted) { ctx.memory.ePhase = 4; return; }
            land(ctx, true, !ctx.interrupted);
          }
        },
        onMissileContact(ctx) {
          if (ctx.missile.source !== "R") return;
          const attached = ctx.enemy.statuses.some((s) => s.kind === "mark" && s.key === "fizzLure" && s.source === ctx.self.side && s.startTick === ctx.tick);
          fish(ctx, ctx.missile, attached);
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "R" || ctx.reason === "owner") return;
          // The shared mover sets ended before this callback; fish owns its own once-only guard.
          ctx.missile.ended = false; fish(ctx, ctx.missile, false);
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "Rshark") return;
          if (ctx.zone.memory?.attached) {
            ctx.zone.x = ctx.enemy.x;
            const size = tier(Number(ctx.zone.memory.distance ?? 0));
            for (const pet of [...ctx.world.pets]) {
              if (pet.owner === ctx.self.side || pet.spec.hitPoints || pet.spec.untargetable || Math.abs(pet.x - ctx.zone.x) > size.radius + pet.spec.radius) continue;
              const spec = abilities.find((a) => a.key === "Rshark")!;
              abilityHitPet(ctx.world, ctx.self, pet, spec, [{ type: "damage", damageType: "magic", amount: size.damage, petDamageCategory: "area" }, { type: "displace", direction: "away", distance: size.back, duration: 0, originX: ctx.zone.x, stopAtWall: true }, { type: "cc", cc: "slow", duration: rSlowSeconds, strength: size.slow }], "area");
            }
            ctx.zone.noPets = true;
          }
          const size = tier(Number(ctx.zone.memory?.distance ?? 0));
          ctx.zone.onHit = [{ type: "damage", damageType: "magic", amount: size.damage, petDamageCategory: "area" }, { type: "displace", direction: "away", distance: ctx.zone.memory?.attached ? 0 : size.back, duration: ctx.zone.memory?.attached ? rAirborne : 0, originX: ctx.zone.x, stopAtWall: true }, { type: "cc", cc: "slow", duration: rSlowSeconds, strength: size.slow }];
        },
      },
      budget: { damage: (self, target) => ({ magic: evaluate(bleedTotal, self, target) / bleedSeconds + evaluate(eDamage, self, target) / (cooldownAfterHaste(abilities[3]!.cooldown, derive(self).abilityHaste) + balanceSeconds + hopSeconds) }) },
    };
  },
};
export default fizz;
