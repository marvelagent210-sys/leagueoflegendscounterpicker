# Alistar implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves full raw templates and exact object-scoped binary excerpts. Runtime packets use compiled values rather than reading source files during fights.

## Exact sources

- [Headbutt, revision 4075174](https://wiki.leagueoflegends.com/en-us/Template:Data_Alistar/Headbutt?oldid=4075174).
- [Pulverize, revision 4075173](https://wiki.leagueoflegends.com/en-us/Template:Data_Alistar/Pulverize?oldid=4075173).
- [Trample, revision 4075181](https://wiki.leagueoflegends.com/en-us/Template:Data_Alistar/Trample?oldid=4075181).
- [Triumphant Roar, revision 4007561](https://wiki.leagueoflegends.com/en-us/Template:Data_Alistar/Triumphant_Roar?oldid=4007561).
- [Unbreakable Will, revision 4075182](https://wiki.leagueoflegends.com/en-us/Template:Data_Alistar/Unbreakable_Will?oldid=4075182).

Supplementary game evidence is the [exact 16.20 Alistar binary](https://raw.communitydragon.org/16.20/game/data/characters/alistar/alistar.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `dc95c7a923147d8b3eceb0f00755ee24e085611f231a4d3222d463c30d2e1f0a`. The retained strict source audit verifies **5 attributed game objects** and **5 exact excerpts**, including complete arrays. Full pinned inputs and read-only integrity reports are preserved outside source under `/workspace/counter-next-wave/batch11-audit`.

## Runtime behavior

Triumphant Roar starts empty. Accepted ability stuns or displacement against actual champion bodies grant one stack per cast and recipient, so Pulverize's simultaneous stun and airborne do not count twice. Qualifying nearby combat deaths grant their sourced stack amounts; pet expiry, replacement and despawn do not masquerade as deaths. At seven stacks, the independent three-second clock allows simultaneous healing for Alistar and any actual eligible allies. Death clears the stored stacks. No minion wave or allied champion is created.

Pulverize evaluates occupancy at cast completion. Its one-second stun and airborne have separate shared control handling, with the source-specific displacement-immunity exception also suppressing its stun. Headbutt uses the documented inverse-radius dash speed, the declaration target position and the 400-unit arrival check. Its knockback direction uses the original cast position and the recipient's arrival position. The 700-unit push over 0.5 seconds and independent 0.75-second stun retain each actual champion or pet's defenses; displacement immunity alone does not prevent the stun. Forced movement can pass the caster's body and stops at an impassable wall without shortening the remaining control.

Pulverize can be buffered during Headbutt. The buffer spends Q's cost and cooldown once, reduces W's push to 200 units, and starts the reduced 0.15-second cast after a successful dash. Interrupting the dash cancels the follow-up. The buffer itself does not deliver an early Q area packet.

Trample emits ten half-second persistent pulses over five seconds. Each pulse grants at most one stack when actual champion health or a shield takes damage. Five stacks enable a single-use real next basic against an eligible champion, preserving ordinary attack damage and adding the sourced bonus magic damage and stun. Its spell-shield guard applies to the bonus effect. Dodge and blindness preserve the charge; an attack block consumes it. Actual pet identities, shields and control immunities remain local to their recipients.

Unbreakable Will cleanses at cast completion and reduces non-true damage for seven seconds. Its specifically sourced interaction with Hemoplague uses additive amplification; unrelated damage modifiers keep their ordinary shared rules. It can be declared while disabled, but stasis prevents declaration. Fight behavior can buffer W–Q, while hold and trade preserve a ready R for the reactive policy and completed trades retreat first.

## Explicit limits and source conflicts

The primary's six-second empowered Trample window takes precedence over the binary's five-second `FullChargeDuration`. Headbutt's source separates a 0.5-second push from its 0.75-second stun; the binary's `KnockUpDuration` label does not replace those primary timings. Headbutt's exact-overlap direction uses stable reflected facing.

The arena projects movement and terrain onto one line at 30 Hz. It has no lateral terrain paths, naturally spawning lane waves, structures or unrepresented allied champions. Only explicitly classified real bodies qualify for champion and epic-monster rules. Terrain and control outcomes are model behavior, rather than an assertion of every server collision race.

## Validation coverage

`tests/kits/alistar.test.ts` covers evidence integrity, independently guarded control, fixed-origin travel, buffering and interruption, real-death Roar credit, Trample timing and attack guards, Unbreakable Will, actual pets, reflection and ordinary modes. Its production cases use the full 15,000-gold search, all six scenarios, exact reversed builds and unchanged `1e-10` score bounds. Final batch-wide source freeze, matrix, complete serial suite, browser and private package checks are recorded separately by the release workflow.
