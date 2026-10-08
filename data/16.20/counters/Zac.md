# Counters to Zac (patch 26.20)

Every champion ranked by what its kit does against Zac's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zac's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zac` for the full ledger of a matchup, with sources.

## Top 10

### 1. Maokai (net +2.00)

- **0.94** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.4 s; Elastic Slingshot takes 1.33 s to land, enough to react. (Maokai W Twisted Advance → Zac E Elastic Slingshot)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.4 s; Let's Bounce! takes 0.3 s to land, enough to react. (Maokai W Twisted Advance → Zac R Let's Bounce!)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Zac's Stretching Strikes. Untargetable for 1.4 s; Stretching Strikes takes 0.62 s to land, enough to react. (Maokai W Twisted Advance → Zac Q Stretching Strikes)

### 2. Elise (net +1.78)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Zac's Let's Bounce!. Untargetable for 0.6 s; Let's Bounce! takes 0.3 s to land, enough to react. (Elise E Rappel → Zac R Let's Bounce!)
- **0.70** untargetable: Rappel makes Elise untargetable, dodging Zac's Elastic Slingshot. Untargetable for 0.6 s; Elastic Slingshot takes 1.33 s to land, enough to react. (Elise E Rappel → Zac E Elastic Slingshot)
- **0.47** interrupt: Cocoon's stun interrupts Zac's Elastic Slingshot (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Zac E Elastic Slingshot)
- Watch out: Stretching Strikes's knockdown can stop Elise's Venomous Bite mid-dash.

### 3. Nocturne (net +1.73)

- **0.85** spell shield: Shroud of Darkness's spell shield blocks Zac's Elastic Slingshot. Spell shield for 1.5 s, long enough to use ahead of Elastic Slingshot. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Zac E Elastic Slingshot)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Zac's Elastic Slingshot (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Zac E Elastic Slingshot)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Zac's Let's Bounce!. Spell shield for 1.5 s, long enough to use ahead of Let's Bounce!. A spell shield blocks only the first enemy ability that reaches it. Spell shield only blocks a single instance of damage. (Nocturne W Shroud of Darkness → Zac R Let's Bounce!)

### 4. Udyr (net +1.64)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Zac's Elastic Slingshot (airborne, stun). Immune for 1.5 s, long enough to use ahead of Elastic Slingshot. (Udyr E Blazing Stampede → Zac E Elastic Slingshot)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Zac's Let's Bounce! (airborne, slow). Immune for 1.5 s, long enough to use ahead of Let's Bounce!. (Udyr E Blazing Stampede → Zac R Let's Bounce!)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 1.5 s, long enough to use ahead of Stretching Strikes. (Udyr E Blazing Stampede → Zac Q Stretching Strikes)

### 5. Sion (net +1.49)

- **0.80** cc immunity: Unstoppable Onslaught makes Sion immune to Zac's Let's Bounce! (airborne, slow). Immune for 8 s, long enough to use ahead of Let's Bounce!. (Sion R Unstoppable Onslaught → Zac R Let's Bounce!)
- **0.50** interrupt: Decimating Smash's airborne interrupts Zac's Elastic Slingshot (movement channel). Decimating Smash must land during the channel. (Sion Q Decimating Smash → Zac E Elastic Slingshot)
- **0.49** cc immunity: Unstoppable Onslaught makes Sion immune to Zac's Elastic Slingshot (airborne, stun). Immune for 8 s, long enough to use ahead of Elastic Slingshot. (Sion R Unstoppable Onslaught → Zac E Elastic Slingshot)
- Watch out: Elastic Slingshot's airborne interrupts Sion's Decimating Smash (charge-up).

### 6. Morgana (net +1.45)

- **0.80** cc immunity: Black Shield makes Morgana immune to Zac's Let's Bounce! (airborne, slow). Immune for 5 s, long enough to use ahead of Let's Bounce!. (Morgana E Black Shield → Zac R Let's Bounce!)
- **0.74** cc immunity: Black Shield makes Morgana immune to Zac's Elastic Slingshot (airborne, stun). Immune for 5 s, long enough to use ahead of Elastic Slingshot. (Morgana E Black Shield → Zac E Elastic Slingshot)
- **0.49** cc immunity: Black Shield makes Morgana immune to Zac's Stretching Strikes (airborne, knockdown, slow, root, stun). Immune for 5 s, long enough to use ahead of Stretching Strikes. (Morgana E Black Shield → Zac Q Stretching Strikes)

### 7. Yuumi (net +1.44)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Zac's Elastic Slingshot. Untargetable for ?; Elastic Slingshot takes 1.33 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Zac E Elastic Slingshot)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Zac's Let's Bounce!. Untargetable for ?; Let's Bounce! takes 0.3 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Zac R Let's Bounce!)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Zac's Stretching Strikes. Untargetable for ?; Stretching Strikes takes 0.62 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Zac Q Stretching Strikes)
- Watch out: Elastic Slingshot's airborne interrupts Yuumi's Final Chapter (normal channel).

### 8. Warwick (net +1.44)

- **0.80** cc immunity: Infinite Duress makes Warwick immune to Zac's Let's Bounce! (airborne, slow). Immune for ?; Let's Bounce! takes 0.3 s to land, enough to react. (Warwick R Infinite Duress → Zac R Let's Bounce!)
- **0.48** cc immunity: Infinite Duress makes Warwick immune to Zac's Elastic Slingshot (airborne, stun). Immune for ?; Elastic Slingshot takes 1.33 s to land, enough to react. (Warwick R Infinite Duress → Zac E Elastic Slingshot)
- **0.45** interrupt: Primal Howl's fear interrupts Zac's Elastic Slingshot (movement channel). Primal Howl must land during the channel. (Warwick E Primal Howl → Zac E Elastic Slingshot)
- Watch out: Elastic Slingshot's airborne interrupts Warwick's Jaws of the Beast (movement channel).

### 9. Milio (net +1.39)

- **0.47** interrupt: Ultra Mega Fire Kick's airborne interrupts Zac's Elastic Slingshot (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Zac E Elastic Slingshot)
- **0.35** cleanse: Breath of Life cleanses Zac's Elastic Slingshot (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Zac E Elastic Slingshot)
- **0.34** range: Milio's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Milio basic attacks → Zac basic attacks)

### 10. Xayah (net +1.39)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Let's Bounce!. Untargetable for 1.5 s, long enough to use ahead of Let's Bounce!. (Xayah R Featherstorm → Zac R Let's Bounce!)
- **0.45** untargetable: Featherstorm makes Xayah untargetable, dodging Zac's Elastic Slingshot. Untargetable for 1.5 s, long enough to use ahead of Elastic Slingshot. (Xayah R Featherstorm → Zac E Elastic Slingshot)
- **0.34** range: Xayah's basic attacks reach 350 units farther than Zac's (525 vs 175 attack range). Zac closes the gap with Elastic Slingshot. (Xayah basic attacks → Zac basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +2.00 | 2.00 | 0.00 |  |
| 2 | Elise | +1.78 | 2.04 | 0.26 |  |
| 3 | Nocturne | +1.73 | 1.73 | 0.00 |  |
| 4 | Udyr | +1.64 | 1.64 | 0.00 |  |
| 5 | Sion | +1.49 | 1.63 | 0.14 |  |
| 6 | Morgana | +1.45 | 1.45 | 0.00 |  |
| 7 | Yuumi | +1.44 | 1.85 | 0.41 |  |
| 8 | Warwick | +1.44 | 1.76 | 0.32 |  |
| 9 | Milio | +1.39 | 1.39 | 0.00 |  |
| 10 | Xayah | +1.39 | 1.39 | 0.00 |  |
| 11 | Lissandra | +1.37 | 1.37 | 0.00 |  |
| 12 | Sivir | +1.37 | 1.37 | 0.00 |  |
| 13 | Vladimir | +1.36 | 1.44 | 0.08 |  |
| 14 | Malzahar | +1.30 | 1.70 | 0.40 |  |
| 15 | Shaco | +1.30 | 1.50 | 0.20 |  |
| 16 | Master Yi | +1.27 | 1.50 | 0.23 |  |
| 17 | Rek'Sai | +1.23 | 1.63 | 0.40 |  |
| 18 | Zaahen | +1.22 | 1.62 | 0.40 |  |
| 19 | Singed | +1.17 | 1.17 | 0.00 | grounding (Mega Adhesive) |
| 20 | Bard | +1.15 | 1.45 | 0.30 |  |
| 21 | Fiora | +1.14 | 1.48 | 0.34 |  |
| 22 | Evelynn | +1.13 | 1.57 | 0.44 |  |
| 23 | Olaf | +1.12 | 1.12 | 0.00 |  |
| 24 | Gangplank | +1.06 | 1.06 | 0.00 |  |
| 25 | Zed | +1.05 | 1.05 | 0.00 |  |
| 26 | Kled | +0.99 | 1.59 | 0.60 |  |
| 27 | Garen | +0.98 | 0.98 | 0.00 |  |
| 28 | Alistar | +0.96 | 1.36 | 0.40 |  |
| 29 | Vex | +0.96 | 0.96 | 0.00 |  |
| 30 | Cassiopeia | +0.92 | 0.92 | 0.00 | grounding (Miasma) |
| 31 | Kayle | +0.92 | 0.92 | 0.00 |  |
| 32 | Taric | +0.92 | 0.92 | 0.00 |  |
| 33 | Viktor | +0.92 | 0.92 | 0.00 | dash stop (Gravity Field) |
| 34 | Hwei | +0.91 | 0.91 | 0.00 | dash stop (Grim Visage) |
| 35 | Camille | +0.90 | 1.60 | 0.70 |  |
| 36 | Gwen | +0.87 | 1.27 | 0.40 |  |
| 37 | Kalista | +0.87 | 1.09 | 0.22 |  |
| 38 | Kayn | +0.86 | 1.62 | 0.76 |  |
| 39 | Teemo | +0.86 | 0.94 | 0.08 | blind (Blinding Dart) |
| 40 | Aurora | +0.85 | 1.34 | 0.49 |  |
| 41 | Lulu | +0.84 | 0.84 | 0.00 |  |
| 42 | Veigar | +0.81 | 0.81 | 0.00 |  |
| 43 | Rengar | +0.80 | 1.19 | 0.39 |  |
| 44 | Yasuo | +0.80 | 0.98 | 0.18 | projectile block (Wind Wall) |
| 45 | Zilean | +0.80 | 0.80 | 0.00 |  |
| 46 | Braum | +0.77 | 1.17 | 0.40 | projectile block (Unbreakable) |
| 47 | Ekko | +0.77 | 1.14 | 0.37 |  |
| 48 | Heimerdinger | +0.76 | 0.76 | 0.00 |  |
| 49 | Anivia | +0.74 | 0.74 | 0.00 |  |
| 50 | Kennen | +0.74 | 0.74 | 0.00 |  |
| 51 | Renata Glasc | +0.73 | 0.73 | 0.00 |  |
| 52 | Jinx | +0.72 | 0.72 | 0.00 | dash stop (Flame Chompers!) |
| 53 | Brand | +0.71 | 0.71 | 0.00 |  |
| 54 | Nami | +0.71 | 0.71 | 0.00 |  |
| 55 | Seraphine | +0.70 | 0.70 | 0.00 |  |
| 56 | Annie | +0.69 | 0.69 | 0.00 |  |
| 57 | Zoe | +0.69 | 0.69 | 0.00 |  |
| 58 | Mel | +0.66 | 0.66 | 0.00 | projectile block (Rebuttal) |
| 59 | Swain | +0.65 | 0.65 | 0.00 |  |
| 60 | Jax | +0.64 | 0.98 | 0.34 | attack dodge (Counter Strike) |
| 61 | Xin Zhao | +0.63 | 1.03 | 0.40 |  |
| 62 | Sett | +0.63 | 0.63 | 0.00 |  |
| 63 | Sona | +0.62 | 0.62 | 0.00 |  |
| 64 | Soraka | +0.62 | 0.62 | 0.00 |  |
| 65 | Ashe | +0.61 | 0.61 | 0.00 |  |
| 66 | Kindred | +0.60 | 0.90 | 0.30 |  |
| 67 | Vayne | +0.57 | 0.83 | 0.26 |  |
| 68 | Mordekaiser | +0.57 | 0.57 | 0.00 |  |
| 69 | Shyvana | +0.55 | 0.55 | 0.00 |  |
| 70 | Yone | +0.54 | 0.89 | 0.35 |  |
| 71 | Twisted Fate | +0.53 | 0.88 | 0.35 |  |
| 72 | Corki | +0.53 | 0.83 | 0.30 |  |
| 73 | Draven | +0.52 | 0.77 | 0.25 |  |
| 74 | Ahri | +0.51 | 0.86 | 0.35 | dash stop (Charm) |
| 75 | Blitzcrank | +0.50 | 0.50 | 0.00 |  |
| 76 | Cho'Gath | +0.50 | 0.50 | 0.00 |  |
| 77 | Kassadin | +0.50 | 0.50 | 0.00 |  |
| 78 | Malphite | +0.50 | 0.50 | 0.00 |  |
| 79 | Aphelios | +0.48 | 0.48 | 0.00 |  |
| 80 | Jayce | +0.47 | 0.73 | 0.26 |  |
| 81 | Zyra | +0.47 | 0.47 | 0.00 |  |
| 82 | Orianna | +0.46 | 0.46 | 0.00 |  |
| 83 | Rammus | +0.44 | 0.72 | 0.28 |  |
| 84 | Yorick | +0.43 | 0.43 | 0.00 |  |
| 85 | K'Sante | +0.42 | 0.82 | 0.40 |  |
| 86 | Vel'Koz | +0.42 | 0.70 | 0.28 |  |
| 87 | Nilah | +0.40 | 0.80 | 0.40 | attack dodge (Jubilant Veil) |
| 88 | Volibear | +0.38 | 0.63 | 0.25 |  |
| 89 | Skarner | +0.38 | 0.38 | 0.00 |  |
| 90 | Trundle | +0.38 | 0.38 | 0.00 |  |
| 91 | Darius | +0.37 | 0.37 | 0.00 |  |
| 92 | Xerath | +0.36 | 0.68 | 0.32 |  |
| 93 | Syndra | +0.34 | 0.59 | 0.25 |  |
| 94 | Janna | +0.33 | 0.73 | 0.40 |  |
| 95 | Neeko | +0.33 | 0.44 | 0.11 |  |
| 96 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 97 | Tristana | +0.29 | 0.59 | 0.30 |  |
| 98 | Twitch | +0.29 | 0.40 | 0.11 |  |
| 99 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 100 | Shen | +0.28 | 1.23 | 0.95 | attack block (Spirit's Refuge) |
| 101 | Samira | +0.28 | 0.69 | 0.41 | projectile block (Blade Whirl) |
| 102 | Varus | +0.28 | 0.39 | 0.11 |  |
| 103 | Lux | +0.27 | 0.27 | 0.00 |  |
| 104 | Poppy | +0.26 | 0.86 | 0.60 | dash stop (Steadfast Presence) |
| 105 | Ziggs | +0.25 | 0.68 | 0.43 |  |
| 106 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 107 | Bel'Veth | +0.23 | 0.50 | 0.27 |  |
| 108 | Fiddlesticks | +0.22 | 0.67 | 0.45 |  |
| 109 | Quinn | +0.21 | 0.84 | 0.63 |  |
| 110 | Senna | +0.21 | 0.32 | 0.11 |  |
| 111 | Aatrox | +0.19 | 0.50 | 0.31 |  |
| 112 | Karma | +0.19 | 0.19 | 0.00 |  |
| 113 | Amumu | +0.16 | 0.66 | 0.50 |  |
| 114 | Gnar | +0.13 | 0.58 | 0.45 |  |
| 115 | Irelia | +0.13 | 0.47 | 0.34 |  |
| 116 | Pantheon | +0.12 | 0.63 | 0.51 |  |
| 117 | Thresh | +0.12 | 0.63 | 0.51 |  |
| 118 | Smolder | +0.12 | 0.30 | 0.18 |  |
| 119 | Zeri | +0.11 | 0.41 | 0.30 |  |
| 120 | Hecarim | +0.11 | 0.31 | 0.20 |  |
| 121 | Renekton | +0.10 | 0.50 | 0.40 |  |
| 122 | Galio | +0.09 | 0.50 | 0.41 |  |
| 123 | Azir | +0.09 | 0.46 | 0.37 |  |
| 124 | Urgot | +0.08 | 0.51 | 0.43 |  |
| 125 | Leona | +0.07 | 0.50 | 0.43 |  |
| 126 | Yunara | +0.06 | 0.36 | 0.30 |  |
| 127 | Nunu & Willump | +0.05 | 0.54 | 0.49 |  |
| 128 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 129 | Sejuani | 0.00 | 0.50 | 0.50 |  |
| 130 | Tahm Kench | 0.00 | 0.50 | 0.50 |  |
| 131 | Lillia | 0.00 | 0.30 | 0.30 |  |
| 132 | Nidalee | 0.00 | 0.26 | 0.26 |  |
| 133 | Illaoi | 0.00 | 0.16 | 0.16 |  |
| 134 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 135 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 136 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 137 | Ornn | -0.04 | 0.66 | 0.70 |  |
| 138 | Kai'Sa | -0.07 | 0.34 | 0.41 |  |
| 139 | Aurelion Sol | -0.09 | 0.44 | 0.53 |  |
| 140 | Ambessa | -0.09 | 0.23 | 0.32 |  |
| 141 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 142 | Jarvan IV | -0.13 | 0.31 | 0.44 |  |
| 143 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 144 | Rell | -0.16 | 0.47 | 0.63 |  |
| 145 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 146 | Vi | -0.17 | 0.66 | 0.83 |  |
| 147 | Diana | -0.17 | 0.23 | 0.40 |  |
| 148 | Nautilus | -0.17 | 0.23 | 0.40 |  |
| 149 | Caitlyn | -0.22 | 0.36 | 0.58 |  |
| 150 | LeBlanc | -0.22 | 0.19 | 0.41 |  |
| 151 | Gragas | -0.24 | 0.43 | 0.67 |  |
| 152 | Riven | -0.26 | 0.41 | 0.67 |  |
| 153 | Lucian | -0.27 | 0.31 | 0.58 |  |
| 154 | Graves | -0.30 | 0.20 | 0.50 |  |
| 155 | Sylas | -0.31 | 0.47 | 0.78 |  |
| 156 | Taliyah | -0.34 | 0.62 | 0.96 |  |
| 157 | Lee Sin | -0.34 | 0.25 | 0.59 |  |
| 158 | Fizz | -0.34 | 0.23 | 0.57 |  |
| 159 | Akshan | -0.36 | 0.29 | 0.65 |  |
| 160 | Briar | -0.37 | 0.23 | 0.60 |  |
| 161 | Rakan | -0.38 | 0.32 | 0.70 |  |
| 162 | Qiyana | -0.38 | 0.22 | 0.60 |  |
| 163 | Tryndamere | -0.40 | 0.00 | 0.40 |  |
| 164 | Wukong | -0.41 | 0.23 | 0.64 |  |
| 165 | Ivern | -0.42 | 0.16 | 0.58 |  |
| 166 | Viego | -0.48 | 0.31 | 0.79 |  |
| 167 | Talon | -0.50 | 0.00 | 0.50 |  |
| 168 | Kha'Zix | -0.51 | 0.00 | 0.51 |  |
| 169 | Locke | -0.65 | 0.00 | 0.65 |  |
| 170 | Pyke | -0.66 | 0.45 | 1.11 |  |
| 171 | Akali | -0.68 | 0.00 | 0.68 |  |
| 172 | Naafiri | -1.09 | 0.00 | 1.09 |  |
