/** Aurora: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, missingShare, ticks } from "./util";

const aurora: KitModule = {
  champion: "Aurora",
  build(kit) {
    const innate = kit.ability("Spirit Abjuration");
    const q = kit.ability("Twofold Hex");
    const w = kit.ability("Across the Veil");
    const e = kit.ability("The Weirding");
    const r = kit.ability("Between Worlds");

    // Spirit Abjuration: every third damaging hit deals a share of maximum health and frees a Spirit that heals her.
    const stackSeconds = innate.quoted("apply a stack of Spirit Abjuration to enemies for 4 seconds", 0);
    const stacksToProc = innate.quoted("refreshing on subsequent applications and stacking up to 3 times", 0);
    const procShare = innate.quoted("equal to 1% (+ 2.7% per 100 AP) of the target's maximum health", 0) / 100;
    const procPerAp = innate.quoted("equal to 1% (+ 2.7% per 100 AP) of the target's maximum health", 1) / 100 / 100;
    const proc: Formula = { base: 0, ratios: { targetMaxHP: procShare }, products: [{ ratio: procPerAp, stats: ["AP", "targetMaxHP"] }] };
    const spiritHeal: Formula = {
      base: innate.levelValue("For each active Spirit, Aurora is healed for 3 – 20 (based on level)"),
      ratios: { AP: innate.quoted("(+ 2% AP) every second", 0) / 100 },
    };
    const maxSpirits = innate.quoted("Aurora may have up to 4 Spirits at a time", 0);
    innate.quote("freeing a Spirit from the target that follows her for the same duration");

    // Twofold Hex: a bolt that curses; the recast draws it back for more, up to half again on a hurt enemy.
    const curseSeconds = q.quoted("marks them with a curse for 3.5 seconds", 0);
    const recastAfter = q.quoted("Twofold Hex can be recast after 0.1 seconds while at least one target is marked", 0);
    const recastMin = q.formula("Minimum Magic Damage");
    const missingSeries = q.seriesIn("increased by 0 / 5 / 10 / 15 / 20 / 25 / 30 / 35 / 40 / 45 / 50");
    if (missingSeries.kind !== "variable") throw new Error("Aurora kit: Twofold Hex's missing-health bonus changed shape");
    const maxIncrease = Math.max(...missingSeries.values.map(Number)) / 100;
    const fullAt = Math.max(...missingSeries.points.map(Number)) / 100;
    const [boltSpeed = 1600] = q.fieldValues("speed");
    const recastDamage = (self: Unit, enemy: Unit) => evaluate(recastMin, self, enemy) * (1 + maxIncrease * Math.min(1, missingShare(enemy) / fullAt));

    // Across the Veil: a hop, then invisible and Realm Hopper (ghosted and faster).
    const [hop = 300] = w.fieldValues("range");
    const hopSpeed = w.field("speed");
    const veilSeconds = w.number("Invisibility Duration");
    const hopperSpeed = w.fraction("Bonus Movement Speed");
    const hopperSeconds = w.quoted("gains Realm Hopper for 4 seconds", 0);
    w.quote("Using a basic attack breaks the stealth at the end of the attack windup");

    // The Weirding: a blast and a recoil; its slow decays after 0.15 seconds.
    const blastSlow = e.quoted("slows them by 80% for 1 second decaying after the first 0.15 seconds", 0) / 100;
    const blastSlowFor = e.quoted("slows them by 80% for 1 second decaying after the first 0.15 seconds", 1);
    const blastSlowFull = e.quoted("slows them by 80% for 1 second decaying after the first 0.15 seconds", 2);
    const recoil = e.quoted("recoils 250 units in the opposite direction", 0);
    const recoilBase = e.field("speed");
    const recoilSpeed = recoilBase + 2 * (kit.champion.forms[0]?.stats.moveSpeed ?? 335);
    kit.assume(`The Weirding's slow is full for ${blastSlowFull} s, then decays and counts at half; its recoil goes at ${recoilBase} + 200% of Aurora's base movement speed.`);

    // Between Worlds: a leap, a shockwave 425 units ahead, Realm Hopper, and a rift that slows enemies crossing its border.
    const leapSeconds = r.quoted("Aurora leaps in the target direction with displacement immunity over 0.4 seconds", 0);
    const [leapMin = 25, leapMax = 250] = r.fieldNumbers("range");
    const waveAhead = r.quoted("unleashes a shockwave from 425 units in front of her", 0);
    const waveSeconds = r.quoted("expanding over 0.75 seconds", 0);
    const riftRadius = r.field("effectRadius");
    const waveSlow = r.quoted("slow them by 30% for 2 seconds", 0) / 100;
    const waveSlowFor = r.quoted("slow them by 30% for 2 seconds", 1);
    const riftSeconds = r.number("Rift Duration");
    const borderSlow = r.quoted("If an enemy collides with the border, they are slowed by 50% for a duration", 0) / 100;
    const borderSlowFor = r.number("Slow Duration");
    const ultHopper = r.number("Realm Hopper Duration");
    r.quote("The rift closes immediately if Aurora dies, enters resurrection, leaves the area, or is not within the area upon creation");
    kit.assume(
      `Between Worlds' leap (${leapMin} to ${leapMax} units, landing after its ${leapSeconds} s) goes toward or away from the enemy to put it ${waveAhead} units ahead, where the shockwave starts; the shockwave reaches ${riftRadius} units around that point, landing halfway through its ${waveSeconds} s expansion. Her own dash across the rift on touching its border is left out (on a line it would carry her past the enemy).`,
    );

    const realmHopper = (seconds: number): Effect[] => [
      { type: "state", state: "ghosted", duration: seconds },
      { type: "stat", stat: "moveSpeedPercent", amount: flat(hopperSpeed), duration: seconds },
    ];

    const abilities: AbilitySpec[] = [
      {
        key: "Q",
        name: q.name,
        slot: "Q",
        cooldown: q.cooldown(),
        cost: q.cost(),
        castTime: q.castTime(),
        chainCooldown: "first",
        delivery: { kind: "line", range: q.field("range"), width: q.fieldValues("width")[0] ?? 180, speed: boltSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: q.formula("Magic Damage") }],
        // The recast hangs on the curse.
        decisive: true,
        flags: { projectile: true, spellShield: q.flag("spellShield") ?? true },
      },
      {
        key: "Q2",
        name: `${q.name} (recast)`,
        slot: "Q",
        cooldown: 0,
        castTime: 0,
        chain: { root: "Q", index: 2, window: curseSeconds, delay: recastAfter, auto: true },
        usable: (unit, world) => world.tick < Number(unit.memory.curseUntil ?? -1),
        // The bolt flies back from the cursed enemy: it can't miss. Its damage, growing with missing health, comes from the hooks.
        delivery: { kind: "target", range: 100000 },
        onHit: [{ type: "mark", key: "hex", duration: 0.1 }],
        estimate: recastDamage,
        roles: ["damage"],
        flags: { usableWhileDisabled: false, spellShield: true },
      },
      {
        key: "W",
        name: w.name,
        slot: "W",
        cooldown: w.cooldown(),
        cost: w.cost(),
        castTime: 0,
        delivery: { kind: "dash", direction: "away", distance: hop, speed: hopSpeed },
        // Invisible and Realm Hopper once the hop lands.
        onSelf: [{ type: "delayed", delay: hop / hopSpeed, effects: [{ type: "state", state: "invisible", duration: veilSeconds }, ...realmHopper(hopperSeconds)] }],
        roles: ["escape"],
        flags: { grounded: true, knockdown: true },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: e.castTime(),
        chainCooldown: "first",
        delivery: { kind: "area", near: 0, far: e.field("range"), delay: 0, anchor: "caster" },
        onHit: [
          { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
          { type: "cc", cc: "slow", strength: blastSlow, duration: blastSlowFull },
          { type: "cc", cc: "slow", strength: blastSlow / 2, duration: blastSlowFor },
        ],
        flags: { spellShield: e.flag("spellShield") ?? true },
      },
      {
        key: "E2",
        name: `${e.name} (recoil)`,
        slot: "E",
        cooldown: 0,
        castTime: 0,
        // Part of the same cast: the recoil follows the blast at once.
        chain: { root: "E", index: 2, window: 0, auto: true },
        delivery: { kind: "dash", direction: "away", distance: recoil, speed: recoilSpeed },
        usable: () => false,
        flags: { grounded: true, knockdown: true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: 0,
        cooldownAfter: "state",
        onCastStart: [{ type: "state", state: "displacementImmune", duration: leapSeconds }, ...realmHopper(ultHopper)],
        delivery: { kind: "area", near: waveAhead - riftRadius, far: waveAhead + riftRadius, delay: leapSeconds + waveSeconds / 2, anchor: "caster" },
        onHit: [
          { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
          { type: "cc", cc: "slow", strength: waveSlow, duration: waveSlowFor },
        ],
        // The rift (in the hooks) holds the cooldown.
        onSelf: [{ type: "state", state: "lingering", duration: leapSeconds + waveSeconds + riftSeconds }],
        flags: { spellShield: r.flag("spellShield") ?? true },
      },
    ];

    const spiritsOf = (ctx: HookContext) => (ctx.tick < Number(ctx.memory.spiritsUntil ?? -1) ? Number(ctx.memory.spirits ?? 0) : 0);
    const abjure = (ctx: HookContext) => {
      const live = ctx.tick < Number(ctx.memory.stacksUntil ?? -1);
      const stacks = (live ? Number(ctx.memory.stacks ?? 0) : 0) + 1;
      if (stacks < stacksToProc) {
        ctx.memory.stacks = stacks;
        ctx.memory.stacksUntil = ctx.tick + ticks(stackSeconds);
        return;
      }
      ctx.memory.stacks = 0;
      ctx.memory.stacksUntil = -1;
      ctx.apply({ type: "damage", damageType: "magic", amount: proc, label: innate.name });
      // A Spirit freed; all of them stay for the full duration again.
      ctx.memory.spirits = Math.min(maxSpirits, spiritsOf(ctx) + 1);
      ctx.memory.spiritsUntil = ctx.tick + ticks(stackSeconds);
    };
    const unveil = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible"));
    };

    return {
      abilities,
      budget: {
        // A proc every third hit, about a Spirit or two healing her through a fight.
        damage: (self, target) => ({ magic: evaluate(proc, self, target) / (stacksToProc / 1.2) }),
        healing: (self) => 1.5 * evaluate(spiritHeal, self),
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          // The Spirits heal her every second.
          const spirits = spiritsOf(ctx);
          if (spirits > 0 && (ctx.tick - Number(ctx.memory.spiritsUntil)) % 30 === 0) ctx.apply({ type: "heal", amount: flat(spirits * evaluate(spiritHeal, self)) }, true);
          // The rift: it forms when the shockwave has spread; enemies crossing its border are slowed.
          const formed = Number(ctx.memory.riftFrom ?? Number.POSITIVE_INFINITY);
          // The rift is centered ahead of where the leap landed.
          if (ctx.memory.riftDir !== undefined && ctx.tick > Number(ctx.memory.leapUntil)) {
            ctx.memory.riftX = self.x + Number(ctx.memory.riftDir) * waveAhead;
            delete ctx.memory.riftDir;
          }
          if (ctx.tick >= formed && ctx.tick < Number(ctx.memory.riftUntil ?? -1)) {
            const center = Number(ctx.memory.riftX);
            if (Math.abs(self.x - center) > riftRadius) {
              ctx.memory.riftUntil = -1;
              return;
            }
            const inside = Math.abs(ctx.enemy.x - center) <= riftRadius;
            const was = ctx.memory.enemyInRift;
            if (was !== undefined && was !== inside) ctx.apply({ type: "cc", cc: "slow", strength: borderSlow, duration: borderSlowFor });
            ctx.memory.enemyInRift = inside;
          }
        },
        onCastStart(ctx) {
          unveil(ctx);
          if (ctx.ability.key === "R") {
            const toward = ctx.enemy.x >= ctx.self.x ? 1 : -1;
            // The leap: as far as it takes (within its range) to put the enemy where the shockwave starts.
            const short = Math.abs(ctx.enemy.x - ctx.self.x) - waveAhead;
            const leap = Math.max(leapMin, Math.min(leapMax, Math.abs(short)));
            ctx.apply({ type: "delayed", delay: leapSeconds, effects: [{ type: "reposition", direction: short > 0 ? "toward" : "away", distance: leap }] }, true);
            ctx.memory.leapUntil = ctx.tick + ticks(leapSeconds);
            ctx.memory.riftDir = toward;
            ctx.memory.riftX = ctx.self.x + toward * waveAhead;
            ctx.memory.riftFrom = ctx.tick + ticks(leapSeconds + waveSeconds);
            ctx.memory.riftUntil = ctx.tick + ticks(leapSeconds + waveSeconds + riftSeconds);
            delete ctx.memory.enemyInRift;
          }
        },
        onAttackLaunch(ctx) {
          unveil(ctx);
        },
        onAttackHit(ctx) {
          abjure(ctx);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") ctx.memory.curseUntil = ctx.tick + ticks(curseSeconds);
          if (key === "Q2") {
            ctx.memory.curseUntil = -1;
            ctx.apply({ type: "damage", damageType: "magic", amount: flat(recastDamage(ctx.self, ctx.enemy) * ctx.scale), label: `${q.name} (recast)` });
          }
          if (key === "Q" || key === "Q2" || key === "E" || key === "R") abjure(ctx);
        },
      },
    };
  },
};

export default aurora;
