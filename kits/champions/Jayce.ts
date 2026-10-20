/** Jayce: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inReach } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import { allAbilities } from "../../engine/sim/forms";
import type { AbilitySpec, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, ticks } from "./util";

const HAMMER = "Hammer Stance";
const CANNON = "Cannon Stance";

const jayce: KitModule = {
  champion: "Jayce",
  build(kit) {
    const capacitor = kit.ability("Hextech Capacitor");
    const blast = kit.ability("Shock Blast");
    const skies = kit.ability("To the Skies!");
    const hyper = kit.ability("Hyper Charge");
    const field = kit.ability("Lightning Field");
    const gate = kit.ability("Acceleration Gate");
    const blow = kit.ability("Thundering Blow");
    const toCannon = kit.ability("Transform Mercury Cannon");
    const toHammer = kit.ability("Transform Mercury Hammer");

    // Switching stance: 30 movement speed for 0.75 s.
    const switching = "he gains ghosting and 30 bonus movement speed for 0.75 seconds";
    const switchSpeed = capacitor.quoted(switching, 0);
    const switchSeconds = capacitor.quoted(switching, 1);

    // Cannon Stance: 500 range; the first attack shreds 35% armor and magic resistance for 5 s.
    const cannonRange = toCannon.quoted("becoming ranged with 500 attack range", 0);
    const shred = toCannon.levelValue("reduce the target's armor and magic resistance by") / 100;
    const shredSeconds = toCannon.quoted("for 5 seconds", 0);
    toCannon.quote("Both Transform on-hit effects have no set duration and will only be consumed when Jayce either lands a basic attack or switches stances");
    const cannonMissile = 2000;
    kit.assume(`Cannon Stance's attacks fly at ${cannonMissile} (the game files; the wiki gives no speed) and wind up like the Hammer's.`);

    // Hammer Stance: 26 (+ 7.5% bonus AD) armor and magic resistance; the first attack deals 130 (+ 30% bonus AD) more magic damage.
    toHammer.quote("becoming melee with 125 attack range");
    const guard = toHammer.levelValue("bonus armor and bonus magic resistance");
    const guardShare = toHammer.quoted("(+ 7.5% bonus AD) bonus armor and bonus magic resistance", 0) / 100;
    const smash = toHammer.levelValue("bonus armor and bonus magic resistance", 1);
    const smashShare = toHammer.quoted("(+ 30% bonus AD) bonus magic damage", 0) / 100;
    const transformCooldown = toCannon.cooldown();

    // To the Skies!: 600 units to the enemy (its edge), landing 0.5 s later; its 300 radius catches an enemy that moved.
    const leapRange = skies.field("targetRange");
    const leapTime = skies.quoted("leaps to the target enemy's location over 0.5 seconds", 0);
    skies.quote("To The Skies! will always direct Jayce linearly to his target's location");

    // Shock Blast; through Acceleration Gate it flies farther and faster for 40% more damage.
    const [blastRange = 1050, gatedRange = 1600] = blast.fieldValues("range");
    const [blastSpeed = 1450, gatedSpeed = 2350] = blast.fieldValues("speed");
    const gateSeconds = gate.quoted("lasting for 4 seconds", 0);
    const gateHaste = gate.fraction("Bonus Movement Speed");
    const gateFade = gate.quoted("bonus movement speed that decays over 3 seconds", 0);
    kit.assume(`Acceleration Gate goes up just in front of Jayce: the next Shock Blast within its ${gateSeconds} s passes through it, and Jayce walks through it for its ${gateHaste * 100}% speed, decaying evenly over ${gateFade} s.`);

    // Hyper Charge: 3 attacks within 4 s at 110% AD and 360% more attack speed.
    const charging = "Jayce empowers his next 3 basic attacks within 4 seconds to deal modified physical damage and gain 360% bonus attack speed";
    const chargeAttacks = hyper.quoted(charging, 0);
    const chargeSeconds = hyper.quoted(charging, 1);
    const chargeSpeed = hyper.quoted(charging, 2) / 100;
    const chargeShare = hyper.shareOf("Physical Damage");
    hyper.quote("Hyper Charge's total damage is affected by critical strike modifiers");
    hyper.quote("Hyper Charge resets Jayce's basic attack timer");

    // Lightning Field: 25 mana an attack in Hammer Stance; 4 s of magic damage every second around him.
    const manaPerHit = field.number("Mana Restored");
    const fieldSeconds = field.quoted("surrounds himself with an electric field for 4 seconds that deals magic damage every second", 0);

    // Thundering Blow: the target is rooted through the cast time, then knocked back 600 units.
    const knock = blow.quoted("knock them back 600 units", 0);
    const knockSeconds = 0.35;
    const blowLock = blow.quoted("Jayce is unable to cast To the Skies! or Shock Blast for 0.4 seconds after Thundering Blow's cast time", 0);
    blow.quote("Jayce roots the target enemy over the cast time");
    kit.assume(`Thundering Blow's knock back takes ${knockSeconds} s (the game files' KnockbackDuration).`);
    kit.assume(`Jayce starts in Hammer Stance with Transform ready; he switches when his stance has nothing left to cast and the other has, or when the enemy is out of his reach in Hammer Stance or in reach of To the Skies! in Cannon Stance.`);

    const hammerAbilities: AbilitySpec[] = [
      {
        key: "QH",
        name: skies.name,
        slot: "Q",
        cooldown: skies.cooldown(),
        cost: skies.cost(),
        castTime: skies.castTime(),
        delivery: { kind: "dash", direction: "target", distance: leapRange, speed: leapRange / leapTime, time: leapTime, hitRadius: skies.field("effectRadius") },
        onHit: [
          { type: "damage", damageType: "physical", amount: skies.formula("Physical Damage") },
          { type: "cc", cc: "slow", strength: skies.fraction("Slow"), duration: skies.quoted("slow them for 2 seconds", 0) },
        ],
        // Its landing area isn't its range.
        usable: (unit, world) => {
          const enemy = world.units[unit.side === 0 ? 1 : 0];
          return Math.abs(enemy.x - unit.x) - enemy.spec.base.radius <= leapRange;
        },
        flags: { grounded: skies.flag("grounded") ?? true },
      },
      {
        key: "WH",
        name: field.name,
        slot: "W",
        cooldown: field.cooldown(),
        cost: field.cost(),
        castTime: field.castTime(),
        delivery: { kind: "field", range: 0, radius: field.field("effectRadius"), duration: fieldSeconds, interval: 1, attached: true },
        onHit: [{ type: "damage", damageType: "magic", amount: field.formula("Magic Damage Per Tick") }],
        // Also during To the Skies!'s leap.
        overlay: true,
      },
      {
        key: "EH",
        name: blow.name,
        slot: "E",
        cooldown: blow.cooldown(),
        cost: blow.cost(),
        castTime: blow.castTime(),
        delivery: { kind: "target", range: blow.field("targetRange") },
        onHit: [
          { type: "damage", damageType: "magic", amount: blow.formula("Magic Damage") },
          { type: "displace", direction: "away", distance: knock, duration: knockSeconds },
        ],
      },
      { key: "R", name: toCannon.name, slot: "R", activation: "transformation", cooldown: transformCooldown, castTime: toCannon.castTime(), delivery: { kind: "self" } },
    ];
    const cannonAbilities: AbilitySpec[] = [
      {
        key: "QC",
        name: blast.name,
        slot: "Q",
        cooldown: blast.cooldown(),
        cost: blast.cost(),
        castTime: blast.castTime(),
        delivery: { kind: "line", range: blastRange, width: blast.field("width"), speed: blastSpeed },
        onHit: [{ type: "damage", damageType: "physical", amount: blast.formula("Physical Damage") }],
        usable: (unit, world) => world.tick >= Number(unit.memory.gateUntil ?? -1),
        flags: { projectile: blast.flag("projectile") ?? true },
      },
      {
        key: "QG",
        name: `${blast.name} (through the gate)`,
        slot: "Q",
        cooldownKey: "QC",
        cooldown: blast.cooldown(),
        cost: blast.cost(),
        castTime: blast.castTime(),
        delivery: { kind: "line", range: gatedRange, width: blast.field("width"), speed: gatedSpeed },
        onHit: [{ type: "damage", damageType: "physical", amount: blast.formula("Increased Damage") }],
        usable: (unit, world) => world.tick < Number(unit.memory.gateUntil ?? -1),
        flags: { projectile: blast.flag("projectile") ?? true },
      },
      {
        key: "WC",
        name: hyper.name,
        slot: "W",
        cooldown: hyper.cooldown(),
        cost: hyper.cost(),
        castTime: hyper.castTime(),
        cooldownAfter: "empower",
        delivery: { kind: "self" },
        onSelf: [
          { type: "empower", attacks: chargeAttacks, window: chargeSeconds, onHit: [], split: { physical: chargeShare, magic: 0 }, resetAttack: true },
          { type: "stat", stat: "attackSpeed", amount: { base: chargeSpeed }, duration: chargeSeconds },
        ],
      },
      // Its speed in the hooks: no traits for the default behavior, which leaves it to Jayce's.
      { key: "EC", name: gate.name, slot: "E", cooldown: gate.cooldown(), cost: gate.cost(), castTime: gate.castTime(), delivery: { kind: "self" } },
      { key: "RH", name: toHammer.name, slot: "R", activation: "transformation", cooldownKey: "R", cooldown: transformCooldown, castTime: toHammer.castTime(), delivery: { kind: "self" } },
    ];
    const everything = [...hammerAbilities, ...cannonAbilities];
    const spec = (key: string) => {
      const found = everything.find((a) => a.key === key);
      if (!found) throw new Error(`Jayce kit: no ${key}`);
      return found;
    };

    // Hammer Stance's resistances (none in Cannon Stance).
    const guardUp = (ctx: HookContext) => {
      ctx.buff("guardArmor", "armor", Number(ctx.memory.guard ?? 0), FOREVER);
      ctx.buff("guardMR", "MR", Number(ctx.memory.guard ?? 0), FOREVER);
    };

    // The stance's empowered attack: spent by an attack, or lost on the next switch.
    const switchTo = (ctx: HookContext, form: string) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && (s.key === "R" || s.key === "RH")));
      ctx.transform(form, "share");
      ctx.buff("capacitor", "moveSpeedFlat", switchSpeed, switchSeconds);
      const bonusAd = derive(ctx.self).bonusAd;
      if (form === CANNON) {
        ctx.apply(
          {
            type: "empower",
            attacks: 1,
            window: FOREVER,
            onHit: [
              { type: "stat", stat: "armorReductionPercent", amount: { base: shred }, duration: shredSeconds },
              { type: "stat", stat: "mrReductionPercent", amount: { base: shred }, duration: shredSeconds },
            ],
          },
          true,
        );
      } else {
        ctx.apply({ type: "empower", attacks: 1, window: FOREVER, onHit: [{ type: "damage", damageType: "magic", amount: { base: smash, ratios: { bonusAD: smashShare } }, label: toHammer.name }] }, true);
      }
      ctx.memory.guard = form === HAMMER ? guard + guardShare * bonusAd : 0;
      guardUp(ctx);
    };

    const ready = (unit: Unit, world: Parameters<Behavior>[0]["world"], key: string) => canCast(world, unit, spec(key));
    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      const cannon = self.spec.form === CANNON;
      const transform = cannon ? "RH" : "R";
      if (!self.action && view.mode !== "idle" && ready(self, world, transform)) {
        const hammerReady = ["QH", "WH", "EH"].some((k) => canCast(world, self, spec(k), true));
        const cannonReady = ["QC", "WC"].some((k) => canCast(world, self, spec(k), true)) || ready(self, world, "EC");
        const leapReady = canCast(world, self, spec("QH"), true);
        const far = Math.abs(enemy.x - self.x) - enemy.spec.base.radius;
        if (cannon) {
          // In reach of To the Skies! once the cannon's done, or with nothing to shoot.
          const engage = view.mode === "fight" && leapReady && far <= leapRange;
          if (!cannonReady && (engage || (hammerReady && far <= leapRange))) return { kind: "cast", ability: transform };
        } else {
          // Out of reach, or nothing left to hit with.
          const outOfReach = !leapReady && view.distance > self.spec.attack.range + 300;
          if (cannonReady && (outOfReach || !hammerReady || view.mode === "kite" || view.mode === "flee")) return { kind: "cast", ability: transform };
        }
      }
      // Acceleration Gate ahead of a Shock Blast that would reach.
      if (cannon && !self.action && view.mode !== "idle" && ready(self, world, "EC")) {
        const blastReady = (self.cooldownReady.QC ?? 0) <= world.tick && self.resource >= (spec("EC").cost as number) + (spec("QG").cost as number);
        if (blastReady && inReach(spec("QG"), self, enemy)) return { kind: "cast", ability: "EC" };
        if (view.mode === "flee") return { kind: "cast", ability: "EC" };
      }
      return defaultBehavior(view);
    };

    return {
      behavior,
      form: HAMMER,
      abilities: hammerAbilities,
      forms: {
        [CANNON]: { attack: { range: cannonRange, ranged: true, missileSpeed: cannonMissile, projectile: true }, abilities: cannonAbilities },
      },
      budget: {
        // A stance's empowered attack every switch (6 s): the Hammer's magic damage every other one.
        damage: (self) => ({ magic: (smash + smashShare * derive(self).bonusAd) / (2 * transformCooldown) }),
      },
      hooks: {
        onStart(ctx) {
          // Hammer Stance's resistances; no empowered attack until he switches.
          ctx.memory.guard = guard + guardShare * derive(ctx.self).bonusAd;
          guardUp(ctx);
        },
        onTick(ctx) {
          const self = ctx.self;
          // Acceleration Gate's speed decays.
          const since = (ctx.tick - Number(ctx.memory.gateAt ?? -1e9)) / 30;
          if (since <= gateFade) ctx.buff("gate", "moveSpeedPercent", gateHaste * (1 - since / gateFade), gateFade - since);
          // Hyper Charge's speed goes with its last attack.
          if (!self.statuses.some((s) => s.kind === "empower" && s.key === "WC")) {
            if (self.statuses.some((s) => s.kind === "stat" && s.memoKey === "WC:attackSpeed")) self.statuses = self.statuses.filter((s) => s.memoKey !== "WC:attackSpeed");
          }
        },
        onAttackHit(ctx) {
          if (ctx.self.spec.form === HAMMER) ctx.apply({ type: "resource", amount: { base: manaPerHit } }, true);
        },
        onCastStart(ctx) {
          // Rooted through the cast time.
          if (ctx.ability.key === "EH") ctx.apply({ type: "cc", cc: "root", duration: ctx.ability.castTime });
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "R") switchTo(ctx, CANNON);
          if (key === "RH") switchTo(ctx, HAMMER);
          if (key === "EC") {
            ctx.memory.gateUntil = ctx.tick + ticks(gateSeconds);
            ctx.memory.gateAt = ctx.tick;
          }
          if (key === "EH") {
            // No To the Skies! or Shock Blast for 0.4 s.
            for (const lock of ["QH", "QC"]) ctx.self.cooldownReady[lock] = Math.max(ctx.self.cooldownReady[lock] ?? 0, ctx.tick + ticks(blowLock));
          }
          // A Shock Blast through the gate uses it up.
          if (key === "QG") delete ctx.memory.gateUntil;
        },
      },
    };
  },
};

export default jayce;
