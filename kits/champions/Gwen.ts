/** Gwen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula } from "../../engine/sim/spec";
import { bump, counter, flat, scaled } from "./util";

const CUTS = "A Thousand Cuts";

const gwen: KitModule = {
  champion: "Gwen",
  build(kit) {
    const innate = kit.ability(CUTS);
    const q = kit.ability("Snip Snip!");
    const w = kit.ability("Hallowed Mist");
    const e = kit.ability("Skip 'n Slash");
    const r = kit.ability("Needlework");

    // A Thousand Cuts: a share of maximum health on every hit, healing for most of it.
    const cutsBase = innate.quoted("bonus magic damage equal to 1% (+ 0.6% per 100 AP) of the target's maximum health", 0) / 100;
    const cutsPer100 = innate.quoted("bonus magic damage equal to 1% (+ 0.6% per 100 AP) of the target's maximum health", 1) / 100;
    const healShare = innate.quoted("Heals Gwen for 67% of post-mitigation damage dealt against champions", 0) / 100;
    const healCap = innate.levelValue("Heals Gwen for 67% of post-mitigation damage dealt against champions, capped at");
    const healCapAP = innate.quoted("(+ 7% AP) per instance", 0) / 100;
    const cuts: Effect = {
      type: "damage",
      damageType: "magic",
      amount: { base: 0, ratios: { targetMaxHP: cutsBase }, products: [{ ratio: cutsPer100 / 100, stats: ["AP", "targetMaxHP"] }] },
      label: CUTS,
    };
    // Snip Snip!: a snip per Snippy stack on top of the first and the last, half of each true damage at the center.
    const stackSeconds = q.quoted("generate a stack of Snippy on-hit for 6 seconds", 0);
    const maxStacks = q.quoted("stacking up to 4 times", 0);
    const trueShare = q.quoted("The center of each snip converts 50% of the damage to true damage", 0) / 100;
    const [qNear = -50, qFar = 465] = q.fieldNumbers("effectRadius").map((n, i) => (i === 0 ? -Math.abs(n) : n));
    const snip = (amount: Formula): Effect[] => [
      { type: "damage", damageType: "magic", amount: scaled(amount, 1 - trueShare), label: q.name },
      { type: "damage", damageType: "true", amount: scaled(amount, trueShare), label: q.name },
      cuts,
    ];
    // Skip 'n Slash: a short dash, then empowered attacks; the first refunds part of the cooldown.
    const slashSeconds = e.quoted("empowers her basic attacks within the next 4 seconds", 0);
    const slashRange = e.quoted("75 bonus attack range", 0);
    const slashOnHit: Formula = { base: e.quoted("deal 15 (+ 20% AP) bonus magic damage on-hit", 0), ratios: { AP: e.quoted("deal 15 (+ 20% AP) bonus magic damage on-hit", 1) / 100 } };
    const dashSpeed = 800;
    // Hallowed Mist.
    const mistSeconds = w.quoted("lasting for 4 seconds", 0);
    // Needlework: 1, 3 and 5 needles.
    const recastWindow = r.quoted("Needlework can be recast twice more within 8 seconds of the activation", 0);
    const between = r.quoted("with a 1-second static cooldown between casts", 0);
    // Needles start 100 units behind Gwen and travel 1350.
    const [needleBehind = 100, needleTravel = 1350] = r.fieldNumbers("range").map(Math.abs);
    const needleReach = needleTravel - needleBehind;
    const needle: Effect[] = [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage per Needle"), label: r.name }, cuts];
    kit.assume(`Skip 'n Slash dashes at ${dashSpeed} units per second (from the game files; the wiki gives no speed).`);
    kit.assume("Snip Snip!'s snips all land at the end of its cast, through the enemy's center.");
    kit.assume("Gwen holds Snip Snip! until she has 4 Snippy stacks, unless they are about to run out or the snips would kill.");
    kit.assume("Every needle of a Needlework cast hits an enemy the cast hits.");
    kit.assume("Hallowed Mist stays where it was raised; Gwen fights inside it.");

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const inRange = inAttackRange(self, enemy);
      const busy = self.action && self.action.kind !== "windup";
      // Skip 'n Slash between attacks for its attack speed and range, stepping back a little.
      const slash = self.spec.abilities.find((a) => a.key === "E");
      if (!busy && slash && view.mode !== "idle" && view.mode !== "flee" && inRange && self.attackReadyTick > world.tick + 3 && canCast(world, self, slash)) {
        return { kind: "cast", ability: "E", aim: { direction: -1, distance: 100 } };
      }
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && command.ability === "Q") {
        // Snip Snip! with all four stacks, unless they are running out.
        const memory = self.memory;
        const stacks = world.tick < Number(memory.snippyUntil ?? -1) ? Number(memory.snippy ?? 0) : 0;
        const expiring = stacks > 0 && Number(memory.snippyUntil ?? -1) - world.tick < 30;
        if (stacks < maxStacks && !expiring && derive(enemy).maxHp * 0.25 < enemy.hp) {
          if (!inRange) return { kind: "move", direction: 1 };
          return self.attackReadyTick <= world.tick ? { kind: "attack" } : { kind: "move", direction: 0 };
        }
      }
      return command;
    };

    const needlework = (index: number, needles: number): AbilitySpec => ({
      key: index === 1 ? "R" : `R${index}`,
      name: index === 1 ? r.name : `${r.name} (${needles} needles)`,
      slot: "R",
      cooldown: index === 1 ? r.cooldown() : 0,
      cost: index === 1 ? r.cost() : 0,
      castTime: r.castTime(index === 1 ? "First cast" : "Second and third casts"),
      moveWhileCasting: true,
      ...(index === 1 ? { chainCooldown: "first" as const } : { chain: { root: "R", index, window: recastWindow, delay: between } }),
      delivery: { kind: "line", range: needleReach, width: r.fieldNumbers("width")[0] ?? 240, speed: r.field("speed") },
      onHit: [
        ...Array.from({ length: needles }, () => needle).flat(),
        { type: "cc", cc: "slow", strength: r.fraction("Slow"), duration: r.quoted("slows them for 1.5 seconds", 0) },
      ],
      flags: { projectile: true },
    });

    // Snip Snip! at full stacks once per cooldown: the snips besides the final one, each with A Thousand Cuts.
    const snipsPerSecond = (1 + maxStacks) / (q.cooldown() + q.castTime());
    const cutsAmount = cuts.type === "damage" ? cuts.amount : flat(0);
    return {
      behavior,
      attack: { onHit: [cuts] },
      budget: {
        damage: (self, target) => {
          const snip = evaluate(q.formula("Damage per Snip"), self, target);
          const cut = evaluate(cutsAmount, self, target);
          return { magic: snipsPerSecond * (snip * (1 - trueShare) + cut), true: snipsPerSecond * snip * trueShare };
        },
        // A Thousand Cuts heals on every attack and snip, up to its cap each time.
        healing: (self, target) => {
          const cap = healCap + healCapAP * derive(self).ap;
          return Math.min(cap, healShare * evaluate(cutsAmount, self, target)) * (derive(self).attackSpeed + snipsPerSecond);
        },
      },
      hooks: {
        onAttackHit(ctx) {
          bump(ctx, "snippy", maxStacks, stackSeconds);
          // The first empowered attack after Skip 'n Slash refunds part of its cooldown.
          if (ctx.memory.slashRefund) {
            ctx.memory.slashRefund = false;
            ctx.apply({ type: "refund", ability: "E", fraction: e.fraction("Cooldown Refund") }, true);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.snipsQueued = counter(ctx, "snippy");
            ctx.memory.snippy = 0;
          }
          if (ctx.ability.key === "E") ctx.memory.slashRefund = true;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q") return;
          // The first snip and one per stack, besides the final snip (the ability's own hit).
          const snips = 1 + Number(ctx.memory.snipsQueued ?? 0);
          for (let i = 0; i < snips; i++) for (const effect of snip(q.formula("Damage per Snip"))) ctx.apply(effect);
        },
        onDamageDealt(ctx) {
          if (ctx.ability !== CUTS) return;
          const cap = healCap + healCapAP * derive(ctx.self).ap;
          ctx.apply({ type: "heal", amount: flat(Math.min(cap, healShare * ctx.mitigated)) }, true);
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
          delivery: { kind: "area", near: qNear, far: qFar, delay: 0, anchor: "caster" },
          onHit: snip(q.formula("Final Snip Damage")),
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: 0,
          delivery: { kind: "self" },
          onSelf: [
            { type: "state", state: "untargetableFar", value: w.field("effectRadius"), duration: mistSeconds },
            { type: "stat", stat: "armor", amount: w.formula("Bonus Resistances"), duration: mistSeconds },
            { type: "stat", stat: "MR", amount: w.formula("Bonus Resistances"), duration: mistSeconds },
          ],
          roles: ["buff"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: 0,
          overlay: true,
          delivery: { kind: "dash", direction: "toward", distance: e.field("targetRange", "Dash range"), minDistance: 0, speed: dashSpeed },
          onSelf: [
            { type: "resetAttack" },
            { type: "empower", attacks: 99, window: slashSeconds, onHit: [{ type: "damage", damageType: "magic", amount: slashOnHit, label: e.name }] },
            { type: "stat", stat: "attackSpeed", amount: flat(e.fraction("Bonus Attack Speed")), duration: slashSeconds },
            { type: "stat", stat: "attackRange", amount: flat(slashRange), duration: slashSeconds },
          ],
          flags: { grounded: true },
        },
        needlework(1, 1),
        needlework(2, 3),
        needlework(3, 5),
      ],
    };
  },
};

export default gwen;
