# Rakan: source audit and implementation boundary

This describes the authored level-20 Rakan kit for dataset 16.20 (patch 26.20).
It records source choices and mechanics checks. Final matchup-matrix, browser,
whole-suite and private-package validation belong to the batch release gates.

## Exact primary records

The original fields, leveling, parsed parts and revision identities remain intact.
Each record also retains its complete independently fetched pinned raw template.

| Ability | Pinned revision |
|---|---|
| [Fey Feathers](https://wiki.leagueoflegends.com/en-us/Template:Data_Rakan/Fey_Feathers?oldid=4016025) | 4016025 |
| [Gleaming Quill](https://wiki.leagueoflegends.com/en-us/Template:Data_Rakan/Gleaming_Quill?oldid=3996425) | 3996425 |
| [Grand Entrance](https://wiki.leagueoflegends.com/en-us/Template:Data_Rakan/Grand_Entrance?oldid=4007760) | 4007760 |
| [Battle Dance](https://wiki.leagueoflegends.com/en-us/Template:Data_Rakan/Battle_Dance?oldid=4008001) | 4008001 |
| [The Quickness](https://wiki.leagueoflegends.com/en-us/Template:Data_Rakan/The_Quickness?oldid=3971183) | 3971183 |

The independently fetched [CommunityDragon binary](https://raw.communitydragon.org/16.20/game/data/characters/rakan/rakan.bin.json)
has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256
`ad43a676d9cd7edfe3bb873eb292d65fe2d920aa59640330a5abc2fc1c6f82c2`.
Ten complete object excerpts retain their complete nested records and arrays:

- `Characters/Rakan/Spells/RakanPassiveAbility/RakanPassive`;
- `Characters/Rakan/Spells/RakanQAbility/RakanQ`;
- `Characters/Rakan/Spells/RakanQAbility/RakanQMis`;
- `Characters/Rakan/Spells/RakanWAbility/RakanW`;
- `Characters/Rakan/Spells/RakanWAbility/RakanWCast`;
- `Characters/Rakan/Spells/RakanEAbility/RakanE`;
- `Characters/Rakan/Spells/RakanEAbility/RakanECast`;
- `Characters/Rakan/Spells/RakanEAbility/RakanECastXaya`;
- `Characters/Rakan/Spells/RakanEAbility/RakanERecast`;
- `Characters/Rakan/Spells/RakanRAbility/RakanR`.

The module reads numeric fields, formulas, quoted exceptions and binary evidence
through `KitContext` during compilation. Missing required binary evidence fails
compilation. Combat hooks use the compiled constants, preserving source records.

## Fey Feathers: shield and combat clocks

Rakan begins with his naturally ready 247.941176470588+95% AP shield. It persists
until broken; no previous combat, recall or ally is supplied. Breaking it opens
the static 12.75-second regeneration clock. Further damage does not restart that
clock. Actual enemy-champion basic resolutions reduce it by one second even if
blinded, blocked, dodged or parried. Actual enemy-champion ability contacts also
refund through spell shields and Riposte. Ordinary minions do not qualify, while
an explicitly classified real champion clone retains its own identity.

Incoming or outgoing actual health/shield damage resets the five-second combat
clock. A surviving partial shield returns to its current maximum only after that
clock expires. This restoration does not fabricate a separate shield cast. The
repository has no Recall action, so Lover's Leap is not converted into duel
healing or an invented ally.

## Gleaming Quill: actual first body and delayed healing

Q costs 45 mana and has a 0.25-second cast. Its single projectile launches from
the completion position at 1850 units/second, with primary range 900 and width
130. It stops on the first actual eligible body. Its seven-second hasted cooldown
begins when the projectile disappears, including a wall or an interception, rather
than when the cast begins or finishes. The source explicitly establishes this
post-effect cooldown.

Champion or explicitly epic-monster contact arms one three-second heal for
230+55% AP. A spell shield or Riposte can guard the damage while leaving this heal
eligible. A later successful Q refreshes the one pending mark. The return animation
does not delay it. Rakan may heal while untargetable; ordinary healing prevention
and grievous wounds still apply. Death cancels a pending heal.

The final heal includes actual allied champion-class bodies within the primary
200 center-radius. Ordinary minions and unclassified named stand-ins do not become
allied champions. The primary describes an early trigger slightly smaller than
the heal radius but supplies no exact size. Binary `castRadius:175` is not identified
as that trigger. The pinned blurb explicitly permits allied champion collision;
the model uses literal actual body contact for this early trigger. The unresolved
outer early-trigger band is omitted and not claimed exact. No ally is fabricated
in the ordinary 1v1.

## Grand Entrance: interruptible travel and a committed landing

W costs 90 mana, has a 10-second hasted cooldown and no cast time. It dashes at
1700 units/second toward a location up to 650 away, including a zero-distance
activation. The landing commits a separate ground-centered 275-radius packet
after 0.35 seconds, for 270+80% AP magic damage and one-second knockup. This area
retains its landing position if Rakan subsequently moves, and each actual body
uses its own spell shield, parry and airborne immunity.

Immobilization or polymorph knocks down the real dash. Sleep has the primary's
explicit exception. An interrupted flight does not create an invented landing
packet. A packet already committed at arrival remains real after caster death.
Projected terrain can be crossed only when the chosen endpoint is legal; an
unavailable endpoint does not become a fabricated ally-relative landing.

## Battle Dance: real allies and the two-activation chain

E requires an actual eligible allied champion-class body. Ordinary minions, wards,
turrets and a name alone do not satisfy that class. Standard center range is 700;
the actual `Xayah` body receives the source's 1000 range. Cursor forgiveness 175
selects a nearby legal target and never extends the source cast range. The ordinary
1v1 has no eligible anchor and no budgeted allied shield.

The first activation costs 60 mana and starts the 12-second hasted cooldown. It
grants that body 150+70% AP shield for three seconds before travel. Rakan's prior
E shield on the same body is replaced, while unrelated shields remain. A free
second activation opens for five seconds. The shared chain's first stage is 1,
so the real recast is stage 2; the initial implementation's unreachable stage-1
recast was corrected with a legal-ally/free-recast regression.

The pinned sources do not specify whether resurrection cancels this recast.
The model retains its existing five-second chain clock across resurrection;
this remains an unresolved boundary rather than a verified game rule.

Travel follows the actual ally at primary 1250+80% current MS. This primary value
wins over binary `BonusDashSpeed:1150`; the complete conflicting object remains
available as evidence. Death, expiry, untargetability or loss of visibility of
the anchor ends travel. The source says Rakan dashes "to and around" the ally but
does not quantify the final offset. The model reaches the actual ally center and
discloses that missing offset. Immobilization/polymorph knocks travel down while
the already granted shield remains; sleep is excluded as the primary specifies.

## The Quickness: selective lock and swept contacts

R costs 100 mana and starts a 90-second hasted cooldown. It immediately begins a
four-second ghosted sprint with 75% bonus MS. The nominal primary 0.5-second cast
is retained in the ability definition. Its source interaction table allows
movement, Q/E and a previously declared basic while W remains unavailable. The
runtime therefore uses immediate activation plus an independent 0.5-second W
deadline to preserve that selective window.

Swept collision along Rakan's actual movement path uses radius 150 plus each
recipient's radius. Each actual enemy is affected once per activation for 300+50%
AP magic damage, 1.5-second charm and 75% slow, subject to that body's defenses.
Untargetable and stasis bodies are not prematurely recorded as contacts. Ordinary
nonchampion pets can be hit and do not grant champion-only benefits.

Every actual champion collision extends the sprint by 0.25 seconds once, including
a guarded packet. The first also grants an additional 75% bonus MS, decaying to
55/35/15/0% after 0.5/1/1.5/2 seconds. These source times are quantized at the
repository's unchanged 30 Hz rate; a 0.25-second extension becomes eight ticks.

New basic declarations against untouched enemy champions are prohibited while R
is active. Actual nonchampion targets remain legal. Previously declared windups
and launched attacks remain eligible, as the source explicitly permits old attack
commands. Memory is per actual recipient and per R activation, and cloned worlds
retain independent contact sets. Death/resurrection clears the sprint and pending
heal without granting an extra passive shield.

## Behavior, spending and authored regressions

Fight uses Q/W, the real R sprint and ordinary basics; hold/trade reserve R, and a
completed trade retreats first. Flee can use a genuinely farther allied E anchor,
backward W or R speed. No allied champion, minion wave, epic monster or prefight
effect is fabricated. Reference damage prices ordinary Q/W/R cadence, and healing
prices contact-limited Q plus natural passive cycles. Allied E shielding supplies
no ordinary duel budget.

Seventy fast mechanics cases pass locally, covering exact source failure and
input immutability, shield restoration/refunds, first-body Q collision and heal
guards, real allied recipients, Q disappearance cooldown, W timing/interruption,
committed landing persistence, E range/identity/shield/chain behavior, R selective
locking, swept single contact, guards, speed decay, branch isolation and policy.
Two full 15,000-gold production cases are authored for Darius reversal and actual
Heimerdinger summons; they are intentionally deferred to the root's serial batch
validation. This page does not claim those deferred runs have passed.

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
