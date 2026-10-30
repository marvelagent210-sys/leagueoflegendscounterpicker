# Taric: source audit and implementation boundary

This audit describes the authored level-20 Taric kit for dataset 16.20 (patch 26.20).
It records retained source evidence and model choices. The expansion's final matrix,
browser checks, full suite and private package remain separate release gates.

## Exact primary and game inputs

| Ability | Exact revision |
|---|---|
| [Bravado](https://wiki.leagueoflegends.com/en-us/Template:Data_Taric/Bravado?oldid=3986177) |3986177|
| [Starlight's Touch](https://wiki.leagueoflegends.com/en-us/Template:Data_Taric/Starlight%27s_Touch?oldid=3996427) |3996427|
| [Bastion](https://wiki.leagueoflegends.com/en-us/Template:Data_Taric/Bastion?oldid=3989049) |3989049|
| [Dazzle](https://wiki.leagueoflegends.com/en-us/Template:Data_Taric/Dazzle?oldid=3907336) |3907336|
| [Cosmic Radiance](https://wiki.leagueoflegends.com/en-us/Template:Data_Taric/Cosmic_Radiance?oldid=3907334) |3907334|

Each original primary field, formula, leveling entry and pin remains intact. Full raw
pinned templates are retained as attributed supplementary text. Values and behavioral
restrictions are read through `KitContext` at compile time; combat hooks do not
reopen source records or modify their parsed values.

The exact [CommunityDragon Taric binary](https://raw.communitydragon.org/16.20/game/data/characters/taric/taric.bin.json)
is version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`c64241aff76ed12971f11238ee132a27c2ad0e752421bdff7b3fbb24f62670bb`.
Seven complete independently attributed objects, including full arrays and nested
calculations, are retained:

- `Characters/Taric/Spells/TaricPassiveAbility/TaricPassive`;
- `Characters/Taric/Spells/TaricPassiveAbility/TaricPassiveAttack`;
- `Characters/Taric/Spells/TaricPassiveAbility/TaricPassiveAttack2`;
- `Characters/Taric/Spells/TaricQAbility/TaricQ`;
- `Characters/Taric/Spells/TaricWAbility/TaricW`;
- `Characters/Taric/Spells/TaricEAbility/TaricE`;
- `Characters/Taric/Spells/TaricRAbility/TaricR`.

Primary standard-mode values govern combat. Binary display values, alternate mode
arrays and unused ranks remain evidence and are not silently substituted.

## Bravado: actual declarations and accepted contacts

Taric starts with no Bravado entitlement. A completed basic or ultimate cast grants
up to two empowered basic declarations for five seconds; a later cast replenishes
the cap, and the first declaration refreshes the remaining window. Each declared
empowered basic spends one entitlement. A cancelled declaration follows the shared
spent-empowerment contract, rather than banking an extra empowered attack.

Both empowered attacks retain their actual doubled total attack-speed timing
snapshot, including the second attack that exhausts the buff. The ordinary basic
packet remains physical and can critically strike. The separate on-attack magic
packet is 101 at the primary's explicit level-20 interpolation, plus 15% of actual
bonus armor, with no life steal or critical multiplier. The explicit primary
level-20 series is retained rather than truncating at the binary's level-18 endpoint.

An accepted empowered attack reduces Q/W/E remaining cooldowns by
`1 + abilityHaste / (abilityHaste + 100)` seconds and grants one Q charge. R is not
refunded. Blindness makes the ordinary basic miss while the source exception still
permits Bravado damage, charge and refund. Dodge, attack block and parry deny that
bonus and refund; ordinary invulnerability denies damage without fabricating attack
avoidance. Actual enemy pets use their own defenses and health, never their owner's
avoidance state. No structure is fabricated.

## Q: all-charge heal and independent ammunition clock

At maximum rank Q begins with a full five-charge stock, costs 60 mana and has a
0.25-second cast. A completed cast consumes the captured stock and heals each actual
eligible recipient once for `charges × (25 + 15% AP + 1% Taric maximum HP)`. Each
recipient's own healing received and Grievous Wounds affect their heal. Recipient
maximum HP does not replace Taric's scaling basis.

The three-second cast cooldown is independent of the fifteen-second charge
recharge. Both use actual ability haste. Bravado adds one charge without rewinding
a running recharge deadline; reaching full stock pauses recharge without banking
extra charges. A zero-charge Q cannot be declared.

Healing covers the 325 center-radius circle around self and any actual bound ally
captured for the cast. Overlapping circles share one entitlement per recipient.
Only actual friendly Champion-class pet bodies qualify as allied champions; minions
and arbitrary unclassified pets do not. No allied champion is created in the 1v1
arena and no allied healing is priced into reference spending.

## W: one remembered real ally and recipient-local shields

Bastion supplies a nonrecursive ten-percent total-armor multiplier to Taric through
the shared armor-percent rule. The real bound ally receives ten percent of Taric's
current actual total armor. The bound ally's armor never feeds back into Taric.

W costs 60 mana, casts for 0.25 seconds and has a fifteen-second cooldown. It shields
Taric and the selected real allied Champion-class body for 2.5 seconds, using eleven
percent of each recipient's own maximum HP. A same-source W refresh replaces its
prior shield rather than accumulating layers. A dead or invalid selected ally at
completion receives no new shield; the committed self shield remains.

Automatic self-cast uses the remembered active ally, or the nearest eligible ally
within the 800 cast range when untethered. Explicit aim may select a different
eligible actual ally. Declaration range is not extended; only completion has the
sourced 175-unit forgiveness. At most one bind is remembered. A switch removes the
old body's armor contribution. Tether effects suspend beyond 1300 center distance
and resume when that same living body returns.

Released mimicked effects can complete after Taric dies or leaves tether range.
Specific named vanish forms and different realms have no independent arena
metadata, so those source exceptions remain disclosed unsupported boundaries.
Generic untargetability is not treated as proof of every named vanish.

## E: mobile delayed beam and one visible entitlement

Dazzle costs 40 mana, has a twelve-second cooldown and no cast time in the retained
primary. It starts a one-second delay while Taric can move, attack and use other
spells. Later stun does not cancel the already released beam. At release each
surviving actual emitter supplies its current position, while its direction toward
the on-cast cursor remains fixed. A released actual ally emitter remains independent
of subsequent tether range or owner death; a dead self emitter does not fire.

The beam deals 250 + 50% AP + 50% bonus armor magic damage and stuns for 1.5 seconds.
The primary 575 range and 140 full width govern over binary 610 display range,
100 line width and 0.25-second cast metadata. In the lane-axis projection its forward
interval intersects each body's actual radius; lateral width does not create an
extra endpoint lollipop. Overlapping self and ally beams share one guarded damage
and stun entitlement per recipient. Spell shielding, parry, untargetability and
stasis apply to the actual recipient; CC immunity denies stun while leaving damage
eligible. Actual pet area resistance and shield state remain body-local.

A single currently covering live beam announces the shared damage/stun entitlement
with a finite impact deadline. Its telegraph follows its actual emitter and falls
back to a surviving ally emitter when self is lost. Overlapping emitters never
double the forecast. E is nonprojectile and does not interact with projectile walls
or interceptors. Carrier emitter identity is branch-local memory, not a reused
pet-target missile field. Nearby-unit ghosting has no supplied radius; only each
emitter's own collision ghosting is represented.

## R: actual star clocks and independent primary bodies

Cosmic Radiance costs 100 mana, has a 0.25-second cast and 120-second cooldown at
maximum rank. The completed cast starts the sourced 2.5-second star delay. Each
actual primary emitter carries the star with its current position, then grants
2.5 seconds of invulnerability within 400 center radius. Overlapping stars refresh
the same state and cannot stack durations or layers.

The living primary is eligible even while untargetable; nearby secondary champions
must be targetable. Dead primary bodies and a future resurrected self do not inherit
an old star. An already emitted real allied primary can finish after owner death or
range loss, but its own death removes that emitter. Both the initial beneficial cast and delayed star carriers
announce no hostile damage or control packet to enemy perception.

## Behavior and reference spending

Fight can weave Q/W/E and Bravado basics, and uses R proactively against visible
threats while sufficiently injured. Hold and trade reserve R. A completed trade
retreats before optional casts. Flee can heal, shield and peel with E while retaining
R. Idle creates no free cast or healing. No option fabricates an ally.

Reference spending estimates sustained self-only casts, charge generation and
Bravado weaves with a capped attack/cast cadence. It prices source E and Bravado
damage, self Q healing, nominal self W shield and Bastion's self armor. It does not
price allied stats, duplicated beams, allied healing/shields or R as damage.
The allocation estimate does not pregrant live combat buffs, mana or real contacts.

## Authored regression scope

Focused tests cover exact pins and full-object provenance, missing-evidence failure,
source immutability, Bravado timing and cap, blind/avoidance/refund distinctions,
actual pet defenses, partial/full Q formulas, recharge and charge clocks, healing
modifiers, real ally eligibility, W range and forgiveness, bound-ally replacement,
recipient HP scaling, tether suspension, dead declared ally and shield refresh.
They also cover delayed moving E origins, fixed direction, later CC, guards, actual
pet resistance, independent ally release, single finite telegraphs and self-loss
fallback, R delay/duration/overlap/primary exceptions/dead emitters, resurrection,
branch independence and ordinary modes.

Two authored production tests retain the full 15000-gold allocation: six-scenario
Darius reverse-build and score reflection at the unchanged 1e-10 tolerance, and an
ordinary six-scenario Heimerdinger matchup with actual pets. Their execution belongs
to the shared serial validation; this document does not claim they have run.

## Coincident landing reflection regression

The first frozen batch12 production reflection found a Rakan/Taric spacing
asymmetry at identical legal15,000gold allocations. Rakan's leap produced exact
overlap in one orientation and a2.84e-14 coordinate residue in reverse; an exact
zero directional comparison made both retreats move left. Shared direction now
uses the simulator's existing1e-6 spatial precision for coincidence, preserving
real crossings. Taric's direct on-cast emitter sign uses the same coincidence
rule. The score comparison remains1e-10; no result is normalized or restamped.

The actual failed freeze, dispatch indices14/15, raw results and logs are preserved
under `/workspace/counter-browser/batch12-before-rakan-taric-reflection-correction`.
The actual failing movement, full-budget pair and emitter tests are retained
separately. All174 targeted Rakan, Taric and shared-contract tests pass after the
fix, including all six full-budget pair scenarios and exact spending reflection:
`/workspace/counter-browser/batch12-coincident-reflection-final-targeted-tests.json`.
