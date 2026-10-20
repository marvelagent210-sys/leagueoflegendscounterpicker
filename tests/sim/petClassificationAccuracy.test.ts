import { describe, expect, it } from "vitest";
import { damagePet, spawnPet } from "../../engine/sim/pets";
import { createWorld } from "../../engine/sim/simulate";
import { kit } from "../kits/helpers";
import { fighter } from "./kits";

const petSpec = (name: string) => ({ kind: "fixture", name, hp: 10, armor: 0, mr: 0, radius: 10, moveSpeed: 0, duration: 10 });

describe("source-backed summoned-unit targeting classes", () => {
  it.each([
    ["Annie", "Tibbers"], ["Heimerdinger", "H-28G Evolution Turret"],
    ["Yorick", "Maiden of the Mist"], ["Zyra", "Thorn Spitter"], ["Kalista", "Sentinel"],
  ])("%s retains the pinned minion classification for %s", (owner, name) => {
    const compiled = kit(owner);
    expect(compiled.spec.petTargetClasses?.[name]).toBe("minion");
    expect(compiled.evidence.some(e => e.ability === name && e.text.includes("Minion"))).toBe(true);
    const w = createWorld({ fighters: [compiled.spec, fighter()], distance: 1000, modes: ["idle", "idle"] });
    expect(spawnPet(w, w.units[0], petSpec(name), 0).spec.targetClass).toBe("minion");
    expect(spawnPet(w, w.units[0], petSpec("Unclassified summon"), 0).spec.targetClass).toBeUndefined();
  });
  it("does not infer a minion class from a health-based pet representation", () => {
    const w = createWorld({ fighters: [fighter(), fighter()], distance: 1000, modes: ["idle", "idle"] });
    expect(spawnPet(w, w.units[0], petSpec("Health pet"), 0).spec.targetClass).toBeUndefined();
    expect(spawnPet(w, w.units[0], { ...petSpec("Champion clone"), targetClass: "champion" }, 0).spec.targetClass).toBe("champion");
  });
});

describe("actual lethal pet packet attribution", () => {
  it("reports a persistent ability kill once and distinguishes a later nonpersistent kill", () => {
    const kills: Array<{ ability?: string; persistent?: boolean } | undefined> = [];
    const own = fighter({ hooks: { onKill(ctx) { kills.push(ctx.damage); } } });
    const w = createWorld({ fighters: [own, fighter()], distance: 1000, modes: ["idle", "idle"] });
    const burn = spawnPet(w, w.units[1], petSpec("Burn target"), 200);
    damagePet(w, w.units[0], burn, 20, "true", false, "Qburn:7", "persistent");
    damagePet(w, w.units[0], burn, 20, "true", false, "Qburn:7", "persistent");
    expect(kills).toEqual([{ ability: "Qburn:7", persistent: true }]);
    const direct = spawnPet(w, w.units[1], petSpec("Direct target"), 300);
    damagePet(w, w.units[0], direct, 20, "physical", false, "Ebolt", "singleTarget");
    expect(kills[1]).toEqual({ ability: "Ebolt", persistent: false });
  });
});
