/**
 * Nidalee (patch 26.20): as a human she throws javelins that hit harder the farther they fly,
 * lays traps and heals herself; as a cougar she pounces, takes down wounded enemies and swipes.
 * Hunted marks from her javelins and traps reset Aspect of the Cougar in Human Form, extend
 * Pounce and enhance her first Takedown and Pounce.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { scaled, seriesAt, ticks } from "./util";

const HUMAN = "Human Form";
const COUGAR = "Cougar Form";
const EPS = 1e-6;

const nidalee: KitModule = {
  champion: "Nidalee",
  build(kit) {
    const p = kit.ability("Prowl");
    const javelin = kit.ability("Javelin Toss");
    const bushwhack = kit.ability("Bushwhack");
    const surge = kit.ability("Primal Surge");
    const r = kit.ability("Aspect of the Cougar");
    const takedown = kit.ability("Takedown");
    const pounce = kit.ability("Pounce");
    const swipe = kit.ability("Swipe");

    // Hunt: a javelin or trap hit marks the enemy for 4 s; nearby, Nidalee gains ghosting and 10% movement speed, 30% facing it.
    const huntWords = "Hitting enemy champions or monsters with Javelin Toss or Bushwhack applies a Hunted mark to the target for 4 seconds";
    const huntSeconds = p.quoted(huntWords, 0);
    const huntSpeed = p.quoted("she gains ghosting and 10% bonus movement speed for 4 seconds, increased to 30% while she is facing a Hunted target", 0) / 100;
    const huntFacing = p.quoted("she gains ghosting and 10% bonus movement speed for 4 seconds, increased to 30% while she is facing a Hunted target", 2) / 100;
    const huntReach = p.field("effectRadius", "Range for granting Nidalee Hunt's movement speed bonus");
    p.quote("the first cast of both Takedown and Pounce against a Hunted target is enhanced");
    r.quote("While in this form, applying a Hunted mark will reset Aspect of the Cougar's cooldown.");

    // Javelin Toss: 150 (+ 50% AP), up to 225% more for a long flight (0% at 525, 225% at 1300).
    const javelinMin = javelin.formula("Minimum Magic Damage");
    javelin.formula("Maximum Magic Damage");
    const javelinGrowth = javelin.seriesIn("increased by 0 / 45 / 90 / 135 / 180 / 225 (based on distance traveled)%");
    javelin.quote("The damage amplification is based on the distance from Nidalee's location at the end of the cast time to the struck target's center at the time of collision.");
    javelin.quote("This ability will cast from wherever the caster is at the start of the cast time.");

    // Bushwhack: a trap within 900 that arms over 1.5 s and burns 200 (+ 20% AP) over 4 s.
    const trapArm = bushwhack.quoted("becomes stealthed after arming over 1.5 seconds, lasting for up to 120 seconds", 0);
    const trapLife = bushwhack.quoted("becomes stealthed after arming over 1.5 seconds, lasting for up to 120 seconds", 1);
    const trapBurn = bushwhack.quoted("dealing magic damage every second over 4 seconds", 0);
    const trapRadius = bushwhack.field("collisionRadius");
    const trapRange = bushwhack.field("targetRange");
    const trapDamage = bushwhack.formula("Total Magic Damage");
    const trapMax = bushwhack.levelValue("Up to a maximum of 4 / 6 / 8 / 10 (based on level) traps may be active at once.", 0);
    kit.assume(`Nidalee lays Bushwhack where the enemy will walk: between her and a chasing enemy, or under one held in place. The enemy walks over an armed trap in its path; ${trapMax} may stand at once.`);

    // Primal Surge: 60% attack speed (26.21) for 7 s, and a heal of 150 (+ 35% AP), up to 100% more with missing health.
    const surgeHeal = surge.formula("Minimum Heal");
    surge.formula("Maximum Heal");
    const surgeGrowth = surge.seriesIn("healing them for an amount that is increased by");
    const surgeSpeed = surge.fraction("Bonus Attack Speed");
    const surgeSeconds = surge.quoted("granting the target bonus attack speed for 7 seconds", 0);
    surge.quote("The bonus attack speed will persist through Cougar Form if Nidalee uses Primal Surge on herself.");

    // Takedown: an attack of 80 (+ 75% AD) (+ 40% AP) magic damage, 1.75% more per 1% of missing health up to 175%, 30% more on a Hunted target.
    const takedownMin = takedown.formula("Minimum Magic Damage");
    const perMissing = takedown.number("Increased Damage Modifier") / 100;
    const missingCap = takedown.number("Maximum Increased Damage") / 100;
    const takedownHunt = 1 + takedown.quoted("Hitting a Hunted target increases Takedown's damage by 30%.", 0) / 100;
    const takedownWindow = takedown.quoted("empowers her next basic attack within 10 seconds to have an uncancellable windup, gain 75 bonus range", 0);
    const takedownRange = takedown.quoted("empowers her next basic attack within 10 seconds to have an uncancellable windup, gain 75 bonus range", 1);
    takedown.quote("Takedown resets Nidalee's basic attack timer.");
    takedown.quote("Nidalee loses Takedown's empowered attack immediately when she switches to Human Form.");
    takedown.quote("Takedown can critically strike for 100% AD bonus magic damage.");
    takedown.textField("cooldownStart");

    // Pounce: a leap of 375 (750 onto a Hunted enemy, then only 1.5 s of cooldown), hitting within 250 as she lands.
    const leap = pounce.field("targetRange", "Standard range");
    const huntLeap = pounce.field("targetRange", "Enhanced range");
    const leapRadius = pounce.field("effectRadius");
    const huntCooldown = pounce.number("Reduced Cooldown");
    pounce.quote("Nidalee can perform Pounce from an increased range on a Hunted enemy closest to the cursor. She will leap to the front of the target.");
    pounce.quote("Takedown and Aspect of the Cougar can be cast during the dash.");
    const leapTime = 0.5;
    kit.assume(`Pounce lands ${leapTime} s after it starts, however far it goes (neither the wiki nor the game files give its speed). Takedown's critical strikes count by their chance, as 100% AD more magic damage.`);

    // Cougar Form: melee attacks with 125 range.
    const cougarRange = r.quoted("gaining melee attacks with 125 range", 0);

    // Swipe: a 180° arc reaching 310 in front of her.
    const swipeRadius = swipe.field("effectRadius");

    const cougar = (unit: Unit) => unit.spec.form === COUGAR;
    const hunted = (unit: Unit, tick: number) => tick < Number(unit.memory["nidalee:huntUntil"] ?? -1);
    const enemyOf = (world: World, unit: Unit) => world.units[unit.side === 0 ? 1 : 0];

    const markHunted = (ctx: HookContext) => {
      if (!ctx.enemy.alive || ctx.enemy.petId !== undefined) return;
      ctx.memory["nidalee:huntUntil"] = ctx.tick + ticks(huntSeconds);
      ctx.memory["nidalee:huntTakedown"] = true;
      ctx.memory["nidalee:huntPounce"] = true;
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "revealed", duration: huntSeconds }, { scale: 1 });
      if (Math.abs(ctx.enemy.x - ctx.self.x) <= huntReach) {
        ctx.memory["nidalee:chaseUntil"] = ctx.tick + ticks(huntSeconds);
        ctx.apply({ type: "state", state: "ghosted", duration: huntSeconds }, true);
      }
      // In Human Form, a Hunted mark resets Aspect of the Cougar.
      if (!cougar(ctx.self)) ctx.self.cooldownReady.R = ctx.tick;
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: javelin.name, slot: "Q", cooldown: javelin.cooldown(), cost: javelin.cost(), castTime: javelin.castTime(), castOrigin: "start",
      delivery: { kind: "line", range: javelin.field("range"), width: javelin.field("width"), speed: javelin.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: javelinMin }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const wSpec: AbilitySpec = {
      key: "W", name: bushwhack.name, slot: "W", cooldown: bushwhack.cooldown(), cost: bushwhack.cost(), castTime: bushwhack.castTime(),
      delivery: { kind: "self" },
      usable: (unit, world) => Math.abs(enemyOf(world, unit).x - unit.x) <= trapRange + trapRadius,
      roles: ["damage"],
      estimate: (self, target) => evaluate(trapDamage, self, target),
    };
    const eSpec: AbilitySpec = {
      key: "E", name: surge.name, slot: "E", cooldown: surge.cooldown(), cost: surge.cost(), castTime: surge.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: surgeSpeed }, duration: surgeSeconds }],
      roles: ["defense", "buff"],
    };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", activation: "transformation", cooldown: r.cooldown(), castTime: 0, delivery: { kind: "self" } };
    const rcSpec: AbilitySpec = { key: "RC", name: r.name, slot: "R", activation: "transformation", cooldown: r.cooldown(), cooldownKey: "R", castTime: 0, delivery: { kind: "self" } };
    const qcSpec: AbilitySpec = {
      key: "QC", name: takedown.name, slot: "Q", cooldown: takedown.cooldown(), castTime: 0, cooldownAfter: "empower", overlay: true,
      delivery: { kind: "self" },
      onSelf: [{ type: "empower", attacks: 1, window: takedownWindow, bonusRange: takedownRange, uncancellable: true, resetAttack: true, onHit: [] }],
      roles: ["damage"],
      estimate: (self, target) => evaluate(takedownMin, self, target),
    };
    const wcSpec: AbilitySpec = {
      key: "WC", name: pounce.name, slot: "W", cooldown: pounce.cooldown(), castTime: 0, cooldownAtCastStart: true,
      delivery: { kind: "dash", direction: "toward", distance: leap, speed: leap / leapTime, time: leapTime, hitRadius: leapRadius, distanceFor: (unit) => Number(unit.memory["nidalee:leap"] ?? leap) },
      onHit: [{ type: "damage", damageType: "magic", amount: pounce.formula("Magic Damage") }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["engage", "damage"],
    };
    const ecSpec: AbilitySpec = {
      key: "EC", name: swipe.name, slot: "E", cooldown: swipe.cooldown(), castTime: swipe.castTime(),
      delivery: { kind: "area", near: 0, far: swipeRadius, delay: 0, anchor: "caster" },
      onHit: [{ type: "damage", damageType: "magic", amount: swipe.formula("Magic Damage") }],
      flags: { spellShield: true },
    };
    swipe.quote("This ability will cast from wherever the caster is at the start of the cast time.");

    const center = (view: { self: Unit; enemy: Unit }) => Math.abs(view.enemy.x - view.self.x);
    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      const fighting = view.mode === "fight" || view.mode === "trade";
      const gap = center(view);
      if (!cougar(self)) {
        // Into the cougar onto a Hunted enemy within Pounce, or against one already on top of her.
        const cougarReady = (key: string) => (self.cooldownReady[key] ?? 0) <= world.tick;
        if (fighting && canCast(world, self, rSpec) && cougarReady("WC") && ((hunted(self, world.tick) && gap <= huntLeap) || gap <= leap)) return { kind: "cast", ability: "R" };
        // A trap where the enemy will step.
        if (view.mode !== "idle" && canCast(world, self, wSpec) && (view.mode === "kite" || view.mode === "flee" || view.mode === "fight")) return { kind: "cast", ability: "W" };
        if (view.mode !== "idle" && canCast(world, self, eSpec) && self.hp <= 0.6 * derive(self).maxHp) return { kind: "cast", ability: "E" };
        return defaultBehavior(view);
      }
      if (view.mode === "flee" || view.mode === "kite") {
        if (canCast(world, self, rcSpec)) return { kind: "cast", ability: "RC" };
        return defaultBehavior(view);
      }
      if (canCast(world, self, wcSpec) && gap > 150 && ((hunted(self, world.tick) && gap <= huntLeap) || gap <= leap + leapRadius)) {
        self.memory["nidalee:leap"] = hunted(self, world.tick) && self.memory["nidalee:huntPounce"] === true ? Math.min(huntLeap, gap) : leap;
        return { kind: "cast", ability: "WC" };
      }
      if (canCast(world, self, qcSpec) && inAttackRange(self, enemy)) return { kind: "cast", ability: "QC" };
      if (canCast(world, self, ecSpec) && gap - enemy.spec.base.radius <= swipeRadius) return { kind: "cast", ability: "EC" };
      // Back to Human Form once the cougar's spells are spent and a javelin or heal is ready.
      const spent = ["QC", "WC", "EC"].every((key) => (self.cooldownReady[key] ?? 0) > world.tick + ticks(1.5)) && !self.statuses.some((s) => s.kind === "empower" && s.key === "QC");
      if (spent && canCast(world, self, rcSpec) && ((self.cooldownReady.Q ?? 0) <= world.tick || (self.cooldownReady.E ?? 0) <= world.tick)) return { kind: "cast", ability: "RC" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      form: HUMAN,
      forms: {
        [COUGAR]: { attack: { range: cougarRange, ranged: false, missileSpeed: 0, projectile: false }, abilities: [qcSpec, wcSpec, ecSpec, rcSpec] },
      },
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") ctx.memory["nidalee:javelinFrom"] = ctx.self.x;
          if (key === "R") ctx.transform(COUGAR, "share");
          if (key === "RC") {
            // The Takedown attack is lost on the way back.
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && s.key === "QC"));
            ctx.transform(HUMAN, "share");
          }
          if (key === "E") {
            const max = derive(ctx.self).maxHp;
            const missing = max > 0 ? (100 * (max - ctx.self.hp)) / max : 0;
            ctx.apply({ type: "heal", amount: scaled(surgeHeal, 1 + seriesAt(surgeGrowth, missing, true) / 100) }, true);
          }
          if (key === "W") {
            // The trap: between Nidalee and the enemy, at most 900 away.
            const dir = directionTo(ctx.self, ctx.enemy);
            const gap = Math.abs(ctx.enemy.x - ctx.self.x);
            const held = ctx.enemy.statuses.some((s) => s.kind === "cc" && ["stun", "root", "suppression", "airborne", "sleep", "charm", "taunt"].includes(s.key) && s.endTick >= ctx.tick + ticks(trapArm));
            const x = ctx.self.x + dir * Math.min(trapRange, held ? gap : gap / 2);
            const traps = ctx.world.zones.filter((z) => z.owner === ctx.self.side && z.ability === "W" && z.kind === "trap").sort((a, b) => a.id - b.id);
            if (traps.length >= trapMax) ctx.world.zones = ctx.world.zones.filter((z) => !traps.slice(0, traps.length - trapMax + 1).includes(z));
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: ctx.tick, x, radius: trapRadius, startTick: ctx.tick + ticks(trapArm), endTick: ctx.tick + ticks(trapLife), ability: "W", onHit: [{ type: "dot", damageType: "magic", total: trapDamage, duration: trapBurn, interval: 1, label: bushwhack.name }], connects: true, scale: 1 });
          }
          if (key === "WC") {
            // Pounce's Hunt bonus: the leap is longer and its cooldown only 1.5 s.
            if (hunted(ctx.self, ctx.tick) && ctx.memory["nidalee:huntPounce"] === true) {
              ctx.memory["nidalee:huntPounce"] = false;
              ctx.self.cooldownReady.WC = ctx.tick + ticks(huntCooldown);
              ctx.memory["nidalee:huntUntil"] = Math.min(Number(ctx.memory["nidalee:huntUntil"]) + ticks(1.5), ctx.tick + ticks(huntSeconds));
            }
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "WC") delete ctx.memory["nidalee:leap"];
        },
        onAbilityContact(ctx) {
          // Javelin Toss: more damage the farther it flew, from where Nidalee stood at the end of the cast.
          if (ctx.ability.key !== "Q") return undefined;
          const flown = Math.abs(ctx.enemy.x - Number(ctx.memory["nidalee:javelinFrom"] ?? ctx.self.x));
          return [{ type: "damage", damageType: "magic", amount: scaled(javelinMin, 1 + seriesAt(javelinGrowth, flown, true) / 100) }];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") markHunted(ctx);
        },
        onZoneTrigger(ctx) {
          if (ctx.zone.ability === "W" && !ctx.targetPet) markHunted(ctx);
        },
        onAttack(ctx) {
          if (!ctx.action.empowered?.includes("QC")) return;
          // Takedown: magic damage that grows with the target's missing health, 30% more on the first hit of a Hunted target.
          const target = ctx.enemy;
          const max = derive(target).maxHp;
          const missing = max > 0 ? Math.max(0, (100 * (max - target.hp)) / max) : 0;
          const huntBonus = hunted(ctx.self, ctx.tick) && ctx.memory["nidalee:huntTakedown"] === true;
          if (huntBonus) ctx.memory["nidalee:huntTakedown"] = false;
          const growth = (1 + Math.min(missingCap, perMissing * missing)) * (huntBonus ? takedownHunt : 1);
          const crit = derive(ctx.self).critChance * derive(ctx.self).ad;
          const amount: Formula = { base: evaluate(takedownMin, ctx.self, target) * growth + crit };
          ctx.action.baseDamage = { damageType: "magic", amount, label: takedown.name };
          ctx.action.critChance = 0;
        },
        onTick(ctx) {
          // Hunt's speed while chasing: 30% facing the Hunted target.
          const until = Number(ctx.memory["nidalee:chaseUntil"] ?? -1);
          if (ctx.tick < until) {
            const facing = ctx.self.facing === directionTo(ctx.self, ctx.enemy) && hunted(ctx.self, ctx.tick);
            ctx.buff("nidalee:hunt", "moveSpeedPercent", facing ? huntFacing : huntSpeed, (until - ctx.tick) / 30);
          } else ctx.buff("nidalee:hunt", "moveSpeedPercent", 0, 0);
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { magic: evaluate(javelinMin, self, target) / (qSpec.cooldown / haste + qSpec.castTime) };
        },
        healing(self, target) {
          return evaluate(surgeHeal, self, target) / (eSpec.cooldown / (1 + derive(self).abilityHaste / 100));
        },
      },
    };
  },
};

export default nidalee;
