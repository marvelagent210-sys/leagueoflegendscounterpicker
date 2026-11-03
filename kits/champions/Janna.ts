/** Janna: an anchored charging whirlwind, real shield recipients and interruptible Monsoon. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack, resolveSkillshot, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, heal, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Missile, Pet, Unit, World } from "../../engine/sim/state";
import { between, seriesAt, ticks } from "./util";

const EPSILON = 1e-6, CHARGE = "janna:qCharge", START = "janna:qStart", PULSE = "janna:rPulse";
type Body = { target: Unit; pet?: Pet };

const janna: KitModule = {
  champion: "Janna",
  build(kit) {
    const p = kit.ability("Tailwind"), q = kit.ability("Howling Gale"), w = kit.ability("Zephyr"), e = kit.ability("Eye of the Storm"), r = kit.ability("Monsoon");
    const auraRange = p.field("effectRadius"), auraMS = p.quoted("grants 6% bonus movement speed") / 100;
    const tailwind = { base: 0, ratios: { bonusMoveSpeed: p.quoted("equal to 30% of her bonus movement speed") / 100 } };
    p.quote("facing in the direction of her location");
    const chargeTime = q.quoted("charges up over 3 seconds"), flight = q.quoted("over 1.25 seconds"), qWidth = q.field("width"), qCD = q.cooldown();
    const ranges = q.fieldNumbers("range"), speeds = q.fieldNumbers("speed"), qMin = q.formula("Minimum Magic Damage"), qMax = q.formula("Maximum Magic Damage");
    q.formula("Bonus Damage Per Second");
    const qCC = q.seriesIn("knocking them up for");
    q.quote("Howling Gale's direction is determined by this cast"); q.quote("The storm does not interact with enemy units that stand on top of it while it is charging");
    q.quote("The initial cast and the manual recast count as ability activations"); q.textField("cooldownStart");
    q.gameQuote('"name":"MaxDuration","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]');
    q.gameQuote('"name":"ChargeKnockup","values":[0.25,0.25,0.25,0.25,0.25,0.25,0.25]');
    const wMS = { base: w.baseOf("Bonus Movement Speed") / 100, ratios: { AP: w.quoted("(+ 2% per 100 AP)") / 10000 } }, wSlow = { base: w.baseOf("Slow") / 100, ratios: { AP: w.quoted("(+ 6% per 100 AP)") / 10000 } }, slowCap = w.quoted("capped at 99%") / 100;
    const wDamage = w.formula("Magic Damage"), wDuration = w.quoted("slows them for 2 seconds"), wCD = w.cooldown(), wCast = w.castTime();
    w.quote("Janna is ghosted"); w.quote("{{Unit-targeted cancel conditions}}");
    w.gameQuote('"mSpeed":1600.0');
    const shield = e.formula("Shield Strength"), ad = e.formula("Bonus Attack Damage"), eTime = e.quoted("shield for 4 seconds"), eRange = e.field("targetRange"), forgiveness = e.quoted("forgiveness radius of 175 units"), eCD = e.cooldown();
    const refund = e.quoted("20% of Eye of the Storm's cooldown is refunded") / 100;
    e.quote("This may occur once per spell cast"); e.quote("While the shield holds");
    e.gameQuote('"name":"DecayGracePeriod","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]');
    const rRange = r.field("effectRadius"), pushTo = r.quoted("up to 875 units"), pushTime = r.quoted("over 0.5 seconds"), rTime = r.quoted("channels for up to 3 seconds"), rInterval = r.quoted("every 0.25 seconds"), rHeal = r.formula("Heal Per Tick"), rTotal = r.formula("Total Heal"), rCD = r.cooldown();
    r.quote("though not through terrain"); r.textField("cooldownStart");
    r.gameQuote('"name":"Range","values":[700.0,700.0,700.0,700.0,700.0,700.0,700.0]');
    const allies = (world: World, self: Unit) => world.pets.filter(pet => pet.owner === self.side && pet.hp > 0 && pet.spec.targetClass === "champion" && !pet.spec.hitPoints && !pet.spec.fixedDamage && !pet.spec.untargetable);
    const sync = (body: Body) => { if (body.pet) { body.pet.statuses = body.target.statuses; body.pet.hp = body.target.hp; } };
    const allBodies = (ctx: HookContext): Body[] => [{ target: ctx.self }, ...allies(ctx.world, ctx.self).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
    const chooseAlly = (world: World, self: Unit, aim?: Aim) => {
      const candidates = allies(world, self).filter(pet => Math.abs(pet.x - self.x) <= eRange + EPSILON && canTargetPet(pet, self, world.tick));
      if (aim?.distance === undefined) return undefined;
      const enemy = world.units[self.side === 0 ? 1 : 0], cursor = self.x + directionTo(self, enemy) * aim.direction * aim.distance;
      return candidates.sort((a, b) => Math.abs(a.x - cursor) - Math.abs(b.x - cursor) || a.id - b.id)[0];
    };
    const age = (world: World, self: Unit) => Math.min(chargeTime, Math.max(0, (world.tick - Number(self.memory[START] ?? world.tick)) / 30));
    const qRange = (seconds: number) => ranges[0]! + (ranges.at(-1)! - ranges[0]!) * seconds / chargeTime;
    const qSpeed = (seconds: number) => speeds[0]! + (speeds.at(-1)! - speeds[0]!) * seconds / chargeTime;
    const qEffects = (seconds: number): Effect[] => [{ type: "damage", damageType: "magic", amount: between(qMin, qMax, seconds / chargeTime) }, { type: "cc", cc: "airborne", duration: seriesAt(qCC, seconds, true) }];
    const hit: AbilitySpec = { key: "Q-hit", name: q.name, slot: "Q", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, onHit: qEffects(0), decisive: true, flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true, usable: () => false };
    const charge: AbilitySpec = { key: "Q-charge", name: `${q.name} (charging)`, slot: "other", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, persistsAfterDeath: true, usable: () => false };
    const blast: AbilitySpec = { key: "R-blast", name: r.name, slot: "R", activation: "internal", countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true, petContactHooks: true }, usable: () => false };
    const launch = (ctx: HookContext) => {
      const pending = ctx.world.missiles.find(m => m.id === ctx.memory[CHARGE] && m.owner === ctx.self.side && m.source === charge.key && !m.ended);
      if (!pending) { delete ctx.memory[CHARGE]; return; }
      pending.ended = true; delete ctx.memory[CHARGE];
      const seconds = age(ctx.world, ctx.self), range = qRange(seconds), speed = qSpeed(seconds), forward = (ctx.enemy.x - pending.x) * pending.direction;
      const inLine = forward >= -ctx.enemy.spec.base.radius - EPSILON && forward <= range + ctx.enemy.spec.base.radius + EPSILON;
      const decision = inLine ? resolveSkillshot(ctx.world, ctx.self, ctx.enemy, hit, pending.seenTick, Math.max(0, forward - ctx.enemy.spec.base.radius) / speed, qWidth / 2) : { connects: false, scale: 1 };
      const missile: Missile = { id: ctx.world.nextId++, owner: ctx.self.side, source: hit.key, seenTick: pending.seenTick, x: pending.x, direction: pending.direction, perTick: speed / 30, travelLeft: range, homing: false, projectile: true, piercing: true, collisionPet: true, onHit: qEffects(seconds), connects: decision.connects, scale: decision.scale };
      ctx.world.missiles.push(missile);
      if (decision.split !== undefined) ctx.queueSplit({ missile: missile.id, chance: decision.split });
    };
    const refundE = (ctx: HookContext, identity: number) => {
      if (ctx.memory[`janna:refunded:${identity}`]) return;
      ctx.memory[`janna:refunded:${identity}`] = true;
      const ready = ctx.self.cooldownReady.E ?? ctx.tick, remaining = Math.max(0, ready - ctx.tick);
      ctx.self.cooldownReady.E = ctx.tick + Math.max(0, Math.ceil(remaining * (1 - refund) - 1e-9));
    };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", allowedDuringChannel: ["R"], budgetExcluded: true, cooldown: qCD, cooldownAtCastStart: true, cost: q.cost(), castTime: q.castTime(), castOrigin: "start", castDirection: "start", delivery: { kind: "self" }, roles: ["damage", "cc"], usable: self => self.memory[CHARGE] === undefined, estimate: (self, target) => evaluate(qMin, self, target) },
      { key: "Q2", name: `${q.name} (release)`, slot: "Q", allowedDuringChannel: ["R"], budgetExcluded: true, cooldown: 0, cost: 0, castTime: 0, delivery: { kind: "self" }, roles: ["damage", "cc"], usable: self => self.memory[CHARGE] !== undefined },
      { key: "W", name: w.name, slot: "W", allowedDuringChannel: ["R"], budgetExcluded: true, cooldown: wCD, cost: w.cost(), castTime: wCast, cancelOnInvalidTarget: true, delivery: { kind: "target", range: w.field("targetRange"), edge: true, missileSpeed: w.field("speed") }, flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield"), petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: wDamage }, { type: "cc", cc: "slow", duration: wDuration, strength: Math.min(slowCap, wSlow.base) }], roles: ["damage", "cc"] },
      { key: "E", name: e.name, slot: "E", allowedDuringChannel: ["R"], budgetExcluded: true, cooldown: eCD, cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, roles: ["defense", "buff"] },
      { key: "R", name: r.name, slot: "R", budgetExcluded: true, cooldown: rCD, cooldownAtCastStart: true, cost: r.cost(), castTime: r.castTime(), delivery: { kind: "self" }, roles: ["defense", "cc"], channel: { duration: rTime, interruptible: true, cancelAfter: 0, cancelAttackAfter: 0 }, castThreat: false },
      hit, charge, blast,
    ];
    const byKey = (key: string) => abilities.find(a => a.key === key)!;
    const behavior: Behavior = view => {
      const { self, enemy, world, mode } = view;
      const ordinary = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [] } } });
      if (mode === "idle") return ordinary;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      if (self.action?.kind === "channel" && self.action.ability === "R") return undefined;
      if (self.action && self.action.kind !== "windup") return ordinary;
      const ready = (key: string) => canCast(world, self, byKey(key));
      const missing = derive(self).maxHp - self.hp;
      if (mode === "fight" && ready("R") && missing > evaluate(rTotal, self) * .5 && (view.threats.length > 0 || Math.abs(enemy.x - self.x) <= rRange)) return { kind: "cast", ability: "R" };
      if (ready("E") && !self.statuses.some(s => s.kind === "shield" && s.key === "E" && s.value > 0) && (view.threats.some(t => t.damage > 0 && t.eta <= ticks(eTime)) || (mode !== "flee" && canStartAttack(world, self)))) return { kind: "cast", ability: "E" };
      if (ready("Q2")) {
        const pending = world.missiles.find(m => m.id === self.memory[CHARGE]);
        if (pending) {
          const seconds = age(world, self), speed = qSpeed(seconds), ahead = (enemy.x - pending.x) * pending.direction;
          const chance = skillshotChance(world, enemy, pending.seenTick, Math.max(0, ahead - enemy.spec.base.radius) / speed, qWidth / 2);
          if (mode === "flee" || seconds >= chargeTime / 2 || (ahead >= -enemy.spec.base.radius && ahead <= qRange(seconds) + enemy.spec.base.radius && chance >= .65)) return { kind: "cast", ability: "Q2" };
        }
      }
      if (ready("W")) return { kind: "cast", ability: "W" };
      if (ready("Q") && canSee(enemy, self) && Math.abs(enemy.x - self.x) <= ranges.at(-1)! + enemy.spec.base.radius && (mode !== "flee" || Math.abs(enemy.x - self.x) <= ranges[0]!)) return { kind: "cast", ability: "Q" };
      return ordinary;
    };
    kit.assume("Tailwind never grants Janna her own directional allied movement aura. Actual living Champion-class allied pets can receive the six-percent aura only after their own real displacement or basic-attack declaration establishes a heading toward her. Unknown stationary orientation is not fabricated; a stationary body retains its last observed heading. The proc is one thirty-percent bonus-movement-speed on-hit, distinct from Zephyr's already included same ratio. No allied champion, turret or minion wave body is invented.");
    kit.assume("Howling Gale anchors its origin and firing direction at the initial instant cast; Janna can walk, attack and cast while it charges, and charging causes no contacts. Manual release is a second activation, automatic release is not. Range and speed interpolate the pinned field endpoints over three seconds and retain a 1.25-second full flight. Damage interpolates its primary minimum/maximum by actual charge duration. Primary knockup series caps at 1.25 seconds after 1.5 charged seconds; the binary instead encodes 0.5+0.25 per second up to 3 seconds. The primary series controls this documented conflict. Width 240 is the sidestep width; no unsourced longitudinal endpoint radius is added. A real missile traverses actual hostile bodies, with area pet scaling, projectile destruction and one CC refund per launched storm. The anchored charge and released flight may finish after caster death; neither rearms on resurrection. Full hit/miss branching applies to decisive control.");
    kit.assume("Zephyr's ghosting and sourced ten-percent plus AP movement bonus persist through its active cooldown: the pinned primary does not say they are disabled on cast. Its 550 edge range, 0.245-second cast, 1600 homing flight, dynamic AP slow capped 99%, target-loss cancellation, spell shield and parry use shared rules. Primary damage already includes Tailwind's thirty-percent bonus-movement-speed ratio, so it is not added twice. No unsupported unit-targeted pet command is invented for W.");
    kit.assume("Eye of the Storm defaults to self; an explicit aimed cast can select an actual living Champion-class ally within 800. The sourced 175 forgiveness is a pending-target allowance, not extra declaration range; the instantaneous cast has no pending target-loss window. Shields refresh their own source/ability layer and its bonus AD is active only while that exact positive shield holds, including synchronous shield breaking and owner death. Primary shield lasts 4 seconds; binary DecayGracePeriod is also 4 seconds, so no unquoted earlier decay curve is invented despite the blurb mentioning decay. Turrets and their kill-credit transfer require an actual turret entity and are outside this arena. Accepted slow/airborne against an actual enemy Champion-class recipient refunds 20% of remaining E cooldown once per spell instance; damage-only contact and denied control give no refund.");
    kit.assume("Monsoon instantly contacts real hostile bodies within 700 center range, pushing each outward toward 875 center separation over 0.5 seconds with terrain collision and real control defenses; no guessed lateral movement is added. Its stationary interruptible 3-second channel emits exactly twelve quarter-second heals using absolute tick deadlines, to self and actual nearby targetable Champion-class allies. Each pulse uses current stats and recipient healing rules. Moving, attacking, ordinary casting, disabling control, death and resurrection stop future healing. Fight may use R against visible threats after significant missing health; hold/trade/flee reserve it. Completed trades retreat before optional actions.");
    kit.assume("Reference allocation uses self-only E shield and AD uptime, the primary minimum-charge Q per cooldown, one Zephyr and its included Tailwind ratio per cooldown, basic Tailwind procs and a sustained Monsoon healing rate including channel time. It does not price imagined allies, E cooldown-refund chains, guaranteed charged hits or turret damage. Actual scenarios still require mana, real contacts, active shields, missing health and mode policy.");
    return {
      abilities, behavior,
      start: [{ type: "stat", stat: "moveSpeedPercent", amount: wMS, duration: Infinity }],
      attack: { onHitToPets: true, onHit: [{ type: "damage", damageType: "magic", amount: tailwind, noLifeSteal: true, label: p.name, petDamageCategory: "proc" }] },
      budget: {
        damage(self, target) {
          const d = derive(self), haste = 1 + d.abilityHaste / 100, qRate = haste / qCD, wRate = 1 / (wCD / haste + wCast), uptime = Math.min(1, eTime * haste / eCD);
          return { physical: evaluate(ad, self) * uptime * d.attackSpeed * (1 + d.critChance * (d.critDamage - 1)), magic: evaluate(qMin, self, target) * qRate + evaluate(wDamage, self, target) * wRate };
        },
        healing(self) { const haste = 1 + derive(self).abilityHaste / 100; return evaluate(shield, self) * haste / eCD + evaluate(rTotal, self) / (rCD / haste + rTime); },
      },
      hooks: {
        onStart(ctx) { ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === "stat" && s.memoKey === "effect:moveSpeedPercent" && s.source === ctx.self.side)); ctx.buff("janna:wMovement", "moveSpeedPercent", evaluate(wMS, ctx.self), Infinity); applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "ghosted", duration: Infinity }, { ability: byKey("W"), scale: 1 }); },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            const id = ctx.world.nextId++;
            ctx.memory[CHARGE] = id; ctx.memory[START] = ctx.tick;
            ctx.world.missiles.push({ id, owner: ctx.self.side, source: charge.key, seenTick: ctx.tick, x: Number(ctx.memory["castOrigin:Q"] ?? ctx.self.x), direction: Number(ctx.memory["castDirection:Q"] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1, perTick: 0, travelLeft: Infinity, homing: false, projectile: false, connects: false, scale: 1, onHit: [], piercing: true, perceptionHidden: true });
          }
          if (ctx.ability.key === "Q2") launch(ctx);
          if (ctx.ability.key === "E") {
            const pet = chooseAlly(ctx.world, ctx.self, ctx.aim), target = pet ? petFormulaTarget(pet, ctx.self, ctx.tick) : ctx.self;
            target.statuses = target.statuses.filter(s => !(s.source === ctx.self.side && ((s.kind === "shield" && s.key === "E") || (s.kind === "stat" && s.memoKey === "E:AD"))));
            applyEffect(ctx.world, ctx.self, target, { type: "shield", amount: shield, duration: eTime }, { ability: ctx.ability, scale: 1 });
            applyEffect(ctx.world, ctx.self, target, { type: "stat", stat: "AD", amount: ad, duration: eTime, requiresShield: true }, { ability: ctx.ability, scale: 1 });
            sync({ target, pet });
          }
          if (ctx.ability.key === "R") {
            ctx.memory[PULSE] = 1; ctx.memory["janna:rStart"] = ctx.tick;
            const bodies: Body[] = [{ target: ctx.enemy }, ...ctx.world.pets.filter(pet => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, ctx.self, ctx.tick), pet }))];
            for (const body of bodies) {
              const distance = Math.abs(body.target.x - ctx.self.x); if (distance > rRange + EPSILON) continue;
              const effects: Effect[] = [{ type: "displace", direction: "away", distance: Math.max(0, pushTo - distance), duration: pushTime, stopAtWall: true }];
              if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, blast, effects, "area"); else abilityHit(ctx.world, ctx.self, body.target, blast, effects);
            }
          }
        },
        onAbilityContact(ctx) { if (ctx.ability.key === "W") return ctx.effects.map(effect => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: Math.min(slowCap, evaluate(wSlow, ctx.self)) } : effect); },
        onMissileCreated(ctx) { if (ctx.ability.key === "W") ctx.missile.onHit = ctx.missile.onHit.map(effect => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: Math.min(slowCap, evaluate(wSlow, ctx.self)) } : effect); },
        onAbilityHit(ctx) {
          if (!["W", hit.key, blast.key].includes(ctx.ability.key) || (ctx.enemy !== ctx.world.units[ctx.enemy.side] && ctx.enemy.spec.targetClass !== "champion")) return;
          if (!ctx.enemy.statuses.some(s => s.kind === "cc" && ["slow", "airborne"].includes(s.key) && s.source === ctx.self.side && s.ability === ctx.ability.key && s.startTick === ctx.tick)) return;
          if (ctx.ability.key === blast.key) refundE(ctx, Number(ctx.memory["janna:rCast"] ?? ctx.tick));
          else ctx.memory[`janna:accepted:${ctx.ability.key}:${ctx.enemy.petId ?? "champion"}`] = ctx.tick;
        },
        onCastStart(ctx) { if (ctx.ability.key === "R") ctx.memory["janna:rCast"] = ctx.world.nextId++; },
        onMissileContact(ctx) {
          if (!["W", hit.key].includes(ctx.missile.source)) return;
          const key = `janna:accepted:${ctx.missile.source}:${ctx.targetPet?.id ?? "champion"}`;
          if (ctx.memory[key] === ctx.tick) { delete ctx.memory[key]; refundE(ctx, ctx.missile.id); }
        },
        onMissileTick(ctx) {
          if (ctx.missile.source === charge.key && ctx.tick >= Number(ctx.memory[START] ?? Infinity) + ticks(chargeTime)) launch(ctx);
        },
        onOwnedPetAttack(ctx) { const delta = ctx.target.x - ctx.pet.x; if (Math.abs(delta) > EPSILON) ctx.pet.memory["janna:heading"] = Math.sign(delta); },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") delete ctx.memory[PULSE]; },
        onTick(ctx) {
          ctx.buff("janna:wMovement", "moveSpeedPercent", evaluate(wMS, ctx.self), Infinity);
          for (const missile of ctx.world.missiles) if (missile.owner === ctx.self.side && missile.source === "W") missile.onHit = missile.onHit.map(effect => effect.type === "cc" && effect.cc === "slow" ? { ...effect, strength: Math.min(slowCap, evaluate(wSlow, ctx.self)) } : effect);
          if (!ctx.self.statuses.some(s => s.kind === "state" && s.key === "ghosted" && s.ability === "W")) applyEffect(ctx.world, ctx.self, ctx.self, { type: "state", state: "ghosted", duration: Infinity }, { ability: byKey("W"), scale: 1 });
          if (ctx.memory[CHARGE] !== undefined && !ctx.world.missiles.some(m => m.id === ctx.memory[CHARGE] && !m.ended)) delete ctx.memory[CHARGE];
          for (const pet of allies(ctx.world, ctx.self)) {
            const previous = Number(pet.memory["janna:lastX"] ?? pet.x), delta = pet.x - previous; pet.memory["janna:lastX"] = pet.x;
            if (Math.abs(delta) > EPSILON) pet.memory["janna:heading"] = Math.sign(delta);
            const key = `janna:tailwind:${ctx.self.side}`; pet.statuses = (pet.statuses ?? []).filter(s => s.memoKey !== key);
            const toSelf = ctx.self.x - pet.x;
            if (Math.abs(toSelf) > auraRange + EPSILON || Math.abs(toSelf) <= EPSILON || Math.sign(toSelf) !== pet.memory["janna:heading"] || !canTargetPet(pet, ctx.self, ctx.tick)) continue;
            pet.statuses.push({ kind: "stat", key: "moveSpeedPercent", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + 1, value: auraMS, memoKey: key });
          }
          const channel = ctx.self.action;
          if (channel?.kind !== "channel" || channel.ability !== "R") { delete ctx.memory[PULSE]; return; }
          let pulse = Number(ctx.memory[PULSE] ?? 1);
          while (pulse <= Math.round(rTime / rInterval) && ctx.tick >= Number(ctx.memory["janna:rStart"]) + ticks(pulse * rInterval)) {
            for (const body of allBodies(ctx)) {
              if (Math.abs(body.target.x - ctx.self.x) > rRange + EPSILON || inStasis(body.target) || (body.pet && isUntargetable(body.target, ctx.self))) continue;
              heal(ctx.world, body.target, evaluate(rHeal, ctx.self)); sync(body);
            }
            pulse++;
          }
          ctx.memory[PULSE] = pulse;
        },
      },
    };
  },
};
export default janna;
