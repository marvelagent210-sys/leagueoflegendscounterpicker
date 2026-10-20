import { describe, expect, it } from "vitest";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, dealDamage } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const spell = (spec: FighterSpec, key: string) => {
  const found = spec.abilities.find((a) => a.key === key);
  if (!found) throw new Error(`${spec.id}: no ${key}`);
  return found;
};
const dummy = (moveSpeed = 350) => fighter({ base: { hp: 10000, armor: 0, mr: 0, hpRegen: 0, moveSpeed } });
const advance = (world: World, until: number) => {
  while (world.tick <= until) step(world, [idle, idle]);
};
const granite = (world: World) => world.units[0].statuses.find((s) => s.kind === "shield" && s.key === "shield" && s.source === 0);

describe("Malphite's Granite Shield replenishment", () => {
  it("starts its timer on damage and refills a partial shield without refreshing for further shield-only damage", () => {
    const world = createWorld({ fighters: [kit("Malphite").spec, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const full = granite(world)?.value ?? 0;
    const hp = self.hp;
    dealDamage(world, enemy, self, 10, "true");
    expect(self.hp).toBe(hp);
    expect(granite(world)?.value).toBe(full - 10);
    advance(world, 149);
    dealDamage(world, enemy, self, 5, "true");
    advance(world, 179);
    expect(granite(world)?.value).toBe(full - 15);
    step(world, [idle, idle]);
    expect(granite(world)?.value).toBe(full);
  });

  it("restarts replenishment when damage reaches health", () => {
    const world = createWorld({ fighters: [kit("Malphite").spec, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    dealDamage(world, enemy, self, (granite(world)?.value ?? 0) + 10, "true");
    advance(world, 149);
    dealDamage(world, enemy, self, 5, "true");
    advance(world, 329);
    expect(granite(world)).toBeUndefined();
    step(world, [idle, idle]);
    expect(granite(world)?.value).toBeCloseTo(0.1 * derive(self).maxHp, 6);
  });

  it("switches Thunderclap armor immediately at initialization, shield break and refill", () => {
    const world = createWorld({ fighters: [kit("Malphite").spec, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const totalArmor = () => derive(self).armor.base + derive(self).armor.bonus;
    expect(totalArmor()).toBeCloseTo(self.spec.base.armor * 1.9, 6);
    dealDamage(world, enemy, self, granite(world)?.value ?? 0, "true");
    expect(totalArmor()).toBeCloseTo(self.spec.base.armor * 1.3, 6);
    advance(world, 180);
    expect(totalArmor()).toBeCloseTo(self.spec.base.armor * 1.9, 6);
  });
});

describe("Seismic Shard's raw movement-speed theft", () => {
  it.each([[350, 140], [450, 180], [1000, 400]])("uses the target's %i raw speed before soft caps to steal %i", (moveSpeed, stolen) => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy(moveSpeed)], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const q = spell(malphite, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(self.statuses.find((s) => s.memoKey === "buff:seismicShard")?.value).toBeCloseTo(stolen, 6);
  });

  it.each(["slowImmune", "ccImmune"])("gains no speed against %s", (state) => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("state", state));
    const before = derive(self).moveSpeed;
    const q = spell(malphite, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(derive(self).moveSpeed).toBe(before);
  });

  it("reduces the stolen amount with the target's slow resistance", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("stat", "slowResist", 0.5));
    const q = spell(malphite, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(self.statuses.find((s) => s.memoKey === "buff:seismicShard")?.value).toBeCloseTo(70, 6);
  });

  it("does not create speed loss when an existing stronger slow determines movement", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    enemy.statuses.push(lasting("cc", "slow", 0.6));
    const before = derive(self).moveSpeed;
    const q = spell(malphite, "Q");
    abilityHit(world, self, enemy, q, q.onHit ?? []);
    expect(derive(self).moveSpeed).toBe(before);
  });

  it("cancels without resource cost or cooldown when the target leaves cast range", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const resource = self.resource;
    startCast(world, self, spell(malphite, "Q"));
    enemy.x += 1000;
    advance(world, 10);
    expect(self.resource).toBe(resource);
    expect(self.cooldownReady.Q ?? 0).toBe(0);
    expect(world.missiles).toHaveLength(0);
  });
});

describe("Thunderclap's protected attack", () => {
  it("applies life steal to the ordinary attack without its bonus or cone damage", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const [self] = world.units;
    self.hp = 500;
    self.statuses.push(lasting("stat", "lifeSteal", 0.5));
    startCast(world, self, spell(malphite, "W"));
    startAttack(world, self);
    advance(world, 20);
    expect(self.totals.healing).toBeCloseTo(derive(self).ad * 0.5, 6);
  });

  it("defers Q and E while the first empowered attack winds up, while later cone attacks allow casts", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    startCast(world, self, spell(malphite, "W"));
    startAttack(world, self);
    expect(canCast(world, self, spell(malphite, "Q"))).toBe(false);
    expect(canCast(world, self, spell(malphite, "E"))).toBe(false);
    advance(world, 20);
    startAttack(world, self);
    expect(canCast(world, self, spell(malphite, "Q"))).toBe(true);
    expect(canCast(world, self, spell(malphite, "E"))).toBe(true);
  });

  it("keeps its already-declared empowered attack when Unstoppable Force is cast", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    const self = world.units[0];
    startCast(world, self, spell(malphite, "W"));
    startAttack(world, self);
    const attackTick = self.action?.kind === "windup" ? self.action.launchTick : undefined;
    expect(self.action?.kind).toBe("windup");
    startCast(world, self, spell(malphite, "R"));
    expect(self.pendingAttack?.launchTick).toBe(attackTick);
    advance(world, 30);
    expect(world.log.filter((e) => e.side === 0 && e.text.startsWith("Thunderclap deals")).map((e) => e.tick)).toEqual([attackTick]);
    expect(self.pendingAttack).toBeUndefined();
  });

  it("continues denying Q/E after a short R arrives before the protected W windup completes", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    startCast(world, self, spell(malphite, "W"));
    startAttack(world, self);
    if (self.action?.kind !== "windup") throw new Error("Missing W windup");
    const launchTick = self.action.launchTick;
    startCast(world, self, spell(malphite, "R"));
    advance(world, 2);
    expect(self.action).toBeUndefined();
    expect(self.pendingAttack?.launchTick).toBe(launchTick);
    expect(canCast(world, self, spell(malphite, "Q"))).toBe(false);
    expect(canCast(world, self, spell(malphite, "E"))).toBe(false);
    advance(world, launchTick);
    expect(canCast(world, self, spell(malphite, "Q"))).toBe(true);
    expect(canCast(world, self, spell(malphite, "E"))).toBe(true);
  });
});

describe("Unstoppable Force's displacement immunity", () => {
  it("ends on arrival instead of persisting for a full second", () => {
    const malphite = kit("Malphite").spec;
    const world = createWorld({ fighters: [malphite, dummy()], distance: 0, modes: ["idle", "idle"] });
    const self = world.units[0];
    startCast(world, self, spell(malphite, "R"));
    expect(hasState(self, "displacementImmune")).toBe(true);
    advance(world, 5);
    expect(self.action).toBeUndefined();
    expect(hasState(self, "displacementImmune")).toBe(false);
  });
});
