# Caitlyn and Jhin: pinned source audit

The fourth expansion batch adds both champions to the level-20, equal-gold duel model.
Numbers below use maximum ability ranks. Actual code reads the committed records;
this document is an audit guide, not an extra runtime data source.

## Caitlyn

Headshot starts with zero Count stacks and no brush. The sixth ordinary attack is
an uncancellable Headshot. Net and trap grants are independent, target-specific,
expire after 1.8 seconds and grant 1300 range against that champion. They preserve
Count and still stack it. Only the ordinary AD portion critically strikes; bonus
physical damage remains in one life-stealing attack packet. Pets use the sourced
nonchampion coefficient, while hit-count props do not receive a health-damage bonus.

Q deals 210 + 205% AD on its first contact and 126 + 123% AD afterward, widening
from its initial missile width. An enemy still revealed by a trap takes full damage.
Actual pet/champion damage resets the attack timer; a protected contact does not.
W has five charges/traps at max rank, a one-second arm delay and 1.5-second root.
Same-location retrapping respects its sourced immunity; another location is allowed.
E deals 280 + 80% AP and slows 50% for one second, separately from its 390-unit
recoil. Cast-time suppression prevents the shot, while immobilization/grounding
prevents recoil. A clear endpoint may cross intervening terrain; a wall-overlapping
endpoint clips to the near edge rather than extending range. This endpoint rule is
an explicit one-dimensional approximation.

R has a 0.375-second cast, a one-second stationary channel and a real homing shot:
650 + 100% bonus AD, multiplied by 1 + 30% critical chance. Spell shields are checked
on the projectile, without consuming them at the earlier cast/channel boundary.
The real packet is forecast throughout cast and channel with its flight time and
projectile/spell-shield metadata. Target true sight and ordinary self sight remain
separate. No additional allied champions are available to intercept the shot.

The source marks the Headshot attack-timer refund as pending testing. Its stated
50% period refund and 0.5-second cap remain explicit assumptions. The budget values
ordinary Headshots and one R per parent cooldown; it grants no guaranteed net/trap
Headshots. The policy prefers traps against a held target and reserves R for a
predicted lethal hit after shields and resistance.

## Jhin

Whisper starts with four rounds. Ammunition is spent on launch, and the fourth is
an uncancellable guaranteed 150% AD critical attack plus 25% of missing health at
impact, in one physical/life-stealing packet. Reload lasts 2.5 seconds. The fixed
attack speed includes level growth but ignores bought AS and cripples; all bonus
AS still contributes to AD and critical movement speed. Ordinary critical outcomes
use expected movement and missile speed, rather than stochastic critical branches.

The wiki AD table ends at level 18 with 44%. The pinned game calculation continues
its +4 percentage points per level, yielding 52% at level 20, plus 35% of critical
chance and 30% of all bonus AS. The model uses this explicit continuation with
six-decimal float32 coefficient normalization. For idle reload and trap arming,
the explicit wiki mechanics of 10 seconds/1 second are retained over conflicting
client constants of 8 seconds/0.75 seconds without verified server-script evidence.

Q deals 144 + 74% AD + 60% AP. It visits at most four distinct actual targets,
choosing the nearest unvisited target within bounce range; preceding target deaths
increase later damage. Spell-shield contacts can bounce, but an invalidated target
cannot fabricate a contact. W is an instantaneous projectile line: 210 + 50% AD,
with a 2.25-second root only when the target was already marked. Projectile walls
still block it. Pets before the champion take the sourced reduced area packet.
E deals 260 + 120% AD + 100% AP, with the 65% packet for minions and repeated
champion explosions. Its ward body, arming, finite bloom, shielded explosion and
ordinary sight are distinct lifetimes. A counted champion kill creates its blossom;
ordinary pet kills and natural expiry do not create a champion takedown.

R's one-second activation opens a ten-second stationary channel. Four individually
cast shots retain a 0.25-second lock and emit at 0.2 seconds, separated by the static
one-second recast cooldown. Each deals 192 + 25% AD, increased by the victim's
missing-health share; the fourth doubles the packet. Shots pierce pets without
applying the champion-only slow, and stop on the first champion even through a
spell shield. Original cone direction remains fixed after an opponent crosses.
Client flags support an announced shot surviving ordinary CC while the parent
channel ends; this interpretation lacks server-script confirmation and is disclosed.
Unannounced later manual shots are not forecast as immediate damage.

Manual R shots are excluded from independent budget uses; a full channel is valued
once per parent cycle. The basic reference includes the reload and actual rounded
windup. Ordinary-policy tests show all four shots against an uninterrupted target;
Darius correctly interrupts after the third shot in the mirrored full-budget case.

## Verification

Focused regressions exercise numeric packets, critical snapshots, resources,
cast/channel/launch clocks, reloads, protection expiry, true sight, actual pet
contacts, walls, source attribution, ordinary policies and 15,000-gold reflected
Darius matchups. See [ACCURACY.md](../../ACCURACY.md) for completed release checks.
The two original golden winner failures and five existing skips are retained.

## Pinned evidence

### Caitlyn

- [Template:Data Caitlyn/90 Caliber Net revision 4007584](https://wiki.leagueoflegends.com/en-us/Template:Data_Caitlyn/90_Caliber_Net?oldid=4007584)
- [Template:Data Caitlyn/Headshot revision 3982560](https://wiki.leagueoflegends.com/en-us/Template:Data_Caitlyn/Headshot?oldid=3982560)
- [Template:Data Caitlyn/Piltover Peacemaker revision 4007583](https://wiki.leagueoflegends.com/en-us/Template:Data_Caitlyn/Piltover_Peacemaker?oldid=4007583)
- [Template:Data Caitlyn/Ace in the Hole revision 3982561](https://wiki.leagueoflegends.com/en-us/Template:Data_Caitlyn/Ace_in_the_Hole?oldid=3982561)
- [Template:Data Caitlyn/Yordle Snap Trap revision 4080202](https://wiki.leagueoflegends.com/en-us/Template:Data_Caitlyn/Yordle_Snap_Trap?oldid=4080202)

### Jhin

- [Template:Data Jhin/Basic Attack revision 4075435](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Basic_Attack?oldid=4075435)
- [Template:Data Jhin/Captive Audience revision 4007613](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Captive_Audience?oldid=4007613)
- [Template:Data Jhin/Whisper revision 4075448](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Whisper?oldid=4075448)
- [Template:Data Jhin/Dancing Grenade revision 4007611](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Dancing_Grenade?oldid=4007611)
- [Template:Data Jhin/Curtain Call revision 4007615](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Curtain_Call?oldid=4007615)
- [Template:Data Jhin/Deadly Flourish revision 4021795](https://wiki.leagueoflegends.com/en-us/Template:Data_Jhin/Deadly_Flourish?oldid=4021795)

Exact game version `16.20.8248524+branch.releases-16-20.content.release`: [versioned source](https://raw.communitydragon.org/16.20/game/data/characters/jhin/jhin.bin.json), SHA-256 `85ae67d7de00031e48f6a9f6d9a99248082d3e0f57627a125a4b9fe7e00013eb`.

The Lotus Trap body uses the separately pinned pet record in `data/16.20/pets/Jhin.json`: [Jhin revision 4022310](https://wiki.leagueoflegends.com/en-us/Jhin?oldid=4022310), including its three-hit health. Pet-page evidence is attributed to that page rather than to an ability template.
