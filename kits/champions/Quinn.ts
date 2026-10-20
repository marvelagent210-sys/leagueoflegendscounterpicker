/** Quinn: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { ccTypes, derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { flat, ticks } from "./util";

/** Harrier's mark on the enemy, in kit memory: the tick it runs out. */
const MARK = "harrierUntil";

const quinn: KitModule = {
  champion: "Quinn",
  build(kit) {
    const innate = kit.ability("Harrier");
    const q = kit.ability("Blinding Assault");
    const w = kit.ability("Heightened Senses");
    const e = kit.ability("Vault");
    const r = kit.ability("Behind Enemy Lines");
    const skystrike = kit.ability("Skystrike");

    // Harrier: marked enemies take bonus damage from Quinn's next attack; Valor marks on his own between marks.
    const markSeconds = innate.quoted("mark enemies hit with Harrier for 4 seconds", 0);
    const harrier: Formula = {
      base: innate.levelValue("Quinn's basic attacks on-hit against Harrier targets are empowered to consume the mark"),
      ratios: { bonusAD: innate.quoted("(+ 40% bonus AD) bonus physical damage", 0) / 100 },
    };
    const autoMarkAfter = innate.quoted("if no Harrier targets exist for 1 second", 0);
    const abilityMarkCooldown = innate.quoted("Harrier goes on a 1-second cooldown if it's not already on cooldown", 0);
    // Valor's cooldown by critical strike chance, 0% to 100% in steps of 10%.
    const byCrit = harrierCooldowns(innate.record.fields.staticCooldown?.values[0]?.series, innate.fieldNumbers("staticCooldown"));
    kit.assume("Valor marks the enemy on his own once Harrier's cooldown (by critical strike chance) has passed and no mark has stood for 1 second.");

    // Heightened Senses: attack speed and movement speed when attacking a marked enemy.
    const sensesSpeed = w.fraction("Bonus Attack Speed");
    const sensesHaste = w.fraction("Bonus Movement Speed");
    const sensesFor = w.quoted("she gains bonus attack speed and bonus movement speed for 2 seconds", 0);

    // Blinding Assault: marks and nearsights the enemy.
    const nearsight = q.quoted("The primary target is nearsighted for 1.75 seconds if they are a champion, reducing their sight radius to 350 units", 0);
    const sight = q.quoted("The primary target is nearsighted for 1.75 seconds if they are a champion, reducing their sight radius to 350 units", 1);

    // Vault: leap to the enemy, knock it back a little, then bounce 525 units away.
    const [vaultSpeed = 2500, bounceSpeed = 850] = e.fieldValues("speed");
    const vaultRange = e.field("targetRange");
    const bounce = e.quoted("She then leaps back 525 units away from them", 0);
    const knockFor = e.quoted("knocking them back a very short distance over 0.5 seconds", 0);
    const vaultSlow = e.quoted("slowing them by 50% decaying over 1.5 seconds", 0) / 100;
    const vaultSlowFor = e.quoted("slowing them by 50% decaying over 1.5 seconds", 1);
    const vaultResetAfter = e.quoted("This delay is a fuzzy 0.25 to 0.5 seconds", 0);
    e.quote("Vault's knock back also interrupts the windup of basic attacks with uncancellable windups");
    kit.assume(`Vault's "very short" knock back is 50 units; its slow, decaying over ${vaultSlowFor} s, is taken as half its strength for the whole time.`);
    kit.assume(`Vault resets the attack timer and applies Harrier ${vaultResetAfter} s after the first dash ends, the minimum of its documented 0.25–0.5 s delay.`);

    // Behind Enemy Lines: after a 2-second channel, much faster until hit; Quinn uses it to get away.
    const unite = r.quoted("Quinn channels for 2 seconds, signaling Valor to pair up", 0);
    const flight = r.fraction("Total Movement Speed Increase");
    const grounded = r.quoted("causes her to lose the bonus total movement speed for 3 seconds", 0);
    kit.assume("Behind Enemy Lines is used only to get away, once the enemy is out of reach.");
    // Skystrike ends the flight when she attacks or casts Blinding Assault or Vault; crowd control ends it without one.
    skystrike.quote("Declaring a basic attack or casting Blinding Assault or Vault during Behind Enemy Lines automatically activates Skystrike");
    r.quote("Becoming immobilized, grounded, or silenced ends Behind Enemy Lines immediately and puts it on cooldown without performing Skystrike");
    const skyRadius = skystrike.field("effectRadius");
    const skyHit: Effect = { type: "damage", damageType: "physical", amount: skystrike.formula("Physical Damage"), label: skystrike.name };

    const marked = (unit: Unit, tick: number) => tick < Number(unit.memory[MARK] ?? -1);
    const flying = (unit: Unit) => unit.statuses.some((s) => s.kind === "state" && s.key === "ghosted" && s.ability === "R");
    /** The flight ends: Behind Enemy Lines' cooldown starts (it waits for the ghosting to end). */
    const land = (ctx: HookContext, strike: boolean) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.ability === "R") && s.memoKey !== "R:moveSpeedPercent");
      if (!strike) return;
      ctx.log(`${skystrike.name}`);
      if (Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius <= skyRadius) {
        ctx.apply(skyHit);
        mark(ctx);
      }
    };
    const endMark = (ctx: HookContext) => {
      // Valor's static cooldown starts when its own mark ends. Ability marks incur only
      // a short cooldown if Valor's existing cooldown is not already running.
      const ready = Number(ctx.memory.harrierReady ?? 0);
      if (ctx.memory.harrierSource === "valor") ctx.memory.harrierReady = ctx.tick + ticks(valorCooldown(ctx.self));
      else if (ctx.tick >= ready) ctx.memory.harrierReady = ctx.tick + ticks(abilityMarkCooldown);
      ctx.memory.harrierFree = ctx.tick + ticks(autoMarkAfter);
      ctx.memory[MARK] = -1;
      ctx.memory.harrierSource = "";
    };
    const mark = (ctx: HookContext, source: "ability" | "valor" = "ability") => {
      if (marked(ctx.self, ctx.tick)) endMark(ctx);
      ctx.memory[MARK] = ctx.tick + ticks(markSeconds);
      ctx.memory.harrierSource = source;
    };
    const senses = (ctx: HookContext) => {
      ctx.buff("sensesSpeed", "attackSpeed", sensesSpeed, sensesFor);
      ctx.buff("sensesHaste", "moveSpeedPercent", sensesHaste, sensesFor);
    };
    const valorCooldown = (unit: Unit) => {
      const crit = Math.min(1, Math.max(0, derive(unit).critChance)) * 10;
      const low = Math.floor(crit);
      const a = byCrit[low] ?? byCrit[0] ?? 7;
      const b = byCrit[Math.min(10, low + 1)] ?? a;
      return a + (b - a) * (crit - low);
    };

    const behavior: Behavior = (view) => {
      const flight = view.self.spec.abilities.find((a) => a.key === "R");
      const away = view.distance > view.enemy.spec.attack.range + 300;
      if (view.mode === "flee" && away && flight && canCast(view.world, view.self, flight)) return { kind: "cast", ability: "R" };
      return defaultBehavior(view);
    };

    const vaultDash = vaultRange / vaultSpeed;
    const finishVault = (ctx: HookContext, at: number) => {
      const chain = ctx.self.chains.E;
      if (chain?.stage === 1) ctx.self.chains.E = { ...chain, castTick: at, until: at + ticks(vaultResetAfter) };
      ctx.memory.vaultPending = false;
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
        onHit: [
          { type: "damage", damageType: "physical", amount: q.formula("Physical Damage") },
          { type: "cc", cc: "nearsight", duration: nearsight, strength: sight },
        ],
        flags: { projectile: q.flag("projectile") ?? true },
      },
      {
        key: "E",
        name: e.name,
        slot: "E",
        cooldown: e.cooldown(),
        cost: e.cost(),
        castTime: 0,
        chainCooldown: "first",
        delivery: { kind: "dash", direction: "target", distance: vaultRange, speed: vaultSpeed, hitRadius: 0 },
        onHit: [
          { type: "damage", damageType: "physical", amount: e.formula("Physical damage") },
          { type: "displace", direction: "away", distance: 50, duration: knockFor, interruptUncancellable: true },
          { type: "cc", cc: "slow", strength: vaultSlow / 2, duration: vaultSlowFor },
        ],
        flags: { spellShield: e.flag("spellShield") ?? true, knockdown: e.flag("knockdown") ?? true },
      },
      {
        key: "E2",
        name: `${e.name} (bounce)`,
        slot: "E",
        cooldown: 0,
        castTime: 0,
        // Initially allow the longest first dash; finishVault re-anchors to its actual end.
        chain: { root: "E", index: 2, window: vaultDash + vaultResetAfter, auto: true },
        delivery: { kind: "dash", direction: "away", distance: bounce, speed: bounceSpeed },
        onSelf: [{ type: "resetAttack" }],
        usable: () => false,
        flags: { knockdown: true },
      },
      {
        key: "R",
        name: r.name,
        slot: "R",
        cooldown: r.cooldown(),
        cost: r.cost(),
        castTime: r.castTime(),
        // Its cooldown starts once the flight is over.
        cooldownAfter: "state",
        delivery: { kind: "self" },
        channel: {
          duration: unite,
          interruptible: true,
          onCompleteSelf: [
            { type: "state", state: "ghosted", duration: 30 },
            { type: "stat", stat: "moveSpeedPercent", amount: flat(flight), duration: 30 },
          ],
        },
        roles: ["escape"],
      },
    ];

    const harrierHit: Effect = { type: "damage", damageType: "physical", amount: harrier, label: innate.name };

    return {
      behavior,
      abilities,
      budget: {
        damage: (self, target) => ({ physical: evaluate(harrier, self, target) / Math.max(valorCooldown(self), autoMarkAfter) }),
      },
      hooks: {
        onTick(ctx) {
          // Shielded or interrupted first dashes have no onAbilityHit callback, but their
          // documented attack reset still counts from when the dash ended.
          if (ctx.memory.vaultPending && !(ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E")) finishVault(ctx, ctx.tick - 1);
          if (Number(ctx.memory[MARK] ?? -1) >= 0 && !marked(ctx.self, ctx.tick)) endMark(ctx);
          if (flying(ctx.self)) {
            const cc = ccTypes(ctx.self);
            if ([...cc].some((type) => IMMOBILIZING.has(type) || type === "ground" || type === "silence")) land(ctx, false);
          }
          // Valor marks the enemy when no mark has stood for a while.
          const free = Number(ctx.memory.harrierFree ?? 0);
          if (!marked(ctx.self, ctx.tick) && ctx.tick >= free && ctx.tick >= Number(ctx.memory.harrierReady ?? 0) && ctx.enemy.alive && Math.abs(ctx.enemy.x - ctx.self.x) <= 1500) mark(ctx, "valor");
        },
        onAttack(ctx) {
          if (flying(ctx.self)) land(ctx, true);
          if (marked(ctx.self, ctx.tick)) senses(ctx);
        },
        onCastStart(ctx) {
          if (flying(ctx.self) && (ctx.ability.key === "Q" || ctx.ability.key === "E")) land(ctx, true);
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") {
            ctx.memory.vaultPending = true;
            ctx.memory.vaultMarkPending = false;
          }
          if (ctx.ability.key === "E2" && ctx.memory.vaultMarkPending) {
            mark(ctx);
            ctx.memory.vaultMarkPending = false;
          }
        },
        onAttackHit(ctx) {
          if (!marked(ctx.self, ctx.tick)) return;
          endMark(ctx);
          senses(ctx);
          ctx.apply(harrierHit);
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") mark(ctx);
          if (ctx.ability.key === "E") {
            finishVault(ctx, ctx.tick);
            ctx.memory.vaultMarkPending = true;
          }
        },
        onDamageTaken(ctx) {
          // Hit while flying: Behind Enemy Lines' speed is lost for 3 seconds.
          if (ctx.self.statuses.some((s) => s.kind === "stat" && s.key === "moveSpeedPercent" && s.memoKey === "R:moveSpeedPercent")) {
            ctx.buff("grounded", "moveSpeedPercent", -flight, grounded);
          }
        },
      },
    };
  },
};

/** Harrier's static cooldown at 0%, 10%, ... 100% critical strike chance. */
function harrierCooldowns(series: { kind: string; points?: Array<number | string>; values?: Array<number | string> } | undefined, listed: number[]): number[] {
  if (series?.kind === "variable" && series.values) return series.values.map(Number);
  return listed.length > 0 ? listed : [7];
}

export default quinn;
