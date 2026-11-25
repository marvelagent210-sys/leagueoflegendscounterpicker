# Counters to Riven (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Riven: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Riven wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Riven --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.27 | +1.00 | +0.58 |
| 2 | Poppy | +0.86 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.46 |
| 3 | Teemo | +0.84 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.59 |
| 4 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.59 |
| 5 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.59 |
| 6 | Lulu | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.18 |
| 7 | Cassiopeia | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.14 |
| 8 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.36 |
| 9 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | −0.12 |
| 10 | Sivir | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | −0.34 |
| 11 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.16 |
| 12 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.27 |
| 13 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.67 |
| 14 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.44 |
| 15 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.06 |
| 16 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.12 |
| 17 | Urgot | +0.79 | +0.92 | +1.00 | +1.00 | +0.24 | +0.92 | −0.42 |
| 18 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.46 |
| 19 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.15 |
| 20 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.33 |
| 21 | Fiora | +0.78 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.86 |
| 22 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.09 |
| 23 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | −0.94 |
| 24 | Illaoi | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.01 |
| 25 | Rakan | +0.77 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | −0.12 |
| 26 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | −0.55 |
| 27 | Nocturne | +0.77 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.63 |
| 28 | Pantheon | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.05 |
| 29 | Udyr | +0.77 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.51 |
| 30 | Shyvana | +0.76 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.27 |
| 31 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.25 |
| 32 | Cho'Gath | +0.76 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.36 |
| 33 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.46 |
| 34 | Tahm Kench | +0.75 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.11 |
| 35 | Viego | +0.75 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.10 |
| 36 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | −0.07 |
| 37 | Mordekaiser | +0.74 | +0.97 | +0.98 | +0.94 | −0.05 | – | −0.03 |
| 38 | Quinn | +0.74 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −1.00 |
| 39 | Darius | +0.74 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.31 |
| 40 | Wukong | +0.73 | +1.00 | +1.00 | +1.00 | −0.15 | – | −0.35 |
| 41 | Volibear | +0.71 | +1.00 | +1.00 | +0.79 | −0.21 | – | +0.30 |
| 42 | Xin Zhao | +0.70 | +1.00 | +1.00 | +1.00 | −0.21 | – | −0.72 |
| 43 | Irelia | +0.69 | +1.00 | +1.00 | +0.64 | +0.07 | – | −0.29 |
| 44 | Aatrox | +0.69 | +1.00 | +1.00 | +1.00 | −0.28 | – | −0.75 |
| 45 | Sion | +0.68 | +0.66 | +1.00 | +1.00 | −0.18 | – | +0.42 |
| 46 | Graves | +0.65 | +1.00 | +1.00 | +0.50 | −0.06 | +1.00 | −0.91 |
| 47 | Kog'Maw | +0.61 | +1.00 | +1.00 | +0.00 | +0.14 | +1.00 | −0.11 |
| 48 | Rell | +0.61 | +1.00 | +1.00 | +0.00 | +0.09 | +1.00 | −0.15 |
| 49 | Kayle | +0.60 | +1.00 | +1.00 | +0.00 | +0.15 | +1.00 | −0.38 |
| 50 | Heimerdinger | +0.60 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | −0.13 |
| 51 | Zaahen | +0.59 | +1.00 | +0.76 | +0.66 | −0.17 | – | −0.28 |
| 52 | Ornn | +0.58 | +1.00 | +1.00 | +0.00 | +0.18 | – | −0.13 |
| 53 | Camille | +0.56 | +1.00 | +1.00 | +0.00 | −0.09 | – | +0.38 |
| 54 | Gnar | +0.55 | +1.00 | +1.00 | +0.00 | +0.01 | +0.65 | −0.24 |
| 55 | Ivern | +0.55 | +1.00 | +1.00 | +0.00 | −0.21 | +1.00 | −0.34 |
| 56 | Rammus | +0.54 | +1.00 | +1.00 | +0.00 | −0.17 | – | +0.24 |
| 57 | Gangplank | +0.52 | +1.00 | +0.00 | +1.00 | +0.03 | – | +0.21 |
| 58 | Corki | +0.40 | +1.00 | +1.00 | −1.00 | +0.20 | +1.00 | −0.64 |
| 59 | Twisted Fate | +0.40 | +1.00 | +1.00 | −1.00 | +0.14 | +1.00 | −0.47 |
| 60 | Ambessa | +0.34 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.17 |
| 61 | Morgana | +0.34 | +1.00 | +0.94 | +0.00 | −0.24 | −1.00 | −0.23 |
| 62 | Hecarim | +0.34 | +1.00 | +1.00 | −1.00 | +0.10 | – | −0.27 |
| 63 | Kassadin | +0.32 | +1.00 | +1.00 | −1.00 | −0.15 | – | +0.16 |
| 64 | Rek'Sai | +0.31 | +1.00 | +1.00 | −1.00 | −0.08 | – | −0.19 |
| 65 | Malzahar | +0.29 | −1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.36 |
| 66 | Karma | +0.29 | +1.00 | −0.18 | +0.00 | +0.06 | +0.84 | −0.20 |
| 67 | Lee Sin | +0.26 | +0.00 | +1.00 | +0.00 | −0.15 | – | +0.15 |
| 68 | Sett | +0.20 | +1.00 | −1.00 | +1.00 | −0.01 | – | −0.29 |
| 69 | Elise | +0.19 | +1.00 | +1.00 | −1.00 | +0.07 | −1.00 | −0.31 |
| 70 | Anivia | +0.19 | +0.16 | −0.05 | +0.60 | −0.16 | +0.51 | +0.23 |
| 71 | Annie | +0.17 | +1.00 | +0.00 | −1.00 | +0.19 | +1.00 | −0.24 |
| 72 | Yone | +0.17 | +1.00 | +0.52 | −1.00 | −0.15 | – | −0.16 |
| 73 | Brand | +0.16 | +0.30 | +0.89 | −1.00 | −0.01 | +0.84 | −0.37 |
| 74 | Neeko | +0.10 | +1.00 | −1.00 | −0.03 | +0.17 | +0.90 | −0.24 |
| 75 | Zac | +0.06 | −1.00 | +0.83 | +0.73 | −0.34 | – | +0.00 |
| 76 | Ezreal | +0.05 | +0.84 | +0.05 | −1.00 | +0.01 | +0.50 | −0.54 |
| 77 | Jarvan IV | +0.04 | +1.00 | −1.00 | +0.00 | +0.05 | – | +0.59 |
| 78 | Xayah | −0.06 | −1.00 | +1.00 | +0.00 | +0.14 | −0.50 | −0.58 |
| 79 | Braum | −0.07 | −1.00 | +0.93 | −0.04 | −0.19 | – | −0.16 |
| 80 | Jhin | −0.10 | +1.00 | −0.94 | +0.00 | +0.04 | −1.00 | −0.36 |
| 81 | Ryze | −0.11 | +1.00 | −1.00 | −1.00 | +0.21 | +1.00 | −0.82 |
| 82 | Zilean | −0.11 | +1.00 | −1.00 | +0.00 | −0.04 | −1.00 | −0.15 |
| 83 | Twitch | −0.21 | +1.00 | −1.00 | −1.00 | +0.16 | +0.00 | −0.61 |
| 84 | Alistar | −0.22 | −1.00 | +1.00 | −1.00 | +0.04 | – | −0.04 |
| 85 | Sejuani | −0.23 | −1.00 | +1.00 | −1.00 | −0.05 | – | +0.07 |
| 86 | Singed | −0.25 | −1.00 | +1.00 | −1.00 | −0.10 | – | −0.13 |
| 87 | Azir | −0.27 | −0.84 | +1.00 | −1.00 | −0.00 | −1.00 | −0.12 |
| 88 | Vel'Koz | −0.27 | +0.33 | −1.00 | −0.15 | +0.20 | −1.00 | −0.08 |
| 89 | Ashe | −0.28 | +1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.04 |
| 90 | Ziggs | −0.29 | +1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.12 |
| 91 | Milio | −0.31 | −0.95 | +1.00 | −1.00 | +0.10 | −1.00 | −0.76 |
| 92 | Miss Fortune | −0.31 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.35 |
| 93 | Sona | −0.31 | +1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.43 |
| 94 | Jinx | −0.32 | +0.46 | −1.00 | −0.39 | +0.08 | −1.00 | −0.33 |
| 95 | Samira | −0.32 | +1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.55 |
| 96 | Draven | −0.33 | +1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.43 |
| 97 | Akali | −0.35 | −1.00 | +0.71 | −1.00 | −0.15 | – | −0.34 |
| 98 | Kennen | −0.45 | −0.92 | −1.00 | +0.00 | −0.10 | +0.40 | +0.12 |
| 99 | Orianna | −0.46 | −1.00 | −1.00 | −0.50 | +0.22 | +1.00 | +0.08 |
| 100 | Jayce | −0.48 | +0.00 | −1.00 | −1.00 | +0.11 | – | +0.10 |
| 101 | Shen | −0.49 | −1.00 | +0.00 | −1.00 | +0.02 | – | +0.07 |
| 102 | Bard | −0.50 | +0.20 | −1.00 | −1.00 | +0.16 | −1.00 | −0.45 |
| 103 | Warwick | −0.51 | +0.00 | −1.00 | −1.00 | −0.20 | – | +0.32 |
| 104 | Tristana | −0.52 | −1.00 | −0.50 | −1.00 | −0.04 | +1.00 | −0.79 |
| 105 | Karthus | −0.55 | +0.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.28 |
| 106 | Kayn | −0.55 | +0.00 | −1.00 | −1.00 | −0.18 | – | −0.39 |
| 107 | Zeri | −0.57 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.32 |
| 108 | Janna | −0.60 | −1.00 | −1.00 | −1.00 | +0.19 | +1.00 | −0.66 |
| 109 | Smolder | −0.61 | −1.00 | −1.00 | −1.00 | +0.13 | +1.00 | −0.58 |
| 110 | Seraphine | −0.62 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | −0.48 |
| 111 | Yunara | −0.63 | −1.00 | −1.00 | −1.00 | +0.07 | +1.00 | −0.70 |
| 112 | Lucian | −0.63 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | −0.06 |
| 113 | Caitlyn | −0.64 | −1.00 | −1.00 | −1.00 | −0.04 | +0.94 | −0.66 |
| 114 | Akshan | −0.69 | −1.00 | −1.00 | −1.00 | +0.15 | +0.00 | −0.30 |
| 115 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.15 |
| 116 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | −0.29 |
| 117 | Veigar | −0.75 | −0.93 | −1.00 | −0.77 | −0.02 | −1.00 | −0.25 |
| 118 | Gragas | −0.76 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.42 |
| 119 | Swain | −0.76 | −0.90 | −1.00 | −1.00 | +0.16 | −0.90 | −0.34 |
| 120 | Nami | −0.78 | −0.81 | −1.00 | −1.00 | +0.02 | −1.00 | −0.54 |
| 121 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.05 |
| 122 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.41 |
| 123 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.62 |
| 124 | Maokai | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.27 |
| 125 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.28 |
| 126 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.20 |
| 127 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.15 |
| 128 | Gwen | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.28 |
| 129 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.21 |
| 130 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 131 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.24 |
| 132 | Nilah | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.08 |
| 133 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.14 |
| 134 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.17 |
| 135 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.04 |
| 136 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.10 |
| 137 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.02 |
| 138 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.07 |
| 139 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.29 |
| 140 | Syndra | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.22 |
| 141 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.34 |
| 142 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.33 |
| 143 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.01 |
| 144 | Senna | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.23 |
| 145 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.31 |
| 146 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.17 |
| 147 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.27 |
| 148 | Shaco | −0.81 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.23 |
| 149 | Fizz | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.30 |
| 150 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.26 |
| 151 | Varus | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.17 |
| 152 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.49 |
| 153 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.39 |
| 154 | Master Yi | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.30 |
| 155 | Hwei | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.30 |
| 156 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.46 |
| 157 | Lissandra | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.11 |
| 158 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.36 |
| 159 | Lux | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.32 |
| 160 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.64 |
| 161 | Ahri | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.03 |
| 162 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.44 |
| 163 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.24 |
| 164 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.48 |
| 165 | Vi | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.52 |
| 166 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.32 |
| 167 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.54 |
| 168 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.75 |
| 169 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.48 |
| 170 | Kai'Sa | −0.86 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.70 |
| 171 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.33 | – | −0.77 |
| 172 | Renata Glasc | −0.88 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | −0.84 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Riven's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Riven's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Riven` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.59)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven Q Broken Wings)
- **0.52** spell shield: Shroud of Darkness's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven W Ki Burst)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Riven R Wind Slash)

#### 2. Sivir (net +1.46)

- **0.83** spell shield: Spell Shield's spell shield blocks Riven's Broken Wings. Spell shield for 1.5 s, long enough to use ahead of Broken Wings. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven Q Broken Wings)
- **0.44** spell shield: Spell Shield's spell shield blocks Riven's Ki Burst. Spell shield for 1.5 s, long enough to use ahead of Ki Burst. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven W Ki Burst)
- **0.40** spell shield: Spell Shield's spell shield blocks Riven's Wind Slash. Spell shield for 1.5 s, long enough to use ahead of Wind Slash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Riven R Wind Slash)

#### 3. Udyr (net +1.35)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Riven's Broken Wings (airborne). Immune for 1.5 s, long enough to use ahead of Broken Wings. (Udyr E Blazing Stampede → Riven Q Broken Wings)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Riven's Ki Burst (stun). Immune for 1.5 s, long enough to use ahead of Ki Burst. (Udyr E Blazing Stampede → Riven W Ki Burst)

#### 4. Morgana (net +1.25)

- **0.89** cc immunity: Black Shield makes Morgana immune to Riven's Broken Wings (airborne). Immune for 5 s, long enough to use ahead of Broken Wings. (Morgana E Black Shield → Riven Q Broken Wings)
- **0.46** cc immunity: Black Shield makes Morgana immune to Riven's Ki Burst (stun). Immune for 5 s, long enough to use ahead of Ki Burst. (Morgana E Black Shield → Riven W Ki Burst)
- **0.13** range: Morgana's basic attacks reach 325 units farther than Riven's (450 vs 125 attack range). Riven closes the gap with Broken Wings, Valor. (Morgana basic attacks → Riven basic attacks)

#### 5. Vladimir (net +1.19)

- **0.89** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Broken Wings. Untargetable for 2 s, long enough to use ahead of Broken Wings. (Vladimir W Sanguine Pool → Riven Q Broken Wings)
- **0.46** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Ki Burst. Untargetable for 2 s, long enough to use ahead of Ki Burst. (Vladimir W Sanguine Pool → Riven W Ki Burst)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Riven's Wind Slash. Untargetable for 2 s, long enough to use ahead of Wind Slash. (Vladimir W Sanguine Pool → Riven R Wind Slash)
- Watch out: Ki Burst's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Fizz (net +1.09)

- **0.65** untargetable: Playful makes Fizz untargetable, dodging Riven's Ki Burst. Untargetable for 0.75 s; Ki Burst takes 0.25 s to land, enough to react. (Fizz E Playful → Riven W Ki Burst)
- **0.60** untargetable: Playful makes Fizz untargetable, dodging Riven's Broken Wings. Untargetable for 0.75 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Riven Q Broken Wings)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Riven's Wind Slash. Untargetable for 0.75 s; Wind Slash takes 0.94 s to land, enough to react. (Fizz E Playful → Riven R Wind Slash)

#### 7. Fiora (net +1.03)

- **0.63** parry: Riposte parries Riven's Broken Wings and stuns back. Parry for 0.75 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Broken Wings's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven Q Broken Wings)
- **0.56** parry: Riposte parries Riven's Ki Burst and stuns back. Parry for 0.75 s; Ki Burst takes 0.25 s to land, enough to react. Negating Ki Burst's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Riven W Ki Burst)
- **0.43** parry: Riposte parries Riven's Wind Slash. Parry for 0.75 s; Wind Slash takes 0.94 s to land, enough to react. (Fiora W Riposte → Riven R Wind Slash)

#### 8. Rengar (net +1.03)

- **0.80** cleanse: Battle Roar cleanses Riven's Broken Wings (airborne) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven Q Broken Wings)
- **0.46** cleanse: Battle Roar cleanses Riven's Ki Burst (stun) after it lands. 10 s cooldown; usable while crowd controlled. (Rengar W Battle Roar → Riven W Ki Burst)

#### 9. Maokai (net +1.02)

- **0.60** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Broken Wings. Untargetable for 1.4 s; Broken Wings lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Riven Q Broken Wings)
- **0.57** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Ki Burst. Untargetable for 1.4 s; Ki Burst takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Riven W Ki Burst)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Riven's Wind Slash. Untargetable for 1.4 s; Wind Slash takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Riven R Wind Slash)

#### 10. Bard (net +0.97)

- **0.50** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Broken Wings. Untargetable for 2.5 s, long enough to use ahead of Broken Wings. (Bard R Tempered Fate → Riven Q Broken Wings)
- **0.32** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Ki Burst. Untargetable for 2.5 s, long enough to use ahead of Ki Burst. (Bard R Tempered Fate → Riven W Ki Burst)
- **0.26** untargetable: Tempered Fate makes Bard untargetable, dodging Riven's Wind Slash. Untargetable for 2.5 s, long enough to use ahead of Wind Slash. (Bard R Tempered Fate → Riven R Wind Slash)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.59 | 1.59 | 0.00 |  |
| 2 | Sivir | +1.46 | 1.46 | 0.00 |  |
| 3 | Udyr | +1.35 | 1.35 | 0.00 |  |
| 4 | Morgana | +1.25 | 1.25 | 0.00 |  |
| 5 | Vladimir | +1.19 | 1.35 | 0.16 |  |
| 6 | Fizz | +1.09 | 1.09 | 0.00 |  |
| 7 | Fiora | +1.03 | 1.03 | 0.00 |  |
| 8 | Rengar | +1.03 | 1.03 | 0.00 |  |
| 9 | Maokai | +1.02 | 1.02 | 0.00 |  |
| 10 | Bard | +0.97 | 0.97 | 0.00 |  |
| 11 | Gangplank | +0.97 | 0.97 | 0.00 |  |
| 12 | Xayah | +0.96 | 0.96 | 0.00 |  |
| 13 | Vex | +0.94 | 0.94 | 0.00 | dash stop (Doom 'n Gloom) |
| 14 | Lissandra | +0.92 | 0.92 | 0.00 |  |
| 15 | Singed | +0.87 | 0.87 | 0.00 | grounding (Mega Adhesive) |
| 16 | Viktor | +0.86 | 0.86 | 0.00 | dash stop (Gravity Field) |
| 17 | Jinx | +0.84 | 0.84 | 0.00 | dash stop (Flame Chompers!) |
| 18 | Cassiopeia | +0.82 | 0.82 | 0.00 | grounding (Miasma) |
| 19 | Gwen | +0.82 | 0.82 | 0.00 |  |
| 20 | Hwei | +0.80 | 0.80 | 0.00 | dash stop (Grim Visage) |
| 21 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 22 | Veigar | +0.77 | 0.77 | 0.00 | dash stop (Event Horizon) |
| 23 | Rek'Sai | +0.75 | 0.75 | 0.00 |  |
| 24 | Aurora | +0.73 | 0.73 | 0.00 |  |
| 25 | Teemo | +0.72 | 0.72 | 0.00 | blind (Blinding Dart) |
| 26 | Kalista | +0.71 | 0.71 | 0.00 |  |
| 27 | Kayle | +0.67 | 0.67 | 0.00 |  |
| 28 | Olaf | +0.66 | 0.66 | 0.00 |  |
| 29 | Lulu | +0.60 | 0.60 | 0.00 |  |
| 30 | Milio | +0.60 | 0.60 | 0.00 |  |
| 31 | Samira | +0.57 | 0.57 | 0.00 |  |
| 32 | Braum | +0.55 | 0.55 | 0.00 | projectile block (Unbreakable) |
| 33 | Camille | +0.55 | 0.55 | 0.00 |  |
| 34 | Kled | +0.54 | 0.54 | 0.00 |  |
| 35 | Yone | +0.54 | 0.54 | 0.00 |  |
| 36 | Yuumi | +0.53 | 1.35 | 0.82 |  |
| 37 | Alistar | +0.53 | 0.53 | 0.00 |  |
| 38 | Evelynn | +0.53 | 0.53 | 0.00 |  |
| 39 | Mel | +0.53 | 0.53 | 0.00 |  |
| 40 | Shaco | +0.53 | 0.53 | 0.00 |  |
| 41 | Zed | +0.52 | 0.52 | 0.00 |  |
| 42 | Zaahen | +0.47 | 0.47 | 0.00 |  |
| 43 | Malphite | +0.45 | 0.45 | 0.00 |  |
| 44 | Nilah | +0.43 | 0.43 | 0.00 |  |
| 45 | Sion | +0.42 | 0.70 | 0.28 |  |
| 46 | Jax | +0.41 | 0.41 | 0.00 | attack dodge (Counter Strike) |
| 47 | Xin Zhao | +0.41 | 0.41 | 0.00 |  |
| 48 | Yasuo | +0.41 | 0.41 | 0.00 | projectile block (Wind Wall) |
| 49 | Master Yi | +0.40 | 0.82 | 0.42 |  |
| 50 | K'Sante | +0.40 | 0.40 | 0.00 |  |
| 51 | Poppy | +0.39 | 0.79 | 0.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 52 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 53 | Malzahar | +0.36 | 1.16 | 0.80 |  |
| 54 | Amumu | +0.33 | 0.33 | 0.00 |  |
| 55 | Kindred | +0.31 | 0.31 | 0.00 |  |
| 56 | Twitch | +0.29 | 0.29 | 0.00 |  |
| 57 | Vayne | +0.29 | 0.29 | 0.00 |  |
| 58 | Zeri | +0.29 | 0.29 | 0.00 |  |
| 59 | Sona | +0.27 | 0.27 | 0.00 |  |
| 60 | Aphelios | +0.26 | 0.26 | 0.00 |  |
| 61 | Kai'Sa | +0.26 | 0.26 | 0.00 |  |
| 62 | Renata Glasc | +0.26 | 0.26 | 0.00 |  |
| 63 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 64 | Draven | +0.24 | 0.24 | 0.00 |  |
| 65 | Tristana | +0.24 | 0.24 | 0.00 |  |
| 66 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 67 | Corki | +0.22 | 0.22 | 0.00 |  |
| 68 | Elise | +0.22 | 0.22 | 0.00 |  |
| 69 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 70 | Gnar | +0.22 | 0.22 | 0.00 |  |
| 71 | Senna | +0.22 | 0.22 | 0.00 |  |
| 72 | Smolder | +0.22 | 0.22 | 0.00 |  |
| 73 | Zilean | +0.22 | 0.22 | 0.00 |  |
| 74 | Zoe | +0.22 | 0.22 | 0.00 |  |
| 75 | Hecarim | +0.21 | 0.21 | 0.00 |  |
| 76 | Illaoi | +0.20 | 0.20 | 0.00 |  |
| 77 | Jarvan IV | +0.20 | 0.20 | 0.00 |  |
| 78 | Jayce | +0.20 | 0.20 | 0.00 |  |
| 79 | Nidalee | +0.20 | 0.20 | 0.00 |  |
| 80 | Ornn | +0.20 | 0.20 | 0.00 |  |
| 81 | Sett | +0.20 | 0.20 | 0.00 |  |
| 82 | Shyvana | +0.20 | 0.20 | 0.00 |  |
| 83 | Volibear | +0.20 | 0.20 | 0.00 |  |
| 84 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 85 | Lux | +0.19 | 0.19 | 0.00 |  |
| 86 | Seraphine | +0.19 | 0.19 | 0.00 |  |
| 87 | Azir | +0.18 | 0.18 | 0.00 |  |
| 88 | Garen | +0.18 | 0.18 | 0.00 |  |
| 89 | Kog'Maw | +0.18 | 0.18 | 0.00 |  |
| 90 | Orianna | +0.18 | 0.18 | 0.00 |  |
| 91 | Soraka | +0.18 | 0.18 | 0.00 |  |
| 92 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 93 | Anivia | +0.16 | 0.16 | 0.00 |  |
| 94 | Graves | +0.16 | 0.16 | 0.00 |  |
| 95 | Zyra | +0.16 | 0.16 | 0.00 |  |
| 96 | Annie | +0.15 | 0.15 | 0.00 |  |
| 97 | Brand | +0.15 | 0.15 | 0.00 |  |
| 98 | Karma | +0.15 | 0.15 | 0.00 |  |
| 99 | LeBlanc | +0.15 | 0.15 | 0.00 |  |
| 100 | Nami | +0.15 | 0.15 | 0.00 |  |
| 101 | Neeko | +0.15 | 0.15 | 0.00 |  |
| 102 | Syndra | +0.15 | 0.15 | 0.00 |  |
| 103 | Swain | +0.14 | 0.14 | 0.00 |  |
| 104 | Heimerdinger | +0.13 | 0.13 | 0.00 |  |
| 105 | Thresh | +0.13 | 0.13 | 0.00 |  |
| 106 | Urgot | +0.10 | 0.10 | 0.00 |  |
| 107 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 108 | Varus | +0.08 | 0.30 | 0.22 |  |
| 109 | Rakan | +0.08 | 0.08 | 0.00 |  |
| 110 | Lillia | +0.07 | 0.07 | 0.00 |  |
| 111 | Irelia | +0.03 | 0.03 | 0.00 |  |
| 112 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 113 | Akali | 0.00 | 0.00 | 0.00 |  |
| 114 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 115 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 116 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 117 | Briar | 0.00 | 0.00 | 0.00 |  |
| 118 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 119 | Darius | 0.00 | 0.00 | 0.00 |  |
| 120 | Diana | 0.00 | 0.00 | 0.00 |  |
| 121 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 122 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 123 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 124 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 125 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 126 | Leona | 0.00 | 0.00 | 0.00 |  |
| 127 | Locke | 0.00 | 0.00 | 0.00 |  |
| 128 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 129 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 130 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 131 | Rell | 0.00 | 0.00 | 0.00 |  |
| 132 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 133 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 134 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 135 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 136 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 137 | Talon | 0.00 | 0.00 | 0.00 |  |
| 138 | Taric | 0.00 | 0.00 | 0.00 |  |
| 139 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 140 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 141 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 142 | Aurelion Sol | -0.01 | 0.15 | 0.16 |  |
| 143 | Quinn | -0.13 | 0.26 | 0.39 |  |
| 144 | Ivern | -0.15 | 0.13 | 0.28 |  |
| 145 | Rammus | -0.18 | 0.38 | 0.56 |  |
| 146 | Viego | -0.18 | 0.26 | 0.44 |  |
| 147 | Zac | -0.24 | 0.67 | 0.91 | dash stop (Stretching Strikes) |
| 148 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 149 | Pantheon | -0.32 | 0.68 | 1.00 |  |
| 150 | Caitlyn | -0.32 | 0.24 | 0.56 |  |
| 151 | Lucian | -0.32 | 0.24 | 0.56 |  |
| 152 | Gragas | -0.33 | 0.00 | 0.33 |  |
| 153 | Akshan | -0.34 | 0.22 | 0.56 |  |
| 154 | Miss Fortune | -0.34 | 0.22 | 0.56 |  |
| 155 | Kayn | -0.37 | 0.53 | 0.90 |  |
| 156 | Jhin | -0.38 | 0.18 | 0.56 |  |
| 157 | Vel'Koz | -0.38 | 0.18 | 0.56 |  |
| 158 | Twisted Fate | -0.41 | 0.29 | 0.70 |  |
| 159 | Karthus | -0.43 | 0.13 | 0.56 |  |
| 160 | Katarina | -0.44 | 0.12 | 0.56 |  |
| 161 | Xerath | -0.46 | 0.18 | 0.64 |  |
| 162 | Shen | -0.51 | 0.39 | 0.90 |  |
| 163 | Ryze | -0.54 | 0.16 | 0.70 |  |
| 164 | Warwick | -0.56 | 0.76 | 1.32 |  |
| 165 | Janna | -0.56 | 0.24 | 0.80 |  |
| 166 | Vi | -0.60 | 0.20 | 0.80 |  |
| 167 | Fiddlesticks | -0.77 | 0.13 | 0.90 |  |
| 168 | Taliyah | -0.78 | 0.18 | 0.96 |  |
| 169 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 170 | Nunu & Willump | -0.98 | 0.00 | 0.98 |  |
| 171 | Tahm Kench | -1.00 | 0.00 | 1.00 |  |
| 172 | Galio | -1.18 | 0.00 | 1.18 |  |
