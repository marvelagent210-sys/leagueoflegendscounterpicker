/**
 * Illaoi: every number is read from the wiki's ability data at level 20 (see
 * engine/kits/context.ts). Her Tentacles are pets (engine/sim/pets.ts) that slam only when
 * told to: by Harsh Lesson's hit, or on their own at a Spirit or a Vessel. A slam is a ground
 * area the enemy can step out of; Tentacle Smash slams one of its own.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canTarget, directionTo, edgeDistance } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { flat, maxHp, ticks } from "./util";

const TENTACLE = "tentacle";
const SPIRIT = "spirit";

const illaoi: KitModule = {
  champion: "Illaoi",
  build(kit) {
    const innate = kit.ability("Prophet of an Elder God");
    const q = kit.ability("Tentacle Smash");
    const w = kit.ability("Harsh Lesson");
    const e = kit.ability("Test of Spirit");
    const r = kit.ability("Leap of Faith");
    const tentacle = kit.pet("Tentacle");

    // Tentacles: champion basic attacks take 1 of their 2 hit points; slams 927.75 long and 200 wide.
    const tentacleHp = tentacle.stat("hp");
    tentacle.quote("1 from champion basic attacks");
    const slamLength = tentacle.stat("range");
    const slamWidth = tentacle.quoted("927.75 x 200", 1);
    const tentacleRadius = 65;
    kit.assume(
      `A Tentacle is ${tentacleRadius} units in radius: the wiki gives none, and the game files give it no gameplay radius, which leaves the game's default (the wiki's 65 for Gangplank's Powder Keg, which has none in the game files either).`,
    );

    // Prophet of an Elder God: a Tentacle every 5.7 s where none stands within 1000, awake 2 s later.
    const spawnEvery = innate.field("staticCooldown");
    const spawnClear = innate.field("effectRadius", "cannot spawn");
    const spawnDelay = innate.quoted("Tentacles fully spawn after a 2 second delay and are untargetable in the meantime", 0);
    innate.quote("Periodically, Illaoi spawns a Tentacle on the nearest terrain, if no other Tentacle is around it");
    kit.assume("Tentacles rise where Illaoi stands: the terrain at the lane's side is next to her.");
    kit.assume("With the lane set up, one awake Tentacle stands beside Illaoi when the fight starts, and the innate's timer is ready.");

    // The slam: 200.1 (+ 110% AD) (+ 40% AP), 30% more from Tentacle Smash's rank.
    const slamBase = innate.levelValue("Tentacles are commanded to attack by Illaoi's abilities, dealing");
    const slamRatios = "(+ 110% AD) (+ 40% AP) physical damage to all enemies struck";
    const slamAd = innate.quoted(slamRatios, 0) / 100;
    const slamAp = innate.quoted(slamRatios, 1) / 100;
    innate.quote("increased by 0 / 10 / 15 / 20 / 25 / 30 (based on Tentacle Smash's rank)%");
    const amp = 1 + q.fraction("Damage Increase");
    const slam: Formula = { base: slamBase * amp, ratios: { AD: slamAd * amp, AP: slamAp * amp } };
    // Each slam a target took in the last 0.66 s takes 50% off the next, at most 75%.
    const falloffText = "Each enemy individually reduces the slam damage by 50% for every slam they were hit by in the last 0.66 seconds, capped at 75% less damage";
    const falloff = { group: "slam", per: innate.quoted(falloffText, 0) / 100, window: innate.quoted(falloffText, 1), floor: 1 - innate.quoted(falloffText, 2) / 100 };
    const healShare = innate.quoted("heals Illaoi for 5% of her missing health if it hits at least one enemy champion", 0) / 100;
    const slamHit: Effect = { type: "damage", damageType: "physical", amount: slam, label: "Tentacle" };
    const slamHeal: Effect = { type: "heal", amount: { base: 0, ratios: { missingHP: healShare } } };
    const slamEffects: Effect[] = [slamHit, { type: "caster", effects: [slamHeal] }];
    const slamWindup = q.castTime();
    kit.assume(
      `A commanded slam lands ${slamWindup} s after it starts, as Tentacle Smash's does (the wiki gives no time for the others), and a Tentacle's queued slams follow one another without a pause outside Leap of Faith.`,
    );
    kit.assume(
      "The enemy can step out of a slam sideways, as from any skillshot. On the line, a slam always hits a Spirit standing in its stretch, and one aimed at the Spirit can catch the champion beyond it; a slam that hits a Spirit heals Illaoi as if it hit a champion (the wiki counts Spirits as clones).",
    );

    // Commands: Harsh Lesson's hit tells every Tentacle within 950 of the target; one waking within 0.5 s queues it.
    const commandRange = tentacle.quoted("The Tentacle is commanded to attack each time a target in 950 range gets hit by Harsh Lesson", 0);
    const wakeQueue = tentacle.quoted("it will instead queue the attack if it becomes active in the next 0.5 seconds", 0);
    tentacle.quote("Its attacks get queued up if it receives more than one attack command");

    // Tentacle Smash: a 0.75 s cast, then a slam 802.75 forward, 200 wide.
    const smashReach = q.fieldValues("range")[1] ?? 802.75;
    const smashWidth = q.field("width");
    q.quote("Illaoi slams down a Tentacle in the target direction");

    // Harsh Lesson: the next attack within 6 s reaches 225 farther (Illaoi leaps), and deals 5% (+ 3.5% per 100 AD) of the target's maximum health.
    const lessonWindow = w.quoted("empowers her next basic attack within 6 seconds", 0);
    const lessonRange = w.quoted("gain 225 bonus range", 0);
    w.quote("cause her to leap to the target's location if they are beyond her normal basic attack range");
    w.quote("Harsh Lesson can be activated during Illaoi's other abilities");
    const lessonHit: Effect = { type: "damage", damageType: "physical", amount: w.formula("Additional Physical Damage"), minimum: flat(w.number("Minimum Physical Damage")), label: w.name };
    kit.assume("Harsh Lesson's leap takes Illaoi to the target as the attack starts (the game files' leap, at her movement speed plus 600, covers its 225 units in under 0.25 s).");

    // Test of Spirit: the tendril pulls the Spirit out over 0.75 s, 100 units in front of Illaoi; the tether lasts 7 s from the hit.
    const [tendrilRange = 950] = e.fieldValues("range");
    const tendrilSpeed = e.field("speed");
    const pullTo = e.field("range", "Spirit is pulled to");
    const pullSeconds = e.quoted("pulling their Spirit out in front of Illaoi over 0.75 seconds", 0);
    const tetherSeconds = e.quoted("The target is tethered to the Spirit for 7 seconds", 0);
    e.tip("7 seconds");
    const tether = e.field("tetherRadius", "Actual tether");
    e.quote("The Spirit spawns with the target's current health, armor and magic resist, and echoes a portion of the pre-mitigation damage received to the tethered champion");
    const echoBase = e.baseOf("Damage Transmission") / 100;
    const echoPerAd = e.quoted("(+ 8% per 100 AD)", 0) / 100 / 100;
    const vesselText = "marking the target as a Vessel for 4 seconds and slowing them by 80% for 1.5 seconds once the tether returns back to them";
    const vesselSeconds = e.quoted(vesselText, 0);
    const vesselSlow = e.quoted(vesselText, 1) / 100;
    const vesselSlowFor = e.quoted(vesselText, 2);
    const autoEvery = e.levelValue("Each Tentacle autonomously attacks the closest Vessel or Spirit, prioritizing the latter, once every");
    const vesselCloser = e.quoted("Tentacles can spawn 300 units closer to each other than when spawned by Illaoi", 0);
    e.quote("Illaoi is unable to act while firing the projectile and while the target's Spirit is being pulled");
    e.quote("Test of Spirit cannot be cast again until the Spirit dies");
    kit.assume(
      `Tentacles slam a Spirit or a Vessel within ${commandRange} units on their own every ${autoEvery} s (the wiki at level 13 and up; the game files say 3 s, plus a delay of up to 0.5 s), the first as soon as they can.`,
    );
    kit.assume(
      `The Spirit stands ${pullTo} units in front of Illaoi with its champion's size; Illaoi attacks it only when she can't attack the champion. The tether breaks when the champion gets ${tether} units from it (edge to edge); a Vessel is slowed as the Spirit dies or the tether breaks.`,
    );
    kit.assume("Test of Spirit splits the fight on whether it lands; when the fight can't split further, a hit more likely than not pulls the Spirit.");

    // Leap of Faith: displacement immune for the cast; 350 (+ 50% bonus AD) around her; a Tentacle 700 away for 8 s.
    const leapRadius = r.field("effectRadius");
    const leapCast = r.castTime();
    const leapSeconds = r.quoted("For each enemy champion hit, a Tentacle is summoned for 8 seconds", 0);
    const leapTentacleAt = r.quoted("Illaoi spawns the Tentacle 700 range away from her", 0);
    const fastText = "will take 0.5 seconds to make an attack; however they will then incur a lockout of 0.5 seconds before being able to start a new attack";
    const fastWindup = r.quoted(fastText, 0);
    const fastLock = r.quoted(fastText, 1);
    r.quote("For the duration, Harsh Lesson cooldown is halved, all Tentacles awakened by Illaoi are untargetable");
    r.quote("This does not affect the Tentacle attack from Tentacle Smash");
    kit.assume("Leap of Faith's Tentacle rises awake at once, 700 units from Illaoi toward the enemy.");
    kit.assume("The enemy attacks a Tentacle before Illaoi when it can reach one awake and the Tentacle could slam it.");

    // Tentacles: asleep while they rise or while Leap of Faith lasts, open to attacks otherwise.
    const tentacleSpec: PetSpec = {
      kind: TENTACLE,
      name: tentacle.name,
      hp: tentacleHp,
      armor: 0,
      mr: 0,
      hitPoints: true,
      radius: tentacleRadius,
      moveSpeed: 0,
      duration: Number.POSITIVE_INFINITY,
      // Worth killing before Illaoi when it could slam its attacker.
      urgent: (pet, enemy) => Math.abs(enemy.x - pet.x) - enemy.spec.base.radius <= slamLength,
    };
    const hiddenTentacle: PetSpec = { ...tentacleSpec, untargetable: true };
    const leapTentacle: PetSpec = { ...hiddenTentacle, duration: leapSeconds };

    // Hidden abilities the hooks use: a Tentacle's slam, and a Vessel's slow.
    const slamSpec: AbilitySpec = {
      key: "SLAM",
      name: "Tentacle slam",
      slot: "I",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "area", near: 0, far: slamLength, delay: slamWindup, anchor: "ground" },
      onHit: slamEffects,
      flags: { spellShield: innate.flag("spellShield") ?? true, projectile: false },
      falloff,
      usable: () => false,
    };
    const vesselSpec: AbilitySpec = {
      key: "VESSEL",
      name: "Vessel",
      slot: "E",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "self" },
      onHit: [{ type: "cc", cc: "slow", duration: vesselSlowFor, strength: vesselSlow }],
      flags: { spellShield: true, projectile: false },
      usable: () => false,
    };

    const locked = (unit: Unit, world: World) => world.tick < Number(unit.memory.lockUntil ?? -1);
    /** Unable to act: no attacks, no casts, no steps. */
    const lock = (ctx: HookContext, seconds: number) => {
      const until = ctx.tick + ticks(seconds);
      ctx.memory.lockUntil = until;
      ctx.apply({ type: "state", state: "noAttacks", duration: seconds }, true);
      ctx.self.statuses = [...ctx.self.statuses, { kind: "cc", key: "root", source: ctx.self.side, startTick: ctx.tick, endTick: until, value: 0 }];
    };
    const spiritOf = (world: World, champion: Unit): Pet | undefined => world.pets.find((p) => p.spec.kind === SPIRIT && p.owner === champion.side);
    const tentaclesOf = (world: World, self: Unit): Pet[] => world.pets.filter((p) => p.spec.kind === TENTACLE && p.owner === self.side);
    const inLeap = (ctx: HookContext) => ctx.tick < Number(ctx.memory.leapUntil ?? -1);
    const awake = (pet: Pet, tick: number) => tick >= Number(pet.memory.activeAt ?? 0);

    const spawnTentacle = (ctx: HookContext, x: number, spec: PetSpec, activeIn: number, text: string) => {
      const pet = spawnPet(ctx.world, ctx.self, spec, x, { side: ctx.self.side, text });
      pet.memory.activeAt = ctx.tick + ticks(activeIn);
      pet.memory.busyUntil = pet.memory.activeAt;
      pet.memory.autoReady = pet.memory.activeAt;
      pet.memory.queue = "";
      return pet;
    };

    /** A Tentacle starts a slam at the champion ("c") or its Spirit ("s"): a ground area from it toward where that stands. */
    const startSlam = (ctx: HookContext, pet: Pet, at: string) => {
      const { world, enemy } = ctx;
      const spirit = spiritOf(world, enemy);
      const aim = at === "s" && spirit ? spirit.x : enemy.x;
      const dir = aim === pet.x ? directionTo(ctx.self, enemy) : Math.sign(aim - pet.x);
      const fast = inLeap(ctx);
      const windup = fast ? fastWindup : slamWindup;
      // The champion steps out of its way like from a skillshot.
      const chance = skillshotChance(world, enemy, world.tick, windup, slamWidth / 2);
      world.zones.push({
        id: world.nextId++,
        owner: ctx.self.side,
        kind: "delayedArea",
        seenTick: world.tick,
        x: pet.x + (dir * slamLength) / 2,
        radius: slamLength / 2,
        startTick: world.tick,
        endTick: world.tick + ticks(windup),
        ability: slamSpec.key,
        onHit: slamEffects,
        connects: chance > 0.02,
        scale: chance >= 0.98 ? 1 : chance,
      });
      pet.memory.busyUntil = world.tick + ticks(windup) + (fast ? ticks(fastLock) : 0);
      ctx.log(`${tentacle.name} slams at ${at === "s" && spirit ? "the Spirit" : "the enemy"}`);
    };

    /** Slams landing this tick: a Spirit in the way takes the slam (and Illaoi heals for it); the champion's hit lands with the zone. */
    const landSlams = (ctx: HookContext) => {
      const { world, enemy, self } = ctx;
      const spirit = spiritOf(world, enemy);
      if (!spirit) return;
      for (const zone of world.zones) {
        if (zone.owner !== self.side || zone.ability !== slamSpec.key || zone.endTick > ctx.tick) continue;
        if (Math.abs(spirit.x - zone.x) > zone.radius + spirit.spec.radius) continue;
        // Its own falloff: the last two slams it took within the window.
        const window = ticks(falloff.window);
        const recent = [spirit.memory.hitA, spirit.memory.hitB].filter((t) => t !== undefined && ctx.tick - Number(t) < window).length;
        const share = Math.max(falloff.floor, 1 - falloff.per * recent);
        spirit.memory.hitB = spirit.memory.hitA ?? -1e9;
        spirit.memory.hitA = ctx.tick;
        damagePet(world, self, spirit, evaluate(slam, self, enemy) * share, "physical", false);
        ctx.apply(slamHeal, true);
        // Healed already: the champion's hit only damages.
        zone.onHit = [slamHit];
      }
    };

    /** The champion becomes a Vessel: slowed (spell shields stop that), and Tentacles rise near it. */
    const vessel = (ctx: HookContext) => {
      ctx.memory.vesselUntil = ctx.tick + ticks(vesselSeconds);
      ctx.log("makes the enemy a Vessel");
      if (canTarget(ctx.enemy, ctx.self)) abilityHit(ctx.world, ctx.self, ctx.enemy, vesselSpec, vesselSpec.onHit ?? []);
    };

    /** The Spirit takes damage: a share of it before resistances echoes to its champion; the killing blow echoes only what it had left. */
    const echo: NonNullable<PetSpec["onDamaged"]> = ({ world, pet, attacker, raw, dealt, before, damageType }) => {
      const champion = world.units[pet.owner];
      const left = dealt > 0 ? Math.min(1, Math.max(0, before) / dealt) : 1;
      const share = Math.min(1, echoBase + echoPerAd * derive(attacker).ad);
      if (champion.alive && raw > 0) applyEffect(world, attacker, champion, { type: "damage", damageType, amount: flat(raw * share * left), label: `${e.name} (echo)` }, { scale: 1 });
      if (pet.hp <= 0) attacker.memory.spiritKilled = world.tick;
    };

    const pullSpirit = (ctx: HookContext) => {
      const { world, self, enemy } = ctx;
      const d = derive(enemy);
      const seconds = (Number(ctx.memory.tetherUntil) - ctx.tick) / 30;
      if (!enemy.alive || seconds <= 0) return;
      const spec: PetSpec = {
        kind: SPIRIT,
        name: "Spirit",
        hp: enemy.hp,
        armor: d.armor.base + d.armor.bonus,
        mr: d.mr.base + d.mr.bonus,
        radius: enemy.spec.base.radius,
        moveSpeed: 0,
        duration: seconds,
        onDamaged: echo,
      };
      spawnPet(world, enemy, spec, self.x + directionTo(self, enemy) * pullTo, { side: self.side, text: "pulls out the enemy's Spirit" });
    };

    const abilities: AbilitySpec[] = [
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "line", range: tendrilRange, width: e.field("width"), speed: tendrilSpeed },
        // The tether, as a mark. Thrown like crowd control: only when it is likely to land.
        onHit: [{ type: "mark", key: "testOfSpirit", duration: tetherSeconds }],
        roles: ["cc"],
        decisive: true,
        flags: { projectile: true, spellShield: true },
        usable: (unit, world) => !locked(unit, world) && !spiritOf(world, world.units[unit.side === 0 ? 1 : 0]),
      },
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        delivery: { kind: "line", range: smashReach, width: smashWidth },
        onHit: slamEffects,
        falloff,
        flags: { spellShield: q.flag("spellShield") ?? true, projectile: false },
        usable: (unit, world) => !locked(unit, world),
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        cooldownAfter: "empower",
        overlay: true,
        delivery: { kind: "self" },
        onSelf: [{ type: "empower", attacks: 1, window: lessonWindow, bonusRange: lessonRange, uncancellable: true, resetAttack: true, onHit: [lessonHit] }],
        roles: ["buff"],
        usable: (unit, world) => !locked(unit, world),
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: leapCast,
        delivery: { kind: "aura", radius: leapRadius },
        onHit: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage"), label: r.name }],
        onCastStart: [{ type: "state", state: "displacementImmune", duration: leapCast }],
        flags: { spellShield: true },
        usable: (unit, world) => !locked(unit, world),
      },
      slamSpec,
      vesselSpec,
    ];

    // Harsh Lesson's leap: cast it when the enemy is in its reach but not in her own.
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      const lesson = self.spec.abilities.find((a) => a.key === "W");
      if (mode !== "flee" && lesson && !self.action && enemy.alive && canTarget(enemy, self) && !inAttackRange(self, enemy) && canCast(world, self, lesson)) {
        if (edgeDistance(self, enemy) <= self.spec.attack.range + lessonRange) return { kind: "cast", ability: "W" };
      }
      return defaultBehavior(view);
    };
    kit.assume("Illaoi casts Harsh Lesson to leap at an enemy just out of her reach, and between attacks otherwise.");

    return {
      abilities,
      behavior,
      budget: {
        // About one slam landing every four seconds (Harsh Lesson's commands and the Spirit's), and its heal.
        damage: (self, target) => ({ physical: evaluate(slam, self, target) / 4 }),
        healing: (self) => (healShare * maxHp(self) * 0.3) / 4,
      },
      hooks: {
        onStart(ctx) {
          spawnTentacle(ctx, ctx.self.x, tentacleSpec, 0, "has a Tentacle beside her");
          ctx.memory.spawnReady = ctx.tick;
        },
        onTick(ctx) {
          const { world, self, enemy, tick } = ctx;
          // The Spirit, pulled out once the pull is over.
          if (ctx.memory.spiritAt !== undefined && tick >= Number(ctx.memory.spiritAt)) {
            delete ctx.memory.spiritAt;
            pullSpirit(ctx);
          }
          const spirit = spiritOf(world, enemy);
          if (ctx.memory.spiritKilled !== undefined) {
            delete ctx.memory.spiritKilled;
            vessel(ctx);
          } else if (spirit && Math.abs(enemy.x - spirit.x) - enemy.spec.base.radius - spirit.spec.radius > tether) {
            world.pets = world.pets.filter((p) => p !== spirit);
            ctx.log("the tether breaks");
            vessel(ctx);
          }
          // Prophet of an Elder God: a Tentacle where none stands nearby.
          const own = tentaclesOf(world, self);
          if (tick >= Number(ctx.memory.spawnReady ?? 0) && !own.some((p) => Math.abs(p.x - self.x) < spawnClear)) {
            spawnTentacle(ctx, self.x, hiddenTentacle, spawnDelay, "raises a Tentacle");
            ctx.memory.spawnReady = tick + ticks(spawnEvery);
          }
          // A Vessel raises Tentacles near itself, closer together than hers.
          if (tick < Number(ctx.memory.vesselUntil ?? -1) && enemy.alive && !tentaclesOf(world, self).some((p) => Math.abs(p.x - enemy.x) < spawnClear - vesselCloser)) {
            spawnTentacle(ctx, enemy.x, hiddenTentacle, spawnDelay, "a Tentacle rises by the Vessel");
          }
          const leap = inLeap(ctx);
          for (const pet of tentaclesOf(world, self)) {
            // Untargetable while rising and through Leap of Faith.
            const hidden = !awake(pet, tick) || leap;
            const spec = pet.spec.duration === leapSeconds ? leapTentacle : hidden ? hiddenTentacle : tentacleSpec;
            if (pet.spec !== spec) pet.spec = spec;
          }
          landSlams(ctx);
          // Commands in turn; free Tentacles slam a Spirit or a Vessel on their own.
          const vesselNow = tick < Number(ctx.memory.vesselUntil ?? -1);
          const spiritNow = spiritOf(world, enemy);
          for (const pet of tentaclesOf(world, self)) {
            if (!awake(pet, tick) || tick < Number(pet.memory.busyUntil ?? 0) || !enemy.alive) continue;
            const queue = String(pet.memory.queue ?? "");
            if (queue.length > 0) {
              pet.memory.queue = queue.slice(1);
              startSlam(ctx, pet, queue[0] ?? "c");
              continue;
            }
            if (tick < Number(pet.memory.autoReady ?? 0)) continue;
            const at = spiritNow && Math.abs(spiritNow.x - pet.x) <= commandRange ? "s" : vesselNow && Math.abs(enemy.x - pet.x) <= commandRange ? "c" : undefined;
            if (!at) continue;
            pet.memory.autoReady = tick + ticks(autoEvery);
            startSlam(ctx, pet, at);
          }
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          const lesson = action?.kind === "windup" && (action.empowered ?? []).includes("W");
          ctx.memory.lessonSwing = lesson && action?.kind === "windup" && action.pet === undefined;
          // The leap: to the target when it is beyond her normal reach.
          if (ctx.memory.lessonSwing && edgeDistance(ctx.self, ctx.enemy) > ctx.self.spec.attack.range) {
            ctx.apply({ type: "reposition", direction: "toward", distance: edgeDistance(ctx.self, ctx.enemy) }, true);
          }
        },
        onAttackLaunch(ctx) {
          // Leap of Faith halves Harsh Lesson's cooldown, which starts as the attack lands.
          if (ctx.memory.lessonSwing && inLeap(ctx)) ctx.apply({ type: "refund", ability: "W", fraction: 0.5 }, true);
        },
        onAttackHit(ctx) {
          if (!ctx.memory.lessonSwing) return;
          ctx.memory.lessonSwing = false;
          // Every Tentacle in range of the target slams it, or will as it wakes.
          for (const pet of tentaclesOf(ctx.world, ctx.self)) {
            if (Math.abs(pet.x - ctx.enemy.x) > commandRange) continue;
            if (!awake(pet, ctx.tick) && Number(pet.memory.activeAt) - ctx.tick > ticks(wakeQueue)) continue;
            pet.memory.queue = `${String(pet.memory.queue ?? "")}c`;
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "E") {
            // Unable to act while the tendril flies (to its full range unless it hits).
            lock(ctx, tendrilRange / tendrilSpeed);
          }
          if (key === "R") {
            ctx.memory.leapUntil = ctx.tick + ticks(leapSeconds);
            // Harsh Lesson's cooldown, if running, is halved too.
            const ready = ctx.self.cooldownReady.W ?? 0;
            if (Number.isFinite(ready) && ready > ctx.tick) ctx.apply({ type: "refund", ability: "W", fraction: 0.5 }, true);
            const hit = ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.self.x - ctx.enemy.x) <= leapRadius;
            if (hit) spawnTentacle(ctx, ctx.self.x + directionTo(ctx.self, ctx.enemy) * leapTentacleAt, leapTentacle, 0, "summons a Tentacle");
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E" || ctx.scale < 0.5) return;
          // The pull: unable to act for 0.75 s, then the Spirit stands before her; the tether's 7 s run from the hit.
          lock(ctx, pullSeconds);
          ctx.memory.spiritAt = ctx.tick + ticks(pullSeconds);
          ctx.memory.tetherUntil = ctx.tick + ticks(tetherSeconds);
        },
      },
    };
  },
};

export default illaoi;
