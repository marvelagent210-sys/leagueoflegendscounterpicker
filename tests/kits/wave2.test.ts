import { describe, expect, it } from "vitest";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import { allAbilities } from "../../engine/sim/forms";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec } from "../../engine/sim/spec";
import { fighter } from "../sim/kits";
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

  it("Ambessa", () => {
    expect(kit("Ambessa").spec.start).toMatchObject([{ type: "stat", stat: "armorPen", amount: { base: 0.3 } }]);
    // The 0.225 s lockout of her basic abilities is their cast time.
    expect(ability("Ambessa", "Q")).toMatchObject({ castTime: 0.225, cooldown: 10, chainCooldown: "first" });
    expect(ability("Ambessa", "Q2").chain).toEqual({ root: "Q", index: 2, window: 4 });
    expect(ability("Ambessa", "E").onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 120, ratios: { bonusAD: 0.5 } } });
    expect(ability("Ambessa", "R")).toMatchObject({ castTime: 0.7, onHit: [{ type: "cc", cc: "suppression", duration: 0.75 }, { type: "delayed", delay: 0.75 }] });
  });

  it("Aurora", () => {
    expect(kit("Aurora").spec.attack).toMatchObject({ range: 550, ranged: true });
    expect(ability("Aurora", "Q")).toMatchObject({ castTime: 0.25, chainCooldown: "first", delivery: { kind: "line", range: 900, width: 180, speed: 1600 } });
    // Recastable after 0.1 s, and recast on its own when the 3.5 s mark ends.
    expect(ability("Aurora", "Q2").chain).toEqual({ root: "Q", index: 2, window: 3.5, delay: 0.1, auto: true });
    // The hop is 300 units at 350 units a second; invisibility starts as it ends.
    expect(ability("Aurora", "W").delivery).toEqual({ kind: "dash", direction: "away", distance: 300, speed: 350 });
    const veil = ability("Aurora", "W").onSelf?.[0];
    expect(veil).toMatchObject({ type: "delayed", delay: 300 / 350 });
    expect(veil?.type === "delayed" && veil.effects[0]).toEqual({ type: "state", state: "invisible", duration: 1.6 });
    // The recoil: 150 + 200% of her 335 movement speed.
    expect(ability("Aurora", "E2").delivery).toEqual({ kind: "dash", direction: "away", distance: 250, speed: 820 });
    expect(ability("Aurora", "R")).toMatchObject({ cooldown: 100, cooldownAfter: "state" });
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

  it("K'Sante", () => {
    expect(ability("KSante", "Q").onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 190, ratios: { bonusArmor: 0.4, bonusMR: 0.4 } } });
    expect(ability("KSante", "Q3").delivery).toMatchObject({ kind: "area", far: 930 });
    expect(ability("KSante", "W")).toMatchObject({ castTime: 0.9, cooldownAfter: "dash", delivery: { kind: "dash", distance: 450, speed: 1500 } });
    expect(ability("KSante", "E").onCastStart).toEqual([{ type: "shield", amount: { base: 240, ratios: { bonusHP: 0.135 } }, duration: 2 }]);
    expect(ability("KSante", "R")).toMatchObject({ cooldown: 80, castTime: 0.4, cooldownAfter: "state", delivery: { kind: "target", range: 300 } });
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

  it("Sion", () => {
    // Tapped, or charged 1 s or 2 s: damage grows every 0.25 s; a charge breaks into a 2 s cooldown.
    expect(ability("Sion", "Q")).toMatchObject({ castTime: 0, cooldownKey: "Q", interruptible: { cooldown: 2 }, delivery: { far: 500, centered: true } });
    expect(ability("Sion", "Qcharged")).toMatchObject({ castTime: 1, delivery: { far: 850, centered: true } });
    expect(ability("Sion", "Qcharged").onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 220, ratios: { AD: 1.6 } } });
    expect(ability("Sion", "Qfull").onHit).toEqual([
      { type: "damage", damageType: "physical", amount: { base: 350, ratios: { AD: 2.4 } } },
      { type: "displace", direction: "away", distance: 0, duration: 1 },
    ]);
    expect(ability("Sion", "W2").chain).toEqual({ root: "W", index: 2, window: 6, delay: 3, auto: true });
    expect(ability("Sion", "E").onHit?.[2]).toEqual({ type: "stat", stat: "armorReductionPercent", amount: { base: 0.25 }, duration: 4 });
    // The charge: 40 more speed every 0.1 s up to 950; sidestepped, the recast's 400-radius slam lands 0.55 - 300/950 s later.
    expect(ability("Sion", "R")).toMatchObject({ castTime: 0.05, cooldown: 60, cooldownAfter: "dash" });
    expect(ability("Sion", "R").delivery).toMatchObject({ kind: "dash", speed: 950, hitRadius: 150, ramp: { amount: 40, every: 0.1 } });
    const r = ability("Sion", "R").delivery;
    expect(r.kind === "dash" && r.sidestep?.reach).toBe(400);
    expect(r.kind === "dash" && r.sidestep?.later).toBeCloseTo(0.55 - 300 / 950, 9);
    const frenzy = kit("Sion").spec.forms?.["Glory in Death"];
    expect(frenzy?.base.attackSpeed).toEqual({ base: 1.75, ratio: 0, bonus: 0 });
    expect(frenzy?.attack.onHit).toEqual([{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: 0.1 } }, label: "Glory in Death", noLifeSteal: true }]);
    expect(kit("Sion").spec.start).toEqual([{ type: "stat", stat: "health", amount: { base: 1000 }, duration: Number.POSITIVE_INFINITY }]);
  });

  it("Sion fights: Glory in Death's stasis, then a frenzy whose health drains faster and faster", () => {
    const compiled = kit("Sion");
    // One hit kills Sion; then it only stands there, too tough for the frenzy to hurt.
    const wall = fighter({ id: "wall", base: { hp: 1e6, armor: 1e5, mr: 1e5, ad: 20000 } });
    const world = createWorld({ fighters: [compiled.spec, wall], distance: 0, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 60 } });
    const sion = world.units[0];
    let died = -1;
    let rose = -1;
    let risenHp = 0;
    const wallBehavior: Behavior = (view) => (died >= 0 ? { kind: "move", direction: 0 } : defaultBehavior(view));
    while (!world.result) {
      step(world, [compiled.spec.behavior ?? defaultBehavior, wallBehavior]);
      if (died < 0 && sion.fallen) died = world.tick - 1;
      if (rose < 0 && sion.spec.form === "Glory in Death") {
        rose = world.tick - 1;
        risenHp = sion.hp;
        expect(risenHp).toBeCloseTo(derive(sion).maxHp, 6);
      }
    }
    expect(died).toBeGreaterThanOrEqual(0);
    expect(rose - died).toBe(45);
    // 21 health every 0.264 s at level 20, 70% of that more each time.
    let lost = 0;
    let drains = 0;
    while (lost < risenHp - 1) {
      drains += 1;
      lost += 21 * (1 + 0.7 * (drains - 1));
    }
    const expected = rose + Math.round(drains * 0.264 * 30);
    expect(world.result?.tick).toBe(expected);
    expect(world.result?.winner).toBe(1);
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

  it("Zaahen", () => {
    expect(kit("Zaahen").spec.start).toMatchObject([{ type: "stat", stat: "armorPen", amount: { base: 0.3 } }]);
    // Post-effect: the cooldown waits for the recast's empowered attack.
    expect(ability("Zaahen", "Q")).toMatchObject({ cooldown: 6, chainCooldown: "last", cooldownAfter: "empower" });
    expect(ability("Zaahen", "Q").onSelf?.[0]).toMatchObject({ type: "empower", window: 4, bonusRange: 25, split: { physical: 0, magic: 0 } });
    expect(ability("Zaahen", "Q2").chain).toEqual({ root: "Q", index: 2, window: 9.5, delay: 1.5 });
    expect(ability("Zaahen", "W")).toMatchObject({ castTime: 0.5, delivery: { kind: "line", range: 850, width: 140, speed: 2900 } });
    expect(ability("Zaahen", "E").delivery).toEqual({ kind: "dash", direction: "toward", distance: 350, minDistance: 0, speed: 900, hitRadius: 375 });
    // The shockwave's 550 radius is a center range; the lockout holds 0.125 s (half the fuzzy 0.25 s) past the slam.
    expect(ability("Zaahen", "R").delivery).toEqual({ kind: "circle", range: 600, radius: 550, delay: 0.6, centered: true });
    expect(ability("Zaahen", "R").onCastStart?.[1]).toEqual({ type: "state", state: "damageReduction", value: 0.5, duration: 1.225 });
  });

  it("Zaahen fights: the recast 1.5 s after the glaive's attack, the cooldown after the recast's, and a revive at 12 stacks", () => {
    const compiled = kit("Zaahen");
    const killer = fighter({ id: "killer", base: { hp: 60000, armor: 100, mr: 100, ad: 700 } });
    const world = createWorld({ fighters: [compiled.spec, killer], distance: 300, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 60 } });
    const behaviors: [Behavior, Behavior] = [compiled.spec.behavior ?? defaultBehavior, defaultBehavior];
    const zaahen = world.units[0];
    let revived = -1;
    let restored = 0;
    while (!world.result) {
      step(world, behaviors);
      if (revived < 0 && world.log.some((e) => e.side === 0 && e.text === "enters resurrection")) revived = world.tick;
      if (revived >= 0 && world.tick === revived + 119) restored = zaahen.hp / derive(zaahen).maxHp;
    }
    const ticksOf = (text: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(text)).map((e) => e.tick);
    const strike = ticksOf("The Darkin Glaive deals")[0] ?? -1;
    const recast = ticksOf("casts The Darkin Glaive (recast)")[0] ?? -1;
    const recastHit = ticksOf("The Darkin Glaive (recast) deals")[0] ?? -1;
    expect(recast - strike).toBe(45);
    const nextCast = world.log.find((e) => e.side === 0 && e.text === "casts The Darkin Glaive" && e.tick > recast);
    expect(nextCast?.tick ?? Number.POSITIVE_INFINITY).toBeGreaterThanOrEqual(recastHit + 180);
    // Once: invulnerable and untargetable for 4 s, back to 75% of maximum health.
    expect(ticksOf("enters resurrection")).toHaveLength(1);
    expect(restored).toBeCloseTo(0.75, 1);
    expect(world.log.some((e) => e.side === 1 && e.text.startsWith("attack deals") && e.tick > revived && e.tick < revived + 120)).toBe(false);
  });
});
