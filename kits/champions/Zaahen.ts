/** Zaahen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { innateStat, maxHp, scaled, ticks } from "./util";

const zaahen: KitModule = {
  champion: "Zaahen",
  build(kit) {
    const innate = kit.ability("Cultivation of War");
    const q = kit.ability("The Darkin Glaive");
    const w = kit.ability("Dreaded Return");
    const e = kit.ability("Aureate Rush");
    const r = kit.ability("Grim Deliverance");

    // Cultivation of War: a stack per hit on the enemy (5 s, up to 12) for a share of AD, doubled at 12; at 12, a revive.
    const stacking = "lasting for 5 seconds, refreshing on subsequent triggers, and stacking up to 12 times";
    const stackSeconds = innate.quoted(stacking, 0);
    const maxStacks = innate.quoted(stacking, 1);
    const decayEvery = innate.quoted("the stacks expire by 1 / 2 / 3 / 4 / 5 (based on Seconds) every 0.5 seconds", 5);
    // Stacks lost per interval by seconds since the duration ran out: 1 at once, one more each interval.
    const decaySeries = innate.seriesIn("the stacks expire by 1 / 2 / 3 / 4 / 5 (based on Seconds) every 0.5 seconds");
    const perStack = innate.levelValue("For each stack, Zaahen gains bonus attack damage equal to 1.5 – 2.8 (based on level)% AD") / 100;
    const filled = innate.levelValue("causing him to double the bonus to 36 – 67.2 (based on level)% AD") / 100;
    const reviveSeconds = innate.quoted("he refreshes its duration and enters resurrection for 4 seconds", 0);
    const reviveHealth = innate.levelValue("Additionally, he restores 30 / 45 / 60 / 75 (based on level)% of his maximum health over the duration") / 100;
    innate.quote("The bonus attack damage granted by Determination stacks will update dynamically with Zaahen's total attack damage");
    innate.quote("Q initial cast empowered attack can generate a stack for each strike");
    innate.quote("Both passes of W can generate a stack");
    innate.quote("his current health will always be overridden by the percentage of health he is supposed to have restored");
    kit.assume("Determination's bonus is a share of Zaahen's attack damage without that bonus; the revive comes once a fight (its cooldown is 120 s at level 20).");

    // The Darkin Glaive: an empowered attack that strikes twice and heals; 1.5 s after it, a recast that knocks up.
    const empowering = "Zaahen empowers his next basic attack within 4 seconds to have an uncancellable windup and gain 25 bonus range";
    const glaiveWindow = q.quoted(empowering, 0);
    const glaiveRange = q.quoted(empowering, 1);
    const strike = q.formula("Physical Damage per Hit");
    const critBonus = q.quoted("can critically strike for 50% AD bonus physical damage", 0) / 100;
    const glaiveHeal = q.formula("Champion Healing");
    const recasting = "After 1.5 seconds of using the empowered attack, The Darkin Glaive can be recast within the next 4 seconds";
    const recastAfter = q.quoted(recasting, 0);
    const recastWithin = q.quoted(recasting, 1);
    const knockUp = q.quoted("deal bonus physical damage and knock up the target for 0.75 seconds", 0);
    q.quote("Rolls critical strike once for both strikes");
    q.quote("Since the healing is granted on-attack, parrying effects will not prevent Zaahen from gaining the heal");
    q.quote("Upon being put in resurrection and if The Darkin Glaive is active, it is placed on cooldown immediately");
    kit.assume("The Darkin Glaive's two strikes stand in for the attack's own damage; their critical strike bonus counts at its expected value.");

    // Dreaded Return: the glaive flies out; at its full range it deals damage again, stuns and pulls back the enemy it hit.
    const glaiveReach = w.field("targetRange");
    const [outSpeed = 2900, pullSpeed = 900] = w.fieldValues("speed");
    const returnStun = w.quoted("stunned for 0.25 seconds, and pulled 225 units toward Zaahen", 0);
    const returnPull = w.quoted("stunned for 0.25 seconds, and pulled 225 units toward Zaahen", 1);
    const returnHit = w.formula("Subsequent Physical Damage");
    const wCooldown = w.cooldown();

    // Aureate Rush: a dash, then a flourish whose outer edge (beyond the inner radius, a center range) deals more.
    const rushReach = e.field("targetRange");
    const flourishOuter = e.field("effectRadius");
    const flourishInner = e.field("innerRadius");
    const rushSpeed = e.field("speed");
    const eCooldown = e.cooldown();
    const sweet = (flourishInner + flourishOuter) / 2;
    const outerHit = e.formula("Increased Physical Damage");
    const outerMagic = e.formula("Bonus Magic Damage");
    const innerHit = e.formula("Physical Damage");
    e.quote("Aureate Rush has no minimum dash range");
    kit.assume(`Aureate Rush lands ${sweet} units from the enemy's center, so its outer edge (${flourishInner} to ${flourishOuter} units) hits it.`);

    // Grim Deliverance: armor penetration; the active leaps, then slams 0.6 s after launching, healing per champion hit.
    const armorPen = r.fraction("Armor Penetration");
    const slamDelay = r.quoted("He then slams his glaive down after a 0.6-second delay", 0);
    const lockTail = r.quoted("for up-to an additional 0.25 seconds afterwards", 0) / 2;
    const slamReduction = r.quoted("Zaahen is unable to act and gains 50% damage reduction from the start of the cast time", 0) / 100;
    const [, leapFar = 600] = r.fieldNumbers("targetRange");
    const leapSpeed = r.field("speed");
    const slamHeal = r.formula("Healing per Champion hit");
    const rCooldown = r.cooldown();
    const lockSeconds = r.castTime() + slamDelay + lockTail;
    r.quote("The lockout, damage reduction, and displacement immunity may last for up to an additional 0.25 seconds after the slam due to fuzziness");
    kit.assume(`Grim Deliverance's fuzzy extra lockout after the slam (up to ${2 * lockTail} s) counts at its average, ${lockTail} s.`);

    const stacksOf = (unit: Unit) => Number(unit.memory.stacks ?? 0);
    const locked = (unit: Unit, world: World) => world.tick < Number(unit.memory.lockedUntil ?? -1);
    const setDetermination = (ctx: HookContext) => {
      const stacks = stacksOf(ctx.self);
      const current = ctx.self.statuses.find((s) => s.kind === "stat" && s.memoKey === "buff:determination")?.value ?? 0;
      const without = derive(ctx.self).ad - current;
      ctx.buff("determination", "AD", without * (stacks >= maxStacks ? filled : perStack * stacks), 3600);
    };
    const gain = (ctx: HookContext) => {
      ctx.memory.stacks = Math.min(maxStacks, stacksOf(ctx.self) + 1);
      ctx.memory.stacksUntil = ctx.tick + ticks(stackSeconds);
      ctx.memory.decayStart = -1;
      setDetermination(ctx);
    };
    // The recast's timing counts from the empowered attack; an unused empowerment ends the ability at once.
    const closeGlaive = (ctx: HookContext) => {
      const chain = ctx.self.chains.Q;
      if (chain) ctx.self.chains.Q = { ...chain, until: ctx.tick - 1 };
    };

    const strikes: Effect[] = [
      { type: "damage", damageType: "physical", amount: strike, label: q.name },
      { type: "damage", damageType: "physical", amount: strike, label: q.name },
      { type: "damage", damageType: "physical", amount: { base: 0, products: [{ ratio: 2 * critBonus, stats: ["AD", "critChance"] }] }, label: `${q.name} (critical strikes)` },
    ];

    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      // Unable to act: Grim Deliverance's lockout, or resurrection.
      if (locked(self, world)) return { kind: "move", direction: 0 };
      const rush = self.spec.abilities.find((a) => a.key === "E");
      if (rush && !self.action && canCast(world, self, rush)) {
        const gap = Math.abs(enemy.x - self.x);
        // Aureate Rush lands with the enemy's center on the flourish's outer edge.
        if ((mode === "fight" || mode === "trade") && gap <= rushReach + flourishOuter) {
          const move = gap - sweet;
          return { kind: "cast", ability: "E", aim: { direction: move >= 0 ? 1 : -1, distance: Math.min(rushReach, Math.abs(move)) } };
        }
        if (mode === "flee" && view.distance <= attackRange(enemy) + rushReach) return { kind: "cast", ability: "E", aim: { direction: -1, distance: rushReach } };
      }
      return defaultBehavior(view);
    };
    kit.assume("Getting away, Zaahen dashes Aureate Rush's full distance away from the enemy.");

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: 0,
        // The cooldown starts once the recast's empowered attack is used, or the recast window ends.
        chainCooldown: "last",
        cooldownAfter: "empower",
        delivery: { kind: "self" },
        onSelf: [
          {
            type: "empower",
            attacks: 1,
            window: glaiveWindow,
            bonusRange: glaiveRange,
            uncancellable: true,
            resetAttack: true,
            // Two strikes in place of the attack's damage.
            split: { physical: 0, magic: 0 },
            onHit: strikes,
          },
        ],
      },
      {
        key: "Q2",
        name: `${q.name} (recast)`,
        slot: "Q",
        cooldown: 0,
        castTime: 0,
        chain: { root: "Q", index: 2, window: glaiveWindow + recastAfter + recastWithin, delay: recastAfter },
        // Only once the first empowered attack has been used.
        usable: (unit) => !unit.memory.glaive,
        delivery: { kind: "self" },
        onSelf: [
          {
            type: "empower",
            attacks: 1,
            window: glaiveWindow,
            bonusRange: glaiveRange,
            uncancellable: true,
            resetAttack: true,
            onHit: [
              { type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage"), label: `${q.name} (recast)` },
              { type: "displace", direction: "away", distance: 0, duration: knockUp },
            ],
          },
        ],
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: wCooldown,
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "line", range: glaiveReach, width: w.field("width"), speed: outSpeed },
        // The second pass, once the glaive reaches its range, is in the hooks.
        onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Initial Physical Damage") }],
        decisive: true,
        flags: { projectile: true },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: eCooldown,
        cost: e.cost(),
        castTime: 0,
        delivery: { kind: "dash", direction: "toward", distance: rushReach, minDistance: 0, speed: rushSpeed, hitRadius: flourishOuter },
        // Inner or outer edge, in the hooks (the mark makes the arrival a hit).
        onHit: [{ type: "mark", key: "flourish", duration: 0.1 }],
        roles: ["damage", "engage"],
        estimate: (caster, target) => evaluate(outerHit, caster, target) + evaluate(outerMagic, caster, target),
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: rCooldown,
        cost: r.cost(),
        castTime: r.castTime(),
        onCastStart: [
          { type: "state", state: "ccImmune", duration: r.castTime() },
          { type: "state", state: "damageReduction", value: slamReduction, duration: lockSeconds },
          { type: "state", state: "displacementImmune", duration: lockSeconds },
        ],
        // The leap is in the hooks; the shockwave's radius is a center range.
        delivery: { kind: "circle", range: leapFar, radius: r.field("effectRadius"), delay: slamDelay, centered: true },
        onHit: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage") }],
        // Cast to deal damage, not saved for its crowd control immunity.
        roles: ["damage"],
      },
    ];
    const gated = abilities.map((a): AbilitySpec => ({ ...a, usable: (unit, world) => !locked(unit, world) && (a.usable?.(unit, world) ?? true) }));

    return {
      behavior,
      abilities: gated,
      start: [innateStat("armorPen", armorPen)],
      budget: {
        // Determination: about half its full bonus through a fight, a share of all attack damage.
        statMultipliers: { ad: 1 + filled / 2 },
        // Aureate Rush's outer edge and Dreaded Return's second pass, and Grim Deliverance's heal.
        damage: (self, target) => {
          const haste = derive(self).abilityHaste;
          const rushCycle = cooldownAfterHaste(eCooldown, haste);
          return {
            physical: evaluate(outerHit, self, target) / rushCycle + evaluate(returnHit, self, target) / cooldownAfterHaste(wCooldown, haste),
            magic: evaluate(outerMagic, self, target) / rushCycle,
          };
        },
        healing: (self, target) => evaluate(slamHeal, self, target) / cooldownAfterHaste(rCooldown, derive(self).abilityHaste),
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Determination fades faster and faster once its duration runs out.
          if (stacksOf(self) > 0 && ctx.tick >= Number(ctx.memory.stacksUntil ?? 0)) {
            if (Number(ctx.memory.decayStart ?? -1) < 0) ctx.memory.decayStart = ctx.tick;
            const since = ctx.tick - Number(ctx.memory.decayStart);
            if (since % ticks(decayEvery) === 0) {
              const seconds = since / 30;
              let drop = 1;
              if (decaySeries.kind === "variable") decaySeries.points.forEach((p, i) => (seconds >= Number(p) ? (drop = Number(decaySeries.values[i])) : undefined));
              ctx.memory.stacks = Math.max(0, stacksOf(self) - drop);
              setDetermination(ctx);
            }
          }
          // The resurrection: health set to the share restored so far.
          if (ctx.tick < Number(ctx.memory.reviveUntil ?? -1)) {
            const done = 1 - (Number(ctx.memory.reviveUntil) - ctx.tick) / ticks(reviveSeconds);
            self.hp = Math.max(1, reviveHealth * done * maxHp(self));
          }
          // The glaive's second pass reaches the enemy: another stack.
          if (ctx.tick === Number(ctx.memory.returnAt ?? -1) && ctx.enemy.alive) gain(ctx);
          // The empowered attack went unused: the ability ends and its cooldown starts.
          if (ctx.memory.glaive === "armed" && !self.statuses.some((s) => s.kind === "empower" && s.key === "Q" && s.endTick > ctx.tick)) {
            ctx.memory.glaive = "";
            closeGlaive(ctx);
          }
        },
        onLethal(ctx) {
          // At full Determination, once a fight: resurrection.
          if (stacksOf(ctx.self) < maxStacks || ctx.memory.revived) return false;
          ctx.memory.revived = true;
          ctx.self.hp = 1;
          ctx.memory.reviveUntil = ctx.tick + ticks(reviveSeconds);
          ctx.memory.lockedUntil = ctx.tick + ticks(reviveSeconds);
          ctx.memory.stacksUntil = ctx.tick + ticks(reviveSeconds + stackSeconds);
          // The Darkin Glaive, if active, goes on cooldown.
          ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && (s.key === "Q" || s.key === "Q2")));
          ctx.memory.glaive = "";
          closeGlaive(ctx);
          ctx.self.action = undefined;
          ctx.self.move = 0;
          ctx.apply({ type: "state", state: "invulnerable", duration: reviveSeconds }, true);
          ctx.apply({ type: "state", state: "untargetable", duration: reviveSeconds }, true);
          ctx.apply({ type: "state", state: "noAttacks", duration: reviveSeconds }, true);
          ctx.log("enters resurrection");
          return true;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") ctx.memory.glaive = "armed";
          if (key === "R") {
            // Unable to act until after the slam; the leap lands at its dash speed.
            ctx.memory.lockedUntil = ctx.tick + ticks(slamDelay + lockTail);
            ctx.apply({ type: "state", state: "noAttacks", duration: slamDelay + lockTail }, true);
            const gap = Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius;
            const leap = Math.max(0, Math.min(leapFar, gap));
            ctx.apply({ type: "delayed", delay: leap / leapSpeed, effects: [{ type: "reposition", direction: "toward", distance: leapFar }] }, true);
          }
        },
        onAttack(ctx) {
          // The windup carrying the glaive's strikes.
          const action = ctx.self.action;
          if (ctx.memory.glaive === "armed" && action?.kind === "windup" && action.onHit.includes(strikes[0] as Effect)) ctx.memory.glaive = "swung";
        },
        onAttackLaunch(ctx) {
          if (ctx.memory.glaive !== "swung") return;
          // On-attack, hit or not: the heal, and the recast's timing counts from here.
          ctx.memory.glaive = "";
          ctx.memory.glaiveLaunch = ctx.tick;
          ctx.apply({ type: "heal", amount: glaiveHeal }, true);
          const chain = ctx.self.chains.Q;
          if (chain) ctx.self.chains.Q = { ...chain, castTick: ctx.tick, until: ctx.tick + ticks(recastAfter + recastWithin) };
        },
        onAttackHit(ctx) {
          gain(ctx);
          // The glaive's two strikes: two stacks.
          if (Number(ctx.memory.glaiveLaunch ?? -1) === ctx.tick) gain(ctx);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          gain(ctx);
          if (key === "W") {
            // The second pass once the glaive reaches its full range: damage, a short stun and the pull.
            const travelled = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius);
            const left = Math.max(0, glaiveReach - travelled) / outSpeed;
            ctx.memory.returnAt = ctx.tick + Math.max(1, ticks(left));
            ctx.apply({
              type: "delayed",
              delay: left,
              effects: [
                { type: "damage", damageType: "physical", amount: scaled(returnHit, ctx.scale), label: `${w.name} (return)` },
                { type: "cc", cc: "stun", duration: returnStun },
                { type: "displace", direction: "toward", distance: returnPull, duration: returnPull / pullSpeed },
              ],
            });
          }
          if (key === "E") {
            // The inner radius is a center range: beyond it, the outer edge.
            if (Math.abs(ctx.enemy.x - ctx.self.x) > flourishInner) {
              ctx.apply({ type: "damage", damageType: "physical", amount: scaled(outerHit, ctx.scale), label: `${e.name} (outer edge)` });
              ctx.apply({ type: "damage", damageType: "magic", amount: scaled(outerMagic, ctx.scale), label: `${e.name} (outer edge)` });
            } else ctx.apply({ type: "damage", damageType: "physical", amount: scaled(innerHit, ctx.scale), label: e.name });
          }
          if (key === "R") ctx.apply({ type: "heal", amount: scaled(slamHeal, ctx.scale) }, true);
        },
      },
    };
  },
};

export default zaahen;
