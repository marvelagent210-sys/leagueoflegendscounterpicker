# Counters to Qiyana (patch 26.20)

Every champion ranked by what its kit does against Qiyana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Qiyana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Qiyana` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.58)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 0.6 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Elise E Rappel → Qiyana R Supreme Display of Talent)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Qiyana's Audacity. Untargetable for 0.6 s; Audacity takes 1.08 s to land, enough to react. (Elise E Rappel → Qiyana E Audacity)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 0.6 s; Elemental Wrath takes 0.54 s to land, enough to react. (Elise E Rappel → Qiyana Q Elemental Wrath)

### 2. Sivir (net +1.47)

- **0.80** spell shield: Spell Shield's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana R Supreme Display of Talent)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana E Audacity)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana Q Elemental Wrath)

### 3. Morgana (net +1.37)

- **0.80** cc immunity: Black Shield makes Morgana immune to Qiyana's Supreme Display of Talent (airborne, stun). Immune for 5 s, long enough to use ahead of Supreme Display of Talent. (Morgana E Black Shield → Qiyana R Supreme Display of Talent)
- **0.54** cc immunity: Black Shield makes Morgana immune to Qiyana's Elemental Wrath (slow, root). Immune for 5 s, long enough to use ahead of Elemental Wrath. (Morgana E Black Shield → Qiyana Q Elemental Wrath)
- **0.18** reveal: Soul Shackles reveals Qiyana through Elemental Wrath's stealth. (Morgana R Soul Shackles → Qiyana Q Elemental Wrath)

### 4. Fiora (net +1.36)

- **0.90** parry: Riposte parries Qiyana's Supreme Display of Talent and stuns back. Parry for 0.75 s; Supreme Display of Talent takes 0.69 s to land, enough to react. Negating Supreme Display of Talent's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana R Supreme Display of Talent)
- **0.64** parry: Riposte parries Qiyana's Elemental Wrath and stuns back. Parry for 0.75 s; Elemental Wrath takes 0.54 s to land, enough to react. Negating Elemental Wrath's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana Q Elemental Wrath)
- **0.53** parry: Riposte parries Qiyana's Audacity. Parry for 0.75 s; Audacity takes 1.08 s to land, enough to react. (Fiora W Riposte → Qiyana E Audacity)

### 5. Nocturne (net +1.35)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana R Supreme Display of Talent)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana Q Elemental Wrath)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana E Audacity)

### 6. Maokai (net +1.32)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.4 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Maokai W Twisted Advance → Qiyana R Supreme Display of Talent)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.4 s; Elemental Wrath takes 0.54 s to land, enough to react. (Maokai W Twisted Advance → Qiyana Q Elemental Wrath)
- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Audacity. Untargetable for 1.4 s; Audacity takes 1.08 s to land, enough to react. (Maokai W Twisted Advance → Qiyana E Audacity)

### 7. Xayah (net +1.30)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.5 s, long enough to use ahead of Supreme Display of Talent. (Xayah R Featherstorm → Qiyana R Supreme Display of Talent)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Audacity. Untargetable for 1.5 s, long enough to use ahead of Audacity. (Xayah R Featherstorm → Qiyana E Audacity)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.5 s, long enough to use ahead of Elemental Wrath. (Xayah R Featherstorm → Qiyana Q Elemental Wrath)

### 8. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 2.5 s, long enough to use ahead of Supreme Display of Talent. (Bard R Tempered Fate → Qiyana R Supreme Display of Talent)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Audacity. Untargetable for 2.5 s, long enough to use ahead of Audacity. (Bard R Tempered Fate → Qiyana E Audacity)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 2.5 s, long enough to use ahead of Elemental Wrath. (Bard R Tempered Fate → Qiyana Q Elemental Wrath)

### 9. Vladimir (net +1.26)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 2 s, long enough to use ahead of Supreme Display of Talent. (Vladimir W Sanguine Pool → Qiyana R Supreme Display of Talent)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 2 s, long enough to use ahead of Elemental Wrath. (Vladimir W Sanguine Pool → Qiyana Q Elemental Wrath)
- **0.53** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Qiyana's Audacity. Untargetable for 2 s, long enough to use ahead of Audacity. (Vladimir W Sanguine Pool → Qiyana E Audacity)
- Watch out: Supreme Display of Talent's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 10. Aurora (net +1.26)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 0.4 s; Supreme Display of Talent takes 0.69 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Qiyana R Supreme Display of Talent)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Qiyana's Audacity. Untargetable for 0.4 s; Audacity takes 1.08 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Qiyana E Audacity)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 0.4 s; Elemental Wrath takes 0.54 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Qiyana Q Elemental Wrath)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.58 | 1.58 | 0.00 |  |
| 2 | Sivir | +1.47 | 1.47 | 0.00 |  |
| 3 | Morgana | +1.37 | 1.37 | 0.00 |  |
| 4 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 5 | Nocturne | +1.35 | 1.35 | 0.00 |  |
| 6 | Maokai | +1.32 | 1.32 | 0.00 |  |
| 7 | Xayah | +1.30 | 1.30 | 0.00 |  |
| 8 | Bard | +1.28 | 1.28 | 0.00 |  |
| 9 | Vladimir | +1.26 | 1.31 | 0.05 |  |
| 10 | Aurora | +1.26 | 1.26 | 0.00 |  |
| 11 | Lissandra | +1.25 | 1.25 | 0.00 |  |
| 12 | Yuumi | +1.23 | 1.58 | 0.35 |  |
| 13 | Kled | +1.21 | 1.21 | 0.00 |  |
| 14 | Master Yi | +1.20 | 1.30 | 0.10 |  |
| 15 | Gwen | +1.18 | 1.18 | 0.00 |  |
| 16 | Udyr | +1.15 | 1.15 | 0.00 |  |
| 17 | Rengar | +1.10 | 1.10 | 0.00 |  |
| 18 | Ekko | +1.09 | 1.09 | 0.00 |  |
| 19 | Rek'Sai | +1.09 | 1.09 | 0.00 |  |
| 20 | Camille | +1.07 | 1.07 | 0.00 |  |
| 21 | Evelynn | +1.06 | 1.06 | 0.00 |  |
| 22 | Shaco | +1.06 | 1.06 | 0.00 |  |
| 23 | Zed | +1.06 | 1.06 | 0.00 |  |
| 24 | Milio | +1.05 | 1.05 | 0.00 |  |
| 25 | Kalista | +0.97 | 0.97 | 0.00 |  |
| 26 | Olaf | +0.97 | 0.97 | 0.00 |  |
| 27 | Zaahen | +0.97 | 0.97 | 0.00 |  |
| 28 | Warwick | +0.96 | 1.13 | 0.17 |  |
| 29 | Kindred | +0.91 | 0.91 | 0.00 |  |
| 30 | Yasuo | +0.91 | 0.91 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 31 | Sion | +0.90 | 0.98 | 0.08 |  |
| 32 | Braum | +0.90 | 0.90 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 33 | Gangplank | +0.87 | 0.87 | 0.00 |  |
| 34 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 35 | Samira | +0.86 | 0.86 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 36 | Hwei | +0.83 | 0.83 | 0.00 |  |
| 37 | Mel | +0.82 | 0.82 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 38 | Vex | +0.81 | 0.81 | 0.00 |  |
| 39 | Alistar | +0.78 | 0.78 | 0.00 |  |
| 40 | Kayn | +0.73 | 1.09 | 0.36 |  |
| 41 | Pantheon | +0.72 | 0.77 | 0.05 |  |
| 42 | Cassiopeia | +0.72 | 0.72 | 0.00 |  |
| 43 | Malzahar | +0.70 | 1.02 | 0.32 |  |
| 44 | Lulu | +0.70 | 0.70 | 0.00 |  |
| 45 | Jinx | +0.68 | 0.68 | 0.00 |  |
| 46 | Viktor | +0.64 | 0.64 | 0.00 |  |
| 47 | Garen | +0.62 | 0.62 | 0.00 |  |
| 48 | Taric | +0.62 | 0.62 | 0.00 |  |
| 49 | Xin Zhao | +0.62 | 0.62 | 0.00 |  |
| 50 | Ahri | +0.60 | 0.60 | 0.00 |  |
| 51 | Teemo | +0.60 | 0.60 | 0.00 |  |
| 52 | Singed | +0.59 | 0.59 | 0.00 |  |
| 53 | Veigar | +0.58 | 0.58 | 0.00 |  |
| 54 | Poppy | +0.50 | 0.68 | 0.18 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 55 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 56 | Kai'Sa | +0.42 | 0.42 | 0.00 |  |
| 57 | Zac | +0.38 | 0.60 | 0.22 |  |
| 58 | Nidalee | +0.37 | 0.37 | 0.00 |  |
| 59 | Yone | +0.35 | 0.35 | 0.00 |  |
| 60 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 61 | Zyra | +0.34 | 0.34 | 0.00 |  |
| 62 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 63 | Jax | +0.32 | 0.32 | 0.00 |  |
| 64 | Karma | +0.32 | 0.32 | 0.00 |  |
| 65 | LeBlanc | +0.32 | 0.32 | 0.00 |  |
| 66 | Nasus | +0.30 | 0.30 | 0.00 |  |
| 67 | Thresh | +0.30 | 0.30 | 0.00 |  |
| 68 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 69 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 70 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 71 | Corki | +0.28 | 0.28 | 0.00 |  |
| 72 | Malphite | +0.28 | 0.28 | 0.00 |  |
| 73 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 74 | Sona | +0.27 | 0.27 | 0.00 |  |
| 75 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 76 | Illaoi | +0.26 | 0.26 | 0.00 |  |
| 77 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 78 | Draven | +0.24 | 0.24 | 0.00 |  |
| 79 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 80 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 81 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 82 | Mordekaiser | +0.22 | 0.22 | 0.00 |  |
| 83 | Senna | +0.22 | 0.22 | 0.00 |  |
| 84 | Sett | +0.22 | 0.22 | 0.00 |  |
| 85 | Skarner | +0.22 | 0.22 | 0.00 |  |
| 86 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 87 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 88 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 89 | Gnar | +0.21 | 0.21 | 0.00 |  |
| 90 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 91 | Caitlyn | +0.19 | 0.42 | 0.23 |  |
| 92 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 93 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 94 | Lux | +0.19 | 0.19 | 0.00 |  |
| 95 | Akshan | +0.18 | 0.39 | 0.21 |  |
| 96 | Aatrox | +0.18 | 0.18 | 0.00 |  |
| 97 | Akali | +0.18 | 0.18 | 0.00 |  |
| 98 | Ambessa | +0.18 | 0.18 | 0.00 |  |
| 99 | Briar | +0.18 | 0.18 | 0.00 |  |
| 100 | Fizz | +0.18 | 0.18 | 0.00 |  |
| 101 | Lee Sin | +0.18 | 0.18 | 0.00 |  |
| 102 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 103 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 104 | Sylas | +0.18 | 0.18 | 0.00 |  |
| 105 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 106 | Azir | +0.17 | 0.17 | 0.00 |  |
| 107 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 108 | Orianna | +0.17 | 0.17 | 0.00 |  |
| 109 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 110 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 111 | Rammus | +0.15 | 0.30 | 0.15 |  |
| 112 | Annie | +0.15 | 0.15 | 0.00 |  |
| 113 | Brand | +0.15 | 0.15 | 0.00 |  |
| 114 | Graves | +0.15 | 0.15 | 0.00 |  |
| 115 | Nami | +0.15 | 0.15 | 0.00 |  |
| 116 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 117 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 118 | Varus | +0.13 | 0.18 | 0.05 |  |
| 119 | Swain | +0.13 | 0.13 | 0.00 |  |
| 120 | Twisted Fate | +0.12 | 0.45 | 0.33 |  |
| 121 | Quinn | +0.11 | 0.24 | 0.13 |  |
| 122 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 123 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 124 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 125 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 126 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 127 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 128 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 129 | Lillia | +0.06 | 0.06 | 0.00 |  |
| 130 | Ivern | +0.05 | 0.12 | 0.07 |  |
| 131 | Vi | 0.00 | 0.22 | 0.22 |  |
| 132 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 133 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 134 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 135 | Darius | 0.00 | 0.00 | 0.00 |  |
| 136 | Diana | 0.00 | 0.00 | 0.00 |  |
| 137 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Leona | 0.00 | 0.00 | 0.00 |  |
| 142 | Locke | 0.00 | 0.00 | 0.00 |  |
| 143 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 144 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 154 | Lucian | -0.01 | 0.22 | 0.23 |  |
| 155 | Fiddlesticks | -0.03 | 0.30 | 0.33 |  |
| 156 | Miss Fortune | -0.03 | 0.22 | 0.25 |  |
| 157 | Viego | -0.03 | 0.08 | 0.11 |  |
| 158 | Jhin | -0.05 | 0.18 | 0.23 |  |
| 159 | Vel'Koz | -0.05 | 0.17 | 0.22 |  |
| 160 | Galio | -0.08 | 0.00 | 0.08 |  |
| 161 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 162 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 163 | Nunu & Willump | -0.11 | 0.20 | 0.31 |  |
| 164 | Xerath | -0.11 | 0.17 | 0.28 |  |
| 165 | Janna | -0.12 | 0.24 | 0.36 |  |
| 166 | Shen | -0.15 | 0.30 | 0.45 |  |
| 167 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 168 | Katarina | -0.17 | 0.00 | 0.17 |  |
| 169 | Naafiri | -0.18 | 0.18 | 0.36 |  |
| 170 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 171 | Tahm Kench | -0.24 | 0.00 | 0.24 |  |
| 172 | Taliyah | -0.31 | 0.17 | 0.48 |  |
