# Kai'Sa and Kalista source and mechanics audit

These level-20, maximum-rank kits use the pinned 16.20 snapshot. They compile directly through `compileKit`, including before registration. Runtime state consists of scalar memory keys, target-local statuses and copyable missiles/actions, so branching a fight does not share mutable counters.

## Source pins

| Champion | Ability | Exact wiki revision |
| --- | --- | --- |
| Kai'Sa | Second Skin | [4053367](https://wiki.leagueoflegends.com/en-us/Template:Data_Kai%27Sa/Second_Skin?oldid=4053367) |
| Kai'Sa | Icathian Rain | [4038389](https://wiki.leagueoflegends.com/en-us/Template:Data_Kai%27Sa/Icathian_Rain?oldid=4038389) |
| Kai'Sa | Void Seeker | [4034696](https://wiki.leagueoflegends.com/en-us/Template:Data_Kai%27Sa/Void_Seeker?oldid=4034696) |
| Kai'Sa | Supercharge | [4038391](https://wiki.leagueoflegends.com/en-us/Template:Data_Kai%27Sa/Supercharge?oldid=4038391) |
| Kai'Sa | Killer Instinct | [4034697](https://wiki.leagueoflegends.com/en-us/Template:Data_Kai%27Sa/Killer_Instinct?oldid=4034697) |
| Kalista | Basic Attack | [3951529](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Basic_Attack?oldid=3951529) |
| Kalista | Martial Poise | [4024157](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Martial_Poise?oldid=4024157) |
| Kalista | Pierce | [3997075](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Pierce?oldid=3997075) |
| Kalista | Sentinel | [4007621](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Sentinel?oldid=4007621) |
| Kalista | Rend | [4004071](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Rend?oldid=4004071) |
| Kalista | Fate's Call | [4015001](https://wiki.leagueoflegends.com/en-us/Template:Data_Kalista/Fate%27s_Call?oldid=4015001) |
| Kalista | Sentinel pet | [4002537](https://wiki.leagueoflegends.com/en-us/Kalista?oldid=4002537) |

Every exact primary template and the Sentinel pet page was retrieved and its returned revision/title checked against the parsed records. Supplemental Kai'Sa source text preserves the actual wikitext for E's formula, W's **true-sight** tooltip and R's “Stack application or consumption” tooltip. These are fields the original rendered text omitted.

The exact game version is `16.20.8248524+branch.releases-16-20.content.release`:

- [Kai'Sa binary](https://raw.communitydragon.org/16.20/game/data/characters/kaisa/kaisa.bin.json): SHA-256 `40e12d94baf3409f5a8eadb9d44bdd44a58b27de745bc7e84739b99700d9b222`.
- [Kalista binary](https://raw.communitydragon.org/16.20/game/data/characters/kalista/kalista.bin.json): SHA-256 `ec23104aa80bdcba70b9370e0700168cdb67ff301322ea4434dfe3bd0bea78e2`.

Kai'Sa's parsed Q and E records preserve exact object excerpts with this independent URL/version/hash attribution. Q's `FixedTimeSplineMovement.mTravelTime` is `0.4000000059604645`, corroborating the wiki's fixed 0.4-second travel; its cosmetic `missileSpeed:1800` does not define that travel. E's client `tooltipOnly` calculation is retained to expose the conflict described below. No current/latest fallback or wiki revision zero is used for these sources.

## Kai'Sa

Second Skin tracks Plasma separately on each actual target. Stacks start empty, refresh for four seconds and rupture at five. The existing dataset's pinned linear level interpolation gives `33.0588235294118 + 0.12AP` flat magic, plus `8.82352941176471 + 0.03AP` per existing stack at level 20. The wiki endpoints are level 1–18; continuing their interpolation to the role-quest cap of 20 is the dataset's explicit level-scaling policy, not an independently measured server value above 18.

For a basic attack the passive's flat damage and fifth-stack rupture resolve before ordinary physical/critical damage. Missing health is read after the passive's own mitigated flat packet. W first deals `130 + 1.3AD + 0.45AP`, then applies two or three successive passive packets, rupturing and retaining overflow as needed. Rupture is `(0.15 + 0.0006AP) × missing health`. Blind, dodge, parry and attack block prevent the basic passive. A basic spell shield does not deny it; a shielded W grants no stacks or refund. Own accepted immobilization/polymorph can apply a non-damaging stack; no allied champion supplies free applications. Branch-cap expected hits can carry fractional stack progress, a stated approximation.

Evolutions use permanent growth plus directly allocated budget stats. At level 20 growth contributes `51.129AD` and `35.397%AS`, so the Q/E purchased thresholds are `48.871AD` and `64.603%AS`; W requires `100AP`. Temporary buffs and base level-one AD do not qualify. The stat budget represents directly purchased permanent stats and contains no adaptive-force item conversion. Evolutions are resolved before combat; the duel does not grant free in-combat upgrade casts.

Q acquires actual visible targets within 600 center units at cast. Six missiles, or twelve when evolved, are distributed evenly in stable champion-then-pet order. The single-target release sequence spans one second; every individual flight takes exactly 0.4 seconds. Targets remain locked as they move. First packets are full area damage, with repeats classified as persistent area. Non-minion repeats deal 25%, yielding 225%/375% isolated champion scaling. Explicitly source-classified Minions instead receive full repeat packets, doubled whenever an individual impact finds their current health strictly below 35% of maximum. A spell shield blocks one individual packet; projectile walls can destroy individual flights. Absolute impact clocks announce each pending packet to defensive perception despite its kit-owned fixed-time collision, so actual Sivir can react before contact. Pet area multipliers and defenses belong to that pet, and removed pets do not redirect damage to their owner. The classification comes from exact named pet records: Tibbers, Heimerdinger turrets, Yorick summons and Zyra plants have explicit Minion targeting. Illaoi Spirits remain champion-class; unknown pets are not silently called minions. The health threshold is evaluated at each impact, after earlier packets, and pet area resistance remains independent. Damage evaluates current caster stats at impact because the pinned text provides no snapshot exception.

The simulator replaces the real curved spline with a straight target-following interpolation. Target allocation remainder order and committing the complete acquired volley after caster death are explicit policies where the pinned page supplies no server tie/death rule. Free-angle interception and spline paths remain outside the one-axis arena.

E snapshots `max(0.6, 1.2/(1+bonusAS))` charge time and `75% × (1+min(1,bonusAS))` movement speed at declaration. It is mobile/ghosted, prevents attacks, and grants 80% AS for four seconds after completing. Evolved E gives 0.5-second invisibility at the start. Charged attacks use the sourced 6.4433% windup and 2500 missile speed; every declared basic refunds 0.5 actual seconds of current E cooldown, independently of whether it later hits. Existing Q releases continue during charging, while new Q/W casts are denied. Q/W/E may overlay R's dash; timed casts cannot replace another active cast.

**Unresolved E source conflict:** the pinned raw wiki explicitly gives the reciprocal bonus-AS cast formula above. The pinned client tooltip calculation instead subtracts `0.4 × total attack speed` from 1.2 with a 0.6 floor. That tooltip-only client object does not supply the complete runtime implementation. The kit chooses the explicit wiki formula and exposes both sources rather than calling them equivalent.

W is a first-contact 1750-speed skillshot, including real pets. Its exact pinned tooltip grants **true sight for four seconds**, so a connected W reveals Twitch camouflage or invisibility; ordinary sight along the projectile's cosmetic trajectory is not a separate fog-of-war simulation. Evolved W refunds 75% of its whole haste-adjusted cooldown only after a champion hit.

R requires a visible actual champion within 3000 affected by Plasma application **or consumption** during the previous four seconds. It cannot target a pet. Its shield is `200 + 1.8AD + 1.2AP`; it starts before the dash, resets the attack timer and refreshes the remaining shield's two-second duration at landing without refilling absorbed shielding. The default near-side endpoint is within 525 of the enemy, caller endpoints are clipped to that circle, and terrain uses shared clear-endpoint clipping. The wiki's 3800 speed is explicitly estimated. Two-dimensional landing optimization is absent.

## Kalista

Current basics use ordinary 100% AD and ordinary critical strikes. The pinned basic source contains neither the historical 90% penalty nor the historical lost-sight miss rule. The 0.75 windup modifier remains, and movement cannot cancel her attack windup. Q/W are denied while it is protected; E is the documented cancellation exception.

Martial Poise defaults to barefeet forward 140/backward 225-unit attack hops and forward 300/backward 150-unit Q hops. The policy buffers a retreat for kiting/fleeing or when it preserves attack reach, otherwise an advance. Grounding/immobilization denies hop launch, ordinary knockdown rules apply, and clear-endpoint terrain clipping prevents landing inside a wall. `martialPoise=0` disables the approximate hop policy for inspection.

**Unresolved hop velocity:** the wiki supplies nominal 1025 speed for barefeet and says AS and movement effects change speed, but its range derivation is explicitly empirical and the complete speed formula is unavailable. The client has isolated movement and bonus-AS calculations without a consumer connecting them to runtime velocity. The implementation uses the 1025 baseline with multiplicative movement/slows, excludes additive movement bonuses, and deliberately does not invent a positive AS multiplier. This can understate high-AS Kalista kiting. Boot tiers, lateral angles, input animation cancels and the listed sleep knockdown bug are not claimed exact.

Rend is local to each actual target, capped at 254 and refreshed for four seconds. E deals `45 + 0.7AD + 0.65AP + (stacks−1) × (35 + 0.5AD + 0.5AP)` physical and applies `42% + 0.0005AP` slow for two seconds. It consumes marks, spends 30 mana, starts cooldown and applies damage immediately. Its public reference cast time remains 0.25 seconds; instant delivery plus a local lock represents that duration without delaying the packet or allowing death to avoid its mana payment. Existing Q casts and hops keep their absolute clocks, including a lock that outlasts an earlier Q completion. Untargetable/stasis targets retain marks and cannot enable E.

The effect radius is 1100. The pinned note only says activation range is smaller and provides no exact smaller number. Activation openly uses 1100; a guessed range is not presented as sourced. There are no epic jungle monsters, so their 50% damage modifier does not apply to ordinary champion summons.

Q deals `270 + 1.05AD`, flies at 2400, and stops on a surviving first real spell target or its spell shield. It continues through kills and transfers only the **last killed target's existing Rend stacks**, following the pinned multi-kill bug rather than adding every corpse. E marks already-flying Q/basic packets to rend their new spears on impact. E during Q's unfinished cast also empowers the future projectile and reproduces the documented extra first-spear repeat on the earlier rended target at Q impact. The source does not explicitly timestamp that extra repeat; impact is this model's stated interpretation. Launched packets can finish after caster death.

Actual E kills reset its cooldown and refund exactly 30 mana. Resurrection-protected targets grant neither. An already-targetable Sion in Glory in Death receives the documented reset exception. The policy accumulates spears while attacks remain in range and rends on departure or when damage after mitigation and shields can finish the target. It does not perform an exhaustive timing/input search.

There is no allied Oathsworn champion. Soul-Mark supplies no fabricated 18%-maximum-health magic damage, and Fate's Call cannot give Kalista an absent ally's invulnerability, retrieval or two-second knockup. Both rules remain evidence-linked on the kit page.

W can manually summon a scout with two charges, 50-second recharge, 30-second between-cast cooldown and 0.5-second cast. The scout is a two-basic-hit, non-attacking, CC-immune pet invalid to abilities. It patrols a 1400–5000-unit line for three round trips at 280 speed, half speed at one health, then chases a detected visible champion within 450 for four seconds and reports ordinary sight. It never exposes stealth. The source calls its 65 radius an assumed default. A two-dimensional forward cone, obstacle routing and the initial +200 speed's unquantified rapid decay are omitted. The normal damage policy avoids spending a cast on a scout in an arena that already provides global ordinary duel visibility. Shared pets disappear at owner death.

## Verification

`tests/kits/kaisaKalista.test.ts` exercises actual compiled kits and real engine paths: passive ordering and post-mitigation rupture; overflow, expiration, shields, critical damage and life steal; exact Q delays and individual defenses; permanent versus temporary evolution stats; true sight; E charging and R shielding/landing; branch isolation; Rend mana/lock/refund timing; Q cast and in-flight E combinations; actual pet marks, continuation and last-kill transfer; resurrection denial; terrain-clipped hops; solo ally restrictions; scout clocks; budget responses; and default policy fights.

The local focused suite passes 99 cases at this stage. Final registered-contract, complete matrix, side-reflection and browser checks are performed by the batch integrator against the final frozen source fingerprint.
