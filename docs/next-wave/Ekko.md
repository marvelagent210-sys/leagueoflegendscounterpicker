# Ekko implementation and evidence audit

Ekko now has a source-backed runtime kit, distinct projectile passes, real empowered basics, delayed zone entry, and a rewind built from actual duel history. All gameplay quantities are read through `KitContext`; runtime callbacks use values captured during compilation.

## Exact sources

The five primary pages are immutable revisions of the League of Legends Wiki:

| Slot | Primary source | Values and rules used |
| --- | --- | --- |
| I | [Z-Drive Resonance, 4022978](https://wiki.leagueoflegends.com/en-us/Template:Data_Ekko/Z-Drive_Resonance?oldid=4022978) | Three stacks, 4-second refresh and post-proc lockout; piecewise level damage + 80% AP; 270% monster damage; champion movement speed and basic attack avoidance rules. |
| Q | [Timewinder, 4067545](https://wiki.leagueoflegends.com/en-us/Template:Data_Ekko/Timewinder?oldid=4067545) | 140 + 30% AP outward, 140 + 70% AP returning; 1650/2300 speeds; 120/200 widths; 700-unit expansion trigger, 190 further travel, 1.75-second expansion, 160–210 slow radius, 60% slow; 7-second cooldown, 80 mana, .25-second cast. |
| W | [Parallel Convergence, 3956502](https://wiki.leagueoflegends.com/en-us/Template:Data_Ekko/Parallel_Convergence?oldid=3956502) | Below-30% basic passive, 3% + 3% per 100 AP missing-health damage, minimum 15 and minion/monster cap 150; 2 + 1.25-second delay, 1.5-second sphere, 375 radius, 40% slow; entry gives 180 + 150% AP shield for 2 seconds and 2.25-second stun; 14-second cooldown, 50 mana. |
| E | [Phase Dive, 4025604](https://wiki.leagueoflegends.com/en-us/Template:Data_Ekko/Phase_Dive?oldid=4025604) | 325 displacement, terrain extension up to 550; 3-second attack window, +300 range, .25-second uncancellable empowered windup, estimated 125 landing range, 150 + 40% AP enhancement; attack reset, invalid target retention, avoidance consumption, root/ground restrictions, post-effect 7-second cooldown and 60 mana. |
| R | [Chronobreak, 4012189](https://wiki.leagueoflegends.com/en-us/Template:Data_Ekko/Chronobreak?oldid=4012189) | Four-second position and health-loss history; .5-second cast followed by .5-second reverse-path travel; 375 explosion radius, 500 + 175% AP damage; 200 + 60% AP base heal increased by 3% per 1% max health lost, capped at four times base; 50-second cooldown, 100 mana. |

The primary passive's piecewise progression evaluates to **150 + 80% AP at level 20**, as required by this simulator's level convention. The source level sequence is used directly; no level-18 constant replaces it.

Supplementary evidence is the exact [16.20 Ekko binary JSON](https://raw.communitydragon.org/16.20/game/data/characters/ekko/ekko.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `cd9b8eac17f55d150eed5a9f9dace5382dd07ccd5853d8591768ac4e26ae97e7`. The five `gameSources` preserve exact object paths and serialized excerpts:

- `Characters/Ekko/Spells/EkkoQAbility/EkkoQ`: `mSpell.DataValues.SlowZoneRadius.values`, seven values of 165.
- `Characters/Ekko/Spells/EkkoWAbility/EkkoW`: `mSpell.DataValues.DelayBeforeDetonation.values`, seven values of 3.
- `Characters/Ekko/Spells/EkkoEAttack`: `mSpell.mCantCancelWhileWindingUp: true`.
- `Characters/Ekko/Spells/EkkoEAbility/EkkoE`: `mSpell.DataValues.DashDistance.values: [350.0,350.0,350.0,350.0,350.0,350.0,350.0]`.
- `Characters/Ekko/Spells/EkkoRAbility/EkkoR`: `mSpell.manaValues.values: [100.0,100.0,100.0,0.0,0.0,0.0]`.

The pinned raw wiki pages and binary are preserved outside the repository in `/workspace/counter-next-wave/batch8-audit`. The primary radius range, 3.25-second W declaration delay, 325-unit E travel, and 100-mana R cost take precedence over the conflicting binary fields. In particular, the binary's seven 350-unit DashDistance values do not replace the primary's 325-unit displacement. These conflicts remain visible in the data, compiled evidence, and assumptions.

## Runtime behavior

Resonance marks and its post-proc lockout belong to the actual contacted champion or health pet. A Q pass, R explosion, or successful basic contributes one contact; E contributes one basic contact. Blind, attack dodge, attack block, and Riposte deny basic stacks. The third stack attempts a separate spell-shieldable damage packet. Only a champion or an explicitly Champion-class summon grants Stolen Time. Monster amplification and W's minion/monster cap use the actual target's source classification. Hit-count objects receive their ordinary basic interaction and no spell proc stacks.

Timewinder uses a piercing outbound missile, a slower expansion phase, and a separate owner-following return missile. Each pass has separate contact history and guards. Health pets take their own area damage and do not expand the grenade unless their source explicitly classifies them as champions. The return follows Ekko's current position, including after his death. A projectile wall destroys the remaining flight. Expansion slow is renewed only for enemies inside the current radius.

W's visible indicator and delayed sphere are separate clocks. The sphere slows actual members, then tests Ekko's entry for a single shield and separate guarded stun attempts on every enemy inside. Untargetability permits entry; zero health, death, or resurrection prevents it. The slow continues after detonation. A declared sphere survives caster death. The basic passive is evaluated after Resonance and before ordinary basic damage, preserving the explicitly sourced third-stack threshold interaction.

E resets the basic timer and creates an actual empowered basic, breaking external stealth when its windup starts. At launch it revalidates the actual champion or pet's health, targetability, visibility, and reach. An invalid target preserves the window. Blind/dodge/block spend the window and deny damage and stacks. A spell shield suppresses E's magic enhancement while the ordinary basic and its contact remain. Crit modifies ordinary physical damage; E's magic packet retains its own formula and single-target spell classification. Root/ground remove the extra range and prevent the blink, while an accepted melee basic can spend E. The cooldown begins when the attack is spent or the window expires.

R has no fabricated preduel history: it becomes usable only after four real seconds. Declaration snapshots the historical endpoint, reversed path, and recorded health loss. Damage reports count actual HP removed, including reflected damage; shields do not count and intervening healing does not erase loss. At cast completion, healing is added to current HP through ordinary healing and grievous-wounds rules. It restores no mana. Stasis covers the cast and travel. Reverse-path movement can enter W spheres, and the endpoint explosion contacts each real target with its own guards. Primitive memory entries preserve branch isolation.

The normal behavior uses Q, W, E, and the history-gated R, with a contextual E step into an armed W sphere. Contextual R for survival or endpoint damage is reserved for fight and kite modes; trade and hold keep the ordinary ultimate reservation and defensive reactions. The common short-trade clock runs before optional sphere entry, and a completed trade follows its ordinary retreat even when E can reach an armed sphere or R has a valid four-second afterimage. Idle and flee keep their existing decisions. The budget estimates two Q passes, E's extra magic packet, achievable Resonance cycles, W's execute window, and minimum R healing/damage. It gives no guaranteed value to W's conditional shield.

## Explicit limits

- The primary E page and exact binary do not supply an initial dash speed. Its displacement is immediate and terrain-aware. Finite travel, knockdown during that travel, and casting during it remain unsupported timing details.
- Q's estimated expansion speed of 200 disagrees with 190 travel over 1.75 seconds. The implementation interpolates the published distance and duration and grows the radius linearly; exact deceleration and growth curves are unavailable. All clocks use the simulator's 30 Hz resolution.
- The return retains the outbound scalar skillshot weight. Separate correlated sidestep outcomes between passes are not represented. Actual pass collision, spell shields, targetability, pet contacts and projectile walls remain separate.
- R distributes rewind travel uniformly by recorded path length. Its health-loss and heal amount are snapshotted at declaration. The exact traversal acceleration and an alternative cast-completion loss snapshot are not asserted. HP costs that bypass damage reports and history before duel start are unavailable.
- The model contains no lane minion wave, structures, allied takedown system, summoner spells, or external item actives. Source rules involving these systems do not create synthetic targets or history.

## Validation

The focused `tests/kits/ekko.test.ts` suite passes **62 tests**, retaining the original 54 mechanics/source tests and adding eight mode regressions. It covers the source contract, formulas, distinct contacts, lockout/expiry, attack defenses, real pet classes, hit-count objects, outbound/expansion/return timing, moving origins and owners, projectile walls, post-death flight, W entry and resurrection, execute ordering and caps, E windup/crit/cancellation/terrain/blind/pets/reflection, four-second history, current-health healing, actual loss versus shields and intervening healing, grievous wounds, nonmonotonic path traversal, endpoint pet guards, displacement protection, and cloned world memory.

It also runs the complete normal six-scenario, 15,000-gold allocated matchup against Heimerdinger with upgraded rockets, plus an unmodified default-behavior Q/W/E/R trace. Mode regressions accumulate four real seconds of history before checking R reservation in trade/hold, contextual R priority in fight/kite, and idle/flee decisions. A real armed W sphere verifies that the trade clock starts before optional E entry and that completed-trade retreat wins over both ready E entry and an eligible R. The mode-fix result is `/workspace/counter-browser/batch8-ekko-mode-focused.json` with its adjacent `.log`; other focused logs use the same `batch8-ekko-*` prefix outside the repository.
