# Item catalog, patch 26.20

The finished items and boots the build search will choose from (PLAN.md §13, M8). The simulator doesn't use them yet.

Sources: Data Dragon 16.20.1 (which items the shop sells, and their gold), the items' game file from CommunityDragon 16.20.8248524+branch.releases-16-20.content.release (stats and item groups), and [Module:ItemData/data revision 4082420](https://wiki.leagueoflegends.com/en-us/Module:ItemData/data?oldid=4082420) (stats, effects and limits).

## How the catalog is chosen

- Sold in the Summoner's Rift shop to any champion: purchasable, in the store, not hidden, not limited to one champion or its ally. Other modes' copies of an item have six-digit IDs and are left out.
- Finished items are built from components, build into nothing, and cost at least 1,500 gold. Boots, trinkets and consumables are not finished items, nor are items built from boots (the tier-3 boots) or from Bounty of Worlds (the support quest's final forms).
- Boots are the tier-2 boots: boots built from Boots that build into a tier-3 upgrade. Basic Boots and the tier-3 boots are left out.

That gives **106 finished items** and **7 tier-2 boots**.

## One per build

The game file caps how many items of a group a build may hold. These caps bind the catalog:

| Game-file group | Wiki limit | At most | Items |
|---|---|--:|---|
| LifelineItems | Lifeline | 1 | Archangel's Staff, Immortal Shieldbow, Maw of Malmortius, Protoplasm Harness, Sterak's Gage |
| TearItems | Manaflow | 1 | Archangel's Staff, Manamune, Winter's Approach |
| {548f93b0} | Annul | 1 | Banshee's Veil, Edge of Night |
| Boots, BootsWithoutActives | — | 1 | Berserker's Greaves, Boots of Swiftness, Gluttonous Greaves, Ionian Boots of Lucidity, Mercury's Treads, Plated Steelcaps, Sorcerer's Shoes |
| LastWhisper | Fatality | 1 | Black Cleaver, Lord Dominik's Regards, Mortal Reminder, Serylda's Grudge, Terminus |
| VoidPen | Blight | 1 | Bloodletter's Curse, Cryptbloom, Terminus, Void Staff |
| {57352a0f} | Spellblade | 1 | Dusk and Dawn, Essence Reaver, Iceborn Gauntlet, Lich Bane, Trinity Force |
| ImmolateItems | Immolate | 1 | Hollow Radiance, Sunfire Aegis |
| {c6428663} | Hydra | 1 | Profane Hydra, Ravenous Hydra, Stridebreaker, Titanic Hydra |

No item can be held twice.

## Rules for the build search

The build search uses the rules confirmed on review (`pipeline/items/rules.ts`, PLAN.md §13). They keep these groups to one item per build, where the game file's caps differ: the Tear items can be combined, Mortal Reminder and Morellonomicon can't, and penetration is one group.

- %pen: Lord Dominik's Regards, Serylda's Grudge, Mortal Reminder, Void Staff, Cryptbloom, Terminus
- Spellblade: Trinity Force, Lich Bane, Essence Reaver, Iceborn Gauntlet, Dusk and Dawn
- Lifeline: Sterak's Gage, Maw of Malmortius, Immortal Shieldbow, Protoplasm Harness
- Hydras: Ravenous Hydra, Titanic Hydra, Profane Hydra, Stridebreaker
- Immolate: Sunfire Aegis, Hollow Radiance
- Grievous Wounds: Mortal Reminder, Morellonomicon
- Annul: Banshee's Veil, Edge of Night

Builds per side under these rules: 1,538,705,768 six-item builds and 661,723,587 five-item builds with boots (2,200,429,355 in all). Under the game file's caps they would be 1,510,649,782 six-item builds and 653,589,622 five-item builds with boots (2,164,239,404 in all).

## Cross-check

323 stats on the wiki were compared with the game file. Differences (1):

- Redemption: costs 2,250 gold on the wiki, 2,300 in Data Dragon

## Finished items

### Abyssal Mask (2,650 gold)

Stats: 15 ability haste, 350 health, 45 magic resist.
Built from: Kindlegem, Negatron Cloak.

- **Passive: Unmake** (unique). Enemy champions within 700 units of you become cursed, causing them to receive 12% increased magic damage post-mitigation from all sources.

### Actualizer (2,800 gold)

Stats: 90 ability power, 10 ability haste, 300 mana.
Built from: Lost Chapter, Blasting Wand.

- **Active: Mana Made Real** (unique; cooldown 60 s). For 8 seconds, your mana is Empowered. While Empowered: your abilities cost 100% more mana; you gain 15% (+ 0.5% per 100 bonus mana) increased ability and pet damage, healing, and shielding; and your basic abilities' cooldowns progress 30% faster.

### Archangel's Staff (2,900 gold)

Stats: 70 ability power, 25 ability haste, 600 mana.
One per build: Lifeline, Manaflow.
Built from: Tear of the Goddess, Lost Chapter, Fiendish Codex.

- **Passive: Awe** (unique). Grants ability power equal to 1% bonus mana.
- **Passive: Manaflow** (unique). Grants a charge every 8 seconds, up to 5 charges. Affecting an enemy or ally with an ability consumes a charge to grant 5 bonus mana, increased to 10 if they are a champion, up to a maximum of 360 bonus mana.
- **Passive**. Transforms into Seraph's Embrace at 360 bonus mana.

### Ardent Censer (2,200 gold)

Stats: 45 ability power, 10% heal and shield power, 125% base mana regeneration, 4% movement speed.
Built from: Aether Wisp, Forbidden Idol.

- **Passive: Sanctify** (unique). Healing or shielding allied champions (excluding yourself) enhances you and them for 6 seconds, granting 25% bonus attack speed and 20 bonus magic damage on-hit on basic attacks.

### Axiom Arc (2,750 gold)

Stats: 55 attack damage, 20 ability haste, 18 lethality.
Built from: The Brutalizer, Caulfield's Warhammer.

- **Passive: Flux** (unique). Scoring a takedown against an enemy champion within 3 seconds of damaging them refunds 10% (+ 0.25% per 1 Lethality) of your ultimate ability's total cooldown.

### Bandlepipes (2,300 gold)

Stats: 200 health, 20 armor, 20 magic resist, 15 ability haste.
Built from: Kindlegem, Cloth Armor, Null-Magic Mantle.

- **Passive: Fanfare** (unique). Slowing or immobilizing an enemy champion empowers you with Fanfare for 8 (melee) / 4 (ranged) seconds, granting you 20 bonus movement speed. While empowered, you and nearby allied champions also gain 30 (melee) / 20 (ranged)% bonus attack speed.

### Banshee's Veil (3,000 gold)

Stats: 105 ability power, 40 magic resist.
One per build: Annul.
Built from: Needlessly Large Rod, Verdant Barrier.

- **Passive: Annul** (unique). Grants a spell shield that blocks the next hostile ability (40 second cooldown, timer restarts upon taking damage from champions).

### Bastionbreaker (3,000 gold)

Stats: 55 attack damage, 15 ability haste, 22 lethality.
Built from: The Brutalizer, Serrated Dirk.

- **Passive: Shaped Charge** (unique; cooldown 20 s). Your next instance of ability damage to a champion or epic monster with a champion ability deals 50 (melee) / 25 (ranged) (+ 1.5 (melee) / 0.75 (ranged) per 1 lethality) bonus true damage.
- **Passive: Sabotage** (unique). Scoring a takedown against an enemy champion within 3 seconds of damaging them grants you Sabotage for 90 seconds, empowering your next basic attack against a turret or epic monster to consume the effect to deal 300 (melee) / 240 (ranged) (+ 25 (melee) / 20 (ranged) per 1 lethality) bonus true damage over 3 seconds.

### Black Cleaver (3,000 gold)

Stats: 45 attack damage, 20 ability haste, 400 health.
One per build: Fatality.
Built from: Phage, Kindlegem, Pickaxe.

- **Passive: Carve** (unique). Dealing physical damage to an enemy champion applies a stack of Carve for 6 seconds, stacking up to 5 times. Each stack inflicts 6% armor reduction, up to 30% at 5 stacks.
- **Passive: Fervor** (unique). Dealing physical damage grants you 20 (melee) / 10 (ranged) bonus movement speed for 2 seconds.

### Blackfire Torch (2,800 gold)

Stats: 80 ability power, 20 ability haste, 600 mana.
Built from: Lost Chapter, Fated Ashes.

- **Passive: Baleful Blaze** (unique). Dealing ability damage burns enemies, causing them to take 10 (+ 1% AP) magic damage every 0.5 seconds over 3 seconds, for a total of 60 (+ 6% AP). Against monsters, the burn deals 10 bonus magic damage per tick, dealing a total of 20 (+ 1% AP) magic damage per tick for up to 120 (+ 6% AP).
- **Passive: Blackfire** (unique). For each champion, epic monster, and large monster afflicted with Baleful Blaze's burn, increase your ability power by 4%.

### Blade of the Ruined King (3,200 gold)

Stats: 40 attack damage, 25% attack speed, 10% life steal.
Built from: Vampiric Scepter, Recurve Bow, Pickaxe.

- **Passive: Mist's Edge** (unique). Basic attacks deal bonus physical damage on-hit equal to 9% (melee) / 6% (ranged) of the target's current health, with a maximum of 100 against minions and monsters.
- **Passive: Clawing Shadows** (unique; cooldown 15 s). Basic attacks on-hit against enemy champions apply a stack for 6 seconds, stacking up to 3 times. The third stack consumes them all to slow the target by 30% for 1 second.

### Bloodletter's Curse (2,900 gold)

Stats: 65 ability power, 400 health, 15 ability haste.
One per build: Blight.
Built from: Haunting Guise, Fiendish Codex.

- **Passive: Vile Decay** (unique). Dealing magic damage to an enemy champion with a champion ability applies a stack of Vile Decay to them for 6 seconds, stacking up to 4 times and up to once per basic attack or ability per cast instance every 0.3 seconds. Each stack inflicts 7.5% magic resistance reduction, up to 30% at 4 stacks.

### Bloodthirster (3,400 gold)

Stats: 80 attack damage, 15% life steal.
Built from: B. F. Sword, Pickaxe, Vampiric Scepter.

- **Passive: Ichorshield** (unique). Convert the healing received from life steal in excess of maximum health into a shield for up to 165 – 345 (based on level), which lasts until destroyed.

### Chempunk Chainsword (3,000 gold)

Stats: 45 attack damage, 15 ability haste, 450 health.
Built from: Executioner's Calling, Giant's Belt, Caulfield's Warhammer.

- **Passive: Hackshorn** (unique). Dealing physical damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.

### Cosmic Drive (3,000 gold)

Stats: 350 health, 25 ability haste, 70 ability power, 4% movement speed.
Built from: Kindlegem, Aether Wisp, Fiendish Codex.

- **Passive: Spelldance** (unique). Dealing magic or true damage to an enemy champion grants you 20 bonus movement speed for 4 seconds.

### Cryptbloom (3,000 gold)

Stats: 75 ability power, 20 ability haste, 30% magic penetration.
One per build: Blight.
Built from: Blighting Jewel, Fiendish Codex, Fiendish Codex.

- **Passive: Life From Death** (unique; cooldown 60 s). Scoring a takedown against an enemy champion while alive and within 3 seconds of damaging them summons a nova that radiates from the location of their death over 1.75 seconds, healing you and allied champions hit for 100 (+ 20% AP).

### Dawncore (2,500 gold)

Stats: 45 ability power, 16% heal and shield power, 100% base mana regeneration.
Built from: Blasting Wand, Forbidden Idol, Forbidden Idol.

- **Passive: First Light** (unique). Gain 2% heal and shield power and 10 ability power for every additional 100% base mana regeneration.

### Dead Man's Plate (2,900 gold)

Stats: 55 armor, 350 health, 4% movement speed.
Built from: Winged Moonplate, Ruby Crystal, Chain Vest.

- **Passive: Shipwrecker** (unique). While moving, generates 7 stacks of Momentum every 0.25 seconds, granting up to 20 bonus movement speed at 100 stacks after 3.75 seconds of moving. Basic attacks consume all stacks to deal 0 – 40 (based on stacks of Momentum) (+ 0% – 100% (based on stacks of Momentum) base AD) bonus physical damage on-hit.
- **Passive: Unsinkable** (unique). Gain 15% slow resist.

### Death's Dance (3,300 gold)

Stats: 60 attack damage, 15 ability haste, 50 armor.
Built from: Steel Sigil, Caulfield's Warhammer, Pickaxe.

- **Passive: Ignore Pain** (unique). Reduces 30% (melee) / 10% (ranged) of all post-mitigation physical and magic damage received and instead stores the damage to successively take it as true damage over 3 seconds, dealing a third of the stored damage each second.
- **Passive: Defy** (unique). If an enemy champion dies within 3 seconds of you damaging them, removes Ignore Pain's remaining stored damage and heals you for 75% bonus AD over 2 seconds.

### Dusk and Dawn (3,100 gold)

Stats: 20 ability haste, 60 ability power, 300 health, 20% attack speed.
One per build: Spellblade.
Built from: Sheen, Blasting Wand, Kindlegem, Dagger.

- **Passive: Spellblade** (unique). After using an ability, your next basic attack within 10 seconds deals 75% base AD (+ 10% AP) bonus magic damage and heals you for 10% AP (+ 3% bonus health) on-hit, and applies on-hit effects to the target again after a 0.2-second delay (1.5 second cooldown, starts after using the empowered attack).

### Echoes of Helia (2,200 gold)

Stats: 20 ability haste, 35 ability power, 200 health, 125% base mana regeneration.
Built from: Kindlegem, Bandleglass Mirror.

- **Passive: Soul Siphon** (unique). Gain 30% of pre-mitigation damage dealt to champions as Soul Charges, up to 80 – 250 (based on level). Healing or shielding an allied champion (excluding yourself) consumes all charges to heal them equal to the consumed amount.

### Eclipse (2,900 gold)

Stats: 60 attack damage, 15 ability haste.
Built from: Caulfield's Warhammer, Pickaxe, Long Sword.

- **Passive: Ever Rising Moon** (unique; cooldown 6 s). Damaging basic attacks, abilities, item effects, and summoner spells, as well as the application of crowd control and damage over time effects, apply stacks against enemy champions, up to one per cast instance per champion. Applying 2 stacks to a champion within a 2 second period deals bonus physical damage to them equal to 8% (melee) / 5% (ranged) of target's maximum health and grants you a shield for 150 (melee) / 75 (ranged) (+ 40% (melee) / 20% (ranged) bonus AD) for 2 seconds.

### Edge of Night (3,000 gold)

Stats: 50 attack damage, 250 health, 15 lethality.
One per build: Annul.
Built from: Serrated Dirk, Tunneler.

- **Passive: Annul** (unique). Grants a spell shield that blocks the next hostile ability (40 second cooldown, timer restarts upon taking damage from champions).

### Endless Hunger (3,100 gold)

Stats: 65 attack damage, 5% omnivamp, 20% tenacity.
Built from: Caulfield's Warhammer, Pickaxe, Long Sword.

- **Passive: Famine** (unique). Gain 5 (+ 13% (melee) / 10% (ranged) bonus AD) ability haste.
- **Passive: Feast** (unique). Scoring a takedown against an enemy champion within 3 seconds of damaging them grants you 15% omnivamp for 8 seconds.

### Essence Reaver (3,050 gold)

Stats: 50 attack damage, 20 ability haste, 25% critical strike chance.
One per build: Spellblade.
Built from: Sheen, Caulfield's Warhammer, Cloak of Agility.

- **Passive: Spellblade** (unique). After using an ability, your next basic attack within 10 seconds deals 125% base AD (+ 0 – 50 based on critical strike chance) bonus physical damage on-hit and restores mana equal to 50% of that amount (1.5 second cooldown, starts after using the empowered attack).

### Experimental Hexplate (3,000 gold)

Stats: 450 health, 40 attack damage, 20% attack speed.
Built from: Tunneler, Phage, Dagger.

- **Passive: Hexcharged** (unique). Gain 30 ultimate haste.
- **Passive: Overdrive** (unique). Upon casting your ultimate ability, enter Overdrive to gain 50% (melee) / 25% (ranged) bonus attack speed and 20% (melee) / 10% (ranged) bonus movement speed for 8 seconds (30 second cooldown, starts on ultimate cast).

### Fiendhunter Bolts (2,650 gold)

Stats: 45% attack speed, 25% critical strike chance, 4% movement speed.
Built from: Zeal, Scout's Slingshot.

- **Passive: Night Vigil** (unique). Gain 30 ultimate haste.
- **Passive: Opening Barrage** (unique; cooldown 45 s). After casting your ultimate ability, your next 3 basic attacks on-attack within 8 seconds gain 50% bonus attack speed and are empowered to critically strike for 60% bonus damage. If an attack would have already critically struck, it instead critically strikes for 100% bonus damage and deals bonus true damage equal to 15% of the triggering attack's damage pre-mitigation.

### Force of Nature (2,800 gold)

Stats: 400 health, 55 magic resist, 4% movement speed.
Built from: Negatron Cloak, Ruby Crystal, Winged Moonplate.

- **Passive: Steadfast** (unique). Taking magic damage from champions generates a stack of Steadfast for 7 seconds, stacking up to 8 times with the duration refreshing on subsequent magic damage from them and whenever dealing damage to them. Becoming immobilized by an enemy champion generates 2 stacks and also refreshes the duration. Once per cast instance, each incoming basic attack, ability, or item effect can only generate 1 stack of Steadfast from their damage every 1 second. At maximum stacks, gain 70 bonus magic resistance and 6% bonus movement speed.

### Frozen Heart (2,500 gold)

Stats: 20 ability haste, 75 armor, 400 mana.
Built from: Warden's Mail, Glacial Buckler.

- **Passive: Winter's Caress** (unique). Cripples the attack speed of enemy champions within 700 units by 20%.

### Guardian Angel (3,200 gold)

Stats: 55 attack damage, 45 armor.
Built from: Steel Sigil, B. F. Sword.

- **Passive: Rebirth** (unique). Upon taking lethal damage, enter resurrection for 4 seconds, during which you are invulnerable, untargetable, and unable to act, and afterwards heal for 50% of base health and restore 100% of maximum mana (300 second cooldown, starts after resurrection ends).

### Guinsoo's Rageblade (3,000 gold)

Stats: 30 attack damage, 30 ability power, 25% attack speed.
Built from: Amplifying Tome, Recurve Bow, Pickaxe.

- **Passive: Wrath** (unique). Basic attacks deal 30 bonus magic damage on-hit.
- **Passive: Seething Strike** (unique). Basic attacks on-attack grant 8% bonus attack speed for 4 seconds, stacking up to 4 times for a total of 32% bonus attack speed. At maximum stacks, basic attacks on-attack also grant a Phantom stack for 4 seconds, up to 2 stacks. At 2 Phantom stacks, the next basic attack consumes all of those stacks on-attack to trigger a Phantom Hit that applies on-hit effects to the target after a 0.15-second delay.

### Heartsteel (3,000 gold)

Stats: 900 health, 100% base health regeneration.
Built from: Giant's Belt, Crystalline Bracer, Giant's Belt.

- **Passive: Colossal Consumption** (unique). While within 700 units of an enemy champion, generate a stack on them each second, stacking up to 3 times. Your next basic attack against a target with 3 stacks is empowered to consume them all to deal 70 (+ 6% maximum health) bonus physical damage on-hit and grant you permanent bonus health equal to 10% of that amount (30 second cooldown per target).
- **Passive: Goliath** (unique). Gain 0% – 30% (based on maximum health) increased size.

### Hexoptics C44 (2,800 gold)

Stats: 55 attack damage, 25% critical strike chance.
Built from: Pickaxe, Noonquiver, Long Sword.

- **Passive: Magnification** (unique). Deal 0% – 10% (based on distance to target) increased basic damage. The distance is calculated from the edge of your current position to edge of the target's position at the time they are damaged.
- **Passive: Arcane Aim** (unique). Scoring a takedown against an enemy champion within 3 seconds of damaging them grants you 100 bonus attack range for 8 seconds.

### Hextech Gunblade (3,000 gold)

Stats: 40 attack damage, 80 ability power, 10% omnivamp.
Built from: Vampiric Scepter, Hextech Alternator, Amplifying Tome.

- **Active: Lightning Bolt** (unique; cooldown 60 s). Shocks the target enemy champion with a bolt of lightning, dealing 175 – 253 (based on level) (+ 30% AP) magic damage and slowing them by 25% for 1.5 seconds.

### Hextech Rocketbelt (2,650 gold)

Stats: 10 ability haste, 60 ability power, 350 health.
Built from: Hextech Alternator, Kindlegem, Ruby Crystal.

- **Active: Supersonic** (unique; cooldown 50 s). Dash 275 units in the target direction, though not through terrain, then unleash an arc of 7 rockets forward which travel up to 1050 units; and upon collision with an enemy or terrain, explode in a 185-radius area. Enemies within 85 units of your dash and ones hit by any rocket's explosion are dealt 135 (+ 15% AP) magic damage, once per cast.

### Hollow Radiance (2,800 gold)

Stats: 10 ability haste, 400 health, 40 magic resist, 100% base health regeneration.
One per build: Immolate.
Built from: Bami's Cinder, Spectre's Cowl.

- **Passive: Immolate** (unique). Taking or dealing damage activates this passive for 3 seconds. Deal 15 (+ 1% bonus health) magic damage every second to enemies within 325 (+ 100% bonus size) units, with the damage being increased to 125% against minions and monsters. This executes minions that would be killed by one more tick of damage.
- **Passive: Desolate** (unique). Killing a non-champion unit causes an eruption around their death location that deals 30 (+ 2% bonus health) magic damage to enemies within 350 units. Scoring a takedown against an enemy champion within 3 seconds of damaging them causes a larger eruption that deals 60 (+ 4% bonus health) magic damage to enemies within 500 units.

### Horizon Focus (2,700 gold)

Stats: 75 ability power, 25 ability haste.
Built from: Fiendish Codex, Fiendish Codex, Amplifying Tome.

- **Passive: Hypershot** (unique). Dealing ability damage to a champion with a champion ability at 600 or more units away from the cast position marks them for 6 seconds, revealing them and increasing your damage dealt to them by 10%.
- **Passive: Focus** (unique; cooldown 30 s). Upon triggering Hypershot, grant sight of the area 1400 units around the target for 2 seconds and apply Hypershot's mark to enemy champions within the area for 3 seconds.

### Hubris (2,800 gold)

Stats: 55 attack damage, 10 ability haste, 18 lethality.
Built from: Serrated Dirk, Caulfield's Warhammer.

- **Passive: Eminence** (unique). Scoring a takedown against an enemy champion within 3 seconds of damaging them generates a permanent stack and grants you 12 (+ 3 per stack) bonus attack damage for 90 seconds.

### Hullbreaker (3,000 gold)

Stats: 40 attack damage, 500 health, 4% movement speed.
Built from: Tunneler, Winged Moonplate, Pickaxe.

- **Passive: Skipper** (unique). Basic attacks on-hit against any enemy grant a stack for 10 seconds, stacking up to 5 times. At maximum stacks, or 4 stacks, your next basic attack on-hit against a champion, epic monster, or structure consumes all stacks to deal 120% (melee) / 84% (ranged) base AD (+ 5% (melee) / 3.5% (ranged) maximum health) bonus physical damage, increased to 300% (melee) / 210% (ranged) base AD (+ 10% (melee) / 7% (ranged) maximum health) against structures.
- **Passive: Boarding Party** (unique). Allied siege minions and super minions within 1050 units gain 70 – 130 (based on level) (melee) / 35 – 65 (based on level) (ranged) bonus armor and bonus magic resistance, as well as 10% increased size.

### Iceborn Gauntlet (2,900 gold)

Stats: 15 ability haste, 50 armor, 300 health.
One per build: Spellblade.
Built from: Sheen, Ruby Crystal, Chain Vest.

- **Passive: Spellblade** (unique). After using an ability, your next basic attack within 10 seconds deals 150% base AD bonus physical damage on-hit and creates a 300 radius frost field for 2 seconds. Enemies within the field are slowed by 25% (melee) / 12.5% (ranged) (1.5 second cooldown, starts after using the empowered attack).

### Immortal Shieldbow (3,000 gold)

Stats: 55 attack damage, 25% critical strike chance.
One per build: Lifeline.
Built from: Pickaxe, Noonquiver.

- **Passive: Lifeline** (unique; cooldown 90 s). If you would take damage that would reduce you below 30% of your maximum health, you first gain a shield that absorbs 400 – 700 (based on level) (melee) / 320 – 560 (based on level) (ranged) damage for 3 seconds.

### Imperial Mandate (2,400 gold)

Stats: 15 ability haste, 60 ability power, 150% base mana regeneration.
Built from: Amplifying Tome, Bandleglass Mirror, Amplifying Tome.

- **Passive: Control** (unique). Abilities with immobilizing effects have their cooldown reduced equivalent to 20 ability haste.
- **Passive: Command** (unique). Immobilizing an enemy champion marks them as Vulnerable for 4 seconds, increasing the damage they take from all sources by 7%. Subsequent immobilizes against a target extend the duration of the effect.

### Infinity Edge (3,500 gold)

Stats: 75 attack damage, 25% critical strike chance, 30% critical strike damage.
Built from: B. F. Sword, Pickaxe, Cloak of Agility.

### Jak'Sho, The Protean (3,200 gold)

Stats: 45 armor, 45 magic resist, 350 health.
Built from: Giant's Belt, Chain Vest, Negatron Cloak.

- **Passive: Voidborn Resilience** (unique). Gain a stack for each second in combat with enemy champions, stacking up to 5 times. At maximum stacks, increase your bonus armor and bonus magic resistance by 30% until the end of combat.

### Kaenic Rookern (2,900 gold)

Stats: 400 health, 80 magic resist, 100% base health regeneration.
Built from: Spectre's Cowl, Negatron Cloak.

- **Passive: Magebane** (unique). After not taking magic damage for 15 seconds, gain a shield that absorbs magic damage equal to 15% of maximum health until destroyed.

### Knight's Vow (2,300 gold)

Stats: 10 ability haste, 40 armor, 200 health, 100% base health regeneration.
Built from: Kindlegem, Chain Vest, Rejuvenation Bead.

- **Passive: Sacrifice** (unique). While your Worthy ally is tethered to you and you are above 30% of your maximum health, redirect 14% of the pre-mitigation physical and magic damage they take to you as the respective damage type. Additionally, you heal for 12% of the post-mitigation damage dealt by your Worthy ally to champions.
- **Active: Pledge** (unique; cooldown 60 s). Designate the target allied champion as being Worthy, forming a tether between you and them. Champions can only be designated as Worthy by one Knight's Vow at a time. You cannot be designated as Worthy by an ally's Knight's Vow once you've formed a tether.

### Kraken Slayer (3,000 gold)

Stats: 45 attack damage, 40% attack speed, 4% movement speed.
Built from: Rectrix, Hearthbound Axe, Recurve Bow.

- **Passive: Bring It Down** (unique). Basic attacks on-hit (melee) / on-attack (ranged) grant a stack for 4 seconds, up to 2 stacks. At 2 stacks, the next basic attack consumes all stacks to deal 150 – 210 (based on level) (melee) / 120 – 168 (based on level) (ranged) bonus physical damage on-hit, increased by 0% – 75% (based on target's missing health), for up to 262.5 – 367.5 (based on level) (melee) / 210 – 294 (based on level) (ranged) bonus physical damage.

### Liandry's Torment (3,000 gold)

Stats: 60 ability power, 300 health.
Built from: Haunting Guise, Fated Ashes.

- **Passive: Torment** (unique). Dealing ability damage or pet damage burns enemies, causing them to take 1% of the target's maximum health magic damage every 0.5 seconds over 3 seconds, capped at 20 per tick against monsters.
- **Passive: Suffering** (unique). For each second in combat with enemy champions, deal 2% increased damage, stacking up to 3 times for a total of 6%.

### Lich Bane (2,900 gold)

Stats: 10 ability haste, 100 ability power, 6% movement speed.
One per build: Spellblade.
Built from: Sheen, Aether Wisp, Blasting Wand.

- **Passive: Spellblade** (unique). After using an ability, your next basic attack within 10 seconds gains 50% bonus attack speed and deals 75% base AD (+ 45% AP) bonus magic damage on-hit (1.5 second cooldown, starts after using the empowered attack).

### Locket of the Iron Solari (2,200 gold)

Stats: 10 ability haste, 30 armor, 200 health, 30 magic resist.
Restriction: Devotion's shield strength is reduced by 75% if the target was affected by another Devotion in the last 20 seconds.
Built from: Kindlegem, Cloth Armor, Null-Magic Mantle.

- **Active: Devotion** (unique; cooldown 90 s). Grants you and allied champions within 850 units a shield for 290 – 360 (based on target's level) that decays over 2.5 seconds.

### Lord Dominik's Regards (3,300 gold)

Stats: 35 attack damage, 25% critical strike chance, 35% armor penetration.
One per build: Fatality.
Built from: Last Whisper, Noonquiver.

- **Passive: Giant Slayer** (unique). Deal 0% – 15% (based on target's bonus health) increased damage against enemy champions.

### Luden's Echo (2,750 gold)

Stats: 100 ability power, 10 ability haste, 600 mana.
Built from: Lost Chapter, Hextech Alternator.

- **Passive: Echo** (unique; cooldown 12 s). Gain 6 Echo stacks. Dealing ability damage to an enemy consumes all Echo stacks to deal 75 (+ 5% AP) bonus magic damage to them and, for each stack consumed beyond the first, an additional enemy within 600 units of them, firing an orb at each secondary target that impacts after 0.528 to deal the damage. If the number of additional targets fired at is less than the number of stacks consumed, deal an additional 15 / 30 / 45 / 60 / 75 (based on remaining Echo stacks) (+ 1% / 2% / 3% / 4% / 5% AP) magic damage to the primary target, for a total of 90 / 105 / 120 / 135 / 150 (+ 6% / 7% / 8% / 9% / 10% AP)

### Malignance (2,700 gold)

Stats: 90 ability power, 15 ability haste, 600 mana.
Built from: Lost Chapter, Blasting Wand.

- **Passive: Scorn** (unique). Gain 20 ultimate haste.
- **Passive: Hatefog** (unique). Dealing non-proc damage or pet damage to enemy champions with your ultimate ability creates a 251 – 550 (based on ultimate's damage instance) radius scorched zone beneath them for 3 seconds, applying a Curse to enemies within that deals 15 (+ 1.25% AP) magic damage every 0.25 seconds and reduces their magic resistance by 10 (3 second cooldown per target, starts on zone creation).

### Manamune (2,900 gold)

Stats: 35 attack damage, 15 ability haste, 500 mana.
One per build: Manaflow.
Built from: Tear of the Goddess, Caulfield's Warhammer, Long Sword.

- **Passive: Awe** (unique). Grants bonus attack damage equal to 2% maximum mana.
- **Passive: Manaflow** (unique). Grants a charge every 8 seconds, up to 4 charges. Consumes a charge on-hit and whenever affecting an enemy or ally with an ability to grant 3 bonus mana, increased to 6 for champion targets, up to a maximum of 360 bonus mana. Can only be triggered once per cast instance.
- **Passive**. Transforms into Muramana at 360 bonus mana.

### Maw of Malmortius (3,100 gold)

Stats: 15 ability haste, 60 attack damage, 40 magic resist.
One per build: Lifeline.
Built from: Hexdrinker, Caulfield's Warhammer.

- **Passive: Lifeline** (unique; cooldown 90 s). If you would take magic damage that would reduce you below 30% of your maximum health, you first gain a shield that absorbs 200 (melee) / 150 (ranged) (+ 150% (melee) / 112.5% (ranged) bonus AD) magic damage for 3 seconds. Additionally, triggering this effect grants you 10% omnivamp until the end of combat.

### Mejai's Soulstealer (1,500 gold)

Stats: 20 ability power, 100 health.
Built from: Dark Seal.

- **Passive: Glory** (unique). Gain 4 stacks for each champion kill and 2 stacks for each assist, up to a maximum of 25 stacks. For every stack, gain 5 ability power, up to 125 at maximum stacks. If you have at least 10 stacks, also gain 10% bonus movement speed. Lose 10 stacks on death. Stacks are preserved from Dark Seal.

### Mercurial Scimitar (3,200 gold)

Stats: 50 attack damage, 10% life steal, 35 magic resist.
Built from: Quicksilver Sash, Pickaxe, Vampiric Scepter.

- **Active: Quicksilver** (unique; cooldown 90 s). Removes all crowd control debuffs (except Airborne) from your champion and grants 50% bonus total movement speed and ghosting for 2 seconds.

### Mikael's Blessing (2,300 gold)

Stats: 250 health, 15 ability haste, 12% heal and shield power, 100% base mana regeneration.
Built from: Kindlegem, Forbidden Idol.

- **Active: Purify** (unique; cooldown 120 s). Remove all crowd control debuffs (except Airborne, Blind, Disarm, Nearsight, and Suppression) from yourself or the target allied champion and heal the target for 100 – 250 (based on level).

### Moonstone Renewer (2,200 gold)

Stats: 20 ability haste, 25 ability power, 200 health, 125% base mana regeneration.
Built from: Kindlegem, Bandleglass Mirror.

- **Passive: Starlit Grace** (unique). Healing or shielding an allied champion chains the effect to the other nearest and most wounded allied champion within 800 units of them (excluding yourself), granting them 30% of the heal or 35% of the shield's initial strength. If no other allied champions are in the radius, grant the same target an additional 30% of the heal or 35% of the shield.

### Morellonomicon (2,850 gold)

Stats: 75 ability power, 15 ability haste, 350 health.
Built from: Oblivion Orb, Blasting Wand, Kindlegem.

- **Passive: Grievous Wounds** (unique). Dealing magic damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.

### Mortal Reminder (3,000 gold)

Stats: 35 attack damage, 30% armor penetration, 25% critical strike chance.
One per build: Fatality.
Built from: Executioner's Calling, Last Whisper, Cloak of Agility.

- **Passive: Grievous Wounds** (unique). Dealing physical damage to enemy champions inflicts them with Grievous Wounds for 3 seconds.

### Nashor's Tooth (2,900 gold)

Stats: 15 ability haste, 80 ability power, 50% attack speed.
Built from: Recurve Bow, Blasting Wand, Fiendish Codex.

- **Passive: Icathian Bite** (unique). Basic attacks deal 15 (+ 15% AP) bonus magic damage on-hit.

### Navori Flickerblade (2,650 gold)

Stats: 40% attack speed, 25% critical strike chance, 4% movement speed.
Built from: Dagger, Zeal, Dagger.

- **Passive: Transcendence** (unique). Basic attacks on-attack reduce the remaining cooldowns of your basic abilities by 15%.

### Overlord's Bloodmail (3,300 gold)

Stats: 550 health, 30 attack damage.
Built from: Tunneler, Tunneler.

- **Passive: Tyranny** (unique). Gain bonus attack damage equal to 2.5% bonus health.
- **Passive: Retribution** (unique). Gain bonus attack damage equal to 0% – 12% (based on missing health) of your total attack damage from other sources.

### Phantom Dancer (2,650 gold)

Stats: 65% attack speed, 25% critical strike chance, 10% movement speed.
Built from: Dagger, Zeal, Dagger.

- **Passive: Spectral Waltz** (unique). Become permanently ghosted.

### Profane Hydra (2,850 gold)

Stats: 55 attack damage, 10 ability haste, 18 lethality.
One per build: Hydra.
Built from: Tiamat, The Brutalizer.

- **Passive: Cleave** (unique). Damaging basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other enemies in a 350 radius centered around the target.
- **Active: Heretical Cleave** (unique; cooldown 10 s). Deal 80% AD physical damage to enemies in a 450 radius in front of you.

### Protoplasm Harness (2,600 gold)

Stats: 20 ability haste, 600 health.
One per build: Lifeline.
Built from: Kindlegem, Giant's Belt.

- **Passive: Lifeline** (unique; cooldown 90 s). If you would take damage that would reduce you below 30% of your maximum health, you first gain 100 – 300 (based on level) bonus health for 5 seconds and heal yourself for 100 – 400 (based on level) (+ 175% bonus armor) (+ 175% bonus magic resistance) over the same duration, during which you also gain 15% increased size, 10% bonus movement speed, and 25% tenacity.

### Rabadon's Deathcap (3,500 gold)

Stats: 130 ability power.
Built from: Needlessly Large Rod, Needlessly Large Rod.

- **Passive: Magical Opus** (unique). Increase your ability power by 30%.

### Randuin's Omen (2,700 gold)

Stats: 75 armor, 350 health.
Built from: Warden's Mail, Giant's Belt.

- **Passive: Resilience** (unique). Reduces incoming damage from critical strikes by 30%.
- **Active: Humility** (unique; cooldown 90 s). Unleash a shockwave around you that slows nearby enemies by 70% for 2 seconds.

### Rapid Firecannon (2,650 gold)

Stats: 35% attack speed, 25% critical strike chance, 4% movement speed.
Built from: Zeal, Scout's Slingshot.

- **Passive: Energized** (unique). Moving and basic attacking generates Energize stacks, up to 100.
- **Passive: Sharpshooter** (unique). When fully Energized, your next basic attack deals 40 bonus magic damage on-hit. Energized attacks gain 35% bonus range, capped at 150.

### Ravenous Hydra (3,300 gold)

Stats: 65 attack damage, 15 ability haste, 12% life steal.
One per build: Hydra.
Built from: Tiamat, Vampiric Scepter, Caulfield's Warhammer.

- **Passive: Cleave** (unique). Basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other enemies in a 350 radius centered around the target. This damage benefits from life steal at 100% effectiveness.
- **Active: Ravenous Crescent** (unique; cooldown 10 s). Deal 80% AD physical damage to enemies within a 450 radius in front of you. This damage benefits from life steal at 100% effectiveness.

### Redemption (2,300 gold)

Stats: 30 ability power, 15 ability haste, 10% heal and shield power, 100% base mana regeneration.
Restriction: Intervention's effects are reduced by 50% if the target was affected by another Intervention in the last 12 seconds.
Built from: Fiendish Codex, Forbidden Idol.

- **Active: Intervention** (unique; cooldown 90 s). Call upon a 550-radius beam of light to strike upon the target location after 2.5 seconds, granting sight of the area for the duration. Allies within the area are healed for 150 – 350 (based on level), while enemy champions within take 10% of target's maximum health as true damage. Can be used while dead.

### Riftmaker (3,100 gold)

Stats: 15 ability haste, 70 ability power, 350 health.
Built from: Haunting Guise, Fiendish Codex.

- **Passive: Void Corruption** (unique). For each second in combat with champions, deal 2% increased damage, stacking up to 4 times for a total of 8% increased damage. At maximum stacks, gain 10% (melee) / 6% (ranged) omnivamp.
- **Passive: Void Infusion** (unique). Gain ability power equal to 2% bonus health.

### Rod of Ages (2,600 gold)

Stats: 45 ability power, 350 health, 500 mana.
Built from: Blasting Wand, Catalyst of Aeons.

- **Passive: Timeless** (unique). This item gains 10 bonus health, 30 bonus mana, and 3 ability power every minute, up to 10 times, for a maximum of 100 bonus health, 300 bonus mana, and 30 ability power. Upon reaching maximum stacks, gain a level that preserves your current experience (level cap remains the same).
- **Passive: Eternity** (unique). Restore mana equal to 10% of pre-mitigation damage taken from champions, and heal for 0 – 20 (based on mana spent) per cast. Toggled abilities can only heal for up to 20 per second.

### Runaan's Hurricane (2,650 gold)

Stats: 40% attack speed, 25% critical strike chance, 5% movement speed.
Restriction: Can only be purchased on ranged champions.
Built from: Zeal, Scout's Slingshot.

- **Passive: Wind's Fury** (unique). Basic attacks on-attack fire additional bolts at up to 2 enemies in front of you, each dealing 60% AD physical damage. Bolts apply on-hit effects and are affected by critical strike modifiers.

### Rylai's Crystal Scepter (2,600 gold)

Stats: 65 ability power, 400 health.
Built from: Blasting Wand, Giant's Belt, Amplifying Tome.

- **Passive: Rimefrost** (unique). Dealing ability damage slows enemies hit by 30% for 1 second.

### Serpent's Fang (2,500 gold)

Stats: 55 attack damage, 15 lethality.
Built from: Serrated Dirk, Pickaxe.

- **Passive: Shield Reaver** (unique). Dealing damage to an enemy champion inflicts them with venom for 3 seconds, reducing any shields they gain within the duration by 50% (melee) / 35% (ranged), and if the target was not already afflicted by the venom, reducing all of their active shields by the same amount.

### Serylda's Grudge (3,000 gold)

Stats: 45 attack damage, 15 ability haste, 35% armor penetration.
One per build: Fatality.
Built from: Caulfield's Warhammer, Last Whisper.

- **Passive: Bitter Cold** (unique). Dealing ability damage to an enemy that is at or below 50% of their maximum health slows them by 30% for 1 second.

### Shadowflame (3,200 gold)

Stats: 110 ability power, 15 magic penetration.
Built from: Hextech Alternator, Needlessly Large Rod.

- **Passive: Cinderbloom** (unique). Your magic and true damage will critically strike for 120% damage against enemies below 40% maximum health.

### Shurelya's Battlesong (2,200 gold)

Stats: 50 ability power, 15 ability haste, 125% base mana regeneration, 4% movement speed.
Built from: Aether Wisp, Bandleglass Mirror.

- **Active: Inspiring Speech** (unique; cooldown 75 s). Grants you and all allies within 1000 units 30% bonus movement speed for 4 seconds.

### Spear of Shojin (3,100 gold)

Stats: 45 attack damage, 450 health.
Built from: Pickaxe, Tunneler, Ruby Crystal.

- **Passive: Dragonforce** (unique). Gain 25 basic ability haste.
- **Passive: Focused Will** (unique). Dealing ability damage or pet damage from a non-innate ability cast instance, generates a stack of Focused Will for 6 seconds, stacking up to 4 times. For each stack, your ability, proc and pet damage originating from your ability cast instances deals 3% increased damage, for a total increase of 12% at maximum stacks.

### Spirit Visage (2,700 gold)

Stats: 10 ability haste, 400 health, 100% base health regeneration, 50 magic resist.
Built from: Spectre's Cowl, Kindlegem.

- **Passive: Boundless Vitality** (unique). Increases all healing and shielding received as well as health regeneration by 25%.

### Staff of Flowing Water (2,250 gold)

Stats: 35 ability power, 10 ability haste, 125% base mana regeneration, 10% heal and shield power.
Built from: Fiendish Codex, Forbidden Idol.

- **Passive: Rapids** (unique). Healing or shielding allied champions (excluding yourself) grants you and them 40 ability power and 15 ability haste for 6 seconds.

### Statikk Shiv (3,000 gold)

Stats: 45 attack damage, 45 ability power, 30% attack speed, 4% movement speed.
Built from: Scout's Slingshot, Pickaxe, Aether Wisp.

- **Passive: Energized** (unique). Moving and basic attacking generates Energize stacks, up to 100.
- **Passive: Electroshock** (unique). Basic attacks generate 9 bonus Energize stacks, for a total of 15 stacks per attack.
- **Passive: Electrospark** (unique). When fully Energized, your next basic attack on-hit is empowered to form chain lightning, dealing 60 bonus magic damage, increased to 90 against non-champions. This bounces to the closest target within 500 units, repeating from the new target to strike up to 4 / 5 / 6 / 7 / 8 (based on level) targets, dealing the same damage and applying on-hit effects to secondary targets hit.

### Sterak's Gage (3,200 gold)

Stats: 400 health, 20% tenacity.
One per build: Lifeline.
Built from: Pickaxe, Tunneler, Ruby Crystal.

- **Passive: The Claws that Catch** (unique). Gain bonus attack damage equal to 50% base AD.
- **Passive: Lifeline** (unique; cooldown 90 s). If you would take damage that would reduce you below 30% of your maximum health, you first gain a shield that absorbs damage equal to 60% of bonus health which decays over 4.5 seconds.

### Stormrazor (3,200 gold)

Stats: 50 attack damage, 25% attack speed, 25% critical strike chance.
Built from: B. F. Sword, Cloak of Agility, Scout's Slingshot.

- **Passive: Energized** (unique). Moving and basic attacking generates Energize stacks, up to 100.
- **Passive: Bolt** (unique). When fully Energized, your next basic attack deals 100 bonus magic damage on-hit and grants you 45% bonus movement speed for 1.5 seconds.

### Stormsurge (2,800 gold)

Stats: 90 ability power, 15 magic penetration, 6% movement speed.
Built from: Hextech Alternator, Aether Wisp.

- **Passive: Stormraider** (unique). Dealing damage to an enemy champion equal to 25% of their maximum health within 2.5 seconds inflicts them with Squall (30 second cooldown, starts on Squall's application).
- **Passive: Squall** (unique). After 2 seconds of having applied Squall, strike the target with lightning, dealing 125 (+ 10% AP) magic damage to them. If the target dies before being struck, they emit an electric field instantly that shocks all enemy champions in a 600 radius, dealing them the same damage.

### Stridebreaker (3,300 gold)

Stats: 40 attack damage, 25% attack speed, 450 health.
One per build: Hydra.
Built from: Tiamat, Phage, Dagger.

- **Passive: Cleave** (unique). Basic attacks on-hit deal 40% AD (melee) / 20% AD (ranged) physical damage to other enemies in a 350 radius centered around the target.
- **Active: Breaking Shockwave** (unique; cooldown 15 s). Deal 80% AD physical damage to enemies within a 450 radius in front of you and slow them by 35% for 3 seconds. For each champion hit, gain 35% bonus movement speed decaying over 3 seconds. Can move while casting.

### Sundered Sky (3,100 gold)

Stats: 400 health, 40 attack damage, 10 ability haste.
Built from: Tunneler, Caulfield's Warhammer.

- **Passive: Lightshield Strike** (unique). Your next basic attack against a champion is empowered to critically strike for 60% bonus damage and heal you for 90% (melee) / 45% (ranged) base AD (+ 4% of your missing health) (10 second cooldown per target). Excess healing beyond maximum health is converted to bonus health for 8 seconds.

### Sunfire Aegis (2,800 gold)

Stats: 10 ability haste, 50 armor, 350 health.
One per build: Immolate.
Built from: Bami's Cinder, Chain Vest, Ruby Crystal.

- **Passive: Immolate** (unique). Taking or dealing damage activates this passive for 3 seconds. Deal 20 (+ 1.5% bonus health) magic damage every second to enemies within 325 (+ 100% bonus size) units, with the damage being increased to 150% against minions and to 180% against monsters. This executes minions that would be killed by one more tick of damage.

### Terminus (3,000 gold)

Stats: 30 attack damage, 35% attack speed.
One per build: Fatality, Blight.
Built from: Hearthbound Axe, Recurve Bow.

- **Passive: Shadow** (unique). Basic attacks deal 30 (+10% bonus AD) (+ 10% AP) bonus magic damage on-hit.
- **Passive: Juxtaposition** (unique). Basic attacks on-hit against champions alternate between Light and Dark hits, each one granting a bonus for 5 seconds that stacks up to 3 times. Light hits grant 6 / 7 / 8 (based on level) bonus armor and bonus magic resistance while Dark hits grant 10% armor penetration and magic penetration, for a total of 18 / 21 / 24 (based on level) bonus resistances and 30% resistances penetration at maximum stacks of each.

### The Collector (3,000 gold)

Stats: 50 attack damage, 25% critical strike chance, 10 lethality.
Built from: Pickaxe, Serrated Dirk, Cloak of Agility.

- **Passive: Death** (unique). If you deal post-mitigation damage that would leave a champion below 5% of their maximum health, execute them.
- **Passive: Taxes** (unique). Killing a champion grants you an additional 25.

### Thornmail (2,450 gold)

Stats: 75 armor, 150 health.
Built from: Bramble Vest, Chain Vest, Ruby Crystal.

- **Passive: Thorns** (unique). When struck by a basic attack on-hit, deal 20 (+ 10% bonus armor) magic damage to the attacker and, if they are a champion, inflict them with Grievous Wounds for 3 seconds.

### Titanic Hydra (3,300 gold)

Stats: 40 attack damage, 600 health.
One per build: Hydra.
Built from: Tiamat, Tunneler, Giant's Belt.

- **Passive: Cleave** (unique). Basic attacks on-hit deal 1% (melee) / 0.5% (ranged) maximum health bonus physical damage to the target and 3% (melee) / 1.5% (ranged) maximum health physical damage to other enemies in a cone in the direction of the primary target.
- **Active: Titanic Crescent** (unique). Your next basic attack on-hit within 10 seconds empowers Cleave to deal 4% (melee) / 2% (ranged) maximum health bonus physical damage to the primary target and 9% (melee) / 4.5% (ranged) maximum health physical damage to secondary targets (10 second cooldown, starts after using the empowered attack).

### Trinity Force (3,333 gold)

Stats: 36 attack damage, 15 ability haste, 30% attack speed, 333 health.
One per build: Spellblade.
Built from: Sheen, Phage, Hearthbound Axe.

- **Passive: Spellblade** (unique). After using an ability, your next basic attack within 10 seconds deals 200% base AD bonus physical damage on-hit (1.5 second cooldown, starts after using the empowered attack).
- **Passive: Quicken** (unique). Basic attacks on-hit grant 20 bonus movement speed for 2 seconds

### Umbral Glaive (2,800 gold)

Stats: 60 attack damage, 15 ability haste, 18 lethality.
Built from: Serrated Dirk, Caulfield's Warhammer.

- **Passive: Blackout** (unique; cooldown 90 s). When spotted by enemy stealthed wards or traps, gain Blackout for 8 seconds.
- **Passive: Blackout**. You disable surrounding stealthed wards, as well as expose and reveal nearby stealthed wards and traps while Blackout is active. Your basic attacks deal 2 (melee) / 1 (ranged) bonus true damage to wards.
- **Passive: Nightstalker** (unique). After being not visible to enemies for at least 1 second, your next basic attack against a champion is empowered to deal 50 (+ 1.5 per 1 Lethality) bonus true damage on-hit. The empowered attack lasts for 4 seconds after being seen by an enemy.

### Unending Despair (2,800 gold)

Stats: 400 health, 50 armor, 15 ability haste.
Built from: Chain Vest, Kindlegem, Ruby Crystal.

- **Passive: Anguish** (unique). Every 4 seconds after entering combat with champions, sap all enemy champions around you within 650 units to deal magic damage equal to 3% of your bonus health to them and heal yourself equal to 250% of the post-mitigation damage dealt.

### Void Staff (3,000 gold)

Stats: 95 ability power, 40% magic penetration.
One per build: Blight.
Built from: Blighting Jewel, Blasting Wand.

### Voltaic Cyclosword (3,000 gold)

Stats: 55 attack damage, 10 ability haste, 10 lethality.
Built from: The Brutalizer, Long Sword, Long Sword.

- **Passive: Energized** (unique). Moving and basic attacking generates Energize stacks, up to 100.
- **Passive: Galvanize** (unique). Dealing ability damage to an enemy champion, with an ability cast instance, triggers the effects of Energized attacks against them if they are ready.
- **Passive: Firmament** (unique). When fully Energized, your next basic attack on-hit grants you 15 (melee) / 12 (ranged) lethality for 4 seconds and deals bonus physical damage equal to 9% (melee) / 7% (ranged) of the target's current health, capped at 200 against non-champions.

### Warmog's Armor (3,100 gold)

Stats: 1000 health, 100% base health regeneration.
Built from: Giant's Belt, Giant's Belt, Crystalline Bracer.

- **Passive** (unique). Grants Warmog's Heart if you have at least 2000 bonus health.
- **Passive: Warmog's Heart** (unique). Regenerate 1.5% maximum health every 0.5 seconds if damage has not been taken in the last 8 seconds (3 seconds for damage from non-champions).
- **Passive: Warmog's Vitality** (unique). Gain bonus health equal to 12% bonus health from items.

### Winter's Approach (2,400 gold)

Stats: 550 health, 15 ability haste, 500 mana.
One per build: Manaflow.
Built from: Tear of the Goddess, Giant's Belt, Kindlegem.

- **Passive: Awe** (unique). Grants bonus health equal to 15% bonus mana.
- **Passive: Manaflow** (unique). Grants a charge every 8 seconds, up to 4 charges. Consumes a charge on-hit and whenever affecting an enemy or ally with an ability to grant 3 bonus mana, increased to 6 for champion targets, up to a maximum of 360 bonus mana.
- **Passive**. Transforms into Fimbulwinter at 360 bonus mana.

### Wit's End (2,800 gold)

Stats: 50% attack speed, 45 magic resist, 20% tenacity.
Built from: Recurve Bow, Negatron Cloak, Recurve Bow.

- **Passive: Fray** (unique). Basic attacks deal 45 bonus magic damage on-hit.

### Youmuu's Ghostblade (2,800 gold)

Stats: 55 attack damage, 18 lethality, 4% movement speed.
Built from: Serrated Dirk, Rectrix, Long Sword.

- **Passive: Haunt** (unique). Gain 20 (melee) / 10 (ranged) bonus movement speed while out-of-combat with enemy champions for 3 seconds.
- **Active: Wraith Step** (unique; cooldown 45 s). Gain 20% (melee) / 15% (ranged) bonus movement speed and ghosting for 6 (melee) / 4 (ranged) seconds.

### Yun Tal Wildarrows (3,000 gold)

Stats: 50 attack damage, 45% attack speed, 0% critical strike chance.
Built from: B. F. Sword, Scout's Slingshot, Long Sword.

- **Passive: Practice Makes Lethal** (unique). Basic attacks on-attack grant 0.4% (melee) / 0.2% (ranged) critical strike chance permanently, stacking up to 63 (melee) / 125 (ranged) times (capped at 25% critical strike chance).
- **Passive: Flurry** (unique). Launching a basic attack against an enemy champion grants you 30% bonus attack speed for 6 seconds (30 second cooldown, reduced by 1 second on-hit and 2 seconds if the attack critically strikes).

### Zeke's Convergence (2,200 gold)

Stats: 10 ability haste, 25 armor, 25 magic resist, 300 health.
Built from: Kindlegem, Cloth Armor, Null-Magic Mantle.

- **Passive: Cryocombustion** (unique). Gain 15 ultimate haste.
- **Passive: Frostfire Tempest** (unique). Upon casting your ultimate ability, and once an enemy champion is within Frostfire Tempest's radius or after 5 seconds otherwise, you summon a storm of flame and ice around you for 5 seconds. The storm deals 7.5 magic damage every 0.25 seconds to enemy champions and monsters within a 350 radius and slows them by 30% (45 second cooldown, starts on ultimate cast).

### Zhonya's Hourglass (3,250 gold)

Stats: 105 ability power, 50 armor.
Built from: Needlessly Large Rod, Seeker's Armguard.

- **Active: Time Stop** (unique; cooldown 120 s). Put yourself in stasis for 2.5 seconds, rendering you untargetable and invulnerable for the duration but also unable to move, declare basic attacks, cast abilities, use summoner spells, or activate items.

## Boots

### Berserker's Greaves (1,100 gold)

Stats: 30% attack speed, 45 movement speed.
One per build: Boots, BootsWithoutActives.
Built from: Boots, Dagger, Dagger.

### Boots of Swiftness (1,000 gold)

Stats: 55 movement speed.
One per build: Boots, BootsWithoutActives.
Built from: Boots.

- **Passive: Fleetfooted** (unique). Gain 25% slow resist.

### Gluttonous Greaves (1,000 gold)

Stats: 45 movement speed, 4% omnivamp.
One per build: Boots, BootsWithoutActives.
Built from: Boots.

- **Passive: Slay** (unique). Scoring a takedown against an enemy champion grants you 0.6% omnivamp, stacking up to 10 times for a total of 6%.

### Ionian Boots of Lucidity (900 gold)

Stats: 10 ability haste, 45 movement speed.
One per build: Boots, BootsWithoutActives.
Built from: Boots, Glowing Mote.

- **Passive: Ionian Insight** (unique). Gain 10 summoner spell haste.

### Mercury's Treads (1,250 gold)

Stats: 20 magic resist, 45 movement speed, 30% tenacity.
One per build: Boots, BootsWithoutActives.
Built from: Boots, Null-Magic Mantle.

### Plated Steelcaps (1,200 gold)

Stats: 25 armor, 45 movement speed.
One per build: Boots, BootsWithoutActives.
Built from: Boots, Cloth Armor.

- **Passive: Plating** (unique). Reduces all incoming basic damage by 10% (excluding from turret attacks).

### Sorcerer's Shoes (1,100 gold)

Stats: 12 magic penetration, 45 movement speed.
One per build: Boots, BootsWithoutActives.
Built from: Boots.
