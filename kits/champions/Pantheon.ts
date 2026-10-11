/** Pantheon: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import { toTicks } from "../../engine/rules/time";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, innateStat, maxHp } from "./util";

/** Mortal Will stacks in kit memory. */
const STACKS = "mortalWill";

const pantheon: KitModule = {
  champion: "Pantheon",
  build(kit) {
    const innate = kit.ability("Mortal Will");
    const q = kit.ability("Comet Spear");
    const w = kit.ability("Shield Vault");
    const e = kit.ability("Aegis Assault");
    const r = kit.ability("Grand Starfall");

    // Mortal Will: a stack per basic attack on-hit and per ability cast; at 5, the next basic ability is empowered.
    const maxStacks = innate.quoted("stacking up to 5 times", 0);
    innate.quote("Pantheon gains maximum stacks of Mortal Will upon starting the game");
    kit.assume("Pantheon starts every fight with full Mortal Will stacks, as after a recall.");
    kit.assume("An ability cast that consumes Mortal Will doesn't also give the next stack.");

    // Comet Spear: a quick release thrusts (refunding most of the cooldown); holding it hurls the spear.
    const thrust = q.formula("Thrust Physical Damage");
    const thrustLow = q.formula("Increased Thrust Damage");
    const hurl = q.formula("Hurl Physical Damage");
    const hurlLow = q.formula("Increased Hurl Damage");
    const lowShare = q.quoted("increased against enemies below 20% of their maximum health", 0) / 100;
    const refund = q.quoted("refunding 60% of Comet Spear's cooldown", 0) / 100;
    const holdAtLeast = q.quoted("Releasing the ability within 0.35 seconds causes Pantheon to instead thrust", 0);
    const release = q.castTime("Release");
    const empoweredSpear: Formula = { base: q.levelValue("Mortal Will: Comet Spear deals 20 – 240 (based on level)"), ratios: { bonusAD: q.quoted("(+ 115% bonus AD) bonus physical damage", 0) / 100 } };
    // "-40 - 560": the thrust's rectangle, from 40 units behind Pantheon to 560 ahead.
    const [thrustNear = -40, thrustFar = 560] = q.fieldNumbers("range");
    kit.assume(`Comet Spear's hurl is held for the shortest time (${holdAtLeast} s) before release.`);

    // Shield Vault: a leap that stuns; empowered, the next basic attack strikes three times.
    const vaultShare = w.baseOf("Physical Damage") / 100;
    const vaultPerAp = w.quoted("(+ 1.5% per 100 AP)", 0) / 100 / 100;
    const vaultPerHealth = w.quoted("(+ 0.4% per 100 Pantheon's bonus health)", 0) / 100 / 100;
    const vaultDamage: Formula = { base: 0, ratios: { targetMaxHP: vaultShare }, products: [{ ratio: vaultPerAp, stats: ["AP", "targetMaxHP"] }, { ratio: vaultPerHealth, stats: ["bonusHP", "targetMaxHP"] }] };
    const vaultStun = w.quoted("stuns them for 1 second", 0);
    const strikeShare = w.levelValue("Mortal Will: Pantheon empowers his next basic attack within 4 seconds", 0) / 100;
    const strikes = w.quoted("strike the target 3 times", 0);
    const strikesWindup = w.quoted("to have a 0.375-second cast time", 0);
    const strikesWindow = w.quoted("Pantheon empowers his next basic attack within 4 seconds", 0);
    kit.assume("Shield Vault's leap is quick (2,000 units a second); the wiki gives no speed.");

    // Aegis Assault: a 1.5-second channel that blocks damage from the front and strikes, then a slam.
    const braceSeconds = e.quoted("channels for 1.5 seconds", 0);
    const strikeEvery = e.quoted("every 0.125 seconds", 0);
    const strikesTotal = e.quoted("up to 100% AD total physical damage", 0) / 100;
    const pulses = Math.floor(toTicks(braceSeconds) / toTicks(strikeEvery));
    const slamCast = e.castTime("Recast");
    const coneRadius = e.field("effectRadius");
    const bracedArmor: Formula = { base: e.levelValue("Mortal Will: After recasting, Pantheon gains 5 – 30 (based on level)"), ratios: { bonusHP: e.quoted("(+ 2.5% bonus health) bonus armor and bonus magic resistance", 0) / 100 } };
    const bracedFor = e.quoted("bonus armor and bonus magic resistance for 4 seconds", 0);
    const bracedSpeed = e.quoted("as well as 60% bonus movement speed for 1.5 seconds", 0) / 100;
    const bracedSpeedFor = e.quoted("as well as 60% bonus movement speed for 1.5 seconds", 1);
    kit.assume(`Aegis Assault's ${pulses} strikes (one every ${toTicks(strikeEvery)} ticks) share its 100% AD total; the slam follows the full channel.`);
    kit.assume("Aegis Assault's invulnerability covers every hit: in one dimension the enemy stays in front of Pantheon.");

    // Grand Starfall: armor penetration, and a long-range leap Pantheon uses to get away.
    const armorPen = r.number("Armor Penetration") / 100;
    const firstChannel = r.quoted("Pantheon channels for 2 seconds before leaping into the sky", 0);
    const secondChannel = r.quoted("He continues channeling for 2.25 seconds", 0);
    const leap = r.field("targetRange", "Blink range");
    kit.assume("Grand Starfall is used only to get away: after its interruptible 2-second channel Pantheon vanishes and lands far away.");

    const qCooldown = q.cooldown();
    const wCooldown = w.cooldown();
    const stacks = (unit: Unit) => Number(unit.memory[STACKS] ?? 0);
    const empowered = (unit: Unit) => stacks(unit) >= maxStacks;
    const addStack = (ctx: HookContext, n = 1) => {
      ctx.memory[STACKS] = Math.min(maxStacks, stacks(ctx.self) + n);
    };
    const low = (target: Unit) => target.hp < lowShare * maxHp(target);
    const spear = (caster: Unit, target: Unit, ranged: boolean) => {
      const base = evaluate(low(target) ? (ranged ? hurlLow : thrustLow) : ranged ? hurl : thrust, caster, target);
      return base + (caster.memory.spearEmpowered ? evaluate(empoweredSpear, caster, target) : 0);
    };

    const behavior: Behavior = (view) => {
      // Getting away: Grand Starfall when fleeing.
      const starfall = view.self.spec.abilities.find((a) => a.key === "R");
      if (view.mode === "flee" && starfall && canCast(view.world, view.self, starfall)) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    const vaultStrikes: Effect = {
      type: "empower",
      attacks: 1,
      window: strikesWindow,
      windup: strikesWindup,
      resetAttack: true,
      // Three strikes of the attack's own damage, each able to crit: the attack's damage times three shares.
      split: { physical: strikes * strikeShare, magic: 0 },
      onHit: [],
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: qCooldown,
        cost: q.cost(),
        castTime: release,
        delivery: { kind: "area", near: thrustNear, far: thrustFar, delay: 0, anchor: "caster" },
        onHit: [{ type: "mark", key: "spear", duration: 0.1 }],
        onSelf: [{ type: "refund", ability: "Q", fraction: refund }],
        estimate: (caster, target) => spear(caster, target, false),
        roles: ["damage"],
      },
      {
        key: "Q2",
        name: `${q.name} (hurled)`,
        slot: "Q",
        cooldownKey: "Q",
        cooldown: qCooldown,
        cost: q.cost(),
        castTime: holdAtLeast + release,
        delivery: { kind: "line", range: q.field("range", "Spear missile range"), width: q.field("width", "Spear missile width"), speed: q.field("speed") },
        onHit: [{ type: "mark", key: "spear", duration: 0.1 }],
        flags: { projectile: true },
        estimate: (caster, target) => spear(caster, target, true),
        roles: ["damage"],
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: wCooldown,
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "dash", direction: "target", distance: w.field("targetRange"), speed: 2000, hitRadius: 0 },
        onHit: [
          { type: "damage", damageType: "physical", amount: vaultDamage },
          { type: "cc", cc: "stun", duration: vaultStun },
        ],
        flags: { spellShield: w.flag("spellShield") ?? true, parry: w.flag("parry") ?? false, knockdown: w.flag("knockdown") ?? true },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: 0,
        cooldownAfter: "channel",
        delivery: { kind: "self" },
        onCastStart: [{ type: "state", state: "invulnerable", duration: braceSeconds + slamCast }],
        channel: {
          duration: braceSeconds,
          interruptible: false,
          interval: strikeEvery,
          range: coneRadius,
          onTick: [{ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: strikesTotal / pulses } } }],
          onComplete: [{ type: "damage", damageType: "physical", amount: e.formula("Physical Damage") }],
        },
        flags: { spellShield: false },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        delivery: { kind: "self" },
        channel: {
          duration: firstChannel,
          interruptible: true,
          onCompleteSelf: [
            { type: "state", state: "untargetable", duration: secondChannel },
            { type: "state", state: "ccImmune", duration: secondChannel },
            { type: "delayed", delay: secondChannel, effects: [{ type: "reposition", direction: "away", distance: leap }] },
          ],
        },
        roles: ["escape"],
      },
    ];

    return {
      start: [innateStat("armorPen", armorPen)],
      behavior,
      abilities,
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          // A thrust every 40% of Comet Spear's cooldown, and the empowered strikes on Shield Vault's.
          const thrustEvery = cooldownAfterHaste(qCooldown, d.abilityHaste) * (1 - refund) + release;
          const vaultEvery = cooldownAfterHaste(wCooldown, d.abilityHaste);
          return { physical: evaluate(thrust, self, target) / thrustEvery + (strikes * strikeShare - 1) * d.ad / vaultEvery };
        },
      },
      hooks: {
        onStart(ctx) {
          ctx.memory[STACKS] = maxStacks;
        },
        onAttackHit(ctx) {
          addStack(ctx);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "R") return;
          if (!empowered(ctx.self)) {
            ctx.memory.spearEmpowered = false;
            addStack(ctx);
            return;
          }
          ctx.memory[STACKS] = 0;
          ctx.memory.spearEmpowered = key === "Q" || key === "Q2";
          if (key === "W") {
            ctx.apply(vaultStrikes, true);
            // The three strikes each give a stack, even when they miss.
            addStack(ctx, strikes - 1);
          }
          if (key === "E") {
            const braced: Effect[] = [
              { type: "stat", stat: "armor", amount: bracedArmor, duration: bracedFor },
              { type: "stat", stat: "MR", amount: bracedArmor, duration: bracedFor },
              { type: "stat", stat: "moveSpeedPercent", amount: flat(bracedSpeed), duration: bracedSpeedFor },
            ];
            ctx.apply({ type: "delayed", delay: braceSeconds + slamCast, effects: braced }, true);
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "Q" && ctx.ability.key !== "Q2") return;
          ctx.apply({ type: "damage", damageType: "physical", amount: flat(spear(ctx.self, ctx.enemy, ctx.ability.key === "Q2") * ctx.scale), label: ctx.ability.name });
        },
      },
    };
  },
};

export default pantheon;
