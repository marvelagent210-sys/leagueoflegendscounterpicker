import { describe, expect, it } from "vitest";
import { abilityHitPet, dealDamage } from "../../engine/sim/combat";
import { petAttackActor, petCombatHit } from "../../engine/sim/petCombat";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { damagePet, petEffects, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import type { DamageReport, KitHooks, PetSpec } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ability, fighter } from "./kits";

const petSpec: PetSpec = { kind: "fixture", name: "Fixture", hp: 100, armor: 0, mr: 0, radius: 30, moveSpeed: 0, duration: 10 };
type Observed = DamageReport & { source: Unit; target: Unit; attack: boolean };
function fixture() {
  const reports: [Observed[], Observed[]] = [[], []];
  const hooks = (side: 0 | 1): KitHooks => ({ onDamageObserved(ctx) { reports[side].push(ctx); } });
  const world = createWorld({ fighters: [fighter({ hooks: hooks(0) }), fighter({ hooks: hooks(1) })], distance: 100, modes: ["idle", "idle"] });
  return { world, reports, source: world.units[0], target: world.units[1] };
}

describe("batch10 damage observation", () => {
  it.each(["none","spellShield","invulnerable","stasis","untargetable"] as const)("preserves ordinary actual pet-spell damage observation under %s", guard => {
    const {world,source,target,reports}=fixture();const pet=spawnPet(world,source,petSpec,0);
    if(guard!=="none")target.statuses.push({kind:"state",key:guard,value:0,source:1,startTick:0,endTick:100,charges:1});
    petCombatHit(world,pet,target,[{type:"damage",damageType:"true",amount:{base:100}}],false);
    expect(target.hp).toBe(guard==="none"?1900:2000);
    for(const rows of reports)expect(rows).toHaveLength(guard==="none"?1:0);
    if(guard==="spellShield")expect(target.statuses.some(s=>s.key==="spellShield")).toBe(false);
  });
  it.each([0,40,300])("resolves an actual pet spell before Riposte with %s shield, preserving spell shields and denying debuffs/callbacks", shield => {
    const {world,source,target,reports}=fixture(); let hits=0;
    const pet=spawnPet(world,source,{...petSpec,onAttackHit(){hits++;}},0);
    target.statuses.push({kind:"state",key:"parry",value:0,source:1,startTick:0,endTick:100},{kind:"state",key:"spellShield",value:0,source:1,startTick:0,endTick:100,charges:1});
    if(shield)target.statuses.push({kind:"shield",key:"fixture",value:shield,source:1,startTick:0,endTick:100});
    expect(petCombatHit(world,pet,target,[{type:"damage",damageType:"true",amount:{base:100}},{type:"cc",cc:"slow",strength:.5,duration:1}],false)).toBe(false);
    expect(target.hp).toBe(2000); expect(hits).toBe(0); expect(target.statuses.some(s=>s.key==="slow")).toBe(false);
    expect(target.statuses.find(s=>s.key==="spellShield")?.charges).toBe(1);
    for(const rows of reports){expect(rows).toHaveLength(1);expect(rows[0]).toMatchObject({source:{petId:pet.id},target,petSource:true,raw:100,mitigated:100,amount:0,absorbed:Math.min(100,shield)});}
  });
  it("applies only an explicitly sourced pet state immunity", () => {
    const { world, source, target } = fixture();
    const immune = spawnPet(world, target, { ...petSpec, stateImmune: ["stasis"] }, 0);
    const ordinary = spawnPet(world, target, petSpec, 0);
    for (const pet of [immune, ordinary]) petEffects(world, source, pet, [{ type: "state", state: "stasis", duration: 1 }]);
    expect(immune.statuses?.some(s => s.key === "stasis")).toBe(false);
    expect(ordinary.statuses?.some(s => s.key === "stasis")).toBe(true);
    petEffects(world, source, immune, [{ type: "state", state: "revealed", duration: 1 }]);
    expect(immune.statuses?.some(s => s.key === "revealed")).toBe(true);
  });
  it("reports one champion packet to each observer with shield absorption and exact identities", () => {
    const { world, source, target, reports } = fixture();
    target.statuses.push({ kind: "shield", key: "fixture", value: 40, source: 1, startTick: 0, endTick: 100 });
    dealDamage(world, source, target, 100, "true", { ability: "fixture", persistent: true });
    for (const rows of reports) {
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ amount: 60, absorbed: 40, mitigated: 100, raw: 100, damageType: "true", persistent: true, ability: "fixture", attack: false });
      expect(rows[0]!.source).toBe(source);
      expect(rows[0]!.target).toBe(target);
    }
  });

  for (const path of ["direct", "dealDamage", "effects"] as const) {
    it(`observes actual pet damage exactly once through ${path}, including lethal overkill`, () => {
      const { world, source, target, reports } = fixture();
      const pet = spawnPet(world, target, petSpec, 42);
      if (path === "direct") damagePet(world, source, pet, 150, "true", false, "fixture");
      else if (path === "dealDamage") dealDamage(world, source, petFormulaTarget(pet, source, 0), 150, "true", { ability: "fixture" });
      else petEffects(world, source, pet, [{ type: "damage", damageType: "true", amount: { base: 150 } }], "persistent", "fixture");
      expect(world.pets).not.toContain(pet);
      for (const rows of reports) {
        expect(rows).toHaveLength(1);
        expect(rows[0]).toMatchObject({ amount: 100, mitigated: 150, absorbed: 0, raw: 150, targetPet: pet });
        expect(rows[0]!.target.petId).toBe(pet.id);
        expect(rows[0]!.target.x).toBe(42);
        expect(rows[0]!.source).toBe(source);
        expect(rows[0]!.persistent).toBe(path === "effects");
      }
    });
  }

  it("preserves a pet source identity instead of attributing its packet to its owner", () => {
    const { world, source, target, reports } = fixture();
    const pet = spawnPet(world, source, { ...petSpec, targetClass: "champion", unitClass: "clone" }, 33);
    const actor = petAttackActor(pet, source, 0);
    dealDamage(world, actor, target, 20, "true", { attack: true });
    expect(reports[0][0]!.source).toBe(actor);
    expect(reports[0][0]).toMatchObject({ petSource: true, attack: true });
    expect(reports[0][0]!.source).not.toBe(source);
    expect(reports[0][0]!.source.petId).toBe(pet.id);
  });

  it("creates and consumes typed pet shields before health floors and reports actual absorption", () => {
    const { world, source, target, reports } = fixture();
    const pet = spawnPet(world, target, petSpec, 0);
    petEffects(world, target, pet, [{ type: "shield", shieldType: "magic", amount: { base: 40 }, duration: 1 }]);
    damagePet(world, source, pet, 20, "physical", false);
    expect(pet.hp).toBe(80);
    expect(pet.statuses?.find(s => s.kind === "shield")?.value).toBe(40);
    damagePet(world, source, pet, 50, "magic", false);
    expect(pet.hp).toBe(70);
    expect(reports[0][1]).toMatchObject({ absorbed: 40, amount: 10, mitigated: 50 });
    expect(pet.statuses?.some(s => s.kind === "shield")).toBe(false);
    petEffects(world, target, pet, [{ type: "shield", amount: { base: 100 }, duration: 1 }]);
    world.tick = 30;
    damagePet(world, source, pet, 10, "true", false);
    expect(pet.hp).toBe(60);
    expect(reports[0][2]).toMatchObject({ absorbed: 0, amount: 10, mitigated: 10 });
  });

  it("retains exact stage identity for a pet contact when stages share a display name", () => {
    const { world, source, target } = fixture();
    const root = ability({ key: "R", name: "Shared name", delivery: { kind: "self" }, flags: { petContactHooks: true } });
    const attach = ability({ key: "Rattach", name: "Shared name", delivery: { kind: "self" }, flags: { petContactHooks: true } });
    source.spec.abilities = [root, attach];
    const pet = spawnPet(world, target, petSpec, 0);
    abilityHitPet(world, source, pet, attach, [{ type: "cc", cc: "suppression", duration: 1 }]);
    expect(pet.statuses?.find(s => s.key === "suppression")?.ability).toBe("Rattach");
  });

  for (const immune of [false, true]) {
    it(`continues a requiresCC pet packet only after ${immune ? "denied" : "accepted"} crowd control`, () => {
      const { world, source, target } = fixture();
      let connected = 0;
      const attach = ability({ key: "Rattach", delivery: { kind: "self" }, flags: { petContactHooks: true, requiresCC: "suppression" } });
      source.spec.abilities = [attach];
      source.spec.hooks!.onAbilityHit = () => { connected += 1; };
      const pet = spawnPet(world, target, { ...petSpec, ...(immune ? { ccImmune: ["suppression"] } : {}) }, 0);
      abilityHitPet(world, source, pet, attach, [{ type: "cc", cc: "suppression", duration: 1 }, { type: "state", state: "revealed", duration: 1 }]);
      expect(pet.statuses?.some(s => s.key === "revealed")).toBe(!immune);
      expect(connected).toBe(immune ? 0 : 1);
    });
  }

  it("keeps a pet's real windup when state immunity denies crowd control", () => {
    const { world, source, target } = fixture();
    const pet = spawnPet(world, target, petSpec, 0);
    const windup = { target: 0 as const, launchTick: 20, blinded: false, effects: [] };
    pet.windup = windup;
    pet.statuses = [{ kind: "state", key: "ccImmune", value: 0, source: 1, startTick: 0, endTick: 100 }];
    expect(petEffects(world, source, pet, [{ type: "cc", cc: "stun", duration: 1 }])).toBe(false);
    expect(pet.windup).toBe(windup);
    pet.statuses = [];
    expect(petEffects(world, source, pet, [{ type: "cc", cc: "stun", duration: 1 }])).toBe(true);
    expect(pet.windup).toBeUndefined();
  });

  it("preserves pre-parry damage for vamp while reporting no actual health damage", () => {
    const { world, source, target, reports } = fixture();
    target.statuses.push({ kind: "state", key: "parry", value: 0, source: 1, startTick: 0, endTick: 100 });
    dealDamage(world, source, target, 100, "true", { ability: "area" });
    expect(target.hp).toBe(2000);
    for (const rows of reports) {
      expect(rows).toHaveLength(1);
      expect(rows[0]).toMatchObject({ raw: 100, mitigated: 100, amount: 0, absorbed: 0, ability: "area" });
    }
  });

  for (const customShield of [false, true]) {
    it(`accounts for an existing pet callback's ${customShield ? "custom shield" : "damage reduction"} refund`, () => {
      const { world, source, target, reports } = fixture();
      const pet = spawnPet(world, target, { ...petSpec, onDamaged(hit) {
        hit.pet.hp += 30;
        if (customShield) hit.absorbed = (hit.absorbed ?? 0) + 30;
      } }, 0);
      damagePet(world, source, pet, 80, "true", false);
      expect(pet.hp).toBe(50);
      expect(reports[0][0]).toMatchObject({ amount: 50, mitigated: customShield ? 80 : 50, absorbed: customShield ? 30 : 0 });
      expect(reports[0][0]!.target.hp).toBe(50);
    });
  }

  it("keeps champion and pet post-mitigation reports distinct from minimum-health floors", () => {
    const { world, source, target, reports } = fixture();
    target.hp = 1;
    const floor = { kind: "state" as const, key: "minimumHealth", value: 1, source: 1 as const, startTick: 0, endTick: 100 };
    target.statuses.push(floor);
    const pet = spawnPet(world, target, petSpec, 0);
    pet.hp = 1; pet.statuses = [{ ...floor }];
    dealDamage(world, source, target, 100, "true");
    damagePet(world, source, pet, 100, "true", false);
    expect(target.hp).toBe(1); expect(pet.hp).toBe(1);
    expect(reports[0]).toHaveLength(2);
    for (const row of reports[0]) expect(row).toMatchObject({ amount: 0, mitigated: 100, absorbed: 0 });
  });

  it("distinguishes health counters while retaining their actual pet specification", () => {
    const { world, source, target, reports } = fixture();
    const pet = spawnPet(world, target, { ...petSpec, hp: 3, hitPoints: true }, 0);
    damagePet(world, source, pet, 1000, "true", false);
    expect(reports[0]).toHaveLength(0);
    damagePet(world, source, pet, 1000, "true", true);
    expect(reports[0][0]).toMatchObject({ amount: 1, mitigated: 1, targetPet: pet });
  });

  it("omits invulnerable packets and dead observers without changing old damage hook scope", () => {
    const { world, source, target, reports } = fixture();
    let dealt = 0;
    source.spec.hooks!.onDamageDealt = () => { dealt += 1; };
    const pet = spawnPet(world, target, petSpec, 0);
    pet.statuses = [{ kind: "state", key: "invulnerable", value: 0, source: 1, startTick: 0, endTick: 100 }];
    damagePet(world, source, pet, 20, "true", false);
    target.statuses = [...pet.statuses];
    dealDamage(world, source, target, 20, "true");
    expect(reports[0]).toHaveLength(0);
    pet.statuses = [];
    target.alive = false;
    damagePet(world, source, pet, 20, "true", false);
    expect(reports[0]).toHaveLength(1);
    expect(reports[1]).toHaveLength(0);
    expect(dealt).toBe(0);
  });

  it("bounds recursive observation of additional damage", () => {
    const { world, source, target, reports } = fixture();
    source.spec.hooks!.onDamageObserved = () => { dealDamage(world, source, target, 1, "true"); };
    dealDamage(world, source, target, 1, "true");
    expect(2000 - target.hp).toBe(4);
    expect(reports[1].length).toBeLessThanOrEqual(3);
  });
});
