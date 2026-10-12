/**
 * Heimerdinger: every number is read from the wiki's ability data at level 20 (see
 * engine/kits/context.ts). His H-28G Evolution Turrets are pets (engine/sim/pets.ts) that
 * shoot the enemy in reach and charge a beam, faster when his rockets and grenade hit it.
 * UPGRADE!!! empowers one basic ability; each matchup plays the one that does best there.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, chargesLeft, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo, edgeDistance } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { destroyPet, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

const TURRET = "turret";
const APEX = "apex";
/** UPGRADE!!!'s choices, as option values. */
const UPGRADES = { 1: "Q", 2: "W", 3: "E" } as const;

const heimerdinger: KitModule = {
  champion: "Heimerdinger",
  options: {
    turrets: { label: "H-28G Evolution Turrets standing by Heimerdinger when a fight starts (0 to 3)", default: 3 },
    upgrade: { label: "UPGRADE!!! empowers: 0 the best for each matchup, 1 the turret, 2 the rockets, 3 the grenade", default: 0 },
  },
  variants(options) {
    if ((options.upgrade ?? 0) !== 0) return [];
    return [1, 2, 3].map((upgrade) => ({ upgrade }));
  },
  build(kit, options) {
    const innate = kit.ability("Hextech Affinity");
    const q = kit.ability("H-28G Evolution Turret");
    const rq = kit.ability("H-28Q Apex Turret");
    const w = kit.ability("Hextech Micro-Rockets");
    const rw = kit.ability("Hextech Rocket Swarm");
    const e = kit.ability("CH-2 Electron Storm Grenade");
    const re = kit.ability("CH-3X Lightning Grenade");
    const r = kit.ability("UPGRADE!!!");
    const turretPet = kit.pet("H-28G Evolution Turret");
    const apexPet = kit.pet("H-28Q Apex Turret");
    const upgrade = UPGRADES[(Math.round(options.upgrade ?? 0) as 1 | 2 | 3) || 2] ?? "W";

    // Hextech Affinity: 20% faster within 300 of his turrets.
    const affinity = innate.quoted("Heimerdinger gains 20% bonus movement speed while near an allied turret", 0) / 100;
    const affinityReach = innate.field("effectRadius");

    // H-28G Evolution Turret: 3 kits, one every 20 s; up to 3 turrets, within 350 of him.
    const kitCap = q.quoted("Heimerdinger periodically stocks a Turret Kit charge, up to a maximum of 3", 0);
    const turretCap = q.quoted("Up to 3 H-28G Evolution Turrets can be deployed at a time, with those deployed beyond the maximum destroying the oldest one", 0);
    const deployRange = q.field("targetRange");
    const startTurrets = Math.max(0, Math.min(turretCap, Math.round(options.turrets ?? 3)));
    kit.assume(
      `With the lane set up, ${startTurrets} H-28G Evolution Turret${startTurrets === 1 ? "" : "s"} stand${startTurrets === 1 ? "s" : ""} by Heimerdinger when the fight starts, uncharged, and his ${kitCap} kits are full again.`,
    );

    // The turret: 700 (+ 53% AP) health at level 20, 110 armor and 86 magic resistance; 23 (+ 35% AP) magic damage at 1.75 a second from 550.
    const turret = {
      hp: turretPet.stat("hp"),
      hpAp: turretPet.stat("hp", 1) / 100,
      armor: turretPet.stat("armor"),
      mr: turretPet.stat("magicresist"),
      radius: turretPet.stat("radius"),
      // "550 / 600": 600 only against minions.
      range: turretPet.quoted("550 / 600", 0),
      speed: turretPet.stat("attackspeed"),
      hit: { base: turretPet.stat("damage"), ratios: { AP: turretPet.quoted("7 / 11 / 15 / 19 / 23 (+ 35% AP)", 5) / 100 } } as Formula,
      meleeTaken: 1 + turretPet.quoted("40% increased damage from melee champion basic attacks and turrets", 0) / 100,
    };
    turretPet.quote("Attacks can be mitigated by block, dodge, and blind");
    kit.assume(
      `Turrets shoot ${turret.speed} times a second (the wiki; the game files give the turret 1.25 before its scripts), and their shots land at once; they don't switch off when Heimerdinger is far.`,
    );

    // Beams: 1.1% charge a second; at 100%, a beam at the enemy within 900, 120 (+ 55% AP) to all in its way.
    const beamText = "generates 1.1% charge per second";
    turretPet.quote(beamText);
    const beamPerSecond = 1 / 90;
    const beamReach = turretPet.quoted("At 100% charge, if there are targets within 900 units range", 1);
    const beamText2 = "dealing 40 / 60 / 80 / 100 / 120 (+ 55% AP) magic damage to all enemies it passes through";
    const beamHit: Formula = { base: turretPet.quoted(beamText2, 4), ratios: { AP: turretPet.quoted(beamText2, 5) / 100 } };
    // The game files' beam: 0.425 s to wind up, then 1000 units out at about 1400 a second (1650 slowing to 1200), 50 wide.
    const beamWindup = 0.425;
    const beamLength = 1000;
    const beamSpeed = 1400;
    const beamWidth = 50;
    kit.assume(`A beam winds up for ${beamWindup} s and flies ${beamLength} units at about ${beamSpeed} a second, ${beamWidth} wide (the game files; the wiki says "a short wind-up"): the enemy can step out of its way unless held in place.`);

    // The Apex Turret: 1825 (+ 50% AP) health, 100 armor and magic resistance, 120 (+ 35% AP) at 1.05 a second from 650 for 8 s; a 25% slow on hit; its beam charges 12.5% a second and 20% a shot.
    const apex = {
      hp: apexPet.stat("hp"),
      hpAp: apexPet.quoted("(+ 50% AP)", 0) / 100,
      armor: apexPet.stat("armor"),
      mr: apexPet.stat("magicresist"),
      radius: apexPet.stat("radius"),
      range: apexPet.stat("range"),
      speed: apexPet.stat("attackspeed"),
      hit: { base: apexPet.stat("damage"), ratios: { AP: apexPet.quoted("80 / 100 / 120 (+ 35% AP)", 3) / 100 } } as Formula,
      slow: apexPet.quoted("slows affected targets by 25% for 1 second", 0) / 100,
      slowFor: apexPet.quoted("slows affected targets by 25% for 1 second", 1),
      chargeRate: apexPet.quoted("generates 12.5% charge per second, and an additional 20% per basic attack", 0) / 100,
      chargePerShot: apexPet.quoted("generates 12.5% charge per second, and an additional 20% per basic attack", 1) / 100,
      beam: { base: apexPet.quoted("dealing 100 / 140 / 180 (+ 70% AP) magic damage", 2), ratios: { AP: apexPet.quoted("dealing 100 / 140 / 180 (+ 70% AP) magic damage", 3) / 100 } } as Formula,
      seconds: rq.quoted("which lasts for 8 seconds", 0),
      meleeTaken: 1 + apexPet.quoted("40% increased damage from melee champion basic attacks and turrets", 0) / 100,
    };
    apexPet.quote("Attacks cannot be mitigated by block or dodge");

    // Hextech Micro-Rockets: 270 (+ 103% AP) when all five hit; each rocket gives turrets within 1000 20% charge.
    const rocketCharge = w.quoted("Every rocket hitting an enemy champion grants 20% beam charge to all H-28G Evolution Turret turrets within 1000 range", 0) / 100;
    // (The 28 of "H-28G" is the second number.)
    const chargeReach = w.quoted("Every rocket hitting an enemy champion grants 20% beam charge to all H-28G Evolution Turret turrets within 1000 range", 2);
    const rocketRange = w.field("targetRange");
    const rocketSpeed = 750;
    const rocketWidth = 200;
    kit.assume(`Hextech Micro-Rockets fly as one ${rocketWidth}-wide volley at ${rocketSpeed} a second (the game files): when it lands, all five rockets hit, and the swarm's twenty likewise.`);

    // CH-2 Electron Storm Grenade: 220 (+ 60% AP) within 250, a 35% slow for 2 s, a 1.5 s stun within 100; turrets near a champion hit charge fully.
    const grenadeRange = e.field("targetRange");
    const lightningRange = re.field("targetRange");
    const apexRange = rq.field("targetRange");
    const grenadeFlight = grenadeRange / e.field("speed");
    const slowText = "dealing magic damage to nearby enemies and slowing them by 35% for 2 seconds";
    const grenadeSlow = e.quoted(slowText, 0) / 100;
    const grenadeSlowFor = e.quoted(slowText, 1);
    const grenadeStun = e.quoted("Enemies hit at the center of the grenade's impact are also stunned for 1.5 seconds", 0);
    e.quote("If the grenade hits an enemy champion, all H-28G Evolution Turret turrets within 1000 range of the impact gain 100% beam charge");
    kit.assume(`The grenades land ${grenadeFlight.toFixed(3)} s after their cast (their flight to full range); the Lightning Grenade's bounces past the first landing are left out.`);

    // UPGRADE!!!: 100 mana, 70 s, the next basic ability empowered.
    r.quote("Heimerdinger empowers his next basic ability for an additional effect, consuming the empowerment upon cast and placing UPGRADE!!! on full cooldown");
    kit.assume(`UPGRADE!!! empowers his ${upgrade === "Q" ? "turret (H-28Q Apex Turret)" : upgrade === "W" ? "rockets (Hextech Rocket Swarm)" : "grenade (CH-3X Lightning Grenade)"}.`);

    const turretSpec = (owner: Unit): PetSpec => ({
      kind: TURRET,
      name: turretPet.name,
      hp: turret.hp + turret.hpAp * derive(owner).ap,
      armor: turret.armor,
      mr: turret.mr,
      meleeAttackTaken: turret.meleeTaken,
      radius: turret.radius,
      moveSpeed: 0,
      duration: Number.POSITIVE_INFINITY,
      attack: { range: turret.range, interval: 1 / turret.speed, attackLike: true, effects: [{ type: "damage", damageType: "magic", amount: turret.hit, label: turretPet.name }] },
    });
    const apexSpec = (owner: Unit): PetSpec => ({
      kind: APEX,
      name: apexPet.name,
      hp: apex.hp + apex.hpAp * derive(owner).ap,
      armor: apex.armor,
      mr: apex.mr,
      meleeAttackTaken: apex.meleeTaken,
      radius: apex.radius,
      moveSpeed: 0,
      duration: apex.seconds,
      attack: {
        range: apex.range,
        interval: 1 / apex.speed,
        attackLike: false,
        effects: [
          { type: "damage", damageType: "magic", amount: apex.hit, label: apexPet.name },
          { type: "cc", cc: "slow", duration: apex.slowFor, strength: apex.slow },
        ],
      },
    });

    // Hidden: a turret's beam, the way the hooks fire it.
    const beamSpec: AbilitySpec = {
      key: "BEAM",
      name: "Turret beam",
      slot: "Q",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "area", near: 0, far: beamLength, delay: beamWindup, anchor: "ground" },
      onHit: [{ type: "damage", damageType: "magic", amount: beamHit, label: "Turret beam" }],
      flags: { spellShield: true, projectile: true },
      usable: () => false,
    };
    const apexBeamSpec: AbilitySpec = { ...beamSpec, key: "APEXBEAM", name: "Apex beam", onHit: [{ type: "damage", damageType: "magic", amount: apex.beam, label: "Apex beam" }] };

    const turretsOf = (world: World, self: Unit, kind = TURRET): Pet[] => world.pets.filter((p) => p.owner === self.side && p.spec.kind === kind);
    const upgraded = (unit: Unit) => Boolean(unit.memory.upgraded);

    const placeTurret = (ctx: HookContext, x: number) => {
      const own = turretsOf(ctx.world, ctx.self);
      // Beyond the limit, the oldest goes.
      if (own.length >= turretCap) {
        const oldest = own.reduce((a, b) => (a.id < b.id ? a : b));
        destroyPet(ctx.world, oldest);
      }
      const pet = spawnPet(ctx.world, ctx.self, turretSpec(ctx.self), x, { side: ctx.self.side, text: `deploys an ${turretPet.name}` });
      pet.memory.charge = 0;
      return pet;
    };
    /** Charge for turrets within reach of `x`. */
    const charge = (ctx: HookContext, x: number, amount: number) => {
      for (const pet of turretsOf(ctx.world, ctx.self)) if (Math.abs(pet.x - x) <= chargeReach) pet.memory.charge = Math.min(1, Number(pet.memory.charge ?? 0) + amount);
    };
    /** A beam from a pet toward the enemy: a ground stretch it can step out of. */
    const fireBeam = (ctx: HookContext, pet: Pet, spec: AbilitySpec) => {
      const { world, enemy } = ctx;
      const dir = enemy.x === pet.x ? directionTo(ctx.self, enemy) : Math.sign(enemy.x - pet.x);
      const reach = Math.max(0, Math.abs(enemy.x - pet.x) - enemy.spec.base.radius);
      const lands = beamWindup + reach / beamSpeed;
      const chance = skillshotChance(world, enemy, world.tick, lands, beamWidth / 2);
      world.zones.push({
        id: world.nextId++,
        owner: ctx.self.side,
        kind: "delayedArea",
        seenTick: world.tick,
        x: pet.x + (dir * beamLength) / 2,
        radius: beamLength / 2,
        startTick: world.tick,
        endTick: world.tick + Math.max(1, ticks(lands)),
        ability: spec.key,
        onHit: spec.onHit ?? [],
        connects: chance > 0.02,
        scale: chance >= 0.98 ? 1 : chance,
      });
      pet.memory.charge = 0;
      ctx.log(`${pet.spec.name} fires its beam`);
    };

    const placeAt = (unit: Unit, enemy: Unit) => unit.x + directionTo(unit, enemy) * Math.min(deployRange, Math.abs(enemy.x - unit.x));
    const turretAbility = (key: string, data: typeof q, apexOne: boolean): AbilitySpec => ({
      key,
      name: data.name,
      slot: "Q",
      cooldown: q.cooldown(),
      cooldownKey: "Q",
      castTime: data.castTime(),
      ...(apexOne ? {} : { cost: q.cost(), charges: { max: kitCap, recharge: q.field("recharge") } }),
      delivery: { kind: "self" },
      roles: ["buff"],
    });

    const abilities: AbilitySpec[] = [
      {
        ...turretAbility("Q", q, false),
        // A kit for a turret that can reach the enemy, when fewer than three can.
        usable: (unit, world) => !upgraded(unit) || upgrade !== "Q",
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "line", range: rocketRange, width: rocketWidth, speed: rocketSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Combined Total Non-Minion Damage"), label: w.name }],
        flags: { projectile: w.flag("projectile") ?? true, spellShield: w.flag("spellShield") ?? true },
        usable: (unit) => !upgraded(unit) || upgrade !== "W",
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "circle", range: grenadeRange, radius: e.field("effectRadius"), delay: grenadeFlight },
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage"), label: e.name },
          { type: "cc", cc: "slow", duration: grenadeSlowFor, strength: grenadeSlow },
        ],
        flags: { projectile: e.flag("projectile") ?? true, spellShield: e.flag("spellShield") ?? true },
        usable: (unit) => !upgraded(unit) || upgrade !== "E",
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        delivery: { kind: "self" },
        roles: ["buff"],
        usable: (unit) => !upgraded(unit),
      },
      // The empowered versions, sharing their basic forms' cooldowns and free.
      { ...turretAbility("RQ", rq, true), name: rq.name, usable: (unit) => upgraded(unit) && upgrade === "Q" },
      {
        key: "RW",
        name: rw.name,
        slot: "W",
        cooldown: w.cooldown(),
        cooldownKey: "W",
        castTime: rw.castTime(),
        delivery: { kind: "line", range: rocketRange, width: rocketWidth, speed: rocketSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: rw.formula("Combined Total Non-Minion Damage"), label: rw.name }],
        flags: { projectile: true, spellShield: true },
        usable: (unit) => upgraded(unit) && upgrade === "W",
      },
      {
        key: "RE",
        name: re.name,
        slot: "E",
        cooldown: e.cooldown(),
        cooldownKey: "E",
        castTime: re.castTime(),
        delivery: { kind: "circle", range: lightningRange, radius: re.field("effectRadius"), delay: grenadeFlight },
        onHit: [
          { type: "damage", damageType: "magic", amount: re.formula("Magic Damage"), label: re.name },
          { type: "cc", cc: "slow", duration: grenadeSlowFor, strength: grenadeSlow },
        ],
        flags: { projectile: true, spellShield: true },
        usable: (unit) => upgraded(unit) && upgrade === "E",
      },
      beamSpec,
      apexBeamSpec,
    ];
    const innerRadius = { E: e.field("innerRadius"), RE: re.field("innerRadius") } as Record<string, number>;

    // Turrets where they reach the enemy; UPGRADE!!! just before the ability it empowers.
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (!self.action && enemy.alive && mode !== "flee" && mode !== "idle") {
        const spec = (key: string) => self.spec.abilities.find((a) => a.key === key);
        const reaching = turretsOf(world, self).filter((p) => Math.abs(p.x - enemy.x) - enemy.spec.base.radius <= turret.range).length;
        const place = spec("Q");
        const placed = placeAt(self, enemy);
        if (place && reaching < turretCap && chargesLeft(world, self, place) > 0 && canCast(world, self, place) && Math.abs(placed - enemy.x) - enemy.spec.base.radius <= turret.range) {
          return { kind: "cast", ability: "Q" };
        }
        const empowered = spec(`R${upgrade}`);
        const basic = spec(upgrade);
        const reach = (a: AbilitySpec | undefined) => {
          const d = a?.delivery;
          if (!d) return 0;
          return d.kind === "line" ? d.range : d.kind === "circle" ? d.range + d.radius : deployRange + apex.range;
        };
        const rSpec = spec("R");
        if (mode === "fight" && rSpec && basic && canCast(world, self, rSpec) && (self.cooldownReady[upgrade] ?? 0) <= world.tick && edgeDistance(self, enemy) <= reach(empowered)) {
          return { kind: "cast", ability: "R" };
        }
        if (empowered && canCast(world, self, empowered) && edgeDistance(self, enemy) <= reach(empowered)) return { kind: "cast", ability: empowered.key };
      }
      return defaultBehavior(view);
    };
    kit.assume("Heimerdinger deploys a turret toward the enemy (within 350 units of him) while fewer than three reach it, and casts UPGRADE!!! in a fight just before the ability it empowers.");

    return {
      abilities,
      behavior,
      budget: {
        // Two turrets shooting, and a beam every so often.
        damage: (self, target) => ({ magic: 2 * turret.speed * evaluate(turret.hit, self, target) + evaluate(beamHit, self, target) / 10 }),
      },
      hooks: {
        onStart(ctx) {
          // Turrets set up while laning, when the lane was set up in advance.
          if (ctx.world.settings.environment.laneSetup) for (let i = 0; i < startTurrets; i++) placeTurret(ctx, ctx.self.x);
        },
        onTick(ctx) {
          const { world, self, enemy, tick } = ctx;
          // Charge and beams.
          for (const pet of world.pets) {
            if (pet.owner !== self.side || (pet.spec.kind !== TURRET && pet.spec.kind !== APEX)) continue;
            const rate = pet.spec.kind === APEX ? apex.chargeRate : beamPerSecond;
            pet.memory.charge = Math.min(1, Number(pet.memory.charge ?? 0) + rate / 30);
            if (Number(pet.memory.charge) >= 1 && enemy.alive && Math.abs(enemy.x - pet.x) - enemy.spec.base.radius <= beamReach) {
              fireBeam(ctx, pet, pet.spec.kind === APEX ? apexBeamSpec : beamSpec);
            }
            // The Apex Turret's shots charge it too: each new shot moves its next attack on.
            if (pet.spec.kind === APEX && pet.nextAttackTick !== Number(pet.memory.lastShot ?? pet.nextAttackTick)) {
              pet.memory.charge = Math.min(1, Number(pet.memory.charge) + apex.chargePerShot);
            }
            pet.memory.lastShot = pet.nextAttackTick;
          }
          // Hextech Affinity: faster near his turrets.
          const near = world.pets.some((p) => p.owner === self.side && (p.spec.kind === TURRET || p.spec.kind === APEX) && Math.abs(p.x - self.x) <= affinityReach);
          if (near !== Boolean(ctx.memory.affinity)) {
            ctx.memory.affinity = near;
            ctx.buff("affinity", "moveSpeedPercent", near ? affinity : 0, FOREVER);
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") placeTurret(ctx, placeAt(ctx.self, ctx.enemy));
          if (key === "R") ctx.memory.upgraded = true;
          if (key.startsWith("R") && key !== "R") ctx.memory.upgraded = false;
          if (key === "RQ") {
            const pet = spawnPet(ctx.world, ctx.self, apexSpec(ctx.self), ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(apexRange, Math.abs(ctx.enemy.x - ctx.self.x)), {
              side: ctx.self.side,
              text: `deploys an ${apexPet.name}`,
            });
            pet.memory.charge = 0;
          }
          if (key === "E" || key === "RE") {
            // Where the grenade lands: on the enemy, or as far toward it as it reaches.
            const range = key === "E" ? grenadeRange : lightningRange;
            const d = Math.abs(ctx.enemy.x - ctx.self.x);
            ctx.memory.grenadeX = ctx.enemy.x - directionTo(ctx.self, ctx.enemy) * Math.max(0, d - range);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "W" || key === "RW") charge(ctx, ctx.enemy.x, rocketCharge * (key === "W" ? 5 : 20));
          if (key === "E" || key === "RE") {
            const center = Number(ctx.memory.grenadeX);
            // Stunned at the center of the impact.
            if (Math.abs(ctx.enemy.x - center) <= (innerRadius[key] ?? 0) + ctx.enemy.spec.base.radius) ctx.apply({ type: "cc", cc: "stun", duration: grenadeStun });
            charge(ctx, center, 1);
          }
        },
      },
    };
  },
};

export default heimerdinger;
