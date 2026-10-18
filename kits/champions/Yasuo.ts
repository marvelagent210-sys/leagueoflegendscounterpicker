/** Yasuo: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { abilityHit, canTarget } from "../../engine/sim/combat";
import { ccTypes, derive, hasState } from "../../engine/sim/derived";
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
    q.fieldNumbers("staticCooldown");
    const cooldownCurve = q.record.fields.staticCooldown?.values[0]?.series;
    if (cooldownCurve?.kind !== "variable") throw new Error("Yasuo's Steel Tempest cooldown curve changed shape");
    const tempestMax = Number(cooldownCurve.values[0]);
    const tempestMin = Number(cooldownCurve.values.at(-1));
    const tempestFloorAt = Number(cooldownCurve.points.at(-1)) / 100;
    const tempestCooldown = (unit: Unit) => tempestMax - (tempestMax - tempestMin) * Math.min(tempestFloorAt, Math.max(0, derive(unit).bonusAttackSpeed)) / tempestFloorAt;
    const stormSeconds = q.quoted("Yasuo generates a stack of Gathering Storm for 6 seconds", 0);
    const knockUp = q.quoted("additionally knocks up enemies hit for 0.9 seconds", 0);
    const thrustTimes = "Thrust Cast Time: 0.35 / 0.33 / 0.297 / 0.264 / 0.231 / 0.198 / 0.175 (based on bonus attack speed)";
    const whirlwindTimes = "Whirlwind Cast Time: 0.35 / 0.33 / 0.297 / 0.28 (based on bonus attack speed)";
    const thrustCast = q.quoted(thrustTimes, 0);
    const thrustFloor = q.quoted(thrustTimes, 6);
    const whirlwindFloor = q.quoted(whirlwindTimes, 3);
    q.quote("Life steal will heal based on the damage dealt to the first target hit");
    q.quote("Spell shield does not prevent a stack of Gathering Storm from being gained");
    q.quote("In either case Yasuo still gains a stack of Gathering Storm and his whirlwind knock-up cannot be negated by parries");
    // The source's pp widget supplies the formula and coordinates discarded by formatted
    // custominfo: revision 4072892, formula=0.35-0.035 per 24% bonus attack speed.
    if (q.record.page.revid !== 4072892) throw new Error("Yasuo's Steel Tempest cast-time curve needs review against the new source revision");
    kit.evidence.push({ ability: q.name, page: q.record.page.title, revid: q.record.page.revid, text: "Cast-time source widget: 0.35-0.035 per 24% bonus attack speed; thrust capped at 50% reduction at 120%, whirlwind capped at 20% reduction at 48%." });
    const tempestCast = (unit: Unit, floor: number) => Math.max(floor, thrustCast - 0.035 * Math.max(0, derive(unit).bonusAttackSpeed) / 0.24);
    const breathSeconds = r.quoted("knocks up all nearby airborne enemy champions for 1 second", 0);
    const breathDamage: Effect = { type: "damage", damageType: "physical", amount: r.formula("Physical Damage") };
    const armorIgnore = r.quoted("critical strikes ignores 60% of the target's bonus armor", 0) / 100;
    const armorIgnoreSeconds = r.quoted("For the next 15 seconds", 0);
    r.quote("The percentage bonus armor ignorance stacks additively with sources of percentage armor penetration");
    r.quote("Yasuo gains the bonus armor ignorance on-cast");
    r.quote("While performing Last Breath, Yasuo is locked out of performing actions");
    r.quote("Spell shield will not prevent Last Breath from being cast and the target will be knocked up and dealt the damage");
    // Sweeping Blade on the same target: its per-target cooldown, from the start of the dash.
    const sameTarget = e.field("targetCooldown");
    const dashDistance = e.field("range", "Dash distance");
    const dashFlow = e.quoted("Sweeping Blade will generate 7.5 Flow stacks per cast that travels the maximum distance", 0);
    const ghostSeconds = e.quoted("becomes ghosted for 2 seconds", 0);
    e.quote("Yasuo will be knocked down by any immobilizing or polymorphing crowd control during the dash");
    e.quote("Sleep does not count for knocking the dash down");
    const minionDash = 1.5;
    const ride = e.formula("Bonus Damage per Stack");
    kit.assume(`With a minion wave, Sweeping Blade through minions gives a dash toward or away from the enemy every ${minionDash} seconds.`);
    kit.assume("Yasuo starts every fight with full Flow.");
    kit.assume("A partial Sweeping Blade generates its documented 7.5 Flow per full dash in proportion to the distance traveled.");
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
      cooldownFor: tempestCooldown,
      staticCooldown: true,
      castTime: thrustCast,
      castTimeFor: (unit) => tempestCast(unit, index === "Q" ? thrustFloor : whirlwindFloor),
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
          const sweeping = ctx.memory.flowMotion === "E" || ctx.memory.flowMotion === "Eminion";
          ctx.memory.flow = Math.min(100, Number(ctx.memory.flow ?? 0) + moved * (sweeping ? dashFlow / dashDistance : 1 / unitsPerFlow));
          const dash = ctx.self.action;
          if (dash?.kind === "dash" && (dash.ability === "E" || dash.ability === "Eminion")) {
            if ([...ccTypes(ctx.self)].some((type) => (IMMOBILIZING.has(type) && type !== "sleep") || type === "polymorph")) {
              ctx.self.action = dash.resume;
              ctx.log("Sweeping Blade knocked down");
            }
          }
          ctx.memory.flowMotion = ctx.self.action?.kind === "dash" ? ctx.self.action.ability : "";
          if (ctx.tick >= Number(ctx.memory.stormUntil ?? -1)) ctx.memory.storm = 0;
          const action = ctx.self.action;
          if (action?.kind === "channel" && action.ability === "R" && ctx.tick < action.endTick) {
            const airborne = ctx.enemy.statuses.some((s) => s.kind === "cc" && (s.key === "airborne" || s.key === "suspension") && s.endTick > ctx.tick);
            // The documented suspension ends early when its only target leaves it or sight.
            if (!airborne || !ctx.enemy.alive || !canTarget(ctx.enemy, ctx.self)) {
              ctx.self.action = undefined;
              if (ctx.enemy.alive) abilityHit(ctx.world, ctx.self, ctx.enemy, ctx.self.spec.abilities.find((a) => a.key === "R")!, [breathDamage]);
              ctx.enemy.forced = undefined;
            }
          }
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
            if (key === "Q3") ctx.memory.storm = 0;
          }
          if (key === "R") {
            ctx.memory.flow = 100;
            ctx.memory.storm = 0;
            ctx.memory.breathAt = ctx.tick;
            ctx.buff("lastBreathArmorIgnore", "criticalBonusArmorIgnore", armorIgnore, armorIgnoreSeconds);
            // Last Breath consumes the shield while still applying its suspension and damage.
            const shield = ctx.enemy.statuses.find((s) => s.kind === "state" && s.key === "spellShield");
            if (shield) {
              shield.charges = (shield.charges ?? 1) - 1;
              if (shield.charges <= 0) ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== shield);
            }
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.storm = Math.min(2, Number(ctx.memory.storm ?? 0) + 1);
            ctx.memory.stormUntil = ctx.tick + ticks(stormSeconds);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E") {
            // Ride the Wind: +25% per earlier Sweeping Blade, up to 4.
            const stacks = counter(ctx, "ride");
            if (stacks > 0) ctx.apply({ type: "damage", damageType: "magic", amount: { base: ride.base * stacks, ratios: { bonusAD: (ride.ratios?.bonusAD ?? 0) * stacks, AP: (ride.ratios?.AP ?? 0) * stacks } }, label: "Ride the Wind" });
            bump(ctx, "ride", 4, 5);
          }
          if (key === "R" && ctx.tick > Number(ctx.memory.breathAt ?? ctx.tick)) ctx.enemy.forced = undefined;
        },
      },
      abilities: [
        tempest("Q", {
          usable: (unit, world) => storm(unit, world) < 2,
          delivery: { kind: "line", range: q.field("range", "Thrust range"), width: q.field("width", "Thrust width") },
          onHit: thrustHit,
          flags: { appliesOnHit: true, appliesLifeSteal: true, parry: true, dodgeKeepsEffects: true, projectile: false },
        }),
        tempest("Q3", {
          cooldownKey: "Q",
          usable: (unit, world) => storm(unit, world) >= 2,
          delivery: { kind: "line", range: q.field("range", "Whirlwind missile range"), width: q.field("width", "Whirlwind missile width"), speed: q.field("speed") },
          onHit: [...thrustHit, { type: "displace", direction: "away", distance: 0, duration: knockUp }],
          flags: { appliesOnHit: true, appliesLifeSteal: true, parry: true, dodgeKeepsEffects: true, projectile: true },
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
          staticCooldown: true,
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "toward", distance: dashDistance, speed: e.field("speed") + 0.6 * (kit.champion.forms[0]?.stats.moveSpeed ?? 345), hitRadius: 100, through: true },
          onSelf: [{ type: "state", state: "ghosted", duration: ghostSeconds }],
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
          onSelf: [{ type: "state", state: "ghosted", duration: ghostSeconds }],
          roles: ["escape"],
          flags: { grounded: true, knockdown: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          requires: { enemyCC: ["airborne", "suspension"] },
          usable: (unit, world) => {
            const enemy = world.units[unit.side === 0 ? 1 : 0];
            const hostileAirborne = enemy.statuses.some((s) => s.kind === "cc" && (s.key === "airborne" || s.key === "suspension") && s.source !== enemy.side && s.endTick > world.tick);
            return enemy.alive && hostileAirborne && canTarget(enemy, unit) && !hasState(enemy, "ccImmune") && !hasState(enemy, "displacementImmune");
          },
          delivery: { kind: "blink", direction: "toward", distance: r.field("targetRange"), hitRadius: r.field("effectRadius", "Anchored around the target"), through: true },
          onHit: [{ type: "displace", direction: "away", distance: 0, duration: breathSeconds }],
          channel: { duration: breathSeconds, interruptible: false, onComplete: [breathDamage] },
          flags: { grounded: true, spellShield: false },
        },
      ],
    };
  },
};

export default yasuo;
