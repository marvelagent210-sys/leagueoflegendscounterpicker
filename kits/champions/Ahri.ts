/** Ahri at level 20, compiled from the pinned ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, missileArrivalTicks, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityHit, canTarget, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Missile, Unit } from "../../engine/sim/state";
import { damagePet } from "../../engine/sim/pets";
import { ticks } from "./util";

const ahri: KitModule = {
  champion: "Ahri",
  build(kit) {
    const i = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const fragments = i.quoted("At 9 stacks");
    const fragmentHeal = i.levelValue("At 9 stacks");
    const fragmentRatio = i.quoted("(+ 20% AP)") / 100;
    const championHeal = i.levelValue("Additionally, whenever Ahri scores a champion takedown");
    const championRatio = i.quoted("(+ 30% AP)") / 100;
    const takedownWithin = i.quoted("within 3 seconds of damaging them");
    i.quote("whenever she kills a minion or monster");
    kit.assume(`Essence Theft starts with zero of its ${fragments} minion/monster fragments; its ${fragmentHeal} + ${fragmentRatio} AP fragment heal is not preloaded. Champion-owned pets are not farm or champion takedowns. A qualifying first champion death grants the ${championHeal} + ${championRatio} AP heal within ${takedownWithin} s of Ahri's damage. The engine's explicit fallen flag includes Sion's first death before his continuing zombie form; that death is claimed once, not again when the zombie expires. Ordinary final deaths also trigger the heal, although the duel then ends.`);

    const orbDamage = q.formula("Damage Per Pass");
    q.formula("Total Mixed Damage");
    const orbRange = q.field("range", "Without return point");
    const orbWidth = q.field("width");
    const turnRadius = q.field("effectRadius", "Circle check");
    const orbOutSpeed = q.field("speed", "Outgoing");
    const orbReturnSpeed = q.field("speed", "Returning");
    const orbReturnCap = q.fieldNumbers("speed").at(-1)!;
    const accelerationLabel = q.record.fields.speed!.values.find((v) => v.label?.includes("Returning"))!.label!;
    // The label is parsed data, not prose; validate and register its acceleration evidence.
    q.field("speed", "acceleration 1900");
    const orbAcceleration = Number(/acceleration\s+(\d+(?:\.\d+)?)/.exec(accelerationLabel)?.[1]);
    if (!Number.isFinite(orbAcceleration)) throw new Error("Ahri kit: return acceleration is missing");
    q.quote("Enemies can be hit only once per pass");
    q.quote("around the return point in a small circle");
    q.quote("If Ahri dies while the orb is out");
    q.quote("This ability will cast from wherever the caster is at the end of the cast time");
    kit.assume("Orb of Deception retains its cast direction and uses its cast-end origin. Its special spell-shield flag has no detailed linked-pass rule in the record: each pass independently checks current spell shields and parries. Return sidesteps use the shared hit model's expected damage share, calculated independently at turnaround from current enemy/owner geometry; callback-created return legs do not create another fight branch. Both launched passes persist after Ahri's death and can produce a posthumous draw. A returning leg expires at the world's configured maximum fight time.");

    const flameDamage = w.formula("Primary Magic Damage"), laterFlame = w.formula("Subsequent Magic Damage");
    const flameTotal = w.formula("Total Single-Target Damage");
    const flameSpeed = w.field("speed", "Fired missile");
    const flameRange = w.field("effectRadius", "Prioritized targets");
    const orbitRadius = w.field("effectRadius", "Orbit radius");
    const nonPriorityRange = w.field("effectRadius", "Non-prioritized");
    const orbitVelocity = w.field("speed", "Orbiting angular velocity");
    const haste = w.quoted("gains 40% bonus movement speed that decays over 2 seconds") / 100;
    const hasteSeconds = w.quoted("gains 40% bonus movement speed that decays over 2 seconds", 1);
    w.quote("conjures three flames");
    const flameSeconds = w.quoted("orbit her clockwise for up to 2.5 seconds");
    const priorityDelay = w.quoted("After 0.25 seconds of the cast");
    const normalDelay = w.quoted("or after 0.4 seconds");
    w.quote("enemy champions hit by Charm, then enemy champions");
    w.quote("Any unused Fox-Fires will fizzle upon death");
    kit.assume(`Fox-Fire has three flames (the source spells this count as a word). The sole visible enemy champion has priority after ${priorityDelay} s, rather than non-priority ${normalDelay} s. Flame missiles originate at Ahri's center on the one-dimensional line; the ${orbitRadius}-unit orbit and ${nonPriorityRange}-unit non-priority search are not projected into artificial forward/backward offsets. The source's ${orbitVelocity} degrees/s and parsed 2.65 rad/s disagree. Post-effect cooldown begins after the last flame launches or expires; missile impact is not used. A shielded/parried flame contact counts toward subsequent reduced flames, independently of health damage. Automatic flames select the opposing champion; alternate minion/pet targeting is not inferred from the engine's unclassified champion-owned pets.`);

    const charmDamage = e.formula("Magic Damage"), charmSeconds = e.number("Disable Duration");
    const charmSlow = e.quoted("slowing them by 65%") / 100;
    e.quote("knocking them down and charming");
    e.quote("Charm is able to slow targets otherwise immune to slows upon charming them");
    e.quote("This ability will cast from wherever the caster is at the end of the cast time");
    const rushDamage = r.formula("Magic Damage");
    const rushCooldown = r.cooldown(), rushCost = r.cost();
    const rushDistance = r.field("targetRange", "Maximum dash distance"), boltRange = r.field("effectRadius");
    const rushSpeed = r.field("speed", "Dash speed"), boltSpeed = r.field("speed", "Energy bolt");
    const rushMoveSpeedRatio = r.fieldNumbers("speed")[1]! / 100;
    const rushWindow = r.quoted("within 15 seconds of the activation");
    const rushSpacing = r.quoted("a 1-second static cooldown between casts");
    r.quote("recast twice more");
    r.quote("recast duration will persist even after using all recasts");
    r.quote("Fox-Fire can be cast during the dash");
    r.quote("The bolts do not fire if Ahri dies while dashing");
    r.quote("The bolts will fire if the dash is interrupted by other means");
    const rushExtension = r.quoted("extends the recast duration by and up to 10 seconds");
    const rushMaxStock = r.quoted("storing up to 3 recasts at a time");
    r.quoted("to up to 3 nearby visible enemies");
    kit.assume("Spirit Rush uses two initial free recasts with a fixed first-cast 15-second expiry and a static one-second spacing. A qualifying Essence Theft death, including Sion entering Glory in Death, adds one recast up to three and restarts R's normal cooldown. 'Extends … by and up to 10 seconds' is interpreted monotonically: retain the later of the old expiry and ten seconds after the grant, preserving an already longer initial window. Each dash searches for the one opposing visible champion at its actual end and fires one bolt; three bolts against one champion per dash are not assumed. Additional bolts selecting champion-owned pets are not represented: the record does not supply priority among more than three targets and the simulator lacks ability missiles homing on a selected pet. Dash speed includes current movement speed at declaration. The behavior aims dashes toward attack range in combat and away when fleeing.");

    const rushActive = (unit: Unit, tick: number) => tick < Number(unit.memory.rushUntil ?? -1);
    const observeTakedown = (ctx: HookContext) => {
      if (ctx.memory.essenceDeathSeen || (!ctx.enemy.fallen && ctx.enemy.hp > 0)) return;
      // A first death remains a first death during a zombie continuation. Observe it
      // even when ineligible, so later zombie damage cannot retroactively earn essence.
      ctx.memory.essenceDeathSeen = true;
      if (ctx.tick - Number(ctx.memory.lastChampionDamage ?? -Infinity) > ticks(takedownWithin)) return;
      ctx.apply({ type: "heal", amount: { base: championHeal, ratios: { AP: championRatio } } }, true);
      if (rushActive(ctx.self, ctx.tick)) {
        ctx.memory.rushStock = Math.min(rushMaxStock, Number(ctx.memory.rushStock ?? 0) + 1);
        ctx.memory.rushUntil = Math.max(Number(ctx.memory.rushUntil), ctx.tick + ticks(rushExtension));
        ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rushCooldown, derive(ctx.self).abilityHaste));
      }
    };
    const rushDelivery: Extract<AbilitySpec["delivery"], { kind: "dash" }> = { kind: "dash", direction: "toward", distance: rushDistance, minDistance: 0, speed: rushSpeed, speedFor: (unit) => rushSpeed + rushMoveSpeedRatio * derive(unit).moveSpeed, through: true };
    const qSpec: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: "start", persistsAfterDeath: true, delivery: { kind: "line", range: orbRange + turnRadius, travelRange: orbRange, width: orbWidth, speed: orbOutSpeed, piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: orbDamage }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") } };
    const returnSpec: AbilitySpec = { key: "Qreturn", name: "Orb of Deception (return)", slot: "other", cooldown: 0, castTime: 0, persistsAfterDeath: true, delivery: { kind: "line", range: orbRange, width: orbWidth, speed: orbReturnSpeed }, onHit: [{ type: "damage", damageType: "true", amount: orbDamage }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, usable: () => false };
    const wSpec: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cooldownAfter: "state", cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, roles: ["damage", "buff"], overlay: true, preserveAttackWindup: true, onSelf: [{ type: "state", state: "lingering", duration: flameSeconds }], estimate: (self, target) => evaluate(flameTotal, self, target) };
    const eSpec: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castDirection: "start", delivery: { kind: "line", range: e.field("range"), width: e.field("width"), speed: e.field("speed"), collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: charmDamage }, { type: "knockdown" }, { type: "cc", cc: "charm", duration: charmSeconds }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield") }, decisive: true };
    const rSpec: AbilitySpec = { key: "R", name: r.name, slot: "R", cooldown: rushCooldown, cost: rushCost, castTime: r.castTime(), delivery: rushDelivery, roles: ["damage", "engage", "escape"], flags: { grounded: r.flag("grounded"), knockdown: r.flag("knockdown") }, usable: (self, world) => !rushActive(self, world.tick), estimate: (self, target) => evaluate(rushDamage, self, target) };
    const recast: AbilitySpec = { ...rSpec, key: "R2", name: "Spirit Rush (recast)", slot: "R", cooldown: rushSpacing, staticCooldown: true, cost: 0, usable: (self, world) => rushActive(self, world.tick) && Number(self.memory.rushStock ?? 0) > 0 && world.tick >= Number(self.memory.rushNext ?? 0) };
    const boltSpec: AbilitySpec = { key: "Rbolt", name: "Spirit Rush bolt", slot: "other", cooldown: 0, castTime: 0, delivery: { kind: "target", range: boltRange, missileSpeed: boltSpeed }, onHit: [{ type: "damage", damageType: "magic", amount: rushDamage }], flags: { projectile: r.flag("projectile"), spellShield: r.flag("spellShield") }, usable: () => false };
    const abilities = [qSpec, wSpec, eSpec, rSpec, recast, returnSpec, boltSpec];
    const launch = (ctx: HookContext, spec: AbilitySpec, speed: number, effects: Effect[]): Missile => {
      const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: spec.key, seenTick: ctx.tick, x: ctx.self.x, perTick: speed / 30, homing: true, direction: directionTo(ctx.self, ctx.enemy), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: effects };
      ctx.world.missiles.push(missile);
      return missile;
    };
    const turnCircle = (ctx: HookContext, missile: Missile, spec: AbilitySpec) => {
      if (missile.connects && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - missile.x) <= turnRadius + ctx.enemy.spec.base.radius + 1e-6 && !missile.hitTargets?.includes(ctx.enemy.side)) {
        (missile.hitTargets ??= []).push(ctx.enemy.side);
        abilityHit(ctx.world, ctx.self, ctx.enemy, spec, missile.onHit, missile.scale);
      }
      for (const pet of [...ctx.world.pets]) {
        if (pet.owner === ctx.self.side || pet.spec.untargetable || pet.spec.hitPoints || missile.hitPets?.includes(pet.id) || Math.abs(pet.x - missile.x) > turnRadius + pet.spec.radius + 1e-6) continue;
        (missile.hitPets ??= []).push(pet.id);
        for (const effect of missile.onHit) if (effect.type === "damage" && ctx.world.pets.includes(pet)) damagePet(ctx.world, ctx.self, pet, evaluate(effect.amount, ctx.self, ctx.enemy) * (pet.spec.areaTaken ?? 1), effect.damageType, false, spec.key);
      }
    };
    const behavior: Behavior = (view) => {
      const { self, enemy, world, mode } = view;
      if (mode === "idle") return undefined;
      // Advance the shared trade clock even when an instant flame or movement policy
      // overrides its proposed command; evaluate it only once for this decision.
      const tradeCommand = mode === "trade" ? defaultBehavior(view) : undefined;
      if (mode === "trade" && self.memory.tradeDone) return tradeCommand;
      const reaction = react(view);
      if (reaction) return reaction;
      if (canCast(world, self, wSpec) && canTarget(enemy, self) && Math.abs(self.x - enemy.x) <= flameRange && (mode !== "hold" || view.threats.length > 0)) return { kind: "cast", ability: "W" };
      if (!self.action) {
        const dash = canCast(world, self, recast) ? recast : canCast(world, self, rSpec) ? rSpec : undefined;
        if (dash && (mode === "fight" || mode === "flee" || (mode === "kite" && view.distance < self.spec.attack.range * .6))) {
          const recastingForBolt = dash.key === "R2" && canTarget(enemy, self) && Math.abs(self.x - enemy.x) <= boltRange;
          const away = mode === "flee" || mode === "kite" || (recastingForBolt && view.distance <= self.spec.attack.range && Math.abs(self.x - enemy.x) < boltRange - 20);
          const spacingStep = Math.min(120, Math.max(50, self.spec.attack.range - view.distance), Math.max(0, boltRange - Math.abs(self.x - enemy.x) - 1));
          if (away || view.distance > self.spec.attack.range || recastingForBolt || view.threats.some((t) => t.damage >= self.hp * .2)) return { kind: "cast", ability: dash.key, aim: { direction: away ? -1 : 1, distance: away ? (mode === "flee" ? rushDistance : spacingStep) : Math.min(rushDistance, Math.max(recastingForBolt ? 20 : 0, view.distance - self.spec.attack.range * .8)) } };
        }
      }
      return mode === "trade" ? tradeCommand : defaultBehavior(view);
    };
    return {
      abilities, behavior,
      hooks: {
        onCast(ctx) {
          if (ctx.ability.key === "W") { ctx.memory.flameStart = ctx.tick; ctx.memory.flamesLeft = 3; ctx.memory.flameContacts = 0; ctx.buff("foxFireSpeed", "moveSpeedPercent", haste, hasteSeconds); }
          if (ctx.ability.key === "R") { ctx.memory.rushUntil = ctx.tick + ticks(rushWindow); ctx.memory.rushStock = 2; ctx.memory.rushNext = ctx.tick + ticks(rushSpacing); }
          if (ctx.ability.key === "R2") { ctx.memory.rushStock = Number(ctx.memory.rushStock) - 1; ctx.memory.rushNext = ctx.tick + ticks(rushSpacing); }
        },
        onTick(ctx) {
          observeTakedown(ctx);
          if (ctx.memory.flameStart !== undefined) {
            const age = ctx.tick - Number(ctx.memory.flameStart);
            ctx.buff("foxFireSpeed", "moveSpeedPercent", haste * Math.max(0, 1 - age / ticks(hasteSeconds)), 1 / 30);
            const left = Number(ctx.memory.flamesLeft ?? 0);
            if (left > 0 && (ctx.self.hp <= 0 || !ctx.self.alive || age >= ticks(flameSeconds))) ctx.memory.flamesLeft = 0;
            else if (left > 0 && age >= ticks(priorityDelay) && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.self.x - ctx.enemy.x) <= flameRange) {
              for (let index = 0; index < left; index += 1) launch(ctx, wSpec, flameSpeed, [{ type: "damage", damageType: "magic", amount: flameDamage, label: "foxFire" }]);
              ctx.memory.flamesLeft = 0;
            }
            if (Number(ctx.memory.flamesLeft ?? 0) === 0) ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "lingering" && s.ability === "W"));
            if (age >= ticks(flameSeconds)) delete ctx.memory.flameStart;
          }
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "W" && ctx.effects.some((effect) => effect.type === "damage" && effect.label === "foxFire")) {
            const previous = Number(ctx.memory.flameContacts ?? 0); ctx.memory.flameContacts = previous + 1;
            return [{ type: "damage", damageType: "magic", amount: previous > 0 ? laterFlame : flameDamage, label: "foxFire" }];
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E" && ctx.enemy.statuses.some((status) => status.kind === "cc" && status.key === "charm" && status.source === ctx.self.side && status.ability === "E" && status.startTick === ctx.tick && status.endTick > ctx.tick)) ctx.apply({ type: "cc", cc: "slow", duration: charmSeconds, strength: charmSlow, bypassSlowImmune: true });
        },
        onDamageDealt(ctx) {
          ctx.memory.lastChampionDamage = ctx.tick;
          observeTakedown(ctx);
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source !== "Q" || ctx.reason !== "range" || ctx.missile.intercepted) return;
          turnCircle(ctx, ctx.missile, qSpec);
          const returning: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "Qreturn", seenTick: ctx.missile.seenTick, x: ctx.missile.x, perTick: orbReturnSpeed / 30, acceleration: { perTick: orbAcceleration / 900, maxPerTick: orbReturnCap / 30 }, homing: false, followOwner: true, direction: ctx.self.x >= ctx.missile.x ? 1 : -1, travelLeft: Infinity, expiresTick: ticks(ctx.world.settings.maxSeconds), projectile: true, connects: true, scale: 1, piercing: true, collisionPet: true, hitTargets: [], hitPets: [], onHit: returnSpec.onHit! };
          const centerGap = Math.abs(ctx.enemy.x - returning.x);
          const eta = missileArrivalTicks(returning, Math.max(0, centerGap - ctx.enemy.spec.base.radius));
          returning.scale = skillshotChance(ctx.world, ctx.enemy, returning.seenTick, eta / 30, orbWidth / 2);
          turnCircle(ctx, returning, returnSpec);
          ctx.world.missiles.push(returning);
        },
        onDashEnd(ctx) {
          if ((ctx.ability.key === "R" || ctx.ability.key === "R2") && ctx.self.alive && ctx.self.hp > 0 && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.self.x - ctx.enemy.x) <= boltRange) launch(ctx, boltSpec, boltSpeed, boltSpec.onHit!);
        },
      },
      budget: {
        damage(self, target) {
          const hasteFactor = 1 + derive(self).abilityHaste / 100;
          return { true: evaluate(orbDamage, self, target) * hasteFactor / qSpec.cooldown, magic: evaluate(flameTotal, self, target) / (wSpec.cooldown / hasteFactor + priorityDelay) + 3 * evaluate(rushDamage, self, target) * hasteFactor / rushCooldown };
        },
      },
    };
  },
};
export default ahri;
