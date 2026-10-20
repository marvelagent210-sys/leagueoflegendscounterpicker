import { describe, expect, it } from "vitest";
import { canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit } from "../../engine/sim/combat";
import { defaultBehavior } from "../../engine/sim/behavior";
import { derive, hasState } from "../../engine/sim/derived";
import { engageRange } from "../../engine/sim/scenarios";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec } from "../../engine/sim/spec";
import { DEFAULT_ENVIRONMENT, type World } from "../../engine/sim/state";
import { kit } from "../kits/helpers";
import { idle, lasting } from "./helpers";
import { fighter } from "./kits";

const spell = (spec: FighterSpec, key: string): AbilitySpec => {
  const found = spec.abilities.find((ability) => ability.key === key);
  if (!found) throw new Error(`${spec.id}: missing ${key}`);
  return found;
};

const advance = (world: World, until: number) => {
  while (world.tick < until) step(world, [idle, idle]);
};

const fioraWorld = (enemy = fighter({ base: { hp: 10000, hpRegen: 0, armor: 0, mr: 0 } })) => createWorld({
  fighters: [kit("Fiora").spec, enemy],
  distance: 350,
  modes: ["idle", "idle"],
  settings: { log: true, environment: { ...DEFAULT_ENVIRONMENT, walls: false } },
});

describe("Fiora's source-backed casts during Lunge", () => {
  it.each(["E", "R"])("casts %s without stopping or restarting Lunge", (key) => {
    const world = fioraWorld();
    const [self] = world.units;
    startCast(world, self, spell(self.spec, "Q"));
    advance(world, 3);
    const dash = self.action;
    const from = self.x;
    expect(canCast(world, self, spell(self.spec, key))).toBe(true);
    startCast(world, self, spell(self.spec, key));
    expect(self.action).toBe(dash);
    step(world, [idle, idle]);
    expect(self.x).toBeGreaterThan(from);
    advance(world, 15);
    expect(world.log.filter((entry) => entry.text.includes("Lunge deals"))).toHaveLength(1);
  });

  it("parries Apprehend during Lunge, then emits the shock from the completed dash position", () => {
    const world = fioraWorld(kit("Darius").spec);
    const [self, enemy] = world.units;
    startCast(world, self, spell(self.spec, "Q"));
    startCast(world, enemy, spell(enemy.spec, "E"));
    advance(world, 3);
    const started = world.tick;
    const from = self.x;
    const riposte = spell(self.spec, "W");
    expect(canCast(world, self, riposte)).toBe(true);
    startCast(world, self, riposte);
    expect(self.action?.kind).toBe("dash");
    expect(hasState(self, "parry")).toBe(true);
    expect(canCast(world, self, spell(self.spec, "E"))).toBe(false);
    expect(canStartAttack(world, self)).toBe(false);

    advance(world, 12);
    expect(self.x).toBeGreaterThan(from);
    expect(world.log.some((entry) => entry.text === "parries Apprehend")).toBe(true);
    expect(world.log.some((entry) => entry.text === "dash knocked down")).toBe(false);
    expect(world.log.filter((entry) => entry.text.includes("Lunge deals"))).toHaveLength(1);
    const finishedAt = self.x;

    const shotAt = started + 15;
    advance(world, shotAt);
    expect(world.missiles.some((missile) => missile.source === "W")).toBe(false);
    step(world, [idle, idle]);
    const shock = world.missiles.find((missile) => missile.source === "W");
    expect(shock?.x).toBe(finishedAt);
    // Take the connecting skillshot branch to inspect its source-backed stun ordering.
    if (shock) shock.connects = true;
    expect(world.log.some((entry) => entry.text.includes("inflicts stun"))).toBe(false);
    step(world, [idle, idle]);
    expect(enemy.statuses.some((status) => status.kind === "cc" && status.key === "stun")).toBe(true);
    expect(self.action?.kind).toBe("channel");
    advance(world, started + 23);
    expect(canStartAttack(world, self)).toBe(false);
    step(world, [idle, idle]);
    expect(self.action).toBeUndefined();
    expect(hasState(self, "parry")).toBe(false);
  });

  it("retains Riposte's shot clock when terrain ends Lunge early", () => {
    const world = fioraWorld();
    const [self] = world.units;
    world.terrain.push({ id: 1, owner: 1, from: 200 + self.spec.base.pathingRadius, to: 300, endTick: 1000 });
    startCast(world, self, spell(self.spec, "Q"));
    advance(world, 3);
    startCast(world, self, spell(self.spec, "W"));
    advance(world, 12);
    expect(self.x).toBeCloseTo(200, 6);
    expect(self.action?.kind).toBe("cast");
    advance(world, 18);
    expect(world.missiles.some((missile) => missile.source === "W")).toBe(false);
    step(world, [idle, idle]);
    expect(world.missiles.find((missile) => missile.source === "W")?.x).toBeCloseTo(200, 6);
  });

  it("uses Riposte reactively during Lunge when Apprehend becomes visible in time", () => {
    const world = fioraWorld(kit("Darius").spec);
    world.settings.reactionTime = 0.1;
    world.modes[0] = "fight";
    const [self, enemy] = world.units;
    startCast(world, self, spell(self.spec, "Q"));
    startCast(world, enemy, spell(enemy.spec, "E"));
    while (world.tick < 10) step(world, [defaultBehavior, idle]);
    const casts = world.log.filter((entry) => entry.side === 0 && entry.text === "casts Riposte");
    expect(casts.map((entry) => entry.tick)).toEqual([3]);
    expect(world.log.some((entry) => entry.text === "parries Apprehend")).toBe(true);
    expect(self.action?.kind).toBe("dash");
  });

  it("does not extend Lunge's cast permission to other casts or dashes", () => {
    const world = fioraWorld();
    const [self] = world.units;
    for (const kind of ["cast", "dash"] as const) {
      self.action = kind === "cast"
        ? { kind, ability: "W", startTick: 0, endTick: 30 }
        : { kind, ability: "otherDash", startTick: 0, endTick: 30, perTick: 10, stopAtContact: false, unstoppable: false };
      for (const key of ["W", "E", "R"]) expect(canCast(world, self, spell(self.spec, key)), `${kind}: ${key}`).toBe(false);
    }
  });

  it.each([35, 65, 100])("uses the exact center-based 420-unit stab boundary against a target radius of %s", (radius) => {
    for (const outside of [0, 0.01]) {
      const fiora = kit("Fiora").spec;
      const target = fighter({ base: { radius, hp: 10000, hpRegen: 0, armor: 0, mr: 0 } });
      const q = spell(fiora, "Q");
      const opener = { ...fiora, abilities: [q] };
      const openingDistance = engageRange(opener, target);
      expect(openingDistance).toBe(400 + 420 - fiora.base.radius - radius);
      const world = createWorld({
        fighters: [fiora, target],
        distance: openingDistance + outside,
        modes: ["idle", "idle"],
        settings: { log: true, environment: { ...DEFAULT_ENVIRONMENT, walls: false } },
      });
      startCast(world, world.units[0], q);
      advance(world, 13);
      expect(world.units[1].totals.damageTaken, `outside ${outside}`).toBe(outside === 0 ? 110 : 0);
    }
  });

  it.each([[0, 1], [1, 0], [0.5, 1]])("keeps Bladework's first hit noncritical and second at 200%% AD when chance changes %s → %s", (declared, live) => {
    const world = createWorld({ fighters: [kit("Fiora").spec, fighter({ base: { hp: 10000, armor: 0, mr: 0 } })], distance: 0, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const chance = (value: number) => {
      self.statuses = self.statuses.filter((status) => !(status.kind === "stat" && status.key === "critChance"));
      self.statuses.push(lasting("stat", "critChance", value));
    };
    startCast(world, self, spell(self.spec, "E"));
    chance(declared);
    startAttack(world, self);
    expect(self.action?.kind === "windup" ? self.action.critChance : undefined).toBe(0);
    const firstAt = self.action?.kind === "windup" ? self.action.launchTick : -1;
    const ad = derive(self).ad;
    chance(live);
    advance(world, firstAt + 1);
    expect(enemy.totals.damageTaken).toBeCloseTo(ad, 7);

    self.attackReadyTick = world.tick;
    chance(declared);
    startAttack(world, self);
    const secondAt = self.action?.kind === "windup" ? self.action.launchTick : -1;
    expect(self.action?.kind === "windup" ? self.action.critChance : undefined).toBe(declared);
    chance(live);
    advance(world, secondAt + 1);
    expect(enemy.totals.damageTaken).toBeCloseTo(3 * ad, 7);
  });

  it("ends Apprehend's forced movement after half a second while airborne lasts a full second", () => {
    const darius = kit("Darius").spec;
    const world = createWorld({ fighters: [darius, fighter()], distance: 200, modes: ["idle", "idle"] });
    const [self, enemy] = world.units;
    const e = spell(darius, "E");
    abilityHit(world, self, enemy, e, e.onHit ?? []);
    expect(enemy.forced?.endTick).toBe(15);
    expect(enemy.statuses.find((status) => status.kind === "cc" && status.key === "airborne")?.endTick).toBe(30);
    advance(world, 16);
    expect(enemy.forced).toBeUndefined();
    expect(enemy.statuses.some((status) => status.kind === "cc" && status.key === "airborne")).toBe(true);
    advance(world, 31);
    expect(enemy.statuses.some((status) => status.kind === "cc" && status.key === "airborne")).toBe(false);
  });
});
