import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { KitContext } from "../../engine/kits/context";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { resolveAttackOnPet } from "../../engine/sim/attackPet";
import { perceive } from "../../engine/sim/behavior";
import { applyEffect, attackHit, dealDamage, directionTo } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { advancePets, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, PetSpec, StateType } from "../../engine/sim/spec";
import type { Pet, Unit, World } from "../../engine/sim/state";
import MonkeyKing from "../../kits/champions/MonkeyKing";
import { standStill } from "../sim/helpers";
import { fighter } from "../sim/kits";
import { championData, kit, pets, records } from "./helpers";

const compiled = compileKit(championData("MonkeyKing"), records("MonkeyKing"), MonkeyKing, {}, pets("MonkeyKing"));
const ability = (key: string) => compiled.spec.abilities.find((spec) => spec.key === key)!;
function worldFor(x = 150): World {
  const world = createWorld({ fighters: [{ ...compiled.spec, base: { ...compiled.spec.base, hpRegen: 0, resourceRegen: 0 }, bonus: { ad: 100 } }, fighter({ base: { hp: 20000, armor: 0, mr: 0, hpRegen: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  world.units[0].x = 0; world.units[1].x = x; return world;
}
const cast = (world: World, key: string, aim?: { direction: 1 | -1; distance?: number }) => startCast(world, world.units[0], ability(key), aim);
function through(world: World, tick: number): void { while (world.tick <= tick && !world.result) step(world, [standStill, standStill]); }
const clones = (world: World) => world.pets.filter((body) => body.owner === 0 && body.spec.kind === "wukong:decoy");
function decoy(world: World): Pet { cast(world, "W", { direction: -1, distance: 100 }); through(world, world.tick + 4); return clones(world)[0]!; }
function state(world: World, target: Unit, key: StateType, duration = 5): void { applyEffect(world, target, target, { type: "state", state: key, duration }, { scale: 1 }); }
const summon = (world: World, x: number, extra: Partial<PetSpec> = {}) => spawnPet(world, world.units[1], { kind: "fixture", name: "Actual body", hp: 10000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, ...extra }, x);

describe("Wukong production search and strict reflection", () => {
  it("runs ordinary 15000 gold across all six scenarios with exact reversed builds", () => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const opponent = kit("Darius").spec, forward = simulateMatchup(compiled.spec, opponent, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(opponent, compiled.spec, 15000, prices);
    expect(forward.scenarios).toHaveLength(6); expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-10);
    for (const [index, scenario] of forward.scenarios.entries()) {
      const reflected = reverse.scenarios[[1, 0, 2, 3, 4, 5][index]!]!;
      if (scenario.score === undefined) expect(reflected.score).toBeUndefined(); else expect(Math.abs(scenario.score + reflected.score!)).toBeLessThan(1e-10);
      expect(scenario.outcomes.every((o) => Number.isFinite(o.seconds) && o.hp.every(Number.isFinite))).toBe(true);
    }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((row) => row.side === 0 && row.text.startsWith("casts ")).map((row) => row.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts.some((text) => text.includes(ability(key).name))).toBe(true);
  }, 60000);
});

describe("Wukong exact evidence contract", () => {
  it("retains all raw revisions and whole pinned binary arrays", () => {
    expect(new Set(compiled.evidence.filter((row) => row.revid).map((row) => row.revid))).toEqual(new Set([...records("MonkeyKing").map((row) => row.page.revid), 4021883, 4072133]));
    expect(records("MonkeyKing").every((row) => row.sources?.some((source) => source.page.revid === row.page.revid && source.text.join("\n").includes("|champion")))).toBe(true);
    expect(pets("MonkeyKing")[0]!.text.pinnedRawRevision).toContain("{{#var:cd_1}};{{#var:cd_1}} to {{#var:cd_5}} for 4");
    expect(pets("MonkeyKing")[0]!.text.protection).toContain("rows don't match");
    const game = compiled.evidence.filter((row) => row.url); expect(game.length).toBeGreaterThanOrEqual(12);
    expect(game.every((row) => row.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && row.sourceSha256 === "92f2a91971d5683b87145991a9a1db7b4acadae7ccc3676f8a15dfa00aaacb7a")).toBe(true);
    expect(ability("Q").cooldown).toBe(6); expect(ability("W").castTime).toBe(0); expect(ability("E").cooldown).toBe(7); expect(ability("R").cooldown).toBe(90);
    const ctx = new KitContext(championData("MonkeyKing"), records("MonkeyKing"), pets("MonkeyKing")); expect(ctx.ability("W").fraction("Clone Outgoing Damage")).toBe(.6); expect(ctx.ability("R").formula("Physical Damage Per Tick")).toEqual({ base: 0, ratios: { targetMaxHP: .02, AD: .34375 } });
  });
  it("fails closed when pinned game or raw pet evidence disappears", () => {
    const broken = structuredClone(records("MonkeyKing")); delete broken.find((row) => row.kind === "E")!.gameSources;
    expect(() => compileKit(championData("MonkeyKing"), broken, MonkeyKing, {}, pets("MonkeyKing"))).toThrow("pinned game data");
    const missing = structuredClone(pets("MonkeyKing")); delete missing[0]!.text.pinnedRawRevision;
    expect(() => compileKit(championData("MonkeyKing"), records("MonkeyKing"), MonkeyKing, {}, missing)).toThrow("wiki no longer says");
  });
});

describe("Stone Skin starts empty and decays", () => {
  it("grants baseline armor and stacks only after actual champion contacts", () => {
    const world = worldFor(), self = world.units[0], baseline = derive(self).armor.bonus;
    expect(self.memory.stone).toBe(0); attackHit(world, self, world.units[1], false, []); expect(self.memory.stone).toBe(1);
    through(world, 1); expect(derive(self).armor.bonus).toBeCloseTo(2 * baseline);
    for (let n = 0; n < 9; n++) attackHit(world, self, world.units[1], false, []); expect(self.memory.stone).toBe(5);
    through(world, 152); expect(self.memory.stone).toBe(4); through(world, 272); expect(self.memory.stone).toBe(0);
  });
  it("blocked on-hit grants a stack while blind, dodge and invulnerability do not", () => {
    const world = worldFor(), self = world.units[0], enemy = world.units[1];
    attackHit(world, self, enemy, true, []); state(world, enemy, "dodgeAttacks"); attackHit(world, self, enemy, false, []); expect(self.memory.stone).toBe(0);
    enemy.statuses = []; state(world, enemy, "invulnerable"); attackHit(world, self, enemy, false, []); expect(self.memory.stone).toBe(0);
    enemy.statuses = []; state(world, enemy, "blockAttacks"); attackHit(world, self, enemy, false, []); expect(self.memory.stone).toBe(1);
  });
  it("distinguishes a minion from a champion-class actual clone", () => {
    const world = worldFor(), minion = summon(world, 100, { targetClass: "minion" }), clone = summon(world, 100, { targetClass: "champion", unitClass: "clone" });
    resolveAttackOnPet(world, world.units[0], minion, false, [], {}); expect(world.units[0].memory.stone).toBe(0);
    resolveAttackOnPet(world, world.units[0], clone, false, [], {}); expect(world.units[0].memory.stone).toBe(1);
  });
});

describe("Independent Decoy body and attacks", () => {
  it("snapshots actual current HP/resists, remains stationary and expires after four seconds", () => {
    const world = worldFor(1000), self = world.units[0]; self.hp = 700; const before = derive(self), body = decoy(world);
    expect(body.spec.targetClass).toBe("champion"); expect(body.spec.unitClass).toBe("clone"); expect(body.hp).toBe(700); expect(body.spec.hp).toBe(700); expect(body.spec.armor).toBe(before.armor.base + before.armor.bonus); expect(body.spec.pathingRadius).toBe(35);
    const view = petFormulaTarget(body, world.units[1], world.tick); expect(view.petId).toBe(body.id); expect(derive(view).maxHp).toBe(700); expect(body.x).toBe(0);
    through(world, 118); expect(clones(world)).toHaveLength(1); through(world, 120); expect(clones(world)).toHaveLength(0);
  });
  it("receives its own damage/CC and does not alter owner HP or statuses", () => {
    const world = worldFor(1000), body = decoy(world), hp = world.units[0].hp;
    petEffects(world, world.units[1], body, [{ type: "cc", cc: "stun", duration: 1 }, { type: "damage", damageType: "true", amount: { base: 100 } }]);
    expect(body.statuses!.some((s) => s.key === "stun")).toBe(true); expect(world.units[0].statuses.some((s) => s.key === "stun")).toBe(false); expect(world.units[0].hp).toBe(hp); expect(body.hp).toBe(body.spec.hp - 100);
  });
  it("uses reduced independently critical basic damage and no phantom owner attacks", () => {
    const world = worldFor(), self = world.units[0]; self.spec = { ...self.spec, bonus: { ...self.spec.bonus, critChance: 1 } };
    const ad = derive(self).ad, crit = derive(self).critDamage, body = decoy(world); through(world, 26);
    expect(world.units[1].totals.damageTaken).toBeCloseTo(ad * crit * .6); expect(body.x).toBe(0); expect(self.attackReadyTick).toBe(0); expect(self.memory.stone).toBe(1);
  });
  it.each(["blind", "disarm", "stun"] as const)("clone %s prevents its own basic and leaves owner attacks available", (cc) => {
    const world = worldFor(), body = decoy(world); delete body.memory.attack; petEffects(world, world.units[1], body, [{ type: "cc", cc, duration: 3 }]); through(world, 35);
    expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].statuses.some((s) => s.key === cc)).toBe(false);
  });
  it.each(["dodgeAttacks", "parry", "blockAttacks"] as const)("target %s independently prevents clone damage", (guard) => {
    const world = worldFor(); state(world, world.units[1], guard); decoy(world); through(world, 30); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("cloned on-hit packets hit the actual pet and retain its status identity", () => {
    const world = worldFor(2000), self = world.units[0], target = summon(world, 100);
    self.spec = { ...self.spec, attack: { ...self.spec.attack, onHit: [{ type: "damage", damageType: "magic", amount: { base: 100 } }, { type: "mark", key: "actual-clone-hit", duration: 3 }] } };
    decoy(world); through(world, 30); expect(10000 - target.hp).toBeCloseTo((derive(self).ad + 100) * .6); expect(target.statuses!.some((s) => s.key === "actual-clone-hit")).toBe(true); expect(world.units[1].statuses.some((s) => s.key === "actual-clone-hit")).toBe(false);
  });
  it("replaces a previous Decoy and removes the body on owner death", () => {
    const world = worldFor(1000), first = decoy(world); world.units[0].cooldownReady.W = 0; const next = decoy(world); expect(next.id).not.toBe(first.id); expect(clones(world)).toHaveLength(1);
    world.units[0].alive = false; world.units[0].hp = 0; step(world, [standStill, standStill]); expect(clones(world)).toHaveLength(0);
  });
  it("immediately rejects sourced stasis but retains its independent cripple", () => {
    const world = worldFor(), body = decoy(world); petEffects(world, world.units[1], body, [{ type: "state", state: "stasis", duration: 3 }, { type: "cc", cc: "cripple", strength: .5, duration: 3 }]);
    expect(body.statuses!.some((s) => s.key === "stasis")).toBe(false); expect(body.statuses!.some((s) => s.key === "cripple")).toBe(true); expect(world.units[0].statuses.some((s) => s.key === "cripple")).toBe(false);
  });
  it("retaliation damages the actual attacking clone without hurting its owner", () => {
    const world = worldFor(), body = decoy(world), hp = world.units[0].hp; state(world, world.units[1], "reflectAttacks"); world.units[1].statuses.find((s) => s.key === "reflectAttacks")!.value = 100; through(world, 26);
    expect(body.hp).toBeLessThan(body.spec.hp); expect(world.units[0].hp).toBe(hp);
  });
  it("the clone keeps an independent stat snapshot after owner AD changes", () => {
    const world = worldFor(), self = world.units[0], ad = derive(self).ad; decoy(world); self.spec = { ...self.spec, bonus: { ad: 1000 } }; through(world, 26); expect(world.units[1].totals.damageTaken).toBeCloseTo(ad * .6);
  });
});

describe("Crushing Blow independent empowerment", () => {
  it("starts cooldown after owner launch and reduces it only after actual damage", () => {
    const world = worldFor(), self = world.units[0]; cast(world, "Q"); expect(self.cooldownHeld.Q).toBe("Q"); startAttack(world, self);
    expect(self.action?.kind === "windup" && self.action.uncancellable).toBe(true); through(world, 20); expect(self.cooldownHeld.Q).toBeUndefined(); expect(world.units[1].totals.damageTaken).toBeCloseTo(derive(self).ad + 170); expect(world.units[1].statuses.some((s) => s.key === "armorReductionPercent" && s.value === .3)).toBe(true);
    expect(self.cooldownReady.Q).toBeLessThan(200);
  });
  it("gives clone a separate reset/Q and independently consumes spell shields", () => {
    const world = worldFor(), body = decoy(world); cast(world, "Q"); state(world, world.units[1], "spellShield"); startAttack(world, world.units[0]); through(world, 28);
    expect(body.memory.qUntil).toBe(-1); expect(world.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false); expect(world.units[1].totals.damageTaken).toBeGreaterThan(0); expect(world.units[1].statuses.some((s) => s.key === "armorReductionPercent")).toBe(true);
  });
  it("applies empowered Q to an actual pet only through basic pet opt-in", () => {
    const world = worldFor(2000), self = world.units[0], target = summon(world, 100); cast(world, "Q"); startAttack(world, self, target); through(world, 20);
    expect(10000 - target.hp).toBeCloseTo(derive(self).ad + 170); expect(target.statuses!.some((s) => s.key === "armorReductionPercent")).toBe(true); expect(world.units[1].hp).toBe(20000);
  });
  it("ends an unused owner's empowerment and starts Q cooldown after five seconds", () => {
    const world = worldFor(2000); cast(world, "Q"); through(world, 149); expect(world.units[0].cooldownHeld.Q).toBe("Q"); through(world, 150); expect(world.units[0].cooldownHeld.Q).toBeUndefined(); expect(world.units[0].cooldownReady.Q).toBe(330);
  });
});

describe("Nimbus finite dash and distinct additional targets", () => {
  it("deals one damage packet to the champion and up to two real additional bodies", () => {
    const world = worldFor(600), a = summon(world, 600), b = summon(world, 650), c = summon(world, 700); cast(world, "E"); expect(world.units[1].hp).toBe(20000); through(world, 20);
    expect(world.units[0].x).toBe(525); expect(world.units[1].totals.damageTaken).toBe(240); expect(10000 - a.hp).toBe(240); expect(10000 - b.hp).toBe(240); expect(c.hp).toBe(10000); expect(world.units[0].statuses.some((s) => s.key === "attackSpeed" && s.value === .6)).toBe(true);
  });
  it("ignores projectile walls and crosses actual terrain", () => {
    const world = worldFor(600); world.zones.push({ id: 999, owner: 1, kind: "projectileWall", x: 300, radius: 0, startTick: 0, endTick: 100, seenTick: 0 }); world.terrain.push({ id: 998, owner: 1, from: 250, to: 350, endTick: 100 }); cast(world, "E"); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(240);
  });
  it("knockdown interrupts dash without damage or AS", () => {
    const world = worldFor(600); cast(world, "E"); through(world, 2); applyEffect(world, world.units[1], world.units[0], { type: "knockdown" }, { scale: 1 }); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(0); expect(world.units[0].statuses.some((s) => s.key === "attackSpeed")).toBe(false);
  });
  it.each(["root", "ground"] as const)("%s prevents E and W", (cc) => {
    const world = worldFor(600); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc, duration: 2 }, { scale: 1 }); expect(canCast(world, world.units[0], ability("E"))).toBe(false); expect(canCast(world, world.units[0], ability("W"))).toBe(false);
  });
  it("Q overlays an active Nimbus dash without cancelling the dash", () => {
    const world = worldFor(600); cast(world, "E"); through(world, 2); cast(world, "Q"); expect(world.units[0].action?.kind).toBe("dash"); through(world, 20); expect(world.units[1].totals.damageTaken).toBe(240); expect(world.units[0].statuses.some((s) => s.kind === "empower")).toBe(true);
  });
  it("a shield on one extra body does not guard another E body or the owner", () => {
    const world = worldFor(600), a = summon(world, 600), b = summon(world, 650); petEffects(world, world.units[1], a, [{ type: "state", state: "spellShield", duration: 2 }]); cast(world, "E"); through(world, 20); expect(a.hp).toBe(10000); expect(b.hp).toBe(9760); expect(world.units[1].totals.damageTaken).toBe(240); expect(a.statuses!.some((s) => s.key === "spellShield")).toBe(false);
  });
});

describe("Cyclone copies, independent guards and finite recasts", () => {
  it("has eight ticks and one shared owner/clone knockup per cast", () => {
    const world = worldFor(), body = decoy(world); world.units[0].x = 0; delete body.memory.attack; cast(world, "R"); const start = world.tick; through(world, start + 60);
    const damage = .02 * 20000 + .34375 * derive(world.units[0]).ad; expect(world.units[1].totals.damageTaken).toBeCloseTo(8 * damage * 1.6); expect(world.log.filter((row) => row.text.includes("airborne")).length).toBe(1); expect(world.units[0].memory.spinning).toBe(false);
  });
  it("a shield stops one packet and locks knockup across both casts", () => {
    const world = worldFor(); state(world, world.units[1], "spellShield"); cast(world, "R"); const start = world.tick; through(world, start + 60); expect(world.units[1].statuses.some((s) => s.key === "cyclone:shieldImmunity")).toBe(true); through(world, start + 90); cast(world, "R2"); through(world, world.tick + 60); expect(world.log.filter((row) => row.text.includes("airborne")).length).toBe(0);
  });
  it.each(["parry", "stasis", "untargetable"] as const)("%s guards owner and copied Cyclone", (guard) => {
    const world = worldFor(), body = decoy(world); delete body.memory.attack; world.units[0].x = 0; state(world, world.units[1], guard); cast(world, "R"); through(world, world.tick + 60); expect(world.units[1].totals.damageTaken).toBe(0);
  });
  it("enforces stop delay, second-cast gate/window, and post-effect cooldown", () => {
    const world = worldFor(); cast(world, "R"); const start = world.tick; expect(canCast(world, world.units[0], ability("Rstop"))).toBe(false); through(world, start + 15); cast(world, "Rstop"); expect(world.units[0].memory.spinning).toBe(false); expect(canCast(world, world.units[0], ability("R2"))).toBe(false); through(world, start + 46); expect(canCast(world, world.units[0], ability("R2"))).toBe(true); cast(world, "R2"); through(world, world.tick + 60); expect(world.units[0].cooldownReady.R).toBe(world.tick - 1 + 2700); expect(canCast(world, world.units[0], ability("R2"))).toBe(false);
  });
  it("locks basic abilities for .3 seconds then lets Q end owner spin", () => {
    const world = worldFor(); cast(world, "R"); expect(canCast(world, world.units[0], ability("Q"))).toBe(false); through(world, 9); expect(canCast(world, world.units[0], ability("Q"))).toBe(true); cast(world, "Q"); expect(world.units[0].memory.spinning).toBe(false);
  });
  it("an existing clone keeps spinning when Q cancels only the owner", () => {
    const world = worldFor(), body = decoy(world); world.units[0].x = 0; delete body.memory.attack; cast(world, "R"); const start = world.tick; through(world, start + 9); cast(world, "Q"); const damage = world.units[1].totals.damageTaken; through(world, start + 60); expect(world.units[0].memory.spinning).toBe(false); expect(world.units[1].totals.damageTaken).toBeGreaterThan(damage); expect(body.memory.transferred).toBe(false);
  });
  it("W transfers only remaining spin and Q cancels a clone created during that spin", () => {
    const world = worldFor(); cast(world, "R"); through(world, 16); cast(world, "W", { direction: -1, distance: 100 }); const body = clones(world)[0]!;
    expect(body.memory.spinEnd).toBe(60); expect(body.memory.spinNext).toBe(3); expect(body.memory.transferred).toBe(true); expect(world.units[0].memory.spinning).toBe(false); through(world, 21); cast(world, "Q"); expect(body.memory.spinEnd).toBeLessThan(world.tick);
  });
  it("checks actual pet maximum health and keeps copied R knockup/marks on that pet", () => {
    const world = worldFor(2000), target = summon(world, 100, { hp: 1000, targetClass: "champion", unitClass: "clone" }); cast(world, "R"); through(world, 8);
    expect(1000 - target.hp).toBeCloseTo(20 + .34375 * derive(world.units[0]).ad); expect(target.statuses!.some((s) => s.key === "airborne")).toBe(true); expect(world.units[1].statuses.some((s) => s.key === "airborne")).toBe(false);
  });
  it("does not invent a second spin after the eight-second window closes", () => {
    const world = worldFor(2000); cast(world, "R"); through(world, 240); expect(canCast(world, world.units[0], ability("R2"))).toBe(false); expect(world.units[0].cooldownReady.R).toBe(2940);
  });
  it("ordinary stun keeps a released Cyclone spinning but owner death stops all sources", () => {
    const world = worldFor(); decoy(world); world.units[0].x = 0; cast(world, "R"); applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "stun", duration: 3 }, { scale: 1 }); through(world, world.tick + 20); expect(world.units[1].totals.damageTaken).toBeGreaterThan(0);
    world.units[0].alive = false; world.units[0].hp = 0; const hp = world.units[1].hp; through(world, world.tick + 20); expect(world.units[1].hp).toBe(hp); expect(clones(world)).toHaveLength(0);
  });
});

describe("Ordinary modes preserve ready ultimate and completed retreat", () => {
  it.each(["hold", "trade"] as const)("%s reserves actually ready R", (mode) => {
    const world = worldFor(), self = world.units[0]; self.cooldownReady.Q = self.cooldownReady.W = self.cooldownReady.E = 1000; self.attackReadyTick = 1000;
    expect(canCast(world, self, ability("R"))).toBe(true); expect(compiled.spec.behavior!(perceive({ ...world, modes: [mode, "idle"] }, self.side))).not.toEqual({ kind: "cast", ability: "R" });
  });
  it("completed trade retreats with QWER eligible", () => {
    const world = worldFor(), self = world.units[0]; self.memory.tradeDone = true; expect(compiled.spec.behavior!(perceive({ ...world, modes: ["trade", "idle"] }, self.side))).toEqual({ kind: "move", direction: -1 });
  });
  it.each(["hold", "trade"] as const)("%s also reserves an actually ready second Cyclone", (mode) => {
    const world = worldFor(), self = world.units[0]; cast(world, "R"); through(world, 90); self.cooldownReady.Q = self.cooldownReady.W = self.cooldownReady.E = 1000; self.attackReadyTick = 1000; expect(canCast(world, self, ability("R2"))).toBe(true); expect(compiled.spec.behavior!(perceive({ ...world, modes: [mode, "idle"] }, self.side))).not.toEqual({ kind: "cast", ability: "R2" });
  });
  it("co-location E follows reflected facing", () => {
    const world = worldFor(0), self = world.units[0]; cast(world, "E"); expect(directionTo(self, world.units[1])).toBe(1); through(world, 1); expect(self.x).toBeLessThanOrEqual(world.units[1].x);
  });
});

describe("Nimbus windup interruption respects actual attack ownership", () => {
  const duel = () => createWorld({ fighters: [compiled.spec, compiled.spec], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
  const retainDuringCast = (world: World, unit: Unit) => {
    const overlay: AbilitySpec = { key: "fixture:overlay", name: "Windup-preserving cast", slot: "other", cooldown: 0, castTime: 1, preserveAttackWindup: true, delivery: { kind: "self" } };
    unit.spec = { ...unit.spec, abilities: [...unit.spec.abilities, overlay] };
    startCast(world, unit, overlay);
    expect(unit.action).toMatchObject({ kind: "cast", ability: overlay.key });
    expect(unit.pendingAttack).toMatchObject({ kind: "windup" });
  };
  it("attributes the protected-windup exception to its separately pinned glossary revision", () => {
    expect(compiled.evidence).toContainEqual({ ability: "Nimbus Strike", page: "Template:Tip data/Uncancellable windup", revid: 4072133, text: "Any effect that would disrupt an attack's windup, aside from the ones noted above, are ignored by basic attacks with uncancellable windups." });
  });
  it("cancels an ordinary enemy windup at declaration and resets only that attack timer", () => {
    const world = duel(), enemy = world.units[1]; startAttack(world, enemy);
    expect(enemy.action).toMatchObject({ kind: "windup", uncancellable: false });
    world.tick = 1; cast(world, "E");
    expect(enemy.action).toBeUndefined(); expect(enemy.attackReadyTick).toBe(world.tick);
  });
  it("preserves a real Crushing Blow uncancellable attack and its eventual damage", () => {
    const world = duel(), enemy = world.units[1]; startCast(world, enemy, ability("Q")); startAttack(world, enemy);
    const windup = enemy.action, ready = enemy.attackReadyTick;
    expect(windup).toMatchObject({ kind: "windup", uncancellable: true, empowered: ["Q"] });
    world.tick = 1; cast(world, "E");
    expect(enemy.action).toBe(windup); expect(enemy.attackReadyTick).toBe(ready);
    through(world, 8); expect(enemy.totals.damageDealt).toBeGreaterThan(0);
  });
  it("cancels an ordinary pending attack without cancelling the concurrent cast", () => {
    const world = duel(), enemy = world.units[1]; startAttack(world, enemy); retainDuringCast(world, enemy);
    const casting = enemy.action; world.tick = 1; cast(world, "E");
    expect(enemy.pendingAttack).toBeUndefined(); expect(enemy.action).toBe(casting); expect(enemy.attackReadyTick).toBe(world.tick);
  });
  it("preserves a protected pending attack and the concurrent cast independently", () => {
    const world = duel(), enemy = world.units[1]; startCast(world, enemy, ability("Q")); startAttack(world, enemy); retainDuringCast(world, enemy);
    const pending = enemy.pendingAttack, casting = enemy.action, ready = enemy.attackReadyTick;
    expect(pending?.uncancellable).toBe(true); world.tick = 1; cast(world, "E");
    expect(enemy.pendingAttack).toBe(pending); expect(enemy.action).toBe(casting); expect(enemy.attackReadyTick).toBe(ready);
    through(world, 8); expect(enemy.totals.damageDealt).toBeGreaterThan(0);
  });
  it.each([false, true])("leaves an ordinary enemy attack aimed at an actual pet untouched (pending %s)", (pending) => {
    const world = duel(), enemy = world.units[1], target = spawnPet(world, world.units[0], { kind: "fixture", name: "Actual allied target", targetClass: "minion", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20 }, enemy.x);
    startAttack(world, enemy, target); if (pending) retainDuringCast(world, enemy);
    const windup = pending ? enemy.pendingAttack : enemy.action, casting = enemy.action, ready = enemy.attackReadyTick;
    expect(windup).toMatchObject({ kind: "windup", pet: target.id, uncancellable: false }); world.tick = 1; cast(world, "E");
    expect(pending ? enemy.pendingAttack : enemy.action).toBe(windup); expect(enemy.action).toBe(casting); expect(enemy.attackReadyTick).toBe(ready);
  });
  it("cancels only a hostile pet windup aimed at Wukong, retaining friendly and unrelated recipients", () => {
    const world = duel(), self = world.units[0], enemy = world.units[1];
    const spec: PetSpec = { kind: "fixture", name: "Actual attacking body", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, attack: { range: 1000, interval: 1, windup: .25, effects: [{ type: "damage", damageType: "physical", amount: { base: 20 } }], attackLike: true } };
    const hostile = spawnPet(world, enemy, spec, enemy.x), friendly = spawnPet(world, self, spec, self.x), unrelated = spawnPet(world, enemy, { ...spec, target: () => friendly }, enemy.x);
    advancePets(world); expect(hostile.windup?.target).toBe(self.side); expect(unrelated.windup?.target).toEqual({ pet: friendly.id });
    const friendlyWindup = friendly.windup, unrelatedWindup = unrelated.windup; expect(friendlyWindup).toBeDefined(); world.tick = 1; cast(world, "E");
    expect(hostile.windup).toBeUndefined(); expect(hostile.nextAttackTick).toBe(world.tick); expect(friendly.windup).toBe(friendlyWindup); expect(unrelated.windup).toBe(unrelatedWindup);
  });
  it("keeps a hostile pet projectile that already left its windup", () => {
    const world = duel(), enemy = world.units[1];
    const hostile = spawnPet(world, enemy, { kind: "fixture", name: "Actual ranged body", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, attack: { range: 1000, interval: 1, windup: .25, missileSpeed: 1000, effects: [{ type: "damage", damageType: "physical", amount: { base: 20 } }], attackLike: true } }, 500);
    advancePets(world); world.tick = hostile.windup!.launchTick; advancePets(world);
    const launched = world.petMissiles![0]; expect(launched?.target).toBe(world.units[0].side); expect(hostile.windup).toBeUndefined(); cast(world, "E");
    expect(world.petMissiles).toContain(launched);
  });
  it("retains an ability-like hostile pet windup and its cadence", () => {
    const world = duel(), enemy = world.units[1];
    const hostile = spawnPet(world, enemy, { kind: "fixture", name: "Actual ability-like body", hp: 1000, armor: 0, mr: 0, radius: 35, moveSpeed: 0, duration: 20, attack: { range: 1000, interval: 1, windup: .25, effects: [{ type: "damage", damageType: "magic", amount: { base: 20 } }], attackLike: false } }, enemy.x);
    advancePets(world); const windup = hostile.windup, ready = hostile.nextAttackTick;
    expect(windup?.target).toBe(world.units[0].side); world.tick = 1; cast(world, "E");
    expect(hostile.windup).toBe(windup); expect(hostile.nextAttackTick).toBe(ready);
  });
});
