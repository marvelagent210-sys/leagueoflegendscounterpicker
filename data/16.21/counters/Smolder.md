# Counters to Smolder (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Smolder: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Smolder wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Smolder --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yasuo | +0.86 | +1.00 | +1.00 | +1.00 | +0.11 | +0.99 | +0.88 |
| 2 | Yorick | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.98 |
| 3 | Jax | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.70 |
| 4 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.86 |
| 5 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.42 |
| 6 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.68 |
| 7 | Tristana | +0.83 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.35 |
| 8 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.91 |
| 9 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.94 |
| 10 | Gangplank | +0.83 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.71 |
| 11 | Master Yi | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +1.00 |
| 12 | Dr. Mundo | +0.82 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.59 |
| 13 | Nilah | +0.82 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.48 |
| 14 | Camille | +0.82 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.75 |
| 15 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.83 |
| 16 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +1.00 |
| 17 | Pantheon | +0.82 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.28 |
| 18 | Tryndamere | +0.82 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.67 |
| 19 | Annie | +0.82 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.18 |
| 20 | Xin Zhao | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.17 |
| 21 | Samira | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.10 |
| 22 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.74 |
| 23 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.08 |
| 24 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.86 |
| 25 | Zaahen | +0.81 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.53 |
| 26 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.47 |
| 27 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.51 |
| 28 | Renekton | +0.80 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.27 |
| 29 | Gwen | +0.80 | +1.00 | +1.00 | +1.00 | −0.29 | +1.00 | +0.83 |
| 30 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.46 |
| 31 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.08 |
| 32 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.69 |
| 33 | Aphelios | +0.80 | +1.00 | +1.00 | +1.00 | +0.19 | – | −0.22 |
| 34 | Lee Sin | +0.80 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.41 |
| 35 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | −0.06 |
| 36 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.39 |
| 37 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.09 |
| 38 | Cassiopeia | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | −0.03 |
| 39 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.71 |
| 40 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.32 |
| 41 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.19 |
| 42 | Kennen | +0.78 | +1.00 | +0.88 | +1.00 | −0.01 | – | +0.62 |
| 43 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +0.72 | +0.63 |
| 44 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | −0.39 | +1.00 | +0.69 |
| 45 | Mordekaiser | +0.78 | +0.87 | +1.00 | +0.98 | −0.10 | +0.99 | +0.55 |
| 46 | Lulu | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.05 |
| 47 | Anivia | +0.77 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.26 |
| 48 | Volibear | +0.77 | +0.93 | +0.99 | +0.93 | −0.25 | +0.99 | +0.77 |
| 49 | Neeko | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.16 |
| 50 | Aatrox | +0.75 | +1.00 | +1.00 | +1.00 | −0.29 | +1.00 | −0.07 |
| 51 | Twisted Fate | +0.75 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.14 |
| 52 | Tahm Kench | +0.74 | +1.00 | +1.00 | +0.61 | +0.06 | +1.00 | +0.12 |
| 53 | Caitlyn | +0.73 | +1.00 | +1.00 | +0.85 | +0.02 | +0.73 | −0.32 |
| 54 | Diana | +0.72 | +1.00 | +1.00 | +1.00 | +0.10 | +0.00 | +0.20 |
| 55 | Kai'Sa | +0.72 | +1.00 | +1.00 | +1.00 | −0.23 | – | −0.27 |
| 56 | Braum | +0.71 | +0.94 | +0.90 | +1.00 | −0.10 | +0.49 | +0.31 |
| 57 | Milio | +0.71 | +0.84 | +1.00 | +0.88 | +0.06 | – | −0.17 |
| 58 | Yunara | +0.68 | +1.00 | +0.60 | +1.00 | +0.07 | – | +0.04 |
| 59 | Olaf | +0.68 | +1.00 | +1.00 | +1.00 | −0.26 | +0.00 | +0.30 |
| 60 | Riven | +0.61 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.58 |
| 61 | Gnar | +0.61 | +1.00 | +1.00 | +1.00 | −0.15 | −1.00 | +0.58 |
| 62 | Ashe | +0.60 | +0.62 | +0.62 | +1.00 | −0.01 | – | +0.68 |
| 63 | Ivern | +0.57 | +1.00 | +0.99 | +0.15 | −0.08 | – | +0.00 |
| 64 | Draven | +0.55 | +1.00 | +0.97 | +0.00 | −0.00 | – | +0.10 |
| 65 | Rek'Sai | +0.53 | +0.00 | +1.00 | +1.00 | −0.29 | +1.00 | +0.38 |
| 66 | Irelia | +0.50 | +1.00 | +0.44 | +1.00 | +0.16 | −1.00 | +0.37 |
| 67 | Xayah | +0.50 | +1.00 | +0.00 | +1.00 | −0.12 | – | +0.41 |
| 68 | Zac | +0.50 | +0.95 | +0.95 | +0.07 | +0.10 | +0.02 | −0.12 |
| 69 | Orianna | +0.49 | +0.00 | +1.00 | +1.00 | −0.09 | – | +0.05 |
| 70 | Jhin | +0.49 | +0.48 | +0.48 | +1.00 | +0.08 | – | −0.26 |
| 71 | Bel'Veth | +0.43 | +0.62 | +0.00 | +1.00 | −0.12 | +1.00 | −0.07 |
| 72 | Sion | +0.40 | −0.22 | +0.95 | +0.50 | −0.07 | +1.00 | +0.63 |
| 73 | Taric | +0.36 | +1.00 | +0.00 | +1.00 | +0.02 | −1.00 | +0.16 |
| 74 | Miss Fortune | +0.35 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.19 |
| 75 | Azir | +0.34 | +1.00 | +1.00 | −1.00 | −0.11 | – | +0.37 |
| 76 | Gragas | +0.33 | +0.43 | +0.43 | +1.00 | +0.04 | −1.00 | +0.21 |
| 77 | Elise | +0.32 | +1.00 | +0.96 | −1.00 | +0.02 | – | −0.19 |
| 78 | Zeri | +0.31 | +0.00 | +1.00 | +0.00 | −0.04 | – | +0.71 |
| 79 | Zed | +0.30 | +1.00 | −1.00 | +1.00 | −0.24 | +1.00 | +0.70 |
| 80 | Lucian | +0.28 | +0.00 | +1.00 | +0.00 | −0.16 | – | +0.56 |
| 81 | Jinx | +0.28 | +0.91 | +0.91 | −1.00 | +0.04 | – | −0.14 |
| 82 | Illaoi | +0.21 | +0.43 | +0.11 | +0.27 | −0.17 | +0.48 | +0.04 |
| 83 | Varus | +0.21 | +0.73 | +0.73 | −1.00 | +0.11 | – | +0.16 |
| 84 | Fizz | +0.21 | +1.00 | −1.00 | +0.50 | −0.07 | +1.00 | +0.35 |
| 85 | Rammus | +0.20 | +1.00 | +1.00 | −1.00 | −0.16 | −1.00 | +0.46 |
| 86 | Graves | +0.17 | +1.00 | +1.00 | −1.00 | +0.03 | −1.00 | −0.64 |
| 87 | Jayce | +0.13 | +1.00 | −1.00 | +1.00 | −0.06 | −1.00 | +0.79 |
| 88 | Darius | +0.11 | +0.00 | +1.00 | −1.00 | −0.27 | +1.00 | +0.04 |
| 89 | Vi | +0.08 | −1.00 | +1.00 | +1.00 | −0.16 | −1.00 | +0.06 |
| 90 | Garen | +0.06 | +0.00 | +1.00 | −1.00 | −0.07 | +0.00 | +0.47 |
| 91 | Fiddlesticks | +0.03 | +1.00 | +0.00 | −1.00 | −0.19 | – | +0.19 |
| 92 | Quinn | −0.01 | −0.33 | −0.34 | +0.88 | −0.04 | – | −0.28 |
| 93 | Jarvan IV | −0.05 | −1.00 | +1.00 | −1.00 | +0.07 | +1.00 | +0.73 |
| 94 | Maokai | −0.10 | −1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +0.11 |
| 95 | Hwei | −0.15 | −0.47 | +0.03 | −0.05 | −0.08 | – | −0.13 |
| 96 | Ziggs | −0.19 | +1.00 | −1.00 | −1.00 | +0.19 | – | +0.10 |
| 97 | Kayn | −0.19 | −0.54 | −0.08 | −0.08 | −0.15 | −0.08 | +0.22 |
| 98 | Rumble | −0.20 | −1.00 | −1.00 | +0.94 | −0.07 | +0.94 | +0.52 |
| 99 | Kindred | −0.21 | +0.00 | +0.00 | −1.00 | +0.00 | – | +0.21 |
| 100 | Twitch | −0.22 | +0.00 | +0.00 | −1.00 | +0.02 | – | −0.05 |
| 101 | Rengar | −0.22 | +1.00 | −1.00 | −1.00 | +0.35 | −1.00 | +0.46 |
| 102 | Bard | −0.27 | +0.87 | −1.00 | −1.00 | −0.10 | – | +0.14 |
| 103 | Brand | −0.30 | +0.75 | −1.00 | −1.00 | −0.04 | – | −0.12 |
| 104 | Yone | −0.32 | −0.36 | +0.17 | −0.90 | −0.14 | −0.90 | +0.24 |
| 105 | Karthus | −0.32 | +0.00 | +0.00 | −1.00 | −0.11 | −1.00 | −0.17 |
| 106 | Amumu | −0.36 | +0.31 | −1.00 | −1.00 | −0.01 | −0.04 | +0.41 |
| 107 | Briar | −0.38 | −0.83 | −0.83 | +0.59 | +0.03 | −1.00 | +0.14 |
| 108 | Urgot | −0.39 | −1.00 | −1.00 | +1.00 | +0.01 | −1.00 | +0.20 |
| 109 | Galio | −0.43 | −0.50 | +0.00 | −1.00 | −0.12 | −1.00 | +0.20 |
| 110 | Vel'Koz | −0.46 | −0.50 | −0.50 | −1.00 | +0.19 | – | +0.17 |
| 111 | Zilean | −0.50 | −1.00 | +0.00 | −1.00 | −0.03 | – | +0.08 |
| 112 | Sejuani | −0.54 | −0.50 | −0.48 | −1.00 | −0.12 | −1.00 | +0.49 |
| 113 | Rakan | −0.60 | −1.00 | −1.00 | +0.00 | −0.15 | −1.00 | +0.48 |
| 114 | Akali | −0.61 | −0.73 | −1.00 | −0.69 | −0.10 | −0.50 | +0.55 |
| 115 | Swain | −0.61 | −0.78 | −0.60 | −1.00 | −0.08 | – | +0.11 |
| 116 | Shaco | −0.61 | −1.00 | −1.00 | +0.00 | −0.13 | −1.00 | +0.10 |
| 117 | Alistar | −0.62 | −1.00 | −1.00 | −1.00 | −0.13 | +1.00 | +0.02 |
| 118 | Syndra | −0.75 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.21 |
| 119 | Aurora | −0.76 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.37 |
| 120 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.01 |
| 121 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.33 |
| 122 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.16 |
| 123 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.24 |
| 124 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.03 |
| 125 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.31 |
| 126 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.24 |
| 127 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.04 |
| 128 | Kled | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.49 |
| 129 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.12 |
| 130 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.15 |
| 131 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.08 |
| 132 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.40 |
| 133 | Malzahar | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.11 |
| 134 | Lillia | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.53 |
| 135 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.52 |
| 136 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.01 |
| 137 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.06 |
| 138 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.07 |
| 139 | Aurelion Sol | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.02 |
| 140 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.03 |
| 141 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 142 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.03 |
| 143 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.10 |
| 144 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.09 |
| 145 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.16 |
| 146 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.25 |
| 147 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.11 |
| 148 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.18 |
| 149 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.17 |
| 150 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.06 |
| 151 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.46 |
| 152 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.06 |
| 153 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.15 |
| 154 | Ornn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.11 |
| 155 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.17 |
| 156 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.51 |
| 157 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.24 |
| 158 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.09 |
| 159 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.23 |
| 160 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.15 |
| 161 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.37 |
| 162 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.23 |
| 163 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.34 |
| 164 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.11 |
| 165 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.06 |
| 166 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.14 |
| 167 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.30 |
| 168 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.12 |
| 169 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.06 |
| 170 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.16 |
| 171 | Singed | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.08 |
| 172 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | −0.02 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Smolder's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Smolder's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Smolder` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +0.80)

- **0.55** projectile block: Blade Whirl blocks Smolder's MMOOOMMMM!, a projectile. Blade Whirl for 0.75 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Samira W Blade Whirl → Smolder R MMOOOMMMM!)
- **0.30** projectile block: Blade Whirl blocks Smolder's Achooo!, a projectile. Blade Whirl for 0.75 s; Achooo! takes 1.1 s to land, enough to react. (Samira W Blade Whirl → Smolder W Achooo!)
- **0.27** projectile block: Blade Whirl blocks Smolder's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Smolder basic attacks)

#### 2. Mel (net +0.79)

- **0.55** projectile block: Rebuttal blocks Smolder's MMOOOMMMM!, a projectile. Rebuttal for 0.75 s; MMOOOMMMM! takes 3.25 s to land, enough to react. (Mel W Rebuttal → Smolder R MMOOOMMMM!)
- **0.28** projectile block: Rebuttal blocks Smolder's Achooo!, a projectile. Rebuttal for 0.75 s; Achooo! takes 1.1 s to land, enough to react. (Mel W Rebuttal → Smolder W Achooo!)
- **0.27** projectile block: Rebuttal blocks Smolder's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Smolder basic attacks)

#### 3. Yuumi (net +0.73)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for ?; MMOOOMMMM! takes 3.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Smolder R MMOOOMMMM!)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for ?; Super Scorcher Breath takes 0.57 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Smolder Q Super Scorcher Breath)
- Watch out: Smolder's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

#### 4. Sivir (net +0.69)

- **0.55** spell shield: Spell Shield's spell shield blocks Smolder's MMOOOMMMM!. Spell shield for 1.5 s, long enough to use ahead of MMOOOMMMM!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Smolder R MMOOOMMMM!)
- **0.28** spell shield: Spell Shield's spell shield blocks Smolder's Super Scorcher Breath. Spell shield for 1.5 s, long enough to use ahead of Super Scorcher Breath. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Smolder Q Super Scorcher Breath)

#### 5. Aurora (net +0.67)

- **0.55** untargetable: Between Worlds makes Aurora untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 0.4 s; MMOOOMMMM! takes 3.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Between Worlds makes Aurora untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 0.4 s; Super Scorcher Breath takes 0.57 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Smolder Q Super Scorcher Breath)

#### 6. Bard (net +0.67)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 2.5 s, long enough to use ahead of MMOOOMMMM!. (Bard R Tempered Fate → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 2.5 s, long enough to use ahead of Super Scorcher Breath. (Bard R Tempered Fate → Smolder Q Super Scorcher Breath)

#### 7. Lissandra (net +0.67)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 2.5 s, long enough to use ahead of MMOOOMMMM!. (Lissandra R Frozen Tomb → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 2.5 s, long enough to use ahead of Super Scorcher Breath. (Lissandra R Frozen Tomb → Smolder Q Super Scorcher Breath)

#### 8. Xayah (net +0.67)

- **0.55** untargetable: Featherstorm makes Xayah untargetable, dodging Smolder's MMOOOMMMM!. Untargetable for 1.5 s, long enough to use ahead of MMOOOMMMM!. (Xayah R Featherstorm → Smolder R MMOOOMMMM!)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Smolder's Super Scorcher Breath. Untargetable for 1.5 s, long enough to use ahead of Super Scorcher Breath. (Xayah R Featherstorm → Smolder Q Super Scorcher Breath)

#### 9. Yasuo (net +0.65)

- **0.55** projectile block: Wind Wall blocks Smolder's MMOOOMMMM!, a projectile. Wind Wall for 4 s, long enough to use ahead of MMOOOMMMM!. (Yasuo W Wind Wall → Smolder R MMOOOMMMM!)
- **0.35** projectile block: Wind Wall blocks Smolder's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Smolder basic attacks)
- **0.34** projectile block: Wind Wall blocks Smolder's Achooo!, a projectile. Wind Wall for 4 s, long enough to use ahead of Achooo!. (Yasuo W Wind Wall → Smolder W Achooo!)
- Watch out: Smolder's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 10. Braum (net +0.61)

- **0.55** projectile block: Unbreakable blocks Smolder's MMOOOMMMM!, a projectile. Unbreakable for 4 s, long enough to use ahead of MMOOOMMMM!. (Braum E Unbreakable → Smolder R MMOOOMMMM!)
- **0.45** projectile block: Unbreakable blocks Smolder's Achooo!, a projectile. Unbreakable for 4 s, long enough to use ahead of Achooo!. (Braum E Unbreakable → Smolder W Achooo!)
- **0.45** projectile block: Unbreakable blocks Smolder's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Smolder basic attacks)
- Watch out: Smolder's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 2 | Mel | +0.79 | 0.79 | 0.00 | projectile block (Rebuttal) |
| 3 | Yuumi | +0.73 | 0.83 | 0.10 |  |
| 4 | Sivir | +0.69 | 0.69 | 0.00 |  |
| 5 | Aurora | +0.67 | 0.67 | 0.00 |  |
| 6 | Bard | +0.67 | 0.67 | 0.00 |  |
| 7 | Lissandra | +0.67 | 0.67 | 0.00 |  |
| 8 | Xayah | +0.67 | 0.67 | 0.00 |  |
| 9 | Yasuo | +0.65 | 0.85 | 0.20 | projectile block (Wind Wall) |
| 10 | Braum | +0.61 | 0.93 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 11 | Fizz | +0.58 | 0.73 | 0.15 |  |
| 12 | Kayle | +0.58 | 0.58 | 0.00 |  |
| 13 | Master Yi | +0.55 | 0.85 | 0.30 |  |
| 14 | Vladimir | +0.54 | 0.70 | 0.16 |  |
| 15 | Camille | +0.51 | 0.67 | 0.16 |  |
| 16 | Kayn | +0.47 | 0.67 | 0.20 |  |
| 17 | Rek'Sai | +0.47 | 0.67 | 0.20 |  |
| 18 | Evelynn | +0.45 | 0.67 | 0.22 |  |
| 19 | Shaco | +0.45 | 0.67 | 0.22 |  |
| 20 | Zed | +0.45 | 0.67 | 0.22 |  |
| 21 | Teemo | +0.43 | 0.43 | 0.00 | blind (Blinding Dart) |
| 22 | Fiora | +0.40 | 0.72 | 0.32 |  |
| 23 | Maokai | +0.40 | 0.72 | 0.32 |  |
| 24 | Nocturne | +0.39 | 0.71 | 0.32 |  |
| 25 | Gwen | +0.37 | 0.69 | 0.32 |  |
| 26 | Varus | +0.33 | 0.33 | 0.00 |  |
| 27 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 28 | Pantheon | +0.28 | 0.48 | 0.20 |  |
| 29 | Tristana | +0.27 | 0.27 | 0.00 |  |
| 30 | Zaahen | +0.24 | 0.44 | 0.20 |  |
| 31 | Shen | +0.20 | 0.42 | 0.22 |  |
| 32 | Zilean | +0.19 | 0.19 | 0.00 |  |
| 33 | Anivia | +0.18 | 0.18 | 0.00 |  |
| 34 | Caitlyn | +0.18 | 0.18 | 0.00 |  |
| 35 | Kindred | +0.18 | 0.18 | 0.00 |  |
| 36 | Xin Zhao | +0.14 | 0.44 | 0.30 |  |
| 37 | Jax | +0.12 | 0.44 | 0.32 |  |
| 38 | Kalista | +0.12 | 0.12 | 0.00 |  |
| 39 | Milio | +0.12 | 0.12 | 0.00 |  |
| 40 | Nilah | +0.11 | 0.37 | 0.26 |  |
| 41 | Malzahar | +0.10 | 0.10 | 0.00 |  |
| 42 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 43 | Heimerdinger | +0.09 | 0.09 | 0.00 |  |
| 44 | Annie | +0.08 | 0.08 | 0.00 |  |
| 45 | Kled | +0.04 | 0.16 | 0.12 |  |
| 46 | Morgana | +0.03 | 0.19 | 0.16 |  |
| 47 | Katarina | +0.01 | 0.33 | 0.32 |  |
| 48 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 49 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 50 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 51 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 52 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 53 | Azir | 0.00 | 0.00 | 0.00 |  |
| 54 | Brand | 0.00 | 0.00 | 0.00 |  |
| 55 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 56 | Corki | 0.00 | 0.00 | 0.00 |  |
| 57 | Draven | 0.00 | 0.00 | 0.00 |  |
| 58 | Elise | 0.00 | 0.00 | 0.00 |  |
| 59 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 60 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 61 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 62 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 63 | Janna | 0.00 | 0.00 | 0.00 |  |
| 64 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 65 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 66 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 67 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 68 | Karma | 0.00 | 0.00 | 0.00 |  |
| 69 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 70 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 71 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 72 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 73 | Lux | 0.00 | 0.00 | 0.00 |  |
| 74 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 75 | Nami | 0.00 | 0.00 | 0.00 |  |
| 76 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 77 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 78 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 79 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 80 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 81 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 82 | Senna | 0.00 | 0.00 | 0.00 |  |
| 83 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 84 | Sona | 0.00 | 0.00 | 0.00 |  |
| 85 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 86 | Swain | 0.00 | 0.00 | 0.00 |  |
| 87 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 88 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 89 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 94 | Vex | 0.00 | 0.00 | 0.00 |  |
| 95 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 96 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 97 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 98 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 99 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 100 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 101 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 102 | Warwick | -0.05 | 0.17 | 0.22 |  |
| 103 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 104 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 105 | Graves | -0.07 | 0.00 | 0.07 |  |
| 106 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 107 | Tryndamere | -0.11 | 0.19 | 0.30 |  |
| 108 | Udyr | -0.12 | 0.20 | 0.32 |  |
| 109 | Zac | -0.12 | 0.18 | 0.30 |  |
| 110 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 111 | Viego | -0.14 | 0.00 | 0.14 |  |
| 112 | Singed | -0.15 | 0.50 | 0.65 |  |
| 113 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 114 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 115 | Yone | -0.15 | 0.00 | 0.15 |  |
| 116 | Briar | -0.16 | 0.00 | 0.16 |  |
| 117 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 118 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 119 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 120 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 121 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 122 | Alistar | -0.19 | 0.13 | 0.32 |  |
| 123 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 124 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 125 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 126 | Rell | -0.20 | 0.00 | 0.20 |  |
| 127 | Akali | -0.22 | 0.00 | 0.22 |  |
| 128 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 129 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 130 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 131 | Galio | -0.22 | 0.00 | 0.22 |  |
| 132 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 133 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 134 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 135 | Riven | -0.22 | 0.00 | 0.22 |  |
| 136 | Talon | -0.22 | 0.00 | 0.22 |  |
| 137 | Vi | -0.22 | 0.00 | 0.22 |  |
| 138 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 139 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 140 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 141 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 142 | Tahm Kench | -0.30 | 0.00 | 0.30 |  |
| 143 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 144 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 145 | Diana | -0.32 | 0.00 | 0.32 |  |
| 146 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 147 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 148 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 149 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 150 | Leona | -0.32 | 0.00 | 0.32 |  |
| 151 | Locke | -0.32 | 0.00 | 0.32 |  |
| 152 | Poppy | -0.32 | 0.00 | 0.32 |  |
| 153 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 154 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 155 | Sett | -0.32 | 0.00 | 0.32 |  |
| 156 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 157 | Garen | -0.40 | 0.21 | 0.61 |  |
| 158 | Sion | -0.44 | 0.17 | 0.61 |  |
| 159 | Nunu & Willump | -0.45 | 0.20 | 0.65 |  |
| 160 | Olaf | -0.48 | 0.17 | 0.65 |  |
| 161 | Rengar | -0.49 | 0.16 | 0.65 |  |
| 162 | Gangplank | -0.50 | 0.15 | 0.65 |  |
| 163 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 164 | Skarner | -0.55 | 0.10 | 0.65 |  |
| 165 | Darius | -0.61 | 0.00 | 0.61 |  |
| 166 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 167 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 168 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 169 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 170 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 171 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 172 | Taric | -0.65 | 0.00 | 0.65 |  |
