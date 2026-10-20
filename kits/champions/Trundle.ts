/** Trundle: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHit } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { fieldAt, flat, scaled, ticks } from "./util";

const trundle: KitModule = {
  champion: "Trundle",
  build(kit) {
    const innate = kit.ability("King's Tribute");
    const q = kit.ability("Chomp");
    const w = kit.ability("Frozen Domain");
    const e = kit.ability("Pillar of Ice");
    const r = kit.ability("Subjugate");
    const tributeShare = innate.levelValue("Whenever a nearby enemy dies, Trundle heals himself") / 100;
    const tributeRadius = innate.field("effectRadius");
    const tribute = (ctx: HookContext) => {
      if (ctx.memory.tributeClaimed || (!ctx.enemy.fallen && ctx.enemy.alive && ctx.enemy.hp > 0)) return;
      // A zombie's reanimation and subsequent expiry are the same champion death.
      ctx.memory.tributeClaimed = true;
      if (Math.abs(ctx.self.x - ctx.enemy.x) <= tributeRadius) {
        ctx.apply({ type: "heal", amount: flat(tributeShare * derive(ctx.enemy).maxHp) }, true);
        ctx.log(innate.name);
      }
    };

    // Chomp: an empowered bite that slows, then borrows the enemy's attack damage for 5 seconds.
    const biteWindow = q.quoted("empowers his next basic attack within 7 seconds", 0);
    const biteRange = q.quoted("gain 25 bonus range", 0);
    const biteSlow = q.quoted("slow the target by 75% for 0.1 seconds", 0) / 100;
    const biteSlowFor = q.quoted("slow the target by 75% for 0.1 seconds", 1);
    const stolenFor = q.quoted("Trundle gains bonus attack damage for 5 seconds", 0);
    const gained = q.number("Bonus Attack Damage");
    const taken = q.number("Attack Damage Reduction");
    q.quote("Chomp will still incur the attack damage increase for Trundle even if the attack is dodged, blocked, missed while he is blinded, or it is blocked by spell shield");
    q.quote("Spell shield will only block the attack damage reduction and slow");
    const bite: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: 0, castTime: 0, delivery: { kind: "self" } };

    // Frozen Domain: ice where Trundle fights; standing on it, he attacks and moves faster and heals more.
    const domainSeconds = w.quoted("Trundle coats the target location in ice for 8 seconds", 0);
    const domainHeal = w.quoted("and 25% increased healing from all sources", 0) / 100;
    const domainRadius = w.field("effectRadius");
    const onIce: Effect[] = [
      { type: "stat", stat: "attackSpeed", amount: flat(w.fraction("Bonus Attack Speed")), duration: 0.3 },
      { type: "stat", stat: "moveSpeedPercent", amount: flat(w.fraction("Bonus Movement Speed")), duration: 0.3 },
      { type: "stat", stat: "healingIncrease", amount: flat(domainHeal), duration: 0.3 },
    ];
    kit.assume("Frozen Domain is laid where the enemy stands.");

    // Pillar of Ice: terrain that knocks units out of its way and slows enemies near it.
    const pillarSeconds = e.quoted("Trundle erects a pillar of ice at the target location for 6 seconds", 0);
    const pillarRadius = e.quoted("Pillar radius: 150", 0);
    const slowRadius = e.field("effectRadius", "Slow zone radius");
    const knockTo = e.field("effectRadius", "Knockback radius and destination");
    const pillarSlow = e.fraction("Slow");
    const pillarRange = e.field("targetRange");
    const knockSeconds = 0.25;
    kit.assume(
      `Trundle raises the pillar touching the enemy, its center ${pillarRadius} units past the enemy's: behind it to cut off its retreat (it is knocked ${knockTo - pillarRadius} units toward him), or, when he is getting away, between them. The knock back takes ${knockSeconds} s (the wiki gives no duration); units walk around the pillar.`,
    );

    // Subjugate: drains health and resistances, half at once and half over 4 seconds.
    const drainSeconds = r.quoted("the other half is applied every second over the next 4 seconds", 0);
    const firstShare = r.quoted("The target's resistances will be further reduced by 5% per drain tick, up to 20% by the end of the drain (totaling to 40% reduction from the initial 20% reduction on-cast)", 3) / 100;
    const perTick = r.quoted("The target's resistances will be further reduced by 5% per drain tick", 0) / 100;
    const linger = r.quoted("The resistances reduction on the target will linger for 4 seconds after the drain has ended", 0);
    const initialHeal = r.formula("Initial Healing");
    const healPerSecond = r.formula("Healing Per Second");
    const drain: Formula = scaled(r.formula("Magic Damage Per Second"), drainSeconds);
    kit.assume("Subjugate's size changes (a few units of attack range) are left out.");

    const total = drainSeconds + linger;
    return {
      hooks: {
        onTick: tribute,
        onDamageDealt: tribute,
        onAttack(ctx) {
          const attack = ctx.self.action;
          ctx.memory.chompPending = attack?.kind === "windup" && (attack.empowered?.includes("Q") ?? false);
        },
        onAttackHit(ctx) {
          if (!ctx.memory.chompPending) return;
          abilityHit(ctx.world, ctx.self, ctx.enemy, bite, [
            { type: "cc", cc: "slow", strength: biteSlow, duration: biteSlowFor },
            { type: "stat", stat: "AD", amount: flat(-taken), duration: stolenFor },
          ]);
        },
        onAttackResolved(ctx) {
          if (!ctx.memory.chompPending) return;
          ctx.memory.chompPending = false;
          // Chomp's own attack uses the old AD; the self-buff is granted after its resolution,
          // including a blind miss, dodge, damage block, parry or spell-shielded debuff.
          ctx.buff("chompAD", "AD", gained, stolenFor);
        },
        onCast(ctx) {
          if (ctx.ability.key !== "E") return;
          const self = ctx.self;
          const enemy = ctx.enemy;
          const away = enemy.x >= self.x ? 1 : -1;
          // Behind the enemy, or between them when Trundle is getting away.
          const fleeing = ctx.world.modes[self.side] === "flee";
          const center = enemy.x + (fleeing ? -away : away) * pillarRadius;
          ctx.world.terrain.push({ id: ctx.world.nextId++, owner: self.side, from: center - pillarRadius, to: center + pillarRadius, endTick: ctx.tick + ticks(pillarSeconds), round: true });
          // Knocked out of the pillar's way.
          const push = knockTo - Math.abs(enemy.x - center);
          if (push > 0) ctx.apply({ type: "displace", direction: fleeing ? "away" : "toward", distance: push, duration: knockSeconds });
          fieldAt(ctx, "E", center, slowRadius, pillarSeconds, 0.25, [{ type: "cc", cc: "slow", strength: pillarSlow, duration: 0.3 }]);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "R") return;
          // The drain snapshots the enemy's resistances; each step steals more, until 4 seconds after it ends.
          const t = derive(ctx.enemy);
          const armor = t.armor.base + t.armor.bonus;
          const mr = t.mr.base + t.mr.bonus;
          const heal = (amount: Formula) => flat(evaluate(amount, ctx.self, ctx.enemy));
          ctx.apply({ type: "heal", amount: heal(initialHeal) }, true);
          for (let step = 0; step <= drainSeconds; step++) {
            const share = firstShare + perTick * step;
            const steal: Effect[] = [
              { type: "stat", stat: "armorReduction", amount: flat(share * armor), duration: total - step },
              { type: "stat", stat: "mrReduction", amount: flat(share * mr), duration: total - step },
            ];
            const gain: Effect[] = [
              { type: "stat", stat: "armor", amount: flat(share * armor), duration: total - step },
              { type: "stat", stat: "MR", amount: flat(share * mr), duration: total - step },
              ...(step > 0 ? [{ type: "heal" as const, amount: heal(healPerSecond) }] : []),
            ];
            if (step === 0) {
              for (const effect of steal) ctx.apply(effect);
              for (const effect of gain) ctx.apply(effect, true);
            } else {
              ctx.apply({ type: "delayed", delay: step, effects: steal });
              ctx.apply({ type: "delayed", delay: step, effects: gain }, true);
            }
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
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: biteWindow,
              bonusRange: biteRange,
              uncancellable: true,
              resetAttack: true,
              onHit: [
                { type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage"), label: q.name },
              ],
            },
          ],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: 0,
          delivery: { kind: "field", range: w.field("targetRange"), radius: domainRadius, duration: domainSeconds, interval: 0.25, onOwner: onIce },
          roles: ["buff"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          delivery: { kind: "self" },
          usable: (unit, world) => {
            const enemy = world.units[unit.side === 0 ? 1 : 0];
            return Math.abs(enemy.x - unit.x) <= pillarRange;
          },
          roles: ["cc"],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [
            { type: "damage", damageType: "magic", amount: r.formula("Initial Magic Damage") },
            { type: "dot", damageType: "magic", total: drain, duration: drainSeconds, interval: 1 },
          ],
        },
      ],
    };
  },
};

export default trundle;
