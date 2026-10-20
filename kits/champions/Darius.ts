/** Darius: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { EPSILON, canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, expectedDamage } from "../../engine/sim/behavior";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";
import { ticks } from "./util";

const HANDLE = "Decimate (handle)";

const darius: KitModule = {
  champion: "Darius",
  build(kit) {
    const innate = kit.ability("Hemorrhage");
    const q = kit.ability("Decimate");
    const w = kit.ability("Crippling Strike");
    const e = kit.ability("Apprehend");
    const r = kit.ability("Noxian Guillotine");

    // Hemorrhage: each stack deals its damage over 5 s; up to 5 stacks; at 5, Noxian Might.
    const perStack: Formula = { base: innate.levelValue("For each stack, the target is dealt"), ratios: { bonusAD: innate.quoted("(+ 30% bonus AD) total physical damage over the duration", 0) / 100 } };
    const bleedSeconds = innate.quoted("apply a stack of Hemorrhage to enemies for 5 seconds", 0);
    const maxStacks = innate.quoted("stacking up to 5 times", 0);
    const mightAD = innate.levelValue("Darius gains 30 – 230 (based on level) bonus attack damage");
    const mightSeconds = innate.quoted("he becomes empowered with Noxian Might for 5 seconds", 0);
    innate.quote("Hemorrhage can be applied to and refreshed against shielded targets");
    r.quote("Noxian Guillotine applies Hemorrhage after the damage");
    w.quote("Spell shields will negate all effects of Crippling Strike, including the damage of the basic attack itself");
    w.quote("The attack's animation can be cancelled by casting Decimate, but the attack will still land");
    const bleedInterval = 1.25;
    kit.assume(`Hemorrhage deals its damage in ticks every ${bleedInterval} seconds (the wiki gives only the total).`);
    const perStackBonus = r.quoted("increased by 0 / 20 / 40 / 60 / 80 / 100 (based on target's Hemorrhage stacks)%", 1) / 100;

    const stacksOn = (ctx: HookContext) => (ctx.tick < Number(ctx.memory.bleedUntil ?? -1) ? Number(ctx.memory.bleedStacks ?? 0) : 0);
    const bleed = (ctx: HookContext, stacks: number) => {
      ctx.memory.bleedStacks = stacks;
      ctx.memory.bleedUntil = ctx.tick + Math.ceil(bleedSeconds * 30);
      if (stacks >= maxStacks) {
        ctx.memory.might = true;
        ctx.buff("noxianMight", "AD", mightAD, mightSeconds);
        ctx.log("Noxian Might");
      }
      const total: Formula = { base: perStack.base * stacks, ratios: { bonusAD: (perStack.ratios?.bonusAD ?? 0) * stacks } };
      ctx.apply({ type: "dot", damageType: "physical", total, duration: bleedSeconds, interval: bleedInterval, label: innate.name });
    };

    const guillotineDamage = r.formula("True Damage");
    const killWindow = r.quoted("within 0.15 seconds after being hit", 0);
    const cripplingCost = w.cost();
    const pullLock = e.quoted("unable to move or cast Decimate or Noxian Guillotine for 0.4 seconds", 0);
    const guillotineLock = r.quoted("unable to cast Decimate or Apprehend for 0.25 seconds", 0);
    const apprehendAirborne = e.quoted("remaining airborne and becoming slowed by 40% for 1 second", 1);
    const apprehendMovement = e.quoted("forced movement's duration is roughly 0.5 seconds", 0);
    kit.assume("Apprehend's initial drag and rebound are collapsed into one linear movement. Its slow starts at impact because the model does not represent the initial drag separately.");
    const guillotineRange = r.field("targetRange");
    const guillotine: Effect = {
      type: "damage", damageType: "true", amount: guillotineDamage,
      amountFor: (self, target) => evaluate(guillotineDamage, self, target) * (1 + perStackBonus * Number(self.memory.bleedStacks ?? 0)),
    };
    const resetGuillotine = (ctx: HookContext) => {
      if (ctx.tick > Number(ctx.memory.guillotineKillUntil ?? -1) ||
        !(ctx.enemy.hp <= 0 || (!ctx.memory.guillotineWasFallen && ctx.enemy.fallen))) return;
      ctx.self.cooldownReady.R = ctx.tick;
      ctx.memory.guillotineKillUntil = -1;
      if (!ctx.memory.guillotineWasFallen) {
        ctx.memory.might = true;
        ctx.buff("noxianMight", "AD", mightAD, mightSeconds);
      }
    };
    // Noxian Guillotine deals 20% more per Hemorrhage stack: kill checks use the stacks.
    const handle = q.field("innerRadius");
    const blade = q.field("effectRadius", "Outer radius");
    const behavior: Behavior = (view) => {
      // While hefting Decimate, step so the enemy stands in the blade, not the handle.
      if (view.self.action?.kind === "cast" && view.self.action.ability === "Q") {
        const gap = Math.abs(view.self.x - view.enemy.x);
        if (gap < handle + 40 - EPSILON) return { kind: "move", direction: -1 };
        if (gap > blade - 20 + EPSILON) return { kind: "move", direction: 1 };
        return { kind: "move", direction: 0 };
      }
      const ultimate = view.self.spec.abilities.find((a) => a.key === "R");
      if (ultimate && canCast(view.world, view.self, ultimate) && Math.abs(view.self.x - view.enemy.x) <= guillotineRange) {
        const damage = expectedDamage([guillotine], view.self, view.enemy, true);
        if (damage >= view.enemy.hp) return { kind: "cast", ability: "R" };
      }
      const command = defaultBehavior(view);
      if (view.world.tick < Number(view.self.memory.apprehendLockUntil ?? -1) && command?.kind === "move") return undefined;
      return command;
    };

    return {
      // A full Hemorrhage bleeding through the fight, and Noxian Might for about half of it.
      budget: {
        damage: (self) => ({
          physical: (maxStacks * evaluate(perStack, self)) / bleedSeconds + 0.5 * mightAD * derive(self).attackSpeed,
        }),
      },
      start: [{ type: "stat", stat: "armorPen", amount: { base: e.fraction("Armor Penetration") }, duration: Number.POSITIVE_INFINITY }],
      hooks: {
        onAttack(ctx) {
          const action = ctx.self.action;
          ctx.memory.cripplingPending = action?.kind === "windup" && Boolean(action.empowered?.includes("W"));
          ctx.memory.cripplingWasFallen = Boolean(ctx.enemy.fallen);
        },
        onAttackResolved(ctx) {
          if (ctx.memory.cripplingPending && !ctx.missed && !ctx.blocked &&
            (ctx.enemy.hp <= 0 || (!ctx.memory.cripplingWasFallen && ctx.enemy.fallen))) {
            ctx.apply({ type: "refund", ability: "W", fraction: 0.5 });
            ctx.apply({ type: "resource", amount: { base: cripplingCost } }, true);
          }
          ctx.memory.cripplingPending = false;
        },
        onDamageDealt(ctx) {
          // Damaging attacks and abilities stack Hemorrhage, except the bleed itself and Decimate's handle.
          if (ctx.persistent || ctx.mitigated <= 0 || ctx.ability === HANDLE || hasState(ctx.enemy, "parry")) return;
          if (ctx.attack) {
            if (ctx.memory.bleedAttackTick === ctx.tick) return;
            ctx.memory.bleedAttackTick = ctx.tick;
          }
          bleed(ctx, ctx.memory.might ? maxStacks : Math.min(maxStacks, stacksOn(ctx) + 1));
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.guillotineKillUntil = ctx.tick + ticks(killWindow);
            resetGuillotine(ctx);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.guillotineWasFallen = Boolean(ctx.enemy.fallen);
            ctx.memory.guillotineLockUntil = ctx.tick + ticks(guillotineLock);
          }
          if (ctx.ability.key === "E") {
            ctx.memory.apprehendLockUntil = ctx.tick + ticks(pullLock);
            ctx.self.move = 0;
          }
        },
        onTick(ctx) {
          if (ctx.tick < Number(ctx.memory.apprehendLockUntil ?? -1)) ctx.self.move = 0;
          if (ctx.tick >= Number(ctx.memory.bleedUntil ?? -1)) ctx.memory.bleedStacks = 0;
          if (ctx.memory.might && !ctx.self.statuses.some((s) => s.memoKey === "buff:noxianMight")) ctx.memory.might = false;
          resetGuillotine(ctx);
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
          usable: (unit, world) => world.tick >= Math.max(Number(unit.memory.apprehendLockUntil ?? -1), Number(unit.memory.guillotineLockUntil ?? -1)),
          // Darius hefts his axe for 0.75 s (he can walk, but not attack), then swings around himself.
          castTime: q.quoted("hefts his axe for 0.75 seconds", 0),
          moveWhileCasting: true,
          preserveAttackWindup: true,
          delivery: {
            kind: "area",
            near: 0,
            far: q.field("effectRadius", "Outer radius"),
            delay: 0,
            anchor: "caster",
            bands: [
              {
                from: 0,
                to: q.field("innerRadius"),
                onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Reduced Damage (Handle)"), label: HANDLE }],
              },
            ],
          },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage (Blade)") },
            { type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { missingHP: q.quoted("Darius heals for 17 / 34 / 51", 0) / 100 } } }] },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: w.quoted("empowers his next basic attack within 4 seconds", 0),
              uncancellable: true,
              bonusRange: w.quoted("gain 25 bonus range", 0),
              resetAttack: true,
              spellShield: true,
              onHit: [
                { type: "damage", damageType: "physical", amount: w.formula("Bonus Physical Damage"), canCrit: true },
                { type: "cc", cc: "slow", strength: w.quoted("slow the target by 90% for 1 second", 0) / 100, duration: w.quoted("slow the target by 90% for 1 second", 1) },
              ],
            },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          usable: (unit, world) => world.tick >= Number(unit.memory.guillotineLockUntil ?? -1),
          castTime: e.castTime(),
          // A cone in front of Darius: in one dimension, the stretch up to its range.
          delivery: { kind: "area", near: 0, far: e.field("effectRadius"), delay: 0, anchor: "caster" },
          onHit: [
            // Pulled to Darius, then rebounding 150 units off him.
            { type: "displace", direction: "toward", distance: e.field("effectRadius"), duration: apprehendMovement, airborneDuration: apprehendAirborne, to: e.quoted("they rebound 150 units off of him", 0) },
            { type: "cc", cc: "slow", strength: e.quoted("slowed by 40% for 1 second", 0) / 100, duration: e.quoted("slowed by 40% for 1 second", 1) },
          ],
          flags: { spellShield: e.flag("spellShield") ?? true, projectile: false },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          usable: (unit, world) => world.tick >= Number(unit.memory.apprehendLockUntil ?? -1),
          cancelOnInvalidTarget: true,
          castTime: r.castTime(),
          delivery: { kind: "target", range: guillotineRange },
          onHit: [guillotine],
          roles: ["finisher"],
          flags: { grounded: true },
        },
      ],
    };
  },
};

export default darius;
