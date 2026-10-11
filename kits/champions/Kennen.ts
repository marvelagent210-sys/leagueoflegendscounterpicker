/** Kennen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { derive, evaluate } from "../../engine/sim/derived";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, flat, ticks } from "./util";

const SURGE = "Electrical Surge";

const kennen: KitModule = {
  champion: "Kennen",
  build(kit) {
    const innate = kit.ability("Mark of the Storm");
    const q = kit.ability("Thundering Shuriken");
    const w = kit.ability("Electrical Surge");
    const e = kit.ability("Lightning Rush");
    const r = kit.ability("Slicing Maelstrom");

    // Mark of the Storm: three stacks stun and restore energy; a second stun within 6 seconds is shorter.
    const markSeconds = innate.quoted("apply a stack of Mark of the Storm to enemies hit for 6 seconds", 0);
    const markMax = innate.quoted("stacking up to 3 times", 0);
    const stun = innate.quoted("consumes them all to stun them for 1.25 seconds and restore 25 energy", 0);
    const markEnergy = innate.quoted("consumes them all to stun them for 1.25 seconds and restore 25 energy", 1);
    const repeatStun = innate.quoted("The stun duration is reduced to 0.5 seconds if this occurs on the same target again within 6 seconds", 0);
    const repeatWithin = innate.quoted("The stun duration is reduced to 0.5 seconds if this occurs on the same target again within 6 seconds", 1);
    const stormImmunity = innate.quoted("the target gains a 6-second stack immunity against Slicing Maelstrom", 0);

    // Electrical Surge: every fifth basic attack deals bonus magic damage, crits for 140%, and marks.
    const surgeEvery = w.quoted("stacking up to 4 times", 0);
    const surgeBonus = w.formula("Bonus Magic Damage");
    const surgeCrit = w.quoted("This damage can critically strike for 140% damage", 0) / 100;
    w.quote("Kennen gains maximum stacks of Electrical Surge upon respawning");
    kit.assume("Kennen starts every fight with a full Electrical Surge, as he does after respawning.");
    const surgeRange = w.field("effectRadius");

    // Lightning Rush: two seconds as lightning, then bonus attack speed.
    const rushSeconds = e.quoted("Kennen turns into lightning for 2 seconds", 0);
    const rushSpeed = e.quoted("gaining ghosting and 100% bonus movement speed", 0) / 100;
    const rushEnergy = e.quoted("restores 40 energy upon damaging at least one enemy", 0);
    const rushRecastAfter = e.quoted("Lightning Rush can be recast after 0.5 seconds", 0);
    const rushAttackSpeed = e.fraction("Bonus Attack Speed");
    const rushAttackFor = e.quoted("exceed the attack speed cap by the amount gained for 4 seconds", 0);
    const rushRadius = e.field("effectRadius");
    // Running at twice his speed, as far as the rush takes him through the enemy.
    const rushDistance = Math.round(kit.champion.forms[0]?.stats.moveSpeed ?? 335) * (1 + rushSpeed) * 1;
    kit.assume(`Lightning Rush runs ${Math.round(rushDistance)} units through the enemy (1 s at twice his base speed), then its recast gives the attack speed; fleeing, it runs the full 2 s away.`);
    kit.assume("Lightning Rush's recast lets attack speed exceed the cap; the simulator's cap still applies (it rarely binds at level 20).");

    // Slicing Maelstrom: a storm around Kennen striking every 0.5 seconds, each strike 10% stronger.
    const stormSeconds = r.quoted("Kennen summons a storm around himself for 3 seconds", 0);
    const boltEvery = r.quoted("strikes lightning bolts down on nearby enemies every 0.5 seconds", 0);
    const bolt = r.formula("Magic Damage Per Bolt");
    const boltStep = r.quoted("gains 10% additional damage for each subsequent strike a target has received", 0) / 100;
    const boltCap = r.quoted("up to a combined total of 150% of the initial strike's damage", 0) / 100;
    const stormResists = r.number("Bonus Resistances");
    const stormCast = r.castTime();
    r.quote("Kennen can move during Slicing Maelstrom's cast time");

    const markEffect = (key: string): Effect => ({ type: "mark", key, duration: 0.1 });

    /** A Mark of the Storm stack on the enemy; Slicing Maelstrom's are limited. */
    const addMark = (ctx: HookContext, fromStorm: boolean) => {
      const now = ctx.tick;
      if (fromStorm) {
        if (now < Number(ctx.memory.stormImmuneUntil ?? -1)) return;
        const fromThis = Number(ctx.memory.stormStacks ?? 0) + 1;
        ctx.memory.stormStacks = fromThis;
        if (fromThis >= markMax) ctx.memory.stormImmuneUntil = now + ticks(stormImmunity);
      }
      const live = now < Number(ctx.memory.markUntil ?? -1) ? Number(ctx.memory.marks ?? 0) : 0;
      const marks = live + 1;
      ctx.memory.markUntil = now + ticks(markSeconds);
      if (marks < markMax) {
        ctx.memory.marks = marks;
        return;
      }
      ctx.memory.marks = 0;
      const repeat = now - Number(ctx.memory.lastStun ?? -1e9) <= ticks(repeatWithin);
      ctx.memory.lastStun = now;
      ctx.apply({ type: "cc", cc: "stun", duration: repeat ? repeatStun : stun });
      ctx.apply({ type: "resource", amount: flat(markEnergy) }, true);
    };

    const marked = (unit: Unit, tick: number) => tick < Number(unit.memory.markUntil ?? -1) && Number(unit.memory.marks ?? 0) > 0;
    const stormUp = (unit: Unit, tick: number) => tick < Number(unit.memory.stormUntil ?? -1);

    const surge: Effect = {
      type: "empower",
      attacks: 1,
      window: FOREVER,
      onHit: [{ type: "damage", damageType: "magic", amount: surgeBonus, canCrit: true, critMultiplier: surgeCrit, label: SURGE }],
    };

    const boltDamage = (caster: Unit, target: Unit, strike: number) => evaluate(bolt, caster, target) * Math.min(boltCap, 1 + boltStep * strike);

    const rushHit: Effect[] = [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }];
    const rushRecast: AbilitySpec = {
      key: "E2",
      name: `${e.name} (recast)`,
      slot: "E",
      cooldown: 0,
      castTime: 0,
      delivery: { kind: "self" },
      chain: { root: "E", index: 2, window: rushSeconds, delay: rushRecastAfter, auto: true },
      onSelf: [{ type: "stat", stat: "attackSpeed", amount: flat(rushAttackSpeed), duration: rushAttackFor }],
      flags: { usableWhileDisabled: true },
      roles: ["buff"],
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        delivery: { kind: "line", range: q.field("targetRange"), width: q.field("width"), speed: q.field("speed") },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }],
        flags: { projectile: q.flag("projectile") ?? true },
        // Its Mark of the Storm builds toward a stun.
        decisive: true,
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: w.castTime(),
        delivery: { kind: "aura", radius: surgeRange },
        onHit: [{ type: "damage", damageType: "magic", amount: w.formula("Magic Damage") }],
        // Only an enemy carrying Mark of the Storm, or inside the storm, can be struck.
        usable: (unit, world) => marked(unit, world.tick) || stormUp(unit, world.tick),
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: 0,
        chainCooldown: "last",
        delivery: { kind: "dash", direction: "toward", distance: rushDistance, speed: rushDistance, hitRadius: rushRadius, through: true },
        onHit: rushHit,
        // Unable to attack while lightning: until the recast.
        onSelf: [{ type: "state", state: "ghosted", duration: rushSeconds }, { type: "state", state: "noAttacks", duration: rushSeconds }],
        flags: { knockdown: true },
      },
      rushRecast,
      {
        key: "E3",
        name: `${e.name} (away)`,
        slot: "E",
        cooldownKey: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: 0,
        delivery: { kind: "dash", direction: "away", distance: rushDistance * (rushSeconds / 1), speed: rushDistance },
        onSelf: [{ type: "state", state: "ghosted", duration: rushSeconds }, { type: "state", state: "noAttacks", duration: rushSeconds }],
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        castTime: stormCast,
        moveWhileCasting: true,
        delivery: { kind: "field", range: 0, radius: r.field("effectRadius"), duration: stormSeconds, interval: boltEvery, attached: true },
        onHit: [markEffect("maelstrom")],
        onSelf: [
          { type: "stat", stat: "armor", amount: flat(stormResists), duration: stormSeconds },
          { type: "stat", stat: "MR", amount: flat(stormResists), duration: stormSeconds },
        ],
        estimate: (caster, target) => boltDamage(caster, target, Number(caster.memory.stormStrikes ?? 0)),
        roles: ["damage", "cc"],
      },
    ];

    const rCooldown = r.cooldown();
    const surgeCycle = surgeEvery + 1;
    const totalStorm: Formula = r.formula("Total Single-Target Damage");

    return {
      abilities,
      budget: {
        damage: (self, target) => {
          const d = derive(self);
          // Every fifth attack carries the surge; the storm once per cooldown.
          const surgeHit = evaluate(surgeBonus, self, target) * (1 + d.critChance * (surgeCrit - 1));
          return { magic: (surgeHit * d.attackSpeed) / surgeCycle + evaluate(totalStorm, self, target) / cooldownAfterHaste(rCooldown, d.abilityHaste) };
        },
      },
      hooks: {
        onStart(ctx) {
          ctx.memory.surges = surgeEvery;
          ctx.apply(surge, true);
        },
        onAttack(ctx) {
          const action = ctx.self.action;
          const empowered = action?.kind === "windup" && action.onHit.some((h) => h.type === "damage" && h.label === SURGE);
          if (empowered) {
            ctx.memory.surgePending = true;
            ctx.memory.surges = 0;
            return;
          }
          const surges = Number(ctx.memory.surges ?? 0) + 1;
          ctx.memory.surges = surges;
          if (surges >= surgeEvery) ctx.apply(surge, true);
        },
        onAttackHit(ctx) {
          if (!ctx.memory.surgePending) return;
          ctx.memory.surgePending = false;
          addMark(ctx, false);
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") {
            ctx.memory.stormUntil = ctx.tick + ticks(stormSeconds);
            ctx.memory.stormStrikes = 0;
            ctx.memory.stormStacks = 0;
          }
          if (ctx.ability.key === "E") ctx.memory.rushHit = false;
          // The recast ends the rush: attacks are back.
          if (ctx.ability.key === "E2") ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "noAttacks" && s.ability === "E"));
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "R") {
            const strike = Number(ctx.memory.stormStrikes ?? 0);
            ctx.memory.stormStrikes = strike + 1;
            ctx.apply({ type: "damage", damageType: "magic", amount: flat(boltDamage(ctx.self, ctx.enemy, strike)), label: r.name });
            addMark(ctx, true);
            return;
          }
          if (key === "E") {
            if (ctx.memory.rushHit) return;
            ctx.memory.rushHit = true;
            ctx.apply({ type: "resource", amount: flat(rushEnergy) }, true);
          }
          if (key === "Q" || key === "W" || key === "E") addMark(ctx, false);
        },
      },
    };
  },
};

export default kennen;
