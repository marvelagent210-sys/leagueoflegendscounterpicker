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

  it("Gnar", () => {
    // Mini Gnar: 400 – 500 range by level (511.765 at 20), 24 movement speed; Mega Gnar is the champion's other form.
    const gnar = kit("Gnar").spec;
    expect(gnar.attack).toMatchObject({ ranged: true, missileSpeed: 1500 });
    expect(gnar.attack.range).toBeCloseTo(511.765, 3);
    expect(gnar.base.moveSpeed).toBe(335 + 24);
    expect(gnar.forms?.["Mega Gnar"]?.attack).toMatchObject({ range: 175, ranged: false });
    expect(ability("Gnar", "Q")).toMatchObject({ cooldown: 10, castTime: 0.25, delivery: { kind: "line", range: 1125, width: 110, speed: 1950 } });
    expect(ability("Gnar", "Q").onHit).toEqual([
      { type: "damage", damageType: "physical", amount: { base: 165, ratios: { AD: 1.25 } } },
      { type: "cc", cc: "slow", strength: 0.35, duration: 2 },
    ]);
    // The leaps land 0.6 s after they start, however far they go.
    expect(ability("Gnar", "E").delivery).toMatchObject({ kind: "dash", direction: "away", distance: 475, time: 0.6 });
    expect(ability("Gnar", "E").onSelf).toEqual([{ type: "stat", stat: "attackSpeed", amount: { base: 0.6 }, duration: 6 }]);
    expect(ability("Gnar", "QM")).toMatchObject({ cooldownKey: "Q", castTime: 0.5, delivery: { kind: "line", range: 1150, width: 180, speed: 2100 } });
    expect(ability("Gnar", "W")).toMatchObject({ cooldown: 7, castTime: 0.6, delivery: { kind: "area", near: 0, far: 550 } });
    expect(ability("Gnar", "W").onHit?.[1]).toEqual({ type: "cc", cc: "stun", duration: 1.25 });
    expect(ability("Gnar", "EM")).toMatchObject({ cooldownKey: "E", delivery: { kind: "dash", direction: "toward", distance: 675, time: 0.6, hitRadius: 200 } });
    expect(ability("Gnar", "EM").onHit?.[0]).toEqual({ type: "damage", damageType: "physical", amount: { base: 220, ratios: { maxHP: 0.06 } } });
    // GNAR!: 590 units over 0.4 s; into a wall the increased damage and a 1.75 s stun.
    expect(ability("Gnar", "R").onHit).toEqual([
      {
        type: "displace",
        direction: "away",
        distance: 590,
        duration: 0.4,
        wallStun: 1.75,
        wallEffects: [{ type: "damage", damageType: "physical", amount: { base: 600, ratios: { bonusAD: 0.75, AP: 1.5 } }, label: "GNAR! (wall)" }],
      },
    ]);
  });

  it("Gnar fights: Rage to Mega Gnar for 15 s, then tired; the boomerang and the boulder refund their cooldown", () => {
    const compiled = kit("Gnar");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100, ad: 150, moveSpeed: 340 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 300, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 40 } });
    const gnar = world.units[0];
    const refunds: number[] = [];
    let rageAfterLash = -1;
    let gained = -1;
    let grown = -1;
    const rageByTick: number[] = [];
    while (!world.result) {
      const ready = gnar.cooldownReady.Q ?? 0;
      const [hp, maxHp, form] = [gnar.hp, derive(gnar).maxHp, gnar.spec.form];
      step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
      const now = gnar.cooldownReady.Q ?? 0;
      if (now < ready) refunds.push(ready - now);
      if (rageAfterLash < 0 && world.log.some((e) => e.side === 0 && e.text.startsWith("Boomerang Throw deals"))) rageAfterLash = Number(gnar.memory.rage);
      if (form !== gnar.spec.form && gnar.spec.form === "Mega Gnar") {
        gained = gnar.hp - hp;
        grown = derive(gnar).maxHp - maxHp;
      }
      rageByTick.push(Number(gnar.memory.rage ?? 0));
    }
    const ticksOf = (text: string) => world.log.filter((e) => e.side === 0 && e.text === text).map((e) => e.tick);
    // A champion hit by Boomerang Throw: 2.75 Rage at once, on the 50 the fight starts with.
    expect(rageAfterLash).toBe(52.75);
    // Full at 4.33 s: Mega Gnar at once, for 15 s, with the health the form adds.
    expect(ticksOf("becomes Mega Gnar")).toEqual([130]);
    const [mini = 0] = ticksOf("becomes Gnar");
    expect(mini).toBe(130 + 450);
    expect(gained).toBeGreaterThan(0);
    expect(gained).toBeCloseTo(grown, 9);
    // Then too tired for 15 s to build Rage, though the fight goes on.
    expect(rageByTick.slice(mini, mini + 450).every((r) => r === 0)).toBe(true);
    expect(rageByTick.at(-1)).toBeGreaterThan(0);
    // Catching the boomerang takes 40% of the 10 s cooldown off; picking up the boulder 70%.
    expect(new Set(refunds)).toEqual(new Set([120, 210]));
    expect(refunds.filter((r) => r === 210).length).toBeGreaterThan(1);
  });

  it("Gnar's boomerang comes back from its full range when it misses", () => {
    const compiled = kit("Gnar");
    const enemy = fighter({ id: "enemy", base: { hp: 20000 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 1500, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3 } });
    const gnar = world.units[0];
    const once: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "Q" } : undefined);
    let refunded = -1;
    while (!world.result) {
      const ready = gnar.cooldownReady.Q ?? 0;
      step(world, [once, () => undefined]);
      if ((gnar.cooldownReady.Q ?? 0) < ready) refunded = world.tick - 1;
    }
    expect(world.log.some((e) => e.text.startsWith("Boomerang Throw deals"))).toBe(false);
    // Thrown at tick 8 (0.25 s cast): 1125 units out at 1950 and back at 1330 is 42.7 ticks.
    expect(refunded).toBe(8 + 43);
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

  it("Kled", () => {
    // Mounted, the pair's health (Kled's 2061.86 and Skaarl's 1556.76); dismounted, the same maximum, 250 range and 40 less speed.
    const kled = kit("Kled").spec;
    expect(kled.base.hp).toBeCloseTo(2061.86 + 1556.765, 2);
    expect(kled.attack).toMatchObject({ range: 125, ranged: false });
    expect(kled.forms?.Kled?.base).toMatchObject({ hp: kled.base.hp, moveSpeed: 305 });
    expect(kled.forms?.Kled?.attack).toMatchObject({ range: 250, ranged: false });
    expect(ability("Kled", "Q")).toMatchObject({ cooldown: 7, castTime: 0.25, delivery: { kind: "line", range: 800, width: 90, speed: 1600 } });
    expect(ability("Kled", "Q").onHit).toEqual([
      { type: "damage", damageType: "physical", amount: { base: 130, ratios: { bonusAD: 0.6 } } },
      { type: "mark", key: "trap", duration: 1.75 },
    ]);
    // Jousting: 550 to reach the enemy and 350 through it, at 600 plus 345 movement speed; the recast within the 3 s mark.
    expect(ability("Kled", "E")).toMatchObject({ cooldown: 9, cooldownAfter: "dash", delivery: { kind: "dash", distance: 900, speed: 945, through: true } });
    expect(ability("Kled", "E2").chain).toEqual({ root: "E", index: 2, window: 3 });
    // Chaaaaaaaarge!!!: up to 950 in twelve steps, then 1000 from 500 units; a 150-unit knock back at 600.
    expect(ability("Kled", "R")).toMatchObject({ cooldown: 110, delivery: { kind: "dash", speed: 950, ramp: { every: 0.25 }, lockOn: { within: 500, speed: 1000 } } });
    expect((ability("Kled", "R").delivery as { ramp: { amount: number } }).ramp.amount).toBeCloseTo((950 - 345) / 12, 9);
    expect(ability("Kled", "R").onHit).toEqual([{ type: "displace", direction: "away", distance: 150, duration: 0.25 }]);
    expect(ability("Kled", "QD")).toMatchObject({ cooldown: 3, charges: { max: 2, recharge: 10 }, delivery: { kind: "line", range: 700, width: 80, speed: 3000 } });
  });

  it("Kled fights: Skaarl flees with the rest of the hit ignored, and Courage brings her back once with 70% of her health", () => {
    const compiled = kit("Kled");
    const enemy = fighter({ id: "enemy", base: { hp: 9000, armor: 100, mr: 100, ad: 400, moveSpeed: 340 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 300, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 45 } });
    const kled = world.units[0];
    const forms: Array<{ tick: number; form: string; hp: number; before: number; q: number; e: number }> = [];
    const courage: number[] = [];
    while (!world.result) {
      const [form, before] = [kled.spec.form, kled.hp];
      step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
      if (kled.spec.form !== form) forms.push({ tick: world.tick - 1, form: kled.spec.form ?? "", hp: kled.hp, before, q: kled.cooldownReady.Q ?? 0, e: kled.cooldownReady.E ?? 0 });
      courage.push(Number(kled.memory.courage ?? 0));
    }
    const [fled, back, again] = forms;
    // Skaarl gone: Kled at his own full health, though the hit was for more.
    expect(fled).toMatchObject({ form: "Kled", hp: 2061.86 });
    expect(fled?.before).toBeGreaterThan(2061.86);
    // 100 Courage: Skaarl back with 70% of her 1556.76, the trap and the joust ready at once.
    expect(back?.form).toBe("Kled & Skaarl");
    expect(back?.before).toBeLessThanOrEqual(2061.86);
    expect(back?.hp).toBeCloseTo(2061.86 + 0.7 * 1556.765, 0);
    expect([back?.q, back?.e]).toEqual([back?.tick, back?.tick]);
    expect(Math.max(...courage)).toBe(100);
    // Skaarl's Frayed Nerves: no Courage for 30 s, so the second dismount is the last.
    expect(again).toMatchObject({ form: "Kled", hp: 2061.86 });
    expect(forms).toHaveLength(3);
    expect(courage.slice((again?.tick ?? 0) + 1).every((c) => c === 0)).toBe(true);
  });

  it("Chaaaaaaaarge!!! hits harder the longer it charged before the dash, and its shield grows as it travels", () => {
    const compiled = kit("Kled");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 1500, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 4 } });
    const kled = world.units[0];
    const once: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "R" } : undefined);
    let locked = -1;
    let shieldAtHit = -1;
    while (!world.result) {
      step(world, [once, () => undefined]);
      const action = kled.action;
      if (action?.kind === "dash" && action.lockedTick !== undefined && locked < 0) locked = action.lockedTick;
      if (shieldAtHit < 0 && world.log.some((e) => e.text.startsWith("Chaaaaaaaarge!!! deals"))) shieldAtHit = kled.statuses.find((st) => st.kind === "shield")?.value ?? 0;
    }
    // It saw the enemy 2.1 s in: 13 steps of 0.16 s, 104% more than 8% of 20000, halved by 100 magic resistance.
    expect(locked).toBe(63);
    const hit = world.log.find((e) => e.text.startsWith("Chaaaaaaaarge!!! deals"));
    expect(hit?.text).toBe(`Chaaaaaaaarge!!! deals ${Math.round(0.08 * 20000 * (1 + 0.08 * Math.floor(63 / 30 / 0.16)) * 0.5)} magic damage`);
    // 80, and 40 for each 0.25 s on the way, up to 2 s: 400; it lasts 2 s after the charge.
    expect(shieldAtHit).toBe(400);
    expect(kled.statuses.find((st) => st.kind === "shield")?.endTick).toBe((hit?.tick ?? 0) + 1 + 60);
  });

  it("Violent Tendencies: four quick attacks, the fourth harder; its 9 s cooldown starts after them, 1.5 s shorter for each hit", () => {
    const compiled = kit("Kled");
    const enemy = fighter({ id: "enemy", base: { hp: 9000, armor: 100, mr: 100, ad: 50 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 0, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 12 } });
    const kled = world.units[0];
    const readyAfter: number[] = [];
    while (!world.result) {
      step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
      if (world.log.some((e) => e.tick === world.tick - 1 && e.text.startsWith("Violent Tendencies deals"))) readyAfter.push(Number(kled.memory.vtReady) - (world.tick - 1));
    }
    const attacks = world.log.filter((e) => e.side === 0 && e.text.startsWith("attack deals")).map((e) => e.tick);
    const procs = world.log.filter((e) => e.text.startsWith("Violent Tendencies deals"));
    // 60 + 6.5% of 9000, halved by 100 armor.
    expect(procs[0]?.text).toBe("Violent Tendencies deals 323 physical damage");
    expect(readyAfter[0]).toBe(270);
    // The proc comes with the fourth attack since the first in the window.
    const first = procs[0]?.tick ?? 0;
    expect(attacks.filter((t) => t <= first)).toHaveLength(4);
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

  it("Skarner", () => {
    // Shattered Earth: three empowered attacks; the cooldown runs from the last of them.
    expect(ability("Skarner", "Q")).toMatchObject({ cooldown: 3, castTime: 0.35, cooldownAfter: "empower" });
    expect(ability("Skarner", "Q").onSelf?.[0]).toMatchObject({ type: "empower", attacks: 3, window: 5, bonusRange: 25, onHit: [{ amount: { base: 50, ratios: { bonusAD: 0.9, bonusHP: 0.03 } } }] });
    expect(ability("Skarner", "Q2").onHit?.[0]).toMatchObject({ amount: { base: 50, ratios: { bonusAD: 0.9, bonusHP: 0.03, targetMaxHP: 0.11 } } });
    expect(ability("Skarner", "W").onCastStart).toEqual([{ type: "shield", amount: { base: 0, ratios: { maxHP: 0.08 } }, duration: 2.5 }]);
    // Ixtal's Impact: from 150 speed, 100 more every 0.264 s, up to 950; crowd control stops it.
    expect(ability("Skarner", "E")).toMatchObject({ cooldown: 18, cooldownAfter: "dash", interruptible: {} });
    expect(ability("Skarner", "E").delivery).toMatchObject({ kind: "dash", speed: 950, ramp: { amount: 100, every: 0.264, from: 150 } });
    expect(ability("Skarner", "R")).toMatchObject({ castTime: 0.75, delivery: { kind: "area", near: -50, far: 625 } });
    expect(ability("Skarner", "R").onHit?.slice(1)).toEqual([
      { type: "cc", cc: "suppression", duration: 1.5 },
      { type: "attach", offset: 300, duration: 1.5 },
    ]);
  });

  it("Skarner fights: Quaking every 0.5 s at 3 stacks, and Ixtal's Impact into the wall", () => {
    const compiled = kit("Skarner");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100, ad: 100, moveSpeed: 300 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 800, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 12 } });
    while (!world.result) step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
    const ticksOf = (text: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(text)).map((e) => e.tick);
    // 9.47% of 20000 over 4 s in eighths: 236.8 a tick, halved by 100 magic resistance.
    const quakes = ticksOf("Quaking deals");
    expect(quakes.length).toBeGreaterThan(3);
    expect(world.log.find((e) => e.text.startsWith("Quaking deals"))?.text).toBe("Quaking deals 118 magic damage");
    expect(new Set(quakes.slice(1).map((t, i) => t - (quakes[i] ?? 0)))).toEqual(new Set([15]));
    // The charge grabs the enemy and carries it into the lane's wall: a 1.1 s stun.
    expect(ticksOf("slams the enemy into the wall")).toHaveLength(1);
    expect(world.log.some((e) => e.side === 0 && e.text === "inflicts stun for 1.10 s")).toBe(true);
  });

  it("Tahm Kench", () => {
    // An Acquired Taste on attacks and as Tongue Lash's own hit: 60 (the wiki's level-12 value) + 4% bonus health + 1.25% AP per 100 bonus health.
    const taste = { type: "damage", damageType: "magic", amount: { base: 60, ratios: { bonusHP: 0.04 }, products: [{ ratio: 0.000125, stats: ["AP", "bonusHP"] }] }, label: "An Acquired Taste" };
    expect(kit("TahmKench").spec.attack.onHit).toEqual([taste]);
    expect(ability("TahmKench", "Q").onHit?.slice(0, 2)).toEqual([{ type: "damage", damageType: "magic", amount: { base: 255, ratios: { AP: 1 } } }, taste]);
    expect(ability("TahmKench", "Qstun").onHit?.at(-1)).toEqual({ type: "cc", cc: "stun", duration: 1.5 });
    // Abyssal Dive: a 1.35 s channel; the blink 0.15 s later; its 275 radius is a center range, hidden for 0.75 s.
    expect(ability("TahmKench", "W")).toMatchObject({ castTime: 1.35, cooldownAtCastStart: true, interruptible: {} });
    expect(ability("TahmKench", "W").delivery).toEqual({ kind: "circle", range: 1200, radius: 275, delay: 0.15, centered: true, hidden: 0.75 });
    expect(ability("TahmKench", "E")).toMatchObject({ cooldown: 3, castTime: 0.25, cooldownAfter: "state" });
    // Devour: 250 edge range; the enemy held 0.25 + 3 s, then Regurgitate's damage.
    expect(ability("TahmKench", "R").delivery).toEqual({ kind: "target", range: 250, edge: true });
    expect(ability("TahmKench", "R").onHit?.[0]).toEqual({ type: "cc", cc: "suppression", duration: 3.25 });
    expect(ability("TahmKench", "R").onHit?.at(-1)).toMatchObject({ type: "delayed", delay: 3.25, effects: [{ type: "damage", amount: { base: 400, ratios: { targetMaxHP: 0.15 } } }] });
  });

  it("Tahm Kench fights: three stacks open Devour, and the grey health becomes a shield", () => {
    const compiled = kit("TahmKench");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100, ad: 400 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 0, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 20 } });
    const tahm = world.units[0];
    const devour = allAbilities(compiled.spec).find((a) => a.key === "R");
    let stacksAtDevour = -1;
    const own = compiled.spec.behavior ?? defaultBehavior;
    const watched: Behavior = (view) => {
      const command = own(view);
      if (command?.kind === "cast" && command.ability === "R" && stacksAtDevour < 0) stacksAtDevour = Number(tahm.memory.taste ?? 0);
      return command;
    };
    let shield = -1;
    let greyBefore = 0;
    while (!world.result) {
      const grey = Number(tahm.memory.grey ?? 0);
      step(world, [watched, defaultBehavior]);
      const status = tahm.statuses.find((st) => st.kind === "shield" && st.key === "E");
      if (status && shield < 0) {
        shield = status.value;
        greyBefore = grey;
        expect(tahm.memory.grey).toBe(0);
      }
    }
    expect(devour).toBeDefined();
    expect(stacksAtDevour).toBe(3);
    const ticksOf = (text: string) => world.log.filter((e) => e.side === 0 && e.text.startsWith(text)).map((e) => e.tick);
    const swallowed = ticksOf("casts Devour")[0] ?? -1;
    expect(ticksOf("Regurgitate deals")[0]).toBe(swallowed + 98);
    // Nothing is thrown at the enemy while it is inside.
    expect(world.log.some((e) => e.side === 0 && e.text.includes("misses") && e.tick > swallowed && e.tick < swallowed + 98)).toBe(false);
    // Thick Skin turns the grey health (47% of the health lost) into a shield of the same size.
    expect(shield).toBeGreaterThan(0);
    expect(shield).toBeCloseTo(greyBefore, 9);
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
