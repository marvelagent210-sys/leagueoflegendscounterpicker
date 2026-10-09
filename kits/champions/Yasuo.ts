/** Yasuo: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { bump, counter, flat, ticks } from "./util";

const yasuo: KitModule = {
  champion: "Yasuo",
  build(kit) {
    const innate = kit.ability("Way of the Wanderer");
    const q = kit.ability("Steel Tempest");
    const w = kit.ability("Wind Wall");
    const e = kit.ability("Sweeping Blade");
    const r = kit.ability("Last Breath");

    // Intent: crit chance doubled; each 1% beyond 100% becomes 0.5 bonus AD.
    innate.quote("Yasuo's total critical strike chance is doubled from all other sources");
    const adPerExcessCrit = innate.quoted("every 1% critical strike chance in excess of 100% is converted into 0.5 bonus attack damage", 2);
    // Resolve: Flow from distance traveled; a shield when hit at 100 Flow.
    const unitsPerFlow = innate.levelValue("Yasuo generates a stack of Flow for every 59 / 52.5 / 46 (based on level) units");
    const flowShield = innate.levelValue("Yasuo consumes all Flow to grant himself a shield for 125 – 600 (based on level)");
    const flowSeconds = innate.quoted("that lasts for 1 second", 0);
    // Steel Tempest: its cooldown falls with bonus attack speed, from 4 s to 1.33 s at 111% bonus attack speed.
    const tempestMax = 4;
    const tempestMin = 1.33333;
    const tempestFloorAt = 1.1111;
    const stormSeconds = q.quoted("Yasuo generates a stack of Gathering Storm for 6 seconds", 0);
    const knockUp = q.quoted("additionally knocks up enemies hit for 0.9 seconds", 0);
    const thrustCast = 0.35;
    // Sweeping Blade on the same target only "once every few seconds".
    const sameTarget = 6;
    const minionDash = 1.5;
    const ride = e.formula("Bonus Damage per Stack");
    kit.assume(`Sweeping Blade can be used on the same enemy once every ${sameTarget} seconds (the wiki only says "every few seconds").`);
    kit.assume(`With a minion wave, Sweeping Blade through minions gives a dash toward or away from the enemy every ${minionDash} seconds.`);
    kit.assume("Yasuo starts every fight with full Flow; Steel Tempest's cast time is taken at 0 bonus attack speed.");
    kit.assume("Last Breath's armor penetration on critical strikes isn't modeled.");
    kit.assume("Crit chance bought counts double for Yasuo (the stat budget values it that way).");

    const thrustHit: Effect[] = [
      { type: "damage", damageType: "physical", amount: flat(q.formula("Physical Damage").base) },
      { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: (q.formula("Physical Damage").ratios?.AD ?? 0) } }, canCrit: true },
    ];
    const storm = (unit: Unit, world: World) => (world.tick < Number(unit.memory.stormUntil ?? -1) ? Number(unit.memory.storm ?? 0) : 0);
    const tempest = (index: "Q" | "Q3", spec: Omit<AbilitySpec, "key" | "name" | "slot" | "cooldown" | "castTime">): AbilitySpec => ({
      key: index,
      name: index === "Q" ? q.name : `${q.name} (whirlwind)`,
      slot: "Q",
      cooldown: tempestMax,
      castTime: thrustCast,
      ...spec,
    });

    return {
      // Intent doubles the crit chance bought.
      budget: { statMultipliers: { crit: 2 } },
      hooks: {
        onStart(ctx) {
          const doubled = 2 * (ctx.self.spec.bonus?.critChance ?? 0);
          ctx.buff("intent", "critChance", Math.min(doubled, 1) - (ctx.self.spec.bonus?.critChance ?? 0), 1e9);
          if (doubled > 1) ctx.buff("intentAD", "AD", (doubled - 1) * 100 * adPerExcessCrit, 1e9);
          ctx.memory.flow = 100;
          ctx.memory.lastX = ctx.self.x;
        },
        onTick(ctx) {
          const moved = Math.abs(ctx.self.x - Number(ctx.memory.lastX ?? ctx.self.x));
          ctx.memory.lastX = ctx.self.x;
          ctx.memory.flow = Math.min(100, Number(ctx.memory.flow ?? 0) + moved / unitsPerFlow);
          if (ctx.tick >= Number(ctx.memory.stormUntil ?? -1)) ctx.memory.storm = 0;
        },
        beforeDamageTaken(ctx) {
          if (Number(ctx.memory.flow ?? 0) < 100) return;
          ctx.memory.flow = 0;
          ctx.apply({ type: "shield", amount: flat(flowShield), duration: flowSeconds }, true);
          ctx.log("Flow shield");
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "Q3") {
            // Both share Steel Tempest's cooldown, shortened by bonus attack speed.
            const bonusAS = Math.min(tempestFloorAt, derive(ctx.self).bonusAttackSpeed);
            const cooldown = tempestMax - ((tempestMax - tempestMin) * bonusAS) / tempestFloorAt;
            ctx.self.cooldownReady.Q = ctx.tick + ticks(cooldown);
            if (key === "Q3") ctx.memory.storm = 0;
          }
          if (key === "R") ctx.memory.flow = 100;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory.storm = Math.min(2, Number(ctx.memory.storm ?? 0) + 1);
            ctx.memory.stormUntil = ctx.tick + ticks(stormSeconds);
          }
          if (key === "E") {
            // Ride the Wind: +25% per earlier Sweeping Blade, up to 4.
            const stacks = counter(ctx, "ride");
            if (stacks > 0) ctx.apply({ type: "damage", damageType: "magic", amount: { base: ride.base * stacks, ratios: { bonusAD: (ride.ratios?.bonusAD ?? 0) * stacks, AP: (ride.ratios?.AP ?? 0) * stacks } }, label: "Ride the Wind" });
            bump(ctx, "ride", 4, 5);
          }
        },
      },
      abilities: [
        tempest("Q", {
          usable: (unit, world) => storm(unit, world) < 2,
          delivery: { kind: "line", range: q.field("range", "Thrust range"), width: q.field("width", "Thrust width") },
          onHit: thrustHit,
          flags: { appliesOnHit: true, projectile: false },
        }),
        tempest("Q3", {
          cooldownKey: "Q",
          usable: (unit, world) => storm(unit, world) >= 2,
          delivery: { kind: "line", range: q.field("range", "Whirlwind missile range"), width: q.field("width", "Whirlwind missile width"), speed: q.field("speed") },
          onHit: [...thrustHit, { type: "displace", direction: "away", distance: 0, duration: knockUp }],
          flags: { appliesOnHit: true, projectile: true },
        }),
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [{ type: "projectileWall", distance: 300, duration: w.quoted("raises a wall of wind in the target direction for 4 seconds", 0) }],
          roles: ["defense"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: sameTarget,
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "toward", distance: e.field("range", "Dash distance"), speed: e.field("speed") + 0.6 * (kit.champion.forms[0]?.stats.moveSpeed ?? 345), hitRadius: 100 },
          onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
          flags: { grounded: true, knockdown: true },
        },
        {
          key: "Eminion",
          name: `${e.name} (through minions)`,
          slot: "E",
          cooldown: minionDash,
          castTime: 0,
          usable: (_unit, world) => world.settings.environment.minions,
          delivery: { kind: "dash", direction: "away", distance: e.field("range", "Dash distance"), speed: e.field("speed") + 0.6 * (kit.champion.forms[0]?.stats.moveSpeed ?? 345) },
          roles: ["escape"],
          flags: { grounded: true, knockdown: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          requires: { enemyCC: ["airborne"] },
          delivery: { kind: "blink", direction: "toward", distance: r.field("targetRange"), hitRadius: r.field("effectRadius", "Anchored around the target") },
          onHit: [
            { type: "displace", direction: "away", distance: 0, duration: r.quoted("knocks up all nearby airborne enemy champions for 1 second", 0) },
            { type: "delayed", delay: 1, effects: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage") }] },
          ],
          flags: { grounded: true },
        },
      ],
    };
  },
};

export default yasuo;
