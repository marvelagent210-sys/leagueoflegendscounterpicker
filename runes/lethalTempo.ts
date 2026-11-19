/** Lethal Tempo's timed stacks and separate adaptive projectile in manual duels. */
import { TICK_RATE, toTicks } from "../engine/rules/time";
import { applyEffect, inStasis, isUntargetable } from "../engine/sim/combat";
import { derive } from "../engine/sim/derived";
import type { CombatIdentity, FighterSpec, HookContext } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";
import type { RuneEffectBuild } from "./effectRuntime";

type Rules = CombatRuneRules["lethalTempo"];
const STACK = "rune-effects:attackSpeed:8008";
const BOLT = "rune:lethal-tempo:bolt";
const BURST = "rune:lethal-tempo:burst:";
const LABEL = "Lethal Tempo";
const EPSILON = 1e-6;

export function checkedLethalTempoRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Lethal Tempo requires reviewed numeric rules");
  const rule = value as Rules;
  const validInterval = (seconds: number) => Number.isFinite(seconds) && toTicks(seconds) > 0 && Number.isSafeInteger(toTicks(seconds));
  if (rule.modelLevel !== 20 || rule.maxStacks !== 6
    || !validInterval(rule.stackDuration) || !validInterval(rule.decayInterval)
    || !Number.isSafeInteger(toTicks(rule.stackDuration) + (rule.maxStacks - 1) * toTicks(rule.decayInterval))
    || ![rule.boltDamage, rule.boltSpeed, rule.bonusAttackSpeedRatio].every(n => Number.isFinite(n) && n > 0)
    || ![rule.attackSpeedPerStack, rule.rangedAttackSpeedRatio, rule.rangedBoltRatio].every(n => Number.isFinite(n) && n > 0 && n <= 1)
    || rule.boltGate !== "max-stacks-before-attack" || rule.boltStatModel !== "at-launch" || rule.boltTravelModel !== "fixed-endpoint") {
    throw new Error("Invalid Lethal Tempo numeric rules or stack, stat or travel policy");
  }
  return { ...rule };
}

function livingOwner(ctx: HookContext): boolean {
  return ctx.world.units[ctx.self.side] === ctx.self && ctx.self.petId === undefined
    && ctx.self.spec.unitClass !== "clone" && ctx.self.alive && ctx.self.hp > 0;
}

function qualifies(ctx: HookContext, target: CombatIdentity): boolean {
  return target.side !== ctx.self.side && (target.kind === "champion" || (target.kind === "clone" && target.petId !== undefined));
}

export function buildLethalTempo(form: FighterSpec, input: Pick<CombatRuneRules, "lethalTempo">): RuneEffectBuild {
  if (form.adaptiveType !== "Physical" && form.adaptiveType !== "Magic") {
    throw new Error("Lethal Tempo requires the champion's explicit adaptive damage tie type");
  }
  const rules = checkedLethalTempoRules(input?.lethalTempo);
  const duration = toTicks(rules.stackDuration), interval = toTicks(rules.decayInterval);
  const perTick = rules.boltSpeed / TICK_RATE;
  const stackValue = (ctx: HookContext): number => rules.attackSpeedPerStack * (ctx.self.spec.attack.ranged ? rules.rangedAttackSpeedRatio : 1);

  function launchBolt(ctx: HookContext, scale: number): void {
    const { self, enemy, tick, world } = ctx;
    if (world.units[enemy.side] !== enemy || !enemy.alive || enemy.hp <= 0 || inStasis(enemy) || isUntargetable(enemy, self)) return;
    const { bonusAd, ap, bonusAttackSpeed } = derive(self);
    const tie = self.spec.adaptiveType;
    if (![bonusAd, ap, bonusAttackSpeed].every(Number.isFinite) || (tie !== "Physical" && tie !== "Magic")) {
      throw new Error("Lethal Tempo needs finite current bonus AD, AP and attack speed and an explicit adaptive tie type");
    }
    const damageType = bonusAd > ap ? "physical" : ap > bonusAd ? "magic" : tie === "Magic" ? "magic" : "physical";
    const base = rules.boltDamage * (self.spec.attack.ranged ? rules.rangedBoltRatio : 1);
    const damage = base * Math.max(0, 1 + bonusAttackSpeed * rules.bonusAttackSpeedRatio);
    const distance = Math.abs(enemy.x - self.x), ticks = Math.max(1, Math.ceil(distance / perTick));
    const expiresTick = tick + ticks + 1;
    if (!Number.isFinite(damage) || !Number.isSafeInteger(expiresTick)) {
      throw new Error("Lethal Tempo needs finite bolt damage and positions and a safe arrival tick");
    }
    world.missiles.push({
      id: world.nextId++, source: BOLT, owner: self.side, seenTick: tick,
      x: self.x, originX: self.x, perTick, expiresTick, travelLeft: distance,
      direction: enemy.x < self.x ? -1 : 1, homing: false, connects: false,
      projectile: true, interceptable: true, perceptionHidden: true, scale,
      onHit: [{ type: "damage", damageType, amount: { base: damage }, label: LABEL, petDamageCategory: "proc" }],
    });
  }

  function gain(ctx: HookContext, boltScale: number, burst?: number): void {
    if (burst !== undefined) {
      const key = BURST + burst;
      if (ctx.memory[key] === true) return;
      ctx.memory[key] = true;
    }
    const held = ctx.self.statuses.filter(status => status.memoKey === STACK && status.endTick > ctx.tick).length;
    const count = Math.min(rules.maxStacks, held + 1);
    const value = stackValue(ctx);
    ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== STACK);
    for (let i = 0; i < count; i++) {
      ctx.self.statuses.push({ kind: "stat", key: "attackSpeed", memoKey: STACK,
        source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + duration + i * interval, value, ability: LABEL });
    }
    if (held >= rules.maxStacks && boltScale > 0) launchBolt(ctx, boltScale);
  }

  return {
    hooks: {
      onFormChanged(ctx) {
        ctx.self.statuses = ctx.self.statuses.filter(status => status.memoKey !== STACK || status.endTick > ctx.tick);
        const value = stackValue(ctx);
        for (const status of ctx.self.statuses) {
          if (status.memoKey === STACK) status.value = value;
        }
      },
      onBasicAttackLaunched(ctx) {
        const { launch, enemy } = ctx;
        if (!livingOwner(ctx) || !launch.target || !qualifies(ctx, launch.target) || launch.onAttackEffects === "none"
          || !enemy.alive || enemy.hp <= 0 || inStasis(enemy) || isUntargetable(enemy, ctx.self)) return;
        gain(ctx, launch.onAttackEffects === "all" && launch.target.kind === "champion" ? 1 : 0);
      },
      onResolvedOnHit(ctx) {
        const hit = ctx.onHit;
        if (!livingOwner(ctx) || !qualifies(ctx, hit.target) || hit.blocked || hit.onAttackScale === undefined
          || !Number.isFinite(hit.onAttackScale) || hit.onAttackScale <= 0
          || !Number.isFinite(hit.incomingScale) || hit.incomingScale <= 0) return;
        gain(ctx, hit.target.kind === "champion" ? hit.onAttackScale * hit.incomingScale : 0, hit.attackBurst);
      },
      onPrimaryBurstRound(ctx) {
        if (!livingOwner(ctx) || ctx.enemy.side === ctx.self.side) return;
        const champion = ctx.world.units[ctx.enemy.side] === ctx.enemy && ctx.enemy.spec.unitClass !== "clone";
        if (champion || (ctx.enemy.petId !== undefined && ctx.enemy.spec.unitClass === "clone")) {
          gain(ctx, champion ? ctx.scale : 0, ctx.burst);
        }
      },
      onMissileEnd(ctx) {
        const { missile, enemy, self, world } = ctx;
        if (missile.source !== BOLT || ctx.reason !== "range" || missile.travelLeft > EPSILON
          || !enemy.alive || enemy.hp <= 0 || inStasis(enemy) || isUntargetable(enemy, self)
          || Math.abs(enemy.x - missile.x) > enemy.spec.base.radius + EPSILON) return;
        for (const effect of missile.onHit) {
          applyEffect(world, self, enemy, effect, { scale: missile.scale, ...(missile.originX !== undefined ? { originX: missile.originX } : {}) });
        }
      },
    },
    assumptions: [
      "Lethal Tempo starts with zero stacks. Completed attacks against the opposing champion or a classified champion clone add one stack; reviewed contact-based replacements gain one on each accepted qualified application. The six-second deadline refreshes with each gain and each subsequent decay occurs 0.3 seconds apart. Due stacks expire before a new attack.",
      "Ordinary attack speed limits still apply. Held stacks immediately use 6% melee or 4.8% ranged speed per stack when the champion changes form.",
      "A bolt launches when six stacks were already held before the triggering attack. It uses the current form, derived bonus AD and AP, and uncapped bonus attack speed including the rune's stacks. Reduced on-attack damage effectiveness and fractional hit shares scale the bolt's damage. An accepted positive hit share gives a full stack.",
      "Bolts are separate proc damage against the opposing champion body. Clones can grant stacks. The model launches the bolt toward the original endpoint at 2,500 units per second on the simulator's one-dimensional line. The locked champion's hitbox must still cover the endpoint, and native projectile blockers and target defenses apply. Spell shields and attack effects remain separate. Exact server timing, geometry, clone bolt damage and effects after duel termination remain outside this model.",
    ],
  };
}
