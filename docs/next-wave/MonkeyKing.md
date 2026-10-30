# Wukong implementation and evidence audit

Wukong is registered under Data Dragon's `MonkeyKing` ID. Decoy is an actual, independently attackable Champion-class clone. Its attacks and copied abilities use its own actor and target identity; they do not become extra attacks by the owner.

## Exact sources

| Slot | Pinned primary revision | Rules used |
| --- | --- | --- |
| I | [Stone Skin, 3986748](https://wiki.leagueoflegends.com/en-us/Template:Data_Wukong/Stone_Skin?oldid=3986748) | Baseline armor and regeneration, five stacks from qualifying contacts, five-second refresh and gradual decay. |
| Q | [Crushing Blow, 4064066](https://wiki.leagueoflegends.com/en-us/Template:Data_Wukong/Crushing_Blow?oldid=4064066) | Five-second uncancellable empowerment, bonus range and physical proc, armor reduction after damage, both attack resets and half-second cooldown reductions from actual damage. |
| W | [Warrior Trickster, 4016976](https://wiki.leagueoflegends.com/en-us/Template:Data_Wukong/Warrior_Trickster?oldid=4016976) | One-second invisibility, 100–300 dash at 900 speed, stationary four-second Decoy, reduced outgoing damage, copied Q/E attack speed/R, stasis immunity and ability overlays. |
| E | [Nimbus Strike, 4021858](https://wiki.leagueoflegends.com/en-us/Template:Data_Wukong/Nimbus_Strike?oldid=4021858) | Targeted magic contact, 75-unit endpoint offset, up to two additional actual recipients, five-second attack speed and cancellation of incoming basic windups. |
| R | [Cyclone, 4021867](https://wiki.leagueoflegends.com/en-us/Template:Data_Wukong/Cyclone?oldid=4021867) | Eight quarter-second damage contacts over two seconds, shared owner/clone knockup history, movement speed, early cancellation, second cast window and post-effect cooldown. |
| Pet | [Wukong article, 4021883](https://wiki.leagueoflegends.com/en-us/Wukong?oldid=4021883) | Decoy's Champion targeting class, copied stats, stationary placement, basic damage and its independent attack avoidance/control interactions. |

All five raw templates remain in each ability's supplemental sources. The complete exact pet article is retained in `text.pinnedRawRevision`; the original pet protection expansion error remains unchanged. The W template's explicit rank series recovers the clone's 40/45/50/55/60% outgoing damage.

The supplementary [16.20 binary](https://raw.communitydragon.org/16.20/game/data/characters/monkeyking/monkeyking.bin.json) has version `16.20.8248524+branch.releases-16-20.content.release` and SHA-256 `92f2a91971d5683b87145991a9a1db7b4acadae7ccc3676f8a15dfa00aaacb7a`. Each ability retains its exact object path and complete selected arrays. The primary five-second Q window overrides binary six-second metadata, and W's primary instant cast overrides binary 0.25 cast metadata. Nimbus uses the binary's finite 1050 dash speed; the primary additional-target radius takes precedence over generic binary target-range metadata. All numeric readers run while compiling the kit.

## Runtime behavior

Stone Skin starts without invented combat history. Ordinary connected basic on-hits grant stacks against actual champion/monster bodies, including damage blocks but excluding blindness, dodge and invulnerability. Accepted spell damage grants stacks separately. The shared damage observer identifies actual clone actors and actual pet targets; it cannot credit an immune contact as damage. Each accepted owner/clone damage packet reduces a running Q cooldown independently.

Decoy snapshots current health, resistances and its attack stats when placed. Its actual pet ID, current HP, status list, memory, attack clock and target remain separate from the owner. Its critical chance, penetration and ordinary on-hit packets are copied into its own basic attack actor. Outgoing damage is scaled once. The clone's own blindness, disarm, cripples, shields and retaliation damage are resolved on that body. It ignores sourced stasis immediately, stays at its placement position, and expires after four seconds. The shared ordinary pet rule removes it when the owner dies. Last-damaged reachable targets take priority, followed by the nearest reachable enemy body.

Q gives each body a separate empowerment, consumes it at its actual attack declaration, and resets both attack clocks. The owner uses the ordinary basic windup; the clone schedules its own. Basic damage and the separate noncritical Q proc precede armor reduction. Spell shielding and attack avoidance are checked independently for each body's contact. Owner cooldown starts on launch or unused empowerment expiry.

E travels a real finite segment, can cross terrain, and can be knocked down. An interrupted dash delivers no arrival damage or attack speed. Successful arrival applies independently guarded contacts to the target and up to two actual extra bodies. Cosmetic E clones never multiply damage against one recipient. Q can overlay E; all abilities can overlay W. A basic breaks W stealth when its windup finishes.

Each Cyclone has eight scheduled packets. Owner and clone share a recipient's attempted knockup history for that cast. A spell-shielded first knockup also grants the source-described immunity across both casts; normal damage shielding blocks one packet. Existing clone spins continue independently when a basic ability ends the owner's spin. W during a spin transfers its exact remaining duration and next packet to the new clone; Q can end that transferred spin. Ordinary stun does not stop the released spin, while owner death stops further sources. Hold/trade reserve both actually available R casts, and completed trades retain retreat.

## Explicit limits

- The source does not fully specify every snapshot and copied critical/on-hit rule. The implementation records the chosen snapshot contract in compiled assumptions, applies ordinary basic attack rules to each clone, and excludes owner champion hooks.
- The pet infobox does not distinguish clone maximum HP from copied current HP. Both use the owner's current HP at summon; this limitation affects health-ratio formulas against damaged clones.
- One-dimensional geometry cannot represent lateral formations, deceptive player commands, brush vision or cone width. No ambient minions, turrets, prefight stacks or damage history are invented.
- The primary Q empowerment and W cast timing take precedence over conflicting binary values. Generic E range metadata does not silently widen the primary additional-target radius.
- Clocks resolve at the simulator's ordinary 30 Hz boundary; quarter-second pulses use their successive rounded tick deadlines.

## Validation

The focused suite covers exact pinned sources and source failure guards, ordinary six-scenario 15,000-gold production with exact reversed builds and scores within `1e-10`, independent clone HP/stats/crit/on-hits/CC/retaliation, real pet contacts, Q clocks, finite E and its guards, copied R history/transfers/cancellation, owner death, actually ready R reservation and completed retreat. Final focused results are recorded with Vi and Warwick outside the repository in `/workspace/counter-browser/batch10-back-review-shared-final.json`. Full matrix, browser and private delivery checks belong to the root release workflow.

## Batch 14 follow-up: protected windups

Nimbus Strike cancels ordinary basic attack windups that actually target Wukong. It preserves uncancellable attacks, including a real empowered Crushing Blow, together with their original readiness clock and eventual damage. An attack held alongside a concurrent cast retains its own protection and target identity. Only actual hostile pets with basic attack deliveries are interrupted; ability-like pet deliveries, attacks aimed at other recipients and already launched projectiles remain independent.

The exemption is attributed to [Uncancellable windup, revision 4072133](https://wiki.leagueoflegends.com/en-us/Template:Tip_data/Uncancellable_windup?oldid=4072133). The original two curated paragraphs and complete raw revision are retained separately in Nimbus Strike's sources. Cyclone's interaction-table summary is appended from its already retained primary revision 4021867. Every original primary field, note, game excerpt and source remains unchanged. The regenerated Wukong profile adds only that interaction note.

Ten targeted interaction checks pass. The complete legacy source delta has an independent exact-value audit, separate from the six new champions' source audit. Earlier failures and the completed matrix from the preceding model are preserved. The corrected model requires its own fresh matrix and final release validation.
