/**
 * Elise (patch 26.20): as a human she cocoons, poisons and sends a volatile spider, storing a
 * Spiderling for every ability that hits; as a spider she bites, frenzies and rappels, her
 * attacks dealing bonus magic damage and healing, with her Spiderlings fighting beside her.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo, notifyActualMovement } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

const HUMAN = "Human Form";
const SPIDER = "Spider Form";
const SPIDERLING = "spiderling";

const elise: KitModule = {
  champion: "Elise",
  build(kit) {
    const p = kit.ability("Spider Queen");
    const neurotoxin = kit.ability("Neurotoxin");
    const volatile = kit.ability("Volatile Spiderling");
    const cocoon = kit.ability("Cocoon");
    const r = kit.ability("Spider Form / Human Form");
    const bite = kit.ability("Venomous Bite");
    const frenzy = kit.ability("Skittering Frenzy");
    const rappel = kit.ability("Rappel");
    const pet = kit.pet("Spiderling");

    // Spider Queen: a stored Spiderling per human ability that hits (up to 5); in Spider Form, 44 (+ 15% AP) magic damage and a 12 (+ 8% AP) heal per attack.
    const storeWords = "Elise gains one dormant Spiderling whenever she hits an enemy with an ability, storing once per cast and up to 2 – 5 (based on level) at a time.";
    const maxSpiderlings = p.levelValue(storeWords, 0);
    p.quote("She stores the maximum number of Spiderlings when the game starts and upon respawning.");
    const queenDamage: Formula = { base: p.levelValue("Elise's basic attacks deal 14 – 44 (based on level) (+ 15% AP) bonus magic damage", 0), ratios: { AP: p.quoted("(+ 15% AP) bonus magic damage and heal her for", 0) / 100 } };
    const queenHeal: Formula = { base: p.levelValue("Elise's basic attacks deal 14 – 44 (based on level) (+ 15% AP) bonus magic damage", 1), ratios: { AP: p.quoted("heal her for 6 – 12 (based on level) (+ 8% AP) on-hit", 2) / 100 } };
    p.quote("If an ability hits while Elise is already in Spider Form, a Spiderling will spawn near her rather than being stored.");
    p.quote("Spider Form's bonus damage and healing can be blocked, dodge and are not applied if Elise is blind.");
    kit.assume(`Elise starts a fight in Human Form with ${maxSpiderlings} stored Spiderlings. Aspect's own "Spider Queen bonuses are increased" gives no number and is left out.`);

    // Spiderlings: 390 health, 90 armor, 110 magic resistance, 40 (+ 15% AP) magic damage at 0.665 attacks (+ 25% from Skittering Frenzy's rank), 75% from areas.
    const spiderHealth = pet.stat("hp");
    const spiderArmor = pet.stat("armor");
    const spiderMR = pet.stat("magicresist");
    const spiderDamage: Formula = { base: pet.stat("damage"), ratios: { AP: pet.quoted("10 / 20 / 30 / 40 (+ 15% AP)", 4) / 100 } };
    const spiderRate = pet.quoted("0.665 (+ 0% – 25% (based on Skittering Frenzy's rank))", 0);
    const spiderRateBonus = frenzy.fraction("Spiderling Bonus Attack Speed");
    const spiderRange = pet.stat("range");
    const spiderSpeed = pet.stat("movespeed");
    const spiderRadius = Math.max(1, pet.stat("radius"));
    const spiderArea = pet.quoted("75% damage from area damage", 0) / 100;
    pet.quote("Spiderlings' attacks can be mitigated by block, dodge, and blind, as well as stopped by Disarm.");

    // Human Form.
    neurotoxin.quote("If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, this ability will cancel");
    const volatileDelay = volatile.quoted("The spider searches for nearby targets and crawls to them after a delay of 0.75 seconds", 0);
    const volatileLife = volatile.quoted("Elise summons an untargetable venom-gorged spider that lasts for 3 seconds", 0);
    const volatileSpeed = 550;
    kit.assume(`Volatile Spiderling chases the enemy at ${volatileSpeed} units per second after its ${volatileDelay} s delay (its speed isn't sourced), exploding on contact: it can be outrun for its ${volatileLife} s, not sidestepped.`);
    cocoon.quote("This ability will cast from wherever the caster is at the end of the cast time.");

    // Spider Form: 25 base movement speed and 125-range melee attacks.
    const spiderMove = r.quoted("Elise transforms into a spider, gaining 25 base movement speed, melee basic attacks with 125 range", 0);
    const spiderReach = r.quoted("Elise transforms into a spider, gaining 25 base movement speed, melee basic attacks with 125 range", 1);
    r.quote("Additionally, she summons all stored Spiderlings and heals them to full health.");
    r.quote("Additionally, she stores all active Spiderlings.");
    bite.quote("If there are active Spiderlings or Volatile Spiderlings nearby, they will dash alongside Elise to the target upon Venomous Bite's cast");
    const frenzySpeed = frenzy.fraction("Bonus Attack Speed");
    const frenzySeconds = frenzy.quoted("Elise and her Spiderlings gain bonus attack speed for 3 seconds.", 0);
    frenzy.quote("Skittering Frenzy resets Elise's basic attack timer. Elise loses Skittering Frenzy immediately when she switches to Human Form.");
    const liftWords = "Elise and her Spiderlings lift up into the air over 0.6 seconds, immediately becoming untargetable and unable to act, and afterwards vanishing for up to 1.95 seconds";
    const lift = rappel.quoted(liftWords, 0);
    const descend = rappel.quoted("Elise and her Spiderlings reappear and descend onto the ground over 0.4 seconds", 0);
    const rappelBoost = rappel.fraction("Spider Effects Increase");
    const boostSeconds = rappel.quoted("Additionally, Spider Queen bonuses are increased for 5 seconds.", 0);
    const rappelRange = rappel.field("targetRange", "Location-targeted recast range");
    rappel.quote("If the recast was used on a target enemy, Elise and her Spiderlings descend behind the target's location.");
    const recastDelay = 0.5;
    kit.assume(`Rappel recasts onto the enemy as soon as it can, ${recastDelay} s after the lift (the wiki's delay for a recast without a target; a targeted recast is instant), landing behind the enemy.`);

    const spider = (unit: Unit) => unit.spec.form === SPIDER;
    const stored = (unit: Unit) => Number(unit.memory["elise:stored"] ?? maxSpiderlings);
    const boosted = (unit: Unit, tick: number) => tick < Number(unit.memory["elise:boostUntil"] ?? -1);
    const rappelling = (unit: Unit, tick: number) => tick < Number(unit.memory["elise:rappelUntil"] ?? -1);

    const spiderlingSpec = (): PetSpec => ({
      kind: SPIDERLING, name: "Spiderling", hp: spiderHealth, armor: spiderArmor, mr: spiderMR, areaTaken: spiderArea, radius: spiderRadius,
      moveSpeed: spiderSpeed, duration: Number.POSITIVE_INFINITY, leash: 1000,
      attack: { range: spiderRange, interval: 1 / (spiderRate * (1 + spiderRateBonus)), attackSpeedRatio: spiderRate, effects: [{ type: "damage", damageType: "magic", amount: spiderDamage }], attackLike: true, category: "area" },
    });
    const release = (ctx: HookContext, count: number) => {
      for (let i = 0; i < count; i++) spawnPet(ctx.world, ctx.self, spiderlingSpec(), ctx.self.x);
    };
    // A Human Form ability that hits stores a Spiderling, once per cast; in Spider Form it comes out at once.
    const gain = (ctx: HookContext, key: string) => {
      const cast = String(ctx.memory[`elise:cast:${key}`] ?? ctx.tick);
      if (ctx.memory[`elise:gained:${key}`] === cast) return;
      ctx.memory[`elise:gained:${key}`] = cast;
      if (spider(ctx.self)) { if (petsOf(ctx.world, ctx.self.side, SPIDERLING).length < maxSpiderlings) release(ctx, 1); }
      else ctx.memory["elise:stored"] = Math.min(maxSpiderlings, stored(ctx.self) + 1);
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: neurotoxin.name, slot: "Q", cooldown: neurotoxin.cooldown(), cost: neurotoxin.cost(), castTime: neurotoxin.castTime(), cancelOnInvalidTarget: true,
      delivery: { kind: "target", range: neurotoxin.field("targetRange"), missileSpeed: neurotoxin.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: neurotoxin.formula("Magic Damage") }],
      flags: { projectile: true, spellShield: true },
    };
    const wSpec: AbilitySpec = {
      key: "W", name: volatile.name, slot: "W", cooldown: volatile.cooldown(), cost: volatile.cost(), castTime: volatile.castTime(),
      delivery: { kind: "target", range: volatile.field("targetRange"), missileSpeed: volatileSpeed },
      onHit: [{ type: "damage", damageType: "magic", amount: volatile.formula("Magic Damage") }],
      flags: { projectile: false, spellShield: true },
    };
    const eSpec: AbilitySpec = {
      key: "E", name: cocoon.name, slot: "E", cooldown: cocoon.cooldown(), cost: cocoon.cost(), castTime: cocoon.castTime(),
      delivery: { kind: "line", range: cocoon.field("targetRange"), width: cocoon.field("width"), speed: cocoon.field("speed") },
      onHit: [{ type: "cc", cc: "stun", duration: cocoon.number("Stun Duration") }, { type: "state", state: "revealed", duration: cocoon.number("Stun Duration") }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", activation: "transformation", cooldown: r.cooldown(), castTime: 0, delivery: { kind: "self" } };
    const rsSpec: AbilitySpec = { key: "RS", name: r.name, slot: "R", activation: "transformation", cooldown: r.cooldown(), cooldownKey: "R", castTime: 0, delivery: { kind: "self" } };
    const qsSpec: AbilitySpec = {
      key: "QS", name: bite.name, slot: "Q", cooldown: bite.cooldown(), castTime: bite.castTime(), cancelOnInvalidTarget: true,
      delivery: { kind: "dash", direction: "target", distance: bite.field("targetRange"), speed: bite.field("speed"), hitRadius: spiderReach },
      onHit: [{ type: "damage", damageType: "magic", amount: bite.formula("Magic Damage") }],
      flags: { appliesOnHit: true, spellShield: true, grounded: true, knockdown: true },
      roles: ["damage", "engage"],
    };
    const wsSpec: AbilitySpec = {
      key: "WS", name: frenzy.name, slot: "W", cooldown: frenzy.cooldown(), castTime: 0,
      delivery: { kind: "self" },
      onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: frenzySpeed }, duration: frenzySeconds }, { type: "resetAttack" }],
      roles: ["buff"],
    };
    const esSpec: AbilitySpec = {
      key: "ES", name: rappel.name, slot: "E", cooldown: rappel.cooldown(), castTime: 0, cooldownAfter: "state",
      delivery: { kind: "self" },
      onSelf: [{ type: "state", state: "untargetable", duration: lift + recastDelay + descend }, { type: "state", state: "lingering", duration: lift + recastDelay + descend }],
      flags: { grounded: true },
      roles: ["defense", "engage"],
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (rappelling(self, world.tick)) return undefined;
      const fighting = view.mode === "fight" || view.mode === "trade";
      const gap = Math.abs(enemy.x - self.x);
      if (!spider(self)) {
        // Into Spider Form once the human spells are spent and the enemy is close.
        const spent = ["Q", "E"].every((key) => (self.cooldownReady[key] ?? 0) > world.tick + ticks(1));
        if (fighting && canCast(world, self, rSpec) && (spent || gap <= 300) && gap <= 700) return { kind: "cast", ability: "R" };
        return defaultBehavior(view);
      }
      if (fighting) {
        if (canCast(world, self, qsSpec)) return { kind: "cast", ability: "QS" };
        if (canCast(world, self, wsSpec) && inAttackRange(self, enemy)) return { kind: "cast", ability: "WS" };
      }
      // Back to Human Form for the cocoon and toxin once both are ready, or to get away.
      const humanReady = ["Q", "E"].every((key) => (self.cooldownReady[key] ?? 0) <= world.tick);
      if (canCast(world, self, rsSpec) && (view.mode === "flee" || view.mode === "kite" || (humanReady && (self.cooldownReady.QS ?? 0) > world.tick))) return { kind: "cast", ability: "RS" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      form: HUMAN,
      forms: {
        [SPIDER]: { base: { moveSpeed: (kit.champion.forms[0]?.stats.moveSpeed ?? 330) + spiderMove }, attack: { range: spiderReach, ranged: false, missileSpeed: 0, projectile: false }, abilities: [qsSpec, wsSpec, esSpec, rsSpec] },
      },
      behavior,
      hooks: {
        onCastStart(ctx) {
          ctx.memory[`elise:cast:${ctx.ability.key}`] = `${ctx.tick}`;
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "R") {
            ctx.transform(SPIDER, "share");
            release(ctx, stored(ctx.self));
            ctx.memory["elise:stored"] = 0;
          }
          if (key === "RS") {
            // The Spiderlings go back into storage; Skittering Frenzy ends.
            const alive = petsOf(ctx.world, ctx.self.side, SPIDERLING);
            ctx.memory["elise:stored"] = Math.min(maxSpiderlings, alive.length);
            ctx.world.pets = ctx.world.pets.filter((p) => !alive.includes(p));
            ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "WS:attackSpeed");
            ctx.transform(HUMAN, "share");
          }
          if (key === "WS") {
            for (const spiderling of petsOf(ctx.world, ctx.self.side, SPIDERLING)) {
              spiderling.statuses = [...(spiderling.statuses ?? []).filter((s) => s.memoKey !== "elise:frenzy"), { kind: "stat", key: "attackSpeed", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(frenzySeconds), value: frenzySpeed, memoKey: "elise:frenzy" }];
            }
          }
          if (key === "ES") {
            ctx.memory["elise:rappelUntil"] = ctx.tick + ticks(lift + recastDelay + descend);
            ctx.memory["elise:landAt"] = ctx.tick + ticks(lift + recastDelay + descend);
            for (const state of ["noMovement", "noAttacks"] as const) ctx.apply({ type: "state", state, duration: lift + recastDelay + descend }, true);
          }
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          if (ctx.ability.key === "Q" || ctx.ability.key === "W" || ctx.ability.key === "E" || ctx.ability.key === "QS") gain(ctx, ctx.ability.key);
        },
        onAttackBeforeDamage(ctx) {
          // Spider Queen: bonus magic damage and a heal per attack, doubled for 5 s after Rappel.
          if (!spider(ctx.self) || ctx.blocked || ctx.pet) return;
          const boost = boosted(ctx.self, ctx.tick) ? 1 + rappelBoost : 1;
          ctx.apply({ type: "damage", damageType: "magic", amount: scaled(queenDamage, boost), label: p.name });
          ctx.apply({ type: "heal", amount: scaled(queenHeal, boost) }, true);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Rappel: she lands behind the enemy, with Spider Queen's bonuses doubled for 5 s.
          if (ctx.memory["elise:landAt"] !== undefined && ctx.tick >= Number(ctx.memory["elise:landAt"])) {
            delete ctx.memory["elise:landAt"];
            if (ctx.enemy.alive && Math.abs(ctx.enemy.x - self.x) <= rappelRange) {
              const from = self.x;
              self.x = ctx.enemy.x + directionTo(self, ctx.enemy) * (self.spec.base.radius + ctx.enemy.spec.base.radius);
              notifyActualMovement(ctx.world, self, from, { kind: "blink", startTick: ctx.tick, endTick: ctx.tick, ended: true, ability: "ES" });
            }
            ctx.memory["elise:boostUntil"] = ctx.tick + ticks(boostSeconds);
            self.statuses = self.statuses.filter((s) => !(s.kind === "state" && s.key === "lingering" && s.ability === "ES"));
          }
        },
      },
      budget: {
        damage(self, target) {
          // The Spiderlings' attacks.
          return { magic: (maxSpiderlings * evaluate(spiderDamage, self, target) * spiderRate * (1 + spiderRateBonus)) / 2 };
        },
        healing(self, target) { return evaluate(queenHeal, self, target) * derive(self).attackSpeed / 2; },
      },
    };
  },
};

export default elise;
