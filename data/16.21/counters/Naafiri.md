# Counters to Naafiri (patch 26.21)

Every champion ranked by what its kit does against Naafiri's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Naafiri's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Naafiri` for the full ledger of a matchup, with sources.

## Top 10

### 1. Rell (net +2.25)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Full Tilt's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Naafiri R Hounds' Pursuit)

### 2. Singed (net +1.70)

- **0.45** interrupt: Fling's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Fling must land during the channel. (Singed E Fling → Naafiri R Hounds' Pursuit)
- **0.44** grounding: Mega Adhesive grounds Naafiri, who then can't cast Hounds' Pursuit. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Naafiri R Hounds' Pursuit)
- **0.39** grounding: Mega Adhesive grounds Naafiri, who then can't cast Eviscerate. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Naafiri E Eviscerate)

### 3. Zac (net +1.64)

- **0.45** dash stop: Stretching Strikes's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Zac Q Stretching Strikes → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Elastic Slingshot's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Elastic Slingshot must land during the channel. (Zac E Elastic Slingshot → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Stretching Strikes's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Stretching Strikes must land during the channel. (Zac Q Stretching Strikes → Naafiri R Hounds' Pursuit)

### 4. Camille (net +1.50)

- **0.84** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 0.5 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Camille R The Hextech Ultimatum → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Wall Dive's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Naafiri R Hounds' Pursuit)
- **0.42** interrupt: The Hextech Ultimatum's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Naafiri R Hounds' Pursuit)

### 5. Taliyah (net +1.39)

- **0.45** interrupt: Seismic Shove's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Seismic Shove must land during the channel. (Taliyah W Seismic Shove → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Unraveled Earth's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Unraveled Earth must land during the channel. (Taliyah E Unraveled Earth → Naafiri R Hounds' Pursuit)
- **0.36** interrupt: Weaver's Wall's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Weaver's Wall must land during the channel. (Taliyah R Weaver's Wall → Naafiri R Hounds' Pursuit)

### 6. Malzahar (net +1.38)

- **0.45** dash stop: Nether Grasp's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Malzahar R Nether Grasp → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Call of the Void's silence interrupts Naafiri's Hounds' Pursuit (movement channel). Call of the Void must land during the channel. (Malzahar Q Call of the Void → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Nether Grasp's suppression interrupts Naafiri's Hounds' Pursuit (movement channel). Nether Grasp must land during the channel. (Malzahar R Nether Grasp → Naafiri R Hounds' Pursuit)

### 7. Lissandra (net +1.37)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 2.5 s, long enough to use ahead of Hounds' Pursuit. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)
- **0.45** dash stop: Frozen Tomb's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Frozen Tomb's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Naafiri R Hounds' Pursuit)

### 8. Viktor (net +1.36)

- **0.45** dash stop: Gravity Field's knockdown can stop Naafiri's Hounds' Pursuit mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Viktor W Gravity Field → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Arcane Storm's disrupt interrupts Naafiri's Hounds' Pursuit (movement channel). Arcane Storm must land during the channel. (Viktor R Arcane Storm → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Gravity Field's stun interrupts Naafiri's Hounds' Pursuit (movement channel). Gravity Field must land during the channel. (Viktor W Gravity Field → Naafiri R Hounds' Pursuit)

### 9. Blitzcrank (net +1.35)

- **0.45** interrupt: Power Fist's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Power Fist must land during the channel. (Blitzcrank E Power Fist → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Rocket Grab's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Rocket Grab must land during the channel. (Blitzcrank Q Rocket Grab → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Static Field's silence interrupts Naafiri's Hounds' Pursuit (movement channel). Static Field must land during the channel. (Blitzcrank R Static Field → Naafiri R Hounds' Pursuit)

### 10. Fizz (net +1.35)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Naafiri's Hounds' Pursuit. Untargetable for 0.75 s; Hounds' Pursuit takes 0.5 s to land, enough to react. (Fizz E Playful → Naafiri R Hounds' Pursuit)
- **0.45** interrupt: Chum the Waters's airborne interrupts Naafiri's Hounds' Pursuit (movement channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Naafiri R Hounds' Pursuit)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.25 | 2.25 | 0.00 |  |
| 2 | Singed | +1.70 | 1.70 | 0.00 | grounding (Mega Adhesive) |
| 3 | Zac | +1.64 | 1.64 | 0.00 | dash stop (Stretching Strikes) |
| 4 | Camille | +1.50 | 1.50 | 0.00 |  |
| 5 | Taliyah | +1.39 | 1.39 | 0.00 |  |
| 6 | Malzahar | +1.38 | 1.38 | 0.00 | dash stop (Nether Grasp) |
| 7 | Lissandra | +1.37 | 1.37 | 0.00 | dash stop (Frozen Tomb) |
| 8 | Viktor | +1.36 | 1.36 | 0.00 | dash stop (Gravity Field) |
| 9 | Blitzcrank | +1.35 | 1.35 | 0.00 |  |
| 10 | Fizz | +1.35 | 1.35 | 0.00 |  |
| 11 | Kayn | +1.35 | 1.35 | 0.00 |  |
| 12 | K'Sante | +1.35 | 1.35 | 0.00 |  |
| 13 | Maokai | +1.35 | 1.35 | 0.00 |  |
| 14 | Rek'Sai | +1.35 | 1.35 | 0.00 |  |
| 15 | Tahm Kench | +1.35 | 1.35 | 0.00 |  |
| 16 | Sejuani | +1.32 | 1.32 | 0.00 |  |
| 17 | Bard | +1.31 | 1.31 | 0.00 |  |
| 18 | Evelynn | +1.27 | 1.35 | 0.08 |  |
| 19 | Braum | +1.27 | 1.27 | 0.00 | projectile block (Unbreakable) |
| 20 | Galio | +1.23 | 1.23 | 0.00 |  |
| 21 | Lulu | +1.21 | 1.21 | 0.00 |  |
| 22 | Warwick | +1.21 | 1.21 | 0.00 | dash stop (Infinite Duress) |
| 23 | Rammus | +1.19 | 1.19 | 0.00 |  |
| 24 | Yasuo | +1.19 | 1.19 | 0.00 |  |
| 25 | Cassiopeia | +1.18 | 1.18 | 0.00 | grounding (Miasma) |
| 26 | Yone | +1.17 | 1.17 | 0.00 | dash stop (Fate Sealed) |
| 27 | Shaco | +1.15 | 1.35 | 0.20 |  |
| 28 | Poppy | +1.13 | 1.13 | 0.00 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 29 | Zaahen | +1.13 | 1.13 | 0.00 |  |
| 30 | Master Yi | +1.12 | 1.12 | 0.00 |  |
| 31 | Amumu | +1.10 | 1.10 | 0.00 | dash stop (Curse of the Sad Mummy) |
| 32 | Heimerdinger | +1.09 | 1.09 | 0.00 |  |
| 33 | Alistar | +1.08 | 1.08 | 0.00 |  |
| 34 | Gnar | +1.06 | 1.06 | 0.00 |  |
| 35 | Yuumi | +1.06 | 1.06 | 0.00 |  |
| 36 | Xin Zhao | +1.05 | 1.05 | 0.00 |  |
| 37 | Janna | +1.03 | 1.03 | 0.00 |  |
| 38 | Anivia | +1.02 | 1.02 | 0.00 |  |
| 39 | Renata Glasc | +1.02 | 1.02 | 0.00 |  |
| 40 | Sion | +1.02 | 1.02 | 0.00 |  |
| 41 | Fiddlesticks | +1.00 | 1.00 | 0.00 |  |
| 42 | Thresh | +1.00 | 1.00 | 0.00 |  |
| 43 | Kled | +0.99 | 0.99 | 0.00 |  |
| 44 | Vladimir | +0.99 | 0.99 | 0.00 |  |
| 45 | Urgot | +0.98 | 0.98 | 0.00 |  |
| 46 | Xayah | +0.98 | 0.98 | 0.00 |  |
| 47 | Aurelion Sol | +0.96 | 0.96 | 0.00 |  |
| 48 | Nami | +0.96 | 0.96 | 0.00 |  |
| 49 | Seraphine | +0.95 | 0.95 | 0.00 |  |
| 50 | Fiora | +0.94 | 0.94 | 0.00 |  |
| 51 | Rakan | +0.93 | 0.93 | 0.00 |  |
| 52 | Cho'Gath | +0.90 | 0.90 | 0.00 |  |
| 53 | Gragas | +0.90 | 0.90 | 0.00 |  |
| 54 | Gwen | +0.90 | 0.90 | 0.00 |  |
| 55 | Leona | +0.90 | 0.90 | 0.00 |  |
| 56 | Nocturne | +0.90 | 0.90 | 0.00 |  |
| 57 | Riven | +0.90 | 0.90 | 0.00 |  |
| 58 | Sett | +0.90 | 0.90 | 0.00 |  |
| 59 | Hwei | +0.87 | 0.87 | 0.00 | dash stop (Grim Visage) |
| 60 | Veigar | +0.87 | 0.87 | 0.00 | dash stop (Event Horizon) |
| 61 | Vex | +0.87 | 0.87 | 0.00 | dash stop (Doom 'n Gloom) |
| 62 | Vi | +0.87 | 0.87 | 0.00 |  |
| 63 | Ahri | +0.86 | 0.86 | 0.00 | dash stop (Charm) |
| 64 | Ornn | +0.85 | 0.85 | 0.00 |  |
| 65 | Viego | +0.84 | 0.95 | 0.11 |  |
| 66 | Milio | +0.81 | 0.81 | 0.00 |  |
| 67 | Pyke | +0.79 | 0.90 | 0.11 |  |
| 68 | Zed | +0.79 | 0.79 | 0.00 |  |
| 69 | Aurora | +0.78 | 0.93 | 0.15 |  |
| 70 | Nilah | +0.78 | 0.78 | 0.00 |  |
| 71 | Jinx | +0.76 | 0.76 | 0.00 | dash stop (Flame Chompers!) |
| 72 | Shen | +0.74 | 0.74 | 0.00 |  |
| 73 | Sivir | +0.68 | 0.68 | 0.00 |  |
| 74 | Twisted Fate | +0.66 | 0.66 | 0.00 |  |
| 75 | Quinn | +0.64 | 0.64 | 0.00 |  |
| 76 | Ashe | +0.63 | 0.63 | 0.00 |  |
| 77 | Draven | +0.63 | 0.63 | 0.00 |  |
| 78 | Kayle | +0.63 | 0.63 | 0.00 |  |
| 79 | Elise | +0.61 | 0.61 | 0.00 |  |
| 80 | Jax | +0.61 | 0.61 | 0.00 |  |
| 81 | Sona | +0.61 | 0.61 | 0.00 |  |
| 82 | Zilean | +0.61 | 0.61 | 0.00 |  |
| 83 | Zoe | +0.61 | 0.61 | 0.00 |  |
| 84 | Garen | +0.60 | 0.60 | 0.00 |  |
| 85 | Jayce | +0.60 | 0.60 | 0.00 |  |
| 86 | Kalista | +0.59 | 0.59 | 0.00 |  |
| 87 | Kennen | +0.59 | 0.59 | 0.00 |  |
| 88 | Malphite | +0.59 | 0.59 | 0.00 |  |
| 89 | Nunu & Willump | +0.59 | 0.59 | 0.00 |  |
| 90 | Orianna | +0.58 | 0.58 | 0.00 |  |
| 91 | Soraka | +0.58 | 0.58 | 0.00 |  |
| 92 | Tristana | +0.58 | 0.58 | 0.00 |  |
| 93 | Vel'Koz | +0.58 | 0.58 | 0.00 |  |
| 94 | Xerath | +0.58 | 0.58 | 0.00 |  |
| 95 | Ziggs | +0.58 | 0.58 | 0.00 |  |
| 96 | Udyr | +0.57 | 0.57 | 0.00 |  |
| 97 | Annie | +0.56 | 0.56 | 0.00 |  |
| 98 | Brand | +0.56 | 0.56 | 0.00 |  |
| 99 | Syndra | +0.56 | 0.56 | 0.00 |  |
| 100 | Azir | +0.55 | 0.55 | 0.00 |  |
| 101 | Swain | +0.55 | 0.55 | 0.00 |  |
| 102 | Varus | +0.54 | 0.54 | 0.00 |  |
| 103 | Zyra | +0.54 | 0.54 | 0.00 |  |
| 104 | Skarner | +0.53 | 0.53 | 0.00 |  |
| 105 | Vayne | +0.52 | 0.66 | 0.14 |  |
| 106 | Mordekaiser | +0.52 | 0.52 | 0.00 |  |
| 107 | Irelia | +0.48 | 0.48 | 0.00 |  |
| 108 | Teemo | +0.47 | 0.55 | 0.08 |  |
| 109 | Aatrox | +0.45 | 0.45 | 0.00 |  |
| 110 | Bel'Veth | +0.45 | 0.45 | 0.00 |  |
| 111 | Briar | +0.45 | 0.45 | 0.00 |  |
| 112 | Darius | +0.45 | 0.45 | 0.00 |  |
| 113 | Diana | +0.45 | 0.45 | 0.00 |  |
| 114 | Kassadin | +0.45 | 0.45 | 0.00 |  |
| 115 | Lee Sin | +0.45 | 0.45 | 0.00 |  |
| 116 | Nautilus | +0.45 | 0.45 | 0.00 |  |
| 117 | Pantheon | +0.45 | 0.45 | 0.00 |  |
| 118 | Renekton | +0.45 | 0.45 | 0.00 |  |
| 119 | Shyvana | +0.45 | 0.45 | 0.00 |  |
| 120 | Sylas | +0.45 | 0.45 | 0.00 |  |
| 121 | Taric | +0.45 | 0.45 | 0.00 |  |
| 122 | Trundle | +0.45 | 0.45 | 0.00 |  |
| 123 | Volibear | +0.45 | 0.45 | 0.00 |  |
| 124 | Yorick | +0.45 | 0.45 | 0.00 |  |
| 125 | Lillia | +0.43 | 0.43 | 0.00 |  |
| 126 | Neeko | +0.42 | 0.53 | 0.11 |  |
| 127 | Jarvan IV | +0.42 | 0.42 | 0.00 |  |
| 128 | Samira | +0.42 | 0.42 | 0.00 |  |
| 129 | Katarina | +0.41 | 0.41 | 0.00 |  |
| 130 | Ambessa | +0.40 | 0.40 | 0.00 |  |
| 131 | Hecarim | +0.40 | 0.40 | 0.00 |  |
| 132 | Mel | +0.38 | 0.38 | 0.00 |  |
| 133 | Morgana | +0.33 | 0.33 | 0.00 |  |
| 134 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 135 | Aphelios | +0.28 | 0.28 | 0.00 |  |
| 136 | Kindred | +0.23 | 0.23 | 0.00 |  |
| 137 | Olaf | +0.23 | 0.23 | 0.00 |  |
| 138 | Wukong | +0.22 | 0.42 | 0.20 |  |
| 139 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 140 | Qiyana | +0.18 | 0.36 | 0.18 |  |
| 141 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 142 | Gangplank | +0.18 | 0.18 | 0.00 |  |
| 143 | Lucian | +0.18 | 0.18 | 0.00 |  |
| 144 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 145 | Corki | +0.16 | 0.16 | 0.00 |  |
| 146 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 147 | Miss Fortune | +0.16 | 0.16 | 0.00 |  |
| 148 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 149 | Nidalee | +0.15 | 0.15 | 0.00 |  |
| 150 | Kog'Maw | +0.14 | 0.14 | 0.00 |  |
| 151 | Lux | +0.14 | 0.14 | 0.00 |  |
| 152 | Jhin | +0.13 | 0.13 | 0.00 |  |
| 153 | Graves | +0.12 | 0.12 | 0.00 |  |
| 154 | Ryze | +0.12 | 0.12 | 0.00 |  |
| 155 | Karma | +0.11 | 0.11 | 0.00 |  |
| 156 | Twitch | +0.10 | 0.21 | 0.11 |  |
| 157 | Ivern | +0.10 | 0.10 | 0.00 |  |
| 158 | Karthus | +0.10 | 0.10 | 0.00 |  |
| 159 | Kai'Sa | +0.08 | 0.19 | 0.11 |  |
| 160 | Senna | +0.05 | 0.16 | 0.11 |  |
| 161 | Rengar | +0.04 | 0.18 | 0.14 |  |
| 162 | Akshan | +0.03 | 0.17 | 0.14 |  |
| 163 | LeBlanc | +0.03 | 0.11 | 0.08 |  |
| 164 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 165 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 166 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 167 | Locke | 0.00 | 0.00 | 0.00 |  |
| 168 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 169 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 170 | Akali | -0.11 | 0.00 | 0.11 |  |
| 171 | Talon | -0.14 | 0.00 | 0.14 |  |
| 172 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
