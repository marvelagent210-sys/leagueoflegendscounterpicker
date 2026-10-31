/**
 * Renata Glasc (patch 26.20): Leverage's first attack on an unmarked enemy takes a share of its
 * maximum health; Handshake roots it while the tether slows her and stops her attacks; Bailout
 * speeds her attacks and steps toward the enemy, and once turns fatal damage into a burning
 * second life that a takedown ends; Loyalty Program shields her and slows; Hostile Takeover
 * sends the enemy berserk.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

const MARK = "renata:leverage";

const renata: KitModule = {
  champion: "Renata",
  build(kit) {
    const p = kit.ability("Leverage");
    const q = kit.ability("Handshake");
    const w = kit.ability("Bailout");
    const e = kit.ability("Loyalty Program");
    const r = kit.ability("Hostile Takeover");

    // Leverage: attacks mark for 6 s; on an unmarked enemy, 2% (+ 2% per 100 AP) of its maximum health as magic damage. Allies consume the mark: none in a duel.
    const leverageWords = "If the enemy was unmarked, the attack also deals bonus magic damage equal to 1 – 2 (based on level)% (+ 2% per 100 AP) of the target's maximum health.";
    const leverageShare = p.quoted(leverageWords, 1) / 100;
    const leveragePer100 = p.quoted(leverageWords, 2) / 100;
    const leverage: Formula = { base: 0, ratios: { targetMaxHP: leverageShare }, products: [{ ratio: leveragePer100 / 100, stats: ["AP", "targetMaxHP"] }] };
    const markSeconds = p.quoted("Renata's basic attacks are empowered to apply a mark that lasts 6 seconds, refreshes on subsequent hits and expires when attacking a new enemy.", 0);
    p.quote("Allied champions' damaging attacks and abilities against a marked target will consume the mark");
    kit.assume(`Leverage's 1 – 2% (based on level) is its level-18 ${leverageShare * 100}% at 20. Only allied champions consume the mark, so in a duel it only ever deals its first-attack damage.`);

    // Handshake: a 900 hook for 260 (+ 80% AP) that roots for 1 s; while the tether lasts, Renata can't attack and moves 30% slower.
    const hookWords = "Renata fires a hook in the target direction that deals magic damage to the first enemy hit and roots them for 1 second, during which they are revealed.";
    const hookRoot = q.quoted(hookWords, 0);
    const tetherWords = "causing Renata to become unable to declare attacks and have her movement speed reduced by 30%";
    const tetherSlow = q.quoted(tetherWords, 0) / 100;
    q.quote("The tether's duration lasts the same as the root duration, even if it is modified by tenacity.");
    q.quote("If the root is removed, the tether is as well, but not vice versa.");
    q.quote("Renata breaks the tether to knock the target in the target direction, though not through terrain, dealing the same damage to enemies they pass through.");
    kit.assume("Handshake's recast throws the enemy to damage and stun others it passes, and there are none in a duel, so Renata lets the tether run out.");

    // Bailout: 5 s of 30% (+ 1% per 100 AP) attack speed and 20% (+ 1% per 100 AP) movement speed facing the enemy, rising to double over the duration.
    const bailoutWords = "Renata infuses herself or the target allied champion with a chemtech formula for 5 seconds";
    const bailoutSeconds = w.quoted(bailoutWords, 0);
    const speedWords = "Bonus Attack Speed: 10 / 15 / 20 / 25 / 30% (+ 1% per 100 AP)";
    const moveWords = "Bonus Movement Speed: 10 / 12.5 / 15 / 17.5 / 20% (+ 1% per 100 AP)";
    const bailoutSpeed: Formula = { base: w.baseOf("Bonus Attack Speed") / 100, ratios: { AP: w.quoted(speedWords, 5) / 100 / 100 } };
    const bailoutMove: Formula = { base: w.baseOf("Bonus Movement Speed") / 100, ratios: { AP: w.quoted(moveWords, 5) / 100 / 100 } };
    const bailoutMost = w.baseOf("Maximum Bonus Attack Speed") / w.baseOf("Bonus Attack Speed");
    w.quote("while they are facing nearby visible enemy champions or minions, with both of the bonuses increasing in effectiveness by");
    // Fatal damage under it: back to full health, then a burn of 10% of maximum health every 0.264 s; a takedown ends it at 20% health.
    const burnWords = "If the target takes fatal damage while Bailout is active, they are restored to 100% of their maximum health but suffer a true damage burn equal to 10% of their maximum health every 0.264 until they reach 0 health";
    const burnShare = w.quoted(burnWords, 1) / 100;
    const burnEvery = w.quoted(burnWords, 2);
    const savedShare = w.quoted("The burn will stop once the target scores a takedown against an enemy champion within 6 seconds of damaging them, setting their current health to 20% of their maximum health immediately afterwards.", 1) / 100;
    w.quote("This effect may occur only once per application of Bailout while the target already has the buff and is not burning.");
    w.quote("The self-damage taken is considered raw damage and is calculated based on the target's maximum health at the time of taking lethal damage.");

    // Loyalty Program: rockets around her (325) and a missile to 800: 185 (+ 55% AP) and a 30% slow for 2 s; Renata gets a 110 (+ 50% AP) shield for 3 s.
    const loyaltyWords = "Renata and allies struck are granted a shield for 3 seconds and enemies struck are dealt magic damage and slowed by 30% for 2 seconds.";
    const shieldSeconds = e.quoted(loyaltyWords, 0);
    const loyaltySlow = e.quoted(loyaltyWords, 1) / 100;
    const loyaltySlowSeconds = e.quoted(loyaltyWords, 2);
    const rocketReach = e.field("effectRadius", "Initial hit radius around Renata");
    e.quote("Renata sends out chemtech rockets from either side of her that instantly strike targets around her.");
    kit.assume("Loyalty Program strikes an enemy once per cast: with its rockets if within 325 of Renata, else with the missile (its 0.429 s convergence is left out).");

    // Hostile Takeover: a cloud of 2000 that sends the enemy berserk for 2.25 s with 100% bonus attack speed.
    const berserkSeconds = r.number("Berserk Duration");
    const berserkSpeed = r.quoted("Berserked units gain 100% bonus attack speed and 25% increased size.", 0) / 100;
    r.quote("Within their targeting radius, they prioritize attacking the closest unit by the following categories in descending order");
    const [cloudSpeed = 650] = r.fieldNumbers("speed");
    kit.assume(`Hostile Takeover's cloud flies at its starting ${cloudSpeed} (its acceleration is left out). A berserk enemy with no allies attacks Renata, so she sends it berserk only to stop its spells: against an enemy that scales with ability power, or one channeling.`);

    const marked = (enemy: Unit, self: Unit) => enemy.statuses.some((s) => s.kind === "mark" && s.key === MARK && s.source === self.side);
    const bailedOut = (self: Unit, tick: number) => tick < Number(self.memory["renata:bailoutUntil"] ?? -1);
    const burning = (self: Unit) => self.memory["renata:burnNext"] !== undefined;

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: q.field("range", "Missile range"), width: q.field("width"), speed: q.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "root", duration: hookRoot }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "line", range: e.field("targetRange"), width: e.field("width"), speed: e.field("speed") },
      onSelf: [{ type: "shield", amount: e.formula("Shield Strength"), duration: shieldSeconds }],
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: loyaltySlow, duration: loyaltySlowSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "line", range: r.field("range"), width: r.field("width"), speed: cloudSpeed },
      onHit: [{ type: "cc", cc: "berserk", duration: berserkSeconds }, { type: "stat", stat: "attackSpeed", amount: { base: berserkSpeed }, duration: berserkSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["cc"],
    };

    const endTether = (ctx: HookContext) => {
      delete ctx.memory["renata:tetherUntil"];
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "noAttacks" && s.ability === "Q"));
      ctx.buff("renata:tether", "moveSpeedPercent", 0, 0);
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      const gap = Math.abs(enemy.x - self.x) - enemy.spec.base.radius;
      if (view.mode === "fight" || view.mode === "trade") {
        // Bailout as the fight starts: its speed grows over 5 s, and it holds a second life.
        if (canCast(world, self, wSpec) && gap <= 700) return { kind: "cast", ability: "W" };
      }
      const decided = defaultBehavior(view);
      // Hostile Takeover only to stop spells: the berserk enemy attacks her.
      if (decided?.kind === "cast" && decided.ability === "R") {
        const d = derive(enemy);
        const action = enemy.action;
        const channel = action?.kind === "channel" ? enemy.spec.abilities.find((a) => a.key === action.ability)?.channel : undefined;
        const channeling = channel !== undefined && channel.interruptible !== false;
        if (!channeling && d.ap <= d.bonusAd) return { kind: "attack" };
      }
      return decided;
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            ctx.memory["renata:bailoutFrom"] = ctx.tick;
            ctx.memory["renata:bailoutUntil"] = ctx.tick + ticks(bailoutSeconds);
            delete ctx.memory["renata:bailoutSpent"];
          }
          if (key === "E") {
            // The rockets strike an enemy around her at once.
            ctx.memory["renata:rocketed"] = false;
            if (Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= rocketReach) {
              abilityHit(ctx.world, ctx.self, ctx.enemy, eSpec, eSpec.onHit ?? []);
              ctx.memory["renata:rocketed"] = true;
            }
          }
        },
        onAbilityContact(ctx) {
          // One strike of Loyalty Program per cast.
          if (ctx.ability.key === "E" && ctx.memory["renata:rocketed"] === true && ctx.enemy.petId === undefined) return [];
          return undefined;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q" || ctx.enemy.petId !== undefined) return;
          // The tether lasts as long as the root, tenacity included.
          const root = ctx.enemy.statuses.find((s) => s.kind === "cc" && s.key === "root" && s.ability === "Q" && s.endTick > ctx.tick);
          if (!root) return;
          const seconds = (root.endTick - ctx.tick) / 30;
          ctx.memory["renata:tetherUntil"] = root.endTick;
          ctx.apply({ type: "state", state: "noAttacks", duration: seconds }, true);
          ctx.buff("renata:tether", "moveSpeedPercent", -tetherSlow, seconds);
        },
        onAttackHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          if (!marked(ctx.enemy, ctx.self) && !ctx.blocked) ctx.apply({ type: "damage", damageType: "magic", amount: leverage, label: p.name });
          ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === MARK && s.source === ctx.self.side));
          ctx.apply({ type: "mark", key: MARK, duration: markSeconds });
        },
        onLethal(ctx) {
          // Bailout: once per cast, back to full health with a burn.
          if (!bailedOut(ctx.self, ctx.tick) || burning(ctx.self) || ctx.memory["renata:bailoutSpent"] === true) return false;
          ctx.memory["renata:bailoutSpent"] = true;
          const max = derive(ctx.self).maxHp;
          ctx.self.hp = max;
          ctx.memory["renata:burn"] = burnShare * max;
          ctx.memory["renata:burnNext"] = ctx.tick + ticks(burnEvery);
          ctx.log("is bailed out");
          return true;
        },
        onKill(ctx) {
          // A takedown ends the burn at 20% health.
          if (!burning(ctx.self) || ctx.pet) return;
          delete ctx.memory["renata:burnNext"];
          ctx.self.hp = savedShare * derive(ctx.self).maxHp;
        },
        onTick(ctx) {
          const self = ctx.self;
          // Bailout's speed, doubling over its 5 s (and held at full while she burns), while she faces the enemy.
          const from = ctx.memory["renata:bailoutFrom"];
          const active = bailedOut(self, ctx.tick) || burning(self);
          if (active && from !== undefined) {
            const grown = 1 + (bailoutMost - 1) * Math.min(1, (ctx.tick - Number(from)) / ticks(bailoutSeconds));
            const facing = self.facing === directionTo(self, ctx.enemy);
            ctx.buff("renata:bailoutSpeed", "attackSpeed", facing ? grown * evaluate(bailoutSpeed, self) : 0, FOREVER);
            ctx.buff("renata:bailoutMove", "moveSpeedPercent", facing ? grown * evaluate(bailoutMove, self) : 0, FOREVER);
          } else if (from !== undefined) {
            delete ctx.memory["renata:bailoutFrom"];
            ctx.buff("renata:bailoutSpeed", "attackSpeed", 0, 0);
            ctx.buff("renata:bailoutMove", "moveSpeedPercent", 0, 0);
          }
          // The tether ends with the root.
          const tether = ctx.memory["renata:tetherUntil"];
          if (tether !== undefined && (ctx.tick >= Number(tether) || !ctx.enemy.statuses.some((s) => s.kind === "cc" && s.key === "root" && s.ability === "Q"))) endTether(ctx);
          // The burn, 10% of the health she had at the fatal blow every 0.264 s.
          const next = ctx.memory["renata:burnNext"];
          if (next !== undefined && ctx.tick >= Number(next)) {
            ctx.memory["renata:burnNext"] = Number(next) + ticks(burnEvery);
            dealDamage(ctx.world, self, self, Number(ctx.memory["renata:burn"]), "true", { ability: w.name, persistent: true });
          }
        },
      },
      budget: {
        damage(self, target) {
          return { magic: evaluate(leverage, self, target) / 30 };
        },
      },
    };
  },
};

export default renata;
