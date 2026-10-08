# Counters to Rumble (patch 26.20)

Every champion ranked by what its kit does against Rumble's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rumble's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rumble` for the full ledger of a matchup, with sources.

## Top 10

### 1. Bard (net +1.27)

- **0.72** range: Bard's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Bard basic attacks → Rumble basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Rumble's The Equalizer. Untargetable for 2.5 s, long enough to use ahead of The Equalizer. (Bard R Tempered Fate → Rumble R The Equalizer)

### 2. Xayah (net +1.25)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Rumble's (525 vs 125 attack range). Rumble has no dash or blink to close the gap. (Xayah basic attacks → Rumble basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Rumble's The Equalizer. Untargetable for 1.5 s, long enough to use ahead of The Equalizer. (Xayah R Featherstorm → Rumble R The Equalizer)

### 3. Elise (net +1.20)

- **0.65** range: Elise's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Elise basic attacks → Rumble basic attacks)
- **0.55** untargetable: Rappel makes Elise untargetable, dodging Rumble's The Equalizer. Untargetable for 0.6 s; The Equalizer takes 1.65 s to land, enough to react. (Elise E Rappel → Rumble R The Equalizer)

### 4. Yuumi (net +1.19)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Rumble's (425 vs 125 attack range). Rumble has no dash or blink to close the gap. (Yuumi basic attacks → Rumble basic attacks)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Rumble's The Equalizer. Untargetable for ?; The Equalizer takes 1.65 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Rumble R The Equalizer)

### 5. Kindred (net +1.16)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Kindred basic attacks → Rumble basic attacks)
- **0.22** invulnerable: Lamb's Respite makes Kindred invulnerable to Rumble's The Equalizer (its crowd control still applies). Invulnerable for ?; The Equalizer takes 1.65 s to land, enough to react. (Kindred R Lamb's Respite → Rumble R The Equalizer)

### 6. Aurora (net +1.06)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Aurora basic attacks → Rumble basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Rumble's The Equalizer. Untargetable for 0.4 s; The Equalizer takes 1.65 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Rumble R The Equalizer)

### 7. Teemo (net +1.06)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Rumble's (500 vs 125 attack range). Rumble has no dash or blink to close the gap. (Teemo basic attacks → Rumble basic attacks)
- **0.38** blind: Blinding Dart's blind makes Rumble's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Rumble basic attacks)

### 8. Kayle (net +1.00)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Rumble's (625 vs 125 attack range). Rumble has no dash or blink to close the gap. (Kayle basic attacks → Rumble basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Rumble's The Equalizer (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of The Equalizer. (Kayle R Divine Judgment → Rumble R The Equalizer)

### 9. Lissandra (net +0.99)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rumble's The Equalizer. Untargetable for 2.5 s, long enough to use ahead of The Equalizer. (Lissandra R Frozen Tomb → Rumble R The Equalizer)
- **0.44** range: Lissandra's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Lissandra basic attacks → Rumble basic attacks)

### 10. Lulu (net +0.99)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Rumble's (550 vs 125 attack range). Rumble has no dash or blink to close the gap. (Lulu basic attacks → Rumble basic attacks)
- **0.27** disarm: Whimsy disarms Rumble for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Rumble basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.27 | 1.27 | 0.00 | range (attacks) |
| 2 | Xayah | +1.25 | 1.25 | 0.00 | range (attacks) |
| 3 | Elise | +1.20 | 1.20 | 0.00 | range (attacks) |
| 4 | Yuumi | +1.19 | 1.19 | 0.00 | range (attacks) |
| 5 | Kindred | +1.16 | 1.16 | 0.00 | range (attacks) |
| 6 | Aurora | +1.06 | 1.06 | 0.00 | range (attacks) |
| 7 | Teemo | +1.06 | 1.06 | 0.00 | range (attacks) |
| 8 | Kayle | +1.00 | 1.00 | 0.00 | range (attacks) |
| 9 | Lissandra | +0.99 | 0.99 | 0.00 |  |
| 10 | Lulu | +0.99 | 0.99 | 0.00 | range (attacks) |
| 11 | Sivir | +0.94 | 0.94 | 0.00 | range (attacks) |
| 12 | Vladimir | +0.91 | 0.91 | 0.00 |  |
| 13 | Milio | +0.88 | 0.88 | 0.00 | range (attacks) |
| 14 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 15 | Aphelios | +0.86 | 0.86 | 0.00 | range (attacks) |
| 16 | Samira | +0.86 | 0.86 | 0.00 | range (attacks) |
| 17 | Twisted Fate | +0.86 | 0.86 | 0.00 | range (attacks) |
| 18 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 19 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 20 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 21 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 22 | Mel | +0.77 | 0.77 | 0.00 | range (attacks) |
| 23 | Quinn | +0.77 | 0.77 | 0.00 | range (attacks) |
| 24 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 25 | Kalista | +0.76 | 0.76 | 0.00 | range (attacks) |
| 26 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Caitlyn | +0.72 | 0.72 | 0.00 | range (attacks) |
| 28 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 29 | Janna | +0.72 | 0.72 | 0.00 | range (attacks) |
| 30 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 31 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 32 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 33 | Master Yi | +0.71 | 0.71 | 0.00 |  |
| 34 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 35 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 36 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 37 | Miss Fortune | +0.65 | 0.65 | 0.00 | range (attacks) |
| 38 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 44 | Corki | +0.60 | 0.60 | 0.00 | range (attacks) |
| 45 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 46 | Fiora | +0.59 | 0.59 | 0.00 |  |
| 47 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 48 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 50 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 51 | Morgana | +0.57 | 0.57 | 0.00 |  |
| 52 | Ekko | +0.55 | 0.55 | 0.00 |  |
| 53 | Evelynn | +0.55 | 0.55 | 0.00 |  |
| 54 | Gwen | +0.55 | 0.55 | 0.00 |  |
| 55 | Kayn | +0.55 | 0.55 | 0.00 |  |
| 56 | Maokai | +0.55 | 0.55 | 0.00 |  |
| 57 | Rek'Sai | +0.55 | 0.55 | 0.00 |  |
| 58 | Shaco | +0.55 | 0.55 | 0.00 |  |
| 59 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 60 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Jhin | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 63 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 64 | Taliyah | +0.53 | 0.53 | 0.00 | range (attacks) |
| 65 | Varus | +0.53 | 0.53 | 0.00 | range (attacks) |
| 66 | Vel'Koz | +0.53 | 0.53 | 0.00 | range (attacks) |
| 67 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 68 | Xerath | +0.53 | 0.53 | 0.00 | range (attacks) |
| 69 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 70 | Nilah | +0.52 | 0.52 | 0.00 |  |
| 71 | Camille | +0.51 | 0.51 | 0.00 |  |
| 72 | Malzahar | +0.51 | 0.51 | 0.00 |  |
| 73 | Graves | +0.49 | 0.49 | 0.00 |  |
| 74 | Heimerdinger | +0.49 | 0.49 | 0.00 |  |
| 75 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 76 | Ryze | +0.48 | 0.48 | 0.00 |  |
| 77 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 78 | Zed | +0.48 | 0.48 | 0.00 |  |
| 79 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 80 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 81 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 82 | Annie | +0.44 | 0.44 | 0.00 |  |
| 83 | Aurelion Sol | +0.44 | 0.44 | 0.00 |  |
| 84 | Brand | +0.44 | 0.44 | 0.00 |  |
| 85 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 86 | Karma | +0.44 | 0.44 | 0.00 |  |
| 87 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 88 | Nami | +0.44 | 0.44 | 0.00 |  |
| 89 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 90 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 91 | Swain | +0.42 | 0.42 | 0.00 |  |
| 92 | Kled | +0.41 | 0.41 | 0.00 |  |
| 93 | Fiddlesticks | +0.39 | 0.39 | 0.00 |  |
| 94 | Karthus | +0.39 | 0.39 | 0.00 |  |
| 95 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 96 | Braum | +0.38 | 0.38 | 0.00 |  |
| 97 | Ivern | +0.38 | 0.38 | 0.00 |  |
| 98 | Jax | +0.31 | 0.31 | 0.00 |  |
| 99 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 100 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 101 | Rammus | +0.29 | 0.29 | 0.00 |  |
| 102 | Shen | +0.29 | 0.29 | 0.00 |  |
| 103 | Pantheon | +0.28 | 0.28 | 0.00 |  |
| 104 | Yasuo | +0.28 | 0.28 | 0.00 |  |
| 105 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 106 | Xin Zhao | +0.24 | 0.24 | 0.00 |  |
| 107 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 108 | Taric | +0.22 | 0.22 | 0.00 |  |
| 109 | Garen | +0.21 | 0.21 | 0.00 |  |
| 110 | Nunu & Willump | +0.20 | 0.20 | 0.00 |  |
| 111 | Udyr | +0.20 | 0.20 | 0.00 |  |
| 112 | Malphite | +0.19 | 0.19 | 0.00 |  |
| 113 | Viego | +0.19 | 0.19 | 0.00 |  |
| 114 | Olaf | +0.17 | 0.17 | 0.00 |  |
| 115 | Sion | +0.17 | 0.17 | 0.00 |  |
| 116 | Warwick | +0.17 | 0.17 | 0.00 |  |
| 117 | Zaahen | +0.17 | 0.17 | 0.00 |  |
| 118 | Rengar | +0.15 | 0.15 | 0.00 |  |
| 119 | Gangplank | +0.14 | 0.14 | 0.00 |  |
| 120 | Alistar | +0.13 | 0.13 | 0.00 |  |
| 121 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 122 | Skarner | +0.10 | 0.10 | 0.00 |  |
| 123 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 124 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 125 | Akali | 0.00 | 0.00 | 0.00 |  |
| 126 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 127 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 128 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 129 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 130 | Briar | 0.00 | 0.00 | 0.00 |  |
| 131 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 132 | Darius | 0.00 | 0.00 | 0.00 |  |
| 133 | Diana | 0.00 | 0.00 | 0.00 |  |
| 134 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 135 | Fizz | 0.00 | 0.00 | 0.00 |  |
| 136 | Galio | 0.00 | 0.00 | 0.00 |  |
| 137 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 138 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 139 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 140 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Katarina | 0.00 | 0.00 | 0.00 |  |
| 143 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 144 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 145 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 146 | Leona | 0.00 | 0.00 | 0.00 |  |
| 147 | Locke | 0.00 | 0.00 | 0.00 |  |
| 148 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 149 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 150 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 151 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 152 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 153 | Poppy | 0.00 | 0.00 | 0.00 |  |
| 154 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 155 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 156 | Rell | 0.00 | 0.00 | 0.00 |  |
| 157 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 158 | Riven | 0.00 | 0.00 | 0.00 |  |
| 159 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 160 | Sett | 0.00 | 0.00 | 0.00 |  |
| 161 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 162 | Singed | 0.00 | 0.00 | 0.00 |  |
| 163 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 164 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 165 | Talon | 0.00 | 0.00 | 0.00 |  |
| 166 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 167 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 168 | Vi | 0.00 | 0.00 | 0.00 |  |
| 169 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 170 | Yone | 0.00 | 0.00 | 0.00 |  |
| 171 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 172 | Zac | 0.00 | 0.00 | 0.00 |  |
