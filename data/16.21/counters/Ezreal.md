# Counters to Ezreal (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Ezreal: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ezreal wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ezreal --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +1.00 |
| 2 | Shyvana | +0.84 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.72 |
| 3 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.95 |
| 4 | Camille | +0.83 | +1.00 | +0.96 | +1.00 | −0.04 | +1.00 | +0.93 |
| 5 | Tristana | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.07 |
| 6 | Jayce | +0.83 | +1.00 | +1.00 | +0.98 | +0.06 | +0.99 | +0.41 |
| 7 | Kled | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.53 |
| 8 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.49 |
| 9 | Tryndamere | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.53 |
| 10 | Poppy | +0.81 | +1.00 | +0.98 | +1.00 | +0.00 | +1.00 | +0.34 |
| 11 | Volibear | +0.81 | +1.00 | +0.90 | +1.00 | +0.05 | +1.00 | +0.54 |
| 12 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.03 |
| 13 | Dr. Mundo | +0.81 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.23 |
| 14 | Zeri | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.04 |
| 15 | Ashe | +0.80 | +0.99 | +0.99 | +1.00 | +0.04 | – | +0.41 |
| 16 | Caitlyn | +0.80 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | −0.09 |
| 17 | Tahm Kench | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +0.96 | +0.21 |
| 18 | Neeko | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | −0.00 |
| 19 | Lucian | +0.80 | +0.99 | +1.00 | +1.00 | +0.01 | – | +0.44 |
| 20 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.07 |
| 21 | Yorick | +0.80 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.12 |
| 22 | Trundle | +0.80 | +1.00 | +0.95 | +1.00 | −0.14 | +1.00 | +0.59 |
| 23 | Teemo | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.26 |
| 24 | Vayne | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.41 |
| 25 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.11 |
| 26 | Olaf | +0.79 | +1.00 | +0.99 | +1.00 | −0.08 | +1.00 | +0.14 |
| 27 | Yasuo | +0.79 | +1.00 | +0.88 | +1.00 | −0.01 | +1.00 | +0.46 |
| 28 | Kog'Maw | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.18 |
| 29 | Ziggs | +0.79 | +1.00 | +1.00 | +0.94 | +0.12 | – | +0.08 |
| 30 | Sivir | +0.79 | +1.00 | +0.99 | +1.00 | +0.01 | – | +0.26 |
| 31 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | −0.04 |
| 32 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.01 |
| 33 | Xayah | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.01 |
| 34 | Twitch | +0.78 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.05 |
| 35 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 36 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 37 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | −0.05 |
| 38 | Aphelios | +0.78 | +1.00 | +0.99 | +1.00 | +0.02 | – | +0.01 |
| 39 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.00 |
| 40 | Samira | +0.78 | +1.00 | +0.98 | +1.00 | +0.02 | – | +0.04 |
| 41 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.03 |
| 42 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 43 | Ivern | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.06 |
| 44 | Miss Fortune | +0.78 | +1.00 | +1.00 | +0.92 | +0.05 | – | +0.12 |
| 45 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.03 |
| 46 | Aurora | +0.77 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.12 |
| 47 | Gwen | +0.77 | +0.92 | +0.92 | +1.00 | −0.15 | +1.00 | +0.66 |
| 48 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.20 |
| 49 | Quinn | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.31 |
| 50 | Renekton | +0.76 | +0.90 | +0.90 | +1.00 | −0.04 | +0.92 | +0.51 |
| 51 | K'Sante | +0.73 | +1.00 | +1.00 | +1.00 | −0.03 | +0.33 | −0.02 |
| 52 | Milio | +0.72 | +0.99 | +0.86 | +0.94 | +0.00 | – | −0.02 |
| 53 | Zac | +0.72 | +0.97 | +0.97 | +1.00 | −0.05 | +0.38 | +0.06 |
| 54 | Zoe | +0.72 | +1.00 | +1.00 | +0.58 | −0.00 | +1.00 | −0.01 |
| 55 | Cassiopeia | +0.70 | +0.72 | +1.00 | +1.00 | +0.04 | – | −0.08 |
| 56 | Draven | +0.69 | +0.91 | +0.98 | +0.72 | +0.00 | – | +0.07 |
| 57 | Kennen | +0.69 | +1.00 | +0.99 | +0.54 | +0.09 | – | +0.01 |
| 58 | Kalista | +0.69 | +0.68 | +0.98 | +1.00 | +0.02 | – | +0.01 |
| 59 | Varus | +0.68 | +1.00 | +1.00 | +0.58 | +0.00 | – | −0.06 |
| 60 | Jax | +0.66 | +1.00 | +1.00 | +1.00 | −0.09 | −0.39 | +0.18 |
| 61 | Hwei | +0.65 | +0.76 | +0.78 | +1.00 | +0.02 | – | +0.01 |
| 62 | Zilean | +0.63 | +0.79 | +0.86 | +0.78 | −0.00 | – | −0.00 |
| 63 | Gangplank | +0.61 | +1.00 | +1.00 | +0.30 | +0.15 | +0.22 | +0.10 |
| 64 | Xin Zhao | +0.60 | +1.00 | +1.00 | +0.92 | −0.06 | −0.76 | −0.02 |
| 65 | Swain | +0.59 | +0.83 | +0.59 | +0.88 | +0.02 | – | −0.07 |
| 66 | Mordekaiser | +0.52 | +0.00 | +0.86 | +0.92 | −0.02 | +1.00 | +0.51 |
| 67 | Ryze | +0.51 | +0.73 | +0.92 | +0.13 | +0.05 | +0.67 | −0.07 |
| 68 | Darius | +0.50 | +1.00 | +0.01 | +1.00 | −0.07 | +0.55 | +0.03 |
| 69 | Udyr | +0.43 | +0.86 | +0.97 | −0.47 | −0.06 | +0.45 | +0.67 |
| 70 | Graves | +0.42 | +1.00 | +1.00 | −0.77 | +0.24 | +0.32 | +0.05 |
| 71 | Aatrox | +0.40 | +0.25 | +0.57 | +0.77 | −0.03 | +0.44 | +0.00 |
| 72 | Akshan | +0.38 | +0.89 | +0.89 | −0.55 | +0.01 | – | +0.13 |
| 73 | Gnar | +0.38 | +0.79 | +0.65 | +0.11 | +0.01 | +0.00 | +0.00 |
| 74 | Rengar | +0.38 | +0.98 | +0.93 | −0.22 | −0.03 | −0.82 | +0.65 |
| 75 | Anivia | +0.32 | +0.47 | +0.38 | +0.44 | −0.07 | – | −0.04 |
| 76 | Sion | +0.31 | +0.52 | +0.34 | +0.04 | −0.05 | +0.99 | −0.09 |
| 77 | Fizz | +0.31 | +0.76 | −0.49 | +1.00 | −0.05 | +0.10 | +0.73 |
| 78 | Sylas | +0.28 | +1.00 | +1.00 | −1.00 | +0.01 | −0.37 | +0.32 |
| 79 | Annie | +0.25 | +0.28 | +0.30 | +0.38 | +0.02 | – | +0.10 |
| 80 | Cho'Gath | +0.20 | +0.32 | −0.22 | +1.00 | −0.09 | −0.06 | −0.04 |
| 81 | Vel'Koz | +0.19 | −0.14 | −0.14 | +0.66 | +0.15 | +0.97 | +0.08 |
| 82 | Karma | +0.15 | +0.78 | +0.04 | −0.35 | −0.01 | – | +0.00 |
| 83 | Sona | +0.14 | +0.16 | +0.47 | −0.18 | +0.01 | – | +0.03 |
| 84 | Mel | +0.10 | −0.54 | +0.46 | +0.52 | +0.05 | – | +0.00 |
| 85 | Pantheon | +0.10 | −0.26 | +0.93 | +0.00 | −0.01 | −0.68 | +0.00 |
| 86 | Nocturne | +0.06 | +0.00 | −0.87 | +1.00 | −0.03 | +0.43 | +0.79 |
| 87 | Janna | −0.01 | +0.15 | +0.19 | −0.47 | +0.01 | – | +0.00 |
| 88 | Illaoi | −0.04 | −0.27 | +0.05 | +0.46 | −0.04 | −0.76 | +0.04 |
| 89 | Riven | −0.05 | −0.05 | −0.84 | +1.00 | −0.01 | −0.50 | +0.54 |
| 90 | Lux | −0.05 | +0.16 | +0.16 | −0.62 | +0.00 | – | −0.01 |
| 91 | Heimerdinger | −0.07 | −0.16 | −0.49 | +0.49 | +0.06 | −0.18 | +0.00 |
| 92 | Diana | −0.08 | −0.58 | +1.00 | −0.58 | +0.15 | −0.98 | +0.13 |
| 93 | Viego | −0.10 | +0.24 | −0.35 | −0.30 | +0.01 | −0.30 | +0.28 |
| 94 | Vi | −0.14 | −0.60 | +0.89 | −0.49 | −0.03 | −0.99 | −0.18 |
| 95 | Shaco | −0.15 | −0.96 | +0.87 | −0.98 | −0.08 | +0.80 | +0.01 |
| 96 | Irelia | −0.19 | −0.97 | +0.78 | −0.24 | −0.01 | −1.00 | +0.18 |
| 97 | Yone | −0.20 | +0.02 | +0.24 | −0.93 | −0.04 | −0.94 | +0.46 |
| 98 | Garen | −0.22 | −0.76 | −1.00 | +0.85 | −0.04 | +0.51 | +0.05 |
| 99 | Ambessa | −0.22 | −0.98 | +1.00 | −0.96 | +0.05 | −0.77 | +0.65 |
| 100 | Fiddlesticks | −0.27 | −0.99 | +0.83 | −0.96 | −0.06 | – | −0.05 |
| 101 | Aurelion Sol | −0.28 | −0.27 | −0.08 | −0.89 | +0.07 | −0.22 | −0.02 |
| 102 | Brand | −0.29 | −0.32 | −0.12 | −0.72 | +0.01 | −0.34 | −0.03 |
| 103 | Syndra | −0.30 | −0.91 | +0.11 | −0.46 | +0.06 | – | +0.31 |
| 104 | Briar | −0.30 | −0.95 | −0.95 | +1.00 | −0.12 | −0.21 | +0.26 |
| 105 | Sett | −0.33 | −0.62 | −1.00 | +0.82 | +0.01 | −0.99 | +0.10 |
| 106 | Skarner | −0.38 | −1.00 | −1.00 | +1.00 | +0.11 | −1.00 | +0.13 |
| 107 | Bard | −0.39 | −0.88 | −0.56 | +0.13 | −0.07 | – | −0.10 |
| 108 | Braum | −0.40 | −1.00 | −1.00 | +0.99 | −0.01 | −1.00 | −0.01 |
| 109 | Urgot | −0.41 | −1.00 | −1.00 | +1.00 | −0.11 | −1.00 | +0.10 |
| 110 | Rumble | −0.43 | −0.31 | −0.31 | −0.90 | −0.11 | −1.00 | +0.38 |
| 111 | Maokai | −0.46 | −0.81 | −0.55 | −0.66 | +0.01 | +0.03 | +0.19 |
| 112 | Bel'Veth | −0.48 | −0.81 | −0.74 | −0.05 | +0.02 | −0.84 | −0.06 |
| 113 | Rammus | −0.50 | −0.72 | −0.54 | −0.61 | +0.02 | −0.96 | +0.58 |
| 114 | Wukong | −0.50 | −0.92 | −0.58 | −0.37 | −0.11 | −0.63 | +0.50 |
| 115 | Kayn | −0.51 | −0.02 | −0.81 | −0.95 | −0.09 | −0.92 | −0.10 |
| 116 | Lillia | −0.54 | −0.97 | −0.97 | −0.73 | +0.05 | +0.69 | +0.27 |
| 117 | Renata Glasc | −0.55 | −0.62 | −0.62 | −0.96 | +0.05 | – | +0.00 |
| 118 | Taric | −0.55 | −0.39 | −0.94 | −0.61 | +0.01 | −1.00 | +0.02 |
| 119 | Zed | −0.58 | −0.68 | −0.98 | −0.47 | −0.05 | −0.95 | +0.69 |
| 120 | Sejuani | −0.58 | −0.98 | −0.22 | −0.97 | −0.02 | −1.00 | +0.34 |
| 121 | Akali | −0.60 | −1.00 | −1.00 | −0.01 | −0.01 | −1.00 | −0.01 |
| 122 | Vex | −0.61 | −1.00 | −1.00 | −0.24 | +0.00 | – | −0.02 |
| 123 | Karthus | −0.62 | −0.86 | −0.40 | −0.98 | −0.01 | −1.00 | −0.02 |
| 124 | Gragas | −0.62 | −0.70 | −0.70 | −0.94 | −0.01 | −1.00 | +0.43 |
| 125 | Lee Sin | −0.62 | −1.00 | −0.97 | −0.38 | −0.07 | −0.68 | +0.48 |
| 126 | Nami | −0.63 | −0.75 | −0.75 | −1.00 | +0.03 | – | +0.00 |
| 127 | Kassadin | −0.63 | −0.95 | −0.75 | −0.82 | −0.04 | −0.58 | +0.40 |
| 128 | Rakan | −0.64 | −1.00 | −1.00 | −0.21 | +0.02 | −0.98 | +0.04 |
| 129 | Senna | −0.66 | −0.82 | −0.82 | −1.00 | +0.06 | – | +0.09 |
| 130 | Xerath | −0.67 | −0.70 | −0.96 | −0.90 | +0.04 | −0.75 | −0.04 |
| 131 | Kindred | −0.68 | −0.73 | −0.91 | −0.99 | −0.06 | – | +0.16 |
| 132 | Malphite | −0.71 | −1.00 | −1.00 | −0.64 | −0.03 | −0.99 | +0.46 |
| 133 | Jarvan IV | −0.72 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | +0.84 |
| 134 | Elise | −0.72 | −0.99 | −0.80 | −1.00 | −0.00 | – | +0.00 |
| 135 | Malzahar | −0.73 | −0.84 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 136 | Nidalee | −0.73 | −0.97 | −0.97 | −0.88 | −0.00 | – | −0.04 |
| 137 | Warwick | −0.74 | −1.00 | −0.97 | −0.86 | −0.02 | −0.96 | +0.54 |
| 138 | Ahri | −0.75 | −1.00 | −1.00 | −0.95 | +0.02 | – | +0.27 |
| 139 | Rell | −0.76 | −0.91 | −1.00 | −1.00 | +0.04 | −1.00 | +0.18 |
| 140 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.49 |
| 141 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.25 | −1.00 | −0.01 |
| 142 | Galio | −0.77 | −1.00 | −0.97 | −0.89 | −0.00 | −1.00 | +0.07 |
| 143 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.05 |
| 144 | Shen | −0.77 | −1.00 | −1.00 | −0.93 | +0.02 | −1.00 | +0.21 |
| 145 | Hecarim | −0.77 | −0.97 | −1.00 | −1.00 | +0.07 | −1.00 | +0.21 |
| 146 | Viktor | −0.77 | −1.00 | −0.99 | −1.00 | +0.01 | – | −0.06 |
| 147 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.06 |
| 148 | Zyra | −0.78 | −1.00 | −0.93 | −1.00 | +0.01 | −1.00 | +0.03 |
| 149 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.33 |
| 150 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.07 |
| 151 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.57 |
| 152 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.45 |
| 153 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.06 |
| 154 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −0.87 | −0.02 |
| 155 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.13 |
| 156 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.13 |
| 157 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.18 |
| 158 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.21 |
| 159 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.11 |
| 160 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.14 |
| 161 | Morgana | −0.80 | −1.00 | −1.00 | −0.96 | −0.02 | −1.00 | −0.03 |
| 162 | Singed | −0.80 | −0.98 | −1.00 | −0.97 | −0.07 | −1.00 | +0.04 |
| 163 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.22 |
| 164 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.20 |
| 165 | Rek'Sai | −0.80 | −1.00 | −1.00 | −0.99 | −0.02 | −0.99 | +0.03 |
| 166 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.11 |
| 167 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.02 |
| 168 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.05 |
| 169 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −0.96 | +0.07 |
| 170 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.04 |
| 171 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.06 |
| 172 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ezreal's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ezreal's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ezreal` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Samira (net +0.90)

- **0.55** projectile block: Blade Whirl blocks Ezreal's Trueshot Barrage, a projectile. Blade Whirl for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Samira W Blade Whirl → Ezreal R Trueshot Barrage)
- **0.47** projectile block: Blade Whirl blocks Ezreal's Arcane Shift, a projectile. Blade Whirl for 0.75 s; Arcane Shift takes 0.49 s to land, enough to react. (Samira W Blade Whirl → Ezreal E Arcane Shift)
- **0.28** projectile block: Blade Whirl blocks Ezreal's Essence Flux, a projectile. Blade Whirl for 0.75 s; Essence Flux takes 0.96 s to land, enough to react. (Samira W Blade Whirl → Ezreal W Essence Flux)

#### 2. Mel (net +0.88)

- **0.55** projectile block: Rebuttal blocks Ezreal's Trueshot Barrage, a projectile. Rebuttal for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Mel W Rebuttal → Ezreal R Trueshot Barrage)
- **0.43** projectile block: Rebuttal blocks Ezreal's Arcane Shift, a projectile. Rebuttal for 0.75 s; Arcane Shift takes 0.49 s to land, enough to react. (Mel W Rebuttal → Ezreal E Arcane Shift)
- **0.27** projectile block: Rebuttal blocks Ezreal's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Ezreal basic attacks)

#### 3. Yasuo (net +0.76)

- **0.55** projectile block: Wind Wall blocks Ezreal's Trueshot Barrage, a projectile. Wind Wall for 4 s, long enough to use ahead of Trueshot Barrage. (Yasuo W Wind Wall → Ezreal R Trueshot Barrage)
- **0.54** projectile block: Wind Wall blocks Ezreal's Arcane Shift, a projectile. Wind Wall for 4 s, long enough to use ahead of Arcane Shift. (Yasuo W Wind Wall → Ezreal E Arcane Shift)
- **0.35** projectile block: Wind Wall blocks Ezreal's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ezreal basic attacks)
- Watch out: Ezreal's basic attacks reach 375 units farther than Yasuo's (550 vs 175 attack range).

#### 4. Braum (net +0.74)

- **0.60** projectile block: Unbreakable blocks Ezreal's Arcane Shift, a projectile. Unbreakable for 4 s, long enough to use ahead of Arcane Shift. (Braum E Unbreakable → Ezreal E Arcane Shift)
- **0.55** projectile block: Unbreakable blocks Ezreal's Trueshot Barrage, a projectile. Unbreakable for 4 s, long enough to use ahead of Trueshot Barrage. (Braum E Unbreakable → Ezreal R Trueshot Barrage)
- **0.45** projectile block: Unbreakable blocks Ezreal's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ezreal basic attacks)
- Watch out: Ezreal's basic attacks reach 425 units farther than Braum's (550 vs 125 attack range).

#### 5. Kayle (net +0.73)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Ezreal's Trueshot Barrage. Invulnerable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Kayle R Divine Judgment → Ezreal R Trueshot Barrage)
- **0.21** invulnerable: Divine Judgment makes Kayle invulnerable to Ezreal's Essence Flux. Invulnerable for 2.5 s, long enough to use ahead of Essence Flux. (Kayle R Divine Judgment → Ezreal W Essence Flux)
- **0.07** range: Kayle's basic attacks reach 75 units farther than Ezreal's (625 vs 550 attack range). Ezreal closes the gap with Arcane Shift. (Kayle basic attacks → Ezreal basic attacks)

#### 6. Yuumi (net +0.68)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for ?; Trueshot Barrage takes 1 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ezreal R Trueshot Barrage)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Ezreal's Essence Flux. Untargetable for ?; Essence Flux takes 0.96 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Ezreal W Essence Flux)
- Watch out: Ezreal's basic attacks reach 125 units farther than Yuumi's (550 vs 425 attack range).

#### 7. Bard (net +0.66)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Bard R Tempered Fate → Ezreal R Trueshot Barrage)
- **0.21** untargetable: Tempered Fate makes Bard untargetable, dodging Ezreal's Essence Flux. Untargetable for 2.5 s, long enough to use ahead of Essence Flux. (Bard R Tempered Fate → Ezreal W Essence Flux)

#### 8. Lissandra (net +0.66)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 2.5 s, long enough to use ahead of Trueshot Barrage. (Lissandra R Frozen Tomb → Ezreal R Trueshot Barrage)
- **0.21** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ezreal's Essence Flux. Untargetable for 2.5 s, long enough to use ahead of Essence Flux. (Lissandra R Frozen Tomb → Ezreal W Essence Flux)

#### 9. Fizz (net +0.63)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Ezreal's Trueshot Barrage. Untargetable for 0.75 s; Trueshot Barrage takes 1 s to land, enough to react. (Fizz E Playful → Ezreal R Trueshot Barrage)
- **0.45** untargetable: Playful makes Fizz untargetable, dodging Ezreal's Essence Flux. Untargetable for 0.75 s; Essence Flux takes 0.96 s to land, enough to react. (Fizz E Playful → Ezreal W Essence Flux)
- Watch out: Ezreal's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 10. Sivir (net +0.63)

- **0.55** spell shield: Spell Shield's spell shield blocks Ezreal's Trueshot Barrage. Spell shield for 1.5 s, long enough to use ahead of Trueshot Barrage. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ezreal R Trueshot Barrage)
- **0.15** spell shield: Spell Shield's spell shield blocks part of Ezreal's Essence Flux. Spell shield for 1.5 s, long enough to use ahead of Essence Flux. A spell shield blocks only the first enemy ability that reaches it. Spell shield prevents the mark from being triggered by an ability. If the mark is triggered by a basic attack, spell shield will prevent Essence Flux's damage. (Sivir E Spell Shield → Ezreal W Essence Flux)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Samira | +0.90 | 0.90 | 0.00 | projectile block (Blade Whirl), projectile block (Blade Whirl) |
| 2 | Mel | +0.88 | 0.88 | 0.00 | projectile block (Rebuttal), projectile block (Rebuttal) |
| 3 | Yasuo | +0.76 | 0.96 | 0.20 | projectile block (Wind Wall), projectile block (Wind Wall) |
| 4 | Braum | +0.74 | 1.06 | 0.32 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Kayle | +0.73 | 0.73 | 0.00 |  |
| 6 | Yuumi | +0.68 | 0.78 | 0.10 |  |
| 7 | Bard | +0.66 | 0.66 | 0.00 |  |
| 8 | Lissandra | +0.66 | 0.66 | 0.00 |  |
| 9 | Fizz | +0.63 | 0.78 | 0.15 |  |
| 10 | Sivir | +0.63 | 0.63 | 0.00 |  |
| 11 | Aurora | +0.62 | 0.62 | 0.00 |  |
| 12 | Xayah | +0.62 | 0.62 | 0.00 |  |
| 13 | Vladimir | +0.55 | 0.71 | 0.16 |  |
| 14 | Teemo | +0.51 | 0.51 | 0.00 | blind (Blinding Dart) |
| 15 | Pantheon | +0.50 | 0.70 | 0.20 |  |
| 16 | Camille | +0.49 | 0.65 | 0.16 |  |
| 17 | Kayn | +0.46 | 0.66 | 0.20 |  |
| 18 | Rek'Sai | +0.46 | 0.66 | 0.20 |  |
| 19 | Evelynn | +0.44 | 0.66 | 0.22 |  |
| 20 | Shaco | +0.44 | 0.66 | 0.22 |  |
| 21 | Maokai | +0.43 | 0.75 | 0.32 |  |
| 22 | Fiora | +0.41 | 0.73 | 0.32 |  |
| 23 | Master Yi | +0.40 | 0.70 | 0.30 |  |
| 24 | Zed | +0.40 | 0.62 | 0.22 |  |
| 25 | Gwen | +0.38 | 0.70 | 0.32 |  |
| 26 | Nocturne | +0.32 | 0.64 | 0.32 |  |
| 27 | Xin Zhao | +0.32 | 0.62 | 0.30 |  |
| 28 | Shen | +0.31 | 0.53 | 0.22 |  |
| 29 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 30 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 31 | Jax | +0.24 | 0.56 | 0.32 |  |
| 32 | Nilah | +0.19 | 0.45 | 0.26 |  |
| 33 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 34 | Caitlyn | +0.09 | 0.09 | 0.00 |  |
| 35 | Annie | +0.04 | 0.04 | 0.00 |  |
| 36 | Rammus | 0.00 | 0.32 | 0.32 |  |
| 37 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 38 | Akshan | 0.00 | 0.00 | 0.00 |  |
| 39 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 40 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 41 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 42 | Aurelion Sol | 0.00 | 0.00 | 0.00 |  |
| 43 | Azir | 0.00 | 0.00 | 0.00 |  |
| 44 | Brand | 0.00 | 0.00 | 0.00 |  |
| 45 | Corki | 0.00 | 0.00 | 0.00 |  |
| 46 | Draven | 0.00 | 0.00 | 0.00 |  |
| 47 | Elise | 0.00 | 0.00 | 0.00 |  |
| 48 | Fiddlesticks | 0.00 | 0.00 | 0.00 |  |
| 49 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 50 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 51 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 52 | Janna | 0.00 | 0.00 | 0.00 |  |
| 53 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 54 | Jhin | 0.00 | 0.00 | 0.00 |  |
| 55 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 56 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 57 | Kalista | 0.00 | 0.00 | 0.00 |  |
| 58 | Karma | 0.00 | 0.00 | 0.00 |  |
| 59 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 60 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 61 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 62 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 63 | Lucian | 0.00 | 0.00 | 0.00 |  |
| 64 | Lux | 0.00 | 0.00 | 0.00 |  |
| 65 | Malzahar | 0.00 | 0.00 | 0.00 |  |
| 66 | Milio | 0.00 | 0.00 | 0.00 |  |
| 67 | Miss Fortune | 0.00 | 0.00 | 0.00 |  |
| 68 | Nami | 0.00 | 0.00 | 0.00 |  |
| 69 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 70 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 71 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 72 | Quinn | 0.00 | 0.00 | 0.00 |  |
| 73 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 74 | Ryze | 0.00 | 0.00 | 0.00 |  |
| 75 | Senna | 0.00 | 0.00 | 0.00 |  |
| 76 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 77 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 78 | Sona | 0.00 | 0.00 | 0.00 |  |
| 79 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 80 | Swain | 0.00 | 0.00 | 0.00 |  |
| 81 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 82 | Taliyah | 0.00 | 0.00 | 0.00 |  |
| 83 | Twisted Fate | 0.00 | 0.00 | 0.00 |  |
| 84 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 85 | Varus | 0.00 | 0.00 | 0.00 |  |
| 86 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 87 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 88 | Vel'Koz | 0.00 | 0.00 | 0.00 |  |
| 89 | Vex | 0.00 | 0.00 | 0.00 |  |
| 90 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 91 | Xerath | 0.00 | 0.00 | 0.00 |  |
| 92 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 93 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 94 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 95 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 96 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 97 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 98 | Thresh | -0.05 | 0.00 | 0.05 |  |
| 99 | Ivern | -0.06 | 0.00 | 0.06 |  |
| 100 | Graves | -0.07 | 0.00 | 0.07 |  |
| 101 | Malphite | -0.11 | 0.21 | 0.32 |  |
| 102 | Kled | -0.12 | 0.00 | 0.12 |  |
| 103 | Rakan | -0.14 | 0.00 | 0.14 |  |
| 104 | Viego | -0.14 | 0.00 | 0.14 |  |
| 105 | Jarvan IV | -0.15 | 0.00 | 0.15 |  |
| 106 | Sylas | -0.15 | 0.00 | 0.15 |  |
| 107 | Yone | -0.15 | 0.00 | 0.15 |  |
| 108 | Briar | -0.16 | 0.00 | 0.16 |  |
| 109 | Karthus | -0.16 | 0.00 | 0.16 |  |
| 110 | K'Sante | -0.16 | 0.00 | 0.16 |  |
| 111 | Morgana | -0.16 | 0.00 | 0.16 |  |
| 112 | Naafiri | -0.16 | 0.00 | 0.16 |  |
| 113 | Urgot | -0.16 | 0.00 | 0.16 |  |
| 114 | Lillia | -0.18 | 0.00 | 0.18 |  |
| 115 | Hecarim | -0.20 | 0.00 | 0.20 |  |
| 116 | Wukong | -0.20 | 0.00 | 0.20 |  |
| 117 | Ornn | -0.20 | 0.00 | 0.20 |  |
| 118 | Rell | -0.20 | 0.00 | 0.20 |  |
| 119 | Zaahen | -0.20 | 0.00 | 0.20 |  |
| 120 | Akali | -0.22 | 0.00 | 0.22 |  |
| 121 | Ambessa | -0.22 | 0.00 | 0.22 |  |
| 122 | Bel'Veth | -0.22 | 0.00 | 0.22 |  |
| 123 | Ekko | -0.22 | 0.00 | 0.22 |  |
| 124 | Galio | -0.22 | 0.00 | 0.22 |  |
| 125 | Lee Sin | -0.22 | 0.00 | 0.22 |  |
| 126 | Pyke | -0.22 | 0.00 | 0.22 |  |
| 127 | Qiyana | -0.22 | 0.00 | 0.22 |  |
| 128 | Riven | -0.22 | 0.00 | 0.22 |  |
| 129 | Talon | -0.22 | 0.00 | 0.22 |  |
| 130 | Vi | -0.22 | 0.00 | 0.22 |  |
| 131 | Volibear | -0.22 | 0.00 | 0.22 |  |
| 132 | Warwick | -0.22 | 0.00 | 0.22 |  |
| 133 | Irelia | -0.28 | 0.00 | 0.28 |  |
| 134 | Aatrox | -0.30 | 0.00 | 0.30 |  |
| 135 | Nautilus | -0.30 | 0.00 | 0.30 |  |
| 136 | Tahm Kench | -0.30 | 0.00 | 0.30 |  |
| 137 | Tryndamere | -0.30 | 0.00 | 0.30 |  |
| 138 | Zac | -0.30 | 0.00 | 0.30 |  |
| 139 | Nasus | -0.32 | 0.33 | 0.65 |  |
| 140 | Alistar | -0.32 | 0.00 | 0.32 |  |
| 141 | Amumu | -0.32 | 0.00 | 0.32 |  |
| 142 | Diana | -0.32 | 0.00 | 0.32 |  |
| 143 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 144 | Illaoi | -0.32 | 0.00 | 0.32 |  |
| 145 | Kassadin | -0.32 | 0.00 | 0.32 |  |
| 146 | Katarina | -0.32 | 0.00 | 0.32 |  |
| 147 | Kha'Zix | -0.32 | 0.00 | 0.32 |  |
| 148 | Leona | -0.32 | 0.00 | 0.32 |  |
| 149 | Locke | -0.32 | 0.00 | 0.32 |  |
| 150 | Poppy | -0.32 | 0.00 | 0.32 |  |
| 151 | Renekton | -0.32 | 0.00 | 0.32 |  |
| 152 | Sejuani | -0.32 | 0.00 | 0.32 |  |
| 153 | Sett | -0.32 | 0.00 | 0.32 |  |
| 154 | Shyvana | -0.32 | 0.00 | 0.32 |  |
| 155 | Udyr | -0.32 | 0.00 | 0.32 |  |
| 156 | Singed | -0.35 | 0.30 | 0.65 |  |
| 157 | Mordekaiser | -0.53 | 0.08 | 0.61 |  |
| 158 | Darius | -0.61 | 0.00 | 0.61 |  |
| 159 | Garen | -0.61 | 0.00 | 0.61 |  |
| 160 | Sion | -0.61 | 0.00 | 0.61 |  |
| 161 | Trundle | -0.61 | 0.00 | 0.61 |  |
| 162 | Yorick | -0.61 | 0.00 | 0.61 |  |
| 163 | Blitzcrank | -0.65 | 0.00 | 0.65 |  |
| 164 | Cho'Gath | -0.65 | 0.00 | 0.65 |  |
| 165 | Dr. Mundo | -0.65 | 0.00 | 0.65 |  |
| 166 | Gangplank | -0.65 | 0.00 | 0.65 |  |
| 167 | Nunu & Willump | -0.65 | 0.00 | 0.65 |  |
| 168 | Olaf | -0.65 | 0.00 | 0.65 |  |
| 169 | Rengar | -0.65 | 0.00 | 0.65 |  |
| 170 | Rumble | -0.65 | 0.00 | 0.65 |  |
| 171 | Skarner | -0.65 | 0.00 | 0.65 |  |
| 172 | Taric | -0.65 | 0.00 | 0.65 |  |
