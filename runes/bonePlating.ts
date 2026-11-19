/** Explicit Bone Plating for manual plain-stat duels. */
import { toTicks } from "../engine/rules/time";
import type { HookContext, KitHooks } from "../engine/sim/spec";
import type { CombatRuneRules } from "./effectRules";

const LABEL = "Bone Plating";
const EXPIRES = "rune:bone-plating:expires";
const READY = "rune:bone-plating:ready";
const PLATES = "rune:bone-plating:plates";
const SPENT_CASTS = ["rune:bone-plating:cast-1", "rune:bone-plating:cast-2"] as const;
type Rules = CombatRuneRules["bonePlating"];

export function checkedBonePlatingRules(value: unknown): Rules {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${LABEL} requires reviewed rules`);
  const rules = value as Rules;
  const validTime = (time: number) => Number.isFinite(time) && time > 0 && Number.isSafeInteger(toTicks(time)) && toTicks(time) > 0;
  if (rules.modelLevel !== 20 || rules.charges !== 3 || !Number.isFinite(rules.reduction) || rules.reduction <= 0
    || !validTime(rules.duration) || !validTime(rules.cooldown)) {
    throw new Error(`${LABEL} requires a positive finite level-20 reduction and three plates on valid timers`);
  }
  return { ...rules };
}

const isBody = (ctx: HookContext) => ctx.self.petId === undefined && ctx.self.spec.unitClass !== "clone"
  && ctx.world.units[ctx.self.side] === ctx.self;
const eligible = (ctx: HookContext) => ctx.self.alive && ctx.self.hp > 0 && !ctx.self.fallen
  && !ctx.self.resurrection && !ctx.self.deathDefied && !ctx.self.deathNotified;

// This duel has one opposing champion slot. Checking the actual body rather
// than the kit ID follows that same opponent through transformations.
const fromOpponent = (ctx: HookContext) => ctx.enemy.side !== ctx.self.side && ctx.enemy.petId === undefined
  && ctx.enemy.spec.unitClass !== "clone" && ctx.world.units[ctx.enemy.side] === ctx.enemy;

function clearPlates(ctx: HookContext): void {
  delete ctx.memory[PLATES];
  delete ctx.memory[EXPIRES];
  for (const key of SPENT_CASTS) delete ctx.memory[key];
}

export function buildBonePlating(input: Pick<CombatRuneRules, "bonePlating">): { hooks: KitHooks; assumptions: string[] } {
  const { reduction, duration, cooldown, charges } = checkedBonePlatingRules(input?.bonePlating);
  const activeTicks = toTicks(duration), cooldownTicks = toTicks(cooldown);

  function upkeep(ctx: HookContext): void {
    const expiry = ctx.memory[EXPIRES];
    if (typeof expiry === "number" && isBody(ctx) && (!eligible(ctx) || ctx.tick >= expiry)) clearPlates(ctx);
  }

  return {
    hooks: {
      onDamageTaken(ctx) {
        if (!(ctx.amount > 0) || !isBody(ctx) || !eligible(ctx) || !fromOpponent(ctx)) return;
        const ready = ctx.memory[READY];
        if (typeof ready === "number" && ctx.tick < ready) return;
        clearPlates(ctx);
        const expiry = ctx.tick + activeTicks;
        ctx.memory[EXPIRES] = expiry;
        ctx.memory[READY] = expiry + cooldownTicks;
        ctx.memory[PLATES] = charges;
        ctx.log(`${LABEL} activates`);
      },
      modifyAcceptedDamageBeforeShields(ctx) {
        const expiry = ctx.memory[EXPIRES], remaining = ctx.memory[PLATES], cast = ctx.castInstance;
        if (typeof expiry !== "number" || ctx.tick >= expiry || typeof remaining !== "number" || remaining < 1
          || cast === undefined || !isBody(ctx) || !eligible(ctx) || !fromOpponent(ctx)
          || SPENT_CASTS.some(key => ctx.memory[key] === cast)) return ctx.amount;

        if (remaining === 1) {
          clearPlates(ctx);
          ctx.memory[READY] = ctx.tick + cooldownTicks;
        } else {
          ctx.memory[SPENT_CASTS[charges - remaining]!] = cast;
          ctx.memory[PLATES] = remaining - 1;
        }
        const blocked = Math.min(ctx.amount, reduction);
        ctx.log(`${LABEL} blocks ${Math.round(blocked)} damage (${remaining - 1}/${charges})`);
        return ctx.amount - blocked;
      },
      onTick: upkeep,
      onTickWhileDead: upkeep,
    },
    assumptions: [
      "Bone Plating arms from the first positive native health loss dealt by the opposing champion body. The initiating packet keeps its normal damage. Shield-only, zero, or protected damage leaves the rune available to arm.",
      "Up to three positive packets from distinct native cast instances consume plates. A later packet of the initiating cast can spend one. The flat amount comes from the explicit level-20 Wiki formula and applies after resistance and other damage modifiers, including to true damage.",
      "Active plates reduce accepted damage after pre-damage callbacks and before ordinary shield absorption. Reactive shield creation still sees the incoming packet. The placement relative to shields and the exact callback order are simulator policies.",
      "The window ends at 1.5 seconds or when the last plate is spent. The 55-second cooldown begins at that endpoint. Expiry precedes same-tick damage, and the exact ready tick permits activation. The cooldown phase and equality boundaries are simulator policies.",
      "Active plates end during resurrection, fallen or counted-dead states, while the scheduled cooldown remains. Same-body forms and world copies keep their own state. Separate pets, clones and packets without a native cast ID are outside plate consumption in this implementation.",
    ],
  };
}
