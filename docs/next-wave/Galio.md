# Galio implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Colossal Smash, revision 4038336](https://wiki.leagueoflegends.com/en-us/Template:Data_Galio/Colossal_Smash?oldid=4038336).
- [Hero's Entrance, revision 4017997](https://wiki.leagueoflegends.com/en-us/Template:Data_Galio/Hero%27s_Entrance?oldid=4017997).
- [Justice Punch, revision 4016963](https://wiki.leagueoflegends.com/en-us/Template:Data_Galio/Justice_Punch?oldid=4016963).
- [Shield of Durand, revision 3990299](https://wiki.leagueoflegends.com/en-us/Template:Data_Galio/Shield_of_Durand?oldid=3990299).
- [Winds of War, revision 4016962](https://wiki.leagueoflegends.com/en-us/Template:Data_Galio/Winds_of_War?oldid=4016962).

Supplementary game evidence is the [exact 16.20 Galio binary](https://raw.communitydragon.org/16.20/game/data/characters/galio/galio.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `2f6af50833ece8ab8541363464cc288a55f40d36c169a70fcaa790056a80f508`. The retained strict source audit verifies **10 attributed game objects** and **10 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Colossal Smash begins ready with its sourced attack-speed bonus and independent static clock. The empowered primary replaces ordinary AD damage with basic magic damage; only its AD component receives the pinned critical modifier. Ordinary on-hits apply twice, while Spellblade remains its own physical packet. A separate cleave checks real secondary bodies around the accepted recipient. Only actual champion-class ability contacts reduce the passive cooldown, at most once per cast, including contacts consumed by a spell shield. Wards and plants do not consume the entitlement.

Winds of War uses both exact binary Hermite splines at the sourced 1400 arc-length speed. Each path retains its lateral offsets and collision radius against bodies on the duel axis. A cast shares one gust hit per recipient, while each gust can be independently destroyed. Custom interception requires actual two-dimensional segment contact and keeps the earliest contact in traveled order. Both gusts must reach the real aimed endpoint for a tornado to form; a destroyed flight does not count as an arrival. The tornado moves at the primary's estimated 50 speed and applies four half-second persistent maximum-health packets over two seconds. Its damage ignores spell shields, uses the moving tornado center as its origin and applies the primary cap only to explicitly monster-class pets. Released gusts and tornados persist through death.

Shield of Durand begins with its sourced magic-only shield. Eight seconds without incoming damage, including shield-absorbed damage, restores a full shield. Charging snapshots physical and magic reductions, caps them at 100%, applies the source self-slow, and prohibits attacks. Recast or silence releases the current charge through nine sourced steps up to 1.25 seconds, refreshes reductions for two seconds and applies the 0.4-second release lock. Only real enemy champions receive the taunt/damage. The static movement override belongs to an accepted taunt and respects slow immunity.

Justice Punch retains the 0.4-second backward-step cast window, then performs an interruptible 2300-speed forward dash with the full primary 250–650 aimed range. Its swept collision damages each actual body once, applies the source knockup and standard sight, and stops at the first actual champion-class pathing body or terrain even when spell shields deny effects. Nonchampion damage uses its primary reduction. Anti-dash and displacement use the shared interruption rules.

Hero's Entrance requires an actual living, visible friendly champion-class body. Ordinary one-versus-one fights provide none; the implementation creates no ally and assigns no ordinary R damage or shield budget. A conditional valid cast freezes the ally's position, restores Galio's W shield and grants real nearby allied champions the magic shield. The channel is vulnerable during its first 1.25 seconds, then becomes untargetable and control immune. Landing damage/control originates at the frozen destination, even if terrain clips Galio's movement. The actual conditional timing and impact rules remain available to explicit allied-body fixtures.

## Explicit limits and source conflicts

Primary Q tornado speed 50, monster cap 150 and radius take precedence over conflicting binary 60/50/225 metadata. The two splines are sampled 128 times, so curved movement and entry points are numerical approximations at the simulator's 30 Hz time resolution.

Shield of Durand's primary physical reduction gains 1.5% per 100 AP; the differing binary coefficient remains evidence. The primary's unpublished brief delay before the taunt movement override and slightly longer override duration are omitted rather than assigned guessed timings.

Justice Punch's parsed numeric range had lost the upper 650 endpoint. The retained full raw template and exact complete display array supply it during compilation without modifying parsed fields. Neither source supplies backward displacement or speed; the model retains the cast window but omits that displacement and backward-step contacts.

Hero's Entrance's published channel, air and travel timings leave a 0.5-second landing lock. Actual allied champions and team vision beyond explicitly represented bodies are unavailable. Clone names or clone class alone do not establish sourced champion eligibility. Lateral dodging and independent vision circles remain outside the duel arena.

## Validation coverage

`tests/kits/galio.test.ts` covers source integrity, passive critical/on-hit separation, real pet identity, curved gust travel and independent destruction, tornado packets and ground origins, magic shield restoration, charge/release interruptions, swept E collision, conditional real-ally R and ordinary modes. Production cases use full 15,000-gold builds in all six scenarios, strict reflection and actual Heimerdinger pets. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
