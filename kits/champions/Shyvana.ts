/**
 * Shyvana (patch 26.20): Dragon Fury pays for Dragon's Descent and Dragon Form; Emberstrike
 * empowers two attacks (three in Dragon Form) that reset her attack timer; Inferno Aegis
 * explodes its own shield; in Dragon Form, Molten Burst pierces, explodes and scorches.
 */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { numbersIn } from "../../engine/kits/context";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, completeCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, directionTo } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, innateStat, ticks } from "./util";

const DRAGON = "shyvana:dragon";
const EPS = 1e-6;

const shyvana: KitModule = {
  champion: "Shyvana",
  options: {
    scalemail: { label: "Scalemail stacks by level 20 (1 per large minion or large monster, 3 per champion or epic monster takedown)", default: 30 },
  },
  build(kit, options) {
    const p = kit.ability("Scalemail");
    const q = kit.ability("Emberstrike");
    const w = kit.ability("Inferno Aegis");
    const e = kit.ability("Molten Burst");
    const r = kit.ability("Dragon's Descent");

    // Scalemail: armor and magic resistance per stack.
    const perStack = p.quoted("For each stack, Shyvana gains 0.3 bonus armor and 0.3 bonus magic resistance", 0);
    const stacks = Math.max(0, Math.round(options.scalemail ?? 0));

    // Dragon Fury: 0.5 every 0.5 s in Human Form, 1.25 per enemy damaged (tripled in Dragon Form), drained 3.3 every 0.5 s in Dragon Form.
    const furyPerTick = r.number("Dragon Fury Generation per 0.5 Seconds");
    const furyEvery = r.quoted("Shyvana generates Dragon Fury every 0.5 seconds while in Human Form", 0);
    const furyPerHit = r.quoted("generate 1.25 Dragon Fury for each enemy damaged", 0);
    const dragonFury = 1 + r.quoted("increased by 200% during Dragon Form", 0) / 100;
    r.quote("up to once per enemy per cast instance");
    const furyNeeded = r.quoted("100 Dragon Fury is required to cast this ability", 0);
    const drain = r.cost();
    const drainEvery = numbersIn(r.textField("costType"))[0] ?? furyEvery;
    r.quote("returning to Human Form once all Dragon Fury has been depleted");
    const bonusHealth = r.number("Bonus Health");
    const bonusRange = r.number("Bonus Range");
    kit.assume("Shyvana starts a fight with full Dragon Fury. Her source-specific ultimate-haste scaling of Fury generation remains unmodeled, including when an equipped item grants ultimate haste. Dragon Form's bonus health raises her current health by the same amount; leaving it keeps her health, capped at the lower maximum. Its size increase is left out: her hitbox doesn't grow.");

    // Emberstrike: two (three) empowered attacks; each later cast opens 1.5 s after the last Emberstrike attack, or at once after a basic attack.
    const recastRule = "After 1.5 seconds of using an Emberstrike attack, or immediately following a basic attack, the ability can be recast within and up to the next 4 seconds each time";
    const lockout = q.quoted(recastRule, 0);
    const recastWindow = q.quoted(recastRule, 1);
    const emberWindow = q.quoted("empowers Shyvana's next basic attack within 6 seconds to have an uncancellable windup", 0);
    q.quote("Emberstrike can be cast twice in Human Form and thrice in Dragon Form");
    const emberRange = q.quoted("Shyvana gains 50 bonus range on all of her basic attacks while Emberstrike is active", 0);
    const emberDamage = q.formula("Area Physical Damage");
    const biteDamage = q.formula("True Damage");
    q.quote("The damage to the primary target is affected by critical strike modifiers.");
    q.quote("This damage cannot critically strike.");
    q.quote("All casts reset Shyvana's basic attack timer.");
    q.quote("Spell shield will not block any damage nor be consumed by the strikes.");
    q.quote("Blind will negate the damage to the primary target");
    q.quote("Only the last cast of Emberstrike puts Shyvana's basic attack on cooldown.");
    q.quote("In Human Form, only Q2 will put it on cooldown; in Dragon Form, only Q3 will.");
    q.textField("cooldownStart");
    const passiveRefund = q.quoted("reduce Emberstrike's current cooldown by 0.5 seconds", 0);
    const passiveWords = "deal bonus magic damage equal to 1% (+ 1.1% per 100 bonus AD) of the target's maximum health";
    const passiveShare = q.quoted(passiveWords, 0) / 100;
    const passivePerAD = q.quoted(passiveWords, 1) / 100 / q.quoted(passiveWords, 2);
    const qCooldown = q.cooldown();
    kit.assume("Emberstrike's cone and tail slam hit only the attack's target in a duel; its 10 bonus damage against monsters and its passive's minimum and cap against non-champions are left out.");

    // Inferno Aegis: a shield (stronger with the enemy within 600) and speed; recast after 1 s, or at once when the shield breaks or runs out.
    const shield = w.formula("Shield Strength");
    const shieldPerChampion = w.formula("Increased shield per champion");
    w.quote("with the shield strength increased by 30% for every nearby enemy champion");
    const shieldSeconds = w.quoted("Shyvana shields herself for 2.5 seconds", 0);
    const shieldReach = w.field("effectRadius", "Enemy champion detection range");
    const speedWords = "she gains 25% bonus movement speed, increased to 43.75% while facing visible enemy champions";
    const speed = w.quoted(speedWords, 0) / 100;
    const facingSpeed = w.quoted(speedWords, 1) / 100;
    const speedReach = w.field("effectRadius", "Enemy detection range for granting the enhanced MS");
    const recastAfter = w.quoted("After 1 second, Inferno Aegis can be recast while the shield holds and does so automatically after it expires or is broken.", 0);
    w.quote("Shyvana consumes the shield to explode");
    const blastRadius = w.field("effectRadius", "Explosion radius");
    const blast = w.formula("Magic Damage");
    const healFlat = w.levelValue("If the explosion hits an enemy champion, Shyvana heals herself", 0);
    const healMissing = w.levelValue("If the explosion hits an enemy champion, Shyvana heals herself", 1) / 100;

    // Molten Burst.
    const burst = e.formula("Magic Damage");
    const slowWords = "slowing them by 30% for 2 seconds";
    const slow: Effect = { type: "cc", cc: "slow", strength: e.quoted(slowWords, 0) / 100, duration: e.quoted(slowWords, 1) };
    e.quote("explodes upon colliding with the first enemy or reaching maximum range");
    const humanRadius = e.field("effectRadius", "in Human Form");
    const dragonRadius = e.field("effectRadius", "Dragon Form");
    const humanWidth = e.field("width", "Fireball width");
    const dragonWidth = humanWidth * 90 / 75;
    e.quote("The fireball is wider, can pass through enemies, and deals 25% increased damage.");
    e.quote("the fireball sets an explosion upon the targets struck and at the location that applies the same effects");
    const dragonBurst = e.formula("Increased/Explosion Magic Damage");
    const laterBurst = e.formula("Subsequent Explosion Damage");
    e.quote("Subsequent explosions against the same target deal 40% damage.");
    const scorchSeconds = e.quoted("Molten Burst will also scorch the ground it touches beneath for 2 seconds", 0);
    const scorchWords = "(+ 1.25% AP) magic damage every 0.25 seconds";
    const scorch = { base: e.levelValue("Enemies within a scorched field are dealt", 0), ratios: { AP: e.quoted(scorchWords, 0) / 100 } };
    const scorchEvery = e.quoted(scorchWords, 1);
    e.quote("Enemies may be damaged by only one scorched field at a time.");
    e.quote("In Dragon Form, both areas of effect will be centered on the first champion struck, not at the location the missile collided with them.");
    e.quote("This ability will cast from wherever the caster is at the end of the cast time.");
    kit.assume(`The Dragon Form fireball's width isn't on the wiki ("wider"): it is taken as ${dragonWidth}, the human ${humanWidth} scaled by the game files' missile widths (90 against 75). The fireball's scorched trail, ${e.field("width", "Scorched ground trail")} wide, is left out (stepping off it sideways is free); the scorched fields around the struck champion and at the end of the fireball's range are kept.`);
    const repeatDelay = 0.25;
    kit.assume(`A human fireball that misses explodes at its maximum range, hitting the enemy only if it stands within the explosion beyond that range. A Dragon Form fireball's contact is its first explosion on the champion (the increased damage); the explosion it sets upon the champion follows ${repeatDelay} s later (the game files' RepeatExplosionDelay) as a subsequent explosion for 40%, as does its explosion at maximum range when that catches the champion again. A fireball that misses still explodes at its maximum range, for full damage.`);

    // Dragon's Descent: a flight of 400 to 1050 that breathes fire on the way and transforms Shyvana.
    const [minFlight = 400, maxFlight = 1050] = r.fieldNumbers("targetRange");
    r.quote("flies with displacement immunity to the target location, breathing fire in a cone along the way");
    const fearWords = "fears them for 0.75 seconds, as well as slows them by 99% for the same duration";
    const fear = r.quoted(fearWords, 0);
    const fearSlow = r.quoted(fearWords, 1) / 100;
    r.quote("Dragon's Descent's displacement immunity begins from the start of the cast time.");
    const flightSpeed = 1100;
    const fireReach = 225 / 2;
    kit.assume(`Dragon's Descent flies at ${flightSpeed} units per second (neither the wiki nor the game files give its speed), and its fire hits the enemy if the flight passes within ${fireReach} units of it (half the game files' 225 width).`);

    const dragon = (unit: Unit) => unit.memory[DRAGON] === true;
    const hasted = (unit: Unit, seconds: number) => cooldownAfterHaste(seconds, abilityHasteFor(unit, { slot: "Q" }));
    const maxFury = (unit: Unit) => derive(unit).maxResource;
    const addFury = (ctx: HookContext, amount: number) => { ctx.self.resource = Math.min(maxFury(ctx.self), ctx.self.resource + amount); };
    /** Dragon Fury for damaging the enemy: basic attacks every time, an ability once per cast. */
    const furyFor = (ctx: HookContext, key?: string) => {
      if (key !== undefined) {
        const cast = String(ctx.memory[`shyvana:cast:${key}`] ?? "");
        if (ctx.memory[`shyvana:fury:${key}`] === cast) return;
        ctx.memory[`shyvana:fury:${key}`] = cast;
      }
      addFury(ctx, furyPerHit * (dragon(ctx.self) ? dragonFury : 1));
    };
    const enterDragon = (ctx: HookContext) => {
      if (dragon(ctx.self)) return;
      ctx.memory[DRAGON] = true;
      ctx.memory["shyvana:drainAt"] = ctx.tick + ticks(drainEvery);
      ctx.buff("shyvana:dragonHealth", "health", bonusHealth, FOREVER);
      ctx.self.hp = Math.min(derive(ctx.self).maxHp, ctx.self.hp + bonusHealth);
      ctx.buff("shyvana:dragonRange", "attackRange", bonusRange, FOREVER);
      ctx.log("becomes a dragon");
    };
    const leaveDragon = (ctx: HookContext) => {
      ctx.memory[DRAGON] = false;
      ctx.buff("shyvana:dragonHealth", "health", 0, 0);
      ctx.buff("shyvana:dragonRange", "attackRange", 0, 0);
      ctx.self.hp = Math.min(ctx.self.hp, derive(ctx.self).maxHp);
      ctx.memory["shyvana:furyAt"] = ctx.tick + ticks(furyEvery);
      ctx.log("returns to Human Form");
    };

    // Emberstrike's stages: a stage is open from its opening tick until its deadline, once the last empowered attack is used.
    const lastStage = (unit: Unit) => (dragon(unit) ? 3 : 2);
    const stageOpen = (unit: Unit, tick: number, stage: number) =>
      stage <= lastStage(unit) && unit.memory["shyvana:qPending"] !== true && Number(unit.memory["shyvana:qStage"] ?? 0) === stage - 1 &&
      tick >= Number(unit.memory["shyvana:qOpen"] ?? Number.POSITIVE_INFINITY) && tick <= Number(unit.memory["shyvana:qUntil"] ?? -1);
    const endEmberstrike = (ctx: HookContext) => {
      delete ctx.self.chains.Q;
      ctx.memory["shyvana:qStage"] = 0;
      ctx.memory["shyvana:qPending"] = false;
      delete ctx.memory["shyvana:qOpen"];
      delete ctx.memory["shyvana:qUntil"];
      ctx.buff("shyvana:emberRange", "attackRange", 0, 0);
    };
    const emberstrike = (key: string, stage: number, name: string): AbilitySpec => ({
      key,
      name,
      slot: "Q",
      cooldown: stage === 1 ? qCooldown : 0,
      castTime: 0,
      ...(stage > 1 ? { chain: { root: "Q", index: stage, window: emberWindow + lockout + recastWindow }, usable: (unit, world) => stageOpen(unit, world.tick, stage) } : {}),
      delivery: { kind: "self" },
      onSelf: [{ type: "empower", attacks: 1, window: emberWindow, uncancellable: true, resetAttack: true, onHit: [] }],
      roles: ["damage"],
      estimate: (self, target) => evaluate(stage === 3 ? biteDamage : emberDamage, self, target) - (stage === 3 ? 0 : derive(self).ad),
    });
    const q1 = emberstrike("Q", 1, q.name);
    const q2 = emberstrike("Q2", 2, `${q.name} (second cast)`);
    const q3 = emberstrike("Q3", 3, `${q.name} (third cast, Dragon Form)`);

    const scorchFields = (ctx: HookContext): Array<{ x: number; until: number }> => JSON.parse(String(ctx.memory["shyvana:scorch"] ?? "[]"));
    const addScorch = (ctx: HookContext, x: number) => {
      const fields = scorchFields(ctx).filter((f) => f.until > ctx.tick);
      fields.push({ x, until: ctx.tick + ticks(scorchSeconds) });
      ctx.memory["shyvana:scorch"] = JSON.stringify(fields);
      if (ctx.memory["shyvana:scorchAt"] === undefined || Number(ctx.memory["shyvana:scorchAt"]) < ctx.tick) ctx.memory["shyvana:scorchAt"] = ctx.tick + ticks(scorchEvery);
    };
    const inBlast = (ctx: HookContext, x: number, radius: number) => Math.abs(ctx.enemy.x - x) <= radius + ctx.enemy.spec.base.radius + EPS;

    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: 0, delivery: { kind: "self" }, roles: ["defense"],
      onSelf: [],
    };
    const w2Spec: AbilitySpec = {
      key: "W2", name: `${w.name} (explosion)`, slot: "W", cooldown: 0, castTime: 0,
      chain: { root: "W", index: 2, window: shieldSeconds, delay: recastAfter, auto: true },
      delivery: { kind: "aura", radius: blastRadius },
      onHit: [{ type: "damage", damageType: "magic", amount: blast }],
      flags: { spellShield: true },
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime("Human Form"),
      delivery: { kind: "line", range: e.field("range", "Human Form"), width: humanWidth, speed: e.field("speed", "Human Form") },
      onHit: [{ type: "damage", damageType: "magic", amount: burst }, slow],
      flags: { projectile: true, spellShield: true },
      usable: (unit) => !dragon(unit),
    };
    const dragonE: AbilitySpec = {
      key: "ED", name: `${e.name} (Dragon Form)`, slot: "E", cooldown: e.cooldown(), cooldownKey: "E", cost: e.cost(), castTime: e.castTime("Dragon Form"),
      delivery: { kind: "line", range: e.field("range", "Dragon Form"), width: dragonWidth, speed: e.field("speed", "Dragon Form"), piercing: true },
      onHit: [{ type: "damage", damageType: "magic", amount: dragonBurst }, slow],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      estimate: (self, target) => evaluate(dragonBurst, self, target),
      usable: (unit) => dragon(unit),
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: 0, cost: 0, castTime: r.castTime(),
      requires: { minResource: furyNeeded },
      usable: (unit) => !dragon(unit),
      delivery: { kind: "dash", direction: "toward", distance: maxFlight, minDistance: minFlight, speed: flightSpeed, through: true, hitRadius: fireReach },
      onHit: [{ type: "damage", damageType: "magic", amount: r.formula("Magic Damage") }, { type: "cc", cc: "fear", duration: fear }, { type: "cc", cc: "slow", strength: fearSlow, duration: fear }],
      flags: { spellShield: true, knockdown: false, grounded: true },
      roles: ["engage", "damage", "cc"],
      decisive: true,
    };
    const abilities = [q1, q2, q3, wSpec, w2Spec, eSpec, dragonE, rSpec];

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      const center = Math.abs(view.enemy.x - self.x);
      const inBlastRange = center <= blastRadius + view.enemy.spec.base.radius;
      // The explosion: before the enemy walks out of it, or before the shield runs out.
      if (canCast(world, self, w2Spec) && inBlastRange) {
        const left = Number(self.memory["shyvana:wUntil"] ?? 0) - world.tick;
        if (left <= ticks(0.4) || center >= blastRadius * 0.8 || view.mode === "flee" || view.mode === "kite") return { kind: "cast", ability: "W2" };
      }
      // Inferno Aegis is also her damage: shield up once the enemy is within the explosion.
      if ((view.mode === "fight" || view.mode === "trade") && inBlastRange && canCast(world, self, wSpec)) return { kind: "cast", ability: "W" };
      const decided = defaultBehavior(view);
      // Dragon's Descent lands on the enemy to fight, or as far away as it goes to escape.
      if (decided?.kind === "cast" && decided.ability === "R" && !decided.aim) {
        const away = view.mode === "flee" || view.mode === "kite" || decided.dodge !== undefined;
        return { ...decided, aim: away ? { direction: -1, distance: maxFlight } : { direction: 1, distance: Math.min(maxFlight, Math.max(minFlight, center)) } };
      }
      return decided;
    };

    return {
      abilities,
      behavior,
      ...(stacks > 0 ? { start: [innateStat("armor", stacks * perStack), innateStat("MR", stacks * perStack)] } : {}),
      attack: {
        onHit: [
          { type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: passiveShare }, products: [{ ratio: passivePerAD, stats: ["bonusAD", "targetMaxHP"] }] }, label: "Emberstrike (passive)" },
          { type: "refund", ability: "Q", seconds: passiveRefund },
        ],
      },
      hooks: {
        onStart(ctx) {
          ctx.memory[DRAGON] = false;
          ctx.memory["shyvana:furyAt"] = ctx.tick + ticks(furyEvery);
        },
        onCastStart(ctx) {
          ctx.memory[`shyvana:cast:${ctx.ability.key}`] = `${ctx.tick}`;
          if (ctx.ability.key === "R") ctx.apply({ type: "state", state: "displacementImmune", duration: FOREVER }, true);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "Q2" || key === "Q3") {
            const stage = key === "Q" ? 1 : key === "Q2" ? 2 : 3;
            ctx.memory["shyvana:qStage"] = stage;
            ctx.memory["shyvana:qPending"] = true;
            delete ctx.memory["shyvana:qOpen"];
            ctx.buff("shyvana:emberRange", "attackRange", emberRange, emberWindow);
          }
          if (key === "W") {
            const near = Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= shieldReach + EPS && ctx.enemy.alive;
            const amount = evaluate(shield, ctx.self) + (near ? evaluate(shieldPerChampion, ctx.self) : 0);
            ctx.apply({ type: "shield", amount: { base: amount }, duration: shieldSeconds }, true);
            const made = ctx.self.statuses.filter((s) => s.kind === "shield" && s.startTick === ctx.tick).at(-1);
            if (made) made.memoKey = "shyvana:aegis";
            ctx.memory["shyvana:wUntil"] = ctx.tick + ticks(shieldSeconds);
          }
          if (key === "W2") {
            // The explosion consumes what is left of the shield.
            ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "shyvana:aegis");
            delete ctx.memory["shyvana:wUntil"];
          }
          if (key === "R") enterDragon(ctx);
        },
        onAttack(ctx) {
          const keys = ctx.action.empowered ?? [];
          const stage = keys.includes("Q3") ? 3 : keys.includes("Q2") ? 2 : keys.includes("Q") ? 1 : 0;
          if (stage === 0) return;
          ctx.memory["shyvana:qPending"] = false;
          // The cooldown restarts with each Emberstrike attack.
          ctx.self.cooldownReady.Q = ctx.tick + ticks(hasted(ctx.self, qCooldown));
          ctx.action.baseDamage = stage === 3
            ? { damageType: "true", amount: biteDamage, label: `${q.name} (bite)` }
            : { damageType: "physical", amount: emberDamage, canCrit: true, label: q.name };
          if (stage < lastStage(ctx.self)) {
            // Only the last cast puts the basic attack on cooldown; the next cast opens 1.5 s later, or after a basic attack.
            ctx.self.attackReadyTick = ctx.action.launchTick;
            ctx.memory["shyvana:qOpen"] = ctx.tick + ticks(lockout);
            ctx.memory["shyvana:qUntil"] = ctx.tick + ticks(lockout + recastWindow);
            ctx.buff("shyvana:emberRange", "attackRange", emberRange, lockout + recastWindow);
          } else endEmberstrike(ctx);
        },
        onAttackHit(ctx) {
          if (!ctx.blocked) furyFor(ctx);
          // A basic attack opens the next Emberstrike at once.
          const open = Number(ctx.memory["shyvana:qOpen"] ?? Number.NEGATIVE_INFINITY);
          if (ctx.memory["shyvana:qPending"] !== true && open > ctx.tick && ctx.attack.baseDamage === undefined) {
            ctx.memory["shyvana:qOpen"] = ctx.tick;
            ctx.memory["shyvana:qUntil"] = ctx.tick + ticks(recastWindow);
            ctx.buff("shyvana:emberRange", "attackRange", emberRange, recastWindow);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "W2" || key === "E" || key === "ED" || key === "R") furyFor(ctx, key);
          if (key === "W2" && dragon(ctx.self) && ctx.enemy.petId === undefined) {
            ctx.apply({ type: "heal", amount: { base: healFlat, ratios: { missingHP: healMissing } } }, true);
          }
          if (key === "ED" && ctx.memory["shyvana:exploding"] !== true) {
            // The contact is the champion's first explosion; the one set upon it follows, and the scorched field is centered on it.
            ctx.memory["shyvana:exploded"] = String(ctx.memory["shyvana:cast:ED"]);
            ctx.memory["shyvana:repeatAt"] = ctx.tick + ticks(repeatDelay);
            ctx.memory["shyvana:repeatScale"] = ctx.scale;
            addScorch(ctx, ctx.enemy.x);
          }
        },
        onMissileEnd(ctx) {
          if (ctx.reason !== "range" || (ctx.missile.source !== "E" && ctx.missile.source !== "ED")) return;
          const x = ctx.missile.x;
          if (ctx.missile.source === "E") {
            if (!ctx.missile.connects && inBlast(ctx, x, humanRadius)) abilityHit(ctx.world, ctx.self, ctx.enemy, eSpec, eSpec.onHit ?? []);
            return;
          }
          const exploded = ctx.memory["shyvana:exploded"] === String(ctx.memory["shyvana:cast:ED"]);
          addScorch(ctx, x);
          if (!inBlast(ctx, x, dragonRadius)) return;
          ctx.memory["shyvana:exploding"] = true;
          abilityHit(ctx.world, ctx.self, ctx.enemy, dragonE, [{ type: "damage", damageType: "magic", amount: exploded ? laterBurst : dragonBurst, label: "Molten Burst (explosion)" }, slow]);
          ctx.memory["shyvana:exploding"] = false;
          if (!exploded) ctx.memory["shyvana:exploded"] = String(ctx.memory["shyvana:cast:ED"]);
        },
        onDashEnd(ctx) {
          if (ctx.ability.key === "R") ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "displacementImmune" && s.source === ctx.self.side && s.endTick === Number.POSITIVE_INFINITY));
        },
        onTick(ctx) {
          const self = ctx.self;
          // Displacement immunity lasts from the cast through the flight.
          const flying = (self.action?.kind === "cast" || self.action?.kind === "dash") && self.action.ability === "R";
          if (!flying && self.statuses.some((s) => s.kind === "state" && s.key === "displacementImmune" && s.endTick === Number.POSITIVE_INFINITY && s.source === self.side)) {
            self.statuses = self.statuses.filter((s) => !(s.kind === "state" && s.key === "displacementImmune" && s.endTick === Number.POSITIVE_INFINITY && s.source === self.side));
          }
          // Dragon Fury: generated in Human Form, drained in Dragon Form.
          if (dragon(self)) {
            if (ctx.tick >= Number(ctx.memory["shyvana:drainAt"] ?? 0)) {
              ctx.memory["shyvana:drainAt"] = ctx.tick + ticks(drainEvery);
              self.resource = Math.max(0, self.resource - drain);
              if (self.resource <= EPS) leaveDragon(ctx);
            }
          } else if (ctx.tick >= Number(ctx.memory["shyvana:furyAt"] ?? 0)) {
            ctx.memory["shyvana:furyAt"] = ctx.tick + ticks(furyEvery);
            addFury(ctx, furyPerTick);
          }
          // Emberstrike: an unused empowerment or an unused recast ends the chain.
          const stage = Number(ctx.memory["shyvana:qStage"] ?? 0);
          if (stage > 0) {
            const pending = ctx.memory["shyvana:qPending"] === true;
            const expired = pending ? !self.statuses.some((s) => s.kind === "empower" && ["Q", "Q2", "Q3"].includes(s.key)) && !(self.action?.kind === "windup" && self.action.empowered?.some((k) => k.startsWith("Q")))
              : ctx.tick > Number(ctx.memory["shyvana:qUntil"] ?? Number.POSITIVE_INFINITY);
            if (expired || stage >= lastStage(self) && !pending) endEmberstrike(ctx);
          }
          // Inferno Aegis: facing the enemy speeds it up; a broken shield explodes at once.
          const until = Number(ctx.memory["shyvana:wUntil"] ?? -1);
          if (ctx.tick < until) {
            const facing = self.facing === directionTo(self, ctx.enemy) && Math.abs(ctx.enemy.x - self.x) <= speedReach && !hasState(ctx.enemy, "invisible");
            ctx.buff("shyvana:aegisSpeed", "moveSpeedPercent", facing ? facingSpeed : speed, (until - ctx.tick) / 30);
            const held = self.statuses.some((s) => s.memoKey === "shyvana:aegis" && s.value > EPS && s.endTick > ctx.tick);
            if (!held && self.chains.W) completeCast(ctx.world, self, w2Spec, ctx.tick);
          } else ctx.buff("shyvana:aegisSpeed", "moveSpeedPercent", 0, 0);
          // The explosion set upon the struck champion.
          if (ctx.memory["shyvana:repeatAt"] !== undefined && ctx.tick >= Number(ctx.memory["shyvana:repeatAt"])) {
            const scale = Number(ctx.memory["shyvana:repeatScale"] ?? 1);
            delete ctx.memory["shyvana:repeatAt"];
            delete ctx.memory["shyvana:repeatScale"];
            ctx.memory["shyvana:exploding"] = true;
            abilityHit(ctx.world, self, ctx.enemy, dragonE, [{ type: "damage", damageType: "magic", amount: laterBurst, label: "Molten Burst (explosion)" }, slow], scale);
            ctx.memory["shyvana:exploding"] = false;
          }
          // Scorched fields: one at a time deals damage to the enemy standing in it.
          const fields = scorchFields(ctx).filter((f) => f.until > ctx.tick);
          if (fields.length === 0) { delete ctx.memory["shyvana:scorch"]; delete ctx.memory["shyvana:scorchAt"]; return; }
          if (ctx.tick < Number(ctx.memory["shyvana:scorchAt"] ?? 0)) return;
          ctx.memory["shyvana:scorchAt"] = ctx.tick + ticks(scorchEvery);
          if (fields.some((f) => inBlast(ctx, f.x, dragonRadius))) ctx.apply({ type: "damage", damageType: "magic", amount: scorch, persistent: true, label: "Molten Burst (scorched field)" });
        },
      },
      budget: {
        damage(self, target) {
          const haste = derive(self).abilityHaste;
          const cycle = cooldownAfterHaste(qCooldown, haste) + 2 * lockout;
          const extra = 2 * Math.max(0, evaluate(emberDamage, self, target) - derive(self).ad);
          return { physical: extra / cycle, magic: (scorchSeconds / scorchEvery) * evaluate(scorch, self, target) / cooldownAfterHaste(eSpec.cooldown, haste) / 2 };
        },
      },
    };
  },
};

export default shyvana;
