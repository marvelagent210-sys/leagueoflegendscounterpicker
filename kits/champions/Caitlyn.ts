/** Caitlyn: pinned attack overrides, physical projectiles and finite traps. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, heldUntil, attackTiming, inReach } from "../../engine/sim/actions";
import { defaultBehavior, expectedDamage, react, type Behavior } from "../../engine/sim/behavior";
import { applyEffect, directionTo, isUntargetable } from "../../engine/sim/combat";
import { dashDistance } from "../../engine/sim/terrain";
import { canMove, derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit, Zone } from "../../engine/sim/state";
import { ticks } from "./util";

const TRAP = "caitlyn:trap", NET = "caitlyn:net", REVEAL = "caitlyn:trapReveal";
const caitlyn: KitModule = {
  champion: "Caitlyn",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const maximum = p.quoted("At 5 stacks"), headshot = p.levelValue("Headshot: Caitlyn's basic attack");
    const nonChampion = p.quoted("increased to 110%");
    const criticalBonus = p.quoted("{{critical damage|0 to 80|critScaling=true}}", 1) / 100;
    const extended = p.quoted("at 1300 range"), markSeconds = p.quoted("within 1.8 seconds");
    const headshotSpeed = p.field("speed");
    p.quote("Only the ordinary 100% attack damage portion of the attack can critically strike");
    p.quote("Headshot is a single instance of damage");
    p.quote("The full damage of Headshot applies life steal");
    p.quote("They trigger on-attack effects (including stacking Headshot)");
    const refund = p.quoted("appears to be 50% of the attack cooldown") / 100;
    const refundLimit = p.quoted("within 0.5 seconds of her previous attack windup completing");
    const trapDamage = w.formula("Headshot Damage Increase"), trapRadius = w.field("collisionRadius"), trapArm = w.quoted("arms after 1 second");
    const trapSeconds = w.number("Trap Duration"), trapMaximum = w.number("Maximum Number of Traps");
    const rootSeconds = w.quoted("rooted for 1.5 seconds"), revealSeconds = w.quoted("revealed for 3 seconds");
    const immunitySeconds = w.quoted("immune to further Yordle Snap Traps for 3 seconds");
    w.quote("preventing them from springing subsequent traps for the duration");
    const netDistance = e.quoted("recoils 390 units"), netSlow = e.quoted("slows them by 50%") / 100, netSeconds = e.quoted("for 1 second");
    const netSpeed = e.field("speed", "Dash speed"), eRange = e.fieldValues("range")[0]!, wRange = w.field("targetRange");
    e.quote("will not recoil after the cast time if she was immobilized or grounded during it");
    e.quote("missile will fail to fire if Caitlyn is suppressed during the cast time");
    e.quote("She can cast any of her abilities during the recoil dash");
    e.quote("The recoil can be used to pass through terrain");
    const rCooldown = r.cooldown(), rCast = r.castTime();
    const channelSeconds = r.quoted("channels for 1 second"), canceledCooldown = r.quoted("a 5-second cooldown");
    const rCritical = r.quoted("{{critical damage|0 to 30|critScaling=true}}", 1) / 100;
    const rDamage = r.formula("Physical damage"), rSpeed = r.field("speed"), rRange = r.field("targetRange");
    const revealMaximum = r.quoted("lasts for up to 4 seconds"), revealLinger = r.quoted("revealed for 1 second if the buff is ended prematurely");
    r.quote("The buff is applied to the target from the start of the cast time");
    r.quote("This excludes losing sight of the target");
    r.quote("{{ct|channel|attack=false|move=false|cast=false");
    q.quote("This ability will cast from wherever the caster is at the start of the cast time");
    q.quote("Enemies revealed by Yordle Snap Trap always take full damage");
    q.quote("Upon Piltover Peacemaker dealing damage to an enemy, Caitlyn's attack timer is forcibly reset");
    const qDamage = q.formula("Physical Damage"), qReduced = q.formula("Reduced Damage");
    const qRange = q.fieldValues("range")[0]!, qWidth = q.field("width", "Initial missile"), expandedWidth = q.field("width", "Expanded missile");
    const marked = (self: Unit, target: Unit, key: string, tick: number) => target.petId === undefined && target.statuses.some((status) => status.source === self.side && status.kind === "mark" && status.key === key && status.endTick > tick);
    const removeMark = (ctx: HookContext, key: string) => { ctx.enemy.statuses = ctx.enemy.statuses.filter((status) => !(status.kind === "mark" && status.key === key && status.source === ctx.self.side)); };
    const grant = (ctx: HookContext, key: string) => {
      ctx.apply({ type: "mark", key, duration: markSeconds });
      const ready = ctx.self.attackReadyTick;
      if (ready > ctx.tick) ctx.self.attackReadyTick = Math.max(ctx.tick, Math.min(ready, ready - Math.round(attackTiming(ctx.self).total * refund), Number(ctx.memory.caitlynLaunch ?? ctx.tick) + ticks(refundLimit)));
    };
    const bullet: AbilitySpec = { key: "Rshot", name: r.name, slot: "other", cooldown: 0, castTime: 0, activation: "internal", usable: () => false, delivery: { kind: "target", range: rRange, missileSpeed: rSpeed }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage, amountFor: (self, target) => evaluate(rDamage, self, target) * (1 + rCritical * derive(self).critChance) }], flags: { projectile: true, spellShield: r.flag("spellShield") }, roles: [] };
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(), castOrigin: "start", delivery: { kind: "line", range: qRange, width: qWidth, radius: qWidth / 2, speed: q.field("speed"), piercing: true, collisionPet: true }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: q.flag("projectile"), spellShield: q.flag("spellShield") }, overlay: true, roles: ["damage"] },
      { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), charges: { max: trapMaximum, recharge: w.field("recharge") }, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, onHit: [{ type: "cc", cc: "root", duration: rootSeconds }, { type: "state", state: "revealed", duration: revealSeconds }, { type: "mark", key: REVEAL, duration: revealSeconds }], flags: { spellShield: w.flag("spellShield") }, overlay: true, usable: (self, world) => Math.abs(world.units[1 - self.side]!.x - self.x) <= wRange + 1e-6, roles: ["cc"] },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "line", range: eRange, width: e.field("effectRadius"), radius: e.field("effectRadius") / 2, speed: e.field("speed", "Missile speed"), collisionPet: true }, onHit: [{ type: "damage", damageType: "magic", amount: e.formula("Magic Damage") }, { type: "cc", cc: "slow", strength: netSlow, duration: netSeconds }], flags: { projectile: e.flag("projectile"), spellShield: e.flag("spellShield"), grounded: true }, failCastOnCC: ["suppression"], roles: ["escape", "damage", "cc"], decisive: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCooldown, cost: r.cost(), castTime: rCast, cancelOnInvalidTarget: true, retainTargetOnVisibilityLoss: true, delivery: { kind: "target", range: rRange }, channel: { duration: channelSeconds, interruptible: true, completionThreat: "Rshot", cancelAfter: Infinity, cancelAttackOtherAfter: Infinity }, flags: { projectile: false, spellShield: false }, estimate: (self, target) => evaluate(rDamage, self, target) * (1 + rCritical * derive(self).critChance), estimateDelay: (self, target) => channelSeconds + Math.max(0, Math.abs(target.x - self.x) - target.spec.base.radius) / rSpeed, overlay: true, roles: ["finisher"] },
      bullet,
    ];
    const trimReveal = (ctx: HookContext) => {
      for (const target of [ctx.self, ctx.enemy]) target.statuses = target.statuses.map((status) => status.memoKey === "caitlyn:Rreveal" && status.source === ctx.self.side ? { ...status, endTick: Math.min(status.endTick, ctx.tick + ticks(target === ctx.enemy ? revealLinger : 0)) } : status);
    };
    const cancelChannel = (ctx: HookContext) => {
      if (ctx.self.action?.kind === "channel" && ctx.self.action.ability === "R") ctx.self.action = undefined;
      ctx.self.cooldownReady.R = ctx.tick + ticks(cooldownAfterHaste(canceledCooldown, abilityHasteFor(ctx.self, { slot: "R" })));
      trimReveal(ctx);
    };
    const place = (ctx: HookContext, x: number) => {
      const existing = ctx.world.zones.filter((zone) => zone.owner === ctx.self.side && zone.ability === "W" && zone.kind === "trap").sort((a, b) => a.id - b.id);
      if (existing.length >= trapMaximum) ctx.world.zones = ctx.world.zones.filter((zone) => !existing.slice(0, existing.length - trapMaximum + 1).includes(zone));
      ctx.world.zones.push({ id: ctx.world.nextId++, owner: ctx.self.side, kind: "trap", seenTick: ctx.tick, x, radius: trapRadius, startTick: ctx.tick + ticks(trapArm), endTick: ctx.tick + ticks(trapSeconds), ability: "W", onHit: abilities[1]!.onHit, connects: true, scale: 1 });
    };
    const behavior: Behavior = (view) => {
      if (view.mode === "idle") return undefined;
      if (view.self.action?.kind === "channel" && view.self.action.ability === "R") return undefined;
      const reaction = react(view); if (reaction) return reaction;
      const ordinary = defaultBehavior(view);
      if (view.mode === "flee" || view.self.memory.tradeDone || view.self.action && view.self.action.kind !== "windup") return ordinary;
      const ultimate = abilities[3]!;
      if (canCast(view.world, view.self, ultimate) && inReach(ultimate, view.self, view.enemy) && !hasState(view.enemy, "invulnerable") && !hasState(view.enemy, "stasis") && expectedDamage(bullet.onHit!, view.self, view.enemy, true) >= view.enemy.hp) return { kind: "cast", ability: "R" };
      // Trap telegraphs last a second; prefer a target already held in place.
      if (ordinary?.kind === "cast" && ordinary.ability === "W" && heldUntil(view.enemy) < view.world.tick + ticks(trapArm)) {
        const shot = abilities[0]!;
        if (canCast(view.world, view.self, shot) && Math.abs(view.enemy.x - view.self.x) <= qRange + view.enemy.spec.base.radius) return { kind: "cast", ability: "Q" };
        return { kind: "attack" };
      }
      return ordinary;
    };
    kit.assume("Headshot starts at zero Count stacks, with no brush on the duel axis. Trap and net independently grant one target-specific 1.8-second Headshot; they preserve Count, still generate one Count stack, and take priority over a ready ordinary Headshot. Their range is 1300, including during the recoil. Headshot is one life-stealing physical packet with only its ordinary AD portion critically striking.");
    kit.assume("The pinned attack-cooldown refund is explicitly pending for test: this model uses its stated 50% period refund capped to allow an attack within 0.5 seconds of the preceding windup completion. A champion that springs a trap can't spring another, anywhere, for the three seconds of immunity that follow, as the trap's description says (26.21; the note that let another location's trap catch them is gone). Initial traps are not provided for free; the policy prefers trapping enemies already held through the one-second arm delay.");
    kit.assume("Piltover Peacemaker uses its 1300-unit targeting/missile range and initial/expanded widths. The first enemy pet or champion consumes full damage even through a spell shield; later enemies take the reduced packet unless still revealed by a trap. Its pinned attack-reset behavior is retained. Net uses its 800-unit range and 140-unit effect diameter; its cast-time suppression failure and recoil cancellation after immobilization are separate. Recoil crosses intervening terrain when its endpoint is clear; an endpoint inside terrain clips to the near edge without extending the dash, a conservative one-dimensional geometry assumption.");
    kit.assume("Ace in the Hole has its 0.375-second cast, one-second immobile channel and homing shot. Target true sight begins at declaration, ends one second after contact/cancel, and expires after four seconds if a projectile is destroyed. There are no other allied champions to intercept its shot. Ordinary self-reveal has no extra effect in the no-fog duel. The policy saves R for a predicted lethal hit.");
    kit.assume("The budget estimates one ordinary Headshot per six continuous attacks average Q damage per cooldown and one Ace in the Hole shot per cooldown plus cast time. It omits conditional net/trap Headshots rather than assuming every telegraphed control hits; actual fights retain charges, mana, interruptions and defenses.");
    return {
      abilities, behavior,
      attack: { onHitToPets: true, bonusRangeFor: (self, target) => target.petId === undefined && (marked(self, target, TRAP, Number(self.memory.caitlynTick ?? 0)) || marked(self, target, NET, Number(self.memory.caitlynTick ?? 0))) ? extended - self.spec.attack.range : 0 },
      budget: { damage: (self, target) => ({ physical: derive(self).ad * (headshot / 100 + criticalBonus * derive(self).critChance) * derive(self).attackSpeed / (maximum + 1) + evaluate(rDamage, self, target) * (1 + rCritical * derive(self).critChance) / (cooldownAfterHaste(rCooldown, derive(self).abilityHaste) + rCast) }) },
      hooks: {
        onStart(ctx) { ctx.memory.caitlynCount = 0; ctx.memory.caitlynTick = ctx.tick; },
        onTick(ctx) {
          ctx.memory.caitlynTick = ctx.tick;
          for (const zone of ctx.world.zones) if (zone.owner === ctx.self.side && zone.ability === "W" && zone.kind === "trap" && ctx.tick < Number(ctx.memory.caitlynTrapImmuneUntil ?? -1)) zone.startTick = Math.max(zone.startTick, Number(ctx.memory.caitlynTrapImmuneUntil));
          const action = ctx.self.action;
          if (action?.kind !== "channel" || action.ability !== "R") return;
          if (!ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self) || ctx.self.resurrection) { cancelChannel(ctx); return; }
          if (ctx.tick >= action.endTick) {
            ctx.self.action = undefined;
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rshot", seenTick: action.startTick - ticks(abilities[3]!.castTime), x: ctx.self.x, perTick: rSpeed / 30, homing: true, direction: directionTo(ctx.self, ctx.enemy), travelLeft: Infinity, projectile: true, connects: true, scale: 1, onHit: bullet.onHit! });
          }
        },
        onAttack(ctx) {
          const attack = ctx.self.action; if (attack?.kind !== "windup") return;
          const pet = attack.pet === undefined ? undefined : ctx.world.pets.find((candidate) => candidate.id === attack.pet);
          const ward = !!pet?.spec.hitPoints;
          const trap = !pet && marked(ctx.self, ctx.enemy, TRAP, ctx.tick), net = !pet && marked(ctx.self, ctx.enemy, NET, ctx.tick);
          const count = Number(ctx.memory.caitlynCount ?? 0), ordinary = count >= maximum && !trap && !net && !ward;
          if ((trap || net || ordinary) && !ward) {
            const bonus: Formula = { base: trap ? trapDamage.base : 0, ratios: { AD: (pet ? nonChampion : headshot) / 100, ...(trap ? trapDamage.ratios : {}) }, products: [{ ratio: criticalBonus, stats: ["AD", "critChance"] }] };
            attack.bonusPhysical = bonus; attack.uncancellable = true; attack.missileSpeed = headshotSpeed;
            if (trap) removeMark(ctx, TRAP); else if (net) removeMark(ctx, NET);
            ctx.memory.caitlynCount = ordinary ? 0 : Math.min(maximum, count + 1);
          } else ctx.memory.caitlynCount = Math.min(maximum, count + 1);
        },
        onAttackLaunch(ctx) { ctx.memory.caitlynLaunch = ctx.tick; },
        onCastStart(ctx) {
          if (ctx.ability.key === "E") ctx.memory.caitlynRecoilBlocked = false;
          if (ctx.ability.key === "R") {
            for (const target of [ctx.self, ctx.enemy]) {
              applyEffect(ctx.world, ctx.self, target, target === ctx.enemy ? { type: "state", state: "revealed", duration: revealMaximum } : { type: "mark", key: "caitlyn:RselfSight", duration: revealMaximum }, { ability: ctx.ability, scale: 1 });
              const status = target.statuses.at(-1); if (status?.key === "revealed" || status?.key === "caitlyn:RselfSight") status.memoKey = "caitlyn:Rreveal";
            }
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "W") place(ctx, ctx.self.x + directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) * Math.min(wRange, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
          if (ctx.ability.key === "E" && !ctx.memory.caitlynRecoilBlocked && canMove(ctx.self) && !ctx.self.statuses.some((status) => status.kind === "cc" && status.key === "ground")) {
            const distance = dashDistance(ctx.world, ctx.self, -directionTo(ctx.self, ctx.enemy) * netDistance);
            if (Math.abs(distance) > 1e-6) { const duration = ticks(Math.abs(distance) / netSpeed); ctx.self.action = { kind: "dash", ability: "E", startTick: ctx.tick, endTick: ctx.tick + duration, perTick: distance / duration, stopAtContact: false, unstoppable: false, crossTerrain: true }; }
          }
        },
        onCCApplied(ctx) { if (ctx.self.action?.kind === "cast" && ctx.self.action.ability === "E" && (ctx.cc === "ground" || !canMove(ctx.self))) ctx.memory.caitlynRecoilBlocked = true; },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Q" && marked(ctx.self, ctx.enemy, REVEAL, ctx.tick)) return [{ type: "damage", damageType: "physical", amount: qDamage }];
        },
        onAbilityHit(ctx) { if (ctx.ability.key === "W") grant(ctx, TRAP); else if (ctx.ability.key === "E") grant(ctx, NET); },
        onDamageDealt(ctx) { if (ctx.amount + ctx.absorbed > 0 && ctx.ability === q.name) ctx.self.attackReadyTick = ctx.tick; },
        onZoneTrigger(ctx) { if (ctx.zone.ability === "W") ctx.memory.caitlynTrapImmuneUntil = ctx.tick + ticks(immunitySeconds); },
        onMissileMove(ctx) {
          if (ctx.missile.source === "Q") for (const pet of ctx.world.pets) if (pet.owner !== ctx.self.side && Math.abs(pet.x - ctx.missile.x) <= pet.spec.radius + (ctx.missile.radius ?? 0) + 1e-6) ctx.memory[`caitlynQBefore:${pet.id}`] = pet.hp;
        },
        onMissileContact(ctx) {
          if (ctx.missile.source === "Q") { ctx.missile.onHit = [{ type: "damage", damageType: "physical", amount: qReduced }]; ctx.missile.radius = expandedWidth / 2; if (ctx.targetPet && ctx.targetPet.hp < Number(ctx.memory[`caitlynQBefore:${ctx.targetPet.id}`] ?? ctx.targetPet.hp)) ctx.self.attackReadyTick = ctx.tick; }
          if (ctx.missile.source === "Rshot") trimReveal(ctx);
        },
        onChannelInterrupt(ctx) { if (ctx.ability.key === "R") cancelChannel(ctx); },
      },
    };
  },
};
export default caitlyn;
