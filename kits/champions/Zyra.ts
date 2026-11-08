/** Zyra's sourced seeds and independently attackable, spawn-snapshotted plants. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, canTarget, directionTo } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { canTargetPet, destroyPet, nearestPetTarget, petsOf, spawnPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { areaAt, flat, ticks } from "./util";

const SEED = "zyra-seed", SPITTER = "zyra-spitter", LASHER = "zyra-lasher";
const isPlant = (pet: Pet) => pet.spec.kind === SPITTER || pet.spec.kind === LASHER;
const isPet = (target: Unit | Pet): target is Pet => "owner" in target;
const targetId = (target: Unit | Pet) => isPet(target) ? `pet:${target.id}` : `champion:${target.side}`;

const zyra: KitModule = {
  champion: "Zyra",
  options: {
    passiveSeeds: { label: "Assumed seeds per passive trigger (1 or 2)", default: 1 },
    initialSeeds: { label: "Pre-existing passive seeds (0 to 8)", default: 0 },
    qHalfExtent: { label: "Q axis half-extent (interpreted client damage targeter)", default: 125 },
    qSeedHalfExtent: { label: "Q seed half-extent (interpreted client sprout targeter)", default: 325 },
  },
  build(kit, options) {
    const passive = kit.ability("Garden of Thorns"), q = kit.ability("Deadly Spines"), w = kit.ability("Rampant Growth"), e = kit.ability("Grasping Roots"), r = kit.ability("Stranglethorns");
    const spitter = kit.pet("Thorn Spitter"), lasher = kit.pet("Vine Lasher");
    const perTrigger = options.passiveSeeds ?? 1, initial = options.initialSeeds ?? 0;
    const qHalfExtent = options.qHalfExtent ?? 125, qSeedHalfExtent = options.qSeedHalfExtent ?? 325;
    if (![1, 2].includes(perTrigger) || !Number.isInteger(initial) || initial < 0 || initial > 8) throw new Error("Zyra: passiveSeeds must be 1 or 2 and initialSeeds an integer from 0 to 8");
    if (![qHalfExtent, qSeedHalfExtent].every((v) => Number.isFinite(v) && v > 0)) throw new Error("Zyra: Q extents must be finite positive");
    const missileSpeed = q.gameQuoted("mSpell.missileSpeed: 1200");
    q.gameQuote('"thickness":{"mPerLevelValues":[250,250,250,250,250,250]');
    q.gameQuote('"thickness":{"mPerLevelValues":[650,650,650,650,650,650]');
    const cadence = passive.field("staticCooldown"), passiveRange = passive.field("effectRadius");
    const passiveLife = passive.quoted("last for 30 seconds"), passiveStep = passive.quoted("After 1 second"), cap = passive.quoted("total of 8 Seeds");
    passive.quote("preserving Seeds spawned by Rampant Growth over Seeds spawned by Garden of Thorns");
    passive.quote("The pattern/probability of Garden of Thorns spawning one seed or two");
    const wLife = w.quoted("remains for 60 seconds"), wStep = w.quoted("After 1.5 seconds"), reveal = w.quoted("reveals them for 2 seconds"), charges = w.quoted("maximum of 2"), recharge = w.field("recharge"), wRange = w.field("targetRange");
    const killCharge = w.quoted("generates 35% charge") / 100, championCharge = w.quoted("increased to 100%") / 100;
    w.quote("Seeds are untargetable"); w.quote("Upon first rank up, Rampant Growth gains 2 charges");
    const plantLife = q.quoted("lasts for 8 seconds"), qDelay = q.quoted("after a 0.625-seconds delay"), qRange = q.field("targetRange");
    const eRange = e.field("targetRange", "Damaging missile"), seedRange = e.field("targetRange", "Seed sprout"), eWidth = e.field("width", "Damaging missile"), seedWidth = e.field("width", "Seed Sprout"), eSpeed = e.field("speed"), postLock = e.quoted("locked out of actions for 0.15 seconds");
    e.quote("wherever the caster is at the end of the cast time");
    const rRange = r.field("targetRange"), rRadius = r.field("effectRadius"), rDelay = r.quoted("After 2 seconds"), airborne = r.quoted("within for 1 second");
    const restore = r.quoted("restoring 50% of their current health") / 100, healthBonus = r.quoted("increasing their maximum health by 50%") / 100, sizeBonus = r.quoted("gaining 25% increased size") / 100, flurry = r.quoted("dealing 150% damage per flurry") / 100, enrageLife = r.quoted("buff on Plants lasts 10 seconds");
    r.quote("Plants grown during the 2 seconds prior to the displacement will also be enraged");
    const baseDamage = spitter.stat("damage"), apRatio = spitter.quoted("(+ 20% AP)") / 100, plantHP = spitter.quoted("8 / 12", 0), enlargedHP = spitter.quoted("8 / 12", 1), radius = spitter.stat("radius"), attackSpeed = spitter.stat("attackspeed"), spitterRange = spitter.stat("range"), lasherRange = lasher.stat("range");
    const spitterWindup = (0.3 + q.gameQuoted('"mAttackDelayCastOffsetPercent":-0.08070175349712372')) / attackSpeed;
    const lasherWindup = (0.3 + e.gameQuoted('"mAttackDelayCastOffsetPercent":-0.12455999851226807')) / attackSpeed;
    const secondary = spitter.quoted("A Thorn Spitter deals 50% damage if it is not the first plant to attack its target") / 100;
    const markDuration = spitter.quoted("high-priority mark for 3 seconds"), slow = lasher.quoted("slow their target by 30%") / 100, slowDuration = lasher.quoted("for 2 seconds");
    spitter.quote("Plants do not update their damage if Zyra levels up or changes her AP, but will trigger newly available spell effects.");
    spitter.quote("However the damage of in-air attacks update once a plant is hit by Stranglethorns or once the plant buffed by it dies.");
    spitter.quote("stopped by Blind and Disarm"); spitter.quote("basic attacks apply spell effects as area damage"); lasher.quote("stacking additively up to 60%");
    const fixed = (pet: typeof spitter) => ({ proc: pet.quoted("0 from champion proc damage abilities"), persistent: pet.quoted("1 from champion damage-over-time abilities"), area: pet.quoted("3 from champion area-of-effect abilities"), rangedBasic: pet.quoted(pet.name === spitter.name ? "4 from ranged champion basic attacks" : "5 from ranged champion basic attacks"), meleeBasic: pet.quoted("8 from melee champion basic attacks"), singleTarget: pet.quoted("8 from champion single target abilities"), pet: pet.quoted("1 from minions and monsters") });
    const spitterFixed = fixed(spitter), lasherFixed = fixed(lasher);

    kit.assume("Garden of Thorns starts with the configurable initialSeeds (default zero), then triggers after one full sourced cadence. passiveSeeds deterministically supplies one seed by default; the pinned source marks the one/two probability pending. Seeds project to equally spaced points between Zyra and the visible opponent within 900; brush, fountains, jungle entrances and lateral angles are absent from this duel.");
    kit.assume("Deadly Spines uses the pinned game client wall targeters (250×850 and 650×1250) as damage and seed rectangles respectively, with their thickness on the caster-target axis and length perpendicular. The server mapping is not explicit: qHalfExtent/qSeedHalfExtent expose this interpretation (125/325). Its 0.625-second delay starts at cast completion and both stages use the fixed chosen center.");
    kit.assume("Seeds are untargetable point locations: stepping tests the enemy champion's gameplay radius against the seed point after its source-specific immunity. At the eight-seed cap, a new W replaces the oldest passive seed first; if all are W, it replaces the oldest W. Passive insertion never displaces W seeds.");
    kit.assume("Plant windups use the pinned plant-character cast offsets plus the existing compiler's default 0.3 attack-cycle fraction, divided by the wiki 0.8 attack speed (Spitter about 0.2741s, Lasher 0.2193s). This interprets game fields with the same convention as champion attacks; the game base ranges conflict with the wiki so sourced wiki 575/400 ranges take priority. Spitter uses pinned QPlantMissile speed 1200; Lasher resolves at launch. Enraged flurries use two same-tick 75% damage packets with one basic-attack notification because shot spacing and notification count are not sourced.");
    kit.assume("The first living plant to connect to each target is its primary plant, across both families; later plants deal 50% until the primary dies or expires, when the next successful contact becomes primary. Target switching maintains separate primary identities. No unsupported timed damage-falloff window is invented.");
    kit.assume("Plants prefer taunt sources, the owner's latest three-second champion mark, the nearest target with any plant's nonrefreshing three-second lesser-priority mark, then the owner's most recently attacked pet, then the nearest target in range. Lesser-priority marks are shared across plants and last independently of the marking plant's death. Target priority never grants attacks beyond range. Independent pet blind/disarm and incoming basic/single-target/area/persistent/proc damage are resolved separately from Zyra.");
    kit.assume("Stranglethorns applies its expansion damage immediately over the full sourced radius; the expansion travel curve is absent. Knock-up is a separate fixed-location stage after two seconds, with its own spell-shield check. Each plant gains HP/size only on its first enrage, refreshes life from actual enrage time, and restores 50% current HP capped at its new maximum.");
    kit.assume("Plant level/AP damage snapshots at growth. In-flight Spitter packets change damage when their actual plant is enraged or an enraged plant dies; other later AP changes do not alter packets. Natural plant expiry is treated as death for removing that enrage update.");
    kit.assume("Plants stop creating attacks when Zyra dies; already launched missiles continue. The pinned record does not specify owner-death continuation. Leona Sunlight's hidden 10% visual-size interaction and estimated 33-second duration are retained as an unsupported gameplay-radius interaction; no radius change is inferred.");
    kit.assume("The behavior plants W before a usable Q/E, at a fixed point ahead within both seed placement and next spell range, then favors E/Q using ordinary mode gates. W does not overlay an existing cast. The stat budget values one W-enabled plant plus sourced passive cadence, a half-life exposure allowance for enemy destruction, secondary-plant reduction and a limited R enrage uptime; it does not assume invulnerable plants.");

    const seeds = (ctx: HookContext) => petsOf(ctx.world, ctx.self.side, SEED);
    const plantX = (ctx: HookContext, range: number, aim?: Aim) => ctx.self.x + directionTo(ctx.self, ctx.enemy) * (aim?.direction ?? 1) * Math.min(range, aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x));
    const addSeed = (ctx: HookContext, source: "P" | "W", x: number) => {
      const live = seeds(ctx).sort((a, b) => a.id - b.id);
      if (live.length >= cap) {
        const replace = live.find((seed) => seed.memory.source === "P") ?? (source === "W" ? live[0] : undefined);
        if (!replace) return;
        destroyPet(ctx.world, replace);
      }
      const seed = spawnPet(ctx.world, ctx.self, { kind: SEED, name: `${source === "W" ? w.name : passive.name} Seed`, hp: 1, armor: 0, mr: 0, radius: 0, moveSpeed: 0, duration: source === "W" ? wLife : passiveLife, untargetable: true }, x);
      seed.memory.source = source; seed.memory.created = ctx.tick; seed.memory.stepAt = ctx.tick + ticks(source === "W" ? wStep : passiveStep);
    };
    const restock = (ctx: HookContext, progress: number) => {
      const stock = ctx.self.charges.W;
      if (!stock || stock.count >= charges) return;
      const interval = ticks(cooldownAfterHaste(recharge, abilityHasteFor(ctx.self, { slot: "W" })));
      const remaining = Math.max(0, stock.nextTick - ctx.tick) - interval * progress;
      if (remaining <= 0) {
        stock.count += 1;
        stock.nextTick = stock.count >= charges ? Infinity : ctx.tick + Math.max(1, interval + remaining);
      } else stock.nextTick = ctx.tick + remaining;
    };
    const aggregateSlow = (world: World, owner: Unit, target: Unit) => {
      const contributors = target.statuses.filter((status) => status.kind === "mark" && status.key.startsWith("zyra-lasher:") && status.source === owner.side && status.endTick > world.tick && world.pets.some((plant) => plant.id === Number(status.key.split(":")[1]) && plant.hp > 0 && plant.endTick > world.tick));
      target.statuses = target.statuses.filter((status) => !(status.kind === "cc" && status.key === "slow" && status.memoKey === "zyra-vine-slow" && status.source === owner.side));
      if (contributors.length) target.statuses.push({ kind: "cc", key: "slow", memoKey: "zyra-vine-slow", source: owner.side, startTick: world.tick, endTick: Math.max(...contributors.map((status) => status.endTick)), value: Math.min(2, contributors.length) * slow });
    };
    const applyPlantSlow = (world: World, owner: Unit, target: Unit, pet: Pet) => {
      const key = `zyra-lasher:${pet.id}`;
      target.statuses = target.statuses.filter((status) => !(status.kind === "mark" && status.key === key && status.source === owner.side));
      const before = target.statuses.length;
      applyEffect(world, petFormulaTarget(pet, owner, world.tick), target, { type: "cc", cc: "slow", strength: slow, duration: slowDuration }, { scale: 1 });
      if (target.statuses.length > before) {
        const actual = target.statuses.pop()!;
        target.statuses.push({ kind: "mark", key, source: owner.side, startTick: world.tick, endTick: actual.endTick, value: slow });
      }
      aggregateSlow(world, owner, target);
    };
    const refreshSlow = (ctx: HookContext) => {
      const target = ctx.enemy;
      const records = target.statuses.filter((status) => status.kind === "mark" && status.key.startsWith("zyra-lasher:") && status.source === ctx.self.side);
      if (!records.length) return;
      const remaining = records.filter((status) => status.endTick > ctx.tick && ctx.world.pets.some((plant) => plant.id === Number(status.key.split(":")[1]) && plant.hp > 0 && plant.endTick > ctx.tick));
      if (remaining.length !== records.length) {
        target.statuses = target.statuses.filter((status) => !records.includes(status) || remaining.includes(status));
        aggregateSlow(ctx.world, ctx.self, target);
      }
    };
    const chooseTarget = (world: World, pet: Pet): Unit | Pet | undefined => {
      const owner = world.units[pet.owner], enemy = world.units[pet.owner === 0 ? 1 : 0];
      const actor = petFormulaTarget(pet, owner, world.tick);
      const inRange = (target: Unit | Pet) => Math.abs(target.x - pet.x) - (isPet(target) ? target.spec.radius : target.spec.base.radius) <= (pet.spec.attack?.range ?? 0) + 1e-6;
      const taunt = pet.statuses?.find((status) => status.kind === "cc" && status.key === "taunt" && status.endTick > world.tick);
      if (taunt) return world.units[taunt.source];
      if (Number(owner.memory.zyraMarkUntil ?? -1) > world.tick && canTarget(enemy, actor) && inRange(enemy)) return enemy;
      const candidates: Array<Unit | Pet> = [...(enemy.alive && canTarget(enemy, actor) ? [enemy] : []), ...world.pets.filter((target) => target.owner !== owner.side && canTargetPet(target, actor, world.tick))];
      const marked = candidates.filter((target) => inRange(target) && target.statuses?.some((status) => status.kind === "mark" && status.key === "zyra-plant-mark" && status.source === owner.side && status.endTick > world.tick));
      marked.sort((a, b) => Math.abs(a.x - pet.x) - (isPet(a) ? a.spec.radius : a.spec.base.radius) - Math.abs(b.x - pet.x) + (isPet(b) ? b.spec.radius : b.spec.base.radius));
      if (marked.length) return marked[0];
      const attacked = world.pets.find((target) => target.id === Number(owner.memory.zyraLastPet ?? -1) && target.owner !== owner.side && canTargetPet(target, actor, world.tick) && inRange(target));
      return attacked ?? nearestPetTarget(world, pet);
    };
    const enrage = (ctx: HookContext, plant: Pet) => {
      if (!plant.memory.enraged) {
        plant.spec = { ...plant.spec, hp: enlargedHP, radius: radius * (1 + sizeBonus) };
        plant.hp = Math.min(plant.spec.hp, plant.hp * (1 + restore));
        plant.memory.enraged = true;
      }
      plant.memory.enrageUntil = ctx.tick + ticks(enrageLife);
      plant.endTick = ctx.tick + ticks(plantLife);
    };
    const grow = (ctx: HookContext, seed: Pet, kind: typeof SPITTER | typeof LASHER) => {
      const x = seed.x;
      destroyPet(ctx.world, seed);
      const damage = baseDamage + apRatio * derive(ctx.self).ap;
      const plantSpec: PetSpec = {
        kind, name: kind === SPITTER ? spitter.name : lasher.name, hp: plantHP, armor: 0, mr: 0, radius, moveSpeed: 0, duration: plantLife,
        fixedDamage: kind === SPITTER ? spitterFixed : lasherFixed, ccImmune: ["airborne", "cripple", "silence"], target: chooseTarget,
        attack: { range: kind === SPITTER ? spitterRange : lasherRange, interval: 1 / attackSpeed, attackLike: true, windup: kind === SPITTER ? spitterWindup : lasherWindup, ...(kind === SPITTER ? { missileSpeed, projectile: true } : {}), effects: [{ type: "damage", damageType: "magic", amount: flat(damage), petDamageCategory: "area", label: kind === SPITTER ? spitter.name : lasher.name }] },
        effectsForHit({ world, pet, target }) { return plantEffects(world, world.pets.find((candidate) => candidate.id === pet.id) ?? pet, target); },
        onAttackHit({ world, pet, target }) {
          const statuses = target.statuses ??= [];
          if (!statuses.some((status) => status.kind === "mark" && status.key === "zyra-plant-mark" && status.source === pet.owner && status.endTick > world.tick)) statuses.push({ kind: "mark", key: "zyra-plant-mark", source: pet.owner, startTick: world.tick, endTick: world.tick + ticks(markDuration), value: 1 });
          if (kind === LASHER && !isPet(target)) applyPlantSlow(world, world.units[pet.owner], target, pet);
        },
      };
      const plant = spawnPet(ctx.world, ctx.self, plantSpec, x);
      plant.memory.damage = damage;
      if (ctx.tick <= Number(ctx.memory.thicketUntil ?? -1) && Math.abs(x - Number(ctx.memory.thicketX)) <= rRadius + radius) enrage(ctx, plant);
      return plant;
    };
    const sprout = (ctx: HookContext, from: number, to: number, kind: typeof SPITTER | typeof LASHER) => {
      const lo = Math.min(from, to), hi = Math.max(from, to);
      for (const seed of seeds(ctx)) if (seed.x >= lo - 1e-6 && seed.x <= hi + 1e-6) grow(ctx, seed, kind);
    };
    const plantEffects = (world: World, plant: Pet, target: Unit | Pet): Effect[] => {
      const owner = world.units[plant.owner], key = `zyra-primary:${targetId(target)}`;
      const primary = world.pets.find((candidate) => candidate.id === Number(owner.memory[key]) && isPlant(candidate) && candidate.hp > 0 && candidate.endTick > world.tick);
      if (!primary) owner.memory[key] = plant.id;
      const share = !primary || primary.id === plant.id ? 1 : secondary;
      plant.memory.primaryShare = share;
      const damage = Number(plant.memory.damage) * share;
      const packet = (multiplier: number): Effect => ({ type: "damage", damageType: "magic", amount: flat(damage * multiplier), petDamageCategory: "area", label: plant.spec.name });
      return world.pets.includes(plant) && plant.hp > 0 && plant.endTick > world.tick && owner.alive && plant.memory.enraged && world.tick < Number(plant.memory.enrageUntil) ? [packet(flurry / 2), packet(flurry / 2)] : [packet(1)];
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), delivery: { kind: "circle", range: qRange, radius: qHalfExtent, delay: qDelay }, onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }], flags: { spellShield: q.flag("spellShield"), projectile: q.flag("projectile") }, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: 0, cost: 0, castTime: w.castTime(), delivery: { kind: "self" }, charges: { max: charges, recharge }, roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castDirection: "start", delivery: { kind: "line", range: eRange, travelRange: seedRange, collisionRange: eRange, width: eWidth, speed: eSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "cc", cc: "root", duration: e.baseOf("Root Duration") }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") }, decisive: true, roles: ["damage", "cc"] },
      { key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "circle", range: rRange, radius: rRadius, delay: 0 }, onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }], flags: { projectile: r.flag("projectile"), spellShield: r.flag("spellShield") }, decisive: true, roles: ["damage", "cc"] },
    ];
    for (const ability of abilities) ability.usable = (self, world) => world.tick >= Number(self.memory.zyraLockUntil ?? -1);
    const behavior: Behavior = (view) => {
      if (view.mode === "idle" || view.self.memory.tradeDone || view.world.tick < Number(view.self.memory.zyraLockUntil ?? -1)) return view.self.memory.tradeDone ? defaultBehavior(view) : undefined;
      if (view.mode !== "flee" && canCast(view.world, view.self, abilities[1]!)) {
        const gap = Math.abs(view.enemy.x - view.self.x) - view.enemy.spec.base.radius;
        const pending = view.world.zones.some((zone) => zone.owner === view.self.side && zone.ability === "Q" && zone.endTick > view.world.tick);
        const spell = [abilities[2]!, abilities[0]!].find((ability) => canCast(view.world, view.self, ability));
        if (gap <= Math.min(wRange, qRange) && (pending || spell) && !petsOf(view.world, view.self.side, SEED).some((seed) => Math.abs(seed.x - view.enemy.x) <= qHalfExtent + view.enemy.spec.base.radius)) return { kind: "cast", ability: "W", aim: { direction: 1, distance: Math.max(0, gap) } };
      }
      return defaultBehavior(view);
    };
    return {
      abilities, behavior,
      budget: { damage(self) {
        const haste = derive(self).abilityHaste, damage = baseDamage + apRatio * derive(self).ap;
        const births = 1 / cooldownAfterHaste(recharge, haste) + perTrigger / cadence;
        const plants = births * plantLife * 0.5;
        const weighted = plants <= 1 ? plants : 1 + (plants - 1) * secondary;
        const enrageUptime = Math.min(1, plantLife / (cooldownAfterHaste(abilities[3]!.cooldown, haste) + abilities[3]!.castTime));
        return { magic: damage * attackSpeed * weighted * (1 + (flurry - 1) * enrageUptime) };
      } },
      hooks: {
        onStart(ctx) {
          ctx.memory.nextSeed = ctx.tick + ticks(cadence);
          for (let index = 0; index < initial; index++) addSeed(ctx, "P", ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(passiveRange, Math.abs(ctx.enemy.x - ctx.self.x)) * (index + 1) / (initial + 1));
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") addSeed(ctx, "W", plantX(ctx, wRange, ctx.aim));
          if (ctx.ability.key === "E") {
            ctx.memory.zyraLockUntil = ctx.tick + ticks(postLock);
            ctx.apply({ type: "state", state: "noMovement", duration: postLock }, true);
            ctx.apply({ type: "state", state: "noAttacks", duration: postLock }, true);
          }
          if (ctx.ability.key === "R") {
            const x = plantX(ctx, rRange, ctx.aim);
            ctx.memory.thicketX = x; ctx.memory.thicketUntil = ctx.tick + ticks(rDelay);
            for (const plant of petsOf(ctx.world, ctx.self.side).filter(isPlant)) if (Math.abs(plant.x - x) <= rRadius + plant.spec.radius) enrage(ctx, plant);
            areaAt(ctx, "R", x, rRadius, rDelay, [{ type: "cc", cc: "airborne", duration: airborne }]);
          }
        },
        onZoneLand(ctx) { if (ctx.zone.ability === "Q") sprout(ctx, ctx.zone.x - qSeedHalfExtent, ctx.zone.x + qSeedHalfExtent, SPITTER); },
        onMissileMove(ctx) {
          if (ctx.missile.source !== "E") return;
          // In one dimension, the independent estimated seed width extends perpendicular
          // to this axis; its longitudinal reach is the separately sourced 1200.
          void seedWidth;
          sprout(ctx, ctx.from, ctx.to, LASHER);
        },
        onAttackHit(ctx) { ctx.memory.zyraMarkUntil = ctx.tick + ticks(markDuration); },
        onAttackPetHit(ctx) { ctx.memory.zyraLastPet = ctx.pet.id; },
        onKill(ctx) { restock(ctx, ctx.pet ? killCharge : championCharge); },
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory.nextSeed ?? Infinity)) {
            const ordinal = Number(ctx.memory.passiveOrdinal ?? 0) + 1;
            ctx.memory.passiveOrdinal = ordinal; ctx.memory.nextSeed = ticks((ordinal + 1) * cadence);
            const distance = Math.min(passiveRange, Math.abs(ctx.enemy.x - ctx.self.x));
            for (let index = 0; index < perTrigger; index++) addSeed(ctx, "P", ctx.self.x + directionTo(ctx.self, ctx.enemy) * distance * (index + 1) / (perTrigger + 1));
          }
          for (const seed of seeds(ctx)) if (ctx.tick >= Number(seed.memory.stepAt) && Math.abs(ctx.enemy.x - seed.x) <= ctx.enemy.spec.base.radius) {
            if (seed.memory.source === "W") ctx.apply({ type: "state", state: "revealed", duration: reveal });
            destroyPet(ctx.world, seed);
          }
          refreshSlow(ctx);
        },
      },
    };
  },
};

export default zyra;
