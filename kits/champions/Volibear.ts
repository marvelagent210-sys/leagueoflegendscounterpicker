/** Volibear: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive, evaluate } from "../../engine/sim/derived";
import { attackTiming } from "../../engine/sim/actions";
import type { Formula, HookContext } from "../../engine/sim/spec";
import { attackDamage, bump, extraAttacks, flat, scaled, ticks } from "./util";

const WOUNDED = "wounded";

const volibear: KitModule = {
  champion: "Volibear",
  build(kit) {
    const innate = kit.ability("The Relentless Storm");
    const q = kit.ability("Thundering Smash");
    const w = kit.ability("Frenzied Maul");
    const e = kit.ability("Sky Splitter");
    const r = kit.ability("Stormbringer");

    // The Relentless Storm: attack speed per stack; at 5, Lightning Claws.
    const stackSeconds = innate.quoted("he generates a stack of The Relentless Storm for 6 seconds", 0);
    const maxStacks = innate.quoted("stacking up to 5 times", 0);
    const speedPerStack = innate.quoted("For each stack, Volibear gains 5% (+ 4% per 100 AP) bonus attack speed", 0) / 100;
    const speedPer100AP = innate.quoted("For each stack, Volibear gains 5% (+ 4% per 100 AP) bonus attack speed", 1) / 100;
    const claws: Formula = {
      base: innate.levelValue("Lightning Claws: Volibear's claws ignite with lightning"),
      ratios: { bonusAD: innate.quoted("(+ 20% bonus AD) (+ 45% AP) bonus magic damage", 0) / 100, AP: innate.quoted("(+ 20% bonus AD) (+ 45% AP) bonus magic damage", 1) / 100 },
    };
    // Thundering Smash: a faster pounce that stuns, and doesn't spend the attack timer.
    const smashSeconds = q.quoted("gaining bonus movement speed for 4 seconds", 0);
    const smashWindup = q.quoted("Attack Windup Time: 0.4 (- 0.1 per 100% bonus attack speed)", 0);
    const smashWindupCut = q.quoted("Attack Windup Time: 0.4 (- 0.1 per 100% bonus attack speed)", 1);
    const smashRange = q.quoted("gain 25 bonus range", 0);
    const smashDamage = q.formula("Bonus Physical Damage");
    const smashStun = q.quoted("stunning them for 1 second", 0);
    const smashEvery = q.cooldown();
    // Frenzied Maul: the second bite on a Wounded target hits harder and heals.
    const woundSeconds = w.quoted("mark the target Wounded for 8 seconds", 0);
    const biteBonus = w.quoted("dealing 50% (+ 25% per 100 bonus AD) increased damage", 0) / 100;
    const bitePer100 = w.quoted("dealing 50% (+ 25% per 100 bonus AD) increased damage", 1) / 100;
    const maulDamage = w.formula("Physical Damage");
    const biteHeal = w.formula("Heal");
    const maulEvery = w.cooldown();
    // Sky Splitter: the bolt lands 2 seconds later; Volibear within it gets a shield.
    const boltDelay = e.quoted("to strike at the target location after a 2-second delay", 0);
    const [boltRadius = 325, shieldRadius = 425] = e.fieldValues("effectRadius");
    const boltShield: Formula = { base: 0, ratios: { maxHP: e.quoted("he gains a shield equal to 14% of his maximum health (+ 75% AP) for 3 seconds", 0) / 100, AP: e.quoted("he gains a shield equal to 14% of his maximum health (+ 75% AP) for 3 seconds", 1) / 100 } };
    const shieldSeconds = e.quoted("he gains a shield equal to 14% of his maximum health (+ 75% AP) for 3 seconds", 2);
    // Stormbringer: a one-second leap, then 12 seconds bigger.
    const stormSeconds = r.quoted("Volibear gains Stormbringer for 12 seconds", 0);
    const leapSeconds = r.quoted("leaps to the target location with displacement immunity over 1 second", 0);
    const [impactRadius = 300] = r.fieldValues("effectRadius");
    const leapRange = r.field("targetRange");
    kit.assume("Thundering Smash's movement speed is the doubled amount, for running at an enemy.");
    kit.assume("Volibear aims Sky Splitter at the enemy; he gets its shield when he is within 425 units of the enemy as it lands.");
    kit.assume("Stormbringer's slow decaying over 1 second is taken as 25% for 1 second.");
    kit.assume("Stormbringer lands next to the enemy, up to 700 units away; the enemy can walk out of the impact during the leap.");

    const smashing = (ctx: HookContext) => ctx.tick < Number(ctx.memory.smashUntil ?? -1) && Boolean(ctx.memory.smashArmed);

    return {
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          const speed = maxStacks * (speedPerStack + (speedPer100AP * d.ap) / 100);
          const attacks = d.attackSpeed + extraAttacks(self, speed);
          // The pounce once per cooldown; the bite (half more damage) every other Frenzied Maul.
          const pounce = evaluate(smashDamage, self, target) / smashEvery;
          const bite = (biteBonus * evaluate(maulDamage, self, target)) / (2 * maulEvery);
          return { physical: attackDamage(self) * extraAttacks(self, speed) + pounce + bite, magic: evaluate(claws, self, target) * attacks };
        },
        // The bite's heal at about half health.
        healing: (self) => (biteHeal.base + (biteHeal.ratios?.missingHP ?? 0) * 0.5 * derive(self).maxHp) / (2 * maulEvery),
      },
      hooks: {
        onAttack(ctx) {
          // The pounce doesn't put the attack on cooldown: the next can follow it at once.
          if (!smashing(ctx)) return;
          ctx.memory.smashArmed = false;
          ctx.self.attackReadyTick = ctx.tick + attackTiming(ctx.self).windup;
        },
        onAttackHit(ctx) {
          storm(ctx, true);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "W" && ctx.memory.bite) {
            // The bite: more damage and a heal.
            const more = biteBonus + (bitePer100 * derive(ctx.self).bonusAd) / 100;
            ctx.apply({ type: "damage", damageType: "physical", amount: scaled(maulDamage, more), label: `${w.name} (bite)` });
            ctx.apply({ type: "heal", amount: biteHeal }, true);
          }
          if (key === "E" && Math.abs(ctx.self.x - ctx.enemy.x) <= shieldRadius) ctx.apply({ type: "shield", amount: boltShield, duration: shieldSeconds }, true);
          // Frenzied Maul applies on-hit effects, so it can carry Lightning Claws.
          storm(ctx, key === "W");
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            ctx.memory.smashArmed = true;
            ctx.memory.smashUntil = ctx.tick + ticks(smashSeconds);
            const windup = Math.max(0.1, smashWindup - smashWindupCut * derive(ctx.self).bonusAttackSpeed);
            ctx.apply(
              {
                type: "empower",
                attacks: 1,
                window: smashSeconds,
                bonusRange: smashRange,
                uncancellable: true,
                resetAttack: true,
                windup,
                onHit: [
                  { type: "damage", damageType: "physical", amount: smashDamage },
                  { type: "cc", cc: "stun", duration: smashStun },
                ],
              },
              true,
            );
          }
          if (key === "W") ctx.memory.bite = ctx.enemy.statuses.some((s) => s.kind === "mark" && s.key === WOUNDED);
          if (key === "R") {
            // The leap lands next to the enemy, if it is in range.
            const dir = Math.sign(ctx.enemy.x - ctx.self.x) || 1;
            const contact = ctx.self.spec.base.pathingRadius + ctx.enemy.spec.base.pathingRadius;
            const travel = Math.min(leapRange, Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - contact));
            ctx.self.x += dir * travel;
          }
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: 0,
          delivery: { kind: "self" },
          // A burst of speed to close in, then the pounce (its empowered attack is set up in onCast).
          onSelf: [{ type: "stat", stat: "moveSpeedPercent", amount: flat(q.fraction("Increased Bonus Movement Speed")), duration: smashSeconds }, { type: "resetAttack" }],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "target", range: w.field("targetRange", "Cast range") },
          onHit: [
            { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") },
            { type: "mark", key: WOUNDED, duration: woundSeconds },
          ],
          flags: { appliesOnHit: true, parry: true },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: 0,
          delivery: { kind: "circle", range: e.field("targetRange"), radius: boltRadius, delay: boltDelay },
          onHit: [
            { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: e.quoted("slows them by 40% for 2 seconds", 0) / 100, duration: e.quoted("slows them by 40% for 2 seconds", 1) },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          // The leap takes a second wherever it goes: a cast time, then the landing.
          castTime: leapSeconds,
          onCastStart: [
            { type: "state", state: "displacementImmune", duration: leapSeconds },
            { type: "stat", stat: "health", amount: flat(r.number("Bonus Health")), duration: stormSeconds },
            { type: "stat", stat: "attackRange", amount: flat(r.quoted("50 bonus attack range", 0)), duration: stormSeconds },
          ],
          delivery: { kind: "circle", range: 0, radius: impactRadius, delay: 0 },
          onHit: [
            { type: "damage", damageType: "physical", amount: r.formula("Physical Damage") },
            { type: "cc", cc: "slow", strength: r.quoted("slowing nearby enemies by 50% decaying over 1 second", 0) / 200, duration: r.quoted("slowing nearby enemies by 50% decaying over 1 second", 1) },
          ],
          flags: { grounded: true },
        },
      ],
    };

    /** A stack of The Relentless Storm; Lightning Claws on-hit at five. */
    function storm(ctx: HookContext, onHit: boolean): void {
      const before = ctx.tick < Number(ctx.memory.stormUntil ?? -1) ? Number(ctx.memory.storm ?? 0) : 0;
      const stacks = bump(ctx, "storm", maxStacks, stackSeconds);
      ctx.buff("relentless", "attackSpeed", stacks * (speedPerStack + (speedPer100AP * derive(ctx.self).ap) / 100), stackSeconds);
      if (onHit && before >= maxStacks - 1 && ctx.memory.lastClaw !== ctx.tick) {
        ctx.memory.lastClaw = ctx.tick;
        ctx.apply({ type: "damage", damageType: "magic", amount: claws, label: "Lightning Claws" });
      }
    }
  },
};

export default volibear;
