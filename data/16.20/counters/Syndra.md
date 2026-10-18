# Counters to Syndra (patch 26.20)

Every champion ranked by what its kit does against Syndra's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Syndra's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Syndra` for the full ledger of a matchup, with sources.

## Top 10

### 1. Kayle (net +0.97)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Syndra's Unleashed Power. Invulnerable for 2.5 s, long enough to use ahead of Unleashed Power. (Kayle R Divine Judgment → Syndra R Unleashed Power)
- **0.44** death prevention: Syndra's Unleashed Power can't execute Kayle during Divine Judgment (invulnerable). Divine Judgment lasts 2.5 s on a 80 s cooldown. (Kayle R Divine Judgment → Syndra R Unleashed Power)
- **0.18** invulnerable: Divine Judgment makes Kayle invulnerable to Syndra's Scatter the Weak (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Scatter the Weak. (Kayle R Divine Judgment → Syndra E Scatter the Weak)

### 2. Fizz (net +0.94)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Syndra's Scatter the Weak. Untargetable for 0.75 s; Scatter the Weak takes 0.53 s to land, enough to react. (Fizz E Playful → Syndra E Scatter the Weak)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Syndra's Unleashed Power. Untargetable for 0.75 s; Unleashed Power takes 0.25 s to land, enough to react. (Fizz E Playful → Syndra R Unleashed Power)
- **0.27** untargetable: Playful makes Fizz untargetable, dodging Syndra's Force of Will. Untargetable for 0.75 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

### 3. Fiora (net +0.88)

- **0.77** parry: Riposte parries Syndra's Scatter the Weak and stuns back. Parry for 0.75 s; Scatter the Weak takes 0.53 s to land, enough to react. Negating Scatter the Weak's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Syndra E Scatter the Weak)
- **0.55** parry: Riposte parries Syndra's Unleashed Power. Parry for 0.75 s; Unleashed Power takes 0.25 s to land, enough to react. (Fiora W Riposte → Syndra R Unleashed Power)
- **0.20** parry: Riposte parries Syndra's Force of Will. Parry for 0.75 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### 4. Sivir (net +0.86)

- **0.63** spell shield: Spell Shield's spell shield blocks Syndra's Scatter the Weak. Spell shield for 1.5 s, long enough to use ahead of Scatter the Weak. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Syndra E Scatter the Weak)
- **0.32** spell shield: Spell Shield's spell shield blocks Syndra's Force of Will. Spell shield for 1.5 s, long enough to use ahead of Force of Will. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Syndra W Force of Will)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Syndra's Unleashed Power. Spell shield for 1.5 s, long enough to use ahead of Unleashed Power. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the damage of a single sphere. (Sivir E Spell Shield → Syndra R Unleashed Power)

### 5. Vladimir (net +0.85)

- **0.67** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2 s, long enough to use ahead of Scatter the Weak. (Vladimir W Sanguine Pool → Syndra E Scatter the Weak)
- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Unleashed Power. Untargetable for 2 s, long enough to use ahead of Unleashed Power. (Vladimir W Sanguine Pool → Syndra R Unleashed Power)
- **0.33** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Syndra's Force of Will. Untargetable for 2 s, long enough to use ahead of Force of Will. (Vladimir W Sanguine Pool → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### 6. Maokai (net +0.82)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Scatter the Weak. Untargetable for 1.4 s; Scatter the Weak takes 0.53 s to land, enough to react. (Maokai W Twisted Advance → Syndra E Scatter the Weak)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Unleashed Power. Untargetable for 1.4 s; Unleashed Power takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Syndra R Unleashed Power)
- **0.25** untargetable: Twisted Advance makes Maokai untargetable, dodging Syndra's Force of Will. Untargetable for 1.4 s; Force of Will lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Syndra W Force of Will)
- Watch out: Syndra's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

### 7. Nocturne (net +0.81)

- **0.70** spell shield: Shroud of Darkness's spell shield blocks Syndra's Scatter the Weak. Spell shield for 1.5 s, long enough to use ahead of Scatter the Weak. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Syndra E Scatter the Weak)
- **0.38** spell shield: Shroud of Darkness's spell shield blocks Syndra's Force of Will. Spell shield for 1.5 s, long enough to use ahead of Force of Will. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Syndra W Force of Will)
- **0.28** spell shield: Shroud of Darkness's spell shield blocks part of Syndra's Unleashed Power. Spell shield for 1.5 s, long enough to use ahead of Unleashed Power. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only block the damage of a single sphere. (Nocturne W Shroud of Darkness → Syndra R Unleashed Power)
- Watch out: Syndra's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

### 8. Bard (net +0.78)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Unleashed Power. Untargetable for 2.5 s, long enough to use ahead of Unleashed Power. (Bard R Tempered Fate → Syndra R Unleashed Power)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2.5 s, long enough to use ahead of Scatter the Weak. (Bard R Tempered Fate → Syndra E Scatter the Weak)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Syndra's Force of Will. Untargetable for 2.5 s, long enough to use ahead of Force of Will. (Bard R Tempered Fate → Syndra W Force of Will)

### 9. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Unleashed Power. Untargetable for 2.5 s, long enough to use ahead of Unleashed Power. (Lissandra R Frozen Tomb → Syndra R Unleashed Power)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Scatter the Weak. Untargetable for 2.5 s, long enough to use ahead of Scatter the Weak. (Lissandra R Frozen Tomb → Syndra E Scatter the Weak)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Syndra's Force of Will. Untargetable for 2.5 s, long enough to use ahead of Force of Will. (Lissandra R Frozen Tomb → Syndra W Force of Will)

### 10. Samira (net +0.74)

- **0.55** projectile block: Blade Whirl blocks Syndra's Unleashed Power, a projectile. Blade Whirl for 0.75 s; Unleashed Power takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Syndra R Unleashed Power)
- **0.28** projectile block: Blade Whirl blocks part of Syndra's Scatter the Weak, a projectile. Blade Whirl for 0.75 s; Scatter the Weak takes 0.53 s to land, enough to react. Only part of the ability is a projectile. Scatter the Weak is blocked by the portion of Wind Wall it collides with. Spheres thrown will stop upon colliding with the wall. (Samira W Blade Whirl → Syndra E Scatter the Weak)
- **0.19** projectile block: Blade Whirl blocks Syndra's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Syndra basic attacks)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +0.97 | 0.97 | 0.00 |  |
| 2 | Fizz | +0.94 | 1.04 | 0.10 |  |
| 3 | Fiora | +0.88 | 1.10 | 0.22 |  |
| 4 | Sivir | +0.86 | 0.86 | 0.00 |  |
| 5 | Vladimir | +0.85 | 1.03 | 0.18 |  |
| 6 | Maokai | +0.82 | 1.04 | 0.22 |  |
| 7 | Nocturne | +0.81 | 1.03 | 0.22 |  |
| 8 | Bard | +0.78 | 0.78 | 0.00 |  |
| 9 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 10 | Samira | +0.74 | 0.74 | 0.00 | projectile block (Blade Whirl) |
| 11 | Gwen | +0.73 | 0.95 | 0.22 |  |
| 12 | Mel | +0.73 | 0.73 | 0.00 | projectile block (Rebuttal) |
| 13 | Xayah | +0.70 | 0.70 | 0.00 |  |
| 14 | Master Yi | +0.69 | 1.08 | 0.39 |  |
| 15 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 16 | Zaahen | +0.68 | 0.82 | 0.14 |  |
| 17 | Rek'Sai | +0.65 | 0.79 | 0.14 |  |
| 18 | Yasuo | +0.64 | 0.78 | 0.14 | projectile block (Wind Wall) |
| 19 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 20 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 21 | Camille | +0.61 | 0.72 | 0.11 |  |
| 22 | Morgana | +0.60 | 0.71 | 0.11 |  |
| 23 | Yuumi | +0.58 | 1.04 | 0.46 |  |
| 24 | Braum | +0.58 | 0.80 | 0.22 | projectile block (Unbreakable) |
| 25 | Udyr | +0.54 | 0.76 | 0.22 |  |
| 26 | Zed | +0.53 | 0.68 | 0.15 |  |
| 27 | Xin Zhao | +0.52 | 0.73 | 0.21 |  |
| 28 | Zilean | +0.44 | 0.44 | 0.00 |  |
| 29 | Milio | +0.37 | 0.37 | 0.00 |  |
| 30 | Kindred | +0.35 | 0.35 | 0.00 |  |
| 31 | Kalista | +0.29 | 0.29 | 0.00 |  |
| 32 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 33 | Kled | +0.28 | 0.36 | 0.08 |  |
| 34 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 35 | Anivia | +0.26 | 0.26 | 0.00 |  |
| 36 | Pantheon | +0.24 | 0.87 | 0.63 |  |
| 37 | Tryndamere | +0.23 | 0.44 | 0.21 |  |
| 38 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 39 | Kayn | +0.17 | 0.76 | 0.59 |  |
| 40 | Gangplank | +0.16 | 0.60 | 0.44 |  |
| 41 | Rengar | +0.16 | 0.60 | 0.44 |  |
| 42 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 43 | Heimerdinger | +0.10 | 0.10 | 0.00 |  |
| 44 | Alistar | +0.09 | 0.31 | 0.22 |  |
| 45 | Annie | +0.08 | 0.08 | 0.00 |  |
| 46 | Vex | +0.07 | 0.07 | 0.00 |  |
| 47 | K'Sante | +0.03 | 0.14 | 0.11 |  |
| 48 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 49 | Jax | +0.01 | 0.23 | 0.22 |  |
| 50 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 51 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 52 | Azir | 0.00 | 0.00 | 0.00 |  |
| 53 | Brand | 0.00 | 0.00 | 0.00 |  |
| 54 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 55 | Corki | 0.00 | 0.00 | 0.00 |  |
| 56 | Draven | 0.00 | 0.00 | 0.00 |  |
| 57 | Elise | 0.00 | 0.00 | 0.00 |  |
| 58 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 59 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 60 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 61 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 62 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 63 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 64 | Karma | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 67 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 68 | Lux | 0.00 | 0.00 | 0.00 |  |
| 69 | Nami | 0.00 | 0.00 | 0.00 |  |
| 70 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 71 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 72 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 73 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 74 | Senna | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 81 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 82 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 83 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 84 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 85 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 86 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 87 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 88 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 89 | Malphite | -0.01 | 0.21 | 0.22 |  |
| 90 | Malzahar | -0.02 | 0.38 | 0.40 |  |
| 91 | Garen | -0.03 | 0.38 | 0.41 |  |
| 92 | Jarvan IV | -0.03 | 0.07 | 0.10 |  |
| 93 | Yone | -0.03 | 0.07 | 0.10 |  |
| 94 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 95 | Olaf | -0.05 | 0.39 | 0.44 |  |
| 96 | Graves | -0.05 | 0.00 | 0.05 |  |
| 97 | Hecarim | -0.07 | 0.07 | 0.14 |  |
| 98 | Ornn | -0.07 | 0.07 | 0.14 |  |
| 99 | Aurelion Sol | -0.07 | 0.00 | 0.07 |  |
| 100 | Volibear | -0.08 | 0.07 | 0.15 |  |
| 101 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 102 | Sion | -0.10 | 0.42 | 0.52 |  |
| 103 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 104 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 105 | Varus | -0.10 | 0.00 | 0.10 |  |
| 106 | Briar | -0.11 | 0.00 | 0.11 |  |
| 107 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 108 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 109 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 110 | Rell | -0.14 | 0.00 | 0.14 |  |
| 111 | Illaoi | -0.15 | 0.07 | 0.22 |  |
| 112 | Sett | -0.15 | 0.07 | 0.22 |  |
| 113 | Shyvana | -0.15 | 0.07 | 0.22 |  |
| 114 | Akali | -0.15 | 0.00 | 0.15 |  |
| 115 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 116 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 117 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 118 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 119 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 120 | Riven | -0.15 | 0.00 | 0.15 |  |
| 121 | Talon | -0.15 | 0.00 | 0.15 |  |
| 122 | Ivern | -0.16 | 0.00 | 0.16 |  |
| 123 | Quinn | -0.17 | 0.00 | 0.17 |  |
| 124 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 125 | Viego | -0.21 | 0.07 | 0.28 |  |
| 126 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 127 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 128 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 129 | Rammus | -0.22 | 0.22 | 0.44 |  |
| 130 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 131 | Diana | -0.22 | 0.00 | 0.22 |  |
| 132 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 133 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 134 | Leona | -0.22 | 0.00 | 0.22 |  |
| 135 | Locke | -0.22 | 0.00 | 0.22 |  |
| 136 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 137 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 138 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 139 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 140 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 141 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 142 | Pyke | -0.28 | 0.00 | 0.28 |  |
| 143 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 144 | Warwick | -0.32 | 0.46 | 0.78 |  |
| 145 | Skarner | -0.32 | 0.12 | 0.44 |  |
| 146 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 147 | Zac | -0.34 | 0.25 | 0.59 |  |
| 148 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 149 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 150 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 151 | Gragas | -0.36 | 0.00 | 0.36 |  |
| 152 | Shen | -0.38 | 0.22 | 0.60 |  |
| 153 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 154 | Vi | -0.40 | 0.07 | 0.47 |  |
| 155 | Janna | -0.40 | 0.00 | 0.40 |  |
| 156 | Darius | -0.41 | 0.00 | 0.41 |  |
| 157 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 158 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 159 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 160 | Fiddlesticks | -0.43 | 0.00 | 0.43 |  |
| 161 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 162 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 163 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 164 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 165 | Singed | -0.44 | 0.00 | 0.44 |  |
| 166 | Taric | -0.44 | 0.00 | 0.44 |  |
| 167 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 168 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 169 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 170 | Nunu & Willump | -0.68 | 0.24 | 0.92 |  |
| 171 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 172 | Galio | -0.74 | 0.00 | 0.74 |  |
