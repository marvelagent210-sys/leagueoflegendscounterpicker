import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { attackRange, canCast, canStartAttack, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { applyEffect, beginResurrection, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, fairFight, step } from "../../engine/sim/simulate";
import type { FighterSpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Gragas from "../../kits/champions/Gragas";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records, runes } from "./helpers";

const idle: Behavior = () => undefined;
const compiled = () => compileKit(championData("Gragas"), records("Gragas"), Gragas, {}, pets("Gragas"), runes());
const subject = (bonus: FighterSpec["bonus"] = {}): FighterSpec => { const spec = compiled().spec; return { ...spec, bonus, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const dummy = () => fighter({ id: "target", base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
const worldFor = (distance = 300, bonus: FighterSpec["bonus"] = {}) => { const world = createWorld({ fighters: [subject(bonus), dummy()], distance, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 40, maxBranches: 1, reactionTime: 10 } }); world.units[0].x = 0; world.units[1].x = distance; return world; };
const ability = (world: World, key: string, side: 0 | 1 = 0) => world.units[side].spec.abilities.find(ability => ability.key === key)!;
const cast = (world: World, key: string, distance?: number, direction: -1 | 1 = 1) => startCast(world, world.units[0], ability(world, key), distance === undefined ? undefined : { direction, distance });
const advance = (world: World, through: number) => { while (world.tick <= through && !world.result) step(world, [idle, idle]); };
const state = (world: World, side: 0 | 1, key: StateType, duration = 30) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration }, { scale: 1 });
const petSpec = (changes: Partial<PetSpec> = {}): PetSpec => ({ kind: "test", name: "Test pet", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: Infinity, ...changes });
const petState = (world: World, pet: Pet, key: StateType) => { const target = petFormulaTarget(pet, world.units[0], world.tick); applyEffect(world, target, target, { type: "state", state: key, duration: 30 }, { scale: 1 }); pet.statuses = target.statuses; };
const basic = (world: World, pet?: Pet) => { startAttack(world, world.units[0], pet); const action = world.units[0].action; expect(action?.kind).toBe("windup"); if (action?.kind === "windup") advance(world, action.launchTick); };
const drink = (world: World) => { cast(world, "W"); advance(world, world.tick + 23); expect(world.units[0].statuses.some(status => status.kind === "empower" && status.key === "W")).toBe(true); };
const barrel = (world: World, distance = Math.abs(world.units[1].x - world.units[0].x)) => { const tick = world.tick; cast(world, "Q", distance); advance(world, tick + 8 + Math.ceil(distance / (1000 / 30) - 1e-9)); const zone = world.zones.find(zone => zone.ability === "Qburst"); expect(zone).toBeDefined(); return zone!; };
const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;

describe("Gragas production", () => {
  it("reflects exact 15000-gold builds and all six production scores against Darius", () => {
    const own = compiled().spec, enemy = kit("Darius").spec;
    const forward = simulateMatchup(own, enemy, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(enemy, own, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(forward.scenarios).toHaveLength(6);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-10);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const other = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-10);
      for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
    }
    const casts = forward.scenarios.flatMap(scenario => scenario.outcomes.flatMap(outcome => outcome.timeline.filter(row => row.side === 0 && row.text.startsWith("casts ")).map(row => row.text)));
    for (const name of ["Barrel Roll", "Drunken Rage", "Body Slam", "Explosive Cask"]) expect(casts.some(text => text.includes(name))).toBe(true);
  }, 60000);
  it("finishes all six production scenarios against actual Heimerdinger pets", () => {
    const result = simulateMatchup(compiled().spec, kit("Heimerdinger", { upgrade: 2 }).spec, 15000, prices);
    expect(result.scenarios).toHaveLength(6); expect(Number.isFinite(result.score)).toBe(true);
    for (const scenario of result.scenarios) for (const outcome of scenario.outcomes) expect([outcome.seconds, ...outcome.hp, ...outcome.damage].every(Number.isFinite)).toBe(true);
  }, 60000);
});

describe("Gragas mechanics evidence and state", () => {
  it("preserves all five pins, full raw templates, exact binary attribution and complete arrays", () => {
    const data = records("Gragas"), value = compiled();
    expect(data.map(row => row.page.revid).sort()).toEqual([3906845, 3907002, 3985369, 4007602, 4013236]);
    expect(data.every(row => row.sources?.some(source => source.page.revid === row.page.revid && source.text.some(text => text.includes("|champion") && text.includes("|notes"))))).toBe(true);
    expect(data.flatMap(row => row.gameSources ?? [])).toHaveLength(10);
    for (const evidence of value.evidence.filter(row => row.url)) expect(evidence).toMatchObject({ url: "https://raw.communitydragon.org/16.20/game/data/characters/gragas/gragas.bin.json", sourceVersion: "16.20.8248524+branch.releases-16-20.content.release", sourceSha256: "c8f2dd383f9e220c90ab63b9de9db5fbc97c1751ab2141f243cafdc8074863dc" });
    for (const row of data) for (const source of row.gameSources ?? []) for (const text of source.text.filter(text => text.includes(".values:"))) expect(JSON.parse(text.split(": ")[1]!)).toHaveLength(7);
    expect(value.assumptions.join(" ")).toContain("unquantified"); expect(value.assumptions.join(" ")).toContain("binary900"); expect(value.assumptions.join(" ")).toContain("castRadius350");
    expect(value.variants).toEqual([]); expect(value.spec.start ?? []).toEqual([]);
  });
  it("fails closed when a runtime source rule or binary value disappears", () => {
    const data = records("Gragas"); const w = data.find(row => row.kind === "W")!;
    w.gameSources = w.gameSources?.map(source => ({ ...source, text: source.text.map(text => text.replaceAll("300.0", "299.0")) }));
    expect(() => compileKit(championData("Gragas"), data, Gragas)).toThrow("pinned game data");
    const primary = records("Gragas"), e = primary.find(row => row.kind === "E")!;
    e.notes = e.notes.map(text => text.replaceAll("30 units in front", "31 units in front")); e.sources = e.sources?.map(source => ({ ...source, text: source.text.map(text => text.replaceAll("30 units in front", "31 units in front")) }));
    expect(() => compileKit(championData("Gragas"), primary, Gragas)).toThrow("30 units in front");
  });
  it("keeps compiled runtime free of source reads and branch state independent", () => {
    const world = worldFor(); world.units[0].hp -= 1000; const zone = barrel(world);
    const clone = cloneWorld(world); const copied = clone.zones.find(candidate => candidate.id === zone.id)!;
    copied.memory!.landed = -60; clone.units[0].memory["gragas:happyReady"] = -1;
    expect(zone.memory!.landed).not.toBe(-60); expect(world.units[0].memory["gragas:happyReady"]).not.toBe(-1);
    cast(clone, "Q2"); expect(world.units[1].hp).toBe(100000); expect(clone.units[1].hp).toBeLessThan(100000); expect(world.zones.some(candidate => candidate.id === zone.id)).toBe(true);
  });
  it("reflects ordinary short mirror fights without nonfinite output", () => {
    const result = fairFight({ fighters: [subject(), subject()], distance: 600, modes: ["fight", "fight"], settings: { maxSeconds: 5, maxBranches: 1 } });
    expect(result.damage[0]).toBeCloseTo(result.damage[1], 8); expect(Number.isFinite(result.seconds)).toBe(true);
  });
});

describe("Gragas mechanics Happy Hour", () => {
  it("never pulses during idle time and waits for a completed actual cast", () => {
    const world = worldFor(); world.units[0].hp -= 1000; const before = world.units[0].hp; advance(world, 210);
    expect(world.units[0].hp).toBe(before); cast(world, "Q"); expect(world.units[0].hp).toBe(before);
    advance(world, world.tick + 8); expect(world.units[0].hp - before).toBeCloseTo(derive(world.units[0]).maxHp * .055);
  });
  it("uses an independent static six-second clock despite haste and no recast activation", () => {
    const world = worldFor(300, { abilityHaste: 100 }); world.units[0].hp -= 1500; const zone = barrel(world); const first = world.units[0].totals.healing;
    cast(world, "Q2"); cast(world, "W"); expect(world.units[0].totals.healing).toBe(first); expect(world.units[0].memory["gragas:happyReady"]).toBe(188);
    advance(world, 188); world.units[0].cooldownReady.E = 0; cast(world, "E", 0); expect(world.units[0].totals.healing).toBeCloseTo(first * 2); expect(zone.memory?.landed).toBeGreaterThan(0);
  });
  it("uses healing received and Grievous Wounds modifiers", () => {
    const world = worldFor(); const self = world.units[0]; self.hp -= 1000;
    applyEffect(world, self, self, { type: "stat", stat: "healingIncrease", amount: { base: .5 }, duration: 10 }, { scale: 1 });
    applyEffect(world, world.units[1], self, { type: "grievousWounds", duration: 10 }, { scale: 1 });
    const before = self.hp; cast(world, "W"); expect(self.hp - before).toBeCloseTo(derive(self).maxHp * .055 * 1.5 * .6);
  });
});

describe("Gragas mechanics Barrel Roll", () => {
  it.each([true, false])("uses the actual barrel center for Braum's frontal guard (front=%s)", front => {
    const world = createWorld({ fighters: [subject(), kit("Braum").spec], distance: 300, modes: ["idle", "idle"], settings: { reactionTime: 10, maxBranches: 1 } });
    const [self, enemy] = world.units; self.x = 0; enemy.x = 300;
    barrel(world, front ? 400 : 200);
    self.x = front ? -1000 : 1000;
    startCast(world, enemy, ability(world, "E", 1), { direction: front ? -1 : 1 });
    expect(enemy.facing).toBe(1); const before = enemy.totals.damageTaken;
    cast(world, "Q2");
    if (front) { expect(enemy.totals.damageTaken).toBe(before); expect(enemy.memory["braum:eFirstTick"]).toBe(world.tick); }
    else { expect(enemy.totals.damageTaken).toBeGreaterThan(before); expect(enemy.memory["braum:eFirstTick"]).toBeUndefined(); }
  });
  it("has a real cast lock, finite flight and arrival-gated recast", () => {
    const world = worldFor(850); cast(world, "Q", 850); expect(world.units[0].cooldownReady.Q).toBe(180);
    expect(canCast(world, world.units[0], ability(world, "Q2"))).toBe(false); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false);
    advance(world, 7); expect(world.missiles).toHaveLength(0); advance(world, 8); expect(world.missiles).toHaveLength(1); expect(world.units[1].hp).toBe(100000);
    advance(world, 32); expect(canCast(world, world.units[0], ability(world, "Q2"))).toBe(false); advance(world, 34);
    expect(world.zones.find(zone => zone.ability === "Qburst")?.memory?.landed).toBe(34); expect(canCast(world, world.units[0], ability(world, "Q2"))).toBe(true);
  });
  it("ferments from actual landing time and detonates once with the sourced slow", () => {
    const world = worldFor(300, { ap: 100 }), zone = barrel(world); advance(world, Number(zone.memory!.landed) + 29); cast(world, "Q2");
    expect(100000 - world.units[1].hp).toBeCloseTo(320 * 1.25); expect(world.units[1].statuses.find(status => status.key === "slow")?.value).toBeCloseTo(.75);
    expect(world.units[1].statuses.find(status => status.key === "slow")?.endTick).toBe(world.tick + 60); expect(canCast(world, world.units[0], ability(world, "Q2"))).toBe(false);
    advance(world, 200); expect(100000 - world.units[1].hp).toBeCloseTo(400);
  });
  it("automatically explodes at four seconds and caps fermentation at two", () => {
    const world = worldFor(), zone = barrel(world); advance(world, Number(zone.memory!.landed) + 119); expect(world.units[1].hp).toBe(100000);
    advance(world, Number(zone.memory!.landed) + 120); expect(100000 - world.units[1].hp).toBe(360); expect(world.units[1].statuses.find(status => status.key === "slow")?.value).toBeCloseTo(.9);
  });
  it("uses actual pet classes, area resistance and no hit-count collateral", () => {
    const world = worldFor(1500), minion = spawnPet(world, world.units[1], petSpec({ targetClass: "minion" }), 300), monster = spawnPet(world, world.units[1], petSpec({ targetClass: "monster" }), 350), unclassified = spawnPet(world, world.units[1], petSpec({ areaTaken: .4 }), 250), ward = spawnPet(world, world.units[1], petSpec({ hitPoints: true, hp: 4 }), 300);
    const zone = barrel(world, 300); advance(world, Number(zone.memory!.landed) + 60); cast(world, "Q2");
    expect(10000 - minion.hp).toBeCloseTo(252); expect(10000 - monster.hp).toBe(360); expect(10000 - unclassified.hp).toBe(144); expect(ward.hp).toBe(4); expect(world.units[1].hp).toBe(100000);
    expect(minion.statuses?.some(status => status.key === "slow")).toBe(true);
  });
  it.each(["spellShield", "parry", "invulnerable", "untargetable", "stasis"] as const)("resolves %s separately on the actual champion and pet", guard => {
    const world = worldFor(), protectedPet = spawnPet(world, world.units[1], petSpec(), 300), openPet = spawnPet(world, world.units[1], petSpec(), 320); state(world, 1, guard); petState(world, protectedPet, guard); const zone = barrel(world); cast(world, "Q2");
    expect(world.units[1].hp).toBe(100000); expect(protectedPet.hp).toBe(10000); expect(openPet.hp).toBeLessThan(10000); expect(world.zones.some(candidate => candidate.id === zone.id)).toBe(false);
    if (guard === "spellShield") { expect(hasState(world.units[1], guard)).toBe(false); expect(protectedPet.statuses?.some(status => status.key === guard)).toBe(false); }
  });
  it("uses each pet's slow immunity without suppressing its damage", () => { const world = worldFor(), pet = spawnPet(world, world.units[1], petSpec({ ccImmune: ["slow"] }), 300); barrel(world); cast(world, "Q2"); expect(pet.hp).toBeLessThan(10000); expect(pet.statuses?.some(status => status.key === "slow")).toBe(false); });
  it("ignores bodies and terrain while projectile walls cancel pending flight", () => {
    const world = worldFor(600); world.terrain.push({ id: world.nextId++, owner: 1, from: 200, to: 300, endTick: 1000 }); const pet = spawnPet(world, world.units[1], petSpec(), 100); barrel(world, 600); expect(pet.hp).toBe(10000);
    const blocked = worldFor(600); blocked.zones.push({ id: blocked.nextId++, owner: 1, kind: "projectileWall", x: 300, radius: 0, startTick: 0, endTick: 1000, seenTick: 0 }); cast(blocked, "Q", 600); advance(blocked, 60); expect(blocked.units[1].hp).toBe(100000); expect(blocked.zones.some(zone => ["Qflight", "Qburst"].includes(zone.ability ?? ""))).toBe(false);
  });
  it("saves an explicit reflected ground aim instead of tracking the target", () => {
    const world = worldFor(300); cast(world, "Q", 200, -1); advance(world, 40); const zone = world.zones.find(zone => zone.ability === "Qburst")!; expect(zone.x).toBe(-200); cast(world, "Q2"); expect(world.units[1].hp).toBe(100000);
    const reflected = createWorld({ fighters: [dummy(), subject()], distance: 300, modes: ["idle", "idle"], settings: { maxBranches: 1, reactionTime: 10 } }); reflected.units[0].x = -300; reflected.units[1].x = 0;
    startCast(reflected, reflected.units[1], ability(reflected, "Q", 1), { direction: -1, distance: 200 }); advance(reflected, 40); expect(reflected.zones.find(zone => zone.ability === "Qburst")?.x).toBe(200);
  });
});

describe("Gragas mechanics Drunken Rage", () => {
  it("reduces damage during the mobile channel and empowers only on completion", () => {
    const world = worldFor(100, { ap: 100 }), self = world.units[0]; cast(world, "W"); expect(self.action?.kind).toBe("channel"); expect(canStartAttack(world, self)).toBe(false); expect(canCast(world, self, ability(world, "Q"))).toBe(false);
    expect(self.statuses.some(status => status.kind === "empower")).toBe(false); const before = self.hp; dealDamage(world, world.units[1], self, 100, "physical");
    expect(before - self.hp).toBeCloseTo(100 * .7 / (1 + (derive(self).armor.base + derive(self).armor.bonus) / 100)); advance(world, 22); expect(self.statuses.some(status => status.kind === "empower")).toBe(false); advance(world, 23);
    expect(attackRange(self, world.units[1])).toBe(self.spec.attack.range + 50); expect(self.statuses.some(status => status.kind === "empower")).toBe(true);
  });
  it("interrupts on silence without inventing an empowerment or removing the existing reduction", () => {
    const world = worldFor(); cast(world, "W"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "silence", duration: 1 }, { scale: 1 }); advance(world, 25);
    expect(world.units[0].statuses.some(status => status.kind === "empower")).toBe(false); expect(hasState(world.units[0], "damageReduction")).toBe(true); expect(world.units[0].cooldownReady.W).toBe(150);
  });
  it("keeps the real crit/basic/on-hit packet separate and caps only a monster's HP term", () => {
    const world = worldFor(100, { ap: 100, critChance: 1 }), self = world.units[0]; self.spec.attack.onHit = [{ type: "damage", damageType: "magic", amount: { base: 11 } }];
    const monster = spawnPet(world, world.units[1], petSpec({ hp: 20000, targetClass: "monster" }), 180), minion = spawnPet(world, world.units[1], petSpec({ hp: 20000, targetClass: "minion" }), 200);
    drink(world); basic(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(self).ad * derive(self).critDamage + 11 + 140 + 70 + 7000);
    expect(20000 - monster.hp).toBe(140 + 70 + 300); expect(20000 - minion.hp).toBe(140 + 70 + 1400); expect(world.units[0].cooldownReady.W).toBe(world.tick - 1 + 150);
  });
  it.each(["dodgeAttacks", "blockAttacks", "parry"] as const)("%s on the primary prevents the area trigger", guard => {
    const world = worldFor(100), pet = spawnPet(world, world.units[1], petSpec(), 100); drink(world); state(world, 1, guard); basic(world);
    expect(world.units[1].hp).toBe(100000); expect(pet.hp).toBe(10000); expect(world.units[0].statuses.some(status => status.kind === "empower")).toBe(false);
  });
  it("blind consumes the real attack without an area or ordinary on-hits", () => {
    const world = worldFor(100); drink(world); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "blind", duration: 10 }, { scale: 1 }); const pet = spawnPet(world, world.units[1], petSpec(), 100); basic(world); expect(world.units[1].hp).toBe(100000); expect(pet.hp).toBe(10000);
  });
  it("spellshield denies its own magic packet while ordinary basic/onhits and secondary damage remain", () => {
    const world = worldFor(100), self = world.units[0], pet = spawnPet(world, world.units[1], petSpec(), 100); self.spec.attack.onHit = [{ type: "damage", damageType: "magic", amount: { base: 17 } }]; drink(world); state(world, 1, "spellShield"); basic(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(derive(self).ad + 17); expect(10000 - pet.hp).toBe(840); expect(hasState(world.units[1], "spellShield")).toBe(false);
  });
  it("does not give the bonus area critical damage, on-hits or life steal", () => {
    const world = worldFor(100, { critChance: 1 }), self = world.units[0]; self.hp -= 1000; drink(world); applyEffect(world, self, self, { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 }); const before = self.hp, pet = spawnPet(world, world.units[1], petSpec(), 100); basic(world);
    expect(self.hp - before).toBeCloseTo(derive(self).ad * derive(self).critDamage * .2); expect(10000 - pet.hp).toBe(840);
  });
  it("keeps an actual pet's spellshield transaction independent of the distant owner", () => {
    const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec(), 100), second = spawnPet(world, world.units[1], petSpec(), 200); drink(world); petState(world, pet, "spellShield"); state(world, 1, "parry"); basic(world, pet);
    expect(10000 - pet.hp).toBeCloseTo(derive(world.units[0]).ad); expect(pet.statuses?.some(status => status.key === "spellShield")).toBe(false); expect(10000 - second.hp).toBe(840); expect(world.units[1].hp).toBe(100000);
  });
  it("preserves the ward exception and starts cooldown only after the real effect ends", () => {
    const world = worldFor(1500), self = world.units[0], ward = spawnPet(world, world.units[1], petSpec({ hitPoints: true, hp: 4 }), 100); drink(world); expect(self.cooldownReady.W).toBe(Infinity); basic(world, ward); expect(ward.hp).toBe(3);
    expect(self.statuses.some(status => status.kind === "empower" && status.key === "W")).toBe(true); expect(self.cooldownReady.W).toBe(Infinity); advance(world, 173); expect(self.cooldownReady.W).toBe(323);
  });
  it("uses secondary body guards without borrowing the primary's damage immunity", () => {
    const world = worldFor(100), pet = spawnPet(world, world.units[1], petSpec(), 120), guarded = spawnPet(world, world.units[1], petSpec(), 140); drink(world); state(world, 1, "invulnerable"); petState(world, guarded, "parry"); basic(world);
    expect(world.units[1].hp).toBe(100000); expect(10000 - pet.hp).toBe(840); expect(guarded.hp).toBe(10000);
  });
});

describe("Gragas mechanics Body Slam", () => {
  it("stops at the first physical pet and refunds current cooldown once", () => {
    const world = worldFor(800), pet = spawnPet(world, world.units[1], petSpec(), 300), later = spawnPet(world, world.units[1], petSpec(), 600); cast(world, "E"); advance(world, 20);
    expect(world.units[0].x).toBeCloseTo(120); expect(10000 - pet.hp).toBe(260); expect(later.hp).toBe(10000); expect(world.units[1].hp).toBe(100000); expect(pet.statuses?.some(status => status.key === "stun")).toBe(true); expect(world.units[0].cooldownReady.E).toBe(218);
  });
  it.each(["spellShield", "parry", "invulnerable"] as const)("physical collision still stops and refunds through %s", guard => {
    const world = worldFor(500); state(world, 1, guard); cast(world, "E"); advance(world, 25); expect(world.units[0].x).toBeCloseTo(320); expect(world.units[1].hp).toBe(100000); expect(world.units[0].cooldownReady.E).toBeLessThan(360);
  });
  it("keeps displacement immunity separate from stun and tenacity", () => {
    const world = worldFor(300); state(world, 1, "displacementImmune"); applyEffect(world, world.units[1], world.units[1], { type: "state", state: "tenacity", duration: 10, value: .3 }, { scale: 1 }); cast(world, "E"); advance(world, 5);
    const stun = world.units[1].statuses.find(status => status.key === "stun")!; expect(stun.endTick - stun.startTick).toBe(21); expect(world.units[1].x).toBe(300); expect(100000 - world.units[1].hp).toBe(260);
  });
  it("resolves pet airborne and stun immunity independently", () => {
    const world = worldFor(1500), airborneImmune = spawnPet(world, world.units[1], petSpec({ ccImmune: ["airborne"] }), 300), stunImmune = spawnPet(world, world.units[1], petSpec({ ccImmune: ["stun"] }), 310); cast(world, "E"); advance(world, 8);
    expect(airborneImmune.statuses?.some(status => status.key === "stun")).toBe(true); expect(stunImmune.statuses?.some(status => status.key === "stun")).toBe(false); expect(10000 - stunImmune.hp).toBe(260);
  });
  it("crosses intervening terrain but clips an obstructed endpoint", () => {
    const world = worldFor(1500); world.terrain.push({ id: world.nextId++, owner: 1, from: 250, to: 350, endTick: 1000 }); cast(world, "E", 600); advance(world, 25); expect(world.units[0].x).toBe(600);
    const clipped = worldFor(1500); clipped.terrain.push({ id: clipped.nextId++, owner: 1, from: 570, to: 700, endTick: 1000 }); cast(clipped, "E", 600); advance(clipped, 25); expect(clipped.units[0].x).toBe(570 - clipped.units[0].spec.base.pathingRadius); expect(clipped.units[0].cooldownReady.E).toBe(360);
  });
  it("supports the final forward lollipop without inventing a knockback distance", () => { const world = worldFor(1500), pet = spawnPet(world, world.units[1], petSpec(), 840); cast(world, "E", 600); advance(world, 25); expect(10000 - pet.hp).toBe(260); expect(pet.x).toBe(840); expect(pet.statuses?.some(status => status.key === "stun")).toBe(true); });
  it("ground prevents declaration and airborne knockdown cancels arrival/refund", () => {
    const world = worldFor(600); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "ground", duration: 2 }, { scale: 1 }); expect(canCast(world, world.units[0], ability(world, "E"))).toBe(false);
    const interrupted = worldFor(600); cast(interrupted, "E"); advance(interrupted, 3); applyEffect(interrupted, interrupted.units[1], interrupted.units[0], { type: "displace", direction: "away", distance: 0, duration: .1 }, { scale: 1 }); advance(interrupted, 30); expect(interrupted.units[1].hp).toBe(100000); expect(interrupted.units[0].cooldownReady.E).toBe(360);
  });
  it("allows Q/R overlays but keeps their locks and forbids W during the dash", () => {
    const world = worldFor(1500); cast(world, "E"); expect(canCast(world, world.units[0], ability(world, "Q"))).toBe(true); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(true); expect(canCast(world, world.units[0], ability(world, "W"))).toBe(false);
    cast(world, "Q", 300); expect(world.units[0].action?.kind).toBe("dash"); expect(canCast(world, world.units[0], ability(world, "R"))).toBe(false); advance(world, 8); expect(world.missiles.some(missile => missile.source === "Qflight")).toBe(true); expect(world.units[0].x).toBeGreaterThan(0);
  });
});

describe("Gragas mechanics Explosive Cask", () => {
  it.each([true, false])("uses the actual ultimate center after displacement for Braum's guard (front=%s)", front => {
    const world = createWorld({ fighters: [subject(), kit("Braum").spec], distance: 300, modes: ["idle", "idle"], settings: { reactionTime: 10, maxBranches: 1 } });
    const [self, enemy] = world.units; self.x = 0; enemy.x = 300;
    cast(world, "R", front ? 400 : 200); advance(world, 21);
    self.x = front ? -1000 : 1000;
    startCast(world, enemy, ability(world, "E", 1), { direction: front ? -1 : 1 });
    expect(enemy.facing).toBe(1); const before = enemy.totals.damageTaken;
    advance(world, 25);
    if (front) { expect(enemy.totals.damageTaken).toBe(before); expect(enemy.memory["braum:eFirstTick"]).toBeDefined(); }
    else { expect(enemy.totals.damageTaken).toBeGreaterThan(before); expect(enemy.memory["braum:eFirstTick"]).toBeUndefined(); }
  });
  it("flies for exactly half a second to a fixed center and knocks away from that center", () => {
    const world = worldFor(500); cast(world, "R", 600); advance(world, 22); expect(world.units[1].hp).toBe(100000); advance(world, 23); expect(100000 - world.units[1].hp).toBe(400); expect(world.units[1].x).toBe(-400);
    expect(world.zones.some(zone => zone.ability === "Rvision")).toBe(true); expect(world.units[1].statuses.some(status => status.key === "airborne" || status.key === "revealed")).toBe(false);
  });
  it("applies center-relative directions to each actual pet independently", () => {
    const world = worldFor(1500), left = spawnPet(world, world.units[1], petSpec(), 500), right = spawnPet(world, world.units[1], petSpec(), 700), center = spawnPet(world, world.units[1], petSpec(), 600); cast(world, "R", 600); advance(world, 25);
    expect(left.x).toBe(-400); expect(right.x).toBe(1600); expect(center.x).toBe(1500); for (const pet of [left, right, center]) expect(10000 - pet.hp).toBe(400); expect(world.units[1].hp).toBe(100000);
  });
  it.each(["spellShield", "parry", "invulnerable", "untargetable", "stasis"] as const)("resolves %s locally on actual pets", guard => {
    const world = worldFor(1500), protectedPet = spawnPet(world, world.units[1], petSpec(), 500), open = spawnPet(world, world.units[1], petSpec(), 700); petState(world, protectedPet, guard); state(world, 1, "parry"); cast(world, "R", 600); advance(world, 25);
    expect(protectedPet.hp).toBe(10000); expect(open.hp).toBe(9600); expect(open.x).toBe(1600);
    expect(protectedPet.x).toBe(guard === "invulnerable" ? -400 : 500); if (guard === "spellShield") expect(protectedPet.statuses?.some(status => status.key === guard)).toBe(false);
  });
  it("preserves damage through displacement immunity and clips actual terrain", () => {
    const world = worldFor(500); state(world, 1, "displacementImmune"); cast(world, "R", 400); advance(world, 25); expect(world.units[1].x).toBe(500); expect(world.units[1].hp).toBe(99600);
    const clipped = worldFor(500); clipped.terrain.push({ id: clipped.nextId++, owner: 0, from: 800, to: 900, endTick: 1000 }); cast(clipped, "R", 400); advance(clipped, 25); expect(clipped.units[1].x).toBe(800 - clipped.units[1].spec.base.pathingRadius);
  });
  it("uses pet airborne immunity and black shield without borrowing owner protection", () => {
    const world = worldFor(1500), immune = spawnPet(world, world.units[1], petSpec({ ccImmune: ["airborne"] }), 500), black = spawnPet(world, world.units[1], petSpec(), 700); const target = petFormulaTarget(black, world.units[0], world.tick); applyEffect(world, target, target, { type: "shield", amount: { base: 1000 }, blackShield: true, duration: 10 }, { scale: 1 }); black.statuses = target.statuses; cast(world, "R", 600); advance(world, 25);
    expect(immune.x).toBe(500); expect(immune.hp).toBe(9600); expect(black.x).toBe(700); expect(black.hp).toBe(10000);
  });
  it("lets a projectile wall destroy the cask without collateral or displacement", () => {
    const world = worldFor(500), pet = spawnPet(world, world.units[1], petSpec(), 600); world.zones.push({ id: world.nextId++, owner: 1, kind: "projectileWall", x: 300, radius: 0, startTick: 0, endTick: 1000, seenTick: 0 }); cast(world, "R", 600); advance(world, 30);
    expect(world.units[1].hp).toBe(100000); expect(pet.hp).toBe(10000); expect(pet.x).toBe(600); expect(world.zones.some(zone => zone.ability === "Rimpact")).toBe(false);
  });
  it("reflects co-location tie-breaks and explicit aim projection", () => {
    const world = worldFor(0); expect(directionTo(...world.units)).toBe(1); cast(world, "R", 200, -1); advance(world, 25); expect(world.units[1].x).toBe(900);
    const mirror = createWorld({ fighters: [dummy(), subject()], distance: 0, modes: ["idle", "idle"], settings: { reactionTime: 10, maxBranches: 1 } }); mirror.units[0].x = 0; mirror.units[1].x = 0;
    startCast(mirror, mirror.units[1], ability(mirror, "R", 1), { direction: -1, distance: 200 }); advance(mirror, 25); expect(mirror.units[0].x).toBe(-900);
  });
});

describe("Gragas mechanics lifecycle and behavior", () => {
  it("preserves released R on actual lethal death and does not complete an interrupted W", () => {
    const world = worldFor(500); cast(world, "R", 600); advance(world, 9); dealDamage(world, world.units[1], world.units[0], 100000, "true"); advance(world, 25); expect(world.units[0].alive).toBe(false); expect(world.units[1].hp).toBe(99600);
    const drinking = worldFor(); cast(drinking, "W"); dealDamage(drinking, drinking.units[1], drinking.units[0], 100000, "true"); advance(drinking, 30); expect(drinking.units[0].statuses.some(status => status.kind === "empower")).toBe(false);
  });
  it("autoexplodes an already landed barrel after actual owner death", () => { const world = worldFor(), zone = barrel(world); dealDamage(world, world.units[1], world.units[0], 100000, "true"); advance(world, Number(zone.memory!.landed) + 121); expect(world.units[0].alive).toBe(false); expect(world.units[1].hp).toBe(99640); });
  it("cleans drink/dash on real resurrection while preserving already released casks", () => {
    const drinking = worldFor(); drink(drinking); beginResurrection(drinking, drinking.units[0], { duration: 2 }); advance(drinking, drinking.tick + 1); expect(drinking.units[0].statuses.some(status => status.kind === "empower")).toBe(false);
    const slamming = worldFor(600); cast(slamming, "E"); advance(slamming, 2); beginResurrection(slamming, slamming.units[0], { duration: 2 }); advance(slamming, 30); expect(slamming.units[1].hp).toBe(100000); expect(slamming.units[0].action).toBeUndefined();
    const flying = worldFor(500); cast(flying, "R", 600); advance(flying, 9); beginResurrection(flying, flying.units[0], { duration: 2 }); advance(flying, 25); expect(flying.units[1].hp).toBe(99600);
  });
  it("cancels an uncompleted cast during resurrection without a cast heal", () => { const world = worldFor(); world.units[0].hp -= 1000; cast(world, "R", 300); beginResurrection(world, world.units[0], { duration: 2 }); const healing = world.units[0].totals.healing; advance(world, 25); expect(world.missiles).toHaveLength(0); expect(world.units[1].hp).toBe(100000); expect(world.units[0].totals.healing).toBe(healing); });
  it("reserves ready R in hold/trade and gives completed retreat priority over a ready barrel", () => {
    for (const mode of ["hold", "trade"] as const) {
      const world = worldFor(300); world.modes[0] = mode; for (let count = 0; count < 90 && !world.result; count++) step(world, [world.units[0].spec.behavior!, idle]); expect(world.units[0].cooldownReady.R ?? 0).toBe(0);
    }
    const done = worldFor(), zone = barrel(done); advance(done, Number(zone.memory!.landed) + 60); done.modes[0] = "trade"; done.units[0].memory.tradeDone = true; expect(done.units[0].spec.behavior!(perceive(done, 0))).toEqual({ kind: "move", direction: -1 });
  });
  it("flees with an explicitly reversed finite dash", () => { const world = worldFor(300); world.modes[0] = "flee"; const command = world.units[0].spec.behavior!(perceive(world, 0)); expect(command).toEqual({ kind: "cast", ability: "E", aim: { direction: -1, distance: 600 } }); cast(world, "E", 600, -1); advance(world, 25); expect(world.units[0].x).toBe(-600); });
});
