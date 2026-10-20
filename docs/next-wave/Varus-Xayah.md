# Varus and Xayah

These kits use level-20 champion statistics and maximum ability ranks from the committed **16.20** snapshot. Numerical reads and quoted rules go through `KitContext`; versioned game excerpts retain separate URL, object, version and SHA-256 attribution. Neither kit assumes a minion kill, preplanted feathers or an allied Rakan at fight start.

| Champion | Ability | Exact wiki revision |
| --- | --- | --- |
| Varus | Living Vengeance | [4026465](https://wiki.leagueoflegends.com/en-us/?oldid=4026465) |
| Varus | Piercing Arrow | [4026469](https://wiki.leagueoflegends.com/en-us/?oldid=4026469) |
| Varus | Blighted Quiver | [4062256](https://wiki.leagueoflegends.com/en-us/?oldid=4062256) |
| Varus | Hail of Arrows | [3969402](https://wiki.leagueoflegends.com/en-us/?oldid=3969402) |
| Varus | Chain of Corruption | [4008213](https://wiki.leagueoflegends.com/en-us/?oldid=4008213) |
| Xayah | Clean Cuts | [4070748](https://wiki.leagueoflegends.com/en-us/?oldid=4070748) |
| Xayah | Double Daggers | [4008615](https://wiki.leagueoflegends.com/en-us/?oldid=4008615) |
| Xayah | Deadly Plumage | [4062257](https://wiki.leagueoflegends.com/en-us/?oldid=4062257) |
| Xayah | Bladecaller | [4002073](https://wiki.leagueoflegends.com/en-us/?oldid=4002073) |
| Xayah | Featherstorm | [4008617](https://wiki.leagueoflegends.com/en-us/?oldid=4008617) |

All ten primary templates were checked against their exact revision IDs. Supplemental phrases for Varus Q's cooldown tooltip and Xayah Q's continuous cast-time formula come from those same exact raw templates, rather than a newer page substituted for the snapshot.

The separately pinned game version is **16.20.8248524+branch.releases-16-20.content.release**:

| File | SHA-256 |
| --- | --- |
| [Varus game objects](https://raw.communitydragon.org/16.20/game/data/characters/varus/varus.bin.json) | `9e8e5f0ea50717e1544792aefc4a7bd7247147d42a8e09e930a1eb0aac089252` |
| [Xayah game objects](https://raw.communitydragon.org/16.20/game/data/characters/xayah/xayah.bin.json) | `8954bd1d2b6884bbb8dc3ecfffff6e89ad3db423ea36f4b67204a1e3c79bb636` |

## Varus

**Living Vengeance** starts inactive. A counted nonchampion kill grants 20% bonus attack speed for 11 seconds. A champion kill instead grants 30%, raises the attack-speed cap to 3.33, and changes the conversion from 11% to 33% of total bonus attack-speed percentage into both AD and AP. Conversion updates when bonus attack speed changes. A nonchampion kill cannot refresh champion empowerment; it preserves the sourced remainder of an ordinary buff for after empowerment expires. The stat budget does not pre-award these conditional kills.

**Piercing Arrow** is a mobile, interruptible charge with a 20% self-slow. It can be explicitly released during four seconds; reaching the deadline cancels it and refunds 35 of its 70 mana. An external interrupt does not invent the timeout-only refund. Its minimum physical packet is `240 + 0.8 bonus AD`, rising to `360 + 1.2 bonus AD` at 1.25 seconds. A real piercing missile loses 15 percentage points of physical damage per prior actual contact, down to 33%. Its full Blight and empowered-W contributions do not inherit that collateral falloff. Projectile walls and the shared sidestep model remain active.

The range sources conflict. The current description and range table give 1.5 seconds for the range ramp; an older note gives 1.25 seconds. The model follows the description/table: actual travel grows from 825 to 1525 over 1.5 seconds, with the 70-radius rounded contact body. Damage reaches maximum at 1.25 seconds independently. The default policy releases at full damage if its current range reaches the rival, otherwise continues charging. Post-effect cooldown is hasted and then reduced by the actual charge duration, following the exact raw-template tooltip; the client `CDRefund = 3` value is not treated as a server-script replacement for that explicit wording.

**Blighted Quiver** adds `40 + 0.15 bonus AD + 0.25 AP` magic damage on successful basic on-hit and stores up to three independent Blight stacks on each actual target. Blind, dodge, parry and basic damage blocks deny its on-hit and stack. Stacks expire six seconds after their most recent application. Abilities consume them for `(5% + 1.3% per 100 AP) target maximum HP` per stack, amplified by up to 1.5 for Q. A spell shield blocks the accepted ability packet and consumption together.

Each champion stack consumed subtracts 13% of each hasted **total** basic-ability cooldown, multiplied by Q charge amplification. This subtracts from remaining cooldown; it does not multiply remaining cooldown by a fraction. An ordinary summon is not assumed to be an epic monster and receives no champion refund. Fractional skillshot outcomes consume and refund an expected share while preserving the remaining expected stacks.

W's active entitlement lasts 5.5 seconds. It may be cast during Q's first 0.85 seconds and while ordinary cast-inhibiting CC applies, without creating an opponent on-cast counter event. Manual cancellation requires one second; unused expiry or death also cancels to a fixed one-second cooldown. An entitled Q puts W on its full hasted 40-second cooldown when charging ends, even when that charge is cancelled. A released empowered Q adds 14% missing-HP magic damage, amplified by its Q charge, after arrow and Blight damage. The accepted packet does not invent a second spell-shield consumption between those components.

**Hail of Arrows** retains its 0.2419-second cast and fixed 0.5-second subsequent flight to the selected location. The physical landing packet is `180 + 0.9 bonus AD`. Its projectile exists at cast completion, including when Varus dies before the next tick; a wall destroys the associated landing and field. The 300-radius ground field lasts four seconds, refreshing a 50% slow with 0.25-second linger and 40% Grievous Wounds with the independently pinned 0.5-second linger. Its approximately 0.3-second second Blight check is a distinct guarded packet affecting targets still in the actual area. Normal-HP summons use actual pet contact hooks for both detonation checks, with no duplicate legacy area damage.

The pinned E template's metadata incorrectly labels damage as magic while its active text, leveling formula and game object specify physical damage. The curated flag follows the explicit description and formula and preserves a conflict note. The second Blight check remains approximate because the source itself says “~0.3”.

**Chain of Corruption** travels at 1500 with a 240-width body, deals `350 + AP` magic damage, and roots the first enemy champion for two seconds. Pets do not intercept it and no additional champions are invented for its spreading tether. The reveal is ordinary sight, without exposing invisibility. Existing Blight is detonated before new corruption stacks are added. The original accepted root applies stacks at approximately 0.65, 1.2 and 1.75 seconds. Cleanse and CC immunity deny later applications. A tenacity-shortened root gets its first stack on its final active tick; a root removed immediately gives none. The client half-second stack interval conflicts with the explicit wiki schedule, so the latter is retained. Launched missiles, actual fields and their finite checks retain post-death behavior.

## Xayah

**Clean Cuts** starts empty. Completed Q/W/E/R casts grant three stacks, capped at five, refreshing their eight-second duration. A basic attack consumes its stack at declaration. The primary remains an ordinary homing attack with real basic defenses; the feather then continues on the current axis at 4000 speed, dealing 55% AD to actual secondary targets and inheriting the triggering attack's critical factor once. It does not apply the primary's attack on-hits twice. The impact-time position defines its 1000-unit landing endpoint; a primary beyond that distance drops the feather at its location. Projectile walls prevent planting.

Each ground feather has an independent six-second lifetime. Death destroys ground feathers, and later outward projectile landings cannot plant while Xayah is dead. A previously launched recall can still finish. Companion recalls, Rakan's allied W effect, items, structures and wards are outside this single-champion duel.

**Double Daggers** uses the exact raw formula `max(0.1, 0.25 − 0.07 × bonus AS)` before normal 30 Hz rounding. The two daggers independently deal `105 + 0.5 bonus AD`, falling to 50% after their first actual enemy contact. Spell shields block one dagger rather than the pair. The root game object's two `Missile*DelaySpeed` values supply 3500 speed; separate 400-speed missile objects are inconsistent and are not silently substituted. Relative launch spacing is 0.25 seconds from the difference between the pinned animation-delay values; first launch occurs at cast completion. Unknown lateral launch offsets and the unsized formation-area hit are not invented. The separate wiki attack-lockout note is not conflated with the sourced cast-time formula.

**Deadly Plumage** grants 55% attack speed for four seconds. A successful empowered attack produces a separate 3000-speed physical strike worth 25% of the triggering basic's raw critical-weighted damage. It applies basic-damage defenses and life steal, without another critical roll or another application of attack on-hits. A qualifying champion hit grants 30% movement speed for 1.5 seconds; pet hits do not. Casting W during an already launched basic gives that basic an entitlement retained through buff expiry, but no new movement-speed proc, matching the pinned interaction note.

The supplemental missile is launched from Xayah when the primary connects. Exact script launch geometry is not supplied by the available text, so this is an explicit approximation. The wiki marks dodge/block interactions unresolved; the implementation conservatively denies the supplemental strike when the primary is blinded, dodged, parried or damage-blocked. A launched Clean Cuts feather can continue after primary damage is denied; the source does not fully settle every defense interaction of that continuation.

**Bladecaller** requires at least one actual unexpired ground feather, costs 20 mana and uses its pinned 0.25-second return delay. Every recalled feather travels at 4000 toward Xayah's current position. Feathers already in flight when E is declared are tagged and return only after landing; they do not receive an extra full delay after that landing. Feathers subsequently launched are excluded. A vertical-only return keeps its delay, actual segment contacts and common projectile-wall checks.

Each feather begins with `110 + 0.4 bonus AD` physical damage, multiplied by the exact game calculation `1 + 0.5 × crit chance × (crit damage − 1)`. Target-specific, cast-specific accepted-hit falloff is 100/95/90…down to 10%. The third accepted feather roots for 1.25 seconds, with ordinary CC immunity and tenacity. A spell shield independently blocks one feather; the source does not fully establish its contribution to the three-feather counter, so that blocked feather is conservatively excluded from accepted hits.

The additional 50% minion multiplier applies only to pets explicitly classified as **Minion** by their pinned pet records. This includes actual Tibbers and turret/plant/walker records as classified by the shared compiler. Champion clones such as Illaoi's Spirit receive full champion damage. Unknown custom summons do not inherit a guessed minion classification; existing pet-specific area damage reductions still compose independently. Hit-count props retain their existing spell exclusions.

**Featherstorm** supplies a mobile 1.5-second untargetable, ghosted phase that prevents basic attacks and other casts. It fires after one second. The wiki explicitly says 1.5 seconds while the pinned client `RUntargetable` value says 1.25; this conflict is resolved in favor of the explicit wiki duration. Five feathers use 4000 speed and their separate sourced 20-radius projectile bodies. One target receives at most one `400 + bonus AD` R packet, including when several fan projectiles geometrically touch it.

The five fan positions are equally spaced across the sourced 30-degree cone, an explicit geometry approximation. The model retains their transverse coordinates for actual two-dimensional segment/circle contact on outward and recall paths, rather than granting five guaranteed R or E hits on the duel axis. Champions still move along the duel axis and use the common sidestep model. Effective outward length is 1000; the source's 1060/1000 reach distinction and unsized rear launch offset remain limits. E fan contacts use expected sidestep shares rather than enumerating every correlated combination of feathers and roots.

## Budgets and focused verification

The Varus reference budget values ordinary W on-hits, a finite full-charge Q cycle, attack/R-supplied Blight and its active W only on its own cooldown. It pre-awards neither the kill passive nor repeated free cooldown-refund loops. Xayah's budget values capped W attack-speed uptime, its supplemental strike, two Q packets, a finite supply of actual Clean Cuts feathers and the real diminishing E damage sum. It does not preplant feathers or award all five fan feathers as guaranteed E collateral.

Focused tests cover source pins, exact formulas, timers, charge cancellation, stack expiry, original and second Blight consumption on real pets, cooldown subtraction, spell shields and basic defenses, projectile walls, explicit minion/champion/unknown pet classes, fan geometry, vertical returns, in-flight entitlements, death and post-death trade kills, ordinary behavior, finite budgets, branch isolation and side reflection at the unchanged `1e-10` tolerance. Batch-wide matrix, full-suite and browser results are recorded separately by the delivery audit.
