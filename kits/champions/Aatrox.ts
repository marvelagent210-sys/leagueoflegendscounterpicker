/** Aatrox: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { abilityReady, canCast } from "../../engine/sim/actions";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { type Behavior, type Command, defaultBehavior } from "../../engine/sim/behavior";
import { derive } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { areaAt, attackDamage, flat, maxHp, ticks } from "./util";

const SWEET = "The Darkin Blade (sweet spot)";

const aatrox: KitModule = {
  champion: "Aatrox",
  build(kit) {
    const innate = kit.ability("Deathbringer Stance");
    const q = kit.ability("The Darkin Blade");
    const w = kit.ability("Infernal Chains");
    const e = kit.ability("Umbral Dash");
    const r = kit.ability("World Ender");

    // Deathbringer Stance: every few seconds the next attack deals a share of maximum health and heals for it.
    const stanceCooldown = innate.field("staticCooldown");
    const stanceRange = innate.quoted("empowers his next basic attack to gain 50 bonus range", 0);
    const stanceShare = innate.levelValue("deal bonus magic damage equal to") / 100;
    const stanceCut = innate.quoted("Deathbringer Stance's current cooldown is reduced by 2 seconds, doubled to 4", 0);
    const stanceSweetCut = innate.quoted("Deathbringer Stance's current cooldown is reduced by 2 seconds, doubled to 4", 1);
    // The Darkin Blade: three strikes, each with a sweet spot at its far end (the third's is its middle).
    q.quote("Aatrox can activate The Darkin Blade three times");
    const cooldownStart = q.record.fields.cooldownStart;
    if (cooldownStart !== "cooldown starts on first cast and restarts on each successive recast") throw new Error("Aatrox's Darkin Blade cooldown-start rule needs review");
    kit.evidence.push({ ability: q.name, page: q.record.page.title, revid: q.record.page.revid, text: `Cooldown starts: ${cooldownStart}` });
    const between = q.quoted("with a 1-second static cooldown between casts", 0);
    const strikeCooldown = q.cooldown();
    const window = q.quoted("If Aatrox does not recast the ability within 4 seconds of the previous cast", 0);
    const knockUp = q.quoted("are also knocked up for 0.25 seconds", 0);
    const firstLength = q.quoted("Aatrox's first strike affects a 625 × 180-unit rectangular area", 0);
    const secondBehind = q.quoted("The hitbox begins 100-units behind Aatrox and extends 475-units in front of him", 0);
    const secondFront = q.quoted("The hitbox begins 100-units behind Aatrox and extends 475-units in front of him", 1);
    const thirdRadius = q.quoted("Aatrox's third strike affects a 300-radius circular area centered on a target location that is 200 units in front of him", 0);
    const thirdOffset = q.quoted("Aatrox's third strike affects a 300-radius circular area centered on a target location that is 200 units in front of him", 1);
    const thirdSweet = q.quoted("with a 180-radius Sweetspot within", 0);
    const tipLength = 150;
    kit.assume(`The first and second strikes' sweet spots are their last ${tipLength} units (the wiki gives no size).`);
    // Infernal Chains: a tether that pulls back unless walked out of.
    const tetherSeconds = w.quoted("a tether is formed between the target and the ground beneath them for 1.5 seconds", 0);
    const tetherRadius = 225;
    const pullSeconds = 0.25;
    kit.assume(`Infernal Chains' tether breaks ${tetherRadius} units from where it hit (the wiki gives no size); its pull back is a ${pullSeconds}-second knock up in place.`);
    // Umbral Dash: healing from damage dealt, and a dash of 75 to 300 units.
    const healShare = e.quoted("Aatrox heals for 16% (+ 1.3% per 100 bonus health)", 0) / 100;
    const healPer100 = e.quoted("Aatrox heals for 16% (+ 1.3% per 100 bonus health)", 1) / 100;
    const [dashMin = 75, dashMax = 300] = e.fieldNumbers("targetRange");
    const dashSpeed = e.field("speed", "Dash speed");
    // World Ender: bonus AD, more healing, and movement speed that decays.
    const unleashed = r.quoted("Aatrox unleashes his true form for 10 seconds", 0);
    const decay = r.quoted("decays by 10% of the current bonus every 0.25 seconds", 0) / 100;
    const decayEvery = r.quoted("decays by 10% of the current bonus every 0.25 seconds", 1);
    const haste = r.fraction("Bonus Movement Speed");
    const healingIncrease = r.fraction("Increased Healing");
    kit.assume("Umbral Dash is aimed late in each Darkin Blade strike to put its sweet spot on the enemy, when it is up.");

    // Where each strike reaches, in front of Aatrox's center, and its sweet spot.
    const geometry: Record<string, { near: number; far: number; sweet: [number, number]; centered?: boolean }> = {
      Q1: { near: 0, far: firstLength, sweet: [firstLength - tipLength, firstLength] },
      Q2: { near: -secondBehind, far: secondFront, sweet: [secondFront - tipLength, secondFront] },
      Q3: { near: thirdOffset - thirdRadius, far: thirdOffset + thirdRadius, sweet: [thirdOffset - thirdSweet, thirdOffset + thirdSweet], centered: true },
    };
    const labels = ["First", "Second", "Third"];
    const strike = (index: number): AbilitySpec => {
      const key = `Q${index}`;
      const shape = geometry[key];
      if (!shape) throw new Error(`Aatrox kit: no shape for ${key}`);
      const label = labels[index - 1] ?? "First";
      return {
        key,
        name: index === 1 ? q.name : `${q.name} (${label.toLowerCase()} strike)`,
        slot: "Q",
        cooldown: index === 1 ? q.cooldown() : 0,
        castTime: q.castTime(),
        cooldownAtCastStart: true,
        ...(index === 1 ? { chainCooldown: "first" as const } : { chain: { root: "Q1", index, window, delay: between } }),
        delivery: {
          kind: "area",
          near: shape.near,
          far: shape.far,
          delay: 0,
          anchor: "caster",
          ...(shape.centered ? { centered: true } : {}),
          bands: [
            {
              from: shape.sweet[0],
              to: shape.sweet[1],
              onHit: [
                { type: "damage", damageType: "physical", amount: q.formula(`${label} Sweetspot Damage`), label: SWEET },
                { type: "displace", direction: "away", distance: 0, duration: knockUp },
              ],
            },
          ],
        },
        onHit: [{ type: "damage", damageType: "physical", amount: q.formula(`${label} Cast Damage`) }],
      };
    };

    const chainDamage: Effect = { type: "damage", damageType: "physical", amount: w.formula("Physical Damage") };
    const cutStance = (ctx: HookContext, seconds: number) => {
      const ready = Number(ctx.memory.stanceReady ?? 0);
      if (ready > ctx.tick) ctx.memory.stanceReady = Math.max(ctx.tick, ready - ticks(seconds));
    };

    // During a strike, a late Umbral Dash moves the sweet spot onto the enemy.
    const dash = (view: Parameters<Behavior>[0], key: string): Command | undefined => {
      const { world, self, enemy } = view;
      const action = self.action;
      const shape = geometry[key];
      const umbral = self.spec.abilities.find((a) => a.key === "E");
      if (action?.kind !== "cast" || !shape || !umbral || !canCast(world, self, umbral)) return undefined;
      const left = action.endTick - world.tick;
      // Where the enemy will be: still walking the way it walked last tick.
      const speed = derive(enemy).moveSpeed / 30;
      const gap = Math.abs(self.x - enemy.x) - enemy.moved * speed * left;
      const center = (shape.sweet[0] + shape.sweet[1]) / 2;
      const shift = gap - center;
      // Already in the sweet spot, or too far for the dash to bring it there: no dash.
      const tolerance = (shape.sweet[1] - shape.sweet[0]) / 2 - 30;
      if (Math.abs(shift) <= tolerance || Math.abs(shift) - dashMax > tolerance) return undefined;
      const distance = Math.min(dashMax, Math.max(dashMin, Math.abs(shift)));
      if (left > Math.ceil(distance / (dashSpeed / 30)) + 1) return undefined;
      return { kind: "cast", ability: "E", aim: { direction: shift > 0 ? 1 : -1, distance: Math.abs(shift) } };
    };
    const behavior: Behavior = (view) => {
      const action = view.self.action;
      if (action?.kind === "cast" && geometry[action.ability]) return dash(view, action.ability);
      const command = defaultBehavior(view);
      if (command?.kind !== "cast" || !geometry[command.ability]) return command;
      // Starting a strike: from where its sweet spot reaches, or close enough for Umbral Dash to make up.
      const shape = geometry[command.ability];
      if (!shape) return command;
      const gap = Math.abs(view.self.x - view.enemy.x);
      const center = (shape.sweet[0] + shape.sweet[1]) / 2;
      const umbral = view.self.spec.abilities.find((a) => a.key === "E");
      const half = (shape.sweet[1] - shape.sweet[0]) / 2 - 30;
      const slack = umbral && abilityReady(view.world, view.self, umbral) ? dashMax + half : half;
      const since = Number(view.self.memory.spacingSince ?? -1);
      if (Math.abs(gap - center) <= slack || view.mode === "flee") {
        view.self.memory.spacingSince = -1;
        return command;
      }
      // A short walk to the right distance, then the strike regardless.
      if (since < 0) view.self.memory.spacingSince = view.world.tick;
      else if (view.world.tick - since > 20) {
        view.self.memory.spacingSince = -1;
        return command;
      }
      return { kind: "move", direction: gap > center ? 1 : -1 };
    };

    const stanceHit: Effect[] = [{ type: "damage", damageType: "magic", amount: { base: 0, ratios: { targetMaxHP: stanceShare } }, lifesteal: 1, label: innate.name }];
    const bonusAD: Formula = r.formula("Bonus Attack Damage");

    // Deathbringer Stance comes back 2 s sooner for each hit: attacks, and about one ability hit every two seconds.
    const stanceEvery = (self: Unit) => stanceCooldown / (1 + stanceCut * (derive(self).attackSpeed + 0.5));
    return {
      behavior,
      budget: {
        damage: (self, target) => ({ magic: (stanceShare * derive(target).maxHp) / stanceEvery(self) }),
        healing: (self, target) => {
          const stance = (stanceShare * derive(target).maxHp) / stanceEvery(self);
          const share = healShare + (healPer100 * (maxHp(self) - self.spec.base.hp)) / 100;
          // World Ender doubles healing through an all-in.
          return (1 + healingIncrease) * (stance + share * (attackDamage(self) * derive(self).attackSpeed + stance));
        },
      },
      hooks: {
        onTargetResurrection(ctx) {
          ctx.world.zones = ctx.world.zones.filter((zone) => !(zone.owner === ctx.self.side && zone.ability === "Wtether"));
        },
        onCastStart(ctx) {
          if (!geometry[ctx.ability.key]) return;
          ctx.memory.strikeAt = ctx.tick;
          ctx.self.cooldownReady.Q1 = ctx.tick + ticks(cooldownAfterHaste(strikeCooldown, derive(ctx.self).abilityHaste));
        },
        onTick(ctx) {
          // Deathbringer Stance comes back on its cooldown.
          if (!ctx.memory.stanceArmed && ctx.tick >= Number(ctx.memory.stanceReady ?? 0)) {
            ctx.memory.stanceArmed = true;
            ctx.apply({ type: "empower", attacks: 1, window: 1e6, bonusRange: stanceRange, onHit: stanceHit }, true);
          }
          // World Ender's movement speed loses a tenth of itself every quarter second.
          const until = Number(ctx.memory.unleashedUntil ?? -1);
          if (ctx.tick < until) {
            const steps = Math.floor((ctx.tick - Number(ctx.memory.unleashedAt ?? ctx.tick)) / (decayEvery * 30));
            if (steps !== Number(ctx.memory.hasteSteps ?? -1)) {
              ctx.memory.hasteSteps = steps;
              ctx.buff("worldEnderHaste", "moveSpeedPercent", haste * (1 - decay) ** steps, (until - ctx.tick) / 30);
            }
          }
        },
        onAttack(ctx) {
          if (!ctx.memory.stanceArmed) return;
          ctx.memory.stanceArmed = false;
          ctx.memory.stanceReady = ctx.tick + ticks(stanceCooldown);
        },
        onAttackHit(ctx) {
          cutStance(ctx, stanceCut);
        },
        onDamageDealt(ctx) {
          // Umbral Dash's passive: healing from damage dealt, except damage over time.
          if (!ctx.persistent && ctx.mitigated > 0) {
            const bonusHealth = maxHp(ctx.self) - ctx.self.spec.base.hp;
            ctx.apply({ type: "heal", amount: flat(ctx.mitigated * (healShare + (healPer100 * bonusHealth) / 100)) }, true);
          }
        },
        onAbilityContact(ctx) {
          if (ctx.defense && ctx.defense !== "spellShield") return;
          const sweet = ctx.effects.some((effect) => effect.type === "damage" && effect.label === SWEET);
          cutStance(ctx, sweet ? stanceSweetCut : stanceCut);
        },
        onAbilityHit(ctx) {
          const key = ctx.ability.key;
          if (key === "W") {
            // The tether: still within reach of where the chain hit when it runs out, the target is hit again and pulled back.
            areaAt(ctx, "Wtether", ctx.enemy.x, tetherRadius, tetherSeconds, [chainDamage, { type: "displace", direction: "toward", distance: 0, duration: pullSeconds }]);
          }
        },
        onCast(ctx) {
          if (geometry[ctx.ability.key]) {
            const chain = ctx.self.chains.Q1;
            if (chain) {
              // The static recast delay and window are measured from activation,
              // rather than after the strike's 0.6-second windup.
              chain.castTick = Number(ctx.memory.strikeAt ?? ctx.tick);
              chain.until = chain.castTick + ticks(window);
            }
          }
          if (ctx.ability.key !== "R") return;
          ctx.memory.unleashedAt = ctx.tick;
          ctx.memory.unleashedUntil = ctx.tick + ticks(unleashed);
          ctx.memory.hasteSteps = -1;
        },
      },
      abilities: [
        strike(1),
        strike(2),
        strike(3),
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "line", range: w.fieldValues("range")[0] ?? 825, width: w.field("width"), speed: w.field("speed") },
          onHit: [chainDamage, { type: "cc", cc: "slow", strength: w.fraction("Slow"), duration: w.quoted("slowing them for 1.5 seconds", 0) }],
          flags: { projectile: true },
        },
        {
          // Infernal Chains' tether, which only the chain itself sets off.
          key: "Wtether",
          name: `${w.name} (tether)`,
          slot: "other",
          cooldown: 0,
          castTime: 0,
          usable: () => false,
          delivery: { kind: "self" },
          onHit: [chainDamage, { type: "displace", direction: "toward", distance: 0, duration: pullSeconds }],
          flags: { spellShield: false },
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: 0,
          overlay: true,
          delivery: { kind: "dash", direction: "toward", distance: dashMax, minDistance: dashMin, speed: dashSpeed },
          onSelf: [{ type: "resetAttack" }],
          flags: { grounded: true },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cooldownAtCastStart: true,
          castTime: r.castTime(),
          moveWhileCasting: true,
          delivery: { kind: "self" },
          onSelf: [
            { type: "stat", stat: "AD", amount: bonusAD, duration: unleashed },
            { type: "stat", stat: "healingIncrease", amount: flat(healingIncrease), duration: unleashed },
          ],
          roles: ["buff"],
        },
      ],
    };
  },
};

export default aatrox;
