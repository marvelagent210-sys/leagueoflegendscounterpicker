# Counters to Nocturne (patch 26.21)

Every champion ranked by what its kit does against Nocturne's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nocturne's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nocturne` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.51)

- **0.90** spell shield: Spell Shield's spell shield blocks Nocturne's Paranoia. Spell shield for 1.5 s, long enough to use ahead of Paranoia. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nocturne R Paranoia)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range). Nocturne closes the gap with Paranoia. (Sivir basic attacks → Nocturne basic attacks)
- **0.27** spell shield: Spell Shield's spell shield blocks part of Nocturne's Unspeakable Horror. Spell shield for 1.5 s, long enough to use ahead of Unspeakable Horror. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the tether's application but not the damage and aftereffects of one already applied. {{{{{1<noinclude>|Ability data</noinclude>}}}|Unspeakable Horror|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Nocturne
|skill        = E
|icon         = false
|blurb        = {{sbc|Passive:}} {{ci|Nocturne}} gains {{sti|ms|{{as|'''bonus''' movement speed}}}} while moving towards {{tip|fear|feared}} targets.
|blurb2      = {{sbc|Active:}} '''Nocturne''' torments the target, forming a {{tip|tether}} that continually deals {{as|magic damage}}.
|blurb3      = If the tether is not broken after a short time, the target is briefly {{tip|fear|feared}} and {{tip|slow|slowed}}.
|description  = {{sbc|Passive:}} '''Nocturne''' gains {{sti|ms|{{as|90% '''bonus''' movement speed}}}} while facing nearby {{tip|fear|feared}} targets.
|icon2        =  Unspeakable Horror.png
|description2 = {{sbc|Active:}} '''Nocturne''' torments the target, forming a {{tip|tether}} between himself and the target for 2 seconds, during which the target takes {{as|magic damage}} every {{fd|0.5}} seconds over the duration.
|leveling2    = {{st|Total Magic Damage|{{ap|80 to 260}} {{as|(+ 100% AP)}}|Magic Damage per Tick|{{ap|80/4 to 260/4}} {{as|(+ {{ap|100/4}}% AP)}}}}
|description3 = If the tether is not broken by the end of its duration, the target is {{tip|fear|feared}} for a duration while being {{tip|slow|slowed}} by 90%.
|leveling3    = {{st|Disable Duration|{{ap|1.25 to 2.25}} seconds}}
|effect radius= {{tip|cr|icononly = true}} {{tt|1000|Fear MS radius}}
|target range = {{tip|cr|icononly = true}} 425
|tether radius= {{tip|er|icononly = true}} 465
|cooldown     = {{ap|15 to 11}}
|cost         = {{ap|60 to 80}}
|costtype     = mana
|cast time    = none
|targeting    = Unit
|affects      = Enemies
|damagetype   = Magic
|spellshield  = Special
|spelleffects = special
|projectile   = False
|callforhelp  = True
|notes        = 
* ''Unspeakable Horror'' deals {{tip|persistent damage}}, additionally tagged as {{tip|indirect damage}}, and applies {{tip|spell effects}}.
* Feared enemies in a {{tip|cr|icononly = true}} 180° total angle within '''Nocturne's''' facing direction will trigger ''Unspeakable Horror's'' passive.
* Casting ''Unspeakable Horror'' may grant '''Nocturne''' permanent {{tip|ghosting}} until he has [[death|died]].{{bug}}
* {{tip|Spell shield}} will block the tether's application but not the damage and aftereffects of one already applied.
}}. (Sivir E Spell Shield → Nocturne E Unspeakable Horror)

### 2. Vladimir (net +0.87)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Paranoia. Untargetable for 2 s, long enough to use ahead of Paranoia. (Vladimir W Sanguine Pool → Nocturne R Paranoia)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 2 s, long enough to use ahead of Unspeakable Horror. (Vladimir W Sanguine Pool → Nocturne E Unspeakable Horror)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Nocturne's (450 vs 125 attack range). Nocturne closes the gap with Paranoia. (Vladimir basic attacks → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks part of Vladimir's Hemoplague.

### 3. Gwen (net +0.78)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne R Paranoia)
- **0.32** untargetable: Hallowed Mist makes Gwen untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Gwen's Needlework.

### 4. Xayah (net +0.75)

- **0.90** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Paranoia. Untargetable for 1.5 s, long enough to use ahead of Paranoia. (Xayah R Featherstorm → Nocturne R Paranoia)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range). Nocturne closes the gap with Paranoia. (Xayah basic attacks → Nocturne basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 1.5 s, long enough to use ahead of Unspeakable Horror. (Xayah R Featherstorm → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Xayah's Featherstorm.

### 5. Yuumi (net +0.75)

- **0.90** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne R Paranoia)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nocturne E Unspeakable Horror)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Nocturne's (425 vs 125 attack range). Nocturne closes the gap with Paranoia. (Yuumi basic attacks → Nocturne basic attacks)
- Watch out: Unspeakable Horror's fear interrupts Yuumi's Final Chapter (normal channel).

### 6. Fiora (net +0.60)

- **0.90** parry: Riposte parries Nocturne's Paranoia. Parry for 0.75 s; Paranoia takes 2.22 s to land, enough to react. (Fiora W Riposte → Nocturne R Paranoia)
- **0.44** parry: Riposte parries Nocturne's Unspeakable Horror and stuns back. Parry for 0.75 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Unspeakable Horror's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Nocturne E Unspeakable Horror)
- **0.09** attack speed slow: Riposte cuts Nocturne's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Nocturne basic attacks)
- Watch out: Shroud of Darkness's spell shield blocks Fiora's Riposte.

### 7. Aurora (net +0.59)

- **0.90** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Paranoia. Untargetable for 0.4 s; Paranoia takes 2.22 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne R Paranoia)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range). Nocturne closes the gap with Paranoia. (Aurora basic attacks → Nocturne basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 0.4 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Aurora's Between Worlds.

### 8. Kayle (net +0.58)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Paranoia (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Paranoia. (Kayle R Divine Judgment → Nocturne R Paranoia)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Nocturne's (625 vs 125 attack range). Nocturne closes the gap with Paranoia. (Kayle basic attacks → Nocturne basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Nocturne's Unspeakable Horror (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unspeakable Horror. (Kayle R Divine Judgment → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks Kayle's Starfire Spellblade.

### 9. Master Yi (net +0.57)

- **0.90** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Paranoia. Untargetable for ?; Paranoia takes 2.22 s to land, enough to react. (Master Yi Q Alpha Strike → Nocturne R Paranoia)
- **0.32** untargetable: Alpha Strike makes Master Yi untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for ?; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Nocturne E Unspeakable Horror)
- **0.08** cc immunity: Highlander makes Master Yi immune to Nocturne's Unspeakable Horror (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Master Yi's Alpha Strike.

### 10. Zed (net +0.55)

- **0.90** untargetable: Death Mark makes Zed untargetable, dodging Nocturne's Paranoia. Untargetable for 0.6 s; Paranoia takes 2.22 s to land, enough to react. (Zed R Death Mark → Nocturne R Paranoia)
- **0.20** untargetable: Death Mark makes Zed untargetable, dodging Nocturne's Unspeakable Horror. Untargetable for 0.6 s; Unspeakable Horror lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Nocturne E Unspeakable Horror)
- Watch out: Shroud of Darkness's spell shield blocks part of Zed's Death Mark.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.51 | 1.51 | 0.00 |  |
| 2 | Vladimir | +0.87 | 1.37 | 0.50 |  |
| 3 | Gwen | +0.78 | 1.06 | 0.28 |  |
| 4 | Xayah | +0.75 | 1.44 | 0.69 |  |
| 5 | Yuumi | +0.75 | 1.43 | 0.68 |  |
| 6 | Fiora | +0.60 | 1.14 | 0.54 |  |
| 7 | Aurora | +0.59 | 1.29 | 0.70 |  |
| 8 | Kayle | +0.58 | 0.90 | 0.32 |  |
| 9 | Master Yi | +0.57 | 1.18 | 0.61 |  |
| 10 | Zed | +0.55 | 1.00 | 0.45 |  |
| 11 | Lissandra | +0.48 | 1.29 | 0.81 |  |
| 12 | Bard | +0.46 | 1.43 | 0.97 |  |
| 13 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 14 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 15 | Teemo | +0.36 | 0.84 | 0.48 | blind (Blinding Dart) |
| 16 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 17 | Fizz | +0.20 | 1.11 | 0.91 |  |
| 18 | Zeri | +0.16 | 0.44 | 0.28 |  |
| 19 | Shaco | +0.12 | 1.00 | 0.88 |  |
| 20 | Udyr | +0.12 | 0.82 | 0.70 |  |
| 21 | Olaf | +0.12 | 0.46 | 0.34 |  |
| 22 | Morgana | +0.11 | 0.88 | 0.77 |  |
| 23 | Kindred | +0.11 | 0.47 | 0.36 |  |
| 24 | Milio | +0.07 | 0.77 | 0.70 |  |
| 25 | Rengar | +0.02 | 0.65 | 0.63 |  |
| 26 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 27 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 28 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 29 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 30 | Nasus | -0.04 | 0.39 | 0.43 |  |
| 31 | Soraka | -0.08 | 0.27 | 0.35 |  |
| 32 | Zoe | -0.10 | 0.32 | 0.42 |  |
| 33 | Gangplank | -0.11 | 0.58 | 0.69 |  |
| 34 | Miss Fortune | -0.11 | 0.32 | 0.43 |  |
| 35 | Graves | -0.11 | 0.24 | 0.35 |  |
| 36 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 37 | Mel | -0.17 | 0.53 | 0.70 |  |
| 38 | Samira | -0.20 | 0.58 | 0.78 |  |
| 39 | Jinx | -0.21 | 0.29 | 0.50 |  |
| 40 | LeBlanc | -0.21 | 0.22 | 0.43 |  |
| 41 | Akshan | -0.22 | 0.34 | 0.56 |  |
| 42 | Karma | -0.22 | 0.22 | 0.44 |  |
| 43 | Singed | -0.23 | 0.40 | 0.63 |  |
| 44 | Corki | -0.23 | 0.32 | 0.55 |  |
| 45 | Rek'Sai | -0.25 | 1.07 | 1.32 |  |
| 46 | Nidalee | -0.28 | 0.30 | 0.58 |  |
| 47 | Ezreal | -0.32 | 0.32 | 0.64 |  |
| 48 | Garen | -0.32 | 0.32 | 0.64 |  |
| 49 | Vayne | -0.34 | 0.43 | 0.77 |  |
| 50 | Kayn | -0.35 | 1.00 | 1.35 |  |
| 51 | Lucian | -0.35 | 0.36 | 0.71 |  |
| 52 | Anivia | -0.36 | 0.24 | 0.60 |  |
| 53 | Maokai | -0.37 | 1.11 | 1.48 |  |
| 54 | Lillia | -0.37 | 0.11 | 0.48 |  |
| 55 | Aphelios | -0.38 | 0.45 | 0.83 |  |
| 56 | Evelynn | -0.39 | 1.00 | 1.39 |  |
| 57 | Smolder | -0.39 | 0.32 | 0.71 |  |
| 58 | Twisted Fate | -0.41 | 0.43 | 0.84 |  |
| 59 | Illaoi | -0.42 | 0.00 | 0.42 |  |
| 60 | Lulu | -0.43 | 0.72 | 1.15 |  |
| 61 | Braum | -0.43 | 0.45 | 0.88 | projectile block (Unbreakable) |
| 62 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 63 | Vex | -0.46 | 0.27 | 0.73 |  |
| 64 | Swain | -0.46 | 0.21 | 0.67 |  |
| 65 | Zilean | -0.47 | 0.32 | 0.79 |  |
| 66 | Malzahar | -0.48 | 0.62 | 1.10 |  |
| 67 | Kalista | -0.49 | 0.65 | 1.14 |  |
| 68 | Cassiopeia | -0.49 | 0.43 | 0.92 |  |
| 69 | Locke | -0.50 | 0.00 | 0.50 |  |
| 70 | Kennen | -0.51 | 0.29 | 0.80 |  |
| 71 | Varus | -0.52 | 0.39 | 0.91 |  |
| 72 | Mordekaiser | -0.53 | 0.31 | 0.84 |  |
| 73 | Brand | -0.53 | 0.22 | 0.75 |  |
| 74 | Draven | -0.55 | 0.36 | 0.91 |  |
| 75 | Renekton | -0.56 | 0.00 | 0.56 |  |
| 76 | Sona | -0.57 | 0.41 | 0.98 |  |
| 77 | Kha'Zix | -0.57 | 0.00 | 0.57 |  |
| 78 | Jax | -0.58 | 0.41 | 0.99 | attack dodge (Counter Strike) |
| 79 | Camille | -0.60 | 1.00 | 1.60 |  |
| 80 | Nilah | -0.60 | 0.48 | 1.08 |  |
| 81 | Elise | -0.60 | 0.32 | 0.92 |  |
| 82 | Jayce | -0.61 | 0.30 | 0.91 |  |
| 83 | Lux | -0.62 | 0.29 | 0.91 |  |
| 84 | Viktor | -0.64 | 0.32 | 0.96 |  |
| 85 | Karthus | -0.64 | 0.19 | 0.83 |  |
| 86 | Katarina | -0.64 | 0.12 | 0.76 |  |
| 87 | Annie | -0.66 | 0.22 | 0.88 |  |
| 88 | Renata Glasc | -0.67 | 0.38 | 1.05 |  |
| 89 | Senna | -0.67 | 0.32 | 0.99 |  |
| 90 | Neeko | -0.69 | 0.22 | 0.91 |  |
| 91 | Taric | -0.70 | 0.00 | 0.70 |  |
| 92 | Trundle | -0.70 | 0.00 | 0.70 |  |
| 93 | Vel'Koz | -0.71 | 0.27 | 0.98 |  |
| 94 | Kassadin | -0.71 | 0.00 | 0.71 |  |
| 95 | Heimerdinger | -0.72 | 0.27 | 0.99 |  |
| 96 | Tristana | -0.75 | 0.36 | 1.11 |  |
| 97 | Veigar | -0.77 | 0.24 | 1.01 |  |
| 98 | Aatrox | -0.77 | 0.00 | 0.77 |  |
| 99 | Yasuo | -0.80 | 0.31 | 1.11 |  |
| 100 | Orianna | -0.80 | 0.27 | 1.07 |  |
| 101 | Sion | -0.81 | 0.48 | 1.29 |  |
| 102 | Gnar | -0.81 | 0.33 | 1.14 |  |
| 103 | Syndra | -0.81 | 0.22 | 1.03 |  |
| 104 | Quinn | -0.82 | 0.38 | 1.20 |  |
| 105 | Caitlyn | -0.83 | 0.36 | 1.19 |  |
| 106 | Zaahen | -0.83 | 0.33 | 1.16 |  |
| 107 | Seraphine | -0.84 | 0.29 | 1.13 |  |
| 108 | Talon | -0.84 | 0.00 | 0.84 |  |
| 109 | Ryze | -0.86 | 0.24 | 1.10 |  |
| 110 | Bel'Veth | -0.86 | 0.00 | 0.86 |  |
| 111 | Alistar | -0.87 | 0.36 | 1.23 |  |
| 112 | Ahri | -0.87 | 0.22 | 1.09 |  |
| 113 | Lee Sin | -0.88 | 0.00 | 0.88 |  |
| 114 | Xin Zhao | -0.89 | 0.53 | 1.42 |  |
| 115 | Ivern | -0.89 | 0.19 | 1.08 |  |
| 116 | Akali | -0.90 | 0.00 | 0.90 |  |
| 117 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 118 | Shyvana | -0.90 | 0.00 | 0.90 |  |
| 119 | Hwei | -0.92 | 0.23 | 1.15 |  |
| 120 | Irelia | -0.93 | 0.05 | 0.98 |  |
| 121 | Skarner | -0.94 | 0.09 | 1.03 |  |
| 122 | Cho'Gath | -0.96 | 0.00 | 0.96 |  |
| 123 | Azir | -0.99 | 0.27 | 1.26 |  |
| 124 | Xerath | -0.99 | 0.27 | 1.26 |  |
| 125 | Urgot | -0.99 | 0.15 | 1.14 |  |
| 126 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 127 | Jhin | -1.02 | 0.27 | 1.29 |  |
| 128 | Ziggs | -1.03 | 0.27 | 1.30 |  |
| 129 | Malphite | -1.04 | 0.25 | 1.29 |  |
| 130 | Wukong | -1.04 | 0.00 | 1.04 |  |
| 131 | Rammus | -1.05 | 0.38 | 1.43 |  |
| 132 | Zyra | -1.05 | 0.24 | 1.29 |  |
| 133 | Kled | -1.06 | 0.44 | 1.50 |  |
| 134 | Diana | -1.08 | 0.00 | 1.08 |  |
| 135 | Jarvan IV | -1.09 | 0.00 | 1.09 |  |
| 136 | Amumu | -1.10 | 0.00 | 1.10 |  |
| 137 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 138 | Yone | -1.10 | 0.00 | 1.10 |  |
| 139 | Shen | -1.11 | 0.39 | 1.50 |  |
| 140 | Fiddlesticks | -1.11 | 0.20 | 1.31 |  |
| 141 | Thresh | -1.11 | 0.19 | 1.30 |  |
| 142 | Darius | -1.12 | 0.00 | 1.12 |  |
| 143 | Nami | -1.14 | 0.22 | 1.36 |  |
| 144 | Pantheon | -1.15 | 0.59 | 1.74 |  |
| 145 | Aurelion Sol | -1.17 | 0.22 | 1.39 |  |
| 146 | Blitzcrank | -1.26 | 0.00 | 1.26 |  |
| 147 | Leona | -1.26 | 0.00 | 1.26 |  |
| 148 | Ornn | -1.27 | 0.00 | 1.27 |  |
| 149 | Sylas | -1.28 | 0.00 | 1.28 |  |
| 150 | Ekko | -1.31 | 0.00 | 1.31 |  |
| 151 | Qiyana | -1.35 | 0.00 | 1.35 |  |
| 152 | Rakan | -1.37 | 0.13 | 1.50 |  |
| 153 | Sett | -1.39 | 0.00 | 1.39 |  |
| 154 | Volibear | -1.42 | 0.00 | 1.42 |  |
| 155 | Warwick | -1.43 | 0.34 | 1.77 |  |
| 156 | Taliyah | -1.47 | 0.27 | 1.74 |  |
| 157 | Hecarim | -1.48 | 0.00 | 1.48 |  |
| 158 | Janna | -1.50 | 0.36 | 1.86 |  |
| 159 | Briar | -1.50 | 0.00 | 1.50 |  |
| 160 | Sejuani | -1.54 | 0.00 | 1.54 |  |
| 161 | Nunu & Willump | -1.56 | 0.20 | 1.76 |  |
| 162 | Poppy | -1.56 | 0.00 | 1.56 |  |
| 163 | Riven | -1.59 | 0.00 | 1.59 |  |
| 164 | Viego | -1.62 | 0.09 | 1.71 |  |
| 165 | Tahm Kench | -1.69 | 0.00 | 1.69 |  |
| 166 | Zac | -1.73 | 0.00 | 1.73 |  |
| 167 | K'Sante | -1.74 | 0.00 | 1.74 |  |
| 168 | Pyke | -1.76 | 0.00 | 1.76 |  |
| 169 | Gragas | -1.83 | 0.00 | 1.83 |  |
| 170 | Rell | -1.84 | 0.00 | 1.84 |  |
| 171 | Vi | -2.01 | 0.00 | 2.01 |  |
| 172 | Galio | -2.24 | 0.00 | 2.24 |  |
