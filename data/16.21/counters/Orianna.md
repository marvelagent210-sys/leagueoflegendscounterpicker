# Counters to Orianna (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Orianna: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Orianna wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Orianna --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.87 |
| 2 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +1.00 |
| 3 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.36 |
| 4 | K'Sante | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.75 |
| 5 | Zeri | +0.82 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.58 |
| 6 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.81 |
| 7 | Tryndamere | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.45 |
| 8 | Jayce | +0.81 | +1.00 | +1.00 | +1.00 | −0.00 | +0.92 | +0.46 |
| 9 | Yasuo | +0.81 | +1.00 | +1.00 | +0.94 | −0.05 | +1.00 | +0.65 |
| 10 | Gragas | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.24 |
| 11 | Camille | +0.81 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.44 |
| 12 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.33 |
| 13 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.21 |
| 14 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.09 |
| 15 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.71 |
| 16 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.55 |
| 17 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.61 |
| 18 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.45 |
| 19 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.33 |
| 20 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.43 |
| 21 | Vi | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.13 |
| 22 | Corki | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.07 |
| 23 | Zac | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.26 |
| 24 | Heimerdinger | +0.78 | +1.00 | +0.94 | +1.00 | +0.03 | +1.00 | −0.12 |
| 25 | Ashe | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.01 |
| 26 | Teemo | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.03 |
| 27 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | −0.05 |
| 28 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.05 | – | −0.16 |
| 29 | Olaf | +0.73 | +1.00 | +1.00 | +1.00 | −0.24 | +0.64 | +0.08 |
| 30 | Nocturne | +0.70 | +1.00 | +1.00 | +1.00 | −0.20 | +0.00 | +0.51 |
| 31 | Lulu | +0.65 | +0.74 | +0.85 | +1.00 | +0.03 | – | −0.30 |
| 32 | Gwen | +0.62 | +0.72 | +1.00 | +0.44 | −0.21 | +1.00 | +0.58 |
| 33 | Jax | +0.61 | +1.00 | +1.00 | +0.00 | +0.03 | +1.00 | +0.20 |
| 34 | Malphite | +0.60 | +1.00 | +1.00 | +0.00 | −0.10 | +1.00 | +0.23 |
| 35 | Maokai | +0.58 | +1.00 | +1.00 | +1.00 | −0.05 | −1.00 | −0.31 |
| 36 | Irelia | +0.51 | +0.96 | −0.13 | +0.99 | +0.01 | +1.00 | +0.08 |
| 37 | Warwick | +0.50 | +0.00 | +1.00 | +1.00 | −0.27 | +1.00 | −0.16 |
| 38 | Xayah | +0.49 | +1.00 | +0.00 | +1.00 | −0.01 | – | −0.08 |
| 39 | Riven | +0.46 | +1.00 | +1.00 | +0.50 | −0.22 | −1.00 | −0.08 |
| 40 | Tahm Kench | +0.44 | +0.87 | +0.06 | +0.98 | −0.04 | +0.17 | +0.08 |
| 41 | Kai'Sa | +0.41 | +1.00 | −0.17 | +1.00 | −0.09 | – | −0.51 |
| 42 | Diana | +0.41 | +1.00 | +1.00 | −1.00 | +0.09 | +1.00 | −0.14 |
| 43 | Nilah | +0.40 | +1.00 | +1.00 | −1.00 | −0.04 | +1.00 | +0.21 |
| 44 | Kassadin | +0.40 | +1.00 | +1.00 | −1.00 | −0.15 | +1.00 | +0.45 |
| 45 | Pantheon | +0.38 | +1.00 | +1.00 | −1.00 | −0.14 | +1.00 | −0.05 |
| 46 | Sion | +0.35 | +1.00 | +1.00 | −0.76 | −0.07 | +0.00 | +0.36 |
| 47 | Ziggs | +0.35 | +1.00 | +1.00 | −1.00 | +0.13 | – | −0.04 |
| 48 | Azir | +0.33 | +1.00 | +1.00 | −1.00 | −0.01 | – | +0.05 |
| 49 | Xin Zhao | +0.31 | +1.00 | +0.78 | −1.00 | +0.02 | +0.63 | +0.01 |
| 50 | Lee Sin | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.02 |
| 51 | Gangplank | +0.27 | −1.00 | +1.00 | +1.00 | −0.13 | +1.00 | −0.20 |
| 52 | Gnar | +0.21 | +0.23 | +0.83 | +0.25 | −0.07 | −1.00 | +0.15 |
| 53 | Aphelios | +0.21 | +1.00 | −1.00 | +1.00 | −0.05 | – | −0.10 |
| 54 | Twisted Fate | +0.19 | −1.00 | +1.00 | +1.00 | −0.08 | – | −0.32 |
| 55 | Garen | +0.18 | +1.00 | +1.00 | −1.00 | −0.08 | −1.00 | −0.23 |
| 56 | Mordekaiser | +0.16 | +0.00 | +0.12 | +0.22 | −0.07 | +0.88 | +0.11 |
| 57 | Anivia | +0.11 | +0.34 | −0.10 | +0.24 | −0.13 | – | +0.14 |
| 58 | Viego | +0.07 | −1.00 | +1.00 | +0.00 | −0.16 | +1.00 | −0.18 |
| 59 | Rumble | −0.01 | −0.43 | +1.00 | −1.00 | −0.07 | +0.50 | +0.27 |
| 60 | Yone | −0.03 | +0.24 | +1.00 | −1.00 | −0.26 | −1.00 | +0.05 |
| 61 | Annie | −0.08 | +1.00 | −1.00 | −1.00 | +0.03 | +1.00 | +0.23 |
| 62 | Fizz | −0.10 | −1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.04 |
| 63 | Hecarim | −0.11 | −1.00 | +1.00 | −1.00 | −0.10 | +1.00 | +0.11 |
| 64 | Rammus | −0.11 | +1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.06 |
| 65 | Cho'Gath | −0.12 | −1.00 | +1.00 | −1.00 | −0.15 | +1.00 | +0.01 |
| 66 | Yunara | −0.17 | +0.25 | −0.06 | −1.00 | −0.02 | – | +0.06 |
| 67 | Braum | −0.19 | −0.91 | −0.88 | +1.00 | −0.03 | +0.59 | +0.05 |
| 68 | Fiddlesticks | −0.21 | +1.00 | −1.00 | −1.00 | +0.02 | – | +0.11 |
| 69 | Elise | −0.25 | +1.00 | −1.00 | −1.00 | −0.04 | – | −0.32 |
| 70 | Sylas | −0.29 | +1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.07 |
| 71 | Kled | −0.29 | +1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.10 |
| 72 | Tristana | −0.30 | −1.00 | +1.00 | −1.00 | +0.16 | −1.00 | −0.47 |
| 73 | Kennen | −0.30 | −0.93 | −0.81 | +0.74 | +0.04 | – | +0.25 |
| 74 | Renekton | −0.32 | +0.00 | +0.00 | −1.00 | −0.09 | −1.00 | −0.17 |
| 75 | Ambessa | −0.33 | −1.00 | +1.00 | −1.00 | −0.29 | −1.00 | +0.32 |
| 76 | Swain | −0.33 | −0.65 | −0.65 | +0.16 | +0.04 | – | −0.27 |
| 77 | Zilean | −0.35 | −1.00 | −1.00 | +1.00 | −0.07 | – | −0.06 |
| 78 | Kindred | −0.35 | −1.00 | −1.00 | +1.00 | −0.04 | – | −0.24 |
| 79 | Taric | −0.35 | −0.36 | −0.33 | −0.70 | −0.02 | −0.33 | −0.11 |
| 80 | Samira | −0.36 | −1.00 | −1.00 | +1.00 | −0.04 | – | −0.32 |
| 81 | Wukong | −0.37 | +0.00 | −1.00 | +0.00 | −0.25 | −1.00 | +0.44 |
| 82 | Caitlyn | −0.42 | +0.26 | −1.00 | −1.00 | −0.07 | −0.16 | −0.11 |
| 83 | Quinn | −0.42 | −1.00 | −1.00 | +0.77 | −0.08 | – | −0.39 |
| 84 | Urgot | −0.43 | −1.00 | −1.00 | +0.92 | −0.04 | −1.00 | −0.22 |
| 85 | Darius | −0.44 | −1.00 | −1.00 | +1.00 | −0.19 | −1.00 | −0.31 |
| 86 | Bel'Veth | −0.45 | −1.00 | −1.00 | +0.85 | −0.11 | −1.00 | −0.04 |
| 87 | Smolder | −0.49 | −1.00 | +0.00 | −1.00 | +0.09 | – | −0.05 |
| 88 | Jhin | −0.50 | +0.04 | −1.00 | −1.00 | +0.02 | – | −0.28 |
| 89 | Aurelion Sol | −0.51 | +0.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.06 |
| 90 | Kayn | −0.55 | −0.57 | −1.00 | −1.00 | −0.12 | +0.72 | −0.25 |
| 91 | Sett | −0.59 | −1.00 | +0.00 | −1.00 | −0.20 | −1.00 | −0.18 |
| 92 | Draven | −0.62 | −0.41 | −1.00 | −1.00 | −0.02 | – | −0.03 |
| 93 | Kalista | −0.62 | −1.00 | −0.30 | −1.00 | −0.10 | – | −0.35 |
| 94 | Hwei | −0.64 | −1.00 | −0.65 | −0.79 | +0.00 | – | −0.18 |
| 95 | Briar | −0.71 | −0.39 | −1.00 | −1.00 | −0.36 | −1.00 | −0.24 |
| 96 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.41 | −1.00 | +0.35 |
| 97 | Aurora | −0.75 | −0.86 | −1.00 | −1.00 | −0.07 | – | +0.02 |
| 98 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.51 |
| 99 | Lucian | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.31 |
| 100 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.14 |
| 101 | Lissandra | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.20 |
| 102 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.53 |
| 103 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.11 |
| 104 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.02 |
| 105 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.07 |
| 106 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.03 |
| 107 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.05 |
| 108 | Brand | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | −0.65 | −0.23 |
| 109 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 110 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.10 |
| 111 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.17 |
| 112 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.10 |
| 113 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.02 |
| 114 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.30 |
| 115 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.01 |
| 116 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.19 |
| 117 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.17 |
| 118 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.28 |
| 119 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.30 |
| 120 | Shen | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.10 |
| 121 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.27 |
| 122 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.03 |
| 123 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.31 |
| 124 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.14 |
| 125 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.22 |
| 126 | Miss Fortune | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.28 |
| 127 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.39 |
| 128 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.20 |
| 129 | Morgana | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.10 |
| 130 | Milio | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.30 |
| 131 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.32 |
| 132 | Nami | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.41 |
| 133 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.47 |
| 134 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.01 |
| 135 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.09 |
| 136 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.29 |
| 137 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.10 |
| 138 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.23 |
| 139 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.49 |
| 140 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.44 |
| 141 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.38 |
| 142 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.26 |
| 143 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.01 |
| 144 | Renata Glasc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.40 |
| 145 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −0.95 | −0.27 |
| 146 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.24 |
| 147 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.06 |
| 148 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.07 |
| 149 | Neeko | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.17 |
| 150 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.27 |
| 151 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.16 |
| 152 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.36 |
| 153 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.22 |
| 154 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.45 |
| 155 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.10 |
| 156 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.21 |
| 157 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.31 |
| 158 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.36 |
| 159 | Graves | −0.82 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.42 |
| 160 | Zyra | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.29 |
| 161 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.03 |
| 162 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.16 |
| 163 | Illaoi | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.17 |
| 164 | Thresh | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.40 |
| 165 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.33 |
| 166 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.67 |
| 167 | Singed | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.13 |
| 168 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 169 | Shaco | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.24 |
| 170 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.28 |
| 171 | Aatrox | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.19 |
| 172 | Qiyana | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.23 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Orianna's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Orianna's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Orianna` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.96)

- **0.80** spell shield: Spell Shield's spell shield blocks Orianna's Command: Shockwave. Spell shield for 1.5 s, long enough to use ahead of Command: Shockwave. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Orianna R Command: Shockwave)
- **0.32** spell shield: Spell Shield's spell shield blocks Orianna's Command: Protect. Spell shield for 1.5 s, long enough to use ahead of Command: Protect. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Orianna E Command: Protect)

#### 2. Fizz (net +0.91)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Orianna's Command: Shockwave. Untargetable for 0.75 s; Command: Shockwave takes 0.5 s to land, enough to react. (Fizz E Playful → Orianna R Command: Shockwave)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Orianna's Command: Protect. Untargetable for 0.75 s; Command: Protect takes 0.61 s to land, enough to react. (Fizz E Playful → Orianna E Command: Protect)
- Watch out: Orianna's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 3. Bard (net +0.91)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2.5 s, long enough to use ahead of Command: Shockwave. (Bard R Tempered Fate → Orianna R Command: Shockwave)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Orianna's Command: Protect. Untargetable for 2.5 s, long enough to use ahead of Command: Protect. (Bard R Tempered Fate → Orianna E Command: Protect)

#### 4. Lissandra (net +0.91)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2.5 s, long enough to use ahead of Command: Shockwave. (Lissandra R Frozen Tomb → Orianna R Command: Shockwave)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Orianna's Command: Protect. Untargetable for 2.5 s, long enough to use ahead of Command: Protect. (Lissandra R Frozen Tomb → Orianna E Command: Protect)

#### 5. Fiora (net +0.83)

- **0.90** parry: Riposte parries Orianna's Command: Shockwave and stuns back. Parry for 0.75 s; Command: Shockwave takes 0.5 s to land, enough to react. Negating Command: Shockwave's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Orianna R Command: Shockwave)
- **0.33** parry: Riposte parries Orianna's Command: Protect. Parry for 0.75 s; Command: Protect takes 0.61 s to land, enough to react. (Fiora W Riposte → Orianna E Command: Protect)
- **0.06** attack speed slow: Riposte cuts Orianna's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Orianna basic attacks)
- Watch out: Orianna's basic attacks reach 375 units farther than Fiora's (525 vs 150 attack range).

#### 6. Vladimir (net +0.82)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Orianna's Command: Shockwave. Untargetable for 2 s, long enough to use ahead of Command: Shockwave. (Vladimir W Sanguine Pool → Orianna R Command: Shockwave)
- **0.33** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Orianna's Command: Protect. Untargetable for 2 s, long enough to use ahead of Command: Protect. (Vladimir W Sanguine Pool → Orianna E Command: Protect)
- Watch out: Orianna's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 7. Aurora (net +0.82)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Orianna's Command: Shockwave. Untargetable for 0.4 s; Command: Shockwave takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Orianna R Command: Shockwave)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Orianna's Command: Protect. Untargetable for 0.4 s; Command: Protect takes 0.61 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Orianna E Command: Protect)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Orianna R Command: Shockwave)

#### 8. Nocturne (net +0.80)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Orianna's Command: Shockwave. Spell shield for 1.5 s, long enough to use ahead of Command: Shockwave. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Orianna R Command: Shockwave)
- **0.38** spell shield: Shroud of Darkness's spell shield blocks Orianna's Command: Protect. Spell shield for 1.5 s, long enough to use ahead of Command: Protect. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Orianna E Command: Protect)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Orianna R Command: Shockwave)
- Watch out: Orianna's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 9. Xayah (net +0.80)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Orianna's Command: Shockwave. Untargetable for 1.5 s, long enough to use ahead of Command: Shockwave. (Xayah R Featherstorm → Orianna R Command: Shockwave)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Orianna's Command: Protect. Untargetable for 1.5 s, long enough to use ahead of Command: Protect. (Xayah R Featherstorm → Orianna E Command: Protect)

#### 10. Rek'Sai (net +0.77)

- **0.80** untargetable: Void Rush makes Rek'Sai untargetable, dodging Orianna's Command: Shockwave. Untargetable for 1.5 s, long enough to use ahead of Command: Shockwave. (Rek'Sai R Void Rush → Orianna R Command: Shockwave)
- **0.21** untargetable: Void Rush makes Rek'Sai untargetable, dodging Orianna's Command: Protect. Untargetable for 1.5 s, long enough to use ahead of Command: Protect. (Rek'Sai R Void Rush → Orianna E Command: Protect)
- **0.08** cc immunity: Void Rush is displacement immune, ignoring Orianna's Command: Shockwave (airborne) during it. Only during Void Rush (1.5 s). (Rek'Sai R Void Rush → Orianna R Command: Shockwave)
- Watch out: Orianna's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.96 | 0.96 | 0.00 |  |
| 2 | Fizz | +0.91 | 1.03 | 0.12 |  |
| 3 | Bard | +0.91 | 0.91 | 0.00 |  |
| 4 | Lissandra | +0.91 | 0.91 | 0.00 |  |
| 5 | Fiora | +0.83 | 1.08 | 0.25 |  |
| 6 | Vladimir | +0.82 | 0.97 | 0.15 |  |
| 7 | Aurora | +0.82 | 0.82 | 0.00 |  |
| 8 | Nocturne | +0.80 | 1.07 | 0.27 |  |
| 9 | Xayah | +0.80 | 0.80 | 0.00 |  |
| 10 | Rek'Sai | +0.77 | 0.93 | 0.16 |  |
| 11 | Camille | +0.75 | 0.88 | 0.13 |  |
| 12 | Maokai | +0.74 | 1.01 | 0.27 |  |
| 13 | Morgana | +0.74 | 0.84 | 0.10 |  |
| 14 | Evelynn | +0.73 | 0.91 | 0.18 |  |
| 15 | Shaco | +0.73 | 0.91 | 0.18 |  |
| 16 | Gwen | +0.71 | 0.96 | 0.25 |  |
| 17 | Master Yi | +0.69 | 1.03 | 0.34 |  |
| 18 | Kayle | +0.69 | 0.69 | 0.00 |  |
| 19 | Zaahen | +0.66 | 0.82 | 0.16 |  |
| 20 | Zed | +0.62 | 0.80 | 0.18 |  |
| 21 | Milio | +0.61 | 0.61 | 0.00 |  |
| 22 | Kled | +0.60 | 0.69 | 0.09 |  |
| 23 | Udyr | +0.59 | 0.86 | 0.27 |  |
| 24 | Yuumi | +0.58 | 1.03 | 0.45 |  |
| 25 | Kalista | +0.53 | 0.53 | 0.00 |  |
| 26 | Samira | +0.43 | 0.43 | 0.00 |  |
| 27 | Braum | +0.41 | 0.68 | 0.27 | projectile block (Unbreakable) |
| 28 | Mel | +0.41 | 0.41 | 0.00 |  |
| 29 | Alistar | +0.39 | 0.66 | 0.27 |  |
| 30 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 31 | Yasuo | +0.34 | 0.50 | 0.16 |  |
| 32 | Tristana | +0.32 | 0.32 | 0.00 |  |
| 33 | Kayn | +0.30 | 0.91 | 0.61 |  |
| 34 | Olaf | +0.30 | 0.83 | 0.53 |  |
| 35 | Sion | +0.28 | 0.83 | 0.55 |  |
| 36 | Lulu | +0.25 | 0.25 | 0.00 |  |
| 37 | Xin Zhao | +0.22 | 0.45 | 0.23 |  |
| 38 | Warwick | +0.17 | 0.90 | 0.73 |  |
| 39 | Rengar | +0.15 | 0.68 | 0.53 |  |
| 40 | Gangplank | +0.14 | 0.67 | 0.53 |  |
| 41 | Ashe | +0.14 | 0.14 | 0.00 |  |
| 42 | Senna | +0.12 | 0.12 | 0.00 |  |
| 43 | Annie | +0.11 | 0.11 | 0.00 |  |
| 44 | Anivia | +0.09 | 0.09 | 0.00 |  |
| 45 | Vex | +0.08 | 0.08 | 0.00 |  |
| 46 | Nilah | +0.05 | 0.25 | 0.20 |  |
| 47 | Aphelios | +0.05 | 0.05 | 0.00 |  |
| 48 | Heimerdinger | +0.05 | 0.05 | 0.00 |  |
| 49 | Malzahar | +0.03 | 0.43 | 0.40 |  |
| 50 | K'Sante | +0.03 | 0.16 | 0.13 |  |
| 51 | Jax | +0.01 | 0.28 | 0.27 |  |
| 52 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 53 | Azir | 0.00 | 0.00 | 0.00 |  |
| 54 | Brand | 0.00 | 0.00 | 0.00 |  |
| 55 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 56 | Corki | 0.00 | 0.00 | 0.00 |  |
| 57 | Draven | 0.00 | 0.00 | 0.00 |  |
| 58 | Elise | 0.00 | 0.00 | 0.00 |  |
| 59 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 60 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 61 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 62 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 63 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 64 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 65 | Karma | 0.00 | 0.00 | 0.00 |  |
| 66 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 67 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 68 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 69 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 70 | Lux | 0.00 | 0.00 | 0.00 |  |
| 71 | Nami | 0.00 | 0.00 | 0.00 |  |
| 72 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 73 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 82 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 83 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 84 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 85 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 86 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 87 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 88 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 89 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 90 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 91 | Malphite | -0.01 | 0.26 | 0.27 |  |
| 92 | Thresh | -0.03 | 0.00 | 0.03 |  |
| 93 | Jarvan IV | -0.04 | 0.08 | 0.12 |  |
| 94 | Yone | -0.04 | 0.08 | 0.12 |  |
| 95 | Graves | -0.04 | 0.00 | 0.04 |  |
| 96 | Caitlyn | -0.06 | 0.22 | 0.28 |  |
| 97 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 98 | Varus | -0.06 | 0.00 | 0.06 |  |
| 99 | Ivern | -0.07 | 0.00 | 0.07 |  |
| 100 | Pantheon | -0.08 | 0.56 | 0.64 |  |
| 101 | Hecarim | -0.08 | 0.08 | 0.16 |  |
| 102 | Ornn | -0.08 | 0.08 | 0.16 |  |
| 103 | Volibear | -0.09 | 0.08 | 0.17 |  |
| 104 | Rakan | -0.10 | 0.00 | 0.10 |  |
| 105 | Sylas | -0.12 | 0.00 | 0.12 |  |
| 106 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 107 | Briar | -0.13 | 0.00 | 0.13 |  |
| 108 | Lillia | -0.13 | 0.00 | 0.13 |  |
| 109 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 110 | Viego | -0.15 | 0.08 | 0.23 |  |
| 111 | Garen | -0.16 | 0.31 | 0.47 |  |
| 112 | Rammus | -0.16 | 0.27 | 0.43 |  |
| 113 | Wukong | -0.16 | 0.00 | 0.16 |  |
| 114 | Rell | -0.16 | 0.00 | 0.16 |  |
| 115 | Shyvana | -0.17 | 0.08 | 0.25 |  |
| 116 | Bel'Veth | -0.17 | 0.00 | 0.17 |  |
| 117 | Qiyana | -0.17 | 0.00 | 0.17 |  |
| 118 | Akali | -0.18 | 0.00 | 0.18 |  |
| 119 | Ambessa | -0.18 | 0.00 | 0.18 |  |
| 120 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 121 | Lee Sin | -0.18 | 0.00 | 0.18 |  |
| 122 | Riven | -0.18 | 0.00 | 0.18 |  |
| 123 | Talon | -0.18 | 0.00 | 0.18 |  |
| 124 | Illaoi | -0.19 | 0.08 | 0.27 |  |
| 125 | Sett | -0.19 | 0.08 | 0.27 |  |
| 126 | Irelia | -0.22 | 0.00 | 0.22 |  |
| 127 | Aatrox | -0.23 | 0.00 | 0.23 |  |
| 128 | Nautilus | -0.23 | 0.00 | 0.23 |  |
| 129 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 130 | Akshan | -0.25 | 0.00 | 0.25 |  |
| 131 | Diana | -0.25 | 0.00 | 0.25 |  |
| 132 | Kassadin | -0.25 | 0.00 | 0.25 |  |
| 133 | Pyke | -0.25 | 0.00 | 0.25 |  |
| 134 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 135 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 136 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 137 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 138 | Leona | -0.27 | 0.00 | 0.27 |  |
| 139 | Locke | -0.27 | 0.00 | 0.27 |  |
| 140 | Renekton | -0.27 | 0.00 | 0.27 |  |
| 141 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 142 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 143 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 144 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 145 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 146 | Vi | -0.32 | 0.08 | 0.40 |  |
| 147 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 148 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 149 | Shen | -0.36 | 0.27 | 0.63 |  |
| 150 | Gragas | -0.37 | 0.00 | 0.37 |  |
| 151 | Karthus | -0.38 | 0.00 | 0.38 |  |
| 152 | Fiddlesticks | -0.40 | 0.00 | 0.40 |  |
| 153 | Janna | -0.40 | 0.00 | 0.40 |  |
| 154 | Mordekaiser | -0.41 | 0.06 | 0.47 |  |
| 155 | Skarner | -0.44 | 0.06 | 0.50 |  |
| 156 | Zac | -0.46 | 0.00 | 0.46 |  |
| 157 | Darius | -0.47 | 0.00 | 0.47 |  |
| 158 | Katarina | -0.47 | 0.00 | 0.47 |  |
| 159 | Poppy | -0.47 | 0.00 | 0.47 |  |
| 160 | Trundle | -0.47 | 0.00 | 0.47 |  |
| 161 | Yorick | -0.47 | 0.00 | 0.47 |  |
| 162 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 163 | Tahm Kench | -0.49 | 0.00 | 0.49 |  |
| 164 | Taric | -0.50 | 0.00 | 0.50 |  |
| 165 | Blitzcrank | -0.53 | 0.00 | 0.53 |  |
| 166 | Cho'Gath | -0.53 | 0.00 | 0.53 |  |
| 167 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 168 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 169 | Singed | -0.53 | 0.00 | 0.53 |  |
| 170 | Naafiri | -0.58 | 0.00 | 0.58 |  |
| 171 | Galio | -0.72 | 0.00 | 0.72 |  |
| 172 | Nunu & Willump | -0.78 | 0.12 | 0.90 |  |
