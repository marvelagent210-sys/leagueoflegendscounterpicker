# Counters to Garen (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Garen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Garen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Garen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.86 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.66 |
| 2 | Poppy | +0.85 | +1.00 | +1.00 | +1.00 | +0.32 | – | +0.38 |
| 3 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.93 |
| 4 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.92 |
| 5 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.52 |
| 6 | Ivern | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.23 |
| 7 | Neeko | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +0.98 | +0.03 |
| 8 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.69 |
| 9 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.31 |
| 10 | Gangplank | +0.81 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.31 |
| 11 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.75 |
| 12 | Morgana | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.02 |
| 13 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.41 |
| 14 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.42 |
| 15 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.56 |
| 16 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.14 |
| 17 | Karma | +0.80 | +1.00 | +0.98 | +1.00 | +0.03 | +1.00 | +0.05 |
| 18 | Twisted Fate | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.19 |
| 19 | Taric | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.11 |
| 20 | Xayah | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | −0.25 |
| 21 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.04 |
| 22 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | −0.17 |
| 23 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.43 |
| 24 | Tahm Kench | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.01 |
| 25 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.14 |
| 26 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.34 |
| 27 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.42 |
| 28 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.20 |
| 29 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.24 |
| 30 | Zac | +0.78 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.16 |
| 31 | Aphelios | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −0.59 |
| 32 | Shyvana | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.41 |
| 33 | Zaahen | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.18 |
| 34 | Draven | +0.76 | +1.00 | +1.00 | +1.00 | +0.09 | +0.48 | +0.05 |
| 35 | Fiora | +0.76 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.57 |
| 36 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.04 |
| 37 | Cho'Gath | +0.76 | +1.00 | +1.00 | +1.00 | +0.02 | – | −0.43 |
| 38 | Kayle | +0.75 | +1.00 | +0.74 | +1.00 | +0.12 | +1.00 | +0.01 |
| 39 | Quinn | +0.75 | +1.00 | +1.00 | +1.00 | +0.08 | +0.74 | −0.70 |
| 40 | Kai'Sa | +0.75 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | −0.34 |
| 41 | Renekton | +0.75 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.23 |
| 42 | Volibear | +0.74 | +1.00 | +0.96 | +1.00 | −0.14 | – | +0.01 |
| 43 | Xin Zhao | +0.73 | +1.00 | +1.00 | +1.00 | −0.18 | – | −0.25 |
| 44 | Lulu | +0.68 | +1.00 | +1.00 | +1.00 | +0.08 | −0.20 | −0.27 |
| 45 | Mordekaiser | +0.65 | +0.95 | +0.79 | +0.79 | −0.03 | – | −0.16 |
| 46 | Milio | +0.62 | +0.48 | +0.95 | +1.00 | +0.07 | +0.53 | −0.17 |
| 47 | Illaoi | +0.58 | +0.58 | +0.79 | +1.00 | −0.04 | – | −0.27 |
| 48 | Jax | +0.56 | +1.00 | +1.00 | +0.00 | −0.10 | – | +0.35 |
| 49 | Hwei | +0.53 | +1.00 | +0.69 | +0.00 | +0.01 | +1.00 | +0.06 |
| 50 | Annie | +0.41 | +0.48 | +0.44 | +0.28 | +0.09 | +1.00 | +0.14 |
| 51 | Vel'Koz | +0.35 | +0.38 | +0.80 | +0.73 | +0.14 | −1.00 | −0.14 |
| 52 | Lux | +0.33 | +0.41 | −0.23 | +0.93 | +0.02 | +0.94 | +0.04 |
| 53 | Teemo | +0.32 | +1.00 | −1.00 | +1.00 | +0.06 | +1.00 | +0.20 |
| 54 | Brand | +0.32 | +0.40 | +0.98 | −0.01 | −0.03 | −0.03 | −0.38 |
| 55 | Aatrox | +0.31 | +1.00 | +1.00 | −1.00 | −0.01 | – | −0.29 |
| 56 | Rakan | +0.31 | −1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.36 |
| 57 | K'Sante | +0.25 | −1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 58 | Ezreal | +0.22 | +1.00 | +0.76 | −0.85 | +0.04 | −0.51 | −0.05 |
| 59 | Tristana | +0.16 | +1.00 | +1.00 | −1.00 | −0.13 | −1.00 | −0.48 |
| 60 | Anivia | +0.15 | +0.24 | +0.14 | +0.19 | −0.15 | +0.27 | +0.24 |
| 61 | Zeri | +0.15 | +0.00 | +1.00 | −1.00 | −0.17 | +1.00 | +0.40 |
| 62 | Kog'Maw | +0.13 | +1.00 | −1.00 | +0.00 | +0.18 | +1.00 | −0.01 |
| 63 | Lucian | +0.11 | +1.00 | −1.00 | +1.00 | −0.05 | −1.00 | +0.30 |
| 64 | Yunara | +0.11 | +1.00 | +0.00 | −1.00 | +0.07 | +0.53 | −0.15 |
| 65 | Sion | +0.05 | +0.00 | +0.00 | +0.00 | +0.17 | – | +0.41 |
| 66 | Bard | +0.05 | +0.37 | +1.00 | −1.00 | +0.02 | −0.90 | −0.18 |
| 67 | Singed | +0.03 | +0.07 | −0.03 | +0.09 | −0.06 | – | +0.11 |
| 68 | Zilean | −0.02 | −1.00 | +0.00 | +1.00 | +0.20 | +0.00 | +0.06 |
| 69 | Smolder | −0.06 | −1.00 | +0.00 | +1.00 | +0.07 | +0.00 | −0.47 |
| 70 | Sona | −0.09 | −0.50 | +1.00 | −1.00 | −0.08 | +0.00 | +0.03 |
| 71 | Miss Fortune | −0.10 | −1.00 | +1.00 | −1.00 | −0.01 | +1.00 | −0.04 |
| 72 | Varus | −0.17 | −1.00 | +1.00 | −1.00 | −0.10 | +0.38 | +0.11 |
| 73 | Orianna | −0.18 | −1.00 | −1.00 | +1.00 | +0.08 | +1.00 | +0.23 |
| 74 | Kennen | −0.21 | −1.00 | −1.00 | +0.94 | −0.05 | +0.98 | +0.20 |
| 75 | Diana | −0.22 | −1.00 | +1.00 | −1.00 | +0.01 | – | +0.03 |
| 76 | Sett | −0.22 | −1.00 | +1.00 | −1.00 | +0.03 | – | −0.09 |
| 77 | Braum | −0.23 | +1.00 | −1.00 | −1.00 | −0.09 | – | +0.14 |
| 78 | Nilah | −0.24 | +0.00 | +0.00 | −1.00 | −0.09 | – | −0.12 |
| 79 | Syndra | −0.26 | −1.00 | −1.00 | +1.00 | +0.04 | +0.26 | +0.13 |
| 80 | Zyra | −0.26 | −0.04 | −0.21 | −1.00 | +0.02 | −0.03 | −0.02 |
| 81 | Jayce | −0.28 | −1.00 | −1.00 | +1.00 | +0.17 | – | +0.53 |
| 82 | Urgot | −0.29 | +1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.34 |
| 83 | Udyr | −0.29 | −1.00 | −1.00 | +1.00 | −0.02 | – | +0.86 |
| 84 | Janna | −0.29 | +1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.11 |
| 85 | Mel | −0.29 | +0.92 | −0.99 | −0.96 | +0.02 | −0.85 | −0.03 |
| 86 | Fiddlesticks | −0.30 | +1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.13 |
| 87 | Ambessa | −0.31 | +0.50 | −1.00 | −1.00 | +0.20 | – | +0.39 |
| 88 | Camille | −0.32 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.47 |
| 89 | Lillia | −0.34 | +0.05 | −1.00 | −1.00 | −0.10 | +1.00 | +0.32 |
| 90 | Veigar | −0.34 | −1.00 | +0.44 | −1.00 | −0.04 | +0.19 | −0.18 |
| 91 | Vex | −0.36 | −0.96 | −0.05 | −0.07 | −0.02 | −1.00 | +0.14 |
| 92 | Elise | −0.37 | +0.60 | −1.00 | −1.00 | +0.08 | −0.83 | −0.01 |
| 93 | Renata Glasc | −0.37 | −0.73 | −1.00 | +1.00 | −0.09 | −1.00 | −0.56 |
| 94 | Heimerdinger | −0.39 | −0.97 | −1.00 | +0.99 | +0.06 | −1.00 | −0.15 |
| 95 | Kindred | −0.42 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | −0.34 |
| 96 | Nami | −0.46 | −1.00 | −1.00 | +0.86 | −0.08 | −1.00 | −0.47 |
| 97 | Jinx | −0.47 | −0.34 | −0.96 | −0.19 | −0.04 | −0.60 | −0.96 |
| 98 | Gnar | −0.50 | +0.09 | −1.00 | −1.00 | +0.12 | −1.00 | +0.17 |
| 99 | Jhin | −0.55 | +0.06 | −1.00 | −1.00 | +0.05 | −1.00 | −0.36 |
| 100 | Aurora | −0.60 | −1.00 | −1.00 | −1.00 | −0.03 | +1.00 | +0.15 |
| 101 | Lissandra | −0.61 | −0.76 | −1.00 | −1.00 | −0.05 | +0.30 | +0.18 |
| 102 | LeBlanc | −0.65 | −1.00 | −1.00 | −1.00 | −0.05 | +0.76 | −0.42 |
| 103 | Seraphine | −0.65 | −1.00 | −1.00 | −1.00 | +0.02 | +0.46 | −0.06 |
| 104 | Caitlyn | −0.67 | −0.57 | −1.00 | −1.00 | +0.05 | −0.54 | −0.56 |
| 105 | Zoe | −0.68 | −0.60 | −1.00 | −1.00 | −0.04 | −0.60 | −0.23 |
| 106 | Senna | −0.68 | −0.70 | −1.00 | −1.00 | +0.13 | −0.71 | −0.04 |
| 107 | Corki | −0.69 | −1.00 | −1.00 | −1.00 | +0.08 | +0.00 | −0.03 |
| 108 | Ahri | −0.73 | −1.00 | −1.00 | −1.00 | −0.03 | −0.32 | +0.19 |
| 109 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.53 |
| 110 | Gwen | −0.73 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.75 |
| 111 | Yone | −0.73 | −0.77 | −1.00 | −1.00 | −0.07 | – | −0.11 |
| 112 | Ornn | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.02 |
| 113 | Aurelion Sol | −0.76 | −1.00 | −1.00 | −1.00 | +0.28 | −1.00 | −0.05 |
| 114 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.52 |
| 115 | Gragas | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.37 |
| 116 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.25 |
| 117 | Rammus | −0.77 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.36 |
| 118 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.12 |
| 119 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.15 |
| 120 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.01 |
| 121 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.23 |
| 122 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.05 |
| 123 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.04 |
| 124 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.03 |
| 125 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.30 |
| 126 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.53 |
| 127 | Wukong | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.19 |
| 128 | Rek'Sai | −0.78 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.30 |
| 129 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.04 |
| 130 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.03 |
| 131 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.02 |
| 132 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.13 |
| 133 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.15 |
| 134 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.26 |
| 135 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.03 |
| 136 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.02 |
| 137 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.08 |
| 138 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.15 |
| 139 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.10 |
| 140 | Fizz | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.11 |
| 141 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.15 |
| 142 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.45 |
| 143 | Viego | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.28 |
| 144 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.08 |
| 145 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.06 |
| 146 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.01 |
| 147 | Naafiri | −0.80 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.02 |
| 148 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.17 |
| 149 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.25 | – | +0.27 |
| 150 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.18 |
| 151 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.03 |
| 152 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.12 |
| 153 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.28 |
| 154 | Rell | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.27 |
| 155 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −0.95 | −0.23 |
| 156 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.19 |
| 157 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.56 |
| 158 | Yuumi | −0.82 | −1.00 | −0.95 | −1.00 | −0.15 | −1.00 | −0.10 |
| 159 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.06 |
| 160 | Swain | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.28 |
| 161 | Karthus | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.31 |
| 162 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | – | −0.07 |
| 163 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.23 |
| 164 | Malzahar | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.39 |
| 165 | Shaco | −0.83 | −1.00 | −1.00 | −1.00 | −0.24 | – | −0.28 |
| 166 | Viktor | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.39 |
| 167 | Talon | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | – | −0.27 |
| 168 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.34 | – | −0.11 |
| 169 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.52 |
| 170 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.64 |
| 171 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.28 | – | −0.46 |
| 172 | Graves | −0.86 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.67 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Garen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Garen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Garen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.44)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Sivir basic attacks → Garen basic attacks)
- **0.55** spell shield: Spell Shield's spell shield blocks Garen's Demacian Justice. Spell shield for 1.5 s, long enough to use ahead of Demacian Justice. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Garen R Demacian Justice)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Garen's Decisive Strike. Spell shield for 1.5 s, long enough to use ahead of Decisive Strike. A spell shield blocks only the first enemy ability that reaches it. Spell shield will only negate the silence. (Sivir E Spell Shield → Garen Q Decisive Strike)

#### 2. Xayah (net +1.06)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Garen's (525 vs 175 attack range). Garen has no dash or blink to close the gap. (Xayah basic attacks → Garen basic attacks)
- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Garen's Demacian Justice. Untargetable for 1.5 s, long enough to use ahead of Demacian Justice. (Xayah R Featherstorm → Garen R Demacian Justice)
- **0.14** untargetable: Featherstorm makes Xayah untargetable, dodging Garen's Basic Attack. Untargetable for 1.5 s, long enough to use ahead of Basic Attack. (Xayah R Featherstorm → Garen basic attacks)
- Watch out: Courage's 60% tenacity shortens Xayah's Bladecaller (root).

#### 3. Teemo (net +1.03)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Teemo basic attacks → Garen basic attacks)
- **0.57** blind: Blinding Dart's blind makes Garen's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Garen basic attacks)
- **0.30** blind: Blinding Dart's blind makes Garen's Decisive Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Garen Q Decisive Strike)
- Watch out: Decisive Strike cleanses Teemo's Noxious Trap (slow) after it lands.

#### 4. Kayle (net +0.98)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Garen's (625 vs 175 attack range). Garen has no dash or blink to close the gap. (Kayle basic attacks → Garen basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Garen's Demacian Justice (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Demacian Justice. (Kayle R Divine Judgment → Garen R Demacian Justice)
- **0.14** invulnerable: Divine Judgment makes Kayle invulnerable to Garen's Basic Attack. Invulnerable for 2.5 s, long enough to use ahead of Basic Attack. (Kayle R Divine Judgment → Garen basic attacks)
- Watch out: Decisive Strike cleanses Kayle's Radiant Blast (slow) after it lands.

#### 5. Bard (net +0.87)

- **0.62** range: Bard's basic attacks reach 325 units farther than Garen's (500 vs 175 attack range). Garen has no dash or blink to close the gap. (Bard basic attacks → Garen basic attacks)
- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Garen's Demacian Justice. Untargetable for 2.5 s, long enough to use ahead of Demacian Justice. (Bard R Tempered Fate → Garen R Demacian Justice)
- **0.14** untargetable: Tempered Fate makes Bard untargetable, dodging Garen's Basic Attack. Untargetable for 2.5 s, long enough to use ahead of Basic Attack. (Bard R Tempered Fate → Garen basic attacks)
- Watch out: Courage's 60% tenacity shortens Bard's Tempered Fate (stun).

#### 6. Vladimir (net +0.81)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Garen's Demacian Justice. Untargetable for 2 s, long enough to use ahead of Demacian Justice. (Vladimir W Sanguine Pool → Garen R Demacian Justice)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Garen's (450 vs 175 attack range). Garen has no dash or blink to close the gap. (Vladimir basic attacks → Garen basic attacks)
- **0.23** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Garen's Basic Attack. Untargetable for 2 s, long enough to use ahead of Basic Attack. (Vladimir W Sanguine Pool → Garen basic attacks)
- Watch out: Decisive Strike cleanses Vladimir's Sanguine Pool (slow) after it lands.

#### 7. Yuumi (net +0.79)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Garen's Demacian Justice. Untargetable for ?; Demacian Justice takes 0.43 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Garen R Demacian Justice)
- **0.54** range: Yuumi's basic attacks reach 250 units farther than Garen's (425 vs 175 attack range). Garen has no dash or blink to close the gap. (Yuumi basic attacks → Garen basic attacks)
- **0.30** untargetable: You and Me! makes Yuumi untargetable, dodging Garen's Basic Attack. Untargetable for ?, timed to Basic Attack. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Garen basic attacks)
- Watch out: Decisive Strike's silence interrupts Yuumi's Final Chapter (normal channel).

#### 8. Lulu (net +0.75)

- **0.68** range: Lulu's basic attacks reach 375 units farther than Garen's (550 vs 175 attack range). Garen has no dash or blink to close the gap. (Lulu basic attacks → Garen basic attacks)
- **0.40** disarm: Whimsy disarms Garen for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Garen basic attacks)
- Watch out: Decisive Strike cleanses Lulu's Wild Growth (slow) after it lands.

#### 9. Zeri (net +0.71)

- **0.83** range: Zeri's basic attacks reach 375 units farther than Garen's (550 vs 175 attack range). Garen has no dash or blink to close the gap. (Zeri basic attacks → Garen basic attacks)
- Watch out: Decisive Strike cleanses Zeri's Ultrashock Laser (slow) after it lands.

#### 10. Aurora (net +0.69)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Garen's (550 vs 175 attack range). Garen has no dash or blink to close the gap. (Aurora basic attacks → Garen basic attacks)
- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Garen's Demacian Justice. Untargetable for 0.4 s; Demacian Justice takes 0.43 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Garen R Demacian Justice)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Garen's Basic Attack. Untargetable for 0.4 s, timed to Basic Attack. Does not destroy inbound projectiles. (Aurora R Between Worlds → Garen basic attacks)
- Watch out: Demacian Justice reveals Aurora through Across the Veil's stealth.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.44 | 1.44 | 0.00 | range (attacks) |
| 2 | Xayah | +1.06 | 1.24 | 0.18 | range (attacks) |
| 3 | Teemo | +1.03 | 1.31 | 0.28 | range (attacks), blind (Blinding Dart) |
| 4 | Kayle | +0.98 | 1.10 | 0.12 | range (attacks) |
| 5 | Bard | +0.87 | 1.26 | 0.39 | range (attacks) |
| 6 | Vladimir | +0.81 | 1.01 | 0.20 |  |
| 7 | Yuumi | +0.79 | 1.28 | 0.49 | range (attacks) |
| 8 | Lulu | +0.75 | 1.08 | 0.33 | range (attacks), disarm (Whimsy) |
| 9 | Zeri | +0.71 | 0.83 | 0.12 | range (attacks) |
| 10 | Aurora | +0.69 | 1.11 | 0.42 | range (attacks) |
| 11 | Kindred | +0.69 | 0.81 | 0.12 | range (attacks) |
| 12 | Rek'Sai | +0.65 | 0.65 | 0.00 |  |
| 13 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 14 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 15 | Twitch | +0.58 | 0.81 | 0.23 | range (attacks) |
| 16 | Sona | +0.56 | 0.77 | 0.21 | range (attacks) |
| 17 | Kai'Sa | +0.56 | 0.67 | 0.11 | range (attacks) |
| 18 | Kalista | +0.55 | 0.67 | 0.12 | range (attacks) |
| 19 | Lissandra | +0.54 | 1.06 | 0.52 |  |
| 20 | Yunara | +0.54 | 0.72 | 0.18 | range (attacks) |
| 21 | Gwen | +0.53 | 0.68 | 0.15 |  |
| 22 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 23 | Samira | +0.53 | 0.53 | 0.00 | range (attacks) |
| 24 | Vayne | +0.49 | 0.81 | 0.32 | range (attacks) |
| 25 | Draven | +0.49 | 0.68 | 0.19 | range (attacks) |
| 26 | Jax | +0.49 | 0.67 | 0.18 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 27 | Milio | +0.48 | 0.80 | 0.32 | range (attacks) |
| 28 | Fiora | +0.46 | 0.73 | 0.27 |  |
| 29 | Zed | +0.46 | 0.57 | 0.11 |  |
| 30 | Master Yi | +0.45 | 0.68 | 0.23 |  |
| 31 | Ashe | +0.44 | 0.72 | 0.28 | range (attacks) |
| 32 | Elise | +0.43 | 0.61 | 0.18 | range (attacks) |
| 33 | Fizz | +0.42 | 0.74 | 0.32 |  |
| 34 | Smolder | +0.40 | 0.61 | 0.21 | range (attacks) |
| 35 | Kennen | +0.40 | 0.54 | 0.14 | range (attacks) |
| 36 | Ziggs | +0.38 | 0.50 | 0.12 | range (attacks) |
| 37 | Tristana | +0.37 | 0.72 | 0.35 | range (attacks) |
| 38 | Azir | +0.36 | 0.47 | 0.11 |  |
| 39 | Kog'Maw | +0.35 | 0.47 | 0.12 |  |
| 40 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 41 | Nilah | +0.33 | 0.54 | 0.21 | attack dodge (Jubilant Veil) |
| 42 | Renata Glasc | +0.32 | 0.72 | 0.40 | range (attacks) |
| 43 | Quinn | +0.32 | 0.67 | 0.35 | range (attacks) |
| 44 | Nocturne | +0.32 | 0.64 | 0.32 |  |
| 45 | Zilean | +0.32 | 0.61 | 0.29 | range (attacks) |
| 46 | Nasus | +0.31 | 0.43 | 0.12 | attack speed slow (Wither) |
| 47 | Zyra | +0.30 | 0.48 | 0.18 |  |
| 48 | Annie | +0.30 | 0.44 | 0.14 |  |
| 49 | Zoe | +0.29 | 0.61 | 0.32 | range (attacks) |
| 50 | Graves | +0.29 | 0.41 | 0.12 |  |
| 51 | Varus | +0.27 | 0.65 | 0.38 | range (attacks) |
| 52 | Veigar | +0.27 | 0.45 | 0.18 |  |
| 53 | Senna | +0.25 | 0.65 | 0.40 | range (attacks) |
| 54 | Miss Fortune | +0.25 | 0.61 | 0.36 | range (attacks) |
| 55 | Viktor | +0.25 | 0.57 | 0.32 | range (attacks) |
| 56 | Lux | +0.25 | 0.54 | 0.29 | range (attacks) |
| 57 | Evelynn | +0.24 | 0.64 | 0.40 |  |
| 58 | Camille | +0.23 | 0.60 | 0.37 |  |
| 59 | Jayce | +0.23 | 0.53 | 0.30 | range (attacks) |
| 60 | Jinx | +0.23 | 0.51 | 0.28 | range (attacks) |
| 61 | Soraka | +0.22 | 0.50 | 0.28 | range (attacks) |
| 62 | Janna | +0.21 | 0.68 | 0.47 | range (attacks) |
| 63 | Vex | +0.19 | 0.50 | 0.31 | range (attacks) |
| 64 | Caitlyn | +0.18 | 0.72 | 0.54 | range (attacks) |
| 65 | Mel | +0.18 | 0.50 | 0.32 | range (attacks) |
| 66 | LeBlanc | +0.18 | 0.38 | 0.20 |  |
| 67 | Aphelios | +0.17 | 0.72 | 0.55 | range (attacks) |
| 68 | Akshan | +0.17 | 0.59 | 0.42 | range (attacks) |
| 69 | Twisted Fate | +0.16 | 0.75 | 0.59 | range (attacks) |
| 70 | Maokai | +0.16 | 0.73 | 0.57 |  |
| 71 | Morgana | +0.16 | 0.52 | 0.36 |  |
| 72 | Orianna | +0.16 | 0.47 | 0.31 |  |
| 73 | Malphite | +0.14 | 0.28 | 0.14 |  |
| 74 | Anivia | +0.11 | 0.48 | 0.37 |  |
| 75 | Brand | +0.10 | 0.41 | 0.31 |  |
| 76 | Ahri | +0.09 | 0.41 | 0.32 |  |
| 77 | Kayn | +0.07 | 0.64 | 0.57 |  |
| 78 | Shaco | +0.06 | 0.64 | 0.58 |  |
| 79 | Nami | +0.04 | 0.41 | 0.37 |  |
| 80 | Kled | +0.04 | 0.22 | 0.18 |  |
| 81 | Malzahar | +0.03 | 0.50 | 0.47 |  |
| 82 | Syndra | +0.03 | 0.41 | 0.38 |  |
| 83 | Cassiopeia | 0.00 | 0.41 | 0.41 |  |
| 84 | Neeko | 0.00 | 0.41 | 0.41 |  |
| 85 | Karma | 0.00 | 0.38 | 0.38 |  |
| 86 | Swain | 0.00 | 0.36 | 0.36 |  |
| 87 | Olaf | 0.00 | 0.12 | 0.12 |  |
| 88 | Yasuo | 0.00 | 0.00 | 0.00 |  |
| 89 | Gnar | -0.01 | 0.57 | 0.58 | range (attacks) |
| 90 | Seraphine | -0.02 | 0.51 | 0.53 | range (attacks) |
| 91 | Aurelion Sol | -0.03 | 0.41 | 0.44 |  |
| 92 | Karthus | -0.03 | 0.33 | 0.36 |  |
| 93 | Singed | -0.04 | 0.18 | 0.22 |  |
| 94 | Gangplank | -0.05 | 0.16 | 0.21 |  |
| 95 | Mordekaiser | -0.05 | 0.10 | 0.15 |  |
| 96 | Jhin | -0.07 | 0.50 | 0.57 | range (attacks) |
| 97 | Xerath | -0.07 | 0.47 | 0.54 |  |
| 98 | Hwei | -0.08 | 0.43 | 0.51 |  |
| 99 | Vel'Koz | -0.09 | 0.47 | 0.56 |  |
| 100 | Ivern | -0.10 | 0.33 | 0.43 |  |
| 101 | Udyr | -0.10 | 0.27 | 0.37 |  |
| 102 | Heimerdinger | -0.11 | 0.37 | 0.48 |  |
| 103 | Xin Zhao | -0.11 | 0.34 | 0.45 |  |
| 104 | Zaahen | -0.11 | 0.07 | 0.18 |  |
| 105 | Thresh | -0.12 | 0.33 | 0.45 |  |
| 106 | Aatrox | -0.12 | 0.00 | 0.12 |  |
| 107 | Dr. Mundo | -0.12 | 0.00 | 0.12 |  |
| 108 | Illaoi | -0.12 | 0.00 | 0.12 |  |
| 109 | Jarvan IV | -0.12 | 0.00 | 0.12 |  |
| 110 | Kassadin | -0.12 | 0.00 | 0.12 |  |
| 111 | Tryndamere | -0.12 | 0.00 | 0.12 |  |
| 112 | Yorick | -0.12 | 0.00 | 0.12 |  |
| 113 | Shen | -0.13 | 0.63 | 0.76 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 114 | Ryze | -0.15 | 0.45 | 0.60 |  |
| 115 | Katarina | -0.16 | 0.12 | 0.28 |  |
| 116 | Renekton | -0.18 | 0.00 | 0.18 |  |
| 117 | Riven | -0.18 | 0.00 | 0.18 |  |
| 118 | Taric | -0.18 | 0.00 | 0.18 |  |
| 119 | Rakan | -0.19 | 0.18 | 0.37 |  |
| 120 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 121 | Akali | -0.21 | 0.00 | 0.21 |  |
| 122 | Diana | -0.21 | 0.00 | 0.21 |  |
| 123 | Locke | -0.21 | 0.00 | 0.21 |  |
| 124 | Rumble | -0.21 | 0.00 | 0.21 |  |
| 125 | Blitzcrank | -0.22 | 0.00 | 0.22 |  |
| 126 | Darius | -0.24 | 0.00 | 0.24 |  |
| 127 | Alistar | -0.25 | 0.10 | 0.35 |  |
| 128 | Talon | -0.25 | 0.00 | 0.25 |  |
| 129 | Trundle | -0.25 | 0.00 | 0.25 |  |
| 130 | Yone | -0.26 | 0.00 | 0.26 |  |
| 131 | Rengar | -0.27 | 0.19 | 0.46 |  |
| 132 | Lillia | -0.27 | 0.16 | 0.43 |  |
| 133 | Cho'Gath | -0.27 | 0.00 | 0.27 |  |
| 134 | Ekko | -0.27 | 0.00 | 0.27 |  |
| 135 | Rammus | -0.28 | 0.43 | 0.71 | attack reflect (Defensive Ball Curl) |
| 136 | Bel'Veth | -0.29 | 0.00 | 0.29 |  |
| 137 | Taliyah | -0.30 | 0.47 | 0.77 |  |
| 138 | Skarner | -0.30 | 0.00 | 0.30 |  |
| 139 | Urgot | -0.31 | 0.23 | 0.54 |  |
| 140 | Irelia | -0.31 | 0.00 | 0.31 |  |
| 141 | Lee Sin | -0.31 | 0.00 | 0.31 |  |
| 142 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 143 | Ambessa | -0.37 | 0.00 | 0.37 |  |
| 144 | Amumu | -0.37 | 0.00 | 0.37 |  |
| 145 | Braum | -0.37 | 0.00 | 0.37 |  |
| 146 | Kha'Zix | -0.37 | 0.00 | 0.37 |  |
| 147 | Pantheon | -0.38 | 0.43 | 0.81 |  |
| 148 | Fiddlesticks | -0.39 | 0.34 | 0.73 |  |
| 149 | Nautilus | -0.42 | 0.00 | 0.42 |  |
| 150 | Sion | -0.45 | 0.13 | 0.58 |  |
| 151 | Rell | -0.46 | 0.00 | 0.46 |  |
| 152 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 153 | Gragas | -0.49 | 0.00 | 0.49 |  |
| 154 | Sett | -0.49 | 0.00 | 0.49 |  |
| 155 | Sejuani | -0.52 | 0.00 | 0.52 |  |
| 156 | Shyvana | -0.52 | 0.00 | 0.52 |  |
| 157 | Volibear | -0.52 | 0.00 | 0.52 |  |
| 158 | K'Sante | -0.55 | 0.00 | 0.55 |  |
| 159 | Hecarim | -0.56 | 0.00 | 0.56 |  |
| 160 | Leona | -0.57 | 0.00 | 0.57 |  |
| 161 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 162 | Qiyana | -0.62 | 0.00 | 0.62 |  |
| 163 | Briar | -0.64 | 0.00 | 0.64 |  |
| 164 | Ornn | -0.64 | 0.00 | 0.64 |  |
| 165 | Pyke | -0.65 | 0.00 | 0.65 |  |
| 166 | Vi | -0.69 | 0.00 | 0.69 |  |
| 167 | Tahm Kench | -0.74 | 0.00 | 0.74 |  |
| 168 | Viego | -0.76 | 0.00 | 0.76 |  |
| 169 | Warwick | -0.81 | 0.08 | 0.89 |  |
| 170 | Galio | -0.81 | 0.00 | 0.81 |  |
| 171 | Nunu & Willump | -0.82 | 0.00 | 0.82 |  |
| 172 | Zac | -0.98 | 0.00 | 0.98 |  |
