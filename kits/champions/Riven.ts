/** Riven: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, expectedDamage } from "../../engine/sim/behavior";
import type { AbilitySpec, Effect } from "../../engine/sim/spec";
import { bump, counter, flat, missingShare, scaled } from "./util";

const riven: KitModule = {
  champion: "Riven",
  build(kit) {
    const innate = kit.ability("Runic Blade");
    const q = kit.ability("Broken Wings");
    const w = kit.ability("Ki Burst");
    const e = kit.ability("Valor");
    const r = kit.ability("Blade of the Exile");
    const slash = kit.ability("Wind Slash");

    // Runic Blade: each cast gives a charge; each attack spends one for bonus damage.
    const runicShare = innate.levelValue("deal bonus physical damage equal to 30 – 45 (based on level)% AD") / 100;
    const maxCharges = innate.quoted("stacking up to 3 times", 0);
    const chargeSeconds = innate.quoted("generate a stack of Charge for 6 seconds", 0);
    const qDash = q.quoted("Riven dashes 225 units in the direction she is currently facing", 0);
    const qWindow = q.quoted("within 4 seconds of the previous cast", 0);
    const qDelay = q.quoted("with a 0.3125-second static cooldown between casts", 0);
    const knockBack = q.quoted("knocking back enemies hit 75 units over 0.5 seconds", 0);
    const exileSeconds = r.quoted("Riven empowers her blade for 15 seconds", 0);
    const exileRange = r.quoted("75 bonus attack range", 0);
    const slashDelay = r.quoted("After 0.5 seconds, she can cast Wind Slash within the duration", 0);
    // Wind Slash: up to +200% damage at 75% missing health.
    const slashMin = slash.formula("Minimum Physical Damage");
    const slashFullAt = 0.75;
    const slashBonus = 2;
    kit.assume("Broken Wings' dashes move 225 units toward the enemy and strike it if it is within the slash's radius on arrival.");
    kit.assume("Valor dashes toward the enemy to engage, or away from it to escape.");
    kit.assume("Wind Slash's three missiles are one line skillshot as wide as the cone.");

    const slashDamage = (missing: number) => scaled(slashMin, 1 + slashBonus * Math.min(1, missing / slashFullAt));
    const runic: Effect = { type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: runicShare } }, canCrit: true, label: "Runic Blade" };

    const stage = (index: number, radius: number, extra: Effect[]): AbilitySpec => ({
      key: index === 1 ? "Q" : `Q${index}`,
      name: index === 1 ? q.name : `${q.name} (${index === 2 ? "second" : "third"} cast)`,
      slot: "Q",
      cooldown: index === 1 ? q.cooldown() : 0,
      castTime: 0,
      ...(index === 1 ? { chainCooldown: "first" as const } : { chain: { root: "Q", index, window: qWindow, delay: qDelay } }),
      delivery: { kind: "dash", direction: "toward", distance: qDash, speed: 1000, hitRadius: radius },
      onSelf: [{ type: "resetAttack" }],
      onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage") }, ...extra],
      flags: { grounded: true, knockdown: q.flag("knockdown") ?? true },
    });

    const behavior: Behavior = (view) => {
      const self = view.self;
      // Wind Slash when it kills.
      const windSlash = self.spec.abilities.find((a) => a.key === "R2");
      if (windSlash && canCast(view.world, self, windSlash)) {
        const damage = expectedDamage([{ type: "damage", damageType: "physical", amount: slashDamage(missingShare(view.enemy)) }], self, view.enemy);
        if (damage >= view.enemy.hp) return { kind: "cast", ability: "R2" };
      }
      // Broken Wings: one attack between casts (the animation cancel), unless the window is closing.
      const chain = self.chains.Q;
      if (chain) {
        const attacked = Number(self.memory.lastAttackTick ?? -1) > chain.castTick;
        const closing = chain.until - view.world.tick < 10;
        const next = self.spec.abilities.find((a) => a.chain?.root === "Q" && a.chain.index === chain.stage + 1);
        if (next && canCast(view.world, self, next) && (attacked || closing)) return { kind: "cast", ability: next.key };
        if (!attacked && !closing) {
          // Attack before the next cast of the chain.
          const fallback = defaultBehavior(view);
          if (fallback?.kind === "cast" && fallback.ability.startsWith("Q")) return canStartAttack(view.world, self) ? { kind: "attack" } : { kind: "move", direction: 1 };
          return fallback;
        }
      }
      return defaultBehavior(view);
    };

    return {
      hooks: {
        onCast(ctx) {
          bump(ctx, "runic", maxCharges, chargeSeconds);
        },
        onAttack(ctx) {
          ctx.memory.lastAttackTick = ctx.tick;
          const charges = counter(ctx, "runic");
          ctx.memory.runicPending = charges > 0;
          if (charges > 0) {
            ctx.memory.runic = charges - 1;
            ctx.memory.runicUntil = ctx.tick + Math.ceil(chargeSeconds * 30);
          }
        },
        onAttackHit(ctx) {
          if (ctx.memory.runicPending) ctx.apply(runic);
          ctx.memory.runicPending = false;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "R2") {
            // The rest of Wind Slash's bonus for the target's missing health.
            const bonus = slashDamage(missingShare(ctx.enemy));
            ctx.apply({ type: "damage", damageType: "physical", amount: { base: bonus.base - slashMin.base, ratios: { bonusAD: (bonus.ratios?.bonusAD ?? 0) - (slashMin.ratios?.bonusAD ?? 0) } }, label: "Wind Slash (missing health)" });
          }
        },
      },
      behavior,
      abilities: [
        stage(1, q.field("effectRadius", "First/second cast standard radius"), []),
        stage(2, q.field("effectRadius", "First/second cast standard radius"), []),
        stage(3, q.field("effectRadius", "Third cast standard radius"), [{ type: "displace", direction: "away", distance: knockBack, duration: q.quoted("knocking back enemies hit 75 units over 0.5 seconds", 1) }]),
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          // "Ki Burst's effects are applied before the cast time."
          castTime: w.quote("Ki Burst's effects are applied before the cast time") ? 0 : w.castTime(),
          delivery: { kind: "aura", radius: w.field("effectRadius", "Standard radius") },
          onHit: [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "cc", cc: "stun", duration: w.quoted("stunning them for 0.75 seconds", 0) },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "toward", distance: e.field("range"), speed: 1200 },
          onSelf: [{ type: "shield", amount: e.formula("Shield Strength"), duration: e.quoted("granting herself a shield for 1.5 seconds", 0) }],
          flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          chainCooldown: "last",
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "AD", amount: { base: 0, ratios: { AD: r.quoted("gaining 20% AD bonus attack damage", 0) / 100 } }, duration: exileSeconds },
            { type: "stat", stat: "attackRange", amount: flat(exileRange), duration: exileSeconds },
          ],
          roles: ["buff"],
        },
        {
          key: "R2",
          name: slash.name,
          slot: "R",
          cooldown: 0,
          castTime: slash.castTime(),
          chain: { root: "R", index: 2, window: exileSeconds, delay: slashDelay },
          delivery: { kind: "line", range: slash.field("targetRange"), width: slash.field("width") * 3, speed: slash.field("speed") },
          onHit: [{ type: "damage", damageType: "physical", amount: slashMin }],
          roles: ["finisher"],
          flags: { projectile: slash.flag("projectile") ?? true },
        },
      ],
    };
  },
};

export default riven;
