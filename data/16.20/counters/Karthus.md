# Counters to Karthus (patch 26.20)

Every champion ranked by what its kit does against Karthus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Karthus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Karthus` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.99)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Karthus's Requiem. Untargetable for 0.6 s; Requiem takes 0.25 s to land, enough to react. (Elise E Rappel → Karthus R Requiem)
- **0.28** interrupt: Cocoon's stun interrupts Karthus's Requiem (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Karthus R Requiem)
- **0.16** range: Elise's basic attacks reach 100 units farther than Karthus's (550 vs 450 attack range). Karthus has no dash or blink to close the gap. (Elise basic attacks → Karthus basic attacks)

### 2. Kayle (net +0.87)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Karthus's Requiem. Invulnerable for 2.5 s, long enough to use ahead of Requiem. (Kayle R Divine Judgment → Karthus R Requiem)
- **0.32** range: Kayle's basic attacks reach 175 units farther than Karthus's (625 vs 450 attack range). Karthus has no dash or blink to close the gap. (Kayle basic attacks → Karthus basic attacks)

### 3. Lissandra (net +0.80)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Karthus's Requiem. Untargetable for 2.5 s, long enough to use ahead of Requiem. (Lissandra R Frozen Tomb → Karthus R Requiem)
- **0.28** interrupt: Frozen Tomb's stun interrupts Karthus's Requiem (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Karthus R Requiem)
- **0.11** range: Lissandra's basic attacks reach 100 units farther than Karthus's (550 vs 450 attack range). Karthus has no dash or blink to close the gap. (Lissandra basic attacks → Karthus basic attacks)

### 4. Camille (net +0.73)

- **0.55** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Karthus's Requiem. Untargetable for 0.5 s; Requiem takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Karthus R Requiem)
- **0.28** interrupt: Wall Dive's airborne interrupts Karthus's Requiem (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range).

### 5. Tristana (net +0.73)

- **0.45** range: Tristana's basic attacks reach 250 units farther than Karthus's (700 vs 450 attack range). Karthus has no dash or blink to close the gap. (Tristana basic attacks → Karthus basic attacks)
- **0.28** interrupt: Buster Shot's airborne interrupts Karthus's Requiem (normal channel). Buster Shot must land during the channel. (Tristana R Buster Shot → Karthus R Requiem)

### 6. Kayn (net +0.72)

- **0.55** untargetable: Umbral Trespass makes Kayn untargetable, dodging Karthus's Requiem. Untargetable for 0.25 s; Requiem takes 0.25 s to land, enough to react. (Kayn R Umbral Trespass → Karthus R Requiem)
- **0.28** interrupt: Blade's Reach's airborne interrupts Karthus's Requiem (normal channel). Blade's Reach must land during the channel. (Kayn W Blade's Reach → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 275 units farther than Kayn's (450 vs 175 attack range).

### 7. Rek'Sai (net +0.72)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Karthus's Requiem. Untargetable for 1.5 s, long enough to use ahead of Requiem. (Rek'Sai R Void Rush → Karthus R Requiem)
- **0.28** interrupt: Unburrow's airborne interrupts Karthus's Requiem (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 275 units farther than Rek'Sai's (450 vs 175 attack range).

### 8. Evelynn (net +0.70)

- **0.55** untargetable: Last Caress makes Evelynn untargetable, dodging Karthus's Requiem. Untargetable for ?; Requiem takes 0.25 s to land, enough to react. (Evelynn R Last Caress → Karthus R Requiem)
- **0.28** interrupt: Allure's charm interrupts Karthus's Requiem (normal channel). Allure must land during the channel. (Evelynn W Allure → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 325 units farther than Evelynn's (450 vs 125 attack range).

### 9. Shaco (net +0.70)

- **0.55** untargetable: Hallucinate makes Shaco untargetable, dodging Karthus's Requiem. Untargetable for 0.5 s; Requiem takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Karthus R Requiem)
- **0.28** interrupt: Jack in the Box's fear interrupts Karthus's Requiem (normal channel). Jack in the Box must land during the channel. (Shaco W Jack in the Box → Karthus R Requiem)
- Watch out: Karthus's basic attacks reach 325 units farther than Shaco's (450 vs 125 attack range).

### 10. Aurora (net +0.69)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Karthus's Requiem. Untargetable for 0.4 s; Requiem takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Karthus R Requiem)
- **0.14** range: Aurora's basic attacks reach 100 units farther than Karthus's (550 vs 450 attack range). Karthus has no dash or blink to close the gap. (Aurora basic attacks → Karthus basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.99 | 0.99 | 0.00 |  |
| 2 | Kayle | +0.87 | 0.87 | 0.00 |  |
| 3 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 4 | Camille | +0.73 | 0.83 | 0.10 |  |
| 5 | Tristana | +0.73 | 0.73 | 0.00 |  |
| 6 | Kayn | +0.72 | 0.83 | 0.11 |  |
| 7 | Rek'Sai | +0.72 | 0.83 | 0.11 |  |
| 8 | Evelynn | +0.70 | 0.83 | 0.13 |  |
| 9 | Shaco | +0.70 | 0.83 | 0.13 |  |
| 10 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 11 | Bard | +0.69 | 0.69 | 0.00 |  |
| 12 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 13 | Lulu | +0.68 | 0.68 | 0.00 |  |
| 14 | Xin Zhao | +0.67 | 0.83 | 0.16 |  |
| 15 | Maokai | +0.64 | 0.83 | 0.19 |  |
| 16 | Nocturne | +0.64 | 0.83 | 0.19 |  |
| 17 | Ashe | +0.55 | 0.55 | 0.00 |  |
| 18 | Kindred | +0.55 | 0.55 | 0.00 |  |
| 19 | Sivir | +0.55 | 0.55 | 0.00 |  |
| 20 | Vladimir | +0.55 | 0.55 | 0.00 |  |
| 21 | Yuumi | +0.55 | 0.55 | 0.00 |  |
| 22 | Sona | +0.49 | 0.49 | 0.00 |  |
| 23 | Vayne | +0.49 | 0.49 | 0.00 |  |
| 24 | Milio | +0.48 | 0.48 | 0.00 |  |
| 25 | Taric | +0.47 | 0.83 | 0.36 |  |
| 26 | Master Yi | +0.47 | 0.63 | 0.16 |  |
| 27 | Annie | +0.47 | 0.47 | 0.00 |  |
| 28 | Renata Glasc | +0.47 | 0.47 | 0.00 |  |
| 29 | Anivia | +0.46 | 0.46 | 0.00 |  |
| 30 | Draven | +0.46 | 0.46 | 0.00 |  |
| 31 | Janna | +0.46 | 0.46 | 0.00 |  |
| 32 | Pantheon | +0.44 | 0.55 | 0.11 |  |
| 33 | Twisted Fate | +0.44 | 0.44 | 0.00 |  |
| 34 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 35 | Zoe | +0.44 | 0.44 | 0.00 |  |
| 36 | Yasuo | +0.43 | 0.54 | 0.11 |  |
| 37 | Corki | +0.43 | 0.43 | 0.00 |  |
| 38 | Heimerdinger | +0.43 | 0.43 | 0.00 |  |
| 39 | Zyra | +0.43 | 0.43 | 0.00 |  |
| 40 | Braum | +0.42 | 0.61 | 0.19 |  |
| 41 | Ekko | +0.42 | 0.55 | 0.13 |  |
| 42 | Zed | +0.42 | 0.55 | 0.13 |  |
| 43 | Kalista | +0.42 | 0.42 | 0.00 |  |
| 44 | Kennen | +0.42 | 0.42 | 0.00 |  |
| 45 | Quinn | +0.42 | 0.42 | 0.00 |  |
| 46 | Soraka | +0.41 | 0.41 | 0.00 |  |
| 47 | Vex | +0.41 | 0.41 | 0.00 |  |
| 48 | Ziggs | +0.41 | 0.41 | 0.00 |  |
| 49 | Fiora | +0.40 | 0.58 | 0.18 |  |
| 50 | Veigar | +0.40 | 0.40 | 0.00 |  |
| 51 | Viktor | +0.40 | 0.40 | 0.00 |  |
| 52 | Shen | +0.39 | 0.52 | 0.13 |  |
| 53 | Ahri | +0.39 | 0.39 | 0.00 |  |
| 54 | Aurelion Sol | +0.39 | 0.39 | 0.00 |  |
| 55 | Brand | +0.39 | 0.39 | 0.00 |  |
| 56 | Cassiopeia | +0.39 | 0.39 | 0.00 |  |
| 57 | Hwei | +0.39 | 0.39 | 0.00 |  |
| 58 | Nami | +0.39 | 0.39 | 0.00 |  |
| 59 | Neeko | +0.39 | 0.39 | 0.00 |  |
| 60 | Seraphine | +0.39 | 0.39 | 0.00 |  |
| 61 | Syndra | +0.39 | 0.39 | 0.00 |  |
| 62 | Azir | +0.38 | 0.38 | 0.00 |  |
| 63 | Orianna | +0.38 | 0.38 | 0.00 |  |
| 64 | Taliyah | +0.38 | 0.38 | 0.00 |  |
| 65 | Vel'Koz | +0.38 | 0.38 | 0.00 |  |
| 66 | Xerath | +0.38 | 0.38 | 0.00 |  |
| 67 | Gwen | +0.37 | 0.55 | 0.18 |  |
| 68 | Nilah | +0.37 | 0.50 | 0.13 |  |
| 69 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 70 | Swain | +0.36 | 0.36 | 0.00 |  |
| 71 | Malzahar | +0.34 | 0.34 | 0.00 |  |
| 72 | Rammus | +0.33 | 0.52 | 0.19 |  |
| 73 | Mel | +0.33 | 0.33 | 0.00 |  |
| 74 | Teemo | +0.31 | 0.31 | 0.00 |  |
| 75 | Fiddlesticks | +0.28 | 0.28 | 0.00 |  |
| 76 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 77 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 78 | Thresh | +0.28 | 0.28 | 0.00 |  |
| 79 | Kled | +0.27 | 0.33 | 0.06 |  |
| 80 | Malphite | +0.25 | 0.44 | 0.19 |  |
| 81 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 82 | Senna | +0.24 | 0.24 | 0.00 |  |
| 83 | Zaahen | +0.23 | 0.34 | 0.11 |  |
| 84 | Jax | +0.22 | 0.41 | 0.19 |  |
| 85 | Rakan | +0.22 | 0.28 | 0.06 |  |
| 86 | Urgot | +0.22 | 0.28 | 0.06 |  |
| 87 | Yunara | +0.22 | 0.22 | 0.00 |  |
| 88 | Zeri | +0.22 | 0.22 | 0.00 |  |
| 89 | Warwick | +0.21 | 0.34 | 0.13 |  |
| 90 | Lillia | +0.21 | 0.28 | 0.07 |  |
| 91 | Viego | +0.21 | 0.28 | 0.07 |  |
| 92 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 93 | Fizz | +0.20 | 0.28 | 0.08 |  |
| 94 | Jarvan IV | +0.20 | 0.28 | 0.08 |  |
| 95 | Sylas | +0.20 | 0.28 | 0.08 |  |
| 96 | Yone | +0.20 | 0.28 | 0.08 |  |
| 97 | Samira | +0.20 | 0.20 | 0.00 |  |
| 98 | K'Sante | +0.19 | 0.28 | 0.09 |  |
| 99 | Briar | +0.18 | 0.28 | 0.10 |  |
| 100 | Hecarim | +0.17 | 0.28 | 0.11 |  |
| 101 | Wukong | +0.17 | 0.28 | 0.11 |  |
| 102 | Ornn | +0.17 | 0.28 | 0.11 |  |
| 103 | Rell | +0.17 | 0.28 | 0.11 |  |
| 104 | Varus | +0.17 | 0.17 | 0.00 |  |
| 105 | Bel'Veth | +0.16 | 0.28 | 0.12 |  |
| 106 | Galio | +0.16 | 0.28 | 0.12 |  |
| 107 | Pyke | +0.16 | 0.28 | 0.12 |  |
| 108 | Qiyana | +0.16 | 0.28 | 0.12 |  |
| 109 | Volibear | +0.16 | 0.28 | 0.12 |  |
| 110 | Ezreal | +0.16 | 0.16 | 0.00 |  |
| 111 | Miss Fortune | +0.16 | 0.16 | 0.00 |  |
| 112 | Smolder | +0.16 | 0.16 | 0.00 |  |
| 113 | Udyr | +0.15 | 0.34 | 0.19 |  |
| 114 | Ambessa | +0.15 | 0.28 | 0.13 |  |
| 115 | Lee Sin | +0.15 | 0.28 | 0.13 |  |
| 116 | Riven | +0.15 | 0.28 | 0.13 |  |
| 117 | Vi | +0.15 | 0.28 | 0.13 |  |
| 118 | Alistar | +0.14 | 0.33 | 0.19 |  |
| 119 | Kai'Sa | +0.14 | 0.14 | 0.00 |  |
| 120 | Lux | +0.14 | 0.14 | 0.00 |  |
| 121 | Irelia | +0.13 | 0.28 | 0.15 |  |
| 122 | Jhin | +0.13 | 0.13 | 0.00 |  |
| 123 | Aatrox | +0.12 | 0.28 | 0.16 |  |
| 124 | Nautilus | +0.12 | 0.28 | 0.16 |  |
| 125 | Tahm Kench | +0.12 | 0.28 | 0.16 |  |
| 126 | Zac | +0.12 | 0.28 | 0.16 |  |
| 127 | Ryze | +0.12 | 0.12 | 0.00 |  |
| 128 | Jinx | +0.11 | 0.11 | 0.00 |  |
| 129 | Morgana | +0.11 | 0.11 | 0.00 |  |
| 130 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 131 | Diana | +0.10 | 0.28 | 0.18 |  |
| 132 | Kassadin | +0.10 | 0.28 | 0.18 |  |
| 133 | Sejuani | +0.10 | 0.28 | 0.18 |  |
| 134 | Shyvana | +0.10 | 0.28 | 0.18 |  |
| 135 | Amumu | +0.09 | 0.28 | 0.19 |  |
| 136 | Gragas | +0.09 | 0.28 | 0.19 |  |
| 137 | Leona | +0.09 | 0.28 | 0.19 |  |
| 138 | Poppy | +0.09 | 0.28 | 0.19 |  |
| 139 | Renekton | +0.09 | 0.28 | 0.19 |  |
| 140 | Sett | +0.09 | 0.28 | 0.19 |  |
| 141 | Karma | +0.08 | 0.08 | 0.00 |  |
| 142 | LeBlanc | +0.08 | 0.08 | 0.00 |  |
| 143 | Garen | +0.03 | 0.36 | 0.33 |  |
| 144 | Mordekaiser | +0.01 | 0.34 | 0.33 |  |
| 145 | Sion | +0.01 | 0.34 | 0.33 |  |
| 146 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 147 | Graves | 0.00 | 0.00 | 0.00 |  |
| 148 | Ivern | 0.00 | 0.00 | 0.00 |  |
| 149 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 150 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 151 | Skarner | -0.02 | 0.34 | 0.36 |  |
| 152 | Nunu & Willump | -0.04 | 0.35 | 0.39 |  |
| 153 | Darius | -0.05 | 0.28 | 0.33 |  |
| 154 | Trundle | -0.05 | 0.28 | 0.33 |  |
| 155 | Yorick | -0.05 | 0.28 | 0.33 |  |
| 156 | Naafiri | -0.10 | 0.00 | 0.10 |  |
| 157 | Blitzcrank | -0.11 | 0.28 | 0.39 |  |
| 158 | Cho'Gath | -0.11 | 0.28 | 0.39 |  |
| 159 | Singed | -0.11 | 0.28 | 0.39 |  |
| 160 | Akali | -0.13 | 0.00 | 0.13 |  |
| 161 | Talon | -0.13 | 0.00 | 0.13 |  |
| 162 | Nasus | -0.15 | 0.24 | 0.39 |  |
| 163 | Tryndamere | -0.16 | 0.00 | 0.16 |  |
| 164 | Illaoi | -0.19 | 0.00 | 0.19 |  |
| 165 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 166 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 167 | Locke | -0.19 | 0.00 | 0.19 |  |
| 168 | Gangplank | -0.30 | 0.09 | 0.39 |  |
| 169 | Rengar | -0.30 | 0.09 | 0.39 |  |
| 170 | Olaf | -0.33 | 0.06 | 0.39 |  |
| 171 | Dr. Mundo | -0.39 | 0.00 | 0.39 |  |
| 172 | Rumble | -0.39 | 0.00 | 0.39 |  |
