# Counters to Hwei (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Hwei: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Hwei wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Hwei --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Rengar | +0.86 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | +0.22 |
| 2 | Sylas | +0.84 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.21 |
| 3 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.90 |
| 4 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.64 |
| 5 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.60 |
| 6 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.50 |
| 7 | Riven | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.30 |
| 8 | Nocturne | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.50 |
| 9 | Galio | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.01 |
| 10 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.48 |
| 11 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.04 |
| 12 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.41 |
| 13 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.15 |
| 14 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.35 |
| 15 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.35 |
| 16 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.46 |
| 17 | Camille | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | −0.02 |
| 18 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.01 |
| 19 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.15 |
| 20 | Lulu | +0.79 | +1.00 | +1.00 | +0.99 | +0.02 | – | +0.18 |
| 21 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +0.98 | −0.06 | +0.89 | +0.20 |
| 22 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.16 |
| 23 | Caitlyn | +0.78 | +1.00 | +1.00 | +0.98 | +0.02 | +0.90 | −0.13 |
| 24 | Tristana | +0.78 | +0.98 | +0.97 | +1.00 | −0.00 | +1.00 | −0.06 |
| 25 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.07 |
| 26 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.02 |
| 27 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.16 |
| 28 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.37 |
| 29 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.02 |
| 30 | Zaahen | +0.77 | +0.87 | +1.00 | +1.00 | −0.07 | +1.00 | +0.18 |
| 31 | Aurora | +0.76 | +1.00 | +1.00 | +0.92 | +0.01 | – | +0.04 |
| 32 | Graves | +0.76 | +1.00 | +1.00 | +0.70 | +0.15 | +1.00 | −0.04 |
| 33 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.10 |
| 34 | Fizz | +0.74 | +0.83 | +1.00 | +1.00 | −0.04 | +0.86 | +0.12 |
| 35 | Jayce | +0.74 | +1.00 | +1.00 | +1.00 | −0.00 | +0.37 | +0.09 |
| 36 | Corki | +0.74 | +1.00 | +1.00 | +0.86 | −0.04 | – | −0.01 |
| 37 | Lucian | +0.74 | +0.85 | +1.00 | +1.00 | −0.01 | – | +0.06 |
| 38 | Kled | +0.74 | +1.00 | +1.00 | +0.63 | +0.09 | +1.00 | −0.04 |
| 39 | Aphelios | +0.73 | +1.00 | +1.00 | +0.81 | +0.01 | – | −0.06 |
| 40 | Akshan | +0.72 | +1.00 | +0.99 | +0.75 | −0.03 | – | +0.11 |
| 41 | Quinn | +0.72 | +0.91 | +0.95 | +0.98 | −0.02 | – | −0.17 |
| 42 | Kalista | +0.71 | +0.85 | +0.93 | +1.00 | −0.00 | – | −0.06 |
| 43 | Xayah | +0.71 | +0.99 | +0.85 | +0.79 | +0.01 | – | +0.34 |
| 44 | Swain | +0.67 | +0.94 | +0.71 | +0.92 | +0.07 | – | −0.15 |
| 45 | Milio | +0.67 | +1.00 | +1.00 | +0.49 | +0.03 | – | −0.09 |
| 46 | Orianna | +0.64 | +0.65 | +1.00 | +0.79 | −0.00 | – | +0.18 |
| 47 | Bel'Veth | +0.64 | +0.42 | +1.00 | +1.00 | −0.01 | +1.00 | −0.24 |
| 48 | Neeko | +0.64 | +0.89 | +1.00 | +0.47 | +0.03 | – | −0.01 |
| 49 | Mordekaiser | +0.62 | +0.60 | +0.84 | +0.87 | −0.08 | +0.96 | +0.07 |
| 50 | Udyr | +0.62 | +1.00 | +1.00 | +0.11 | −0.06 | +1.00 | +0.18 |
| 51 | Annie | +0.61 | +0.99 | +1.00 | +0.20 | +0.04 | – | +0.11 |
| 52 | Vi | +0.58 | +1.00 | +1.00 | +0.00 | −0.03 | +1.00 | −0.24 |
| 53 | Kennen | +0.58 | +1.00 | +1.00 | +0.10 | +0.03 | – | +0.00 |
| 54 | Renekton | +0.57 | +0.51 | +1.00 | +1.00 | −0.01 | −0.09 | −0.03 |
| 55 | Ashe | +0.54 | +0.95 | +0.95 | −0.03 | +0.01 | – | +0.33 |
| 56 | Lillia | +0.54 | +0.98 | +0.97 | +0.08 | +0.06 | +0.15 | +0.28 |
| 57 | Twitch | +0.50 | +1.00 | +1.00 | −0.34 | +0.09 | – | +0.08 |
| 58 | Samira | +0.49 | +0.72 | +0.64 | +0.50 | −0.02 | – | +0.12 |
| 59 | Twisted Fate | +0.49 | +1.00 | +1.00 | −0.22 | −0.05 | – | −0.18 |
| 60 | Viego | +0.48 | +0.53 | +1.00 | +0.03 | −0.02 | +0.91 | −0.00 |
| 61 | Draven | +0.46 | +1.00 | +1.00 | −0.41 | −0.00 | – | −0.05 |
| 62 | Vel'Koz | +0.45 | +0.91 | +0.99 | −0.45 | +0.24 | – | −0.36 |
| 63 | Gwen | +0.44 | +1.00 | +1.00 | +0.14 | −0.08 | −0.93 | +0.34 |
| 64 | Volibear | +0.41 | +0.60 | +1.00 | −0.20 | −0.16 | +0.61 | +0.27 |
| 65 | Lee Sin | +0.39 | +0.03 | +1.00 | +1.00 | −0.07 | −0.63 | +0.06 |
| 66 | Rakan | +0.37 | +1.00 | +0.10 | −0.04 | −0.01 | +0.98 | +0.14 |
| 67 | Rumble | +0.37 | +0.98 | +1.00 | −1.00 | −0.07 | +0.75 | +0.22 |
| 68 | Aatrox | +0.34 | +0.96 | +0.83 | +0.07 | −0.12 | −0.97 | −0.13 |
| 69 | Varus | +0.34 | +0.81 | +0.81 | −0.50 | −0.06 | – | +0.15 |
| 70 | Yone | +0.33 | +1.00 | +0.21 | +0.18 | −0.09 | +0.17 | −0.25 |
| 71 | Shyvana | +0.32 | +1.00 | −0.65 | +0.72 | −0.09 | +1.00 | −0.02 |
| 72 | Sivir | +0.31 | +0.88 | +1.00 | −0.98 | −0.05 | – | +0.31 |
| 73 | Tryndamere | +0.30 | −1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.12 |
| 74 | Xin Zhao | +0.28 | +0.80 | +0.56 | +0.05 | +0.09 | −0.72 | −0.29 |
| 75 | Ziggs | +0.24 | +0.46 | +1.00 | −0.83 | +0.10 | – | +0.04 |
| 76 | Nilah | +0.23 | −0.39 | +0.13 | +1.00 | −0.02 | +1.00 | −0.03 |
| 77 | Darius | +0.22 | −0.60 | +1.00 | +0.16 | −0.07 | +1.00 | −0.03 |
| 78 | Miss Fortune | +0.22 | +0.76 | +0.77 | −1.00 | +0.04 | – | +0.13 |
| 79 | Zoe | +0.21 | +0.08 | +0.52 | +0.22 | −0.03 | – | +0.07 |
| 80 | Rammus | +0.21 | +1.00 | +1.00 | −1.00 | −0.01 | −1.00 | +0.21 |
| 81 | Shaco | +0.19 | +0.35 | +0.07 | +0.00 | −0.09 | +1.00 | −0.07 |
| 82 | Zeri | +0.18 | +0.30 | +1.00 | −1.00 | +0.06 | – | +0.60 |
| 83 | Smolder | +0.15 | −0.03 | +0.47 | +0.05 | +0.08 | – | +0.13 |
| 84 | Azir | +0.11 | +0.19 | +1.00 | −1.00 | −0.05 | – | +0.13 |
| 85 | Sett | +0.10 | −0.16 | +1.00 | −0.78 | −0.10 | +0.58 | +0.11 |
| 86 | Diana | +0.10 | +0.11 | +0.13 | +0.11 | +0.09 | +0.12 | −0.13 |
| 87 | Taric | +0.07 | +0.04 | +0.18 | +0.04 | −0.02 | +0.06 | −0.03 |
| 88 | Briar | +0.05 | −0.33 | −0.34 | +1.00 | −0.22 | +0.39 | +0.14 |
| 89 | Kai'Sa | +0.03 | +0.08 | +0.10 | +0.00 | −0.12 | – | −0.00 |
| 90 | Aurelion Sol | +0.03 | +0.09 | −0.01 | −0.07 | +0.13 | – | −0.03 |
| 91 | Rek'Sai | +0.02 | −0.05 | +0.10 | +0.10 | −0.09 | +0.02 | −0.01 |
| 92 | Jax | +0.02 | −0.96 | +1.00 | +0.00 | +0.05 | +0.00 | +0.09 |
| 93 | Tahm Kench | −0.00 | +0.02 | +0.02 | −0.05 | +0.10 | −0.05 | −0.22 |
| 94 | Singed | −0.01 | +0.09 | +0.01 | +0.01 | −0.26 | −0.01 | +0.01 |
| 95 | Sion | −0.02 | −0.03 | −0.00 | −0.02 | +0.00 | −0.02 | +0.00 |
| 96 | Rell | −0.03 | −0.02 | −0.00 | −0.01 | +0.04 | −0.11 | −0.23 |
| 97 | Jinx | −0.04 | +0.53 | +0.09 | −1.00 | +0.04 | – | +0.01 |
| 98 | Urgot | −0.05 | −0.02 | −0.05 | −0.02 | −0.01 | −0.10 | −0.30 |
| 99 | Anivia | −0.05 | −0.05 | −0.06 | −0.10 | −0.06 | – | +0.13 |
| 100 | Wukong | −0.07 | +1.00 | −0.90 | −1.00 | −0.02 | +1.00 | +0.11 |
| 101 | Alistar | −0.09 | −0.07 | +0.09 | +0.05 | −0.04 | −1.00 | +0.03 |
| 102 | Ornn | −0.09 | −0.16 | −0.07 | −0.07 | −0.05 | −0.08 | −0.07 |
| 103 | Gragas | −0.09 | +0.12 | +0.08 | −0.18 | −0.07 | −0.98 | +0.04 |
| 104 | Malzahar | −0.10 | +0.17 | +0.28 | −1.00 | −0.02 | – | +0.01 |
| 105 | Braum | −0.11 | −0.06 | −0.05 | +0.04 | −0.04 | −0.89 | +0.07 |
| 106 | Karma | −0.11 | −0.94 | +0.07 | +0.53 | −0.01 | – | +0.23 |
| 107 | Zac | −0.12 | −0.13 | −0.08 | −0.01 | −0.20 | −0.09 | −0.47 |
| 108 | Shen | −0.12 | −0.15 | −0.18 | −0.12 | −0.01 | −0.17 | +0.06 |
| 109 | Zilean | −0.18 | +0.75 | −0.75 | −0.82 | −0.05 | – | +0.20 |
| 110 | Ekko | −0.19 | −0.04 | −0.23 | −0.15 | −0.11 | −0.72 | −0.17 |
| 111 | Jarvan IV | −0.19 | −0.98 | +1.00 | −0.96 | +0.00 | −0.15 | +0.18 |
| 112 | Nunu & Willump | −0.25 | −0.17 | −0.21 | −0.63 | −0.01 | −0.27 | −0.01 |
| 113 | Amumu | −0.26 | −0.01 | −0.14 | −0.99 | −0.01 | −0.22 | +0.02 |
| 114 | Kindred | −0.26 | −0.90 | +0.76 | −1.00 | −0.01 | – | +0.07 |
| 115 | Skarner | −0.26 | +0.13 | +0.13 | −0.97 | −0.12 | −1.00 | −0.23 |
| 116 | Irelia | −0.27 | −0.69 | −1.00 | +0.27 | −0.00 | +0.97 | +0.10 |
| 117 | Kassadin | −0.30 | −1.00 | +1.00 | −1.00 | −0.01 | −1.00 | +0.10 |
| 118 | Karthus | −0.33 | −0.15 | −0.43 | −0.91 | +0.05 | −0.09 | −0.01 |
| 119 | Ryze | −0.37 | +0.37 | −0.85 | −0.97 | −0.01 | – | −0.30 |
| 120 | Soraka | −0.37 | −0.35 | −0.88 | −0.14 | +0.02 | – | −0.12 |
| 121 | Illaoi | −0.41 | −0.40 | +0.03 | −0.99 | −0.07 | −0.97 | −0.17 |
| 122 | Janna | −0.42 | −0.07 | −0.83 | −0.80 | +0.03 | – | +0.05 |
| 123 | Akali | −0.42 | −0.91 | −0.07 | −0.71 | −0.04 | −0.30 | +0.06 |
| 124 | Senna | −0.43 | −0.48 | −0.44 | −0.83 | +0.05 | – | −0.02 |
| 125 | Xerath | −0.45 | −0.86 | +0.02 | −1.00 | +0.02 | – | +0.09 |
| 126 | Malphite | −0.47 | −0.75 | −0.51 | −0.80 | −0.03 | +0.01 | +0.16 |
| 127 | Nidalee | −0.47 | −0.66 | −0.26 | −0.91 | −0.05 | – | −0.11 |
| 128 | Bard | −0.51 | −0.12 | −0.85 | −1.00 | −0.04 | – | −0.25 |
| 129 | Fiddlesticks | −0.52 | −1.00 | −0.03 | −1.00 | +0.01 | – | −0.25 |
| 130 | Elise | −0.53 | −0.89 | −1.00 | +0.00 | +0.00 | – | −0.03 |
| 131 | Garen | −0.53 | −0.69 | −1.00 | +0.00 | −0.01 | −1.00 | −0.06 |
| 132 | Naafiri | −0.57 | −0.05 | −1.00 | −1.00 | +0.03 | −1.00 | −0.15 |
| 133 | Kayn | −0.57 | −0.93 | −0.94 | −0.04 | −0.06 | −0.83 | −0.10 |
| 134 | Ambessa | −0.59 | −1.00 | −1.00 | −1.00 | −0.05 | +1.00 | +0.29 |
| 135 | Zyra | −0.59 | −0.39 | −0.97 | −1.00 | +0.01 | – | +0.10 |
| 136 | Sona | −0.61 | −0.69 | −0.74 | −1.00 | +0.02 | – | +0.22 |
| 137 | Warwick | −0.61 | −1.00 | −1.00 | +0.00 | −0.06 | −1.00 | +0.03 |
| 138 | Nami | −0.62 | −0.74 | −0.69 | −1.00 | +0.00 | – | +0.04 |
| 139 | Kha'Zix | −0.62 | −0.59 | −0.99 | −0.58 | −0.12 | −0.98 | +0.13 |
| 140 | Mel | −0.62 | −0.97 | −0.51 | −1.00 | +0.05 | – | +0.06 |
| 141 | Cassiopeia | −0.63 | −1.00 | −0.94 | −0.35 | +0.02 | – | −0.23 |
| 142 | Ezreal | −0.65 | −0.78 | −0.76 | −1.00 | −0.02 | – | −0.01 |
| 143 | Vladimir | −0.66 | −1.00 | −0.92 | −0.43 | −0.09 | −0.78 | −0.07 |
| 144 | Leona | −0.66 | −1.00 | −0.41 | −1.00 | −0.04 | −0.91 | −0.24 |
| 145 | Morgana | −0.71 | −0.77 | −0.89 | −0.98 | −0.03 | −0.92 | −0.01 |
| 146 | Sejuani | −0.71 | −1.00 | −1.00 | −1.00 | −0.07 | +0.00 | +0.04 |
| 147 | Maokai | −0.72 | −1.00 | −1.00 | −1.00 | −0.16 | +0.05 | −0.02 |
| 148 | Brand | −0.73 | −0.86 | −0.99 | −0.93 | −0.03 | – | −0.05 |
| 149 | Veigar | −0.73 | −1.00 | −0.81 | −1.00 | −0.03 | – | −0.02 |
| 150 | Seraphine | −0.73 | −0.87 | −0.90 | −1.00 | −0.07 | – | −0.18 |
| 151 | Syndra | −0.75 | −1.00 | −1.00 | −0.94 | +0.03 | – | +0.11 |
| 152 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.03 |
| 153 | Lux | −0.76 | −0.98 | −0.97 | −1.00 | +0.01 | – | −0.03 |
| 154 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.19 |
| 155 | Renata Glasc | −0.77 | −0.99 | −0.98 | −1.00 | +0.02 | – | −0.09 |
| 156 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.18 |
| 157 | Vex | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.08 |
| 158 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.11 |
| 159 | Evelynn | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.04 |
| 160 | Cho'Gath | −0.78 | −0.96 | −0.90 | −0.97 | −0.07 | −1.00 | −0.16 |
| 161 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.09 |
| 162 | Locke | −0.79 | −0.96 | −0.96 | −0.95 | −0.10 | −1.00 | −0.06 |
| 163 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.09 |
| 164 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.29 |
| 165 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.02 |
| 166 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.30 |
| 167 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.09 |
| 168 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.02 |
| 169 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.02 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.08 |
| 171 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.01 |
| 172 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.05 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Hwei's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Hwei's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Hwei` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +1.03)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 1.4 s; Gaze of the Abyss takes 0.78 s to land, enough to react. (Maokai W Twisted Advance → Hwei W Gaze of the Abyss)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Grim Visage. Untargetable for 1.4 s; Grim Visage takes 1.1 s to land, enough to react. (Maokai W Twisted Advance → Hwei Q Grim Visage)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Hwei's Spiraling Despair. Untargetable for 1.4 s; Spiraling Despair takes 1.21 s to land, enough to react. (Maokai W Twisted Advance → Hwei R Spiraling Despair)
- Watch out: Hwei's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 2. Udyr (net +0.96)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Gaze of the Abyss (root). Immune for 1.5 s, long enough to use ahead of Gaze of the Abyss. (Udyr E Blazing Stampede → Hwei W Gaze of the Abyss)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Grim Visage (fear, knockdown, slow). Immune for 1.5 s, long enough to use ahead of Grim Visage. (Udyr E Blazing Stampede → Hwei Q Grim Visage)
- **0.45** cc immunity: Blazing Stampede makes Udyr immune to Hwei's Crushing Maw (airborne, slow). Immune for 1.5 s, long enough to use ahead of Crushing Maw. (Udyr E Blazing Stampede → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

#### 3. Mel (net +0.94)

- **0.55** projectile block: Rebuttal blocks Hwei's Spiraling Despair, a projectile. Rebuttal for 0.75 s; Spiraling Despair takes 1.21 s to land, enough to react. (Mel W Rebuttal → Hwei R Spiraling Despair)
- **0.44** projectile block: Rebuttal blocks Hwei's Gaze of the Abyss, a projectile. Rebuttal for 0.75 s; Gaze of the Abyss takes 0.78 s to land, enough to react. (Mel W Rebuttal → Hwei W Gaze of the Abyss)
- **0.44** projectile block: Rebuttal blocks Hwei's Grim Visage, a projectile. Rebuttal for 0.75 s; Grim Visage takes 1.1 s to land, enough to react. (Mel W Rebuttal → Hwei Q Grim Visage)

#### 4. Nocturne (net +0.92)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Hwei's Gaze of the Abyss. Spell shield for 1.5 s, long enough to use ahead of Gaze of the Abyss. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei W Gaze of the Abyss)
- **0.63** spell shield: Shroud of Darkness's spell shield blocks Hwei's Grim Visage. Spell shield for 1.5 s, long enough to use ahead of Grim Visage. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei Q Grim Visage)
- **0.41** spell shield: Shroud of Darkness's spell shield blocks Hwei's Crushing Maw. Spell shield for 1.5 s, long enough to use ahead of Crushing Maw. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 425 units farther than Nocturne's (550 vs 125 attack range).

#### 5. Sivir (net +0.88)

- **0.51** spell shield: Spell Shield's spell shield blocks Hwei's Gaze of the Abyss. Spell shield for 1.5 s, long enough to use ahead of Gaze of the Abyss. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei W Gaze of the Abyss)
- **0.51** spell shield: Spell Shield's spell shield blocks Hwei's Grim Visage. Spell shield for 1.5 s, long enough to use ahead of Grim Visage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei Q Grim Visage)
- **0.33** spell shield: Spell Shield's spell shield blocks Hwei's Crushing Maw. Spell shield for 1.5 s, long enough to use ahead of Crushing Maw. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hwei E Crushing Maw)

#### 6. Lissandra (net +0.84)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Spiraling Despair. Untargetable for 2.5 s, long enough to use ahead of Spiraling Despair. (Lissandra R Frozen Tomb → Hwei R Spiraling Despair)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 2.5 s, long enough to use ahead of Gaze of the Abyss. (Lissandra R Frozen Tomb → Hwei W Gaze of the Abyss)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hwei's Grim Visage. Untargetable for 2.5 s, long enough to use ahead of Grim Visage. (Lissandra R Frozen Tomb → Hwei Q Grim Visage)

#### 7. Vladimir (net +0.83)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Spiraling Despair. Untargetable for 2 s, long enough to use ahead of Spiraling Despair. (Vladimir W Sanguine Pool → Hwei R Spiraling Despair)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 2 s, long enough to use ahead of Gaze of the Abyss. (Vladimir W Sanguine Pool → Hwei W Gaze of the Abyss)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hwei's Grim Visage. Untargetable for 2 s, long enough to use ahead of Grim Visage. (Vladimir W Sanguine Pool → Hwei Q Grim Visage)
- Watch out: Hwei's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 8. Morgana (net +0.81)

- **0.54** cc immunity: Black Shield makes Morgana immune to Hwei's Gaze of the Abyss (root). Immune for 5 s, long enough to use ahead of Gaze of the Abyss. (Morgana E Black Shield → Hwei W Gaze of the Abyss)
- **0.54** cc immunity: Black Shield makes Morgana immune to Hwei's Grim Visage (fear, knockdown, slow). Immune for 5 s, long enough to use ahead of Grim Visage. (Morgana E Black Shield → Hwei Q Grim Visage)
- **0.35** cc immunity: Black Shield makes Morgana immune to Hwei's Crushing Maw (airborne, slow). Immune for 5 s, long enough to use ahead of Crushing Maw. (Morgana E Black Shield → Hwei E Crushing Maw)
- Watch out: Hwei's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 9. Yuumi (net +0.78)

- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for ?; Gaze of the Abyss takes 0.78 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei W Gaze of the Abyss)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Grim Visage. Untargetable for ?; Grim Visage takes 1.1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei Q Grim Visage)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Hwei's Spiraling Despair. Untargetable for ?; Spiraling Despair takes 1.21 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Hwei R Spiraling Despair)
- Watch out: Grim Visage's fear interrupts Yuumi's Final Chapter (normal channel).

#### 10. Xayah (net +0.76)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Spiraling Despair. Untargetable for 1.5 s, long enough to use ahead of Spiraling Despair. (Xayah R Featherstorm → Hwei R Spiraling Despair)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Gaze of the Abyss. Untargetable for 1.5 s, long enough to use ahead of Gaze of the Abyss. (Xayah R Featherstorm → Hwei W Gaze of the Abyss)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Hwei's Grim Visage. Untargetable for 1.5 s, long enough to use ahead of Grim Visage. (Xayah R Featherstorm → Hwei Q Grim Visage)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.03 | 1.26 | 0.23 |  |
| 2 | Udyr | +0.96 | 1.19 | 0.23 |  |
| 3 | Mel | +0.94 | 0.94 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal), projectile block (Rebuttal) |
| 4 | Nocturne | +0.92 | 1.15 | 0.23 |  |
| 5 | Sivir | +0.88 | 0.88 | 0.00 |  |
| 6 | Lissandra | +0.84 | 0.84 | 0.00 |  |
| 7 | Vladimir | +0.83 | 1.02 | 0.19 |  |
| 8 | Morgana | +0.81 | 0.92 | 0.11 |  |
| 9 | Yuumi | +0.78 | 1.26 | 0.48 |  |
| 10 | Xayah | +0.76 | 0.76 | 0.00 |  |
| 11 | Master Yi | +0.73 | 1.17 | 0.44 |  |
| 12 | Braum | +0.70 | 1.28 | 0.58 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 13 | Yasuo | +0.70 | 1.02 | 0.32 | projectile block (Wind Wall), projectile block (Wind Wall), projectile block (Wind Wall) |
| 14 | Fiora | +0.64 | 1.17 | 0.53 |  |
| 15 | Fizz | +0.60 | 1.26 | 0.66 |  |
| 16 | Zed | +0.60 | 0.75 | 0.15 |  |
| 17 | Kayle | +0.60 | 0.60 | 0.00 |  |
| 18 | Samira | +0.55 | 0.96 | 0.41 | projectile block (Blade Whirl), projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 19 | Bard | +0.54 | 0.84 | 0.30 |  |
| 20 | Milio | +0.45 | 0.45 | 0.00 |  |
| 21 | Gwen | +0.36 | 0.99 | 0.63 |  |
| 22 | Gangplank | +0.32 | 0.78 | 0.46 |  |
| 23 | Rek'Sai | +0.30 | 0.84 | 0.54 |  |
| 24 | Shaco | +0.28 | 0.83 | 0.55 |  |
| 25 | Kalista | +0.21 | 0.43 | 0.22 |  |
| 26 | Lulu | +0.21 | 0.21 | 0.00 |  |
| 27 | Malzahar | +0.20 | 0.60 | 0.40 |  |
| 28 | Teemo | +0.14 | 0.30 | 0.16 |  |
| 29 | Evelynn | +0.12 | 0.83 | 0.71 |  |
| 30 | Aphelios | +0.12 | 0.12 | 0.00 |  |
| 31 | Heimerdinger | +0.12 | 0.12 | 0.00 |  |
| 32 | Olaf | +0.11 | 0.57 | 0.46 |  |
| 33 | Kayn | +0.10 | 0.83 | 0.73 |  |
| 34 | Zaahen | +0.08 | 0.57 | 0.49 |  |
| 35 | Garen | +0.08 | 0.51 | 0.43 |  |
| 36 | Annie | +0.08 | 0.08 | 0.00 |  |
| 37 | Vex | +0.07 | 0.07 | 0.00 |  |
| 38 | Sion | +0.04 | 0.60 | 0.56 |  |
| 39 | Aurora | +0.01 | 0.76 | 0.75 |  |
| 40 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 41 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 42 | Brand | 0.00 | 0.00 | 0.00 |  |
| 43 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 44 | Draven | 0.00 | 0.00 | 0.00 |  |
| 45 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 46 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 47 | Karma | 0.00 | 0.00 | 0.00 |  |
| 48 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 49 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 50 | Lux | 0.00 | 0.00 | 0.00 |  |
| 51 | Nami | 0.00 | 0.00 | 0.00 |  |
| 52 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 53 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 54 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 55 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 56 | Sona | 0.00 | 0.00 | 0.00 |  |
| 57 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 58 | Swain | 0.00 | 0.00 | 0.00 |  |
| 59 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 60 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 61 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 62 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 63 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 64 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 65 | Malphite | -0.01 | 0.22 | 0.23 |  |
| 66 | Camille | -0.02 | 0.79 | 0.81 |  |
| 67 | Tristana | -0.03 | 0.27 | 0.30 |  |
| 68 | Rengar | -0.11 | 0.95 | 1.06 |  |
| 69 | Varus | -0.11 | 0.00 | 0.11 |  |
| 70 | Kled | -0.13 | 0.55 | 0.68 |  |
| 71 | Warwick | -0.14 | 0.66 | 0.80 |  |
| 72 | Mordekaiser | -0.14 | 0.29 | 0.43 |  |
| 73 | Sett | -0.16 | 0.07 | 0.23 |  |
| 74 | Shyvana | -0.16 | 0.07 | 0.23 |  |
| 75 | Alistar | -0.17 | 0.46 | 0.63 |  |
| 76 | Xin Zhao | -0.20 | 0.41 | 0.61 |  |
| 77 | Neeko | -0.22 | 0.00 | 0.22 |  |
| 78 | Senna | -0.22 | 0.00 | 0.22 |  |
| 79 | Twitch | -0.22 | 0.00 | 0.22 |  |
| 80 | Pantheon | -0.23 | 0.58 | 0.81 |  |
| 81 | Nasus | -0.23 | 0.23 | 0.46 |  |
| 82 | Caitlyn | -0.23 | 0.18 | 0.41 |  |
| 83 | Elise | -0.23 | 0.00 | 0.23 |  |
| 84 | Jayce | -0.23 | 0.00 | 0.23 |  |
| 85 | Kassadin | -0.23 | 0.00 | 0.23 |  |
| 86 | Nidalee | -0.23 | 0.00 | 0.23 |  |
| 87 | Rammus | -0.27 | 0.23 | 0.50 |  |
| 88 | Hecarim | -0.27 | 0.07 | 0.34 |  |
| 89 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 90 | Kindred | -0.28 | 0.00 | 0.28 |  |
| 91 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 92 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 93 | Yunara | -0.28 | 0.00 | 0.28 |  |
| 94 | Jax | -0.29 | 0.24 | 0.53 |  |
| 95 | Illaoi | -0.30 | 0.07 | 0.37 |  |
| 96 | Corki | -0.30 | 0.00 | 0.30 |  |
| 97 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 98 | Skarner | -0.31 | 0.15 | 0.46 |  |
| 99 | K'Sante | -0.32 | 0.14 | 0.46 |  |
| 100 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 101 | Volibear | -0.33 | 0.07 | 0.40 |  |
| 102 | Aurelion Sol | -0.34 | 0.00 | 0.34 |  |
| 103 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 104 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 105 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 106 | Yone | -0.36 | 0.07 | 0.43 |  |
| 107 | Azir | -0.36 | 0.00 | 0.36 |  |
| 108 | Nilah | -0.38 | 0.21 | 0.59 |  |
| 109 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 110 | Janna | -0.40 | 0.00 | 0.40 |  |
| 111 | Bel'Veth | -0.42 | 0.00 | 0.42 |  |
| 112 | Darius | -0.43 | 0.00 | 0.43 |  |
| 113 | Lillia | -0.43 | 0.00 | 0.43 |  |
| 114 | Trundle | -0.43 | 0.00 | 0.43 |  |
| 115 | Yorick | -0.43 | 0.00 | 0.43 |  |
| 116 | Ziggs | -0.43 | 0.00 | 0.43 |  |
| 117 | Jarvan IV | -0.44 | 0.07 | 0.51 |  |
| 118 | Lucian | -0.44 | 0.00 | 0.44 |  |
| 119 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 120 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 121 | Blitzcrank | -0.46 | 0.00 | 0.46 |  |
| 122 | Cho'Gath | -0.46 | 0.00 | 0.46 |  |
| 123 | Dr. Mundo | -0.46 | 0.00 | 0.46 |  |
| 124 | Rumble | -0.46 | 0.00 | 0.46 |  |
| 125 | Singed | -0.46 | 0.00 | 0.46 |  |
| 126 | Taric | -0.46 | 0.00 | 0.46 |  |
| 127 | Vayne | -0.46 | 0.00 | 0.46 |  |
| 128 | Ambessa | -0.47 | 0.00 | 0.47 |  |
| 129 | Quinn | -0.47 | 0.00 | 0.47 |  |
| 130 | Ekko | -0.48 | 0.00 | 0.48 |  |
| 131 | Aatrox | -0.49 | 0.00 | 0.49 |  |
| 132 | Irelia | -0.50 | 0.00 | 0.50 |  |
| 133 | Katarina | -0.51 | 0.00 | 0.51 |  |
| 134 | Thresh | -0.52 | 0.00 | 0.52 |  |
| 135 | Urgot | -0.54 | 0.00 | 0.54 |  |
| 136 | Graves | -0.55 | 0.00 | 0.55 |  |
| 137 | Ivern | -0.55 | 0.00 | 0.55 |  |
| 138 | LeBlanc | -0.55 | 0.00 | 0.55 |  |
| 139 | Tryndamere | -0.56 | 0.00 | 0.56 |  |
| 140 | Kai'Sa | -0.57 | 0.00 | 0.57 |  |
| 141 | Leona | -0.61 | 0.00 | 0.61 |  |
| 142 | Nautilus | -0.61 | 0.00 | 0.61 |  |
| 143 | Diana | -0.63 | 0.00 | 0.63 |  |
| 144 | Locke | -0.63 | 0.00 | 0.63 |  |
| 145 | Renekton | -0.63 | 0.00 | 0.63 |  |
| 146 | Shen | -0.65 | 0.23 | 0.88 |  |
| 147 | Vi | -0.65 | 0.07 | 0.72 |  |
| 148 | Nunu & Willump | -0.70 | 0.25 | 0.95 |  |
| 149 | Briar | -0.70 | 0.00 | 0.70 |  |
| 150 | Tahm Kench | -0.71 | 0.00 | 0.71 |  |
| 151 | Akshan | -0.72 | 0.00 | 0.72 |  |
| 152 | Taliyah | -0.72 | 0.00 | 0.72 |  |
| 153 | Amumu | -0.73 | 0.00 | 0.73 |  |
| 154 | Lee Sin | -0.73 | 0.00 | 0.73 |  |
| 155 | Poppy | -0.73 | 0.00 | 0.73 |  |
| 156 | Sejuani | -0.73 | 0.00 | 0.73 |  |
| 157 | Ornn | -0.77 | 0.07 | 0.84 |  |
| 158 | Rell | -0.77 | 0.00 | 0.77 |  |
| 159 | Rakan | -0.79 | 0.00 | 0.79 |  |
| 160 | Viego | -0.80 | 0.07 | 0.87 |  |
| 161 | Galio | -0.80 | 0.00 | 0.80 |  |
| 162 | Riven | -0.80 | 0.00 | 0.80 |  |
| 163 | Gragas | -0.81 | 0.00 | 0.81 |  |
| 164 | Talon | -0.85 | 0.00 | 0.85 |  |
| 165 | Naafiri | -0.87 | 0.00 | 0.87 |  |
| 166 | Sylas | -0.87 | 0.00 | 0.87 |  |
| 167 | Zac | -0.91 | 0.00 | 0.91 |  |
| 168 | Pyke | -0.95 | 0.00 | 0.95 |  |
| 169 | Qiyana | -1.00 | 0.00 | 1.00 |  |
| 170 | Akali | -1.02 | 0.00 | 1.02 |  |
| 171 | Kha'Zix | -1.05 | 0.00 | 1.05 |  |
| 172 | Wukong | -1.11 | 0.00 | 1.11 |  |
