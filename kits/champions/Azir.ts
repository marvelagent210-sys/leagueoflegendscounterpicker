/**
 * Azir (patch 26.20): Arise! raises Sand Soldiers that stab in his stead whenever he attacks an
 * enemy near them; Conquering Sands sends them dashing through the enemy; Shifting Sands shields
 * him and flies him to a soldier; Emperor's Divide charges a phalanx that knocks the enemy away
 * and stands as a wall.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, type Command, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

const SOLDIER = "azir:soldier";
/** Set by the behavior for the cast it aims: Shifting Sands needs a soldier to fly to. */
const E_AIM = "azir:eAim";
const STAB = "azir:stab";

const azir: KitModule = {
  champion: "Azir",
  build(kit) {
    const p = kit.ability("Shurima's Legacy");
    const q = kit.ability("Conquering Sands");
    const w = kit.ability("Arise!");
    const e = kit.ability("Shifting Sands");
    const r = kit.ability("Emperor's Divide");
    const soldier = kit.pet("Sand Soldiers");

    p.quote("Whenever a turret outside the enemy team's base is destroyed, a marker is placed above its ruins which can be targeted by Azir.");
    kit.assume("Shurima's Legacy needs turret ruins, which a duel has none of.");

    // Arise!: a soldier within 525 for 10 s (2 charges, one per 6 s, 1.5 s apart). When Azir attacks an enemy within 375 of a soldier he commands, the soldiers within reach stab instead: 198 (88 at level 20 + 110) (+ 65% AP) magic damage, applying his on-hits at 50%; each further soldier deals 25%, without on-hits.
    const soldierSeconds = w.quoted("Azir summons a Sand Soldier at the target location that is untargetable, lasts 10 seconds", 0);
    const soldierCharges = w.quoted("Azir periodically stocks a Sand Soldier, up to a maximum of 2.", 0);
    const placeRange = w.field("targetRange");
    const commandRange = w.field("tetherRadius");
    // 88 at level 20, + 110 at rank 5 (a flat term the formula reader leaves to a quote), + 65% AP.
    const stabPart = w.formulaPart("Magic Damage", ["AP"]);
    const stab: Formula = { ...stabPart, base: stabPart.base + w.quoted("(based on level) (+ 50 / 65 / 80 / 95 / 110) (+ 35 / 42.5 / 50 / 57.5 / 65% AP)", 4) };
    const onHitShare = w.quoted("Against the primary target, the Sand Soldier's attack applies both on-hit and on-attack effects, the damage of which is reduced to 50% effectiveness.", 0) / 100;
    const laterShare = w.quoted("Subsequent Sand Soldier attacks against the same target deal 25% damage without applying on-hit and on-attack effects.", 0) / 100;
    const reachWords = "Whenever Azir declares an attack on a target within 375 units of one of his Sand Soldiers, he instead commands all Sand Soldiers in range to attack.";
    const soldierReach = soldier.quoted(reachWords, 0);
    const stabReach = soldier.quoted("375 / 425", 1);
    soldier.quote("Their attack passes through by 50 units.");
    soldier.quote("There is a brief delay between the command and the attack occurring.");
    soldier.quote("Sand Soldiers' attacks are mitigated by block or dodge, likewise while Azir is blinded.");
    kit.assume(`Azir commands the soldiers within ${commandRange} of him; a soldier's stab lands when his attack would have launched, and reaches ${stabReach} from it. Soldiers don't expire when Azir walks away, and they stab only the enemy champion.`);

    // Conquering Sands: the soldiers dash to the target location (740, about 50 beyond), through the enemy, for 155 (+ 55% AP) and a 25% slow for 1 s, once.
    const qRange = q.field("targetRange");
    const qWords = "Active: Azir orders all Sand Soldiers to dash toward the target location, dealing magic damage to all enemies they pass through as well as those in front of them upon arrival, and slowing them by 25% for 1 second.";
    const qSlow = q.quoted(qWords, 0) / 100;
    const qSlowSeconds = q.quoted(qWords, 1);
    const qBeyond = q.quoted("Sand Soldiers dash about 50 units further away from Azir than the target location", 0);
    const qCollision = q.field("effectRadius", "collision");
    q.quote("Enemies hit by subsequent soldiers take no additional damage or slow.");
    q.quote("A summoned Sand Soldier is required to cast this ability.");
    const soldierSpeed = 1600;
    kit.assume(`Conquering Sands' soldiers dash at ${soldierSpeed} (the wiki gives no speed) and all land together at the target location, with no formation.`);

    // Shifting Sands: a 230 (+ 60% AP) shield for 1.5 s and a dash to a soldier within 1100; dashing into the enemy, he stops, deals 230 (+ 60% AP) and gains a soldier.
    const eWords = "Active: Azir grants himself a shield for 1.5 seconds and dashes to the Sand Soldier closest to the cursor, dealing magic damage to enemies within his path.";
    const shieldSeconds = e.quoted(eWords, 0);
    const eRange = e.field("targetRange");
    e.quote("If Azir dashes into an enemy champion, he stops and gains a charge of Arise!.");
    e.quote("A summoned Sand Soldier is required to cast this ability.");
    const eSpeed = 1700;
    kit.assume(`Shifting Sands dashes at ${eSpeed} (the wiki gives no speed).`);

    // Emperor's Divide: soldiers from 325 behind to 400 in front of Azir charge, dealing 600 (+ 75% AP) and knocking the enemy away over 1 s to 650 in front of him; then a wall at 400 for 5 s that enemies can't pass.
    const rWords = "Active: Azir calls forth a phalanx of soldiers from 175 units behind him, catching enemies from up to 325 units behind him and charging forward 575 units in the target direction.";
    const rStart = r.quoted(rWords, 0);
    const rBehind = r.quoted(rWords, 1);
    const rCharge = r.quoted(rWords, 2);
    const rFront = rCharge - rStart;
    if (rFront !== r.field("targetRange", "Charge distance")) throw new Error("Azir: Emperor's Divide's charge doesn't end at its wall");
    const knockWords = "Enemies impacted by the charge are dealt magic damage and knocked away over 1 second to a line 650 units in front of Azir.";
    const knockSeconds = r.quoted(knockWords, 0);
    const knockLine = r.quoted(knockWords, 1);
    const wallSeconds = r.quoted("Upon finishing their charge, the soldiers stand as a wall for 5 seconds, acting as impassible terrain against enemies", 0);
    r.quote("Azir and his allies can move through these soldiers.");
    const wallRadius = r.field("effectRadius");
    const [, chargeSpeed = 1400] = r.fieldNumbers("speed");
    const chargeAt = r.quoted("The charge starts at 0.25 seconds into the cast time.", 0);
    const rCast = r.castTime();
    // The charge reaches the wall's line this long after the cast ends.
    const rDelay = Math.max(0, chargeAt + rCharge / chargeSpeed - rCast);
    kit.assume(`Emperor's Divide hits once its charge reaches the wall's line, ${rDelay.toFixed(2)} s after the cast; its wall, ${2 * wallRadius} thick (its soldiers' radius each way), stands across the whole line, so an enemy can't walk around it.`);

    // Where his soldiers stand, kept each tick for the hints that see units but not the world.
    const placed = (self: Unit, key: string): number[] => String(self.memory[key] ?? "").split(",").filter(Boolean).map(Number);
    const soldiers = (world: World, self: Unit): Pet[] => petsOf(world, self.side, SOLDIER).filter((pet) => pet.endTick > world.tick);
    const commanded = (world: World, self: Unit): Pet[] => soldiers(world, self).filter((pet) => Math.abs(pet.x - self.x) <= commandRange);
    const reaches = (pet: Pet, enemy: Unit, reach = soldierReach) => Math.abs(enemy.x - pet.x) <= reach + enemy.spec.base.radius;
    const striking = (world: World, self: Unit, enemy: Unit): Pet[] => (enemy.petId === undefined ? commanded(world, self).filter((pet) => reaches(pet, enemy)) : []);

    const wCost = w.cost();
    const eCost = e.cost();
    const rCost = r.cost();

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      usable: (unit, world) => soldiers(world, unit).length > 0,
      delivery: {
        kind: "circle", range: qRange, radius: qCollision, delay: qRange / soldierSpeed,
        // The first soldier to reach the target location, about 50 beyond it.
        delayFor: (caster, target) => {
          const at = target.x + directionTo(caster, target) * qBeyond;
          const nearest = Math.min(...placed(caster, "azir:soldiers").map((x) => Math.abs(at - x)));
          return Number.isFinite(nearest) ? nearest / soldierSpeed : qRange / soldierSpeed;
        },
      },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: qSlow, duration: qSlowSeconds }],
      flags: { spellShield: true },
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.field("cooldown"), charges: { max: soldierCharges, recharge: w.field("recharge") }, cost: wCost, castTime: w.castTime(),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: eCost, castTime: e.castTime(),
      usable: (unit, world) => unit.memory[E_AIM] !== undefined && soldiers(world, unit).some((pet) => Math.abs(pet.x - unit.x) <= eRange),
      delivery: { kind: "dash", direction: "toward", distance: eRange, minDistance: 0, speed: eSpeed, hitRadius: 0 },
      onSelf: [{ type: "shield", amount: e.formula("Shield Strength"), duration: shieldSeconds }],
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }],
      flags: { grounded: true, knockdown: true, spellShield: true },
      roles: ["escape", "damage"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: rCost, castTime: rCast,
      delivery: { kind: "area", near: -rBehind, far: rFront, delay: rDelay, anchor: "ground" },
      // The knock back's distance is set at contact, to the line 650 in front of Azir.
      onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }, { type: "displace", direction: "away", distance: knockLine, duration: knockSeconds }],
      flags: { spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };

    const soldierSpec: PetSpec = { kind: SOLDIER, name: soldier.name, targetClass: "minion", hp: Number.POSITIVE_INFINITY, armor: 0, mr: 0, radius: 0, moveSpeed: 0, duration: soldierSeconds, untargetable: true };

    // Shifting Sands to that soldier.
    const fly = (self: Unit, enemy: Unit, pet: Pet): Command => {
      self.memory[E_AIM] = pet.id;
      return { kind: "cast", ability: "E", aim: { direction: (pet.x - self.x) * directionTo(self, enemy) >= 0 ? 1 : -1, distance: Math.abs(pet.x - self.x) } };
    };
    const eReady = (world: World, self: Unit) => canCast(world, self, { ...eSpec, usable: undefined });

    const behavior: Behavior = (view) => {
      const { self, world, enemy, mode } = view;
      if (mode === "idle" || !self.alive || (self.action && self.action.kind !== "windup")) return defaultBehavior(view);
      const toward = directionTo(self, enemy);
      const gap = Math.abs(enemy.x - self.x);
      if (mode === "flee") {
        // Out by Shifting Sands to a soldier behind him, raised there first.
        const out = soldiers(world, self)
          .filter((pet) => (pet.x - self.x) * toward < -enemy.spec.base.radius && Math.abs(pet.x - self.x) <= eRange)
          .sort((a, b) => Math.abs(b.x - self.x) - Math.abs(a.x - self.x))[0];
        if (out && eReady(world, self)) return fly(self, enemy, out);
        if (!out && eReady(world, self) && canCast(world, self, wSpec) && self.resource >= wCost + eCost) return { kind: "cast", ability: "W", aim: { direction: -1, distance: placeRange } };
        return defaultBehavior(view);
      }
      // Arise!: a soldier on the enemy, and a second one when a charge is spare.
      if (canCast(world, self, wSpec) && gap - enemy.spec.base.radius <= placeRange + soldierReach && striking(world, self, enemy).length < soldierCharges) return { kind: "cast", ability: "W", aim: { direction: 1, distance: Math.min(placeRange, gap) } };
      // Shifting Sands into the enemy, then Emperor's Divide to throw them back behind its wall.
      if (mode === "fight" && canCast(world, self, rSpec) && self.resource >= eCost + rCost && gap - enemy.spec.base.radius > rFront && eReady(world, self)) {
        const onEnemy = soldiers(world, self).find((pet) => (pet.x - enemy.x) * toward >= -enemy.spec.base.radius && Math.abs(pet.x - self.x) <= eRange);
        if (onEnemy) return fly(self, enemy, onEnemy);
      }
      if ((mode === "fight" || mode === "kite") && canCast(world, self, rSpec) && gap - enemy.spec.base.radius <= rFront) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      attack: {
        // Soldiers within his command extend his reach: an enemy within 375 of one is in range.
        bonusRangeFor: (self, target) => {
          if (target.petId !== undefined) return 0;
          const far = Math.max(0, ...placed(self, "azir:commanded").map((x) => (x - self.x) * directionTo(self, target) + soldierReach - self.spec.base.radius));
          return Math.max(0, far - self.spec.attack.range);
        },
      },
      hooks: {
        onCastStart(ctx) {
          if (ctx.ability.key !== "R") return;
          // Emperor's Divide is cast from where Azir starts it.
          ctx.memory["azir:rOrigin"] = ctx.self.x;
          ctx.memory["azir:rDir"] = directionTo(ctx.self, ctx.enemy);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          const toward = directionTo(ctx.self, ctx.enemy);
          if (key === "W") {
            const direction = toward * (ctx.aim?.direction ?? 1);
            const distance = Math.min(placeRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            spawnPet(ctx.world, ctx.self, soldierSpec, ctx.self.x + direction * distance);
          }
          if (key === "Q") {
            // The soldiers arrive at the target location, about 50 beyond it.
            const at = ctx.self.x + toward * Math.min(qRange, Math.abs(ctx.enemy.x - ctx.self.x)) + toward * qBeyond;
            ctx.memory["azir:qX"] = at;
            ctx.memory["azir:qAt"] = ctx.tick + ticks(Math.min(...soldiers(ctx.world, ctx.self).map((pet) => Math.abs(at - pet.x))) / soldierSpeed);
          }
          if (key === "E") delete ctx.memory[E_AIM];
          if (key === "R") {
            const origin = Number(ctx.memory["azir:rOrigin"] ?? ctx.self.x);
            const dir = Number(ctx.memory["azir:rDir"] ?? toward);
            ctx.memory["azir:wallX"] = origin + dir * rFront;
            ctx.memory["azir:wallFrom"] = ctx.tick + ticks(rDelay);
            ctx.memory["azir:wallUntil"] = ctx.tick + ticks(rDelay + wallSeconds);
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "R") return undefined;
          // Knocked away to the line 650 in front of Azir.
          const origin = Number(ctx.memory["azir:rOrigin"] ?? ctx.self.x);
          const dir = Number(ctx.memory["azir:rDir"] ?? directionTo(ctx.self, ctx.enemy));
          const ahead = (ctx.enemy.x - origin) * dir;
          return ctx.effects.map((effect): Effect => (effect.type === "displace" ? { ...effect, distance: Math.max(0, knockLine - ahead) } : effect));
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E" && ctx.enemy.petId === undefined) {
            // Dashing into the enemy, he gains a soldier.
            const stock = ctx.self.charges.W;
            if (stock && stock.count < soldierCharges) {
              stock.count += 1;
              if (stock.count >= soldierCharges) stock.nextTick = Number.POSITIVE_INFINITY;
            }
          }
          // The wall stands once the enemy has been thrown past it.
          if (key === "R") ctx.memory["azir:wallFrom"] = Math.max(Number(ctx.memory["azir:wallFrom"] ?? ctx.tick), ctx.tick + ticks(knockSeconds));
        },
        onAttack(ctx) {
          // Declared at an enemy within a soldier's reach: the soldiers stab instead.
          if (ctx.targetPet || striking(ctx.world, ctx.self, ctx.enemy).length === 0) delete ctx.memory[STAB];
          else ctx.memory[STAB] = true;
        },
        onAttackLaunch(ctx) {
          if (ctx.targetPet || ctx.memory[STAB] !== true) return undefined;
          delete ctx.memory[STAB];
          const enemy = ctx.enemy;
          const stabbing = commanded(ctx.world, ctx.self).filter((pet) => reaches(pet, enemy, stabReach)).sort((a, b) => Math.abs(a.x - enemy.x) - Math.abs(b.x - enemy.x));
          const [first, ...others] = stabbing;
          if (!first) return false;
          const before = enemy.totals.damageTaken + enemy.totals.absorbed;
          // The full stab, with his on-hits at 50%.
          attackHit(ctx.world, ctx.self, enemy, ctx.action.blinded, ctx.action.onHit, undefined, false, { baseDamage: { damageType: "magic", amount: scaled(stab, 1 / onHitShare), label: soldier.name } }, onHitShare, first.x);
          const landed = enemy.totals.damageTaken + enemy.totals.absorbed > before;
          if (landed) for (let i = 0; i < others.length; i++) applyEffect(ctx.world, ctx.self, enemy, { type: "damage", damageType: "magic", amount: scaled(stab, laterShare), label: soldier.name }, { scale: 1 });
          return false;
        },
        onTick(ctx) {
          const self = ctx.self;
          // An aim the behavior set but couldn't cast lapses, so Shifting Sands never flies unaimed.
          delete ctx.memory[E_AIM];
          ctx.memory["azir:soldiers"] = soldiers(ctx.world, self).map((pet) => pet.x).join(",");
          ctx.memory["azir:commanded"] = commanded(ctx.world, self).map((pet) => pet.x).join(",");
          // Conquering Sands' soldiers arrive.
          const qAt = ctx.memory["azir:qAt"];
          if (qAt !== undefined && ctx.tick >= Number(qAt)) {
            const x = Number(ctx.memory["azir:qX"]);
            for (const pet of soldiers(ctx.world, self)) pet.x = x;
            delete ctx.memory["azir:qAt"];
          }
          // Emperor's Divide's wall.
          const wallFrom = ctx.memory["azir:wallFrom"];
          if (wallFrom !== undefined && ctx.tick >= Number(wallFrom)) {
            const x = Number(ctx.memory["azir:wallX"]);
            const until = Number(ctx.memory["azir:wallUntil"]);
            delete ctx.memory["azir:wallFrom"];
            if (until > ctx.tick) ctx.world.terrain.push({ id: ctx.world.nextId++, owner: self.side, from: x - wallRadius, to: x + wallRadius, endTick: until, enemyOnly: true });
          }
        },
      },
      budget: {
        damage(self, target) {
          return { magic: evaluate(stab, self, target) * derive(self).attackSpeed };
        },
      },
    };
  },
};

export default azir;
