# Counters to Nunu & Willump (patch 26.20)

Every champion ranked by what its kit does against Nunu & Willump's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nunu & Willump's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nunu` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +2.13)

- **0.65** range: Elise's basic attacks reach 425 units farther than Nunu & Willump's (550 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Elise basic attacks → Nunu & Willump basic attacks)
- **0.61** untargetable: Rappel makes Elise untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for 0.6 s; Biggest Snowball Ever! takes 1.76 s to land, enough to react. (Elise E Rappel → Nunu & Willump W Biggest Snowball Ever!)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Nunu & Willump's Snowball Barrage. Untargetable for 0.6 s; Snowball Barrage takes 0.35 s to land, enough to react. (Elise E Rappel → Nunu & Willump E Snowball Barrage)

### 2. Sivir (net +1.99)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Nunu & Willump's (500 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Sivir basic attacks → Nunu & Willump basic attacks)
- **0.61** spell shield: Spell Shield's spell shield blocks Nunu & Willump's Biggest Snowball Ever!. Spell shield for 1.5 s, long enough to use ahead of Biggest Snowball Ever!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nunu & Willump W Biggest Snowball Ever!)
- **0.55** spell shield: Spell Shield's spell shield blocks Nunu & Willump's Absolute Zero. Spell shield for 1.5 s, long enough to use ahead of Absolute Zero. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nunu & Willump R Absolute Zero)

### 3. Xayah (net +1.57)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Nunu & Willump's (525 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Xayah basic attacks → Nunu & Willump basic attacks)
- **0.52** untargetable: Featherstorm makes Xayah untargetable, dodging Nunu & Willump's Absolute Zero. Untargetable for 1.5 s, long enough to use ahead of Absolute Zero. (Xayah R Featherstorm → Nunu & Willump R Absolute Zero)
- **0.34** untargetable: Featherstorm makes Xayah untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for 1.5 s, long enough to use ahead of Biggest Snowball Ever!. (Xayah R Featherstorm → Nunu & Willump W Biggest Snowball Ever!)

### 4. Nocturne (net +1.56)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Nunu & Willump's Biggest Snowball Ever!. Spell shield for 1.5 s, long enough to use ahead of Biggest Snowball Ever!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nunu & Willump W Biggest Snowball Ever!)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Nunu & Willump's Snowball Barrage. Spell shield for 1.5 s, long enough to use ahead of Snowball Barrage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nunu & Willump E Snowball Barrage)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Nunu & Willump's Absolute Zero. Spell shield for 1.5 s, long enough to use ahead of Absolute Zero. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Nunu & Willump R Absolute Zero)
- Watch out: Biggest Snowball Ever! makes Nunu & Willump immune to Nocturne's Unspeakable Horror slow.

### 5. Milio (net +1.52)

- **0.77** range: Milio's basic attacks reach 400 units farther than Nunu & Willump's (525 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Milio basic attacks → Nunu & Willump basic attacks)
- **0.35** interrupt: Ultra Mega Fire Kick's airborne interrupts Nunu & Willump's Biggest Snowball Ever! (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Nunu & Willump W Biggest Snowball Ever!)
- **0.28** interrupt: Ultra Mega Fire Kick's airborne interrupts Nunu & Willump's Absolute Zero (normal channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Nunu & Willump R Absolute Zero)
- Watch out: Biggest Snowball Ever! makes Nunu & Willump immune to Milio's Ultra Mega Fire Kick slow.

### 6. Maokai (net +1.47)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Nunu & Willump's Snowball Barrage. Untargetable for 1.4 s; Snowball Barrage takes 0.35 s to land, enough to react. (Maokai W Twisted Advance → Nunu & Willump E Snowball Barrage)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for 1.4 s; Biggest Snowball Ever! takes 1.76 s to land, enough to react. (Maokai W Twisted Advance → Nunu & Willump W Biggest Snowball Ever!)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Nunu & Willump's Consume. Untargetable for 1.4 s; Consume takes 0.3 s to land, enough to react. (Maokai W Twisted Advance → Nunu & Willump Q Consume)
- Watch out: Biggest Snowball Ever! makes Nunu & Willump immune to Maokai's Bramble Smash slow.

### 7. Bard (net +1.44)

- **0.72** range: Bard's basic attacks reach 375 units farther than Nunu & Willump's (500 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Bard basic attacks → Nunu & Willump basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Nunu & Willump's Absolute Zero. Untargetable for 2.5 s, long enough to use ahead of Absolute Zero. (Bard R Tempered Fate → Nunu & Willump R Absolute Zero)
- **0.35** untargetable: Tempered Fate makes Bard untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for 2.5 s, long enough to use ahead of Biggest Snowball Ever!. (Bard R Tempered Fate → Nunu & Willump W Biggest Snowball Ever!)
- Watch out: Biggest Snowball Ever! makes Nunu & Willump immune to Bard's Cosmic Binding slow.

### 8. Yuumi (net +1.43)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Nunu & Willump's Snowball Barrage. Untargetable for ?; Snowball Barrage takes 0.35 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nunu & Willump E Snowball Barrage)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for ?; Biggest Snowball Ever! takes 1.76 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nunu & Willump W Biggest Snowball Ever!)
- **0.64** range: Yuumi's basic attacks reach 300 units farther than Nunu & Willump's (425 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Yuumi basic attacks → Nunu & Willump basic attacks)
- Watch out: Biggest Snowball Ever!'s airborne interrupts Yuumi's Final Chapter (normal channel).

### 9. Vayne (net +1.35)

- **0.86** range: Vayne's basic attacks reach 425 units farther than Nunu & Willump's (550 vs 125 attack range). Nunu & Willump has no dash or blink to close the gap. (Vayne basic attacks → Nunu & Willump basic attacks)
- **0.35** interrupt: Condemn's airborne interrupts Nunu & Willump's Biggest Snowball Ever! (movement channel). Condemn must land during the channel. (Vayne E Condemn → Nunu & Willump W Biggest Snowball Ever!)
- **0.28** interrupt: Condemn's airborne interrupts Nunu & Willump's Absolute Zero (normal channel). Condemn must land during the channel. (Vayne E Condemn → Nunu & Willump R Absolute Zero)

### 10. Rek'Sai (net +1.33)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nunu & Willump's Absolute Zero. Untargetable for 1.5 s, long enough to use ahead of Absolute Zero. (Rek'Sai R Void Rush → Nunu & Willump R Absolute Zero)
- **0.35** interrupt: Unburrow's airborne interrupts Nunu & Willump's Biggest Snowball Ever! (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Nunu & Willump W Biggest Snowball Ever!)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Nunu & Willump's Biggest Snowball Ever!. Untargetable for 1.5 s, long enough to use ahead of Biggest Snowball Ever!. (Rek'Sai R Void Rush → Nunu & Willump W Biggest Snowball Ever!)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +2.13 | 2.13 | 0.00 | range (attacks) |
| 2 | Sivir | +1.99 | 1.99 | 0.00 | range (attacks) |
| 3 | Xayah | +1.57 | 1.57 | 0.00 | range (attacks) |
| 4 | Nocturne | +1.56 | 1.76 | 0.20 |  |
| 5 | Milio | +1.52 | 1.72 | 0.20 | range (attacks) |
| 6 | Maokai | +1.47 | 1.69 | 0.22 |  |
| 7 | Bard | +1.44 | 1.58 | 0.14 | range (attacks) |
| 8 | Yuumi | +1.43 | 1.84 | 0.41 | range (attacks) |
| 9 | Vayne | +1.35 | 1.35 | 0.00 | range (attacks) |
| 10 | Rek'Sai | +1.33 | 1.33 | 0.00 |  |
| 11 | Vladimir | +1.29 | 1.46 | 0.17 |  |
| 12 | Samira | +1.22 | 1.22 | 0.00 | range (attacks), projectile block (Blade Whirl) |
| 13 | Morgana | +1.18 | 1.35 | 0.17 |  |
| 14 | Yasuo | +1.18 | 1.18 | 0.00 | projectile block (Wind Wall) |
| 15 | Sona | +1.17 | 1.17 | 0.00 | range (attacks) |
| 16 | Kindred | +1.15 | 1.28 | 0.13 | range (attacks) |
| 17 | Renata Glasc | +1.10 | 1.23 | 0.13 | range (attacks) |
| 18 | Braum | +1.09 | 1.37 | 0.28 | projectile block (Unbreakable) |
| 19 | Kled | +1.07 | 1.26 | 0.19 |  |
| 20 | Kennen | +1.07 | 1.07 | 0.00 | range (attacks) |
| 21 | Fiora | +1.06 | 1.20 | 0.14 |  |
| 22 | Lulu | +1.05 | 1.34 | 0.29 | range (attacks) |
| 23 | Malzahar | +1.04 | 1.44 | 0.40 |  |
| 24 | Kayle | +1.04 | 1.17 | 0.13 | range (attacks) |
| 25 | Udyr | +1.03 | 1.18 | 0.15 |  |
| 26 | Zaahen | +1.02 | 1.02 | 0.00 |  |
| 27 | Lissandra | +1.01 | 1.30 | 0.29 |  |
| 28 | Ashe | +1.01 | 1.10 | 0.09 | range (attacks) |
| 29 | Draven | +1.00 | 1.21 | 0.21 | range (attacks) |
| 30 | Zilean | +1.00 | 1.14 | 0.14 | range (attacks) |
| 31 | Camille | +0.99 | 1.12 | 0.13 |  |
| 32 | Kalista | +0.99 | 1.12 | 0.13 | range (attacks) |
| 33 | Master Yi | +0.97 | 1.16 | 0.19 |  |
| 34 | Veigar | +0.97 | 0.97 | 0.00 |  |
| 35 | Quinn | +0.96 | 1.26 | 0.30 | range (attacks) |
| 36 | Aurora | +0.94 | 1.19 | 0.25 | range (attacks) |
| 37 | Jayce | +0.94 | 1.10 | 0.16 | range (attacks) |
| 38 | Zoe | +0.93 | 1.14 | 0.21 | range (attacks) |
| 39 | Alistar | +0.93 | 0.93 | 0.00 |  |
| 40 | Annie | +0.93 | 0.93 | 0.00 |  |
| 41 | Twisted Fate | +0.91 | 1.35 | 0.44 | range (attacks) |
| 42 | Corki | +0.91 | 1.11 | 0.20 | range (attacks) |
| 43 | Evelynn | +0.91 | 1.11 | 0.20 |  |
| 44 | Mel | +0.90 | 1.10 | 0.20 | range (attacks), projectile block (Rebuttal) |
| 45 | Tristana | +0.89 | 1.07 | 0.18 | range (attacks) |
| 46 | Ziggs | +0.88 | 1.02 | 0.14 | range (attacks) |
| 47 | Taric | +0.88 | 0.88 | 0.00 |  |
| 48 | Shaco | +0.86 | 1.10 | 0.24 |  |
| 49 | Vex | +0.86 | 1.06 | 0.20 | range (attacks) |
| 50 | Teemo | +0.86 | 1.03 | 0.17 | range (attacks) |
| 51 | Soraka | +0.85 | 0.99 | 0.14 | range (attacks) |
| 52 | Zyra | +0.85 | 0.85 | 0.00 |  |
| 53 | Gwen | +0.82 | 0.99 | 0.17 |  |
| 54 | Garen | +0.82 | 0.82 | 0.00 |  |
| 55 | Viktor | +0.81 | 1.02 | 0.21 | range (attacks) |
| 56 | Neeko | +0.81 | 0.81 | 0.00 |  |
| 57 | Azir | +0.78 | 0.90 | 0.12 | range (attacks) |
| 58 | Orianna | +0.78 | 0.90 | 0.12 | range (attacks) |
| 59 | Sion | +0.77 | 1.08 | 0.31 |  |
| 60 | Seraphine | +0.77 | 1.07 | 0.30 | range (attacks) |
| 61 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 62 | Brand | +0.76 | 0.93 | 0.17 |  |
| 63 | Janna | +0.75 | 1.21 | 0.46 | range (attacks) |
| 64 | Warwick | +0.75 | 1.11 | 0.36 |  |
| 65 | Gnar | +0.75 | 1.06 | 0.31 | range (attacks) |
| 66 | Zeri | +0.75 | 0.88 | 0.13 | range (attacks) |
| 67 | Heimerdinger | +0.73 | 0.99 | 0.26 |  |
| 68 | Anivia | +0.73 | 0.97 | 0.24 |  |
| 69 | Twitch | +0.73 | 0.86 | 0.13 | range (attacks) |
| 70 | Ahri | +0.72 | 0.93 | 0.21 |  |
| 71 | Swain | +0.72 | 0.91 | 0.19 |  |
| 72 | Hwei | +0.70 | 0.95 | 0.25 |  |
| 73 | Nami | +0.68 | 0.93 | 0.25 |  |
| 74 | Syndra | +0.68 | 0.92 | 0.24 |  |
| 75 | Xerath | +0.67 | 1.02 | 0.35 | range (attacks) |
| 76 | Rengar | +0.67 | 0.87 | 0.20 |  |
| 77 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 78 | Vel'Koz | +0.64 | 1.02 | 0.38 | range (attacks) |
| 79 | Xin Zhao | +0.64 | 0.91 | 0.27 |  |
| 80 | Thresh | +0.64 | 0.88 | 0.24 |  |
| 81 | Nilah | +0.62 | 0.87 | 0.25 |  |
| 82 | Gangplank | +0.62 | 0.82 | 0.20 |  |
| 83 | Singed | +0.62 | 0.76 | 0.14 |  |
| 84 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 85 | Kayn | +0.56 | 1.11 | 0.55 |  |
| 86 | Aphelios | +0.56 | 0.87 | 0.31 | range (attacks) |
| 87 | Yunara | +0.56 | 0.72 | 0.16 | range (attacks) |
| 88 | Jax | +0.56 | 0.56 | 0.00 |  |
| 89 | Yone | +0.56 | 0.56 | 0.00 |  |
| 90 | Varus | +0.55 | 0.71 | 0.16 | range (attacks) |
| 91 | Cassiopeia | +0.53 | 0.81 | 0.28 |  |
| 92 | Aurelion Sol | +0.53 | 0.78 | 0.25 |  |
| 93 | Ekko | +0.52 | 0.69 | 0.17 |  |
| 94 | Urgot | +0.51 | 0.79 | 0.28 |  |
| 95 | Senna | +0.51 | 0.65 | 0.14 | range (attacks) |
| 96 | Amumu | +0.49 | 0.49 | 0.00 |  |
| 97 | Blitzcrank | +0.49 | 0.49 | 0.00 |  |
| 98 | Rell | +0.49 | 0.49 | 0.00 |  |
| 99 | Renekton | +0.49 | 0.49 | 0.00 |  |
| 100 | Riven | +0.49 | 0.49 | 0.00 |  |
| 101 | Zed | +0.46 | 0.60 | 0.14 |  |
| 102 | Smolder | +0.45 | 0.65 | 0.20 | range (attacks) |
| 103 | Lux | +0.45 | 0.58 | 0.13 | range (attacks) |
| 104 | Lucian | +0.44 | 0.72 | 0.28 | range (attacks) |
| 105 | Jinx | +0.44 | 0.58 | 0.14 | range (attacks) |
| 106 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 107 | Taliyah | +0.42 | 1.02 | 0.60 | range (attacks) |
| 108 | Irelia | +0.42 | 0.59 | 0.17 |  |
| 109 | Olaf | +0.42 | 0.55 | 0.13 |  |
| 110 | K'Sante | +0.41 | 0.63 | 0.22 |  |
| 111 | Kog'Maw | +0.41 | 0.54 | 0.13 | range (attacks) |
| 112 | Akshan | +0.40 | 0.68 | 0.28 | range (attacks) |
| 113 | Fiddlesticks | +0.39 | 0.88 | 0.49 |  |
| 114 | Malphite | +0.39 | 0.54 | 0.15 |  |
| 115 | Mordekaiser | +0.38 | 0.55 | 0.17 |  |
| 116 | Rammus | +0.37 | 0.76 | 0.39 |  |
| 117 | Rakan | +0.37 | 0.62 | 0.25 |  |
| 118 | Sylas | +0.37 | 0.49 | 0.12 |  |
| 119 | Wukong | +0.37 | 0.37 | 0.00 |  |
| 120 | Caitlyn | +0.36 | 0.72 | 0.36 | range (attacks) |
| 121 | Aatrox | +0.36 | 0.49 | 0.13 |  |
| 122 | Yorick | +0.36 | 0.49 | 0.13 |  |
| 123 | Graves | +0.35 | 0.49 | 0.14 |  |
| 124 | Kassadin | +0.35 | 0.49 | 0.14 |  |
| 125 | Miss Fortune | +0.30 | 0.65 | 0.35 | range (attacks) |
| 126 | Skarner | +0.30 | 0.49 | 0.19 |  |
| 127 | Gragas | +0.29 | 0.49 | 0.20 |  |
| 128 | Lillia | +0.28 | 0.56 | 0.28 |  |
| 129 | Karma | +0.28 | 0.44 | 0.16 |  |
| 130 | Pantheon | +0.27 | 0.57 | 0.30 |  |
| 131 | Cho'Gath | +0.26 | 0.49 | 0.23 |  |
| 132 | Pyke | +0.26 | 0.49 | 0.23 |  |
| 133 | Shen | +0.25 | 0.76 | 0.51 |  |
| 134 | Volibear | +0.25 | 0.56 | 0.31 |  |
| 135 | Jarvan IV | +0.25 | 0.38 | 0.13 |  |
| 136 | Lee Sin | +0.25 | 0.38 | 0.13 |  |
| 137 | Nautilus | +0.25 | 0.37 | 0.12 |  |
| 138 | Leona | +0.24 | 0.49 | 0.25 |  |
| 139 | Vi | +0.23 | 0.56 | 0.33 |  |
| 140 | Trundle | +0.23 | 0.48 | 0.25 |  |
| 141 | Viego | +0.22 | 0.58 | 0.36 |  |
| 142 | Darius | +0.22 | 0.46 | 0.24 |  |
| 143 | Ambessa | +0.22 | 0.35 | 0.13 |  |
| 144 | Sejuani | +0.21 | 0.49 | 0.28 |  |
| 145 | Ornn | +0.20 | 0.56 | 0.36 |  |
| 146 | Sett | +0.20 | 0.56 | 0.36 |  |
| 147 | Galio | +0.20 | 0.49 | 0.29 |  |
| 148 | Ivern | +0.20 | 0.38 | 0.18 |  |
| 149 | Shyvana | +0.18 | 0.51 | 0.33 |  |
| 150 | Bel'Veth | +0.17 | 0.49 | 0.32 |  |
| 151 | Jhin | +0.15 | 0.53 | 0.38 | range (attacks) |
| 152 | Nasus | +0.14 | 0.27 | 0.13 |  |
| 153 | Diana | +0.12 | 0.37 | 0.25 |  |
| 154 | Qiyana | +0.11 | 0.31 | 0.20 |  |
| 155 | Poppy | +0.08 | 0.35 | 0.27 |  |
| 156 | Fizz | +0.06 | 0.37 | 0.31 |  |
| 157 | Hecarim | +0.05 | 0.36 | 0.31 |  |
| 158 | Karthus | +0.04 | 0.39 | 0.35 |  |
| 159 | Ryze | +0.03 | 0.48 | 0.45 |  |
| 160 | Briar | +0.03 | 0.37 | 0.34 |  |
| 161 | Zac | -0.05 | 0.49 | 0.54 |  |
| 162 | Illaoi | -0.06 | 0.07 | 0.13 |  |
| 163 | Tahm Kench | -0.10 | 0.49 | 0.59 |  |
| 164 | Katarina | -0.10 | 0.18 | 0.28 |  |
| 165 | Talon | -0.12 | 0.00 | 0.12 |  |
| 166 | Akali | -0.14 | 0.00 | 0.14 |  |
| 167 | Dr. Mundo | -0.14 | 0.00 | 0.14 |  |
| 168 | Tryndamere | -0.14 | 0.00 | 0.14 |  |
| 169 | Kha'Zix | -0.15 | 0.00 | 0.15 |  |
| 170 | Locke | -0.20 | 0.00 | 0.20 |  |
| 171 | Rumble | -0.20 | 0.00 | 0.20 |  |
| 172 | Naafiri | -0.59 | 0.00 | 0.59 |  |
