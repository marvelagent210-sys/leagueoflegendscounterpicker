/** Tryndamere: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { applyCC } from "../../engine/sim/combat";
import { averageCritFactor } from "../../engine/rules/defense";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { HookContext } from "../../engine/sim/spec";
import { flat, maxHp, missingShare } from "./util";

const tryndamere: KitModule = {
  champion: "Tryndamere",
  build(kit) {
    const innate = kit.ability("Battle Fury");
    const q = kit.ability("Bloodlust");
    const w = kit.ability("Mocking Shout");
    const e = kit.ability("Spinning Slash");
    const r = kit.ability("Undying Rage");

    const furyPerHit = innate.quoted("Tryndamere generates 5 Fury on his basic attacks on-hit", 0);
    const furyPerCrit = innate.quoted("and 10 Fury on critical strikes", 0);
    const decayAfter = innate.quoted("After 8 seconds without dealing or taking damage", 0);
    const decayPerSecond = innate.quoted("Tryndamere loses 5 Fury per second", 0);
    // 0 to 50% critical strike chance from 0 to 100 Fury.
    const critPerFury = innate.quoted("Tryndamere gains 0 / 2.5 / 5", 1) / 100 / 5;
    const adPerMissing = q.number("Bonus Attack Damage per 1% missing health");
    const adCap = q.number("Maximum Bonus Attack Damage");
    const minHeal = q.formula("Minimum Heal");
    const healPerFury = q.formula("Heal Per 1 Fury");
    const maxHeal = q.formula("Maximum Heal");
    const shoutCut = w.number("Attack Damage Reduction");
    const shoutRadius = w.field("effectRadius");
    const shoutSeconds = w.quoted("of nearby enemy champions for 4 seconds", 0);
    const curseSlow = w.fraction("Slow");
    const curseSeconds = w.quoted("curse to all nearby enemy champions for 3.25 seconds", 0);
    const furyPerSlashHit = e.quoted("increased to 5 Fury against champions", 0);
    const slashRefund = e.quoted("doubled to 1.5 seconds against champions", 0);
    const slashRange = e.field("targetRange", "Maximum dash distance");
    e.quote("Spinning Slash has no minimum dash range");
    w.quote("A nearby enemy champion is required to cast this ability");
    const rageSeconds = r.quoted("a minimum health threshold for 5 seconds", 0);
    kit.assume("Spinning Slash's dash speed isn't on the wiki; it is taken as 1,300 units per second.");
    kit.assume("Critical strikes count by their average: Fury and Spinning Slash's cooldown refund grow with crit chance on every hit.");
    kit.assume("Mocking Shout's facing condition follows the enemy's last walking direction or a declared attack toward Tryndamere.");

    const refreshStats = (ctx: HookContext) => {
      ctx.buff("battleFury", "critChance", ctx.self.resource * critPerFury, 1e9);
      ctx.buff("bloodlust", "AD", Math.min(adCap, adPerMissing * 100 * missingShare(ctx.self)), 1e9);
    };
    const updateCurse = (ctx: HookContext) => {
      const enemy = ctx.enemy;
      if (enemy.action?.kind === "windup" || enemy.pendingAttack) ctx.memory.shoutFacing = 1;
      else if (enemy.moved !== 0) ctx.memory.shoutFacing = enemy.moved;
      const curse = enemy.statuses.find((s) => s.kind === "mark" && s.key === "mockingShout" && s.source === ctx.self.side && s.endTick > ctx.tick);
      const slows = enemy.statuses.filter((s) => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.ability === "W");
      if (!curse || Number(ctx.memory.shoutFacing ?? 1) !== -1) {
        if (slows.length) enemy.statuses = enemy.statuses.filter((s) => !slows.includes(s));
      } else if (!slows.length) applyCC(ctx.world, ctx.self, enemy, "slow", (curse.endTick - ctx.tick) / 30, curseSlow, false, "W");
    };

    const behavior: Behavior = (view) => {
      const self = view.self;
      const rage = self.spec.abilities.find((a) => a.key === "R");
      // Death prevention remains usable while the slash or a windup is running.
      if (rage && self.hp > 0 && self.hp <= 0.15 * maxHp(self) && canCast(view.world, self, rage)) return { kind: "cast", ability: "R" };
      const bloodlust = self.spec.abilities.find((a) => a.key === "Q");
      if (bloodlust && canCast(view.world, self, bloodlust) && self.hp < maxHp(self)) {
        const rageLeft = Number(self.memory.rageUntil ?? -1) - view.world.tick;
        // Heal as Undying Rage runs out, or when low without it.
        const ending = rageLeft > 0 && rageLeft <= 15;
        const low = rageLeft <= 0 && self.hp < 0.3 * maxHp(self);
        if (ending || low) return { kind: "cast", ability: "Q" };
      }
      const slash = self.spec.abilities.find((a) => a.key === "E");
      if (view.mode === "flee" && slash && canCast(view.world, self, slash)) return { kind: "cast", ability: "E", aim: { direction: -1, distance: slashRange } };
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && command.ability === "E") {
        const contact = Math.max(0, Math.abs(self.x - view.enemy.x) - self.spec.base.pathingRadius - view.enemy.spec.base.pathingRadius);
        return { ...command, aim: { direction: 1, distance: contact } };
      }
      return command;
    };

    return {
      resourceStart: 0,
      // Battle Fury at about three quarters full, and Bloodlust's AD at about half health, through a fight.
      budget: {
        damage: (self) => {
          const d = derive(self);
          const crit = Math.min(1 - d.critChance, 75 * critPerFury);
          const bloodlust = Math.min(adCap, adPerMissing * 50);
          return { physical: d.attackSpeed * ((d.ad + bloodlust) * averageCritFactor(d.critChance + crit, d.critDamage) - d.ad * averageCritFactor(d.critChance, d.critDamage)) };
        },
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Battle Fury: crit chance from Fury; Bloodlust: attack damage from missing health.
          const active = Number(ctx.memory.lastDamage ?? 0);
          if (ctx.tick - active >= decayAfter * 30) self.resource = Math.max(0, self.resource - decayPerSecond / 30);
          refreshStats(ctx);
          updateCurse(ctx);
        },
        onAttackHit(ctx) {
          const crit = ctx.critChance;
          ctx.apply({ type: "resource", amount: flat(furyPerHit + (furyPerCrit - furyPerHit) * crit) }, true);
          ctx.apply({ type: "refund", ability: "E", seconds: slashRefund * crit });
          refreshStats(ctx);
        },
        onDamageDealt(ctx) {
          ctx.memory.lastDamage = ctx.tick;
        },
        onDamageTaken(ctx) {
          ctx.memory.lastDamage = ctx.tick;
          refreshStats(ctx);
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const fury = ctx.self.resource;
            const heal = Math.min(evaluate(maxHeal, ctx.self), evaluate(minHeal, ctx.self) + fury * evaluate(healPerFury, ctx.self));
            ctx.self.resource = 0;
            ctx.apply({ type: "heal", amount: flat(heal) }, true);
            refreshStats(ctx);
          }
          if (ctx.ability.key === "R") {
            ctx.memory.rageUntil = ctx.tick + Math.ceil(rageSeconds * 30);
            refreshStats(ctx);
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") {
            ctx.apply({ type: "resource", amount: flat(furyPerSlashHit) }, true);
            refreshStats(ctx);
          }
          if (ctx.ability.key === "W") {
            // The full reduction applies to total AD, with bonus AD separately floored at zero.
            ctx.apply({ type: "stat", stat: "totalADReduction", amount: flat(shoutCut), duration: shoutSeconds });
            updateCurse(ctx);
          }
        },
      },
      behavior,
      abilities: [
        { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), castTime: q.castTime(), preserveAttackWindup: true, overlay: true, delivery: { kind: "self" }, roles: ["defense"] },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          usable: (unit, world) => Math.abs(unit.x - world.units[unit.side === 0 ? 1 : 0].x) <= shoutRadius,
          delivery: { kind: "aura", radius: shoutRadius },
          // Its total AD reduction and conditional facing slow are applied by the hook above.
          onHit: [{ type: "mark", key: "mockingShout", duration: curseSeconds }],
          roles: ["cc"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          delivery: { kind: "dash", direction: "toward", distance: slashRange, speed: 1300, hitRadius: e.field("effectRadius"), minDistance: 0, through: true },
          onHit: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
          flags: { grounded: true, knockdown: e.flag("knockdown") ?? true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          preserveAttackWindup: true,
          overlay: true,
          usable: (unit) => !(unit.action?.kind === "cast" && unit.action.ability === "W"),
          delivery: { kind: "self" },
          onSelf: [
            { type: "state", state: "minimumHealth", value: r.number("Minimum Health Threshold"), duration: rageSeconds },
            { type: "resource", amount: flat(r.number("Fury Gained")) },
          ],
          flags: { usableWhileDisabled: Boolean(r.quote("Undying Rage can be used while affected by cast-inhibiting crowd control")) },
        },
      ],
    };
  },
};

export default tryndamere;
