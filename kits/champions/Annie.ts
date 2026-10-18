/** Annie's level-20 kit, including Pyromania and the separate, attackable Tibbers unit. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { areaOnPets, petHit, petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet } from "../../engine/sim/state";
import { flat, innateStat, ticks } from "./util";

const TIBBERS = "tibbers";
const RETALIATION_EXCEPTIONS = new Set(["Noxious Trap", "Jack in the Box"]);

const annie: KitModule = {
  champion: "Annie",
  build(kit) {
    const passive = kit.ability("Pyromania");
    const q = kit.ability("Disintegrate");
    const w = kit.ability("Incinerate");
    const e = kit.ability("Molten Shield");
    const r = kit.ability("Summon: Tibbers");
    const pet = kit.pet("Tibbers");

    const stackCap = passive.quoted("stacking up to 4 times");
    const stun = passive.levelValue("to stun enemies hit for");
    passive.quote("Annie gains maximum stacks of Pyromania when the game starts and upon respawning");
    passive.quote("Stacks are gained even if the ability is blocked by spell shield");
    passive.quote("whenever she hits an enemy with Disintegrate or casts her other abilities");
    passive.quote("her next cast of Disintegrate, Incinerate, or Summon: Tibbers to consume all Pyromania stacks");
    const shieldSeconds = e.quoted("a shield for 3 seconds");
    const shieldSpeed = e.levelValue("bonus movement speed that decays") / 100;
    const speedSeconds = e.quoted("decays over 1.5 seconds");
    const shield = e.formula("Shield Strength");
    const retaliation = e.formula("Magic Damage");
    e.quote("This may only occur once per enemy per cast for each active Molten Shield");
    e.quote("Attacks that are dodged or miss against the shielded target will not cause the shield to deal damage, while blocked attacks still deal damage to the attacker");
    e.quote("The reaction damage does not trigger from Noxious Trap and Jack in the Box");
    const summonRange = r.field("targetRange");
    const auraRange = r.field("effectRadius", "aura");
    const duration = r.quoted("for up to 45 seconds");
    const hp = pet.stat("hp");
    const hpAP = pet.quoted("(+ 50% AP)") / 100;
    const hit: Formula = { base: pet.stat("damage"), ratios: { AP: pet.quoted("30 / 45 / 60 (+ 10% AP)", 3) / 100 } };
    const auraPhrase = "Tibbers deals 2 / 3 / 4 (+ 1% AP) magic damage to all enemies within a 350 unit radius every 0.25 seconds";
    const aura: Formula = { base: pet.quoted(auraPhrase, 2), ratios: { AP: pet.quoted(auraPhrase, 3) / 100 } };
    const auraInterval = pet.quoted(auraPhrase, 5);
    const attackRange = pet.stat("range");
    const attackSpeed = pet.stat("attackspeed");
    const moveSpeed = pet.stat("movespeed");
    const enrageSeconds = pet.quoted("Tibbers enrages for 3 seconds on summon and when Pyromania stuns an enemy champion");
    const enrageMove = pet.quoted("gains 100% bonus movement speed, which decays over the duration") / 100;
    const enrageHits = pet.quoted("for his next 5 attacks while enraged");
    const enrageRates = Array.from({ length: enrageHits }, (_, i) => pet.quoted("1.736 / 1.5362732 / 1.3070344 / 1.0430756 / 0.7391888", i));
    pet.quote("Tibbers' attacks are mitigated by block, dodge, and blind, as well as stopped by Disarm");
    pet.quote("His flaming aura applies spell effects as persistent area damage");

    kit.assume("Annie starts with four Pyromania stacks, matching game start/respawn; no pre-existing Tibbers is assumed.");
    kit.assume("Pyromania's 'next cast' empowerment is captured when a damaging cast completes. The source does not explicitly describe gaining the fourth stack during Disintegrate's flight; this model does not add a stun to an already-launched, unempowered fireball.");
    kit.assume("Incinerate uses the forward 600-unit section of its cone in the 1D duel; the cone's rear hitbox overlap is not modeled.");
    kit.assume("Tibbers is continuously commanded to chase the sole enemy champion. His attacks have instantaneous impact; pet-specific blind/disarm, out-of-combat Recovery, leash blinks, and manual commands are not modeled.");
    kit.assume("Tibbers Revenge after Annie dies is not modeled: the duel ends when its champion dies, and the engine removes the deceased owner's pets.");
    kit.assume("The quoted five approximate Enrage attack speeds are used in attack order, with linear movement-speed decay over its quoted duration.");
    kit.assume("Molten Shield's bonus movement speed decays linearly; it shields Annie and an existing Tibbers, each with one independent retaliation against the duel opponent. Pet absorption is applied before destruction in the pet damage hook.");
    kit.assume("The stat budget averages Tibbers' normal attack/aura damage over his lifetime and the summon cooldown, while the actual fight uses each Enrage and chase. Pet-specific crowd-control and attacks after Annie's death remain outside this duel model.");

    const ownTibbers = (ctx: HookContext) => petsOf(ctx.world, ctx.self.side, TIBBERS);
    const enrage = (bear: Pet, tick: number) => {
      bear.memory.enrageStart = tick;
      bear.memory.enrageUntil = tick + ticks(enrageSeconds);
      bear.memory.enrageAttacks = 0;
      // Refreshing Enrage resets the next attack's speed, without granting a free attack.
      if (bear.memory.lastAttack !== undefined) {
        const previous = Number(bear.memory.lastAttack);
        bear.memory.attackAt = Math.max(tick, previous + ticks(1 / (enrageRates[0] ?? attackSpeed)));
      }
    };
    const react = (ctx: HookContext) => {
      if (!isUntargetable(ctx.enemy, ctx.self)) ctx.apply({ type: "damage", damageType: "magic", amount: retaliation, label: e.name });
    };
    const petArmor = pet.stat("armor"), petMR = pet.stat("magicresist"), petRadius = pet.stat("radius");
    const tibbersSpec = (ctx: HookContext): PetSpec => ({
      kind: TIBBERS,
      name: pet.name,
      hp: hp + hpAP * derive(ctx.self).ap,
      armor: petArmor,
      mr: petMR,
      radius: petRadius,
      // The kit advances the chase, attacks and aura together, using petHit for attack defenses.
      moveSpeed: 0,
      duration,
      onDamaged(hitTaken) {
        const bear = hitTaken.pet;
        if (hitTaken.world.tick >= Number(bear.memory.shieldUntil ?? -1) || Number(bear.memory.shield ?? 0) <= 0) return;
        const absorbed = Math.min(hitTaken.dealt, Number(bear.memory.shield));
        bear.memory.shield = Number(bear.memory.shield) - absorbed;
        bear.hp += absorbed;
        if (!bear.memory.shieldReacted && hitTaken.attacker.side !== bear.owner && !RETALIATION_EXCEPTIONS.has(hitTaken.ability ?? "")) {
          bear.memory.shieldReacted = true;
          const owner = hitTaken.world.units[bear.owner];
          if (!isUntargetable(hitTaken.attacker, owner)) applyEffect(hitTaken.world, owner, hitTaken.attacker, { type: "damage", damageType: "magic", amount: retaliation, label: e.name }, { scale: 1 });
        }
      },
    });
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), cancelOnInvalidTarget: true,
        delivery: { kind: "target", range: q.field("targetRange"), missileSpeed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }],
        flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, roles: ["damage", "cc"],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        delivery: { kind: "area", near: 0, far: w.field("effectRadius"), delay: 0, anchor: "caster" },
        onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }],
        flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield") }, decisive: true, roles: ["damage", "cc"],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), overlay: true, preserveAttackWindup: true,
        delivery: { kind: "self" }, onSelf: [{ type: "shield", amount: shield, duration: shieldSeconds }], roles: ["defense", "buff"],
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime("Initial"), cooldownAtCastStart: true,
        delivery: { kind: "circle", range: summonRange, radius: r.field("effectRadius", "impact"), delay: 0 },
        onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Initial Magic Damage") }],
        flags: { spellShield: r.flag("spellShield") }, decisive: true, roles: ["damage", "cc"],
      },
    ];
    // Avoid calling a sealed AbilityData from any runtime hook.
    const qRefund = q.quoted("Disintegrate's cooldown is reduced by 50%") / 100;
    const qCost = q.cost();
    const rCooldown = r.cooldown();
    const retaliationCooldown = e.cooldown();
    const shieldAbility = abilities.find((ability) => ability.key === "E")!;
    const behavior: Behavior = (view) => {
      if (view.mode !== "idle" && canCast(view.world, view.self, shieldAbility)) {
        const incoming = view.threats.some((threat) => threat.damage > 0 && threat.eta <= ticks(shieldSeconds));
        const seenBy = view.world.tick - ticks(view.world.settings.reactionTime);
        const ownPet = (id: number | undefined) => id !== undefined && view.world.pets.some((bear) => bear.id === id && bear.owner === view.self.side && bear.spec.kind === TIBBERS);
        const petWindups = [view.enemy.action, view.enemy.pendingAttack].some((action) => action?.kind === "windup" && action.startTick <= seenBy && action.launchTick - view.world.tick <= ticks(shieldSeconds) && ownPet(action.pet));
        const petMissiles = view.world.missiles.some((missile) => missile.owner === view.enemy.side && missile.seenTick <= seenBy && ownPet(missile.pet));
        if (incoming || petWindups || petMissiles) return { kind: "cast", ability: "E" };
      }
      return defaultBehavior(view);
    };

    return {
      abilities,
      behavior,
      start: [innateStat("magicPenPercent", r.fraction("Magic Penetration"))],
      budget: {
        damage(self, target) {
          const d = derive(self);
          const active = Math.min(1, duration / (cooldownAfterHaste(rCooldown, d.abilityHaste) + abilities[3]!.castTime));
          return { magic: active * (evaluate(hit, self, target) * attackSpeed + evaluate(aura, self, target) / auraInterval) + evaluate(retaliation, self, target) / cooldownAfterHaste(retaliationCooldown, d.abilityHaste) };
        },
      },
      hooks: {
        onStart(ctx) { ctx.memory.pyromania = stackCap; },
        onCast(ctx) {
          const key = ctx.ability.key;
          const live = Number(ctx.memory.pyromania ?? 0);
          if (key === "Q" || key === "W" || key === "R") {
            ctx.memory[`energized:${key}`] = live >= stackCap;
            if (live >= stackCap) ctx.memory.pyromania = 0;
            else if (key !== "Q") ctx.memory.pyromania = Math.min(stackCap, live + 1);
          }
          if (key === "E") {
            ctx.memory.pyromania = Math.min(stackCap, live + 1);
            ctx.memory.moltenStart = ctx.tick;
            ctx.memory.moltenReacted = false;
            ctx.buff("moltenSpeed", "moveSpeedPercent", shieldSpeed, speedSeconds);
            for (const bear of ownTibbers(ctx)) {
              bear.memory.shield = evaluate(shield, ctx.self, ctx.self);
              bear.memory.shieldUntil = ctx.tick + ticks(shieldSeconds);
              bear.memory.shieldReacted = false;
              bear.memory.moltenStart = ctx.tick;
            }
          }
          if (key === "R") {
            const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(summonRange, Math.abs(ctx.enemy.x - ctx.self.x));
            const bear = spawnPet(ctx.world, ctx.self, tibbersSpec(ctx), x);
            enrage(bear, ctx.tick);
            bear.memory.attackAt = ctx.tick + 1;
            bear.memory.auraStart = ctx.tick;
            bear.memory.auraPulse = 1;
          }
        },
        onAbilityContact(ctx) {
          const key = ctx.ability.key;
          if (key !== "Q" && key !== "W" && key !== "R") return;
          const energized = Boolean(ctx.memory[`energized:${key}`]);
          if (key === "Q" && !energized) ctx.memory.pyromania = Math.min(stackCap, Number(ctx.memory.pyromania ?? 0) + 1);
          return energized ? [...ctx.effects, { type: "cc", cc: "stun", duration: stun }] : [...ctx.effects];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q" && ctx.enemy.hp <= 0) {
            ctx.apply({ type: "refund", ability: "Q", fraction: qRefund }, true);
            ctx.apply({ type: "resource", amount: flat(qCost) }, true);
          }
          if (ctx.enemy.statuses.some((s) => s.kind === "cc" && s.key === "stun" && s.source === ctx.self.side && s.startTick === ctx.tick)) {
            for (const bear of ownTibbers(ctx)) enrage(bear, ctx.tick);
          }
        },
        beforeDamageTaken(ctx) {
          ctx.memory.moltenHit = !RETALIATION_EXCEPTIONS.has(ctx.ability ?? "") && !ctx.memory.moltenReacted && ctx.self.statuses.some((s) => s.kind === "shield" && s.key === "E" && s.endTick > ctx.tick && s.value > 0);
        },
        onDamageTaken(ctx) {
          if (!ctx.memory.moltenHit || RETALIATION_EXCEPTIONS.has(ctx.ability ?? "")) return;
          ctx.memory.moltenHit = false;
          ctx.memory.moltenReacted = true;
          react(ctx);
        },
        onAttackAvoided(ctx) {
          // A blocked attack still retaliates, unlike a dodge/miss or a parried attack.
          if (ctx.memory.moltenReacted || ctx.self.statuses.some((s) => s.kind === "state" && (s.key === "dodgeAttacks" || s.key === "parry"))) return;
          if (ctx.self.statuses.some((s) => s.kind === "state" && s.key === "blockAttacks") && ctx.self.statuses.some((s) => s.kind === "shield" && s.key === "E" && s.endTick > ctx.tick && s.value > 0)) {
            ctx.memory.moltenReacted = true;
            react(ctx);
          }
        },
        onTick(ctx) {
          const speedAge = (ctx.tick - Number(ctx.memory.moltenStart ?? -1e9)) / 30;
          if (speedAge < speedSeconds) ctx.buff("moltenSpeed", "moveSpeedPercent", shieldSpeed * Math.max(0, 1 - speedAge / speedSeconds), speedSeconds - speedAge);
          for (const bear of ownTibbers(ctx)) {
            if (bear.hp <= 0 || ctx.tick >= bear.endTick) continue;
            const enraged = ctx.tick < Number(bear.memory.enrageUntil ?? -1);
            const enrageAge = (ctx.tick - Number(bear.memory.enrageStart ?? ctx.tick)) / 30;
            const moltenAge = (ctx.tick - Number(bear.memory.moltenStart ?? -1e9)) / 30;
            const speed = moveSpeed * (1 + (enraged ? enrageMove * Math.max(0, 1 - enrageAge / enrageSeconds) : 0) + (moltenAge < speedSeconds ? shieldSpeed * Math.max(0, 1 - moltenAge / speedSeconds) : 0));
            const gap = Math.max(0, Math.abs(ctx.enemy.x - bear.x) - ctx.enemy.spec.base.radius - attackRange);
            if (!isUntargetable(ctx.enemy, ctx.self)) bear.x += Math.sign(ctx.enemy.x - bear.x) * Math.min(gap, speed / 30);
            if (ctx.tick >= Number(bear.memory.attackAt ?? 0) && gap <= speed / 30 && !isUntargetable(ctx.enemy, ctx.self)) {
              petHit(ctx.world, bear, ctx.enemy, [{ type: "damage", damageType: "magic", amount: hit, label: pet.name }], true);
              const count = Number(bear.memory.enrageAttacks ?? 0);
              bear.memory.enrageAttacks = count + 1;
              bear.memory.lastAttack = ctx.tick;
              const nextSpeed = enraged ? enrageRates[count + 1] ?? attackSpeed : attackSpeed;
              bear.memory.attackAt = ctx.tick + ticks(1 / nextSpeed);
            }
            const pulse = Number(bear.memory.auraPulse ?? 1);
            if (ctx.tick >= Number(bear.memory.auraStart) + ticks(pulse * auraInterval)) {
              bear.memory.auraPulse = pulse + 1;
              if (Math.abs(bear.x - ctx.enemy.x) <= auraRange + ctx.enemy.spec.base.radius && !isUntargetable(ctx.enemy, ctx.self) && !inStasis(ctx.enemy)) ctx.apply({ type: "damage", damageType: "magic", amount: aura, persistent: true, label: "Tibbers Flame Aura" });
              areaOnPets(ctx.world, ctx.self, bear.x - auraRange, bear.x + auraRange, [{ type: "damage", damageType: "magic", amount: aura, persistent: true }]);
            }
          }
        },
      },
    };
  },
};

export default annie;
