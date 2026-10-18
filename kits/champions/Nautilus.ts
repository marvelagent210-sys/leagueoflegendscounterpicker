/** Nautilus: pinned ability records supply the damage, timings and interaction exceptions. */
import type { KitModule } from "../../engine/kits/compile";
import { abilityHit, directionTo } from "../../engine/sim/combat";
import { expectedDamage } from "../../engine/sim/behavior";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import { areaAt, ticks } from "./util";

const nautilus: KitModule = {
  champion: "Nautilus",
  build(kit) {
    const passive = kit.ability("Staggering Blow");
    const q = kit.ability("Dredge Line");
    const w = kit.ability("Titan's Wrath");
    const e = kit.ability("Riptide");
    const r = kit.ability("Depth Charge");
    const passiveDamage = passive.levelValue("basic attacks are empowered to deal", 0);
    const passiveRoot = passive.levelValue("basic attacks are empowered to deal", 1);
    const passiveCooldown = passive.field("targetCooldown");
    passive.quote("Spell shield will block the root but not the bonus damage");
    passive.quote("Staggering Blow's enhanced attack can be blocked and dodged (the on-target cooldown will still be applied)");
    passive.quote("It will fail to trigger while he is blinded");
    const anchorSeconds = q.quoted("both over 0.9 seconds");
    const anchorStun = q.quoted("stuns them for 1 second");
    const anchorRange = q.field("range");
    const anchorSpeed = q.field("speed");
    q.quote("Spell shield will block the ability but Nautilus will still dash partway to the target");
    q.quote("Nautilus will dash all the way to the target's location if Dredge Line executed them or they negated the displacement");
    q.quote("Displacement immunity will not resist the application of the stun");
    q.quote("Nautilus is unable to move or attack while Dredge Line is in flight");
    q.quote("He can cast any of his abilities during the dash");
    const wrathSeconds = w.quoted("grants himself a shield for 6 seconds");
    const painDelay = w.quoted("the other half dealt after 1.25 seconds");
    const painExtra = w.quoted("debuff can last up to 0.25 seconds after dealing the second instance of damage");
    const painDamage = w.formula("Magic Damage per Instance");
    const wrathCooldown = w.cooldown();
    w.quote("Pain of Wrath damage over time debuff gains another stack when reapplied to the target, but doesn't restart its tick timer");
    w.quote("Additional stacks of Pain of Wrath expire when the original debuff does and do not deal any additional damage");
    w.quote("Pain of Wrath will be applied by Nautilus's basic attack if he is affected by Titan's Wrath at the start of the attack windup, even if Titan's Wrath expires during the windup");
    w.quote("Pain of Wrath will not be applied if the basic attack is dodged or blocked, but will be applied if it is missed");
    w.quote("Spell shield will block the ability (but only a single application)");
    const radii = e.fieldNumbers("effectRadius");
    const [firstNear = 0, firstFar = 0, secondNear = 0, secondFar = 0, thirdNear = 0, thirdFar = 0] = radii;
    if (radii.length !== 6 || firstNear !== 0) throw new Error("Nautilus: Riptide's three ring bounds changed");
    const ringOffset = e.quoted("at an offset of 25 units in front of Nautilus at the original cast location");
    const secondDelay = e.quoted("the second wave at 0.297 seconds");
    const thirdDelay = e.quoted("the third wave at 0.561 seconds");
    const slowSeconds = e.quoted("decays over 1.5 seconds");
    const slow = e.fraction("Slow");
    const waveDamage = e.formula("Magic Damage");
    const chargeSpeed = r.fieldNumbers("speed");
    const [chargeInitial = 0, chargeAcceleration = 0] = chargeSpeed;
    if (chargeSpeed.length !== 2) throw new Error("Nautilus: Depth Charge's acceleration changed");
    const finalDamage = r.formula("Increased Damage");
    const chargeCooldown = r.cooldown();
    const chargeCastTime = r.castTime();
    const finalKnockup = r.number("Knock Up Duration");
    const chargeStun = r.number("Stun Duration");
    const seekingLimit = r.quoted("primary target moves more than 3000 units away from it");
    r.quote("Depth Charge will not stop chasing if the target dies or becomes untargetable");
    r.quote("Displacement immunity will not resist the application of the stun");
    r.quote("If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, this ability will cancel but does not go on cooldown nor pay its cost");
    kit.assume("Dredge Line's simultaneous pull and dash split the available gap equally over 0.9 seconds; the pinned source gives the duration but no separate travel distances. A target negating displacement makes Nautilus traverse the full gap instead.");
    kit.assume("Dredge Line aims at the enemy champion; terrain anchoring and its 50% refund are not chosen by this one-dimensional duel behavior.");
    kit.assume("Riptide uses the actual three annuli, measured delays and 25-unit forward offsets. Its slow decays linearly over 1.5 seconds because the source does not specify the decay curve.");
    kit.assume("Depth Charge starts at Nautilus's center because its facing-dependent launch offset is unspecified. It accelerates by 466.67 units per second each second on the 30 Hz simulation clock; only the primary champion's final eruption is modeled in a duel.");
    kit.assume("Pain of Wrath uses a 0.25-second post-tick debuff tail, the source's stated maximum. Reapplications add their immediate hit but neither refresh nor increase the original delayed hit.");
    kit.assume("The stat budget estimates Titan's Wrath attack damage using six seconds of shield uptime per cooldown, and Staggering Blow once per six seconds; shield breakage and attack avoidance are resolved in actual fights.");

    const waveEffects: Effect[] = [
      { type: "damage", damageType: "magic", amount: waveDamage, label: e.name },
      { type: "cc", cc: "slow", duration: slowSeconds, strength: slow },
    ];
    const chargeEffects: Effect[] = [
      { type: "damage", damageType: "magic", amount: finalDamage, label: r.name },
      { type: "displace", direction: "away", distance: 0, duration: finalKnockup },
      { type: "cc", cc: "stun", duration: chargeStun },
    ];
    const unlocked = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.ability === "Q" && s.kind === "state" && (s.key === "noMovement" || s.key === "noAttacks")));
      ctx.memory.anchorInFlight = false;
    };
    const anchorDash = (ctx: HookContext, full: boolean) => {
      unlocked(ctx);
      if (!ctx.self.alive) return;
      const dir = directionTo(ctx.self, ctx.enemy);
      const gap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
      const count = Math.max(1, ticks(anchorSeconds));
      const travel = gap * (full ? 1 : 0.5);
      if (travel <= 0) return;
      ctx.self.action = { kind: "dash", ability: "Q", startTick: ctx.tick, endTick: ctx.tick + count, perTick: dir * travel / count, stopAtContact: true, unstoppable: false };
    };

    const abilities: AbilitySpec[] = [
      {
        key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cost: q.cost(), castTime: q.castTime(),
        overlay: true,
        delivery: { kind: "line", range: anchorRange, width: q.field("width", "Unit collision"), speed: anchorSpeed },
        onHit: [
          { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") },
          { type: "cc", cc: "stun", duration: anchorStun },
        ],
        flags: { projectile: true, grounded: true, knockdown: true },
        roles: ["damage", "cc", "engage"],
      },
      {
        key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: w.castTime(),
        overlay: true,
        delivery: { kind: "self" },
        onSelf: [
          { type: "shield", amount: w.formula("Shield Strength"), duration: wrathSeconds },
          { type: "resetAttack" },
        ],
        // The hook resolves this spell packet for each eligible attack, including its blinded exception.
        onHit: [{ type: "damage", damageType: "magic", amount: painDamage, label: "Pain of Wrath", noLifeSteal: true }],
        roles: ["buff", "defense", "damage"],
      },
      {
        key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(),
        overlay: true,
        delivery: { kind: "aura", radius: firstFar },
        onHit: waveEffects,
        falloff: { group: "riptide", window: thirdDelay + 1 / 30, per: 0.5, floor: 0.5 },
      },
      {
        key: "R", name: r.name, slot: "R", cooldown: r.cooldown(), cost: r.cost(), castTime: r.castTime(),
        overlay: true, cancelOnInvalidTarget: true,
        delivery: { kind: "target", range: r.field("targetRange") },
        // onCast creates the accelerating homing charge with protection against target disappearance.
        estimate: (self, target) => evaluate(finalDamage, self, target),
        roles: ["damage", "cc"], flags: { projectile: false },
      },
    ];
    return {
      attack: { blockStopsOnHit: true },
      abilities,
      budget: {
        damage(self, target) {
          const d = derive(self);
          const uptime = Math.min(1, wrathSeconds * (1 + d.abilityHaste / 100) / wrathCooldown);
          const immediate = evaluate(painDamage, self, target);
          const wrath = immediate * (d.attackSpeed + Math.min(d.attackSpeed, 1 / (painDelay + painExtra))) * uptime;
          // Generic budgeting already counts W's exposed immediate packet once per cooldown and E's first wave.
          return {
            physical: passiveDamage / passiveCooldown,
            magic: Math.max(0, wrath - immediate * (1 + d.abilityHaste / 100) / wrathCooldown)
              + evaluate(finalDamage, self, target) / (chargeCooldown / (1 + d.abilityHaste / 100) + chargeCastTime),
          };
        },
      },
      hooks: {
        onAttack(ctx) {
          const action = ctx.self.action;
          if (action?.kind !== "windup" || action.pet !== undefined) return;
          const stagger = !action.blinded && ctx.tick >= Number(ctx.memory.staggerReady ?? 0);
          ctx.memory.staggerArmed = stagger;
          ctx.memory.attackBlinded = action.blinded;
          ctx.memory.painArmed = ctx.self.statuses.some((s) => s.kind === "shield" && s.key === "W" && s.source === ctx.self.side && s.value > 0);
          if (stagger) action.onHit.push(
            { type: "damage", damageType: "physical", amount: { base: passiveDamage }, label: passive.name, noLifeSteal: true },
            { type: "cc", cc: "root", duration: passiveRoot, spellShield: true },
          );
        },
        onAttackResolved(ctx) {
          if (ctx.memory.staggerArmed) ctx.memory.staggerReady = ctx.tick + ticks(passiveCooldown);
          ctx.memory.staggerArmed = false;
          if (ctx.memory.painArmed && !ctx.blocked && (!ctx.missed || ctx.memory.attackBlinded)) {
            const wrath = abilities.find((a) => a.key === "W");
            if (wrath) abilityHit(ctx.world, ctx.self, ctx.enemy, wrath, wrath.onHit ?? []);
          }
          ctx.memory.painArmed = false;
        },
        onAbilityContact(ctx) {
          if (ctx.ability.key !== "Q") return;
          const lethal = !ctx.defense && !hasState(ctx.enemy, "invulnerable") && expectedDamage([...ctx.effects], ctx.self, ctx.enemy, true) >= ctx.enemy.hp;
          const full = lethal || hasState(ctx.enemy, "displacementImmune") || hasState(ctx.enemy, "ccImmune");
          const gap = Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.self.spec.base.pathingRadius - ctx.enemy.spec.base.pathingRadius);
          anchorDash(ctx, full);
          return [...ctx.effects, { type: "displace", direction: "toward", distance: gap / 2, duration: anchorSeconds }];
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "W") return;
          const key = `painOfWrath:${ctx.self.side}`;
          if (ctx.enemy.statuses.some((s) => s.kind === "mark" && s.key === key && s.endTick > ctx.tick)) return;
          ctx.apply({ type: "mark", key, duration: painDelay + painExtra });
          ctx.world.scheduled.push({
            tick: ctx.tick + ticks(painDelay), owner: ctx.self.side, target: ctx.enemy.side, scale: 1, ability: "W",
            effects: [{ type: "damage", damageType: "magic", amount: { base: evaluate(painDamage, ctx.self, ctx.enemy) }, label: "Pain of Wrath (persistent)", persistent: true, noLifeSteal: true }],
          });
        },
        onCastStart(ctx) {
          if (ctx.ability.key === "E") {
            ctx.memory.riptideOrigin = ctx.self.x;
            ctx.memory.riptideDirection = directionTo(ctx.self, ctx.enemy);
          }
          if (ctx.ability.key === "R") ctx.memory.chargeSeen = ctx.tick;
        },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.memory.anchorInFlight = true;
            ctx.memory.anchorLaunch = ctx.tick;
            const duration = anchorRange / anchorSpeed + 1 / 30;
            ctx.apply({ type: "state", state: "noAttacks", duration }, true);
            ctx.apply({ type: "state", state: "noMovement", duration }, true);
          }
          if (ctx.ability.key === "E") {
            const center = Number(ctx.memory.riptideOrigin ?? ctx.self.x) + Number(ctx.memory.riptideDirection ?? directionTo(ctx.self, ctx.enemy)) * ringOffset;
            for (const [near, far, delay] of [[secondNear, secondFar, secondDelay], [thirdNear, thirdFar, thirdDelay]]) {
              if (near === undefined || far === undefined || delay === undefined) continue;
              for (const dir of [-1, 1]) areaAt(ctx, "E", center + dir * (near + far) / 2, (far - near) / 2, delay, waveEffects);
            }
          }
          if (ctx.ability.key === "R") {
            ctx.memory.chargeLaunch = ctx.tick;
            ctx.world.missiles.push({
              id: ctx.world.nextId++, owner: ctx.self.side, source: "R", seenTick: Number(ctx.memory.chargeSeen ?? ctx.tick),
              x: ctx.self.x, perTick: chargeInitial / 30, homing: true, direction: directionTo(ctx.self, ctx.enemy),
              travelLeft: Number.POSITIVE_INFINITY, projectile: false, connects: true, scale: 1, onHit: chargeEffects, hitsUntargetable: true,
            });
          }
        },
        onTick(ctx) {
          if (ctx.memory.anchorInFlight && ctx.tick > Number(ctx.memory.anchorLaunch ?? ctx.tick) && !ctx.world.missiles.some((m) => m.owner === ctx.self.side && m.source === "Q")) unlocked(ctx);
          const decayed = ctx.enemy.statuses.map((s) => s.kind === "cc" && s.key === "slow" && s.source === ctx.self.side && s.ability === "E"
            ? { ...s, value: slow * Math.max(0, (s.endTick - ctx.tick) / ticks(slowSeconds)) } : s);
          if (decayed.some((s, i) => s !== ctx.enemy.statuses[i])) ctx.enemy.statuses = decayed;
          for (const missile of ctx.world.missiles) {
            if (missile.owner !== ctx.self.side || missile.source !== "R") continue;
            missile.perTick = (chargeInitial + chargeAcceleration * (ctx.tick - Number(ctx.memory.chargeLaunch ?? ctx.tick)) / 30) / 30;
            if (Math.abs(ctx.enemy.x - missile.x) > seekingLimit) {
              missile.travelLeft = 0;
              missile.connects = false;
              ctx.log("Depth Charge erupts before reaching its distant target");
            }
          }
        },
      },
    };
  },
};

export default nautilus;
