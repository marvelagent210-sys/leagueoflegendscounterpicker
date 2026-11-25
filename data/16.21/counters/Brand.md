# Counters to Brand (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Brand: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Brand wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Brand --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.42 |
| 2 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +1.00 |
| 3 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.93 |
| 4 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.74 |
| 5 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.93 |
| 6 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.79 |
| 7 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.81 |
| 8 | Ziggs | +0.84 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.12 |
| 9 | Jayce | +0.83 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.63 |
| 10 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.86 |
| 11 | Jax | +0.83 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.52 |
| 12 | Shyvana | +0.83 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.80 |
| 13 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.23 |
| 14 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.94 |
| 15 | Zeri | +0.82 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.71 |
| 16 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.10 |
| 17 | Rumble | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +0.99 | +0.53 |
| 18 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.38 |
| 19 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.47 |
| 20 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.50 |
| 21 | Gragas | +0.82 | +0.97 | +0.97 | +1.00 | +0.15 | +1.00 | +0.20 |
| 22 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.43 |
| 23 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.01 |
| 24 | Yasuo | +0.82 | +1.00 | +0.88 | +1.00 | +0.10 | +1.00 | +0.59 |
| 25 | Lee Sin | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.33 |
| 26 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.02 |
| 27 | Sett | +0.81 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.34 |
| 28 | Sejuani | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.44 |
| 29 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.20 |
| 30 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.06 |
| 31 | Kassadin | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.38 |
| 32 | Mordekaiser | +0.81 | +0.99 | +0.97 | +1.00 | −0.04 | +1.00 | +0.47 |
| 33 | Caitlyn | +0.81 | +1.00 | +1.00 | +0.99 | +0.06 | +1.00 | −0.02 |
| 34 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.07 |
| 35 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.13 |
| 36 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.17 |
| 37 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.39 |
| 38 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.48 |
| 39 | Alistar | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.09 |
| 40 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.18 |
| 41 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.06 |
| 42 | Azir | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.23 |
| 43 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.21 | +0.15 | +0.81 |
| 44 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.11 |
| 45 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | −0.09 |
| 46 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.14 |
| 47 | Akshan | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.16 |
| 48 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | +0.65 | +0.23 |
| 49 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.21 |
| 50 | Samira | +0.78 | +0.96 | +1.00 | +1.00 | +0.03 | – | +0.07 |
| 51 | Aurora | +0.77 | +1.00 | +1.00 | +0.88 | +0.02 | – | +0.30 |
| 52 | Milio | +0.77 | +1.00 | +1.00 | +0.94 | +0.07 | – | −0.12 |
| 53 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.14 |
| 54 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.16 |
| 55 | Udyr | +0.74 | +1.00 | +1.00 | +1.00 | −0.10 | +0.07 | +1.00 |
| 56 | Ashe | +0.74 | +0.61 | +1.00 | +1.00 | +0.05 | +1.00 | +0.53 |
| 57 | Twitch | +0.73 | +1.00 | +1.00 | +0.71 | +0.06 | – | +0.16 |
| 58 | Hwei | +0.73 | +0.99 | +0.86 | +0.93 | +0.03 | – | +0.05 |
| 59 | Sion | +0.68 | +0.59 | +1.00 | +0.85 | −0.03 | +1.00 | +0.39 |
| 60 | Karma | +0.68 | +0.84 | +0.75 | +1.00 | +0.02 | – | +0.15 |
| 61 | Quinn | +0.65 | +0.86 | +0.61 | +1.00 | +0.01 | – | +0.26 |
| 62 | Rammus | +0.62 | +0.52 | +1.00 | +0.63 | −0.07 | +1.00 | +0.39 |
| 63 | Diana | +0.59 | +1.00 | +0.11 | +1.00 | +0.09 | +1.00 | −0.00 |
| 64 | Renekton | +0.54 | +1.00 | +0.20 | +1.00 | +0.00 | +0.21 | +0.37 |
| 65 | Lillia | +0.54 | +0.86 | +0.83 | +0.24 | −0.01 | +0.42 | +0.52 |
| 66 | Darius | +0.54 | +0.10 | +0.97 | +1.00 | −0.04 | +0.65 | +0.21 |
| 67 | Janna | +0.53 | +1.00 | +1.00 | −0.45 | +0.09 | +1.00 | +0.08 |
| 68 | Leona | +0.52 | +0.59 | +0.74 | +0.60 | −0.02 | +0.62 | +0.13 |
| 69 | Naafiri | +0.50 | +0.12 | +0.96 | +0.53 | +0.05 | +1.00 | +0.38 |
| 70 | Bel'Veth | +0.48 | +0.74 | +0.04 | +1.00 | −0.06 | +1.00 | −0.07 |
| 71 | Tryndamere | +0.47 | +1.00 | +0.02 | +1.00 | −0.05 | +0.02 | +0.42 |
| 72 | Cho'Gath | +0.46 | +0.11 | +1.00 | +1.00 | −0.10 | −0.05 | −0.06 |
| 73 | Galio | +0.45 | +0.41 | +0.12 | +1.00 | +0.03 | +1.00 | +0.23 |
| 74 | Sona | +0.42 | +1.00 | +1.00 | −1.00 | +0.04 | +0.98 | +0.28 |
| 75 | Rek'Sai | +0.42 | +1.00 | −0.58 | +1.00 | +0.01 | +1.00 | +0.26 |
| 76 | Jinx | +0.41 | +1.00 | +1.00 | −1.00 | +0.06 | +1.00 | −0.04 |
| 77 | Draven | +0.40 | +1.00 | +1.00 | −0.72 | +0.02 | – | +0.11 |
| 78 | Neeko | +0.39 | +0.71 | +1.00 | −0.40 | +0.02 | – | +0.03 |
| 79 | Miss Fortune | +0.38 | +1.00 | +1.00 | −1.00 | +0.06 | +0.62 | +0.23 |
| 80 | Xayah | +0.36 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.42 |
| 81 | Varus | +0.35 | +1.00 | +0.98 | −1.00 | +0.05 | – | +0.25 |
| 82 | Malzahar | +0.34 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.06 |
| 83 | Zoe | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | −0.01 |
| 84 | Smolder | +0.30 | +1.00 | −0.75 | +1.00 | +0.04 | – | +0.12 |
| 85 | Nautilus | +0.30 | +0.81 | +0.88 | −1.00 | +0.08 | +0.69 | −0.06 |
| 86 | Fiddlesticks | +0.30 | +0.08 | +0.16 | +1.00 | +0.00 | – | +0.13 |
| 87 | Zaahen | +0.30 | +0.04 | −0.09 | +1.00 | −0.07 | +1.00 | +0.38 |
| 88 | Ezreal | +0.29 | +0.12 | +0.32 | +0.72 | −0.01 | +0.34 | +0.03 |
| 89 | Malphite | +0.28 | +0.30 | −0.13 | +1.00 | −0.00 | +0.19 | +0.48 |
| 90 | Rell | +0.28 | +0.37 | +0.14 | +0.37 | +0.12 | +0.63 | +0.00 |
| 91 | Sivir | +0.28 | +0.85 | +0.92 | −1.00 | −0.02 | – | +0.34 |
| 92 | Volibear | +0.28 | −0.18 | +0.98 | −0.18 | −0.05 | +0.97 | +0.54 |
| 93 | Nami | +0.27 | +0.83 | +0.92 | −1.00 | +0.05 | – | −0.04 |
| 94 | Xin Zhao | +0.25 | +0.14 | +0.25 | +0.78 | −0.00 | −0.04 | +0.01 |
| 95 | Skarner | +0.24 | −0.08 | +0.69 | +1.00 | −0.10 | −1.00 | +0.14 |
| 96 | Mel | +0.20 | +0.85 | +0.63 | −1.00 | +0.07 | – | +0.07 |
| 97 | Yunara | +0.19 | +0.25 | −0.74 | +1.00 | +0.06 | +1.00 | +0.09 |
| 98 | Irelia | +0.19 | −0.50 | +0.42 | +1.00 | +0.04 | −0.15 | +0.29 |
| 99 | Nidalee | +0.17 | +0.55 | +0.78 | −0.87 | −0.01 | – | −0.13 |
| 100 | Singed | +0.16 | +1.00 | −0.94 | +1.00 | −0.04 | −0.62 | +0.35 |
| 101 | Zac | +0.14 | +0.18 | +0.16 | +0.16 | +0.07 | +0.14 | +0.01 |
| 102 | Lux | +0.13 | +0.44 | +0.80 | −1.00 | +0.01 | – | +0.18 |
| 103 | Wukong | +0.13 | +1.00 | −0.94 | +1.00 | −0.11 | −0.91 | +0.51 |
| 104 | Anivia | +0.11 | +0.03 | +0.02 | +0.38 | −0.04 | +0.19 | +0.27 |
| 105 | Zilean | +0.11 | +0.46 | +0.65 | −1.00 | +0.06 | – | +0.26 |
| 106 | Ornn | +0.11 | +0.02 | +0.00 | +0.51 | −0.05 | +0.03 | +0.11 |
| 107 | Braum | +0.09 | +0.26 | +0.05 | +0.01 | −0.02 | +0.01 | +0.26 |
| 108 | Kindred | +0.09 | +1.00 | −0.23 | +0.00 | −0.13 | −0.97 | +0.26 |
| 109 | Rakan | +0.08 | −0.55 | −0.39 | +1.00 | −0.01 | +1.00 | +0.38 |
| 110 | Tahm Kench | +0.08 | +0.07 | +0.07 | +0.06 | +0.12 | +0.10 | +0.07 |
| 111 | Taric | +0.07 | +0.11 | −0.05 | +0.18 | +0.03 | +0.07 | +0.09 |
| 112 | Nocturne | +0.04 | +0.44 | −0.11 | −0.15 | −0.08 | −0.26 | +0.47 |
| 113 | Shen | +0.03 | −0.01 | −0.03 | +0.05 | +0.09 | +0.06 | +0.24 |
| 114 | Syndra | +0.02 | +0.19 | +0.59 | −1.00 | +0.06 | – | +0.22 |
| 115 | Amumu | −0.00 | −0.03 | −0.03 | +0.03 | +0.01 | −0.07 | +0.23 |
| 116 | Xerath | −0.01 | +0.44 | +0.30 | −1.00 | +0.01 | – | +0.19 |
| 117 | Soraka | −0.02 | −0.02 | −0.03 | +0.01 | +0.05 | −0.09 | −0.13 |
| 118 | Ryze | −0.03 | +0.91 | −0.21 | −1.00 | +0.02 | – | −0.09 |
| 119 | Urgot | −0.03 | −0.05 | −0.08 | +0.01 | +0.01 | −0.09 | +0.15 |
| 120 | Gwen | −0.09 | −0.86 | −0.85 | +1.00 | −0.00 | +1.00 | +0.82 |
| 121 | Kennen | −0.09 | −0.56 | −0.55 | +0.88 | −0.00 | – | +0.34 |
| 122 | Illaoi | −0.13 | −0.30 | +0.25 | −0.23 | −0.04 | −0.59 | −0.07 |
| 123 | Elise | −0.13 | −0.42 | −0.41 | +0.44 | +0.02 | – | −0.05 |
| 124 | Briar | −0.14 | −0.89 | −0.90 | +1.00 | +0.01 | +1.00 | +0.18 |
| 125 | Karthus | −0.15 | −0.18 | −0.14 | −0.23 | −0.00 | −0.21 | +0.07 |
| 126 | Riven | −0.16 | −0.89 | −0.30 | +1.00 | +0.01 | −0.84 | +0.37 |
| 127 | Kalista | −0.18 | +0.02 | −0.19 | −0.68 | −0.04 | – | +0.41 |
| 128 | Viego | −0.18 | −1.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.68 |
| 129 | Aurelion Sol | −0.20 | −0.04 | −0.05 | −1.00 | +0.27 | – | −0.01 |
| 130 | Veigar | −0.21 | +0.00 | +0.04 | −1.00 | +0.01 | – | −0.04 |
| 131 | Kayn | −0.23 | −0.80 | +0.38 | −0.94 | −0.09 | +0.63 | +0.26 |
| 132 | Zyra | −0.23 | +0.05 | −0.11 | −1.00 | +0.05 | – | −0.00 |
| 133 | Vi | −0.26 | −1.00 | +1.00 | −1.00 | −0.11 | −0.43 | +0.07 |
| 134 | Senna | −0.26 | +0.01 | −0.18 | −1.00 | +0.03 | – | +0.01 |
| 135 | Ambessa | −0.27 | +1.00 | −1.00 | −0.94 | −0.03 | −0.94 | +0.37 |
| 136 | Cassiopeia | −0.28 | −0.14 | −0.08 | −1.00 | +0.04 | – | −0.05 |
| 137 | Vladimir | −0.28 | −0.58 | −0.03 | −0.51 | −0.07 | −0.29 | +0.19 |
| 138 | Fizz | −0.29 | −0.91 | −0.81 | +1.00 | −0.10 | −0.68 | +0.42 |
| 139 | Lucian | −0.30 | −0.13 | −0.34 | −0.82 | −0.04 | – | +0.33 |
| 140 | Garen | −0.32 | −0.98 | −0.40 | +0.01 | +0.03 | +0.03 | +0.38 |
| 141 | Rengar | −0.33 | −0.68 | −0.66 | −0.13 | +0.41 | −0.55 | +0.43 |
| 142 | Nilah | −0.36 | −0.58 | −0.86 | +0.24 | −0.07 | −0.55 | +0.35 |
| 143 | Blitzcrank | −0.42 | −0.26 | −0.46 | −0.86 | +0.01 | −0.71 | +0.01 |
| 144 | Aatrox | −0.47 | −0.22 | −0.61 | −0.74 | −0.19 | −0.85 | −0.04 |
| 145 | Nunu & Willump | −0.50 | −0.87 | −0.10 | −0.87 | +0.06 | −0.97 | +0.19 |
| 146 | Shaco | −0.54 | −1.00 | +0.07 | −1.00 | −0.08 | −1.00 | +0.20 |
| 147 | Ekko | −0.57 | −0.97 | −0.17 | −0.95 | −0.04 | −0.99 | +0.12 |
| 148 | Bard | −0.59 | −0.82 | −0.44 | −1.00 | −0.09 | – | −0.01 |
| 149 | Akali | −0.61 | −0.71 | −0.68 | −0.94 | −0.03 | −0.93 | +0.43 |
| 150 | Jarvan IV | −0.63 | −0.87 | −0.84 | −0.95 | +0.14 | −0.63 | +0.54 |
| 151 | Vex | −0.66 | −0.70 | −0.89 | −1.00 | −0.01 | – | +0.15 |
| 152 | Renata Glasc | −0.66 | −0.84 | −0.78 | −1.00 | +0.05 | – | +0.06 |
| 153 | Yone | −0.68 | −0.96 | −0.97 | −1.00 | −0.04 | +0.00 | +0.10 |
| 154 | Morgana | −0.69 | −0.86 | −0.87 | −1.00 | +0.01 | −0.70 | +0.11 |
| 155 | Evelynn | −0.71 | −0.96 | −0.76 | −1.00 | +0.02 | −1.00 | +0.29 |
| 156 | Locke | −0.73 | −0.87 | −0.88 | −1.00 | −0.08 | −1.00 | +0.34 |
| 157 | Seraphine | −0.74 | −0.85 | −1.00 | −1.00 | −0.02 | – | +0.03 |
| 158 | Taliyah | −0.75 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.04 |
| 159 | Viktor | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.17 |
| 160 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.18 |
| 161 | Kha'Zix | −0.77 | −1.00 | −0.92 | −1.00 | −0.07 | −0.99 | +0.38 |
| 162 | Pantheon | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −0.98 | +0.07 |
| 163 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.01 |
| 164 | Qiyana | −0.79 | −0.98 | −1.00 | −1.00 | −0.02 | −1.00 | +0.18 |
| 165 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.27 |
| 166 | Thresh | −0.79 | −0.96 | −0.96 | −1.00 | −0.07 | −0.99 | +0.01 |
| 167 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.27 |
| 168 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.24 |
| 169 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.19 |
| 170 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.38 |
| 171 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.14 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.01 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Brand's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Brand's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Brand` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.89)

- **0.60** untargetable: Playful makes Fizz untargetable, dodging Brand's Sear. Untargetable for 0.75 s; Sear takes 0.94 s to land, enough to react. (Fizz E Playful → Brand Q Sear)
- **0.55** untargetable: Playful makes Fizz untargetable, dodging Brand's Pyroclasm. Untargetable for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Fizz E Playful → Brand R Pyroclasm)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Brand's Conflagration. Untargetable for 0.75 s; Conflagration takes 1 s to land, enough to react. (Fizz E Playful → Brand E Conflagration)
- Watch out: Brand's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Mel (net +0.79)

- **0.55** projectile block: Rebuttal blocks Brand's Pyroclasm, a projectile. Rebuttal for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Mel W Rebuttal → Brand R Pyroclasm)
- **0.38** projectile block: Rebuttal blocks Brand's Sear, a projectile. Rebuttal for 0.75 s; Sear takes 0.94 s to land, enough to react. (Mel W Rebuttal → Brand Q Sear)
- **0.18** projectile block: Rebuttal blocks Brand's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Brand basic attacks)

#### 3. Samira (net +0.79)

- **0.55** projectile block: Blade Whirl blocks Brand's Pyroclasm, a projectile. Blade Whirl for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Samira W Blade Whirl → Brand R Pyroclasm)
- **0.39** projectile block: Blade Whirl blocks Brand's Sear, a projectile. Blade Whirl for 0.75 s; Sear takes 0.94 s to land, enough to react. (Samira W Blade Whirl → Brand Q Sear)
- **0.19** projectile block: Blade Whirl blocks Brand's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Brand basic attacks)

#### 4. Bard (net +0.76)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Pyroclasm. Untargetable for 2.5 s, long enough to use ahead of Pyroclasm. (Bard R Tempered Fate → Brand R Pyroclasm)
- **0.31** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Sear. Untargetable for 2.5 s, long enough to use ahead of Sear. (Bard R Tempered Fate → Brand Q Sear)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Brand's Conflagration. Untargetable for 2.5 s, long enough to use ahead of Conflagration. (Bard R Tempered Fate → Brand E Conflagration)

#### 5. Lissandra (net +0.76)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Pyroclasm. Untargetable for 2.5 s, long enough to use ahead of Pyroclasm. (Lissandra R Frozen Tomb → Brand R Pyroclasm)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Sear. Untargetable for 2.5 s, long enough to use ahead of Sear. (Lissandra R Frozen Tomb → Brand Q Sear)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Brand's Conflagration. Untargetable for 2.5 s, long enough to use ahead of Conflagration. (Lissandra R Frozen Tomb → Brand E Conflagration)

#### 6. Braum (net +0.73)

- **0.60** projectile block: Unbreakable blocks Brand's Sear, a projectile. Unbreakable for 4 s, long enough to use ahead of Sear. (Braum E Unbreakable → Brand Q Sear)
- **0.55** projectile block: Unbreakable blocks Brand's Pyroclasm, a projectile. Unbreakable for 4 s, long enough to use ahead of Pyroclasm. (Braum E Unbreakable → Brand R Pyroclasm)
- **0.31** projectile block: Unbreakable blocks Brand's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Brand basic attacks)
- Watch out: Brand's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 7. Maokai (net +0.70)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Pyroclasm. Untargetable for 1.4 s; Pyroclasm takes 1.25 s to land, enough to react. (Maokai W Twisted Advance → Brand R Pyroclasm)
- **0.53** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Sear. Untargetable for 1.4 s; Sear takes 0.94 s to land, enough to react. (Maokai W Twisted Advance → Brand Q Sear)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Brand's Conflagration. Untargetable for 1.4 s; Conflagration takes 1 s to land, enough to react. (Maokai W Twisted Advance → Brand E Conflagration)
- Watch out: Brand's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 8. Fiora (net +0.69)

- **0.55** parry: Riposte parries Brand's Pyroclasm. Parry for 0.75 s; Pyroclasm takes 1.25 s to land, enough to react. (Fiora W Riposte → Brand R Pyroclasm)
- **0.54** parry: Riposte parries Brand's Sear and stuns back. Parry for 0.75 s; Sear takes 0.94 s to land, enough to react. Negating Sear's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Brand Q Sear)
- **0.33** parry: Riposte parries Brand's Conflagration. Parry for 0.75 s; Conflagration takes 1 s to land, enough to react. (Fiora W Riposte → Brand E Conflagration)
- Watch out: Brand's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 9. Yasuo (net +0.69)

- **0.55** projectile block: Wind Wall blocks Brand's Pyroclasm, a projectile. Wind Wall for 4 s, long enough to use ahead of Pyroclasm. (Yasuo W Wind Wall → Brand R Pyroclasm)
- **0.43** projectile block: Wind Wall blocks Brand's Sear, a projectile. Wind Wall for 4 s, long enough to use ahead of Sear. (Yasuo W Wind Wall → Brand Q Sear)
- **0.24** projectile block: Wind Wall blocks Brand's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Brand basic attacks)
- Watch out: Brand's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 10. Aurora (net +0.69)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Pyroclasm. Untargetable for 0.4 s; Pyroclasm takes 1.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand R Pyroclasm)
- **0.31** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Sear. Untargetable for 0.4 s; Sear takes 0.94 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand Q Sear)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Brand's Conflagration. Untargetable for 0.4 s; Conflagration takes 1 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Brand E Conflagration)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.89 | 0.99 | 0.10 |  |
| 2 | Mel | +0.79 | 0.79 | 0.00 | projectile block (Rebuttal) |
| 3 | Samira | +0.79 | 0.79 | 0.00 | projectile block (Blade Whirl) |
| 4 | Bard | +0.76 | 0.76 | 0.00 |  |
| 5 | Lissandra | +0.76 | 0.76 | 0.00 |  |
| 6 | Braum | +0.73 | 0.95 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Maokai | +0.70 | 0.92 | 0.22 |  |
| 8 | Fiora | +0.69 | 0.91 | 0.22 |  |
| 9 | Yasuo | +0.69 | 0.83 | 0.14 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 10 | Aurora | +0.69 | 0.69 | 0.00 |  |
| 11 | Xayah | +0.69 | 0.69 | 0.00 |  |
| 12 | Sivir | +0.65 | 0.65 | 0.00 |  |
| 13 | Vladimir | +0.64 | 0.85 | 0.21 |  |
| 14 | Gwen | +0.62 | 0.84 | 0.22 |  |
| 15 | Rek'Sai | +0.62 | 0.76 | 0.14 |  |
| 16 | Evelynn | +0.61 | 0.76 | 0.15 |  |
| 17 | Shaco | +0.61 | 0.76 | 0.15 |  |
| 18 | Camille | +0.61 | 0.72 | 0.11 |  |
| 19 | Yuumi | +0.59 | 1.09 | 0.50 |  |
| 20 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 21 | Udyr | +0.55 | 0.77 | 0.22 |  |
| 22 | Master Yi | +0.54 | 0.98 | 0.44 |  |
| 23 | Zed | +0.54 | 0.69 | 0.15 |  |
| 24 | Nocturne | +0.53 | 0.75 | 0.22 |  |
| 25 | Morgana | +0.40 | 0.51 | 0.11 |  |
| 26 | Milio | +0.36 | 0.36 | 0.00 |  |
| 27 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 28 | Kled | +0.28 | 0.36 | 0.08 |  |
| 29 | Kalista | +0.28 | 0.28 | 0.00 |  |
| 30 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 31 | Zaahen | +0.24 | 0.38 | 0.14 |  |
| 32 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 33 | Kayn | +0.17 | 0.76 | 0.59 |  |
| 34 | Xin Zhao | +0.17 | 0.38 | 0.21 |  |
| 35 | Alistar | +0.09 | 0.31 | 0.22 |  |
| 36 | Annie | +0.08 | 0.08 | 0.00 |  |
| 37 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 38 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 39 | Rengar | +0.05 | 0.49 | 0.44 |  |
| 40 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 41 | Jax | +0.01 | 0.23 | 0.22 |  |
| 42 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 43 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 44 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 45 | Azir | 0.00 | 0.00 | 0.00 |  |
| 46 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 47 | Corki | 0.00 | 0.00 | 0.00 |  |
| 48 | Draven | 0.00 | 0.00 | 0.00 |  |
| 49 | Elise | 0.00 | 0.00 | 0.00 |  |
| 50 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 51 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 52 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 53 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 54 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 55 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 56 | Karma | 0.00 | 0.00 | 0.00 |  |
| 57 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 58 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 59 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 60 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 61 | Lux | 0.00 | 0.00 | 0.00 |  |
| 62 | Nami | 0.00 | 0.00 | 0.00 |  |
| 63 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 64 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 65 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 66 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 67 | Senna | 0.00 | 0.00 | 0.00 |  |
| 68 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 69 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 70 | Sona | 0.00 | 0.00 | 0.00 |  |
| 71 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 72 | Swain | 0.00 | 0.00 | 0.00 |  |
| 73 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 74 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 75 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 76 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 77 | Vex | 0.00 | 0.00 | 0.00 |  |
| 78 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 79 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 80 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 81 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 82 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 83 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 84 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 85 | Gangplank | -0.01 | 0.43 | 0.44 |  |
| 86 | Malzahar | -0.01 | 0.39 | 0.40 |  |
| 87 | Thresh | -0.04 | 0.00 | 0.04 |  |
| 88 | Graves | -0.05 | 0.00 | 0.05 |  |
| 89 | Olaf | -0.06 | 0.38 | 0.44 |  |
| 90 | Malphite | -0.08 | 0.14 | 0.22 |  |
| 91 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 92 | Garen | -0.10 | 0.31 | 0.41 |  |
| 93 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 94 | Aurelion Sol | -0.10 | 0.00 | 0.10 |  |
| 95 | Jarvan IV | -0.10 | 0.00 | 0.10 |  |
| 96 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 97 | Yone | -0.10 | 0.00 | 0.10 |  |
| 98 | Briar | -0.11 | 0.00 | 0.11 |  |
| 99 | K'Sante | -0.11 | 0.00 | 0.11 |  |
| 100 | Urgot | -0.11 | 0.00 | 0.11 |  |
| 101 | Varus | -0.11 | 0.00 | 0.11 |  |
| 102 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 103 | Pantheon | -0.14 | 0.51 | 0.65 |  |
| 104 | Hecarim | -0.14 | 0.00 | 0.14 |  |
| 105 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 106 | Ornn | -0.14 | 0.00 | 0.14 |  |
| 107 | Rell | -0.14 | 0.00 | 0.14 |  |
| 108 | Akali | -0.15 | 0.00 | 0.15 |  |
| 109 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 110 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 111 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 112 | Lee Sin | -0.15 | 0.00 | 0.15 |  |
| 113 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 114 | Riven | -0.15 | 0.00 | 0.15 |  |
| 115 | Talon | -0.15 | 0.00 | 0.15 |  |
| 116 | Volibear | -0.15 | 0.00 | 0.15 |  |
| 117 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 118 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 119 | Sion | -0.20 | 0.39 | 0.59 |  |
| 120 | Aatrox | -0.21 | 0.00 | 0.21 |  |
| 121 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 122 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 123 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 124 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 125 | Diana | -0.22 | 0.00 | 0.22 |  |
| 126 | Illaoi | -0.22 | 0.00 | 0.22 |  |
| 127 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 128 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 129 | Leona | -0.22 | 0.00 | 0.22 |  |
| 130 | Locke | -0.22 | 0.00 | 0.22 |  |
| 131 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 132 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 133 | Sett | -0.22 | 0.00 | 0.22 |  |
| 134 | Shyvana | -0.22 | 0.00 | 0.22 |  |
| 135 | Quinn | -0.23 | 0.00 | 0.23 |  |
| 136 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 137 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 138 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 141 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 142 | Xerath | -0.33 | 0.00 | 0.33 |  |
| 143 | Rammus | -0.35 | 0.22 | 0.57 |  |
| 144 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 145 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 146 | Viego | -0.35 | 0.00 | 0.35 |  |
| 147 | Mordekaiser | -0.36 | 0.05 | 0.41 |  |
| 148 | Skarner | -0.37 | 0.07 | 0.44 |  |
| 149 | Shen | -0.38 | 0.22 | 0.60 |  |
| 150 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 151 | Janna | -0.40 | 0.00 | 0.40 |  |
| 152 | Darius | -0.41 | 0.00 | 0.41 |  |
| 153 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 154 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 155 | Gragas | -0.42 | 0.00 | 0.42 |  |
| 156 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 157 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 158 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 159 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 160 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 161 | Singed | -0.44 | 0.00 | 0.44 |  |
| 162 | Taric | -0.44 | 0.00 | 0.44 |  |
| 163 | Warwick | -0.46 | 0.39 | 0.85 |  |
| 164 | Fiddlesticks | -0.47 | 0.00 | 0.47 |  |
| 165 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 166 | Katarina | -0.50 | 0.00 | 0.50 |  |
| 167 | Naafiri | -0.56 | 0.00 | 0.56 |  |
| 168 | Vi | -0.65 | 0.00 | 0.65 |  |
| 169 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 170 | Zac | -0.71 | 0.00 | 0.71 |  |
| 171 | Galio | -0.74 | 0.00 | 0.74 |  |
| 172 | Nunu & Willump | -0.76 | 0.17 | 0.93 |  |
