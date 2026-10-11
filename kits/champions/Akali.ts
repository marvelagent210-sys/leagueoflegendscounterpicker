/** Akali: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, missingShare, ticks } from "./util";

const akali: KitModule = {
  champion: "Akali",
  build(kit) {
    const innate = kit.ability("Assassin's Mark");
    const q = kit.ability("Five Point Strike");
    const w = kit.ability("Twilight Shroud");
    const e = kit.ability("Shuriken Flip");
    const r = kit.ability("Perfect Execution");

    // Assassin's Mark: damaging the enemy with an ability rings it; leaving the ring empowers her next attack.
    const ringSeconds = innate.quoted("she creates a ring around them for 4 seconds", 0);
    const ringRadius = innate.field("effectRadius");
    const ringOffset = innate.quoted("Ring Offset: -120", 0);
    const exitAt = ringRadius - Math.abs(ringOffset);
    const ringSpeed = innate.levelValue("she gains 30 / 40 / 50 / 60 (based on level)% bonus movement speed while moving away from the center of the ring") / 100;
    const ringSpeedFor = innate.quoted("For 2 seconds, she gains", 0);
    const kamaWindow = innate.quoted("becomes empowered with Swinging Kama for 4 seconds", 0);
    const kama: Formula = {
      base: innate.levelValue("Swinging Kama: Akali's next basic attack is empowered to have an uncancellable windup, gain doubled range and deal 35 – 182 (based on level)"),
      ratios: {
        bonusAD: innate.quoted("(+ 60% bonus AD) (+ 55% AP) bonus magic damage", 0) / 100,
        AP: innate.quoted("(+ 60% bonus AD) (+ 55% AP) bonus magic damage", 1) / 100,
      },
    };
    const baseRange = kit.champion.forms[0]?.stats.attackRange ?? 125;
    kit.assume(`Assassin's Mark's ring is left ${exitAt} units from its center (its ${ringRadius}-unit radius less its ${Math.abs(ringOffset)}-unit offset); refreshing the ring re-centers it on the enemy.`);

    // Five Point Strike: a cone; enemies near its tip are slowed.
    const [coneLength = 500, slowOffset = 120] = q.fieldValues("targetRange");
    const strikeCast = q.quoted("the effective cast time rounds up to 0.264 / 0.231 / 0.231 / 0.198 (based on level)", 3);
    const strikeSlow = q.quoted("Targets beyond a certain range are also slowed by 50% for 0.5 seconds", 0) / 100;
    const strikeSlowFor = q.quoted("Targets beyond a certain range are also slowed by 50% for 0.5 seconds", 1);
    const strikeCooldown = q.cooldown();
    const strikeHit: Effect = { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") };
    kit.assume(`Five Point Strike takes its effective ${strikeCast} s cast time at level 20 and lands at its end; enemies beyond ${coneLength - slowOffset} units are slowed.`);

    // Twilight Shroud: energy, a burst of speed, and a smoke ring that hides her until she attacks or casts.
    const shroudSeconds = w.number("Shroud Duration");
    const shroudThrow = w.field("targetRange");
    const [shroudMin = 350, shroudMax = 1175] = w.fieldValues("effectRadius");
    const growSeconds = w.quoted("creating a circular shroud that expands over the next 5 seconds into a ring", 0);
    const shroudEnergy = w.quoted("Akali restores 100 energy over 0.4 seconds", 0);
    const energyOver = w.quoted("Akali restores 100 energy over 0.4 seconds", 1);
    const shroudSpeed = w.fraction("Bonus Movement Speed");
    const shroudSpeedFor = w.quoted("gains bonus movement speed that decays over 2 seconds", 0);
    const moreEnergy = w.quoted("While the shroud is active, Akali's maximum energy is increased by 100", 0);
    const revealFor = w.levelValue("Declaring a basic attack or casting an ability will break the invisibility and prevent Akali from entering it again for");
    w.quote("Using a basic attack breaks the stealth at the start of the attack windup");
    kit.assume(
      `Twilight Shroud is thrown ${shroudThrow} units behind Akali; its smoke is a band ${shroudMin} units thick whose outer edge grows from ${shroudMin} to ${shroudMax} units over ${growSeconds} s (the wiki's estimates), and she hides while her center is in it. Its speed, decaying over ${shroudSpeedFor} s, counts at half.`,
    );

    // Shuriken Flip: a flip back, a shuriken that marks, and a dash back in to the mark.
    const flipAfter = e.quoted("Akali flips backward after 0.15 seconds into the cast time", 0);
    const flipBack = e.quoted("Akali will dash backwards up-to 400 units in a straight line", 0);
    const shurikenRange = e.field("targetRange");
    const [shurikenSpeed = 1800, flipSpeed = 1500] = e.fieldValues("speed");
    const [flipCast = 0.25, recastCast = 0.1] = e.fieldValues("castTime");
    const markSeconds = e.quoted("The shuriken marks and reveals the enemy or the last Twilight Shroud smoke section hit for 3 seconds", 0);
    kit.assume(`Shuriken Flip's flip back is a ${flipBack}-unit jump ${flipAfter} s into the cast; the shuriken still reaches ${shurikenRange} units past where she started.`);

    // Perfect Execution: a dash through the enemy, then a second dash that hits harder the more health it is missing.
    const [firstSpeed = 1500, secondSpeed = 3000] = r.fieldValues("speed");
    const firstDash = r.quoted("Akali dashes 750 units in the direction of the target enemy champion", 0);
    const secondDash = r.quoted("Recast: Akali dashes 800 units in the target direction", 0);
    const recastAfter = r.quoted("Perfect Execution can be recast after a 2.5-second static cooldown within 10 seconds of the first activation", 0);
    const recastWithin = r.quoted("Perfect Execution can be recast after a 2.5-second static cooldown within 10 seconds of the first activation", 1);
    const collision = r.field("collisionRadius");
    const executionRange = r.field("targetRange");
    const execution = r.formula("Minimum Magic Damage");
    const missingSeries = r.seriesIn("increased by 0 / 20 / 40 / 60 / 80 / 100 / 120 / 140 / 160 / 180 / 200");
    if (missingSeries.kind !== "variable") throw new Error("Akali kit: Perfect Execution's missing-health bonus changed shape");
    const maxIncrease = Math.max(...missingSeries.values.map(Number)) / 100;
    const fullAt = Math.max(...missingSeries.points.map(Number)) / 100;
    const executionDamage = (self: Unit, enemy: Unit) => evaluate(execution, self, enemy) * (1 + maxIncrease * Math.min(1, missingShare(enemy) / fullAt));

    const ringOn = (unit: Unit, tick: number) => tick < Number(unit.memory.ringUntil ?? -1);
    const kamaReady = (unit: Unit, tick: number) => tick < Number(unit.memory.kamaUntil ?? -1);
    const shroudOn = (unit: Unit, tick: number) => tick < Number(unit.memory.shroudUntil ?? -1);
    /** The smoke band around the shroud's center now, from its inner to its outer edge. */
    const band = (unit: Unit, tick: number): [number, number] => {
      const grown = Math.min(1, (tick - Number(unit.memory.shroudStart)) / ticks(growSeconds));
      const outer = shroudMin + (shroudMax - shroudMin) * grown;
      return [Math.max(0, outer - shroudMin), outer];
    };
    const reveal = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible"));
      ctx.memory.hiddenAfter = ctx.tick + ticks(revealFor);
    };
    const ring = (ctx: HookContext) => {
      if (kamaReady(ctx.self, ctx.tick)) return;
      ctx.memory.ringX = ctx.enemy.x;
      ctx.memory.ringUntil = ctx.tick + ticks(ringSeconds);
      ctx.memory.ringAwayUntil = ctx.tick + ticks(ringSpeedFor);
    };

    const shroudReach = 150;
    kit.assume(`Akali throws Twilight Shroud once she is within ${shroudReach} units of the enemy's attack range.`);
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if ((mode !== "fight" && mode !== "trade") || self.action) return defaultBehavior(view);
      const reaction = react(view);
      if (reaction) return reaction;
      // The shroud once the enemy can reach her.
      const shroud = self.spec.abilities.find((a) => a.key === "W");
      if (shroud && view.distance <= attackRange(enemy) + shroudReach && canCast(world, self, shroud)) return { kind: "cast", ability: "W" };
      // Out of the ring to empower the next attack, still striking with Five Point Strike on the way.
      if (ringOn(self, world.tick) && !kamaReady(self, world.tick)) {
        const strike = self.spec.abilities.find((a) => a.key === "Q");
        const command = defaultBehavior(view);
        if (command?.kind === "cast" && command.ability === "Q" && strike && canCast(world, self, strike)) return command;
        if (command?.kind === "cast") return command;
        const away = self.x === Number(self.memory.ringX) ? (self.x < enemy.x ? -1 : 1) : Math.sign(self.x - Number(self.memory.ringX));
        return { kind: "move", direction: away * Math.sign(enemy.x - self.x) > 0 ? 1 : -1 };
      }
      // In the shroud's clear middle: back into the smoke.
      if (shroudOn(self, world.tick) && !kamaReady(self, world.tick)) {
        const [inner] = band(self, world.tick);
        const center = Number(self.memory.shroudX);
        const fromCenter = Math.abs(self.x - center);
        if (fromCenter < inner) {
          const command = defaultBehavior(view);
          if (command?.kind === "cast" || command?.kind === "attack") return command;
          const outward = self.x === center ? -Math.sign(enemy.x - self.x) || 1 : Math.sign(self.x - center);
          return { kind: "move", direction: outward * Math.sign(enemy.x - self.x) > 0 ? 1 : -1 };
        }
      }
      return defaultBehavior(view);
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: strikeCooldown,
        cost: q.cost(),
        castTime: strikeCast,
        delivery: {
          kind: "area",
          near: 0,
          far: coneLength,
          delay: 0,
          anchor: "caster",
          // The tip: damage and the slow (a band's effects replace the area's).
          bands: [{ from: coneLength - slowOffset, to: coneLength, onHit: [strikeHit, { type: "cc", cc: "slow", strength: strikeSlow, duration: strikeSlowFor }] }],
        },
        onHit: [strikeHit],
        flags: { spellShield: q.flag("spellShield") ?? true },
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        castTime: w.castTime(),
        moveWhileCasting: true,
        // Its cooldown starts when the shroud is gone.
        cooldownAfter: "state",
        delivery: { kind: "self" },
        onCastStart: [
          { type: "stat", stat: "moveSpeedPercent", amount: flat(shroudSpeed / 2), duration: shroudSpeedFor },
          { type: "stat", stat: "maxResource", amount: flat(moreEnergy), duration: shroudSeconds },
          { type: "state", state: "lingering", duration: shroudSeconds },
        ],
        // Thrown by the behavior.
        usable: (unit, world) => world.modes[unit.side] !== "idle",
        roles: ["buff"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: flipCast,
        chainCooldown: "first",
        // The shuriken flies from where the flip lands, out to its range past where she started.
        delivery: { kind: "line", range: shurikenRange + flipBack, width: e.field("width"), speed: shurikenSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
        usable: (unit, world) => Math.abs(world.units[unit.side === 0 ? 1 : 0].x - unit.x) <= shurikenRange,
        // The recast hangs on the mark.
        decisive: true,
        flags: { projectile: true, spellShield: e.flag("spellShield") ?? true },
      },
      {
        key: "E2",
        name: `${e.name} (recast)`,
        slot: "E",
        cooldown: 0,
        castTime: recastCast,
        chain: { root: "E", index: 2, window: markSeconds },
        delivery: { kind: "dash", direction: "target", distance: shurikenRange + flipBack + 1000, speed: flipSpeed, hitRadius: 0 },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage", 1) }],
        usable: (unit, world) => world.tick < Number(unit.memory.shurikenUntil ?? -1),
        flags: { grounded: true, knockdown: true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        castTime: r.castTime(),
        chainCooldown: "last",
        delivery: { kind: "dash", direction: "toward", distance: firstDash, speed: firstSpeed, hitRadius: collision, through: true },
        onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }],
        usable: (unit, world) => Math.abs(world.units[unit.side === 0 ? 1 : 0].x - unit.x) <= executionRange,
        flags: { grounded: true, knockdown: true },
      },
      {
        key: "R2",
        name: `${r.name} (recast)`,
        slot: "R",
        cooldown: 0,
        castTime: 0,
        chain: { root: "R", index: 2, window: recastWithin, delay: recastAfter },
        delivery: { kind: "dash", direction: "toward", distance: secondDash, speed: secondSpeed, hitRadius: collision, through: true },
        // Its damage, growing with the enemy's missing health, is dealt by the hooks.
        onHit: [{ type: "mark", key: "execution", duration: 0.1 }],
        estimate: executionDamage,
        roles: ["damage"],
        flags: { grounded: true, knockdown: true },
      },
    ];

    return {
      behavior,
      abilities,
      budget: {
        // Swinging Kama about once per Five Point Strike's ring, and the recast at half missing health.
        damage: (self, target) => ({ magic: evaluate(kama, self, target) / (ringSeconds + strikeCooldown) }),
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Assassin's Mark: speed away from the ring's center, and the empowered attack on leaving it.
          if (ringOn(self, ctx.tick)) {
            const center = Number(ctx.memory.ringX);
            const leaving = self.moved !== 0 && Math.sign(self.x - center) * (self.x - Number(ctx.memory.lastX ?? self.x)) > 0;
            if (leaving && ctx.tick < Number(ctx.memory.ringAwayUntil ?? -1)) ctx.buff("ring", "moveSpeedPercent", ringSpeed, 2 / 30);
            if (Math.abs(self.x - center) > exitAt) {
              ctx.memory.ringUntil = -1;
              ctx.memory.kamaUntil = ctx.tick + ticks(kamaWindow);
              ctx.memory.chaseUntil = ctx.tick + ticks(ringSpeedFor);
              ctx.apply(
                { type: "empower", attacks: 1, window: kamaWindow, bonusRange: baseRange, uncancellable: true, onHit: [{ type: "damage", damageType: "magic", amount: kama, label: "Swinging Kama" }] },
                true,
              );
            }
          }
          if (ctx.tick < Number(ctx.memory.chaseUntil ?? -1) && self.moved === 1) ctx.buff("ring", "moveSpeedPercent", ringSpeed, 2 / 30);
          if (kamaReady(self, ctx.tick) && !self.statuses.some((s) => s.kind === "empower" && (s.empower?.attacks ?? 0) > 0)) ctx.memory.kamaUntil = -1;
          ctx.memory.lastX = self.x;
          // Twilight Shroud: energy over 0.4 s, and hidden while in the smoke and not dashing.
          if (ctx.tick < Number(ctx.memory.energyUntil ?? -1)) ctx.apply({ type: "resource", amount: flat(shroudEnergy / ticks(energyOver)) }, true);
          if (shroudOn(self, ctx.tick)) {
            const [inner, outer] = band(self, ctx.tick);
            const fromCenter = Math.abs(self.x - Number(ctx.memory.shroudX));
            const inside = fromCenter >= inner && fromCenter <= outer && self.action?.kind !== "dash";
            const hidden = self.statuses.some((s) => s.kind === "state" && s.key === "invisible");
            if (inside && ctx.tick >= Number(ctx.memory.hiddenAfter ?? -1)) ctx.apply({ type: "state", state: "invisible", duration: 2 / 30 }, true);
            else if (hidden && !inside) self.statuses = self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible"));
          }
        },
        onCastStart(ctx) {
          reveal(ctx);
          const key = ctx.ability.key;
          if (key === "W") {
            const behind = ctx.enemy.x >= ctx.self.x ? -1 : 1;
            ctx.memory.shroudX = ctx.self.x + behind * shroudThrow;
            ctx.memory.shroudStart = ctx.tick;
            ctx.memory.shroudUntil = ctx.tick + ticks(shroudSeconds);
            ctx.memory.energyUntil = ctx.tick + ticks(energyOver);
          }
          if (key === "E") ctx.apply({ type: "delayed", delay: flipAfter, effects: [{ type: "reposition", direction: "away", distance: flipBack }] }, true);
        },
        onAttack(ctx) {
          reveal(ctx);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E") ctx.memory.shurikenUntil = ctx.tick + ticks(markSeconds);
          if (key === "E2") ctx.memory.shurikenUntil = -1;
          if (key === "R2") ctx.apply({ type: "damage", damageType: "magic", amount: flat(executionDamage(ctx.self, ctx.enemy) * ctx.scale), label: r.name });
          // Damaging abilities ring the enemy.
          if (key === "Q" || key === "E" || key === "E2" || key === "R" || key === "R2") ring(ctx);
        },
      },
    };
  },
};

export default akali;
