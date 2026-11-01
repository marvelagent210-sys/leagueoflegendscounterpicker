/** Real blooms, a finite commanded clone and the two separate Pop Blossom clocks. */
import type { KitModule } from '../../engine/kits/compile';
import { canCast, startCast } from '../../engine/sim/actions';
import { defaultBehavior, type Behavior } from '../../engine/sim/behavior';
import { abilityHit, abilityHitPet, applyEffect, canTarget, inStasis, isUntargetable, notifyActualMovement } from '../../engine/sim/combat';
import { ccTypes, derive, evaluate, hasState } from '../../engine/sim/derived';
import { petFormulaTarget } from '../../engine/sim/petTarget';
import { petEffects, spawnPet } from '../../engine/sim/pets';
import { terrainLimit } from '../../engine/sim/terrain';
import type { AbilitySpec, Effect, Formula, HookContext } from '../../engine/sim/spec';
import type { Pet, Unit, Zone } from '../../engine/sim/state';
import { ticks } from './util';

const CLONE = 'neeko-shapesplitter', EPS = 1e-6;
const neeko: KitModule = {
  champion: 'Neeko',
  build(kit) {
    const p = kit.ability('I'), q = kit.ability('Q'), w = kit.ability('W'), e = kit.ability('E'), r = kit.ability('R');
    const initial = q.formula('Initial Magic Damage'), subsequent = q.formula('Subsequent Magic Damage'), monsterBonus = q.number('Bonus Monster Damage'),
      bloomDelay = q.quoted('after 0.75 seconds'), blooms = q.quoted('up to 2 times per cast'), qRange = q.field('range'), qRadius = q.field('effectRadius');
    q.quote('Spell shield blocks an instance of damage but does not prevent subsequent Blooms'); q.gameQuote('"ObjectName":"NeekoQ"');
    const passiveDamage = w.formula('Bonus Magic Damage'), passiveHaste = w.fraction('Bonus Movement Speed'),
      activeHaste = w.formula('Bonus Movement Speed', 1).base / 100, stacks = w.quoted('stacks up to 2 times'), passiveTime = w.quoted('for 1 second'),
      monsterAttack = w.quoted('75 bonus magic damage'), cloneTime = w.quoted('clone lasts for 3 seconds'), invisible = w.quoted('invisible for 0.5 seconds'),
      cloneDamageDelay = w.quoted('disappear prematurely after 0.5 seconds'), moveRange = w.field('targetRange');
    w.quote('cooldown'); w.gameQuote('"name":"CloneDamageTimer","values":[0.0,0.75');
    w.quote("A '''clone''' is a copy of a champion that is considered a champion");
    w.quote('Recasting Shapesplitter does not count as an ability activation'); w.quote('Using a basic attack breaks stealth at the start');
    const eDamage = e.formula('Magic Damage'), root = e.number('Root Duration'), empoweredRoot = e.number('Empowered Root Duration'),
      eSpeed = e.field('speed', 'Standard'), eFast = e.field('speed', 'Empowered'), eWidth = e.field('width', 'Standard'), eWide = e.field('width', 'Empowered');
    e.quote('Spell shield will not prevent the missile to become empowered'); e.gameQuote('"ObjectName":"NeekoE"');
    const rDamage = r.formula('Magic Damage'), windup = r.quoted('over 1.25 seconds'), leapTime = r.quoted('for 0.6 seconds'),
      stunTime = r.quoted('for 0.75 seconds'), rAirRadius = r.field('effectRadius', 'Knock up'), rRadius = r.field('effectRadius', 'Burst'),
      disguiseReveal = r.quoted('after 0.5 seconds');
    r.quote('Pop Blossom can start its cast time during stasis'); r.quote('Spell shield will block either the knock up or damage and stun, but not both');
    r.gameQuote('"name":"DelayUntilReveal","values":[0.0,1.25');
    const gatherRange = p.quoted("|custominfo = {{tip|cr|icononly = true}} 400"), gatherTime = p.quoted("Sho'Ma over 2 seconds"),
      disguiseCD = p.quoted('on a 1-second cooldown'), breakCD = p.quoted('on a 2-second cooldown'), minionMinSpeed = p.quoted('cannot be reduced below {{as|200|movement speed}}'),
      minionCapAS = p.quoted("or to {{fd|2.0}} if the disguise's form's");
    p.quote('nearest visible allied or neutral non-champion non-structure unit'); p.quote('Her disguise breaks if she');
    p.quote("'''Base''' movement speed}} if it is lower than");
    p.gameQuote('"name":"ChargeTime","values":[2.0');
    kit.assume('Shapesplitter starts without preloaded attacks. Two actual connected on-hits prepare the next declared basic; the empowered attack consumes its stacks and grants movement at declaration, even if later blinded, dodged or cancelled. Its ordinary physical damage and separate magic on-hit retain normal defenses. It is non-projectile. Ward and jungle-plant attacks do not consume the empowerment.');
    kit.assume('Blooming Burst releases its seed at declaration, before its0.25second cast lock ends, from the declaration location with its captured direction and fixed chosen location. Each actual bloom can earn the next one by contacting a real champion or explicitly large monster, or by killing a real body. Shielded contact still qualifies. At most two additional blooms occur0.75seconds apart. At the branch cap, a champion-dependent follow-up retains its earned probability weight; an independently qualifying real pet contact can earn the full follow-up. Already released seeds and earned finite blooms survive Neeko death. No invisible farm wave is supplied.');
    kit.assume('Shapesplitter creates a real, non-attacking champion-class clone with its own identity. Its HP/resistances/radii and movement snapshot the owner at creation because the retained generic clone source does not provide a Neeko-specific stat table. This is an explicit unverified interpretation. Its first0.5seconds are untargetable/invisible, its normal life is3seconds, and positive damage schedules disappearance after the primary wiki0.5seconds; the conflicting client0.75seconds and reported inconsistent DoT behavior remain visible. Commands/casts stop its old movement; no damaging spell is duplicated. Cosmetic emote/Recall duration extensions are outside the modeled duel commands.');
    kit.assume('Pop Blossom activation pays100mana and begins its cooldown immediately, while its1.25second windup permits ordinary actions. Its later0.6second cast begins even during stasis, knocks up bodies within590 centered units, then damages/stuns bodies within600 at landing. The two packets test spell shields separately. Death before landing cancels unreleased damage; no obsolete client shield is granted.');
    kit.assume('Inherent Glamour starts with no allied champion or Sho\'Ma form. Only actual represented, visible allied minion/non-epic monster pets can provide a stored form after2seconds within400units. Manual I selects that stored body, without cloning its HP, armor, MR or AD. This restricted form copies attack range/projectile/speed, size/pathing and movement, and caps the adopted attack rate at2. Source-specific ward/plant/trap, allied-champion menus, map structures and non-champion targeting/damage-class exceptions are not modeled; ordinary duel results have no such fabricated form.');

    const damage = (amount: Formula): Effect => ({ type: 'damage', damageType: 'magic', amount });
    const ownClones = (ctx: HookContext) => ctx.world.pets.filter(p => p.owner === ctx.self.side && p.spec.kind === CLONE && p.hp > 0 && p.endTick > ctx.tick);
    const hit = (ctx: HookContext, target: Unit, spell: AbilitySpec, effects: Effect[], scale = 1, origin?: number, pet?: Pet) => pet
      ? abilityHitPet(ctx.world, ctx.self, pet, spell, effects, 'area', scale, origin)
      : abilityHit(ctx.world, ctx.self, target, spell, effects, scale, origin);
    const area = (ctx: HookContext, spell: AbilitySpec, radius: number, effects: Effect[]) => {
      if (Math.abs(ctx.enemy.x - ctx.self.x) <= radius + EPS) hit(ctx, ctx.enemy, spell, effects);
      for (const pet of [...ctx.world.pets]) if (pet.owner !== ctx.self.side && !pet.spec.untargetable && Math.abs(pet.x - ctx.self.x) <= radius + EPS) hit(ctx, petFormulaTarget(pet, ctx.self, ctx.tick), spell, effects, 1, ctx.self.x, pet);
    };
    const saveForm = (ctx: HookContext) => {
      const b = ctx.self.spec.base, a = ctx.self.spec.attack;
      for (const [key, val] of Object.entries({ radius: b.radius, pathing: b.pathingRadius, speed: b.moveSpeed, asBase: b.attackSpeed.base, asRatio: b.attackSpeed.ratio, asBonus: b.attackSpeed.bonus, range: a.range, missile: a.missileSpeed ?? 0, projectile: a.projectile, ranged: a.ranged })) ctx.memory[`neeko:original:${key}`] = val;
      ctx.memory['neeko:original:minimumMS'] = ctx.self.spec.statConversions?.minimumMoveSpeed ?? -1;
    };
    const breakForm = (ctx: HookContext, cooldown = disguiseCD) => {
      if (!ctx.memory['neeko:disguised']) return;
      const n = (key: string) => Number(ctx.memory[`neeko:original:${key}`]);
      ctx.self.spec = { ...ctx.self.spec, base: { ...ctx.self.spec.base, radius: n('radius'), pathingRadius: n('pathing'), moveSpeed: n('speed'), attackSpeed: { base: n('asBase'), ratio: n('asRatio'), bonus: n('asBonus') } }, attack: { ...ctx.self.spec.attack, range: n('range'), missileSpeed: n('missile'), projectile: !!ctx.memory['neeko:original:projectile'], ranged: !!ctx.memory['neeko:original:ranged'] } };
      const conversions = { ...ctx.self.spec.statConversions };
      if (n('minimumMS') < 0) delete conversions.minimumMoveSpeed; else conversions.minimumMoveSpeed = n('minimumMS');
      ctx.self.spec = { ...ctx.self.spec, statConversions: conversions };
      delete ctx.memory['neeko:disguised']; delete ctx.memory['neeko:formHP'];
      ctx.self.cooldownReady.I = Math.max(ctx.self.cooldownReady.I ?? 0, ctx.tick + ticks(cooldown));
    };
    const qSpec: AbilitySpec = { key: 'Q', name: q.name, slot: 'Q', cooldown: q.cooldown(), cooldownAtCastStart: true, cost: q.cost(), costAtCastStart: true, castTime: q.castTime(), deliveryAtCastStart: true, castOrigin: 'start', castDirection: 'start', captureGroundAim: 'start', delivery: { kind: 'circle', range: qRange, radius: qRadius, speed: q.field('speed'), delay: 0 }, onHit: [damage(initial)], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true };
    const eSpec: AbilitySpec = { key: 'E', name: e.name, slot: 'E', cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castDirection: 'start', delivery: { kind: 'line', range: e.field('range'), width: eWidth, radius: eWidth / 2, speed: eSpeed, piercing: true, collisionPet: true }, onHit: [damage(eDamage), { type: 'cc', cc: 'root', duration: root }], flags: { projectile: true, spellShield: true, petContactHooks: true }, decisive: true, persistsAfterDeath: true };
    const wSpec: AbilitySpec = { key: 'W', name: w.name, slot: 'W', cooldown: w.cooldown(), cooldownAfter: 'state', castTime: w.castTime(), delivery: { kind: 'self' }, roles: ['defense', 'escape'], usable: (self, world) => !world.pets.some(p => p.owner === self.side && p.spec.kind === CLONE) };
    const w2Spec: AbilitySpec = { key: 'W2', name: 'Shapesplitter (command)', slot: 'W', countsAsCast: false, budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: 'self' }, usable: (self, world) => world.pets.some(p => p.owner === self.side && p.spec.kind === CLONE) };
    const rSpec: AbilitySpec = { key: 'R', name: r.name, slot: 'R', cooldown: r.cooldown(), cooldownAtCastStart: true, cost: r.cost(), costAtCastStart: true, castTime: 0, delivery: { kind: 'self' }, roles: ['damage', 'cc'], estimate: (self, target) => evaluate(rDamage, self, target), decisive: true, usable: self => self.memory['neeko:rWindup'] === undefined && self.action?.kind !== 'cast' };
    const land: AbilitySpec = { key: 'Rland', name: `${r.name} (landing)`, slot: 'R', budgetExcluded: true, countsAsCast: false, cooldown: 0, castTime: r.castTime(), delivery: { kind: 'self' }, flags: { spellShield: true, petContactHooks: true }, usable: () => false };
    const iSpec: AbilitySpec = { key: 'I', name: p.name, slot: 'W', countsAsCast: false, budgetExcluded: true, cooldown: disguiseCD, castTime: 0, delivery: { kind: 'self' }, usable: self => self.memory['neeko:storedID'] !== undefined && !self.memory['neeko:disguised'] };
    const rAir = { ...land, key: 'Rair', name: `${r.name} (knock up)`, castTime: 0 };
    const abilities = [qSpec, wSpec, w2Spec, eSpec, rSpec, land, rAir, iSpec];
    const behavior: Behavior = view => {
      if (view.mode !== 'idle' && view.mode !== 'flee' && canCast(view.world, view.self, rSpec) && Math.abs(view.self.x - view.enemy.x) <= rAirRadius) return { kind: 'cast', ability: 'R' };
      if ((view.mode === 'hold' || view.mode === 'flee') && view.threats.length && canCast(view.world, view.self, wSpec)) return { kind: 'cast', ability: 'W', aim: { direction: -1, distance: moveRange } };
      return defaultBehavior(view);
    };
    const tick = (ctx: HookContext) => {
      if (ctx.self.alive && ctx.self.hp > 0 && ctx.memory['neeko:rWindup'] !== undefined && ctx.tick >= Number(ctx.memory['neeko:rWindup'])) {
        delete ctx.memory['neeko:rWindup'];
        startCast(ctx.world, ctx.self, land);
        area(ctx, rAir, rAirRadius, [{ type: 'cc', cc: 'airborne', duration: leapTime }]);
      }
      if (ctx.memory['neeko:rReveal'] !== undefined && ctx.tick >= Number(ctx.memory['neeko:rReveal'])) { breakForm(ctx); delete ctx.memory['neeko:rReveal']; }
      const clones = ownClones(ctx);
      if (!clones.length) ctx.self.statuses = ctx.self.statuses.filter(s => !(s.kind === 'state' && s.key === 'lingering' && s.ability === 'W'));
      for (const clone of clones) {
        if (ctx.tick >= clone.endTick || clone.hp <= 0 || clone.carriedBy !== undefined) continue;
        const actor = petFormulaTarget(clone, ctx.self, ctx.tick);
        if (inStasis(actor) || [...ccTypes(actor)].some(t => ['stun', 'root', 'airborne', 'sleep', 'suppression', 'suspension', 'charm', 'fear', 'taunt'].includes(t))) continue;
        const destination = Number(clone.memory.destination ?? clone.x), previous = clone.x;
        clone.x += terrainLimit(ctx.world, actor, Math.sign(destination - clone.x) * Math.min(Math.abs(destination - clone.x), derive(actor).moveSpeed / 30), true);
        notifyActualMovement(ctx.world, petFormulaTarget(clone, ctx.self, ctx.tick), previous, { kind: 'walk', endTick: ctx.tick, ended: true }, clone);
      }
      if (!ctx.self.alive || ctx.self.hp <= 0 || ctx.memory['neeko:disguised']) return;
      const candidate = ctx.world.pets.filter(pet => pet.owner === ctx.self.side && pet.spec.kind !== CLONE && (pet.spec.targetClass === 'minion' || pet.spec.targetClass === 'monster' && !pet.spec.epicMonster) && pet.hp > 0 && !pet.spec.untargetable && Math.abs(pet.x - ctx.self.x) <= gatherRange && canTarget(petFormulaTarget(pet, ctx.self, ctx.tick), ctx.self, ctx.self)).sort((a, b) => Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x) || a.id - b.id)[0];
      if (!candidate) { delete ctx.memory['neeko:gatherID']; return; }
      if (ctx.memory['neeko:gatherID'] !== candidate.id) { ctx.memory['neeko:gatherID'] = candidate.id; ctx.memory['neeko:gatherStart'] = ctx.tick; }
      if (ctx.tick - Number(ctx.memory['neeko:gatherStart']) >= ticks(gatherTime) && ctx.memory['neeko:storedID'] !== candidate.id) {
        ctx.memory['neeko:storedID'] = candidate.id;
        const attack = candidate.spec.attack;
        for (const [key, val] of Object.entries({ hp: candidate.hp, speed: Math.min(Number(ctx.memory['neeko:original:speed']), candidate.spec.moveSpeed), radius: candidate.spec.radius, pathing: candidate.spec.pathingRadius ?? candidate.spec.radius, rate: Math.min(minionCapAS, attack ? 1 / attack.interval : derive(ctx.self).attackSpeed), range: attack?.range ?? 0, projectile: attack?.projectile ?? false, ranged: attack?.ranged ?? !!attack?.missileSpeed, missile: attack?.missileSpeed ?? 0 })) ctx.memory[`neeko:stored:${key}`] = val;
      }
    };
    return { abilities, behavior, attack: { onHitToPets: true }, hooks: {
      onStart(ctx) { saveForm(ctx); ctx.memory['neeko:wStacks'] = 0; },
      onCastStart(ctx) {
        const key = ctx.ability.key;
        if (['Q', 'E'].includes(key)) breakForm(ctx);
        if (!['W', 'W2', 'I', 'Rland', 'Rair'].includes(key)) for (const clone of ownClones(ctx)) clone.memory.destination = clone.x;
        if (key === 'R') { ctx.memory['neeko:rWindup'] = ctx.tick + ticks(windup); ctx.memory['neeko:rReveal'] = ctx.tick + ticks(disguiseReveal); }
      },
      onCast(ctx) {
        const key = ctx.ability.key;
        if (key === 'Rland') area(ctx, land, rRadius, [damage(rDamage), { type: 'cc', cc: 'stun', duration: stunTime }]);
        if (key === 'W') {
          const stats = derive(ctx.self), direction = (ctx.enemy.x >= ctx.self.x ? 1 : -1) * (ctx.aim?.direction ?? 1);
          const clone = spawnPet(ctx.world, ctx.self, { kind: CLONE, name: 'Shapesplitter', unitClass: 'clone', targetClass: 'champion', hp: stats.maxHp, armor: stats.armor.base + stats.armor.bonus, mr: stats.mr.base + stats.mr.bonus, radius: ctx.self.spec.base.radius, pathingRadius: ctx.self.spec.base.pathingRadius, moveSpeed: stats.rawMoveSpeed, duration: cloneTime,
            target: () => undefined, onDamaged({ world, pet, dealt }) { if (dealt > 0) pet.endTick = Math.min(pet.endTick, world.tick + ticks(cloneDamageDelay)); },
          }, ctx.self.x);
          clone.memory.destination = clone.x + direction * Math.min(moveRange, ctx.aim?.distance ?? moveRange);
          petEffects(ctx.world, ctx.self, clone, [{ type: 'state', state: 'untargetable', duration: invisible }, { type: 'state', state: 'invisible', duration: invisible }, { type: 'stat', stat: 'moveSpeedPercent', amount: { base: activeHaste }, duration: cloneTime }]);
          ctx.apply({ type: 'state', state: 'invisible', duration: invisible }, true);
          ctx.buff('wHaste', 'moveSpeedPercent', activeHaste, cloneTime);
          ctx.apply({ type: 'state', state: 'lingering', duration: cloneTime }, true);
        }
        if (key === 'W2') for (const clone of ownClones(ctx)) clone.memory.destination = ctx.self.x + (ctx.enemy.x >= ctx.self.x ? 1 : -1) * (ctx.aim?.direction ?? 1) * Math.min(moveRange, ctx.aim?.distance ?? moveRange);
        if (key === 'I') {
          if (ctx.memory['neeko:storedID'] === undefined) return;
          const n = (name: string) => Number(ctx.memory[`neeko:stored:${name}`]);
          ctx.self.spec = { ...ctx.self.spec, statConversions: { ...ctx.self.spec.statConversions, minimumMoveSpeed: minionMinSpeed }, base: { ...ctx.self.spec.base, moveSpeed: n('speed'), radius: n('radius'), pathingRadius: n('pathing'), attackSpeed: { base: n('rate'), ratio: 0, bonus: 0 } }, attack: { ...ctx.self.spec.attack, range: n('range'), projectile: !!ctx.memory['neeko:stored:projectile'], ranged: !!ctx.memory['neeko:stored:ranged'], missileSpeed: n('missile') } };
          ctx.memory['neeko:disguised'] = true; ctx.memory['neeko:formHP'] = n('hp');
        }
      },
      onZoneLand(ctx) {
        if (ctx.zone.ability !== 'Q') return;
        const zone = ctx.zone, phase = Number(ctx.memory[`neeko:bloom:${zone.id}`] ?? 0), formula = phase ? subsequent : initial;
        let qualifyingWeight = 0;
        if (zone.connects && ctx.enemy.alive && !inStasis(ctx.enemy) && !isUntargetable(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - zone.x) <= qRadius + ctx.enemy.spec.base.radius + EPS) {
          hit(ctx, ctx.enemy, qSpec, [damage(formula)], zone.scale ?? 1, zone.x); qualifyingWeight = zone.scale ?? 1;
        }
        for (const pet of [...ctx.world.pets]) {
          if (pet.owner === ctx.self.side || pet.spec.untargetable || Math.abs(pet.x - zone.x) > qRadius + pet.spec.radius + EPS) continue;
          const target = petFormulaTarget(pet, ctx.self, ctx.tick);
          if (inStasis(target) || isUntargetable(target, ctx.self)) continue;
          const amount = { ...formula, base: formula.base + (pet.spec.targetClass === 'monster' ? monsterBonus : 0) };
          const conditionalWeight = phase ? zone.scale ?? 1 : 1;
          hit(ctx, target, qSpec, [damage(amount)], conditionalWeight, zone.x, pet);
          if (pet.hp <= 0 || pet.spec.targetClass === 'champion' || pet.spec.targetClass === 'monster' && pet.spec.sizeClass === 'large') qualifyingWeight = Math.max(qualifyingWeight, conditionalWeight);
        }
        zone.onHit = []; zone.noPets = true;
        if (qualifyingWeight > 0 && phase < blooms) {
          const next: Zone = { ...zone, id: ctx.world.nextId++, startTick: ctx.tick, endTick: ctx.tick + ticks(bloomDelay), connects: true, scale: qualifyingWeight, pendingAfterDeath: true };
          ctx.memory[`neeko:bloom:${next.id}`] = phase + 1;
          ctx.world.zones.push(next);
        }
        delete ctx.memory[`neeko:bloom:${zone.id}`];
      },
      onMissileContact(ctx) {
        if (ctx.missile.source !== 'E') return;
        // The first body receives the old packet; every later body receives the empowerment.
        ctx.missile.perTick = eFast / 30; ctx.missile.radius = eWide / 2;
        ctx.missile.onHit = [damage(eDamage), { type: 'cc', cc: 'root', duration: empoweredRoot }];
      },
      onAttack(ctx) {
        const ward = ctx.enemy.spec.targetClass === 'other';
        if (Number(ctx.memory['neeko:wStacks']) < stacks || ward) return;
        ctx.memory['neeko:wStacks'] = 0; ctx.action.missileSpeed = 0; ctx.action.attackTag = 'neeko:empowered';
        ctx.buff('wPassiveHaste', 'moveSpeedPercent', passiveHaste, passiveTime);
      },
      onAttackBeforeDamage(ctx) {
        if (ctx.attack.attackTag !== 'neeko:empowered' || ctx.blocked) return;
        const amount = { ...passiveDamage, base: passiveDamage.base + (ctx.enemy.spec.targetClass === 'monster' ? monsterAttack : 0) };
        applyEffect(ctx.world, ctx.self, ctx.enemy, damage(amount), { scale: ctx.scale });
      },
      onAttackHit(ctx) { if (ctx.attack.attackTag !== 'neeko:empowered') ctx.memory['neeko:wStacks'] = Math.min(stacks, Number(ctx.memory['neeko:wStacks']) + 1); },
      onAttackPetHit(ctx) { if (ctx.attack.attackTag !== 'neeko:empowered') ctx.memory['neeko:wStacks'] = Math.min(stacks, Number(ctx.memory['neeko:wStacks']) + 1); },
      onDamageTaken(ctx) {
        if (!ctx.memory['neeko:disguised']) { if (ctx.enemy.petId === undefined && ctx.amount > 0) ctx.self.cooldownReady.I = Math.max(ctx.self.cooldownReady.I ?? 0, ctx.tick + ticks(breakCD)); return; }
        ctx.memory['neeko:formHP'] = Number(ctx.memory['neeko:formHP']) - ctx.amount;
        if (Number(ctx.memory['neeko:formHP']) <= 0) breakForm(ctx);
      },
      onCCApplied(ctx) { if (['stun', 'root', 'airborne', 'fear', 'charm', 'taunt', 'sleep', 'suppression', 'suspension'].includes(ctx.cc)) breakForm(ctx, breakCD); },
      onTick: tick,
      onTickWhileDead(ctx) { breakForm(ctx, breakCD); delete ctx.memory['neeko:rWindup']; },
    }, budget: { damage(self, target) { const haste = 1 + derive(self).abilityHaste / 100; return { magic: evaluate(passiveDamage, self, target) * derive(self).attackSpeed / (stacks + 1) + 2 * evaluate(subsequent, self, target) / (qSpec.cooldown / haste + qSpec.castTime) + evaluate(rDamage, self, target) / (rSpec.cooldown / haste + windup + leapTime) }; } } };
  },
};
export default neeko;
