/** Camille: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { damagePerSecond } from "../../engine/budget";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import type { HookContext } from "../../engine/sim/spec";
import { maxHp, ticks } from "./util";

const camille: KitModule = {
  champion: "Camille",
  build(kit) {
    const innate = kit.ability("Adaptive Defenses");
    const q = kit.ability("Precision Protocol");
    const w = kit.ability("Tactical Sweep");
    const hook = kit.ability("Hookshot");
    const dive = kit.ability("Wall Dive");
    const r = kit.ability("The Hextech Ultimatum");

    const shieldEvery = innate.field("staticCooldown");
    const shieldShare = innate.levelValue("grants her a shield equal to 10 / 15 / 20 / 25 (based on level)% of her maximum health") / 100;
    const shieldSeconds = innate.quoted("lasting for 2 seconds", 0);
    const qWindow = q.quoted("empowers her next basic attack within 4 seconds", 0);
    const qRange = q.quoted("gain 50 bonus range", 0);
    const recastAfter = q.quoted("If Precision Protocol is recast after 1.5 seconds of the first attack", 0);
    const recastWindow = q.quoted("can then be recast within the next 3.5 seconds", 0);
    const trueShare = 1;
    const sweepSeconds = w.quoted("sweeps her leg in a cone in the target direction over 1.1 seconds", 0);
    const inner = w.field("effectRadius", "Inner radius");
    const outer = w.field("effectRadius", "Outer radius");
    const zoneSeconds = r.number("Zone Duration");
    const zoneRadius = r.field("effectRadius");
    const hookTime = 0.5;
    kit.assume("Precision Protocol's recast waits the 1.5 seconds that make it deal true damage (100% of the attack at level 16 and up).");
    kit.assume(`With walls nearby, Hookshot reaches a wall and Wall Dive lands ${hookTime} seconds after the cast.`);
    kit.assume("Tactical Sweep's outer-cone slow, which decays over 2 seconds, is taken as 50% for 2 seconds.");
    kit.assume("Adaptive Defenses shields against the damage type the enemy deals most of.");

    const zoneOf = (ctx: HookContext) => ctx.tick < Number(ctx.memory.zoneUntil ?? -1);

    const behavior: Behavior = (view) => {
      // While sweeping, keep the enemy in the outer half of the cone.
      if (view.self.action?.kind === "cast" && view.self.action.ability === "W") {
        const gap = Math.abs(view.self.x - view.enemy.x);
        if (gap < inner + 40) return { kind: "move", direction: -1 };
        if (gap > outer - 30) return { kind: "move", direction: 1 };
        return { kind: "move", direction: 0 };
      }
      return defaultBehavior(view);
    };

    return {
      // Adaptive Defenses' shield, about once per cooldown.
      budget: { healing: (self) => (shieldShare * maxHp(self)) / shieldEvery },
      hooks: {
        onAttackHit(ctx) {
          if (ctx.tick >= Number(ctx.memory.shieldReady ?? 0)) {
            ctx.memory.shieldReady = ctx.tick + ticks(shieldEvery);
            const enemyDamage = damagePerSecond(ctx.enemy.spec, ctx.self.spec);
            const type = enemyDamage.magic > enemyDamage.physical ? "magic" : "physical";
            ctx.apply({ type: "shield", amount: { base: shieldShare * maxHp(ctx.self) }, duration: shieldSeconds, shieldType: type }, true);
          }
          if (zoneOf(ctx)) ctx.apply({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetCurrentHP: r.shareOf("Bonus Magic Damage") } }, label: "The Hextech Ultimatum" });
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.zoneX = ctx.self.x;
            ctx.memory.zoneUntil = ctx.tick + ticks(zoneSeconds);
          }
        },
        onTick(ctx) {
          // The target can't leave the zone.
          if (!zoneOf(ctx)) return;
          const center = Number(ctx.memory.zoneX);
          if (Math.abs(ctx.enemy.x - center) > zoneRadius) ctx.enemy.x = center + Math.sign(ctx.enemy.x - center) * zoneRadius;
        },
      },
      behavior,
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: 0,
          chainCooldown: "last",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: qWindow,
              bonusRange: qRange,
              uncancellable: true,
              resetAttack: true,
              onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: q.shareOf("Bonus Physical Damage") } } }],
            },
            { type: "stat", stat: "moveSpeedPercent", amount: { base: q.fraction("Bonus Movement Speed") }, duration: q.quoted("grant her bonus movement speed for 1 second", 0) },
          ],
        },
        {
          key: "Q2",
          name: `${q.name} (recast)`,
          slot: "Q",
          cooldown: 0,
          castTime: 0,
          chain: { root: "Q", index: 2, window: recastAfter + recastWindow, delay: recastAfter },
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: qWindow,
              bonusRange: qRange,
              uncancellable: true,
              resetAttack: true,
              // Doubled bonus, and the whole attack as true damage.
              split: { physical: 0, magic: 0, true: trueShare },
              onHit: [{ type: "damage", damageType: "true", amount: { base: 0, ratios: { AD: q.shareOf("Increased Mixed Damage") } } }],
            },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: sweepSeconds,
          moveWhileCasting: true,
          delivery: {
            kind: "area",
            near: 0,
            far: outer,
            delay: 0,
            anchor: "caster",
            bands: [{ from: 0, to: inner, onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Physical Damage") }] }],
          },
          onHit: [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "damage", damageType: "physical", amount: w.formula("Outer Cone Bonus Damage"), lifesteal: 1, label: "Tactical Sweep (outer cone)" },
            { type: "cc", cc: "slow", strength: 0.5, duration: w.quoted("slowed by 80% decaying over 2 seconds", 1) },
          ],
        },
        {
          key: "E",
          name: `${hook.name} and ${dive.name}`,
          slot: "E",
          cooldown: hook.cooldown(),
          cost: hook.cost(),
          castTime: hookTime,
          usable: (_unit, world) => world.settings.environment.walls,
          delivery: { kind: "dash", direction: "toward", distance: dive.field("targetRange", "Increased dash range towards champions"), speed: dive.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 340), hitRadius: dive.field("effectRadius") },
          onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: dive.fraction("Bonus Attack Speed") }, duration: dive.quoted("gains bonus attack speed for 5 seconds", 0) }],
          onHit: [
            { type: "damage", damageType: "physical", amount: dive.formula("Physical Damage") },
            { type: "cc", cc: "stun", duration: dive.quoted("as well as stunning them for 0.75 seconds", 0) },
          ],
          flags: { knockdown: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: 0,
          onCastStart: [
            { type: "state", state: "untargetable", duration: r.quoted("leaps with displacement immunity towards the target enemy champion over 0.5 seconds", 0) },
            { type: "state", state: "displacementImmune", duration: 0.5 },
          ],
          delivery: { kind: "dash", direction: "target", distance: r.field("targetRange"), speed: r.field("targetRange") / 0.5, hitRadius: 100 },
          onHit: [{ type: "mark", key: "ultimatum", duration: zoneSeconds }],
          roles: ["engage"],
          flags: { grounded: true, knockdown: false },
        },
      ],
    };
  },
};

export default camille;
