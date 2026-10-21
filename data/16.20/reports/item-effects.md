# Item effects, patch 26.20

What the duel simulator makes of each item (items/, PLAN.md §13, M8): the effects it models from the item's wiki text, what it leaves out and why, and the simplifications it makes. Every number comes from the wiki's text: a quote that is no longer there fails the build.

116 items (the 113 of the catalog and 3 transformed Tear items): 5 have stats only, 83 have every effect modeled, 12 have none that can act in a duel, and the rest leave part out.

The rules the items follow beyond their own text come from pinned wiki pages: Combat status (revision 4058480), Critical strike (revision 4059009), Template:Critical damage (revision 4001015), Template:Tip data/Energized (revision 4013385), Vamp (revision 4058226).

Actives can be used under any crowd control but knock-ups and stuns (suppression, sleep and stasis count as stuns), and Mercurial Scimitar's Quicksilver under stuns too, never knocked up; a dash not while rooted or grounded either (confirmed on review, 20 October; the wiki's own rule stops items under every cast-inhibiting type).

## Finished items

### Abyssal Mask

Modeled: Unmake.

### Actualizer

- Left out: Mana Made Real: its doubled mana costs and faster cooldowns aren't modeled yet, so it isn't cast.

### Archangel's Staff

Modeled: Awe, Manaflow, the passive "Transforms into Seraph's Embrace at 360 bonus mana".
- Assumed: Manaflow stacks no mana during a duel, which is too short; the mana it stacked before the fight is an option.
- Option: Bonus mana Manaflow stacked before the fight (it transforms at 360) (option `mana`, default 0)

### Ardent Censer

- Left out: Heal and shield power: not modeled yet.
- Left out: Sanctify: it works through allied champions, which a duel doesn't have.

### Axiom Arc

- Left out: Flux: a takedown ends the duel.

### Bandlepipes

Modeled: Fanfare.

### Banshee's Veil

Modeled: Annul.
- Assumed: Annul is up when the fight starts.

### Bastionbreaker

Modeled: Shaped Charge.
- Left out: Sabotage: a takedown ends the duel, and there are no turrets.

### Black Cleaver

Modeled: Carve, Fervor.

### Blackfire Torch

Modeled: Baleful Blaze, Blackfire.
- Assumed: Baleful Blaze burns on the kit's ability damage, its damage over time included; a new burn replaces the one running.

### Blade of the Ruined King

Modeled: Mist's Edge, Clawing Shadows.

### Bloodletter's Curse

Modeled: Vile Decay.

### Bloodthirster

Modeled: Ichorshield.
- Assumed: Ichorshield: the life steal a basic attack's damage would heal beyond maximum health, from the health the holder had when the tick began.

### Chempunk Chainsword

Modeled: Hackshorn.

### Cosmic Drive

Modeled: Spelldance.

### Cryptbloom

- Left out: Life From Death: a takedown ends the duel.

### Dawncore

Modeled: First Light.
- Left out: Heal and shield power: not modeled yet.
- Assumed: First Light counts the base mana regeneration the build's items give in the shop, in proportion; its heal and shield power isn't modeled yet.

### Dead Man's Plate

Modeled: Shipwrecker, Unsinkable.
- Assumed: Shipwrecker has 100 stacks of Momentum when the fight starts, from walking to it; its damage grows evenly with the stacks.

### Death's Dance

Modeled: Ignore Pain.
- Left out: Defy: it needs a kill, which ends the duel.
- Assumed: Ignore Pain takes its share of each hit after shields, and each hit's stored damage bleeds on its own, a third each second; the holder deals the bleed to itself.

### Dusk and Dawn

Modeled: Spellblade.
- Assumed: Spellblade's repeated on-hit effects are the attack's on-hit effects; effects the kit's or items' hooks add when attacks hit aren't repeated.

### Echoes of Helia

- Left out: Soul Siphon: it works through allied champions, which a duel doesn't have.

### Eclipse

Modeled: Ever Rising Moon.
- Assumed: Ever Rising Moon counts each damage instance the holder deals that isn't damage over time, and each crowd control it applies, as a stack; the hits of one cast at the same tick count once.

### Edge of Night

Modeled: Annul.
- Assumed: Annul is up when the fight starts.

### Endless Hunger

Modeled: Famine.
- Left out: Feast: a takedown ends the duel.

### Essence Reaver

Modeled: Spellblade.

### Experimental Hexplate

Modeled: Hexcharged, Overdrive.

### Fiendhunter Bolts

Modeled: Night Vigil, Opening Barrage.
- Assumed: Opening Barrage's empowered attacks average their two outcomes by the holder's critical strike chance, as other critical strikes do; their bonus damage is a share of the base 100%, before champions' critical damage modifiers.

### Force of Nature

Modeled: Steadfast.

### Frozen Heart

Modeled: Winter's Caress.
- Assumed: Winter's Caress takes 20% off the enemy's attack speed as a multiplier, added to its other attack speed multipliers; it isn't crowd control.

### Guardian Angel

Modeled: Rebirth.
- Assumed: Rebirth's resurrection is stasis: invulnerable, untargetable and unable to act. Its 300-second cooldown outlasts any fight, so it happens once.

### Guinsoo's Rageblade

Modeled: Wrath, Seething Strike.
- Assumed: Seething Strike: an attack made at maximum stacks grants a Phantom stack, from the fifth attack on. A Phantom Hit repeats the attack's on-hit effects (the kit's and the items'), but not effects the kit's or items' hooks add when attacks hit (Spellblade, Kraken Slayer); its damage doesn't heal through life steal.

### Heartsteel

Modeled: Colossal Consumption.
- Left out: Goliath: the simulator doesn't change champions' size.
- Assumed: Colossal Consumption stacks while the enemy is within 700 units of the holder's edge; the permanent health it gives is pre-mitigation damage's 10%.
- Option: Bonus health Colossal Consumption gave before the fight (option `stacked`, default 0)

### Hexoptics C44

Modeled: Magnification.
- Left out: Arcane Aim: a takedown ends the duel.
- Assumed: Magnification grows evenly with distance, to 10% at 500 units edge to edge; it amplifies the basic attack's own damage, not its on-hit effects.

### Hextech Gunblade

Modeled: Lightning Bolt.
- Assumed: Lightning Bolt lands at once: the wiki gives no speed for the bolt.
- Assumed: Lightning Bolt: "Shocks the target enemy champion with a bolt of lightning" has no value past level 18; its level-18 value is used at 20.

### Hextech Rocketbelt

Modeled: Supersonic.
- Assumed: Supersonic's dash and rockets land at once: the wiki gives no speed for either; its rockets hit an enemy up to 1050 units ahead.

### Hollow Radiance

Modeled: Immolate, Desolate.
- Assumed: Immolate's radius is 325 units: champions have no bonus size in the simulator.
- Assumed: Desolate's larger eruption, on a champion takedown, never goes off: the takedown ends the duel.

### Horizon Focus

Modeled: Hypershot.
- Left out: Focus: its sight and marks on other enemies don't matter in a duel.
- Assumed: Hypershot measures 600 units from where the holder stands when the damage lands, center to center.

### Hubris

- Left out: Eminence: a takedown ends the duel.

### Hullbreaker

Modeled: Skipper.
- Left out: Boarding Party: there are no minions in a duel.
- Assumed: Skipper: an attack made with 4 stacks or more spends them ("at maximum stacks, or 4 stacks"): every fifth attack.

### Iceborn Gauntlet

Modeled: Spellblade.
- Assumed: Spellblade's frost field is where the target stood when hit; its slow lasts while the target stays inside it, up to the field's 2 seconds.

### Immortal Shieldbow

Modeled: Lifeline.

### Imperial Mandate

Modeled: Control, Command.

### Infinity Edge

Stats only.

### Jak'Sho, The Protean

Modeled: Voidborn Resilience.
- Assumed: Voidborn Resilience's 30% is of the bonus armor and magic resistance the holder has when it reaches maximum stacks.

### Kaenic Rookern

Modeled: Magebane.
- Assumed: Magebane's shield is up when the fight starts.

### Knight's Vow

- Left out: Sacrifice: it works through allied champions, which a duel doesn't have.
- Left out: Pledge: it works through allied champions, which a duel doesn't have.

### Kraken Slayer

Modeled: Bring It Down.
- Assumed: Bring It Down's bonus grows evenly with the target's missing health, to 75% at full missing health (the wiki shows it in steps of 5%).

### Liandry's Torment

Modeled: Torment, Suffering.
- Assumed: Torment burns on the kit's ability damage, its damage over time included; a new burn replaces the one running. Pets' damage doesn't burn: their hits aren't the holder's.

### Lich Bane

Modeled: Spellblade.

### Locket of the Iron Solari

Modeled: Devotion.

### Lord Dominik's Regards

Modeled: Giant Slayer.
- Assumed: Giant Slayer grows evenly with the target's bonus health, to 15% at 1500.

### Luden's Echo

Modeled: Echo.
- Assumed: Echo's orbs for other enemies within 600 units add to the primary target's damage instead: in a duel they can only be pets.

### Malignance

Modeled: Scorn, Hatefog.
- Assumed: Hatefog's zone is centered where its target stood; its radius follows the triggering hit's damage before mitigation, between the wiki's points; it curses the target while the target stays in it.

### Manamune

Modeled: Awe, Manaflow, the passive "Transforms into Muramana at 360 bonus mana".
- Assumed: Manaflow stacks no mana during a duel, which is too short; the mana it stacked before the fight is an option.
- Option: Bonus mana Manaflow stacked before the fight (it transforms at 360) (option `mana`, default 0)

### Maw of Malmortius

Modeled: Lifeline.

### Mejai's Soulstealer

Modeled: Glory.
- Option: Glory stacks from kills and assists before the fight (25 at most) (option `stacks`, default 0)

### Mercurial Scimitar

Modeled: Quicksilver.

### Mikael's Blessing

Modeled: Purify.
- Left out: Heal and shield power: not modeled yet.
- Assumed: Purify: "and heal the target for" has no value past level 18; its level-18 value is used at 20.

### Moonstone Renewer

- Left out: Starlit Grace: it works through allied champions, which a duel doesn't have.

### Morellonomicon

Modeled: Grievous Wounds.

### Mortal Reminder

Modeled: Grievous Wounds.

### Nashor's Tooth

Modeled: Icathian Bite.

### Navori Flickerblade

Modeled: Transcendence.

### Overlord's Bloodmail

Modeled: Tyranny, Retribution.
- Assumed: Retribution grows evenly with missing health, to 12% at 70% missing health (the wiki shows it in 1% steps).

### Phantom Dancer

Modeled: Spectral Waltz.

### Profane Hydra

Modeled: Heretical Cleave.
- Left out: Cleave: its damage to other enemies isn't modeled: in a duel they can only be pets.

### Protoplasm Harness

Modeled: Lifeline.
- Assumed: Lifeline: "you first gain" has no value past level 18; its level-18 value is used at 20.

### Rabadon's Deathcap

Modeled: Magical Opus.

### Randuin's Omen

Modeled: Humility.
- Left out: Resilience: the simulator's damage hooks can't tell a critical outcome from an ordinary one yet.

### Rapid Firecannon

Modeled: Energized, Sharpshooter.
- Assumed: Energized: the holder is fully Energized when the fight starts, from walking to it. An Energized attack on a pet spends the charges, but its effects don't hit the pet.

### Ravenous Hydra

Modeled: Ravenous Crescent.
- Left out: Cleave: its damage to other enemies isn't modeled: in a duel they can only be pets.

### Redemption

Modeled: Intervention.
- Left out: Heal and shield power: not modeled yet.
- Assumed: Intervention: "Allies within the area are healed for" has no value past level 18; its level-18 value is used at 20.
- Assumed: Intervention strikes where the enemy stands; it heals the holder too when the holder is within its radius of the enemy.

### Riftmaker

Modeled: Void Corruption, Void Infusion.

### Rod of Ages

Modeled: Timeless, Eternity.
- Assumed: Eternity heals evenly with the mana a cast costs, up to 20; Timeless's level does nothing at level 20.
- Option: Minutes Rod of Ages has stacked before the fight (10 at most) (option `minutes`, default 10)

### Runaan's Hurricane

- Left out: Wind's Fury: its bolts go to enemies other than the target, which in a duel can only be pets, and aren't modeled.

### Rylai's Crystal Scepter

Modeled: Rimefrost.
- Assumed: Rimefrost slows on all the kit's ability damage, its damage over time included.

### Serpent's Fang

Modeled: Shield Reaver.
- Assumed: Shield Reaver cuts a shield the enemy gains while venomed on the next tick after it gains it.

### Serylda's Grudge

Modeled: Bitter Cold.

### Shadowflame

Modeled: Cinderbloom.

### Shurelya's Battlesong

Modeled: Inspiring Speech.

### Spear of Shojin

Modeled: Dragonforce, Focused Will.
- Assumed: Focused Will counts each ability's damage as its cast instance; its bonus is on the kit's non-innate ability damage, damage over time included.

### Spirit Visage

Modeled: Boundless Vitality.
- Assumed: Boundless Vitality increases healing and health regeneration; its shielding part isn't modeled, the simulator having no stat for shields received.

### Staff of Flowing Water

- Left out: Heal and shield power: not modeled yet.
- Left out: Rapids: it works through allied champions, which a duel doesn't have.

### Statikk Shiv

Modeled: Energized, Electroshock, Electrospark.
- Assumed: Energized: the holder is fully Energized when the fight starts, from walking to it. An Energized attack on a pet spends the charges, but its effects don't hit the pet.
- Assumed: Electrospark's bounces to other targets aren't modeled: in a duel they can only be pets.

### Sterak's Gage

Modeled: The Claws that Catch, Lifeline.

### Stormrazor

Modeled: Energized, Bolt.
- Assumed: Energized: the holder is fully Energized when the fight starts, from walking to it. An Energized attack on a pet spends the charges, but its effects don't hit the pet.

### Stormsurge

Modeled: Stormraider, Squall.

### Stridebreaker

Modeled: Breaking Shockwave.
- Left out: Cleave: its damage to other enemies isn't modeled: in a duel they can only be pets.

### Sundered Sky

Modeled: Lightshield Strike.
- Assumed: Lightshield Strike's critical strike deals 160% of the attack's damage whatever the holder's critical strike damage.

### Sunfire Aegis

Modeled: Immolate.
- Assumed: Immolate's radius is 325 units: champions have no bonus size in the simulator.

### Terminus

Modeled: Shadow, Juxtaposition.
- Assumed: Juxtaposition starts with a Light hit; each kind's stacks last 5 seconds from its last hit, and its penetration is one source of 10% a stack.

### The Collector

Modeled: Death.
- Left out: Taxes: gold doesn't matter in a duel.

### Thornmail

Modeled: Thorns.

### Titanic Hydra

Modeled: Cleave, Titanic Crescent.
- Assumed: Cleave's and Titanic Crescent's damage to other enemies isn't modeled: in a duel they can only be pets.

### Trinity Force

Modeled: Spellblade, Quicken.

### Umbral Glaive

Modeled: Nightstalker.
- Left out: Blackout: there are no wards in a duel.

### Unending Despair

Modeled: Anguish.

### Void Staff

Stats only.

### Voltaic Cyclosword

Modeled: Energized, Galvanize, Firmament.
- Assumed: Energized: the holder is fully Energized when the fight starts, from walking to it. An Energized attack on a pet spends the charges, but its effects don't hit the pet.

### Warmog's Armor

Modeled: the passive "Grants Warmog's Heart if you have at least 2000 bonus health", Warmog's Heart, Warmog's Vitality.
- Assumed: Warmog's Vitality's 12% is of the health the build's items give in the shop.

### Winter's Approach

Modeled: Awe, Manaflow, the passive "Transforms into Fimbulwinter at 360 bonus mana".
- Assumed: Manaflow stacks no mana during a duel, which is too short; the mana it stacked before the fight is an option.
- Option: Bonus mana Manaflow stacked before the fight (it transforms at 360) (option `mana`, default 0)

### Wit's End

Modeled: Fray.

### Youmuu's Ghostblade

Modeled: Haunt, Wraith Step.

### Yun Tal Wildarrows

Modeled: Practice Makes Lethal, Flurry.
- Assumed: Flurry's cooldown shrinks on each hit by its expected reduction: 1 second, or 2 when the attack critically strikes.
- Option: Share of Practice Makes Lethal's stacks collected before the fight (by level 20, all of them) (option `stacked`, default 1)

### Zeke's Convergence

Modeled: Cryocombustion, Frostfire Tempest.

### Zhonya's Hourglass

Modeled: Time Stop.

## Boots

### Berserker's Greaves

Stats only.

### Boots of Swiftness

Modeled: Fleetfooted.

### Gluttonous Greaves

- Left out: Slay: a takedown ends the duel.

### Ionian Boots of Lucidity

- Left out: Ionian Insight: the simulator has no summoner spells.

### Mercury's Treads

Stats only.

### Plated Steelcaps

Modeled: Plating.
- Assumed: Plating reduces the basic attack's own damage, not its on-hit effects.

### Sorcerer's Shoes

Stats only.

## Transformed items

### Seraph's Embrace

Modeled: Awe, Lifeline.

### Muramana

Modeled: Awe, Shock.

### Fimbulwinter

Modeled: Awe, Everlasting.
- Assumed: Everlasting's larger shield needs more than one enemy champion nearby, which a duel doesn't have.
