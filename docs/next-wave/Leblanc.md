# LeBlanc implementation audit

Implemented against five pinned ability templates and the separately pinned pet article. The kit has Q/W/E plus three mutually exclusive Mimic variants, two independent return actions and two inaccessible fracture packets. R variants share one ordinary cooldown; no extra ultimate charges are granted.

| Source | Revision |
|---|---:|
| [Mirror Image](https://wiki.leagueoflegends.com/en-us/Template:Data_LeBlanc/Mirror_Image?oldid=4035723) | 4035723 |
| [Sigil of Malice](https://wiki.leagueoflegends.com/en-us/Template:Data_LeBlanc/Sigil_of_Malice?oldid=3985524) | 3985524 |
| [Distortion](https://wiki.leagueoflegends.com/en-us/Template:Data_LeBlanc/Distortion?oldid=4057468) | 4057468 |
| [Ethereal Chains](https://wiki.leagueoflegends.com/en-us/Template:Data_LeBlanc/Ethereal_Chains?oldid=3954748) | 3954748 |
| [Mimic](https://wiki.leagueoflegends.com/en-us/Template:Data_LeBlanc/Mimic?oldid=4057469) | 4057469 |
| [Mirror Image pet infobox](https://wiki.leagueoflegends.com/en-us/LeBlanc?oldid=4053330) | 4053330 |

Additional evidence comes from [the 16.20 LeBlanc binary JSON](https://raw.communitydragon.org/16.20/game/data/characters/leblanc/leblanc.bin.json), version `16.20.8248524+branch.releases-16-20.content.release`, SHA-256 `c701b73e304bf408747f7feee6f019b1ba5817498cc9700e36791aade2fca44a`. Each excerpt records its exact spell object. The binary supplies RQ/RE cast time and per-spell stealth breaking, and exposes the root R metadata: maximum ammo two, ammo spent zero, hidden recharge five seconds. These fields do not establish two usable Mimic casts. The template's actual 45/35/25-second cooldown governs all R variants. The primary W template explicitly says no cast time and a 240 damage radius; these take precedence over the binary's 0.25 cast metadata and 220 `castRadius`, respectively.

## Contact and target identity

Q deals `165 + 0.40 AP` at maximum rank and applies a 3.5-second mark; RQ deals `230 + 0.40 AP` and applies a `460 + 0.80 AP` mark. Only a successful damaging ability contact consumes existing marks, before the new mark is installed. Q/RQ can consume one another; declaration, ordinary attacks, misses, projectile walls, untargetability, spell shield and parry preserve an existing mark. Marks are held by the actual contacted champion or pet. A consumed pet mark is synchronized to that pet before subsequent damage effects, preventing its accidental restoration.

The Q orb's minion bonus is capped at the primary prose's level-18 value of 146, despite the extracted level series extending to 20. An actual minion death caused by the Q orb or Q mark returns 100% mana cost and 30% remaining Q cooldown. A champion-class clone receives neither bonus nor minion refund. Mark damage uses application-time AP as an explicit interpretation of “the same magic damage again”; the source does not settle AP snapshot timing.

## Distortion and Mimic memory

W/RW dash up to 600 at 1450 speed; damage occurs once within the 240-radius destination area. Path crossing and returns do not deal damage. Each dash saves its own original location and opens its own four-second pad on actual dash end, with a separate 0.2-second return gate. Returns are instantaneous, free, range-independent and do not notify ability-activation listeners. Root/grounding still prevent them. Returning to one origin preserves the other origin and does not replace Mimic memory.

Mimic remembers the last successfully released basic ability and defaults to Q before any basic cast. It has no assumed prefight cast. Interrupted dashes preserve their return origin without arrival damage; retention under interruption is explicitly an unsourced policy. Geometry is a scalar line, so full two-dimensional placement, terrain overlap and mouse commands are outside this model. Tick rounding applies to dash-end and recast clocks.

## Chains and aftermath

E/RE are real first-contact projectiles, launched from the caster's position at cast completion with the declared direction. They can collide with pets and projectile walls. Initial contact creates an independent E or RE tether and reveal on the actual target. The tether completes after 1.5 seconds, provided an every-tick watchdog has not severed it. The initial 0.25 seconds is guaranteed; after that, edge distance must remain at most 865 plus the two gameplay radii. Returning within range after a break does not reconnect it.

Fracture deals `240 + 0.85 AP` for E or `460 + 0.85 AP` for RE, then roots for 1.5 seconds with tenacity. It reads live AP as an explicit timing interpretation. An already-attached tether bypasses a newly gained spell shield and ordinary untargetability; parry and stasis deny fracture. Root true sight follows the actual root, including tenacity/cleanse. Death or resurrection of the target breaks its tether. A caster's death leaves the watchdog and fracture pending, so later separation can still cancel them. The sources do not provide complete lifecycle/server logic; these distinctions are visible assumptions.

## Mirror Image

Positive HP damage leaving a living LeBlanc strictly below 40% maximum HP triggers the ready passive, with a static sixty-second cooldown. Merely starting low, full shield absorption and lethal damage do not summon it. Owner and clone each receive one second of invisibility. Owner attacks break it at the end of windup; sourced spell casts and returns break it when released.

The pet infobox says its HP is “100% of LeBlanc's current health.” It gives no separate maximum-health rule. Both clone maximum and current HP therefore start from that current-health snapshot; percentage/max/missing-health formulas use the clone's own health. The clone copies total armor/MR, attack interval/windup, movement speed, and gameplay/pathing radii at summon. Movement retains the owner's uncapped speed input so shared movement soft caps apply once. Later owner stat changes do not update these copied stats; that snapshot policy is an interpretation where update timing is absent.

The actual summon has champion target class and explicit clone unit class. These are separate metadata; other champion-class pets are not inferred to be clones. It is attackable, independently receives damage/CC, and expires after eight seconds. The shared pet rule removes it on owner death; post-owner-death persistence is not established here. Clone status and memory never duplicate the owner's real chains.

The pinned pet page's flee-away-from-damage-source rule takes precedence over the passive template's random-forward instruction. The deterministic clone tries to run toward the sourced 1900-unit destination, respecting the explicitly estimated 1125 leash. It walks back if displaced outside the leash. After fleeing, it can make cosmetic attacks on an eligible target already within 525 range, with real windup/cooldown and invisibility breaking. It emits no hit, on-hit, damage, retaliation or missile events. No autonomous chase, copied spells, player-command interface or opponent deception decision is supplied by these sources.

## Validation and reference budget

The focused suite passes **54 tests**. `tests/kits/leblanc.test.ts` covers pinned source guards; finite variants and shared R cooldown; contact-owned marks and their expiry; Q cancellation/refund; independent W/RW origins and return clocks; interruption; tether impact/break/completion, defenses, tenacity and death aftermath; passive threshold/shield/lethal cases; finite copied clone stats and health formulas; independent memory/lifetime/CC; harmless attacks against active production Rammus with a real-pet reflection control; and a real production Malzahar voidling intercepting an E projectile. Five normal behavior modes exercise bounded spell and movement choices. Hold/trade reserve every offensive Mimic variant; kite avoids offensive Distortion while preserving reactive escape choices.

The budget adds one Q/RQ mark consumption and one E fracture per corresponding cooldown to the already-counted initial damage. R uses the default Q branch. This assumes full contact/tether uptime for valuation; the duel resolves actual misses, breaks and alternative Mimic branches. Clone deception is not given an invented survival or damage value. AP increases the corresponding reference terms.
