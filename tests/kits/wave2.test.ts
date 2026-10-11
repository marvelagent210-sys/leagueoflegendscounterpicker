import { describe, expect, it } from "vitest";
import { allAbilities } from "../../engine/sim/forms";
import type { AbilitySpec } from "../../engine/sim/spec";
import { kit } from "./helpers";

/** Wave-2 kits read the wiki at level 20: spot checks against the numbers on the wiki pages. */
describe("wave-2 kits read the wiki at level 20", () => {
  const ability = (id: string, key: string): AbilitySpec => {
    const found = allAbilities(kit(id).spec).find((a) => a.key === key);
    if (!found) throw new Error(`${id} ${key}`);
    return found;
  };

  it("Akali", () => {
    const q = ability("Akali", "Q");
    expect(q.castTime).toBe(0.198);
    expect(q.delivery).toMatchObject({ kind: "area", near: 0, far: 500, bands: [{ from: 380, to: 500 }] });
    // The recast's damage is the second "Magic Damage" on the page.
    expect(ability("Akali", "E2").onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 245, ratios: { AD: 0.7, AP: 0.77 } } }]);
    expect(ability("Akali", "R2").chain).toEqual({ root: "R", index: 2, window: 10, delay: 2.5 });
    expect(ability("Akali", "W")).toMatchObject({ cooldown: 16, cooldownAfter: "state" });
  });

  it("Cho'Gath", () => {
    // 8 Feast stacks by default: 160 health and 7.7 range each (range capped at 75), 16 more Feast damage each.
    const compiled = kit("Chogath");
    expect(compiled.spec.attack.range).toBeCloseTo(125 + 8 * 7.7, 6);
    expect(compiled.spec.start).toMatchObject([{ type: "stat", stat: "health", amount: { base: 1280 } }]);
    expect(ability("Chogath", "Q").delivery).toEqual({ kind: "circle", range: 950, radius: 125, delay: 0.627, centered: true });
    expect(ability("Chogath", "R").onHit).toEqual([{ type: "damage", damageType: "true", amount: { base: 650 + 8 * 16, ratios: { AP: 0.5, bonusHP: 0.1 } } }]);
    expect(ability("Chogath", "R").delivery).toEqual({ kind: "target", range: 175 + 20 });
    expect(ability("Chogath", "E").cooldownAfter).toBe("empower");
    expect(kit("Chogath", { feastStacks: 20 }).spec.attack.range).toBe(125 + 75);
  });

  it("Kayle", () => {
    const compiled = kit("Kayle");
    expect(compiled.spec.attack).toMatchObject({ range: 625, ranged: true });
    expect(ability("Kayle", "Q").castTime).toBe(0.264);
    expect(ability("Kayle", "W").onCastStart?.[0]).toEqual({ type: "heal", amount: { base: 155, ratios: { AP: 0.25 } } });
    expect(ability("Kayle", "R").onCastStart).toEqual([{ type: "state", state: "invulnerable", duration: 2.5 }]);
  });

  it("Kennen", () => {
    expect(ability("Kennen", "Q").onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 275, ratios: { AP: 0.75 } } }]);
    // Recastable after 0.5 s, and recast on its own when the 2 s run out.
    expect(ability("Kennen", "E2").chain).toEqual({ root: "E", index: 2, window: 2, delay: 0.5, auto: true });
    expect(ability("Kennen", "R").delivery).toMatchObject({ kind: "field", radius: 550, duration: 3, interval: 0.5, attached: true });
  });

  it("Pantheon", () => {
    expect(kit("Pantheon").spec.start).toMatchObject([{ type: "stat", stat: "armorPen", amount: { base: 0.3 } }]);
    expect(ability("Pantheon", "Q2").delivery).toEqual({ kind: "line", range: 1200, width: 110, speed: 2700 });
    expect(ability("Pantheon", "E")).toMatchObject({ cooldownAfter: "channel", onCastStart: [{ type: "state", state: "invulnerable", duration: 1.75 }] });
    expect(ability("Pantheon", "E").channel).toMatchObject({ duration: 1.5 });
  });

  it("Quinn", () => {
    expect(ability("Quinn", "Q").onHit?.[1]).toEqual({ type: "cc", cc: "nearsight", duration: 1.75, strength: 350 });
    expect(ability("Quinn", "E").delivery).toEqual({ kind: "dash", direction: "target", distance: 600, speed: 2500, hitRadius: 0 });
    expect(ability("Quinn", "E2").delivery).toEqual({ kind: "dash", direction: "away", distance: 525, speed: 850 });
    expect(ability("Quinn", "R")).toMatchObject({ cooldown: 3, cooldownAfter: "state", channel: { duration: 2, interruptible: true } });
  });

  it("Rumble", () => {
    // Two harpoon charges, one every 6 s, 0.5 s apart; the Danger Zone version shares them.
    expect(ability("Rumble", "E")).toMatchObject({ cooldown: 0.5, charges: { max: 2, recharge: 6 } });
    expect(ability("Rumble", "Ehot")).toMatchObject({ cooldownKey: "E", charges: { max: 2, recharge: 6 } });
    expect(ability("Rumble", "Ehot").onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 232.5, ratios: { AP: 0.75 } } }]);
    expect(ability("Rumble", "Q").delivery).toMatchObject({ kind: "field", radius: 325, offset: 275, attached: true, duration: 3, interval: 0.25 });
    expect(ability("Rumble", "Whot").onSelf?.[0]).toEqual({ type: "shield", amount: { base: 217.5, ratios: { AP: 0.45, maxHP: 0.06 } }, duration: 1.5 });
  });

  it("Singed", () => {
    expect(ability("Singed", "W").delivery).toEqual({ kind: "field", range: 1000, radius: 265, duration: 3, interval: 0.25, delay: 0.375 });
    expect(ability("Singed", "W").onHit?.[0]).toMatchObject({ type: "cc", cc: "slow", strength: 0.7, sticky: true });
    expect(ability("Singed", "E").onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 90, ratios: { targetMaxHP: 0.08, AP: 0.55 } } },
      { type: "displace", direction: "toward", distance: 550, duration: 0.693, over: true },
    ]);
    expect(ability("Singed", "R").onSelf).toContainEqual({ type: "stat", stat: "moveSpeedFlat", amount: { base: 85 }, duration: 25 });
  });

  it("Trundle", () => {
    expect(ability("Trundle", "Q").cooldownAfter).toBe("empower");
    expect(ability("Trundle", "W").delivery).toMatchObject({ kind: "field", range: 750, radius: 775, duration: 8 });
    // Half of 30% of the target's maximum health at once, the other half over 4 seconds.
    const r = ability("Trundle", "R");
    expect(r.onHit?.[0]).toEqual({ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: 0.15 }, products: [{ ratio: 0.0001, stats: ["AP", "targetMaxHP"] }] } });
    expect(r.onHit?.[1]).toMatchObject({ type: "dot", duration: 4, interval: 1, total: { ratios: { targetMaxHP: 0.15 } } });
  });
});
