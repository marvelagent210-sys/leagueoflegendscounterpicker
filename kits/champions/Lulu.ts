/** Lulu: one real Pix attachment, independent bolts and recipient-local enchantments. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack, resolveSkillshot } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { ticks } from "./util";

const EPS = 1e-6, PIX = "lulu:pix", QGROUP = "lulu:q";
type Body = { target: Unit; pet?: Pet };
const lulu: KitModule = {
  champion: "Lulu",
  build(kit) {
    const p = kit.ability("Pix, Faerie Companion"), q = kit.ability("Glitterlance"), w = kit.ability("Whimsy"), e = kit.ability("Help, Pix!"), r = kit.ability("Wild Growth");
    const boltCount = p.quoted("fires a barrage of 3 bolts"), boltDamage = { base: p.levelValue("Each bolt deals"), ratios: { AP: p.quoted("(+ 5% AP)") / 100 } };
    const boltWidth = p.field("width"), boltSpeeds = p.fieldNumbers("speed"), boltInitial = boltSpeeds[0]!, boltMax = boltSpeeds[1]!, boltAcceleration = p.quoted("5200 acceleration");
    const leash = p.quoted("Leash Range: 1600 • 2050", 1);
    const boltRange = p.gameQuoted('"castRange":[1200.0,1200.0,1200.0,1200.0,1200.0,1200.0,1200.0]', 0, "Characters/Lulu/Spells/LuluPassiveAbility/LuluPassiveMissile");
    p.quote("on-attack"); p.quote("bolts do not fire alongside abilities that apply"); p.quote("does not fire if the target dies"); p.quote("Neither of them will intercept");
    p.gameQuote('"mAcceleration":5200.0'); p.gameQuote('"mInitialSpeed":900.0'); p.gameQuote('"mMaxSpeed":2600.0');
    const qRange = q.field("range"), qWidth = q.field("width"), qSpeed = q.field("speed"), qDamage = q.formula("Magic Damage"), qSecond = q.formula("Reduced Damage"), qMinion = q.formula("Minion Damage"), qMinionSecond = q.formula("Reduced Minion Damage");
    const qSlow = q.quoted("slowing them by 80%") / 100, qDuration = q.quoted("decaying over 2 seconds");
    q.quote("Enemies take 50% damage from a second bolt"); q.quote("wherever he is when Lulu casts"); q.quote("wherever she is at the end of the cast time"); q.gameQuote('"mSpeed":1450.0');
    const wRange = w.field("targetRange"), wSpeed = w.field("speed"), wDisable = w.number("Disable Duration"), wFlat = w.quoted("reduced by 60"), wAS = w.fraction("Bonus Attack Speed"), wDuration = w.number("Effect Duration");
    const wMS = w.quoted("25%", 0) / 100, wMSAP = w.quoted("(+ 5% per 100 AP)") / 10000;
    w.quote("reduced below 0"); w.quote("base''' movement speed is reduced instead");
    w.quote("not affected by slow resist"); w.quote("still go on cooldown and pay its cost"); w.gameQuote('"mSpeed":2250.0');
    const eRange = e.field("targetRange"), eDamage = e.formula("Magic Damage"), eShield = e.formula("Shield Strength"), eHostile = e.quoted("for 4 seconds"), eFriendly = e.quoted("for 6.25 seconds"), eShieldTime = e.quoted("shield for 2.5 seconds"), redirectRange = e.quoted("75 radius");
    e.quote("Pix will still follow regardless"); e.quote("even if the shield breaks"); e.quote("does not respect that the champion may not be visible"); e.gameQuote('"castRange":[650.0,650.0,650.0,650.0,650.0,650.0,650.0]');
    const rRange = r.field("targetRange"), rRadius = r.field("effectRadius", "Knock"), rSlowRadius = r.field("effectRadius", "Slow"), rHealth = r.formula("Bonus Health"), rSlow = r.fraction("Slow"), rDuration = r.quoted("For the next 7 seconds"), rUp = r.quoted("nearby enemies for 1 second"), rDistance = r.quoted("knocked back over 275 units"), rLinger = r.quoted("lingers for 0.25 seconds");
    r.quoted("40% increased"); r.quote("size increase scales additively"); r.gameQuote('"mCoefficient":0.550000011920929');
    const isChampion = (body: Body) => !body.pet || body.pet.spec.targetClass === "champion";
    const id = (body: Body) => body.pet ? `p${body.pet.id}` : `u${body.target.side}`;
    const bodyOf = (world: World, self: Unit, key: string): Body | undefined => {
      if (/^u[01]$/.test(key)) return { target: world.units[Number(key.slice(1)) as 0 | 1] };
      const pet = world.pets.find(pet => `p${pet.id}` === key);
      return pet ? { target: petFormulaTarget(pet, self, world.tick), pet } : undefined;
    };
    const bodies = (world: World, self: Unit): Body[] => [...world.units.map(target => ({ target })), ...world.pets.filter(pet => pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.fixedDamage).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet }))];
    const live = (world: World, self: Unit, body: Body, sight = true) => body.target.alive && body.target.hp > 0 && !body.target.resurrection && !inStasis(body.target) && !isUntargetable(body.target, self) && (!sight || canSee(body.target, self)) && (!body.pet || (!body.pet.spec.untargetable && (!sight || canTargetPet(body.pet, self, world.tick))));
    const sync = (body: Body) => { if (body.pet) { body.pet.hp = body.target.hp; body.pet.statuses = body.target.statuses; if (body.target.forced) body.pet.forced = body.target.forced; } };
    const ally = (world: World, self: Unit, range: number, aim?: Aim, champions = true) => {
      const cursor = aim?.distance === undefined ? self.x : self.x + directionTo(self, world.units[self.side === 0 ? 1 : 0]) * aim.direction * aim.distance;
      return bodies(world, self).filter(body => body.pet && body.target.side === self.side && (!champions || isChampion(body)) && live(world, self, body) && Math.abs(body.target.x - self.x) <= range + EPS).sort((a, b) => Math.abs(a.target.x - cursor) - Math.abs(b.target.x - cursor) || a.pet!.id - b.pet!.id)[0];
    };
    const hostilePet = (world: World, self: Unit, aim?: Aim, champions = false) => {
      const cursor = aim?.distance === undefined ? world.units[self.side === 0 ? 1 : 0].x : self.x + directionTo(self, world.units[self.side === 0 ? 1 : 0]) * aim.direction * aim.distance;
      return bodies(world, self).filter(body => body.pet && body.target.side !== self.side && (!champions || isChampion(body)) && live(world, self, body) && Math.abs(body.target.x - self.x) <= eRange + EPS).sort((a, b) => Math.abs(a.target.x - cursor) - Math.abs(b.target.x - cursor) || a.pet!.id - b.pet!.id)[0];
    };
    const redirect = (ctx: HookContext, initial: Body) => isChampion(initial) ? initial : bodies(ctx.world, ctx.self).filter(body => isChampion(body) && live(ctx.world, ctx.self, body, false) && Math.abs(body.target.x - initial.target.x) <= redirectRange + EPS).sort((a, b) => Math.abs(a.target.x - initial.target.x) - Math.abs(b.target.x - initial.target.x) || id(a).localeCompare(id(b)))[0] ?? initial;
    const attach = (ctx: HookContext, body: Body) => { ctx.memory[`${PIX}:host`] = id(body); ctx.memory[`${PIX}:until`] = ctx.tick + ticks(body.target.side === ctx.self.side ? eFriendly : eHostile); ctx.memory[`${PIX}:x`] = body.target.x; };
    const pixPosition = (ctx: HookContext) => {
      const host = bodyOf(ctx.world, ctx.self, String(ctx.memory[`${PIX}:host`] ?? ""));
      if (ctx.tick >= Number(ctx.memory[`${PIX}:until`] ?? 0) || !host || !host.target.alive || host.target.hp <= 0 || Math.abs(host.target.x - ctx.self.x) > leash + EPS) {
        ctx.memory[`${PIX}:host`] = `u${ctx.self.side}`; ctx.memory[`${PIX}:until`] = Infinity; ctx.memory[`${PIX}:x`] = ctx.self.x;
      } else ctx.memory[`${PIX}:x`] = host.target.x;
      return Number(ctx.memory[`${PIX}:x`]);
    };
    const passive: AbilitySpec = { key: "I", name: p.name, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: boltDamage, noLifeSteal: true, petDamageCategory: "proc" }], usable: () => false, persistsAfterDeath: true };
    const qEffects = (label?: string): Effect[] => [{ type: "damage", damageType: "magic", amount: qDamage, ...(label ? { label } : {}) }, { type: "cc", cc: "slow", duration: qDuration, strength: qSlow }];
    const warning: AbilitySpec = { key: "Q-warning", name: q.name, slot: "Q", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { projectile: true }, usable: () => false };
    const qPix: AbilitySpec = { key: "Q-Pix", name: q.name, slot: "Q", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, decisive: true, flags: { spellShield: true, projectile: true, petContactHooks: true }, onHit: qEffects(), usable: () => false, persistsAfterDeath: true };
    const burst: AbilitySpec = { key: "R-burst", name: r.name, slot: "R", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, usable: () => false };
    const aura: AbilitySpec = { key: "R-aura", name: r.name, slot: "R", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, usable: () => false, persistsAfterDeath: true };
    const fireBolts = (ctx: HookContext, host: string, target: Unit) => {
      const x = pixPosition(ctx);
      const attached = bodyOf(ctx.world, ctx.self, String(ctx.memory[`${PIX}:host`]));
      // Help, Pix! transfers attack assistance only to an allied champion. Other
      // attachments retain Lulu's declaration while moving the actual bolt origin.
      const attacker = attached && attached.target.side === ctx.self.side && isChampion(attached) ? id(attached) : `u${ctx.self.side}`;
      if (attacker !== host || !target.alive || target.hp <= 0 || target.resurrection || isUntargetable(target, ctx.self) || inStasis(target)) return;
      const direction = Math.abs(target.x - x) <= EPS ? directionTo(ctx.self, target) : Math.sign(target.x - x) as 1 | -1;
      for (let n = 0; n < boltCount; n++) {
        const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: "I", seenTick: ctx.tick, x, direction, perTick: boltInitial / 30, acceleration: { perTick: boltAcceleration / 900, minPerTick: boltInitial / 30, maxPerTick: boltMax / 30 }, homing: false, travelLeft: boltRange, collisionPet: true, radius: boltWidth / 2, projectile: true, connects: true, scale: 1, onHit: passive.onHit! };
        ctx.memory[`${PIX}:bolt:${m.id}`] = target.petId === undefined ? `u${target.side}` : `p${target.petId}`;
        ctx.world.missiles.push(m);
      }
    };
    const applyFriendly = (ctx: HookContext, body: Body, effects: Effect[], spell: AbilitySpec) => { for (const effect of effects) applyEffect(ctx.world, ctx.self, body.target, effect, { ability: spell, scale: 1 }); sync(body); };
    const slowAura = (ctx: HookContext, center: number) => {
      for (const body of bodies(ctx.world, ctx.self).filter(body => body.target.side !== ctx.self.side && live(ctx.world, ctx.self, body, false) && Math.abs(body.target.x - center) <= rSlowRadius + EPS)) {
        const effects: Effect[] = [{ type: "cc", cc: "slow", duration: rLinger, strength: rSlow }];
        if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, aura, effects, "area", 1, center); else abilityHit(ctx.world, ctx.self, body.target, aura, effects, 1, center);
      }
    };
    const grow = (ctx: HookContext & { ability: AbilitySpec }, body: Body) => {
      applyFriendly(ctx, body, [{ type: "stat", stat: "health", amount: rHealth, duration: rDuration }], ctx.ability);
      for (const enemy of bodies(ctx.world, ctx.self).filter(enemy => enemy.target.side !== ctx.self.side && live(ctx.world, ctx.self, enemy, false) && Math.abs(enemy.target.x - body.target.x) <= rRadius + EPS)) {
        const effects: Effect[] = [{ type: "displace", direction: "away", distance: rDistance, duration: rUp, airborneDuration: rUp, originX: body.target.x }];
        if (enemy.pet) abilityHitPet(ctx.world, ctx.self, enemy.pet, burst, effects, "area", 1, body.target.x); else abilityHit(ctx.world, ctx.self, enemy.target, burst, effects, 1, body.target.x);
      }
      const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: aura.key, seenTick: ctx.tick, x: body.target.x, perTick: 0, direction: 1, homing: false, travelLeft: Infinity, projectile: false, perceptionHidden: true, connects: false, scale: 1, onHit: [], piercing: true, expiresTick: ctx.tick + ticks(rDuration) + 1 };
      ctx.memory[`lulu:r:${m.id}:body`] = id(body); ctx.memory[`lulu:r:${m.id}:end`] = ctx.tick + ticks(rDuration); ctx.world.missiles.push(m); slowAura(ctx, body.target.x);
    };
    const rayGeometry = (ctx: HookContext, x: number) => {
      const cursor = Number(ctx.memory[`${QGROUP}:cursor`] ?? ctx.enemy.x), delta = cursor - x;
      const direction = (Math.abs(delta) <= EPS ? directionTo(ctx.self, ctx.enemy) : Math.sign(delta)) as 1 | -1;
      const forward = direction * (ctx.enemy.x - x), radius = ctx.enemy.spec.base.radius + qWidth / 2;
      return { direction, possible: forward >= -radius - EPS && forward - radius <= qRange + EPS, travel: Math.max(0, Math.abs(ctx.enemy.x - x) - radius) / qSpeed };
    };
    const refreshWarning = (ctx: HookContext, m: Missile) => {
      const second = ctx.memory[`lulu:warning:${m.id}`] === true, x = second ? Number(ctx.memory[`${QGROUP}:pixX`]) : ctx.self.x;
      const ray = rayGeometry(ctx, x), first = rayGeometry(ctx, ctx.self.x); m.x = x; m.direction = ray.direction;
      delete m.impactTick; m.onHit = [];
      if (!ray.possible || !ctx.enemy.alive || ctx.enemy.hp <= 0) return;
      m.impactTick = Number(ctx.memory[`${QGROUP}:until`]) + ticks(ray.travel);
      m.onHit = [{ type: "damage", damageType: "magic", amount: second && first.possible ? qSecond : qDamage }, { type: "cc", cc: "slow", duration: qDuration, strength: qSlow }];
    };
    const retireWarnings = (ctx: HookContext) => { ctx.world.missiles = ctx.world.missiles.filter(m => m.owner !== ctx.self.side || m.source !== warning.key); };
    const updateSlowDecay = (ctx: HookContext) => {
      for (const body of bodies(ctx.world, ctx.self)) {
        for (const slow of body.target.statuses) if (slow.memoKey === "lulu:qDecay" && slow.source === ctx.self.side) slow.value = qSlow * Math.max(0, (slow.endTick - ctx.tick) / Math.max(1, slow.endTick - slow.startTick));
        sync(body);
      }
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", budgetExcluded: true, cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castThreat: false, decisive: true, delivery: { kind: "self" }, estimate: (self, target) => evaluate(qDamage, self, target) + evaluate(qSecond, self, target), estimateDelay: (self, target) => Math.max(0, Math.abs(target.x - self.x) - target.spec.base.radius) / qSpeed, flags: { spellShield: true, projectile: true, petContactHooks: true }, onHit: qEffects(), roles: ["damage", "cc"], persistsAfterDeath: true },
      { key: "W", name: w.name, slot: "W", budgetExcluded: true, cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime("Enemy"), delivery: { kind: "target", range: wRange, missileSpeed: wSpeed }, cancelOnInvalidTarget: true, invalidTargetCost: "all", decisive: true, flags: { spellShield: true, projectile: true, petContactHooks: true }, onHit: [{ type: "cc", cc: "polymorph", duration: wDisable }, { type: "stat", stat: "totalMoveSpeedReduction", amount: { base: wFlat }, duration: wDisable, whileCC: "polymorph" }], roles: ["cc"] },
      { key: "W-pet", name: w.name, slot: "W", cooldownKey: "W", budgetExcluded: true, cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime("Enemy"), delivery: { kind: "self" }, invalidTargetCost: "all", validTargetAtCompletion: (world, self) => { const body = bodyOf(world, self, String(self.memory["lulu:wPet"] ?? "")); return !!body && isChampion(body) && body.target.side !== self.side && live(world, self, body) && Math.abs(body.target.x - self.x) <= wRange + EPS; }, usable: (self, world) => !!hostilePet(world, self, undefined, true), roles: ["cc"] },
      { key: "W-self", name: w.name, slot: "W", cooldownKey: "W", budgetExcluded: true, cooldown: w.cooldown(), cost: w.cost(), castTime: 0, delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: wAS }, duration: wDuration }, { type: "stat", stat: "moveSpeedPercent", amount: { base: wMS, ratios: { AP: wMSAP } }, duration: wDuration }], roles: ["buff"] },
      { key: "W-ally", name: w.name, slot: "W", cooldownKey: "W", budgetExcluded: true, cooldown: w.cooldown(), cost: w.cost(), castTime: 0, delivery: { kind: "self" }, usable: (self, world) => !!ally(world, self, wRange), roles: ["buff"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "target", range: eRange }, flags: { spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: eDamage }], roles: ["damage"] },
      { key: "E-self", name: e.name, slot: "E", cooldownKey: "E", budgetExcluded: true, cooldown: e.cooldown(), cost: e.cost(), castTime: 0, delivery: { kind: "self" }, roles: ["defense"] },
      { key: "E-ally", name: e.name, slot: "E", cooldownKey: "E", budgetExcluded: true, cooldown: e.cooldown(), cost: e.cost(), castTime: 0, delivery: { kind: "self" }, usable: (self, world) => !!ally(world, self, eRange, undefined, false), roles: ["defense"] },
      { key: "E-pet", name: e.name, slot: "E", cooldownKey: "E", budgetExcluded: true, cooldown: e.cooldown(), cost: e.cost(), castTime: 0, delivery: { kind: "self" }, usable: (self, world) => !!hostilePet(world, self), roles: ["damage"] },
      { key: "R", name: r.name, slot: "R", budgetExcluded: true, cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, roles: ["defense", "cc"] },
      { key: "R-ally", name: r.name, slot: "R", cooldownKey: "R", budgetExcluded: true, cooldown: r.cooldown(), cost: r.cost(), castTime: 0, delivery: { kind: "self" }, usable: (self, world) => !!ally(world, self, rRange), roles: ["defense"] }, passive, qPix, burst, aura, warning,
    ];
    const spell = (key: string) => abilities.find(a => a.key === key)!;
    const policy: Behavior = view => {
      const { self, enemy, world, mode } = view, normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [] } } });
      if (mode === "idle" || self.memory.tradeDone) return normal;
      const ready = (key: string) => canCast(world, self, spell(key));
      if (self.action) return normal;
      if (ready("E-self") && view.threats.length && !self.statuses.some(s => s.kind === "shield" && s.key === "E-self")) return { kind: "cast", ability: "E-self" };
      if (mode === "fight" && ready("R") && self.hp / derive(self).maxHp < .55 && (view.threats.length || Math.abs(enemy.x - self.x) <= rRadius)) return { kind: "cast", ability: "R" };
      if (ready("W") && !enemy.statuses.some(s => s.kind === "cc" && s.key === "polymorph") && (mode === "flee" || enemy.action || Math.abs(enemy.x - self.x) <= self.spec.attack.range + enemy.spec.base.radius)) return { kind: "cast", ability: "W" };
      if (ready("Q") && [self.x, Number(self.memory[`${PIX}:x`] ?? self.x)].some(x => Math.abs(enemy.x - x) <= qRange + enemy.spec.base.radius)) return { kind: "cast", ability: "Q" };
      if (mode !== "flee" && ready("E") && !view.threats.length) return { kind: "cast", ability: "E" };
      if (ready("W-self") && !self.statuses.some(s => s.kind === "stat" && s.key === "attackSpeed" && s.memoKey?.startsWith("W-self")) && (mode === "flee" || Math.abs(enemy.x - self.x) <= self.spec.attack.range + self.spec.base.radius + enemy.spec.base.radius)) return { kind: "cast", ability: "W-self" };
      if (mode !== "flee" && canStartAttack(world, self)) return { kind: "attack" };
      return normal;
    };
    kit.assume("Pix is one untargetable attachment, initially on Lulu. No targetable faerie or invented allied champion is spawned. The parsed wiki level-20 series gives 43 + 5% AP per bolt (129 + 15% AP for all three), continuing its published per-level progression. Exact far-side offset, free-follow lag, three-bolt stagger and the estimated 2050 attached leash are not server geometry; the host center, simultaneous independent bolts and the explicit 2050 attached leash form the one-dimensional model. A dead, expired or distant actual host returns Pix to Lulu. Only an allied champion attachment transfers the basic-declaration trigger; enemy and nonchampion attachments retain Lulu's trigger at Pix's actual origin. Bolts launch on real basic declaration, including blinded or dodged basics, never on copied on-hit spells. Each accelerated projectile collides with the first real enemy body; structures and wards are absent. Released bolts remain committed after caster death.");
    kit.assume("Glitterlance retains two independent origins: Pix at cast declaration and Lulu at cast completion, aimed at the same fixed cursor. Each real body has one full and one 50% second-bolt entitlement per cast, with explicit 70% minion damage. The primary 120 full width overrides 60 lineWidth game metadata. Each pending ray has a finite actual-origin cast-plus-travel warning; no generic self-cast damage duplicates it. Each uncertain decisive ray uses the ordinary split budget; one-dimensional sidestep branches are independent because no joint lateral state exists. The 80% slow decays over its accepted tenacity-adjusted lifetime, including after caster death; reapplication refreshes instead of stacking. No range-extension ally or minion is fabricated.");
    kit.assume("Enemy Whimsy pays its normal mana and cooldown for every invalid completion cause, following the pinned bug note. Its real homing missile applies tenacity-adjusted polymorph and a same-source, same-ability movement reduction of 60 after positive speed bonuses, before ordinary slow modifiers and soft caps. The reduction ends immediately with that control and bypasses slow resistance. Ally or self Whimsy is instant, shares one W cooldown and buffs only an actual eligible recipient. Unsupported cosmetic polymorph models do not change action rules.");
    kit.assume("Help, Pix! attaches and reveals even when its hostile damage is spell-shielded or parried; allied attachment survives shield destruction and leash return does not erase the shield. Explicit actual pet selection supports the sourced 75 center-radius champion redirection, including hidden champions; nearest center and stable identity resolve the source's untested side and proximity ordering. No body is invented. Instant selected casts share one E cooldown; ordinary selection obeys visibility, while redirection follows the explicit visibility exception.");
    kit.assume("Wild Growth grants recipient-local bonus maximum health and the same amount of current health without healing modifiers, lasting 7 seconds. An actual recipient anchors its 400 center-radius initial 1-second knockup and 275 knockback, plus a continuing 60% slow with a 0.25-second linger. Each area contact follows ordinary spell defenses. The sourced 40% size is retained as an unresolved gameplay and pathing-radius limit: no generic Size evidence pins those radius transformations or caps, so collision radii are not silently guessed. A real ally aura can remain after Lulu dies; it ends if that ally dies, and its health cap is restored at expiry.");
    kit.assume("Allocation prices the nominal 1.5-bolt Q packet, one hostile E packet per cooldown, self E shielding and actual baseline Pix basic cadence. It grants no fictional ally output or R damage. W control and its alternate self attack-speed mode share one cooldown in simulation; no simultaneous control and self-buff uptime is priced. Hold and trade reserve R, completed trades retreat before further spells, and flee uses real control and defenses.");
    return { abilities, behavior: policy, attack: { onHitToPets: true }, budget: { damage(self) { return { magic: evaluate(boltDamage, self) * boltCount * derive(self).attackSpeed + (evaluate(qDamage, self) + evaluate(qSecond, self)) * (1 + derive(self).abilityHaste / 100) / spell("Q").cooldown }; }, healing(self) { return evaluate(eShield, self) * (1 + derive(self).abilityHaste / 100) / spell("E").cooldown; } }, hooks: {
      onStart(ctx) { ctx.memory[`${PIX}:host`] = `u${ctx.self.side}`; ctx.memory[`${PIX}:until`] = Infinity; ctx.memory[`${PIX}:x`] = ctx.self.x; },
      onAttack(ctx) { fireBolts(ctx, `u${ctx.self.side}`, ctx.targetPet ? petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick) : ctx.enemy); },
      onOwnedPetAttack(ctx) { if (ctx.pet.spec.targetClass === "champion") fireBolts(ctx, `p${ctx.pet.id}`, ctx.target); },
      onCastStart(ctx) { if (ctx.ability.key === "W-pet") { const body = hostilePet(ctx.world, ctx.self, ctx.aim, true); ctx.memory["lulu:wPet"] = body ? id(body) : ""; } if (ctx.ability.key === "Q") { ctx.memory[`${QGROUP}:serial`] = ctx.world.nextId++; ctx.memory[`${QGROUP}:pixX`] = pixPosition(ctx); ctx.memory[`${QGROUP}:seen`] = ctx.tick; ctx.memory[`${QGROUP}:cursor`] = ctx.aim?.distance === undefined ? ctx.enemy.x : ctx.self.x + directionTo(ctx.self, ctx.enemy) * ctx.aim.direction * ctx.aim.distance;
        ctx.memory[`${QGROUP}:until`] = ctx.tick + ticks(ctx.ability.castTime); retireWarnings(ctx);
        for (const second of [false, true]) { const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: warning.key, seenTick: ctx.tick, x: ctx.self.x, direction: directionTo(ctx.self, ctx.enemy), perTick: 0, homing: false, travelLeft: Infinity, projectile: true, connects: false, scale: 1, onHit: [], piercing: true, expiresTick: Number(ctx.memory[`${QGROUP}:until`]) + 1 }; ctx.memory[`lulu:warning:${m.id}`] = second; refreshWarning(ctx, m); ctx.world.missiles.push(m); }
      } },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (key === "Q") {
          retireWarnings(ctx);
          for (const ray of [{ x: ctx.self.x, source: "Q" }, { x: Number(ctx.memory[`${QGROUP}:pixX`]), source: qPix.key }]) {
          const x = ray.x, cursor = Number(ctx.memory[`${QGROUP}:cursor`]), delta = cursor - x, direction = (Math.abs(delta) <= EPS ? directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) : Math.sign(delta)) as 1 | -1;
          const forward = direction * (ctx.enemy.x - x), possible = forward >= -ctx.enemy.spec.base.radius - qWidth / 2 - EPS && forward - ctx.enemy.spec.base.radius - qWidth / 2 <= qRange + EPS;
          const decision = possible ? resolveSkillshot(ctx.world, ctx.self, ctx.enemy, qPix, Number(ctx.memory[`${QGROUP}:seen`]), Math.max(0, Math.abs(ctx.enemy.x - x) - ctx.enemy.spec.base.radius - qWidth / 2) / qSpeed, qWidth / 2) : { connects: false, scale: 1 };
          const m: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: ray.source, seenTick: Number(ctx.memory[`${QGROUP}:seen`]), x, direction, perTick: qSpeed / 30, homing: false, travelLeft: qRange, projectile: true, collisionPet: true, piercing: true, radius: qWidth / 2, connects: decision.connects, scale: decision.scale, onHit: qEffects(`${QGROUP}:${ctx.memory[`${QGROUP}:serial`]}`) };
          ctx.world.missiles.push(m); if (decision.split !== undefined) ctx.queueSplit({ missile: m.id, chance: decision.split });
          }
        }
        if (key === "W-pet") { const body = bodyOf(ctx.world, ctx.self, String(ctx.memory["lulu:wPet"] ?? "")); if (body?.pet) ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "W", seenTick: ctx.tick, x: ctx.self.x, direction: directionTo(ctx.self, body.target), perTick: wSpeed / 30, homing: true, travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: spell("W").onHit!, pet: body.pet.id }); }
        if (key === "W-ally") { const body = ally(ctx.world, ctx.self, wRange, ctx.aim); if (body) applyFriendly(ctx, body, [{ type: "stat", stat: "attackSpeed", amount: { base: wAS }, duration: wDuration }, { type: "stat", stat: "moveSpeedPercent", amount: { base: wMS, ratios: { AP: wMSAP } }, duration: wDuration }], ctx.ability); }
        if (["E", "E-self", "E-ally", "E-pet"].includes(key)) {
          const selected: Body | undefined = key === "E" ? { target: ctx.enemy } : key === "E-self" ? { target: ctx.self } : key === "E-ally" ? ally(ctx.world, ctx.self, eRange, ctx.aim, false) : hostilePet(ctx.world, ctx.self, ctx.aim);
          if (!selected) return; const body = redirect(ctx, selected); attach(ctx, body);
          if (body.target.side === ctx.self.side && isChampion(body)) applyFriendly(ctx, body, [{ type: "shield", amount: eShield, duration: eShieldTime }], spell("E-self"));
          if (body.target.side !== ctx.self.side) {
            applyFriendly(ctx, body, [{ type: "state", state: "revealed", duration: eHostile }], spell("E"));
            if (key !== "E") { if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, spell("E"), spell("E").onHit!, "singleTarget"); else abilityHit(ctx.world, ctx.self, body.target, spell("E"), spell("E").onHit!); }
          }
        }
        if (key === "R") grow(ctx, { target: ctx.self });
        if (key === "R-ally") { const body = ally(ctx.world, ctx.self, rRange, ctx.aim); if (body) grow(ctx, body); }
      },
      onCastCancelled(ctx) { if (ctx.ability.key === "Q") retireWarnings(ctx); },
      onAbilityContact(ctx) {
        if (ctx.ability.key !== "Q" && ctx.ability.key !== qPix.key) return;
        const label = ctx.effects.find(effect => effect.type === "damage")?.label ?? `${QGROUP}:manual`, target = ctx.enemy, key = `${label}:${target.petId === undefined ? `u${target.side}` : `p${target.petId}`}`;
        const second = ctx.memory[key] === true, minion = target.petId !== undefined && target.spec.targetClass === "minion";
        return ctx.effects.map(effect => effect.type === "damage" ? { ...effect, amount: minion ? second ? qMinionSecond : qMinion : second ? qSecond : qDamage } : effect);
      },
      beforeAbilityHit(ctx) {
        if (ctx.ability.key !== "Q" && ctx.ability.key !== qPix.key) return;
        const label = ctx.effects.find(effect => effect.type === "damage")?.label ?? `${QGROUP}:manual`;
        ctx.memory[`${label}:${ctx.enemy.petId === undefined ? `u${ctx.enemy.side}` : `p${ctx.enemy.petId}`}`] = true;
      },
      onAbilityHit(ctx) {
        if (ctx.ability.key !== "Q" && ctx.ability.key !== qPix.key) return;
        const slow = ctx.enemy.statuses.findLast(s => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.ability === ctx.ability.key);
        if (slow) slow.memoKey = "lulu:qDecay";
      },
      onMissileTick(ctx) {
        const m = ctx.missile;
        if (m.source === warning.key) { if (!ctx.self.alive || ctx.self.action?.kind !== "cast" || ctx.self.action.ability !== "Q") { m.ended = true; delete m.impactTick; m.onHit = []; return; } refreshWarning(ctx, m); }
        if (m.source === "I") { const body = bodyOf(ctx.world, ctx.self, String(ctx.memory[`${PIX}:bolt:${m.id}`] ?? "")); if (body?.target.alive && body.target.hp > 0 && Math.abs(body.target.x - m.x) > EPS) m.direction = Math.sign(body.target.x - m.x) as 1 | -1; }
        if (m.source === aura.key) {
          const body = bodyOf(ctx.world, ctx.self, String(ctx.memory[`lulu:r:${m.id}:body`] ?? "")), end = Number(ctx.memory[`lulu:r:${m.id}:end`]);
          if (!body || !body.target.alive || body.target.hp <= 0 || body.target.resurrection) { m.ended = true; return; }
          if (ctx.tick >= end) { m.ended = true; return; }
          m.x = body.target.x; slowAura(ctx, m.x);
        }
      },
      onTick(ctx) {
        pixPosition(ctx);
        updateSlowDecay(ctx);
      },
      onTickWhileDead: updateSlowDecay,
    } };
  },
};
export default lulu;
