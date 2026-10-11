/** Skarner: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { attackRange, canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { type Unit, type World, other } from "../../engine/sim/state";
import { hasOwn, maxHp, ticks } from "./util";

const skarner: KitModule = {
  champion: "Skarner",
  build(kit) {
    const threads = kit.ability("Threads of Vibration");
    const q = kit.ability("Shattered Earth");
    const q2 = kit.ability("Upheaval");
    const w = kit.ability("Seismic Bastion");
    const e = kit.ability("Ixtal's Impact");
    const r = kit.ability("Impale");

    // Threads of Vibration: hits stack Quaking (4 s, up to 3); at 3, a share of maximum health as magic damage every 0.5 s.
    const quaking = "apply a stack of Quaking to enemies hit for 4 seconds, refreshing on subsequent applications and stacking up to 3 times";
    const quakeSeconds = threads.quoted(quaking, 0);
    const quakeMax = threads.quoted(quaking, 1);
    const quakeShare = threads.levelValue("Enemies afflicted with 3 stacks take magic damage") / 100;
    // The wiki's other reading of the same damage: 1/8 of it every 0.5 s over the 4 s.
    const quakeEvery = 0.5;
    threads.quote("Blocked attacks will still apply stacks");
    threads.quote("Spell shield prevents Quaking's application from Upheaval and Impale only");
    kit.assume(`Quaking's ${Math.round(quakeShare * 1e4) / 100}% of maximum health over ${quakeSeconds} s comes in ticks every ${quakeEvery} s for as long as the enemy has 3 stacks, each hit adding one stack.`);

    // Shattered Earth: three empowered attacks within 5 s of each other, the last one a slam; Upheaval throws the boulder instead.
    const boulderWindow = q.quoted("empowering up to three of his next basic attacks within 5 seconds of each other", 0);
    const boulderAttacks = 3;
    q.quote("empowering up to three of his next basic attacks within 5 seconds of each other");
    const boulderRange = q.quoted("These attacks gain 25 bonus range", 0);
    const boulderSpeed = q.fraction("Bonus Attack Speed");
    const boulderHit = q.formula("Bonus Physical Damage per Hit");
    const slamShare = q.quoted("dealing an additional 11% of each target's maximum health physical damage", 0) / 100;
    const slamSlow = q.quoted("slowing afflicted enemies by 40% for 1 second", 0) / 100;
    const slamSlowFor = q.quoted("slowing afflicted enemies by 40% for 1 second", 1);
    const throwAfter = q.quoted("After 0.5 seconds of the cast, Skarner gains the ability to use Upheaval during Shattered Earth", 0);
    q.quote("The empowered attacks have an uncancellable windup against champions, minions, and turrets only");
    const qCooldown = q.cooldown();
    const throwRange = q2.field("range");
    kit.assume("Shattered Earth's attack speed lasts while it has attacks left; Upheaval is thrown only at an enemy out of attack range, as the three attacks deal more.");

    // Seismic Bastion: a shield at once, then a shockwave that quickly expands around him.
    const bastion = "shielding himself equal to 8% of his maximum health for 2.5 seconds";
    const bastionShield = w.quoted(bastion, 0) / 100;
    const bastionSeconds = w.quoted(bastion, 1);
    const shockwaveAfter = w.tipped("quickly");
    const [shockwaveRadius = 600] = w.fieldValues("effectRadius");
    w.quote("The shield is granted at the start of the cast time");
    kit.assume(`Seismic Bastion's shockwave reaches the enemy ${shockwaveAfter} s after the cast, at its ${shockwaveRadius}-unit forward reach.`);

    // Ixtal's Impact: a charge from 150 speed, 100 more every 0.264 s up to 950; it grabs the enemy and carries it into the wall.
    const charging = "Skarner begins the charge at a static amount of 150 movement speed that increases by 100 every 0.264, up to 950 total movement speed by the end of the duration";
    const chargeFrom = e.quoted(charging, 0);
    const chargeAmount = e.quoted(charging, 1);
    const chargeEvery = e.quoted(charging, 2);
    const chargeTop = e.quoted(charging, 3);
    const chargeSeconds = e.quoted("Skarner charges forward in the direction of the cursor for up to 2.75 seconds", 0);
    const grabbing = "gaining 300 bonus movement speed, with a minimum total of 650 and a maximum total of 1150";
    const carryBonus = e.quoted(grabbing, 0);
    const carryMin = e.quoted(grabbing, 1);
    const carryMax = e.quoted(grabbing, 2);
    const holding = "If a target has been grabbed before the first 1.75 seconds of the charge, the remaining duration is set to 1 second, and set to 0.5 seconds otherwise";
    const earlyGrab = e.quoted(holding, 0);
    const carryLong = e.quoted(holding, 1);
    const carryShort = e.quoted(holding, 2);
    const carryOffset = e.quoted("While the target is grabbed, they are attached to Skarner 200 units in front of him", 0);
    const wallStun = e.quoted("dealing physical damage, stunning them for 1.1 seconds, and reducing Ixtal's Impact's cooldown by 35%", 0);
    const wallRefund = e.quoted("dealing physical damage, stunning them for 1.1 seconds, and reducing Ixtal's Impact's cooldown by 35%", 1) / 100;
    const wallHit = e.formula("Physical Damage");
    const eCooldown = e.cooldown();
    e.quote("Ixtal's Impact ends immediately if Skarner becomes immobilized or grounded, or is affected by any form of cast-inhibiting crowd control, during the charge");
    let chargeReach = 0;
    for (let k = 1; k <= ticks(chargeSeconds); k++) chargeReach += Math.min(chargeTop, chargeFrom + chargeAmount * Math.floor(k / ticks(chargeEvery))) / 30;
    chargeReach = Math.round(chargeReach);
    kit.assume(
      "Ixtal's Impact steers after the enemy, so it reaches it unless outrun, dashed or blinked away from; it carries the enemy away from Skarner, into the lane's wall when there is one.",
    );

    // Impale: after 0.75 s, a trapezoid in front of him; the enemy is suppressed and carried for 1.5 s.
    const impaleRange = r.fieldNumbers("range");
    const impaleSeconds = r.quoted("suppress them for 1.5 seconds", 0);
    const impaleOffset = r.quoted("While the targets are impaled, they are attached to Skarner 300 units in front of him", 0);
    const impaleSpeed = r.quoted("Skarner gains 40% bonus movement speed for the same duration", 0) / 100;
    r.quote("If Impale is cast during Shattered Earth, Skarner automatically casts Upheaval in the direction of Impale's cast");
    r.quote("Skarner is unable to basic attack, cast Shattered Earth or Ixtal's Impact, or use Flash during Impale");
    kit.assume("Impale leaves the enemy where it was carried (the wiki's 200-unit placement at the end is left out).");

    // Quaking on the enemy, kept in Skarner's memory.
    const quakesOf = (unit: Unit, world: World) => (world.tick < Number(unit.memory.quakeUntil ?? -1) ? Number(unit.memory.quakes ?? 0) : 0);
    const addQuake = (ctx: HookContext) => {
      const before = quakesOf(ctx.self, ctx.world);
      ctx.memory.quakes = Math.min(quakeMax, before + 1);
      ctx.memory.quakeUntil = ctx.tick + ticks(quakeSeconds);
      if (before < quakeMax && Number(ctx.memory.quakes) >= quakeMax) ctx.memory.quakeNext = ctx.tick + ticks(quakeEvery);
    };
    const impaling = (unit: Unit, world: World) => world.tick < Number(unit.memory.impaleUntil ?? -1);
    const boulderUp = (unit: Unit) => hasOwn(unit, "empower", "Q");
    const slamHit: Effect[] = [
      { type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: slamShare } }, label: `${q.name} (slam)` },
      { type: "cc", cc: "slow", strength: slamSlow, duration: slamSlowFor },
    ];
    const upheaval: Effect[] = [{ type: "damage", damageType: "physical", amount: q2.formula("Physical Damage"), label: q2.name }, slamHit[1] as Effect];

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: qCooldown,
        cost: q.cost(),
        castTime: q.castTime(),
        // Restarted by each empowered attack and by Upheaval: it runs from the last of them.
        cooldownAfter: "empower",
        usable: (unit, world) => !impaling(unit, world),
        delivery: { kind: "self" },
        onSelf: [
          {
            type: "empower",
            attacks: boulderAttacks,
            window: boulderWindow,
            bonusRange: boulderRange,
            uncancellable: true,
            resetAttack: true,
            onHit: [{ type: "damage", damageType: "physical", amount: boulderHit, label: q.name }],
          },
        ],
      },
      {
        key: "Q2",
        name: q2.name,
        slot: "Q",
        cooldown: 0,
        castTime: q2.castTime(),
        chain: { root: "Q", index: 2, window: boulderWindow * boulderAttacks, delay: throwAfter },
        usable: (unit, world) => boulderUp(unit) && !inAttackRange(unit, world.units[other(unit.side)]),
        delivery: { kind: "line", range: throwRange, width: q2.field("width"), speed: q2.field("speed") },
        onHit: upheaval,
        flags: { projectile: q2.flag("projectile") ?? true },
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        moveWhileCasting: true,
        onCastStart: [{ type: "shield", amount: { base: 0, ratios: { maxHP: bastionShield } }, duration: bastionSeconds }],
        delivery: { kind: "area", near: -shockwaveRadius, far: shockwaveRadius, delay: shockwaveAfter, anchor: "caster" },
        onHit: [
          { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
          { type: "cc", cc: "slow", strength: w.quoted("slow them by 20% for 1 second", 0) / 100, duration: w.quoted("slow them by 20% for 1 second", 1) },
        ],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: eCooldown,
        cost: e.cost(),
        castTime: 0,
        cooldownAfter: "dash",
        interruptible: {},
        usable: (unit, world) => !impaling(unit, world),
        onCastStart: [
          { type: "state", state: "slowImmune", duration: chargeSeconds },
          { type: "state", state: "ghosted", duration: chargeSeconds },
        ],
        delivery: { kind: "dash", direction: "toward", distance: chargeReach, minDistance: 0, speed: chargeTop, hitRadius: 0, ramp: { amount: chargeAmount, every: chargeEvery, from: chargeFrom } },
        // The grab; how long it holds and the carry are in the hooks.
        onHit: [{ type: "cc", cc: "suppression", duration: carryShort }],
        roles: ["engage", "cc"],
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        delivery: { kind: "area", near: impaleRange[0] ?? -50, far: impaleRange[1] ?? 625, delay: 0, anchor: "caster" },
        onHit: [
          { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
          { type: "cc", cc: "suppression", duration: impaleSeconds },
          { type: "attach", offset: impaleOffset, duration: impaleSeconds },
        ],
        flags: { spellShield: r.flag("spellShield") ?? true },
      },
    ];

    const behavior: Behavior = (view) => {
      const { world, self, mode } = view;
      // Getting away: Ixtal's Impact charges away.
      const impact = self.spec.abilities.find((a) => a.key === "E");
      if (mode === "flee" && impact && !self.action && canCast(world, self, impact, true) && view.distance <= attackRange(view.enemy) + 300) {
        return { kind: "cast", ability: "E", aim: { direction: -1 } };
      }
      return defaultBehavior(view);
    };

    const endBoulder = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && s.key === "Q"));
      ctx.buff("boulder", "attackSpeed", 0, 0);
      ctx.memory.boulderCount = 0;
    };
    const endCharge = (ctx: HookContext) => {
      for (const s of ctx.self.statuses) if (s.kind === "state" && s.ability === "E" && (s.key === "slowImmune" || s.key === "ghosted")) s.endTick = Math.min(s.endTick, ctx.tick);
      delete ctx.memory.chargeStart;
    };
    const release = (ctx: HookContext) => {
      delete ctx.enemy.attached;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "cc" && s.key === "suppression" && s.source === ctx.self.side && s.ability === "E"));
      delete ctx.memory.carryFrom;
    };

    return {
      behavior,
      abilities,
      budget: {
        // Quaking while the stacks last, and the slam's share of maximum health once a Shattered Earth.
        damage: (self, target) => {
          const d = derive(self);
          const cycle = cooldownAfterHaste(qCooldown, d.abilityHaste) + boulderAttacks / Math.max(0.1, d.attackSpeed);
          return { magic: (quakeShare / quakeSeconds) * maxHp(target), physical: (slamShare * maxHp(target)) / cycle };
        },
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Quaking's ticks while the enemy has 3 stacks.
          if (quakesOf(self, ctx.world) >= quakeMax && ctx.tick >= Number(ctx.memory.quakeNext ?? Number.POSITIVE_INFINITY)) {
            ctx.memory.quakeNext = Number(ctx.memory.quakeNext) + ticks(quakeEvery);
            ctx.apply({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: (quakeShare * quakeEvery) / quakeSeconds } }, label: "Quaking" });
          }
          // Shattered Earth's attack speed goes with its last attack or its window.
          if (!boulderUp(self) && self.statuses.some((s) => s.memoKey === "buff:boulder")) endBoulder(ctx);
          // The charge ended without a grab.
          if (ctx.memory.chargeStart !== undefined && ctx.memory.carryFrom === undefined && !(self.action?.kind === "dash" && self.action.ability === "E")) endCharge(ctx);
          // Carrying the enemy: into the wall, or let go when the time is up.
          if (ctx.memory.carryFrom !== undefined) {
            const carried = Math.abs(ctx.enemy.x - Number(ctx.memory.carryFrom));
            const env = ctx.world.settings.environment;
            if (env.walls && carried >= env.wallDistance) {
              release(ctx);
              self.action = undefined;
              ctx.log("slams the enemy into the wall");
              ctx.apply({ type: "damage", damageType: "physical", amount: wallHit, label: `${e.name} (wall)` });
              ctx.apply({ type: "cc", cc: "stun", duration: wallStun });
              // Its cooldown, 35% shorter, starts now.
              delete self.cooldownHeld.E;
              self.cooldownReady.E = ctx.tick + ticks(cooldownAfterHaste(eCooldown, derive(self).abilityHaste) * (1 - wallRefund));
              endCharge(ctx);
            } else if (!(self.action?.kind === "dash" && self.action.ability === "E")) {
              release(ctx);
              endCharge(ctx);
            }
          }
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          if (action?.kind === "windup" && action.empowered?.includes("Q")) ctx.memory.boulderSwing = Number(ctx.memory.boulderCount ?? 0) + 1;
        },
        onAttackLaunch(ctx) {
          const swing = Number(ctx.memory.boulderSwing ?? 0);
          if (swing === 0) return;
          ctx.memory.boulderSwing = 0;
          ctx.memory.boulderCount = swing;
          ctx.memory.boulderLanding = swing;
          // Each empowered attack keeps the next 5 s open.
          const boulder = ctx.self.statuses.find((s) => s.kind === "empower" && s.key === "Q");
          if (boulder) boulder.endTick = ctx.tick + ticks(boulderWindow);
          if (swing >= boulderAttacks) ctx.buff("boulder", "attackSpeed", 0, 0);
          else ctx.buff("boulder", "attackSpeed", boulderSpeed, boulderWindow);
        },
        onAttackHit(ctx) {
          addQuake(ctx);
          // The third empowered attack slams the boulder.
          if (Number(ctx.memory.boulderLanding ?? 0) >= boulderAttacks) for (const effect of slamHit) ctx.apply(effect);
          ctx.memory.boulderLanding = 0;
        },
        onCastStart(ctx) {
          // Impale during Shattered Earth throws the boulder at once.
          if (ctx.ability?.key === "R" && boulderUp(ctx.self)) {
            if (Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= throwRange) {
              for (const effect of upheaval) ctx.apply(effect);
              addQuake(ctx);
            }
            endBoulder(ctx);
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory.boulderCount = 0;
            ctx.buff("boulder", "attackSpeed", boulderSpeed, boulderWindow);
          }
          if (key === "Q2") endBoulder(ctx);
          if (key === "E") ctx.memory.chargeStart = ctx.tick;
          if (key === "R") {
            ctx.memory.impaleUntil = ctx.tick + ticks(impaleSeconds);
            ctx.apply({ type: "state", state: "noAttacks", duration: impaleSeconds }, true);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q2" || key === "R") addQuake(ctx);
          if (key === "R") ctx.apply({ type: "stat", stat: "moveSpeedPercent", amount: { base: impaleSpeed }, duration: impaleSeconds }, true);
          if (key === "E") {
            // The grab holds if the suppression took: carried 200 units in front, faster, for the rest of the charge.
            const held = ctx.enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression" && s.source === ctx.self.side);
            if (!held) return;
            const since = (ctx.tick - Number(ctx.memory.chargeStart ?? ctx.tick)) / 30;
            const rest = since < earlyGrab ? carryLong : carryShort;
            ctx.apply({ type: "cc", cc: "suppression", duration: rest });
            ctx.apply({ type: "attach", offset: carryOffset, duration: rest });
            const ramp = Math.min(chargeTop, chargeFrom + chargeAmount * Math.floor((ctx.tick - Number(ctx.memory.chargeStart ?? ctx.tick)) / ticks(chargeEvery)));
            const speed = Math.max(carryMin, Math.min(carryMax, ramp + carryBonus));
            const dir = ctx.enemy.x >= ctx.self.x ? 1 : -1;
            ctx.self.action = { kind: "dash", ability: "E", startTick: ctx.tick, endTick: ctx.tick + ticks(rest), perTick: (dir * speed) / 30, stopAtContact: false, unstoppable: false };
            ctx.memory.carryFrom = ctx.enemy.x;
          }
        },
      },
    };
  },
};

export default skarner;
