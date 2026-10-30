/** Three spell books with cast-local ink, recipient shields and actual traveling bodies. */
import type { KitModule } from '../../engine/kits/compile';
import { canCast, canStartAttack, resolveSkillshot } from '../../engine/sim/actions';
import { defaultBehavior, type Behavior } from '../../engine/sim/behavior';
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, immediateDisplace, inStasis, isUntargetable } from '../../engine/sim/combat';
import { derive, evaluate } from '../../engine/sim/derived';
import { petFormulaTarget } from '../../engine/sim/petTarget';
import type { AbilitySpec, Effect, Formula, HookContext } from '../../engine/sim/spec';
import type { Aim, Missile, Pet, Unit, World, Zone } from '../../engine/sim/state';
import { ticks } from './util';
const EPS = 1e-6,
  MOOD = 'hwei:mood',
  LIGHTS = 'hwei:lights';
type Body = {
  target: Unit;
  pet?: Pet;
};
interface Task {
  scale?: number;
  type: string;
  start: number;
  until: number;
  next?: number;
  pulse?: number;
  serial?: number;
  direction?: number;
  host?: string;
  locked?: string;
  fire?: number;
  x?: number;
  due?: number;
}
const hwei: KitModule = {
  champion: 'Hwei',
  build(kit) {
    const p = kit.ability('Signature of the Visionary'),
      qq = kit.ability('Devastating Fire'),
      qw = kit.ability('Severing Bolt'),
      qe = kit.ability('Molten Fissure'),
      wq = kit.ability('Fleeting Current'),
      ww = kit.ability('Pool of Reflection'),
      we = kit.ability('Stirring Lights'),
      eq = kit.ability('Grim Visage'),
      ew = kit.ability('Gaze of the Abyss'),
      ee = kit.ability('Crushing Maw'),
      r = kit.ability('Spiraling Despair'),
      qb = kit.ability('Subject: Disaster'),
      wb = kit.ability('Subject: Serenity'),
      eb = kit.ability('Subject: Torment'),
      wash = kit.ability('Wash Brush');
    const cd = {
        Q: qb.cooldown(),
        W: wb.cooldown(),
        E: eb.cooldown()
      },
      cost = {
        Q: qb.cost(),
        W: wb.cost(),
        E: eb.cost()
      },
      casts = {
        QQ: qq.castTime(),
        QW: qw.castTime(),
        QE: qe.castTime(),
        WQ: wq.castTime(),
        WW: ww.castTime(),
        WE: we.castTime(),
        EQ: eq.castTime(),
        EW: ew.castTime(),
        EE: ee.castTime(),
        R: r.castTime()
      };
    const pd: Formula = {
        base: p.levelValue('bonus magic damage'),
        ratios: {
          AP: p.quoted('(+ 35% AP)') / 100
        }
      },
      pr = p.field('effectRadius'),
      pt = p.quoted('for 4 seconds'),
      pdly = p.quoted('0.85-second delay');
    p.quote('cannot apply it on the same cast instance');
    p.quote('Spell shield will block both the mark and its consumption as well as the detonation');
    p.gameQuote('"mEndValue":285.0');
    const qqd = qq.formula('Magic Damage'),
      qqr = qq.fieldNumbers('range')[0]!,
      qqrad = qq.field('effectRadius'),
      qqw = qq.field('width'),
      qqs = qq.field('speed'),
      qqend = qq.quoted('100 units past the missile end position'),
      qqcap = qq.quoted('capped at 250 against monsters');
    qq.gameQuote('"mMissileWidth":70.0');
    const qwd = qw.formula('Magic Damage'),
      qwr = qw.field('targetRange'),
      qwrad = qw.field('effectRadius'),
      qwdly = qw.quoted('after 1 second'),
      qwmax = qw.baseOf('Maximum Damage Increase') / 100,
      qwcap = qw.quoted('capped at 300 against monsters'),
      qwsmall = qw.quoted('deals 50% damage') / 100;
    qw.quote('From start of cast time');
    qw.quote('1*100 to {{#var:qw_mod5}}*100 for 11|0 to 100');
    qw.gameQuote('"ObjectName":"HweiQW"');
    const qed = qe.formula('Magic Damage'),
      qetick = qe.formula('Magic Damage per Tick'),
      qer = qe.field('range'),
      qerad = qe.field('effectRadius'),
      qedly = qe.quoted('After 0.6 seconds'),
      qegap = qe.quoted('every 0.2 seconds'),
      qen = qe.quoted('total of 7 explosions'),
      qelife = qe.quoted('lasts for 2.5 seconds'),
      qeinterval = qe.quoted('every 0.25 seconds'),
      qeslow = qe.quoted('slowing them by 35%') / 100,
      qeminion = qe.quoted('reduced to 60%') / 100,
      qemonster = qe.quoted('increased to 135%') / 100,
      qedriver = qe.gameQuoted('"mSpeed":800.0');
    qe.quote('shockwaves can only hit each enemy once');
    qe.quote('Spell shield will block an explosion but not the persistent lava damage');
    qe.quote('From start of cast time');
    const wqr = wq.field('range'),
      wqw = wq.field('width'),
      wqlife = wq.baseOf('Path Duration'),
      wqbonus = wq.baseOf('Bonus Movement Speed') / 100,
      wqap = wq.quoted('(+ 3% per 100 AP)') / 10000,
      wqinterval = wq.quoted('every 0.125 seconds'),
      wqbuff = wq.quoted('for 0.5 seconds'),
      wqdriver = wq.gameQuoted('"mSpeed":1700.0');
    const wwr = ww.field('targetRange'),
      wwrad = ww.field('effectRadius'),
      wwlife = ww.quoted('for 3 seconds'),
      wwinterval = ww.quoted('every 0.264'),
      wwbuff = ww.quoted('for 0.5 seconds'),
      wwinit = ww.formula('Initial Shield Strength'),
      wwstep = ww.formula('Bonus Shield per Tick'),
      wwcap = ww.formula('Total Maximum Shield'),
      wwally = ww.quoted('reduced to 85%') / 100;
    ww.quote('pool is summoned at the start of the cast time');
    ww.quote('shield will be regenerated back to its cap if it mitigates damage');
    ww.gameQuote('"name":"ShieldDuration","values":[1.0');
    const wed = we.formula('Bonus Magic Damage'),
      wemana = we.baseOf('Mana Restore'),
      wen = we.quoted('next 3 basic attacks'),
      welife = we.quoted('within 9 seconds'),
      wearea = we.quoted('reduced to 50%') / 100;
    we.quote('Spell shield will not block the bonus damage even if it is applied by an ability');
    we.gameQuote('"name":"Duration","values":[9.0');
    const eqd = eq.formula('Magic Damage'),
      eqr = eq.field('range'),
      eqw = eq.field('width'),
      eqs = eq.field('speed'),
      eqtime = eq.baseOf('Disable Duration'),
      eqtable = eq.seriesIn('based on distance from Hwei');
    if (eqtable.kind !== 'variable') throw new Error('Hwei EQ requires its distance table');
    eq.gameQuote('"mSpeed":1300.0');
    const ewd = ew.formula('Magic Damage'),
      ewr = ew.field('targetRange'),
      ewrad = ew.field('effectRadius', 'Trigger'),
      ewlaunch = ew.field('effectRadius', 'Maximum'),
      ewsight = ew.field('effectRadius', 'Sight'),
      ews = ew.field('speed'),
      ewroot = ew.baseOf('Root Duration'),
      ewexpand = ew.quoted('expands over 0.2 seconds'),
      ewlife = ew.quoted('lasts 3 seconds'),
      ewarm = ew.quoted('After 0.7 seconds'),
      ewfire = ew.quoted('after a 0.3-second delay'),
      ewreveal = ew.quoted('reveal them for 2.5 seconds'),
      ewwidth = ew.gameQuoted('"mMissileWidth":30.0', 0, 'Characters/Hwei/Spells/HweiEAbility/HweiEWTriggerMissile');
    const eed = ee.formula('Magic Damage'),
      eer = ee.field('targetRange'),
      eelen = ee.field('range'),
      eew = ee.field('width'),
      eedly = ee.quoted('after 0.6 seconds'),
      eetime = ee.quoted('over 1.25 seconds'),
      eeslow = ee.baseOf('Slow') / 100,
      angle = ee.gameQuoted('"wallRotation":20.0') * Math.PI / 180;
    ee.quote('From start of cast time');
    ee.quote('Enemies that are pulled will be slowed after the displacement ends');
    const rd = r.formula('Magic Damage'),
      rtick = r.formula('Magic Damage per Tick'),
      rr = r.quoted('1300 missile travel distance'),
      rend = r.quoted('40 to-edge radius check'),
      rrad = r.field('effectRadius'),
      rw = r.field('width'),
      rs = r.field('speed'),
      rlife = r.quoted('grows over 3 seconds'),
      rinterval = r.quoted('every 0.25 seconds'),
      rslow = r.quoted('slowed by 10%') / 100,
      rstacks = r.quoted('up to 12 times'),
      rcd = r.cooldown(),
      rcost = r.cost();
    r.quote('when the target dies');
    r.quote('first enemy champion hit');
    r.quote('Spell shield can block the aura, explosion, and the application of the first Despair stack');
    r.gameQuote('"mCoefficient":0.949999988079071');
    for (const book of [qb, wb, eb]) {
      book.quote('do not count as ability activations');
      book.textField('cooldownStart');
    }
    qb.gameQuote('"ObjectName":"HweiQ"');
    wb.gameQuote('"ObjectName":"HweiW"');
    eb.gameQuote('"ObjectName":"HweiE"');
    wash.quote('without incurring its ability cost or cooldown');
    wash.quote('used while affected by cast-inhibiting crowd control');
    wash.gameQuote('"ObjectName":"HweiWashBrush"');
    const id = (b: Body) => b.pet ? `p${b.pet.id}` : `u${b.target.side}`;
    const bodies = (world: World, self: Unit): Body[] => [...world.units.map(target => ({
      target
    })), ...world.pets.filter(pet => pet.hp > 0 && !pet.spec.hitPoints && !pet.spec.untargetable).map(pet => ({
      target: petFormulaTarget(pet, self, world.tick),
      pet
    }))];
    const hostile = (world: World, self: Unit) => bodies(world, self).filter(b => b.target.side !== self.side && b.target.alive && b.target.hp > 0);
    const champion = (b: Body) => !b.pet || b.pet.spec.targetClass === 'champion';
    const friends = (world: World, self: Unit) => bodies(world, self).filter(b => b.target.side === self.side && champion(b) && b.target.alive && !b.target.resurrection && !inStasis(b.target) && !isUntargetable(b.target, self));
    const body = (world: World, self: Unit, key: string): Body | undefined => {
      if (key[0] === 'u') {
        const target = world.units[Number(key.slice(1)) as 0 | 1];
        return target ? {
          target
        } : undefined;
      }
      const pet = world.pets.find(p => p.id === Number(key.slice(1)));
      return pet ? {
        target: petFormulaTarget(pet, self, world.tick),
        pet
      } : undefined;
    };
    const sync = (b: Body) => {
      if (b.pet) {
        b.pet.x = b.target.x;
        b.pet.hp = b.target.hp;
        b.pet.statuses = b.target.statuses;
        if (b.target.forced) b.pet.forced = b.target.forced;
      }
    };
    const slow = (strength: number, duration: number): Effect => ({
      type: 'cc',
      cc: 'slow',
      duration,
      strength: Math.max(0, Math.min(1, strength)),
      slowStackGroup: 'hwei'
    });
    const group = (key: string) => key.startsWith('QE-') ? 'QE' : key === 'QQ-explosion' ? 'QQ' : key.startsWith('R-') ? 'R' : key === 'EW-seeker' ? 'EW' : key;
    const serial = (u: Unit, key: string) => Number(u.memory[`hwei:cast:${group(key)}`] ?? 0);
    const tag = (effects: readonly Effect[], key: string, sn: number, x?: number) => effects.map(e => e.type === 'damage' ? {
      ...e,
      label: `hwei:${key}:${sn}${x === undefined ? '' : `:${x}`}`
    } : e);
    const parsed = (effects: readonly Effect[], u: Unit, key: string) => {
      const e = effects.find(e => e.type === 'damage');
      return e?.type === 'damage' && e.label?.startsWith('hwei:') ? Number(e.label.split(':')[2]) : serial(u, key);
    };
    let abilities: AbilitySpec[];
    const spell = (key: string) => abilities.find(a => a.key === key)!;
    const hit = (ctx: HookContext, b: Body, key: string, effects: Effect[], sn: number, scale = 1, x = ctx.self.x, category: 'area' | 'persistent' | 'singleTarget' = 'area') => {
      const packet = tag(effects, key, sn, x);
      if (b.pet) abilityHitPet(ctx.world, ctx.self, b.pet, spell(key), packet, category, scale, x);else abilityHit(ctx.world, ctx.self, b.target, spell(key), packet, scale, x);
    };
    const saveTask = (ctx: HookContext, m: Missile, t: Task) => {
      ctx.memory[`hwei:task:${m.id}`] = JSON.stringify(t);
    };
    const task = (ctx: HookContext, key: string, x: number, t: Task) => {
      const m: Missile = {
        id: ctx.world.nextId++,
        owner: ctx.self.side,
        source: key,
        seenTick: ctx.tick,
        x,
        perTick: 0,
        homing: false,
        direction: 1,
        travelLeft: Infinity,
        projectile: false,
        connects: false,
        scale: 1,
        onHit: [],
        piercing: true,
        expiresTick: t.until + 1,
        perceptionHidden: true
      };
      saveTask(ctx, m, t);
      ctx.world.missiles.push(m);
      return m;
    };
    const area = (ctx: HookContext, key: string, x: number, radius: number, due: number, effects: Effect[], sn: number, seen = ctx.tick, decisionRadius = radius) => {
      const enemy = ctx.world.units[ctx.self.side === 0 ? 1 : 0],
        decision = resolveSkillshot(ctx.world, ctx.self, enemy, spell(key), seen, Math.max(0, due - ctx.tick) / 30, decisionRadius - Math.abs(enemy.x - x));
      const zone: Zone = {
        id: ctx.world.nextId++,
        owner: ctx.self.side,
        kind: 'delayedArea',
        pendingAfterDeath: true,
        seenTick: seen,
        x,
        radius,
        startTick: ctx.tick,
        endTick: due,
        ability: key,
        onHit: tag(effects, key, sn, x),
        connects: decision.connects,
        scale: decision.scale,
        memory: {
          serial: sn
        }
      };
      ctx.world.zones.push(zone);
      if (decision.split !== undefined) ctx.queueSplit({
        zone: zone.id,
        chance: decision.split
      });
      return zone;
    };
    const signature = (ctx: HookContext, b: Body, sn: number) => {
      if (!b.target.alive || b.target.hp <= 0 || !sn) return;
      const key = id(b),
        once = `hwei:inkOnce:${sn}:${key}`;
      if (ctx.memory[once]) return;
      ctx.memory[once] = true;
      const raw = ctx.memory[`hwei:ink:${key}`],
        old = typeof raw === 'string' ? JSON.parse(raw) as {
          serial: number;
          until: number;
        } : undefined;
      if (old && old.until > ctx.tick && old.serial !== sn) {
        delete ctx.memory[`hwei:ink:${key}`];
        area(ctx, 'I-explosion', b.target.x, pr, ctx.tick + ticks(pdly), [{
          type: 'damage',
          damageType: 'magic',
          amount: pd
        }], sn);
      } else ctx.memory[`hwei:ink:${key}`] = JSON.stringify({
        serial: sn,
        until: ctx.tick + ticks(pt)
      });
    };
    const light = (ctx: HookContext, b: Body, entitlement: string, aoe: boolean, scale = 1) => {
      const key = `hwei:light:${entitlement}`;
      if (!ctx.memory[key]) {
        if (ctx.tick >= Number(ctx.memory[`${LIGHTS}:until`] ?? 0) || Number(ctx.memory[`${LIGHTS}:count`] ?? 0) <= 0) return;
        ctx.memory[`${LIGHTS}:count`] = Number(ctx.memory[`${LIGHTS}:count`]) - 1;
        ctx.memory[key] = true;
        ctx.self.resource = Math.min(derive(ctx.self).maxResource, ctx.self.resource + wemana);
      }
      const once = `${key}:${id(b)}`;
      if (ctx.memory[once]) return;
      ctx.memory[once] = true;
      hit(ctx, b, 'WE-proc', [{
        type: 'damage',
        damageType: 'magic',
        amount: {
          base: evaluate(wed, ctx.self) * (aoe && b.pet && ['minion', 'monster'].includes(b.pet.spec.targetClass ?? '') ? wearea : 1)
        },
        noLifeSteal: true,
        petDamageCategory: 'proc'
      }], 0, scale);
    };
    const pool = (ctx: HookContext, m: Missile, t: Task) => {
      if (ctx.tick >= t.until) {
        m.ended = true;
        return;
      }
      if (ctx.tick < (t.next ?? t.start)) return;
      const n = Math.floor((ctx.tick - t.start) / 30 / wwinterval + EPS);
      t.next = t.start + Math.ceil((n + 1) * wwinterval * 30 - EPS);
      for (const b of friends(ctx.world, ctx.self)) {
        if (Math.abs(b.target.x - m.x) > wwrad + EPS) continue;
        const f = b.pet ? wwally : 1,
          cap = evaluate(wwcap, ctx.self) * f,
          initial = evaluate(wwinit, ctx.self) * f,
          increment = evaluate(wwstep, ctx.self) * f;
        let shield = b.target.statuses.find(s => s.kind === 'shield' && s.source === ctx.self.side && s.memoKey === `hwei:pool:${m.id}` && s.endTick > ctx.tick);
        if (!shield) {
          applyEffect(ctx.world, ctx.self, b.target, {
            type: 'shield',
            amount: {
              base: initial
            },
            duration: wwbuff
          }, {
            ability: spell('WW'),
            scale: 1
          });
          shield = b.target.statuses.at(-1)!;
          shield.memoKey = `hwei:pool:${m.id}`;
        } else {
          shield.value = Math.min(cap, shield.value + increment);
          shield.endTick = ctx.tick + ticks(wwbuff);
        }
        sync(b);
      }
      saveTask(ctx, m, t);
    };
    const decay = (ctx: HookContext) => {
      for (const b of hostile(ctx.world, ctx.self)) {
        for (const s of b.target.statuses) if (s.kind === 'cc' && s.key === 'slow' && s.source === ctx.self.side && s.memoKey === 'hwei:EE-decay') s.value = (s.charges ?? eeslow) * Math.max(0, (s.endTick - ctx.tick) / Math.max(1, s.endTick - s.startTick));
        sync(b);
      }
    };
    const applyEESlow = (ctx: HookContext, b: Body) => {
      applyEffect(ctx.world, ctx.self, b.target, slow(eeslow, eetime), {
        ability: spell('EE'),
        scale: 1
      });
      const s = b.target.statuses.findLast(s => s.kind === 'cc' && s.key === 'slow' && s.source === ctx.self.side && s.ability === 'EE');
      if (s) {
        s.memoKey = 'hwei:EE-decay';
        s.charges = eeslow;
      }
      sync(b);
    };
    const burst = (ctx: HookContext, m: Missile, t: Task) => {
      if (ctx.memory[`hwei:burst:${m.id}`]) return;
      ctx.memory[`hwei:burst:${m.id}`] = true;
      m.ended = true;
      const rad = rrad * Math.max(0, Math.min(1, (ctx.tick - t.start) / ticks(rlife)));
      for (const b of hostile(ctx.world, ctx.self)) {
        if (Math.abs(b.target.x - m.x) > rad + b.target.spec.base.radius + EPS) continue;
        b.target.statuses = b.target.statuses.filter(s => !(s.kind === 'cc' && s.key === 'slow' && s.source === ctx.self.side && s.ability === 'R-tick'));
        sync(b);
        hit(ctx, b, 'R-explosion', [{
          type: 'damage',
          damageType: 'magic',
          amount: rd
        }], t.serial!, t.scale ?? 1, m.x);
      }
    };
    const attach = (ctx: HookContext, b: Body, sn: number, scale = 1) => {
      const m = task(ctx, 'R-aura', b.target.x, {
        type: 'R',
        host: id(b),
        start: ctx.tick,
        until: ctx.tick + ticks(rlife),
        pulse: 1,
        serial: sn,
        scale
      });
      m.perceptionHidden = false;
      m.impactTick = ctx.tick + ticks(rinterval);
      m.radius = 0;
      m.onHit = tag([{
        type: 'damage',
        damageType: 'magic',
        amount: rtick,
        persistent: true
      }], 'R-tick', sn);
    };
    const newEye = (ctx: HookContext, x: number, sn: number) => task(ctx, 'EW-eye', x, {
      type: 'eye',
      start: ctx.tick,
      until: ctx.tick + ticks(ewlife),
      serial: sn,
      locked: '',
      fire: 0
    });
    const book = (u: Unit) => String(u.memory[MOOD] ?? '');
    const basic = (key: keyof typeof casts, name: string, delivery: AbilitySpec['delivery'], extra: Partial<AbilitySpec> = {}): AbilitySpec => {
      const slot = key[0] as 'Q' | 'W' | 'E';
      return {
        key,
        name,
        slot,
        cooldownKey: slot,
        cooldown: cd[slot],
        cost: cost[slot],
        castTime: casts[key],
        delivery,
        budgetExcluded: true,
        usable: u => book(u) === slot,
        persistsAfterDeath: true,
        ...extra
      };
    };
    const internal = (key: string, name: string, extra: Partial<AbilitySpec> = {}): AbilitySpec => ({
      key,
      name,
      slot: 'other',
      cooldown: 0,
      castTime: 0,
      delivery: {
        kind: 'self'
      },
      activation: 'internal',
      countsAsCast: false,
      budgetExcluded: true,
      usable: () => false,
      persistsAfterDeath: true,
      flags: {
        spellShield: true,
        petContactHooks: true
      },
      ...extra
    });
    // A circumscribed broad phase must also admit circles touching a rotated
    // edge. Its actual axial clearance remains independent of this bound.
    const eebound = Math.hypot(eew / 2, eelen / 2);
    const eeextent = (radius: number) => {
      const side = (eew / 2 + radius) / Math.cos(angle);
      if (side * Math.sin(angle) <= eelen / 2) return side;
      const projection = eelen / 2 * Math.sin(angle) + eew / 2 * Math.cos(angle),
        perpendicular = eelen / 2 * Math.cos(angle) - eew / 2 * Math.sin(angle);
      return projection + Math.sqrt(Math.max(0, radius * radius - perpendicular * perpendicular));
    };
    const qwRecipients = (ctx: HookContext, x: number, championConnects = true) => hostile(ctx.world, ctx.self).filter(b =>
      (b.pet || championConnects) && !inStasis(b.target) && !isUntargetable(b.target, ctx.self) && Math.abs(b.target.x - x) <= qwrad + b.target.spec.base.radius + EPS).length;
    abilities = [...(['Q', 'W', 'E'] as const).map((key, i) => ({
      key,
      name: [qb, wb, eb][i]!.name,
      slot: key,
      cooldownKey: `book:${key}`,
      cooldown: 0,
      castTime: 0,
      delivery: {
        kind: 'self'
      } as const,
      activation: 'toggle' as const,
      countsAsCast: false,
      budgetExcluded: true,
      castThreat: false,
      usable: (u: Unit) => !book(u)
    })), {
      key: 'Wash',
      name: wash.name,
      slot: 'R',
      cooldown: 0,
      castTime: 0,
      delivery: {
        kind: 'self'
      },
      activation: 'toggle',
      countsAsCast: false,
      budgetExcluded: true,
      castThreat: false,
      flags: {
        usableWhileDisabled: true
      },
      usable: u => !!book(u)
    }, basic('QQ', qq.name, {
      kind: 'line',
      range: qqr + qqend + qqrad,
      travelRange: qqr,
      collisionRange: qqr,
      width: qqw,
      speed: qqs,
      collisionPet: true
    }, {
      flags: {
        projectile: true,
        spellShield: true,
        petContactHooks: true
      },
      onHit: [{
        type: 'damage',
        damageType: 'magic',
        amount: qqd
      }],
      roles: ['damage']
    }), basic('QW', qw.name, {
      kind: 'circle',
      range: qwr,
      radius: qwrad,
      delay: qwdly - casts.QW
    }, {
      flags: {
        spellShield: true,
        petContactHooks: true
      },
      onHit: [{
        type: 'damage',
        damageType: 'magic',
        amount: qwd
      }],
      roles: ['damage']
    }), basic('QE', qe.name, {
      kind: 'self'
    }, {
      castOrigin: 'start',
      castDirection: 'start',
      roles: ['damage', 'cc'],
      estimate: (u, v) => evaluate(qed, u, v) + evaluate(qetick, u, v) * qelife / qeinterval
    }), basic('WQ', wq.name, {
      kind: 'self'
    }, {
      castOrigin: 'start',
      castDirection: 'start',
      moveWhileCasting: true,
      castThreat: false,
      roles: ['escape', 'buff']
    }), basic('WW', ww.name, {
      kind: 'self'
    }, {
      castThreat: false,
      roles: ['defense']
    }), basic('WE', we.name, {
      kind: 'self'
    }, {
      castThreat: false,
      roles: ['buff']
    }), basic('EQ', eq.name, {
      kind: 'line',
      range: eqr,
      width: eqw,
      speed: eqs,
      collisionPet: true
    }, {
      flags: {
        projectile: true,
        spellShield: true,
        petContactHooks: true
      },
      onHit: [{
        type: 'damage',
        damageType: 'magic',
        amount: eqd
      }, {
        type: 'knockdown'
      }, {
        type: 'cc',
        cc: 'fear',
        duration: eqtime
      }],
      decisive: true,
      roles: ['damage', 'cc']
    }), basic('EW', ew.name, {
      kind: 'self'
    }, {
      roles: ['cc'],
      estimate: (u, v) => evaluate(ewd, u, v)
    }), basic('EE', ee.name, {
      kind: 'self'
    }, {
      flags: {
        spellShield: true,
        petContactHooks: true
      },
      onHit: [{
        type: 'damage',
        damageType: 'magic',
        amount: eed
      }],
      decisive: true,
      roles: ['damage', 'cc']
    }), {
      key: 'R',
      name: r.name,
      slot: 'R',
      cooldown: rcd,
      cost: rcost,
      castTime: casts.R,
      budgetExcluded: true,
      delivery: {
        kind: 'line',
        range: rr + rend,
        travelRange: rr,
        width: rw,
        speed: rs,
        collisionPet: true
      },
      flags: {
        projectile: true,
        spellShield: true,
        petContactHooks: true
      },
      onHit: [{
        type: 'state',
        state: 'revealed',
        duration: rlife
      }],
      usable: u => !book(u),
      roles: ['damage', 'cc'],
      decisive: true,
      persistsAfterDeath: true
    }, internal('QQ-explosion', qq.name), internal('I-explosion', p.name), internal('QE-shock', qe.name, {
      decisive: true,
      onHit: [slow(qeslow, qeinterval)]
    }), internal('QE-lava', qe.name, {
      flags: {
        spellShield: false,
        petContactHooks: true
      }
    }), internal('QE-driver', qe.name), internal('WE-proc', we.name, {
      flags: {
        spellShield: false,
        petContactHooks: true
      }
    }), internal('EW-eye', ew.name), internal('EW-place', ew.name), internal('EW-seeker', ew.name, {
      flags: {
        projectile: true,
        spellShield: true,
        petContactHooks: true
      }
    }), internal('EE-slow', ee.name), internal('WW-pool', ww.name), internal('WQ-path', wq.name), internal('R-aura', r.name), internal('R-tick', r.name), internal('R-explosion', r.name)];
    const qqBlast = (ctx: HookContext, m: Missile, x: number, contact?: Body) => {
      if (ctx.memory[`hwei:qqBlast:${m.id}`]) return;
      ctx.memory[`hwei:qqBlast:${m.id}`] = true;
      const sn = Number(ctx.memory[`hwei:missile:${m.id}`] ?? serial(ctx.self, 'QQ'));
      for (const b of hostile(ctx.world, ctx.self)) {
        if (Math.abs(b.target.x - x) > qqrad + b.target.spec.base.radius + EPS || !b.pet && !m.connects && !contact?.pet) continue;
        hit(ctx, b, 'QQ-explosion', [{
          type: 'damage',
          damageType: 'magic',
          amount: qqd
        }], sn, b.pet || contact?.pet ? 1 : m.scale, x);
      }
    };
    const policy: Behavior = view => {
      const {
          world,
          self,
          enemy,
          mode
        } = view,
        normal = defaultBehavior({
          ...view,
          self: {
            ...self,
            spec: {
              ...self.spec,
              abilities: []
            }
          }
        });
      if (mode === 'idle') return normal;
      if (self.memory.tradeDone) return {
        kind: 'move',
        direction: -1
      };
      if (self.action) return normal;
      const gap = Math.abs(self.x - enemy.x),
        ready = (key: string) => canCast(world, self, spell(key)),
        danger = view.threats.some(t => t.damage > 0 && t.eta <= ticks(casts.WW + .5)),
        cast = (key: string, aim?: Aim) => ({
          kind: 'cast' as const,
          ability: key,
          ...(aim ? {
            aim
          } : {})
        }),
        free = (key: 'Q' | 'W' | 'E') => (self.cooldownReady[key] ?? 0) <= world.tick && self.resource >= cost[key];
      if (book(self)) {
        const wanted = String(self.memory['hwei:wanted'] ?? '');
        if (wanted.startsWith(book(self)) && ready(wanted)) return cast(wanted, wanted === 'WQ' && mode === 'flee' ? {
          direction: -1
        } : undefined);
        return cast('Wash');
      }
      const choose = (key: string) => {
        self.memory['hwei:wanted'] = key;
        return cast(key[0]!);
      };
      if (danger && free('W')) return choose('WW');
      if (mode === 'flee') {
        if (free('E') && gap <= eqr) return choose('EQ');
        if (free('W')) return choose('WQ');
        return normal;
      }
      if (free('W') && gap <= qwr && (Number(self.memory[`${LIGHTS}:count`] ?? 0) <= 0 || world.tick >= Number(self.memory[`${LIGHTS}:until`] ?? 0))) return choose('WE');
      if (free('E') && gap <= eqr && canTarget(enemy, self)) return choose(gap <= eer && enemy.action?.kind === 'dash' ? 'EE' : 'EQ');
      if (mode === 'fight' && gap <= rr + rend && ready('R')) return cast('R');
      if (free('Q') && gap <= qwr + qwrad && canTarget(enemy, self)) return choose(gap > qqr || enemy.statuses.some(s => s.kind === 'cc' && ['stun', 'root', 'airborne', 'suppression'].includes(s.key)) ? 'QW' : gap > qqr * .8 && enemy.moved === 0 ? 'QE' : 'QQ');
      if (canStartAttack(world, self)) return {
        kind: 'attack'
      };
      return normal;
    };
    const assumptions = ['All nine selected spells use rank5 despite their parsed second-key kinds. One Q/W/E group shares respectively6/16/10second cooldown and120/110/70mana cost. Book entry and Wash Brush are free non-activations; selection exits the current book. R requires no active mood. Wash Brush works under cast-inhibiting control, while actual selected spells retain normal restrictions. Primary E10second cooldown and instant WE/book switches override client11second/0.25second metadata.', 'Signature uses the supplied wiki level20 continuation313.823529411765+35%AP. The supplied primary description says damaging abilities mark enemies, while its radius tooltip calls the target a marked champion. Broad actual damageable bodies follow that description; the inconsistent restriction remains explicit. Same-cast identity covers overlapping QQ/QE/EW/R contacts and WE procs. A cast cannot apply, consume or reapply its own ink. Consumption schedules one285edge-radius explosion0.85seconds later at the real consumption position, with independent normal skillshot and spell-shield defenses. No enemy body or wave is invented.', 'QQ is a first-body2000speed800travel projectile. Collision creates one175edge-radius explosion at its real contact coordinate; untouched endpoint expiry explodes100units farther. Monster maximum-health damage is capped250 independently of flat/AP damage. QW lands1second from declaration rather than1second after its0.5cast. The exact primary raw11-point table establishes linear100-to350%total damage versus missing-health fraction for isolated or immobilized recipients. Monster bonus cap300 precedes minion/non-epic50%damage. Isolation snapshots actual hittable bodies at impact, excluding stasis/untargetability while preserving invisible area recipients; an earlier recipient death cannot change later isolation.', 'QE retains its declaration origin and seven eruptions beginning0.6seconds after declaration with explicitly estimated0.2second spacing. Seven uniformly spaced axial centers across1200range are an explicit spatial approximation because server center offsets are absent. Client800driver speed governs an actual independently blockable path carrier, not a sourced proof of those offsets; interception removes unreleased future eruptions but not existing lava. A real body receives one shockwave per cast despite overlapping areas. Every distinct2.5second lava pool has ten absolute quarter-second damage clocks. Only shockwaves are spell-shieldable; lava occupancy independently refreshes35%slow. Minion60%/monster135%damage stays recipient-local, and lava remains persistent area.', 'WQ preserves cast-start origin and direction. Its client1700speed driver is interpreted as axial path expansion after completion because server onset is not provided;225fullwidth is explicitly estimated and supplies no invented lateral collision. Real allied Champion-class bodies and self gain40%+0.03%AP movement and ghosting for0.5seconds on the released six-second path, refreshed at absolute0.125second deadlines. WW creates its650range350radius pool at declaration before its0.3cast completes. Actual recipients start with130+30%AP shield; each0.264second refresh regenerates remaining capacity by21.6667+5%AP up to260+60%AP. Actual allies receive85%. The primary inconsistent one/two bonus ticks on-cast are resolved to the stated initial amount; client1second shield and3second fill are not substituted. Reentry after expiry starts from initial shielding. No teammate is invented.', 'WE grants three nine-second stocks. Each actual connected basic or one source-cast hit group spends at most one stock and restores65mana once, clamped to maximum. A claimed AoE entitlement can proc once on each actual body; this grouping is an explicit interpretation of unspecified multi-target ordering. Proc damage bypasses spell shields even if the parent is shielded; parry/stasis/untargetability deny contact and blindness/dodge deny a basic proc. Nonchampion AoE procs deal50%. WE cannot recursively trigger itself or independent ink. Unused self stocks end on death; an already claimed released-cast entitlement remains with that cast.', 'EQ uses an actual first-body1300speed1100range missile,1.5second fear/knockdown, and interpolation of its exact distance-table slow with normal tenacity. EW uses an actual blockable placement projectile, with the primary1700launch-speed field interpreted for the toss and the seeker. Its eye expands0.2seconds, arms0.7seconds after placement, and lasts3seconds. Nearest actual visible Champion-class body within350locks, followed by0.3second firing delay and600finite seeker flight. Primary1700speed overrides client1300-to2100acceleration. Invalid/dead/too-distant targets at launch fizzle. Released flight follows actual target direction and can collide with an intervening real body; sight450 does not invent two-dimensional vision.', 'EE resolves0.6seconds from declaration in the union of two680-by340 rectangles rotated±20degrees. The arena uses a conservative circumscribed broad phase, exact center-axis rectangle/circle contact and independently computed axial clearance for finite champion branching, not a400radius disk. Real noncenter recipients are guardedly pulled to the actual center with duration0, using the shared guarded immediate-displacement contract because no server pull duration is sourced. No additional airborne lifetime is invented. Its70%slow begins after accepted pull completion, or immediately for centered/displacement-immune bodies, and decays over its accepted tenacity-adjusted1.25second lifetime. QE/EQ/EE/R explicitly share one multiplicative Hwei slow group; repeat refreshes do not multiply themselves.', 'R passes nonchampions before colliding with a real Champion-class body, with1300travel and a separate40edge terminal check. Its actual host is tracked after owner death, emitting twelve absolute quarter-second pulses and one final450+80%AP explosion. Host combat death detonates once at its current location. Unsourced initial aura radius/growth is interpreted as linear0-to500over3seconds, and early-death explosion uses current radius. Accepted pulses add10%Despair each up to12, with strength capped100%to keep movement nonnegative; normal movement floors apply. Shielded pulses add no stack; accepted quarter-second slow deadlines govern stack expiry/dispel/re-entry, and exact grid-deadline renewal remains contiguous. Tenacity cannot shorten this naturally sub0.3second pulse. Primary0.25second slow overrides client0.35second SlowDuration. Detonation removes source Despair. Growth curve, maximum slow and early-death geometry remain declared model limits.', 'Reference allocation prices one legal QQ stream, one EQ stream, one R stream, a paired passive cadence and bounded WE procs. W damage/mana and shielding are alternatives: the reference chooses WE and prices no simultaneous imaginary WW stream. AI actually enters books, spends WE, selects QQ/QW/QE from range/control/stationary state, uses EQ/EE for control and WW/WQ for danger/escape. Hold/trade reserve R and completed trades retreat. All allies and contacts require actual supplied bodies; unsupported lateral geometry and unsourced server timing remain declared.'];
    for (const text of assumptions) kit.assume(text);
    return {
      abilities,
      behavior: policy,
      attack: {
        onHitToPets: true
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100,
            qr = 1 / (cd.Q / haste + casts.QQ),
            er = 1 / (cd.E / haste + casts.EQ),
            wr = haste / cd.W,
            rateR = 1 / (rcd / haste + casts.R),
            procs = Math.min(derive(self).attackSpeed + qr + er, wen * wr);
          return {
            magic: qr * evaluate(qqd, self, target) + er * evaluate(eqd, self, target) + rateR * (evaluate(rd, self, target) + evaluate(rtick, self, target) * rlife / rinterval) + Math.min(qr, er) * evaluate(pd, self, target) + procs * evaluate(wed, self)
          };
        }
      },
      hooks: {
        onStart(ctx) {
          ctx.memory[MOOD] = '';
        },
        onCastStart(ctx) {
          const key = ctx.ability.key;
          if (!['Q', 'W', 'E', 'Wash'].includes(key)) {
            ctx.memory[`hwei:cast:${key}`] = ctx.world.nextId++;
            ctx.memory[`hwei:start:${key}`] = ctx.tick;
            ctx.memory[`hwei:origin:${key}`] = ctx.self.x;
            ctx.memory[`hwei:direction:${key}`] = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1);
          }
          if (key === 'WW') {
            const x = ctx.aim?.distance === undefined ? ctx.self.x : ctx.self.x + directionTo(ctx.self, ctx.enemy) * ctx.aim.direction * Math.min(wwr, Math.max(0, ctx.aim.distance));
            const t: Task = {
              type: 'pool',
              start: ctx.tick,
              until: ctx.tick + ticks(wwlife),
              next: ctx.tick
            };
            const m = task(ctx, 'WW-pool', x, t);
            pool(ctx, m, t);
          }
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (['Q', 'W', 'E'].includes(key)) {
            ctx.memory[MOOD] = key;
            return;
          }
          if (key === 'Wash') {
            ctx.memory[MOOD] = '';
            delete ctx.memory['hwei:wanted'];
            return;
          }
          if (['QQ', 'QW', 'QE', 'WQ', 'WW', 'WE', 'EQ', 'EW', 'EE'].includes(key)) {
            ctx.memory[MOOD] = '';
            delete ctx.memory['hwei:wanted'];
          }
          const sn = serial(ctx.self, key),
            start = Number(ctx.memory[`hwei:start:${key}`] ?? ctx.tick),
            origin = Number(ctx.memory[`hwei:origin:${key}`] ?? ctx.self.x),
            dir = Number(ctx.memory[`hwei:direction:${key}`] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1;
          if (key === 'WE') {
            ctx.memory[`${LIGHTS}:count`] = wen;
            ctx.memory[`${LIGHTS}:until`] = ctx.tick + ticks(welife);
          }
          if (key === 'QE') {
            for (let i = 0; i < qen; i++) area(ctx, 'QE-shock', origin + dir * qer * i / (qen - 1), qerad, start + Math.ceil((qedly + i * qegap) * 30 - EPS), [{
              type: 'damage',
              damageType: 'magic',
              amount: qed
            }], sn, start);
            const m: Missile = {
              id: ctx.world.nextId++,
              owner: ctx.self.side,
              source: 'QE-driver',
              seenTick: start,
              x: origin,
              perTick: qedriver / 30,
              direction: dir,
              homing: false,
              travelLeft: qer,
              projectile: true,
              connects: false,
              scale: 1,
              onHit: [],
              piercing: true,
              perceptionHidden: true
            };
            ctx.memory[`hwei:missile:${m.id}`] = sn;
            ctx.world.missiles.push(m);
          }
          if (key === 'WQ') task(ctx, 'WQ-path', origin, {
            type: 'path',
            start: ctx.tick,
            until: ctx.tick + ticks(wqlife),
            next: ctx.tick,
            direction: dir
          });
          if (key === 'EW') {
            const x = ctx.aim?.distance === undefined ? ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(ewr, Math.abs(ctx.enemy.x - ctx.self.x)) : ctx.self.x + dir * Math.min(ewr, Math.max(0, ctx.aim.distance)),
              distance = Math.abs(x - ctx.self.x);
            if (distance <= EPS) newEye(ctx, x, sn);else {
              const m: Missile = {
                id: ctx.world.nextId++,
                owner: ctx.self.side,
                source: 'EW-place',
                seenTick: start,
                x: ctx.self.x,
                perTick: ews / 30,
                direction: x > ctx.self.x ? 1 : -1,
                homing: false,
                travelLeft: distance,
                projectile: true,
                connects: false,
                scale: 1,
                onHit: [],
                piercing: true,
                interceptable: true,
                perceptionHidden: true
              };
              ctx.memory[`hwei:missile:${m.id}`] = sn;
              ctx.world.missiles.push(m);
            }
          }
          if (key === 'EE') {
            const x = ctx.aim?.distance === undefined ? ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(eer, Math.abs(ctx.enemy.x - ctx.self.x)) :
              ctx.self.x + directionTo(ctx.self, ctx.enemy) * ctx.aim.direction * Math.min(eer, Math.max(0, ctx.aim.distance));
            area(ctx, 'EE', x, eebound, start + ticks(eedly), spell('EE').onHit!, sn, start,
              eeextent(ctx.enemy.spec.base.radius) - ctx.enemy.spec.base.radius);
          }
        },
        onMissileCreated(ctx) {
          ctx.memory[`hwei:missile:${ctx.missile.id}`] = serial(ctx.self, ctx.ability.key);
          ctx.missile.onHit = tag(ctx.missile.onHit, ctx.ability.key, serial(ctx.self, ctx.ability.key));
          if (ctx.ability.key === 'R') ctx.missile.hitPets = ctx.world.pets.filter(p => p.spec.targetClass !== 'champion').map(p => p.id);
        },
        onZoneCreated(ctx) {
          ctx.zone.onHit = tag(ctx.zone.onHit ?? [], ctx.ability.key, serial(ctx.self, ctx.ability.key), ctx.zone.x);
          ctx.zone.memory = {
            serial: serial(ctx.self, ctx.ability.key)
          };
        },
        onAbilityContact(ctx) {
          const key = ctx.ability.key;
          if (key === 'QQ') return [];
          if (!['QQ-explosion', 'QW', 'QE-shock', 'QE-lava', 'EQ', 'EW-seeker', 'EE', 'R-tick', 'R-explosion'].includes(key)) return;
          const sn = parsed(ctx.effects, ctx.self, key),
            b: Body = ctx.enemy.petId === undefined ? {
              target: ctx.enemy
            } : {
              target: ctx.enemy,
              pet: ctx.world.pets.find(p => p.id === ctx.enemy.petId)
            },
            bid = id(b);
          ctx.memory[`hwei:contact:${key}:${bid}`] = sn;
          let packet = [...ctx.effects];
          if (key === 'QE-shock') {
            const once = `hwei:shock:${sn}:${bid}`;
            if (ctx.memory[once]) return [];
            ctx.memory[once] = true;
          }
          const de = packet.find(e => e.type === 'damage'),
            x = de?.type === 'damage' && de.label?.split(':')[3] !== undefined ? Number(de.label.split(':')[3]) : ctx.originX;
          if (key === 'EE') {
            const d = Math.abs(ctx.enemy.x - x),
              u = Math.max(0, d * Math.sin(angle) - eelen / 2),
              v = Math.max(0, d * Math.cos(angle) - eew / 2);
            if (Math.hypot(u, v) > ctx.enemy.spec.base.radius + EPS) return [];
            ctx.memory[`hwei:EE-center:${bid}`] = x;
          }
          if (key === 'QQ-explosion' && b.pet?.spec.targetClass === 'monster') packet = packet.map(e => e.type === 'damage' ? {
            ...e,
            amount: {
              base: qqd.base + (qqd.ratios?.AP ?? 0) * derive(ctx.self).ap + Math.min(qqcap, (qqd.ratios?.targetMaxHP ?? 0) * derive(ctx.enemy).maxHp)
            }
          } : e);
          if (key === 'QW') {
            const declaredCount = de?.type === 'damage' ? de.label?.split(':')[4] : undefined,
              n = declaredCount === undefined ? qwRecipients(ctx, x) : Number(declaredCount),
              held = ctx.enemy.statuses.some(s => s.kind === 'cc' && ['stun', 'root', 'airborne', 'suspension', 'suppression', 'sleep', 'charm', 'fear', 'taunt'].includes(s.key)),
              base = evaluate(qwd, ctx.self),
              missing = Math.max(0, Math.min(1, 1 - ctx.enemy.hp / derive(ctx.enemy).maxHp)),
              bonus = n === 1 || held ? base * (qwmax - 1) * missing : 0,
              monster = b.pet?.spec.targetClass === 'monster',
              reduced = b.pet?.spec.targetClass === 'minion' || monster && !b.pet?.spec.epicMonster;
            packet = packet.map(e => e.type === 'damage' ? {
              ...e,
              amount: {
                base: (base + (monster ? Math.min(qwcap, bonus) : bonus)) * (reduced ? qwsmall : 1)
              }
            } : e);
          }
          if ((key === 'QE-shock' || key === 'QE-lava') && b.pet) {
            const factor = b.pet.spec.targetClass === 'minion' ? qeminion : b.pet.spec.targetClass === 'monster' ? qemonster : 1;
            packet = packet.map(e => e.type === 'damage' ? {
              ...e,
              amount: {
                base: evaluate(e.amount, ctx.self, ctx.enemy) * factor
              }
            } : e);
          }
          if (key === 'EQ') {
            const d = Math.abs(ctx.enemy.x - ctx.self.x);
            let strength = Number(eqtable.values[0]) / 100;
            for (let i = 1; i < eqtable.points.length; i++) {
              const lo = Number(eqtable.points[i - 1]),
                hi = Number(eqtable.points[i]);
              if (d >= hi) strength = Number(eqtable.values[i]) / 100;else if (d >= lo) {
                strength = (Number(eqtable.values[i - 1]) + (Number(eqtable.values[i]) - Number(eqtable.values[i - 1])) * (d - lo) / (hi - lo)) / 100;
                break;
              }
            }
            packet.push(slow(strength, eqtime));
          }
          if (key === 'R-tick') {
            const key = `hwei:despair:${sn}:${bid}`,
              next = Math.min(rstacks, Number(ctx.memory[key] ?? 0) + 1);
            ctx.memory[`${key}:next`] = next;
            packet.push(slow(next * rslow, rinterval));
          }
          if (!ctx.defense || ctx.defense === 'spellShield') light(ctx, b, `cast:${sn}`, !['EQ', 'EW-seeker'].includes(key), ctx.scale);
          return packet;
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key,
            b: Body = ctx.enemy.petId === undefined ? {
              target: ctx.enemy
            } : {
              target: ctx.enemy,
              pet: ctx.world.pets.find(p => p.id === ctx.enemy.petId)
            },
            bid = id(b),
            sn = Number(ctx.memory[`hwei:contact:${key}:${bid}`] ?? serial(ctx.self, key));
          if (key === 'R') {
            attach(ctx, b, serial(ctx.self, 'R'), ctx.scale);
            return;
          }
          if (!['QQ-explosion', 'QW', 'QE-shock', 'QE-lava', 'EQ', 'EW-seeker', 'EE', 'R-tick', 'R-explosion'].includes(key)) return;
          signature(ctx, b, sn);
          if (key === 'R-tick') {
            const key = `hwei:despair:${sn}:${bid}`,
              accepted = b.target.statuses.findLast(s => s.kind === 'cc' && s.key === 'slow' && s.source === ctx.self.side && s.ability === 'R-tick' && s.startTick === ctx.tick);
            if (accepted) {
              accepted.memoKey = key;
              ctx.memory[key] = Number(ctx.memory[`${key}:next`] ?? 1);
              ctx.memory[`${key}:until`] = accepted.endTick;
              b.target.statuses = b.target.statuses.filter(s => s.memoKey !== key || s === accepted);
              sync(b);
            }
          }
          if (key === 'EE') {
            const x = Number(ctx.memory[`hwei:EE-center:${bid}`] ?? ctx.enemy.x),
              delta = Math.abs(ctx.enemy.x - x);
            if (delta > EPS) immediateDisplace(ctx.world, ctx.self, ctx.enemy, x - ctx.enemy.x, key);
            sync(b);
            applyEESlow(ctx, b);
          }
        },
        onZoneLand(ctx) {
          if (ctx.zone.ability === 'QW') {
            const n = qwRecipients(ctx, ctx.zone.x, ctx.zone.connects !== false);
            ctx.zone.onHit = ctx.zone.onHit?.map(e => e.type === 'damage' ? { ...e, label: `${e.label}:${n}` } : e);
          }
          if (ctx.zone.ability === 'QE-shock') task(ctx, 'QE-lava', ctx.zone.x, {
            type: 'lava',
            start: ctx.tick,
            until: ctx.tick + ticks(qelife),
            pulse: 1,
            serial: Number(ctx.zone.memory?.serial ?? 0)
          });
        },
        onAttack(ctx) {
          ctx.action.attackTag = `hwei:basic:${ctx.world.nextId++}`;
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) light(ctx, {
            target: ctx.enemy
          }, ctx.attack.attackTag ?? `basic:${ctx.tick}`, false, ctx.scale);
        },
        onAttackPetHit(ctx) {
          if (!ctx.blocked) light(ctx, {
            target: ctx.enemy,
            pet: ctx.pet
          }, ctx.attack.attackTag ?? `basic:${ctx.tick}`, false, ctx.scale);
        },
        onMissileContact(ctx) {
          if (ctx.missile.source === 'QQ') qqBlast(ctx, ctx.missile, ctx.missile.x, ctx.targetPet ? {
            target: petFormulaTarget(ctx.targetPet, ctx.self, ctx.tick),
            pet: ctx.targetPet
          } : {
            target: ctx.enemy
          });
        },
        onMissileEnd(ctx) {
          const m = ctx.missile;
          if (m.source === 'QQ' && ctx.reason === 'range' && !m.hitTargets?.length && !m.hitPets?.length) qqBlast(ctx, m, m.x + m.direction * qqend);
          if (m.source === 'EW-place' && ctx.reason === 'range') newEye(ctx, m.x, Number(ctx.memory[`hwei:missile:${m.id}`] ?? 0));
          if (m.source === 'QE-driver' && ctx.reason !== 'range') {
            const sn = Number(ctx.memory[`hwei:missile:${m.id}`] ?? 0);
            ctx.world.zones = ctx.world.zones.filter(z => !(z.ability === 'QE-shock' && z.memory?.serial === sn && z.endTick > ctx.tick));
          }
          if (m.source === 'R' && ctx.reason === 'range' && !m.hitTargets?.length && !(m.hitPets ?? []).some(n => ctx.world.pets.find(p => p.id === n)?.spec.targetClass === 'champion')) {
            const targets = hostile(ctx.world, ctx.self).filter(champion).filter(b => Math.abs(b.target.x - m.x) <= rend + b.target.spec.base.radius + EPS).sort((a, b) => Math.abs(a.target.x - m.x) - Math.abs(b.target.x - m.x)),
              b = targets[0];
            if (b && (b.pet || m.connects)) {
              if (b.pet) abilityHitPet(ctx.world, ctx.self, b.pet, spell('R'), spell('R').onHit!, 'singleTarget', 1, m.x);else abilityHit(ctx.world, ctx.self, b.target, spell('R'), spell('R').onHit!, m.scale, m.x);
            }
          }
        },
        onMissileTick(ctx) {
          const m = ctx.missile;
          if (m.source === 'R') {
            m.hitPets = [...new Set([...(m.hitPets ?? []), ...ctx.world.pets.filter(p => p.spec.targetClass !== 'champion').map(p => p.id)])];
            return;
          }
          if (m.source === 'EW-seeker') {
            const b = body(ctx.world, ctx.self, String(ctx.memory[`hwei:seeker:${m.id}`] ?? ''));
            if (b?.target.alive) m.direction = b.target.x >= m.x ? 1 : -1;
            return;
          }
          const raw = ctx.memory[`hwei:task:${m.id}`];
          if (typeof raw !== 'string') return;
          const t = JSON.parse(raw) as Task;
          if (t.type === 'pool') {
            pool(ctx, m, t);
            return;
          }
          if (t.type === 'path') {
            if (ctx.tick >= t.until) {
              m.ended = true;
              return;
            }
            if (ctx.tick >= (t.next ?? t.start)) {
              const n = Math.floor((ctx.tick - t.start) / (wqinterval * 30) + EPS);
              t.next = t.start + Math.ceil((n + 1) * wqinterval * 30 - EPS);
              const end = m.x + (t.direction ?? 1) * Math.min(wqr, (ctx.tick - t.start) / 30 * wqdriver);
              for (const b of friends(ctx.world, ctx.self)) {
                if (b.target.x < Math.min(m.x, end) - EPS || b.target.x > Math.max(m.x, end) + EPS) continue;
                applyEffect(ctx.world, ctx.self, b.target, {
                  type: 'stat',
                  stat: 'moveSpeedPercent',
                  amount: {
                    base: wqbonus + wqap * derive(ctx.self).ap
                  },
                  duration: wqbuff
                }, {
                  ability: spell('WQ'),
                  scale: 1
                });
                applyEffect(ctx.world, ctx.self, b.target, {
                  type: 'state',
                  state: 'ghosted',
                  duration: wqbuff
                }, {
                  ability: spell('WQ'),
                  scale: 1
                });
                sync(b);
              }
            }
          }
          if (t.type === 'lava') {
            while (t.pulse! <= Math.round(qelife / qeinterval) && ctx.tick >= t.start + Math.ceil(t.pulse! * qeinterval * 30 - EPS)) {
              for (const b of hostile(ctx.world, ctx.self)) if (Math.abs(b.target.x - m.x) <= qerad + EPS) hit(ctx, b, 'QE-lava', [{
                type: 'damage',
                damageType: 'magic',
                amount: qetick,
                persistent: true,
                petDamageCategory: 'persistent'
              }], t.serial!, 1, m.x, 'persistent');
              t.pulse!++;
            }
            for (const b of hostile(ctx.world, ctx.self)) if (Math.abs(b.target.x - m.x) <= qerad + EPS) {
              applyEffect(ctx.world, ctx.self, b.target, slow(qeslow, 2 / 30), {
                ability: spell('QE-lava'),
                scale: 1
              });
              sync(b);
            }
            if (ctx.tick >= t.until) m.ended = true;
          }
          if (t.type === 'ee' && ctx.tick >= t.due!) {
            const b = body(ctx.world, ctx.self, t.host!);
            if (b?.target.alive && b.target.hp > 0) applyEESlow(ctx, b);
            m.ended = true;
          }
          if (t.type === 'eye') {
            if (ctx.tick >= t.until) {
              m.ended = true;
              return;
            }
            if (ctx.tick < t.start + ticks(Math.max(ewarm, ewexpand))) return;
            if (!t.locked) {
              const targets = hostile(ctx.world, ctx.self).filter(champion).filter(b => canSee(b.target, ctx.self) && !isUntargetable(b.target, ctx.self) && Math.abs(b.target.x - m.x) <= ewrad + EPS).sort((a, b) => Math.abs(a.target.x - m.x) - Math.abs(b.target.x - m.x) || id(a).localeCompare(id(b))),
                b = targets[0];
              if (b) {
                t.locked = id(b);
                t.fire = ctx.tick + ticks(ewfire);
                applyEffect(ctx.world, ctx.self, b.target, {
                  type: 'state',
                  state: 'revealed',
                  duration: ewfire + ewlaunch / ews
                }, {
                  ability: spell('EW-eye'),
                  scale: 1
                });
                sync(b);
              }
            } else if (ctx.tick >= t.fire!) {
              m.ended = true;
              const b = body(ctx.world, ctx.self, t.locked);
              if (!b || !b.target.alive || b.target.hp <= 0 || Math.abs(b.target.x - m.x) > ewlaunch + EPS || isUntargetable(b.target, ctx.self) || inStasis(b.target)) return;
              const seeker: Missile = {
                id: ctx.world.nextId++,
                owner: ctx.self.side,
                source: 'EW-seeker',
                seenTick: t.fire! - ticks(ewfire),
                x: m.x,
                perTick: ews / 30,
                direction: b.target.x >= m.x ? 1 : -1,
                homing: false,
                travelLeft: ewlaunch,
                projectile: true,
                connects: true,
                scale: 1,
                onHit: tag([{
                  type: 'damage',
                  damageType: 'magic',
                  amount: ewd
                }, {
                  type: 'cc',
                  cc: 'root',
                  duration: ewroot
                }, {
                  type: 'state',
                  state: 'revealed',
                  duration: ewreveal
                }], 'EW-seeker', t.serial!),
                collisionPet: true,
                radius: ewwidth
              };
              ctx.memory[`hwei:seeker:${seeker.id}`] = t.locked;
              ctx.world.missiles.push(seeker);
            }
          }
          if (t.type === 'R') {
            const b = body(ctx.world, ctx.self, t.host!);
            if (b) m.x = b.target.x;
            if (!b || !b.target.alive || b.target.hp <= 0) {
              burst(ctx, m, t);
              return;
            }
            const radius = rrad * Math.max(0, Math.min(1, (ctx.tick - t.start) / ticks(rlife)));
            m.radius = radius;
            for (const recipient of hostile(ctx.world, ctx.self)) {
              const key = `hwei:despair:${t.serial}:${id(recipient)}`,
                until = Number(ctx.memory[`${key}:until`] ?? -1);
              // Equality is a contiguous renewal on the 30 Hz grid. A true
              // gap, or an earlier dispel, removes the previous stack count.
              if (until < ctx.tick || until > ctx.tick && !recipient.target.statuses.some(s => s.memoKey === key && s.endTick > ctx.tick)) {
                delete ctx.memory[key];
                delete ctx.memory[`${key}:until`];
              }
            }
            while (t.pulse! <= Math.round(rlife / rinterval) && ctx.tick >= t.start + Math.ceil(t.pulse! * rinterval * 30 - EPS)) {
              for (const target of hostile(ctx.world, ctx.self)) if (Math.abs(target.target.x - m.x) <= radius + target.target.spec.base.radius + EPS) hit(ctx, target, 'R-tick', [{
                type: 'damage',
                damageType: 'magic',
                amount: rtick,
                persistent: true,
                petDamageCategory: 'persistent'
              }], t.serial!, t.scale ?? 1, m.x, 'persistent');
              t.pulse!++;
            }
            m.impactTick = t.start + Math.ceil(t.pulse! * rinterval * 30 - EPS);
            if (ctx.tick >= t.until) {
              burst(ctx, m, t);
              return;
            }
          }
          saveTask(ctx, m, t);
        },
        onDeathObserved(ctx) {
          for (const m of ctx.world.missiles) {
            if (m.owner !== ctx.self.side || m.source !== 'R-aura' || m.ended) continue;
            const raw = ctx.memory[`hwei:task:${m.id}`];
            if (typeof raw !== 'string') continue;
            const t = JSON.parse(raw) as Task,
              key = ctx.targetPet ? `p${ctx.targetPet.id}` : `u${ctx.victim === ctx.self ? ctx.self.side : ctx.enemy.side}`;
            if (t.host === key) {
              m.x = ctx.victim.x;
              burst(ctx, m, t);
            }
          }
        },
        onTick: decay,
        onTickWhileDead(ctx) {
          ctx.memory[MOOD] = '';
          ctx.memory[`${LIGHTS}:until`] = 0;
          decay(ctx);
        }
      }
    };
  }
};
export default hwei;
