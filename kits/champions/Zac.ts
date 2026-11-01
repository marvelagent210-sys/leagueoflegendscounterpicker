/**
 * Zac (patch 26.20): Goo chunks heal him when he picks them up, Cell Division splits him into
 * four bloblets that must all die to finish him, Stretching Strikes strikes again with his next
 * attack, Elastic Slingshot charges a leap, and Let's Bounce! bounces four times.
 */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES, type CCType } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, addStatus, beginResurrection, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petsOf, spawnPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, PetSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { seriesAt, ticks } from "./util";

const EPS = 1e-6;
const BLOBLET = "bloblet";

const zac: KitModule = {
  champion: "Zac",
  build(kit) {
    const p = kit.ability("Cell Division");
    const q = kit.ability("Stretching Strikes");
    const w = kit.ability("Unstable Matter");
    const e = kit.ability("Elastic Slingshot");
    const r = kit.ability("Let's Bounce!");
    const bloblet = kit.pet("Bloblet");

    const healthCost = (ability: typeof q): Formula => {
      ability.textField("costType");
      return { base: 0, ratios: { currentHP: ability.cost() / 100 } };
    };

    // Goo: a chunk per ability that hits, landing between Zac and the enemy; Zac heals 8.5% of his maximum health picking one up, the enemy destroys it.
    const chunkSeconds = p.quoted("he sheds a number of chunks of himself to a nearby location, landing towards nearby visible enemy champions and lasting for 6 seconds", 0);
    const chunkReach = p.quoted("Both Zac and enemy champions can interact with a chunk by being within 50 units of it", 0);
    const chunkHeal = p.levelValue("Zac will consume it to heal for 4 – 8 (based on level)% of his maximum health", 0) / 100;
    p.quote("Cannot be interacted with for the first 0.25 seconds (except during Let's Bounce!)");
    const chunkDelay = p.quoted("Cannot be interacted with for the first 0.25 seconds", 0);
    const contestRange = p.quoted("roughly equidistant from Zac and the nearest visible enemy champion within 1000 range of him (dropping slightly in Zac's favor)", 0);
    const chunkShare = 0.45;
    kit.assume(`Goo chunks land ${chunkShare * 100}% of the way from Zac to an enemy within ${contestRange} ("slightly in Zac's favor"), at once and next to Zac without one. Whoever is within ${chunkReach} units of a chunk first takes it, Zac when both are; it can't be taken for its first ${chunkDelay} s.`);

    // Cell Division: once per 300 s, fatal damage puts Zac in resurrection for 4 s at half health, split into four bloblets.
    const cellCooldown = p.field("staticCooldown");
    const cellSeconds = seriesAt(p.seriesIn("Periodically, upon taking fatal damage, Zac enters resurrection for"), 20, false);
    const cellHealth = p.quoted("instantly restoring 50% of his maximum health and becoming untargetable and unable to act for the duration", 0) / 100;
    const blobletWait = p.quoted("After 1.5 seconds of the bloblets being untargetable, they start moving toward Zac's location over the remaining duration", 0);
    const reviveFloor = p.quoted("After the duration, Zac is revived with 10 – 50% maximum health", 0) / 100;
    p.quote("Any damage the bloblets receive, excluding damage dealt in excess of each bloblet's total maximum health, is also echoed to Zac as true damage.");
    p.quote("While in resurrection, Zac cannot take damage from sources other than the echoed damage from his bloblets.");
    p.quote("Zac will be executed once all bloblets are killed.");
    const splitRange = p.field("range");
    const blobletHealth = bloblet.quoted("12% of Zac's maximum health", 0) / 100;
    const blobletArmor = bloblet.quoted("50% of Zac's armor", 0) / 100;
    const blobletMR = bloblet.quoted("50% of Zac's magic resistance", 0) / 100;
    const blobletArea = 1 - bloblet.quoted("33%", 0) / 100;
    bloblet.quote("Immune to crowd control (except stasis, still able to move)");
    const blobletRadius = bloblet.stat("radius");
    const splitAt = splitRange * Math.SQRT1_2;
    kit.assume(`Cell Division's four bloblets split ${splitRange} units diagonally, ${Math.round(splitAt)} along the duel's line: two on each side of Zac. They return at an even speed. Zac revives with his remaining health, at least ${reviveFloor * 100}%.`);

    // Stretching Strikes: an 800 arm that tethers the first enemy for 2 s; Zac's next attack strikes again.
    // "(+ 3% of Zac's bonus health)" is a stat the parser leaves as text.
    const strikeAP = q.formulaPart("Magic Damage", ["AP"]);
    const strike: Formula = { base: strikeAP.base, ratios: { ...strikeAP.ratios, bonusHP: q.quoted("Magic Damage: 60 / 90 / 120 / 150 / 180 (+ 30% AP) (+ 3% of Zac's bonus health)", 6) / 100 } };
    const strikeSlow: Effect = { type: "cc", cc: "slow", strength: q.quoted("slowing them by 40% for 0.5 seconds", 0) / 100, duration: q.quoted("slowing them by 40% for 0.5 seconds", 1) };
    const tether = q.quoted("forming a tether between Zac and the target for 2 seconds, during which they are revealed", 0);
    const tetherRange = q.field("tetherRadius");
    const secondWords = "empowering it to have a 0.25-second cast time and gain 25 bonus attack range";
    const secondCast = q.quoted(secondWords, 0);
    const secondRange = q.quoted(secondWords, 1);
    q.quote("This attack triggers on-attack effects, but cannot critically strike nor apply on-hit effects.");
    q.quote("If both Stretching Strikes affect the same target, the target will be dealt the damage and applied the slow for both hits.");
    q.quote("Both Stretching Strikes (the cast and the empowered attack) reset Zac's basic attack timer. Zac is unable to move or attack while his left arm is in flight.");
    q.quote("The first Stretching Strike will have its damage, slow, and tether application all blocked.");
    const armRange = q.field("targetRange", "Initial stretch missile range");
    const armSpeed = q.field("speed");

    // Unstable Matter: 80 (+ 8% (+ 3% per 100 AP) of maximum health) within 350; a chunk takes 1 s off its cooldown.
    const matter = w.formula("Magic Damage");
    const matterRefund = w.quoted("Unstable Matter's current cooldown is reduced by 1 second whenever Zac collects a Cell Division chunk.", 0);

    // Elastic Slingshot: charged for 1.3 s to 1800; a leap that knocks up and stuns, for 1 s when charged over 1 s.
    const slingRange = e.field("targetRange");
    const fullCharge = e.number("Maximum Range Channel Duration");
    const slingWords = "knocks them up and stuns them for 0.5 seconds, increased to 1 second if Elastic Slingshot was charged for more than 1 second";
    const slingStun = e.quoted(slingWords, 0);
    const slingLongStun = e.quoted(slingWords, 1);
    const slingLong = e.quoted(slingWords, 2);
    e.quote("Displacement immunity will also resist the application of the stun.");
    const slingRadius = e.field("effectRadius");
    kit.assume(`Elastic Slingshot's range grows evenly from 0 to ${slingRange} over its ${fullCharge} s charge. Zac charges it at least ${slingLong} s, for the longer stun, and leaps where the enemy stands when he lets go; the enemy can step out of the ${slingRadius} landing by moving during the leap.`);

    // Let's Bounce!: four bounces a second apart; the first hit knocks back, later ones deal 50%.
    const bounceWords = "Zac bounces after the cast time, then bounces 3 additional times each second over 3 seconds";
    const bounces = 1 + r.quoted(bounceWords, 0);
    const bounceEvery = 1;
    const bounceRadius = r.field("effectRadius");
    const bounce = r.formula("Magic Damage Per Hit");
    const laterBounce = r.formula("Reduced Damage Per Hit");
    const bounceSlowWords = "knocks them back over 1 second, and slows them by 20% for the same duration";
    const knockSeconds = r.quoted(bounceSlowWords, 0);
    const bounceSlow = r.quoted(bounceSlowWords, 1) / 100;
    r.quote("An enemy can be hit by multiple bounces, but ones beyond the first deal 50% damage to them and do not apply the knock back.");
    r.quote("but becomes unable to declare basic attacks, Stretching Strikes, and Elastic Slingshot. He also automatically consumes all chunks within the bounce radius.");
    const bounceSpeed = r.seriesIn("Zac can move while Let's Bounce! is active, gaining ghosting and");
    const knockback = 250;
    kit.assume(`Let's Bounce!'s first hit knocks the enemy back ${knockback} units (the game files' KnockbackDistance; the wiki gives none). Its bounces don't hit pets.`);

    const bouncing = (unit: Unit, tick: number) => tick < Number(unit.memory["zac:rUntil"] ?? -1);
    const tethered = (unit: Unit, tick: number) => tick < Number(unit.memory["zac:tetherUntil"] ?? -1);

    // Chunks, kept in memory as "x@from@until" entries.
    type Chunk = { x: number; from: number; until: number };
    const chunks = (ctx: HookContext): Chunk[] => String(ctx.memory["zac:chunks"] ?? "").split(";").filter(Boolean).map((c) => { const [x, from, until] = c.split("@").map(Number); return { x: x!, from: from!, until: until! }; });
    const keep = (ctx: HookContext, list: Chunk[]) => { ctx.memory["zac:chunks"] = list.map((c) => `${c.x}@${c.from}@${c.until}`).join(";"); };
    const shed = (ctx: HookContext, count = 1) => {
      const contested = ctx.enemy.alive && Math.abs(ctx.enemy.x - ctx.self.x) <= contestRange;
      const x = contested ? ctx.self.x + (ctx.enemy.x - ctx.self.x) * chunkShare : ctx.self.x;
      const list = chunks(ctx);
      for (let i = 0; i < count; i++) list.push({ x, from: ctx.tick + (contested && !bouncing(ctx.self, ctx.tick) ? ticks(chunkDelay) : 0), until: ctx.tick + ticks(chunkSeconds) });
      keep(ctx, list);
    };
    const consume = (ctx: HookContext) => {
      ctx.apply({ type: "heal", amount: { base: 0, ratios: { maxHP: chunkHeal } } }, true);
      const ready = ctx.self.cooldownReady.W ?? 0;
      if (ready > ctx.tick) ctx.self.cooldownReady.W = Math.max(ctx.tick, ready - ticks(matterRefund));
    };
    /** A chunk for each cast that hits. */
    const shedFor = (ctx: HookContext, key: string) => {
      const cast = String(ctx.memory[`zac:cast:${key}`] ?? ctx.tick);
      if (ctx.memory[`zac:shed:${key}`] === cast) return;
      ctx.memory[`zac:shed:${key}`] = cast;
      shed(ctx);
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: healthCost(q), costType: "health", castTime: q.castTime(),
      delivery: { kind: "line", range: armRange, width: q.field("width"), speed: armSpeed },
      onHit: [{ type: "damage", damageType: "magic", amount: strike }, strikeSlow],
      onSelf: [{ type: "resetAttack" }],
      flags: { projectile: true, spellShield: true },
      usable: (unit, world) => !bouncing(unit, world.tick),
      estimate: (self, target) => evaluate(strike, self, target),
      decisive: true,
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: healthCost(w), costType: "health", castTime: 0,
      delivery: { kind: "aura", radius: w.field("targetRange") },
      onHit: [{ type: "damage", damageType: "magic", amount: matter }],
      flags: { spellShield: true },
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: healthCost(e), costType: "health", castTime: slingLong + 1 / 30,
      castTimeFor: (unit) => Number(unit.memory["zac:eCharge"] ?? slingLong + 1 / 30),
      interruptible: { cooldown: e.cooldown() },
      delivery: { kind: "dash", direction: "toward", distance: slingRange, distanceFor: (unit) => Number(unit.memory["zac:eDistance"] ?? slingRange), speed: e.field("speed"), hitRadius: slingRadius, sidestep: { reach: slingRadius } },
      onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "displace", direction: "away", distance: 0, duration: slingLongStun }, { type: "cc", cc: "stun", duration: slingLongStun }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      usable: (unit, world) => !bouncing(unit, world.tick),
      roles: ["engage", "cc", "damage"],
      decisive: true,
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), castTime: r.castTime(),
      delivery: { kind: "self" },
      roles: ["damage", "cc"],
      estimate: (self, target) => evaluate(bounce, self, target) + (bounces - 1) * evaluate(laterBounce, self, target),
    };
    const abilities = [qSpec, wSpec, eSpec, rSpec];

    /** Elastic Slingshot's reach after charging for `seconds`. */
    const slingReach = (seconds: number) => slingRange * Math.min(1, seconds / fullCharge);

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      const center = Math.abs(view.enemy.x - self.x);
      if (bouncing(self, world.tick)) return { kind: "move", direction: view.mode === "flee" || view.mode === "kite" ? -1 : 1 };
      // Elastic Slingshot onto the enemy, charged at least long enough for the longer stun.
      if ((view.mode === "fight" || view.mode === "trade") && canCast(world, self, eSpec, true) && center > 300 && center <= slingRange) {
        self.memory["zac:eCharge"] = Math.max(slingLong + 1 / 30, Math.min(fullCharge, (center / slingRange) * fullCharge));
        return { kind: "cast", ability: "E" };
      }
      return defaultBehavior(view);
    };

    const blobletSpec = (self: Unit): PetSpec => {
      const d = derive(self);
      const immune = (Object.keys(CC_RULES) as CCType[]).filter((cc) => cc !== "stasis");
      return {
        kind: BLOBLET, name: "Bloblet", hp: blobletHealth * d.maxHp, armor: blobletArmor * (d.armor.base + d.armor.bonus), mr: blobletMR * (d.mr.base + d.mr.bonus),
        areaTaken: blobletArea, radius: blobletRadius, moveSpeed: 0, duration: cellSeconds, ccImmune: immune,
        // Their damage is echoed to Zac as health he loses, short of overkill.
        onDamaged: (hit) => { const owner = hit.world.units[hit.pet.owner]; owner.hp = Math.max(1, owner.hp - hit.dealt); },
      };
    };

    return {
      abilities,
      behavior,
      hooks: {
        onCastStart(ctx) {
          ctx.memory[`zac:cast:${ctx.ability.key}`] = `${ctx.tick}`;
          if (ctx.ability.key === "E") ctx.memory["zac:eStart"] = ctx.tick;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            // He can't move or attack while his arm is out.
            const flight = Math.min(armRange, Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius)) / armSpeed;
            if (flight > 0) { ctx.apply({ type: "state", state: "noMovement", duration: flight }, true); ctx.apply({ type: "state", state: "noAttacks", duration: flight }, true); }
          }
          if (ctx.ability.key === "R" && !ctx.self.resurrection) {
            ctx.memory["zac:rStart"] = ctx.tick;
            ctx.memory["zac:rUntil"] = ctx.tick + ticks((bounces - 1) * bounceEvery) + 1;
            ctx.memory["zac:bounced"] = 0;
            ctx.memory["zac:rHit"] = false;
            ctx.apply({ type: "state", state: "ghosted", duration: (bounces - 1) * bounceEvery }, true);
            ctx.apply({ type: "state", state: "noAttacks", duration: (bounces - 1) * bounceEvery }, true);
          }
        },
        onAbilityContact(ctx) {
          // Displacement immunity resists Elastic Slingshot's stun.
          if (ctx.ability.key === "E" && ctx.enemy.statuses.some((s) => s.kind === "state" && s.key === "displacementImmune" && s.endTick > ctx.tick)) return ctx.effects.filter((f) => !(f.type === "cc" && f.cc === "stun"));
          // A charge over 1 s stuns longer.
          if (ctx.ability.key === "E" && (ctx.tick - Number(ctx.memory["zac:eStart"] ?? ctx.tick)) / 30 <= slingLong + EPS) return ctx.effects.map((f) => (f.type === "cc" && f.cc === "stun") || f.type === "displace" ? { ...f, duration: slingStun } : f);
          return undefined;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (ctx.enemy.petId !== undefined) return;
          if (key === "Q") {
            // The tether: Zac's next attack is a second Stretching Strike.
            ctx.memory["zac:tetherUntil"] = ctx.tick + ticks(tether);
            addStatus(ctx.self, { kind: "empower", key: "Q2", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(tether), value: 0, empower: { attacks: 1, onHit: [strikeSlow], bonusRange: secondRange, uncancellable: false, windup: secondCast, attackOnHitReplacement: [] } });
            ctx.apply({ type: "state", state: "revealed", duration: tether });
          }
          if (key === "Q" || key === "W" || key === "E") shedFor(ctx, key);
        },
        onAttack(ctx) {
          if (!ctx.action.empowered?.includes("Q2")) return;
          // The second strike: Stretching Strikes' damage in place of the attack's, no critical strike.
          ctx.action.baseDamage = { damageType: "magic", amount: strike, label: `${q.name} (second strike)` };
          ctx.action.critChance = 0;
          ctx.memory["zac:tetherUntil"] = -1;
        },
        onAttackHit(ctx) {
          if (ctx.attack.baseDamage?.label === `${q.name} (second strike)`) {
            ctx.self.attackReadyTick = ctx.tick;
            shed(ctx);
          }
        },
        onLethal(ctx) {
          if (ctx.tick < Number(ctx.memory["zac:cellReady"] ?? 0)) return false;
          if (!beginResurrection(ctx.world, ctx.self, { duration: cellSeconds, ability: "I" })) return false;
          ctx.memory["zac:cellReady"] = ctx.tick + ticks(cellCooldown);
          const self = ctx.self;
          // Unable to act: Let's Bounce! ends, and his health now comes from the bloblets alone.
          ctx.memory["zac:rUntil"] = -1;
          ctx.memory["zac:bounced"] = bounces;
          keep(ctx, []);
          self.hp = cellHealth * derive(self).maxHp;
          const end = self.resurrection!.endTick;
          for (const state of ["untargetable", "invulnerable"] as const) addStatus(self, { kind: "state", key: state, source: self.side, startTick: ctx.tick, endTick: end, value: 0, ability: "engine:resurrection" });
          const spec = blobletSpec(self);
          for (const offset of [-splitAt, -splitAt, splitAt, splitAt]) {
            const pet = spawnPet(ctx.world, self, spec, self.x + offset);
            pet.statuses = [{ kind: "state", key: "untargetable", source: self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(blobletWait), value: 0 }];
            pet.memory = { "zac:home": self.x };
          }
          ctx.memory["zac:split"] = true;
          ctx.log("splits into bloblets");
          return true;
        },
        onPetDeath(ctx) {
          if (ctx.pet.spec.kind !== BLOBLET || !ctx.self.resurrection) return;
          if (petsOf(ctx.world, ctx.self.side, BLOBLET).length > 0) return;
          // Every bloblet is dead: Zac is executed.
          ctx.memory["zac:split"] = false;
          ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.ability === "engine:resurrection" && (s.key === "invulnerable" || s.key === "untargetable")));
          dealDamage(ctx.world, ctx.enemy, ctx.self, ctx.self.hp + derive(ctx.self).maxHp, "true", { ability: "Cell Division (execute)" });
        },
        onTick(ctx) {
          const self = ctx.self;
          // The bloblets head back to Zac once they can be hit; Zac revives with at least 10% health.
          if (ctx.memory["zac:split"] === true) {
            const end = self.resurrection?.endTick;
            if (end === undefined) {
              ctx.memory["zac:split"] = false;
              for (const pet of petsOf(ctx.world, self.side, BLOBLET)) ctx.world.pets = ctx.world.pets.filter((p) => p !== pet);
              if (self.alive) self.hp = Math.max(self.hp, reviveFloor * derive(self).maxHp);
            } else {
              for (const pet of petsOf(ctx.world, self.side, BLOBLET)) {
                if (pet.statuses?.some((s) => s.key === "untargetable" && s.endTick > ctx.tick)) continue;
                const left = Math.max(1, end - ctx.tick);
                pet.x += (self.x - pet.x) / left;
              }
            }
          }
          // Let's Bounce!: four bounces, speeding Zac up and picking up chunks around him.
          if (!self.resurrection && (bouncing(self, ctx.tick) || Number(ctx.memory["zac:bounced"] ?? bounces) < bounces)) {
            const start = Number(ctx.memory["zac:rStart"]);
            const age = (ctx.tick - start) / 30;
            ctx.buff("zac:bounceSpeed", "moveSpeedPercent", seriesAt(bounceSpeed, age, true) / 100, 0.1);
            const done = Number(ctx.memory["zac:bounced"] ?? 0);
            if (done < bounces && ctx.tick >= start + ticks(done * bounceEvery)) {
              ctx.memory["zac:bounced"] = done + 1;
              // Chunks on the ground within the bounce are his; one this bounce sheds lands for later.
              const list = chunks(ctx);
              const near = list.filter((c) => Math.abs(c.x - self.x) <= bounceRadius + EPS);
              if (near.length > 0) { keep(ctx, list.filter((c) => !near.includes(c))); for (let i = 0; i < near.length; i++) consume(ctx); }
              if (ctx.enemy.alive && Math.abs(ctx.enemy.x - self.x) <= bounceRadius + ctx.enemy.spec.base.radius + EPS) {
                const first = ctx.memory["zac:rHit"] !== true;
                ctx.memory["zac:rHit"] = true;
                const effects: Effect[] = first
                  ? [{ type: "damage", damageType: "magic", amount: bounce }, { type: "displace", direction: "away", distance: knockback, duration: knockSeconds }, { type: "cc", cc: "slow", strength: bounceSlow, duration: knockSeconds }]
                  : [{ type: "damage", damageType: "magic", amount: laterBounce }, { type: "cc", cc: "slow", strength: bounceSlow, duration: knockSeconds }];
                abilityHit(ctx.world, self, ctx.enemy, rSpec, effects);
                shed(ctx);
              }
            }
          } else ctx.buff("zac:bounceSpeed", "moveSpeedPercent", 0, 0);
          // Chunks: whoever reaches one first takes it.
          const list = chunks(ctx).filter((c) => c.until > ctx.tick);
          const left: Chunk[] = [];
          for (const chunk of list) {
            const mine = self.alive && !self.resurrection && Math.abs(self.x - chunk.x) - self.spec.base.radius <= chunkReach + EPS;
            const theirs = ctx.enemy.alive && Math.abs(ctx.enemy.x - chunk.x) - ctx.enemy.spec.base.radius <= chunkReach + EPS;
            if (ctx.tick < chunk.from || (!mine && !theirs)) { left.push(chunk); continue; }
            const zacFirst = mine && (!theirs || Math.abs(self.x - chunk.x) <= Math.abs(ctx.enemy.x - chunk.x) + EPS);
            if (zacFirst) consume(ctx);
          }
          keep(ctx, left);
          // The tether breaks beyond 900, and with it the second strike.
          if (tethered(self, ctx.tick) && Math.abs(ctx.enemy.x - self.x) > tetherRange + EPS) ctx.memory["zac:tetherUntil"] = -1;
          if (!tethered(self, ctx.tick)) self.statuses = self.statuses.filter((s) => !(s.kind === "empower" && s.key === "Q2"));
          // While charging Elastic Slingshot, the leap goes where the enemy stands, as far as the charge allows.
          if (self.action?.kind === "cast" && self.action.ability === "E") {
            const charged = (ctx.tick - self.action.startTick) / 30;
            self.memory["zac:eDistance"] = Math.min(slingReach(charged + 1 / 30), Math.abs(ctx.enemy.x - self.x));
          }
        },
      },
      budget: {
        // A chunk about every Unstable Matter.
        healing(self) { return (chunkHeal * derive(self).maxHp) / wSpec.cooldown; },
      },
    };
  },
};

export default zac;
