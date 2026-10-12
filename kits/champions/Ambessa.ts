/** Ambessa: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { flat, innateStat, ticks } from "./util";

const ambessa: KitModule = {
  champion: "Ambessa",
  build(kit) {
    const innate = kit.ability("Drakehound's Step");
    const q1 = kit.ability("Cunning Sweep");
    const q2 = kit.ability("Sundering Slam");
    const w = kit.ability("Repudiation");
    const e = kit.ability("Lacerate");
    const r = kit.ability("Public Execution");

    // Drakehound's Step: after each ability's lockout, a dash toward (or, getting away, away from) the enemy.
    const [, stepFar = 350] = innate.fieldNumbers("targetRange");
    innate.quote("inputting an attack or movement command causes her to dash to or towards the target or location, respectively, after the lockout ends");
    const baseRange = kit.champion.forms[0]?.stats.attackRange ?? 125;
    kit.assume(
      `After each ability Drakehound's Step jumps (up to ${stepFar} units, at the end of the lockout) to Medarda Maxim's attack range from the enemy, which also puts it on Cunning Sweep's outer edge; getting away, it jumps away.`,
    );

    // Medarda Maxim: each cast stocks an empowered attack (up to 3) with range, speed, damage, life steal and energy.
    const maximSeconds = innate.quoted("she generates a stack of Medarda Maxim after the ability's respective lockout for 4 seconds", 0);
    const maximMax = innate.quoted("refreshing with subsequent casts and stacking up to 3 times", 0);
    const maximRange = innate.quoted("gain 75 bonus range and 50% bonus attack speed", 0);
    const maximSpeed = innate.quoted("gain 75 bonus range and 50% bonus attack speed", 1) / 100;
    const maximHit: Formula = {
      base: innate.levelValue("Medarda Maxim: Ambessa's next basic attack on-attack is empowered to have an uncancellable windup, gain 75 bonus range and 50% bonus attack speed, deal 5 – 25 (based on level)"),
      ratios: { bonusAD: innate.quoted("(+ 20% bonus AD) bonus physical damage, which applies life steal", 0) / 100 },
    };
    const maximEnergy = innate.levelValue("Medarda Maxim: Ambessa's next basic attack on-attack is empowered to have an uncancellable windup, gain 75 bonus range and 50% bonus attack speed, deal 5 – 25 (based on level)", 1);
    kit.assume("Medarda Maxim's 50% bonus attack speed lasts while she has a stack to spend.");

    // The lockout shared by Cunning Sweep, Sundering Slam and Lacerate.
    const lockout = q1.quoted("Ambessa enters a 0.225-second lockout", 0);

    // Cunning Sweep: a half circle; twice the damage on its outer edge. Sundering Slam follows a hit within 4 seconds.
    const [inner = 275, behind = 135, outer = 400] = q1.fieldValues("effectRadius");
    const slamWindow = q1.quoted("If this hits at least one enemy, Ambessa can cast Sundering Slam within the next 4 seconds", 0);
    const slamHit = q2.formula("Increased Physical Damage");
    const hitbox = 65;
    kit.assume(`Cunning Sweep's outer edge (${inner} to ${outer} units) doubles the damage when it covers the enemy's hitbox, ${hitbox} units for most champions.`);

    // Repudiation: a shield as it starts, a smash after 0.5 seconds, harder if the shield blocked damage first.
    const brace = w.quoted("Ambessa braces herself for up to 0.5 seconds, during which in the first 0.225 seconds she is unable to act", 0);
    const braceLock = w.quoted("Ambessa braces herself for up to 0.5 seconds, during which in the first 0.225 seconds she is unable to act", 1);
    const shield: Formula = { base: w.levelValue("Ambessa shields herself at the time of cast for 50 – 320 (based on level)"), ratios: { bonusAD: w.quoted("(+ 150% bonus AD) for 1.5 seconds", 0) / 100 } };
    const shieldSeconds = w.quoted("(+ 150% bonus AD) for 1.5 seconds", 1);
    const smash = w.formula("Physical Damage");
    const smashHard = w.formula("Increased Physical Damage");
    const smashRadius = w.field("effectRadius");

    // Lacerate: a spin that slows (99% decaying over 1 s); a second spin follows the dash.
    const spinSlow = e.quoted("slow them by 99% decaying over 1 second", 0) / 100;
    const spinSlowFor = e.quoted("slow them by 99% decaying over 1 second", 1);
    e.quote("she will spin a second time at the end of the dash to apply the same effects at no additional cost");
    const spinRadius = e.field("effectRadius");
    const spin: Effect[] = [
      { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
      { type: "cc", cc: "slow", strength: spinSlow / 2, duration: spinSlowFor },
    ];
    kit.assume(`Lacerate's decaying slow counts at half for its ${spinSlowFor} s.`);

    // Public Execution: armor penetration and healing from ability damage; the active seizes the enemy after a 0.7 s cast.
    const armorPen = r.fraction("Armor Penetration");
    const abilityHeal = r.baseOf("Healing Percentage") / 100;
    const seize = r.quoted("Ambessa attaches them to herself and suppresses them for 0.75 seconds", 0);
    const crashStun = r.quoted("afterwards dealing physical damage and stunning them for 0.4 seconds", 0);
    const executionHit = r.formula("Physical Damage");
    r.quote("Ambessa is displacement immune and unable to act during the cast time and while the target is suppressed");
    kit.assume("Public Execution's healing counts without life steal, which the stat budget doesn't buy.");

    const step = (ctx: HookContext) => {
      if (ctx.world.modes[ctx.self.side] === "flee") {
        ctx.apply({ type: "reposition", direction: "away", distance: stepFar }, true);
        return;
      }
      // To Medarda Maxim's reach: an empowered attack, and the next Cunning Sweep's outer edge.
      const spacing = baseRange + maximRange + ctx.self.spec.base.radius + ctx.enemy.spec.base.radius;
      const gap = Math.abs(ctx.enemy.x - ctx.self.x);
      if (gap > spacing) ctx.apply({ type: "reposition", direction: "toward", distance: Math.min(stepFar, gap - spacing) }, true);
      else if (gap < spacing - 50) ctx.apply({ type: "reposition", direction: "away", distance: Math.min(stepFar, spacing - gap) }, true);
    };
    const abilityNames = new Set([q1.name, q2.name, w.name, e.name, r.name]);

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q1.name,
        slot: "Q",
        cooldown: q1.cooldown(),
        cost: q1.cost(),
        castTime: lockout,
        chainCooldown: "first",
        delivery: {
          kind: "area",
          near: -behind,
          far: outer,
          delay: 0,
          anchor: "caster",
          centered: false,
          // The outer edge: doubled damage (a band's effects replace the area's).
          bands: [{ from: inner - hitbox, to: outer + hitbox, onHit: [{ type: "damage", damageType: "physical", amount: q1.formula("Increased Physical Damage"), label: `${q1.name} (outer edge)` }] }],
        },
        onHit: [{ type: "damage", damageType: "physical", amount: q1.formula("Physical Damage") }],
        flags: { spellShield: true },
      },
      {
        key: "Q2",
        name: q2.name,
        slot: "Q",
        cooldown: 0,
        cost: q2.cost(),
        castTime: lockout,
        chain: { root: "Q", index: 2, window: slamWindow },
        usable: (unit, world) => world.tick < Number(unit.memory.slamUntil ?? -1),
        delivery: { kind: "area", near: 0, far: q2.field("range"), delay: 0, anchor: "caster" },
        // Doubled against the first enemy hit: the only one here.
        onHit: [{ type: "damage", damageType: "physical", amount: slamHit }],
        flags: { spellShield: true },
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: braceLock,
        // Cast within reach of its smash (dealt by the hooks).
        delivery: { kind: "aura", radius: smashRadius },
        onCastStart: [{ type: "shield", amount: shield, duration: shieldSeconds }],
        roles: ["damage"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: lockout,
        delivery: { kind: "aura", radius: spinRadius },
        onHit: spin,
        flags: { spellShield: true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        castTime: r.castTime(),
        onCastStart: [{ type: "state", state: "displacementImmune", duration: r.castTime() + seize }],
        delivery: { kind: "area", near: 0, far: r.field("range"), delay: 0, anchor: "caster" },
        onHit: [
          { type: "cc", cc: "suppression", duration: seize },
          { type: "delayed", delay: seize, effects: [{ type: "damage", damageType: "physical", amount: executionHit }, { type: "cc", cc: "stun", duration: crashStun }] },
        ],
        flags: { spellShield: true, grounded: true },
      },
    ];

    // Unable to act while she holds the enemy.
    const holding = (unit: Unit, world: World) => world.tick < Number(unit.memory.seizeUntil ?? -1);
    const gated = abilities.map((a): AbilitySpec => ({ ...a, usable: (unit, world) => !holding(unit, world) && (a.usable?.(unit, world) ?? true) }));

    // Getting away: any cast buys a Drakehound's Step away from the chaser.
    const fleeWith = ["E", "W", "Q", "Q2"];
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (mode === "flee" && !self.action && view.distance <= attackRange(enemy) + stepFar) {
        for (const key of fleeWith) {
          const ability = self.spec.abilities.find((a) => a.key === key);
          if (ability && canCast(world, self, ability)) return { kind: "cast", ability: key };
        }
      }
      return defaultBehavior(view);
    };
    kit.assume("Getting away, Ambessa casts whatever basic ability is ready for its Drakehound's Step away from the enemy.");

    return {
      behavior,
      abilities: gated,
      start: [innateStat("armorPen", armorPen)],
      budget: {
        // Medarda Maxim on about one attack per cast, and the healing from ability damage.
        damage: (self, target) => ({ physical: evaluate(maximHit, self, target) / 2.5 }),
        healing: (self, target) => abilityHeal * 0.4 * evaluate(slamHit, self, target),
      },
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          // Medarda Maxim: one more empowered attack, up to 3.
          const existing = ctx.self.statuses.find((s) => s.kind === "empower" && s.memoKey === "maxim");
          const stacks = Math.min(maximMax, (existing?.empower?.attacks ?? 0) + 1);
          ctx.self.statuses = ctx.self.statuses.filter((s) => s !== existing);
          ctx.self.statuses = [
            ...ctx.self.statuses,
            {
              kind: "empower",
              key: "maxim",
              memoKey: "maxim",
              source: ctx.self.side,
              startTick: ctx.tick,
              endTick: ctx.tick + ticks(maximSeconds),
              value: 0,
              empower: { attacks: stacks, onHit: [{ type: "damage", damageType: "physical", amount: maximHit, label: "Medarda Maxim" }], bonusRange: maximRange, uncancellable: true },
            },
          ];
          ctx.buff("maxim", "attackSpeed", maximSpeed, maximSeconds);
          if (key === "W") {
            ctx.memory.smashAt = ctx.tick + ticks(brace - braceLock);
            const held = ctx.self.statuses.find((s) => s.kind === "shield" && s.key === "W");
            ctx.memory.shieldFull = held?.value ?? 0;
          }
          if (key === "E") {
            // The dash and the second spin at its end.
            step(ctx);
            if (Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= spinRadius) for (const effect of spin) ctx.apply(effect);
            return;
          }
          if (key !== "R") step(ctx);
        },
        onTick(ctx) {
          const self = ctx.self;
          // No more Medarda Maxim stacks: no more attack speed from them.
          if (!self.statuses.some((s) => s.kind === "empower" && s.memoKey === "maxim" && (s.empower?.attacks ?? 0) > 0)) ctx.buff("maxim", "attackSpeed", 0, 0);
          // Repudiation's smash, harder if the shield took damage.
          if (ctx.tick === Number(ctx.memory.smashAt ?? -1)) {
            const held = self.statuses.find((s) => s.kind === "shield" && s.key === "W");
            const hit = (held?.value ?? 0) < Number(ctx.memory.shieldFull ?? 0);
            if (Math.abs(ctx.enemy.x - self.x) - ctx.enemy.spec.base.radius <= smashRadius) ctx.apply({ type: "damage", damageType: "physical", amount: hit ? smashHard : smash, label: w.name });
          }
        },
        onAttack(ctx) {
          ctx.memory.maximSwing = ctx.self.statuses.some((s) => s.kind === "empower" && s.memoKey === "maxim");
        },
        onAttackHit(ctx) {
          if (!ctx.memory.maximSwing) return;
          ctx.memory.maximSwing = false;
          ctx.apply({ type: "resource", amount: flat(maximEnergy) }, true);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") ctx.memory.slamUntil = ctx.tick + ticks(slamWindow);
          if (key === "Q2") ctx.memory.slamUntil = -1;
          if (key === "R") {
            // Behind the enemy, holding it, unable to act.
            ctx.memory.seizeUntil = ctx.tick + ticks(seize);
            ctx.apply({ type: "state", state: "noAttacks", duration: seize }, true);
            const side = ctx.enemy.x >= ctx.self.x ? 1 : -1;
            ctx.self.x = ctx.enemy.x + side * (ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius);
            ctx.apply({ type: "attach", offset: ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius, duration: seize });
          }
        },
        onDamageDealt(ctx) {
          // Public Execution's passive: healing from her abilities' damage.
          if (!ctx.attack && ctx.ability !== undefined && [...abilityNames].some((name) => ctx.ability?.startsWith(name))) {
            ctx.apply({ type: "heal", amount: flat(abilityHeal * ctx.mitigated) }, true);
          }
        },
      },
    };
  },
};

export default ambessa;
