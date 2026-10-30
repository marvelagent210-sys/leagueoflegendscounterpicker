/**
 * Lillia (patch 26.20): Dream Dust burns and heals from every ability hit, Prance stacks speed
 * her up, Blooming Blows' outer ring adds true damage, Watch Out! Eep! hops toward a strike with
 * a small epicenter, Swirlseed lobs then rolls, and Lilting Lullaby puts a dusted enemy to sleep.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, resolveSkillshot, skillshotChance } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, applyCC, applyEffect, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { scaled, ticks } from "./util";

const EPS = 1e-6;

const lillia: KitModule = {
  champion: "Lillia",
  build(kit) {
    const p = kit.ability("Dream-Laden Bough");
    const q = kit.ability("Blooming Blows");
    const w = kit.ability("Watch Out! Eep!");
    const e = kit.ability("Swirlseed");
    const r = kit.ability("Lilting Lullaby");

    // Dream Dust: 5% (+ 1.25% per 100 AP) of maximum health over 3 s, and a heal over the same time.
    const dustWords = "which deals 5% (+ 1.25% per 100 AP) of the target's maximum health total magic damage over 3 seconds";
    const dust: Formula = { base: 0, ratios: { targetMaxHP: p.quoted(dustWords, 0) / 100 }, products: [{ ratio: p.quoted(dustWords, 1) / 100 / p.quoted(dustWords, 2), stats: ["AP", "targetMaxHP"] }] };
    const dustSeconds = p.quoted(dustWords, 3);
    const dustTicks = 6;
    const heal: Formula = { base: p.levelValue("Lillia heals herself for 39 (+ 15% AP) against large monsters and", 0), ratios: { AP: p.quoted("(+ 30% AP) against champions over the duration of Dream Dust", 0) / 100 } };
    p.quote("Dream Dust is applied even if the target takes no damage from an ability, e.g. by being shielded or invulnerable, but not when the ability hit is prevented in the first place (e.g. spell shield).");
    p.quote("Lilting Lullaby application does not apply Dream Dust, but its triggering damage does.");
    kit.assume(`Dream Dust deals its damage in ${dustTicks} ticks over ${dustSeconds} s (the game files' DotTicks), and Lillia's heal comes in the same ticks. A new application refreshes both rather than stacking.`);

    // Prance: a stack per ability that hits, up to 4, 7% (+ 3% per 100 AP) movement speed each.
    const pranceWords = "she generates a stack of Prance for 6.5 seconds, refreshing on subsequent hits and stacking up to 4 times";
    const pranceSeconds = q.quoted(pranceWords, 0);
    const pranceMax = q.quoted(pranceWords, 1);
    const pranceFall = q.quoted("Stacks expire one by one every 1.5 seconds when the duration ends", 0);
    // "(+ 3% per 100 AP)" of a movement speed share: 0.03% per AP.
    const prance: Formula = { base: q.baseOf("Bonus Movement Speed per Stack"), ratios: { AP: q.quoted("7% (+ 3% per 100 AP)", 1) / q.quoted("7% (+ 3% per 100 AP)", 2) } };
    q.quote("Spell shield will not prevent Lillia from gaining a Prance stack.");

    // Blooming Blows: magic damage within 485, the same again as true damage in the outer ring beyond 225.
    const blows = q.formula("Magic Damage");
    const outer = q.field("effectRadius", "Outer radius");
    const inner = q.field("innerRadius");
    q.quote("Enemies hit within the outer edge of the area additionally take the same amount as bonus true damage.");
    q.quote("Lillia can move during Blooming Blows' cast time.");
    kit.assume("Blooming Blows' outer ring is decided by where the enemy's center is, beyond 225 from Lillia's.");

    // Watch Out! Eep!: a strike up to 500 away after 0.767 s, 200% more within 65 of its center; Lillia hops up to 350, landing 150 short.
    const eepRange = w.field("targetRange", "Range for center of AoE");
    const hop = w.field("targetRange", "Maximum dash range");
    const short = w.quoted("Lillia dashes to 150 units in front of the target location over 0.759", 0);
    const hopTime = w.quoted("Lillia dashes to 150 units in front of the target location over 0.759", 1);
    const eepRadius = w.field("effectRadius", "Outer radius");
    const epicenter = w.field("innerRadius", "Epicenter radius");
    const eep = w.formula("Magic Damage");
    const eepCenter = w.formula("Increased Damage");
    const strikeAt = w.quoted("but cannot move before the strike goes off at 0.767 seconds, regardless", 0);
    w.quote("Enemies hit within the epicenter are dealt 200% increased damage.");
    kit.assume("Whether the enemy is within Watch Out! Eep!'s epicenter is taken by expected value: the epicenter's extra damage counts for the chance that the enemy, having stayed in the strike, also stayed within 65 units of its center (the same dodge model as the strike's 250).");

    // Swirlseed: lobbed 700 at 5000 speed, then rolls at 1400 until it hits.
    const seed = e.formula("Magic Damage");
    const seedSlow = "slowing them by 40% for 3 seconds and revealing them for 2 seconds";
    const lob = e.field("targetRange", "Lob range");
    const lobSpeed = e.field("speed", "Lobbed missile speed");
    const rollSpeed = e.field("speed", "Rolling missile speed");
    const seedWidth = e.field("width");
    e.quote("lobs a seed at the target location that rolls forward indefinitely");
    e.quote("Swirlseed's origin is determined from Lillia's position at the start of cast");
    const roll = 5000;
    kit.assume(`Swirlseed's roll, endless on the wiki, is cut at ${roll} units, farther than any duel distance. The enemy's chance to dodge it is taken from its lob speed alone.`);

    // Lilting Lullaby: on a dusted enemy, it arrives after 0.3 s, drowsy for 1.5 s (10% slower), then asleep; the next hit wakes it for bonus damage.
    const arrive = r.quoted("which arrives after 0.3 seconds and renders them drowsy for 1.5 seconds, slowing them by 10%", 0);
    const drowsy = r.quoted("which arrives after 0.3 seconds and renders them drowsy for 1.5 seconds, slowing them by 10%", 1);
    const drowsySlow = r.quoted("which arrives after 0.3 seconds and renders them drowsy for 1.5 seconds, slowing them by 10%", 2) / 100;
    const sleep = r.number("Sleep Duration");
    const wake = r.formula("Magic Damage");
    r.quote("An enemy champion affected by Dream Dust is required to cast this ability.");
    r.quote("Lillia can move during Lilting Lullaby's cast time.");
    r.quote("The next instance of non-persistent damage that a sleeping target takes from champions, large monsters or turrets consumes the debuff to deal additional magic damage.");
    r.quote("Spell shield will not prevent falling asleep nor block the wake-up damage.");
    r.quote("The lullaby's drowsy application will be blocked.");
    r.quote("Lilting Lullaby's missile will not hit a target that becomes untargetable during the cast time or while it is travelling");

    const dusted = (unit: Unit, tick: number) => tick < Number(unit.memory["lillia:dustUntil"] ?? -1);
    /** Whether the enemy will fall asleep only after `tick`: the lullaby is on its way, or the enemy is drowsy. */
    const sleepPending = (unit: Unit, tick: number) => {
      const arriving = unit.memory["lillia:rArrive"] !== undefined ? Number(unit.memory["lillia:rArrive"]) + ticks(drowsy) : -1;
      return Math.max(Number(unit.memory["lillia:sleepAt"] ?? -1), arriving) > tick;
    };

    // Every ability that connects applies Dream Dust (and the heal); one per cast instance.
    const applyDust = (ctx: HookContext, scale: number) => {
      // One Dream Dust, whichever ability applies it: a new application refreshes it.
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "dot", damageType: "magic", total: dust, duration: dustSeconds, interval: dustSeconds / dustTicks, label: "Dream Dust" }, { scale });
      ctx.memory["lillia:dustUntil"] = ctx.tick + ticks(dustSeconds);
      ctx.memory["lillia:healEach"] = (evaluate(heal, ctx.self, ctx.enemy) * scale) / dustTicks;
      ctx.memory["lillia:healLeft"] = dustTicks;
      ctx.memory["lillia:healAt"] = ctx.tick + ticks(dustSeconds / dustTicks);
    };
    const addPrance = (ctx: HookContext, key: string) => {
      const cast = String(ctx.memory[`lillia:cast:${key}`] ?? ctx.tick);
      if (ctx.memory[`lillia:prance:${key}`] === cast) return;
      ctx.memory[`lillia:prance:${key}`] = cast;
      ctx.memory["lillia:prance"] = Math.min(pranceMax, Number(ctx.memory["lillia:prance"] ?? 0) + 1);
      ctx.memory["lillia:pranceUntil"] = ctx.tick + ticks(pranceSeconds);
    };

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), moveWhileCasting: true,
      delivery: { kind: "area", near: -outer, far: outer, delay: 0, anchor: "caster", bands: [{ from: -inner, to: inner, onHit: [{ type: "damage", damageType: "magic", amount: blows }] }] },
      onHit: [{ type: "damage", damageType: "magic", amount: blows }, { type: "damage", damageType: "true", amount: blows, label: `${q.name} (outer edge)` }],
      flags: { spellShield: true },
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: 0,
      delivery: { kind: "dash", direction: "toward", distance: hop, minDistance: 0, speed: hop / hopTime, time: hopTime },
      flags: { spellShield: true, grounded: true, knockdown: true },
      roles: ["damage"],
      decisive: true,
      estimate: (self, target) => evaluate(eep, self, target),
      estimateDelay: () => strikeAt,
      // Only for a strike that can reach the enemy (it isn't a way in), and held while the
      // lullaby is on its way, so the strike lands on a sleeping enemy.
      usable: (unit, world) => Math.abs(world.units[unit.side === 0 ? 1 : 0].x - unit.x) <= eepRange + eepRadius / 2 && !sleepPending(unit, world.tick),
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), castOrigin: "start",
      // The seed detonates on the first enemy it meets, pets included.
      delivery: { kind: "line", range: roll, width: seedWidth, speed: lobSpeed, collisionPet: true },
      onHit: [{ type: "damage", damageType: "magic", amount: seed }, { type: "cc", cc: "slow", strength: e.quoted(seedSlow, 0) / 100, duration: e.quoted(seedSlow, 1) }, { type: "state", state: "revealed", duration: e.quoted(seedSlow, 2) }],
      flags: { projectile: true, spellShield: true },
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(), moveWhileCasting: true,
      delivery: { kind: "self" },
      roles: ["cc"],
      usable: (unit, world) => dusted(unit, world.tick) && world.units[unit.side === 0 ? 1 : 0].alive,
      estimate: (self, target) => evaluate(wake, self, target),
    };
    const abilities = [qSpec, wSpec, eSpec, rSpec];

    const behavior: Behavior = (view) => {
      const { self, world } = view;
      const center = Math.abs(view.enemy.x - self.x);
      const aimW = { direction: 1 as const, distance: Math.min(hop, Math.max(0, Math.min(center, eepRange) - short)) };
      const asleep = view.enemy.statuses.some((s) => s.kind === "cc" && s.key === "sleep" && s.source === self.side && s.ability === "R" && s.endTick > world.tick);
      const lulled = asleep || sleepPending(self, world.tick);
      if (!lulled && canCast(world, self, rSpec) && (view.mode === "fight" || view.mode === "kite" || view.mode === "flee")) return { kind: "cast", ability: "R" };
      if (asleep && view.mode !== "flee") {
        // The strike on a sleeping enemy: cast it, then let it land rather than waking the enemy first.
        if (canCast(world, self, wSpec)) return { kind: "cast", ability: "W", aim: aimW };
        if (world.zones.some((z) => z.owner === self.side && z.ability === "W" && z.endTick >= world.tick)) return { kind: "move", direction: 0 };
      }
      const decided = defaultBehavior(view);
      if (decided?.kind === "cast" && decided.ability === "W" && !decided.aim) return { ...decided, aim: aimW };
      return decided;
    };

    return {
      abilities,
      behavior,
      hooks: {
        onCastStart(ctx) {
          ctx.memory[`lillia:cast:${ctx.ability.key}`] = `${ctx.tick}`;
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") {
            // The strike lands where the enemy stands (up to 500 away), 0.767 s after the cast.
            const dir = directionTo(ctx.self, ctx.enemy);
            const center = Math.abs(ctx.enemy.x - ctx.self.x);
            const x = ctx.self.x + dir * Math.min(center, eepRange);
            const offset = Math.max(0, center - eepRange);
            const reach = Math.max(0, eepRadius - offset);
            const decision = reach > 0 ? resolveSkillshot(ctx.world, ctx.self, ctx.enemy, wSpec, ctx.tick, strikeAt, reach) : { connects: false, scale: 1 };
            const main = reach > 0 ? skillshotChance(ctx.world, ctx.enemy, ctx.tick, strikeAt, reach) : 0;
            const centered = epicenter > offset ? skillshotChance(ctx.world, ctx.enemy, ctx.tick, strikeAt, epicenter - offset) : 0;
            const share = main > EPS ? Math.min(1, centered / main) : 0;
            const extra: Formula = { base: eepCenter.base - eep.base, ratios: { AP: (eepCenter.ratios?.AP ?? 0) - (eep.ratios?.AP ?? 0) } };
            const onHit: Effect[] = [{ type: "damage", damageType: "magic", amount: eep }, ...(share > EPS ? [{ type: "damage" as const, damageType: "magic" as const, amount: scaled(extra, share), label: `${w.name} (epicenter)` }] : [])];
            const zone = { id: ctx.world.nextId++, owner: ctx.self.side, kind: "delayedArea" as const, seenTick: ctx.tick, x, radius: eepRadius, startTick: ctx.tick, endTick: ctx.tick + ticks(strikeAt), ability: "W", onHit, connects: decision.connects, scale: decision.scale };
            ctx.world.zones.push(zone);
            if ("split" in decision && decision.split !== undefined) ctx.queueSplit({ zone: zone.id, chance: decision.split });
            // She can't move or attack before the strike.
            ctx.apply({ type: "state", state: "noMovement", duration: strikeAt }, true);
            ctx.apply({ type: "state", state: "noAttacks", duration: strikeAt }, true);
          }
          if (ctx.ability.key === "R") ctx.memory["lillia:rArrive"] = ctx.tick + ticks(arrive);
        },
        onMissileTick(ctx) {
          // The seed lands at the end of its lob and rolls on, slower.
          if (ctx.missile.source !== "E") return;
          const origin = Number(ctx.memory[`lillia:seedOrigin:${ctx.missile.id}`] ?? ctx.missile.x);
          ctx.memory[`lillia:seedOrigin:${ctx.missile.id}`] = origin;
          if (Math.abs(ctx.missile.x - origin) + EPS >= lob) ctx.missile.perTick = rollSpeed / 30;
        },
        onMissileEnd(ctx) {
          if (ctx.missile.source === "E") delete ctx.memory[`lillia:seedOrigin:${ctx.missile.id}`];
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q" || ctx.ability.key === "W" || ctx.ability.key === "E" || ctx.ability.key === "R") addPrance(ctx, ctx.ability.key);
        },
        onAbilityHit(ctx) {
          if ((ctx.ability.key === "Q" || ctx.ability.key === "W" || ctx.ability.key === "E") && ctx.enemy.alive) applyDust(ctx, ctx.scale);
        },
        onBeforeDamageObserved(ctx) {
          // The wake-up: the first non-persistent hit on the sleeping enemy, before it wakes.
          if (ctx.target.side === ctx.self.side || ctx.targetPet || ctx.persistent || ctx.amount <= 0 || ctx.ability === `${r.name} (wake-up)`) return;
          if (ctx.source.petId !== undefined || ctx.memory["lillia:wakeArmed"] !== true) return;
          const asleep = ctx.target.statuses.some((s) => s.kind === "cc" && s.key === "sleep" && s.source === ctx.self.side && s.ability === "R" && s.endTick > ctx.tick);
          if (!asleep) return;
          ctx.memory["lillia:wakeArmed"] = false;
          applyEffect(ctx.world, ctx.self, ctx.target, { type: "damage", damageType: "magic", amount: wake, label: `${r.name} (wake-up)` }, { scale: 1 });
        },
        onTick(ctx) {
          const self = ctx.self;
          // Lillia's heal from Dream Dust.
          const left = Number(ctx.memory["lillia:healLeft"] ?? 0);
          if (left > 0 && ctx.tick >= Number(ctx.memory["lillia:healAt"] ?? Number.POSITIVE_INFINITY)) {
            ctx.memory["lillia:healLeft"] = left - 1;
            ctx.memory["lillia:healAt"] = ctx.tick + ticks(dustSeconds / dustTicks);
            if (ctx.enemy.alive) ctx.apply({ type: "heal", amount: { base: Number(ctx.memory["lillia:healEach"] ?? 0) } }, true);
          }
          // Prance: the stacks fall off one by one once their time is up.
          let stacks = Number(ctx.memory["lillia:prance"] ?? 0);
          if (stacks > 0 && ctx.tick >= Number(ctx.memory["lillia:pranceUntil"] ?? 0)) {
            stacks -= 1;
            ctx.memory["lillia:prance"] = stacks;
            ctx.memory["lillia:pranceUntil"] = ctx.tick + ticks(pranceFall);
          }
          ctx.buff("lillia:prance", "moveSpeedPercent", stacks * evaluate(prance, self) / 100, stacks > 0 ? 60 : 0);
          // Lilting Lullaby: it arrives, the enemy grows drowsy, then falls asleep.
          if (ctx.memory["lillia:rArrive"] !== undefined && ctx.tick >= Number(ctx.memory["lillia:rArrive"])) {
            delete ctx.memory["lillia:rArrive"];
            const enemy = ctx.enemy;
            if (enemy.alive && !inStasis(enemy) && !isUntargetable(enemy, self)) {
              addPrance(ctx, "R");
              const shielded = enemy.statuses.some((s) => s.kind === "state" && s.key === "spellShield" && s.endTick > ctx.tick);
              abilityHit(ctx.world, self, enemy, rSpec, [{ type: "cc", cc: "drowsy", duration: drowsy, strength: drowsySlow }]);
              ctx.memory["lillia:drowsyHeld"] = !shielded && enemy.statuses.some((s) => s.kind === "cc" && s.key === "drowsy" && s.source === self.side);
              ctx.memory["lillia:sleepAt"] = ctx.tick + ticks(drowsy);
            }
          }
          if (ctx.memory["lillia:sleepAt"] !== undefined) {
            const enemy = ctx.enemy;
            // A cleansed drowsy never becomes sleep.
            const cleansed = ctx.memory["lillia:drowsyHeld"] === true && !enemy.statuses.some((s) => s.kind === "cc" && s.key === "drowsy" && s.source === self.side);
            if (cleansed && ctx.tick < Number(ctx.memory["lillia:sleepAt"])) { delete ctx.memory["lillia:sleepAt"]; return; }
            if (ctx.tick >= Number(ctx.memory["lillia:sleepAt"])) {
              delete ctx.memory["lillia:sleepAt"];
              enemy.statuses = enemy.statuses.filter((s) => !(s.kind === "cc" && s.key === "drowsy" && s.source === self.side && s.ability === "R"));
              if (applyCC(ctx.world, self, enemy, "sleep", sleep, 0, false, "R")) ctx.memory["lillia:wakeArmed"] = true;
            }
          }
        },
      },
      budget: {
        damage(self, target) { return { magic: evaluate(dust, self, target) / dustSeconds }; },
        healing(self, target) { return evaluate(heal, self, target) / dustSeconds; },
      },
    };
  },
};

export default lillia;
