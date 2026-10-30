/**
 * Rek'Sai (patch 26.20): Fury from attacks and abilities heals her when she burrows and turns
 * Furious Bite into true damage. Burrowed, she moves faster, fires Prey Seeker and unburrows
 * under the enemy to knock it up; above ground, Queen's Wrath empowers three attacks. Void Rush
 * vanishes and pounces through an enemy she has recently damaged.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, directionTo, isUntargetable, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { FOREVER, seriesAt, ticks } from "./util";

const BURROWED = "reksai:burrowed";
const EPS = 1e-6;

const reksai: KitModule = {
  champion: "RekSai",
  build(kit) {
    const p = kit.ability("Fury of the Xer'Sai");
    const wrath = kit.ability("Queen's Wrath");
    const seeker = kit.ability("Prey Seeker");
    const burrow = kit.ability("Burrow");
    const unburrow = kit.ability("Unburrow");
    const bite = kit.ability("Furious Bite");
    const tunnel = kit.ability("Tunnel");
    const r = kit.ability("Void Rush");

    // Fury: 25 per attack and per ability that hits (but Queen's Wrath); burrowing turns it into healing over 3 s.
    const furyPerHit = p.quoted("Rek'Sai basic attacks generate 25 Fury on-hit", 0);
    p.quote("Rek'Sai's abilities other than Queen's Wrath generate 25 Fury upon hitting at least one unit.");
    const healWords = "When Rek'Sai becomes Burrowed, she consumes her current Fury over 3 seconds to heal for";
    const healSeconds = p.quoted("she consumes her current Fury over 3 seconds", 0);
    const healByFury = p.seriesIn(healWords, 0);
    const healShare = p.levelValue(healWords, 1) / 100;
    p.quote("stopping once fully consumed or she reaches full health");
    const healSteps = 6;
    kit.assume("Rek'Sai starts a fight with full Fury and unburrowed; Fury's decay out of combat doesn't come up in a duel. Burrowing's heal comes in 6 even steps over its 3 s. Tunnel is a one-way dash: going back through it is left out.");

    // Queen's Wrath: 35% attack speed for 3 s; three empowered attacks of 50% AD more, each refreshing the 3 s.
    const wrathWords = "Rek'Sai gains 35% bonus attack speed for 3 seconds";
    const wrathSpeed = wrath.quoted(wrathWords, 0) / 100;
    const wrathSeconds = wrath.quoted(wrathWords, 1);
    const wrathAttacks = wrath.quoted("If Rek'Sai completes an attack, the duration is refreshed, for up to 3 total empowered attacks.", 0);
    wrath.quote("Queen's Wrath's damage to the primary target is affected by critical strike modifiers.");
    wrath.quote("Queen's Wrath resets Rek'Sai's basic attack timer.");
    wrath.quote("When dodged or blocked, or if Rek'Sai is blinded, the damage dealt to the primary target is nullified");
    wrath.textField("cooldownStart");
    const wrathBonus = wrath.formula("Bonus Physical Damage");

    // Burrow: 50 less attack range, ghosting and 25 movement speed; Unburrow knocks up within 220 for 1 s, each target once per 6 s.
    const burrowRange = burrow.quoted("reducing her attack range by 50", 0);
    const burrowSpeed = burrow.number("Bonus Movement Speed");
    burrow.quote("She also becomes ghosted and gains bonus movement speed");
    burrow.textField("cooldownStart");
    const knockRadius = unburrow.field("effectRadius", "Knock up radius");
    const knockSeconds = unburrow.quoted("emerging from the ground to deal magic damage to nearby enemies and knock them up for 1 second", 0);
    const reknock = unburrow.field("targetCooldown");
    const unburrowAfter = unburrow.field("staticCooldown");
    const lockout = unburrow.quoted("Rek'Sai becomes unable to move or attack for 0.15 seconds after hitting an enemy with Unburrow.", 0);
    unburrow.quote("Targets hit cannot be displaced by Unburrow again for some time.");
    const emergeDamage = unburrow.formula("Magic Damage");

    // Furious Bite: true damage, 20% more, at full Fury.
    bite.quote("At maximum Fury, Furious Bite deals 120% damage and is converted to true damage.");
    const biteDamage = bite.formula("Physical Damage");
    const furyBite = bite.formula("True Damage");

    // Void Rush: needs an enemy marked by her damage in the last 5 s; vanishes for 0.9 s, then pounces through it.
    const markSeconds = r.quoted("Rek'Sai applies Marked as Prey to enemy champions she damages, lasting for 5 seconds.", 0);
    const vanish = r.quoted("After 0.9 seconds, she blinks to a location near the target", 0);
    const through = r.quoted("dashes 125 units through them", 0);
    const rushDamage = r.formula("Physical Damage");
    r.quote("Rek'Sai gains the displacement immunity from the start of the cast time, and loses it once her dash ends.");
    r.quote("Void Rush will not deal damage if the target is untargetable by the time Rek'Sai reaches them.");
    r.quote("She will always emerge as Unburrowed.");

    const burrowed = (unit: Unit) => unit.memory[BURROWED] === true;
    const marked = (unit: Unit, tick: number) => tick < Number(unit.memory["reksai:markUntil"] ?? -1);
    const rushing = (unit: Unit, tick: number) => tick < Number(unit.memory["reksai:rushAt"] ?? -1);
    const maxFury = (unit: Unit) => derive(unit).maxResource;
    const addFury = (ctx: HookContext) => { ctx.self.resource = Math.min(maxFury(ctx.self), ctx.self.resource + furyPerHit); };
    const enemyOf = (world: World, unit: Unit) => world.units[unit.side === 0 ? 1 : 0];

    const tagged = (ctx: HookContext, state: "ghosted" | "noAttacks" | "untargetable" | "displacementImmune" | "noMovement", seconds: number, memoKey: string) => {
      ctx.apply({ type: "state", state, duration: seconds }, true);
      const made = ctx.self.statuses.findLast((s) => s.kind === "state" && s.key === state && s.startTick === ctx.tick);
      if (made) made.memoKey = memoKey;
    };
    const goUnder = (ctx: HookContext) => {
      ctx.memory[BURROWED] = true;
      ctx.buff("reksai:burrowRange", "attackRange", -burrowRange, FOREVER);
      ctx.buff("reksai:burrowSpeed", "moveSpeedFlat", burrowSpeed, FOREVER);
      tagged(ctx, "ghosted", FOREVER, "reksai:burrow");
      tagged(ctx, "noAttacks", FOREVER, "reksai:burrow");
      // Her Fury turns into healing over the next 3 s.
      const fury = ctx.self.resource;
      ctx.memory["reksai:healFury"] = fury;
      ctx.memory["reksai:healLeft"] = healSteps;
      ctx.memory["reksai:healAt"] = ctx.tick + ticks(healSeconds / healSteps);
      ctx.memory["reksai:healTotal"] = (seriesAt(healByFury, fury, true) / 100) * healShare * derive(ctx.self).maxHp;
    };
    const emerge = (ctx: HookContext) => {
      ctx.memory[BURROWED] = false;
      ctx.buff("reksai:burrowRange", "attackRange", 0, 0);
      ctx.buff("reksai:burrowSpeed", "moveSpeedFlat", 0, 0);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "reksai:burrow");
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: wrath.name, slot: "Q", cooldown: wrath.cooldown(), castTime: 0, cooldownAfter: "empower",
      usable: (unit) => !burrowed(unit),
      delivery: { kind: "self" },
      onSelf: [
        { type: "stat", stat: "attackSpeed", amount: { base: wrathSpeed }, duration: wrathSeconds },
        { type: "empower", attacks: wrathAttacks, window: wrathSeconds, uncancellable: true, resetAttack: true, onHit: [{ type: "damage", damageType: "physical", amount: wrathBonus, canCrit: true, label: wrath.name }] },
      ],
      roles: ["damage", "buff"],
    };
    const qbSpec: AbilitySpec = {
      key: "QB", name: seeker.name, slot: "Q", cooldown: seeker.cooldown(), castTime: seeker.castTime(),
      usable: (unit) => burrowed(unit),
      delivery: { kind: "line", range: seeker.field("targetRange"), width: seeker.field("width"), speed: seeker.field("speed"), collisionPet: true },
      onHit: [{ type: "damage", damageType: "magic", amount: seeker.formula("Magic Damage") }, { type: "state", state: "revealed", duration: seeker.quoted("revealing them for 5 seconds", 0) }],
      flags: { projectile: true, spellShield: true },
    };
    const wSpec: AbilitySpec = {
      key: "W", name: burrow.name, slot: "W", cooldown: burrow.cooldown(), castTime: 0, countsAsCast: false,
      usable: (unit) => !burrowed(unit),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const wbSpec: AbilitySpec = {
      key: "WB", name: unburrow.name, slot: "W", cooldown: 0, castTime: 0, countsAsCast: false,
      usable: (unit, world) => burrowed(unit) && world.tick >= Number(unit.memory["reksai:unburrowReady"] ?? 0),
      delivery: { kind: "self" },
      roles: ["cc", "damage"],
      estimate: (self, target) => evaluate(emergeDamage, self, target),
    };
    const unburrowHit: Effect[] = [{ type: "damage", damageType: "magic", amount: emergeDamage }, { type: "displace", direction: "away", distance: 0, duration: knockSeconds }];
    const eSpec: AbilitySpec = {
      key: "E", name: bite.name, slot: "E", cooldown: bite.cooldown(), castTime: bite.castTime(), cancelOnInvalidTarget: true,
      usable: (unit) => !burrowed(unit),
      delivery: { kind: "target", range: bite.field("targetRange") },
      onHit: [{ type: "damage", damageType: "physical", amount: biteDamage }],
      flags: { spellShield: true },
      estimate: (self, target) => evaluate(self.resource >= maxFury(self) - EPS ? furyBite : biteDamage, self, target),
    };
    // Tunnel: a dash of 850 at 500 plus her movement speed.
    tunnel.quote("Rek'Sai cannot enter a tunnel while immobilized, grounded, or silenced.");
    const tunnelBase = tunnel.field("speed");
    const ebSpec: AbilitySpec = {
      key: "EB", name: tunnel.name, slot: "E", cooldown: tunnel.cooldown(), castTime: 0,
      usable: (unit) => burrowed(unit),
      delivery: { kind: "dash", direction: "toward", distance: tunnel.field("targetRange"), minDistance: 0, speed: tunnelBase, speedFor: (unit) => tunnelBase + derive(unit).moveSpeed },
      roles: ["engage", "escape"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), castTime: r.castTime(),
      usable: (unit, world) => marked(unit, world.tick),
      delivery: { kind: "target", range: r.field("targetRange") },
      onCastStart: [{ type: "state", state: "displacementImmune", duration: r.castTime() + vanish + 0.5 }],
      onHit: [],
      flags: { spellShield: true, grounded: true, knockdown: false },
      roles: ["damage", "engage"],
      estimate: (self, target) => evaluate(rushDamage, self, target),
      estimateDelay: () => vanish,
    };
    const abilities = [qSpec, qbSpec, wSpec, wbSpec, eSpec, ebSpec, rSpec];

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (rushing(self, world.tick)) return undefined;
      const center = Math.abs(enemy.x - self.x);
      const away = view.mode === "flee" || view.mode === "kite";
      if (burrowed(self)) {
        if (!away && canCast(world, self, qbSpec)) return { kind: "cast", ability: "QB" };
        // Unburrow under the enemy: a knock-up when it can be knocked up again.
        if (!away && canCast(world, self, wbSpec) && center - enemy.spec.base.radius <= knockRadius && world.tick >= Number(self.memory["reksai:reknock"] ?? 0)) return { kind: "cast", ability: "WB" };
        if (!away && canCast(world, self, wbSpec) && center - enemy.spec.base.radius <= knockRadius && inAttackRange(self, enemy)) return { kind: "cast", ability: "WB" };
        if (away && canCast(world, self, ebSpec)) return { kind: "cast", ability: "EB", aim: { direction: -1, distance: ebSpec.delivery.kind === "dash" ? ebSpec.delivery.distance : 0 } };
        if (view.mode === "idle" || view.mode === "hold") return { kind: "move", direction: 0 };
        return { kind: "move", direction: away ? -1 : 1 };
      }
      // Burrow to close in, or to unburrow again once the enemy can be knocked up again.
      const reknockReady = world.tick >= Number(self.memory["reksai:reknock"] ?? 0);
      if (canCast(world, self, wSpec) && (view.mode === "fight" || view.mode === "trade") && ((center > 500 && !inAttackRange(self, enemy)) || (reknockReady && center - enemy.spec.base.radius <= knockRadius))) return { kind: "cast", ability: "W" };
      if (canCast(world, self, wSpec) && away) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };

    return {
      abilities,
      behavior,
      hooks: {
        onCastStart(ctx) {
          ctx.memory[`reksai:cast:${ctx.ability.key}`] = `${ctx.tick}`;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            goUnder(ctx);
            ctx.memory["reksai:unburrowReady"] = ctx.tick + ticks(unburrowAfter);
          }
          if (key === "WB") {
            emerge(ctx);
            // Burrow's cooldown starts as she unburrows.
            ctx.self.cooldownReady.W = ctx.tick + ticks(wSpec.cooldown);
            const reachable = Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= knockRadius + EPS;
            if (reachable && ctx.enemy.alive) {
              const knock = ctx.tick >= Number(ctx.memory["reksai:reknock"] ?? 0);
              abilityHit(ctx.world, ctx.self, ctx.enemy, wbSpec, knock ? unburrowHit : unburrowHit.slice(0, 1));
              if (knock) ctx.memory["reksai:reknock"] = ctx.tick + ticks(reknock);
              tagged(ctx, "noMovement", lockout, "reksai:lockout");
              tagged(ctx, "noAttacks", lockout, "reksai:lockout");
            }
          }
          if (key === "R") {
            // She vanishes: untargetable and unable to act, then pounces.
            if (burrowed(ctx.self)) emerge(ctx);
            ctx.memory["reksai:rushAt"] = ctx.tick + ticks(vanish);
            tagged(ctx, "untargetable", vanish, "reksai:vanish");
            tagged(ctx, "noMovement", vanish, "reksai:vanish");
            tagged(ctx, "noAttacks", vanish, "reksai:vanish");
          }
        },
        onAbilityContact(ctx) {
          // Furious Bite at full Fury: 120%, as true damage.
          if (ctx.ability.key === "E" && ctx.self.resource >= maxFury(ctx.self) - EPS) return [{ type: "damage", damageType: "true", amount: furyBite }];
          return undefined;
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          const key = ctx.ability.key;
          if (key === "QB" || key === "WB" || key === "E" || key === "R") {
            const cast = String(ctx.memory[`reksai:cast:${key}`] ?? ctx.tick);
            if (ctx.memory[`reksai:fury:${key}`] !== cast || key === "WB") { ctx.memory[`reksai:fury:${key}`] = cast; addFury(ctx); }
          }
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) addFury(ctx);
        },
        onDamageDealt(ctx) {
          // Marked as Prey: any of her damage to the champion.
          if (ctx.amount + ctx.absorbed > 0) ctx.memory["reksai:markUntil"] = ctx.tick + ticks(markSeconds);
        },
        onAttack(ctx) {
          // Each completed attack refreshes Queen's Wrath's duration.
          if (!ctx.action.empowered?.includes("Q")) return;
          for (const s of ctx.self.statuses) if (s.kind === "empower" && s.key === "Q") s.endTick = ctx.tick + ticks(wrathSeconds);
          for (const s of ctx.self.statuses) if (s.kind === "stat" && s.key === "attackSpeed" && s.ability === "Q") s.endTick = ctx.tick + ticks(wrathSeconds);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Burrowing's heal: the Fury drains over 3 s, stopping at full health.
          const left = Number(ctx.memory["reksai:healLeft"] ?? 0);
          if (left > 0 && ctx.tick >= Number(ctx.memory["reksai:healAt"] ?? 0)) {
            const max = derive(self).maxHp;
            if (self.hp >= max - EPS) ctx.memory["reksai:healLeft"] = 0;
            else {
              ctx.apply({ type: "heal", amount: { base: Number(ctx.memory["reksai:healTotal"] ?? 0) / healSteps } }, true);
              self.resource = Math.max(0, self.resource - Number(ctx.memory["reksai:healFury"] ?? 0) / healSteps);
              ctx.memory["reksai:healLeft"] = left - 1;
              ctx.memory["reksai:healAt"] = ctx.tick + ticks(healSeconds / healSteps);
            }
          }
          // Void Rush: she reappears beside the enemy and pounces 125 units through it.
          if (ctx.memory["reksai:rushAt"] !== undefined && ctx.tick >= Number(ctx.memory["reksai:rushAt"])) {
            delete ctx.memory["reksai:rushAt"];
            const enemy = ctx.enemy;
            if (enemy.alive) {
              const from = self.x;
              const dir = directionTo(self, enemy);
              self.x = enemy.x + dir * through;
              notifyActualMovement(ctx.world, self, from, { kind: "dash", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "R" });
              if (!isUntargetable(enemy, self)) abilityHit(ctx.world, self, enemy, rSpec, [{ type: "damage", damageType: "physical", amount: rushDamage }]);
            }
            self.statuses = self.statuses.filter((s) => !(s.kind === "state" && s.key === "displacementImmune" && s.ability === "R"));
          }
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { physical: (wrathAttacks * evaluate(wrathBonus, self, target)) / (qSpec.cooldown / haste + wrathSeconds) };
        },
        healing(self) {
          return (healShare * derive(self).maxHp) / (wSpec.cooldown + 4);
        },
      },
    };
  },
};

export default reksai;
