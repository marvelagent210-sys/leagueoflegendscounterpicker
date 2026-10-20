/** Regression cases grounded in the committed ability notes, plus ledger invariants. */
import { describe, expect, it } from "vitest";
import { buildLedger } from "../engine/ledger/index";
import { availability, completeness } from "../engine/ledger/weights";
import type { KitProfile } from "../engine/profiles";
import { findKit, loadLedgerData } from "../pipeline/ledgerData";

const { kits, ctx } = await loadLedgerData();
const kit = (name: string) => findKit(kits, name);
const entries = (you: string, enemy: string, check: string, by?: string, against?: string) =>
  buildLedger(kit(you), kit(enemy), ctx).entries.filter((e) =>
    e.favors === kit(you).champion && e.check === check &&
    (by === undefined || e.by.name === by) && (against === undefined || e.against.name === against));

describe("attack delivery and per-defense exceptions", () => {
  it.each([
    ["Camille", "Precision Protocol"],
    ["Ekko", "Phase Dive"],
    ["Nasus", "Siphoning Strike"],
  ])("recognizes %s's self-cast %s as an empowered enemy hit", (enemy, ability) => {
    expect(kit(enemy).abilities.find((a) => a.name === ability)?.delivery.affectsEnemies).toBe(false);
    expect(entries("Teemo", enemy, "blind", "Blinding Dart", ability)).toHaveLength(1);
    expect(entries("Jax", enemy, "attack dodge", "Counter Strike", ability)).toHaveLength(1);
    expect(entries("Shen", enemy, "attack block", "Spirit's Refuge", ability)).toHaveLength(1);
  });

  it("keeps Bladework's slow when blind, block or dodge negate its damage", () => {
    for (const [you, check] of [["Teemo", "blind"], ["Jax", "attack dodge"], ["Shen", "attack block"]]) {
      const [entry] = entries(you!, "Fiora", check!, undefined, "Bladework");
      expect(entry?.effect).toBe("partly negates");
      expect(entry?.conditions.join(" ")).toMatch(/will slow even if/);
    }
    expect(entries("Sivir", "Fiora", "spell shield", "Spell Shield", "Bladework")[0]?.conditions.join(" ")).toMatch(/only block the slow/);
  });

  it("does not make Hecarim's charge damage miss from blind", () => {
    expect(entries("Teemo", "Hecarim", "blind", undefined, "Devastating Charge")).toEqual([]);
    expect(entries("Shen", "Hecarim", "attack block", undefined, "Devastating Charge")[0]?.effect).toBe("partly negates");
  });

  it("blocks Empowered Whiplash, but does not dodge it", () => {
    expect(entries("Jax", "Evelynn", "attack dodge", undefined, "Empowered Whiplash")).toEqual([]);
    expect(entries("Shen", "Evelynn", "attack block", undefined, "Empowered Whiplash")).toHaveLength(1);
  });

  it.each(["Shunpo", "Voracity"])("does not block Katarina's %s, but can dodge its on-hit component", (ability) => {
    expect(entries("Shen", "Katarina", "attack block", undefined, ability)).toEqual([]);
    expect(entries("Jax", "Katarina", "attack dodge", undefined, ability)[0]?.effect).toBe("partly negates");
  });

  it("does not dodge or block Electrical Surge's enhanced bonus", () => {
    expect(entries("Jax", "Kennen", "attack dodge", undefined, "Electrical Surge")).toEqual([]);
    expect(entries("Shen", "Kennen", "attack block", undefined, "Electrical Surge")).toEqual([]);
  });
});

describe("conditional defenses", () => {
  it("does not extend Nunu's movement-slow immunity to attack-speed cripples", () => {
    expect(entries("Nunu", "Malphite", "cc immunity", "Biggest Snowball Ever!", "Ground Slam")).toEqual([]);
    const [entry] = entries("Nunu", "Fiora", "cc immunity", "Biggest Snowball Ever!", "Riposte");
    expect(entry?.summary).toMatch(/\(slow\)/);
    expect(entry?.summary).not.toMatch(/cripple/);
  });

  it("preserves Highlander's explicitly documented cripple immunity", () => {
    const [entry] = entries("Master Yi", "Malphite", "cc immunity", "Highlander", "Ground Slam");
    expect(entry?.summary).toMatch(/cripple/);
  });

  it("does not cleanse Mega Adhesive's non-dispellable slow with Garen Q", () => {
    expect(entries("Garen", "Singed", "cleanse", "Decisive Strike", "Mega Adhesive")).toEqual([]);
    expect(entries("Olaf", "Singed", "cc immunity", "Ragnarok", "Mega Adhesive")).toHaveLength(1);
  });

  it.each([
    ["Garen", "Decisive Strike"],
    ["Blitzcrank", "Power Fist"],
    ["Diana", "Lunar Rush"],
    ["Irelia", "Bladesurge"],
    ["Kayn", "Umbral Trespass"],
    ["Tristana", "Explosive Charge"],
  ])("does not promise to dodge %s's committed %s through untargetability", (enemy, ability) => {
    const [entry] = entries("Fizz", enemy, "untargetable", "Playful", ability);
    expect(entry?.effect).toBe("partly negates");
    expect(entry?.timing).toMatch(/before the enemy commits/);
    expect(entry?.conditions.join(" ")).toMatch(/untargetab/);
  });

  it("does not treat delayed or post-death invulnerability as an on-demand execute defense", () => {
    for (const enemy of ["Kayn", "Kog'Maw", "Pantheon", "Taric"]) {
      expect(entries(enemy, "Pyke", "death prevention").filter((e) => ["The Darkin Scythe", "Icathian Surprise", "Grand Starfall", "Cosmic Radiance"].includes(e.by.name))).toEqual([]);
    }
  });

  it("describes resurrection as recovery after fatal damage, rather than preventing an execute", () => {
    const [entry] = entries("Anivia", "Pyke", "death prevention", "Rebirth", "Death from Below");
    expect(entry?.effect).toBe("revives");
    expect(entry?.summary).toMatch(/after fatal damage/);
  });

  it.each(["Pantheon", "Galio", "Warwick"])("can interrupt %s's vulnerable ultimate channel despite immunity in another phase", (enemy) => {
    expect(entries("Garen", enemy, "interrupt", "Decisive Strike").some((e) => e.against.kind === "R")).toBe(true);
  });
});

describe("ledger score and order invariants", () => {
  it("includes each available interrupt and does not depend on ability-array order", () => {
    const own: KitProfile = structuredClone(kit("Garen"));
    const silence = own.abilities.find((a) => a.name === "Decisive Strike")!;
    own.abilities = [
      { ...silence, name: "Slow cooldown silence", cooldown: 100 },
      { ...silence, name: "Fast cooldown silence", cooldown: 1 },
    ];
    const first = buildLedger(own, kit("Malzahar"), ctx);
    const second = buildLedger({ ...own, abilities: [...own.abilities].reverse() }, kit("Malzahar"), ctx);
    expect(first.entries.filter((e) => e.check === "interrupt" && e.against.name === "Nether Grasp")).toHaveLength(2);
    expect(first).toEqual(second);
  });

  it("returns the same ordered interactions when matchup direction is reversed", () => {
    const first = buildLedger(kit("Garen"), kit("Darius"), ctx);
    const second = buildLedger(kit("Darius"), kit("Garen"), ctx);
    expect(first.entries).toEqual(second.entries);
    expect(first.score.net).toBe(-second.score.net);
  });

  it("lists both of Lee Sin's true-sight tools rather than whichever ability happens to be first", () => {
    const first = buildLedger(kit("Lee Sin"), kit("Twitch"), ctx);
    const own = { ...kit("Lee Sin"), abilities: [...kit("Lee Sin").abilities].reverse() };
    expect(first.entries.filter((e) => e.check === "reveal").map((e) => e.by.name).sort()).toEqual(["Sonic Wave", "Tempest"]);
    expect(buildLedger(own, kit("Twitch"), ctx)).toEqual(first);
  });

  it("keeps every impact finite and within its documented zero-to-one range", () => {
    for (const enemy of kits) {
      for (const entry of buildLedger(kit("Fiora"), enemy, ctx).entries) {
        expect(Number.isFinite(entry.impact)).toBe(true);
        expect(entry.impact).toBeGreaterThanOrEqual(0);
        expect(entry.impact).toBeLessThanOrEqual(1);
      }
    }
  });

  it("gives no coverage to a ruled-out interaction and full uptime to a zero-cooldown state", () => {
    expect(completeness("no")).toBe(0);
    expect(availability(2, 0)).toBe(1);
  });
});
