# Jarvan IV implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves complete raw templates and exact binary excerpts.

## Exact sources

- [Demacian Standard, revision 4013709](https://wiki.leagueoflegends.com/en-us/Template:Data_Jarvan_IV/Demacian_Standard?oldid=4013709).
- [Martial Cadence, revision 4003791](https://wiki.leagueoflegends.com/en-us/Template:Data_Jarvan_IV/Martial_Cadence?oldid=4003791).
- [Dragon Strike, revision 4042687](https://wiki.leagueoflegends.com/en-us/Template:Data_Jarvan_IV/Dragon_Strike?oldid=4042687).
- [Cataclysm, revision 4017869](https://wiki.leagueoflegends.com/en-us/Template:Data_Jarvan_IV/Cataclysm?oldid=4017869).
- [Golden Aegis, revision 3906940](https://wiki.leagueoflegends.com/en-us/Template:Data_Jarvan_IV/Golden_Aegis?oldid=3906940).

Supplementary game evidence is the [exact 16.20 Jarvan IV binary](https://raw.communitydragon.org/16.20/game/data/characters/jarvaniv/jarvaniv.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `824a62dd0e1fe6e67e9ac1c7d4dfa4e256c4485f02315347270a68b67f3ae845`. The records retain **11 attributed game objects** and **22 exact excerpts**, including complete arrays. Full pinned inputs and the strict exact-value audit are preserved outside source under `/workspace/counter-next-wave/batch10-audit`.

## Runtime behavior

Martial Cadence snapshots the actual recipient's health before ordinary basic damage, then applies its separate physical packet only if that body survives. Each actual target owns its static readiness clock. Champion-class summons and explicit clones count as champion bodies; other pets receive the nonchampion cap. Basic avoidance retains readiness, and the packet uses the pet's current statuses rather than lending it the owner's defenses.

Dragon Strike resolves its damage from the completion position before applying armor reduction. Its fixed aimed direction and source geometry detect the furthest actual own flag, then pull at the exact binary EDashSpeed of 1400. Root/ground do not deny the sourced pull; actual anti-dash control can stop it. Each actual crossed body receives one independently guarded knockup attempt. W and E can overlay the real dash.

Demacian Standard creates an actual untargetable Minion-class flag for eight seconds. No flag exists before the cast. Its persistent attack-speed aura is independent of E's permanent passive and does not stack across flags. The impact tests actual bodies at their own positions; ordinary flag sight grants standard sight only. Flags are removed on owner death by their ordinary lifecycle.

Golden Aegis applies independently guarded slows, then counts accepted actual champion-class and clone contacts for shield amplification. It does not assume another champion or an imaginary body. Cataclysm can target an actual visible champion-class summon and retains that target ID throughout its protected leap. Target removal leaves the last real destination and never retargets the owner. Landing damage has its own guards, while the terrain can still appear when a spell shield blocks damage. Death during the leap prevents terrain and damage and starts the full cooldown.

The ring is represented by two real impassable intervals. Actual champions on its perimeter are displaced inward or outward over the sourced 0.15 seconds. Manual dismissal becomes an actual recast after the source gate; expiry is automatic. Cooldown begins after the effect ends. Behavior reserves ready R in hold/trade, can dismiss a ring for escape, and honors completed trade retreat before offense.

## Explicit limits and source conflicts

Primary Q's 0.4-second cast, 65–785 lance length and 0–850 flag detection take precedence over unlabeled binary targeting metadata. The exact 1400 dash speed comes from the full `EDashSpeed` array. Q's champion damage uses the existing scalar skillshot estimate from that telegraph; pet occupancy and dash contacts remain geometric.

E's primary supplies no landing delay. Its immediate impact is an explicit fallback; cosmetic missile speed and generic cast metadata do not establish a scripted travel time. Cataclysm's published 350 terrain radius approximates the additional damage footprint because neither retained source identifies a server damage radius. Conflicting binary radii remain evidence.

The circular ring and its 24 source wall units are projected onto one dimension. Segment-level destruction and lateral escape paths are unavailable. Pet perimeter contacts receive their own guarded airborne status; the shared pet engine does not have continuous forced-displacement actions, so those pets are not falsely moved. Ordinary allied champion aura effects have no fabricated recipients in this two-champion duel. No lane wave, ward, preduel flag or preduel ring is supplied.

## Validation

`tests/kits/jarvaniv.test.ts` passes **68 focused tests** in the combined review report `/workspace/counter-browser/batch10-front-review-initial.json` (**192 passed, zero failed**). Coverage includes full 15,000-gold production searches in all six scenarios, exact reversed builds and unchanged `1e-10` aggregate/scenario bounds; actual pet contacts and defenses; resource and cooldown windows; movement and terrain; source attribution; and ready-R hold/trade and completed-retreat behavior. Hecarim and Lee Sin also run all six scenarios against Heimerdinger's actual pets. Final batch-wide source freeze, complete matrix, serial suite, browser and private package validation remain separate root release checks.
