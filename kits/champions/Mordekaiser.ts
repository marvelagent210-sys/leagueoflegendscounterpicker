/** Mordekaiser: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { Formula, HookContext } from "../../engine/sim/spec";
import { bump, counter, flat, innateStat, maxHp, scaled, ticks } from "./util";

const mordekaiser: KitModule = {
  champion: "Mordekaiser",
  build(kit) {
    const innate = kit.ability("Darkness Rise");
    const q = kit.ability("Obliterate");
    const w = kit.ability("Indestructible");
    const e = kit.ability("Death's Grasp");
    const r = kit.ability("Realm of Death");

    // Darkness Rise: three stacks from hits on the enemy start an aura that burns every second.
    const onHitAP = innate.quoted("Mordekaiser's basic attacks are empowered to deal 40% AP bonus magic damage on-hit", 0) / 100;
    const stackSeconds = innate.quoted("lasting for 4 seconds, refreshing on subsequent triggers, and stacking up to 3 times", 0);
    const maxStacks = innate.quoted("lasting for 4 seconds, refreshing on subsequent triggers, and stacking up to 3 times", 1);
    const auraRadius = innate.field("effectRadius");
    const auraHaste = innate.at20(innate.seriesIn("Darkness Rise: Mordekaiser gains"), "Darkness Rise movement speed") / 100;
    const auraShare = innate.levelValue("Darkness Rise: Mordekaiser gains", 1) / 100;
    const aura: Formula = {
      base: innate.quoted("deals 5 (+ 30% AP)", 0),
      ratios: { AP: innate.quoted("deals 5 (+ 30% AP)", 1) / 100, targetMaxHP: auraShare },
    };
    // Obliterate: against an isolated enemy, 50% more.
    const isolated = 1 + q.fraction("Isolated Damage Increase");
    const obliterate: Formula = (() => {
      // "Magic Damage": a level-based base, a rank-based base, and ratios.
      const amount = q.record.parts.flatMap((p) => p.leveling).find((l) => l.label === "Magic Damage")?.amount;
      if (!amount) throw new Error("Mordekaiser kit: Obliterate's damage is gone from the wiki");
      const byLevel = q.at20(amount.base, "Obliterate level damage");
      let byRank = 0;
      const ratios: Formula["ratios"] = {};
      for (const term of amount.scaling) {
        const value = q.at20(term.ratio, `Obliterate ${term.text}`);
        if (term.stat.startsWith("other")) byRank += value;
        else if (term.stat === "bonusAD") ratios.bonusAD = value / 100;
        else if (term.stat === "AP") ratios.AP = value / 100;
        else throw new Error(`Mordekaiser kit: Obliterate scales with ${term.stat}`);
      }
      return { base: byLevel + byRank, ratios };
    })();
    // Indestructible: a share of damage dealt and taken becomes a shield, part of which can be healed.
    const dealtShare = w.quoted("Mordekaiser stores 45% of the post-mitigation damage he deals", 0) / 100;
    const takenShare = w.quoted("and 7.5% of the pre-mitigation damage he takes", 0) / 100;
    const capShare = w.quoted("up to 30% of his maximum health", 0) / 100;
    const floorShare = w.quoted("will not decay below a minimum of 5% of his maximum health", 0) / 100;
    const shieldSeconds = w.quoted("to grant himself a shield for the same amount for 4 seconds", 0);
    const recastAfter = w.quoted("Indestructible can be recast after 0.5 seconds", 0);
    const toHealing = w.fraction("Shield to Healing");
    const holdShield = 2;
    // Death's Grasp.
    const graspDelay = e.quoted("After 0.5 seconds, it deals magic damage to enemies within and pulls them over 250 units", 0);
    const pull = e.quoted("After 0.5 seconds, it deals magic damage to enemies within and pulls them over 250 units", 1);
    const graspReach = e.field("targetRange", "Maximum range");
    const shieldEvery = w.cooldown();
    // Realm of Death.
    const realmRange = r.field("targetRange");
    const realmSeconds = r.quoted("banishing them with him to the Death Realm for 7 seconds", 0);
    const steal = r.quoted("healing himself for 10% of their maximum health and reducing their current ability power", 0) / 100;
    const realmRadius = r.field("effectRadius");
    kit.assume("Obliterate always hits an isolated enemy (no minions in its line).");
    kit.assume(`Death's Grasp's claw, ${e.field("width")} units wide, is a ground area the enemy can step out of; its pull takes 0.25 seconds.`);
    kit.assume(`Indestructible's shield doesn't decay; Mordekaiser recasts it ${holdShield} seconds later to heal for what is left.`);
    kit.assume("Realm of Death is centered between the two champions; neither can leave it for its duration.");
    kit.assume("Realm of Death's slow during its cast time is left out.");

    const potential = (ctx: HookContext) => Number(ctx.memory.potential ?? floorShare * maxHp(ctx.self));
    const store = (ctx: HookContext, amount: number) => {
      ctx.memory.potential = Math.min(capShare * maxHp(ctx.self), potential(ctx) + amount);
    };
    const realm = (ctx: HookContext) => ctx.tick < Number(ctx.memory.realmUntil ?? -1);

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const busy = self.action && self.action.kind !== "windup";
      const ultimate = self.spec.abilities.find((a) => a.key === "R");
      // Realm of Death opens an all-in: in fights, as soon as the enemy is in range.
      if (!busy && ultimate && (view.mode === "fight" || view.mode === "hold") && Math.abs(self.x - enemy.x) <= realmRange && canCast(world, self, ultimate)) {
        return { kind: "cast", ability: "R" };
      }
      // Indestructible once the stored shield is worth it, or when health runs low.
      const shield = self.spec.abilities.find((a) => a.key === "W");
      const stored = Number(self.memory.potential ?? 0);
      if (!busy && shield && view.mode !== "idle" && canCast(world, self, shield) && view.threats.length + (view.distance < 300 ? 1 : 0) > 0) {
        if (stored >= 0.2 * maxHp(self) || self.hp < 0.4 * maxHp(self)) return { kind: "cast", ability: "W" };
      }
      return defaultBehavior(view);
    };

    return {
      behavior,
      budget: {
        // Darkness Rise burning through the fight, and Indestructible's stored shield once per cooldown.
        damage: (self, target) => ({ magic: evaluate(aura, self, target) }),
        healing: (self) => (0.2 * maxHp(self)) / shieldEvery,
      },
      attack: { onHit: [{ type: "damage", damageType: "magic", amount: { base: 0, ratios: { AP: onHitAP } }, label: innate.name }] },
      start: [innateStat("magicPenPercent", e.fraction("Magic Penetration"))],
      hooks: {
        onAttackHit(ctx) {
          if (bump(ctx, "darkness", maxStacks, stackSeconds) >= maxStacks) ctx.buff("darknessHaste", "moveSpeedPercent", auraHaste, stackSeconds);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "E" || key === "W2") {
            if (bump(ctx, "darkness", maxStacks, stackSeconds) >= maxStacks) ctx.buff("darknessHaste", "moveSpeedPercent", auraHaste, stackSeconds);
          }
          if (key === "R") {
            // Into the Death Realm: a tenth of the enemy's stats change sides for its duration.
            const self = ctx.self;
            const enemy = ctx.enemy;
            const mine = derive(self);
            const theirs = derive(enemy);
            const take = (stat: "AP" | "AD" | "armor" | "MR", amount: number) => {
              ctx.apply({ type: "stat", stat, amount: flat(-amount), duration: realmSeconds });
              ctx.apply({ type: "stat", stat, amount: flat(amount), duration: realmSeconds }, true);
            };
            take("AP", steal * theirs.ap);
            take("AD", steal * theirs.ad);
            take("armor", steal * (theirs.armor.base + theirs.armor.bonus));
            take("MR", steal * (theirs.mr.base + theirs.mr.bonus));
            // Attack speed: a tenth of their total, in each side's own bonus attack speed.
            const speed = steal * theirs.attackSpeed;
            ctx.apply({ type: "stat", stat: "attackSpeed", amount: flat(-speed / enemy.spec.base.attackSpeed.ratio), duration: realmSeconds });
            ctx.apply({ type: "stat", stat: "attackSpeed", amount: flat(speed / self.spec.base.attackSpeed.ratio), duration: realmSeconds }, true);
            // Maximum health: the enemy loses it from its current health too; Mordekaiser keeps his health share.
            const health = steal * theirs.maxHp;
            const share = self.hp / mine.maxHp;
            ctx.apply({ type: "stat", stat: "health", amount: flat(-health), duration: realmSeconds });
            enemy.hp = Math.max(1, enemy.hp - health);
            ctx.apply({ type: "stat", stat: "health", amount: flat(health), duration: realmSeconds }, true);
            self.hp = share * maxHp(self);
            ctx.apply({ type: "heal", amount: flat(steal * theirs.maxHp) }, true);
            ctx.memory.realmUntil = ctx.tick + ticks(realmSeconds);
            ctx.memory.realmX = (self.x + enemy.x) / 2;
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            // The stored shield goes up; the store starts over from its floor once the cooldown ends.
            ctx.apply({ type: "shield", amount: flat(potential(ctx)), duration: shieldSeconds }, true);
            ctx.memory.potential = 0;
          }
          if (ctx.ability.key === "W2") {
            const left = ctx.self.statuses.filter((s) => s.kind === "shield" && s.key === "W").reduce((sum, s) => sum + s.value, 0);
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "shield" && s.key === "W"));
            if (left > 0) ctx.apply({ type: "heal", amount: flat(toHealing * left) }, true);
          }
        },
        onDamageDealt(ctx) {
          store(ctx, dealtShare * ctx.mitigated);
        },
        onDamageTaken(ctx) {
          store(ctx, takenShare * ctx.raw);
        },
        onTick(ctx) {
          // Back off cooldown, the store is at least its floor.
          if (ctx.tick >= Number(ctx.self.cooldownReady.W ?? 0) && potential(ctx) < floorShare * maxHp(ctx.self)) ctx.memory.potential = floorShare * maxHp(ctx.self);
          // Darkness Rise burns nearby enemies every second.
          if (counter(ctx, "darkness") >= maxStacks) {
            const since = Number(ctx.memory.auraTick ?? -1);
            if (since < 0 || ctx.tick - since >= 30) {
              ctx.memory.auraTick = ctx.tick;
              if (Math.abs(ctx.self.x - ctx.enemy.x) - ctx.enemy.spec.base.radius <= auraRadius) {
                ctx.apply({ type: "damage", damageType: "magic", amount: aura, label: innate.name });
              }
            }
          } else ctx.memory.auraTick = -1;
          // Nobody leaves the Death Realm.
          if (realm(ctx)) {
            const center = Number(ctx.memory.realmX);
            for (const unit of [ctx.self, ctx.enemy]) {
              if (Math.abs(unit.x - center) > realmRadius) unit.x = center + Math.sign(unit.x - center) * realmRadius;
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
          castTime: q.castTime(),
          // A line from 22.5 to 625 units out, 90 units wide at the start and 150 at the end.
          delivery: { kind: "line", range: q.fieldNumbers("range").at(-1) ?? 625, width: ((q.fieldNumbers("width")[0] ?? 90) + (q.fieldNumbers("width")[1] ?? 150)) / 2 },
          onHit: [{ type: "damage", damageType: "magic", amount: scaled(obliterate, isolated) }],
          flags: { projectile: false },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: 0,
          chainCooldown: "last",
          delivery: { kind: "self" },
          roles: ["defense"],
        },
        {
          key: "W2",
          name: `${w.name} (recast)`,
          slot: "W",
          cooldown: 0,
          castTime: 0,
          chain: { root: "W", index: 2, window: Math.max(recastAfter, holdShield), delay: recastAfter, auto: true },
          usable: () => false,
          delivery: { kind: "self" },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          // Cast up to its range, the claw reaches 200 units past it.
          delivery: { kind: "circle", range: graspReach, radius: e.field("width") / 2, delay: graspDelay },
          onHit: [
            { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
            { type: "displace", direction: "toward", distance: pull, duration: 0.25 },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: realmRange },
          onHit: [{ type: "mark", key: "realm", duration: realmSeconds }],
          roles: ["engage"],
        },
      ],
    };
  },
};

export default mordekaiser;
