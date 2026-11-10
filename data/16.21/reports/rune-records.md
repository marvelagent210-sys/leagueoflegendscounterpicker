# Runes, patch 26.21

The runes and stat shards Summoner's Rift offers, which the loadout search will choose rune pages from (M8). Values by level are shown from level 1 to 20; duels are at level 20.

Sources: Data Dragon 16.21.1 (which runes Summoner's Rift offers, by path and row), the client's perk data from CommunityDragon 16.21.8342754+branch.releases-16-21.content.release (the stat shards' names and numbers), each rune's wiki data template and article, and the wiki pages [Rune](https://wiki.leagueoflegends.com/en-us/Rune?oldid=4091810), [Adaptive force](https://wiki.leagueoflegends.com/en-us/Adaptive_force?oldid=4063874), [Template:Adaptive](https://wiki.leagueoflegends.com/en-us/Template:Adaptive?oldid=4009298), [Template:Tip data/Adaptive damage](https://wiki.leagueoflegends.com/en-us/Template:Tip_data/Adaptive_damage?oldid=4015091).

## Cross-check

71 runes' paths and rows and shard values were compared with Data Dragon's and the client's. They all agree.

## Stat shards

| Slot | Options |
|---|---|
| Offense | Adaptive Force: 5.4 bonus attack damage or 9 ability power (adaptive); Attack Speed: 10% bonus attack speed; Ability Haste: 8 ability haste |
| Flex | Adaptive Force: 5.4 bonus attack damage or 9 ability power (adaptive); Move Speed: 2.5% bonus movement speed; Health Scaling: 10 – 180 (based on level) bonus health |
| Defense | Health: 65 bonus health; Tenacity and Slow Resist: 15% tenacity and slow resist; Health Scaling: 10 – 180 (based on level) bonus health |

## Substitutions

The runes a champion or mode gets in place of others, as the wiki's Rune article lists them:

- In modes without the river, Waterwalking is exchanged with Scorch.
- In modes without structures or where structures are impervious, Demolish is exchanged with Font of Life.
- In modes without wards, Deep Ward and Sixth Sense are exchanged with Grisly Mementos.
- For champions without mana, Manaflow Band is exchanged with Axiom Arcanist.
- For champions without mana nor energy, Presence of Mind is exchanged with Triumph.
- For champions without immobilizing effects, Aftershock is exchanged with Grasp of the Undying and Glacial Augment is exchanged with First Strike.
  - Yorick is an exception to this rule and considered to not have an immobilizing effect despite having an immobilize on his W.
- For champions that do not equip Flash, Hextech Flashtraption is exchanged with Cash Back.
- For Bel'Veth, Ultimate Hunter is exchanged with Relentless Hunter.
- For Samira, Ultimate Hunter is exchanged with Treasure Hunter.
- For Elise, Jayce, Nidalee and Zoe, Axiom Arcanist is exchanged with Nimbus Cloak.
- In URF:
  - Unsealed Spellbook is exchanged with First Strike.
  - Manaflow Band is exchanged with Axiom Arcanist.
  - Presence of Mind is exchanged with Triumph.
- In Ultimate Spellbook:
  - Unsealed Spellbook is exchanged with First Strike.

## Paths

### Domination

- Keystones: Electrocute, Dark Harvest, Hail of Blades
- Slot 1: Cheap Shot, Taste of Blood, Sudden Impact
- Slot 2: Sixth Sense, Grisly Mementos, Deep Ward
- Slot 3: Treasure Hunter, Relentless Hunter, Ultimate Hunter

#### Electrocute

cooldown 20; perk ID 8112; [Template:Rune data Electrocute revision 4060699](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Electrocute?oldid=4060699).

Passive: Damaging basic attacks, abilities, item effects, and summoner spells, as well as the application of crowd control and damage over time effects, apply stacks against enemy champions, up to one per cast instance per champion. Applying 3 stacks to a target within a 3 second period causes them to be struck by lightning after a 0.25-second delay, dealing them 70 – 260 (based on level) (+ 10% bonus AD) (+ 5% AP) of either physical or magic damage.
Variable Damage: This effect deals either physical or magic damage depending on the damage contribution from your attack damage and ability power to the effect's damage formula.Greater bonus damage from the AD ratio → Physical damageGreater bonus damage from the AP ratio → Magic damageIf the damage contribution of AD and AP are zero or otherwise equal, the damage type defaults to magic damage.

Notes from [Electrocute revision 4015230](https://wiki.leagueoflegends.com/en-us/Electrocute?oldid=4015230):

- Electrocute deals proc damage, and thus will not trigger spell effects.
- Electrocute can trigger while dead.
- Blind, Cripple, Drowsy, Kinematics, Nearsight, and Stasis do not count as valid crowd control for triggering stacks.
- Becoming untargetable during the 0.25-second delay will not prevent the effect from occurring.
- The 3 second timer is non-refreshing - the third stack has to be applied within 3 seconds of the first.
- R is special cased to apply a stack for the suppression application and the damage dealt.
- Razor Shuriken and Shadow Slash, when used together with Shadows, are special cased to generate a stack for each tick of damage.
- Tidecaller's Blessing damage instances beyond its first are special cased to not apply a stack.
- Effects that deal proc damage do not trigger a stack unless it is also tagged as pet damage.
  - Such effects can still trigger a stack if they apply a debuff (i.e Black Cleaver).

#### Dark Harvest

cooldown 35; perk ID 8128; [Template:Rune data Dark Harvest revision 4046509](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Dark_Harvest?oldid=4046509).

Passive: Dealing pet or non-proc damage against enemy champions below 50% of their maximum health deals 30 (+ 11 per Soul) (+ 10% bonus AD) (+ 5% AP) bonus adaptive damage and, after a 1.75-second delay, reap 1 Soul. This cannot occur again for 35 seconds, resetting to 1 second upon scoring a takedown against an enemy champion.
While not on cooldown, also reap 1 Soul from receiving the kill credit of a champion killed by a minion, monster, or turret.

Notes from [Dark Harvest revision 4015232](https://wiki.leagueoflegends.com/en-us/Dark_Harvest?oldid=4015232):

- Dark Harvest deals proc damage, and thus will not trigger spell effects.
- Dark Harvest will trigger on clones, but not zombies.
- Dark Harvest will not reap additional Souls during the delay before a Soul is gained.
- Dark Harvest does not trigger on damage lower than 2, excluding I (note).
- Dark Harvest does not trigger on proc damage (e.g. Scorch, Liandry's Torment, W), excluding E.

#### Hail of Blades

cooldown 10; perk ID 9923; [Template:Rune data Hail of Blades revision 4060661](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Hail_of_Blades?oldid=4060661).

Passive: Starting an attack windup against an enemy champion triggers Hail of Blades, and if the windup completes, you gain 2 stacks of the effect for 3 seconds, with the duration refreshing on basic attacks on-attack against enemy champions until all stacks are consumed. Stacks are consumed per basic attack on-attack and you generate an additional stack of the effect each time you activate an effect that has a basic attack reset, up to 2 times.
While Hail of Blades is active, you gain 90% (melee) / 60% (ranged) bonus attack speed, are allowed to exceed the attack speed cap, and basic attacks deal 2 – 20 (based on level) (+ 12% bonus AD) (+ 10% AP) bonus true damage. The triggering attack benefits from Hail of Blades.

Notes from [Hail of Blades revision 4088333](https://wiki.leagueoflegends.com/en-us/Hail_of_Blades?oldid=4088333):

- Hail of Blades deals proc damage, and thus will not trigger spell effects.
- Hail of Blades will generate additional stacks from attack resets only if the effect that triggered it has the Trait_AttackReset spell tag.
  - W, Primal Howl (recast), and Hextech Rocketbelt Supersonic all reset the user's basic attack timer upon their activation, but none of them have this tag. This causes them to be ineligible for generating an additional stack despite having an attack reset.
  - E and W have this tag but do not reset the caster's basic attack timer, allowing them to unintentionally generate an additional stack.
  - Q and Ferromancy: Mount Up have this tag and reset the caster's basic attack timer upon use, but do not properly generate an additional stack as expected.
    - These abilities were each assigned with the Trait_AttackReset tag in V26.09, and were documented as being fixed with Hail of Blades in the same patch, but the additional stack generation does not occur for either spell despite both having the tag.
- The duration of the stacks is not refreshed upon the user gaining an additional stack from having their attack timer reset.
- The additional stack will be generated from attack resets even if the user's basic attack is not on cooldown at the time of the attack reset instance.
- Q and Q are special cased to interact with Hail of Blades.
- The user's attack speed cap is increased to 90.0 for the duration, however this value is already beyond the technical limit for attack speed.
  - The effect is able to remove Glory in Death attack speed cap but is not able to remove Jhin, Graves nor Zeri.
- If the triggering attack's windup is cancelled, Hail of Blades will not grant the stacks and briefly goes on cooldown before resetting the cooldown timer.
  - The rune will play its effect ready VFX when this occurs, which is the VFX for when the cooldown times out normally.
- If an attack windup against an enemy champion is cancelled while Hail of Blades is active, the duration of the stacks is refreshed immediately and the user's next basic attack on-attack against an enemy champion will not be eligible for refreshing the duration. This may occur only once for each stack.
- The rune's tracker in the HUD calculates "percentage of Hail attacks landed", which is the percentage relative to the base number of Hail of Blades-empowered attacks (3). The tracker counts attack resets while the rune is active as valid, thus the percentage can be above 100%. This is intended.

#### Cheap Shot

cooldown 4; perk ID 8126; [Template:Rune data Cheap Shot revision 3992989](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Cheap_Shot?oldid=3992989).

Passive: Non-proc damage sources deal 10 – 49.1176470588 (based on level) bonus true damage to enemy champions affected by certain crowd control effects.
Valid Crowd Control: * Immobilizes * Blind * Disarm * Ground * Nearsight * Polymorph * Silence * Slow
The target must already be impaired prior to the damaging attack or spell in order to trigger the bonus damage.

Notes from [Cheap Shot revision 4023785](https://wiki.leagueoflegends.com/en-us/Cheap_Shot?oldid=4023785):

- Cheap Shot deals proc damage, and thus will not trigger spell effects.
- Cripple does not count as a valid crowd control for Cheap Shot.
- Cheap Shot checks the status of the potential target every time damage is dealt to an enemy champion, during the damage event's on-deal-pre-drain phase.
  - CC that is applied on-hit (e.g. Trample) will be there before this check occurs, CC that is applied on-pre-apply (e.g. Rylai's Crystal Scepter) will not. Either will be applied on the same game tick, but may belong to a different cast-instance than the damage (see rule below).
- Cheap Shot may not trigger on damage that is applied on the same game tick as a crowd control effect from the same cast instance.
  - If the target is already under the effects of crowd control, this does not apply.
    - This also occurs if the target is under the effect of CC from a neutral monster (e.g. Baron Nashor), despite Cheap Shot not triggering on non-teammate crowd control.
  - Abilities such as Lucent Singularity can apply a crowd control effect themselves and deal damage at a delay, skipping the same game tick rule and applying Cheap Shot on their own.
  - Once Cheap Shot has triggered on a cast instance, it clears this marker for the next time the same cast instance applies a crowd control effect.
- All Basic damage (Note: All damage with this damage tag, not only damage from basic attacks) is considered the same cast instance to Cheap Shot.
  - Because of this and the above, for instance Mystic Shot with Iceborn Gauntlet or Frost Shot will on its own be able to trigger Cheap Shot only every other time if it is the only attack to hit the enemy.
- Damage over time effects applied before a crowd control may also trigger Cheap Shot on a damage tick once an eligible effect has been applied.

#### Taste of Blood

cooldown 20; perk ID 8139; [Template:Rune data Taste of Blood revision 3997097](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Taste_of_Blood?oldid=3997097).

Passive: Damaging an enemy champion heals you for 16 – 42.8235294118 (based on level) (+ 10% bonus AD) (+ 5% AP).
Does not trigger at full health.

Notes from [Taste of Blood revision 3997098](https://wiki.leagueoflegends.com/en-us/Taste_of_Blood?oldid=3997098):

- If triggered whenever available, Taste of Blood restores on average 0.8 – 2.14117647059 (based on level) (+ 0.5% bonus AD) (+ 0.25% AP) health each second.

#### Sudden Impact

cooldown 10; perk ID 8143; [Template:Rune data Sudden Impact revision 3825916](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Sudden_Impact?oldid=3825916).

Passive: Dealing damage to an enemy champion within 4 seconds of using a dash or blink, or exiting from stealth, deals 20 – 80 (based on level) bonus true damage to them.

Notes from [Sudden Impact revision 4091670](https://wiki.leagueoflegends.com/en-us/Sudden_Impact?oldid=4091670):

- Sudden Impact deals proc damage, and thus will not trigger spell effects.
- Dashing, blinking or exiting stealth triggers a "Sudden Impact ready" (name paraphrased) buff that lasts for 4 seconds. Dealing damage to an enemy champion while this buff is active triggers a second buff with the actual effects, preventing "Sudden Impact ready" to be triggered again until it and the subsequent cooldown have run out.
  - Neither of the two buffs nor the cooldown is shown in the user's hotbar.
- "Dealing damage to an enemy champion" includes effects that deal 0 damage.
- "Dash or blink" includes potential zero range effects (e.g Q).
- The following effects can be used by any champion to ready Sudden Impact, allowing them to trigger the effect within the next 4 seconds:
  - Blast Cone
  - Hex-gates
  - Dash (summoner spell)
  - Flash
  - Hexflash
  - Teleport and Unleashed Teleport
  - Recall and Empowered Recall
  - Hextech Rocketbelt
  - Magical Journey (for any champion entering the tunnel)
  - Rootcaller dash (does not work if used at point-blank)
  - Curse of the Black Mist (as well as any champion entering Wraith Form)
  - Regurgitate (for both allies and enemies that are spat out)
  - Dark Passage dash
- The effect does not trigger on lunges, as they only cause the champion to move in closer to their target, not necessarily "dash" in the traditional sense.
- Emerging from outside the enemy vision (e.g. brush) does not ready Sudden Impact.

#### Sixth Sense

cooldown 250; range 900; perk ID 8137; [Template:Rune data Sixth Sense revision 4017988](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Sixth_Sense?oldid=4017988).

Passive: Upon moving near an un-tracked enemy ward, it is automatically tracked with a ward timer.
At level 11, also reveals the ward for 10 seconds upon being triggered.

Notes from [Sixth Sense revision 4017990](https://wiki.leagueoflegends.com/en-us/Sixth_Sense?oldid=4017990):

- On modes where wards are disabled, Sixth Sense is exchanged with Grisly Mementos.

#### Grisly Mementos

perk ID 8140; [Template:Rune data Grisly Mementos revision 3855346](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Grisly_Mementos?oldid=3855346).

Passive: Gain 6 trinket haste per Memento stack, up to 108 haste at maximum stacks.
Earn a Memento stack whenever scoring a champion takedown, up to 18 stacks.

Notes from [Grisly Mementos revision 3980962](https://wiki.leagueoflegends.com/en-us/Grisly_Mementos?oldid=3980962):

- In modes where wards are not available, each stack permanently grants 3 summoner spell haste instead, up to 54.

#### Deep Ward

perk ID 8141; [Template:Rune data Deep Ward revision 3855345](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Deep_Ward?oldid=3855345).

Passive: Stealth Wards and Totem Wards placed in the enemy jungle are considered Deep. All Deep wards are granted 1 bonus health, Deep Stealth Wards last 30 – 45 (based on level) seconds longer, and Deep Totem Wards last 45 – 150 (based on level) seconds longer.
At level 9, wards placed in the river will also be considered Deep.

Notes from [Deep Ward revision 3980963](https://wiki.leagueoflegends.com/en-us/Deep_Ward?oldid=3980963):

- In modes where wards are not available, Deep Ward is swapped for Grisly Mementos.

#### Treasure Hunter

perk ID 8135; [Template:Rune data Treasure Hunter revision 3825922](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Treasure_Hunter?oldid=3825922).

Gain 50 (+ 20 per Bounty Hunter stack) per unique takedown, up to 450 at 5 unique takedowns.
1st unique takedown: 50, 2nd: 70, 3rd: 90, 4th: 110, 5th: 130.
Earn a Bounty Hunter stack whenever scoring a takedown against an enemy champion, up to one per unique champion.

#### Relentless Hunter

perk ID 8105; [Template:Rune data Relentless Hunter revision 3825911](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Relentless_Hunter?oldid=3825911).

Passive: Gain 8 bonus movement speed while out of combat per Bounty Hunter stack, up to 40 at 5 stacks.
Earn a Bounty Hunter stack whenever scoring a takedown against an enemy champion, up to one per unique champion.

Notes from [Relentless Hunter revision 3980913](https://wiki.leagueoflegends.com/en-us/Relentless_Hunter?oldid=3980913):

- Relentless Hunter is immediately gained after 5 seconds of being out of combat.
- Relentless Hunter does not consider Blast Cone knockup to be a source of combat.

#### Ultimate Hunter

perk ID 8106; [Template:Rune data Ultimate Hunter revision 3825925](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Ultimate_Hunter?oldid=3825925).

Gain 6 (+ 5 per Bounty Hunter stack) ultimate haste, up to 31 at 5 stacks.
Earn a Bounty Hunter stack whenever scoring a takedown against an enemy champion, up to one per unique champion.

Notes from [Ultimate Hunter revision 4000983](https://wiki.leagueoflegends.com/en-us/Ultimate_Hunter?oldid=4000983):

- On Bel'Veth, Ultimate Hunter is exchanged with Relentless Hunter.
- On Samira, Ultimate Hunter is exchanged with Treasure Hunter.
- Ultimate Hunter will affect both cooldowns and recharge timers on abilities such as Noxious Trap.
- Ultimate Hunter stacks additively with other sources of haste.

### Inspiration

- Keystones: Glacial Augment, Unsealed Spellbook, First Strike
- Slot 1: Hextech Flashtraption, Magical Footwear, Cash Back
- Slot 2: Triple Tonic, Time Warp Tonic, Biscuit Delivery
- Slot 3: Cosmic Insight, Approach Velocity, Jack of All Trades

#### Glacial Augment

cooldown 25; perk ID 8351; [Template:Rune data Glacial Augment revision 4033154](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Glacial_Augment?oldid=4033154).

Passive: Immobilizing an enemy champion will cause 3 glacial rays to emanate from them towards you and other nearby enemy champions, creating icy zones with a 700 unit radius that last for 3 (+ 100% of the immobilizing effect's duration) seconds.
Enemies within the icy zones, which have a width of 80 units, are slowed by 20% (+ 7% per 100 bonus AD) (+ 6% per 100 AP) (+ 9% per 10% heal and shield power) and have their damage reduced by 15% against your allies, excluding yourself.

Notes from [Glacial Augment revision 4015113](https://wiki.leagueoflegends.com/en-us/Glacial_Augment?oldid=4015113):

- On champions without immobilizing effects and Yorick, Glacial Augment is exchanged with First Strike.
- Glacial Augment will not activate if the immobilizing effect was applied to a target that is displacement immune.

#### Unsealed Spellbook

cooldown 245 – 120 (based on unique swaps); perk ID 8360; [Template:Rune data Unsealed Spellbook revision 3960876](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Unsealed_Spellbook?oldid=3960876).

Passive: While not channeling Teleport and being out-of-combat for 5 seconds, you can swap one of your equipped summoner spells to a new, single use summoner spell. You cannot select a summoner spell you have already equipped.
Your first swap becomes available at 360. Swaps have an initial cooldown of 270 seconds; selecting a unique summoner spell reduces the swap cooldown by 25 seconds. You must swap to 3 different summoner spells before returning to one you have already used.
Selecting a summoner spell places it on a 5-second cooldown. Using a selected summoner spell places the summoner spell in the same slot on a 10-second cooldown.

Notes from [Unsealed Spellbook revision 4059845](https://wiki.leagueoflegends.com/en-us/Unsealed_Spellbook?oldid=4059845):

- The original summoner spells continue cooling down in the background while swapped out.
- The swap cooldown is static and thus is unaffected by summoner spell haste.
- There is no time limit for swapped summoner spells; they will remain within the summoner spell slot until they are used.
- Selecting Smite will not grant access to jungle-exclusive items (Gustwalker Hatchling, Mosstomper Seedling, and Scorchclaw Pup).
  - Swapping Smite out for another summoner spell does not prevent access to those items and does not remove their effects.
- If Smite was not one of the user's original summoner spells, its damage is modified to 600 / 600 / 1000 (based on number of swaps).
  - The in-game tooltip always says it deals 600 damage even if it does more.
  - The in-game tooltip says Smite requires 2 swaps for the damage to be increased, but its damage will only be increased if it is the third (or later) spell to be swapped.
  - Swapping while Smite is already equipped will not affect the current damage.
  - Selecting or swapping back to Smite will not place it on cooldown.
- Selecting Teleport after 10:00 will grant Unleashed Teleport instead.
  - If Teleport is currently being swapped to, it can transform into its unleashed version after 10:00.
  - If Teleport is swapped out for a selected summoner spell, the transformation will take place after it returns to the spell slot.
- Selecting Teleport is possible before completing the top lane role quest, but it becomes locked after completion.
  - If Teleport is selected before completing the quest, it will remain usable after completion.
    - However, if the quest Teleport is used, the selected Teleport will swap back to the original summoner spell prematurely.
    - Neither Teleport will be empowered to grant a shield.
- If Hexflash is swapped out for another summoner spell and Flash comes off cooldown, the selected summoner spell will be automatically swapped back to Flash.
- On the Hunt of the Blood Moon, Ultra Rapid Fire, and Ultimate Spellbook mode, Unsealed Spellbook is exchanged with First Strike.
- Inputting a non-modifier key, or a (modifier-inclusive) key combination, even if its action is invalid and/or it is not bound to any event, will cause the menu to close.
- The available summoner spells to pick from are:

#### First Strike

cooldown 25 – 15 (based on level); perk ID 8369; [Template:Rune data First Strike revision 4058238](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_First_Strike?oldid=4058238).

Passive: Initiating combat with an enemy champion within the first 0.25 seconds of champion combat, grants 10 and First Strike for 3 seconds, causing all of your post-mitigation damage dealt against champions to deal 7% bonus true damage. Afterwards, you are granted gold equal to 50% (melee) / 35% (ranged) of all bonus damage dealt within the duration.
First Strike will be placed on full cooldown without activating its effects after being struck by an enemy champion before you strike them.

Notes from [First Strike revision 4065516](https://wiki.leagueoflegends.com/en-us/First_Strike?oldid=4065516):

- First Strike deals proc damage, additionally tagged as indirect damage, and thus will not trigger spell effects.
  - Unlike damage modifiers, First Strike does not inherit damage tags from the source.
- On champions without immobilizing effects, Glacial Augment is exchanged with this.
- "Initiating combat" includes effects that deal 0 damage.
- First Strike's bonus damage will trigger from all damage types, including true damage.
- First Strike goes on cooldown upon its activation.
- The triggering instance of damage will also benefit from First Strike's bonus damage.
- First Strike will benefit from damaging multiple champions in combat.
- First Strike will fire a missile at the target for each instance of damage dealt to them per cast instance while the effect is active.
  - This missile has a fixed travel time of 0.4 seconds.
    - The first instance of bonus damage by First Strike is dealt after the same delay.
  - This missile does not determine the rune's effects.
  - If multiple targets are damaged at the same time, the missile will be sent towards the first target hit.
  - This missile causes the user to be revealed briefly.

#### Hextech Flashtraption

cooldown 20; range 200 – 400 (based on channel time); perk ID 8306; [Template:Rune data Hextech Flashtraption revision 4011828](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Hextech_Flashtraption?oldid=4011828).

Passive: While Flash has a remaining cooldown greater than 2 seconds, it is replaced by Hexflash.
Active: You begin charging for up to 2 seconds, setting your movement speed to a static 0, and increasing Hexflash's range over the duration. After at least 1 second, you can reactivate the spell, which is automatically done so when the charge completes without reactivation. Releasing the charge earlier than 1 second or entering combat with an enemy champion will put Hexflash on cooldown for 10 seconds.
Recast: You blink to the target location within range and gain 50% bonus movement speed for up to 0.25 seconds.
Uses Quick Casting by default, which requires the Active to be held and the Recast to occur on release.

Notes from [Hextech Flashtraption revision 4003846](https://wiki.leagueoflegends.com/en-us/Hextech_Flashtraption?oldid=4003846):

- Hexflash is disabled while grounded, rooted, or unable to cast.
- Hextech Flashtraption is replaced with Cash Back if the user has not equipped Flash.
- When Flash is used, Hexflash also incurs its own cooldown before becoming usable.
- Hextech Flashtraption does not consider Blast Cone knockup to be a source of combat.
- If Hexflash is being channeled and Flash cooldown ends, the user may still recast despite losing Hexflash, and doing so will still incur the cooldown afterwards.
- Hexflash's cooldown (and halved cooldown for entering combat) is reduced by summoner spell haste.
- Hexflash has no cast time, like most charged channels.
- The following table refers for interactions while the user is channeling Hexflash:

#### Magical Footwear

perk ID 8304; [Template:Rune data Magical Footwear revision 3825896](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Magical_Footwear?oldid=3825896).

Passive: After 12 minutes (reduced by 45 seconds whenever scoring a takedown against an enemy champion), you gain Slightly Magical Boots for free. Slightly Magical Boots are identical to Boots and can be upgraded as if it were the item. If the inventory is full while receiving the boots, they will appear as soon as a slot in the inventory is available.
Additionally, your boots grant an additional 10 bonus movement speed.
You cannot purchase Boots nor any Tier-2 boots prior to obtaining Slightly Magical Boots.

Notes from [Magical Footwear revision 3986720](https://wiki.leagueoflegends.com/en-us/Magical_Footwear?oldid=3986720):

- If sold, they can be re-purchased via purchasing Boots in the shop. Purchased tier-2 boots are also always slightly magical.

#### Cash Back

perk ID 8321; [Template:Rune data Cash Back revision 3989897](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Cash_Back?oldid=3989897).

Passive: Upon purchasing a Legendary item, you are automatically refunded 7.5% of its total gold cost.
Selling or undoing the item's purchase will cancel the refund, reducing your current gold equal to the refunded amount.

Notes from [Cash Back revision 3991600](https://wiki.leagueoflegends.com/en-us/Cash_Back?oldid=3991600):

- Guardian items do not count as Legendary items for Cash Back.

#### Triple Tonic

perk ID 8313; [Template:Rune data Triple Tonic revision 3961243](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Triple_Tonic?oldid=3961243).

Passive: Gain an Elixir upon reaching each of the following levels: * Level 3: Elixir of Avarice * Level 6: Elixir of Force * Level 9: Elixir of Skill
If the inventory is full upon the user becoming eligible to receive Elixir of Avarice or Elixir of Force, each item will be granted as soon as an empty slot is available. If the inventory is full upon becoming eligible to receive Elixir of Skill, the item is consumed automatically.

#### Time Warp Tonic

perk ID 8352; [Template:Rune data Time Warp Tonic revision 3825920](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Time_Warp_Tonic?oldid=3825920).

Passive: Upon consuming a potion (Health PotionRefillable Potion), you additionally heal equal to 40% of its total health restoration.
If a health potion is consumed while one is already active, this effect will trigger on the activation of the next potion once the restoration of the current one ends.

Notes from [Time Warp Tonic revision 3980957](https://wiki.leagueoflegends.com/en-us/Time_Warp_Tonic?oldid=3980957):

- Time Warp Tonic activates on the following consumables:
  - Health Potion: Heals the user for 48.
  - Refillable Potion: Heals the user for 40.

#### Biscuit Delivery

perk ID 8345; [Template:Rune data Biscuit Delivery revision 4037523](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Biscuit_Delivery?oldid=4037523).

Passive: Receive a Total Biscuit of Everlasting Will at 2:00, 4:00, and 6:00. If the inventory is full while receiving a biscuit, the biscuit(s) will appear as soon as a slot in the inventory is available.
Consuming a Biscuit will permanently increase your maximum health by 30, in addition to its effects. You will also gain the increased health if you sell the biscuit for 5.

Notes from [Biscuit Delivery revision 3980958](https://wiki.leagueoflegends.com/en-us/Biscuit_Delivery?oldid=3980958):

- Health gained from Biscuit Delivery is considered bonus health.
  - Undoing the selling of a biscuit will remove the bonus health.
- Gaining the effect's bonus health does not increase the user's current health.

#### Cosmic Insight

perk ID 8347; [Template:Rune data Cosmic Insight revision 3825866](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Cosmic_Insight?oldid=3825866).

Passive: Gain 18 summoner spell haste and 10 item haste.

#### Approach Velocity

perk ID 8410; [Template:Rune data Approach Velocity revision 3980961](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Approach_Velocity?oldid=3980961).

Passive: Gain 7.5% bonus total movement speed while facing visible enemy champions that are immobilized, grounded, or slowed within 1000 range.
This bonus is doubled to 15% and does not have a range cap nor require vision toward enemy champions whose movement you impaired when they were visible.

Notes from [Approach Velocity revision 3980960](https://wiki.leagueoflegends.com/en-us/Approach_Velocity?oldid=3980960):

- Impaired champions in a 180° total angle towards the user's facing direction are valid targets.
  - The movement speed buff is granted even if the user is standing still.
- Approach Velocity does not trigger from Drowsy, despite being a movement impairment.
- Approach Velocity has weird conditions in regards to sight of the enemy.
- Approach Velocity works against movement-impaired enemies that are impaired by a source not allied to you (e.g. by Ocean Drake or themselves).
- The movement speed bonus is updated based on the user's facing direction every 0.5 seconds.
- The movement speed bonus can linger for up-to 0.25 seconds after the crowd control ends (or is removed) as a consequence of champion stats only being updated periodically.

#### Jack of All Trades

perk ID 8316; [Template:Rune data Jack of All Trades revision 4046578](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Jack_of_All_Trades?oldid=4046578).

Passive: Earn 1 Jack stack for each unique stat type currently gained from items.
Jack: For each Jack stack, gain 1 ability haste. At 5 Jack stacks, gain 4.8 bonus attack damage or 8 ability power (adaptive). At 10 Jack stacks, gain an additional 7.2 bonus attack damage or 12 ability power (adaptive), for a total of 12 bonus attack damage or 20 ability power (adaptive) at 10 Jack stacks.

Notes from [Jack of All Trades revision 4047523](https://wiki.leagueoflegends.com/en-us/Jack_of_All_Trades?oldid=4047523):

- Stats granted from some item effects (e.g Sterak's Gage, Yun Tal Wildarrows) count as a valid innate stat for gaining Jack stacks, while other stat granting effects (e.g Endless Hunger Famine) will not count as a valid innate stat.
- The following of each stat are eligible for granting a Jack stack:
  - Attack damage
  - Attack range *
  - Attack speed
  - Ability haste
  - Ability power
  - Armor
  - Percentage armor penetration
  - Critical strike chance
  - Critical strike damage
  - Gold generation
  - Heal and shield power
  - Health
  - Base health regeneration
  - Life steal
  - Lethality
  - Flat magic penetration
  - Percentage magic penetration
  - Magic resistance
  - Mana
  - Base mana regeneration
  - Flat movement speed
  - Percentage movement speed
  - Omnivamp
  - Tenacity
- The following stat types are ineligible for granting a Jack stack:
  - Adaptive force *
  - Physical vamp *
  - Slow resist *
  - Spell vamp *

### Precision

- Keystones: Press the Attack, Lethal Tempo, Fleet Footwork, Conqueror
- Slot 1: Absorb Life, Triumph, Presence of Mind
- Slot 2: Legend: Alacrity, Legend: Haste, Legend: Bloodline
- Slot 3: Coup de Grace, Cut Down, Last Stand

#### Press the Attack

cooldown 6; perk ID 8005; [Template:Rune data Press the Attack revision 4015574](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Press_the_Attack?oldid=4015574).

Passive: Basic attacks on-hit against enemy champions apply a stack for 4 seconds, refreshing on subsequent applications, expiring upon attacking a new champion, and stacking up to 3 times. The third stack consumes all stacks to deal 40 – 174.117647059 (based on level) bonus adaptive damage and grant you 8% increased damage against champions until 5 seconds after exiting combat with them.

Notes from [Press the Attack revision 4082445](https://wiki.leagueoflegends.com/en-us/Press_the_Attack?oldid=4082445):

- Press the Attack's adaptive damage deals proc damage, and thus will not trigger spell effects.
- The damage dealt by Press the Attack is not affected by on-hit damage modifiers.
- Application is individually tracked and does not interact among multiple users.
- Effects that allow the application of on-hit effects multiple times in one issued attack (e.g. Lightslinger, Ruthless Predator, Guinsoo's Rageblade) will also apply additional stacks of Press the Attack.
- With the exception of W, AoE on-hit attacks are excluded from interacting with Press the Attack (e.g Runaan's Hurricane, Statikk Shiv, Empowered Whiplash, I and R, E secondary targets, Alpha Strike, Q secondary targets, Q secondary targets).
  - In addition, with the exception of R [https://m.youtube.com/watch?v=Ud6j2x7TUjA], multi-target attacks not tagged AoE will attempt to apply stacks on every target, causing the stacks to reset on every target (e.g E, I, Q, I, Q).
- The basic attack that triggers Press the Attack's third stack does not benefit from the increased damage.
- Press the Attack's adaptive damage is not affected by on-hit effect modifiers (e.g. Heroic Swing, Purge).
  - However, any damage over time or follow-up effects that come with the basic attack will be affected (e.g. Hemorrhage, Toxic Shot and every follow-up Tentacle Slams).
  - Damage dealt on the same frame that the buff is gained will not be amplified.
  - The triggering Press the Attack proc does not benefit from the increased damage but future procs that occur while affected by the damage buff will.

#### Lethal Tempo

perk ID 8008; [Template:Rune data Lethal Tempo revision 4065934](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Lethal_Tempo?oldid=4065934).

Passive: Basic attacks on-attack against enemy champions grant a stack for 6 seconds, refreshing on subsequent attacks and stacking up to 6 times. Gain 6% (melee) / 4.8% (ranged) bonus attack speed for each stack, up to 36% (melee) / 28.8% (ranged) at maximum stacks.
At maximum stacks, basic attacks are empowered to fire a bolt at the target on-attack that deals them 9 – 30 (based on level) (melee) / 6.003 – 20.01 (based on level) (ranged) bonus adaptive damage upon arrival, increased by 1% per 1% bonus attack speed.
When the duration ends, one stack expires immediately and the rest expire one by one every 0.3 seconds.

Notes from [Lethal Tempo revision 4060427](https://wiki.leagueoflegends.com/en-us/Lethal_Tempo?oldid=4060427):

- Lethal Tempo's bolt deals proc damage, and thus will not trigger spell effects.
- Ranged values are derived from the melee ones: bonus attack speed per stack is multiplied by 0.8, and the bolt's damage by 0.667. The 1% per 1% bonus attack speed scaling applies to each champion's own base value and is unmodified.
  - These follow the champion's current form. Jayce switching between Hammer and Cannon changes them immediately, including for stacks already held.
  - The rune's description text lists the ranged damage as 6 to 24, higher than what is dealt. The description applies the attack speed multiplier (0.8) to the damage instead of the damage multiplier (0.667). The values above are the ones actually dealt.
- Lethal Tempo's own attack speed stacks count toward the bonus attack speed that scales the bolt.
  - Because of this, reading the hover tooltip before gaining maximum stacks, will show less damage than the bolt will deal once it can fire at maximum stacks.
- The bolt scales with the bonus attack speed stat itself, not with how fast the champion actually attacks. Attack speed above the attack speed cap still increases the damage even though it grants no additional attacks.
- The rune's damage tracker reports damage dealt after resistances.

#### Fleet Footwork

perk ID 8021; [Template:Rune data Fleet Footwork revision 4051351](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Fleet_Footwork?oldid=4051351).

Energized: Moving and basic attacking generates Charges, up to 100.
At 100 Charges, become Energized, empowering your next basic attack to heal you for 15 – 160 (based on level) (melee) / 9 – 96 (based on level) (ranged) (+ 10% (melee) / 6% (ranged) bonus AD) (+ 5% (melee) / 3% (ranged) AP) and grant 20% (melee) / 15% (ranged) bonus movement speed for 1 second. Against minions, the healing is 15% effective.

Notes from [Fleet Footwork revision 4052588](https://wiki.leagueoflegends.com/en-us/Fleet_Footwork?oldid=4052588):

- Fleet Footwork will not be consumed against wards or jungle plants.

#### Conqueror

perk ID 8010; [Template:Rune data Conqueror revision 4060685](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Conqueror?oldid=4060685).

Passive: Dealing damage to enemy champions generates stacks of Conqueror, lasting for 5 seconds, refreshing on subsequent damage against champions, and stacking up to 12 times. Gain 2 (melee) / 1 (ranged) stacks for basic damage on-hit. Otherwise, gain 2 stacks for any damage that is neither basic nor non-pet proc damage, up to once every 4 seconds per cast instance.
Each stack of Conqueror grants 1.08 – 2.4 (based on level) bonus attack damage or 1.8 – 4 (based on level) ability power (adaptive), up to 12.96 – 28.8 (based on level) bonus attack damage or 21.6 – 48 (based on level) ability power (adaptive) at maximum stacks, at which you also heal for 8% (melee) / 5% (ranged) of the post-mitigation damage dealt against enemy champions.

Notes from [Conqueror revision 4085479](https://wiki.leagueoflegends.com/en-us/Conqueror?oldid=4085479):

- Conqueror will grant stats based on the level of the user at the time of generating its first stack, even if more stacks are generated.
- Some ranged on-hit basic ability damage will grant 2 stacks of Conqueror (i.e W, Q, Q), others will grant only 1 (i.e Q, Q, Q), regardless of the damage belonging to an ability cast instance.
- Conqueror's stacking can only occur once per cast instance.
  - For example, the fire waves from Divine Ascent share the cast instance with its triggering basic attack. This means it can only trigger a stack of Conqueror once per attack instead of the expected twice.
  - Abilities that apply a separate cast instance per hit will grant multiple stacks as normal.
  - In addition, Judgment, and Cyclone have been special cased to stack Conqueror for every tick of damage.
    - Other similar effects are not special cased (e.g E, R, Q, R).
  - While basic damage on-hit can stack multiple times regardless of cast instance, Q is the only multi on-hit effect that doesn't do so for being a single cast instance and for not being basic damage.
  - If Darkness Rise is activated through either Obliterate or Death's Grasp, it will be treated as the same cast instance as the triggering spell and it will not stack Conqueror.
- Conqueror will not stack or refresh from these specific effects.
  - Basic damage from pets (i.e. Annie Tibbers attack, Malzahar Voidling and Yorick Maiden of the Mist attack).
    - Daisy attacks apply Ivern on-hit effects, and therefore generate 1 stack of Conqueror per attack.
  - Basic damage that does not trigger on-hit effects (I cone).
  - Attacks done by clones, as they are accredited to the clone.
  - Runaan's Hurricane Wind's Fury bolts, which are special cased to not stack Conqueror despite dealing basic damage that can trigger on-hit effects (this includes special modifiers of Wind's Fury, such as on Infernum cones, Q volleys, Q Fishbones attack).
  - Attacks which are dodged or missed while the user is blinded.
  - Attacks against an invulnerable target.
  - The automatic basic attack following Dash if it already stacked Conqueror.
- Conqueror will stack or refresh for these specific effects.
  - W cone effect, as the only AoE non-spell damage that isn't tagged as proc damage.
  - Default / raw damage
    - Including The Collector Death - although it shares a cast instance with the ability that triggered it, meaning it can only stack Conqueror if triggered by a damage over time effect at least 4 seconds after the effect's initial application.
  - Attacks which are blocked.

#### Absorb Life

perk ID 9101; [Template:Rune data Absorb Life revision 3997095](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Absorb_Life?oldid=3997095).

Passive: Killing an enemy heals you for 1 – 27 (based on level).

#### Triumph

perk ID 9111; [Template:Rune data Triumph revision 3825924](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Triumph?oldid=3825924).

Passive: Scoring a takedown against an enemy champion heals you for 2.5% of your maximum health (+ 5% of your missing health) and grants you an additional 20, both after a 1-second delay.

Notes from [Triumph revision 3980916](https://wiki.leagueoflegends.com/en-us/Triumph?oldid=3980916):

- The healing is calculated based on your missing health at the moment the takedown happened.
  - If during the delay another takedown is achieved, all pending Triumph heals have their calculated value updated to the new amount, which is of course based on your missing health at the moment the latest takedown happened.
- A missile with a fixed travel time of 1 seconds handles the delay and functionally triggers the benefits.
  - The missile is set as unblockable, which means that it isn't destroyed by colliding with effects such as Wind Wall.
  - The missile can be popped by effects that (unintentionally) destroy missiles from their own team aimed at them such as Trickster or Frozen Tomb. This will prevent both the bonus gold and healing from being received.

#### Presence of Mind

perk ID 8009; [Template:Rune data Presence of Mind revision 3985219](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Presence_of_Mind?oldid=3985219).

Passive: Scoring a takedown against an enemy champion restores 15% of your maximum mana or 15% of your maximum energy after a 1-second delay.
Damaging an enemy champion restores 6 – 44 (based on level) (melee) / 4.8 – 35.2 (based on level) (ranged) mana or 6 energy (8 second cooldown).

Notes from [Presence of Mind revision 4062635](https://wiki.leagueoflegends.com/en-us/Presence_of_Mind?oldid=4062635):

- Presence of Mind will be consumed even if the user is at maximum mana.
- On the Ultra Rapid Fire mode and for champions that do not use mana nor energy as a resource, Presence of Mind is exchanged with Triumph.
- On takedowns, champions that use energy as a resource restore 30 energy, increased to 60 energy for Shen and 42 energy for Akali while Twilight Shroud is active.

#### Legend: Alacrity

perk ID 9104; [Template:Rune data Legend: Alacrity revision 3958705](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Legend:_Alacrity?oldid=3958705).

Passive: Gain 3% (+ 1.5% per Legend stack) bonus attack speed, up to 18% at maximum stacks.
Legend: Gain Legend stacks for every 100 points earned, up to 10: * 100 points for champion takedowns * 100 points for epic monster takedowns * 25 points for large monster kills * 4 points for minion kills

Notes from [Legend: Alacrity revision 3980881](https://wiki.leagueoflegends.com/en-us/Legend:_Alacrity?oldid=3980881):

- The gold value of Legend: Alacrity goes from Expression error: Unexpected end of expression at 0 stacks (3% attack speed) to Expression error: Unexpected end of expression at 10 stacks (18% attack speed).

#### Legend: Haste

perk ID 9105; [Template:Rune data Legend: Haste revision 3958696](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Legend:_Haste?oldid=3958696).

Passive: Gain ability haste 1.5 basic ability haste per Legend stack, up to 15 at maximum stacks.
Legend: Gain Legend stacks for every 100 points earned, up to 10: * 100 points for champion takedowns * 100 points for epic monster takedowns * 25 points for large monster kills * 4 points for minion kills

#### Legend: Bloodline

perk ID 9103; [Template:Rune data Legend: Bloodline revision 3971359](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Legend:_Bloodline?oldid=3971359).

Passive: Gain 0.45% life steal per Legend stack, up to 6.75% at maximum stacks, at which you also gain 85 bonus health.
Legend: Gain Legend stacks for every 100 points earned, up to 15: * 100 points for champion takedowns * 100 points for epic monster takedowns * 25 points for large monster kills * 4 points for minion kills

Notes from [Legend: Bloodline revision 4021767](https://wiki.leagueoflegends.com/en-us/Legend:_Bloodline?oldid=4021767):

- The gold efficiency of Legend: Bloodline goes from 0 at 0 stacks (0% life steal) to Expression error: Unexpected operator round at 15 stacks ( × 6.75% life steal and Expression error: Unexpected operator round × 85 health).

#### Coup de Grace

perk ID 8014; [Template:Rune data Coup de Grace revision 3859780](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Coup_de_Grace?oldid=3859780).

Passive: Deal 8% increased damage to champions below 40% maximum health.

Notes from [Coup de Grace revision 3860002](https://wiki.leagueoflegends.com/en-us/Coup_de_Grace?oldid=3860002):

- Coup de Grace only triggers on damage dealt after the champion is brought below 40% health.

#### Cut Down

perk ID 8017; [Template:Rune data Cut Down revision 3859781](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Cut_Down?oldid=3859781).

Passive: Deal 8% increased damage to champions above 60% maximum health.

#### Last Stand

perk ID 8299; [Template:Rune data Last Stand revision 3859782](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Last_Stand?oldid=3859782).

Passive: Deal 5% increased damage to champions while below 60% maximum health. This increases further based on your missing health, up to 11% increased damage while below 30% maximum health.

Notes from [Last Stand revision 3926332](https://wiki.leagueoflegends.com/en-us/Last_Stand?oldid=3926332):

- Last Stand increases your damage output by 0% – 11% (based on missing health).

### Resolve

- Keystones: Grasp of the Undying, Aftershock, Guardian
- Slot 1: Demolish, Font of Life, Shield Bash
- Slot 2: Conditioning, Second Wind, Bone Plating
- Slot 3: Overgrowth, Revitalize, Unflinching

#### Grasp of the Undying

perk ID 8437; [Template:Rune data Grasp of the Undying revision 4058228](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Grasp_of_the_Undying?oldid=4058228).

Passive: Entering combat generates 1 stack every second for the next 3 seconds, refreshing the duration with each instance of combat and stacking the effect up to 4 times. At maximum stacks, your next basic attack on-hit within 5 seconds against an enemy champion consumes all stacks to deal bonus magic damage equal to 3.5% (melee) / 1.4% (ranged) of your maximum health, heal you for 1.3% (melee) / 0.52% (ranged) of your maximum health), and permanently grant you 5 (melee) / 2 (ranged) bonus health.

Notes from [Grasp of the Undying revision 4052352](https://wiki.leagueoflegends.com/en-us/Grasp_of_the_Undying?oldid=4052352):

- Grasp of the Undying deals proc damage, and thus will not trigger spell effects.
- The damage dealt by Grasp of the Undying is not affected by on-hit damage modifiers.
- On champions without immobilizing effects and Yorick, Aftershock is exchanged with this.
- It takes ~6 procs to increase the damage by 1 when using a melee champion, and ~16 procs when using a ranged champion.
- It takes ~16 procs to increase the healing by 1 when using a melee champion, and ~43 procs when using a ranged champion.

#### Aftershock

cooldown 20; perk ID 8439; [Template:Rune data Aftershock revision 4022990](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Aftershock?oldid=4022990).

Passive: Immobilizing an enemy champion grants you a static 45 (+ 75% bonus armor) bonus armor and 45 (+ 75% bonus magic resistance) bonus magic resistance for 2.5 seconds. The bonus resistances are each capped at 80 – 150 (based on level).
After the duration, you release a shockwave that deals 25 – 120 (based on level) (+ 8% of your bonus health) magic damage to enemy champions and monsters within a 350 radius.

Notes from [Aftershock revision 4023199](https://wiki.leagueoflegends.com/en-us/Aftershock?oldid=4023199):

- Aftershock deals area damage, additionally tagged as proc, and thus will apply spell effects.
- On champions without immobilizing effects and Yorick, Aftershock is exchanged with Grasp of the Undying.
- Aftershock's bonus resistances do not scale dynamically; it only benefits from the bonus at the time of its trigger (excluding the base bonus).
- Bonus armor from Aftershock will cap when you have 56.25 – 143.75 (based on level) bonus armor.
- Bonus magic resistance from Aftershock will cap when you have 56.25 – 143.75 (based on level) bonus magic resistance.
- Aftershock will not activate if the immobilizing effect was applied to a target that is displacement immune. [https://youtu.be/7gFREl8X24U]

#### Guardian

cooldown 75 – 40 (based on level); range 350 / Global; perk ID 8465; [Template:Rune data Guardian revision 4022993](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Guardian?oldid=4022993).

Passive: While within 350 units of an allied champion, you raise your Guard. Allied champions you affect with unit-targeted abilities are also Guarded for 3 seconds, regardless of distance.
If you or a Guarded ally would take 50 – 165 (based on level) damage within 2.5 seconds or lethal damage from an enemy champion, monster or turret, you both gain a shield for 40 – 150 (based on level) (+ 20% of your AP) (+ 6% of your bonus health) for 2 seconds.
Guardian only goes on cooldown when the shield is triggered.

Notes from [Guardian revision 4022966](https://wiki.leagueoflegends.com/en-us/Guardian?oldid=4022966):

- Guardian does not trigger from Heal, Aria of Perseverance nor Prismatic Barrier. However, Dark Passage triggers Guardian when cast on an allied champion.
- Despite being a unit-targeted ability, You and Me! does not apply Guard. However, Guardian will still trigger if she is within range of the targeted ally.
- Guardian cannot trigger if the user is dead.

#### Demolish

cooldown 30; perk ID 8446; [Template:Rune data Demolish revision 4058470](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Demolish?oldid=4058470).

Passive: Basic attacks on-hit against turrets apply a stack of Demolish, stacking up to 3 times. The third stack against a turret consumes them all to deal 85 (melee) / 50 (ranged) (+ 28% (melee) / 20% (ranged) of your maximum health) bonus physical damage.
Demolish cannot be triggered on the same turret by any of its users more than once every 3 seconds.

Notes from [Demolish revision 4058471](https://wiki.leagueoflegends.com/en-us/Demolish?oldid=4058471):

- Demolish deals proc damage and is tagged as basic damage, and thus will not trigger spell effects.
- Stacks on turrets do not expire once applied; they last indefinitely until the user consumes the turret's stacks.
- Stacks can be applied to multiple turrets at a time as long as Demolish is not on cooldown.
  - Once the user triggers Demolish on a turret, however, the lingering stacks on all other turrets will be removed.
- On modes where there are no structures or they are not targetable, Demolish is exchanged with Font of Life.
- Multiple users of Demolish can apply stacks against the same turret, with the stacking tracked individually per user.
- In the game, Demolish damage is incorrectly displayed as a real critical strike.

#### Font of Life

cooldown 20; perk ID 8463; [Template:Rune data Font of Life revision 3996429](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Font_of_Life?oldid=3996429).

Passive: Slowing or immobilizing an enemy champion heals you and the nearest and most wounded allied champion within 1000 units for 10 – 50 (based on level) (melee) / 7 – 35 (based on level) (ranged).

Notes from [Font of Life revision 4015111](https://wiki.leagueoflegends.com/en-us/Font_of_Life?oldid=4015111):

- Font of Life will trigger if the user has no allies nearby, and triggers even while 100% maximum health.
  - Total healing listed in the Runes panel increases whether or not any actual healing was made.
- Font of Life will not grant assist credit.
- Since V13.23, Corki in particular always exchanges Font of Life with Demolish.
- Interacts like expected with healing-modifiers like Grievous Wounds and Heal and shield power.
  - Total healing listed in the Runes panel does not account for neither positive nor negative healing-modifiers.

#### Shield Bash

perk ID 8401; [Template:Rune data Shield Bash revision 4044093](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Shield_Bash?oldid=4044093).

Passive: Whenever you gain a shield, your next attack against an enemy champion is empowered to deal 5 – 32.9411764706 (based on level) (+ 2.5% bonus health) (+ 15% shield amount) bonus adaptive damage on-hit. The empowered attack lasts for up to 2 seconds after the shield expires.

Notes from [Shield Bash revision 4015237](https://wiki.leagueoflegends.com/en-us/Shield_Bash?oldid=4015237):

- Shield Bash deals proc damage, and thus will not trigger spell effects.
- Shield Bash's shield scaling is calculated with the highest value of shield that is either currently active or has expired within the last 2 seconds. Gaining a new shield while Shield Bash is active will replace the previous empowerment if the new shield is larger than any other currently active shield.
  - Once the empowered attack has been used, all previously applied shield instances become invalid for subsequent triggers for Shield Bash, even if the shield lingers.
- Shield Bash's shield scaling is calculated with the initial maximum value of the shield.
  - If the shield value increases over multiple instances, then Shield Bash will scale with the highest instance of shielding that has been achieved.
- Shield Bash can only trigger once per gained shield.
- Shield Bash triggers from all shield types, including magic and physical ones.

#### Conditioning

perk ID 8429; [Template:Rune data Conditioning revision 3825864](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Conditioning?oldid=3825864).

Passive: After 12 minutes, gain 8 bonus armor and 8 bonus magic resistance and your total armor and total magic resistance are increased by 3%.

Notes from [Conditioning revision 3980942](https://wiki.leagueoflegends.com/en-us/Conditioning?oldid=3980942):

- The increase in stats from Conditioning does not exclusively count as bonus armor or magic resistance.
  - The 3% increased base armor and magic resistance do not count as bonus armor/magic resistance, and in the info tip panel when you hover the armor or magic resist stat are not displayed as an increase to the player's base armor/magic resistance. The values in the info tip do not add up properly for this reason.
    - Due to a lack of any base armor and magic resistance ratios in the game it is unable to be determined whether the 3% bonus to base resistance stats counts as base armor/magic resistance or not. In the similar case of Overgrowth, they do count as the former.
- The increase in stats from Conditioning stacks with an instance of recursion.

#### Second Wind

perk ID 8444; [Template:Rune data Second Wind revision 3960974](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Second_Wind?oldid=3960974).

Passive: After taking damage from an enemy champion, regenerate 4% of your missing health over 10 seconds, refreshing on subsequent damage.

Notes from [Second Wind revision 4012933](https://wiki.leagueoflegends.com/en-us/Second_Wind?oldid=4012933):

- Second Wind grants bonus health regeneration equal to 2% of missing health.
- Second Wind will not trigger if the damage is:
  - Reduced to or equal to 0 damage.
  - Dealt to shields.
  - Absorbed by invulnerability.

#### Bone Plating

cooldown 55; perk ID 8473; [Template:Rune data Bone Plating revision 3985159](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Bone_Plating?oldid=3985159).

Passive: After taking damage from an enemy champion, activate Bone Plating for 1.5 seconds. While active, the next 3 spells or attacks you receive from the enemy champion that triggered this effect deal 30 – 63.5294117647 (based on level) less damage (including true damage).

Notes from [Bone Plating revision 4072632](https://wiki.leagueoflegends.com/en-us/Bone_Plating?oldid=4072632):

- The triggering instance of damage will not have its damage reduced by Bone Plating.
- Bone Plating will still go on cooldown after its duration even if it does not block any damage.
- Bone Plating only blocks damage from the champion who triggered it; it can only be active against one champion at a time until its next activation.
- Bone Plating's damage reduction can only occur once per cast instance.
  - This can be the same cast instance as the one that initially triggers Bone Plating, if it deals multiple instances of damage (e.g W).
- Bone Plating will not trigger if the damage dealt is:
  - Reduced to or equal to 0 damage.
  - Dealt to shields.
  - Absorbed by invulnerability.
- Bone Plating's damage reduction applies to the post-mitigation damage of the incoming attack or spell.

#### Overgrowth

range 1400; perk ID 8451; [Template:Rune data Overgrowth revision 3825902](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Overgrowth?oldid=3825902).

Passive: Every 8 monsters or enemy minions that die near you permanently generates a stack. Each stack grants 3 bonus health. This effect can stack indefinitely.
After reaching 15 stacks (120 monsters or minions), your base and bonus health are permanently increased by 3.5%.

Notes from [Overgrowth revision 4002405](https://wiki.leagueoflegends.com/en-us/Overgrowth?oldid=4002405):

- Overgrowth only counts unit deaths the champion has direct line of sight on. The effect's radius is reduced when there is terrain or nearsight blocking direct vision on dying units. Shared vision with other allied units observing the dying units is ignored.
  - : Interaction with shared vision of an allied champion that has Overgrowth as well.
- The percentage bonus after 15 stacks is split into a base and bonus health portion, just like the pre-V8.23 version of Overgrowth and an old version of Gargoyle Stoneplate at the same time.
  - This was explicitly done to prevent bonus health scalings via abilities such as Feast from strongly benefitting health scalings.
  - Because of this, base health scalings such as Guardian Angel Rebirth health and Friend of the Forest health cost are increased by the modifier.
  - Tooltips do not properly recognize the modified base stats, so when they generate and calculate bonus health as the champion's total health minus their base health at current level, they incorrectly show higher values from bonus health scalings than will actually be used by the effect.
- Overgrowth users may still gain the effect while dead.

#### Revitalize

perk ID 8453; [Template:Rune data Revitalize revision 3825912](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Revitalize?oldid=3825912).

Passive: Grants 5% Heal and shield power.
Outgoing healing and outgoing shielding are increased by 10% on targets below 40% of their maximum health.
Incoming healing, incoming shielding, self-healing and self-shielding are increased by 10% while you are below 40% of your maximum health.

Notes from [Revitalize revision 3997189](https://wiki.leagueoflegends.com/en-us/Revitalize?oldid=3997189):

- The following table denotes what healing effects benefit from which healing modifiers, although note that the Revitalize column concerns only the 10% increase portion of the effect:
- Revitalize's bonus 10% stacks multiplicatively with Heal Power, but it has an instance of recursion when stacking with Shield Power.
  - Therefore, Revitalize alone nets 15.5% bonus healing and 16.025% bonus shielding.
- For outgoing heals and shields, it also stacks multiplicatively with the affected ally's Revitalize (10%) and Spirit Visage Boundless Vitality (25%), granting them a total of 58.81% bonus healing (including the 5% Heal and shield power from Revitalize's passive).
- Healing granted by Revitalize in the HUD stats panel tracker will count any healing at full health, as well as fountain regeneration.
- Revitalize also amps Magic Shields (like Maw of Malmortius).
- Barrier combined with Revitalize will provide an extra 5 – 23 (based on level) shield, increased to 16.025 – 73.715 (based on level) while under 40% maximum health.
- Heal combined with Revitalize will grant an extra 4 – 15.9 (based on level) healing, increased to 12.4 – 49.29 (based on level) while under 40% maximum health.

#### Unflinching

perk ID 8242; [Template:Rune data Unflinching revision 3958701](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Unflinching?oldid=3958701).

Passive: While afflicted with crowd control sourced from enemy champions, gain 10 bonus armor and 10 bonus magic resistance, lingering for 2 seconds after the impairment ends.

Notes from [Unflinching revision 4053306](https://wiki.leagueoflegends.com/en-us/Unflinching?oldid=4053306):

- Unflinching triggers from all forms of crowd control, except for kinematics and disruption.
- For effects that deal damage and apply crowd control simultaneously, Unflinching will activate after taking the damage and thus the user will not benefit from the increased resistances against that damage instance.
- The bonus resistances are worth Expression error: Unexpected operator * ( × 10 armor and × 10 magic resistance).

### Sorcery

- Keystones: Summon Aery, Arcane Comet, Stormraider's Surge, Deathfire Touch
- Slot 1: Axiom Arcanist, Manaflow Band, Nimbus Cloak
- Slot 2: Transcendence, Celerity, Absolute Focus
- Slot 3: Scorch, Waterwalking, Gathering Storm

#### Summon Aery

range Global; perk ID 8214; [Template:Rune data Summon Aery revision 4062237](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Summon_Aery?oldid=4062237).

Passive: Damaging basic attacks, abilities, and item effects against an enemy champion signal Aery to pounce at them over 0.45 seconds, dealing 10 – 54.7058823529 (based on level) (+ 10% bonus AD) (+ 5% AP) adaptive damage. Healing, shielding, or buffing an allied champion signals Aery to leap to their side over 0.35 seconds, shielding them for 20 – 109.411764706 (based on level) (+ 10% bonus AD) (+ 5% AP) for 2.5 seconds.
Aery applies her effects to the affected champion upon arrival. She then lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. While on her way back, she is initially very slow, but gradually accelerates, and can be picked up by moving near her.
Does not trigger on persistent proc damage.

Notes from [Summon Aery revision 4058483](https://wiki.leagueoflegends.com/en-us/Summon_Aery?oldid=4058483):

- Aery deals proc damage, and thus will not trigger spell effects.
- Aery's ally effect will trigger on all manner of abilities that affect allies (both directly targeted and not) and buffs, including Demacian Standard (the shield will trigger on the ally closest to the flag), Lamb's Respite and Whimsy.
  - Command: Dissonance can trigger the allied effect both on activation and if an ally walks into the persistent area.
  - Applying Surging Tides to an ally will not trigger Aery - i.e. you cannot hit an ally with Aqua Prison to grant them a shield.
  - Some buffs may not trigger the ally effect as the behavior is set on a case by case basis. For instance, Bandlepipes Fanfare attack speed buff granted to allies will not trigger Aery.
- Aery's shield will trigger Ardent Censer and Staff of Flowing Water, allowing champions who otherwise do not have heals or shields to trigger the effects.
- Aery is special cased to trigger on the application of the first tick of Ignite.
- Aery will not trigger on an ally healed by Font of Life.
- Aery will not trigger spell effects.
- Aery is not blocked by projectile-blocking effects.
- When the champion Recalls, Aery will also spawn out to play a recall animation.
  - During this time, Aery has its own independant sight radius of 1350, and can occasionally see inside bush if the player recalls very close to it and faces a certain direction.

#### Arcane Comet

cooldown 20 – 6.58823529412 (based on level); range Global; perk ID 8229; [Template:Rune data Arcane Comet revision 4060639](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Arcane_Comet?oldid=4060639).

Passive: Dealing ability damage or pet damage to an enemy champion hurls an Arcane Comet at their current location that lands after 0.825, dealing 15 – 110 (based on level) (+ 10% bonus AD) (+ 5% AP) of either physical or magic damage to enemies within a 140 radius upon impact. This damage is increased by 0% – 100% (based on units), up to a maximum of 30 – 220 (based on level) (+ 20% bonus AD) (+ 10% AP) at maximum range.
Variable Damage: This effect deals either physical or magic damage depending on the damage contribution from your attack damage and ability power to the effect's damage formula.Greater bonus damage from the AD ratio → Physical damageGreater bonus damage from the AP ratio → Magic damageIf the damage contribution of AD and AP are zero or otherwise equal, the damage type defaults to magic damage.

Notes from [Arcane Comet revision 4024412](https://wiki.leagueoflegends.com/en-us/Arcane_Comet?oldid=4024412):

- Arcane Comet deals proc damage and is tagged as area of effect without applying spell effects.
- Arcane Comet can be blocked by spell shields.
- Arcane Comet is a projectile and can be intercepted by E, W, and W.
- Arcane Comet is not triggered from dealing 0 damage.
- Arcane Comet can be seen flying from the champion using it even if there is no vision of them, possibly giving away their position.
- The impact indicator has a radius of 175 units, for reference.

#### Stormraider's Surge

cooldown 20 – 8.82352941176 (based on level); perk ID 8230; [Template:Rune data Stormraider's Surge revision 4042210](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Stormraider's_Surge?oldid=4042210).

Passive: Dealing damage to an enemy champion equal to 25% of their maximum health within 3 seconds grants you 48% (melee) / 36% (ranged) bonus movement speed and 50% slow resist for 4 seconds.

#### Deathfire Touch

perk ID 8992; [Template:Rune data Deathfire Touch revision 4023190](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Deathfire_Touch?oldid=4023190).

Dealing ability damage or pet damage to enemy champions inflicts a burn that deals 1.5 – 6 (based on level) (+ 3.5% bonus AD) (+ 1.25% AP) magic damage every 0.5 seconds over the duration. After the burn has lingered on a target for 3 seconds, its damage to them is increased by 75% while it lasts.
The burn's duration is based on the form of ability damage dealt to the target and is refreshed on subsequent applications: * Spell damage: 4 seconds. * Area damage: 2 seconds. * Persistent damage: 1 second. * Persistent area damage: 1 second. * Pet damage: 1 second.

Notes from [Deathfire Touch revision 4064330](https://wiki.leagueoflegends.com/en-us/Deathfire_Touch?oldid=4064330):

- Deathfire Touch deals proc damage and is tagged as periodic without applying spell effects.
- Subsequent burn applications on a burning target will overwrite/refresh the debuff duration only if the current total burn duration is shorter than or equal to the total burn duration of the triggering ability damage source.
  - Spell damage overrides the burn duration of all other damage types, and area damage overrides all other types except spell damage. Ability damage sources of the same type or with the same burn duration (persistent and pet) will refresh each other.
    - For example, if a target is currently burning over 2 seconds after having been damaged by area damage, and is then damaged by an instance of spell damage (from the Deathfire Touch user) within the duration, the debuff duration is overridden entirely to 4 seconds.
  - If the current total burn duration is however greater than the total burn duration of the triggering ability damage source, while the remaining duration of the burn is less than the latter, then the debuff duration is overridden to the latter burn duration.
    - For example, if a target is currently burning over 4 seconds after having been damaged by spell damage, with the remaining burn duration being less than 2 seconds, then an instance of area damage (from the Deathfire Touch user) would overwrite the debuff duration to 2 seconds.
- Deathfire Touch's total damage with the trigger of a single instance of ability damage on a target, without the burn being refreshed:
  - Spell damage: 14.25 – 57 (based on level) (+ 33.25% bonus AD) (+ 11.875% AP)
  - Area damage: 6 – 24 (based on level) (+ 14% bonus AD) (+ 5% AP)
  - Persistent / Persistent area damage: 3 – 12 (based on level) (+ 7% bonus AD) (+ 2.5% AP)
  - Pet damage: 3 – 12 (based on level) (+ 7% bonus AD) (+ 2.5% AP)
  - If the pet damage is also tagged as area damage, Deathfire Touch's duration will be 2 seconds.
- The burn can be stacked on a target when applied by multiple users, though not refreshing the debuff for all subsequent sources at a time.
- Deathfire Touch's damage is not updated dynamically; the stats it references remain static until the debuff expires and is applied again.

#### Axiom Arcanist

perk ID 8224; [Template:Rune data Axiom Arcanist revision 3948848](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Axiom_Arcanist?oldid=3948848).

Passive: Your ultimate has 12% increased damage (reduced to 8% for area of effect abilities), healing and shielding.
Scoring an enemy champion takedown reduces your ultimate ability's current cooldown by 7%.

Notes from [Axiom Arcanist revision 4050881](https://wiki.leagueoflegends.com/en-us/Axiom_Arcanist?oldid=4050881):

- On Elise, Jayce, Nidalee and Zoe, Axiom Arcanist is exchanged with Nimbus Cloak.
- Axiom Arcanist will affect the damaging passive effects of the user's ultimate ability.
  - Although Ryze's ultimate passive Realm Warp is a damaging effect, it does not appear to increase EQ (Spell Flux + Overload) damage by 12% nor 8%.
- Axiom Arcanist will also increase the damage, healing, and shielding done by pets summoned from the user's ultimate ability (except R ).
- Axiom Arcanist does affect ultimate damage dealt to enemy non-champions and healing and shielding granted to allied non-champions.
  - The bonus ultimate damage, healing, and shielding tracker in the HUD of the rune's tooltip only tracks bonus damage dealt to enemy champions and bonus healing and shielding for the user or allied champions.
- Axiom Arcanist will not amplify self-healing effects.
  - Axiom Arcanist will amplify the healing via life steal by ultimates that apply life steal specifically.
  - It is special-cased to amplify the regeneration granted by Maximum Dosage specifically.
- Axiom Arcanist will affect the empowered abilities of R (H-28Q Apex Turret Hextech Rocket Swarm CH-3X Lightning Grenade) and R (Soulflare Renewal Defiance).
- Axiom Arcanist will only amplify the first instance of Chaaaaaaaarge!!! shield.
- Axiom Arcanist will not amplify the maximum health reduction from Realm of Death.
- Sion does not benefit from Axiom Arcanist's cooldown refund during Glory in Death.
- Spray and Pray bolts are special-cased to benefit from Axiom Arcanist as area of effect damage.
- On Udyr, Axiom Arcanist will affect all Awakened abilities respectively.
  - The cooldown of Awakened Spirit however will not be refunded when he scores a takedown.

#### Manaflow Band

cooldown 15; perk ID 8226; [Template:Rune data Manaflow Band revision 4058510](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Manaflow_Band?oldid=4058510).

Passive: Dealing ability damage to an enemy champion with a non-innate ability cast instance, or dealing them pet damage, or applying them certain debuffs, permanently increases your maximum mana by 25, up to 250 mana. Mana gained from this effect preserves your current mana.
After reaching 250 bonus mana, permanently restore 1% of your missing mana every 5 seconds.

Notes from [Manaflow Band revision 4058511](https://wiki.leagueoflegends.com/en-us/Manaflow_Band?oldid=4058511):

- On the Ultra Rapid Fire mode and for champions without mana, Manaflow Band is exchanged with Axiom Arcanist.
- It takes a minimum of 150 seconds to fully charge Manaflow Band.
- Debuffs considered are:
  - Immobilizing crowd control and slows (potentially more)
  - DoT
  - Poison
  - Shred
- Usually, an increase of maximum stat also leads to an increase of current stat. Since Manaflow Band is meant to not follow that rule, it is made to first deduct the amount, and then increase the maximum mana right after. This effect is considered mana expenditure for effects that trigger upon expending mana.
  - If the deduction in mana leads to a negative amount, Manaflow Band will actually increase current mana, since the floor of the stat is 0. The deduction will effectively be lower than the successive increase of maximum mana which will then increase current mana.

#### Nimbus Cloak

perk ID 8275; [Template:Rune data Nimbus Cloak revision 4023241](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Nimbus_Cloak?oldid=4023241).

Passive: Using a summoner spell grants ghosting and 15% / 35% / 45% (based on summoner spell cooldown) bonus movement speed decaying over 2 seconds.

Notes from [Nimbus Cloak revision 4023242](https://wiki.leagueoflegends.com/en-us/Nimbus_Cloak?oldid=4023242):

- The movement speed bonus of Nimbus Cloak is based on one of three brackets the cooldown of a summoner spell falls into.
  - To account for summoner spell cooldown reduction from different game modes, there are different thresholds in effect for them:
    - ARAM: 60 seconds (maximum cooldown for low bracket), 150 seconds (maximum for medium bracket)
    - Legend of the Poro King: 60 seconds (maximum cooldown for low bracket), 150 seconds (maximum for medium bracket)
    - Ultra Rapid Fire: 20 seconds (maximum cooldown for low bracket), 50 seconds (maximum for medium bracket)
    - One for All: 60 seconds (maximum cooldown for low bracket), 150 seconds (maximum for medium bracket)
    - Ultimate Spellbook
  - Summoner spell cooldown reduction from Cosmic Insight or Ionian Boots of Lucidity can reduce it below a threshold, the current example being Flash cooldown being reduced to 230.77 seconds in Summoner's Rift and 150 seconds in ARAM, making it fall into the medium bracket, causing Nimbus Cloak's activation to only grant a 20% movement speed bonus from it.
  - Teleport cooldown is specially handled to always be in the highest bracket (if not cast by Spell Thief).
  - Zoe casting summoner spells with Spell Thief will always use the ability's cooldown, which falls into the lowest bracket.
- Activating multiple summoner spells will only consider the one granting the strongest bonus movement speed. Summoner spells across different cooldown thresholds have each their own Nimbus Cloak activation, and once the strongest one's duration ends, the lesser one will take its place (duration permitting).
- For the case of Teleport and Hexflash, Nimbus Cloak activates once their channel completes or is interrupted.
  - Hexflash has to have channeled until the blink is available to trigger Nimbus Cloak upon interruption.

#### Transcendence

perk ID 8210; [Template:Rune data Transcendence revision 3825921](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Transcendence?oldid=3825921).

Passive: Gain bonuses upon reaching the following levels: * Level 5: + 5 ability haste. * Level 8: + 5 ability haste. * Level 11: Scoring a takedown against an enemy champion reduces the current cooldowns of your basic abilities by 20%.

#### Celerity

perk ID 8234; [Template:Rune data Celerity revision 3825860](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Celerity?oldid=3825860).

Passive: All movement speed bonuses increase in effectiveness by 7%.
Additionally, you gain 1% bonus movement speed.

Notes from [Celerity revision 4047756](https://wiki.leagueoflegends.com/en-us/Celerity?oldid=4047756):

- Bonus movement speed in general is split into flat, additive percent and multiplicative percent bonuses that construct the value of the total movement speed in stat updates every 0.25 seconds:
  - Celerity grants flat bonus movement speed equal to 7% of your other flat bonuses.
    - Flat bonuses include increased base movement speed granted by Spider Form.
    - Flat bonuses include bonuses with negative values such as those provided by Whimsy against enemies or Purge against himself.
      - For example, if Kled with Boots of Swiftness is dismounted, his flat bonus movement speed will be Expression error: Unexpected end of expression, and Celerity will grant him Expression error: Unexpected operator ) bonus movement speed.
  - Celerity grants additive bonus movement speed equal to 7% of your other additive bonuses, including itself, only if your total additive bonus from other sources is greater than 5% (6% if including Celerity's bonus).
  - Celerity grants multiplicative bonus movement speed equal to 7% of the sum of your other multiplicative bonuses.
    - On every new stat update, the multiplicative bonus of Celerity will avoid multiplying itself from the previous cycle. However, since stat updates already actively avoid that, the multiplicative bonus will be much lower than it should be on some cycles and oscillate.
    - is this outdated after V14.17?

#### Absolute Focus

perk ID 8233; [Template:Rune data Absolute Focus revision 3986945](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Absolute_Focus?oldid=3986945).

Passive: Gain 1.8 – 18 (based on level) bonus attack damage or 3 – 30 (based on level) ability power (adaptive) while above 70% of your maximum health.
Adaptive: Grants bonuses based on which stat you already have the most bonuses for. Defaults to the first listed.

#### Scorch

cooldown 10; perk ID 8237; [Template:Rune data Scorch revision 3985169](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Scorch?oldid=3985169).

Passive: Dealing ability damage to an enemy champion sets them on fire, dealing them 20 – 42.3529411765 (based on level) bonus magic damage after 1 second.

Notes from [Scorch revision 4024859](https://wiki.leagueoflegends.com/en-us/Scorch?oldid=4024859):

- Scorch deals proc damage and is tagged as indirect damage and periodic without applying spell effects.
- Scorch only affects one champion, if triggered by an area of effect ability it will hit the first champion to receive spell effects (this order depends on the spell, but usually based on proximity).
- If Scorch is triggered as an on-attack effect (via Arise!, Royal Maelstrom), the damage dealt will be affected by on-attack damage modifiers.

#### Waterwalking

perk ID 8232; [Template:Rune data Waterwalking revision 3986946](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Waterwalking?oldid=3986946).

Passive: While in the river, you gain 10 bonus movement speed and 7.8 – 18 (based on level) bonus attack damage or 13 – 30 (based on level) ability power (adaptive).
Adaptive: Grants bonuses based on which stat you already have the most bonuses for. Defaults to the first listed.

Notes from [Waterwalking revision 3980932](https://wiki.leagueoflegends.com/en-us/Waterwalking?oldid=3980932):

- The bonus movement speed decays over 1 second after leaving the river, while the bonus stats are lost immediately.
- The water puddles created around the jungle by Ocean Rift count and will activate Waterwalking if tread upon.
- On modes without the river, Waterwalking is exchanged with Scorch.
- This rune provides no bonuses outside of Summoner's Rift, or in game modes where the river is inaccessible.
- Referring to the river includes the entire zone covered in water, including the two parts outside of the Brushes in the middle lane.

#### Gathering Storm

perk ID 8236; [Template:Rune data Gathering Storm revision 4011483](https://wiki.leagueoflegends.com/en-us/Template:Rune_data_Gathering_Storm?oldid=4011483).

Passive: Gain increasing adaptive Force every 10 minutes that grants a total of 0 – ∞ (based on minutes) bonus Attack Damage or 0 – ∞ (based on minutes) Ability Power.
Adaptive: Grants bonuses based on which stat you already have the most bonuses for. Defaults to the first listed.
