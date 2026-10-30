# Maokai implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Bramble Smash, revision 4046583](https://wiki.leagueoflegends.com/en-us/Template:Data_Maokai/Bramble_Smash?oldid=4046583).
- [Nature's Grasp, revision 3681487](https://wiki.leagueoflegends.com/en-us/Template:Data_Maokai/Nature%27s_Grasp?oldid=3681487).
- [Sap Magic, revision 4038409](https://wiki.leagueoflegends.com/en-us/Template:Data_Maokai/Sap_Magic?oldid=4038409).
- [Sapling Toss, revision 4007687](https://wiki.leagueoflegends.com/en-us/Template:Data_Maokai/Sapling_Toss?oldid=4007687).
- [Twisted Advance, revision 3946300](https://wiki.leagueoflegends.com/en-us/Template:Data_Maokai/Twisted_Advance?oldid=3946300).
- [Maokai Sapling pet article, revision 4067454](https://wiki.leagueoflegends.com/en-us/Maokai?oldid=4067454#Pets).

Supplementary game evidence is the [exact 16.20 Maokai binary](https://raw.communitydragon.org/16.20/game/data/characters/maokai/maokai.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `c4ccffe1b0de1c846d5eb8b66ecd00f5dd4522410adea5d39f6329a6bff58229`. The retained strict source audit verifies **22 attributed game objects** and **728 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Sap Magic begins ready. Readiness is captured when the real basic windup starts, with its source attack-speed-scaled delay; it cannot become armed retrospectively during that windup. An eligible connected attack can heal through an attack block, but dodge and blindness prevent it. It does not trigger above 95% maximum health or against unsupported ward/structure bodies. Real casts, qualifying spell contacts and consumed spell shields reduce the independent static cooldown. The level-20 source series supplies 14.1% maximum-health healing and the corresponding static cooldown without preduel cycles.

Bramble Smash shares one damage entitlement per actual body across its nearby circle and finite traveling shockwave. Nearby control acts in every direction, independently of whether a later projectile is destroyed. Its monster bonus and nonchampion target-health cap use the actual recipient class. Displacement immunity denies both the nearby stun and push while preserving damage. A separate source lock follows cast completion.

Twisted Advance makes Maokai untargetable while tracking the actual target at the primary estimated 1300 speed. A relocation beyond the primary estimated 2000-unit limit releases the chase toward the previous position without damage/root. Arrival rechecks targetability and defenses. Knockdown, forced interruption, death and resurrection clear the movement's own untargetability.

Sapling Toss begins with no saplings. A finite projectile flies for the exact binary travel time, then creates a real untargetable, invulnerable minion pet which arms after the sourced growth delay. Ordinary projectile destruction creates no pet. Unbreakable instead resolves the sourced collision by landing the actual sapling at the interception coordinate. Saplings acquire real nearby visible enemies, chase on their own clock even after losing sight, and explode at actual collision or expiry coordinates. Their damage and slow use each recipient's class, area resistance and individual defenses.

Brush empowerment belongs to the landing environment. Against non-minions, one impact and two attached packets apply the exact raw primary two-thirds formula, producing double normal total damage. Minions take their separate normal impact. The two target-local attached slots share refreshed expiry without discarding pending ticks; an already-exploded slot can be refilled. Nonchampion caps apply before area resistance. Attached packets retain the explosion's stat snapshot and persist through untargetability, while ordinary death/resurrection clears the debuff. Slow and reveal follow their independent source durations.

Nature's Grasp models the central branch with its four missiles, separated by the sourced 100 units and accelerating continuously to the source maximum speed. The branch damages each actual body once. Its first actual champion-class collision ends the branch's remaining missiles even when damage/control is spell-shielded or parried. Other projectile-destruction effects remove only the particular intercepted missile, preserving the source's invisible-trailer counterplay. Root duration uses actual missile travel distance; accepted champion contact grants the decaying two-second movement benefit. Released missiles persist after owner death, while interrupted casts create no unreleased missiles.

## Explicit limits and source conflicts

Primary Q 600 range and maximum 300 push override binary 650/400. The primary says push depends on proximity but gives no curve: the model explicitly uses a linear 300-to-zero approximation over the 325 center-radius, with independent champion/pet displacement at binary 950 speed. The approximation is not an exact recovered server formula.

Twisted Advance's primary instant cast overrides binary 0.25-second metadata. Its speed and 2000 tracking boundary are primary estimates.

Primary sapling detection 250 and empowered duration 1.5 seconds override binary 550 and two seconds. The raw template's exact two-thirds expression resolves the rounded parsed 66.7% display without changing that parsed field. The separate pet article confirms double total damage over 1.5 seconds.

The arena's single brush flag applies to every legal landing in that abstract lane; individual bush coordinates and independent sight circles are unavailable. No sapling HP or collision radius is supplied, so the invulnerable pet has a point body and bookkeeping HP only. A same-point placement moves one detection radius toward its owner, an explicit spacing approximation because the source gives no exact offset. Owner death keeps ordinary pet cleanup; no unsupported persistence exception is invented. Large and epic monsters cannot be distinguished by the generic monster class, so their special passive refunds are omitted rather than granted to every monster.

The four lateral R branches are unavailable because exact offsets are not sourced. They are not superimposed into five hits on the duel axis. No lane wave, ally champion or preduel sapling is created.

## Validation coverage

`tests/kits/maokai.test.ts` covers all five templates and the pet pin, source-preserving compilation, attack-declaration passive readiness, real pet targets, circle/wave deduplication, independent control guards, tracking and interruption, sapling flight/arming/chase/brush behavior, attached slot refreshes and caps, central-branch trailer lifecycle, modes and cloning. Production cases run full 15,000-gold six-scenario searches with exact reversed builds, strict score bounds and actual Heimerdinger pets. Shared regressions protect pet area-damage classification through replacement contact packets. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
