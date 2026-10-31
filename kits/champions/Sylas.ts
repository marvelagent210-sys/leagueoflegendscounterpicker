/**
 * Sylas (patch 26.20): every ability charges his next attacks with Petricite Burst; Chain Lash
 * slows and explodes where its chains cross; Kingslayer dashes in and heals more the lower he
 * is; Abscond and Abduct dash and chain him back onto the enemy; Hijack steals the enemy's
 * ultimate for him to cast once.
 */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, resolveSkillshot } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { directionTo } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { scaled, seriesAt, ticks } from "./util";

const STOLEN = "RH";

/** A formula's attack damage ratios as ability power: 0.6% AP per 1% total AD and 0.4% per 1% bonus AD (Hijack). */
export function hijackedFormula(formula: Formula, perAD: number, perBonusAD: number): Formula {
  const ratios = { ...formula.ratios };
  const ad = ratios.AD ?? 0;
  const bonus = ratios.bonusAD ?? 0;
  delete ratios.AD;
  delete ratios.bonusAD;
  if (ad || bonus) ratios.AP = (ratios.AP ?? 0) + perAD * ad + perBonusAD * bonus;
  const products = formula.products?.map((p) => {
    const index = p.stats.findIndex((s) => s === "AD" || s === "bonusAD");
    if (index < 0) return p;
    const per = p.stats[index] === "AD" ? perAD : perBonusAD;
    return { ratio: p.ratio * per, stats: p.stats.map((s, i) => (i === index ? "AP" : s)) };
  });
  return { base: formula.base, ...(Object.keys(ratios).length ? { ratios } : {}), ...(products ? { products } : {}) };
}

const isFormula = (value: unknown): value is Formula =>
  typeof value === "object" && value !== null && !Array.isArray(value) && typeof (value as Formula).base === "number" &&
  Object.keys(value).every((key) => key === "base" || key === "ratios" || key === "products");

/** A deep copy of plain data with every formula mapped; functions are kept as they are. */
function mapFormulas<T>(value: T, map: (formula: Formula) => Formula): T {
  if (Array.isArray(value)) return value.map((item) => mapFormulas(item, map)) as T;
  if (typeof value !== "object" || value === null) return value;
  if (isFormula(value)) return map(value) as T;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapFormulas(item, map)])) as T;
}

/** Whether any formula in it scales with ability power. */
function scalesWithAP(value: unknown): boolean {
  if (Array.isArray(value)) return value.some(scalesWithAP);
  if (typeof value !== "object" || value === null) return false;
  if (isFormula(value)) return (value.ratios?.AP ?? 0) !== 0 || (value.products ?? []).some((p) => p.stats.includes("AP"));
  return Object.values(value).some(scalesWithAP);
}

const sylas: KitModule = {
  champion: "Sylas",
  build(kit) {
    const p = kit.ability("Petricite Burst");
    const q = kit.ability("Chain Lash");
    const w = kit.ability("Kingslayer");
    const e = kit.ability("Abscond");
    const e2 = kit.ability("Abduct");
    const r = kit.ability("Hijack");

    // Petricite Burst: each ability cast gives an Unshackled stack (4 s, up to 3); the next attack gains 125% attack speed, an uncancellable windup, and strikes for 130% AD (+ 30% AP) magic damage, critically for 175%.
    const stackWords = "Whenever Sylas casts an ability, he generates a stack of Unshackled for 4 seconds, refreshing on subsequent casts and stacking up to 3 times.";
    const stackSeconds = p.quoted(stackWords, 0);
    const maxStacks = p.quoted(stackWords, 1);
    const burstWords = "Sylas next basic attack gains 125% bonus attack speed and is empowered to have an uncancellable windup and consume a stack to whirl his chains around him, dealing 130% AD (+ 30% AP) magic damage to the primary target";
    const burstSpeed = p.quoted(burstWords, 0) / 100;
    const burst: Formula = { base: 0, ratios: { AD: p.quoted(burstWords, 1) / 100, AP: p.quoted(burstWords, 2) / 100 } };
    const burstCrit = p.quoted("Petricite Burst can critically strike for 175% damage only against the primary target.", 0) / 100;
    p.quote("Unshackled stacks are granted at the end of the abilities' cast time.");
    kit.assume("Petricite Burst's empowered attack deals its 130% AD (+ 30% AP) magic damage in place of the attack's own; its whirl around Sylas has no one else to hit in a duel.");

    // Chain Lash: chains to a point within 775 for 120 (+ 40% AP) and a 35% slow for 1.5 s; 0.6 s later their crossing explodes within 180 for 280 (+ 80% AP).
    const lashWords = "Sylas lashes out two chains that converge to the target location and extend beyond it up to a maximum range, dealing magic damage to enemies hit and slowing them for 1.5 seconds.";
    const lashSlowSeconds = q.quoted(lashWords, 0);
    const lashDelay = q.quoted("After a 0.6-second delay, the chains' intersection explodes to deal magic damage to enemies within, reduced to 40% against minions.", 0);
    const lashBlast = q.formula("Magic Damage", 1);
    const lashRadius = q.field("effectRadius", "Detonation radius against champions and minions");
    const lashRange = q.field("targetRange", "Maximum convergence range");
    kit.assume(`Chain Lash's chains strike along the duel's line like a ${2 * lashRadius}-wide rectangle, and their crossing is placed on the enemy.`);

    // Kingslayer: a dash to an enemy within 400 for 215 (+ 60% AP); it heals 100 (+ 30% AP) (+ 5% bonus health), up to double at 60% missing health.
    const kingslayerHeal: Formula = w.formula("Minimum Heal");
    const kingslayerGrowth = w.seriesIn("If this damages a champion, Sylas is also healed, increased by");
    w.quote("The damage will be dealt if the dash completed uninterrupted, and regardless of how far the target's location is at the end of the dash.");
    const kingslayerSpeed = e.field("speed");
    kit.assume(`Kingslayer's dash moves at Abscond's ${kingslayerSpeed} (the wiki gives it no speed).`);

    // Abscond: a 400 dash; for 3.5 s, after 0.2 s, Abduct: chains (790) for 280 (+ 80% AP) and a 0.5 s stun, then Sylas dashes to the enemy and knocks it up for 0.5 s.
    const abductWords = "Within 3.5 seconds, he can cast Abduct after a 0.2-second delay from casting Abscond.";
    const abductWindow = e.quoted(abductWords, 0);
    const abductDelay = e.quoted(abductWords, 1);
    const abductStunWords = "Sylas whips out his chains in the target direction that deal magic damage to the first enemy hit and reveal and stun them for 0.5 seconds. Upon hitting the target, Sylas dashes to their location and knocks them up for 0.5 seconds upon arrival.";
    const abductStun = e2.quoted(abductStunWords, 0);
    const abductLift = e2.quoted(abductStunWords, 1);
    const [abductSpeed = 2500] = e2.fieldNumbers("speed");
    const abductDash = e2.field("speed", "Dash speed");
    e2.quote("Sylas will not dash to his target if the chains are blocked by spell shield.");
    kit.assume(`Abduct's chains fly at their starting ${abductSpeed} (their deceleration is left out).`);

    // Hijack: chains at an enemy within 950 that steal its ultimate, cast once at no cost, with attack damage ratios turned into ability power.
    const hijackWords = "Hijacked ultimates and abilities that do not scale with ability power have their attack damage ratios converted to ability power ratios, scaling with 0.6% AP per 1% total AD, and 0.4% AP per 1% bonus AD respectively.";
    // "0.6% AP per 1% total AD": a ratio of 0.6.
    const perAD = r.quoted(hijackWords, 0) / r.quoted(hijackWords, 1);
    const perBonusAD = r.quoted(hijackWords, 2) / r.quoted(hijackWords, 3);
    r.quote("Sylas cannot select the same champion again for a set duration, and can hold the hijacked ultimate for up to 90 seconds, during which he can recast Hijack.");
    r.quote("Sylas casts his hijacked ultimate ability at no cost, scaling based on Hijack's rank and his own statistics.");
    const hijackRange = r.field("targetRange");
    kit.assume("Hijack takes the enemy's ultimate once per duel (its per-champion lockout has no stated length). The copy keeps the ultimate's declared delivery and effects, with attack damage ratios turned into ability power; what the enemy's kit adds in code (its hooks), and ultimates that change form, are left out.");

    const stacksOf = (unit: Unit, tick: number) => (tick < Number(unit.memory["sylas:stacksUntil"] ?? -1) ? Number(unit.memory["sylas:stacks"] ?? 0) : 0);
    const setStacks = (ctx: HookContext, stacks: number, until?: number) => {
      ctx.memory["sylas:stacks"] = stacks;
      if (until !== undefined) ctx.memory["sylas:stacksUntil"] = until;
      ctx.buff("sylas:unshackled", "attackSpeed", stacks > 0 ? burstSpeed : 0, stacks > 0 ? (Number(ctx.memory["sylas:stacksUntil"]) - ctx.tick) / 30 : 0);
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: lashRange, width: 2 * lashRadius },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: lashSlowSeconds }],
      flags: { spellShield: true, projectile: false },
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "dash", direction: "target", distance: w.field("targetRange"), speed: kingslayerSpeed, hitRadius: w.field("targetRange") },
      onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }],
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["damage", "engage"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "dash", direction: "toward", distance: e.field("targetRange"), minDistance: 0, speed: e.field("speed") },
      flags: { grounded: true, knockdown: true },
      roles: ["engage"],
    };
    const e2Spec: AbilitySpec = {
      key: "E2", name: e2.name, slot: "E", cooldown: 0, castTime: e2.castTime(),
      usable: (unit, world) => world.tick >= Number(unit.memory["sylas:abductFrom"] ?? Number.POSITIVE_INFINITY) && world.tick < Number(unit.memory["sylas:abductUntil"] ?? -1),
      delivery: { kind: "line", range: e2.field("range", "Maximum edge range"), width: e2.field("width"), speed: abductSpeed },
      onHit: [{ type: "damage", damageType: "magic", amount: e2.formula("Magic Damage") }, { type: "cc", cc: "stun", duration: abductStun }],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc", "engage"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      usable: (unit) => unit.memory["sylas:hijacked"] !== true,
      delivery: { kind: "target", range: hijackRange, missileSpeed: r.field("speed") },
      onHit: [{ type: "mark", key: "sylas:hijack", duration: 1 }],
      flags: { projectile: true, spellShield: true },
      roles: ["buff"],
    };

    // The stolen ultimate: the enemy's own, copied once Hijack lands.
    const stealFrom = (enemy: Unit): AbilitySpec | undefined => {
      const ult = enemy.spec.abilities.find((a) => a.key === "R") ?? enemy.spec.abilities.find((a) => a.slot === "R");
      if (!ult || ult.activation === "transformation" || ult.name === r.name || enemy.spec.forms) return undefined;
      const convert = !scalesWithAP(ult);
      const copy = mapFormulas(ult, (f) => (convert ? hijackedFormula(f, perAD, perBonusAD) : f));
      const { cooldownKey: _key, charges: _charges, chain: _chain, cooldownFor: _cooldownFor, cooldownAfter: _after, costFor: _costFor, ...rest } = copy;
      const strip = (effects?: Effect[]) => effects?.filter((effect) => effect.type !== "refund");
      return {
        ...rest,
        key: STOLEN, name: `${r.name}: ${ult.name}`, slot: "R", cost: 0, cooldown: 0,
        usable: (unit) => unit.memory["sylas:hijackSpent"] !== true,
        ...(rest.onHit ? { onHit: strip(rest.onHit) } : {}),
        ...(rest.onSelf ? { onSelf: strip(rest.onSelf) } : {}),
      };
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      if (view.mode === "fight" || view.mode === "trade") {
        // Hijack first, for the ultimate to use later.
        if (canCast(world, self, rSpec) && Math.abs(enemy.x - self.x) - enemy.spec.base.radius <= hijackRange) return { kind: "cast", ability: "R" };
      }
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, e2Spec, rSpec],
      behavior,
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          // Every cast charges Petricite Burst.
          setStacks(ctx, Math.min(maxStacks, stacksOf(ctx.self, ctx.tick) + 1), ctx.tick + ticks(stackSeconds));
          if (key === "Q") {
            // The chains' crossing explodes 0.6 s later.
            const decision = resolveSkillshot(ctx.world, ctx.self, ctx.enemy, qSpec, ctx.tick, lashDelay, lashRadius);
            const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * Math.min(lashRange, Math.abs(ctx.enemy.x - ctx.self.x));
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, seenTick: ctx.tick, x, radius: lashRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(lashDelay), ability: "Q", onHit: [{ type: "damage", damageType: "magic", amount: lashBlast, label: `${q.name} (explosion)` }] as Effect[], connects: decision.connects, scale: decision.scale };
            ctx.world.zones.push(zone);
            if (decision.split !== undefined) ctx.queueSplit({ zone: zone.id, chance: decision.split });
          }
          if (key === "E") {
            ctx.memory["sylas:abductFrom"] = ctx.tick + ticks(abductDelay);
            ctx.memory["sylas:abductUntil"] = ctx.tick + ticks(abductWindow);
          }
          if (key === "E2") delete ctx.memory["sylas:abductUntil"];
          if (key === STOLEN) {
            // Used once; Hijack's cooldown restarts.
            ctx.memory["sylas:hijackSpent"] = true;
            ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(rSpec.cooldown, derive(ctx.self).abilityHaste));
          }
        },
        onAttack(ctx) {
          // An Unshackled attack: uncancellable, and its damage is Petricite Burst's magic damage.
          if (stacksOf(ctx.self, ctx.tick) <= 0) return;
          ctx.action.uncancellable = true;
          ctx.action.baseDamage = { damageType: "magic", amount: burst, canCrit: true, label: p.name };
          ctx.action.critMultiplier = burstCrit;
        },
        onAttackLaunch(ctx) {
          const stacks = stacksOf(ctx.self, ctx.tick);
          if (stacks > 0) setStacks(ctx, stacks - 1);
        },
        onAbilityHit(ctx) {
          if (ctx.enemy.petId !== undefined) return;
          const key = ctx.ability.key;
          if (key === "W") {
            // Kingslayer heals more the lower Sylas is.
            const d = derive(ctx.self);
            const missing = d.maxHp > 0 ? (100 * (d.maxHp - ctx.self.hp)) / d.maxHp : 0;
            ctx.apply({ type: "heal", amount: scaled(kingslayerHeal, 1 + seriesAt(kingslayerGrowth, missing, true) / 100) }, true);
          }
          if (key === "E2") {
            // Sylas dashes to the enemy and knocks it up on arrival.
            const dir = directionTo(ctx.self, ctx.enemy);
            const gap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
            const duration = Math.max(1, ticks(gap / abductDash));
            ctx.memory["sylas:abducting"] = true;
            ctx.self.action = { kind: "dash", ability: "E2", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: (dir * gap) / duration, stopAtContact: true, unstoppable: false };
          }
          if (key === "R") {
            // Hijack: the enemy's ultimate, to cast once.
            ctx.memory["sylas:hijacked"] = true;
            const stolen = stealFrom(ctx.enemy);
            if (stolen) {
              ctx.self.spec = { ...ctx.self.spec, abilities: [...ctx.self.spec.abilities.filter((a) => a.key !== STOLEN), stolen] };
              ctx.log(`hijacks ${stolen.name}`);
            }
          }
        },
        onDashEnd(ctx) {
          if (ctx.ability.key !== "E2" || ctx.memory["sylas:abducting"] !== true) return;
          delete ctx.memory["sylas:abducting"];
          if (!ctx.interrupted && ctx.enemy.alive) ctx.apply({ type: "displace", direction: "away", distance: 0, duration: abductLift });
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const casts = haste / qSpec.cooldown + haste / wSpec.cooldown + haste / eSpec.cooldown;
          return { magic: casts * (evaluate(burst, self, target) - derive(self).ad) + (evaluate(lashBlast, self, target) * haste) / qSpec.cooldown };
        },
        healing(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return (evaluate(kingslayerHeal, self, target) * 1.5 * haste) / wSpec.cooldown;
        },
      },
    };
  },
};

export default sylas;
