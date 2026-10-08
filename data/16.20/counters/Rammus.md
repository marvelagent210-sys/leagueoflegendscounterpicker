# Counters to Rammus (patch 26.20)

Every champion ranked by what its kit does against Rammus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rammus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rammus` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.51)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Rammus's Soaring Slam. Untargetable for 0.6 s; Soaring Slam takes 0.89 s to land, enough to react. (Elise E Rappel → Rammus R Soaring Slam)
- **0.56** untargetable: Rappel makes Elise untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 0.6 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Elise E Rappel → Rammus E Frenzying Taunt)
- **0.32** range: Elise's basic attacks reach 425 units farther than Rammus's (550 vs 125 attack range). Rammus closes the gap with Soaring Slam. (Elise basic attacks → Rammus basic attacks)
- Watch out: Defensive Ball Curl deals damage back to Elise for each basic attack.

### 2. Maokai (net +1.41)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.4 s; Soaring Slam takes 0.89 s to land, enough to react. (Maokai W Twisted Advance → Rammus R Soaring Slam)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.4 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Rammus E Frenzying Taunt)
- **0.35** interrupt: Bramble Smash's airborne interrupts Rammus's Powerball (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Maokai for each basic attack.

### 3. Morgana (net +1.26)

- **0.90** cc immunity: Black Shield makes Morgana immune to Rammus's Soaring Slam (airborne, slow). Immune for 5 s, long enough to use ahead of Soaring Slam. (Morgana E Black Shield → Rammus R Soaring Slam)
- **0.60** cc immunity: Black Shield makes Morgana immune to Rammus's Frenzying Taunt (taunt). Immune for 5 s, long enough to use ahead of Frenzying Taunt. (Morgana E Black Shield → Rammus E Frenzying Taunt)
- **0.44** cc immunity: Black Shield makes Morgana immune to Rammus's Powerball (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Powerball. (Morgana E Black Shield → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Morgana for each basic attack.

### 4. Rek'Sai (net +1.21)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.5 s, long enough to use ahead of Soaring Slam. (Rek'Sai R Void Rush → Rammus R Soaring Slam)
- **0.35** interrupt: Unburrow's airborne interrupts Rammus's Powerball (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Rammus Q Powerball)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.5 s, long enough to use ahead of Frenzying Taunt. (Rek'Sai R Void Rush → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Rek'Sai for each basic attack.

### 5. Vladimir (net +1.20)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Soaring Slam. Untargetable for 2 s, long enough to use ahead of Soaring Slam. (Vladimir W Sanguine Pool → Rammus R Soaring Slam)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2 s, long enough to use ahead of Frenzying Taunt. (Vladimir W Sanguine Pool → Rammus E Frenzying Taunt)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Powerball. Untargetable for 2 s, long enough to use ahead of Powerball. (Vladimir W Sanguine Pool → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Vladimir for each basic attack.

### 6. Lissandra (net +1.17)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Lissandra R Frozen Tomb → Rammus R Soaring Slam)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Lissandra R Frozen Tomb → Rammus E Frenzying Taunt)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Powerball. Untargetable for 2.5 s, long enough to use ahead of Powerball. (Lissandra R Frozen Tomb → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Lissandra for each basic attack.

### 7. Bard (net +1.15)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Bard R Tempered Fate → Rammus R Soaring Slam)
- **0.36** range: Bard's basic attacks reach 375 units farther than Rammus's (500 vs 125 attack range). Rammus closes the gap with Soaring Slam. (Bard basic attacks → Rammus basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Bard R Tempered Fate → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Bard for each basic attack.

### 8. Zaahen (net +1.15)

- **0.90** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Soaring Slam (airborne, slow). Immune for ?; Soaring Slam takes 0.89 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus R Soaring Slam)
- **0.35** interrupt: The Darkin Glaive's airborne interrupts Rammus's Powerball (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Rammus Q Powerball)
- **0.34** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Frenzying Taunt (taunt). Immune for ?; Frenzying Taunt takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Zaahen for each basic attack.

### 9. Fiora (net +1.13)

- **1.00** parry: Riposte parries Rammus's Soaring Slam and stuns back. Parry for 0.75 s; Soaring Slam takes 0.89 s to land, enough to react. Negating Soaring Slam's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus R Soaring Slam)
- **0.70** parry: Riposte parries Rammus's Frenzying Taunt and stuns back. Parry for 0.75 s; Frenzying Taunt takes 0.25 s to land, enough to react. Negating Frenzying Taunt's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus E Frenzying Taunt)
- **0.36** parry: Riposte parries Rammus's Powerball and stuns back. Parry for 0.75 s; Powerball lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Powerball's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Fiora for each basic attack.

### 10. Sion (net +1.12)

- **0.90** cc immunity: Unstoppable Onslaught makes Sion immune to Rammus's Soaring Slam (airborne, slow). Immune for 8 s, long enough to use ahead of Soaring Slam. (Sion R Unstoppable Onslaught → Rammus R Soaring Slam)
- **0.36** cc immunity: Unstoppable Onslaught makes Sion immune to Rammus's Frenzying Taunt (taunt). Immune for 8 s, long enough to use ahead of Frenzying Taunt. (Sion R Unstoppable Onslaught → Rammus E Frenzying Taunt)
- **0.35** interrupt: Decimating Smash's airborne interrupts Rammus's Powerball (normal channel). Decimating Smash must land during the channel. (Sion Q Decimating Smash → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Sion for each basic attack.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.51 | 1.83 | 0.32 |  |
| 2 | Maokai | +1.41 | 1.68 | 0.27 |  |
| 3 | Morgana | +1.26 | 1.50 | 0.24 |  |
| 4 | Rek'Sai | +1.21 | 1.51 | 0.30 |  |
| 5 | Vladimir | +1.20 | 1.49 | 0.29 |  |
| 6 | Lissandra | +1.17 | 1.39 | 0.22 |  |
| 7 | Bard | +1.15 | 1.53 | 0.38 |  |
| 8 | Zaahen | +1.15 | 1.47 | 0.32 |  |
| 9 | Fiora | +1.13 | 1.45 | 0.32 |  |
| 10 | Sion | +1.12 | 1.51 | 0.39 |  |
| 11 | Evelynn | +1.10 | 1.37 | 0.27 |  |
| 12 | Xayah | +1.09 | 1.47 | 0.38 |  |
| 13 | Aurora | +1.08 | 1.37 | 0.29 |  |
| 14 | Udyr | +1.06 | 1.47 | 0.41 |  |
| 15 | Kled | +1.05 | 1.46 | 0.41 |  |
| 16 | Nocturne | +1.05 | 1.43 | 0.38 |  |
| 17 | Camille | +1.02 | 1.40 | 0.38 |  |
| 18 | Shaco | +1.02 | 1.34 | 0.32 |  |
| 19 | Master Yi | +0.92 | 1.50 | 0.58 |  |
| 20 | Gwen | +0.88 | 1.24 | 0.36 |  |
| 21 | Alistar | +0.87 | 1.19 | 0.32 |  |
| 22 | Warwick | +0.86 | 1.50 | 0.64 |  |
| 23 | Sivir | +0.86 | 1.36 | 0.50 |  |
| 24 | Yuumi | +0.85 | 1.68 | 0.83 |  |
| 25 | Ekko | +0.82 | 1.14 | 0.32 |  |
| 26 | Kalista | +0.82 | 1.14 | 0.32 |  |
| 27 | Gangplank | +0.78 | 1.07 | 0.29 |  |
| 28 | Olaf | +0.77 | 1.15 | 0.38 |  |
| 29 | Zed | +0.77 | 1.06 | 0.29 |  |
| 30 | Milio | +0.73 | 1.11 | 0.38 |  |
| 31 | Rengar | +0.73 | 1.11 | 0.38 |  |
| 32 | Kayn | +0.71 | 1.40 | 0.69 |  |
| 33 | Malzahar | +0.65 | 1.27 | 0.62 |  |
| 34 | Cassiopeia | +0.59 | 0.81 | 0.22 | grounding (Miasma) |
| 35 | Kayle | +0.53 | 0.89 | 0.36 |  |
| 36 | Singed | +0.47 | 0.74 | 0.27 | grounding (Mega Adhesive) |
| 37 | Lulu | +0.43 | 0.79 | 0.36 |  |
| 38 | Xin Zhao | +0.41 | 0.85 | 0.44 |  |
| 39 | Kindred | +0.40 | 0.90 | 0.50 |  |
| 40 | Heimerdinger | +0.38 | 0.58 | 0.20 |  |
| 41 | Teemo | +0.36 | 0.72 | 0.36 |  |
| 42 | Vex | +0.35 | 0.62 | 0.27 |  |
| 43 | Brand | +0.35 | 0.57 | 0.22 |  |
| 44 | Corki | +0.33 | 0.63 | 0.30 |  |
| 45 | Taric | +0.32 | 0.70 | 0.38 |  |
| 46 | Anivia | +0.32 | 0.56 | 0.24 |  |
| 47 | Zilean | +0.30 | 0.62 | 0.32 |  |
| 48 | Nami | +0.30 | 0.52 | 0.22 |  |
| 49 | Garen | +0.28 | 0.71 | 0.43 |  |
| 50 | Mordekaiser | +0.28 | 0.60 | 0.32 |  |
| 51 | Kennen | +0.27 | 0.56 | 0.29 |  |
| 52 | Hwei | +0.27 | 0.50 | 0.23 |  |
| 53 | Annie | +0.27 | 0.49 | 0.22 |  |
| 54 | Swain | +0.27 | 0.48 | 0.21 |  |
| 55 | Jayce | +0.25 | 0.57 | 0.32 |  |
| 56 | Seraphine | +0.25 | 0.54 | 0.29 |  |
| 57 | Vayne | +0.24 | 0.67 | 0.43 |  |
| 58 | Draven | +0.24 | 0.60 | 0.36 |  |
| 59 | Ziggs | +0.24 | 0.51 | 0.27 |  |
| 60 | Ahri | +0.24 | 0.46 | 0.22 |  |
| 61 | Zoe | +0.23 | 0.55 | 0.32 |  |
| 62 | Veigar | +0.23 | 0.47 | 0.24 |  |
| 63 | Renata Glasc | +0.22 | 0.60 | 0.38 |  |
| 64 | Soraka | +0.22 | 0.49 | 0.27 |  |
| 65 | Thresh | +0.22 | 0.46 | 0.24 |  |
| 66 | Syndra | +0.22 | 0.44 | 0.22 |  |
| 67 | Yone | +0.21 | 0.48 | 0.27 |  |
| 68 | Ornn | +0.18 | 0.45 | 0.27 |  |
| 69 | K'Sante | +0.17 | 0.60 | 0.43 |  |
| 70 | Gnar | +0.17 | 0.51 | 0.34 |  |
| 71 | Ashe | +0.16 | 0.52 | 0.36 |  |
| 72 | Viktor | +0.16 | 0.48 | 0.32 |  |
| 73 | Orianna | +0.16 | 0.43 | 0.27 |  |
| 74 | Pantheon | +0.15 | 0.56 | 0.41 |  |
| 75 | Sona | +0.15 | 0.56 | 0.41 |  |
| 76 | Tristana | +0.15 | 0.51 | 0.36 |  |
| 77 | Azir | +0.15 | 0.42 | 0.27 |  |
| 78 | Zyra | +0.15 | 0.39 | 0.24 |  |
| 79 | Neeko | +0.15 | 0.37 | 0.22 |  |
| 80 | Aphelios | +0.13 | 0.51 | 0.38 |  |
| 81 | Jax | +0.13 | 0.45 | 0.32 |  |
| 82 | Quinn | +0.12 | 0.68 | 0.56 |  |
| 83 | Malphite | +0.11 | 0.40 | 0.29 |  |
| 84 | Urgot | +0.11 | 0.38 | 0.27 |  |
| 85 | Sett | +0.08 | 0.40 | 0.32 |  |
| 86 | Volibear | +0.08 | 0.40 | 0.32 |  |
| 87 | Aurelion Sol | +0.07 | 0.37 | 0.30 |  |
| 88 | Nilah | +0.06 | 0.56 | 0.50 |  |
| 89 | Cho'Gath | +0.06 | 0.35 | 0.29 |  |
| 90 | Leona | +0.06 | 0.35 | 0.29 |  |
| 91 | Yasuo | +0.06 | 0.35 | 0.29 |  |
| 92 | Irelia | +0.05 | 0.32 | 0.27 |  |
| 93 | Shyvana | +0.04 | 0.33 | 0.29 |  |
| 94 | Lillia | +0.04 | 0.26 | 0.22 |  |
| 95 | Sejuani | +0.03 | 0.35 | 0.32 |  |
| 96 | Kassadin | +0.03 | 0.32 | 0.29 |  |
| 97 | Twisted Fate | 0.00 | 0.78 | 0.78 |  |
| 98 | Zeri | 0.00 | 0.44 | 0.44 |  |
| 99 | Twitch | 0.00 | 0.43 | 0.43 |  |
| 100 | Kai'Sa | 0.00 | 0.38 | 0.38 |  |
| 101 | Yunara | 0.00 | 0.36 | 0.36 |  |
| 102 | Ezreal | 0.00 | 0.32 | 0.32 |  |
| 103 | Senna | 0.00 | 0.32 | 0.32 |  |
| 104 | Smolder | 0.00 | 0.32 | 0.32 |  |
| 105 | Nidalee | 0.00 | 0.30 | 0.30 |  |
| 106 | Jinx | 0.00 | 0.29 | 0.29 |  |
| 107 | Lux | 0.00 | 0.29 | 0.29 |  |
| 108 | Mel | 0.00 | 0.27 | 0.27 |  |
| 109 | Karma | 0.00 | 0.22 | 0.22 |  |
| 110 | LeBlanc | 0.00 | 0.22 | 0.22 |  |
| 111 | Vel'Koz | -0.01 | 0.54 | 0.55 |  |
| 112 | Blitzcrank | -0.01 | 0.35 | 0.36 |  |
| 113 | Skarner | -0.01 | 0.31 | 0.32 |  |
| 114 | Rakan | -0.01 | 0.28 | 0.29 |  |
| 115 | Renekton | -0.02 | 0.30 | 0.32 |  |
| 116 | Samira | -0.02 | 0.30 | 0.32 |  |
| 117 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 118 | Sylas | -0.02 | 0.27 | 0.29 |  |
| 119 | Aatrox | -0.03 | 0.35 | 0.38 |  |
| 120 | Nasus | -0.03 | 0.29 | 0.32 |  |
| 121 | Amumu | -0.03 | 0.24 | 0.27 |  |
| 122 | Braum | -0.05 | 0.27 | 0.32 |  |
| 123 | Xerath | -0.07 | 0.52 | 0.59 |  |
| 124 | Bel'Veth | -0.08 | 0.30 | 0.38 |  |
| 125 | Rell | -0.08 | 0.27 | 0.35 |  |
| 126 | Graves | -0.08 | 0.24 | 0.32 |  |
| 127 | Ambessa | -0.10 | 0.15 | 0.25 |  |
| 128 | Fiddlesticks | -0.11 | 0.55 | 0.66 |  |
| 129 | Varus | -0.11 | 0.27 | 0.38 |  |
| 130 | Hecarim | -0.11 | 0.21 | 0.32 |  |
| 131 | Diana | -0.11 | 0.16 | 0.27 |  |
| 132 | Fizz | -0.11 | 0.16 | 0.27 |  |
| 133 | Lee Sin | -0.11 | 0.16 | 0.27 |  |
| 134 | Galio | -0.13 | 0.32 | 0.45 |  |
| 135 | Riven | -0.14 | 0.24 | 0.38 |  |
| 136 | Yorick | -0.14 | 0.24 | 0.38 |  |
| 137 | Darius | -0.14 | 0.22 | 0.36 |  |
| 138 | Jarvan IV | -0.15 | 0.21 | 0.36 |  |
| 139 | Qiyana | -0.15 | 0.15 | 0.30 |  |
| 140 | Nautilus | -0.16 | 0.16 | 0.32 |  |
| 141 | Illaoi | -0.16 | 0.13 | 0.29 |  |
| 142 | Janna | -0.17 | 0.59 | 0.76 |  |
| 143 | Ivern | -0.17 | 0.19 | 0.36 |  |
| 144 | Pyke | -0.18 | 0.25 | 0.43 |  |
| 145 | Trundle | -0.19 | 0.22 | 0.41 |  |
| 146 | Gragas | -0.20 | 0.24 | 0.44 |  |
| 147 | Vi | -0.23 | 0.48 | 0.71 |  |
| 148 | Briar | -0.24 | 0.16 | 0.40 |  |
| 149 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 150 | Taliyah | -0.25 | 0.50 | 0.75 |  |
| 151 | Shen | -0.27 | 0.56 | 0.83 |  |
| 152 | Caitlyn | -0.28 | 0.36 | 0.64 |  |
| 153 | Miss Fortune | -0.28 | 0.32 | 0.60 |  |
| 154 | Jhin | -0.28 | 0.27 | 0.55 |  |
| 155 | Akali | -0.29 | 0.00 | 0.29 |  |
| 156 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 157 | Lucian | -0.30 | 0.36 | 0.66 |  |
| 158 | Akshan | -0.30 | 0.34 | 0.64 |  |
| 159 | Poppy | -0.32 | 0.15 | 0.47 |  |
| 160 | Dr. Mundo | -0.32 | 0.00 | 0.32 |  |
| 161 | Karthus | -0.33 | 0.19 | 0.52 |  |
| 162 | Ryze | -0.35 | 0.24 | 0.59 |  |
| 163 | Wukong | -0.35 | 0.15 | 0.50 |  |
| 164 | Talon | -0.36 | 0.00 | 0.36 |  |
| 165 | Nunu & Willump | -0.37 | 0.39 | 0.76 |  |
| 166 | Locke | -0.38 | 0.00 | 0.38 |  |
| 167 | Viego | -0.39 | 0.31 | 0.70 |  |
| 168 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 169 | Tahm Kench | -0.44 | 0.35 | 0.79 |  |
| 170 | Zac | -0.44 | 0.28 | 0.72 |  |
| 171 | Katarina | -0.60 | 0.00 | 0.60 |  |
| 172 | Naafiri | -0.74 | 0.00 | 0.74 |  |
