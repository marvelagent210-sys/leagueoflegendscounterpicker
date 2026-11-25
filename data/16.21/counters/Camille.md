# Counters to Camille (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Camille: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Camille wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Camille --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.90 | +1.00 | +1.00 | +1.00 | +0.46 | – | +0.75 |
| 2 | Vayne | +0.88 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.95 |
| 3 | Poppy | +0.86 | +1.00 | +1.00 | +1.00 | +0.31 | – | +0.58 |
| 4 | Kled | +0.84 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.46 |
| 5 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.44 |
| 6 | Warwick | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.35 |
| 7 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.82 |
| 8 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.10 |
| 9 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.32 |
| 10 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.42 |
| 11 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.24 |
| 12 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.12 |
| 13 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.12 |
| 14 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.89 |
| 15 | Kalista | +0.78 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.81 |
| 16 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.12 |
| 17 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.37 |
| 18 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.09 |
| 19 | Ivern | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.77 |
| 20 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.41 |
| 21 | Diana | +0.76 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.43 |
| 22 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.17 |
| 23 | Braum | +0.75 | +0.99 | +1.00 | +1.00 | −0.02 | – | −0.33 |
| 24 | Cho'Gath | +0.75 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.45 |
| 25 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.74 |
| 26 | Renekton | +0.75 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.65 |
| 27 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.46 |
| 28 | Volibear | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | −0.07 |
| 29 | Darius | +0.74 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.59 |
| 30 | Aatrox | +0.73 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.77 |
| 31 | Lulu | +0.59 | +1.00 | +1.00 | +1.00 | +0.00 | −1.00 | −0.19 |
| 32 | Jarvan IV | +0.54 | +1.00 | +0.00 | +1.00 | +0.13 | – | +0.36 |
| 33 | K'Sante | +0.36 | +1.00 | +1.00 | −1.00 | +0.17 | – | +0.00 |
| 34 | Pantheon | +0.36 | +1.00 | +1.00 | −1.00 | +0.25 | – | −0.32 |
| 35 | Nocturne | +0.32 | +1.00 | +1.00 | −1.00 | −0.08 | – | +0.04 |
| 36 | Yone | +0.32 | +1.00 | +1.00 | −1.00 | −0.01 | – | −0.22 |
| 37 | Garen | +0.32 | +1.00 | +1.00 | −1.00 | +0.06 | – | −0.47 |
| 38 | Xin Zhao | +0.29 | +1.00 | +0.00 | +0.00 | −0.04 | – | +0.36 |
| 39 | Mordekaiser | +0.29 | +1.00 | +1.00 | −1.00 | −0.10 | – | −0.47 |
| 40 | Udyr | +0.28 | +1.00 | −1.00 | +1.00 | −0.01 | – | +0.97 |
| 41 | Yasuo | +0.23 | +1.00 | −1.00 | +1.00 | −0.06 | – | +0.30 |
| 42 | Kog'Maw | +0.22 | +0.00 | +0.00 | +1.00 | +0.28 | +0.00 | −0.47 |
| 43 | Zac | +0.20 | +0.75 | −0.64 | +0.88 | −0.15 | – | −0.05 |
| 44 | Vi | +0.18 | +1.00 | −1.00 | +1.00 | −0.16 | – | −0.20 |
| 45 | Malzahar | +0.13 | +0.82 | +1.00 | −1.00 | +0.00 | −1.00 | −0.45 |
| 46 | Sion | +0.09 | −0.02 | +0.25 | +0.00 | +0.03 | – | +0.43 |
| 47 | Irelia | +0.03 | +1.00 | +0.03 | −0.95 | −0.09 | – | −0.52 |
| 48 | Lee Sin | −0.03 | +1.00 | −1.00 | +0.00 | −0.00 | – | −0.48 |
| 49 | Draven | −0.06 | +1.00 | +0.00 | −1.00 | +0.11 | −1.00 | −0.52 |
| 50 | Anivia | −0.10 | +0.07 | +0.23 | −1.00 | −0.05 | +0.23 | +0.28 |
| 51 | Elise | −0.11 | +0.37 | +0.36 | −1.00 | +0.18 | −1.00 | −0.38 |
| 52 | Corki | −0.13 | −1.00 | +1.00 | +0.00 | +0.14 | −1.00 | −0.94 |
| 53 | Lux | −0.17 | −1.00 | +0.84 | −1.00 | +0.13 | +0.78 | −0.66 |
| 54 | Gangplank | −0.20 | +1.00 | −1.00 | −1.00 | +0.12 | – | +0.04 |
| 55 | Sett | −0.24 | −1.00 | +1.00 | −1.00 | +0.01 | – | −0.40 |
| 56 | Bel'Veth | −0.26 | +1.00 | −1.00 | −1.00 | −0.20 | – | −0.15 |
| 57 | Nilah | −0.27 | +1.00 | −1.00 | −1.00 | +0.42 | −1.00 | −0.63 |
| 58 | Master Yi | −0.30 | +0.00 | −1.00 | +0.00 | +0.12 | −1.00 | +0.63 |
| 59 | Alistar | −0.33 | −1.00 | −1.00 | +1.00 | +0.11 | – | −0.23 |
| 60 | Gwen | −0.34 | −1.00 | −1.00 | +1.00 | +0.15 | – | −0.61 |
| 61 | Shen | −0.35 | −1.00 | −1.00 | +1.00 | +0.03 | – | −0.35 |
| 62 | Cassiopeia | −0.38 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | +0.29 |
| 63 | Heimerdinger | −0.40 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | −0.28 |
| 64 | Jinx | −0.43 | −1.00 | −1.00 | +0.69 | +0.12 | −1.00 | +0.23 |
| 65 | Kayle | −0.44 | +0.36 | −1.00 | −1.00 | +0.22 | −1.00 | −0.32 |
| 66 | Urgot | −0.46 | −0.34 | −0.34 | −1.00 | +0.19 | −1.00 | −0.32 |
| 67 | Quinn | −0.47 | −0.27 | −0.27 | −1.00 | +0.11 | −1.00 | −1.00 |
| 68 | Vex | −0.47 | −1.00 | +0.35 | −1.00 | −0.04 | −1.00 | +0.01 |
| 69 | Annie | −0.50 | −1.00 | −1.00 | −0.50 | +0.09 | +1.00 | −0.31 |
| 70 | Kennen | −0.56 | −1.00 | −1.00 | −1.00 | +0.16 | +1.00 | +0.37 |
| 71 | Riven | −0.56 | −1.00 | −1.00 | +0.00 | +0.09 | – | −0.38 |
| 72 | Tahm Kench | −0.58 | −1.00 | −1.00 | +0.00 | −0.03 | – | −0.41 |
| 73 | Karma | −0.60 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.37 |
| 74 | Rell | −0.61 | −1.00 | −1.00 | −1.00 | +0.12 | +1.00 | −0.61 |
| 75 | Milio | −0.63 | −1.00 | −1.00 | −1.00 | +0.03 | +0.85 | −0.39 |
| 76 | Gnar | −0.67 | −1.00 | −1.00 | −1.00 | +0.20 | +0.49 | −0.93 |
| 77 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.45 | – | −0.21 |
| 78 | Caitlyn | −0.74 | −1.00 | −1.00 | −0.61 | +0.10 | −1.00 | −0.58 |
| 79 | Rakan | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.51 |
| 80 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.07 |
| 81 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | – | −0.41 |
| 82 | Kayn | −0.76 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.18 |
| 83 | Kha'Zix | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.34 |
| 84 | Lillia | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.41 |
| 85 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.29 |
| 86 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.05 |
| 87 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.26 |
| 88 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.13 | – | −0.28 |
| 89 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.28 |
| 90 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.53 |
| 91 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.41 |
| 92 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.21 |
| 93 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.12 |
| 94 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.17 |
| 95 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.09 |
| 96 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.23 |
| 97 | Morgana | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.01 |
| 98 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.05 |
| 99 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.13 |
| 100 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.56 |
| 101 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | −0.53 |
| 102 | Ornn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.37 |
| 103 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.59 |
| 104 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.29 |
| 105 | Fizz | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.41 |
| 106 | Viego | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.67 |
| 107 | Zeri | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.06 |
| 108 | Hwei | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.02 |
| 109 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.29 |
| 110 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.15 |
| 111 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.51 |
| 112 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.25 |
| 113 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.41 |
| 114 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.34 |
| 115 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.01 |
| 116 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.41 |
| 117 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.43 |
| 118 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.26 |
| 119 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.31 |
| 120 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.58 |
| 121 | Aurelion Sol | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.07 |
| 122 | Orianna | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.44 |
| 123 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.51 |
| 124 | Akshan | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.69 |
| 125 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.66 |
| 126 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.71 |
| 127 | Hecarim | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.57 |
| 128 | Neeko | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.65 |
| 129 | Lucian | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.47 |
| 130 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.44 |
| 131 | Yunara | −0.82 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.76 |
| 132 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.88 |
| 133 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.72 |
| 134 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.60 |
| 135 | Miss Fortune | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.49 |
| 136 | Smolder | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.75 |
| 137 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.68 |
| 138 | Fiddlesticks | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.17 |
| 139 | Zilean | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.32 |
| 140 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.60 |
| 141 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.66 |
| 142 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.57 |
| 143 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −0.97 | −0.26 |
| 144 | Azir | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.23 |
| 145 | Varus | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.25 |
| 146 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.52 |
| 147 | Soraka | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.47 |
| 148 | Xerath | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.44 |
| 149 | Nami | −0.83 | −1.00 | −0.99 | −1.00 | −0.02 | −1.00 | −0.55 |
| 150 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.57 |
| 151 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.86 |
| 152 | Ezreal | −0.83 | −0.96 | −1.00 | −1.00 | +0.04 | −1.00 | −0.93 |
| 153 | Karthus | −0.83 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.63 |
| 154 | Viktor | −0.83 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.66 |
| 155 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.85 |
| 156 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.22 |
| 157 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.61 |
| 158 | Samira | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.77 |
| 159 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.77 |
| 160 | Bard | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.79 |
| 161 | Sona | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.81 |
| 162 | Qiyana | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.69 |
| 163 | Swain | −0.84 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.68 |
| 164 | Seraphine | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.79 |
| 165 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.87 |
| 166 | Brand | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.74 |
| 167 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.81 |
| 168 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.91 |
| 169 | Twisted Fate | −0.85 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.97 |
| 170 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.10 | – | −1.00 |
| 171 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.83 |
| 172 | Briar | −0.90 | −1.00 | −1.00 | −1.00 | −0.49 | – | −0.76 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Camille's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Camille's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Camille` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.60)

- **1.00** spell shield: Spell Shield's spell shield blocks Camille's The Hextech Ultimatum. Spell shield for 1.5 s, long enough to use ahead of The Hextech Ultimatum. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Camille R The Hextech Ultimatum)
- **0.73** spell shield: Spell Shield's spell shield blocks Camille's Wall Dive. Spell shield for 1.5 s, long enough to use ahead of Wall Dive. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Camille E Wall Dive)
- **0.23** range: Sivir's basic attacks reach 375 units farther than Camille's (500 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Sivir basic attacks → Camille basic attacks)

#### 2. Udyr (net +1.19)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Udyr E Blazing Stampede → Camille R The Hextech Ultimatum)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Camille's Wall Dive (airborne, stun). Immune for 1.5 s, long enough to use ahead of Wall Dive. (Udyr E Blazing Stampede → Camille E Wall Dive)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Camille's Tactical Sweep (slow). Immune for 1.5 s, long enough to use ahead of Tactical Sweep. (Udyr E Blazing Stampede → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Udyr's Blazing Stampede.

#### 3. Olaf (net +1.05)

- **1.00** cc immunity: Ragnarok makes Olaf immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 3 s, long enough to use ahead of The Hextech Ultimatum. (Olaf R Ragnarok → Camille R The Hextech Ultimatum)
- **0.48** cc immunity: Ragnarok makes Olaf immune to Camille's Wall Dive (airborne, stun). Immune for 3 s, long enough to use ahead of Wall Dive. (Olaf R Ragnarok → Camille E Wall Dive)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Camille's Tactical Sweep (slow). Immune for 3 s, long enough to use ahead of Tactical Sweep. (Olaf R Ragnarok → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Olaf's Reckless Swing.

#### 4. Vladimir (net +0.99)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 2 s, long enough to use ahead of The Hextech Ultimatum. (Vladimir W Sanguine Pool → Camille R The Hextech Ultimatum)
- **0.78** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Camille's Wall Dive. Untargetable for 2 s, long enough to use ahead of Wall Dive. (Vladimir W Sanguine Pool → Camille E Wall Dive)
- **0.13** untargetable: Sanguine Pool can deny the initial targeting of Camille's Precision Protocol, but untargetability does not stop its committed effect. Must be used before the enemy commits the attack, dash or mark. The enhanced attack will still complete and hit the target even if they become untargetable during the attack's windup. (Vladimir W Sanguine Pool → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Vladimir's Hemoplague.

#### 5. Fiora (net +0.99)

- **0.88** parry: Riposte parries Camille's Wall Dive and stuns back. Parry for 0.75 s; Wall Dive takes 0.38 s to land, enough to react. Negating Wall Dive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille E Wall Dive)
- **0.70** parry: Riposte parries Camille's The Hextech Ultimatum and stuns back. Parry for 0.75 s; The Hextech Ultimatum lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Hextech Ultimatum's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Camille R The Hextech Ultimatum)
- **0.16** parry: Riposte parries Camille's Precision Protocol. Parry for 0.75 s; Precision Protocol lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Fiora's Riposte.

#### 6. Xayah (net +0.95)

- **0.94** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's The Hextech Ultimatum. Untargetable for 1.5 s, long enough to use ahead of The Hextech Ultimatum. (Xayah R Featherstorm → Camille R The Hextech Ultimatum)
- **0.46** untargetable: Featherstorm makes Xayah untargetable, dodging Camille's Wall Dive. Untargetable for 1.5 s, long enough to use ahead of Wall Dive. (Xayah R Featherstorm → Camille E Wall Dive)
- **0.19** range: Xayah's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Xayah basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Xayah's Featherstorm.

#### 7. Morgana (net +0.79)

- **1.00** cc immunity: Black Shield makes Morgana immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 5 s, long enough to use ahead of The Hextech Ultimatum. (Morgana E Black Shield → Camille R The Hextech Ultimatum)
- **0.78** cc immunity: Black Shield makes Morgana immune to Camille's Wall Dive (airborne, stun). Immune for 5 s, long enough to use ahead of Wall Dive. (Morgana E Black Shield → Camille E Wall Dive)
- **0.10** range: Morgana's basic attacks reach 325 units farther than Camille's (450 vs 125 attack range). Camille closes the gap with Hookshot, The Hextech Ultimatum, Wall Dive. (Morgana basic attacks → Camille basic attacks)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Morgana's Soul Shackles.

#### 8. Rengar (net +0.73)

- **0.80** cleanse: Battle Roar cleanses Camille's The Hextech Ultimatum (airborne) after it lands. 10 s cooldown; usable while crowd controlled. Doesn't remove disrupt. (Rengar W Battle Roar → Camille R The Hextech Ultimatum)
- **0.80** cleanse: Battle Roar cleanses Camille's Wall Dive (airborne, stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille E Wall Dive)
- **0.09** cleanse: Battle Roar cleanses Camille's Tactical Sweep (slow) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Rengar's Bola Strike.

#### 9. Kayle (net +0.73)

- **0.50** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's The Hextech Ultimatum (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of The Hextech Ultimatum. (Kayle R Divine Judgment → Camille R The Hextech Ultimatum)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's Wall Dive (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Wall Dive. (Kayle R Divine Judgment → Camille E Wall Dive)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Camille's Precision Protocol. Invulnerable for 2.5 s, long enough to use ahead of Precision Protocol. (Kayle R Divine Judgment → Camille Q Precision Protocol)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Kayle's Starfire Spellblade.

#### 10. Sion (net +0.63)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's The Hextech Ultimatum (airborne, disrupt). Immune for 8 s, long enough to use ahead of The Hextech Ultimatum. (Sion R Unstoppable Onslaught → Camille R The Hextech Ultimatum)
- **0.50** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's Wall Dive (airborne, stun). Immune for 8 s, long enough to use ahead of Wall Dive. (Sion R Unstoppable Onslaught → Camille E Wall Dive)
- **0.06** cc immunity: Unstoppable Onslaught makes Sion immune to Camille's Tactical Sweep (slow). Immune for 8 s, long enough to use ahead of Tactical Sweep. (Sion R Unstoppable Onslaught → Camille W Tactical Sweep)
- Watch out: The Hextech Ultimatum makes Camille untargetable, dodging Sion's Unstoppable Onslaught.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.60 | 1.60 | 0.00 |  |
| 2 | Udyr | +1.19 | 1.53 | 0.34 |  |
| 3 | Olaf | +1.05 | 1.25 | 0.20 |  |
| 4 | Vladimir | +0.99 | 1.51 | 0.52 |  |
| 5 | Fiora | +0.99 | 1.28 | 0.29 |  |
| 6 | Xayah | +0.95 | 1.38 | 0.43 |  |
| 7 | Morgana | +0.79 | 1.51 | 0.72 |  |
| 8 | Rengar | +0.73 | 1.22 | 0.49 |  |
| 9 | Kayle | +0.73 | 0.85 | 0.12 |  |
| 10 | Sion | +0.63 | 1.26 | 0.63 |  |
| 11 | Bard | +0.62 | 1.44 | 0.82 |  |
| 12 | Nocturne | +0.60 | 1.60 | 1.00 |  |
| 13 | Lissandra | +0.58 | 1.44 | 0.86 |  |
| 14 | Master Yi | +0.58 | 1.12 | 0.54 |  |
| 15 | Aurora | +0.55 | 0.97 | 0.42 |  |
| 16 | Gwen | +0.54 | 1.05 | 0.51 |  |
| 17 | Gangplank | +0.50 | 1.15 | 0.65 |  |
| 18 | Singed | +0.49 | 0.94 | 0.45 | grounding (Mega Adhesive) |
| 19 | Fizz | +0.43 | 1.33 | 0.90 |  |
| 20 | Teemo | +0.41 | 0.82 | 0.41 | blind (Blinding Dart) |
| 21 | Alistar | +0.40 | 1.00 | 0.60 |  |
| 22 | Yuumi | +0.36 | 1.50 | 1.14 |  |
| 23 | Shaco | +0.34 | 0.86 | 0.52 |  |
| 24 | Jinx | +0.34 | 0.84 | 0.50 | dash stop (Flame Chompers!), dash stop (Flame Chompers!) |
| 25 | Kalista | +0.33 | 1.03 | 0.70 |  |
| 26 | Milio | +0.33 | 0.70 | 0.37 |  |
| 27 | Zed | +0.27 | 0.81 | 0.54 |  |
| 28 | Rek'Sai | +0.26 | 1.28 | 1.02 |  |
| 29 | Twitch | +0.21 | 0.21 | 0.00 |  |
| 30 | Maokai | +0.20 | 1.32 | 1.12 |  |
| 31 | Kai'Sa | +0.19 | 0.19 | 0.00 |  |
| 32 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 33 | Vex | +0.12 | 0.84 | 0.72 |  |
| 34 | Nasus | +0.11 | 0.39 | 0.28 |  |
| 35 | Malzahar | +0.10 | 1.21 | 1.11 |  |
| 36 | Veigar | +0.09 | 0.72 | 0.63 | dash stop (Event Horizon) |
| 37 | Viktor | +0.04 | 0.78 | 0.74 | dash stop (Gravity Field) |
| 38 | Kindred | +0.03 | 0.23 | 0.20 |  |
| 39 | Hwei | +0.02 | 0.81 | 0.79 | dash stop (Grim Visage), dash stop (Grim Visage) |
| 40 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 41 | Lulu | -0.07 | 0.54 | 0.61 |  |
| 42 | Zilean | -0.07 | 0.16 | 0.23 |  |
| 43 | Nidalee | -0.07 | 0.15 | 0.22 |  |
| 44 | Ahri | -0.12 | 0.76 | 0.88 | dash stop (Charm), dash stop (Charm) |
| 45 | Kog'Maw | -0.12 | 0.14 | 0.26 |  |
| 46 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 47 | Nilah | -0.13 | 0.53 | 0.66 |  |
| 48 | Corki | -0.13 | 0.16 | 0.29 |  |
| 49 | Cassiopeia | -0.16 | 0.76 | 0.92 | grounding (Miasma) |
| 50 | LeBlanc | -0.20 | 0.11 | 0.31 |  |
| 51 | Taric | -0.20 | 0.00 | 0.20 |  |
| 52 | Jax | -0.22 | 0.57 | 0.79 | attack dodge (Counter Strike) |
| 53 | Soraka | -0.22 | 0.13 | 0.35 |  |
| 54 | Zaahen | -0.23 | 0.85 | 1.08 |  |
| 55 | Garen | -0.23 | 0.37 | 0.60 |  |
| 56 | Zoe | -0.23 | 0.16 | 0.39 |  |
| 57 | Samira | -0.23 | 0.15 | 0.38 |  |
| 58 | Kayn | -0.24 | 0.86 | 1.10 |  |
| 59 | Zeri | -0.26 | 0.22 | 0.48 |  |
| 60 | Evelynn | -0.27 | 0.86 | 1.13 |  |
| 61 | Vayne | -0.29 | 0.21 | 0.50 |  |
| 62 | Jayce | -0.30 | 0.15 | 0.45 |  |
| 63 | Yorick | -0.31 | 0.00 | 0.31 |  |
| 64 | Karma | -0.33 | 0.11 | 0.44 |  |
| 65 | Kha'Zix | -0.34 | 0.00 | 0.34 |  |
| 66 | Quinn | -0.35 | 0.19 | 0.54 |  |
| 67 | Elise | -0.35 | 0.16 | 0.51 |  |
| 68 | Heimerdinger | -0.35 | 0.15 | 0.50 |  |
| 69 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 70 | Shyvana | -0.38 | 0.15 | 0.53 |  |
| 71 | Kled | -0.39 | 0.82 | 1.21 |  |
| 72 | Warwick | -0.40 | 1.08 | 1.48 |  |
| 73 | Lux | -0.40 | 0.14 | 0.54 |  |
| 74 | Xin Zhao | -0.43 | 0.63 | 1.06 |  |
| 75 | Graves | -0.44 | 0.12 | 0.56 |  |
| 76 | Illaoi | -0.45 | 0.15 | 0.60 |  |
| 77 | Ashe | -0.46 | 0.18 | 0.64 |  |
| 78 | Aatrox | -0.46 | 0.00 | 0.46 |  |
| 79 | Varus | -0.47 | 0.31 | 0.78 |  |
| 80 | Poppy | -0.48 | 0.78 | 1.26 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 81 | Katarina | -0.48 | 0.18 | 0.66 |  |
| 82 | Anivia | -0.48 | 0.12 | 0.60 |  |
| 83 | Talon | -0.48 | 0.00 | 0.48 |  |
| 84 | Ezreal | -0.49 | 0.16 | 0.65 |  |
| 85 | Gnar | -0.50 | 0.16 | 0.66 |  |
| 86 | Smolder | -0.51 | 0.16 | 0.67 |  |
| 87 | Rumble | -0.51 | 0.00 | 0.51 |  |
| 88 | Ivern | -0.53 | 0.10 | 0.63 |  |
| 89 | Draven | -0.54 | 0.18 | 0.72 |  |
| 90 | Kennen | -0.54 | 0.14 | 0.68 |  |
| 91 | Mel | -0.54 | 0.13 | 0.67 |  |
| 92 | Kassadin | -0.54 | 0.00 | 0.54 |  |
| 93 | Blitzcrank | -0.55 | 0.00 | 0.55 |  |
| 94 | Riven | -0.55 | 0.00 | 0.55 |  |
| 95 | Pantheon | -0.58 | 0.75 | 1.33 |  |
| 96 | Twisted Fate | -0.58 | 0.21 | 0.79 |  |
| 97 | Bel'Veth | -0.59 | 0.00 | 0.59 |  |
| 98 | Ziggs | -0.60 | 0.13 | 0.73 |  |
| 99 | Sett | -0.61 | 0.15 | 0.76 |  |
| 100 | Brand | -0.61 | 0.11 | 0.72 |  |
| 101 | Syndra | -0.61 | 0.11 | 0.72 |  |
| 102 | Renekton | -0.61 | 0.00 | 0.61 |  |
| 103 | Shen | -0.63 | 0.55 | 1.18 |  |
| 104 | Senna | -0.63 | 0.16 | 0.79 |  |
| 105 | Annie | -0.64 | 0.11 | 0.75 |  |
| 106 | Wukong | -0.64 | 0.00 | 0.64 |  |
| 107 | Sona | -0.65 | 0.21 | 0.86 |  |
| 108 | Miss Fortune | -0.65 | 0.16 | 0.81 |  |
| 109 | Mordekaiser | -0.66 | 0.09 | 0.75 |  |
| 110 | Yasuo | -0.66 | 0.00 | 0.66 |  |
| 111 | Aurelion Sol | -0.68 | 0.11 | 0.79 |  |
| 112 | Cho'Gath | -0.68 | 0.00 | 0.68 |  |
| 113 | Lee Sin | -0.68 | 0.00 | 0.68 |  |
| 114 | Swain | -0.69 | 0.10 | 0.79 |  |
| 115 | Tristana | -0.70 | 0.18 | 0.88 |  |
| 116 | Thresh | -0.70 | 0.10 | 0.80 |  |
| 117 | Locke | -0.70 | 0.00 | 0.70 |  |
| 118 | Akshan | -0.71 | 0.17 | 0.88 |  |
| 119 | Vel'Koz | -0.71 | 0.13 | 0.84 |  |
| 120 | Irelia | -0.71 | 0.03 | 0.74 |  |
| 121 | Yone | -0.72 | 0.49 | 1.21 |  |
| 122 | Amumu | -0.72 | 0.33 | 1.05 |  |
| 123 | Akali | -0.72 | 0.00 | 0.72 |  |
| 124 | Darius | -0.72 | 0.00 | 0.72 |  |
| 125 | Trundle | -0.73 | 0.00 | 0.73 |  |
| 126 | Orianna | -0.75 | 0.13 | 0.88 |  |
| 127 | Aphelios | -0.76 | 0.24 | 1.00 |  |
| 128 | Xerath | -0.76 | 0.13 | 0.89 |  |
| 129 | Malphite | -0.77 | 0.40 | 1.17 |  |
| 130 | Lillia | -0.79 | 0.05 | 0.84 |  |
| 131 | Renata Glasc | -0.80 | 0.19 | 0.99 |  |
| 132 | Azir | -0.80 | 0.13 | 0.93 |  |
| 133 | Ryze | -0.80 | 0.12 | 0.92 |  |
| 134 | Skarner | -0.81 | 0.06 | 0.87 |  |
| 135 | Ekko | -0.82 | 0.00 | 0.82 |  |
| 136 | Seraphine | -0.83 | 0.14 | 0.97 |  |
| 137 | Diana | -0.83 | 0.00 | 0.83 |  |
| 138 | Lucian | -0.84 | 0.18 | 1.02 |  |
| 139 | Urgot | -0.84 | 0.08 | 0.92 |  |
| 140 | Braum | -0.84 | 0.00 | 0.84 |  |
| 141 | Karthus | -0.87 | 0.10 | 0.97 |  |
| 142 | Neeko | -0.88 | 0.11 | 0.99 |  |
| 143 | Caitlyn | -0.89 | 0.18 | 1.07 |  |
| 144 | Zyra | -0.89 | 0.12 | 1.01 |  |
| 145 | Leona | -0.91 | 0.00 | 0.91 |  |
| 146 | Zac | -0.92 | 0.70 | 1.62 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 147 | Nami | -0.93 | 0.11 | 1.04 |  |
| 148 | Volibear | -0.94 | 0.15 | 1.09 |  |
| 149 | K'Sante | -0.97 | 0.30 | 1.27 |  |
| 150 | Jhin | -0.97 | 0.13 | 1.10 |  |
| 151 | Nautilus | -0.97 | 0.00 | 0.97 |  |
| 152 | Hecarim | -0.99 | 0.15 | 1.14 |  |
| 153 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 154 | Nunu & Willump | -1.01 | 0.13 | 1.14 |  |
| 155 | Rammus | -1.03 | 0.38 | 1.41 |  |
| 156 | Janna | -1.03 | 0.18 | 1.21 |  |
| 157 | Fiddlesticks | -1.03 | 0.10 | 1.13 |  |
| 158 | Rakan | -1.03 | 0.06 | 1.09 |  |
| 159 | Qiyana | -1.07 | 0.00 | 1.07 |  |
| 160 | Jarvan IV | -1.10 | 0.15 | 1.25 |  |
| 161 | Rell | -1.12 | 0.00 | 1.12 |  |
| 162 | Ornn | -1.14 | 0.15 | 1.29 |  |
| 163 | Gragas | -1.15 | 0.00 | 1.15 |  |
| 164 | Sejuani | -1.15 | 0.00 | 1.15 |  |
| 165 | Briar | -1.17 | 0.00 | 1.17 |  |
| 166 | Pyke | -1.17 | 0.00 | 1.17 |  |
| 167 | Viego | -1.22 | 0.20 | 1.42 |  |
| 168 | Vi | -1.45 | 0.15 | 1.60 |  |
| 169 | Naafiri | -1.50 | 0.00 | 1.50 |  |
| 170 | Tahm Kench | -1.55 | 0.00 | 1.55 |  |
| 171 | Galio | -1.60 | 0.00 | 1.60 |  |
| 172 | Taliyah | -1.68 | 0.13 | 1.81 |  |
