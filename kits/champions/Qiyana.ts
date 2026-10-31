/**
 * Qiyana (patch 26.20): holding an Element gives her attack speed, range and magic damage on
 * hit; Elemental Wrath spends it (River roots, Terrain hits harder below half health), and
 * Terrashape gathers another and resets her blade. Royal Privilege adds damage once per 25 s,
 * Audacity dashes in, and Supreme Display of Talent knocks back into a stunning shockwave.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { applyEffect } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

type Element = "terrain" | "river" | "";

const qiyana: KitModule = {
  champion: "Qiyana",
  build(kit) {
    const p = kit.ability("Royal Privilege");
    const edge = kit.ability("Edge of Ixtal");
    const wrath = kit.ability("Elemental Wrath");
    const w = kit.ability("Terrashape");
    const e = kit.ability("Audacity");
    const r = kit.ability("Supreme Display of Talent");

    // Royal Privilege: 83 (+ 25% bonus AD) (+ 30% AP) physical, once per target every 25 s; gathering a different Element resets it.
    const privilegeWords = "Qiyana's basic attacks on-hit and basic abilities deal 15 – 83 (based on level) (+ 25% bonus AD) (+ 30% AP) additional physical damage.";
    const privilege: Formula = { base: p.levelValue(privilegeWords, 0), ratios: { bonusAD: p.quoted(privilegeWords, 2) / 100, AP: p.quoted(privilegeWords, 3) / 100 } };
    const privilegeCooldown = p.field("targetCooldown");
    p.quote("Gathering an Element with Terrashape resets Royal Privilege's per-target cooldown for enemies affected by Royal Privilege using a different Element (or no Element).");
    p.quote("Royal Privilege's trigger from a basic attack can be blocked (additional damage is negated and the on-target cooldown does not apply).");

    // Terrashape: an Element gives 35% attack speed, 25 range and 40 (+ 20% bonus AD) (+ 45% AP) magic damage on hit; a dash of up to 300 gathers one and resets Edge of Ixtal.
    const elementSpeed = w.fraction("Bonus Attack Speed");
    const elementRange = w.quoted("While holding an Element, Qiyana gains bonus attack speed, 25 bonus attack range", 0);
    const elementDamage = w.formula("Bonus Magic Damage");
    const gatherDash = w.quoted("Qiyana dashes up to 300 units towards the target location to gather the Element of the nearest Brush, River or Terrain she targeted.", 0);
    const gatherSpeed = w.field("speed");
    w.quote("Once Terrashape has been learned, Qiyana is automatically given the Terrain element upon respawning.");
    edge.quote("Gathering an Element with Terrashape resets Edge of Ixtal's cooldown and upgrades it into Elemental Wrath.");
    kit.assume("There is always River and Terrain near enough for Terrashape. Qiyana starts holding Terrain, and gathers River for its root while the enemy is above half health, Terrain for its bonus damage below; Brush's invisibility is left out.");

    // Edge of Ixtal: a 525 slash for 200 (+ 90% bonus AD); Elemental Wrath hurls it 865, spending the Element.
    const blade = edge.formula("Physical Damage");
    const riverWords = "The blast roots enemies hit for 0.5 seconds, then slows them by 20% for 1 second.";
    const riverRoot = wrath.quoted(riverWords, 0);
    const riverSlow = wrath.quoted(riverWords, 1) / 100;
    const riverSlowSeconds = wrath.quoted(riverWords, 2);
    const terrainBlade = wrath.formula("Increased Damage");
    const terrainBelow = wrath.quoted("The blast deals 60% increased damage against enemies below 50% of their maximum health.", 1) / 100;
    wrath.quote("consuming the current Element to empower the blade with an additional effect");

    // Audacity: a dash at the enemy, 210 (+ 50% bonus AD) if it is within 250 on arrival; she can cast during it.
    const audacitySpeed = e.field("speed");
    const audacityCap = Number(/\d+/.exec(e.fieldLabel("speed", "Capped at"))?.[0] ?? 1200);
    const audacityReach = e.quoted("Audacity only damages targets if within 250 range upon completion of the dash.", 0);
    e.quote("Qiyana can cast any of her abilities during the dash.");

    // Supreme Display of Talent: a windblast knocking back 375 into a shockwave of 300 (+ 125% bonus AD) (+ 10% of maximum health) that stuns.
    const knock = r.quoted("Qiyana sweeps a windblast in the target direction that knocks back enemies hit by 375 units", 0);
    const shock = r.formula("Physical Damage");
    const shockStun = r.quoted("stunning them for 0.5 / 1 (based on proximity) seconds", 0);
    kit.assume(`Supreme Display of Talent's shockwave always finds River, Brush or Terrain to run along (top lane is walled), and stuns for its shorter ${shockStun} s.`);

    const element = (unit: Unit): Element => (unit.memory["qiyana:element"] ?? "terrain") as Element;
    const holding = (unit: Unit) => element(unit) !== "";

    const qSpec: AbilitySpec = {
      key: "Q", name: edge.name, slot: "Q", cooldown: edge.cooldown(), cost: edge.cost(), castTime: edge.castTime(),
      usable: (unit) => !holding(unit),
      delivery: { kind: "line", range: edge.field("range", "Rectangle forward range"), width: edge.field("width") },
      onHit: [{ type: "damage", damageType: "physical", amount: blade }],
      flags: { spellShield: true },
    };
    const qeSpec: AbilitySpec = {
      key: "QE", name: wrath.name, slot: "Q", cooldown: edge.cooldown(), cooldownKey: "Q", cost: edge.cost(), castTime: edge.castTime(),
      usable: (unit) => holding(unit),
      delivery: { kind: "line", range: wrath.field("range", "Maximum total range"), width: wrath.field("width", "Hurl missile and explosion missile width"), speed: wrath.field("speed", "Hurl missile speed") },
      onHit: [{ type: "damage", damageType: "physical", amount: blade }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: 0, overlay: true,
      usable: (unit) => !holding(unit),
      delivery: { kind: "dash", direction: "toward", distance: gatherDash, minDistance: 0, speed: gatherSpeed, speedFor: (unit) => gatherSpeed + derive(unit).moveSpeed },
      roles: ["buff"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: 0,
      delivery: { kind: "dash", direction: "target", distance: e.field("targetRange"), speed: audacitySpeed, speedFor: (unit) => Math.min(audacityCap, audacitySpeed + derive(unit).moveSpeed), hitRadius: audacityReach },
      onHit: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["engage", "damage"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      delivery: { kind: "line", range: r.field("targetRange"), width: r.field("width", "Windblast missile width"), speed: r.field("speed", "Windblast missile speed") },
      onHit: [{ type: "displace", direction: "away", distance: knock, duration: knock / r.field("speed", "Windblast missile speed") }, { type: "delayed", delay: knock / r.field("speed", "Windblast missile speed"), effects: [{ type: "damage", damageType: "physical", amount: shock, label: `${r.name} (shockwave)` }, { type: "cc", cc: "stun", duration: shockStun }] }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
    };
    const abilities = [qSpec, qeSpec, wSpec, eSpec, rSpec];

    // The Element's magic damage and Royal Privilege on a connected hit.
    const extras = (ctx: HookContext) => {
      if (ctx.enemy.petId !== undefined || !ctx.enemy.alive) return;
      if (holding(ctx.self)) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "magic", amount: elementDamage, label: w.name }, { scale: 1 });
      if (ctx.tick >= Number(ctx.memory["qiyana:privilegeReady"] ?? 0)) {
        ctx.memory["qiyana:privilegeReady"] = ctx.tick + ticks(privilegeCooldown);
        ctx.memory["qiyana:privilegeElement"] = element(ctx.self);
        applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "damage", damageType: "physical", amount: privilege, label: p.name }, { scale: 1 });
      }
    };
    const hold = (ctx: HookContext, next: Element) => {
      ctx.memory["qiyana:element"] = next;
      const on = next !== "";
      ctx.buff("qiyana:elementSpeed", "attackSpeed", on ? elementSpeed : 0, FOREVER);
      ctx.buff("qiyana:elementRange", "attackRange", on ? elementRange : 0, FOREVER);
    };

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      const decided = defaultBehavior(view);
      // Terrashape is how Qiyana gets her blade back: right after Elemental Wrath, when the enemy is near.
      if (!holding(self) && canCast(world, self, wSpec) && view.mode !== "idle" && Math.abs(view.enemy.x - self.x) <= 900) return { kind: "cast", ability: "W", aim: { direction: view.mode === "flee" || view.mode === "kite" ? -1 : 1, distance: gatherDash } };
      return decided;
    };

    return {
      abilities,
      behavior,
      hooks: {
        onStart(ctx) { hold(ctx, "terrain"); },
        onCastStart(ctx) {
          if (ctx.ability.key === "QE") ctx.memory["qiyana:wrathElement"] = element(ctx.self);
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            // The Element she gathers: River's root while the enemy is healthy, Terrain's damage once it is below half.
            const next: Element = ctx.enemy.hp < terrainBelow * derive(ctx.enemy).maxHp ? "terrain" : "river";
            if (ctx.memory["qiyana:privilegeElement"] !== next) ctx.memory["qiyana:privilegeReady"] = ctx.tick;
            hold(ctx, next);
            ctx.self.cooldownReady.Q = ctx.tick;
          }
        },
        onMissileCreated(ctx) {
          // Elemental Wrath spends the Element as she throws it.
          if (ctx.ability.key === "QE") hold(ctx, "");
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "QE") return undefined;
          const spent = ctx.memory["qiyana:wrathElement"] as Element;
          if (spent === "river") return [...ctx.effects, { type: "cc", cc: "root", duration: riverRoot }, { type: "delayed", delay: riverRoot, effects: [{ type: "cc", cc: "slow", strength: riverSlow, duration: riverSlowSeconds }] }] as Effect[];
          if (spent === "terrain" && ctx.enemy.hp < terrainBelow * derive(ctx.enemy).maxHp) return [{ type: "damage", damageType: "physical", amount: terrainBlade }];
          return undefined;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "QE" || ctx.ability.key === "E") extras(ctx);
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) extras(ctx);
        },
      },
      budget: {
        damage(self, target) {
          return { magic: (evaluate(elementDamage, self, target) * derive(self).attackSpeed) / 2, physical: evaluate(privilege, self, target) / privilegeCooldown };
        },
      },
    };
  },
};

export default qiyana;
