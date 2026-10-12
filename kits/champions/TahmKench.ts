/** Tahm Kench: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import { type Unit, type World, other } from "../../engine/sim/state";
import { flat, hasOwn, maxHp, ticks } from "./util";

const tahmKench: KitModule = {
  champion: "TahmKench",
  build(kit) {
    const taste = kit.ability("An Acquired Taste");
    const q = kit.ability("Tongue Lash");
    const w = kit.ability("Abyssal Dive");
    const e = kit.ability("Thick Skin");
    const r = kit.ability("Devour");
    const spit = kit.ability("Regurgitate");

    // An Acquired Taste: attacks on-hit and Tongue Lash deal bonus magic damage and stack (5 s, up to 3).
    const tasteDamage: Formula = {
      base: taste.levelValue("are empowered to deal"),
      ratios: { bonusHP: taste.quoted("(+ 1.25% AP per 100 bonus health) (+ 4% of his bonus health)", 2) / 100 },
      products: [{ ratio: taste.quoted("(+ 1.25% AP per 100 bonus health)", 0) / 100 / taste.quoted("(+ 1.25% AP per 100 bonus health)", 1), stats: ["AP", "bonusHP"] }],
    };
    const stacking = "against enemy champions for 5 seconds, refreshing on subsequent hits and stacking up to 3 times";
    const tasteSeconds = taste.quoted(stacking, 0);
    const tasteMax = taste.quoted(stacking, 1);
    const fadeEvery = taste.quoted("Stacks expire one by one every 0.67 seconds when the duration ends", 0);
    taste.quote("Tongue Lash and Devour gain additional effects against enemies with 3 stacks, consuming them all");
    taste.quote("When An Acquired Taste is applied by Tongue Lash, the damage is dealt as an additional instance of damage");
    kit.assume(`An Acquired Taste's stacks start falling off one every ${fadeEvery} s as its ${tasteSeconds} s run out; Tongue Lash and Devour use the stacks the enemy has before the hit.`);

    // Tongue Lash: damage, a slow and a heal; on 3 stacks, a stun.
    const lash = q.formulaPart("Magic Damage", ["AP"]);
    const lashSlow = q.quoted("slows them by 50% for 2 seconds", 0) / 100;
    const lashSlowFor = q.quoted("slows them by 50% for 2 seconds", 1);
    const lashStun = q.quoted("The target is stunned for 1.5 seconds", 0);
    const lashSpeed = q.field("speed");
    const lashRange = q.field("range");
    q.quote("Tahm Kench is unable to move, attack, or cast Abyssal Dive or Devour on a different target while his tongue is in flight");

    // Abyssal Dive: a 1.35 s channel, then a blink 0.15 s later that knocks up and stuns around him; refunds on a champion hit.
    const diveChannel = w.quoted("Tahm Kench channels for 1.35 seconds as he dives into the waters", 0);
    const diveDelay = w.quoted("blinks to the target location after a 0.15-second delay", 0);
    const diveHold = w.quoted("dealing magic damage to nearby enemies and knocking them up and stunning them for 1 second", 0);
    const diveSeen = w.quoted("Enemies can see the indicator for Tahm Kench's destination after he has channeled for 0.75 seconds", 0);
    const diveLock = w.quoted("Tahm Kench remains unable to act for 0.65 seconds after the blink", 0);
    const diveManaBack = w.quoted("40% of Abyssal Dive's mana cost as well as a percentage of its cooldown are refunded", 0) / 100;
    const [diveRadius = 275] = w.fieldValues("effectRadius");
    const diveCost = w.cost();
    const diveRange = w.field("targetRange");

    // Thick Skin: 47% of the damage taken is stored as grey health; the active turns it into a shield for 2.5 s.
    const stored = e.fraction("Damage Stored into Grey Health");
    const storedCap = e.quoted("He can store up to 300% of his maximum health", 0) / 100;
    const restoreShare = e.levelValue("to restore") / 100;
    const restoring = "healing for 10% of his maximum health every 0.264";
    const restoreStep = e.quoted(restoring, 0) / 100;
    const restoreEvery = e.quoted(restoring, 1);
    const quietFor = e.quoted("and after 4 seconds without taking damage", 0);
    const skinSeconds = e.quoted("Tahm Kench converts his current grey health into a shield that lasts for 2.5 seconds", 0);
    e.quote("increased while there are at least 2 nearby visible enemy champions either dead or alive");
    kit.assume(
      `Thick Skin stores ${stored * 100}% of the health Tahm Kench loses (a duel has one enemy champion), up to his missing health; he turns it into a shield once it reaches 15% of his maximum health, or at any amount below 35% health.`,
    );

    // Devour: on 3 stacks, the enemy is suppressed and carried for 3 s, then spat out for damage.
    const bellySeconds = r.quoted("swallowing them to carry them in his belly for up to 3 seconds", 0);
    const devourCast = r.castTime();
    const selfSlow = r.quoted("Tahm Kench will also be grounded and slowed by 40% under those same conditions", 0) / 100;
    const spitLock = spit.quoted("Tahm Kench is unable to act for 0.4 seconds after casting Regurgitate", 0);
    const spitDamage = spit.formula("Magic Damage");
    r.quote("Devour can only be cast on enemies with 3 stacks of An Acquired Taste");
    r.quote("After 1 second, Tahm Kench can cast Regurgitate while a target is inside of his belly, and automatically does so after the duration");
    kit.assume(
      `Devour holds the enemy the full ${bellySeconds} s (its suppression starts with the ${devourCast} s cast); the wiki gives no distance for Regurgitate's spit, so the enemy lands where it was and takes the damage then.`,
    );

    // An Acquired Taste's stacks on the enemy now: they fall off one by one once the duration ends.
    const stacksOf = (unit: Unit, world: World) => {
      const count = Number(unit.memory.taste ?? 0);
      const until = Number(unit.memory.tasteUntil ?? -1);
      if (world.tick < until) return count;
      return Math.max(0, count - 1 - Math.floor((world.tick - until) / ticks(fadeEvery)));
    };
    const addStack = (ctx: HookContext) => {
      ctx.memory.taste = Math.min(tasteMax, stacksOf(ctx.self, ctx.world) + 1);
      ctx.memory.tasteUntil = ctx.tick + ticks(tasteSeconds);
    };
    const locked = (unit: Unit, world: World) => world.tick < Number(unit.memory.lockedUntil ?? -1);
    const full = (unit: Unit, world: World) => stacksOf(unit, world) >= tasteMax;
    const grey = (unit: Unit) => Number(unit.memory.grey ?? 0);

    const lashHit: Effect[] = [
      { type: "damage", damageType: "magic", amount: lash },
      { type: "damage", damageType: "magic", amount: tasteDamage, label: taste.name },
      { type: "cc", cc: "slow", strength: lashSlow, duration: lashSlowFor },
      { type: "caster", effects: [{ type: "heal", amount: q.formula("Heal") }] },
    ];
    const lashSpec = (key: string, onFull: boolean): AbilitySpec => ({
      key,
      name: onFull ? `${q.name} (stun)` : q.name,
      slot: "Q",
      cooldownKey: "Q",
      cooldown: q.cooldown(),
      cost: q.cost(),
      castTime: q.castTime(),
      usable: (unit, world) => full(unit, world) === onFull,
      delivery: { kind: "line", range: lashRange, width: q.field("width"), speed: lashSpeed },
      onHit: onFull ? [...lashHit, { type: "cc", cc: "stun", duration: lashStun }] : lashHit,
      ...(onFull ? { decisive: true } : {}),
      flags: { projectile: q.flag("projectile") ?? true },
    });

    const abilities: AbilitySpec[] = [
      lashSpec("Q", false),
      lashSpec("Qstun", true),
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: diveCost,
        // The channel; crowd control breaks it, and its cooldown already runs.
        castTime: diveChannel,
        cooldownAtCastStart: true,
        interruptible: {},
        delivery: { kind: "circle", range: diveRange, radius: diveRadius, delay: diveDelay, centered: true, hidden: diveSeen },
        onHit: [
          { type: "damage", damageType: "magic", amount: w.formula("Magic Damage") },
          { type: "displace", direction: "away", distance: 0, duration: diveHold },
          { type: "cc", cc: "stun", duration: diveHold },
          // A share of its whole cooldown, and of its mana.
          { type: "caster", effects: [{ type: "refund", ability: "W", fraction: w.fraction("Cooldown Refund"), total: true }, { type: "resource", amount: flat(diveManaBack * diveCost) }] },
        ],
        roles: ["engage", "cc", "damage"],
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        castTime: e.castTime(),
        // The cooldown starts when the shield breaks or runs out (the lingering state, ended by the hooks).
        cooldownAfter: "state",
        usable: (unit) => grey(unit) > 0,
        delivery: { kind: "self" },
        // The shield, as large as the grey health, is in the hooks.
        onSelf: [{ type: "state", state: "lingering", duration: skinSeconds }],
        roles: ["defense"],
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        // The suppression starts with the cast, so it is part of the hold.
        castTime: 0,
        usable: (unit, world) => full(unit, world),
        delivery: { kind: "target", range: r.field("targetRange"), edge: true },
        onHit: [
          { type: "cc", cc: "suppression", duration: devourCast + bellySeconds },
          { type: "attach", offset: 0, duration: devourCast + bellySeconds },
          { type: "state", state: "untargetable", duration: devourCast + bellySeconds },
          { type: "state", state: "displacementImmune", duration: devourCast + bellySeconds },
          { type: "delayed", delay: devourCast + bellySeconds, effects: [{ type: "damage", damageType: "magic", amount: spitDamage, label: spit.name }] },
        ],
        roles: ["cc", "damage"],
        flags: { spellShield: r.flag("spellShield") ?? true },
      },
    ];
    const gated = abilities.map((a): AbilitySpec => ({ ...a, usable: (unit, world) => !locked(unit, world) && (a.usable?.(unit, world) ?? true) }));

    const behavior: Behavior = (view) => {
      const { world, self } = view;
      if (locked(self, world)) return { kind: "move", direction: 0 };
      if (!self.action) {
        // Three stacks: swallow if in reach, else the stunning lash.
        const devour = self.spec.abilities.find((a) => a.key === "R");
        if (devour && canCast(world, self, devour) && inReach(devour, self, view.enemy)) return { kind: "cast", ability: "R" };
        // Grey health into a shield.
        const skin = self.spec.abilities.find((a) => a.key === "E");
        const share = self.hp / maxHp(self);
        if (skin && canCast(world, self, skin) && (grey(self) >= 0.15 * maxHp(self) || share <= 0.35)) return { kind: "cast", ability: "E" };
      }
      return defaultBehavior(view);
    };

    const endSkin = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !((s.kind === "shield" && s.key === "E") || (s.kind === "state" && s.key === "lingering" && s.ability === "E")));
    };

    return {
      behavior,
      abilities: gated,
      attack: { onHit: [{ type: "damage", damageType: "magic", amount: tasteDamage, label: taste.name }] },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // Grey health is part of the missing health.
          const missing = maxHp(self) - self.hp;
          if (grey(self) > missing) ctx.memory.grey = Math.max(0, missing);
          // Thick Skin's shield broke: its cooldown starts.
          if (self.statuses.some((s) => s.kind === "state" && s.key === "lingering" && s.ability === "E") && !hasOwn(self, "shield", "E")) endSkin(ctx);
          // Out of combat with Thick Skin ready: grey health turns back into health, 10% of his maximum at a time.
          const skin = self.spec.abilities.find((a) => a.key === "E");
          const quiet = ctx.tick - Number(ctx.memory.hurtAt ?? -1e9) >= ticks(quietFor);
          if (skin && quiet && grey(self) > 0 && (self.cooldownReady.E ?? 0) <= ctx.tick && ctx.tick >= Number(ctx.memory.restoreAt ?? 0)) {
            const chunk = Math.min(grey(self), (restoreStep * maxHp(self)) / restoreShare);
            ctx.memory.grey = grey(self) - chunk;
            ctx.memory.restoreAt = ctx.tick + ticks(restoreEvery);
            ctx.apply({ type: "heal", amount: flat(chunk * restoreShare) }, true);
          }
        },
        onDamageTaken(ctx) {
          ctx.memory.hurtAt = ctx.tick;
          ctx.memory.grey = Math.min(storedCap * maxHp(ctx.self), grey(ctx.self) + stored * ctx.amount);
        },
        onAttackHit(ctx) {
          addStack(ctx);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q" || key === "Qstun") {
            // Unable to act while the tongue is out.
            const reach = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius);
            ctx.memory.lockedUntil = ctx.tick + Math.max(1, ticks(Math.min(reach, lashRange) / lashSpeed));
          }
          if (key === "W") {
            // Up from the water next to the enemy, then unable to act for a moment.
            ctx.apply({ type: "delayed", delay: diveDelay, effects: [{ type: "reposition", direction: "toward", distance: diveRange }] }, true);
            ctx.memory.lockedUntil = ctx.tick + ticks(diveDelay + diveLock);
            ctx.apply({ type: "state", state: "noAttacks", duration: diveDelay + diveLock }, true);
          }
          if (key === "E") {
            // The grey health becomes the shield.
            ctx.apply({ type: "shield", amount: flat(grey(ctx.self)), duration: skinSeconds }, true);
            ctx.memory.grey = 0;
          }
          if (key === "R") {
            // Grounded and slowed while the enemy is inside; spat out at the end, then a short lockout.
            const hold = devourCast + bellySeconds;
            ctx.apply({ type: "cc", cc: "ground", duration: hold }, true);
            ctx.apply({ type: "cc", cc: "slow", strength: selfSlow, duration: hold }, true);
            ctx.memory.lockedUntil = ctx.tick + ticks(devourCast);
            ctx.apply({ type: "delayed", delay: hold, effects: [{ type: "state", state: "noAttacks", duration: spitLock }] }, true);
            ctx.memory.spitLockAt = ctx.tick + ticks(hold);
          }
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") addStack(ctx);
          // Tongue Lash's stun and Devour use up the stacks.
          if (key === "Qstun" || key === "R") ctx.memory.taste = 0;
        },
      },
    };
  },
};

export default tahmKench;
