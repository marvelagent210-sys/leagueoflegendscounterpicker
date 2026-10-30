# Lee Sin implementation and evidence audit

The simulator reads gameplay quantities from retained source records through `KitContext` during compilation. Primary pins and parsed numeric fields remain intact; supplemental evidence preserves complete raw templates and exact binary excerpts.

## Exact sources

- [Cripple, revision 4007641](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Cripple?oldid=4007641).
- [Tempest, revision 4016969](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Tempest?oldid=4016969).
- [Flurry, revision 4015078](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Flurry?oldid=4015078).
- [Resonating Strike, revision 4026428](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Resonating_Strike?oldid=4026428).
- [Sonic Wave, revision 4070797](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Sonic_Wave?oldid=4070797).
- [Dragon's Rage, revision 4032576](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Dragon%27s_Rage?oldid=4032576).
- [Iron Will, revision 3992654](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Iron_Will?oldid=3992654).
- [Safeguard, revision 4024314](https://wiki.leagueoflegends.com/en-us/Template:Data_Lee_Sin/Safeguard?oldid=4024314).

Supplementary game evidence is the [exact 16.20 Lee Sin binary](https://raw.communitydragon.org/16.20/game/data/characters/leesin/leesin.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `ff772fc7e37822c6779d1a817931ac24e66fe667f5401ab838df3bcceaacaf54`. The records retain **12 attributed game objects** and **12 exact excerpts**, including complete arrays. Full pinned inputs and the strict exact-value audit are preserved outside source under `/workspace/counter-next-wave/batch10-audit`.

## Runtime behavior

All eight primary templates are retained independently. First-stage Q/W/E and their paid recasts have separate costs and source windows. The first-stage cooldown starts at declaration and haste is applied to that cooldown only. Flurry starts empty, refreshes from completed real stages, and restores energy on two actual unblocked basic contacts; avoidance grants no refund. Actual pets use the same opt-in basic path and retain their own defenses.

Sonic Wave launches from the declaration position with finite travel, first-body pet collision, projectile walls and released-flight persistence. Its actual accepted recipient receives the mark and true sight. Resonating Strike tracks that same marked champion or pet, samples missing health at arrival, and consumes only its source mark and sight. Tracking loss and interrupted movement preserve the mark; no distant owner's health or protection is borrowed.

Safeguard defaults to self-cast. An explicitly aimed cast can select a real targetable friendly pet anchor in range; no ward or allied minion is created. It travels to the anchor's declaration position and shields only on valid arrival, except the primary's stated Q/W replacement exception. Source-classified champion allies receive the eligible ally shield/refund treatment; clones remain distinct. The shared pet shield path handles real typed absorption. Iron Will heals from resolved source-owned damage before late Riposte negation, including shields and eligible pet targets, without healing from health counters or cloning an owner's packet.

Tempest resolves around the completion position and applies a per-recipient mark. Its true sight requires that recipient not be invisible at contact. Cripple requires a nearby actual marked body, keeps Tempest's reveal, and applies an independently guarded slow that decays on its own clock. Pet marks and slows never become owner statuses.

Dragon's Rage roots its target during the cast, decides its knockback direction at impact, and can cancel an invalid target without resource or cooldown spending. Its moving body can collide once with each actual secondary pet, using the primary recipient's actual bonus health and the secondary recipient's own defenses. A lethal primary leaves an actual corpse-flight record without fabricating a pet. Mode behavior keeps R available in hold/trade and evaluates completed trade retreat before optional offense.

## Explicit limits and source conflicts

Primary E2 uses 550 range while the complete binary cast-range array contains 575; the primary remains authoritative. Safeguard's binary `W1CooldownRecovered` array supplies the 50% self/champion refund, without extending a stale primary blurb to minions. Every binary excerpt retains its exact object and full arrays.

Movement is projected onto one line at 30 Hz. Q2/W use the primary ideal speed formula and actual target/destination checks. Blink-specific server races and distance-dependent dash bugs are not randomized. Dragon's Rage uses the source's intended 800 distance over its estimated 0.8-second travel; its radius-dependent distance bug is not numerically specified. Collision radius and quarter-second checks are explicitly estimated by the primary. Only actual secondary pets exist in a two-champion fight, and the duel may end before postmortem collision events.

Fog, independent sight circles and ally champions are unavailable. Unknown summoned-unit classes do not acquire invented shield eligibility; there are no synthetic wards or preduel energy cycles. Self-benefit clocks follow the shared lifecycle and ordinary expiry because these primary templates specify no separate resurrection exception. The budget prices minimum Q2 damage, not a free missing-health execute.

Safeguard currently follows the shared shield-layer model. A legal 100-ability-haste fixture can recast W at tick 53 while the first shield lasts through tick 59, retaining both layers during that overlap. The pinned ability templates and the dataset's generic Shield revision do not specify same-source shield refresh or replacement. This boundary remains unverified; the fixture and source review are retained outside the repository as `batch10-shield-overlap-review.json`. It is not a claim that stacking matches the live game.

The retained [Riposte revision 4007365](https://wiki.leagueoflegends.com/en-us/Template:Data_Fiora/Riposte?oldid=4007365) explicitly permits life steal and damage-based healing before its late damage negation. Healing therefore uses the resolved post-mitigation packet, including shields, while actual health loss and shield absorption remain separate for damage-triggered stacks, hunts and combat. Invulnerability and stasis produce no healing packet. Focused regressions cover unshielded and shielded Riposte without duplicate healing.

## Validation

`tests/kits/leesin.test.ts` passes **77 focused tests** in the final combined review report `/workspace/counter-browser/batch10-focused-tests.json` (**891 passed, zero failed or skipped**). Coverage includes full 15,000-gold production searches in all six scenarios, exact reversed builds and unchanged `1e-10` aggregate/scenario bounds; actual pet contacts and defenses; resource and cooldown windows; movement and terrain; source attribution; and ready-R hold/trade and completed-retreat behavior. Hecarim and Lee Sin also run all six scenarios against Heimerdinger's actual pets. Final batch-wide source freeze, complete matrix, serial suite, browser and private package validation remain separate root release checks.
