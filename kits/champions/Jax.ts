/** Jax: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { edgeDistance } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Effect } from "../../engine/sim/spec";
import { attackDamage, bump, counter, extraAttacks, scaled } from "./util";

const jax: KitModule = {
  champion: "Jax",
  build(kit) {
    const innate = kit.ability("Relentless Assault");
    const q = kit.ability("Leap Strike");
    const w = kit.ability("Empower");
    const e = kit.ability("Counter Strike");
    const r = kit.ability("Grandmaster-at-Arms");

    // Relentless Assault: attack speed per stack, stacking on attack.
    const perStack = innate.levelValue("For each stack, Jax gains") / 100;
    const maxStacks = innate.quoted("stacking up to 8 times", 0);
    const stackSeconds = innate.quoted("on-attack for 2.5 seconds", 0);
    // Grandmaster-at-Arms: every third attack (every second while active) deals bonus magic damage.
    const procDamage: Effect = { type: "damage", damageType: "magic", amount: r.formula("Additional Magic Damage"), label: "Grandmaster-at-Arms (passive)" };
    const procAt = r.quoted("stacking up to 2 times", 0) + 1;
    r.quote("The additional magic damage can be dodged and blocked but it cannot miss");
    const activeSeconds = r.quoted("as well as 10% increased size for 8 seconds", 1);
    // Counter Strike: +20% damage per attack dodged, up to +100%.
    const minimum = e.formula("Minimum Magic Damage");
    const perDodge = e.quoted("increased by 20% for each attack dodged", 0) / 100;
    const maxDodges = e.quoted("up to a 100% increase", 0) / 100 / perDodge;
    const evasion = e.quoted("Jax enters Evasion for 2 seconds", 0);
    const strikeRadius = e.field("effectRadius");
    kit.assume("Leap Strike's dash speed isn't on the wiki; it is taken as 2,000 units per second.");
    kit.assume("Evasion's 25% reduction of area damage isn't modeled.");
    kit.assume("Empower is used on basic attacks, not on Leap Strike.");

    const behavior: Behavior = (view) => {
      // Hold Counter Strike's recast for its automatic end, unless the enemy is walking out of it.
      const recast = view.self.spec.abilities.find((a) => a.key === "E2");
      if (recast && canCast(view.world, view.self, recast) && view.enemy.moved === -1 && edgeDistance(view.self, view.enemy) > strikeRadius - 150) {
        return { kind: "cast", ability: "E2" };
      }
      return defaultBehavior(view);
    };

    return {
      // Relentless Assault's attack speed at full stacks, and Grandmaster-at-Arms' bonus every third attack.
      budget: {
        damage: (self, target) => {
          const attacks = derive(self).attackSpeed + extraAttacks(self, maxStacks * perStack);
          const proc = procDamage.type === "damage" ? evaluate(procDamage.amount, self, target) : 0;
          return { physical: attackDamage(self) * extraAttacks(self, maxStacks * perStack), magic: (proc * attacks) / procAt };
        },
      },
      hooks: {
        onAttack(ctx) {
          const stacks = bump(ctx, "assault", maxStacks, stackSeconds);
          ctx.buff("assault", "attackSpeed", stacks * perStack, stackSeconds);
        },
        onAttackHit(ctx) {
          const ultimate = ctx.tick < Number(ctx.memory.ultimateUntil ?? -1);
          const hits = Number(ctx.memory.lanternHits ?? 0) + 1;
          if (hits >= (ultimate ? procAt - 1 : procAt)) {
            ctx.memory.lanternHits = 0;
            if (!ctx.blocked) ctx.apply(procDamage);
          } else ctx.memory.lanternHits = hits;
        },
        onAttackAvoided(ctx) {
          if (ctx.memory.evading) bump(ctx, "dodged", maxDodges, evasion + 1);
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") ctx.memory.evading = true;
          if (ctx.ability.key === "E2") {
            ctx.memory.evading = false;
            // The recast ends Evasion.
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "dodgeAttacks" && s.source === ctx.self.side));
          }
          if (ctx.ability.key === "R") ctx.memory.ultimateUntil = ctx.tick + Math.ceil(activeSeconds * 30);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E2") return;
          const dodged = counter(ctx, "dodged");
          ctx.memory.dodged = 0;
          if (dodged > 0) ctx.apply({ type: "damage", damageType: "magic", amount: scaled(minimum, perDodge * dodged), label: "Counter Strike (dodges)" });
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
          castTime: q.castTime(),
          delivery: { kind: "dash", direction: "target", distance: q.field("targetRange"), speed: 2000, hitRadius: 75 },
          onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage") }],
          flags: { grounded: true, knockdown: q.flag("knockdown") ?? true },
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
              window: w.quoted("against an enemy within 10 seconds", 0),
              bonusRange: w.quoted("it will gain 50 bonus range", 0),
              uncancellable: true,
              resetAttack: true,
              onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Additional Magic Damage") }],
            },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          chainCooldown: "last",
          delivery: { kind: "self" },
          onSelf: [{ type: "state", state: "dodgeAttacks", duration: evasion }],
        },
        {
          key: "E2",
          name: `${e.name} (recast)`,
          slot: "E",
          cooldown: 0,
          castTime: 0,
          chain: { root: "E", index: 2, window: evasion, delay: e.quoted("Counter Strike can be recast after 1 second", 0), auto: true },
          delivery: { kind: "aura", radius: strikeRadius },
          onHit: [
            { type: "damage", damageType: "magic", amount: minimum },
            { type: "cc", cc: "stun", duration: e.quoted("stuns them for 1 second", 0) },
          ],
          roles: ["defense"],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          moveWhileCasting: true,
          delivery: { kind: "aura", radius: r.field("effectRadius") },
          onHit: [
            { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
            {
              type: "caster",
              effects: [
                { type: "stat", stat: "armor", amount: r.formula("Bonus Armor"), duration: activeSeconds },
                { type: "stat", stat: "MR", amount: r.formula("Bonus Magic Resistance"), duration: activeSeconds },
              ],
            },
          ],
        },
      ],
    };
  },
};

export default jax;
