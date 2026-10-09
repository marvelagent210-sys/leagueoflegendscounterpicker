/** Irelia: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Effect, HookContext } from "../../engine/sim/spec";
import { attackDamage, bump, counter, extraAttacks, scaled, ticks } from "./util";

const irelia: KitModule = {
  champion: "Irelia",
  build(kit) {
    const innate = kit.ability("Ionian Fervor");
    const q = kit.ability("Bladesurge");
    const w = kit.ability("Defiant Dance");
    const e = kit.ability("Flawless Duet");
    const r = kit.ability("Vanguard's Edge");

    // Ionian Fervor: a stack per ability hit on a champion, refreshed by attacks; at 4, bonus magic on-hit.
    const perStack = innate.levelValue("For each stack, Irelia gains 10 – 25 (based on level)% bonus attack speed", 0) / 100;
    const maxStacks = innate.quoted("stacking up to 4 times", 0);
    const fervorSeconds = innate.quoted("lasting for 6 seconds", 0);
    const fervorHit: Effect = {
      type: "damage",
      damageType: "magic",
      amount: { base: innate.levelValue("At maximum stacks, Irelia's basic attacks are empowered to deal 10 – 61 (based on level)"), ratios: { bonusAD: innate.quoted("(+ 20% bonus AD) bonus magic damage on-hit", 0) / 100 } },
      label: "Ionian Fervor",
    };
    const unsteadySeconds = innate.quoted("are marked as Unsteady for 5 seconds", 0);
    const resetTo = q.quoted("Bladesurge's current cooldown is reduced to 0.2 seconds", 0);
    // Defiant Dance: physical and magic damage reduction while charging and 0.5 s after.
    const physicalCut = w.levelValue("she reduces incoming physical damage by 40 – 70 (based on level)%", 0) / 100;
    const magicCut = w.levelValue("she reduces incoming physical damage by 40 – 70 (based on level)%", 1) / 100;
    const charge = w.quoted("to charge for up to 1.5 seconds", 0);
    const keep = w.quoted("She also retains the damage reduction for 0.5 seconds", 0);
    const fullCharge = w.quoted("Defiant Dance's damage increases over the first 0.75 seconds of the channel", 0);
    const minDance = w.formula("Minimum Physical Damage");
    const maxDance = w.formula("Maximum Physical Damage");
    const cageSeconds = r.quoted("around the enemy champion hit for 2.5 seconds", 0);
    const cageSlow = r.quoted("are slowed by 90% for 1.5 seconds", 0) / 100;
    const cageSlowSeconds = r.quoted("are slowed by 90% for 1.5 seconds", 1);
    kit.assume("Flawless Duet's blades are placed on both sides of the enemy, so the closing line is dodged like a skillshot 140 units wide.");
    kit.assume("Vanguard's Edge's blade perimeter hits the enemy once if it walks 250 units from where it was struck.");
    kit.assume("Defiant Dance charges fully and is released at the end.");

    const fervor = (ctx: HookContext) => {
      const stacks = bump(ctx, "fervor", maxStacks, fervorSeconds);
      ctx.buff("fervor", "attackSpeed", stacks * perStack, fervorSeconds);
    };

    return {
      // At full stacks through a fight: Ionian Fervor's attack speed and bonus damage.
      budget: {
        damage: (self, target) => ({
          physical: attackDamage(self) * extraAttacks(self, maxStacks * perStack),
          magic: evaluate(fervorHit.type === "damage" ? fervorHit.amount : { base: 0 }, self, target) * (derive(self).attackSpeed + extraAttacks(self, maxStacks * perStack)),
        }),
      },
      hooks: {
        onAttackHit(ctx) {
          // Attacks refresh the stacks; at maximum stacks they deal Ionian Fervor's bonus damage.
          const stacks = counter(ctx, "fervor");
          if (stacks > 0) {
            ctx.memory.fervorUntil = ctx.tick + ticks(fervorSeconds);
            ctx.buff("fervor", "attackSpeed", stacks * perStack, fervorSeconds);
          }
          if (stacks >= maxStacks) ctx.apply(fervorHit);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "E" || key === "R" || key === "W2") fervor(ctx);
          if (key === "E" || key === "R") ctx.apply({ type: "mark", key: "unsteady", duration: unsteadySeconds });
          if (key === "Q" && ctx.enemy.statuses.some((s) => s.kind === "mark" && s.key === "unsteady")) {
            ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === "unsteady"));
            ctx.self.cooldownReady.Q = ctx.tick + ticks(resetTo);
          }
          if (key === "W2") {
            // The release's damage grows with the charge, up to its maximum after 0.75 s.
            const charged = Math.min(1, (ctx.tick - Number(ctx.memory.danceStart ?? ctx.tick)) / ticks(fullCharge));
            const extra = scaled({ base: maxDance.base - minDance.base, ratios: { AD: (maxDance.ratios?.AD ?? 0) - (minDance.ratios?.AD ?? 0), AP: (maxDance.ratios?.AP ?? 0) - (minDance.ratios?.AP ?? 0) } }, charged);
            ctx.apply({ type: "damage", damageType: "physical", amount: extra, label: "Defiant Dance (charge)" });
          }
          if (key === "R") {
            ctx.memory.cageX = ctx.enemy.x;
            ctx.memory.cageUntil = ctx.tick + ticks(cageSeconds);
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") ctx.memory.danceStart = ctx.tick;
        },
        onTick(ctx) {
          if (ctx.tick >= Number(ctx.memory.cageUntil ?? -1)) return;
          if (Math.abs(ctx.enemy.x - Number(ctx.memory.cageX)) < 250) return;
          ctx.memory.cageUntil = -1;
          ctx.apply({ type: "damage", damageType: "magic", amount: r.formula("Magic Damage"), label: "Vanguard's Edge (blades)" });
          ctx.apply({ type: "cc", cc: "slow", strength: cageSlow, duration: cageSlowSeconds });
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
          delivery: { kind: "dash", direction: "target", distance: q.field("targetRange"), speed: q.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 335), hitRadius: 50 },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
            { type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { AD: q.shareOf("Heal") } } }] },
          ],
          flags: { appliesOnHit: true, parry: true, grounded: true, knockdown: q.flag("knockdown") ?? true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: 0,
          chainCooldown: "last",
          onCastStart: [
            { type: "state", state: "physicalReduction", value: physicalCut, duration: charge + keep },
            { type: "state", state: "magicReduction", value: magicCut, duration: charge + keep },
          ],
          delivery: { kind: "self" },
          channel: { duration: charge, interruptible: false },
          roles: ["defense"],
        },
        {
          key: "W2",
          name: `${w.name} (release)`,
          slot: "W",
          cooldown: 0,
          castTime: w.castTime("Recast"),
          chain: { root: "W", index: 2, window: charge, auto: true },
          delivery: { kind: "area", near: 0, far: w.field("range", "Recast swipe total range"), delay: 0, anchor: "caster" },
          onHit: [{ type: "damage", damageType: "physical", amount: minDance }],
          flags: { usableWhileDisabled: true },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.quoted("Flawless Duet can be recast after 0.15 seconds", 0),
          delivery: { kind: "circle", range: e.field("targetRange"), radius: e.field("width") / 2, delay: e.quoted("Each of the blades' travel times are 0.264", 0) + e.quoted("converge over 0.25 seconds", 0) },
          onHit: [
            { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
            { type: "cc", cc: "stun", duration: e.quoted("stunning them for 0.75 seconds", 0) },
          ],
          flags: { projectile: e.flag("projectile") ?? true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "line", range: r.field("targetRange"), width: r.field("width"), speed: r.field("speed") },
          onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }],
          flags: { projectile: true },
        },
      ],
    };
  },
};

export default irelia;
