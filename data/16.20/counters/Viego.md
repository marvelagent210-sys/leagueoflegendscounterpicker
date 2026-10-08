# Counters to Viego (patch 26.20)

Every champion ranked by what its kit does against Viego's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Viego's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Viego` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.75)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Viego's Heartbreaker. Untargetable for 0.6 s; Heartbreaker takes 0.5 s to land, enough to react. (Elise E Rappel → Viego R Heartbreaker)
- **0.67** untargetable: Rappel makes Elise untargetable, dodging Viego's Spectral Maw. Untargetable for 0.6 s; Spectral Maw takes 0.5 s to land, enough to react. (Elise E Rappel → Viego W Spectral Maw)
- **0.22** interrupt: Cocoon's stun interrupts Viego's Spectral Maw (charge-up). Cocoon must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Elise E Cocoon → Viego W Spectral Maw)

### 2. Nocturne (net +1.62)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Viego's Heartbreaker. Spell shield for 1.5 s, long enough to use ahead of Heartbreaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viego R Heartbreaker)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Viego's Spectral Maw. Spell shield for 1.5 s, long enough to use ahead of Spectral Maw. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viego W Spectral Maw)
- **0.21** interrupt: Unspeakable Horror's fear interrupts Viego's Spectral Maw (charge-up). Unspeakable Horror must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Nocturne E Unspeakable Horror → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Nocturne's (200 vs 125 attack range).

### 3. Maokai (net +1.53)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Viego's Heartbreaker. Untargetable for 1.4 s; Heartbreaker takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Viego R Heartbreaker)
- **0.88** untargetable: Twisted Advance makes Maokai untargetable, dodging Viego's Spectral Maw. Untargetable for 1.4 s; Spectral Maw takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Viego W Spectral Maw)
- **0.25** interrupt: Bramble Smash's airborne interrupts Viego's Spectral Maw (charge-up). Bramble Smash must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Maokai Q Bramble Smash → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Maokai's (200 vs 125 attack range).

### 4. Fiora (net +1.53)

- **1.10** parry: Riposte parries Viego's Heartbreaker and stuns back. Parry for 0.75 s; Heartbreaker takes 0.5 s to land, enough to react. Negating Heartbreaker's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Viego R Heartbreaker)
- **0.80** parry: Riposte parries Viego's Spectral Maw and stuns back. Parry for 0.75 s; Spectral Maw takes 0.5 s to land, enough to react. Negating Spectral Maw's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Viego W Spectral Maw)
- **0.12** attack speed slow: Riposte cuts Viego's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Viego basic attacks)

### 5. Morgana (net +1.53)

- **1.00** cc immunity: Black Shield makes Morgana immune to Viego's Heartbreaker (airborne, slow). Immune for 5 s, long enough to use ahead of Heartbreaker. (Morgana E Black Shield → Viego R Heartbreaker)
- **0.70** cc immunity: Black Shield makes Morgana immune to Viego's Spectral Maw (stun). Immune for 5 s, long enough to use ahead of Spectral Maw. (Morgana E Black Shield → Viego W Spectral Maw)
- **0.11** reveal: Soul Shackles reveals Viego through Harrowed Path's stealth. (Morgana R Soul Shackles → Viego E Harrowed Path)

### 6. Sivir (net +1.53)

- **1.00** spell shield: Spell Shield's spell shield blocks Viego's Heartbreaker. Spell shield for 1.5 s, long enough to use ahead of Heartbreaker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viego R Heartbreaker)
- **0.67** spell shield: Spell Shield's spell shield blocks Viego's Spectral Maw. Spell shield for 1.5 s, long enough to use ahead of Spectral Maw. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viego W Spectral Maw)
- **0.19** range: Sivir's basic attacks reach 300 units farther than Viego's (500 vs 200 attack range). Viego closes the gap with Sovereign's Domination, Heartbreaker, Spectral Maw. (Sivir basic attacks → Viego basic attacks)

### 7. Master Yi (net +1.47)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Viego's Heartbreaker. Untargetable for ?; Heartbreaker takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Viego R Heartbreaker)
- **0.67** untargetable: Alpha Strike makes Master Yi untargetable, dodging Viego's Spectral Maw. Untargetable for ?; Spectral Maw takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Viego W Spectral Maw)
- **0.19** cleanse: Highlander cleanses Viego's Heartbreaker (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Master Yi R Highlander → Viego R Heartbreaker)
- Watch out: Heartbreaker's airborne interrupts Master Yi's Meditate (normal channel).

### 8. Udyr (net +1.47)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Viego's Heartbreaker (airborne, slow). Immune for 1.5 s, long enough to use ahead of Heartbreaker. (Udyr E Blazing Stampede → Viego R Heartbreaker)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Viego's Spectral Maw (stun). Immune for 1.5 s, long enough to use ahead of Spectral Maw. (Udyr E Blazing Stampede → Viego W Spectral Maw)
- **0.25** interrupt: Blazing Stampede's stun interrupts Viego's Spectral Maw (charge-up). Blazing Stampede must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Udyr E Blazing Stampede → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Udyr's (200 vs 125 attack range).

### 9. Evelynn (net +1.38)

- **1.00** untargetable: Last Caress makes Evelynn untargetable, dodging Viego's Heartbreaker. Untargetable for ?; Heartbreaker takes 0.5 s to land, enough to react. (Evelynn R Last Caress → Viego R Heartbreaker)
- **0.46** untargetable: Last Caress makes Evelynn untargetable, dodging Viego's Spectral Maw. Untargetable for ?; Spectral Maw takes 0.5 s to land, enough to react. (Evelynn R Last Caress → Viego W Spectral Maw)
- **0.21** interrupt: Allure's charm interrupts Viego's Spectral Maw (charge-up). Allure must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Evelynn W Allure → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Evelynn's (200 vs 125 attack range).

### 10. Vladimir (net +1.37)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viego's Heartbreaker. Untargetable for 2 s, long enough to use ahead of Heartbreaker. (Vladimir W Sanguine Pool → Viego R Heartbreaker)
- **0.70** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Viego's Spectral Maw. Untargetable for 2 s, long enough to use ahead of Spectral Maw. (Vladimir W Sanguine Pool → Viego W Spectral Maw)
- **0.07** range: Vladimir's basic attacks reach 250 units farther than Viego's (450 vs 200 attack range). Viego closes the gap with Sovereign's Domination, Heartbreaker, Spectral Maw. (Vladimir basic attacks → Viego basic attacks)
- Watch out: Heartbreaker's airborne interrupts Vladimir's Tides of Blood (charge-up).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.75 | 1.75 | 0.00 |  |
| 2 | Nocturne | +1.62 | 1.71 | 0.09 |  |
| 3 | Maokai | +1.53 | 1.69 | 0.16 |  |
| 4 | Fiora | +1.53 | 1.53 | 0.00 |  |
| 5 | Morgana | +1.53 | 1.53 | 0.00 |  |
| 6 | Sivir | +1.53 | 1.53 | 0.00 |  |
| 7 | Master Yi | +1.47 | 1.58 | 0.11 |  |
| 8 | Udyr | +1.47 | 1.56 | 0.09 |  |
| 9 | Evelynn | +1.38 | 1.44 | 0.06 |  |
| 10 | Vladimir | +1.37 | 1.42 | 0.05 |  |
| 11 | Rek'Sai | +1.36 | 1.52 | 0.16 |  |
| 12 | Warwick | +1.35 | 1.62 | 0.27 |  |
| 13 | Sion | +1.35 | 1.49 | 0.14 |  |
| 14 | Shaco | +1.35 | 1.41 | 0.06 |  |
| 15 | Lissandra | +1.35 | 1.40 | 0.05 |  |
| 16 | Gwen | +1.34 | 1.34 | 0.00 |  |
| 17 | Bard | +1.32 | 1.40 | 0.08 |  |
| 18 | Zaahen | +1.30 | 1.48 | 0.18 |  |
| 19 | Singed | +1.28 | 1.54 | 0.26 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 20 | Aurora | +1.26 | 1.26 | 0.00 |  |
| 21 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 22 | Yuumi | +1.24 | 1.62 | 0.38 |  |
| 23 | Camille | +1.20 | 1.40 | 0.20 |  |
| 24 | Ekko | +1.19 | 1.25 | 0.06 |  |
| 25 | Kled | +1.18 | 1.42 | 0.24 |  |
| 26 | Rengar | +1.07 | 1.26 | 0.19 |  |
| 27 | Braum | +1.05 | 1.22 | 0.17 | projectile block (Unbreakable) |
| 28 | Zed | +1.05 | 1.11 | 0.06 |  |
| 29 | Olaf | +1.04 | 1.23 | 0.19 |  |
| 30 | Kayn | +1.00 | 1.49 | 0.49 |  |
| 31 | Alistar | +1.00 | 1.21 | 0.21 |  |
| 32 | Malzahar | +0.94 | 1.37 | 0.43 |  |
| 33 | Cassiopeia | +0.94 | 0.94 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 34 | Gangplank | +0.91 | 1.10 | 0.19 |  |
| 35 | Milio | +0.84 | 0.91 | 0.07 |  |
| 36 | Nilah | +0.80 | 0.88 | 0.08 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 37 | Kayle | +0.80 | 0.80 | 0.00 |  |
| 38 | Teemo | +0.80 | 0.80 | 0.00 | blind (Blinding Dart) |
| 39 | Kalista | +0.78 | 0.97 | 0.19 |  |
| 40 | Lulu | +0.78 | 0.86 | 0.08 | disarm (Whimsy) |
| 41 | Jax | +0.77 | 0.86 | 0.09 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 42 | Yasuo | +0.76 | 1.04 | 0.28 | projectile block (Wind Wall) |
| 43 | Garen | +0.76 | 0.76 | 0.00 |  |
| 44 | Taric | +0.71 | 0.71 | 0.00 |  |
| 45 | Kindred | +0.70 | 0.70 | 0.00 |  |
| 46 | Mel | +0.70 | 0.70 | 0.00 | projectile block (Rebuttal) |
| 47 | Hwei | +0.69 | 0.76 | 0.07 | dash stop (Grim Visage) |
| 48 | Vex | +0.69 | 0.72 | 0.03 |  |
| 49 | Samira | +0.65 | 0.74 | 0.09 | projectile block (Blade Whirl) |
| 50 | Xin Zhao | +0.62 | 0.80 | 0.18 |  |
| 51 | Pantheon | +0.62 | 0.67 | 0.05 |  |
| 52 | Viktor | +0.59 | 0.63 | 0.04 |  |
| 53 | Ahri | +0.56 | 0.60 | 0.04 | dash stop (Charm) |
| 54 | Jinx | +0.52 | 0.56 | 0.04 | dash stop (Flame Chompers!) |
| 55 | Veigar | +0.52 | 0.56 | 0.04 |  |
| 56 | Shen | +0.51 | 1.02 | 0.51 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 57 | Zac | +0.48 | 0.79 | 0.31 | dash stop (Stretching Strikes) |
| 58 | Varus | +0.44 | 0.50 | 0.06 |  |
| 59 | Poppy | +0.41 | 0.80 | 0.39 | dash stop (Steadfast Presence) |
| 60 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 61 | Rammus | +0.39 | 0.70 | 0.31 | attack reflect (Defensive Ball Curl) |
| 62 | Zilean | +0.39 | 0.39 | 0.00 |  |
| 63 | Brand | +0.35 | 0.35 | 0.00 |  |
| 64 | Kennen | +0.35 | 0.35 | 0.00 |  |
| 65 | Renata Glasc | +0.34 | 0.41 | 0.07 |  |
| 66 | Yone | +0.33 | 0.58 | 0.25 |  |
| 67 | Corki | +0.33 | 0.40 | 0.07 |  |
| 68 | Annie | +0.33 | 0.33 | 0.00 |  |
| 69 | Seraphine | +0.33 | 0.33 | 0.00 |  |
| 70 | Vayne | +0.32 | 0.39 | 0.07 |  |
| 71 | Volibear | +0.32 | 0.32 | 0.00 |  |
| 72 | Nasus | +0.31 | 0.50 | 0.19 | attack speed slow (Wither) |
| 73 | Ashe | +0.30 | 0.30 | 0.00 |  |
| 74 | Soraka | +0.30 | 0.30 | 0.00 |  |
| 75 | Mordekaiser | +0.29 | 0.43 | 0.14 |  |
| 76 | Draven | +0.29 | 0.36 | 0.07 |  |
| 77 | Sona | +0.29 | 0.29 | 0.00 |  |
| 78 | K'Sante | +0.28 | 0.45 | 0.17 |  |
| 79 | Amumu | +0.28 | 0.42 | 0.14 |  |
| 80 | Skarner | +0.28 | 0.28 | 0.00 |  |
| 81 | Thresh | +0.27 | 0.40 | 0.13 |  |
| 82 | Jayce | +0.27 | 0.34 | 0.07 |  |
| 83 | Aphelios | +0.27 | 0.27 | 0.00 |  |
| 84 | Kai'Sa | +0.27 | 0.27 | 0.00 |  |
| 85 | Shyvana | +0.27 | 0.27 | 0.00 |  |
| 86 | Urgot | +0.26 | 0.35 | 0.09 |  |
| 87 | Zoe | +0.26 | 0.33 | 0.07 |  |
| 88 | Kassadin | +0.25 | 0.25 | 0.00 |  |
| 89 | Anivia | +0.23 | 0.37 | 0.14 |  |
| 90 | Sylas | +0.23 | 0.33 | 0.10 |  |
| 91 | Swain | +0.23 | 0.30 | 0.07 |  |
| 92 | Nidalee | +0.23 | 0.23 | 0.00 |  |
| 93 | Quinn | +0.22 | 0.41 | 0.19 |  |
| 94 | Sett | +0.22 | 0.38 | 0.16 |  |
| 95 | Irelia | +0.22 | 0.22 | 0.00 |  |
| 96 | Tristana | +0.21 | 0.29 | 0.08 |  |
| 97 | Syndra | +0.21 | 0.28 | 0.07 |  |
| 98 | Malphite | +0.20 | 0.49 | 0.29 |  |
| 99 | Karma | +0.20 | 0.20 | 0.00 |  |
| 100 | LeBlanc | +0.20 | 0.20 | 0.00 |  |
| 101 | Aatrox | +0.19 | 0.36 | 0.17 |  |
| 102 | Ornn | +0.19 | 0.35 | 0.16 |  |
| 103 | Gnar | +0.19 | 0.27 | 0.08 |  |
| 104 | Twitch | +0.19 | 0.19 | 0.00 |  |
| 105 | Zeri | +0.19 | 0.19 | 0.00 |  |
| 106 | Twisted Fate | +0.18 | 0.53 | 0.35 |  |
| 107 | Bel'Veth | +0.18 | 0.25 | 0.07 |  |
| 108 | Nami | +0.17 | 0.35 | 0.18 |  |
| 109 | Zyra | +0.17 | 0.33 | 0.16 |  |
| 110 | Yunara | +0.17 | 0.17 | 0.00 |  |
| 111 | Leona | +0.16 | 0.25 | 0.09 |  |
| 112 | Renekton | +0.16 | 0.25 | 0.09 |  |
| 113 | Hecarim | +0.16 | 0.16 | 0.00 |  |
| 114 | Senna | +0.16 | 0.16 | 0.00 |  |
| 115 | Ziggs | +0.15 | 0.32 | 0.17 |  |
| 116 | Orianna | +0.15 | 0.23 | 0.08 |  |
| 117 | Ezreal | +0.14 | 0.14 | 0.00 |  |
| 118 | Smolder | +0.14 | 0.14 | 0.00 |  |
| 119 | Neeko | +0.13 | 0.21 | 0.08 |  |
| 120 | Lux | +0.13 | 0.13 | 0.00 |  |
| 121 | Illaoi | +0.12 | 0.21 | 0.09 |  |
| 122 | Darius | +0.11 | 0.18 | 0.07 |  |
| 123 | Trundle | +0.11 | 0.18 | 0.07 |  |
| 124 | Ambessa | +0.11 | 0.17 | 0.06 |  |
| 125 | Kog'Maw | +0.11 | 0.11 | 0.00 |  |
| 126 | Fizz | +0.10 | 0.18 | 0.08 |  |
| 127 | Lee Sin | +0.09 | 0.23 | 0.14 |  |
| 128 | Aurelion Sol | +0.09 | 0.21 | 0.12 |  |
| 129 | Pyke | +0.09 | 0.21 | 0.12 |  |
| 130 | Graves | +0.09 | 0.09 | 0.00 |  |
| 131 | Katarina | +0.08 | 0.37 | 0.29 |  |
| 132 | Briar | +0.08 | 0.18 | 0.10 |  |
| 133 | Azir | +0.06 | 0.22 | 0.16 |  |
| 134 | Yorick | +0.06 | 0.20 | 0.14 |  |
| 135 | Lillia | +0.06 | 0.14 | 0.08 |  |
| 136 | Akali | +0.05 | 0.11 | 0.06 |  |
| 137 | Fiddlesticks | +0.04 | 0.44 | 0.40 |  |
| 138 | Diana | +0.04 | 0.12 | 0.08 |  |
| 139 | Qiyana | +0.03 | 0.11 | 0.08 |  |
| 140 | Vel'Koz | +0.01 | 0.33 | 0.32 |  |
| 141 | Xerath | +0.01 | 0.32 | 0.31 |  |
| 142 | Caitlyn | +0.01 | 0.29 | 0.28 |  |
| 143 | Sejuani | +0.01 | 0.25 | 0.24 |  |
| 144 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 145 | Vi | 0.00 | 0.41 | 0.41 |  |
| 146 | Akshan | 0.00 | 0.25 | 0.25 |  |
| 147 | Nautilus | 0.00 | 0.12 | 0.12 |  |
| 148 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 149 | Cho'Gath | -0.01 | 0.25 | 0.26 |  |
| 150 | Rell | -0.02 | 0.22 | 0.24 |  |
| 151 | Rakan | -0.05 | 0.15 | 0.20 |  |
| 152 | Wukong | -0.05 | 0.11 | 0.16 |  |
| 153 | Talon | -0.06 | 0.00 | 0.06 |  |
| 154 | Galio | -0.07 | 0.25 | 0.32 |  |
| 155 | Riven | -0.07 | 0.19 | 0.26 |  |
| 156 | Tahm Kench | -0.09 | 0.25 | 0.34 |  |
| 157 | Kha'Zix | -0.09 | 0.00 | 0.09 |  |
| 158 | Locke | -0.09 | 0.00 | 0.09 |  |
| 159 | Blitzcrank | -0.12 | 0.25 | 0.37 |  |
| 160 | Jarvan IV | -0.12 | 0.16 | 0.28 |  |
| 161 | Gragas | -0.13 | 0.20 | 0.33 |  |
| 162 | Lucian | -0.14 | 0.14 | 0.28 |  |
| 163 | Miss Fortune | -0.14 | 0.14 | 0.28 |  |
| 164 | Jhin | -0.16 | 0.12 | 0.28 |  |
| 165 | Janna | -0.17 | 0.35 | 0.52 |  |
| 166 | Dr. Mundo | -0.19 | 0.00 | 0.19 |  |
| 167 | Rumble | -0.19 | 0.00 | 0.19 |  |
| 168 | Karthus | -0.21 | 0.07 | 0.28 |  |
| 169 | Nunu & Willump | -0.22 | 0.36 | 0.58 |  |
| 170 | Ryze | -0.25 | 0.10 | 0.35 |  |
| 171 | Taliyah | -0.32 | 0.30 | 0.62 |  |
| 172 | Naafiri | -0.39 | 0.11 | 0.50 |  |
