/** Malzahar: pinned 26.20 infection clocks, staggered Voidlings and independent R lifecycles. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { addStatus, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { nearestPetTarget, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const INFECTION = "malzahar:E";
const VOID_SHIFT = "malzahar:voidShift";
const malzahar: KitModule = {
  champion: "Malzahar",
  
  build(kit, options) {
    const passive = kit.ability("Void Shift"), q = kit.ability("Call of the Void"), w = kit.ability("Void Swarm"), e = kit.ability("Malefic Visions"), r = kit.ability("Nether Grasp");
    const voidling = kit.pet("Voidling");
    const passiveCooldown = passive.field("staticCooldown"), linger = passive.quoted("lingers for 0.25 seconds before expiring");
    const reduction = passive.quoted("reduces incoming damage from non-minions by 90%") / 100;
    passive.quote("will not mitigate true damage but the buff will still be consumed");
    passive.quote("Void Shift will not resist allied crowd control nor will it be deactivated by them");
    passive.quote("Void Shift does not prevent E trap drowsy");
    passive.quote("Spell shields take priority over Void Shift for abilities that contain a crowd control effect");
    passive.quote("if the shield fully mitigates the damage, Void Shift will not be consumed");
    const qDamage = q.formula("Magic Damage"), qSilence = q.number("Silence Duration"), qDelay = q.quoted("After 0.4 seconds"), qRange = q.field("targetRange"), qRadius = q.field("effectRadius");
    q.quote("Malefic Visions debuff will also be removed");
    const stackCap = w.quoted("up to a maximum of 2"), spawnDelay = w.quoted("after a 0.5-second delay"), spawnGap = w.quoted("0.5 seconds after the previous one");
    const petDuration = w.number("Voidling Duration"), spawnRange = w.field("targetRange");
    w.quote("Zz'Rot Swarm stacks are gained per cast and not per ability activation");
    w.quote("Malzahar loses all stacks upon death");
    const petAttack: Formula = { base: w.baseOf("Magic Damage") + w.quoted("(+ 12 / 14 / 16 / 18 / 20)", 4), ratios: { bonusAD: w.quoted("(+ 40% bonus AD)") / 100, AP: w.quoted("(+ 20% AP)") / 100 } };
    const petStats = { hp: voidling.stat("hp"), armor: voidling.stat("armor"), mr: voidling.stat("magicresist"), interval: 1 / voidling.stat("attackspeed"), range: voidling.stat("range"), radius: voidling.stat("radius"), moveSpeed: voidling.stat("movespeed") };
    voidling.quote("champion basic attacks will kill Voidlings regardless of their health");
    voidling.quote("attacks can be mitigated by block, dodge, and blind, as well as stopped by Disarm");
    voidling.quote("The attacks of all Voidlings are considered to belong to the same cast instance");
    voidling.quote("Prioritize attacking Nether Grasp target and enemies (champions have a higher priority than minions) infected by Malefic Visions, or the nearest target.");
    const minionMultiplier = 1 + w.quoted("increased by 200% to enemy minions infected by Malefic Visions") / 100;
    const eTotal = e.formula("Total Magic Damage"), ePulse = e.formula("Magic Damage Per Tick");
    const infectionSeconds = e.quoted("every 0.25 seconds over 4 seconds", 1), infectionInterval = e.quoted("every 0.25 seconds over 4 seconds"), ePulses = infectionSeconds / infectionInterval;
    const bounceRange = e.field("effectRadius", "Bounce"), manaRefund = e.quoted("restores 2% of his maximum mana") / 100;
    e.quote("not be cancelled if the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time");
    const tetherTotal = r.formula("Total Magic Damage", 0), tetherPulse = r.formula("Magic Damage Per Tick", 0), poolTotal = r.formula("Total Magic Damage", 1), poolPulse = r.formula("Magic Damage Per Tick", 1);
    const channelSeconds = r.quoted("channels for up to 2.5 seconds"), tetherInterval = r.quoted("magic damage every 0.25 seconds"), tetherRange = r.field("tetherRadius");
    const poolSeconds = r.quoted("lasts 5 seconds"), poolInterval = r.quoted("magic damage every 0.5 seconds"), poolMinionCap = r.quoted("capped at 120 per tick");
    r.quote("The tether will not break if the target enters a zombie state or enters resurrection");
    r.quote("can be damaged again by the remaining ticks if they re-enter the tether range within the duration");
    r.quote("Removing the suppression will also remove the reveal");
    r.quote("Null Zone will persist even if the channel is interrupted");
    r.quote("Spell shield prevents both the tether and the Null Zone from appearing");
    r.quote("Malzahar places himself onto the ground and interrupts displacements affecting him upon starting the channel.");
    const radiusSource = r.gameQuote("mSpell.castRadius: [280,280,280,280,280,280,280]");
    r.gameQuote('"constraintRange":{"mPerLevelValues":[280,280,280,280,280,280]');
    r.gameQuote('"__type":"TargeterDefinitionAoe"');
    const poolRadii = JSON.parse(radiusSource.slice(radiusSource.indexOf("["))) as number[];
    const poolRadius = poolRadii[0]!;
    if (!poolRadii.every((value) => value === poolRadius)) throw new Error("Malzahar R radius series needs review");
    const executeBase = e.gameQuoted('"mLevel1Value":10'), executeGrowth = e.gameQuoted('"mInitialBonusPerLevel":2');
    e.gameQuote('"mBreakpoints":[{"mLevel":12,"__type":"Breakpoint"}]');
    const executeThreshold = executeBase + executeGrowth * 19;
    const qCD = q.cooldown(), eCD = e.cooldown(), wCD = w.cooldown(), rCD = r.cooldown(), eRange = e.field("targetRange"), eCast = e.castTime(), rCast = r.castTime();
    r.quote("move=Disabled for the first 0.5 seconds. Interrupts afterwards.");
    r.quote("attack=Disabled if attacking Nether Grasp target. Otherwise interrupts after 0.5 seconds of channeling.");
    const moveLock = r.quoted("move=Disabled for the first 0.5 seconds. Interrupts afterwards.");
    if (r.textField("cooldownStart") !== "on-cast") throw new Error("Malzahar R cooldown start needs review");
    const packet = (key: string, name: string, damage: Formula): AbilitySpec => ({ key, name, slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, projectile: false }, usable: () => false, onHit: [{ type: "damage", damageType: "magic", amount: damage, persistent: true, label: name }] });
    const ep = packet("EP", e.name, ePulse), rp = packet("RP", r.name, tetherPulse), pool = packet("RPOOL", "Null Zone", poolPulse);
    pool.onHit = [{ type: "damage", damageType: "magic", amount: poolPulse, persistent: true, label: "Null Zone", amountFor: (self, target) => Math.min(evaluate(poolPulse, self, target), target.petId !== undefined ? poolMinionCap : Infinity) }];
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: q.castTime(), delivery: { kind: "circle", range: qRange, radius: qRadius, delay: qDelay }, flags: { projectile: false, spellShield: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "silence", duration: qSilence }], roles: ["damage", "cc"], decisive: true },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, roles: ["damage"], estimate: (self, target) => evaluate(petAttack, self, target) * (1 + Number(self.memory.malzStacks ?? 0)) },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cost: e.cost(), castTime: eCast, retainTargetOnInvalidation: true, delivery: { kind: "target", range: eRange }, flags: { projectile: false, spellShield: true }, onHit: [{ type: "mark", key: INFECTION, duration: infectionSeconds }], roles: ["damage"], estimate: (self, target) => evaluate(eTotal, self, target) },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: rCast, cooldownAtCastStart: true, delivery: { kind: "target", range: r.field("targetRange") }, flags: { projectile: false, spellShield: true }, onHit: [{ type: "knockdown" }, { type: "cc", cc: "suppression", duration: channelSeconds }], channel: { duration: channelSeconds, interruptible: true, cancelAfter: moveLock, cancelAttackOtherAfter: moveLock }, allowedDuringChannel: ["R"], roles: ["damage", "cc"], estimate: (self, target) => evaluate(tetherTotal, self, target) + evaluate(poolTotal, self, target) },
      ep, rp, pool,
    ];
    for (const ability of abilities) if (["Q", "W", "E"].includes(ability.key)) ability.allowedDuringChannel = ["R"];
    const infectionKey = (target: Unit | Pet) => "side" in target ? `unit:${target.side}` : `pet:${target.id}`;
    const infected = (target: Unit | Pet, owner: Unit, tick: number) => Number(owner.memory[`malzE:${infectionKey(target)}:until`] ?? -1) >= tick;
    const removeInfection = (world: World, self: Unit, target: Unit | Pet) => {
      const key = infectionKey(target);
      delete self.memory[`malzE:${key}:until`];
      world.scheduled = world.scheduled.filter((entry) => !(entry.owner === self.side && entry.ability === "EP" && ("side" in target ? entry.target === target.side : entry.targetPet === target.id)));
      target.statuses = (target.statuses ?? []).filter((status) => !(status.key === INFECTION && status.source === self.side));
    };
    const infect = (world: World, self: Unit, target: Unit | Pet, scale: number, refresh = false) => {
      const key = infectionKey(target), memory = self.memory;
      const continuing = refresh && infected(target, self, world.tick);
      const originalStart = continuing ? Number(memory[`malzE:${key}:start`]) : world.tick;
      const next = continuing ? Math.max(1, Number(memory[`malzE:${key}:ordinal`] ?? 1)) : 1;
      const magnitude = continuing ? Number(memory[`malzE:${key}:damage`]) : evaluate(ePulse, self, "side" in target ? target : petFormulaTarget(target, self)) * scale;
      removeInfection(world, self, target);
      memory[`malzE:${key}:start`] = originalStart;
      memory[`malzE:${key}:until`] = world.tick + ticks(infectionSeconds);
      memory[`malzE:${key}:damage`] = magnitude;
      memory[`malzE:${key}:ordinal`] = next;
      memory[`malzE:${key}:fallen`] = "side" in target && !!target.fallen;
      target.statuses = [...(target.statuses ?? []), { kind: "mark", key: INFECTION, source: self.side, startTick: world.tick, endTick: world.tick + ticks(infectionSeconds) + 1, value: scale }];
      for (let ordinal = next; ; ordinal++) {
        const tick = originalStart + ticks(ordinal * infectionInterval);
        if (tick > world.tick + ticks(infectionSeconds)) break;
        if (tick <= world.tick) continue;
        const effects: Effect[] = [{ type: "damage", damageType: "magic", amount: flat(magnitude), persistent: true, label: e.name }];
        if (!("side" in target)) effects.push({ type: "execute", threshold: flat(executeThreshold) });
        world.scheduled.push({ tick, owner: self.side, target: "side" in target ? target.side : (1 - self.side) as 0 | 1, ...("side" in target ? {} : { targetPet: target.id }), effects, ability: "EP", scale: 1 });
      }

      if (!("side" in target) && !target.memory.malzDamageWrapped) {
        const original = target.spec, sourceSide = self.side;
        target.spec = { ...original, onDamaged(hit) {
          original.onDamaged?.(hit);
          const owner = hit.world.units[sourceSide];
          if (hit.dealt > 0 && hit.pet.hp > 0 && hit.attacker.side === sourceSide && (hit.ability === q.name || hit.ability === r.name || hit.ability === "Null Zone") && infected(hit.pet, owner, hit.world.tick)) infect(hit.world, owner, hit.pet, 1, true);
        } };
        target.memory.malzDamageWrapped = true;
      }
    };
    const spread = (world: World, self: Unit, dead: Unit | Pet) => {
      if (!infected(dead, self, world.tick)) return;
      const location = dead.x;
      removeInfection(world, self, dead);
      self.resource = Math.min(derive(self).maxResource, self.resource + manaRefund * derive(self).maxResource);
      const candidates: (Unit | Pet)[] = [...world.units.filter((unit) => unit !== dead && unit.side !== self.side && unit.alive && unit.hp > 0 && !isUntargetable(unit, self)), ...world.pets.filter((pet) => pet !== dead && pet.owner !== self.side && pet.hp > 0 && !pet.spec.untargetable && !pet.spec.hitPoints)];
      const next = candidates.filter((target) => Math.abs(target.x - location) <= bounceRange + 1e-6).sort((a, b) => Math.abs(a.x - location) - Math.abs(b.x - location) || ("side" in a ? 0 : a.id) - ("side" in b ? 0 : b.id))[0];
      if (next) infect(world, self, next, 1);
    };
    const voidlingSpec = (): PetSpec => ({ kind: "voidling", name: voidling.name, hp: petStats.hp, armor: petStats.armor, mr: petStats.mr, radius: petStats.radius, moveSpeed: petStats.moveSpeed, duration: petDuration, attack: { range: petStats.range, interval: petStats.interval, attackLike: true, effects: [{ type: "damage", damageType: "magic", amount: petAttack, label: voidling.name, amountFor: (self, target) => evaluate(petAttack, self, target) * (target.petId !== undefined && target.statuses.some((status) => status.key === INFECTION && status.source === self.side) ? minionMultiplier : 1) }] }, diesToChampionAttack: true,
      target(world, pet) {
        const owner = world.units[pet.owner], enemy = world.units[(1 - pet.owner) as 0 | 1];
        if (enemy.alive && !isUntargetable(enemy, owner) && (Number(owner.memory.malzTetherUntil ?? -1) > world.tick || infected(enemy, owner, world.tick))) return enemy;
        const infectedPets = world.pets.filter((candidate) => candidate.owner !== pet.owner && candidate.hp > 0 && !candidate.spec.untargetable && infected(candidate, owner, world.tick));
        return infectedPets.sort((a, b) => Math.abs(a.x - pet.x) - Math.abs(b.x - pet.x) || a.id - b.id)[0] ?? nearestPetTarget(world, pet);
      },
    });
    const shiftActive = (ctx: HookContext) => !!ctx.memory.malzShift && ctx.tick < Number(ctx.memory.malzShiftLinger ?? Infinity);
    const consumeShift = (ctx: HookContext) => {
      ctx.memory.malzShiftRearm = ctx.tick + ticks(passiveCooldown);
      if (shiftActive(ctx) && ctx.memory.malzShiftLinger === undefined) {
        ctx.memory.malzShiftLinger = ctx.tick + ticks(linger);
        ctx.self.statuses = ctx.self.statuses.map((status) => status.ability === VOID_SHIFT ? { ...status, endTick: Number(ctx.memory.malzShiftLinger) } : status);
      }
    };
    const grantShift = (ctx: HookContext) => {
      ctx.memory.malzShift = true;
      delete ctx.memory.malzShiftLinger;
      addStatus(ctx.self, { kind: "state", key: "ccImmune", hostileOnly: true, ability: VOID_SHIFT, source: ctx.self.side, startTick: ctx.tick, endTick: Infinity, value: 1 });
    };
    const stopTether = (ctx: HookContext) => {
      delete ctx.memory.malzTetherUntil;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.ability === "R" && status.source === ctx.self.side && (status.key === "suppression" || status.key === "revealed")));
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "R") ctx.self.action = undefined;
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return undefined;
      const { self, enemy, world } = view;
      const trade = view.mode === "trade" ? defaultBehavior(view) : undefined;
      const reaction = react(view);
      if (reaction) return reaction;
      if (view.mode === "trade" && self.memory.tradeDone) return trade ?? defaultBehavior(view);
      if (self.action && self.action.kind !== "windup") return trade ?? defaultBehavior(view);
      if (view.mode === "flee") return defaultBehavior(view);
      const castable = (key: string) => { const spell = abilities.find((a) => a.key === key)!; return canCast(world, self, spell) && (key === "W" ? Math.abs(enemy.x - self.x) <= eRange : inReach(spell, self, enemy)); };
      if (!infected(enemy, self, world.tick) && castable("E")) return { kind: "cast", ability: "E" };
      if (Number(self.memory.malzStacks ?? 0) >= stackCap && castable("W")) return { kind: "cast", ability: "W" };
      if ((view.mode === "fight" || view.mode === "kite") && infected(enemy, self, world.tick) && castable("R")) return { kind: "cast", ability: "R" };
      if (castable("Q")) return { kind: "cast", ability: "Q" };
      if (castable("W") && (Number(self.memory.malzStacks ?? 0) > 0 || !castable("E"))) return { kind: "cast", ability: "W" };
      return trade ?? defaultBehavior(view);
    };
    kit.assume("Void Shift starts available. Its 0.25-second linger is fixed by the first qualifying hit/CC; further events restart only the twelve-second rearm timer. Normal shields absorb the mitigated incoming amount before Void Shift reduces remaining nontrue health damage; spell-shield-present full absorption leaves the passive available.");
    kit.assume("The pinned Void Shift bug allows Zoe E trap drowsy through its immunity, but Zoe and her trap classification are not modeled by this batch. Other drowsy effects retain ordinary immunity; no guessed general exception is applied.");
    kit.assume("Call of the Void is a fixed 200-radius intersection with the duel axis, placed at cast completion and detonating 0.4 seconds later. The perpendicular portal shape and ordinary sight of its area are not a complete map-vision simulation.");
    kit.assume(`Null Zone's radius is absent from the pinned wiki. The pinned game-file ${poolRadius}-unit castRadius agrees with its AOE targeter's constraintRange; interpreting those client fields as the damaging pool radius remains an explicit spatial assumption because server logic is absent. Its fixed center is captured at R declaration; ten half-second pulses persist independently of channel cancellation.`);
    kit.assume("Malefic Visions snapshots AP on application. Q/R damage refreshes duration while retaining the original absolute quarter-second phase and damage snapshot; a new E replaces the previous infection. Sixteen original pulses end exactly four seconds after application, without rounding each 0.25 seconds to eight ticks.");
    kit.assume("Malefic Visions chooses the closest eligible champion or enemy pet when an infected target has a counted death, with stable identity as an exact-distance tie breaker. The minion execute threshold uses the pinned game-file level-20 value 48 instead of the wiki's truncated 30 series. Resurrection without counted death grants no refund; Sion's first death does.");
    kit.assume("Voidling AP/bonus AD are read dynamically at attack time. The source has no attack-windup or post-owner-death lifetime, so their attacks have the existing instant pet windup and surviving pets use the engine's owner-death removal rule. Summons have individual ten-second lives and one W cast identity across staggered births.");
    kit.assume("The deterministic policy establishes E, prefers two-stack W, then R in fight/kite and Q. Zero/one-stack W remains usable; hold/trade follow the shared disengagement clock and never force R. The budget assumes three Voidlings per W and values their active time within the first ten seconds, subtracting staggered birth and travel time, with no enemy pet-clearing; it omits passive survival value rather than pricing permanent 90% reduction.");
    return {
      abilities, behavior,
      budget: { damage(self, target) {
        const haste = derive(self).abilityHaste;
        const travel = Math.max(0, Math.abs(target.x - self.x) - spawnRange - target.spec.base.radius - petStats.range) / petStats.moveSpeed;
        const petSeconds = [spawnDelay, spawnDelay + spawnGap, spawnDelay + 2 * spawnGap].reduce((sum, delay) => sum + Math.max(0, petDuration - delay - travel), 0);
        return { magic: evaluate(eTotal, self, target) / (cooldownAfterHaste(eCD, haste) + eCast) + (evaluate(tetherTotal, self, target) + evaluate(poolTotal, self, target)) / (cooldownAfterHaste(rCD, haste) + rCast) + evaluate(petAttack, self, target) * petSeconds / petStats.interval / cooldownAfterHaste(wCD, haste) };
      } },
      hooks: {
        onStart(ctx) { ctx.memory.malzStacks = 0; grantShift(ctx); },
        onCastStart(ctx) {
          if (ctx.ability.slot !== "other" && ctx.ability.key !== "W") ctx.memory.malzStacks = Math.min(stackCap, Number(ctx.memory.malzStacks ?? 0) + 1);
          if (ctx.ability.key === "R") ctx.memory.malzPoolX = ctx.enemy.x;
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            const amount = 1 + Number(ctx.memory.malzStacks ?? 0), id = ctx.world.nextId++;
            const toward = directionTo(ctx.self, ctx.enemy), distance = Math.min(spawnRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            const x = ctx.self.x + toward * (ctx.aim?.direction ?? 1) * distance;
            ctx.memory.malzStacks = 0;
            for (let ordinal = 0; ordinal < amount; ordinal++) {
              ctx.memory[`malzSpawn:${id}:${ordinal}:tick`] = ctx.tick + ticks(spawnDelay + ordinal * spawnGap);
              ctx.memory[`malzSpawn:${id}:${ordinal}:x`] = x;
            }
          } else if (ctx.ability.key === "R") {
            delete ctx.self.forced;
            ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "cc" && (status.key === "airborne" || status.key === "suspension")));
          }
        },
        onAbilityContact(ctx) { if (ctx.ability.key === "Q" && ctx.defense === "spellShield") removeInfection(ctx.world, ctx.self, ctx.enemy); },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") infect(ctx.world, ctx.self, ctx.enemy, ctx.scale);
          else if (ctx.ability.key === "R") {
            ctx.memory.malzTetherUntil = ctx.tick + ticks(channelSeconds);
            addStatus(ctx.self, { kind: "state", key: "revealed", ability: "R", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(channelSeconds), value: 1 });
            if (ctx.enemy.statuses.some((status) => status.key === "suppression" && status.source === ctx.self.side && status.ability === "R")) addStatus(ctx.enemy, { kind: "state", key: "revealed", revealWhileCC: "suppression", ability: "R", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(channelSeconds), value: 1 });
            for (let ordinal = 1; ordinal <= channelSeconds / tetherInterval; ordinal++) ctx.world.scheduled.push({ tick: ctx.tick + ticks(ordinal * tetherInterval), owner: ctx.self.side, target: ctx.enemy.side, ability: "RP", scale: ctx.scale, effects: [{ type: "damage", damageType: "magic", amount: tetherPulse, persistent: true, label: r.name, amountFor: (self, target) => self.alive && Math.abs(self.x - target.x) <= tetherRange + 1e-6 && !isUntargetable(target, self) ? evaluate(tetherPulse, self, target) : 0 }] });
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "field" as const, seenTick: ctx.tick, x: Number(ctx.memory.malzPoolX ?? ctx.enemy.x), radius: poolRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(poolSeconds) + 1, interval: ticks(poolInterval), nextTick: ctx.tick + ticks(poolInterval), ability: "RPOOL", onHit: pool.onHit, connects: true, scale: ctx.scale };
            ctx.world.zones.push(zone);
          }
        },
        beforeDamageTaken(ctx) { ctx.memory.malzHadSpellShield = hasState(ctx.self, "spellShield"); },
        modifyDamageAfterShields(ctx) { return shiftActive(ctx) && ctx.damageType !== "true" ? ctx.amount * (1 - reduction) : ctx.amount; },
        onCCAttempt(ctx) { if (shiftActive(ctx) && ctx.source.side !== ctx.self.side) consumeShift(ctx); },
        onCCApplied(ctx) { if (ctx.source.side !== ctx.self.side) consumeShift(ctx); },
        onDamageTaken(ctx) { if (!ctx.petSource && (ctx.amount > 0 || ctx.absorbed > 0) && !(ctx.memory.malzHadSpellShield && ctx.amount === 0)) consumeShift(ctx); },
        onTargetResurrection(ctx) { removeInfection(ctx.world, ctx.self, ctx.target); },
        onKill(ctx) { if (infected(ctx.victim, ctx.self, ctx.tick)) spread(ctx.world, ctx.self, ctx.victim); },
        onDamageDealt(ctx) {
          const { self, enemy, world } = ctx;
          if (ctx.amount > 0 && (ctx.ability === q.name || ctx.ability === r.name || ctx.ability === "Null Zone") && infected(enemy, self, ctx.tick)) infect(world, self, enemy, 1, true);
          if (ctx.ability === e.name && infected(enemy, self, ctx.tick)) {
            const key = infectionKey(enemy), origin = Number(ctx.memory[`malzE:${key}:start`]);
            let ordinal = Number(ctx.memory[`malzE:${key}:ordinal`] ?? 1);
            while (origin + ticks(ordinal * infectionInterval) <= ctx.tick) ordinal++;
            ctx.memory[`malzE:${key}:ordinal`] = ordinal;
          }
        },
        onTick(ctx) {
          if (ctx.self.fallen) ctx.memory.malzStacks = 0;
          if (ctx.memory.malzShift && ctx.tick >= Number(ctx.memory.malzShiftLinger ?? Infinity)) {
            ctx.memory.malzShift = false;
            ctx.self.statuses = ctx.self.statuses.filter((status) => status.ability !== VOID_SHIFT);
          }
          if (!ctx.memory.malzShift && ctx.tick >= Number(ctx.memory.malzShiftRearm ?? Infinity)) grantShift(ctx);
          for (const key of Object.keys(ctx.memory)) {
            const match = /^malzSpawn:(\d+):(\d+):tick$/.exec(key);
            if (!match || ctx.tick < Number(ctx.memory[key])) continue;
            const xKey = key.replace(/:tick$/, ":x"), pet = spawnPet(ctx.world, ctx.self, voidlingSpec(), Number(ctx.memory[xKey]));
            pet.memory.castInstance = Number(match[1]);
            delete ctx.memory[key]; delete ctx.memory[xKey];
          }
          if (!ctx.enemy.statuses.some((status) => status.key === "suppression" && status.ability === "R" && status.source === ctx.self.side)) ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.key === "revealed" && status.ability === "R" && status.source === ctx.self.side));
          if (ctx.memory.malzTetherUntil !== undefined) {
            const action = ctx.self.action;
            if (ctx.tick >= Number(ctx.memory.malzTetherUntil) || Math.abs(ctx.self.x - ctx.enemy.x) > tetherRange + 1e-6 || !action || action.kind !== "channel" || action.ability !== "R") stopTether(ctx);
          }
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") stopTether(ctx); },
      },
    };
  },
};

export default malzahar;
