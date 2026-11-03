import { describe, expect, it } from "vitest";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { attackTiming, canCast, startAttack, startCast } from "../../engine/sim/actions";
import { perceive, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyCC, applyEffect, beginResurrection, canSee, dealDamage } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, damagePet, petEffects, petHit, spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Leblanc from "../../kits/champions/Leblanc";
import Malzahar from "../../kits/champions/Malzahar";
import Rammus from "../../kits/champions/Rammus";
import { fighter } from "../sim/kits";
import { championData, pets, records } from "./helpers";

const idle: Behavior = () => undefined;
const compile = (data = records("Leblanc"), petData = pets("Leblanc")) => compileKit(championData("Leblanc"), data, Leblanc, {}, petData);
const compiled = compile();
const otherKit = (id: "Malzahar" | "Rammus") => compileKit(championData(id), records(id), id === "Malzahar" ? Malzahar : Rammus, {}, pets(id)).spec;
const dummy = () => fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } });
function worldFor(ap = 0, enemy = dummy(), distance = 500): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0, armor: 0, mr: 0 }, bonus: { ap } }, enemy], distance, modes: ["idle", "idle"], settings: { maxSeconds: 30, maxBranches: 1, log: true } });
  world.units[0].x = 0; world.units[1].x = distance;
  return world;
}
const spell = (world: World, key: string, side: 0 | 1 = 0): AbilitySpec => world.units[side].spec.abilities.find((value) => value.key === key)!;
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [idle, idle]); };
const hit = (world: World, key: string) => { const ability = spell(world, key); abilityHit(world, world.units[0], world.units[1], ability, ability.onHit ?? []); };
const cast = (world: World, key: string, distance?: number, side: 0 | 1 = 0) => startCast(world, world.units[side], spell(world, key, side), distance === undefined ? undefined : { direction: 1, distance });
const state = (world: World, side: 0 | 1, key: StateType, duration = 10) => applyEffect(world, world.units[side], world.units[side], { type: "state", state: key, duration }, { scale: 1 });
const marks = (world: World) => world.units[1].statuses.filter((status) => status.key === "leblanc-sigil" || status.key === "leblanc-mimic-sigil");
const minion = (overrides: Partial<PetSpec> = {}): PetSpec => ({ kind: "test-minion", name: "Test minion", targetClass: "minion", hp: 1000, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 100, ...overrides });
const mirror = (world: World) => world.pets.find((pet) => pet.spec.kind === "leblanc-mirror-image")!;
function trigger(world: World): void {
  world.units[0].hp = derive(world.units[0]).maxHp * .4;
  dealDamage(world, world.units[1], world.units[0], 1, "true");
}
function endDash(world: World): number {
  for (let count = 0; count < 50 && world.units[0].action?.kind === "dash"; count++) step(world, [idle, idle]);
  expect(world.units[0].action).toBeUndefined();
  return Number(world.units[0].memory["lbPad:W:end"]) - 120;
}

describe("LeBlanc pinned source and finite spell metadata", () => {
  it("reads all primary revisions, the separately pinned pet article and attributed binary evidence", () => {
    expect(new Set(compiled.evidence.filter((entry) => entry.revid > 0).map((entry) => entry.revid))).toEqual(new Set([3954748, 4035723, 4091667, 4057469, 4057468, 4053330]));
    const binary = compiled.evidence.filter((entry) => entry.url);
    expect(binary.length).toBeGreaterThan(8);
    for (const entry of binary) {
      expect(entry.url).toBe("https://raw.communitydragon.org/16.21/game/data/characters/leblanc/leblanc.bin.json");
      expect(entry.sourceVersion).toBe("16.21.8342754+branch.releases-16-21.content.release");
      expect(entry.sourceSha256).toBe("c701b73e304bf408747f7feee6f019b1ba5817498cc9700e36791aade2fca44a");
    }
    expect(compiled.assumptions.join(" ")).toContain("spends zero ammo");
    expect(compiled.assumptions.join(" ")).toContain("220 castRadius");
    expect(compiled.assumptions.join(" ")).toContain("estimated 1125 leash");
  });
  it("uses primary instant W, finite R variants, one shared ultimate cooldown and no invented charges", () => {
    const world = worldFor();
    expect(spell(world, "W")).toMatchObject({ castTime: 0, cooldown: 10, cost: 100, cooldownAtCastStart: true });
    expect(spell(world, "R")).toMatchObject({ castTime: .25, cooldown: 25, cost: 0 });
    expect(spell(world, "RW")).toMatchObject({ castTime: 0, cooldown: 25, cooldownKey: "R", budgetExcluded: true });
    expect(spell(world, "RE")).toMatchObject({ castTime: .25, cooldown: 25, cooldownKey: "R", budgetExcluded: true });
    for (const ability of compiled.spec.abilities) { expect(Number.isFinite(ability.cooldown)).toBe(true); expect(Number.isFinite(ability.castTime)).toBe(true); expect(ability.charges).toBeUndefined(); }
    expect(canCast(world, world.units[0], spell(world, "R"))).toBe(true);
    expect(canCast(world, world.units[0], spell(world, "RE"))).toBe(false);
  });
  it("fails compilation when a required numeric field, passive rule or game attribution disappears", () => {
    const noRange = records("Leblanc"); delete noRange.find((value) => value.kind === "E")!.fields.tetherRadius;
    expect(() => compile(noRange)).toThrow(/tetherRadius/);
    const noPetRule = pets("Leblanc"); noPetRule[0]!.text.abilities = "";
    expect(() => compile(records("Leblanc"), noPetRule)).toThrow(/below 40%/);
    const noGame = records("Leblanc"); noGame.find((value) => value.kind === "R")!.gameSources![0]!.sha256 = "";
    expect(() => compile(noGame)).toThrow(/attribution/);
  });
});

describe("Contact-owned Sigil of Malice and Mimic marks", () => {
  it("Q and RQ detonate one another and leave only the new spell's independent mark", () => {
    const world = worldFor(100); hit(world, "Q");
    expect(world.units[1].totals.damageTaken).toBe(205); expect(marks(world).map((mark) => mark.value)).toEqual([205]);
    hit(world, "R"); expect(world.units[1].totals.damageTaken).toBe(680); expect(marks(world).map((mark) => [mark.key, mark.value])).toEqual([["leblanc-mimic-sigil", 540]]);
    hit(world, "Q"); expect(world.units[1].totals.damageTaken).toBe(1425); expect(marks(world).map((mark) => mark.key)).toEqual(["leblanc-sigil"]);
  });
  it("snapshots mark damage, while a later ordinary spell reads current AP", () => {
    const world = worldFor(100); hit(world, "Q"); world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 200 } }; hit(world, "E");
    expect(world.units[1].totals.damageTaken).toBe(620); expect(marks(world)).toHaveLength(0);
  });
  it.each(["spellShield", "parry", "untargetable", "stasis"] as const)("%s stops contact without consuming an existing mark or adding a new one", (guard) => {
    const world = worldFor(); hit(world, "Q"); state(world, 1, guard); hit(world, "R");
    expect(world.units[1].totals.damageTaken).toBe(165); expect(marks(world).map((mark) => mark.key)).toEqual(["leblanc-sigil"]);
  });
  it("cast declaration and a wall-destroyed projectile preserve marks", () => {
    const world = worldFor(); hit(world, "Q"); cast(world, "E"); expect(marks(world)).toHaveLength(1);
    world.zones.push({ id: 9999, owner: 1, kind: "projectileWall", seenTick: 0, x: 250, radius: 0, startTick: 0, endTick: 100 });
    through(world, 35); expect(world.units[1].totals.damageTaken).toBe(165); expect(marks(world)).toHaveLength(1);
  });
  it("expires marks at exactly 3.5 seconds and never detonates them with an ordinary attack", () => {
    const world = worldFor(); hit(world, "Q"); world.units[1].x = 300; startAttack(world, world.units[0]); through(world, 30);
    expect(marks(world)).toHaveLength(1); through(world, 105); expect(marks(world)).toHaveLength(0);
    const before = world.units[1].totals.damageTaken; hit(world, "W"); expect(world.units[1].totals.damageTaken - before).toBe(235);
  });
  it.each(["untargetable", "invisible"] as const)("Q cancels without mana, cooldown or Mimic memory change if the target becomes %s during cast", (guard) => {
    const world = worldFor(); world.units[0].memory.lbLast = "E"; const mana = world.units[0].resource;
    cast(world, "Q"); state(world, 1, guard); through(world, 8);
    expect(world.units[0].resource).toBe(mana); expect(world.units[0].cooldownReady.Q ?? 0).toBe(0); expect(world.units[0].memory.lbLast).toBe("E"); expect(world.missiles).toHaveLength(0);
  });
  it("Q cancels free on cast-end range loss", () => {
    const world = worldFor(); const mana = world.units[0].resource; cast(world, "Q"); world.units[1].x = 900; through(world, 8);
    expect(world.units[0].resource).toBe(mana); expect(world.units[0].cooldownReady.Q ?? 0).toBe(0);
  });
  it("Q minion bonus caps at 146, refunds on the actual minion death, and never applies to champion-class clones", () => {
    const world = worldFor(); const pet = spawnPet(world, world.units[1], minion({ hp: 300 }), 250); world.units[0].resource = 100; world.units[0].cooldownReady.Q = 180;
    abilityHitPet(world, world.units[0], pet, spell(world, "Q"), spell(world, "Q").onHit!);
    expect(world.pets).not.toContain(pet); expect(world.units[0].resource).toBe(150); expect(world.units[0].cooldownReady.Q).toBe(126);
    const image = spawnPet(world, world.units[1], minion({ targetClass: "champion", unitClass: "clone" }), 250);
    abilityHitPet(world, world.units[0], image, spell(world, "Q"), spell(world, "Q").onHit!);
    expect(image.hp).toBe(835); expect(image.statuses?.find((mark) => mark.key === "leblanc-sigil")?.value).toBe(165);
  });
  it("pet marks, tethers and root belong to the contacted pet without touching its owner", () => {
    const world = worldFor(); const pet = spawnPet(world, world.units[1], minion(), 250);
    for (const key of ["Q", "E"]) abilityHitPet(world, world.units[0], pet, spell(world, key), spell(world, key).onHit!);
    expect(pet.hp).toBe(394); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[1].statuses).toHaveLength(0);
    through(world, 45); expect(pet.hp).toBe(154); expect(pet.statuses?.some((status) => status.key === "root")).toBe(true);
  });
  it("a Q mark consumption killing a minion refunds Q even when E owns the triggering hit", () => {
    const world = worldFor(); const pet = spawnPet(world, world.units[1], minion({ hp: 500 }), 250);
    abilityHitPet(world, world.units[0], pet, spell(world, "Q"), spell(world, "Q").onHit!); world.units[0].resource = 100; world.units[0].cooldownReady.Q = 180;
    abilityHitPet(world, world.units[0], pet, spell(world, "E"), spell(world, "E").onHit!);
    expect(world.pets).not.toContain(pet); expect(world.units[0].resource).toBe(150); expect(world.units[0].cooldownReady.Q).toBe(126);
  });
});

describe("Independent Distortion origins, return clocks and Mimic memory", () => {
  it("damages only on arrival and starts the four-second pad and .2-second gate on dash end", () => {
    const world = worldFor(); cast(world, "W", 600); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].cooldownReady.W).toBe(300);
    const ended = endDash(world); expect(world.units[0].x).toBeCloseTo(600); expect(world.units[1].totals.damageTaken).toBe(235);
    expect(world.units[0].memory["lbPad:W:end"]).toBe(ended + 120); expect(world.units[0].memory["lbPad:W:ready"]).toBe(ended + 6);
    expect(canCast(world, world.units[0], spell(world, "W2"))).toBe(false); through(world, ended + 5); expect(canCast(world, world.units[0], spell(world, "W2"))).toBe(true);
  });
  it("does not deal crossing damage when its endpoint misses", () => {
    const world = worldFor(0, dummy(), 150); cast(world, "W", 600); endDash(world); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("returns instantly without damage, mana or cast notification, retaining the other origin", () => {
    let casts = 0; const world = worldFor(0, { ...dummy(), hooks: { onEnemyCast() { casts++; } } });
    cast(world, "W", 600); endDash(world); const firstEnd = world.units[0].memory["lbPad:W:end"];
    cast(world, "RW", 300); while (world.units[0].action?.kind === "dash") step(world, [idle, idle]);
    const rwOrigin = world.units[0].memory["lbPad:RW:x"]; expect(Number(rwOrigin)).toBeCloseTo(600); expect(world.units[0].memory["lbPad:W:x"]).toBe(0); expect(world.units[0].memory["lbPad:W:end"]).toBe(firstEnd);
    through(world, Number(world.units[0].memory["lbPad:RW:ready"])); const mana = world.units[0].resource, dealt = world.units[1].totals.damageTaken;
    cast(world, "W2"); expect(world.units[0].x).toBe(0); expect(world.units[0].memory.lbLast).toBe("W"); expect(world.units[0].resource).toBe(mana); expect(casts).toBe(2);
    expect(world.units[0].memory["lbPad:RW:x"]).toBe(rwOrigin); cast(world, "RW2"); expect(world.units[0].x).toBeCloseTo(600); expect(world.units[1].totals.damageTaken).toBe(dealt); expect(casts).toBe(2);
  });
  it("return is range-independent but obeys root/grounding and exact pad expiry", () => {
    const world = worldFor(); cast(world, "W", 200); const ended = endDash(world); through(world, ended + 6); world.units[0].x = 10000;
    expect(canCast(world, world.units[0], spell(world, "W2"))).toBe(true); applyCC(world, world.units[1], world.units[0], "root", .2);
    expect(canCast(world, world.units[0], spell(world, "W2"))).toBe(false); through(world, ended + 120); expect(canCast(world, world.units[0], spell(world, "W2"))).toBe(false);
  });
  it("a knockdown stops damage and retains its original return origin", () => {
    const world = worldFor(); cast(world, "W", 600); through(world, 2); applyCC(world, world.units[1], world.units[0], "airborne", .2);
    expect(world.units[0].action).toBeUndefined(); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].memory["lbPad:W:x"]).toBe(0);
  });
  it("all R variants share one cooldown and do not receive hidden recharge casts", () => {
    const world = worldFor(); cast(world, "R"); through(world, 8); expect(world.units[0].cooldownReady.R).toBe(758);
    world.units[0].memory.lbLast = "E"; expect(canCast(world, world.units[0], spell(world, "RE"))).toBe(false);
    through(world, 160); expect(canCast(world, world.units[0], spell(world, "RE"))).toBe(false);
    through(world, 758); expect(canCast(world, world.units[0], spell(world, "RE"))).toBe(true);
  });
  it("forks origins, tether watchdogs, marks and Mimic memory independently", () => {
    const world = worldFor(); hit(world, "Q"); hit(world, "E"); cast(world, "W", 200); endDash(world);
    const copy = cloneWorld(world); copy.units[0].memory["lbPad:W:x"] = 999; copy.units[0].memory.lbLast = "E"; copy.units[1].x = 2000;
    through(copy, 45); through(world, 45); expect(world.units[0].memory["lbPad:W:x"]).toBe(0); expect(world.units[0].memory.lbLast).toBe("W");
    expect(world.units[1].statuses.some((status) => status.key === "root")).toBe(true); expect(copy.units[1].statuses.some((status) => status.key === "root")).toBe(false);
  });
});

describe("Ethereal Chains projectile, tether, root and death aftermath", () => {
  it("launches from cast-end caster position, collides with the first target and reveals from actual impact", () => {
    const world = worldFor(); cast(world, "E"); world.units[0].x = 100; through(world, 8);
    expect(world.missiles).toHaveLength(1); expect(world.missiles[0]!.x).toBe(100); expect(hasState(world.units[1], "revealed")).toBe(false);
    through(world, 20); expect(world.units[1].totals.damageTaken).toBe(130); expect(hasState(world.units[1], "revealed")).toBe(true);
    const tether = world.units[1].statuses.find((status) => status.key === "lbTether:E")!;
    expect(tether.startTick).toBeGreaterThan(8); through(world, tether.startTick + 45); expect(world.units[1].totals.damageTaken).toBe(370); expect(world.units[1].statuses.some((status) => status.key === "root")).toBe(true);
  });
  it("E and RE have independent completion clocks and root durations", () => {
    const world = worldFor(100); hit(world, "E"); through(world, 15); hit(world, "RE");
    through(world, 45); expect(world.units[1].totals.damageTaken).toBe(765); expect(world.units[1].statuses.some((status) => status.key === "lbTether:RE")).toBe(true);
    through(world, 61); expect(world.units[1].totals.damageTaken).toBe(1310); expect(world.units[1].statuses.filter((status) => status.key === "root").map((status) => status.ability)).toEqual(["E2", "RE2"]);
  });
  it("each tick checks edge distance after the minimum quarter-second and a broken tether cannot reconnect", () => {
    const world = worldFor(); hit(world, "E"); world.units[1].x = 2000; through(world, 7); expect(hasState(world.units[1], "revealed")).toBe(true);
    through(world, 8); expect(hasState(world.units[1], "revealed")).toBe(false); world.units[1].x = 500; through(world, 45); expect(world.units[1].totals.damageTaken).toBe(130);
  });
  it("uses both gameplay radii at the exact leash boundary", () => {
    const world = worldFor(); hit(world, "E"); world.units[1].x = 865 + world.units[0].spec.base.radius + world.units[1].spec.base.radius;
    through(world, 45); expect(world.units[1].totals.damageTaken).toBe(370);
  });
  it("new spell shield cannot stop fracture, while parry and stasis can", () => {
    for (const guard of ["spellShield", "parry", "stasis"] as const) {
      const world = worldFor(); hit(world, "E"); state(world, 1, guard); through(world, 45);
      expect(world.units[1].totals.damageTaken).toBe(guard === "spellShield" ? 370 : 130);
      expect(world.units[1].statuses.some((status) => status.key === "root")).toBe(guard === "spellShield");
      expect(hasState(world.units[1], "revealed")).toBe(guard === "spellShield");
    }
  });
  it("attached fracture persists through ordinary untargetability and reads live AP", () => {
    const world = worldFor(); hit(world, "E"); state(world, 1, "untargetable"); world.units[0].spec = { ...world.units[0].spec, bonus: { ap: 100 } }; through(world, 45);
    expect(world.units[1].totals.damageTaken).toBe(455); expect(world.units[1].statuses.some((status) => status.key === "root")).toBe(true);
  });
  it("tenacity shortens fracture root and its true sight ends with actual root", () => {
    const world = worldFor(); applyEffect(world, world.units[1], world.units[1], { type: "state", state: "tenacity", value: .5, duration: 10 }, { scale: 1 }); hit(world, "E"); through(world, 45);
    const root = world.units[1].statuses.find((status) => status.key === "root")!; expect(root.endTick - root.startTick).toBe(23);
    state(world, 1, "invisible"); expect(canSee(world.units[1], world.units[0])).toBe(true); through(world, root.endTick); expect(canSee(world.units[1], world.units[0])).toBe(false);
  });
  it("a living target's tether completes after caster death and keeps the duel pending", () => {
    const world = worldFor(); hit(world, "E"); dealDamage(world, world.units[1], world.units[0], 100000, "true"); through(world, 44);
    expect(world.result).toBeUndefined(); through(world, 45); expect(world.units[1].totals.damageTaken).toBe(370); expect(world.result?.winner).toBe(1);
  });
  it("moving out after caster death breaks the pending tether on the next watchdog tick", () => {
    const world = worldFor(); hit(world, "E"); through(world, 10); dealDamage(world, world.units[1], world.units[0], 100000, "true"); world.units[1].x = 2000; through(world, 11);
    expect(world.result?.winner).toBe(1); expect(world.units[1].totals.damageTaken).toBe(130); expect(hasState(world.units[1], "revealed")).toBe(false);
  });
  it("target resurrection severs the old tether without fracture on its new life", () => {
    const world = worldFor(); hit(world, "E"); beginResurrection(world, world.units[1], { duration: .1, ability: "test" }); through(world, 45);
    expect(world.units[1].totals.damageTaken).toBe(130); expect(world.zones).toHaveLength(0);
  });
  it("production Malzahar voidlings intercept the actual chain projectile, receiving their own reveal and root", () => {
    const enemy = otherKit("Malzahar"); const world = worldFor(0, { ...enemy, base: { ...enemy.base, hp: 100000, hpRegen: 0 } }); cast(world, "W", undefined, 1); through(world, 16);
    const pet = world.pets.find((value) => value.spec.kind === "voidling")!; expect(pet).toBeDefined(); pet.x = 250; pet.spec = { ...pet.spec, moveSpeed: 0, hp: 1000 }; pet.hp = 1000;
    cast(world, "E"); through(world, 40); expect(world.units[1].totals.damageTaken).toBe(0); expect(pet.hp).toBeLessThan(1000); expect(pet.statuses?.some((status) => status.key === "revealed")).toBe(true);
    through(world, 90); expect(pet.statuses?.some((status) => status.key === "root")).toBe(true); expect(world.units[1].statuses.some((status) => status.key === "root")).toBe(false);
  });
});

describe("Mirror Image damage trigger, real clone stats and harmless basic attacks", () => {
  it("triggers strictly below 40%, snapshots current HP and copied stats, and applies one tagged stealth to each", () => {
    const world = worldFor(); const self = world.units[0], stats = derive(self); self.hp = stats.maxHp * .4 + 1;
    dealDamage(world, world.units[1], self, 1, "true"); expect(world.pets).toHaveLength(0); dealDamage(world, world.units[1], self, 1, "true");
    const image = mirror(world); expect(image.hp).toBe(self.hp); expect(image.spec).toMatchObject({ targetClass: "champion", unitClass: "clone", armor: stats.armor.base + stats.armor.bonus, mr: stats.mr.base + stats.mr.bonus, moveSpeed: stats.moveSpeed, radius: self.spec.base.radius, pathingRadius: self.spec.base.pathingRadius, duration: 8 });
    expect(petFormulaTarget(image, self).spec.unitClass).toBe("clone"); expect(petFormulaTarget(image, self).spec.base.pathingRadius).toBe(self.spec.base.pathingRadius);
    expect(self.statuses.filter((status) => status.key === "invisible")).toHaveLength(1); expect(image.statuses?.filter((status) => status.key === "invisible")).toHaveLength(1); expect(self.memory.lbPassiveReady).toBe(1800);
    expect(image.statuses?.some((status) => status.key.startsWith("lbTether"))).toBe(false);
  });
  it("clone HP formulas use the explicit current-health snapshot maximum, then track its actual missing HP", () => {
    const world = worldFor(); trigger(world); const image = mirror(world), snapshot = image.hp;
    expect(derive(petFormulaTarget(image, world.units[1])).maxHp).toBe(snapshot);
    damagePet(world, world.units[1], image, 10, "true", false);
    const target = petFormulaTarget(image, world.units[1]);
    expect(evaluate({ base: 0, ratios: { targetMaxHP: .1 } }, world.units[1], target)).toBeCloseTo(snapshot * .1);
    expect(evaluate({ base: 0, ratios: { targetCurrentHP: .1 } }, world.units[1], target)).toBeCloseTo((snapshot - 10) * .1);
    expect(evaluate({ base: 0, ratios: { targetMissingHP: 1 } }, world.units[1], target)).toBeCloseTo(10);
  });
  it("copies finite total resistances, attack speed and movement speed without applying soft caps twice", () => {
    const world = worldFor(); world.units[0].spec = { ...world.units[0].spec, bonus: { armor: 150, mr: 120, attackSpeed: .6 } };
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "moveSpeedFlat", amount: { base: 300 }, duration: 10 }, { scale: 1 });
    const stats = derive(world.units[0]); trigger(world); const image = mirror(world), actor = petFormulaTarget(image, world.units[1]);
    expect(image.spec.armor).toBe(stats.armor.base + stats.armor.bonus); expect(image.spec.mr).toBe(stats.mr.base + stats.mr.bonus);
    expect(derive(actor).moveSpeed).toBe(stats.moveSpeed); expect(image.spec.attack!.interval).toBeCloseTo(1 / stats.attackSpeed);
    for (const value of [image.hp, image.spec.hp, image.spec.armor, image.spec.mr, image.spec.moveSpeed, image.spec.attack!.interval]) expect(Number.isFinite(value)).toBe(true);
    world.units[0].spec = { ...world.units[0].spec, bonus: {} }; expect(image.spec.armor).toBe(150);
  });
  it("starting low, full shield absorption and lethal damage do not summon a clone", () => {
    const low = worldFor(); low.units[0].hp = 100; through(low, 10); expect(low.pets).toHaveLength(0);
    applyEffect(low, low.units[0], low.units[0], { type: "shield", amount: { base: 200 }, duration: 10 }, { scale: 1 }); dealDamage(low, low.units[1], low.units[0], 100, "true"); expect(low.pets).toHaveLength(0);
    const lethal = worldFor(); lethal.units[0].hp = 1; dealDamage(lethal, lethal.units[1], lethal.units[0], 2, "true"); expect(lethal.pets).toHaveLength(0);
  });
  it("stays on a static sixty-second passive cooldown after further low-health damage", () => {
    const world = worldFor(); trigger(world); const image = mirror(world); dealDamage(world, world.units[1], world.units[0], 1, "true"); expect(world.pets).toEqual([image]);
    world.tick = 1800; trigger(world); expect(world.pets).toHaveLength(2); expect(world.units[0].memory.lbPassiveReady).toBe(3600);
  });
  it("flee direction follows the damage source, stops at the estimated leash and never chases an out-of-range enemy", () => {
    const world = worldFor(); trigger(world); const image = mirror(world); through(world, 120);
    expect(image.x).toBe(-1125); expect(image.memory.fled).toBe(true); expect(image.windup).toBeUndefined(); through(world, 200); expect(image.x).toBe(-1125);
    expect(world.units[1].totals.damageTaken).toBe(0); world.units[0].x = -3000; through(world, 201); expect(image.x).toBeLessThan(-1125);
  });
  it("CC disables clone movement independently, then its own speed and copied pathing remain finite", () => {
    const world = worldFor(); trigger(world); const image = mirror(world); petEffects(world, world.units[1], image, [{ type: "cc", cc: "root", duration: .5 }]); through(world, 14); expect(image.x).toBe(0);
    through(world, 15); expect(image.x).toBeLessThan(0); expect(Number.isFinite(image.x)).toBe(true);
  });
  it("owner spell use breaks only owner stealth, and owner basic attack breaks at windup end", () => {
    const world = worldFor(); trigger(world); cast(world, "W", 0); expect(hasState(world.units[0], "invisible")).toBe(false); expect(mirror(world).statuses?.some((status) => status.key === "invisible")).toBe(true);
    const attackWorld = worldFor(); trigger(attackWorld); startAttack(attackWorld, attackWorld.units[0]); const launch = attackTiming(attackWorld.units[0]).windup;
    through(attackWorld, launch - 1); expect(hasState(attackWorld.units[0], "invisible")).toBe(true); through(attackWorld, launch); expect(hasState(attackWorld.units[0], "invisible")).toBe(false);
  });
  it("cosmetic clone attacks use real timing and break stealth without hit, on-hit, missile or Rammus reflection", () => {
    const rammus = otherKit("Rammus"), world = worldFor(0, { ...rammus, base: { ...rammus.base, hp: 100000, hpRegen: 0 } }); cast(world, "W", undefined, 1); trigger(world);
    const image = mirror(world); image.memory.fled = true; image.x = 100; const hp = image.hp, selfHp = world.units[0].hp, enemyHp = world.units[1].hp;
    advancePets(world); expect(image.windup?.launchTick).toBe(attackTiming(world.units[0]).windup); expect(image.statuses?.some((status) => status.key === "invisible")).toBe(true);
    world.tick = image.windup!.launchTick; advancePets(world); expect(image.statuses?.some((status) => status.key === "invisible")).toBe(false);
    expect(image.hp).toBe(hp); expect(world.units[0].hp).toBe(selfHp); expect(world.units[1].hp).toBe(enemyHp); expect(world.petMissiles ?? []).toHaveLength(0); expect(world.missiles).toHaveLength(0);
    expect(world.log.some((entry) => entry.text.includes("hits") || entry.text.includes("reflect"))).toBe(false);
    // Confirm this is an active reflection target: a real pet basic attack retaliates onto that pet.
    const control = spawnPet(world, world.units[0], minion({ hp: 1000 }), 100);
    petHit(world, control, world.units[1], [{ type: "damage", damageType: "physical", amount: { base: 10 } }], true);
    expect(control.hp).toBeLessThan(1000); expect(image.hp).toBe(hp); expect(world.units[0].hp).toBe(selfHp);
  });
  it("a real enemy can attack and destroy the clone without moving damage onto its owner", () => {
    const world = worldFor(); trigger(world); const image = mirror(world), hp = world.units[0].hp; through(world, 30);
    damagePet(world, world.units[1], image, 100000, "true", true); expect(world.pets).not.toContain(image); expect(world.units[0].hp).toBe(hp);
  });
  it("clone lifetime expires on its own eighth second and pet memory forks independently", () => {
    const world = worldFor(); trigger(world); const copy = cloneWorld(world); mirror(copy).memory.destination = 777; mirror(copy).hp = 1;
    expect(mirror(world).memory.destination).toBe(-1900); expect(mirror(world).hp).toBeGreaterThan(1); through(world, 239); expect(mirror(world)).toBeDefined(); through(world, 240); expect(mirror(world)).toBeUndefined();
  });
});

describe("LeBlanc production policy and budget", () => {
  it("reference damage prices marks and fracture once, and responds to AP", () => {
    const world = worldFor(100), [self, enemy] = world.units;
    expect(self.spec.budget!.damage!(self, enemy).magic).toBeCloseTo(205 / 6 + 325 / 11 + 540 / 25);
    expect(damagePerSecond({ ...compiled.spec, bonus: { ap: 100 } }, dummy()).magic).toBeGreaterThan(damagePerSecond(compiled.spec, dummy()).magic);
  });
  it.each(["hold", "trade"] as const)("%s policy reserves every offensive Mimic variant", (mode) => {
    const world = worldFor(); world.modes[0] = mode;
    for (const key of ["Q", "W", "E"]) world.units[0].cooldownReady[key] = 10000;
    for (const memory of ["Q", "W", "E"]) {
      world.units[0].memory.lbLast = memory;
      const command = compiled.spec.behavior!(perceive(world, 0));
      expect(command?.kind === "cast" && ["R", "RW", "RE"].includes(command.ability)).toBe(false);
    }
  });
  it.each(["fight", "kite", "hold", "trade", "flee"] as const)("%s policy remains finite and uses appropriate spells or spatial movement", (mode) => {
    const world = worldFor(); world.modes[0] = mode;
    const command = compiled.spec.behavior!(perceive(world, 0)); expect(command).toBeDefined();
    runWorld(world, [compiled.spec.behavior!, idle]); expect(Number.isFinite(world.units[0].hp)).toBe(true); expect(Number.isFinite(world.units[0].x)).toBe(true); expect(world.units[0].resource).toBeGreaterThanOrEqual(0); expect(world.pets.length).toBeLessThanOrEqual(1);
    if (mode !== "flee") expect(world.log.some((entry) => entry.text.includes("casts"))).toBe(true);
  });
});
