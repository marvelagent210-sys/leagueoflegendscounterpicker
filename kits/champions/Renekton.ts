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
    const dominusSeconds = r.quoted("Renekton empowers himself for 15 seconds", 0);
    const dominusFury = r.quoted("and 20 Fury, as well as increasing", 0);
    const dominusFuryPerSecond = r.quoted("generates 5 Fury per second", 0);
    const dominusTick = r.quoted("he deals magic damage every 0.5 seconds", 0);
    const dominusRadius = r.field("effectRadius");
    kit.assume("Renekton starts fights with no Fury.");
    kit.assume("Ruthless Predator's extra strikes count as bonus damage on one attack; their extra on-hit effects aren't applied.");
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
      onHit: [
        { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
        { type: "caster", effects: [{ type: "heal", amount: q.formula("Champion Healing") }] },
      ],
    };
    const predator = (strikes: Effect[], stun: number): Effect => ({
      type: "empower",
      attacks: 1,
      window: w.quoted("empowers his next basic attack within 7 seconds", 0),
      bonusRange: w.quoted("have 175 range", 0) - (kit.champion.forms[0]?.stats.attackRange ?? 125),
      resetAttack: true,
      onHit: [...strikes, { type: "cc", cc: "stun", duration: stun }],
    });
    // The empowered attack's total minus the attack's own 100% AD.
    const extra = (total: { base: number; ratios?: { AD?: number } }): Effect => ({ type: "damage", damageType: "physical", amount: { base: total.base, ratios: { AD: (total.ratios?.AD ?? 0) - 1 } }, label: "Ruthless Predator" });
    const ruthless: AbilitySpec = {
      key: "W",
      name: w.name,
      slot: "W",
      cooldown: w.cooldown(),
      castTime: w.castTime(),
      delivery: { kind: "self" },
      onSelf: [predator([extra(w.formula("Total Physical Damage"))], w.quoted("stunning them for 0.75 seconds", 0))],
    };
    const empoweredTotal = (() => {
      // The Reign of Anger part lists its own "Total Physical Damage".
      const part = w.record.parts.find((p) => p.label === "Reign of Anger Bonus");
      const row = part?.leveling.find((l) => l.label === "Total Physical Damage");
      if (!row) throw new Error("Renekton kit: Ruthless Predator's empowered damage is gone from the wiki");
      return { base: w.at20(row.amount.base, "empowered total"), ratios: { AD: w.at20(row.amount.scaling[0]?.ratio, "empowered ratio") / 100 } };
    })();
    const slice = (key: string, direction: "toward" | "away", follows: boolean, damage: Effect[]): AbilitySpec => ({
      key,
      name: follows ? `${e.name} (Dice)` : e.name,
      slot: "E",
      cooldown: follows ? 0 : e.cooldown(),
      castTime: 0,
      ...(follows ? { chain: { root: "E", index: 2, window: e.quoted("he can recast Slice and Dice within the next 4 seconds", 0) } } : {}),
      delivery: { kind: "dash", direction, distance: e.field("range"), speed: e.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 345), ...(direction === "toward" ? { hitRadius: 75 } : {}) },
      onHit: damage,
      flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
    });
    const sliceDamage: Effect = { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") };
    const diceFury: Effect[] = [
      { type: "damage", damageType: "physical", amount: e.formula("Enhanced Physical Damage") },
      { type: "stat", stat: "armorReductionPercent", amount: flat(e.fraction("Armor Reduction")), duration: e.quoted("inflicts armor reduction to enemies hit for 4 seconds", 0) },
    ];
    const outOfTrade = (unit: Unit, world: World) => world.modes[unit.side] === "flee" || Boolean(unit.memory.tradeDone);

    return {
      resourceStart: 0,
      // Dominus burning through an all-in.
      budget: { damage: (self, target) => ({ magic: evaluate(r.formula("Magic Damage Per Tick"), self, target) / dominusTick }) },
      hooks: {
        onAttackHit(ctx) {
          gain(ctx, furyPerHit);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          // Empowered abilities don't generate Fury.
          if (key === "Q" || key === "E" || key === "E2") gain(ctx, furyPerChampion);
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.dominusUntil = ctx.tick + ticks(dominusSeconds);
            gain(ctx, dominusFury);
          }
        },
        onTick(ctx) {
          const until = Number(ctx.memory.dominusUntil ?? -1);
          if (ctx.tick >= until) return;
          if ((until - ctx.tick) % 30 === 0) gain(ctx, dominusFuryPerSecond);
          if ((until - ctx.tick) % ticks(dominusTick) === 0 && Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= dominusRadius) {
            ctx.apply({ type: "damage", damageType: "magic", amount: r.formula("Magic Damage Per Tick"), label: "Dominus" });
          }
        },
      },
      abilities: [
        ...pair(cull, {
          name: `${q.name} (Fury)`,
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Enhanced Damage") },
            { type: "caster", effects: [{ type: "heal", amount: q.formula("Enhanced Champion Healing") }] },
          ],
        }),
        ...pair(ruthless, {
          name: `${w.name} (Fury)`,
          onSelf: [predator([extra(empoweredTotal)], w.quoted("increasing the stun duration to 1.5 seconds", 0))],
        }),
        slice("E", "toward", false, [sliceDamage]),
        ...pair({ ...slice("E2", "toward", true, [sliceDamage]), usable: (unit, world) => !outOfTrade(unit, world) }, { name: `${e.name} (Dice, Fury)`, onHit: [sliceDamage, ...diceFury] }),
        { ...slice("E2out", "away", true, []), chain: { root: "E", index: 2, window: e.quoted("he can recast Slice and Dice within the next 4 seconds", 0) }, usable: outOfTrade, roles: ["escape"] },
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
