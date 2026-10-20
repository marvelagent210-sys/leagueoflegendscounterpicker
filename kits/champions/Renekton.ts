/** Renekton: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { flat, maxHp, ticks } from "./util";

const renekton: KitModule = {
  champion: "Renekton",
  build(kit) {
    const innate = kit.ability("Reign of Anger");
    const q = kit.ability("Cull the Meek");
    const w = kit.ability("Ruthless Predator");
    const e = kit.ability("Slice and Dice");
    const r = kit.ability("Dominus");

    const furyPerHit = innate.quoted("Renekton's basic attacks generate 5 Fury on-hit", 0);
    const furyCost = innate.quoted("While Renekton has at least 50 Fury", 0);
    const lowBonus = innate.quoted("Renekton generates 50% bonus Fury from all sources while below 50% of his maximum health", 0) / 100;
    const furyPerChampion = q.quoted("10 Fury for each champion hit", 0);
    const predatorChampionFury = w.quoted("Hitting an enemy champion generates 10 bonus Fury", 0);
    const diceWindow = e.quoted("he can recast Slice and Dice within the next 4 seconds", 0);
    const dominusSeconds = r.quoted("Renekton empowers himself for 15 seconds", 0);
    const dominusFury = r.quoted("and 20 Fury, as well as increasing", 0);
    const dominusFuryPerSecond = r.quoted("generates 5 Fury per second", 0);
    const dominusTick = r.quoted("he deals magic damage every 0.5 seconds", 0);
    const auraDamage = r.formula("Magic Damage Per Tick");
    const dominusRadius = r.field("effectRadius");
    const qRadii = q.fieldValues("effectRadius");
    const normalHeal = q.formula("Champion Healing");
    const furyHeal = q.formula("Enhanced Champion Healing");
    const normalHealCap = q.number("Healing Cap");
    const furyHealCap = q.number("Enhanced Healing Cap");
    w.quote("Each strike applies on-hit effects and generates Fury");
    w.quote("Ruthless Predator's first strike can critically strike for 100% AD bonus physical damage");
    w.quote("Even if empowered Ruthless Predator is blocked by a spell shield, it will still destroy any existing damage shields on the target");
    kit.assume("Renekton starts fights with no Fury.");
    kit.assume("Ruthless Predator deals two or three separate basic-damage strikes; other attached attack on-hit effects are applied once, as no additional on-hit item or champion effect is modeled for Renekton.");
    kit.assume("Dice dashes back out of a short trade, and on through the enemy in an all-in.");

    // Fury: abilities other than Slice are empowered at 50 Fury, spending it.
    const angry = (unit: Unit) => unit.resource >= furyCost;
    const gain = (ctx: HookContext, amount: number) => {
      const bonus = ctx.self.hp < 0.5 * maxHp(ctx.self) ? 1 + lowBonus : 1;
      ctx.apply({ type: "resource", amount: flat(amount * bonus) }, true);
    };
    const pair = (spec: AbilitySpec, empowered: Partial<Omit<AbilitySpec, "key" | "slot" | "cooldown" | "castTime">>): AbilitySpec[] => [
      { ...spec, usable: (unit, world) => !angry(unit) && (spec.usable?.(unit, world) ?? true) },
      {
        ...spec,
        ...empowered,
        key: `${spec.key}fury`,
        cooldownKey: spec.key,
        cost: furyCost,
        usable: (unit, world) => angry(unit) && (spec.usable?.(unit, world) ?? true),
      },
    ];
    const cull: AbilitySpec = {
      key: "Q",
      name: q.name,
      slot: "Q",
      cooldown: q.cooldown(),
      castTime: q.castTime(),
      delivery: { kind: "aura", radius: q.field("effectRadius", "Standard cleave radius") },
      onHit: [{ type: "damage", damageType: "physical", amount: q.formula("Physical Damage") }],
    };
    const predator = (strikes: Effect[], stun: number): Effect => ({
      type: "empower",
      attacks: 1,
      window: w.quoted("empowers his next basic attack within 7 seconds", 0),
      bonusRange: w.quoted("have 175 range", 0) - (kit.champion.forms[0]?.stats.attackRange ?? 125),
      resetAttack: true,
      windup: w.quoted("have a 0.2-second cast time", 0),
      split: { physical: 0, magic: 0 },
      spellShield: true,
      ...(strikes.length === 3 ? { breakShields: true } : {}),
      onHit: [...strikes, { type: "cc", cc: "stun", duration: stun }],
    });
    const perStrike = w.formula("Physical Damage Per Hit");
    const predatorStrikes = (count: number): Effect[] => Array.from({ length: count }, (_, i) => ({
      type: "damage", damageType: "physical", label: w.name,
      amount: i === 0 ? { ...perStrike, products: [{ ratio: 1, stats: ["AD", "critChance"] }] } : perStrike,
    }));
    const ruthless: AbilitySpec = {
      key: "W",
      name: w.name,
      slot: "W",
      cooldown: w.cooldown(),
      castTime: w.castTime(),
      cooldownAfter: "empower",
      delivery: { kind: "self" },
      onSelf: [predator(predatorStrikes(2), w.quoted("stunning them for 0.75 seconds", 0))],
    };
    const slice = (key: string, direction: "toward" | "away", follows: boolean, damage: Effect[]): AbilitySpec => ({
      key,
      name: follows ? `${e.name} (Dice)` : e.name,
      slot: "E",
      cooldown: follows ? 0 : e.cooldown(),
      castTime: 0,
      ...(follows ? { chain: { root: "E", index: 2, window: e.quoted("he can recast Slice and Dice within the next 4 seconds", 0) } } : {}),
      delivery: { kind: "dash", direction, distance: e.field("range"), speed: e.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 345), hitRadius: 75, through: true },
      onHit: damage,
      flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
    });
    const sliceDamage: Effect = { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") };
    const diceFury: Effect[] = [
      { type: "damage", damageType: "physical", amount: e.formula("Enhanced Physical Damage") },
      { type: "stat", stat: "armorReductionPercent", amount: flat(e.fraction("Armor Reduction")), duration: e.quoted("inflicts armor reduction to enemies hit for 4 seconds", 0) },
    ];
    const outOfTrade = (unit: Unit, world: World) => world.modes[unit.side] === "flee" || Boolean(unit.memory.tradeDone);
    const canDice = (unit: Unit) => Boolean(unit.memory.sliceHit);

    return {
      resourceStart: 0,
      // Dominus burning through an all-in.
      budget: { damage: (self, target) => ({ magic: evaluate(auraDamage, self, target) / dominusTick }) },
      hooks: {
        onAttack(ctx) {
          const action = ctx.self.action;
          ctx.memory.predatorStrike = action?.kind === "windup" && Boolean(action.empowered?.some((key) => key === "W" || key === "Wfury"));
          ctx.memory.predatorFury = action?.kind === "windup" && Boolean(action.empowered?.includes("Wfury"));
        },
        onAttackResolved(ctx) {
          ctx.memory.predatorStrike = false;
          ctx.memory.predatorFury = false;
        },
        onAttackHit(ctx) {
          if (!ctx.memory.predatorStrike) gain(ctx, furyPerHit);
          else if (!ctx.memory.predatorFury) gain(ctx, 2 * furyPerHit + predatorChampionFury);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E") {
            ctx.memory.sliceHit = true;
            if (ctx.self.chains.E) ctx.self.chains.E.until = ctx.tick + ticks(diceWindow);
          }
          if (key === "Q" || key === "Qfury") {
            const enhanced = key === "Qfury";
            ctx.apply({ type: "heal", amount: flat(Math.min(enhanced ? furyHealCap : normalHealCap, evaluate(enhanced ? furyHeal : normalHeal, ctx.self, ctx.enemy)) * ctx.scale) }, true);
          }
          // Empowered abilities don't generate Fury.
          if (key === "Q" || key === "E" || key === "E2" || key === "E2out") gain(ctx, furyPerChampion);
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") ctx.memory.sliceHit = false;
          if (ctx.ability.key === "R") {
            ctx.memory.dominusUntil = ctx.tick + ticks(dominusSeconds);
            ctx.memory.dominusDamageAt = ctx.tick + ticks(dominusTick);
            ctx.memory.dominusFuryAt = ctx.tick + 30;
            gain(ctx, dominusFury);
            ctx.self.spec = { ...ctx.self.spec, abilities: ctx.self.spec.abilities.map((ability) =>
              (ability.key === "Q" || ability.key === "Qfury") && ability.delivery.kind === "aura"
                ? { ...ability, delivery: { ...ability.delivery, radius: qRadii[1]! } }
                : ability) };
            ctx.memory.dominusGeometry = true;
          }
        },
        onTick(ctx) {
          const until = Number(ctx.memory.dominusUntil ?? -1);
          if (ctx.tick >= until && ctx.memory.dominusGeometry) {
            ctx.self.spec = { ...ctx.self.spec, abilities: ctx.self.spec.abilities.map((ability) =>
              (ability.key === "Q" || ability.key === "Qfury") && ability.delivery.kind === "aura"
                ? { ...ability, delivery: { ...ability.delivery, radius: qRadii[0]! } }
                : ability) };
            ctx.memory.dominusGeometry = false;
          }
          if (ctx.tick > until) return;
          if (ctx.tick >= Number(ctx.memory.dominusFuryAt ?? Infinity)) {
            gain(ctx, dominusFuryPerSecond);
            ctx.memory.dominusFuryAt = Number(ctx.memory.dominusFuryAt) + 30;
          }
          if (ctx.tick >= Number(ctx.memory.dominusDamageAt ?? Infinity)) {
            ctx.memory.dominusDamageAt = Number(ctx.memory.dominusDamageAt) + ticks(dominusTick);
            if (Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= dominusRadius) ctx.apply({ type: "damage", damageType: "magic", amount: auraDamage, label: "Dominus", persistent: true });
          }
        },
      },
      abilities: [
        ...pair(cull, {
          name: `${q.name} (Fury)`,
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Enhanced Damage") },
          ],
        }),
        ...pair(ruthless, {
          name: `${w.name} (Fury)`,
          onSelf: [predator(predatorStrikes(3), w.quoted("increasing the stun duration to 1.5 seconds", 0))],
        }),
        slice("E", "toward", false, [sliceDamage]),
        ...pair({ ...slice("E2", "toward", true, [sliceDamage]), usable: (unit, world) => canDice(unit) && !outOfTrade(unit, world) }, { name: `${e.name} (Dice, Fury)`, onHit: diceFury }),
        ...pair({ ...slice("E2out", "away", true, [sliceDamage]), usable: (unit, world) => canDice(unit) && outOfTrade(unit, world), roles: ["escape"] }, { name: `${e.name} (Dice escape, Fury)`, onHit: diceFury }),
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "health", amount: flat(r.number("Bonus Health")), duration: dominusSeconds },
            { type: "stat", stat: "attackRange", amount: flat(r.quoted("25 bonus attack range", 0)), duration: dominusSeconds },
          ],
          roles: ["buff"],
        },
      ],
    };
  },
};

export default renekton;
