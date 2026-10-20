/** Urgot: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { CC_RULES } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { abilityHit, addStatus, directionTo, isUntargetable } from "../../engine/sim/combat";
import { ccTypes, derive, hasState } from "../../engine/sim/derived";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, flat, innateStat, maxHp, ticks } from "./util";

const urgot: KitModule = {
  champion: "Urgot",
  build(kit) {
    const innate = kit.ability("Echoing Flames");
    const q = kit.ability("Corrosive Charge");
    const w = kit.ability("Purge");
    const e = kit.ability("Disdain");
    const r = kit.ability("Fear Beyond Death");

    // Echoing Flames: a leg's shotgun fires on an attack's hit, then waits out its own cooldown.
    const legSeries = innate.seriesIn("Urgot's next basic attack on-hit within the arc of a shotgun");
    const legAD = innate.at20(legSeries, "shotgun AD ratio") / 100;
    const legHealth = innate.levelValue("Urgot's next basic attack on-hit within the arc of a shotgun", 1) / 100;
    innate.quote("Per-Leg Cooldown: 30 / 20 / 10 / 5 / 2.5 (based on level)");
    const legCooldown = 2.5;
    const legsFacing = 2;
    // Purge: toggled on for good at rank 5, firing 3 times a second at the enemy within 490 units.
    w.quote("at maximum rank, Purge lasts indefinitely and becomes a toggled ability");
    const purgeSpeed = w.quoted("firing at the nearest enemy at a fixed 3.0 attack speed", 0);
    const purgeRange = w.field("effectRadius");
    const purgeShot: Formula = w.formula("Modified Physical Damage");
    const purgeSlowResist = w.quoted("gains 40% slow resist", 0) / 100;
    const purgeSlowdown = w.quoted("his movement speed is reduced by 125", 0);
    // Quiet times: what stops Purge firing.
    const quiet: Record<string, number> = {
      E: e.quoted("Disdain prevents Purge from firing for 1.25 seconds", 0),
      Q: q.quoted("Corrosive Charge prevents Purge from firing for 0.05 seconds after the cast time", 0),
      R: r.quoted("Fear Beyond Death prevents Purge from firing for 0.8 seconds", 0),
      R2: r.quoted("The recast prevents Purge from firing for 1.5 seconds", 0),
    };
    // Corrosive Charge lands 0.1 s after the cast, flies 0.2 s and explodes 0.3 s later (game files).
    const chargeDelay = 0.1 + 0.2 + q.quoted("it explodes after 0.3 seconds", 0);
    // Fear Beyond Death: below 25% health, the leashed target can be reeled in and executed.
    const leash = r.quoted("leashing the target for 4 seconds", 0);
    const threshold = r.quoted("if the leashed target is below 25% of their maximum health", 0) / 100;
    const reel = r.quoted("channels for 1.5 seconds once they latch on", 0);
    const drillCooldown = r.cooldown();
    const chainsSpeed = r.field("speed");
    const displacementWait = r.quoted("does not end within 10 seconds", 0);
    const executeFloor = r.quoted("reduce him to 1 health", 0);
    r.quote("The recast's chains are classified as a projectile");
    r.quote("Spell shield will not block the recast's chains");
    const leashSlow = r.seriesIn("revealed and slowed by");
    if (leashSlow.kind !== "variable") throw new Error("Urgot kit: Fear Beyond Death's slow changed shape");
    const slowMax = Math.max(...leashSlow.values.map(Number)) / 100;
    const slowFull = Math.max(...leashSlow.points.map(Number)) / 100;
    kit.assume(`Purge is on for the whole fight (it replaces Urgot's basic attacks); its bolts hit at once rather than as missiles.`);
    kit.assume(`Urgot keeps ${legsFacing} legs facing the enemy, so a shotgun can fire every ${legCooldown / legsFacing} s (each leg every ${legCooldown} s at level 20).`);
    kit.assume("Disdain's fling over Urgot is left out.");
    kit.assume("Fear Beyond Death's slow is set when the drill hits, from the target's missing health then.");
    kit.assume("Mercy's preliminary push of up to 1000 units is omitted: the wiki gives no proximity formula. Its subsequent pull follows the target toward Urgot over the channel.");
    const purge: AbilitySpec = {
      key: "W",
      activation: "toggle",
      name: w.name,
      slot: "W",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "self" },
      onHitScale: w.quoted("on-hit and on-attack damage reduced to 50% effectiveness", 0) / 100,
      flags: { parry: true, appliesOnHit: true, appliesLifeSteal: true, spellShield: false },
    };
    innate.quote("It bypasses blocking and dodging effects");

    // Purge fires unless crowd control stops attacks (forced attacks still fire it).
    const firing = (self: Unit) => !self.forced && [...ccTypes(self)].every((type) => CC_RULES[type].attacking !== "disabled" && type !== "blind");
    const shoot = (ctx: HookContext) => {
      abilityHit(ctx.world, ctx.self, ctx.enemy, purge, [{ type: "damage", damageType: "physical", amount: purgeShot, label: w.name }]);
      if (ctx.enemy.hp <= 0) return; // A lethal bolt doesn't fire a shotgun at a dead target.
      if (ctx.tick < Number(ctx.memory.legReady ?? 0)) return;
      ctx.memory.legReady = ctx.tick + ticks(legCooldown / legsFacing);
      ctx.apply({ type: "damage", damageType: "physical", amount: { base: 0, ratios: { AD: legAD, targetMaxHP: legHealth } }, label: innate.name });
    };
    const protection = "urgot:mercy:";
    // An internal delivery stage keeps targeted/projectile/suppression metadata visible
    // to defensive behavior even when a recast was armed before its launch threshold.
    const chains: AbilitySpec = {
      key: "Rchains", name: `${r.name} (chains)`, slot: "other", cooldown: 0, castTime: 0,
      delivery: { kind: "target", range: Number.POSITIVE_INFINITY, missileSpeed: chainsSpeed },
      onHit: [{ type: "cc", cc: "suppression", duration: displacementWait + reel }],
      usable: () => false,
      flags: { projectile: true, spellShield: false },
    };
    const leashed = (unit: Unit, tick: number) => tick <= Number(unit.memory.leashUntil ?? -1);
    const below = (enemy: Unit) => enemy.hp < threshold * maxHp(enemy);
    const externalUntargetability = (self: Unit, enemy: Unit) => enemy.statuses.some((s) =>
      !s.memoKey?.startsWith(protection) && (
        ((s.kind === "state" || s.kind === "cc") && s.key === "stasis") ||
        (s.kind === "state" && (s.key === "untargetable" || (s.key === "untargetableFar" && Math.abs(self.x - (s.x ?? enemy.x)) > s.value)))
      ),
    );
    const removeProtection = (ctx: HookContext) => {
      ctx.enemy.statuses = ctx.enemy.statuses.filter((s) => !s.memoKey?.startsWith(protection) && !(
        s.source === ctx.self.side && s.kind === "cc" && s.key === "suppression" && s.ability === chains.key
      ));
    };
    const cooldown = (ctx: HookContext) => {
      removeProtection(ctx);
      ctx.memory.leashUntil = -1;
      ctx.memory.mercyArmed = false;
      ctx.memory.mercyChain = -1;
      ctx.memory.mercyAttached = false;
      ctx.memory.mercyEnds = -1;
      ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(drillCooldown, derive(ctx.self).abilityHaste));
    };
    const launchMercy = (ctx: HookContext) => {
      if (!ctx.self.alive || ctx.self.hp <= 0 || !ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.fallen || externalUntargetability(ctx.self, ctx.enemy)) return false;
      if (Number(ctx.memory.mercyChain ?? -1) >= 0 || ctx.memory.mercyAttached) return false;
      const id = ctx.world.nextId++;
      ctx.memory.mercyChain = id;
      ctx.memory.mercyArmed = false;
      ctx.memory.quietUntil = ctx.tick + ticks(reel);
      // Mercy's targeted chains use the same projectile engine as other homing spells.
      // Launching them separately permits an early recast to arm, without firing yet.
      ctx.world.missiles.push({
        id, owner: ctx.self.side, source: chains.key, seenTick: ctx.tick, x: ctx.self.x,
        perTick: chainsSpeed / 30, homing: true, direction: directionTo(ctx.self, ctx.enemy),
        travelLeft: Number.POSITIVE_INFINITY, projectile: true, connects: true, scale: 1,
        onHit: chains.onHit!,
      });
      ctx.log("Mercy's chains launch");
      return true;
    };
    const updateMercy = (ctx: HookContext) => {
      const self = ctx.self;
      const enemy = ctx.enemy;
      if (ctx.memory.mercyAttached) {
        const ends = Number(ctx.memory.mercyEnds ?? -1);
        const suppressed = enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression" && s.source === self.side && s.ability === chains.key && s.endTick > ctx.tick);
        if (!enemy.alive || enemy.hp <= 0 || enemy.fallen || self.hp <= 0) {
          removeProtection(ctx);
          if (self.action?.kind === "channel" && self.action.ability === "R2") self.action = undefined;
          cooldown(ctx);
          return;
        }
        if (!suppressed || externalUntargetability(self, enemy)) {
          // A cleanse prevents execution, but Urgot completes a channel already begun.
          ctx.memory.mercyCancelled = true;
          removeProtection(ctx);
          if (ends < 0) { cooldown(ctx); return; }
        }
        if (ends < 0 && !ctx.memory.mercyCancelled) {
          if (ctx.tick >= Number(ctx.memory.mercyDeadline ?? -1)) {
            removeProtection(ctx);
            cooldown(ctx);
            return;
          }
          if (hasState(enemy, "displacementImmune") || self.action?.kind === "cast" || self.action?.kind === "dash") return;
          // Chains ground Urgot and interrupt another channel, but can wait out a cast/dash.
          delete self.forced;
          self.statuses = self.statuses.filter((s) => !(s.kind === "cc" && s.key === "airborne"));
          const endTick = ctx.tick + ticks(reel);
          ctx.memory.mercyEnds = endTick;
          ctx.memory.quietUntil = endTick;
          self.action = { kind: "channel", ability: "R2", startTick: ctx.tick, endTick, nextTick: Number.POSITIVE_INFINITY, intervalTicks: Number.POSITIVE_INFINITY };
          for (const s of enemy.statuses) if (s.memoKey?.startsWith(protection) || (s.kind === "cc" && s.key === "suppression" && s.source === self.side && s.ability === chains.key)) s.endTick = endTick + 1;
          ctx.log("Mercy reels in the target");
        }
        const endTick = Number(ctx.memory.mercyEnds ?? -1);
        if (endTick >= 0 && ctx.tick >= endTick) {
          removeProtection(ctx);
          if (!ctx.memory.mercyCancelled) ctx.apply({ type: "execute", threshold: flat(Number.MAX_SAFE_INTEGER), minimumHealthFloor: executeFloor });
          cooldown(ctx);
          return;
        }
        if (endTick >= 0 && !ctx.memory.mercyCancelled) {
          const gap = Math.max(0, Math.abs(enemy.x - self.x) - self.spec.base.pathingRadius - enemy.spec.base.pathingRadius);
          enemy.forced = { endTick: ctx.tick + 2, perTick: -gap / Math.max(1, endTick - ctx.tick) };
        }
        return;
      }
      const chain = Number(ctx.memory.mercyChain ?? -1);
      if (chain >= 0) {
        // A wall, vanished/dead target, or failed attachment ends the effect's cooldown hold.
        if (!ctx.world.missiles.some((m) => m.id === chain)) cooldown(ctx);
        return;
      }
      const until = Number(ctx.memory.leashUntil ?? -1);
      if (until < 0) return;
      if ((ctx.memory.mercyArmed && below(enemy)) || ctx.tick >= until) {
        if (!below(enemy) || !launchMercy(ctx)) cooldown(ctx);
      }
    };

    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const mercy = self.spec.abilities.find((a) => a.key === "R2");
      if (mercy && leashed(self, world.tick) && below(enemy) && canCast(world, self, mercy)) return { kind: "cast", ability: "R2" };
      return defaultBehavior(view);
    };

    return {
      behavior,
      budget: {
        attacks: false,
        damage: (self, target) => {
          const d = derive(self);
          const bolts = purgeSpeed * (purgeShot.base + (purgeShot.ratios?.AD ?? 0) * d.ad);
          const legs = (legAD * d.ad + legHealth * derive(target).maxHp) / (legCooldown / legsFacing);
          return { physical: bolts + legs };
        },
      },
      start: [
        { type: "state", state: "noAttacks", duration: FOREVER },
        innateStat("moveSpeedFlat", -purgeSlowdown),
        innateStat("slowResist", purgeSlowResist),
      ],
      hooks: {
        onTick(ctx) {
          updateMercy(ctx);
          const self = ctx.self;
          const enemy = ctx.enemy;
          const dashing = self.action?.kind === "dash" && self.action.ability === "E";
          if (dashing || ctx.tick < Number(ctx.memory.quietUntil ?? -1) || ctx.tick < Number(ctx.memory.purgeReady ?? 0)) return;
          if (!enemy.alive || enemy.hp <= 0 || !firing(self) || isUntargetable(enemy, self)) return;
          if (Math.abs(self.x - enemy.x) - enemy.spec.base.radius > purgeRange) return;
          ctx.memory.purgeReady = ctx.tick + Math.round(30 / purgeSpeed);
          shoot(ctx);
        },
        onCastStart(ctx) {
          // Purge holds its fire from the cast on: Corrosive Charge's pause comes after its cast time.
          const key = ctx.ability.key;
          if (key === "R2") return; // An early recast only arms; Purge pauses when chains launch.
          const pause = key === "Q" ? ctx.ability.castTime + (quiet.Q ?? 0) : quiet[key];
          if (pause !== undefined) ctx.memory.quietUntil = Math.max(Number(ctx.memory.quietUntil ?? -1), ctx.tick + ticks(pause));
        },
        onCast(ctx) {
          if (ctx.ability.key !== "R2") return;
          if (below(ctx.enemy)) launchMercy(ctx);
          else ctx.memory.mercyArmed = true;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === chains.key) {
            ctx.memory.mercyChain = -1;
            if (ctx.self.hp <= 0 || !ctx.enemy.alive || ctx.enemy.hp <= 0 || ctx.enemy.fallen || hasState(ctx.enemy, "ccImmune")) { cooldown(ctx); return; }
            // A parry, immunity or one-shot negation must genuinely allow suppression to
            // take hold; retrying its application here would consume an immunity twice.
            if (!ctx.enemy.statuses.some((s) => s.kind === "cc" && s.key === "suppression" && s.source === ctx.self.side && s.ability === chains.key)) { cooldown(ctx); return; }
            ctx.memory.mercyAttached = true;
            ctx.memory.mercyCancelled = false;
            ctx.memory.mercyEnds = -1;
            ctx.memory.mercyDeadline = ctx.tick + ticks(displacementWait);
            // This granted untargetability must not destroy missiles already in flight.
            for (const state of ["untargetable", "invulnerable"]) addStatus(ctx.enemy, {
              kind: "state", key: state, source: ctx.self.side, startTick: ctx.tick,
              endTick: ctx.tick + ticks(displacementWait + reel), value: 0, memoKey: protection + state,
            });
            updateMercy(ctx);
            return;
          }
          if (ctx.ability.key !== "R") return;
          // The leash: slowed by up to 75%, the more health the target is missing.
          const missing = 1 - ctx.enemy.hp / derive(ctx.enemy).maxHp;
          ctx.memory.leashUntil = ctx.tick + ticks(leash);
          ctx.memory.mercyChain = -1;
          ctx.memory.mercyAttached = false;
          ctx.memory.mercyArmed = false;
          // A hit holds the first cast's cooldown until the leash/execute effect ends.
          ctx.self.cooldownReady.R = Number.POSITIVE_INFINITY;
          ctx.apply({ type: "cc", cc: "slow", strength: slowMax * Math.min(1, missing / slowFull), duration: leash });
          if (below(ctx.enemy)) launchMercy(ctx);
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          delivery: { kind: "circle", range: q.field("targetRange"), radius: q.field("effectRadius"), delay: chargeDelay },
          onHit: [
            { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
            { type: "cc", cc: "slow", strength: q.fraction("Slow"), duration: q.quoted("slow them for 1.25 seconds", 0) },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          // The shield goes up as the cast starts; the dash follows.
          onCastStart: [{ type: "shield", amount: e.formula("Shield Strength"), duration: e.quoted("Urgot grants himself a shield for 4 seconds", 0) }],
          delivery: { kind: "dash", direction: "toward", distance: e.field("targetRange", "Minimum range"), speed: e.field("speed") + (kit.champion.forms[0]?.stats.moveSpeed ?? 330) - purgeSlowdown, hitRadius: 50 },
          onHit: [
            { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
            { type: "cc", cc: "stun", duration: e.quoted("stunning them for 1.5 seconds", 0) },
          ],
          flags: { grounded: true, knockdown: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          delivery: { kind: "line", range: r.field("targetRange"), width: r.field("width"), speed: r.field("speed") },
          onHit: [{ type: "damage", damageType: "physical", amount: r.formula("Physical Damage") }],
          flags: { projectile: true },
        },
        {
          key: "R2",
          name: `${r.name} (Mercy)`,
          slot: "R",
          cooldown: 0,
          castTime: 0,
          usable: (unit, world) => {
            const enemy = world.units[unit.side === 0 ? 1 : 0];
            return unit.hp > 0 && enemy.alive && enemy.hp > 0 && !enemy.fallen && leashed(unit, world.tick) &&
              !unit.memory.mercyAttached && Number(unit.memory.mercyChain ?? -1) < 0 && !unit.memory.mercyArmed && !externalUntargetability(unit, enemy);
          },
          delivery: { kind: "self" },
          channel: { duration: reel, interruptible: false, mobile: true, manualStart: true },
          roles: ["finisher"],
          flags: { usableWhileDisabled: true, spellShield: false, projectile: true },
        },
        chains,
      ],
    };
  },
};

export default urgot;
