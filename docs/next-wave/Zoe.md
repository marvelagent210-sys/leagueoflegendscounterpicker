# Zoe — batch 15 source and model notes

This module uses the existing level-20, maximum-rank duel model. Tests import the module directly; the batch controller owns registration, matrix generation and release verification. Original parsed primary fields, flags, formulas, revisions, notes and prior evidence are preserved. Full raw revisions and exact object-scoped game excerpts are appended.

## Pinned evidence

| Ability | Exact wiki revision | Game objects under `Characters/Zoe/Spells/` |
| --- | ---: | --- |
| More Sparkles! | 3986875 | `ZoeBasicAttack` |
| Paddle Star! | 4024422 | `ZoeQAbility/ZoeQ`, `ZoeQRecast` |
| Spell Thief | 4013273 | `ZoeWAbility/ZoeW`, `ZoeWPassiveMissileTwo` |
| Sleepy Trouble Bubble | 4053170 | `ZoeEAbility/ZoeE`, `ZoeEMis` |
| Portal Jump | 4005248 | `ZoeRAbility/ZoeR` |

The exact game download is `https://raw.communitydragon.org/16.20/game/data/characters/zoe/zoe.bin.json`, release `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `2478568786f3b56c299092c5ec64eac3d397521bdeb3015154db2c34c0b9ca1f`. Excerpts preserve encoded scalar values and complete selected arrays. Client E missile speed 1700 conflicts with the primary's 1850; combat uses the primary 1850 and retains both sources. The client contains numerous old copied Ahri/Annie objects, so unrelated client fields do not replace the primary descriptions.

The one supported collected summoner spell uses full Flash article revision 4008665 and full `Module:SpellData/data` revision 4089805. The latter's actual Flash block supplies `400 ([[Quick cast]])`; historical patch notes are not used to infer the current range. These are supplemental sources, separate from the five primary ability pins.

## More Sparkles!

At level 20 the explicit progression continues to **150 + 20% AP** magic damage. A completed real ability activation grants five seconds of entitlement; it starts unearned. The next actual basic attack retains ordinary AD, critical damage and basic-attack defenses, but becomes nonprojectile and adds the passive once. Entitlement is captured with its real windup and consumed at launch, so a canceled windup does not spend it. An activation earned after declaration is kept independently. Actual wards do not consume it. A Spell Thief bolt can consume the same entitlement once, making that bolt nonprojectile.

## Paddle Star!

Q costs 60 mana, cooldown 6.5 seconds, first cast 0.25 seconds. Its minimum damage is **228 + 60% AP** at level 20: the source's level progression continues past 18 and adds rank-5 170. Initial flight has 800 range, speed 1200 and width 100. Its declared world direction is captured independently of its completion position; an enemy crossing during the cast cannot reverse the selected shot. A real star reaches its endpoint and lingers for one second, or collides with the first actual eligible enemy body. A collision explodes at the missile's actual contact position with primary radius 180, which the source itself labels estimated. Nearby actual pet bodies take one area packet; absent minions are never created.

After 0.25 seconds the recast redirects the existing star with speed 2500 and width 140. It works under the primary's cast-inhibiting crowd-control exception. Its maximum outbound position is continuously measured 800 from Zoe's actual position, so actual Portal movement can extend committed flight. The published distance breakpoints are interpolated, capped by the documented **146.6% increase** bug rather than silently substituting the expected 150%.

The raw recast says it resets its damage modifier. This module interprets that as resetting the traveled-distance accumulator for the redirected leg, without counting the initial leg again. The ordinary policy fires backward, waits for the actual endpoint and redirects toward the actual enemy; Portal is used when its range is needed. Champion sidestep probability is evaluated for each leg. Q uses expected damage for uncertain contacts; actual pets retain geometric contacts. Full two-dimensional aiming is outside the line model.

## Sleepy Trouble Bubble

E costs 80, cooldown 14, cast 0.25. The endpoint is fixed at declaration, while its **1850-speed** flight starts at the caster's completion position. Initial range 800 and width 100 are distinct from the 100-radius endpoint lollipop. It then bounces 50 units over one second and leaves a 250-radius trap for five seconds. A trap can be consumed by an actual entering pet without hitting its owner. The first crossed terrain interval adds its actual projected thickness; a second interval stops the flight. The source's undetected very-close-wall bug and an unsourced terrain-depth limit are not guessed. The tiny or negative bounce collision radius is unresolved; the model explicitly uses zero extra radius.

The initial hit deals **230 + 45% AP** magic damage, then applies 1.4 seconds of gradually increasing drowsy slow, reaching 30%. Slow immunity suppresses that slow without canceling the scheduled sleep. The accepted drowsy status retains its current ramp strength; normal derived slow rules suppress or restore it immediately when immunity changes, including within one damage packet. A drowsy cleanse cancels the pending sleep, including a cleanse accepted before Zoe's upkeep on the exact transition tick. The model retains the accepted status through one internal housekeeping tick so initial status expiry cannot erase that distinction. The original transition deadline stays at 42 ticks, and conversion explicitly removes drowsy before movement or decisions. An unrelated shield at the boundary preserves the pending transition. This internal status lifetime does not add gameplay duration. Accepted sleep lasts 2.25 seconds before tenacity, has **30% MR reduction** and ordinary sight only while its actual sleep exists. Spell shields block the initial damage and drowsy, but do not stop a sleep already scheduled or the bonus wake packet. Actual champion bubble contacts refund 30% of the remaining E cooldown; ordinary minion contacts do not.

The first qualifying nonpersistent allied champion, explicitly classified large-monster or actual turret packet consumes a source-owned wake entitlement. Monster size and turret structure class come from actual source metadata; an evocative name or kind does not establish either. A launched pet projectile retains this metadata after its real launcher is removed, so that removal cannot erase an earned qualification. It deals true damage equal to the triggering packet's post-mitigation amount, capped at **230 + 45% AP**, **before** that packet reaches shields or HP. The triggering damage remains captured while sleep's MR reduction is removed. Recursion consumes entitlement first, and a lethal wake packet gives Zoe the kill and stops the original hit. Ordinary minion damage can wake sleep but does not consume this source-qualified bonus. The separate bonus remains available for one second after actual sleep expiry or early removal. Direct parried packets do not consume it.

Committed bubble/sleep state and qualifying launched hits can complete after Zoe dies. They do not extend the duel merely because a non-damaging sleep mark remains. Pet sleep, resource state and bonus entitlement belong to the actual pet, independently of its owner and branch copies. Uncertain initial E contacts use the existing production split machinery because sleep is decisive; the existing branch cap still uses the engine's documented expected-value approximation.

## Spell Thief's supported scope

`spellShard=0`, the default, starts empty. `spellShard=1` explicitly supplies one already collected Flash, held for at most 60 seconds and usable once. Unsupported shard identifiers are rejected. There is no random free farm, fictional enemy cast or assumed minion balloon.

Flash uses the sourced 400 range, existing terrain-aware blink clipping and ordinary movement/cast restrictions. Its activation grants 70% bonus movement speed for three seconds and exactly three **55 + 10% AP** bolts for ten seconds. Bolts select actual visible, eligible, nonsleeping enemies, preferring the target of a declared basic attack. Complete control, including an actual stasis state, delays launch. One bolt is in flight at a time; the next becomes eligible when that bolt resolves. This is an explicit conservative cadence assumption because no reliable interlaunch interval appears in the retained sources. Released bolts use exact client speed 1400 and survive the owner's death; unfired bolts expire without damage.

Other summoner spells, item actives, minion balloon generation and enemy summoner/item shard drops are unsupported because the duel does not simulate those cast inventories. This is a partial Spell Thief implementation, not a claim that every stolen spell is modeled. Conditional shard effects are excluded from the repeating stat-budget estimate.

## Portal Jump

R costs 40, cooldown 5 after the effect. The 575 maximum destination and return origin are captured at declaration. The first blink occurs 0.4 seconds from declaration: the source's 0.25 cast and 0.15 delay are combined before tick rounding. The return point is shifted 25 units in the initial cast direction. Neither subsequent caster movement, forced movement nor a moving enemy rewrites those points.

The source explicitly reports inconsistent destination duration and action locks. This deterministic model uses the published lower bounds: 0.95 seconds at the destination, 0.55 seconds of initial lock from declaration and 0.3 seconds of return lock. These are visible assumptions rather than precise server-clock claims. Q's crowd-control recast exception does not bypass either explicit Portal action lock. At the destination movement speed is a static zero; it grants no invulnerability, untargetability or CC immunity. Forced displacement can still move Zoe, and the committed portal returns to its captured point. While an actual attachment prevents relocation, each committed Portal transition still reports a blink at the retained position, as the source explicitly requires. Death cancels the portal and begins the post-effect cooldown. Ordinary attacks are reset on completion.

## Allocation and validation

The allocation heuristic prices a nominal redirected star, one initial bubble and one prospective capped wake per E cycle. It prices Sparkles at the lower of actual attack cadence and Q/E/R activation cadence. Captured numeric values are read through `KitContext` while building; no data lookup occurs during fights. The heuristic assumes opportunity for a bubble follow-up, while combat still requires actual contacts and finite state. It excludes conditional shard effects and invented farm, allies or drops.

The direct-module suite covers the source pins and invalid history, passive entitlement and defenses, Q flight/redirect/interception/splash/branches, E geometry/bounce/traps/branching, guarded drowsy/sleep and pre-trigger bonus order, real pet recipients, explicit finite Flash/bolts and captured Portal clocks/returns. Earlier failing reports are preserved externally. The batch controller owns independent source integrity, complete matrix/reflection, the unfiltered full-suite verdict and production browser/release validation.
