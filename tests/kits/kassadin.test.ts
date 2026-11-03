import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { damagePerSecond, type StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { canCast, canStartAttack, costOf, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { applyEffect, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import kassadin from "../../kits/champions/Kassadin";
import yi from "../../kits/champions/MasterYi";
import { ability as syntheticAbility, fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Kassadin"), records("Kassadin"), kassadin, {}, pets("Kassadin"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}) => {
  const spec = compiled().spec;
  return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } };
};
const worldFor = (distance = 0, bonus: FighterSpec["bonus"] = {}, enemy = fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0 } })) => createWorld({
  fighters: [subject(bonus), enemy], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, reactionTime: 10, maxBranches: 1, log: true },
});
const spell = (world: World, key: string, side: 0 | 1 = 0): AbilitySpec => world.units[side].spec.abilities.find((ability) => ability.key === key)!;
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
const cast = (world: World, key: string, side: 0 | 1 = 0, distance?: number) => {
  const ability = spell(world, key, side);
  startCast(world, world.units[side], ability, distance === undefined ? undefined : { direction: 1, distance });
};
const finishCast = (world: World, key: string, distance?: number) => {
  cast(world, key, 0, distance);
  const action = world.units[0].action;
  if (action?.kind === "cast") advance(world, action.endTick);
};
const state = (world: World, side: 0 | 1, key: StateType, value?: number) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration: 30, ...(value === undefined ? {} : { value }) }, { scale: 1 });
const attack = (world: World) => {
  startAttack(world, world.units[0]);
  const action = world.units[0].action;
  if (action?.kind !== "windup") throw new Error("No attack windup");
  advance(world, action.launchTick);
};

describe("Kassadin source audit and innate protection", () => {
  it("reads every passive/QWER revision, all mana formulas and the variable Riftwalk cost ladder", () => {
    const value = compiled();
    expect(value.spec.abilities.map((ability) => ability.key)).toEqual(["Q", "W", "E", "R"]);
    expect(new Set(value.evidence.map((entry) => entry.revid))).toEqual(new Set([3913958, 4060362, 4022982, 4007623, 4060363]));
    expect(spell(worldFor(), "Q")).toMatchObject({ cooldown: 7, cost: 80, castTime: .25, delivery: { kind: "target", range: 650, missileSpeed: 1400 } });
    expect(spell(worldFor(), "E")).toMatchObject({ cooldown: 17, cost: 80, castTime: .25, delivery: { kind: "area", far: 600 } });
    expect(spell(worldFor(), "R")).toMatchObject({ cooldown: 2, castTime: .25, delivery: { kind: "blink", distance: 500, minDistance: 0, hitRadius: 270, hitCentered: true } });
    expect(value.assumptions.some((text) => text.includes("fallback"))).toBe(true);
    expect(value.assumptions.some((text) => text.includes("nominal 17-second"))).toBe(true);
  });

  it.each(["physical", "magic", "true"] as const)("reduces only magic damage, keeping %s damage and shields in the normal pipeline", (damageType) => {
    const world = worldFor();
    const [self, enemy] = world.units;
    const before = self.hp;
    dealDamage(world, enemy, self, 100, damageType, {});
    const resistance = damageType === "physical" ? self.spec.base.armor : self.spec.base.mr;
    const expected = damageType === "true" ? 100 : 100 * 100 / (100 + resistance) * (damageType === "magic" ? .9 : 1);
    expect(before - self.hp).toBeCloseTo(expected, 10);
    expect(hasState(self, "ghosted")).toBe(true);
    expect(hasState(self, "magicReduction")).toBe(true);
  });

  it("also reduces persistent magic damage once", () => {
    const world = worldFor();
    const [self, enemy] = world.units;
    const before = self.hp;
    dealDamage(world, enemy, self, 100, "magic", { persistent: true });
    expect(before - self.hp).toBeCloseTo(90 * 100 / (100 + self.spec.base.mr), 10);
  });
});

describe("Null Sphere's cast-start shield and guarded disrupt", () => {
  it("grants its 200 + 30% AP magic shield at declaration and expires 1.5 seconds after declaration", () => {
    const world = worldFor(0, { ap: 100 });
    cast(world, "Q");
    expect(world.units[0].statuses.find((status) => status.kind === "shield")).toMatchObject({ value: 230, shieldType: "magic", startTick: 0, endTick: 45 });
    expect(world.units[0].resource).toBeCloseTo(world.units[0].spec.base.resource, 10);
    expect(world.units[1].hp).toBe(100000);
    advance(world, 20);
    expect(world.units[1].hp).toBeCloseTo(100000 - 265, 10);
    expect(world.units[0].resource).toBeCloseTo(world.units[0].spec.base.resource - 80, 10);
    advance(world, 45);
    expect(world.units[0].statuses.some((status) => status.kind === "shield")).toBe(false);
  });

  it("absorbs reduced magic damage and leaves physical and true damage unshielded", () => {
    const world = worldFor();
    const [self, enemy] = world.units;
    cast(world, "Q");
    const before = self.hp;
    dealDamage(world, enemy, self, 100, "magic", {});
    const magic = 90 * 100 / (100 + self.spec.base.mr);
    expect(self.hp).toBe(before);
    expect(self.statuses.find((status) => status.kind === "shield")?.value).toBeCloseTo(200 - magic, 10);
    dealDamage(world, enemy, self, 100, "physical", {});
    dealDamage(world, enemy, self, 100, "true", {});
    expect(before - self.hp).toBeCloseTo(100 * 100 / (100 + self.spec.base.armor) + 100, 10);
  });

  it.each(["spellShield", "parry"] as const)("%s denies Null Sphere impact while retaining Kassadin's shield", (defense) => {
    const world = worldFor();
    state(world, 1, defense);
    cast(world, "Q");
    advance(world, 20);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[0].statuses.find((status) => status.kind === "shield")?.value).toBe(200);
  });

  it("a projectile wall destroys the orb without removing the already-granted self shield", () => {
    const world = worldFor(400);
    applyEffect(world, world.units[1], world.units[1], { type: "projectileWall", distance: 100, duration: 5 }, { scale: 1 });
    cast(world, "Q");
    advance(world, 30);
    expect(world.units[1].hp).toBe(100000);
    expect(world.missiles).toHaveLength(0);
    expect(world.units[0].statuses.find((status) => status.kind === "shield")?.value).toBe(200);
  });

  it("untargetability acquired during flight destroys the homing orb", () => {
    const world = worldFor(400);
    cast(world, "Q");
    advance(world, 8);
    expect(world.missiles).toHaveLength(1);
    state(world, 1, "untargetable");
    advance(world, 20);
    expect(world.units[1].hp).toBe(100000);
    expect(world.missiles).toHaveLength(0);
  });

  it("interrupts Master Yi Meditate on impact, leaving no silence or stun", () => {
    const yiSpec = compileKit(championData("MasterYi"), records("MasterYi"), yi, {}, pets("MasterYi"), runes()).spec;
    const world = worldFor(0, {}, { ...yiSpec, base: { ...yiSpec.base, hp: 100000, hpRegen: 0 } });
    cast(world, "W", 1);
    expect(world.units[1].action?.kind).toBe("channel");
    cast(world, "Q");
    advance(world, 20);
    expect(world.units[1].action).toBeUndefined();
    expect(world.units[1].statuses.some((status) => status.kind === "cc")).toBe(false);
    expect(canCast(world, world.units[1], spell(world, "E", 1))).toBe(true);
  });

  it.each(["uninterruptible", "ccImmune", "blackShield", "spellShield"] as const)("respects %s protection against channel disruption", (protection) => {
    const channel = syntheticAbility({ key: "W", delivery: { kind: "self" }, channel: { duration: 10, interruptible: protection !== "uninterruptible" } });
    const world = worldFor(0, {}, fighter({ id: "channeler", base: { hp: 100000, mr: 0 }, abilities: [channel] }));
    cast(world, "W", 1);
    if (protection === "blackShield") applyEffect(world, world.units[1], world.units[1], { type: "shield", amount: { base: 50 }, duration: 10, shieldType: "magic", blackShield: true }, { scale: 1 });
    else if (protection !== "uninterruptible") state(world, 1, protection);
    cast(world, "Q");
    advance(world, 20);
    expect(world.units[1].action?.kind).toBe("channel");
    if (protection === "blackShield") expect(world.units[1].statuses.some((status) => status.blackShield)).toBe(false);
  });
});

describe("Nether Blade replacement, attack defenses and mana restoration", () => {
  it("ordinary attacks retain one 25 + 10% AP magical on-hit", () => {
    const world = worldFor(0, { ap: 100 });
    attack(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad + 35, 10);
  });

  it("active damage replaces the passive and 100% critical chance multiplies only ordinary AD", () => {
    const world = worldFor(0, { ap: 100, critChance: 1 });
    const self = world.units[0];
    self.resource = 1000;
    cast(world, "W");
    expect(self.attackReadyTick).toBe(world.tick);
    attack(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(self).ad * derive(self).critDamage + 230, 10);
    expect(self.resource).toBeCloseTo(999 + .3 * (derive(self).maxResource - 999), 10);
    expect(world.log.filter((entry) => entry.text.startsWith("Nether Blade (active) deals"))).toHaveLength(1);
    expect(world.log.filter((entry) => entry.text.startsWith("Nether Blade (passive) deals"))).toHaveLength(0);
  });

  it("spell shield denies active magic, falls back to one passive packet and preserves mana restoration", () => {
    const world = worldFor(0, { ap: 100 });
    const self = world.units[0];
    self.resource = 1000;
    state(world, 1, "spellShield");
    cast(world, "W");
    attack(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(self).ad + 35, 10);
    expect(self.resource).toBeCloseTo(999 + .3 * (derive(self).maxResource - 999), 10);
    expect(hasState(world.units[1], "spellShield")).toBe(false);
  });

  it("flat damage reduction sees one active magic packet, rather than active plus passive", () => {
    const world = worldFor(0, { ap: 100 });
    state(world, 1, "flatDamageReduction", 24);
    cast(world, "W");
    attack(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(world.units[0]).ad - 24 + 230 - 24, 10);
  });

  it.each(["blockAttacks", "dodgeAttacks", "parry", "blind"] as const)("%s suppresses active damage with the documented separate mana guard", (defense) => {
    const world = worldFor();
    const self = world.units[0];
    self.resource = 1000;
    if (defense === "blind") applyEffect(world, world.units[1], self, { type: "cc", cc: "blind", duration: 10 }, { scale: 1 });
    else state(world, 1, defense);
    cast(world, "W");
    attack(world);
    expect(world.units[1].hp).toBe(100000);
    expect(self.resource).toBeCloseTo(defense === "blockAttacks" ? 999 + .3 * (derive(self).maxResource - 999) : 999, 10);
    expect(self.memory.bladeChampionHit).toBe(false);
  });

  it("grants 50 bonus range, consumes one empowered windup and waits for that hit before starting cooldown", () => {
    const world = worldFor(190);
    expect(canStartAttack(world, world.units[0])).toBe(false);
    cast(world, "W");
    expect(world.units[0].cooldownReady.W).toBe(Infinity);
    expect(canStartAttack(world, world.units[0])).toBe(true);
    startAttack(world, world.units[0]);
    const action = world.units[0].action;
    expect(action).toMatchObject({ kind: "windup", uncancellable: true, bonusRange: 50 });
    if (action?.kind !== "windup") throw new Error("No windup");
    world.units[1].x += 1000;
    advance(world, action.launchTick);
    expect(world.units[0].cooldownReady.W).toBe(action.launchTick + 210);
    expect(world.units[1].hp).toBeLessThan(100000);
  });

  it("expires after five seconds and cannot restore beyond maximum mana", () => {
    const world = worldFor();
    cast(world, "W");
    advance(world, 150);
    expect(world.units[0].statuses.some((status) => status.kind === "empower")).toBe(false);
    expect(world.units[0].cooldownReady.W).toBe(360);
    world.units[0].cooldownReady.W = 0;
    cast(world, "W");
    attack(world);
    expect(world.units[0].resource).toBeLessThanOrEqual(derive(world.units[0]).maxResource);
  });
});

describe("Force Pulse qualifying cast events", () => {
  const dummyCast = (activation: AbilitySpec["activation"] = "cast") => syntheticAbility({ key: "cast", castTime: 0, cooldown: 0, delivery: { kind: "self" }, activation });
  const eventWorld = (activation: AbilitySpec["activation"] = "cast") => worldFor(0, {}, fighter({ abilities: [dummyCast(activation)] }));

  it("its own successful activation refunds its newly-started cooldown exactly once", () => {
    const world = worldFor();
    finishCast(world, "E");
    expect(world.units[0].cooldownReady.E).toBe(8 + 510 - 23);
    expect(world.units[1].hp).toBeCloseTo(100000 - 190, 10);
    expect(world.units[1].statuses.find((status) => status.kind === "cc" && status.key === "slow")).toMatchObject({ value: .7, startTick: 8, endTick: 38 });
  });

  it("observes three instant enemy declarations on the same tick without polling or duplication", () => {
    const world = eventWorld();
    world.units[0].cooldownReady.E = 200;
    for (let i = 0; i < 3; i += 1) startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(131);
  });

  it.each(["toggle", "transformation", "internal"] as const)("ignores %s activations", (activation) => {
    const world = eventWorld(activation);
    world.units[0].cooldownReady.E = 200;
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(200);
  });

  it("includes 1800 exactly, excludes greater distances and excludes untargetable casters", () => {
    const world = eventWorld();
    world.units[0].cooldownReady.E = 200;
    world.units[1].x = 1800;
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(177);
    world.units[1].x = 1800.001;
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(177);
    world.units[1].x = 100;
    state(world, 1, "untargetable");
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(177);
  });

  it("floors refunds at readiness and does not bank reductions while already ready", () => {
    const world = eventWorld();
    world.units[0].cooldownReady.E = 10;
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].cooldownReady.E).toBe(0);
    startCast(world, world.units[1], spell(world, "cast", 1));
    expect(world.units[0].pendingRefunds.E).toBeUndefined();
    finishCast(world, "E");
    expect(world.units[0].cooldownReady.E).toBe(495);
  });

  it("self Q/W/R each count once while canceled declared enemy casts still count once", () => {
    const world = eventWorld();
    world.units[0].cooldownReady.E = 200;
    cast(world, "Q");
    expect(world.units[0].cooldownReady.E).toBe(177);
    advance(world, 20);
    expect(world.units[0].cooldownReady.E).toBe(177);
    cast(world, "W");
    expect(world.units[0].cooldownReady.E).toBe(154);
    finishCast(world, "R", 0);
    expect(world.units[0].cooldownReady.E).toBe(131);
    const castTimeAbility = { ...spell(world, "cast", 1), castTime: 1 };
    startCast(world, world.units[1], castTimeAbility);
    expect(world.units[0].cooldownReady.E).toBe(108);
    world.units[1].action = undefined;
    advance(world, world.tick + 40);
    expect(world.units[0].cooldownReady.E).toBe(108);
  });

  it("retains selected cone direction when the target crosses during cast time, without projectile-wall blocking", () => {
    const world = worldFor();
    cast(world, "E");
    world.units[1].x = -200;
    advance(world, 8);
    expect(world.units[1].hp).toBe(100000);
    const other = worldFor();
    applyEffect(other, other.units[1], other.units[1], { type: "projectileWall", distance: 20, duration: 10 }, { scale: 1 });
    finishCast(other, "E");
    expect(other.units[1].hp).toBe(99810);
  });
});

describe("Riftwalk's dynamic costs, damage, expiry and arrival", () => {
  it("reads 2% maximum mana at zero stacks and 6% at four stacks from actual derived maximum mana", () => {
    const world = worldFor(0, { ap: 100 });
    const [self, target] = world.units;
    const hit = spell(world, "R").onHit?.[0];
    if (hit?.type !== "damage") throw new Error("No Riftwalk damage");
    expect(hit.amount).toEqual({ base: 110, ratios: { AP: .5, maxMana: .02 } });
    expect(hit.amountFor!(self, target)).toBeCloseTo(110 + 50 + .02 * 2110.855, 10);
    applyEffect(world, self, self, { type: "stat", stat: "maxResource", amount: { base: 500 }, duration: 20 }, { scale: 1 });
    self.memory.riftDamageStacks = 4;
    expect(hit.amountFor!(self, target)).toBeCloseTo(330 + .78 * 100 + .06 * 2610.855, 10);
  });

  it("pays the exact 40/80/160/320/640 ladder, damages using the pre-cast tier and caps at four stacks", () => {
    const world = worldFor();
    const self = world.units[0];
    let total = 0;
    for (const [index, cost] of [40, 80, 160, 320, 640].entries()) {
      self.cooldownReady.R = 0;
      expect(costOf(self, spell(world, "R"))).toBe(cost);
      const hp = world.units[1].hp;
      finishCast(world, "R", 0);
      total += cost;
      expect(self.resource).toBeCloseTo(self.spec.base.resource - total, 10);
      expect(hp - world.units[1].hp).toBeCloseTo(152.2171 + index * 76.10855, 10);
      expect(self.memory.riftStacks).toBe(Math.min(4, index + 1));
    }
    expect(costOf(self, spell(world, "R"))).toBe(640);
  });

  it("denies an unaffordable capped cast without movement, damage or stack gain", () => {
    const world = worldFor();
    const self = world.units[0];
    self.memory.riftStacks = 4;
    self.resource = 639;
    const before = [self.x, world.units[1].hp, self.resource];
    expect(canCast(world, self, spell(world, "R"))).toBe(false);
    expect([self.x, world.units[1].hp, self.resource]).toEqual(before);
    expect(self.memory.riftStacks).toBe(4);
  });

  it("reserves the accepted Riftwalk cost before deciding whether an instant W overlay is affordable", () => {
    const world = worldFor();
    const self = world.units[0];
    self.resource = 40;
    cast(world, "R", 0, 0);
    expect(canCast(world, self, spell(world, "W"))).toBe(false);
    advance(world, 8);
    expect(self.resource).toBe(0);

    const enough = worldFor();
    enough.units[0].resource = 41;
    cast(enough, "R", 0, 0);
    expect(canCast(enough, enough.units[0], spell(enough, "W"))).toBe(true);
    cast(enough, "W");
    expect(enough.units[0].action).toMatchObject({ kind: "cast", ability: "R", cost: 40 });
    advance(enough, 8);
    expect(enough.units[0].resource).toBe(0);
    expect(enough.units[0].memory.riftStacks).toBe(1);
  });

  it("removes all stacks at the shared 15-second boundary and refreshes that boundary on successful casts", () => {
    const world = worldFor();
    finishCast(world, "R", 0);
    expect(world.units[0].memory.riftUntil).toBe(458);
    advance(world, 100);
    world.units[0].cooldownReady.R = 0;
    finishCast(world, "R", 0);
    const expire = Number(world.units[0].memory.riftUntil);
    expect(expire).toBe(559);
    advance(world, expire - 1);
    expect(world.units[0].memory.riftStacks).toBe(2);
    advance(world, expire);
    expect(world.units[0].memory.riftStacks).toBe(0);
    expect(costOf(world.units[0], spell(world, "R"))).toBe(40);
  });

  it("a cast started just before expiry retains the chosen damage/cost tier and refreshes all stacks", () => {
    const world = worldFor();
    const self = world.units[0];
    self.memory.riftStacks = 3;
    self.memory.riftUntil = 5;
    const resource = self.resource;
    const hp = world.units[1].hp;
    finishCast(world, "R", 0);
    expect(resource - self.resource).toBe(320);
    expect(hp - world.units[1].hp).toBeCloseTo(152.2171 + 3 * 76.10855, 10);
    expect(self.memory.riftStacks).toBe(4);
    expect(self.memory.riftUntil).toBe(458);
  });

  it("honors zero-distance and 500-unit maximum aimed blinks after the 0.25-second cast", () => {
    const world = worldFor(500);
    cast(world, "R", 0, 0);
    expect(world.units[0].x).toBe(0);
    advance(world, 8);
    expect(world.units[0].x).toBe(0);
    world.units[0].cooldownReady.R = 0;
    finishCast(world, "R", 1000);
    expect(world.units[0].x).toBe(500);
    expect(world.units[0].action?.kind).not.toBe("dash");
  });

  it("retains the selected direction when the enemy crosses during its cast", () => {
    const world = worldFor(500);
    cast(world, "R", 0, 500);
    world.units[1].x = -500;
    advance(world, 8);
    expect(world.units[0].x).toBe(500);
    expect(world.units[1].hp).toBe(100000);
  });

  it.each([[270, true], [270.001, false]] as const)("checks arrival damage against the target center at %s units", (gap, connects) => {
    const world = worldFor();
    world.units[1].x = gap;
    finishCast(world, "R", 0);
    expect(world.units[1].hp < 100000).toBe(connects);
  });

  it("spell shielding the arrival damage still pays mana and gains a stack", () => {
    const world = worldFor();
    state(world, 1, "spellShield");
    finishCast(world, "R", 0);
    expect(world.units[1].hp).toBe(100000);
    expect(world.units[0].resource).toBeCloseTo(world.units[0].spec.base.resource - 40, 10);
    expect(world.units[0].memory.riftStacks).toBe(1);
  });

  it.each(["root", "ground"] as const)("%s denies movement casting", (cc) => {
    const world = worldFor();
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 10 }, { scale: 1 });
    expect(canCast(world, world.units[0], spell(world, "R"))).toBe(false);
  });

  it("keeps dynamic tiers, cast snapshots and later mutation local to each copied branch", () => {
    const original = worldFor();
    original.units[0].memory.riftStacks = 2;
    cast(original, "R", 0, 0);
    const branch = cloneWorld(original);
    branch.units[0].memory.riftStacks = 4;
    advance(original, 8);
    advance(branch, 8);
    expect(original.units[0].resource).toBeCloseTo(original.units[0].spec.base.resource - 160, 10);
    expect(branch.units[0].resource).toBeCloseTo(branch.units[0].spec.base.resource - 160, 10);
    expect(original.units[1].hp).toBe(branch.units[1].hp);
    original.units[0].memory.riftStacks = 1;
    expect(branch.units[0].memory.riftStacks).toBe(3);
    expect(spell(original, "R").cost).toBe(40);
  });
});

describe("Kassadin default behavior, budget and reflection", () => {
  it("uses QWER, weave resets and mana restoration in a real unscripted duel", () => {
    const world = createWorld({ fighters: [subject({ ap: 100 }), fighter({ id: "attacker", base: { hp: 30000, ad: 50 } })], distance: 400, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 15, maxBranches: 1, reactionTime: 10 } });
    runWorld(world);
    for (const ability of world.units[0].spec.abilities) expect(world.log.some((entry) => entry.side === 0 && entry.text === `casts ${ability.name}`), ability.key).toBe(true);
    expect(world.log.some((entry) => entry.text.startsWith("Nether Blade (active) deals"))).toBe(true);
    expect(Number(world.units[0].memory.riftStacks)).toBeGreaterThan(0);
    expect(world.units[0].resource).toBeGreaterThanOrEqual(0);
  });

  it("uses an affordable retreat blink and chooses a short arrival blink in melee", () => {
    const world = worldFor();
    world.modes[0] = "flee";
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "R", aim: { direction: -1, distance: 500 } });
    world.modes[0] = "fight";
    world.units[0].cooldownReady.Q = Infinity;
    world.units[0].cooldownReady.E = Infinity;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "cast", ability: "R", aim: { direction: 1, distance: 60 } });
  });

  it("retreats after a completed trade even while Q/E/R remain ready", () => {
    const world = worldFor();
    world.modes[0] = "trade";
    world.units[0].memory.tradeDone = true;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
  });

  it("lets the ordinary trade clock expire before selecting another spell", () => {
    const world = worldFor();
    world.modes[0] = "trade";
    world.units[0].memory.tradeStart = 0;
    world.tick = Math.ceil(world.settings.tradeSeconds * 30) + 1;
    expect(world.units[0].spec.behavior!(perceive(world, 0))).toEqual({ kind: "move", direction: -1 });
    expect(world.units[0].memory.tradeDone).toBe(true);
  });

  it.each(["hold", "trade"] as const)("does not use an offensive ultimate in %s mode", (mode) => {
    const world = worldFor(400);
    world.modes[0] = mode;
    for (const key of ["Q", "E", "W"]) world.units[0].cooldownReady[key] = Infinity;
    const command = world.units[0].spec.behavior!(perceive(world, 0));
    expect(command?.kind === "cast" && command.ability === "R").toBe(false);
    if (mode === "hold") expect(command).toEqual({ kind: "move", direction: 0 });
  });

  it("does not close distance with R in kite mode and spends no retreat blink when already safely distant", () => {
    const world = worldFor(400);
    for (const key of ["Q", "E", "W"]) world.units[0].cooldownReady[key] = Infinity;
    world.modes[0] = "kite";
    let command = world.units[0].spec.behavior!(perceive(world, 0));
    expect(command?.kind === "cast" && command.ability === "R").toBe(false);
    world.modes[0] = "flee";
    world.units[1].x = 1500;
    command = world.units[0].spec.behavior!(perceive(world, 0));
    expect(command).toEqual({ kind: "move", direction: -1 });
  });

  it("evaluates sealed budget formulas without double-counting W or assuming perpetual maximum-stack R", () => {
    const world = worldFor(0, { ap: 100, abilityHaste: 50 });
    const [self, target] = world.units;
    const hint = self.spec.budget!.damage!(self, target);
    expect(Number.isFinite(hint.magic)).toBe(true);
    const dps = damagePerSecond(self.spec, target.spec);
    expect(dps.magic).toBeGreaterThan(0);
    const maxR = 330 + .78 * 100 + .06 * derive(self).maxResource;
    expect(dps.magic).toBeLessThan(35 * derive(self).attackSpeed + 230 / 5 + 265 / 5 + 260 / 11 + maxR / (2 / 1.5 + .25));
    expect(evaluate({ base: 0, ratios: { missingMana: .3 } }, self)).toBe(0);
  });

  it("preserves both builds, every scenario and opposite counter scores at 15,000 gold after reflecting Darius", () => {
    const spec = compiled().spec;
    const darius = kit("Darius").spec;
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.21/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const forward = simulateMatchup(spec, darius, 15000, prices);
    const reverse = simulateMatchup(darius, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]);
    const reflected = [1, 0, 2, 3, 4, 5];
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[reflected[index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined();
      else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12);
    }
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12);
  }, 60000);
});
