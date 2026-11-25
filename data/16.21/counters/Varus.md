# Counters to Varus (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Varus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Varus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Varus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jarvan IV | +0.86 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.69 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.96 |
| 3 | K'Sante | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.81 |
| 4 | Master Yi | +0.85 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.99 |
| 5 | Gangplank | +0.84 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.56 |
| 6 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.78 |
| 7 | Dr. Mundo | +0.83 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.55 |
| 8 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.20 |
| 9 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.22 |
| 10 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.25 |
| 11 | Olaf | +0.82 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.63 |
| 12 | Yasuo | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.21 |
| 13 | Vel'Koz | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | −0.01 |
| 14 | Riven | +0.82 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.17 |
| 15 | Nocturne | +0.82 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.71 |
| 16 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.30 |
| 17 | Vi | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.25 |
| 18 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.46 |
| 19 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.04 |
| 20 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.26 |
| 21 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.11 |
| 22 | Azir | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.20 |
| 23 | Orianna | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.14 |
| 24 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 25 | Miss Fortune | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.20 |
| 26 | Tahm Kench | +0.79 | +0.98 | +0.98 | +1.00 | −0.06 | +1.00 | +0.17 |
| 27 | Rammus | +0.79 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.28 |
| 28 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.03 |
| 29 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.01 |
| 30 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.07 |
| 31 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.07 |
| 32 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.10 |
| 33 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.11 |
| 34 | Rumble | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | +0.79 | +0.21 |
| 35 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.13 |
| 36 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.02 |
| 37 | Draven | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.18 |
| 38 | Aphelios | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.27 |
| 39 | Kai'Sa | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.07 |
| 40 | Ivern | +0.71 | +1.00 | +1.00 | +1.00 | −0.10 | +0.29 | −0.04 |
| 41 | Xin Zhao | +0.71 | +0.71 | +1.00 | +1.00 | −0.02 | +0.87 | −0.08 |
| 42 | Ashe | +0.70 | +0.87 | +0.87 | +1.00 | −0.01 | – | −0.12 |
| 43 | Xayah | +0.67 | +1.00 | +0.45 | +1.00 | +0.08 | – | +0.56 |
| 44 | Volibear | +0.66 | +1.00 | +0.93 | +0.98 | −0.01 | −0.41 | +0.38 |
| 45 | Wukong | +0.61 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.30 |
| 46 | Darius | +0.60 | +1.00 | +1.00 | +1.00 | −0.04 | −0.87 | −0.04 |
| 47 | Maokai | +0.60 | +1.00 | +1.00 | +1.00 | +0.01 | −1.00 | −0.10 |
| 48 | Jax | +0.57 | +1.00 | +0.07 | +1.00 | −0.01 | +1.00 | +0.14 |
| 49 | Ziggs | +0.57 | +1.00 | +1.00 | +0.00 | +0.11 | – | −0.12 |
| 50 | Zaahen | +0.53 | +0.33 | +0.67 | +1.00 | −0.11 | +1.00 | +0.03 |
| 51 | Braum | +0.53 | +0.60 | +0.46 | +1.00 | −0.02 | +0.85 | −0.26 |
| 52 | Cassiopeia | +0.52 | +1.00 | +0.04 | +1.00 | −0.01 | – | +0.11 |
| 53 | Twisted Fate | +0.48 | +0.51 | +0.51 | +1.00 | −0.05 | – | −0.31 |
| 54 | Sion | +0.46 | +0.00 | +1.00 | +0.47 | −0.02 | +0.97 | +0.34 |
| 55 | Gwen | +0.44 | −0.27 | +0.84 | +1.00 | −0.04 | +1.00 | +0.10 |
| 56 | Zac | +0.37 | +0.20 | +0.20 | +1.00 | −0.01 | +1.00 | −0.58 |
| 57 | Kennen | +0.36 | −0.60 | +1.00 | +1.00 | +0.01 | – | +0.53 |
| 58 | Anivia | +0.33 | +0.20 | +0.18 | +1.00 | −0.06 | – | +0.20 |
| 59 | Warwick | +0.33 | −1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.37 |
| 60 | Aurora | +0.32 | +1.00 | +1.00 | −1.00 | +0.02 | – | −0.24 |
| 61 | Sylas | +0.32 | −1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.19 |
| 62 | Yone | +0.31 | +0.92 | +0.17 | +0.17 | −0.12 | +0.17 | +0.10 |
| 63 | Tryndamere | +0.31 | +1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.30 |
| 64 | Lee Sin | +0.31 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.10 |
| 65 | Samira | +0.22 | −1.00 | +0.99 | +1.00 | −0.04 | – | +0.19 |
| 66 | Aatrox | +0.21 | −1.00 | +0.85 | +1.00 | −0.11 | +0.94 | −0.55 |
| 67 | Kled | +0.20 | +1.00 | +1.00 | −1.00 | −0.03 | −1.00 | +0.03 |
| 68 | Twitch | +0.19 | +1.00 | +0.55 | −1.00 | −0.05 | – | −0.16 |
| 69 | Pantheon | +0.19 | −0.54 | +0.07 | +1.00 | −0.00 | +1.00 | +0.12 |
| 70 | Yunara | +0.19 | −1.00 | +1.00 | +0.87 | −0.01 | – | −0.11 |
| 71 | Garen | +0.17 | −1.00 | +1.00 | +1.00 | +0.10 | −0.38 | −0.11 |
| 72 | Taric | +0.17 | +0.00 | −0.22 | +1.00 | +0.04 | +0.16 | −0.01 |
| 73 | Quinn | +0.14 | −1.00 | +0.99 | +0.74 | −0.01 | – | −0.34 |
| 74 | Alistar | +0.11 | +1.00 | −1.00 | +1.00 | +0.02 | −1.00 | +0.07 |
| 75 | Sett | +0.10 | +1.00 | −1.00 | +1.00 | +0.00 | −1.00 | +0.09 |
| 76 | Evelynn | +0.10 | +0.73 | +0.73 | −1.00 | +0.11 | −0.89 | +0.09 |
| 77 | Lillia | +0.09 | +0.41 | +0.41 | −0.11 | +0.01 | −1.00 | +0.12 |
| 78 | Irelia | +0.09 | −1.00 | +0.84 | +0.22 | +0.03 | +0.79 | +0.01 |
| 79 | Bel'Veth | +0.08 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.36 |
| 80 | Mordekaiser | +0.07 | −1.00 | +0.92 | +0.99 | −0.12 | −0.87 | +0.04 |
| 81 | Jayce | +0.05 | +1.00 | −0.33 | −1.00 | +0.09 | +0.53 | +0.28 |
| 82 | Kayn | +0.01 | −1.00 | +0.71 | +0.84 | −0.02 | −0.85 | +0.02 |
| 83 | Caitlyn | −0.02 | +0.68 | +0.12 | −1.00 | −0.01 | – | −0.35 |
| 84 | Aurelion Sol | −0.04 | −0.56 | +1.00 | −1.00 | +0.38 | – | −0.09 |
| 85 | Fizz | −0.05 | +1.00 | −0.83 | −1.00 | −0.03 | +1.00 | +0.25 |
| 86 | Jinx | −0.05 | +0.30 | +0.30 | −1.00 | +0.04 | – | −0.07 |
| 87 | Tristana | −0.07 | +0.03 | +0.03 | −1.00 | +0.05 | +1.00 | +0.26 |
| 88 | Zed | −0.09 | −1.00 | +1.00 | +0.00 | −0.06 | −1.00 | +0.42 |
| 89 | Nilah | −0.11 | −0.71 | −0.21 | +1.00 | −0.01 | −1.00 | +0.56 |
| 90 | Viego | −0.16 | −1.00 | −0.11 | +1.00 | −0.03 | −0.80 | +0.08 |
| 91 | Swain | −0.17 | −0.91 | +0.39 | −0.08 | +0.05 | – | −0.19 |
| 92 | Kassadin | −0.19 | −1.00 | +1.00 | −1.00 | −0.11 | +0.06 | +0.46 |
| 93 | Smolder | −0.21 | −0.73 | −0.73 | +1.00 | −0.11 | – | −0.16 |
| 94 | Ornn | −0.22 | −1.00 | −0.23 | +1.00 | −0.04 | −1.00 | −0.23 |
| 95 | Rengar | −0.24 | −1.00 | +1.00 | −1.00 | +0.30 | −1.00 | +0.22 |
| 96 | Briar | −0.29 | −0.86 | −0.86 | +0.71 | −0.19 | +0.20 | +0.08 |
| 97 | Cho'Gath | −0.29 | −0.96 | −0.51 | +1.00 | −0.10 | −1.00 | −0.18 |
| 98 | Diana | −0.29 | −1.00 | +1.00 | −1.00 | +0.08 | −1.00 | −0.12 |
| 99 | Annie | −0.31 | −1.00 | −1.00 | +1.00 | +0.05 | – | +0.20 |
| 100 | Kindred | −0.32 | −0.95 | −1.00 | +1.00 | −0.03 | – | +0.01 |
| 101 | Hwei | −0.34 | −0.81 | −0.81 | +0.50 | +0.06 | – | −0.15 |
| 102 | Lucian | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | −0.04 |
| 103 | Elise | −0.34 | −1.00 | −1.00 | +1.00 | +0.01 | – | −0.21 |
| 104 | Fiddlesticks | −0.35 | +0.00 | −0.42 | −1.00 | +0.03 | – | −0.24 |
| 105 | Brand | −0.35 | −0.98 | −1.00 | +1.00 | −0.05 | – | −0.25 |
| 106 | Rek'Sai | −0.36 | −1.00 | −1.00 | +1.00 | +0.04 | −0.66 | +0.03 |
| 107 | Illaoi | −0.38 | −0.98 | −0.95 | +1.00 | −0.03 | −0.90 | −0.14 |
| 108 | Milio | −0.41 | −0.18 | −0.51 | −0.98 | −0.01 | – | −0.00 |
| 109 | Sejuani | −0.41 | −1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.06 |
| 110 | Urgot | −0.42 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | −0.09 |
| 111 | Leona | −0.42 | −0.34 | −0.34 | −1.00 | −0.03 | −0.45 | −0.04 |
| 112 | Teemo | −0.46 | +0.08 | −0.99 | −1.00 | +0.02 | – | +0.18 |
| 113 | Kalista | −0.54 | −0.76 | −0.32 | −1.00 | −0.07 | – | −0.14 |
| 114 | Karthus | −0.55 | −1.00 | +0.00 | −1.00 | +0.01 | −1.00 | −0.04 |
| 115 | Gnar | −0.55 | −1.00 | −0.94 | +0.20 | +0.01 | −1.00 | −0.20 |
| 116 | Shaco | −0.57 | −0.86 | −0.19 | −1.00 | +0.00 | −1.00 | −0.10 |
| 117 | Shen | −0.59 | −1.00 | −1.00 | +0.00 | +0.04 | −1.00 | +0.13 |
| 118 | Rakan | −0.59 | −1.00 | −1.00 | +0.00 | +0.02 | −1.00 | +0.04 |
| 119 | Karma | −0.61 | −1.00 | −0.41 | −1.00 | −0.01 | – | +0.17 |
| 120 | Locke | −0.61 | −0.16 | −1.00 | −1.00 | −0.10 | −1.00 | −0.07 |
| 121 | Amumu | −0.62 | −0.70 | −0.78 | −1.00 | +0.04 | −0.67 | +0.25 |
| 122 | Zoe | −0.63 | −0.84 | −0.58 | −1.00 | −0.02 | – | −0.08 |
| 123 | Zilean | −0.65 | −1.00 | −0.56 | −1.00 | −0.06 | – | +0.20 |
| 124 | Ezreal | −0.68 | −1.00 | −1.00 | −0.58 | +0.00 | – | +0.06 |
| 125 | Ryze | −0.72 | −1.00 | −0.76 | −1.00 | −0.01 | – | −0.17 |
| 126 | Nidalee | −0.72 | −0.84 | −0.84 | −1.00 | −0.04 | – | −0.47 |
| 127 | Graves | −0.73 | −0.76 | −1.00 | −0.97 | +0.10 | −1.00 | −0.17 |
| 128 | Xerath | −0.76 | −1.00 | −0.93 | −1.00 | −0.02 | – | +0.08 |
| 129 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.31 |
| 130 | Ahri | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.27 |
| 131 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.12 |
| 132 | Syndra | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.01 |
| 133 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.32 |
| 134 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.11 |
| 135 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.22 |
| 136 | Akali | −0.77 | −1.00 | −0.89 | −1.00 | −0.01 | −1.00 | +0.04 |
| 137 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.06 |
| 138 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.24 |
| 139 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.09 |
| 140 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.01 |
| 141 | Neeko | −0.78 | −1.00 | −0.99 | −1.00 | −0.02 | – | −0.05 |
| 142 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 143 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.08 |
| 144 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.10 |
| 145 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.11 |
| 146 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.04 |
| 147 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.06 |
| 148 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.35 |
| 149 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.09 |
| 150 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −0.97 | +0.13 |
| 151 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.15 |
| 152 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.02 |
| 153 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.01 |
| 154 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.17 |
| 155 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.38 |
| 156 | Morgana | −0.80 | −0.98 | −0.98 | −1.00 | −0.06 | −1.00 | +0.07 |
| 157 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.30 |
| 158 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.28 |
| 159 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.07 |
| 160 | Hecarim | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.19 |
| 161 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.02 |
| 162 | Ambessa | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.23 |
| 163 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.19 |
| 164 | Akshan | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.19 |
| 165 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.20 |
| 166 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.54 |
| 167 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.11 |
| 168 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.26 |
| 169 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.17 |
| 170 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.23 |
| 171 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.17 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.01 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Varus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Varus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Varus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yasuo (net +1.11)

- **0.80** projectile block: Wind Wall blocks Varus's Chain of Corruption, a projectile. Wind Wall for 4 s, long enough to use ahead of Chain of Corruption. (Yasuo W Wind Wall → Varus R Chain of Corruption)
- **0.37** projectile block: Wind Wall blocks Varus's Piercing Arrow, a projectile. Wind Wall for 4 s, long enough to use ahead of Piercing Arrow. (Yasuo W Wind Wall → Varus Q Piercing Arrow)
- **0.34** projectile block: Wind Wall blocks Varus's Hail of Arrows, a projectile. Wind Wall for 4 s, long enough to use ahead of Hail of Arrows. (Yasuo W Wind Wall → Varus E Hail of Arrows)
- Watch out: Varus's basic attacks reach 400 units farther than Yasuo's (575 vs 175 attack range).

#### 2. Braum (net +1.07)

- **0.80** projectile block: Unbreakable blocks Varus's Chain of Corruption, a projectile. Unbreakable for 4 s, long enough to use ahead of Chain of Corruption. (Braum E Unbreakable → Varus R Chain of Corruption)
- **0.45** projectile block: Unbreakable blocks Varus's Hail of Arrows, a projectile. Unbreakable for 4 s, long enough to use ahead of Hail of Arrows. (Braum E Unbreakable → Varus E Hail of Arrows)
- **0.45** projectile block: Unbreakable blocks Varus's Piercing Arrow, a projectile. Unbreakable for 4 s, long enough to use ahead of Piercing Arrow. (Braum E Unbreakable → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Braum's (575 vs 125 attack range).

#### 3. Mel (net +1.03)

- **0.80** projectile block: Rebuttal blocks Varus's Chain of Corruption, a projectile. Rebuttal for 0.75 s; Chain of Corruption takes 1.16 s to land, enough to react. (Mel W Rebuttal → Varus R Chain of Corruption)
- **0.30** projectile block: Rebuttal blocks Varus's Piercing Arrow, a projectile. Rebuttal for 0.75 s; Piercing Arrow takes 0.47 s to land, enough to react. (Mel W Rebuttal → Varus Q Piercing Arrow)
- **0.22** projectile block: Rebuttal blocks Varus's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Varus basic attacks)

#### 4. Fizz (net +0.73)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Varus's Chain of Corruption. Untargetable for 0.75 s; Chain of Corruption takes 1.16 s to land, enough to react. (Fizz E Playful → Varus R Chain of Corruption)
- **0.06** interrupt: Chum the Waters's airborne interrupts Varus's Piercing Arrow (charge-up). Chum the Waters must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Fizz R Chum the Waters → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 400 units farther than Fizz's (575 vs 175 attack range).

#### 5. Samira (net +0.63)

- **0.80** projectile block: Blade Whirl blocks Varus's Chain of Corruption, a projectile. Blade Whirl for 0.75 s; Chain of Corruption takes 1.16 s to land, enough to react. (Samira W Blade Whirl → Varus R Chain of Corruption)
- **0.33** projectile block: Blade Whirl blocks Varus's Piercing Arrow, a projectile. Blade Whirl for 0.75 s; Piercing Arrow takes 0.47 s to land, enough to react. (Samira W Blade Whirl → Varus Q Piercing Arrow)
- **0.22** projectile block: Blade Whirl blocks Varus's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Varus basic attacks)
- Watch out: Hail of Arrows's Grievous Wounds cuts Samira's healing from Flair by 40%.

#### 6. Xayah (net +0.61)

- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Varus's Chain of Corruption. Untargetable for 1.5 s, long enough to use ahead of Chain of Corruption. (Xayah R Featherstorm → Varus R Chain of Corruption)

#### 7. Shaco (net +0.60)

- **0.68** untargetable: Hallucinate makes Shaco untargetable, dodging Varus's Chain of Corruption. Untargetable for 0.5 s; Chain of Corruption takes 1.16 s to land, enough to react. (Shaco R Hallucinate → Varus R Chain of Corruption)
- **0.10** interrupt: Jack in the Box's fear interrupts Varus's Piercing Arrow (charge-up). Jack in the Box must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Shaco W Jack in the Box → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Shaco's (575 vs 125 attack range).

#### 8. Morgana (net +0.56)

- **0.80** cc immunity: Black Shield makes Morgana immune to Varus's Chain of Corruption (root). Immune for 5 s, long enough to use ahead of Chain of Corruption. (Morgana E Black Shield → Varus R Chain of Corruption)
- **0.09** cc immunity: Black Shield makes Morgana immune to Varus's Hail of Arrows (slow). Immune for 5 s, long enough to use ahead of Hail of Arrows. (Morgana E Black Shield → Varus E Hail of Arrows)
- Watch out: Varus's basic attacks reach 125 units farther than Morgana's (575 vs 450 attack range).

#### 9. Maokai (net +0.52)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Varus's Chain of Corruption. Untargetable for 1.4 s; Chain of Corruption takes 1.16 s to land, enough to react. (Maokai W Twisted Advance → Varus R Chain of Corruption)
- **0.11** interrupt: Bramble Smash's airborne interrupts Varus's Piercing Arrow (charge-up). Bramble Smash must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Maokai Q Bramble Smash → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Maokai's (575 vs 125 attack range).

#### 10. Nocturne (net +0.52)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Varus's Chain of Corruption. Spell shield for 1.5 s, long enough to use ahead of Chain of Corruption. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Varus R Chain of Corruption)
- **0.11** interrupt: Unspeakable Horror's fear interrupts Varus's Piercing Arrow (charge-up). Unspeakable Horror must land during the charge-up. Varus can release Piercing Arrow early instead of charging it fully. (Nocturne E Unspeakable Horror → Varus Q Piercing Arrow)
- Watch out: Varus's basic attacks reach 450 units farther than Nocturne's (575 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yasuo | +1.11 | 1.29 | 0.18 | projectile block (Wind Wall) |
| 2 | Braum | +1.07 | 1.34 | 0.27 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 3 | Mel | +1.03 | 1.03 | 0.00 | projectile block (Rebuttal) |
| 4 | Fizz | +0.73 | 0.86 | 0.13 |  |
| 5 | Samira | +0.63 | 1.04 | 0.41 | projectile block (Blade Whirl) |
| 6 | Xayah | +0.61 | 0.61 | 0.00 |  |
| 7 | Shaco | +0.60 | 0.78 | 0.18 |  |
| 8 | Morgana | +0.56 | 0.85 | 0.29 |  |
| 9 | Maokai | +0.52 | 0.91 | 0.39 |  |
| 10 | Nocturne | +0.52 | 0.91 | 0.39 |  |
| 11 | Sivir | +0.52 | 0.80 | 0.28 |  |
| 12 | Shen | +0.52 | 0.70 | 0.18 | attack block (Spirit's Refuge) |
| 13 | Malzahar | +0.50 | 0.60 | 0.10 |  |
| 14 | Evelynn | +0.49 | 0.79 | 0.30 |  |
| 15 | Rek'Sai | +0.49 | 0.79 | 0.30 |  |
| 16 | Kled | +0.49 | 0.72 | 0.23 |  |
| 17 | Aurora | +0.49 | 0.61 | 0.12 |  |
| 18 | Kalista | +0.49 | 0.49 | 0.00 |  |
| 19 | Bard | +0.48 | 0.71 | 0.23 |  |
| 20 | Camille | +0.47 | 0.78 | 0.31 |  |
| 21 | Milio | +0.44 | 0.66 | 0.22 |  |
| 22 | Udyr | +0.43 | 0.88 | 0.45 |  |
| 23 | Zed | +0.43 | 0.61 | 0.18 |  |
| 24 | Master Yi | +0.42 | 0.87 | 0.45 |  |
| 25 | Gwen | +0.41 | 0.80 | 0.39 |  |
| 26 | Lissandra | +0.39 | 0.71 | 0.32 |  |
| 27 | Fiora | +0.38 | 0.93 | 0.55 |  |
| 28 | Yuumi | +0.36 | 0.80 | 0.44 |  |
| 29 | Lulu | +0.36 | 0.36 | 0.00 |  |
| 30 | Alistar | +0.35 | 0.78 | 0.43 |  |
| 31 | Jax | +0.35 | 0.62 | 0.27 | attack dodge (Counter Strike) |
| 32 | Kayle | +0.34 | 0.34 | 0.00 |  |
| 33 | Rell | +0.32 | 0.50 | 0.18 |  |
| 34 | Sion | +0.31 | 0.96 | 0.65 |  |
| 35 | Vladimir | +0.27 | 0.80 | 0.53 |  |
| 36 | Heimerdinger | +0.27 | 0.27 | 0.00 |  |
| 37 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 38 | Taliyah | +0.26 | 0.26 | 0.00 |  |
| 39 | Teemo | +0.25 | 0.35 | 0.10 |  |
| 40 | Zaahen | +0.24 | 0.92 | 0.68 |  |
| 41 | Rammus | +0.22 | 0.49 | 0.27 |  |
| 42 | Pantheon | +0.22 | 0.40 | 0.18 |  |
| 43 | Anivia | +0.20 | 0.20 | 0.00 |  |
| 44 | Gnar | +0.18 | 0.18 | 0.00 |  |
| 45 | Viktor | +0.17 | 0.17 | 0.00 |  |
| 46 | Thresh | +0.16 | 0.22 | 0.06 |  |
| 47 | Aurelion Sol | +0.16 | 0.16 | 0.00 |  |
| 48 | Gangplank | +0.15 | 0.68 | 0.53 |  |
| 49 | K'Sante | +0.15 | 0.28 | 0.13 |  |
| 50 | Renata Glasc | +0.15 | 0.15 | 0.00 |  |
| 51 | Caitlyn | +0.14 | 0.14 | 0.00 |  |
| 52 | Kayn | +0.13 | 0.79 | 0.66 |  |
| 53 | Annie | +0.11 | 0.11 | 0.00 |  |
| 54 | Brand | +0.11 | 0.11 | 0.00 |  |
| 55 | Draven | +0.11 | 0.11 | 0.00 |  |
| 56 | Hwei | +0.11 | 0.11 | 0.00 |  |
| 57 | Kennen | +0.11 | 0.11 | 0.00 |  |
| 58 | Quinn | +0.11 | 0.11 | 0.00 |  |
| 59 | Twisted Fate | +0.11 | 0.11 | 0.00 |  |
| 60 | Vayne | +0.11 | 0.11 | 0.00 |  |
| 61 | Vel'Koz | +0.11 | 0.11 | 0.00 |  |
| 62 | Xerath | +0.11 | 0.11 | 0.00 |  |
| 63 | Ziggs | +0.11 | 0.11 | 0.00 |  |
| 64 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 65 | Veigar | +0.10 | 0.10 | 0.00 |  |
| 66 | Vex | +0.10 | 0.10 | 0.00 |  |
| 67 | Zoe | +0.10 | 0.10 | 0.00 |  |
| 68 | Warwick | +0.08 | 0.88 | 0.80 |  |
| 69 | Galio | +0.08 | 0.26 | 0.18 |  |
| 70 | Jayce | +0.06 | 0.11 | 0.05 |  |
| 71 | Orianna | +0.06 | 0.06 | 0.00 |  |
| 72 | Azir | +0.05 | 0.05 | 0.00 |  |
| 73 | Neeko | +0.05 | 0.05 | 0.00 |  |
| 74 | Zyra | +0.05 | 0.05 | 0.00 |  |
| 75 | Yone | +0.04 | 0.17 | 0.13 |  |
| 76 | Urgot | +0.01 | 0.16 | 0.15 |  |
| 77 | Olaf | 0.00 | 0.71 | 0.71 |  |
| 78 | Sejuani | 0.00 | 0.27 | 0.27 |  |
| 79 | Fiddlesticks | 0.00 | 0.22 | 0.22 |  |
| 80 | Corki | 0.00 | 0.00 | 0.00 |  |
| 81 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 82 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 83 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 84 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 85 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 86 | Lux | 0.00 | 0.00 | 0.00 |  |
| 87 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 88 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 89 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 90 | Ahri | -0.01 | 0.11 | 0.12 |  |
| 91 | Rengar | -0.02 | 0.69 | 0.71 |  |
| 92 | Nami | -0.02 | 0.16 | 0.18 |  |
| 93 | Ornn | -0.02 | 0.16 | 0.18 |  |
| 94 | Seraphine | -0.02 | 0.16 | 0.18 |  |
| 95 | Vi | -0.02 | 0.16 | 0.18 |  |
| 96 | Malphite | -0.04 | 0.23 | 0.27 |  |
| 97 | Nilah | -0.05 | 0.64 | 0.69 | attack dodge (Jubilant Veil) |
| 98 | Xin Zhao | -0.07 | 0.44 | 0.51 |  |
| 99 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 100 | Pyke | -0.08 | 0.22 | 0.30 |  |
| 101 | Riven | -0.08 | 0.22 | 0.30 |  |
| 102 | Jarvan IV | -0.08 | 0.05 | 0.13 |  |
| 103 | Leona | -0.10 | 0.17 | 0.27 |  |
| 104 | Kog'Maw | -0.10 | 0.00 | 0.10 |  |
| 105 | Amumu | -0.11 | 0.16 | 0.27 |  |
| 106 | Zilean | -0.11 | 0.11 | 0.22 |  |
| 107 | Zac | -0.12 | 0.27 | 0.39 |  |
| 108 | Ashe | -0.12 | 0.06 | 0.18 |  |
| 109 | Qiyana | -0.13 | 0.05 | 0.18 |  |
| 110 | Sona | -0.13 | 0.05 | 0.18 |  |
| 111 | Rakan | -0.14 | 0.16 | 0.30 |  |
| 112 | Kassadin | -0.16 | 0.11 | 0.27 |  |
| 113 | Cassiopeia | -0.16 | 0.06 | 0.22 |  |
| 114 | Janna | -0.17 | 0.15 | 0.32 |  |
| 115 | Swain | -0.17 | 0.11 | 0.28 |  |
| 116 | Karthus | -0.17 | 0.00 | 0.17 |  |
| 117 | Lucian | -0.17 | 0.00 | 0.17 |  |
| 118 | Akali | -0.18 | 0.00 | 0.18 |  |
| 119 | Nidalee | -0.18 | 0.00 | 0.18 |  |
| 120 | Yunara | -0.18 | 0.00 | 0.18 |  |
| 121 | Graves | -0.19 | 0.00 | 0.19 |  |
| 122 | Elise | -0.21 | 0.11 | 0.32 |  |
| 123 | Diana | -0.21 | 0.06 | 0.27 |  |
| 124 | Nautilus | -0.21 | 0.06 | 0.27 |  |
| 125 | Gragas | -0.22 | 0.17 | 0.39 |  |
| 126 | Sett | -0.22 | 0.17 | 0.39 |  |
| 127 | Poppy | -0.22 | 0.05 | 0.27 |  |
| 128 | Blitzcrank | -0.23 | 0.30 | 0.53 |  |
| 129 | Lillia | -0.24 | 0.05 | 0.29 |  |
| 130 | Senna | -0.24 | 0.00 | 0.24 |  |
| 131 | Zeri | -0.24 | 0.00 | 0.24 |  |
| 132 | Wukong | -0.25 | 0.05 | 0.30 |  |
| 133 | Garen | -0.27 | 0.38 | 0.65 |  |
| 134 | Katarina | -0.27 | 0.00 | 0.27 |  |
| 135 | Karma | -0.28 | 0.00 | 0.28 |  |
| 136 | Soraka | -0.29 | 0.10 | 0.39 |  |
| 137 | Lee Sin | -0.30 | 0.06 | 0.36 |  |
| 138 | Hecarim | -0.31 | 0.05 | 0.36 |  |
| 139 | Viego | -0.33 | 0.17 | 0.50 |  |
| 140 | Aphelios | -0.33 | 0.05 | 0.38 |  |
| 141 | Smolder | -0.33 | 0.00 | 0.33 |  |
| 142 | Renekton | -0.34 | 0.11 | 0.45 |  |
| 143 | Shyvana | -0.34 | 0.11 | 0.45 |  |
| 144 | Sylas | -0.34 | 0.11 | 0.45 |  |
| 145 | Kindred | -0.36 | 0.00 | 0.36 |  |
| 146 | Tahm Kench | -0.38 | 0.28 | 0.66 |  |
| 147 | Nasus | -0.38 | 0.27 | 0.65 |  |
| 148 | Illaoi | -0.39 | 0.00 | 0.39 |  |
| 149 | Akshan | -0.40 | 0.00 | 0.40 |  |
| 150 | Singed | -0.42 | 0.11 | 0.53 |  |
| 151 | Skarner | -0.42 | 0.11 | 0.53 |  |
| 152 | Cho'Gath | -0.43 | 0.22 | 0.65 |  |
| 153 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 154 | Locke | -0.45 | 0.00 | 0.45 |  |
| 155 | Tryndamere | -0.45 | 0.00 | 0.45 |  |
| 156 | Irelia | -0.46 | 0.11 | 0.57 |  |
| 157 | Talon | -0.50 | 0.00 | 0.50 |  |
| 158 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 159 | Ekko | -0.54 | 0.00 | 0.54 |  |
| 160 | Naafiri | -0.54 | 0.00 | 0.54 |  |
| 161 | Nunu & Willump | -0.55 | 0.16 | 0.71 |  |
| 162 | Volibear | -0.56 | 0.11 | 0.67 |  |
| 163 | Taric | -0.60 | 0.11 | 0.71 |  |
| 164 | Aatrox | -0.62 | 0.11 | 0.73 |  |
| 165 | Briar | -0.62 | 0.06 | 0.68 |  |
| 166 | Yorick | -0.64 | 0.11 | 0.75 |  |
| 167 | Darius | -0.65 | 0.10 | 0.75 |  |
| 168 | Ambessa | -0.66 | 0.05 | 0.71 |  |
| 169 | Mordekaiser | -0.67 | 0.17 | 0.84 |  |
| 170 | Bel'Veth | -0.70 | 0.11 | 0.81 |  |
| 171 | Trundle | -0.77 | 0.10 | 0.87 |  |
| 172 | Dr. Mundo | -0.87 | 0.00 | 0.87 |  |
