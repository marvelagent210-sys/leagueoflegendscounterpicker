/** Twitch: target-local venom clocks, delayed camouflage, and dodgeable piercing basics. */
import type { KitModule } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { canCast, EPSILON, resolveSkillshot } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { attackDamage, extraAttacks, ticks } from "./util";

const POISON = "twitch:poison", DOT = "twitch:venom", QUNTIL = "twitch:ambushUntil", QFADE = "twitch:fadeAt", RUNTIL = "twitch:sprayUntil";
const identity = (unit: Unit) => unit.petId === undefined ? `champion:${unit.side}` : `pet:${unit.petId}`;
const twitch: KitModule = {
  champion: "Twitch",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const poisonSeconds = p.quoted("for 6 seconds"), maxStacks = p.quoted("stacking up to 6 times"), poisonBase = p.levelValue("target is dealt 1"), poisonAP = p.quoted("(+ 3% AP)") / 100;
    p.quote("true damage per second"); p.quote("considered a poison"); p.quote("does not trigger spell effects");
    const attackSpeed = p.gameQuoted("mSpell.missileSpeed: 2500.0");
    const fadeSeconds = q.quoted("After a 1-second delay"), stealthSeconds = q.number("Stealth Duration"), qAS = q.fraction("Bonus Attack Speed"), qASSeconds = q.quoted("attack speed for 6 seconds"), qMS = q.quoted("gains 10% bonus movement speed") / 100, qHiddenMS = q.quoted("increased to 30%") / 100, qFacingRange = q.quoted("within a 1000-unit radius");
    q.quote("Attacking or casting Venom Cask or Contaminate ends Ambush"); q.quote("can still perform actions normally before entering camouflage"); q.quote("Entering stealth cancels Twitch's current basic attack"); q.quote("If Twitch enters stasis during the delay"); q.quote("Using a basic attack breaks the stealth at the start of the attack windup"); q.quote("Ambush's cooldown is reset"); q.textField("cooldownStart");
    const detectionText = q.record.gameSources!.flatMap((source) => source.text).find((text) => text.startsWith("mSpell.DataValues:"))!; q.gameQuote(detectionText);
    const detectionValues = JSON.parse(detectionText.slice(detectionText.indexOf(":") + 1)) as Array<{ name: string; values: number[] }>;
    const detectionRange = detectionValues.find((value) => value.name === "StealthDetectionRange")?.values[0]; if (detectionRange === undefined) throw new Error("Twitch: missing pinned camouflage detection radius");
    const wRadius = w.field("effectRadius"), wRange = w.field("targetRange"), wSpeed = w.field("speed"), wSeconds = w.quoted("contaminated for 3 seconds"), wStackCap = w.quoted("maximum of 4 Deadly Venom stacks"), wSlow = w.baseOf("Slow") / 100, wSlowAP = w.quoted("(+ 6% per 100 AP)") / 100 / 100;
    w.quote("applying a Deadly Venom stack each second"); w.quote("granting sight"); w.quote("suppressed during the cast time");
    const eCast = e.castTime(), eBase = e.formula("Base Physical Damage"), eStack = e.formula("Physical Damage Per Stack"), eAP = e.quoted("35% AP magic damage") / 100, eRange = e.field("effectRadius");
    e.quote("at the start of the cast time"); e.quote("not within range of the ability before the cast time completes"); e.quote("does not have to be visible"); e.quote("A nearby enemy with Deadly Venom is required");
    const rAD = r.number("Bonus Attack Damage"), rRange = r.quoted("300 bonus attack range"), rSeconds = r.quoted("for 6 seconds"), rWidth = r.field("width"), rSpeed = r.field("speed"), rTravel = r.field("range"), rCritical = r.quoted("for 200% damage") / 100;
    r.quote("100 / 90 / 80 / 70 / 60"); r.quote("apply on-hit effects"); r.quote("at his target's location at the start of his attack windup"); r.quote("Even the primary target can dodge"); r.quote("If Twitch is blinded before winding up the attack"); r.quote("not considered area of effect for other effects");
    const stacks = (target: Unit, tick: number) => target.statuses.find((status) => status.kind === "mark" && status.key === POISON && status.endTick > tick)?.value ?? 0;
    const poison = (ctx: HookContext, share = 1) => {
      if (share <= 0 || !ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self) || inStasis(ctx.enemy)) return;
      const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((target) => target.id === ctx.enemy.petId);
      if (pet?.spec.hitPoints || pet?.spec.fixedDamage) return;
      const count = Math.min(maxStacks, stacks(ctx.enemy, ctx.tick) + share), old = ctx.enemy.statuses.find((status) => status.kind === "dot" && status.key === DOT && status.endTick >= ctx.tick), next = old?.dot && old.dot.nextTick > ctx.tick ? old.dot.nextTick : ctx.tick + ticks(1);
      const statuses = ctx.enemy.statuses.filter((status) => !(status.source === ctx.self.side && ((status.kind === "mark" && status.key === POISON) || (status.kind === "dot" && status.key === DOT))));
      statuses.push({ kind: "mark", key: POISON, source: ctx.self.side, ability: "I", startTick: ctx.tick, endTick: ctx.tick + ticks(poisonSeconds), value: count });
      statuses.push({ kind: "dot", key: DOT, source: ctx.self.side, ability: "I", startTick: ctx.tick, endTick: ctx.tick + ticks(poisonSeconds), value: count, dot: { damageType: "true", perHit: count * (poisonBase + poisonAP * derive(ctx.self).ap), intervalTicks: ticks(1), nextTick: next, label: p.name } });
      ctx.enemy.statuses = statuses; if (pet) pet.statuses = statuses;
    };
    const breakAmbush = (ctx: HookContext) => {
      if (ctx.memory[QUNTIL] === undefined) return;
      delete ctx.memory[QUNTIL]; ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.ability === "Q" && status.kind === "state" && ["lingering", "invisible"].includes(status.key)));
      ctx.self.statuses = ctx.self.statuses.filter((status) => status.memoKey !== "buff:twitch:ambushSpeed"); ctx.buff("twitch:ambushAS", "attackSpeed", qAS, qASSeconds);
    };
    const contamination: Effect[] = [{ type: "mark", key: "twitch:caskContact", duration: 1 / 30 }];
    const poisonAbility: AbilitySpec = { key: "I", name: p.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, persistsAfterDeath: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false }, roles: [] };
    const fieldPacket: AbilitySpec = { key: "Wfield", name: `${w.name} (contamination)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, persistsAfterDeath: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true }, onHit: contamination, estimate: (self) => poisonBase + poisonAP * derive(self).ap, roles: [] };
    const slowPacket: AbilitySpec = { ...fieldPacket, key: "Wslow", name: `${w.name} (slow)`, onHit: [{ type: "cc", cc: "slow", strength: wSlow, duration: 2 / 30 }], estimate: undefined };
    const bolt: AbilitySpec = { key: "Rbolt", name: `${r.name} (bolt)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, persistsAfterDeath: true, cooldown: 0, castTime: 0, delivery: { kind: "line", range: rTravel, width: rWidth, speed: rSpeed }, flags: { spellShield: false, projectile: true }, roles: [] };
    const detonation: AbilitySpec = { key: "Ehit", name: e.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, projectile: false, petContactHooks: true }, roles: [] };
    const snapshotCount = (self: Unit, target: Unit) => { const saved = self.memory["twitch:eStacks"]; return typeof saved === "string" ? (JSON.parse(saved) as Record<string, number>)[identity(target)] ?? 0 : 0; };
    const eEffects = (count: number): Effect[] => [{ type: "damage", damageType: "physical", amount: { base: eBase.base + count * eStack.base, ratios: Object.fromEntries(Object.entries(eStack.ratios ?? {}).map(([stat, ratio]) => [stat, count * ratio!])) } }, { type: "damage", damageType: "magic", amount: { base: 0, ratios: { AP: eAP * count } } }];
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAfter: "state", cost: q.cost(), castTime: q.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "lingering", duration: fadeSeconds + stealthSeconds }], usable: (self) => self.memory[QFADE] === undefined && self.memory[QUNTIL] === undefined, roles: ["buff"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(), delivery: { kind: "circle", range: wRange, radius: wRadius, speed: wSpeed, delay: 0 }, onHit: [...contamination, { type: "cc", cc: "slow", strength: wSlow, duration: 2 / 30 }], flags: { projectile: true, spellShield: true, petContactHooks: true }, failCastOnCC: ["suppression"], persistsAfterDeath: true, roles: ["cc"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, onHit: [], flags: { spellShield: true, projectile: false }, usable: (self, world) => { const rival = world.units[1 - self.side]!; return (rival.alive && stacks(rival, world.tick) > 0 && Math.abs(rival.x - self.x) <= eRange + 1e-6) || world.pets.some((pet) => pet.owner !== self.side && pet.hp > 0 && Math.abs(pet.x - self.x) <= eRange + 1e-6 && stacks(petFormulaTarget(pet, self, world.tick), world.tick) > 0); }, roles: ["damage"], estimate: (self, target) => { const count = stacks(target, Number(self.memory["twitch:tick"] ?? 0)); return count > 0 ? evaluate(eBase, self, target) + count * (evaluate(eStack, self, target) + eAP * derive(self).ap) : 0; } },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), overlay: true, preserveAttackWindup: true, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "AD", amount: { base: rAD }, duration: rSeconds }, { type: "stat", stat: "attackRange", amount: { base: rRange }, duration: rSeconds }], roles: ["buff"], decisive: true },
      poisonAbility, fieldPacket, slowPacket, detonation, bolt,
    ];
    const behavior: Behavior = (view) => {
      const ordinary = defaultBehavior(view);
      if (view.mode === "idle") return ordinary;
      if (!view.self.action && ["fight", "trade"].includes(view.mode) && !view.self.memory.tradeDone) {
        const count = stacks(view.enemy, view.world.tick);
        if (count > 0 && canCast(view.world, view.self, abilities[2]!)) {
          const damage = evaluate(eBase, view.self, view.enemy) + count * (evaluate(eStack, view.self, view.enemy) + eAP * derive(view.self).ap);
          const expiring = (view.enemy.statuses.find((status) => status.key === POISON)?.endTick ?? 0) - view.world.tick <= ticks(eCast);
          if (count >= maxStacks || expiring || damage >= view.enemy.hp || view.distance > view.self.spec.attack.range + rRange) return { kind: "cast", ability: "E" };
          if (ordinary?.kind === "cast" && ordinary.ability === "E") return { kind: "attack" };
        }
      }
      if (ordinary?.kind === "cast" && ordinary.ability === "E" && stacks(view.enemy, view.world.tick) > 0 && stacks(view.enemy, view.world.tick) < maxStacks && view.mode !== "flee") return { kind: "attack" };
      return ordinary;
    };
    kit.assume("Deadly Venom is stored separately on every actually contacted champion and ordinary summon, with a common six-second stack expiry, at most six stacks, and one-second damage clock preserved when refreshed. At level 20 each stack deals 5 + 3% AP true damage per tick, with AP read on application. The mark explicitly identifies poison for shared interactions. Real blind/dodge/parry denial prevents the on-hit application; a damage block preserves ordinary on-hit rules. Poison does not trigger spell effects and persists after Twitch dies. Fixed-damage objects and hit-count props do not receive unsupported poison stacks. Fractional hit shares use expected stack counts, without branching all combinations.");
    kit.assume("Ambush retains its actual one-second fade delay and 14-second camouflage duration; actions during the delay remain legal. Entering camouflage cancels an ordinary pending basic attack, and stasis postpones entry. Its exact version-pinned game data supplies the 500-unit champion detection radius. Outside that radius its invisibility state obeys true sight; moving inside removes concealment without ending Ambush. The 10% movement bonus rises to 30% only while facing an enemy within 1000 who cannot see Twitch. Attacking at declaration or casting W/E ends entered Ambush and grants 60% attack speed for 6 seconds. R does not end camouflage. Post-effect cooldown begins when camouflage ends; a venom-afflicted champion's counted death resets Q without a free pet reset.");
    kit.assume("Venom Cask travels at 1400 speed and can be destroyed by projectile walls. On landing it applies one separately shieldable poison stack and leaves a fixed 300-radius field for 3 seconds. Three subsequent one-second pulses apply at most one extra stack each, for the sourced maximum 4 per cast; its AP-scaled slow refreshes only during actual field occupancy. The field pulses bypass spell shields; the initial impact is shieldable. Its sight is ordinary map sight and does not grant true sight. Suppression during the declared cast prevents its missile.");
    kit.assume("Contaminate requires an actually poisoned nearby target, snapshots each target's stack count at cast declaration, checks 1200 center range again when its 0.25-second cast ends, and independently applies 60 + (35 + 35% bonus AD) × stacks physical plus 35% AP × stacks magic damage. It hits unseen targets without granting true sight, independently checks actual champion/pet spell shields, and does not consume or refresh poison. A target entering range after declaration has no snapshot and receives no invented stack damage.");
    kit.assume("Spray and Pray grants 60 AD and 300 range for 6 seconds. An empowered attack snapshots its initial line direction and blind/crit state at windup declaration, launches one 5000-speed 120-width piercing basic bolt, and can miss the original target. It uses 1100 plus other bonus attack range as its travel range; each subsequent actual contact scales ordinary basic damage to 90/80/70/60% while full on-hit effects retain their own packet. Every target uses real basic-attack defenses, life steal and its own poison state. Projectile walls destroy the remaining bolt. The pinned game missile object has conflicting 4000 speed; the explicit ability-page 5000 speed is retained. There is no lane of invented collateral targets.");
    kit.assume("The budget uses a ten-second-style sustained reference: poison stacks build from actual reference attack speed plus the sourced four Cask stacks per cooldown, capped at six; E is valued at that reference stack count. Q contributes only capped six-second attack-speed uptime over its 16-second cooldown plus one-second fade, and R contributes its six-second AD uptime per 90-second cooldown. It values no repeated champion kills or free collateral R hits. The policy waits for full venom, imminent expiry, range loss or a lethal E before detonating.");
    return {
      attack: { ranged: true, projectile: true, missileSpeed: attackSpeed, onHitToPets: true }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, gainedAS = Math.max(0, Math.min(ATTACK_SPEED_CAP, d.attackSpeed + extraAttacks(self, qAS)) - d.attackSpeed), qUptime = Math.min(1, qASSeconds / (abilities[0]!.cooldown / haste + fadeSeconds)), referenceAS = d.attackSpeed + gainedAS * qUptime, referenceStacks = Math.min(maxStacks, (referenceAS + wStackCap / (abilities[1]!.cooldown / haste + abilities[1]!.castTime)) * poisonSeconds / 2), eCycle = abilities[2]!.cooldown / haste + abilities[2]!.castTime, rUptime = Math.min(1, rSeconds / (abilities[3]!.cooldown / haste)); return { physical: attackDamage(self) * gainedAS * qUptime + rAD * referenceAS * (1 + d.critChance * (d.critDamage - 1)) * rUptime + (evaluate(eBase, self, target) + evaluate(eStack, self, target) * referenceStacks) / eCycle, magic: eAP * d.ap * referenceStacks / eCycle, true: referenceStacks * (poisonBase + poisonAP * d.ap) }; } },
      hooks: {
        onTick(ctx) {
          ctx.memory["twitch:tick"] = ctx.tick;
          if (ctx.memory[QFADE] !== undefined && inStasis(ctx.self)) {
            const held = ctx.self.statuses.find((status) => status.kind === "state" && status.key === "lingering" && status.ability === "Q");
            if (held) held.endTick = Math.max(held.endTick, ctx.tick + 2);
            else applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "lingering", duration: 2 / 30 }, { ability: abilities[0], scale: 1 });
          }
          if (ctx.memory[QFADE] !== undefined && ctx.tick >= Number(ctx.memory[QFADE]) && !inStasis(ctx.self)) {
            delete ctx.memory[QFADE]; ctx.memory[QUNTIL] = ctx.tick + ticks(stealthSeconds);
            const held = ctx.self.statuses.find((status) => status.kind === "state" && status.key === "lingering" && status.ability === "Q"); if (held) held.endTick = Number(ctx.memory[QUNTIL]);
            if (ctx.self.action?.kind === "windup") { ctx.self.action = undefined; ctx.self.attackReadyTick = ctx.tick; } if (ctx.self.pendingAttack) { delete ctx.self.pendingAttack; ctx.self.attackReadyTick = ctx.tick; }
          }
          if (ctx.memory[QUNTIL] !== undefined) {
            if (ctx.tick >= Number(ctx.memory[QUNTIL])) breakAmbush(ctx);
            else {
              const detected = Math.abs(ctx.self.x - ctx.enemy.x) <= detectionRange + 1e-6;
              if (detected) ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.key === "invisible" && status.ability === "Q"));
              else applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "invisible", duration: 2 / 30 }, { ability: abilities[0], scale: 1 });
              const facing = (ctx.self.facing ?? directionTo(ctx.self, ctx.enemy)) === directionTo(ctx.self, ctx.enemy), fast = facing && Math.abs(ctx.self.x - ctx.enemy.x) <= qFacingRange + EPSILON && !canSee(ctx.self, ctx.enemy);
              ctx.buff("twitch:ambushSpeed", "moveSpeedPercent", fast ? qHiddenMS : qMS, 2 / 30);
            }
          }
        },
        onCastStart(ctx) {
          if (["W", "E"].includes(ctx.ability.key)) breakAmbush(ctx);
          if (ctx.ability.key === "E") {
            const snapshot: Record<string, number> = {};
            if (Math.abs(ctx.enemy.x - ctx.self.x) <= eRange + 1e-6) snapshot[identity(ctx.enemy)] = stacks(ctx.enemy, ctx.tick);
            for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.self.x) <= eRange + 1e-6) { const target = petFormulaTarget(pet, ctx.self, ctx.tick); snapshot[identity(target)] = stacks(target, ctx.tick); }
            ctx.memory["twitch:eStacks"] = JSON.stringify(snapshot);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") ctx.memory[QFADE] = ctx.tick + ticks(fadeSeconds);
          if (ctx.ability.key === "R") ctx.memory[RUNTIL] = ctx.tick + ticks(rSeconds);
          if (ctx.ability.key === "E") {
            const count = snapshotCount(ctx.self, ctx.enemy); if (count > 0 && Math.abs(ctx.enemy.x - ctx.self.x) <= eRange + 1e-6) abilityHit(ctx.world, ctx.self, ctx.enemy, detonation, eEffects(count));
            for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.self.x) <= eRange + 1e-6) { const target = petFormulaTarget(pet, ctx.self, ctx.tick), value = snapshotCount(ctx.self, target); if (value > 0) abilityHitPet(ctx.world, ctx.self, pet, detonation, eEffects(value), "area"); }
          }
        },
        onAttack(ctx) { breakAmbush(ctx); if (ctx.tick < Number(ctx.memory[RUNTIL] ?? -1)) ctx.action.attackTag = `twitch:spray:${directionTo(ctx.self, ctx.enemy)}`; },
        onAttackLaunch(ctx) {
          if (!ctx.action.attackTag?.startsWith("twitch:spray:")) return;
          if ((ctx.action.pet !== undefined && !ctx.targetPet) || !ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self) || inStasis(ctx.enemy)) return false;
          const direction = Number(ctx.action.attackTag.slice(ctx.action.attackTag.lastIndexOf(":") + 1)) as 1 | -1;
          const bonusRange = ctx.self.statuses.filter((status) => status.kind === "stat" && status.key === "attackRange" && status.memoKey !== "R:attackRange").reduce((sum, status) => sum + status.value, 0);
          const champion = ctx.world.units[1 - ctx.self.side]!, eta = Math.max(0, Math.abs(champion.x - ctx.self.x) - champion.spec.base.radius) / rSpeed;
          const decision = resolveSkillshot(ctx.world, ctx.self, champion, abilities[3]!, ctx.action.startTick, eta, rWidth / 2), id = ctx.world.nextId++;
          ctx.world.missiles.push({ id, owner: ctx.self.side, source: "Rbolt", seenTick: ctx.action.startTick, x: ctx.self.x, perTick: rSpeed / 30, piercing: true, radius: rWidth / 2, collisionPet: true, homing: false, direction, travelLeft: rTravel + bonusRange, projectile: true, connects: decision.connects, scale: decision.scale, onHit: [], attack: { ...ctx.action, blinded: ctx.action.blinded, bonusOnHit: ctx.action.onHit, critChance: ctx.action.critChance, critMultiplier: ctx.action.critMultiplier ?? derive(ctx.self).critDamage, attackTag: ctx.action.attackTag } }); return decision.split === undefined ? false : { missile: id, chance: decision.split };
        },
        onAttackHit(ctx) { poison(ctx, ctx.scale); },
        onAttackPetHit(ctx) { poison(ctx, ctx.scale); },
        onAbilityContact(ctx) {
          if (!["W", "Wslow"].includes(ctx.ability.key)) return;
          return ctx.effects.map((effect) => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: Math.min(1, wSlow + wSlowAP * derive(ctx.self).ap) } : effect);
        },
        onAbilityHit(ctx) { if (["W", "Wfield"].includes(ctx.ability.key)) poison(ctx, ctx.scale); },
        onZoneLand(ctx) {
          if (ctx.zone.ability !== "W") return;
          ctx.zone.noPets = true;
          for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.zone.x) <= wRadius + pet.spec.radius + 1e-6) abilityHitPet(ctx.world, ctx.self, pet, abilities[1]!, abilities[1]!.onHit!, "area");
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", seenTick: ctx.zone.seenTick, x: ctx.zone.x, radius: wRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(wSeconds) + 1, ability: "Wfield", onHit: contamination, interval: ticks(1), nextTick: ctx.tick + ticks(1) });
          ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "field", seenTick: ctx.zone.seenTick, x: ctx.zone.x, radius: wRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(wSeconds) + 1, ability: "Wslow", onHit: slowPacket.onHit, interval: 1, nextTick: ctx.tick });
        },
        onMissileContact(ctx) { if (ctx.missile.attack?.attackTag?.startsWith("twitch:spray:")) { const contacts = (ctx.missile.hitTargets?.length ?? 0) + (ctx.missile.hitPets?.length ?? 0); ctx.missile.attack.baseDamageScale = Math.max(.6, 1 - .1 * contacts); } },
        onKill(ctx) { if (!ctx.pet && stacks(ctx.victim as Unit, ctx.tick) > 0) { ctx.self.cooldownReady.Q = ctx.tick; delete ctx.self.pendingRefunds.Q; if (ctx.self.cooldownHeld.Q) ctx.self.pendingRefunds.Q = { seconds: 0, fraction: 1 }; } },
      },
    };
  },
};
export default twitch;
