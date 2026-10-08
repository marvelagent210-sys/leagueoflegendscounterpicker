# Counters to Blitzcrank (patch 26.20)

Every champion ranked by what its kit does against Blitzcrank's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Blitzcrank's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Blitzcrank` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +1.97)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Sivir basic attacks → Blitzcrank basic attacks)
- **0.65** spell shield: Spell Shield's spell shield blocks Blitzcrank's Rocket Grab. Spell shield for 1.5 s, long enough to use ahead of Rocket Grab. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Blitzcrank Q Rocket Grab)
- **0.55** spell shield: Spell Shield's spell shield blocks Blitzcrank's Static Field. Spell shield for 1.5 s, long enough to use ahead of Static Field. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Blitzcrank R Static Field)

### 2. Elise (net +1.64)

- **0.65** range: Elise's basic attacks reach 425 units farther than Blitzcrank's (550 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Elise basic attacks → Blitzcrank basic attacks)
- **0.65** untargetable: Rappel makes Elise untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 0.6 s; Rocket Grab takes 0.87 s to land, enough to react. (Elise E Rappel → Blitzcrank Q Rocket Grab)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Blitzcrank's Static Field. Untargetable for 0.6 s; Static Field takes 0.25 s to land, enough to react. (Elise E Rappel → Blitzcrank R Static Field)

### 3. Morgana (net +1.38)

- **0.70** cc immunity: Black Shield makes Morgana immune to Blitzcrank's Rocket Grab (airborne, stun). Immune for 5 s, long enough to use ahead of Rocket Grab. (Morgana E Black Shield → Blitzcrank Q Rocket Grab)
- **0.41** cc immunity: Black Shield makes Morgana immune to Blitzcrank's Power Fist (airborne). Immune for 5 s, long enough to use ahead of Power Fist. (Morgana E Black Shield → Blitzcrank E Power Fist)
- **0.39** range: Morgana's basic attacks reach 325 units farther than Blitzcrank's (450 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Morgana basic attacks → Blitzcrank basic attacks)

### 4. Teemo (net +1.38)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Teemo basic attacks → Blitzcrank basic attacks)
- **0.47** blind: Blinding Dart's blind makes Blitzcrank's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Blitzcrank basic attacks)
- **0.46** blind: Blinding Dart's blind makes Blitzcrank's Power Fist, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Blitzcrank E Power Fist)

### 5. Xayah (net +1.34)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Blitzcrank's (525 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Xayah basic attacks → Blitzcrank basic attacks)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 1.5 s, long enough to use ahead of Rocket Grab. (Xayah R Featherstorm → Blitzcrank Q Rocket Grab)
- **0.30** untargetable: Featherstorm makes Xayah untargetable, dodging Blitzcrank's Power Fist. Untargetable for 1.5 s, long enough to use ahead of Power Fist. (Xayah R Featherstorm → Blitzcrank E Power Fist)

### 6. Vladimir (net +1.33)

- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 2 s, long enough to use ahead of Rocket Grab. (Vladimir W Sanguine Pool → Blitzcrank Q Rocket Grab)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Blitzcrank's Static Field. Untargetable for 2 s, long enough to use ahead of Static Field. (Vladimir W Sanguine Pool → Blitzcrank R Static Field)
- **0.41** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Blitzcrank's Power Fist. Untargetable for 2 s, long enough to use ahead of Power Fist. (Vladimir W Sanguine Pool → Blitzcrank E Power Fist)
- Watch out: Power Fist's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 7. Bard (net +1.31)

- **0.72** range: Bard's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Bard basic attacks → Blitzcrank basic attacks)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for 2.5 s, long enough to use ahead of Rocket Grab. (Bard R Tempered Fate → Blitzcrank Q Rocket Grab)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Blitzcrank's Power Fist. Untargetable for 2.5 s, long enough to use ahead of Power Fist. (Bard R Tempered Fate → Blitzcrank E Power Fist)

### 8. Yuumi (net +1.29)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Blitzcrank's Rocket Grab. Untargetable for ?; Rocket Grab takes 0.87 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Blitzcrank Q Rocket Grab)
- **0.64** range: Yuumi's basic attacks reach 300 units farther than Blitzcrank's (425 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Yuumi basic attacks → Blitzcrank basic attacks)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Blitzcrank's Static Field. Untargetable for ?; Static Field takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Blitzcrank R Static Field)
- Watch out: Power Fist's airborne interrupts Yuumi's Final Chapter (normal channel).

### 9. Nocturne (net +1.26)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Rocket Grab. Spell shield for 1.5 s, long enough to use ahead of Rocket Grab. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank Q Rocket Grab)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Static Field. Spell shield for 1.5 s, long enough to use ahead of Static Field. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank R Static Field)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Blitzcrank's Power Fist. Spell shield for 1.5 s, long enough to use ahead of Power Fist. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Blitzcrank E Power Fist)

### 10. Kindred (net +1.20)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Blitzcrank's (500 vs 125 attack range). Blitzcrank has no dash or blink to close the gap. (Kindred basic attacks → Blitzcrank basic attacks)
- **0.17** invulnerable: Lamb's Respite makes Kindred invulnerable to Blitzcrank's Rocket Grab (its crowd control still applies). Invulnerable for ?; Rocket Grab takes 0.87 s to land, enough to react. (Kindred R Lamb's Respite → Blitzcrank Q Rocket Grab)
- **0.14** invulnerable: Lamb's Respite makes Kindred invulnerable to Blitzcrank's Static Field (its crowd control still applies). Invulnerable for ?; Static Field takes 0.25 s to land, enough to react. (Kindred R Lamb's Respite → Blitzcrank R Static Field)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.97 | 1.97 | 0.00 | range (attacks) |
| 2 | Elise | +1.64 | 1.64 | 0.00 | range (attacks) |
| 3 | Morgana | +1.38 | 1.38 | 0.00 |  |
| 4 | Teemo | +1.38 | 1.38 | 0.00 | range (attacks), blind (Blinding Dart), blind (Blinding Dart) |
| 5 | Xayah | +1.34 | 1.34 | 0.00 | range (attacks) |
| 6 | Vladimir | +1.33 | 1.44 | 0.11 |  |
| 7 | Bard | +1.31 | 1.31 | 0.00 | range (attacks) |
| 8 | Yuumi | +1.29 | 1.72 | 0.43 | range (attacks) |
| 9 | Nocturne | +1.26 | 1.26 | 0.00 |  |
| 10 | Kindred | +1.20 | 1.20 | 0.00 | range (attacks) |
| 11 | Samira | +1.20 | 1.20 | 0.00 | range (attacks), projectile block (Blade Whirl) |
| 12 | Milio | +1.18 | 1.18 | 0.00 | range (attacks) |
| 13 | Fiora | +1.17 | 1.17 | 0.00 |  |
| 14 | Aurora | +1.14 | 1.14 | 0.00 | range (attacks) |
| 15 | Udyr | +1.10 | 1.10 | 0.00 |  |
| 16 | Kalista | +1.07 | 1.07 | 0.00 | range (attacks) |
| 17 | Mel | +1.07 | 1.07 | 0.00 | projectile block (Rebuttal), range (attacks) |
| 18 | Lulu | +1.06 | 1.06 | 0.00 | range (attacks) |
| 19 | Maokai | +1.05 | 1.05 | 0.00 |  |
| 20 | Lissandra | +1.03 | 1.03 | 0.00 |  |
| 21 | Kayle | +1.01 | 1.01 | 0.00 | range (attacks) |
| 22 | Gwen | +0.99 | 0.99 | 0.00 |  |
| 23 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 24 | Nilah | +0.86 | 0.86 | 0.00 |  |
| 25 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 26 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 27 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 28 | Rengar | +0.82 | 0.82 | 0.00 |  |
| 29 | Gangplank | +0.80 | 0.80 | 0.00 |  |
| 30 | Corki | +0.78 | 0.78 | 0.00 | range (attacks) |
| 31 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 32 | Jax | +0.77 | 0.77 | 0.00 | attack dodge (Counter Strike) |
| 33 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 34 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 35 | Master Yi | +0.76 | 0.99 | 0.23 |  |
| 36 | Kled | +0.73 | 0.73 | 0.00 |  |
| 37 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 38 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 39 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 40 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 41 | Vex | +0.71 | 0.71 | 0.00 | range (attacks) |
| 42 | Braum | +0.70 | 0.70 | 0.00 | projectile block (Unbreakable) |
| 43 | Yasuo | +0.68 | 0.68 | 0.00 | projectile block (Wind Wall) |
| 44 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 45 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 46 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 47 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 48 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 49 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 50 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 51 | Ekko | +0.63 | 0.63 | 0.00 |  |
| 52 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 53 | Rek'Sai | +0.61 | 0.61 | 0.00 |  |
| 54 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 55 | Malzahar | +0.58 | 0.98 | 0.40 |  |
| 56 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 57 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 58 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 59 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 60 | Camille | +0.56 | 0.56 | 0.00 |  |
| 61 | Evelynn | +0.56 | 0.56 | 0.00 |  |
| 62 | Olaf | +0.56 | 0.56 | 0.00 |  |
| 63 | Shaco | +0.56 | 0.56 | 0.00 |  |
| 64 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 65 | Zed | +0.54 | 0.54 | 0.00 |  |
| 66 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 67 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 68 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 69 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 70 | Quinn | +0.52 | 0.77 | 0.25 | range (attacks) |
| 71 | Twisted Fate | +0.51 | 0.86 | 0.35 | range (attacks) |
| 72 | Graves | +0.49 | 0.49 | 0.00 |  |
| 73 | Zaahen | +0.49 | 0.49 | 0.00 |  |
| 74 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 75 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 76 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 77 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 78 | Alistar | +0.45 | 0.45 | 0.00 |  |
| 79 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 80 | Lucian | +0.44 | 0.72 | 0.28 | range (attacks) |
| 81 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 82 | Annie | +0.44 | 0.44 | 0.00 |  |
| 83 | Brand | +0.44 | 0.44 | 0.00 |  |
| 84 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 85 | Karma | +0.44 | 0.44 | 0.00 |  |
| 86 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 87 | Nami | +0.44 | 0.44 | 0.00 |  |
| 88 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 89 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 90 | Sion | +0.42 | 0.60 | 0.18 |  |
| 91 | Varus | +0.42 | 0.53 | 0.11 | range (attacks) |
| 92 | Malphite | +0.42 | 0.42 | 0.00 |  |
| 93 | Swain | +0.42 | 0.42 | 0.00 |  |
| 94 | Pantheon | +0.41 | 0.52 | 0.11 |  |
| 95 | Akshan | +0.40 | 0.68 | 0.28 | range (attacks) |
| 96 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 97 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 98 | Miss Fortune | +0.37 | 0.65 | 0.28 | range (attacks) |
| 99 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 100 | K'Sante | +0.35 | 0.35 | 0.00 |  |
| 101 | Aurelion Sol | +0.34 | 0.44 | 0.10 |  |
| 102 | Janna | +0.32 | 0.72 | 0.40 | range (attacks) |
| 103 | Warwick | +0.30 | 0.70 | 0.40 |  |
| 104 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 105 | Shen | +0.29 | 0.74 | 0.45 | attack block (Spirit's Refuge) |
| 106 | Taric | +0.28 | 0.28 | 0.00 |  |
| 107 | Xin Zhao | +0.28 | 0.28 | 0.00 |  |
| 108 | Jhin | +0.25 | 0.53 | 0.28 | range (attacks) |
| 109 | Vel'Koz | +0.25 | 0.53 | 0.28 | range (attacks) |
| 110 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 111 | Ivern | +0.23 | 0.38 | 0.15 |  |
| 112 | Garen | +0.22 | 0.22 | 0.00 |  |
| 113 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 114 | Xerath | +0.19 | 0.53 | 0.34 | range (attacks) |
| 115 | Hecarim | +0.19 | 0.19 | 0.00 |  |
| 116 | Illaoi | +0.18 | 0.18 | 0.00 |  |
| 117 | Jarvan IV | +0.18 | 0.18 | 0.00 |  |
| 118 | Ornn | +0.18 | 0.18 | 0.00 |  |
| 119 | Sett | +0.18 | 0.18 | 0.00 |  |
| 120 | Shyvana | +0.18 | 0.18 | 0.00 |  |
| 121 | Volibear | +0.18 | 0.18 | 0.00 |  |
| 122 | Yone | +0.18 | 0.18 | 0.00 |  |
| 123 | Ryze | +0.13 | 0.48 | 0.35 |  |
| 124 | Viego | +0.12 | 0.37 | 0.25 |  |
| 125 | Kayn | +0.11 | 0.56 | 0.45 |  |
| 126 | Karthus | +0.11 | 0.39 | 0.28 |  |
| 127 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 128 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 129 | Taliyah | +0.05 | 0.53 | 0.48 | range (attacks) |
| 130 | Rammus | +0.01 | 0.36 | 0.35 |  |
| 131 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 132 | Akali | 0.00 | 0.00 | 0.00 |  |
| 133 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 134 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 135 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 136 | Briar | 0.00 | 0.00 | 0.00 |  |
| 137 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 138 | Darius | 0.00 | 0.00 | 0.00 |  |
| 139 | Diana | 0.00 | 0.00 | 0.00 |  |
| 140 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 141 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 142 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 143 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 144 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 145 | Leona | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 148 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 149 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 150 | Rell | 0.00 | 0.00 | 0.00 |  |
| 151 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 152 | Riven | 0.00 | 0.00 | 0.00 |  |
| 153 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 154 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 155 | Singed | 0.00 | 0.00 | 0.00 |  |
| 156 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 157 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 158 | Talon | 0.00 | 0.00 | 0.00 |  |
| 159 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 160 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 161 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 162 | Fiddlesticks | -0.08 | 0.39 | 0.47 |  |
| 163 | Galio | -0.18 | 0.00 | 0.18 |  |
| 164 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 165 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 166 | Gragas | -0.23 | 0.00 | 0.23 |  |
| 167 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 168 | Vi | -0.32 | 0.18 | 0.50 |  |
| 169 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 170 | Nunu & Willump | -0.49 | 0.00 | 0.49 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Zac | -0.50 | 0.00 | 0.50 |  |
