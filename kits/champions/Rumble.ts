/** Rumble: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { attackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import { extraAttacks, flat, scaled, ticks } from "./util";

/** Heat, in kit memory, and the tick Overheat ends. */
const HEAT = "heat";
const OVERHEATED = "overheatUntil";

const rumble: KitModule = {
  champion: "Rumble",
  build(kit) {
    const innate = kit.ability("Junkyard Titan");
    const q = kit.ability("Flamespitter");
    const w = kit.ability("Scrap Shield");
    const e = kit.ability("Electro Harpoon");
    const r = kit.ability("The Equalizer");

    // Junkyard Titan: basic abilities generate Heat; 50 Heat is the Danger Zone, 150 overheats.
    const decay = innate.quoted("which decays by 10 Heat per second after not using any basic ability within 4 seconds or The Equalizer within 2 seconds", 0);
    const quietBasic = innate.quoted("which decays by 10 Heat per second after not using any basic ability within 4 seconds or The Equalizer within 2 seconds", 1);
    const quietUlt = innate.quoted("which decays by 10 Heat per second after not using any basic ability within 4 seconds or The Equalizer within 2 seconds", 2);
    const dangerZone = innate.quoted("Rumble's mech enters the Danger Zone when at or above 50 Heat", 0);
    const maxHeat = innate.quoted("becomes Overheated while at 150 Heat", 0);
    const overheatSeconds = innate.quoted("disabling his abilities as his Heat decays back down to 0 over 4 seconds", 1);
    const overheatSpeed = innate.levelValue("During this time, he gains 30 – 100 (based on level)% bonus attack speed") / 100;
    const overheatHit: Formula = {
      base: innate.levelValue("During this time, he gains 30 – 100 (based on level)% bonus attack speed and empowers his basic attacks to deal 5 – 40 (based on level)", 1),
      ratios: {
        AP: innate.quoted("(+ 25% AP) (+ 4% of the target's maximum health) bonus magic damage on-hit", 0) / 100,
        targetMaxHP: innate.quoted("(+ 25% AP) (+ 4% of the target's maximum health) bonus magic damage on-hit", 1) / 100,
      },
    };
    const heatPerCast = q.quoted("Rumble generates 20 Heat to activate his flamethrower", 0);
    w.quote("Rumble generates 20 Heat to grant himself a shield");
    e.quote("Rumble generates 20 Heat to shoot a harpoon");
    kit.assume("Each ability is empowered by the Danger Zone if Rumble is in it when he casts, before its Heat is added; in an all-in he casts on cooldown and lets his mech overheat.");

    // Flamespitter: a cone in front of him for 3 seconds; enemies in it are scorched, refreshing every 0.25 s.
    const flameSeconds = q.quoted("to activate his flamethrower for 3 seconds", 0);
    const flameEvery = q.quoted("spewing forth flames in a frontal cone every 0.25 seconds", 0);
    const scorchSeconds = q.quoted("Enemies hit by the flame are scorched for 0.6 seconds", 0);
    const [coneLength = 600, coneBehind = 50] = q.fieldValues("range");
    const flameTick = q.formula("Magic Damage per Tick");
    const flameTickHot = q.formula("Enhanced Damage per Tick");
    q.quote("When Flamespitter's debuff is applied instead of refreshed, the target is dealt one additional instance of the debuff at the same time as the application");
    const scorchTicks = Math.max(1, Math.floor(scorchSeconds / flameEvery + 1e-9));
    const scorch = (tick: Formula): Effect => ({ type: "dot", damageType: "magic", total: scaled(tick, scorchTicks), duration: scorchTicks * flameEvery, interval: flameEvery, label: q.name });
    kit.assume(`Flamespitter's cone (${coneBehind} units behind Rumble to ${coneLength} in front) always faces the enemy.`);

    // Scrap Shield: a shield and a burst of speed.
    const shieldSeconds = w.quoted("grant himself a shield for 1.5 seconds", 0);
    const hasteSeconds = w.quoted("The movement speed buff is supposed to last for 1 second", 0);
    kit.assume(`Scrap Shield's speed lasts its intended ${hasteSeconds} s (a bug can stretch it 0.264 s).`);

    // Electro Harpoon: two charges; each hit adds a stack of magic resistance reduction and slow, up to 2.
    const harpoonShred = e.fraction("Magic Resistance Reduction");
    const harpoonShredHot = e.fraction("Enhanced Magic Resistance Reduction");
    const harpoonSlow = e.fraction("Slow");
    const harpoonSlowHot = e.fraction("Enhanced Slow");
    const shredSeconds = e.quoted("inflicting them with magic resistance reduction for 4 seconds and slowing them for 2 seconds", 0);
    const slowSeconds = e.quoted("inflicting them with magic resistance reduction for 4 seconds and slowing them for 2 seconds", 1);
    const maxStacks = e.quoted("stacking up to 2 times", 0);
    const harpoonCharges = e.quoted("Rumble periodically stocks an Electro Harpoon charge, up to a maximum of 2", 0);
    const lateHarpoon = e.quoted("he may still use another charge within 3 seconds of the initial cast", 0);
    e.quote("the effectiveness of both debuffs on the target are increased to their enhanced values for all stacks of each debuff");

    // The Equalizer: a carpet of fire; enemies inside burn (damage and slow) for 1 second, refreshing, up to 20 times.
    const burnEvery = r.quoted("taking magic damage every 0.25 seconds and being slowed by 35%", 0);
    const burnSlow = r.quoted("taking magic damage every 0.25 seconds and being slowed by 35%", 1) / 100;
    const burnSeconds = r.quoted("marked Burning for 1 second", 0);
    const burnCap = r.quoted("Enemies may be Burning for up to 5 seconds", 0);
    const rocketRadius = r.quoted("each having a circular area of effect with a radius of 205 units", 0);
    const rocketsStart = r.field("castTime");
    const firstRocket = r.quoted("which is equivalent to a period of 0.132 from the cast point", 0);
    const rocketGap = r.quoted("Each rocket drops at an offset of 180 units from the previous in the vector of cast", 0) / r.field("speed");
    r.quote("consists of a row of six rockets");
    const rockets = 6;
    // Across the enemy's path: the rocket over it lands halfway through the barrage.
    const carpetDelay = rocketsStart + firstRocket + ((rockets - 1) / 2) * rocketGap;
    // Burning 1 s after leaving, at most 5 s in all: inside for up to 4 s.
    const carpetSeconds = burnCap - burnSeconds;
    kit.assume(
      `The Equalizer is laid across the enemy's path: a field ${rocketRadius} units each way of where it stood, landing ${carpetDelay.toFixed(2)} s after the cast and burning for up to ${carpetSeconds} s (the 5-second cap on Burning), not along the line it fights on.`,
    );

    const castsToOverheat = maxHeat / heatPerCast;
    const castsPerSecond = 1 / q.cooldown() + 1 / w.cooldown() + 1 / e.field("recharge");

    const heatOf = (unit: Unit) => Number(unit.memory[HEAT] ?? 0);
    const overheated = (unit: Unit, tick: number) => tick < Number(unit.memory[OVERHEATED] ?? -1);
    const hot = (unit: Unit) => heatOf(unit) >= dangerZone;
    /** Abilities are disabled while overheated; a second harpoon may follow a first thrown just before. */
    const free = (unit: Unit, world: World) => !overheated(unit, world.tick);
    const harpoonFree = (unit: Unit, world: World) => {
      if (!overheated(unit, world.tick)) return true;
      const thrown = Number(unit.memory.harpoonAt ?? -1);
      return thrown >= 0 && thrown < Number(unit.memory.overheatStart ?? 0) && world.tick - thrown <= ticks(lateHarpoon);
    };

    /** Normal and Danger Zone versions of a basic ability, sharing its cooldown. */
    const pair = (spec: AbilitySpec, hotVersion: Partial<AbilitySpec>, gate: (unit: Unit, world: World) => boolean): AbilitySpec[] => [
      { ...spec, usable: (unit, world) => gate(unit, world) && !hot(unit) },
      { ...spec, ...hotVersion, key: `${spec.key}hot`, cooldownKey: spec.key, usable: (unit, world) => gate(unit, world) && hot(unit) },
    ];

    const flame = (tick: Formula): Partial<AbilitySpec> => ({
      delivery: { kind: "field", range: 0, radius: (coneLength + coneBehind) / 2, offset: (coneLength - coneBehind) / 2, attached: true, duration: flameSeconds, interval: flameEvery },
      onHit: [scorch(tick)],
    });
    const shield = (strength: Formula, speed: number): Partial<AbilitySpec> => ({
      onSelf: [
        { type: "shield", amount: strength, duration: shieldSeconds },
        { type: "stat", stat: "moveSpeedPercent", amount: flat(speed), duration: hasteSeconds },
      ],
    });
    const harpoon = (damage: Formula): Partial<AbilitySpec> => ({ onHit: [{ type: "damage", damageType: "magic", amount: damage }] });

    const abilities: AbilitySpec[] = [
      ...pair(
        { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: 0, delivery: { kind: "self" }, ...flame(flameTick) },
        { name: `${q.name} (Danger Zone)`, ...flame(flameTickHot) },
        free,
      ),
      ...pair(
        { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), castTime: 0, delivery: { kind: "self" }, ...shield(w.formula("Shield Strength"), w.fraction("Bonus Movement Speed")) },
        { name: `${w.name} (Danger Zone)`, ...shield(w.formula("Enhanced Shield Strength"), w.fraction("Enhanced Bonus Movement Speed")) },
        free,
      ),
      ...pair(
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          charges: { max: harpoonCharges, recharge: e.field("recharge") },
          castTime: e.castTime(),
          delivery: { kind: "line", range: e.fieldValues("range")[0] ?? 950, width: e.field("width"), speed: e.field("speed") },
          ...harpoon(e.formula("Magic Damage")),
          // Its slow and magic resistance reduction (applied by the hooks) make each hit matter.
          decisive: true,
          flags: { projectile: e.flag("projectile") ?? true },
        },
        { name: `${e.name} (Danger Zone)`, ...harpoon(e.formula("Enhanced Damage")) },
        harpoonFree,
      ),
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        castTime: 0,
        delivery: { kind: "field", range: r.field("targetRange"), radius: rocketRadius, duration: carpetSeconds, interval: burnEvery, delay: carpetDelay },
        onHit: [
          { type: "dot", damageType: "magic", total: scaled(r.formula("Magic Damage per Tick"), burnSeconds / burnEvery), duration: burnSeconds, interval: burnEvery, label: r.name },
          { type: "cc", cc: "slow", strength: burnSlow, duration: burnSeconds },
        ],
        usable: free,
      },
    ];

    const addHeat = (ctx: HookContext, amount: number) => {
      const heat = Math.min(maxHeat, heatOf(ctx.self) + amount);
      ctx.memory[HEAT] = heat;
      if (heat >= maxHeat && !overheated(ctx.self, ctx.tick)) {
        ctx.memory.overheatStart = ctx.tick;
        ctx.memory[OVERHEATED] = ctx.tick + ticks(overheatSeconds);
        ctx.buff("overheat", "attackSpeed", overheatSpeed, overheatSeconds);
        ctx.log("overheats");
      }
    };

    /** Electro Harpoon's stacks: up to 2, their strength set by the latest harpoon. */
    const harpoonHit = (ctx: HookContext, enhanced: boolean) => {
      const enemy = ctx.enemy;
      const live = ctx.tick < Number(ctx.memory.harpoonStacksUntil ?? -1);
      const stacks = Math.min(maxStacks, (live ? Number(ctx.memory.harpoonStacks ?? 0) : 0) + 1);
      ctx.memory.harpoonStacks = stacks;
      ctx.memory.harpoonStacksUntil = ctx.tick + ticks(shredSeconds);
      enemy.statuses = enemy.statuses.filter((s) => s.memoKey !== "E:mrReductionPercent" && s.memoKey !== "Ehot:mrReductionPercent");
      ctx.apply({ type: "stat", stat: "mrReductionPercent", amount: flat(stacks * (enhanced ? harpoonShredHot : harpoonShred)), duration: shredSeconds });
      ctx.apply({ type: "cc", cc: "slow", strength: stacks * (enhanced ? harpoonSlowHot : harpoonSlow), duration: slowSeconds });
    };

    // While the flame burns, Rumble stays out of the enemy's reach but inside the cone; overheated, he brawls.
    const flameMargin = 50;
    kit.assume(`While Flamespitter burns, Rumble keeps ${flameMargin} units outside the enemy's attack range and inside his cone; overheated or out-ranged, he fights up close.`);
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (mode !== "fight" || self.action || overheated(self, world.tick) || world.tick >= Number(self.memory.flameUntil ?? -1)) return defaultBehavior(view);
      const reaction = react(view);
      if (reaction) return reaction;
      const command = defaultBehavior(view);
      // Casts go ahead; attacks and steps toward the enemy give way to spacing.
      if (command?.kind === "cast") return command;
      const reach = attackRange(enemy) + self.spec.base.radius + enemy.spec.base.radius + flameMargin;
      const cone = coneLength - flameMargin;
      if (reach >= cone) return command;
      const gap = Math.abs(enemy.x - self.x);
      if (gap < reach) return { kind: "move", direction: -1 };
      if (gap > cone) return { kind: "move", direction: 1 };
      return { kind: "move", direction: 0 };
    };

    return {
      abilities,
      behavior,
      budget: {
        // Overheat's empowered, faster attacks for 4 s once enough casts have built 150 Heat.
        damage: (self, target) => {
          const share = overheatSeconds / (castsToOverheat / castsPerSecond + overheatSeconds);
          const attacks = derive(self).attackSpeed + extraAttacks(self, overheatSpeed);
          return { magic: share * attacks * evaluate(overheatHit, self, target) };
        },
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          if (overheated(self, ctx.tick)) {
            // Back down to 0 over the 4 seconds.
            ctx.memory[HEAT] = Math.max(0, heatOf(self) - maxHeat / ticks(overheatSeconds));
            return;
          }
          if (Number(ctx.memory[OVERHEATED] ?? -1) === ctx.tick) ctx.memory[HEAT] = 0;
          const quiet = ctx.tick - Number(ctx.memory.lastBasic ?? -1e9) >= ticks(quietBasic) && ctx.tick - Number(ctx.memory.lastUlt ?? -1e9) >= ticks(quietUlt);
          if (quiet && heatOf(self) > 0) ctx.memory[HEAT] = Math.max(0, heatOf(self) - decay / 30);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key.startsWith("Q")) ctx.memory.flameUntil = ctx.tick + ticks(flameSeconds);
          if (key === "R") {
            ctx.memory.lastUlt = ctx.tick;
            return;
          }
          if (key.startsWith("E")) ctx.memory.harpoonAt = ctx.tick;
          ctx.memory.lastBasic = ctx.tick;
          addHeat(ctx, heatPerCast);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E" || key === "Ehot") harpoonHit(ctx, key === "Ehot");
          if (key === "Q" || key === "Qhot") {
            // A fresh scorch deals one more instance at once.
            const until = Number(ctx.memory.scorchUntil ?? -1);
            if (ctx.tick >= until) ctx.apply({ type: "damage", damageType: "magic", amount: key === "Qhot" ? flameTickHot : flameTick, label: q.name });
            const dot = ctx.enemy.statuses.find((s) => s.kind === "dot" && (s.key === "Q" || s.key === "Qhot") && s.source === ctx.self.side);
            ctx.memory.scorchUntil = dot ? dot.endTick : ctx.tick;
          }
        },
        onAttackHit(ctx) {
          if (overheated(ctx.self, ctx.tick)) ctx.apply({ type: "damage", damageType: "magic", amount: overheatHit, label: innate.name });
        },
      },
    };
  },
};

export default rumble;
