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
- **0.20** range: Yuumi's basic attacks reach 275 units farther than Bel'Veth's (425 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Yuumi basic attacks → Bel'Veth basic attacks)
- Watch out: Above and Below's airborne interrupts Yuumi's Final Chapter (normal channel).

### 3. Sivir (net +0.97)

- **0.47** spell shield: Spell Shield's spell shield blocks Bel'Veth's Above and Below. Spell shield for 1.5 s, long enough to use ahead of Above and Below. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bel'Veth W Above and Below)
- **0.43** spell shield: Spell Shield's spell shield blocks Bel'Veth's Endless Banquet. Spell shield for 1.5 s, long enough to use ahead of Endless Banquet. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Bel'Veth R Endless Banquet)
- **0.29** range: Sivir's basic attacks reach 350 units farther than Bel'Veth's (500 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Sivir basic attacks → Bel'Veth basic attacks)

### 4. Elise (net +0.90)

- **0.47** untargetable: Rappel makes Elise untargetable, dodging Bel'Veth's Above and Below. Untargetable for 0.6 s; Above and Below takes 0.5 s to land, enough to react. (Elise E Rappel → Bel'Veth W Above and Below)
- **0.43** untargetable: Rappel makes Elise untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 0.6 s; Endless Banquet takes 1 s to land, enough to react. (Elise E Rappel → Bel'Veth R Endless Banquet)
- **0.22** range: Elise's basic attacks reach 400 units farther than Bel'Veth's (550 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Elise basic attacks → Bel'Veth basic attacks)

### 5. Nocturne (net +0.86)

- **0.56** spell shield: Shroud of Darkness's spell shield blocks Bel'Veth's Above and Below. Spell shield for 1.5 s, long enough to use ahead of Above and Below. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Bel'Veth W Above and Below)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Bel'Veth's Endless Banquet. Spell shield for 1.5 s, long enough to use ahead of Endless Banquet. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Bel'Veth R Endless Banquet)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Bel'Veth's Above and Below (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Bel'Veth W Above and Below)

### 6. Cassiopeia (net +0.85)

- **0.48** grounding: Miasma grounds Bel'Veth, who then can't cast Endless Banquet. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Bel'Veth R Endless Banquet)
- **0.43** grounding: Miasma grounds Bel'Veth, who then can't cast Void Surge. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Bel'Veth Q Void Surge)
- **0.15** range: Cassiopeia's basic attacks reach 400 units farther than Bel'Veth's (550 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Cassiopeia basic attacks → Bel'Veth basic attacks)

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
- **0.24** range: Xayah's basic attacks reach 375 units farther than Bel'Veth's (525 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Xayah basic attacks → Bel'Veth basic attacks)

### 10. Bard (net +0.79)

- **0.41** untargetable: Tempered Fate makes Bard untargetable, dodging Bel'Veth's Endless Banquet. Untargetable for 2.5 s, long enough to use ahead of Endless Banquet. (Bard R Tempered Fate → Bel'Veth R Endless Banquet)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Bel'Veth's Above and Below. Untargetable for 2.5 s, long enough to use ahead of Above and Below. (Bard R Tempered Fate → Bel'Veth W Above and Below)
- **0.22** range: Bard's basic attacks reach 350 units farther than Bel'Veth's (500 vs 150 attack range). Bel'Veth closes the gap with Void Surge, Endless Banquet. (Bard basic attacks → Bel'Veth basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.65 | 1.65 | 0.00 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 2 | Yuumi | +1.13 | 1.55 | 0.42 |  |
| 3 | Sivir | +0.97 | 0.97 | 0.00 |  |
| 4 | Elise | +0.90 | 0.90 | 0.00 |  |
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
| 24 | Ekko | +0.59 | 0.59 | 0.00 |  |
| 25 | Rek'Sai | +0.59 | 0.59 | 0.00 |  |
| 26 | Evelynn | +0.57 | 0.57 | 0.00 |  |
| 27 | Shaco | +0.57 | 0.57 | 0.00 |  |
| 28 | Kindred | +0.56 | 0.56 | 0.00 |  |
| 29 | Zed | +0.56 | 0.56 | 0.00 |  |
| 30 | Rengar | +0.54 | 0.54 | 0.00 |  |
| 31 | Kayle | +0.52 | 0.52 | 0.00 |  |
| 32 | Vex | +0.51 | 0.51 | 0.00 |  |
| 33 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 34 | Poppy | +0.47 | 0.67 | 0.20 | dash stop (Steadfast Presence) |
| 35 | Gangplank | +0.47 | 0.47 | 0.00 |  |
| 36 | Viktor | +0.46 | 0.46 | 0.00 |  |
| 37 | Jinx | +0.45 | 0.45 | 0.00 |  |
| 38 | Kled | +0.43 | 0.43 | 0.00 |  |
| 39 | Hwei | +0.42 | 0.42 | 0.00 |  |
| 40 | Veigar | +0.42 | 0.42 | 0.00 |  |
| 41 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 42 | Aphelios | +0.40 | 0.40 | 0.00 |  |
| 43 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 44 | Malzahar | +0.38 | 0.78 | 0.40 |  |
| 45 | Milio | +0.38 | 0.38 | 0.00 |  |
| 46 | Olaf | +0.37 | 0.37 | 0.00 |  |
| 47 | Zaahen | +0.37 | 0.37 | 0.00 |  |
| 48 | Katarina | +0.35 | 0.63 | 0.28 |  |
| 49 | Malphite | +0.32 | 0.32 | 0.00 |  |
| 50 | Alistar | +0.30 | 0.30 | 0.00 |  |
| 51 | Yone | +0.30 | 0.30 | 0.00 |  |
| 52 | Garen | +0.29 | 0.29 | 0.00 |  |
| 53 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 54 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 55 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 56 | Taric | +0.28 | 0.28 | 0.00 |  |
| 57 | Xin Zhao | +0.28 | 0.28 | 0.00 |  |
| 58 | Corki | +0.27 | 0.27 | 0.00 |  |
| 59 | Heimerdinger | +0.27 | 0.27 | 0.00 |  |
| 60 | Sona | +0.27 | 0.27 | 0.00 |  |
| 61 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 62 | Shen | +0.25 | 0.70 | 0.45 | attack block (Spirit's Refuge) |
| 63 | Sion | +0.24 | 0.39 | 0.15 |  |
| 64 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 65 | Draven | +0.24 | 0.24 | 0.00 |  |
| 66 | Kai'Sa | +0.24 | 0.24 | 0.00 |  |
| 67 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 68 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 69 | Pantheon | +0.23 | 0.34 | 0.11 |  |
| 70 | Amumu | +0.23 | 0.23 | 0.00 |  |
| 71 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 72 | Senna | +0.22 | 0.22 | 0.00 |  |
| 73 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 74 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 75 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 76 | Gnar | +0.21 | 0.21 | 0.00 |  |
| 77 | Warwick | +0.19 | 0.53 | 0.34 |  |
| 78 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 79 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 80 | Lux | +0.19 | 0.19 | 0.00 |  |
| 81 | Nidalee | +0.19 | 0.19 | 0.00 |  |
| 82 | Samira | +0.19 | 0.19 | 0.00 |  |
| 83 | Mel | +0.18 | 0.18 | 0.00 |  |
| 84 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 85 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 86 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 87 | Azir | +0.17 | 0.17 | 0.00 |  |
| 88 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 89 | Orianna | +0.17 | 0.17 | 0.00 |  |
| 90 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 91 | Skarner | +0.16 | 0.16 | 0.00 |  |
| 92 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 93 | Annie | +0.15 | 0.15 | 0.00 |  |
| 94 | Brand | +0.15 | 0.15 | 0.00 |  |
| 95 | Graves | +0.15 | 0.15 | 0.00 |  |
| 96 | Nami | +0.15 | 0.15 | 0.00 |  |
| 97 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 98 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 99 | Karma | +0.14 | 0.14 | 0.00 |  |
| 100 | K'Sante | +0.14 | 0.14 | 0.00 |  |
| 101 | LeBlanc | +0.14 | 0.14 | 0.00 |  |
| 102 | Swain | +0.13 | 0.13 | 0.00 |  |
| 103 | Kayn | +0.12 | 0.57 | 0.45 |  |
| 104 | Thresh | +0.12 | 0.12 | 0.00 |  |
| 105 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 106 | Urgot | +0.09 | 0.09 | 0.00 |  |
| 107 | Rammus | +0.08 | 0.38 | 0.30 |  |
| 108 | Hecarim | +0.07 | 0.07 | 0.00 |  |
| 109 | Illaoi | +0.07 | 0.07 | 0.00 |  |
| 110 | Jarvan IV | +0.07 | 0.07 | 0.00 |  |
| 111 | Ornn | +0.07 | 0.07 | 0.00 |  |
| 112 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 113 | Sett | +0.07 | 0.07 | 0.00 |  |
| 114 | Shyvana | +0.07 | 0.07 | 0.00 |  |
| 115 | Volibear | +0.07 | 0.07 | 0.00 |  |
| 116 | Aurelion Sol | +0.06 | 0.15 | 0.09 |  |
| 117 | Lillia | +0.06 | 0.06 | 0.00 |  |
| 118 | Quinn | +0.04 | 0.24 | 0.20 |  |
| 119 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 120 | Akali | 0.00 | 0.00 | 0.00 |  |
| 121 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 122 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 123 | Braum | 0.00 | 0.00 | 0.00 |  |
| 124 | Briar | 0.00 | 0.00 | 0.00 |  |
| 125 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 126 | Darius | 0.00 | 0.00 | 0.00 |  |
| 127 | Diana | 0.00 | 0.00 | 0.00 |  |
| 128 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 129 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 130 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 131 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 132 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 133 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 134 | Leona | 0.00 | 0.00 | 0.00 |  |
| 135 | Locke | 0.00 | 0.00 | 0.00 |  |
| 136 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 137 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 138 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 139 | Rell | 0.00 | 0.00 | 0.00 |  |
| 140 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 141 | Riven | 0.00 | 0.00 | 0.00 |  |
| 142 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 143 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 144 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 145 | Talon | 0.00 | 0.00 | 0.00 |  |
| 146 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 147 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 148 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 149 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 150 | Ivern | -0.03 | 0.12 | 0.15 |  |
| 151 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 152 | Lucian | -0.06 | 0.22 | 0.28 |  |
| 153 | Miss Fortune | -0.06 | 0.22 | 0.28 |  |
| 154 | Akshan | -0.07 | 0.21 | 0.28 |  |
| 155 | Twisted Fate | -0.08 | 0.27 | 0.35 |  |
| 156 | Jhin | -0.10 | 0.18 | 0.28 |  |
| 157 | Vel'Koz | -0.11 | 0.17 | 0.28 |  |
| 158 | Janna | -0.16 | 0.24 | 0.40 |  |
| 159 | Xerath | -0.16 | 0.17 | 0.33 |  |
| 160 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 161 | Nunu & Willump | -0.17 | 0.32 | 0.49 |  |
| 162 | Gragas | -0.17 | 0.00 | 0.17 |  |
| 163 | Viego | -0.18 | 0.07 | 0.25 |  |
| 164 | Galio | -0.18 | 0.00 | 0.18 |  |
| 165 | Pyke | -0.18 | 0.00 | 0.18 |  |
| 166 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 167 | Zac | -0.23 | 0.27 | 0.50 |  |
| 168 | Taliyah | -0.31 | 0.17 | 0.48 |  |
| 169 | Fiddlesticks | -0.35 | 0.12 | 0.47 |  |
| 170 | Vi | -0.36 | 0.07 | 0.43 |  |
| 171 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 172 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
