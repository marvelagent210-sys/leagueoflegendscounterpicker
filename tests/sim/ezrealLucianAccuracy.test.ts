import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { StatPrices } from "../../engine/budget";
import { compileKit } from "../../engine/kits/compile";
import { ATTACK_SPEED_CAP } from "../../engine/stats";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { defaultBehavior, perceive } from "../../engine/sim/behavior";
import { abilityHit, applyEffect, canSee, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { simulateMatchup } from "../../engine/sim/matchup";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, step } from "../../engine/sim/simulate";
import type { FighterSpec, StateType } from "../../engine/sim/spec";
import { cloneWorld, type World } from "../../engine/sim/state";
import Ezreal from "../../kits/champions/Ezreal";
import Lucian from "../../kits/champions/Lucian";
import { championData, kit, records } from "../kits/helpers";
import { standStill } from "./helpers";
import { fighter } from "./kits";

const ez = compileKit(championData("Ezreal"), records("Ezreal"), Ezreal);
const lu = compileKit(championData("Lucian"), records("Lucian"), Lucian);
const ability = (spec: FighterSpec, key: string) => spec.abilities.find((a) => a.key === key)!;
function worldFor(spec: FighterSpec, x = 300, bonus: FighterSpec["bonus"] = { ad: 100, ap: 100 }): World {
  const w = createWorld({ fighters: [{ ...spec, base: { ...spec.base, hpRegen: 0, resourceRegen: 0 }, bonus }, fighter({ base: { hp: 50000, armor: 0, mr: 0, moveSpeed: 0, hpRegen: 0 } })], distance: 0, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 60 } });
  w.units[0].x = 0; w.units[1].x = x; return w;
}
function through(w: World, tick: number) { while (w.tick <= tick && !w.result) step(w, [standStill, standStill]); }
function cast(w: World, key: string, aim?: { direction: 1 | -1; distance: number }) { startCast(w, w.units[0], ability(w.units[0].spec, key), aim); }
function hit(w: World, key: string) { const a = ability(w.units[0].spec, key); abilityHit(w, w.units[0], w.units[1], a, a.onHit ?? []); }
function state(w: World, key: StateType, self = false, duration = 10) { const unit = w.units[self ? 0 : 1]; applyEffect(w, unit, unit, { type: "state", state: key, duration }, { scale: 1 }); }
function pet(w: World, x = 150, hp = 5000) { return spawnPet(w, w.units[1], { kind: "dummy", name: "Dummy summon", hp, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 60 }, x); }

describe("Ezreal pinned numeric and contact contracts", () => {
  it("reads every pinned ability revision and exact versioned global-range evidence", () => {
    expect(ez.evidence.map((e) => e.revid)).toEqual(expect.arrayContaining([3932280, 4064006, 4059864, 3989862, 4013235]));
    expect(ez.evidence.some((e) => e.sourceVersion === "16.20.8248524+branch.releases-16-20.content.release" && e.sourceSha256?.length === 64)).toBe(true);
    expect(ability(ez.spec, "R").delivery).toMatchObject({ range: 25000, piercing: true });
  });
  it("Q deals 120 + 130% total AD + 40% AP without critical amplification", () => {
    const w = worldFor(ez.spec, 300, { ad: 100, ap: 100, critChance: 1 }), ad = derive(w.units[0]).ad;
    hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + 1.3 * ad + 40);
  });
  it("Q refunds all four current cooldowns, including itself, by exactly 1.5 seconds", () => {
    const w = worldFor(ez.spec); Object.assign(w.units[0].cooldownReady, { Q: 200, W: 300, E: 400, R: 500 });
    hit(w, "Q"); expect(w.units[0].cooldownReady).toMatchObject({ Q: 155, W: 255, E: 355, R: 455 });
  });
  it("a spell shield still grants one passive stack and the full Q refund", () => {
    const w = worldFor(ez.spec); w.units[0].cooldownReady.Q = 135; state(w, "spellShield"); hit(w, "Q");
    expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].cooldownReady.Q).toBe(90); expect(w.units[0].memory["ezreal:force"]).toBe(1);
    expect(w.units[0].statuses.find((s) => s.memoKey === "buff:ezreal:force")?.value).toBe(.1);
  });
  it("five stacks cap at fifty percent bonus attack speed and expire exactly at six seconds", () => {
    const w = worldFor(ez.spec); for (let i = 0; i < 7; i++) hit(w, "Q");
    expect(w.units[0].memory["ezreal:force"]).toBe(5); expect(w.units[0].statuses.find((s) => s.memoKey === "buff:ezreal:force")?.value).toBe(.5);
    through(w, 180); expect(w.units[0].statuses.some((s) => s.memoKey === "buff:ezreal:force")).toBe(false);
  });
  it("a later hit refreshes the common passive timer", () => {
    const w = worldFor(ez.spec); hit(w, "Q"); w.tick = 179; hit(w, "R");
    expect(w.units[0].memory["ezreal:forceUntil"]).toBe(359); expect(w.units[0].memory["ezreal:force"]).toBe(2);
  });
  it("Q is basic damage for incoming reactions and independently applies full on-hit damage", () => {
    const w = worldFor(ez.spec); let attack = false;
    w.units[1].spec = { ...w.units[1].spec, hooks: { beforeDamageTaken(ctx) { attack ||= ctx.attack; } } };
    w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "magic", amount: { base: 37 } }] } };
    const ad = derive(w.units[0]).ad; hit(w, "Q"); expect(attack).toBe(true); expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + 1.3 * ad + 40 + 37);
  });
  it("Q's own basic packet applies life steal", () => {
    const w = worldFor(ez.spec); w.units[0].hp -= 1000;
    applyEffect(w, w.units[0], w.units[0], { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 });
    const initial = w.units[0].hp, ad = derive(w.units[0]).ad; hit(w, "Q"); expect(w.units[0].hp - initial).toBeCloseTo(.2 * (120 + 1.3 * ad + 40));
  });
  it("the exact pinned general blind exception preserves Mystic Shot's damage and refund", () => {
    const w = worldFor(ez.spec); w.units[0].cooldownReady.Q = 135; applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 }); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + 1.3 * derive(w.units[0]).ad + 40); expect(w.units[0].cooldownReady.Q).toBe(90); expect(ez.evidence.some((e) => e.revid === 4061028 && e.text.includes("Blind has no effect"))).toBe(true);
  });
  it("W detonation is exactly 300 + 100% bonus AD + 90% AP and an ability refunds its mana plus sixty", () => {
    const w = worldFor(ez.spec); w.units[0].resource = 100; hit(w, "W"); hit(w, "Q");
    expect(w.units[1].totals.damageTaken).toBeCloseTo(490 + 120 + 1.3 * derive(w.units[0]).ad + 40); expect(w.units[0].resource).toBe(200);
    expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(false);
  });
  it("a shielded triggering ability leaves W attached and grants no detonation mana", () => {
    const w = worldFor(ez.spec); w.units[0].resource = 100; hit(w, "W"); state(w, "spellShield"); hit(w, "Q");
    expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].resource).toBe(100); expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(true);
  });
  it("the explicit initial-orb policy attaches through a shield without consuming it", () => {
    const w = worldFor(ez.spec); state(w, "spellShield"); hit(w, "W"); expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(true); expect(w.units[1].statuses.some((s) => s.key === "spellShield")).toBe(true);
  });
  it.each(["blockAttacks", "dodgeAttacks"] as const)("%s prevents Q from detonating Flux", (key) => {
    const w = worldFor(ez.spec); hit(w, "W"); state(w, key); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(true);
  });
  it("a basic attack consumes W but its spell shield blocks only the detonation, without a mana refund", () => {
    const w = worldFor(ez.spec); w.units[0].resource = 100; hit(w, "W"); state(w, "spellShield"); startAttack(w, w.units[0]); through(w, 30);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad); expect(w.units[0].resource).toBe(100); expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(false);
  });
  it("Flux cannot detonate at its exact four-second expiry", () => {
    const w = worldFor(ez.spec); hit(w, "W"); w.tick = 120; hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBeCloseTo(120 + 1.3 * derive(w.units[0]).ad + 40);
  });
  it("E blinks first and selects the nearest actual pet instead of its owner", () => {
    const w = worldFor(ez.spec, 700), target = pet(w, 500); cast(w, "E", { direction: 1, distance: 475 }); through(w, 8);
    expect(w.units[0].x).toBe(475); expect(w.missiles.find((m) => m.source === "E")?.pet).toBe(target.id); through(w, 20);
    expect(target.hp).toBeCloseTo(5000 - 280 - 60 - 75); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].memory["ezreal:force"]).toBe(1);
  });
  it("a Flux-marked champion takes priority over a nearer pet and E refunds 130 mana on detonation", () => {
    const w = worldFor(ez.spec, 700), target = pet(w, 500); hit(w, "W"); w.units[0].resource = 200; cast(w, "E", { direction: 1, distance: 475 }); through(w, 8);
    expect(w.missiles.find((m) => m.source === "E")?.pet).toBeUndefined(); through(w, 25);
    expect(target.hp).toBe(5000); expect(w.units[1].totals.damageTaken).toBeCloseTo(415 + 490); expect(w.units[0].resource).toBe(260);
  });
  it("E acquires invisible targets and records ordinary launch-time sight without granting true sight", () => {
    const w = worldFor(ez.spec, 500); state(w, "invisible"); cast(w, "E", { direction: 1, distance: 300 }); through(w, 8);
    expect(w.units[1].statuses.some((s) => s.key === "ezreal:ordinarySight")).toBe(true); expect(canSee(w.units[1], w.units[0])).toBe(false); through(w, 25); expect(w.units[1].totals.damageTaken).toBeCloseTo(415);
  });
  it("E uses the moved completion position and rejects targets outside its 750 center range", () => {
    const w = worldFor(ez.spec, 1000); cast(w, "E", { direction: -1, distance: 475 }); w.units[0].x = 200; through(w, 8);
    expect(w.units[0].x).toBe(-275); expect(w.missiles.some((m) => m.source === "E")).toBe(false);
  });
  it("a projectile wall destroys E's already-launched bolt", () => {
    const w = worldFor(ez.spec, 600); cast(w, "E", { direction: 1, distance: 200 }); w.zones.push({ id: 500, owner: 1, kind: "projectileWall", x: 400, radius: 0, seenTick: 0, startTick: 0, endTick: 100 }); through(w, 30); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("Q is intercepted by a pet and applies its refund/passive to that contact", () => {
    const w = worldFor(ez.spec, 600), target = pet(w, 200); w.units[0].cooldownReady.W = 300; cast(w, "Q"); through(w, 30);
    expect(target.hp).toBeCloseTo(5000 - 120 - 1.3 * derive(w.units[0]).ad - 40); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].cooldownReady.W).toBe(255); expect(w.units[0].memory["ezreal:force"]).toBe(1);
  });
  it("W passes ordinary summons instead of incorrectly attaching to them", () => {
    const w = worldFor(ez.spec, 600), target = pet(w, 200); cast(w, "W"); through(w, 35); expect(target.hp).toBe(5000); expect(target.statuses?.some((s) => s.key === "ezreal:flux") ?? false).toBe(false); expect(w.units[1].statuses.some((s) => s.key === "ezreal:flux")).toBe(true);
  });
  it("R pierces the pet with its 300-base minion formula and the champion with its full 750-base formula", () => {
    const w = worldFor(ez.spec, 600), target = pet(w, 200); cast(w, "R"); through(w, 50); expect(target.hp).toBeCloseTo(5000 - 510); expect(w.units[1].totals.damageTaken).toBeCloseTo(960); expect(w.units[0].memory["ezreal:force"]).toBe(2);
  });
  it("R keeps its start origin if Ezreal is displaced during the one-second cast", () => {
    const w = worldFor(ez.spec, 700); cast(w, "R"); w.units[0].x = 2000; through(w, 30); expect(w.missiles.find((m) => m.source === "R")?.x).toBe(0); through(w, 50); expect(w.units[1].totals.damageTaken).toBeCloseTo(960);
  });
  it("the policy does not cast Flux at a rival beyond its actual reach", () => {
    const w = worldFor(ez.spec, 5000); w.modes[0] = "fight"; expect(ez.spec.behavior!(perceive(w, 0))).not.toEqual({ kind: "cast", ability: "W" });
  });
  it("the budget stops crediting passive attacks at the actual attack-speed cap", () => {
    const capped = worldFor(ez.spec, 300, { ad: 100, attackSpeed: 10 }), uncapped = worldFor(ez.spec, 300, { ad: 100 });
    expect(derive(capped.units[0]).attackSpeed).toBe(ATTACK_SPEED_CAP);
    const atCap = ez.spec.budget!.damage!(capped.units[0], capped.units[1]).physical!;
    const withRoom = ez.spec.budget!.damage!(uncapped.units[0], uncapped.units[1]).physical!;
    expect(withRoom - atCap).toBeCloseTo(derive(uncapped.units[0]).ad * ez.spec.base.attackSpeed.ratio * .5);
  });
});

describe("Lucian pinned shots and channels", () => {
  it("retains all five wiki revisions and independently attributed versioned level-19 evidence", () => {
    expect(lu.evidence.map((e) => e.revid)).toEqual(expect.arrayContaining([4064854, 4064855, 3594941, 4008455, 4007670]));
    expect(lu.evidence.find((e) => e.text.includes('"mLevel":19'))).toMatchObject({ revid: 0, sourceSha256: "5fb83f89c40863507666081dfa5a5f5bfe24ebf3e6622e79b78386006b82b0a0" });
  });
  it("Q deals 250 + 100% bonus AD and has the level-eighteen 0.25-second cast time", () => {
    const w = worldFor(lu.spec); hit(w, "Q"); expect(w.units[1].totals.damageTaken).toBe(350); expect(ability(lu.spec, "Q").castTime).toBe(.25);
  });
  it("Q's initial unit-target range is 500 edge units even though its beam reaches 1000", () => {
    const w = worldFor(lu.spec, 1000); expect(canCast(w, w.units[0], ability(lu.spec, "Q"))).toBe(false); w.units[1].x = 500 + w.units[0].spec.base.radius + w.units[1].spec.base.radius; expect(canCast(w, w.units[0], ability(lu.spec, "Q"))).toBe(true);
  });
  it("an empowered basic and its level-twenty second shot total 170% AD", () => {
    const w = worldFor(lu.spec), ad = derive(w.units[0]).ad; w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 30); expect(w.units[1].totals.damageTaken).toBeCloseTo(1.7 * ad);
  });
  it("the secondary shot is delayed from the first launch and leaves the attack timer unchanged", () => {
    const w = worldFor(lu.spec); w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); const ready = w.units[0].attackReadyTick, action = w.units[0].action, launch = action?.kind === "windup" ? action.launchTick : 0; through(w, launch + 7);
    expect(w.missiles.filter((m) => m.attack?.attackTag === "lucian:lightslinger")).toHaveLength(0); through(w, launch + 8); expect(w.missiles.some((m) => m.attack?.baseDamageScale === .7)).toBe(true); expect(w.units[0].attackReadyTick).toBe(ready);
  });
  it("both Lightslinger projectiles independently refund two seconds of E at contact", () => {
    const w = worldFor(lu.spec); w.units[0].cooldownReady.E = 420; w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 30); expect(w.units[0].cooldownReady.E).toBe(300);
  });
  it("an ordinary unempowered attack does not refund E", () => {
    const w = worldFor(lu.spec); w.units[0].cooldownReady.E = 420; startAttack(w, w.units[0]); through(w, 30); expect(w.units[0].cooldownReady.E).toBe(420);
  });
  it("the secondary attack retains a full on-hit packet instead of reducing it to seventy percent", () => {
    const w = worldFor(lu.spec); w.units[0].spec = { ...w.units[0].spec, attack: { ...w.units[0].spec.attack, onHit: [{ type: "damage", damageType: "magic", amount: { base: 50 } }] } }; w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 30); expect(w.units[1].totals.damageTaken).toBeCloseTo(1.7 * derive(w.units[0]).ad + 100);
  });
  it("both shots use the current default two-times critical damage without scaling on-hits", () => {
    const w = worldFor(lu.spec, 300, { ad: 100, critChance: 1 }); w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 30); expect(w.units[1].totals.damageTaken).toBeCloseTo(3.4 * derive(w.units[0]).ad);
  });
  it("the delayed shot is a real projectile that can be destroyed after the first attack lands", () => {
    const w = worldFor(lu.spec, 200), ad = derive(w.units[0]).ad; w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 11); w.zones.push({ id: 500, owner: 1, kind: "projectileWall", x: 100, radius: 0, startTick: w.tick, endTick: 200, seenTick: w.tick }); through(w, 30); expect(w.units[1].totals.damageTaken).toBeCloseTo(ad);
  });
  it("both shots are prevented by blind and no E refund leaks through", () => {
    const w = worldFor(lu.spec); w.units[0].cooldownReady.E = 420; w.units[0].memory["lucian:lightslinger:until"] = 105; applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "blind", duration: 5 }, { scale: 1 }); startAttack(w, w.units[0]); through(w, 30); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].cooldownReady.E).toBe(420);
  });
  it("a dead original pet retargets the second shot onto the champion", () => {
    const w = worldFor(lu.spec, 300), target = pet(w, 150, 1); w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0], target); through(w, 35); expect(w.pets).not.toContain(target); expect(w.units[1].totals.damageTaken).toBeCloseTo(.7 * derive(w.units[0]).ad);
  });
  it("an original pet receives the sourced full-AD minion second shot and one-second refunds per shot", () => {
    const w = worldFor(lu.spec, 300), target = pet(w, 150); w.units[0].cooldownReady.E = 420; w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0], target); through(w, 30); expect(target.hp).toBeCloseTo(5000 - 2 * derive(w.units[0]).ad); expect(w.units[0].cooldownReady.E).toBe(360); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("the delayed schedule is independently copied when a fight branches", () => {
    const w = worldFor(lu.spec); w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 9); const copy = cloneWorld(w); state(w, "dodgeAttacks"); through(w, 35); through(copy, 35); expect(w.units[1].totals.damageTaken).toBeLessThan(copy.units[1].totals.damageTaken);
  });
  it("the 3.5-second empowerment expires at its exact tick", () => {
    const w = worldFor(lu.spec); w.units[0].memory["lucian:lightslinger:until"] = 105; w.tick = 105; startAttack(w, w.units[0]); through(w, 135); expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(w.units[0]).ad);
  });
  it("W deals 215 + 90% AP and does not grant its own new-mark movement proc", () => {
    const w = worldFor(lu.spec); hit(w, "W"); expect(w.units[1].totals.damageTaken).toBe(305); expect(w.units[1].statuses.find((s) => s.key === "lucian:blaze")?.endTick).toBe(180); expect(w.units[0].statuses.some((s) => s.key === "moveSpeedFlat")).toBe(false);
  });
  it("a shield blocks W damage while the full six-second mark survives", () => {
    const w = worldFor(lu.spec); state(w, "spellShield"); hit(w, "W"); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[1].statuses.find((s) => s.key === "lucian:blaze")?.endTick).toBe(180); startAttack(w, w.units[0]); through(w, 30); expect(w.units[0].statuses.find((s) => s.memoKey === "buff:lucian:blaze")?.value).toBe(80);
  });
  it("accepted enemy immobilization grants two Vigilance charges, with a four-charge cap", () => {
    const w = worldFor(lu.spec); for (let i = 0; i < 3; i++) applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); expect(w.units[0].memory["lucian:vigilance"]).toBe(4);
  });
  it("CC immunity and a target outside 1000 center units grant no Vigilance", () => {
    const w = worldFor(lu.spec); state(w, "ccImmune"); applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); expect(w.units[0].memory["lucian:vigilance"]).toBeUndefined(); w.units[1].statuses = []; w.units[1].x = 1001; applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); expect(w.units[0].memory["lucian:vigilance"]).toBeUndefined();
  });
  it("Vigilance's two actual shots each add 5 + 15% total AD", () => {
    const w = worldFor(lu.spec), ad = derive(w.units[0]).ad; applyEffect(w, w.units[0], w.units[1], { type: "cc", cc: "root", duration: 1 }, { scale: 1 }); w.units[0].memory["lucian:lightslinger:until"] = 105; startAttack(w, w.units[0]); through(w, 30); expect(w.units[1].totals.damageTaken).toBeCloseTo(1.7 * ad + 2 * (5 + .15 * ad)); expect(w.units[0].memory["lucian:vigilance"]).toBe(0);
  });
  it.each([[0, 22], [.1, 24], [.5, 33], [1, 44]])("Culling at critical chance %f emits exactly %i independently travelling shots", (critChance, count) => {
    const w = worldFor(lu.spec, 300, { ad: 100, ap: 100, critChance }); cast(w, "R"); through(w, 90); expect(w.units[0].memory["culling:fired"]).toBe(count); through(w, 110); expect(w.units[1].totals.damageTaken).toBeCloseTo(count * (45 + .25 * derive(w.units[0]).ad + 15));
  });
  it("Culling has no immediate damage packet and its first 22-shot bullet launches at tick five", () => {
    const w = worldFor(lu.spec); cast(w, "R"); through(w, 4); expect(w.missiles).toHaveLength(0); expect(w.units[1].totals.damageTaken).toBe(0); through(w, 5); expect(w.missiles).toHaveLength(1);
  });
  it("Culling snapshots count at declaration but each bullet evaluates AD at impact", () => {
    const w = worldFor(lu.spec, 1000, { ad: 0, ap: 0 }); cast(w, "R"); through(w, 5); w.units[0].spec = { ...w.units[0].spec, bonus: { ad: 200, critChance: 1 } }; through(w, 110); expect(w.units[0].memory["culling:fired"]).toBe(22); expect(w.units[1].totals.damageTaken).toBeCloseTo(22 * (45 + .25 * derive(w.units[0]).ad));
  });
  it("Culling remains fixed facing when the enemy crosses behind Lucian", () => {
    const w = worldFor(lu.spec); cast(w, "R"); w.units[1].x = -300; through(w, 110); expect(w.units[1].totals.damageTaken).toBe(0); expect(w.units[0].facing).toBe(1);
  });
  it("one spell shield negates exactly one bullet", () => {
    const w = worldFor(lu.spec); state(w, "spellShield"); cast(w, "R"); through(w, 110); expect(w.units[1].totals.damageTaken).toBeCloseTo(21 * (45 + .25 * derive(w.units[0]).ad + 15));
  });
  it("a pet intercepts each Culling bullet with its doubled minion damage and protects its owner", () => {
    const w = worldFor(lu.spec, 600), target = pet(w, 200, 50000); cast(w, "R"); through(w, 110); expect(target.hp).toBeCloseTo(50000 - 22 * (90 + .5 * derive(w.units[0]).ad + 30)); expect(w.units[1].totals.damageTaken).toBe(0);
  });
  it("root preserves Culling while silence interrupts all later launches", () => {
    const w = worldFor(lu.spec); cast(w, "R"); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "root", duration: 2 }, { scale: 1 }); expect(w.units[0].action?.kind).toBe("channel"); through(w, 20); applyEffect(w, w.units[1], w.units[0], { type: "cc", cc: "silence", duration: 2 }, { scale: 1 }); const fired = w.units[0].memory["culling:fired"]; through(w, 110); expect(w.units[0].memory["culling:fired"]).toBe(fired); expect(w.units[0].action).toBeUndefined(); expect(w.units[0].cooldownReady.R).toBeLessThan(Infinity);
  });
  it("E overlays the channel without extending its duration or changing its firing direction", () => {
    const w = worldFor(lu.spec); cast(w, "R"); through(w, 15); expect(canCast(w, w.units[0], ability(lu.spec, "E"))).toBe(true); cast(w, "E", { direction: -1, distance: 200 }); expect(w.units[0].action?.kind).toBe("dash"); through(w, 90); expect(w.units[0].memory["culling:fired"]).toBe(22); expect(w.units[0].action).toBeUndefined(); expect(w.units[0].memory["culling:direction"]).toBe(1); expect(w.units[0].cooldownReady.R).toBe(2790);
  });
  it.each([[425, 425], [200, 100 - lu.spec.base.pathingRadius]])("E requested at %i crosses intervening terrain or clips its obstructed endpoint at %i", (requested, expected) => {
    const w = worldFor(lu.spec, 1000);
    w.terrain.push({ id: w.nextId++, owner: 1, from: 100, to: 250, endTick: 100 });
    cast(w, "E", { direction: 1, distance: requested }); through(w, 15);
    expect(w.units[0].x).toBeCloseTo(expected);
    expect(w.units[0].action).toBeUndefined();
  });
  it("E's terrain endpoint behavior reflects with the requested direction", () => {
    const w = worldFor(lu.spec, -1000);
    w.terrain.push({ id: w.nextId++, owner: 1, from: -250, to: -100, endTick: 100 });
    cast(w, "E", { direction: 1, distance: 200 }); through(w, 15);
    expect(w.units[0].x).toBeCloseTo(-100 + lu.spec.base.pathingRadius);
  });
  it("Q and W cannot be cast during Culling, and recast unlocks at 0.75 seconds", () => {
    const w = worldFor(lu.spec); cast(w, "R"); expect(canCast(w, w.units[0], ability(lu.spec, "Q"))).toBe(false); expect(canCast(w, w.units[0], ability(lu.spec, "W"))).toBe(false); expect(canCast(w, w.units[0], ability(lu.spec, "Rend"))).toBe(false); w.tick = 23; expect(canCast(w, w.units[0], ability(lu.spec, "Rend"))).toBe(true);
  });
  it("Culling's cooldown begins after the full three-second channel", () => {
    const w = worldFor(lu.spec); cast(w, "R"); through(w, 89); expect(w.units[0].cooldownReady.R).toBe(Infinity); through(w, 90); expect(w.units[0].cooldownReady.R).toBe(90 + 90 * 30);
  });
  it("actual Culling missiles appear as separate pending threats", () => {
    const w = worldFor(lu.spec, 1000); w.settings.reactionTime = 0; cast(w, "R"); through(w, 10); const threats = perceive(w, 1).threats.filter((t) => t.source === "Rbullet"); expect(threats.length).toBeGreaterThan(0); expect(threats.every((t) => t.projectile && t.spellShieldable)).toBe(true);
  });
  it("the first-bullet forecast contains one packet after launch delay and flight", () => {
    const w = worldFor(lu.spec, 1000); w.settings.reactionTime = 0;
    // A visible declaration uses the ordinary cast-threat path; runtime R itself has no cast time.
    w.units[0].action = { kind: "cast", ability: "R", startTick: 0, endTick: 0 };
    const threat = perceive(w, 1).threats.find((t) => t.source === "R")!;
    expect(threat.damage).toBeCloseTo(45 + .25 * derive(w.units[0]).ad + 15);
    expect(threat.eta).toBe(Math.ceil(5 + (1000 - 35 - w.units[1].spec.base.radius) / 2800 * 30));
  });
  it("both budget callbacks can run after the source context has sealed", () => {
    for (const spec of [ez.spec, lu.spec]) { const w = worldFor(spec); const hint = spec.budget!.damage!(w.units[0], w.units[1]); expect(Object.values(hint).every((v) => Number.isFinite(v) && v! >= 0)).toBe(true); }
  });
  it("E is blocked during Q's cast but overlays W's cast", () => {
    const w = worldFor(lu.spec); cast(w, "Q"); expect(canCast(w, w.units[0], ability(lu.spec, "E"))).toBe(false); w.units[0].action = undefined; cast(w, "W"); expect(canCast(w, w.units[0], ability(lu.spec, "E"))).toBe(true);
  });
  it("internal damage packets are unavailable as free player casts", () => {
    for (const [spec, key] of [[ez.spec, "Wpop"], [lu.spec, "Rbullet"]] as const) { const w = worldFor(spec); expect(canCast(w, w.units[0], ability(spec, key))).toBe(false); }
  });
  it.each([["Ezreal", ez.spec], ["Lucian", lu.spec]] as const)("%s spends the full real budget, preserves reflection and uses all four slots", (_name, spec) => {
    const prices = (JSON.parse(readFileSync(new URL("../../data/16.20/rules.json", import.meta.url), "utf8")) as { statPrices: StatPrices }).statPrices;
    const darius = kit("Darius").spec, forward = simulateMatchup(spec, darius, 15000, prices, { settings: { log: true } }), reverse = simulateMatchup(darius, spec, 15000, prices);
    expect(forward.builds).toEqual([reverse.builds[1], reverse.builds[0]]); for (const build of forward.builds) expect(Object.values(build.spent).reduce((s, v) => s + v, 0)).toBeCloseTo(15000, 8);
    expect(Math.abs(forward.score + reverse.score)).toBeLessThan(1e-12); const reflected = [1, 0, 2, 3, 4, 5];
    for (const [i, scenario] of forward.scenarios.entries()) { const other = reverse.scenarios[reflected[i]!]!; if (scenario.score === undefined) expect(other.score).toBeUndefined(); else expect(Math.abs(scenario.score + other.score!)).toBeLessThan(1e-12); }
    const casts = forward.scenarios.flatMap((s) => s.outcomes.flatMap((o) => o.timeline.filter((e) => e.side === 0 && e.text.startsWith("casts ")).map((e) => e.text)));
    for (const key of ["Q", "W", "E", "R"]) expect(casts).toContain(`casts ${ability(spec, key).name}`); expect(casts.some((text) => text.includes("detonation"))).toBe(false);
  }, 60000);
});
