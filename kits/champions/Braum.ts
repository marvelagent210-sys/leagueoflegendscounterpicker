import type { KitModule } from "../../engine/kits/compile";
import { canCast, canStartAttack } from "../../engine/sim/actions";
import { defaultBehavior, type Behavior } from "../../engine/sim/behavior";
import { abilityHit, abilityHitPet, applyEffect, canSee, directionTo, inStasis, isUntargetable } from "../../engine/sim/combat";
import { derive, evaluate, hasState } from "../../engine/sim/derived";
import { petFormulaTarget } from "../../engine/sim/petTarget";
import { canTargetPet } from "../../engine/sim/pets";
import type { AbilitySpec, Effect, Formula, HookContext, KitHooks } from "../../engine/sim/spec";
import type { Aim, Pet, Unit, World } from "../../engine/sim/state";
import { flat, ticks } from "./util";

const STACK = "braum:concussive", IMMUNE = "braum:concussiveImmune", EEND = "braum:eEnd", FIRST = "braum:eFirstTick";
const EPSILON = 1e-6;
type Body = { target: Unit; pet?: Pet };

const braum: KitModule = {
  champion: "Braum",
  build(kit) {
    const p = kit.ability("Concussive Blows"), q = kit.ability("Winter's Bite"), w = kit.ability("Stand Behind Me"), e = kit.ability("Unbreakable"), r = kit.ability("Glacial Fissure");
    const pDuration = p.quoted("for 4 seconds"), pCap = p.quoted("stacking up to 4 times"), pDamage = p.levelValue("26 – 196 (based on level)"), pStun = p.levelValue("stun them for 1.25 / 1.5 / 1.75", 1), pImmunity = p.field("targetCooldown"), pBonus = p.quoted("equal to 40% of the trigger damage") / 100;
    p.quote("won't be applied if the attack is dodged or blocked or if the attack misses"); p.quote("Once the first stack has been applied");
    p.gameQuote('"name":"StackDuration","values":[4.0,4.0,4.0,4.0,4.0,4.0,4.0]');
    const qDamage: Formula = { base: q.baseOf("Magic Damage"), ratios: { maxHP: q.quoted("(+ 2.5% of Braum's maximum health)") / 100 } };
    const qRange = q.fieldValues("range")[0]!, qWidth = q.field("width"), qSpeed = q.field("speed"), qSlow = q.quoted("slowing them by 70%") / 100, qSlowDuration = q.quoted("decaying over 2 seconds"), qCD = q.cooldown();
    q.gameQuote('"mMissileWidth":60.0', "Characters/Braum/Spells/BraumQAbility/BraumQMissile"); q.gameQuote('"mSpeed":1700.0'); q.gameQuote('"missileSpeed":1100.0', "Characters/Braum/Spells/BraumQAbility/BraumQ");
    const wSelfArmor = w.formula("Self Bonus Armor"), wSelfMR = w.formula("Self Bonus Magic Resistance"), wAllyArmor = w.formula("Ally Bonus Armor"), wAllyMR = w.formula("Ally Bonus Magic Resistance"), wDuration = w.quoted("for 3 seconds"), wRange = w.field("targetRange"), wOffset = w.quoted("150 units from his ally"), wEnemyRange = w.quoted("within 1500 units"), wCD = w.cooldown();
    w.quote("can be self cast"); w.quote("neither Braum nor his ally receive the bonus resistances"); w.quote("allied minions but not on wards nor traps"); w.gameQuote('"name":"BonusDashSpeed","values":[750.0,750.0,750.0,750.0,750.0,750.0,750.0]');
    const eReduction = e.fraction("Damage reduction"), eDuration = e.number("Barrier Duration"), eMS = e.quoted("gains 10% bonus movement speed") / 100;
    e.textField("cooldownStart"); e.quote("full damage reduction can block multiple instances of damage if they're dealt at the same time"); e.quote("nothing but true damage"); e.quote("Braum's facing direction is in the direction he's moving in"); e.quote("relative to the ability's center and not the caster's"); e.quote("Projectiles whose effects trigger on collision will still trigger");
    e.gameQuote('"name":"ShieldFacingDRAmount","values":[30.0,35.0,40.0,45.0,50.0,55.0,60.0]');
    const rDamage = r.formula("Magic Damage"), rRange = r.field("range", "Fissure missile"), rSpeed = r.field("speed"), rWidth = r.field("width", "Fissure missile"), rPoint = r.field("effectRadius", "Point blank"), rAir = r.quoted("at least 0.6 seconds"), rAirMax = r.number("Maximum Knock up Duration"), rSlow = r.fraction("Slow"), rInterval = r.quoted("every 0.25 seconds"), rDuration = r.quoted("lasting for 4 seconds"), rCD = r.cooldown();
    r.field("width", "Slow field"); r.field("effectRadius", "Rectangle lollipop"); r.gameQuote('"mSpeed":1400.0'); r.gameQuote('"name":"MaxKnockupRatio","values":[0.8999999761581421,0.8999999761581421,0.8999999761581421,0.8999999761581421,0.8999999761581421,0.8999999761581421,0.8999999761581421]'); r.gameQuote('"mCastTime":0.5', "Characters/Braum/Spells/BraumRWrapperAbility/BraumRWrapper");

    const bodies = (world: World, self: Unit): Body[] => [{ target: world.units[1 - self.side]! }, ...world.pets.filter(pet => pet.owner !== self.side && pet.hp > 0 && !pet.spec.untargetable).map(pet => ({ target: petFormulaTarget(pet, self, world.tick), pet }))];
    const valid = (target: Unit, self: Unit) => target.alive && target.hp > 0 && !isUntargetable(target, self) && !inStasis(target);
    const mark = (target: Unit, key: string, self: Unit, tick: number) => target.statuses.find(s => s.kind === "mark" && s.key === key && s.source === self.side && s.endTick > tick);
    const internal = (key: string, name: string, effects: Effect[], shield = true): AbilitySpec => ({ key, name, slot: "other", activation: "internal", budgetExcluded: true, cooldown: 0, castTime: 0, delivery: { kind: "self" }, flags: { spellShield: shield, petContactHooks: true }, onHit: effects, usable: () => false });
    const proc = internal("Iproc", p.name, [{ type: "damage", damageType: "magic", amount: flat(pDamage), noLifeSteal: true, petDamageCategory: "proc" }, { type: "cc", cc: "stun", duration: pStun }]);
    const bonus = internal("Ibonus", `${p.name} (immunity damage)`, [{ type: "damage", damageType: "magic", amount: flat(pDamage * pBonus), noLifeSteal: true, petDamageCategory: "proc" }]);
    const rEffects: Effect[] = [{ type: "damage", damageType: "magic", amount: rDamage }, { type: "cc", cc: "airborne", duration: rAir }];
    const point = internal("Rpoint", r.name, rEffects), slow = internal("Rslow", `${r.name} (ice field)`, [{ type: "cc", cc: "slow", duration: rInterval, strength: rSlow }], false); point.persistsAfterDeath = slow.persistsAfterDeath = true;
    const hit = (ctx: HookContext, body: Body, spell: AbilitySpec, effects = spell.onHit ?? [], scale = 1) => body.pet ? abilityHitPet(ctx.world, ctx.self, body.pet, spell, effects, "area", scale) : abilityHit(ctx.world, ctx.self, body.target, spell, effects, scale);
    const stack = (ctx: HookContext, basic: boolean, scale: number) => {
      const pet = ctx.enemy.petId === undefined ? undefined : ctx.world.pets.find(p => p.id === ctx.enemy.petId);
      if (!valid(ctx.enemy, ctx.self) || pet?.spec.hitPoints || pet?.spec.fixedDamage || pet?.spec.diesToChampionAttack) return;
      if (mark(ctx.enemy, IMMUNE, ctx.self, ctx.tick)) { if (basic) hit(ctx, { target: ctx.enemy, ...(pet ? { pet } : {}) }, bonus, bonus.onHit, scale); return; }
      const current = mark(ctx.enemy, STACK, ctx.self, ctx.tick), next = (current?.value ?? 0) + scale;
      if (current) { current.value = next; current.endTick = ctx.tick + ticks(pDuration); }
      else applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: STACK, duration: pDuration, value: next }, { scale: 1 });
      if (next + EPSILON < pCap) return;
      ctx.enemy.statuses = ctx.enemy.statuses.filter(s => !(s.key === STACK && s.source === ctx.self.side));
      if (pet) pet.statuses = ctx.enemy.statuses;
      applyEffect(ctx.world, ctx.self, ctx.enemy, { type: "mark", key: IMMUNE, duration: pImmunity }, { scale: 1 });
      if (pet) pet.statuses = ctx.enemy.statuses;
      hit(ctx, { target: ctx.enemy, ...(pet ? { pet } : {}) }, proc);
      if (pet) pet.statuses = ctx.enemy.statuses;
    };
    const eligibleAllies = (world: World, self: Unit) => world.pets.filter(pet => pet.owner === self.side && (pet.spec.targetClass === "champion" || pet.spec.targetClass === "minion") && !pet.spec.hitPoints && !pet.spec.fixedDamage && canTargetPet(pet, self, world.tick) && Math.abs(pet.x - self.x) <= wRange + EPSILON);
    const anchor = (ctx: HookContext, aim?: Aim) => { if (aim?.distance === undefined) return undefined; const x = ctx.self.x + directionTo(ctx.self, ctx.enemy) * aim.direction * aim.distance; return eligibleAllies(ctx.world, ctx.self).sort((a,b) => Math.abs(a.x-x) - Math.abs(b.x-x) || a.id-b.id)[0]; };
    const buffW = (ctx: HookContext, pet?: Pet) => {
      const view = { ...ctx.self, statuses: ctx.self.statuses.filter(s => s.memoKey !== "buff:braum:wArmor" && s.memoKey !== "buff:braum:wMR") };
      const armor = evaluate(wSelfArmor, view), mr = evaluate(wSelfMR, view), allyArmor = evaluate(wAllyArmor, view), allyMR = evaluate(wAllyMR, view);
      ctx.buff("braum:wArmor", "armor", armor, wDuration); ctx.buff("braum:wMR", "MR", mr, wDuration);
      if (pet) { const target = petFormulaTarget(pet, ctx.self, ctx.tick); applyEffect(ctx.world, ctx.self, target, { type: "stat", stat: "armor", amount: flat(allyArmor), duration: wDuration }, { ability: abilities[1]!, scale: 1 }); applyEffect(ctx.world, ctx.self, target, { type: "stat", stat: "MR", amount: flat(allyMR), duration: wDuration }, { ability: abilities[1]!, scale: 1 }); pet.statuses = target.statuses; }
    };
    const activeE = (self: Unit, tick: number) => tick < Number(self.memory[EEND] ?? 0) && self.statuses.some(s => s.kind === "state" && s.key === "lingering" && s.ability === "E" && s.endTick > tick);
    const frontal = (self: Unit, source: Unit, originX: number) => (Math.sign(originX - self.x) || directionTo(self, source)) === (self.facing ?? directionTo(self, source));
    const firstEligible = (source: Unit) => source.petId === undefined || source.spec.targetClass === "champion" || source.spec.unitClass === "clone";
    const consumeFirst = (ctx: HookContext) => { if (ctx.memory[FIRST] === undefined) ctx.memory[FIRST] = ctx.tick; };
    const rId = (ctx: HookContext) => Number(ctx.memory["braum:rCurrent"] ?? 0);
    const rKey = (ctx: HookContext, target: Unit) => `braum:r:${rId(ctx)}:hit:${target.petId ?? -1}`;
    const abilities: AbilitySpec[] = [
      { key: "Q", name: q.name, slot: "Q", cooldown: qCD, cost: q.cost(), castTime: q.castTime(), castDirection: "start", delivery: { kind: "line", range: qRange, width: qWidth, speed: qSpeed, radius: qWidth / 2, collisionPet: true }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: [{ type: "damage", damageType: "magic", amount: qDamage }, { type: "cc", cc: "slow", duration: qSlowDuration, strength: qSlow }], decisive: true, usable: self => !self.action || self.action.kind !== "dash" || self.action.ability !== "W" || activeE(self, Number(self.memory["braum:tick"] ?? 0)), persistsAfterDeath: true, roles: ["damage", "cc"] },
      { key: "W", name: w.name, slot: "W", cooldown: wCD, cost: w.cost(), castTime: w.castTime(), delivery: { kind: "self" }, flags: { grounded: true }, roles: ["defense"], budgetExcluded: true },
      { key: "E", name: e.name, slot: "E", cooldown: e.cooldown(), cost: e.cost(), castTime: e.castTime(), cooldownAfter: "state", delivery: { kind: "self" }, overlay: true, overlayResumedDash: true, onSelf: [{ type: "state", state: "lingering", duration: eDuration }, { type: "state", state: "projectileIntercept", duration: eDuration }, { type: "state", state: "ghosted", duration: eDuration }, { type: "stat", stat: "moveSpeedPercent", amount: flat(eMS), duration: eDuration }], roles: ["defense"], usable: (self,world) => !activeE(self,world.tick), budgetExcluded: true },
      { key: "R", name: r.name, slot: "R", cooldown: rCD, cost: r.cost(), castTime: r.castTime(), castDirection: "start", delivery: { kind: "line", range: rRange, width: rWidth, speed: rSpeed, radius: rWidth / 2, piercing: true, collisionPet: true }, flags: { projectile: true, spellShield: true, petContactHooks: true }, onHit: rEffects, decisive: true, persistsAfterDeath: true, roles: ["damage", "cc"], usable: (self,world) => !self.action || self.action.kind !== "dash" || self.action.ability !== "W" || activeE(self,world.tick) },
      proc, bonus, point, slow,
    ];
    const byKey = (key: string) => abilities.find(a => a.key === key)!;
    const behavior: Behavior = view => {
      const {self,enemy,world,mode} = view;
      const normal = defaultBehavior({ ...view, self: { ...self, spec: { ...self.spec, abilities: [] } } });
      if (mode === "idle") return undefined;
      if (self.memory.tradeDone) return { kind: "move", direction: -1 };
      const ready = (key: string) => canCast(world,self,byKey(key));
      if (mode === "flee") {
        const ally = eligibleAllies(world,self).filter(pet => Math.abs(pet.x-enemy.x) > Math.abs(self.x-enemy.x)+wOffset).sort((a,b) => Math.abs(b.x-enemy.x)-Math.abs(a.x-enemy.x) || a.id-b.id)[0];
        if (ally && ready("W")) return {kind:"cast",ability:"W",aim:{direction:Math.sign((ally.x-self.x)*directionTo(self,enemy))<0?-1:1,distance:Math.abs(ally.x-self.x)}};
        if (view.threats.length && ready("E")) return { kind: "cast", ability: "E" }; if (view.threats.length && ready("W")) return { kind: "cast", ability: "W" }; if (ready("Q")) return { kind: "cast", ability: "Q" }; return normal;
      }
      if (self.action) return normal;
      if (view.threats.length && ready("E")) return { kind: "cast", ability: "E" };
      if (ready("W") && Math.abs(enemy.x-self.x) <= qRange) return { kind: "cast", ability: "W" };
      if (mode !== "hold" && mode !== "trade" && ready("R")) return { kind: "cast", ability: "R" };
      if (canStartAttack(world,self)) return { kind: "attack" };
      if (ready("Q")) return { kind: "cast", ability: "Q" };
      return normal;
    };
    const hooks: KitHooks = {
      onAttackHit(ctx) { if (!ctx.blocked) stack(ctx,true,ctx.scale); },
      onAttackPetHit(ctx) { if (!ctx.blocked) stack(ctx,true,ctx.scale); },
      onAbilityContact(ctx) { if (ctx.ability.key === "R" || ctx.ability.key === "Rpoint") { const key = rKey(ctx,ctx.enemy); if (ctx.memory[key]) return []; ctx.memory[key] = true; } },
      onAbilityHit(ctx) { if (ctx.ability.key === "Q") { stack(ctx,false,ctx.scale); const status = ctx.enemy.statuses.findLast(s => s.kind === "cc" && s.key === "slow" && s.ability === "Q" && s.source === ctx.self.side); if (status) status.memoKey = "braum:qSlow"; const pet = ctx.world.pets.find(p => p.id === ctx.enemy.petId); if (pet) pet.statuses = ctx.enemy.statuses; } },
      onCastStart(ctx) { if (ctx.ability.key === "R") { ctx.memory["braum:rSerial"] = Number(ctx.memory["braum:rSerial"] ?? 0) + 1; ctx.memory[`braum:rCast:${ctx.tick}`] = ctx.memory["braum:rSerial"]!; ctx.memory["braum:rCurrent"] = ctx.memory["braum:rSerial"]!; } },
      onCast(ctx) {
        if (ctx.ability.key === "W") {
          const pet = anchor(ctx,ctx.aim);
          if (pet) {
            const ally = petFormulaTarget(pet,ctx.self,ctx.tick), enemies = bodies(ctx.world,ctx.self).filter(body => (body.target.petId === undefined || body.target.spec.targetClass === "champion" || body.target.spec.unitClass === "clone") && valid(body.target,ctx.self) && canSee(body.target,ctx.self) && Math.abs(body.target.x-ally.x) <= wEnemyRange).sort((a,b) => Math.abs(a.target.x-ally.x)-Math.abs(b.target.x-ally.x));
            const dir = enemies[0] ? directionTo(ally,enemies[0].target) : (Math.sign(ally.x-ctx.self.x) || directionTo(ctx.self,ctx.enemy));
            const desired = ally.x + dir*wOffset, delta = desired-ctx.self.x, maximum = enemies.length ? wRange+wOffset : wRange;
            const endpoint = ctx.self.x + Math.sign(delta)*Math.min(Math.abs(delta),maximum);
            if (ctx.world.terrain.some(wall => wall.endTick > ctx.tick && endpoint + ctx.self.spec.base.pathingRadius > wall.from + EPSILON && endpoint - ctx.self.spec.base.pathingRadius < wall.to - EPSILON)) return;
            ctx.self.x = endpoint;
          }
          buffW(ctx,pet);
        }
        if (ctx.ability.key === "E") { ctx.memory[EEND] = ctx.tick + ticks(eDuration); delete ctx.memory[FIRST]; ctx.self.facing = directionTo(ctx.self,ctx.enemy) * (ctx.aim?.direction ?? 1) as 1 | -1; }
        if (ctx.ability.key === "R") {
          for (const body of bodies(ctx.world,ctx.self).filter(body => valid(body.target,ctx.self) && !body.pet?.spec.hitPoints && Math.abs(body.target.x-ctx.self.x) <= rPoint + EPSILON).sort((a,b) => Math.abs(a.target.x-ctx.self.x)-Math.abs(b.target.x-ctx.self.x) || (a.pet?.id ?? -1)-(b.pet?.id ?? -1))) hit(ctx,body,point);
        }
      },
      modifyDamageBeforeShields(ctx) {
        if (ctx.damageType === "true" || !activeE(ctx.self,ctx.tick) || !frontal(ctx.self,ctx.enemy,ctx.originX)) return ctx.amount;
        if (firstEligible(ctx.enemy)) consumeFirst(ctx);
        return Number(ctx.memory[FIRST]) === ctx.tick ? 0 : ctx.amount*(1-eReduction);
      },
      onSpellShieldBlock(ctx) {
        if (!activeE(ctx.self,ctx.tick) || !frontal(ctx.self,ctx.source,ctx.originX) || !firstEligible(ctx.source)) return;
        if (ctx.effects.some(effect => effect.type === "damage" && effect.damageType !== "true" || effect.type === "dot" && effect.damageType !== "true")) consumeFirst(ctx);
      },
      onMissileTick(ctx) {
        const m=ctx.missile;if(m.source!=="R")return;ctx.memory["braum:rCurrent"]=Number(ctx.memory[`braum:rCast:${m.seenTick}`] ?? ctx.memory["braum:rSerial"] ?? m.id);
        const enemy=ctx.world.units[1-ctx.self.side]!;if(ctx.memory[rKey(ctx,enemy)] && !m.hitTargets?.includes(enemy.side))(m.hitTargets??=[]).push(enemy.side);
        for(const pet of ctx.world.pets)if(ctx.memory[rKey(ctx,petFormulaTarget(pet,ctx.self,ctx.tick))] && !m.hitPets?.includes(pet.id))(m.hitPets??=[]).push(pet.id);
      },
      onMissileMove(ctx) {
        if(ctx.missile.source!=="R")return;
        const from=ctx.from,to=ctx.to;if(Math.abs(to-from)<=EPSILON)return;
        ctx.world.zones.push({id:ctx.world.nextId++,owner:ctx.self.side,kind:"field",ability:slow.key,seenTick:ctx.missile.seenTick,x:(from+to)/2,radius:Math.abs(to-from)/2,startTick:ctx.tick,endTick:ctx.tick+ticks(rDuration),interval:ticks(rInterval),nextTick:ctx.tick,onHit:slow.onHit});
      },
      onTick(ctx) {
        ctx.memory["braum:tick"]=ctx.tick;
        if (ctx.self.resurrection) { ctx.memory[EEND] = 0; delete ctx.memory[FIRST]; ctx.self.statuses = ctx.self.statuses.filter(status => status.ability !== "E"); }
        for(const body of bodies(ctx.world,ctx.self)){for(const status of body.target.statuses)if(status.memoKey==="braum:qSlow"&&status.source===ctx.self.side)status.value=qSlow*Math.max(0,1-(ctx.tick-status.startTick)/ticks(qSlowDuration));if(body.pet)body.pet.statuses=body.target.statuses;}
      },
    };
    kit.assume("Concussive Blows begins empty and belongs to each actual enemy body for 4 seconds. Four own unblocked basic/Q contacts consume the stacks for 216 magic and 1.75-second stun at level 20, then a 4-second target-local immunity allows only Braum basic 40% bonus packets. Spell shield and parry guard the proc. No allied champion or clone is supplied in an ordinary duel; allied-champion extra stacking is an explicit unsupported boundary rather than inferred from damage observations. Hit-count/fixed-damage props do not acquire fabricated health-based procs.");
    kit.assume("Winter's Bite uses the actual first-body 1050-range, 120-width missile at 1700 speed, 255 + 2.5% own max HP, 70% linear slow over 2 seconds and its actual recipient's passive mark. The generic Q wrapper's 1100 speed and 70 lineWidth are not the actual missile: the exact QMissile record and primary 1700/120 win. The parser's named own-health ratio is reconstructed from the unchanged primary quote during compilation.");
    kit.assume("Stand Behind Me defaults to the source's valid self-cast, granting 40 + 36% bonus armor/MR for 3 seconds. Explicit aim can select a real eligible allied minion/champion body within 650; it receives 40 + 12% of Braum's corresponding bonus resistance. No ward/trap or fabricated ally is used. The 150-unit landing offset chooses the closest visible actual enemy champion within 1500, or the far side when none exists. Neither primary nor binary supplies the complete dash-speed formula: BonusDashSpeed 750 and generic missileSpeed 1500 are retained without invention. Allied travel therefore uses an explicit immediate guarded relocation, with no invented finite interruption window; a blocked terrain endpoint grants no resists. Refreshed own buffs replace their keyed contribution and exclude the previous own contribution from the scaling snapshot.");
    kit.assume("Unbreakable lasts 4 seconds, then starts its 8-second hasted cooldown. It grants 10% MS/ghosting and 55% frontal damage reduction; the first actual champion/explicit champion-class clone nontrue packet is fully negated before shields/vamp, including further same-tick packets. True damage neither reduces nor spends it. Spell shields can spend the first reduction on a frontal nontrue damage packet. Frontal selection follows actual scalar facing and damage origin, including supplied ground centers; overlap uses directionTo. Turrets and unsupported lateral barrier geometry are absent. Projectile interception must resolve collision effects before destruction, not masquerade as a Wind Wall.");
    kit.assume(`Glacial Fissure casts from its completion position after 0.5 seconds, deals 350 + 60% AP once per actual target in the 300-center point-blank area and piercing 1200-range 230-width missile at 1400 speed. A newly swept ice segment persists 4 seconds and applies 60% slow every 0.25 seconds, then disappears in creation order. Damage/knockup retains each body's spell-shield/parry/CC guards; released missile/ice can persist after death. The primary only bounds first-target knockup between ${rAir} and ${rAirMax} seconds, while the binary 0.9 MaxKnockupRatio gives no complete interpolation expression. The unresolved distance curve conservatively uses the sourced ${rAir}-second floor; the unsized endpoint rectangle and lateral field width are retained evidence, not invented extra axial reach.`);
    kit.assume("Ordinary behavior casts real self defenses, Q and basics, reserves actually available R in hold/trade, and completes trade retreat before optional spells. No preduel stacks/allies are fabricated. Reference damage prices source Q/R and passive contacts constrained by basic/Q cadence and the target-local immunity; resistance multipliers price nominal self-W uptime without inventing healing from E's reduction.");
    return { abilities, hooks, behavior, attack: { onHitToPets: true }, budget: { damage(self,target) { const d=derive(self),haste=1+d.abilityHaste/100,qRate=haste/qCD,contacts=d.attackSpeed+qRate,cycle=pCap/Math.max(EPSILON,contacts)+pImmunity;return {magic:evaluate(qDamage,self,target)*qRate+evaluate(rDamage,self,target)*haste/rCD+(pDamage+pDamage*pBonus*d.attackSpeed*pImmunity)/cycle}; },statMultipliers:{armor:1+(wSelfArmor.ratios?.bonusArmor??0)*wDuration/wCD,mr:1+(wSelfMR.ratios?.bonusMR??0)*wDuration/wCD} } };
  },
};
export default braum;
