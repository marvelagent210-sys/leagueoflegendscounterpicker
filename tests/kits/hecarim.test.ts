import { describe, expect, it } from "vitest";
import { canCast, startCast } from "../../engine/sim/actions";
import type { Behavior } from "../../engine/sim/behavior";
import { applyEffect, attackHit, hookContext } from "../../engine/sim/combat";
import { ccTypes, derive, hasState } from "../../engine/sim/derived";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, Effect, FighterSpec, PetSpec } from "../../engine/sim/spec";
import { type Aim, DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { fighter } from "../sim/kits";
import { kit } from "./helpers";

const compiled = kit("Hecarim");
const worldFor = (bonus: BonusStats = {}, distance = 100, enemy: Partial<FighterSpec["base"]> = {}, walls = true): World => {
  const spec: FighterSpec = { ...compiled.spec, bonus, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 } };
  return createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, ...enemy } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, log: true, environment: { ...DEFAULT_ENVIRONMENT, walls } } });
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string, aim?: Aim) => startCast(world, world.units[0], ability(world, key), aim);
const castable = (world: World, key: string) => canCast(world, world.units[0], ability(world, key));
const idle: [Behavior, Behavior] = [() => undefined, () => undefined];
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, idle); };
/** Steps until `done`, failing after 10 s of fight rather than hanging when it never comes. */
const until = (world: World, done: () => boolean, limit = 300) => {
  for (let i = 0; i < limit && !done(); i++) step(world, idle);
  expect(done(), "the awaited event never happened").toBe(true);
};
const logged = (world: World, start: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(start));
const onTarget = (world: World, effect: Effect) => applyEffect(world, world.units[1], world.units[1], effect, { scale: 1 });
const BASE_MS = compiled.spec.base.moveSpeed;
const AD = compiled.spec.base.ad;
/** Walks Hecarim `units` toward and back from the enemy, `units` of distance traveled, without moving the enemy. */
const travel = (world: World, units: number) => {
  const self = world.units[0];
  const from = self.x;
  let left = units;
  while (left > 0) {
    const stepSize = Math.min(left, 20);
    self.x = self.x === from ? from - stepSize : from;
    left -= stepSize;
    step(world, idle);
  }
  self.x = from;
};

describe("Hecarim reads the wiki at level 20", () => {
  it("Warpath, Rampage, Spirit of Dread, Devastating Charge and Onslaught of Shadows", () => {
    const spec = compiled.spec;
    const q = spec.abilities.find((a) => a.key === "Q")!;
    expect(q).toMatchObject({ cooldown: 4, castTime: 0, delivery: { kind: "aura", radius: 375 } });
    expect(q.onHit?.[0]).toMatchObject({ type: "damage", damageType: "physical", amount: { base: 180, ratios: { bonusAD: 0.9 } }, label: "Rampage" });
    const w = spec.abilities.find((a) => a.key === "W")!;
    expect(w).toMatchObject({ cooldown: 14, delivery: { kind: "field", radius: 525, duration: 4, interval: 1, attached: true }, flags: { spellShield: false } });
    expect(w.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 60, ratios: { AP: 0.2 } }, label: "Spirit of Dread" }]);
    expect(w.onSelf).toEqual([{ type: "stat", stat: "armor", amount: { base: 25 }, duration: 4 }, { type: "stat", stat: "MR", amount: { base: 25 }, duration: 4 }]);
    expect(spec.abilities.find((a) => a.key === "E")).toMatchObject({ cooldown: 16, cost: 60, delivery: { kind: "self" } });
    expect(spec.abilities.find((a) => a.key === "E2")).toMatchObject({ delivery: { kind: "dash", direction: "toward", hitRadius: 175 }, flags: { parry: true, dodgeKeepsEffects: true, appliesLifeSteal: true, knockdown: false } });
    expect(spec.abilities.find((a) => a.key === "R")).toMatchObject({ cooldown: 100, cost: 100, delivery: { kind: "dash", distance: 1000, minDistance: 300, speed: 1100 } });
    expect(spec.abilities.find((a) => a.key === "R2")).toMatchObject({ chain: { root: "R", index: 2, window: 0, delay: 0, auto: true }, delivery: { kind: "line", range: 1510, width: 480, speed: 1100, piercing: true }, flags: { projectile: true } });
    expect(spec.abilities.find((a) => a.key === "R2")?.onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 350, ratios: { AP: 1 } }, label: "Onslaught of Shadows" }]);
    // The run-up's ramp: the wiki's 3 s is used, the pinned game file's 2.5 s recorded.
    expect(compiled.evidence.find((x) => x.ability === "Devastating Charge" && x.text.includes("TimeToMaxMoveSpeed"))).toMatchObject({ url: "https://raw.communitydragon.org/16.21/game/data/characters/hecarim/hecarim.bin.json" });
    expect(compiled.assumptions.some((a) => a.includes("TimeToMaxMoveSpeed is 2.5 seconds"))).toBe(true);
  });

  it("keeps its budget hints evaluable after the kit is sealed", () => {
    const w = worldFor({ ad: 100, attackSpeed: 0.5, abilityHaste: 20 });
    const [self, target] = w.units;
    expect(self.spec.budget?.damage?.(self, target).physical).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Warpath", () => {
  it("24% of his bonus movement speed as attack damage, read every 0.25 s, never below none", () => {
    const w = worldFor();
    const self = w.units[0];
    through(w, 0);
    expect(derive(self).ad).toBeCloseTo(AD, 9);
    hookContext(w, self).buff("test:haste", "moveSpeedPercent", 0.2, 10);
    // The next reading, 0.25 s after the first.
    through(w, 7);
    expect(derive(self).ad).toBeCloseTo(AD, 9);
    through(w, 8);
    expect(derive(self).ad).toBeCloseTo(AD + 0.24 * (derive(self).moveSpeed - BASE_MS), 9);
    // Slowed below his base speed: no less than his attack damage.
    hookContext(w, self).buff("test:haste", "moveSpeedPercent", 0, 0);
    applyEffect(w, w.units[1], self, { type: "cc", cc: "slow", strength: 0.5, duration: 5 }, { scale: 1 });
    through(w, 16);
    expect(derive(self).ad).toBeCloseTo(AD, 9);
  });
});

describe("Rampage", () => {
  it("180 (+ 90% bonus AD) within 375; each stack 3% (+ 3% per 100 bonus AD) more, up to three", () => {
    const bonusAd = 100;
    const w = worldFor({ ad: bonusAd });
    const self = w.units[0];
    for (let stacks = 0; stacks <= 4; stacks++) {
      self.cooldownReady.Q = 0;
      cast(w, "Q");
      const hits = logged(w, "Rampage deals");
      const scale = 1 + Math.min(3, stacks) * (0.03 + 0.03 * bonusAd / 100);
      expect(hits.at(-1)?.text).toBe(`Rampage deals ${Math.round((180 + 0.9 * bonusAd) * scale)} physical damage`);
    }
    const out = worldFor({}, 375 - 130 + 1);
    cast(out, "Q");
    expect(logged(out, "Rampage deals")).toHaveLength(0);
  });

  it("its base cooldown is 4, 3.25, 2.5 or 1.75 s by its stacks; stacks last 8 s after the last hit, then go one a second", () => {
    const w = worldFor({ abilityHaste: 0 });
    const self = w.units[0];
    for (const expected of [4, 3.25, 2.5, 1.75, 1.75]) {
      self.cooldownReady.Q = 0;
      const tick = w.tick;
      cast(w, "Q");
      expect(self.cooldownReady.Q).toBe(tick + Math.ceil(expected * 30 - 1e-9));
    }
    // The last hit at the world's current tick: three stacks for 8 s, then one a second.
    const last = w.tick;
    through(w, last + 239);
    self.cooldownReady.Q = 0;
    const holding = w.tick;
    cast(w, "Q");
    expect(self.cooldownReady.Q).toBe(holding + Math.ceil(1.75 * 30 - 1e-9));
    // That hit refreshed them: 8 s later one goes, then one a second.
    through(w, holding + 240);
    self.cooldownReady.Q = 0;
    const fading = w.tick;
    cast(w, "Q");
    expect(self.cooldownReady.Q).toBe(fading + Math.ceil(2.5 * 30 - 1e-9));
  });

  it("only its own damage gives stacks: his attacks don't", () => {
    const w = worldFor();
    const self = w.units[0];
    attackHit(w, self, w.units[1], false, []);
    const tick = w.tick;
    cast(w, "Q");
    expect(self.cooldownReady.Q).toBe(tick + 120);
    // Nor an attack after a cast that missed, while that cast has no stack yet.
    const far = worldFor({}, 600);
    const hec = far.units[0];
    cast(far, "Q");
    attackHit(far, hec, far.units[1], false, []);
    hec.cooldownReady.Q = 0;
    const next = far.tick;
    cast(far, "Q");
    expect(hec.cooldownReady.Q).toBe(next + 120);
  });

  it("no stack when it misses", () => {
    const w = worldFor({}, 600);
    const self = w.units[0];
    cast(w, "Q");
    self.cooldownReady.Q = 0;
    const tick = w.tick;
    cast(w, "Q");
    expect(self.cooldownReady.Q).toBe(tick + 120);
  });

  const enemyPet = (world: World, x: number, extra: Partial<PetSpec> = {}) =>
    spawnPet(world, world.units[1], { kind: "dummy", name: "Enemy pet", hp: 5000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 10, ...extra }, x);

  it("60% against a summon its pet data classes as a minion, full damage to others", () => {
    const w = worldFor({}, 600);
    const [self, enemy] = w.units;
    const near = self.x + Math.sign(enemy.x - self.x) * 200;
    const minion = enemyPet(w, near, { name: "Minion pet", targetClass: "minion" });
    const clone = enemyPet(w, near, { name: "Champion pet", targetClass: "champion" });
    const unclassified = enemyPet(w, near, { name: "Unclassified pet" });
    cast(w, "Q");
    expect(5000 - minion.hp).toBeCloseTo(0.6 * 180, 6);
    expect(5000 - clone.hp).toBeCloseTo(180, 6);
    expect(5000 - unclassified.hp).toBeCloseTo(180, 6);
  });

  it("a cast gains one stack however many enemies it damages; an enemy pet alone counts", () => {
    const both = worldFor({ abilityHaste: 0 });
    enemyPet(both, both.units[1].x);
    cast(both, "Q");
    expect(both.units[0].memory.rampageStacks).toBe(1);
    const alone = worldFor({ abilityHaste: 0 }, 600);
    const [self, enemy] = alone.units;
    enemyPet(alone, self.x + Math.sign(enemy.x - self.x) * 200);
    cast(alone, "Q");
    expect(self.memory.rampageStacks).toBe(1);
    // That stack sets the next cast's base cooldown.
    self.cooldownReady.Q = 0;
    const tick = alone.tick;
    cast(alone, "Q");
    expect(self.cooldownReady.Q).toBe(tick + Math.ceil(3.25 * 30 - 1e-9));
  });
});

describe("Spirit of Dread", () => {
  it("four pulses of 60 (+ 20% AP) magic damage within 525 over 4 s, through spell shields; 25 armor and magic resistance meanwhile", () => {
    const w = worldFor();
    const self = w.units[0];
    const armor = derive(self).armor.bonus;
    onTarget(w, { type: "state", state: "spellShield", duration: 10 });
    cast(w, "W");
    expect(derive(self).armor.bonus).toBeCloseTo(armor + 25, 9);
    expect(derive(self).mr.bonus).toBeCloseTo(25, 9);
    through(w, 150);
    expect(logged(w, "Spirit of Dread deals").map((e) => e.tick)).toEqual([0, 30, 60, 90]);
    expect(logged(w, "Spirit of Dread deals")[0]?.text).toBe("Spirit of Dread deals 60 magic damage");
    expect(derive(self).armor.bonus).toBeCloseTo(armor, 9);
  });

  it("heals him for 25% of the damage he deals to the enemy in it, while it lasts", () => {
    const w = worldFor();
    const self = w.units[0];
    cast(w, "W");
    self.hp = 1000;
    const before = self.hp;
    attackHit(w, self, w.units[1], false, []);
    // His attack's damage on the armorless target, and the pulse at cast time before it.
    expect(self.hp - before).toBeCloseTo(0.25 * AD, 6);
    through(w, 125);
    const after = self.hp;
    attackHit(w, self, w.units[1], false, []);
    expect(self.hp).toBeCloseTo(after, 9);
    // Out of its area: nothing.
    const far = worldFor({}, 600);
    cast(far, "W");
    far.units[0].hp = 1000;
    attackHit(far, far.units[0], far.units[1], false, []);
    expect(far.units[0].hp).toBeCloseTo(1000, 9);
  });
});

describe("Devastating Charge", () => {
  it("a run-up for 4 s, ghosted, 25% faster and 3.33% more every 0.25 s up to 65% at 3 s", () => {
    const w = worldFor({}, 2000);
    const self = w.units[0];
    cast(w, "E");
    through(w, 0);
    expect(hasState(self, "ghosted")).toBe(true);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(BASE_MS * 1.25, 6);
    through(w, 8);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(BASE_MS * (1.25 + 0.4 / 12), 6);
    through(w, 90);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(BASE_MS * 1.65, 6);
    through(w, 119);
    expect(hasState(self, "ghosted")).toBe(true);
    through(w, 121);
    expect(hasState(self, "ghosted")).toBe(false);
    expect(derive(self).rawMoveSpeed).toBeCloseTo(BASE_MS, 6);
    expect(castable(w, "E2")).toBe(false);
  });

  it("from standing: 50 more reach, 90 (+ 50% bonus AD) damage, a 150-unit knock back and a 0.25 s stun after it; it ends the run-up", () => {
    // 220 apart: beyond his 175 range, within 225.
    const w = worldFor({}, 220);
    const [self, target] = w.units;
    cast(w, "E");
    expect(castable(w, "E2")).toBe(true);
    const x = target.x;
    cast(w, "E2");
    until(w, () => logged(w, "Devastating Charge deals").length > 0, 30);
    // Warpath's attack damage from the run-up's speed counts as bonus AD.
    const bonus = derive(self).bonusAd;
    expect(bonus).toBeGreaterThan(0);
    expect(logged(w, "Devastating Charge deals")[0]?.text).toBe(`Devastating Charge deals ${Math.round(90 + 0.5 * bonus)} physical damage`);
    // Knocked back first; the stun comes as the knock back ends.
    expect(ccTypes(target).has("airborne")).toBe(true);
    expect(ccTypes(target).has("stun")).toBe(false);
    through(w, w.tick + 7);
    expect(target.x - x).toBeCloseTo(150, 6);
    expect(ccTypes(target).has("stun")).toBe(true);
    expect(hasState(self, "ghosted")).toBe(false);
    expect(castable(w, "E2")).toBe(false);
    const far = worldFor({}, 226);
    cast(far, "E");
    expect(castable(far, "E2")).toBe(false);
  });

  it("grows with distance traveled: at 1200 units 250 more reach, double damage and a 350-unit knock back (with no wall behind)", () => {
    const w = worldFor({}, 420, {}, false);
    const [self, target] = w.units;
    cast(w, "E");
    travel(w, 1200);
    expect(castable(w, "E2")).toBe(true);
    const x = target.x;
    cast(w, "E2");
    until(w, () => logged(w, "Devastating Charge deals").length > 0, 30);
    expect(logged(w, "Devastating Charge deals")[0]?.text).toBe(`Devastating Charge deals ${Math.round(180 + derive(self).bonusAd)} physical damage`);
    through(w, w.tick + 10);
    expect(target.x - x).toBeCloseTo(350, 6);
    // Not through terrain: the lane's wall 300 units behind stops it.
    const walled = worldFor({}, 420);
    cast(walled, "E");
    travel(walled, 1200);
    const from = walled.units[1].x;
    cast(walled, "E2");
    until(walled, () => logged(walled, "Devastating Charge deals").length > 0, 30);
    through(walled, walled.tick + 10);
    expect(walled.units[1].x - from).toBeCloseTo(300, 6);
  });

  it("its run-up stands still during Onslaught of Shadows' dash", () => {
    const w = worldFor({}, 2000);
    const self = w.units[0];
    cast(w, "E");
    through(w, 30);
    cast(w, "R", { direction: 1, distance: 1000 });
    let dashing = 0;
    until(w, () => { if (self.action?.kind === "dash") dashing++; return self.action === undefined; }, 60);
    expect(dashing).toBeGreaterThan(20);
    // 4 s of run-up plus the dash's ticks.
    through(w, 119 + dashing - 2);
    expect(hasState(self, "ghosted")).toBe(true);
    through(w, 121 + dashing + 1);
    expect(hasState(self, "ghosted")).toBe(false);
  });

  it("being knocked about isn't distance traveled", () => {
    const w = worldFor({}, 300);
    const [self, target] = w.units;
    cast(w, "E");
    through(w, 0);
    applyEffect(w, target, self, { type: "displace", direction: "away", distance: 600, duration: 0.5 }, { scale: 1 });
    through(w, 20);
    expect(self.memory.chargeTraveled).toBeCloseTo(0, 6);
  });

  it("dashes to where the enemy was: an enemy gone out of reach by then keeps the charge for later", () => {
    const w = worldFor({}, 220);
    const [, target] = w.units;
    cast(w, "E");
    cast(w, "E2");
    target.x += 400;
    until(w, () => w.units[0].action === undefined, 30);
    expect(logged(w, "Devastating Charge deals")).toHaveLength(0);
    expect(castable(w, "E2")).toBe(false);
    target.x -= 400;
    expect(castable(w, "E2")).toBe(true);
  });

  it("a dodge or block stops its damage, not its knock back; blindness doesn't stop it", () => {
    for (const state of ["dodgeAttacks", "blockAttacks"] as const) {
      const w = worldFor({}, 100);
      const target = w.units[1];
      onTarget(w, { type: "state", state, duration: 5 });
      cast(w, "E");
      const x = target.x;
      cast(w, "E2");
      through(w, 20);
      expect(logged(w, "Devastating Charge deals")).toHaveLength(0);
      expect(target.x - x).toBeCloseTo(150, 6);
    }
    const blind = worldFor({}, 100);
    applyEffect(blind, blind.units[1], blind.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 });
    cast(blind, "E");
    cast(blind, "E2");
    through(blind, 20);
    expect(logged(blind, "Devastating Charge deals")).toHaveLength(1);
  });

  it("is his attack: a silence doesn't stop it, a stun or disarm does; not while rooted", () => {
    for (const [cc, allowed] of [["silence", true], ["stun", false], ["disarm", false], ["root", false]] as const) {
      const w = worldFor({}, 100);
      cast(w, "E");
      applyEffect(w, w.units[1], w.units[0], { type: "cc", cc, duration: 1 }, { scale: 1 });
      expect(castable(w, "E2"), cc).toBe(allowed);
    }
  });

  it("crits for 100% AD more, by expected value", () => {
    const w = worldFor({ critChance: 0.5 }, 100);
    cast(w, "E");
    cast(w, "E2");
    until(w, () => logged(w, "Devastating Charge deals").length > 0, 30);
    const d = derive(w.units[0]);
    expect(logged(w, "Devastating Charge deals")[0]?.text).toBe(`Devastating Charge deals ${Math.round(90 + 0.5 * d.bonusAd + 0.5 * d.ad)} physical damage`);
  });

  it("resets his attack timer", () => {
    const w = worldFor({}, 100);
    const self = w.units[0];
    self.attackReadyTick = 500;
    cast(w, "E");
    cast(w, "E2");
    expect(self.attackReadyTick).toBe(0);
  });
});

describe("Onslaught of Shadows", () => {
  it("dashes 300 to 1000 units at 1100 with displacement immunity; the riders strike for 350 (+ 100% AP) once", () => {
    const w = worldFor({}, 800);
    const self = w.units[0];
    cast(w, "R", { direction: 1, distance: 800 });
    expect(hasState(self, "displacementImmune")).toBe(true);
    until(w, () => self.action === undefined, 60);
    expect(hasState(self, "displacementImmune")).toBe(false);
    through(w, w.tick + 60);
    expect(logged(w, "Onslaught of Shadows deals").map((e) => e.text)).toEqual(["Onslaught of Shadows deals 350 magic damage"]);
  });

  it("fears the enemy near where he stops, 0.75 s plus 0.075 s for every 100 units he dashed, up to 1.5 s", () => {
    for (const [distance, fear] of [[300, 0.75 + 0.225], [1000, 1.5]] as const) {
      const w = worldFor({}, 2000);
      const [self, target] = w.units;
      // The enemy just beyond where he stops.
      target.x = self.x + distance + 200;
      cast(w, "R", { direction: 1, distance });
      until(w, () => self.action === undefined, 60);
      const status = target.statuses.find((s) => s.kind === "cc" && s.key === "fear");
      expect(status).toBeDefined();
      expect((status!.endTick - status!.startTick) / 30).toBeCloseTo(fear, 1);
    }
  });

  it("no fear for an enemy farther than 315 from where he stops", () => {
    const w = worldFor({}, 2000);
    const [self, target] = w.units;
    target.x = self.x + 300 + 400;
    cast(w, "R", { direction: 1, distance: 300 });
    until(w, () => self.action === undefined, 60);
    expect(Math.abs(target.x - self.x)).toBeGreaterThan(315);
    expect(ccTypes(target).has("fear")).toBe(false);
  });

  it("slows the feared enemy by its distance from him: none within 150, evenly up to 99% at 300, as a negative share of its speed, until the fear ends", () => {
    const w = worldFor({}, 2000);
    const [self, target] = w.units;
    target.x = self.x + 500 + 200;
    cast(w, "R", { direction: 1, distance: 500 });
    until(w, () => self.action === undefined, 60);
    const slowOf = () => target.statuses.find((s) => s.kind === "stat" && s.key === "moveSpeedPercent")?.value;
    target.x = self.x + 237.5;
    step(w, idle);
    expect(slowOf()).toBeCloseTo(-0.99 * 87.5 / 150, 6);
    target.x = self.x + 100;
    step(w, idle);
    expect(slowOf()).toBeCloseTo(0, 6);
    const fear = target.statuses.find((s) => s.kind === "cc" && s.key === "fear")!;
    through(w, fear.endTick + 1);
    expect(slowOf()).toBeUndefined();
    // A fear cleansed early takes the slow with it.
    const cleansed = worldFor({}, 2000);
    const [hecarim, enemy] = cleansed.units;
    enemy.x = hecarim.x + 500 + 200;
    cast(cleansed, "R", { direction: 1, distance: 500 });
    until(cleansed, () => hecarim.action === undefined, 60);
    expect(enemy.statuses.some((st) => st.kind === "stat" && st.key === "moveSpeedPercent")).toBe(true);
    applyEffect(cleansed, enemy, enemy, { type: "cleanse" }, { scale: 1 });
    step(cleansed, idle);
    expect(enemy.statuses.some((st) => st.kind === "stat" && st.key === "moveSpeedPercent")).toBe(false);
  });
});

