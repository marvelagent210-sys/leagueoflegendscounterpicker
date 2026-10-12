/** Sion: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast, heldUntil, rampTicks } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { contactGap } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { hitChance } from "../../engine/sim/hitModel";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { type Unit, type World, other } from "../../engine/sim/state";
import { FOREVER, between, hasOwn, innateStat, maxHp, scaled, seriesAt, ticks } from "./util";

const FRENZY = "Glory in Death";

const sion: KitModule = {
  champion: "Sion",
  options: {
    soulFurnaceHealth: { label: "Soul Furnace bonus health by level 20 (4 per kill, 15 per large kill or champion takedown)", default: 1000 },
  },
  build(kit, options) {
    const glory = kit.ability("Glory in Death");
    const surge = kit.ability("Death Surge");
    const q = kit.ability("Decimating Smash");
    const w = kit.ability("Soul Furnace");
    const e = kit.ability("Roar of the Slayer");
    const r = kit.ability("Unstoppable Onslaught");

    // Glory in Death: fatal damage puts him in stasis, then he rises with full health that drains faster and faster.
    const reanimating = glory.quoted("Upon taking fatal damage, Sion enters stasis for 1.5 seconds to reanimate into a frenzy", 0);
    const restored = glory.quoted("restoring 100% of his maximum health", 0) / 100;
    const drain = glory.levelValue("losing 2 – 19 (based on level) health every 0.264");
    const draining = "health every 0.264, increasing by 70% of the base value per subsequent tick";
    const drainEvery = glory.quoted(draining, 0);
    const drainGrowth = glory.quoted(draining, 1) / 100;
    const frenzySpeed = glory.quoted("1.75 attack speed minimum and maximum", 0);
    const frenzyLifeSteal = glory.quoted("100% life steal", 0) / 100;
    const frenzyOnHit = glory.quoted("Basic attacks deal bonus physical damage on-hit equal to 10% of the target's maximum health", 0) / 100;
    glory.quote("Ghosting");
    glory.quote("One cast of Death Surge, which replaces all of his abilities");
    glory.quote("The bonus on-hit damage granted by Glory in Death is unaffected by life steal");
    glory.quote("The fixed attack speed is achieved by lowering and increasing the maximum and minimum attack speed to 1.75, respectively");
    kit.assume(
      "Glory in Death counts as Sion's death: if he then kills the enemy, both have died. The frenzy fights on to the end, its health draining from 0.264 s after it rises.",
    );

    // Death Surge: the frenzy's only ability, a burst of speed that decays.
    const surging = "Sion gains 67% bonus movement speed that decays over 2.376 seconds";
    const surgeSpeed = surge.quoted(surging, 0) / 100;
    const surgeSeconds = surge.quoted(surging, 1);
    const surgeCooldown = surge.cooldown();
    kit.assume(`Death Surge's ${surgeSpeed * 100}% movement speed decays evenly to nothing over ${surgeSeconds} s.`);

    // Decimating Smash: a charge of up to 2 s; from 1 s on it knocks up and stuns, and everything grows every 0.25 s.
    const ranges = q.fieldNumbers("range");
    const tapRange = ranges[0] ?? 500;
    const chargedRange = ranges.at(-1) ?? 850;
    const charging = "charging for up to 2 seconds to increase Decimating Smash's range over an area, knock up duration, stun duration, and damage every 0.25 seconds";
    const fullCharge = q.quoted(charging, 0);
    const chargeStep = q.quoted(charging, 1);
    const chargedAfter = q.quoted("If Decimating Smash was charged for at least 1 second", 0);
    const knockUps = q.seriesIn("If Decimating Smash was charged for at least 1 second", 0);
    const stuns = q.seriesIn("If Decimating Smash was charged for at least 1 second", 1);
    const tapSlow = q.quoted("slowing them by 50% for 0.25 seconds", 0) / 100;
    const tapSlowFor = q.quoted("slowing them by 50% for 0.25 seconds", 1);
    const brokenCooldown = q.quoted("If the charge is interrupted, Decimating Smash is placed on a 2-second cooldown", 0);
    const releaseLock = q.quoted("Sion himself remains locked out of all actions for 0.25 seconds when releasing Decimating Smash", 0);
    q.quote("Displacement immunity will also resist the application of the stun");
    const smashMin = q.formula("Minimum Physical Damage");
    const smashMax = q.formula("Maximum Physical Damage");
    const smashAt = (seconds: number) => between(smashMin, smashMax, (Math.floor(seconds / chargeStep + 1e-9) * chargeStep) / fullCharge);
    const qCooldown = q.cooldown();
    const qCost = q.cost();
    kit.assume(
      `Decimating Smash is tapped, charged ${chargedAfter} s or charged the full ${fullCharge} s: the longest the enemy can't walk out of (its center past ${chargedRange} units, after reacting), the full charge only on an enemy held or slowed; never while getting away.`,
    );

    // Soul Furnace: a shield; after 3 s, or when it ends unbroken, it bursts.
    const shieldSeconds = w.quoted("Sion grants himself a shield that lasts for up to 6 seconds", 0);
    const burstAfter = w.quoted("Soul Furnace can be recast after 3 seconds while the shield holds", 0);
    w.quote("does so automatically at the end of the duration");
    w.quote("The cooldown of Soul Furnace begins once the shield is removed");
    w.quote("Soul Furnace also automatically detonates if Sion is killed without the shield being destroyed");
    w.quote("Both of Soul Furnace's casts can be activated during Sion's other abilities");
    w.quote("Sion gains 4 bonus health whenever he kills an enemy, increased to 15 for large enemies and takedowns against enemy champions");
    const furnaceRadius = w.field("effectRadius");
    const burst: Effect = { type: "damage", damageType: "magic", amount: w.formula("Magic Damage"), label: `${w.name} (burst)` };

    // Roar of the Slayer: slows and shreds armor.
    const roaring = "inflicts them with 25% armor reduction for 4 seconds";
    const shred = e.quoted(roaring, 0) / 100;
    const shredFor = e.quoted(roaring, 1);
    const roarSlowFor = e.quoted("slows them for 2.5 seconds", 0);

    // Unstoppable Onslaught: a charge that speeds up; the slam's damage and stun grow with its time, up to 3 s.
    const chargeSeconds = r.quoted("charges forward in the direction of the cursor for up to 8 seconds", 0);
    const ramping = "The charge ramps up Sion's movement speed at the time of cast by 40 movement speed every 0.1 seconds, up to 950 total movement speed";
    const rampAmount = r.quoted(ramping, 0);
    const rampEvery = r.quoted(ramping, 1);
    const topSpeed = r.quoted(ramping, 2);
    const leaping = "Sion leaps forward 300 units, landing after 0.55 seconds";
    const leapDistance = r.quoted(leaping, 0);
    const leapTime = r.quoted(leaping, 1);
    const startDelay = r.tipped("brief delay");
    const slamRadius = r.tipped("ground");
    const collision = r.tipped("colliding");
    const pullRadius = r.tipped("smaller radius");
    const slamMin = r.formula("Minimum Physical Damage");
    const slamMax = r.formula("Maximum Physical Damage");
    const growth = r.seriesIn("The base damage increases by", 0);
    const growthCap = growth.kind === "variable" ? Math.max(...growth.points.map(Number)) : 3;
    const slamAt = (seconds: number) => between(slamMin, slamMax, Math.min(seconds, growthCap) / growthCap);
    const slamStuns = r.seriesIn("become stunned after a brief delay for", 0);
    const pullFor = r.quoted("pulled towards Sion over 0.5 seconds", 0);
    const slamSlowFor = r.quoted("are slowed for 3 seconds", 0);
    r.quote("Removing the airborne before 0.5 seconds will not prevent the stun from being applied");
    r.quote("Displacement immunity will also resist the application of the stun");
    r.quote("An enemy can only be affected by Unstoppable Onslaught once every 1 second");
    // A sidestepped charge still meets the recast's slam, which lands this much later than the charge would have.
    const slamLater = leapTime - leapDistance / topSpeed;
    const rCooldown = r.cooldown();
    // Immune from the cast until the slam at the latest (cut short by the hooks).
    const chargeLasts = Math.round((startDelay + chargeSeconds + leapTime) * 1000) / 1000;
    const baseSpeed = kit.champion.forms[0]?.stats.moveSpeed ?? 345;
    let chargeReach = 0;
    for (let k = 1; k <= ticks(chargeSeconds); k++) chargeReach += Math.min(topSpeed, baseSpeed + rampAmount * Math.floor(k / ticks(rampEvery))) / 30;
    chargeReach = Math.round(chargeReach);
    kit.assume(
      `Unstoppable Onslaught can be sidestepped; Sion then recasts it, and its slam (${slamRadius} radius) still lands unless the enemy got that far aside, ${Math.round(slamLater * 100) / 100} s after the charge would have hit. Pull and stun reach ${pullRadius} units, so the collision gets them. In fights he charges only when it lands at least half the time; getting away, he charges away.`,
    );

    const locked = (unit: Unit, world: World) => world.tick < Number(unit.memory.lockedUntil ?? -1);
    // How long the enemy needs to get its center out of a charged smash: reacting (or held), then walking.
    const escapeSeconds = (unit: Unit, world: World) => {
      const enemy = world.units[other(unit.side)];
      const held = Math.max(0, heldUntil(enemy) - world.tick) / 30;
      const speed = derive(enemy).moveSpeed;
      const left = Math.max(0, chargedRange - Math.abs(enemy.x - unit.x));
      return Math.max(held, world.settings.reactionTime) + (speed > 0 ? left / speed : Number.POSITIVE_INFINITY);
    };
    const fighting = (unit: Unit, world: World) => world.modes[unit.side] !== "flee";
    // Held in place or slowed: the full charge is worth the wait.
    const impaired = (unit: Unit, world: World) => {
      const enemy = world.units[other(unit.side)];
      return heldUntil(enemy) > world.tick || enemy.statuses.some((s) => s.kind === "cc" && s.key === "slow");
    };
    // The chance the charge lands, as the engine will judge it.
    const chargeLands = (unit: Unit, world: World) => {
      const enemy = world.units[other(unit.side)];
      const ramp = { from: Math.min(topSpeed, derive(unit).moveSpeed), amount: rampAmount, everyTicks: Math.max(1, ticks(rampEvery)), max: topSpeed };
      const timeToLand = (ticks(startDelay) + rampTicks(Math.max(0, contactGap(unit, enemy)), ramp)) / 30 + slamLater;
      const held = heldUntil(enemy);
      return hitChance(
        { timeToLand, reach: slamRadius },
        { radius: enemy.spec.base.radius, moveSpeed: derive(enemy).moveSpeed, heldInPlace: held >= world.tick + Math.round(timeToLand * 30), heldFor: Math.max(0, held - world.tick) / 30, hasEscape: false },
        world.settings.reactionTime,
        world.settings.hitSpread,
      );
    };

    const smash = (key: string, seconds: number, usable: (unit: Unit, world: World) => boolean): AbilitySpec => {
      const charged = seconds >= chargedAfter;
      return {
        key,
        name: seconds === 0 ? q.name : `${q.name} (charged ${seconds} s)`,
        slot: "Q",
        cooldownKey: "Q",
        cooldown: qCooldown,
        cost: qCost,
        castTime: seconds,
        interruptible: { cooldown: brokenCooldown },
        usable,
        delivery: { kind: "area", near: 0, far: charged ? chargedRange : tapRange, delay: 0, anchor: "caster", centered: true },
        // The stun, which displacement immunity also stops, is in the hooks.
        onHit: charged
          ? [
              { type: "damage", damageType: "physical", amount: smashAt(seconds) },
              { type: "displace", direction: "away", distance: 0, duration: seriesAt(knockUps, seconds, false) },
            ]
          : [
              { type: "damage", damageType: "physical", amount: smashAt(seconds) },
              { type: "cc", cc: "slow", strength: tapSlow, duration: tapSlowFor },
            ],
        flags: { spellShield: q.flag("spellShield") ?? true },
      };
    };

    const main: AbilitySpec[] = [
      smash("Q", 0, (unit, world) => fighting(unit, world) && escapeSeconds(unit, world) <= chargedAfter),
      smash("Qcharged", chargedAfter, (unit, world) => fighting(unit, world) && escapeSeconds(unit, world) > chargedAfter && !(impaired(unit, world) && escapeSeconds(unit, world) > fullCharge)),
      smash("Qfull", fullCharge, (unit, world) => fighting(unit, world) && impaired(unit, world) && escapeSeconds(unit, world) > fullCharge),
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: 0,
        overlay: true,
        // The cooldown waits for the shield to go (the lingering state, ended by the hooks).
        cooldownAfter: "state",
        delivery: { kind: "self" },
        onSelf: [
          { type: "shield", amount: w.formula("Shield Strength"), duration: shieldSeconds },
          { type: "state", state: "lingering", duration: shieldSeconds },
        ],
      },
      {
        key: "W2",
        name: `${w.name} (burst)`,
        slot: "W",
        cooldown: 0,
        castTime: 0,
        overlay: true,
        chain: { root: "W", index: 2, window: shieldSeconds, delay: burstAfter, auto: true },
        usable: (unit) => hasOwn(unit, "shield", "W"),
        delivery: { kind: "aura", radius: furnaceRadius },
        onHit: [burst],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "line", range: e.field("range", "Roar missile range"), width: e.field("width"), speed: e.field("speed") },
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
          { type: "cc", cc: "slow", strength: e.fraction("Slow"), duration: roarSlowFor },
          { type: "stat", stat: "armorReductionPercent", amount: { base: shred }, duration: shredFor },
        ],
        flags: { projectile: e.flag("projectile") ?? true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: rCooldown,
        cost: r.cost(),
        // The brief delay before the charge.
        castTime: startDelay,
        cooldownAfter: "dash",
        usable: (unit, world) => !fighting(unit, world) || chargeLands(unit, world) >= 0.5,
        onCastStart: [
          { type: "state", state: "ccImmune", duration: chargeLasts },
          { type: "state", state: "ghosted", duration: chargeLasts },
        ],
        delivery: {
          kind: "dash",
          direction: "toward",
          distance: chargeReach,
          minDistance: 0,
          speed: topSpeed,
          hitRadius: collision,
          ramp: { amount: rampAmount, every: rampEvery },
          sidestep: { reach: slamRadius, later: slamLater },
        },
        // The damage and the stun grow with the charge's time: in the hooks.
        onHit: [
          { type: "displace", direction: "toward", distance: 0, duration: pullFor },
          { type: "cc", cc: "slow", strength: r.fraction("Slow"), duration: slamSlowFor },
        ],
        decisive: true,
        estimate: (caster, target) => evaluate(slamMin, caster, target),
        roles: ["engage", "cc", "damage"],
      },
    ];
    const gated = main.map((a): AbilitySpec => (a.key === "W" || a.key === "W2" ? a : { ...a, usable: (unit, world) => !locked(unit, world) && (a.usable?.(unit, world) ?? true) }));

    const frenzyAbilities: AbilitySpec[] = [
      {
        key: "Surge",
        name: surge.name,
        slot: "I",
        cooldown: surgeCooldown,
        castTime: 0,
        delivery: { kind: "self" },
        // The decaying speed is in the hooks.
        onSelf: [{ type: "state", state: "lingering", duration: surgeSeconds }],
      },
    ];

    const behavior: Behavior = (view) => {
      const { world, self, mode } = view;
      // Locked out after releasing Decimating Smash.
      if (locked(self, world)) return { kind: "move", direction: 0 };
      // Getting away: Unstoppable Onslaught charges away from the enemy.
      const charge = self.spec.abilities.find((a) => a.key === "R");
      if (mode === "flee" && charge && !self.action && canCast(world, self, charge, true)) return { kind: "cast", ability: "R", aim: { direction: -1 } };
      return defaultBehavior(view);
    };
    // The frenzy only fights: Death Surge to catch up.
    const frenzy: Behavior = (view) => {
      const { world, self } = view;
      const dash = self.spec.abilities.find((a) => a.key === "Surge");
      if (dash && !self.action && canCast(world, self, dash) && view.distance > attackRange(self)) return { kind: "cast", ability: "Surge" };
      return defaultBehavior({ ...view, mode: "fight" });
    };

    const burstNow = (ctx: HookContext) => {
      if (Math.abs(ctx.enemy.x - ctx.self.x) <= furnaceRadius) ctx.apply(burst);
    };
    const endShield = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !((s.kind === "shield" || (s.kind === "state" && s.key === "lingering")) && (s.key === "W" || s.ability === "W")));
    };
    const endCharge = (ctx: HookContext, at: number) => {
      for (const s of ctx.self.statuses) if (s.kind === "state" && s.ability === "R" && (s.key === "ccImmune" || s.key === "ghosted")) s.endTick = Math.min(s.endTick, at);
      delete ctx.memory.chargeStart;
    };

    return {
      behavior,
      abilities: gated,
      forms: {
        [FRENZY]: {
          base: { attackSpeed: { base: frenzySpeed, ratio: 0, bonus: 0 } },
          attack: { onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: frenzyOnHit } }, label: FRENZY, noLifeSteal: true }] },
          abilities: frenzyAbilities,
          behavior: frenzy,
        },
      },
      start: [innateStat("health", options.soulFurnaceHealth ?? 0)],
      budget: {
        // Unstoppable Onslaught's slam, at its least.
        damage: (self, target) => ({ physical: evaluate(slamMin, self, target) / rCooldown }),
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Rising from the stasis: full health, the frenzy, and the drain.
          if (ctx.tick === Number(ctx.memory.risesAt ?? -1)) {
            ctx.transform(FRENZY, restored * maxHp(self));
            self.hp = restored * maxHp(self);
            ctx.apply({ type: "state", state: "noHealing", duration: FOREVER }, true);
            ctx.apply({ type: "state", state: "ghosted", duration: FOREVER }, true);
            ctx.apply({ type: "stat", stat: "lifeSteal", amount: { base: frenzyLifeSteal }, duration: FOREVER }, true);
            ctx.memory.drained = 0;
          }
          if (self.spec.form === FRENZY && ctx.tick > Number(ctx.memory.risesAt ?? 0)) {
            const done = Number(ctx.memory.drained ?? 0);
            if (ctx.tick >= Number(ctx.memory.risesAt) + Math.round((done + 1) * drainEvery * 30)) {
              self.hp -= drain * (1 + drainGrowth * done);
              ctx.memory.drained = done + 1;
            }
          }
          // Death Surge's speed decays.
          const since = (ctx.tick - Number(ctx.memory.surgeStart ?? -1)) / 30;
          if (ctx.memory.surgeStart !== undefined && since <= surgeSeconds) ctx.buff("surge", "moveSpeedPercent", surgeSpeed * (1 - since / surgeSeconds), surgeSeconds - since);
          // Soul Furnace's shield broke: no burst, and the cooldown starts.
          if (self.statuses.some((s) => s.kind === "state" && s.key === "lingering" && s.ability === "W") && !hasOwn(self, "shield", "W")) {
            endShield(ctx);
            delete self.chains.W;
          }
          // A charge that ended without hitting: the recast's leap, then the slam.
          if (ctx.memory.chargeStart !== undefined && !(self.action?.kind === "dash" && self.action.ability === "R")) endCharge(ctx, ctx.tick + ticks(leapTime));
        },
        onLethal(ctx) {
          // The frenzy's death is final.
          if (ctx.self.spec.form === FRENZY || ctx.memory.risesAt !== undefined) return false;
          if (hasOwn(ctx.self, "shield", "W")) burstNow(ctx);
          delete ctx.self.chains.W;
          // Death clears everything but his innates; stasis while he reanimates.
          ctx.self.statuses = ctx.self.statuses.filter((s) => s.source === ctx.self.side && s.endTick === FOREVER && s.kind === "stat");
          ctx.self.statuses.push({ kind: "cc", key: "stasis", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(reanimating), value: 0 });
          ctx.self.action = undefined;
          ctx.self.move = 0;
          ctx.self.hp = 1;
          ctx.self.fallen = true;
          ctx.memory.risesAt = ctx.tick + ticks(reanimating);
          delete ctx.memory.chargeStart;
          ctx.log("dies: Glory in Death");
          return true;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key.startsWith("Q")) {
            // Locked out as the smash comes down.
            ctx.memory.lockedUntil = ctx.tick + ticks(releaseLock);
            ctx.apply({ type: "state", state: "noAttacks", duration: releaseLock }, true);
          }
          if (key === "W2") endShield(ctx);
          if (key === "R") ctx.memory.chargeStart = ctx.tick;
          if (key === "Surge") ctx.memory.surgeStart = ctx.tick;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          const stunnable = !hasState(ctx.enemy, "displacementImmune");
          if ((key === "Qcharged" || key === "Qfull") && stunnable) ctx.apply({ type: "cc", cc: "stun", duration: seriesAt(stuns, ctx.ability.castTime, false) });
          if (key === "R") {
            const seconds = (ctx.tick - Number(ctx.memory.chargeStart ?? ctx.tick)) / 30;
            ctx.apply({ type: "damage", damageType: "physical", amount: scaled(slamAt(seconds), ctx.scale), label: r.name });
            if (stunnable) ctx.apply({ type: "delayed", delay: pullFor, effects: [{ type: "cc", cc: "stun", duration: seriesAt(slamStuns, seconds, true) }] });
            // The collision ends the charge with the slam.
            endCharge(ctx, ctx.tick);
          }
        },
      },
    };
  },
};

export default sion;
