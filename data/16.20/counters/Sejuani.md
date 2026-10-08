# Counters to Sejuani (patch 26.20)

Every champion ranked by what its kit does against Sejuani's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sejuani's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sejuani` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.61)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Sejuani's Arctic Assault. Untargetable for 0.6 s; Arctic Assault takes 0.65 s to land, enough to react. (Elise E Rappel → Sejuani Q Arctic Assault)
- **0.80** untargetable: Rappel makes Elise untargetable, dodging Sejuani's Glacial Prison. Untargetable for 0.6 s; Glacial Prison takes 1.06 s to land, enough to react. (Elise E Rappel → Sejuani R Glacial Prison)
- **0.36** untargetable: Rappel makes Elise untargetable, dodging Sejuani's Permafrost. Untargetable for 0.6 s; Permafrost takes 0.25 s to land, enough to react. (Elise E Rappel → Sejuani E Permafrost)

### 2. Nocturne (net +1.54)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Sejuani's Arctic Assault. Spell shield for 1.5 s, long enough to use ahead of Arctic Assault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sejuani Q Arctic Assault)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Sejuani's Glacial Prison. Spell shield for 1.5 s, long enough to use ahead of Glacial Prison. A spell shield blocks only the first enemy ability that reaches it. Spell shields will block only a single instance of damage. (Nocturne W Shroud of Darkness → Sejuani R Glacial Prison)
- **0.38** spell shield: Shroud of Darkness's spell shield blocks Sejuani's Permafrost. Spell shield for 1.5 s, long enough to use ahead of Permafrost. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sejuani E Permafrost)

### 3. Fiora (net +1.53)

- **0.95** parry: Riposte parries Sejuani's Arctic Assault and stuns back. Parry for 0.75 s; Arctic Assault takes 0.65 s to land, enough to react. Negating Arctic Assault's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sejuani Q Arctic Assault)
- **0.90** parry: Riposte parries Sejuani's Glacial Prison and stuns back. Parry for 0.75 s; Glacial Prison takes 1.06 s to land, enough to react. Negating Glacial Prison's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sejuani R Glacial Prison)
- **0.47** parry: Riposte parries Sejuani's Permafrost and stuns back. Parry for 0.75 s; Permafrost takes 0.25 s to land, enough to react. Negating Permafrost's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sejuani E Permafrost)

### 4. Morgana (net +1.53)

- **0.85** cc immunity: Black Shield makes Morgana immune to Sejuani's Arctic Assault (airborne). Immune for 5 s, long enough to use ahead of Arctic Assault. (Morgana E Black Shield → Sejuani Q Arctic Assault)
- **0.80** cc immunity: Black Shield makes Morgana immune to Sejuani's Glacial Prison (slow, stun). Immune for 5 s, long enough to use ahead of Glacial Prison. (Morgana E Black Shield → Sejuani R Glacial Prison)
- **0.37** cc immunity: Black Shield makes Morgana immune to Sejuani's Permafrost (airborne, stun). Immune for 5 s, long enough to use ahead of Permafrost. (Morgana E Black Shield → Sejuani E Permafrost)

### 5. Sivir (net +1.53)

- **0.80** spell shield: Spell Shield's spell shield blocks Sejuani's Arctic Assault. Spell shield for 1.5 s, long enough to use ahead of Arctic Assault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sejuani Q Arctic Assault)
- **0.44** range: Sivir's basic attacks reach 350 units farther than Sejuani's (500 vs 150 attack range). Sejuani closes the gap with Arctic Assault. (Sivir basic attacks → Sejuani basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Sejuani's Glacial Prison. Spell shield for 1.5 s, long enough to use ahead of Glacial Prison. A spell shield blocks only the first enemy ability that reaches it. Spell shields will block only a single instance of damage. (Sivir E Spell Shield → Sejuani R Glacial Prison)

### 6. Udyr (net +1.52)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sejuani's Arctic Assault (airborne). Immune for 1.5 s, long enough to use ahead of Arctic Assault. (Udyr E Blazing Stampede → Sejuani Q Arctic Assault)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Sejuani's Glacial Prison (slow, stun). Immune for 1.5 s, long enough to use ahead of Glacial Prison. (Udyr E Blazing Stampede → Sejuani R Glacial Prison)
- **0.44** cc immunity: Blazing Stampede makes Udyr immune to Sejuani's Permafrost (airborne, stun). Immune for 1.5 s, long enough to use ahead of Permafrost. (Udyr E Blazing Stampede → Sejuani E Permafrost)

### 7. Maokai (net +1.50)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Sejuani's Arctic Assault. Untargetable for 1.4 s; Arctic Assault takes 0.65 s to land, enough to react. (Maokai W Twisted Advance → Sejuani Q Arctic Assault)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Sejuani's Glacial Prison. Untargetable for 1.4 s; Glacial Prison takes 1.06 s to land, enough to react. (Maokai W Twisted Advance → Sejuani R Glacial Prison)
- **0.39** untargetable: Twisted Advance makes Maokai untargetable, dodging Sejuani's Permafrost. Untargetable for 1.4 s; Permafrost takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Sejuani E Permafrost)

### 8. Yuumi (net +1.47)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Sejuani's Arctic Assault. Untargetable for ?; Arctic Assault takes 0.65 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Sejuani Q Arctic Assault)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Sejuani's Permafrost. Untargetable for ?; Permafrost takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Sejuani E Permafrost)
- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Sejuani's Glacial Prison. Untargetable for ?; Glacial Prison takes 1.06 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Sejuani R Glacial Prison)
- Watch out: Permafrost's airborne interrupts Yuumi's Final Chapter (normal channel).

### 9. Bard (net +1.47)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Sejuani's Glacial Prison. Untargetable for 2.5 s, long enough to use ahead of Glacial Prison. (Bard R Tempered Fate → Sejuani R Glacial Prison)
- **0.49** untargetable: Tempered Fate makes Bard untargetable, dodging Sejuani's Arctic Assault. Untargetable for 2.5 s, long enough to use ahead of Arctic Assault. (Bard R Tempered Fate → Sejuani Q Arctic Assault)
- **0.34** range: Bard's basic attacks reach 350 units farther than Sejuani's (500 vs 150 attack range). Sejuani closes the gap with Arctic Assault. (Bard basic attacks → Sejuani basic attacks)

### 10. Xayah (net +1.43)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Sejuani's Glacial Prison. Untargetable for 1.5 s, long enough to use ahead of Glacial Prison. (Xayah R Featherstorm → Sejuani R Glacial Prison)
- **0.47** untargetable: Featherstorm makes Xayah untargetable, dodging Sejuani's Arctic Assault. Untargetable for 1.5 s, long enough to use ahead of Arctic Assault. (Xayah R Featherstorm → Sejuani Q Arctic Assault)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Sejuani's (525 vs 150 attack range). Sejuani closes the gap with Arctic Assault. (Xayah basic attacks → Sejuani basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.61 | 1.61 | 0.00 |  |
| 2 | Nocturne | +1.54 | 1.54 | 0.00 |  |
| 3 | Fiora | +1.53 | 1.53 | 0.00 |  |
| 4 | Morgana | +1.53 | 1.53 | 0.00 |  |
| 5 | Sivir | +1.53 | 1.53 | 0.00 |  |
| 6 | Udyr | +1.52 | 1.52 | 0.00 |  |
| 7 | Maokai | +1.50 | 1.50 | 0.00 |  |
| 8 | Yuumi | +1.47 | 1.90 | 0.43 |  |
| 9 | Bard | +1.47 | 1.47 | 0.00 |  |
| 10 | Xayah | +1.43 | 1.43 | 0.00 |  |
| 11 | Vladimir | +1.39 | 1.50 | 0.11 |  |
| 12 | Aurora | +1.39 | 1.39 | 0.00 |  |
| 13 | Lissandra | +1.38 | 1.38 | 0.00 |  |
| 14 | Gwen | +1.29 | 1.29 | 0.00 |  |
| 15 | Master Yi | +1.28 | 1.51 | 0.23 |  |
| 16 | Samira | +1.26 | 1.26 | 0.00 | projectile block (Blade Whirl) |
| 17 | Mel | +1.25 | 1.25 | 0.00 | projectile block (Rebuttal) |
| 18 | Rengar | +1.21 | 1.21 | 0.00 |  |
| 19 | Rek'Sai | +1.16 | 1.16 | 0.00 |  |
| 20 | Camille | +1.15 | 1.15 | 0.00 |  |
| 21 | Ekko | +1.15 | 1.15 | 0.00 |  |
| 22 | Evelynn | +1.13 | 1.13 | 0.00 |  |
| 23 | Gangplank | +1.13 | 1.13 | 0.00 |  |
| 24 | Kled | +1.13 | 1.13 | 0.00 |  |
| 25 | Olaf | +1.13 | 1.13 | 0.00 |  |
| 26 | Shaco | +1.13 | 1.13 | 0.00 |  |
| 27 | Zaahen | +1.13 | 1.13 | 0.00 |  |
| 28 | Kalista | +1.10 | 1.10 | 0.00 |  |
| 29 | Milio | +1.10 | 1.10 | 0.00 |  |
| 30 | Zed | +1.07 | 1.07 | 0.00 |  |
| 31 | Warwick | +1.01 | 1.41 | 0.40 |  |
| 32 | Braum | +1.01 | 1.01 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 33 | Yasuo | +0.98 | 0.98 | 0.00 | projectile block (Wind Wall) |
| 34 | Sion | +0.97 | 1.15 | 0.18 |  |
| 35 | Kindred | +0.94 | 0.94 | 0.00 |  |
| 36 | Vex | +0.94 | 0.94 | 0.00 | dash stop (Doom 'n Gloom) |
| 37 | Kayle | +0.93 | 0.93 | 0.00 |  |
| 38 | Alistar | +0.90 | 0.90 | 0.00 |  |
| 39 | Malzahar | +0.85 | 1.25 | 0.40 |  |
| 40 | Viktor | +0.78 | 0.78 | 0.00 | dash stop (Gravity Field) |
| 41 | Jinx | +0.77 | 0.77 | 0.00 | dash stop (Flame Chompers!) |
| 42 | Teemo | +0.75 | 0.75 | 0.00 | blind (Blinding Dart) |
| 43 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 44 | Ahri | +0.72 | 0.72 | 0.00 | dash stop (Charm) |
| 45 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 46 | Veigar | +0.70 | 0.70 | 0.00 | dash stop (Event Horizon) |
| 47 | Kayn | +0.68 | 1.13 | 0.45 |  |
| 48 | Lulu | +0.66 | 0.66 | 0.00 |  |
| 49 | Pantheon | +0.54 | 0.65 | 0.11 |  |
| 50 | Corki | +0.54 | 0.54 | 0.00 |  |
| 51 | Xin Zhao | +0.54 | 0.54 | 0.00 |  |
| 52 | Garen | +0.52 | 0.52 | 0.00 |  |
| 53 | Taric | +0.50 | 0.50 | 0.00 |  |
| 54 | Aphelios | +0.49 | 0.49 | 0.00 |  |
| 55 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 56 | Yone | +0.49 | 0.49 | 0.00 |  |
| 57 | K'Sante | +0.48 | 0.48 | 0.00 |  |
| 58 | Malphite | +0.45 | 0.45 | 0.00 |  |
| 59 | Zeri | +0.44 | 0.44 | 0.00 |  |
| 60 | Poppy | +0.43 | 0.63 | 0.20 | dash stop (Steadfast Presence) |
| 61 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 62 | Vayne | +0.43 | 0.43 | 0.00 |  |
| 63 | Sona | +0.41 | 0.41 | 0.00 |  |
| 64 | Nilah | +0.39 | 0.39 | 0.00 |  |
| 65 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 66 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 67 | Draven | +0.36 | 0.36 | 0.00 |  |
| 68 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 69 | Tristana | +0.36 | 0.36 | 0.00 |  |
| 70 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 71 | Jax | +0.35 | 0.35 | 0.00 |  |
| 72 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 73 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 74 | Senna | +0.32 | 0.32 | 0.00 |  |
| 75 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 76 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 77 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 78 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 79 | Heimerdinger | +0.31 | 0.31 | 0.00 |  |
| 80 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 81 | Lux | +0.29 | 0.29 | 0.00 |  |
| 82 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 83 | Nidalee | +0.28 | 0.28 | 0.00 |  |
| 84 | Seraphine | +0.27 | 0.27 | 0.00 |  |
| 85 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 86 | Ziggs | +0.27 | 0.27 | 0.00 |  |
| 87 | Azir | +0.25 | 0.25 | 0.00 |  |
| 88 | Hecarim | +0.25 | 0.25 | 0.00 |  |
| 89 | Kog'Maw | +0.25 | 0.25 | 0.00 |  |
| 90 | Orianna | +0.25 | 0.25 | 0.00 |  |
| 91 | Amumu | +0.24 | 0.24 | 0.00 |  |
| 92 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 93 | Illaoi | +0.24 | 0.24 | 0.00 |  |
| 94 | Jarvan IV | +0.24 | 0.24 | 0.00 |  |
| 95 | Ornn | +0.24 | 0.24 | 0.00 |  |
| 96 | Sett | +0.24 | 0.24 | 0.00 |  |
| 97 | Shyvana | +0.24 | 0.24 | 0.00 |  |
| 98 | Volibear | +0.24 | 0.24 | 0.00 |  |
| 99 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 100 | Annie | +0.22 | 0.22 | 0.00 |  |
| 101 | Brand | +0.22 | 0.22 | 0.00 |  |
| 102 | Graves | +0.22 | 0.22 | 0.00 |  |
| 103 | Nami | +0.22 | 0.22 | 0.00 |  |
| 104 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 105 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 106 | Karma | +0.21 | 0.21 | 0.00 |  |
| 107 | LeBlanc | +0.21 | 0.21 | 0.00 |  |
| 108 | Swain | +0.20 | 0.20 | 0.00 |  |
| 109 | Thresh | +0.18 | 0.18 | 0.00 |  |
| 110 | Varus | +0.16 | 0.27 | 0.11 |  |
| 111 | Skarner | +0.13 | 0.13 | 0.00 |  |
| 112 | Urgot | +0.13 | 0.13 | 0.00 |  |
| 113 | Rakan | +0.11 | 0.11 | 0.00 |  |
| 114 | Lillia | +0.10 | 0.10 | 0.00 |  |
| 115 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 116 | Aurelion Sol | +0.08 | 0.22 | 0.14 |  |
| 117 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 118 | Lucian | +0.06 | 0.34 | 0.28 |  |
| 119 | Twisted Fate | +0.05 | 0.40 | 0.35 |  |
| 120 | Akshan | +0.04 | 0.32 | 0.28 |  |
| 121 | Miss Fortune | +0.04 | 0.32 | 0.28 |  |
| 122 | Quinn | +0.03 | 0.36 | 0.33 |  |
| 123 | Ivern | +0.03 | 0.18 | 0.15 |  |
| 124 | Zac | 0.00 | 0.50 | 0.50 | dash stop (Stretching Strikes) |
| 125 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 126 | Akali | 0.00 | 0.00 | 0.00 |  |
| 127 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 128 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 129 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 130 | Briar | 0.00 | 0.00 | 0.00 |  |
| 131 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 132 | Darius | 0.00 | 0.00 | 0.00 |  |
| 133 | Diana | 0.00 | 0.00 | 0.00 |  |
| 134 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 135 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 136 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 137 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 138 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 139 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 140 | Leona | 0.00 | 0.00 | 0.00 |  |
| 141 | Locke | 0.00 | 0.00 | 0.00 |  |
| 142 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 143 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 144 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 152 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 153 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 154 | Jhin | -0.01 | 0.27 | 0.28 |  |
| 155 | Viego | -0.01 | 0.24 | 0.25 |  |
| 156 | Rammus | -0.03 | 0.32 | 0.35 |  |
| 157 | Vel'Koz | -0.03 | 0.25 | 0.28 |  |
| 158 | Janna | -0.04 | 0.36 | 0.40 |  |
| 159 | Xerath | -0.09 | 0.25 | 0.34 |  |
| 160 | Karthus | -0.10 | 0.18 | 0.28 |  |
| 161 | Ryze | -0.11 | 0.24 | 0.35 |  |
| 162 | Shen | -0.12 | 0.33 | 0.45 |  |
| 163 | Galio | -0.18 | 0.00 | 0.18 |  |
| 164 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 165 | Nunu & Willump | -0.21 | 0.28 | 0.49 |  |
| 166 | Taliyah | -0.23 | 0.25 | 0.48 |  |
| 167 | Gragas | -0.23 | 0.00 | 0.23 |  |
| 168 | Vi | -0.26 | 0.24 | 0.50 |  |
| 169 | Katarina | -0.28 | 0.00 | 0.28 |  |
| 170 | Fiddlesticks | -0.29 | 0.18 | 0.47 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
