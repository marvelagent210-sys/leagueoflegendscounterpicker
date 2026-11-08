import { abilityHasteFor } from "../../engine/sim/cooldowns";
/** Doom belongs to the released cast; Gloom belongs to the actual moving body. */
import type { KitModule } from '../../engine/kits/compile';
import { canCast } from '../../engine/sim/actions';
import { defaultBehavior, type Behavior } from '../../engine/sim/behavior';
import { abilityHit, abilityHitPet, applyEffect, canTarget, directionTo, inStasis, isUntargetable, notifyActualMovement } from '../../engine/sim/combat';
import { ccTypes, derive, evaluate } from '../../engine/sim/derived';
import { petFormulaTarget } from '../../engine/sim/petTarget';
import type { AbilitySpec, Effect, HookContext } from '../../engine/sim/spec';
import type { Pet, Unit, Zone } from '../../engine/sim/state';
import { ticks } from './util';

const GLOOM = 'vex:gloom', DOOM = 'vex:doom', EPS = 1e-6;
const vex: KitModule = {
  champion: 'Vex',
  build(kit) {
    const p = kit.ability('I'), q = kit.ability('Q'), w = kit.ability('W'), e = kit.ability('E'), r = kit.ability('R');
    const doomCD = p.field('staticCooldown'), fearDuration = p.levelValue('Periodically, Vex empowers'),
      fearTable = p.seriesIn('Periodically, Vex empowers', 1), gloomDuration = p.quoted('Gloom for 6 seconds'),
      gloomDamage = { base: p.levelValue("Gloom's detonation deals"), ratios: { AP: p.quoted('(+ 25% AP)') / 100 } },
      gloomNonChampion = p.levelValue('Against non-champions') / 100,
      champRefund = p.quoted("refunds 25% of Doom's cooldown") / 100,
      otherRefund = p.quoted("refunds 10% of Doom's cooldown") / 100,
      detection = p.field('effectRadius'), extension = p.quoted('refresh to 0.5 seconds'),
      dashLockout = p.gameQuoted('"name":"DashLockoutTime","values":[0.5');
    if (fearTable.kind !== 'variable' || fearTable.points.some(x => typeof x !== 'number')) throw new Error('Vex requires exact fear distance bands');
    p.quote('Nearby enemies that become displaced do not count'); p.quote('Soul Unbound recast does not cause');
    p.quote('Gloom can mark clones, but not other pets'); p.quote('Gloom will mark enemies even if they are untargetable');
    p.quote('inside the detection radius when they blink'); p.quote("Doom's cooldown starts as soon as the basic ability is cast");
    p.quote('fear will not be removed when Vex dies'); p.quote("Spell shield will block all of Doom's effects but not Gloom's empowered attack nor mark");
    const qDamage = q.formula('Magic Damage'), qRange = q.field('range'), qWidth = q.field('width', 'Initial'),
      qNarrow = q.field('width', 'Reduced'), qSlow = q.field('speed', 'Initial'), qFast = q.field('speed', 'Increased'),
      qTurn = q.quoted('After travelling 500 units');
    q.gameQuote('"mSpeedValue":3200.0'); q.quote('wherever Vex is at the end of the cast time');
    const wDamage = w.formula('Magic Damage'), wShield = w.formula('Shield Strength'), wDuration = w.quoted('shield for 2.5 seconds'),
      wRadius = w.field('effectRadius', 'Standard'), wDashRadius = w.field('effectRadius', 'Enhanced');
    w.quote('before the cast time'); w.quote("move during Personal Space's cast time"); w.gameQuote('"ObjectName":"VexW"');
    const eDamage = e.formula('Magic Damage'), eSlow = e.fraction('Slow'), eTime = e.quoted('slowing them for 2 seconds'),
      eRange = e.field('targetRange'), eSpeed = e.field('speed'), eRadii = e.fieldNumbers('effectRadius'),
      eMin = eRadii[0]!;
    const eMaxRadius = eRadii.at(-1)!;
    e.gameQuote('"name":"RadiusGrowthRate","values":[13.0'); e.quote("Killing an enemy with Looming Darkness refunds 10%");
    const rDamage = r.formula('Magic Damage'), rDashDamage = r.formula('Magic Damage', 1), rRange = r.field('range'),
      rWidth = r.field('width'), rSpeed = r.field('speed', 'First'), rDashSpeed = r.field('speed', 'Dash'),
      rMarkTime = r.quoted('mark them for 4 seconds'), rCreditTime = r.quoted('within 8 seconds of its application'),
      rResetWindow = r.quoted('again within 12 seconds'), rResetDelay = r.quoted('after 0.5 seconds'),
      rSight = r.quoted('for 0.4 seconds each'), rSightRadius = r.field('effectRadius', 'Missile sight'), rCost = r.cost();
    r.quote('no maximum tracking distance'); r.quote('cannot be recast while grounded or rooted');
    r.quote('first 0.25 seconds of the dash'); r.gameQuote('"ObjectName":"VexR2"');
    kit.assume('Doom starts ready, is spent at basic-spell declaration even on a miss, and its static cooldown is not reduced by ability haste. Each released missile/area retains its own empowered packet. The fear slow interpolates the exact distance bands at impact and lasts only with the accepted fear. E fears away from its actual explosion epicenter. An accepted fear remains after Vex dies; expiry and cleanses still apply.');
    kit.assume('Mistral Bolt changes from 600 speed/360 width to 3200/160 after 500 actual travel units. Its launch hit probability uses the shared model with the initial width/speed; the later narrower geometry is not an additional independent probability roll. The transition is sampled on the 30 Hz simulation grid, without inventing a client acceleration interval.');
    kit.assume('Looming Darkness interpolates radius between 200 and 300 over 0–800 declared cast distance. The wiki intermediate distance points are unknown and client RadiusGrowthRate 13 has no published time/distance unit, so its exact stepped growth remains unverified. Its absolute target location and cast distance are chosen at declaration; later enemy/caster movement cannot retarget or resize the explosion. The projectile launches from the completion position and can be destroyed before arrival, including when no champion is hit.');
    kit.assume('Gloom starts without preloaded marks. Only actual hostile champion, clone or native monster dash/blink events create marks; forced movement and the explicit Yone E return do not. E also marks actual native minions. Runtime pet bodies require summoned:false to identify native minions/monsters; a summoned minion-class pet is not a lane minion. Summoned pets remain excluded except explicit clones. Blink detection uses the origin, not an incoming destination. A single continuing dash grants one mark, with the sourced 0.5-second listener lockout; subsequent distinct eligible movements refresh it. Champion-class clones use non-champion damage/refund because they are not real champions.');
    kit.assume('Shadow Surge pierces nonchampion bodies and stops at the first champion or champion-class clone. The marked body identity, reveal, tracking dash and takedown credit remain separate. Dash speed 2200 is explicitly estimated by the pinned wiki; it is retained as an uncertainty. A successful recast follows the actual marked body without a maximum distance, is displacement immune but grants no general CC/damage immunity, and may cross terrain. There are no fictional second champions or guaranteed resets in a duel.');
    kit.assume('A lethal first Shadow Surge hit can earn its own takedown reset because credit is installed before its damage. The free repeat is available only after 0.5 seconds and before its finite 12-second deadline. When an unused repeat window expires, the ordinary hasted 100-second cooldown begins. The primary only calls this cooldown post-effect and does not quantify the interaction with an unused reset; this explicit expiry policy is an unresolved server timing detail.');

    const flat = (base: number) => ({ base });
    const mark = (target: Unit, tick: number, source: Unit) => target.statuses.find(s => s.kind === 'mark' && s.key === GLOOM && s.source === source.side && s.endTick > tick);
    const isChampion = (target: Unit) => target.petId === undefined;
    const gloomEligible = (ctx: HookContext, target: Unit) => target.petId === undefined || ctx.world.pets.some(pet => pet.id === target.petId && (pet.spec.unitClass === 'clone' || pet.spec.targetClass === 'monster' && pet.spec.summoned === false));
    const refund = (ctx: HookContext, champion: boolean) => { ctx.memory['vex:doomReady'] = Math.max(ctx.tick, Number(ctx.memory['vex:doomReady'] ?? 0) - ticks(doomCD * (champion ? champRefund : otherRefund))); };
    const putGloom = (ctx: HookContext, target: Unit, fromE = false) => {
      const nativeMinion = fromE && ctx.world.pets.some(pet => pet.id === target.petId && pet.spec.targetClass === 'minion' && pet.spec.summoned === false);
      if (!gloomEligible(ctx, target) && !nativeMinion) return;
      target.statuses = target.statuses.filter(s => !(s.kind === 'mark' && s.key === GLOOM && s.source === ctx.self.side));
      target.statuses.push({ kind: 'mark', key: GLOOM, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(gloomDuration), value: 1 });
      if (target.petId !== undefined) { const pet = ctx.world.pets.find(p => p.id === target.petId); if (pet) pet.statuses = target.statuses; }
    };
    const consumeGloom = (ctx: HookContext, target: Unit, blocked = false, scale = 1) => {
      if (!mark(target, ctx.tick, ctx.self)) return;
      target.statuses = target.statuses.filter(s => !(s.kind === 'mark' && s.key === GLOOM && s.source === ctx.self.side));
      if (target.petId !== undefined) { const pet = ctx.world.pets.find(p => p.id === target.petId); if (pet) pet.statuses = target.statuses; }
      refund(ctx, isChampion(target));
      if (!blocked) applyEffect(ctx.world, ctx.self, target, { type: 'damage', damageType: 'magic', amount: flat(evaluate(gloomDamage, ctx.self, target) * (isChampion(target) ? 1 : gloomNonChampion)), label: 'Gloom' }, { scale });
    };
    const doomPacket = (yes: boolean): Effect[] => yes ? [{ type: 'mark', key: DOOM, duration: 0 }] : [];
    const doomSlow = (distance: number) => {
      const pts = fearTable.points as number[], vals = fearTable.values as number[];
      if (distance <= pts[0]!) return vals[0]! / 100;
      for (let n = 1; n < pts.length; n++) if (distance <= pts[n]!) return (vals[n - 1]! + (vals[n]! - vals[n - 1]!) * (distance - pts[n - 1]!) / (pts[n]! - pts[n - 1]!)) / 100;
      return vals.at(-1)! / 100;
    };
    const inDash = (self: Unit) => self.memory['vex:dashTarget'] !== undefined;
    const qSpec: AbilitySpec = { key: 'Q', name: q.name, slot: 'Q', cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castDirection: 'start', delivery: { kind: 'line', range: qRange, width: qWidth, speed: qSlow, radius: qWidth / 2, piercing: true, collisionPet: true }, onHit: [{ type: 'damage', damageType: 'magic', amount: qDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, persistsAfterDeath: true, decisive: true, usable: self => !inDash(self) };
    const wSpec: AbilitySpec = { key: 'W', name: w.name, slot: 'W', cooldown: w.cooldown(), cooldownAtCastStart: true, cost: w.cost(), costAtCastStart: true, castTime: w.castTime(), moveWhileCasting: true, overlay: true, delivery: { kind: 'self' }, roles: ['damage', 'defense'], usable: self => !inDash(self), estimate: (self, target) => evaluate(wDamage, self, target), flags: { spellShield: true, petContactHooks: true } };
    const eSpec: AbilitySpec = { key: 'E', name: e.name, slot: 'E', cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), captureGroundAim: 'start', delivery: { kind: 'circle', range: eRange, radius: eMaxRadius, radiusFor: self => eMin + (eMaxRadius - eMin) * Number(self.memory['vex:eDistance'] ?? 0) / eRange, delay: 0, speed: eSpeed }, onHit: [{ type: 'damage', damageType: 'magic', amount: eDamage }, { type: 'cc', cc: 'slow', duration: eTime, strength: eSlow }], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true, usable: self => !inDash(self) };
    const rSpec: AbilitySpec = { key: 'R', name: r.name, slot: 'R', cooldown: r.cooldown(), cooldownAfter: 'state', cost: rCost, costFor: self => Number(self.memory['vex:resetUntil'] ?? -1) > Number(self.memory['vex:clock'] ?? 0) ? 0 : rCost, castTime: r.castTime(), castDirection: 'start', delivery: { kind: 'line', range: rRange, width: rWidth, speed: rSpeed, radius: rWidth / 2, piercing: true, collisionPet: true }, onHit: [{ type: 'damage', damageType: 'magic', amount: rDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true, usable: (self, world) => !inDash(self) && world.tick >= Number(self.memory['vex:resetReady'] ?? 0) && (self.memory['vex:resetUntil'] === undefined || world.tick < Number(self.memory['vex:resetUntil'])) && (world.tick < Number(self.memory['vex:resetUntil'] ?? -1) || world.tick >= (self.cooldownReady.R ?? 0)) };
    const targetBody = (ctx: HookContext, key = 'vex:rTarget'): { target: Unit; pet?: Pet } | undefined => {
      const id = String(ctx.memory[key] ?? '');
      if (id === 'champion') return { target: ctx.enemy };
      const pet = ctx.world.pets.find(p => String(p.id) === id);
      return pet ? { target: petFormulaTarget(pet, ctx.self, ctx.tick), pet } : undefined;
    };
    const r2Spec: AbilitySpec = { key: 'R2', name: `${r.name} (recast)`, slot: 'R', cooldown: 0, cost: 0, countsAsCast: true, budgetExcluded: true, castTime: 0, delivery: { kind: 'self' }, flags: { grounded: true, knockdown: false, spellShield: true, petContactHooks: true }, roles: ['engage', 'damage'], estimate: (self, target) => evaluate(rDashDamage, self, target), usable: (self, world) => {
      if (inDash(self) || world.tick >= Number(self.memory['vex:rUntil'] ?? -1) || [...ccTypes(self)].some(t => t === 'root' || t === 'ground')) return false;
      const id = String(self.memory['vex:rTarget'] ?? ''), pet = world.pets.find(p => String(p.id) === id), target = id === 'champion' ? world.units[self.side === 0 ? 1 : 0] : pet ? petFormulaTarget(pet, self, world.tick) : undefined;
      return !!target && target.alive && !isUntargetable(target, self);
    } };
    const abilities = [qSpec, wSpec, eSpec, rSpec, r2Spec];
    const releaseR = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === 'state' && s.key === 'lingering' && s.ability === 'R'));
      delete ctx.memory['vex:rTarget']; delete ctx.memory['vex:rUntil'];
    };
    const finishDash = (ctx: HookContext) => {
      delete ctx.memory['vex:dashTarget'];
      ctx.self.statuses = ctx.self.statuses.filter(s => !(s.ability === 'R2' && s.kind === 'state'));
      releaseR(ctx);
    };
    const behavior: Behavior = view => {
      const trade = view.mode === 'trade' ? defaultBehavior(view) : undefined;
      if (view.mode === 'idle' || (view.mode === 'trade' && view.self.memory.tradeDone)) return trade;
      if (canCast(view.world, view.self, wSpec) && view.distance <= wRadius && (view.mode !== 'hold' || view.threats.length > 0)) return { kind: 'cast', ability: 'W' };
      if ((view.mode === 'fight' || view.mode === 'trade') && canCast(view.world, view.self, r2Spec)) return { kind: 'cast', ability: 'R2' };
      if (inDash(view.self)) return undefined;
      return view.mode === 'trade' ? trade : defaultBehavior(view);
    };
    return { abilities, behavior, attack: { onHitToPets: true }, hooks: {
      onStart(ctx) { ctx.memory['vex:doomReady'] = 0; ctx.memory['vex:clock'] = ctx.tick; },
      onCastStart(ctx) {
        ctx.memory['vex:clock'] = ctx.tick;
        if (ctx.ability.key === 'E') ctx.memory['vex:eDistance'] = Math.min(eRange, Math.abs(Number(ctx.memory['castGroundX:E'] ?? ctx.enemy.x) - ctx.self.x));
        if (['Q', 'W', 'E'].includes(ctx.ability.key)) {
          const empowered = ctx.tick >= Number(ctx.memory['vex:doomReady'] ?? 0);
          ctx.memory[`vex:castDoom:${ctx.ability.key}`] = empowered;
          if (empowered) ctx.memory['vex:doomReady'] = ctx.tick + ticks(doomCD);
        }
        if (ctx.ability.key === 'W') {
          ctx.apply({ type: 'shield', amount: wShield, duration: wDuration }, true);
          const effects: Effect[] = [{ type: 'damage', damageType: 'magic', amount: wDamage }, ...doomPacket(!!ctx.memory['vex:castDoom:W'])];
          if (Math.abs(ctx.enemy.x - ctx.self.x) <= (ctx.enemy.action?.kind === 'dash' ? wDashRadius : wRadius) + ctx.enemy.spec.base.radius + EPS) abilityHit(ctx.world, ctx.self, ctx.enemy, wSpec, effects);
          for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.self.x) <= wRadius + pet.spec.radius + EPS) abilityHitPet(ctx.world, ctx.self, pet, wSpec, effects, 'area');
        }
        if (ctx.ability.key === 'R') {
          ctx.apply({ type: 'state', state: 'lingering', duration: ctx.world.settings.maxSeconds }, true);
          delete ctx.memory['vex:resetUntil']; delete ctx.memory['vex:resetReady'];
        }
        if (ctx.ability.key === 'R2') {
          ctx.memory['vex:dashTarget'] = String(ctx.memory['vex:rTarget']); ctx.memory['vex:dashStart'] = ctx.tick;
          for (const state of ['displacementImmune', 'noMovement', 'noAttacks'] as const) ctx.apply({ type: 'state', state, duration: ctx.world.settings.maxSeconds }, true);
        }
      },
      onMissileCreated(ctx) {
        if (ctx.ability.key === 'Q') { ctx.missile.onHit = [...ctx.missile.onHit, ...doomPacket(!!ctx.memory['vex:castDoom:Q'])]; ctx.memory[`vex:qOrigin:${ctx.missile.id}`] = ctx.missile.x; }
      },
      onZoneCreated(ctx) {
        if (ctx.ability.key !== 'E') return;
        ctx.zone.onHit = [...(ctx.zone.onHit ?? []), ...doomPacket(!!ctx.memory['vex:castDoom:E'])];
      },
      onMissileTick(ctx) {
        if (ctx.missile.source !== 'Q') return;
        if (Math.abs(ctx.missile.x - Number(ctx.memory[`vex:qOrigin:${ctx.missile.id}`])) + EPS >= qTurn) { ctx.missile.perTick = qFast / 30; ctx.missile.radius = qNarrow / 2; }
      },
      onAbilityContact(ctx) {
        if (ctx.ability.key === 'E' && ctx.defense !== 'parry') putGloom(ctx, ctx.enemy, true);
        const empowered = ctx.effects.some(f => f.type === 'mark' && f.key === DOOM);
        const effects = ctx.effects.filter(f => !(f.type === 'mark' && f.key === DOOM));
        if (empowered) {
          effects.push({ type: 'cc', cc: 'fear', duration: fearDuration, ...(ctx.ability.key === 'E' ? { fearOriginX: ctx.originX } : {}) });
        }
        return effects;
      },
      beforeAbilityHit(ctx) {
        if (ctx.ability.key === 'Q' || ctx.ability.key === 'W') consumeGloom(ctx, ctx.enemy, false, ctx.scale);
        if (ctx.ability.key === 'E' && ctx.enemy.petId === undefined) ctx.memory['vex:eChampionHadDeath'] = ctx.enemy.deathNotified === true;
        if (ctx.ability.key === 'R' && (ctx.enemy.petId === undefined || ctx.world.pets.some(pet => pet.id === ctx.enemy.petId && pet.spec.targetClass === 'champion'))) {
          ctx.memory['vex:rTarget'] = ctx.enemy.petId === undefined ? 'champion' : String(ctx.enemy.petId);
          ctx.memory['vex:rUntil'] = ctx.tick + ticks(rMarkTime); ctx.memory['vex:rCreditUntil'] = ctx.tick + ticks(rCreditTime);
          ctx.memory['vex:rCreditTarget'] = String(ctx.memory['vex:rTarget']);
          applyEffect(ctx.world, ctx.self, ctx.enemy, { type: 'state', state: 'revealed', duration: rMarkTime }, { ability: rSpec, scale: 1 });
        }
      },
      onAbilityHit(ctx) {
        const fear = ctx.enemy.statuses.find(s => s.kind === 'cc' && s.key === 'fear' && s.source === ctx.self.side && s.startTick === ctx.tick && s.ability === ctx.ability.key);
        if (fear) {
          if (ctx.enemy.petId === undefined) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: 'knockdown' }, { scale: 1, ability: ctx.ability });
          applyEffect(ctx.world, ctx.self, ctx.enemy, { type: 'cc', cc: 'slow', strength: doomSlow(Math.abs(ctx.enemy.x - ctx.self.x)), duration: (fear.endTick - ctx.tick) / 30, whileCC: 'fear' }, { scale: 1, ability: ctx.ability });
        }
        if (ctx.ability.key === 'E' && ctx.enemy.petId === undefined) {
          if (!ctx.memory['vex:eChampionHadDeath'] && ctx.enemy.deathNotified) refund(ctx, true);
          delete ctx.memory['vex:eChampionHadDeath'];
        }
      },
      onMissileContact(ctx) {
        if (ctx.missile.source !== 'R' || ctx.targetPet && ctx.targetPet.spec.targetClass !== 'champion') return;
        // Claimed contact endings do not also run the shared range-end callback.
        // A blocked hit installed no mark, so nothing can keep the post-effect clock held.
        if (ctx.memory['vex:rTarget'] === undefined) releaseR(ctx);
        ctx.missile.ended = true;
      },
      onMissileMove(ctx) {
        if (ctx.missile.source === 'R' && Math.abs(ctx.enemy.x - ctx.missile.x) <= rSightRadius) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: 'state', state: 'standardSight', duration: rSight }, { scale: 1, ability: rSpec });
      },
      onMissileEnd(ctx) { if (ctx.missile.source === 'Q') delete ctx.memory[`vex:qOrigin:${ctx.missile.id}`]; if (ctx.missile.source === 'R' && ctx.memory['vex:rTarget'] === undefined) releaseR(ctx); },
      onActualMovement(ctx) {
        if (ctx.target.side === ctx.self.side || !['dash', 'blink'].includes(ctx.movement.kind) || ctx.movement.ability === 'Ereturn' && ctx.target.spec.id === 'Yone') return;
        if (ctx.targetPet && !gloomEligible(ctx, ctx.target)) return;
        const origin = ctx.movement.kind === 'blink' ? ctx.movement.from : ctx.movement.to;
        if (Math.abs(origin - ctx.self.x) > detection + EPS) return;
        const id = ctx.targetPet ? `pet${ctx.targetPet.id}` : 'champion', event = `${ctx.movement.ability}:${ctx.movement.startTick ?? ctx.movement.endTick}`;
        if (ctx.memory[`vex:movement:${id}`] === event || ctx.tick < Number(ctx.memory[`vex:movementReady:${id}`] ?? 0)) return;
        ctx.memory[`vex:movement:${id}`] = event; ctx.memory[`vex:movementReady:${id}`] = ctx.tick + ticks(dashLockout); putGloom(ctx, ctx.target);
      },
      onAttack(ctx) {
        const m = mark(ctx.enemy, ctx.tick, ctx.self);
        if (m) { m.endTick = Math.max(m.endTick, ctx.tick + ticks(extension)); ctx.action.missileSpeed = 0; }
      },
      onAttackBeforeDamage(ctx) { consumeGloom(ctx, ctx.enemy, ctx.blocked, ctx.scale); },
      onKill(ctx) { if (ctx.damage?.ability === 'E' || ctx.damage?.ability === e.name) refund(ctx, !ctx.pet); },
      onDeathObserved(ctx) {
        if (ctx.targetPet || ctx.source.side !== ctx.self.side || ctx.tick > Number(ctx.memory['vex:rCreditUntil'] ?? -1) || ctx.memory['vex:rCreditTarget'] !== 'champion') return;
        ctx.memory['vex:resetReady'] = ctx.tick + ticks(rResetDelay); ctx.memory['vex:resetUntil'] = ctx.tick + ticks(rResetWindow);
        ctx.self.cooldownReady.R = ctx.tick + ticks(rResetDelay); delete ctx.self.cooldownHeld.R; releaseR(ctx);
      },
      onTick(ctx) {
        ctx.memory['vex:clock'] = ctx.tick;
        if (ctx.memory['vex:resetUntil'] !== undefined && ctx.tick >= Number(ctx.memory['vex:resetUntil'])) {
          const ended = Number(ctx.memory['vex:resetUntil']);
          delete ctx.memory['vex:resetUntil']; delete ctx.memory['vex:resetReady'];
          ctx.self.cooldownReady.R = ended + ticks(rSpec.cooldown / (1 + abilityHasteFor(ctx.self, { slot: "R" }) / 100));
        }
        if (ctx.memory['vex:rTarget'] !== undefined && !inDash(ctx.self) && (ctx.tick >= Number(ctx.memory['vex:rUntil']) || !targetBody(ctx)?.target.alive)) releaseR(ctx);
        if (!inDash(ctx.self)) return;
        const body = targetBody(ctx, 'vex:dashTarget');
        if (!body?.target.alive) { finishDash(ctx); return; }
        if (inStasis(ctx.self)) return;
        const from = ctx.self.x, gap = Math.max(0, Math.abs(body.target.x - from) - ctx.self.spec.base.radius - body.target.spec.base.radius), moved = Math.min(gap, rDashSpeed / 30);
        ctx.self.x += Math.sign(body.target.x - from) * moved;
        const done = gap <= moved + EPS;
        notifyActualMovement(ctx.world, ctx.self, from, { kind: 'dash', startTick: Number(ctx.memory['vex:dashStart']), endTick: ctx.tick, ended: done, ability: 'R2' });
        if (!done) return;
        if (body.pet) abilityHitPet(ctx.world, ctx.self, body.pet, r2Spec, [{ type: 'damage', damageType: 'magic', amount: rDashDamage }]);
        else abilityHit(ctx.world, ctx.self, body.target, r2Spec, [{ type: 'damage', damageType: 'magic', amount: rDashDamage }]);
        finishDash(ctx);
      },
    }, budget: {
      damage(self, target) { const haste = 1 + derive(self).abilityHaste / 100; return { magic: evaluate(gloomDamage, self, target) / (eSpec.cooldown / haste + eSpec.castTime) + evaluate(rDashDamage, self, target) / (rSpec.cooldown / haste + rSpec.castTime) + evaluate(wDamage, self, target) / (wSpec.cooldown / haste + wSpec.castTime) }; },
      healing(self) { return evaluate(wShield, self) / (wSpec.cooldown / (1 + derive(self).abilityHaste / 100) + wSpec.castTime); },
    } };
  },
};
export default vex;
