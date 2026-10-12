/** Kled: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { inStasis } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { TOP_LANE_MAX_LEVEL, statAtLevel } from "../../engine/stats";
import { FOREVER, attackDamage, extraAttacks, scaled, seriesAt, ticks } from "./util";

const MOUNTED = "Kled & Skaarl";
const DISMOUNTED = "Kled";

const kled: KitModule = {
  champion: "Kled",
  build(kit) {
    const dismounted = kit.ability("Dismounted Skaarl the Cowardly Lizard");
    const skaarl = kit.ability("Skaarl the Cowardly Lizard");
    const trap = kit.ability("Bear Trap on a Rope");
    const pistol = kit.ability("Pocket Pistol");
    const tendencies = kit.ability("Violent Tendencies");
    const joust = kit.ability("Jousting");
    const charge = kit.ability("Chaaaaaaaarge!!!");

    // Two lives: Skaarl takes every hit until she flees, then Kled fights on with his own health.
    // The unit's health is both together; percentage health effects see their combined maximum.
    const kledMax = dismounted.levelValue("Kled has 410 – 1838 (based on level) base health");
    const skaarlBase = skaarl.levelValue("who has 400 – 1400 (based on level) base health");
    skaarl.quote("additional sources of health are applied to Skaarl maximum health");
    skaarl.quote("with all damage in excess of Skaarl health being ignored");
    skaarl.quote("While Mounted, healing and health regeneration will first replenish Skaarl health and will only apply to Kled's health while Skaarl is at full health");
    dismounted.quote("Effects based on percentage health consider Kled and Skaarl combined maximum health, meaning that a Dismounted Kled is never considered to be at full health");
    dismounted.quote("The current status of Kled's own health is preserved between subsequent dismounts");
    const mountedForm = kit.champion.forms.find((f) => f.name === MOUNTED);
    if (!mountedForm) throw new Error(`Kled kit: no "${MOUNTED}" form`);
    const bothBase = statAtLevel(mountedForm.stats.hp, TOP_LANE_MAX_LEVEL);
    if (Math.abs(bothBase - kledMax - skaarlBase) > 0.5) throw new Error(`Kled kit: ${MOUNTED}'s ${bothBase} health is not Kled's ${kledMax} and Skaarl's ${skaarlBase}`);

    // Skaarl flees: Kled lunges back, cleansed, untargetable and immune to crowd control for 0.5 s.
    const fleeSeconds = skaarl.quoted("untargetable, and immune to crowd control for 0.5 seconds", 0);
    const lunge = skaarl.quoted("lunge range: 200", 0);
    skaarl.quote("Dismounting resets the cooldown and charges of Pocket Pistol");
    dismounted.quote("Kled is only vulnerable to death while Dismounted");
    kit.assume(`Kled lunges ${lunge} units away from the enemy over the ${fleeSeconds} s he can't act (toward his Nexus, which the duel's line puts behind him).`);

    // Dismounted: 165 more movement speed toward the enemy, full damage at level 20, a few resistances.
    const chasing = "bonus movement speed while facing and after attacking nearby visible enemy champions";
    const chaseSpeed = dismounted.levelValue(chasing);
    if (dismounted.levelValue(chasing, 1) !== 100) throw new Error("Kled kit: Dismounted attacks no longer deal full damage at level 20");
    const chaseAfter = dismounted.quoted("After completing a basic attack against a champion, the bonus movement speed buff is granted for 1.5 seconds regardless of his facing direction", 0);
    const [chaseRadius = 1200, guardRadius = 1400] = dismounted.fieldNumbers("effectRadius");
    const guarding = "equal to 4 (+ 1% of bonus health), increased by 30% for each nearby visible enemy champion, up to a maximum of 10 (+ 2.5% bonus health)";
    const guardBase = dismounted.quoted(guarding, 0);
    const guardHealth = dismounted.quoted(guarding, 1) / 100;
    const guardPerEnemy = dismounted.quoted(guarding, 2) / 100;
    kit.assume(`Dismounted, Kled has his ${chaseSpeed} movement speed unless he walks away from the enemy without having attacked in the last ${chaseAfter} s; his resistances count the enemy within ${guardRadius} units, his speed within ${chaseRadius}.`);

    // Courage: 15 an attack on a champion, 5 a pellet; at 100 Skaarl comes back with 70% of her health.
    const courageMax = dismounted.quoted("Upon reaching 100 Courage", 0);
    const perAttack = dismounted.quoted("Kled gains 15 Courage after completing a basic attack against a champion", 0);
    const remountShare = dismounted.levelValue("Skaarl instantly restores") / 100;
    const reunite = dismounted.quoted("reunites with Kled over 0.25 seconds", 0);
    const mountLock = dismounted.quoted("become unable to declare basic attacks or cast their abilities for 0.25 seconds", 0);
    const frayed = dismounted.quoted("which prevents Kled from gaining Courage for 30 seconds", 0);
    dismounted.quote("Mounting up resets the cooldowns of Bear Trap on a Rope and Jousting");
    kit.assume("Kled is dismounted with no Courage, as he would be after mounting up again.");

    // Bear Trap on a Rope: the tether shrinks from 800 to 625 units over 1.75 s; held, it pulls.
    const [trapRange = 800] = trap.fieldValues("range");
    const tetherSeconds = trap.quoted("forming a tether between Kled and the target for 1.75 seconds", 0);
    const tetherRadii = trap.fieldNumbers("tetherRadius");
    const tetherStep = tetherSeconds / Math.max(1, tetherRadii.length - 1);
    const tetherGrace = trap.quoted("The tether cannot be broken within the first 0.25 seconds of its application", 0);
    const pull = trap.quoted("Kled pulls the target 150 units toward him", 0);
    const pullHit = trap.formula("Physical Damage", 1);
    const pullSlow = trap.fraction("Slow");
    const pullSlowSeconds = trap.quoted("slows them for 2.5 seconds", 0);
    const pullSeconds = 0.25;
    trap.quote("Bear Trap on a Rope will not pull the target if they are in stasis");
    kit.assume(`Bear Trap on a Rope's pull takes ${pullSeconds} s (the wiki gives no speed); the tether's radius is measured between centers, and the enemy doesn't walk away to break it.`);

    // Pocket Pistol: five pellets 5° apart, the first for full damage and the rest for 20%; 300 units of recoil.
    const [pistolRange = 700] = pistol.fieldValues("range");
    const pelletWidth = pistol.field("width");
    const [pelletSpeed = 3000, recoilSpeed = 1025] = pistol.fieldValues("speed");
    const recoil = pistol.quoted("recoiling 300 units in the opposite direction", 0);
    const pistolCharges = pistol.quoted("up to a maximum of 2", 0);
    const perPellet = pistol.quoted("by 5 and 2.5 respectively, for up to a total restore of 25 against champions", 0);
    const pelletHit = pistol.formula("Reduced Damage");
    const spread = pistol.fieldValues("angle")[0] ?? 20;
    // Pellets at -10°, -5°, 0°, 5° and 10°.
    const pelletAngles = [-1, -0.5, 0, 0.5, 1].map((f) => ((f * spread) / 2) * (Math.PI / 180));
    pistol.quote("Pocket Pistol can be cast while grounded or rooted but Kled will not dash backwards");
    kit.assume("Pocket Pistol's pellets hit the enemy where it stands when they fly: all five near it, the middle three farther out.");

    // Violent Tendencies: 150% attack speed for 4 s or 4 attacks, the 4th hitting harder; attacks on champions cut its cooldown by 1.5 s.
    const vtCooldown = tendencies.cooldown();
    const frenzy = "Kled gains 150% bonus attack speed for 4 seconds, or until he has completed 4 attacks";
    const vtSpeed = tendencies.quoted(frenzy, 0) / 100;
    const vtSeconds = tendencies.quoted(frenzy, 1);
    const vtAttacks = tendencies.quoted(frenzy, 2);
    const vtHit = tendencies.formula("Additional Physical Damage");
    const vtRefund = tendencies.quoted("reduced by 0.5 seconds on-hit, increased to 1.5 against champions", 1);
    tendencies.quote("which starts expiring upon his next basic attack");
    tendencies.quote("The fourth attack is empowered to deal additional physical damage");

    // Jousting: through the enemy and 350 units on, marking it; the recast after 0.5 s goes through it again and 200 on.
    const [joustRange = 550, markRange = 765] = joust.fieldValues("targetRange");
    const [joustSpeed = 600, joustSpeedShare = 100] = joust.fieldNumbers("speed");
    const passThrough = joust.quoted("Skaarl dashes a fixed 350 units through them, marking them for 3 seconds", 0);
    const markSeconds = joust.quoted("Skaarl dashes a fixed 350 units through them, marking them for 3 seconds", 1);
    const joustHaste = joust.quoted("the duo gain 50% bonus movement speed for 1 second", 0) / 100;
    const joustHasteSeconds = joust.quoted("the duo gain 50% bonus movement speed for 1 second", 1);
    const recastAfter = joust.quoted("Jousting can be recast after 0.5 seconds of the first dash ending", 0);
    const recastPast = joust.quoted("then Dash another 200 units", 0);
    const joustHit = joust.formula("Physical Damage");
    const moveSpeed = mountedForm.stats.moveSpeed;
    const dashSpeed = joustSpeed + (joustSpeedShare / 100) * moveSpeed;
    kit.assume(`Jousting dashes at ${joustSpeed} plus Kled & Skaarl's base movement speed (${dashSpeed}).`);

    // Chaaaaaaaarge!!!: speeding up to 950 over 3 s, then a dash at 1000 from 500 units; more damage the longer the charge.
    const ranges = charge.fieldNumbers("targetRange");
    const chargeRange = ranges.at(-1) ?? 4500;
    const [lockSpeed = 1000, knockSpeed = 600] = charge.fieldValues("speed");
    const lockRange = charge.quoted("search range: 500", 0);
    const chargeTop = charge.quoted("up to 950 total movement speed over 3 seconds", 0);
    const rampEvery = 0.25;
    const rampSteps = charge.quoted("During the charge the duo gain (950−(starting movement speed)) ÷ 12 × (time ÷ 0.25) bonus movement speed", 1);
    const knock = charge.quoted("knock them back 150 units", 0);
    const chargeLeast = charge.formula("Minimum Magic Damage");
    const chargeSeries = charge.seriesIn("(based on charge time)");
    const shieldFirst = charge.formula("Initial Shield");
    const shieldStep = charge.formula("Shield Per Instance");
    const shieldEvery = charge.quoted("plus an additional amount for every 0.25 seconds of traveling, up to a cap at 2 seconds", 0);
    const shieldCap = charge.quoted("plus an additional amount for every 0.25 seconds of traveling, up to a cap at 2 seconds", 1);
    const shieldLasts = charge.quoted("The shield lasts for 2 seconds upon finishing the charge", 0);
    const shieldSteps = Math.round(shieldCap / shieldEvery);
    charge.quote("The damage dealt is based on time spent traveling before the beginning of the dash");
    charge.quote("The charge is interrupted instantly if Kled dismounts during it");
    kit.assume(
      `Chaaaaaaaarge!!! speeds up from Kled & Skaarl's base movement speed by a twelfth of the way to ${chargeTop} every ${rampEvery} s, and its damage grows with the charge as the wiki's series says (full after 4 s; the game files say 3).`,
    );

    const mounted = (unit: Unit) => unit.spec.form !== DISMOUNTED;
    const bonusHealth = (unit: Unit) => derive(unit).maxHp - unit.spec.base.hp;
    const skaarlMax = (unit: Unit) => derive(unit).maxHp - kledMax;
    const selfLock = (ctx: HookContext, cc: string, seconds: number) => {
      ctx.self.statuses = [...ctx.self.statuses, { kind: "cc", key: cc, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(seconds), value: 0 }];
    };

    // Skaarl's health is gone: the rest of the hit is ignored, and Kled fights on alone.
    const dismount = (ctx: HookContext) => {
      const self = ctx.self;
      self.action = undefined;
      self.move = 0;
      delete self.attached;
      delete self.chains.E;
      ctx.transform(DISMOUNTED, Number(ctx.memory.kled ?? kledMax));
      ctx.log("Skaarl flees");
      ctx.memory.courage = 0;
      delete ctx.memory.remountAt;
      ctx.apply({ type: "cleanse", sticky: true }, true);
      ctx.apply({ type: "state", state: "untargetable", duration: fleeSeconds }, true);
      ctx.apply({ type: "state", state: "ccImmune", duration: fleeSeconds }, true);
      // Healing stops at Kled's own maximum, a share of the pair's.
      ctx.apply({ type: "state", state: "healthCap", duration: FOREVER, value: kledMax / derive(self).maxHp }, true);
      selfLock(ctx, "stun", fleeSeconds);
      self.forced = { endTick: ctx.tick + ticks(fleeSeconds), perTick: lunge / ticks(fleeSeconds) };
      // Pocket Pistol: both charges, at once.
      delete self.charges.QD;
      self.cooldownReady.QD = ctx.tick;
    };
    // Courage full: Skaarl is back with 70% of her health, the trap and the joust ready again.
    const remount = (ctx: HookContext) => {
      const self = ctx.self;
      const own = Math.min(kledMax, self.hp);
      ctx.memory.kled = own;
      self.statuses = self.statuses.filter((s) => !(s.kind === "state" && s.key === "healthCap" && s.source === self.side));
      ctx.transform(MOUNTED, own + remountShare * skaarlMax(self));
      for (const key of ["chase", "guardArmor", "guardMR"]) ctx.buff(key, key === "chase" ? "moveSpeedFlat" : key === "guardArmor" ? "armor" : "MR", 0, 0);
      ctx.memory.courage = 0;
      ctx.memory.frayedUntil = ctx.tick + ticks(frayed);
      delete ctx.memory.remountAt;
      selfLock(ctx, "disarm", mountLock);
      selfLock(ctx, "silence", mountLock);
      self.cooldownReady.Q = ctx.tick;
      self.cooldownReady.E = ctx.tick;
      delete self.cooldownHeld.E;
    };
    const addCourage = (ctx: HookContext, amount: number) => {
      if (mounted(ctx.self) || ctx.tick < Number(ctx.memory.frayedUntil ?? -1) || ctx.memory.remountAt !== undefined) return;
      ctx.memory.courage = Math.min(courageMax, Number(ctx.memory.courage ?? 0) + amount);
      if (Number(ctx.memory.courage) >= courageMax) ctx.memory.remountAt = ctx.tick + ticks(reunite);
    };
    // Violent Tendencies ends: its cooldown starts (post-effect).
    const endFrenzy = (ctx: HookContext) => {
      delete ctx.memory.vtUntil;
      delete ctx.memory.vtCount;
      ctx.buff("vt", "attackSpeed", 0, 0);
      ctx.memory.vtReady = ctx.tick + ticks(cooldownAfterHaste(vtCooldown, derive(ctx.self).abilityHaste));
    };
    // The charge is over (it hit, or Skaarl fled): the shield lasts 2 s more, the immunity ends.
    const endCharge = (ctx: HookContext) => {
      delete ctx.memory.charging;
      const shield = ctx.self.statuses.find((s) => s.kind === "shield" && s.key === "R" && s.source === ctx.self.side);
      if (shield) shield.endTick = ctx.tick + ticks(shieldLasts);
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "ccImmune" && s.ability === "R"));
    };

    const markOf = (unit: Unit) => unit.statuses.find((s) => s.kind === "mark" && s.key === "joust");
    const edgeGap = (self: Unit, enemy: Unit) => Math.abs(enemy.x - self.x) - self.spec.base.radius - enemy.spec.base.radius;

    const mountedAbilities: AbilitySpec[] = [
      {
        key: "Q",
        name: trap.name,
        slot: "Q",
        cooldown: trap.cooldown(),
        castTime: trap.castTime(),
        delivery: { kind: "line", range: trapRange, width: trap.field("width"), speed: trap.field("speed") },
        onHit: [
          { type: "damage", damageType: "physical", amount: trap.formula("Physical Damage") },
          { type: "mark", key: "trap", duration: tetherSeconds },
        ],
        overlay: true,
        flags: { projectile: trap.flag("projectile") ?? true },
      },
      {
        key: "E",
        name: joust.name,
        slot: "E",
        cooldown: joust.cooldown(),
        castTime: joust.castTime(),
        cooldownAfter: "dash",
        chainCooldown: "first",
        // Aimed through the enemy (the behavior), when Skaarl can reach it.
        delivery: { kind: "dash", direction: "toward", distance: joustRange + passThrough, minDistance: 0, speed: dashSpeed, hitRadius: 0, through: true },
        onHit: [
          { type: "damage", damageType: "physical", amount: joustHit },
          { type: "mark", key: "joust", duration: markSeconds },
        ],
        usable: (unit, world) => edgeGap(unit, world.units[unit.side === 0 ? 1 : 0]) <= joustRange,
        flags: { grounded: joust.flag("grounded") ?? true },
      },
      {
        key: "E2",
        name: `${joust.name} (recast)`,
        slot: "E",
        cooldown: 0,
        castTime: 0,
        chain: { root: "E", index: 2, window: markSeconds },
        // As far as the marked enemy can be (its center), and on.
        delivery: { kind: "dash", direction: "toward", distance: markRange + recastPast + 200, minDistance: 0, speed: dashSpeed, hitRadius: 0, through: true },
        onHit: [{ type: "damage", damageType: "physical", amount: joustHit }],
        usable: (unit, world) => {
          const enemy = world.units[unit.side === 0 ? 1 : 0];
          return markOf(enemy) !== undefined && world.tick >= Number(unit.memory.joustReady ?? Number.POSITIVE_INFINITY) && Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= markRange;
        },
        flags: { grounded: joust.flag("grounded") ?? true },
      },
      {
        key: "R",
        name: charge.name,
        slot: "R",
        cooldown: charge.cooldown(),
        castTime: charge.castTime(),
        delivery: {
          kind: "dash",
          direction: "toward",
          distance: chargeRange,
          speed: chargeTop,
          hitRadius: 0,
          ramp: { amount: (chargeTop - moveSpeed) / rampSteps, every: rampEvery },
          lockOn: { within: lockRange, speed: lockSpeed },
        },
        onSelf: [{ type: "state", state: "ccImmune", duration: 60 }],
        // The damage grows with the charge (the hooks).
        onHit: [{ type: "displace", direction: "away", distance: knock, duration: knock / knockSpeed }],
        estimate: (caster, target) => evaluate(chargeLeast, caster, target),
        roles: ["engage", "damage"],
        flags: { grounded: charge.flag("grounded") ?? true },
      },
    ];
    const dismountedAbilities: AbilitySpec[] = [
      {
        key: "QD",
        name: pistol.name,
        slot: "Q",
        cooldown: pistol.cooldown(),
        castTime: pistol.castTime(),
        charges: { max: pistolCharges, recharge: pistol.field("recharge") },
        delivery: { kind: "line", range: pistolRange, width: pelletWidth, speed: pelletSpeed },
        // The first pellet; the others in the hooks.
        onHit: [{ type: "damage", damageType: "physical", amount: pistol.formula("Physical Damage") }],
        flags: { projectile: pistol.flag("projectile") ?? true },
      },
    ];

    // Jousting through the enemy: 350 units past where Skaarl meets it, the recast 200 past where it stands.
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      const { self, enemy } = view;
      if (command?.kind !== "cast") return command;
      if (command.ability === "E") return { ...command, aim: { direction: 1, distance: Math.max(0, edgeGap(self, enemy)) + passThrough } };
      if (command.ability === "E2") return { ...command, aim: { direction: 1, distance: Math.abs(enemy.x - self.x) + recastPast } };
      return command;
    };

    return {
      behavior,
      abilities: mountedAbilities,
      forms: {
        // His health stays the pair's together; Kled's own is kept at or below his maximum by the hooks.
        [DISMOUNTED]: { championForm: DISMOUNTED, base: { hp: bothBase }, abilities: dismountedAbilities },
      },
      budget: {
        // Violent Tendencies: four quick attacks and the fourth's damage, every few seconds.
        damage: (self, target) => {
          const speed = derive(self).attackSpeed;
          const active = vtAttacks / (speed + extraAttacks(self, vtSpeed));
          const cycle = active + cooldownAfterHaste(vtCooldown, derive(self).abilityHaste) / (1 + vtRefund * speed);
          return { physical: (evaluate(vtHit, self, target) + (vtAttacks - speed * active) * attackDamage(self)) / cycle };
        },
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          const enemy = ctx.enemy;
          if (ctx.memory.kled === undefined) ctx.memory.kled = kledMax;
          if (mounted(self)) {
            // Healing past Skaarl's full health goes to Kled.
            if (self.hp > skaarlMax(self) + Number(ctx.memory.kled)) ctx.memory.kled = Math.min(kledMax, self.hp - skaarlMax(self));
          } else {
            // (Healing is capped there; a change of maximum health could leave him above it.)
            if (self.hp > kledMax) self.hp = kledMax;
            ctx.memory.kled = self.hp;
            const near = Math.abs(enemy.x - self.x);
            const attacked = ctx.tick - Number(ctx.memory.lastHit ?? -1e9) <= ticks(chaseAfter);
            ctx.buff("chase", "moveSpeedFlat", near <= chaseRadius && (self.moved !== -1 || attacked) ? chaseSpeed : 0, FOREVER);
            const guard = near <= guardRadius ? (guardBase + guardHealth * bonusHealth(self)) * (1 + guardPerEnemy) : 0;
            ctx.buff("guardArmor", "armor", guard, FOREVER);
            ctx.buff("guardMR", "MR", guard, FOREVER);
            if (ctx.memory.remountAt !== undefined && ctx.tick >= Number(ctx.memory.remountAt)) remount(ctx);
          }
          // Violent Tendencies runs out after 4 s.
          if (ctx.memory.vtUntil !== undefined && ctx.tick >= Number(ctx.memory.vtUntil)) endFrenzy(ctx);
          // The tether: broken if the enemy gets out of its shrinking radius, else the pull.
          if (ctx.memory.trapAt !== undefined) {
            const since = ctx.tick - Number(ctx.memory.trapAt);
            const radius = tetherRadii[Math.min(tetherRadii.length - 1, Math.floor(since / ticks(tetherStep)))] ?? 0;
            if (since >= ticks(tetherGrace) && Math.abs(enemy.x - self.x) > radius) {
              delete ctx.memory.trapAt;
              ctx.log("the tether breaks");
            } else if (since >= ticks(tetherSeconds)) {
              delete ctx.memory.trapAt;
              const label = `${trap.name} (pull)`;
              if (!inStasis(enemy)) ctx.apply({ type: "displace", direction: "toward", distance: pull, duration: pullSeconds });
              ctx.apply({ type: "damage", damageType: "physical", amount: pullHit, label });
              ctx.apply({ type: "cc", cc: "slow", strength: pullSlow, duration: pullSlowSeconds });
            }
          }
          // Chaaaaaaaarge!!!: the shield grows every 0.25 s of travel, up to 2 s.
          if (ctx.memory.charging !== undefined) {
            const action = self.action;
            if (action?.kind === "dash" && action.ability === "R") {
              if (action.lockedTick !== undefined && ctx.memory.locked === undefined) ctx.memory.locked = action.lockedTick;
              const grown = Number(ctx.memory.shieldSteps ?? 0);
              if (grown < shieldSteps && ctx.tick >= Number(ctx.memory.shieldNext)) {
                const shield = self.statuses.find((s) => s.kind === "shield" && s.key === "R" && s.source === self.side);
                if (shield) shield.value += evaluate(shieldStep, self, self);
                ctx.memory.shieldSteps = grown + 1;
                ctx.memory.shieldNext = Number(ctx.memory.shieldNext) + ticks(shieldEvery);
              }
            } else endCharge(ctx);
          }
        },
        onDamageTaken(ctx) {
          if (mounted(ctx.self) && ctx.self.alive && ctx.self.hp < Number(ctx.memory.kled ?? kledMax)) dismount(ctx);
        },
        onLethal(ctx) {
          // Only Kled can die; a mortal blow to Skaarl dismounts him.
          if (!mounted(ctx.self)) return false;
          dismount(ctx);
          return true;
        },
        onAttack(ctx) {
          // Violent Tendencies starts with the next attack.
          if (ctx.memory.vtUntil === undefined && ctx.tick >= Number(ctx.memory.vtReady ?? 0)) {
            ctx.memory.vtUntil = ctx.tick + ticks(vtSeconds);
            ctx.memory.vtCount = 0;
            ctx.buff("vt", "attackSpeed", vtSpeed, vtSeconds);
          }
        },
        onAttackHit(ctx) {
          ctx.memory.lastHit = ctx.tick;
          if (ctx.memory.vtUntil !== undefined) {
            const count = Number(ctx.memory.vtCount ?? 0) + 1;
            ctx.memory.vtCount = count;
            if (count >= vtAttacks) {
              ctx.apply({ type: "damage", damageType: "physical", amount: vtHit, label: tendencies.name });
              endFrenzy(ctx);
            }
          } else if (Number(ctx.memory.vtReady ?? 0) > ctx.tick) {
            ctx.memory.vtReady = Math.max(ctx.tick, Number(ctx.memory.vtReady) - ticks(vtRefund));
          }
          addCourage(ctx, perAttack);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          const self = ctx.self;
          if (key === "QD" && !self.statuses.some((s) => s.kind === "cc" && (s.key === "root" || s.key === "ground"))) {
            // The recoil, straight back.
            const recoilTicks = ticks(recoil / recoilSpeed);
            self.forced = { endTick: ctx.tick + recoilTicks, perTick: recoil / recoilTicks };
          }
          // The recast spends the mark.
          if (key === "E2") ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== markOf(ctx.enemy));
          if (key === "R") {
            ctx.memory.charging = ctx.tick;
            delete ctx.memory.locked;
            ctx.memory.shieldSteps = 0;
            ctx.memory.shieldNext = ctx.tick + ticks(shieldEvery);
            ctx.apply({ type: "shield", amount: shieldFirst, duration: 60 }, true);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          const self = ctx.self;
          if (key === "Q") ctx.memory.trapAt = ctx.tick;
          if (key === "E" || key === "E2") {
            // The dash goes on past the enemy; then the speed, and the recast 0.5 s after it ends.
            const action = self.action;
            const left = action?.kind === "dash" ? Math.max(0, action.endTick - ctx.tick) : 0;
            ctx.apply({ type: "delayed", delay: left / 30, effects: [{ type: "stat", stat: "moveSpeedPercent", amount: { base: joustHaste }, duration: joustHasteSeconds }] }, true);
            if (key === "E") ctx.memory.joustReady = ctx.tick + left + ticks(recastAfter);
          }
          if (key === "QD") {
            // Pellets 5° apart: the outer ones miss a far enemy.
            const reach = ctx.enemy.spec.base.radius + pelletWidth / 2;
            const distance = Math.abs(ctx.enemy.x - self.x);
            const pellets = pelletAngles.filter((a) => distance * Math.abs(Math.sin(a)) <= reach).length;
            if (pellets > 1) ctx.apply({ type: "damage", damageType: "physical", amount: scaled(pelletHit, (pellets - 1) * ctx.scale), label: `${pistol.name} (pellets)` });
            addCourage(ctx, perPellet * pellets * ctx.scale);
          }
          if (key === "R") {
            const start = Number(ctx.memory.charging ?? ctx.tick);
            const seconds = (Number(ctx.memory.locked ?? ctx.tick) - start) / 30;
            const more = seriesAt(chargeSeries, seconds, false) / 100;
            ctx.apply({ type: "damage", damageType: "magic", amount: scaled(chargeLeast, (1 + more) * ctx.scale), label: charge.name });
          }
        },
      },
    };
  },
};

export default kled;
