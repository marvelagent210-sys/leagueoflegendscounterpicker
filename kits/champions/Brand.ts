/** Brand: impact-time Ablaze bonuses, independent burn clocks, detonation, and real duel bounces. */
import type { KitModule } from "../../engine/kits/compile";
import { numbersIn } from "../../engine/kits/context";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { abilityHit, addStatus, dealDamage, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Status, Unit } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const BURN = "Brand Ablaze:";

const brand: KitModule = {
  champion: "Brand",
  build(kit) {
    const passive = kit.ability("Blaze");
    const q = kit.ability("Sear");
    const w = kit.ability("Pillar of Flame");
    const e = kit.ability("Conflagration");
    const r = kit.ability("Pyroclasm");
    const duration = passive.quoted("for 4 seconds, stacking up to 3 times", 0);
    const maxStacks = passive.quoted("for 4 seconds, stacking up to 3 times", 1);
    const burnShare = passive.quoted("equal to 2% of their maximum health over 4 seconds", 0) / 100;
    const ringDelay = passive.quoted("after 2 seconds, consumes their stacks to explode");
    const immuneSeconds = passive.quoted("in the last 4 seconds");
    const explosion: Formula = {
      base: 0,
      ratios: { targetMaxHP: passive.levelValue("All enemies within the detonation") / 100 },
      products: [{ ratio: passive.quoted("(+ 2% per 100 AP)") / 100 / 100, stats: ["AP", "targetMaxHP"] }],
    };
    const explosionRadius = passive.field("effectRadius");
    const killMana = passive.levelValue("Killing an enemy afflicted with Ablaze");
    passive.quote("Each stack of Ablaze deals damage to the target individually and applies their damage ticks dependent on the time they were applied, even if the duration of all the stacks are refreshed");
    passive.quote("The explosion is not considered a tether effect and will not affect untargetable targets, even if the explosion originated from them");
    passive.quote("Ablaze is a debuff that persists through death");
    passive.quote("At sub-optimal applied times, 2 stacks will deal a minimum of 6% maximum health damage over 4 seconds, but will deal 7% maximum health at optimal applied times");
    const stunSeconds = q.quoted("The target is stunned for 1.75 seconds");
    const pillar = w.formula("Magic Damage");
    const ablazePillar = w.formula("Increased Damage");
    const pillarDelay = w.quoted("After a 0.627 delay");
    w.quote("The delay before the eruption does not include the cast time");
    const pyroHit = r.formula("Magic Damage");
    const bounceDelay = r.quoted("a 0.15-second delay between bounces");
    r.quote("up to four times");
    // The source spells out this count.
    const bounceMax = 4;
    const bounceRadius = r.field("effectRadius");
    const [pyroSpeed, pyroMaxSpeed] = r.fieldNumbers("speed");
    const speedField = r.record.fields.speed;
    const accelerationLabel = typeof speedField === "object" ? speedField.values[0]?.label : undefined;
    if (!accelerationLabel || !/^Acceleration \d+(?:\.\d+)?u\/s$/.test(accelerationLabel) || pyroSpeed === undefined || pyroMaxSpeed === undefined) throw new Error("Brand Pyroclasm speed/acceleration field needs review");
    const pyroAcceleration = numbersIn(accelerationLabel)[0]!;
    kit.evidence.push({ ability: r.name, page: r.record.page.title, revid: r.record.page.revid, text: `speed (${accelerationLabel}): ${speedField!.text}` });
    const acceleration = { perTick: pyroAcceleration / 900, maxPerTick: pyroMaxSpeed / 30 };
    const slow = r.fraction("Slow");
    const slowSeconds = r.quoted("The target is slowed for 0.25 seconds");
    r.quote("The fireball acquires a new valid, bounce target once the bounce delay finishes");
    r.quote("If the initial cast target uses spell shield, Pyroclasm will not bounce");
    r.quote("If the bounce is blocked by an enemy's spell shield it will not deal any damage, but it will keep on bouncing");
    r.quote("The target does not have to be visible for the fireball to bounce to them");
    r.quote("This does not apply if the target is Brand, as the missile would not be destroyed and would bounce from him even if he is untargetable");

    const burnInterval = 0.25;
    const burnPulses = duration / burnInterval;
    kit.assume("Blaze's committed source specifies 2% maximum-health damage over 4 seconds but no tick cadence; the model uses sixteen equal 0.25-second ticks per stack. Existing stacks preserve their independent pulse clocks when refreshed.");
    kit.assume("Blaze follows the description's explicit 2% per-stack formula. The same revision's illustrative notes claim 6–7% over 4 seconds for two stacks and 9–11% for three, which this equal per-stack model does not reproduce; this source inconsistency remains unresolved.");
    kit.assume(`Each Pyroclasm leg restarts at the sourced ${pyroSpeed} units/second and accelerates by ${pyroAcceleration} units/second each second, capped at the sourced ${pyroMaxSpeed}. The source does not explicitly state whether bounce legs retain velocity; this model resets it at each leg.`);
    kit.assume("Pyroclasm bounces only between the sole enemy champion and Brand, allowing three enemy hits when each intervening bounce has a target within 600 units. Extra minion/pet bounce targets and Conflagration's splash onto them are not modeled.");
    kit.assume("Blaze's stack clocks and detonation are tracked on the enemy champion; burn stacks on enemy pets and the explosion's splash damage to those pets are not modeled.");
    kit.assume("Blaze grants no pre-fight stacks. The duel ends on champion death, so a ring persisting through death cannot change its recorded result.");
    kit.assume("The stat-budget reference estimates sustained Ablaze uptime and detonation frequency from spell cooldowns; fight damage instead uses the actual landed hits, stack clocks, and bounce paths.");

    const burns = (target: Unit, owner: Unit, tick: number): Status[] => target.statuses.filter((s) => s.kind === "dot" && s.source === owner.side && s.key.startsWith(BURN) && s.endTick > tick);
    const burning = (self: Unit, target: Unit, tick: number) => burns(target, self, tick).length > 0;
    const addStack = (ctx: HookContext) => {
      const live = burns(ctx.enemy, ctx.self, ctx.tick);
      const endTick = ctx.tick + ticks(duration);
      for (const status of live) status.endTick = endTick;
      const cap = ctx.tick < Number(ctx.memory.blazeImmuneUntil ?? -1) ? 1 : maxStacks;
      if (live.length < cap) {
        addStatus(ctx.enemy, {
          kind: "dot", key: `${BURN}${ctx.world.nextId++}`, source: ctx.self.side, startTick: ctx.tick, endTick, value: 0,
          dot: { damageType: "magic", perHit: derive(ctx.enemy).maxHp * burnShare / burnPulses, intervalTicks: ticks(burnInterval), nextTick: ctx.tick + ticks(burnInterval), label: passive.name },
        });
      }
      const count = Math.min(cap, live.length + 1);
      if (count >= maxStacks && ctx.memory.blazeRingAt === undefined) ctx.memory.blazeRingAt = ctx.tick + ticks(ringDelay);
    };
    const mark = (): Effect => ({ type: "mark", key: "blazeExplosion", duration: 0.1 });
    const explosionSpec: AbilitySpec = {
      key: "BLAZE", name: "Blaze explosion", slot: "I", cooldown: 0, castTime: 0,
      delivery: { kind: "aura", radius: explosionRadius },
      onHit: [{ type: "damage", damageType: "magic", amount: explosion, label: "Blaze explosion" }, mark()],
      flags: { spellShield: passive.flag("spellShield"), projectile: false }, usable: () => false,
    };
    const pyroPacket: Effect[] = [{ type: "damage", damageType: "magic", amount: pyroHit }];
    const bounceSpec: AbilitySpec = {
      key: "RB", name: "Pyroclasm (bounce)", slot: "R", cooldown: 0, castTime: 0,
      delivery: { kind: "target", range: bounceRadius, missileSpeed: pyroSpeed }, onHit: pyroPacket,
      flags: { projectile: true, spellShield: true }, usable: () => false,
    };
    const scheduleBounce = (ctx: HookContext, fromEnemy: boolean, x: number) => {
      if (Number(ctx.memory.pyroRemaining ?? 0) <= 0) { ctx.memory.pyroPhase = ""; return; }
      ctx.memory.pyroPhase = fromEnemy ? "waitBrand" : "waitEnemy";
      ctx.memory.pyroX = x;
      ctx.memory.pyroAt = ctx.tick + ticks(bounceDelay);
    };
    const advanceReturn = (ctx: HookContext) => {
      const from = Number(ctx.memory.pyroX);
      const speed = Number(ctx.memory.pyroReturnSpeed ?? pyroSpeed / 30);
      const x = from + Math.sign(ctx.self.x - from) * Math.min(speed, Math.abs(ctx.self.x - from));
      ctx.memory.pyroX = x;
      ctx.memory.pyroReturnSpeed = Math.min(acceleration.maxPerTick, speed + acceleration.perTick);
      const wall = ctx.world.zones.some((zone) => zone.kind === "projectileWall" && zone.owner === ctx.enemy.side && zone.startTick <= ctx.tick && zone.endTick > ctx.tick && (from - zone.x) * (x - zone.x) <= 0);
      const aura = ctx.enemy.statuses.find((status) => status.kind === "state" && status.key === "projectileBlock");
      if (wall || (aura && Math.abs(ctx.enemy.x - x) <= ctx.enemy.spec.base.radius + aura.value)) { ctx.memory.pyroPhase = ""; return; }
      if (Math.abs(ctx.self.x - x) <= ctx.self.spec.base.radius) scheduleBounce(ctx, false, ctx.self.x);
    };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        delivery: { kind: "line", range: q.fieldValues("range")[1]!, width: q.field("width"), speed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }],
        flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, decisive: true, roles: ["damage", "cc"],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        delivery: { kind: "circle", range: w.field("targetRange"), radius: w.field("effectRadius"), delay: pillarDelay },
        onHit: [{ type: "damage", damageType: "magic", amount: pillar, amountFor: (self, target) => evaluate(burning(self, target, Number(self.memory.brandTick ?? 0)) ? ablazePillar : pillar, self, target) }],
        flags: { spellShield: w.flag("spellShield"), projectile: false }, decisive: true,
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cancelOnInvalidTarget: true,
        delivery: { kind: "target", range: e.field("targetRange") },
        onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
        flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") },
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), cancelOnInvalidTarget: true,
        delivery: { kind: "target", range: r.field("targetRange"), missileSpeed: pyroSpeed }, onHit: pyroPacket,
        flags: { projectile: r.flag("projectile"), spellShield: true },
      },
      bounceSpec, explosionSpec,
    ];
    const pyroCooldown = r.cooldown();
    const basicCooldowns = [q.cooldown(), w.cooldown(), e.cooldown()];

    return {
      abilities,
      budget: {
        damage(self, target) {
          const haste = derive(self).abilityHaste;
          const rate = basicCooldowns.reduce((sum, cd) => sum + 1 / (cooldownAfterHaste(cd, haste) + 0.25), 0);
          const liveStacks = Math.min(maxStacks, duration * rate);
          const ringRate = Math.min(1 / (immuneSeconds + ringDelay), rate / maxStacks);
          const rCycle = cooldownAfterHaste(pyroCooldown, haste) + 0.25;
          return { magic: burnShare * derive(target).maxHp * liveStacks / duration + evaluate(explosion, self, target) * ringRate + 2 * evaluate(pyroHit, self, target) / rCycle + (Math.min(1, duration * rate) * (evaluate(ablazePillar, self, target) - evaluate(pillar, self, target))) / (cooldownAfterHaste(basicCooldowns[1]!, haste) + 0.25) };
        },
      },
      hooks: {
        onCast(ctx) {
          if (ctx.ability.key !== "R") return;
          ctx.memory.pyroRemaining = bounceMax;
          ctx.memory.pyroPhase = "enemy";
          ctx.memory.pyroMissile = ctx.world.nextId;
        },
        onAbilityContact(ctx) {
          ctx.memory.brandTick = ctx.tick;
          const key = ctx.ability.key;
          if (key === "R" || key === "RB") {
            if (key === "R" && ctx.defense === "spellShield") ctx.memory.pyroPhase = "";
            else scheduleBounce(ctx, true, ctx.enemy.x);
          }
          if (!burning(ctx.self, ctx.enemy, ctx.tick)) return;
          if (key === "Q") return [...ctx.effects, { type: "cc", cc: "stun", duration: stunSeconds }];
          if (key === "R" || key === "RB") return [...ctx.effects, { type: "cc", cc: "slow", duration: slowSeconds, strength: slow }];
        },
        onAbilityHit(ctx) {
          if (["Q", "W", "E", "R", "RB", "BLAZE"].includes(ctx.ability.key)) addStack(ctx);
        },
        onDamageDealt(ctx) {
          const ownAbility = ctx.ability !== undefined && [q.name, w.name, e.name, r.name, bounceSpec.name, explosionSpec.name, passive.name].includes(ctx.ability);
          if (ctx.enemy.hp <= 0 && (burning(ctx.self, ctx.enemy, ctx.tick) || ownAbility) && !ctx.memory.blazeKillRestored) {
            ctx.memory.blazeKillRestored = true;
            ctx.apply({ type: "resource", amount: flat(killMana) }, true);
          }
        },
        onTick(ctx) {
          ctx.memory.brandTick = ctx.tick;
          for (const status of burns(ctx.enemy, ctx.self, ctx.tick - 1)) {
            if (!status.dot) continue;
            // 0.25 s is 7.5 ticks. Alternate 8/7, preserving each original application clock.
            const pulse = Math.max(1, Math.round((status.dot.nextTick - status.startTick) / (burnInterval * 30)));
            status.dot.intervalTicks = ticks((pulse + 1) * burnInterval) - ticks(pulse * burnInterval);
          }
          if (ctx.memory.blazeRingAt !== undefined && ctx.tick >= Number(ctx.memory.blazeRingAt)) {
            delete ctx.memory.blazeRingAt;
            // Resolve a burn pulse due at the detonation boundary before consuming it,
            // irrespective of which side's upkeep happens first on this tick.
            for (const status of burns(ctx.enemy, ctx.self, ctx.tick - 1)) {
              if (status.dot && status.dot.nextTick <= ctx.tick) {
                const dot = status.dot;
                dot.nextTick += dot.intervalTicks;
                dealDamage(ctx.world, ctx.self, ctx.enemy, dot.perHit, "magic", { ability: passive.name, persistent: true });
              }
            }
            ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "dot" && s.source === ctx.self.side && s.key.startsWith(BURN)));
            ctx.memory.blazeImmuneUntil = ctx.tick + ticks(immuneSeconds);
            abilityHit(ctx.world, ctx.self, ctx.enemy, explosionSpec, explosionSpec.onHit!);
          }
          const phase = String(ctx.memory.pyroPhase ?? "");
          if (phase === "enemy") {
            const missile = ctx.world.missiles.find((m) => m.id === Number(ctx.memory.pyroMissile));
            if (missile) missile.acceleration ??= acceleration;
            else {
              // Homing missiles are removed when their target becomes untargetable; reform at it.
              if (isUntargetable(ctx.enemy, ctx.self) && ctx.self.alive && Math.abs(ctx.enemy.x - ctx.self.x) <= bounceRadius) scheduleBounce(ctx, true, ctx.enemy.x);
              else ctx.memory.pyroPhase = "";
            }
          } else if ((phase === "waitBrand" || phase === "waitEnemy") && ctx.tick >= Number(ctx.memory.pyroAt)) {
            const x = Number(ctx.memory.pyroX);
            const destination = phase === "waitBrand" ? ctx.self : ctx.enemy;
            if (Math.abs(destination.x - x) > bounceRadius || (phase === "waitEnemy" && (!ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)))) { ctx.memory.pyroPhase = ""; return; }
            ctx.memory.pyroRemaining = Number(ctx.memory.pyroRemaining) - 1;
            if (phase === "waitBrand") {
              ctx.memory.pyroPhase = "brand";
              ctx.memory.pyroReturnSpeed = pyroSpeed / 30;
              advanceReturn(ctx);
            }
            else {
              const id = ctx.world.nextId++;
              ctx.world.missiles.push({ id, owner: ctx.self.side, source: "RB", seenTick: ctx.tick, x, perTick: pyroSpeed / 30, acceleration, homing: true, direction: directionTo(ctx.self, ctx.enemy), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: pyroPacket });
              ctx.memory.pyroMissile = id;
              ctx.memory.pyroPhase = "enemy";
            }
          } else if (phase === "brand") {
            advanceReturn(ctx);
          }
        },
      },
    };
  },
};

export default brand;
