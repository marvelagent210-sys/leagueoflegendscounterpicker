# Counters to Bard (patch 26.20)

Every champion ranked by what its kit does against Bard's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Bard's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Bard` for the full ledger of a matchup, with sources.

## Top 10

### 1. Sivir (net +0.87)

- **0.80** spell shield: Spell Shield's spell shield blocks Bard's Tempered Fate. Spell shield for 1.5 s, long enough to use ahead of Tempered Fate. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bard R Tempered Fate)
- **0.14** spell shield: Spell Shield's spell shield blocks part of Bard's Cosmic Binding. Spell shield for 1.5 s, long enough to use ahead of Cosmic Binding. A spell shield blocks only the first enemy ability that reaches it. Cosmic Binding's interaction with spell shields:
  - If the first target has a spell shield, they will block the damage but the bolt will still pass through them.
    - If the bolt hits a second target, only they will be stunned.
    - If the bolt hits terrain, the first target will be stunned.
  - If the second target has a spell shield, they will block the stun and damage.
    - The first target will still be stunned.
  - If the first target gains a spell shield after being hit, the stun will not be blocked. (Sivir E Spell Shield → Bard Q Cosmic Binding)

### 2. Fiora (net +0.55)

- **0.90** parry: Riposte parries Bard's Tempered Fate and stuns back. Parry for 0.75 s; Tempered Fate takes 0.5 s to land, enough to react. Negating Tempered Fate's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Bard R Tempered Fate)
- **0.40** parry: Riposte parries Bard's Cosmic Binding and stuns back. Parry for 0.75 s; Cosmic Binding takes 0.82 s to land, enough to react. Negating Cosmic Binding's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Bard Q Cosmic Binding)
- **0.09** attack speed slow: Riposte cuts Bard's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Bard basic attacks)
- Watch out: Bard's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range).

### 3. Elise (net +0.42)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Bard's Tempered Fate. Untargetable for 0.6 s; Tempered Fate takes 0.5 s to land, enough to react. (Elise E Rappel → Bard R Tempered Fate)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Bard's Cosmic Binding. Untargetable for 0.6 s; Cosmic Binding takes 0.82 s to land, enough to react. (Elise E Rappel → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Elise's Cocoon.

### 4. Milio (net +0.33)

- **0.49** cleanse: Breath of Life cleanses Bard's Tempered Fate (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove stasis. (Milio R Breath of Life → Bard R Tempered Fate)
- **0.22** tenacity: Breath of Life's 65% tenacity shortens Bard's Tempered Fate (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Bard R Tempered Fate)
- **0.16** cleanse: Breath of Life cleanses Bard's Cosmic Binding (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Milio's Ultra Mega Fire Kick.

### 5. Vladimir (net +0.29)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Bard's Tempered Fate. Untargetable for 2 s, long enough to use ahead of Tempered Fate. (Vladimir W Sanguine Pool → Bard R Tempered Fate)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Bard's Cosmic Binding. Untargetable for 2 s, long enough to use ahead of Cosmic Binding. (Vladimir W Sanguine Pool → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Vladimir's Hemoplague.

### 6. Morgana (net +0.25)

- **0.80** cc immunity: Black Shield makes Morgana immune to Bard's Tempered Fate (stasis, stun). Immune for 5 s, long enough to use ahead of Tempered Fate. (Morgana E Black Shield → Bard R Tempered Fate)
- **0.30** cc immunity: Black Shield makes Morgana immune to Bard's Cosmic Binding (slow, stun). Immune for 5 s, long enough to use ahead of Cosmic Binding. (Morgana E Black Shield → Bard Q Cosmic Binding)
- **0.08** cc immunity: Black Shield makes Morgana immune to Bard's Traveler's Call (slow). Immune for 5 s, long enough to use ahead of Traveler's Call. (Morgana E Black Shield → Bard I Traveler's Call)
- Watch out: Tempered Fate makes Bard untargetable, dodging Morgana's Soul Shackles.

### 7. Master Yi (net +0.23)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Bard's Tempered Fate. Untargetable for ?; Tempered Fate takes 0.5 s to land, enough to react. (Master Yi Q Alpha Strike → Bard R Tempered Fate)
- **0.28** untargetable: Alpha Strike makes Master Yi untargetable, dodging Bard's Cosmic Binding. Untargetable for ?; Cosmic Binding takes 0.82 s to land, enough to react. (Master Yi Q Alpha Strike → Bard Q Cosmic Binding)
- **0.05** cc immunity: Highlander makes Master Yi immune to Bard's Cosmic Binding slow. Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Master Yi's Alpha Strike.

### 8. Yuumi (net +0.22)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Bard's Tempered Fate. Untargetable for ?; Tempered Fate takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Bard R Tempered Fate)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Bard's Cosmic Binding. Untargetable for ?; Cosmic Binding takes 0.82 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Yuumi's Final Chapter.

### 9. Kayle (net +0.21)

- **0.11** range: Kayle's basic attacks reach 125 units farther than Bard's (625 vs 500 attack range). Bard closes the gap with Magical Journey. (Kayle basic attacks → Bard basic attacks)
- **0.10** invulnerable: Divine Judgment makes Kayle invulnerable to Bard's Cosmic Binding (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Cosmic Binding. (Kayle R Divine Judgment → Bard Q Cosmic Binding)

### 10. Shaco (net +0.19)

- **0.80** untargetable: Hallucinate makes Shaco untargetable, dodging Bard's Tempered Fate. Untargetable for 0.5 s; Tempered Fate takes 0.5 s to land, enough to react. (Shaco R Hallucinate → Bard R Tempered Fate)
- **0.20** untargetable: Hallucinate makes Shaco untargetable, dodging Bard's Cosmic Binding. Untargetable for 0.5 s; Cosmic Binding takes 0.82 s to land, enough to react. (Shaco R Hallucinate → Bard Q Cosmic Binding)
- Watch out: Tempered Fate makes Bard untargetable, dodging Shaco's Jack in the Box.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.87 | 0.87 | 0.00 |  |
| 2 | Fiora | +0.55 | 1.12 | 0.57 |  |
| 3 | Elise | +0.42 | 0.94 | 0.52 |  |
| 4 | Milio | +0.33 | 0.66 | 0.33 |  |
| 5 | Vladimir | +0.29 | 0.95 | 0.66 |  |
| 6 | Morgana | +0.25 | 0.97 | 0.72 |  |
| 7 | Master Yi | +0.23 | 1.03 | 0.80 |  |
| 8 | Yuumi | +0.22 | 1.03 | 0.81 |  |
| 9 | Kayle | +0.21 | 0.21 | 0.00 |  |
| 10 | Shaco | +0.19 | 0.90 | 0.71 |  |
| 11 | Udyr | +0.12 | 1.05 | 0.93 |  |
| 12 | Aurora | +0.12 | 0.82 | 0.70 |  |
| 13 | Xayah | +0.09 | 0.80 | 0.71 |  |
| 14 | Teemo | +0.08 | 0.50 | 0.42 | blind (Blinding Dart) |
| 15 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 16 | Gwen | +0.05 | 0.94 | 0.89 |  |
| 17 | Samira | +0.05 | 0.46 | 0.41 |  |
| 18 | Olaf | 0.00 | 0.92 | 0.92 |  |
| 19 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 20 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 21 | Lissandra | -0.02 | 0.94 | 0.96 |  |
| 22 | Kindred | -0.11 | 0.10 | 0.21 |  |
| 23 | Ekko | -0.15 | 0.91 | 1.06 |  |
| 24 | Alistar | -0.26 | 0.73 | 0.99 |  |
| 25 | Kog'Maw | -0.26 | 0.00 | 0.26 |  |
| 26 | Mel | -0.27 | 0.45 | 0.72 |  |
| 27 | Jinx | -0.27 | 0.30 | 0.57 |  |
| 28 | Nidalee | -0.27 | 0.00 | 0.27 |  |
| 29 | Tryndamere | -0.31 | 0.00 | 0.31 |  |
| 30 | Vex | -0.32 | 0.38 | 0.70 |  |
| 31 | LeBlanc | -0.32 | 0.00 | 0.32 |  |
| 32 | Zed | -0.34 | 0.80 | 1.14 |  |
| 33 | Vayne | -0.34 | 0.00 | 0.34 |  |
| 34 | Veigar | -0.35 | 0.30 | 0.65 |  |
| 35 | Zoe | -0.35 | 0.00 | 0.35 |  |
| 36 | Soraka | -0.36 | 0.00 | 0.36 |  |
| 37 | Malzahar | -0.39 | 0.69 | 1.08 |  |
| 38 | Corki | -0.40 | 0.08 | 0.48 |  |
| 39 | Rek'Sai | -0.41 | 0.92 | 1.33 |  |
| 40 | Braum | -0.41 | 0.75 | 1.16 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 41 | Kalista | -0.42 | 0.60 | 1.02 |  |
| 42 | Warwick | -0.43 | 1.03 | 1.46 |  |
| 43 | Zaahen | -0.44 | 0.92 | 1.36 |  |
| 44 | Heimerdinger | -0.44 | 0.07 | 0.51 |  |
| 45 | Karma | -0.44 | 0.00 | 0.44 |  |
| 46 | Zilean | -0.44 | 0.00 | 0.44 |  |
| 47 | Nocturne | -0.46 | 0.97 | 1.43 |  |
| 48 | Jayce | -0.47 | 0.00 | 0.47 |  |
| 49 | Viktor | -0.48 | 0.30 | 0.78 |  |
| 50 | Varus | -0.48 | 0.23 | 0.71 |  |
| 51 | Maokai | -0.49 | 0.99 | 1.48 |  |
| 52 | Kled | -0.50 | 0.78 | 1.28 |  |
| 53 | Twisted Fate | -0.51 | 0.00 | 0.51 |  |
| 54 | Zeri | -0.51 | 0.00 | 0.51 |  |
| 55 | Kayn | -0.52 | 0.90 | 1.42 |  |
| 56 | Hwei | -0.52 | 0.30 | 0.82 |  |
| 57 | Ivern | -0.52 | 0.00 | 0.52 |  |
| 58 | Evelynn | -0.54 | 0.90 | 1.44 |  |
| 59 | Camille | -0.55 | 0.87 | 1.42 |  |
| 60 | Nasus | -0.55 | 0.39 | 0.94 |  |
| 61 | Ezreal | -0.55 | 0.00 | 0.55 |  |
| 62 | Sion | -0.56 | 0.92 | 1.48 |  |
| 63 | Yasuo | -0.56 | 0.55 | 1.11 | projectile block (Wind Wall) |
| 64 | Shen | -0.56 | 0.39 | 0.95 |  |
| 65 | Lux | -0.56 | 0.00 | 0.56 |  |
| 66 | Quinn | -0.56 | 0.00 | 0.56 |  |
| 67 | Ahri | -0.57 | 0.30 | 0.87 |  |
| 68 | Anivia | -0.57 | 0.06 | 0.63 |  |
| 69 | Ryze | -0.57 | 0.00 | 0.57 |  |
| 70 | Gangplank | -0.59 | 0.78 | 1.37 |  |
| 71 | Ashe | -0.59 | 0.09 | 0.68 |  |
| 72 | Lulu | -0.61 | 0.36 | 0.97 |  |
| 73 | Rengar | -0.63 | 0.81 | 1.44 |  |
| 74 | Akshan | -0.64 | 0.00 | 0.64 |  |
| 75 | Caitlyn | -0.65 | 0.14 | 0.79 |  |
| 76 | Graves | -0.65 | 0.00 | 0.65 |  |
| 77 | Gnar | -0.66 | 0.00 | 0.66 |  |
| 78 | Smolder | -0.67 | 0.00 | 0.67 |  |
| 79 | Kennen | -0.68 | 0.00 | 0.68 |  |
| 80 | Karthus | -0.69 | 0.00 | 0.69 |  |
| 81 | Annie | -0.70 | 0.07 | 0.77 |  |
| 82 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 83 | Senna | -0.72 | 0.08 | 0.80 |  |
| 84 | Draven | -0.72 | 0.00 | 0.72 |  |
| 85 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 86 | Ziggs | -0.72 | 0.00 | 0.72 |  |
| 87 | Singed | -0.73 | 0.42 | 1.15 |  |
| 88 | Aatrox | -0.73 | 0.00 | 0.73 |  |
| 89 | Katarina | -0.74 | 0.18 | 0.92 |  |
| 90 | Tristana | -0.74 | 0.18 | 0.92 |  |
| 91 | Shyvana | -0.74 | 0.08 | 0.82 |  |
| 92 | Lucian | -0.74 | 0.00 | 0.74 |  |
| 93 | Miss Fortune | -0.75 | 0.00 | 0.75 |  |
| 94 | Jax | -0.76 | 0.41 | 1.17 | attack dodge (Counter Strike) |
| 95 | Brand | -0.76 | 0.00 | 0.76 |  |
| 96 | Swain | -0.78 | 0.00 | 0.78 |  |
| 97 | Syndra | -0.78 | 0.00 | 0.78 |  |
| 98 | Illaoi | -0.79 | 0.08 | 0.87 |  |
| 99 | Bel'Veth | -0.79 | 0.00 | 0.79 |  |
| 100 | Vel'Koz | -0.79 | 0.00 | 0.79 |  |
| 101 | Sona | -0.80 | 0.00 | 0.80 |  |
| 102 | Xerath | -0.80 | 0.00 | 0.80 |  |
| 103 | Jhin | -0.82 | 0.00 | 0.82 |  |
| 104 | Sylas | -0.82 | 0.00 | 0.82 |  |
| 105 | Cassiopeia | -0.83 | 0.14 | 0.97 |  |
| 106 | Thresh | -0.83 | 0.00 | 0.83 |  |
| 107 | Kassadin | -0.86 | 0.00 | 0.86 |  |
| 108 | Talon | -0.89 | 0.00 | 0.89 |  |
| 109 | Aphelios | -0.90 | 0.07 | 0.97 |  |
| 110 | Nilah | -0.91 | 0.35 | 1.26 |  |
| 111 | Taric | -0.91 | 0.10 | 1.01 |  |
| 112 | Locke | -0.91 | 0.00 | 0.91 |  |
| 113 | Orianna | -0.91 | 0.00 | 0.91 |  |
| 114 | Garen | -0.92 | 0.39 | 1.31 |  |
| 115 | Lee Sin | -0.92 | 0.00 | 0.92 |  |
| 116 | Zyra | -0.93 | 0.04 | 0.97 |  |
| 117 | Azir | -0.96 | 0.00 | 0.96 |  |
| 118 | Yorick | -0.96 | 0.00 | 0.96 |  |
| 119 | Lillia | -0.97 | 0.00 | 0.97 |  |
| 120 | Neeko | -0.97 | 0.00 | 0.97 |  |
| 121 | Riven | -0.97 | 0.00 | 0.97 |  |
| 122 | Seraphine | -0.97 | 0.00 | 0.97 |  |
| 123 | Renata Glasc | -0.98 | 0.00 | 0.98 |  |
| 124 | Fiddlesticks | -1.00 | 0.00 | 1.00 |  |
| 125 | Akali | -1.01 | 0.00 | 1.01 |  |
| 126 | Nami | -1.01 | 0.00 | 1.01 |  |
| 127 | Aurelion Sol | -1.05 | 0.00 | 1.05 |  |
| 128 | Poppy | -1.06 | 0.34 | 1.40 |  |
| 129 | Renekton | -1.07 | 0.00 | 1.07 |  |
| 130 | Irelia | -1.10 | 0.00 | 1.10 |  |
| 131 | Urgot | -1.10 | 0.00 | 1.10 |  |
| 132 | Janna | -1.11 | 0.00 | 1.11 |  |
| 133 | Hecarim | -1.13 | 0.08 | 1.21 |  |
| 134 | Malphite | -1.14 | 0.33 | 1.47 |  |
| 135 | Yone | -1.14 | 0.24 | 1.38 |  |
| 136 | Fizz | -1.14 | 0.00 | 1.14 |  |
| 137 | Rammus | -1.15 | 0.38 | 1.53 |  |
| 138 | Zac | -1.15 | 0.30 | 1.45 |  |
| 139 | Pantheon | -1.17 | 0.14 | 1.31 |  |
| 140 | Rakan | -1.17 | 0.00 | 1.17 |  |
| 141 | Wukong | -1.19 | 0.00 | 1.19 |  |
| 142 | Mordekaiser | -1.24 | 0.09 | 1.33 |  |
| 143 | Ambessa | -1.24 | 0.00 | 1.24 |  |
| 144 | Amumu | -1.25 | 0.15 | 1.40 |  |
| 145 | Jarvan IV | -1.26 | 0.08 | 1.34 |  |
| 146 | Rumble | -1.27 | 0.00 | 1.27 |  |
| 147 | Xin Zhao | -1.28 | 0.10 | 1.38 |  |
| 148 | Qiyana | -1.28 | 0.00 | 1.28 |  |
| 149 | Nautilus | -1.30 | 0.00 | 1.30 |  |
| 150 | Blitzcrank | -1.31 | 0.00 | 1.31 |  |
| 151 | Naafiri | -1.31 | 0.00 | 1.31 |  |
| 152 | Viego | -1.32 | 0.08 | 1.40 |  |
| 153 | Taliyah | -1.32 | 0.00 | 1.32 |  |
| 154 | Volibear | -1.33 | 0.08 | 1.41 |  |
| 155 | K'Sante | -1.34 | 0.16 | 1.50 |  |
| 156 | Diana | -1.34 | 0.00 | 1.34 |  |
| 157 | Leona | -1.34 | 0.00 | 1.34 |  |
| 158 | Darius | -1.35 | 0.00 | 1.35 |  |
| 159 | Trundle | -1.35 | 0.00 | 1.35 |  |
| 160 | Gragas | -1.37 | 0.00 | 1.37 |  |
| 161 | Pyke | -1.38 | 0.00 | 1.38 |  |
| 162 | Cho'Gath | -1.40 | 0.00 | 1.40 |  |
| 163 | Ornn | -1.41 | 0.08 | 1.49 |  |
| 164 | Tahm Kench | -1.41 | 0.00 | 1.41 |  |
| 165 | Briar | -1.42 | 0.00 | 1.42 |  |
| 166 | Rell | -1.43 | 0.00 | 1.43 |  |
| 167 | Nunu & Willump | -1.44 | 0.14 | 1.58 |  |
| 168 | Vi | -1.44 | 0.08 | 1.52 |  |
| 169 | Sett | -1.45 | 0.08 | 1.53 |  |
| 170 | Sejuani | -1.47 | 0.00 | 1.47 |  |
| 171 | Skarner | -1.51 | 0.08 | 1.59 |  |
| 172 | Galio | -1.54 | 0.00 | 1.54 |  |
