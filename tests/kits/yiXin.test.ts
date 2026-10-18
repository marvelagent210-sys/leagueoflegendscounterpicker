import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { canCast, startAttack, startCast } from "../../engine/sim/actions";
import { abilityHit, applyCC, applyEffect, attackHit, canTarget, dealDamage, hookContext } from "../../engine/sim/combat";
import { derive, hasState } from "../../engine/sim/derived";
import { createWorld, step } from "../../engine/sim/simulate";
import type { AbilitySpec, BonusStats, FighterSpec } from "../../engine/sim/spec";
import type { World } from "../../engine/sim/state";
import yi from "../../kits/champions/MasterYi";
import xin from "../../kits/champions/XinZhao";
import amumu from "../../kits/champions/Amumu";
import rammus from "../../kits/champions/Rammus";
import { fighter } from "../sim/kits";
import { championData, pets, records, runes } from "./helpers";

const compile = (id: "MasterYi" | "XinZhao") => compileKit(championData(id), records(id), id === "MasterYi" ? yi : xin, {}, pets(id), runes());
const worldFor = (id: "MasterYi" | "XinZhao", bonus: BonusStats = {}, distance = 100): World => {
  const spec: FighterSpec = { ...compile(id).spec, bonus };
  return createWorld({ fighters: [spec, fighter({ id: "target", base: { hp: 20000, armor: 0, mr: 0 } })], distance, modes: ["idle", "idle"], settings: { maxSeconds: 20, log: true } });
};
const ability = (world: World, key: string): AbilitySpec => world.units[0].spec.abilities.find((a) => a.key === key)!;
const cast = (world: World, key: string) => startCast(world, world.units[0], ability(world, key));
const through = (world: World, tick: number) => { while (world.tick <= tick && !world.result) step(world, [() => undefined, () => undefined]); };
const noRegen = (world: World) => { for (const u of world.units) u.spec = { ...u.spec, base: { ...u.spec.base, hpRegen: 0, resourceRegen: 0 } }; };
const hit = (world: World, blocked = false) => {
  const [self, target] = world.units;
  if (blocked) applyEffect(world, target, target, { type: "state", state: "blockAttacks", duration: 10 }, { scale: 1 });
  self.spec.hooks?.onAttack?.(hookContext(world, self));
  attackHit(world, self, target, false, []);
};

describe("Yi and Xin stat-budget visibility", () => {
  it.each(["MasterYi", "XinZhao"] as const)("%s hook damage/healing stays evaluable after source reads are sealed", (id) => {
    const w = worldFor(id, { ad: 100, ap: 100, critChance: .5, abilityHaste: 50 });
    const [self, target] = w.units;
    const damage = self.spec.budget?.damage?.(self, target);
    expect(Number.isFinite(damage?.physical)).toBe(true);
    expect(damage!.physical).toBeGreaterThan(0);
    expect(self.spec.budget?.healing?.(self, target)).toBeGreaterThan(0);
  });
});

describe("Master Yi source-backed kit", () => {
  it("compiles all abilities, source revisions, costs and explicit 1D choices", () => {
    const k = compile("MasterYi");
    expect(k.spec.abilities.filter((a) => a.key.length === 1).map((a) => a.key)).toEqual(["Q", "W", "E", "R"]);
    expect(k.spec.abilities[0]).toMatchObject({ cooldown: 18, cost: 70, delivery: { kind: "target", range: 600 }, channel: { manualStart: true, interruptible: false } });
    expect(k.evidence.map((e) => e.revid)).toEqual(expect.arrayContaining([4057839, 4064856, 4039653, 3959670, 4060364]));
    expect(k.assumptions.some((s) => s.includes("four times"))).toBe(true);
  });

  it("Double Strike hits on attack four, grants a stack on the second hit, and refunds Q twice", () => {
    const w = worldFor("MasterYi");
    const [self, target] = w.units;
    self.cooldownReady.Q = 600;
    for (let i = 0; i < 3; i++) hit(w);
    expect(self.memory.doubleStacks).toBe(3);
    expect(target.totals.damageTaken).toBeCloseTo(3 * derive(self).ad);
    hit(w);
    expect(target.totals.damageTaken).toBeCloseTo(4.5 * derive(self).ad);
    expect(self.memory.doubleStacks).toBe(1);
    expect(self.cooldownReady.Q).toBe(450);
    for (let i = 0; i < 3; i++) hit(w);
    expect(target.totals.damageTaken).toBeCloseTo(8 * derive(self).ad);
    expect(self.memory.doubleStacks).toBe(1);
  });

  it("Double Strike's second attack applies full Wuju damage without critical scaling", () => {
    const w = worldFor("MasterYi", { ad: 100, critChance: 1 });
    const [self, target] = w.units;
    cast(w, "E");
    for (let i = 0; i < 4; i++) hit(w);
    expect(target.totals.damageTaken).toBeCloseTo(4.5 * derive(self).ad * derive(self).critDamage + 5 * 75);
    expect(w.log.filter((e) => e.text.startsWith("Wuju Style deals"))).toHaveLength(5);
  });

  it("Double Strike's second attack grants life steal, while Wuju's separate true damage does not", () => {
    const w = worldFor("MasterYi"); noRegen(w);
    const [self, target] = w.units; self.hp *= .25;
    applyEffect(w, self, self, { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 });
    cast(w, "E");
    for (let i = 0; i < 4; i++) hit(w);
    expect(self.totals.healing).toBeCloseTo(4.5 * derive(self).ad * .2);
    expect(target.totals.damageTaken).toBeCloseTo(4.5 * derive(self).ad + 5 * 40);
  });

  it("blocked attacks do not create stacks/refunds, but Wuju cannot be blocked", () => {
    const w = worldFor("MasterYi");
    const [self, target] = w.units;
    self.cooldownReady.Q = 600;
    cast(w, "E");
    hit(w, true);
    expect(self.memory.doubleStacks ?? 0).toBe(0);
    expect(self.cooldownReady.Q).toBe(600);
    expect(target.totals.damageTaken).toBe(40);
    self.memory.doubleStacks = 3; self.memory.doubleUntil = 120;
    hit(w);
    expect(self.memory.doubleStacks).toBe(3);
    expect(target.totals.damageTaken).toBe(120);
  });

  it("dodge retains three stacks; blind consumes them and prevents the second strike", () => {
    const dodge = worldFor("MasterYi");
    const [self, target] = dodge.units;
    self.memory.doubleStacks = 3; self.memory.doubleUntil = 120;
    self.spec.hooks?.onAttack?.(hookContext(dodge, self));
    applyEffect(dodge, target, target, { type: "state", state: "dodgeAttacks", duration: 10 }, { scale: 1 });
    attackHit(dodge, self, target, false, []);
    expect(self.memory.doubleStacks).toBe(3);
    target.statuses = [];
    self.spec.hooks?.onAttack?.(hookContext(dodge, self));
    attackHit(dodge, self, target, true, []);
    expect(self.memory.doubleStacks).toBe(0);
    expect(target.totals.damageTaken).toBe(0);
  });

  it("a declared blind consumes Double Strike even when the target also has dodge active", () => {
    const w = worldFor("MasterYi");
    const [self, target] = w.units;
    self.memory.doubleStacks = 3; self.memory.doubleUntil = 120;
    applyCC(w, target, self, "blind", 3);
    applyEffect(w, target, target, { type: "state", state: "dodgeAttacks", duration: 3 }, { scale: 1 });
    startAttack(w, self);
    through(w, 10);
    expect(self.memory.doubleStacks).toBe(0);
    expect(target.totals.damageTaken).toBe(0);
  });

  it("Alpha marks at .231 intervals, snapshots the first hit and reappears before its .165 lockout ends", () => {
    const w = worldFor("MasterYi", { critChance: 1 });
    noRegen(w);
    const [self, target] = w.units;
    const firstAd = derive(self).ad;
    cast(w, "Q");
    expect(self.resource).toBeCloseTo(derive(self).maxResource - 70);
    expect(hasState(self, "untargetable")).toBe(true);
    expect(canTarget(self, target)).toBe(false);
    through(w, 7);
    expect(target.totals.damageTaken).toBe(0);
    applyEffect(w, self, self, { type: "stat", stat: "AD", amount: { base: 100 }, duration: 10 }, { scale: 1 });
    through(w, 28);
    expect(target.totals.damageTaken).toBeCloseTo(2 * (100 + .7 * firstAd + 3 * (25 + .175 * (firstAd + 100))));
    expect(w.log.filter((e) => e.text.startsWith("Alpha Strike deals")).map((e) => e.tick)).toEqual([14, 21, 28, 28]);
    expect(Math.abs(self.x - target.x)).toBe(75);
    expect(hasState(self, "untargetable")).toBe(false);
    expect(self.action?.kind).toBe("channel");
    through(w, 33);
    expect(self.action).toBeUndefined();
    expect(self.memory.doubleStacks ?? 0).toBe(0);
    expect(self.cooldownReady.Q).toBe(540);
  });

  it("E and R overlay Alpha, refresh their complete buffs, and Q applies 131.25% Wuju on-hit", () => {
    const w = worldFor("MasterYi", { ad: 100 });
    cast(w, "Q");
    expect(canCast(w, w.units[0], ability(w, "E"))).toBe(true);
    cast(w, "E"); cast(w, "R");
    expect(w.units[0].action?.kind).toBe("channel");
    through(w, 28);
    expect(w.log.filter((e) => e.text.startsWith("Wuju Style deals"))).toHaveLength(4);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(175 + 1.225 * derive(w.units[0]).ad + 1.3125 * 75);
    expect(w.units[0].memory.wujuUntil).toBe(178);
    expect(w.units[0].memory.highlanderUntil).toBe(238);
    expect(w.units[0].statuses.filter((s) => s.memoKey?.startsWith("R:") || s.ability === "R").every((s) => s.endTick === 238)).toBe(true);
  });

  it.each(["dodgeAttacks", "blockAttacks"] as const)("Alpha's own damage survives %s but its on-hit damage does not", (state) => {
    const w = worldFor("MasterYi");
    applyEffect(w, w.units[1], w.units[1], { type: "state", state, duration: 10 }, { scale: 1 });
    cast(w, "E"); cast(w, "Q");
    through(w, 28);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(175 + 1.225 * derive(w.units[0]).ad);
    expect(w.log.some((e) => e.text.startsWith("Wuju Style deals"))).toBe(false);
  });

  it("a spell shield blocks one Alpha strike; untargetability cancels the main reappearance hit", () => {
    const shield = worldFor("MasterYi");
    applyEffect(shield, shield.units[1], shield.units[1], { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    cast(shield, "Q"); through(shield, 28);
    expect(shield.units[1].totals.damageTaken).toBeCloseTo(150 + 1.05 * derive(shield.units[0]).ad);
    const vanished = worldFor("MasterYi");
    cast(vanished, "Q"); through(vanished, 14);
    applyEffect(vanished, vanished.units[1], vanished.units[1], { type: "state", state: "untargetable", duration: 1 }, { scale: 1 });
    through(vanished, 28);
    expect(vanished.units[1].totals.damageTaken).toBeCloseTo(25 + .175 * derive(vanished.units[0]).ad);
    expect(vanished.units[0].memory.alphaActive).toBe(false);
  });

  it("Meditate heals dynamically every .5s, drains mana, pauses E/R and transitions 70% to 55%", () => {
    const w = worldFor("MasterYi", { ap: 100 });
    noRegen(w);
    const [self, enemy] = w.units;
    self.hp = .5 * derive(self).maxHp;
    cast(w, "E"); cast(w, "R"); cast(w, "W");
    const hp = self.hp, mana = self.resource;
    expect(dealDamage(w, enemy, self, 100, "physical")).toBeCloseTo(30 * 100 / (100 + self.spec.base.armor));
    const hurt = self.hp;
    through(w, 15);
    expect(self.hp).toBeCloseTo(hurt + 67.5 * (2 - hurt / derive(self).maxHp));
    expect(self.statuses.find((s) => s.memoKey === "yi:meditateReduction")?.value).toBe(.55);
    expect(self.resource).toBeCloseTo(mana - derive(self).maxResource * .06 * .5);
    expect(self.memory.wujuUntil).toBe(165);
    expect(self.memory.highlanderUntil).toBe(225);
    through(w, 30);
    expect(self.memory.doubleStacks).toBe(1);
    expect(self.hp).toBeGreaterThan(hp);
    expect(self.totals.healing).toBeGreaterThan(0);
  });

  it("cancelled Meditate gives no guaranteed initial heal and retains its current reduction for .5s", () => {
    const w = worldFor("MasterYi"); noRegen(w);
    const self = w.units[0]; self.hp *= .5;
    cast(w, "W"); const hp = self.hp;
    expect(canCast(w, self, ability(w, "W2"))).toBe(true);
    cast(w, "W2");
    expect(self.hp).toBe(hp);
    expect(self.action).toBeUndefined();
    expect(self.statuses.find((s) => s.memoKey === "yi:meditateReduction")).toMatchObject({ value: .7, endTick: 15 });
    through(w, 15);
    expect(hasState(self, "damageReduction")).toBe(false);
  });

  it("Highlander cleanses slow/cripple and prevents both without preventing a stun", () => {
    const w = worldFor("MasterYi"); const [self, enemy] = w.units;
    applyCC(w, enemy, self, "slow", 3, .8, true); applyCC(w, enemy, self, "cripple", 3, .8);
    cast(w, "R");
    expect(self.statuses.some((s) => s.kind === "cc")).toBe(false);
    expect(applyCC(w, enemy, self, "slow", 3, .8)).toBe(false);
    expect(applyCC(w, enemy, self, "cripple", 3, .8)).toBe(false);
    expect(applyCC(w, enemy, self, "stun", 1)).toBe(true);
    expect(derive(self).bonusAttackSpeed).toBeCloseTo(self.spec.base.attackSpeed.bonus + .65);
  });

  it("a Double Strike expiring during windup restarts an ordinary windup", () => {
    const w = worldFor("MasterYi");
    const self = w.units[0];
    self.memory.doubleStacks = 3; self.memory.doubleUntil = 4;
    startAttack(w, self);
    expect(self.memory.doubleArmed).toBe(true);
    through(w, 4);
    expect(self.action).toMatchObject({ kind: "windup", startTick: 4 });
    expect(self.memory.doubleArmed).toBe(false);
    through(w, 12);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(derive(self).ad);
    expect(self.memory.doubleStacks).toBe(1);
  });

  it("Meditate is interrupted by stun and ends when its ongoing mana is exhausted", () => {
    const w = worldFor("MasterYi"); noRegen(w);
    cast(w, "W"); through(w, 20);
    applyCC(w, w.units[1], w.units[0], "stun", 1);
    through(w, 21);
    expect(w.units[0].action).toBeUndefined();
    expect(w.units[0].memory.meditating).toBe(false);
    expect(w.units[0].statuses.find((s) => s.memoKey === "yi:meditateReduction")?.value).toBe(.55);
    const exhausted = worldFor("MasterYi"); noRegen(exhausted);
    exhausted.units[0].resource = 40;
    cast(exhausted, "W"); through(exhausted, 1);
    expect(exhausted.units[0].resource).toBe(0);
    expect(exhausted.units[0].action).toBeUndefined();
    expect(exhausted.units[0].totals.healing).toBe(0);
  });

  it("Highlander's takedown refunds apply at lethal damage and extend every active R buff", () => {
    const w = worldFor("MasterYi");
    cast(w, "R");
    w.units[0].cooldownReady.Q = 600;
    w.units[0].cooldownReady.W = 300;
    w.units[0].cooldownReady.E = 450;
    dealDamage(w, w.units[0], w.units[1], 30000, "true");
    expect([w.units[0].cooldownReady.Q, w.units[0].cooldownReady.W, w.units[0].cooldownReady.E]).toEqual([180, 90, 135]);
    expect(w.units[0].memory.highlanderUntil).toBe(420);
    expect(w.units[0].statuses.filter((s) => s.memoKey?.startsWith("R:") || s.ability === "R").every((s) => s.endTick === 420)).toBe(true);
  });

  it("Double Strike and Alpha notify connected incoming on-hits separately for retaliation/refund kits", () => {
    const w = worldFor("MasterYi");
    w.units[1].spec = { ...w.units[1].spec, hooks: { onIncomingOnHit(ctx) { ctx.memory.incoming = Number(ctx.memory.incoming ?? 0) + 1; } } };
    for (let i = 0; i < 4; i++) hit(w);
    expect(w.units[1].memory.incoming).toBe(5);
    cast(w, "Q"); through(w, 28);
    expect(w.units[1].memory.incoming).toBe(9);
    const blocked = worldFor("MasterYi");
    blocked.units[1].spec = { ...blocked.units[1].spec, hooks: { onIncomingOnHit(ctx) { ctx.memory.incoming = Number(ctx.memory.incoming ?? 0) + 1; } } };
    applyEffect(blocked, blocked.units[1], blocked.units[1], { type: "state", state: "blockAttacks", duration: 10 }, { scale: 1 });
    blocked.units[0].memory.doubleStacks = 3; blocked.units[0].memory.doubleUntil = 120;
    hit(blocked);
    expect(blocked.units[1].memory.incoming).toBe(2);
    cast(blocked, "Q"); through(blocked, 28);
    expect(blocked.units[1].memory.incoming).toBe(6);
  });

  it("Amumu refunds Tantrum for Double Strike's second hit and all four Alpha on-hit applications", () => {
    const amumuSpec = compileKit(championData("Amumu"), records("Amumu"), amumu, {}, pets("Amumu"), runes()).spec;
    const w = createWorld({ fighters: [compile("MasterYi").spec, amumuSpec], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    noRegen(w);
    w.units[1].cooldownReady.E = 600;
    for (let i = 0; i < 4; i++) hit(w);
    expect(w.units[1].cooldownReady.E).toBe(600 - 5 * 23);
    cast(w, "Q"); through(w, 28);
    expect(w.units[1].cooldownReady.E).toBe(600 - 9 * 23);
  });

  it("Rammus returns Curl damage from both Double Strike hits and every Alpha on-hit application", () => {
    const rammusSpec = compileKit(championData("Rammus"), records("Rammus"), rammus, {}, pets("Rammus"), runes()).spec;
    const w = createWorld({ fighters: [compile("MasterYi").spec, rammusSpec], distance: 0, modes: ["idle", "idle"], settings: { log: true } });
    noRegen(w);
    startCast(w, w.units[1], rammusSpec.abilities.find((a) => a.key === "W")!);
    const d = derive(w.units[1]);
    const returned = (15 + .1 * (d.armor.base + d.armor.bonus + d.mr.base + d.mr.bonus)) * 100 / (100 + derive(w.units[0]).mr.base);
    for (let i = 0; i < 4; i++) hit(w);
    expect(w.units[0].totals.damageTaken).toBeCloseTo(5 * returned);
    cast(w, "Q"); through(w, 28);
    expect(w.units[0].totals.damageTaken).toBeCloseTo(9 * returned);
  });
});

describe("Xin Zhao source-backed kit", () => {
  it("reads level-20 passive breakpoints and records the source/game-file mana conflict", () => {
    const k = compile("XinZhao");
    expect(k.evidence.map((e) => e.revid)).toEqual(expect.arrayContaining([4051470, 3986754, 4026481, 4026484, 4008632]));
    expect(k.assumptions.some((s) => s.includes("game files disagree"))).toBe(true);
    expect(k.spec.abilities.map((a) => a.cost)).toEqual([30, 60, 60, 100]);
  });

  it("every third attack separately deals 60% AD + 20% AP and heals 5% maxHP + 70% AP", () => {
    const w = worldFor("XinZhao", { ap: 100 }); noRegen(w);
    const [self, enemy] = w.units; self.hp *= .5;
    const hp = self.hp;
    for (let i = 0; i < 3; i++) {
      self.attackReadyTick = w.tick; startAttack(w, self);
      const action = self.action;
      if (action?.kind !== "windup") throw new Error("No windup");
      self.action = undefined;
      attackHit(w, self, enemy, action.blinded, action.onHit);
    }
    expect(enemy.totals.damageTaken).toBeCloseTo(3.6 * derive(self).ad + 20);
    expect(self.hp - hp).toBeCloseTo(.05 * derive(self).maxHp + 70);
    expect(self.memory.determinationDamage).toBe(0);
    expect(self.memory.determinationHeal).toBe(0);
    expect(enemy.statuses.find((s) => s.key === "xin:challenge")?.endTick).toBe(90);
  });

  it("blocked attacks still stack and heal; blindness can desynchronize damage and healing counters", () => {
    const w = worldFor("XinZhao"); noRegen(w);
    const [self, enemy] = w.units; self.hp *= .5;
    applyEffect(w, enemy, enemy, { type: "state", state: "blockAttacks", duration: 10 }, { scale: 1 });
    for (let i = 0; i < 2; i++) hit(w);
    expect(self.memory.determinationDamage).toBe(2);
    expect(self.memory.determinationHeal).toBe(2);
    self.attackReadyTick = 0; startAttack(w, self);
    const action = self.action;
    if (action?.kind !== "windup") throw new Error("No windup");
    self.action = undefined;
    attackHit(w, self, enemy, true, action.onHit);
    expect(self.memory.determinationDamage).toBe(0);
    expect(self.memory.determinationHeal).toBe(2);
    hit(w);
    expect(self.memory.determinationHeal).toBe(0);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(self.totals.healing).toBeCloseTo(.05 * derive(self).maxHp);
  });

  it("Q adds critical bonus damage, refunds other spells on declaration and shields only the third knockup", () => {
    const w = worldFor("XinZhao", { ad: 100, critChance: 1 });
    const [self, enemy] = w.units;
    self.cooldownReady.W = 600; self.cooldownReady.E = 600; self.cooldownReady.R = 600;
    cast(w, "Q");
    for (let i = 0; i < 3; i++) {
      self.attackReadyTick = 0; startAttack(w, self);
      expect(canCast(w, self, ability(w, "W"))).toBe(false);
      const action = self.action;
      if (action?.kind !== "windup") throw new Error("No windup");
      expect(action.uncancellable).toBe(true);
      self.action = undefined;
      if (i === 2) applyEffect(w, enemy, enemy, { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
      attackHit(w, self, enemy, false, action.onHit, undefined, false, { critChance: action.critChance });
    }
    const ad = derive(self).ad;
    expect(enemy.totals.damageTaken).toBeCloseTo(3 * (ad + 115) * derive(self).critDamage + .6 * ad);
    expect([self.cooldownReady.W, self.cooldownReady.E, self.cooldownReady.R]).toEqual([510, 510, 510]);
    expect(enemy.statuses.some((s) => s.key === "airborne")).toBe(false);
    expect(hasState(enemy, "spellShield")).toBe(false);
  });

  it("W has four separate slashes, a critical-scaled thrust, AP slow duration, and only two passive stack gains", () => {
    const w = worldFor("XinZhao", { ap: 100, critChance: 1 }); noRegen(w);
    cast(w, "W"); through(w, 25);
    const ad = derive(w.units[0]).ad;
    expect(w.log.filter((e) => e.text.startsWith("Wind Becomes Lightning (slash")).map((e) => e.tick)).toEqual([0, 2, 3, 5]);
    expect(w.log.filter((e) => e.text.startsWith("Wind Becomes Lightning (thrust)")).length).toBe(1);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(70 + .3 * ad + (190 + .9 * ad + 65) * 1.333);
    expect(w.units[0].memory.determinationDamage).toBe(2);
    expect(w.units[0].memory.determinationHeal).toBe(2);
    expect(w.units[1].statuses.find((s) => s.key === "slow")?.value).toBe(.5);
    const slowed = w.units[1].statuses.find((s) => s.key === "slow")!;
    expect(slowed.endTick - slowed.startTick).toBe(60);
  });

  it("a first-slash spell shield blocks all W damage and challenge, while a third passive heal still occurs", () => {
    const w = worldFor("XinZhao"); noRegen(w);
    const [self, enemy] = w.units; self.hp *= .5;
    self.memory.determinationDamage = 2; self.memory.determinationHeal = 2;
    applyEffect(w, enemy, enemy, { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    cast(w, "W"); through(w, 25);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(enemy.statuses.some((s) => s.key === "xin:challenge")).toBe(false);
    expect(self.totals.healing).toBeCloseTo(.05 * derive(self).maxHp);
  });

  it("W life-steal conversion excludes passive damage and applies the documented double healing amplification", () => {
    const w = worldFor("XinZhao"); noRegen(w);
    const self = w.units[0]; self.hp *= .25;
    applyEffect(w, self, self, { type: "stat", stat: "lifeSteal", amount: { base: .2 }, duration: 10 }, { scale: 1 });
    applyEffect(w, self, self, { type: "stat", stat: "healingIncrease", amount: { base: .25 }, duration: 10 }, { scale: 1 });
    self.memory.determinationDamage = 2;
    cast(w, "W"); through(w, 25);
    const ad = derive(self).ad;
    const ownW = 260 + 1.2 * ad;
    expect(self.totals.healing).toBeCloseTo(ownW * .2 * .333 * 1.25 * 1.25);
    expect(w.units[1].totals.damageTaken).toBeCloseTo(ownW + .6 * ad);
  });

  it("E reaches 650 normally and 1100 when challenged, and spell shielding its damage still grants challenge/speed", () => {
    const w = worldFor("XinZhao", { ap: 100, attackSpeed: .5 }, 800);
    const [self, enemy] = w.units;
    expect(canCast(w, self, ability(w, "E"))).toBe(false);
    applyEffect(w, self, enemy, { type: "mark", key: "xin:challenge", duration: 3 }, { scale: 1 });
    expect(canCast(w, self, ability(w, "E"))).toBe(true);
    applyEffect(w, enemy, enemy, { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    cast(w, "E");
    expect(canCast(w, self, ability(w, "Q"))).toBe(true);
    through(w, 20);
    expect(enemy.totals.damageTaken).toBe(0);
    const buff = self.statuses.find((s) => s.memoKey === "buff:xin:charge")!;
    expect(buff.value).toBeCloseTo(.7 + .1 + .2 * (self.spec.base.attackSpeed.bonus + .5));
    expect(buff.endTick - buff.startTick).toBe(150);
    expect(enemy.statuses.find((s) => s.key === "xin:challenge")?.endTick).toBeGreaterThan(90);
  });

  it("Crescent Guard uses impact current health and knocks back only an unchallenged target", () => {
    const w = worldFor("XinZhao", { ad: 100, ap: 100 });
    const [self, enemy] = w.units;
    abilityHit(w, self, enemy, ability(w, "R"), ability(w, "R").onHit!);
    expect(enemy.totals.damageTaken).toBeCloseTo(275 + 100 + 110 + .15 * 20000);
    expect(enemy.forced).toMatchObject({ endTick: 23, perTick: 700 / 23 });
    expect(enemy.statuses.some((s) => s.key === "stun")).toBe(true);
    const marked = worldFor("XinZhao");
    applyEffect(marked, marked.units[0], marked.units[1], { type: "mark", key: "xin:challenge", duration: 3 }, { scale: 1 });
    abilityHit(marked, marked.units[0], marked.units[1], ability(marked, "R"), ability(marked, "R").onHit!);
    expect(marked.units[1].forced).toBeUndefined();
    expect(marked.units[1].statuses.some((s) => s.kind === "cc")).toBe(false);
  });

  it("R displacement immunity also prevents the stun; its 450 protection follows Xin and permits targeting/CC", () => {
    const w = worldFor("XinZhao"); noRegen(w);
    const [self, enemy] = w.units;
    applyEffect(w, enemy, enemy, { type: "state", state: "displacementImmune", duration: 10 }, { scale: 1 });
    cast(w, "R"); through(w, 11);
    expect(enemy.statuses.some((s) => s.key === "stun")).toBe(false);
    expect(enemy.forced).toBeUndefined();
    enemy.x = self.x + 451;
    const hp = self.hp;
    expect(canTarget(self, enemy)).toBe(true);
    expect(dealDamage(w, enemy, self, 100, "true", { persistent: true })).toBe(0);
    expect(applyCC(w, enemy, self, "stun", 1)).toBe(true);
    self.x += 1;
    expect(dealDamage(w, enemy, self, 100, "true")).toBe(100);
    expect(self.hp).toBe(hp - 100);
  });

  it("W pauses Q empowerment and E attack speed for the complete cast duration", () => {
    const w = worldFor("XinZhao");
    const [self, enemy] = w.units;
    cast(w, "Q");
    abilityHit(w, self, enemy, ability(w, "E"), ability(w, "E").onHit!);
    const qBuff = self.statuses.find((s) => s.kind === "empower" && s.key === "Q")!;
    const eBuff = self.statuses.find((s) => s.memoKey === "buff:xin:charge")!;
    const until = [qBuff.endTick, eBuff.endTick];
    cast(w, "W");
    expect([qBuff.endTick, eBuff.endTick]).toEqual(until.map((t) => t + 15));
  });

  it("W preserves its declared facing when the target crosses behind, instead of re-aiming its thrust", () => {
    const w = worldFor("XinZhao", {}, 500); noRegen(w);
    cast(w, "W"); through(w, 5);
    const [self, enemy] = w.units;
    enemy.x = self.x - 300;
    through(w, 25);
    expect(enemy.totals.damageTaken).toBe(0);
    expect(enemy.statuses.some((s) => s.key === "xin:challenge")).toBe(false);
    expect(self.memory["castDirection:W"]).toBe(1);
  });

  it("W's extra thrust radius reaches a nearby target behind Xin once", () => {
    const w = worldFor("XinZhao", {}, 500); noRegen(w);
    cast(w, "W"); through(w, 5);
    const [self, enemy] = w.units;
    enemy.x = self.x - 100;
    through(w, 25);
    expect(enemy.totals.damageTaken).toBeCloseTo(190 + .9 * derive(self).ad);
    expect(w.log.filter((e) => e.text.startsWith("Wind Becomes Lightning (thrust nearby)")).map((e) => e.tick)).toEqual([15]);
    expect(self.memory.determinationDamage).toBe(1);
    expect(self.memory.determinationHeal).toBe(1);
  });

  it("the close thrust check does not deal twice or consume a later shield with its duplicate missile", () => {
    const w = worldFor("XinZhao", {}, 0); noRegen(w);
    cast(w, "W"); through(w, 15);
    const damage = w.units[1].totals.damageTaken;
    applyEffect(w, w.units[1], w.units[1], { type: "state", state: "spellShield", duration: 10 }, { scale: 1 });
    through(w, 20);
    expect(w.units[1].totals.damageTaken).toBe(damage);
    expect(hasState(w.units[1], "spellShield")).toBe(true);
    expect(w.units[0].memory.determinationDamage).toBe(2);
  });
});
