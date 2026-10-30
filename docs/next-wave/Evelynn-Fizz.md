# Evelynn and Fizz — batch 8

Both kits are implemented in `kits/champions/`, with source, timing, defense, real pet and ordinary-policy regressions in `tests/kits/evelynnFizz.test.ts`.

## Pinned evidence

| Champion | Ability | Exact primary revision |
| --- | --- | --- |
| Evelynn | Empowered Whiplash | [3984296](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Empowered_Whiplash?oldid=3984296) |
| Evelynn | Whiplash | [3909221](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Whiplash?oldid=3909221) |
| Evelynn | Demon Shade | [4038334](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Demon_Shade?oldid=4038334) |
| Evelynn | Hate Spike | [4012756](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Hate_Spike?oldid=4012756) |
| Evelynn | Last Caress | [4006700](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Last_Caress?oldid=4006700) |
| Evelynn | Allure | [4064061](https://wiki.leagueoflegends.com/en-us/Template:Data_Evelynn/Allure?oldid=4064061) |
| Fizz | Playful | [4008451](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Playful?oldid=4008451) |
| Fizz | Trickster | [4007741](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Trickster?oldid=4007741) |
| Fizz | Nimble Fighter | [4042251](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Nimble_Fighter?oldid=4042251) |
| Fizz | Urchin Strike | [3948968](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Urchin_Strike?oldid=3948968) |
| Fizz | Chum the Waters | [4010638](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Chum_the_Waters?oldid=4010638) |
| Fizz | Seastone Trident | [4015181](https://wiki.leagueoflegends.com/en-us/Template:Data_Fizz/Seastone_Trident?oldid=4015181) |

Supplemental primary excerpts retain the same exact revisions. The Playful interruption note keeps its source's bug qualifier; it does not certify every interruption interaction. Game excerpts retain the exact object path, version `16.20.8248524+branch.releases-16-20.content.release`, URL and SHA-256. Evelynn's Q spike reads its 3000 initial speed, −4200 acceleration and 800 minimum speed from `Characters/Evelynn/Spells/EvelynnQAbility/EvelynnQLineMissile`; Fizz's R reads the exact lure missile's 80-unit width. These fields are independently attributed to their binaries, rather than asserted as primary wiki values. All consumed values and restrictions pass through `KitContext`; absent required evidence fails compilation.

## Evelynn

The fight starts without Demon Shade, empowerment, marks or Q recasts. Four seconds without a breaking action activates Shade, resets E and arms its empowered version. Its regeneration uses the dataset's level-20 extrapolation, **630 + 250% AP**, and the independently extrapolated healing rate; it never removes excess HP. Grievous Wounds reduces regeneration, which remains distinct from healing. Camouflage uses the actual observer's 700-unit detection range. Attack declaration and ordinary spell declaration break Shade; W leaves it intact. Champion and champion-class pet damage interrupt it for 1.5 seconds; ordinary minion/monster pet damage does not. R uses the separate 1.25-second return clock.

Q's initial dart creates three charges on its actual recipient and does not consume its newly created mark. Recasts use finite stock, haste-adjusted spacing and a decelerating piercing missile. Visibility is required, and a real visible pet may be selected when the champion cannot. Marks, charge decrements and guarded bonus packets belong to each actual contact; intercepting pets do not transfer their marks to their owner.

W marks through a spell shield without consuming it. A shield blocking the triggering spell preserves the mark. An immature mark grants the pinned slow; a mature mark applies MR reduction before the triggering packet and independently attempts charm. Consuming the mark refunds mana; either consumption or natural removal restarts its cooldown. The duel command interface selects the champion for this unit-targeted spell.

Ordinary E can be dodged or blocked, ignores blind and delivers on-hits only after its defenses. Empowered E ignores dodge and blind while respecting blocks, parry and spell shields. Its dash tracks the actual target, including a blink completed on its arrival tick. The source's estimated relocation of at least 2000 units instead ends at the previous target location. Target loss during the cast cancels without mana/cooldown cost and retains empowerment; target loss after commitment prevents contact without refund. Actual path pets receive their own area damage without primary on-hits, using each target's own HP and class for the monster cap. A per-dash callback updates the step after this tick's cast completions so that tracking does not use a stale pre-blink position.

R uses ordinary magic damage and selects its larger packet **strictly below 30% maximum HP**. This is damage, so invulnerability and resistances still matter. Untargetability begins at declaration and lasts through the separate delayed backwards blink. Direction is captured at declaration; damage and blink use separate clocks.

## Fizz

Nimble Fighter subtracts **4 + 1% AP** from each non-true pre-mitigation instance, capped at half the instance, and grants ghosting. Q keeps its fixed 550-unit dash and checks the original target's 200-unit displacement condition at completion. Its physical component alone uses life steal. W and R may overlay the dash; the approximate Q-to-E lockout is retained.

W resets the attack timer and arms a four-second empowered attack. Blind or dodge restores it only within the original window, including an actual pet attack; blocking consumes it and applies the source's passive bleed. The active packet is spell damage, the bleed is persistent damage and the five-second follow-up is proc damage. Cooldown begins on consumption or expiry. A qualifying kill gives the absolute one-second cooldown and mana refund. Q consumes the empowerment only after Q's defensive checks.

E balances until 0.75 seconds from declaration, then starts the separate half-second hop with its movement bonus. E2 becomes available after 0.15 seconds and lands with its smaller radius and no slow. Landing waits through stasis, including E2's waiting phase. The retained interruption note gives immediate targetable hopping after first-dash interruption, while second-dash interruption cancels splash. Each hop uses its own minimum/maximum distance and action state.

R's actual lure flight determines its tier: below 455, 455 through 910, or above 910 units. The initial lure attaches to the champion, while actual pets receive only the eventual area packet. A shielded interception or projectile wall/aura leaves a ground eruption at the actual contact/destruction position. The two-second clock starts when flight ends. Attached holders receive the pinned knockup; collateral pets use the ground knockback packet. Attached locations follow the holder. Launched lures and eruptions survive caster death.

## Explicit limits

- Neither these exact primary revisions nor the checked binaries quantify E's empowered dash speed or Fizz's Q/E dash speeds. They remain interruptible dash actions with earliest-tick arrival; no guessed speed is supplied. Tracking and interruption are meaningful at the simulator's 30 Hz resolution, but unquantified travel duration cannot reproduce every reaction window.
- Movement, Q paths, backwards cones and landing circles are projected onto one dimension. Evelynn's R radius and E's large-relocation threshold are explicitly estimated by the source. Terrain-specific blink relocation and lateral geometry remain outside the model.
- The wiki's Allure cast does not quantify delivery travel; its mark is applied at cast completion. Autonomous pet retargeting is limited to abilities with explicit support. Monsters, structures, Flash, external items and player deception are not supplied by this duel environment.
- Fizz's ordinary ground-shark knockback distance is sourced, but its travel duration is not; it moves on the earliest tick without inventing an airborne interval. Rebuttal-specific reflection/destruction has no separate shared projectile state, and Mel is not yet a simulator kit. The source-qualified Playful interruption bugs are not generalized to unsupported external abilities.
- Reference budgets value the additional Q marks, bleed and landing terms without assuming guaranteed kills, prepared stacks or repeated resets. Actual duels resolve misses, defense and cooldown states separately.

## Validation

The final focused pair suite passes **110 tests**, including live same-tick tracking, exact 2000-unit fallback, completion-time invalidation races, invalid-cast versus committed-target loss, reflected co-location cast directions, selective Shade pet classes, real Tibbers contacts, phased stasis, lure interception, target-local marks and bounded ordinary behavior. The combined champion/shared integration suite and full matrix are checked separately before private delivery. Golden fixtures, budgets and existing tolerances are unchanged.

The ordinary hold and short-trade policies reserve offensive R for both champions; completed trades retreat even when a spell is ready again. Evelynn waits in place for Allure while holding. Shared defensive reactions can still answer actual incoming threats. Nine additional mode checks include an otherwise usable R, rather than a vacuous cooldown lock.
