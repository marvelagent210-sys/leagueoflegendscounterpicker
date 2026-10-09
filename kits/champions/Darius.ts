/** Darius: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, expectedDamage } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Effect, Formula, HookContext } from "../../engine/sim/spec";

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
    const bleedInterval = 1.25;
    kit.assume(`Hemorrhage deals its damage in ticks every ${bleedInterval} seconds (the wiki gives only the total).`);
    const perStackBonus = r.quoted("increased by 0 / 20 / 40 / 60 / 80 / 100 (based on target's Hemorrhage stacks)%", 1) / 100;

    const stacksOn = (ctx: HookContext) => (ctx.tick < Number(ctx.memory.bleedUntil ?? -1) ? Number(ctx.memory.bleedStacks ?? 0) : 0);
    const bleed = (ctx: HookContext, stacks: number) => {
      ctx.memory.bleedStacks = stacks;
      ctx.memory.bleedUntil = ctx.tick + Math.ceil(bleedSeconds * 30);
      const total: Formula = { base: perStack.base * stacks, ratios: { bonusAD: (perStack.ratios?.bonusAD ?? 0) * stacks } };
      ctx.apply({ type: "dot", damageType: "physical", total, duration: bleedSeconds, interval: bleedInterval });
      if (stacks >= maxStacks && !ctx.memory.might) {
        ctx.memory.might = true;
        ctx.buff("noxianMight", "AD", mightAD, mightSeconds);
        ctx.log("Noxian Might");
      }
    };

    const guillotine: Effect = { type: "damage", damageType: "true", amount: r.formula("True Damage") };
    // Noxian Guillotine deals 20% more per Hemorrhage stack: kill checks use the stacks.
    const handle = q.field("innerRadius");
    const blade = q.field("effectRadius", "Outer radius");
    const behavior: Behavior = (view) => {
      // While hefting Decimate, step so the enemy stands in the blade, not the handle.
      if (view.self.action?.kind === "cast" && view.self.action.ability === "Q") {
        const gap = Math.abs(view.self.x - view.enemy.x);
        if (gap < handle + 40) return { kind: "move", direction: -1 };
        if (gap > blade - 20) return { kind: "move", direction: 1 };
        return { kind: "move", direction: 0 };
      }
      const ultimate = view.self.spec.abilities.find((a) => a.key === "R");
      if (ultimate && canCast(view.world, view.self, ultimate) && Math.abs(view.self.x - view.enemy.x) <= r.field("targetRange")) {
        const stacks = view.world.tick < Number(view.self.memory.bleedUntil ?? -1) ? Number(view.self.memory.bleedStacks ?? 0) : 0;
        const damage = expectedDamage([guillotine], view.self, view.enemy) * (1 + perStackBonus * stacks);
        if (damage >= view.enemy.hp) return { kind: "cast", ability: "R" };
      }
      return defaultBehavior(view);
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
        onDamageDealt(ctx) {
          // Damaging attacks and abilities stack Hemorrhage, except the bleed itself and Decimate's handle.
          if (ctx.persistent || ctx.amount <= 0 || ctx.ability === HANDLE) return;
          bleed(ctx, ctx.memory.might ? maxStacks : Math.min(maxStacks, stacksOn(ctx) + 1));
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R") {
            // The bonus for stacks, then Hemorrhage from the hit.
            const stacks = stacksOn(ctx);
            if (stacks > 0) ctx.apply({ ...guillotine, amount: scaled(r.formula("True Damage"), perStackBonus * stacks) });
          }
        },
        onTick(ctx) {
          if (ctx.memory.might && !ctx.self.statuses.some((s) => s.memoKey === "buff:noxianMight")) ctx.memory.might = false;
        },
      },
      behavior,
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          // Darius hefts his axe for 0.75 s (he can walk, but not attack), then swings around himself.
          castTime: q.quoted("hefts his axe for 0.75 seconds", 0),
          moveWhileCasting: true,
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
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: w.quoted("empowers his next basic attack within 4 seconds", 0),
              uncancellable: true,
              bonusRange: w.quoted("gain 25 bonus range", 0),
              resetAttack: true,
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
          castTime: e.castTime(),
          // A cone in front of Darius: in one dimension, the stretch up to its range.
          delivery: { kind: "area", near: 0, far: e.field("effectRadius"), delay: 0, anchor: "caster" },
          onHit: [
            // Pulled to Darius, then rebounding 150 units off him.
            { type: "displace", direction: "toward", distance: e.field("effectRadius"), duration: 0.5, to: e.quoted("they rebound 150 units off of him", 0) },
            { type: "cc", cc: "slow", strength: e.quoted("slowed by 40% for 1 second", 0) / 100, duration: e.quoted("slowed by 40% for 1 second", 1) },
          ],
          flags: { spellShield: e.flag("spellShield") ?? true, projectile: false },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [guillotine],
          roles: ["finisher"],
          flags: { grounded: true },
        },
      ],
    };
  },
};

/** A formula scaled by a factor. */
function scaled(formula: Formula, factor: number): Formula {
  return {
    base: formula.base * factor,
    ...(formula.ratios ? { ratios: Object.fromEntries(Object.entries(formula.ratios).map(([k, v]) => [k, (v ?? 0) * factor])) } : {}),
  };
}

export default darius;
