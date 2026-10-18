/** Gragas: Happy Hour, the fermenting Barrel Roll, Drunken Rage, Body Slam and Explosive Cask's knock back. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, heldUntil } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { areaOnPets } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { between, maxHp, ticks } from "./util";

const gragas: KitModule = {
  champion: "Gragas",
  build(kit) {
    const passive = kit.ability("Happy Hour");
    const q = kit.ability("Barrel Roll");
    const w = kit.ability("Drunken Rage");
    const e = kit.ability("Body Slam");
    const r = kit.ability("Explosive Cask");

    // Happy Hour: a heal after casting an ability, on its own (static) cooldown.
    const happyHeal = passive.quoted("heals himself for 5.5% of his maximum health", 0) / 100;
    const happyCooldown = passive.field("staticCooldown");
    q.quote("The initial cast counts as an ability activation for the purposes of on-cast effects");
    q.quote("Deactivating the ability manually does not");

    // Barrel Roll: a cask that lands, ferments for 2 s up to 150% of its damage and slow, and goes off when recast or after 4 s.
    const qRange = q.field("targetRange");
    const qRadius = q.field("effectRadius");
    const qSpeed = q.field("speed");
    const caskSeconds = q.quoted("remaining there for 4 seconds", 0);
    const fermentSeconds = q.quoted("ferment over the first 2 seconds of its duration", 0);
    q.quote("up to a maximum of 150% of their initial values");
    const caskMin = q.formula("Minimum Magic Damage");
    const caskMax = q.formula("Maximum Magic Damage");
    const slowMin = q.fraction("Minimum Slow");
    const slowMax = q.fraction("Maximum Slow");
    const caskSlowSeconds = q.quoted("slowing them for 2 seconds", 0);
    q.quote("Barrel Roll has an internal cooldown while traveling so that Gragas may only make it explode on arrival");
    q.quote("The charge-up countdown will only start once the cask stops rolling");
    q.quote("does so automatically after its duration ends");
    kit.assume("Barrel Roll goes off as soon as it lands on the enemy, unless the enemy is held in place inside it: then it ferments until the hold is about to end (2 s at most).");

    // Drunken Rage: damage reduction at once, and after the 0.75 s channel an empowered attack.
    const rageChannel = w.quoted("Gragas channels for 0.75 seconds", 0);
    const rageReductionSeconds = w.quoted("gains damage reduction for 2.5 seconds", 0);
    const rageReduction = w.baseOf("Damage Reduction") / 100;
    const rageReductionAp = w.quoted("(+ 4% per 100 AP)", 0) / 100 / w.quoted("(+ 4% per 100 AP)", 1);
    const rageWindow = w.quoted("empowers his next basic attack within 5 seconds", 0);
    const rageRange = w.quoted("gain 50 bonus range", 0);
    const rageDamage = w.formula("Bonus Magic Damage");
    w.quote("Upon completing the channel, Gragas empowers his next basic attack");
    w.quote("The enhanced attack will apply other on-hit effects and can critically strike as normal");

    // Body Slam: a charge that stops on the first enemy, stuns it 1 s and refunds 40% of its cooldown.
    const slamRange = e.field("targetRange");
    const slamSpeed = e.field("speed");
    const slamCollision = e.field("effectRadius", "Center-to-center collision radius");
    const slamDamage = e.formula("Magic Damage");
    const slamStun = e.quoted("stunning them for 1 second", 0);
    const slamRefund = e.quoted("Body Slam's current cooldown is reduced by 40% if Gragas hits an enemy", 0) / 100;
    e.quote("Barrel Roll and Explosive Cask can be cast during the dash");
    e.quote("Displacement immunity will not resist the application of the stun");
    kit.assume("Body Slam's knock back distance is in neither the wiki nor the game data: its hit stuns the enemy without moving it.");

    // Explosive Cask: thrown over 0.5 s, it knocks enemies 900 units away from where it lands.
    const rRange = r.field("targetRange");
    const rRadius = r.field("effectRadius");
    const rFlight = r.quoted("travels to the target location over 0.5 seconds", 0);
    const rDamage = r.formula("Magic Damage");
    const rKnockback = r.quoted("knock them back 900 units", 0);
    r.quote("though not through terrain, from the epicenter of the explosion");
    const knockSeconds = 0.5;
    kit.assume(`Explosive Cask's knock back takes ${knockSeconds} s: the wiki and the game data give its distance but not its duration.`);

    const qCooldown = q.cooldown(), wCooldown = w.cooldown(), rCooldown = r.cooldown();

    const caskOut = (unit: Unit) => Number(unit.memory.caskLanded ?? -1) >= 0;
    const caskShare = (unit: Unit, world: World) => Math.min(1, Math.max(0, (world.tick - Number(unit.memory.caskLanded)) / ticks(fermentSeconds)));
    const caskCovers = (self: Unit, enemy: Unit) => Math.abs(enemy.x - Number(self.memory.caskX)) <= qRadius + enemy.spec.base.radius;
    const caskHit: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: q.flag("spellShield") ?? true, projectile: false } };

    const detonate = (ctx: HookContext) => {
      if (!caskOut(ctx.self)) return;
      const share = caskShare(ctx.self, ctx.world);
      const x = Number(ctx.memory.caskX);
      const effects: Effect[] = [
        { type: "damage", damageType: "magic", amount: between(caskMin, caskMax, share), label: q.name },
        { type: "cc", cc: "slow", strength: slowMin + (slowMax - slowMin) * share, duration: caskSlowSeconds },
      ];
      ctx.log(`${q.name} goes off (${Math.round(100 + 50 * share)}%)`);
      if (ctx.memory.caskConnects && caskCovers(ctx.self, ctx.enemy)) abilityHit(ctx.world, ctx.self, ctx.enemy, caskHit, effects, Number(ctx.memory.caskScale ?? 1));
      areaOnPets(ctx.world, ctx.self, x - qRadius, x + qRadius, effects);
      ctx.memory.caskLanded = -1;
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        cooldownAtCastStart: true,
        overlay: true,
        // Not while a cask is rolling or still out (a cask a projectile wall stops never lands).
        usable: (unit, world) => !caskOut(unit) && !world.zones.some((zone) => zone.owner === unit.side && zone.ability === "Q"),
        delivery: { kind: "circle", range: qRange, radius: qRadius, delay: 0, speed: qSpeed },
        onHit: [],
        flags: { projectile: q.flag("projectile") ?? true, spellShield: q.flag("spellShield") ?? true },
        roles: ["damage", "cc"],
        estimate: (self, target) => evaluate(caskMin, self, target),
      },
      {
        key: "Q2",
        name: `${q.name} (recast)`,
        slot: "Q",
        cooldown: 0,
        castTime: 0,
        activation: "internal",
        overlay: true,
        // Only once the cask has stopped rolling.
        usable: (unit) => caskOut(unit),
        delivery: { kind: "self" },
        roles: ["damage"],
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "self" },
        channel: {
          duration: rageChannel,
          interruptible: true,
          onCompleteSelf: [{ type: "empower", attacks: 1, window: rageWindow, bonusRange: rageRange, uncancellable: true, spellShieldOnHit: true, onHit: [{ type: "damage", damageType: "magic", amount: rageDamage, label: w.name }] }],
        },
        roles: ["damage", "defense"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "dash", direction: "toward", distance: slamRange, speed: slamSpeed, hitRadius: slamCollision, hitCentered: true, sidestep: { reach: slamCollision } },
        onHit: [{ type: "damage", damageType: "magic", amount: slamDamage }, { type: "cc", cc: "stun", duration: slamStun }],
        flags: { grounded: e.flag("grounded") ?? true, spellShield: e.flag("spellShield") ?? true },
        decisive: true,
        roles: ["damage", "cc", "engage"],
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        overlay: true,
        delivery: { kind: "circle", range: rRange, radius: rRadius, delay: 0, flight: rFlight },
        // The knock back's origin is where the cask lands (the hooks set it).
        onHit: [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "displace", direction: "away", distance: rKnockback, duration: knockSeconds, stopAtWall: true }],
        flags: { projectile: r.flag("projectile") ?? true, spellShield: r.flag("spellShield") ?? true },
        roles: ["damage", "cc"],
      },
    ];

    const ready = (view: Parameters<Behavior>[0], key: string) => {
      const ability = view.self.spec.abilities.find((a) => a.key === key);
      return ability !== undefined && canCast(view.world, view.self, ability);
    };
    // The default behavior otherwise, without Explosive Cask (where it lands decides where it throws) or the cask's detonation.
    const generic: Behavior = (view) => {
      const command = defaultBehavior(view);
      if (command?.kind !== "cast" || (command.ability !== "R" && command.ability !== "Q2")) return command;
      return view.distance <= view.self.spec.attack.range ? { kind: "attack" } : { kind: "move", direction: 1 };
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode, distance } = view;
      if (mode === "idle") return undefined;
      const centers = Math.abs(enemy.x - self.x);
      // The cask: on the enemy, it goes off, unless the enemy is held in it and it can ferment more.
      if (ready(view, "Q2") && caskCovers(self, enemy) && self.memory.caskConnects) {
        if (caskShare(self, world) >= 1 || heldUntil(enemy) <= world.tick + 1) return { kind: "cast", ability: "Q2" };
      }
      // During Body Slam: the cask, onto the enemy it is about to stun.
      if (self.action?.kind === "dash") return self.action.ability === "E" && ready(view, "Q") ? { kind: "cast", ability: "Q" } : undefined;
      if (self.action && self.action.kind !== "windup") return undefined;
      if (mode === "flee") {
        // Explosive Cask between them: the chaser is knocked away.
        if (ready(view, "R") && distance < 500) return { kind: "cast", ability: "R", aim: { direction: 1, distance: Math.max(0, centers - (rRadius - 100)) } };
        if (ready(view, "Q") && centers <= qRange) return { kind: "cast", ability: "Q" };
        return generic(view);
      }
      if (ready(view, "E") && centers <= slamRange && distance > 0) return { kind: "cast", ability: "E" };
      if (ready(view, "Q") && centers <= qRange) return { kind: "cast", ability: "Q" };
      if (ready(view, "W") && distance <= self.spec.attack.range + 50) return { kind: "cast", ability: "W" };
      // Explosive Cask behind an enemy getting away, or one nearly dead: knocked back into him.
      if (mode === "fight" && ready(view, "R") && centers <= rRange && (enemy.moved === -1 || enemy.hp < 0.35 * maxHp(enemy))) {
        return { kind: "cast", ability: "R", aim: { direction: 1, distance: Math.min(rRange, centers + (rRadius - 100)) } };
      }
      return generic(view);
    };

    return {
      abilities,
      behavior,
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          // A cask about a quarter fermented each cooldown, and Drunken Rage's empowered attack each one.
          return {
            magic: evaluate(between(caskMin, caskMax, 0.25), self, target) / cooldownAfterHaste(qCooldown, d.abilityHaste) + evaluate(rageDamage, self, target) / (cooldownAfterHaste(wCooldown, d.abilityHaste) + rageChannel),
          };
        },
        healing: (self) => happyHeal * maxHp(self) / happyCooldown,
      },
      hooks: {
        onStart(ctx) {
          ctx.memory.caskLanded = -1;
          ctx.memory.happyReady = 0;
        },
        onTick(ctx) {
          // A cask goes off by itself when its 4 seconds run out.
          if (caskOut(ctx.self) && ctx.tick >= Number(ctx.memory.caskLanded) + ticks(caskSeconds)) detonate(ctx);
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "W") {
            const d = derive(ctx.self);
            ctx.self.statuses.push({ kind: "state", key: "damageReduction", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(rageReductionSeconds), value: rageReduction + rageReductionAp * d.ap, memoKey: "gragas:rage" });
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q2") detonate(ctx);
          // Happy Hour: after an ability's cast; Barrel Roll's detonation isn't one.
          if (["Q", "W", "E", "R"].includes(key) && ctx.tick >= Number(ctx.memory.happyReady ?? 0)) {
            ctx.apply({ type: "heal", amount: { base: happyHeal * maxHp(ctx.self) } }, true);
            ctx.memory.happyReady = ctx.tick + ticks(happyCooldown);
          }
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability === "Q") {
            // The cask stops rolling: its fermentation and its 4 seconds start now.
            ctx.memory.caskLanded = ctx.tick;
            ctx.memory.caskX = ctx.zone.x;
            ctx.memory.caskConnects = ctx.zone.connects !== false;
            ctx.memory.caskScale = ctx.zone.scale ?? 1;
          }
          if (ctx.zone.ability === "R") ctx.memory.explosiveX = ctx.zone.x;
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "R") return;
          const origin = Number(ctx.memory.explosiveX ?? ctx.self.x);
          return ctx.effects.map((effect) => (effect.type === "displace" ? { ...effect, originX: origin } : effect));
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") ctx.apply({ type: "refund", ability: "E", fraction: slamRefund }, true);
        },
      },
    };
  },
};
export default gragas;
