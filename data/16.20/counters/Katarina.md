# Counters to Katarina (patch 26.20)

Every champion ranked by what its kit does against Katarina's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Katarina's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Katarina` for the full ledger of a matchup, with sources.

## Top 10

### 1. Braum (net +1.04)

- **0.55** projectile block: Unbreakable blocks Katarina's Death Lotus, a projectile. Unbreakable for 4 s, long enough to use ahead of Death Lotus. (Braum E Unbreakable → Katarina R Death Lotus)
- **0.42** projectile block: Unbreakable blocks Katarina's Bouncing Blade, a projectile. Unbreakable for 4 s, long enough to use ahead of Bouncing Blade. (Braum E Unbreakable → Katarina Q Bouncing Blade)
- **0.28** interrupt: Concussive Blows's stun interrupts Katarina's Death Lotus (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Katarina R Death Lotus)

### 2. Yasuo (net +0.98)

- **0.55** projectile block: Wind Wall blocks Katarina's Death Lotus, a projectile. Wind Wall for 4 s, long enough to use ahead of Death Lotus. (Yasuo W Wind Wall → Katarina R Death Lotus)
- **0.29** projectile block: Wind Wall blocks Katarina's Bouncing Blade, a projectile. Wind Wall for 4 s, long enough to use ahead of Bouncing Blade. (Yasuo W Wind Wall → Katarina Q Bouncing Blade)
- **0.28** interrupt: Steel Tempest's airborne interrupts Katarina's Death Lotus (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Katarina R Death Lotus)

### 3. Lulu (net +0.86)

- **0.36** range: Lulu's basic attacks reach 425 units farther than Katarina's (550 vs 125 attack range). Katarina closes the gap with Shunpo. (Lulu basic attacks → Katarina basic attacks)
- **0.30** disarm: Whimsy disarms Katarina for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Katarina basic attacks)
- **0.20** interrupt: Wild Growth's airborne interrupts Katarina's Death Lotus (normal channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Katarina R Death Lotus)

### 4. Xayah (net +0.85)

- **0.38** range: Xayah's basic attacks reach 400 units farther than Katarina's (525 vs 125 attack range). Katarina closes the gap with Shunpo. (Xayah basic attacks → Katarina basic attacks)
- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Katarina's Death Lotus. Untargetable for 1.5 s, long enough to use ahead of Death Lotus. (Xayah R Featherstorm → Katarina R Death Lotus)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Katarina's Bouncing Blade. Untargetable for 1.5 s, long enough to use ahead of Bouncing Blade. (Xayah R Featherstorm → Katarina Q Bouncing Blade)

### 5. Shen (net +0.83)

- **0.35** attack block: Spirit's Refuge blocks Katarina's Shunpo, which applies on-hit effects. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Shunpo will still deal damage but not apply on-hit effects if dodged. It cannot be blocked nor can it be missed while Katarina is blinded. (Shen W Spirit's Refuge → Katarina E Shunpo)
- **0.33** attack block: Spirit's Refuge blocks Katarina's basic attacks. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Katarina basic attacks)
- **0.28** interrupt: Shadow Dash's taunt interrupts Katarina's Death Lotus (normal channel). Shadow Dash must land during the channel. (Shen E Shadow Dash → Katarina R Death Lotus)

### 6. Teemo (net +0.77)

- **0.43** blind: Blinding Dart's blind makes Katarina's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Katarina basic attacks)
- **0.34** range: Teemo's basic attacks reach 375 units farther than Katarina's (500 vs 125 attack range). Katarina closes the gap with Shunpo. (Teemo basic attacks → Katarina basic attacks)

### 7. Elise (net +0.75)

- **0.33** untargetable: Rappel makes Elise untargetable, dodging Katarina's Death Lotus. Untargetable for 0.6 s; Death Lotus lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Katarina R Death Lotus)
- **0.32** range: Elise's basic attacks reach 425 units farther than Katarina's (550 vs 125 attack range). Katarina closes the gap with Shunpo. (Elise basic attacks → Katarina basic attacks)
- **0.28** interrupt: Cocoon's stun interrupts Katarina's Death Lotus (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Katarina R Death Lotus)
- Watch out: Death Lotus's Grievous Wounds cuts Elise's healing from Spider Form / Human Form by 40%.

### 8. Bard (net +0.74)

- **0.41** untargetable: Tempered Fate makes Bard untargetable, dodging Katarina's Death Lotus. Untargetable for 2.5 s, long enough to use ahead of Death Lotus. (Bard R Tempered Fate → Katarina R Death Lotus)
- **0.36** range: Bard's basic attacks reach 375 units farther than Katarina's (500 vs 125 attack range). Katarina closes the gap with Shunpo. (Bard basic attacks → Katarina basic attacks)
- **0.20** interrupt: Tempered Fate's stasis interrupts Katarina's Death Lotus (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Katarina R Death Lotus)
- Watch out: Death Lotus's Grievous Wounds cuts Bard's healing from Caretaker's Shrine by 40%.

### 9. Mel (net +0.73)

- **0.33** projectile block: Rebuttal blocks Katarina's Death Lotus, a projectile. Rebuttal for 0.75 s; Death Lotus lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Mel W Rebuttal → Katarina R Death Lotus)
- **0.27** range: Mel's basic attacks reach 425 units farther than Katarina's (550 vs 125 attack range). Katarina closes the gap with Shunpo. (Mel basic attacks → Katarina basic attacks)
- **0.25** projectile block: Rebuttal blocks Katarina's Bouncing Blade, a projectile. Rebuttal for 0.75 s; Bouncing Blade takes 0.64 s to land, enough to react. (Mel W Rebuttal → Katarina Q Bouncing Blade)

### 10. Sivir (net +0.71)

- **0.47** range: Sivir's basic attacks reach 375 units farther than Katarina's (500 vs 125 attack range). Katarina closes the gap with Shunpo. (Sivir basic attacks → Katarina basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks Katarina's Bouncing Blade. Spell shield for 1.5 s, long enough to use ahead of Bouncing Blade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Katarina Q Bouncing Blade)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Katarina's Death Lotus. Spell shield for 1.5 s, long enough to use ahead of Death Lotus. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block and be consumed by only one dagger. (Sivir E Spell Shield → Katarina R Death Lotus)
- Watch out: Death Lotus's Grievous Wounds cuts Sivir's healing from Spell Shield by 40%.

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Braum | +1.04 | 1.04 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 2 | Yasuo | +0.98 | 0.98 | 0.00 | projectile block (Wind Wall) |
| 3 | Lulu | +0.86 | 0.86 | 0.00 |  |
| 4 | Xayah | +0.85 | 0.85 | 0.00 |  |
| 5 | Shen | +0.83 | 0.83 | 0.00 |  |
| 6 | Teemo | +0.77 | 0.77 | 0.00 | blind (Blinding Dart) |
| 7 | Elise | +0.75 | 1.07 | 0.32 |  |
| 8 | Bard | +0.74 | 0.92 | 0.18 |  |
| 9 | Mel | +0.73 | 0.73 | 0.00 |  |
| 10 | Sivir | +0.71 | 0.89 | 0.18 |  |
| 11 | Twisted Fate | +0.71 | 0.71 | 0.00 |  |
| 12 | Vayne | +0.71 | 0.71 | 0.00 |  |
| 13 | Maokai | +0.70 | 0.82 | 0.12 |  |
| 14 | Rek'Sai | +0.67 | 0.79 | 0.12 |  |
| 15 | Singed | +0.67 | 0.67 | 0.00 |  |
| 16 | Kayle | +0.66 | 0.66 | 0.00 |  |
| 17 | Quinn | +0.66 | 0.66 | 0.00 |  |
| 18 | Renata Glasc | +0.66 | 0.66 | 0.00 |  |
| 19 | Nocturne | +0.64 | 0.76 | 0.12 |  |
| 20 | Draven | +0.64 | 0.64 | 0.00 |  |
| 21 | Jax | +0.63 | 0.63 | 0.00 |  |
| 22 | Shaco | +0.62 | 0.62 | 0.00 |  |
| 23 | Gnar | +0.61 | 0.61 | 0.00 |  |
| 24 | Yuumi | +0.60 | 0.94 | 0.34 |  |
| 25 | Rammus | +0.60 | 0.60 | 0.00 |  |
| 26 | Zoe | +0.60 | 0.60 | 0.00 |  |
| 27 | Cassiopeia | +0.58 | 0.80 | 0.22 |  |
| 28 | Corki | +0.58 | 0.58 | 0.00 |  |
| 29 | Jayce | +0.58 | 0.58 | 0.00 |  |
| 30 | Kennen | +0.57 | 0.57 | 0.00 |  |
| 31 | Taliyah | +0.55 | 0.55 | 0.00 |  |
| 32 | Vel'Koz | +0.55 | 0.55 | 0.00 |  |
| 33 | Vex | +0.55 | 0.55 | 0.00 |  |
| 34 | Xerath | +0.55 | 0.55 | 0.00 |  |
| 35 | Ziggs | +0.55 | 0.55 | 0.00 |  |
| 36 | Tristana | +0.54 | 0.54 | 0.00 |  |
| 37 | Vladimir | +0.52 | 0.88 | 0.36 |  |
| 38 | Anivia | +0.52 | 0.52 | 0.00 |  |
| 39 | Veigar | +0.52 | 0.52 | 0.00 |  |
| 40 | Viktor | +0.52 | 0.52 | 0.00 |  |
| 41 | Hwei | +0.51 | 0.51 | 0.00 |  |
| 42 | Evelynn | +0.50 | 0.62 | 0.12 |  |
| 43 | Annie | +0.50 | 0.50 | 0.00 |  |
| 44 | Brand | +0.50 | 0.50 | 0.00 |  |
| 45 | Syndra | +0.50 | 0.50 | 0.00 |  |
| 46 | Aurora | +0.49 | 0.61 | 0.12 |  |
| 47 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 48 | Malzahar | +0.49 | 0.49 | 0.00 |  |
| 49 | Heimerdinger | +0.48 | 0.48 | 0.00 |  |
| 50 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 51 | Thresh | +0.47 | 0.47 | 0.00 |  |
| 52 | Lissandra | +0.46 | 0.78 | 0.32 |  |
| 53 | Azir | +0.46 | 0.46 | 0.00 |  |
| 54 | Milio | +0.44 | 0.66 | 0.22 |  |
| 55 | Camille | +0.43 | 0.61 | 0.18 |  |
| 56 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 57 | Urgot | +0.43 | 0.43 | 0.00 |  |
| 58 | Zyra | +0.43 | 0.43 | 0.00 |  |
| 59 | Pantheon | +0.42 | 0.42 | 0.00 |  |
| 60 | Kindred | +0.41 | 0.72 | 0.31 |  |
| 61 | Ashe | +0.41 | 0.59 | 0.18 |  |
| 62 | Sona | +0.41 | 0.59 | 0.18 |  |
| 63 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 64 | Aurelion Sol | +0.40 | 0.40 | 0.00 |  |
| 65 | Samira | +0.39 | 0.77 | 0.38 |  |
| 66 | Seraphine | +0.39 | 0.57 | 0.18 |  |
| 67 | Taric | +0.39 | 0.57 | 0.18 |  |
| 68 | Malphite | +0.39 | 0.39 | 0.00 |  |
| 69 | Zilean | +0.38 | 0.60 | 0.22 |  |
| 70 | Ahri | +0.38 | 0.50 | 0.12 |  |
| 71 | Kai'Sa | +0.38 | 0.38 | 0.00 |  |
| 72 | Caitlyn | +0.36 | 0.36 | 0.00 |  |
| 73 | Gwen | +0.35 | 0.47 | 0.12 |  |
| 74 | Xin Zhao | +0.33 | 0.57 | 0.24 |  |
| 75 | Nilah | +0.32 | 0.78 | 0.46 |  |
| 76 | Janna | +0.32 | 0.64 | 0.32 |  |
| 77 | Nami | +0.32 | 0.50 | 0.18 |  |
| 78 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 79 | Miss Fortune | +0.32 | 0.32 | 0.00 |  |
| 80 | Zed | +0.32 | 0.32 | 0.00 |  |
| 81 | Fiddlesticks | +0.30 | 0.48 | 0.18 |  |
| 82 | Master Yi | +0.29 | 0.47 | 0.18 |  |
| 83 | Kled | +0.29 | 0.41 | 0.12 |  |
| 84 | Jinx | +0.29 | 0.29 | 0.00 |  |
| 85 | Lux | +0.29 | 0.29 | 0.00 |  |
| 86 | Amumu | +0.28 | 0.28 | 0.00 |  |
| 87 | Blitzcrank | +0.28 | 0.28 | 0.00 |  |
| 88 | Galio | +0.28 | 0.28 | 0.00 |  |
| 89 | Kassadin | +0.28 | 0.28 | 0.00 |  |
| 90 | K'Sante | +0.28 | 0.28 | 0.00 |  |
| 91 | Leona | +0.28 | 0.28 | 0.00 |  |
| 92 | Ornn | +0.28 | 0.28 | 0.00 |  |
| 93 | Rell | +0.28 | 0.28 | 0.00 |  |
| 94 | Sejuani | +0.28 | 0.28 | 0.00 |  |
| 95 | Vi | +0.28 | 0.28 | 0.00 |  |
| 96 | Yone | +0.28 | 0.28 | 0.00 |  |
| 97 | Jhin | +0.27 | 0.27 | 0.00 |  |
| 98 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 99 | Varus | +0.27 | 0.27 | 0.00 |  |
| 100 | Lucian | +0.24 | 0.36 | 0.12 |  |
| 101 | Ryze | +0.24 | 0.24 | 0.00 |  |
| 102 | Fiora | +0.22 | 0.50 | 0.28 |  |
| 103 | LeBlanc | +0.22 | 0.22 | 0.00 |  |
| 104 | Swain | +0.21 | 0.49 | 0.28 |  |
| 105 | Nasus | +0.21 | 0.33 | 0.12 |  |
| 106 | Zeri | +0.20 | 0.44 | 0.24 |  |
| 107 | Diana | +0.20 | 0.20 | 0.00 |  |
| 108 | Fizz | +0.20 | 0.20 | 0.00 |  |
| 109 | Nautilus | +0.20 | 0.20 | 0.00 |  |
| 110 | Ivern | +0.19 | 0.19 | 0.00 |  |
| 111 | Jarvan IV | +0.19 | 0.19 | 0.00 |  |
| 112 | Karthus | +0.19 | 0.19 | 0.00 |  |
| 113 | Skarner | +0.19 | 0.19 | 0.00 |  |
| 114 | Yunara | +0.18 | 0.36 | 0.18 |  |
| 115 | Poppy | +0.18 | 0.18 | 0.00 |  |
| 116 | Lillia | +0.17 | 0.29 | 0.12 |  |
| 117 | Qiyana | +0.17 | 0.17 | 0.00 |  |
| 118 | Soraka | +0.16 | 0.55 | 0.39 |  |
| 119 | Cho'Gath | +0.16 | 0.28 | 0.12 |  |
| 120 | Garen | +0.16 | 0.28 | 0.12 |  |
| 121 | Gragas | +0.16 | 0.28 | 0.12 |  |
| 122 | Pyke | +0.16 | 0.28 | 0.12 |  |
| 123 | Riven | +0.16 | 0.28 | 0.12 |  |
| 124 | Sett | +0.16 | 0.28 | 0.12 |  |
| 125 | Sion | +0.16 | 0.28 | 0.12 |  |
| 126 | Zac | +0.16 | 0.28 | 0.12 |  |
| 127 | Kayn | +0.14 | 0.62 | 0.48 |  |
| 128 | Rakan | +0.14 | 0.32 | 0.18 |  |
| 129 | Nidalee | +0.12 | 0.30 | 0.18 |  |
| 130 | Alistar | +0.12 | 0.28 | 0.16 |  |
| 131 | Graves | +0.12 | 0.24 | 0.12 |  |
| 132 | Darius | +0.10 | 0.28 | 0.18 |  |
| 133 | Nunu & Willump | +0.10 | 0.28 | 0.18 |  |
| 134 | Renekton | +0.10 | 0.28 | 0.18 |  |
| 135 | Shyvana | +0.10 | 0.28 | 0.18 |  |
| 136 | Udyr | +0.10 | 0.28 | 0.18 |  |
| 137 | Senna | +0.08 | 0.32 | 0.24 |  |
| 138 | Wukong | +0.07 | 0.19 | 0.12 |  |
| 139 | Morgana | +0.07 | 0.19 | 0.12 |  |
| 140 | Ekko | +0.06 | 0.42 | 0.36 |  |
| 141 | Yorick | +0.06 | 0.28 | 0.22 |  |
| 142 | Mordekaiser | +0.05 | 0.36 | 0.31 |  |
| 143 | Lee Sin | +0.05 | 0.23 | 0.18 |  |
| 144 | Irelia | +0.01 | 0.33 | 0.32 |  |
| 145 | Aphelios | 0.00 | 0.38 | 0.38 |  |
| 146 | Hecarim | 0.00 | 0.18 | 0.18 |  |
| 147 | Akali | 0.00 | 0.00 | 0.00 |  |
| 148 | Gangplank | 0.00 | 0.00 | 0.00 |  |
| 149 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 150 | Akshan | -0.01 | 0.34 | 0.35 |  |
| 151 | Smolder | -0.01 | 0.32 | 0.33 |  |
| 152 | Sylas | -0.04 | 0.28 | 0.32 |  |
| 153 | Trundle | -0.06 | 0.28 | 0.34 |  |
| 154 | Karma | -0.06 | 0.22 | 0.28 |  |
| 155 | Viego | -0.08 | 0.29 | 0.37 |  |
| 156 | Tahm Kench | -0.11 | 0.28 | 0.39 |  |
| 157 | Illaoi | -0.12 | 0.00 | 0.12 |  |
| 158 | Aatrox | -0.18 | 0.28 | 0.46 |  |
| 159 | Kha'Zix | -0.18 | 0.00 | 0.18 |  |
| 160 | Locke | -0.18 | 0.00 | 0.18 |  |
| 161 | Olaf | -0.18 | 0.00 | 0.18 |  |
| 162 | Rengar | -0.18 | 0.00 | 0.18 |  |
| 163 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 164 | Volibear | -0.21 | 0.28 | 0.49 |  |
| 165 | Zaahen | -0.22 | 0.28 | 0.50 |  |
| 166 | Talon | -0.32 | 0.00 | 0.32 |  |
| 167 | Warwick | -0.34 | 0.28 | 0.62 |  |
| 168 | Dr. Mundo | -0.34 | 0.00 | 0.34 |  |
| 169 | Bel'Veth | -0.35 | 0.28 | 0.63 |  |
| 170 | Briar | -0.35 | 0.20 | 0.55 |  |
| 171 | Ambessa | -0.35 | 0.18 | 0.53 |  |
| 172 | Naafiri | -0.41 | 0.00 | 0.41 |  |
