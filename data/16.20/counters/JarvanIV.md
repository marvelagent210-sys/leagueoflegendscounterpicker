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

### 2. Morgana (net +1.35)

- **1.00** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Cataclysm (airborne). Immune for 5 s, long enough to use ahead of Cataclysm. (Morgana E Black Shield → Jarvan IV R Cataclysm)
- **0.50** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Dragon Strike (airborne). Immune for 5 s, long enough to use ahead of Dragon Strike. (Morgana E Black Shield → Jarvan IV Q Dragon Strike)
- **0.08** cc immunity: Black Shield makes Morgana immune to Jarvan IV's Golden Aegis (slow). Immune for 5 s, long enough to use ahead of Golden Aegis. (Morgana E Black Shield → Jarvan IV W Golden Aegis)

### 3. Aurora (net +1.33)

- **0.94** untargetable: Between Worlds makes Aurora untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 0.4 s; Cataclysm takes 1857.14 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jarvan IV R Cataclysm)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 0.4 s; Dragon Strike takes 0.4 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jarvan IV Q Dragon Strike)
- **0.20** cc immunity: Between Worlds is displacement immune, ignoring Jarvan IV's Cataclysm (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Jarvan IV R Cataclysm)

### 4. Fiora (net +1.32)

- **1.00** parry: Riposte parries Jarvan IV's Cataclysm and stuns back. Parry for 0.75 s; Cataclysm takes 1857.14 s to land, enough to react. Negating Cataclysm's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jarvan IV R Cataclysm)
- **0.60** parry: Riposte parries Jarvan IV's Dragon Strike and stuns back. Parry for 0.75 s; Dragon Strike takes 0.4 s to land, enough to react. Negating Dragon Strike's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jarvan IV Q Dragon Strike)
- **0.09** attack speed slow: Riposte cuts Jarvan IV's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Jarvan IV basic attacks)

### 5. Lissandra (net +1.29)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2.5 s, long enough to use ahead of Cataclysm. (Lissandra R Frozen Tomb → Jarvan IV R Cataclysm)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2.5 s, long enough to use ahead of Dragon Strike. (Lissandra R Frozen Tomb → Jarvan IV Q Dragon Strike)
- **0.18** dash stop: Frozen Tomb's knockdown can stop Jarvan IV's Dragon Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Jarvan IV Q Dragon Strike)
- Watch out: Cataclysm is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

### 6. Xayah (net +1.29)

- **0.94** untargetable: Featherstorm makes Xayah untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 1.5 s, long enough to use ahead of Cataclysm. (Xayah R Featherstorm → Jarvan IV R Cataclysm)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 1.5 s, long enough to use ahead of Dragon Strike. (Xayah R Featherstorm → Jarvan IV Q Dragon Strike)
- **0.17** range: Xayah's basic attacks reach 350 units farther than Jarvan IV's (525 vs 175 attack range). Jarvan IV closes the gap with Cataclysm, Demacian Standard, Dragon Strike. (Xayah basic attacks → Jarvan IV basic attacks)

### 7. Vladimir (net +1.28)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2 s, long enough to use ahead of Cataclysm. (Vladimir W Sanguine Pool → Jarvan IV R Cataclysm)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2 s, long enough to use ahead of Dragon Strike. (Vladimir W Sanguine Pool → Jarvan IV Q Dragon Strike)
- **0.08** range: Vladimir's basic attacks reach 275 units farther than Jarvan IV's (450 vs 175 attack range). Jarvan IV closes the gap with Cataclysm, Demacian Standard, Dragon Strike. (Vladimir basic attacks → Jarvan IV basic attacks)
- Watch out: Cataclysm's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 8. Bard (net +1.26)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 2.5 s, long enough to use ahead of Cataclysm. (Bard R Tempered Fate → Jarvan IV R Cataclysm)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 2.5 s, long enough to use ahead of Dragon Strike. (Bard R Tempered Fate → Jarvan IV Q Dragon Strike)
- **0.16** range: Bard's basic attacks reach 325 units farther than Jarvan IV's (500 vs 175 attack range). Jarvan IV closes the gap with Cataclysm, Demacian Standard, Dragon Strike. (Bard basic attacks → Jarvan IV basic attacks)
- Watch out: Cataclysm is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

### 9. Fizz (net +1.26)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 0.75 s; Cataclysm takes 1857.14 s to land, enough to react. (Fizz E Playful → Jarvan IV R Cataclysm)
- **0.68** untargetable: Playful makes Fizz untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 0.75 s; Dragon Strike takes 0.4 s to land, enough to react. (Fizz E Playful → Jarvan IV Q Dragon Strike)
- Watch out: Cataclysm is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

### 10. Maokai (net +1.24)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Jarvan IV's Cataclysm. Untargetable for 1.4 s; Cataclysm takes 1857.14 s to land, enough to react. (Maokai W Twisted Advance → Jarvan IV R Cataclysm)
- **0.61** untargetable: Twisted Advance makes Maokai untargetable, dodging Jarvan IV's Dragon Strike. Untargetable for 1.4 s; Dragon Strike takes 0.4 s to land, enough to react. (Maokai W Twisted Advance → Jarvan IV Q Dragon Strike)
- Watch out: Cataclysm is displacement immune, ignoring Maokai's Bramble Smash (airborne) during it.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Udyr | +1.43 | 1.43 | 0.00 |  |
| 2 | Morgana | +1.35 | 1.35 | 0.00 |  |
| 3 | Aurora | +1.33 | 1.33 | 0.00 |  |
| 4 | Fiora | +1.32 | 1.32 | 0.00 |  |
| 5 | Lissandra | +1.29 | 1.34 | 0.05 |  |
| 6 | Xayah | +1.29 | 1.29 | 0.00 |  |
| 7 | Vladimir | +1.28 | 1.33 | 0.05 |  |
| 8 | Bard | +1.26 | 1.34 | 0.08 |  |
| 9 | Fizz | +1.26 | 1.34 | 0.08 |  |
| 10 | Maokai | +1.24 | 1.31 | 0.07 |  |
| 11 | Gwen | +1.24 | 1.24 | 0.00 |  |
| 12 | Master Yi | +1.20 | 1.31 | 0.11 |  |
| 13 | Olaf | +1.19 | 1.19 | 0.00 |  |
| 14 | Evelynn | +1.18 | 1.18 | 0.00 |  |
| 15 | Shaco | +1.18 | 1.18 | 0.00 |  |
| 16 | Yuumi | +1.15 | 1.53 | 0.38 |  |
| 17 | Zed | +1.12 | 1.12 | 0.00 |  |
| 18 | Camille | +1.10 | 1.25 | 0.15 |  |
| 19 | Rek'Sai | +1.09 | 1.25 | 0.16 |  |
| 20 | Nocturne | +1.09 | 1.09 | 0.00 |  |
| 21 | Rengar | +1.07 | 1.07 | 0.00 |  |
| 22 | Sion | +1.06 | 1.20 | 0.14 |  |
| 23 | Gangplank | +1.03 | 1.03 | 0.00 |  |
| 24 | Zaahen | +1.01 | 1.19 | 0.18 |  |
| 25 | Warwick | +0.98 | 1.52 | 0.54 |  |
| 26 | Sivir | +0.94 | 0.94 | 0.00 |  |
| 27 | Kled | +0.87 | 1.11 | 0.24 |  |
| 28 | Alistar | +0.83 | 0.95 | 0.12 |  |
| 29 | Kalista | +0.78 | 0.97 | 0.19 |  |
| 30 | Kayle | +0.77 | 0.77 | 0.00 |  |
| 31 | Kayn | +0.73 | 1.18 | 0.45 |  |
| 32 | Vex | +0.71 | 0.74 | 0.03 |  |
| 33 | Malzahar | +0.64 | 1.04 | 0.40 |  |
| 34 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 35 | Cassiopeia | +0.58 | 0.58 | 0.00 | grounding (Miasma) |
| 36 | Jinx | +0.49 | 0.53 | 0.04 |  |
| 37 | Viktor | +0.46 | 0.50 | 0.04 |  |
| 38 | Hwei | +0.44 | 0.51 | 0.07 |  |
| 39 | Lulu | +0.43 | 0.51 | 0.08 |  |
| 40 | Ahri | +0.43 | 0.47 | 0.04 |  |
| 41 | Singed | +0.42 | 0.49 | 0.07 | grounding (Mega Adhesive) |
| 42 | Veigar | +0.42 | 0.46 | 0.04 |  |
| 43 | K'Sante | +0.39 | 0.56 | 0.17 |  |
| 44 | Jax | +0.38 | 0.38 | 0.00 |  |
| 45 | Xin Zhao | +0.37 | 0.55 | 0.18 |  |
| 46 | Nasus | +0.36 | 0.36 | 0.00 |  |
| 47 | Malphite | +0.32 | 0.52 | 0.20 |  |
| 48 | Poppy | +0.28 | 0.58 | 0.30 | dash stop (Steadfast Presence) |
| 49 | Illaoi | +0.28 | 0.28 | 0.00 |  |
| 50 | Shyvana | +0.28 | 0.28 | 0.00 |  |
| 51 | Volibear | +0.28 | 0.28 | 0.00 |  |
| 52 | Yone | +0.26 | 0.51 | 0.25 |  |
| 53 | Nilah | +0.25 | 0.33 | 0.08 |  |
| 54 | Aphelios | +0.23 | 0.23 | 0.00 |  |
| 55 | Hecarim | +0.22 | 0.30 | 0.08 |  |
| 56 | Sett | +0.21 | 0.28 | 0.07 |  |
| 57 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 58 | Kindred | +0.20 | 0.20 | 0.00 |  |
| 59 | Twitch | +0.20 | 0.20 | 0.00 |  |
| 60 | Sona | +0.19 | 0.19 | 0.00 |  |
| 61 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 62 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 63 | Amumu | +0.17 | 0.22 | 0.05 |  |
| 64 | Kai'Sa | +0.17 | 0.17 | 0.00 |  |
| 65 | Milio | +0.16 | 0.23 | 0.07 |  |
| 66 | Senna | +0.16 | 0.16 | 0.00 |  |
| 67 | Rammus | +0.15 | 0.36 | 0.21 |  |
| 68 | Elise | +0.15 | 0.15 | 0.00 |  |
| 69 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 70 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 71 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 72 | Pantheon | +0.14 | 0.62 | 0.48 |  |
| 73 | Heimerdinger | +0.14 | 0.14 | 0.00 |  |
| 74 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 75 | Lux | +0.14 | 0.14 | 0.00 |  |
| 76 | Zac | +0.13 | 0.44 | 0.31 |  |
| 77 | Vayne | +0.13 | 0.20 | 0.07 |  |
| 78 | Mel | +0.13 | 0.13 | 0.00 |  |
| 79 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 80 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 81 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 82 | Ornn | +0.12 | 0.28 | 0.16 |  |
| 83 | Viego | +0.12 | 0.28 | 0.16 |  |
| 84 | Garen | +0.12 | 0.12 | 0.00 |  |
| 85 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 86 | Renata Glasc | +0.11 | 0.18 | 0.07 |  |
| 87 | Annie | +0.11 | 0.11 | 0.00 |  |
| 88 | Tristana | +0.10 | 0.18 | 0.08 |  |
| 89 | Draven | +0.10 | 0.17 | 0.07 |  |
| 90 | Brand | +0.10 | 0.10 | 0.00 |  |
| 91 | Graves | +0.10 | 0.10 | 0.00 |  |
| 92 | Karma | +0.10 | 0.10 | 0.00 |  |
| 93 | LeBlanc | +0.10 | 0.10 | 0.00 |  |
| 94 | Zoe | +0.08 | 0.15 | 0.07 |  |
| 95 | Varus | +0.08 | 0.13 | 0.05 |  |
| 96 | Corki | +0.07 | 0.14 | 0.07 |  |
| 97 | Gnar | +0.06 | 0.14 | 0.08 |  |
| 98 | Jayce | +0.06 | 0.13 | 0.07 |  |
| 99 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 100 | Samira | +0.04 | 0.13 | 0.09 |  |
| 101 | Orianna | +0.04 | 0.12 | 0.08 |  |
| 102 | Syndra | +0.03 | 0.10 | 0.07 |  |
| 103 | Neeko | +0.02 | 0.10 | 0.08 |  |
| 104 | Swain | +0.02 | 0.09 | 0.07 |  |
| 105 | Ivern | +0.01 | 0.08 | 0.07 |  |
| 106 | Akali | 0.00 | 0.00 | 0.00 |  |
| 107 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 108 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 109 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 110 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 111 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 112 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 113 | Leona | 0.00 | 0.00 | 0.00 |  |
| 114 | Locke | 0.00 | 0.00 | 0.00 |  |
| 115 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 116 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 117 | Talon | 0.00 | 0.00 | 0.00 |  |
| 118 | Taric | 0.00 | 0.00 | 0.00 |  |
| 119 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 120 | Quinn | -0.02 | 0.17 | 0.19 |  |
| 121 | Anivia | -0.02 | 0.12 | 0.14 |  |
| 122 | Aurelion Sol | -0.02 | 0.10 | 0.12 |  |
| 123 | Urgot | -0.03 | 0.06 | 0.09 |  |
| 124 | Ziggs | -0.04 | 0.13 | 0.17 |  |
| 125 | Azir | -0.04 | 0.12 | 0.16 |  |
| 126 | Zyra | -0.04 | 0.12 | 0.16 |  |
| 127 | Lillia | -0.04 | 0.04 | 0.08 |  |
| 128 | Mordekaiser | -0.05 | 0.09 | 0.14 |  |
| 129 | Thresh | -0.05 | 0.08 | 0.13 |  |
| 130 | Briar | -0.05 | 0.00 | 0.05 |  |
| 131 | Vi | -0.07 | 0.28 | 0.35 |  |
| 132 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 133 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 134 | Darius | -0.07 | 0.00 | 0.07 |  |
| 135 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 136 | Nami | -0.08 | 0.10 | 0.18 |  |
| 137 | Braum | -0.08 | 0.00 | 0.08 |  |
| 138 | Diana | -0.08 | 0.00 | 0.08 |  |
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
| 168 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 169 | Janna | -0.35 | 0.17 | 0.52 |  |
| 170 | Naafiri | -0.42 | 0.00 | 0.42 |  |
| 171 | Taliyah | -0.50 | 0.12 | 0.62 |  |
| 172 | Galio | -0.66 | 0.00 | 0.66 |  |
