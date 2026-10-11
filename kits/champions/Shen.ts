/** Shen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { evaluate } from "../../engine/sim/derived";
import type { Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { flat, maxHp, ticks } from "./util";

const shen: KitModule = {
  champion: "Shen",
  build(kit) {
    const innate = kit.ability("Ki Barrier");
    const q = kit.ability("Twilight Assault");
    const w = kit.ability("Spirit's Refuge");
    const e = kit.ability("Shadow Dash");
    const r = kit.ability("Stand United");

    // Ki Barrier: a shield after each ability, sooner again when the ability touched the enemy.
    const kiShield = innate.levelValue("Shen grants himself a shield for");
    const kiBonusHP = innate.quoted("(+ 13% bonus health) for 2.5 seconds", 0) / 100;
    const kiSeconds = innate.quoted("(+ 13% bonus health) for 2.5 seconds", 1);
    const kiCooldown = innate.field("staticCooldown");
    const kiCut = innate.levelValue("Ki Barrier's cooldown is reduced by");
    // Twilight Assault: three empowered attacks, better when the blade passed through the enemy.
    const assaultAttacks = q.quoted("Shen empowers his next 3 basic attacks within 8 seconds", 0);
    const assaultWindow = q.quoted("Shen empowers his next 3 basic attacks within 8 seconds", 1);
    const assaultRange = q.quoted("to gain 75 bonus range", 0);
    const assaultSpeed = q.quoted("grant Shen 50% bonus attack speed", 0) / 100;
    const assaultSlow = q.fraction("Slow");
    const slowSeconds = q.quoted("are slowed for the next 2 seconds while moving away from Shen", 0);
    const bladeWidth = q.field("width");
    // Spirit's Refuge: blocks attacks for 1.75 seconds where the blade is.
    const refugeRadius = w.field("effectRadius");
    const refugeSeconds = w.quoted("generates a protective zone for 1.75 seconds", 0);
    // Shadow Dash: 300 to 600 units through the enemy, taunting it.
    const [dashMin = 300, dashMax = 600] = e.fieldNumbers("targetRange");
    const restore = e.at20(e.seriesIn("Dealing damage with Twilight Assault or Shadow Dash restores"), "energy restored");
    r.quote("granting the target allied champion a shield");
    kit.assume("Stand United shields an ally, so it does nothing in a duel.");
    kit.assume("The Spirit Blade starts the fight where Shen stands and stays where it was last recalled to.");
    kit.assume("Twilight Assault's slow applies whichever way the enemy walks.");
    kit.assume("Shadow Dash is aimed to end 150 units past the enemy.");

    const bladeX = (unit: Unit) => Number(unit.memory.bladeX ?? unit.x);
    /** Whether the recalled blade would pass through the enemy on its way to Shen. */
    const passesThrough = (unit: Unit, enemy: Unit) => {
      const from = bladeX(unit);
      const reach = bladeWidth / 2 + enemy.spec.base.radius;
      return (enemy.x - from) * (enemy.x - unit.x) <= 0 || Math.abs(enemy.x - from) <= reach;
    };
    const walled = (world: World, unit: Unit) =>
      world.zones.some((z) => z.kind === "projectileWall" && z.owner !== unit.side && (z.x - bladeX(unit)) * (z.x - unit.x) <= 0);

    const ki = (ctx: HookContext) => {
      if (ctx.tick < Number(ctx.memory.kiReady ?? 0)) return;
      const bonusHP = maxHp(ctx.self) - ctx.self.spec.base.hp;
      ctx.apply({ type: "shield", amount: flat(kiShield + kiBonusHP * bonusHP), duration: kiSeconds }, true);
      ctx.memory.kiReady = ctx.tick + ticks(kiCooldown);
    };
    const touched = (ctx: HookContext) => {
      ctx.memory.kiReady = Number(ctx.memory.kiReady ?? 0) - ticks(kiCut);
    };
    const assaultDamage = q.formula("Bonus Magic Damage");
    const assaultStrong = q.formula("Increased Bonus Damage");
    const assaultEvery = q.cooldown();
    const empowered = (strong: boolean): Effect => ({
      type: "empower",
      attacks: assaultAttacks,
      window: assaultWindow,
      bonusRange: assaultRange,
      onHit: [{ type: "damage", damageType: "magic", amount: strong ? assaultStrong : assaultDamage, label: q.name }],
    });

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const busy = self.action && self.action.kind !== "windup";
      const assault = self.spec.abilities.find((a) => a.key === "Q");
      if (!busy && assault && view.mode !== "idle" && view.mode !== "flee" && canCast(world, self, assault)) {
        const pending = self.statuses.some((s) => s.kind === "empower" && s.key === "Q");
        // The blade through the enemy; or a plain recall once in reach and with nothing better coming.
        if (passesThrough(self, enemy) && !walled(world, self)) return { kind: "cast", ability: "Q" };
        const dash = self.spec.abilities.find((a) => a.key === "E");
        if (!pending && inAttackRange(self, enemy) && !(dash && canCast(world, self, dash))) return { kind: "cast", ability: "Q" };
      }
      const command = defaultBehavior(view);
      if (command?.kind === "cast" && command.ability === "E") {
        // Through the enemy and a little past it.
        const gap = Math.abs(self.x - enemy.x);
        return { ...command, aim: { direction: 1, distance: Math.min(dashMax, Math.max(dashMin, gap + 150)) } };
      }
      return command;
    };

    return {
      behavior,
      budget: {
        // Twilight Assault's three attacks per cooldown, half of them through the blade's pass.
        damage: (self, target) => ({
          magic: (assaultAttacks * (evaluate(assaultDamage, self, target) + evaluate(assaultStrong, self, target))) / 2 / assaultEvery,
        }),
        // Ki Barrier, its cooldown cut by hitting the enemy.
        healing: (self) => (kiShield + kiBonusHP * (maxHp(self) - self.spec.base.hp)) / Math.max(3, kiCooldown - kiCut),
      },
      hooks: {
        onStart(ctx) {
          ctx.memory.bladeX = ctx.self.x;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            // The blade flies to Shen: through the enemy, it slows and makes the attacks stronger.
            const blocked = walled(ctx.world, ctx.self);
            const through = !blocked && passesThrough(ctx.self, ctx.enemy);
            ctx.memory.bladeX = ctx.self.x;
            if (blocked) return;
            if (through) {
              ctx.apply({ type: "cc", cc: "slow", strength: assaultSlow, duration: slowSeconds });
              ctx.buff("assaultSpeed", "attackSpeed", assaultSpeed, assaultWindow);
              ctx.apply({ type: "resource", amount: flat(restore) }, true);
              touched(ctx);
            }
            ctx.apply(empowered(through), true);
            ki(ctx);
          }
          if (key === "W") ctx.memory.refugeEnds = ctx.tick + ticks(refugeSeconds);
          if (key === "E") ctx.memory.dashing = true;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E") return;
          ctx.apply({ type: "resource", amount: flat(restore) }, true);
          touched(ctx);
        },
        onTick(ctx) {
          // Ki Barrier after the protective zone and when the dash ends.
          if (ctx.tick === Number(ctx.memory.refugeEnds ?? -1)) ki(ctx);
          if (ctx.memory.dashing && !(ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E")) {
            ctx.memory.dashing = false;
            ki(ctx);
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
          cooldownAtCastStart: true,
          delivery: { kind: "self" },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: 0,
          // Only where the blade is: Shen in its area, the zone goes up at once.
          usable: (unit) => Math.abs(bladeX(unit) - unit.x) <= refugeRadius,
          delivery: { kind: "self" },
          onSelf: [{ type: "state", state: "blockAttacks", duration: refugeSeconds }],
          roles: ["defense"],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: 0,
          // 800 units a second plus his movement speed.
          delivery: { kind: "dash", direction: "toward", distance: dashMax, minDistance: dashMin, speed: e.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 340), hitRadius: 0, through: true },
          onHit: [
            { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
            { type: "cc", cc: "taunt", duration: e.quoted("taunting them for 1.5 seconds", 0) },
          ],
          flags: { grounded: true, knockdown: true },
        },
      ],
    };
  },
};

export default shen;
