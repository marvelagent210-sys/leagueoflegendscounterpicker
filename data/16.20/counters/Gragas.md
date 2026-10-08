# Counters to Gragas (patch 26.20)

Every champion ranked by what its kit does against Gragas's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gragas's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gragas` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.76)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Gragas's Body Slam. Spell shield for 1.5 s, long enough to use ahead of Body Slam. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gragas E Body Slam)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Gragas's Explosive Cask. Spell shield for 1.5 s, long enough to use ahead of Explosive Cask. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Gragas R Explosive Cask)
- **0.16** cc immunity: Paranoia is displacement immune, ignoring Gragas's Explosive Cask (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Gragas R Explosive Cask)

### 2. Elise (net +1.68)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Gragas's Body Slam. Untargetable for 0.6 s; Body Slam takes 0.66 s to land, enough to react. (Elise E Rappel → Gragas E Body Slam)
- **0.80** untargetable: Rappel makes Elise untargetable, dodging Gragas's Explosive Cask. Untargetable for 0.6 s; Explosive Cask takes 0.25 s to land, enough to react. (Elise E Rappel → Gragas R Explosive Cask)
- **0.32** range: Elise's basic attacks reach 425 units farther than Gragas's (550 vs 125 attack range). Gragas closes the gap with Body Slam. (Elise basic attacks → Gragas basic attacks)

### 3. Sivir (net +1.67)

- **0.80** spell shield: Spell Shield's spell shield blocks Gragas's Body Slam. Spell shield for 1.5 s, long enough to use ahead of Body Slam. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gragas E Body Slam)
- **0.80** spell shield: Spell Shield's spell shield blocks Gragas's Explosive Cask. Spell shield for 1.5 s, long enough to use ahead of Explosive Cask. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Gragas R Explosive Cask)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Gragas's (500 vs 125 attack range). Gragas closes the gap with Body Slam. (Sivir basic attacks → Gragas basic attacks)

### 4. Maokai (net +1.63)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Gragas's Body Slam. Untargetable for 1.4 s; Body Slam takes 0.66 s to land, enough to react. (Maokai W Twisted Advance → Gragas E Body Slam)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Gragas's Explosive Cask. Untargetable for 1.4 s; Explosive Cask takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Gragas R Explosive Cask)
- **0.23** interrupt: Bramble Smash's airborne interrupts Gragas's Drunken Rage (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Gragas W Drunken Rage)

### 5. Morgana (net +1.46)

- **0.85** cc immunity: Black Shield makes Morgana immune to Gragas's Body Slam (airborne, stun). Immune for 5 s, long enough to use ahead of Body Slam. (Morgana E Black Shield → Gragas E Body Slam)
- **0.80** cc immunity: Black Shield makes Morgana immune to Gragas's Explosive Cask (airborne). Immune for 5 s, long enough to use ahead of Explosive Cask. (Morgana E Black Shield → Gragas R Explosive Cask)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Gragas's (450 vs 125 attack range). Gragas closes the gap with Body Slam. (Morgana basic attacks → Gragas basic attacks)

### 6. Udyr (net +1.46)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Gragas's Body Slam (airborne, stun). Immune for 1.5 s, long enough to use ahead of Body Slam. (Udyr E Blazing Stampede → Gragas E Body Slam)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Gragas's Explosive Cask (airborne). Immune for 1.5 s, long enough to use ahead of Explosive Cask. (Udyr E Blazing Stampede → Gragas R Explosive Cask)
- **0.20** interrupt: Blazing Stampede's stun interrupts Gragas's Drunken Rage (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Gragas W Drunken Rage)

### 7. Fiora (net +1.42)

- **0.95** parry: Riposte parries Gragas's Body Slam and stuns back. Parry for 0.75 s; Body Slam takes 0.66 s to land, enough to react. Negating Body Slam's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gragas E Body Slam)
- **0.90** parry: Riposte parries Gragas's Explosive Cask and stuns back. Parry for 0.75 s; Explosive Cask takes 0.25 s to land, enough to react. Negating Explosive Cask's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Gragas R Explosive Cask)
- **0.07** attack speed slow: Riposte cuts Gragas's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Gragas basic attacks)

### 8. Bard (net +1.37)

- **0.74** untargetable: Tempered Fate makes Bard untargetable, dodging Gragas's Explosive Cask. Untargetable for 2.5 s, long enough to use ahead of Explosive Cask. (Bard R Tempered Fate → Gragas R Explosive Cask)
- **0.49** untargetable: Tempered Fate makes Bard untargetable, dodging Gragas's Body Slam. Untargetable for 2.5 s, long enough to use ahead of Body Slam. (Bard R Tempered Fate → Gragas E Body Slam)
- **0.36** range: Bard's basic attacks reach 375 units farther than Gragas's (500 vs 125 attack range). Gragas closes the gap with Body Slam. (Bard basic attacks → Gragas basic attacks)

### 9. Vladimir (net +1.36)

- **0.85** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gragas's Body Slam. Untargetable for 2 s, long enough to use ahead of Body Slam. (Vladimir W Sanguine Pool → Gragas E Body Slam)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gragas's Explosive Cask. Untargetable for 2 s, long enough to use ahead of Explosive Cask. (Vladimir W Sanguine Pool → Gragas R Explosive Cask)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Gragas's (450 vs 125 attack range). Gragas closes the gap with Body Slam. (Vladimir basic attacks → Gragas basic attacks)
- Watch out: Body Slam's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 10. Yuumi (net +1.32)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Gragas's Body Slam. Untargetable for ?; Body Slam takes 0.66 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gragas E Body Slam)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Gragas's Explosive Cask. Untargetable for ?; Explosive Cask takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gragas R Explosive Cask)
- **0.32** range: Yuumi's basic attacks reach 300 units farther than Gragas's (425 vs 125 attack range). Gragas closes the gap with Body Slam. (Yuumi basic attacks → Gragas basic attacks)
- Watch out: Body Slam's airborne interrupts Yuumi's Final Chapter (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.76 | 1.76 | 0.00 |  |
| 2 | Elise | +1.68 | 1.68 | 0.00 |  |
| 3 | Sivir | +1.67 | 1.67 | 0.00 |  |
| 4 | Maokai | +1.63 | 1.63 | 0.00 |  |
| 5 | Morgana | +1.46 | 1.46 | 0.00 |  |
| 6 | Udyr | +1.46 | 1.46 | 0.00 |  |
| 7 | Fiora | +1.42 | 1.42 | 0.00 |  |
| 8 | Bard | +1.37 | 1.37 | 0.00 |  |
| 9 | Vladimir | +1.36 | 1.43 | 0.07 |  |
| 10 | Yuumi | +1.32 | 1.72 | 0.40 |  |
| 11 | Lissandra | +1.28 | 1.28 | 0.00 |  |
| 12 | Rek'Sai | +1.27 | 1.27 | 0.00 |  |
| 13 | Xayah | +1.27 | 1.27 | 0.00 |  |
| 14 | Aurora | +1.24 | 1.24 | 0.00 |  |
| 15 | Samira | +1.23 | 1.23 | 0.00 | projectile block (Blade Whirl) |
| 16 | Warwick | +1.20 | 1.48 | 0.28 |  |
| 17 | Gwen | +1.20 | 1.20 | 0.00 |  |
| 18 | Kled | +1.20 | 1.20 | 0.00 |  |
| 19 | Zaahen | +1.20 | 1.20 | 0.00 |  |
| 20 | Mel | +1.19 | 1.19 | 0.00 | projectile block (Rebuttal) |
| 21 | Yasuo | +1.17 | 1.17 | 0.00 | projectile block (Wind Wall) |
| 22 | Sion | +1.15 | 1.27 | 0.12 |  |
| 23 | Braum | +1.15 | 1.15 | 0.00 | projectile block (Unbreakable) |
| 24 | Camille | +1.14 | 1.14 | 0.00 |  |
| 25 | Evelynn | +1.14 | 1.14 | 0.00 |  |
| 26 | Rengar | +1.14 | 1.14 | 0.00 |  |
| 27 | Shaco | +1.13 | 1.13 | 0.00 |  |
| 28 | Master Yi | +1.07 | 1.27 | 0.20 |  |
| 29 | Ekko | +1.07 | 1.07 | 0.00 |  |
| 30 | Gangplank | +1.07 | 1.07 | 0.00 |  |
| 31 | Milio | +1.05 | 1.05 | 0.00 |  |
| 32 | Kalista | +1.02 | 1.02 | 0.00 |  |
| 33 | Olaf | +1.00 | 1.00 | 0.00 |  |
| 34 | Malzahar | +0.98 | 1.38 | 0.40 |  |
| 35 | Vex | +0.98 | 0.98 | 0.00 | dash stop (Doom 'n Gloom) |
| 36 | Alistar | +0.96 | 0.96 | 0.00 |  |
| 37 | Viktor | +0.90 | 0.90 | 0.00 | dash stop (Gravity Field) |
| 38 | Zed | +0.90 | 0.90 | 0.00 |  |
| 39 | Kindred | +0.89 | 0.89 | 0.00 |  |
| 40 | Teemo | +0.87 | 0.87 | 0.00 |  |
| 41 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 42 | Singed | +0.84 | 0.84 | 0.00 | grounding (Mega Adhesive) |
| 43 | Hwei | +0.81 | 0.81 | 0.00 | dash stop (Grim Visage) |
| 44 | Ahri | +0.80 | 0.80 | 0.00 | dash stop (Charm) |
| 45 | Cassiopeia | +0.80 | 0.80 | 0.00 | grounding (Miasma) |
| 46 | Jinx | +0.79 | 0.79 | 0.00 | dash stop (Flame Chompers!) |
| 47 | Veigar | +0.77 | 0.77 | 0.00 | dash stop (Event Horizon) |
| 48 | Lulu | +0.73 | 0.73 | 0.00 |  |
| 49 | Kayn | +0.71 | 1.16 | 0.45 |  |
| 50 | Yone | +0.69 | 0.69 | 0.00 |  |
| 51 | Xin Zhao | +0.68 | 0.68 | 0.00 |  |
| 52 | K'Sante | +0.65 | 0.65 | 0.00 |  |
| 53 | Nilah | +0.62 | 0.62 | 0.00 |  |
| 54 | Vayne | +0.58 | 0.58 | 0.00 |  |
| 55 | Corki | +0.56 | 0.56 | 0.00 |  |
| 56 | Taric | +0.56 | 0.56 | 0.00 |  |
| 57 | Poppy | +0.53 | 0.73 | 0.20 | dash stop (Steadfast Presence) |
| 58 | Jax | +0.53 | 0.53 | 0.00 |  |
| 59 | Pantheon | +0.51 | 0.60 | 0.09 |  |
| 60 | Draven | +0.51 | 0.51 | 0.00 |  |
| 61 | Renata Glasc | +0.51 | 0.51 | 0.00 |  |
| 62 | Sona | +0.51 | 0.51 | 0.00 |  |
| 63 | Garen | +0.49 | 0.49 | 0.00 |  |
| 64 | Zilean | +0.49 | 0.49 | 0.00 |  |
| 65 | Ashe | +0.46 | 0.46 | 0.00 |  |
| 66 | Jayce | +0.46 | 0.46 | 0.00 |  |
| 67 | Tristana | +0.46 | 0.46 | 0.00 |  |
| 68 | Zoe | +0.46 | 0.46 | 0.00 |  |
| 69 | Kennen | +0.45 | 0.45 | 0.00 |  |
| 70 | Gnar | +0.44 | 0.44 | 0.00 |  |
| 71 | Seraphine | +0.44 | 0.44 | 0.00 |  |
| 72 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 73 | Anivia | +0.43 | 0.43 | 0.00 |  |
| 74 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 75 | Malphite | +0.43 | 0.43 | 0.00 |  |
| 76 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 77 | Brand | +0.42 | 0.42 | 0.00 |  |
| 78 | Ziggs | +0.42 | 0.42 | 0.00 |  |
| 79 | Heimerdinger | +0.40 | 0.40 | 0.00 |  |
| 80 | Ornn | +0.40 | 0.40 | 0.00 |  |
| 81 | Soraka | +0.40 | 0.40 | 0.00 |  |
| 82 | Amumu | +0.39 | 0.39 | 0.00 |  |
| 83 | Nami | +0.39 | 0.39 | 0.00 |  |
| 84 | Annie | +0.38 | 0.38 | 0.00 |  |
| 85 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 86 | Quinn | +0.37 | 0.55 | 0.18 |  |
| 87 | Azir | +0.37 | 0.37 | 0.00 |  |
| 88 | Orianna | +0.37 | 0.37 | 0.00 |  |
| 89 | Sett | +0.37 | 0.37 | 0.00 |  |
| 90 | Swain | +0.37 | 0.37 | 0.00 |  |
| 91 | Volibear | +0.37 | 0.37 | 0.00 |  |
| 92 | Syndra | +0.36 | 0.36 | 0.00 |  |
| 93 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 94 | Thresh | +0.35 | 0.35 | 0.00 |  |
| 95 | Zyra | +0.34 | 0.34 | 0.00 |  |
| 96 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 97 | Neeko | +0.32 | 0.32 | 0.00 |  |
| 98 | Senna | +0.32 | 0.32 | 0.00 |  |
| 99 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 100 | Nidalee | +0.30 | 0.30 | 0.00 |  |
| 101 | Lux | +0.29 | 0.29 | 0.00 |  |
| 102 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 103 | Urgot | +0.29 | 0.29 | 0.00 |  |
| 104 | Twisted Fate | +0.28 | 0.63 | 0.35 |  |
| 105 | Varus | +0.28 | 0.39 | 0.11 |  |
| 106 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 107 | Shyvana | +0.27 | 0.27 | 0.00 |  |
| 108 | Hecarim | +0.25 | 0.25 | 0.00 |  |
| 109 | Zac | +0.24 | 0.67 | 0.43 | dash stop (Stretching Strikes) |
| 110 | Aurelion Sol | +0.24 | 0.32 | 0.08 |  |
| 111 | Graves | +0.24 | 0.24 | 0.00 |  |
| 112 | Jarvan IV | +0.24 | 0.24 | 0.00 |  |
| 113 | Mordekaiser | +0.24 | 0.24 | 0.00 |  |
| 114 | Blitzcrank | +0.23 | 0.23 | 0.00 |  |
| 115 | Leona | +0.23 | 0.23 | 0.00 |  |
| 116 | Rakan | +0.23 | 0.23 | 0.00 |  |
| 117 | Sejuani | +0.23 | 0.23 | 0.00 |  |
| 118 | Karma | +0.22 | 0.22 | 0.00 |  |
| 119 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 120 | Illaoi | +0.21 | 0.21 | 0.00 |  |
| 121 | Irelia | +0.21 | 0.21 | 0.00 |  |
| 122 | Lillia | +0.21 | 0.21 | 0.00 |  |
| 123 | Rammus | +0.20 | 0.44 | 0.24 |  |
| 124 | Aatrox | +0.20 | 0.20 | 0.00 |  |
| 125 | Cho'Gath | +0.20 | 0.20 | 0.00 |  |
| 126 | Kassadin | +0.19 | 0.19 | 0.00 |  |
| 127 | Shen | +0.18 | 0.63 | 0.45 |  |
| 128 | Bel'Veth | +0.17 | 0.17 | 0.00 |  |
| 129 | Renekton | +0.17 | 0.17 | 0.00 |  |
| 130 | Rell | +0.16 | 0.16 | 0.00 |  |
| 131 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 132 | Sylas | +0.16 | 0.16 | 0.00 |  |
| 133 | Vel'Koz | +0.15 | 0.43 | 0.28 |  |
| 134 | Yorick | +0.15 | 0.15 | 0.00 |  |
| 135 | Riven | +0.14 | 0.14 | 0.00 |  |
| 136 | Trundle | +0.14 | 0.14 | 0.00 |  |
| 137 | Viego | +0.13 | 0.33 | 0.20 |  |
| 138 | Darius | +0.13 | 0.13 | 0.00 |  |
| 139 | Janna | +0.10 | 0.50 | 0.40 |  |
| 140 | Xerath | +0.10 | 0.42 | 0.32 |  |
| 141 | Ambessa | +0.10 | 0.10 | 0.00 |  |
| 142 | Briar | +0.10 | 0.10 | 0.00 |  |
| 143 | Diana | +0.10 | 0.10 | 0.00 |  |
| 144 | Fizz | +0.10 | 0.10 | 0.00 |  |
| 145 | Lee Sin | +0.10 | 0.10 | 0.00 |  |
| 146 | Wukong | +0.10 | 0.10 | 0.00 |  |
| 147 | Nautilus | +0.10 | 0.10 | 0.00 |  |
| 148 | Qiyana | +0.10 | 0.10 | 0.00 |  |
| 149 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 150 | Lucian | +0.08 | 0.36 | 0.28 |  |
| 151 | Vi | +0.06 | 0.41 | 0.35 |  |
| 152 | Akshan | +0.06 | 0.34 | 0.28 |  |
| 153 | Ivern | +0.05 | 0.19 | 0.14 |  |
| 154 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 155 | Galio | +0.01 | 0.19 | 0.18 |  |
| 156 | Pyke | +0.01 | 0.15 | 0.14 |  |
| 157 | Akali | 0.00 | 0.00 | 0.00 |  |
| 158 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 159 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 160 | Locke | 0.00 | 0.00 | 0.00 |  |
| 161 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 162 | Talon | 0.00 | 0.00 | 0.00 |  |
| 163 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 164 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 165 | Fiddlesticks | -0.04 | 0.40 | 0.44 |  |
| 166 | Taliyah | -0.07 | 0.41 | 0.48 |  |
| 167 | Karthus | -0.09 | 0.19 | 0.28 |  |
| 168 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 169 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 170 | Tahm Kench | -0.27 | 0.23 | 0.50 |  |
| 171 | Nunu & Willump | -0.29 | 0.20 | 0.49 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
