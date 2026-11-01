/**
 * Yorick: every number is read from the wiki's ability data at level 20 (see
 * engine/kits/context.ts). Graves rise as Mist Walkers (pets, engine/sim/pets.ts) when Yorick
 * casts Awakening or curses the enemy with Mourning Mist; Eulogy of the Isles brings the
 * Maiden of the Mist with Walkers of her own.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, empowerStatus } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo, edgeDistance } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { destroyPet, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import { flat, maxHp, ticks } from "./util";

const WALKER = "walker";
const MAIDEN = "maiden";

const yorick: KitModule = {
  champion: "Yorick",
  options: {
    graves: { label: "Graves near Yorick when a fight starts (0 to 4)", default: 3 },
  },
  build(kit, options) {
    const innate = kit.ability("Shepherd of Souls");
    const q = kit.ability("Last Rites");
    const awakening = kit.ability("Awakening");
    const w = kit.ability("Dark Procession");
    const e = kit.ability("Mourning Mist");
    const r = kit.ability("Eulogy of the Isles");
    const walkerPet = kit.pet("Mist Walker");
    const maidenPet = kit.pet("Maiden of the Mist");

    // Shepherd of Souls: up to 4 graves, raised within 1000 into Mist Walkers 1 s later; up to 4 Walkers each for Yorick and the Maiden.
    const graveCap = innate.quoted("Up to 4 graves can exist at once", 0);
    const graveRange = innate.field("effectRadius", "Grave summon range");
    const raiseDelay = innate.quoted("raise 1 Mist Walker from each grave after a 1-second delay", 1);
    const walkerCap = innate.quoted("Up to 4 Mist Walkers can be active at once near Yorick or near The Maiden", 0);
    innate.quote("with the nearest one always being replaced by the newest upon raising one over the limit");
    innate.quote("Whenever Yorick uses Last Rites to score the killing blow on any enemy or damage an enemy champion or large monster, he raises a grave at their location");
    // At level 20 a grave rises for every 2nd enemy that dies near him: 3 from a wave of 6 minions.
    const graveBands = innate.seriesIn("Additionally, a grave is passively raised for every");
    const everyNth = graveBands.kind === "variable" ? Number.parseInt(String(graveBands.values.at(-1)), 10) : Number.NaN;
    if (!(everyNth > 0)) throw new Error(`Yorick: no grave rate at level 20 in ${JSON.stringify(graveBands)}`);
    const startGraves = Math.max(0, Math.min(graveCap, Math.round(options.graves ?? Math.floor(6 / everyNth))));
    kit.assume(
      `With the lane set up, ${startGraves} grave${startGraves === 1 ? "" : "s"} lie by Yorick when the fight starts: at level 20 one rises for every ${everyNth === 2 ? "2nd" : `${everyNth}th`} enemy that dies near him, 3 from a wave of 6 minions.`,
    );

    // Mist Walkers: 331.4 (+ 15% of Yorick's bonus health) health, 113.3 (+ 20% of his bonus AD) a hit at 0.956 attacks a second.
    const walkerHp = walkerPet.stat("hp");
    const walkerHpShare = walkerPet.quoted("(+ 15% of Yorick's bonus health)", 0) / 100;
    const walkerHit: Formula = { base: walkerPet.stat("damage"), ratios: { bonusAD: walkerPet.quoted("(+ 20% of Yorick's bonus AD)", 0) / 100 } };
    const walkerSpeed = walkerPet.stat("attackspeed");
    const walkerHaste = walkerPet.quoted("While Mist Walkers are within 1600 units of Yorick, they gain 60 bonus movement speed", 1);
    const walkerLeash = walkerPet.quoted("While Mist Walkers are within 1600 units of Yorick, they gain 60 bonus movement speed", 0);
    const meleeTaken = walkerPet.quoted("200% damage from melee champion basic attacks", 0) / 100;
    const areaTaken = walkerPet.quoted("66% – 40% (based on level) damage from area of effect abilities", 1) / 100;
    const walker = {
      armor: walkerPet.stat("armor"),
      mr: walkerPet.stat("magicresist"),
      radius: walkerPet.stat("radius"),
      moveSpeed: walkerPet.stat("movespeed"),
      range: walkerPet.stat("range"),
    };
    walkerPet.quote("Mist Walkers' attacks are mitigated by dodge, block, and blind");
    walkerPet.quote("have the ability to leap to marked enemy champions and large monsters, dealing 100% of their AD upon arrival");
    kit.assume(
      `Mist Walkers keep within ${walkerLeash} units of Yorick (where they are hasted) and fight the enemy. They take ${Math.round(areaTaken * 100)}% from area abilities (the wiki's level 18 value). The enemy attacks one before Yorick when a single basic attack kills it.`,
    );

    // The Maiden of the Mist: 3700 (+ 60% of Yorick's bonus health), 100 armor and magic resistance, 100 (+ 30% bonus AD) magic damage a second from 600 units.
    const maidenHp = maidenPet.stat("hp");
    const maidenHpShare = maidenPet.quoted("(+ 60% of Yorick's bonus health)", 0) / 100;
    const maidenHit: Formula = { base: maidenPet.stat("damage"), ratios: { bonusAD: maidenPet.quoted("(+ 30% of Yorick's bonus AD)", 0) / 100 } };
    const maidenRegen = maidenPet.quoted("The Maiden of the Mist regenerates 2.5 health per second", 0);
    const maidenLeash = maidenPet.quoted("leashing back to him if he moves 1200 units away from her", 0);
    const maidenHaste = maidenPet.quoted("While the Maiden of the Mist is within 2000 units of Yorick, she gains 60 bonus movement speed", 1);
    const touch = maidenPet.quoted("bonus magic damage equal to 2 / 2.5 / 3% of the target's maximum health", 2) / 100;
    const maiden = {
      armor: maidenPet.stat("armor"),
      mr: maidenPet.stat("magicresist"),
      radius: maidenPet.stat("radius"),
      moveSpeed: maidenPet.stat("movespeed"),
      range: maidenPet.stat("range"),
      attackSpeed: maidenPet.stat("attackspeed"),
    };
    maidenPet.quote("Yorick's next basic attack or E hit against the marked target consumes the mark");
    kit.assume("The Maiden's attacks are stopped by dodges, blinds and blocks alike (the wiki: not blocks); her mark lasts until Yorick's next attack or Mourning Mist uses it.");

    // Last Rites: the next attack within 5 s reaches 50 farther for 110 (+ 50% AD) more and heals 78 (+ 10% of his missing health).
    const ritesWindow = q.quoted("empowers his next basic attack within 5 seconds", 0);
    const ritesRange = q.quoted("gain 50 bonus range", 0);
    const ritesHit: Effect = { type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage"), label: q.name };
    const ritesHeal: Effect = { type: "caster", effects: [{ type: "heal", amount: q.formula("Heal") }] };
    const awakenGraves = q.quoted("While there are at least 3 graves nearby and Last Rites is active or on cooldown, Yorick can cast Awakening", 0);
    awakening.quote("Yorick exhumes a Mist Walker under his command from each nearby grave");

    // Dark Procession: a ring 225 around the spot that rises 0.75 s later; walls 125 to 325 from its center for 4 s.
    const ringRange = w.field("targetRange");
    const ringDelay = w.quoted("arises after a 0.75-second delay", 0);
    const knockSeconds = w.quoted("knocking aside enemies hit by the walls over 0.25 seconds", 0);
    const pullWithin = w.quoted("Within 210-units, they are pulled inside; otherwise they are pushed away", 0);
    const ringSeconds = w.quoted("The ring remains for 4 seconds as impassible terrain against enemies", 0);
    const spiritRing = w.field("effectRadius", "Spirits spawn radius");
    const wallInner = w.quoted("Impassable perimeter: 125 - 325", 0);
    const wallOuter = w.quoted("Impassable perimeter: 125 - 325", 1);
    const wallHealth = w.number("Wall Health");
    kit.assume(`The enemy doesn't break Dark Procession's ${wallHealth} hit points of wall: its four attacks would take most of the ring's ${ringSeconds} s.`);

    // Mourning Mist: 8% (+ 3% per 100 AP) of maximum health, a 30% slow for 1.5 s, and the Curse for 4 s: 25% less armor, 30% more speed toward it.
    const mistRange = e.field("targetRange");
    const mistSpeed = e.field("speed");
    const mistRadius = 225;
    const mistFlight = mistRange / mistSpeed;
    kit.assume(
      `Mourning Mist splashes ${mistRadius} units around where it lands (the game files' radius; the wiki gives none), ${mistFlight.toFixed(3)} s after its cast (its flight to full range).`,
    );
    const curseText = "Enemy champions and monsters hit are slowed by 30% for 1.5 seconds and marked as Cursed for 4 seconds";
    const mistSlow = e.quoted(curseText, 0) / 100;
    const mistSlowFor = e.quoted(curseText, 1);
    const curseSeconds = e.quoted(curseText, 2);
    const curseShred = e.shareOf("Armor Reduction");
    const curseHaste = e.fraction("Bonus Movement Speed");
    const curseReach = e.field("effectRadius");
    e.quote("continually raises a Mist Walker from each nearby grave, up to a maximum of 4");
    e.quote("Mist Walkers will leap to nearby Cursed enemy champions and large monsters once, attacking them upon arrival");
    kit.assume(`Cursed, the enemy draws every Mist Walker within ${curseReach} units into a leap at once, landing beside it; Yorick and his summons are faster for the whole Curse, whichever way they move.`);

    // Eulogy of the Isles: the Maiden and 4 Mist Walkers, alive 1 s after the cast, up to 600 units away.
    const summonRange = r.field("targetRange");
    const summonDelay = r.tipped("over 1.5 seconds", 0);
    const maidenWalkers = r.number("Mist Walkers");
    r.quote("which remain on the battlefield until she or Yorick dies");
    kit.assume(`The Maiden rises ${summonRange} units toward the enemy at most, her ${maidenWalkers} Mist Walkers with her; the recast that sets her free is left out.`);

    const walkerSpec = (owner: Unit, cursed: boolean): PetSpec => ({
      kind: WALKER,
      name: walkerPet.name,
      hp: walkerHp + walkerHpShare * Math.max(0, derive(owner).maxHp - owner.spec.base.hp),
      armor: walker.armor,
      mr: walker.mr,
      meleeAttackTaken: meleeTaken,
      areaTaken,
      radius: walker.radius,
      moveSpeed: (walker.moveSpeed + walkerHaste) * (cursed ? 1 + curseHaste : 1),
      leash: walkerLeash,
      duration: Number.POSITIVE_INFINITY,
      // Worth an attack before Yorick when one kills it (melee attacks deal double).
      urgent: (pet, enemy) => pet.hp <= derive(enemy).ad * (enemy.spec.attack.ranged ? 1 : meleeTaken),
      attack: { range: walker.range, interval: 1 / walkerSpeed, attackLike: true, effects: [{ type: "damage", damageType: "physical", amount: walkerHit, label: walkerPet.name }] },
    });
    const maidenSpec = (owner: Unit, cursed: boolean): PetSpec => ({
      kind: MAIDEN,
      name: maidenPet.name,
      hp: maidenHp + maidenHpShare * Math.max(0, derive(owner).maxHp - owner.spec.base.hp),
      armor: maiden.armor,
      mr: maiden.mr,
      radius: maiden.radius,
      moveSpeed: (maiden.moveSpeed + maidenHaste) * (cursed ? 1 + curseHaste : 1),
      leash: maidenLeash,
      duration: Number.POSITIVE_INFINITY,
      attack: {
        range: maiden.range,
        interval: 1 / maiden.attackSpeed,
        attackLike: true,
        effects: [
          { type: "damage", damageType: "magic", amount: maidenHit, label: maidenPet.name },
          { type: "mark", key: "maidenTouch", duration: 3600 },
        ],
      },
    });

    // Graves and Walkers waiting to rise, in kit memory: "x" lists and "tick:x" lists.
    const graves = (ctx: HookContext) => String(ctx.memory.graves ?? "").split(",").filter(Boolean).map(Number);
    const setGraves = (ctx: HookContext, list: number[]) => {
      ctx.memory.graves = list.join(",");
    };
    const addGrave = (ctx: HookContext, x: number) => {
      const list = [...graves(ctx), x];
      // Over the limit, the farthest one goes.
      while (list.length > graveCap) {
        let far = 0;
        list.forEach((g, i) => {
          if (Math.abs(g - ctx.self.x) > Math.abs((list[far] ?? 0) - ctx.self.x)) far = i;
        });
        list.splice(far, 1);
      }
      setGraves(ctx, list);
    };
    /** Graves within reach rise as Mist Walkers 1 s from now. */
    const raiseGraves = (ctx: HookContext) => {
      const near = graves(ctx).filter((g) => Math.abs(g - ctx.self.x) <= graveRange);
      if (near.length === 0) return;
      setGraves(
        ctx,
        graves(ctx).filter((g) => Math.abs(g - ctx.self.x) > graveRange),
      );
      const due = ctx.tick + ticks(raiseDelay);
      ctx.memory.rising = [String(ctx.memory.rising ?? ""), ...near.map((g) => `${due}:${g}`)].filter(Boolean).join(";");
      ctx.log(`raises ${near.length} grave${near.length === 1 ? "" : "s"}`);
    };
    const walkersOf = (world: World, self: Unit, maiden: boolean): Pet[] => world.pets.filter((p) => p.owner === self.side && p.spec.kind === WALKER && Boolean(p.memory.maiden) === maiden);
    const cursed = (ctx: HookContext) => ctx.tick < Number(ctx.memory.cursedUntil ?? -1) && ctx.enemy.alive;
    const spawnWalker = (ctx: HookContext, x: number, maiden: boolean) => {
      const own = walkersOf(ctx.world, ctx.self, maiden);
      if (own.length >= walkerCap) {
        // Over the limit, the nearest one gives way to the newest.
        const nearest = own.reduce((best, p) => (Math.abs(p.x - x) < Math.abs(best.x - x) ? p : best));
        destroyPet(ctx.world, nearest);
      }
      const pet = spawnPet(ctx.world, ctx.self, walkerSpec(ctx.self, cursed(ctx)), x, { side: ctx.self.side, text: `raises a ${walkerPet.name}` });
      pet.memory.maiden = maiden;
      pet.memory.hasted = cursed(ctx);
    };
    const consumeTouch = (ctx: HookContext) => {
      const mark = ctx.enemy.statuses.find((s) => s.kind === "mark" && s.key === "maidenTouch" && s.source === ctx.self.side);
      if (!mark) return;
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => s !== mark);
      ctx.apply({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: touch } }, label: "Touch of the Maiden" });
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        cooldownAfter: "empower",
        delivery: { kind: "self" },
        onSelf: [{ type: "empower", attacks: 1, window: ritesWindow, bonusRange: ritesRange, uncancellable: true, resetAttack: true, onHit: [ritesHit, ritesHeal] }],
        roles: ["buff"],
      },
      {
        key: "Q2",
        name: awakening.name,
        slot: "Q",
        cooldown: 0,
        castTime: awakening.castTime(),
        delivery: { kind: "self" },
        roles: ["buff"],
        // At least 3 graves within reach, with Last Rites up or on cooldown.
        usable: (unit, world) => {
          const list = String(unit.memory.graves ?? "").split(",").filter(Boolean).map(Number);
          const ready = (unit.cooldownReady.Q ?? 0) <= world.tick && empowerStatus(unit)?.key !== "Q";
          return !ready && list.filter((g) => Math.abs(g - unit.x) <= graveRange).length >= awakenGraves;
        },
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "circle", range: ringRange, radius: spiritRing, delay: ringDelay },
        // Caged: the ring is in the hooks.
        onHit: [{ type: "mark", key: "caged", duration: ringSeconds }],
        roles: ["cc"],
        flags: { spellShield: w.flag("spellShield") ?? false, projectile: false },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "circle", range: mistRange, radius: mistRadius, delay: mistFlight },
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage"), label: e.name },
          { type: "cc", cc: "slow", duration: mistSlowFor, strength: mistSlow },
          { type: "stat", stat: "armorReductionPercent", amount: flat(curseShred), duration: curseSeconds },
          { type: "mark", key: "cursed", duration: curseSeconds },
        ],
        flags: { projectile: e.flag("projectile") ?? true, spellShield: e.flag("spellShield") ?? true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        delivery: { kind: "self" },
        roles: ["buff"],
        usable: (unit, world) => !world.pets.some((p) => p.owner === unit.side && p.spec.kind === MAIDEN),
      },
    ];

    // Awakening as soon as three graves can rise; Eulogy of the Isles once the enemy is within its reach.
    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      if (!self.action && enemy.alive && mode !== "flee" && mode !== "idle") {
        const awaken = self.spec.abilities.find((a) => a.key === "Q2");
        if (awaken && canCast(world, self, awaken) && edgeDistance(self, enemy) <= graveRange + walkerLeash) return { kind: "cast", ability: "Q2" };
        const eulogy = self.spec.abilities.find((a) => a.key === "R");
        if (mode === "fight" && eulogy && canCast(world, self, eulogy) && edgeDistance(self, enemy) <= summonRange) return { kind: "cast", ability: "R" };
      }
      return defaultBehavior(view);
    };
    kit.assume("Yorick casts Awakening as soon as three graves can rise, and Eulogy of the Isles in a fight once the enemy is within its 600 units.");

    return {
      abilities,
      behavior,
      budget: {
        // About three Mist Walkers fighting (seven at first, fewer as they fall), the Maiden half the time, and her mark used every other second.
        damage: (self, target) => ({ physical: 3 * walkerSpeed * evaluate(walkerHit, self, target), magic: 0.5 * evaluate(maidenHit, self, target) + 0.5 * touch * maxHp(target) }),
        // Last Rites about every 5 s, at a third of his health missing.
        healing: (self) => (78 + 0.1 * 0.33 * maxHp(self)) / 5,
      },
      hooks: {
        onStart(ctx) {
          // Graves from laning, when the lane was set up in advance.
          if (ctx.world.settings.environment.laneSetup) setGraves(ctx, Array.from({ length: startGraves }, () => ctx.self.x));
        },
        onTick(ctx) {
          const { world, self, enemy, tick } = ctx;
          // Walkers due to rise.
          const pending = String(ctx.memory.rising ?? "").split(";").filter(Boolean);
          if (pending.length > 0) {
            const due = pending.filter((p) => Number(p.split(":")[0]) <= tick);
            ctx.memory.rising = pending.filter((p) => Number(p.split(":")[0]) > tick).join(";");
            for (const entry of due) spawnWalker(ctx, Number(entry.split(":")[1]), false);
          }
          // The Maiden and her Walkers, 1 s after the cast.
          if (ctx.memory.maidenAt !== undefined && tick >= Number(ctx.memory.maidenAt)) {
            const x = Number(ctx.memory.maidenX);
            delete ctx.memory.maidenAt;
            const maiden = spawnPet(world, self, maidenSpec(self, cursed(ctx)), x, { side: self.side, text: `summons the ${maidenPet.name}` });
            maiden.memory.hasted = cursed(ctx);
            for (let i = 0; i < maidenWalkers; i++) spawnWalker(ctx, x, true);
          }
          const curse = cursed(ctx);
          // Cursed: graves keep rising, and Walkers leap to the enemy once.
          if (curse) {
            raiseGraves(ctx);
            for (const pet of world.pets) {
              if (pet.owner !== self.side || pet.spec.kind !== WALKER || pet.memory.leapt || Math.abs(pet.x - enemy.x) > curseReach
                  || pet.carriedBy !== undefined || pet.statuses?.some(status => status.key === "stasis" && (status.kind === "state" || status.kind === "cc"))) continue;
              pet.memory.leapt = true;
              pet.x = enemy.x - directionTo(self, enemy) * (enemy.spec.base.radius + pet.spec.radius);
              pet.nextAttackTick = tick;
            }
          }
          // Faster while the enemy is Cursed; the Maiden's regeneration, up to her maximum.
          for (const pet of world.pets) {
            if (pet.owner !== self.side || (pet.spec.kind !== WALKER && pet.spec.kind !== MAIDEN)) continue;
            if (pet.spec.kind === MAIDEN) pet.hp = Math.min(pet.spec.hp, pet.hp + maidenRegen / 30);
            if (Boolean(pet.memory.hasted) !== curse) {
              pet.memory.hasted = curse;
              const fresh = pet.spec.kind === MAIDEN ? maidenSpec(self, curse) : walkerSpec(self, curse);
              pet.spec = { ...fresh, hp: pet.spec.hp };
            }
          }
          // Dark Procession's ring rises: walls on both sides of its center, against the enemy only.
          if (ctx.memory.ringAt !== undefined && tick >= Number(ctx.memory.ringAt)) {
            const c = Number(ctx.memory.ringX);
            delete ctx.memory.ringAt;
            const end = tick + ticks(ringSeconds);
            world.terrain.push({ id: world.nextId++, owner: self.side, from: c - wallOuter, to: c - wallInner, endTick: end, enemyOnly: true });
            world.terrain.push({ id: world.nextId++, owner: self.side, from: c + wallInner, to: c + wallOuter, endTick: end, enemyOnly: true });
            ctx.log("raises Dark Procession's ring");
          }
        },
        onAttackHit(ctx) {
          if (ctx.memory.ritesSwing) {
            ctx.memory.ritesSwing = false;
            addGrave(ctx, ctx.enemy.x);
          }
          consumeTouch(ctx);
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          ctx.memory.ritesSwing = action?.kind === "windup" && action.pet === undefined && (action.empowered ?? []).includes("Q");
        },
        onPetDeath(ctx) {
          // Her Walkers go with the Maiden.
          if (ctx.pet.spec.kind !== MAIDEN) return;
          for (const pet of walkersOf(ctx.world, ctx.self, true)) destroyPet(ctx.world, pet);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q2") raiseGraves(ctx);
          if (key === "W") {
            // The ring goes where the circle lands: on the enemy, or as far toward it as the range allows.
            const d = Math.abs(ctx.enemy.x - ctx.self.x);
            ctx.memory.ringX = ctx.enemy.x - directionTo(ctx.self, ctx.enemy) * Math.max(0, d - ringRange);
            ctx.memory.ringAt = ctx.tick + ticks(ringDelay);
          }
          if (key === "R") {
            const d = Math.abs(ctx.enemy.x - ctx.self.x);
            ctx.memory.maidenX = ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(summonRange, d);
            ctx.memory.maidenAt = ctx.tick + ticks(summonDelay);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "E") {
            ctx.memory.cursedUntil = ctx.tick + ticks(curseSeconds);
            // Yorick's speed toward the Cursed enemy.
            ctx.buff("curseHaste", "moveSpeedPercent", curseHaste, curseSeconds);
            consumeTouch(ctx);
          }
          if (key === "W") {
            // Hit by the walls: pulled inside within 210 of the center, else pushed out; airborne for 0.25 s either way.
            const c = Number(ctx.memory.ringX);
            const offset = ctx.enemy.x - c;
            const side = offset >= 0 ? 1 : -1;
            const path = ctx.enemy.spec.base.pathingRadius;
            const inside = wallInner - path;
            if (Math.abs(offset) <= inside) return;
            ctx.enemy.x = Math.abs(offset) <= pullWithin ? c + side * inside : c + side * (wallOuter + path);
            applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "cc", cc: "airborne", duration: knockSeconds }, { scale: 1 });
          }
        },
      },
    };
  },
};

export default yorick;
