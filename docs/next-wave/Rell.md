# Rell: source audit and implementation boundary

This audit describes the authored level-20 kit for dataset 16.20 (patch 26.20).
It records sources and model choices; it does not claim that the expansion's final
matrix, browser, full suite or private package has passed validation.

## Exact primary inputs

Both Ferromancy forms are independent records. The implementation selects them by
full name, avoiding ambiguous `W` selection and preserving their original fields,
parts, leveling, notes and revision identities.

| Ability | Exact revision |
|---|---|
| [Break the Mold](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Break_the_Mold?oldid=4050368) |4050368|
| [Shattering Strike](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Shattering_Strike?oldid=4008008) |4008008|
| [Ferromancy: Crash Down](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Ferromancy:_Crash_Down?oldid=4007762) |4007762|
| [Ferromancy: Mount Up](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Ferromancy:_Mount_Up?oldid=3976244) |3976244|
| [Full Tilt](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Full_Tilt?oldid=4008009) |4008009|
| [Magnet Storm](https://wiki.leagueoflegends.com/en-us/Template:Data_Rell/Magnet_Storm?oldid=4008010) |4008010|

The full raw pinned templates remain in each record's supplemental primary source.
Numeric reads and quoted restrictions go through `KitContext` while the kit builds;
combat hooks never reopen source data or mutate its parsed formulas.

The exact [CommunityDragon Rell binary](https://raw.communitydragon.org/16.20/game/data/characters/rell/rell.bin.json)
is version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256
`3c0e33f17ac0b58b88558a3f39ed98e598f746319718a396553deec399a66baa`.
Seven independently attributed complete object excerpts are retained, including full
arrays and nested calculation records:

- `Characters/Rell/Spells/RellPAbility/RellP`;
- `Characters/Rell/Spells/RellQAbility/RellQ`;
- `Characters/Rell/Spells/RellW_DismountAbility/RellW_Dismount`;
- `Characters/Rell/Spells/RellW_DismountAbility/RellW_MountUp`;
- `Characters/Rell/Spells/RellW_DismountAbility/RellWEmpoweredAttack`;
- `Characters/Rell/Spells/RellEAbility/RellE`;
- `Characters/Rell/Spells/RellRAbility/RellR`.

Generic tooltip ranges and unused mode overrides are retained as evidence, rather
than substituted for the primary hitbox or standard-mode mechanics.

## Passive: actual snapshots and stolen totals

Rell starts mounted with no stacks or stolen resistance. Each accepted own basic
or spell contact on a real non-minion body adds a stack for 5 seconds, refreshing
that target's shared expiry and capping at 5. The first stack snapshots current
armor and MR, including reductions already affecting the target. Later stacks use
the same snapshot even if a resistance buff begins or expires in between.

Each stack takes 3% of the first snapshot, with the primary's explicit level-20
minimum 3.17647058823529 for each resistance. This explicit level-20 series wins
over the binary interpolation's 1.5–3 endpoints. Target debuffs are flat resistance
reductions; Rell gains their actual sum across afflicted living bodies. Expiry and
actual body death remove that body's contribution, and later contact after expiry
makes a new snapshot. Minions and hit-count/fixed-damage props provide no invented
resistance. Real monsters and explicitly classified champion bodies retain their
own identity and status lists.

Ordinary basic on-hit magic equals 5% of current armor plus 5% of current MR. It is a
separate noncritical proc with normal attack avoidance and no life steal. The basic
contact adds its own new passive stack after that on-hit resolves; a separately
resolved earlier spell packet can already have changed Rell's stats. No full-stack
passive or target resistance theft is granted before combat for reference spending.

## Q: guarded shield removal and a separate lunge

At maximum rank Q costs 50 mana, casts for 0.4 seconds, deals 220+60% AP and stuns for
0.65 seconds. The axial rectangle reaches 520 forward and 220 backward from the
cast-completion position. The primary 150 width is retained; the binary 80 indicator
width is not substituted. Every contacted actual body resolves independently.

Accepted non-monster contacts lose their actual damage shields before damage and
stun. Monster shields remain. Spell shield and parry guard shield destruction and
debuffs. The repository's retained Riposte ordering still lets shield absorption
precede late parry damage negation; preserving a shield against destruction does
not promise that the damage packet cannot reduce it normally.

The source's 100-unit lunge has no finite speed. It therefore uses an explicit
immediate terrain-clipped displacement of Rell at cast completion. Immobilization,
grounding or silence at declaration or during the cast suppresses this movement
without erasing the committed hit or subsequent 0.35-second action lock. Blind and
slow do not suppress it. The source rectangle is evaluated before that projection;
no guessed finite flight or lateral collision surface is added.

## W: real form transitions and concurrent clocks

Crash Down costs 40 mana and shares a 10-second hasted W cooldown with Mount Up.
Its declaration changes Rell to dismounted form and grants 100+11% maximum-health
shield. The shield has no invented short lifetime: it ends when broken or when an
actual Mount Up removes it. Mounted Rell has 40 flat bonus MS; dismounted Rell gains
15% total armor/MR,20% bonus AS and 75 range.

The initial location leap is clamped to the primary 100–400 distance and runs
concurrently with its 0.625-second cast. It can cross intervening terrain only
with a clear endpoint. Arrival hits within 180 center radius. The following slide
uses the primary 320 distance over the explicitly estimated 0.5 seconds, with swept
200 collision radius,180+60% AP,0.8 stun and independent 0.4 airborne. Each actual body
can be contacted only once across arrival and slide, including guarded collisions.
Terrain shortens the slide's distance over the same clock. The primary also reports
250–350 in testing without a reproducible curve; this model retains nominal 320 and
discloses the unresolved discrepancy.

The primary's knockdown flag is honored for the dash; an interrupted leap cannot
create arrival or slide damage. Its independently committed cast can still finish
paying cost/cooldown. This distinguishes the dash interruption from the execution
table's death-only cast interruption. Death/resurrection cancels unreleased motion;
resurrection restores mounted form and resets W. The simulator has no Recall action.

Mount Up removes the remaining W shield, resets the real attack timer and grants
30% MS decaying linearly over 2 seconds. Its 3.5-second empowerment grants a real basic
with 0.2-second windup,100 extra range and 40% bonus AS. Target loss, death,
untargetability, invisibility or range loss during the windup do not consume the
unlaunched entitlement.

Charge speed is unsourced in both retained inputs. Valid launch therefore uses an
explicit immediate terrain-clipped projection toward the actual target. Root and
ground preserve the empowered attack without relocating Rell. Its separately
guarded 70+40% AP,0.6 stun and 150-unit fling over Rell over 0.4 seconds preserve the real
target and terrain. Displacement immunity can deny the fling while the stun remains
eligible. There is no invented finite charge interruption window to simulate.

## E: self cast, actual ally, one explosion

Full Tilt costs 40 mana and has 10-second cooldown. It works on Rell herself without
inventing an ally. Automatic ally selection uses the nearest real eligible allied
champion-class body within 1200; explicit aim may select another eligible body.
Minions, unclassified pets and arbitrary stand-ins do not become allied champions.

The 3-second MS buff is 15%, rising to 30% when facing the empowered ally within the
source's estimated 2200 detection range or a visible enemy champion within its
estimated 1600 range. Detection scans actual living enemy champions and explicitly
Champion-class pet/clone bodies, preserving their own positions and visibility.
Clone identity alone and unclassified or minion bodies do not qualify. Visible
untargetable champions can still be detected: the primary specifies visibility,
rather than targetability, for this movement buff. Rell uses actual facing.
A real allied pet actor has no native facing field: only observed signed movement establishes its facing for this buff;
unknown stationary facing receives 15% and never borrows the owner's direction.

Within 5 seconds, the next accepted basic or physical Q contact causes one 300-radius
explosion. At maximum rank its magic damage is 7% target maximum HP plus 3% per 100 AP,
with the source level-20 cap 317.647058823529 applied only to monsters. Every body's
defenses and maximum HP are independent. Q chooses the earliest-created actual
contact body when several qualify: the duel champion exists before later spawned
pets. Real game draft Spawn IDs are unavailable and this ordering assumption is
explicit. A miss does not create an explosion or consume its entitlement.

## R: independent overlay deadline and nondisabling kinematics

Magnet Storm costs 100 mana, starts its 80-second hasted cooldown at declaration and
has a 0.25-second cast. Outside W it uses the ordinary cast path. During the actual
W leap/slide, `castTimeFor` permits the overlay declaration and a separate sourced
0.25-second deadline delivers R without postponing or replacing W's own cast.
The nominal `castTime` remains 0.25. Both E/R overlay orders preserve W's clocks,
and death cancels an undelivered deadline.

Initial pull checks 450 center radius and pulls toward the 225 ring with a minimum
100 distance. Its duration is unquantified, so the implementation uses guarded
immediate terrain-clipped movement, with spell shield/parry and actual body
immunity. The primary 450 radius wins over binary 425. Established field damage is
not blocked by a later spell shield. Eight pulses occur at 0.25 through 2 seconds,
43.75+13.75% AP each, totaling 350+110% AP before mitigation. This overrides the
binary's 550+110% AP total. The actual passive can change mitigation between pulses;
350 raw damage does not imply 350 health loss.

Continuous attraction applies outside 225 and within 375 center-to-edge radius at
300 units/second. It preserves attacks, channels and voluntary movement. Dashing,
attached, already forcibly moving, CC-immune and displacement-immune bodies are
excluded. Terrain clips the actual signed movement; actual pet positions and
statuses synchronize with their own views, never their owner's position. Initial
spell shielding does not prevent later dragging. No arbitrary airborne duration
or repeated hard interruption is added to this kinematic effect.

## Behavior, spending and regression scope

Fight behavior uses real E, Q, form transitions and basics with an available R in
range. Hold/trade reserve R, flee can use E or mount, and completed trade retreat
precedes optional casts. Reference damage uses source Q, alternating shared-W
forms, one E entitlement per real cooldown and source R. A nominal alternating-form
cycle prices form resistances; it grants no live combat stats before a transition.

Authored regressions cover source failure, both independent W pins, snapshot
refresh/expiry and actual pet theft, guards, typed shield removal, monster
exceptions, Q rectangle/lunge/control, E self/ally/explosion rules, W concurrent
cast and slide, terrain, mount entitlement and root/ground, R pulse count/raw total,
spell shields, nondisabling dragging, excluded movement states, overlay ordering,
knockdown, death, resurrection, clone independence and ordinary modes. Two separate
production cases retain the full 15000-gold allocation, Darius reverse-build and
six-scenario reflection, and actual Heimerdinger pets. Final expansion validation
and release evidence belong in the shared release report after those checks run.
