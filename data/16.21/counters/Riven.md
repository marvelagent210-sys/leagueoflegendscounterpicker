# Counters to Riven (patch 26.21)

Every champion ranked by what its kit does against Riven's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Riven's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Riven` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.59)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven Q Broken Wings)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven W Ki Burst)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven R Wind Slash)

### 2. Sivir (net +1.46)

- **0.83** spell shield: Spell Shield's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven Q Broken Wings)
- **0.44** spell shield: Spell Shield's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven W Ki Burst)
- **0.40** spell shield: Spell Shield's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven R Wind Slash)

### 3. Udyr (net +1.35)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Riven's Broken Wings (airborne). Immune for 1.5 s, long enough to use ahead of Broken Wings. (Udyr E Blazing Stampede → Riven Q Broken Wings)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Riven's Ki Burst (stun). Immune for 1.5 s, long enough to use ahead of Ki Burst. (Udyr E Blazing Stampede → Riven W Ki Burst)

### 4. Morgana (net +1.25)

- **0.89** cc immunity: Black Shield makes Morgana immune to Riven's Broken Wings (airborne). Immune for 5 s, long enough to use ahead of Broken Wings. (Morgana E Black Shield → Riven Q Broken Wings)
- **0.46** cc immunity: Black Shield makes Morgana immune to Riven's Ki Burst (stun). Immune for 5 s, long enough to use ahead of Ki Burst. (Morgana E Black Shield → Riven W Ki Burst)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Riven's (450 vs 125 attack range). Riven closes the gap with Broken Wings, Valor. (Morgana basic attacks → Riven basic attacks)

### 5. Vladimir (net +1.19)

- **0.89** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Broken Wings. Untargetable for 2 s, long enough to use ahead of Broken Wings. (Vladimir W Sanguine Pool → Riven Q Broken Wings)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Ki Burst. Untargetable for 2 s, long enough to use ahead of Ki Burst. (Vladimir W Sanguine Pool → Riven W Ki Burst)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Wind Slash. Untargetable for 2 s, long enough to use ahead of Wind Slash. (Vladimir W Sanguine Pool → Riven R Wind Slash)
- Watch out: Ki Burst's stun interrupts Vladimir's Tides of Blood (charge-up).

### 6. Fizz (net +1.09)

- **0.65** untargetable: Playful makes Fizz untargetable, dodging Riven's Ki Burst. Untargetable for 0.75 s; Ki Burst takes 0.25 s to land, enough to react. (Fizz E Playful → Riven W Ki Burst)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Riven's Broken Wings. Untargetable for 0.75 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Riven Q Broken Wings)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Riven's Wind Slash. Untargetable for 0.75 s; Wind Slash takes 0.94 s to land, enough to react. (Fizz E Playful → Riven R Wind Slash)

### 7. Fiora (net +1.03)

- **0.63** parry: Riposte parries Riven's Broken Wings and stuns back. Parry for 0.75 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Broken Wings's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven Q Broken Wings)
- **0.56** parry: Riposte parries Riven's Ki Burst and stuns back. Parry for 0.75 s; Ki Burst takes 0.25 s to land, enough to react. Negating Ki Burst's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven W Ki Burst)
- **0.43** parry: Riposte parries Riven's Wind Slash. Parry for 0.75 s; Wind Slash takes 0.94 s to land, enough to react. (Fiora W Riposte → Riven R Wind Slash)

### 8. Rengar (net +1.03)

- **0.80** cleanse: Battle Roar cleanses Riven's Broken Wings (airborne) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven Q Broken Wings)
- **0.46** cleanse: Battle Roar cleanses Riven's Ki Burst (stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven W Ki Burst)

### 9. Maokai (net +1.02)

- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Broken Wings. Untargetable for 1.4 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Riven Q Broken Wings)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Ki Burst. Untargetable for 1.4 s; Ki Burst takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Riven W Ki Burst)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Wind Slash. Untargetable for 1.4 s; Wind Slash takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Riven R Wind Slash)

### 10. Bard (net +0.97)

- **0.50** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Broken Wings. Untargetable for 2.5 s, long enough to use ahead of Broken Wings. (Bard R Tempered Fate → Riven Q Broken Wings)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Ki Burst. Untargetable for 2.5 s, long enough to use ahead of Ki Burst. (Bard R Tempered Fate → Riven W Ki Burst)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Wind Slash. Untargetable for 2.5 s, long enough to use ahead of Wind Slash. (Bard R Tempered Fate → Riven R Wind Slash)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.59 | 1.59 | 0.00 |  |
| 2 | Sivir | +1.46 | 1.46 | 0.00 |  |
| 3 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 4 | Morgana | +1.25 | 1.25 | 0.00 |  |
| 5 | Vladimir | +1.19 | 1.35 | 0.16 |  |
| 6 | Fizz | +1.09 | 1.09 | 0.00 |  |
| 7 | Fiora | +1.03 | 1.03 | 0.00 |  |
| 8 | Rengar | +1.03 | 1.03 | 0.00 |  |
| 9 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Gangplank | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.96 | 0.96 | 0.00 |  |
| 13 | Vex | +0.94 | 0.94 | 0.00 | dash stop (Doom 'n Gloom) |
| 14 | Lissandra | +0.92 | 0.92 | 0.00 |  |
| 15 | Singed | +0.87 | 0.87 | 0.00 | grounding (Mega Adhesive) |
| 16 | Viktor | +0.86 | 0.86 | 0.00 | dash stop (Gravity Field) |
| 17 | Jinx | +0.84 | 0.84 | 0.00 | dash stop (Flame Chompers!) |
| 18 | Cassiopeia | +0.82 | 0.82 | 0.00 | grounding (Miasma) |
| 19 | Gwen | +0.82 | 0.82 | 0.00 |  |
| 20 | Hwei | +0.80 | 0.80 | 0.00 | dash stop (Grim Visage) |
| 21 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 22 | Veigar | +0.77 | 0.77 | 0.00 | dash stop (Event Horizon) |
| 23 | Rek'Sai | +0.75 | 0.75 | 0.00 |  |
| 24 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 25 | Teemo | +0.72 | 0.72 | 0.00 | blind (Blinding Dart) |
| 26 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 27 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 28 | Olaf | +0.66 | 0.66 | 0.00 |  |
| 29 | Lulu | +0.60 | 0.60 | 0.00 |  |
| 30 | Milio | +0.60 | 0.60 | 0.00 |  |
| 31 | Samira | +0.57 | 0.57 | 0.00 |  |
| 32 | Braum | +0.55 | 0.55 | 0.00 | projectile block (Unbreakable) |
| 33 | Camille | +0.55 | 0.55 | 0.00 |  |
| 34 | Kled | +0.54 | 0.54 | 0.00 |  |
| 35 | Yone | +0.54 | 0.54 | 0.00 |  |
| 36 | Yuumi | +0.53 | 1.35 | 0.82 |  |
| 37 | Alistar | +0.53 | 0.53 | 0.00 |  |
| 38 | Evelynn | +0.53 | 0.53 | 0.00 |  |
| 39 | Mel | +0.53 | 0.53 | 0.00 |  |
| 40 | Shaco | +0.53 | 0.53 | 0.00 |  |
| 41 | Zed | +0.52 | 0.52 | 0.00 |  |
| 42 | Zaahen | +0.47 | 0.47 | 0.00 |  |
| 43 | Malphite | +0.45 | 0.45 | 0.00 |  |
| 44 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 45 | Sion | +0.42 | 0.70 | 0.28 |  |
| 46 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 47 | Xin Zhao | +0.41 | 0.41 | 0.00 |  |
| 48 | Yasuo | +0.41 | 0.41 | 0.00 | projectile block (Wind Wall) |
| 49 | Master Yi | +0.40 | 0.82 | 0.42 |  |
| 50 | K'Sante | +0.40 | 0.40 | 0.00 |  |
| 51 | Poppy | +0.39 | 0.79 | 0.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 52 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 53 | Malzahar | +0.36 | 1.16 | 0.80 |  |
| 54 | Amumu | +0.33 | 0.33 | 0.00 |  |
| 55 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 56 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 57 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 58 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 59 | Sona | +0.27 | 0.27 | 0.00 |  |
| 60 | Aphelios | +0.26 | 0.26 | 0.00 |  |
| 61 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 62 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 63 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 64 | Draven | +0.24 | 0.24 | 0.00 |  |
| 65 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 66 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 67 | Corki | +0.22 | 0.22 | 0.00 |  |
| 68 | Elise | +0.22 | 0.22 | 0.00 |  |
| 69 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 70 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 71 | Senna | +0.22 | 0.22 | 0.00 |  |
| 72 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 73 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 74 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 75 | Hecarim | +0.21 | 0.21 | 0.00 |  |
| 76 | Illaoi | +0.20 | 0.20 | 0.00 |  |
| 77 | Jarvan IV | +0.20 | 0.20 | 0.00 |  |
| 78 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 79 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 80 | Ornn | +0.20 | 0.20 | 0.00 |  |
| 81 | Sett | +0.20 | 0.20 | 0.00 |  |
| 82 | Shyvana | +0.20 | 0.20 | 0.00 |  |
| 83 | Volibear | +0.20 | 0.20 | 0.00 |  |
| 84 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 85 | Lux | +0.19 | 0.19 | 0.00 |  |
| 86 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 87 | Azir | +0.18 | 0.18 | 0.00 |  |
| 88 | Garen | +0.18 | 0.18 | 0.00 |  |
| 89 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 90 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 91 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 92 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 93 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 94 | Graves | +0.16 | 0.16 | 0.00 |  |
| 95 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 96 | Annie | +0.15 | 0.15 | 0.00 |  |
| 97 | Brand | +0.15 | 0.15 | 0.00 |  |
| 98 | Karma | +0.15 | 0.15 | 0.00 |  |
| 99 | LeBlanc | +0.15 | 0.15 | 0.00 |  |
| 100 | Nami | +0.15 | 0.15 | 0.00 |  |
| 101 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 102 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 103 | Swain | +0.14 | 0.14 | 0.00 |  |
| 104 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 105 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 106 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 107 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 108 | Varus | +0.08 | 0.30 | 0.22 |  |
| 109 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 110 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 111 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 112 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 113 | Akali | 0.00 | 0.00 | 0.00 |  |
| 114 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 115 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 116 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 117 | Briar | 0.00 | 0.00 | 0.00 |  |
| 118 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 119 | Darius | 0.00 | 0.00 | 0.00 |  |
| 120 | Diana | 0.00 | 0.00 | 0.00 |  |
| 121 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 122 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 123 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 124 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 125 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 126 | Leona | 0.00 | 0.00 | 0.00 |  |
| 127 | Locke | 0.00 | 0.00 | 0.00 |  |
| 128 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 129 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 130 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 131 | Rell | 0.00 | 0.00 | 0.00 |  |
| 132 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 133 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 134 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 135 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 136 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 137 | Talon | 0.00 | 0.00 | 0.00 |  |
| 138 | Taric | 0.00 | 0.00 | 0.00 |  |
| 139 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 140 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 141 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 142 | Aurelion Sol | -0.01 | 0.15 | 0.16 |  |
| 143 | Quinn | -0.13 | 0.26 | 0.39 |  |
| 144 | Ivern | -0.15 | 0.13 | 0.28 |  |
| 145 | Rammus | -0.18 | 0.38 | 0.56 |  |
| 146 | Viego | -0.18 | 0.26 | 0.44 |  |
| 147 | Zac | -0.24 | 0.67 | 0.91 | dash stop (Stretching Strikes) |
| 148 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 149 | Pantheon | -0.32 | 0.68 | 1.00 |  |
| 150 | Caitlyn | -0.32 | 0.24 | 0.56 |  |
| 151 | Lucian | -0.32 | 0.24 | 0.56 |  |
| 152 | Gragas | -0.33 | 0.00 | 0.33 |  |
| 153 | Akshan | -0.34 | 0.22 | 0.56 |  |
| 154 | Miss Fortune | -0.34 | 0.22 | 0.56 |  |
| 155 | Kayn | -0.37 | 0.53 | 0.90 |  |
| 156 | Jhin | -0.38 | 0.18 | 0.56 |  |
| 157 | Vel'Koz | -0.38 | 0.18 | 0.56 |  |
| 158 | Twisted Fate | -0.41 | 0.29 | 0.70 |  |
| 159 | Karthus | -0.43 | 0.13 | 0.56 |  |
| 160 | Katarina | -0.44 | 0.12 | 0.56 |  |
| 161 | Xerath | -0.46 | 0.18 | 0.64 |  |
| 162 | Shen | -0.51 | 0.39 | 0.90 |  |
| 163 | Ryze | -0.54 | 0.16 | 0.70 |  |
| 164 | Warwick | -0.56 | 0.76 | 1.32 |  |
| 165 | Janna | -0.56 | 0.24 | 0.80 |  |
| 166 | Vi | -0.60 | 0.20 | 0.80 |  |
| 167 | Fiddlesticks | -0.77 | 0.13 | 0.90 |  |
| 168 | Taliyah | -0.78 | 0.18 | 0.96 |  |
| 169 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 170 | Nunu & Willump | -0.98 | 0.00 | 0.98 |  |
| 171 | Tahm Kench | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.18 | 0.00 | 1.18 |  |
