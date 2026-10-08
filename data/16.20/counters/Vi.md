# Counters to Vi (patch 26.20)

Every champion ranked by what its kit does against Vi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vi` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.96)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Vi's Cease and Desist. Spell shield for 1.5 s, long enough to use ahead of Cease and Desist. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vi R Cease and Desist)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Vi's Vault Breaker. Spell shield for 1.5 s, long enough to use ahead of Vault Breaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vi Q Vault Breaker)
- **0.36** interrupt: Unspeakable Horror's fear interrupts Vi's Vault Breaker (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Vi Q Vault Breaker)

### 2. Elise (net +1.78)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Vi's Cease and Desist. Untargetable for 0.6 s; Cease and Desist takes 1.25 s to land, enough to react. (Elise E Rappel → Vi R Cease and Desist)
- **0.38** interrupt: Cocoon's stun interrupts Vi's Vault Breaker (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Vi Q Vault Breaker)
- **0.36** untargetable: Rappel makes Elise untargetable, dodging Vi's Vault Breaker. Untargetable for 0.6 s; Vault Breaker lands within 0.17 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Vi Q Vault Breaker)

### 3. Maokai (net +1.66)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Vi's Cease and Desist. Untargetable for 1.4 s; Cease and Desist takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Vi R Cease and Desist)
- **0.50** interrupt: Bramble Smash's airborne interrupts Vi's Vault Breaker (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Vi Q Vault Breaker)
- **0.46** untargetable: Twisted Advance makes Maokai untargetable, dodging Vi's Vault Breaker. Untargetable for 1.4 s; Vault Breaker lands within 0.17 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

### 4. Rek'Sai (net +1.63)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vi's Cease and Desist. Untargetable for 1.5 s, long enough to use ahead of Cease and Desist. (Rek'Sai R Void Rush → Vi R Cease and Desist)
- **0.50** interrupt: Unburrow's airborne interrupts Vi's Vault Breaker (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Vi Q Vault Breaker)
- **0.45** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vi's Vault Breaker. Untargetable for 1.5 s, long enough to use ahead of Vault Breaker. (Rek'Sai R Void Rush → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Rek'Sai's Unburrow (airborne) during it.

### 5. Udyr (net +1.63)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Vi's Vault Breaker (airborne). Immune for 1.5 s, long enough to use ahead of Vault Breaker. (Udyr E Blazing Stampede → Vi Q Vault Breaker)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Vi's Cease and Desist (airborne, stun). Immune for 1.5 s, long enough to use ahead of Cease and Desist. (Udyr E Blazing Stampede → Vi R Cease and Desist)
- **0.50** interrupt: Blazing Stampede's stun interrupts Vi's Vault Breaker (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Vi Q Vault Breaker)

### 6. Sivir (net +1.61)

- **1.00** spell shield: Spell Shield's spell shield blocks Vi's Cease and Desist. Spell shield for 1.5 s, long enough to use ahead of Cease and Desist. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vi R Cease and Desist)
- **0.60** spell shield: Spell Shield's spell shield blocks Vi's Vault Breaker. Spell shield for 1.5 s, long enough to use ahead of Vault Breaker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vi Q Vault Breaker)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Vi's (500 vs 125 attack range). Vi closes the gap with Vault Breaker, Cease and Desist. (Sivir basic attacks → Vi basic attacks)

### 7. Zaahen (net +1.46)

- **1.00** cc immunity: Grim Deliverance makes Zaahen immune to Vi's Cease and Desist (airborne, stun). Immune for ?; Cease and Desist takes 1.25 s to land, enough to react. (Zaahen R Grim Deliverance → Vi R Cease and Desist)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Vi's Vault Breaker (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Vi Q Vault Breaker)
- **0.27** cc immunity: Grim Deliverance makes Zaahen immune to Vi's Vault Breaker (airborne). Immune for ?; Vault Breaker lands within 0.17 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Zaahen's The Darkin Glaive (airborne) during it.

### 8. Bard (net +1.44)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Vi's Cease and Desist. Untargetable for 2.5 s, long enough to use ahead of Cease and Desist. (Bard R Tempered Fate → Vi R Cease and Desist)
- **0.45** untargetable: Tempered Fate makes Bard untargetable, dodging Vi's Vault Breaker. Untargetable for 2.5 s, long enough to use ahead of Vault Breaker. (Bard R Tempered Fate → Vi Q Vault Breaker)
- **0.24** range: Bard's basic attacks reach 375 units farther than Vi's (500 vs 125 attack range). Vi closes the gap with Vault Breaker, Cease and Desist. (Bard basic attacks → Vi basic attacks)
- Watch out: Cease and Desist is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

### 9. Morgana (net +1.44)

- **1.00** cc immunity: Black Shield makes Morgana immune to Vi's Cease and Desist (airborne, stun). Immune for 5 s, long enough to use ahead of Cease and Desist. (Morgana E Black Shield → Vi R Cease and Desist)
- **0.63** cc immunity: Black Shield makes Morgana immune to Vi's Vault Breaker (airborne). Immune for 5 s, long enough to use ahead of Vault Breaker. (Morgana E Black Shield → Vi Q Vault Breaker)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Vi's (450 vs 125 attack range). Vi closes the gap with Vault Breaker, Cease and Desist. (Morgana basic attacks → Vi basic attacks)

### 10. Sion (net +1.43)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Vi's Cease and Desist (airborne, stun). Immune for 8 s, long enough to use ahead of Cease and Desist. (Sion R Unstoppable Onslaught → Vi R Cease and Desist)
- **0.50** interrupt: Decimating Smash's airborne interrupts Vi's Vault Breaker (movement channel). Decimating Smash must land during the channel. (Sion Q Decimating Smash → Vi Q Vault Breaker)
- **0.46** cc immunity: Unstoppable Onslaught makes Sion immune to Vi's Vault Breaker (airborne). Immune for 8 s, long enough to use ahead of Vault Breaker. (Sion R Unstoppable Onslaught → Vi Q Vault Breaker)
- Watch out: Vault Breaker's airborne interrupts Sion's Decimating Smash (charge-up).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.96 | 1.96 | 0.00 |  |
| 2 | Elise | +1.78 | 1.78 | 0.00 |  |
| 3 | Maokai | +1.66 | 1.73 | 0.07 |  |
| 4 | Rek'Sai | +1.63 | 1.79 | 0.16 |  |
| 5 | Udyr | +1.63 | 1.63 | 0.00 |  |
| 6 | Sivir | +1.61 | 1.61 | 0.00 |  |
| 7 | Zaahen | +1.46 | 1.64 | 0.18 |  |
| 8 | Bard | +1.44 | 1.52 | 0.08 |  |
| 9 | Morgana | +1.44 | 1.44 | 0.00 |  |
| 10 | Sion | +1.43 | 1.73 | 0.30 |  |
| 11 | Camille | +1.42 | 1.57 | 0.15 |  |
| 12 | Evelynn | +1.42 | 1.50 | 0.08 |  |
| 13 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 14 | Lissandra | +1.41 | 1.46 | 0.05 |  |
| 15 | Milio | +1.36 | 1.43 | 0.07 |  |
| 16 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 17 | Warwick | +1.34 | 1.80 | 0.46 |  |
| 18 | Vladimir | +1.34 | 1.44 | 0.10 |  |
| 19 | Kled | +1.33 | 1.57 | 0.24 |  |
| 20 | Shaco | +1.26 | 1.46 | 0.20 |  |
| 21 | Alistar | +1.24 | 1.36 | 0.12 |  |
| 22 | Olaf | +1.23 | 1.23 | 0.00 |  |
| 23 | Gwen | +1.18 | 1.18 | 0.00 |  |
| 24 | Aurora | +1.17 | 1.32 | 0.15 |  |
| 25 | Malzahar | +1.16 | 1.61 | 0.45 |  |
| 26 | Ekko | +1.14 | 1.14 | 0.00 |  |
| 27 | Singed | +1.10 | 1.17 | 0.07 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 28 | Cassiopeia | +1.09 | 1.09 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Yuumi | +1.08 | 1.51 | 0.43 |  |
| 30 | Gangplank | +1.07 | 1.07 | 0.00 |  |
| 31 | Zed | +1.07 | 1.07 | 0.00 |  |
| 32 | Kayn | +1.02 | 1.54 | 0.52 |  |
| 33 | Rengar | +0.97 | 1.11 | 0.14 |  |
| 34 | Master Yi | +0.95 | 1.18 | 0.23 |  |
| 35 | Kalista | +0.94 | 1.13 | 0.19 |  |
| 36 | Xin Zhao | +0.90 | 1.08 | 0.18 |  |
| 37 | Taric | +0.89 | 0.89 | 0.00 |  |
| 38 | Vex | +0.87 | 0.90 | 0.03 |  |
| 39 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 40 | K'Sante | +0.83 | 1.00 | 0.17 |  |
| 41 | Kindred | +0.81 | 0.81 | 0.00 |  |
| 42 | Teemo | +0.76 | 0.84 | 0.08 | blind (Blinding Dart) |
| 43 | Viktor | +0.74 | 0.78 | 0.04 |  |
| 44 | Yone | +0.72 | 0.97 | 0.25 |  |
| 45 | Lulu | +0.72 | 0.80 | 0.08 |  |
| 46 | Jax | +0.72 | 0.72 | 0.00 | attack dodge (Counter Strike) |
| 47 | Nilah | +0.69 | 0.77 | 0.08 |  |
| 48 | Garen | +0.69 | 0.69 | 0.00 |  |
| 49 | Hwei | +0.65 | 0.72 | 0.07 |  |
| 50 | Brand | +0.65 | 0.65 | 0.00 |  |
| 51 | Zilean | +0.65 | 0.65 | 0.00 |  |
| 52 | Corki | +0.64 | 0.71 | 0.07 |  |
| 53 | Ahri | +0.64 | 0.68 | 0.04 |  |
| 54 | Volibear | +0.63 | 0.63 | 0.00 |  |
| 55 | Veigar | +0.62 | 0.66 | 0.04 |  |
| 56 | Kennen | +0.57 | 0.57 | 0.00 |  |
| 57 | Sett | +0.56 | 0.63 | 0.07 |  |
| 58 | Ornn | +0.55 | 0.71 | 0.16 |  |
| 59 | Seraphine | +0.55 | 0.55 | 0.00 |  |
| 60 | Pantheon | +0.54 | 0.65 | 0.11 |  |
| 61 | Jinx | +0.53 | 0.57 | 0.04 |  |
| 62 | Annie | +0.53 | 0.53 | 0.00 |  |
| 63 | Draven | +0.52 | 0.59 | 0.07 |  |
| 64 | Amumu | +0.52 | 0.57 | 0.05 |  |
| 65 | Shen | +0.51 | 0.96 | 0.45 | attack block (Spirit's Refuge) |
| 66 | Poppy | +0.51 | 0.91 | 0.40 | dash stop (Steadfast Presence) |
| 67 | Jayce | +0.51 | 0.58 | 0.07 |  |
| 68 | Shyvana | +0.51 | 0.51 | 0.00 |  |
| 69 | Renata Glasc | +0.50 | 0.57 | 0.07 |  |
| 70 | Leona | +0.50 | 0.50 | 0.00 |  |
| 71 | Heimerdinger | +0.49 | 0.49 | 0.00 |  |
| 72 | Sona | +0.49 | 0.49 | 0.00 |  |
| 73 | Soraka | +0.49 | 0.49 | 0.00 |  |
| 74 | Anivia | +0.48 | 0.62 | 0.14 |  |
| 75 | Zoe | +0.48 | 0.55 | 0.07 |  |
| 76 | Ashe | +0.47 | 0.47 | 0.00 |  |
| 77 | Vayne | +0.46 | 0.64 | 0.18 |  |
| 78 | Kassadin | +0.46 | 0.46 | 0.00 |  |
| 79 | Swain | +0.45 | 0.52 | 0.07 |  |
| 80 | Twisted Fate | +0.44 | 0.79 | 0.35 |  |
| 81 | Cho'Gath | +0.43 | 0.50 | 0.07 |  |
| 82 | Renekton | +0.43 | 0.43 | 0.00 |  |
| 83 | Irelia | +0.41 | 0.41 | 0.00 |  |
| 84 | Nami | +0.40 | 0.58 | 0.18 |  |
| 85 | Gnar | +0.40 | 0.48 | 0.08 |  |
| 86 | Syndra | +0.40 | 0.47 | 0.07 |  |
| 87 | Malphite | +0.39 | 0.59 | 0.20 |  |
| 88 | Mordekaiser | +0.38 | 0.52 | 0.14 |  |
| 89 | Thresh | +0.38 | 0.51 | 0.13 |  |
| 90 | Tristana | +0.38 | 0.46 | 0.08 |  |
| 91 | Quinn | +0.37 | 0.69 | 0.32 |  |
| 92 | Ziggs | +0.36 | 0.53 | 0.17 |  |
| 93 | Bel'Veth | +0.36 | 0.43 | 0.07 |  |
| 94 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 95 | Hecarim | +0.35 | 0.35 | 0.00 |  |
| 96 | Urgot | +0.34 | 0.43 | 0.09 |  |
| 97 | Aatrox | +0.33 | 0.50 | 0.17 |  |
| 98 | Blitzcrank | +0.32 | 0.50 | 0.18 |  |
| 99 | Orianna | +0.32 | 0.40 | 0.08 |  |
| 100 | Braum | +0.30 | 0.38 | 0.08 |  |
| 101 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 102 | Sylas | +0.28 | 0.38 | 0.10 |  |
| 103 | Sejuani | +0.26 | 0.50 | 0.24 |  |
| 104 | Aphelios | +0.26 | 0.26 | 0.00 |  |
| 105 | Trundle | +0.25 | 0.32 | 0.07 |  |
| 106 | Illaoi | +0.25 | 0.25 | 0.00 |  |
| 107 | Azir | +0.24 | 0.40 | 0.16 |  |
| 108 | Darius | +0.24 | 0.31 | 0.07 |  |
| 109 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 110 | Rammus | +0.23 | 0.71 | 0.48 |  |
| 111 | Yasuo | +0.22 | 0.50 | 0.28 |  |
| 112 | Zyra | +0.22 | 0.38 | 0.16 |  |
| 113 | Neeko | +0.22 | 0.37 | 0.15 |  |
| 114 | Ambessa | +0.22 | 0.22 | 0.00 |  |
| 115 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 116 | Skarner | +0.22 | 0.22 | 0.00 |  |
| 117 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 118 | Vel'Koz | +0.21 | 0.56 | 0.35 |  |
| 119 | Xerath | +0.21 | 0.54 | 0.33 |  |
| 120 | Yorick | +0.21 | 0.35 | 0.14 |  |
| 121 | Lillia | +0.21 | 0.29 | 0.08 |  |
| 122 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 123 | Lux | +0.19 | 0.19 | 0.00 |  |
| 124 | Aurelion Sol | +0.18 | 0.37 | 0.19 |  |
| 125 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 126 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 127 | Mel | +0.18 | 0.18 | 0.00 |  |
| 128 | Zac | +0.17 | 0.83 | 0.66 | dash stop (Stretching Strikes) |
| 129 | Briar | +0.17 | 0.22 | 0.05 |  |
| 130 | Fiddlesticks | +0.16 | 0.63 | 0.47 |  |
| 131 | Graves | +0.16 | 0.16 | 0.00 |  |
| 132 | Kai'Sa | +0.15 | 0.26 | 0.11 |  |
| 133 | Lee Sin | +0.15 | 0.23 | 0.08 |  |
| 134 | Karma | +0.15 | 0.15 | 0.00 |  |
| 135 | Rell | +0.14 | 0.38 | 0.24 |  |
| 136 | Riven | +0.14 | 0.34 | 0.20 |  |
| 137 | Diana | +0.14 | 0.22 | 0.08 |  |
| 138 | Fizz | +0.14 | 0.22 | 0.08 |  |
| 139 | Senna | +0.11 | 0.22 | 0.11 |  |
| 140 | Samira | +0.11 | 0.20 | 0.09 |  |
| 141 | Rakan | +0.10 | 0.30 | 0.20 |  |
| 142 | Nautilus | +0.10 | 0.22 | 0.12 |  |
| 143 | Jarvan IV | +0.07 | 0.35 | 0.28 |  |
| 144 | Varus | +0.07 | 0.18 | 0.11 |  |
| 145 | LeBlanc | +0.07 | 0.15 | 0.08 |  |
| 146 | Pyke | +0.04 | 0.36 | 0.32 |  |
| 147 | Viego | 0.00 | 0.41 | 0.41 |  |
| 148 | Qiyana | 0.00 | 0.22 | 0.22 |  |
| 149 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 150 | Locke | 0.00 | 0.00 | 0.00 |  |
| 151 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Galio | -0.02 | 0.46 | 0.48 |  |
| 154 | Ivern | -0.02 | 0.13 | 0.15 |  |
| 155 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 156 | Lucian | -0.04 | 0.24 | 0.28 |  |
| 157 | Janna | -0.06 | 0.57 | 0.63 |  |
| 158 | Gragas | -0.06 | 0.35 | 0.41 |  |
| 159 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 160 | Wukong | -0.06 | 0.22 | 0.28 |  |
| 161 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 162 | Akali | -0.11 | 0.00 | 0.11 |  |
| 163 | Talon | -0.14 | 0.00 | 0.14 |  |
| 164 | Karthus | -0.15 | 0.13 | 0.28 |  |
| 165 | Tahm Kench | -0.16 | 0.50 | 0.66 |  |
| 166 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 167 | Akshan | -0.20 | 0.22 | 0.42 |  |
| 168 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 169 | Nunu & Willump | -0.23 | 0.33 | 0.56 |  |
| 170 | Taliyah | -0.25 | 0.51 | 0.76 |  |
| 171 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
