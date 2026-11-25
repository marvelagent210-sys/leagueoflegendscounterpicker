# Counters to Quinn (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Quinn: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Quinn wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Quinn --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.86 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.91 |
| 2 | Zeri | +0.85 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.98 |
| 3 | Kog'Maw | +0.84 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.85 |
| 4 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.78 |
| 5 | Nasus | +0.84 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.98 |
| 6 | Xayah | +0.84 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.74 |
| 7 | Jayce | +0.84 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.81 |
| 8 | Miss Fortune | +0.83 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.69 |
| 9 | Udyr | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.99 |
| 10 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.84 |
| 11 | Teemo | +0.83 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.75 |
| 12 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.24 |
| 13 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.29 |
| 14 | Dr. Mundo | +0.83 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.69 |
| 15 | Ashe | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.72 |
| 16 | Vel'Koz | +0.83 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.49 |
| 17 | Jhin | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.27 |
| 18 | Kassadin | +0.81 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.50 |
| 19 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.29 |
| 20 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.46 |
| 21 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.13 |
| 22 | Cassiopeia | +0.80 | +0.99 | +0.99 | +1.00 | +0.11 | – | +0.14 |
| 23 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.04 |
| 24 | Kai'Sa | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.01 |
| 25 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.12 |
| 26 | Malzahar | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.05 |
| 27 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.09 |
| 28 | Sylas | +0.75 | +1.00 | +1.00 | +0.84 | +0.26 | +0.04 | +0.71 |
| 29 | Lulu | +0.74 | +0.78 | +1.00 | +1.00 | +0.04 | – | +0.25 |
| 30 | Akshan | +0.70 | +1.00 | +1.00 | +0.51 | +0.09 | – | +0.34 |
| 31 | Master Yi | +0.69 | +1.00 | +1.00 | +0.14 | +0.10 | +1.00 | +0.91 |
| 32 | Volibear | +0.68 | +1.00 | +1.00 | +1.00 | −0.06 | −0.29 | +0.37 |
| 33 | Poppy | +0.61 | +0.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.59 |
| 34 | Kennen | +0.58 | +0.61 | +0.61 | +1.00 | −0.04 | – | +0.49 |
| 35 | Ziggs | +0.48 | +1.00 | −0.29 | +1.00 | +0.23 | – | +0.38 |
| 36 | Camille | +0.47 | +0.27 | +0.27 | +1.00 | −0.11 | +1.00 | +1.00 |
| 37 | Fiora | +0.44 | +1.00 | +1.00 | −1.00 | −0.07 | +1.00 | +1.00 |
| 38 | Trundle | +0.43 | +1.00 | +1.00 | −1.00 | −0.12 | +1.00 | +1.00 |
| 39 | Orianna | +0.42 | +1.00 | +1.00 | −0.77 | +0.08 | – | +0.39 |
| 40 | Samira | +0.42 | +0.31 | +0.29 | +1.00 | +0.09 | – | +0.27 |
| 41 | Kled | +0.40 | +1.00 | +1.00 | −0.07 | −0.13 | −1.00 | +0.74 |
| 42 | Aphelios | +0.36 | +1.00 | +1.00 | −1.00 | +0.10 | – | +0.23 |
| 43 | Draven | +0.36 | +1.00 | +1.00 | −1.00 | +0.06 | – | +0.27 |
| 44 | Malphite | +0.35 | −1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.76 |
| 45 | Gwen | +0.34 | +0.61 | +0.61 | +0.63 | −0.24 | −1.00 | +0.97 |
| 46 | Neeko | +0.22 | +0.77 | +0.77 | −1.00 | +0.06 | – | +0.09 |
| 47 | Kindred | +0.22 | −1.00 | +1.00 | +1.00 | −0.01 | – | −0.09 |
| 48 | Caitlyn | +0.19 | +0.46 | +0.49 | −0.45 | +0.07 | +0.39 | −0.11 |
| 49 | Milio | +0.09 | +0.36 | +0.36 | −0.66 | +0.22 | – | +0.03 |
| 50 | Yunara | +0.06 | −0.28 | −0.25 | +1.00 | +0.05 | – | −0.38 |
| 51 | Anivia | +0.01 | −0.02 | −0.02 | +0.05 | −0.04 | – | +0.33 |
| 52 | Smolder | +0.01 | +0.34 | +0.33 | −0.88 | +0.04 | – | +0.28 |
| 53 | Graves | +0.00 | −0.69 | +1.00 | −1.00 | +0.18 | +1.00 | −0.06 |
| 54 | Gangplank | −0.06 | +1.00 | −1.00 | −1.00 | −0.04 | +1.00 | +0.98 |
| 55 | Bel'Veth | −0.07 | −1.00 | +0.74 | −0.90 | +0.19 | +1.00 | +0.96 |
| 56 | Tahm Kench | −0.10 | −0.18 | −0.18 | +0.07 | −0.06 | −0.25 | +0.23 |
| 57 | Sejuani | −0.10 | −0.04 | +0.67 | −0.98 | +0.02 | −1.00 | +0.65 |
| 58 | Shyvana | −0.12 | +0.00 | −1.00 | +1.00 | −0.10 | −1.00 | +0.96 |
| 59 | Gragas | −0.12 | +0.00 | −0.81 | +0.79 | −0.06 | −1.00 | +0.54 |
| 60 | Vi | −0.14 | +1.00 | −1.00 | −1.00 | −0.30 | +1.00 | +0.17 |
| 61 | Taric | −0.14 | −0.17 | −0.14 | −0.21 | +0.06 | −0.31 | +0.12 |
| 62 | Varus | −0.14 | −0.99 | +1.00 | −0.74 | +0.01 | – | +0.34 |
| 63 | Lillia | −0.14 | −0.53 | −0.20 | +0.46 | +0.08 | −1.00 | +0.67 |
| 64 | Rumble | −0.16 | −0.61 | +0.55 | −1.00 | −0.00 | +0.23 | +0.68 |
| 65 | Irelia | −0.18 | −1.00 | −1.00 | +1.00 | +0.09 | +1.00 | +0.03 |
| 66 | Sion | −0.19 | −1.00 | −1.00 | +0.97 | −0.09 | +1.00 | +0.61 |
| 67 | Renekton | −0.19 | +0.55 | −1.00 | −0.97 | −0.09 | +1.00 | +0.57 |
| 68 | Tryndamere | −0.20 | −1.00 | −1.00 | +1.00 | −0.18 | +1.00 | +0.62 |
| 69 | Azir | −0.20 | −1.00 | +1.00 | −1.00 | +0.04 | – | +0.35 |
| 70 | Fizz | −0.28 | +1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.50 |
| 71 | Twitch | −0.28 | +0.00 | −0.43 | −0.77 | +0.01 | – | +0.14 |
| 72 | Lucian | −0.29 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.57 |
| 73 | Xin Zhao | −0.36 | −0.99 | −0.88 | +0.23 | −0.01 | +0.60 | +0.15 |
| 74 | Lee Sin | −0.38 | −1.00 | −1.00 | +0.00 | −0.06 | +1.00 | +0.56 |
| 75 | Yasuo | −0.41 | −1.00 | −1.00 | +0.21 | −0.08 | +0.20 | +0.87 |
| 76 | Yone | −0.41 | −1.00 | −1.00 | +1.00 | −0.08 | −1.00 | +0.09 |
| 77 | Swain | −0.49 | −0.51 | −0.56 | −0.88 | +0.00 | – | +0.03 |
| 78 | Rammus | −0.49 | −0.82 | −0.82 | −1.00 | −0.05 | +1.00 | +0.54 |
| 79 | Maokai | −0.51 | −1.00 | +0.00 | −1.00 | +0.15 | −1.00 | +0.27 |
| 80 | Kayn | −0.53 | −0.42 | −0.42 | −1.00 | −0.18 | −1.00 | +0.05 |
| 81 | Mordekaiser | −0.53 | −0.97 | −0.97 | +0.17 | −0.02 | −1.00 | +0.41 |
| 82 | Warwick | −0.54 | −1.00 | −1.00 | −1.00 | +0.19 | +1.00 | +0.65 |
| 83 | Jarvan IV | −0.54 | −1.00 | −1.00 | −1.00 | +0.11 | +1.00 | +0.78 |
| 84 | Karthus | −0.55 | −1.00 | −1.00 | −0.07 | +0.06 | – | +0.15 |
| 85 | Naafiri | −0.56 | −1.00 | −1.00 | −1.00 | +0.01 | +1.00 | +0.75 |
| 86 | Nocturne | −0.56 | −1.00 | −1.00 | −1.00 | −0.08 | +1.00 | +0.97 |
| 87 | Diana | −0.56 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.46 |
| 88 | Jax | −0.57 | −1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.74 |
| 89 | Zed | −0.59 | −1.00 | −1.00 | +0.00 | −0.19 | −1.00 | +0.74 |
| 90 | Wukong | −0.60 | −1.00 | −1.00 | +0.00 | −0.27 | −1.00 | +0.72 |
| 91 | Mel | −0.62 | −0.74 | −0.81 | −1.00 | +0.10 | – | +0.34 |
| 92 | Brand | −0.65 | −0.61 | −0.86 | −1.00 | −0.01 | – | −0.26 |
| 93 | Nilah | −0.65 | −1.00 | −1.00 | −1.00 | +0.08 | +0.00 | +0.70 |
| 94 | Braum | −0.66 | −1.00 | −1.00 | −0.85 | −0.04 | −0.00 | +0.44 |
| 95 | Pantheon | −0.67 | −1.00 | −1.00 | −1.00 | −0.17 | +0.50 | +0.12 |
| 96 | Rakan | −0.67 | −1.00 | −0.64 | −1.00 | +0.04 | −1.00 | +0.62 |
| 97 | Sett | −0.67 | −0.89 | −1.00 | −1.00 | −0.15 | +0.06 | +0.36 |
| 98 | Illaoi | −0.67 | −1.00 | −1.00 | −1.00 | +0.06 | −0.18 | +0.69 |
| 99 | Aurelion Sol | −0.68 | −1.00 | −1.00 | −1.00 | +0.50 | – | +0.24 |
| 100 | Shaco | −0.69 | −1.00 | −1.00 | −1.00 | −0.02 | +0.00 | +0.36 |
| 101 | Ambessa | −0.69 | −1.00 | −1.00 | −1.00 | +0.00 | +0.00 | +0.10 |
| 102 | Bard | −0.70 | −1.00 | −1.00 | −0.65 | −0.02 | – | +0.14 |
| 103 | Hwei | −0.72 | −0.95 | −0.91 | −0.98 | +0.02 | – | +0.17 |
| 104 | Gnar | −0.72 | −0.90 | −0.90 | −1.00 | +0.03 | −1.00 | +0.50 |
| 105 | Zaahen | −0.73 | −1.00 | −1.00 | −0.85 | +0.01 | −0.85 | +0.55 |
| 106 | Nunu & Willump | −0.73 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.41 |
| 107 | Sona | −0.74 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.58 |
| 108 | Riven | −0.74 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +1.00 |
| 109 | Viktor | −0.74 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.30 |
| 110 | Aurora | −0.74 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.46 |
| 111 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | −0.12 | −0.59 | +0.68 |
| 112 | Senna | −0.74 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.17 |
| 113 | Sivir | −0.75 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.65 |
| 114 | Xerath | −0.75 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.43 |
| 115 | Fiddlesticks | −0.75 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.44 |
| 116 | Akali | −0.75 | −1.00 | −1.00 | −1.00 | −0.05 | −0.74 | +0.69 |
| 117 | Lux | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.32 |
| 118 | Zoe | −0.75 | −1.00 | −0.96 | −1.00 | +0.08 | – | +0.07 |
| 119 | Ahri | −0.75 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.26 |
| 120 | Janna | −0.75 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.10 |
| 121 | Garen | −0.75 | −1.00 | −1.00 | −1.00 | −0.08 | −0.74 | +0.70 |
| 122 | Syndra | −0.75 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.36 |
| 123 | Taliyah | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.03 |
| 124 | Morgana | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.11 |
| 125 | Zilean | −0.76 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.40 |
| 126 | Jinx | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 127 | Seraphine | −0.76 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.16 |
| 128 | Aatrox | −0.76 | −1.00 | −1.00 | −1.00 | −0.20 | −0.71 | +0.80 |
| 129 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.39 |
| 130 | Urgot | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.00 |
| 131 | Zyra | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.01 |
| 132 | Ezreal | −0.76 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.31 |
| 133 | Karma | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.23 |
| 134 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.71 |
| 135 | Veigar | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.04 |
| 136 | LeBlanc | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.11 |
| 137 | Thresh | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.09 |
| 138 | Elise | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.04 |
| 139 | Talon | −0.77 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.54 |
| 140 | Ryze | −0.77 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.18 |
| 141 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.58 |
| 142 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.39 |
| 143 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.00 |
| 144 | Ornn | −0.78 | −1.00 | −0.98 | −1.00 | +0.01 | −1.00 | +0.35 |
| 145 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.28 |
| 146 | Viego | −0.78 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.75 |
| 147 | Katarina | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.53 |
| 148 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.19 |
| 149 | Vladimir | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.08 |
| 150 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.25 |
| 151 | Olaf | −0.79 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.70 |
| 152 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.31 |
| 153 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.28 |
| 154 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.36 |
| 155 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.28 |
| 156 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.43 |
| 157 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.32 |
| 158 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.50 |
| 159 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.32 |
| 160 | Rell | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.32 |
| 161 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.38 |
| 162 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.11 |
| 163 | Darius | −0.82 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.31 |
| 164 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.02 |
| 165 | Singed | −0.82 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.47 |
| 166 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.38 |
| 167 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.35 |
| 168 | Skarner | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.10 |
| 169 | Cho'Gath | −0.83 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.22 |
| 170 | Zac | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.05 |
| 171 | Ekko | −0.84 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.16 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | −0.07 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Quinn's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Quinn's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Quinn` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +0.82)

- **0.68** spell shield: Shroud of Darkness's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn E Vault)
- **0.50** spell shield: Shroud of Darkness's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Quinn R Skystrike)
- **0.18** interrupt: Unspeakable Horror's fear interrupts Quinn's Behind Enemy Lines (normal channel). Unspeakable Horror must land during the channel. (Nocturne E Unspeakable Horror → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Nocturne's (525 vs 125 attack range).

#### 2. Yasuo (net +0.78)

- **0.41** projectile block: Wind Wall blocks Quinn's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Quinn basic attacks)
- **0.32** projectile block: Wind Wall blocks Quinn's Blinding Assault, a projectile. Wind Wall for 4 s, long enough to use ahead of Blinding Assault. (Yasuo W Wind Wall → Quinn Q Blinding Assault)
- **0.28** interrupt: Steel Tempest's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 3. Sivir (net +0.77)

- **0.57** spell shield: Spell Shield's spell shield blocks Quinn's Vault. Spell shield for 1.5 s, long enough to use ahead of Vault. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn E Vault)
- **0.40** spell shield: Spell Shield's spell shield blocks Quinn's Skystrike. Spell shield for 1.5 s, long enough to use ahead of Skystrike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Quinn R Skystrike)

#### 4. Braum (net +0.72)

- **0.54** projectile block: Unbreakable blocks Quinn's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Quinn basic attacks)
- **0.45** projectile block: Unbreakable blocks Quinn's Blinding Assault, a projectile. Unbreakable for 4 s, long enough to use ahead of Blinding Assault. (Braum E Unbreakable → Quinn Q Blinding Assault)
- **0.19** interrupt: Concussive Blows's stun interrupts Quinn's Behind Enemy Lines (normal channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 5. Rell (net +0.69)

- **0.20** interrupt: Shattering Strike's stun interrupts Quinn's Behind Enemy Lines (normal channel). Shattering Strike must land during the channel. (Rell Q Shattering Strike → Quinn R Behind Enemy Lines)
- **0.19** interrupt: Ferromancy: Crash Down's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Quinn R Behind Enemy Lines)
- **0.19** interrupt: Ferromancy: Mount Up's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 6. Rek'Sai (net +0.65)

- **0.39** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Vault. Untargetable for 1.5 s, long enough to use ahead of Vault. (Rek'Sai R Void Rush → Quinn E Vault)
- **0.33** interrupt: Unburrow's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Quinn R Behind Enemy Lines)
- **0.26** untargetable: Void Rush makes Rek'Sai untargetable, dodging Quinn's Skystrike. Untargetable for 1.5 s, long enough to use ahead of Skystrike. (Rek'Sai R Void Rush → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 350 units farther than Rek'Sai's (525 vs 175 attack range).

#### 7. Fizz (net +0.65)

- **0.51** untargetable: Playful makes Fizz untargetable, dodging Quinn's Vault. Untargetable for 0.75 s; Vault lands within 0.24 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Quinn E Vault)
- **0.33** untargetable: Playful makes Fizz untargetable, dodging Quinn's Skystrike. Untargetable for 0.75 s; Skystrike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Quinn R Skystrike)
- **0.14** interrupt: Chum the Waters's airborne interrupts Quinn's Behind Enemy Lines (normal channel). Chum the Waters must land during the channel. (Fizz R Chum the Waters → Quinn R Behind Enemy Lines)
- Watch out: Quinn's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 8. Udyr (net +0.61)

- **0.85** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Vault (airborne, slow). Immune for 1.5 s, long enough to use ahead of Vault. (Udyr E Blazing Stampede → Quinn E Vault)
- **0.23** interrupt: Blazing Stampede's stun interrupts Quinn's Behind Enemy Lines (normal channel). Blazing Stampede must land during the channel. (Udyr E Blazing Stampede → Quinn R Behind Enemy Lines)
- **0.11** cc immunity: Blazing Stampede makes Udyr immune to Quinn's Blinding Assault (nearsight). Immune for 1.5 s, long enough to use ahead of Blinding Assault. (Udyr E Blazing Stampede → Quinn Q Blinding Assault)
- Watch out: Quinn's basic attacks reach 400 units farther than Udyr's (525 vs 125 attack range).

#### 9. Vladimir (net +0.59)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Vault. Untargetable for 2 s, long enough to use ahead of Vault. (Vladimir W Sanguine Pool → Quinn E Vault)
- **0.43** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Quinn's Skystrike. Untargetable for 2 s, long enough to use ahead of Skystrike. (Vladimir W Sanguine Pool → Quinn R Skystrike)
- Watch out: Quinn's basic attacks reach 75 units farther than Vladimir's (525 vs 450 attack range).

#### 10. Lissandra (net +0.59)

- **0.39** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Vault. Untargetable for 2.5 s, long enough to use ahead of Vault. (Lissandra R Frozen Tomb → Quinn E Vault)
- **0.26** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Quinn's Skystrike. Untargetable for 2.5 s, long enough to use ahead of Skystrike. (Lissandra R Frozen Tomb → Quinn R Skystrike)
- **0.20** dash stop: Frozen Tomb's knockdown can stop Quinn's Vault mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Quinn E Vault)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +0.82 | 1.20 | 0.38 |  |
| 2 | Yasuo | +0.78 | 1.00 | 0.22 | projectile block (Wind Wall) |
| 3 | Sivir | +0.77 | 0.77 | 0.00 |  |
| 4 | Braum | +0.72 | 1.10 | 0.38 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Rell | +0.69 | 0.91 | 0.22 |  |
| 6 | Rek'Sai | +0.65 | 0.87 | 0.22 |  |
| 7 | Fizz | +0.65 | 0.82 | 0.17 |  |
| 8 | Udyr | +0.61 | 0.99 | 0.38 |  |
| 9 | Vladimir | +0.59 | 0.82 | 0.23 |  |
| 10 | Lissandra | +0.59 | 0.59 | 0.00 |  |
| 11 | Lulu | +0.58 | 0.58 | 0.00 |  |
| 12 | Malzahar | +0.56 | 0.96 | 0.40 |  |
| 13 | Bard | +0.56 | 0.56 | 0.00 |  |
| 14 | Viktor | +0.56 | 0.56 | 0.00 |  |
| 15 | K'Sante | +0.54 | 0.72 | 0.18 |  |
| 16 | Cassiopeia | +0.54 | 0.54 | 0.00 | grounding (Miasma) |
| 17 | Xayah | +0.51 | 0.51 | 0.00 |  |
| 18 | Morgana | +0.50 | 0.64 | 0.14 |  |
| 19 | Teemo | +0.50 | 0.50 | 0.00 | blind (Blinding Dart) |
| 20 | Maokai | +0.49 | 0.87 | 0.38 |  |
| 21 | Vex | +0.48 | 0.48 | 0.00 |  |
| 22 | Yone | +0.47 | 0.64 | 0.17 |  |
| 23 | Hwei | +0.47 | 0.47 | 0.00 |  |
| 24 | Samira | +0.47 | 0.47 | 0.00 |  |
| 25 | Mel | +0.46 | 0.46 | 0.00 |  |
| 26 | Zaahen | +0.45 | 0.67 | 0.22 |  |
| 27 | Heimerdinger | +0.45 | 0.45 | 0.00 |  |
| 28 | Kayle | +0.45 | 0.45 | 0.00 |  |
| 29 | Ahri | +0.43 | 0.43 | 0.00 |  |
| 30 | Anivia | +0.41 | 0.41 | 0.00 |  |
| 31 | Veigar | +0.41 | 0.41 | 0.00 |  |
| 32 | Kled | +0.39 | 0.52 | 0.13 |  |
| 33 | Kalista | +0.38 | 0.38 | 0.00 |  |
| 34 | Jinx | +0.37 | 0.37 | 0.00 |  |
| 35 | Gnar | +0.36 | 0.36 | 0.00 |  |
| 36 | Camille | +0.35 | 0.54 | 0.19 |  |
| 37 | Thresh | +0.34 | 0.39 | 0.05 |  |
| 38 | Nami | +0.34 | 0.34 | 0.00 |  |
| 39 | Alistar | +0.33 | 0.71 | 0.38 |  |
| 40 | Aurora | +0.33 | 0.33 | 0.00 |  |
| 41 | Renata Glasc | +0.31 | 0.31 | 0.00 |  |
| 42 | Seraphine | +0.31 | 0.31 | 0.00 |  |
| 43 | Milio | +0.30 | 0.30 | 0.00 |  |
| 44 | Tristana | +0.30 | 0.30 | 0.00 |  |
| 45 | Sejuani | +0.29 | 0.65 | 0.36 |  |
| 46 | Xin Zhao | +0.29 | 0.63 | 0.34 |  |
| 47 | Fiora | +0.25 | 0.61 | 0.36 |  |
| 48 | Aurelion Sol | +0.24 | 0.33 | 0.09 |  |
| 49 | Annie | +0.24 | 0.24 | 0.00 |  |
| 50 | Evelynn | +0.23 | 0.49 | 0.26 |  |
| 51 | Brand | +0.23 | 0.23 | 0.00 |  |
| 52 | Shaco | +0.22 | 0.48 | 0.26 |  |
| 53 | Ornn | +0.22 | 0.44 | 0.22 |  |
| 54 | Ashe | +0.21 | 0.21 | 0.00 |  |
| 55 | Nilah | +0.20 | 0.49 | 0.29 |  |
| 56 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 57 | Rakan | +0.19 | 0.33 | 0.14 |  |
| 58 | Elise | +0.19 | 0.19 | 0.00 |  |
| 59 | Jayce | +0.19 | 0.19 | 0.00 |  |
| 60 | Kennen | +0.19 | 0.19 | 0.00 |  |
| 61 | Swain | +0.19 | 0.19 | 0.00 |  |
| 62 | Draven | +0.18 | 0.18 | 0.00 |  |
| 63 | Vayne | +0.18 | 0.18 | 0.00 |  |
| 64 | Ziggs | +0.18 | 0.18 | 0.00 |  |
| 65 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 66 | Syndra | +0.17 | 0.17 | 0.00 |  |
| 67 | Zoe | +0.17 | 0.17 | 0.00 |  |
| 68 | Yuumi | +0.16 | 0.68 | 0.52 |  |
| 69 | Urgot | +0.14 | 0.31 | 0.17 |  |
| 70 | Azir | +0.14 | 0.14 | 0.00 |  |
| 71 | Neeko | +0.14 | 0.14 | 0.00 |  |
| 72 | Orianna | +0.14 | 0.14 | 0.00 |  |
| 73 | Sona | +0.14 | 0.14 | 0.00 |  |
| 74 | Zyra | +0.14 | 0.14 | 0.00 |  |
| 75 | Jax | +0.13 | 0.51 | 0.38 | attack dodge (Counter Strike) |
| 76 | Riven | +0.13 | 0.39 | 0.26 |  |
| 77 | Rammus | +0.11 | 0.79 | 0.68 |  |
| 78 | Poppy | +0.10 | 0.68 | 0.58 | dash stop (Steadfast Presence) |
| 79 | Gwen | +0.10 | 0.46 | 0.36 |  |
| 80 | Aphelios | +0.09 | 0.09 | 0.00 |  |
| 81 | Amumu | +0.06 | 0.44 | 0.38 |  |
| 82 | Malphite | +0.06 | 0.44 | 0.38 |  |
| 83 | Senna | +0.06 | 0.06 | 0.00 |  |
| 84 | Zed | +0.05 | 0.31 | 0.26 |  |
| 85 | Volibear | +0.04 | 0.28 | 0.24 |  |
| 86 | Zac | +0.03 | 0.87 | 0.84 | dash stop (Stretching Strikes) |
| 87 | Master Yi | +0.03 | 0.60 | 0.57 |  |
| 88 | Taliyah | +0.02 | 0.50 | 0.48 |  |
| 89 | Jarvan IV | +0.02 | 0.19 | 0.17 |  |
| 90 | Sylas | +0.02 | 0.19 | 0.17 |  |
| 91 | Leona | +0.01 | 0.39 | 0.38 |  |
| 92 | Sett | 0.00 | 0.38 | 0.38 |  |
| 93 | Corki | 0.00 | 0.00 | 0.00 |  |
| 94 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 95 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 96 | Karma | 0.00 | 0.00 | 0.00 |  |
| 97 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 98 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 99 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 100 | Lux | 0.00 | 0.00 | 0.00 |  |
| 101 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 102 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 103 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 104 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 105 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 106 | Viego | -0.02 | 0.39 | 0.41 |  |
| 107 | Hecarim | -0.03 | 0.19 | 0.22 |  |
| 108 | Pyke | -0.04 | 0.38 | 0.42 |  |
| 109 | Bel'Veth | -0.04 | 0.20 | 0.24 |  |
| 110 | Briar | -0.05 | 0.14 | 0.19 |  |
| 111 | Lillia | -0.05 | 0.14 | 0.19 |  |
| 112 | Fiddlesticks | -0.06 | 0.41 | 0.47 |  |
| 113 | Graves | -0.06 | 0.00 | 0.06 |  |
| 114 | Wukong | -0.08 | 0.14 | 0.22 |  |
| 115 | Sion | -0.09 | 0.73 | 0.82 |  |
| 116 | Janna | -0.09 | 0.31 | 0.40 |  |
| 117 | Vel'Koz | -0.09 | 0.19 | 0.28 |  |
| 118 | Aatrox | -0.11 | 0.23 | 0.34 |  |
| 119 | Qiyana | -0.11 | 0.13 | 0.24 |  |
| 120 | Varus | -0.11 | 0.00 | 0.11 |  |
| 121 | Shyvana | -0.12 | 0.24 | 0.36 |  |
| 122 | Twisted Fate | -0.12 | 0.23 | 0.35 |  |
| 123 | Irelia | -0.12 | 0.19 | 0.31 |  |
| 124 | Ambessa | -0.12 | 0.14 | 0.26 |  |
| 125 | Lee Sin | -0.12 | 0.14 | 0.26 |  |
| 126 | Rengar | -0.13 | 0.64 | 0.77 |  |
| 127 | Shen | -0.13 | 0.58 | 0.71 |  |
| 128 | Singed | -0.15 | 0.62 | 0.77 | grounding (Mega Adhesive) |
| 129 | Kassadin | -0.15 | 0.21 | 0.36 |  |
| 130 | Xerath | -0.15 | 0.18 | 0.33 |  |
| 131 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 132 | Kayn | -0.16 | 0.51 | 0.67 |  |
| 133 | Caitlyn | -0.17 | 0.11 | 0.28 |  |
| 134 | Renekton | -0.18 | 0.20 | 0.38 |  |
| 135 | Blitzcrank | -0.19 | 0.58 | 0.77 |  |
| 136 | Pantheon | -0.19 | 0.54 | 0.73 |  |
| 137 | Nautilus | -0.20 | 0.14 | 0.34 |  |
| 138 | Gangplank | -0.22 | 0.55 | 0.77 |  |
| 139 | Diana | -0.22 | 0.14 | 0.36 |  |
| 140 | Gragas | -0.23 | 0.32 | 0.55 |  |
| 141 | Tahm Kench | -0.26 | 0.58 | 0.84 |  |
| 142 | Akali | -0.26 | 0.00 | 0.26 |  |
| 143 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 144 | Talon | -0.26 | 0.00 | 0.26 |  |
| 145 | Vi | -0.27 | 0.42 | 0.69 |  |
| 146 | Warwick | -0.28 | 0.65 | 0.93 |  |
| 147 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 148 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 149 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 150 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 151 | Illaoi | -0.29 | 0.09 | 0.38 |  |
| 152 | Galio | -0.32 | 0.51 | 0.83 |  |
| 153 | Garen | -0.32 | 0.35 | 0.67 |  |
| 154 | Cho'Gath | -0.34 | 0.43 | 0.77 |  |
| 155 | Tryndamere | -0.34 | 0.00 | 0.34 |  |
| 156 | Olaf | -0.35 | 0.42 | 0.77 |  |
| 157 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 158 | Nasus | -0.38 | 0.39 | 0.77 |  |
| 159 | Mordekaiser | -0.38 | 0.29 | 0.67 |  |
| 160 | Kha'Zix | -0.38 | 0.00 | 0.38 |  |
| 161 | Locke | -0.38 | 0.00 | 0.38 |  |
| 162 | Karthus | -0.42 | 0.00 | 0.42 |  |
| 163 | Skarner | -0.48 | 0.24 | 0.72 |  |
| 164 | Yorick | -0.49 | 0.18 | 0.67 |  |
| 165 | Darius | -0.50 | 0.17 | 0.67 |  |
| 166 | Trundle | -0.50 | 0.17 | 0.67 |  |
| 167 | Taric | -0.54 | 0.18 | 0.72 |  |
| 168 | Naafiri | -0.64 | 0.00 | 0.64 |  |
| 169 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 170 | Dr. Mundo | -0.77 | 0.00 | 0.77 |  |
| 171 | Rumble | -0.77 | 0.00 | 0.77 |  |
| 172 | Nunu & Willump | -0.96 | 0.30 | 1.26 |  |
