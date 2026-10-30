import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { compileKit } from '../../engine/kits/compile';
import { advanceMissiles, canCast, startAttack, startCast } from '../../engine/sim/actions';
import { perceive, type Behavior } from '../../engine/sim/behavior';
import { abilityHit, applyEffect, dealDamage } from '../../engine/sim/combat';
import { derive, hasState } from '../../engine/sim/derived';
import { simulateMatchup } from '../../engine/sim/matchup';
import { spawnPet } from '../../engine/sim/pets';
import { petFormulaTarget } from '../../engine/sim/petTarget';
import { createWorld, step } from '../../engine/sim/simulate';
import type { BonusStats, PetSpec, StateType } from '../../engine/sim/spec';
import { cloneWorld, type Aim, type Unit, type World } from '../../engine/sim/state';
import type { StatPrices } from '../../engine/budget';
import Hwei from '../../kits/champions/Hwei';
import { fighter } from '../sim/kits';
import { championData, kit, records } from './helpers';
const compiled = compileKit(championData('Hwei'), records('Hwei'), Hwei),
  idle: Behavior = () => undefined;
const spell = (key: string) => compiled.spec.abilities.find(a => a.key === key)!;
const arena = (distance = 400, bonus: BonusStats = {}) => {
  const w = createWorld({
    fighters: [{
      ...compiled.spec,
      base: {
        ...compiled.spec.base,
        hpRegen: 0,
        resourceRegen: 0
      },
      bonus
    }, fighter({
      base: {
        hp: 100000,
        hpRegen: 0,
        resourceRegen: 0,
        armor: 0,
        mr: 0,
        moveSpeed: 0
      }
    })],
    distance: 0,
    modes: ['idle', 'idle'],
    settings: {
      log: true,
      maxSeconds: 60,
      reactionTime: 1
    }
  });
  w.units[0].x = 0;
  w.units[1].x = distance;
  return w;
};
const through = (w: World, t: number) => {
  while (w.tick <= t && !w.result) step(w, [idle, idle]);
};
const cast = (w: World, key: string, aim?: Aim) => {
  expect(canCast(w, w.units[0], spell(key))).toBe(true);
  startCast(w, w.units[0], spell(key), aim);
};
const select = (w: World, key: string, aim?: Aim) => {
  if (['QQ', 'QW', 'QE', 'WQ', 'WW', 'WE', 'EQ', 'EW', 'EE'].includes(key)) cast(w, key[0]!);
  cast(w, key, aim);
};
const finish = (w: World, key: string, aim?: Aim) => {
  select(w, key, aim);
  through(w, w.tick + Math.ceil(spell(key).castTime * 30));
};
const buff = (w: World, target: Unit, key: StateType, duration = 10) => applyEffect(w, target, target, {
  type: 'state',
  state: key,
  duration
}, {
  scale: 1
});
const pet = (w: World, x: number, owner: 0 | 1 = 1, extra: Partial<PetSpec> = {}) => spawnPet(w, w.units[owner], {
  kind: 'fixture',
  name: 'Actual fixture body',
  hp: 10000,
  armor: 0,
  mr: 0,
  radius: 35,
  moveSpeed: 0,
  duration: 60,
  targetClass: 'champion',
  ...extra
}, x);
const damage = (w: World) => w.units[1].totals.damageTaken;
const shields = (u: Unit) => u.statuses.filter(s => s.kind === 'shield');
const manual = (w: World, to: number) => {
  while (w.tick <= to) {
    advanceMissiles(w);
    w.tick++;
  }
};
describe('Hwei pinned sources and legal spell books', () => {
  it('reads all15 exact primary records and object-scoped binary evidence before sealing', () => {
    expect(new Set(compiled.evidence.filter(e => e.revid > 0).map(e => e.ability)).size).toBe(15);
    expect(compiled.evidence.filter(e => e.url).length).toBeGreaterThanOrEqual(15);
    expect(records('Hwei').reduce((n, r) => n + (r.gameSources?.length ?? 0), 0)).toBe(29);
    expect(compiled.assumptions.some(a => a.includes('server center offsets'))).toBe(true);
  });
  it('keeps parsed second keys separate from actual shared Q/W/E maximum ranks', () => {
    expect(spell('QW').slot).toBe('Q');
    expect(spell('QE').cooldown).toBe(6);
    expect(spell('WE').slot).toBe('W');
    expect(spell('WE').cooldown).toBe(16);
    expect(spell('EW').cooldown).toBe(10);
    expect(spell('QQ').onHit?.[0]).toMatchObject({
      amount: {
        base: 170,
        ratios: {
          AP: .8,
          targetMaxHP: .07
        }
      }
    });
    expect(spell('R').cooldown).toBe(80);
  });
  it('starts outside a mood with inaccessible subspells', () => {
    const w = arena();
    expect(w.units[0].memory['hwei:mood']).toBe('');
    expect(canCast(w, w.units[0], spell('QQ'))).toBe(false);
    expect(canCast(w, w.units[0], spell('R'))).toBe(true);
  });
  it('enters a book free without counting as an activation or exposing R', () => {
    const w = arena(),
      mana = w.units[0].resource;
    cast(w, 'Q');
    expect(w.units[0].resource).toBe(mana);
    expect(spell('Q').countsAsCast).toBe(false);
    expect(canCast(w, w.units[0], spell('QQ'))).toBe(true);
    expect(canCast(w, w.units[0], spell('WE'))).toBe(false);
    expect(canCast(w, w.units[0], spell('R'))).toBe(false);
  });
  it('Wash Brush is free under suppression while selected spells remain disabled', () => {
    const w = arena(),
      mana = w.units[0].resource;
    cast(w, 'Q');
    applyEffect(w, w.units[1], w.units[0], {
      type: 'cc',
      cc: 'suppression',
      duration: 2
    }, {
      scale: 1
    });
    expect(canCast(w, w.units[0], spell('QQ'))).toBe(false);
    cast(w, 'Wash');
    expect(w.units[0].memory['hwei:mood']).toBe('');
    expect(w.units[0].resource).toBe(mana);
    expect(w.units[0].cooldownReady.Q).toBeUndefined();
  });
  it('selecting QQ pays120 and shares one6second Q group', () => {
    const w = arena(),
      mana = w.units[0].resource;
    finish(w, 'QQ');
    expect(w.units[0].resource).toBe(mana - 120);
    expect(w.units[0].memory['hwei:mood']).toBe('');
    expect(w.units[0].cooldownReady.Q).toBe(188);
    expect(w.units[0].cooldownReady.QQ).toBeUndefined();
    cast(w, 'Q');
    expect(canCast(w, w.units[0], spell('QW'))).toBe(false);
    cast(w, 'Wash');
  });
  it('book switches cannot reset the selected spell cooldown or pay its mana twice', () => {
    const w = arena();
    finish(w, 'WE');
    const due = w.units[0].cooldownReady.W,
      mana = w.units[0].resource;
    cast(w, 'W');
    cast(w, 'Wash');
    expect(w.units[0].cooldownReady.W).toBe(due);
    expect(w.units[0].resource).toBe(mana);
  });
  it('cloned books and stock state remain independent', () => {
    const w = arena();
    cast(w, 'W');
    const fork = cloneWorld(w);
    cast(w, 'WE');
    expect(w.units[0].memory['hwei:mood']).toBe('');
    expect(fork.units[0].memory['hwei:mood']).toBe('W');
    expect(fork.units[0].memory['hwei:lights:count']).toBeUndefined();
  });
  it('budget reads are finite after KitContext sealing and price no fictional ally shield', () => {
    const w = arena(300, {
      ap: 100,
      abilityHaste: 50
    });
    const value = compiled.spec.budget!.damage!(w.units[0], w.units[1]);
    expect(Number.isFinite(value.magic)).toBe(true);
    expect(value.magic).toBeGreaterThan(0);
    expect(compiled.spec.budget?.healing).toBeUndefined();
    expect(w.pets).toHaveLength(0);
  });
});
describe('Hwei QQ and QW actual contacts', () => {
  it('deals170+80%AP+7%actualmaxHP once on the champion', () => {
    const w = arena(300, {
      ap: 100
    });
    finish(w, 'QQ');
    through(w, 30);
    expect(damage(w)).toBeCloseTo(170 + 80 + 7000, 10);
  });
  it('collides with a real minion first without transferring a champion miss scale', () => {
    const w = arena(800),
      p = pet(w, 300, 1, {
        targetClass: 'minion'
      });
    finish(w, 'QQ');
    through(w, 35);
    expect(p.hp).toBe(9130);
    expect(damage(w)).toBe(0);
  });
  it('splashes each nearby real body once from the contact coordinate', () => {
    const w = arena(400),
      p = pet(w, 300),
      q = pet(w, 350);
    finish(w, 'QQ');
    through(w, 30);
    expect(p.hp).toBe(9130);
    expect(q.hp).toBe(9130);
    expect(damage(w)).toBe(7170);
  });
  it('caps only the maximum-health component against monsters', () => {
    const w = arena(2000, {
        ap: 100
      }),
      p = pet(w, 300, 1, {
        targetClass: 'monster'
      });
    finish(w, 'QQ');
    through(w, 30);
    expect(p.hp).toBe(9500);
  });
  it('has an uncollided endpoint blast100units past800travel', () => {
    const w = arena(1100);
    finish(w, 'QQ');
    through(w, 45);
    expect(damage(w)).toBe(7170);
  });
  it('projectile walls deny QQ instead of creating a range-expiry blast', () => {
    const w = arena(500);
    w.zones.push({
      id: w.nextId++,
      owner: 1,
      kind: 'projectileWall',
      seenTick: 0,
      x: 200,
      radius: 20,
      startTick: 0,
      endTick: 1000
    });
    finish(w, 'QQ');
    through(w, 40);
    expect(damage(w)).toBe(0);
  });
  it('QW lands at1second from declaration, not1.5seconds', () => {
    const w = arena(500);
    select(w, 'QW');
    through(w, 29);
    expect(damage(w)).toBe(0);
    through(w, 30);
    expect(damage(w)).toBe(160);
  });
  it('QW uses350%total at full missing-health limit rather than450%', () => {
    const w = arena(500, {
      ap: 100
    });
    w.units[1].hp = 1000;
    finish(w, 'QW');
    through(w, 31);
    expect(damage(w)).toBeCloseTo(190 * (1 + 2.5 * .99), 9);
  });
  it('QW isolation counts actual nearby pets', () => {
    const w = arena(500);
    w.units[1].hp = 50000;
    pet(w, 550);
    finish(w, 'QW');
    through(w, 31);
    expect(damage(w)).toBe(160);
  });
  it.each(['untargetable', 'stasis'] as const)('peer regression: QW isolation excludes an actual %s neighbor', state => {
    const w = arena(500), neighbor = pet(w, 550);
    w.units[1].hp = 50000;
    const view = petFormulaTarget(neighbor, w.units[0], w.tick);
    buff(w, view, state);
    neighbor.statuses = view.statuses;
    finish(w, 'QW');
    through(w, 31);
    expect(damage(w)).toBe(160 * (1 + 2.5 * .5));
    expect(neighbor.hp).toBe(10000);
  });
  it('peer regression: QW isolation still counts an actual invisible area recipient', () => {
    const w = arena(500), neighbor = pet(w, 550);
    w.units[1].hp = 50000;
    const view = petFormulaTarget(neighbor, w.units[0], w.tick);
    buff(w, view, 'invisible');
    neighbor.statuses = view.statuses;
    finish(w, 'QW');
    through(w, 31);
    expect(damage(w)).toBe(160);
    expect(neighbor.hp).toBe(9840);
  });
  it('peer regression: QW impact isolation does not change after its first recipient dies', () => {
    const w = arena(500), neighbor = pet(w, 550);
    w.units[1].hp = 1;
    neighbor.hp = 5000;
    finish(w, 'QW');
    through(w, 31);
    expect(w.units[1].alive).toBe(false);
    expect(neighbor.hp).toBe(4840);
  });
  it('peer regression: a QW champion miss leaves the actual pet as the sole hit recipient', () => {
    const w = arena(500), recipient = pet(w, 550);
    recipient.hp = 5000;
    select(w, 'QW');
    through(w, 15);
    const miss = cloneWorld(w);
    miss.zones.find(z => z.ability === 'QW')!.connects = false;
    through(miss, 31);
    expect(damage(miss)).toBe(0);
    expect(miss.pets.find(p => p.id === recipient.id)!.hp).toBe(4640);
    expect(w.pets.find(p => p.id === recipient.id)!.hp).toBe(5000);
  });
  it('QW an immobilized recipient still gains its missing-health multiplier among bodies', () => {
    const w = arena(500);
    w.units[1].hp = 50000;
    pet(w, 550);
    applyEffect(w, w.units[0], w.units[1], {
      type: 'cc',
      cc: 'root',
      duration: 3
    }, {
      scale: 1
    });
    finish(w, 'QW');
    through(w, 31);
    expect(damage(w)).toBe(360);
  });
});
describe('Hwei cast-local Signature and Stirring Lights', () => {
  it('a different cast consumes ink once and fixes the explosion at consumption location', () => {
    const w = arena(300);
    finish(w, 'QQ');
    through(w, 20);
    expect(Object.keys(w.units[0].memory).some(k => k === 'hwei:ink:u1')).toBe(true);
    finish(w, 'EQ');
    through(w, 45);
    const z = w.zones.find(z => z.ability === 'I-explosion')!;
    expect(z.x).toBe(300);
    expect(z.radius).toBe(285);
    w.units[1].x = 1000;
    through(w, z.endTick);
    expect(w.zones.some(z => z.ability === 'I-explosion')).toBe(false);
    expect(damage(w)).toBe(7400);
  });
  it('the same QE cast cannot consume its own mark despite multiple fields/ticks', () => {
    const w = arena(200);
    finish(w, 'QE');
    through(w, 135);
    expect(w.zones.some(z => z.ability === 'I-explosion')).toBe(false);
    expect(w.log.filter(e => e.text.includes('Signature of the Visionary'))).toHaveLength(0);
  });
  it('preserves the first in-flight cast serial when another QQ is declared', () => {
    const w = arena(700);
    finish(w, 'QQ');
    w.units[0].cooldownReady.Q = 0;
    finish(w, 'QQ');
    through(w, 40);
    expect(w.zones.filter(z => z.ability === 'I-explosion')).toHaveLength(1);
  });
  it('WE starts with exactly three stocks, restores65once and cannot recursively consume them', () => {
    const w = arena(300);
    finish(w, 'WE');
    const before = w.units[0].resource;
    finish(w, 'QQ');
    through(w, 30);
    expect(w.units[0].memory['hwei:lights:count']).toBe(2);
    expect(w.units[0].resource).toBe(before - 120 + 65);
    expect(damage(w)).toBe(7230);
    expect(w.zones.some(z => z.ability === 'I-explosion')).toBe(false);
  });
  it('WE one AoE stock covers multiple actual bodies without multiple mana refunds', () => {
    const w = arena(400),
      a = pet(w, 300),
      b = pet(w, 350);
    finish(w, 'WE');
    const mana = w.units[0].resource;
    finish(w, 'QQ');
    through(w, 30);
    expect(w.units[0].memory['hwei:lights:count']).toBe(2);
    expect(w.units[0].resource).toBe(mana - 120 + 65);
    expect(a.hp).toBe(9070);
    expect(b.hp).toBe(9070);
  });
  it('WE applies50%area-proc damage to an actual minion', () => {
    const w = arena(1300),
      p = pet(w, 300, 1, {
        targetClass: 'minion'
      });
    finish(w, 'WE');
    finish(w, 'QQ');
    through(w, 30);
    expect(p.hp).toBe(9100);
  });
  it('WE bypasses a parent spell shield but does not supply denied parent ink', () => {
    const w = arena(300);
    finish(w, 'WE');
    buff(w, w.units[1], 'spellShield');
    finish(w, 'QQ');
    through(w, 30);
    expect(damage(w)).toBe(60);
    expect(hasState(w.units[1], 'spellShield')).toBe(false);
    expect(w.units[0].memory['hwei:ink:u1']).toBeUndefined();
  });
  it('parry denies WE stock consumption and mana restoration', () => {
    const w = arena(300);
    finish(w, 'WE');
    buff(w, w.units[1], 'parry');
    const mana = w.units[0].resource;
    finish(w, 'QQ');
    through(w, 30);
    expect(damage(w)).toBe(0);
    expect(w.units[0].memory['hwei:lights:count']).toBe(3);
    expect(w.units[0].resource).toBe(mana - 120);
  });
  it('one connected basic spends one stock and clamps mana to actual maximum', () => {
    const w = arena(150);
    finish(w, 'WE');
    w.units[0].resource = derive(w.units[0]).maxResource - 10;
    startAttack(w, w.units[0]);
    through(w, 40);
    expect(w.units[0].memory['hwei:lights:count']).toBe(2);
    expect(w.units[0].resource).toBe(derive(w.units[0]).maxResource);
  });
  it('a blinded basic cannot use an orbiting light', () => {
    const w = arena(150);
    finish(w, 'WE');
    applyEffect(w, w.units[1], w.units[0], {
      type: 'cc',
      cc: 'blind',
      duration: 3
    }, {
      scale: 1
    });
    startAttack(w, w.units[0]);
    through(w, 40);
    expect(w.units[0].memory['hwei:lights:count']).toBe(3);
  });
  it('WE expires at nine seconds without a phantom proc', () => {
    const w = arena(150);
    finish(w, 'WE');
    w.tick = 270;
    startAttack(w, w.units[0]);
    through(w, 310);
    expect(w.units[0].memory['hwei:lights:count']).toBe(3);
  });
});
describe('Hwei released ground support and QE', () => {
  it('WW shields on declaration before its0.3second cast completes', () => {
    const w = arena();
    cast(w, 'W');
    cast(w, 'WW');
    expect(w.units[0].action).toMatchObject({
      kind: 'cast',
      endTick: 9
    });
    expect(shields(w.units[0])[0]?.value).toBe(130);
  });
  it('WW replenishes remaining capacity by the incremental amount, not by a fresh full shield', () => {
    const w = arena();
    select(w, 'WW');
    dealDamage(w, w.units[1], w.units[0], 100, 'true');
    expect(shields(w.units[0])[0]?.value).toBe(30);
    through(w, 8);
    expect(shields(w.units[0])[0]?.value).toBeCloseTo(51.6666666666667, 10);
  });
  it('WW caps strength260while repeated absorption can regenerate beyond that total', () => {
    const w = arena();
    select(w, 'WW');
    through(w, 50);
    expect(shields(w.units[0])[0]?.value).toBeCloseTo(260, 9);
    dealDamage(w, w.units[1], w.units[0], 200, 'true');
    through(w, 80);
    expect(shields(w.units[0])[0]?.value).toBeGreaterThan(60);
    expect(shields(w.units[0])[0]?.value).toBeLessThanOrEqual(260);
  });
  it('actual allies get85%and actual minions receive no invented champion shield', () => {
    const w = arena(),
      a = pet(w, 200, 0),
      m = pet(w, 100, 0, {
        targetClass: 'minion'
      });
    select(w, 'WW');
    expect(a.statuses?.find(s => s.kind === 'shield')?.value).toBe(110.5);
    expect(m.statuses?.some(s => s.kind === 'shield')).toBe(false);
  });
  it('WW leaving the pool lets the0.5second shield expire; reentry starts at initial', () => {
    const w = arena();
    select(w, 'WW');
    w.units[0].x = 1000;
    through(w, 20);
    expect(shields(w.units[0])).toHaveLength(0);
    w.units[0].x = 0;
    through(w, 24);
    expect(shields(w.units[0])[0]?.value).toBe(130);
  });
  it('WQ preserves declaration origin and grants speed/ghosting only on its actual path', () => {
    const w = arena(2000),
      a = pet(w, -300, 0),
      off = pet(w, 300, 0);
    select(w, 'WQ', {
      direction: -1
    });
    w.units[0].x = 100;
    through(w, 30);
    expect(a.statuses?.some(s => s.kind === 'state' && s.key === 'ghosted')).toBe(true);
    expect(off.statuses?.some(s => s.kind === 'state' && s.key === 'ghosted')).toBe(false);
    expect(hasState(w.units[0], 'ghosted')).toBe(false);
  });
  it('QE starts its first shockwave0.6seconds from declaration and hits each body once', () => {
    const w = arena(200);
    select(w, 'QE');
    through(w, 17);
    expect(damage(w)).toBe(0);
    through(w, 18);
    expect(damage(w)).toBe(80);
    through(w, 30);
    expect(damage(w)).toBe(100);
  });
  it('QE overlapping pools each contribute their own ten ticks without duplicate shockwaves', () => {
    const w = arena(200);
    finish(w, 'QE');
    through(w, 135);
    expect(damage(w)).toBe(680);
  });
  it('QE spell shield denies shockwaves while independent lava still damages', () => {
    const w = arena(0);
    buff(w, w.units[1], 'spellShield');
    finish(w, 'QE');
    through(w, 110);
    expect(damage(w)).toBe(400);
    expect(hasState(w.units[1], 'spellShield')).toBe(false);
  });
  it('QE actual projectile interception removes future eruptions but leaves released lava', () => {
    const w = arena(200);
    select(w, 'QE');
    through(w, 20);
    const released = w.missiles.filter(m => m.source === 'QE-lava').length;
    w.zones.push({
      id: w.nextId++,
      owner: 1,
      kind: 'projectileWall',
      seenTick: 0,
      x: 350,
      radius: 20,
      startTick: w.tick,
      endTick: 1000
    });
    through(w, 30);
    expect(w.zones.some(z => z.ability === 'QE-shock' && z.endTick > w.tick)).toBe(false);
    expect(w.missiles.filter(m => m.source === 'QE-lava').length).toBeGreaterThanOrEqual(released);
  });
});
describe('Hwei E controls and real eye recipients', () => {
  it('EQ first-body fear uses live target-local slow and normal tenacity', () => {
    const w = arena(300);
    applyEffect(w, w.units[1], w.units[1], {
      type: 'state',
      state: 'tenacity',
      duration: 10,
      value: .5
    }, {
      scale: 1
    });
    finish(w, 'EQ');
    through(w, 30);
    expect(damage(w)).toBe(230);
    const fear = w.units[1].statuses.find(s => s.kind === 'cc' && s.key === 'fear');
    expect(fear?.endTick! - fear?.startTick!).toBe(23);
  });
  it('EQ hits an intervening actual minion instead of the champion', () => {
    const w = arena(800),
      p = pet(w, 300, 1, {
        targetClass: 'minion'
      });
    finish(w, 'EQ');
    through(w, 40);
    expect(p.hp).toBe(9770);
    expect(damage(w)).toBe(0);
    expect(p.statuses?.some(s => s.key === 'fear')).toBe(true);
  });
  it('EW placement is an actual finite blockable projectile', () => {
    const w = arena(600);
    w.zones.push({
      id: w.nextId++,
      owner: 1,
      kind: 'projectileWall',
      seenTick: 0,
      x: 200,
      radius: 20,
      startTick: 0,
      endTick: 1000
    });
    finish(w, 'EW');
    through(w, 100);
    expect(damage(w)).toBe(0);
    expect(w.missiles.some(m => m.source === 'EW-eye' || m.source === 'EW-seeker')).toBe(false);
  });
  it('EW cannot lock an ordinary minion as if it were an enemy champion', () => {
    const w = arena(1500);
    pet(w, 100, 1, {
      targetClass: 'minion'
    });
    finish(w, 'EW', {
      direction: 1,
      distance: 0
    });
    through(w, 100);
    expect(w.missiles.some(m => m.source === 'EW-seeker')).toBe(false);
    expect(damage(w)).toBe(0);
  });
  it('EW locks a real champion-class clone and its seeker hits an intervening real minion first', () => {
    const w = arena(1500),
      block = pet(w, 100, 1, {
        targetClass: 'minion'
      }),
      clone = pet(w, 250, 1, {
        unitClass: 'clone'
      });
    finish(w, 'EW', {
      direction: 1,
      distance: 0
    });
    through(w, 65);
    expect(block.hp).toBe(9770);
    expect(block.statuses?.some(s => s.key === 'root')).toBe(true);
    expect(clone.hp).toBe(10000);
  });
  it('EW keeps trigger350, launch600and sight450as separate categories', () => {
    expect(compiled.evidence.some(e => e.text.includes('350 • 600 • 450'))).toBe(true);
    const w = arena(500);
    finish(w, 'EW', {
      direction: 1,
      distance: 0
    });
    through(w, 100);
    expect(damage(w)).toBe(0);
  });
  it('EE rejects a body outside the actual rotated rectangle slice even inside a400disk', () => {
    const w = arena(700);
    finish(w, 'EE', {
      direction: 1,
      distance: 400
    });
    through(w, 25);
    expect(damage(w)).toBe(0);
  });
  it.each([
    [35, 217, 230], [35, 219, 0], [100, 285, 230], [100, 288, 0],
    [35, -217, 230], [35, -219, 0], [100, -285, 230], [100, -288, 0]
  ])('peer regression: EE circle/rectangle boundary radius %s offset %s', (radius, offset, expected) => {
    const w = arena(400 + offset!);
    w.units[1].spec.base.radius = radius!;
    // On this axial slice the length bound is inactive. The nearest rectangle
    // edge is |offset| cos(20 degrees) - 170, measured independently of delivery.
    const distanceToRectangle = Math.max(0, Math.abs(offset!) * Math.cos(20 * Math.PI / 180) - 170);
    expect(distanceToRectangle <= radius!).toBe(expected === 230);
    finish(w, 'EE', { direction: 1, distance: 400 });
    through(w, 25);
    expect(damage(w)).toBe(expected);
  });
  it('peer regression: EE retains a real large pet touching the rotated edge', () => {
    const w = arena(2000), recipient = pet(w, 685, 1, { radius: 100 });
    finish(w, 'EE', { direction: 1, distance: 400 });
    through(w, 25);
    expect(recipient.hp).toBe(9770);
    expect(recipient.x).toBe(400);
  });
  it('EE pulls a real off-center body to its real declared center before decaying slow', () => {
    const w = arena(600);
    select(w, 'EE', {
      direction: 1,
      distance: 400
    });
    through(w, 20);
    expect(damage(w)).toBe(230);
    expect(w.units[1].x).toBeCloseTo(400, 8);
    const s = w.units[1].statuses.find(s => s.key === 'slow');
    expect(s?.memoKey).toBe('hwei:EE-decay');
    const before = s!.value;
    through(w, 30);
    expect(w.units[1].statuses.find(s => s.key === 'slow')?.value).toBeLessThan(before);
  });
  it('EE displacement immunity prevents movement while damage and ordinary slow remain', () => {
    const w = arena(600);
    buff(w, w.units[1], 'displacementImmune');
    finish(w, 'EE', {
      direction: 1,
      distance: 400
    });
    through(w, 25);
    expect(w.units[1].x).toBe(600);
    expect(damage(w)).toBe(230);
    expect(w.units[1].statuses.some(s => s.key === 'slow')).toBe(true);
  });
});
describe('Hwei finite attached Despair and production policy', () => {
  it('R initially passes through a real nonchampion instead of attaching to it', () => {
    const w = arena(500),
      p = pet(w, 200, 1, {
        targetClass: 'minion'
      });
    finish(w, 'R');
    through(w, 20);
    expect(w.missiles.some(m => m.source === 'R-aura')).toBe(true);
    expect(p.hp).toBe(10000);
  });
  it('R roots its aura on an actual champion-class clone before the main champion', () => {
    const w = arena(1000),
      p = pet(w, 300, 1, {
        unitClass: 'clone'
      });
    finish(w, 'R');
    through(w, 25);
    const aura = w.missiles.find(m => m.source === 'R-aura')!;
    expect(JSON.parse(String(w.units[0].memory[`hwei:task:${aura.id}`])).host).toBe(`p${p.id}`);
  });
  it('R has exactly twelve quarter-second ticks plus one450damage detonation', () => {
    const w = arena(500);
    finish(w, 'R');
    through(w, 130);
    expect(damage(w)).toBe(540);
    expect(w.missiles.some(m => m.source === 'R-aura')).toBe(false);
    expect(w.units[1].statuses.some(s => s.kind === 'cc' && s.ability === 'R-tick')).toBe(false);
    expect(w.zones.some(z => z.ability === 'I-explosion')).toBe(false);
  });
  it('root spell shield prevents attachment and all following damage', () => {
    const w = arena(500);
    buff(w, w.units[1], 'spellShield');
    finish(w, 'R');
    through(w, 130);
    expect(damage(w)).toBe(0);
    expect(w.missiles.some(m => m.source === 'R-aura')).toBe(false);
  });
  it('a new spell shield blocks one aura pulse rather than adding a Despair stack', () => {
    const w = arena(500);
    finish(w, 'R');
    through(w, 20);
    buff(w, w.units[1], 'spellShield');
    through(w, 26);
    expect(damage(w)).toBe(0);
    expect(w.units[1].statuses.some(s => s.ability === 'R-tick' && s.key === 'slow')).toBe(false);
  });
  it.each([0, .8])('peer regression: expired Despair restarts at one stack after leaving with tenacity %s', tenacity => {
    const w = arena(500), recipient = pet(w, 500);
    if (tenacity) {
      const view = petFormulaTarget(recipient, w.units[0], w.tick);
      applyEffect(w, view, view, { type: 'state', state: 'tenacity', value: tenacity, duration: 10 }, { scale: 1 });
      recipient.statuses = view.statuses;
    }
    finish(w, 'R');
    through(w, 20);
    const aura = w.missiles.find(m => m.source === 'R-aura')!;
    const start = JSON.parse(String(w.units[0].memory[`hwei:task:${aura.id}`])).start as number;
    through(w, start + Math.ceil(3 * .25 * 30));
    const previous = recipient.statuses!.findLast(s => s.ability === 'R-tick' && s.key === 'slow')!;
    expect(previous.value).toBeCloseTo(.3, 12);
    expect(previous.endTick - previous.startTick).toBe(8);
    recipient.x = 2000;
    through(w, start + Math.ceil(5 * .25 * 30));
    expect(recipient.statuses!.some(s => s.ability === 'R-tick' && s.key === 'slow')).toBe(false);
    recipient.x = 500;
    through(w, start + Math.ceil(6 * .25 * 30));
    expect(recipient.statuses!.findLast(s => s.ability === 'R-tick' && s.key === 'slow')?.value).toBe(.1);
  });
  it('peer regression: dispelling live Despair removes the former stack entitlement', () => {
    const w = arena(500), recipient = pet(w, 500);
    finish(w, 'R');
    through(w, 20);
    const aura = w.missiles.find(m => m.source === 'R-aura')!;
    const start = JSON.parse(String(w.units[0].memory[`hwei:task:${aura.id}`])).start as number;
    through(w, start + Math.ceil(2 * .25 * 30));
    recipient.statuses = recipient.statuses!.filter(s => !(s.ability === 'R-tick' && s.key === 'slow'));
    through(w, start + Math.ceil(3 * .25 * 30));
    expect(recipient.statuses!.findLast(s => s.ability === 'R-tick' && s.key === 'slow')?.value).toBe(.1);
  });
  it('peer regression: contiguous quarter-second Despair renewals preserve stacks at grid deadlines', () => {
    const w = arena(500), recipient = pet(w, 500);
    finish(w, 'R');
    through(w, 20);
    const aura = w.missiles.find(m => m.source === 'R-aura')!;
    const start = JSON.parse(String(w.units[0].memory[`hwei:task:${aura.id}`])).start as number;
    for (const pulses of [3, 6, 9]) {
      through(w, start + Math.ceil(pulses * .25 * 30));
      expect(recipient.statuses!.findLast(s => s.ability === 'R-tick' && s.key === 'slow')?.value).toBeCloseTo(.1 * pulses, 12);
    }
  });
  it('peer regression: a shielded pulse permits old Despair to expire before the next accepted pulse', () => {
    const w = arena(500), recipient = pet(w, 500);
    finish(w, 'R');
    through(w, 20);
    const aura = w.missiles.find(m => m.source === 'R-aura')!;
    const start = JSON.parse(String(w.units[0].memory[`hwei:task:${aura.id}`])).start as number;
    through(w, start + Math.ceil(2 * .25 * 30));
    const view = petFormulaTarget(recipient, w.units[0], w.tick);
    buff(w, view, 'spellShield');
    recipient.statuses = view.statuses;
    through(w, start + Math.ceil(4 * .25 * 30));
    expect(recipient.statuses!.findLast(s => s.ability === 'R-tick' && s.key === 'slow')?.value).toBe(.1);
  });
  it('actual host death detonates once at its current location', () => {
    const w = arena(500),
      p = pet(w, 500, 1, {
        targetClass: 'minion'
      });
    finish(w, 'R');
    through(w, 20);
    dealDamage(w, w.units[0], w.units[1], 200000, 'true');
    expect(p.hp).toBe(9550);
    const hp = p.hp;
    manual(w, 130);
    expect(p.hp).toBe(hp);
  });
  it('released aura continues after owner death without creating new actions', () => {
    const w = arena(500);
    finish(w, 'R');
    through(w, 20);
    w.units[0].alive = false;
    w.units[0].hp = 0;
    manual(w, 130);
    expect(damage(w)).toBe(540);
    expect(w.units[0].action).toBeUndefined();
  });
  it('R slow never produces a negative movement multiplier', () => {
    const w = arena(500);
    finish(w, 'R');
    through(w, 100);
    expect(derive(w.units[1]).rawMoveSpeed).toBeGreaterThanOrEqual(0);
    expect(derive(w.units[1]).moveSpeed).toBeGreaterThanOrEqual(0);
    expect(w.units[1].statuses.filter(s => s.key === 'slow').every(s => s.value >= 0 && s.value <= 1)).toBe(true);
  });
  it.each(['hold', 'trade'] as const)('reserves fresh R in%s and honors completed trade retreat', mode => {
    const w = arena();
    w.modes[0] = mode;
    expect(compiled.spec.behavior!(perceive(w, 0))).not.toEqual({
      kind: 'cast',
      ability: 'R'
    });
    w.units[0].memory.tradeDone = true;
    expect(compiled.spec.behavior!(perceive(w, 0))).toEqual({
      kind: 'move',
      direction: -1
    });
  });
  it('ordinary fight opens W then actually selects WE', () => {
    const w = arena();
    w.modes[0] = 'fight';
    expect(compiled.spec.behavior!(perceive(w, 0))).toEqual({
      kind: 'cast',
      ability: 'W'
    });
    cast(w, 'W');
    expect(compiled.spec.behavior!(perceive(w, 0))).toEqual({
      kind: 'cast',
      ability: 'WE'
    });
  });
  it('idle creates no phantom lights, heal, allies or casts', () => {
    const w = arena(2000);
    through(w, 120);
    expect(w.pets).toHaveLength(0);
    expect(w.missiles).toHaveLength(0);
    expect(w.units[0].cooldownReady).toEqual({});
  });
});
describe('Hwei full-budget production', () => {
  it('retains exact builds and six reflected15000gold scenarios versus Darius', () => {
    const prices = (JSON.parse(readFileSync(new URL('../../data/16.20/rules.json', import.meta.url), 'utf8')) as {
        statPrices: StatPrices;
      }).statPrices,
      forward = simulateMatchup(compiled.spec, kit('Darius').spec, 15000, prices),
      reverse = simulateMatchup(kit('Darius').spec, compiled.spec, 15000, prices);
    expect(forward.scenarios).toHaveLength(6);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-10);
    for (const [index, result] of forward.scenarios.entries()) {
      const other = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (result.score === undefined) expect(other.score).toBeUndefined();else expect(Math.abs(result.score + other.score!)).toBeLessThan(1e-10);
      for (const outcome of result.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
    }
    for (const build of forward.builds) expect(Math.abs(build.gold - 15000)).toBeLessThan(1e-10);
  }, 60000);
  it('runs six finite production scenarios against actual Heimerdinger turret bodies', () => {
    const prices = (JSON.parse(readFileSync(new URL('../../data/16.20/rules.json', import.meta.url), 'utf8')) as {
        statPrices: StatPrices;
      }).statPrices,
      result = simulateMatchup(compiled.spec, kit('Heimerdinger').spec, 15000, prices);
    expect(result.scenarios).toHaveLength(6);
    for (const scenario of result.scenarios) for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
  }, 60000);
});
