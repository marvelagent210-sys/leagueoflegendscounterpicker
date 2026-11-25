# Counters to Aphelios (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Aphelios: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Aphelios wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Aphelios --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jax | +0.83 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.80 |
| 2 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.93 |
| 3 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.65 |
| 4 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.94 |
| 5 | Shyvana | +0.81 | +0.94 | +1.00 | +1.00 | −0.13 | +1.00 | +0.85 |
| 6 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.35 | +1.00 | +1.00 |
| 7 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.35 |
| 8 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.10 |
| 9 | Aurelion Sol | +0.47 | +1.00 | +1.00 | −1.00 | +0.48 | +1.00 | +0.04 |
| 10 | Nocturne | +0.42 | +1.00 | +1.00 | −1.00 | −0.16 | +1.00 | +0.95 |
| 11 | Tryndamere | +0.42 | +1.00 | +1.00 | −1.00 | −0.11 | +1.00 | +0.71 |
| 12 | Kayle | +0.39 | +0.65 | +0.63 | +0.00 | +0.09 | – | +0.38 |
| 13 | Teemo | +0.38 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.79 |
| 14 | Ashe | +0.37 | +1.00 | +1.00 | −1.00 | +0.01 | – | +0.71 |
| 15 | Anivia | +0.37 | +0.28 | +0.24 | +1.00 | −0.13 | – | +0.39 |
| 16 | Tahm Kench | +0.34 | +0.94 | +0.70 | −1.00 | +0.17 | +0.97 | +0.17 |
| 17 | Poppy | +0.32 | +1.00 | −1.00 | +1.00 | −0.03 | +1.00 | +0.57 |
| 18 | Ivern | +0.32 | +1.00 | +1.00 | −1.00 | −0.17 | – | +0.35 |
| 19 | Vayne | +0.28 | +1.00 | −1.00 | +1.00 | +0.01 | – | +0.95 |
| 20 | Udyr | +0.14 | +1.00 | −1.00 | +1.00 | −0.08 | −1.00 | +1.00 |
| 21 | Caitlyn | +0.11 | +0.56 | +0.58 | −1.00 | +0.07 | +0.22 | −0.12 |
| 22 | Aurora | +0.10 | +0.52 | +0.53 | −1.00 | +0.05 | – | +0.42 |
| 23 | Yasuo | +0.09 | +0.02 | −0.50 | +1.00 | +0.08 | −0.54 | +0.95 |
| 24 | Taric | +0.06 | +0.51 | −0.11 | +0.00 | +0.03 | −0.55 | +0.17 |
| 25 | Xayah | +0.04 | +1.00 | +0.00 | −1.00 | −0.10 | – | +0.08 |
| 26 | Twitch | +0.00 | +1.00 | −1.00 | +0.00 | +0.05 | – | −0.08 |
| 27 | Corki | −0.03 | −0.65 | −0.30 | +1.00 | +0.04 | – | +0.01 |
| 28 | Gangplank | −0.15 | −1.00 | −1.00 | +1.00 | +0.02 | +1.00 | +0.98 |
| 29 | Zeri | −0.15 | −1.00 | +1.00 | −1.00 | +0.12 | – | +0.96 |
| 30 | Pantheon | −0.20 | −1.00 | −1.00 | +1.00 | −0.13 | +1.00 | +0.46 |
| 31 | Orianna | −0.21 | +1.00 | −1.00 | −1.00 | +0.05 | – | +0.10 |
| 32 | K'Sante | −0.22 | −1.00 | −1.00 | +1.00 | −0.11 | +0.50 | +0.98 |
| 33 | Jinx | −0.23 | −0.04 | −0.04 | −1.00 | +0.09 | – | +0.06 |
| 34 | Kennen | −0.31 | −1.00 | −1.00 | +1.00 | +0.00 | – | +0.40 |
| 35 | Annie | −0.33 | −1.00 | −1.00 | +1.00 | −0.08 | – | +0.26 |
| 36 | Quinn | −0.36 | −1.00 | −1.00 | +1.00 | −0.10 | – | −0.23 |
| 37 | Graves | −0.36 | −1.00 | −1.00 | +1.00 | +0.22 | −1.00 | +0.04 |
| 38 | Malphite | −0.37 | −1.00 | −1.00 | +1.00 | −0.05 | −1.00 | +0.83 |
| 39 | Trundle | −0.39 | −1.00 | −1.00 | +1.00 | −0.21 | −1.00 | +0.85 |
| 40 | Heimerdinger | −0.40 | −1.00 | −1.00 | +1.00 | −0.07 | −1.00 | +0.19 |
| 41 | Renekton | −0.41 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | +0.12 |
| 42 | Illaoi | −0.41 | −1.00 | −1.00 | +1.00 | −0.09 | −1.00 | +0.04 |
| 43 | Bel'Veth | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | −0.07 |
| 44 | Neeko | −0.52 | −1.00 | −0.69 | −1.00 | −0.01 | +1.00 | +0.06 |
| 45 | Darius | −0.56 | −1.00 | +0.00 | −1.00 | −0.13 | −1.00 | +0.23 |
| 46 | Nilah | −0.58 | −1.00 | −1.00 | +0.00 | −0.11 | −1.00 | +0.72 |
| 47 | Tristana | −0.59 | −1.00 | −1.00 | −1.00 | −0.00 | +1.00 | +0.15 |
| 48 | Wukong | −0.61 | −1.00 | −1.00 | +0.00 | −0.31 | −1.00 | +0.68 |
| 49 | Vel'Koz | −0.66 | −1.00 | −1.00 | −1.00 | +0.35 | −0.26 | +0.31 |
| 50 | Sion | −0.68 | −1.00 | −1.00 | −0.52 | −0.04 | −1.00 | +0.62 |
| 51 | Braum | −0.70 | −1.00 | −1.00 | −1.00 | −0.05 | −0.10 | +0.42 |
| 52 | Yone | −0.71 | −1.00 | −1.00 | −0.79 | −0.24 | −0.38 | +0.37 |
| 53 | Hwei | −0.73 | −1.00 | −1.00 | −0.81 | −0.01 | – | +0.06 |
| 54 | Gragas | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.58 |
| 55 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.43 |
| 56 | Jhin | −0.75 | −0.92 | −0.92 | −1.00 | −0.07 | – | −0.01 |
| 57 | Mordekaiser | −0.75 | −1.00 | −0.96 | −1.00 | −0.15 | −0.61 | +0.47 |
| 58 | Jayce | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.76 |
| 59 | Ziggs | −0.75 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.18 |
| 60 | Fiddlesticks | −0.75 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.30 |
| 61 | Sylas | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.67 |
| 62 | Zaahen | −0.75 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.74 |
| 63 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.83 |
| 64 | Sona | −0.76 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.58 |
| 65 | Master Yi | −0.76 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +1.00 |
| 66 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.43 |
| 67 | Taliyah | −0.76 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.18 |
| 68 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.73 |
| 69 | Varus | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.27 |
| 70 | Akshan | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.39 |
| 71 | Azir | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.09 |
| 72 | Zilean | −0.77 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.41 |
| 73 | Gwen | −0.77 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.99 |
| 74 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.40 |
| 75 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.07 |
| 76 | Sivir | −0.77 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.59 |
| 77 | Karma | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.26 |
| 78 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.39 |
| 79 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.01 |
| 80 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.37 |
| 81 | Swain | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.04 |
| 82 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.67 |
| 83 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.94 |
| 84 | Samira | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.12 |
| 85 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.12 |
| 86 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.15 |
| 87 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.92 |
| 88 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.45 |
| 89 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.20 |
| 90 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.59 |
| 91 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.61 |
| 92 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.17 |
| 93 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.18 |
| 94 | Ezreal | −0.78 | −0.99 | −1.00 | −1.00 | −0.02 | – | −0.01 |
| 95 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.50 |
| 96 | Milio | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.07 |
| 97 | Gnar | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.52 |
| 98 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.27 |
| 99 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.04 |
| 100 | Volibear | −0.78 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.94 |
| 101 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.05 |
| 102 | Lillia | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.56 |
| 103 | Nami | −0.79 | −1.00 | −1.00 | −0.99 | −0.02 | – | −0.13 |
| 104 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.54 |
| 105 | Yunara | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.38 |
| 106 | Irelia | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.53 |
| 107 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.79 |
| 108 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.60 |
| 109 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.33 |
| 110 | Diana | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.14 |
| 111 | Kled | −0.79 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.71 |
| 112 | Lee Sin | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.63 |
| 113 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.39 |
| 114 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.09 |
| 115 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.04 |
| 116 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.49 |
| 117 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.58 |
| 118 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.32 |
| 119 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.19 |
| 120 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.07 |
| 121 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.07 |
| 122 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.75 |
| 123 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.29 |
| 124 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.23 |
| 125 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.22 |
| 126 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.59 |
| 127 | Maokai | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.32 |
| 128 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.52 |
| 129 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.03 |
| 130 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.10 |
| 131 | Twisted Fate | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.16 |
| 132 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.20 |
| 133 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.39 |
| 134 | Kalista | −0.81 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.22 |
| 135 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.14 |
| 136 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.07 |
| 137 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.42 |
| 138 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.34 |
| 139 | Xin Zhao | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.20 |
| 140 | Zac | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.11 |
| 141 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.15 |
| 142 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.02 |
| 143 | Kassadin | −0.81 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.65 |
| 144 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.39 |
| 145 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.02 |
| 146 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.04 |
| 147 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.14 |
| 148 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.49 |
| 149 | Brand | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.01 |
| 150 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.07 |
| 151 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.02 |
| 152 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.03 |
| 153 | Cho'Gath | −0.82 | −1.00 | −1.00 | −0.92 | −0.13 | −1.00 | −0.32 |
| 154 | Shaco | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.31 |
| 155 | Kai'Sa | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | −0.02 |
| 156 | Warwick | −0.82 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.70 |
| 157 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.36 |
| 158 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.08 |
| 159 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.09 |
| 160 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | −0.24 | – | −0.16 |
| 161 | Olaf | −0.83 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.48 |
| 162 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.05 |
| 163 | Veigar | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.49 |
| 164 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.25 |
| 165 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | +0.51 |
| 166 | Ambessa | −0.85 | −1.00 | −1.00 | −1.00 | −0.55 | −1.00 | +0.69 |
| 167 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −0.01 |
| 168 | Rek'Sai | −0.86 | −1.00 | −1.00 | −1.00 | −0.52 | −1.00 | +0.41 |
| 169 | Singed | −0.86 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | +0.33 |
| 170 | Aatrox | −0.86 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.65 |
| 171 | Vi | −0.87 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.62 |
| 172 | Thresh | −0.88 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | −0.63 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Aphelios's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Aphelios's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Aphelios` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Yuumi (net +1.01)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for ?; Moonlight Vigil takes 1.9 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aphelios R Moonlight Vigil)
- **0.70** untargetable: You and Me! makes Yuumi untargetable, dodging Aphelios's Binding Eclipse. Untargetable for ?; Binding Eclipse takes 0.3 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aphelios Q Binding Eclipse)
- **0.30** untargetable: You and Me! makes Yuumi untargetable, dodging Aphelios's Calibrum. Untargetable for ?, timed to Calibrum. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

#### 2. Xayah (net +1.00)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 1.5 s, long enough to use ahead of Moonlight Vigil. (Xayah R Featherstorm → Aphelios R Moonlight Vigil)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 1.5 s, long enough to use ahead of Binding Eclipse. (Xayah R Featherstorm → Aphelios Q Binding Eclipse)
- **0.14** untargetable: Featherstorm makes Xayah untargetable, dodging Aphelios's Calibrum. Untargetable for 1.5 s, long enough to use ahead of Calibrum. (Xayah R Featherstorm → Aphelios basic attacks)

#### 3. Master Yi (net +0.99)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for ?; Moonlight Vigil takes 1.9 s to land, enough to react. (Master Yi Q Alpha Strike → Aphelios R Moonlight Vigil)
- **0.51** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aphelios's Binding Eclipse. Untargetable for ?; Binding Eclipse takes 0.3 s to land, enough to react. (Master Yi Q Alpha Strike → Aphelios Q Binding Eclipse)
- **0.22** untargetable: Alpha Strike makes Master Yi untargetable, dodging Aphelios's Calibrum. Untargetable for ?, timed to Calibrum. (Master Yi Q Alpha Strike → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 375 units farther than Master Yi's (550 vs 175 attack range).

#### 4. Bard (net +0.93)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2.5 s, long enough to use ahead of Moonlight Vigil. (Bard R Tempered Fate → Aphelios R Moonlight Vigil)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2.5 s, long enough to use ahead of Binding Eclipse. (Bard R Tempered Fate → Aphelios Q Binding Eclipse)
- **0.14** untargetable: Tempered Fate makes Bard untargetable, dodging Aphelios's Calibrum. Untargetable for 2.5 s, long enough to use ahead of Calibrum. (Bard R Tempered Fate → Aphelios basic attacks)
- Watch out: Sentry makes Aphelios immune to Bard's Cosmic Binding (slow).

#### 5. Fizz (net +0.92)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 0.75 s; Moonlight Vigil takes 1.9 s to land, enough to react. (Fizz E Playful → Aphelios R Moonlight Vigil)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 0.75 s; Binding Eclipse takes 0.3 s to land, enough to react. (Fizz E Playful → Aphelios Q Binding Eclipse)
- **0.30** untargetable: Playful makes Fizz untargetable, dodging Aphelios's Calibrum. Untargetable for 0.75 s, timed to Calibrum. (Fizz E Playful → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 6. Aurora (net +0.90)

- **0.80** untargetable: Between Worlds makes Aurora untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 0.4 s; Moonlight Vigil takes 1.9 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Aphelios R Moonlight Vigil)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 0.4 s; Binding Eclipse takes 0.3 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Aphelios Q Binding Eclipse)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Aphelios's Calibrum. Untargetable for 0.4 s, timed to Calibrum. Does not destroy inbound projectiles. (Aurora R Between Worlds → Aphelios basic attacks)
- Watch out: Sentry makes Aphelios immune to Aurora's Between Worlds (slow).

#### 7. Lissandra (net +0.88)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2.5 s, long enough to use ahead of Moonlight Vigil. (Lissandra R Frozen Tomb → Aphelios R Moonlight Vigil)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2.5 s, long enough to use ahead of Binding Eclipse. (Lissandra R Frozen Tomb → Aphelios Q Binding Eclipse)
- **0.14** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Aphelios's Calibrum. Untargetable for 2.5 s, long enough to use ahead of Calibrum. (Lissandra R Frozen Tomb → Aphelios basic attacks)
- Watch out: Sentry makes Aphelios immune to Lissandra's Frozen Tomb (slow).

#### 8. Vladimir (net +0.86)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aphelios's Moonlight Vigil. Untargetable for 2 s, long enough to use ahead of Moonlight Vigil. (Vladimir W Sanguine Pool → Aphelios R Moonlight Vigil)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aphelios's Binding Eclipse. Untargetable for 2 s, long enough to use ahead of Binding Eclipse. (Vladimir W Sanguine Pool → Aphelios Q Binding Eclipse)
- **0.23** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Aphelios's Calibrum. Untargetable for 2 s, long enough to use ahead of Calibrum. (Vladimir W Sanguine Pool → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

#### 9. Morgana (net +0.84)

- **0.80** cc immunity: Black Shield makes Morgana immune to Aphelios's Moonlight Vigil (slow, root). Immune for 5 s, long enough to use ahead of Moonlight Vigil. (Morgana E Black Shield → Aphelios R Moonlight Vigil)
- **0.54** cc immunity: Black Shield makes Morgana immune to Aphelios's Binding Eclipse (root, slow). Immune for 5 s, long enough to use ahead of Binding Eclipse. (Morgana E Black Shield → Aphelios Q Binding Eclipse)
- **0.06** cc immunity: Black Shield makes Morgana immune to Aphelios's Gravitum (slow). Immune for 5 s, long enough to use ahead of Gravitum. (Morgana E Black Shield → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 10. Fiora (net +0.83)

- **0.90** parry: Riposte parries Aphelios's Moonlight Vigil and stuns back. Parry for 0.75 s; Moonlight Vigil takes 1.9 s to land, enough to react. Negating Moonlight Vigil's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aphelios R Moonlight Vigil)
- **0.64** parry: Riposte parries Aphelios's Binding Eclipse and stuns back. Parry for 0.75 s; Binding Eclipse takes 0.3 s to land, enough to react. Negating Binding Eclipse's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Aphelios Q Binding Eclipse)
- **0.23** parry: Riposte parries Aphelios's Calibrum. Parry for 0.75 s, timed to Calibrum. (Fiora W Riposte → Aphelios basic attacks)
- Watch out: Aphelios's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Yuumi | +1.01 | 1.22 | 0.21 |  |
| 2 | Xayah | +1.00 | 1.00 | 0.00 |  |
| 3 | Master Yi | +0.99 | 1.35 | 0.36 |  |
| 4 | Bard | +0.93 | 1.00 | 0.07 |  |
| 5 | Fizz | +0.92 | 1.22 | 0.30 |  |
| 6 | Aurora | +0.90 | 1.00 | 0.10 |  |
| 7 | Lissandra | +0.88 | 1.00 | 0.12 |  |
| 8 | Vladimir | +0.86 | 1.13 | 0.27 |  |
| 9 | Morgana | +0.84 | 1.09 | 0.25 |  |
| 10 | Fiora | +0.83 | 1.29 | 0.46 |  |
| 11 | Camille | +0.76 | 1.00 | 0.24 |  |
| 12 | Rek'Sai | +0.76 | 1.00 | 0.24 |  |
| 13 | Maokai | +0.74 | 1.22 | 0.48 |  |
| 14 | Zaahen | +0.74 | 0.98 | 0.24 |  |
| 15 | Udyr | +0.73 | 1.17 | 0.44 |  |
| 16 | Kled | +0.72 | 0.93 | 0.21 |  |
| 17 | Sivir | +0.71 | 0.71 | 0.00 |  |
| 18 | Kayn | +0.69 | 1.00 | 0.31 |  |
| 19 | Milio | +0.69 | 0.76 | 0.07 |  |
| 20 | Zed | +0.68 | 1.00 | 0.32 |  |
| 21 | Samira | +0.68 | 0.68 | 0.00 | projectile block (Blade Whirl) |
| 22 | Gwen | +0.67 | 1.11 | 0.44 |  |
| 23 | Evelynn | +0.67 | 1.00 | 0.33 |  |
| 24 | Kalista | +0.66 | 0.71 | 0.05 |  |
| 25 | Warwick | +0.65 | 0.98 | 0.33 |  |
| 26 | Shaco | +0.64 | 1.00 | 0.36 |  |
| 27 | Kayle | +0.61 | 0.66 | 0.05 |  |
| 28 | Mel | +0.60 | 0.67 | 0.07 | projectile block (Rebuttal) |
| 29 | Malzahar | +0.59 | 0.59 | 0.00 |  |
| 30 | Teemo | +0.54 | 0.60 | 0.06 | blind (Blinding Dart) |
| 31 | Yasuo | +0.51 | 0.75 | 0.24 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 32 | Braum | +0.45 | 0.94 | 0.49 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 33 | Shen | +0.44 | 0.75 | 0.31 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 34 | Alistar | +0.40 | 0.78 | 0.38 |  |
| 35 | Jax | +0.39 | 0.77 | 0.38 | attack dodge (Counter Strike), attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 36 | Nocturne | +0.38 | 0.83 | 0.45 |  |
| 37 | Varus | +0.33 | 0.38 | 0.05 |  |
| 38 | Nilah | +0.29 | 0.68 | 0.39 | attack dodge (Jubilant Veil) |
| 39 | Pantheon | +0.26 | 0.59 | 0.33 |  |
| 40 | Lulu | +0.24 | 0.36 | 0.12 |  |
| 41 | Tristana | +0.21 | 0.27 | 0.06 |  |
| 42 | Olaf | +0.16 | 0.98 | 0.82 |  |
| 43 | Sion | +0.14 | 0.99 | 0.85 |  |
| 44 | Caitlyn | +0.12 | 0.18 | 0.06 |  |
| 45 | Rengar | +0.10 | 0.94 | 0.84 |  |
| 46 | Annie | +0.08 | 0.08 | 0.00 |  |
| 47 | Xin Zhao | +0.05 | 0.52 | 0.47 |  |
| 48 | Gangplank | +0.02 | 0.88 | 0.86 |  |
| 49 | Heimerdinger | +0.01 | 0.12 | 0.11 |  |
| 50 | Katarina | 0.00 | 0.38 | 0.38 |  |
| 51 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 52 | Corki | 0.00 | 0.00 | 0.00 |  |
| 53 | Elise | 0.00 | 0.00 | 0.00 |  |
| 54 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 55 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 56 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 57 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 58 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 59 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 60 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 61 | Sona | 0.00 | 0.00 | 0.00 |  |
| 62 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 63 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 64 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 65 | Ashe | -0.03 | 0.00 | 0.03 |  |
| 66 | Azir | -0.05 | 0.00 | 0.05 |  |
| 67 | Janna | -0.05 | 0.00 | 0.05 |  |
| 68 | Kindred | -0.05 | 0.00 | 0.05 |  |
| 69 | Kog'Maw | -0.05 | 0.00 | 0.05 |  |
| 70 | Lux | -0.05 | 0.00 | 0.05 |  |
| 71 | Miss Fortune | -0.05 | 0.00 | 0.05 |  |
| 72 | Orianna | -0.05 | 0.00 | 0.05 |  |
| 73 | Renata Glasc | -0.05 | 0.00 | 0.05 |  |
| 74 | Senna | -0.05 | 0.00 | 0.05 |  |
| 75 | Twitch | -0.05 | 0.00 | 0.05 |  |
| 76 | Xerath | -0.05 | 0.00 | 0.05 |  |
| 77 | Zeri | -0.05 | 0.00 | 0.05 |  |
| 78 | Ziggs | -0.05 | 0.00 | 0.05 |  |
| 79 | Zilean | -0.05 | 0.00 | 0.05 |  |
| 80 | Brand | -0.06 | 0.00 | 0.06 |  |
| 81 | Jayce | -0.06 | 0.00 | 0.06 |  |
| 82 | Jinx | -0.06 | 0.00 | 0.06 |  |
| 83 | Soraka | -0.06 | 0.00 | 0.06 |  |
| 84 | Ahri | -0.07 | 0.00 | 0.07 |  |
| 85 | Draven | -0.07 | 0.00 | 0.07 |  |
| 86 | Ryze | -0.07 | 0.00 | 0.07 |  |
| 87 | Twisted Fate | -0.07 | 0.00 | 0.07 |  |
| 88 | Viktor | -0.07 | 0.00 | 0.07 |  |
| 89 | Zoe | -0.07 | 0.00 | 0.07 |  |
| 90 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 91 | Karma | -0.08 | 0.00 | 0.08 |  |
| 92 | Nami | -0.08 | 0.00 | 0.08 |  |
| 93 | Yunara | -0.08 | 0.00 | 0.08 |  |
| 94 | Jhin | -0.09 | 0.00 | 0.09 |  |
| 95 | Quinn | -0.09 | 0.00 | 0.09 |  |
| 96 | Smolder | -0.09 | 0.00 | 0.09 |  |
| 97 | Swain | -0.09 | 0.00 | 0.09 |  |
| 98 | Vel'Koz | -0.09 | 0.00 | 0.09 |  |
| 99 | Vex | -0.09 | 0.00 | 0.09 |  |
| 100 | Fiddlesticks | -0.10 | 0.00 | 0.10 |  |
| 101 | Syndra | -0.10 | 0.00 | 0.10 |  |
| 102 | Taliyah | -0.10 | 0.00 | 0.10 |  |
| 103 | Anivia | -0.11 | 0.00 | 0.11 |  |
| 104 | Cassiopeia | -0.11 | 0.00 | 0.11 |  |
| 105 | Hwei | -0.12 | 0.00 | 0.12 |  |
| 106 | Ivern | -0.12 | 0.00 | 0.12 |  |
| 107 | Seraphine | -0.12 | 0.00 | 0.12 |  |
| 108 | Rammus | -0.13 | 0.38 | 0.51 |  |
| 109 | Gnar | -0.13 | 0.00 | 0.13 |  |
| 110 | Graves | -0.13 | 0.00 | 0.13 |  |
| 111 | Thresh | -0.16 | 0.00 | 0.16 |  |
| 112 | Garen | -0.17 | 0.55 | 0.72 |  |
| 113 | Malphite | -0.18 | 0.25 | 0.43 |  |
| 114 | Yone | -0.18 | 0.00 | 0.18 |  |
| 115 | Jarvan IV | -0.23 | 0.00 | 0.23 |  |
| 116 | Sylas | -0.23 | 0.00 | 0.23 |  |
| 117 | Karthus | -0.24 | 0.00 | 0.24 |  |
| 118 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 119 | Rakan | -0.24 | 0.00 | 0.24 |  |
| 120 | Rell | -0.24 | 0.00 | 0.24 |  |
| 121 | Singed | -0.25 | 0.57 | 0.82 |  |
| 122 | Riven | -0.26 | 0.00 | 0.26 |  |
| 123 | Vi | -0.26 | 0.00 | 0.26 |  |
| 124 | K'Sante | -0.27 | 0.00 | 0.27 |  |
| 125 | Viego | -0.27 | 0.00 | 0.27 |  |
| 126 | Naafiri | -0.28 | 0.00 | 0.28 |  |
| 127 | Urgot | -0.30 | 0.00 | 0.30 |  |
| 128 | Ambessa | -0.31 | 0.00 | 0.31 |  |
| 129 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 130 | Talon | -0.31 | 0.00 | 0.31 |  |
| 131 | Akali | -0.32 | 0.00 | 0.32 |  |
| 132 | Briar | -0.32 | 0.00 | 0.32 |  |
| 133 | Galio | -0.33 | 0.00 | 0.33 |  |
| 134 | Lillia | -0.33 | 0.00 | 0.33 |  |
| 135 | Pyke | -0.33 | 0.00 | 0.33 |  |
| 136 | Qiyana | -0.33 | 0.00 | 0.33 |  |
| 137 | Ekko | -0.34 | 0.00 | 0.34 |  |
| 138 | Hecarim | -0.34 | 0.00 | 0.34 |  |
| 139 | Amumu | -0.38 | 0.00 | 0.38 |  |
| 140 | Ornn | -0.38 | 0.00 | 0.38 |  |
| 141 | Renekton | -0.38 | 0.00 | 0.38 |  |
| 142 | Volibear | -0.38 | 0.00 | 0.38 |  |
| 143 | Bel'Veth | -0.40 | 0.00 | 0.40 |  |
| 144 | Irelia | -0.40 | 0.00 | 0.40 |  |
| 145 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 146 | Nautilus | -0.41 | 0.00 | 0.41 |  |
| 147 | Tryndamere | -0.41 | 0.00 | 0.41 |  |
| 148 | Nasus | -0.43 | 0.39 | 0.82 |  |
| 149 | Gragas | -0.43 | 0.00 | 0.43 |  |
| 150 | Illaoi | -0.43 | 0.00 | 0.43 |  |
| 151 | Kassadin | -0.43 | 0.00 | 0.43 |  |
| 152 | Tahm Kench | -0.43 | 0.00 | 0.43 |  |
| 153 | Poppy | -0.44 | 0.00 | 0.44 |  |
| 154 | Kha'Zix | -0.45 | 0.00 | 0.45 |  |
| 155 | Diana | -0.46 | 0.00 | 0.46 |  |
| 156 | Leona | -0.46 | 0.00 | 0.46 |  |
| 157 | Locke | -0.47 | 0.00 | 0.47 |  |
| 158 | Zac | -0.48 | 0.00 | 0.48 |  |
| 159 | Sejuani | -0.49 | 0.00 | 0.49 |  |
| 160 | Shyvana | -0.51 | 0.00 | 0.51 |  |
| 161 | Sett | -0.52 | 0.00 | 0.52 |  |
| 162 | Nunu & Willump | -0.56 | 0.31 | 0.87 |  |
| 163 | Mordekaiser | -0.69 | 0.09 | 0.78 |  |
| 164 | Skarner | -0.71 | 0.16 | 0.87 |  |
| 165 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 166 | Taric | -0.77 | 0.00 | 0.77 |  |
| 167 | Yorick | -0.77 | 0.00 | 0.77 |  |
| 168 | Darius | -0.82 | 0.00 | 0.82 |  |
| 169 | Trundle | -0.82 | 0.00 | 0.82 |  |
| 170 | Dr. Mundo | -0.83 | 0.00 | 0.83 |  |
| 171 | Rumble | -0.86 | 0.00 | 0.86 |  |
| 172 | Cho'Gath | -0.87 | 0.00 | 0.87 |  |
