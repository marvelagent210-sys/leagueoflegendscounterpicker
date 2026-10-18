# Counters to Bel'Veth (patch 26.20)

Every champion ranked by what its kit does against Bel'Veth's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Bel'Veth's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Belveth` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.65)

- **0.49** grounding: Mega Adhesive grounds Bel'Veth, who then can't cast Endless Banquet. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Bel'Veth R Endless Banquet)
- **0.44** grounding: Mega Adhesive grounds Bel'Veth, who then can't cast Void Surge. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Bel'Veth Q Void Surge)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Bel'Veth's healing from Endless Banquet by 40%. (Singed R Insanity Potion → Bel'Veth R Endless Banquet)

### 2. Yuumi (net +1.13)

- **1.00** untargetable: You and Me! makes Yuumi untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for ?; Endless Banquet takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Bel'Veth R Endless Banquet)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Bel'Veth's Above and Below. Untargetable for ?; Above and Below takes 0.5 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Bel'Veth W Above and Below)
- **0.20** range: Yuumi's basic attacks reach 275 units farther than Bel'Veth's (425 vs 150 attack range). Bel'Veth closes the gap with Endless Banquet, Void Surge. (Yuumi basic attacks → Bel'Veth basic attacks)
- Watch out: Above and Below's airborne interrupts Yuumi's Final Chapter (normal channel).

### 3. Sivir (net +0.97)

- **0.47** spell shield: Spell Shield's spell shield blocks Bel'Veth's Above and Below. Spell shield for 1.5 s, long enough to use ahead of Above and Below. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bel'Veth W Above and Below)
- **0.43** spell shield: Spell Shield's spell shield blocks Bel'Veth's Endless Banquet. Spell shield for 1.5 s, long enough to use ahead of Endless Banquet. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bel'Veth R Endless Banquet)
- **0.29** range: Sivir's basic attacks reach 350 units farther than Bel'Veth's (500 vs 150 attack range). Bel'Veth closes the gap with Endless Banquet, Void Surge. (Sivir basic attacks → Bel'Veth basic attacks)

### 4. Fizz (net +0.94)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Bel'Veth's Above and Below. Untargetable for 0.75 s; Above and Below takes 0.5 s to land, enough to react. (Fizz E Playful → Bel'Veth W Above and Below)
- **0.48** untargetable: Playful makes Fizz untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 0.75 s; Endless Banquet takes 1 s to land, enough to react. (Fizz E Playful → Bel'Veth R Endless Banquet)

### 5. Nocturne (net +0.86)

- **0.56** spell shield: Shroud of Darkness's spell shield blocks Bel'Veth's Above and Below. Spell shield for 1.5 s, long enough to use ahead of Above and Below. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Bel'Veth W Above and Below)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Bel'Veth's Endless Banquet. Spell shield for 1.5 s, long enough to use ahead of Endless Banquet. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Bel'Veth R Endless Banquet)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Bel'Veth's Above and Below (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Bel'Veth W Above and Below)

### 6. Cassiopeia (net +0.85)

- **0.48** grounding: Miasma grounds Bel'Veth, who then can't cast Endless Banquet. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Bel'Veth R Endless Banquet)
- **0.43** grounding: Miasma grounds Bel'Veth, who then can't cast Void Surge. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Bel'Veth Q Void Surge)
- **0.15** range: Cassiopeia's basic attacks reach 400 units farther than Bel'Veth's (550 vs 150 attack range). Bel'Veth closes the gap with Endless Banquet, Void Surge. (Cassiopeia basic attacks → Bel'Veth basic attacks)

### 7. Maokai (net +0.85)

- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Bel'Veth's Above and Below. Untargetable for 1.4 s; Above and Below takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Bel'Veth W Above and Below)
- **0.46** untargetable: Twisted Advance makes Maokai untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 1.4 s; Endless Banquet takes 1 s to land, enough to react. (Maokai W Twisted Advance → Bel'Veth R Endless Banquet)

### 8. Fiora (net +0.83)

- **0.59** parry: Riposte parries Bel'Veth's Above and Below and stuns back. Parry for 0.75 s; Above and Below takes 0.5 s to land, enough to react. Negating Above and Below's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Bel'Veth W Above and Below)
- **0.44** parry: Riposte parries Bel'Veth's Endless Banquet. Parry for 0.75 s; Endless Banquet takes 1 s to land, enough to react. (Fiora W Riposte → Bel'Veth R Endless Banquet)
- **0.09** attack speed slow: Riposte cuts Bel'Veth's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Bel'Veth basic attacks)

### 9. Xayah (net +0.81)

- **0.41** untargetable: Featherstorm makes Xayah untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 1.5 s, long enough to use ahead of Endless Banquet. (Xayah R Featherstorm → Bel'Veth R Endless Banquet)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Bel'Veth's Above and Below. Untargetable for 1.5 s, long enough to use ahead of Above and Below. (Xayah R Featherstorm → Bel'Veth W Above and Below)
- **0.24** range: Xayah's basic attacks reach 375 units farther than Bel'Veth's (525 vs 150 attack range). Bel'Veth closes the gap with Endless Banquet, Void Surge. (Xayah basic attacks → Bel'Veth basic attacks)

### 10. Bard (net +0.79)

- **0.41** untargetable: Tempered Fate makes Bard untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 2.5 s, long enough to use ahead of Endless Banquet. (Bard R Tempered Fate → Bel'Veth R Endless Banquet)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Bel'Veth's Above and Below. Untargetable for 2.5 s, long enough to use ahead of Above and Below. (Bard R Tempered Fate → Bel'Veth W Above and Below)
- **0.22** range: Bard's basic attacks reach 350 units farther than Bel'Veth's (500 vs 150 attack range). Bel'Veth closes the gap with Endless Banquet, Void Surge. (Bard basic attacks → Bel'Veth basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.65 | 1.65 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 2 | Yuumi | +1.13 | 1.55 | 0.42 |  |
| 3 | Sivir | +0.97 | 0.97 | 0.00 |  |
| 4 | Fizz | +0.94 | 0.94 | 0.00 |  |
| 5 | Nocturne | +0.86 | 0.86 | 0.00 |  |
| 6 | Cassiopeia | +0.85 | 0.85 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 7 | Maokai | +0.85 | 0.85 | 0.00 |  |
| 8 | Fiora | +0.83 | 0.83 | 0.00 |  |
| 9 | Xayah | +0.81 | 0.81 | 0.00 |  |
| 10 | Bard | +0.79 | 0.79 | 0.00 |  |
| 11 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 12 | Aurora | +0.77 | 0.77 | 0.00 |  |
| 13 | Udyr | +0.76 | 0.76 | 0.00 |  |
| 14 | Vladimir | +0.73 | 0.82 | 0.09 |  |
| 15 | Jax | +0.71 | 0.71 | 0.00 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 16 | Teemo | +0.71 | 0.71 | 0.00 | blind (Blinding Dart) |
| 17 | Varus | +0.70 | 0.81 | 0.11 |  |
| 18 | Gwen | +0.69 | 0.69 | 0.00 |  |
| 19 | Morgana | +0.67 | 0.67 | 0.00 |  |
| 20 | Master Yi | +0.63 | 0.86 | 0.23 |  |
| 21 | Nilah | +0.62 | 0.62 | 0.00 |  |
| 22 | Lulu | +0.60 | 0.60 | 0.00 |  |
| 23 | Camille | +0.59 | 0.59 | 0.00 |  |
| 24 | Rek'Sai | +0.59 | 0.59 | 0.00 |  |
| 25 | Evelynn | +0.57 | 0.57 | 0.00 |  |
| 26 | Shaco | +0.57 | 0.57 | 0.00 |  |
| 27 | Zed | +0.56 | 0.56 | 0.00 |  |
| 28 | Rengar | +0.54 | 0.54 | 0.00 |  |
| 29 | Kayle | +0.52 | 0.52 | 0.00 |  |
| 30 | Vex | +0.51 | 0.51 | 0.00 |  |
| 31 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 32 | Poppy | +0.47 | 0.67 | 0.20 | dash stop (Steadfast Presence) |
| 33 | Gangplank | +0.47 | 0.47 | 0.00 |  |
| 34 | Viktor | +0.46 | 0.46 | 0.00 |  |
| 35 | Jinx | +0.45 | 0.45 | 0.00 |  |
| 36 | Kled | +0.43 | 0.43 | 0.00 |  |
| 37 | Hwei | +0.42 | 0.42 | 0.00 |  |
| 38 | Veigar | +0.42 | 0.42 | 0.00 |  |
| 39 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 40 | Aphelios | +0.40 | 0.40 | 0.00 |  |
| 41 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 42 | Malzahar | +0.38 | 0.78 | 0.40 |  |
| 43 | Milio | +0.38 | 0.38 | 0.00 |  |
| 44 | Olaf | +0.37 | 0.37 | 0.00 |  |
| 45 | Zaahen | +0.37 | 0.37 | 0.00 |  |
| 46 | Katarina | +0.35 | 0.63 | 0.28 |  |
| 47 | Malphite | +0.32 | 0.32 | 0.00 |  |
| 48 | Alistar | +0.30 | 0.30 | 0.00 |  |
| 49 | Yone | +0.30 | 0.30 | 0.00 |  |
| 50 | Garen | +0.29 | 0.29 | 0.00 |  |
| 51 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 52 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 53 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 54 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 55 | Xin Zhao | +0.28 | 0.28 | 0.00 |  |
| 56 | Heimerdinger | +0.27 | 0.27 | 0.00 |  |
| 57 | Sona | +0.27 | 0.27 | 0.00 |  |
| 58 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 59 | Shen | +0.25 | 0.70 | 0.45 | attack block (Spirit's Refuge) |
| 60 | Sion | +0.24 | 0.39 | 0.15 |  |
| 61 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 62 | Draven | +0.24 | 0.24 | 0.00 |  |
| 63 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 64 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 65 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 66 | Amumu | +0.23 | 0.23 | 0.00 |  |
| 67 | Elise | +0.22 | 0.22 | 0.00 |  |
| 68 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 69 | Senna | +0.22 | 0.22 | 0.00 |  |
| 70 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 71 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 72 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 73 | Gnar | +0.21 | 0.21 | 0.00 |  |
| 74 | Corki | +0.20 | 0.20 | 0.00 |  |
| 75 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 76 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 77 | Lux | +0.19 | 0.19 | 0.00 |  |
| 78 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 79 | Samira | +0.19 | 0.19 | 0.00 |  |
| 80 | Mel | +0.18 | 0.18 | 0.00 |  |
| 81 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 82 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 83 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 84 | Azir | +0.17 | 0.17 | 0.00 |  |
| 85 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 86 | Orianna | +0.17 | 0.17 | 0.00 |  |
| 87 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 88 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 89 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 90 | Annie | +0.15 | 0.15 | 0.00 |  |
| 91 | Brand | +0.15 | 0.15 | 0.00 |  |
| 92 | Graves | +0.15 | 0.15 | 0.00 |  |
| 93 | Nami | +0.15 | 0.15 | 0.00 |  |
| 94 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 95 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 96 | Karma | +0.14 | 0.14 | 0.00 |  |
| 97 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 98 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 99 | Swain | +0.13 | 0.13 | 0.00 |  |
| 100 | Kayn | +0.12 | 0.57 | 0.45 |  |
| 101 | Thresh | +0.12 | 0.12 | 0.00 |  |
| 102 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 103 | Urgot | +0.09 | 0.09 | 0.00 |  |
| 104 | Rammus | +0.08 | 0.38 | 0.30 |  |
| 105 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 106 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 107 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 108 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 109 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 110 | Sett | +0.07 | 0.07 | 0.00 |  |
| 111 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 112 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 113 | Aurelion Sol | +0.06 | 0.15 | 0.09 |  |
| 114 | Lillia | +0.06 | 0.06 | 0.00 |  |
| 115 | Quinn | +0.04 | 0.24 | 0.20 |  |
| 116 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 117 | Akali | 0.00 | 0.00 | 0.00 |  |
| 118 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 119 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 120 | Braum | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 127 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 128 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 129 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 130 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 131 | Leona | 0.00 | 0.00 | 0.00 |  |
| 132 | Locke | 0.00 | 0.00 | 0.00 |  |
| 133 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 134 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 135 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 136 | Rell | 0.00 | 0.00 | 0.00 |  |
| 137 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 138 | Riven | 0.00 | 0.00 | 0.00 |  |
| 139 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 140 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 141 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 142 | Talon | 0.00 | 0.00 | 0.00 |  |
| 143 | Taric | 0.00 | 0.00 | 0.00 |  |
| 144 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 145 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 146 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 147 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 148 | Ivern | -0.03 | 0.12 | 0.15 |  |
| 149 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 150 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 151 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 152 | Akshan | -0.07 | 0.21 | 0.28 |  |
| 153 | Twisted Fate | -0.08 | 0.27 | 0.35 |  |
| 154 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 155 | Vel'Koz | -0.11 | 0.17 | 0.28 |  |
| 156 | Warwick | -0.14 | 0.53 | 0.67 |  |
| 157 | Janna | -0.16 | 0.24 | 0.40 |  |
| 158 | Xerath | -0.16 | 0.17 | 0.33 |  |
| 159 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 160 | Pantheon | -0.17 | 0.34 | 0.51 |  |
| 161 | Nunu & Willump | -0.17 | 0.32 | 0.49 |  |
| 162 | Gragas | -0.17 | 0.00 | 0.17 |  |
| 163 | Viego | -0.18 | 0.07 | 0.25 |  |
| 164 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 165 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 166 | Zac | -0.23 | 0.27 | 0.50 |  |
| 167 | Taliyah | -0.31 | 0.17 | 0.48 |  |
| 168 | Fiddlesticks | -0.35 | 0.12 | 0.47 |  |
| 169 | Vi | -0.36 | 0.07 | 0.43 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
