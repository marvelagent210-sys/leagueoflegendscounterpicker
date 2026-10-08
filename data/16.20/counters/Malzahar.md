# Counters to Malzahar (patch 26.20)

Every champion ranked by what its kit does against Malzahar's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Malzahar's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Malzahar` for the full ledger of a matchup, with sources.

## Top 10

### 1. Vladimir (net +0.83)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Nether Grasp. Untargetable for 2 s, long enough to use ahead of Nether Grasp. (Vladimir W Sanguine Pool → Malzahar R Nether Grasp)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Malefic Visions. Untargetable for 2 s, long enough to use ahead of Malefic Visions. (Vladimir W Sanguine Pool → Malzahar E Malefic Visions)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Malzahar's Call of the Void. Untargetable for 2 s, long enough to use ahead of Call of the Void. (Vladimir W Sanguine Pool → Malzahar Q Call of the Void)
- Watch out: Call of the Void's silence interrupts Vladimir's Tides of Blood (charge-up).

### 2. Kayle (net +0.69)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Malzahar's Nether Grasp (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nether Grasp. (Kayle R Divine Judgment → Malzahar R Nether Grasp)
- **0.22** range: Kayle's basic attacks reach 125 units farther than Malzahar's (625 vs 500 attack range). Malzahar has no dash or blink to close the gap. (Kayle basic attacks → Malzahar basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Malzahar's Malefic Visions. Invulnerable for 2.5 s, long enough to use ahead of Malefic Visions. (Kayle R Divine Judgment → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Kayle's Radiant Blast (slow).

### 3. Rek'Sai (net +0.64)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Malzahar's Nether Grasp. Untargetable for 1.5 s, long enough to use ahead of Nether Grasp. (Rek'Sai R Void Rush → Malzahar R Nether Grasp)
- **0.40** interrupt: Unburrow's airborne interrupts Malzahar's Nether Grasp (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Malzahar R Nether Grasp)
- **0.20** untargetable: Void Rush makes Rek'Sai untargetable, dodging Malzahar's Malefic Visions. Untargetable for 1.5 s, long enough to use ahead of Malefic Visions. (Rek'Sai R Void Rush → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Rek'Sai's Unburrow (airborne).

### 4. Elise (net +0.61)

- **0.48** untargetable: Rappel makes Elise untargetable, dodging Malzahar's Nether Grasp. Untargetable for 0.6 s; Nether Grasp lands within 0.01 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Malzahar R Nether Grasp)
- **0.40** interrupt: Cocoon's stun interrupts Malzahar's Nether Grasp (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Malzahar R Nether Grasp)
- **0.28** untargetable: Rappel makes Elise untargetable, dodging Malzahar's Malefic Visions. Untargetable for 0.6 s; Malefic Visions takes 0.25 s to land, enough to react. (Elise E Rappel → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Elise's Cocoon (stun).

### 5. Sivir (net +0.61)

- **0.40** spell shield: Spell Shield's spell shield blocks part of Malzahar's Nether Grasp. Spell shield for 1.5 s, long enough to use ahead of Nether Grasp. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents both the tether and the Null Zone from appearing, however Malzahar will continue to channel. [https://www.reddit.com/r/Sivir/comments/g7yt38/if_you_shield_malzahar_ult_he_ironically_gets_ccd/]. (Sivir E Spell Shield → Malzahar R Nether Grasp)
- **0.28** spell shield: Spell Shield's spell shield blocks Malzahar's Malefic Visions. Spell shield for 1.5 s, long enough to use ahead of Malefic Visions. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malzahar E Malefic Visions)
- **0.27** spell shield: Spell Shield's spell shield blocks Malzahar's Call of the Void. Spell shield for 1.5 s, long enough to use ahead of Call of the Void. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Malzahar Q Call of the Void)

### 6. Milio (net +0.60)

- **0.49** cleanse: Breath of Life cleanses Malzahar's Nether Grasp (suppression) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Malzahar R Nether Grasp)
- **0.40** interrupt: Ultra Mega Fire Kick's airborne interrupts Malzahar's Nether Grasp (normal channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Malzahar R Nether Grasp)
- **0.09** cleanse: Breath of Life cleanses Malzahar's Call of the Void (silence) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

### 7. Xayah (net +0.50)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Nether Grasp. Untargetable for 1.5 s, long enough to use ahead of Nether Grasp. (Xayah R Featherstorm → Malzahar R Nether Grasp)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Malefic Visions. Untargetable for 1.5 s, long enough to use ahead of Malefic Visions. (Xayah R Featherstorm → Malzahar E Malefic Visions)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Malzahar's Call of the Void. Untargetable for 1.5 s, long enough to use ahead of Call of the Void. (Xayah R Featherstorm → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Xayah's Bladecaller (root).

### 8. Nocturne (net +0.48)

- **0.40** interrupt: Unspeakable Horror's fear interrupts Malzahar's Nether Grasp (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Malzahar R Nether Grasp)
- **0.40** spell shield: Shroud of Darkness's spell shield blocks part of Malzahar's Nether Grasp. Spell shield for 1.5 s, long enough to use ahead of Nether Grasp. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents both the tether and the Null Zone from appearing, however Malzahar will continue to channel. [https://www.reddit.com/r/Sivir/comments/g7yt38/if_you_shield_malzahar_ult_he_ironically_gets_ccd/]. (Nocturne W Shroud of Darkness → Malzahar R Nether Grasp)
- **0.34** spell shield: Shroud of Darkness's spell shield blocks Malzahar's Malefic Visions. Spell shield for 1.5 s, long enough to use ahead of Malefic Visions. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Nocturne's Unspeakable Horror (fear, slow).

### 9. Lissandra (net +0.48)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malzahar's Nether Grasp. Untargetable for 2.5 s, long enough to use ahead of Nether Grasp. (Lissandra R Frozen Tomb → Malzahar R Nether Grasp)
- **0.40** interrupt: Frozen Tomb's stun interrupts Malzahar's Nether Grasp (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Malzahar R Nether Grasp)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Malzahar's Malefic Visions. Untargetable for 2.5 s, long enough to use ahead of Malefic Visions. (Lissandra R Frozen Tomb → Malzahar E Malefic Visions)
- Watch out: Void Shift makes Malzahar immune to Lissandra's Frozen Tomb (knockdown, slow, stun).

### 10. Morgana (net +0.40)

- **0.80** cc immunity: Black Shield makes Morgana immune to Malzahar's Nether Grasp (knockdown, suppression). Immune for 5 s, long enough to use ahead of Nether Grasp. (Morgana E Black Shield → Malzahar R Nether Grasp)
- **0.17** cc immunity: Black Shield makes Morgana immune to Malzahar's Call of the Void (silence). Immune for 5 s, long enough to use ahead of Call of the Void. (Morgana E Black Shield → Malzahar Q Call of the Void)
- Watch out: Void Shift makes Malzahar immune to Morgana's Dark Binding (root).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.83 | 1.02 | 0.19 |  |
| 2 | Kayle | +0.69 | 0.75 | 0.06 |  |
| 3 | Rek'Sai | +0.64 | 1.36 | 0.72 |  |
| 4 | Elise | +0.61 | 1.09 | 0.48 |  |
| 5 | Sivir | +0.61 | 0.61 | 0.00 |  |
| 6 | Milio | +0.60 | 0.95 | 0.35 |  |
| 7 | Xayah | +0.50 | 0.85 | 0.35 |  |
| 8 | Nocturne | +0.48 | 1.10 | 0.62 |  |
| 9 | Lissandra | +0.48 | 1.08 | 0.60 |  |
| 10 | Morgana | +0.40 | 0.89 | 0.49 |  |
| 11 | Bard | +0.39 | 1.08 | 0.69 |  |
| 12 | Olaf | +0.39 | 0.86 | 0.47 |  |
| 13 | Zed | +0.36 | 0.57 | 0.21 |  |
| 14 | Udyr | +0.32 | 1.07 | 0.75 |  |
| 15 | Evelynn | +0.31 | 1.03 | 0.72 |  |
| 16 | Shaco | +0.31 | 1.03 | 0.72 |  |
| 17 | Master Yi | +0.28 | 0.69 | 0.41 |  |
| 18 | Annie | +0.26 | 0.54 | 0.28 |  |
| 19 | Yuumi | +0.25 | 0.82 | 0.57 |  |
| 20 | Gwen | +0.24 | 0.69 | 0.45 |  |
| 21 | Fiora | +0.21 | 0.81 | 0.60 |  |
| 22 | Gangplank | +0.20 | 0.71 | 0.51 |  |
| 23 | Aurora | +0.18 | 0.58 | 0.40 |  |
| 24 | Ashe | +0.16 | 0.58 | 0.42 |  |
| 25 | Maokai | +0.15 | 1.15 | 1.00 |  |
| 26 | Vex | +0.14 | 0.45 | 0.31 |  |
| 27 | Sion | +0.13 | 1.26 | 1.13 |  |
| 28 | Zaahen | +0.12 | 0.94 | 0.82 |  |
| 29 | Taric | +0.12 | 0.85 | 0.73 |  |
| 30 | Tristana | +0.12 | 0.71 | 0.59 |  |
| 31 | Lulu | +0.12 | 0.61 | 0.49 |  |
| 32 | Kennen | +0.12 | 0.40 | 0.28 |  |
| 33 | Kindred | +0.12 | 0.32 | 0.20 |  |
| 34 | Kalista | +0.07 | 0.69 | 0.62 |  |
| 35 | Ekko | +0.06 | 0.64 | 0.58 |  |
| 36 | Draven | +0.05 | 0.40 | 0.35 |  |
| 37 | Veigar | +0.05 | 0.40 | 0.35 |  |
| 38 | Zoe | +0.05 | 0.40 | 0.35 |  |
| 39 | Kassadin | +0.04 | 0.40 | 0.36 |  |
| 40 | Alistar | +0.03 | 1.09 | 1.06 |  |
| 41 | Teemo | +0.03 | 0.29 | 0.26 |  |
| 42 | Syndra | +0.02 | 0.40 | 0.38 |  |
| 43 | Zilean | +0.02 | 0.40 | 0.38 |  |
| 44 | Brand | +0.01 | 0.40 | 0.39 |  |
| 45 | Soraka | +0.01 | 0.40 | 0.39 |  |
| 46 | Swain | 0.00 | 0.40 | 0.40 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Anivia | -0.02 | 0.52 | 0.54 |  |
| 49 | Garen | -0.03 | 0.47 | 0.50 |  |
| 50 | Orianna | -0.03 | 0.40 | 0.43 |  |
| 51 | Viktor | -0.04 | 0.40 | 0.44 |  |
| 52 | Sona | -0.05 | 0.35 | 0.40 |  |
| 53 | Kog'Maw | -0.06 | 0.00 | 0.06 |  |
| 54 | Kayn | -0.07 | 1.03 | 1.10 |  |
| 55 | Corki | -0.07 | 0.43 | 0.50 |  |
| 56 | Cassiopeia | -0.07 | 0.40 | 0.47 |  |
| 57 | Yunara | -0.09 | 0.14 | 0.23 |  |
| 58 | Xin Zhao | -0.10 | 0.88 | 0.98 |  |
| 59 | Smolder | -0.10 | 0.00 | 0.10 |  |
| 60 | Zyra | -0.11 | 0.46 | 0.57 |  |
| 61 | Heimerdinger | -0.12 | 0.40 | 0.52 |  |
| 62 | Jayce | -0.12 | 0.40 | 0.52 |  |
| 63 | Nidalee | -0.13 | 0.00 | 0.13 |  |
| 64 | Nilah | -0.15 | 0.60 | 0.75 |  |
| 65 | Kled | -0.17 | 0.86 | 1.03 |  |
| 66 | Nami | -0.17 | 0.40 | 0.57 |  |
| 67 | Seraphine | -0.17 | 0.40 | 0.57 |  |
| 68 | Vayne | -0.17 | 0.40 | 0.57 |  |
| 69 | Mel | -0.17 | 0.18 | 0.35 |  |
| 70 | Twitch | -0.17 | 0.00 | 0.17 |  |
| 71 | Renata Glasc | -0.19 | 0.40 | 0.59 |  |
| 72 | Camille | -0.20 | 1.01 | 1.21 |  |
| 73 | Hwei | -0.20 | 0.40 | 0.60 |  |
| 74 | Jax | -0.22 | 0.52 | 0.74 |  |
| 75 | Zeri | -0.22 | 0.00 | 0.22 |  |
| 76 | Warwick | -0.23 | 0.99 | 1.22 |  |
| 77 | Braum | -0.24 | 0.71 | 0.95 |  |
| 78 | Malphite | -0.24 | 0.52 | 0.76 |  |
| 79 | Samira | -0.24 | 0.19 | 0.43 |  |
| 80 | Nasus | -0.25 | 0.22 | 0.47 |  |
| 81 | Rengar | -0.26 | 0.72 | 0.98 |  |
| 82 | Azir | -0.26 | 0.37 | 0.63 |  |
| 83 | Ziggs | -0.27 | 0.40 | 0.67 |  |
| 84 | Vel'Koz | -0.28 | 0.40 | 0.68 |  |
| 85 | Shyvana | -0.29 | 0.43 | 0.72 |  |
| 86 | Pantheon | -0.30 | 0.58 | 0.88 |  |
| 87 | Mordekaiser | -0.30 | 0.45 | 0.75 |  |
| 88 | Ahri | -0.30 | 0.40 | 0.70 |  |
| 89 | Twisted Fate | -0.30 | 0.40 | 0.70 |  |
| 90 | Xerath | -0.31 | 0.40 | 0.71 |  |
| 91 | Neeko | -0.32 | 0.37 | 0.69 |  |
| 92 | Illaoi | -0.32 | 0.05 | 0.37 |  |
| 93 | Irelia | -0.33 | 0.40 | 0.73 |  |
| 94 | Senna | -0.33 | 0.16 | 0.49 |  |
| 95 | Darius | -0.34 | 0.40 | 0.74 |  |
| 96 | Yorick | -0.34 | 0.40 | 0.74 |  |
| 97 | Hecarim | -0.34 | 0.38 | 0.72 |  |
| 98 | Lillia | -0.34 | 0.33 | 0.67 |  |
| 99 | Karthus | -0.34 | 0.00 | 0.34 |  |
| 100 | Miss Fortune | -0.34 | 0.00 | 0.34 |  |
| 101 | Renekton | -0.35 | 0.40 | 0.75 |  |
| 102 | Trundle | -0.35 | 0.40 | 0.75 |  |
| 103 | Yasuo | -0.36 | 0.64 | 1.00 |  |
| 104 | Volibear | -0.37 | 0.45 | 0.82 |  |
| 105 | Bel'Veth | -0.38 | 0.40 | 0.78 |  |
| 106 | Kai'Sa | -0.38 | 0.00 | 0.38 |  |
| 107 | Lux | -0.38 | 0.00 | 0.38 |  |
| 108 | Diana | -0.39 | 0.40 | 0.79 |  |
| 109 | Jinx | -0.39 | 0.00 | 0.39 |  |
| 110 | Fizz | -0.42 | 0.40 | 0.82 |  |
| 111 | Tryndamere | -0.42 | 0.00 | 0.42 |  |
| 112 | Aatrox | -0.43 | 0.40 | 0.83 |  |
| 113 | Singed | -0.43 | 0.40 | 0.83 |  |
| 114 | Lucian | -0.43 | 0.00 | 0.43 |  |
| 115 | Sett | -0.44 | 0.45 | 0.89 |  |
| 116 | Gnar | -0.44 | 0.40 | 0.84 |  |
| 117 | Varus | -0.44 | 0.10 | 0.54 |  |
| 118 | LeBlanc | -0.44 | 0.00 | 0.44 |  |
| 119 | Cho'Gath | -0.45 | 0.40 | 0.85 |  |
| 120 | Lee Sin | -0.45 | 0.40 | 0.85 |  |
| 121 | Thresh | -0.46 | 0.40 | 0.86 |  |
| 122 | Ambessa | -0.47 | 0.35 | 0.82 |  |
| 123 | Graves | -0.47 | 0.00 | 0.47 |  |
| 124 | Dr. Mundo | -0.48 | 0.00 | 0.48 |  |
| 125 | Fiddlesticks | -0.49 | 0.40 | 0.89 |  |
| 126 | Quinn | -0.49 | 0.40 | 0.89 |  |
| 127 | Karma | -0.49 | 0.00 | 0.49 |  |
| 128 | Katarina | -0.49 | 0.00 | 0.49 |  |
| 129 | Akshan | -0.50 | 0.00 | 0.50 |  |
| 130 | Locke | -0.50 | 0.00 | 0.50 |  |
| 131 | Wukong | -0.51 | 0.37 | 0.88 |  |
| 132 | Rumble | -0.51 | 0.00 | 0.51 |  |
| 133 | Aurelion Sol | -0.52 | 0.35 | 0.87 |  |
| 134 | Talon | -0.52 | 0.00 | 0.52 |  |
| 135 | Urgot | -0.54 | 0.40 | 0.94 |  |
| 136 | Caitlyn | -0.54 | 0.27 | 0.81 |  |
| 137 | Skarner | -0.55 | 0.37 | 0.92 |  |
| 138 | Blitzcrank | -0.58 | 0.40 | 0.98 |  |
| 139 | Janna | -0.59 | 0.40 | 0.99 |  |
| 140 | Aphelios | -0.59 | 0.00 | 0.59 |  |
| 141 | Sylas | -0.60 | 0.40 | 1.00 |  |
| 142 | Kha'Zix | -0.60 | 0.00 | 0.60 |  |
| 143 | Yone | -0.61 | 0.45 | 1.06 |  |
| 144 | K'Sante | -0.63 | 0.50 | 1.13 |  |
| 145 | Jarvan IV | -0.64 | 0.40 | 1.04 |  |
| 146 | Rammus | -0.65 | 0.62 | 1.27 |  |
| 147 | Nautilus | -0.65 | 0.40 | 1.05 |  |
| 148 | Jhin | -0.68 | 0.00 | 0.68 |  |
| 149 | Qiyana | -0.70 | 0.32 | 1.02 |  |
| 150 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 151 | Akali | -0.71 | 0.00 | 0.71 |  |
| 152 | Shen | -0.74 | 0.62 | 1.36 |  |
| 153 | Briar | -0.74 | 0.40 | 1.14 |  |
| 154 | Rakan | -0.74 | 0.37 | 1.11 |  |
| 155 | Amumu | -0.76 | 0.40 | 1.16 |  |
| 156 | Riven | -0.76 | 0.40 | 1.16 |  |
| 157 | Ivern | -0.81 | 0.00 | 0.81 |  |
| 158 | Leona | -0.82 | 0.40 | 1.22 |  |
| 159 | Sejuani | -0.85 | 0.40 | 1.25 |  |
| 160 | Galio | -0.86 | 0.40 | 1.26 |  |
| 161 | Poppy | -0.87 | 0.35 | 1.22 |  |
| 162 | Pyke | -0.88 | 0.40 | 1.28 |  |
| 163 | Viego | -0.94 | 0.43 | 1.37 |  |
| 164 | Rell | -0.94 | 0.40 | 1.34 |  |
| 165 | Tahm Kench | -0.97 | 0.40 | 1.37 |  |
| 166 | Gragas | -0.98 | 0.40 | 1.38 |  |
| 167 | Nunu & Willump | -1.04 | 0.40 | 1.44 |  |
| 168 | Ornn | -1.06 | 0.45 | 1.51 |  |
| 169 | Vi | -1.16 | 0.45 | 1.61 |  |
| 170 | Naafiri | -1.20 | 0.00 | 1.20 |  |
| 171 | Zac | -1.30 | 0.40 | 1.70 |  |
| 172 | Taliyah | -1.31 | 0.40 | 1.71 |  |
