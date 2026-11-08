/**
 * Udyr: every number is read from the wiki's ability data at level 20, each stance at the rank
 * his skill points buy (PLAN §4.1: 20 points, 21 with Triple Tonic, for 24 ranks).
 */
import type { KitModule } from "../../engine/kits/compile";
import { cooldownAfterHaste } from "../../engine/rules/timing";
import { abilityHasteFor } from "../../engine/sim/cooldowns";
import { canCast } from "../../engine/sim/actions";
import { type Behavior, defaultBehavior } from "../../engine/sim/behavior";
import { derive, evaluate } from "../../engine/sim/derived";
import type { AbilitySpec, Effect, Formula, HookContext } from "../../engine/sim/spec";
import type { Unit } from "../../engine/sim/state";
import { rankSplits, skillPointsAt } from "../../engine/skillPoints";
import { TOP_LANE_MAX_LEVEL } from "../../engine/stats";
import { FOREVER, ticks } from "./util";

const STANCES = ["Q", "W", "E", "R"] as const;
type Stance = (typeof STANCES)[number];
/** The ranks pinned when the four rank options are set; 0 leaves the split to the simulator. */
export const UDYR_RANK_OPTIONS = { Q: "rankQ", W: "rankW", E: "rankE", R: "rankR" } as const;
/**
 * The split the kit page shows when none is pinned (the simulator tries every split in each
 * matchup): Wilding Claw maxed, the other points spread evenly (Q6 W5 E5 R5 with 21 points).
 */
export function udyrReferenceSplit(points: number): Record<Stance, number> {
  const rest = Math.max(0, points - 6);
  const each = Math.floor(rest / 3);
  const extra = rest % 3;
  return { Q: Math.min(6, points), W: Math.min(6, each + (extra > 0 ? 1 : 0)), E: Math.min(6, each + (extra > 1 ? 1 : 0)), R: Math.min(6, each) };
}

const udyr: KitModule = {
  champion: "Udyr",
  options: {
    tripleTonic: { label: "Triple Tonic (1 on, 0 off): a 21st skill point and Elixir of Avarice's gold", default: 1 },
    rankQ: { label: "Wilding Claw's rank (0: the best split in each matchup)", default: 0 },
    rankW: { label: "Iron Mantle's rank (0: the best split in each matchup)", default: 0 },
    rankE: { label: "Blazing Stampede's rank (0: the best split in each matchup)", default: 0 },
    rankR: { label: "Wingborne Storm's rank (0: the best split in each matchup)", default: 0 },
  },
  // Unless the four ranks are pinned, every way to spend his points, from rank 1 up.
  variants(options, champion) {
    if (STANCES.every((s) => (options[UDYR_RANK_OPTIONS[s]] ?? 0) > 0)) return [];
    const points = skillPointsAt(champion, TOP_LANE_MAX_LEVEL, { tripleTonic: (options.tripleTonic ?? 1) !== 0 });
    return rankSplits(champion, points, 1).map((split) => Object.fromEntries(STANCES.map((s) => [UDYR_RANK_OPTIONS[s], split[s]])));
  },
  build(kit, options) {
    // Skill points and the rank split.
    const tonicOn = (options.tripleTonic ?? 1) !== 0;
    const points = skillPointsAt(kit.champion, TOP_LANE_MAX_LEVEL, { tripleTonic: tonicOn });
    const pinned = STANCES.every((s) => (options[UDYR_RANK_OPTIONS[s]] ?? 0) > 0);
    const ranks: Record<Stance, number> = pinned ? (Object.fromEntries(STANCES.map((s) => [s, options[UDYR_RANK_OPTIONS[s]] ?? 0])) as Record<Stance, number>) : udyrReferenceSplit(points);
    const spent = STANCES.reduce((sum, s) => sum + ranks[s], 0);
    if (spent > points) throw new Error(`Udyr kit: ranks ${STANCES.map((s) => `${s}${ranks[s]}`).join(" ")} spend ${spent} skill points; level 20 gives ${points}`);
    kit.assume(`Ranks: ${STANCES.map((s) => `${s} ${ranks[s]}`).join(", ")} (${spent} of ${points} skill points)${pinned ? "" : "; in matchups the simulator tries every split and keeps the best"}.`);

    // Triple Tonic: at level 20 its Elixir of Skill's point counts, and Elixir of Avarice's gold; Elixir of Force has long run out.
    const tonic = kit.rune("Triple Tonic");
    tonic.quote("Level 9: Elixir of Skill");
    tonic.quote("Elixir of Skill: Grants 1 skill point");
    tonic.quote("Elixir of Force: Grants 20 for 60 seconds");
    const avariceGold = tonic.quoted("Elixir of Avarice gold increased to 60 from 40", 0);
    tonic.quote("Additionally, when the effect expires, gain 40");
    if (tonicOn) kit.assume(`Triple Tonic: Elixir of Avarice's ${avariceGold} gold (its patch history; the item data still says 40) goes into the stat budget; Elixir of Force's 60 seconds are long over by level 20.`);

    const innate = kit.ability("Bridge Between");
    const claw = kit.ability("Wilding Claw");
    const mantle = kit.ability("Iron Mantle");
    const stampede = kit.ability("Blazing Stampede");
    const storm = kit.ability("Wingborne Storm");
    const at = { Q: claw.atRank(ranks.Q), W: mantle.atRank(ranks.W), E: stampede.atRank(ranks.E), R: storm.atRank(ranks.R) };

    // Awakened Spirit: each stance can be cast again 0.25 s to 5 s later to Awaken it, every 20 s;
    // every cast puts the other stances on a 1.5 s global cooldown.
    const gcd = innate.quoted("4 basic abilities that each incur a 1.5-second global cooldown when cast", 1);
    const awakenAfter = innate.quoted("he can cast it again at no cost after 0.25 seconds and within the following 5 seconds to Awaken it", 0);
    const awakenWindow = innate.quoted("he can cast it again at no cost after 0.25 seconds and within the following 5 seconds to Awaken it", 1);
    const awakenCooldown = innate.quoted("Cooldown: 50 / 40 / 30 / 20 (based on level)", 3);
    innate.quote("switching Stances will replace the empowered attacks of the previous Stance");
    innate.quote("Awakened Spirit is placed on full cooldown at the start of the game");
    const awakenGcd = 0.5;
    kit.assume(`Awakened Spirit is ready when a fight starts (the game starts it on cooldown, long before level 20); its cooldown is ${awakenCooldown} s from level 16; an Awaken cast puts the other stances on a ${awakenGcd} s global cooldown (the game files' GlobalCDEmpowered).`);
    kit.assume("Bridge Between specifically classifies all four stance slots, including R, as basic abilities for their cooldowns. Wingborne Storm's generic pseudo-ultimate listing concerns ultimate interactions and does not override that specific cooldown classification. The ordinary 1.5-second global lock benefits from generic and basic-only haste; the empowered 0.5-second client lock retains its fixed interpretation because its haste eligibility is not established. Awakened Spirit itself ignores generic/basic haste and receives only ultimate haste, as its primary cooldown tooltip explicitly states.");
    // Monk Training: two attacks within 4 s after any cast gain 30% attack speed and take 5% off Awakened Spirit.
    const training = "empowers his next two basic attacks on-hit within 4 seconds to gain 30% bonus attack speed and refund 5% of Awakened Spirit's total cooldown, though not if the remaining cooldown is less than 1 second";
    const monkSeconds = innate.quoted(training, 0);
    const monkSpeed = innate.quoted(training, 1) / 100;
    const monkRefund = innate.quoted(training, 2) / 100;
    const monkFloor = innate.quoted(training, 3);
    const stanceAttacks = 2;

    // Wilding Claw: two attacks with 50 range and 8% of the target's health; 4 s of attack speed and on-hit damage.
    const clawRange = claw.quoted("gain 50 bonus range", 0);
    const clawHit = at.Q.formula("Bonus Physical Damage");
    const clawSpeed = at.Q.fraction("Bonus Attack Speed");
    const clawOnHit = at.Q.formula("Bonus Physical Damage On-Hit");
    const clawSeconds = claw.quoted("Udyr gains bonus attack speed and deals bonus physical damage on-hit for 4 seconds", 0);
    // Awakened: more attack speed, more on the two attacks, and lightning on the next two in any stance.
    const clawMoreSpeed = claw.levelValue("Udyr gains an additional") / 100;
    const clawMoreShare = claw.levelValue("The empowered attacks deal an additional") / 100;
    const clawMoreAd = claw.quoted("(+ 1.5% per 100 bonus AD) (+ 0.1% per 100 bonus health)", 0) / 100 / 100;
    const clawMoreHealth = claw.quoted("(+ 1.5% per 100 bonus AD) (+ 0.1% per 100 bonus health)", 2) / 100 / 100;
    const boltShare = claw.levelValue("each empowered to strike with lightning 6 times over 1 second") / 100;
    const boltAp = claw.quoted("(+ 0.6% per 100 AP) of the target's maximum health per hit", 0) / 100 / 100;
    const bolts = claw.quoted("strike with lightning 6 times over 1 second", 0);
    const boltSeconds = claw.quoted("strike with lightning 6 times over 1 second", 1);
    claw.quote("being able to hit the same target multiple times");
    const clawMore: Formula = { base: 0, ratios: { targetMaxHP: clawMoreShare }, products: [{ ratio: clawMoreAd, stats: ["bonusAD", "targetMaxHP"] }, { ratio: clawMoreHealth, stats: ["bonusHP", "targetMaxHP"] }] };
    const bolt: Formula = { base: 0, ratios: { targetMaxHP: boltShare }, products: [{ ratio: boltAp, stats: ["AP", "targetMaxHP"] }] };
    kit.assume(`Awakened Wilding Claw's ${bolts} lightning strikes all hit the one enemy, one every ${Math.round((1000 * boltSeconds) / bolts) / 1000} s from the hit.`);

    // Iron Mantle: a 4 s shield; two attacks with life steal that heal 1.2% of his health.
    const mantleShield = at.W.formula("Shield Strength");
    const mantleSeconds = mantle.quoted("Additionally, Udyr grants himself a shield for 4 seconds", 0);
    const mantleSteal = at.W.fraction("Life Steal");
    const mantleHeal = mantle.quoted("heal him for 1.2% of his maximum health (+ 8% AP)", 0) / 100;
    const mantleHealAp = mantle.quoted("heal him for 1.2% of his maximum health (+ 8% AP)", 1) / 100;
    // Awakened: more shield (the cast's base at its rank included), healing over 4 s, double the life steal and the heal.
    mantle.quote("Increased Shield Strength: 20 – 150 (based on level) (+ 45 / 65 / 85 / 105 / 125 / 145)");
    mantle.quote("Total Healing: 10 – 75 (based on level) (+ 22.5 / 32.5 / 42.5 / 52.5 / 62.5 / 72.5)");
    const shieldBase = at.W.baseOf("Shield Strength");
    const moreShield = mantle.formulaPart("Increased Shield Strength", ["bonusAD", "AP", "maxHP"]);
    const mantleMoreShield: Formula = { ...moreShield, base: moreShield.base + shieldBase };
    const moreHeal = mantle.formulaPart("Total Healing", ["bonusAD", "AP", "maxHP"]);
    const mantleMoreHeal: Formula = { ...moreHeal, base: moreHeal.base + shieldBase / 2 };
    const healEvery = mantle.quoted("heals every 0.25 seconds over the next 4 seconds", 0);
    const healSeconds = mantle.quoted("heals every 0.25 seconds over the next 4 seconds", 1);
    const mantleMoreSteal = at.W.fraction("Increased Life Steal");
    const mantleMoreHeal2 = mantle.quoted("heal him for 2.4% of his maximum health (+ 16% AP)", 0) / 100;
    const mantleMoreHeal2Ap = mantle.quoted("heal him for 2.4% of his maximum health (+ 16% AP)", 1) / 100;

    // Blazing Stampede: attacks that stun for 0.75 s, once every 4 s a target; speed for 4 s, decaying to 30% over 1.5 s.
    const stun = stampede.quoted("stun them for 0.75 seconds", 0);
    const stunEvery = at.E.field("targetCooldown");
    // Percentages that grow with bonus AD ("55% (+ 5% per 100 bonus AD)").
    const rush: Formula = { base: at.E.baseOf("Bonus Movement Speed") / 100, ratios: { bonusAD: stampede.quoted("(+ 5% per 100 bonus AD)", 0) / 100 / 100 } };
    const rushLeft: Formula = { base: at.E.baseOf("Decayed Bonus Movement Speed") / 100, ratios: { bonusAD: stampede.quoted("(+ 1.5% per 100 bonus AD)", 0) / 100 / 100 } };
    const rushSeconds = stampede.quoted("gains bonus movement speed for 4 seconds, which decays to 30% effectiveness over 1.5 seconds", 0);
    const rushFade = stampede.quoted("gains bonus movement speed for 4 seconds, which decays to 30% effectiveness over 1.5 seconds", 2);
    stampede.quote("empowering his basic attacks to have an uncancellable windup");
    // Awakened: 75 range, more speed (+ 10% per 100 bonus AD), crowd control immunity for 1.5 s.
    const stampedeRange = stampede.quoted("Udyr gains 75 bonus attack range", 0);
    const stampedeMore: Formula = {
      base: stampede.levelValue("Udyr gains 75 bonus attack range and an additional") / 100,
      ratios: { bonusAD: stampede.quoted("(+ 10% per 100 bonus AD) bonus movement speed", 0) / 100 / 100 },
    };
    const unstoppable = stampede.quoted("He also gains immunity to crowd control for 1.5 seconds", 0);
    kit.assume("Blazing Stampede's pounce is a melee attack from his range; its speed decays evenly, and the Awakened speed and range last its 4 seconds.");

    // Wingborne Storm: two attacks with magic damage; a blizzard around him for 4 s, every 0.5 s.
    const stormAttack: Formula = { base: storm.levelValue("Active - Stance: Udyr enters Storm Stance"), ratios: { AP: storm.quoted("(+ 35% AP) magic damage to nearby enemies", 0) / 100 } };
    const [stormRadius = 370] = storm.fieldValues("effectRadius");
    const stormTick = at.R.formula("Magic Damage per Tick");
    const stormSlow = at.R.fraction("Slow");
    const stormSeconds = storm.quoted("summons a blizzard around himself for 4 seconds that deals magic damage every 0.5 seconds", 0);
    const stormEvery = storm.quoted("summons a blizzard around himself for 4 seconds that deals magic damage every 0.5 seconds", 1);
    // Awakened: a storm that moves toward the enemy, with damage by its health and 5% more slow.
    const stormMore: Formula = {
      base: 0,
      ratios: { targetMaxHP: storm.levelValue("deals bonus magic damage equal to") / 100 },
      products: [{ ratio: storm.quoted("(+ 0.4375% per 100 AP) of the target's maximum health per tick", 0) / 100 / 100, stats: ["AP", "targetMaxHP"] }],
    };
    const stormMoreSlow = at.R.fraction("Increased Slow");
    const stormSpeed = storm.quoted("Storm Speed: 109.5 – 250 (based on level)", 1);
    kit.assume(`Awakened Wingborne Storm's storm moves at ${stormSpeed}, its level-18 speed (the wiki gives none past 18).`);

    const sum = (a: Formula, b: Formula): Formula => {
      const keys = new Set([...Object.keys(a.ratios ?? {}), ...Object.keys(b.ratios ?? {})]) as Set<keyof NonNullable<Formula["ratios"]>>;
      return {
        base: a.base + b.base,
        ...(keys.size > 0 ? { ratios: Object.fromEntries([...keys].map((k) => [k, (a.ratios?.[k] ?? 0) + (b.ratios?.[k] ?? 0)])) } : {}),
        ...(a.products || b.products ? { products: [...(a.products ?? []), ...(b.products ?? [])] } : {}),
      };
    };

    const stanceOf = (unit: Unit) => unit.memory.stance as Stance | undefined;
    const awakenReady = (unit: Unit, tick: number) => tick >= Number(unit.memory.awakenReady ?? 0);
    // The cast's empowered attacks: replacing the last stance's.
    const enterStance = (ctx: HookContext, stance: Stance) => {
      const self = ctx.self;
      self.statuses = self.statuses.filter((s) => !(s.kind === "empower" && (STANCES as readonly string[]).includes(s.key)));
      ctx.memory.stance = stance;
      ctx.memory.stanceHits = stance === "E" ? 0 : stanceAttacks;
      delete ctx.memory.awakened;
      delete ctx.memory.mantleMore;
    };
    // Every cast: the global cooldown on the other stances, and Monk Training.
    const afterCast = (ctx: HookContext, stance: Stance, awaken: boolean) => {
      const self = ctx.self;
      // The primary explicitly qualifies the ordinary 1.5-second lock for haste.
      // The client-only empowered 0.5-second lock retains its fixed interpretation.
      const sharedHaste = Math.min(500, derive(self).abilityHaste + derive(self).basicAbilityHaste);
      const until = ctx.tick + ticks(awaken ? awakenGcd : cooldownAfterHaste(gcd, sharedHaste));
      for (const other of STANCES) if (other !== stance && (self.cooldownReady[other] ?? 0) < until) self.cooldownReady[other] = until;
      ctx.memory.monk = 2;
      ctx.memory.monkUntil = ctx.tick + ticks(monkSeconds);
      ctx.buff("monk", "attackSpeed", monkSpeed, monkSeconds);
    };
    const spendAwaken = (ctx: HookContext, stance: Stance) => {
      ctx.memory.awakenReady = ctx.tick + ticks(cooldownAfterHaste(awakenCooldown, Math.min(500, derive(ctx.self).ultimateAbilityHaste)));
      ctx.memory.awakened = stance;
      // Recasting refreshes the stance's cooldown.
      ctx.self.cooldownReady[stance] = ctx.tick + ticks(cooldownAfterHaste(6, abilityHasteFor(ctx.self, { key: stance, slot: stance, hasteType: "basic" })));
    };

    const stanceSpec = (stance: Stance, data: typeof at.Q, onSelf: Effect[] = [], extra: Partial<AbilitySpec> = {}): AbilitySpec => ({
      key: stance,
      name: data.name,
      slot: stance,
      hasteType: "basic",
      cooldown: data.cooldown(),
      cost: data.cost(),
      castTime: data.castTime(),
      chainCooldown: "first",
      delivery: { kind: "self" },
      onSelf,
      ...extra,
    });
    const awakenSpec = (stance: Stance, data: typeof at.Q, extra: Partial<AbilitySpec> = {}): AbilitySpec => ({
      key: `${stance}2`,
      name: `${data.name} (Awaken)`,
      slot: stance,
      hasteType: "basic",
      cooldown: 0,
      castTime: 0,
      chain: { root: stance, index: 2, window: awakenWindow, delay: awakenAfter },
      delivery: { kind: "self" },
      usable: (unit, world) => awakenReady(unit, world.tick) && stanceOf(unit) === stance,
      ...extra,
    });

    const abilities: AbilitySpec[] = [
      stanceSpec("Q", at.Q, [{ type: "stat", stat: "attackSpeed", amount: { base: clawSpeed }, duration: clawSeconds }], { roles: ["damage"] }),
      awakenSpec("Q", at.Q, { onSelf: [{ type: "stat", stat: "attackSpeed", amount: { base: clawMoreSpeed }, duration: clawSeconds }], roles: ["damage"] }),
      stanceSpec("W", at.W, [{ type: "shield", amount: mantleShield, duration: mantleSeconds }]),
      awakenSpec("W", at.W, { onSelf: [{ type: "shield", amount: mantleMoreShield, duration: mantleSeconds }] }),
      stanceSpec("E", at.E, [], { roles: ["cc"] }),
      awakenSpec("E", at.E, { onSelf: [{ type: "state", state: "ccImmune", duration: unstoppable }], roles: ["defense"] }),
      stanceSpec("R", at.R, [], { delivery: { kind: "field", range: 0, radius: stormRadius, duration: stormSeconds, interval: stormEvery, attached: true }, onHit: [{ type: "damage", damageType: "magic", amount: stormTick }, { type: "cc", cc: "slow", strength: stormSlow, duration: stormEvery }], roles: ["damage"] }),
      awakenSpec("R", at.R, {
        delivery: { kind: "field", range: 0, radius: stormRadius, duration: stormSeconds, interval: stormEvery, chase: stormSpeed },
        onHit: [{ type: "damage", damageType: "magic", amount: sum(stormTick, stormMore) }, { type: "cc", cc: "slow", strength: stormMoreSlow, duration: stormEvery }],
        roles: ["damage"],
      }),
    ];
    const byKey = new Map(abilities.map((a) => [a.key, a]));
    const ability = (key: string) => byKey.get(key) as AbilitySpec;

    // The main stance to Awaken: Wilding Claw's lightning, or Wingborne Storm's when it's ranked higher.
    const main: Stance = ranks.R > ranks.Q ? "R" : "Q";
    const behavior: Behavior = (view) => {
      const { world, self, enemy } = view;
      if (view.mode === "idle" || (self.action && self.action.kind !== "windup")) return defaultBehavior(view);
      const ready = (key: string) => canCast(world, self, ability(key));
      const stance = stanceOf(self);
      const near = view.distance <= self.spec.attack.range + 100;
      const hurt = self.hp < 0.5 * derive(self).maxHp;
      if (view.mode === "flee") {
        if (ready("E2")) return { kind: "cast", ability: "E2" };
        if (ready("E")) return { kind: "cast", ability: "E" };
        if (hurt && ready("W2")) return { kind: "cast", ability: "W2" };
        if (ready("W")) return { kind: "cast", ability: "W" };
        return defaultBehavior(view);
      }
      // Awaken the stance just entered when it's the one worth it.
      if (stance && ready(`${stance}2`) && (stance === main || (stance === "W" && hurt))) return { kind: "cast", ability: `${stance}2` };
      // Out of reach: Blazing Stampede's speed, and its stun on arrival.
      if (!near) {
        if (stance !== "E" && ready("E")) return { kind: "cast", ability: "E" };
        if (stance === "E" && ready("E2") && self.statuses.some((s) => s.kind === "cc" && s.key === "slow")) return { kind: "cast", ability: "E2" };
        return defaultBehavior(view);
      }
      // Spend the stance's empowered attacks before the next one (Blazing Stampede's until its stun is used).
      const unspent = stance !== undefined && stance !== "E" && Number(self.memory.stanceHits ?? 0) > 0;
      const stunReady = world.tick >= Number(self.memory.stunReady ?? 0);
      if (!unspent && !(stance === "E" && stunReady)) {
        const order: Stance[] = stunReady ? ["E", main, main === "Q" ? "R" : "Q", "W"] : [main, main === "Q" ? "R" : "Q", "W", "E"];
        if (hurt) order.splice(0, 0, "W");
        for (const next of order) if (next !== stance && ready(next)) return { kind: "cast", ability: next };
      }
      return defaultBehavior(view);
    };

    return {
      behavior,
      abilities,
      ...(tonicOn ? { extraGold: avariceGold } : {}),
      budget: {
        // The stances' empowered attacks and Monk Training's speed, about one stance every 1.5 s.
        damage: (self, target) => ({
          physical: (stanceAttacks * evaluate(clawHit, self, target)) / (4 * gcd) + (evaluate(clawOnHit, self, target) * derive(self).attackSpeed * clawSeconds) / (4 * gcd),
          magic: (2 * stanceAttacks * bolts * evaluate(bolt, self, target)) / cooldownAfterHaste(awakenCooldown, Math.min(500, derive(self).ultimateAbilityHaste)) / 2,
        }),
      },
      hooks: {
        onCast(ctx) {
          const key = ctx.ability.key;
          const stance = key.charAt(0) as Stance;
          const awaken = key.length > 1;
          if (!awaken) {
            enterStance(ctx, stance);
            const bonusAd = derive(ctx.self).bonusAd;
            if (stance === "Q") {
              ctx.memory.clawUntil = ctx.tick + ticks(clawSeconds);
              ctx.apply({ type: "empower", attacks: stanceAttacks, window: FOREVER, onHit: [{ type: "damage", damageType: "physical", amount: clawHit, label: claw.name }], bonusRange: clawRange }, true);
            }
            if (stance === "W") ctx.apply({ type: "empower", attacks: stanceAttacks, window: FOREVER, onHit: [{ type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { maxHP: mantleHeal, AP: mantleHealAp } } }] }] }, true);
            if (stance === "E") {
              ctx.memory.rushAt = ctx.tick;
              ctx.memory.rushMore = 0;
              ctx.memory.rushAd = bonusAd;
              ctx.apply({ type: "empower", attacks: 1e9, window: FOREVER, onHit: [], uncancellable: true }, true);
            }
            if (stance === "R") ctx.apply({ type: "empower", attacks: stanceAttacks, window: FOREVER, onHit: [{ type: "damage", damageType: "magic", amount: stormAttack, label: storm.name }] }, true);
          } else {
            spendAwaken(ctx, stance);
            if (stance === "Q") {
              // Lightning on the next two attacks in any stance within 4 s; more on the Claw's own.
              ctx.memory.bolts = 2;
              ctx.memory.boltsUntil = ctx.tick + ticks(clawSeconds);
              ctx.memory.clawMoreUntil = ctx.tick + ticks(clawSeconds);
            }
            if (stance === "W") {
              ctx.memory.mantleHealAt = ctx.tick;
              ctx.memory.mantleHealsLeft = Math.round(healSeconds / healEvery);
              // Double the life steal and the heal on the stance's attacks.
              ctx.self.statuses = ctx.self.statuses.filter((s) => !(s.kind === "empower" && s.key === "W"));
              ctx.apply({ type: "empower", attacks: Number(ctx.memory.stanceHits ?? stanceAttacks), window: FOREVER, onHit: [{ type: "caster", effects: [{ type: "heal", amount: { base: 0, ratios: { maxHP: mantleMoreHeal2, AP: mantleMoreHeal2Ap } } }] }] }, true);
              ctx.memory.mantleMore = 1;
            }
            if (stance === "E") ctx.memory.rushMore = 1;
            if (stance === "R") {
              // The blizzard around him ends.
              ctx.world.zones = ctx.world.zones.filter((z) => !(z.owner === ctx.self.side && z.ability === "R"));
            }
          }
          afterCast(ctx, stance, awaken);
        },
        onTick(ctx) {
          const self = ctx.self;
          const stance = stanceOf(self);
          // Iron Mantle's life steal while its attacks last (doubled when Awakened).
          const steal = stance === "W" && Number(ctx.memory.stanceHits ?? 0) > 0 ? (ctx.memory.mantleMore ? mantleMoreSteal : mantleSteal) : 0;
          ctx.buff("mantle", "lifeSteal", steal, FOREVER);
          // Blazing Stampede's speed: decays to 30% over 1.5 s; Awakened, more speed and 75 range.
          const since = (ctx.tick - Number(ctx.memory.rushAt ?? -1e9)) / 30;
          if (since <= rushSeconds) {
            const top = evaluate(rush, self, self);
            const low = evaluate(rushLeft, self, self);
            const share = since >= rushFade ? low : top + ((low - top) * since) / rushFade;
            const more = ctx.memory.rushMore ? evaluate(stampedeMore, self, self) : 0;
            ctx.buff("rush", "moveSpeedPercent", share + more, rushSeconds - since);
            ctx.buff("rushRange", "attackRange", ctx.memory.rushMore ? stampedeRange : 0, rushSeconds - since);
          }
          // Awakened Iron Mantle's healing, every 0.25 s.
          if (Number(ctx.memory.mantleHealsLeft ?? 0) > 0 && ctx.tick >= Number(ctx.memory.mantleHealAt)) {
            const total = Math.round(healSeconds / healEvery);
            ctx.regenerate(evaluate(mantleMoreHeal, self, self) / total);
            ctx.memory.mantleHealsLeft = Number(ctx.memory.mantleHealsLeft) - 1;
            ctx.memory.mantleHealAt = Number(ctx.memory.mantleHealAt) + ticks(healEvery);
          }
          // Monk Training runs out after 4 s.
          if (ctx.tick >= Number(ctx.memory.monkUntil ?? 0) && Number(ctx.memory.monk ?? 0) > 0) {
            ctx.memory.monk = 0;
            ctx.buff("monk", "attackSpeed", 0, 0);
          }
        },
        onAttackHit(ctx) {
          const self = ctx.self;
          const stance = stanceOf(self);
          // The stance's empowered attacks.
          if (stance && stance !== "E" && Number(ctx.memory.stanceHits ?? 0) > 0) {
            ctx.memory.stanceHits = Number(ctx.memory.stanceHits) - 1;
            if (stance === "Q" && ctx.tick < Number(ctx.memory.clawMoreUntil ?? 0)) ctx.apply({ type: "damage", damageType: "physical", amount: clawMore, label: `${claw.name} (Awaken)` });
          }
          // Wilding Claw's 4 s of on-hit damage, whatever the stance.
          if (ctx.tick < Number(ctx.memory.clawUntil ?? 0)) ctx.apply({ type: "damage", damageType: "physical", amount: clawOnHit, label: `${claw.name} (on-hit)` });
          // Blazing Stampede: a stun, once every few seconds.
          if (stance === "E" && ctx.tick >= Number(ctx.memory.stunReady ?? 0)) {
            ctx.memory.stunReady = ctx.tick + ticks(stunEvery);
            ctx.apply({ type: "cc", cc: "stun", duration: stun });
          }
          // Awakened Wilding Claw's lightning.
          if (Number(ctx.memory.bolts ?? 0) > 0 && ctx.tick < Number(ctx.memory.boltsUntil ?? 0)) {
            ctx.memory.bolts = Number(ctx.memory.bolts) - 1;
            const strike: Effect = { type: "damage", damageType: "magic", amount: bolt, label: `${claw.name} (lightning)` };
            ctx.apply(strike);
            for (let i = 1; i < bolts; i++) ctx.apply({ type: "delayed", delay: (i * boltSeconds) / bolts, effects: [strike] });
          }
          // Monk Training: 5% of Awakened Spirit's cooldown, unless less than 1 s is left.
          if (Number(ctx.memory.monk ?? 0) > 0 && ctx.tick < Number(ctx.memory.monkUntil ?? 0)) {
            ctx.memory.monk = Number(ctx.memory.monk) - 1;
            if (Number(ctx.memory.monk) <= 0) ctx.buff("monk", "attackSpeed", 0, 0);
            const left = Number(ctx.memory.awakenReady ?? 0) - ctx.tick;
            if (left >= ticks(monkFloor)) ctx.memory.awakenReady = Number(ctx.memory.awakenReady) - ticks(monkRefund * cooldownAfterHaste(awakenCooldown, Math.min(500, derive(self).ultimateAbilityHaste)));
          }
        },
      },
    };
  },
};

export default udyr;
