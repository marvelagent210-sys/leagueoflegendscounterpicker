/** Kha'Zix: target-local isolation, three legal evolutions and separate Void Assault exits. */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { canCast, EPSILON, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, canTarget, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate } from "../../engine/sim/derived";
import { canTargetPet } from "../../engine/sim/pets";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { projectileBlockPoint } from "../../engine/sim/projectileBlock";
import { interceptProjectile } from "../../engine/sim/projectileIntercept";
import type { AbilitySpec, Effect, HookContext } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { dashDistance, exitTerrain } from "../../engine/sim/terrain";
import { ticks } from "./util";

type Target = Unit | Pet;
interface Spike { cast: number; origin: number; travelled: number; angle: number }
const PASSIVE = "khazix:threat", RACTIVE = "khazix:rActive", USES = "khazix:rUses", NEXT = "khazix:rNext", UNTIL = "khazix:rUntil";
const petTarget = (t: Target): t is Pet => "owner" in t;
const id = (t: Target) => petTarget(t) ? t.id : -1;
const targetClass = (t: Target) => petTarget(t) ? t.spec.targetClass ?? "other" : t.spec.targetClass ?? "champion";
const radius = (t: Target) => petTarget(t) ? t.spec.radius : t.spec.base.radius;
const owner = (t: Target) => petTarget(t) ? t.owner : t.side;
const view = (w: World, self: Unit, t: Target) => petTarget(t) ? petFormulaTarget(t, self, w.tick) : t;

const khazix: KitModule = {
  champion: "Khazix",
  options: { unevolved: { label: "Unevolved ability at level 20 (0 chooses among Q/W/E/R; 1=Q, 2=W, 3=E, 4=R)", default: 0 } },
  variants(options) { return options.unevolved === 0 ? [1, 2, 3, 4].map((unevolved) => ({ unevolved })) : []; },
  build(kit, options) {
    if (!Number.isInteger(options.unevolved) || options.unevolved! < 0 || options.unevolved! > 4) throw new Error("Khazix: unevolved must be 0, 1, 2, 3 or 4");
    const missing = options.unevolved || 4, eq = missing !== 1, ew = missing !== 2, ee = missing !== 3, er = missing !== 4;
    const p = kit.ability("Unseen Threat"), q = kit.ability("Taste Their Fear"), w = kit.ability("Void Spike"), e = kit.ability("Leap"), r = kit.ability("Void Assault");
    const qEvo = kit.ability("Evolved Reaper Claws"), wEvo = kit.ability("Evolved Spike Racks"), eEvo = kit.ability("Evolved Wings"), rEvo = kit.ability("Evolved Adaptive Cloaking");
    const passiveDamage = { base: p.levelValue("Unseen Threat: Kha'Zix empowers"), ratios: { bonusAD: p.quoted("(+ 50% bonus AD)") / 100 } };
    // The game array includes index zero and independently confirms the parsed level-20 extension.
    p.gameQuote('"values":[15.0,22.0,29.0,36.0,43.0,50.0,57.0,64.0,71.0,78.0,85.0,92.0,99.0,106.0,113.0,120.0,127.0,134.0,141.0,148.0,155.0,162.0,169.0,176.0,183.0,190.0,197.0,204.0,211.0,218.0,225.0]');
    const passiveSlow = p.quoted("slow them by 25% for 2 seconds") / 100, passiveSeconds = p.quoted("slow them by 25% for 2 seconds", 1);
    p.quote("whenever the enemy loses sight of him or he activates Void Assault"); p.quote("Void Assault grants Unseen Threat even if Kha'Zix never becomes unseen"); p.quote("Both the attack's damage and bonus spell damage are grouped under the same cast instance");
    const qDamage = q.formula("Physical Damage"), isolatedDamage = q.formula("Isolated Target Physical Damage"), isolationRange = q.field("effectRadius"), qBaseRange = q.field("targetRange"), qRange = eq ? qEvo.field("targetRange") : qBaseRange;
    const qRefund = qEvo.quoted("cooldown is reduced by 45%") / 100, attackRange = qEvo.quoted("50 bonus range"), qCost = q.cost();
    q.quote("For Evolved Reaper Claws, the start of cast"); q.quote("For Evolved Spike Racks, when the enemy is hit"); q.quote("For Taste Their Fear, the end of cast");
    q.quote("A team's allies are champions, pets, minions and outer turrets"); q.quote("Monsters are considered allies for other monsters"); q.quote("Wards do not prevent Isolation"); q.quote("specifically tagged to not be a valid ally");
    for (const name of ["Powder Keg", "Prophet of an Elder God", "Captive Audience", "Bushwhack", "Tunnel", "Absolution Mist Wraiths", "Noxious Trap", "Sovereign's Domination Mist Wraiths", "Dark Procession"]) q.quote(name);
    q.quote("this ability will cancel but does not go on cooldown nor pay its cost");
    const wDamage = w.formula("Physical Damage"), heal = w.formula("Heal"), wRange = w.field("targetRange"), wRadius = w.field("effectRadius"), wWidth = w.field("width"), wSpeed = w.field("speed"), wCast = w.castTime();
    const slow = wEvo.quoted("slows by 40%") / 100, isolatedSlow = wEvo.quoted("slowed by 60%") / 100, slowSeconds = wEvo.quoted("for 2.25 seconds");
    const coneAngle = wEvo.gameQuoted("mSpell.castConeAngle: 28.0");
    w.quote("centered around the location of the missile as it collides"); w.quote("This ability will cast from wherever the caster is at the end of the cast time");
    wEvo.quote("now fires three clusters"); wEvo.quote("the missiles will not collide with enemies that have already been hit"); wEvo.quote("nor provide Kha'Zix with extra healing"); wEvo.quote("Spell shield will not block the reveal");
    const eDamage = e.formula("Physical Damage"), eBaseRange = e.field("targetRange"), eRange = ee ? eEvo.field("targetRange") : eBaseRange, eRadius = e.field("effectRadius");
    e.quote("upon arrival"); e.quote("Taste Their Fear can be cast during the dash"); eEvo.quote("cooldown resets upon scoring a champion takedown"); eEvo.quote("can be buffered to cast after the leap ends");
    const evolvedStealthSeconds = rEvo.quoted("now lasts 2 seconds"), baseStealthSeconds = r.quoted("invisible for 1.25 seconds"), stealthSeconds = er ? evolvedStealthSeconds : baseStealthSeconds, moveSpeed = r.quoted("40% bonus movement speed") / 100;
    const recastDelay = r.quoted("After 2 seconds of leaving invisibility"), recastWindow = r.quoted("for the next 12 seconds");
    const casts = r.gameQuoted(er ? '"name":"EvolvedNumberOfCasts","values":[3.0,3.0,3.0,3.0,3.0,3.0,3.0]' : '"name":"NumberOfCasts","values":[2.0,2.0,2.0,2.0,2.0,2.0,2.0]');
    r.gameQuote('"name":"EvolutionsAvailable","values":[0.0,1.0,2.0,3.0,3.0,3.0,3.0]');
    r.quote("Each rank in Void Assault allows Kha'Zix to evolve one of his abilities"); r.quote("this can only be done once per ability"); r.quote("The only way for Kha'Zix to evolve all of his abilities"); r.quote("for the purposes of on-cast effects"); r.quote("Using a basic attack breaks stealth at the end of the attack windup"); r.textField("cooldownStart");
    for (const ability of [q, w, e]) ability.gameQuote("mSpell.mCastingBreaksStealth: true");

    kit.assume("Level 20 has exactly three unique evolutions from three Void Assault ranks. Four variants omit Q, W, E or R; automatic selection defaults to Q/W/E before matchup optimization. The Hunt is On! fourth evolution is not granted without that quest history. Evolution selection is completed before the duel; its two-second menu cast is not a combat spell.");
    kit.assume("Isolation checks actual living allied champions and pets within 375 center units of the target, irrespective of visibility. Monsters only protect other monsters. Wards and the primary's listed excluded summons do not protect targets; names/kinds identify those excluded units because the engine has no equivalent game tags. Dead and expired summons do not protect; living allies still protect while hidden, untargetable or in stasis. With environment.minions enabled, an allied lane-wave proxy conservatively prevents isolation of champion/minion/other targets; there are no fabricated minion collision bodies. Outer turrets are absent from the arena.");
    kit.assume("Unseen Threat starts unarmed in an exposed duel: no prior vision-loss history is invented. It arms on observed enemy-champion sight loss or each actual R cast, including through true sight. Only a connected unblocked champion-class basic attack consumes it; ordinary minions/monsters preserve it. Avoided attacks preserve it. Its level-20 base is 155, independently confirmed by the pinned game array. Item/rune cast-instance stacks are outside the plain-stat model.");
    kit.assume("Void Spike simulates three distinct finite rays for evolved W. The versioned 28-degree cone is interpreted as a total angle, putting side rays at +/-14 degrees; targets lie on the arena line, while each ray retains its off-line distance for collision/explosion checks. Primary 140 width and 275 explosion radius take precedence over conflicting binary cast metadata. Each cast damages each actual target at most once and heals once if the caster's center lies inside an actual explosion. The scalar projectile-wall API applies to each ray's projected segment. Standard sight is recorded separately from true sight: it never exposes invisibility or overrides nearsight; shared fog/brush vision is absent. Unhit missiles expire without exploding.");
    kit.assume("Neither the pinned Leap templates nor the pinned game objects supply a reliable travel speed or duration. Leap therefore uses the existing immediate displacement fallback to its chosen legal destination, with damage only at that destination. This timing limitation omits midair Q casting/buffering and midflight knockdown; grounding/root prevention and terrain/landing geometry remain real. No guessed travel time is assigned. Only an actual enemy champion death resets evolved E; pet and clone deaths do not.");
    kit.assume("R cooldown begins on its first cast. Each stealth exit starts a two-second lockout followed by its own twelve-second free-recast window; these clocks ignore ability haste. R movement speed ends with stealth. Basic spell casts break stealth at declaration, interpreted from mCastingBreaksStealth; attacks break it at launch. Natural stealth expiry, manual spell breaking and true-sight cases use the same exit bookkeeping. Passive sight checks observe the enemy champion; pet vision/brush occlusion are not represented by shared visibility.");
    kit.assume("Trade and hold reserve every R stage even with Q/W/E unavailable. A completed trade retreats before considering renewed casts. Flee uses a ready, legal E to its maximum backward destination while the pursuer is within E's approach/landing envelope; otherwise it preserves default reactive movement/defense. The reference budget assumes isolation only when the environment-free target has no represented allies, normal Q/W/E cadence and one passive proc for each allowed R cast per R cooldown; no unseen prefight proc, takedown resets or extra evolutions are valued.");

    const excluded = (t: Pet) => /(?:ward|powder.?keg|prophet of an elder god|tentacle|captive audience|bushwhack|tunnel|mist.?wraith|noxious.?trap|dark procession)/i.test(`${t.spec.name} ${t.spec.kind}`);
    const isolated = (world: World, target: Target): boolean => {
      const kind = targetClass(target);
      if (world.settings.environment.minions && kind !== "monster") return false;
      const allied = (candidate: Target) => owner(candidate) === owner(target) && id(candidate) !== id(target) && (kind === "monster" ? targetClass(candidate) === "monster" : targetClass(candidate) !== "monster") && Math.abs(candidate.x - target.x) <= isolationRange;
      if (world.units.some((u) => u.alive && u.hp > 0 && allied(u))) return false;
      return !world.pets.some((t) => t.hp > 0 && world.tick < t.endTick && !excluded(t) && allied(t));
    };
    const targets = (world: World, self: Unit, visible = false): Target[] => {
      const enemy = world.units[1 - self.side]!;
      return [...(enemy.alive && enemy.hp > 0 && !inStasis(enemy) && !isUntargetable(enemy, self) && (!visible || canTarget(enemy, self)) ? [enemy] : []), ...world.pets.filter((t) => t.owner !== self.side && t.hp > 0 && world.tick < t.endTick && !t.spec.untargetable && (visible ? canTargetPet(t, self, world.tick) : !inStasis(view(world, self, t)) && !isUntargetable(view(world, self, t), self)))];
    };
    const chooseQ = (world: World, self: Unit, aim?: Aim): Target | undefined => {
      const enemy = world.units[1 - self.side]!, x = aim?.distance === undefined ? enemy.x : self.x + directionTo(self, enemy) * aim.direction * Math.max(0, aim.distance);
      return targets(world, self, true).filter((t) => Math.abs(t.x - self.x) <= qRange).sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x) || id(a) - id(b))[0];
    };
    const qSpell: AbilitySpec = { key: "Q", name: q.name, slot: "Q", cooldown: q.cooldown(), cooldownFor: (self) => qSpell.cooldown * (eq && self.memory["khazix:qIsolated"] ? 1 - qRefund : 1), cost: qCost, castTime: q.castTime(), overlay: true, delivery: { kind: "self" }, usable: (self, world) => !!chooseQ(world, self), flags: { spellShield: q.flag("spellShield"), petContactHooks: true }, roles: ["damage"], budgetExcluded: true, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], estimate: (self, target) => evaluate(qDamage, self, target) };
    const spike: AbilitySpec = { key: "W", name: w.name, slot: "W", cooldown: w.cooldown(), cost: w.cost(), castTime: wCast, delivery: { kind: "self" }, roles: ["damage"], flags: { projectile: w.flag("projectile"), spellShield: w.flag("spellShield"), petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: wDamage }], budgetExcluded: true, persistsAfterDeath: true, usable: (self, world) => targets(world, self, true).some((t) => Math.abs(t.x - self.x) <= wRange + radius(t)), estimate: (self, target) => evaluate(wDamage, self, target), estimateDelay: (self, target) => Math.max(0, Math.abs(target.x - self.x) - radius(target)) / wSpeed };
    const leap: AbilitySpec = { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, roles: ["engage", "damage", "escape"], flags: { grounded: e.flag("grounded"), knockdown: e.flag("knockdown"), spellShield: e.flag("spellShield"), petContactHooks: true }, onHit: [{ type: "damage", damageType: "physical", amount: eDamage }], budgetExcluded: true };
    const nextStage = (self: Unit, world: World, stage: number) => Number(self.memory[USES] ?? 0) === stage - 1 && !self.memory[RACTIVE] && world.tick >= Number(self.memory[NEXT] ?? Infinity) && world.tick <= Number(self.memory[UNTIL] ?? -1);
    const rSpells: AbilitySpec[] = Array.from({ length: casts }, (_, index) => ({ key: index ? `R${index + 1}` : "R", name: index ? `${r.name} (recast ${index})` : r.name, slot: "R", cooldown: index ? 0 : r.cooldown(), cost: index ? 0 : r.cost(), castTime: r.castTime(), cooldownAtCastStart: !index, delivery: { kind: "self" }, onSelf: [{ type: "state", state: "invisible", duration: stealthSeconds }], roles: ["buff"], budgetExcluded: true, ...(index ? { usable: (self: Unit, world: World) => nextStage(self, world, index + 1) } : {}) }));
    const abilities = [qSpell, spike, leap, ...rSpells];
    const hit = (ctx: HookContext, target: Target, ability: AbilitySpec, effects: Effect[], category: "singleTarget" | "area", scale = 1, originX?: number) => {
      if (petTarget(target)) abilityHitPet(ctx.world, ctx.self, target, ability, effects, category, scale, originX);
      else abilityHit(ctx.world, ctx.self, target, ability, effects, scale, originX);
    };
    const exitStealth = (ctx: HookContext) => {
      if (!ctx.memory[RACTIVE]) return;
      ctx.memory[RACTIVE] = false;
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "invisible" && s.ability?.startsWith("R")) && s.memoKey !== "buff:khazix:rSpeed");
      ctx.memory[NEXT] = ctx.tick + ticks(recastDelay); ctx.memory[UNTIL] = ctx.tick + ticks(recastDelay + recastWindow);
    };
    const explode = (ctx: HookContext, missile: { x: number; scale: number; connects: boolean }, data: Spike, y: number) => {
      for (const target of targets(ctx.world, ctx.self)) {
        const key = `khazix:wHit:${data.cast}:${id(target)}`;
        if (ctx.memory[key] || Math.hypot(target.x - missile.x, y) > wRadius + radius(target) || (!petTarget(target) && !missile.connects)) continue;
        ctx.memory[key] = true;
        const effects: Effect[] = [...spike.onHit!, ...(ew ? [{ type: "cc" as const, cc: "slow" as const, duration: slowSeconds, strength: isolated(ctx.world, target) ? isolatedSlow : slow }] : [])];
        hit(ctx, target, spike, effects, "area", petTarget(target) ? 1 : missile.scale, missile.x);
      }
      const healKey = `khazix:wHeal:${data.cast}`;
      if (!ctx.memory[healKey] && Math.hypot(ctx.self.x - missile.x, y) <= wRadius) { ctx.memory[healKey] = true; ctx.apply({ type: "heal", amount: heal }, true); }
    };
    const behavior: Behavior = (v) => {
      const reserve = v.mode === "trade" || v.mode === "hold";
      // The common chooser updates the shared trade clock before kit priorities run.
      const normal = defaultBehavior(reserve ? { ...v, self: { ...v.self, spec: { ...v.self.spec, abilities: abilities.filter((a) => a.slot !== "R") } } } : v);
      if (v.mode === "trade" && v.self.memory.tradeDone) return normal;
      if (v.mode === "idle" || v.self.action) return normal;
      if (v.mode === "flee") return Math.abs(v.self.x - v.enemy.x) <= eRange + eRadius && canCast(v.world, v.self, leap)
        ? { kind: "cast", ability: "E", aim: { direction: -1, distance: eRange } }
        : normal;
      for (const key of ["Q", "W", "E", ...rSpells.map((a) => a.key)]) {
        if (key.startsWith("R") && reserve) continue;
        if (key === "E" && (Math.abs(v.self.x - v.enemy.x) <= qRange || Math.abs(v.self.x - v.enemy.x) > eRange + eRadius || v.mode === "kite")) continue;
        const ability = abilities.find((a) => a.key === key)!;
        if (canCast(v.world, v.self, ability)) return { kind: "cast", ability: key };
      }
      return normal;
    };
    return {
      abilities, behavior, attack: { onHitToPets: true, ...(eq ? { range: kit.champion.forms[0]!.stats.attackRange + attackRange } : {}) },
      budget: { damage(self, target) { const haste = derive(self).abilityHaste; return { physical: evaluate(isolatedDamage, self, target) / cooldownAfterHaste(qSpell.cooldown * (eq ? 1 - qRefund : 1), haste) + evaluate(wDamage, self, target) / cooldownAfterHaste(spike.cooldown, haste) + evaluate(eDamage, self, target) / cooldownAfterHaste(leap.cooldown, haste), magic: casts * evaluate(passiveDamage, self, target) / cooldownAfterHaste(rSpells[0]!.cooldown, haste) }; }, healing(self, target) { return evaluate(heal, self, target) / cooldownAfterHaste(spike.cooldown, derive(self).abilityHaste); } },
      hooks: {
        onStart(ctx) { ctx.memory[PASSIVE] = false; ctx.memory["khazix:seen"] = canSee(ctx.self, ctx.enemy); },
        onTick(ctx) {
          const seen = canSee(ctx.self, ctx.enemy);
          if (ctx.memory["khazix:seen"] === true && !seen) ctx.memory[PASSIVE] = true;
          ctx.memory["khazix:seen"] = seen;
          if (ctx.memory[RACTIVE] && !ctx.self.statuses.some((s) => s.kind === "state" && s.key === "invisible" && s.ability?.startsWith("R"))) exitStealth(ctx);
        },
        onAttackLaunch(ctx) { exitStealth(ctx); },
        onAttackBeforeDamage(ctx) {
          if (!ctx.memory[PASSIVE] || ctx.blocked || targetClass(ctx.pet ?? ctx.enemy) !== "champion") return;
          ctx.memory[PASSIVE] = false;
          ctx.apply({ type: "damage", damageType: "magic", amount: passiveDamage, label: p.name, noLifeSteal: true });
          ctx.apply({ type: "cc", cc: "slow", duration: passiveSeconds, strength: passiveSlow });
        },
        onCastStart(ctx) {
          if (["Q", "W", "E"].includes(ctx.ability.key)) exitStealth(ctx);
          if (ctx.ability.key !== "Q") return;
          const target = chooseQ(ctx.world, ctx.self, ctx.aim);
          ctx.memory["khazix:qTarget"] = target ? id(target) : -2;
          ctx.memory["khazix:qIsolated"] = !!target && isolated(ctx.world, target);
        },
        onCast(ctx) {
          const key = ctx.ability.key;
          if (key === "Q") {
            const selected = Number(ctx.memory["khazix:qTarget"]), target = targets(ctx.world, ctx.self, true).find((t) => id(t) === selected);
            if (!target || Math.abs(target.x - ctx.self.x) > qRange) { delete ctx.self.cooldownReady.Q; ctx.self.resource += qCost; return; }
            hit(ctx, target, qSpell, [{ type: "damage", damageType: "physical", amount: isolated(ctx.world, target) ? isolatedDamage : qDamage }], "singleTarget");
          }
          if (key === "W") {
            const cast = ctx.world.nextId++, direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1;
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick - ticks(wCast), Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - radius(ctx.enemy)) / wSpeed, wWidth / 2);
            for (const angle of ew ? [-coneAngle / 2, 0, coneAngle / 2] : [0]) {
              const missileId = ctx.world.nextId++;
              ctx.memory[`khazix:spike:${missileId}`] = JSON.stringify({ cast, origin: ctx.self.x, travelled: 0, angle: angle * Math.PI / 180 } satisfies Spike);
              ctx.world.missiles.push({ id: missileId, owner: ctx.self.side, source: "W", seenTick: ctx.tick - ticks(wCast), x: ctx.self.x, perTick: 0, homing: false, direction, travelLeft: wRange, projectile: true, interceptable: true, radius: wWidth / 2, connects: chance > .02, scale: chance >= .98 ? 1 : chance, onHit: spike.onHit!, impactTick: ctx.tick + Math.max(1, ticks(Math.min(wRange, Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - radius(ctx.enemy) - wWidth / 2)) / wSpeed)), expiresTick: ctx.tick + ticks(wRange / wSpeed) + 1 });
            }
          }
          if (key === "E") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.min(eRange, Math.max(0, ctx.aim?.distance ?? Math.abs(ctx.enemy.x - ctx.self.x)));
            ctx.self.x += dashDistance(ctx.world, ctx.self, direction * distance); exitTerrain(ctx.world, ctx.self);
            for (const target of targets(ctx.world, ctx.self)) if (Math.abs(target.x - ctx.self.x) <= eRadius + radius(target)) hit(ctx, target, leap, leap.onHit!, "area");
          }
          if (key.startsWith("R")) {
            ctx.memory[USES] = key === "R" ? 1 : Number(ctx.memory[USES]) + 1;
            ctx.memory[RACTIVE] = true; ctx.memory[PASSIVE] = true;
            ctx.buff("khazix:rSpeed", "moveSpeedPercent", moveSpeed, stealthSeconds);
          }
        },
        onAbilityContact(ctx) {
          if (ew && ctx.ability.key === "W" && targetClass(ctx.enemy) === "champion" && (!ctx.defense || ctx.defense === "spellShield")) applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "state", state: "standardSight", duration: slowSeconds }, { scale: ctx.scale, ability: { ...spike, flags: { ...spike.flags, spellShield: false } } });
        },
        onMissileTick(ctx) {
          const key = `khazix:spike:${ctx.missile.id}`, raw = ctx.memory[key]; if (typeof raw !== "string") return;
          const data = JSON.parse(raw) as Spike, from = ctx.missile.x, previous = data.travelled;
          ctx.missile.impactTick = ctx.tick + Math.max(1, ticks(Math.min(wRange - data.travelled, Math.max(0, Math.abs(ctx.enemy.x - from) - radius(ctx.enemy) - wWidth / 2)) / wSpeed));
          data.travelled = Math.min(wRange, data.travelled + wSpeed / 30);
          const cos = Math.cos(data.angle), sin = Math.sin(data.angle), direction = ctx.missile.direction;
          const encounters = targets(ctx.world, ctx.self).map((target) => {
            const dx = (target.x - data.origin) * direction, projection = dx * cos, perpendicular = Math.abs(dx * sin), collision = wWidth / 2 + radius(target);
            const entry = projection - Math.sqrt(Math.max(0, collision * collision - perpendicular * perpendicular));
            return { target, entry: Math.max(previous, entry), valid: perpendicular <= collision && projection >= previous - collision && entry <= data.travelled };
          }).filter((c) => c.valid).sort((a, b) => a.entry - b.entry);
          const contact = encounters.find(({ target }) => !ctx.memory[`khazix:wHit:${data.cast}:${id(target)}`]);
          const travelled = contact ? Math.max(previous, contact.entry) : data.travelled;
          const shield = encounters.find(({ target }) => !petTarget(target));
          if (shield && shield.entry <= travelled + EPSILON) {
            const point = data.origin + direction * shield.entry * cos;
            // Side rays meet the actual hit circle after their scalar envelope begins.
            if (interceptProjectile(ctx.world, ctx.missile, from, point, point)) return;
          }
          data.travelled = travelled;
          const to = data.origin + direction * data.travelled * cos;
          ctx.missile.x = to;
          const blocked = projectileBlockPoint(ctx.world, ctx.self.side, from, ctx.missile.x);
          if (blocked !== undefined) { ctx.missile.x = blocked; ctx.missile.ended = true; delete ctx.memory[key]; return; }
          if (contact) { explode(ctx, ctx.missile, data, data.travelled * sin); ctx.missile.ended = true; delete ctx.memory[key]; return; }
          if (data.travelled >= wRange) { ctx.missile.ended = true; delete ctx.memory[key]; return; }
          ctx.memory[key] = JSON.stringify(data);
        },
        canProjectileIntercept(ctx) {
          return ctx.missile.source !== "W" || typeof ctx.memory[`khazix:spike:${ctx.missile.id}`] !== "string" || ctx.exactPoint !== undefined;
        },
        onProjectileIntercept(ctx) {
          const raw = ctx.memory[`khazix:spike:${ctx.missile.id}`]; if (typeof raw !== "string") return false;
          const data = JSON.parse(raw) as Spike;
          data.travelled = Math.max(0, (ctx.missile.x - data.origin) / (ctx.missile.direction * Math.cos(data.angle)));
          explode(ctx, ctx.missile, data, data.travelled * Math.sin(data.angle));
          return true;
        },
        onMissileEnd(ctx) { delete ctx.memory[`khazix:spike:${ctx.missile.id}`]; },
        onKill(ctx) { if (ee && !ctx.pet && !petTarget(ctx.victim) && ctx.victim.side !== ctx.self.side && ctx.victim.hp <= 0) ctx.self.cooldownReady.E = ctx.tick; },
      },
    };
  },
};
export default khazix;
