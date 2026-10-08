# Counters to Sylas (patch 26.20)

Every champion ranked by what its kit does against Sylas's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sylas's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sylas` for the full ledger of a matchup, with sources.

## Top 10

### 1. Nocturne (net +1.28)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas E Abduct)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas W Kingslayer)
- **0.10** cc immunity: Paranoia is displacement immune, ignoring Sylas's Abduct (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Sylas E Abduct)

### 2. Singed (net +1.26)

- **0.49** grounding: Mega Adhesive grounds Sylas, who then can't cast Abduct. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abduct)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Abscond. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abscond)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Kingslayer. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas W Kingslayer)

### 3. Maokai (net +1.18)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Sylas's Abduct. Untargetable for 1.4 s; Abduct takes 0.63 s to land, enough to react. (Maokai W Twisted Advance → Sylas E Abduct)
- **0.36** untargetable: Twisted Advance makes Maokai untargetable, dodging Sylas's Kingslayer. Untargetable for 1.4 s; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Sylas W Kingslayer)

### 4. Sivir (net +1.17)

- **0.73** spell shield: Spell Shield's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas E Abduct)
- **0.48** spell shield: Spell Shield's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas W Kingslayer)
- **0.20** range: Sivir's basic attacks reach 325 units farther than Sylas's (500 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Sivir basic attacks → Sylas basic attacks)

### 5. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Abduct (airborne, stun). Immune for 1.5 s, long enough to use ahead of Abduct. (Udyr E Blazing Stampede → Sylas E Abduct)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Chain Lash (slow). Immune for 1.5 s, long enough to use ahead of Chain Lash. (Udyr E Blazing Stampede → Sylas Q Chain Lash)

### 6. Fiora (net +1.05)

- **0.88** parry: Riposte parries Sylas's Abduct and stuns back. Parry for 0.75 s; Abduct takes 0.63 s to land, enough to react. Negating Abduct's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sylas E Abduct)
- **0.30** parry: Riposte parries Sylas's Kingslayer. Parry for 0.75 s; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Sylas W Kingslayer)
- **0.07** attack speed slow: Riposte cuts Sylas's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Sylas basic attacks)

### 7. Vladimir (net +1.03)

- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sylas's Abduct. Untargetable for 2 s, long enough to use ahead of Abduct. (Vladimir W Sanguine Pool → Sylas E Abduct)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sylas's Kingslayer. Untargetable for 2 s, long enough to use ahead of Kingslayer. (Vladimir W Sanguine Pool → Sylas W Kingslayer)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Sylas's (450 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Vladimir basic attacks → Sylas basic attacks)
- Watch out: Abduct's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 8. Elise (net +1.02)

- **0.73** untargetable: Rappel makes Elise untargetable, dodging Sylas's Abduct. Untargetable for 0.6 s; Abduct takes 0.63 s to land, enough to react. (Elise E Rappel → Sylas E Abduct)
- **0.29** untargetable: Rappel makes Elise untargetable, dodging Sylas's Kingslayer. Untargetable for 0.6 s; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Sylas W Kingslayer)
- **0.15** range: Elise's basic attacks reach 375 units farther than Sylas's (550 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Elise basic attacks → Sylas basic attacks)

### 9. Braum (net +1.00)

- **1.00** projectile block: Unbreakable blocks Sylas's Abduct, a projectile. Unbreakable for 4 s, long enough to use ahead of Abduct. (Braum E Unbreakable → Sylas E Abduct)

### 10. Yuumi (net +0.96)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Sylas's Abduct. Untargetable for ?; Abduct takes 0.63 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Sylas E Abduct)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Sylas's Kingslayer. Untargetable for ?; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Sylas W Kingslayer)
- **0.13** range: Yuumi's basic attacks reach 250 units farther than Sylas's (425 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Yuumi basic attacks → Sylas basic attacks)
- Watch out: Abduct's airborne interrupts Yuumi's Final Chapter (normal channel).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.28 | 1.28 | 0.00 |  |
| 2 | Singed | +1.26 | 1.26 | 0.00 | grounding (Mega Adhesive) |
| 3 | Maokai | +1.18 | 1.18 | 0.00 |  |
| 4 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 5 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 6 | Fiora | +1.05 | 1.05 | 0.00 |  |
| 7 | Vladimir | +1.03 | 1.11 | 0.08 |  |
| 8 | Elise | +1.02 | 1.02 | 0.00 |  |
| 9 | Braum | +1.00 | 1.00 | 0.00 | projectile block (Unbreakable) |
| 10 | Yuumi | +0.96 | 1.37 | 0.41 |  |
| 11 | Morgana | +0.90 | 0.90 | 0.00 |  |
| 12 | Jinx | +0.89 | 0.89 | 0.00 | dash stop (Flame Chompers!) |
| 13 | Gwen | +0.88 | 0.88 | 0.00 |  |
| 14 | Hwei | +0.87 | 0.87 | 0.00 | dash stop (Grim Visage) |
| 15 | Cassiopeia | +0.86 | 0.86 | 0.00 | grounding (Miasma) |
| 16 | Lissandra | +0.86 | 0.86 | 0.00 |  |
| 17 | Vex | +0.83 | 0.83 | 0.00 |  |
| 18 | Bard | +0.82 | 0.82 | 0.00 |  |
| 19 | Xayah | +0.81 | 0.81 | 0.00 |  |
| 20 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 21 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 22 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 23 | Mel | +0.76 | 0.76 | 0.00 | projectile block (Rebuttal) |
| 24 | Yasuo | +0.75 | 0.75 | 0.00 | projectile block (Wind Wall) |
| 25 | Veigar | +0.74 | 0.74 | 0.00 | dash stop (Event Horizon) |
| 26 | Master Yi | +0.72 | 0.95 | 0.23 |  |
| 27 | Rengar | +0.70 | 0.84 | 0.14 |  |
| 28 | Gangplank | +0.69 | 0.69 | 0.00 |  |
| 29 | Rek'Sai | +0.69 | 0.69 | 0.00 |  |
| 30 | Milio | +0.68 | 0.68 | 0.00 |  |
| 31 | Kayle | +0.66 | 0.66 | 0.00 |  |
| 32 | Poppy | +0.65 | 0.85 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 33 | Ekko | +0.64 | 0.64 | 0.00 |  |
| 34 | Malzahar | +0.60 | 1.00 | 0.40 |  |
| 35 | Camille | +0.60 | 0.60 | 0.00 |  |
| 36 | Aurora | +0.58 | 0.73 | 0.15 |  |
| 37 | Pantheon | +0.57 | 0.67 | 0.10 |  |
| 38 | Zed | +0.57 | 0.57 | 0.00 |  |
| 39 | Kindred | +0.54 | 0.54 | 0.00 |  |
| 40 | Kalista | +0.52 | 0.52 | 0.00 |  |
| 41 | Kled | +0.52 | 0.52 | 0.00 |  |
| 42 | Evelynn | +0.51 | 0.59 | 0.08 |  |
| 43 | Olaf | +0.51 | 0.51 | 0.00 |  |
| 44 | Zaahen | +0.51 | 0.51 | 0.00 |  |
| 45 | Warwick | +0.48 | 0.78 | 0.30 |  |
| 46 | Yone | +0.48 | 0.48 | 0.00 |  |
| 47 | Xin Zhao | +0.47 | 0.47 | 0.00 |  |
| 48 | Taric | +0.46 | 0.46 | 0.00 |  |
| 49 | Teemo | +0.45 | 0.53 | 0.08 |  |
| 50 | Lulu | +0.44 | 0.44 | 0.00 |  |
| 51 | Sion | +0.40 | 0.53 | 0.13 |  |
| 52 | Alistar | +0.40 | 0.40 | 0.00 |  |
| 53 | Shaco | +0.39 | 0.59 | 0.20 |  |
| 54 | Amumu | +0.36 | 0.36 | 0.00 |  |
| 55 | Garen | +0.36 | 0.36 | 0.00 |  |
| 56 | Varus | +0.34 | 0.45 | 0.11 |  |
| 57 | Zac | +0.31 | 0.78 | 0.47 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 58 | Jax | +0.31 | 0.31 | 0.00 |  |
| 59 | Malphite | +0.29 | 0.29 | 0.00 |  |
| 60 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 61 | Nilah | +0.27 | 0.27 | 0.00 |  |
| 62 | Corki | +0.24 | 0.24 | 0.00 |  |
| 63 | Aphelios | +0.23 | 0.23 | 0.00 |  |
| 64 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 65 | K'Sante | +0.20 | 0.20 | 0.00 |  |
| 66 | Sona | +0.19 | 0.19 | 0.00 |  |
| 67 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 68 | Renata Glasc | +0.18 | 0.18 | 0.00 |  |
| 69 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 70 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 71 | Draven | +0.17 | 0.17 | 0.00 |  |
| 72 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 73 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 74 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 75 | Zoe | +0.15 | 0.15 | 0.00 |  |
| 76 | Kayn | +0.14 | 0.59 | 0.45 |  |
| 77 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 78 | Heimerdinger | +0.14 | 0.14 | 0.00 |  |
| 79 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 80 | Lux | +0.14 | 0.14 | 0.00 |  |
| 81 | Jayce | +0.13 | 0.13 | 0.00 |  |
| 82 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 83 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 84 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 85 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 86 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 87 | Azir | +0.12 | 0.12 | 0.00 |  |
| 88 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 89 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 90 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 91 | Annie | +0.11 | 0.11 | 0.00 |  |
| 92 | Brand | +0.10 | 0.10 | 0.00 |  |
| 93 | Graves | +0.10 | 0.10 | 0.00 |  |
| 94 | Hecarim | +0.10 | 0.10 | 0.00 |  |
| 95 | Illaoi | +0.10 | 0.10 | 0.00 |  |
| 96 | Jarvan IV | +0.10 | 0.10 | 0.00 |  |
| 97 | Karma | +0.10 | 0.10 | 0.00 |  |
| 98 | Nami | +0.10 | 0.10 | 0.00 |  |
| 99 | Ornn | +0.10 | 0.10 | 0.00 |  |
| 100 | Sett | +0.10 | 0.10 | 0.00 |  |
| 101 | Shyvana | +0.10 | 0.10 | 0.00 |  |
| 102 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 103 | Volibear | +0.10 | 0.10 | 0.00 |  |
| 104 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 105 | Swain | +0.09 | 0.09 | 0.00 |  |
| 106 | Thresh | +0.08 | 0.08 | 0.00 |  |
| 107 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 108 | Vayne | +0.06 | 0.20 | 0.14 |  |
| 109 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 110 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 111 | Urgot | +0.06 | 0.06 | 0.00 |  |
| 112 | Senna | +0.05 | 0.16 | 0.11 |  |
| 113 | Rakan | +0.05 | 0.05 | 0.00 |  |
| 114 | Katarina | +0.04 | 0.32 | 0.28 |  |
| 115 | Lillia | +0.04 | 0.04 | 0.00 |  |
| 116 | Rammus | +0.02 | 0.29 | 0.27 |  |
| 117 | Aurelion Sol | +0.02 | 0.10 | 0.08 |  |
| 118 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 119 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 120 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 121 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 122 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 123 | Briar | 0.00 | 0.00 | 0.00 |  |
| 124 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 125 | Darius | 0.00 | 0.00 | 0.00 |  |
| 126 | Diana | 0.00 | 0.00 | 0.00 |  |
| 127 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 128 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 129 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 130 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 131 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 132 | Leona | 0.00 | 0.00 | 0.00 |  |
| 133 | Locke | 0.00 | 0.00 | 0.00 |  |
| 134 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 135 | Rell | 0.00 | 0.00 | 0.00 |  |
| 136 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 137 | Riven | 0.00 | 0.00 | 0.00 |  |
| 138 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 139 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 140 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 141 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 142 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 143 | Neeko | -0.01 | 0.10 | 0.11 |  |
| 144 | Quinn | -0.02 | 0.17 | 0.19 |  |
| 145 | Ivern | -0.07 | 0.08 | 0.15 |  |
| 146 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 147 | Akali | -0.11 | 0.00 | 0.11 |  |
| 148 | Lucian | -0.12 | 0.16 | 0.28 |  |
| 149 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 150 | Talon | -0.14 | 0.00 | 0.14 |  |
| 151 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 152 | Shen | -0.16 | 0.29 | 0.45 |  |
| 153 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 154 | Vel'Koz | -0.16 | 0.12 | 0.28 |  |
| 155 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 156 | Galio | -0.18 | 0.00 | 0.18 |  |
| 157 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 158 | Xerath | -0.20 | 0.12 | 0.32 |  |
| 159 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 160 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 161 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 162 | Janna | -0.23 | 0.17 | 0.40 |  |
| 163 | Viego | -0.23 | 0.10 | 0.33 |  |
| 164 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 165 | Pyke | -0.26 | 0.00 | 0.26 |  |
| 166 | Akshan | -0.27 | 0.15 | 0.42 |  |
| 167 | Vi | -0.28 | 0.10 | 0.38 |  |
| 168 | Taliyah | -0.36 | 0.12 | 0.48 |  |
| 169 | Nunu & Willump | -0.37 | 0.12 | 0.49 |  |
| 170 | Fiddlesticks | -0.37 | 0.08 | 0.45 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
