/**
 * Fiddlesticks (patch 26.20): Terrify fears and takes a share of current health, doubled
 * against an enemy it already feared; Bountiful Harvest tethers and drains, healing from the
 * damage and refunding most of its cooldown; Reap slows and silences; Crowstorm channels, then
 * blinks in with a storm of crows that follows Fiddlesticks for 5 s.
 */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { ticks } from "./util";

const TETHER = "fiddlesticks:tether";

const fiddlesticks: KitModule = {
  champion: "Fiddlesticks",
  build(kit) {
    const p = kit.ability("A Harmless Scarecrow");
    const q = kit.ability("Terrify");
    const w = kit.ability("Bountiful Harvest");
    const e = kit.ability("Reap");
    const r = kit.ability("Crowstorm");

    // A Harmless Scarecrow and Terrify's passive need Fiddlesticks unseen, or still as an Effigy, out of combat.
    p.quote("Fiddlesticks can pretend to be an Effigy by standing still and not acting nor being acted upon for 2 seconds");
    q.quote("While Fiddlesticks has been out of combat for at least 2.25 seconds and is not visible to the enemy team, or is impersonating an Effigy, its damaging ability will additionally fear targets hit for a duration.");
    kit.assume("A duel starts with both champions in sight and ready to fight, so Fiddlesticks never impersonates an Effigy and Terrify's passive fear never applies; its Effigies and Sweeper Drone do nothing here. Its close-range slash deals the same damage as its ranged attack and is left out.");

    // Terrify: a crow within 575 after 0.35 s: 6% (+ 3% per 100 AP) of current health (at least 120) and a 2 s fear that also slows by 90%.
    const terror = q.formula("Magic Damage");
    const terrorLeast = q.number("Minimum Damage");
    const fearSeconds = q.number("Fear Duration");
    const fearSlow = q.quoted("Terrify slows affected targets by 90%.", 0) / 100;
    // An enemy it feared can't be feared again for Terrify's cooldown, and takes double: 12% (+ 6% per 100 AP), at least 240.
    q.quote("Targets feared by Fiddlesticks by any means cannot be affected by it again for a duration equal to Terrify's cooldown. Against these targets, Terrify's damage and minimum threshold are doubled.");
    const doubled = q.formula("Increased Magic Damage");
    const doubledLeast = q.number("Increased Minimum Damage");
    q.quote("It is not applied if the effect is blocked by a spell shield.");

    // Bountiful Harvest: tethers an enemy within 650 (broken beyond 725) and drains 45 (+ 11.25% AP) every 0.25 s for 2 s, the last also 22% of missing health; heals 55% of the damage before mitigation; 60% of the cooldown back if not interrupted.
    const harvestWords = "Fiddlesticks forms a tether between itself and each nearby enemy over the cast time, then channels for up to 2 seconds to harvest their souls, revealing them in the process.";
    const harvestSeconds = w.quoted(harvestWords, 0);
    const harvestEvery = w.quoted("While Fiddlesticks is channeling, the tethered enemies are dealt magic damage every 0.25 seconds.", 0);
    const harvestTick = w.formula("Damage per Instance");
    // The last of the eight ticks adds 22% of missing health (its 45 (+ 11.25% AP) is the tick itself).
    const lastTick: Formula = { base: 0, ratios: { targetMissingHP: w.formulaPart("Last Tick of Damage", ["targetMissingHP"]).ratios?.targetMissingHP ?? 0 } };
    const harvestHeal = w.fraction("Champion Heal Portion");
    w.quote("Fiddlesticks heals itself for a portion of the pre-mitigation damage dealt");
    const harvestRefund = w.quoted("Bountiful Harvest ends if all targets have died or broken their tethers. If the channel was not interrupted, 60% of the current cooldown is refunded.", 0) / 100;
    const harvestReach = w.field("effectRadius");
    const tetherReach = w.field("tetherRadius");
    w.quote("A nearby enemy is required to cast this ability.");
    w.quote("Spell shield will block the tether's application but not the damage of one already applied.");
    const lastLabel = `${w.name} (last tick)`;
    kit.assume("Fiddlesticks can't walk while channeling Bountiful Harvest or Crowstorm.");

    // Reap: an area within 850 after 0.4 s: 210 (+ 50% AP), a 50% slow and, in its center, a silence, both for 1.25 s.
    const reapWords = "Fiddlesticks slashes the target location with its scythe, dealing magic damage to enemies within the area and slowing them for 1.25 seconds.";
    const reapSeconds = e.quoted(reapWords, 0);
    const silenceSeconds = e.quoted("Enemies hit in the center of the area are also silenced for 1.25 seconds.", 0);
    const reapRadius = 300;
    kit.assume(`Reap's area is a circle of ${reapRadius} (the wiki gives no size), and aimed at the enemy it hits with its center, silencing.`);

    // Crowstorm: a 1.5 s channel (roots don't stop it), then a blink of up to 800 and 5 s of crows within 600: 87.5 (+ 12.5% AP) every 0.25 s.
    const stormWords = "Fiddlesticks channels for 1.5 seconds, then blinks to the target location upon completion with a murder of crows flying wildly around it for 5 seconds, dealing magic damage every 0.25 seconds to nearby enemies.";
    const stormChannel = r.quoted(stormWords, 0);
    const stormSeconds = r.quoted(stormWords, 1);
    const stormEvery = r.quoted(stormWords, 2);
    const stormTick = r.formula("Magic Damage per Tick");
    const stormReach = r.field("effectRadius");
    const blinkRange = r.field("targetRange");
    r.quote("Roots do not interrupt the ability despite being a movement channel.");

    const tethered = (enemy: Unit, self: Unit) => enemy.statuses.some((s) => s.kind === "mark" && s.key === TETHER && s.source === self.side);
    const feared = (self: Unit, tick: number) => tick < Number(self.memory["fiddlesticks:fearLock"] ?? -1);

    const qSpec: AbilitySpec = {
      key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
      delivery: { kind: "target", range: q.field("targetRange") },
      onHit: [
        { type: "damage", damageType: "magic", amount: terror, minimum: { base: terrorLeast } },
        { type: "cc", cc: "fear", duration: fearSeconds },
        { type: "cc", cc: "slow", strength: fearSlow, duration: fearSeconds },
      ],
      flags: { projectile: true, spellShield: true },
      roles: ["damage", "cc"],
    };
    // The tether, applied over the cast: a spell shield blocks it.
    const tetherSpec: AbilitySpec = { key: "WT", name: w.name, slot: "W", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: true } };
    const wSpec: AbilitySpec = {
      key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
      usable: (unit, world) => {
        const enemy = world.units[1 - unit.side]!;
        return Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= harvestReach;
      },
      delivery: { kind: "self" },
      channel: {
        duration: harvestSeconds,
        pulses: { base: harvestSeconds / harvestEvery },
        interruptible: true,
        range: tetherReach,
        pulsesPassSpellShields: true,
        onTick: [{ type: "damage", damageType: "magic", amount: harvestTick, label: w.name }],
        onComplete: [{ type: "damage", damageType: "magic", amount: lastTick, label: lastLabel }],
        onCompleteSelf: [{ type: "refund", ability: "W", fraction: harvestRefund }],
      },
      flags: { spellShield: false },
      roles: ["damage"],
    };
    const eSpec: AbilitySpec = {
      key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
      delivery: { kind: "circle", range: e.field("targetRange"), radius: reapRadius, delay: 0 },
      onHit: [
        { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
        { type: "cc", cc: "slow", strength: e.fraction("Slow"), duration: reapSeconds },
        { type: "cc", cc: "silence", duration: silenceSeconds },
      ],
      flags: { spellShield: true },
      roles: ["damage", "cc"],
    };
    const stormSpec: AbilitySpec = { key: "RS", name: r.name, slot: "R", cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: false } };
    const rSpec: AbilitySpec = {
      key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
      usable: (unit, world) => {
        const enemy = world.units[1 - unit.side]!;
        return Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= blinkRange;
      },
      delivery: { kind: "self" },
      channel: {
        duration: stormChannel,
        interruptible: true,
        interrupts: ["airborne", "berserk", "charm", "fear", "polymorph", "silence", "sleep", "stasis", "stun", "suppression", "suspension", "taunt"],
        onCompleteSelf: [{ type: "reposition", direction: "toward", distance: blinkRange }],
      },
      flags: { grounded: true },
      decisive: true,
      roles: ["damage"],
    };

    const behavior: Behavior = (view) => {
      const { self, world, enemy } = view;
      // Crowstorm when the enemy is within its blink.
      if (view.mode === "fight" && canCast(world, self, rSpec) && Math.abs(enemy.x - self.x) - enemy.spec.base.radius <= blinkRange) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    return {
      abilities: [qSpec, wSpec, eSpec, rSpec],
      behavior,
      hooks: {
        onCastStart(ctx) {
          // Bountiful Harvest tethers the enemy over its cast time.
          if (ctx.ability.key === "W") abilityHit(ctx.world, ctx.self, ctx.enemy, tetherSpec, [{ type: "mark", key: TETHER, duration: wSpec.castTime + harvestSeconds + 0.1 }]);
        },
        onAbilityContact(ctx) {
          const key = ctx.ability.key;
          if (ctx.enemy.petId !== undefined) return undefined;
          if (key === "Q") {
            // Against an enemy it already feared: double damage and no fear.
            if (feared(ctx.self, ctx.tick)) return [{ type: "damage", damageType: "magic", amount: doubled, minimum: { base: doubledLeast } }];
            if (!ctx.defense) ctx.memory["fiddlesticks:fearLock"] = ctx.tick + ticks(cooldownAfterHaste(qSpec.cooldown, derive(ctx.self).abilityHaste));
            return undefined;
          }
          if (key === "W") {
            // Only a tethered enemy is drained; walking beyond 725 breaks the tether.
            if (!tethered(ctx.enemy, ctx.self)) return [];
            if (Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius > tetherReach) {
              ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === TETHER && s.source === ctx.self.side));
              return [];
            }
          }
          return undefined;
        },
        onChannelInterrupt(ctx) {
          if (ctx.ability.key === "W") ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !(s.kind === "mark" && s.key === TETHER && s.source === ctx.self.side));
          // An interrupted Crowstorm brings no storm.
          if (ctx.ability.key === "R") delete ctx.memory["fiddlesticks:storming"];
        },
        onDamageDealt(ctx) {
          if ((ctx.ability === w.name || ctx.ability === lastLabel) && ctx.raw > 0) ctx.apply({ type: "heal", amount: { base: harvestHeal * ctx.raw } }, true);
        },
        onTick(ctx) {
          const self = ctx.self;
          // The storm starts once Crowstorm's channel has completed and Fiddlesticks has blinked in.
          const channeling = self.action?.kind === "channel" && self.action.ability === "R";
          if (channeling) ctx.memory["fiddlesticks:storming"] = true;
          else if (ctx.memory["fiddlesticks:storming"] === true) {
            delete ctx.memory["fiddlesticks:storming"];
            ctx.memory["fiddlesticks:stormFrom"] = ctx.tick;
            ctx.memory["fiddlesticks:stormHits"] = 0;
          }
          const from = ctx.memory["fiddlesticks:stormFrom"];
          if (from === undefined) return;
          const hits = Number(ctx.memory["fiddlesticks:stormHits"] ?? 0);
          const total = Math.round(stormSeconds / stormEvery);
          if (hits >= total) {
            delete ctx.memory["fiddlesticks:stormFrom"];
            return;
          }
          if (ctx.tick < Number(from) + Math.round((hits + 1) * stormEvery * 30)) return;
          ctx.memory["fiddlesticks:stormHits"] = hits + 1;
          const enemy = ctx.enemy;
          if (enemy.alive && Math.abs(enemy.x - self.x) - enemy.spec.base.radius <= stormReach) abilityHit(ctx.world, self, enemy, stormSpec, [{ type: "damage", damageType: "magic", amount: stormTick, label: r.name }]);
        },
      },
      budget: {
        damage(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          return { magic: (Math.round(stormSeconds / stormEvery) * evaluate(stormTick, self, target) * haste) / rSpec.cooldown };
        },
        healing(self, target) {
          const haste = 1 + derive(self).abilityHaste / 100;
          const drained = (harvestSeconds / harvestEvery) * evaluate(harvestTick, self, target) + evaluate(lastTick, self, target);
          return (harvestHeal * drained * haste) / (wSpec.cooldown * (1 - harvestRefund));
        },
      },
    };
  },
};

export default fiddlesticks;
