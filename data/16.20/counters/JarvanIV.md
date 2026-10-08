# Counters to Jarvan IV (patch 26.20)

Every champion ranked by what its kit does against Jarvan IV's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jarvan IV's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> JarvanIV` for the full ledger of a matchup, with sources.

## Top 10

### 1. Udyr (net +1.43)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Jarvan IV's Cataclysm (airborne). Immune for 1.5 s, long enough to use ahead of Cataclysm. (Udyr E Blazing Stampede → Jarvan IV R Cataclysm)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Jarvan IV's Dragon Strike (airborne). Immune for 1.5 s, long enough to use ahead of Dragon Strike. (Udyr E Blazing Stampede → Jarvan IV Q Dragon Strike)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Jarvan IV's Golden Aegis (slow). Immune for 1.5 s, long enough to use ahead of Golden Aegis. (Udyr E Blazing Stampede → Jarvan IV W Golden Aegis)

### 2. Fiora (net +1.42)

- **1.10** parry: Riposte parries Jarvan IV's Cataclysm and stuns back. Parry for 0.75 s; Cataclysm takes 1857.14 s to land, enough to react. Negating Cataclysm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jarvan IV R Cataclysm)
- **0.60** parry: Riposte parries Jarvan IV's Dragon Strike and stuns back. Parry for 0.75 s; Dragon Strike takes 0.4 s to land, enough to react. Negating Dragon Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jarvan IV Q Dragon Strike)
- **0.09** attack speed slow: Riposte cuts Jarvan IV's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Jarvan IV basic attacks)

### 3. Elise (net +1.39)

- **1.00** untargetable: Rappel makes Elise untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 0.6 s; Cataclysm takes 1857.14 s to land, enough to react. (Elise E Rappel → Jarvan IV R Cataclysm)
- **0.48** untargetable: Rappel makes Elise untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 0.6 s; Dragon Strike takes 0.4 s to land, enough to react. (Elise E Rappel → Jarvan IV Q Dragon Strike)
- **0.15** range: Elise's basic attacks reach 375 units farther than Jarvan IV's (550 vs 175 attack range). Jarvan IV closes the gap with Demacian Standard, Dragon Strike, Cataclysm. (Elise basic attacks → Jarvan IV basic attacks)

### 4. Morgana (net +1.35)

- **1.00** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Cataclysm (airborne). Immune for 5 s, long enough to use ahead of Cataclysm. (Morgana E Black Shield → Jarvan IV R Cataclysm)
- **0.50** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Dragon Strike (airborne). Immune for 5 s, long enough to use ahead of Dragon Strike. (Morgana E Black Shield → Jarvan IV Q Dragon Strike)
- **0.08** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Golden Aegis (slow). Immune for 5 s, long enough to use ahead of Golden Aegis. (Morgana E Black Shield → Jarvan IV W Golden Aegis)

### 5. Aurora (net +1.33)

- **0.94** untargetable: Between Worlds makes Aurora untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 0.4 s; Cataclysm takes 1857.14 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jarvan IV R Cataclysm)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 0.4 s; Dragon Strike takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jarvan IV Q Dragon Strike)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Jarvan IV's Cataclysm (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Jarvan IV R Cataclysm)

### 6. Warwick (net +1.31)

- **1.00** cc immunity: Infinite Duress makes Warwick immune to Jarvan IV's Cataclysm (airborne). Immune for ?; Cataclysm takes 1857.14 s to land, enough to react. (Warwick R Infinite Duress → Jarvan IV R Cataclysm)
- **0.36** cc immunity: Infinite Duress makes Warwick immune to Jarvan IV's Dragon Strike (airborne). Immune for ?; Dragon Strike takes 0.4 s to land, enough to react. (Warwick R Infinite Duress → Jarvan IV Q Dragon Strike)
- **0.20** cc immunity: Jaws of the Beast is displacement immune, ignoring Jarvan IV's Cataclysm (airborne) during it. Only during Jaws of the Beast. (Warwick Q Jaws of the Beast → Jarvan IV R Cataclysm)
- Watch out: Cataclysm's airborne interrupts Warwick's Jaws of the Beast (movement channel).

### 7. Lissandra (net +1.29)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2.5 s, long enough to use ahead of Cataclysm. (Lissandra R Frozen Tomb → Jarvan IV R Cataclysm)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2.5 s, long enough to use ahead of Dragon Strike. (Lissandra R Frozen Tomb → Jarvan IV Q Dragon Strike)
- **0.18** dash stop: Frozen Tomb's knockdown can stop Jarvan IV's Dragon Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Jarvan IV Q Dragon Strike)
- Watch out: Cataclysm is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

### 8. Xayah (net +1.29)

- **0.94** untargetable: Featherstorm makes Xayah untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 1.5 s, long enough to use ahead of Cataclysm. (Xayah R Featherstorm → Jarvan IV R Cataclysm)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 1.5 s, long enough to use ahead of Dragon Strike. (Xayah R Featherstorm → Jarvan IV Q Dragon Strike)
- **0.17** range: Xayah's basic attacks reach 350 units farther than Jarvan IV's (525 vs 175 attack range). Jarvan IV closes the gap with Demacian Standard, Dragon Strike, Cataclysm. (Xayah basic attacks → Jarvan IV basic attacks)

### 9. Vladimir (net +1.28)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2 s, long enough to use ahead of Cataclysm. (Vladimir W Sanguine Pool → Jarvan IV R Cataclysm)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2 s, long enough to use ahead of Dragon Strike. (Vladimir W Sanguine Pool → Jarvan IV Q Dragon Strike)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Jarvan IV's (450 vs 175 attack range). Jarvan IV closes the gap with Demacian Standard, Dragon Strike, Cataclysm. (Vladimir basic attacks → Jarvan IV basic attacks)
- Watch out: Cataclysm's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 10. Bard (net +1.26)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2.5 s, long enough to use ahead of Cataclysm. (Bard R Tempered Fate → Jarvan IV R Cataclysm)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2.5 s, long enough to use ahead of Dragon Strike. (Bard R Tempered Fate → Jarvan IV Q Dragon Strike)
- **0.16** range: Bard's basic attacks reach 325 units farther than Jarvan IV's (500 vs 175 attack range). Jarvan IV closes the gap with Demacian Standard, Dragon Strike, Cataclysm. (Bard basic attacks → Jarvan IV basic attacks)
- Watch out: Cataclysm is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.43 | 1.43 | 0.00 |  |
| 2 | Fiora | +1.42 | 1.42 | 0.00 |  |
| 3 | Elise | +1.39 | 1.39 | 0.00 |  |
| 4 | Morgana | +1.35 | 1.35 | 0.00 |  |
| 5 | Aurora | +1.33 | 1.33 | 0.00 |  |
| 6 | Warwick | +1.31 | 1.52 | 0.21 |  |
| 7 | Lissandra | +1.29 | 1.34 | 0.05 |  |
| 8 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 9 | Vladimir | +1.28 | 1.33 | 0.05 |  |
| 10 | Bard | +1.26 | 1.34 | 0.08 |  |
| 11 | Maokai | +1.24 | 1.31 | 0.07 |  |
| 12 | Gwen | +1.24 | 1.24 | 0.00 |  |
| 13 | Master Yi | +1.20 | 1.31 | 0.11 |  |
| 14 | Ekko | +1.19 | 1.19 | 0.00 |  |
| 15 | Olaf | +1.19 | 1.19 | 0.00 |  |
| 16 | Evelynn | +1.18 | 1.18 | 0.00 |  |
| 17 | Shaco | +1.18 | 1.18 | 0.00 |  |
| 18 | Yuumi | +1.15 | 1.53 | 0.38 |  |
| 19 | Zed | +1.12 | 1.12 | 0.00 |  |
| 20 | Camille | +1.10 | 1.25 | 0.15 |  |
| 21 | Rek'Sai | +1.09 | 1.25 | 0.16 |  |
| 22 | Nocturne | +1.09 | 1.09 | 0.00 |  |
| 23 | Rengar | +1.07 | 1.07 | 0.00 |  |
| 24 | Sion | +1.06 | 1.20 | 0.14 |  |
| 25 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 26 | Zaahen | +1.01 | 1.19 | 0.18 |  |
| 27 | Sivir | +0.94 | 0.94 | 0.00 |  |
| 28 | Kled | +0.87 | 1.11 | 0.24 |  |
| 29 | Alistar | +0.83 | 0.95 | 0.12 |  |
| 30 | Kalista | +0.78 | 0.97 | 0.19 |  |
| 31 | Kayle | +0.77 | 0.77 | 0.00 |  |
| 32 | Kayn | +0.73 | 1.18 | 0.45 |  |
| 33 | Kindred | +0.72 | 0.72 | 0.00 |  |
| 34 | Vex | +0.71 | 0.74 | 0.03 |  |
| 35 | Malzahar | +0.64 | 1.04 | 0.40 |  |
| 36 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 37 | Cassiopeia | +0.58 | 0.58 | 0.00 | grounding (Miasma) |
| 38 | Pantheon | +0.57 | 0.62 | 0.05 |  |
| 39 | Taric | +0.52 | 0.52 | 0.00 |  |
| 40 | Jinx | +0.49 | 0.53 | 0.04 |  |
| 41 | Viktor | +0.46 | 0.50 | 0.04 |  |
| 42 | Hwei | +0.44 | 0.51 | 0.07 |  |
| 43 | Lulu | +0.43 | 0.51 | 0.08 |  |
| 44 | Ahri | +0.43 | 0.47 | 0.04 |  |
| 45 | Singed | +0.42 | 0.49 | 0.07 | grounding (Mega Adhesive) |
| 46 | Veigar | +0.42 | 0.46 | 0.04 |  |
| 47 | K'Sante | +0.39 | 0.56 | 0.17 |  |
| 48 | Jax | +0.38 | 0.38 | 0.00 |  |
| 49 | Xin Zhao | +0.37 | 0.55 | 0.18 |  |
| 50 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 51 | Corki | +0.35 | 0.42 | 0.07 |  |
| 52 | Malphite | +0.32 | 0.52 | 0.20 |  |
| 53 | Hecarim | +0.30 | 0.30 | 0.00 |  |
| 54 | Poppy | +0.28 | 0.58 | 0.30 | dash stop (Steadfast Presence) |
| 55 | Illaoi | +0.28 | 0.28 | 0.00 |  |
| 56 | Shyvana | +0.28 | 0.28 | 0.00 |  |
| 57 | Volibear | +0.28 | 0.28 | 0.00 |  |
| 58 | Yone | +0.26 | 0.51 | 0.25 |  |
| 59 | Nilah | +0.25 | 0.33 | 0.08 |  |
| 60 | Aphelios | +0.23 | 0.23 | 0.00 |  |
| 61 | Sett | +0.21 | 0.28 | 0.07 |  |
| 62 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 63 | Twitch | +0.20 | 0.20 | 0.00 |  |
| 64 | Sona | +0.19 | 0.19 | 0.00 |  |
| 65 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 66 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 67 | Amumu | +0.17 | 0.22 | 0.05 |  |
| 68 | Kai'Sa | +0.17 | 0.17 | 0.00 |  |
| 69 | Milio | +0.16 | 0.23 | 0.07 |  |
| 70 | Senna | +0.16 | 0.16 | 0.00 |  |
| 71 | Rammus | +0.15 | 0.36 | 0.21 |  |
| 72 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 73 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 74 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 75 | Heimerdinger | +0.14 | 0.14 | 0.00 |  |
| 76 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 77 | Lux | +0.14 | 0.14 | 0.00 |  |
| 78 | Zac | +0.13 | 0.44 | 0.31 |  |
| 79 | Vayne | +0.13 | 0.20 | 0.07 |  |
| 80 | Mel | +0.13 | 0.13 | 0.00 |  |
| 81 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 82 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 83 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 84 | Ornn | +0.12 | 0.28 | 0.16 |  |
| 85 | Viego | +0.12 | 0.28 | 0.16 |  |
| 86 | Garen | +0.12 | 0.12 | 0.00 |  |
| 87 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 88 | Renata Glasc | +0.11 | 0.18 | 0.07 |  |
| 89 | Annie | +0.11 | 0.11 | 0.00 |  |
| 90 | Tristana | +0.10 | 0.18 | 0.08 |  |
| 91 | Draven | +0.10 | 0.17 | 0.07 |  |
| 92 | Brand | +0.10 | 0.10 | 0.00 |  |
| 93 | Graves | +0.10 | 0.10 | 0.00 |  |
| 94 | Karma | +0.10 | 0.10 | 0.00 |  |
| 95 | LeBlanc | +0.10 | 0.10 | 0.00 |  |
| 96 | Zoe | +0.08 | 0.15 | 0.07 |  |
| 97 | Varus | +0.08 | 0.13 | 0.05 |  |
| 98 | Gnar | +0.06 | 0.14 | 0.08 |  |
| 99 | Jayce | +0.06 | 0.13 | 0.07 |  |
| 100 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 101 | Samira | +0.04 | 0.13 | 0.09 |  |
| 102 | Orianna | +0.04 | 0.12 | 0.08 |  |
| 103 | Syndra | +0.03 | 0.10 | 0.07 |  |
| 104 | Neeko | +0.02 | 0.10 | 0.08 |  |
| 105 | Swain | +0.02 | 0.09 | 0.07 |  |
| 106 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 107 | Akali | 0.00 | 0.00 | 0.00 |  |
| 108 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 109 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 110 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 111 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 112 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 113 | Leona | 0.00 | 0.00 | 0.00 |  |
| 114 | Locke | 0.00 | 0.00 | 0.00 |  |
| 115 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 116 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 117 | Talon | 0.00 | 0.00 | 0.00 |  |
| 118 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 119 | Quinn | -0.02 | 0.17 | 0.19 |  |
| 120 | Anivia | -0.02 | 0.12 | 0.14 |  |
| 121 | Aurelion Sol | -0.02 | 0.10 | 0.12 |  |
| 122 | Urgot | -0.03 | 0.06 | 0.09 |  |
| 123 | Ziggs | -0.04 | 0.13 | 0.17 |  |
| 124 | Azir | -0.04 | 0.12 | 0.16 |  |
| 125 | Zyra | -0.04 | 0.12 | 0.16 |  |
| 126 | Lillia | -0.04 | 0.04 | 0.08 |  |
| 127 | Mordekaiser | -0.05 | 0.09 | 0.14 |  |
| 128 | Thresh | -0.05 | 0.08 | 0.13 |  |
| 129 | Briar | -0.05 | 0.00 | 0.05 |  |
| 130 | Vi | -0.07 | 0.28 | 0.35 |  |
| 131 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 132 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 133 | Darius | -0.07 | 0.00 | 0.07 |  |
| 134 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 135 | Nami | -0.08 | 0.10 | 0.18 |  |
| 136 | Braum | -0.08 | 0.00 | 0.08 |  |
| 137 | Diana | -0.08 | 0.00 | 0.08 |  |
| 138 | Fizz | -0.08 | 0.00 | 0.08 |  |
| 139 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 140 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 141 | Shen | -0.09 | 0.36 | 0.45 |  |
| 142 | Akshan | -0.09 | 0.15 | 0.24 |  |
| 143 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 144 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 145 | Lucian | -0.12 | 0.16 | 0.28 |  |
| 146 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 147 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 148 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 149 | Yorick | -0.14 | 0.00 | 0.14 |  |
| 150 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 151 | Rakan | -0.15 | 0.05 | 0.20 |  |
| 152 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 153 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 154 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 155 | Vel'Koz | -0.18 | 0.12 | 0.30 |  |
| 156 | Blitzcrank | -0.18 | 0.00 | 0.18 |  |
| 157 | Xerath | -0.19 | 0.12 | 0.31 |  |
| 158 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 159 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 160 | Riven | -0.20 | 0.00 | 0.20 |  |
| 161 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 162 | Gragas | -0.24 | 0.00 | 0.24 |  |
| 163 | Rell | -0.24 | 0.00 | 0.24 |  |
| 164 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 165 | Nunu & Willump | -0.25 | 0.13 | 0.38 |  |
| 166 | Yasuo | -0.28 | 0.00 | 0.28 |  |
| 167 | Fiddlesticks | -0.30 | 0.08 | 0.38 |  |
| 168 | Galio | -0.32 | 0.00 | 0.32 |  |
| 169 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 170 | Janna | -0.35 | 0.17 | 0.52 |  |
| 171 | Naafiri | -0.42 | 0.00 | 0.42 |  |
| 172 | Taliyah | -0.50 | 0.12 | 0.62 |  |
