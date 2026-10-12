import { describe, expect, it } from "vitest";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { inAttackRange } from "../../engine/sim/actions";
import { derive } from "../../engine/sim/derived";
import { allAbilities } from "../../engine/sim/forms";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
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

  it("Heimerdinger", () => {
    // Three turret kits, one every 20 s; 20 mana a turret.
    expect(ability("Heimerdinger", "Q")).toMatchObject({ cooldown: 1, cost: 20, castTime: 0.25, charges: { max: 3, recharge: 20 } });
    // Hextech Micro-Rockets: all five, 270 (+ 103% AP); the swarm's twenty, 892 (+ 183% AP).
    expect(ability("Heimerdinger", "W")).toMatchObject({ cooldown: 7, cost: 90, castTime: 0.25, delivery: { kind: "line", range: 1150, width: 200, speed: 750 } });
    expect(ability("Heimerdinger", "W").onHit).toEqual([{ type: "damage", damageType: "magic", amount: { base: 270, ratios: { AP: 1.03 } }, label: "Hextech Micro-Rockets" }]);
    expect(ability("Heimerdinger", "RW")).toMatchObject({ cooldownKey: "W", onHit: [{ amount: { base: 892, ratios: { AP: 1.83 } } }] });
    // CH-2 Electron Storm Grenade: 220 (+ 60% AP) within 250, a 35% slow for 2 s; it lands after its 925 units at 1200.
    expect(ability("Heimerdinger", "E")).toMatchObject({ cooldown: 11, cost: 85, delivery: { kind: "circle", range: 925, radius: 250, delay: 925 / 1200 } });
    expect(ability("Heimerdinger", "E").onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 220, ratios: { AP: 0.6 } }, label: "CH-2 Electron Storm Grenade" },
      { type: "cc", cc: "slow", duration: 2, strength: 0.35 },
    ]);
    expect(ability("Heimerdinger", "RE")).toMatchObject({ cooldownKey: "E", delivery: { radius: 300 } });
    expect(ability("Heimerdinger", "RE").onHit?.[0]).toMatchObject({ amount: { base: 300, ratios: { AP: 0.6 } } });
    expect(ability("Heimerdinger", "R")).toMatchObject({ cooldown: 70, cost: 100, castTime: 0 });
    // Each matchup tries all three upgrades unless one is pinned.
    expect(kit("Heimerdinger").variants).toEqual([1, 2, 3].map((upgrade) => ({ turrets: 3, upgrade })));
    expect(kit("Heimerdinger", { upgrade: 3 }).variants).toEqual([]);
  });

  it("Heimerdinger fights: three turrets by him from the start; the grenade's stun lets their fully charged beams land", () => {
    const compiled = kit("Heimerdinger");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 300, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3, reactionTime: 10 } });
    const heimer = world.units[0];
    const turrets = world.pets.filter((p) => p.spec.kind === "turret");
    expect(turrets).toHaveLength(3);
    // 700 health at level 20 (+ 53% AP), 110 armor, 86 magic resistance; 23 (+ 35% AP) from 550, 1.75 a second; melee attacks deal 40% more.
    expect(turrets[0]).toMatchObject({ x: heimer.x, spec: { hp: 700, armor: 110, mr: 86, radius: 35, meleeAttackTaken: 1.4, attack: { range: 550 } } });
    expect(turrets[0]?.spec.attack?.interval).toBeCloseTo(1 / 1.75, 9);
    const once: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "E" } : undefined);
    while (!world.result) step(world, [once, () => undefined]);
    expect(world.log.find((e) => e.text.startsWith("H-28G Evolution Turret deals"))?.text).toBe(`H-28G Evolution Turret deals ${Math.round(23 / 2)} magic damage`);
    // The grenade lands 8 + 24 ticks in, on the enemy: stunned for 1.5 s, and the turrets charged fully.
    const stun = world.log.find((e) => e.text === "inflicts stun for 1.50 s");
    expect(stun?.tick).toBe(32);
    const fired = world.log.filter((e) => e.text === "H-28G Evolution Turret fires its beam").map((e) => e.tick);
    expect(fired).toEqual([33, 33, 33]);
    // 0.425 s to wind up and 365 units at 1400 a second: all three land on the stunned enemy, 120 halved.
    const beams = world.log.filter((e) => e.text.startsWith("Turret beam deals"));
    expect(beams.map((e) => [e.tick, e.text])).toEqual([0, 1, 2].map(() => [33 + 21, "Turret beam deals 60 magic damage"]));
  });

  it("Illaoi", () => {
    // The slam: 9 - 180 by level, 200.12 at 20 (+ 110% AD) (+ 40% AP), 30% more at Tentacle Smash's rank 5; 927.75 long, landing in 0.75 s.
    const slam = ability("Illaoi", "SLAM");
    expect(slam.delivery).toEqual({ kind: "area", near: 0, far: 927.75, delay: 0.75, anchor: "ground" });
    const hit = slam.onHit?.[0];
    expect(hit?.type === "damage" && hit.amount.base).toBeCloseTo((9 + (171 / 17) * 19) * 1.3, 9);
    expect(hit?.type === "damage" && hit.amount.ratios).toEqual({ AD: expect.closeTo(1.43, 9), AP: expect.closeTo(0.52, 9) });
    // 50% less for each slam taken in the last 0.66 s, at most 75% less; 5% of her missing health back.
    expect(slam.falloff).toEqual({ group: "slam", per: 0.5, window: 0.66, floor: 0.25 });
    expect(slam.onHit?.[1]).toEqual({ type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { missingHP: 0.05 } } }] });
    // Tentacle Smash slams like a Tentacle; its heal comes once, from the hooks.
    expect(ability("Illaoi", "Q")).toMatchObject({ cooldown: 6, cost: 60, castTime: 0.75, delivery: { kind: "line", range: 802.75, width: 200 }, falloff: slam.falloff, onHit: [hit] });
    // Harsh Lesson: 5% (+ 3.5% per 100 AD) of maximum health, at least 60, on an attack within 6 s with 225 more range.
    const lesson = ability("Illaoi", "W");
    expect(lesson).toMatchObject({ cooldown: 4, cost: 30, castTime: 0, cooldownAfter: "empower", overlay: true });
    expect(lesson.onSelf).toEqual([
      {
        type: "empower",
        attacks: 1,
        window: 6,
        bonusRange: 225,
        uncancellable: true,
        resetAttack: true,
        onHit: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { targetMaxHP: 0.05 }, products: [{ ratio: expect.closeTo(0.00035, 12), stats: ["AD", "targetMaxHP"] }] }, minimum: { base: 60 }, label: "Harsh Lesson" }],
      },
    ]);
    expect(ability("Illaoi", "E")).toMatchObject({ cooldown: 12, cost: 55, castTime: 0.25, decisive: true, delivery: { kind: "line", range: 950, width: 100, speed: 1900 }, flags: { projectile: true, spellShield: true } });
    expect(ability("Illaoi", "VESSEL").onHit).toEqual([{ type: "cc", cc: "slow", duration: 1.5, strength: 0.8 }]);
    expect(ability("Illaoi", "R")).toMatchObject({ cooldown: 70, cost: 100, castTime: 0.5, delivery: { kind: "aura", radius: 500 }, onCastStart: [{ type: "state", state: "displacementImmune", duration: 0.5 }] });
    expect(ability("Illaoi", "R").onHit).toEqual([{ type: "damage", damageType: "physical", amount: { base: 350, ratios: { bonusAD: 0.5 } }, label: "Leap of Faith" }]);
  });

  // Illaoi's level-20 numbers: 163.325 AD; a slam is 260.15 + 143% AD; Test of Spirit echoes 45% + 8% per 100 AD.
  const illaoiAd = 163.325;
  const slamRaw = (9 + (171 / 17) * 19) * 1.3 + 1.43 * illaoiAd;
  const echoShare = 0.45 + 0.0008 * illaoiAd;
  const spiritOf = (world: { pets: Array<{ spec: { kind: string }; id: number }> }) => world.pets.find((p) => p.spec.kind === "spirit");
  // After the opening cast, attacks: the Spirit while it stands, else the champion.
  const illaoiPlan =
    (opening: string): Behavior =>
    (view) => {
      if (view.world.tick === 0) return { kind: "cast", ability: opening };
      if (view.self.action) return undefined;
      const spirit = spiritOf(view.world);
      return spirit ? { kind: "attack", pet: spirit.id } : { kind: "attack" };
    };

  it("Illaoi fights: a Tentacle beside her from the start; Harsh Lesson's hit tells it to slam, landing 0.75 s later", () => {
    const compiled = kit("Illaoi");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    // A slow reaction: every slam lands.
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 0, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3, reactionTime: 10 } });
    const illaoi = world.units[0];
    expect(world.pets).toHaveLength(1);
    expect(world.pets[0]).toMatchObject({ owner: 0, x: illaoi.x, hp: 2, spec: { kind: "tentacle", hitPoints: true, radius: 65 } });
    expect(world.pets[0]?.spec.untargetable).toBeFalsy();
    while (!world.result) step(world, [illaoiPlan("W"), () => undefined]);
    const at = (prefix: string) => world.log.filter((e) => e.text.startsWith(prefix));
    // 5% (+ 3.5% per 100 AD) of 20000, halved by 100 armor.
    const lessonHit = at("Harsh Lesson deals")[0];
    expect(lessonHit?.text).toBe(`Harsh Lesson deals ${Math.round(((0.05 + 0.00035 * illaoiAd) * 20000) / 2)} physical damage`);
    const slams = at("Tentacle slams at the enemy");
    expect(slams.map((e) => e.tick)).toEqual([(lessonHit?.tick ?? 0) + 1]);
    const landed = at("Tentacle deals");
    expect(landed.map((e) => e.tick)).toEqual([(slams[0]?.tick ?? 0) + 23]);
    expect(landed[0]?.text).toBe(`Tentacle deals ${Math.round(slamRaw / 2)} physical damage`);
    // No other Tentacle rises while this one stands within 1000.
    expect(world.pets).toHaveLength(1);
  });

  it("Test of Spirit: Illaoi can't act through the pull; the Spirit stands before her with the enemy's health and resistances and echoes 58% of what it takes", () => {
    const compiled = kit("Illaoi");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 120 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 400, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3, reactionTime: 10 } });
    const [illaoi, target] = world.units;
    let hitTick = -1;
    let lastLocked = -1;
    let spirit: (typeof world.pets)[number] | undefined;
    while (!world.result) {
      step(world, [illaoiPlan("E"), () => undefined]);
      if (hitTick < 0 && illaoi.memory.tetherUntil !== undefined) hitTick = world.tick - 1;
      if (illaoi.statuses.some((s) => s.kind === "state" && s.key === "noAttacks")) lastLocked = world.tick - 1;
      spirit ??= world.pets.find((p) => p.spec.kind === "spirit");
    }
    // Pulled out 0.75 s after the hit, 100 units in front of her; locked out until then.
    const pulled = world.log.find((e) => e.text === "pulls out the enemy's Spirit");
    expect(pulled?.tick).toBe(hitTick + 23);
    expect(lastLocked).toBe(hitTick + 22);
    expect(spirit).toMatchObject({ owner: 1, x: illaoi.x + 100, spec: { hp: 20000, armor: 100, mr: 120, radius: 65 } });
    // The tether's 7 s run from the hit.
    expect(spirit?.endTick).toBe(hitTick + 210);
    // Her attack: 163.3 on the Spirit, halved by its armor, and 58% of it on the enemy, halved by the enemy's.
    expect(world.log.find((e) => e.text.startsWith("hits Spirit"))?.text).toBe(`hits Spirit for ${Math.round(illaoiAd / 2)}`);
    const echoes = world.log.filter((e) => e.text.startsWith("Test of Spirit (echo) deals")).map((e) => e.text);
    expect(echoes).toContain(`Test of Spirit (echo) deals ${Math.round((illaoiAd * echoShare) / 2)} physical damage`);
    // The Tentacle slams the Spirit at once on its own; it lands 0.75 s later on the Spirit and on the enemy beyond it.
    expect(world.log.find((e) => e.text === "Tentacle slams at the Spirit")?.tick).toBe(pulled?.tick);
    expect(echoes).toContain(`Test of Spirit (echo) deals ${Math.round((slamRaw * echoShare) / 2)} physical damage`);
    expect(world.log.find((e) => e.text.startsWith("Tentacle deals"))?.tick).toBe((pulled?.tick ?? 0) + 23);
    expect(target.alive).toBe(true);
  });

  it("A Vessel: with its Spirit killed, the enemy is slowed 80% for 1.5 s and a Tentacle rises by it", () => {
    const compiled = kit("Illaoi");
    // Just out of the slam's reach, inside the tendril's: the Spirit dies before its champion.
    const enemy = fighter({ id: "enemy", base: { hp: 400, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 870, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 4, reactionTime: 10 } });
    const [illaoi, target] = world.units;
    while (!world.result && illaoi.memory.vesselUntil === undefined) step(world, [illaoiPlan("E"), () => undefined]);
    const vesselTick = world.tick - 1;
    expect(spiritOf(world)).toBeUndefined();
    expect(target.alive).toBe(true);
    expect(Number(illaoi.memory.vesselUntil)).toBe(vesselTick + 120);
    const slow = target.statuses.find((s) => s.kind === "cc" && s.key === "slow");
    expect(slow).toMatchObject({ value: 0.8, startTick: vesselTick, endTick: vesselTick + 45 });
    // Her Tentacle stands 1000 units away: one rises at the Vessel, untargetable for 2 s.
    const risen = world.pets.filter((p) => p.spec.kind === "tentacle" && p.x === target.x);
    expect(risen).toHaveLength(1);
    expect(risen[0]?.spec.untargetable).toBe(true);
    expect(risen[0]?.memory.activeAt).toBe(vesselTick + 60);
  });

  it("Leap of Faith: a Tentacle 700 units toward the enemy for 8 s; Tentacles out of reach, slamming in 0.5 s then locked 0.5 s; Harsh Lesson's cooldown halved", () => {
    const compiled = kit("Illaoi");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 100, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3, reactionTime: 10 } });
    const [illaoi, target] = world.units;
    const plan: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "R" } : view.world.tick === 20 ? { kind: "cast", ability: "W" } : view.self.action ? undefined : { kind: "attack" });
    let immune = false;
    let launch = -1;
    let readyAfter = -1;
    while (!world.result) {
      const attacking = illaoi.action?.kind === "windup";
      step(world, [plan, () => undefined]);
      if (world.tick === 1) immune = illaoi.statuses.some((s) => s.kind === "state" && s.key === "displacementImmune");
      if (launch < 0 && attacking && illaoi.action?.kind !== "windup" && world.log.some((e) => e.text.startsWith("Harsh Lesson deals"))) {
        launch = world.tick - 1;
        readyAfter = (illaoi.cooldownReady.W ?? 0) - launch;
      }
    }
    expect(immune).toBe(true);
    const summoned = world.log.find((e) => e.text === "summons a Tentacle");
    expect(summoned?.tick).toBe(15);
    const leapTentacle = world.pets.find((p) => p.x === illaoi.x + 700);
    expect(leapTentacle?.endTick).toBe(15 + 240);
    expect(world.pets.every((p) => p.spec.untargetable)).toBe(true);
    // Both Tentacles answer Harsh Lesson; their slams land 0.5 s later.
    const slamStarts = world.log.filter((e) => e.text === "Tentacle slams at the enemy").map((e) => e.tick);
    expect(slamStarts).toEqual([launch + 1, launch + 1]);
    expect(world.log.filter((e) => e.text.startsWith("Tentacle deals")).map((e) => e.tick)).toEqual([launch + 16, launch + 16]);
    expect(target.alive).toBe(true);
    // 4 s halved.
    expect(readyAfter).toBe(60);
  });

  it("Jayce", () => {
    // Hammer Stance (the champion's form, melee) and Cannon Stance (500 range, the game files' 2000 missile speed).
    const jayce = kit("Jayce").spec;
    expect(jayce.form).toBe("Hammer Stance");
    expect(jayce.attack).toMatchObject({ range: 125, ranged: false });
    expect(jayce.forms?.["Cannon Stance"]?.attack).toMatchObject({ range: 500, ranged: true, missileSpeed: 2000 });
    // To the Skies!: 600 to the enemy, landing 0.5 s later however far.
    expect(ability("Jayce", "QH")).toMatchObject({ cooldown: 6, cost: 40, delivery: { kind: "dash", direction: "target", distance: 600, time: 0.5, hitRadius: 300 } });
    expect(ability("Jayce", "WH").delivery).toEqual({ kind: "field", range: 0, radius: 350, duration: 4, interval: 1, attached: true });
    expect(ability("Jayce", "EH").onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: 0.22, bonusAD: 1 } } },
      { type: "displace", direction: "away", distance: 600, duration: 0.35 },
    ]);
    // Shock Blast, and through the gate: 1600 at 2350 for 40% more.
    expect(ability("Jayce", "QC")).toMatchObject({ cooldown: 8, cost: 80, castTime: 0.2143, delivery: { kind: "line", range: 1050, width: 140, speed: 1450 } });
    expect(ability("Jayce", "QG")).toMatchObject({ cooldownKey: "QC", delivery: { kind: "line", range: 1600, width: 140, speed: 2350 } });
    expect(ability("Jayce", "QG").onHit).toEqual([{ type: "damage", damageType: "physical", amount: { base: 399, ratios: { bonusAD: 1.82 } } }]);
    // Hyper Charge: 3 attacks within 4 s at 110% AD and 360% attack speed; its cooldown after them.
    expect(ability("Jayce", "WC")).toMatchObject({ cooldown: 5, cooldownAfter: "empower" });
    expect(ability("Jayce", "WC").onSelf).toEqual([
      { type: "empower", attacks: 3, window: 4, onHit: [], split: { physical: 1.1, magic: 0 }, resetAttack: true },
      { type: "stat", stat: "attackSpeed", amount: { base: 3.6 }, duration: 4 },
    ]);
    expect([ability("Jayce", "R").cooldown, ability("Jayce", "RH").cooldownKey]).toEqual([6, "R"]);
  });

  it("Jayce fights: both stances in turn, Shock Blast through the gate, and each stance's first attack", () => {
    const compiled = kit("Jayce");
    const enemy = fighter({ id: "enemy", base: { hp: 9000, armor: 100, mr: 100, ad: 200, moveSpeed: 340 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 300, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 20 } });
    const jayce = world.units[0];
    const guard: Array<{ form: string; armor: number }> = [];
    let lockedAfterBlow = -1;
    while (!world.result) {
      step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
      guard.push({ form: jayce.spec.form ?? "", armor: derive(jayce).armor.bonus });
      const blow = world.log.find((e) => e.side === 0 && e.text === "casts Thundering Blow");
      if (blow && lockedAfterBlow < 0 && world.tick > blow.tick + 8) lockedAfterBlow = Math.min(jayce.cooldownReady.QH ?? 0, jayce.cooldownReady.QC ?? 0) - (blow.tick + 8);
    }
    const ticksOf = (text: string) => world.log.filter((e) => e.side === 0 && e.text === text).map((e) => e.tick);
    const texts = world.log.filter((e) => e.side === 0).map((e) => e.text);
    // Both stances, and back.
    expect(ticksOf("becomes Cannon Stance").length).toBeGreaterThan(0);
    expect(ticksOf("becomes Jayce").length).toBeGreaterThan(0);
    // Hammer Stance's 26 armor (no bonus AD here), none in Cannon Stance.
    expect(new Set(guard.filter((g) => g.form === "Hammer Stance").map((g) => g.armor))).toEqual(new Set([26]));
    expect(new Set(guard.filter((g) => g.form === "Cannon Stance").map((g) => g.armor))).toEqual(new Set([0]));
    // The gate and the blast together; 399 through 100 armor less the Cannon's 35% shred.
    expect(ticksOf("casts Shock Blast (through the gate)")).toEqual(ticksOf("casts Acceleration Gate"));
    expect(texts).toContain(`Shock Blast (through the gate) deals ${Math.round((399 * 100) / (100 + 65))} physical damage`);
    // Thundering Blow: 22% of 9000, halved; no To the Skies! or Shock Blast for 0.4 s after its cast time.
    expect(texts).toContain("Thundering Blow deals 990 magic damage");
    expect(lockedAfterBlow).toBeGreaterThanOrEqual(12);
    // Hammer Stance's first attack: 130 more magic damage, halved.
    expect(texts).toContain("Transform Mercury Hammer deals 65 magic damage");
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

  it("Udyr", () => {
    // Unpinned, the kit shows the reference split (Q6 W5 E5 R5) and offers every split of his 21 points.
    const udyr = kit("Udyr");
    expect(udyr.options).toMatchObject({ tripleTonic: 1, rankQ: 0, rankW: 0, rankE: 0, rankR: 0 });
    expect(udyr.variants).toHaveLength(20);
    expect(udyr.variants.every((v) => (v.rankQ ?? 0) + (v.rankW ?? 0) + (v.rankE ?? 0) + (v.rankR ?? 0) === 21)).toBe(true);
    expect(kit("Udyr", { tripleTonic: 0 }).variants).toHaveLength(35);
    expect(kit("Udyr", { rankQ: 6, rankW: 6, rankE: 6, rankR: 3 }).variants).toEqual([]);
    expect(() => kit("Udyr", { rankQ: 6, rankW: 6, rankE: 6, rankR: 4 })).toThrow(/spend 22 skill points; level 20 gives 21/);
    // Triple Tonic: Elixir of Avarice's 60 gold (its patch history; the item data still says 40).
    expect(udyr.spec.extraGold).toBe(60);
    expect(kit("Udyr", { tripleTonic: 0 }).spec.extraGold).toBeUndefined();
    // Iron Mantle at rank 5; the Awaken adds its level-20 165.29 and the cast's own 125.
    expect(ability("Udyr", "W").onSelf).toEqual([{ type: "shield", amount: { base: 125, ratios: { bonusAD: 0.5, AP: 0.4, maxHP: 0.032 } }, duration: 4 }]);
    const awakened = ability("Udyr", "W2").onSelf?.[0] as { amount: { base: number; ratios: Record<string, number> } };
    expect(awakened.amount.base).toBeCloseTo(165.294 + 125, 2);
    expect(awakened.amount.ratios).toEqual({ bonusAD: 1, AP: 0.65, maxHP: 0.08 });
    const pinned = (key: string) => allAbilities(kit("Udyr", { rankQ: 3, rankW: 6, rankE: 6, rankR: 6 }).spec).find((a) => a.key === key);
    expect(pinned("W")?.onSelf).toEqual([{ type: "shield", amount: { base: 145, ratios: { bonusAD: 0.5, AP: 0.4, maxHP: 0.035 } }, duration: 4 }]);
    // Every stance: 6 s, recast to Awaken it 0.25 s to 5 s later.
    expect(ability("Udyr", "Q2").chain).toEqual({ root: "Q", index: 2, window: 5, delay: 0.25 });
    expect(ability("Udyr", "E2").onSelf).toEqual([{ type: "state", state: "ccImmune", duration: 1.5 }]);
    // Wingborne Storm's blizzard around him; Awakened, a storm that moves to the enemy at 250.
    expect(ability("Udyr", "R").delivery).toEqual({ kind: "field", range: 0, radius: 370, duration: 4, interval: 0.5, attached: true });
    expect(ability("Udyr", "R2").delivery).toMatchObject({ kind: "field", chase: 250, duration: 4, interval: 0.5 });
  });

  it("Udyr fights: the stance dance, Wilding Claw's lightning, and Monk Training's refunds", () => {
    const compiled = kit("Udyr");
    const enemy = fighter({ id: "enemy", base: { hp: 9000, armor: 100, mr: 100, ad: 200, moveSpeed: 340 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 400, modes: ["fight", "fight"], settings: { log: true, maxSeconds: 12 } });
    const udyr = world.units[0];
    const readyAt: Array<[number, number]> = [];
    while (!world.result) {
      step(world, [compiled.spec.behavior ?? defaultBehavior, defaultBehavior]);
      readyAt.push([world.tick - 1, Number(udyr.memory.awakenReady ?? 0)]);
    }
    const casts = world.log.filter((e) => e.side === 0 && e.text.startsWith("casts ")).map((e) => [e.tick, e.text.slice(6)]);
    // Blazing Stampede to close in and stun; then a stance every 1.5 s (the global cooldown), Wilding Claw
    // Awakened 0.25 s after it; Wilding Claw's 6 s again from the Awaken, which refreshes it.
    expect(casts.slice(0, 9)).toEqual([
      [0, "Blazing Stampede"],
      [45, "Wilding Claw"],
      [53, "Wilding Claw (Awaken)"],
      [90, "Wingborne Storm"],
      [135, "Iron Mantle"],
      [180, "Blazing Stampede"],
      [53 + 180, "Wilding Claw"],
      [278, "Wingborne Storm"],
      [323, "Iron Mantle"],
    ]);
    // Awakened Spirit: 20 s from the Awaken, 1 s less for each of the two Monk Training hits after every cast.
    const refunds = readyAt.filter(([, r], i) => i > 0 && r !== readyAt[i - 1]?.[1]).map(([, r]) => r);
    expect(refunds[0]).toBe(53 + 600);
    expect(new Set(refunds.slice(1).map((r, i) => (refunds[i] ?? 0) - r))).toEqual(new Set([30]));
    // Lightning: 6 strikes from each of the next two hits, 1/6 s apart, each 3.18% of 9000 halved.
    const strikes = world.log.filter((e) => e.side === 0 && e.text.startsWith("Wilding Claw (lightning)"));
    expect(strikes).toHaveLength(12);
    expect(new Set(strikes.map((e) => e.text))).toEqual(new Set([`Wilding Claw (lightning) deals ${Math.round(0.0317647 * 9000 * 0.5)} magic damage`]));
  });

  it("Yorick", () => {
    // Last Rites: the next attack within 5 s, 50 more range, 110 (+ 50% AD) and 78 (+ 10% of his missing health) back.
    expect(ability("Yorick", "Q")).toMatchObject({ cooldown: 4, cost: 20, castTime: 0, cooldownAfter: "empower" });
    expect(ability("Yorick", "Q").onSelf).toEqual([
      {
        type: "empower",
        attacks: 1,
        window: 5,
        bonusRange: 50,
        uncancellable: true,
        resetAttack: true,
        onHit: [
          { type: "damage", damageType: "physical", amount: { base: 110, ratios: { AD: 0.5 } }, label: "Last Rites" },
          { type: "caster", effects: [{ type: "heal", amount: { base: 78, ratios: { missingHP: 0.1 } } }] },
        ],
      },
    ]);
    expect(ability("Yorick", "W")).toMatchObject({ cooldown: 12, cost: 70, castTime: 0, delivery: { kind: "circle", range: 600, radius: 225, delay: 0.75 } });
    // Mourning Mist: 8% (+ 3% per 100 AP) of maximum health, 30% slower for 1.5 s, Cursed for 4 s with 25% less armor.
    expect(ability("Yorick", "E")).toMatchObject({ cooldown: 8, cost: 70, castTime: 0.25, delivery: { kind: "circle", range: 700, radius: 225, delay: 700 / 1800 } });
    expect(ability("Yorick", "E").onHit).toEqual([
      { type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: 0.08 }, products: [{ ratio: expect.closeTo(0.0003, 12), stats: ["AP", "targetMaxHP"] }] }, label: "Mourning Mist" },
      { type: "cc", cc: "slow", duration: 1.5, strength: 0.3 },
      { type: "stat", stat: "armorReductionPercent", amount: { base: 0.25 }, duration: 4 },
      { type: "mark", key: "cursed", duration: 4 },
    ]);
    expect(ability("Yorick", "R")).toMatchObject({ cooldown: 100, cost: 100, castTime: 0.5 });
    // Three graves by default: one for every 2nd enemy dying near him at level 20, from a wave of 6.
    expect(kit("Yorick").options).toEqual({ graves: 3 });
  });

  // Walk in and attack, after an opening cast.
  const opening =
    (...casts: string[]): Behavior =>
    (view) => {
      const cast = casts[view.world.tick];
      if (cast) return { kind: "cast", ability: cast };
      if (view.self.action) return undefined;
      return inAttackRange(view.self, view.enemy) ? { kind: "attack" } : { kind: "move", direction: 1 };
    };
  const walkers = (world: World) => world.pets.filter((p) => p.spec.kind === "walker");

  it("Yorick fights: Awakening raises his three graves as Mist Walkers 1 s later; Last Rites' hit leaves a grave", () => {
    const compiled = kit("Yorick");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 0, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3 } });
    const [yorick, target] = world.units;
    expect(String(yorick.memory.graves).split(",").map(Number)).toEqual([yorick.x, yorick.x, yorick.x]);
    let raised = -1;
    while (!world.result) {
      step(world, [opening("Q", "Q2"), () => undefined]);
      if (raised < 0 && world.log.some((e) => e.text === "raises 3 graves")) raised = world.tick - 1;
    }
    const risen = world.log.filter((e) => e.text === "raises a Mist Walker").map((e) => e.tick);
    expect(risen).toEqual([raised + 30, raised + 30, raised + 30]);
    // 331.35 health (no bonus health here), 113.3 a hit halved by 100 armor, 0.956 attacks a second.
    const [first] = walkers(world);
    expect(first?.spec.hp).toBeCloseTo(331.353, 2);
    expect(first?.spec.attack?.interval).toBeCloseTo(1 / 0.956435, 5);
    expect(world.log.find((e) => e.text.startsWith("Mist Walker deals"))?.text).toBe(`Mist Walker deals ${Math.round(113.325 / 2)} physical damage`);
    // Last Rites' hit: 110 (+ 50% AD) more, and a grave where the enemy stands.
    expect(world.log.find((e) => e.text.startsWith("Last Rites deals"))?.text).toBe(`Last Rites deals ${Math.round((110 + 0.5 * 160.325) / 2)} physical damage`);
    expect(String(yorick.memory.graves).split(",").map(Number)).toEqual([target.x]);
  });

  it("Mourning Mist: the Curse raises graves, and the Mist Walkers leap to the enemy, faster", () => {
    const compiled = kit("Yorick");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 600, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 3, reactionTime: 10 } });
    const [yorick, target] = world.units;
    const once: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "E" } : undefined);
    let cursed = -1;
    let leapt = -1;
    while (!world.result) {
      step(world, [once, () => undefined]);
      if (cursed < 0 && yorick.memory.cursedUntil !== undefined) cursed = world.tick - 1;
      if (leapt < 0 && walkers(world).length > 0) leapt = world.tick - 1;
    }
    // 0.25 s to cast, 0.389 s to land; 8% of 20000 halved by 100 magic resistance.
    expect(cursed).toBe(8 + 12);
    expect(world.log.find((e) => e.text.startsWith("Mourning Mist deals"))?.text).toBe("Mourning Mist deals 800 magic damage");
    // The graves rise a second after the Curse, and the Walkers land beside the enemy.
    expect(leapt).toBe(cursed + 1 + 30);
    for (const walker of walkers(world)) expect(walker.x).toBeCloseTo(target.x - (65 + 1), 6);
    expect(walkers(world)[0]?.spec.moveSpeed).toBeCloseTo((325 + 60) * 1.3, 6);
    expect(world.log.find((e) => e.text.startsWith("Mist Walker deals"))?.tick).toBe(leapt);
    expect(yorick.x).toBe(0);
  });

  it("Eulogy of the Isles: the Maiden and four Mist Walkers 1 s after the cast, up to 600 units out; her mark makes his attack deal 3% of maximum health", () => {
    const compiled = kit("Yorick");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 900, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 6 } });
    const yorick = world.units[0];
    while (!world.result) step(world, [opening("R"), () => undefined]);
    const summoned = world.log.find((e) => e.text === "summons the Maiden of the Mist");
    expect(summoned?.tick).toBe(15 + 30);
    const maiden = world.pets.find((p) => p.spec.kind === "maiden");
    expect(maiden).toMatchObject({ x: 600, spec: { hp: 3700, armor: 100, mr: 100, radius: 20, attack: { range: 600, interval: 1 } } });
    expect(walkers(world).filter((p) => p.x === 600 || p.memory.maiden)).toHaveLength(4);
    // 100 magic damage, halved; her mark makes Yorick's attack deal 3% of 20000, halved.
    expect(world.log.find((e) => e.text.startsWith("Maiden of the Mist deals"))?.text).toBe("Maiden of the Mist deals 50 magic damage");
    expect(world.log.find((e) => e.text.startsWith("Touch of the Maiden deals"))?.text).toBe("Touch of the Maiden deals 300 magic damage");
    expect(yorick.alive).toBe(true);
  });

  it("Dark Procession: walls 125 to 325 from its center for 4 s, against the enemy only; within 210 the enemy is pulled inside", () => {
    const compiled = kit("Yorick");
    const enemy = fighter({ id: "enemy", base: { hp: 20000, armor: 100, mr: 100 } });
    const world = createWorld({ fighters: [compiled.spec, enemy], distance: 300, modes: ["fight", "idle"], settings: { log: true, maxSeconds: 2, reactionTime: 10 } });
    const target = world.units[1];
    const center = target.x;
    const once: Behavior = (view) => (view.world.tick === 0 ? { kind: "cast", ability: "W" } : undefined);
    step(world, [once, () => undefined]);
    // On the ring's walls when it rises, 180 from the center: pulled in.
    target.x = center + 180;
    while (world.tick < 30) step(world, [once, () => undefined]);
    expect(world.terrain.map((t) => [t.from, t.to, t.enemyOnly])).toEqual([
      [center - 325, center - 125, true],
      [center + 125, center + 325, true],
    ]);
    expect(world.terrain[0]?.endTick).toBe(23 + 120);
    expect(target.x).toBe(center + 125 - 35);
    expect(target.statuses.find((s) => s.kind === "cc" && s.key === "airborne")).toMatchObject({ startTick: 23, endTick: 23 + 8 });
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
