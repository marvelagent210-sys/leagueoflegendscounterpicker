/** Malphite: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import type { HookContext } from "../../engine/sim/spec";
import { maxHp } from "./util";

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
    const armorShare = w.shareOf("Bonus Armor");
    const armorShielded = w.shareOf("Increased Bonus Armor");
    const qSlow = q.fraction("Slow");
    const qSeconds = q.quoted("slows them for 3 seconds upon impact", 0);
    const clapSeconds = w.quoted("on-hit for the next 5 seconds", 0);
    const knockUp = r.quoted("knocks them up for 1.5 seconds", 0);
    const moveSpeed = kit.champion.forms[0]?.stats.moveSpeed ?? 335;
    kit.assume("Unstoppable Force's dash speed (1500 + 100% movement speed) uses Malphite's base movement speed.");

    const granite = (ctx: HookContext) => ctx.apply({ type: "shield", amount: { base: shieldShare * maxHp(ctx.self) }, duration: 1e9 }, true);

    return {
      budget: {
        // Thunderclap's passive: more armor for each point, as long as Granite Shield holds.
        statMultipliers: { armor: 1 + armorShare },
        // Granite Shield, once a fight.
        healing: (self) => (shieldShare * maxHp(self)) / 10,
      },
      hooks: {
        onStart(ctx) {
          granite(ctx);
          ctx.memory.granite = true;
        },
        onTick(ctx) {
          const up = ctx.self.statuses.some((s) => s.kind === "shield" && s.key === "shield" && s.source === ctx.self.side && s.value > 0);
          if (!up && ctx.tick - Number(ctx.memory.hurtTick ?? 0) >= shieldDelay * 30) granite(ctx);
          // Thunderclap's passive: bonus armor, tripled while Granite Shield holds.
          ctx.buff("thunderclap", "armorPercent", up ? armorShielded : armorShare, 1e9);
        },
        onDamageTaken(ctx) {
          ctx.memory.hurtTick = ctx.tick;
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
          delivery: { kind: "target", range: q.field("targetRange"), missileSpeed: q.field("speed") },
          onHit: [
            { type: "damage", damageType: "magic", amount: q.formula("Magic Damage") },
            // Malphite gains the movement speed the target loses (counted before the slow lands).
            { type: "caster", effects: [{ type: "stat", stat: "moveSpeedFlat", amount: { base: 0, ratios: { targetMoveSpeed: qSlow } }, duration: qSeconds }] },
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
              onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Additional Physical Damage") }],
            },
            // For 5 seconds, every attack also triggers the cone.
            { type: "empower", attacks: 99, window: clapSeconds, onHit: [{ type: "damage", damageType: "physical", amount: w.formula("Physical Damage"), label: "Thunderclap (cone)" }] },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          cost: e.cost(),
          castTime: e.castTime(),
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
