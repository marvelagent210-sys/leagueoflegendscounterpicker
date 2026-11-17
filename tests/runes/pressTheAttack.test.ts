import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { abilityHit, applyEffect, attackHit, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive } from "../../engine/sim/derived";
import { setForm } from "../../engine/sim/forms";
import { petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { spawnPet } from "../../engine/sim/pets";
import { createWorld, runWorld } from "../../engine/sim/simulate";
import type { AbilitySpec, DamageReport, FighterSpec, KitHooks, PetSpec } from "../../engine/sim/spec";
import { cloneWorld, newUnit, type AttackHitOptions, type World } from "../../engine/sim/state";
import { composeHooks, mapForms } from "../../items/equip";
import { loadCombatRuneRules } from "../../pipeline/runes/effects";
import type { RuneCatalog } from "../../runes/catalog";
import type { CombatRuneRules } from "../../runes/effectRules";
import { equipRuneEffects, runeMatchupSpecs } from "../../runes/effects";
import { buildPressTheAttack, checkedPressTheAttackRules } from "../../runes/pressTheAttack";
import { idle, lasting } from "../sim/helpers";
import { ability, fighter } from "../sim/kits";

const DAMAGE = 2960 / 17;
const rules = { pressTheAttack: { modelLevel: 20, damage: DAMAGE, hitsRequired: 3, stackDuration: 4,
  cooldown: 6, damageIncrease: 0.08, combatDuration: 5, combatExpiryModel: "last-qualified-activity",
  adaptiveDamageModel: "current-derived-bonus-ad-vs-ap", activationFrameModel: "simulation-tick" } } satisfies Pick<CombatRuneRules, "pressTheAttack">;
const prefix = "rune:press-the-attack:";
const petSpec: PetSpec = { kind: "fixture", name: "Fixture pet", hp: 100, armor: 0, mr: 0,
  radius: 30, moveSpeed: 0, duration: Infinity };
const blank = (extra: Partial<FighterSpec> = {}): FighterSpec => ({
  ...fighter({ base: { hp: 100000, hpRegen: 0, armor: 0, mr: 0, resource: 1000 } }), adaptiveType: "Physical", ...extra,
});
function arena(self = blank(), enemy = blank(), input = rules): World {
  const built = buildPressTheAttack(self, input);
  return createWorld({ fighters: [
    { ...self, hooks: composeHooks(self.hooks, [built.hooks], [], false) },
    { ...enemy, hooks: composeHooks(enemy.hooks, built.enemyHooks, [], false) },
  ], distance: 300, modes: ["idle", "idle"], settings: { log: true, maxSeconds: 10 } });
}
function hit(world: World, at = world.tick, options: AttackHitOptions = {}): void {
  world.tick = at;
  attackHit(world, world.units[0], world.units[1], false, [], undefined, false, options);
}
function activate(world: World): void { hit(world, 0); hit(world, 1); hit(world, 2); }
function damage(world: World, at: number, amount = 100, type: "physical" | "magic" | "true" = "true", label?: string): number {
  world.tick = at;
  return dealDamage(world, world.units[0], world.units[1], amount, type, label ? { ability: label } : {});
}
const procs = (world: World) => world.log.filter(entry => entry.side === 0 && entry.text.startsWith("Press the Attack deals "));
const stacks = (world: World) => world.units[0].memory[prefix + "stacks"] ?? 0;
const spell = (flags: AbilitySpec["flags"] = { appliesOnHit: true, pressTheAttack: true }): AbilitySpec => ability({
  key: "Q", delivery: { kind: "target", range: 1000 }, flags,
  onHit: [{ type: "damage", damageType: "true", amount: { base: 10 } }],
});
function contact(world: World, spec = spell(), at = world.tick, scale = 1): void {
  world.tick = at; abilityHit(world, world.units[0], world.units[1], spec, spec.onHit ?? [], scale);
}
function addOutgoing(world: World, ...values: number[]): void {
  world.units[0].statuses.push(...values.map(value => lasting("stat", "damageDealt", value)));
}

describe("Press the Attack native applications and consumption", () => {
  it("consumes exactly three connected whole attacks and uses the explicit level-20 formula", () => {
    const world = arena(); hit(world, 0); hit(world, 1);
    expect(stacks(world)).toBe(2); expect(procs(world)).toHaveLength(0);
    hit(world, 2);
    expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(1);
    expect(100000 - world.units[1].hp).toBeCloseTo(300 + DAMAGE, 10);
    expect(DAMAGE).toBeGreaterThan(160);
    expect(world.units[0].memory[prefix + "ready"]).toBe(182);
  });

  it("does not confuse three split damage packets with three on-hit applications", () => {
    const world = arena();
    attackHit(world, world.units[0], world.units[1], false, [], { physical: 0.4, magic: 0.3, true: 0.3 });
    expect(stacks(world)).toBe(1); expect(procs(world)).toHaveLength(0);
    expect(100000 - world.units[1].hp).toBeCloseTo(100, 10);
  });

  it("does not count attached on-hit damage packets as extra applications", () => {
    const world = arena(blank({ attack: { ...blank().attack, onHit: [
      { type: "damage", damageType: "physical", amount: { base: 5 } },
      { type: "damage", damageType: "magic", amount: { base: 7 } },
      { type: "damage", damageType: "true", amount: { base: 9 } },
    ] } }));
    hit(world); expect(stacks(world)).toBe(1); expect(procs(world)).toHaveLength(0);
    expect(100000 - world.units[1].hp).toBe(121);
  });

  it.each([2, 3])("counts %s explicitly declared strike applications independently within one attack", applications => {
    const world = arena(); hit(world, 0, { onHitApplications: applications });
    expect(procs(world)).toHaveLength(applications === 3 ? 1 : 0);
    expect(stacks(world)).toBe(applications === 3 ? 0 : 2);
    expect(100000 - world.units[1].hp).toBeCloseTo(100 + (applications === 3 ? DAMAGE : 0), 10);
  });

  it("does not infer stacks from plain ability damage or an unclassified on-hit ability", () => {
    const world = arena();
    for (let at = 0; at < 3; at++) contact(world, spell({ appliesOnHit: true }), at);
    expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(0);
    for (let at = 3; at < 6; at++) contact(world, spell({ pressTheAttack: true }), at);
    expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(0);
  });

  it("allows explicit single-target on-hit abilities without scaling the proc by on-hit effectiveness", () => {
    const reports: DamageReport[] = [];
    const world = arena(blank({ attack: { ...blank().attack, onHit: [{ type: "damage", damageType: "true", amount: { base: 50 } }] },
      hooks: { onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); } } }));
    const spec = { ...spell(), onHitScale: 0.12 };
    contact(world, spec, 0); contact(world, spec, 1); contact(world, spec, 2);
    expect(reports).toHaveLength(1); expect(reports[0]!.raw).toBeCloseTo(DAMAGE, 12);
    expect(reports[0]!.ability).toBe("Press the Attack");
    expect(100000 - world.units[1].hp).toBeCloseTo(30 + 18 + DAMAGE, 9);
  });

  it("does not recursively trigger ability-hit hooks from the rune's proc", () => {
    const world = arena(blank({ hooks: { onAbilityHit(ctx) { ctx.memory.abilityHits = Number(ctx.memory.abilityHits ?? 0) + 1; } } }));
    contact(world, spell(), 0); contact(world, spell(), 1); contact(world, spell(), 2);
    expect(world.units[0].memory.abilityHits).toBe(3); expect(procs(world)).toHaveLength(1);
  });

  it("excludes explicitly classified collateral basics", () => {
    const world = arena(); hit(world, 0, { pressTheAttack: false }); hit(world, 1, { pressTheAttack: false });
    expect(stacks(world)).toBe(0); hit(world, 2); expect(stacks(world)).toBe(1);
  });
});

describe("Press the Attack native hit defenses", () => {
  it.each(["dodgeAttacks", "parry", "stasis", "untargetable"])("does not stack through %s", state => {
    const world = arena(); world.units[1].statuses.push(lasting("state", state));
    hit(world, 0); hit(world, 1); hit(world, 2);
    expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(0);
  });

  it("does not stack an attack whose declaration was blinded", () => {
    const world = arena();
    attackHit(world, world.units[0], world.units[1], true, []);
    expect(stacks(world)).toBe(0);
  });

  it("counts damage-blocked connected attacks and still applies the independent proc", () => {
    const world = arena(); world.units[1].statuses.push(lasting("state", "blockAttacks"));
    activate(world); expect(procs(world)).toHaveLength(1); expect(stacks(world)).toBe(0);
    expect(100000 - world.units[1].hp).toBeCloseTo(DAMAGE, 10);
  });

  it("denies a whole empowered attack consumed by a spell shield", () => {
    const world = arena(); world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    hit(world, 0, { spellShield: true }); expect(stacks(world)).toBe(0);
    hit(world, 1); expect(stacks(world)).toBe(1);
  });

  it("denies a shield-prevented on-hit ability without denying later accepted contacts", () => {
    const world = arena(); world.units[1].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    contact(world, spell({ appliesOnHit: true, pressTheAttack: true, spellShield: true }), 0);
    expect(stacks(world)).toBe(0);
    contact(world, spell(), 1); expect(stacks(world)).toBe(1);
  });

  it("counts connections absorbed entirely by ordinary damage shields", () => {
    const world = arena(); world.units[1].statuses.push(lasting("shield", "fixture", 10000));
    activate(world); expect(procs(world)).toHaveLength(1); expect(world.units[1].hp).toBe(100000);
    expect(world.units[1].totals.absorbed).toBeCloseTo(300 + DAMAGE, 10);
  });
});

describe("Press the Attack exact local stack and cooldown boundaries", () => {
  it("refreshes the four-second stack window on the second application", () => {
    const world = arena(); hit(world, 0); hit(world, 119); hit(world, 238);
    expect(procs(world)).toHaveLength(1);
  });

  it("expires stacks at the exact refreshed 120-tick deadline", () => {
    const world = arena(); hit(world, 0); hit(world, 119); hit(world, 239);
    expect(procs(world)).toHaveLength(0); expect(stacks(world)).toBe(1);
    expect(world.units[0].memory[prefix + "expiry"]).toBe(359);
  });

  it("can expire during upkeep without requiring another attack", () => {
    const world = arena(); hit(world, 17); world.tick = 137;
    world.units[0].spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(stacks(world)).toBe(0); expect(world.units[0].memory[prefix + "expiry"]).toBeUndefined();
  });

  it("starts its cooldown after consumption and accepts a first stack at the exact 180-tick deadline", () => {
    const world = arena(blank({ bonus: { abilityHaste: 500 } })); activate(world);
    hit(world, 181); expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(1);
    hit(world, 182); expect(stacks(world)).toBe(1);
    hit(world, 183); hit(world, 184); expect(procs(world)).toHaveLength(2);
    expect(world.units[0].memory[prefix + "ready"]).toBe(364);
  });
});

describe("Press the Attack activation tick and subsequent proc amplification", () => {
  it.each([false, true])("excludes the third basic and every activation-tick packet with onHitBeforeDamage=%s", before => {
    const world = arena(blank({ attack: { ...blank().attack, onHitBeforeDamage: before } })); activate(world);
    expect(100000 - world.units[1].hp).toBeCloseTo(300 + DAMAGE, 10);
    expect(damage(world, 2)).toBe(100);
    expect(damage(world, 3)).toBeCloseTo(108, 10);
  });

  it("lets a later PTA proc benefit from the buff without resetting its original activation tick", () => {
    const reports: DamageReport[] = [];
    const world = arena(blank({ hooks: { onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); } } }));
    activate(world); damage(world, 140, 0);
    hit(world, 182); hit(world, 183); hit(world, 184);
    expect(reports).toHaveLength(2); expect(reports[0]!.amount).toBeCloseTo(DAMAGE, 10);
    expect(reports[1]!.amount).toBeCloseTo(DAMAGE * 1.08, 10);
    expect(world.units[0].memory[prefix + "active"]).toBe(2);
  });

  it.each(["physical", "magic", "true"] as const)("amplifies later %s packets", type => {
    const world = arena(); activate(world); expect(damage(world, 3, 100, type)).toBeCloseTo(108, 10);
  });

  it("amplifies current Ignite true damage and excludes the exact Smite label", () => {
    const world = arena(); activate(world);
    expect(damage(world, 3, 100, "true", "Ignite")).toBeCloseTo(108, 10);
    expect(damage(world, 4, 100, "true", "Smite")).toBe(100);
  });

  it("adds to the outgoing status bucket rather than multiplying it", () => {
    const world = arena(); activate(world); addOutgoing(world, 0.1, 0.2);
    expect(damage(world, 3, 100, "magic")).toBeCloseTo(138, 10);
  });

  it("matches the true-damage bucket's exclusion of outgoing reductions", () => {
    const world = arena(); activate(world); addOutgoing(world, -0.5, 0.2);
    expect(damage(world, 3, 100, "true")).toBeCloseTo(128, 10);
    expect(damage(world, 4, 100, "physical")).toBeCloseTo(78, 10);
  });

  it("rejects an unsupported nonpositive outgoing factor rather than silently dropping its bonus", () => {
    const world = arena(); activate(world); addOutgoing(world, -1);
    expect(() => damage(world, 3, 100, "magic")).toThrow(/nonpositive/);
  });

  it("combines PTA and a compatible health rune in one additive outgoing bucket", async () => {
    const catalog = JSON.parse(readFileSync("data/16.21/rune-catalog.json", "utf8")) as RuneCatalog;
    const full = await loadCombatRuneRules("16.21", catalog);
    const mine = equipRuneEffects(blank(), [8005, 8014], catalog, full);
    const theirs = equipRuneEffects(blank(), [], catalog, full);
    const world = createWorld({ fighters: runeMatchupSpecs(mine, theirs), distance: 300, modes: ["idle", "idle"], settings: { log: true } });
    activate(world); world.units[1].hp = 10000;
    addOutgoing(world, 0.1);
    expect(damage(world, 3, 100, "magic")).toBeCloseTo(126, 10);
  });
});

describe("Press the Attack adaptive proc damage", () => {
  it.each([
    ["Physical", {}, "physical"], ["Magic", {}, "magic"],
    ["Magic", { ad: 100, ap: 99 }, "physical"], ["Physical", { ad: 99, ap: 100 }, "magic"],
    ["Physical", { ad: 100, ap: 100 }, "physical"], ["Magic", { ad: 100, ap: 100 }, "magic"],
  ] as const)("compares bonus AD/AP with %s tie type, stats %j", (adaptiveType, bonus, expected) => {
    const reports: DamageReport[] = [];
    const world = arena(blank({ adaptiveType, bonus, hooks: { onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); } } }));
    activate(world); expect(reports).toHaveLength(1); expect(reports[0]!.damageType).toBe(expected);
    expect(reports[0]!.raw).toBeCloseTo(DAMAGE, 12);
  });

  it("samples changing derived stats at proc delivery rather than selecting once at fight start", () => {
    const reports: DamageReport[] = [];
    const world = arena(blank({ adaptiveType: "Physical", bonus: { ad: 100 }, hooks: {
      onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); },
    } }));
    hit(world, 0); hit(world, 1);
    applyEffect(world, world.units[0], world.units[0], { type: "stat", stat: "AP", amount: { base: 101 }, duration: 10 }, { scale: 1 });
    hit(world, 2); expect(reports[0]!.damageType).toBe("magic");
    expect(derive(world.units[0]).bonusAd).toBe(100);
  });

  it("uses mitigation for the selected adaptive damage type", () => {
    const reports: DamageReport[] = [];
    const world = arena(blank({ adaptiveType: "Magic", hooks: { onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); } } }),
      blank({ base: { ...blank().base, armor: 0, mr: 100 } }));
    activate(world); expect(reports[0]!.amount).toBeCloseTo(DAMAGE / 2, 10);
  });
});

describe("Press the Attack qualified combat activity clock", () => {
  it("expires at the single five-second deadline without adding a second timer", () => {
    const world = arena(); activate(world);
    expect(damage(world, 152)).toBe(100);
    expect(damage(world, 153)).toBe(100);
    expect(world.units[0].memory[prefix + "active"]).toBeUndefined();
  });

  it("amplifies immediately before its deadline and refreshes from that actual activity", () => {
    const world = arena(); activate(world);
    expect(damage(world, 151)).toBeCloseTo(108, 10);
    expect(damage(world, 300)).toBeCloseTo(108, 10);
  });

  it("qualifies zero raw damage despite no HP loss, and does not turn it into a positive damage hook", () => {
    const world = arena(); activate(world); world.tick = 140;
    expect(dealDamage(world, world.units[0], world.units[1], 0, "magic")).toBe(0);
    expect(world.units[0].memory[prefix + "activity"]).toBe(140);
    expect(damage(world, 200)).toBeCloseTo(108, 10);
  });

  it("qualifies accepted CC without requiring accompanying damage", () => {
    const world = arena(); activate(world); world.tick = 140;
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "slow", duration: 1, strength: 0.1 }, { scale: 1 });
    expect(world.units[0].memory[prefix + "activity"]).toBe(140);
    expect(damage(world, 200)).toBeCloseTo(108, 10);
  });

  it("does not refresh from spell-shield-prevented CC", () => {
    const world = arena(); activate(world); world.tick = 140;
    world.units[0].statuses.push(lasting("state", "spellShield", 0, { charges: 1 }));
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "slow", duration: 1, strength: 0.1, spellShield: true }, { scale: 1 });
    expect(world.units[0].memory[prefix + "activity"]).toBe(2);
    expect(damage(world, 200)).toBe(100);
  });

  it.each(["invulnerable", "stasis", "parry"])("leaves %s denied activity outside the bounded native clock", defense => {
    const world = arena(); activate(world); world.tick = 140;
    world.units[1].statuses.push(lasting("state", defense));
    dealDamage(world, world.units[0], world.units[1], 0, "magic");
    expect(world.units[0].memory[prefix + "activity"]).toBe(2);
    world.units[1].statuses = [];
    expect(damage(world, 200)).toBe(100);
  });

  it("refreshes from a real ordinary owned-pet hit without giving its owner a stack", () => {
    const world = arena(); activate(world); world.tick = 140;
    const pet = spawnPet(world, world.units[0], petSpec, world.units[0].x);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 10 } }], false);
    expect(world.units[0].memory[prefix + "activity"]).toBe(140); expect(stacks(world)).toBe(0);
    expect(damage(world, 200)).toBeCloseTo(108, 10);
  });

  it("does not refresh from actual clone actors", () => {
    const world = arena(); activate(world); world.tick = 140;
    const pet = spawnPet(world, world.units[0], { ...petSpec, unitClass: "clone" }, world.units[0].x);
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 10 } }], false);
    expect(world.units[0].memory[prefix + "activity"]).toBe(2);
    expect(damage(world, 200)).toBe(100);
  });

  it("does not amplify pet damage through the chosen body-only inheritance policy", () => {
    const world = arena(); activate(world); world.tick = 3;
    const pet = spawnPet(world, world.units[0], petSpec, world.units[0].x), before = world.units[1].hp;
    petCombatHit(world, pet, world.units[1], [{ type: "damage", damageType: "true", amount: { base: 100 } }], false);
    expect(before - world.units[1].hp).toBe(100);
  });

  it("does not let late CC revive a buff that expired before that activity", () => {
    const world = arena(); activate(world); world.tick = 152;
    applyEffect(world, world.units[1], world.units[0], { type: "cc", cc: "slow", duration: 1, strength: 0.1 }, { scale: 1 });
    expect(world.units[0].memory[prefix + "active"]).toBeUndefined(); expect(damage(world, 153)).toBe(100);
  });
});

describe("Press the Attack actual bodies, copies and lifecycle", () => {
  it("does not stack against a real clone body or a pet body", () => {
    const world = arena();
    for (const unitClass of [undefined, "clone"] as const) {
      const pet = spawnPet(world, world.units[1], { ...petSpec, hp: 100000, ...(unitClass ? { unitClass } : {}) }, world.units[1].x);
      const victim = petFormulaTarget(pet, world.units[0], world.tick);
      attackHit(world, world.units[0], victim, false, [], undefined, false, { onHitApplications: 3 });
    }
    expect(stacks(world)).toBe(0); expect(procs(world)).toHaveLength(0);
  });

  it("does not equip inherited runtime state on a detached noncanonical actor", () => {
    const world = arena(), detached = newUnit(world.units[0].spec, 0, 0, 100000, 1000);
    attackHit(world, detached, world.units[1], false, [], undefined, false, { onHitApplications: 3 });
    expect(detached.memory[prefix + "active"]).toBeUndefined(); expect(stacks(world)).toBe(0);
  });

  it("copies primitive stack/cooldown/buff state without sharing subsequent mutations", () => {
    const world = arena(); hit(world, 0); hit(world, 1); const copy = cloneWorld(world);
    hit(copy, 2); expect(procs(copy)).toHaveLength(1); expect(stacks(world)).toBe(2);
    expect(world.units[0].memory[prefix + "active"]).toBeUndefined();
    hit(world, 121); expect(procs(world)).toHaveLength(0); expect(stacks(world)).toBe(1);
    expect(copy.units[0].memory[prefix + "active"]).toBe(2);
  });

  it("preserves body stacks across forms and reads the new form's adaptive tie type", () => {
    const first: FighterSpec = { ...blank(), id: "first", form: "first" }, next: FighterSpec = { ...blank(), id: "next", form: "next", adaptiveType: "Magic" };
    const forms = { first, next };
    first.forms = forms; next.forms = forms;
    const reports: DamageReport[] = [];
    const equipped = mapForms(first, form => {
      const built = buildPressTheAttack(form, rules);
      return { ...form, hooks: composeHooks({ onDamageDealt(ctx) { if (ctx.ability === "Press the Attack") reports.push(ctx); } }, [built.hooks], [], false) };
    });
    const built = buildPressTheAttack(first, rules);
    const world = createWorld({ fighters: [equipped, { ...blank(), hooks: composeHooks(undefined, built.enemyHooks, [], false) }], distance: 300, modes: ["idle", "idle"], settings: { log: true } });
    hit(world, 0); hit(world, 1); setForm(world, world.units[0], "next"); hit(world, 2);
    expect(procs(world)).toHaveLength(1); expect(reports[0]!.damageType).toBe("magic");
  });

  it("clears stacks and buff on the first dead upkeep, with dead-owner amplification immediately denied", () => {
    const world = arena(); activate(world); world.tick = 3;
    dealDamage(world, world.units[1], world.units[0], 200000, "true");
    expect(world.units[0].hp).toBeLessThanOrEqual(0);
    expect(damage(world, 4)).toBe(100);
    world.units[0].spec.hooks!.onTick!(hookContext(world, world.units[0]));
    expect(world.units[0].memory[prefix + "active"]).toBeUndefined(); expect(stacks(world)).toBe(0);
  });

  it("does not prolong an otherwise ended duel to wait for rune timers", () => {
    const world = arena(); activate(world); world.tick = 3;
    dealDamage(world, world.units[0], world.units[1], 200000, "true");
    const result = runWorld(world, [idle, idle]); expect(result.seconds).toBeLessThan(1);
  });
});

describe("Press the Attack defensive rule and event validation", () => {
  it.each([
    { damage: NaN }, { damage: Infinity }, { damage: 0 }, { hitsRequired: 4 }, { modelLevel: 18 },
    { stackDuration: 0 }, { cooldown: -1 }, { combatDuration: 1e-12 }, { damageIncrease: 1.01 },
    { combatExpiryModel: "two-clocks" }, { adaptiveDamageModel: "shard-memory" }, { activationFrameModel: "packet" },
  ])("rejects malformed or unreviewed rules %j", replacement => {
    expect(() => checkedPressTheAttackRules({ ...rules.pressTheAttack, ...replacement })).toThrow(/Press the Attack/);
  });

  it("requires an explicit source adaptive tie type even if no shard was selected", () => {
    const spec = blank(); delete spec.adaptiveType;
    expect(() => buildPressTheAttack(spec, rules)).toThrow(/adaptive/);
  });

  it("takes a defensive copy of numeric rules", () => {
    const input = structuredClone(rules), world = arena(blank(), blank(), input);
    input.pressTheAttack.damage = 1; input.pressTheAttack.damageIncrease = 0.5;
    activate(world); expect(100000 - world.units[1].hp).toBeCloseTo(300 + DAMAGE, 10);
    expect(damage(world, 3)).toBeCloseTo(108, 10);
  });

  it("rejects a mutable fabricated native event", () => {
    const world = arena(), self = world.units[0];
    expect(() => self.spec.hooks!.onResolvedOnHit!({ ...hookContext(world, self), onHit: {
      tick: 0, sequence: 1, source: { side: 0, fighterId: "dummy", kind: "champion" },
      target: { side: 1, fighterId: "dummy", kind: "champion" }, attack: true, blocked: false,
      scale: 1, incomingScale: 1, pressTheAttackEligible: true,
    } })).toThrow(/immutable/);
  });

  it("rejects corrupt scalar stack state instead of producing an extra proc", () => {
    const world = arena(); world.units[0].memory[prefix + "stacks"] = 3;
    expect(() => hit(world)).toThrow(/stack state/);
  });
});
