/** Synthetic fighters for simulator tests: plain numbers, so expected results can be worked out by hand. */
import type { AbilitySpec, AttackSpec, BaseStats, FighterSpec } from "../../engine/sim/spec";

export const BASE: BaseStats = {
  hp: 2000,
  hpRegen: 0,
  resource: 0,
  resourceRegen: 0,
  armor: 100,
  mr: 100,
  ad: 100,
  attackSpeed: { base: 0.625, ratio: 0.625, bonus: 0 },
  windup: { percent: 0.3, modifier: 1 },
  moveSpeed: 350,
  radius: 65,
  pathingRadius: 35,
  critDamageModifier: 1,
};

export const MELEE: AttackSpec = { range: 125, ranged: false, projectile: false };
export const RANGED: AttackSpec = { range: 550, ranged: true, missileSpeed: 2000, projectile: true };

export interface FighterOptions {
  id?: string;
  base?: Partial<BaseStats>;
  attack?: Partial<AttackSpec>;
  abilities?: AbilitySpec[];
  bonus?: FighterSpec["bonus"];
  hooks?: FighterSpec["hooks"];
}

export function fighter(options: FighterOptions = {}): FighterSpec {
  return {
    id: options.id ?? "dummy",
    name: options.id ?? "Dummy",
    base: { ...BASE, ...options.base },
    attack: { ...MELEE, ...options.attack },
    abilities: options.abilities ?? [],
    ...(options.bonus ? { bonus: options.bonus } : {}),
    ...(options.hooks ? { hooks: options.hooks } : {}),
  };
}

export function ability(spec: Partial<AbilitySpec> & Pick<AbilitySpec, "key" | "delivery">): AbilitySpec {
  return { name: spec.key, slot: "Q", cooldown: 10, castTime: 0, ...spec };
}
