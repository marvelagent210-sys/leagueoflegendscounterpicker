/**
 * Gangplank: every number is read from the wiki's ability data at level 20 (see
 * engine/kits/context.ts). His Powder Kegs are pets (engine/sim/pets.ts) that count hits: he
 * sets one off with an attack or Parrrley once it is down to its last hit point, and its
 * explosion repeats that hit on everything around it, lighting the kegs connected to it.
 */
import type { KitModule } from "../../engine/kits/compile";
import { averageCritFactor } from "../../engine/rules/defense";
import { canCast, canStartAttackOnPet, chargesLeft } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, directionTo } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { areaOnPets, damagePet, destroyPet, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const KEG = "keg";

const gangplank: KitModule = {
  champion: "Gangplank",
  build(kit) {
    const innate = kit.ability("Trial by Fire");
    const q = kit.ability("Parrrley");
    const w = kit.ability("Remove Scurvy");
    const e = kit.ability("Powder Keg");
    const r = kit.ability("Cannon Barrage");
    const kegPet = kit.pet("Powder Keg");

    // Trial by Fire: every 15 s an attack burns for 273.5 (+ 100% bonus AD) true damage over 2.5 s, and he is 31.8% faster for 2 s.
    const fireEvery = innate.field("staticCooldown");
    const fireBurn = innate.levelValue("Periodically, Gangplank empowers his next basic attack to set the target on fire, dealing them");
    const fireText = "(+ 100% bonus AD) bonus true damage over 2.5 seconds";
    const fireSeconds = innate.quoted(fireText, 1);
    const fireHaste = innate.levelValue("If Gangplank successfully hits a target with Trial by Fire, he gains") / 100;
    const fireHasteFor = innate.quoted("bonus movement speed for 2 seconds", 0);
    innate.quote("Every time a Powder Keg explodes, the cooldown for Trial by Fire resets and Gangplank gains its bonus movement speed");
    innate.quote("Trial by Fire cannot be applied with Parrrley nor Powder Keg");
    innate.quote("Reapplying Trial by Fire before a previous application has run out will stack the full damage");
    innate.quote("If the attack is blocked, the effect is not applied, but Trial by Fire will go on cooldown");
    const burn: Formula = { base: fireBurn, ratios: { bonusAD: innate.quoted(fireText, 0) / 100 } };
    const fireTick = 0.5;
    kit.assume(`Trial by Fire burns in ticks every ${fireTick} s (the wiki and the game files give only the total and the ${fireSeconds} s).`);
    const fire: Effect = { type: "dot", damageType: "true", total: burn, duration: fireSeconds, interval: fireTick, label: innate.name, stacks: true };

    // Parrrley: 130 (+ 100% AD), a shot that crits and applies on-hit effects.
    const shot = q.formula("Physical Damage");
    const shotRange = q.field("targetRange");
    const shotSpeed = q.field("speed");
    q.quote("applies on-hit effects as a ranged attack");
    q.quote("This damage is affected by critical strike modifiers");

    // Remove Scurvy: a cleanse and 145 (+ 90% AP) (+ 13% missing health).
    const scurvyLow = 0.4;
    kit.assume(
      `Gangplank keeps Remove Scurvy to cleanse crowd control, or drinks it for the heal below ${scurvyLow * 100}% health; like any cleanse it works while he is disabled (the game files' canCastWhileDisabled).`,
    );

    // Powder Keg: 5 charges, one every 13 s, 0.5 s apart; 3 hit points, one lost every 0.5 s down to 1; 25 s.
    const kegCharges = e.number("Maximum charges");
    const kegRange = e.field("targetRange");
    const connect = e.field("effectRadius", "Connection radius");
    const blast = e.field("effectRadius", "Explosion radius");
    const kegSeconds = e.quoted("place a powder keg at the target location that lasts for 25 seconds", 0);
    const kegHp = kegPet.stat("hp");
    const kegCast = e.castTime();
    const decayEvery = e.levelValue("The keg starts with 3 health and loses 1 every");
    const chainDelay = e.quoted("explodes other nearby connected kegs with a 0.33-delay between explosions", 0);
    const kegSlow = e.fraction("Slow");
    const kegSlowFor = e.quoted("Enemies caught in an explosion are dealt the triggering attack's damage and slowed for 2 seconds", 0);
    const kegBonus = e.number("Bonus Champion Damage");
    const kegPen = e.quoted("the damage dealt ignores 40% of the target's armor", 0) / 100;
    e.quote("Each enemy can only be hit once per chain");
    e.quote("The triggering attack on the keg can critically strike, causing the explosion to deal the attack's critical damage");
    e.quote("The triggering attack's damage can include Parrrley base damage");
    kegPet.quote("1 from champion basic attacks and Parrrley");
    e.quote("until it is left with 1 health");
    kit.assume(`Kegs connect when within ${2 * connect} units of each other (their ${connect} connection radii overlap); an explosion catches the enemy whose hitbox is within ${blast}.`);
    kit.assume(
      `Gangplank sets a keg ${Math.round(blast - 30)} units in front of the enemy, inside the blast and out of a melee enemy's reach (ahead of an enemy walking away), where Parrrley can reach it; when it is down to 1 hit point he sets it off, first adding a connected keg on the enemy if it stepped out. He places none while fleeing.`,
    );

    // Cannon Barrage: 12 waves of 100 (+ 10% AP) within 580, in clusters of 3, 0.25 s apart, every 2 s; each slows 30% for 0.5 s.
    const waveHit = r.formula("Magic Damage Per Wave");
    const barrageRadius = r.field("effectRadius");
    const waveText = "calling down 12 waves of cannonballs in clusters of 3 every 2 seconds, each wave in a cluster hitting 0.25 seconds after the other";
    const waves = r.quoted(waveText, 0);
    const perCluster = r.quoted(waveText, 1);
    const clusterEvery = r.quoted(waveText, 2);
    const waveGap = r.quoted(waveText, 3);
    const waveSlowText = "slows them by 30% for 0.5 seconds";
    const waveSlow = r.quoted(waveSlowText, 0) / 100;
    const waveSlowFor = r.quoted(waveSlowText, 1);
    const firstWave = 0.5;
    kit.assume(`Cannon Barrage's first wave lands ${firstWave} s after the cast (the game files' CannonDelay); his ship has no upgrades.`);

    const kegSpec: PetSpec = {
      kind: KEG,
      name: kegPet.name,
      hp: kegHp,
      hitPoints: true,
      armor: 0,
      mr: 0,
      radius: kegPet.stat("radius"),
      moveSpeed: 0,
      duration: kegSeconds,
      // Worth defusing before anything else when it would catch its attacker.
      urgent: (pet, enemy) => Math.abs(enemy.x - pet.x) <= blast + enemy.spec.base.radius,
    };
    // Hidden: an explosion's hit, through spell shields.
    const kegAbility: AbilitySpec = {
      key: "KEG",
      name: "Powder Keg explosion",
      slot: "E",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "self" },
      onHit: [],
      flags: { spellShield: e.flag("spellShield") ?? true, projectile: false },
      usable: () => false,
    };

    const kegsOf = (world: World, self: Unit): Pet[] => world.pets.filter((p) => p.owner === self.side && p.spec.kind === KEG);
    const covers = (x: number, enemy: Unit) => Math.abs(enemy.x - x) <= blast + enemy.spec.base.radius;
    const linked = (a: Pet, b: Pet) => Math.abs(a.x - b.x) <= 2 * connect;
    /** The kegs a keg's explosion would reach (itself included), link by link. */
    const chainOf = (world: World, self: Unit, start: Pet): Pet[] => {
      const all = kegsOf(world, self);
      const found = [start];
      for (let i = 0; i < found.length; i++) {
        const from = found[i];
        for (const k of all) if (from && !found.includes(k) && linked(k, from)) found.push(k);
      }
      return found;
    };
    const ready = (keg: Pet) => keg.hp <= 1;
    /** What a triggering hit deals: an attack's damage, or Parrrley's, crits averaged. */
    const triggerDamage = (self: Unit, enemy: Unit, trigger: string) => {
      const d = derive(self);
      const crit = averageCritFactor(d.critChance, d.critDamage);
      return (trigger === "parrrley" ? evaluate(shot, self, enemy) : d.ad) * crit;
    };

    /** A keg explodes: the triggering hit and 155 more on the enemy within reach (once per chain), 40% of armor ignored, and an 80% slow. */
    const explode = (ctx: HookContext, x: number, trigger: string, chain: string) => {
      const { world, self, enemy } = ctx;
      const hit = triggerDamage(self, enemy, trigger);
      ctx.log("a Powder Keg explodes");
      ctx.buff("kegPen", "armorPen", kegPen, 1 / 30);
      if (covers(x, enemy) && ctx.memory.chainHit !== chain) {
        ctx.memory.chainHit = chain;
        abilityHit(world, self, enemy, kegAbility, [
          { type: "damage", damageType: "physical", amount: flat(hit + kegBonus), label: "Powder Keg" },
          { type: "cc", cc: "slow", duration: kegSlowFor, strength: kegSlow },
        ]);
      }
      areaOnPets(world, self, x - blast, x + blast, [{ type: "damage", damageType: "physical", amount: flat(hit), label: "Powder Keg" }]);
      ctx.buff("kegPen", "armorPen", 0, 1 / 30);
      // Trial by Fire: ready again, and the speed.
      ctx.memory.fireReady = ctx.tick;
      ctx.buff("fireHaste", "moveSpeedPercent", fireHaste, fireHasteFor);
    };

    /** A keg he destroyed goes off, and lights the kegs connected to it: each goes off 0.33 s later and lights its own. */
    const detonate = (ctx: HookContext, keg: Pet) => {
      const chain = String(keg.memory.chain ?? `${ctx.tick}:${keg.id}`);
      const trigger = String(keg.memory.trigger ?? ctx.memory.trigger ?? "attack");
      explode(ctx, keg.x, trigger, chain);
      for (const next of kegsOf(ctx.world, ctx.self)) {
        if (next.memory.litAt !== undefined || !linked(next, keg)) continue;
        next.memory.litAt = ctx.tick + ticks(chainDelay);
        next.memory.chain = chain;
        next.memory.trigger = trigger;
      }
    };

    /** Where a new keg goes: just inside the blast in front of the enemy, or ahead of it when it walks away. */
    const placeAt = (self: Unit, enemy: Unit) => {
      const lead = enemy.moved === -1 ? derive(enemy).moveSpeed * (kegCast + decayEvery * (kegHp - 1)) - blast / 2 : -(blast - 30);
      return enemy.x + directionTo(self, enemy) * lead;
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        delivery: { kind: "target", range: shotRange, missileSpeed: shotSpeed },
        onHit: [{ type: "damage", damageType: "physical", amount: shot, canCrit: true, label: q.name }],
        flags: { projectile: true, spellShield: q.flag("spellShield") ?? true, parry: q.flag("parry") ?? true, appliesOnHit: true },
        // Kept for the keg once one is arming near the enemy.
        usable: (unit, world) => !kegsOf(world, unit).some((k) => covers(k.x, world.units[unit.side === 0 ? 1 : 0])),
      },
      // Parrrley at one of his kegs: only his keg plan below fires it.
      {
        key: "QK",
        name: `${q.name} (at a keg)`,
        slot: "Q",
        cooldown: q.cooldown(),
        cooldownKey: "Q",
        cost: q.cost(),
        castTime: q.castTime(),
        delivery: { kind: "self" },
        usable: (unit, world) => kegsOf(world, unit).some((k) => k.id === Number(unit.memory.shotKeg) && Math.abs(k.x - unit.x) <= shotRange),
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "self" },
        onSelf: [{ type: "cleanse" }, { type: "heal", amount: w.formula("Heal") }],
        flags: { usableWhileDisabled: true },
      },
      // Placing a keg: only his keg plan below does it.
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.field("staticCooldown"),
        castTime: kegCast,
        charges: { max: kegCharges, recharge: e.field("recharge") },
        delivery: { kind: "self" },
        usable: (unit) => unit.memory.placeX !== undefined,
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        // The last cluster's waves, and one gap's margin so the last lands inside the field's time.
        delivery: {
          kind: "field",
          range: 30000,
          radius: barrageRadius,
          duration: clusterEvery * (waves / perCluster - 1) + waveGap * perCluster,
          interval: clusterEvery,
          delay: firstWave,
          burst: { count: perCluster, gap: waveGap },
        },
        onHit: [
          { type: "damage", damageType: "magic", amount: waveHit, label: r.name },
          { type: "cc", cc: "slow", duration: waveSlowFor, strength: waveSlow },
        ],
        flags: { spellShield: r.flag("spellShield") ?? true },
      },
      kegAbility,
    ];

    const spec = (self: Unit, key: string) => self.spec.abilities.find((a) => a.key === key) as AbilitySpec;
    /** Casts a keg-plan ability if it can go now, with what its cast needs in memory. */
    const tryCast = (world: World, self: Unit, key: string, memo: string, value: number) => {
      self.memory[memo] = value;
      if (canCast(world, self, spec(self, key))) return { kind: "cast" as const, ability: key };
      delete self.memory[memo];
      return undefined;
    };

    // The keg plan first: set off a ready keg whose chain reaches the enemy, or add a connected keg on the enemy, or place one; otherwise the usual.
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (self.action || !enemy.alive) return defaultBehavior(view);
      // Whatever a keg-plan cast left in memory went with it.
      delete self.memory.placeX;
      delete self.memory.shotKeg;
      // Remove Scurvy for its heal when low (its cleanse is the default behavior's).
      if (self.hp < scurvyLow * derive(self).maxHp && view.distance <= 600 && canCast(world, self, spec(self, "W"))) return { kind: "cast", ability: "W" };
      if (mode === "flee" || mode === "idle") return defaultBehavior(view);
      const kegs = kegsOf(world, self);
      const charges = chargesLeft(world, self, spec(self, "E"));
      for (const keg of kegs.filter(ready)) {
        const hittable = canStartAttackOnPet(world, self, keg);
        const shootable = Math.abs(keg.x - self.x) <= shotRange;
        if (chainOf(world, self, keg).some((k) => covers(k.x, enemy))) {
          if (hittable) return { kind: "attack", pet: keg.id };
          const shoot = shootable ? tryCast(world, self, "QK", "shotKeg", keg.id) : undefined;
          if (shoot) return shoot;
        } else if ((hittable || shootable) && charges > 0 && Math.abs(enemy.x - keg.x) <= 2 * connect && Math.abs(enemy.x - self.x) <= kegRange) {
          // The enemy stepped out: a keg on it, connected to this one.
          const place = tryCast(world, self, "E", "placeX", enemy.x);
          if (place) return place;
        }
      }
      if (charges > 0 && !kegs.some((k) => covers(k.x, enemy))) {
        // Only where Parrrley can set it off from here.
        const x = placeAt(self, enemy);
        if ((covers(x, enemy) || enemy.moved === -1) && Math.abs(x - self.x) <= shotRange) {
          const place = tryCast(world, self, "E", "placeX", x);
          if (place) return place;
        }
      }
      return defaultBehavior(view);
    };

    return {
      abilities,
      behavior,
      budget: {
        // A keg set off by Parrrley about every 6 s, and Trial by Fire as often.
        damage: (self, target) => ({ physical: (evaluate(shot, self, target) + kegBonus) / 6, true: evaluate(burn, self, target) / 6 }),
      },
      hooks: {
        onTick(ctx) {
          const { world, self, tick } = ctx;
          for (const keg of kegsOf(world, self)) {
            // Kegs lose a hit point every 0.5 s until 1 is left (the ability's page; its pet infobox says maximum health).
            const steps = Math.floor((tick - Number(keg.memory.placed ?? tick)) / ticks(decayEvery));
            if (steps > Number(keg.memory.decayed ?? 0)) {
              keg.memory.decayed = steps;
              if (keg.hp > 1) keg.hp -= 1;
            }
            // A lit keg goes off.
            if (keg.memory.litAt !== undefined && tick >= Number(keg.memory.litAt)) destroyPet(world, keg);
          }
          // Parrrley reaching its keg.
          if (ctx.memory.shotAt !== undefined && tick >= Number(ctx.memory.shotAt)) {
            const keg = world.pets.find((p) => p.id === Number(ctx.memory.shotTarget));
            delete ctx.memory.shotAt;
            if (keg) {
              ctx.memory.trigger = "parrrley";
              damagePet(world, self, keg, 1, "physical", true);
              ctx.memory.trigger = "attack";
            }
          }
        },
        onPetDeath(ctx) {
          // His own hit (or a lit fuse) sets a keg off; the enemy's defuses it.
          if (ctx.pet.spec.kind !== KEG || !ctx.byOwner) return;
          detonate(ctx, ctx.pet);
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          ctx.memory.fireSwing = action?.kind === "windup" && action.pet === undefined && ctx.tick >= Number(ctx.memory.fireReady ?? 0);
        },
        onAttackHit(ctx) {
          if (!ctx.memory.fireSwing) return;
          ctx.memory.fireSwing = false;
          ctx.memory.fireReady = ctx.tick + ticks(fireEvery);
          // Blocked (Spirit's Refuge): on cooldown all the same, but no burn and no speed.
          if (hasState(ctx.enemy, "blockAttacks")) return;
          ctx.apply(fire);
          ctx.buff("fireHaste", "moveSpeedPercent", fireHaste, fireHasteFor);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "E") {
            const keg = spawnPet(ctx.world, ctx.self, kegSpec, Number(ctx.memory.placeX), { side: ctx.self.side, text: `places a ${kegPet.name}` });
            keg.memory.placed = ctx.tick;
            delete ctx.memory.placeX;
          }
          if (key === "QK") {
            const keg = ctx.world.pets.find((p) => p.id === Number(ctx.memory.shotKeg));
            delete ctx.memory.shotKeg;
            if (keg) {
              ctx.memory.shotTarget = keg.id;
              ctx.memory.shotAt = ctx.tick + Math.max(1, ticks(Math.abs(keg.x - ctx.self.x) / shotSpeed));
            }
          }
        },
      },
    };
  },
};

export default gangplank;
