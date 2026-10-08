/**
 * Interaction tests (PLAN.md §8.2): the ledger must find each interaction the wiki
 * describes and none it rules out. Then sanity checks of the ledger-only ranking.
 */
import { describe, expect, it } from "vitest";
import { buildLedger, isHardCounter, rankCounters, scoreFor } from "../engine/ledger/index";
import type { LedgerEntry } from "../engine/ledger/types";
import { findKit, loadLedgerData } from "../pipeline/ledgerData";

const { kits, ctx } = await loadLedgerData();
const ledger = (you: string, enemy: string) => buildLedger(findKit(kits, you), findKit(kits, enemy), ctx);
const entries = (you: string, enemy: string, check: string, by?: string, against?: string): LedgerEntry[] =>
  ledger(you, enemy).entries.filter(
    (e) => e.check === check && (by === undefined || e.by.name === by) && (against === undefined || e.against.name === against),
  );

describe("projectile interception", () => {
  it("Yasuo's Wind Wall blocks the Steel Tempest whirlwind, the projectile part of the ability", () => {
    const [entry] = entries("Yasuo", "Yasuo", "projectile block", "Wind Wall", "Steel Tempest");
    expect(entry?.effect).toBe("partly negates");
    expect(entry?.conditions.join(" ")).toMatch(/whirlwind is a missile/);
  });

  it("Wind Wall doesn't block Darius's Apprehend, which isn't a projectile", () => {
    expect(entries("Yasuo", "Darius", "projectile block")).toEqual([]);
  });

  it("Wind Wall blocks ranged basic attacks but not melee ones or Senna's missile-less attacks", () => {
    expect(entries("Yasuo", "Teemo", "projectile block", "Wind Wall", "Basic attacks")).toHaveLength(1);
    expect(entries("Yasuo", "Darius", "projectile block", "Wind Wall", "Basic attacks")).toHaveLength(0);
    expect(entries("Yasuo", "Senna", "projectile block", "Wind Wall", "Basic attacks")).toHaveLength(0);
  });
});

describe("dash stops", () => {
  it("Poppy's W stops Yasuo's Sweeping Blade, a hard counter", () => {
    const [entry] = entries("Poppy", "Yasuo", "dash stop", "Steadfast Presence", "Sweeping Blade");
    expect(entry).toBeDefined();
    expect(isHardCounter(entry as LedgerEntry)).toBe(true);
  });

  it("Poppy's W doesn't stop Malphite's Unstoppable Force, and has nothing to ground him with", () => {
    expect(entries("Poppy", "Malphite", "dash stop")).toEqual([]);
    expect(entries("Poppy", "Malphite", "grounding")).toEqual([]);
  });

  it("lunges aren't dashes: Darius's Noxian Guillotine isn't stopped", () => {
    expect(entries("Poppy", "Darius", "dash stop")).toEqual([]);
  });
});

describe("blinds, dodges and blocks", () => {
  it("Teemo's blind makes Gangplank's basic attacks miss but not Parrrley, which applies on-hit effects", () => {
    expect(entries("Teemo", "Gangplank", "blind", "Blinding Dart", "Basic attacks")).toHaveLength(1);
    expect(entries("Teemo", "Gangplank", "blind", "Blinding Dart", "Parrrley")).toHaveLength(0);
  });

  it("Teemo's blind makes Garen's Decisive Strike, an empowered attack, miss", () => {
    expect(entries("Teemo", "Garen", "blind", "Blinding Dart", "Decisive Strike")).toHaveLength(1);
  });

  it("Jax's Counter Strike dodges basic attacks and abilities that apply on-hit effects", () => {
    expect(entries("Jax", "Tryndamere", "attack dodge", "Counter Strike", "Basic attacks")).toHaveLength(1);
    expect(entries("Jax", "Fiora", "attack dodge", "Counter Strike", "Lunge")).toHaveLength(1);
  });

  it("Shen's Spirit's Refuge blocks basic attacks", () => {
    expect(entries("Shen", "Tryndamere", "attack block", "Spirit's Refuge", "Basic attacks")).toHaveLength(1);
  });
});

describe("parries and spell shields", () => {
  it("Riposte stuns back only when it negates an immobilizing effect", () => {
    const [pull] = entries("Fiora", "Darius", "parry", "Riposte", "Apprehend");
    expect(pull?.summary).toMatch(/stuns back/);
    expect(pull?.conditions.join(" ")).toMatch(/immobilizing/);
    const [ultimate] = entries("Fiora", "Darius", "parry", "Riposte", "Noxian Guillotine");
    expect(ultimate?.summary).not.toMatch(/stuns back/);
    expect(ultimate?.conditions).toEqual([]);
  });

  it("a spell shield fully blocks Darius's ultimate but only part of Garen's Q", () => {
    expect(entries("Sivir", "Darius", "spell shield", "Spell Shield", "Noxian Guillotine")[0]?.effect).toBe("negates");
    expect(entries("Sivir", "Garen", "spell shield", "Spell Shield", "Decisive Strike")[0]?.effect).toBe("partly negates");
  });
});

describe("crowd control defenses, interrupts and death prevention", () => {
  it("Olaf's Ragnarok makes him immune to crowd control", () => {
    expect(entries("Olaf", "Darius", "cc immunity", "Ragnarok", "Apprehend")).toHaveLength(1);
  });

  it("Garen's Q cleanses slows but not a stun", () => {
    expect(entries("Garen", "Darius", "cleanse", "Decisive Strike", "Apprehend")[0]?.summary).toMatch(/\(slow\)/);
    expect(entries("Garen", "Poppy", "cleanse", "Decisive Strike", "Heroic Charge")).toEqual([]);
  });

  it("stuns interrupt channels, but not uninterruptible ones", () => {
    expect(entries("Darius", "Malzahar", "interrupt", undefined, "Nether Grasp").length).toBeGreaterThan(0);
    expect(entries("Darius", "Irelia", "interrupt", undefined, "Defiant Dance")).toEqual([]);
  });

  it("Tryndamere's Undying Rage stops executes", () => {
    expect(entries("Tryndamere", "Pyke", "death prevention", "Undying Rage", "Death from Below")).toHaveLength(1);
  });

  it("states from dying or transforming don't count as dodges", () => {
    expect(entries("Kayn", "Darius", "untargetable", "The Darkin Scythe")).toEqual([]);
    expect(entries("Zac", "Darius", "untargetable", "Cell Division")).toEqual([]);
  });
});

describe("range", () => {
  it("counts a ranged lead, discounted by the other side's gap closers", () => {
    const [teemo] = entries("Teemo", "Darius", "range");
    expect(teemo?.summary).toMatch(/325 units farther/);
    const [yasuo] = entries("Teemo", "Yasuo", "range");
    expect(yasuo?.impact).toBeLessThan(teemo?.impact ?? 0);
    expect(entries("Darius", "Garen", "range")).toEqual([]);
  });
});

describe("ledger", () => {
  it("is the same matchup from either side", () => {
    const a = ledger("Teemo", "Tryndamere");
    const b = ledger("Tryndamere", "Teemo");
    expect(a.score.net).toBeCloseTo(-b.score.net, 9);
    expect(a.entries.map((e) => e.summary).sort()).toEqual(b.entries.map((e) => e.summary).sort());
  });

  it("scores a mirror matchup even", () => {
    expect(ledger("Yasuo", "Yasuo").score.net).toBe(0);
  });

  it("counts one counter used on several abilities with diminishing returns", () => {
    const one = (impact: number, by: string) => ({ impact, by: { champion: "X", kind: "W", name: by } }) as LedgerEntry;
    expect(scoreFor([one(0.8, "A"), one(0.4, "A"), one(0.4, "B")])).toBeCloseTo(0.8 + 0.2 + 0.4, 9);
  });

  it("cites a source for every entry", () => {
    for (const entry of ledger("Fiora", "Darius").entries) expect(entry.evidence.length).toBeGreaterThan(0);
  });
});

describe("ledger-only ranking (partial)", () => {
  const top = (enemy: string, n: number) =>
    rankCounters(findKit(kits, enemy), kits, ctx)
      .ranking.slice(0, n)
      .map((row) => row.champion);

  it("ranks every other champion and is marked partial", () => {
    const ranking = rankCounters(findKit(kits, "Yasuo"), kits, ctx);
    expect(ranking.confidence).toBe("partial");
    expect(ranking.ranking).toHaveLength(kits.length - 1);
  });

  it("puts Teemo (blind) and Jax (dodge) among the best tenth against Tryndamere", () => {
    const best = top("Tryndamere", Math.ceil((kits.length - 1) / 10));
    expect(best).toContain("Teemo");
    expect(best).toContain("Jax");
  });
});
