# Counters to Warwick (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Warwick: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Warwick wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Warwick --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Ashe | +0.89 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | +0.50 |
| 2 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 3 | Gangplank | +0.86 | +1.00 | +1.00 | +1.00 | +0.15 | – | +1.00 |
| 4 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.00 |
| 5 | Twisted Fate | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 6 | Aphelios | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 7 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | +0.05 | – | +1.00 |
| 8 | Sivir | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 9 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.00 |
| 10 | Morgana | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 11 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.03 | – | +1.00 |
| 12 | Karma | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 13 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 14 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +1.00 |
| 15 | Neeko | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 16 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 17 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 18 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 19 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 20 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 21 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 22 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 23 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 24 | Quinn | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 25 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 26 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 27 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 28 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 29 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 30 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 31 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 32 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 33 | Lux | +0.76 | +1.00 | +0.90 | +0.95 | −0.01 | +0.95 | +0.00 |
| 34 | Jinx | +0.76 | +0.99 | +0.95 | +0.88 | +0.07 | +0.85 | +0.00 |
| 35 | Gwen | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 36 | Brand | +0.70 | +1.00 | +1.00 | +1.00 | +0.01 | +0.00 | +0.00 |
| 37 | Ezreal | +0.64 | +0.99 | +0.64 | +0.53 | +0.17 | +1.00 | +0.00 |
| 38 | Lulu | +0.62 | +1.00 | +1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 39 | Anivia | +0.59 | +0.55 | +1.00 | +1.00 | −0.14 | +0.26 | +0.00 |
| 40 | Singed | +0.58 | +1.00 | +1.00 | +0.07 | +0.05 | – | +0.00 |
| 41 | Riven | +0.56 | +1.00 | +1.00 | +0.00 | +0.04 | – | +0.00 |
| 42 | Tahm Kench | +0.53 | +1.00 | +0.50 | +0.50 | +0.02 | – | +0.00 |
| 43 | Renekton | +0.48 | +0.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 44 | Viktor | +0.47 | +1.00 | +0.00 | +1.00 | +0.11 | +0.00 | +0.00 |
| 45 | Illaoi | +0.30 | −1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 46 | Corki | +0.26 | −1.00 | +1.00 | +0.50 | +0.38 | +1.00 | +0.00 |
| 47 | Senna | +0.20 | +0.13 | +1.00 | −1.00 | +0.16 | +0.92 | +0.00 |
| 48 | Vex | +0.04 | +1.00 | −0.39 | −0.39 | +0.08 | −0.44 | +0.00 |
| 49 | Hwei | +0.02 | +1.00 | −1.00 | −0.44 | +0.08 | +1.00 | +0.00 |
| 50 | Heimerdinger | −0.02 | −1.00 | +0.62 | +0.76 | +0.14 | −1.00 | +0.00 |
| 51 | Soraka | −0.04 | −0.10 | +0.09 | +0.03 | −0.00 | −0.40 | +0.00 |
| 52 | Malzahar | −0.04 | +0.00 | −1.00 | +1.00 | +0.04 | +0.00 | +0.00 |
| 53 | Rakan | −0.10 | +1.00 | −1.00 | −1.00 | −0.02 | +1.00 | +0.00 |
| 54 | Jayce | −0.19 | +0.00 | +0.00 | −1.00 | +0.17 | – | +0.00 |
| 55 | Smolder | −0.21 | −1.00 | +0.00 | +0.00 | +0.27 | +0.00 | +0.00 |
| 56 | Nami | −0.22 | +0.96 | −0.85 | −0.86 | +0.10 | −0.92 | +0.00 |
| 57 | Aurora | −0.22 | −1.00 | −0.02 | −0.02 | +0.12 | +0.14 | +0.00 |
| 58 | Orianna | −0.26 | +1.00 | −1.00 | −1.00 | +0.28 | −1.00 | +0.00 |
| 59 | Graves | −0.33 | +1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 60 | Xin Zhao | −0.36 | −1.00 | −1.00 | +1.00 | −0.15 | – | +0.00 |
| 61 | Syndra | −0.40 | +0.53 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 62 | Poppy | −0.49 | −1.00 | +0.00 | −1.00 | +0.03 | – | +0.00 |
| 63 | Irelia | −0.52 | −1.00 | +0.00 | −1.00 | −0.10 | – | +0.00 |
| 64 | Gnar | −0.53 | −1.00 | −1.00 | −1.00 | +0.43 | +1.00 | +0.00 |
| 65 | Zyra | −0.54 | −1.00 | −1.00 | −0.03 | +0.13 | −0.54 | +0.00 |
| 66 | Lissandra | −0.58 | −1.00 | −1.00 | −1.00 | +0.13 | +0.98 | +0.00 |
| 67 | Lucian | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 68 | Kennen | −0.61 | −1.00 | −1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 69 | Master Yi | −0.62 | −1.00 | −1.00 | −1.00 | −0.12 | +1.00 | +0.00 |
| 70 | Karthus | −0.65 | −1.00 | −0.50 | −1.00 | +0.15 | −1.00 | +0.00 |
| 71 | Ziggs | −0.67 | −1.00 | −1.00 | −1.00 | +0.17 | +0.00 | +0.00 |
| 72 | Vel'Koz | −0.68 | −1.00 | −1.00 | −1.00 | +0.30 | −0.21 | +0.00 |
| 73 | Sion | −0.69 | −0.63 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 74 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.32 | – | +0.00 |
| 75 | Camille | −0.73 | −1.00 | −1.00 | −1.00 | −0.03 | – | +1.00 |
| 76 | Kayle | −0.73 | −1.00 | −1.00 | −1.00 | +0.45 | −1.00 | +0.00 |
| 77 | Ornn | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 78 | Fiora | −0.73 | −1.00 | −1.00 | −1.00 | −0.07 | – | +1.00 |
| 79 | Swain | −0.74 | −0.92 | −0.94 | −0.94 | +0.06 | −0.92 | +0.00 |
| 80 | Xayah | −0.74 | −1.00 | −1.00 | −1.00 | +0.40 | −1.00 | +0.00 |
| 81 | Nunu & Willump | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.00 |
| 82 | Gragas | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 83 | Maokai | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 84 | Galio | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 85 | Miss Fortune | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 86 | Janna | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 87 | Draven | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.00 |
| 88 | Alistar | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 89 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +1.00 |
| 90 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 91 | Mordekaiser | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 92 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 93 | Skarner | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 94 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 95 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 96 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 97 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 98 | Sett | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 99 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 100 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 101 | Vi | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 102 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 103 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 104 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 105 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 106 | Ekko | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 107 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 108 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 109 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 110 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 111 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 112 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 113 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 114 | Annie | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 115 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 116 | Jhin | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 117 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 118 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 119 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 120 | Thresh | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 121 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 122 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 123 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 124 | Yone | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 125 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 126 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 127 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 128 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 129 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 130 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 131 | Nocturne | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 132 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 133 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 134 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 135 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 136 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 137 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 138 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 139 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 140 | Wukong | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 141 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 142 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 143 | Rammus | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 144 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Warwick's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Warwick's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Warwick` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.74)

- **0.50** interrupt: Ferromancy: Crash Down's airborne interrupts Warwick's Infinite Duress (normal channel). Ferromancy: Crash Down must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell W Ferromancy: Crash Down → Warwick R Infinite Duress)
- **0.50** interrupt: Ferromancy: Mount Up's airborne interrupts Warwick's Infinite Duress (normal channel). Ferromancy: Mount Up must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell W Ferromancy: Mount Up → Warwick R Infinite Duress)
- **0.50** interrupt: Full Tilt's stun interrupts Warwick's Infinite Duress (normal channel). Full Tilt must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell E Full Tilt → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Rell's Magnet Storm (airborne, kinematics).

#### 2. Singed (net +1.72)

- **0.50** interrupt: Fling's airborne interrupts Warwick's Infinite Duress (normal channel). Fling must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Singed E Fling → Warwick R Infinite Duress)
- **0.49** grounding: Mega Adhesive grounds Warwick, who then can't cast Infinite Duress. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Warwick R Infinite Duress)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Warwick's healing from Infinite Duress by 40%. (Singed R Insanity Potion → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Singed's Fling (airborne, root).

#### 3. Rek'Sai (net +1.43)

- **0.93** untargetable: Void Rush makes Rek'Sai untargetable, dodging Warwick's Infinite Duress. Untargetable for 1.5 s, long enough to use ahead of Infinite Duress. (Rek'Sai R Void Rush → Warwick R Infinite Duress)
- **0.50** interrupt: Unburrow's airborne interrupts Warwick's Infinite Duress (normal channel). Unburrow must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rek'Sai W Unburrow → Warwick R Infinite Duress)
- **0.40** interrupt: Unburrow's airborne interrupts Warwick's Jaws of the Beast (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress's knockdown can stop Rek'Sai's Tunnel mid-dash.

#### 4. Nocturne (net +1.43)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Warwick's Primal Howl. Spell shield for 1.5 s, long enough to use ahead of Primal Howl. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick E Primal Howl)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Warwick's Jaws of the Beast. Spell shield for 1.5 s, long enough to use ahead of Jaws of the Beast. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick Q Jaws of the Beast)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Warwick's Infinite Duress (normal channel). Unspeakable Horror must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Nocturne E Unspeakable Horror → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Nocturne's Paranoia (nearsight).

#### 5. Alistar (net +1.42)

- **0.74** cleanse: Unbreakable Will cleanses Warwick's Infinite Duress (suppression) after it lands. 80 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Alistar R Unbreakable Will → Warwick R Infinite Duress)
- **0.50** interrupt: Pulverize's airborne interrupts Warwick's Infinite Duress (normal channel). Pulverize must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Alistar Q Pulverize → Warwick R Infinite Duress)
- **0.50** interrupt: Trample's stun interrupts Warwick's Infinite Duress (normal channel). Trample must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Alistar E Trample → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Alistar's Headbutt (airborne, stun).

#### 6. Vladimir (net +1.37)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Infinite Duress. Untargetable for 2 s, long enough to use ahead of Infinite Duress. (Vladimir W Sanguine Pool → Warwick R Infinite Duress)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Primal Howl. Untargetable for 2 s, long enough to use ahead of Primal Howl. (Vladimir W Sanguine Pool → Warwick E Primal Howl)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Jaws of the Beast. Untargetable for 2 s, long enough to use ahead of Jaws of the Beast. (Vladimir W Sanguine Pool → Warwick Q Jaws of the Beast)
- Watch out: Primal Howl's fear interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Zaahen (net +1.33)

- **0.56** cc immunity: Grim Deliverance makes Zaahen immune to Warwick's Infinite Duress (knockdown, suppression). Immune for ?; Infinite Duress lands within 0.1 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Warwick R Infinite Duress)
- **0.50** interrupt: Dreaded Return's airborne interrupts Warwick's Infinite Duress (normal channel). Dreaded Return must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Zaahen W Dreaded Return → Warwick R Infinite Duress)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Warwick's Infinite Duress (normal channel). The Darkin Glaive must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Zaahen Q The Darkin Glaive → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Zaahen's Dreaded Return (airborne, stun).

#### 8. Nilah (net +1.28)

- **1.00** attack dodge: Jubilant Veil dodges Warwick's Infinite Duress, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. {{{{{1<noinclude>|Ability data</noinclude>}}}|Infinite Duress|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Warwick
|skill        = R
|icon         = Infinite Duress.png
|description  = {{sbc|Active:}} '''Warwick''' {{tip|dash|leaps}} in the target direction with {{tip|cc-immune|crowd control immunity}}, stopping upon hitting an enemy champion. He then {{tip|knockdown|knocks them down}} and {{tip|channel|channels}} for up to {{fd|1.5}} seconds to {{tip|suppression|suppress}}, {{tip|true sight|reveal}}, and deal {{as|magic damage}} every {{fd|0.25}} seconds, {{tip|sight|revealing}} himself in the process. This damage {{tip|applies life steal|applies}} {{as|{{sti|life steal}}}}.
|leveling    = {{st|Total Magic Damage|{{ap|175 to 525}} {{as|(+ 167% '''bonus''' AD)}}}}
|description3 = '''Warwick''' {{tip|heals}} for 100% of all {{tt|post-mitigation damage|Damage calculated after resistances and modifiers.}} he deals to the target during ''Infinite Duress''.
|description4 = ''Infinite Duress'' both applies {{tip|on-hit}} effects and triggers {{tip|on-attack}} effects 3 times over its duration.
|description5 = ''{{ai|Primal Howl|Warwick}} can be cast during the dash.''
|cooldown     = {{ap|110 to 70}}
|cdstart      = on-cast
|cost         = 100
|costtype     = Mana
|range        = {{tt|{{as|250% movement speed}}|Measures the average of this percentage of movement speed in the last 2.5 seconds. Updates every 0.25 seconds.}}
|collision radius = {{tip|cr|icononly = true}} 205
|targeting        = Direction
|affects          = Enemies
|damagetype       = Magic
|cast time        = {{fd|0.1}}
|spelleffects     = Special
|spellshield      = special
|onhiteffects     = True
|parry            = true
|grounded         = True
|knockdown        = False
|silence          = true
|notes            = 
* ''Infinite Duress'' deals {{tip|basic damage}}, but also triggers spell effects by also being tagged as {{tip|spell damage}}.
* The minimum range of the ability is 275 units, based on the minimum movement speed that a champion can have (110) while still being able to move. The "base" range of this ability is {{fd|837.5}} because of his 335 base movement speed.
** Considering movement speed soft caps, with {{ai|Blood Hunt|Warwick}}, this range increases to {{ap|(335*1.35*0.8+83)*2.5|(335*1.425*0.8+83)*2.5|(335*1.5*0.5+230)*2.5|(335*1.575*0.5+230)*2.5|(335*1.65*0.5+230)*2.5}}, further increased to {{ap|(335*(1+0.35*2)*0.5+230)*2.5|(335*(1+0.425*2)*0.5+230)*2.5|(335*(1+0.5*2)*0.5+230)*2.5|(335*(1+0.575*2)*0.5+230)*2.5|(335*(1+0.65*2)*0.5+230)*2.5}} toward enemy champions {{as|below 25% health}}.
* ''Infinite Duress'' deals a total of 6 damage instances:
** The 1st, 3rd, and 5th ticks deals 2/9ths of the total damage as a single instance while applying both spell and on-hit effects, and triggering on-attack effects.
** The 2nd, 4th, and 6th ticks deal 1/9ths of the total damage as a single instance while applying spell effects but not on-hit effects.
* If '''Warwick''' does not collide with a champion, he will slide a {{tt|fixed distance|estimated 150 units}} past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including {{si|Flash}}, but being able to cast {{ai|Jaws of the Beast|Warwick}} and {{ai|Blood Hunt|Warwick}}, with the former also interrupting the slide.
** '''Warwick''' is able to cast {{ai|Primal Howl|Warwick}} at any time during the dash.
* Activating {{ii|Zhonya's Hourglass}} during the dash interrupts it.<!--wtf why-->
* Each hit counts as a separate {{tip|cast instance}} for effects such as {{ri|Electrocute}} and {{iis|Eclipse}} {{nie|Ever Rising Moon}}.
* '''Warwick''' gains the {{tip|cc-immune|cc-immunity}} at the start of the cast time.
* {{tip|Cleanse|Cleansing}} the {{tip|suppression}} does not interrupt the {{tip|channel}} and '''Warwick''' will continue to strike but not deal any damage.
** ''Infinite Duress'' is special cased to have its channel interrupted by {{ai|Fate's Call|Kalista}}.
* During the ''suppresion'', '''Warwick''' is {{tip|cc-immune}} to {{cai|E|Singed}}, however, he is not ''immune'' to {{cai|E|Urgot|Fling}}, {{cai|Ferromancy: Mount Up|Rell|Fling}} or other effects. {{bug|2|Singed was special cased on V10.11}}
* If the target is {{tip|cc-immune|crowd control immune}} or protected by {{tip|spell shield}} upon collision, '''Warwick''' will not start the {{tip|channel}}.
** {{tip|Spell shield}} will not prevent the effects of ''Infinite Duress'' if '''Warwick''' is already channeling.
* If the target is in a {{tip|zombie state}}, '''Warwick''' will stop the channel after ~{{fd|0.5}} seconds of hitting them.{{bug}}
* ''Infinite Duress'' covers '''Warwick's''' hitbox, meaning he will collide with enemy champions that are particularly close to him.
* {{iis|Experimental Hexplate}} {{nie|Overdrive}}, {{iis|Fiendhunter Bolts}} {{nie|Opening Barrage}}, and {{iis|Zeke's Convergence}} {{nie|Frostfire Tempest}} will activate at the end of the dash. If the dash collides with an enemy, the items are instead activated after {{fd|0.45}} seconds into the {{tip|channel}}, and the buff's duration is refreshed at the end of the channel.
* The following table refers for interactions while '''Warwick''' is in cast time:
{{ct|cast|spells=true,false,false,false,false}}
* The following table refers for interactions while '''Warwick''' is {{tip|channel|channeling}}:
{{ct|channel|move=false|cast=false|attack=false|items=false, true|spells=true, false, false, false, false}}
|yvideo       = eGvgl9ZbCBY
<!-- Blurb -->
|blurbicon    = Infinite Duress.png
|blurb        = {{sbc|Active:}} {{ci|Warwick}} {{tip|dash|leaps}} a huge distance toward the target direction, stopping on the first champion he collides with, {{tip|suppression|suppressing}} them while he {{tip|channel|channels}} for a brief time. He mauls them over the duration, dealing {{as|magic damage}} and {{as|{{sti|healing}}}} for 100% of the damage dealt. ''Infinite Duress'' applies {{tip|on-hit}} effects and {{sti|{{as|life steal}}}}, as well as triggers {{tip|on-attack}} effects, 3 times.
|blurb2       = The leap's range scales with '''Warwick's''' {{sti|{{as|movement speed}}}} and he gains {{tip|cc-immune|cc-immunity}} during it.
|blurb4       = {{sbc|{{tip|cc-immune|Cc-immunity|nolink=true}}}}: {{tip|Crowd control}} cannot be applied during this time.
}}. (Nilah W Jubilant Veil → Warwick R Infinite Duress)
- **0.46** interrupt: Apotheosis's airborne interrupts Warwick's Infinite Duress (normal channel). Apotheosis must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Nilah R Apotheosis → Warwick R Infinite Duress)
- **0.45** attack dodge: Jubilant Veil dodges Warwick's Jaws of the Beast, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. {{{{{1<noinclude>|Ability data</noinclude>}}}|Jaws of the Beast|{{{2|}}}|{{{3|}}}|{{{4|}}}|{{{5|}}}
|champion     = Warwick
|skill        = Q
|icon         = Jaws of the Beast.png
|description  = {{sbc|Active:}} '''Warwick''' {{tip|lunge|lunges}} at the target enemy over {{rutngt|0.2475}} and bites them, dealing {{as|magic damage}}, {{tip|heal|healing}} himself for a percentage of the {{tt|post-mitigation damage|Damage calculated after resistances and most modifiers.}} dealt, applying {{tip|on-hit}} effects and {{as|{{sti|life steal}}}}, and triggering {{tip|on-attack}} effects. The damage based on the target's health ratio is capped against {{tip|monster|monsters}}.
|leveling     =
{{st|Magic Damage|{{as|{{ap|6 to 10}}% of target's '''maximum''' health}} {{as|(+ 120% AD)}} {{as|(+ 100% AP)}}}}
{{st|Capped Monster Damage|{{ap|150 to 210}} {{as|(+ 120% AD)}} {{as|(+ 100% AP)}}}}
{{st|Healing Percentage|{{ap|25 to 75}}%}}
|description2 = While ''Jaws of the Beast'' is active, '''Warwick''' is {{tip|displacement immune}} and clamps his jaw on the target, following '''all''' of their movement. The ability can be held for additional effects.
|description3 = {{sbc|Hold:}} '''Warwick''' performs the bite, and then begins to {{tip|channel|charge}} for {{fd|0.5 seconds}}, extended if the target is under effects of a {{tip|dash}} or {{tip|airborne|displacement}}. During the charge, he {{tip|dash|leaps}} behind the target.
|cooldown     = {{ap|8 to 6}}
|cdstart      = post-effect
|cost         = {{ap|80 to 100}}
|cast time    = {{tt|none|See notes}}
|costtype     = Mana
|target range = {{tip|cr|icononly = true}} 365
|range        = {{tt|Global|Tracking/following range while jaw is clamped on the target}}
|targeting    = Unit
|affects      = Enemies, Self
|damagetype   = Magic
|spelleffects = Special
|spellshield  = True
|parry        = True
|grounded     = special
|knockdown    = Special
|silence      = true
|callforhelp  = True
|notes = 
'''Details'''
* ''Jaws of the Beast'' deals {{tip|basic damage}}, but also triggers spell effects by also being tagged as {{tip|spell damage}}.
* ''Jaws of the Beast'' has a {{rutngt|0.2475}} cast ''delay'', which is the amount of time required for the bite to occur from the start of the cast. This should not be confused with a [[cast time|cast ''time'']].
** If the cast started beforehand, both the damage and the heal occur even after '''Warwick's''' {{tip|death}}, or during {{tip|resurrection}}.
* If the target dies prior to '''Warwick''' reaching them, ''Jaws of the Beast'' refunds its cooldown when tapped. The ability can be still held, however, '''Warwick''' is no longer eligible for the refund in this case. <br> {{Note|1}} The refund can occasionally fail. {{bug}}
** The mana cost is not refunded in either case.
* The healing is calculated only from ''Jaws of the Beast's'' damage, while additional effects, such as on-hits, are not.
* While the bite always occurs after the same delay, the time spent lunging does not, which depends on the range ''Jaws of the Beast'' was cast away from the target, up to {{fd|0.5}} seconds when cast at maximum range.
** This does not affect the {{tip|lockout}} timer, which is the same as the bite's delay.
* The lunge always places '''Warwick''' to his attack range to the center of his target, while the dash will place him up to the edge of his attack range from the target's edge.
* It has been special cased so '''Warwick''' never follows an enemy that uses a {{tip|blink}} with a destination that is their [[spawn]] platform (such as {{si|Recall}}), or {{ci|Sion}} when he respawns after his {{ai|Glory in Death|Sion}} ends. This only applies to the charge when the ability is held.<br>{{Note|1}} This may occasionally fail. The rule does not apply to the tapped cast; '''Warwick''' will still be able follow an enemy into their spawn if ''Jaws of the Beast'' was not held with its cast.{{bug}}
* ''Jaws of the Beast's'' channel cannot be initiated while {{tip|ground|grounded}} or {{tip|root|rooted}}. '''Warwick''' can only use the normal cast.
** The channel will '''not''' be interrupted by either of the two effects, despite the lock-on being a [[Channel#Movement Channels|movement channel]].
'''Interactions & Other'''
* In order to hit the cap, the target monster needs to have at least {{as|{{ap|(150 to 210)/((6 to 10)/100)|round=ceil}} health}}.
* ''Jaws of the Beast'' is the only ability in the game that combines {{tip|channel|channeling}} with {{tip|displacement immune|displacement immunity}}. Every {{tip|interrupt|interrupting}} crowd control effect that is not resisted by the displacement immunity will prematurely stop the {{tip|dash}}.
** The bite can still occur if cast before the crowd control application, but '''Warwick''' cannot start channeling.
** Abilities that apply both {{tip|stun}} and {{tip|airborne}} at the same time will cause '''Warwick''' to ignore the displacement, but prematurely stop the channel and the dash.
*** This occurs unless the ability's {{tip|stun}} portion is able to be resisted by {{tip|displacement immunity}}, in which case '''Warwick''' will ignore both the displacement and the stun and be able to continue the channel and dash.
* '''Warwick''' will follow enemies that move via {{tip|attach|attachment}} effects but the lock-on will '''not''' be extended.
* While ''Jaws of the Beast'' does not use Quick Casting by default, click-and-hold is comparable to the input required to use {{ai|Bone Skewer|Pyke}} or {{ai|Comet Spear|Pantheon}}. It does not accept two-click input (e.g. First Cast and Recast) that abilities like {{ai|Piercing Arrow|Varus}} or {{ai|Decimating Smash|Sion}} use in Standard Casting.
* '''Warwick''' will attempt to basic attack the target after a short delay.
* The following table refers for interactions while '''Warwick''' is {{tip|channel|channeling}}:
** {{si|Flash}}, {{si|Teleport}}, {{si|Hexflash}}, and {{si|Recall}} are disabled during the first {{fd|0.4}} seconds of the channel.
{{ct|charge|attack = false|cast = {{ai|Primal Howl|Warwick}} is usable. {{ai|Blood Hunt|Warwick}} and {{ai|Infinite Duress|Warwick}} are disabled.|move=false|spells=true,interrupts,interrupts,interrupts,interrupts|items=interrupts,true,interrupts,false,interrupts,melee|consume=true}}
'''Known Issues'''
* ''Jaws of the Beast'' will also refund its {{sti|cooldown}} if it kills the target after being held for exactly its bite delay. {{bug|1|Started in patch 10.1}}
* The ability may briefly cast on a dead target, with the ability going on cooldown.{{bug|1|Started in patch 10.1}}
|yvideo       = gihtOP7Pvcw
<!-- Blurb -->
|blurbicon    = Jaws of the Beast.png
|blurb        = {{sbc|Active:}} {{ci|Warwick}} lunges at his target and bites them, dealing {{as|magic damage}} that is increased based on the {{as|target's '''maximum''' health}} and {{as|{{sti|healing}}}} himself for a portion of the damage dealt. When held, he also {{tip|channel|charges}} briefly, {{tip|dash|leaping}} behind his target. 
|blurb2       = While ''Jaws of the Beast'' is in effect, '''Warwick''' gains {{tip|displacement immunity}} and also follows '''all''' of his target's movements.
|blurb4       = ''Jaws of the Beast'' applies {{tip|on-hit}} effects and {{as|{{sti|life steal}}}}.
}}. (Nilah W Jubilant Veil → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Nilah's Apotheosis (airborne, slow).

#### 9. Sion (net +1.25)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Warwick's Infinite Duress (knockdown, suppression). Immune for 8 s, long enough to use ahead of Infinite Duress. (Sion R Unstoppable Onslaught → Warwick R Infinite Duress)
- **0.50** interrupt: Decimating Smash's airborne interrupts Warwick's Infinite Duress (normal channel). Decimating Smash must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Sion Q Decimating Smash → Warwick R Infinite Duress)
- **0.50** interrupt: Unstoppable Onslaught's airborne interrupts Warwick's Infinite Duress (normal channel). Unstoppable Onslaught must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Sion R Unstoppable Onslaught → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Sion's Unstoppable Onslaught (airborne, slow, stun).

#### 10. Milio (net +1.25)

- **0.58** cleanse: Breath of Life cleanses Warwick's Infinite Duress (suppression) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Warwick R Infinite Duress)
- **0.50** interrupt: Ultra Mega Fire Kick's airborne interrupts Warwick's Infinite Duress (normal channel). Ultra Mega Fire Kick must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Milio Q Ultra Mega Fire Kick → Warwick R Infinite Duress)
- **0.30** interrupt: Ultra Mega Fire Kick's airborne interrupts Warwick's Jaws of the Beast (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.74 | 3.16 | 1.42 |  |
| 2 | Singed | +1.72 | 2.19 | 0.47 | grounding (Mega Adhesive) |
| 3 | Rek'Sai | +1.43 | 1.90 | 0.47 |  |
| 4 | Nocturne | +1.43 | 1.77 | 0.34 |  |
| 5 | Alistar | +1.42 | 2.17 | 0.75 |  |
| 6 | Vladimir | +1.37 | 1.53 | 0.16 |  |
| 7 | Zaahen | +1.33 | 2.00 | 0.67 |  |
| 8 | Nilah | +1.28 | 1.94 | 0.66 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 9 | Sion | +1.25 | 2.06 | 0.81 |  |
| 10 | Milio | +1.25 | 1.66 | 0.41 |  |
| 11 | Blitzcrank | +1.24 | 1.94 | 0.70 |  |
| 12 | Udyr | +1.24 | 1.53 | 0.29 |  |
| 13 | Jax | +1.22 | 1.51 | 0.29 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 14 | Sivir | +1.22 | 1.22 | 0.00 |  |
| 15 | Xayah | +1.14 | 1.34 | 0.20 |  |
| 16 | Olaf | +1.05 | 1.10 | 0.05 |  |
| 17 | Heimerdinger | +0.97 | 1.49 | 0.52 |  |
| 18 | Malzahar | +0.91 | 2.07 | 1.16 |  |
| 19 | Cho'Gath | +0.89 | 1.36 | 0.47 |  |
| 20 | Evelynn | +0.89 | 1.36 | 0.47 |  |
| 21 | Gangplank | +0.88 | 1.05 | 0.17 |  |
| 22 | Lulu | +0.87 | 1.52 | 0.65 |  |
| 23 | Shaco | +0.87 | 1.35 | 0.48 |  |
| 24 | Viktor | +0.84 | 1.41 | 0.57 |  |
| 25 | Kayle | +0.83 | 0.88 | 0.05 |  |
| 26 | Shen | +0.82 | 2.05 | 1.23 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 27 | Garen | +0.81 | 0.89 | 0.08 |  |
| 28 | Anivia | +0.78 | 1.47 | 0.69 |  |
| 29 | Morgana | +0.70 | 1.42 | 0.72 |  |
| 30 | Gnar | +0.68 | 1.51 | 0.83 |  |
| 31 | Fiora | +0.67 | 1.01 | 0.34 |  |
| 32 | Thresh | +0.66 | 1.44 | 0.78 |  |
| 33 | Master Yi | +0.63 | 0.95 | 0.32 |  |
| 34 | Rengar | +0.62 | 1.08 | 0.46 |  |
| 35 | Zed | +0.61 | 0.65 | 0.04 |  |
| 36 | Kennen | +0.57 | 0.84 | 0.27 |  |
| 37 | Riven | +0.56 | 1.32 | 0.76 |  |
| 38 | Gwen | +0.56 | 0.83 | 0.27 |  |
| 39 | Pyke | +0.54 | 1.32 | 0.78 |  |
| 40 | Zilean | +0.54 | 0.89 | 0.35 |  |
| 41 | Aurora | +0.54 | 0.84 | 0.30 |  |
| 42 | Kassadin | +0.54 | 0.69 | 0.15 |  |
| 43 | Annie | +0.53 | 0.80 | 0.27 |  |
| 44 | Bard | +0.51 | 1.54 | 1.03 |  |
| 45 | Vex | +0.51 | 0.87 | 0.36 |  |
| 46 | Teemo | +0.51 | 0.69 | 0.18 | blind (Blinding Dart) |
| 47 | Lissandra | +0.48 | 1.45 | 0.97 |  |
| 48 | Draven | +0.46 | 0.88 | 0.42 |  |
| 49 | Elise | +0.46 | 0.87 | 0.41 |  |
| 50 | Brand | +0.46 | 0.85 | 0.39 |  |
| 51 | Sejuani | +0.45 | 1.86 | 1.41 |  |
| 52 | Fiddlesticks | +0.45 | 1.47 | 1.02 |  |
| 53 | Mordekaiser | +0.44 | 0.98 | 0.54 |  |
| 54 | Fizz | +0.43 | 1.46 | 1.03 |  |
| 55 | Taric | +0.43 | 0.64 | 0.21 |  |
| 56 | Yasuo | +0.42 | 1.31 | 0.89 |  |
| 57 | Zoe | +0.42 | 0.85 | 0.43 |  |
| 58 | K'Sante | +0.41 | 1.93 | 1.52 |  |
| 59 | Aurelion Sol | +0.41 | 1.30 | 0.89 |  |
| 60 | Maokai | +0.40 | 1.60 | 1.20 |  |
| 61 | Camille | +0.40 | 1.48 | 1.08 |  |
| 62 | Vayne | +0.40 | 0.93 | 0.53 |  |
| 63 | Soraka | +0.40 | 0.81 | 0.41 |  |
| 64 | Cassiopeia | +0.39 | 1.27 | 0.88 | grounding (Miasma) |
| 65 | Veigar | +0.39 | 0.79 | 0.40 |  |
| 66 | Sett | +0.38 | 1.22 | 0.84 |  |
| 67 | Renekton | +0.37 | 0.67 | 0.30 |  |
| 68 | Yuumi | +0.36 | 1.16 | 0.80 |  |
| 69 | Jayce | +0.36 | 0.85 | 0.49 |  |
| 70 | Swain | +0.33 | 0.79 | 0.46 |  |
| 71 | Seraphine | +0.32 | 1.30 | 0.98 |  |
| 72 | Syndra | +0.32 | 0.78 | 0.46 |  |
| 73 | Nasus | +0.30 | 0.36 | 0.06 |  |
| 74 | Renata Glasc | +0.29 | 1.36 | 1.07 |  |
| 75 | Xin Zhao | +0.28 | 1.42 | 1.14 |  |
| 76 | Quinn | +0.28 | 0.93 | 0.65 |  |
| 77 | Volibear | +0.27 | 0.71 | 0.44 |  |
| 78 | Kalista | +0.26 | 1.09 | 0.83 |  |
| 79 | Yorick | +0.26 | 0.64 | 0.38 |  |
| 80 | Leona | +0.25 | 1.29 | 1.04 |  |
| 81 | Ahri | +0.23 | 0.79 | 0.56 |  |
| 82 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 83 | Irelia | +0.21 | 0.68 | 0.47 |  |
| 84 | Kayn | +0.20 | 1.38 | 1.18 |  |
| 85 | Twisted Fate | +0.19 | 0.99 | 0.80 |  |
| 86 | Rammus | +0.18 | 1.70 | 1.52 |  |
| 87 | Nami | +0.17 | 1.32 | 1.15 |  |
| 88 | Trundle | +0.17 | 0.63 | 0.46 |  |
| 89 | Darius | +0.16 | 0.63 | 0.47 |  |
| 90 | Urgot | +0.15 | 1.32 | 1.17 |  |
| 91 | Shyvana | +0.15 | 0.67 | 0.52 |  |
| 92 | Twitch | +0.15 | 0.29 | 0.14 |  |
| 93 | Hwei | +0.14 | 0.80 | 0.66 |  |
| 94 | Bel'Veth | +0.14 | 0.67 | 0.53 |  |
| 95 | Kindred | +0.14 | 0.31 | 0.17 |  |
| 96 | Tahm Kench | +0.13 | 1.90 | 1.77 |  |
| 97 | Katarina | +0.12 | 0.62 | 0.50 |  |
| 98 | Kog'Maw | +0.12 | 0.18 | 0.06 |  |
| 99 | Ziggs | +0.10 | 0.82 | 0.72 |  |
| 100 | Zeri | +0.09 | 0.29 | 0.20 |  |
| 101 | Braum | +0.08 | 1.15 | 1.07 |  |
| 102 | Ashe | +0.08 | 0.83 | 0.75 |  |
| 103 | Zac | +0.07 | 1.85 | 1.78 |  |
| 104 | Corki | +0.07 | 0.22 | 0.15 |  |
| 105 | Yunara | +0.06 | 0.24 | 0.18 |  |
| 106 | Nidalee | +0.06 | 0.20 | 0.14 |  |
| 107 | Aatrox | +0.05 | 0.70 | 0.65 |  |
| 108 | Smolder | +0.05 | 0.22 | 0.17 |  |
| 109 | Kled | +0.04 | 1.51 | 1.47 |  |
| 110 | Xerath | 0.00 | 0.83 | 0.83 |  |
| 111 | Amumu | -0.02 | 1.14 | 1.16 |  |
| 112 | Vel'Koz | -0.03 | 0.83 | 0.86 |  |
| 113 | Sona | -0.03 | 0.77 | 0.80 |  |
| 114 | Janna | -0.04 | 1.37 | 1.41 |  |
| 115 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 116 | Illaoi | -0.07 | 0.06 | 0.13 |  |
| 117 | Rakan | -0.08 | 1.25 | 1.33 |  |
| 118 | Varus | -0.08 | 0.80 | 0.88 |  |
| 119 | Jinx | -0.08 | 0.19 | 0.27 |  |
| 120 | Sylas | -0.13 | 0.65 | 0.78 |  |
| 121 | Galio | -0.14 | 1.75 | 1.89 |  |
| 122 | Kai'Sa | -0.15 | 0.26 | 0.41 |  |
| 123 | Mel | -0.15 | 0.18 | 0.33 |  |
| 124 | Orianna | -0.17 | 0.73 | 0.90 |  |
| 125 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 126 | Lux | -0.18 | 0.19 | 0.37 |  |
| 127 | LeBlanc | -0.18 | 0.15 | 0.33 |  |
| 128 | Taliyah | -0.19 | 1.94 | 2.13 |  |
| 129 | Senna | -0.20 | 0.22 | 0.42 |  |
| 130 | Yone | -0.21 | 1.31 | 1.52 |  |
| 131 | Samira | -0.21 | 0.20 | 0.41 |  |
| 132 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 133 | Tristana | -0.24 | 0.74 | 0.98 |  |
| 134 | Graves | -0.25 | 0.16 | 0.41 |  |
| 135 | Gragas | -0.26 | 1.23 | 1.49 |  |
| 136 | Locke | -0.27 | 0.00 | 0.27 |  |
| 137 | Skarner | -0.29 | 0.61 | 0.90 |  |
| 138 | Wukong | -0.30 | 0.52 | 0.82 |  |
| 139 | Kha'Zix | -0.31 | 0.00 | 0.31 |  |
| 140 | Viego | -0.32 | 1.30 | 1.62 |  |
| 141 | Ornn | -0.32 | 1.24 | 1.56 |  |
| 142 | Karma | -0.32 | 0.15 | 0.47 |  |
| 143 | Talon | -0.32 | 0.00 | 0.32 |  |
| 144 | Ekko | -0.33 | 0.00 | 0.33 |  |
| 145 | Azir | -0.36 | 0.70 | 1.06 |  |
| 146 | Lee Sin | -0.36 | 0.59 | 0.95 |  |
| 147 | Miss Fortune | -0.37 | 0.22 | 0.59 |  |
| 148 | Pantheon | -0.39 | 0.74 | 1.13 |  |
| 149 | Lucian | -0.40 | 0.24 | 0.64 |  |
| 150 | Neeko | -0.41 | 0.67 | 1.08 |  |
| 151 | Lillia | -0.42 | 0.55 | 0.97 |  |
| 152 | Diana | -0.44 | 0.55 | 0.99 |  |
| 153 | Akshan | -0.45 | 0.22 | 0.67 |  |
| 154 | Zyra | -0.46 | 0.68 | 1.14 |  |
| 155 | Karthus | -0.46 | 0.13 | 0.59 |  |
| 156 | Malphite | -0.48 | 0.75 | 1.23 |  |
| 157 | Nunu & Willump | -0.51 | 0.68 | 1.19 |  |
| 158 | Akali | -0.54 | 0.00 | 0.54 |  |
| 159 | Ivern | -0.55 | 0.13 | 0.68 |  |
| 160 | Caitlyn | -0.56 | 0.24 | 0.80 |  |
| 161 | Ambessa | -0.59 | 0.50 | 1.09 |  |
| 162 | Vi | -0.60 | 1.23 | 1.83 |  |
| 163 | Jhin | -0.63 | 0.18 | 0.81 |  |
| 164 | Aphelios | -0.65 | 0.33 | 0.98 |  |
| 165 | Nautilus | -0.66 | 0.55 | 1.21 |  |
| 166 | Qiyana | -0.66 | 0.47 | 1.13 |  |
| 167 | Ryze | -0.71 | 0.16 | 0.87 |  |
| 168 | Hecarim | -0.73 | 0.51 | 1.24 |  |
| 169 | Briar | -0.77 | 0.55 | 1.32 |  |
| 170 | Poppy | -0.97 | 0.50 | 1.47 |  |
| 171 | Jarvan IV | -0.98 | 0.54 | 1.52 |  |
| 172 | Naafiri | -1.21 | 0.00 | 1.21 |  |
