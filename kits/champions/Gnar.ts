/** Gnar: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Unit, World } from "../../engine/sim/state";
import { terrainGap } from "../../engine/sim/terrain";
import { FOREVER, ticks } from "./util";

const MEGA = "Mega Gnar";

const gnar: KitModule = {
  champion: "Gnar",
  options: {
    rage: { label: "Rage at the start of a fight (it builds on minions in lane)", default: 50 },
  },
  build(kit, options) {
    const mini = kit.ability("Mini Gnar");
    const mega = kit.ability("Mega Gnar");
    const gene = kit.ability("Rage Gene");
    const boomerang = kit.ability("Boomerang Throw");
    const boulder = kit.ability("Boulder Toss");
    const hyper = kit.ability("Hyper");
    const wallop = kit.ability("Wallop");
    const hop = kit.ability("Hop");
    const crunch = kit.ability("Crunch");
    const gnarR = kit.ability("GNAR!");

    // Mini Gnar: ranged, faster, a little attack speed. Mega Gnar's stats are the champion's Mega form.
    const stats = kit.champion.forms[0]?.stats;
    const miniRange = mini.number("Bonus Range");
    const miniSpeed = mini.number("Bonus Movespeed");
    const miniAttackSpeed = mini.quoted("as well as 5.5% bonus attack speed", 0) / 100;
    mega.quote("Gnar restores health equal to the amount gained when transforming into Mega Gnar, but will only retain his current percentage health when returning to Mini form");

    // Rage Gene: 11 Rage over 2 s (4 ticks) on dealing or taking damage, refreshed; more per hit on a champion.
    const combatRage = gene.levelValue("Rage over 2 seconds upon dealing or receiving damage");
    const rageWindow = gene.quoted("Rage over 2 seconds upon dealing or receiving damage, up to 100", 0);
    const rageMax = gene.quoted("Rage over 2 seconds upon dealing or receiving damage, up to 100", 1);
    const rageTicks = gene.quoted("with 4 ticks every 0.5 seconds", 0);
    const rageEvery = gene.quoted("with 4 ticks every 0.5 seconds", 1);
    const lashRage = gene.levelValue("Against champions, Boomerang Throw instantly generates", 0);
    const attackRage = gene.levelValue("Against champions, Boomerang Throw instantly generates", 1);
    const megaSeconds = gene.quoted("Gnar's Mega form lasts for 15 seconds", 0);
    const tiredSeconds = gene.quoted("becoming too tired to generate Rage for 15 seconds", 0);
    gene.quote("Rage cannot be generated while in this form");
    gene.quote("It also does not stack but instead refreshes with subsequent applications");
    gene.quote("Both of Gnar's forms share their ability cooldowns");
    gene.quote("Casting any of them during this time also causes Gnar to transform into Mega Gnar instantly, else he will transform automatically after the 4 seconds have elapsed");
    kit.assume("At full Rage Gnar becomes Mega Gnar at once, rather than within the 4 s the wiki allows.");

    // Boomerang Throw: out at 2500 slowing to 1400, back from 60 speeding up to 2600; catching it refunds 40%.
    const [outRange = 1125] = boomerang.fieldValues("range");
    const [outWidth = 110] = boomerang.fieldValues("width");
    const [outFrom = 2500, outTo = 1400, backFrom = 60, backTo = 2600] = boomerang.fieldNumbers("speed");
    const outSpeed = (outFrom + outTo) / 2;
    const backSpeed = (backFrom + backTo) / 2;
    const catchRefund = boomerang.quoted("Catching the boomerang while it is returning back refunds 40% of the ability's total cooldown", 0) / 100;
    const lashCooldown = boomerang.cooldown();
    kit.assume(
      `Boomerang Throw flies at the average of its speeds (${outSpeed} out, ${backSpeed} back) and only its outgoing pass hits; Gnar always catches it on its way back, from the enemy or, missed, from its full range.`,
    );

    // Boulder Toss: picked up within 90 units after 0.3 s, it refunds 70%.
    const pickUp = "After 0.3 seconds, Gnar can pick up the boulder by moving within 90 units of it, refunding 70% of the ability's total cooldown";
    const pickAfter = boulder.quoted(pickUp, 0);
    const pickRadius = boulder.quoted(pickUp, 1);
    const pickRefund = boulder.quoted(pickUp, 2) / 100;
    const boulderStays = boulder.quoted("The boulder then remains on the ground for 6 seconds", 0);
    const boulderWidth = boulder.field("width");
    const pickReach = 300;
    kit.assume(`The boulder drops against the enemy's near side; Mega Gnar steps onto it when it lies within ${pickReach} units of him and he isn't fleeing.`);

    // Hyper: the third hit deals bonus magic damage and a burst of speed (80% at GNAR!'s rank 3) that decays.
    const hyperStacking = "apply a stack of Hyper to enemies for 3.5 seconds, refreshing on subsequent applications and stacking up to 3 times";
    const hyperSeconds = hyper.quoted(hyperStacking, 0);
    const hyperMax = hyper.quoted(hyperStacking, 1);
    const hyperHit = hyper.formula("Bonus Magic Damage");
    const hyperSpeed = gnarR.fraction("Hyper Bonus Movement Speed");
    const hyperFade = hyper.quoted("bonus movement speed that decays over 3 seconds", 0);
    hyper.quote("Gnar gains Hyper's bonus movement speed when he leaves Mega form");
    kit.assume(`Hyper's ${hyperSpeed * 100}% movement speed decays evenly over ${hyperFade} s.`);

    // Wallop, Crunch and Hop; the leaps land after 0.6 s however far they go.
    const wallopLock = wallop.quoted("Gnar is locked out of moving and casting movement abilities for 0.25 seconds after the cast time", 0);
    const leapTime = 0.6;
    const hopRange = hop.field("targetRange");
    const crunchRange = crunch.field("targetRange");
    kit.assume(`Hop and Crunch land ${leapTime} s after they leave the ground, however far they go (the game files' TravelTime; the wiki gives no speed). Hop is kept for getting away: its bounce off the enemy is left out.`);

    // GNAR!: knocks the enemy 590 units away; into a wall, more damage and a stun at once, else a slow after 0.4 s.
    const knockback = gnarR.quoted("knocking away nearby enemies up to 590 units in that direction", 0);
    const slowing = "slowing them by 45% after a 0.4-second delay for a duration";
    const knockSlow = gnarR.quoted(slowing, 0) / 100;
    const knockAfter = gnarR.quoted(slowing, 1);
    const knockHold = gnarR.number("Disable Duration");
    const knockHit = gnarR.formula("Physical Damage");
    const rLock = gnarR.quoted("Gnar is locked out of moving and casting movement abilities for 0.175 seconds after the cast time", 0);
    kit.assume(`GNAR!'s knockback flies for the ${knockAfter} s before its slow (the wiki gives no flight time).`);

    const miniForm = (unit: Unit) => unit.spec.form !== MEGA;
    const rageOf = (unit: Unit) => Number(unit.memory.rage ?? options.rage ?? 0);
    const tired = (unit: Unit, world: World) => world.tick < Number(unit.memory.tiredUntil ?? -1);
    // Locked out of moving (and movement spells) for a moment: a root on himself.
    const lock = (ctx: HookContext, seconds: number) => {
      ctx.self.statuses = [...ctx.self.statuses, { kind: "cc", key: "root", source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(seconds), value: 0 }];
    };
    const addRage = (ctx: HookContext, amount: number) => {
      if (!miniForm(ctx.self) || tired(ctx.self, ctx.world)) return;
      ctx.memory.rage = Math.min(rageMax, rageOf(ctx.self) + amount);
      if (Number(ctx.memory.rage) >= rageMax) {
        // GNAR!
        ctx.transform(MEGA, "gain");
        ctx.buff("mini", "attackSpeed", 0, 0);
        ctx.memory.megaUntil = ctx.tick + ticks(megaSeconds);
        ctx.memory.hyper = 0;
      }
    };
    // Dealing or taking damage: Rage over the next 2 s, the window refreshed by more.
    const stirred = (ctx: HookContext) => {
      if (!miniForm(ctx.self) || tired(ctx.self, ctx.world)) return;
      if (ctx.tick > Number(ctx.memory.rageUntil ?? -1)) ctx.memory.rageNext = ctx.tick + ticks(rageEvery);
      ctx.memory.rageUntil = ctx.tick + ticks(rageWindow);
    };
    const hyperHitOn = (ctx: HookContext) => {
      if (!miniForm(ctx.self)) return;
      const stacks = ctx.tick < Number(ctx.memory.hyperUntil ?? -1) ? Number(ctx.memory.hyper ?? 0) : 0;
      if (stacks + 1 >= hyperMax) {
        ctx.memory.hyper = 0;
        ctx.apply({ type: "damage", damageType: "magic", amount: hyperHit, label: hyper.name });
        ctx.memory.hyperSpeedAt = ctx.tick;
      } else {
        ctx.memory.hyper = stacks + 1;
        ctx.memory.hyperUntil = ctx.tick + ticks(hyperSeconds);
      }
    };
    // A wall within the knockback's reach behind the enemy (as engine/sim/combat.ts's displace finds it).
    const wallWithin = (world: World, self: Unit, enemy: Unit) => {
      const away = enemy.x === self.x ? (enemy.side === 0 ? -1 : 1) : enemy.x > self.x ? 1 : -1;
      const env = world.settings.environment;
      return Math.min(env.walls ? env.wallDistance : Number.POSITIVE_INFINITY, terrainGap(world, enemy, away)) <= knockback;
    };

    const miniAbilities: AbilitySpec[] = [
      {
        key: "Q",
        name: boomerang.name,
        slot: "Q",
        cooldown: lashCooldown,
        castTime: boomerang.castTime(),
        delivery: { kind: "line", range: outRange, width: outWidth, speed: outSpeed },
        onHit: [
          { type: "damage", damageType: "physical", amount: boomerang.formula("Physical Damage") },
          { type: "cc", cc: "slow", strength: boomerang.fraction("Slow"), duration: boomerang.quoted("slows them for 2 seconds", 0) },
        ],
        flags: { projectile: boomerang.flag("projectile") ?? true },
      },
      {
        key: "E",
        name: hop.name,
        slot: "E",
        cooldown: hop.cooldown(),
        castTime: 0,
        delivery: { kind: "dash", direction: "away", distance: hopRange, minDistance: 0, speed: hopRange / leapTime, time: leapTime },
        onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: hop.fraction("Bonus Attack Speed") }, duration: hop.quoted("then gains bonus attack speed for 6 seconds", 0) }],
        roles: ["escape"],
      },
    ];
    const megaAbilities: AbilitySpec[] = [
      {
        key: "QM",
        name: boulder.name,
        slot: "Q",
        cooldownKey: "Q",
        cooldown: boulder.cooldown(),
        castTime: boulder.castTime(),
        delivery: { kind: "line", range: boulder.field("range"), width: boulderWidth, speed: boulder.field("speed") },
        onHit: [
          { type: "damage", damageType: "physical", amount: boulder.formula("Physical Damage") },
          { type: "cc", cc: "slow", strength: boulder.fraction("Slow"), duration: boulder.quoted("slowing them for 2 seconds", 0) },
        ],
        flags: { projectile: boulder.flag("projectile") ?? true },
      },
      {
        key: "W",
        name: wallop.name,
        slot: "W",
        cooldown: wallop.cooldown(),
        castTime: wallop.castTime(),
        delivery: { kind: "area", near: 0, far: wallop.field("range"), delay: 0, anchor: "caster" },
        onHit: [
          { type: "damage", damageType: "physical", amount: wallop.formula("Physical Damage") },
          { type: "cc", cc: "stun", duration: wallop.quoted("stunning them for 1.25 seconds", 0) },
        ],
      },
      {
        key: "EM",
        name: crunch.name,
        slot: "E",
        cooldownKey: "E",
        cooldown: crunch.cooldown(),
        castTime: 0,
        delivery: { kind: "dash", direction: "toward", distance: crunchRange, minDistance: 0, speed: crunchRange / leapTime, time: leapTime, hitRadius: crunch.field("innerRadius") },
        onHit: [
          { type: "damage", damageType: "physical", amount: crunch.formula("Physical Damage") },
          { type: "cc", cc: "slow", strength: crunch.quoted("slows them by 80% for 0.5 seconds", 0) / 100, duration: crunch.quoted("slows them by 80% for 0.5 seconds", 1) },
        ],
      },
      {
        key: "R",
        name: gnarR.name,
        slot: "R",
        cooldown: gnarR.cooldown(),
        castTime: gnarR.castTime(),
        delivery: { kind: "aura", radius: gnarR.field("effectRadius") },
        // Into a wall: the increased damage and the stun. Otherwise the damage and the slow, in the hooks.
        onHit: [
          {
            type: "displace",
            direction: "away",
            distance: knockback,
            duration: knockAfter,
            wallStun: knockHold,
            wallEffects: [{ type: "damage", damageType: "physical", amount: gnarR.formula("Increased Damage"), label: `${gnarR.name} (wall)` }],
          },
        ],
        estimate: (caster, target) => evaluate(knockHit, caster, target),
        roles: ["cc", "damage"],
      },
    ];

    // Between his other commands Mega Gnar walks over a boulder lying close by to pick it up.
    const behavior: Behavior = (view) => {
      const command = defaultBehavior(view);
      const { self, world, enemy } = view;
      const at = self.memory.boulderX;
      if (at === undefined || miniForm(self) || view.mode === "flee" || (command && command.kind !== "move")) return command;
      if (world.tick + ticks(Math.abs(Number(at) - self.x) / derive(self).moveSpeed) < Number(self.memory.boulderReady)) return command;
      const gap = Number(at) - self.x;
      if (Math.abs(gap) <= pickRadius || Math.abs(gap) > pickReach) return command;
      const toward = enemy.x >= self.x ? 1 : -1;
      return { kind: "move", direction: Math.sign(gap) === toward ? 1 : -1 };
    };

    return {
      behavior,
      abilities: miniAbilities,
      attack: { range: (stats?.attackRange ?? 175) + miniRange, ranged: true, missileSpeed: stats?.missileSpeed ?? 1500, projectile: true },
      base: { moveSpeed: (stats?.moveSpeed ?? 335) + miniSpeed },
      forms: {
        [MEGA]: { championForm: MEGA, abilities: megaAbilities },
      },
      budget: {
        // Hyper's burst on every third Mini hit, Mini about half of a fight.
        damage: (self, target) => ({ magic: (0.5 * evaluate(hyperHit, self, target) * derive(self).attackSpeed) / hyperMax }),
      },
      hooks: {
        onTick(ctx) {
          const self = ctx.self;
          if (ctx.memory.rage === undefined) ctx.memory.rage = options.rage ?? 0;
          // Mini Gnar's attack speed.
          if (miniForm(self) && !self.statuses.some((s) => s.memoKey === "buff:mini")) ctx.buff("mini", "attackSpeed", miniAttackSpeed, FOREVER);
          // Rage over time while in combat.
          const next = Number(ctx.memory.rageNext ?? Number.POSITIVE_INFINITY);
          if (ctx.tick >= next && ctx.tick <= Number(ctx.memory.rageUntil ?? -1)) {
            ctx.memory.rageNext = next + ticks(rageEvery);
            addRage(ctx, combatRage / rageTicks);
          }
          // Mega Gnar runs out: back to Mini, tired, with Hyper's speed.
          if (!miniForm(self) && ctx.tick >= Number(ctx.memory.megaUntil ?? Number.POSITIVE_INFINITY)) {
            ctx.transform(kit.champion.forms[0]?.name ?? "Gnar", "share");
            ctx.memory.rage = 0;
            ctx.memory.tiredUntil = ctx.tick + ticks(tiredSeconds);
            ctx.memory.hyperSpeedAt = ctx.tick;
            delete ctx.memory.megaUntil;
          }
          // Hyper's speed decays.
          const since = (ctx.tick - Number(ctx.memory.hyperSpeedAt ?? -1e9)) / 30;
          if (since <= hyperFade) ctx.buff("hyper", "moveSpeedPercent", hyperSpeed * (1 - since / hyperFade), hyperFade - since);
          // Catching the boomerang.
          if (ctx.memory.lashBack !== undefined && ctx.tick >= Number(ctx.memory.lashBack)) {
            delete ctx.memory.lashBack;
            ctx.apply({ type: "refund", ability: "Q", fraction: catchRefund, total: true }, true);
          }
          // Picking up the boulder.
          if (ctx.memory.boulderX !== undefined && ctx.tick >= Number(ctx.memory.boulderReady) && Math.abs(self.x - Number(ctx.memory.boulderX)) <= pickRadius) {
            delete ctx.memory.boulderX;
            ctx.apply({ type: "refund", ability: "Q", fraction: pickRefund, total: true }, true);
          }
          if (ctx.memory.boulderX !== undefined && ctx.tick >= Number(ctx.memory.boulderUntil)) delete ctx.memory.boulderX;
        },
        onDamageDealt(ctx) {
          stirred(ctx);
        },
        onDamageTaken(ctx) {
          stirred(ctx);
        },
        onAttackHit(ctx) {
          if (!miniForm(ctx.self)) return;
          hyperHitOn(ctx);
          addRage(ctx, attackRage);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          // Missed, the boomerang flies its full range and back into his hands; a hit turns it around sooner.
          if (key === "Q") ctx.memory.lashBack = ctx.tick + ticks(outRange / outSpeed + outRange / backSpeed);
          if (key === "W") lock(ctx, wallopLock);
          if (key === "R") lock(ctx, rLock);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            hyperHitOn(ctx);
            addRage(ctx, lashRage);
            ctx.memory.lashBack = ctx.tick + ticks(Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius) / backSpeed);
          }
          if (key === "QM") {
            // It stops against the enemy's near side.
            const toward = ctx.enemy.x >= ctx.self.x ? 1 : -1;
            ctx.memory.boulderX = ctx.enemy.x - toward * (ctx.enemy.spec.base.radius + boulderWidth / 2);
            ctx.memory.boulderReady = ctx.tick + ticks(pickAfter);
            ctx.memory.boulderUntil = ctx.tick + ticks(boulderStays);
          }
          if (key === "R" && !wallWithin(ctx.world, ctx.self, ctx.enemy)) {
            ctx.apply({ type: "damage", damageType: "physical", amount: knockHit, label: gnarR.name });
            ctx.apply({ type: "delayed", delay: knockAfter, effects: [{ type: "cc", cc: "slow", strength: knockSlow, duration: knockHold }] });
          }
        },
      },
    };
  },
};

export default gnar;

