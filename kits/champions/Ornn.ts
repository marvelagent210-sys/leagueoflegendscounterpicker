/** Ornn: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { type CCType, IMMOBILIZING } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import type { Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { FOREVER, areaAt, ticks } from "./util";

const BRITTLE = "brittle";

const ornn: KitModule = {
  champion: "Ornn",
  build(kit) {
    const forge = kit.ability("Living Forge");
    const q = kit.ability("Volcanic Rupture");
    const w = kit.ability("Bellows Breath");
    const e = kit.ability("Searing Charge");
    const r = kit.ability("Call of the Forge God");

    // Living Forge: more bonus resistances and health after five Masterwork upgrades, and 1000 gold of stats on his own item.
    const forged = forge.quoted("for a total increase of 30% to each stat after the maximum of 5 upgrades", 0) / 100;
    const masterwork = forge.quoted("increasing the gold value of all upgradeable stats on the item by exactly 1000", 0);
    // Brittle: crowd control lasts 30% longer; immobilizing it bursts for a share of maximum health.
    const brittleShare = forge.levelValue("consume the debuff to deal bonus magic damage equal to") / 100;
    const brittleLonger = forge.quoted("cause the crowd control to last 30% longer", 0) / 100;
    const knockBackSeconds = forge.quoted("knock them back a short distance over 0.4 seconds", 0);
    const knockBack = 100;
    // Volcanic Rupture's pillar: 200 units behind the enemy hit, standing for 4 seconds after 1.125.
    const pillarBehind = q.quoted("200 units behind the first enemy champion struck", 0);
    const pillarDelay = q.quoted("After a 1.125-second delay, a magma pillar then erupts", 0);
    const pillarSeconds = q.quoted("linger as impassible terrain for 4 seconds", 0);
    // Bellows Breath: five gouts over 0.75 seconds.
    const breathSeconds = w.quoted("marches forward in the target direction over 0.75 seconds", 0);
    const breathEvery = w.quoted("dealing magic damage every 0.15 seconds", 0);
    const brittleSeconds = w.quoted("will apply Brittle for 3 seconds", 0);
    // Searing Charge: a shockwave where it hits terrain.
    const chargeDistance = e.field("targetRange", "Dash distance");
    const shockRadius = e.field("effectRadius", "Shockwave radius");
    const shockStun = e.quoted("knocks up and stuns nearby enemies for 1.25 seconds", 0);
    // Call of the Forge God.
    const elementalDelay = 2.2;
    const headbutt = 2.4;
    kit.assume(`By level 20 Ornn has made all 5 Masterwork upgrades (+${Math.round(forged * 100)}% bonus armor, magic resistance and health) and his own item's adds ${masterwork} gold of stats.`);
    kit.assume(`Ornn's attacks on Brittle enemies knock them back ${knockBack} units ("a short distance").`);
    kit.assume("Searing Charge's shockwave goes off where it meets a wall behind the enemy (with walls nearby) or Volcanic Rupture's pillar; the 0.5-second lockout after it is left out.");
    kit.assume("Volcanic Rupture's pillar doesn't block movement on the line; it only stops Searing Charge.");
    kit.assume(`Call of the Forge God's elemental reaches the enemy ${elementalDelay} s after the cast, and Ornn always headbutts it back ${headbutt} s after the cast; his recast dash is left out.`);
    const callReach = 600;
    kit.assume(`Ornn calls the elemental in a fight once the enemy is within ${callReach} units: the headbutt lands even when the first pass is dodged.`);

    const gout: Effect = { type: "damage", damageType: "magic", amount: w.formula("Magic Damage Per Tick"), minimum: w.formula("Minimum/Minion Damage Per Tick") };
    const brittle: Effect[] = [
      { type: "mark", key: BRITTLE, duration: brittleSeconds },
      // Courage revision 4064595 explicitly adds Courage and Brittle, conflicting with
      // Tenacity revision 4021927's multiplicative group C. Tag only the documented pair.
      { type: "state", state: "tenacity", value: -brittleLonger, duration: brittleSeconds, tenacityGroup: "courage-brittle" },
    ];
    const isBrittle = (unit: Unit) => unit.statuses.some((s) => s.kind === "mark" && s.key === BRITTLE);
    const clearBrittle = (unit: Unit) => {
      unit.statuses = unit.statuses.filter((s) => !(s.kind === "mark" && s.key === BRITTLE) && !(s.kind === "state" && s.key === "tenacity" && s.value === -brittleLonger));
    };
    /** Brittle bursts when an immobilizing effect lands on it (already lengthened by its tenacity cut). */
    const shatter = (ctx: HookContext) => {
      const enemy = ctx.enemy;
      if (!isBrittle(enemy)) return;
      const held = enemy.statuses.some((s) => s.kind === "cc" && s.startTick === ctx.tick && (IMMOBILIZING.has(s.key as CCType) || s.key === "silence"));
      if (!held) return;
      clearBrittle(enemy);
      ctx.apply({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: brittleShare } }, label: "Brittle" });
    };

    const chargeCast = e.castTime();
    const chargeDamage: Effect = { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") };
    const bellowsEvery = w.cooldown();
    // Terrain Searing Charge can hit beyond the enemy: the pillar, and a wall behind it.
    const terrain = (unit: Unit, enemy: Unit, world: World): number | undefined => {
      const dir = directionTo(unit, enemy);
      const ahead = (x: number) => (x - enemy.x) * dir >= 0 && Math.abs(x - unit.x) <= chargeDistance;
      const points: number[] = [];
      const pillarFrom = Number(unit.memory.pillarFrom ?? Number.POSITIVE_INFINITY);
      const pillarUntil = Number(unit.memory.pillarUntil ?? -1);
      // The pillar has to be up when the charge gets there.
      if (world.tick + ticks(chargeCast) >= pillarFrom && world.tick < pillarUntil) points.push(Number(unit.memory.pillarX));
      if (world.settings.environment.walls) points.push(enemy.x + dir * world.settings.environment.wallDistance);
      const reachable = points.filter(ahead).sort((a, b) => Math.abs(a - unit.x) - Math.abs(b - unit.x));
      return reachable[0];
    };

    // Searing Charge only into terrain close enough behind the enemy for the shockwave to catch it.
    const chargeLands = (unit: Unit, world: World) => {
      const enemy = world.units[unit.side === 0 ? 1 : 0];
      const wall = terrain(unit, enemy, world);
      return wall !== undefined && Math.abs(wall - enemy.x) <= shockRadius;
    };

    // The headbutt is what makes the call worth it, so Ornn doesn't wait for the first pass to be likely to land.
    const behavior: Behavior = (view) => {
      const call = view.self.spec.abilities.find((a) => a.key === "R");
      if (call && (view.mode === "fight" || view.mode === "hold") && view.distance <= callReach && canCast(view.world, view.self, call)) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    return {
      behavior,
      statConversions: { directBonusHealthMultiplier: 1 + forged },
      extraGold: masterwork,
      budget: {
        // Living Forge: each point of bonus armor, magic resistance and health bought is worth 30% more.
        statMultipliers: { armor: 1 + forged, mr: 1 + forged, hp: 1 + forged },
        // Brittle bursting about every ten seconds (Bellows Breath's cooldown).
        damage: (_self, target) => ({ magic: (brittleShare * derive(target).maxHp) / bellowsEvery }),
      },
      hooks: {
        onStart(ctx) {
          // Living Forge: 30% more of the bonus armor, magic resistance and health bought.
          const bonus = ctx.self.spec.bonus ?? {};
          if (bonus.armor) ctx.buff("forgeArmor", "armor", forged * bonus.armor, FOREVER);
          if (bonus.mr) ctx.buff("forgeMR", "MR", forged * bonus.mr, FOREVER);
          if (bonus.hp) ctx.apply({ type: "stat", stat: "health", amount: { base: forged * bonus.hp }, duration: FOREVER }, true);
        },
        onAttackHit(ctx) {
          // On a Brittle enemy, the attack knocks it back and ends Brittle (without its burst).
          if (!isBrittle(ctx.enemy)) return;
          clearBrittle(ctx.enemy);
          ctx.apply({ type: "displace", direction: "away", distance: knockBack, duration: knockBackSeconds });
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E") ctx.memory.chargeHit = true;
          if (key === "Q") {
            // The pillar rises 200 units behind the enemy.
            const dir = directionTo(ctx.self, ctx.enemy);
            ctx.memory.pillarX = ctx.enemy.x + dir * pillarBehind;
            ctx.memory.pillarFrom = ctx.tick + ticks(pillarDelay);
            ctx.memory.pillarUntil = ctx.tick + ticks(pillarDelay + pillarSeconds);
          }
          shatter(ctx);
          // Brittle from the elemental's passes, and from Bellows Breath's last gout (its channel over).
          const lastGout = key === "W" && ctx.self.action?.kind !== "channel";
          if (key === "R" || key === "R2" || lastGout) for (const effect of brittle) ctx.apply(effect);
        },
        onCast(ctx) {
          if (ctx.ability.key !== "E") return;
          // Where the charge will meet terrain, fixed as it sets off.
          const wall = terrain(ctx.self, ctx.enemy, ctx.world);
          ctx.memory.charging = wall !== undefined;
          ctx.memory.chargeWall = wall ?? 0;
          ctx.memory.chargeHit = false;
        },
        onTick(ctx) {
          if (!ctx.memory.charging) return;
          const self = ctx.self;
          const action = self.action;
          if (action?.kind !== "dash" || action.ability !== "E") {
            ctx.memory.charging = false;
            return;
          }
          // Meeting terrain, the charge stops there and the shockwave goes off.
          const wall = Number(ctx.memory.chargeWall);
          const dir = Math.sign(action.perTick);
          if ((self.x - wall) * dir < -Math.abs(action.perTick)) return;
          self.x = wall - dir;
          self.action = undefined;
          ctx.memory.charging = false;
          ctx.memory.pillarUntil = -1;
          ctx.log("Searing Charge hits terrain");
          areaAt(ctx, "Eshock", self.x, shockRadius, 0, [
            ...(!ctx.memory.chargeHit ? [chargeDamage] : []),
            { type: "displace", direction: "away", distance: 0, duration: shockStun },
            { type: "cc", cc: "stun", duration: shockStun },
          ]);
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
            { type: "cc", cc: "slow", strength: q.quoted("slows them by 40% for 2 seconds", 0) / 100, duration: q.quoted("slows them by 40% for 2 seconds", 1) },
          ],
          flags: { projectile: true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: 0,
          onCastStart: [{ type: "state", state: "displacementImmune", duration: breathSeconds }],
          delivery: { kind: "self" },
          channel: {
            duration: breathSeconds,
            interruptible: false,
            interval: breathEvery,
            range: w.field("targetRange", "Flame standard length"),
            // Four gouts during the march and the last one as it ends: five in all.
            onTick: [gout],
            onComplete: [gout],
          },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          usable: chargeLands,
          delivery: { kind: "dash", direction: "toward", distance: chargeDistance, speed: e.field("speed"), hitRadius: 0, through: true },
          onHit: [chargeDamage],
          flags: { grounded: true, knockdown: true },
        },
        {
          // Searing Charge's shockwave, set off by the charge meeting terrain.
          key: "Eshock",
          name: `${e.name} (shockwave)`,
          slot: "other",
          cooldown: 0,
          castTime: 0,
          usable: () => false,
          delivery: { kind: "self" },
          onHit: [chargeDamage, { type: "displace", direction: "away", distance: 0, duration: shockStun }],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "circle", range: r.field("effectRadius", "first pass"), radius: r.field("width") / 2, delay: elementalDelay },
          onHit: [
            { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: r.fraction("Slow"), duration: r.quoted("slows them for 2 seconds", 0) },
          ],
        },
        {
          key: "R2",
          name: `${r.name} (headbutt)`,
          slot: "R",
          cooldown: 0,
          castTime: 0,
          chain: { root: "R", index: 2, window: headbutt, delay: r.quoted("Call of the Forge God can be recast after 1.25 seconds", 0), auto: true },
          usable: () => false,
          delivery: { kind: "line", range: r.field("effectRadius", "second pass"), width: r.field("width"), speed: r.fieldNumbers("speed")[2] ?? 1250 },
          onHit: [
            { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
            { type: "displace", direction: "away", distance: 0, duration: r.quoted("knocks them up and stuns them for 1 second", 0) },
            { type: "cc", cc: "stun", duration: r.quoted("knocks them up and stuns them for 1 second", 0) },
          ],
          flags: { projectile: false },
        },
      ],
    };
  },
};

export default ornn;
