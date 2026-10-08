# Counters to Xerath (patch 26.20)

Every champion ranked by what its kit does against Xerath's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Xerath's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Xerath` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.03)

- **0.54** untargetable: Rappel makes Elise untargetable, dodging Xerath's Shocking Orb. Untargetable for 0.6 s; Shocking Orb takes 1.05 s to land, enough to react. (Elise E Rappel → Xerath E Shocking Orb)
- **0.33** untargetable: Rappel makes Elise untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 0.6 s; Rite of the Arcane lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Xerath R Rite of the Arcane)
- **0.28** interrupt: Cocoon's stun interrupts Xerath's Rite of the Arcane (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Xerath R Rite of the Arcane)

### 2. Nocturne (net +0.99)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Xerath's Shocking Orb. Spell shield for 1.5 s, long enough to use ahead of Shocking Orb. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xerath E Shocking Orb)
- **0.55** spell shield: Shroud of Darkness's spell shield blocks Xerath's Rite of the Arcane. Spell shield for 1.5 s, long enough to use ahead of Rite of the Arcane. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Xerath R Rite of the Arcane)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Xerath's Rite of the Arcane (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

### 3. Braum (net +0.94)

- **0.70** projectile block: Unbreakable blocks Xerath's Shocking Orb, a projectile. Unbreakable for 4 s, long enough to use ahead of Shocking Orb. (Braum E Unbreakable → Xerath E Shocking Orb)
- **0.37** projectile block: Unbreakable blocks Xerath's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Xerath basic attacks)
- **0.28** interrupt: Concussive Blows's stun interrupts Xerath's Rite of the Arcane (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 4. Maokai (net +0.93)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Xerath's Shocking Orb. Untargetable for 1.4 s; Shocking Orb takes 1.05 s to land, enough to react. (Maokai W Twisted Advance → Xerath E Shocking Orb)
- **0.33** untargetable: Twisted Advance makes Maokai untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 1.4 s; Rite of the Arcane lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Xerath R Rite of the Arcane)
- **0.28** interrupt: Bramble Smash's airborne interrupts Xerath's Rite of the Arcane (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 5. Rek'Sai (net +0.90)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 1.5 s, long enough to use ahead of Rite of the Arcane. (Rek'Sai R Void Rush → Xerath R Rite of the Arcane)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Xerath's Shocking Orb. Untargetable for 1.5 s, long enough to use ahead of Shocking Orb. (Rek'Sai R Void Rush → Xerath E Shocking Orb)
- **0.28** interrupt: Unburrow's airborne interrupts Xerath's Rite of the Arcane (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### 6. Yasuo (net +0.87)

- **0.55** projectile block: Wind Wall blocks Xerath's Shocking Orb, a projectile. Wind Wall for 4 s, long enough to use ahead of Shocking Orb. (Yasuo W Wind Wall → Xerath E Shocking Orb)
- **0.29** projectile block: Wind Wall blocks Xerath's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Xerath basic attacks)
- **0.28** interrupt: Steel Tempest's airborne interrupts Xerath's Rite of the Arcane (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Xerath R Rite of the Arcane)
- Watch out: Xerath's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

### 7. Kayle (net +0.82)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Xerath's Rite of the Arcane. Invulnerable for 2.5 s, long enough to use ahead of Rite of the Arcane. (Kayle R Divine Judgment → Xerath R Rite of the Arcane)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Xerath's (625 vs 525 attack range). Xerath has no dash or blink to close the gap. (Kayle basic attacks → Xerath basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Xerath's Shocking Orb (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Shocking Orb. (Kayle R Divine Judgment → Xerath E Shocking Orb)

### 8. Sivir (net +0.82)

- **0.55** spell shield: Spell Shield's spell shield blocks Xerath's Rite of the Arcane. Spell shield for 1.5 s, long enough to use ahead of Rite of the Arcane. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xerath R Rite of the Arcane)
- **0.54** spell shield: Spell Shield's spell shield blocks Xerath's Shocking Orb. Spell shield for 1.5 s, long enough to use ahead of Shocking Orb. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Xerath E Shocking Orb)

### 9. Bard (net +0.80)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 2.5 s, long enough to use ahead of Rite of the Arcane. (Bard R Tempered Fate → Xerath R Rite of the Arcane)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Xerath's Shocking Orb. Untargetable for 2.5 s, long enough to use ahead of Shocking Orb. (Bard R Tempered Fate → Xerath E Shocking Orb)
- **0.28** interrupt: Tempered Fate's stasis interrupts Xerath's Rite of the Arcane (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Xerath R Rite of the Arcane)

### 10. Lissandra (net +0.80)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xerath's Rite of the Arcane. Untargetable for 2.5 s, long enough to use ahead of Rite of the Arcane. (Lissandra R Frozen Tomb → Xerath R Rite of the Arcane)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Xerath's Shocking Orb. Untargetable for 2.5 s, long enough to use ahead of Shocking Orb. (Lissandra R Frozen Tomb → Xerath E Shocking Orb)
- **0.28** interrupt: Frozen Tomb's stun interrupts Xerath's Rite of the Arcane (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Xerath R Rite of the Arcane)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.03 | 1.03 | 0.00 |  |
| 2 | Nocturne | +0.99 | 1.26 | 0.27 |  |
| 3 | Braum | +0.94 | 1.21 | 0.27 | projectile block (Unbreakable) |
| 4 | Maokai | +0.93 | 1.20 | 0.27 |  |
| 5 | Rek'Sai | +0.90 | 1.06 | 0.16 |  |
| 6 | Yasuo | +0.87 | 1.03 | 0.16 | projectile block (Wind Wall) |
| 7 | Kayle | +0.82 | 0.82 | 0.00 |  |
| 8 | Sivir | +0.82 | 0.82 | 0.00 |  |
| 9 | Bard | +0.80 | 0.80 | 0.00 |  |
| 10 | Lissandra | +0.80 | 0.80 | 0.00 |  |
| 11 | Xin Zhao | +0.74 | 0.97 | 0.23 |  |
| 12 | Xayah | +0.72 | 0.72 | 0.00 |  |
| 13 | Camille | +0.69 | 0.82 | 0.13 |  |
| 14 | Milio | +0.68 | 0.68 | 0.00 |  |
| 15 | Vladimir | +0.67 | 0.85 | 0.18 |  |
| 16 | Evelynn | +0.65 | 0.83 | 0.18 |  |
| 17 | Shaco | +0.64 | 0.82 | 0.18 |  |
| 18 | Tristana | +0.63 | 0.63 | 0.00 |  |
| 19 | Udyr | +0.61 | 0.88 | 0.27 |  |
| 20 | Fiora | +0.60 | 0.85 | 0.25 |  |
| 21 | Samira | +0.60 | 0.60 | 0.00 | projectile block (Blade Whirl) |
| 22 | Kled | +0.58 | 0.67 | 0.09 |  |
| 23 | Mel | +0.57 | 0.57 | 0.00 | projectile block (Rebuttal) |
| 24 | Lulu | +0.56 | 0.56 | 0.00 |  |
| 25 | Zaahen | +0.54 | 0.70 | 0.16 |  |
| 26 | Morgana | +0.52 | 0.62 | 0.10 |  |
| 27 | Aurora | +0.50 | 0.50 | 0.00 |  |
| 28 | Gwen | +0.46 | 0.71 | 0.25 |  |
| 29 | Ashe | +0.45 | 0.45 | 0.00 |  |
| 30 | Pantheon | +0.44 | 0.69 | 0.25 |  |
| 31 | Annie | +0.43 | 0.43 | 0.00 |  |
| 32 | Anivia | +0.42 | 0.42 | 0.00 |  |
| 33 | Taric | +0.40 | 0.90 | 0.50 |  |
| 34 | Yuumi | +0.40 | 0.87 | 0.47 |  |
| 35 | Kalista | +0.39 | 0.39 | 0.00 |  |
| 36 | Kindred | +0.38 | 0.38 | 0.00 |  |
| 37 | Heimerdinger | +0.37 | 0.37 | 0.00 |  |
| 38 | Nilah | +0.36 | 0.56 | 0.20 |  |
| 39 | Ekko | +0.36 | 0.54 | 0.18 |  |
| 40 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 41 | Master Yi | +0.34 | 0.78 | 0.44 |  |
| 42 | Alistar | +0.34 | 0.61 | 0.27 |  |
| 43 | Brand | +0.33 | 0.33 | 0.00 |  |
| 44 | Nami | +0.33 | 0.33 | 0.00 |  |
| 45 | Zilean | +0.33 | 0.33 | 0.00 |  |
| 46 | Zed | +0.32 | 0.50 | 0.18 |  |
| 47 | Ahri | +0.32 | 0.32 | 0.00 |  |
| 48 | Corki | +0.32 | 0.32 | 0.00 |  |
| 49 | Draven | +0.32 | 0.32 | 0.00 |  |
| 50 | Hwei | +0.32 | 0.32 | 0.00 |  |
| 51 | Jayce | +0.32 | 0.32 | 0.00 |  |
| 52 | Kennen | +0.32 | 0.32 | 0.00 |  |
| 53 | Renata Glasc | +0.32 | 0.32 | 0.00 |  |
| 54 | Seraphine | +0.32 | 0.32 | 0.00 |  |
| 55 | Soraka | +0.32 | 0.32 | 0.00 |  |
| 56 | Swain | +0.32 | 0.32 | 0.00 |  |
| 57 | Syndra | +0.32 | 0.32 | 0.00 |  |
| 58 | Vayne | +0.32 | 0.32 | 0.00 |  |
| 59 | Veigar | +0.32 | 0.32 | 0.00 |  |
| 60 | Vex | +0.32 | 0.32 | 0.00 |  |
| 61 | Ziggs | +0.32 | 0.32 | 0.00 |  |
| 62 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 63 | Malzahar | +0.31 | 0.71 | 0.40 |  |
| 64 | Azir | +0.31 | 0.31 | 0.00 |  |
| 65 | Cassiopeia | +0.31 | 0.31 | 0.00 |  |
| 66 | Gnar | +0.31 | 0.31 | 0.00 |  |
| 67 | Neeko | +0.31 | 0.31 | 0.00 |  |
| 68 | Orianna | +0.31 | 0.31 | 0.00 |  |
| 69 | Sona | +0.31 | 0.31 | 0.00 |  |
| 70 | Viktor | +0.31 | 0.31 | 0.00 |  |
| 71 | Zyra | +0.31 | 0.31 | 0.00 |  |
| 72 | Thresh | +0.29 | 0.32 | 0.03 |  |
| 73 | Warwick | +0.23 | 0.70 | 0.47 |  |
| 74 | Aurelion Sol | +0.23 | 0.31 | 0.08 |  |
| 75 | Kayn | +0.22 | 0.83 | 0.61 |  |
| 76 | Malphite | +0.22 | 0.49 | 0.27 |  |
| 77 | Yone | +0.22 | 0.34 | 0.12 |  |
| 78 | K'Sante | +0.21 | 0.34 | 0.13 |  |
| 79 | Rakan | +0.21 | 0.31 | 0.10 |  |
| 80 | Sylas | +0.20 | 0.32 | 0.12 |  |
| 81 | Urgot | +0.20 | 0.32 | 0.12 |  |
| 82 | Fizz | +0.19 | 0.31 | 0.12 |  |
| 83 | Jarvan IV | +0.19 | 0.31 | 0.12 |  |
| 84 | Briar | +0.18 | 0.31 | 0.13 |  |
| 85 | Jax | +0.17 | 0.44 | 0.27 |  |
| 86 | Ornn | +0.17 | 0.33 | 0.16 |  |
| 87 | Bel'Veth | +0.16 | 0.33 | 0.17 |  |
| 88 | Rell | +0.16 | 0.32 | 0.16 |  |
| 89 | Lillia | +0.16 | 0.29 | 0.13 |  |
| 90 | Quinn | +0.15 | 0.33 | 0.18 |  |
| 91 | Volibear | +0.15 | 0.32 | 0.17 |  |
| 92 | Hecarim | +0.15 | 0.31 | 0.16 |  |
| 93 | Wukong | +0.15 | 0.31 | 0.16 |  |
| 94 | Riven | +0.14 | 0.32 | 0.18 |  |
| 95 | Ambessa | +0.13 | 0.31 | 0.18 |  |
| 96 | Lee Sin | +0.13 | 0.31 | 0.18 |  |
| 97 | Sion | +0.12 | 0.72 | 0.60 |  |
| 98 | Senna | +0.12 | 0.12 | 0.00 |  |
| 99 | Qiyana | +0.11 | 0.28 | 0.17 |  |
| 100 | Aatrox | +0.10 | 0.33 | 0.23 |  |
| 101 | Irelia | +0.10 | 0.32 | 0.22 |  |
| 102 | Sejuani | +0.09 | 0.34 | 0.25 |  |
| 103 | Rengar | +0.08 | 0.61 | 0.53 |  |
| 104 | Kassadin | +0.08 | 0.33 | 0.25 |  |
| 105 | Nautilus | +0.08 | 0.31 | 0.23 |  |
| 106 | Rammus | +0.07 | 0.59 | 0.52 |  |
| 107 | Garen | +0.07 | 0.54 | 0.47 |  |
| 108 | Leona | +0.07 | 0.34 | 0.27 |  |
| 109 | Shyvana | +0.07 | 0.32 | 0.25 |  |
| 110 | Renekton | +0.06 | 0.33 | 0.27 |  |
| 111 | Diana | +0.06 | 0.31 | 0.25 |  |
| 112 | Amumu | +0.05 | 0.32 | 0.27 |  |
| 113 | Sett | +0.05 | 0.32 | 0.27 |  |
| 114 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 115 | Vel'Koz | +0.04 | 0.32 | 0.28 |  |
| 116 | Gangplank | 0.00 | 0.53 | 0.53 |  |
| 117 | Pyke | 0.00 | 0.32 | 0.32 |  |
| 118 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 119 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 120 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 121 | Karma | 0.00 | 0.00 | 0.00 |  |
| 122 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 123 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 124 | Lux | 0.00 | 0.00 | 0.00 |  |
| 125 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 126 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 127 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 128 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 129 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 130 | Viego | -0.01 | 0.31 | 0.32 |  |
| 131 | Galio | -0.02 | 0.33 | 0.35 |  |
| 132 | Twisted Fate | -0.02 | 0.33 | 0.35 |  |
| 133 | Shen | -0.04 | 0.59 | 0.63 |  |
| 134 | Graves | -0.04 | 0.00 | 0.04 |  |
| 135 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 136 | Mordekaiser | -0.08 | 0.39 | 0.47 |  |
| 137 | Janna | -0.08 | 0.32 | 0.40 |  |
| 138 | Gragas | -0.10 | 0.32 | 0.42 |  |
| 139 | Fiddlesticks | -0.11 | 0.33 | 0.44 |  |
| 140 | Varus | -0.11 | 0.00 | 0.11 |  |
| 141 | Skarner | -0.13 | 0.37 | 0.50 |  |
| 142 | Ivern | -0.14 | 0.00 | 0.14 |  |
| 143 | Darius | -0.15 | 0.32 | 0.47 |  |
| 144 | Trundle | -0.15 | 0.32 | 0.47 |  |
| 145 | Yorick | -0.15 | 0.32 | 0.47 |  |
| 146 | Olaf | -0.16 | 0.37 | 0.53 |  |
| 147 | Taliyah | -0.16 | 0.32 | 0.48 |  |
| 148 | Poppy | -0.16 | 0.31 | 0.47 |  |
| 149 | Akali | -0.18 | 0.00 | 0.18 |  |
| 150 | Talon | -0.18 | 0.00 | 0.18 |  |
| 151 | Blitzcrank | -0.19 | 0.34 | 0.53 |  |
| 152 | Cho'Gath | -0.20 | 0.33 | 0.53 |  |
| 153 | Singed | -0.20 | 0.33 | 0.53 |  |
| 154 | Vi | -0.21 | 0.33 | 0.54 |  |
| 155 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 156 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 157 | Illaoi | -0.27 | 0.00 | 0.27 |  |
| 158 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 159 | Locke | -0.27 | 0.00 | 0.27 |  |
| 160 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 161 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 162 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 163 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 164 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 165 | Zac | -0.36 | 0.32 | 0.68 |  |
| 166 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 167 | Tahm Kench | -0.39 | 0.34 | 0.73 |  |
| 168 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 169 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 170 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 171 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 172 | Nunu & Willump | -0.67 | 0.35 | 1.02 |  |
