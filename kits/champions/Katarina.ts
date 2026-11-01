/** Katarina: real dagger locations, target-local Shunpo and separate Death Lotus knives. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { canTargetPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { exitTerrain } from "../../engine/sim/terrain";
import { ticks } from "./util";

interface Dagger { id: number; x: number; lands: number; expires: number }
interface Flight { target: number; x: number; championClass: boolean; speed: number; arrives?: number; firstX?: number; direction: number; visited: number[]; bounce: number }
type Target = Unit | Pet;
const DAGGERS = "kat:daggers", FLIGHT = "kat:flight:";
const readDaggers = (u: Unit): Dagger[] => JSON.parse(String(u.memory[DAGGERS] ?? "[]")) as Dagger[];
const saveDaggers = (u: Unit, values: Dagger[]) => { u.memory[DAGGERS] = JSON.stringify(values); };
const targetId = (target: Target) => "owner" in target ? target.id : -1;
const radius = (target: Target) => "owner" in target ? target.spec.radius : target.spec.base.radius;
const view = (world: World, self: Unit, target: Target) => "owner" in target ? petFormulaTarget(target, self, world.tick) : target;

const katarina: KitModule = {
  champion: "Katarina",
  build(kit) {
    const p = kit.ability("Voracity"), q = kit.ability("Bouncing Blade"), w = kit.ability("Preparation"), e = kit.ability("Shunpo"), r = kit.ability("Death Lotus");
    const spinContext = "Whenever Katarina retrieves a Dagger";
    const spin: Formula = { base: p.levelValue(spinContext), ratios: { bonusAD: p.quoted("(+ 60% bonus AD)") / 100, AP: p.levelValue(spinContext, 1) / 100 } };
    const refund = p.levelValue(spinContext, 2) / 100, spinRadius = p.field("effectRadius"), lifetime = p.quoted("on the ground for 4 seconds");
    p.quote("within 3 seconds"); const killRefund = p.quoted("by 15 seconds");
    p.quote("may not slash until it has"); p.quote("will still take effect even after Katarina dies");
    p.quote("apply on-hit effects to enemy champions hit"); p.quote("Single-use on-hit effects");
    p.quote("will still deal damage but not apply on-hit effects if dodged"); p.quote("cannot be blocked nor can they be missed while Katarina is blinded");
    const qDamage = q.formula("Magic Damage"), qRange = q.field("targetRange"), qSpeed = q.field("speed"), bounceRadius = q.field("effectRadius");
    const bounceSeconds = q.quoted("over 0.15 seconds"), maxBounces = q.gameQuoted('"name":"MaxBounces","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');
    const qLand = q.quoted("lands 1.023"), qOffset = q.quoted("about 350 units");
    q.quote("Valid targets are determined after each bounce"); q.quote("will not be destroyed in-flight if the target dies"); q.quote("but it will on clones that expire");
    const wFlight = w.quoted("after 1.25 seconds"), wSpeed = w.fraction("Bonus Movement speed");
    const eRange = e.field("targetRange", "Standard"), daggerRange = e.field("targetRange", "daggers");
    const eSelection = e.gameQuoted('"castRadius":[150.0,150.0,150.0,150.0,150.0,150.0,150.0]');
    const eHitRadius = e.gameQuoted('"castRadius":[225.0,225.0,225.0,225.0,225.0,225.0,225.0]');
    const eDamage = e.formula("Magic Damage");
    e.quote("effects occur before the cast time"); e.quote("does not reset Katarina's basic attack timer if it killed the target");
    e.quote("any unit except structures and wards"); e.quote("Daggers that haven't landed yet"); e.quote("prioritizes damaging enemy champions");
    e.quote("will still deal damage but not apply on-hit effects if dodged"); e.quote("cannot be blocked nor can it be missed while Katarina is blinded");
    const rSeconds = r.quoted("up to 2.5 seconds"), rRate = r.gameQuoted('"name":"TicksPerSecond","values":[6.0,6.0,6.0,6.0,6.0,6.0,6.0]'), knifeCount = rSeconds * rRate;
    const rRange = r.field("effectRadius"), rCastRange = r.quoted("within 500 units"), rSpeed = r.field("speed"), rTargets = r.quoted("up to 3"), grievous = r.quoted("for 3 seconds");
    const rMagic = r.formula("Magic Damage Per Dagger"), rPhysical: Formula = { base: 0, ratios: { bonusAD: r.baseOf("Physical Damage Per Dagger") / 100 }, products: [{ ratio: r.quoted("(+ 50% per 100% bonus attack speed)") / 100, stats: ["bonusAD", "bonusAttackSpeed"] }] };
    const onHitShare = r.fraction("On-Hit/On-Attack Damage Effectiveness"), cancelAfter = r.quoted("Disabled in the first and last {{fd|0.25}} seconds");
    r.quote("does not have to be visible"); r.quote("will not end if no enemies remain"); r.quote("Spell shield will block and be consumed by only one dagger"); r.quote("Each dagger counts as a separate hit");
    const revealSeconds = r.quoted("for 4.5 seconds");
    kit.assume("Daggers begin absent. Q lands 1.023 seconds after first contact, exactly 350 units beyond that target along the caster-to-target line; the primary calls the location slightly random without a distribution. Terrain moves a landing point to the nearest clear position on the arena line. Both Q bounces select the nearest unhit visible actual enemy inside the primary target's 450-unit radius; multidirectional bounce paths and map vision are not simulated.");
    kit.assume("The pinned ability descriptions and versioned game objects do not identify the dagger pickup trigger radius. Until separately sourced, pickup conservatively requires Katarina's center to reach or cross the actual landed dagger center; the 340-unit spin damage radius never stands in for pickup. Airborne daggers can be Shunpo anchors but cannot spin, and ground daggers expire after four seconds.");
    kit.assume("Shunpo projects cursor selection onto the arena line. The versioned wrapper's 150 castRadius is used for cursor selection/landing offset; the actual E object's 225 castRadius is used for its nearest-enemy damage search. These field interpretations are explicit. Without an aim, it prefers a nearby damaging dagger, then the enemy champion, then a real pet. Primary 775 dagger range takes precedence over the game object's conflicting 800. Ward/structure units are outside the arena; ordinary minion, monster, other summon and champion-clone classes remain valid anchors.");
    kit.assume("Preparation's movement speed decays linearly to zero over 1.25 seconds. Death Lotus launches 15 separate knives at cumulative sixth-second boundaries, including its last at 2.5 seconds; the first launch offset is unquantified. Each knife reads damage stats at impact and carries one magic/physical/on-hit/Grievous Wounds packet through projectile and spell defenses. Up to three real champion-class targets count; ordinary pets never receive Death Lotus. On-attack item/rune triggers do not exist in this plain-stat simulator.");
    kit.assume("The behavior holds an active Death Lotus channel. Trade and hold modes reserve Death Lotus; short trades use the normal burst clock and retreat after trade completion even when Q/W/E become ready again. Voluntary movement/attack cancellation is disabled during the first and last 0.25 seconds; explicit Q/W/E casts and disabling crowd control can interrupt. Automatic post-Shunpo attack-command bugs are not represented by the command API. No phantom takedowns or preduel daggers are awarded. The reference budget values one spin per Q/W cooldown, normal E cadence and one complete R per cooldown, without kill resets or extra E resets.");

    const enemies = (world: World, self: Unit, visible = true): Target[] => {
      const enemy = world.units[1 - self.side]!;
      return [...(enemy.alive && !inStasis(enemy) && !isUntargetable(enemy, self) && (!visible || canTarget(enemy, self)) ? [enemy] : []), ...world.pets.filter((pet) => pet.owner !== self.side && pet.hp > 0 && !pet.spec.untargetable && (visible ? canTargetPet(pet, self, world.tick) : !inStasis(view(world, self, pet)) && !isUntargetable(view(world, self, pet), self)))];
    };
    const cursor = (self: Unit, enemy: Unit, aim?: Aim) => aim?.distance === undefined ? enemy.x : self.x + directionTo(self, enemy) * aim.direction * Math.max(0, aim.distance);
    const qTarget = (world: World, self: Unit, aim?: Aim) => enemies(world, self).filter((t) => Math.abs(t.x - self.x) <= qRange).sort((a, b) => Math.abs(a.x - cursor(self, world.units[1 - self.side]!, aim)) - Math.abs(b.x - cursor(self, world.units[1 - self.side]!, aim)))[0];
    const anchors = (world: World, self: Unit) => [
      ...readDaggers(self).filter((d) => world.tick < d.expires && Math.abs(d.x - self.x) <= daggerRange).map((d) => ({ x: d.x, priority: 0 })),
      ...enemies(world, self).filter((t) => Math.abs(t.x - self.x) <= eRange).map((t) => ({ x: t.x, priority: "owner" in t ? t.spec.targetClass === "champion" ? 1 : 2 : 1 })),
      ...world.pets.filter((t) => t.owner === self.side && canTargetPet(t, self, world.tick) && Math.abs(t.x - self.x) <= eRange).map((t) => ({ x: t.x, priority: 3 })),
    ];
    const chooseAnchor = (world: World, self: Unit, aim?: Aim) => {
      const x = cursor(self, world.units[1 - self.side]!, aim);
      const candidates = anchors(world, self);
      if (aim) return candidates.filter((a) => Math.abs(a.x - x) <= eSelection).sort((a, b) => a.priority - b.priority || Math.abs(a.x - x) - Math.abs(b.x - x))[0];
      return candidates.filter((a) => a.priority > 0 || Math.abs(a.x - world.units[1 - self.side]!.x) <= spinRadius).sort((a, b) => a.priority - b.priority || Math.abs(a.x - x) - Math.abs(b.x - x))[0] ?? candidates.sort((a, b) => a.priority - b.priority)[0];
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: q.castTime(), delivery: { kind: "self" }, budgetExcluded: true, roles: ["damage"], persistsAfterDeath: true, allowedDuringChannel: ["R"], usable: (self, world) => !!qTarget(world, self), flags: { projectile: true, spellShield: q.flag("spellShield"), petContactHooks: true } },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), castTime: w.castTime(), delivery: { kind: "self" }, budgetExcluded: true, roles: ["buff"], allowedDuringChannel: ["R"], onSelf: [{ type: "state", state: "ghosted", duration: wFlight }] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cooldownAtCastStart: true, castTime: e.castTime(), delivery: { kind: "self" }, budgetExcluded: true, roles: ["damage"], allowedDuringChannel: ["R"], flags: { grounded: e.flag("grounded"), parry: false, spellShield: e.flag("spellShield"), appliesOnHit: true, dodgeStopsOnHit: true, petContactHooks: true }, usable: (self, world) => !!chooseAnchor(world, self) },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, castTime: r.castTime(), delivery: { kind: "self" }, budgetExcluded: true, roles: ["damage"], persistsAfterDeath: true, channel: { duration: rSeconds, interruptible: true, cancelAfter, cancelBeforeEnd: cancelAfter, cancelAttackAfter: cancelAfter, cancelAttackOtherAfter: cancelAfter }, flags: { projectile: r.flag("projectile"), parry: r.flag("parry"), spellShield: true, appliesOnHit: true, petContactHooks: true }, onHitScale: onHitShare, usable: (self, world) => enemies(world, self, false).some((t) => (!("owner" in t) || t.spec.targetClass === "champion") && Math.abs(t.x - self.x) <= rCastRange) },
    ];
    const [blade, , shunpo, lotus] = abilities as [AbilitySpec, AbilitySpec, AbilitySpec, AbilitySpec];
    const spinAbility: AbilitySpec = { ...shunpo, key: "I", name: "Sinister Steel", flags: { ...shunpo.flags, grounded: false, spellShield: p.flag("spellShield") } };
    const magic = (amount: Formula, label: string): Effect => ({ type: "damage", damageType: "magic", amount, label });
    const spinEffects = [magic(spin, "Sinister Steel")], qEffects = [magic(qDamage, q.name)], eEffects = [magic(eDamage, e.name)];
    const rEffects: Effect[] = [{ type: "damage", damageType: "physical", amount: rPhysical, persistent: true, petDamageCategory: "persistent" }, { type: "damage", damageType: "magic", amount: rMagic, label: r.name, persistent: true, petDamageCategory: "persistent" }, { type: "grievousWounds", duration: grievous }];
    blade.onHit = qEffects; shunpo.onHit = eEffects; lotus.onHit = rEffects;
    const hit = (ctx: HookContext, target: Target, ability: AbilitySpec, effects: Effect[], category: "area" | "singleTarget" | "persistent", originX?: number) => {
      // Dagger on-hit is explicitly champion-only; E/R retain real pet/clone identities.
      const packet = ability.key === "I" && "owner" in target && target.spec.targetClass !== "champion" ? { ...ability, flags: { ...ability.flags, appliesOnHit: false } } : ability;
      if ("owner" in target) abilityHitPet(ctx.world, ctx.self, target, packet, effects, category, 1, originX);
      else abilityHit(ctx.world, ctx.self, target, packet, effects, 1, originX);
    };
    const addDagger = (ctx: HookContext, x: number, seconds: number) => {
      // A dagger is a point, so terrain correction does not use Katarina's hitbox.
      const point = { ...ctx.self, x, spec: { ...ctx.self.spec, base: { ...ctx.self.spec.base, pathingRadius: 0 } } };
      exitTerrain(ctx.world, point);
      const lands = ctx.tick + ticks(seconds);
      saveDaggers(ctx.self, [...readDaggers(ctx.self), { id: ctx.world.nextId++, x: point.x, lands, expires: lands + ticks(lifetime) }]);
    };
    const pickup = (ctx: HookContext, previous = ctx.self.x) => {
      const remaining: Dagger[] = [];
      for (const d of readDaggers(ctx.self)) {
        if (ctx.tick >= d.expires) continue;
        const from = ctx.tick === d.lands ? ctx.self.x : previous;
        if (ctx.tick < d.lands || d.x < Math.min(from, ctx.self.x) - 1e-6 || d.x > Math.max(from, ctx.self.x) + 1e-6) { remaining.push(d); continue; }
        ctx.apply({ type: "refund", ability: "E", fraction: refund, total: true }, true);
        ctx.log("retrieves a landed Dagger");
        for (const target of enemies(ctx.world, ctx.self, false).sort((a, b) => Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x))) if (Math.abs(target.x - ctx.self.x) <= spinRadius) hit(ctx, target, spinAbility, spinEffects, "area");
      }
      saveDaggers(ctx.self, remaining);
    };
    const launch = (ctx: HookContext, target: Target, source: "Q" | "R", x: number, data?: Partial<Flight>) => {
      const speed = source === "Q" ? qSpeed : rSpeed;
      const state: Flight = { target: targetId(target), x: target.x, championClass: !("owner" in target) || target.spec.targetClass === "champion", speed, direction: Math.sign(target.x - x) || directionTo(ctx.self, ctx.enemy), visited: [targetId(target)], bounce: 0, ...data };
      const id = ctx.world.nextId++;
      ctx.memory[FLIGHT + id] = JSON.stringify(state);
      ctx.world.missiles.push({ id, owner: ctx.self.side, source, seenTick: ctx.tick, x, perTick: 0, homing: true, direction: state.direction as 1 | -1, travelLeft: 1, projectile: true, connects: true, scale: 1, onHit: source === "Q" ? qEffects : rEffects, expiresTick: ticks(ctx.world.settings.maxSeconds) + 1, impactTick: state.arrives ?? ctx.tick + Math.max(1, ticks(Math.max(0, Math.abs(target.x - x) - radius(target)) / speed)) });
    };
    const arrive = (ctx: HookContext, missile: Missile, data: Flight, target?: Target, originX?: number) => {
      if (target) hit(ctx, target, missile.source === "Q" ? blade : lotus, missile.source === "Q" ? qEffects : rEffects, missile.source === "Q" ? "area" : "persistent", originX);
      if (missile.source !== "Q") return;
      if (data.firstX === undefined) { data.firstX = data.x; addDagger(ctx, data.firstX + data.direction * qOffset, qLand); }
      if (data.bounce >= maxBounces) return;
      const next = enemies(ctx.world, ctx.self).filter((t) => !data.visited.includes(targetId(t)) && Math.abs(t.x - data.firstX!) <= bounceRadius).sort((a, b) => Math.abs(a.x - data.x) - Math.abs(b.x - data.x))[0];
      if (next) launch(ctx, next, "Q", data.x, { firstX: data.firstX, direction: data.direction, visited: [...data.visited, targetId(next)], bounce: data.bounce + 1, arrives: ctx.tick + ticks(bounceSeconds) });
    };
    const behavior: Behavior = (v) => {
      if (v.self.action?.kind === "channel" && v.self.action.ability === "R") return undefined;
      // Keep the common trade clock and retreat decision before ordering dagger casts.
      const normal = defaultBehavior(v);
      if (v.mode === "trade" && v.self.memory.tradeDone) return normal;
      if (v.mode !== "idle" && v.mode !== "flee" && !v.self.action) {
        // Build the two real dagger opportunities before committing to the channel.
        for (const key of ["Q", "E", "W", "R"]) {
          if (key === "R" && (v.mode === "trade" || v.mode === "hold")) continue;
          const spell = abilities.find((a) => a.key === key)!;
          if (canCast(v.world, v.self, spell)) return { kind: "cast", ability: key };
        }
      }
      return normal;
    };
    return {
      abilities, behavior,
      budget: { damage(self, target) {
        const haste = derive(self).abilityHaste;
        return { magic: evaluate(qDamage, self, target) / cooldownAfterHaste(blade.cooldown, haste) + evaluate(spin, self, target) * (1 / cooldownAfterHaste(blade.cooldown, haste) + 1 / cooldownAfterHaste(abilities[1]!.cooldown, haste)) + evaluate(eDamage, self, target) / cooldownAfterHaste(shunpo.cooldown, haste) + knifeCount * evaluate(rMagic, self, target) / cooldownAfterHaste(lotus.cooldown, haste), physical: knifeCount * evaluate(rPhysical, self, target) / cooldownAfterHaste(lotus.cooldown, haste) };
      } },
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key === "Q") {
            const target = qTarget(ctx.world, ctx.self, ctx.aim);
            ctx.memory["kat:qTarget"] = target ? targetId(target) : -2;
          }
          if (ctx.ability.key === "E") {
            const anchor = chooseAnchor(ctx.world, ctx.self, ctx.aim);
            if (!anchor) { delete ctx.self.cooldownReady.E; return; }
            const x = cursor(ctx.self, ctx.enemy, ctx.aim);
            ctx.self.x = ctx.aim ? Math.max(anchor.x - eSelection, Math.min(anchor.x + eSelection, x)) : anchor.x;
            exitTerrain(ctx.world, ctx.self);
            const targets = enemies(ctx.world, ctx.self, false).filter((t) => Math.abs(t.x - ctx.self.x) <= eHitRadius).sort((a, b) => Number("owner" in a && a.spec.targetClass !== "champion") - Number("owner" in b && b.spec.targetClass !== "champion") || Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x));
            const target = targets[0];
            if (target) hit(ctx, target, shunpo, eEffects, "singleTarget");
            if (!target || target.hp > 0) ctx.self.attackReadyTick = ctx.tick;
            // A blink never sweeps the intervening line for daggers.
            pickup(ctx); ctx.memory["kat:lastX"] = ctx.self.x;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const id = Number(ctx.memory["kat:qTarget"]), target = id === -1 ? ctx.enemy : ctx.world.pets.find((p) => p.id === id);
            if (!target || Math.abs(target.x - ctx.self.x) > qRange || !canTarget(view(ctx.world, ctx.self, target), ctx.self) || ("owner" in target ? target.hp <= 0 : !target.alive)) { delete ctx.self.cooldownReady.Q; return; }
            launch(ctx, target, "Q", ctx.self.x);
          }
          if (ctx.ability.key === "W") { addDagger(ctx, ctx.self.x, wFlight); ctx.memory["kat:hasteStart"] = ctx.tick; ctx.buff("kat:haste", "moveSpeedPercent", wSpeed, wFlight); }
          if (ctx.ability.key === "R") { ctx.memory["kat:rStart"] = ctx.tick; ctx.memory["kat:rDone"] = 0; }
        },
        onTick(ctx) {
          if (!ctx.self.alive || ctx.self.hp <= 0) return;
          pickup(ctx, Number(ctx.memory["kat:lastX"] ?? ctx.self.x)); ctx.memory["kat:lastX"] = ctx.self.x;
          const hasteStart = Number(ctx.memory["kat:hasteStart"] ?? -Infinity), elapsed = ctx.tick - hasteStart;
          if (elapsed >= 0 && elapsed < ticks(wFlight)) ctx.buff("kat:haste", "moveSpeedPercent", wSpeed * Math.max(0, 1 - elapsed / (wFlight * 30)), Math.min(2 / 30, wFlight - elapsed / 30));
          if (ctx.self.action?.kind !== "channel" || ctx.self.action.ability !== "R") return;
          const start = Number(ctx.memory["kat:rStart"]), due = Math.min(knifeCount, Math.floor((ctx.tick - start) * rRate / 30 + 1e-9));
          while (Number(ctx.memory["kat:rDone"]) < due) {
            ctx.memory["kat:rDone"] = Number(ctx.memory["kat:rDone"]) + 1;
            const targets = enemies(ctx.world, ctx.self, false).filter((t) => (!("owner" in t) || t.spec.targetClass === "champion") && Math.abs(t.x - ctx.self.x) <= rRange).sort((a, b) => Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x)).slice(0, rTargets);
            for (const target of targets) launch(ctx, target, "R", ctx.self.x);
            if (targets.length) ctx.apply({ type: "state", state: "revealed", duration: revealSeconds }, true);
          }
        },
        onMissileTick(ctx) {
          const key = FLIGHT + ctx.missile.id, raw = ctx.memory[key]; if (typeof raw !== "string") return;
          const data = JSON.parse(raw) as Flight, missile = ctx.missile;
          const target = data.target === -1 ? ctx.enemy : ctx.world.pets.find((p) => p.id === data.target);
          if (!target && data.championClass && !ctx.memory[`kat:petKilled:${data.target}`]) { missile.ended = true; delete ctx.memory[key]; return; }
          if (target) data.x = target.x;
          if (target && (inStasis(view(ctx.world, ctx.self, target)) || isUntargetable(view(ctx.world, ctx.self, target), ctx.self))) { missile.ended = true; delete ctx.memory[key]; return; }
          const from = missile.x;
          const direction = Math.sign(data.x - from);
          const remaining = Math.max(0, Math.abs(data.x - from) - (target ? radius(target) : 0));
          const step = data.arrives === undefined ? data.speed / 30 : remaining / Math.max(1, data.arrives - ctx.tick + 1);
          const to = from + direction * Math.min(remaining, step);
          if (interceptProjectile(ctx.world, missile, from, to)) return;
          missile.x = to;
          const blockedAt = projectileBlockPoint(ctx.world, ctx.self.side, from, missile.x);
          if (blockedAt !== undefined) { missile.x = blockedAt; missile.ended = true; delete ctx.memory[key]; return; }
          const arrived = data.arrives === undefined ? Math.abs(data.x - missile.x) <= (target ? radius(target) : 0) + 1e-6 : ctx.tick >= data.arrives;
          if (!arrived) { missile.impactTick = data.arrives ?? ctx.tick + Math.max(1, ticks(Math.max(0, Math.abs(data.x - missile.x) - (target ? radius(target) : 0)) / data.speed)); ctx.memory[key] = JSON.stringify(data); return; }
          missile.ended = true; delete ctx.memory[key];
          arrive(ctx, missile, data, target, from);
        },
        onProjectileIntercept(ctx) {
          const raw = ctx.memory[FLIGHT + ctx.missile.id]; if (typeof raw !== "string") return false;
          const data = JSON.parse(raw) as Flight;
          // Replace the intended recipient of this leg with its actual collision identity.
          const previous = data.visited.filter(id => id !== data.target);
          if (previous.includes(targetId(ctx.target))) return true;
          data.visited = [...previous, targetId(ctx.target)];
          data.target = targetId(ctx.target); data.x = ctx.target.x;
          arrive(ctx, ctx.missile, data, ctx.target, ctx.from);
          return true;
        },
        onMissileEnd(ctx) { delete ctx.memory[FLIGHT + ctx.missile.id]; },
        onKill(ctx) {
          if (ctx.pet) { ctx.memory[`kat:petKilled:${ctx.pet.id}`] = ctx.tick + 1; return; }
          // A duel's actual self-credited killing damage is itself within the reset window.
          // onKill runs before onDamageDealt for that packet, including a first-hit kill.
          if (!("side" in ctx.victim) || ctx.victim.side === ctx.self.side || ctx.victim.hp > 0) return;
          for (const key of ["Q", "W", "E", "R"]) ctx.apply({ type: "refund", ability: key, seconds: killRefund }, true);
        },
      },
    };
  },
};

export default katarina;
