# Counters to Rammus (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Rammus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rammus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rammus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.42 | – | +0.00 |
| 3 | Olaf | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 4 | Smolder | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 5 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 6 | Cho'Gath | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.00 |
| 7 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 8 | Kalista | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 9 | Darius | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 10 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 11 | Illaoi | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 12 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 14 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 15 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 16 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 17 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 18 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 19 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 20 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 21 | Xin Zhao | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 22 | Swain | +0.80 | +1.00 | +0.96 | +1.00 | +0.05 | +1.00 | +0.00 |
| 23 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 24 | Mordekaiser | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 25 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 26 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 27 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 28 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 29 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 30 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 31 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 32 | Kled | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 33 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 34 | Karma | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 35 | Tahm Kench | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 36 | K'Sante | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 37 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 38 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 39 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 40 | Aphelios | +0.76 | +1.00 | +1.00 | +1.00 | +0.08 | +0.50 | +0.00 |
| 41 | Vel'Koz | +0.70 | +1.00 | +1.00 | +1.00 | +0.20 | −0.29 | +0.00 |
| 42 | Lulu | +0.62 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 43 | Quinn | +0.61 | +1.00 | +1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 44 | Graves | +0.57 | +1.00 | +1.00 | +0.50 | +0.15 | −0.50 | +0.00 |
| 45 | Ezreal | +0.57 | +0.76 | +0.53 | +0.75 | −0.02 | +0.97 | +0.00 |
| 46 | Warwick | +0.53 | +0.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 47 | Sion | +0.50 | +1.00 | −0.01 | +1.00 | +0.03 | – | +0.00 |
| 48 | Samira | +0.44 | +1.00 | +0.30 | +1.00 | +0.11 | −1.00 | +0.00 |
| 49 | Kog'Maw | +0.33 | +0.00 | +0.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 50 | Corki | +0.33 | +0.00 | +0.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 51 | Kennen | +0.32 | +0.03 | +0.02 | +1.00 | +0.08 | +1.00 | +0.00 |
| 52 | Jayce | +0.31 | +1.00 | −0.77 | +1.00 | +0.15 | – | +0.00 |
| 53 | Morgana | +0.26 | −0.01 | −0.02 | +0.82 | +0.11 | +0.86 | +0.00 |
| 54 | Sett | +0.23 | −1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 55 | Rakan | +0.22 | −1.00 | +1.00 | +0.55 | +0.10 | +1.00 | +0.00 |
| 56 | Anivia | +0.18 | +0.34 | +0.32 | +0.04 | −0.06 | +0.16 | +0.00 |
| 57 | Ashe | +0.12 | −0.45 | −0.40 | +1.00 | +0.22 | +1.00 | +0.00 |
| 58 | Singed | +0.08 | +0.07 | +0.13 | +0.13 | −0.02 | – | +0.00 |
| 59 | Malphite | +0.07 | +0.07 | +0.06 | +0.07 | +0.12 | – | +0.00 |
| 60 | Jinx | +0.05 | −0.20 | +0.00 | +0.71 | +0.06 | −0.52 | +0.00 |
| 61 | Braum | +0.03 | +0.04 | +0.04 | +0.06 | −0.05 | – | +0.00 |
| 62 | Janna | −0.04 | +0.08 | +0.07 | +0.07 | +0.06 | −1.00 | +0.00 |
| 63 | Soraka | −0.06 | −0.09 | −0.12 | +0.02 | −0.03 | −0.09 | +0.00 |
| 64 | Annie | −0.10 | +0.94 | −1.00 | +0.00 | +0.13 | −1.00 | +0.00 |
| 65 | Gnar | −0.10 | −0.88 | −0.88 | +1.00 | +0.28 | +1.00 | +0.00 |
| 66 | Xayah | −0.12 | +0.00 | −1.00 | +1.00 | +0.17 | −1.00 | +0.00 |
| 67 | Aurora | −0.17 | −1.00 | −1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 68 | Rell | −0.18 | −1.00 | −1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 69 | Twisted Fate | −0.18 | −1.00 | −1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 70 | Nami | −0.18 | −0.14 | −0.45 | −0.11 | +0.02 | −0.20 | +0.00 |
| 71 | Ornn | −0.21 | −0.02 | −0.06 | −1.00 | +0.20 | – | +0.00 |
| 72 | Ambessa | −0.27 | −1.00 | −1.00 | +1.00 | +0.37 | – | +0.00 |
| 73 | Yone | −0.30 | −1.00 | −1.00 | +1.00 | +0.21 | – | +0.00 |
| 74 | Diana | −0.30 | −1.00 | −1.00 | +1.00 | +0.19 | – | +0.00 |
| 75 | Riven | −0.31 | −1.00 | −1.00 | +1.00 | +0.17 | – | +0.00 |
| 76 | Nocturne | −0.32 | −1.00 | −1.00 | +1.00 | +0.09 | – | +0.00 |
| 77 | Vi | −0.33 | −1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 78 | Lee Sin | −0.33 | −1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 79 | Fizz | −0.33 | −1.00 | −1.00 | +1.00 | −0.00 | – | +0.00 |
| 80 | Pantheon | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 81 | Malzahar | −0.35 | −1.00 | −0.84 | +1.00 | +0.05 | −1.00 | +0.00 |
| 82 | Teemo | −0.37 | −1.00 | −1.00 | +1.00 | +0.19 | −1.00 | +0.00 |
| 83 | Heimerdinger | −0.37 | −1.00 | −1.00 | +1.00 | +0.18 | −1.00 | +0.00 |
| 84 | Udyr | −0.38 | −1.00 | −1.00 | +1.00 | +0.14 | −1.00 | +0.00 |
| 85 | Neeko | −0.38 | −1.00 | −1.00 | +1.00 | +0.13 | −1.00 | +0.00 |
| 86 | Orianna | −0.39 | −1.00 | −1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 87 | Sivir | −0.39 | −1.00 | −1.00 | +1.00 | +0.07 | −1.00 | +0.00 |
| 88 | Lux | −0.39 | −1.00 | −1.00 | +0.98 | +0.09 | −1.00 | +0.00 |
| 89 | Syndra | −0.39 | −1.00 | −1.00 | +1.00 | +0.04 | −1.00 | +0.00 |
| 90 | Ryze | −0.39 | −1.00 | −1.00 | +0.94 | +0.11 | −1.00 | +0.00 |
| 91 | Hwei | −0.40 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 92 | Kai'Sa | −0.40 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 93 | Jarvan IV | −0.41 | −1.00 | −1.00 | +0.50 | +0.20 | – | +0.00 |
| 94 | Urgot | −0.42 | −1.00 | −1.00 | +0.75 | +0.21 | −1.00 | +0.00 |
| 95 | Lissandra | −0.48 | −0.08 | −0.68 | −1.00 | +0.09 | −1.00 | +0.00 |
| 96 | Sejuani | −0.54 | −1.00 | −1.00 | +0.00 | +0.07 | – | +0.00 |
| 97 | Irelia | −0.57 | −1.00 | −1.00 | −0.09 | +0.01 | – | +0.00 |
| 98 | Zyra | −0.61 | −1.00 | −1.00 | −0.10 | +0.03 | −1.00 | +0.00 |
| 99 | Karthus | −0.63 | −1.00 | −1.00 | −0.15 | +0.01 | −1.00 | +0.00 |
| 100 | Viktor | −0.69 | −1.00 | −1.00 | −0.50 | +0.08 | −1.00 | +0.00 |
| 101 | Brand | −0.72 | −1.00 | −1.00 | −0.64 | +0.07 | −1.00 | +0.00 |
| 102 | Galio | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 103 | Nautilus | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 104 | Blitzcrank | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 105 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 106 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 107 | Amumu | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 108 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 109 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 110 | Kindred | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 111 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 112 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 113 | Varus | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 114 | Rengar | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 115 | Skarner | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 116 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 117 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 118 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 119 | Tristana | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 120 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 121 | Jhin | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 122 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 123 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 124 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 125 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 126 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 127 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 128 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 129 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 130 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 131 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 132 | Thresh | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 133 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 134 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 135 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 136 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 137 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 138 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 139 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 140 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 141 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 142 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 143 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 144 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rammus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rammus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rammus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +1.41)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.4 s; Soaring Slam takes 0.89 s to land, enough to react. (Maokai W Twisted Advance → Rammus R Soaring Slam)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.4 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Rammus E Frenzying Taunt)
- **0.35** interrupt: Bramble Smash's airborne interrupts Rammus's Powerball (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Maokai for each basic attack.

#### 2. Zaahen (net +1.39)

- **0.90** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Soaring Slam (airborne, slow). Immune for ?; Soaring Slam takes 0.89 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus R Soaring Slam)
- **0.35** interrupt: The Darkin Glaive's airborne interrupts Rammus's Powerball (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Rammus Q Powerball)
- **0.34** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Frenzying Taunt (taunt). Immune for ?; Frenzying Taunt takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Zaahen for each basic attack.

#### 3. Morgana (net +1.26)

- **0.90** cc immunity: Black Shield makes Morgana immune to Rammus's Soaring Slam (airborne, slow). Immune for 5 s, long enough to use ahead of Soaring Slam. (Morgana E Black Shield → Rammus R Soaring Slam)
- **0.60** cc immunity: Black Shield makes Morgana immune to Rammus's Frenzying Taunt (taunt). Immune for 5 s, long enough to use ahead of Frenzying Taunt. (Morgana E Black Shield → Rammus E Frenzying Taunt)
- **0.44** cc immunity: Black Shield makes Morgana immune to Rammus's Powerball (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Powerball. (Morgana E Black Shield → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Morgana for each basic attack.

#### 4. Fizz (net +1.23)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Rammus's Soaring Slam. Untargetable for 0.75 s; Soaring Slam takes 0.89 s to land, enough to react. (Fizz E Playful → Rammus R Soaring Slam)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 0.75 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Fizz E Playful → Rammus E Frenzying Taunt)
- **0.36** untargetable: Playful makes Fizz untargetable, dodging Rammus's Powerball. Untargetable for 0.75 s; Powerball lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Fizz for each basic attack.

#### 5. Rek'Sai (net +1.21)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.5 s, long enough to use ahead of Soaring Slam. (Rek'Sai R Void Rush → Rammus R Soaring Slam)
- **0.35** interrupt: Unburrow's airborne interrupts Rammus's Powerball (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Rammus Q Powerball)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.5 s, long enough to use ahead of Frenzying Taunt. (Rek'Sai R Void Rush → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Rek'Sai for each basic attack.

#### 6. Lissandra (net +1.17)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Lissandra R Frozen Tomb → Rammus R Soaring Slam)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Lissandra R Frozen Tomb → Rammus E Frenzying Taunt)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Powerball. Untargetable for 2.5 s, long enough to use ahead of Powerball. (Lissandra R Frozen Tomb → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Lissandra for each basic attack.

#### 7. Bard (net +1.15)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Bard R Tempered Fate → Rammus R Soaring Slam)
- **0.36** range: Bard's basic attacks reach 375 units farther than Rammus's (500 vs 125 attack range). Rammus closes the gap with Soaring Slam. (Bard basic attacks → Rammus basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Bard R Tempered Fate → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Bard for each basic attack.

#### 8. Alistar (net +1.14)

- **0.72** cleanse: Unbreakable Will cleanses Rammus's Soaring Slam (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Rammus R Soaring Slam)
- **0.27** cleanse: Unbreakable Will cleanses Rammus's Frenzying Taunt (taunt) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Rammus E Frenzying Taunt)
- **0.27** interrupt: Pulverize's airborne interrupts Rammus's Powerball (normal channel). Pulverize must land during the channel. (Alistar Q Pulverize → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Alistar for each basic attack.

#### 9. Fiora (net +1.13)

- **1.00** parry: Riposte parries Rammus's Soaring Slam and stuns back. Parry for 0.75 s; Soaring Slam takes 0.89 s to land, enough to react. Negating Soaring Slam's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus R Soaring Slam)
- **0.70** parry: Riposte parries Rammus's Frenzying Taunt and stuns back. Parry for 0.75 s; Frenzying Taunt takes 0.25 s to land, enough to react. Negating Frenzying Taunt's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus E Frenzying Taunt)
- **0.36** parry: Riposte parries Rammus's Powerball and stuns back. Parry for 0.75 s; Powerball lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Powerball's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Fiora for each basic attack.

#### 10. Vladimir (net +1.10)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Soaring Slam. Untargetable for 2 s, long enough to use ahead of Soaring Slam. (Vladimir W Sanguine Pool → Rammus R Soaring Slam)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2 s, long enough to use ahead of Frenzying Taunt. (Vladimir W Sanguine Pool → Rammus E Frenzying Taunt)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Powerball. Untargetable for 2 s, long enough to use ahead of Powerball. (Vladimir W Sanguine Pool → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Vladimir for each basic attack.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.41 | 1.68 | 0.27 |  |
| 2 | Zaahen | +1.39 | 1.71 | 0.32 |  |
| 3 | Morgana | +1.26 | 1.50 | 0.24 |  |
| 4 | Fizz | +1.23 | 1.50 | 0.27 |  |
| 5 | Rek'Sai | +1.21 | 1.51 | 0.30 |  |
| 6 | Lissandra | +1.17 | 1.39 | 0.22 |  |
| 7 | Bard | +1.15 | 1.53 | 0.38 |  |
| 8 | Alistar | +1.14 | 1.46 | 0.32 |  |
| 9 | Fiora | +1.13 | 1.45 | 0.32 |  |
| 10 | Vladimir | +1.10 | 1.49 | 0.39 |  |
| 11 | Evelynn | +1.10 | 1.37 | 0.27 |  |
| 12 | Xayah | +1.09 | 1.47 | 0.38 |  |
| 13 | Aurora | +1.08 | 1.37 | 0.29 |  |
| 14 | Kled | +1.07 | 1.48 | 0.41 |  |
| 15 | Udyr | +1.06 | 1.47 | 0.41 |  |
| 16 | Nocturne | +1.05 | 1.43 | 0.38 |  |
| 17 | Camille | +1.03 | 1.41 | 0.38 |  |
| 18 | Shaco | +1.02 | 1.34 | 0.32 |  |
| 19 | Sion | +0.96 | 1.53 | 0.57 |  |
| 20 | Rell | +0.90 | 1.25 | 0.35 |  |
| 21 | Gwen | +0.88 | 1.24 | 0.36 |  |
| 22 | Sivir | +0.86 | 1.36 | 0.50 |  |
| 23 | Kalista | +0.82 | 1.14 | 0.32 |  |
| 24 | Gangplank | +0.78 | 1.07 | 0.29 |  |
| 25 | Olaf | +0.77 | 1.15 | 0.38 |  |
| 26 | Zed | +0.77 | 1.06 | 0.29 |  |
| 27 | Milio | +0.73 | 1.11 | 0.38 |  |
| 28 | Rengar | +0.73 | 1.11 | 0.38 |  |
| 29 | Master Yi | +0.69 | 1.50 | 0.81 |  |
| 30 | Heimerdinger | +0.63 | 0.83 | 0.20 |  |
| 31 | Cassiopeia | +0.59 | 0.81 | 0.22 | grounding (Miasma) |
| 32 | Lulu | +0.54 | 0.90 | 0.36 |  |
| 33 | Kayle | +0.53 | 0.89 | 0.36 |  |
| 34 | Anivia | +0.53 | 0.77 | 0.24 |  |
| 35 | Thresh | +0.50 | 0.74 | 0.24 |  |
| 36 | Gnar | +0.49 | 0.83 | 0.34 |  |
| 37 | K'Sante | +0.48 | 0.91 | 0.43 |  |
| 38 | Singed | +0.47 | 0.74 | 0.27 | grounding (Mega Adhesive) |
| 39 | Nami | +0.45 | 0.67 | 0.22 |  |
| 40 | Xin Zhao | +0.44 | 0.88 | 0.44 |  |
| 41 | Yuumi | +0.43 | 1.68 | 1.25 |  |
| 42 | Sejuani | +0.42 | 0.74 | 0.32 |  |
| 43 | Malzahar | +0.41 | 1.43 | 1.02 |  |
| 44 | Blitzcrank | +0.41 | 0.77 | 0.36 |  |
| 45 | Viktor | +0.40 | 0.72 | 0.32 |  |
| 46 | Seraphine | +0.40 | 0.69 | 0.29 |  |
| 47 | Renata Glasc | +0.37 | 0.75 | 0.38 |  |
| 48 | Yone | +0.37 | 0.64 | 0.27 |  |
| 49 | Teemo | +0.36 | 0.72 | 0.36 |  |
| 50 | Vex | +0.35 | 0.62 | 0.27 |  |
| 51 | Brand | +0.35 | 0.57 | 0.22 |  |
| 52 | Cho'Gath | +0.34 | 0.63 | 0.29 |  |
| 53 | Ornn | +0.33 | 0.60 | 0.27 |  |
| 54 | Zilean | +0.30 | 0.62 | 0.32 |  |
| 55 | Garen | +0.28 | 0.71 | 0.43 |  |
| 56 | Mordekaiser | +0.28 | 0.60 | 0.32 |  |
| 57 | Elise | +0.27 | 0.59 | 0.32 |  |
| 58 | Kennen | +0.27 | 0.56 | 0.29 |  |
| 59 | Urgot | +0.27 | 0.54 | 0.27 |  |
| 60 | Hwei | +0.27 | 0.50 | 0.23 |  |
| 61 | Annie | +0.27 | 0.49 | 0.22 |  |
| 62 | Swain | +0.27 | 0.48 | 0.21 |  |
| 63 | Kayn | +0.26 | 1.40 | 1.14 |  |
| 64 | Rakan | +0.26 | 0.55 | 0.29 |  |
| 65 | Jayce | +0.25 | 0.57 | 0.32 |  |
| 66 | Vayne | +0.24 | 0.67 | 0.43 |  |
| 67 | Aurelion Sol | +0.24 | 0.64 | 0.40 |  |
| 68 | Draven | +0.24 | 0.60 | 0.36 |  |
| 69 | Yasuo | +0.24 | 0.53 | 0.29 |  |
| 70 | Ziggs | +0.24 | 0.51 | 0.27 |  |
| 71 | Ahri | +0.24 | 0.46 | 0.22 |  |
| 72 | Zoe | +0.23 | 0.55 | 0.32 |  |
| 73 | Veigar | +0.23 | 0.47 | 0.24 |  |
| 74 | Leona | +0.22 | 0.51 | 0.29 |  |
| 75 | Soraka | +0.22 | 0.49 | 0.27 |  |
| 76 | Syndra | +0.22 | 0.44 | 0.22 |  |
| 77 | Riven | +0.18 | 0.56 | 0.38 |  |
| 78 | Sett | +0.17 | 0.49 | 0.32 |  |
| 79 | Ashe | +0.16 | 0.52 | 0.36 |  |
| 80 | Orianna | +0.16 | 0.43 | 0.27 |  |
| 81 | Sona | +0.15 | 0.56 | 0.41 |  |
| 82 | Tristana | +0.15 | 0.51 | 0.36 |  |
| 83 | Azir | +0.15 | 0.42 | 0.27 |  |
| 84 | Zyra | +0.15 | 0.39 | 0.24 |  |
| 85 | Neeko | +0.15 | 0.37 | 0.22 |  |
| 86 | Aphelios | +0.13 | 0.51 | 0.38 |  |
| 87 | Jax | +0.13 | 0.45 | 0.32 |  |
| 88 | Amumu | +0.12 | 0.39 | 0.27 |  |
| 89 | Malphite | +0.11 | 0.40 | 0.29 |  |
| 90 | Braum | +0.10 | 0.42 | 0.32 |  |
| 91 | Volibear | +0.08 | 0.40 | 0.32 |  |
| 92 | Nilah | +0.06 | 0.56 | 0.50 |  |
| 93 | Irelia | +0.05 | 0.32 | 0.27 |  |
| 94 | Shyvana | +0.04 | 0.33 | 0.29 |  |
| 95 | Lillia | +0.04 | 0.26 | 0.22 |  |
| 96 | Kassadin | +0.03 | 0.32 | 0.29 |  |
| 97 | Zeri | 0.00 | 0.44 | 0.44 |  |
| 98 | Twitch | 0.00 | 0.43 | 0.43 |  |
| 99 | Kai'Sa | 0.00 | 0.38 | 0.38 |  |
| 100 | Yunara | 0.00 | 0.36 | 0.36 |  |
| 101 | Corki | 0.00 | 0.32 | 0.32 |  |
| 102 | Ezreal | 0.00 | 0.32 | 0.32 |  |
| 103 | Senna | 0.00 | 0.32 | 0.32 |  |
| 104 | Smolder | 0.00 | 0.32 | 0.32 |  |
| 105 | Nidalee | 0.00 | 0.30 | 0.30 |  |
| 106 | Jinx | 0.00 | 0.29 | 0.29 |  |
| 107 | Lux | 0.00 | 0.29 | 0.29 |  |
| 108 | Mel | 0.00 | 0.27 | 0.27 |  |
| 109 | Karma | 0.00 | 0.22 | 0.22 |  |
| 110 | LeBlanc | 0.00 | 0.22 | 0.22 |  |
| 111 | Skarner | -0.01 | 0.31 | 0.32 |  |
| 112 | Renekton | -0.02 | 0.30 | 0.32 |  |
| 113 | Samira | -0.02 | 0.30 | 0.32 |  |
| 114 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 115 | Sylas | -0.02 | 0.27 | 0.29 |  |
| 116 | Kindred | -0.03 | 0.47 | 0.50 |  |
| 117 | Aatrox | -0.03 | 0.35 | 0.38 |  |
| 118 | Nasus | -0.03 | 0.29 | 0.32 |  |
| 119 | Pyke | -0.06 | 0.55 | 0.61 |  |
| 120 | Bel'Veth | -0.08 | 0.30 | 0.38 |  |
| 121 | Graves | -0.08 | 0.24 | 0.32 |  |
| 122 | Ambessa | -0.10 | 0.15 | 0.25 |  |
| 123 | Quinn | -0.11 | 0.68 | 0.79 |  |
| 124 | Hecarim | -0.11 | 0.21 | 0.32 |  |
| 125 | Diana | -0.11 | 0.16 | 0.27 |  |
| 126 | Lee Sin | -0.11 | 0.16 | 0.27 |  |
| 127 | Taric | -0.14 | 0.24 | 0.38 |  |
| 128 | Yorick | -0.14 | 0.24 | 0.38 |  |
| 129 | Darius | -0.14 | 0.22 | 0.36 |  |
| 130 | Jarvan IV | -0.15 | 0.21 | 0.36 |  |
| 131 | Qiyana | -0.15 | 0.15 | 0.30 |  |
| 132 | Nautilus | -0.16 | 0.16 | 0.32 |  |
| 133 | Illaoi | -0.16 | 0.13 | 0.29 |  |
| 134 | Warwick | -0.18 | 1.52 | 1.70 |  |
| 135 | Trundle | -0.19 | 0.22 | 0.41 |  |
| 136 | Varus | -0.22 | 0.27 | 0.49 |  |
| 137 | Gragas | -0.24 | 0.40 | 0.64 |  |
| 138 | Briar | -0.24 | 0.16 | 0.40 |  |
| 139 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 140 | Taliyah | -0.28 | 0.95 | 1.23 |  |
| 141 | Vel'Koz | -0.29 | 0.54 | 0.83 |  |
| 142 | Akali | -0.29 | 0.00 | 0.29 |  |
| 143 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 144 | Ivern | -0.32 | 0.19 | 0.51 |  |
| 145 | Dr. Mundo | -0.32 | 0.00 | 0.32 |  |
| 146 | Ekko | -0.32 | 0.00 | 0.32 |  |
| 147 | Fiddlesticks | -0.34 | 0.79 | 1.13 |  |
| 148 | Viego | -0.34 | 0.61 | 0.95 |  |
| 149 | Twisted Fate | -0.35 | 0.78 | 1.13 |  |
| 150 | Wukong | -0.35 | 0.15 | 0.50 |  |
| 151 | Talon | -0.36 | 0.00 | 0.36 |  |
| 152 | Locke | -0.38 | 0.00 | 0.38 |  |
| 153 | Xerath | -0.40 | 0.52 | 0.92 |  |
| 154 | Janna | -0.42 | 0.74 | 1.16 |  |
| 155 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 156 | Zac | -0.49 | 0.73 | 1.22 |  |
| 157 | Tahm Kench | -0.51 | 0.78 | 1.29 |  |
| 158 | Poppy | -0.52 | 0.15 | 0.67 |  |
| 159 | Caitlyn | -0.56 | 0.36 | 0.92 |  |
| 160 | Miss Fortune | -0.56 | 0.32 | 0.88 |  |
| 161 | Jhin | -0.56 | 0.27 | 0.83 |  |
| 162 | Lucian | -0.58 | 0.36 | 0.94 |  |
| 163 | Akshan | -0.58 | 0.34 | 0.92 |  |
| 164 | Karthus | -0.61 | 0.19 | 0.80 |  |
| 165 | Vi | -0.65 | 0.56 | 1.21 |  |
| 166 | Ryze | -0.70 | 0.24 | 0.94 |  |
| 167 | Shen | -0.72 | 0.56 | 1.28 |  |
| 168 | Galio | -0.75 | 0.70 | 1.45 |  |
| 169 | Pantheon | -0.76 | 0.56 | 1.32 |  |
| 170 | Nunu & Willump | -0.86 | 0.39 | 1.25 |  |
| 171 | Katarina | -0.88 | 0.00 | 0.88 |  |
| 172 | Naafiri | -1.19 | 0.00 | 1.19 |  |
