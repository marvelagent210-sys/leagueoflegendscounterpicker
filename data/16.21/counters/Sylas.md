# Counters to Sylas (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Sylas: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sylas wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sylas --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.86 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.42 |
| 2 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.70 |
| 3 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.53 |
| 4 | Malphite | +0.82 | +1.00 | +1.00 | +1.00 | +0.26 | – | −0.03 |
| 5 | Galio | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.28 |
| 6 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.42 |
| 7 | Zeri | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.53 |
| 8 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.56 |
| 9 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | −0.08 |
| 10 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.27 |
| 11 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.69 |
| 12 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.05 |
| 13 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.39 |
| 14 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.02 |
| 15 | Rakan | +0.80 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.46 |
| 16 | Skarner | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.24 |
| 17 | Warwick | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.06 |
| 18 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.47 |
| 19 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.19 |
| 20 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.06 |
| 21 | Nilah | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.04 |
| 22 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | −0.02 |
| 23 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.28 |
| 24 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.47 |
| 25 | Olaf | +0.79 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.11 |
| 26 | Jarvan IV | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.29 |
| 27 | Fiora | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.24 |
| 28 | Shen | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.14 |
| 29 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.08 |
| 30 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | −0.34 |
| 31 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.28 |
| 32 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | +0.18 | – | −0.42 |
| 33 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.22 |
| 34 | Zed | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.50 |
| 35 | Ambessa | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.10 |
| 36 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.14 |
| 37 | Gnar | +0.78 | +0.94 | +0.99 | +0.95 | +0.09 | +1.00 | −0.12 |
| 38 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | −0.08 |
| 39 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | −0.12 |
| 40 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.53 |
| 41 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.01 |
| 42 | Tryndamere | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.48 |
| 43 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.26 |
| 44 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.20 |
| 45 | Diana | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | −0.00 |
| 46 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.00 |
| 47 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.09 |
| 48 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.33 |
| 49 | Naafiri | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.05 |
| 50 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.18 |
| 51 | Irelia | +0.77 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.09 |
| 52 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.04 |
| 53 | Miss Fortune | +0.77 | +1.00 | +0.90 | +1.00 | −0.18 | +1.00 | +0.34 |
| 54 | Rell | +0.77 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | −0.19 |
| 55 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | −0.05 |
| 56 | Nocturne | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.02 |
| 57 | Maokai | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.02 |
| 58 | Vi | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.09 |
| 59 | Viego | +0.76 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.26 |
| 60 | Sett | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.12 |
| 61 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.03 |
| 62 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.23 |
| 63 | Aphelios | +0.75 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | −0.67 |
| 64 | Braum | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | −0.12 |
| 65 | Darius | +0.74 | +1.00 | +1.00 | +1.00 | −0.17 | – | −0.10 |
| 66 | Wukong | +0.74 | +1.00 | +1.00 | +1.00 | −0.17 | – | −0.17 |
| 67 | Shaco | +0.74 | +1.00 | +1.00 | +1.00 | −0.15 | – | −0.24 |
| 68 | Hecarim | +0.74 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.42 |
| 69 | Cho'Gath | +0.74 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.33 |
| 70 | Aatrox | +0.72 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.53 |
| 71 | Rek'Sai | +0.72 | +1.00 | +1.00 | +1.00 | −0.37 | – | +0.10 |
| 72 | Rammus | +0.72 | +1.00 | +1.00 | +1.00 | −0.38 | – | +0.03 |
| 73 | Urgot | +0.62 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.01 |
| 74 | Elise | +0.57 | +1.00 | +1.00 | +1.00 | −0.01 | −1.00 | −0.51 |
| 75 | Graves | +0.57 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | −0.55 |
| 76 | Corki | +0.53 | +0.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.46 |
| 77 | Ivern | +0.52 | +1.00 | +1.00 | +1.00 | −0.45 | −1.00 | −0.33 |
| 78 | Jayce | +0.51 | +1.00 | +0.00 | +1.00 | +0.07 | – | −0.04 |
| 79 | Briar | +0.50 | +1.00 | +0.18 | +1.00 | −0.20 | – | −0.25 |
| 80 | Rengar | +0.37 | +1.00 | −0.63 | +1.00 | +0.26 | – | −0.04 |
| 81 | Talon | +0.31 | +1.00 | −0.50 | +1.00 | −0.24 | – | −0.25 |
| 82 | Kennen | +0.29 | +1.00 | −0.12 | +1.00 | −0.18 | −1.00 | −0.07 |
| 83 | Orianna | +0.29 | +1.00 | −1.00 | +1.00 | −0.11 | +1.00 | +0.07 |
| 84 | Fizz | +0.20 | +0.00 | +0.00 | +1.00 | −0.17 | – | +0.15 |
| 85 | Zac | +0.20 | −0.05 | +0.14 | +0.93 | −0.10 | – | −0.20 |
| 86 | Samira | +0.15 | +0.96 | +1.00 | −1.00 | −0.21 | −0.83 | −0.47 |
| 87 | Anivia | −0.06 | −0.05 | −0.07 | +0.03 | −0.23 | −0.02 | +0.02 |
| 88 | Fiddlesticks | −0.13 | −1.00 | +1.00 | −1.00 | −0.16 | +1.00 | −0.12 |
| 89 | Kai'Sa | −0.21 | −1.00 | +1.00 | −0.21 | −0.36 | −0.98 | −0.33 |
| 90 | Akshan | −0.23 | −1.00 | −1.00 | +1.00 | −0.10 | +1.00 | −0.29 |
| 91 | Yunara | −0.27 | −1.00 | −1.00 | +1.00 | −0.24 | +0.85 | −0.38 |
| 92 | Ezreal | −0.28 | −1.00 | −1.00 | +1.00 | −0.01 | +0.37 | −0.32 |
| 93 | Xerath | −0.29 | −1.00 | −1.00 | +1.00 | −0.01 | +0.00 | +0.23 |
| 94 | Varus | −0.32 | −1.00 | +1.00 | −1.00 | −0.17 | −1.00 | +0.19 |
| 95 | Rumble | −0.36 | −1.00 | −1.00 | +1.00 | −0.13 | – | −0.06 |
| 96 | Sejuani | −0.36 | −1.00 | −1.00 | +1.00 | −0.16 | – | +0.01 |
| 97 | Leona | −0.38 | −1.00 | −1.00 | +1.00 | −0.19 | – | −0.22 |
| 98 | Gragas | −0.38 | −1.00 | −1.00 | +1.00 | −0.23 | – | −0.15 |
| 99 | Lucian | −0.42 | −1.00 | −1.00 | +1.00 | −0.18 | −1.00 | +0.14 |
| 100 | Kindred | −0.43 | −1.00 | −1.00 | +1.00 | −0.17 | −1.00 | −0.17 |
| 101 | Tahm Kench | −0.59 | −1.00 | −1.00 | −0.00 | −0.19 | – | −0.04 |
| 102 | Nautilus | −0.62 | −1.00 | −1.00 | −1.00 | −0.08 | +1.00 | −0.12 |
| 103 | Lulu | −0.70 | −0.97 | −0.93 | −0.34 | −0.31 | −1.00 | −0.21 |
| 104 | Singed | −0.74 | −1.00 | −1.00 | −0.84 | −0.03 | – | +0.11 |
| 105 | Quinn | −0.75 | −1.00 | −1.00 | −0.84 | −0.26 | −0.04 | −0.71 |
| 106 | Aurelion Sol | −0.75 | −1.00 | −1.00 | −1.00 | +0.41 | −1.00 | −0.32 |
| 107 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.35 |
| 108 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | – | −0.14 |
| 109 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.04 |
| 110 | Cassiopeia | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.17 |
| 111 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.52 |
| 112 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.16 |
| 113 | Morgana | −0.78 | −1.00 | −1.00 | −1.00 | −0.22 | −0.75 | +0.48 |
| 114 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.07 |
| 115 | Lillia | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.42 |
| 116 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.16 |
| 117 | Kalista | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.08 |
| 118 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.05 |
| 119 | Heimerdinger | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.21 |
| 120 | Swain | −0.80 | −0.97 | −1.00 | −1.00 | −0.07 | −0.97 | −0.06 |
| 121 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.13 |
| 122 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.14 |
| 123 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.04 |
| 124 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.20 |
| 125 | Syndra | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.15 |
| 126 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.01 |
| 127 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.16 |
| 128 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.20 |
| 129 | Vel'Koz | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.10 |
| 130 | Caitlyn | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.65 |
| 131 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.18 |
| 132 | Ahri | −0.82 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.07 |
| 133 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.10 |
| 134 | Twisted Fate | −0.82 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.26 |
| 135 | Zoe | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.19 |
| 136 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.11 |
| 137 | Karma | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.10 |
| 138 | Mel | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.46 |
| 139 | Azir | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.03 |
| 140 | Alistar | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.34 |
| 141 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.23 |
| 142 | Twitch | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.23 |
| 143 | Ziggs | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.01 |
| 144 | Akali | −0.83 | −1.00 | −1.00 | −1.00 | −0.38 | – | +0.21 |
| 145 | Neeko | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.38 |
| 146 | Soraka | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.47 |
| 147 | Vex | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.02 |
| 148 | Lux | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.32 |
| 149 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.34 |
| 150 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.28 |
| 151 | Aurora | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.55 |
| 152 | Zilean | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.08 |
| 153 | Hwei | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.21 |
| 154 | Annie | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.25 |
| 155 | Senna | −0.84 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | −0.50 |
| 156 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.42 |
| 157 | Ashe | −0.85 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.28 |
| 158 | Bard | −0.85 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.26 |
| 159 | Draven | −0.85 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.33 |
| 160 | Jinx | −0.85 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.48 |
| 161 | Sivir | −0.85 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.53 |
| 162 | Zyra | −0.85 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.48 |
| 163 | Taliyah | −0.86 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | −0.11 |
| 164 | Milio | −0.86 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.70 |
| 165 | Viktor | −0.86 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | −0.47 |
| 166 | Nidalee | −0.87 | −1.00 | −1.00 | −0.95 | −0.36 | −1.00 | −0.44 |
| 167 | Renata Glasc | −0.87 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | −0.56 |
| 168 | Sona | −0.87 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | −0.49 |
| 169 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.35 | – | −0.65 |
| 170 | Seraphine | −0.88 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | −0.68 |
| 171 | Yuumi | −0.89 | −1.00 | −1.00 | −1.00 | −0.36 | −1.00 | −0.68 |
| 172 | Nami | −0.91 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | −0.66 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sylas's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sylas's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sylas` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.28)

- **0.90** spell shield: Shroud of Darkness's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas E Abduct)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sylas W Kingslayer)
- **0.10** cc immunity: Paranoia is displacement immune, ignoring Sylas's Abduct (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Sylas E Abduct)

#### 2. Singed (net +1.26)

- **0.49** grounding: Mega Adhesive grounds Sylas, who then can't cast Abduct. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abduct)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Abscond. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas E Abscond)
- **0.39** grounding: Mega Adhesive grounds Sylas, who then can't cast Kingslayer. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Sylas W Kingslayer)

#### 3. Sivir (net +1.17)

- **0.73** spell shield: Spell Shield's spell shield blocks Sylas's Abduct. Spell shield for 1.5 s, long enough to use ahead of Abduct. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas E Abduct)
- **0.48** spell shield: Spell Shield's spell shield blocks Sylas's Kingslayer. Spell shield for 1.5 s, long enough to use ahead of Kingslayer. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sylas W Kingslayer)
- **0.20** range: Sivir's basic attacks reach 325 units farther than Sylas's (500 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Sivir basic attacks → Sylas basic attacks)

#### 4. Udyr (net +1.06)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Abduct (airborne, stun). Immune for 1.5 s, long enough to use ahead of Abduct. (Udyr E Blazing Stampede → Sylas E Abduct)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Sylas's Chain Lash (slow). Immune for 1.5 s, long enough to use ahead of Chain Lash. (Udyr E Blazing Stampede → Sylas Q Chain Lash)

#### 5. Fiora (net +1.05)

- **0.88** parry: Riposte parries Sylas's Abduct and stuns back. Parry for 0.75 s; Abduct takes 0.63 s to land, enough to react. Negating Abduct's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Sylas E Abduct)
- **0.30** parry: Riposte parries Sylas's Kingslayer. Parry for 0.75 s; Kingslayer lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Sylas W Kingslayer)
- **0.07** attack speed slow: Riposte cuts Sylas's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Sylas basic attacks)

#### 6. Braum (net +1.00)

- **1.00** projectile block: Unbreakable blocks Sylas's Abduct, a projectile. Unbreakable for 4 s, long enough to use ahead of Abduct. (Braum E Unbreakable → Sylas E Abduct)

#### 7. Morgana (net +0.90)

- **0.78** cc immunity: Black Shield makes Morgana immune to Sylas's Abduct (airborne, stun). Immune for 5 s, long enough to use ahead of Abduct. (Morgana E Black Shield → Sylas E Abduct)
- **0.08** range: Morgana's basic attacks reach 275 units farther than Sylas's (450 vs 175 attack range). Sylas closes the gap with Abduct, Abscond, Kingslayer. (Morgana basic attacks → Sylas basic attacks)
- **0.07** cc immunity: Black Shield makes Morgana immune to Sylas's Chain Lash (slow). Immune for 5 s, long enough to use ahead of Chain Lash. (Morgana E Black Shield → Sylas Q Chain Lash)

#### 8. Jinx (net +0.89)

- **0.50** dash stop: Flame Chompers!'s knockdown can stop Sylas's Abduct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas E Abduct)
- **0.38** dash stop: Flame Chompers!'s knockdown can stop Sylas's Abscond mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas E Abscond)
- **0.30** dash stop: Flame Chompers!'s knockdown can stop Sylas's Kingslayer mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Jinx E Flame Chompers! → Sylas W Kingslayer)

#### 9. Hwei (net +0.87)

- **0.50** dash stop: Grim Visage's knockdown can stop Sylas's Abduct mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas E Abduct)
- **0.38** dash stop: Grim Visage's knockdown can stop Sylas's Abscond mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas E Abscond)
- **0.30** dash stop: Grim Visage's knockdown can stop Sylas's Kingslayer mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Hwei Q Grim Visage → Sylas W Kingslayer)

#### 10. Cassiopeia (net +0.86)

- **0.48** grounding: Miasma grounds Sylas, who then can't cast Abduct. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas E Abduct)
- **0.38** grounding: Miasma grounds Sylas, who then can't cast Abscond. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas E Abscond)
- **0.38** grounding: Miasma grounds Sylas, who then can't cast Kingslayer. Grounded while in the area; 16 s cooldown. (Cassiopeia W Miasma → Sylas W Kingslayer)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.28 | 1.28 | 0.00 |  |
| 2 | Singed | +1.26 | 1.26 | 0.00 | grounding (Mega Adhesive) |
| 3 | Sivir | +1.17 | 1.17 | 0.00 |  |
| 4 | Udyr | +1.06 | 1.06 | 0.00 |  |
| 5 | Fiora | +1.05 | 1.05 | 0.00 |  |
| 6 | Braum | +1.00 | 1.00 | 0.00 | projectile block (Unbreakable) |
| 7 | Morgana | +0.90 | 0.90 | 0.00 |  |
| 8 | Jinx | +0.89 | 0.89 | 0.00 | dash stop (Flame Chompers!) |
| 9 | Hwei | +0.87 | 0.87 | 0.00 | dash stop (Grim Visage) |
| 10 | Cassiopeia | +0.86 | 0.86 | 0.00 | grounding (Miasma) |
| 11 | Vex | +0.83 | 0.83 | 0.00 |  |
| 12 | Samira | +0.80 | 0.80 | 0.00 | projectile block (Blade Whirl) |
| 13 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 14 | Ahri | +0.79 | 0.79 | 0.00 | dash stop (Charm) |
| 15 | Mel | +0.76 | 0.76 | 0.00 | projectile block (Rebuttal) |
| 16 | Yasuo | +0.75 | 0.75 | 0.00 | projectile block (Wind Wall) |
| 17 | Veigar | +0.74 | 0.74 | 0.00 | dash stop (Event Horizon) |
| 18 | Fizz | +0.71 | 0.71 | 0.00 |  |
| 19 | Rengar | +0.70 | 0.84 | 0.14 |  |
| 20 | Vladimir | +0.70 | 0.78 | 0.08 |  |
| 21 | Gangplank | +0.69 | 0.69 | 0.00 |  |
| 22 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 23 | Maokai | +0.68 | 0.68 | 0.00 |  |
| 24 | Milio | +0.68 | 0.68 | 0.00 |  |
| 25 | Kayle | +0.66 | 0.66 | 0.00 |  |
| 26 | Poppy | +0.65 | 0.85 | 0.20 | dash stop (Steadfast Presence), dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 27 | Bard | +0.64 | 0.64 | 0.00 |  |
| 28 | Xayah | +0.64 | 0.64 | 0.00 |  |
| 29 | Malzahar | +0.60 | 1.00 | 0.40 |  |
| 30 | Gwen | +0.52 | 0.52 | 0.00 |  |
| 31 | Kalista | +0.52 | 0.52 | 0.00 |  |
| 32 | Kled | +0.52 | 0.52 | 0.00 |  |
| 33 | Olaf | +0.51 | 0.51 | 0.00 |  |
| 34 | Rek'Sai | +0.51 | 0.51 | 0.00 |  |
| 35 | Zaahen | +0.51 | 0.51 | 0.00 |  |
| 36 | Yone | +0.48 | 0.48 | 0.00 |  |
| 37 | Xin Zhao | +0.47 | 0.47 | 0.00 |  |
| 38 | Yuumi | +0.46 | 0.87 | 0.41 |  |
| 39 | Teemo | +0.45 | 0.53 | 0.08 |  |
| 40 | Lulu | +0.44 | 0.44 | 0.00 |  |
| 41 | Sion | +0.40 | 0.53 | 0.13 |  |
| 42 | Alistar | +0.40 | 0.40 | 0.00 |  |
| 43 | Master Yi | +0.36 | 0.59 | 0.23 |  |
| 44 | Amumu | +0.36 | 0.36 | 0.00 |  |
| 45 | Camille | +0.36 | 0.36 | 0.00 |  |
| 46 | Garen | +0.36 | 0.36 | 0.00 |  |
| 47 | Aurora | +0.35 | 0.50 | 0.15 |  |
| 48 | Varus | +0.34 | 0.45 | 0.11 |  |
| 49 | Zed | +0.34 | 0.34 | 0.00 |  |
| 50 | Zac | +0.31 | 0.78 | 0.47 | dash stop (Stretching Strikes), dash stop (Stretching Strikes) |
| 51 | Jax | +0.31 | 0.31 | 0.00 |  |
| 52 | Malphite | +0.29 | 0.29 | 0.00 |  |
| 53 | Nasus | +0.29 | 0.29 | 0.00 |  |
| 54 | Evelynn | +0.27 | 0.35 | 0.08 |  |
| 55 | Nilah | +0.27 | 0.27 | 0.00 |  |
| 56 | Aphelios | +0.23 | 0.23 | 0.00 |  |
| 57 | Zeri | +0.21 | 0.21 | 0.00 |  |
| 58 | Kindred | +0.20 | 0.20 | 0.00 |  |
| 59 | K'Sante | +0.20 | 0.20 | 0.00 |  |
| 60 | Sona | +0.19 | 0.19 | 0.00 |  |
| 61 | Ashe | +0.18 | 0.18 | 0.00 |  |
| 62 | Renata Glasc | +0.18 | 0.18 | 0.00 |  |
| 63 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 64 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 65 | Pantheon | +0.17 | 0.67 | 0.50 |  |
| 66 | Draven | +0.17 | 0.17 | 0.00 |  |
| 67 | Shaco | +0.15 | 0.35 | 0.20 |  |
| 68 | Corki | +0.15 | 0.15 | 0.00 |  |
| 69 | Elise | +0.15 | 0.15 | 0.00 |  |
| 70 | Ezreal | +0.15 | 0.15 | 0.00 |  |
| 71 | Smolder | +0.15 | 0.15 | 0.00 |  |
| 72 | Zilean | +0.15 | 0.15 | 0.00 |  |
| 73 | Zoe | +0.15 | 0.15 | 0.00 |  |
| 74 | Gnar | +0.14 | 0.14 | 0.00 |  |
| 75 | Heimerdinger | +0.14 | 0.14 | 0.00 |  |
| 76 | Kennen | +0.14 | 0.14 | 0.00 |  |
| 77 | Lux | +0.14 | 0.14 | 0.00 |  |
| 78 | Warwick | +0.13 | 0.78 | 0.65 |  |
| 79 | Jayce | +0.13 | 0.13 | 0.00 |  |
| 80 | Nidalee | +0.13 | 0.13 | 0.00 |  |
| 81 | Seraphine | +0.13 | 0.13 | 0.00 |  |
| 82 | Soraka | +0.13 | 0.13 | 0.00 |  |
| 83 | Ziggs | +0.13 | 0.13 | 0.00 |  |
| 84 | Anivia | +0.12 | 0.12 | 0.00 |  |
| 85 | Azir | +0.12 | 0.12 | 0.00 |  |
| 86 | Kog'Maw | +0.12 | 0.12 | 0.00 |  |
| 87 | Orianna | +0.12 | 0.12 | 0.00 |  |
| 88 | Zyra | +0.12 | 0.12 | 0.00 |  |
| 89 | Annie | +0.11 | 0.11 | 0.00 |  |
| 90 | Brand | +0.10 | 0.10 | 0.00 |  |
| 91 | Graves | +0.10 | 0.10 | 0.00 |  |
| 92 | Hecarim | +0.10 | 0.10 | 0.00 |  |
| 93 | Illaoi | +0.10 | 0.10 | 0.00 |  |
| 94 | Jarvan IV | +0.10 | 0.10 | 0.00 |  |
| 95 | Karma | +0.10 | 0.10 | 0.00 |  |
| 96 | Nami | +0.10 | 0.10 | 0.00 |  |
| 97 | Ornn | +0.10 | 0.10 | 0.00 |  |
| 98 | Sett | +0.10 | 0.10 | 0.00 |  |
| 99 | Shyvana | +0.10 | 0.10 | 0.00 |  |
| 100 | Syndra | +0.10 | 0.10 | 0.00 |  |
| 101 | Volibear | +0.10 | 0.10 | 0.00 |  |
| 102 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 103 | Swain | +0.09 | 0.09 | 0.00 |  |
| 104 | Thresh | +0.08 | 0.08 | 0.00 |  |
| 105 | Mordekaiser | +0.07 | 0.07 | 0.00 |  |
| 106 | Vayne | +0.06 | 0.20 | 0.14 |  |
| 107 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 108 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 109 | Urgot | +0.06 | 0.06 | 0.00 |  |
| 110 | Senna | +0.05 | 0.16 | 0.11 |  |
| 111 | Rakan | +0.05 | 0.05 | 0.00 |  |
| 112 | Katarina | +0.04 | 0.32 | 0.28 |  |
| 113 | Lillia | +0.04 | 0.04 | 0.00 |  |
| 114 | Rammus | +0.02 | 0.29 | 0.27 |  |
| 115 | Aurelion Sol | +0.02 | 0.10 | 0.08 |  |
| 116 | LeBlanc | +0.02 | 0.10 | 0.08 |  |
| 117 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 118 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 119 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 120 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 121 | Briar | 0.00 | 0.00 | 0.00 |  |
| 122 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 123 | Darius | 0.00 | 0.00 | 0.00 |  |
| 124 | Diana | 0.00 | 0.00 | 0.00 |  |
| 125 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 126 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 127 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 128 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 129 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 130 | Leona | 0.00 | 0.00 | 0.00 |  |
| 131 | Locke | 0.00 | 0.00 | 0.00 |  |
| 132 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 133 | Rell | 0.00 | 0.00 | 0.00 |  |
| 134 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 135 | Riven | 0.00 | 0.00 | 0.00 |  |
| 136 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 137 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 138 | Taric | 0.00 | 0.00 | 0.00 |  |
| 139 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 140 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 141 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 142 | Neeko | -0.01 | 0.10 | 0.11 |  |
| 143 | Quinn | -0.02 | 0.17 | 0.19 |  |
| 144 | Ivern | -0.07 | 0.08 | 0.15 |  |
| 145 | Kayn | -0.10 | 0.35 | 0.45 |  |
| 146 | Caitlyn | -0.10 | 0.18 | 0.28 |  |
| 147 | Akali | -0.11 | 0.00 | 0.11 |  |
| 148 | Lucian | -0.12 | 0.16 | 0.28 |  |
| 149 | Miss Fortune | -0.13 | 0.15 | 0.28 |  |
| 150 | Talon | -0.14 | 0.00 | 0.14 |  |
| 151 | Jhin | -0.15 | 0.13 | 0.28 |  |
| 152 | Shen | -0.16 | 0.29 | 0.45 |  |
| 153 | Twisted Fate | -0.16 | 0.19 | 0.35 |  |
| 154 | Vel'Koz | -0.16 | 0.12 | 0.28 |  |
| 155 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 156 | Qiyana | -0.18 | 0.00 | 0.18 |  |
| 157 | Xerath | -0.20 | 0.12 | 0.32 |  |
| 158 | Karthus | -0.20 | 0.08 | 0.28 |  |
| 159 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 160 | Kha'Zix | -0.21 | 0.00 | 0.21 |  |
| 161 | Janna | -0.23 | 0.17 | 0.40 |  |
| 162 | Viego | -0.23 | 0.10 | 0.33 |  |
| 163 | Ryze | -0.24 | 0.11 | 0.35 |  |
| 164 | Pyke | -0.26 | 0.00 | 0.26 |  |
| 165 | Akshan | -0.27 | 0.15 | 0.42 |  |
| 166 | Vi | -0.28 | 0.10 | 0.38 |  |
| 167 | Taliyah | -0.36 | 0.12 | 0.48 |  |
| 168 | Nunu & Willump | -0.37 | 0.12 | 0.49 |  |
| 169 | Fiddlesticks | -0.37 | 0.08 | 0.45 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
