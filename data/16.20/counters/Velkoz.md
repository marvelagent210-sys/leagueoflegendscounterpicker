# Counters to Vel'Koz (patch 26.20)

Every champion ranked by what its kit does against Vel'Koz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Vel'Koz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Velkoz` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.96)

- **0.51** untargetable: Rappel makes Elise untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 0.6 s; Tectonic Disruption takes 0.25 s to land, enough to react. (Elise E Rappel → Vel'Koz E Tectonic Disruption)
- **0.33** untargetable: Rappel makes Elise untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 0.6 s; Life Form Disintegration Ray lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Elise E Rappel → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Cocoon's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Cocoon must land during the channel. (Elise E Cocoon → Vel'Koz R Life Form Disintegration Ray)

### 2. Maokai (net +0.88)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 1.4 s; Tectonic Disruption takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Vel'Koz E Tectonic Disruption)
- **0.33** untargetable: Twisted Advance makes Maokai untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 1.4 s; Life Form Disintegration Ray lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Bramble Smash's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 3. Rek'Sai (net +0.85)

- **0.55** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 1.5 s, long enough to use ahead of Life Form Disintegration Ray. (Rek'Sai R Void Rush → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Void Rush makes Rek'Sai untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 1.5 s, long enough to use ahead of Tectonic Disruption. (Rek'Sai R Void Rush → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Unburrow's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### 4. Bard (net +0.79)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 2.5 s, long enough to use ahead of Life Form Disintegration Ray. (Bard R Tempered Fate → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 2.5 s, long enough to use ahead of Tectonic Disruption. (Bard R Tempered Fate → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Tempered Fate's stasis interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Tempered Fate must land during the channel. (Bard R Tempered Fate → Vel'Koz R Life Form Disintegration Ray)

### 5. Lissandra (net +0.79)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 2.5 s, long enough to use ahead of Life Form Disintegration Ray. (Lissandra R Frozen Tomb → Vel'Koz R Life Form Disintegration Ray)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 2.5 s, long enough to use ahead of Tectonic Disruption. (Lissandra R Frozen Tomb → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Frozen Tomb's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Frozen Tomb must land during the channel. (Lissandra R Frozen Tomb → Vel'Koz R Life Form Disintegration Ray)

### 6. Nocturne (net +0.71)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Vel'Koz's Tectonic Disruption. Spell shield for 1.5 s, long enough to use ahead of Tectonic Disruption. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Unspeakable Horror's fear interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Vel'Koz R Life Form Disintegration Ray)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Vel'Koz's Tectonic Disruption (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Vel'Koz E Tectonic Disruption)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

### 7. Braum (net +0.66)

- **0.42** projectile block: Unbreakable blocks Vel'Koz's Plasma Fission, a projectile. Unbreakable for 4 s, long enough to use ahead of Plasma Fission. (Braum E Unbreakable → Vel'Koz Q Plasma Fission)
- **0.35** projectile block: Unbreakable blocks part of Vel'Koz's Tectonic Disruption, a projectile. Unbreakable for 4 s, long enough to use ahead of Tectonic Disruption. Only part of the ability is a projectile. While the effect is fully prevented by blocking the missile (e.g. with Unbreakable and Wind Wall), the missile may not be destroyed visually. The area of effect indicator appears at the end of the cast time.
  - It will persist even if the cast cancels (e.g. Vel'Koz dies before cast time completes) despite the projectile not firing. (Braum E Unbreakable → Vel'Koz E Tectonic Disruption)
- **0.28** interrupt: Concussive Blows's stun interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 8. Camille (net +0.65)

- **0.33** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 0.5 s; Tectonic Disruption takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Vel'Koz E Tectonic Disruption)
- **0.31** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 0.5 s; Life Form Disintegration Ray lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Camille R The Hextech Ultimatum → Vel'Koz R Life Form Disintegration Ray)
- **0.28** interrupt: Wall Dive's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Wall Dive must land during the channel. (Camille E Wall Dive → Vel'Koz R Life Form Disintegration Ray)
- Watch out: Vel'Koz's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range).

### 9. Milio (net +0.65)

- **0.28** interrupt: Ultra Mega Fire Kick's airborne interrupts Vel'Koz's Life Form Disintegration Ray (normal channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Vel'Koz R Life Form Disintegration Ray)
- **0.25** cleanse: Breath of Life cleanses Vel'Koz's Tectonic Disruption (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Vel'Koz E Tectonic Disruption)
- **0.19** tenacity: Breath of Life's 65% tenacity shortens Vel'Koz's Tectonic Disruption (stun). Breath of Life lasts 3 s on a 130 s cooldown. (Milio R Breath of Life → Vel'Koz E Tectonic Disruption)

### 10. Vladimir (net +0.64)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Vel'Koz's Life Form Disintegration Ray. Untargetable for 2 s, long enough to use ahead of Life Form Disintegration Ray. (Vladimir W Sanguine Pool → Vel'Koz R Life Form Disintegration Ray)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Vel'Koz's Tectonic Disruption. Untargetable for 2 s, long enough to use ahead of Tectonic Disruption. (Vladimir W Sanguine Pool → Vel'Koz E Tectonic Disruption)
- Watch out: Vel'Koz's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.96 | 0.96 | 0.00 |  |
| 2 | Maokai | +0.88 | 1.15 | 0.27 |  |
| 3 | Rek'Sai | +0.85 | 1.01 | 0.16 |  |
| 4 | Bard | +0.79 | 0.79 | 0.00 |  |
| 5 | Lissandra | +0.79 | 0.79 | 0.00 |  |
| 6 | Nocturne | +0.71 | 0.98 | 0.27 |  |
| 7 | Braum | +0.66 | 0.93 | 0.27 | projectile block (Unbreakable) |
| 8 | Camille | +0.65 | 0.78 | 0.13 |  |
| 9 | Milio | +0.65 | 0.65 | 0.00 |  |
| 10 | Vladimir | +0.64 | 0.82 | 0.18 |  |
| 11 | Xayah | +0.64 | 0.64 | 0.00 |  |
| 12 | Udyr | +0.62 | 0.89 | 0.27 |  |
| 13 | Evelynn | +0.60 | 0.78 | 0.18 |  |
| 14 | Shaco | +0.60 | 0.78 | 0.18 |  |
| 15 | Yasuo | +0.59 | 0.75 | 0.16 |  |
| 16 | Fiora | +0.57 | 0.82 | 0.25 |  |
| 17 | Kled | +0.56 | 0.65 | 0.09 |  |
| 18 | Tristana | +0.56 | 0.56 | 0.00 |  |
| 19 | Kayle | +0.55 | 0.55 | 0.00 |  |
| 20 | Morgana | +0.53 | 0.63 | 0.10 |  |
| 21 | Lulu | +0.53 | 0.53 | 0.00 |  |
| 22 | Sivir | +0.51 | 0.51 | 0.00 |  |
| 23 | Zaahen | +0.50 | 0.66 | 0.16 |  |
| 24 | Aurora | +0.48 | 0.48 | 0.00 |  |
| 25 | Samira | +0.44 | 0.44 | 0.00 |  |
| 26 | Gwen | +0.43 | 0.68 | 0.25 |  |
| 27 | Ashe | +0.42 | 0.42 | 0.00 |  |
| 28 | Mel | +0.40 | 0.40 | 0.00 |  |
| 29 | Yuumi | +0.39 | 0.87 | 0.48 |  |
| 30 | Annie | +0.39 | 0.39 | 0.00 |  |
| 31 | Kalista | +0.39 | 0.39 | 0.00 |  |
| 32 | Master Yi | +0.37 | 0.83 | 0.46 |  |
| 33 | Xin Zhao | +0.37 | 0.60 | 0.23 |  |
| 34 | Anivia | +0.37 | 0.37 | 0.00 |  |
| 35 | Heimerdinger | +0.37 | 0.37 | 0.00 |  |
| 36 | Alistar | +0.35 | 0.62 | 0.27 |  |
| 37 | Ekko | +0.35 | 0.53 | 0.18 |  |
| 38 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 39 | Vex | +0.35 | 0.35 | 0.00 |  |
| 40 | Nilah | +0.33 | 0.53 | 0.20 |  |
| 41 | Corki | +0.32 | 0.32 | 0.00 |  |
| 42 | Zed | +0.29 | 0.47 | 0.18 |  |
| 43 | K'Sante | +0.29 | 0.42 | 0.13 |  |
| 44 | Malzahar | +0.28 | 0.68 | 0.40 |  |
| 45 | Ahri | +0.28 | 0.28 | 0.00 |  |
| 46 | Brand | +0.28 | 0.28 | 0.00 |  |
| 47 | Cassiopeia | +0.28 | 0.28 | 0.00 |  |
| 48 | Draven | +0.28 | 0.28 | 0.00 |  |
| 49 | Gnar | +0.28 | 0.28 | 0.00 |  |
| 50 | Hwei | +0.28 | 0.28 | 0.00 |  |
| 51 | Jayce | +0.28 | 0.28 | 0.00 |  |
| 52 | Kennen | +0.28 | 0.28 | 0.00 |  |
| 53 | Nami | +0.28 | 0.28 | 0.00 |  |
| 54 | Orianna | +0.28 | 0.28 | 0.00 |  |
| 55 | Renata Glasc | +0.28 | 0.28 | 0.00 |  |
| 56 | Seraphine | +0.28 | 0.28 | 0.00 |  |
| 57 | Soraka | +0.28 | 0.28 | 0.00 |  |
| 58 | Swain | +0.28 | 0.28 | 0.00 |  |
| 59 | Syndra | +0.28 | 0.28 | 0.00 |  |
| 60 | Vayne | +0.28 | 0.28 | 0.00 |  |
| 61 | Veigar | +0.28 | 0.28 | 0.00 |  |
| 62 | Viktor | +0.28 | 0.28 | 0.00 |  |
| 63 | Ziggs | +0.28 | 0.28 | 0.00 |  |
| 64 | Zilean | +0.28 | 0.28 | 0.00 |  |
| 65 | Zoe | +0.28 | 0.28 | 0.00 |  |
| 66 | Warwick | +0.26 | 0.74 | 0.48 |  |
| 67 | Azir | +0.26 | 0.26 | 0.00 |  |
| 68 | Neeko | +0.26 | 0.26 | 0.00 |  |
| 69 | Zyra | +0.26 | 0.26 | 0.00 |  |
| 70 | Thresh | +0.25 | 0.28 | 0.03 |  |
| 71 | Sona | +0.24 | 0.24 | 0.00 |  |
| 72 | Yone | +0.23 | 0.35 | 0.12 |  |
| 73 | Kindred | +0.23 | 0.23 | 0.00 |  |
| 74 | Malphite | +0.19 | 0.46 | 0.27 |  |
| 75 | Ornn | +0.19 | 0.35 | 0.16 |  |
| 76 | Volibear | +0.18 | 0.35 | 0.17 |  |
| 77 | Jarvan IV | +0.18 | 0.30 | 0.12 |  |
| 78 | Kayn | +0.17 | 0.78 | 0.61 |  |
| 79 | Fizz | +0.16 | 0.28 | 0.12 |  |
| 80 | Sylas | +0.16 | 0.28 | 0.12 |  |
| 81 | Urgot | +0.16 | 0.28 | 0.12 |  |
| 82 | Rakan | +0.16 | 0.26 | 0.10 |  |
| 83 | Aurelion Sol | +0.16 | 0.24 | 0.08 |  |
| 84 | Jax | +0.15 | 0.42 | 0.27 |  |
| 85 | Pantheon | +0.15 | 0.41 | 0.26 |  |
| 86 | Briar | +0.15 | 0.28 | 0.13 |  |
| 87 | Hecarim | +0.12 | 0.28 | 0.16 |  |
| 88 | Rell | +0.12 | 0.28 | 0.16 |  |
| 89 | Senna | +0.12 | 0.12 | 0.00 |  |
| 90 | Sion | +0.11 | 0.71 | 0.60 |  |
| 91 | Bel'Veth | +0.11 | 0.28 | 0.17 |  |
| 92 | Rengar | +0.10 | 0.63 | 0.53 |  |
| 93 | Lee Sin | +0.10 | 0.28 | 0.18 |  |
| 94 | Riven | +0.10 | 0.28 | 0.18 |  |
| 95 | Wukong | +0.10 | 0.26 | 0.16 |  |
| 96 | Lillia | +0.10 | 0.23 | 0.13 |  |
| 97 | Garen | +0.09 | 0.56 | 0.47 |  |
| 98 | Quinn | +0.09 | 0.28 | 0.19 |  |
| 99 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 100 | Taric | +0.08 | 0.58 | 0.50 |  |
| 101 | Sett | +0.08 | 0.35 | 0.27 |  |
| 102 | Shyvana | +0.07 | 0.32 | 0.25 |  |
| 103 | Irelia | +0.06 | 0.28 | 0.22 |  |
| 104 | Ambessa | +0.06 | 0.24 | 0.18 |  |
| 105 | Aatrox | +0.05 | 0.28 | 0.23 |  |
| 106 | Nautilus | +0.05 | 0.28 | 0.23 |  |
| 107 | Qiyana | +0.05 | 0.22 | 0.17 |  |
| 108 | Diana | +0.03 | 0.28 | 0.25 |  |
| 109 | Kassadin | +0.03 | 0.28 | 0.25 |  |
| 110 | Sejuani | +0.03 | 0.28 | 0.25 |  |
| 111 | Rammus | +0.01 | 0.55 | 0.54 |  |
| 112 | Amumu | +0.01 | 0.28 | 0.27 |  |
| 113 | Leona | +0.01 | 0.28 | 0.27 |  |
| 114 | Renekton | +0.01 | 0.28 | 0.27 |  |
| 115 | Gangplank | 0.00 | 0.53 | 0.53 |  |
| 116 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 117 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 118 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 119 | Karma | 0.00 | 0.00 | 0.00 |  |
| 120 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 121 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 122 | Lux | 0.00 | 0.00 | 0.00 |  |
| 123 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 124 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 125 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 126 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 127 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 128 | Viego | -0.01 | 0.32 | 0.33 |  |
| 129 | Pyke | -0.04 | 0.28 | 0.32 |  |
| 130 | Xerath | -0.04 | 0.28 | 0.32 |  |
| 131 | Graves | -0.04 | 0.00 | 0.04 |  |
| 132 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 133 | Galio | -0.07 | 0.28 | 0.35 |  |
| 134 | Twisted Fate | -0.07 | 0.28 | 0.35 |  |
| 135 | Shen | -0.08 | 0.55 | 0.63 |  |
| 136 | Varus | -0.11 | 0.00 | 0.11 |  |
| 137 | Olaf | -0.12 | 0.41 | 0.53 |  |
| 138 | Janna | -0.12 | 0.28 | 0.40 |  |
| 139 | Mordekaiser | -0.13 | 0.34 | 0.47 |  |
| 140 | Skarner | -0.14 | 0.36 | 0.50 |  |
| 141 | Gragas | -0.15 | 0.28 | 0.43 |  |
| 142 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 143 | Fiddlesticks | -0.17 | 0.28 | 0.45 |  |
| 144 | Akali | -0.18 | 0.00 | 0.18 |  |
| 145 | Talon | -0.18 | 0.00 | 0.18 |  |
| 146 | Darius | -0.19 | 0.28 | 0.47 |  |
| 147 | Trundle | -0.19 | 0.28 | 0.47 |  |
| 148 | Yorick | -0.19 | 0.28 | 0.47 |  |
| 149 | Taliyah | -0.20 | 0.28 | 0.48 |  |
| 150 | Illaoi | -0.20 | 0.07 | 0.27 |  |
| 151 | Vi | -0.21 | 0.35 | 0.56 |  |
| 152 | Poppy | -0.23 | 0.24 | 0.47 |  |
| 153 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 154 | Blitzcrank | -0.25 | 0.28 | 0.53 |  |
| 155 | Cho'Gath | -0.25 | 0.28 | 0.53 |  |
| 156 | Singed | -0.25 | 0.28 | 0.53 |  |
| 157 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 158 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 159 | Locke | -0.27 | 0.00 | 0.27 |  |
| 160 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 161 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 162 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 163 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 164 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 165 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 166 | Zac | -0.42 | 0.28 | 0.70 |  |
| 167 | Tahm Kench | -0.45 | 0.28 | 0.73 |  |
| 168 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 169 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 170 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 171 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 172 | Nunu & Willump | -0.64 | 0.38 | 1.02 |  |
