/** Singed: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { abilityReady, attackRange, canCast, canStartAttack, inAttackRange, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior, react } from "../../engine/sim/behavior";
import { abilityOf } from "../../engine/sim/forms";
import { canAttack, canMove, derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { fieldAt, flat, scaled, ticks } from "./util";

const singed: KitModule = {
  champion: "Singed",
  build(kit) {
    const innate = kit.ability("Noxious Slipstream");
    const q = kit.ability("Poison Trail");
    const w = kit.ability("Mega Adhesive");
    const e = kit.ability("Fling");
    const r = kit.ability("Insanity Potion");

    // Noxious Slipstream: passing near a champion gives a burst of speed, once every 8 seconds per champion.
    const slipReach = innate.field("effectRadius");
    const slipSeconds = innate.quoted("he gains a stack of Noxious Slipstream for 2 seconds", 0);
    const slipSpeed = innate.quoted("For each stack, Singed gains 25% bonus movement speed", 0) / 100;
    const slipEvery = innate.field("targetCooldown");

    // Poison Trail: on for the whole fight, leaving clouds that poison enemies inside them.
    const cloudSeconds = q.quoted("Singed continually creates a toxic cloud in his wake that lingers for 3.25 seconds", 0);
    const cloudRadius = q.field("effectRadius");
    const poisonEvery = q.quoted("The target takes magic damage every 0.25 seconds over 2 seconds", 0);
    const poisonSeconds = q.quoted("The target takes magic damage every 0.25 seconds over 2 seconds", 1);
    const poisonTick = q.formula("Magic Damage per Tick");
    const poisonPerSecond = q.formula("Magic Damage per Second");
    const trailCost = q.cost();
    // Clouds every 90 units walked, on top of him; when he barely moves, one every second just in front.
    const spawnStep = q.quoted("If Singed has moved fewer than 90 units since spawning the last poison cloud, it will spawn 35 units in front of him", 0);
    const spawnAhead = q.quoted("If Singed has moved fewer than 90 units since spawning the last poison cloud, it will spawn 35 units in front of him", 1);
    const spawnIdle = q.quoted("They also only spawn every 1 second in this case", 0);
    q.quote("When Poison Trail's debuff is applied instead of refreshed, the target is dealt one additional instance of the debuff at the same time as the application");
    const poison: Effect = { type: "dot", damageType: "magic", total: scaled(poisonTick, poisonSeconds / poisonEvery), duration: poisonSeconds, interval: poisonEvery };
    kit.assume("Poison Trail is on from the start of every fight.");

    // Mega Adhesive: lands after a delay, grounding and slowing enemies inside; neither can be cleansed by most cleanses.
    const gooDelay = w.quoted("lands at the target location after 0.375 seconds", 0);
    const gooSeconds = w.quoted("creating a field for 3 seconds", 0);
    w.quote("Mega Adhesive's slow and ground debuffs are each marked as non-dispellable");
    const gooEvery = 0.25;
    const goo: Effect[] = [
      { type: "cc", cc: "slow", strength: w.fraction("Slow"), duration: gooEvery + 0.05, sticky: true },
      { type: "cc", cc: "ground", duration: gooEvery + 0.05, sticky: true },
    ];
    kit.assume(`Mega Adhesive's slow and ground are renewed every ${gooEvery} s while the enemy is inside.`);

    // Fling: over Singed's head; rooted on landing in Mega Adhesive.
    const flingDistance = e.quoted("Singed flings the target enemy 550 units over himself over 0.693", 0);
    const flingSeconds = e.quoted("Singed flings the target enemy 550 units over himself over 0.693", 1);
    const rootSeconds = e.number("Root Duration");
    const flingRange = e.field("targetRange");
    e.quote("Slow-immune enemies will not be rooted when flung into Mega Adhesive");
    kit.assume("Singed throws Mega Adhesive where Fling will land the enemy, then flings it in; otherwise he saves Mega Adhesive while Fling is ready.");

    // Insanity Potion: stats and regeneration for 25 seconds; the poison also applies Grievous Wounds.
    const potionSeconds = r.quoted("Singed empowers himself for 25 seconds", 0);
    const potionStats = r.number("Bonus Stats");
    const potionRegen = r.number("HP/Mana Regenerated per 0.5 Seconds");
    const regenEvery = r.quoted("HP/Mana Regenerated per 0.5 Seconds", 0);
    const woundsFor = r.quoted("Poison Trail additionally applies Grievous Wounds for 1 second", 0);
    const woundsEvery = r.quoted("which refreshes every 0.25 seconds while the poison persists", 0);

    const potion = (unit: Unit, tick: number) => tick < Number(unit.memory.potionUntil ?? -1);
    const poisoned = (enemy: Unit, side: number) => enemy.statuses.some((s) => s.kind === "dot" && s.key === "Q" && s.source === side);
    /** Mega Adhesive fields on the ground now. */
    const gooAt = (world: World, side: number, x: number, radius: number) =>
      world.zones.some((z) => z.owner === side && z.kind === "field" && z.ability === "W" && z.startTick <= world.tick && world.tick < z.endTick && Math.abs(x - z.x) <= z.radius + radius);

    const spawnCloud = (ctx: HookContext) => {
      const self = ctx.self;
      const lastX = Number(ctx.memory.cloudX ?? Number.NaN);
      const lastTick = Number(ctx.memory.cloudTick ?? Number.NEGATIVE_INFINITY);
      let x: number | undefined;
      if (!Number.isFinite(lastX) || Math.abs(self.x - lastX) >= spawnStep) x = self.x;
      else if (ctx.tick - lastTick >= ticks(spawnIdle)) {
        // In front of him: the way he is walking, or else toward the enemy.
        const toward = ctx.enemy.x >= self.x ? 1 : -1;
        x = self.x + (self.moved === -1 ? -toward : toward) * spawnAhead;
      }
      if (x === undefined) return;
      ctx.memory.cloudX = self.x;
      ctx.memory.cloudTick = ctx.tick;
      fieldAt(ctx, "Q", x, cloudRadius, cloudSeconds, poisonEvery, [poison]);
    };

    // Against a melee enemy that can't outrun him, Singed stays just out of its reach so it chases him through the poison.
    const kiteMargin = 75;
    const settleMargin = 15;
    kit.assume(
      `Against a melee enemy no faster than him, Singed runs ahead ${kiteMargin} units out of its attack range, so it walks through the poison, and attacks only while it can't hit back; he comes back to ${settleMargin} units out of its reach while it can't move.`,
    );
    const outruns = (self: Unit, enemy: Unit) => !enemy.spec.attack.ranged && derive(self).moveSpeed >= derive(enemy).moveSpeed;

    const behavior: Behavior = (view) => {
      const { world, self, enemy, mode } = view;
      const find = (key: string) => self.spec.abilities.find((a) => a.key === key);
      const fling = find("E");
      const adhesive = find("W");
      const insanity = find("R");
      if (mode === "flee" && insanity && canCast(world, self, insanity)) return { kind: "cast", ability: "R" };
      if (mode !== "fight" && mode !== "trade") return defaultBehavior(view);
      if (fling && canCast(world, self, fling, true)) {
        // Fling's range is centered: walk right up to the enemy.
        if (!canCast(world, self, fling)) return self.action || !canMove(self) ? defaultBehavior(view) : { kind: "move", direction: 1 };
        // Mega Adhesive first, where the enemy will land behind him.
        if (adhesive && canCast(world, self, adhesive) && !self.action) {
          const behind = Math.max(0, flingDistance - Math.abs(enemy.x - self.x));
          return { kind: "cast", ability: "W", aim: { direction: -1, distance: behind } };
        }
        return { kind: "cast", ability: "E" };
      }
      if (mode !== "fight" || !enemy.alive || !outruns(self, enemy) || self.action) return defaultBehavior(view);
      const reaction = react(view);
      if (reaction) return reaction;
      // Running the enemy through the poison, out of reach of its attacks and of what it is channeling around itself.
      const radii = self.spec.base.radius + enemy.spec.base.radius;
      const channel = enemy.action?.kind === "channel" ? abilityOf(enemy, enemy.action.ability)?.channel : undefined;
      const reach = Math.max(attackRange(enemy) + radii, (channel?.range ?? 0) + self.spec.base.radius);
      if (insanity && canCast(world, self, insanity) && view.distance <= attackRange(enemy) + 500) return { kind: "cast", ability: "R" };
      if (adhesive && canCast(world, self, adhesive) && inReach(adhesive, self, enemy)) return { kind: "cast", ability: "W" };
      if (!canAttack(enemy) && inAttackRange(self, enemy) && canStartAttack(world, self)) return { kind: "attack" };
      const gap = Math.abs(enemy.x - self.x);
      const margin = canMove(enemy) ? kiteMargin : settleMargin;
      if (gap < reach + margin) return { kind: "move", direction: -1 };
      if (gap > reach + margin + 40) return { kind: "move", direction: 1 };
      return { kind: "move", direction: 0 };
    };

    const flingReady = (unit: Unit, world: World) => {
      const fling = unit.spec.abilities.find((a) => a.key === "E");
      return fling !== undefined && abilityReady(world, unit, fling);
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.field("staticCooldown"),
        castTime: 0,
        delivery: { kind: "self" },
        // A toggle kept on all fight (see the hooks): never cast.
        usable: () => false,
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "field", range: w.field("targetRange"), radius: w.field("effectRadius"), duration: gooSeconds, interval: gooEvery, delay: gooDelay },
        onHit: goo,
        // Saved for Fling while it is ready, unless the enemy is already in its reach or Singed is getting away.
        usable: (unit, world) => {
          const enemy = world.units[unit.side === 0 ? 1 : 0];
          return world.modes[unit.side] === "flee" || !flingReady(unit, world) || Math.abs(enemy.x - unit.x) <= flingRange;
        },
        flags: { projectile: w.flag("projectile") ?? true, spellShield: w.flag("spellShield") ?? false },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        delivery: { kind: "target", range: flingRange },
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
          { type: "displace", direction: "toward", distance: flingDistance, duration: flingSeconds, over: true },
        ],
        flags: { spellShield: e.flag("spellShield") ?? true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: 0,
        delivery: { kind: "self" },
        onSelf: [
          { type: "stat", stat: "AP", amount: flat(potionStats), duration: potionSeconds },
          { type: "stat", stat: "armor", amount: flat(potionStats), duration: potionSeconds },
          { type: "stat", stat: "MR", amount: flat(potionStats), duration: potionSeconds },
          { type: "stat", stat: "moveSpeedFlat", amount: flat(potionStats), duration: potionSeconds },
        ],
        roles: ["buff"],
      },
    ];

    return {
      behavior,
      abilities,
      budget: {
        // The poison, on the enemy all fight long.
        damage: (self, target) => ({ magic: evaluate(poisonPerSecond, self, target) }),
        // Insanity Potion's regeneration through an all-in.
        healing: () => potionRegen / regenEvery,
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Poison Trail: on until the mana runs out.
          if (!ctx.memory.trailOff) {
            const cost = trailCost / 30;
            if (self.resource + 1e-9 < cost) ctx.memory.trailOff = true;
            else {
              self.resource -= cost;
              spawnCloud(ctx);
            }
          }
          // Noxious Slipstream, walking past the enemy.
          const near = Math.abs(ctx.enemy.x - self.x) - ctx.enemy.spec.base.radius <= slipReach;
          if (near && self.moved !== 0 && ctx.tick >= Number(ctx.memory.slipReady ?? 0)) {
            ctx.memory.slipReady = ctx.tick + ticks(slipEvery);
            ctx.buff("slipstream", "moveSpeedPercent", slipSpeed, slipSeconds);
          }
          // Fling's landing: rooted in Mega Adhesive.
          if (ctx.tick === Number(ctx.memory.flingLands ?? -1)) {
            const enemy = ctx.enemy;
            if (gooAt(ctx.world, self.side, enemy.x, enemy.spec.base.radius) && !hasState(enemy, "slowImmune")) {
              ctx.apply({ type: "cc", cc: "root", duration: rootSeconds });
            }
          }
          // Insanity Potion: regeneration, and Grievous Wounds with the poison.
          if (potion(self, ctx.tick)) {
            const since = ctx.tick - Number(ctx.memory.potionStart);
            if (since > 0 && since % ticks(regenEvery) === 0) {
              ctx.regenerate(potionRegen);
              self.resource = Math.min(derive(self).maxResource, self.resource + potionRegen);
            }
            if (since % ticks(woundsEvery) === 0 && poisoned(ctx.enemy, self.side)) ctx.apply({ type: "grievousWounds", duration: woundsFor });
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.potionStart = ctx.tick;
            ctx.memory.potionUntil = ctx.tick + ticks(potionSeconds);
          }
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "E") ctx.memory.flingLands = ctx.tick + ticks(flingSeconds);
          if (ctx.ability.key !== "Q") return;
          // A fresh poisoning deals one more instance at once.
          const until = Number(ctx.memory.poisonUntil ?? -1);
          if (ctx.tick >= until) ctx.apply({ type: "damage", damageType: "magic", amount: poisonTick, label: q.name });
          const dot = ctx.enemy.statuses.find((s) => s.kind === "dot" && s.key === "Q" && s.source === ctx.self.side);
          ctx.memory.poisonUntil = dot ? dot.endTick : ctx.tick;
        },
      },
    };
  },
};

export default singed;
