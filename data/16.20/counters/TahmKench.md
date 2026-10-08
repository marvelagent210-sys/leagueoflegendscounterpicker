# Counters to Tahm Kench (patch 26.20)

Every champion ranked by what its kit does against Tahm Kench's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Tahm Kench's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> TahmKench` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +2.00)

- **0.80** untargetable: Rappel makes Elise untargetable, dodging Tahm Kench's Devour. Untargetable for 0.6 s; Devour takes 0.25 s to land, enough to react. (Elise E Rappel → Tahm Kench R Devour)
- **0.59** untargetable: Rappel makes Elise untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 0.6 s, timed to Regurgitate. (Elise E Rappel → Tahm Kench R Regurgitate)
- **0.50** interrupt: Cocoon's stun interrupts Tahm Kench's Abyssal Dive (movement channel). Cocoon must land during the channel. (Elise E Cocoon → Tahm Kench W Abyssal Dive)

### 2. Maokai (net +1.82)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Tahm Kench's Devour. Untargetable for 1.4 s; Devour takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Tahm Kench R Devour)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 1.4 s, timed to Regurgitate. (Maokai W Twisted Advance → Tahm Kench R Regurgitate)
- **0.50** interrupt: Bramble Smash's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Tahm Kench W Abyssal Dive)

### 3. Nocturne (net +1.69)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Tahm Kench's Devour. Spell shield for 1.5 s, long enough to use ahead of Devour. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tahm Kench R Devour)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Tahm Kench's Abyssal Dive (movement channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Tahm Kench W Abyssal Dive)
- **0.45** spell shield: Shroud of Darkness's spell shield blocks Tahm Kench's Tongue Lash. Spell shield for 1.5 s, long enough to use ahead of Tongue Lash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Tahm Kench Q Tongue Lash)

### 4. Rek'Sai (net +1.59)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Tahm Kench's Devour. Untargetable for 1.5 s, long enough to use ahead of Devour. (Rek'Sai R Void Rush → Tahm Kench R Devour)
- **0.50** interrupt: Unburrow's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Void Rush makes Rek'Sai untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 1.5 s, long enough to use ahead of Regurgitate. (Rek'Sai R Void Rush → Tahm Kench R Regurgitate)

### 5. Singed (net +1.58)

- **0.50** interrupt: Fling's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Fling must land during the channel. (Singed E Fling → Tahm Kench W Abyssal Dive)
- **0.49** grounding: Mega Adhesive grounds Tahm Kench, who then can't cast Abyssal Dive. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Tahm Kench W Abyssal Dive)
- **0.28** anti-heal: Insanity Potion's Grievous Wounds cuts Tahm Kench's healing from Tongue Lash by 40%. (Singed R Insanity Potion → Tahm Kench Q Tongue Lash)

### 6. Evelynn (net +1.57)

- **0.80** untargetable: Last Caress makes Evelynn untargetable, dodging Tahm Kench's Devour. Untargetable for ?; Devour takes 0.25 s to land, enough to react. (Evelynn R Last Caress → Tahm Kench R Devour)
- **0.50** interrupt: Allure's charm interrupts Tahm Kench's Abyssal Dive (movement channel). Allure must land during the channel. (Evelynn W Allure → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Last Caress makes Evelynn untargetable, dodging Tahm Kench's Regurgitate. Untargetable for ?, timed to Regurgitate. (Evelynn R Last Caress → Tahm Kench R Regurgitate)

### 7. Shaco (net +1.57)

- **0.80** untargetable: Hallucinate makes Shaco untargetable, dodging Tahm Kench's Devour. Untargetable for 0.5 s; Devour takes 0.25 s to land, enough to react. (Shaco R Hallucinate → Tahm Kench R Devour)
- **0.50** interrupt: Jack in the Box's fear interrupts Tahm Kench's Abyssal Dive (movement channel). Jack in the Box must land during the channel. (Shaco W Jack in the Box → Tahm Kench W Abyssal Dive)
- **0.38** untargetable: Hallucinate makes Shaco untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 0.5 s, timed to Regurgitate. (Shaco R Hallucinate → Tahm Kench R Regurgitate)

### 8. Zaahen (net +1.57)

- **0.80** cc immunity: Grim Deliverance makes Zaahen immune to Tahm Kench's Devour (suppression). Immune for ?; Devour takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Tahm Kench R Devour)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Tahm Kench W Abyssal Dive)
- **0.38** cc immunity: Grim Deliverance makes Zaahen immune to Tahm Kench's Regurgitate (airborne). Immune for ?, timed to Regurgitate. (Zaahen R Grim Deliverance → Tahm Kench R Regurgitate)

### 9. Camille (net +1.53)

- **0.75** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Tahm Kench's Devour. Untargetable for 0.5 s; Devour takes 0.25 s to land, enough to react. (Camille R The Hextech Ultimatum → Tahm Kench R Devour)
- **0.50** interrupt: Wall Dive's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Tahm Kench W Abyssal Dive)
- **0.37** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Tahm Kench's Regurgitate. Untargetable for 0.5 s, timed to Regurgitate. (Camille R The Hextech Ultimatum → Tahm Kench R Regurgitate)

### 10. Kled (net +1.51)

- **0.67** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Tahm Kench's Devour (suppression). Immune for ?; Devour takes 0.25 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Tahm Kench R Devour)
- **0.50** interrupt: Bear Trap on a Rope's airborne interrupts Tahm Kench's Abyssal Dive (movement channel). Bear Trap on a Rope must land during the channel. (Kled Q Bear Trap on a Rope → Tahm Kench W Abyssal Dive)
- **0.36** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Tahm Kench's Regurgitate (airborne). Immune for ?, timed to Regurgitate. (Kled R Chaaaaaaaarge!!! → Tahm Kench R Regurgitate)

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +2.00 | 2.00 | 0.00 |  |
| 2 | Maokai | +1.82 | 1.82 | 0.00 |  |
| 3 | Nocturne | +1.69 | 1.69 | 0.00 |  |
| 4 | Rek'Sai | +1.59 | 1.59 | 0.00 |  |
| 5 | Singed | +1.58 | 1.58 | 0.00 | grounding (Mega Adhesive) |
| 6 | Evelynn | +1.57 | 1.57 | 0.00 |  |
| 7 | Shaco | +1.57 | 1.57 | 0.00 |  |
| 8 | Zaahen | +1.57 | 1.57 | 0.00 |  |
| 9 | Camille | +1.53 | 1.53 | 0.00 |  |
| 10 | Kled | +1.51 | 1.51 | 0.00 |  |
| 11 | Milio | +1.50 | 1.50 | 0.00 |  |
| 12 | Udyr | +1.42 | 1.42 | 0.00 |  |
| 13 | Bard | +1.41 | 1.41 | 0.00 |  |
| 14 | Sivir | +1.41 | 1.41 | 0.00 |  |
| 15 | Sion | +1.40 | 1.58 | 0.18 |  |
| 16 | Fiora | +1.40 | 1.40 | 0.00 |  |
| 17 | Morgana | +1.37 | 1.37 | 0.00 |  |
| 18 | Alistar | +1.35 | 1.35 | 0.00 |  |
| 19 | Warwick | +1.33 | 1.73 | 0.40 |  |
| 20 | Lissandra | +1.31 | 1.31 | 0.00 |  |
| 21 | Xayah | +1.30 | 1.30 | 0.00 |  |
| 22 | Vladimir | +1.25 | 1.36 | 0.11 |  |
| 23 | Aurora | +1.25 | 1.25 | 0.00 |  |
| 24 | Yuumi | +1.22 | 1.65 | 0.43 |  |
| 25 | Gwen | +1.20 | 1.20 | 0.00 |  |
| 26 | Kayn | +1.12 | 1.57 | 0.45 |  |
| 27 | Ekko | +1.09 | 1.09 | 0.00 |  |
| 28 | Master Yi | +1.08 | 1.31 | 0.23 |  |
| 29 | Olaf | +1.07 | 1.07 | 0.00 |  |
| 30 | Rengar | +1.06 | 1.06 | 0.00 |  |
| 31 | Braum | +1.04 | 1.04 | 0.00 | projectile block (Unbreakable) |
| 32 | Kalista | +1.03 | 1.03 | 0.00 |  |
| 33 | Gangplank | +0.99 | 0.99 | 0.00 |  |
| 34 | Malzahar | +0.97 | 1.37 | 0.40 |  |
| 35 | Zed | +0.96 | 0.96 | 0.00 |  |
| 36 | Cassiopeia | +0.95 | 0.95 | 0.00 | grounding (Miasma) |
| 37 | Vex | +0.91 | 0.91 | 0.00 |  |
| 38 | Vayne | +0.90 | 0.90 | 0.00 |  |
| 39 | Yasuo | +0.90 | 0.90 | 0.00 | projectile block (Wind Wall) |
| 40 | Lulu | +0.87 | 0.87 | 0.00 |  |
| 41 | Corki | +0.86 | 0.86 | 0.00 |  |
| 42 | Renata Glasc | +0.86 | 0.86 | 0.00 |  |
| 43 | Draven | +0.84 | 0.84 | 0.00 |  |
| 44 | K'Sante | +0.82 | 0.82 | 0.00 |  |
| 45 | Zilean | +0.80 | 0.80 | 0.00 |  |
| 46 | Zoe | +0.80 | 0.80 | 0.00 |  |
| 47 | Kennen | +0.77 | 0.77 | 0.00 |  |
| 48 | Heimerdinger | +0.76 | 0.76 | 0.00 |  |
| 49 | Jayce | +0.76 | 0.76 | 0.00 |  |
| 50 | Seraphine | +0.75 | 0.75 | 0.00 |  |
| 51 | Soraka | +0.75 | 0.75 | 0.00 |  |
| 52 | Taric | +0.75 | 0.75 | 0.00 |  |
| 53 | Xin Zhao | +0.75 | 0.75 | 0.00 |  |
| 54 | Ziggs | +0.75 | 0.75 | 0.00 |  |
| 55 | Anivia | +0.74 | 0.74 | 0.00 |  |
| 56 | Garen | +0.74 | 0.74 | 0.00 |  |
| 57 | Annie | +0.72 | 0.72 | 0.00 |  |
| 58 | Veigar | +0.72 | 0.72 | 0.00 |  |
| 59 | Ahri | +0.71 | 0.71 | 0.00 |  |
| 60 | Brand | +0.71 | 0.71 | 0.00 |  |
| 61 | Hwei | +0.71 | 0.71 | 0.00 |  |
| 62 | Nami | +0.71 | 0.71 | 0.00 |  |
| 63 | Syndra | +0.71 | 0.71 | 0.00 |  |
| 64 | Swain | +0.68 | 0.68 | 0.00 |  |
| 65 | Teemo | +0.67 | 0.67 | 0.00 |  |
| 66 | Gnar | +0.66 | 0.66 | 0.00 |  |
| 67 | Jax | +0.66 | 0.66 | 0.00 |  |
| 68 | Kindred | +0.66 | 0.66 | 0.00 |  |
| 69 | Ornn | +0.66 | 0.66 | 0.00 |  |
| 70 | Sett | +0.66 | 0.66 | 0.00 |  |
| 71 | Thresh | +0.66 | 0.66 | 0.00 |  |
| 72 | Volibear | +0.66 | 0.66 | 0.00 |  |
| 73 | Yone | +0.66 | 0.66 | 0.00 |  |
| 74 | Ashe | +0.65 | 0.65 | 0.00 |  |
| 75 | Samira | +0.64 | 0.64 | 0.00 |  |
| 76 | Sona | +0.64 | 0.64 | 0.00 |  |
| 77 | Kayle | +0.63 | 0.63 | 0.00 |  |
| 78 | Urgot | +0.62 | 0.62 | 0.00 |  |
| 79 | Mel | +0.61 | 0.61 | 0.00 |  |
| 80 | Tristana | +0.61 | 0.61 | 0.00 |  |
| 81 | Quinn | +0.59 | 0.84 | 0.25 |  |
| 82 | Shyvana | +0.58 | 0.58 | 0.00 |  |
| 83 | Mordekaiser | +0.57 | 0.57 | 0.00 |  |
| 84 | Varus | +0.55 | 0.66 | 0.11 |  |
| 85 | Viktor | +0.54 | 0.54 | 0.00 |  |
| 86 | Twisted Fate | +0.53 | 0.88 | 0.35 |  |
| 87 | Nilah | +0.53 | 0.53 | 0.00 |  |
| 88 | Malphite | +0.52 | 0.52 | 0.00 |  |
| 89 | Aatrox | +0.50 | 0.50 | 0.00 |  |
| 90 | Amumu | +0.50 | 0.50 | 0.00 |  |
| 91 | Bel'Veth | +0.50 | 0.50 | 0.00 |  |
| 92 | Blitzcrank | +0.50 | 0.50 | 0.00 |  |
| 93 | Cho'Gath | +0.50 | 0.50 | 0.00 |  |
| 94 | Darius | +0.50 | 0.50 | 0.00 |  |
| 95 | Irelia | +0.50 | 0.50 | 0.00 |  |
| 96 | Kassadin | +0.50 | 0.50 | 0.00 |  |
| 97 | Leona | +0.50 | 0.50 | 0.00 |  |
| 98 | Rell | +0.50 | 0.50 | 0.00 |  |
| 99 | Renekton | +0.50 | 0.50 | 0.00 |  |
| 100 | Riven | +0.50 | 0.50 | 0.00 |  |
| 101 | Sejuani | +0.50 | 0.50 | 0.00 |  |
| 102 | Sylas | +0.50 | 0.50 | 0.00 |  |
| 103 | Trundle | +0.50 | 0.50 | 0.00 |  |
| 104 | Yorick | +0.50 | 0.50 | 0.00 |  |
| 105 | Zyra | +0.50 | 0.50 | 0.00 |  |
| 106 | Azir | +0.49 | 0.49 | 0.00 |  |
| 107 | Orianna | +0.49 | 0.49 | 0.00 |  |
| 108 | Neeko | +0.47 | 0.47 | 0.00 |  |
| 109 | Vel'Koz | +0.45 | 0.73 | 0.28 |  |
| 110 | Janna | +0.44 | 0.84 | 0.40 |  |
| 111 | Rammus | +0.44 | 0.79 | 0.35 |  |
| 112 | Aphelios | +0.43 | 0.43 | 0.00 |  |
| 113 | Zeri | +0.41 | 0.41 | 0.00 |  |
| 114 | Twitch | +0.40 | 0.40 | 0.00 |  |
| 115 | Xerath | +0.39 | 0.73 | 0.34 |  |
| 116 | Aurelion Sol | +0.36 | 0.46 | 0.10 |  |
| 117 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 118 | Rakan | +0.35 | 0.35 | 0.00 |  |
| 119 | Skarner | +0.35 | 0.35 | 0.00 |  |
| 120 | Shen | +0.34 | 0.79 | 0.45 |  |
| 121 | Hecarim | +0.34 | 0.34 | 0.00 |  |
| 122 | Jarvan IV | +0.34 | 0.34 | 0.00 |  |
| 123 | Kai'Sa | +0.34 | 0.34 | 0.00 |  |
| 124 | Lillia | +0.33 | 0.33 | 0.00 |  |
| 125 | Galio | +0.32 | 0.50 | 0.18 |  |
| 126 | Pyke | +0.32 | 0.50 | 0.18 |  |
| 127 | Senna | +0.32 | 0.32 | 0.00 |  |
| 128 | Ezreal | +0.30 | 0.30 | 0.00 |  |
| 129 | Smolder | +0.30 | 0.30 | 0.00 |  |
| 130 | Lee Sin | +0.29 | 0.29 | 0.00 |  |
| 131 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 132 | Pantheon | +0.28 | 0.39 | 0.11 |  |
| 133 | Gragas | +0.27 | 0.50 | 0.23 |  |
| 134 | Lux | +0.27 | 0.27 | 0.00 |  |
| 135 | Briar | +0.26 | 0.26 | 0.00 |  |
| 136 | Diana | +0.26 | 0.26 | 0.00 |  |
| 137 | Fizz | +0.26 | 0.26 | 0.00 |  |
| 138 | Wukong | +0.26 | 0.26 | 0.00 |  |
| 139 | Nautilus | +0.26 | 0.26 | 0.00 |  |
| 140 | Nidalee | +0.26 | 0.26 | 0.00 |  |
| 141 | Taliyah | +0.25 | 0.73 | 0.48 |  |
| 142 | Ambessa | +0.25 | 0.25 | 0.00 |  |
| 143 | Jinx | +0.25 | 0.25 | 0.00 |  |
| 144 | Kog'Maw | +0.24 | 0.24 | 0.00 |  |
| 145 | Qiyana | +0.24 | 0.24 | 0.00 |  |
| 146 | Fiddlesticks | +0.20 | 0.67 | 0.47 |  |
| 147 | Graves | +0.20 | 0.20 | 0.00 |  |
| 148 | Karma | +0.19 | 0.19 | 0.00 |  |
| 149 | LeBlanc | +0.19 | 0.19 | 0.00 |  |
| 150 | Vi | +0.16 | 0.66 | 0.50 |  |
| 151 | Illaoi | +0.16 | 0.16 | 0.00 |  |
| 152 | Katarina | +0.11 | 0.39 | 0.28 |  |
| 153 | Nunu & Willump | +0.10 | 0.59 | 0.49 |  |
| 154 | Viego | +0.09 | 0.34 | 0.25 |  |
| 155 | Caitlyn | +0.08 | 0.36 | 0.28 |  |
| 156 | Poppy | +0.05 | 0.25 | 0.20 |  |
| 157 | Lucian | +0.03 | 0.31 | 0.28 |  |
| 158 | Miss Fortune | +0.02 | 0.30 | 0.28 |  |
| 159 | Akshan | +0.01 | 0.29 | 0.28 |  |
| 160 | Ivern | +0.01 | 0.16 | 0.15 |  |
| 161 | Zac | 0.00 | 0.50 | 0.50 |  |
| 162 | Akali | 0.00 | 0.00 | 0.00 |  |
| 163 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 164 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 165 | Locke | 0.00 | 0.00 | 0.00 |  |
| 166 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 167 | Talon | 0.00 | 0.00 | 0.00 |  |
| 168 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 169 | Jhin | -0.03 | 0.25 | 0.28 |  |
| 170 | Karthus | -0.12 | 0.16 | 0.28 |  |
| 171 | Ryze | -0.13 | 0.22 | 0.35 |  |
| 172 | Naafiri | -0.45 | 0.00 | 0.45 |  |
