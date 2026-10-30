/** Akshan: independent second basics, target-local marks, returning Q and terrain-dependent E. */
import type { KitModule } from "../../engine/kits/compile";
import { TOP_LANE_MAX_LEVEL } from "../../engine/stats";
import { IMMOBILIZING } from "../../engine/rules/crowdControl";
import { averageCritFactor } from "../../engine/rules/defense";
import { attackTiming, canCast, launchBonusAttack, skillshotChance } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { canTarget, directionTo, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Action, Pet, Unit, World } from "../../engine/sim/state";
import { missingShare, scaled, ticks } from "./util";

const MARK = "akshan:dirty", SHIELD = "akshan:shield", STEALTH = "akshan:rogue", SECOND = "akshan:second", SWING = "akshan:swing";
const channel = (action?: Action): Extract<Action, { kind: "channel" }> | undefined => action?.kind === "channel" ? action : action?.kind === "dash" ? channel(action.resume) : undefined;
function clearChannel(self: Unit): void { if (self.action?.kind === "channel") self.action = undefined; else if (self.action?.kind === "dash") self.action.resume = undefined; }
function installChannel(self: Unit, action: Extract<Action, { kind: "channel" }>): void { if (self.action?.kind === "dash") self.action.resume = action; else self.action = action; }

const akshan: KitModule = {
  champion: "Akshan",
  build(kit) {
    const p = kit.ability("I"), q = kit.ability("Q"), w = kit.ability("W"), e = kit.ability("E"), r = kit.ability("R");
    const secondRatio = p.quoted("deals 50% AD physical damage") / 100, minionRatio = p.quoted("increased to 100% AD against minions") / 100;
    const extraRange = p.quoted("within 200 units beyond his basic attack range"), secondSpeed = p.field("speed", "Additional"), basicSpeed = p.field("speed", "Basic");
    const secondaryObject = "Characters/Akshan/Spells/AkshanPassiveAbility/AkshanPassiveAttack";
    const secondLockout = Number(p.gameQuoted("mSpell.mPreCastLockoutDeltaTime: 0.10000000149011612", 0, secondaryObject).toFixed(6));
    const secondAS = p.gameQuoted('"mNumber":2.0,"__type":"NumberCalculationPart"', 0, secondaryObject);
    p.quote("Starts the attack windup's cooldown after it is used, rather than when the first shot is");
    p.quote("The second shot, if the first shot's target was killed, will prioritize visible enemy champions, then minions on low health");
    p.quote("The additional shot applies on-hit effects, triggers on-attack effects, and is affected by critical strike modifiers");
    const markDuration = p.quoted("to enemies for 5 seconds"), markCount = p.quoted("stacking up to 3 times");
    const proc: Formula = { base: p.quoted("15 / 40 / 80 / 150 (based on level) (+ 60% AP)", 3), ratios: { AP: p.quoted("15 / 40 / 80 / 150 (based on level) (+ 60% AP)", 4) / 100 } };
    const shieldDuration = p.quoted("shield for 2 seconds"), shieldCD = p.quoted("16 / 12 / 8 / 4 (based on level)", 3);
    p.quote("Unaffected by ability haste, starts upon the shield being destroyed or expiring");
    const shieldProgression = "40+(240/17)*(x-1)*(0.7025+0.0175*(x-1))";
    const shieldBase = p.quoted(shieldProgression, 0), shieldGrowth = p.quoted(shieldProgression, 1) / p.quoted(shieldProgression, 2);
    const growthStart = p.quoted(shieldProgression, 4), growthStep = p.quoted(shieldProgression, 5);
    const levelOffset = TOP_LANE_MAX_LEVEL - p.quoted(shieldProgression, 3);
    const shield: Formula = { base: shieldBase + shieldGrowth * levelOffset * (growthStart + growthStep * levelOffset), ratios: { bonusAD: p.quoted("(+ 35% bonus AD) shield", 0) / 100 } };
    const passiveObject = "Characters/Akshan/Spells/AkshanPassiveAbility/AkshanPassive";
    const msStart = p.gameQuoted('"mStartValue":20.0,"mEndValue":75.0', 0, passiveObject), msEnd = p.gameQuoted('"mStartValue":20.0,"mEndValue":75.0', 1, passiveObject);
    const msAt20 = msStart + (msEnd - msStart) * levelOffset / p.quoted(shieldProgression, 2), cancelDuration = p.quoted("decaying over 1 second");
    const cancelASRatio = p.quoted("(1 + 100% bonus attack speed)", 1) / 100;
    p.quote("applies before the damage of his attacks");

    const qDamage = q.formula("Physical Damage"), qRange = q.field("range"), qExtension = q.fieldNumbers("range")[1]!;
    const [qOut, qBack] = q.fieldValues("speed"), qWidth = q.field("width"), qReveal = q.quoted("revealing them for 1 second");
    if (qOut === undefined || qBack === undefined) throw new Error("Akshan: missing Q flight speeds");
    const qNonChampion = q.fraction("Non-Champion Damage"), qMove = q.quoted("gains 20% (+ 5% per 100 AP)", 0) / 100, qMoveAP = q.quoted("gains 20% (+ 5% per 100 AP)", 1) / 100 / q.quoted("gains 20% (+ 5% per 100 AP)", 2);
    const qMoveSeconds = q.quoted("decays over 1 second");
    q.quote("Enemies can be hit only once per pass"); q.quote("Spell shield will only block a single hit. They do not prevent the initial throw from extending its range");
    const wDuration = w.quoted("for 2 seconds otherwise"), wRecast = w.quoted("recast after 1 second"), detect = w.quoted("Detection Radius: 800");
    const nearWall = w.gameQuoted("mSpell.DataValues.PassiveWallRange.values: [175.0");
    w.quote("lasts indefinitely while he is near terrain or inside brush"); w.quote("Akshan can move during Going Rogue's cast time");
    w.quote("Attacking or casting abilities ends Going Rogue immediately"); w.quote("Using a basic attack breaks the stealth at the start of the attack windup");
    w.quote("Enemy champions that kill Akshan will not be marked as Scoundrels nor increase their slay count"); w.quote("Clones do not count for triggering Going Rogue's passive");
    w.quote("resurrects all dead allied champions that they have slain after 1 second");

    const eBase = e.formulaPart("Physical Damage per Shot", ["AD"]), eAS = e.quoted("(1 + 0.3 per 100% bonus attack speed)", 1), eOnHit = e.quoted("on-hit damage reduced to 25% effectiveness") / 100;
    const eRange = e.field("targetRange"), shotRange = e.field("effectRadius"), collision = e.field("collisionRadius"), hookSpeed = e.field("speed", "Hook"), swingSpeed = e.field("speed", "orbital"), shotSpeed = e.field("speed", "Automatic");
    const targetPriority = e.quoted("last 4 seconds");
    const ePrepare = e.quoted("preparation for up to 2.125 seconds"), eRecast = e.quoted("after 0.5 seconds of the second cast"), eReset = e.quoted("cooldown to 0.5 seconds");
    // The pinned wiki's next-game-tick rendering is 0.231; the raw game script parameter is 0.2.
    const eInterval = e.quoted("every 0.231"), eRecoil = e.quoted("recoil up to 250 units");
    const eCrit = e.quoted("50% bonus critical damage") / 100, eJump = e.gameQuoted("mSpell.castRange: [350.0", 0, "Characters/Akshan/Spells/AkshanEAbility/AkshanE3");
    e.quote("Hook range including lollipop against walls and final dash distance and speed"); e.quote("Each shot is a separate cast instance"); e.quote("It can miss if the user is blinded");
    e.quote("The swing will end prematurely if the terrain the hook was attached to no longer exists");
    e.quote("Heroic Swing's second and third cast can both be used while silenced"); e.quote("Only Heroic Swing's first cast is disabled while grounded or rooted");
    e.quote("immediately fires one shot at the beginning of his swing and a final shot while dismounting");
    e.quote("cannot fire during the swing while it is active"); e.quote("Takedowns against clones do not count");
    const rDuration = r.quoted("channeling for 2.5 seconds"), rRecast = r.quoted("recast after 0.5 seconds"), rGrace = r.quoted("5-second cooldown"), rReveal = r.quoted("plus 2 seconds thereafter");
    const rCount = r.number("Maximum Bullets Stored"), rStore = r.number("Bullet Storing Interval Time"), rDamage = r.formula("Minimum Physical Damage per Bullet"), rRange = r.field("targetRange"), rWidth = r.field("width"), rSpeed = r.field("speed");
    const rInterval = Number(r.gameQuoted("mSpell.DataValues.CastTimePerBullet.values: [0.15000000596046448").toFixed(6));
    const rCrit = r.quoted("increased by 0 to 30% based on critical strike chance", 1) / 100, rMissing = r.quoted("2% per 1% of target's missing health", 0) / r.quoted("2% per 1% of target's missing health", 1);
    const rRefresh = r.quoted("stacks on the target every 0.25 seconds");
    r.quote("Each bullet's damage applies life steal and executes minions"); r.quote("Spell shield will not prevent the lock-on and will only block a single bullet");
    r.quote("will cancel if the target becomes untargetable or dies during the channel"); r.quote("will not go on a reduced cooldown if Akshan dies during the channel");
    r.gameQuote('"mStat":8,"mDataValue":"CritDamageMod"'); r.gameQuote('"mStat":9,"mCoefficient":1.0');
    const qCast = q.castTime();
    const qCD = q.cooldown(), wCD = w.cooldown(), eCD = e.cooldown(), rCD = r.cooldown();
    for (const spell of [q, w, e, r]) if (spell.textField("cooldownStart") !== "post-effect") throw new Error("Akshan: cooldown timing changed");

    kit.assume("Dirty Fighting uses the pinned wiki's five-second mark lifetime; the exact game file retains a conflicting 4.5-second DataValue. Marks belong to each actual champion or summon, consume before basic/E damage and after Q/R damage, and never borrow the summon owner's stacks. Hit-count props do not receive spell marks. E's proc damage receives its sourced 25% on-hit multiplier, while a connected E shot contributes one full stack.");
    kit.assume("The passive shield extrapolates the pinned wiki's explicit stat-progression formula to level 20, rather than capping its normalized level-18 display at 280. Its four-second static cooldown starts when the shield expires or is destroyed. Only actual champion-class contacts, including explicitly champion-class clones, grant the shield; no summon or clone grants an E takedown reset.");
    kit.assume("The second basic has independent critical expectation, full on-hits, life steal, 50% AD against champions and other summons, and 100% AD against explicitly minion-class summons. Its delay interprets the exact game's autoattack cast-time calculation of 2 as twice normal attack speed, bounded by its 0.1-second pre-cast lockout; the exported file does not expose the script's precise delay. Its attack cooldown begins on the second launch. Cancelling by moving or casting preserves the original first-shot attack timer and grants the sourced linearly decaying movement bonus. Default fight policy preserves the second shot unless an immediate defensive response is selected.");
    kit.assume("Avengerang traverses actual targets once on each pass. An outbound contact extends the endpoint only as far as 500 units beyond that contact, even through spell shield; return follows Akshan's current position. Each pass uses the ordinary independent sideways hit estimate. Revealed is the engine's shared sight status; separate ordinary sight and true sight are not distinguished, and map vision bubbles are absent.");
    kit.assume("Going Rogue lasts two seconds in open ground and refreshes only near actual terrain intervals within the exact game's 175-unit wall range or the scenario's brush. Detection checks the living rival champion within 800 units. The flee policy prepares W while terrain or brush maintains it, or uses it beyond detection for immediate concealment, preserving reactive defenses and retreat movement during the cast. It does not assume concealment inside detection or extend open-ground duration. The solo duel has no allied champion deaths, so Scoundrel gold, trails, chase movement/missing-mana regeneration, and ally resurrection are unavailable; Akshan's own death never creates a Scoundrel.");
    kit.assume("Heroic Swing requires a real live terrain interval within 800 units. The lane's abstract walls flag supplies no anchor coordinates and grants no E. Without pinned two-dimensional wall geometry, the anchored circle is conservatively projected as x = anchor + (startX-anchor) cos(speed × time/radius), stopping at the first real terrain interval expanded by 50 or enemy champion contact. This projection can undercount viable lateral swings and can never promise a full orbit. Clockwise and counterclockwise have the same one-axis projection. Nearby attachment recoils only to the documented 250-unit minimum radius, clipped by real terrain. The policy dismounts at its first legal opportunity; no sustained guaranteed full-hit swing is budgeted.");
    kit.assume("E shots are separate basic-damage spell instances with blind, dodge, block, parry, projectile interception and one-shot spell shields; they do not trigger on-attack events. Each E shot snapshots blindness when launched, preserving an in-flight attack through later blind application and retaining a launch-time miss through later cleansing. Actual hit-count props receive the explicit shared basic-attack pet packet, without spell marks. The pinned wiki's rendered 0.231-second shot spacing is used rather than the raw 0.2 script parameter. Dismount distance is the exact game's 350; its speed is explicitly pending in the wiki and absent from the bin, so dismount displacement is conservatively instantaneous and clipped by terrain rather than inventing travel speed. R overlays the swing and suppresses E shots while charging or firing.");
    kit.assume("Comeuppance begins with one stored bullet and stores the remaining bullets over 2.5 seconds. Early release is legal after 0.5 seconds; emitted bullets are separated by the exact game's 0.15-second cast-time parameter, with the first one interval after release. Both the mobile charging and firing phases suppress basics; silence or polymorph interrupts, while immobilization alone does not. Target death or untargetability cancels charging; invisibility does not cancel its reveal. Each homing bullet can collide with a real enemy summon first, with current missing-health/critical modifiers and life steal evaluated at contact. Only explicitly minion-class summons execute; unclassified pets and champion clones take ordinary physical damage. Structures, neutral units, ally resurrection and map sight are absent.");
    kit.assume("The reference budget counts two Q passes, passive procs from ordinary double basics and Q/R, one charged R per full cooldown and firing duration, and the shield's duration plus static cooldown. E contributes zero guaranteed reference damage because its real terrain eligibility and contacts are scenario-dependent. No damage or defense coefficients are tuned to matchup outcomes.");

    const targetClass = (world: World, target: Unit): "champion" | "minion" | "monster" | "other" => {
      if (target.petId === undefined) return "champion";
      const pet = world.pets.find((p) => p.id === target.petId);
      return pet ? pet.spec.targetClass ?? world.units[pet.owner].spec.petTargetClasses?.[pet.spec.name] ?? "other" : "other";
    };
    const mark = (ctx: HookContext, scale = 1) => {
      const target = ctx.enemy;
      if (!target.alive || ctx.world.pets.some((p) => p.id === target.petId && p.spec.hitPoints)) return;
      const old = target.statuses.find((s) => s.kind === "mark" && s.key === MARK && s.source === ctx.self.side && s.endTick > ctx.tick);
      const count = (old?.value ?? 0) + 1;
      target.statuses = target.statuses.filter((s) => s !== old);
      if (count < markCount) { target.statuses.push({ kind: "mark", key: MARK, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + ticks(markDuration), value: count }); return; }
      const championTarget = targetClass(ctx.world, target) === "champion";
      if (target.petId !== undefined) { const pet = ctx.world.pets.find((p) => p.id === target.petId); if (pet) pet.statuses = target.statuses; }
      ctx.apply({ type: "damage", damageType: "magic", amount: scaled(proc, scale), noLifeSteal: true, label: "Dirty Fighting" });
      if (championTarget && !ctx.self.statuses.some((s) => s.memoKey === SHIELD) && ctx.tick >= Number(ctx.memory[`${SHIELD}:ready`] ?? 0)) {
        ctx.apply({ type: "shield", amount: shield, duration: shieldDuration }, true);
        const status = ctx.self.statuses.at(-1); if (status?.kind === "shield") status.memoKey = SHIELD;
        ctx.memory[`${SHIELD}:active`] = true;
      }
    };
    const endRogue = (ctx: HookContext) => { ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== STEALTH && s.memoKey !== `${STEALTH}:hidden`); ctx.memory[STEALTH] = false; };
    const cancelSecond = (ctx: HookContext) => {
      if (!ctx.memory[`${SECOND}:pending`]) return;
      ctx.memory[`${SECOND}:pending`] = false; ctx.self.attackReadyTick = Math.max(ctx.tick, Number(ctx.memory[`${SECOND}:ready`] ?? ctx.tick));
      ctx.memory[`${SECOND}:msStart`] = ctx.tick; ctx.memory[`${SECOND}:ms`] = msAt20 * (1 + cancelASRatio * derive(ctx.self).bonusAttackSpeed);
    };
    const anchorFor = (world: World, self: Unit, direction?: number) => world.terrain.filter((t) => t.endTick > world.tick).map((t) => ({ terrain: t, x: self.x <= t.from ? t.from : self.x >= t.to ? t.to : self.x })).filter((a) => Math.abs(a.x - self.x) <= eRange && (direction === undefined || (a.x - self.x) * direction >= 0)).sort((a, b) => Math.abs(a.x - self.x) - Math.abs(b.x - self.x) || a.terrain.id - b.terrain.id)[0];
    const rBusy = (self: Unit) => Boolean(self.memory["akshan:r:phase"]);
    const eBusy = (self: Unit) => Boolean(self.memory[`${SWING}:phase`]);
    const makeShot = (ctx: HookContext) => {
      if (rBusy(ctx.self)) return;
      const priority = (target: Unit | Pet) => {
        const victim = "owner" in target ? petFormulaTarget(target, ctx.self, ctx.tick) : target;
        if (targetClass(ctx.world, victim) === "champion" && victim.statuses.some((s) => s.kind === "mark" && s.key === MARK && s.source === ctx.self.side && s.endTick > ctx.tick)) return 0;
        if (ctx.tick < Number(victim.memory[`akshan:targeted:${ctx.self.side}`] ?? -1)) return 1;
        return 2;
      };
      const candidates: Array<Unit | Pet> = [];
      if (ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= shotRange + ctx.enemy.spec.base.radius) candidates.push(ctx.enemy);
      candidates.push(...ctx.world.pets.filter((pet) => pet.owner !== ctx.self.side && pet.hp > 0 && !pet.spec.untargetable && Math.abs(pet.x - ctx.self.x) <= shotRange + pet.spec.radius && canTarget(petFormulaTarget(pet, ctx.self, ctx.tick), ctx.self)));
      candidates.sort((a, b) => (priority(a) - priority(b) || Math.abs(a.x - ctx.self.x) - Math.abs(b.x - ctx.self.x)) || ("id" in a ? a.id : -1) - ("id" in b ? b.id : -1));
      const target = candidates[0]; if (!target) return;
      const pet = "owner" in target ? target : undefined;
      ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Eshot", seenTick: ctx.tick, x: ctx.self.x, perTick: shotSpeed / 30, homing: true, direction: target.x >= ctx.self.x ? 1 : -1, travelLeft: Number.POSITIVE_INFINITY, projectile: true, connects: !ctx.self.statuses.some((s) => s.kind === "cc" && s.key === "blind" && s.endTick > ctx.tick), scale: 1, onHit: [{ type: "damage", damageType: "physical", amount: eBase }], ...(pet ? { pet: pet.id } : {}) });
    };
    const endSwing = (ctx: HookContext, finalShot = false) => {
      if (finalShot && ctx.memory[`${SWING}:phase`] === "swing") makeShot(ctx);
      ctx.memory[`${SWING}:phase`] = ""; delete ctx.self.chains.E;
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== SWING && s.memoKey !== `${SWING}:noAttacks`);
      if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E2") ctx.self.action = ctx.self.action.resume;
      if (ctx.memory[`${SWING}:reset`]) { delete ctx.self.cooldownHeld.E; ctx.self.cooldownReady.E = ctx.tick + ticks(eReset); ctx.memory[`${SWING}:reset`] = false; }
    };
    const endR = (ctx: HookContext, cancelled: boolean, death = false) => {
      ctx.memory["akshan:r:phase"] = ""; clearChannel(ctx.self);
      ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "akshan:r");
      delete ctx.self.cooldownHeld.R;
      ctx.self.cooldownReady.R = ctx.tick + ticks((cancelled && !death ? rGrace : rCD) / (1 + derive(ctx.self).abilityHaste / 100));
    };
    const releaseR = (ctx: HookContext) => {
      const elapsed = (ctx.tick - Number(ctx.memory["akshan:r:start"])) / 30;
      const count = Math.min(rCount, 1 + Math.floor(elapsed / rStore + 1e-9));
      ctx.memory["akshan:r:phase"] = "fire"; ctx.memory["akshan:r:count"] = count; ctx.memory["akshan:r:fired"] = 0; ctx.memory["akshan:r:release"] = ctx.tick;
      installChannel(ctx.self, { kind: "channel", ability: "Rfire", startTick: ctx.tick, endTick: ctx.tick + ticks(count * rInterval), nextTick: Number.POSITIVE_INFINITY, intervalTicks: Number.POSITIVE_INFINITY });
      ctx.apply({ type: "state", state: "revealed", duration: rReveal }); ctx.apply({ type: "state", state: "revealed", duration: rReveal }, true);
    };
    const stopBeforeTerrain = (world: World, self: Unit, destination: number, radius: number) => {
      let to = destination;
      for (const t of world.terrain.filter((t) => t.endTick > world.tick)) {
        if (to > self.x && self.x <= t.from - radius && to >= t.from - radius) to = Math.min(to, t.from - radius);
        if (to < self.x && self.x >= t.to + radius && to <= t.to + radius) to = Math.max(to, t.to + radius);
      }
      return to;
    };
    const ordinaryUsable = (self: Unit) => !rBusy(self) && !eBusy(self);
    const rogueCover = (world: World, self: Unit) => world.settings.environment.brush || world.terrain.some((t) => t.endTick > world.tick && self.x >= t.from - nearWall && self.x <= t.to + nearWall);
    const recastCC = (self: Unit, world: World) => !self.statuses.some((s) => s.kind === "cc" && s.endTick > world.tick && !["silence", "root", "ground", "slow", "blind", "cripple", "nearsight"].includes(s.key));
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cooldownAfter: "state", cost: q.cost(), castTime: q.castTime(), castDirection: "start", overlay: true, delivery: { kind: "self" }, roles: ["damage"], flags: { projectile: true, spellShield: true, petContactHooks: true }, estimate: (self, target) => evaluate(qDamage, self, target), estimateDelay: (self, target) => Math.abs(target.x - self.x) / qOut, usable: ordinaryUsable },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cooldownAfter: "state", cost: w.cost(), castTime: w.castTime(), moveWhileCasting: true, delivery: { kind: "self" }, roles: ["defense"], usable: (self) => ordinaryUsable(self) && !self.memory[STEALTH] },
      { key: "Wend", name: `${w.name} (end)`, slot: "W", countsAsCast: false, cooldown: 0, castTime: 0, delivery: { kind: "self" }, roles: [], usable: (self, world) => Boolean(self.memory[STEALTH]) && world.tick >= Number(self.memory[`${STEALTH}:start`]) + ticks(wRecast) },
      { key: "E", name: e.name, slot: "E", cooldown: eCD, cooldownAfter: "state", cost: e.cost(), castTime: e.castTime(), delivery: { kind: "self" }, overlay: true, overlayChannels: ["R", "Rfire"], roles: ["engage"], flags: { grounded: true }, usable: (self, world) => !eBusy(self) && Boolean(anchorFor(world, self)) },
      { key: "E2", name: `${e.name} (swing)`, slot: "E", cooldown: 0, castTime: 0, countsAsCast: false, delivery: { kind: "self" }, overlay: true, overlayChannels: ["R", "Rfire"], flags: { usableWhileDisabled: true, knockdown: true }, roles: [], usable: (self, world) => self.memory[`${SWING}:phase`] === "attached" && recastCC(self, world) },
      { key: "E3", name: `${e.name} (dismount)`, slot: "E", cooldown: 0, castTime: 0, countsAsCast: false, overlay: true, delivery: { kind: "self" }, flags: { usableWhileDisabled: true }, roles: [], usable: (self, world) => self.memory[`${SWING}:phase`] === "swing" && world.tick >= Number(self.memory[`${SWING}:start`]) + ticks(eRecast) && recastCC(self, world) },
      { key: "Eshot", name: `${e.name} (shot)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, budgetExcluded: true, delivery: { kind: "target", range: shotRange }, onHit: [{ type: "damage", damageType: "physical", amount: eBase }], flags: { projectile: true, parry: true, spellShield: true, basicDamage: true, petBasicAttack: true, appliesOnHit: true, appliesLifeSteal: true, petContactHooks: true }, onHitScale: eOnHit, roles: [], usable: () => false },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cooldownAfter: "state", cost: r.cost(), castTime: r.castTime(), overlay: true, delivery: { kind: "target", range: rRange, edge: false }, channel: { duration: rDuration, mobile: true, interruptible: false }, flags: { spellShield: false }, roles: ["damage"], usable: (self) => !rBusy(self), estimate: (self, target) => evaluate(rDamage, self, target) * (1 + rMissing * missingShare(target)), estimateDelay: () => rDuration + rInterval },
      { key: "Rrelease", name: `${r.name} (release)`, slot: "R", cooldown: 0, castTime: 0, countsAsCast: false, budgetExcluded: true, preserveChannel: true, allowedDuringChannel: ["R"], overlay: true, overlayChannels: ["R"], delivery: { kind: "self" }, roles: [], usable: (self, world) => self.memory["akshan:r:phase"] === "charge" && world.tick >= Number(self.memory["akshan:r:start"]) + ticks(rRecast) },
      { key: "Rfire", name: `${r.name} (firing)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, delivery: { kind: "self" }, channel: { duration: rCount * rInterval, mobile: true, interruptible: false }, roles: [], usable: () => false },
      { key: "Rbullet", name: `${r.name} (bullet)`, slot: "other", activation: "internal", cooldown: 0, castTime: 0, budgetExcluded: true, delivery: { kind: "target", range: rRange, missileSpeed: rSpeed }, onHit: [{ type: "damage", damageType: "physical", amount: rDamage }], flags: { projectile: true, spellShield: true, appliesLifeSteal: true, petContactHooks: true }, roles: [], usable: () => false },
    ];
    for (const key of ["Qout", "Qback"]) abilities.push({ key, name: q.name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "line", range: qRange, width: qWidth, speed: key === "Qout" ? qOut : qBack }, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }], flags: { projectile: true, spellShield: true, petContactHooks: true }, roles: [], usable: () => false });
    const get = (key: string) => abilities.find((a) => a.key === key)!;
    const behavior: Behavior = (view) => {
      if (view.self.memory[`${SWING}:phase`] === "attached" && canCast(view.world, view.self, get("E2"))) return { kind: "cast", ability: "E2" };
      if (view.self.memory[`${SWING}:phase`] === "swing" && canCast(view.world, view.self, get("E3"))) return { kind: "cast", ability: "E3", aim: { direction: 1, distance: Math.min(eJump, Math.max(0, view.distance - view.self.spec.attack.range)) } };
      const choice = defaultBehavior(view);
      if (view.mode === "flee" && choice?.kind === "move" && choice.direction === -1 && view.enemy.alive && (rogueCover(view.world, view.self) || Math.abs(view.enemy.x - view.self.x) > detect) && canCast(view.world, view.self, get("W"))) return { kind: "cast", ability: "W" };
      if (view.self.memory[`${SECOND}:pending`]) {
        if (choice?.kind === "cast" && (choice.dodge !== undefined || ["W", "E"].includes(choice.ability))) return choice;
        return undefined;
      }
      if (choice?.kind === "cast" && choice.ability === "Q" && view.distance > qRange + view.enemy.spec.base.radius) return { kind: "move", direction: 1 };
      return choice;
    };
    return {
      abilities, attack: { missileSpeed: basicSpeed, onHitToPets: true }, behavior,
      budget: { attacks: false, damage(self, target) {
        const d = derive(self), haste = 1 + d.abilityHaste / 100, delay = Math.max(secondLockout, attackTiming(self).windup / 30 / secondAS), cycle = attackTiming(self).windup / 30 + delay + 1 / d.attackSpeed;
        const qRate = 1 / (qCD / haste + qCast + qRange / qOut + qRange / qBack), rRate = 1 / (rCD / haste + rDuration + rCount * rInterval);
        return { physical: d.ad * (1 + secondRatio) * averageCritFactor(d.critChance, d.critDamage) / cycle + 2 * evaluate(qDamage, self, target) * qRate + rCount * evaluate(rDamage, self, target) * (1 + rMissing * missingShare(target)) * (1 + rCrit * d.critChance * (d.critDamage - 1)) * rRate,
          magic: evaluate(proc, self, target) * (2 / cycle + 2 * qRate + rCount * rRate) / markCount };
      }, healing: (self, target) => evaluate(shield, self, target) / (shieldDuration + shieldCD) },
      hooks: {
        onAttack(ctx) { endRogue(ctx); },
        onAttackLaunch(ctx) {
          ctx.memory[`${SECOND}:pending`] = true; ctx.memory[`${SECOND}:due`] = ctx.tick + ticks(Math.max(secondLockout, attackTiming(ctx.self).windup / 30 / secondAS));
          ctx.memory[`${SECOND}:pet`] = ctx.targetPet?.id ?? -1; ctx.memory[`${SECOND}:ready`] = ctx.self.attackReadyTick; ctx.self.attackReadyTick = Number.POSITIVE_INFINITY;
        },
        onAttackBeforeDamage(ctx) { if (!ctx.blocked) mark(ctx, ctx.scale); },
        onCastStart(ctx) { if (!["Wend", "E2", "E3", "Rrelease"].includes(ctx.ability.key)) endRogue(ctx); cancelSecond(ctx); },
        onCast(ctx) {
          if (ctx.ability.key === "Q") {
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "Q", memoKey: "akshan:q", source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0 });
            const direction = Number(ctx.memory["castDirection:Q"] ?? directionTo(ctx.self, ctx.enemy)) as 1 | -1;
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, Math.max(0, Math.abs(ctx.enemy.x - ctx.self.x) - ctx.enemy.spec.base.radius) / qOut, qWidth / 2);
            ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Qout", seenTick: ctx.tick, x: ctx.self.x, perTick: qOut / 30, direction, homing: false, travelLeft: qRange, projectile: true, connects: chance > .02, scale: chance >= .98 ? 1 : chance, radius: qWidth / 2, piercing: true, collisionPet: true, onHit: [{ type: "damage", damageType: "physical", amount: qDamage }] });
          }
          if (ctx.ability.key === "W") {
            ctx.memory[STEALTH] = true; ctx.memory[`${STEALTH}:start`] = ctx.tick; ctx.memory[`${STEALTH}:until`] = ctx.tick + ticks(wDuration);
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "W", memoKey: STEALTH, source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0 });
          }
          if (ctx.ability.key === "Wend") endRogue(ctx);
          if (ctx.ability.key === "E") {
            const anchor = anchorFor(ctx.world, ctx.self, ctx.aim ? directionTo(ctx.self, ctx.enemy) * ctx.aim.direction : undefined);
            if (!anchor) return;
            ctx.memory[`${SWING}:phase`] = "hook"; ctx.memory[`${SWING}:anchor`] = anchor.x; ctx.memory[`${SWING}:terrain`] = anchor.terrain.id;
            ctx.memory[`${SWING}:x`] = ctx.self.x; ctx.memory[`${SWING}:attach`] = ctx.tick + ticks(Math.abs(anchor.x - ctx.self.x) / hookSpeed); ctx.memory[`${SWING}:expires`] = ctx.tick + ticks(ePrepare);
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "E", memoKey: SWING, source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0 });
            ctx.self.statuses.push({ kind: "state", key: "noAttacks", ability: "E", memoKey: `${SWING}:noAttacks`, source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0 });
          }
          if (ctx.ability.key === "E2") {
            const anchor = Number(ctx.memory[`${SWING}:anchor`]), sign = ctx.self.x > anchor ? 1 : -1;
            if (Math.abs(ctx.self.x - anchor) < eRecoil) ctx.self.x = stopBeforeTerrain(ctx.world, ctx.self, anchor + sign * eRecoil, collision);
            ctx.memory[`${SWING}:phase`] = "swing"; ctx.memory[`${SWING}:start`] = ctx.tick; ctx.memory[`${SWING}:x`] = ctx.self.x; ctx.memory[`${SWING}:shots`] = 1;
            const resume = ctx.self.action;
            ctx.self.action = { kind: "dash", ability: "E2", startTick: ctx.tick, endTick: ctx.tick + ticks(Math.abs(ctx.self.x - anchor) * Math.acos(Math.min(1, collision / Math.abs(ctx.self.x - anchor))) / swingSpeed), perTick: 0, stopAtContact: false, unstoppable: false, ...(resume ? { resume } : {}) };
            makeShot(ctx);
          }
          if (ctx.ability.key === "E3") {
            const direction = directionTo(ctx.self, ctx.enemy) * (ctx.aim?.direction ?? 1), distance = Math.min(eJump, Math.max(0, ctx.aim?.distance ?? eJump));
            ctx.self.x = stopBeforeTerrain(ctx.world, ctx.self, ctx.self.x + direction * distance, ctx.self.spec.base.pathingRadius);
            endSwing(ctx, true);
          }
          if (ctx.ability.key === "R") {
            ctx.memory["akshan:r:phase"] = "charge"; ctx.memory["akshan:r:start"] = ctx.tick;
            ctx.self.statuses.push({ kind: "state", key: "lingering", ability: "R", memoKey: "akshan:r", source: ctx.self.side, startTick: ctx.tick, endTick: Number.POSITIVE_INFINITY, value: 0 });
            ctx.apply({ type: "state", state: "revealed", duration: rDuration + rReveal }); ctx.apply({ type: "state", state: "revealed", duration: rDuration + rReveal }, true);
          }
          if (ctx.ability.key === "Rrelease") releaseR(ctx);
        },
        beforeAbilityHit(ctx) { if (ctx.ability.key === "Eshot" && !hasState(ctx.enemy, "blockAttacks")) mark(ctx, eOnHit * ctx.scale); },
        onAbilityContact(ctx) {
          if (ctx.ability.key === "Eshot") {
            return [{ type: "damage", damageType: "physical", amount: eBase, amountFor: (self, target) => evaluate(eBase, self, target) * (1 + eAS * derive(self).bonusAttackSpeed), canCrit: true, critMultiplier: 1 + eCrit * (derive(ctx.self).critDamage - 1) }];
          }
          if (["Qout", "Qback"].includes(ctx.ability.key) && targetClass(ctx.world, ctx.enemy) !== "champion") return [{ type: "damage", damageType: "physical", amount: scaled(qDamage, qNonChampion) }];
          if (ctx.ability.key === "Rbullet") {
            const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find((p) => p.id === ctx.enemy.petId);
            const isMinion = pet && (pet.spec.targetClass ?? ctx.world.units[pet.owner].spec.petTargetClasses?.[pet.spec.name]) === "minion";
            return [{ type: "damage", damageType: isMinion ? "true" : "physical", amount: rDamage, amountFor: (self, target) => isMinion ? target.hp + target.statuses.filter((s) => s.kind === "shield").reduce((sum, s) => sum + s.value, 0) : evaluate(rDamage, self, target) * (1 + rMissing * missingShare(target)) * (1 + rCrit * derive(self).critChance * (derive(self).critDamage - 1)) }];
          }
        },
        onAbilityHit(ctx) {
          if (["Qout", "Qback", "Rbullet"].includes(ctx.ability.key)) mark(ctx, ctx.scale);
          if (ctx.ability.key === "Rbullet") ctx.enemy.memory[`akshan:targeted:${ctx.self.side}`] = ctx.tick + ticks(targetPriority);
          if (["Qout", "Qback"].includes(ctx.ability.key)) {
            ctx.apply({ type: "state", state: "revealed", duration: qReveal });
            if (targetClass(ctx.world, ctx.enemy) === "champion") { ctx.memory["akshan:q:msStart"] = ctx.tick; ctx.memory["akshan:q:ms"] = qMove + qMoveAP * derive(ctx.self).ap; }
          }
        },
        onMissileTick(ctx) { if (ctx.missile.source === "Rbullet") ctx.missile.direction = ctx.enemy.x >= ctx.missile.x ? 1 : -1; },
        onMissileContact(ctx) { if (ctx.missile.source === "Qout") ctx.missile.travelLeft = Math.max(ctx.missile.travelLeft, qExtension); },
        onMissileEnd(ctx) {
          if (ctx.missile.source === "Qout" && ctx.reason !== "blocked" && ctx.reason !== "intercepted" && !ctx.missile.intercepted) {
            const chance = skillshotChance(ctx.world, ctx.enemy, ctx.tick, Math.abs(ctx.enemy.x - ctx.missile.x) / qBack, qWidth / 2);
            ctx.world.missiles.push({ ...ctx.missile, id: ctx.world.nextId++, source: "Qback", seenTick: ctx.tick, perTick: qBack / 30, direction: ctx.self.x > ctx.missile.x ? 1 : -1, followOwner: true, travelLeft: Number.POSITIVE_INFINITY, connects: chance > .02, scale: chance >= .98 ? 1 : chance, hitTargets: [], hitPets: [], ended: false });
          } else if (["Qout", "Qback"].includes(ctx.missile.source)) ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== "akshan:q");
        },
        onDamageTaken(ctx) {
          if (ctx.memory[`${SHIELD}:active`] && !ctx.self.statuses.some((s) => s.memoKey === SHIELD && s.value > 0)) { ctx.memory[`${SHIELD}:active`] = false; ctx.memory[`${SHIELD}:ready`] = ctx.tick + ticks(shieldCD); }
        },
        onCCApplied(ctx) {
          if (eBusy(ctx.self) && (IMMOBILIZING.has(ctx.cc) || ctx.cc === "polymorph" || (ctx.cc === "ground" && ctx.memory[`${SWING}:phase`] !== "swing"))) endSwing(ctx);
          if (rBusy(ctx.self) && ["silence", "polymorph"].includes(ctx.cc)) endR(ctx, true);
        },
        onChannelInterrupt(ctx) { if (["R", "Rfire"].includes(ctx.ability.key) && ctx.memory["akshan:r:phase"]) endR(ctx, ctx.reason !== "death", ctx.reason === "death"); },
        onDashEnd(ctx) { if (ctx.ability.key === "E2" && ctx.memory[`${SWING}:phase`] === "swing") endSwing(ctx); },
        onKill(ctx) {
          if (ctx.pet || "owner" in ctx.victim || ctx.victim.petId !== undefined) return;
          if (eBusy(ctx.self)) ctx.memory[`${SWING}:reset`] = true;
          else { delete ctx.self.cooldownHeld.E; ctx.self.cooldownReady.E = ctx.tick + ticks(eReset); }
        },
        onTick(ctx) {
          ctx.memory["akshan:tick"] = ctx.tick;
          if (ctx.memory[`${SHIELD}:active`] && !ctx.self.statuses.some((s) => s.memoKey === SHIELD && s.value > 0 && s.endTick > ctx.tick)) { ctx.memory[`${SHIELD}:active`] = false; ctx.memory[`${SHIELD}:ready`] = ctx.tick + ticks(shieldCD); }
          for (const [key, seconds, stat] of [[SECOND, cancelDuration, "moveSpeedFlat"], ["akshan:q", qMoveSeconds, "moveSpeedPercent"]] as const) {
            const elapsed = ctx.tick - Number(ctx.memory[`${key}:msStart`] ?? -Number.MAX_SAFE_INTEGER), amount = Number(ctx.memory[`${key}:ms`] ?? 0) * Math.max(0, 1 - elapsed / ticks(seconds));
            if (amount > 0) ctx.buff(`${key}:decay`, stat, amount, 1 / 30);
          }
          if (ctx.memory[STEALTH]) {
            if (rogueCover(ctx.world, ctx.self)) ctx.memory[`${STEALTH}:until`] = ctx.tick + ticks(wDuration);
            if (ctx.tick >= Number(ctx.memory[`${STEALTH}:until`])) endRogue(ctx);
            else {
              ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== `${STEALTH}:hidden`);
              if (!ctx.enemy.alive || Math.abs(ctx.enemy.x - ctx.self.x) > detect) ctx.self.statuses.push({ kind: "state", key: "invisible", ability: "W", memoKey: `${STEALTH}:hidden`, source: ctx.self.side, startTick: ctx.tick, endTick: ctx.tick + 1, value: 0 });
            }
          } else ctx.self.statuses = ctx.self.statuses.filter((s) => s.memoKey !== `${STEALTH}:hidden`);
          if (ctx.memory[`${SECOND}:pending`]) {
            if (ctx.self.move !== 0 || ctx.self.action && ctx.self.action.kind !== "windup") cancelSecond(ctx);
            else if (ctx.tick >= Number(ctx.memory[`${SECOND}:due`])) {
              const id = Number(ctx.memory[`${SECOND}:pet`]); let target: Unit | Pet | undefined = id < 0 ? ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) ? ctx.enemy : undefined : ctx.world.pets.find((p) => p.id === id && p.hp > 0 && canTarget(petFormulaTarget(p, ctx.self, ctx.tick), ctx.self));
              if (!target) {
                const reach = ctx.self.spec.attack.range + extraRange + ctx.self.spec.base.radius;
                if (ctx.enemy.alive && canTarget(ctx.enemy, ctx.self) && Math.abs(ctx.enemy.x - ctx.self.x) <= reach + ctx.enemy.spec.base.radius) target = ctx.enemy;
                else target = ctx.world.pets.filter((p) => p.owner !== ctx.self.side && p.hp > 0 && !p.spec.untargetable && canTarget(petFormulaTarget(p, ctx.self, ctx.tick), ctx.self) && Math.abs(p.x - ctx.self.x) <= reach + p.spec.radius).sort((a, b) => a.hp - b.hp || a.id - b.id)[0];
              }
              if (target) {
                const pet = "owner" in target ? target : undefined, isMinion = pet && (pet.spec.targetClass ?? ctx.world.units[pet.owner].spec.petTargetClasses?.[pet.spec.name]) === "minion";
                launchBonusAttack(ctx.world, ctx.self, target, { baseDamageScale: isMinion ? minionRatio : secondRatio, critChance: derive(ctx.self).critChance, missileSpeed: secondSpeed, attackTag: SECOND });
                ctx.self.attackReadyTick = ctx.tick + ticks(1 / derive(ctx.self).attackSpeed); ctx.memory[`${SECOND}:pending`] = false;
              } else cancelSecond(ctx);
            }
          }
          const phase = String(ctx.memory[`${SWING}:phase`] ?? "");
          if (phase) {
            if (!ctx.world.terrain.some((t) => t.id === ctx.memory[`${SWING}:terrain`] && t.endTick > ctx.tick) || (phase !== "swing" && (ctx.self.forced || Math.abs(ctx.self.x - Number(ctx.memory[`${SWING}:x`])) > 1e-6 || ctx.tick >= Number(ctx.memory[`${SWING}:expires`])))) endSwing(ctx);
            else if (phase === "hook" && ctx.tick >= Number(ctx.memory[`${SWING}:attach`])) ctx.memory[`${SWING}:phase`] = "attached";
            else if (phase === "swing") {
              const anchor = Number(ctx.memory[`${SWING}:anchor`]), start = Number(ctx.memory[`${SWING}:x`]), radius = Math.abs(start - anchor), elapsed = (ctx.tick - Number(ctx.memory[`${SWING}:start`])) / 30;
              const desired = anchor + (start - anchor) * Math.cos(swingSpeed * elapsed / radius), toTerrain = stopBeforeTerrain(ctx.world, ctx.self, desired, collision);
              let to = toTerrain, collided = toTerrain !== desired;
              const championRadius = collision + ctx.enemy.spec.base.radius;
              if (ctx.enemy.alive && !isUntargetable(ctx.enemy, ctx.self) && Math.max(ctx.self.x, to) >= ctx.enemy.x - championRadius && Math.min(ctx.self.x, to) <= ctx.enemy.x + championRadius) { to = ctx.self.x <= ctx.enemy.x ? Math.max(ctx.self.x, ctx.enemy.x - championRadius) : Math.min(ctx.self.x, ctx.enemy.x + championRadius); collided = true; }
              if (ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E2") ctx.self.action.perTick = to - ctx.self.x;
              else { endSwing(ctx); }
              if (collided && ctx.self.action?.kind === "dash" && ctx.self.action.ability === "E2") ctx.self.action.endTick = ctx.tick;
              let shots = Number(ctx.memory[`${SWING}:shots`]);
              if (!collided && ctx.tick >= Number(ctx.memory[`${SWING}:start`]) + ticks(shots * eInterval)) { makeShot(ctx); shots++; ctx.memory[`${SWING}:shots`] = shots; }
            }
          }
          if (ctx.memory["akshan:r:phase"] === "charge") {
            if (!ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)) endR(ctx, true);
            else {
              const start = Number(ctx.memory["akshan:r:start"]);
              if ((ctx.tick - start) % ticks(rRefresh) === 0) for (const status of ctx.enemy.statuses) if (status.kind === "mark" && status.key === MARK && status.source === ctx.self.side) status.endTick = ctx.tick + ticks(markDuration);
              if (ctx.tick >= start + ticks(rDuration)) releaseR(ctx);
            }
          }
          if (ctx.memory["akshan:r:phase"] === "fire") {
            let fired = Number(ctx.memory["akshan:r:fired"]), count = Number(ctx.memory["akshan:r:count"]), released = Number(ctx.memory["akshan:r:release"]);
            if (!ctx.enemy.alive || isUntargetable(ctx.enemy, ctx.self)) { endR(ctx, false); return; }
            while (fired < count && ctx.tick >= released + ticks((fired + 1) * rInterval)) {
              ctx.world.missiles.push({ id: ctx.world.nextId++, owner: ctx.self.side, source: "Rbullet", seenTick: ctx.tick, x: ctx.self.x, perTick: rSpeed / 30, direction: directionTo(ctx.self, ctx.enemy), homing: true, collisionPet: true, radius: rWidth / 2, travelLeft: Number.POSITIVE_INFINITY, projectile: true, connects: true, scale: 1, onHit: get("Rbullet").onHit ?? [] });
              fired++;
            }
            ctx.memory["akshan:r:fired"] = fired;
            if (fired >= count) endR(ctx, false);
          }
        },
      },
    };
  },
};
export default akshan;
