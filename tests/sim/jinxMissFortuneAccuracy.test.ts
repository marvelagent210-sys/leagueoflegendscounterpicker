import { describe, expect, it } from "vitest";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { damagePerSecond } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, advanceZones, attackRange, canCast, completeCast, launchAttack, startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive, threatsTo } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import { cloneWorld, type Pet, type World } from "../../engine/sim/state";
import Jinx from "../../kits/champions/Jinx";
import MissFortune from "../../kits/champions/MissFortune";
import { championData, records } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";

const compile = (id: "Jinx" | "MissFortune", options: Record<string, number> = {}) => compileKit(championData(id), records(id), id === "Jinx" ? Jinx : MissFortune, options);
const jc = compile("Jinx"), mc = compile("MissFortune");
function world(id: "Jinx" | "MissFortune", options: Record<string, number> = {}, bonus = {}, distance = 300): World {
  const spec = compile(id, options).spec;
  const w = createWorld({ fighters: [{ ...spec, base: { ...spec.base, ad: 100, hpRegen: 0, resource: 2000, resourceRegen: 0, attackSpeed: { base: 1, ratio: 1, bonus: 0 }, windup: { percent: .2, modifier: 1 } }, bonus }, fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, moveSpeed: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 80, reactionTime: 0 } });
  w.units[0].x = 0; w.units[1].x = distance; return w;
}
const ability = (w: World, key: string) => w.units[0].spec.abilities.find((spell) => spell.key === key)!;
const cast = (w: World, key: string, distance?: number) => completeCast(w, w.units[0], ability(w, key), w.tick, distance === undefined ? undefined : { direction: 1, distance });
const hit = (w: World, key: string) => abilityHit(w, w.units[0], w.units[1], ability(w, key), ability(w, key).onHit ?? []);
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [standStill, standStill]); }
function tickHook(w: World, tick = w.tick) { w.tick = tick; w.units[0].spec.hooks?.onTick?.(hookContext(w, w.units[0])); }
function attack(w: World, pet?: Pet) { w.units[0].attackReadyTick = 0; startAttack(w, w.units[0], pet); launchAttack(w, w.units[0]); }
function missiles(w: World, count = 35) { for (let i = 0; i < count; i++) { advanceMissiles(w); w.tick++; } }
const pet = (w: World, x = 400, hp = 10000) => spawnPet(w, w.units[1], { kind: "minion", name: "Enemy summon", hp, armor: 0, mr: 0, radius: 20, moveSpeed: 0, duration: 50 }, x);
function state(w: World, key: "spellShield" | "parry" | "dodgeAttacks" | "blockAttacks" | "invulnerable" | "untargetable", onPet?: Pet) {
  if (onPet) { onPet.statuses ??= []; onPet.statuses.push({ kind: "state", key, source: 1, startTick: w.tick, endTick: w.tick + 300, value: 0, charges: 1 }); }
  else applyEffect(w, w.units[1], w.units[1], { type: "state", state: key, duration: 10, charges: 1 }, { scale: 1 });
}

describe("Jinx pinned weapons and stack clocks", () => {
  it("retains every slot, strict wiki/game evidence, and explicit absent-world assumptions", () => {
    expect(jc.spec.abilities.map((spell) => spell.key)).toEqual(["Q", "W", "E", "R", "Econtrol", "Rblast", "Eburst"]);
    expect(new Set(jc.evidence.filter((entry) => entry.revid > 0).map((entry) => entry.ability)).size).toBe(5);
    expect(jc.evidence.some((entry) => entry.sourceVersion?.startsWith("16.21.") && entry.sourceSha256?.length === 64)).toBe(true);
    expect(jc.assumptions.join(" ")).toContain("does not give later intervals"); expect(jc.assumptions.join(" ")).toContain("explicit linear six-second decay");
  });
  it.each<Record<string, number>>([{ weaponPolicy: -1 }, { weaponPolicy: 3 }, { revDecayInterval: 0 }, { revDecayInterval: NaN }, { revDecayInterval: Infinity }])("rejects unsupported model options %j", (options) => expect(() => compile("Jinx", options)).toThrow("Jinx:"));
  it("starts with no free stacks, no takedown steroid, and minigun range", () => { const w = world("Jinx"); expect(derive(w.units[0]).bonusAttackSpeed).toBe(0); expect(attackRange(w.units[0])).toBe(525); expect(w.units[0].memory["jinx:excitedStacks"]).toBeUndefined(); });
  it("the toggle is mana-free and retains its static .9-second lock under haste", () => { const w = world("Jinx", {}, { abilityHaste: 100 }); const mana = w.units[0].resource; cast(w, "Q"); expect(w.units[0].resource).toBe(mana); expect(w.units[0].cooldownReady.Q).toBe(27); expect(attackRange(w.units[0])).toBe(725); expect(ability(w, "Q").activation).toBe("toggle"); });
  it("rocket penalty remains exactly ten percent of bonus AS across repeated refreshes", () => {
    const w = world("Jinx", {}, { attackSpeed: 1 }); cast(w, "Q"); expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(.9);
    for (let index = 1; index <= 60; index++) { tickHook(w, index); expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(.9); }
  });
  it("launched minigun attacks gain .65/.325/.325 AS without preloaded first-stack AS", () => { const w = world("Jinx"); for (const [ordinal, amount] of [[1, .65], [2, .975], [3, 1.3], [4, 1.3]]) { attack(w); expect(w.units[0].memory["jinx:rev"]).toBe(Math.min(3, ordinal!)); expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(amount!); w.tick += 10; } });
  it("interrupted windups do not grant a minigun stack", () => { const w = world("Jinx"); startAttack(w, w.units[0]); expect(w.units[0].memory["jinx:rev"]).toBe(0); w.units[0].action = undefined; tickHook(w, 2); expect(w.units[0].memory["jinx:rev"]).toBe(0); });
  it("a blinded launch still grants a stack but does not deal damage", () => { const w = world("Jinx"); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 4 }, { scale: 1 }); attack(w); missiles(w); expect(w.units[0].memory["jinx:rev"]).toBe(1); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("Rev'd up refreshes and then loses one stack at each independent expiry", () => {
    const w = world("Jinx"); for (const t of [0, 30, 60]) { w.tick = t; attack(w); }
    tickHook(w, 134); expect(w.units[0].memory["jinx:rev"]).toBe(3); tickHook(w, 135); expect(w.units[0].memory["jinx:rev"]).toBe(2); tickHook(w, 165); expect(w.units[0].memory["jinx:rev"]).toBe(1); tickHook(w, 195); expect(w.units[0].memory["jinx:rev"]).toBe(0);
  });
  it("the declared rocket benefits from Rev'd up but consumes stacks on launch", () => { const w = world("Jinx"); for (let i = 0; i < 3; i++) attack(w); cast(w, "Q"); startAttack(w, w.units[0]); expect(derive(w.units[0]).bonusAttackSpeed).toBeCloseTo(1.17); launchAttack(w, w.units[0]); expect(w.units[0].memory["jinx:rev"]).toBe(0); expect(w.units[0].resource).toBe(1980); });
  it("a cancelled rocket spends its on-attack mana without consuming launch-time stacks", () => { const w = world("Jinx"); attack(w); cast(w, "Q"); startAttack(w, w.units[0]); w.units[0].action = undefined; expect(w.units[0].resource).toBe(1980); expect(w.units[0].memory["jinx:rev"]).toBe(1); });
  it("rocket damage/speed/tag survive a weapon switch before the missile hits", () => { const w = world("Jinx"); cast(w, "Q"); attack(w); const missile = w.missiles[0]!; expect(missile.attack?.attackTag).toBe("jinx:fishbones"); expect(missile.perTick).toBeCloseTo(2000 / 30); cast(w, "Q"); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(110); });
  it.each([[0, 110], [.5, 165], [1, 220]])("Fishbones crit chance %f gives averaged basic damage %f", (critChance, expected) => { const w = world("Jinx", {}, { critChance }); cast(w, "Q"); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(expected); });
  it("rocket splash uses premitigation crit damage and does not duplicate the primary", () => { const w = world("Jinx", {}, { critChance: 1 }); w.units[1].spec = { ...w.units[1].spec, base: { ...w.units[1].spec.base, armor: 100 } }; const summon = pet(w, 400); cast(w, "Q"); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(110); expect(summon.hp).toBeCloseTo(9780); });
  it.each(["parry", "dodgeAttacks", "blockAttacks"] as const)("%s denies both the rocket basic and collateral", (guard) => { const w = world("Jinx"); const summon = pet(w); state(w, guard); cast(w, "Q"); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBe(0); expect(summon.hp).toBe(10000); });
  it("a rocket aimed at an actual pet splashes its champion without champion-only hit substitution", () => { const w = world("Jinx"); const summon = pet(w, 300); cast(w, "Q"); attack(w, summon); missiles(w); expect(summon.hp).toBeCloseTo(9890); expect(w.units[1].totals.damageTaken).toBeCloseTo(110); });
  it("ordinary summon kills never grant Get Excited", () => { const w = world("Jinx"); const summon = pet(w, 300, 1); damagePet(w, w.units[0], summon, 1, "true", false); expect(w.units[0].memory["jinx:excitedStacks"]).toBeUndefined(); });
  it("counted champion deaths grant a total-AS multiplier, raised cap and decaying movement", () => { const w = world("Jinx", {}, { attackSpeed: 5 }); dealDamage(w, w.units[0], w.units[1], 100000, "true"); expect(w.units[0].memory["jinx:excitedStacks"]).toBe(1); expect(derive(w.units[0]).attackSpeed).toBeCloseTo(7.5); const initial = derive(w.units[0]).rawMoveSpeed; tickHook(w, 90); expect(derive(w.units[0]).rawMoveSpeed).toBeLessThan(initial); tickHook(w, 180); expect(derive(w.units[0]).attackSpeed).toBe(ATTACK_SPEED_CAP); });
  it("weapon and stack state are independently copied on simulation branches", () => { const w = world("Jinx"); attack(w); cast(w, "Q"); const fork = cloneWorld(w); fork.units[0].memory["jinx:rocket"] = false; fork.units[0].memory["jinx:rev"] = 3; expect(w.units[0].memory["jinx:rocket"]).toBe(true); expect(w.units[0].memory["jinx:rev"]).toBe(1); });
});

describe("Jinx actual spell timing, traps and death rocket", () => {
  it.each([[0, .6], [.25, .58], [1.25, .5], [2.5, .4], [5, .4]])("Zap AS %f uses %f seconds", (attackSpeed, expected) => { const w = world("Jinx", {}, { attackSpeed }); expect(ability(w, "W").castTimeFor!(w.units[0])).toBeCloseTo(expected); });
  it("Zap uses 210+1.4AD and an eighty-percent two-second slow", () => { const w = world("Jinx"); hit(w, "W"); expect(w.units[1].totals.damageTaken).toBe(350); expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.8); expect(w.units[1].statuses.find((s) => s.key === "jinx:zapSight")?.endTick).toBe(60); expect(w.units[1].statuses.some((s) => s.key === "revealed")).toBe(false); });
  it("Zap collides with the actual intervening pet", () => { const w = world("Jinx", {}, {}, 1000); const summon = pet(w, 300); cast(w, "W"); missiles(w); expect(summon.hp).toBe(9650); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("Chompers retain .4-second toss then .5-second arm delay", () => { const w = world("Jinx"); cast(w, "E"); through(w, 10); expect(w.zones[0]?.kind).toBe("delayedArea"); through(w, 12); expect(w.zones.some((z) => z.kind === "trap")).toBe(true); through(w, 25); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 28); expect(w.units[1].totals.damageTaken).toBe(290); expect(w.units[1].statuses.some((s) => s.key === "root")).toBe(true); });
  it("a spell shield blocks Chomper snare while the explosion still deals damage", () => { const w = world("Jinx"); state(w, "spellShield"); cast(w, "E"); through(w, 30); expect(w.units[1].totals.damageTaken).toBe(290); expect(w.units[1].statuses.some((s) => s.key === "root")).toBe(false); expect(w.units[1].statuses.some((s) => s.key === "spellShield")).toBe(false); });
  it("a projectile wall stops the tossed Chompers before any trap exists", () => { const w = world("Jinx"); w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 300 }); cast(w, "E"); through(w, 40); expect(w.zones.some((z) => z.ability === "E")).toBe(false); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("forecasts one real toss packet after a zero-time Chomper cast without duplicating its estimate", () => {
    const w = world("Jinx"); startCast(w, w.units[0], ability(w, "E"));
    expect(w.units[0].action).toBeUndefined();
    const threats = threatsTo(w, 1).filter((threat) => threat.source === "E" || threat.source === "Eburst");
    expect(threats.map((threat) => [threat.source, threat.damage, threat.eta])).toEqual([["Eburst", 290, 12]]);
    expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("a spent trap cannot deal a second natural-expiry explosion", () => { const w = world("Jinx"); cast(w, "E"); through(w, 190); expect(w.units[1].totals.damageTaken).toBe(290); expect(w.zones.some((z) => z.ability === "E")).toBe(false); });
  it("an untouched trap expires with damage but without rooting", () => { const w = world("Jinx", {}, {}, 1000); cast(w, "E", 300); through(w, 160); w.units[1].x = 300; through(w, 164); expect(w.units[1].totals.damageTaken).toBe(290); expect(w.units[1].statuses.some((s) => s.key === "root")).toBe(false); });
  it("summons cannot trigger a champion-only trap but receive its natural explosion", () => { const w = world("Jinx", {}, {}, 1000); const summon = pet(w, 300); cast(w, "E", 300); through(w, 100); expect(summon.hp).toBe(10000); through(w, 170); expect(summon.hp).toBe(9710); });
  it.each([[0, 50], [750, 275], [1500, 500], [3000, 500]])("R traveled distance %i ramps only its flat/bonus-AD term to %f", (distance, expected) => { const w = world("Jinx"); w.units[0].memory["jinx:rImpactTravel"] = distance; hit(w, "R"); expect(w.units[1].totals.damageTaken).toBeCloseTo(expected); });
  it("R missing-health damage does not shrink at zero traveled distance", () => { const w = world("Jinx"); w.units[1].hp = 99000; w.units[0].memory["jinx:rImpactTravel"] = 0; hit(w, "R"); expect(w.units[1].totals.damageTaken).toBeCloseTo(50 + .35 * 1000); });
  it("R ignores intervening summons and explodes onto each using its own missing HP", () => { const w = world("Jinx", {}, {}, 1000); const front = pet(w, 300), collateral = pet(w, 1000); collateral.hp = 9000; cast(w, "R"); missiles(w, 40); expect(front.hp).toBe(10000); expect(collateral.hp).toBeLessThan(9000 - 280); expect(w.units[1].totals.damageTaken).toBeGreaterThan(0); });
  it("a primary spell shield still permits R's collateral explosion", () => { const w = world("Jinx"); const summon = pet(w, 300); state(w, "spellShield"); cast(w, "R"); missiles(w); expect(w.units[1].totals.damageTaken).toBe(0); expect(summon.hp).toBeLessThan(10000); });
  it("R accelerates only after its sourced 1350-unit threshold", () => { const w = world("Jinx", {}, {}, 4000); cast(w, "R"); for (let i = 0; i < 23; i++) { advanceMissiles(w); w.tick++; } expect(w.missiles[0]!.perTick).toBeCloseTo(1700 / 30); advanceMissiles(w); expect(w.missiles[0]!.perTick).toBeCloseTo(2200 / 30); });
});

describe("Miss Fortune contact identity, Double Up and Strut", () => {
  it("uses the separately attributed explicit level-20 110% Love Tap breakpoint", () => { expect(mc.evidence.some((row) => row.revid === 0 && row.text.includes('"mLevel":20'))).toBe(true); expect(mc.assumptions.join(" ")).toContain("conflicting with the wiki"); const w = world("MissFortune"); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(210); });
  it("repeated connected attacks on one target cannot repeatedly earn Love Tap", () => { const w = world("MissFortune"); attack(w); missiles(w); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(310); });
  it("two overlapping missiles select Love Tap at impact rather than duplicate launch state", () => { const w = world("MissFortune", {}, {}, 600); attack(w); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(310); });
  it("real pet target switches earn half-strength Love Tap and restore the champion's eligibility", () => { const w = world("MissFortune"); const summon = pet(w, 300); attack(w); missiles(w); attack(w, summon); missiles(w); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(420); expect(summon.hp).toBeCloseTo(9845); });
  it.each(["parry", "dodgeAttacks", "blockAttacks"] as const)("%s prevents Love Tap and mark changes", (guard) => { const w = world("MissFortune"); state(w, guard); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].memory["missfortune:loveTap"]).toBeUndefined(); });
  it("Love Tap's bonus does not crit with the ordinary attack", () => { const w = world("MissFortune", {}, { critChance: 1 }); attack(w); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(310); });
  it("Q deals basic physical damage and applies Love Tap only on the first same-target hit", () => { const w = world("MissFortune"); hit(w, "Q"); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBeCloseTo(2 * 220 + 110); });
  it("Q cast time follows current attack windup", () => { const w = world("MissFortune", {}, { attackSpeed: 1 }); expect(ability(w, "Q").castTimeFor!(w.units[0])).toBeCloseTo(.1); });
  it("Q invalidated during its cast cancels without resource or cooldown", () => { const w = world("MissFortune"); const before = w.units[0].resource; startCast(w, w.units[0], ability(w, "Q")); w.units[1].x = 1000; through(w, 8); expect(w.units[0].resource).toBe(before); expect(w.units[0].cooldownReady.Q).toBeUndefined(); expect(w.missiles).toHaveLength(0); });
  it("a primary spell shield still creates a real pet bounce behind the champion", () => { const w = world("MissFortune"); const summon = pet(w, 500); state(w, "spellShield"); cast(w, "Q"); missiles(w); expect(w.units[1].totals.damageTaken).toBe(0); expect(summon.hp).toBeCloseTo(10000 - 220 - 55); });
  it("Q does not manufacture bounce damage when no secondary target exists", () => { const w = world("MissFortune"); cast(w, "Q"); missiles(w); expect(w.units[1].totals.damageTaken).toBeCloseTo(330); expect(w.missiles).toHaveLength(0); });
  it("Q chooses the nearest actual target directly behind, excluding front and distant pets", () => { const w = world("MissFortune"); const front = pet(w, 200), near = pet(w, 450), farther = pet(w, 600), out = pet(w, 900); cast(w, "Q"); missiles(w); expect(near.hp).toBe(9725); expect(front.hp).toBe(10000); expect(farther.hp).toBe(10000); expect(out.hp).toBe(10000); });
  it("a killed primary forces 150% Q bounce while Love Tap stays noncritical", () => { const w = world("MissFortune"); const summon = pet(w, 500); w.units[1].hp = 100; cast(w, "Q"); missiles(w); expect(w.units[1].hp).toBeLessThanOrEqual(0); expect(summon.hp).toBeCloseTo(10000 - 330 - 55); step(w, [standStill, standStill]); expect(w.units[1].alive).toBe(false); });
  it("each bounce independently checks its own spell shield", () => { const w = world("MissFortune"); const summon = pet(w, 500); state(w, "spellShield", summon); cast(w, "Q"); missiles(w); expect(w.units[1].totals.damageTaken).toBe(330); expect(summon.hp).toBe(10000); });
  it("Strut starts at100, resets on direct health damage, rebuilds at4 and7 seconds", () => { const w = world("MissFortune"); expect(derive(w.units[0]).rawMoveSpeed).toBe(425); dealDamage(w, w.units[1], w.units[0], 100, "true"); expect(derive(w.units[0]).rawMoveSpeed).toBe(325); tickHook(w, 119); expect(derive(w.units[0]).rawMoveSpeed).toBe(325); tickHook(w, 120); expect(derive(w.units[0]).rawMoveSpeed).toBe(375); tickHook(w, 210); expect(derive(w.units[0]).rawMoveSpeed).toBe(425); });
  it("periodic and completely shielded damage preserve Strut", () => { const w = world("MissFortune"); applyEffect(w, w.units[0], w.units[0], { type: "shield", amount: { base: 1000 }, duration: 4 }, { scale: 1 }); dealDamage(w, w.units[1], w.units[0], 100, "true"); expect(derive(w.units[0]).rawMoveSpeed).toBe(425); w.units[0].spec.hooks!.onDamageTaken!({ ...hookContext(w, w.units[0]), raw: 100, amount: 100, absorbed: 0, mitigated: 100, damageType: "magic", persistent: true }); expect(derive(w.units[0]).rawMoveSpeed).toBe(425); });
  it("W immediately restores full Strut and grants four seconds of100% AS", () => { const w = world("MissFortune"); dealDamage(w, w.units[1], w.units[0], 100, "true"); cast(w, "W"); expect(derive(w.units[0]).rawMoveSpeed).toBe(425); expect(derive(w.units[0]).bonusAttackSpeed).toBe(1); through(w, 120); expect(derive(w.units[0]).bonusAttackSpeed).toBe(0); });
  it.each([[0, 60], [100, 30], [200, 20]])("new Love Tap under %i haste refunds exactly%i ticks", (abilityHaste, refund) => { const w = world("MissFortune", {}, { abilityHaste }); w.units[0].cooldownReady.W = 300; hit(w, "Q"); expect(w.units[0].cooldownReady.W).toBe(300 - refund); hit(w, "Q"); expect(w.units[0].cooldownReady.W).toBe(300 - refund); });
});

describe("Miss Fortune independent rain field and traveling Bullet Time", () => {
  it("R cast forecast announces one arriving wave after its launch and flight, rather than an immediate full channel", () => {
    const w = world("MissFortune", {}, {}, 1000); startCast(w, w.units[0], ability(w, "R"));
    const threat = threatsTo(w, 1).find((packet) => packet.source === "R")!;
    expect(threat.damage).toBe(100); expect(threat.eta).toBe(17);
  });
  it("Make It Rain has eight spatial quarter-second pulses with120% totalAP", () => { const w = world("MissFortune", {}, { ap: 100 }); cast(w, "E"); through(w, 65); expect(w.units[1].totals.damageTaken).toBeCloseTo(210 + 120); });
  it("rain slow scales with AP and remains explicitly noncleanseable", () => { const w = world("MissFortune", {}, { ap: 100 }); cast(w, "E"); through(w, 2); const slow = w.units[1].statuses.find((s) => s.key === "slow")!; expect(slow.value).toBeCloseTo(.46); expect(slow.sticky).toBe(true); });
  it("leaving the fixed rain field avoids later damage", () => { const w = world("MissFortune"); cast(w, "E"); through(w, 10); const damage = w.units[1].totals.damageTaken; w.units[1].x = 1000; through(w, 65); expect(w.units[1].totals.damageTaken).toBe(damage); });
  it("R cannot hit immediately and fires exactly18 independent traveling waves", () => { const w = world("MissFortune", {}, {}, 1000); startCast(w, w.units[0], ability(w, "R")); through(w, 10); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 115); expect(w.units[0].memory["missfortune:rWaves"]).toBe(18); expect(w.units[1].totals.damageTaken).toBeCloseTo(18 * 100); });
  it("R wave times use absolute first/last clocks rather than rounded intervals", () => { const w = world("MissFortune", {}, {}, 3000); startCast(w, w.units[0], ability(w, "R")); through(w, 1); expect(w.missiles).toHaveLength(0); through(w, 2); expect(w.units[0].memory["missfortune:rWaves"]).toBe(1); through(w, 87); expect(w.units[0].memory["missfortune:rWaves"]).toBe(17); through(w, 88); expect(w.units[0].memory["missfortune:rWaves"]).toBe(18); });
  it.each([[0, 1800], [.5, 2205], [1, 2610]])("R crit chance%f averages to%f without sixfold stream damage", (critChance, damage) => { const w = world("MissFortune", {}, { critChance }); startCast(w, w.units[0], ability(w, "R")); through(w, 110); expect(w.units[1].totals.damageTaken).toBeCloseTo(damage); });
  it("R waves independently hit a champion and each intersected summon once", () => { const w = world("MissFortune"); const summon = pet(w, 400); startCast(w, w.units[0], ability(w, "R")); through(w, 110); expect(w.units[1].totals.damageTaken).toBe(1800); expect(summon.hp).toBe(8200); });
  it("R channel interruption stops future waves while already launched missiles finish", () => { const w = world("MissFortune", {}, {}, 1000); startCast(w, w.units[0], ability(w, "R")); through(w, 10); const fired = Number(w.units[0].memory["missfortune:rWaves"]); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "silence", duration: 2 }, { scale: 1 }); expect(w.units[0].action).toBeUndefined(); through(w, 110); expect(w.units[0].memory["missfortune:rWaves"]).toBe(fired); expect(w.units[1].totals.damageTaken).toBe(fired * 100); });
  it("root alone leaves R channel intact", () => { const w = world("MissFortune"); startCast(w, w.units[0], ability(w, "R")); through(w, 2); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); expect(w.units[0].action?.kind).toBe("channel"); through(w, 110); expect(w.units[1].totals.damageTaken).toBe(1800); });
  it("R fixed facing cannot rotate automatically when the rival crosses behind", () => { const w = world("MissFortune"); startCast(w, w.units[0], ability(w, "R")); through(w, 2); w.units[1].x = -300; through(w, 110); expect(w.units[1].totals.damageTaken).toBe(0); });
  it("projectile walls stop R waves while ordinary spell shields do not", () => {
    for (const wall of [false, true]) { const w = world("MissFortune"); state(w, "spellShield"); if (wall) w.zones.push({ id: w.nextId++, owner: 1, kind: "projectileWall", seenTick: 0, x: 150, radius: 0, startTick: 0, endTick: 300 }); startCast(w, w.units[0], ability(w, "R")); through(w, 110); expect(w.units[1].totals.damageTaken).toBe(wall ? 0 : 1800); expect(w.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true); }
  });
  it("wave damage reads impact-time AD rather than the channel's initial stats", () => { const w = world("MissFortune", {}, {}, 1000); startCast(w, w.units[0], ability(w, "R")); through(w, 3); applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "AD", amount: { base: 100 }, duration: 5 }, { scale: 1 }); through(w, 115); expect(w.units[1].totals.damageTaken).toBe(18 * 160); });
  it("copied wave ordinals, facing, marks and missile target identities remain independent", () => { const w = world("MissFortune"); startCast(w, w.units[0], ability(w, "R")); through(w, 10); const copy = cloneWorld(w); copy.units[0].memory["missfortune:rWaves"] = 17; copy.units[0].facing = -1; copy.missiles[0]!.x = -100; expect(w.units[0].memory["missfortune:rWaves"]).not.toBe(17); expect(w.units[0].facing).toBe(1); expect(w.missiles[0]!.x).not.toBe(-100); });
});

describe("ordinary marksman policies and budget packets", () => {
  it.each([0, 1, 2])("Jinx weapon policy %i completes ordinary spells and basic attacks", (weaponPolicy) => {
    const w = world("Jinx", { weaponPolicy }, {}, 750); w.modes[0] = "fight";
    for (let tick = 0; tick < 300; tick++) step(w, [w.units[0].spec.behavior!, standStill]);
    expect(w.units[1].totals.damageTaken).toBeGreaterThan(500);
    expect(w.log.some((entry) => entry.side === 0 && entry.text.startsWith("attack deals"))).toBe(true);
    for (const key of ["W", "E", "R"]) expect(w.units[0].cooldownReady[key]).toBeGreaterThan(0);
    expect(w.log.some((entry) => /casts .*\((snare|collateral|explosion)\)/.test(entry.text))).toBe(false);
    if (weaponPolicy === 2) expect(w.units[0].memory["jinx:rocket"]).toBe(true);
    if (weaponPolicy === 1) expect(w.units[0].memory["jinx:rocket"]).not.toBe(true);
  });
  it("Miss Fortune ordinary policy uses all four slots and resumes basic attacks after channeling", () => {
    const w = world("MissFortune"); w.modes[0] = "fight";
    for (let tick = 0; tick < 300; tick++) step(w, [w.units[0].spec.behavior!, standStill]);
    for (const key of ["Q", "W", "E", "R"]) expect(w.units[0].cooldownReady[key]).toBeGreaterThan(0);
    expect(w.log.some((entry) => entry.side === 0 && entry.text.startsWith("attack deals"))).toBe(true);
    expect(w.log.some((entry) => /casts .*\((bounce|wave|kill bounce)\)/.test(entry.text))).toBe(false);
  });
  it.each(["Jinx", "MissFortune"] as const)("%s internal impact packets cannot be independently cast", (id) => {
    const w = world(id);
    for (const packet of w.units[0].spec.abilities.filter((spell) => spell.activation === "internal")) expect(canCast(w, w.units[0], packet)).toBe(false);
  });
  it("Jinx's stat reference values E once and respects the fully stacked normal AS cap", () => {
    const w = world("Jinx");
    expect(w.units[0].spec.budget!.damage!(w.units[0], w.units[1]).magic).toBeCloseTo(290 / 10);
    expect(w.units[0].spec.budget!.damage!(w.units[0], w.units[1]).physical).toBeCloseTo(130);
    const capped = world("Jinx", {}, { attackSpeed: 5 });
    expect(capped.units[0].spec.budget!.damage!(capped.units[0], capped.units[1]).physical).toBe(0);
  });
  it("Miss Fortune values one opening Love Tap, eighteen R waves and only four seconds of capped W uptime", () => {
    const w = world("MissFortune"), self = w.units[0];
    expect(self.spec.budget!.damage!(self, w.units[1]).physical).toBeCloseTo(11 + 1800 / 100 + 100 * 4 / 12);
    expect(damagePerSecond(self.spec, w.units[1].spec).physical).toBeGreaterThan(0);
    const capped = world("MissFortune", {}, { attackSpeed: 5 });
    expect(capped.units[0].spec.budget!.damage!(capped.units[0], capped.units[1]).physical).toBeCloseTo(11 + 1800 / 100);
  });
});
