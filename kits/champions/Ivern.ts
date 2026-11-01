/**
 * Ivern (patch 26.20): Rootcaller roots; Brushmaker grows brush at his feet, and his attacks
 * from it fire bolts of magic damage; Triggerseed shields him, then explodes and slows; Daisy!
 * summons Daisy, who fights beside him and smashes the enemy every third attack.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

const DAISY = "daisy";

const ivern: KitModule = {
  champion: "Ivern",
  build(kit) {
    const p = kit.ability("Friend of the Forest");
    const q = kit.ability("Rootcaller");
    const w = kit.ability("Brushmaker");
    const e = kit.ability("Triggerseed");
    const r = kit.ability("Daisy!");
    const daisy = kit.pet("Daisy");

    p.quote("Ivern cannot attack nor damage non-epic monsters.");
    kit.assume("Friend of the Forest only concerns jungle camps, which a duel has none of.");

    // Rootcaller: a vine (1150, 160, 1300) for 260 (+ 70% AP) and a 2 s root.
    const rootSeconds = q.number("Root Duration");
    q.quote("Ivern and allied champions can issue an attack order against the target rooted by Rootcaller to dash to their location, stopping at their attack range.");
    kit.assume("Rootcaller's dash to the rooted enemy is left out: Ivern fights from range, and a duel has no allies to bring.");

    // Brushmaker: brush at his feet (3 charges, one per 20 s, for 45 s); from it, and for 3 s after leaving, his attacks fire a bolt for 50 (+ 20% AP).
    const brushWords = "While Ivern is in brush, his basic attacks are empowered to fire a bolt at the target, dealing additional magic damage. This bonus persists for 3 seconds after leaving brush.";
    const brushLinger = w.quoted(brushWords, 0);
    const bolt = w.formula("Additional Magic Damage");
    const brushSeconds = w.quoted("Ivern grows a patch of brush at the target location for 45 seconds", 0);
    const brushCharges = w.quoted("Ivern periodically stocks a Brushmaker charge, up to a maximum of 3.", 0);
    const brushRadius = 250;
    kit.assume(`Ivern grows his brush at his feet, ${brushRadius} across each way (the wiki gives no size); the brush's concealment doesn't hide him at fighting range.`);

    // Triggerseed: a 235 (+ 50% AP) shield for 2 s; then the seed explodes within 500 for 150 (+ 80% AP) and a 60% slow for 2 s; if it hits no champion, the shield returns.
    const seedSeconds = e.quoted("Ivern places a seed on the target allied champion, Daisy, or himself, granting the target a shield for 2 seconds.", 0);
    const seedRadius = e.field("effectRadius");
    const seedSlowSeconds = e.quoted("After 2 seconds, the seed explodes to deal magic damage to nearby enemies and slow them for 2 seconds.", 1);
    const seedShield = e.formula("Shield Strength");
    const seedDamage = e.formula("Magic Damage");
    const seedSlow = e.fraction("Slow");
    e.quote("If the seed does not damage an enemy champion and the shield persists by the end of the duration, the shield is reapplied for the same strength and duration without the explosion effect.");

    // Daisy!: 45 s of Daisy: 4400 (+ 50% AP) health, 90 armor and magic resistance, 130 (+ 15% AP) physical at 1.2 attacks; every third attack (at most once per 3 s) a smash for 190 (+ 50% AP) that knocks up and stuns for 1 s.
    const daisySeconds = r.quoted("remains on the field for up to 45 seconds as a controllable pet", 0);
    const daisyHealth: Formula = { base: daisy.stat("hp"), ratios: { AP: daisy.quoted("(+ 50% AP)", 0) / 100 } };
    const daisyDamage: Formula = { base: daisy.stat("damage"), ratios: { AP: daisy.quoted("70 / 100 / 130 (+ 15% AP)", 3) / 100 } };
    const smashWords = "Against a target with 2 stacks, Daisy's next basic attack gains 325 bonus attack range and is empowered to charge up for 0.625 seconds to send a shockwave in a line ( 800 range, 200 width) toward the target that deals 90 / 140 / 190 (+ 50% AP) magic damage to enemies hit and stuns and knocks them up up for 1 second. Daisy Smash! cannot occur again for 3 seconds.";
    const smash: Formula = { base: daisy.quoted(smashWords, 7), ratios: { AP: daisy.quoted(smashWords, 8) / 100 } };
    const smashStun = daisy.quoted(smashWords, 9);
    const smashLockout = daisy.quoted(smashWords, 10);
    const spawnWords = "Daisy gains 40% bonus movement speed for the first 5 seconds after spawning. Additionally, she takes 25% reduced damage from all sources.";
    daisy.quote(spawnWords);
    const daisyArmor = daisy.stat("armor");
    const daisyMR = daisy.stat("magicresist");
    const daisyRadius = daisy.stat("radius");
    const daisyMove = daisy.stat("movespeed");
    const daisyRange = daisy.stat("range");
    // Her attack speed is by Daisy!'s rank: 1.2 at rank 3.
    const daisyRate = daisy.quoted("0.975 / 1.0875 / 1.2", 2);
    kit.assume("Daisy Smash! strikes with the third attack itself (its 0.625 s charge-up is left out). Daisy's 25% damage reduction while spawning and 2.5 health regeneration per second are left out.");

    const brushed = (unit: Unit, tick: number) => {
      if (tick >= Number(unit.memory["ivern:brushUntil"] ?? -1)) return false;
      return Math.abs(unit.x - Number(unit.memory["ivern:brushX"])) <= brushRadius;
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: q.field("range"), width: q.field("width"), speed: q.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "root", duration: rootSeconds }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.field("staticCooldown"), charges: { max: brushCharges, recharge: w.field("recharge") }, cost: w.cost(), castTime: w.castTime(),
      usable: (unit, world) => !brushed(unit, world.tick),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "self" },
      onSelf: [{ type: "shield", amount: seedShield, duration: seedSeconds }],
      roles: ["buff"],
    };
    // The seed's explosion.
    const seedBlast: AbilitySpec = { key: "EX", name: e.name, slot: "E", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true } };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      usable: (unit, world) => petsOf(world, unit.side, DAISY).length === 0,
      delivery: { kind: "self" },
      roles: ["buff"],
    };

    const daisySpec = (self: Unit): PetSpec => ({
      kind: DAISY, name: daisy.name, targetClass: "minion",
      hp: evaluate(daisyHealth, self), armor: daisyArmor, mr: daisyMR, radius: daisyRadius,
      moveSpeed: daisyMove, duration: daisySeconds, leash: 2500,
      attack: { range: daisyRange, interval: 1 / daisyRate, effects: [{ type: "damage", damageType: "physical", amount: daisyDamage, label: daisy.name }], attackLike: true },
      onAttackHit: ({ world, pet, target, blocked }) => {
        if (blocked || "owner" in target) return;
        const owner = world.units[pet.owner];
        const stacks = Number(pet.memory?.["ivern:smash"] ?? 0) + 1;
        const ready = world.tick >= Number(pet.memory?.["ivern:smashReady"] ?? 0);
        pet.memory = { ...pet.memory, "ivern:smash": ready && stacks >= 3 ? 0 : Math.min(2, stacks) };
        if (!(ready && stacks >= 3)) return;
        pet.memory["ivern:smashReady"] = world.tick + ticks(smashLockout);
        abilityHit(world, owner, target, rSpec, [
          { type: "damage", damageType: "magic", amount: smash, label: "Daisy Smash!" },
          { type: "displace", direction: "away", distance: 0, duration: smashStun },
          { type: "cc", cc: "stun", duration: smashStun },
        ]);
      },
    });

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (view.mode === "fight" || view.mode === "trade") {
        const gap = Math.abs(enemy.x - self.x);
        if (view.mode === "fight" && canCast(world, self, rSpec) && gap <= 900) return { kind: "cast", ability: "R" };
        if (canCast(world, self, wSpec) && gap <= 900) return { kind: "cast", ability: "W" };
        if (canCast(world, self, eSpec) && gap - enemy.spec.base.radius <= seedRadius) return { kind: "cast", ability: "E" };
      }
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            ctx.memory["ivern:brushX"] = ctx.self.x;
            ctx.memory["ivern:brushUntil"] = ctx.tick + ticks(brushSeconds);
          }
          // The seed acts a tick before its shield would run out, so an intact shield can return.
          if (key === "E") ctx.memory["ivern:seedAt"] = ctx.tick + ticks(seedSeconds) - 1;
          if (key === "R") spawnPet(ctx.world, ctx.self, daisySpec(ctx.self), ctx.self.x + Math.sign(ctx.enemy.x - ctx.self.x) * 350);
        },
        onAttackHit(ctx) {
          // From the brush, or for 3 s after leaving it, a bolt.
          if (ctx.blocked || ctx.enemy.petId !== undefined) return;
          if (ctx.tick <= Number(ctx.memory["ivern:boltUntil"] ?? -1)) ctx.apply({ type: "damage", damageType: "magic", amount: bolt, label: w.name });
        },
        onTick(ctx) {
          const self = ctx.self;
          if (brushed(self, ctx.tick)) ctx.memory["ivern:boltUntil"] = ctx.tick + ticks(brushLinger);
          // The seed explodes on an enemy within 500; with no champion hit, the shield returns.
          const at = ctx.memory["ivern:seedAt"];
          if (at === undefined || ctx.tick < Number(at)) return;
          delete ctx.memory["ivern:seedAt"];
          const enemy = ctx.enemy;
          if (enemy.alive && Math.abs(enemy.x - self.x) - enemy.spec.base.radius <= seedRadius) {
            abilityHit(ctx.world, self, enemy, seedBlast, [{ type: "damage", damageType: "magic", amount: seedDamage, label: e.name }, { type: "cc", cc: "slow", strength: seedSlow, duration: seedSlowSeconds }]);
          } else if (self.statuses.some((s) => s.kind === "shield" && s.key === "E" && s.value > 0)) {
            applyEffect(ctx.world, self, self, { type: "shield", amount: seedShield, duration: seedSeconds }, { scale: 1 });
          }
        },
      },
      budget: {
        damage(self, target) {
          const d = derive(self);
          return { magic: evaluate(bolt, self, target) * d.attackSpeed, physical: (evaluate(daisyDamage, self, target) * daisyRate * daisySeconds) / rSpec.cooldown };
        },
      },
    };
  },
};

export default ivern;
