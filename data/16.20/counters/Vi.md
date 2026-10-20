# Counters to Vi (patch 26.20)

Every champion ranked by what its kit does against Vi's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vi's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Vi` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +2.01)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Vi's Cease and Desist. Spell shield for 1.5 s, long enough to use ahead of Cease and Desist. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vi R Cease and Desist)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Vi's Vault Breaker. Spell shield for 1.5 s, long enough to use ahead of Vault Breaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vi Q Vault Breaker)
- **0.36** interrupt: Unspeakable Horror's fear interrupts Vi's Vault Breaker (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Vi Q Vault Breaker)

### 2. Zaahen (net +1.81)

- **1.00** cc immunity: Grim Deliverance makes Zaahen immune to Vi's Cease and Desist (airborne, stun). Immune for ?; Cease and Desist takes 1.25 s to land, enough to react. (Zaahen R Grim Deliverance → Vi R Cease and Desist)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Vi's Vault Breaker (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Vi Q Vault Breaker)
- **0.35** interrupt: Dreaded Return's airborne interrupts Vi's Vault Breaker (movement channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Zaahen's The Darkin Glaive (airborne) during it.

### 3. Maokai (net +1.72)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Vi's Cease and Desist. Untargetable for 1.4 s; Cease and Desist takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Vi R Cease and Desist)
- **0.50** interrupt: Bramble Smash's airborne interrupts Vi's Vault Breaker (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Vi Q Vault Breaker)
- **0.46** untargetable: Twisted Advance makes Maokai untargetable, dodging Vi's Vault Breaker. Untargetable for 1.4 s; Vault Breaker lands within 0.17 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

### 4. Rek'Sai (net +1.65)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vi's Cease and Desist. Untargetable for 1.5 s, long enough to use ahead of Cease and Desist. (Rek'Sai R Void Rush → Vi R Cease and Desist)
- **0.50** interrupt: Unburrow's airborne interrupts Vi's Vault Breaker (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Vi Q Vault Breaker)
- **0.45** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vi's Vault Breaker. Untargetable for 1.5 s, long enough to use ahead of Vault Breaker. (Rek'Sai R Void Rush → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Rek'Sai's Unburrow (airborne) during it.

### 5. Sivir (net +1.65)

- **1.00** spell shield: Spell Shield's spell shield blocks Vi's Cease and Desist. Spell shield for 1.5 s, long enough to use ahead of Cease and Desist. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vi R Cease and Desist)
- **0.60** spell shield: Spell Shield's spell shield blocks Vi's Vault Breaker. Spell shield for 1.5 s, long enough to use ahead of Vault Breaker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Vi Q Vault Breaker)
- **0.31** range: Sivir's basic attacks reach 375 units farther than Vi's (500 vs 125 attack range). Vi closes the gap with Cease and Desist, Vault Breaker. (Sivir basic attacks → Vi basic attacks)

### 6. Udyr (net +1.63)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Vi's Cease and Desist (airborne, stun). Immune for 1.5 s, long enough to use ahead of Cease and Desist. (Udyr E Blazing Stampede → Vi R Cease and Desist)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Vi's Vault Breaker (airborne). Immune for 1.5 s, long enough to use ahead of Vault Breaker. (Udyr E Blazing Stampede → Vi Q Vault Breaker)
- **0.50** interrupt: Blazing Stampede's stun interrupts Vi's Vault Breaker (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Vi Q Vault Breaker)

### 7. Alistar (net +1.62)

- **0.80** cleanse: Unbreakable Will cleanses Vi's Cease and Desist (airborne, stun) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Vi R Cease and Desist)
- **0.38** interrupt: Pulverize's airborne interrupts Vi's Vault Breaker (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Vi Q Vault Breaker)
- **0.38** interrupt: Trample's stun interrupts Vi's Vault Breaker (movement channel). Trample must land during the channel. (Alistar E Trample → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Alistar's Headbutt (airborne) during it.

### 8. Rell (net +1.52)

- **0.40** interrupt: Shattering Strike's stun interrupts Vi's Vault Breaker (movement channel). Shattering Strike must land during the channel. (Rell Q Shattering Strike → Vi Q Vault Breaker)
- **0.38** interrupt: Ferromancy: Crash Down's airborne interrupts Vi's Vault Breaker (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Vi Q Vault Breaker)
- **0.38** interrupt: Ferromancy: Mount Up's airborne interrupts Vi's Vault Breaker (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Vi Q Vault Breaker)
- Watch out: Cease and Desist is displacement immune, ignoring Rell's Magnet Storm (airborne, kinematics) during it.

### 9. Sion (net +1.47)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Vi's Cease and Desist (airborne, stun). Immune for 8 s, long enough to use ahead of Cease and Desist. (Sion R Unstoppable Onslaught → Vi R Cease and Desist)
- **0.50** interrupt: Decimating Smash's airborne interrupts Vi's Vault Breaker (movement channel). Decimating Smash must land during the channel. (Sion Q Decimating Smash → Vi Q Vault Breaker)
- **0.46** cc immunity: Unstoppable Onslaught makes Sion immune to Vi's Vault Breaker (airborne). Immune for 8 s, long enough to use ahead of Vault Breaker. (Sion R Unstoppable Onslaught → Vi Q Vault Breaker)
- Watch out: Vault Breaker's airborne interrupts Sion's Decimating Smash (charge-up).

### 10. Bard (net +1.47)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Vi's Cease and Desist. Untargetable for 2.5 s, long enough to use ahead of Cease and Desist. (Bard R Tempered Fate → Vi R Cease and Desist)
- **0.45** untargetable: Tempered Fate makes Bard untargetable, dodging Vi's Vault Breaker. Untargetable for 2.5 s, long enough to use ahead of Vault Breaker. (Bard R Tempered Fate → Vi Q Vault Breaker)
- **0.24** range: Bard's basic attacks reach 375 units farther than Vi's (500 vs 125 attack range). Vi closes the gap with Cease and Desist, Vault Breaker. (Bard basic attacks → Vi basic attacks)
- Watch out: Cease and Desist is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +2.01 | 2.01 | 0.00 |  |
| 2 | Zaahen | +1.81 | 1.99 | 0.18 |  |
| 3 | Maokai | +1.72 | 1.79 | 0.07 |  |
| 4 | Rek'Sai | +1.65 | 1.81 | 0.16 |  |
| 5 | Sivir | +1.65 | 1.65 | 0.00 |  |
| 6 | Udyr | +1.63 | 1.63 | 0.00 |  |
| 7 | Alistar | +1.62 | 1.74 | 0.12 |  |
| 8 | Rell | +1.52 | 1.76 | 0.24 |  |
| 9 | Sion | +1.47 | 1.79 | 0.32 |  |
| 10 | Bard | +1.47 | 1.55 | 0.08 |  |
| 11 | Xayah | +1.47 | 1.47 | 0.00 |  |
| 12 | Fizz | +1.46 | 1.54 | 0.08 |  |
| 13 | Camille | +1.45 | 1.60 | 0.15 |  |
| 14 | Evelynn | +1.45 | 1.53 | 0.08 |  |
| 15 | Morgana | +1.44 | 1.44 | 0.00 |  |
| 16 | Lissandra | +1.42 | 1.47 | 0.05 |  |
| 17 | Kled | +1.39 | 1.63 | 0.24 |  |
| 18 | Vladimir | +1.37 | 1.52 | 0.15 |  |
| 19 | Milio | +1.36 | 1.43 | 0.07 |  |
| 20 | Fiora | +1.30 | 1.30 | 0.00 |  |
| 21 | Shaco | +1.29 | 1.49 | 0.20 |  |
| 22 | Olaf | +1.23 | 1.23 | 0.00 |  |
| 23 | Gwen | +1.22 | 1.22 | 0.00 |  |
| 24 | K'Sante | +1.18 | 1.35 | 0.17 |  |
| 25 | Aurora | +1.18 | 1.33 | 0.15 |  |
| 26 | Singed | +1.10 | 1.17 | 0.07 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 27 | Zed | +1.10 | 1.10 | 0.00 |  |
| 28 | Cassiopeia | +1.09 | 1.09 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Gangplank | +1.07 | 1.07 | 0.00 |  |
| 30 | Xin Zhao | +0.98 | 1.16 | 0.18 |  |
| 31 | Rengar | +0.97 | 1.11 | 0.14 |  |
| 32 | Kalista | +0.94 | 1.13 | 0.19 |  |
| 33 | Malzahar | +0.92 | 1.72 | 0.80 |  |
| 34 | Blitzcrank | +0.92 | 1.10 | 0.18 |  |
| 35 | Viktor | +0.91 | 0.95 | 0.04 |  |
| 36 | Kayle | +0.90 | 0.90 | 0.00 |  |
| 37 | Master Yi | +0.88 | 1.22 | 0.34 |  |
| 38 | Lulu | +0.87 | 0.95 | 0.08 |  |
| 39 | Vex | +0.87 | 0.90 | 0.03 |  |
| 40 | Gnar | +0.86 | 0.94 | 0.08 |  |
| 41 | Heimerdinger | +0.85 | 0.85 | 0.00 |  |
| 42 | Yone | +0.83 | 1.08 | 0.25 |  |
| 43 | Sejuani | +0.83 | 1.07 | 0.24 |  |
| 44 | Cho'Gath | +0.83 | 0.90 | 0.07 |  |
| 45 | Anivia | +0.79 | 0.93 | 0.14 |  |
| 46 | Thresh | +0.78 | 0.91 | 0.13 |  |
| 47 | Yuumi | +0.77 | 1.58 | 0.81 |  |
| 48 | Ornn | +0.77 | 0.93 | 0.16 |  |
| 49 | Seraphine | +0.77 | 0.77 | 0.00 |  |
| 50 | Teemo | +0.76 | 0.84 | 0.08 | blind (Blinding Dart) |
| 51 | Leona | +0.73 | 0.73 | 0.00 |  |
| 52 | Renata Glasc | +0.72 | 0.79 | 0.07 |  |
| 53 | Jax | +0.72 | 0.72 | 0.00 | attack dodge (Counter Strike) |
| 54 | Nilah | +0.69 | 0.77 | 0.08 |  |
| 55 | Garen | +0.69 | 0.69 | 0.00 |  |
| 56 | Kayn | +0.66 | 1.57 | 0.91 |  |
| 57 | Sett | +0.66 | 0.73 | 0.07 |  |
| 58 | Rammus | +0.65 | 1.21 | 0.56 |  |
| 59 | Hwei | +0.65 | 0.72 | 0.07 |  |
| 60 | Brand | +0.65 | 0.65 | 0.00 |  |
| 61 | Zilean | +0.65 | 0.65 | 0.00 |  |
| 62 | Ahri | +0.64 | 0.68 | 0.04 |  |
| 63 | Amumu | +0.63 | 0.68 | 0.05 |  |
| 64 | Volibear | +0.63 | 0.63 | 0.00 |  |
| 65 | Nami | +0.62 | 0.80 | 0.18 |  |
| 66 | Veigar | +0.62 | 0.66 | 0.04 |  |
| 67 | Warwick | +0.60 | 1.83 | 1.23 |  |
| 68 | Riven | +0.60 | 0.80 | 0.20 |  |
| 69 | Elise | +0.60 | 0.60 | 0.00 |  |
| 70 | Urgot | +0.57 | 0.66 | 0.09 |  |
| 71 | Kennen | +0.57 | 0.57 | 0.00 |  |
| 72 | Aurelion Sol | +0.53 | 0.75 | 0.22 |  |
| 73 | Jinx | +0.53 | 0.57 | 0.04 |  |
| 74 | Annie | +0.53 | 0.53 | 0.00 |  |
| 75 | Braum | +0.52 | 0.60 | 0.08 |  |
| 76 | Draven | +0.52 | 0.59 | 0.07 |  |
| 77 | Jayce | +0.51 | 0.58 | 0.07 |  |
| 78 | Shyvana | +0.51 | 0.51 | 0.00 |  |
| 79 | Sona | +0.49 | 0.49 | 0.00 |  |
| 80 | Soraka | +0.49 | 0.49 | 0.00 |  |
| 81 | Yasuo | +0.48 | 0.76 | 0.28 |  |
| 82 | Rakan | +0.48 | 0.68 | 0.20 |  |
| 83 | Zoe | +0.48 | 0.55 | 0.07 |  |
| 84 | Ashe | +0.47 | 0.47 | 0.00 |  |
| 85 | Vayne | +0.46 | 0.64 | 0.18 |  |
| 86 | Kassadin | +0.46 | 0.46 | 0.00 |  |
| 87 | Zac | +0.45 | 1.26 | 0.81 | dash stop (Stretching Strikes) |
| 88 | Swain | +0.45 | 0.52 | 0.07 |  |
| 89 | Pyke | +0.44 | 0.79 | 0.35 |  |
| 90 | Renekton | +0.43 | 0.43 | 0.00 |  |
| 91 | Poppy | +0.41 | 0.91 | 0.50 | dash stop (Steadfast Presence) |
| 92 | Irelia | +0.41 | 0.41 | 0.00 |  |
| 93 | Viego | +0.40 | 0.84 | 0.44 |  |
| 94 | Syndra | +0.40 | 0.47 | 0.07 |  |
| 95 | Malphite | +0.39 | 0.59 | 0.20 |  |
| 96 | Mordekaiser | +0.38 | 0.52 | 0.14 |  |
| 97 | Tristana | +0.38 | 0.46 | 0.08 |  |
| 98 | Ziggs | +0.36 | 0.53 | 0.17 |  |
| 99 | Bel'Veth | +0.36 | 0.43 | 0.07 |  |
| 100 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 101 | Taric | +0.35 | 0.35 | 0.00 |  |
| 102 | Aatrox | +0.33 | 0.50 | 0.17 |  |
| 103 | Orianna | +0.32 | 0.40 | 0.08 |  |
| 104 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 105 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 106 | Sylas | +0.28 | 0.38 | 0.10 |  |
| 107 | Quinn | +0.27 | 0.69 | 0.42 |  |
| 108 | Hecarim | +0.27 | 0.35 | 0.08 |  |
| 109 | Tahm Kench | +0.26 | 1.10 | 0.84 |  |
| 110 | Aphelios | +0.26 | 0.26 | 0.00 |  |
| 111 | Trundle | +0.25 | 0.32 | 0.07 |  |
| 112 | Illaoi | +0.25 | 0.25 | 0.00 |  |
| 113 | Azir | +0.24 | 0.40 | 0.16 |  |
| 114 | Darius | +0.24 | 0.31 | 0.07 |  |
| 115 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 116 | Zyra | +0.22 | 0.38 | 0.16 |  |
| 117 | Neeko | +0.22 | 0.37 | 0.15 |  |
| 118 | Ambessa | +0.22 | 0.22 | 0.00 |  |
| 119 | Corki | +0.22 | 0.22 | 0.00 |  |
| 120 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 121 | Skarner | +0.22 | 0.22 | 0.00 |  |
| 122 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 123 | Yorick | +0.21 | 0.35 | 0.14 |  |
| 124 | Lillia | +0.21 | 0.29 | 0.08 |  |
| 125 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 126 | Lux | +0.19 | 0.19 | 0.00 |  |
| 127 | Twitch | +0.18 | 0.29 | 0.11 |  |
| 128 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 129 | Mel | +0.18 | 0.18 | 0.00 |  |
| 130 | Briar | +0.17 | 0.22 | 0.05 |  |
| 131 | Graves | +0.16 | 0.16 | 0.00 |  |
| 132 | Kai'Sa | +0.15 | 0.26 | 0.11 |  |
| 133 | Lee Sin | +0.15 | 0.23 | 0.08 |  |
| 134 | Karma | +0.15 | 0.15 | 0.00 |  |
| 135 | Gragas | +0.14 | 0.58 | 0.44 |  |
| 136 | Diana | +0.14 | 0.22 | 0.08 |  |
| 137 | Fiddlesticks | +0.12 | 0.97 | 0.85 |  |
| 138 | Senna | +0.11 | 0.22 | 0.11 |  |
| 139 | Samira | +0.11 | 0.20 | 0.09 |  |
| 140 | Nautilus | +0.10 | 0.22 | 0.12 |  |
| 141 | Twisted Fate | +0.09 | 0.79 | 0.70 |  |
| 142 | Jarvan IV | +0.07 | 0.35 | 0.28 |  |
| 143 | LeBlanc | +0.07 | 0.15 | 0.08 |  |
| 144 | Taliyah | +0.06 | 1.16 | 1.10 |  |
| 145 | Shen | +0.06 | 0.96 | 0.90 | attack block (Spirit's Refuge) |
| 146 | Varus | +0.02 | 0.18 | 0.16 |  |
| 147 | Qiyana | 0.00 | 0.22 | 0.22 |  |
| 148 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 149 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 150 | Locke | 0.00 | 0.00 | 0.00 |  |
| 151 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Vel'Koz | -0.02 | 0.56 | 0.58 |  |
| 154 | Wukong | -0.06 | 0.22 | 0.28 |  |
| 155 | Ivern | -0.09 | 0.13 | 0.22 |  |
| 156 | Xerath | -0.10 | 0.54 | 0.64 |  |
| 157 | Akali | -0.11 | 0.00 | 0.11 |  |
| 158 | Janna | -0.13 | 0.79 | 0.92 |  |
| 159 | Talon | -0.14 | 0.00 | 0.14 |  |
| 160 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 161 | Galio | -0.25 | 1.00 | 1.25 |  |
| 162 | Pantheon | -0.25 | 0.73 | 0.98 |  |
| 163 | Caitlyn | -0.32 | 0.24 | 0.56 |  |
| 164 | Lucian | -0.32 | 0.24 | 0.56 |  |
| 165 | Miss Fortune | -0.34 | 0.22 | 0.56 |  |
| 166 | Akshan | -0.37 | 0.22 | 0.59 |  |
| 167 | Jhin | -0.38 | 0.18 | 0.56 |  |
| 168 | Karthus | -0.43 | 0.13 | 0.56 |  |
| 169 | Katarina | -0.47 | 0.00 | 0.47 |  |
| 170 | Nunu & Willump | -0.54 | 0.33 | 0.87 |  |
| 171 | Ryze | -0.54 | 0.16 | 0.70 |  |
| 172 | Naafiri | -0.87 | 0.00 | 0.87 |  |
