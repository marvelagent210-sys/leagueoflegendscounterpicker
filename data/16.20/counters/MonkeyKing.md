# Counters to Wukong (patch 26.20)

Every champion ranked by what its kit does against Wukong's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Wukong's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> MonkeyKing` for the full ledger of a matchup, with sources.

## Top 10

### 1. Bard (net +1.19)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Wukong's Cyclone. Untargetable for 2.5 s, long enough to use ahead of Cyclone. (Bard R Tempered Fate → Wukong R Cyclone)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2.5 s, long enough to use ahead of Nimbus Strike. (Bard R Tempered Fate → Wukong E Nimbus Strike)
- **0.21** range: Bard's basic attacks reach 325 units farther than Wukong's (500 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Bard basic attacks → Wukong basic attacks)

### 2. Lissandra (net +1.19)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Wukong's Cyclone. Untargetable for 2.5 s, long enough to use ahead of Cyclone. (Lissandra R Frozen Tomb → Wukong R Cyclone)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2.5 s, long enough to use ahead of Nimbus Strike. (Lissandra R Frozen Tomb → Wukong E Nimbus Strike)
- **0.21** dash stop: Frozen Tomb's knockdown can stop Wukong's Warrior Trickster mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Wukong W Warrior Trickster)

### 3. Xayah (net +1.15)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Wukong's Cyclone. Untargetable for 1.5 s, long enough to use ahead of Cyclone. (Xayah R Featherstorm → Wukong R Cyclone)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Wukong's Nimbus Strike. Untargetable for 1.5 s, long enough to use ahead of Nimbus Strike. (Xayah R Featherstorm → Wukong E Nimbus Strike)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Wukong's (525 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Xayah basic attacks → Wukong basic attacks)

### 4. Vladimir (net +1.12)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Wukong's Cyclone. Untargetable for 2 s, long enough to use ahead of Cyclone. (Vladimir W Sanguine Pool → Wukong R Cyclone)
- **0.53** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Wukong's Nimbus Strike. Untargetable for 2 s, long enough to use ahead of Nimbus Strike. (Vladimir W Sanguine Pool → Wukong E Nimbus Strike)
- **0.10** range: Vladimir's basic attacks reach 275 units farther than Wukong's (450 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Vladimir basic attacks → Wukong basic attacks)
- Watch out: Cyclone's airborne interrupts Vladimir's Tides of Blood (charge-up).

### 5. Morgana (net +1.11)

- **0.80** cc immunity: Black Shield makes Morgana immune to Wukong's Cyclone (airborne). Immune for 5 s, long enough to use ahead of Cyclone. (Morgana E Black Shield → Wukong R Cyclone)
- **0.20** reveal: Soul Shackles reveals Wukong through Warrior Trickster's stealth. (Morgana R Soul Shackles → Wukong W Warrior Trickster)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Wukong's (450 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Morgana basic attacks → Wukong basic attacks)

### 6. Rek'Sai (net +1.05)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Wukong's Cyclone. Untargetable for 1.5 s, long enough to use ahead of Cyclone. (Rek'Sai R Void Rush → Wukong R Cyclone)
- **0.36** untargetable: Void Rush makes Rek'Sai untargetable, dodging Wukong's Nimbus Strike. Untargetable for 1.5 s, long enough to use ahead of Nimbus Strike. (Rek'Sai R Void Rush → Wukong E Nimbus Strike)
- **0.20** reveal: Void Rush reveals Wukong through Warrior Trickster's stealth. (Rek'Sai R Void Rush → Wukong W Warrior Trickster)

### 7. Elise (net +1.03)

- **0.48** untargetable: Rappel makes Elise untargetable, dodging Wukong's Cyclone. Untargetable for 0.6 s; Cyclone lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Wukong R Cyclone)
- **0.30** untargetable: Rappel makes Elise untargetable, dodging Wukong's Nimbus Strike. Untargetable for 0.6 s; Nimbus Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Wukong E Nimbus Strike)
- **0.20** range: Elise's basic attacks reach 375 units farther than Wukong's (550 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Elise basic attacks → Wukong basic attacks)

### 8. Teemo (net +1.00)

- **0.66** blind: Blinding Dart's blind makes Wukong's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Wukong basic attacks)
- **0.30** blind: Blinding Dart's blind makes Wukong's Crushing Blow, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Wukong Q Crushing Blow)
- **0.19** range: Teemo's basic attacks reach 325 units farther than Wukong's (500 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Teemo basic attacks → Wukong basic attacks)

### 9. Vex (net +0.99)

- **0.40** dash stop: Doom 'n Gloom's knockdown can stop Wukong's Warrior Trickster mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Wukong W Warrior Trickster)
- **0.27** dash stop: Doom 'n Gloom's knockdown can stop Wukong's Nimbus Strike mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Vex I Doom 'n Gloom → Wukong E Nimbus Strike)
- **0.20** reveal: Shadow Surge reveals Wukong through Warrior Trickster's stealth. (Vex R Shadow Surge → Wukong W Warrior Trickster)

### 10. Sivir (net +0.98)

- **0.51** spell shield: Spell Shield's spell shield blocks Wukong's Nimbus Strike. Spell shield for 1.5 s, long enough to use ahead of Nimbus Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Wukong E Nimbus Strike)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Wukong's Cyclone. Spell shield for 1.5 s, long enough to use ahead of Cyclone. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block one instance of damage.
  - Blocking the knock up will still grant immunity to it from either of Cyclone's casts. (Sivir E Spell Shield → Wukong R Cyclone)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Wukong's (500 vs 175 attack range). Wukong closes the gap with Nimbus Strike, Warrior Trickster. (Sivir basic attacks → Wukong basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Bard | +1.19 | 1.19 | 0.00 |  |
| 2 | Lissandra | +1.19 | 1.19 | 0.00 |  |
| 3 | Xayah | +1.15 | 1.15 | 0.00 |  |
| 4 | Vladimir | +1.12 | 1.17 | 0.05 |  |
| 5 | Morgana | +1.11 | 1.11 | 0.00 |  |
| 6 | Rek'Sai | +1.05 | 1.05 | 0.00 |  |
| 7 | Elise | +1.03 | 1.03 | 0.00 |  |
| 8 | Teemo | +1.00 | 1.00 | 0.00 | blind (Blinding Dart) |
| 9 | Vex | +0.99 | 0.99 | 0.00 | dash stop (Doom 'n Gloom) |
| 10 | Sivir | +0.98 | 0.98 | 0.00 |  |
| 11 | Nocturne | +0.96 | 0.96 | 0.00 |  |
| 12 | Hwei | +0.91 | 0.91 | 0.00 | dash stop (Grim Visage) |
| 13 | Lulu | +0.89 | 0.89 | 0.00 | disarm (Whimsy) |
| 14 | Rengar | +0.84 | 0.84 | 0.00 |  |
| 15 | Kayle | +0.82 | 0.82 | 0.00 |  |
| 16 | Olaf | +0.80 | 0.80 | 0.00 |  |
| 17 | Udyr | +0.80 | 0.80 | 0.00 |  |
| 18 | Aurora | +0.78 | 0.78 | 0.00 |  |
| 19 | Fiora | +0.77 | 0.77 | 0.00 |  |
| 20 | Singed | +0.76 | 0.76 | 0.00 |  |
| 21 | Jinx | +0.74 | 0.74 | 0.00 | dash stop (Flame Chompers!) |
| 22 | Viktor | +0.74 | 0.74 | 0.00 | dash stop (Gravity Field) |
| 23 | Kalista | +0.73 | 0.73 | 0.00 |  |
| 24 | Sion | +0.72 | 0.80 | 0.08 |  |
| 25 | Cassiopeia | +0.71 | 0.71 | 0.00 |  |
| 26 | Jax | +0.71 | 0.71 | 0.00 | attack dodge (Counter Strike) |
| 27 | Ahri | +0.69 | 0.69 | 0.00 | dash stop (Charm) |
| 28 | Veigar | +0.69 | 0.69 | 0.00 | dash stop (Event Horizon) |
| 29 | Kled | +0.68 | 0.68 | 0.00 |  |
| 30 | Maokai | +0.68 | 0.68 | 0.00 |  |
| 31 | Pantheon | +0.66 | 0.71 | 0.05 |  |
| 32 | Warwick | +0.64 | 0.82 | 0.18 |  |
| 33 | Alistar | +0.64 | 0.64 | 0.00 |  |
| 34 | Gangplank | +0.64 | 0.64 | 0.00 |  |
| 35 | Camille | +0.63 | 0.63 | 0.00 |  |
| 36 | Gwen | +0.63 | 0.63 | 0.00 |  |
| 37 | Ekko | +0.60 | 0.60 | 0.00 |  |
| 38 | Evelynn | +0.59 | 0.59 | 0.00 |  |
| 39 | Nilah | +0.59 | 0.59 | 0.00 | attack dodge (Jubilant Veil) |
| 40 | Shaco | +0.59 | 0.59 | 0.00 |  |
| 41 | Kindred | +0.58 | 0.58 | 0.00 |  |
| 42 | Zed | +0.56 | 0.56 | 0.00 |  |
| 43 | Xin Zhao | +0.55 | 0.55 | 0.00 |  |
| 44 | Yuumi | +0.52 | 0.90 | 0.38 |  |
| 45 | Master Yi | +0.52 | 0.63 | 0.11 |  |
| 46 | Taric | +0.52 | 0.52 | 0.00 |  |
| 47 | Malzahar | +0.51 | 0.88 | 0.37 |  |
| 48 | Nasus | +0.50 | 0.50 | 0.00 | attack speed slow (Wither) |
| 49 | Malphite | +0.49 | 0.49 | 0.00 |  |
| 50 | Poppy | +0.48 | 0.68 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 51 | Zaahen | +0.48 | 0.48 | 0.00 |  |
| 52 | Yone | +0.46 | 0.46 | 0.00 |  |
| 53 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 54 | Kai'Sa | +0.42 | 0.42 | 0.00 |  |
| 55 | Zac | +0.41 | 0.64 | 0.23 | dash stop (Stretching Strikes) |
| 56 | Nidalee | +0.38 | 0.38 | 0.00 |  |
| 57 | Illaoi | +0.36 | 0.36 | 0.00 |  |
| 58 | Zyra | +0.36 | 0.36 | 0.00 |  |
| 59 | Rammus | +0.35 | 0.50 | 0.15 | attack reflect (Defensive Ball Curl) |
| 60 | Corki | +0.35 | 0.35 | 0.00 |  |
| 61 | Karma | +0.33 | 0.33 | 0.00 |  |
| 62 | LeBlanc | +0.33 | 0.33 | 0.00 |  |
| 63 | K'Sante | +0.32 | 0.32 | 0.00 |  |
| 64 | Thresh | +0.31 | 0.31 | 0.00 |  |
| 65 | Amumu | +0.29 | 0.29 | 0.00 |  |
| 66 | Sett | +0.28 | 0.28 | 0.00 |  |
| 67 | Urgot | +0.28 | 0.28 | 0.00 |  |
| 68 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 69 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 70 | Vayne | +0.27 | 0.27 | 0.00 |  |
| 71 | Mordekaiser | +0.26 | 0.26 | 0.00 |  |
| 72 | Sona | +0.26 | 0.26 | 0.00 |  |
| 73 | Varus | +0.25 | 0.30 | 0.05 |  |
| 74 | Aphelios | +0.24 | 0.24 | 0.00 |  |
| 75 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 76 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 77 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 78 | Shen | +0.23 | 0.68 | 0.45 | attack block (Spirit's Refuge) |
| 79 | Kayn | +0.22 | 0.64 | 0.42 |  |
| 80 | Draven | +0.22 | 0.22 | 0.00 |  |
| 81 | Milio | +0.22 | 0.22 | 0.00 |  |
| 82 | Senna | +0.22 | 0.22 | 0.00 |  |
| 83 | Aatrox | +0.20 | 0.20 | 0.00 |  |
| 84 | Akali | +0.20 | 0.20 | 0.00 |  |
| 85 | Ambessa | +0.20 | 0.20 | 0.00 |  |
| 86 | Briar | +0.20 | 0.20 | 0.00 |  |
| 87 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 88 | Fizz | +0.20 | 0.20 | 0.00 |  |
| 89 | Garen | +0.20 | 0.20 | 0.00 |  |
| 90 | Lee Sin | +0.20 | 0.20 | 0.00 |  |
| 91 | Skarner | +0.20 | 0.20 | 0.00 |  |
| 92 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 93 | Sylas | +0.20 | 0.20 | 0.00 |  |
| 94 | Yasuo | +0.20 | 0.20 | 0.00 |  |
| 95 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 96 | Zoe | +0.20 | 0.20 | 0.00 |  |
| 97 | Gnar | +0.19 | 0.19 | 0.00 |  |
| 98 | Jayce | +0.18 | 0.18 | 0.00 |  |
| 99 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 100 | Lux | +0.18 | 0.18 | 0.00 |  |
| 101 | Samira | +0.18 | 0.18 | 0.00 |  |
| 102 | Hecarim | +0.17 | 0.17 | 0.00 |  |
| 103 | Mel | +0.17 | 0.17 | 0.00 |  |
| 104 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 105 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 106 | Ziggs | +0.17 | 0.17 | 0.00 |  |
| 107 | Caitlyn | +0.16 | 0.44 | 0.28 |  |
| 108 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 109 | Azir | +0.16 | 0.16 | 0.00 |  |
| 110 | Jarvan IV | +0.16 | 0.16 | 0.00 |  |
| 111 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 112 | Orianna | +0.16 | 0.16 | 0.00 |  |
| 113 | Ornn | +0.16 | 0.16 | 0.00 |  |
| 114 | Shyvana | +0.16 | 0.16 | 0.00 |  |
| 115 | Volibear | +0.16 | 0.16 | 0.00 |  |
| 116 | Akshan | +0.15 | 0.39 | 0.24 |  |
| 117 | Annie | +0.15 | 0.15 | 0.00 |  |
| 118 | Brand | +0.14 | 0.14 | 0.00 |  |
| 119 | Graves | +0.14 | 0.14 | 0.00 |  |
| 120 | Nami | +0.14 | 0.14 | 0.00 |  |
| 121 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 122 | Syndra | +0.14 | 0.14 | 0.00 |  |
| 123 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 124 | Swain | +0.12 | 0.12 | 0.00 |  |
| 125 | Twisted Fate | +0.10 | 0.45 | 0.35 |  |
| 126 | Quinn | +0.08 | 0.22 | 0.14 |  |
| 127 | Aurelion Sol | +0.08 | 0.14 | 0.06 |  |
| 128 | Vi | +0.06 | 0.28 | 0.22 |  |
| 129 | Rakan | +0.06 | 0.06 | 0.00 |  |
| 130 | Viego | +0.05 | 0.16 | 0.11 |  |
| 131 | Lillia | +0.05 | 0.05 | 0.00 |  |
| 132 | Ivern | +0.04 | 0.11 | 0.07 |  |
| 133 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 134 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 135 | Braum | 0.00 | 0.00 | 0.00 |  |
| 136 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 137 | Darius | 0.00 | 0.00 | 0.00 |  |
| 138 | Diana | 0.00 | 0.00 | 0.00 |  |
| 139 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 140 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | Leona | 0.00 | 0.00 | 0.00 |  |
| 144 | Locke | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Talon | 0.00 | 0.00 | 0.00 |  |
| 153 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 154 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 155 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 156 | Fiddlesticks | -0.07 | 0.31 | 0.38 |  |
| 157 | Lucian | -0.07 | 0.21 | 0.28 |  |
| 158 | Katarina | -0.07 | 0.12 | 0.19 |  |
| 159 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Galio | -0.09 | 0.00 | 0.09 |  |
| 162 | Vel'Koz | -0.10 | 0.16 | 0.26 |  |
| 163 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 164 | Jhin | -0.11 | 0.17 | 0.28 |  |
| 165 | Xerath | -0.15 | 0.16 | 0.31 |  |
| 166 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 167 | Janna | -0.18 | 0.22 | 0.40 |  |
| 168 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 169 | Naafiri | -0.22 | 0.20 | 0.42 |  |
| 170 | Tahm Kench | -0.26 | 0.00 | 0.26 |  |
| 171 | Taliyah | -0.32 | 0.16 | 0.48 |  |
| 172 | Nunu & Willump | -0.37 | 0.00 | 0.37 |  |
