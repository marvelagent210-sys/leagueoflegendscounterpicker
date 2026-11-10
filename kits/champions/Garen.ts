/** Garen: every number is read from the wiki's ability data at level 20 (see engine/kits/context.ts). */
import type { KitModule } from "../../engine/kits/compile";
import { attackRange, attackTiming, canStartAttack } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { canTarget } from "../../engine/sim/combat";
import { canMove, derive, statIsActive } from "../../engine/sim/derived";
import type { Unit } from "../../engine/sim/state";

const garen: KitModule = {
  champion: "Garen",
  options: { courageStacks: { label: "Courage stacks collected by level 20 (0.2 armor and magic resistance each, up to 150)", default: 150 } },
  build(kit, options) {
    const innate = kit.ability("Perseverance");
    const q = kit.ability("Decisive Strike");
    const w = kit.ability("Courage");
    const e = kit.ability("Judgment");
    const r = kit.ability("Demacian Justice");

    // Perseverance: % maximum health every 5 s, lost for 8 s after taking damage from champions.
    const regen = innate.levelValue("regenerates an additional") / 100;
    const lockout = innate.quoted("Perseverance is lost for 8 seconds", 0);
    const resistsPerStack = w.quoted("Garen gains 0.2 bonus armor and 0.2 bonus magic resistance", 0);
    const resists = Math.min(options.courageStacks ?? 0, 150) * resistsPerStack;
    const shredHits = e.quoted("Enemy champions hit 6 times by Judgment", 0);
    const shred = e.quoted("are inflicted with 25% armor reduction for 6 seconds", 0) / 100;
    const shredSeconds = e.quoted("are inflicted with 25% armor reduction for 6 seconds", 1);
    const spinScaling = "spins his sword around himself 7 (+ 1 per 25% bonus attack speed) times";
    const baseSpins = e.quoted(spinScaling, 0);
    const spinsPerAttackSpeed = e.quoted(spinScaling, 1) / (e.quoted(spinScaling, 2) / 100);
    e.quote("Judgment only scales with bonus attack speed from items and growth (per level).");
    const spinsFor = (self: Unit): number => {
      // The shard grant is recorded separately even though it shares the direct
      // bonus pool with purchased stats. It still improves actual basic attacks.
      const runeAttackSpeed = Number(self.memory["rune-shards:attackSpeed"] ?? 0);
      // Reserved flat rune-AS status namespace. Match derive's activation rules
      // so removal or conditional suspension cannot leave a stale origin total.
      let runeStatusAttackSpeed = 0;
      for (const status of self.statuses) {
        if (status.kind === "stat" && status.key === "attackSpeed"
          && status.memoKey?.startsWith("rune-effects:attackSpeed:") && statIsActive(status, self.statuses)) {
          runeStatusAttackSpeed += status.value;
        }
      }
      return baseSpins + Math.max(0, derive(self).bonusAttackSpeed - runeAttackSpeed - runeStatusAttackSpeed) * spinsPerAttackSpeed;
    };
    kit.assume("Decisive Strike's lunge toward its target isn't modeled (the wiki gives no distance).");
    kit.assume("Judgment always hits Garen's only enemy, the nearest one, for 25% more damage.");
    kit.assume("Judgment excludes the recorded attack-speed shard and active tagged flat rune attack-speed statuses from spin scaling. Other current attack-speed sources retain the existing model; temporary item-passive eligibility, including Guinsoo's Seething Strike, remains unverified. The spin count is captured once at cast, retaining the simulator's timing assumption rather than establishing live-game snapshot timing.");

    const behavior: Behavior = (view) => {
      // Let reactions, finishers and the other modes keep their normal priority. Starting
      // Judgment must not postpone an already-armed Decisive Strike for the entire spin.
      const command = defaultBehavior(view);
      if (command?.kind !== "cast" || command.ability !== "E") return command;
      const { self, enemy, world } = view;
      const armed = self.statuses.find((s) => s.kind === "empower" && s.key === "Q" && s.endTick > world.tick && (s.empower?.attacks ?? 0) > 0);
      if (!armed) return command;
      if (canStartAttack(world, self)) return { kind: "attack" };
      // Close the short remaining gap while Q's haste still lets its empowered hit land.
      // A holding opponent in the trade scenario must retain its no-chasing policy.
      if ((view.mode !== "fight" && view.mode !== "trade") || !canMove(self) || !canTarget(enemy, self)) return command;
      const haste = self.statuses.find((s) => s.kind === "stat" && s.memoKey === "Q:moveSpeedPercent" && s.endTick > world.tick);
      if (!haste) return command;
      const closingSpeed = derive(self).moveSpeed - (enemy.moved === -1 ? derive(enemy).moveSpeed : 0);
      const gap = Math.max(0, view.distance - attackRange(self));
      const remaining = (Math.min(armed.endTick, haste.endTick) - world.tick) / 30;
      if (gap > 0 && closingSpeed > 0 && gap / closingSpeed + attackTiming(self).windup / 30 < remaining) return { kind: "move", direction: 1 };
      return command;
    };

    return {
      behavior,
      start: [
        { type: "stat", stat: "armor", amount: { base: resists }, duration: Number.POSITIVE_INFINITY },
        { type: "stat", stat: "MR", amount: { base: resists }, duration: Number.POSITIVE_INFINITY },
      ],
      hooks: {
        onTick(ctx) {
          const hurt = Number(ctx.memory.hurtTick ?? -1e9);
          if (ctx.tick - hurt < lockout * 30) return;
          // 8 s without damage from the enemy: regenerate on top of base regeneration.
          ctx.regenerate((regen * derive(ctx.self).maxHp) / 150);
        },
        onDamageTaken(ctx) {
          // Perseverance rev 4038338: damage entirely absorbed by a shield does not
          // start or refresh its lockout. Damage hooks also report shield-only hits.
          if (ctx.amount > 0) ctx.memory.hurtTick = ctx.tick;
        },
        onAbilityHit(ctx) {
          if (ctx.ability.key !== "E") return;
          const hits = Number(ctx.memory.judgmentHits ?? 0) + 1;
          ctx.memory.judgmentHits = hits;
          // The shred lands on the 6th hit and refreshes on the 7th and every 6th after.
          if (hits === shredHits || (hits > shredHits && (hits - 1) % shredHits === 0)) {
            ctx.apply({ type: "stat", stat: "armorReductionPercent", amount: { base: shred }, duration: shredSeconds });
          }
        },
        onCast(ctx) {
          if (ctx.ability.key === "E") ctx.memory.judgmentHits = 0;
        },
      },
      abilities: [
        {
          key: "Q",
          name: q.name,
          slot: "Q",
          cooldown: q.cooldown(),
          castTime: q.castTime(),
          cooldownAfter: "empower",
          delivery: { kind: "self" },
          onSelf: [
            { type: "cleanse", types: ["slow"] },
            { type: "stat", stat: "moveSpeedPercent", amount: { base: q.quoted("gains 35% bonus movement speed", 0) / 100 }, duration: q.number("Movement Speed Duration") },
            {
              type: "empower",
              attacks: 1,
              window: q.quoted("empowers his next basic attack within 4.5 seconds", 0),
              uncancellable: true,
              hitsUntargetable: true,
              resetAttack: true,
              onHit: [
                { type: "damage", damageType: "physical", amount: q.formula("Bonus Physical Damage") },
                { type: "cc", cc: "silence", duration: q.quoted("silence them for 1.5 seconds", 0), spellShield: true },
              ],
            },
          ],
          roles: ["engage", "buff"],
        },
        {
          key: "W",
          name: w.name,
          slot: "W",
          cooldown: w.cooldown(),
          castTime: w.castTime(),
          delivery: { kind: "self" },
          onSelf: [
            { type: "state", state: "damageReduction", value: w.fraction("Damage Reduction"), duration: w.quoted("reduces incoming damage for 4 seconds", 0) },
            { type: "shield", amount: w.formula("Shield Strength"), duration: w.quoted("For the first 0.75 seconds", 0) },
            // Courage revision 4064595 explicitly adds Courage and Brittle; Tenacity
            // revision 4021927 instead puts both in a multiplicative group C. Prefer the
            // specific ability note for this pair, while keeping other sources unchanged.
            { type: "state", state: "tenacity", value: w.quoted("a shield and 60% tenacity", 0) / 100, duration: w.quoted("For the first 0.75 seconds", 0), tenacityGroup: "courage-brittle" },
          ],
        },
        {
          key: "E",
          name: e.name,
          slot: "E",
          cooldown: e.cooldown(),
          castTime: e.castTime(),
          cooldownAfter: "channel",
          delivery: { kind: "self" },
          channel: {
            duration: e.quoted("times over 3 seconds", 0),
            interruptible: false,
            mobile: true,
            range: e.field("effectRadius"),
            // 7 (+ 1 per 25% bonus attack speed) spins.
            pulses: { base: baseSpins, ratios: { bonusAttackSpeed: spinsPerAttackSpeed } },
            pulsesFor: spinsFor,
            onTick: [{ type: "damage", damageType: "physical", amount: e.formula("Increased Damage Per Spin"), canCrit: true, critMultiplier: e.quoted("Judgment can critically strike for 130% damage", 0) / 100 }],
          },
          flags: { spellShield: e.flag("spellShield") ?? false },
        },
        {
          key: "R",
          name: r.name,
          slot: "R",
          cancelOnInvalidTarget: true,
          cooldown: r.cooldown(),
          castTime: r.castTime(),
          delivery: { kind: "target", range: r.field("targetRange") },
          onHit: [{ type: "damage", damageType: "true", amount: r.formula("True Damage") }],
          roles: ["finisher"],
        },
      ],
    };
  },
};

export default garen;
