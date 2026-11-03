# Summoner spells, patch 26.21

The summoner spells Summoner's Rift offers, which the loadout search will choose from (M8). Values by level are shown from level 1 to 20; duels are at level 20.

Sources: Data Dragon 16.21.1 (which spells Summoner's Rift offers, as the ones in its CLASSIC game mode), [Module:SpellData/data revision 4089805](https://wiki.leagueoflegends.com/en-us/Module:SpellData/data?oldid=4089805) (cooldowns, ranges and effects), and each spell's article (its notes).

## Cross-check

14 cooldowns and ranges on the wiki were compared with Data Dragon. Differences (2), where the wiki's value is the one used:

- Flash: the range is 400 on the wiki, 425 in Data Dragon
- Heal: the range is 900 on the wiki, 875 in Data Dragon

## Spells

### Barrier

cooldown 180 seconds; range Self; Data Dragon ID SummonerBarrier.

Grants your champion a shield that absorbs 100 – 502.352941176 (based on level) damage for 2.5 seconds.

### Cleanse

cooldown 240 seconds; range Self; Data Dragon ID SummonerBoost.

Removes all disables (excluding Airborne, Nearsight, and Suppression) and summoner spell debuffs (excluding Mark) affecting your champion, and grants you 75% tenacity for 3 seconds.

Notes from [Cleanse revision 4037451](https://wiki.leagueoflegends.com/en-us/Cleanse?oldid=4037451):

- Cleanse will remove the following debuff types:
  - Crowd control:
    - Blind
    - Forced action
      - Berserk
      - Charm
      - Flee
      - Taunt
    - Cripple
    - Disarm
    - Drowsy & Sleep
    - Ground
    - Root
    - Silence
    - Slow
    - Stun (Suspension)
      - Suspension's fake airborne is also removed when the stun is.
  - Summoner spells:
    - Ignite
      - Does not remove the Grievous Wounds debuff.
    - Exhaust
- Cleanse cannot be activated while under the effects of suppression or stasis (both disable all summoner spells from use).

### Exhaust

cooldown 240 seconds; range 650; Data Dragon ID SummonerExhaust.

Weakens the target enemy champion for 3 seconds, slowing them by 40% and reducing their damage dealt by 35%.

Notes from [Exhaust revision 4053233](https://wiki.leagueoflegends.com/en-us/Exhaust?oldid=4053233):

- Exhaust will not reduce true damage.
- Exhaust applies its slow and damage reduction as separate debuffs, of which only the slow can be affected by tenacity or cleansed.
  - Cleanse, however, removes both the slow and the damage reduction.
- Using Exhaust on a champion when the target is already affected by that spell will reapply the effect, resetting its duration. It will not increase the effect.
  - The visual indicator of Exhaust will not reset along its duration, ending prematurely and not appearing for further Exhaust reapplications.

### Flash

cooldown 300 seconds; range 400 (Quick cast); Data Dragon ID SummonerFlash.

Blinks your champion a short distance toward the target location.

Notes from [Flash revision 4008665](https://wiki.leagueoflegends.com/en-us/Flash?oldid=4008665):

- Flash cannot be used while rooted, grounded, or unable to cast.
- Flash additionally changes the user's facing direction to be in the same direction they blinked.
- With the Hextech Flashtraption rune, Hexflash replaces Flash when it's on cooldown.
- Flash will cast at max range if cast beyond that.
- Flash always employs Quick cast.

### Ghost

cooldown 240 seconds; range Self; Data Dragon ID SummonerHaste.

Your champion ignores unit collision and gains 24% – 50.8235294118% (based on level) bonus movement speed for 10 seconds.

Notes from [Ghost revision 3991260](https://wiki.leagueoflegends.com/en-us/Ghost?oldid=3991260):

- Ghost will still be in effect even after being resurrected.
- Ghost's movement speed stacks additively.
- Ghost may be stacked up to a maximum of 5 times (which is possible by Spell Thief).
  - Gaining a new stack does not refresh the previous stacks.

### Heal

cooldown 240 seconds; range 900; Data Dragon ID SummonerHeal.

Heals your champion and the allied champion nearest to the cursor for 80 – 346 (based on level), while also granting both of you 30% bonus total movement speed for 1 second.
Champions affected by Heal within 35 seconds cause subsequent Heal casts on them to restore 50% less health. Heal prioritizes targeting the most wounded allied champion in range if no allied champions are near the cursor.

Notes from [Heal revision 3958758](https://wiki.leagueoflegends.com/en-us/Heal?oldid=3958758):

- Heal searches in a 200 units radius around the cursor for its intended allied target, if none is targeted directly. If it finds none, it targets the most wounded allied champion in the cast range, if no such distinction then the closest one.
  - "Most wounded" means the champion with the least current %HP.
  - Interactions with clones.
  - There is a bug causing the spell to sometimes not pick its second target successfully.
- Using or being affected by Heal if you were already Healed in the last 35 seconds heals for 40 – 159 (based on level).

### Ignite

cooldown 180 seconds; range 600; Data Dragon ID SummonerDot.

Sets the target enemy champion on fire for 5 seconds, revealing them and dealing 70 – 525 (based on level) true damage over the duration, with the first tick of damage occurring briefly after the cast and subsequent ticks occurring every 1.056 seconds after the previous. The target is also inflicted with Grievous Wounds for the same duration.

Notes from [Ignite revision 4053158](https://wiki.leagueoflegends.com/en-us/Ignite?oldid=4053158):

- Each tick of Ignite deals 14 – 105 (based on level) true damage.
- Ignite deals its first tick of damage at [0 to 0.264] seconds after the cast, based on how soon the first character stat update tick after the cast occurs.
  - The last tick is thus dealt at [0 to 0.264] plus 5.28 seconds, well before the debuff's duration runs out.
- Cleanse removes the damage over time and reveal components of Ignite, but the healing reduction debuff will persist.
- Ignite deals proc damage and is tagged as periodic without applying spell effects.
- Ignite cannot reveal stealthed targets as it does not apply true sight.
- Subsequent casts of Ignite on the same target will override the previous debuff; the effect will refresh in duration but cannot be stacked.
- Ignite grants two stacks of Conqueror, and one of Electrocute and Phase Rush upon activation.
- Ignite triggers Summon Aery on the application of its first tick.
  - Subsequent ticks cannot trigger the rune.
- Ignite's damage cannot be amplified by damage amplifiers.

### Smite

2 charges, each back after 90 seconds; 15 seconds between casts; range 500; Data Dragon ID SummonerSmite.

Deals 600 true damage to the target medium / large monster or enemy minion. Against pets, deals 40 true damage instead.
Transforms into Unleashed Smite once a jungle pet is fed 15 treats.

Notes from [Smite revision 4053300](https://wiki.leagueoflegends.com/en-us/Smite?oldid=4053300):

- Role Binding: In Summoner's Rift permanent queues, Smite is only available to players drafted in the Jungle role and must occupy one of their summoner spell slots. Players drafted in other roles will not have the option of choosing Smite within their loadout.
- Smite has no cast time and can be cast during the cast times and channels of other abilities.
- Smite starts with one charge and gains an additional charge every 90 seconds starting from 0:48, with a maximum of 2 charges.
- The recharge cooldown of this spell can be reduced by summoner spell haste.
- Smiting an enemy champion will draw the aggro of nearby minions as it is a single-targeted ability.
- If the cursor is not on a valid target, prioritizes smiting epic monsters within 125 units.
- Smite and its upgrades deal proc damage, and thus will not trigger spell effects.
- Smite and its upgrades' damage is unaffected by damage amplifiers.
- Unleashed Smite and Primal Smite can be blocked by spell shields.
- In Ultra Rapid Fire:
  - Cooldown changed to 10 seconds.
  - Recharge timer increased to 120 seconds.

### Teleport

cooldown 300 seconds; range Global; Data Dragon ID SummonerTeleport.

After channeling for 3 seconds, removes any homestart or homeguard buff and causes your champion to dash to the location of the target allied turret, minion, or ward at the time of cast over 0.5 – 5 (based on distance to target) seconds, during which they are untargetable and unable to act. Upgrades to Unleashed Teleport at 10:00.

Notes from [Teleport revision 4088391](https://wiki.leagueoflegends.com/en-us/Teleport?oldid=4088391):

- Completing the Toplane Role Quest rewards Unleashed Teleport as a bonus summoner spell (390 second cooldown).
  - If Teleport was already taken, the quest will instead empower the spell to grant a 35% maximum health shield for 10 seconds after the channel ends. The cooldown of Unleashed Teleport is additionally reduced by 30 seconds.
- Teleport calculates the travel time for the dash based on the distance between the user's casting position and the target's location at the start of the channel.
- Teleport has a base dash speed of 1000.
  - The dash speed will be increased to account for the fixed travel time.
- Unleashed Teleport has a dash speed of 4500.
- Unleashed Teleport will be placed on a 2-second cooldown after Teleport's transformation.
- If Teleport's current cooldown is greater than Unleashed Teleport's maximum cooldown upon transformation, the current cooldown is reduced to its maximum.
- Teleport has no cast time.
- Teleport goes on cooldown after the dash ends.
- Teleport is disabled while grounded, rooted, or unable to cast. It also cannot be used while in Death Realm.
  - Nearsight will prevent the caster from using Teleport globally.
- Teleport's untargetability does not destroy in-flight projectiles.
- The champion's model is hidden while they are dashing with Teleport and instead can be visually seen as a trailing orb.
- If there is not enough free space upon landing, the user may land in the nearest open space in the direction of travel.
- While dashing with Teleport, the champion's portrait on the mini-map is hidden from the enemy's perspective.
- Neither Teleport's channel nor dash will cancel if the target dies during either effects.
- The target's location at the start of the channel will be considered for the destination location of Teleport, not the target's location when the channel completes or the dash ends.
- Teleporting to a ward or stealthed trap reveals it to enemies.
  - The target ward or trap is only revealed if it is within an enemy's sight radius and their sight isn't being obstructed.
- The user may select their target for Teleport via the minimap.
- When attempting to cast Teleport on a target that is at least 3000 units away, the targeting for the spell has a forgiveness radius of 400 units. This is particularly useful when targeting via the minimap.
- Teleport's visual effects can be seen even through the fog of war.
- While standing at the end of a wall or other standing out part of terrain, using Teleport slightly increases sight radius just around the corners in the fog of war.
- Teleport and Unleashed Teleport will play an 'On My Way' ping on the target.
- A timer for Teleport's remaining duration is visible at the target location to all players.
