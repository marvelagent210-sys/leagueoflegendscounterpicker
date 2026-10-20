# Jinx and Miss Fortune: pinned source audit

The fourth expansion batch adds both kits at maximum ranks and level 20. Values
are read through the strict source compiler; the text below records interpretations
and limitations rather than overriding the committed data.

## Jinx

Jinx begins with Pow-Pow, no Rev'd up stacks and no Get Excited! takedown bonus.
Launched minigun attacks grant 65%, then 32.5% and 32.5% bonus AS. The common
expiry is 2.5 seconds; later one-at-a-time expiry spacing is not quantified in the
pinned notes, so a visible revDecayInterval option defaults to one second.
Fishbones grants 200 range, scales ordinary critical basic damage to 110%, applies
its 10% bonus-AS penalty without recursive drift, and uses its own missile/windup.
Mana is paid on declaration even if the windup cancels. Existing stacks aid the
first declared rocket and are consumed on launch. Weapon identity, critical chance,
missile speed and damage scale stay attached to an in-flight attack.

The ordinary policy controls the mana-free weapon toggle, while three explicit
weapon policies participate symmetrically in matchup variant selection. Internal
impact helpers cannot be cast independently. Successful rocket attacks deliver
collateral without duplicating the primary packet or granting damage after an
avoided contact. Actual champion deaths trigger Get Excited!; ordinary summons,
expiry and resurrection eggs do not. Its 175% movement burst uses a disclosed
linear six-second decay because the source supplies no decay curve. Its total-AS
stacks use the sourced increased cap, separately from the ordinary attack-speed cap.

W deals 210 + 140% AD and slows 80% for two seconds. Its AS cast-time table clamps
between 0.6 and 0.4 seconds; its sight does not reveal invisibility. E deals
290 + 100% AP after a 0.4-second toss and 0.5-second arm delay. The real tossed
packet has its own forecast, without adding the root cast's estimate twice. A
spell shield blocks snare/knockdown separately from explosion damage. On the duel
axis the transverse three-trap layout is one central trigger/explosion respecting
the one-chomper-per-champion limit; independent side placements are not fabricated.
Untouched traps expire with damage and no snare, and pets do not trigger a
champion-only trap. R uses a real accelerating projectile, champion collision,
traveled-distance damage scaling and actual secondary pet collateral. Maximum
primary damage is 500 + 120% bonus AD + 35% target missing health.

The reference budget includes one E packet per sourced max-rank ten-second
cooldown and cap-aware fully stacked minigun AS. It does not assume free takedown
steroids. Finite expected-value skillshot branches and the programmed weapon policy
remain model choices, not observed player performance.

## Miss Fortune

Love Tap tracks the actual last target across champion and pet contacts; it does
not reappear against an unchanged target just because Q is ready. The pinned game
calculation has an explicit level-20 breakpoint giving 110% AD, whereas the wiki
table ends at level 13 with 100%. The model uses the game breakpoint and records
both sources. The nonchampion packet is halved. Love Tap remains noncritical and
joins the ordinary basic physical packet before one shield/reduction/life-steal
transaction. Avoided attacks do not change the marked target.

Q deals 120 + 100% AD + 35% AP with the sourced current basic windup, actual attack
range and a real first projectile. It chooses an eligible actual target behind
the primary; no secondary body means no free bounce. A primary spell-shield contact
can bounce; invalidated targets cannot. Killing the primary gives the bounce its
150% critical multiplier without making Love Tap critical. Both contacts check
protection independently and retain real target identity.

Strut begins fully active under the disclosed precombat assumption. Direct health
damage resets its movement buildup; shield-only and persistent damage follow their
recorded exceptions. W grants four seconds of 100% bonus AS and haste-adjusted
Love Tap cooldown refunds. E delivers eight area ticks over its two-second field,
for 190 + 120% AP total. R emits 18 real waves during its three-second channel,
each 40 + 60% AD + 25% AP, with sourced critical and first/last-wave timing.
Projectiles retain facing, travel, shield/terrain interactions and ordinary channel
interruptions. Its initial threat describes the first wave and actual flight,
while future perception follows emitted waves rather than an instantaneous full
channel burst.

The budget values a single opening Love Tap over its reference window, capped W
AS uptime and the complete R once per parent cycle. It does not price Love Tap as
a fresh same-target proc on every Q. Enemy minion waves and allied champions are
absent; behind-target geometry is projected onto the one-dimensional arena.

## Verification

Focused checks cover actual damage/timing, ammunition and resource state, attack
snapshots, variant policies, internal-helper rejection, pets, projectile walls,
protection expiry, source conflicts and reference-budget packets. Current full
release evidence is in [ACCURACY.md](../../ACCURACY.md). No golden winners,
margins, skips or acceptance tolerances are tuned to these new champions.

## Pinned evidence

### Jinx

- [Template:Data Jinx/Flame Chompers! revision 3993368](https://wiki.leagueoflegends.com/en-us/Template:Data_Jinx/Flame_Chompers%21?oldid=3993368)
- [Template:Data Jinx/Get Excited! revision 3973632](https://wiki.leagueoflegends.com/en-us/Template:Data_Jinx/Get_Excited%21?oldid=3973632)
- [Template:Data Jinx/Switcheroo! revision 4062629](https://wiki.leagueoflegends.com/en-us/Template:Data_Jinx/Switcheroo%21?oldid=4062629)
- [Template:Data Jinx/Super Mega Death Rocket! revision 4007616](https://wiki.leagueoflegends.com/en-us/Template:Data_Jinx/Super_Mega_Death_Rocket%21?oldid=4007616)
- [Template:Data Jinx/Zap! revision 3907092](https://wiki.leagueoflegends.com/en-us/Template:Data_Jinx/Zap%21?oldid=3907092)

Exact game version `16.20.8248524+branch.releases-16-20.content.release`: [versioned source](https://raw.communitydragon.org/16.20/game/data/characters/jinx/jinx.bin.json), SHA-256 `a244534e29eaa09c30459dae561dcfae53c2af73e10403064aa3e30b82d4ee3e`.

### MissFortune

- [Template:Data Miss Fortune/Make It Rain revision 4065641](https://wiki.leagueoflegends.com/en-us/Template:Data_Miss_Fortune/Make_It_Rain?oldid=4065641)
- [Template:Data Miss Fortune/Love Tap revision 4027989](https://wiki.leagueoflegends.com/en-us/Template:Data_Miss_Fortune/Love_Tap?oldid=4027989)
- [Template:Data Miss Fortune/Double Up revision 3993572](https://wiki.leagueoflegends.com/en-us/Template:Data_Miss_Fortune/Double_Up?oldid=3993572)
- [Template:Data Miss Fortune/Bullet Time revision 4050364](https://wiki.leagueoflegends.com/en-us/Template:Data_Miss_Fortune/Bullet_Time?oldid=4050364)
- [Template:Data Miss Fortune/Strut revision 4015416](https://wiki.leagueoflegends.com/en-us/Template:Data_Miss_Fortune/Strut?oldid=4015416)

Exact game version `16.20.8248524+branch.releases-16-20.content.release`: [versioned source](https://raw.communitydragon.org/16.20/game/data/characters/missfortune/missfortune.bin.json), SHA-256 `103a7c354d1e0a2bf2eeb4e54f329accdf1ce594ca0c317f204a9c6c9ea79dc3`.
