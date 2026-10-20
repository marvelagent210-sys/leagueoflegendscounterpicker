# Counters to Janna (patch 26.20)

Every champion ranked by what its kit does against Janna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Janna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Janna` for the full ledger of a matchup, with sources.

## Top 10

### 1. Rell (net +1.78)

- **0.40** interrupt: Ferromancy: Crash Down's airborne interrupts Janna's Monsoon (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Janna R Monsoon)
- **0.40** interrupt: Ferromancy: Mount Up's airborne interrupts Janna's Monsoon (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Janna R Monsoon)
- **0.40** interrupt: Full Tilt's stun interrupts Janna's Monsoon (normal channel). Full Tilt must land during the channel. (Rell E Full Tilt → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Rell's (550 vs 175 attack range).

### 2. Nocturne (net +1.50)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna R Monsoon)
- **0.70** spell shield: Shroud of Darkness's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Janna Q Howling Gale)
- **0.40** interrupt: Unspeakable Horror's fear interrupts Janna's Monsoon (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 3. Braum (net +1.48)

- **0.70** projectile block: Unbreakable blocks Janna's Howling Gale, a projectile. Unbreakable for 4 s, long enough to use ahead of Howling Gale. (Braum E Unbreakable → Janna Q Howling Gale)
- **0.50** projectile block: Unbreakable blocks Janna's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Janna basic attacks)
- **0.40** interrupt: Concussive Blows's stun interrupts Janna's Monsoon (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### 4. Yasuo (net +1.47)

- **0.63** projectile block: Wind Wall blocks Janna's Howling Gale, a projectile. Wind Wall for 4 s, long enough to use ahead of Howling Gale. (Yasuo W Wind Wall → Janna Q Howling Gale)
- **0.40** interrupt: Last Breath's airborne interrupts Janna's Monsoon (normal channel). Last Breath must land during the channel. (Yasuo R Last Breath → Janna R Monsoon)
- **0.40** interrupt: Steel Tempest's airborne interrupts Janna's Monsoon (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

### 5. Fizz (net +1.27)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Janna's Howling Gale. Untargetable for 0.75 s; Howling Gale takes 1.25 s to land, enough to react. (Fizz E Playful → Janna Q Howling Gale)
- **0.48** untargetable: Playful makes Fizz untargetable, dodging Janna's Monsoon. Untargetable for 0.75 s; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Janna R Monsoon)
- **0.40** interrupt: Chum the Waters's airborne interrupts Janna's Monsoon (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 6. Zaahen (net +1.25)

- **0.48** cc immunity: Grim Deliverance makes Zaahen immune to Janna's Monsoon (airborne). Immune for ?; Monsoon lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Janna R Monsoon)
- **0.40** interrupt: Dreaded Return's airborne interrupts Janna's Monsoon (normal channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Janna R Monsoon)
- **0.40** interrupt: The Darkin Glaive's airborne interrupts Janna's Monsoon (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range).

### 7. K'Sante (net +1.25)

- **0.40** interrupt: All Out's airborne interrupts Janna's Monsoon (normal channel). All Out must land during the channel. (K'Sante R All Out → Janna R Monsoon)
- **0.40** interrupt: Ntofo Strikes's airborne interrupts Janna's Monsoon (normal channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Janna R Monsoon)
- **0.40** interrupt: Path Maker's airborne interrupts Janna's Monsoon (normal channel). Path Maker must land during the channel. (K'Sante W Path Maker → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 400 units farther than K'Sante's (550 vs 150 attack range).

### 8. Alistar (net +1.23)

- **0.64** cleanse: Unbreakable Will cleanses Janna's Monsoon (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Janna R Monsoon)
- **0.40** interrupt: Pulverize's airborne interrupts Janna's Monsoon (normal channel). Pulverize must land during the channel. (Alistar Q Pulverize → Janna R Monsoon)
- **0.40** interrupt: Trample's stun interrupts Janna's Monsoon (normal channel). Trample must land during the channel. (Alistar E Trample → Janna R Monsoon)
- Watch out: Janna's basic attacks reach 425 units farther than Alistar's (550 vs 125 attack range).

### 9. Rek'Sai (net +1.23)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Monsoon. Untargetable for 1.5 s, long enough to use ahead of Monsoon. (Rek'Sai R Void Rush → Janna R Monsoon)
- **0.40** interrupt: Unburrow's airborne interrupts Janna's Monsoon (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Janna R Monsoon)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Janna's Howling Gale. Untargetable for 1.5 s, long enough to use ahead of Howling Gale. (Rek'Sai R Void Rush → Janna Q Howling Gale)
- Watch out: Janna's basic attacks reach 375 units farther than Rek'Sai's (550 vs 175 attack range).

### 10. Sivir (net +1.17)

- **0.80** spell shield: Spell Shield's spell shield blocks Janna's Monsoon. Spell shield for 1.5 s, long enough to use ahead of Monsoon. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna R Monsoon)
- **0.61** spell shield: Spell Shield's spell shield blocks Janna's Howling Gale. Spell shield for 1.5 s, long enough to use ahead of Howling Gale. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna Q Howling Gale)
- **0.27** spell shield: Spell Shield's spell shield blocks Janna's Zephyr. Spell shield for 1.5 s, long enough to use ahead of Zephyr. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Janna W Zephyr)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.78 | 2.00 | 0.22 |  |
| 2 | Nocturne | +1.50 | 1.86 | 0.36 |  |
| 3 | Braum | +1.48 | 1.84 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Yasuo | +1.47 | 1.69 | 0.22 | projectile block (Wind Wall) |
| 5 | Fizz | +1.27 | 1.44 | 0.17 |  |
| 6 | Zaahen | +1.25 | 1.47 | 0.22 |  |
| 7 | K'Sante | +1.25 | 1.43 | 0.18 |  |
| 8 | Alistar | +1.23 | 1.59 | 0.36 |  |
| 9 | Rek'Sai | +1.23 | 1.45 | 0.22 |  |
| 10 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 11 | Bard | +1.11 | 1.11 | 0.00 |  |
| 12 | Lissandra | +1.11 | 1.11 | 0.00 |  |
| 13 | Maokai | +1.06 | 1.42 | 0.36 |  |
| 14 | Camille | +1.03 | 1.21 | 0.18 |  |
| 15 | Xayah | +1.02 | 1.02 | 0.00 |  |
| 16 | Kled | +0.99 | 1.13 | 0.14 |  |
| 17 | Lulu | +0.97 | 0.97 | 0.00 |  |
| 18 | Morgana | +0.96 | 1.14 | 0.18 |  |
| 19 | Udyr | +0.90 | 1.26 | 0.36 |  |
| 20 | Vladimir | +0.90 | 1.20 | 0.30 |  |
| 21 | Evelynn | +0.87 | 1.11 | 0.24 |  |
| 22 | Shaco | +0.87 | 1.11 | 0.24 |  |
| 23 | Yone | +0.86 | 1.03 | 0.17 |  |
| 24 | Heimerdinger | +0.85 | 0.85 | 0.00 |  |
| 25 | Sejuani | +0.84 | 1.20 | 0.36 |  |
| 26 | Kalista | +0.83 | 0.83 | 0.00 |  |
| 27 | Ornn | +0.81 | 1.03 | 0.22 |  |
| 28 | Anivia | +0.80 | 0.80 | 0.00 |  |
| 29 | Gnar | +0.80 | 0.80 | 0.00 |  |
| 30 | Nami | +0.80 | 0.80 | 0.00 |  |
| 31 | Viktor | +0.80 | 0.80 | 0.00 |  |
| 32 | Renata Glasc | +0.78 | 0.78 | 0.00 |  |
| 33 | Fiora | +0.76 | 1.12 | 0.36 |  |
| 34 | Samira | +0.76 | 0.76 | 0.00 | projectile block (Blade Whirl) |
| 35 | Seraphine | +0.76 | 0.76 | 0.00 |  |
| 36 | Thresh | +0.74 | 0.80 | 0.06 |  |
| 37 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 38 | Mel | +0.72 | 0.72 | 0.00 | projectile block (Rebuttal) |
| 39 | Aurelion Sol | +0.67 | 0.80 | 0.13 |  |
| 40 | Tristana | +0.67 | 0.67 | 0.00 |  |
| 41 | Rakan | +0.65 | 0.80 | 0.15 |  |
| 42 | Malzahar | +0.64 | 1.39 | 0.75 |  |
| 43 | Vex | +0.63 | 0.63 | 0.00 |  |
| 44 | Sion | +0.62 | 1.50 | 0.88 |  |
| 45 | Urgot | +0.62 | 0.80 | 0.18 |  |
| 46 | Xin Zhao | +0.57 | 0.91 | 0.34 |  |
| 47 | Gwen | +0.56 | 0.92 | 0.36 |  |
| 48 | Sett | +0.56 | 0.92 | 0.36 |  |
| 49 | Riven | +0.56 | 0.80 | 0.24 |  |
| 50 | Blitzcrank | +0.48 | 1.20 | 0.72 |  |
| 51 | Annie | +0.48 | 0.48 | 0.00 |  |
| 52 | Teemo | +0.47 | 0.47 | 0.00 | blind (Blinding Dart) |
| 53 | Viego | +0.46 | 0.92 | 0.46 |  |
| 54 | Zed | +0.46 | 0.70 | 0.24 |  |
| 55 | Milio | +0.46 | 0.46 | 0.00 |  |
| 56 | Amumu | +0.44 | 0.80 | 0.36 |  |
| 57 | Leona | +0.44 | 0.80 | 0.36 |  |
| 58 | Nilah | +0.44 | 0.73 | 0.29 |  |
| 59 | Rammus | +0.42 | 1.16 | 0.74 |  |
| 60 | Malphite | +0.40 | 0.76 | 0.36 |  |
| 61 | Ahri | +0.40 | 0.40 | 0.00 |  |
| 62 | Ashe | +0.40 | 0.40 | 0.00 |  |
| 63 | Azir | +0.40 | 0.40 | 0.00 |  |
| 64 | Brand | +0.40 | 0.40 | 0.00 |  |
| 65 | Cassiopeia | +0.40 | 0.40 | 0.00 |  |
| 66 | Draven | +0.40 | 0.40 | 0.00 |  |
| 67 | Elise | +0.40 | 0.40 | 0.00 |  |
| 68 | Hwei | +0.40 | 0.40 | 0.00 |  |
| 69 | Jayce | +0.40 | 0.40 | 0.00 |  |
| 70 | Kennen | +0.40 | 0.40 | 0.00 |  |
| 71 | Neeko | +0.40 | 0.40 | 0.00 |  |
| 72 | Orianna | +0.40 | 0.40 | 0.00 |  |
| 73 | Sona | +0.40 | 0.40 | 0.00 |  |
| 74 | Soraka | +0.40 | 0.40 | 0.00 |  |
| 75 | Swain | +0.40 | 0.40 | 0.00 |  |
| 76 | Syndra | +0.40 | 0.40 | 0.00 |  |
| 77 | Vayne | +0.40 | 0.40 | 0.00 |  |
| 78 | Veigar | +0.40 | 0.40 | 0.00 |  |
| 79 | Ziggs | +0.40 | 0.40 | 0.00 |  |
| 80 | Zilean | +0.40 | 0.40 | 0.00 |  |
| 81 | Zoe | +0.40 | 0.40 | 0.00 |  |
| 82 | Zyra | +0.40 | 0.40 | 0.00 |  |
| 83 | Volibear | +0.39 | 0.63 | 0.24 |  |
| 84 | Kayle | +0.37 | 0.37 | 0.00 |  |
| 85 | Master Yi | +0.36 | 0.99 | 0.63 |  |
| 86 | Pyke | +0.35 | 0.80 | 0.45 |  |
| 87 | Jarvan IV | +0.35 | 0.52 | 0.17 |  |
| 88 | Hecarim | +0.30 | 0.52 | 0.22 |  |
| 89 | Olaf | +0.27 | 0.99 | 0.72 |  |
| 90 | Zac | +0.24 | 1.20 | 0.96 |  |
| 91 | Jax | +0.23 | 0.59 | 0.36 |  |
| 92 | Sylas | +0.23 | 0.40 | 0.17 |  |
| 93 | Gangplank | +0.22 | 0.94 | 0.72 |  |
| 94 | Rengar | +0.22 | 0.94 | 0.72 |  |
| 95 | Briar | +0.22 | 0.40 | 0.18 |  |
| 96 | Taliyah | +0.20 | 1.16 | 0.96 |  |
| 97 | Gragas | +0.20 | 0.80 | 0.60 |  |
| 98 | Wukong | +0.18 | 0.40 | 0.22 |  |
| 99 | Lillia | +0.18 | 0.38 | 0.20 |  |
| 100 | Yuumi | +0.17 | 1.05 | 0.88 |  |
| 101 | Varus | +0.17 | 0.32 | 0.15 |  |
| 102 | Singed | +0.16 | 0.88 | 0.72 |  |
| 103 | Shyvana | +0.16 | 0.52 | 0.36 |  |
| 104 | Ambessa | +0.16 | 0.40 | 0.24 |  |
| 105 | Bel'Veth | +0.16 | 0.40 | 0.24 |  |
| 106 | Lee Sin | +0.16 | 0.40 | 0.24 |  |
| 107 | Vi | +0.13 | 0.92 | 0.79 |  |
| 108 | Qiyana | +0.12 | 0.36 | 0.24 |  |
| 109 | Tahm Kench | +0.11 | 1.20 | 1.09 |  |
| 110 | Quinn | +0.09 | 0.40 | 0.31 |  |
| 111 | Cho'Gath | +0.08 | 0.80 | 0.72 |  |
| 112 | Irelia | +0.08 | 0.40 | 0.32 |  |
| 113 | Aatrox | +0.06 | 0.40 | 0.34 |  |
| 114 | Nautilus | +0.06 | 0.40 | 0.34 |  |
| 115 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 116 | Warwick | +0.04 | 1.41 | 1.37 |  |
| 117 | Kayn | +0.04 | 1.11 | 1.07 |  |
| 118 | Diana | +0.04 | 0.40 | 0.36 |  |
| 119 | Kassadin | +0.04 | 0.40 | 0.36 |  |
| 120 | Renekton | +0.04 | 0.40 | 0.36 |  |
| 121 | Fiddlesticks | 0.00 | 0.80 | 0.80 |  |
| 122 | Corki | 0.00 | 0.00 | 0.00 |  |
| 123 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 124 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 125 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 126 | Karma | 0.00 | 0.00 | 0.00 |  |
| 127 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 128 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 129 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 130 | Lux | 0.00 | 0.00 | 0.00 |  |
| 131 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 132 | Senna | 0.00 | 0.00 | 0.00 |  |
| 133 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 134 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 135 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 136 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 137 | Graves | -0.07 | 0.00 | 0.07 |  |
| 138 | Vel'Koz | -0.12 | 0.40 | 0.52 |  |
| 139 | Illaoi | -0.13 | 0.23 | 0.36 |  |
| 140 | Mordekaiser | -0.19 | 0.49 | 0.68 |  |
| 141 | Garen | -0.21 | 0.47 | 0.68 |  |
| 142 | Xerath | -0.22 | 0.40 | 0.62 |  |
| 143 | Galio | -0.24 | 1.13 | 1.37 |  |
| 144 | Akali | -0.24 | 0.00 | 0.24 |  |
| 145 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 146 | Talon | -0.24 | 0.00 | 0.24 |  |
| 147 | Skarner | -0.26 | 0.46 | 0.72 |  |
| 148 | Ivern | -0.26 | 0.00 | 0.26 |  |
| 149 | Darius | -0.28 | 0.40 | 0.68 |  |
| 150 | Trundle | -0.28 | 0.40 | 0.68 |  |
| 151 | Yorick | -0.28 | 0.40 | 0.68 |  |
| 152 | Twisted Fate | -0.30 | 0.40 | 0.70 |  |
| 153 | Taric | -0.32 | 0.40 | 0.72 |  |
| 154 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 155 | Poppy | -0.36 | 0.40 | 0.76 |  |
| 156 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 157 | Caitlyn | -0.36 | 0.18 | 0.54 |  |
| 158 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 159 | Locke | -0.36 | 0.00 | 0.36 |  |
| 160 | Shen | -0.38 | 0.76 | 1.14 |  |
| 161 | Katarina | -0.50 | 0.32 | 0.82 |  |
| 162 | Akshan | -0.51 | 0.00 | 0.51 |  |
| 163 | Jhin | -0.54 | 0.00 | 0.54 |  |
| 164 | Lucian | -0.54 | 0.00 | 0.54 |  |
| 165 | Miss Fortune | -0.56 | 0.00 | 0.56 |  |
| 166 | Ryze | -0.70 | 0.00 | 0.70 |  |
| 167 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 168 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 169 | Karthus | -0.74 | 0.00 | 0.74 |  |
| 170 | Pantheon | -0.82 | 0.37 | 1.19 |  |
| 171 | Naafiri | -1.03 | 0.00 | 1.03 |  |
| 172 | Nunu & Willump | -1.10 | 0.46 | 1.56 |  |
