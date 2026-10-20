import { describe, expect, it } from "vitest";
import { compileKit } from "../../engine/kits/compile";
import { advanceMissiles, completeCast, launchAttack, startAttack } from "../../engine/sim/actions";
import { createWorld, fork } from "../../engine/sim/simulate";
import { cloneWorld, type Action, type Unit, type World } from "../../engine/sim/state";
import KogMaw from "../../kits/champions/KogMaw";
import { championData, records } from "../kits/helpers";
import { fighter, RANGED } from "./kits";

type Windup = Extract<Action, { kind: "windup" }>;
const placements = ["active", "pending", "cast resume", "dash resume"] as const;
type Placement = typeof placements[number];

function moveWindup(unit: Unit, placement: Placement): void {
  const windup = unit.action;
  if (windup?.kind !== "windup") throw new Error("Missing declared attack");
  if (placement === "pending") {
    unit.pendingAttack = windup;
    unit.action = { kind: "cast", ability: "hold", startTick: 0, endTick: 100 };
  } else if (placement === "cast resume") {
    unit.action = { kind: "cast", ability: "hold", startTick: 0, endTick: 100, resume: windup };
  } else if (placement === "dash resume") {
    unit.action = { kind: "dash", ability: "hold", startTick: 0, endTick: 100, perTick: 0,
      stopAtContact: false, unstoppable: false,
      resume: { kind: "cast", ability: "hold", startTick: 0, endTick: 100, resume: windup } };
  }
}

function declaredAttack(unit: Unit): Windup {
  let action = unit.pendingAttack ?? unit.action;
  while (action && (action.kind === "cast" || action.kind === "dash")) action = action.resume;
  if (action?.kind !== "windup") throw new Error("Missing retained attack");
  return action;
}

function landAttack(world: World): void {
  launchAttack(world, world.units[0], declaredAttack(world.units[0]));
  for (let i = 0; i < 10; i++) { advanceMissiles(world); world.tick++; }
}

describe("attack payloads remain independent when worlds branch", () => {
  it.each(placements)("isolates launch-hook additions to a %s windup", placement => {
    const source = fighter({ attack: RANGED, hooks: { onAttackLaunch(ctx) {
      ctx.action.onHit.push({ type: "damage", damageType: "true", amount: { base: 20 } });
      ctx.action.empowered!.push("launched");
    } } });
    const world = createWorld({ fighters: [source, fighter({ base: { armor: 0, mr: 0 } })],
      distance: 300, modes: ["idle", "idle"] });
    startAttack(world, world.units[0]);
    declaredAttack(world.units[0]).empowered = ["primed"];
    moveWindup(world.units[0], placement);
    const copy = cloneWorld(world);
    landAttack(copy);
    expect(declaredAttack(world.units[0]).onHit).toHaveLength(0);
    expect(declaredAttack(world.units[0]).empowered).toEqual(["primed"]);
    landAttack(world);
    expect(world.units[1].totals.damageTaken).toBe(120);
    expect(copy.units[1].totals.damageTaken).toBe(120);
  });

  it.each(placements)("launches one actual Barrage packet per %s windup after a skillshot fork", placement => {
    const compiled = compileKit(championData("KogMaw"), records("KogMaw"), KogMaw).spec;
    const source = { ...compiled, base: { ...compiled.base, ad: 100 } };
    const world = createWorld({ fighters: [source, fighter({ base: { hp: 1000, armor: 0, mr: 0 } })],
      distance: 300, modes: ["idle", "idle"] });
    const barrage = source.abilities.find(ability => ability.key === "W")!;
    completeCast(world, world.units[0], barrage, world.tick);
    startAttack(world, world.units[0]);
    moveWindup(world.units[0], placement);
    const zone = { id: world.nextId++, owner: 0 as const, kind: "delayedArea" as const,
      seenTick: 0, x: 10000, radius: 1, startTick: 0, endTick: 100, connects: true };
    world.zones.push(zone);
    const branches = fork(world, [{ zone: zone.id, chance: .5 }]);
    expect(branches).toHaveLength(2);
    for (const branch of branches) landAttack(branch);
    for (const branch of branches) {
      expect(branch.units[1].totals.damageTaken).toBe(160);
      expect(branch.weight).toBe(.5);
    }
  });
});
