/** Malphite: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { combineSlowResist } from "../../engine/rules/movement";
import { derive, hasState } from "../../engine/sim/derived";
import type { Unit } from "../../engine/sim/state";
import type { HookContext } from "../../engine/sim/spec";
import { maxHp, ticks } from "./util";

const malphite: KitModule = {
  champion: "Malphite",
  build(kit) {
    const innate = kit.ability("Granite Shield");
    const q = kit.ability("Seismic Shard");
    const w = kit.ability("Thunderclap");
    const e = kit.ability("Ground Slam");
    const r = kit.ability("Unstoppable Force");

    const shieldShare = innate.quoted("a shield equal to 10% of his maximum health", 0) / 100;
    const shieldDelay = innate.field("staticCooldown");
    innate.quote("Granite Shield does not refresh its cooldown from damage that is mitigated by shields");
    const armorShare = w.shareOf("Bonus Armor");
    const armorShielded = w.shareOf("Increased Bonus Armor");
    const qSlow = q.fraction("Slow");
    const qSeconds = q.quoted("slows them for 3 seconds upon impact", 0);
    const clapSeconds = w.quoted("on-hit for the next 5 seconds", 0);
    w.quote("The main target is dealt basic damage, though without applying life steal");
    w.quote("Prevents Malphite from casting Seismic Shard and Ground Slam during its windup");
    w.quote("Cannot have its windup canceled by new movement or attack commands, or casting Unstoppable Force");
    q.quote("Slow-resistant and slow-immune targets will reduce or nullify Malphite's gain");
    q.quote("If the target becomes untargetable, dies, or is too far away or no longer in sight during the cast time, this ability will cancel but does not go on cooldown nor pay its cost");
    const knockUp = r.quoted("knocks them up for 1.5 seconds", 0);
    const moveSpeed = kit.champion.forms[0]?.stats.moveSpeed ?? 335;
    kit.assume("Unstoppable Force's dash speed (1500 + 100% movement speed) uses Malphite's base movement speed.");

    const graniteShield = (unit: Unit) => unit.statuses.find((s) => s.kind === "shield" && s.key === "shield" && s.source === unit.side && s.value > 0);
    const armor = (ctx: HookContext) => ctx.buff("thunderclap", "armorPercent", graniteShield(ctx.self) ? armorShielded : armorShare, 1e9);
    const granite = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "shield" && s.key === "shield" && s.source === ctx.self.side));
      ctx.apply({ type: "shield", amount: { base: shieldShare * maxHp(ctx.self) }, duration: 1e9 }, true);
      ctx.memory.graniteReady = -1;
      armor(ctx);
    };
    const protectedWindup = (unit: Unit) => [unit.action, unit.pendingAttack].some((action) => action?.kind === "windup" && action.onHit.some((effect) => effect.type === "damage" && effect.label === w.name));
    const endCharge = (ctx: HookContext) => {
      ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "state" && s.key === "displacementImmune" && s.ability === "R"));
      ctx.memory.charging = false;
    };

    return {
      budget: {
        // Thunderclap's passive: more armor for each point, as long as Granite Shield holds.
        totalResistanceMultipliers: { armor: 1 + armorShare },
        // Granite Shield, once a fight.
        healing: (self) => (shieldShare * maxHp(self)) / 10,
      },
      hooks: {
        onStart(ctx) {
          granite(ctx);
          ctx.memory.granite = true;
        },
        onTick(ctx) {
          const up = graniteShield(ctx.self);
          const ready = Number(ctx.memory.graniteReady ?? -1);
          if (ready >= 0 && ctx.tick >= ready && (!up || up.value < shieldShare * maxHp(ctx.self))) granite(ctx);
          // Thunderclap's passive: bonus armor, tripled while Granite Shield holds.
          armor(ctx);
          if (ctx.memory.charging && !(ctx.self.action?.kind === "dash" && ctx.self.action.ability === "R")) endCharge(ctx);
        },
        onDamageTaken(ctx) {
          // The first damage starts replenishment; subsequent shield-only damage does not
          // refresh an already running cooldown. Health damage always restarts it.
          if (ctx.amount > 0 || Number(ctx.memory.graniteReady ?? -1) < 0) ctx.memory.graniteReady = ctx.tick + ticks(shieldDelay);
          armor(ctx);
        },
        beforeAbilityHit(ctx) {
          if (ctx.ability.key !== "Q") return;
          const enemy = ctx.enemy;
          const resist = combineSlowResist(enemy.statuses.filter((s) => s.kind === "stat" && s.key === "slowResist").map((s) => s.value));
          const existing = Math.max(0, ...enemy.statuses.filter((s) => s.kind === "cc" && (s.key === "slow" || s.key === "drowsy")).map((s) => s.value));
          const before = 1 - existing * (1 - resist);
          const after = 1 - Math.max(existing, qSlow) * (1 - resist);
          ctx.memory.shardSpeed = hasState(enemy, "slowImmune") || hasState(enemy, "ccImmune") || before <= 0 ? 0 : Math.max(0, derive(enemy).rawMoveSpeed * (1 - after / before));
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key === "Q") ctx.buff("seismicShard", "moveSpeedFlat", Number(ctx.memory.shardSpeed ?? 0), qSeconds);
          if (ctx.ability.key === "R") endCharge(ctx);
        },
        onCast(ctx) {
          if (ctx.ability.key === "R") ctx.memory.charging = true;
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          cost: q.cost(),
          castTime: q.castTime(),
          cancelOnInvalidTarget: true,
          usable: (unit) => !protectedWindup(unit),
          delivery: { kind: "target", range: q.field("targetRange"), missileSpeed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") },
            { type: "cc", cc: "slow", strength: qSlow, duration: qSeconds },
          ],
          flags: { projectile: true },
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          cost: w.cost(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            {
              type: "empower",
              attacks: 1,
              window: w.quoted("next basic attack within 6 seconds", 0),
              bonusRange: w.quoted("gain 50 bonus range", 0),
              uncancellable: true,
              resetAttack: true,
              onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Additional Physical Damage"), label: w.name, noLifeSteal: true }],
            },
            // For 5 seconds, every attack also triggers the cone.
            { type: "empower", attacks: 99, window: clapSeconds, onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Physical Damage"), label: "Thunderclap (cone)", noLifeSteal: true }] },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
          usable: (unit) => !protectedWindup(unit),
          delivery: { kind: "aura", radius: e.field("effectRadius") },
          onHit: [
            { type: "damage", damageType: "magic", amount: e.formula("Magic Damage") },
            { type: "cc", cc: "cripple", strength: e.fraction("Cripple Strength"), duration: e.quoted("crippling them for 3 seconds", 0) },
          ],
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cooldown: r.cooldown(),
          cost: r.cost(),
          castTime: r.castTime(),
          preserveAttackWindup: true,
          delivery: { kind: "dash", direction: "toward", distance: r.field("targetRange", "Maximum dash distance"), speed: r.field("speed") + moveSpeed, hitRadius: r.field("effectRadius") },
          onSelf: [{ type: "state", state: "displacementImmune", duration: 1 }],
          onHit: [
            { type: "damage", damageType: "magic", amount: r.formula("Magic Damage") },
            { type: "displace", direction: "away", distance: 0, duration: knockUp },
          ],
          flags: { grounded: true, knockdown: false },
        },
      ],
    };
  },
};

export default malphite;
