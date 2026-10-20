# Counters to Swain (patch 26.20)

Every champion ranked by what its kit does against Swain's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Swain's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Swain` for the full ledger of a matchup, with sources.

## Top 10

### 1. Fizz (net +1.02)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Swain's Nevermove. Untargetable for 0.75 s; Nevermove takes 1.01 s to land, enough to react. (Fizz E Playful → Swain E Nevermove)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Swain's Demonflare. Untargetable for 0.75 s; Demonflare takes 0.25 s to land, enough to react. (Fizz E Playful → Swain R Demonflare)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Swain's Demonic Ascension. Untargetable for 0.75 s; Demonic Ascension takes 0.5 s to land, enough to react. (Fizz E Playful → Swain R Demonic Ascension)
- Watch out: Swain's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

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
| 1 | Fizz | +1.02 | 1.11 | 0.09 |  |
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
| 15 | Yasuo | +0.66 | 0.78 | 0.12 | projectile block (Wind Wall) |
| 16 | Yuumi | +0.65 | 1.11 | 0.46 |  |
| 17 | Evelynn | +0.64 | 0.78 | 0.14 |  |
| 18 | Shaco | +0.64 | 0.78 | 0.14 |  |
| 19 | Mel | +0.64 | 0.64 | 0.00 | projectile block (Rebuttal) |
| 20 | Zed | +0.63 | 0.77 | 0.14 |  |
| 21 | Master Yi | +0.59 | 1.00 | 0.41 |  |
| 22 | Udyr | +0.59 | 0.80 | 0.21 |  |
| 23 | Morgana | +0.54 | 0.62 | 0.08 |  |
| 24 | Sivir | +0.50 | 0.50 | 0.00 |  |
| 25 | Xin Zhao | +0.48 | 0.66 | 0.18 |  |
| 26 | Nocturne | +0.46 | 0.67 | 0.21 |  |
| 27 | Milio | +0.37 | 0.37 | 0.00 |  |
| 28 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 29 | Kled | +0.29 | 0.36 | 0.07 |  |
| 30 | Kalista | +0.29 | 0.29 | 0.00 |  |
| 31 | Teemo | +0.27 | 0.27 | 0.00 |  |
| 32 | Zaahen | +0.26 | 0.38 | 0.12 |  |
| 33 | Kayn | +0.21 | 0.78 | 0.57 |  |
| 34 | Rengar | +0.21 | 0.63 | 0.42 |  |
| 35 | Lulu | +0.19 | 0.19 | 0.00 |  |
| 36 | Varus | +0.17 | 0.28 | 0.11 |  |
| 37 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 38 | Senna | +0.12 | 0.12 | 0.00 |  |
| 39 | Pantheon | +0.11 | 0.73 | 0.62 |  |
| 40 | Gangplank | +0.11 | 0.53 | 0.42 |  |
| 41 | Annie | +0.11 | 0.11 | 0.00 |  |
| 42 | Alistar | +0.10 | 0.31 | 0.21 |  |
| 43 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 44 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 45 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 46 | Vex | +0.07 | 0.07 | 0.00 |  |
| 47 | K'Sante | +0.04 | 0.14 | 0.10 |  |
| 48 | Nilah | +0.03 | 0.19 | 0.16 |  |
| 49 | Jax | +0.01 | 0.22 | 0.21 |  |
| 50 | Singed | 0.00 | 0.42 | 0.42 |  |
| 51 | Malzahar | 0.00 | 0.40 | 0.40 |  |
| 52 | Garen | 0.00 | 0.36 | 0.36 |  |
| 53 | Malphite | 0.00 | 0.21 | 0.21 |  |
| 54 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 55 | Azir | 0.00 | 0.00 | 0.00 |  |
| 56 | Brand | 0.00 | 0.00 | 0.00 |  |
| 57 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 58 | Corki | 0.00 | 0.00 | 0.00 |  |
| 59 | Draven | 0.00 | 0.00 | 0.00 |  |
| 60 | Elise | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 66 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 67 | Karma | 0.00 | 0.00 | 0.00 |  |
| 68 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 69 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 70 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lux | 0.00 | 0.00 | 0.00 |  |
| 73 | Nami | 0.00 | 0.00 | 0.00 |  |
| 74 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 75 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 76 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 77 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 78 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 79 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 80 | Sona | 0.00 | 0.00 | 0.00 |  |
| 81 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 82 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 83 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 84 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 85 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 86 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 87 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 88 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 89 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 90 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 91 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 92 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 93 | Jarvan IV | -0.02 | 0.07 | 0.09 |  |
| 94 | Yone | -0.02 | 0.07 | 0.09 |  |
| 95 | Graves | -0.03 | 0.00 | 0.03 |  |
| 96 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 97 | Olaf | -0.04 | 0.38 | 0.42 |  |
| 98 | Hecarim | -0.05 | 0.07 | 0.12 |  |
| 99 | Ornn | -0.05 | 0.07 | 0.12 |  |
| 100 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 101 | Volibear | -0.06 | 0.07 | 0.13 |  |
| 102 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 103 | Rakan | -0.08 | 0.00 | 0.08 |  |
| 104 | Sion | -0.09 | 0.40 | 0.49 |  |
| 105 | Sylas | -0.09 | 0.00 | 0.09 |  |
| 106 | Urgot | -0.09 | 0.00 | 0.09 |  |
| 107 | Briar | -0.10 | 0.00 | 0.10 |  |
| 108 | Lillia | -0.10 | 0.00 | 0.10 |  |
| 109 | Wukong | -0.12 | 0.00 | 0.12 |  |
| 110 | Rell | -0.12 | 0.00 | 0.12 |  |
| 111 | Shyvana | -0.13 | 0.07 | 0.20 |  |
| 112 | Bel'Veth | -0.13 | 0.00 | 0.13 |  |
| 113 | Qiyana | -0.13 | 0.00 | 0.13 |  |
| 114 | Illaoi | -0.14 | 0.07 | 0.21 |  |
| 115 | Sett | -0.14 | 0.07 | 0.21 |  |
| 116 | Akali | -0.14 | 0.00 | 0.14 |  |
| 117 | Ambessa | -0.14 | 0.00 | 0.14 |  |
| 118 | Ekko | -0.14 | 0.00 | 0.14 |  |
| 119 | Lee Sin | -0.14 | 0.00 | 0.14 |  |
| 120 | Riven | -0.14 | 0.00 | 0.14 |  |
| 121 | Talon | -0.14 | 0.00 | 0.14 |  |
| 122 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 123 | Irelia | -0.17 | 0.00 | 0.17 |  |
| 124 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 125 | Nautilus | -0.18 | 0.00 | 0.18 |  |
| 126 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 127 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 128 | Diana | -0.20 | 0.00 | 0.20 |  |
| 129 | Kassadin | -0.20 | 0.00 | 0.20 |  |
| 130 | Sejuani | -0.20 | 0.00 | 0.20 |  |
| 131 | Katarina | -0.21 | 0.28 | 0.49 |  |
| 132 | Nasus | -0.21 | 0.21 | 0.42 |  |
| 133 | Amumu | -0.21 | 0.00 | 0.21 |  |
| 134 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 135 | Leona | -0.21 | 0.00 | 0.21 |  |
| 136 | Locke | -0.21 | 0.00 | 0.21 |  |
| 137 | Renekton | -0.21 | 0.00 | 0.21 |  |
| 138 | Viego | -0.23 | 0.07 | 0.30 |  |
| 139 | Rammus | -0.27 | 0.21 | 0.48 |  |
| 140 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Pyke | -0.28 | 0.00 | 0.28 |  |
| 145 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 146 | Skarner | -0.29 | 0.10 | 0.39 |  |
| 147 | Mordekaiser | -0.31 | 0.05 | 0.36 |  |
| 148 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 149 | Warwick | -0.33 | 0.46 | 0.79 |  |
| 150 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 151 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 152 | Darius | -0.36 | 0.00 | 0.36 |  |
| 153 | Karthus | -0.36 | 0.00 | 0.36 |  |
| 154 | Trundle | -0.36 | 0.00 | 0.36 |  |
| 155 | Yorick | -0.36 | 0.00 | 0.36 |  |
| 156 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 157 | Shen | -0.38 | 0.21 | 0.59 |  |
| 158 | Taric | -0.39 | 0.00 | 0.39 |  |
| 159 | Janna | -0.40 | 0.00 | 0.40 |  |
| 160 | Poppy | -0.41 | 0.00 | 0.41 |  |
| 161 | Blitzcrank | -0.42 | 0.00 | 0.42 |  |
| 162 | Cho'Gath | -0.42 | 0.00 | 0.42 |  |
| 163 | Dr. Mundo | -0.42 | 0.00 | 0.42 |  |
| 164 | Rumble | -0.42 | 0.00 | 0.42 |  |
| 165 | Vi | -0.45 | 0.07 | 0.52 |  |
| 166 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 167 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 168 | Naafiri | -0.55 | 0.00 | 0.55 |  |
| 169 | Zac | -0.65 | 0.00 | 0.65 |  |
| 170 | Tahm Kench | -0.68 | 0.00 | 0.68 |  |
| 171 | Nunu & Willump | -0.72 | 0.19 | 0.91 |  |
| 172 | Galio | -0.72 | 0.00 | 0.72 |  |
