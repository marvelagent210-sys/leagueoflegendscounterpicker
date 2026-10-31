/**
 * Bard (patch 26.20): the Chimes he collected over the game set how many Meeps follow him and
 * how hard they hit and slow; each attack spends one. Cosmic Binding slows, and stuns against
 * the wall behind the enemy; Caretaker's Shrine heals him; Tempered Fate puts the enemy in
 * stasis.
 */
import type { KitModule } from "../../engine/kits/compile";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { FOREVER, between, seriesAt, ticks } from "./util";

const bard: KitModule = {
  champion: "Bard",
  options: { chimes: { label: "Chimes collected by level 20 (one appears every 50 s)", default: 40 } },
  build(kit, options) {
    const p = kit.ability("Traveler's Call");
    const q = kit.ability("Cosmic Binding");
    const w = kit.ability("Caretaker's Shrine");
    const e = kit.ability("Magical Journey");
    const r = kit.ability("Tempered Fate");
    const chimes = Math.max(0, Math.round(options.chimes ?? 0));

    // Meeps: up to 3 (at 40 Chimes), one every 6 s; each attack spends one for 78 (30, + 6 per 5 Chimes) (+ 40% AP) magic damage and a 35% slow for 1 s.
    const meepWords = "While he has Meeps, his basic attacks are empowered to each consume a Meep on-attack to deal 30 (+ 6 per 5 Chimes collected) (+ 40% AP) bonus magic damage.";
    const meep: Formula = { base: p.quoted(meepWords, 0) + p.quoted(meepWords, 1) * Math.floor(chimes / p.quoted(meepWords, 2)), ratios: { AP: p.quoted(meepWords, 3) / 100 } };
    const meepSlow = chimes >= 5 ? seriesAt(p.seriesIn("At 5 Chimes, Meeps slow damaged enemies by"), chimes, false) / 100 : 0;
    const meepSlowSeconds = p.quoted("At 5 Chimes, Meeps slow damaged enemies by 25 / 35 / 45 / 55 / 65 / 75 (based on number of Chimes)% for 1 second.", 7);
    const maxMeeps = seriesAt(p.seriesIn("Bard can have up to 1 / 2 / 3"), chimes, false);
    const meepEvery = seriesAt(p.fieldSeries("staticCooldown", "Meep spawn rate"), chimes, false);
    kit.assume(`Bard has collected ${chimes} Chimes by level 20 (the Chimes setting), and starts the duel with his ${maxMeeps} Meeps. The Chimes' movement speed is out of combat only, and their spread to other enemies has no one else to hit.`);

    // Cosmic Binding: a bolt (850, 120, 1500) for 240 (+ 80% AP) and a 60% slow for 1.8 s; going on 300 behind the enemy into terrain, it stuns it instead.
    const bindWords = "Bard fires an energy bolt in the target direction that deals magic damage to the first enemy hit and slows them by 60% for a duration.";
    const bindSlow = q.quoted(bindWords, 0) / 100;
    const bindSeconds = q.number("Disable Duration");
    const bindBehind = q.quoted("After Cosmic Binding hits an enemy, the bolt continues behind them for 300 units.", 0);
    q.quote("If the bolt hits terrain or a second enemy, it stuns both targets for the same duration");

    // Caretaker's Shrine: two charges (one per 18 s); a shrine that gathers power over 5 s, healing 125 – 200 (+ 40 – 70% AP) and granting 30% (+ 6% per 100 AP) movement speed decaying over 1.5 s.
    const gatherSeconds = w.quoted("gathers power over 5 seconds", 0);
    const shrineLeast = w.formula("Minimum Heal");
    const shrineMost = w.formula("Maximum Heal");
    const moveWords = "Bonus Movement Speed: 20 / 22.5 / 25 / 27.5 / 30% (+ 6% per 100 AP)";
    const shrineMove: Formula = { base: w.baseOf("Bonus Movement Speed") / 100, ratios: { AP: w.quoted(moveWords, 5) / 100 / 100 } };
    const moveDecay = w.quoted("gain bonus movement speed decaying over 1.5 seconds", 0);
    const shrineCharges = w.quoted("Bard periodically stocks a Caretaker's Shrine charge, up to a maximum of 2.", 0);
    const shrineRecharge = w.field("recharge");
    kit.assume(`Bard places Caretaker's Shrine at his feet and walks over it when it has gathered its full power, ${gatherSeconds} s later.`);

    // Magical Journey needs terrain to open a corridor through, and the enemy can follow him through it.
    e.quote("A valid piece of terrain within the target range is required to cast this ability.");
    kit.assume("Magical Journey's corridor through terrain lets the enemy follow, so on a duel's line it gains Bard nothing and is left out.");

    // Tempered Fate: an arc (3400) that puts everything within 350 in stasis for 2.5 s and stuns enemies.
    const fateSeconds = r.quoted("Upon impact, it puts all units within into stasis for 2.5 seconds", 0);
    const fateFlight = 0.5;
    kit.assume(`Tempered Fate lands ${fateFlight} s after its cast (the wiki gives no speed), on the enemy alone.`);

    const meepsOf = (memory: Record<string, number | string | boolean>) => Number(memory["bard:meeps"] ?? maxMeeps);
    const meepHit: Effect[] = [{ type: "damage", damageType: "magic", amount: meep, label: "Meep" }, ...(meepSlow > 0 ? [{ type: "cc", cc: "slow", strength: meepSlow, duration: meepSlowSeconds } as Effect] : [])];

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed") },
      onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: bindSlow, duration: bindSeconds }],
      flags: { projectile: true, spellShield: true },
      decisive: true,
      roles: ["damage", "cc"],
    };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: 0, charges: { max: shrineCharges, recharge: shrineRecharge }, cost: w.cost(), castTime: w.castTime(),
      delivery: { kind: "self" },
      roles: ["buff"],
    };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      // Cast only by his own choice (to get away): it would put the enemy out of reach of his damage too.
      usable: (unit) => unit.memory["bard:fate"] === true,
      delivery: { kind: "circle", range: r.field("targetRange"), radius: r.field("effectRadius"), delay: fateFlight },
      // The stun first: a unit already in stasis takes no crowd control.
      onHit: [{ type: "cc", cc: "stun", duration: fateSeconds }, { type: "cc", cc: "stasis", duration: fateSeconds }],
      flags: { spellShield: true },
      roles: ["cc"],
    };

    const ctxFree = (self: { memory: Record<string, number | string | boolean> }) => self.memory["bard:shrineAt"] === undefined;
    const behavior: Behavior = (view) => {
      const { self, world } = view;
      // Tempered Fate to get away; a shrine when hurt.
      if (view.mode === "flee" || view.mode === "kite") {
        self.memory["bard:fate"] = true;
        const fate = canCast(world, self, rSpec) && Math.abs(view.enemy.x - self.x) <= 900;
        delete self.memory["bard:fate"];
        if (fate) {
          self.memory["bard:fate"] = true;
          return { kind: "cast", ability: "R" };
        }
      }
      if (view.mode !== "idle" && canCast(world, self, wSpec) && self.hp <= 0.8 * derive(self).maxHp && ctxFree(self)) return { kind: "cast", ability: "W" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, rSpec],
      behavior,
      hooks: {
        onStart(ctx) {
          ctx.memory["bard:meeps"] = maxMeeps;
          ctx.memory["bard:meepAt"] = ctx.tick + ticks(meepEvery);
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") delete ctx.memory["bard:fate"];
          if (ctx.ability.key === "W") ctx.memory["bard:shrineAt"] = ctx.tick + ticks(gatherSeconds);
        },
        onAbilityContact(ctx) {
          // Terrain within 300 behind the enemy: the bolt stuns it.
          if (ctx.ability.key !== "Q" || ctx.enemy.petId !== undefined) return undefined;
          const env = ctx.world.settings.environment;
          if (!env.walls || env.wallDistance > bindBehind) return undefined;
          return [...ctx.effects, { type: "cc", cc: "stun", duration: bindSeconds }];
        },
        onAttack(ctx) {
          // An attack with a Meep spends it.
          const meeps = meepsOf(ctx.memory);
          if (meeps <= 0 || ctx.targetPet) return;
          ctx.memory["bard:meeps"] = meeps - 1;
          if (meeps >= maxMeeps) ctx.memory["bard:meepAt"] = ctx.tick + ticks(meepEvery);
          ctx.action.onHit = [...ctx.action.onHit, ...meepHit];
        },
        onTick(ctx) {
          const self = ctx.self;
          // A new Meep every 6 s, up to the maximum.
          if (meepsOf(ctx.memory) < maxMeeps && ctx.tick >= Number(ctx.memory["bard:meepAt"] ?? 0)) {
            ctx.memory["bard:meeps"] = meepsOf(ctx.memory) + 1;
            ctx.memory["bard:meepAt"] = ctx.tick + ticks(meepEvery);
          }
          // The shrine, collected at full power.
          const shrineAt = ctx.memory["bard:shrineAt"];
          if (shrineAt !== undefined && ctx.tick >= Number(shrineAt)) {
            delete ctx.memory["bard:shrineAt"];
            ctx.apply({ type: "heal", amount: between(shrineLeast, shrineMost, 1) }, true);
            ctx.memory["bard:moveFrom"] = ctx.tick;
          }
          const moveFrom = ctx.memory["bard:moveFrom"];
          if (moveFrom !== undefined) {
            const age = (ctx.tick - Number(moveFrom)) / 30;
            ctx.buff("bard:shrineMove", "moveSpeedPercent", age < moveDecay ? evaluate(shrineMove, self) * (1 - age / moveDecay) : 0, FOREVER);
            if (age >= moveDecay) delete ctx.memory["bard:moveFrom"];
          }
        },
      },
      budget: {
        damage(self, target) {
          return { magic: evaluate(meep, self, target) / meepEvery };
        },
        healing(self) {
          return (2 * evaluate(shrineMost, self)) / shrineRecharge;
        },
      },
    };
  },
};

export default bard;
