# Counters to Taliyah (patch 26.20)

Every champion ranked by what its kit does against Taliyah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Taliyah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Taliyah` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +1.85)

- **0.95** untargetable: Rappel makes Elise untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 0.6 s; Weaver's Wall takes 4.33 s to land, enough to react. (Elise E Rappel → Taliyah R Weaver's Wall)
- **0.61** untargetable: Rappel makes Elise untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 0.6 s; Unraveled Earth takes 0.25 s to land, enough to react. (Elise E Rappel → Taliyah E Unraveled Earth)
- **0.48** interrupt: Cocoon's stun interrupts Taliyah's Weaver's Wall (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Taliyah R Weaver's Wall)

### 2. Maokai (net +1.66)

- **0.95** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 1.4 s; Weaver's Wall takes 4.33 s to land, enough to react. (Maokai W Twisted Advance → Taliyah R Weaver's Wall)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 1.4 s; Unraveled Earth takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Taliyah E Unraveled Earth)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Seismic Shove. Untargetable for 1.4 s; Seismic Shove takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Taliyah W Seismic Shove)
- Watch out: Taliyah's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 3. Warwick (net +1.64)

- **0.95** cc immunity: Infinite Duress makes Warwick immune to Taliyah's Weaver's Wall (airborne). Immune for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Warwick R Infinite Duress → Taliyah R Weaver's Wall)
- **0.48** dash stop: Infinite Duress's knockdown can stop Taliyah's Weaver's Wall mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Warwick R Infinite Duress → Taliyah R Weaver's Wall)
- **0.48** interrupt: Primal Howl's fear interrupts Taliyah's Weaver's Wall (movement channel). Primal Howl must land during the channel. (Warwick E Primal Howl → Taliyah R Weaver's Wall)
- Watch out: Unraveled Earth's stun interrupts Warwick's Jaws of the Beast (movement channel).

### 4. Camille (net +1.59)

- **0.95** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 0.5 s; Weaver's Wall takes 4.33 s to land, enough to react. (Camille R The Hextech Ultimatum → Taliyah R Weaver's Wall)
- **0.48** interrupt: Wall Dive's airborne interrupts Taliyah's Weaver's Wall (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Taliyah R Weaver's Wall)
- **0.35** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 0.5 s; Unraveled Earth takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range).

### 5. Kled (net +1.59)

- **0.95** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Taliyah's Weaver's Wall (airborne). Immune for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Taliyah R Weaver's Wall)
- **0.48** interrupt: Bear Trap on a Rope's airborne interrupts Taliyah's Weaver's Wall (movement channel). Bear Trap on a Rope must land during the channel. (Kled Q Bear Trap on a Rope → Taliyah R Weaver's Wall)
- **0.33** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Taliyah's Unraveled Earth (slow, stun, airborne). Immune for ?; Unraveled Earth takes 0.25 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 275 units farther than Kled's (525 vs 250 attack range).

### 6. Rek'Sai (net +1.56)

- **0.95** untargetable: Void Rush makes Rek'Sai untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 1.5 s, long enough to use ahead of Weaver's Wall. (Rek'Sai R Void Rush → Taliyah R Weaver's Wall)
- **0.48** interrupt: Unburrow's airborne interrupts Taliyah's Weaver's Wall (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Taliyah R Weaver's Wall)
- **0.35** untargetable: Void Rush makes Rek'Sai untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 1.5 s, long enough to use ahead of Unraveled Earth. (Rek'Sai R Void Rush → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### 7. Zaahen (net +1.53)

- **0.95** cc immunity: Grim Deliverance makes Zaahen immune to Taliyah's Weaver's Wall (airborne). Immune for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Zaahen R Grim Deliverance → Taliyah R Weaver's Wall)
- **0.48** interrupt: The Darkin Glaive's airborne interrupts Taliyah's Weaver's Wall (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Taliyah R Weaver's Wall)
- **0.35** cc immunity: Grim Deliverance makes Zaahen immune to Taliyah's Unraveled Earth (slow, stun, airborne). Immune for ?; Unraveled Earth takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 350 units farther than Zaahen's (525 vs 175 attack range).

### 8. Evelynn (net +1.51)

- **0.95** untargetable: Last Caress makes Evelynn untargetable, dodging Taliyah's Weaver's Wall. Untargetable for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Evelynn R Last Caress → Taliyah R Weaver's Wall)
- **0.48** interrupt: Allure's charm interrupts Taliyah's Weaver's Wall (movement channel). Allure must land during the channel. (Evelynn W Allure → Taliyah R Weaver's Wall)
- **0.35** untargetable: Last Caress makes Evelynn untargetable, dodging Taliyah's Unraveled Earth. Untargetable for ?; Unraveled Earth takes 0.25 s to land, enough to react. (Evelynn R Last Caress → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 400 units farther than Evelynn's (525 vs 125 attack range).

### 9. Shaco (net +1.51)

- **0.95** untargetable: Hallucinate makes Shaco untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 0.5 s; Weaver's Wall takes 4.33 s to land, enough to react. (Shaco R Hallucinate → Taliyah R Weaver's Wall)
- **0.48** interrupt: Jack in the Box's fear interrupts Taliyah's Weaver's Wall (movement channel). Jack in the Box must land during the channel. (Shaco W Jack in the Box → Taliyah R Weaver's Wall)
- **0.35** untargetable: Hallucinate makes Shaco untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 0.5 s; Unraveled Earth takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 400 units farther than Shaco's (525 vs 125 attack range).

### 10. Yasuo (net +1.49)

- **0.95** projectile block: Wind Wall blocks Taliyah's Weaver's Wall, a projectile. Wind Wall for 4 s, long enough to use ahead of Weaver's Wall. (Yasuo W Wind Wall → Taliyah R Weaver's Wall)
- **0.48** interrupt: Steel Tempest's airborne interrupts Taliyah's Weaver's Wall (movement channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Taliyah R Weaver's Wall)
- **0.29** projectile block: Wind Wall blocks Taliyah's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Taliyah basic attacks)
- Watch out: Taliyah's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +1.85 | 1.85 | 0.00 |  |
| 2 | Maokai | +1.66 | 1.93 | 0.27 |  |
| 3 | Warwick | +1.64 | 2.08 | 0.44 | dash stop (Infinite Duress) |
| 4 | Camille | +1.59 | 1.72 | 0.13 |  |
| 5 | Kled | +1.59 | 1.68 | 0.09 |  |
| 6 | Rek'Sai | +1.56 | 1.72 | 0.16 |  |
| 7 | Zaahen | +1.53 | 1.69 | 0.16 |  |
| 8 | Evelynn | +1.51 | 1.69 | 0.18 |  |
| 9 | Shaco | +1.51 | 1.69 | 0.18 |  |
| 10 | Yasuo | +1.49 | 1.65 | 0.16 | projectile block (Wind Wall) |
| 11 | Nocturne | +1.47 | 1.74 | 0.27 |  |
| 12 | Braum | +1.43 | 1.70 | 0.27 | projectile block (Unbreakable) |
| 13 | Lissandra | +1.37 | 1.37 | 0.00 | dash stop (Frozen Tomb) |
| 14 | Fiora | +1.33 | 1.58 | 0.25 |  |
| 15 | Bard | +1.32 | 1.32 | 0.00 |  |
| 16 | Malzahar | +1.31 | 1.71 | 0.40 | dash stop (Nether Grasp) |
| 17 | Morgana | +1.31 | 1.41 | 0.10 |  |
| 18 | Udyr | +1.27 | 1.54 | 0.27 |  |
| 19 | Vladimir | +1.23 | 1.40 | 0.17 |  |
| 20 | Aurora | +1.23 | 1.23 | 0.00 |  |
| 21 | Xayah | +1.20 | 1.20 | 0.00 |  |
| 22 | Alistar | +1.18 | 1.45 | 0.27 |  |
| 23 | Mel | +1.14 | 1.14 | 0.00 | projectile block (Rebuttal) |
| 24 | Samira | +1.14 | 1.14 | 0.00 | projectile block (Blade Whirl) |
| 25 | Sion | +1.12 | 1.71 | 0.59 |  |
| 26 | Gwen | +1.12 | 1.37 | 0.25 |  |
| 27 | Yone | +1.12 | 1.24 | 0.12 | dash stop (Fate Sealed) |
| 28 | Kalista | +1.10 | 1.10 | 0.00 |  |
| 29 | Master Yi | +1.09 | 1.51 | 0.42 |  |
| 30 | Kayn | +1.08 | 1.69 | 0.61 |  |
| 31 | Ekko | +1.06 | 1.24 | 0.18 |  |
| 32 | Yuumi | +1.02 | 1.48 | 0.46 |  |
| 33 | Zed | +1.02 | 1.20 | 0.18 |  |
| 34 | Vex | +1.00 | 1.00 | 0.00 | dash stop (Doom 'n Gloom) |
| 35 | Viktor | +0.96 | 0.96 | 0.00 | dash stop (Gravity Field) |
| 36 | K'Sante | +0.91 | 1.04 | 0.13 |  |
| 37 | Milio | +0.85 | 0.85 | 0.00 |  |
| 38 | Sivir | +0.85 | 0.85 | 0.00 |  |
| 39 | Lulu | +0.73 | 0.73 | 0.00 |  |
| 40 | Ahri | +0.72 | 0.72 | 0.00 | dash stop (Charm) |
| 41 | Hwei | +0.72 | 0.72 | 0.00 | dash stop (Grim Visage) |
| 42 | Veigar | +0.72 | 0.72 | 0.00 | dash stop (Event Horizon) |
| 43 | Cassiopeia | +0.71 | 0.71 | 0.00 |  |
| 44 | Amumu | +0.69 | 0.96 | 0.27 | dash stop (Curse of the Sad Mummy) |
| 45 | Olaf | +0.68 | 1.21 | 0.53 |  |
| 46 | Rengar | +0.64 | 1.17 | 0.53 |  |
| 47 | Tristana | +0.64 | 0.64 | 0.00 |  |
| 48 | Gangplank | +0.62 | 1.15 | 0.53 |  |
| 49 | Corki | +0.62 | 0.62 | 0.00 |  |
| 50 | Ornn | +0.60 | 0.76 | 0.16 |  |
| 51 | Volibear | +0.59 | 0.76 | 0.17 |  |
| 52 | Heimerdinger | +0.58 | 0.58 | 0.00 |  |
| 53 | Poppy | +0.55 | 1.02 | 0.47 | dash stop (Steadfast Presence) |
| 54 | Ashe | +0.55 | 0.55 | 0.00 |  |
| 55 | Malphite | +0.53 | 0.80 | 0.27 |  |
| 56 | Nilah | +0.53 | 0.73 | 0.20 |  |
| 57 | Annie | +0.53 | 0.53 | 0.00 |  |
| 58 | Anivia | +0.52 | 0.52 | 0.00 |  |
| 59 | Jarvan IV | +0.50 | 0.62 | 0.12 |  |
| 60 | Sett | +0.49 | 0.76 | 0.27 |  |
| 61 | Azir | +0.48 | 0.48 | 0.00 |  |
| 62 | Brand | +0.48 | 0.48 | 0.00 |  |
| 63 | Draven | +0.48 | 0.48 | 0.00 |  |
| 64 | Gnar | +0.48 | 0.48 | 0.00 |  |
| 65 | Jayce | +0.48 | 0.48 | 0.00 |  |
| 66 | Jinx | +0.48 | 0.48 | 0.00 | dash stop (Flame Chompers!) |
| 67 | Kennen | +0.48 | 0.48 | 0.00 |  |
| 68 | Nami | +0.48 | 0.48 | 0.00 |  |
| 69 | Neeko | +0.48 | 0.48 | 0.00 |  |
| 70 | Orianna | +0.48 | 0.48 | 0.00 |  |
| 71 | Renata Glasc | +0.48 | 0.48 | 0.00 |  |
| 72 | Seraphine | +0.48 | 0.48 | 0.00 |  |
| 73 | Sona | +0.48 | 0.48 | 0.00 |  |
| 74 | Soraka | +0.48 | 0.48 | 0.00 |  |
| 75 | Swain | +0.48 | 0.48 | 0.00 |  |
| 76 | Syndra | +0.48 | 0.48 | 0.00 |  |
| 77 | Vayne | +0.48 | 0.48 | 0.00 |  |
| 78 | Ziggs | +0.48 | 0.48 | 0.00 |  |
| 79 | Zilean | +0.48 | 0.48 | 0.00 |  |
| 80 | Zoe | +0.48 | 0.48 | 0.00 |  |
| 81 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 82 | Hecarim | +0.47 | 0.63 | 0.16 |  |
| 83 | Thresh | +0.45 | 0.48 | 0.03 |  |
| 84 | Xin Zhao | +0.42 | 0.65 | 0.23 |  |
| 85 | Aurelion Sol | +0.41 | 0.48 | 0.07 |  |
| 86 | Rakan | +0.38 | 0.48 | 0.10 |  |
| 87 | Shyvana | +0.37 | 0.62 | 0.25 |  |
| 88 | Fizz | +0.36 | 0.48 | 0.12 |  |
| 89 | Sylas | +0.36 | 0.48 | 0.12 |  |
| 90 | Urgot | +0.36 | 0.48 | 0.12 |  |
| 91 | Jax | +0.35 | 0.62 | 0.27 |  |
| 92 | Briar | +0.35 | 0.48 | 0.13 |  |
| 93 | Lillia | +0.35 | 0.48 | 0.13 |  |
| 94 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 95 | Zac | +0.34 | 0.96 | 0.62 | dash stop (Stretching Strikes) |
| 96 | Viego | +0.32 | 0.62 | 0.30 |  |
| 97 | Wukong | +0.32 | 0.48 | 0.16 |  |
| 98 | Rell | +0.32 | 0.48 | 0.16 |  |
| 99 | Bel'Veth | +0.31 | 0.48 | 0.17 |  |
| 100 | Qiyana | +0.31 | 0.48 | 0.17 |  |
| 101 | Quinn | +0.31 | 0.48 | 0.17 |  |
| 102 | Garen | +0.30 | 0.77 | 0.47 |  |
| 103 | Ambessa | +0.30 | 0.48 | 0.18 |  |
| 104 | Lee Sin | +0.30 | 0.48 | 0.18 |  |
| 105 | Riven | +0.30 | 0.48 | 0.18 |  |
| 106 | Kayle | +0.27 | 0.27 | 0.00 |  |
| 107 | Irelia | +0.26 | 0.48 | 0.22 |  |
| 108 | Vi | +0.25 | 0.76 | 0.51 |  |
| 109 | Rammus | +0.25 | 0.75 | 0.50 |  |
| 110 | Aatrox | +0.25 | 0.48 | 0.23 |  |
| 111 | Nautilus | +0.25 | 0.48 | 0.23 |  |
| 112 | Diana | +0.23 | 0.48 | 0.25 |  |
| 113 | Kassadin | +0.23 | 0.48 | 0.25 |  |
| 114 | Sejuani | +0.23 | 0.48 | 0.25 |  |
| 115 | Leona | +0.21 | 0.48 | 0.27 |  |
| 116 | Renekton | +0.21 | 0.48 | 0.27 |  |
| 117 | Vel'Koz | +0.20 | 0.48 | 0.28 |  |
| 118 | Singed | +0.18 | 0.71 | 0.53 |  |
| 119 | Pyke | +0.18 | 0.48 | 0.30 |  |
| 120 | Xerath | +0.16 | 0.48 | 0.32 |  |
| 121 | Kindred | +0.16 | 0.16 | 0.00 |  |
| 122 | Taric | +0.14 | 0.64 | 0.50 |  |
| 123 | Galio | +0.13 | 0.48 | 0.35 |  |
| 124 | Twisted Fate | +0.13 | 0.48 | 0.35 |  |
| 125 | Shen | +0.12 | 0.75 | 0.63 |  |
| 126 | Skarner | +0.11 | 0.61 | 0.50 |  |
| 127 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 128 | Janna | +0.08 | 0.48 | 0.40 |  |
| 129 | Mordekaiser | +0.07 | 0.54 | 0.47 |  |
| 130 | Gragas | +0.07 | 0.48 | 0.41 |  |
| 131 | Pantheon | +0.06 | 0.30 | 0.24 |  |
| 132 | Senna | +0.06 | 0.06 | 0.00 |  |
| 133 | Fiddlesticks | +0.04 | 0.48 | 0.44 |  |
| 134 | Darius | +0.01 | 0.48 | 0.47 |  |
| 135 | Trundle | +0.01 | 0.48 | 0.47 |  |
| 136 | Yorick | +0.01 | 0.48 | 0.47 |  |
| 137 | Illaoi | +0.01 | 0.28 | 0.27 |  |
| 138 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 139 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 140 | Karma | 0.00 | 0.00 | 0.00 |  |
| 141 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 142 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 143 | Lux | 0.00 | 0.00 | 0.00 |  |
| 144 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 145 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 146 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 147 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 148 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 149 | Graves | -0.04 | 0.00 | 0.04 |  |
| 150 | Blitzcrank | -0.05 | 0.48 | 0.53 |  |
| 151 | Cho'Gath | -0.05 | 0.48 | 0.53 |  |
| 152 | Varus | -0.10 | 0.00 | 0.10 |  |
| 153 | Ivern | -0.12 | 0.00 | 0.12 |  |
| 154 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 155 | Akali | -0.18 | 0.00 | 0.18 |  |
| 156 | Talon | -0.18 | 0.00 | 0.18 |  |
| 157 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 158 | Tahm Kench | -0.25 | 0.48 | 0.73 |  |
| 159 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 160 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 161 | Locke | -0.27 | 0.00 | 0.27 |  |
| 162 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 163 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 164 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 165 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 166 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 167 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 168 | Nunu & Willump | -0.42 | 0.60 | 1.02 |  |
| 169 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 170 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 171 | Katarina | -0.55 | 0.00 | 0.55 |  |
| 172 | Naafiri | -0.58 | 0.00 | 0.58 |  |
