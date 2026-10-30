# Rengar implementation and evidence audit

Rengar has a runtime kit with actual Ferocity, separate empowered casts, real basic-attack leaps, recent health-loss accounting, first-contact bolas, and a timed Thrill of the Hunt. All consumed gameplay values are read through `KitContext` while compiling the kit. Combat callbacks use those captured values and real duel state.

## Exact sources

The five immutable primary templates are retained verbatim in each ability record's supplemental `sources` entry. Their original parsed fields, notes and page pins remain intact.

| Slot | Immutable primary revision | Values and restrictions used |
| --- | --- | --- |
| I | [Unseen Predator, 4059878](https://wiki.leagueoflegends.com/en-us/Template:Data_Rengar/Unseen_Predator?oldid=4059878) | Four Ferocity; one-second nonrefreshing out-of-combat timer; ten-second damage grace; one Predator-generated stack per resource cycle; 50% empowered movement speed for 1.5 seconds; brush and .35-second linger; 745 edge-to-edge leap reach, 1450 speed and landing 50 units before the target's original location; root/ground, interruption and visibility exceptions; actual earned Bonetooth trophy. |
| Q | [Savagery, 4052789](https://wiki.leagueoflegends.com/en-us/Template:Data_Rengar/Savagery?oldid=4052789) | 160 + 5% total AD additional physical damage; 40% attack speed for two attacks within three seconds; uncancellable first windup, +25 range, attack reset and post-effect four-second cooldown. Empowered damage is 260 + 20% total AD at level 20; consuming it grants the level-20 107% attack speed for five seconds. Ordinary and empowered attack-speed instances can stack. Casting preserves stealth. |
| W | [Battle Roar, 4009100](https://wiki.leagueoflegends.com/en-us/Template:Data_Rengar/Battle_Roar?oldid=4009100) | 170 + 80% AP magic damage in 450 radius, ten-second cooldown; 50% of recent health loss, or 100% from monsters, within 1.5 seconds. Grey health is not consumed by the first heal. Empowered damage is 240 + 80% AP at level 20 and cleanses crowd control. Monsters take an additional 137.647058823529… magic damage at level 20. |
| E | [Bola Strike, 4009137](https://wiki.leagueoflegends.com/en-us/Template:Data_Rengar/Bola_Strike?oldid=4009137) | 235 + 80% bonus AD physical damage, 90% slow for 1.75 seconds, two seconds of true sight; 1000 reach, 140 width, 1500 projectile speed, .25-second cast outside a leap and no cast time during a leap, ten-second cooldown. Empowered damage is 335 + 80% bonus AD at level 20 and roots instead of slowing. Q/W wait for a nonzero Bola cast to finish. |
| R | [Thrill of the Hunt, 4052301](https://wiki.leagueoflegends.com/en-us/Template:Data_Rengar/Thrill_of_the_Hunt?oldid=4052301) | Twenty-second effect and 60% movement speed; two-second fade and fourteen-second maximum camouflage; 3500 reveal range, 1600 marked-enemy range and 710 detection radius. The qualifying basic adds 100% total AD, then reduces armor by 25 for four seconds. Attack declaration and non-Q ability declaration end the effect; the eighty-second cooldown starts after it ends. |

Level-20 values use the source's full level series rather than substituting level-18 values. In particular, Q's empowered damage is **260**, W's is **240**, E's is **335**, and empowered Q's attack-speed bonus is **107%**. The primary Q blurb still mentions an automatic critical strike, but the detailed description and pinned binary describe ordinary additional damage. The implementation follows the detailed description; ordinary basic AD still uses the simulator's critical-strike rules.

Supplementary evidence is the exact [16.20 Rengar binary JSON](https://raw.communitydragon.org/16.20/game/data/characters/rengar/rengar.bin.json), game version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `aa1e14a66f18f2d40a782c6be70b724d6ea926781b9d436dcdb25ad466c86c9e`. Seven complete top-level objects are retained as exact JSON excerpts in `gameSources`:

- `Characters/Rengar/Spells/RengarPassiveAbility/RengarPassive`.
- `Characters/Rengar/Spells/RengarQAbility/RengarQ`.
- `Characters/Rengar/Spells/RengarWAbility/RengarW`.
- `Characters/Rengar/Spells/RengarEAbility/RengarE`.
- `Characters/Rengar/Spells/RengarEAbility/RengarEMis`.
- `Characters/Rengar/Spells/RengarEEmpAbility/RengarEEmpMis`.
- `Characters/Rengar/Spells/RengarRAbility/RengarR`.

This preserves whole arrays and their actual object paths, including MaxFerocity, ASBonus, HealingWindow, FadeTime, both 70-unit missile collision radii, both 1500-speed movement components, and W's `SpecialCase_StasisLocked` tag. Source conflicts remain visible: W's primary radius 450 takes precedence over binary cast radius 400; primary R detection 710 over binary 750; primary leap range 745 over R's binary 725; primary R's no cast time over binary .25; and the primary empowered movement-speed series over the binary's later 60% breakpoint. Binary ammo recharge is not mistaken for its unrelated .25-second spell-lock field.

The fetched raw templates, binary and SHA metadata are outside the repository in `/workspace/counter-next-wave/batch9-audit`; the consumed supplemental text and binary excerpts are included in the working source and simulation provenance.

## Runtime behavior

The duel starts at zero Ferocity with no preduel attacks, grey health, active ultimate or Bonetooth trophies. Ordinary W and E generate their stack at cast completion, and ordinary Q generates its stack when its first empowered basic launches. Subsequent ordinary generators do not refresh the out-of-combat one-second clock. Real direct combat holds expiration for ten seconds. Spending four Ferocity activates separate Q2/W2/E2 casts, grants the sourced movement bonus, and preserves the ordinary counterpart's existing cooldown. A real first champion kill can earn the first unique trophy; pet kills create none. No five-stack or Kha'Zix-event history is granted.

Savagery modifies an actual basic packet. Its first attack carries the correct additional physical formula, ordinary AD and crit outcome, on-hits and life steal. Blind, attack dodge, block and parry retain their ordinary effects; spell shields do not absorb this basic. Real pets use their own health, resistances and defenses. Normal and empowered Q supply independent two-attack speed instances, while a later Q cast replaces an unused first-attack damage empowerment. The ordinary Q cooldown waits for its attack launch or window expiry.

Battle Roar stores timestamped health actually removed after shields and mitigation; absorption and overkill do not create healing. Actual attacking pets supply their own monster/minion/champion classification. The two W casts can reuse the same remaining history, and intervening losses keep separate expiry times. Healing follows the ordinary maximum-health, death and Grievous Wounds rules. Each real target receives its own guarded area packet. Monster bonus damage checks actual source classification. Empowered W can answer suppression and other removable control but cannot cast during stasis and grants no invented subsequent immunity.

Bola Strike is a finite first-contact missile. An intervening pet receives its own damage, slow/root and true sight, and protects its owner from that projectile. Spell shields, parry, untargetability and projectile walls guard the relevant packet; invulnerability denies damage while allowing the separately sourced control and reveal. A released bola continues after caster death. A ground cast keeps the declaration direction and uses the completion position; during a Predator leap its cast time is zero. Q/W do not bypass a pending ground Bola cast. The policy waits for completion because player-input buffering is outside the simulator.

Unseen Predator uses a captured real basic, an interruptible sourced-speed dash and the actual target's original coordinate. The destination is fifty units before that coordinate. At arrival, a still-existing valid target can be hit regardless of later movement or visibility loss. Death, removal, stasis and untargetability deny contact; knockdown cancels the captured attack. A pet leap never retargets its owner. The attack timer starts at leap launch, and Q/W/E can overlay the dash. Root and ground remove extended range. State is stored as primitives and serialized captured packets so cloned worlds do not share mutable history.

Thrill of the Hunt retains distinct effect, fade, camouflage-cap and post-effect cooldown clocks. Camouflage uses the actual observing champion's detection radius. Detection reveals the opposing champion through invisibility, while nearsight still restricts targeting. Q preserves the hunt; attacks and non-Q ability declarations end it. The qualifying real basic applies its extra damage before armor reduction. Blind, attack dodge, block and parry deny the bonus and reduction. Its attack reveal is attached to the actual target, including a melee pet, and is cleared after resolution or interrupted leap. Pet marks and armor effects remain on that pet, without contaminating its champion owner.

The behavior runs ordinary bookkeeping before choosing custom actions, reserves offensive R in hold/trade modes, and preserves completed-trade retreat. Defensive empowered W can respond to actual control. Full production scenarios use normal budget allocation and behavior; no forced spell sequence or reduced gold is substituted.

## Explicit limits

- Brush is the existing environment availability flag, not a spatial bush map. Enabled brush allows Predator throughout the one-dimensional lane; disabling it retains the sourced .35-second linger. The model cannot infer actual brush entry, exit, wards or Flash/Hexflash transitions.
- The separately sourced .25-second transitions for Q and Rapid Firecannon bonus range are not simulated. Q's range is removed immediately while Predator is active. External item actives, summoner spells, Energized storage bugs and multi-champion UI alerts are unavailable.
- The unquantified short R mark residue after a prevented attack is limited to that declared attack, rather than assigned a guessed duration. Random source-listed Ferocity/animation bugs are not fabricated. Q's normal spell/basic/proc multi-tag interaction with unavailable item and rune triggers is not asserted.
- The generic crowd-control engine excludes stasis and kinematics from cleansing. W2 uses that ordinary removable-control definition; source text does not supply separate server timing for every forced displacement.
- The kit tracks the available direct/persistent damage distinction. The simulator has no complete independent engine damage-tag taxonomy for all external proc effects. Bonetooth's recursive interaction with unavailable external AD multipliers is not represented.
- All timings use 30 Hz ticks, combat remains one-dimensional, and there are no lane-wave bodies, allies, structures, farm or invented takedowns. Budget damage estimates do not guarantee ultimate marks, free trophies or perfect empowered-spell cycles.

## Validation

The resumed focused suite passes **64 tests** in `tests/kits/rengar.test.ts`, recorded at `/workspace/counter-browser/batch9-rengar-resumed-initial.json` with the adjacent log. It retains the original 55 source/mechanics/production checks and adds nine checks for Q/W waiting behind both Bola casts, state and CC stasis locks, healing from actual monster/minion/champion pets, actual pet leap geometry, and pet-local ultimate reveal/damage/armor cleanup.

Coverage includes all five primary revisions and the exact game SHA; fail-closed missing evidence; real resource generation, expiry, empowered extra casts and earned trophy; Q damage, attack speed, range, cooldown, avoidance and pet life steal; reusable timestamped healing, shields, Grievous Wounds, monster damage and suppression cleanse; normal and empowered missile formulas, first interception, independent guards, walls and post-death flight; leap range, linger, tracking exceptions, overlays, knockdown, invalid targets and branch isolation; R timing, visibility, damage/reduction order and defenses; actual-ready R reservation in hold/trade, completed-trade retreat and reflected co-location E direction.

The full **15,000-gold, six-scenario** Darius matchup runs in both orientations using ordinary production behavior. Selected builds match exactly after swapping sides; aggregate and every applicable reflected scenario score sum to zero within the unchanged **1e-12** test bound. Outcomes are finite, and normal Q/W/E/R casts all occur. This champion-level result does not claim the root's later complete-matrix, browser or private-package validation.
