/** Fight profiles: facts checked against the wiki for the abilities the ledger leans on most. */
import { describe, expect, it } from "vitest";
import type { AbilityProfile, KitProfile } from "../engine/profiles";
import { valueAt20 } from "../pipeline/profiles/build";
import { findKit, loadLedgerData } from "../pipeline/ledgerData";

const { kits } = await loadLedgerData();
const kit = (id: string): KitProfile => findKit(kits, id);
const ability = (champion: string, name: string): AbilityProfile => {
  const found = kit(champion).abilities.find((a) => a.name === name);
  if (!found) throw new Error(`No ${champion} ${name}`);
  return found;
};
const state = (champion: string, name: string, type: string) => ability(champion, name).states.find((s) => s.state === type);
const applies = (champion: string, name: string, type: string) => ability(champion, name).applies.find((a) => a.type === type);

describe("valueAt20", () => {
  it("takes max rank, level 20, the last level step, or no bonus for other variables", () => {
    expect(valueAt20({ kind: "rank", values: [9, 8, 7, 6, 5] })).toBe(5);
    expect(valueAt20({ kind: "level", values: Array.from({ length: 20 }, (_, i) => i + 1) })).toBe(20);
    expect(valueAt20({ kind: "variable", variable: "level", points: [1, 6, 11, 16], values: [85, 90, 95, 100] })).toBe(100);
    expect(valueAt20({ kind: "variable", variable: "bonus attack speed", points: [0, 120], values: [4, 1.33] })).toBe(4);
  });
});

describe("defensive states", () => {
  it("finds the projectile blockers, spell shields and parries with their durations", () => {
    expect(state("Yasuo", "Wind Wall", "projectile block")?.duration).toBe(4);
    expect(state("Samira", "Blade Whirl", "projectile block")?.duration).toBe(0.75);
    expect(state("Sivir", "Spell Shield", "spell shield")?.duration).toBe(1.5);
    expect(state("Fiora", "Riposte", "parry")?.duration).toBe(0.75);
    expect(state("Jax", "Counter Strike", "dodge attacks")?.duration).toBe(2);
    expect(state("Shen", "Spirit's Refuge", "block attacks")?.duration).toBe(1.75);
  });

  it("gives a state to the caster only when the caster gets it", () => {
    expect(state("Fizz", "Playful", "untargetable")?.duration).toBe(0.75);
    // Kalista's R protects her Oathsworn; Tahm Kench's R protects the unit he devours.
    expect(state("Kalista", "Fate's Call", "untargetable")).toBeUndefined();
    expect(state("Kalista", "Fate's Call", "invulnerable")).toBeUndefined();
    expect(state("TahmKench", "Devour", "untargetable")).toBeUndefined();
    expect(state("TahmKench", "Devour", "displacement immune")).toBeUndefined();
  });

  it("reads immunities, cleanses and death prevention", () => {
    expect(state("Olaf", "Ragnarok", "cc immune")?.duration).toBe(3);
    expect(state("Olaf", "Ragnarok", "cleanse")?.removes).toEqual(expect.arrayContaining(["airborne", "stun", "suppression"]));
    expect(state("Garen", "Decisive Strike", "cleanse")?.removes).toEqual(["slow"]);
    expect(state("Tryndamere", "Undying Rage", "minimum health")?.duration).toBe(5);
    expect(ability("Tryndamere", "Undying Rage").usableWhileDisabled?.which).toBe("cast");
    expect(state("Malphite", "Unstoppable Force", "displacement immune")).toBeDefined();
  });
});

describe("what abilities apply", () => {
  it("takes crowd control from the wiki's sources lists, with durations from the description", () => {
    expect(applies("Teemo", "Blinding Dart", "blind")?.duration).toBe(3);
    expect(applies("Poppy", "Steadfast Presence", "dash cancel")?.duration).toBe(2);
    expect(applies("Lulu", "Whimsy", "disarm")?.duration).toBe(2);
    expect(applies("Darius", "Apprehend", "airborne")?.variant).toBe("knock up, pull");
  });

  it("leaves out effects the lists give only against non-champions", () => {
    // Darius's R fears and slows minions and monsters, not champions.
    expect(applies("Darius", "Noxian Guillotine", "fear")).toBeUndefined();
    expect(applies("Darius", "Noxian Guillotine", "slow")).toBeUndefined();
  });

  it("keeps the condition of a conditional effect", () => {
    const stun = applies("Fiora", "Riposte", "stun");
    expect(stun?.condition).toMatch(/^If Riposte negates at least one hostile immobilizing effect/);
    expect(stun?.duration).toBe(2);
    expect(applies("Poppy", "Steadfast Presence", "ground")?.condition).toMatch(/successfully interrupted/);
  });
});

describe("delivery and movement", () => {
  it("tells empowered attacks, on-hit spells and attack modifiers apart", () => {
    expect(ability("Garen", "Decisive Strike").delivery.attack).toBe("attack");
    expect(ability("Gangplank", "Parrrley").delivery.attack).toBe("on-hit");
    expect(ability("Teemo", "Toxic Shot").delivery.attack).toBe("attack modifier");
  });

  it("knows which dashes knockdowns and Poppy's W can't stop", () => {
    expect(ability("Malphite", "Unstoppable Force").movement[0]).toMatchObject({ type: "dash", interruptible: false });
    expect(ability("Yasuo", "Sweeping Blade").movement[0]).toMatchObject({ type: "dash", interruptible: true, interruptedByCC: true });
    expect(ability("Darius", "Noxian Guillotine").movement[0]?.type).toBe("lunge");
    expect(ability("Yasuo", "Last Breath").movement[0]?.type).toBe("blink");
  });
});

describe("basic attacks at level 20", () => {
  it("models ranged projectiles, melee forms and range changes", () => {
    expect(kit("Teemo").attacks[0]).toMatchObject({ range: 500, ranged: true, projectile: true });
    expect(kit("Darius").attacks[0]).toMatchObject({ range: 175, ranged: false, projectile: false });
    // Kayle is ranged with 625 range from level 16; Jayce adds his Cannon Stance; Mega Gnar is melee.
    expect(kit("Kayle").attacks[0]).toMatchObject({ range: 625, ranged: true });
    expect(kit("Jayce").attacks.map((a) => [a.formName, a.range, a.ranged])).toEqual([
      ["Jayce", 125, false],
      ["Cannon Stance", 500, true],
    ]);
    expect(kit("Gnar").attacks.find((a) => a.formName === "Mega Gnar")).toMatchObject({ ranged: false });
    // Senna's attacks are ranged but fire no missile.
    expect(kit("Senna").attacks[0]).toMatchObject({ ranged: true, projectile: false });
  });
});
