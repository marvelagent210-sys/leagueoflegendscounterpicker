# Counters to Naafiri (patch 26.20)

Every champion ranked by what its kit does against Naafiri's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Naafiri's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Naafiri` for the full ledger of a matchup, with sources.

## Top 10

### 1. Singed (net +1.70)

- **0.45** interrupt: Fling's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Fling must land during the channel. (Singed E Fling → Naafiri R Hounds' Pursuit)
- **0.44** grounding: Mega Adhesive grounds Naafiri, who then can't cast Hounds' Pursuit. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Naafiri R Hounds' Pursuit)
- **0.39** grounding: Mega Adhesive grounds Naafiri, who then can't cast Eviscerate. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Naafiri E Eviscerate)

### 2. Elise (net +1.51)

- **0.90** untargetable: Rappel makes Elise untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 0.6 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Elise E Rappel → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Cocoon's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Naafiri R Hounds' Pursuit)
- **0.16** range: Elise's basic attacks reach 425 units farther than Naafiri's (550 vs 125 attack range). Naafiri closes the gap with Eviscerate, Hounds' Pursuit, The Call of the Pack. (Elise basic attacks → Naafiri basic attacks)

### 3. Lissandra (net +1.37)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 2.5 s, long enough to use ahead of Hounds' Pursuit. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)
- **0.45** dash stop: Frozen Tomb's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Frozen Tomb's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)

### 4. Kayn (net +1.35)

- **0.90** untargetable: Umbral Trespass makes Kayn untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 0.25 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Kayn R Umbral Trespass → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Blade's Reach's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Naafiri R Hounds' Pursuit)

### 5. Maokai (net +1.35)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 1.4 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Bramble Smash's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Naafiri R Hounds' Pursuit)

### 6. Rek'Sai (net +1.35)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 1.5 s, long enough to use ahead of Hounds' Pursuit. (Rek'Sai R Void Rush → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Unburrow's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Naafiri R Hounds' Pursuit)

### 7. Bard (net +1.31)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 2.5 s, long enough to use ahead of Hounds' Pursuit. (Bard R Tempered Fate → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Tempered Fate's stasis interrupts Naafiri's Hounds' Pursuit (movement channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Naafiri R Hounds' Pursuit)
- **0.18** range: Bard's basic attacks reach 375 units farther than Naafiri's (500 vs 125 attack range). Naafiri closes the gap with Eviscerate, Hounds' Pursuit, The Call of the Pack. (Bard basic attacks → Naafiri basic attacks)

### 8. Camille (net +1.29)

- **0.84** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 0.5 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Camille R The Hextech Ultimatum → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Wall Dive's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Naafiri R Hounds' Pursuit)

### 9. Evelynn (net +1.27)

- **0.90** untargetable: Last Caress makes Evelynn untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for ?; Hounds' Pursuit takes 0.5 s to land, enough to react. (Evelynn R Last Caress → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Allure's charm interrupts Naafiri's Hounds' Pursuit (movement channel). Allure must land during the channel. (Evelynn W Allure → Naafiri R Hounds' Pursuit)
- Watch out: Hounds' Pursuit reveals Evelynn through Demon Shade's stealth.

### 10. Malzahar (net +1.20)

- **0.45** dash stop: Nether Grasp's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Call of the Void's silence interrupts Naafiri's Hounds' Pursuit (movement channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Naafiri R Hounds' Pursuit)
- **0.18** dash stop: Nether Grasp's knockdown can stop Naafiri's Eviscerate mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. The wiki marks this dash's knockdown interaction as special. (Malzahar R Nether Grasp → Naafiri E Eviscerate)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.70 | 1.70 | 0.00 | grounding (Mega Adhesive) |
| 2 | Elise | +1.51 | 1.51 | 0.00 |  |
| 3 | Lissandra | +1.37 | 1.37 | 0.00 | dash stop (Frozen Tomb) |
| 4 | Kayn | +1.35 | 1.35 | 0.00 |  |
| 5 | Maokai | +1.35 | 1.35 | 0.00 |  |
| 6 | Rek'Sai | +1.35 | 1.35 | 0.00 |  |
| 7 | Bard | +1.31 | 1.31 | 0.00 |  |
| 8 | Camille | +1.29 | 1.29 | 0.00 |  |
| 9 | Evelynn | +1.27 | 1.35 | 0.08 |  |
| 10 | Malzahar | +1.20 | 1.20 | 0.00 | dash stop (Nether Grasp) |
| 11 | Viktor | +1.20 | 1.20 | 0.00 | dash stop (Gravity Field) |
| 12 | Cassiopeia | +1.18 | 1.18 | 0.00 | grounding (Miasma) |
| 13 | Shaco | +1.15 | 1.35 | 0.20 |  |
| 14 | Poppy | +1.13 | 1.13 | 0.00 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 15 | Master Yi | +1.12 | 1.12 | 0.00 |  |
| 16 | Zac | +1.09 | 1.09 | 0.00 | dash stop (Stretching Strikes) |
| 17 | Warwick | +1.06 | 1.06 | 0.00 | dash stop (Infinite Duress) |
| 18 | Yuumi | +1.06 | 1.06 | 0.00 |  |
| 19 | Vladimir | +0.99 | 0.99 | 0.00 |  |
| 20 | Yone | +0.99 | 0.99 | 0.00 | dash stop (Fate Sealed) |
| 21 | Xayah | +0.98 | 0.98 | 0.00 |  |
| 22 | Amumu | +0.94 | 0.94 | 0.00 | dash stop (Curse of the Sad Mummy) |
| 23 | Fiora | +0.94 | 0.94 | 0.00 |  |
| 24 | Ekko | +0.90 | 0.90 | 0.00 |  |
| 25 | Gwen | +0.90 | 0.90 | 0.00 |  |
| 26 | Lulu | +0.90 | 0.90 | 0.00 |  |
| 27 | Nocturne | +0.90 | 0.90 | 0.00 |  |
| 28 | Braum | +0.87 | 0.87 | 0.00 | projectile block (Unbreakable) |
| 29 | Hwei | +0.87 | 0.87 | 0.00 | dash stop (Grim Visage) |
| 30 | Veigar | +0.87 | 0.87 | 0.00 | dash stop (Event Horizon) |
| 31 | Vex | +0.87 | 0.87 | 0.00 | dash stop (Doom 'n Gloom) |
| 32 | Ahri | +0.86 | 0.86 | 0.00 | dash stop (Charm) |
| 33 | Xin Zhao | +0.85 | 0.85 | 0.00 |  |
| 34 | Milio | +0.81 | 0.81 | 0.00 |  |
| 35 | Taric | +0.81 | 0.81 | 0.00 |  |
| 36 | Zed | +0.79 | 0.79 | 0.00 |  |
| 37 | Aurora | +0.78 | 0.93 | 0.15 |  |
| 38 | Nilah | +0.78 | 0.78 | 0.00 |  |
| 39 | Jinx | +0.76 | 0.76 | 0.00 | dash stop (Flame Chompers!) |
| 40 | Rammus | +0.74 | 0.74 | 0.00 |  |
| 41 | Shen | +0.74 | 0.74 | 0.00 |  |
| 42 | Yasuo | +0.74 | 0.74 | 0.00 |  |
| 43 | Kled | +0.70 | 0.70 | 0.00 |  |
| 44 | Sion | +0.68 | 0.68 | 0.00 |  |
| 45 | Sivir | +0.68 | 0.68 | 0.00 |  |
| 46 | Zaahen | +0.68 | 0.68 | 0.00 |  |
| 47 | Twisted Fate | +0.66 | 0.66 | 0.00 |  |
| 48 | Heimerdinger | +0.64 | 0.64 | 0.00 |  |
| 49 | Quinn | +0.64 | 0.64 | 0.00 |  |
| 50 | Renata Glasc | +0.64 | 0.64 | 0.00 |  |
| 51 | Alistar | +0.63 | 0.63 | 0.00 |  |
| 52 | Ashe | +0.63 | 0.63 | 0.00 |  |
| 53 | Draven | +0.63 | 0.63 | 0.00 |  |
| 54 | Janna | +0.63 | 0.63 | 0.00 |  |
| 55 | Kayle | +0.63 | 0.63 | 0.00 |  |
| 56 | Gnar | +0.61 | 0.61 | 0.00 |  |
| 57 | Jax | +0.61 | 0.61 | 0.00 |  |
| 58 | Sona | +0.61 | 0.61 | 0.00 |  |
| 59 | Zilean | +0.61 | 0.61 | 0.00 |  |
| 60 | Zoe | +0.61 | 0.61 | 0.00 |  |
| 61 | Corki | +0.60 | 0.60 | 0.00 |  |
| 62 | Garen | +0.60 | 0.60 | 0.00 |  |
| 63 | Jayce | +0.60 | 0.60 | 0.00 |  |
| 64 | Kalista | +0.59 | 0.59 | 0.00 |  |
| 65 | Kennen | +0.59 | 0.59 | 0.00 |  |
| 66 | Kindred | +0.59 | 0.59 | 0.00 |  |
| 67 | Malphite | +0.59 | 0.59 | 0.00 |  |
| 68 | Nunu & Willump | +0.59 | 0.59 | 0.00 |  |
| 69 | Seraphine | +0.59 | 0.59 | 0.00 |  |
| 70 | Orianna | +0.58 | 0.58 | 0.00 |  |
| 71 | Soraka | +0.58 | 0.58 | 0.00 |  |
| 72 | Taliyah | +0.58 | 0.58 | 0.00 |  |
| 73 | Tristana | +0.58 | 0.58 | 0.00 |  |
| 74 | Vel'Koz | +0.58 | 0.58 | 0.00 |  |
| 75 | Xerath | +0.58 | 0.58 | 0.00 |  |
| 76 | Ziggs | +0.58 | 0.58 | 0.00 |  |
| 77 | Anivia | +0.57 | 0.57 | 0.00 |  |
| 78 | Udyr | +0.57 | 0.57 | 0.00 |  |
| 79 | Annie | +0.56 | 0.56 | 0.00 |  |
| 80 | Brand | +0.56 | 0.56 | 0.00 |  |
| 81 | Nami | +0.56 | 0.56 | 0.00 |  |
| 82 | Syndra | +0.56 | 0.56 | 0.00 |  |
| 83 | Azir | +0.55 | 0.55 | 0.00 |  |
| 84 | Fiddlesticks | +0.55 | 0.55 | 0.00 |  |
| 85 | Swain | +0.55 | 0.55 | 0.00 |  |
| 86 | Thresh | +0.55 | 0.55 | 0.00 |  |
| 87 | Varus | +0.54 | 0.54 | 0.00 |  |
| 88 | Zyra | +0.54 | 0.54 | 0.00 |  |
| 89 | Skarner | +0.53 | 0.53 | 0.00 |  |
| 90 | Urgot | +0.53 | 0.53 | 0.00 |  |
| 91 | Vayne | +0.52 | 0.66 | 0.14 |  |
| 92 | Mordekaiser | +0.52 | 0.52 | 0.00 |  |
| 93 | Aurelion Sol | +0.51 | 0.51 | 0.00 |  |
| 94 | Irelia | +0.48 | 0.48 | 0.00 |  |
| 95 | Rakan | +0.48 | 0.48 | 0.00 |  |
| 96 | Teemo | +0.47 | 0.55 | 0.08 |  |
| 97 | Aatrox | +0.45 | 0.45 | 0.00 |  |
| 98 | Bel'Veth | +0.45 | 0.45 | 0.00 |  |
| 99 | Blitzcrank | +0.45 | 0.45 | 0.00 |  |
| 100 | Briar | +0.45 | 0.45 | 0.00 |  |
| 101 | Cho'Gath | +0.45 | 0.45 | 0.00 |  |
| 102 | Darius | +0.45 | 0.45 | 0.00 |  |
| 103 | Diana | +0.45 | 0.45 | 0.00 |  |
| 104 | Fizz | +0.45 | 0.45 | 0.00 |  |
| 105 | Galio | +0.45 | 0.45 | 0.00 |  |
| 106 | Gragas | +0.45 | 0.45 | 0.00 |  |
| 107 | Kassadin | +0.45 | 0.45 | 0.00 |  |
| 108 | K'Sante | +0.45 | 0.45 | 0.00 |  |
| 109 | Lee Sin | +0.45 | 0.45 | 0.00 |  |
| 110 | Leona | +0.45 | 0.45 | 0.00 |  |
| 111 | Nautilus | +0.45 | 0.45 | 0.00 |  |
| 112 | Ornn | +0.45 | 0.45 | 0.00 |  |
| 113 | Pantheon | +0.45 | 0.45 | 0.00 |  |
| 114 | Rell | +0.45 | 0.45 | 0.00 |  |
| 115 | Renekton | +0.45 | 0.45 | 0.00 |  |
| 116 | Riven | +0.45 | 0.45 | 0.00 |  |
| 117 | Sejuani | +0.45 | 0.45 | 0.00 |  |
| 118 | Sett | +0.45 | 0.45 | 0.00 |  |
| 119 | Shyvana | +0.45 | 0.45 | 0.00 |  |
| 120 | Sylas | +0.45 | 0.45 | 0.00 |  |
| 121 | Tahm Kench | +0.45 | 0.45 | 0.00 |  |
| 122 | Trundle | +0.45 | 0.45 | 0.00 |  |
| 123 | Vi | +0.45 | 0.45 | 0.00 |  |
| 124 | Volibear | +0.45 | 0.45 | 0.00 |  |
| 125 | Yorick | +0.45 | 0.45 | 0.00 |  |
| 126 | Lillia | +0.43 | 0.43 | 0.00 |  |
| 127 | Neeko | +0.42 | 0.53 | 0.11 |  |
| 128 | Jarvan IV | +0.42 | 0.42 | 0.00 |  |
| 129 | Samira | +0.42 | 0.42 | 0.00 |  |
| 130 | Katarina | +0.41 | 0.41 | 0.00 |  |
| 131 | Ambessa | +0.40 | 0.40 | 0.00 |  |
| 132 | Hecarim | +0.40 | 0.40 | 0.00 |  |
| 133 | Viego | +0.39 | 0.50 | 0.11 |  |
| 134 | Mel | +0.38 | 0.38 | 0.00 |  |
| 135 | Pyke | +0.34 | 0.45 | 0.11 |  |
| 136 | Morgana | +0.33 | 0.33 | 0.00 |  |
| 137 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 138 | Aphelios | +0.28 | 0.28 | 0.00 |  |
| 139 | Olaf | +0.23 | 0.23 | 0.00 |  |
| 140 | Wukong | +0.22 | 0.42 | 0.20 |  |
| 141 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 142 | Qiyana | +0.18 | 0.36 | 0.18 |  |
| 143 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 144 | Gangplank | +0.18 | 0.18 | 0.00 |  |
| 145 | Lucian | +0.18 | 0.18 | 0.00 |  |
| 146 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 147 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 148 | Miss Fortune | +0.16 | 0.16 | 0.00 |  |
| 149 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 150 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 151 | Kog'Maw | +0.14 | 0.14 | 0.00 |  |
| 152 | Lux | +0.14 | 0.14 | 0.00 |  |
| 153 | Jhin | +0.13 | 0.13 | 0.00 |  |
| 154 | Graves | +0.12 | 0.12 | 0.00 |  |
| 155 | Ryze | +0.12 | 0.12 | 0.00 |  |
| 156 | Karma | +0.11 | 0.11 | 0.00 |  |
| 157 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 158 | Ivern | +0.10 | 0.10 | 0.00 |  |
| 159 | Karthus | +0.10 | 0.10 | 0.00 |  |
| 160 | Kai'Sa | +0.08 | 0.19 | 0.11 |  |
| 161 | Senna | +0.05 | 0.16 | 0.11 |  |
| 162 | Rengar | +0.04 | 0.18 | 0.14 |  |
| 163 | Akshan | +0.03 | 0.17 | 0.14 |  |
| 164 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 165 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 166 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 167 | Locke | 0.00 | 0.00 | 0.00 |  |
| 168 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 169 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 170 | Akali | -0.11 | 0.00 | 0.11 |  |
| 171 | Talon | -0.14 | 0.00 | 0.14 |  |
| 172 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
