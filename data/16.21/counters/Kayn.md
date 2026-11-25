# Counters to Kayn (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kayn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kayn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kayn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.87 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.82 |
| 2 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.53 |
| 3 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.26 | – | +0.55 |
| 4 | Kayle | +0.85 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | −0.14 |
| 5 | Malphite | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.63 |
| 6 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.19 |
| 7 | Sivir | +0.84 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.28 |
| 8 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.82 |
| 9 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | – | +0.29 |
| 10 | Jayce | +0.83 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.51 |
| 11 | Yasuo | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.56 |
| 12 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.68 |
| 13 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.30 |
| 14 | Rakan | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.07 |
| 15 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.01 |
| 16 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | −0.01 |
| 17 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.44 |
| 18 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.76 |
| 19 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −0.39 |
| 20 | Kalista | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.02 |
| 21 | Malzahar | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.07 |
| 22 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.51 |
| 23 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.51 |
| 24 | Akshan | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.14 |
| 25 | Neeko | +0.80 | +1.00 | +0.98 | +1.00 | +0.09 | +0.98 | −0.09 |
| 26 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.13 |
| 27 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.17 |
| 28 | Sylas | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.05 |
| 29 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.18 | – | −0.15 |
| 30 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.15 |
| 31 | Yunara | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.27 |
| 32 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.23 |
| 33 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.42 |
| 34 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | −0.23 |
| 35 | Gnar | +0.80 | +1.00 | +0.98 | +1.00 | +0.12 | +1.00 | −0.35 |
| 36 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.29 |
| 37 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.66 |
| 38 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.04 |
| 39 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.06 |
| 40 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.09 |
| 41 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.09 |
| 42 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.13 |
| 43 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.02 |
| 44 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.04 |
| 45 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.05 |
| 46 | Rammus | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.27 |
| 47 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.03 |
| 48 | Maokai | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.23 |
| 49 | Gragas | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.10 |
| 50 | Braum | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.04 |
| 51 | Tahm Kench | +0.78 | +1.00 | +1.00 | +1.00 | +0.07 | – | −0.24 |
| 52 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.41 |
| 53 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.01 |
| 54 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.00 |
| 55 | Camille | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.18 |
| 56 | Singed | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.18 |
| 57 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.20 |
| 58 | Lulu | +0.76 | +1.00 | +1.00 | +1.00 | +0.07 | +0.46 | −0.01 |
| 59 | Zac | +0.75 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.34 |
| 60 | Cho'Gath | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.32 |
| 61 | Xin Zhao | +0.74 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.33 |
| 62 | Teemo | +0.73 | +1.00 | +0.65 | +1.00 | +0.16 | +1.00 | −0.08 |
| 63 | Aatrox | +0.73 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.53 |
| 64 | Kennen | +0.72 | +1.00 | +1.00 | +1.00 | −0.09 | +0.48 | −0.22 |
| 65 | Wukong | +0.69 | +1.00 | +1.00 | +0.35 | +0.28 | – | +0.21 |
| 66 | Karma | +0.69 | +0.51 | +1.00 | +1.00 | +0.06 | +1.00 | +0.05 |
| 67 | Akali | +0.64 | +0.82 | +0.72 | +0.93 | +0.06 | – | −0.00 |
| 68 | Aurora | +0.64 | +1.00 | +1.00 | +1.00 | +0.10 | −0.82 | +0.13 |
| 69 | Elise | +0.63 | +1.00 | +1.00 | +1.00 | +0.17 | −1.00 | +0.11 |
| 70 | Ashe | +0.63 | +1.00 | +1.00 | +0.14 | +0.04 | +1.00 | −0.18 |
| 71 | Urgot | +0.62 | +1.00 | +1.00 | +1.00 | +0.23 | −1.00 | −0.32 |
| 72 | Kai'Sa | +0.61 | +0.28 | +1.00 | +1.00 | +0.02 | +1.00 | −0.27 |
| 73 | Irelia | +0.59 | +0.67 | +0.95 | +0.42 | +0.23 | – | +0.11 |
| 74 | Corki | +0.58 | +0.07 | +1.00 | +1.00 | +0.06 | +1.00 | +0.07 |
| 75 | Hwei | +0.57 | +0.94 | +0.93 | +0.04 | +0.06 | +0.83 | +0.10 |
| 76 | Nilah | +0.57 | +1.00 | +1.00 | +0.00 | +0.02 | – | +0.22 |
| 77 | Riven | +0.55 | +1.00 | +0.00 | +1.00 | +0.18 | – | +0.39 |
| 78 | Orianna | +0.55 | +1.00 | +0.57 | +1.00 | +0.12 | −0.72 | +0.25 |
| 79 | Annie | +0.53 | +1.00 | +0.66 | +0.14 | +0.15 | +0.66 | +0.01 |
| 80 | Quinn | +0.53 | +0.42 | +0.42 | +1.00 | +0.18 | +1.00 | −0.05 |
| 81 | Bard | +0.53 | +0.86 | +0.86 | +1.00 | −0.02 | −0.91 | −0.10 |
| 82 | Shen | +0.53 | +0.19 | +1.00 | +0.84 | +0.09 | – | −0.03 |
| 83 | Ezreal | +0.51 | +0.81 | +0.02 | +0.95 | +0.09 | +0.92 | +0.10 |
| 84 | Caitlyn | +0.50 | +0.74 | +0.70 | +1.00 | +0.09 | −0.66 | −0.25 |
| 85 | Ambessa | +0.42 | +1.00 | +1.00 | −0.82 | +0.11 | – | +0.46 |
| 86 | Pantheon | +0.41 | +1.00 | +1.00 | −0.78 | +0.14 | – | +0.04 |
| 87 | Kassadin | +0.39 | +1.00 | +1.00 | −0.82 | −0.06 | – | +0.45 |
| 88 | Xayah | +0.39 | −0.84 | +1.00 | +1.00 | +0.18 | +1.00 | +0.39 |
| 89 | Rumble | +0.38 | −0.40 | +1.00 | +0.96 | −0.05 | – | +0.12 |
| 90 | Heimerdinger | +0.36 | +0.07 | +0.56 | +0.54 | +0.34 | +0.56 | −0.18 |
| 91 | Lillia | +0.34 | +0.05 | +0.41 | +0.54 | +0.01 | +1.00 | +0.27 |
| 92 | Shaco | +0.32 | +0.90 | +1.00 | −0.89 | +0.07 | – | −0.33 |
| 93 | Bel'Veth | +0.30 | −0.62 | +1.00 | +1.00 | −0.01 | – | −0.39 |
| 94 | Zilean | +0.30 | −0.16 | +0.42 | +1.00 | −0.08 | +0.47 | +0.04 |
| 95 | Tristana | +0.29 | −1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.28 |
| 96 | Mel | +0.28 | +0.79 | −0.30 | +0.87 | +0.00 | −0.07 | −0.11 |
| 97 | Cassiopeia | +0.24 | +0.86 | −0.66 | +1.00 | +0.32 | −0.66 | +0.19 |
| 98 | Brand | +0.23 | −0.38 | +0.80 | +0.94 | +0.09 | −0.63 | −0.26 |
| 99 | Smolder | +0.19 | +0.08 | +0.54 | +0.08 | +0.15 | +0.08 | −0.22 |
| 100 | Fizz | +0.18 | +0.57 | −0.72 | +1.00 | −0.07 | – | +0.24 |
| 101 | Jinx | +0.15 | +0.13 | +0.08 | +0.97 | +0.14 | −0.98 | −0.29 |
| 102 | Zeri | +0.15 | +0.03 | +0.03 | +0.03 | +0.06 | +1.00 | +0.41 |
| 103 | Vel'Koz | +0.09 | −0.55 | +0.99 | −0.64 | +0.24 | +0.69 | +0.13 |
| 104 | Rengar | +0.05 | +0.13 | +0.13 | −0.48 | +0.41 | – | +0.39 |
| 105 | Milio | +0.01 | −0.11 | +0.66 | −0.74 | +0.05 | +0.12 | +0.06 |
| 106 | Anivia | +0.01 | −0.12 | +0.11 | +0.13 | −0.12 | +0.03 | −0.03 |
| 107 | Swain | +0.01 | +0.02 | +0.64 | −0.91 | +0.19 | +0.02 | −0.10 |
| 108 | Varus | −0.01 | −0.71 | +1.00 | −0.84 | +0.02 | +0.85 | −0.02 |
| 109 | Lux | −0.01 | +0.18 | +0.15 | −0.09 | +0.07 | −0.80 | −0.17 |
| 110 | Nocturne | −0.02 | −0.07 | −0.07 | −0.07 | −0.01 | – | +0.66 |
| 111 | Lucian | −0.19 | −1.00 | +1.00 | −0.82 | +0.15 | −0.82 | +0.65 |
| 112 | Vex | −0.19 | +0.41 | −0.89 | +0.00 | +0.08 | −0.92 | +0.14 |
| 113 | Rell | −0.20 | −0.43 | −0.43 | −0.43 | +0.06 | +1.00 | −0.20 |
| 114 | Jhin | −0.23 | −0.94 | +1.00 | −0.94 | +0.24 | −0.75 | −0.33 |
| 115 | Rek'Sai | −0.23 | −0.97 | +1.00 | −0.97 | +0.02 | – | −0.45 |
| 116 | Samira | −0.27 | −0.06 | −0.95 | −0.53 | +0.04 | +1.00 | −0.34 |
| 117 | Amumu | −0.28 | −1.00 | +0.76 | −1.00 | −0.00 | – | +0.18 |
| 118 | Ziggs | −0.36 | −0.79 | −1.00 | +0.77 | +0.14 | −0.77 | −0.18 |
| 119 | Nami | −0.37 | −0.96 | +0.37 | −0.92 | +0.12 | −0.53 | −0.10 |
| 120 | Draven | −0.51 | −0.26 | −0.84 | −0.84 | +0.18 | −0.84 | −0.30 |
| 121 | Zyra | −0.57 | −1.00 | −0.25 | −0.81 | −0.01 | −1.00 | +0.05 |
| 122 | Kindred | −0.58 | −0.79 | −0.85 | −0.85 | +0.08 | +0.00 | −0.31 |
| 123 | Miss Fortune | −0.61 | −0.25 | −1.00 | −1.00 | +0.14 | −1.00 | −0.39 |
| 124 | Leona | −0.62 | −0.65 | −1.00 | −0.66 | −0.11 | – | +0.03 |
| 125 | Azir | −0.63 | −0.69 | −0.69 | −1.00 | +0.07 | −0.84 | −0.23 |
| 126 | Syndra | −0.66 | −1.00 | −0.69 | −1.00 | +0.12 | −0.55 | +0.03 |
| 127 | Jarvan IV | −0.66 | −0.90 | −0.90 | −0.80 | −0.01 | – | +0.34 |
| 128 | Zoe | −0.67 | −0.95 | −0.54 | −1.00 | +0.05 | −0.95 | −0.15 |
| 129 | Viktor | −0.68 | −0.84 | −0.84 | −0.82 | −0.01 | −0.85 | −0.17 |
| 130 | Sejuani | −0.72 | −0.99 | −0.90 | −0.90 | −0.00 | – | +0.09 |
| 131 | Evelynn | −0.73 | −1.00 | −1.00 | −1.00 | +0.23 | – | +0.14 |
| 132 | Ryze | −0.73 | −0.80 | −0.99 | −1.00 | +0.07 | −0.80 | −0.32 |
| 133 | Twitch | −0.73 | −0.76 | −0.99 | −1.00 | +0.07 | −0.99 | −0.13 |
| 134 | Janna | −0.74 | −0.89 | −1.00 | −1.00 | +0.16 | −0.73 | −0.30 |
| 135 | Lissandra | −0.74 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.35 |
| 136 | Vi | −0.75 | −0.94 | −0.94 | −0.94 | −0.10 | – | +0.05 |
| 137 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | −0.25 |
| 138 | Briar | −0.75 | −0.96 | −1.00 | −1.00 | +0.10 | – | +0.08 |
| 139 | Nidalee | −0.75 | −0.68 | −1.00 | −1.00 | −0.03 | −1.00 | −0.44 |
| 140 | Skarner | −0.75 | −0.91 | −0.91 | −0.91 | −0.13 | – | −0.40 |
| 141 | Morgana | −0.75 | −1.00 | −0.94 | −1.00 | +0.09 | −1.00 | +0.39 |
| 142 | Kha'Zix | −0.75 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.71 |
| 143 | Zed | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.42 |
| 144 | Master Yi | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.67 |
| 145 | Karthus | −0.76 | −1.00 | −0.83 | −1.00 | +0.01 | −1.00 | −0.04 |
| 146 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.08 |
| 147 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.04 |
| 148 | Nautilus | −0.76 | −1.00 | −1.00 | −0.93 | +0.05 | −0.93 | +0.16 |
| 149 | LeBlanc | −0.77 | −0.81 | −1.00 | −1.00 | −0.03 | −1.00 | −0.21 |
| 150 | Locke | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.11 |
| 151 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.16 |
| 152 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.21 |
| 153 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.28 |
| 154 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.15 |
| 155 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.04 |
| 156 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.04 |
| 157 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.07 |
| 158 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.28 |
| 159 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.20 |
| 160 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.02 |
| 161 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.27 |
| 162 | Sona | −0.80 | −1.00 | −0.99 | −1.00 | −0.02 | −1.00 | +0.01 |
| 163 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.11 |
| 164 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.10 |
| 165 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.25 |
| 166 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.32 |
| 167 | Soraka | −0.82 | −1.00 | −1.00 | −0.99 | −0.03 | −1.00 | −0.24 |
| 168 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.42 |
| 169 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.59 |
| 170 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.60 |
| 171 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.53 |
| 172 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.22 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kayn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Singed (net +1.37)

- **0.45** interrupt: Fling's airborne interrupts Kayn's Umbral Trespass (movement channel). Fling must land during the channel. (Singed E Fling → Kayn R Umbral Trespass)
- **0.44** grounding: Mega Adhesive grounds Kayn, who then can't cast Umbral Trespass. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn R Umbral Trespass)
- **0.39** grounding: Mega Adhesive grounds Kayn, who then can't cast Reaping Slash. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Kayn Q Reaping Slash)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Singed's Fling.

#### 2. Rell (net +1.08)

- **0.45** interrupt: Ferromancy: Crash Down's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Kayn R Umbral Trespass)
- **0.45** interrupt: Ferromancy: Mount Up's airborne interrupts Kayn's Umbral Trespass (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Kayn R Umbral Trespass)
- **0.45** interrupt: Full Tilt's stun interrupts Kayn's Umbral Trespass (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Rell's Magnet Storm.

#### 3. Sivir (net +0.99)

- **0.49** spell shield: Spell Shield's spell shield blocks Kayn's Blade's Reach. Spell shield for 1.5 s, long enough to use ahead of Blade's Reach. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayn W Blade's Reach)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Kayn's Umbral Trespass. Spell shield for 1.5 s, long enough to use ahead of Umbral Trespass. A spell shield blocks only the first enemy ability that reaches it. If Umbral Trespass is targeted on an enemy with a spell shield or a Fiora with her Riposte active, the ability will fail to cast entirely, being placed on full cooldown without triggering the active's effects (as well as on-cast effects).
  - Spell shield will not block the damage from the recast. (Sivir E Spell Shield → Kayn R Umbral Trespass)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Kayn's (500 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Sivir basic attacks → Kayn basic attacks)

#### 4. Blitzcrank (net +0.82)

- **0.45** interrupt: Power Fist's airborne interrupts Kayn's Umbral Trespass (movement channel). Power Fist must land during the channel. (Blitzcrank E Power Fist → Kayn R Umbral Trespass)
- **0.45** interrupt: Rocket Grab's airborne interrupts Kayn's Umbral Trespass (movement channel). Rocket Grab must land during the channel. (Blitzcrank Q Rocket Grab → Kayn R Umbral Trespass)
- **0.45** interrupt: Static Field's silence interrupts Kayn's Umbral Trespass (movement channel). Static Field must land during the channel. (Blitzcrank R Static Field → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Blitzcrank's Rocket Grab.

#### 5. Kayle (net +0.65)

- **0.45** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Umbral Trespass (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Umbral Trespass. (Kayle R Divine Judgment → Kayn R Umbral Trespass)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Kayn's (625 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Kayle basic attacks → Kayn basic attacks)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Kayn's Blade's Reach (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Blade's Reach. (Kayle R Divine Judgment → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Kayle's Starfire Spellblade.

#### 6. Fiora (net +0.62)

- **0.62** parry: Riposte parries Kayn's Blade's Reach and stuns back. Parry for 0.75 s; Blade's Reach takes 0.55 s to land, enough to react. Negating Blade's Reach's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Kayn W Blade's Reach)
- **0.54** parry: Riposte parries Kayn's Umbral Trespass. Parry for 0.75 s; Umbral Trespass lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Kayn R Umbral Trespass)
- **0.06** attack speed slow: Riposte cuts Kayn's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Fiora's Riposte.

#### 7. Lulu (net +0.60)

- **0.45** interrupt: Whimsy's polymorph interrupts Kayn's Umbral Trespass (movement channel). Whimsy must land during the channel. (Lulu W Whimsy → Kayn R Umbral Trespass)
- **0.45** interrupt: Wild Growth's airborne interrupts Kayn's Umbral Trespass (movement channel). Wild Growth must land during the channel. (Lulu R Wild Growth → Kayn R Umbral Trespass)
- **0.22** disarm: Whimsy disarms Kayn for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Lulu's Wild Growth.

#### 8. Heimerdinger (net +0.58)

- **0.45** interrupt: CH-2 Electron Storm Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-2 Electron Storm Grenade must land during the channel. (Heimerdinger E CH-2 Electron Storm Grenade → Kayn R Umbral Trespass)
- **0.45** interrupt: CH-3X Lightning Grenade's stun interrupts Kayn's Umbral Trespass (movement channel). CH-3X Lightning Grenade must land during the channel. (Heimerdinger E CH-3X Lightning Grenade → Kayn R Umbral Trespass)
- **0.12** range: Heimerdinger's basic attacks reach 375 units farther than Kayn's (550 vs 175 attack range). Kayn closes the gap with Reaping Slash, Umbral Trespass. (Heimerdinger basic attacks → Kayn basic attacks)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Heimerdinger's CH-2 Electron Storm Grenade.

#### 9. Udyr (net +0.58)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Kayn's Blade's Reach (airborne, slow). Immune for 1.5 s, long enough to use ahead of Blade's Reach. (Udyr E Blazing Stampede → Kayn W Blade's Reach)
- **0.45** interrupt: Blazing Stampede's stun interrupts Kayn's Umbral Trespass (movement channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Kayn R Umbral Trespass)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Udyr's Blazing Stampede.

#### 10. Alistar (net +0.56)

- **0.45** interrupt: Pulverize's airborne interrupts Kayn's Umbral Trespass (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Kayn R Umbral Trespass)
- **0.45** interrupt: Trample's stun interrupts Kayn's Umbral Trespass (movement channel). Trample must land during the channel. (Alistar E Trample → Kayn R Umbral Trespass)
- **0.26** cleanse: Unbreakable Will cleanses Kayn's Blade's Reach (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Kayn W Blade's Reach)
- Watch out: Umbral Trespass makes Kayn untargetable, dodging Alistar's Headbutt.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Singed | +1.37 | 1.80 | 0.43 | grounding (Mega Adhesive) |
| 2 | Rell | +1.08 | 2.25 | 1.17 |  |
| 3 | Sivir | +0.99 | 0.99 | 0.00 |  |
| 4 | Blitzcrank | +0.82 | 1.35 | 0.53 |  |
| 5 | Kayle | +0.65 | 0.77 | 0.12 |  |
| 6 | Fiora | +0.62 | 0.91 | 0.29 |  |
| 7 | Lulu | +0.60 | 1.23 | 0.63 |  |
| 8 | Heimerdinger | +0.58 | 1.09 | 0.51 |  |
| 9 | Udyr | +0.58 | 0.93 | 0.35 |  |
| 10 | Alistar | +0.56 | 1.16 | 0.60 |  |
| 11 | Anivia | +0.45 | 1.06 | 0.61 |  |
| 12 | Malzahar | +0.43 | 1.46 | 1.03 |  |
| 13 | Viktor | +0.43 | 1.21 | 0.78 |  |
| 14 | Gnar | +0.43 | 1.09 | 0.66 |  |
| 15 | Milio | +0.43 | 0.76 | 0.33 |  |
| 16 | Sion | +0.42 | 1.07 | 0.65 |  |
| 17 | Zilean | +0.42 | 0.65 | 0.23 |  |
| 18 | Shaco | +0.37 | 0.92 | 0.55 |  |
| 19 | Riven | +0.37 | 0.90 | 0.53 |  |
| 20 | Nocturne | +0.35 | 1.35 | 1.00 |  |
| 21 | Fizz | +0.35 | 1.29 | 0.94 |  |
| 22 | Xayah | +0.35 | 0.78 | 0.43 |  |
| 23 | Vladimir | +0.34 | 0.85 | 0.51 |  |
| 24 | Zoe | +0.30 | 0.65 | 0.35 |  |
| 25 | Soraka | +0.26 | 0.62 | 0.36 |  |
| 26 | Yasuo | +0.25 | 0.90 | 0.65 |  |
| 27 | Master Yi | +0.25 | 0.74 | 0.49 |  |
| 28 | Cassiopeia | +0.24 | 1.21 | 0.97 | grounding (Miasma) |
| 29 | Camille | +0.24 | 1.10 | 0.86 |  |
| 30 | Taric | +0.24 | 0.45 | 0.21 |  |
| 31 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 32 | Aurelion Sol | +0.21 | 0.99 | 0.78 |  |
| 33 | Vayne | +0.20 | 0.72 | 0.52 |  |
| 34 | Sejuani | +0.19 | 1.32 | 1.13 |  |
| 35 | Cho'Gath | +0.19 | 0.90 | 0.71 |  |
| 36 | Jayce | +0.19 | 0.63 | 0.44 |  |
| 37 | Thresh | +0.18 | 1.01 | 0.83 |  |
| 38 | Yorick | +0.17 | 0.45 | 0.28 |  |
| 39 | Twisted Fate | +0.16 | 0.70 | 0.54 |  |
| 40 | Quinn | +0.16 | 0.67 | 0.51 |  |
| 41 | Twitch | +0.16 | 0.27 | 0.11 |  |
| 42 | Sett | +0.14 | 0.94 | 0.80 |  |
| 43 | Aurora | +0.14 | 0.64 | 0.50 |  |
| 44 | Maokai | +0.13 | 1.25 | 1.12 |  |
| 45 | Elise | +0.13 | 0.65 | 0.52 |  |
| 46 | Olaf | +0.13 | 0.33 | 0.20 |  |
| 47 | Bard | +0.12 | 0.97 | 0.85 |  |
| 48 | Zaahen | +0.11 | 1.23 | 1.12 |  |
| 49 | Vex | +0.11 | 0.81 | 0.70 |  |
| 50 | Kai'Sa | +0.11 | 0.22 | 0.11 |  |
| 51 | Sylas | +0.10 | 0.45 | 0.35 |  |
| 52 | K'Sante | +0.09 | 1.42 | 1.33 |  |
| 53 | Renata Glasc | +0.09 | 1.07 | 0.98 |  |
| 54 | Veigar | +0.08 | 0.73 | 0.65 |  |
| 55 | Gwen | +0.08 | 0.63 | 0.55 |  |
| 56 | Teemo | +0.06 | 0.50 | 0.44 |  |
| 57 | Kindred | +0.06 | 0.27 | 0.21 |  |
| 58 | Xin Zhao | +0.05 | 1.09 | 1.04 |  |
| 59 | Yuumi | +0.05 | 1.01 | 0.96 |  |
| 60 | Braum | +0.05 | 0.85 | 0.80 |  |
| 61 | Kalista | +0.04 | 0.68 | 0.64 |  |
| 62 | Aatrox | +0.03 | 0.45 | 0.42 |  |
| 63 | Urgot | +0.02 | 0.98 | 0.96 |  |
| 64 | Lissandra | +0.02 | 0.92 | 0.90 |  |
| 65 | Rek'Sai | +0.01 | 1.08 | 1.07 |  |
| 66 | Seraphine | +0.01 | 0.98 | 0.97 |  |
| 67 | Ashe | +0.01 | 0.69 | 0.68 |  |
| 68 | Rengar | 0.00 | 0.53 | 0.53 |  |
| 69 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 70 | Nilah | -0.01 | 0.67 | 0.68 |  |
| 71 | Nami | -0.02 | 0.99 | 1.01 |  |
| 72 | Janna | -0.04 | 1.07 | 1.11 |  |
| 73 | Nidalee | -0.04 | 0.18 | 0.22 |  |
| 74 | Leona | -0.05 | 0.90 | 0.95 |  |
| 75 | Kennen | -0.05 | 0.63 | 0.68 |  |
| 76 | Shyvana | -0.05 | 0.49 | 0.54 |  |
| 77 | Nasus | -0.05 | 0.24 | 0.29 |  |
| 78 | Jinx | -0.06 | 0.45 | 0.51 |  |
| 79 | Garen | -0.07 | 0.57 | 0.64 |  |
| 80 | Draven | -0.08 | 0.67 | 0.75 |  |
| 81 | Morgana | -0.09 | 0.63 | 0.72 |  |
| 82 | Hwei | -0.10 | 0.73 | 0.83 |  |
| 83 | Ziggs | -0.10 | 0.62 | 0.72 |  |
| 84 | Kassadin | -0.10 | 0.45 | 0.55 |  |
| 85 | Zed | -0.10 | 0.44 | 0.54 |  |
| 86 | Corki | -0.10 | 0.20 | 0.30 |  |
| 87 | Kog'Maw | -0.10 | 0.16 | 0.26 |  |
| 88 | Fiddlesticks | -0.11 | 1.01 | 1.12 |  |
| 89 | Amumu | -0.11 | 0.94 | 1.05 |  |
| 90 | Rakan | -0.11 | 0.93 | 1.04 |  |
| 91 | Kled | -0.12 | 1.04 | 1.16 |  |
| 92 | Bel'Veth | -0.12 | 0.45 | 0.57 |  |
| 93 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 94 | Varus | -0.13 | 0.66 | 0.79 |  |
| 95 | Zac | -0.14 | 1.48 | 1.62 |  |
| 96 | Katarina | -0.14 | 0.48 | 0.62 |  |
| 97 | Ahri | -0.15 | 0.72 | 0.87 |  |
| 98 | Yone | -0.16 | 1.06 | 1.22 |  |
| 99 | Annie | -0.16 | 0.60 | 0.76 |  |
| 100 | Vel'Koz | -0.17 | 0.61 | 0.78 |  |
| 101 | Brand | -0.17 | 0.59 | 0.76 |  |
| 102 | Syndra | -0.17 | 0.59 | 0.76 |  |
| 103 | Samira | -0.18 | 0.18 | 0.36 |  |
| 104 | Warwick | -0.20 | 1.18 | 1.38 |  |
| 105 | Sona | -0.20 | 0.66 | 0.86 |  |
| 106 | Mordekaiser | -0.20 | 0.51 | 0.71 |  |
| 107 | Renekton | -0.20 | 0.45 | 0.65 |  |
| 108 | Swain | -0.21 | 0.57 | 0.78 |  |
| 109 | Gangplank | -0.21 | 0.44 | 0.65 |  |
| 110 | LeBlanc | -0.21 | 0.13 | 0.34 |  |
| 111 | Tahm Kench | -0.22 | 1.35 | 1.57 |  |
| 112 | Poppy | -0.22 | 0.97 | 1.19 | dash stop (Steadfast Presence) |
| 113 | Tristana | -0.22 | 0.64 | 0.86 |  |
| 114 | Xerath | -0.22 | 0.61 | 0.83 |  |
| 115 | Jax | -0.23 | 0.57 | 0.80 |  |
| 116 | Lee Sin | -0.23 | 0.45 | 0.68 |  |
| 117 | Zeri | -0.23 | 0.28 | 0.51 |  |
| 118 | Galio | -0.24 | 1.23 | 1.47 |  |
| 119 | Wukong | -0.24 | 0.42 | 0.66 |  |
| 120 | Rammus | -0.26 | 1.14 | 1.40 |  |
| 121 | Taliyah | -0.27 | 1.42 | 1.69 |  |
| 122 | Gragas | -0.28 | 0.90 | 1.18 |  |
| 123 | Evelynn | -0.29 | 0.92 | 1.21 |  |
| 124 | Shen | -0.30 | 0.69 | 0.99 |  |
| 125 | Orianna | -0.30 | 0.61 | 0.91 |  |
| 126 | Darius | -0.31 | 0.45 | 0.76 |  |
| 127 | Irelia | -0.31 | 0.45 | 0.76 |  |
| 128 | Karma | -0.31 | 0.13 | 0.44 |  |
| 129 | Azir | -0.32 | 0.58 | 0.90 |  |
| 130 | Trundle | -0.32 | 0.45 | 0.77 |  |
| 131 | Pyke | -0.34 | 0.90 | 1.24 |  |
| 132 | Ornn | -0.36 | 0.92 | 1.28 |  |
| 133 | Skarner | -0.36 | 0.51 | 0.87 |  |
| 134 | Lillia | -0.37 | 0.43 | 0.80 |  |
| 135 | Lux | -0.38 | 0.18 | 0.56 |  |
| 136 | Zyra | -0.39 | 0.58 | 0.97 |  |
| 137 | Kha'Zix | -0.40 | 0.00 | 0.40 |  |
| 138 | Diana | -0.41 | 0.45 | 0.86 |  |
| 139 | Neeko | -0.43 | 0.56 | 0.99 |  |
| 140 | Ezreal | -0.46 | 0.20 | 0.66 |  |
| 141 | Graves | -0.46 | 0.14 | 0.60 |  |
| 142 | Smolder | -0.47 | 0.20 | 0.67 |  |
| 143 | Ivern | -0.50 | 0.11 | 0.61 |  |
| 144 | Miss Fortune | -0.53 | 0.20 | 0.73 |  |
| 145 | Malphite | -0.54 | 0.60 | 1.14 |  |
| 146 | Nautilus | -0.54 | 0.45 | 0.99 |  |
| 147 | Talon | -0.54 | 0.00 | 0.54 |  |
| 148 | Viego | -0.55 | 0.94 | 1.49 |  |
| 149 | Mel | -0.55 | 0.17 | 0.72 |  |
| 150 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 151 | Nunu & Willump | -0.56 | 0.55 | 1.11 |  |
| 152 | Illaoi | -0.56 | 0.07 | 0.63 |  |
| 153 | Volibear | -0.58 | 0.52 | 1.10 |  |
| 154 | Senna | -0.58 | 0.22 | 0.80 |  |
| 155 | Pantheon | -0.59 | 0.57 | 1.16 |  |
| 156 | Ambessa | -0.60 | 0.40 | 1.00 |  |
| 157 | Ryze | -0.65 | 0.15 | 0.80 |  |
| 158 | Vi | -0.66 | 0.91 | 1.57 |  |
| 159 | Akshan | -0.67 | 0.19 | 0.86 |  |
| 160 | Hecarim | -0.69 | 0.44 | 1.13 |  |
| 161 | Aphelios | -0.69 | 0.31 | 1.00 |  |
| 162 | Lucian | -0.72 | 0.21 | 0.93 |  |
| 163 | Karthus | -0.72 | 0.11 | 0.83 |  |
| 164 | Jarvan IV | -0.73 | 0.45 | 1.18 |  |
| 165 | Qiyana | -0.73 | 0.36 | 1.09 |  |
| 166 | Locke | -0.74 | 0.00 | 0.74 |  |
| 167 | Caitlyn | -0.76 | 0.24 | 1.00 |  |
| 168 | Briar | -0.79 | 0.45 | 1.24 |  |
| 169 | Akali | -0.83 | 0.00 | 0.83 |  |
| 170 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 171 | Jhin | -0.90 | 0.17 | 1.07 |  |
| 172 | Naafiri | -1.35 | 0.00 | 1.35 |  |
