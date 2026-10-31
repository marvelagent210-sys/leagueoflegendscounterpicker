/**
 * Aurelion Sol (patch 26.20): the Stardust he gathered over the game grows his spells. Breath of
 * Light channels a beam that burns, bursting each full second for a share of maximum health;
 * Astral Flight flies; Singularity's black hole damages and executes in its center; with 75
 * Stardust, Falling Star becomes The Skies Descend, knocking up and sending a shockwave.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { channelIn, clearChannel } from "../../engine/sim/channelState";
import { abilityHit, applyEffect, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { fieldAt, ticks } from "./util";

const aurelionSol: KitModule = {
  champion: "AurelionSol",
  options: { stardust: { label: "Stardust gathered by level 20", default: 200 } },
  build(kit, options) {
    const p = kit.ability("Cosmic Creator");
    const q = kit.ability("Breath of Light");
    const w = kit.ability("Astral Flight");
    const e = kit.ability("Singularity");
    const fall = kit.ability("Falling Star");
    const skies = kit.ability("The Skies Descend");
    const stardust = Math.max(0, Math.round(options.stardust ?? 0));
    p.quote("Aurelion Sol's damaging abilities against enemies generate him permanent stacks of Stardust, which gradually augments his abilities.");
    kit.assume(`Aurelion Sol has gathered ${stardust} Stardust by level 20 (the Stardust setting); what a duel adds is left out.`);

    // Breath of Light: a beam within 940 burning the enemy every 0.125 s for 13.125 (+ 6.875% AP); each full second, a burst of 100 (+ 30% AP) (+ 3.1% of Stardust as % of maximum health). It drains its cost each second.
    const beamTick = q.formula("Magic Damage per Tick");
    const burstWords = "Bonus Magic Damage: 60 / 70 / 80 / 90 / 100 (+ 30% AP) (+ (3.1% Stardust)% of target's maximum health)";
    const burst: Formula = { base: q.baseOf("Bonus Magic Damage"), ratios: { AP: q.quoted(burstWords, 5) / 100, targetMaxHP: (q.quoted(burstWords, 6) / 100) * stardust / 100 } };
    const beamEvery = q.quoted("dealing magic damage to them and surrounding enemies every 0.125 seconds", 0);
    const beamRange = q.field("range");
    const beamCost = q.cost();
    const beamSeconds = q.quoted("At rank 5, Breath of Light's channel duration is increased to 160 seconds.", 1);
    q.quote("Against the primary target, the beam will deal a burst of bonus magic damage for each full second that it burns them");
    q.quote("The following table refers to interactions while Aurelion Sol is channeling:");
    kit.assume(`Breath of Light costs ${beamCost} mana per second of its channel. Aurelion Sol stands still to channel it: by the wiki's channel table, moving, attacking or casting an ability ends it. He ends it himself when the enemy has been out of reach for a second.`);

    // Astral Flight: a flight of 1500 (+ 7.5 per Stardust) at 340 (+ 100% movement speed).
    const [flightBase = 1500, flightPer = 7.5] = w.fieldNumbers("targetRange");
    const [flightSpeed = 340] = w.fieldNumbers("speed");
    w.quote("Breath of Light channel will be interrupted if Astral Flight ends or Singularity or Falling Star / The Skies Descend is cast during the flight");
    kit.assume("Astral Flight is an escape here; its reset of Breath of Light and its boost to it during the flight are left out.");

    // Singularity: a black hole within 940 after 0.5 s for 5 s: 7.5 (+ 3% AP) every 0.25 s; its center executes below 5% (+ 2.6% per 100 Stardust) of maximum health.
    const holeWords = "Aurelion Sol conjures a black hole at the target location after a 0.5-second delay that lasts for 5 seconds, granting sight of the area and dealing magic damage every 0.25 seconds to enemies within.";
    const holeDelay = e.quoted(holeWords, 0);
    const holeSeconds = e.quoted(holeWords, 1);
    const holeEvery = e.quoted(holeWords, 2);
    const holeTick = e.formula("Magic Damage per Tick");
    const holeRadius = Math.sqrt(275 ** 2 + 16.93 ** 2 * stardust);
    const holeCenter = Math.sqrt(137.5 ** 2 + 8.46 ** 2 * stardust);
    e.fieldLabel("effectRadius", "Radius at 0 Stardust");
    const executeWords = "Enemies within the center are executed below 5% (+ 2.6% per 100 Stardust) of their maximum health, excluding epic monsters.";
    const execute = (e.quoted(executeWords, 0) + (e.quoted(executeWords, 1) * stardust) / 100) / 100;
    kit.assume("Singularity's drag toward its center is left out: an enemy caught in it is executed only if it stays in the center.");

    // Falling Star (under 75 Stardust): 350 (+ 75% AP) and a 1 s stun after 1.25 s. The Skies Descend: 437.5 (+ 93.75% AP) and a 1 s knock up after 2 s, and a shockwave for 315 (+ 67.5% AP) and a 50% slow on an enemy the star missed.
    const skiesAt = fall.quoted("Once Falling Star has been learned, gathering 75 Stardust causes the next cast of Falling Star to transform into The Skies Descend", 0);
    const descends = stardust >= skiesAt;
    const fallDelay = fall.quoted("Aurelion Sol calls down a star that strikes the target location after 1.25 seconds, dealing magic damage to enemies hit and stunning them for 1 second.", 0);
    const fallStun = fall.quoted("Aurelion Sol calls down a star that strikes the target location after 1.25 seconds, dealing magic damage to enemies hit and stunning them for 1 second.", 1);
    const skiesWords = "Aurelion Sol calls down a giant star that strikes the target location after 2 seconds, dealing 25% increased damage in a larger area and knocking up enemies hit for 1 second.";
    const skiesDelay = skies.quoted(skiesWords, 0);
    const skiesLift = skies.quoted(skiesWords, 2);
    const shockWords = "the impact sends a massive shockwave that rapidly expands from the area over 3 seconds, dealing magic damage to enemy champions and epic monsters hit, slowing all enemies hit by 50% for 1 second";
    const shockSeconds = skies.quoted(shockWords, 0);
    const shockSlow = skies.quoted(shockWords, 1) / 100;
    const shockSlowSeconds = skies.quoted(shockWords, 2);
    const shock = skies.formula("Magic Damage");
    const shockReach = skies.field("effectRadius", "Shockwave radius");
    skies.quote("Enemies hit by the star are immune to the shockwave.");
    const starRadius = descends ? Math.sqrt(388.91 ** 2 + 21.85 ** 2 * stardust) : Math.sqrt(275 ** 2 + 16.93 ** 2 * stardust);

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: 0, castTime: q.castTime(), cooldownAfter: "channel",
      usable: (unit) => unit.resource >= beamCost / 2,
      delivery: { kind: "self" },
      // Moving ends it at once.
      channel: { duration: beamSeconds, interval: beamEvery, interruptible: true, cancelAfter: 0, range: beamRange, onTick: [{ type: "damage", damageType: "magic", amount: beamTick, label: q.name }] },
      flags: { spellShield: false },
      roles: ["damage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.field("castTime", "Initial cast"),
      allowedDuringChannel: ["Q"],
      delivery: { kind: "dash", direction: "away", distance: flightBase + flightPer * stardust, minDistance: 0, speed: flightSpeed, speedFor: (unit) => flightSpeed + derive(unit).moveSpeed },
      flags: { grounded: true, knockdown: true },
      roles: ["escape"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      allowedDuringChannel: ["Q"],
      // The black hole itself is a field (see onCast).
      delivery: { kind: "circle", range: beamRange, radius: holeRadius, delay: holeDelay },
      onHit: [],
      flags: { spellShield: true },
      roles: ["damage"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: descends ? skies.name : fall.name, slot: "R", cooldown: fall.cooldown(), cost: fall.cost(), castTime: fall.castTime(),
      allowedDuringChannel: ["Q"],
      delivery: { kind: "circle", range: fall.field("targetRange"), radius: starRadius, delay: descends ? skiesDelay : fallDelay },
      onHit: descends
        ? [{ type: "damage", damageType: "magic", amount: skies.formula("Empowered Magic Damage") }, { type: "displace", direction: "away", distance: 0, duration: skiesLift }]
        : [{ type: "damage", damageType: "magic", amount: fall.formula("Magic Damage") }, { type: "cc", cc: "stun", duration: fallStun }],
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    // The shockwave, for an enemy the star missed.
    const shockSpec: AbilitySpec = { key: "RS", name: `${skies.name} (shockwave)`, slot: "R", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true } };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (view.mode === "flee" && canCast(world, self, wSpec)) return { kind: "cast", ability: "W", aim: { direction: -1, distance: wSpec.delivery.kind === "dash" ? wSpec.delivery.distance : 0 } };
      const beaming = channelIn(self.action)?.ability === "Q";
      // Stepping away ends the beam.
      if (beaming && (view.mode === "flee" || self.memory.tradeDone)) return { kind: "move", direction: -1 };
      // Singularity before Breath of Light, which casting it would end.
      if (!self.action && view.mode !== "idle" && canCast(world, self, eSpec) && Math.abs(enemy.x - self.x) <= beamRange) return { kind: "cast", ability: "E" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory["asol:burnTicks"] = 0;
            ctx.memory["asol:lastInReach"] = ctx.tick;
          }
          if (key === "E") {
            // The black hole: 5 s of damage where it lands, executing in its center.
            const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(beamRange, Math.abs(ctx.enemy.x - ctx.self.x));
            ctx.memory["asol:holeX"] = x;
            ctx.memory["asol:holeFrom"] = ctx.tick + ticks(holeDelay);
            ctx.memory["asol:holeUntil"] = ctx.tick + ticks(holeDelay + holeSeconds);
            fieldAt(ctx, "E", x, holeRadius, holeDelay + holeSeconds, holeEvery, [{ type: "damage", damageType: "magic", amount: holeTick, label: e.name }]);
          }
          if (key === "R" && descends) {
            ctx.memory["asol:starAt"] = ctx.tick + ticks(skiesDelay);
            ctx.memory["asol:starX"] = ctx.enemy.x;
            delete ctx.memory["asol:starHit"];
          }
        },
        onAbilityContact(ctx) {
          // Each full second of burning, a burst.
          if (ctx.ability.key !== "Q" || ctx.enemy.petId !== undefined) return undefined;
          const burned = Number(ctx.memory["asol:burnTicks"] ?? 0) + 1;
          ctx.memory["asol:burnTicks"] = burned;
          ctx.memory["asol:lastInReach"] = ctx.tick;
          if (burned % Math.round(1 / beamEvery) !== 0) return undefined;
          return [...ctx.effects, { type: "damage", damageType: "magic", amount: burst, label: `${q.name} (burst)` }];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R") ctx.memory["asol:starHit"] = true;
        },
        onTick(ctx) {
          const self = ctx.self;
          const channel = channelIn(self.action);
          // Breath of Light drains mana each second, and ends a second after the enemy left its reach.
          if (channel && channel.ability === "Q") {
            self.resource -= beamCost / 30;
            const gone = ctx.tick - Number(ctx.memory["asol:lastInReach"] ?? ctx.tick) > 30;
            if (self.resource <= 0 || gone) {
              self.resource = Math.max(0, self.resource);
              clearChannel(self, channel);
              self.action = undefined;
            }
          }
          // Singularity's center executes.
          const holeUntil = Number(ctx.memory["asol:holeUntil"] ?? -1);
          if (ctx.tick < holeUntil && ctx.tick >= Number(ctx.memory["asol:holeFrom"] ?? 0)) {
            const enemy = ctx.enemy;
            if (enemy.alive && Math.abs(enemy.x - Number(ctx.memory["asol:holeX"])) <= holeCenter && enemy.hp <= execute * derive(enemy).maxHp) {
              applyEffect(ctx.world, self, enemy, { type: "execute", threshold: { base: 0, ratios: { targetMaxHP: execute } } }, { scale: 1 });
            }
          }
          // The Skies Descend's shockwave reaches an enemy the star missed.
          const starAt = ctx.memory["asol:starAt"];
          if (starAt !== undefined && ctx.tick > Number(starAt)) {
            const enemy = ctx.enemy;
            const reach = Math.abs(enemy.x - Number(ctx.memory["asol:starX"]));
            const arrives = Number(starAt) + ticks((shockSeconds * Math.min(reach, shockReach)) / shockReach);
            if (ctx.memory["asol:starHit"] === true || reach > shockReach) delete ctx.memory["asol:starAt"];
            else if (ctx.tick >= arrives) {
              delete ctx.memory["asol:starAt"];
              abilityHit(ctx.world, self, enemy, shockSpec, [{ type: "damage", damageType: "magic", amount: shock, label: shockSpec.name }, { type: "cc", cc: "slow", strength: shockSlow, duration: shockSlowSeconds }]);
            }
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { magic: evaluate(beamTick, self, target) / beamEvery + evaluate(burst, self, target) + (evaluate(holeTick, self, target) * (holeSeconds / holeEvery) * haste) / eSpec.cooldown };
        },
      },
    };
  },
};

export default aurelionSol;
