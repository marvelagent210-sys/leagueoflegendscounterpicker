# Counters to Pantheon (patch 26.20)

## Simulated duels

The duel simulator played each of the 144 other champions with a simulator kit against Pantheon: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Pantheon wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Pantheon --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.86 | +1.00 | +1.00 | +1.00 | +0.42 | +1.00 | +0.00 |
| 2 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +1.00 |
| 3 | Kalista | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 4 | Ambessa | +0.83 | +1.00 | +1.00 | +1.00 | +0.32 | – | +0.00 |
| 5 | Cassiopeia | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Swain | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 7 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.27 | – | +0.00 |
| 8 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 9 | Kog'Maw | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 10 | Udyr | +0.81 | +1.00 | +1.00 | +1.00 | −0.12 | – | +1.00 |
| 11 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 13 | Lulu | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 14 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.13 | – | +1.00 |
| 15 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 16 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 17 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 18 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 19 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 20 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 21 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 22 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 23 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 24 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 25 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 26 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 27 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 28 | Karma | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 29 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 30 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 31 | Brand | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +0.93 | +0.00 |
| 32 | Master Yi | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 33 | Tahm Kench | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 34 | Neeko | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 35 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 36 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 37 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 38 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 39 | Gangplank | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 40 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 41 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 42 | Shen | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 43 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 44 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 45 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 46 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 47 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 48 | Jax | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 49 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 50 | Mordekaiser | +0.76 | +1.00 | +1.00 | +0.98 | −0.06 | – | +0.00 |
| 51 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 52 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 53 | Vi | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 54 | Graves | +0.76 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −1.00 |
| 55 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 56 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 57 | Gnar | +0.74 | +1.00 | +1.00 | +0.86 | +0.08 | +0.57 | +0.00 |
| 58 | Quinn | +0.71 | +1.00 | +1.00 | +1.00 | +0.07 | +0.00 | +0.00 |
| 59 | Volibear | +0.70 | +0.94 | +0.82 | +1.00 | −0.09 | – | +0.00 |
| 60 | Morgana | +0.69 | +1.00 | +1.00 | +1.00 | −0.06 | +0.00 | +0.00 |
| 61 | Samira | +0.60 | +1.00 | +1.00 | +1.00 | +0.00 | −1.00 | +0.00 |
| 62 | Kai'Sa | +0.60 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 63 | Corki | +0.56 | +0.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 64 | Camille | +0.46 | +0.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 65 | Sion | +0.43 | +1.00 | +0.62 | +0.00 | −0.11 | – | +0.00 |
| 66 | Xayah | +0.43 | +1.00 | +1.00 | −1.00 | +0.21 | +1.00 | +0.00 |
| 67 | Jarvan IV | +0.36 | +1.00 | +1.00 | −1.00 | +0.18 | – | +0.00 |
| 68 | Hecarim | +0.35 | +1.00 | +1.00 | −1.00 | +0.12 | – | +0.00 |
| 69 | Malzahar | +0.35 | +1.00 | +0.00 | +1.00 | −0.00 | −1.00 | +0.00 |
| 70 | Rammus | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 71 | Sejuani | +0.33 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.00 |
| 72 | Singed | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 73 | Rakan | +0.31 | +1.00 | −1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 74 | Jinx | +0.31 | +0.57 | +0.79 | +0.27 | +0.09 | −1.00 | +0.00 |
| 75 | Gwen | +0.30 | +0.95 | +0.93 | −1.00 | −0.03 | – | +0.00 |
| 76 | Vel'Koz | +0.29 | −1.00 | +0.95 | +0.96 | +0.13 | +0.95 | +0.00 |
| 77 | Jayce | +0.24 | +1.00 | −1.00 | +1.00 | +0.09 | – | +0.00 |
| 78 | Anivia | +0.23 | +0.31 | +0.37 | +0.21 | −0.04 | +0.27 | +0.00 |
| 79 | Leona | +0.22 | +0.63 | +1.00 | −1.00 | −0.08 | – | +0.00 |
| 80 | Akshan | +0.21 | +1.00 | +1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 81 | Rumble | +0.21 | +1.00 | +0.54 | −1.00 | +0.01 | – | +0.00 |
| 82 | Ezreal | +0.20 | +1.00 | +0.99 | −1.00 | +0.03 | −0.99 | +0.00 |
| 83 | Lucian | +0.19 | +1.00 | +1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 84 | Gragas | +0.17 | +0.00 | +0.29 | +1.00 | −0.03 | −1.00 | +0.00 |
| 85 | Draven | +0.16 | +0.79 | +1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 86 | Orianna | +0.11 | −1.00 | +1.00 | +1.00 | +0.09 | −1.00 | +0.00 |
| 87 | Irelia | +0.09 | +1.00 | −1.00 | +0.34 | +0.10 | – | +0.00 |
| 88 | Senna | +0.08 | +0.74 | +0.83 | −1.00 | −0.10 | −1.00 | +0.00 |
| 89 | Heimerdinger | +0.07 | +0.77 | −0.05 | −1.00 | +0.10 | +0.78 | +0.00 |
| 90 | Maokai | +0.01 | −1.00 | +1.00 | +0.00 | +0.07 | – | +0.00 |
| 91 | Lux | −0.01 | +0.66 | +0.53 | −1.00 | −0.01 | −1.00 | +0.00 |
| 92 | Rell | −0.08 | −1.00 | +1.00 | −1.00 | +0.13 | +1.00 | +0.00 |
| 93 | Xin Zhao | −0.13 | +1.00 | −0.58 | −1.00 | −0.15 | – | +0.00 |
| 94 | Aurora | −0.19 | −1.00 | −1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 95 | Amumu | −0.26 | +0.86 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 96 | Vex | −0.26 | +0.34 | −1.00 | +0.00 | +0.01 | −1.00 | +0.00 |
| 97 | Sona | −0.29 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 98 | Miss Fortune | −0.30 | +1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 99 | Sett | −0.33 | −1.00 | −1.00 | +1.00 | +0.03 | – | +0.00 |
| 100 | Varus | −0.40 | −1.00 | −1.00 | +0.00 | +0.03 | +1.00 | +0.00 |
| 101 | Viktor | −0.40 | −1.00 | −1.00 | +1.00 | −0.00 | −1.00 | +0.00 |
| 102 | Urgot | −0.40 | −1.00 | −1.00 | +0.91 | +0.11 | −1.00 | +0.00 |
| 103 | Akali | −0.47 | −1.00 | +0.32 | −1.00 | −0.34 | – | +0.00 |
| 104 | Soraka | −0.48 | −0.07 | −1.00 | −1.00 | +0.01 | −0.14 | +0.00 |
| 105 | Smolder | −0.54 | −1.00 | +0.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 106 | Lissandra | −0.57 | −1.00 | −1.00 | −1.00 | +0.19 | +1.00 | +0.00 |
| 107 | Syndra | −0.60 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 108 | Rengar | −0.71 | −1.00 | −1.00 | −1.00 | +0.40 | – | +0.00 |
| 109 | Caitlyn | −0.73 | −1.00 | −1.00 | −1.00 | +0.06 | −0.38 | +0.00 |
| 110 | Hwei | −0.75 | −0.93 | −0.87 | −1.00 | +0.00 | −1.00 | +0.00 |
| 111 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 112 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 113 | Zoe | −0.76 | −1.00 | −0.85 | −1.00 | +0.01 | −1.00 | +0.00 |
| 114 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 115 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 116 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 117 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 118 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 119 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 120 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 121 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 122 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 123 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 124 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 125 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 126 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 127 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 128 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 129 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 130 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 131 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 132 | Jhin | −0.80 | −0.94 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 133 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 134 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 135 | Nami | −0.80 | −0.99 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 136 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 137 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 138 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 139 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 140 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 141 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 142 | Ahri | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 143 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 144 | Thresh | −0.89 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | −0.50 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Pantheon's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Pantheon's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Pantheon` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.75)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Pantheon's Grand Starfall (movement channel). Ferromancy: Crash Down must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Rell W Ferromancy: Crash Down → Pantheon R Grand Starfall)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Pantheon's Grand Starfall (movement channel). Ferromancy: Mount Up must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Rell W Ferromancy: Mount Up → Pantheon R Grand Starfall)
- **0.45** interrupt: Full Tilt's stun interrupts Pantheon's Grand Starfall (movement channel). Full Tilt must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Rell E Full Tilt → Pantheon R Grand Starfall)
- Watch out: Aegis Assault makes Pantheon invulnerable to Rell's Magnet Storm (its crowd control still applies).

#### 2. Sivir (net +1.45)

- **0.90** spell shield: Spell Shield's spell shield blocks Pantheon's Grand Starfall. Spell shield for 1.5 s, long enough to use ahead of Grand Starfall. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pantheon R Grand Starfall)
- **0.56** spell shield: Spell Shield's spell shield blocks Pantheon's Shield Vault. Spell shield for 1.5 s, long enough to use ahead of Shield Vault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Pantheon W Shield Vault)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Pantheon's (500 vs 175 attack range). Pantheon closes the gap with Grand Starfall, Shield Vault. (Sivir basic attacks → Pantheon basic attacks)

#### 3. Taliyah (net +1.33)

- **0.45** interrupt: Seismic Shove's airborne interrupts Pantheon's Grand Starfall (movement channel). Seismic Shove must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Taliyah W Seismic Shove → Pantheon R Grand Starfall)
- **0.45** interrupt: Unraveled Earth's stun interrupts Pantheon's Grand Starfall (movement channel). Unraveled Earth must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Taliyah E Unraveled Earth → Pantheon R Grand Starfall)
- **0.45** interrupt: Weaver's Wall's airborne interrupts Pantheon's Grand Starfall (movement channel). Weaver's Wall must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Taliyah R Weaver's Wall → Pantheon R Grand Starfall)
- Watch out: Aegis Assault makes Pantheon invulnerable to Taliyah's Unraveled Earth (its crowd control still applies).

#### 4. Bard (net +1.29)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Pantheon's Grand Starfall. Untargetable for 2.5 s, long enough to use ahead of Grand Starfall. (Bard R Tempered Fate → Pantheon R Grand Starfall)
- **0.45** interrupt: Tempered Fate's stasis interrupts Pantheon's Grand Starfall (movement channel). Tempered Fate must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Bard R Tempered Fate → Pantheon R Grand Starfall)
- **0.37** untargetable: Tempered Fate makes Bard untargetable, dodging Pantheon's Shield Vault. Untargetable for 2.5 s, long enough to use ahead of Shield Vault. (Bard R Tempered Fate → Pantheon W Shield Vault)
- Watch out: Aegis Assault makes Pantheon invulnerable to Bard's Cosmic Binding (its crowd control still applies).

#### 5. Lulu (net +1.17)

- **0.45** interrupt: Whimsy's polymorph interrupts Pantheon's Grand Starfall (movement channel). Whimsy must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Lulu W Whimsy → Pantheon R Grand Starfall)
- **0.45** interrupt: Wild Growth's airborne interrupts Pantheon's Grand Starfall (movement channel). Wild Growth must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Lulu R Wild Growth → Pantheon R Grand Starfall)
- **0.30** disarm: Whimsy disarms Pantheon for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Pantheon basic attacks)
- Watch out: Aegis Assault makes Pantheon invulnerable to Lulu's Help, Pix! (its crowd control still applies).

#### 6. Kled (net +1.16)

- **0.45** interrupt: Bear Trap on a Rope's airborne interrupts Pantheon's Grand Starfall (movement channel). Bear Trap on a Rope must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Kled Q Bear Trap on a Rope → Pantheon R Grand Starfall)
- **0.45** interrupt: Chaaaaaaaarge!!!'s airborne interrupts Pantheon's Grand Starfall (movement channel). Chaaaaaaaarge!!! must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Kled R Chaaaaaaaarge!!! → Pantheon R Grand Starfall)
- **0.22** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Pantheon's Shield Vault (stun). Immune for ?; Shield Vault lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Kled R Chaaaaaaaarge!!! → Pantheon W Shield Vault)

#### 7. Nocturne (net +1.15)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Pantheon's Grand Starfall. Spell shield for 1.5 s, long enough to use ahead of Grand Starfall. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pantheon R Grand Starfall)
- **0.68** spell shield: Shroud of Darkness's spell shield blocks Pantheon's Shield Vault. Spell shield for 1.5 s, long enough to use ahead of Shield Vault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Pantheon W Shield Vault)
- **0.45** interrupt: Unspeakable Horror's fear interrupts Pantheon's Grand Starfall (movement channel). Unspeakable Horror must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Nocturne E Unspeakable Horror → Pantheon R Grand Starfall)
- Watch out: Aegis Assault makes Pantheon invulnerable to Nocturne's Paranoia (its crowd control still applies).

#### 8. Tahm Kench (net +1.09)

- **0.45** interrupt: Devour's suppression interrupts Pantheon's Grand Starfall (movement channel). Devour must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Tahm Kench R Devour → Pantheon R Grand Starfall)
- **0.45** interrupt: Regurgitate's airborne interrupts Pantheon's Grand Starfall (movement channel). Regurgitate must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Tahm Kench R Regurgitate → Pantheon R Grand Starfall)
- **0.45** interrupt: Tongue Lash's stun interrupts Pantheon's Grand Starfall (movement channel). Tongue Lash must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Tahm Kench Q Tongue Lash → Pantheon R Grand Starfall)
- Watch out: Aegis Assault makes Pantheon invulnerable to Tahm Kench's Regurgitate (its crowd control still applies).

#### 9. Malzahar (net +1.06)

- **0.45** interrupt: Call of the Void's silence interrupts Pantheon's Grand Starfall (movement channel). Call of the Void must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Malzahar Q Call of the Void → Pantheon R Grand Starfall)
- **0.45** interrupt: Nether Grasp's suppression interrupts Pantheon's Grand Starfall (movement channel). Nether Grasp must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Malzahar R Nether Grasp → Pantheon R Grand Starfall)
- **0.40** cc immunity: Void Shift makes Malzahar immune to Pantheon's Shield Vault (stun). Void Shift is up on its own and ends on the first damage or crowd control it takes. (Malzahar I Void Shift → Pantheon W Shield Vault)
- Watch out: Aegis Assault makes Pantheon invulnerable to Malzahar's Nether Grasp (its crowd control still applies).

#### 10. Zac (net +1.03)

- **0.45** interrupt: Elastic Slingshot's airborne interrupts Pantheon's Grand Starfall (movement channel). Elastic Slingshot must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Zac E Elastic Slingshot → Pantheon R Grand Starfall)
- **0.45** interrupt: Let's Bounce!'s airborne interrupts Pantheon's Grand Starfall (movement channel). Let's Bounce! must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Zac R Let's Bounce! → Pantheon R Grand Starfall)
- **0.45** interrupt: Stretching Strikes's airborne interrupts Pantheon's Grand Starfall (movement channel). Stretching Strikes must land during the channel. Grand Starfall's first channel can be interrupted by cast-inhibiting crowd control, but its second channel cannot because Pantheon gains crowd control immunity during it. During the second channel, Pantheon gains a minimum health threshold of 1.
  - Pantheon will instantly die upon reappearing if he reaches this threshold. (Zac Q Stretching Strikes → Pantheon R Grand Starfall)
- Watch out: Aegis Assault makes Pantheon invulnerable to Zac's Let's Bounce! (its crowd control still applies).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.75 | 2.48 | 0.73 |  |
| 2 | Sivir | +1.45 | 1.45 | 0.00 |  |
| 3 | Taliyah | +1.33 | 1.63 | 0.30 |  |
| 4 | Bard | +1.29 | 1.43 | 0.14 |  |
| 5 | Lulu | +1.17 | 1.32 | 0.15 |  |
| 6 | Kled | +1.16 | 1.16 | 0.00 |  |
| 7 | Nocturne | +1.15 | 1.74 | 0.59 |  |
| 8 | Tahm Kench | +1.09 | 1.48 | 0.39 |  |
| 9 | Malzahar | +1.06 | 1.64 | 0.58 |  |
| 10 | Zac | +1.03 | 1.66 | 0.63 | dash stop (Stretching Strikes) |
| 11 | Shen | +0.98 | 1.42 | 0.44 | attack block (Spirit's Refuge) |
| 12 | Blitzcrank | +0.96 | 1.48 | 0.52 |  |
| 13 | Udyr | +0.93 | 1.10 | 0.17 |  |
| 14 | Rek'Sai | +0.92 | 1.59 | 0.67 |  |
| 15 | Singed | +0.91 | 1.14 | 0.23 | grounding (Mega Adhesive) |
| 16 | Alistar | +0.90 | 1.39 | 0.49 |  |
| 17 | Milio | +0.90 | 1.16 | 0.26 |  |
| 18 | Viktor | +0.89 | 1.30 | 0.41 |  |
| 19 | Renata Glasc | +0.88 | 1.21 | 0.33 |  |
| 20 | Lissandra | +0.86 | 1.38 | 0.52 |  |
| 21 | Sejuani | +0.83 | 1.48 | 0.65 |  |
| 22 | Janna | +0.82 | 1.19 | 0.37 |  |
| 23 | Braum | +0.81 | 1.21 | 0.40 |  |
| 24 | Heimerdinger | +0.79 | 1.20 | 0.41 |  |
| 25 | Rammus | +0.76 | 1.32 | 0.56 |  |
| 26 | K'Sante | +0.74 | 1.48 | 0.74 |  |
| 27 | Galio | +0.73 | 1.47 | 0.74 |  |
| 28 | Anivia | +0.72 | 1.16 | 0.44 |  |
| 29 | Sion | +0.70 | 1.21 | 0.51 |  |
| 30 | Yuumi | +0.68 | 0.96 | 0.28 |  |
| 31 | Gnar | +0.67 | 1.18 | 0.51 |  |
| 32 | Cassiopeia | +0.66 | 1.23 | 0.57 | grounding (Miasma) |
| 33 | Xayah | +0.63 | 1.30 | 0.67 |  |
| 34 | Maokai | +0.63 | 1.27 | 0.64 |  |
| 35 | Vladimir | +0.62 | 1.30 | 0.68 |  |
| 36 | Xin Zhao | +0.62 | 1.23 | 0.61 |  |
| 37 | Thresh | +0.61 | 1.12 | 0.51 |  |
| 38 | Kalista | +0.61 | 0.83 | 0.22 |  |
| 39 | Seraphine | +0.60 | 1.14 | 0.54 |  |
| 40 | Kayn | +0.59 | 1.16 | 0.57 |  |
| 41 | Teemo | +0.59 | 0.94 | 0.35 | blind (Blinding Dart), blind (Blinding Dart) |
| 42 | Camille | +0.58 | 1.33 | 0.75 |  |
| 43 | Twisted Fate | +0.55 | 0.76 | 0.21 |  |
| 44 | Kayle | +0.52 | 0.79 | 0.27 |  |
| 45 | Fiora | +0.51 | 0.79 | 0.28 |  |
| 46 | Fizz | +0.50 | 1.25 | 0.75 |  |
| 47 | Nami | +0.50 | 1.12 | 0.62 |  |
| 48 | Poppy | +0.49 | 1.04 | 0.55 | dash stop (Steadfast Presence) |
| 49 | Aurelion Sol | +0.48 | 1.12 | 0.64 |  |
| 50 | Aurora | +0.48 | 0.83 | 0.35 |  |
| 51 | Zilean | +0.48 | 0.71 | 0.23 |  |
| 52 | Urgot | +0.46 | 1.05 | 0.59 |  |
| 53 | Amumu | +0.45 | 1.05 | 0.60 |  |
| 54 | Rakan | +0.44 | 1.03 | 0.59 |  |
| 55 | Vex | +0.44 | 0.79 | 0.35 |  |
| 56 | Gwen | +0.43 | 0.71 | 0.28 |  |
| 57 | Yone | +0.42 | 1.06 | 0.64 |  |
| 58 | Yasuo | +0.41 | 1.14 | 0.73 |  |
| 59 | Morgana | +0.41 | 0.82 | 0.41 |  |
| 60 | Warwick | +0.39 | 1.13 | 0.74 |  |
| 61 | Zoe | +0.39 | 0.69 | 0.30 |  |
| 62 | Leona | +0.38 | 0.98 | 0.60 |  |
| 63 | Garen | +0.38 | 0.81 | 0.43 |  |
| 64 | Mordekaiser | +0.36 | 0.59 | 0.23 |  |
| 65 | Shaco | +0.33 | 1.14 | 0.81 |  |
| 66 | Soraka | +0.33 | 0.66 | 0.33 |  |
| 67 | Riven | +0.32 | 1.00 | 0.68 |  |
| 68 | Ashe | +0.32 | 0.72 | 0.40 |  |
| 69 | Nilah | +0.31 | 1.15 | 0.84 | attack dodge (Jubilant Veil) |
| 70 | Viego | +0.31 | 0.98 | 0.67 |  |
| 71 | Cho'Gath | +0.30 | 1.01 | 0.71 |  |
| 72 | Gragas | +0.30 | 0.97 | 0.67 |  |
| 73 | Vayne | +0.30 | 0.77 | 0.47 |  |
| 74 | Sett | +0.28 | 0.98 | 0.70 |  |
| 75 | Rengar | +0.28 | 0.69 | 0.41 |  |
| 76 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 77 | Ornn | +0.26 | 0.98 | 0.72 |  |
| 78 | Vi | +0.25 | 0.98 | 0.73 |  |
| 79 | Vel'Koz | +0.25 | 0.66 | 0.41 |  |
| 80 | Jax | +0.24 | 1.13 | 0.89 | attack dodge (Counter Strike) |
| 81 | Jayce | +0.24 | 0.68 | 0.44 |  |
| 82 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 83 | Hwei | +0.23 | 0.81 | 0.58 |  |
| 84 | Veigar | +0.23 | 0.78 | 0.55 |  |
| 85 | Taric | +0.22 | 0.50 | 0.28 |  |
| 86 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 87 | Aatrox | +0.21 | 0.51 | 0.30 |  |
| 88 | Yorick | +0.21 | 0.50 | 0.29 |  |
| 89 | Olaf | +0.21 | 0.49 | 0.28 |  |
| 90 | Zaahen | +0.20 | 1.29 | 1.09 |  |
| 91 | Elise | +0.20 | 0.70 | 0.50 |  |
| 92 | Fiddlesticks | +0.19 | 1.11 | 0.92 |  |
| 93 | Sona | +0.19 | 0.74 | 0.55 |  |
| 94 | Quinn | +0.19 | 0.73 | 0.54 |  |
| 95 | Gangplank | +0.18 | 0.59 | 0.41 |  |
| 96 | Bel'Veth | +0.17 | 0.51 | 0.34 |  |
| 97 | Master Yi | +0.14 | 0.94 | 0.80 |  |
| 98 | Brand | +0.14 | 0.65 | 0.51 |  |
| 99 | Kennen | +0.13 | 0.68 | 0.55 |  |
| 100 | Lillia | +0.13 | 0.53 | 0.40 |  |
| 101 | Tristana | +0.12 | 0.72 | 0.60 |  |
| 102 | Kindred | +0.12 | 0.27 | 0.15 |  |
| 103 | Zyra | +0.10 | 0.64 | 0.54 |  |
| 104 | Neeko | +0.09 | 0.62 | 0.53 |  |
| 105 | Orianna | +0.08 | 0.64 | 0.56 |  |
| 106 | Lee Sin | +0.08 | 0.48 | 0.40 |  |
| 107 | Skarner | +0.07 | 0.59 | 0.52 |  |
| 108 | Nasus | +0.05 | 0.33 | 0.28 |  |
| 109 | Nunu & Willump | +0.03 | 0.60 | 0.57 |  |
| 110 | Malphite | 0.00 | 0.69 | 0.69 |  |
| 111 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 112 | Shyvana | -0.01 | 0.50 | 0.51 |  |
| 113 | Ambessa | -0.02 | 0.48 | 0.50 |  |
| 114 | Xerath | -0.03 | 0.66 | 0.69 |  |
| 115 | Caitlyn | -0.04 | 0.24 | 0.28 |  |
| 116 | Ziggs | -0.05 | 0.67 | 0.72 |  |
| 117 | Ahri | -0.06 | 0.78 | 0.84 |  |
| 118 | Nautilus | -0.07 | 0.48 | 0.55 |  |
| 119 | Akshan | -0.09 | 0.19 | 0.28 |  |
| 120 | Swain | -0.11 | 0.62 | 0.73 |  |
| 121 | Azir | -0.12 | 0.64 | 0.76 |  |
| 122 | Kog'Maw | -0.12 | 0.16 | 0.28 |  |
| 123 | Jinx | -0.13 | 0.55 | 0.68 |  |
| 124 | Darius | -0.13 | 0.49 | 0.62 |  |
| 125 | Trundle | -0.13 | 0.49 | 0.62 |  |
| 126 | Annie | -0.14 | 0.65 | 0.79 |  |
| 127 | Kassadin | -0.14 | 0.51 | 0.65 |  |
| 128 | Jarvan IV | -0.14 | 0.48 | 0.62 |  |
| 129 | Evelynn | -0.15 | 1.15 | 1.30 |  |
| 130 | Draven | -0.16 | 0.72 | 0.88 |  |
| 131 | Renekton | -0.16 | 0.51 | 0.67 |  |
| 132 | Sylas | -0.17 | 0.50 | 0.67 |  |
| 133 | Irelia | -0.19 | 0.50 | 0.69 |  |
| 134 | Volibear | -0.20 | 0.50 | 0.70 |  |
| 135 | Hecarim | -0.21 | 0.48 | 0.69 |  |
| 136 | Varus | -0.22 | 0.18 | 0.40 |  |
| 137 | Karma | -0.22 | 0.13 | 0.35 |  |
| 138 | LeBlanc | -0.23 | 0.13 | 0.36 |  |
| 139 | Syndra | -0.24 | 0.63 | 0.87 |  |
| 140 | Ryze | -0.24 | 0.15 | 0.39 |  |
| 141 | Zed | -0.25 | 0.65 | 0.90 |  |
| 142 | Aphelios | -0.26 | 0.33 | 0.59 |  |
| 143 | Zeri | -0.27 | 0.28 | 0.55 |  |
| 144 | Ivern | -0.27 | 0.11 | 0.38 |  |
| 145 | Dr. Mundo | -0.27 | 0.00 | 0.27 |  |
| 146 | Briar | -0.28 | 0.48 | 0.76 |  |
| 147 | Smolder | -0.28 | 0.20 | 0.48 |  |
| 148 | Rumble | -0.28 | 0.00 | 0.28 |  |
| 149 | Qiyana | -0.29 | 0.48 | 0.77 |  |
| 150 | Wukong | -0.30 | 0.48 | 0.78 |  |
| 151 | Nidalee | -0.32 | 0.18 | 0.50 |  |
| 152 | Jhin | -0.34 | 0.17 | 0.51 |  |
| 153 | Corki | -0.35 | 0.20 | 0.55 |  |
| 154 | Pyke | -0.38 | 1.00 | 1.38 |  |
| 155 | Samira | -0.38 | 0.26 | 0.64 |  |
| 156 | Diana | -0.41 | 0.48 | 0.89 |  |
| 157 | Mel | -0.42 | 0.25 | 0.67 |  |
| 158 | Katarina | -0.42 | 0.00 | 0.42 |  |
| 159 | Karthus | -0.44 | 0.11 | 0.55 |  |
| 160 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 161 | Lucian | -0.47 | 0.21 | 0.68 |  |
| 162 | Kha'Zix | -0.48 | 0.00 | 0.48 |  |
| 163 | Miss Fortune | -0.49 | 0.20 | 0.69 |  |
| 164 | Ezreal | -0.50 | 0.20 | 0.70 |  |
| 165 | Lux | -0.50 | 0.18 | 0.68 |  |
| 166 | Senna | -0.55 | 0.22 | 0.77 |  |
| 167 | Graves | -0.56 | 0.14 | 0.70 |  |
| 168 | Illaoi | -0.79 | 0.00 | 0.79 |  |
| 169 | Talon | -0.79 | 0.00 | 0.79 |  |
| 170 | Locke | -0.88 | 0.00 | 0.88 |  |
| 171 | Akali | -0.90 | 0.00 | 0.90 |  |
| 172 | Ekko | -1.21 | 0.00 | 1.21 |  |
