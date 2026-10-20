/** Vayne, from the pinned 16.20 ability records. */
import type { KitModule } from "../../engine/kits/compile";
import { canCast, inAttackRange } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { canSee, directionTo, hookContext } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { FOREVER, flat, ticks } from "./util";

const vayne: KitModule = {
  champion: "Vayne",
  build(kit) {
    const passive = kit.ability("Night Hunter");
    const q = kit.ability("Tumble");
    const w = kit.ability("Silver Bolts");
    const e = kit.ability("Condemn");
    const r = kit.ability("Final Hour");
    const hunterSpeed = passive.quoted("Vayne gains 30 bonus movement speed", 0);
    const hourSpeed = passive.quoted("increased to 90 while under the effects of Final Hour", 0);
    const hunterRadius = passive.field("effectRadius");
    const hunterLinger = passive.quoted("persists for 2 seconds after Vayne loses sight", 0);
    kit.assume("Night Hunter uses the enemy's center within the documented 2000-unit radius. Vayne starts facing her enemy; attacks, Condemn and forward movement turn her toward it, while retreating or tumbling away turns her away. Standing still retains that facing. Sight loss retains the bonus for two seconds while she continues facing the enemy.");

    const boltWindow = w.quoted("a stack of Silver Bolts for 3.5 seconds", 0);
    const boltStacks = w.quoted("stacking up to 3 times", 0);
    const boltDamage = w.formula("Bonus True Damage");
    const boltMinimum = w.formula("Minimum Bonus Damage");
    w.quote("The third stack consumes them all");
    w.quote("Vayne's basic attacks on-hit and Condemn apply a stack of Silver Bolts");
    kit.assume("Silver Bolts tracks the one enemy champion; switching to a pet clears its champion stacks. The engine does not model Silver Bolts stacks/damage on pets or its documented stack-consumption exception during stasis.");
    const bolts = (ctx: HookContext, blocked = false) => {
      const count = ctx.tick < Number(ctx.memory.silverUntil ?? -1) ? Number(ctx.memory.silver ?? 0) : 0;
      const next = count + 1;
      ctx.memory.silver = next >= boltStacks ? 0 : next;
      ctx.memory.silverUntil = ctx.tick + ticks(boltWindow);
      if (next >= boltStacks && !blocked) ctx.apply({ type: "damage", damageType: "true", amount: boltDamage, minimum: boltMinimum, noLifeSteal: true, label: w.name });
    };

    const tumbleDistance = q.field("range");
    const speedBase = q.field("speed");
    const speedRatio = (q.fieldNumbers("speed")[1] ?? 0) / 100;
    const tumbleWindow = q.quoted("her next basic attack within 3 seconds", 0);
    const tumbleDamage = q.formula("Bonus Physical Damage");
    q.quote("Tumble resets Vayne's basic attack timer");
    q.quote("The bonus damage applies life steal");
    q.quote("Vayne cannot attack until the animation is complete");
    q.quote("Vayne can cast Final Hour during Tumble. She does not become invisible during the dash");
    const hourDuration = r.number("Effect Duration");
    const hourAD = r.number("Bonus Attack Damage");
    const tumbleCDReduction = r.fraction("Tumble Cooldown Reduction");
    const invisibleSeconds = r.quoted("Tumble cast grants Vayne invisibility for 1 second", 0);
    r.quote("Using a basic attack breaks the stealth at the start of the attack windup");
    r.quote("Attacking or casting abilities ends the stealth immediately");
    kit.assume("Final Hour's champion-takedown extension cannot affect a single-enemy duel, which ends at that takedown. Tumble's invisibility starts when its actual dash ends, including terrain/knockdown endings; Vayne can reveal herself immediately by attacking.");
    kit.assume("Condemn uses the engine's one-dimensional wall/terrain collision. Its knockback direction follows the current caster-target axis rather than retaining the source's cast-completion direction if they cross while the bolt is in flight.");
    e.quote("Condemn's displacement direction is determined at the end of the cast time");
    e.quote("If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, this ability will cancel but does not go on cooldown nor pay its cost");
    e.quote("Condemn's missile will fail to fire if Vayne is suppressed during the cast time");
    kit.assume("Suppression during Condemn's cast prevents its bolt even if removed before completion. The failed cast still spends the ordinary mana cost and cooldown; the pinned note specifies failure to fire but does not specify a resource refund.");
    const hour = (unit: Unit) => unit.statuses.some((status) => status.kind === "stat" && status.source === unit.side && status.memoKey === "R:AD");
    const reveal = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((status) => !(status.kind === "state" && status.key === "invisible" && status.source === ctx.self.side && status.memoKey === "vayne:tumble"));
    };
    const updateHunter = (ctx: HookContext) => {
      const near = ctx.enemy.alive && Math.abs(ctx.enemy.x - ctx.self.x) <= hunterRadius;
      const visible = near && canSee(ctx.enemy, ctx.self);
      if (visible) ctx.memory.hunterSeenUntil = ctx.tick + ticks(hunterLinger);
      let facing = ctx.memory.hunterFacing !== false;
      if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "Q") facing = ctx.self.action.perTick * directionTo(ctx.self, ctx.enemy) >= 0;
      else if (ctx.self.move !== 0) facing = ctx.self.move > 0;
      ctx.memory.hunterFacing = facing;
      const seen = near && (visible || ctx.tick < Number(ctx.memory.hunterSeenUntil ?? -1));
      ctx.buff("nightHunter", "moveSpeedFlat", facing && seen ? hour(ctx.self) ? hourSpeed : hunterSpeed : 0, FOREVER);
    };

    const empower: Effect = {
      type: "empower", attacks: 1, window: tumbleWindow, resetAttack: true, uncancellable: true,
      onHit: [{ type: "damage", damageType: "physical", amount: tumbleDamage, label: q.name }],
    };
    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownAfter: "empower", cost: q.cost(), castTime: q.castTime(),
        cooldownFor: (unit) => qCooldown * (hour(unit) ? 1 - tumbleCDReduction : 1),
        delivery: { kind: "dash", direction: "away", distance: tumbleDistance, minDistance: tumbleDistance, speed: speedBase, speedFor: (unit) => speedBase + speedRatio * derive(unit).moveSpeed },
        onSelf: [empower], flags: { grounded: q.flag("grounded") ?? true, knockdown: q.flag("knockdown") ?? true }, roles: ["buff", "escape"],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cancelOnInvalidTarget: true,
        failCastOnCC: ["suppression"],
        delivery: { kind: "target", range: e.field("targetRange"), missileSpeed: e.field("speed", "Missile") },
        onHit: [
          { type: "damage", damageType: "physical", amount: e.formula("Physical Damage") },
          { type: "displace", direction: "away", distance: e.quoted("knocks them back 475 units", 0), duration: e.quoted("knocks them back 475 units", 0) / e.field("speed", "Knockback"), wallStun: e.quoted("stunned for 1.5 seconds", 0), wallEffects: [{ type: "damage", damageType: "physical", amount: e.formula("Bonus Physical Damage") }] },
        ],
        flags: { projectile: e.flag("projectile") ?? true, spellShield: e.flag("spellShield") ?? true }, decisive: true,
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cooldownAtCastStart: true, cost: r.cost(), castTime: r.castTime(), overlay: true,
        delivery: { kind: "self" }, onSelf: [{ type: "stat", stat: "AD", amount: flat(hourAD), duration: hourDuration }], roles: ["buff"],
        usable: (unit) => !hour(unit),
      },
    ];
    // Read before sealing: runtime callbacks must never read the KitContext again.
    const qCooldown = q.cooldown();
    const rCooldown = r.cooldown();
    const tumble = abilities[0]!;
    const behavior: Behavior = (view) => {
      let command = defaultBehavior(view);
      if ((!command || command.kind !== "cast") && (view.mode === "fight" || view.mode === "trade") && inAttackRange(view.self, view.enemy) && view.self.attackReadyTick > view.world.tick + 1 && canCast(view.world, view.self, tumble)) {
        command = { kind: "cast", ability: "Q" };
      }
      if (command?.kind === "cast" && command.ability === "Q" && !command.aim && command.dodge === undefined) {
        command = { ...command, aim: { direction: view.mode === "flee" || view.distance + tumbleDistance <= view.self.spec.attack.range ? -1 : 1, distance: tumbleDistance } };
      }
      if (command?.kind === "cast" && command.ability === "Q" && command.aim) view.self.memory.hunterFacing = command.aim.direction > 0;
      if (command?.kind === "move" && command.direction !== 0) view.self.memory.hunterFacing = command.direction > 0;
      if (command?.kind === "attack" || command?.kind === "cast" && command.ability === "E") view.self.memory.hunterFacing = true;
      updateHunter(hookContext(view.world, view.self));
      return command;
    };
    kit.assume("Vayne weaves Tumble between attacks, choosing toward/away along the duel's line to keep her target within attack range where possible, while preserving the default behavior's defensive dodge commands. This does not optimize free-angle kiting or waiting in stealth.");
    kit.assume("The stat-budget hint estimates Silver Bolts every three continuous attacks and Final Hour's average AD and Tumble-cooldown contribution over its duration/cooldown; Condemn's extra stack is left to the combat simulation.");
    return {
      abilities, behavior,
      budget: {
        damage(self, target) {
          const d = derive(self);
          const uptime = hourDuration / rCooldown;
          const normalCycle = qCooldown + 1 / Math.max(d.attackSpeed, Number.EPSILON);
          const hourCycle = qCooldown * (1 - tumbleCDReduction) + 1 / Math.max(d.attackSpeed, Number.EPSILON);
          const ordinaryCrit = 1 + d.critChance * (d.critDamage - 1);
          return {
            true: Math.max(evaluate(boltDamage, self, target), evaluate(boltMinimum, self, target)) * d.attackSpeed / boltStacks,
            physical: uptime * (hourAD * (d.attackSpeed * ordinaryCrit + (tumbleDamage.ratios?.AD ?? 0) / hourCycle) + evaluate(tumbleDamage, self, target) * (1 / hourCycle - 1 / normalCycle)),
          };
        },
      },
      hooks: {
        onStart: updateHunter,
        onTick: updateHunter,
        onDashEnd(ctx) {
          if (ctx.ability.key !== "Q" || !ctx.memory.tumblePending) return;
          ctx.memory.tumblePending = false;
          if (ctx.memory.tumbleHour) {
            ctx.apply({ type: "state", state: "invisible", duration: invisibleSeconds }, true);
            const status = ctx.self.statuses.at(-1);
            if (status?.kind === "state" && status.key === "invisible") status.memoKey = "vayne:tumble";
          }
        },
        onCastStart(ctx) {
          reveal(ctx);
          if (ctx.ability.key === "E") { ctx.memory.hunterFacing = true; updateHunter(ctx); }
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.tumblePending = true;
            ctx.memory.tumbleHour = hour(ctx.self);
          }
          if (ctx.ability.key === "R") {
            if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "Q") ctx.memory.tumbleHour = true;
            updateHunter(ctx);
          }
        },
        onAttack(ctx) {
          reveal(ctx);
          ctx.memory.hunterFacing = true;
          updateHunter(ctx);
          if (ctx.self.action?.kind === "windup" && ctx.self.action.pet !== undefined) {
            ctx.memory.silver = 0;
            ctx.memory.silverUntil = -1;
          }
        },
        onAttackHit(ctx) { bolts(ctx, ctx.blocked); },
        onAbilityHit(ctx) { if (ctx.ability.key === "E") bolts(ctx); },
      },
    };
  },
};

export default vayne;
