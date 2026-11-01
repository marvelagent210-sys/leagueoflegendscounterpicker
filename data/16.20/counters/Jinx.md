# Counters to Jinx (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Jinx: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jinx wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jinx --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Aurelion Sol | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | +0.00 |
| 2 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +1.00 |
| 4 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +1.00 |
| 5 | Sylas | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 6 | Trundle | +0.82 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +1.00 |
| 7 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 8 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 9 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 10 | Master Yi | +0.80 | +1.00 | +1.00 | +0.78 | −0.03 | +1.00 | +1.00 |
| 11 | Gragas | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 12 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +0.98 | +0.00 |
| 13 | Swain | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 14 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 15 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 16 | Dr. Mundo | +0.78 | +0.99 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 17 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 18 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 19 | Xayah | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 20 | Varus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 21 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 22 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 23 | Yunara | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 24 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 25 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 26 | Lucian | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 27 | Fiddlesticks | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 28 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 29 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 30 | Gwen | +0.76 | +1.00 | +1.00 | +0.99 | −0.28 | +1.00 | +0.00 |
| 31 | Rumble | +0.75 | +0.99 | +0.99 | +1.00 | −0.10 | +0.73 | +0.00 |
| 32 | Kayle | +0.74 | +1.00 | +1.00 | +1.00 | −0.06 | +0.50 | +0.00 |
| 33 | Poppy | +0.73 | +1.00 | +1.00 | +0.64 | +0.02 | +1.00 | +0.00 |
| 34 | Rengar | +0.71 | +1.00 | +1.00 | +0.75 | +0.37 | +0.04 | +0.00 |
| 35 | Tristana | +0.70 | +1.00 | +1.00 | +1.00 | +0.03 | −0.03 | +0.00 |
| 36 | Yasuo | +0.65 | +1.00 | +0.40 | +1.00 | +0.03 | +1.00 | +0.00 |
| 37 | Karma | +0.65 | +0.60 | +0.93 | +1.00 | +0.02 | – | +0.00 |
| 38 | Udyr | +0.62 | +1.00 | +0.51 | +0.83 | −0.18 | +1.00 | +0.00 |
| 39 | Heimerdinger | +0.61 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | +0.00 |
| 40 | Maokai | +0.60 | +0.29 | +1.00 | +1.00 | −0.04 | +0.88 | +0.00 |
| 41 | Zac | +0.60 | +0.57 | +0.57 | +0.99 | +0.09 | +1.00 | +0.00 |
| 42 | Akshan | +0.57 | +1.00 | +1.00 | +0.13 | −0.07 | – | +0.00 |
| 43 | Azir | +0.48 | +1.00 | +1.00 | −0.31 | −0.02 | – | +0.00 |
| 44 | Kled | +0.46 | +0.94 | +0.94 | +0.17 | −0.11 | −0.29 | +0.00 |
| 45 | Gangplank | +0.44 | +0.30 | +0.30 | +1.00 | +0.17 | +0.11 | +1.00 |
| 46 | Graves | +0.40 | +0.36 | +0.36 | +1.00 | +0.04 | +0.11 | +0.00 |
| 47 | Lillia | +0.38 | +0.90 | +0.90 | −0.14 | −0.03 | −0.34 | +0.00 |
| 48 | Hwei | +0.36 | +0.62 | −0.11 | +1.00 | −0.04 | – | +0.00 |
| 49 | Aphelios | +0.32 | +1.00 | +1.00 | −0.99 | −0.07 | – | +0.00 |
| 50 | Sion | +0.29 | +0.72 | +0.01 | +0.11 | −0.07 | +0.95 | +0.00 |
| 51 | Jhin | +0.28 | +0.10 | +0.10 | +1.00 | +0.06 | – | +0.00 |
| 52 | Malphite | +0.26 | −0.04 | −0.04 | +1.00 | +0.00 | +0.87 | +0.00 |
| 53 | Darius | +0.26 | +0.51 | +0.35 | −0.14 | −0.21 | +1.00 | +0.00 |
| 54 | Tahm Kench | +0.25 | +0.10 | +0.10 | +0.55 | +0.00 | +0.90 | +0.00 |
| 55 | Ziggs | +0.24 | +1.00 | −1.00 | +1.00 | +0.13 | – | +0.00 |
| 56 | Kassadin | +0.24 | +0.18 | +1.00 | −0.43 | −0.13 | +0.49 | +0.00 |
| 57 | Zaahen | +0.21 | +0.51 | +0.31 | −0.22 | +0.09 | +0.39 | +0.00 |
| 58 | Kindred | +0.21 | +1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 59 | Camille | +0.20 | +0.00 | +1.00 | −0.66 | −0.12 | +1.00 | +0.00 |
| 60 | Mordekaiser | +0.19 | +0.71 | −0.40 | +1.00 | −0.09 | −0.70 | +0.00 |
| 61 | Briar | +0.19 | −0.20 | −0.20 | +1.00 | −0.08 | +1.00 | +0.00 |
| 62 | Anivia | +0.18 | +0.38 | −0.02 | +0.44 | −0.11 | – | +0.00 |
| 63 | Tryndamere | +0.17 | +1.00 | −0.71 | +0.10 | −0.17 | +1.00 | +0.00 |
| 64 | Quinn | +0.14 | −1.00 | +0.77 | +1.00 | −0.10 | – | +0.00 |
| 65 | Bel'Veth | +0.13 | −0.89 | +1.00 | +1.00 | −0.06 | −0.91 | +0.00 |
| 66 | Nilah | +0.12 | +0.12 | −0.35 | +1.00 | +0.03 | −0.23 | +0.00 |
| 67 | Nocturne | +0.12 | −0.16 | +0.01 | +0.62 | −0.12 | +0.51 | +0.00 |
| 68 | Shyvana | +0.07 | −0.24 | −0.65 | +1.00 | −0.07 | +1.00 | +0.00 |
| 69 | Shaco | +0.06 | −0.00 | +1.00 | −0.38 | −0.07 | −1.00 | +0.00 |
| 70 | Smolder | +0.06 | −0.29 | −0.29 | +1.00 | −0.04 | – | +0.00 |
| 71 | Garen | +0.04 | −0.59 | +0.98 | −0.68 | +0.03 | +0.54 | +0.37 |
| 72 | Draven | +0.04 | +0.17 | +0.00 | +0.00 | −0.06 | – | +0.00 |
| 73 | Renekton | +0.04 | −0.00 | +1.00 | −1.00 | −0.10 | −0.00 | +0.00 |
| 74 | Yone | +0.03 | −0.62 | −0.01 | +1.00 | −0.06 | −0.07 | +0.00 |
| 75 | Taric | +0.02 | +0.05 | −0.05 | +0.07 | +0.03 | +0.01 | +0.00 |
| 76 | Cassiopeia | +0.00 | +0.06 | −0.81 | +1.00 | −0.06 | – | +0.00 |
| 77 | Xin Zhao | −0.01 | −0.03 | −0.12 | −0.34 | −0.04 | +1.00 | +0.00 |
| 78 | Nautilus | −0.03 | +0.98 | +0.07 | −1.00 | +0.08 | −1.00 | +0.00 |
| 79 | Zilean | −0.04 | −0.08 | +0.81 | −1.00 | −0.11 | – | +0.00 |
| 80 | Rammus | −0.05 | −0.00 | +0.20 | −0.71 | −0.06 | +0.52 | +0.00 |
| 81 | Mel | −0.09 | −1.00 | −0.12 | +1.00 | +0.01 | – | +0.00 |
| 82 | Kai'Sa | −0.13 | −0.54 | −0.54 | +0.84 | −0.12 | – | +0.00 |
| 83 | Diana | −0.13 | −0.43 | +0.24 | −0.43 | +0.11 | −0.15 | +0.00 |
| 84 | Sona | −0.13 | +0.29 | +0.06 | −1.00 | −0.05 | – | +0.00 |
| 85 | Vi | −0.21 | −0.66 | +1.00 | −0.96 | −0.04 | −1.00 | +0.00 |
| 86 | Lee Sin | −0.21 | −0.37 | −0.76 | +0.28 | −0.05 | +0.20 | +0.00 |
| 87 | Riven | −0.22 | +0.04 | −1.00 | −0.35 | −0.09 | +1.00 | +0.00 |
| 88 | Vel'Koz | −0.30 | −1.00 | −1.00 | +1.00 | +0.22 | −0.32 | +0.00 |
| 89 | Pantheon | −0.31 | −0.79 | −0.57 | −0.27 | −0.09 | +1.00 | +0.00 |
| 90 | Ornn | −0.31 | −0.57 | −0.14 | −0.31 | −0.05 | −0.62 | +0.00 |
| 91 | Neeko | −0.31 | −0.97 | −1.00 | +1.00 | −0.02 | −0.14 | +0.00 |
| 92 | Irelia | −0.33 | −0.45 | −1.00 | +0.05 | +0.02 | +0.23 | +0.00 |
| 93 | Ambessa | −0.33 | −0.40 | +0.20 | −1.00 | −0.23 | −0.40 | +0.00 |
| 94 | Lux | −0.34 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.00 |
| 95 | Malzahar | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 96 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 97 | Miss Fortune | −0.34 | −1.00 | −1.00 | +1.00 | −0.05 | – | +0.00 |
| 98 | Wukong | −0.35 | −0.37 | −0.96 | +0.34 | −0.15 | −0.62 | +0.00 |
| 99 | Lissandra | −0.35 | −0.24 | −1.00 | +0.00 | −0.04 | – | +0.00 |
| 100 | Olaf | −0.35 | −0.81 | −0.91 | +1.00 | −0.17 | −1.00 | +0.00 |
| 101 | Elise | −0.37 | −1.00 | −1.00 | +0.84 | −0.02 | – | +0.00 |
| 102 | Annie | −0.40 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 103 | Ryze | −0.40 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 104 | Brand | −0.41 | −1.00 | −1.00 | +1.00 | −0.06 | −0.99 | +0.00 |
| 105 | Urgot | −0.42 | −1.00 | −1.00 | +0.92 | −0.03 | −1.00 | +0.00 |
| 106 | Illaoi | −0.43 | +0.38 | −0.86 | −1.00 | −0.04 | −1.00 | +0.00 |
| 107 | Ashe | −0.47 | −0.98 | −0.98 | +0.38 | −0.08 | – | +0.00 |
| 108 | Karthus | −0.48 | −0.69 | −0.90 | −0.14 | −0.02 | – | +0.00 |
| 109 | Volibear | −0.50 | −0.85 | −0.33 | −0.85 | −0.03 | −0.28 | +0.00 |
| 110 | Kalista | −0.54 | −0.57 | −0.87 | −0.57 | −0.09 | – | +0.00 |
| 111 | Zyra | −0.57 | −1.00 | −0.26 | −0.75 | −0.03 | −1.00 | +0.00 |
| 112 | Skarner | −0.57 | −0.87 | −0.87 | −0.81 | +0.14 | +0.04 | +0.00 |
| 113 | Sejuani | −0.60 | −0.95 | −0.69 | −0.95 | −0.04 | +0.01 | +0.00 |
| 114 | Gnar | −0.62 | −0.86 | −0.63 | −0.66 | −0.09 | −1.00 | +0.00 |
| 115 | Singed | −0.62 | −0.28 | −1.00 | −1.00 | −0.13 | −0.79 | +0.00 |
| 116 | Warwick | −0.62 | −0.80 | −0.83 | −0.77 | +0.11 | −0.80 | +0.00 |
| 117 | Amumu | −0.63 | −0.98 | −0.69 | −0.85 | −0.01 | −0.41 | +0.00 |
| 118 | Milio | −0.66 | −1.00 | −1.00 | −0.55 | +0.12 | – | +0.00 |
| 119 | Zed | −0.67 | −0.40 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 120 | Soraka | −0.68 | −1.00 | −1.00 | −0.59 | +0.02 | – | +0.00 |
| 121 | Morgana | −0.69 | −1.00 | −1.00 | −0.56 | −0.04 | – | +0.00 |
| 122 | Leona | −0.69 | −0.80 | −0.80 | −1.00 | −0.01 | −0.88 | +0.00 |
| 123 | Shen | −0.70 | −0.69 | −1.00 | −0.96 | +0.02 | −0.87 | +0.00 |
| 124 | Jarvan IV | −0.70 | −0.93 | −0.93 | −0.93 | +0.09 | −0.67 | +0.00 |
| 125 | Rek'Sai | −0.71 | −0.90 | −0.88 | −0.81 | −0.08 | −0.90 | +0.00 |
| 126 | Kayn | −0.71 | −0.79 | −0.87 | −0.99 | −0.14 | −0.80 | +0.00 |
| 127 | Nunu & Willump | −0.72 | −1.00 | −1.00 | −0.70 | +0.12 | −1.00 | +0.00 |
| 128 | Nidalee | −0.73 | −0.98 | −0.98 | −0.78 | −0.08 | – | +0.00 |
| 129 | Zoe | −0.74 | −1.00 | −1.00 | −1.00 | +0.03 | −0.39 | +0.00 |
| 130 | Xerath | −0.74 | −0.79 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 131 | Sett | −0.75 | −0.79 | −0.99 | −1.00 | −0.15 | −0.82 | +0.00 |
| 132 | Vex | −0.76 | −1.00 | −1.00 | −0.87 | −0.07 | – | +0.00 |
| 133 | Aatrox | −0.77 | −1.00 | −0.98 | −0.72 | −0.19 | −1.00 | +0.00 |
| 134 | Galio | −0.77 | −1.00 | −1.00 | −0.88 | −0.00 | −0.95 | +0.00 |
| 135 | Rakan | −0.77 | −1.00 | −1.00 | −0.89 | +0.04 | −1.00 | +0.00 |
| 136 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 137 | Corki | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 138 | Akali | −0.78 | −1.00 | −1.00 | −0.86 | −0.05 | −0.99 | +0.00 |
| 139 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −0.99 | +0.00 |
| 140 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 141 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 142 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 143 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 144 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 145 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 146 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 147 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 148 | Viktor | −0.79 | −1.00 | −1.00 | −0.99 | −0.08 | – | +0.00 |
| 149 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 150 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 151 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | −0.85 | +0.00 |
| 152 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 153 | Hecarim | −0.79 | −1.00 | −1.00 | −0.98 | −0.02 | −0.92 | +0.00 |
| 154 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 155 | Braum | −0.80 | −1.00 | −0.96 | −0.99 | −0.05 | −1.00 | +0.00 |
| 156 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 157 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 158 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 159 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 160 | Ekko | −0.80 | −0.90 | −1.00 | −0.99 | −0.17 | −1.00 | +0.00 |
| 161 | Cho'Gath | −0.81 | −0.99 | −0.99 | −0.97 | −0.12 | −1.00 | +0.00 |
| 162 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 163 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 164 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 165 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 166 | Talon | −0.81 | −1.00 | −0.98 | −1.00 | −0.11 | −0.99 | +0.00 |
| 167 | Locke | −0.81 | −0.99 | −1.00 | −0.98 | −0.12 | −1.00 | +0.00 |
| 168 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 169 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.00 |
| 170 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 171 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 172 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Jinx's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jinx's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jinx` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +0.76)

- **0.55** projectile block: Rebuttal blocks Jinx's Super Mega Death Rocket!, a projectile. Rebuttal for 0.75 s; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Mel W Rebuttal → Jinx R Super Mega Death Rocket!)
- **0.27** projectile block: Rebuttal blocks Jinx's Zap!, a projectile. Rebuttal for 0.75 s; Zap! takes 1.05 s to land, enough to react. (Mel W Rebuttal → Jinx W Zap!)
- **0.24** projectile block: Rebuttal blocks Jinx's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Jinx basic attacks)

#### 2. Vladimir (net +0.71)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 2 s, long enough to use ahead of Super Mega Death Rocket!. (Vladimir W Sanguine Pool → Jinx R Super Mega Death Rocket!)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jinx's Flame Chompers!. Untargetable for 2 s, long enough to use ahead of Flame Chompers!. (Vladimir W Sanguine Pool → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 3. Yuumi (net +0.69)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for ?; Super Mega Death Rocket! takes 0.6 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jinx R Super Mega Death Rocket!)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Jinx's Flame Chompers!. Untargetable for ?; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 100 units farther than Yuumi's (525 vs 425 attack range).

#### 4. Kayle (net +0.68)

- **0.41** invulnerable: Divine Judgment makes Kayle invulnerable to Jinx's Super Mega Death Rocket!. Invulnerable for 2.5 s, long enough to use ahead of Super Mega Death Rocket!. (Kayle R Divine Judgment → Jinx R Super Mega Death Rocket!)
- **0.18** range: Kayle's basic attacks reach 100 units farther than Jinx's (625 vs 525 attack range). Jinx has no dash or blink to close the gap. (Kayle basic attacks → Jinx basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Jinx's Flame Chompers! (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Flame Chompers!. (Kayle R Divine Judgment → Jinx E Flame Chompers!)

#### 5. Lissandra (net +0.57)

- **0.41** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 2.5 s, long enough to use ahead of Super Mega Death Rocket!. (Lissandra R Frozen Tomb → Jinx R Super Mega Death Rocket!)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jinx's Flame Chompers!. Untargetable for 2.5 s, long enough to use ahead of Flame Chompers!. (Lissandra R Frozen Tomb → Jinx E Flame Chompers!)

#### 6. Master Yi (net +0.54)

- **0.55** untargetable: Alpha Strike makes Master Yi untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for ?; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Master Yi Q Alpha Strike → Jinx R Super Mega Death Rocket!)
- **0.31** untargetable: Alpha Strike makes Master Yi untargetable, dodging Jinx's Flame Chompers!. Untargetable for ?; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Jinx E Flame Chompers!)
- **0.06** cc immunity: Highlander makes Master Yi immune to Jinx's Zap! (slow). Highlander lasts 7 s on a 85 s cooldown. (Master Yi R Highlander → Jinx W Zap!)
- Watch out: Jinx's basic attacks reach 350 units farther than Master Yi's (525 vs 175 attack range).

#### 7. Xayah (net +0.53)

- **0.37** untargetable: Featherstorm makes Xayah untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 1.5 s, long enough to use ahead of Super Mega Death Rocket!. (Xayah R Featherstorm → Jinx R Super Mega Death Rocket!)
- **0.32** untargetable: Featherstorm makes Xayah untargetable, dodging Jinx's Flame Chompers!. Untargetable for 1.5 s, long enough to use ahead of Flame Chompers!. (Xayah R Featherstorm → Jinx E Flame Chompers!)

#### 8. Maokai (net +0.47)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jinx's Super Mega Death Rocket!. Untargetable for 1.4 s; Super Mega Death Rocket! takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Jinx R Super Mega Death Rocket!)
- **0.42** untargetable: Twisted Advance makes Maokai untargetable, dodging Jinx's Flame Chompers!. Untargetable for 1.4 s; Flame Chompers! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jinx E Flame Chompers!)
- Watch out: Jinx's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 9. Udyr (net +0.47)

- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Jinx's Flame Chompers! (knockdown, root). Immune for 1.5 s, long enough to use ahead of Flame Chompers!. (Udyr E Blazing Stampede → Jinx E Flame Chompers!)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Jinx's Zap! (slow). Immune for 1.5 s, long enough to use ahead of Zap!. (Udyr E Blazing Stampede → Jinx W Zap!)
- Watch out: Jinx's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

#### 10. Morgana (net +0.47)

- **0.54** cc immunity: Black Shield makes Morgana immune to Jinx's Flame Chompers! (knockdown, root). Immune for 5 s, long enough to use ahead of Flame Chompers!. (Morgana E Black Shield → Jinx E Flame Chompers!)
- **0.08** cc immunity: Black Shield makes Morgana immune to Jinx's Zap! (slow). Immune for 5 s, long enough to use ahead of Zap!. (Morgana E Black Shield → Jinx W Zap!)
- Watch out: Jinx's basic attacks reach 75 units farther than Morgana's (525 vs 450 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +0.76 | 0.76 | 0.00 | projectile block (Rebuttal) |
| 2 | Vladimir | +0.71 | 0.82 | 0.11 |  |
| 3 | Yuumi | +0.69 | 0.76 | 0.07 |  |
| 4 | Kayle | +0.68 | 0.68 | 0.00 |  |
| 5 | Lissandra | +0.57 | 0.57 | 0.00 |  |
| 6 | Master Yi | +0.54 | 0.79 | 0.25 |  |
| 7 | Xayah | +0.53 | 0.53 | 0.00 |  |
| 8 | Maokai | +0.47 | 0.76 | 0.29 |  |
| 9 | Udyr | +0.47 | 0.76 | 0.29 |  |
| 10 | Morgana | +0.47 | 0.58 | 0.11 |  |
| 11 | Yasuo | +0.46 | 0.81 | 0.35 | projectile block (Wind Wall) |
| 12 | Sivir | +0.41 | 0.41 | 0.00 |  |
| 13 | Malzahar | +0.39 | 0.39 | 0.00 |  |
| 14 | Teemo | +0.38 | 0.38 | 0.00 |  |
| 15 | Samira | +0.36 | 0.77 | 0.41 | projectile block (Blade Whirl) |
| 16 | Milio | +0.36 | 0.36 | 0.00 |  |
| 17 | Shaco | +0.32 | 0.51 | 0.19 |  |
| 18 | Zed | +0.28 | 0.47 | 0.19 |  |
| 19 | Bard | +0.27 | 0.57 | 0.30 |  |
| 20 | Lulu | +0.27 | 0.27 | 0.00 |  |
| 21 | Braum | +0.26 | 0.90 | 0.64 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 22 | Fiora | +0.21 | 0.78 | 0.57 |  |
| 23 | Nocturne | +0.21 | 0.50 | 0.29 |  |
| 24 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 25 | Pantheon | +0.13 | 0.68 | 0.55 |  |
| 26 | Senna | +0.12 | 0.12 | 0.00 |  |
| 27 | Annie | +0.11 | 0.11 | 0.00 |  |
| 28 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 29 | Fizz | +0.08 | 0.76 | 0.68 |  |
| 30 | Warwick | +0.08 | 0.27 | 0.19 |  |
| 31 | Kayn | +0.06 | 0.51 | 0.45 |  |
| 32 | Kalista | +0.06 | 0.28 | 0.22 |  |
| 33 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 34 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 35 | Gwen | +0.04 | 0.71 | 0.67 |  |
| 36 | Vex | +0.04 | 0.04 | 0.00 |  |
| 37 | Aurora | +0.03 | 0.48 | 0.45 |  |
| 38 | Rek'Sai | +0.02 | 0.59 | 0.57 |  |
| 39 | Tristana | +0.02 | 0.32 | 0.30 |  |
| 40 | Rammus | 0.00 | 0.29 | 0.29 |  |
| 41 | Brand | 0.00 | 0.00 | 0.00 |  |
| 42 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 43 | Draven | 0.00 | 0.00 | 0.00 |  |
| 44 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 45 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 46 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 47 | Janna | 0.00 | 0.00 | 0.00 |  |
| 48 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 49 | Karma | 0.00 | 0.00 | 0.00 |  |
| 50 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 51 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 52 | Lux | 0.00 | 0.00 | 0.00 |  |
| 53 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 54 | Nami | 0.00 | 0.00 | 0.00 |  |
| 55 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 56 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 57 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 58 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 59 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 60 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 61 | Sona | 0.00 | 0.00 | 0.00 |  |
| 62 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 63 | Swain | 0.00 | 0.00 | 0.00 |  |
| 64 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 65 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 66 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 67 | Varus | 0.00 | 0.00 | 0.00 |  |
| 68 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 69 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 70 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 71 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 72 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 73 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 74 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 75 | Caitlyn | -0.04 | 0.22 | 0.26 |  |
| 76 | Malphite | -0.06 | 0.23 | 0.29 |  |
| 77 | Evelynn | -0.08 | 0.51 | 0.59 |  |
| 78 | Gangplank | -0.09 | 0.49 | 0.58 |  |
| 79 | Karthus | -0.11 | 0.00 | 0.11 |  |
| 80 | Sion | -0.13 | 0.38 | 0.51 |  |
| 81 | Vayne | -0.18 | 0.00 | 0.18 |  |
| 82 | Xin Zhao | -0.20 | 0.45 | 0.65 |  |
| 83 | Olaf | -0.22 | 0.36 | 0.58 |  |
| 84 | Garen | -0.23 | 0.28 | 0.51 |  |
| 85 | Shyvana | -0.23 | 0.04 | 0.27 |  |
| 86 | Elise | -0.23 | 0.00 | 0.23 |  |
| 87 | Jayce | -0.23 | 0.00 | 0.23 |  |
| 88 | Nidalee | -0.23 | 0.00 | 0.23 |  |
| 89 | Sett | -0.25 | 0.04 | 0.29 |  |
| 90 | Tahm Kench | -0.25 | 0.00 | 0.25 |  |
| 91 | Kassadin | -0.27 | 0.00 | 0.27 |  |
| 92 | Jax | -0.28 | 0.31 | 0.59 |  |
| 93 | Kindred | -0.28 | 0.00 | 0.28 |  |
| 94 | Yunara | -0.28 | 0.00 | 0.28 |  |
| 95 | Nasus | -0.29 | 0.29 | 0.58 |  |
| 96 | Zaahen | -0.29 | 0.23 | 0.52 |  |
| 97 | Katarina | -0.29 | 0.00 | 0.29 |  |
| 98 | Rengar | -0.30 | 0.60 | 0.90 |  |
| 99 | Akshan | -0.30 | 0.00 | 0.30 |  |
| 100 | Aurelion Sol | -0.30 | 0.00 | 0.30 |  |
| 101 | Corki | -0.30 | 0.00 | 0.30 |  |
| 102 | Lucian | -0.30 | 0.00 | 0.30 |  |
| 103 | Zeri | -0.30 | 0.00 | 0.30 |  |
| 104 | Hecarim | -0.33 | 0.04 | 0.37 |  |
| 105 | Camille | -0.34 | 0.50 | 0.84 |  |
| 106 | Nilah | -0.35 | 0.27 | 0.62 |  |
| 107 | Ahri | -0.35 | 0.00 | 0.35 |  |
| 108 | Kai'Sa | -0.35 | 0.00 | 0.35 |  |
| 109 | Azir | -0.36 | 0.00 | 0.36 |  |
| 110 | Quinn | -0.37 | 0.00 | 0.37 |  |
| 111 | Alistar | -0.39 | 0.30 | 0.69 |  |
| 112 | Illaoi | -0.39 | 0.04 | 0.43 |  |
| 113 | Volibear | -0.39 | 0.04 | 0.43 |  |
| 114 | Galio | -0.39 | 0.00 | 0.39 |  |
| 115 | LeBlanc | -0.39 | 0.00 | 0.39 |  |
| 116 | Shen | -0.40 | 0.29 | 0.69 |  |
| 117 | K'Sante | -0.41 | 0.08 | 0.49 |  |
| 118 | Yone | -0.41 | 0.04 | 0.45 |  |
| 119 | Ivern | -0.43 | 0.00 | 0.43 |  |
| 120 | Ziggs | -0.43 | 0.00 | 0.43 |  |
| 121 | Nunu & Willump | -0.44 | 0.14 | 0.58 |  |
| 122 | Mordekaiser | -0.44 | 0.07 | 0.51 |  |
| 123 | Lillia | -0.44 | 0.00 | 0.44 |  |
| 124 | Bel'Veth | -0.45 | 0.00 | 0.45 |  |
| 125 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 126 | Kled | -0.47 | 0.22 | 0.69 |  |
| 127 | Skarner | -0.47 | 0.07 | 0.54 |  |
| 128 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 129 | Jarvan IV | -0.49 | 0.04 | 0.53 |  |
| 130 | Ambessa | -0.51 | 0.00 | 0.51 |  |
| 131 | Darius | -0.51 | 0.00 | 0.51 |  |
| 132 | Trundle | -0.51 | 0.00 | 0.51 |  |
| 133 | Yorick | -0.51 | 0.00 | 0.51 |  |
| 134 | Viego | -0.52 | 0.04 | 0.56 |  |
| 135 | Ekko | -0.52 | 0.00 | 0.52 |  |
| 136 | Thresh | -0.52 | 0.00 | 0.52 |  |
| 137 | Vi | -0.53 | 0.04 | 0.57 |  |
| 138 | Aatrox | -0.53 | 0.00 | 0.53 |  |
| 139 | Irelia | -0.54 | 0.00 | 0.54 |  |
| 140 | Taric | -0.54 | 0.00 | 0.54 |  |
| 141 | Graves | -0.55 | 0.00 | 0.55 |  |
| 142 | Urgot | -0.56 | 0.00 | 0.56 |  |
| 143 | Blitzcrank | -0.58 | 0.00 | 0.58 |  |
| 144 | Cho'Gath | -0.58 | 0.00 | 0.58 |  |
| 145 | Dr. Mundo | -0.58 | 0.00 | 0.58 |  |
| 146 | Rumble | -0.58 | 0.00 | 0.58 |  |
| 147 | Singed | -0.58 | 0.00 | 0.58 |  |
| 148 | Tryndamere | -0.60 | 0.00 | 0.60 |  |
| 149 | Talon | -0.61 | 0.00 | 0.61 |  |
| 150 | Nautilus | -0.65 | 0.00 | 0.65 |  |
| 151 | Diana | -0.67 | 0.00 | 0.67 |  |
| 152 | Leona | -0.67 | 0.00 | 0.67 |  |
| 153 | Pyke | -0.68 | 0.00 | 0.68 |  |
| 154 | Qiyana | -0.68 | 0.00 | 0.68 |  |
| 155 | Kha'Zix | -0.69 | 0.00 | 0.69 |  |
| 156 | Locke | -0.69 | 0.00 | 0.69 |  |
| 157 | Poppy | -0.69 | 0.00 | 0.69 |  |
| 158 | Renekton | -0.69 | 0.00 | 0.69 |  |
| 159 | Zac | -0.72 | 0.00 | 0.72 |  |
| 160 | Briar | -0.73 | 0.00 | 0.73 |  |
| 161 | Wukong | -0.74 | 0.00 | 0.74 |  |
| 162 | Lee Sin | -0.76 | 0.00 | 0.76 |  |
| 163 | Naafiri | -0.76 | 0.00 | 0.76 |  |
| 164 | Sejuani | -0.77 | 0.00 | 0.77 |  |
| 165 | Amumu | -0.79 | 0.00 | 0.79 |  |
| 166 | Gragas | -0.79 | 0.00 | 0.79 |  |
| 167 | Rell | -0.80 | 0.00 | 0.80 |  |
| 168 | Rakan | -0.81 | 0.00 | 0.81 |  |
| 169 | Ornn | -0.83 | 0.04 | 0.87 |  |
| 170 | Akali | -0.84 | 0.00 | 0.84 |  |
| 171 | Riven | -0.84 | 0.00 | 0.84 |  |
| 172 | Sylas | -0.89 | 0.00 | 0.89 |  |
