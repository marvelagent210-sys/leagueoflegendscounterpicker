# Naafiri implementation and evidence audit

Naafiri uses the current ability layout: **The Call of the Pack is W and Hounds' Pursuit is R**. Packmates are real Minion-class bodies with their own health, target identity, movement, attacks, defenses and lifetime. All consumed source quantities are read through `KitContext` during compilation.

## Exact sources

| Slot | Immutable primary revision | Values and rules used |
| --- | --- | --- |
| I | [We Are More, 4025780](https://wiki.leagueoflegends.com/en-us/Template:Data_Naafiri/We_Are_More?oldid=4025780) | Five Packmates at level 20, including the explicitly supplied game-start population; 10-second static spawning; 4-second reduction from initial ability contacts and 1 second from actual kills. Both E contacts count; bleed and Packmate attacks do not. |
| Q | [Darkin Daggers, 4073795](https://wiki.leagueoflegends.com/en-us/Template:Data_Naafiri/Darkin_Daggers?oldid=4073795) | 55 + 20% bonus AD initial damage; 135 + 80% bonus AD over ten half-second bleed ticks; second-contact payoff interpolating separately from 80 + 40% bonus AD to 160 + 140% bonus AD by missing health sampled before the remaining bleed; 105 + 40% bonus AD heal; 70-health minion execution; 900 range, 100 width, 1700 speed; 0.25-second cast; free recast after 0.5 seconds within four seconds; post-effect 7-second cooldown, 90 mana. |
| W | [The Call of the Pack, 4058060](https://wiki.leagueoflegends.com/en-us/Template:Data_Naafiri/The_Call_of_the_Pack?oldid=4058060) | Five-second declaration-start hunt; one second untargetable and ghosted; Packmates vanish for 0.9 seconds; two extra bodies after 1.25 seconds; 20% total AD and 30% movement speed; R extends the hunt by 1.75 seconds up to five remaining seconds; moving 0.75-second cast; on-cast 18-second cooldown, 60 mana. |
| E | [Eviscerate, 4007772](https://wiki.leagueoflegends.com/en-us/Template:Data_Naafiri/Eviscerate?oldid=4007772) | 55 + 40% bonus AD sweep and 160 + 80% bonus AD endpoint flurry; 250–450 displacement at 900 speed; 50 collision radius, 230 endpoint radius; separately guarded contacts; vanished Packmates reappear healed; pursuing Packmates are excluded; 7-second cooldown, 40 mana. |
| R | [Hounds' Pursuit, 4046586](https://wiki.leagueoflegends.com/en-us/Template:Data_Naafiri/Hounds%27_Pursuit?oldid=4046586) | Stationary 0.75-second channel, true sight during channel, interruptible 1800-speed chase, approximately 125-unit front landing; 275 + 100% bonus AD collision and 27.5 + 10% bonus AD per participating pet; 99% slow for 0.25 seconds; 900 cast range; seven-second takedown window; one free recast within twelve seconds with a 200 + 150% bonus AD three-second shield; on-cast 80-second cooldown, 100 mana. |
| Pet | [Naafiri article, 4025794](https://wiki.leagueoflegends.com/en-us/Naafiri?oldid=4025794) | Actual Minion targeting; level-scaled health, resistances and damage; owner-inherited attack and movement speed; actual two-second commands; 1300 pounce reach; Prey Drive's three stored 30% attacks and three-second duration; monster damage, incoming damage categories, stealth, blink offsets and death rules. |

The exact raw templates remain in each ability's supplemental `sources`, and the entire exact pet article is retained in `pet.text.pinnedRawRevision`. Primary parsed fields and revision IDs remain intact. The pet's level-20 series evaluate to **335.645 HP**, **35.397 armor and MR**, **21.1764705882353 + 4% bonus AD** basic damage, **25** gameplay/pathing radius and **125** attack range.

The supplementary [16.20 Naafiri binary](https://raw.communitydragon.org/16.20/game/data/characters/naafiri/naafiri.bin.json) is version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `2c003777467cfcce34528813091dcb815863692be5f2960bd954159a4e092e61`. Five `gameSources` retain exact object paths and 37 excerpts, including complete selected arrays:

- `Characters/Naafiri/Spells/NaafiriPAbility/NaafiriP`
- `Characters/Naafiri/Spells/NaafiriQAbility/NaafiriQ`
- `Characters/Naafiri/Spells/NaafiriEAbility/NaafiriE`
- `Characters/Naafiri/Spells/NaafiriWAbility/NaafiriW` — the current R ability.
- `Characters/Naafiri/Spells/NaafiriRAbility/NaafiriR` — the current W ability.

Internal binary W/R names retain their old layout. They do not override the primary slot assignment. The primary **0.5-second** Q recast lockout overrides binary **0.75**, and the primary **1300** pounce reach overrides binary `LeapMax` **1200**. Binary `LeapSpeed` **1250** supplies finite Packmate pounce travel. The source conflicts remain explicit in the records, evidence and compiled assumptions.

## Runtime behavior

Packmates begin without fabricated commands, Prey Drive or combat history. Connected owner basics command their actual champion or pet recipient for two seconds; blind, dodge and parry deny commands, while a damage-blocked contact still commands. Q commands the first visible non-minion contact of each missile. The E flurry chooses its nearest visible contact with champion priority. Target IDs are retained, so a command against a summon cannot become damage against its owner. Root, ground, silence and disabling control prevent pounces. Uncommanded pets return toward Naafiri. Real owner death removes the pack; actual stealth and detected blink offsets propagate to its bodies.

Packmates update supplied movement speed and attack interval from the owner's effective stats every tick. Explicit shared pet flags prevent independent body slows, movement buffs or cripples from modifying those inherited values a second time; the status objects remain available and movement/attack disables still apply. Prey Drive is consumed only by a connected pet basic, including a damage block; blind, dodge and parry preserve it. Spell shields do not stop the ordinary pet basic. Its area spell-effect category and explicit monster amplification stay separate from the pet's basic avoidance rules. Area damage against a Packmate takes its sourced multiplier; melee champion basics take twice normal damage.

Q missiles pierce real health pets and have independent contact histories. Initial contact creates ten scheduled DoT pulses. Rehitting consumes only this caster's remaining bleed and computes the extra payoff from pre-payoff missing health. Champion-class recipients grant the heal only after the contact guards accept the payoff. Pet statuses are synchronized before damage so a consumed bleed cannot return from an older temporary combat view. Hit-count objects receive no bleed or execute status. Fresh spell shields, parry, stasis and untargetability deny the corresponding contact. Explicit minions can execute on initial contact or an actual bleed pulse. Q does not refresh commands or the passive spawn timer on bleed ticks. A released dagger and existing bleed can continue after Naafiri dies.

W starts its hunt, AD bonus, untargetability, ghosting and pet vanish at declaration. The 20% AD bonus excludes its own previous buff when recomputed, so it does not compound itself. Extra bodies appear on their real clock. Replacement bodies above the ordinary five-body cap remain temporary; hunt expiry cannot leave seven permanent Packmates. Its R extension changes the remaining hunt clock, with no hunt created when W is absent.

E sweeps the actual traveled segment once per recipient and resolves the endpoint flurry independently. A spell shield can stop one contact while the other remains. Only the accepted flurry supplies E's pet command. Packmates return healed even after knockdown; an interrupted dash grants no endpoint flurry. Hit-count objects are outside these spell contacts.

R retains a real stationary channel followed by a moving dash. Root, ground, silence and ordinary channel interrupts return the pets without collision damage. Target untargetability does not cancel tracking but denies actual collision packets; stasis also guards impact. Each participating Packmate has its own sourced spell-shield exception, so a shielded champion collision does not erase the pet damage. R preserves genuine stealth. Only an actual champion kill during the source window grants its single free recast and shield; ordinary summoned-unit kills do not. Ordinary fight policy uses the ability, while hold/trade reserve it and completed trades retain retreat priority.

## Explicit limits

- The pet article labels its base-damage progression a placeholder for a special formula. The primary progression and exact binary's 10-to-20 interpolation agree in shape, but a distinct authoritative server formula is unavailable. Level 20 follows the repository's source-series convention, including extrapolation beyond level 18.
- Formation collapses onto the duel line. Brush entry/pathing, lateral flurry geometry, ambient lane minions, structures, allied assists and Minion Hunter last-hits are not represented by invented units or history.
- Catch-up acceleration is unquantified. The documented approximate 400–450 threshold uses its upper endpoint, with linear interpolation to the published 1000 speed at 700 units. Blink propagation recognizes position discontinuities beyond normal walking while no dash is active; it is not a complete teleport-event system.
- The primary E allows an extended 650-unit endpoint across terrain but gives no exact server extension algorithm. The normal 450 range uses the shared clear-endpoint terrain rule; no guessed extension is added.
- R's maximum tracking distance is unquantified. The existing 900 cast range bounds updates from the original cast position; after that, the last accepted destination remains. The bug-described basic windup during R travel is not fabricated as a guaranteed extra basic.
- Monster metadata distinguishes generic monsters only. It cannot establish large versus small or epic status, so Q's large-monster healing, non-epic execution and corresponding spawn refunds are not guessed. Explicit minion and champion cases are enforced.
- The binary exposes `HealthRegenDelay` and `HealthRegenPercent` without the server timing rule; ordinary Packmate regeneration is not inferred from those names. E's explicitly sourced full-health restoration is implemented.
- Standard sight is recorded without exposing invisibility or overriding nearsight. The simulator has no full fog-of-war system. Clocks resolve at the ordinary 30 Hz tick boundary.

## Validation

The focused suite tests all six exact wiki revisions, source failure guards, the current W/R layout, normal six-scenario production with the full 15,000-gold allocation and strict reflected scores/builds, actually-ready R reservation in hold/trade, completed-trade retreat, pet classification and real target IDs, command timing, pounce blockers, Prey Drive, inherited speed, damage categories, stealth/death, Q pulses/payoff/consumption/execute/guards/walls/recast/branching, W declaration clocks and temporary replacements, E swept and endpoint contacts, R channel interrupts, independently shielded collisions, tracking, recast eligibility, stealth and exact-overlap reflection.

The current focused suite passes **56 tests**, recorded outside the repository in `/workspace/counter-browser/batch9-naafiri-resumed-final.json`. Full batch matrix, integration, browser and private-delivery evidence belongs to the root release workflow; this document does not certify an unfinished batch release.
