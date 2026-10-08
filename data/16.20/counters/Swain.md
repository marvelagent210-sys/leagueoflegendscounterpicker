# Counters to Swain (patch 26.20)

Every champion ranked by what its kit does against Swain's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Swain's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Swain` for the full ledger of a matchup, with sources.

## Top 10

### 1. Elise (net +0.90)

- **0.55** untargetable: Rappel makes Elise untargetable, dodging Swain's Demonic Ascension. Untargetable for 0.6 s; Demonic Ascension takes 0.5 s to land, enough to react. (Elise E Rappel → Swain R Demonic Ascension)
- **0.51** untargetable: Rappel makes Elise untargetable, dodging Swain's Nevermove. Untargetable for 0.6 s; Nevermove takes 1.01 s to land, enough to react. (Elise E Rappel → Swain E Nevermove)
- **0.37** untargetable: Rappel makes Elise untargetable, dodging Swain's Demonflare. Untargetable for 0.6 s; Demonflare takes 0.25 s to land, enough to react. (Elise E Rappel → Swain R Demonflare)

### 2. Maokai (net +0.89)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Nevermove. Untargetable for 1.4 s; Nevermove takes 1.01 s to land, enough to react. (Maokai W Twisted Advance → Swain E Nevermove)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Demonic Ascension. Untargetable for 1.4 s; Demonic Ascension takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Swain R Demonic Ascension)
- **0.48** untargetable: Twisted Advance makes Maokai untargetable, dodging Swain's Demonflare. Untargetable for 1.4 s; Demonflare takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Swain R Demonflare)
- Watch out: Swain's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

### 3. Kayle (net +0.85)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Swain's Demonic Ascension. Invulnerable for 2.5 s, long enough to use ahead of Demonic Ascension. (Kayle R Divine Judgment → Swain R Demonic Ascension)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Swain's (625 vs 525 attack range). Swain has no dash or blink to close the gap. (Kayle basic attacks → Swain basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Swain's Nevermove (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Nevermove. (Kayle R Divine Judgment → Swain E Nevermove)

### 4. Braum (net +0.84)

- **0.70** projectile block: Unbreakable blocks Swain's Nevermove, a projectile. Unbreakable for 4 s, long enough to use ahead of Nevermove. (Braum E Unbreakable → Swain E Nevermove)
- **0.55** projectile block: Unbreakable blocks Swain's Demonflare, a projectile. Unbreakable for 4 s, long enough to use ahead of Demonflare. (Braum E Unbreakable → Swain R Demonflare)
- **0.29** projectile block: Unbreakable blocks Swain's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Swain basic attacks)
- Watch out: Swain's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

### 5. Fiora (net +0.82)

- **0.64** parry: Riposte parries Swain's Nevermove and stuns back. Parry for 0.75 s; Nevermove takes 1.01 s to land, enough to react. Negating Nevermove's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Swain E Nevermove)
- **0.55** parry: Riposte parries Swain's Demonic Ascension. Parry for 0.75 s; Demonic Ascension takes 0.5 s to land, enough to react. (Fiora W Riposte → Swain R Demonic Ascension)
- **0.39** parry: Riposte parries Swain's Demonflare. Parry for 0.75 s; Demonflare takes 0.25 s to land, enough to react. (Fiora W Riposte → Swain R Demonflare)
- Watch out: Swain's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

### 6. Aurora (net +0.78)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Demonic Ascension. Untargetable for 0.4 s; Demonic Ascension takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain R Demonic Ascension)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Nevermove. Untargetable for 0.4 s; Nevermove takes 1.01 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain E Nevermove)
- **0.25** untargetable: Between Worlds makes Aurora untargetable, dodging Swain's Demonflare. Untargetable for 0.4 s; Demonflare takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Swain R Demonflare)

### 7. Bard (net +0.78)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Demonic Ascension. Untargetable for 2.5 s, long enough to use ahead of Demonic Ascension. (Bard R Tempered Fate → Swain R Demonic Ascension)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Nevermove. Untargetable for 2.5 s, long enough to use ahead of Nevermove. (Bard R Tempered Fate → Swain E Nevermove)
- **0.25** untargetable: Tempered Fate makes Bard untargetable, dodging Swain's Demonflare. Untargetable for 2.5 s, long enough to use ahead of Demonflare. (Bard R Tempered Fate → Swain R Demonflare)

### 8. Lissandra (net +0.78)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Demonic Ascension. Untargetable for 2.5 s, long enough to use ahead of Demonic Ascension. (Lissandra R Frozen Tomb → Swain R Demonic Ascension)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Nevermove. Untargetable for 2.5 s, long enough to use ahead of Nevermove. (Lissandra R Frozen Tomb → Swain E Nevermove)
- **0.25** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Swain's Demonflare. Untargetable for 2.5 s, long enough to use ahead of Demonflare. (Lissandra R Frozen Tomb → Swain R Demonflare)

### 9. Xayah (net +0.77)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Demonic Ascension. Untargetable for 1.5 s, long enough to use ahead of Demonic Ascension. (Xayah R Featherstorm → Swain R Demonic Ascension)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Nevermove. Untargetable for 1.5 s, long enough to use ahead of Nevermove. (Xayah R Featherstorm → Swain E Nevermove)
- **0.25** untargetable: Featherstorm makes Xayah untargetable, dodging Swain's Demonflare. Untargetable for 1.5 s, long enough to use ahead of Demonflare. (Xayah R Featherstorm → Swain R Demonflare)

### 10. Vladimir (net +0.76)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Demonic Ascension. Untargetable for 2 s, long enough to use ahead of Demonic Ascension. (Vladimir W Sanguine Pool → Swain R Demonic Ascension)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Nevermove. Untargetable for 2 s, long enough to use ahead of Nevermove. (Vladimir W Sanguine Pool → Swain E Nevermove)
- **0.39** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Swain's Demonflare. Untargetable for 2 s, long enough to use ahead of Demonflare. (Vladimir W Sanguine Pool → Swain R Demonflare)
- Watch out: Nevermove's airborne interrupts Vladimir's Tides of Blood (charge-up).

## Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Elise | +0.90 | 0.90 | 0.00 |  |
| 2 | Maokai | +0.89 | 1.10 | 0.21 |  |
| 3 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 4 | Braum | +0.84 | 1.05 | 0.21 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Fiora | +0.82 | 1.02 | 0.20 |  |
| 6 | Aurora | +0.78 | 0.78 | 0.00 |  |
| 7 | Bard | +0.78 | 0.78 | 0.00 |  |
| 8 | Lissandra | +0.78 | 0.78 | 0.00 |  |
| 9 | Xayah | +0.77 | 0.77 | 0.00 |  |
| 10 | Vladimir | +0.76 | 0.92 | 0.16 |  |
| 11 | Gwen | +0.70 | 0.90 | 0.20 |  |
| 12 | Camille | +0.69 | 0.79 | 0.10 |  |
| 13 | Samira | +0.69 | 0.69 | 0.00 | projectile block (Blade Whirl) |
| 14 | Rek'Sai | +0.67 | 0.79 | 0.12 |  |
| 15 | Ekko | +0.66 | 0.80 | 0.14 |  |
| 16 | Yasuo | +0.66 | 0.78 | 0.12 | projectile block (Wind Wall) |
| 17 | Kindred | +0.66 | 0.66 | 0.00 |  |
| 18 | Yuumi | +0.65 | 1.11 | 0.46 |  |
| 19 | Evelynn | +0.64 | 0.78 | 0.14 |  |
| 20 | Shaco | +0.64 | 0.78 | 0.14 |  |
| 21 | Mel | +0.64 | 0.64 | 0.00 | projectile block (Rebuttal) |
| 22 | Zed | +0.63 | 0.77 | 0.14 |  |
| 23 | Master Yi | +0.59 | 1.00 | 0.41 |  |
| 24 | Udyr | +0.59 | 0.80 | 0.21 |  |
| 25 | Morgana | +0.54 | 0.62 | 0.08 |  |
| 26 | Pantheon | +0.51 | 0.73 | 0.22 |  |
| 27 | Sivir | +0.50 | 0.50 | 0.00 |  |
| 28 | Xin Zhao | +0.48 | 0.66 | 0.18 |  |
| 29 | Nocturne | +0.46 | 0.67 | 0.21 |  |
| 30 | Milio | +0.37 | 0.37 | 0.00 |  |
| 31 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 32 | Kled | +0.29 | 0.36 | 0.07 |  |
| 33 | Kalista | +0.29 | 0.29 | 0.00 |  |
| 34 | Taric | +0.27 | 0.66 | 0.39 |  |
| 35 | Teemo | +0.27 | 0.27 | 0.00 |  |
| 36 | Zaahen | +0.26 | 0.38 | 0.12 |  |
| 37 | Kayn | +0.21 | 0.78 | 0.57 |  |
| 38 | Rengar | +0.21 | 0.63 | 0.42 |  |
| 39 | Lulu | +0.19 | 0.19 | 0.00 |  |
| 40 | Varus | +0.17 | 0.28 | 0.11 |  |
| 41 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 42 | Senna | +0.12 | 0.12 | 0.00 |  |
| 43 | Gangplank | +0.11 | 0.53 | 0.42 |  |
| 44 | Annie | +0.11 | 0.11 | 0.00 |  |
| 45 | Alistar | +0.10 | 0.31 | 0.21 |  |
| 46 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 47 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 48 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 49 | Corki | +0.07 | 0.07 | 0.00 |  |
| 50 | Vex | +0.07 | 0.07 | 0.00 |  |
| 51 | K'Sante | +0.04 | 0.14 | 0.10 |  |
| 52 | Nilah | +0.03 | 0.19 | 0.16 |  |
| 53 | Warwick | +0.02 | 0.46 | 0.44 |  |
| 54 | Jax | +0.01 | 0.22 | 0.21 |  |
| 55 | Singed | 0.00 | 0.42 | 0.42 |  |
| 56 | Malzahar | 0.00 | 0.40 | 0.40 |  |
| 57 | Garen | 0.00 | 0.36 | 0.36 |  |
| 58 | Malphite | 0.00 | 0.21 | 0.21 |  |
| 59 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 60 | Azir | 0.00 | 0.00 | 0.00 |  |
| 61 | Brand | 0.00 | 0.00 | 0.00 |  |
| 62 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 63 | Draven | 0.00 | 0.00 | 0.00 |  |
| 64 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 65 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 66 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 67 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 68 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 69 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 70 | Karma | 0.00 | 0.00 | 0.00 |  |
| 71 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 72 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 73 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 74 | Lux | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 80 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 81 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 82 | Sona | 0.00 | 0.00 | 0.00 |  |
| 83 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 84 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 85 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 86 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 87 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 88 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 89 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 90 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 91 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 92 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 93 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 94 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 95 | Jarvan IV | -0.02 | 0.07 | 0.09 |  |
| 96 | Yone | -0.02 | 0.07 | 0.09 |  |
| 97 | Graves | -0.03 | 0.00 | 0.03 |  |
| 98 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 99 | Olaf | -0.04 | 0.38 | 0.42 |  |
| 100 | Hecarim | -0.05 | 0.07 | 0.12 |  |
| 101 | Ornn | -0.05 | 0.07 | 0.12 |  |
| 102 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 103 | Volibear | -0.06 | 0.07 | 0.13 |  |
| 104 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 105 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 106 | Sion | -0.09 | 0.40 | 0.49 |  |
| 107 | Fizz | -0.09 | 0.00 | 0.09 |  |
| 108 | Sylas | -0.09 | 0.00 | 0.09 |  |
| 109 | Urgot | -0.09 | 0.00 | 0.09 |  |
| 110 | Briar | -0.10 | 0.00 | 0.10 |  |
| 111 | Lillia | -0.10 | 0.00 | 0.10 |  |
| 112 | Wukong | -0.12 | 0.00 | 0.12 |  |
| 113 | Rell | -0.12 | 0.00 | 0.12 |  |
| 114 | Shyvana | -0.13 | 0.07 | 0.20 |  |
| 115 | Bel'Veth | -0.13 | 0.00 | 0.13 |  |
| 116 | Qiyana | -0.13 | 0.00 | 0.13 |  |
| 117 | Illaoi | -0.14 | 0.07 | 0.21 |  |
| 118 | Sett | -0.14 | 0.07 | 0.21 |  |
| 119 | Akali | -0.14 | 0.00 | 0.14 |  |
| 120 | Ambessa | -0.14 | 0.00 | 0.14 |  |
| 121 | Lee Sin | -0.14 | 0.00 | 0.14 |  |
| 122 | Riven | -0.14 | 0.00 | 0.14 |  |
| 123 | Talon | -0.14 | 0.00 | 0.14 |  |
| 124 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 125 | Irelia | -0.17 | 0.00 | 0.17 |  |
| 126 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 127 | Nautilus | -0.18 | 0.00 | 0.18 |  |
| 128 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 129 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 130 | Diana | -0.20 | 0.00 | 0.20 |  |
| 131 | Kassadin | -0.20 | 0.00 | 0.20 |  |
| 132 | Sejuani | -0.20 | 0.00 | 0.20 |  |
| 133 | Katarina | -0.21 | 0.28 | 0.49 |  |
| 134 | Nasus | -0.21 | 0.21 | 0.42 |  |
| 135 | Amumu | -0.21 | 0.00 | 0.21 |  |
| 136 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 137 | Leona | -0.21 | 0.00 | 0.21 |  |
| 138 | Locke | -0.21 | 0.00 | 0.21 |  |
| 139 | Renekton | -0.21 | 0.00 | 0.21 |  |
| 140 | Viego | -0.23 | 0.07 | 0.30 |  |
| 141 | Rammus | -0.27 | 0.21 | 0.48 |  |
| 142 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 143 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 144 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 145 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 146 | Pyke | -0.28 | 0.00 | 0.28 |  |
| 147 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 148 | Skarner | -0.29 | 0.10 | 0.39 |  |
| 149 | Mordekaiser | -0.31 | 0.05 | 0.36 |  |
| 150 | Galio | -0.31 | 0.00 | 0.31 |  |
| 151 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 152 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 153 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 154 | Darius | -0.36 | 0.00 | 0.36 |  |
| 155 | Karthus | -0.36 | 0.00 | 0.36 |  |
| 156 | Trundle | -0.36 | 0.00 | 0.36 |  |
| 157 | Yorick | -0.36 | 0.00 | 0.36 |  |
| 158 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 159 | Shen | -0.38 | 0.21 | 0.59 |  |
| 160 | Janna | -0.40 | 0.00 | 0.40 |  |
| 161 | Poppy | -0.41 | 0.00 | 0.41 |  |
| 162 | Blitzcrank | -0.42 | 0.00 | 0.42 |  |
| 163 | Cho'Gath | -0.42 | 0.00 | 0.42 |  |
| 164 | Dr. Mundo | -0.42 | 0.00 | 0.42 |  |
| 165 | Rumble | -0.42 | 0.00 | 0.42 |  |
| 166 | Vi | -0.45 | 0.07 | 0.52 |  |
| 167 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 168 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 169 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 170 | Zac | -0.65 | 0.00 | 0.65 |  |
| 171 | Tahm Kench | -0.68 | 0.00 | 0.68 |  |
| 172 | Nunu & Willump | -0.72 | 0.19 | 0.91 |  |
