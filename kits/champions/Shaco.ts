/**
 * Shaco (patch 26.20): his attacks deal more from behind the enemy. Deceive turns him invisible
 * and blinks him behind it for an empowered attack that critically strikes; Two-Shiv Poison's
 * attacks slow and its dagger hits harder on a wounded enemy; Jack in the Box arms into a trap
 * that fears, roots and fires; Hallucinate's clone fights beside him and bursts into boxes.
 */
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor } from "../../engine/rules/defense";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, directionTo } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { AttackHitOptions, Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const AMBUSH = "shaco:ambush";
const CLONE = "clone";

const shaco: KitModule = {
  champion: "Shaco",
  build(kit) {
    const p = kit.ability("Backstab");
    const q = kit.ability("Deceive");
    const w = kit.ability("Jack in the Box");
    const e = kit.ability("Two-Shiv Poison");
    const r = kit.ability("Hallucinate");
    const box = kit.pet("Jack in the Box / Mini-Box");
    const clone = kit.pet("Hallucination");

    // Backstab: 20 – 30 (based on level) (+ 20% bonus AD) on attacks from behind, affected by critical strikes.
    const backstabWords = "Shaco's basic attacks are empowered to deal 20 – 30 (based on level) (+ 20% bonus AD) bonus physical damage when hitting an enemy from behind.";
    const backstab: Formula = { base: p.levelValue(backstabWords, 0), ratios: { bonusAD: p.quoted(backstabWords, 2) / 100 } };
    p.quote("This damage is affected by critical strike modifiers.");
    p.quote("Backstab's bonus damage adds to the damage instance of the original basic attack.");
    kit.assume("Shaco is behind the enemy when it faces away from him: it last turned, walked or acted facing the other way (after Deceive blinks him past it, or while it flees).");

    // Deceive: invisible for 3.5 s, blinking 0.125 s later; the attack that breaks it deals 65 (+ 60% bonus AD) more and, from behind, critically strikes for 160% (200% if it rolled one).
    const deceiveWords = "Shaco becomes invisible for a duration, and after a 0.125-second delay, he blinks to the target location.";
    const blinkDelay = q.quoted(deceiveWords, 0);
    const invisibleSeconds = q.number("Invisibility Duration");
    const ambush = q.formula("Bonus Physical Damage");
    const ambushWindow = q.quoted("Shaco empowers his next basic attack within 0.25 seconds to deal bonus physical damage, which is affected by critical strike modifiers.", 0);
    const critWords = "The attack will critically strike for 160% damage, increased to 200% if a critical strike was rolled.";
    const ambushCrit = q.quoted(critWords, 0) / 100;
    const ambushRolled = q.quoted(critWords, 1) / 100;
    q.quote("Deceive's invisibility breaks when Shaco uses a basic attack or casts Two-Shiv Poison, but not from casting Jack in the Box or Hallucinate.");
    q.quote("Using a basic attack breaks the stealth at the end of the attack windup.");
    const blinkRange = q.field("targetRange");
    kit.assume("Deceive blinks Shaco just past the enemy (its target location behind it) when the enemy is within its 400 range.");

    // Two-Shiv Poison: attacks slow by 30% for 2 s while it's ready; the dagger deals 170 (+ 80% bonus AD) (+ 60% AP), 50% more below 30% health, and slows by 30% for 3 s; from behind, 54 (+ 10% AP) more (81 (+ 15% AP) below 30%).
    const passiveSlow = e.quoted("Shaco's basic attacks slow enemies for 2 seconds while Two-Shiv Poison is not on cooldown.", 0);
    const shivSlow = e.fraction("Slow");
    const shivWords = "Shaco throws a dagger at the target enemy that deals magic damage, increased by 50% if they are below 30% of their maximum health, and slows them for 3 seconds.";
    const shivBelow = e.quoted(shivWords, 1) / 100;
    const shivSlowSeconds = e.quoted(shivWords, 2);
    const shiv = e.formula("Magic Damage");
    const shivMore = e.formula("Increased Damage");
    const shivBackWords = "Backstab Bonus: The dagger deals an additional 15 – 50 (based on level) (+ 10% AP) bonus magic damage, increased to 22.5 – 75 (based on level) (+ 15% AP) if the target is below 30% of their maximum health.";
    const shivBack: Formula = { base: e.levelValue(shivBackWords, 0), ratios: { AP: e.quoted(shivBackWords, 2) / 100 } };
    const shivBackMore: Formula = { base: e.levelValue(shivBackWords, 1), ratios: { AP: e.quoted(shivBackWords, 5) / 100 } };

    // Jack in the Box: a box within 500 that arms over 2 s; sprung, it fears for 1.5 s and roots for 1 s, sets speed to 100 from 0.15 s for 1.8 s, then fires for 5 s every 0.5 s at 85 (+ 18% AP).
    const armWords = "Shaco summons a box at the target location that becomes stealthed after arming over 2 seconds, lasting for up to 40 (+ 10% AP) seconds.";
    const boxArm = w.quoted(armWords, 0);
    const boxLife: Formula = { base: w.quoted(armWords, 1), ratios: { AP: w.quoted(armWords, 2) / 100 } };
    const fearSeconds = w.number("Fear Duration");
    const rootSeconds = w.number("Root Duration");
    const staticSeconds = w.number("Slow Duration");
    const staticWords = "After a 0.15-second delay of the box's activation, enemies hit also have their movement speed reduced. Enemy champions have their movement speed set to a static 100";
    const staticDelay = w.quoted(staticWords, 0);
    const staticSpeed = w.quoted(staticWords, 1);
    const firing = w.quoted("Once sprung, the box will remain for 5 seconds, during which it will automatically fire at nearby visible enemies every 0.5 seconds, dealing magic damage with each attack.", 0);
    const boxShot = w.formula("Increased Damage");
    const boxRange = w.field("targetRange");
    const boxHealth = box.stat("hp", 0);
    const miniHealth = box.stat("hp", 1);
    const boxArmor = box.stat("armor");
    const boxMR = box.stat("magicresist");
    const boxReach = box.stat("range");
    const boxRadius = box.stat("radius");
    const boxRate = box.stat("attackspeed");
    box.quote("Boxes' attacks can be mitigated by block and dodge, but not blind.");
    kit.assume(`A box springs on the enemy within its ${boxReach} attack range once armed (the wiki gives no trigger radius), and Shaco places it under an enemy within reach. The 33% maximum health a box loses to each champion attack is left out.`);

    // Hallucinate: Shaco vanishes for 0.5 s as an 18 s clone appears; the clone explodes for 300 (+ 70% AP) within 250 and drops three mini-boxes (fear 1 s, root 0.5 s, 75 (+ 15% AP) per shot, 1,100 shared health).
    const vanishSeconds = r.quoted("Shaco vanishes for 0.5 seconds and blinks in the target direction while creating a clone of himself", 0);
    const cloneSeconds = r.quoted("remaining within control range of him as a controllable clone for up to 18 seconds", 0);
    const blast = r.formula("Magic Damage");
    const blastRadius = r.field("effectRadius");
    const miniWords = "deploy three mini-boxes that activate instantly, fearing nearby enemies for 1 second, increased to 2.2 seconds against non-champions, and rooting them for 0.5 seconds";
    const miniFear = r.quoted(miniWords, 0);
    const miniRoot = r.quoted(miniWords, 2);
    const miniShot = r.formula("Increased Modified Damage");
    const miniCount = 3;
    r.quote("The boxes possess Jack in the Box effects, except they have a doubled, but shared health");
    const cloneShare = clone.quoted("Hallucination's attacks deal 60% damage to units", 0) / 100;
    const cloneRange = clone.stat("range");
    clone.quote("100% of Shaco's current health");
    clone.quote("50% increased damage from all sources");
    kit.assume("Hallucination's 50% increased damage taken is its health divided by 1.5, and its attacks' on-hit effects are left out. The three mini-boxes share one body that fires three shots at a time.");

    const behind = (self: Unit, enemy: Unit) => enemy.facing === directionTo(self, enemy);
    const deceived = (unit: Unit) => unit.statuses.some((s) => s.kind === "state" && s.key === "invisible" && s.ability === "Q");
    const critFactor = (self: Unit, attack: AttackHitOptions) => {
      const d = derive(self);
      return averageCritFactor(attack.critChance ?? d.critChance, attack.critMultiplier ?? d.critDamage);
    };
    // The box's (and mini-boxes') fear, root and static speed from where it springs.
    const springs = (x: number, fear: number, root: number): Effect[] => [
      { type: "cc", cc: "fear", duration: fear, fearOriginX: x },
      { type: "cc", cc: "root", duration: root },
      { type: "delayed", delay: staticDelay, effects: [{ type: "state", state: "moveSpeedOverride", value: staticSpeed, duration: fear + (staticSeconds - fearSeconds) - staticDelay }] },
    ];
    const firingBox = (name: string, hp: number, shot: Formula, shots: number): PetSpec => ({
      kind: "box", name, hp, armor: boxArmor, mr: boxMR, radius: boxRadius, moveSpeed: 0, duration: firing, targetClass: "minion",
      attack: { ranged: true, range: boxReach, interval: 1 / boxRate, effects: Array.from({ length: shots }, (): Effect => ({ type: "damage", damageType: "magic", amount: shot, label: name })), attackLike: true },
    });

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: blinkDelay,
      onCastStart: [{ type: "state", state: "invisible", duration: invisibleSeconds }],
      delivery: { kind: "blink", direction: "toward", distance: blinkRange, through: true },
      usable: (unit, world) => {
        const enemy = world.units[1 - unit.side]!;
        return Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= blinkRange;
      },
      roles: ["engage"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" },
      usable: (unit, world) => Math.abs(world.units[1 - unit.side]!.x - unit.x) <= boxRange + boxReach,
      flags: { spellShield: true },
      roles: ["cc"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "target", range: e.field("targetRange"), missileSpeed: e.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: shiv }, { type: "cc", cc: "slow", strength: shivSlow, duration: shivSlowSeconds }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "state", state: "invisible", duration: vanishSeconds }],
      flags: { spellShield: true },
      roles: ["buff"],
    };

    // The clone bursts: its blast within 250, then the mini-boxes spring where it stood.
    const burst = (ctx: HookContext, x: number) => {
      delete ctx.memory["shaco:cloneUntil"];
      if (!ctx.enemy.alive) return;
      const gap = Math.abs(ctx.enemy.x - x) - ctx.enemy.spec.base.radius;
      if (gap <= blastRadius) abilityHit(ctx.world, ctx.self, ctx.enemy, rSpec, [{ type: "damage", damageType: "magic", amount: blast, label: `${r.name} (explosion)` }]);
      if (gap <= boxReach) abilityHit(ctx.world, ctx.self, ctx.enemy, rSpec, springs(x, miniFear, miniRoot));
      spawnPet(ctx.world, ctx.self, firingBox("Mini-Boxes", miniHealth, miniShot, miniCount), x);
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      const gap = Math.abs(enemy.x - self.x) - enemy.spec.base.radius;
      if (view.mode === "fight" || view.mode === "trade") {
        // Deceive past the enemy for an attack from behind.
        if (!deceived(self) && canCast(world, self, qSpec)) return { kind: "cast", ability: "Q" };
        // A box under the enemy, and the clone once the fight is on.
        if (canCast(world, self, wSpec) && gap <= boxRange) return { kind: "cast", ability: "W" };
        if (view.mode === "fight" && canCast(world, self, rSpec) && gap <= boxRange && petsOf(world, self.side, CLONE).length === 0) return { kind: "cast", ability: "R" };
      }
      // While invisible, only the attack that breaks it.
      if (deceived(self) && view.mode !== "flee") {
        const decided = defaultBehavior(view);
        return decided?.kind === "cast" && decided.ability === "E" ? { kind: "attack" } : decided;
      }
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      attack: {
        // Backstab and Deceive's ambush add to the attack's own damage, critical strikes included.
        bonusPhysicalFor: (self, target, attack) => {
          let bonus = behind(self, target) ? evaluate(backstab, self, target) : 0;
          if (attack.attackTag === AMBUSH) bonus += evaluate(ambush, self, target);
          return bonus * critFactor(self, attack);
        },
      },
      behavior,
      hooks: {
        onAttack(ctx) {
          // The attack that breaks Deceive, or the next within 0.25 s: from behind, a sure critical strike.
          if (!deceived(ctx.self) && ctx.tick > Number(ctx.memory["shaco:ambushUntil"] ?? -1)) return;
          ctx.action.attackTag = AMBUSH;
          if (behind(ctx.self, ctx.enemy)) {
            const rolled = derive(ctx.self).critChance;
            ctx.action.critChance = 1;
            ctx.action.critMultiplier = (1 - rolled) * ambushCrit + rolled * ambushRolled;
          }
        },
        onAttackLaunch(ctx) {
          if (deceived(ctx.self)) ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible" && s.ability === "Q"));
          delete ctx.memory["shaco:ambushUntil"];
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          // The dagger thrown breaks Deceive; the attack within 0.25 s after is still empowered.
          if (key === "E" && deceived(ctx.self)) {
            ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible" && s.ability === "Q"));
            ctx.memory["shaco:ambushUntil"] = ctx.tick + ticks(ambushWindow);
          }
          if (key === "W") {
            // The box: under the enemy within 500, or as far toward it as it reaches.
            const dir = directionTo(ctx.self, ctx.enemy);
            const x = ctx.self.x + dir * Math.min(boxRange, Math.abs(ctx.enemy.x - ctx.self.x));
            ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: ctx.tick, x, radius: boxReach, startTick: ctx.tick + ticks(boxArm), endTick: ctx.tick + ticks(evaluate(boxLife, ctx.self)), ability: "W", onHit: springs(x, fearSeconds, rootSeconds), connects: true, scale: 1 });
          }
          if (key === "R") {
            const self = ctx.self;
            const d = derive(self);
            const spec: PetSpec = {
              kind: CLONE, name: clone.name, unitClass: "clone", targetClass: "champion",
              hp: self.hp / 1.5, armor: d.armor.base + d.armor.bonus, mr: d.mr.base + d.mr.bonus, radius: self.spec.base.radius, moveSpeed: d.moveSpeed, duration: cloneSeconds + 1,
              attack: { range: cloneRange, interval: 1 / d.attackSpeed, effects: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: cloneShare } }, label: clone.name }], attackLike: true },
            };
            for (const old of petsOf(ctx.world, self.side, CLONE)) ctx.world.pets = ctx.world.pets.filter((pet) => pet !== old);
            spawnPet(ctx.world, self, spec, self.x);
            ctx.memory["shaco:cloneUntil"] = ctx.tick + ticks(cloneSeconds);
          }
        },
        onZoneTrigger(ctx) {
          if (ctx.zone.ability === "W") spawnPet(ctx.world, ctx.self, firingBox(w.name, boxHealth, boxShot, 1), ctx.zone.x);
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "E" || ctx.enemy.petId !== undefined) return undefined;
          const low = ctx.enemy.hp < shivBelow * derive(ctx.enemy).maxHp;
          const effects: Effect[] = ctx.effects.map((effect) => (effect.type === "damage" && low ? { ...effect, amount: shivMore } : effect));
          if (behind(ctx.self, ctx.enemy)) effects.push({ type: "damage", damageType: "magic", amount: low ? shivBackMore : shivBack, label: `${e.name} (backstab)` });
          return effects;
        },
        onAttackHit(ctx) {
          // Two-Shiv Poison's attacks slow while it is ready.
          if (ctx.blocked || ctx.enemy.petId !== undefined) return;
          if (Number(ctx.self.cooldownReady.E ?? 0) <= ctx.tick) ctx.apply({ type: "cc", cc: "slow", strength: shivSlow, duration: passiveSlow });
        },
        onPetDeath(ctx) {
          if (ctx.pet.spec.kind === CLONE && !ctx.byOwner) burst(ctx, ctx.pet.x);
        },
        onTick(ctx) {
          // The clone also bursts when its time runs out.
          const until = ctx.memory["shaco:cloneUntil"];
          if (until === undefined || ctx.tick < Number(until)) return;
          const pet = petsOf(ctx.world, ctx.self.side, CLONE)[0];
          if (!pet) {
            delete ctx.memory["shaco:cloneUntil"];
            return;
          }
          ctx.world.pets = ctx.world.pets.filter((other) => other !== pet);
          burst(ctx, pet.x);
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          const haste = 1 + d.abilityHaste / 100;
          const boxes = (evaluate(boxShot, self, target) * firing * boxRate * haste) / wSpec.cooldown;
          const minis = ((miniCount * evaluate(miniShot, self, target) * firing * boxRate + evaluate(blast, self, target)) * haste) / rSpec.cooldown;
          const cloneHits = (cloneShare * d.ad * d.attackSpeed * cloneSeconds * haste) / rSpec.cooldown;
          return { magic: boxes + minis, physical: cloneHits };
        },
      },
    };
  },
};

export default shaco;
