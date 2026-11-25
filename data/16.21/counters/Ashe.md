# Counters to Ashe (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Ashe: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Ashe wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Ashe --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Sylas | +0.85 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.28 |
| 2 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.87 |
| 3 | K'Sante | +0.81 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.53 |
| 4 | Kennen | +0.81 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.56 |
| 5 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.25 | +1.00 | +0.86 |
| 6 | Heimerdinger | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.01 |
| 7 | Nocturne | +0.80 | +1.00 | +1.00 | +1.00 | −0.27 | +1.00 | +0.89 |
| 8 | Vayne | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.48 |
| 9 | Kayle | +0.78 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.31 |
| 10 | Kog'Maw | +0.78 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.29 |
| 11 | Jhin | +0.76 | +1.00 | +1.00 | +1.00 | +0.00 | – | −0.33 |
| 12 | Wukong | +0.76 | +1.00 | +1.00 | +1.00 | −0.36 | +1.00 | +0.19 |
| 13 | Anivia | +0.74 | +1.00 | +1.00 | +1.00 | −0.16 | – | −0.26 |
| 14 | Cassiopeia | +0.70 | +0.73 | +1.00 | +1.00 | −0.02 | – | +0.02 |
| 15 | Lulu | +0.67 | +0.72 | +1.00 | +1.00 | +0.02 | – | −0.60 |
| 16 | Corki | +0.61 | +0.76 | +0.77 | +1.00 | −0.01 | – | −0.55 |
| 17 | Malphite | +0.60 | +1.00 | +1.00 | +1.00 | −0.07 | −1.00 | +0.20 |
| 18 | Tahm Kench | +0.60 | +0.99 | +0.99 | +1.00 | −0.01 | −0.89 | −0.19 |
| 19 | Zaahen | +0.45 | +0.27 | +0.53 | +1.00 | −0.26 | +1.00 | −0.16 |
| 20 | Sion | +0.40 | +0.48 | −0.09 | +1.00 | −0.08 | +0.93 | +0.39 |
| 21 | Ziggs | +0.37 | +1.00 | +1.00 | −1.00 | +0.19 | – | +0.07 |
| 22 | Master Yi | +0.31 | +0.00 | +0.02 | +1.00 | −0.25 | +1.00 | +0.91 |
| 23 | Poppy | +0.31 | +1.00 | −1.00 | +1.00 | −0.05 | +1.00 | +0.27 |
| 24 | Riven | +0.28 | +1.00 | −1.00 | +1.00 | −0.11 | +1.00 | −0.04 |
| 25 | Aurelion Sol | +0.27 | +1.00 | +1.00 | −1.00 | +0.50 | −1.00 | −0.04 |
| 26 | Azir | +0.25 | −0.84 | +1.00 | +1.00 | +0.01 | – | −0.40 |
| 27 | Fizz | +0.17 | +1.00 | +1.00 | −1.00 | −0.21 | −0.99 | −0.01 |
| 28 | Malzahar | +0.10 | +1.00 | −1.00 | +1.00 | −0.09 | −0.96 | +0.23 |
| 29 | Olaf | +0.09 | +0.15 | −1.00 | +1.00 | −0.29 | +1.00 | +0.91 |
| 30 | Yasuo | +0.06 | −1.00 | +0.02 | +0.99 | −0.06 | +0.85 | +0.57 |
| 31 | Udyr | −0.08 | +1.00 | −0.94 | +0.00 | −0.13 | −0.78 | +0.11 |
| 32 | Nasus | −0.08 | −0.68 | +0.01 | +1.00 | −0.14 | −1.00 | +0.09 |
| 33 | Rammus | −0.17 | +0.40 | +0.24 | −1.00 | −0.22 | −1.00 | +0.00 |
| 34 | Jax | −0.18 | −1.00 | −1.00 | +1.00 | +0.05 | +1.00 | +0.17 |
| 35 | Gragas | −0.19 | −1.00 | −1.00 | +1.00 | −0.01 | +1.00 | +0.18 |
| 36 | Yone | −0.19 | +0.24 | −1.00 | +0.24 | −0.36 | +0.24 | −0.40 |
| 37 | Sejuani | −0.20 | −1.00 | −1.00 | +1.00 | −0.15 | +1.00 | +0.38 |
| 38 | Tryndamere | −0.23 | −1.00 | −1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 39 | Fiora | −0.23 | −1.00 | −1.00 | +1.00 | −0.33 | +1.00 | +0.31 |
| 40 | Dr. Mundo | −0.28 | −0.98 | −0.59 | +0.99 | −0.05 | −1.00 | +0.38 |
| 41 | Gwen | −0.29 | −1.00 | −1.00 | +1.00 | −0.47 | +1.00 | −0.29 |
| 42 | Annie | −0.31 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.23 |
| 43 | Urgot | −0.31 | −1.00 | −1.00 | +1.00 | −0.10 | −0.02 | +0.10 |
| 44 | Gangplank | −0.32 | −1.00 | −1.00 | +1.00 | −0.25 | −0.14 | +0.71 |
| 45 | Karthus | −0.35 | −1.00 | +0.00 | +0.00 | −0.02 | −1.00 | +0.07 |
| 46 | Zed | −0.35 | +0.00 | −1.00 | +0.00 | −0.22 | −1.00 | +0.68 |
| 47 | Zilean | −0.37 | −0.95 | +0.46 | −1.00 | −0.06 | – | −0.01 |
| 48 | Aphelios | −0.37 | −1.00 | −1.00 | +1.00 | −0.01 | – | −0.71 |
| 49 | Graves | −0.42 | −1.00 | −1.00 | +1.00 | +0.12 | −1.00 | −0.68 |
| 50 | Rumble | −0.43 | −0.24 | −0.24 | −1.00 | −0.09 | −1.00 | +0.07 |
| 51 | Neeko | −0.43 | −1.00 | −1.00 | +1.00 | −0.07 | −1.00 | −0.36 |
| 52 | Renekton | −0.44 | −1.00 | −1.00 | +1.00 | −0.18 | −1.00 | −0.33 |
| 53 | Briar | −0.49 | −1.00 | −1.00 | +1.00 | −0.44 | −1.00 | −0.40 |
| 54 | Zeri | −0.49 | −0.72 | −0.33 | −1.00 | +0.08 | – | +0.15 |
| 55 | Yunara | −0.51 | −0.68 | −0.24 | −1.00 | −0.03 | – | −0.54 |
| 56 | Twitch | −0.53 | −0.45 | −0.63 | −1.00 | −0.07 | – | +0.07 |
| 57 | Hwei | −0.54 | −0.95 | −0.95 | +0.03 | −0.01 | – | −0.33 |
| 58 | Irelia | −0.57 | −1.00 | −0.46 | −0.56 | +0.05 | −1.00 | −0.07 |
| 59 | Vi | −0.57 | −1.00 | −0.02 | −1.00 | −0.07 | −1.00 | −0.12 |
| 60 | Jinx | −0.59 | −0.70 | −0.70 | −1.00 | +0.07 | – | +0.26 |
| 61 | Smolder | −0.60 | −0.62 | −0.62 | −1.00 | +0.01 | – | −0.68 |
| 62 | Tristana | −0.61 | −1.00 | −1.00 | −0.94 | +0.06 | +1.00 | −0.58 |
| 63 | Nilah | −0.62 | −1.00 | −1.00 | +0.00 | −0.17 | −1.00 | +0.12 |
| 64 | Kayn | −0.63 | −1.00 | −1.00 | −0.14 | −0.04 | −1.00 | +0.18 |
| 65 | Taric | −0.64 | −0.65 | −1.00 | −0.64 | +0.03 | −1.00 | −0.09 |
| 66 | Sona | −0.65 | −0.99 | −0.51 | −1.00 | −0.01 | – | −0.19 |
| 67 | Varus | −0.70 | −0.87 | −0.87 | −1.00 | +0.01 | – | +0.12 |
| 68 | Lillia | −0.71 | −0.84 | −0.84 | −1.00 | −0.03 | −1.00 | +0.40 |
| 69 | Swain | −0.72 | −1.00 | −0.80 | −1.00 | +0.09 | – | −0.16 |
| 70 | Elise | −0.73 | −1.00 | −1.00 | −0.70 | −0.01 | – | −0.40 |
| 71 | Brand | −0.74 | −1.00 | −0.61 | −1.00 | −0.05 | −1.00 | −0.53 |
| 72 | Mordekaiser | −0.74 | −1.00 | −1.00 | −0.58 | −0.17 | −1.00 | −0.06 |
| 73 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.60 |
| 74 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.05 |
| 75 | Taliyah | −0.75 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.10 |
| 76 | Draven | −0.75 | −0.94 | −0.87 | −1.00 | −0.02 | – | −0.41 |
| 77 | Xayah | −0.75 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.84 |
| 78 | Xin Zhao | −0.76 | −1.00 | −0.70 | −1.00 | −0.09 | −1.00 | −0.37 |
| 79 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.05 |
| 80 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.46 |
| 81 | Teemo | −0.76 | −0.98 | −0.89 | −1.00 | +0.00 | −0.99 | +0.06 |
| 82 | Jayce | −0.76 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.56 |
| 83 | Vel'Koz | −0.77 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.24 |
| 84 | Ivern | −0.77 | −0.86 | −0.75 | −0.88 | −0.49 | −1.00 | −0.32 |
| 85 | Ahri | −0.77 | −1.00 | −1.00 | −0.99 | −0.06 | – | +0.27 |
| 86 | Orianna | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.01 |
| 87 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.16 |
| 88 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.26 |
| 89 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.24 |
| 90 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.33 |
| 91 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.15 |
| 92 | Caitlyn | −0.78 | −0.95 | −0.95 | −1.00 | +0.06 | – | −0.70 |
| 93 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.14 |
| 94 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.21 |
| 95 | Sivir | −0.78 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.75 |
| 96 | Xerath | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.29 |
| 97 | Camille | −0.78 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.89 |
| 98 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.04 |
| 99 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.17 |
| 100 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.39 |
| 101 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.10 |
| 102 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.30 |
| 103 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.12 |
| 104 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.26 |
| 105 | Pantheon | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.34 |
| 106 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.09 |
| 107 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.07 |
| 108 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.03 |
| 109 | Nami | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.50 |
| 110 | Ezreal | −0.80 | −0.99 | −0.99 | −1.00 | −0.04 | – | −0.41 |
| 111 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.03 |
| 112 | Karma | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.31 |
| 113 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.13 |
| 114 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.63 |
| 115 | Rell | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.45 |
| 116 | Ornn | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.02 |
| 117 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.30 |
| 118 | Kassadin | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.41 |
| 119 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.34 |
| 120 | Kled | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.12 |
| 121 | Zac | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.43 |
| 122 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.62 |
| 123 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.05 |
| 124 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.71 |
| 125 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.45 |
| 126 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.25 |
| 127 | Leona | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.16 |
| 128 | Hecarim | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.14 |
| 129 | Braum | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.17 |
| 130 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.21 |
| 131 | Gnar | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −0.97 | −0.29 |
| 132 | Garen | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.31 |
| 133 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.16 |
| 134 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.25 |
| 135 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.78 |
| 136 | Sett | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.30 |
| 137 | Quinn | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.72 |
| 138 | Viego | −0.83 | −1.00 | −1.00 | −0.84 | −0.31 | −1.00 | −0.21 |
| 139 | Maokai | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.46 |
| 140 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.65 |
| 141 | Rakan | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.25 |
| 142 | Volibear | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 143 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.30 |
| 144 | Kalista | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.57 |
| 145 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.60 |
| 146 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.16 |
| 147 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.10 |
| 148 | Lee Sin | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | −0.98 | −0.35 |
| 149 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.79 |
| 150 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.49 |
| 151 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.27 |
| 152 | Shaco | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.01 |
| 153 | Veigar | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.63 |
| 154 | Bel'Veth | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.17 |
| 155 | Galio | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.40 |
| 156 | Bard | −0.84 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.03 |
| 157 | Shyvana | −0.84 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | −0.17 |
| 158 | Twisted Fate | −0.84 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.77 |
| 159 | Lucian | −0.85 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | −0.18 |
| 160 | Akshan | −0.85 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.41 |
| 161 | Cho'Gath | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.46 |
| 162 | Fiddlesticks | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.63 |
| 163 | Darius | −0.86 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | −0.29 |
| 164 | Ekko | −0.86 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | −0.37 |
| 165 | Thresh | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.69 |
| 166 | Aatrox | −0.86 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | −0.31 |
| 167 | Ambessa | −0.87 | −1.00 | −1.00 | −1.00 | −0.57 | −1.00 | +0.36 |
| 168 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.37 | −1.00 | −0.34 |
| 169 | Singed | −0.87 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | −0.00 |
| 170 | Rek'Sai | −0.88 | −1.00 | −1.00 | −1.00 | −0.48 | −1.00 | −0.07 |
| 171 | Warwick | −0.89 | −1.00 | −1.00 | −1.00 | −0.47 | −1.00 | −0.30 |
| 172 | Yuumi | −0.90 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | −0.88 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Ashe's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Ashe's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Ashe` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Mel (net +1.02)

- **0.80** projectile block: Rebuttal blocks Ashe's Enchanted Crystal Arrow, a projectile. Rebuttal for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Rebuttal blocks Ashe's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Ashe basic attacks)
- **0.27** projectile block: Rebuttal blocks Ashe's Volley, a projectile. Rebuttal for 0.75 s; Volley takes 0.25 s to land, enough to react. (Mel W Rebuttal → Ashe W Volley)

#### 2. Samira (net +0.96)

- **0.80** projectile block: Blade Whirl blocks Ashe's Enchanted Crystal Arrow, a projectile. Blade Whirl for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe R Enchanted Crystal Arrow)
- **0.30** projectile block: Blade Whirl blocks Ashe's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Ashe basic attacks)
- **0.28** projectile block: Blade Whirl blocks Ashe's Volley, a projectile. Blade Whirl for 0.75 s; Volley takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 100 units farther than Samira's (600 vs 500 attack range).

#### 3. Yasuo (net +0.83)

- **0.80** projectile block: Wind Wall blocks Ashe's Enchanted Crystal Arrow, a projectile. Wind Wall for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Yasuo W Wind Wall → Ashe R Enchanted Crystal Arrow)
- **0.39** projectile block: Wind Wall blocks Ashe's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Ashe basic attacks)
- **0.30** projectile block: Wind Wall blocks Ashe's Volley, a projectile. Wind Wall for 4 s, long enough to use ahead of Volley. (Yasuo W Wind Wall → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 425 units farther than Yasuo's (600 vs 175 attack range).

#### 4. Braum (net +0.79)

- **0.80** projectile block: Unbreakable blocks Ashe's Enchanted Crystal Arrow, a projectile. Unbreakable for 4 s, long enough to use ahead of Enchanted Crystal Arrow. (Braum E Unbreakable → Ashe R Enchanted Crystal Arrow)
- **0.50** projectile block: Unbreakable blocks Ashe's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Ashe basic attacks)
- **0.39** projectile block: Unbreakable blocks Ashe's Volley, a projectile. Unbreakable for 4 s, long enough to use ahead of Volley. (Braum E Unbreakable → Ashe W Volley)
- Watch out: Ashe's basic attacks reach 475 units farther than Braum's (600 vs 125 attack range).

#### 5. Lissandra (net +0.68)

- **0.68** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Lissandra R Frozen Tomb → Ashe R Enchanted Crystal Arrow)

#### 6. Fizz (net +0.62)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. (Fizz E Playful → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 425 units farther than Fizz's (600 vs 175 attack range).

#### 7. Sivir (net +0.62)

- **0.80** spell shield: Spell Shield's spell shield blocks Ashe's Enchanted Crystal Arrow. Spell shield for 1.5 s, long enough to use ahead of Enchanted Crystal Arrow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Sivir's (600 vs 500 attack range).

#### 8. Aurora (net +0.61)

- **0.61** untargetable: Between Worlds makes Aurora untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 0.4 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Ashe R Enchanted Crystal Arrow)

#### 9. Fiora (net +0.59)

- **0.90** parry: Riposte parries Ashe's Enchanted Crystal Arrow and stuns back. Parry for 0.75 s; Enchanted Crystal Arrow takes 0.25 s to land, enough to react. Negating Enchanted Crystal Arrow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Ashe R Enchanted Crystal Arrow)
- **0.09** attack speed slow: Riposte cuts Ashe's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Ashe basic attacks)
- Watch out: Ashe's basic attacks reach 450 units farther than Fiora's (600 vs 150 attack range).

#### 10. Bard (net +0.59)

- **0.68** untargetable: Tempered Fate makes Bard untargetable, dodging Ashe's Enchanted Crystal Arrow. Untargetable for 2.5 s, long enough to use ahead of Enchanted Crystal Arrow. (Bard R Tempered Fate → Ashe R Enchanted Crystal Arrow)
- Watch out: Ashe's basic attacks reach 100 units farther than Bard's (600 vs 500 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Mel | +1.02 | 1.02 | 0.00 | projectile block (Rebuttal) |
| 2 | Samira | +0.96 | 1.02 | 0.06 | projectile block (Blade Whirl) |
| 3 | Yasuo | +0.83 | 1.07 | 0.24 | projectile block (Wind Wall) |
| 4 | Braum | +0.79 | 1.15 | 0.36 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 5 | Lissandra | +0.68 | 0.68 | 0.00 |  |
| 6 | Fizz | +0.62 | 0.80 | 0.18 |  |
| 7 | Sivir | +0.62 | 0.80 | 0.18 |  |
| 8 | Aurora | +0.61 | 0.61 | 0.00 |  |
| 9 | Fiora | +0.59 | 0.95 | 0.36 |  |
| 10 | Bard | +0.59 | 0.68 | 0.09 |  |
| 11 | Morgana | +0.56 | 0.83 | 0.27 |  |
| 12 | Udyr | +0.48 | 0.84 | 0.36 |  |
| 13 | Vladimir | +0.48 | 0.80 | 0.32 |  |
| 14 | Xayah | +0.47 | 0.61 | 0.14 |  |
| 15 | Zaahen | +0.46 | 0.70 | 0.24 |  |
| 16 | Camille | +0.46 | 0.64 | 0.18 |  |
| 17 | Gwen | +0.44 | 0.80 | 0.36 |  |
| 18 | Maokai | +0.44 | 0.80 | 0.36 |  |
| 19 | Nocturne | +0.44 | 0.80 | 0.36 |  |
| 20 | Evelynn | +0.44 | 0.68 | 0.24 |  |
| 21 | Rek'Sai | +0.44 | 0.68 | 0.24 |  |
| 22 | Shaco | +0.44 | 0.68 | 0.24 |  |
| 23 | Kled | +0.44 | 0.60 | 0.16 |  |
| 24 | Kalista | +0.42 | 0.47 | 0.05 |  |
| 25 | Milio | +0.41 | 0.55 | 0.14 |  |
| 26 | Master Yi | +0.38 | 0.85 | 0.47 |  |
| 27 | Zed | +0.37 | 0.61 | 0.24 |  |
| 28 | Kayle | +0.34 | 0.34 | 0.00 |  |
| 29 | Lulu | +0.34 | 0.34 | 0.00 |  |
| 30 | Teemo | +0.29 | 0.47 | 0.18 | blind (Blinding Dart) |
| 31 | Yuumi | +0.26 | 0.80 | 0.54 |  |
| 32 | Alistar | +0.20 | 0.56 | 0.36 |  |
| 33 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 34 | Varus | +0.12 | 0.18 | 0.06 |  |
| 35 | Aphelios | +0.03 | 0.03 | 0.00 |  |
| 36 | Heimerdinger | +0.03 | 0.03 | 0.00 |  |
| 37 | Sion | +0.02 | 0.82 | 0.80 |  |
| 38 | Jax | +0.02 | 0.38 | 0.36 |  |
| 39 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 40 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 41 | Annie | 0.00 | 0.00 | 0.00 |  |
| 42 | Brand | 0.00 | 0.00 | 0.00 |  |
| 43 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 44 | Corki | 0.00 | 0.00 | 0.00 |  |
| 45 | Draven | 0.00 | 0.00 | 0.00 |  |
| 46 | Elise | 0.00 | 0.00 | 0.00 |  |
| 47 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 48 | Hwei | 0.00 | 0.00 | 0.00 |  |
| 49 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 50 | Lux | 0.00 | 0.00 | 0.00 |  |
| 51 | Nami | 0.00 | 0.00 | 0.00 |  |
| 52 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 53 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 54 | Senna | 0.00 | 0.00 | 0.00 |  |
| 55 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 56 | Sona | 0.00 | 0.00 | 0.00 |  |
| 57 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 58 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 59 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 60 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 61 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 62 | Vex | 0.00 | 0.00 | 0.00 |  |
| 63 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 64 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 65 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 66 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 67 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 68 | Zyra | 0.00 | 0.00 | 0.00 |  |
| 69 | Kayn | -0.01 | 0.68 | 0.69 |  |
| 70 | Nilah | -0.01 | 0.33 | 0.34 |  |
| 71 | Olaf | -0.02 | 0.70 | 0.72 |  |
| 72 | Gangplank | -0.05 | 0.67 | 0.72 |  |
| 73 | Rengar | -0.05 | 0.67 | 0.72 |  |
| 74 | Azir | -0.05 | 0.00 | 0.05 |  |
| 75 | Gnar | -0.05 | 0.00 | 0.05 |  |
| 76 | Xin Zhao | -0.06 | 0.30 | 0.36 |  |
| 77 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 78 | Kai'Sa | -0.07 | 0.00 | 0.07 |  |
| 79 | LeBlanc | -0.07 | 0.00 | 0.07 |  |
| 80 | Nidalee | -0.07 | 0.00 | 0.07 |  |
| 81 | Warwick | -0.08 | 0.75 | 0.83 |  |
| 82 | Jayce | -0.09 | 0.00 | 0.09 |  |
| 83 | Kindred | -0.09 | 0.00 | 0.09 |  |
| 84 | Thresh | -0.09 | 0.00 | 0.09 |  |
| 85 | Graves | -0.11 | 0.00 | 0.11 |  |
| 86 | Malphite | -0.12 | 0.24 | 0.36 |  |
| 87 | Jinx | -0.14 | 0.00 | 0.14 |  |
| 88 | Karma | -0.14 | 0.00 | 0.14 |  |
| 89 | Orianna | -0.14 | 0.00 | 0.14 |  |
| 90 | Seraphine | -0.14 | 0.00 | 0.14 |  |
| 91 | Swain | -0.14 | 0.00 | 0.14 |  |
| 92 | Viktor | -0.14 | 0.00 | 0.14 |  |
| 93 | Malzahar | -0.16 | 0.42 | 0.58 |  |
| 94 | Rammus | -0.16 | 0.36 | 0.52 |  |
| 95 | Briar | -0.18 | 0.00 | 0.18 |  |
| 96 | Jarvan IV | -0.18 | 0.00 | 0.18 |  |
| 97 | Kog'Maw | -0.18 | 0.00 | 0.18 |  |
| 98 | K'Sante | -0.18 | 0.00 | 0.18 |  |
| 99 | Rakan | -0.18 | 0.00 | 0.18 |  |
| 100 | Sylas | -0.18 | 0.00 | 0.18 |  |
| 101 | Yone | -0.18 | 0.00 | 0.18 |  |
| 102 | Ivern | -0.19 | 0.00 | 0.19 |  |
| 103 | Quinn | -0.21 | 0.00 | 0.21 |  |
| 104 | Urgot | -0.22 | 0.00 | 0.22 |  |
| 105 | Akali | -0.24 | 0.00 | 0.24 |  |
| 106 | Ambessa | -0.24 | 0.00 | 0.24 |  |
| 107 | Bel'Veth | -0.24 | 0.00 | 0.24 |  |
| 108 | Ekko | -0.24 | 0.00 | 0.24 |  |
| 109 | Hecarim | -0.24 | 0.00 | 0.24 |  |
| 110 | Lee Sin | -0.24 | 0.00 | 0.24 |  |
| 111 | Wukong | -0.24 | 0.00 | 0.24 |  |
| 112 | Ornn | -0.24 | 0.00 | 0.24 |  |
| 113 | Qiyana | -0.24 | 0.00 | 0.24 |  |
| 114 | Rell | -0.24 | 0.00 | 0.24 |  |
| 115 | Riven | -0.24 | 0.00 | 0.24 |  |
| 116 | Talon | -0.24 | 0.00 | 0.24 |  |
| 117 | Volibear | -0.24 | 0.00 | 0.24 |  |
| 118 | Lillia | -0.25 | 0.00 | 0.25 |  |
| 119 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 120 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 121 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 122 | Viego | -0.30 | 0.00 | 0.30 |  |
| 123 | Pantheon | -0.32 | 0.40 | 0.72 |  |
| 124 | Pyke | -0.32 | 0.00 | 0.32 |  |
| 125 | Shen | -0.33 | 0.36 | 0.69 |  |
| 126 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 127 | Nasus | -0.36 | 0.36 | 0.72 |  |
| 128 | Aatrox | -0.36 | 0.00 | 0.36 |  |
| 129 | Amumu | -0.36 | 0.00 | 0.36 |  |
| 130 | Diana | -0.36 | 0.00 | 0.36 |  |
| 131 | Illaoi | -0.36 | 0.00 | 0.36 |  |
| 132 | Irelia | -0.36 | 0.00 | 0.36 |  |
| 133 | Kassadin | -0.36 | 0.00 | 0.36 |  |
| 134 | Kha'Zix | -0.36 | 0.00 | 0.36 |  |
| 135 | Leona | -0.36 | 0.00 | 0.36 |  |
| 136 | Locke | -0.36 | 0.00 | 0.36 |  |
| 137 | Nautilus | -0.36 | 0.00 | 0.36 |  |
| 138 | Renekton | -0.36 | 0.00 | 0.36 |  |
| 139 | Sejuani | -0.36 | 0.00 | 0.36 |  |
| 140 | Sett | -0.36 | 0.00 | 0.36 |  |
| 141 | Shyvana | -0.36 | 0.00 | 0.36 |  |
| 142 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 143 | Akshan | -0.37 | 0.00 | 0.37 |  |
| 144 | Lucian | -0.37 | 0.00 | 0.37 |  |
| 145 | Janna | -0.40 | 0.00 | 0.40 |  |
| 146 | Katarina | -0.41 | 0.18 | 0.59 |  |
| 147 | Twisted Fate | -0.42 | 0.00 | 0.42 |  |
| 148 | Vel'Koz | -0.42 | 0.00 | 0.42 |  |
| 149 | Garen | -0.44 | 0.28 | 0.72 |  |
| 150 | Singed | -0.45 | 0.27 | 0.72 |  |
| 151 | Xerath | -0.45 | 0.00 | 0.45 |  |
| 152 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 153 | Vi | -0.47 | 0.00 | 0.47 |  |
| 154 | Fiddlesticks | -0.48 | 0.00 | 0.48 |  |
| 155 | Karthus | -0.55 | 0.00 | 0.55 |  |
| 156 | Taliyah | -0.55 | 0.00 | 0.55 |  |
| 157 | Poppy | -0.56 | 0.00 | 0.56 |  |
| 158 | Zac | -0.61 | 0.00 | 0.61 |  |
| 159 | Mordekaiser | -0.63 | 0.09 | 0.72 |  |
| 160 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 161 | Tahm Kench | -0.65 | 0.00 | 0.65 |  |
| 162 | Skarner | -0.68 | 0.04 | 0.72 |  |
| 163 | Blitzcrank | -0.72 | 0.00 | 0.72 |  |
| 164 | Cho'Gath | -0.72 | 0.00 | 0.72 |  |
| 165 | Darius | -0.72 | 0.00 | 0.72 |  |
| 166 | Dr. Mundo | -0.72 | 0.00 | 0.72 |  |
| 167 | Rumble | -0.72 | 0.00 | 0.72 |  |
| 168 | Taric | -0.72 | 0.00 | 0.72 |  |
| 169 | Trundle | -0.72 | 0.00 | 0.72 |  |
| 170 | Yorick | -0.72 | 0.00 | 0.72 |  |
| 171 | Galio | -0.79 | 0.00 | 0.79 |  |
| 172 | Nunu & Willump | -1.01 | 0.09 | 1.10 |  |
