# Counters to Qiyana (patch 26.20)

Every champion ranked by what its kit does against Qiyana's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Qiyana's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Qiyana` for the full ledger of a matchup, with sources.

## Top 10

### 1. Fizz (net +1.53)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 0.75 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Fizz E Playful → Qiyana R Supreme Display of Talent)
- **0.74** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Audacity. Untargetable for 0.75 s; Audacity takes 1.08 s to land, enough to react. (Fizz E Playful → Qiyana E Audacity)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 0.75 s; Elemental Wrath takes 0.54 s to land, enough to react. (Fizz E Playful → Qiyana Q Elemental Wrath)

### 2. Sivir (net +1.47)

- **0.80** spell shield: Spell Shield's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana R Supreme Display of Talent)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana E Audacity)
- **0.51** spell shield: Spell Shield's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Qiyana Q Elemental Wrath)

### 3. Kled (net +1.44)

- **0.80** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Qiyana's Supreme Display of Talent (airborne, stun). Immune for ?; Supreme Display of Talent takes 0.69 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Qiyana R Supreme Display of Talent)
- **0.32** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Qiyana's Elemental Wrath (slow, root). Immune for ?; Elemental Wrath takes 0.54 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Qiyana Q Elemental Wrath)
- **0.18** reveal: Bear Trap on a Rope reveals Qiyana through Elemental Wrath's stealth. (Kled Q Bear Trap on a Rope → Qiyana Q Elemental Wrath)

### 4. Morgana (net +1.37)

- **0.80** cc immunity: Black Shield makes Morgana immune to Qiyana's Supreme Display of Talent (airborne, stun). Immune for 5 s, long enough to use ahead of Supreme Display of Talent. (Morgana E Black Shield → Qiyana R Supreme Display of Talent)
- **0.54** cc immunity: Black Shield makes Morgana immune to Qiyana's Elemental Wrath (slow, root). Immune for 5 s, long enough to use ahead of Elemental Wrath. (Morgana E Black Shield → Qiyana Q Elemental Wrath)
- **0.18** reveal: Soul Shackles reveals Qiyana through Elemental Wrath's stealth. (Morgana R Soul Shackles → Qiyana Q Elemental Wrath)

### 5. Fiora (net +1.36)

- **0.90** parry: Riposte parries Qiyana's Supreme Display of Talent and stuns back. Parry for 0.75 s; Supreme Display of Talent takes 0.69 s to land, enough to react. Negating Supreme Display of Talent's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana R Supreme Display of Talent)
- **0.64** parry: Riposte parries Qiyana's Elemental Wrath and stuns back. Parry for 0.75 s; Elemental Wrath takes 0.54 s to land, enough to react. Negating Elemental Wrath's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Qiyana Q Elemental Wrath)
- **0.53** parry: Riposte parries Qiyana's Audacity. Parry for 0.75 s; Audacity takes 1.08 s to land, enough to react. (Fiora W Riposte → Qiyana E Audacity)

### 6. Nocturne (net +1.35)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Supreme Display of Talent. Spell shield for 1.5 s, long enough to use ahead of Supreme Display of Talent. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana R Supreme Display of Talent)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Elemental Wrath. Spell shield for 1.5 s, long enough to use ahead of Elemental Wrath. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana Q Elemental Wrath)
- **0.60** spell shield: Shroud of Darkness's spell shield blocks Qiyana's Audacity. Spell shield for 1.5 s, long enough to use ahead of Audacity. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Qiyana E Audacity)

### 7. Maokai (net +1.32)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.4 s; Supreme Display of Talent takes 0.69 s to land, enough to react. (Maokai W Twisted Advance → Qiyana R Supreme Display of Talent)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.4 s; Elemental Wrath takes 0.54 s to land, enough to react. (Maokai W Twisted Advance → Qiyana Q Elemental Wrath)
- **0.66** untargetable: Twisted Advance makes Maokai untargetable, dodging Qiyana's Audacity. Untargetable for 1.4 s; Audacity takes 1.08 s to land, enough to react. (Maokai W Twisted Advance → Qiyana E Audacity)

### 8. Xayah (net +1.30)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 1.5 s, long enough to use ahead of Supreme Display of Talent. (Xayah R Featherstorm → Qiyana R Supreme Display of Talent)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Audacity. Untargetable for 1.5 s, long enough to use ahead of Audacity. (Xayah R Featherstorm → Qiyana E Audacity)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 1.5 s, long enough to use ahead of Elemental Wrath. (Xayah R Featherstorm → Qiyana Q Elemental Wrath)

### 9. Bard (net +1.28)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Supreme Display of Talent. Untargetable for 2.5 s, long enough to use ahead of Supreme Display of Talent. (Bard R Tempered Fate → Qiyana R Supreme Display of Talent)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Audacity. Untargetable for 2.5 s, long enough to use ahead of Audacity. (Bard R Tempered Fate → Qiyana E Audacity)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Qiyana's Elemental Wrath. Untargetable for 2.5 s, long enough to use ahead of Elemental Wrath. (Bard R Tempered Fate → Qiyana Q Elemental Wrath)

### 10. Rengar (net +1.28)

- **0.64** cleanse: Battle Roar cleanses Qiyana's Supreme Display of Talent (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Qiyana R Supreme Display of Talent)
- **0.56** cleanse: Battle Roar cleanses Qiyana's Elemental Wrath (slow, root) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Qiyana Q Elemental Wrath)
- **0.18** reveal: Bola Strike reveals Qiyana through Elemental Wrath's stealth. (Rengar E Bola Strike → Qiyana Q Elemental Wrath)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.53 | 1.53 | 0.00 |  |
| 2 | Sivir | +1.47 | 1.47 | 0.00 |  |
| 3 | Kled | +1.44 | 1.44 | 0.00 |  |
| 4 | Morgana | +1.37 | 1.37 | 0.00 |  |
| 5 | Fiora | +1.36 | 1.36 | 0.00 |  |
| 6 | Nocturne | +1.35 | 1.35 | 0.00 |  |
| 7 | Maokai | +1.32 | 1.32 | 0.00 |  |
| 8 | Xayah | +1.30 | 1.30 | 0.00 |  |
| 9 | Bard | +1.28 | 1.28 | 0.00 |  |
| 10 | Rengar | +1.28 | 1.28 | 0.00 |  |
| 11 | Vladimir | +1.26 | 1.31 | 0.05 |  |
| 12 | Aurora | +1.26 | 1.26 | 0.00 |  |
| 13 | Lissandra | +1.25 | 1.25 | 0.00 |  |
| 14 | Yuumi | +1.23 | 1.58 | 0.35 |  |
| 15 | Master Yi | +1.20 | 1.30 | 0.10 |  |
| 16 | Gwen | +1.18 | 1.18 | 0.00 |  |
| 17 | Udyr | +1.15 | 1.15 | 0.00 |  |
| 18 | Rek'Sai | +1.09 | 1.09 | 0.00 |  |
| 19 | Camille | +1.07 | 1.07 | 0.00 |  |
| 20 | Evelynn | +1.06 | 1.06 | 0.00 |  |
| 21 | Shaco | +1.06 | 1.06 | 0.00 |  |
| 22 | Zed | +1.06 | 1.06 | 0.00 |  |
| 23 | Milio | +1.05 | 1.05 | 0.00 |  |
| 24 | Hwei | +1.00 | 1.00 | 0.00 |  |
| 25 | Kalista | +0.97 | 0.97 | 0.00 |  |
| 26 | Olaf | +0.97 | 0.97 | 0.00 |  |
| 27 | Zaahen | +0.97 | 0.97 | 0.00 |  |
| 28 | Yasuo | +0.91 | 0.91 | 0.00 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 29 | Sion | +0.90 | 0.98 | 0.08 |  |
| 30 | Braum | +0.90 | 0.90 | 0.00 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 31 | Gangplank | +0.87 | 0.87 | 0.00 |  |
| 32 | Kayle | +0.86 | 0.86 | 0.00 |  |
| 33 | Samira | +0.86 | 0.86 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 34 | Mel | +0.82 | 0.82 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 35 | Vex | +0.81 | 0.81 | 0.00 |  |
| 36 | Alistar | +0.78 | 0.78 | 0.00 |  |
| 37 | Kayn | +0.73 | 1.09 | 0.36 |  |
| 38 | Cassiopeia | +0.72 | 0.72 | 0.00 |  |
| 39 | Malzahar | +0.70 | 1.02 | 0.32 |  |
| 40 | Lulu | +0.70 | 0.70 | 0.00 |  |
| 41 | Jinx | +0.68 | 0.68 | 0.00 |  |
| 42 | Warwick | +0.66 | 1.13 | 0.47 |  |
| 43 | Viktor | +0.64 | 0.64 | 0.00 |  |
| 44 | Garen | +0.62 | 0.62 | 0.00 |  |
| 45 | Xin Zhao | +0.62 | 0.62 | 0.00 |  |
| 46 | Ahri | +0.60 | 0.60 | 0.00 |  |
| 47 | Teemo | +0.60 | 0.60 | 0.00 |  |
| 48 | Singed | +0.59 | 0.59 | 0.00 |  |
| 49 | Veigar | +0.58 | 0.58 | 0.00 |  |
| 50 | Poppy | +0.50 | 0.68 | 0.18 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 51 | Karma | +0.50 | 0.50 | 0.00 |  |
| 52 | Renata Glasc | +0.44 | 0.44 | 0.00 |  |
| 53 | Kai'Sa | +0.42 | 0.42 | 0.00 |  |
| 54 | Skarner | +0.41 | 0.41 | 0.00 |  |
| 55 | Elise | +0.40 | 0.40 | 0.00 |  |
| 56 | Zac | +0.38 | 0.60 | 0.22 |  |
| 57 | Caitlyn | +0.37 | 0.60 | 0.23 |  |
| 58 | Nidalee | +0.37 | 0.37 | 0.00 |  |
| 59 | Lee Sin | +0.36 | 0.36 | 0.00 |  |
| 60 | Yone | +0.35 | 0.35 | 0.00 |  |
| 61 | Nilah | +0.34 | 0.34 | 0.00 |  |
| 62 | Zyra | +0.34 | 0.34 | 0.00 |  |
| 63 | Aphelios | +0.33 | 0.33 | 0.00 |  |
| 64 | Jax | +0.32 | 0.32 | 0.00 |  |
| 65 | LeBlanc | +0.32 | 0.32 | 0.00 |  |
| 66 | Nasus | +0.30 | 0.30 | 0.00 |  |
| 67 | Thresh | +0.30 | 0.30 | 0.00 |  |
| 68 | Pantheon | +0.29 | 0.77 | 0.48 |  |
| 69 | Kindred | +0.29 | 0.29 | 0.00 |  |
| 70 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 71 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 72 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 73 | Malphite | +0.28 | 0.28 | 0.00 |  |
| 74 | Amumu | +0.27 | 0.27 | 0.00 |  |
| 75 | Sona | +0.27 | 0.27 | 0.00 |  |
| 76 | Urgot | +0.27 | 0.27 | 0.00 |  |
| 77 | Illaoi | +0.26 | 0.26 | 0.00 |  |
| 78 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 79 | Draven | +0.24 | 0.24 | 0.00 |  |
| 80 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 81 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 82 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 83 | Mordekaiser | +0.22 | 0.22 | 0.00 |  |
| 84 | Senna | +0.22 | 0.22 | 0.00 |  |
| 85 | Sett | +0.22 | 0.22 | 0.00 |  |
| 86 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 87 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 88 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 89 | Gnar | +0.21 | 0.21 | 0.00 |  |
| 90 | Corki | +0.20 | 0.20 | 0.00 |  |
| 91 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 92 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 93 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 94 | Lux | +0.19 | 0.19 | 0.00 |  |
| 95 | Akshan | +0.18 | 0.39 | 0.21 |  |
| 96 | Aatrox | +0.18 | 0.18 | 0.00 |  |
| 97 | Akali | +0.18 | 0.18 | 0.00 |  |
| 98 | Ambessa | +0.18 | 0.18 | 0.00 |  |
| 99 | Briar | +0.18 | 0.18 | 0.00 |  |
| 100 | Seraphine | +0.18 | 0.18 | 0.00 |  |
| 101 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 102 | Sylas | +0.18 | 0.18 | 0.00 |  |
| 103 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 104 | Azir | +0.17 | 0.17 | 0.00 |  |
| 105 | Kog'Maw | +0.17 | 0.17 | 0.00 |  |
| 106 | Orianna | +0.17 | 0.17 | 0.00 |  |
| 107 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 108 | K'Sante | +0.16 | 0.16 | 0.00 |  |
| 109 | Fiddlesticks | +0.15 | 0.48 | 0.33 |  |
| 110 | Rammus | +0.15 | 0.30 | 0.15 |  |
| 111 | Annie | +0.15 | 0.15 | 0.00 |  |
| 112 | Brand | +0.15 | 0.15 | 0.00 |  |
| 113 | Graves | +0.15 | 0.15 | 0.00 |  |
| 114 | Nami | +0.15 | 0.15 | 0.00 |  |
| 115 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 116 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 117 | Varus | +0.13 | 0.18 | 0.05 |  |
| 118 | Swain | +0.13 | 0.13 | 0.00 |  |
| 119 | Twisted Fate | +0.12 | 0.45 | 0.33 |  |
| 120 | Quinn | +0.11 | 0.24 | 0.13 |  |
| 121 | Aurelion Sol | +0.09 | 0.15 | 0.06 |  |
| 122 | Hecarim | +0.08 | 0.08 | 0.00 |  |
| 123 | Jarvan IV | +0.08 | 0.08 | 0.00 |  |
| 124 | Ornn | +0.08 | 0.08 | 0.00 |  |
| 125 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 126 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 127 | Rakan | +0.07 | 0.07 | 0.00 |  |
| 128 | Lillia | +0.06 | 0.06 | 0.00 |  |
| 129 | Ivern | +0.05 | 0.12 | 0.07 |  |
| 130 | Vi | 0.00 | 0.22 | 0.22 |  |
| 131 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 132 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 133 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 134 | Darius | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Leona | 0.00 | 0.00 | 0.00 |  |
| 142 | Locke | 0.00 | 0.00 | 0.00 |  |
| 143 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 144 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 145 | Rell | 0.00 | 0.00 | 0.00 |  |
| 146 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 147 | Riven | 0.00 | 0.00 | 0.00 |  |
| 148 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 149 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 150 | Talon | 0.00 | 0.00 | 0.00 |  |
| 151 | Taric | 0.00 | 0.00 | 0.00 |  |
| 152 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 153 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 154 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 155 | Lucian | -0.01 | 0.22 | 0.23 |  |
| 156 | Miss Fortune | -0.03 | 0.22 | 0.25 |  |
| 157 | Viego | -0.03 | 0.08 | 0.11 |  |
| 158 | Jhin | -0.05 | 0.18 | 0.23 |  |
| 159 | Vel'Koz | -0.05 | 0.17 | 0.22 |  |
| 160 | Pyke | -0.08 | 0.00 | 0.08 |  |
| 161 | Gragas | -0.10 | 0.00 | 0.10 |  |
| 162 | Nunu & Willump | -0.11 | 0.20 | 0.31 |  |
| 163 | Xerath | -0.11 | 0.17 | 0.28 |  |
| 164 | Janna | -0.12 | 0.24 | 0.36 |  |
| 165 | Shen | -0.15 | 0.30 | 0.45 |  |
| 166 | Karthus | -0.16 | 0.12 | 0.28 |  |
| 167 | Katarina | -0.17 | 0.00 | 0.17 |  |
| 168 | Naafiri | -0.18 | 0.18 | 0.36 |  |
| 169 | Ryze | -0.19 | 0.16 | 0.35 |  |
| 170 | Tahm Kench | -0.24 | 0.00 | 0.24 |  |
| 171 | Taliyah | -0.31 | 0.17 | 0.48 |  |
| 172 | Galio | -0.54 | 0.00 | 0.54 |  |
