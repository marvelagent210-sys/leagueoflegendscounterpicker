# Braum implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Concussive Blows, revision 4038222](https://wiki.leagueoflegends.com/en-us/Template:Data_Braum/Concussive_Blows?oldid=4038222).
- [Glacial Fissure, revision 4007580](https://wiki.leagueoflegends.com/en-us/Template:Data_Braum/Glacial_Fissure?oldid=4007580).
- [Stand Behind Me, revision 3906582](https://wiki.leagueoflegends.com/en-us/Template:Data_Braum/Stand_Behind_Me?oldid=3906582).
- [Unbreakable, revision 4012056](https://wiki.leagueoflegends.com/en-us/Template:Data_Braum/Unbreakable?oldid=4012056).
- [Winter's Bite, revision 4007579](https://wiki.leagueoflegends.com/en-us/Template:Data_Braum/Winter%27s_Bite?oldid=4007579).

Supplementary game evidence is the [exact 16.20 Braum binary](https://raw.communitydragon.org/16.20/game/data/characters/braum/braum.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `021c833daa1083bad73c9be385ccbb98c8c89498a15d8a6fc7511ff6b58bc0e6`. The retained strict source audit verifies **7 attributed game objects** and **7 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Concussive Blows starts empty on each actual enemy body. Braum's accepted basics and Winter's Bite contacts build a four-second recipient-local mark; the fourth contact consumes it for source-scaled magic damage and stun. Each target then has its own immunity window, during which only Braum's basics gain the sourced 40% bonus packets. Spell shields and parry guard the proc independently of ordinary attack damage. Hit-count and fixed-damage props do not receive fabricated health-based passive procs.

Winter's Bite is a finite first-body 1050-range, 1700-speed projectile with 120 full width. It applies the own-maximum-health damage ratio, a 70% linearly decaying two-second slow, and the passive mark to its actual accepted recipient. Real pets use their own defenses and marks.

Stand Behind Me has a valid self-cast that grants the sourced three-second resistances. Explicit aim can select an actual eligible allied minion or champion within 650 units and grant its separate ally resistance formula. The 150-unit landing offset uses the nearest actual visible enemy champion in the sourced search radius, or the far side of the ally when none is available. An obstructed terrain endpoint rejects that relocation's benefit. Repeated own buffs replace the keyed contribution, excluding the previous contribution from the new scaling snapshot.

Unbreakable fixes facing from the cast aim, grants four seconds of movement speed and ghosting, and starts its hasted cooldown afterward. The first frontal champion or explicitly champion-class clone non-true packet is fully negated before ordinary shields and vamp, including further eligible same-tick packets. Later frontal packets receive the sourced 55% reduction. True damage neither reduces nor spends the first guard. Spell shields can spend that first guard on an eligible frontal damaging packet. Frontal checks use the actual attack, projectile or ground-effect origin.

An intercepted projectile resolves its actual collision payload before the original flight ends. This preserves damage-independent control and actual landing objects; it does not turn Unbreakable into a payload-erasing projectile wall. Earlier destroying walls keep priority, rear-entry/departing segments do not gain a frontal interception, and custom two-dimensional movers must prove their real contact. Released projectiles cannot fabricate a return flight after destruction.

Glacial Fissure checks its completion-position point-blank area and sends a finite piercing missile, sharing one damage/knockup per actual recipient across both. Each newly swept ice segment lasts four seconds and refreshes the slow every quarter second, expiring in creation order. Projectile destruction stops later travel while already laid ice remains. Released missile and ice can persist after death. Hold and trade reserve an available R, and completed trades retreat before optional casts.

## Explicit limits and source conflicts

The actual Q missile and primary 1700 speed/120 width take precedence over the generic Q wrapper's 1100/70 metadata. The unchanged primary own-health ratio is reconstructed during compilation.

Neither primary nor binary supplies Stand Behind Me's complete dash-speed formula. Its retained `BonusDashSpeed` and generic missile speed do not establish that formula, so allied travel uses an explicitly immediate guarded relocation with no invented finite interruption window.

Glacial Fissure's primary bounds first-target knockup between 0.6 seconds and a sourced maximum; binary `MaxKnockupRatio` 0.9 does not supply the missing distance curve. The current implementation conservatively uses the sourced **0.6-second floor**. The unsized endpoint rectangle and lateral ice width do not add invented axial reach.

Allied champion attacks adding passive stacks are an explicit unsupported boundary; no ally or clone is fabricated and no arbitrary damage observation is treated as an allied basic. The one-dimensional arena also lacks turrets and lateral barrier geometry. These limits affect confidence in matchups involving those mechanics.

## Validation coverage

`tests/kits/braum.test.ts` covers exact evidence, target-local passive contacts and guards, actual pets, slow decay, self/ally W eligibility, directional E damage and interception, point-blank/piercing R, independent ice expiry, death/resurrection, modes and reflection. Production cases run all six scenarios with full 15,000-gold builds, strict reversed scores and actual Heimerdinger pets. Shared and custom projectile regressions cover real collision payloads and destruction lifecycle. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
