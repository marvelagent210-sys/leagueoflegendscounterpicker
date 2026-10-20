/** Kalista: uncancellable basics, target-local Rend and kill-dependent Pierce continuation. */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import { EPSILON, canCast, inAttackRange } from "../../engine/sim/actions";
import { defaultBehavior, expectedDamage, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, hookContext, inStasis, isUntargetable } from "../../engine/sim/combat";
import { canMove, derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { dashDistance } from "../../engine/sim/terrain";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const REND = "kalista:rend", LOCK = "kalista:rendLockUntil";
const kalista: KitModule = {
  champion: "Kalista",
  options: { martialPoise: { label: "Use barefeet Martial Poise hops (0 disables the approximate dash policy)", default: 1 } },
  build(kit, options) {
    const p = kit.ability("I"), a = kit.ability("Basic Attack"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const attackRange = a.field("attackRange"), missileSpeed = a.field("speed"), windupModifier = a.quoted("only reduced by 0.75% per 1% bonus attack speed") / 1;
    a.quote("uncancellable except by casting Rend");
    const forwardHop = p.quoted("minimum dash range is 140"), backHop = p.quoted("Minimum dash range of 225 units when dashing backwards"), qForwardHop = p.quoted("Dash range of Pierce is 300 units"), qBackHop = p.quoted("minimum distance of 150 units"), hopSpeed = p.quoted("Dash Speed: 1025"), hopEnabled = options.martialPoise !== 0;
    p.quote("dash speed is unaffected by additive movement speed modifiers"); p.quote("Sleep does not count for knocking the dash down"); p.quote("dash while immobilized or grounded");
    const qDamage = q.formula("Physical Damage"); q.quote("only the last target killed will have their Rend stacks transferred");
    const rendSeconds = e.quoted("Rend to enemies for 4 seconds"), maxStacks = e.quoted("stacking up to 254 times"), rendRange = e.field("effectRadius"), rendFirst = e.formula("Physical Damage"), rendAdditional = e.formula("Bonus Damage per Additional Stack"), rendSlow = { base: e.baseOf("Slow") / 100, ratios: { AP: e.quoted("(+ 5% per 100 AP)") / 10000 } }, rendSlowSeconds = e.quoted("slow them for 2 seconds"), manaRefund = e.number("Mana Restored"), rendCast = e.castTime(), rendCost = e.cost();
    e.quote("Rend applies its effects instantly on cast"); e.quote("in-flight missiles"); e.quote("during the cast time of Pierce"); e.quote("repeat the first-spear damage"); e.quote("resurrection effects"); e.quote("Sion under the effects of Glory in Death"); e.quote("lower cast range than effect range");
    w.quote("While Kalista and her Oathsworn are tethered"); w.formula("Bonus Magic Damage"); w.number("Maximum Non-Champion Damage"); w.field("targetCooldown"); w.field("tetherRadius"); w.quote("does not reveal stealthed targets");
    const sentinel = kit.pet("Sentinel"), sentinelHP = sentinel.stat("hp"), sentinelMS = sentinel.stat("movespeed"), sentinelRadius = sentinel.stat("radius");
    const sight = Number(sentinel.record.text.sight); sentinel.quote(sentinel.record.text.sight!);
    const sentinelChase = sentinel.quoted("chases them for 4 seconds"), sentinelLaps = sentinel.quoted("for 3 laps"), sentinelSlow = sentinel.quoted("slowed by 50% while at 1 health") / 100;
    sentinel.quote("Not a valid target to minions, turrets and abilities"); sentinel.quote("Immune to crowd control");
    const sentinelRanges = w.fieldNumbers("targetRange"), sentinelMin = sentinelRanges[0]!, sentinelMax = sentinelRanges[1]!, sentinelCharges = w.quoted("maximum of 2");
    r.field("targetRange"); r.number("Airborne Duration"); r.quote("The Oathsworn must be within tether range"); r.quote("Kalista's death does not cancel Fate's Call");
    const count = (target: Unit, self: Unit, tick: number) => target.statuses.find((s) => s.kind === "mark" && s.key === REND && s.source === self.side && s.endTick > tick)?.value ?? 0;
    const addStacks = (ctx: HookContext, amount: number) => applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: REND, duration: rendSeconds, value: Math.min(maxStacks, count(ctx.enemy, ctx.self, ctx.tick) + amount) }, { scale: 1 });
    const damage = (self: Unit, target: Unit, stacks: number) => evaluate(rendFirst, self, target) + Math.max(0, stacks - 1) * evaluate(rendAdditional, self, target);
    const packet = (self: Unit, target: Unit, stacks: number): Effect[] => [{ type: "damage", damageType: "physical", amount: { base: damage(self, target, stacks) }, petDamageCategory: "area" }, { type: "cc", cc: "slow", strength: evaluate(rendSlow, self, target), duration: rendSlowSeconds }];
    const lock: AbilitySpec = { key: "RendLock", name: `${e.name} (cast lock)`, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, roles: [] };
    const hop: AbilitySpec = { key: "Hop", name: p.name, slot: "I", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { grounded: true, knockdown: true }, roles: [] };
    const rendPacket: AbilitySpec = { key: "Ehit", name: e.name, slot: "other", activation: "internal", usable: () => false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: rendFirst }], roles: [], persistsAfterDeath: true };
    const rendable = (ctx: HookContext) => {
      const found: Unit[] = [];
      if (ctx.enemy.alive && !inStasis(ctx.enemy) && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= rendRange + EPSILON && count(ctx.enemy, ctx.self, ctx.tick) > 0) found.push(ctx.enemy);
      for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable) { const target = petFormulaTarget(pet, ctx.self, ctx.tick); if (!inStasis(target) && !isUntargetable(target, ctx.self) && Math.abs(target.x - ctx.self.x) <= rendRange + EPSILON && count(target, ctx.self, ctx.tick) > 0) found.push(target); }
      return found;
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed"), radius: q.field("width") / 2, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { spellShield: true, projectile: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true, usable: (self, world) => self.action?.kind !== "windup" && world.tick >= Number(self.memory[LOCK] ?? -1), roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), castTime: w.castTime(), charges: { max: sentinelCharges, recharge: w.field("recharge") }, delivery: { kind: "self" }, roles: [], budgetExcluded: true, usable: (self) => self.action?.kind !== "windup" },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: rendCost, castTime: rendCast, castTimeFor: () => 0, overlay: true, delivery: { kind: "self" }, usable: (self, world) => world.tick >= Number(self.memory[LOCK] ?? -1) && rendable(hookContext(world, self)).length > 0, estimate: (self, target) => count(target, self, 0) > 0 ? damage(self, target, count(target, self, 0)) : 0, roles: ["damage", "cc"], budgetExcluded: true },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, usable: () => false, roles: [], budgetExcluded: true },
      lock, hop, rendPacket,
    ];
    const refund = (ctx: HookContext) => { ctx.self.cooldownReady.E = ctx.tick; ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + manaRefund); };
    const rip = (ctx: HookContext, firstOnly = false) => {
      const stacks = firstOnly ? 1 : count(ctx.enemy, ctx.self, ctx.tick); if (!(stacks > 0)) return;
      if (!firstOnly) { ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === REND && s.source === ctx.self.side)); const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((p) => p.id === ctx.enemy.petId); if (pet) pet.statuses = ctx.enemy.statuses; }
      ctx.memory["kalista:rending"] = true;
      const effects = packet(ctx.self, ctx.enemy, stacks);
      if (ctx.enemy.petId === undefined) abilityHit(ctx.world, ctx.self, ctx.enemy, rendPacket, effects);
      else { const pet = ctx.world.pets.find((p) => p.id === ctx.enemy.petId); if (pet) abilityHitPet(ctx.world, ctx.self, pet, rendPacket, effects, "area"); }
      ctx.memory["kalista:rending"] = false;
      if (ctx.enemy.spec.id.toLowerCase() === "sion" && ctx.enemy.fallen && ctx.enemy.alive) refund(ctx);
    };
    const beginHop = (ctx: HookContext, fromQ: boolean) => {
      const direction = Number(ctx.memory["kalista:hopDirection"] ?? ctx.self.move);
      delete ctx.memory["kalista:hopDirection"];
      if (!hopEnabled || direction === 0 || !canMove(ctx.self) || ctx.self.statuses.some((s) => s.kind === "cc" && ["ground", "polymorph"].includes(s.key))) return;
      const forward = direction > 0, distance = fromQ ? forward ? qForwardHop : qBackHop : forward ? forwardHop : backHop;
      // The source provides a nominal speed but no complete server formula for AS scaling.
      const withoutFlat = { ...ctx.self, statuses: ctx.self.statuses.filter((s) => !(s.kind === "stat" && s.key === "moveSpeedFlat")) }, multiplier = derive(withoutFlat).rawMoveSpeed / ctx.self.spec.base.moveSpeed;
      const dx = dashDistance(ctx.world, ctx.self, directionTo(ctx.self, ctx.enemy) * (forward ? 1 : -1) * distance), speed = hopSpeed * Math.max(EPSILON, multiplier), duration = Math.max(1, ticks(Math.abs(dx) / speed));
      ctx.self.action = { kind: "dash", ability: "Hop", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: dx / duration, stopAtContact: false, unstoppable: false, crossTerrain: true };
      ctx.self.move = 0;
    };
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      const active = view.mode === "fight" || view.mode === "kite" || view.mode === "trade" || view.mode === "flee";
      if (active && hopEnabled && (view.self.action?.kind === "windup" || view.self.action?.kind === "cast" && view.self.action.ability === "Q")) {
        const away = view.mode === "flee" || view.mode === "kite" || view.distance + backHop <= attackRange;
        view.self.memory["kalista:hopDirection"] = away ? -1 : 1;
      }
      if (!active || command?.kind === "cast" && command.dodge !== undefined) return command;
      const n = count(view.enemy, view.self, view.world.tick), ready = canCast(view.world, view.self, abilities[2]!);
      if (ready && n > 0 && (!inAttackRange(view.self, view.enemy) || n >= maxStacks || expectedDamage(packet(view.self, view.enemy, n), view.self, view.enemy, true) >= view.enemy.hp)) return { kind: "cast", ability: "E" };
      // Do not strip a growing stack merely because E's static role looks attractive.
      if (command?.kind === "cast" && command.ability === "E") {
        if (!view.self.action && inAttackRange(view.self, view.enemy) && view.self.attackReadyTick <= view.world.tick) return { kind: "attack" };
        return { kind: "move", direction: inAttackRange(view.self, view.enemy) ? 0 : 1 };
      }
      return command;
    };
    kit.assume("The current pinned basic attack deals ordinary100%AD physical damage and ordinary critical strikes; historical90%AD and sight-loss penalties are absent from the current source. Its35.9999998659% base windup uses the pinned0.75 modifier, is uncancellable by movement, and may be cancelled by Rend. Automatic retargeting during an already-declared windup is not optimized.");
    kit.assume("Martial Poise defaults to barefeet forward140/backward225-unit attack hops and forward300/backward150-unit Pierce hops on the duel's axis. The normal policy buffers a retreat while kiting/fleeing or while a backward hop retains attack range, otherwise an advance. It uses the sourced nominal1025 speed, scaled by the engine's multiplicative movement-speed/slows while excluding additive movement-speed buffs. The complete attack-speed velocity formula is not present in the pinned wiki/client evidence; positive AS velocity scaling remains unresolved and is deliberately omitted. This can understate high-AS Kalista kiting. Set martialPoise=0 to inspect stationary combat. No unproved full-speed formula or boot item is invented. Terrain uses the shared clear-endpoint jump rules, and ordinary immobilization/grounding prevents launch; the source's sleep knockdown bug is not specially emulated.");
    kit.assume("Rend lives on each actual champion/summon, starts empty, refreshes4 seconds, and caps254 stacks. Accepted basics and unshielded Pierce apply stacks; blind/dodge/block/parry do not. E consumes all eligible in-range marks and resolves immediately, spending mana and starting cooldown before its0.25-second cast lock. Its reference castTime remains0.25 while the instantaneous delivery uses castTimeFor=0 plus a local lock. Existing Pierce casts and hops retain their absolute clocks. Untargetable/stasis targets keep their marks and cannot supply an activation target. The pinned page gives1100 effect radius but only says cast range is lower; this model openly uses1100 for activation because the smaller exact distance is unavailable.");
    kit.assume("Pierce flies at2400, collides with the first real spell target, and continues only if that contacted target dies. It carries only the last killed target's pre-contact Rend stacks, following the pinned multi-kill bug rather than accumulating all corpses. An unshielded surviving target receives its carried stacks plus its own new spear. E empowers already-flying basic/Pierce missiles to rend immediately on impact; an E during an unfinished Q also empowers its future missile and models the documented additional first-spear repeat on the previously rended target at impact. These finite launched packets can finish after Kalista's death. Monster-only50% damage reduction is absent because the duel has no epic jungle monsters.");
    kit.assume("Rend kill resets and30 mana refunds require an actual counted E kill; resurrection-protected targets grant none. A targetable Sion already in Glory in Death grants the documented reset even when it survives. The offensive policy keeps accumulating spears while basic attacks remain in range and rends when leaving attack reach or when its damage after resistance, reductions and shields can finish the target; it is an explicit policy rather than an exhaustive timing search. The budget amortizes a sustained E cycle containing ordinary attacks and one Q application per Q cycle, without pre-awarding kill refunds.");
    kit.assume("There is no Oathsworn allied champion in the duel. Soul-Mark contributes no fabricated18%-max-health magic damage, and Fate's Call cannot be cast to grant Kalista her ally's invulnerability, retrieval or two-second knockup. W can be cast manually as a two-charge,50-second-recharge scout with0.5-second cast and30-second between-cast cooldown; the damage policy does not waste casts on a scout when ordinary global duel visibility already suffices.");
    kit.assume("A Sentinel is a two-basic-hit, non-attacking, CC-immune pet invalid to abilities. It patrols the selected1400–5000-unit line for three round trips at280 speed, half at one health, detects visible champions within450, then chases/reports ordinary sight for4 seconds and disappears. Its raw65 radius is an upstream assumed default. The two-dimensional forward cone, obstacle routing, and unquantified rapid decay of its initial+200 speed are not asserted. The shared pet lifecycle removes scouts when their owner dies.");
    return {
      attack: { range: attackRange, missileSpeed, onHitToPets: true }, base: { windup: { percent: kit.champion.forms[0]!.stats.windup.percent, modifier: windupModifier } }, abilities, behavior,
      budget: { damage(self, target) { const d = derive(self), haste = 1 + d.abilityHaste / 100, cycle = abilities[2]!.cooldown / haste + rendCast, stacks = Math.min(maxStacks, d.attackSpeed * cycle + cycle / (abilities[0]!.cooldown / haste + abilities[0]!.castTime)); return { physical: damage(self, target, Math.max(1, stacks)) / cycle }; } },
      hooks: {
        onAttack(ctx) { ctx.action.uncancellable = true; },
        onAttackLaunch(ctx) { if (ctx.action.pet !== undefined && !ctx.targetPet) return false; beginHop(ctx, false); },
        onAttackHit(ctx) { if (!ctx.blocked) { addStacks(ctx, ctx.scale); if (ctx.attack.attackTag === "kalista:rend") rip(ctx); } },
        onAttackPetHit(ctx) { if (!ctx.blocked) { addStacks(ctx, ctx.scale); ctx.pet.statuses = ctx.enemy.statuses; if (ctx.attack.attackTag === "kalista:rend") rip(ctx); } },
        onCast(ctx) {
          if (ctx.ability.key === "Q") { ctx.memory["kalista:qCarry"] = 0; ctx.memory["kalista:qLaunchEmpowered"] = ctx.memory["kalista:qFutureRend"] === true; delete ctx.memory["kalista:qFutureRend"]; beginHop(ctx, true); if (!ctx.self.action && ctx.tick < Number(ctx.memory[LOCK] ?? -1)) ctx.self.action = { kind: "cast", ability: "RendLock", startTick: ctx.tick, endTick: Number(ctx.memory[LOCK]) }; }
          if (ctx.ability.key === "E") {
            const castingQ = ctx.self.action?.kind === "cast" && ctx.self.action.ability === "Q";
            if (castingQ) ctx.memory["kalista:qFutureRend"] = true;
            for (const m of ctx.world.missiles) if (m.owner === ctx.self.side && (m.source === "Q" || m.attack)) { if (m.attack) m.attack.attackTag = "kalista:rend"; else ctx.memory[`kalista:rendMissile:${m.id}`] = true; }
            const chosen = rendable(ctx);
            for (const target of chosen) { if (castingQ) ctx.memory[`kalista:qDouble:${target.petId ?? "champion"}`] = true; rip({ ...ctx, enemy: target }); }
            ctx.memory[LOCK] = ctx.tick + ticks(rendCast);
            ctx.apply({ type: "state", state: "noAttacks", duration: rendCast }, true);
            if (!ctx.self.action) ctx.self.action = { kind: "cast", ability: "RendLock", startTick: ctx.tick, endTick: ctx.tick + ticks(rendCast) };
          }
          if (ctx.ability.key === "W") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.max(sentinelMin, Math.min(sentinelMax, ctx.aim?.distance ?? sentinelMin)), start = ctx.self.x;
            const scout = spawnPet(ctx.world, ctx.self, { kind: "kalista:sentinel", name: sentinel.name, hp: sentinelHP, armor: 0, mr: 0, hitPoints: true, radius: sentinelRadius, moveSpeed: 0, duration: Infinity, ccImmune: Object.keys(CC_RULES) as CCType[], target: (world, pet) => {
              const owner = world.units[pet.owner], enemy = world.units[1 - pet.owner]!, chaseEnd = pet.memory.chaseEnd;
              if (chaseEnd === undefined && enemy.alive && canSee(enemy, owner) && Math.abs(enemy.x - pet.x) <= sight + EPSILON) { pet.memory.chaseEnd = world.tick + ticks(sentinelChase); pet.endTick = Number(pet.memory.chaseEnd); }
              const chasing = pet.memory.chaseEnd !== undefined, end = chasing ? enemy.x : Number(pet.memory.leg ?? 0) % 2 === 0 ? Number(pet.memory.far) : Number(pet.memory.home), speed = sentinelMS * (pet.hp < sentinelHP ? 1 - sentinelSlow : 1), dx = Math.sign(end - pet.x) * Math.min(speed / 30, Math.abs(end - pet.x)); pet.x += dx;
              if (chasing) { if (enemy.alive && canSee(enemy, owner)) applyEffect(world, owner, enemy, { type: "mark", key: "kalista:sentinelSight", duration: 1 / 30 }, { scale: 1 }); }
              else if (Math.abs(end - pet.x) <= EPSILON) { pet.memory.leg = Number(pet.memory.leg ?? 0) + 1; if (Number(pet.memory.leg) >= sentinelLaps * 2) pet.endTick = world.tick; }
              return undefined;
            } }, start);
            scout.memory.home = start; scout.memory.far = start + direction * distance; scout.memory.leg = 0;
          }
        },
        onTick(ctx) { if (!ctx.self.action && ctx.tick < Number(ctx.memory[LOCK] ?? -1)) ctx.self.action = { kind: "cast", ability: "RendLock", startTick: ctx.tick, endTick: Number(ctx.memory[LOCK]) }; },
        onMissileTick(ctx) { if (ctx.missile.source === "Q") { if (ctx.memory["kalista:qLaunchEmpowered"]) { ctx.memory[`kalista:rendMissile:${ctx.missile.id}`] = true; ctx.memory["kalista:qLaunchEmpowered"] = false; } ctx.memory["kalista:qActiveEmpowered"] = ctx.memory[`kalista:rendMissile:${ctx.missile.id}`] === true; } },
        onAbilityContact(ctx) { if (ctx.ability.key === "Q") ctx.memory["kalista:qBefore"] = count(ctx.enemy, ctx.self, ctx.tick); },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q") return;
          if (ctx.enemy.hp > 0) { addStacks(ctx, (1 + Number(ctx.memory["kalista:qCarry"] ?? 0)) * ctx.scale); if (ctx.memory["kalista:qActiveEmpowered"]) { rip(ctx); const double = `kalista:qDouble:${ctx.enemy.petId ?? "champion"}`; if (ctx.memory[double]) { delete ctx.memory[double]; rip(ctx, true); } } }
        },
        onMissileContact(ctx) { if (ctx.missile.source !== "Q") return; if (ctx.enemy.hp <= 0 || ctx.targetPet && !ctx.world.pets.includes(ctx.targetPet)) ctx.memory["kalista:qCarry"] = Number(ctx.memory["kalista:qBefore"] ?? 0); else { ctx.missile.ended = true; delete ctx.memory[`kalista:rendMissile:${ctx.missile.id}`]; ctx.memory["kalista:qActiveEmpowered"] = false; for (const key of Object.keys(ctx.memory)) if (key.startsWith("kalista:qDouble:")) delete ctx.memory[key]; } },
        onMissileEnd(ctx) { if (ctx.missile.source === "Q") { delete ctx.memory[`kalista:rendMissile:${ctx.missile.id}`]; ctx.memory["kalista:qActiveEmpowered"] = false; for (const key of Object.keys(ctx.memory)) if (key.startsWith("kalista:qDouble:")) delete ctx.memory[key]; } },
        onKill(ctx) { if (ctx.memory["kalista:rending"]) refund(ctx); },
      },
    };
  },
};
export default kalista;
