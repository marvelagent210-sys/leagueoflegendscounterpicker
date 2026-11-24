# Counters to Neeko (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Neeko: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Neeko wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Neeko --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.70 |
| 2 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 3 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 4 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 5 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 6 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 7 | Annie | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 8 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 9 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 10 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 11 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 12 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 13 | Lulu | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 14 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 15 | Vayne | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 16 | Jhin | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 17 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 18 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 19 | Varus | +0.78 | +0.99 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 20 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 21 | Kog'Maw | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 22 | Fizz | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 23 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 24 | Twisted Fate | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 25 | Akshan | +0.76 | +0.99 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 26 | Trundle | +0.76 | +1.00 | +1.00 | +1.00 | −0.30 | +1.00 | +0.02 |
| 27 | Kai'Sa | +0.74 | +1.00 | +1.00 | +1.00 | −0.23 | – | +0.00 |
| 28 | Rumble | +0.72 | +0.96 | +0.96 | +1.00 | −0.07 | +0.47 | +0.00 |
| 29 | Zaahen | +0.71 | +0.78 | +0.85 | +1.00 | +0.05 | +1.00 | +0.00 |
| 30 | Kennen | +0.69 | +0.90 | +0.84 | +1.00 | −0.10 | – | +0.00 |
| 31 | Kindred | +0.59 | +1.00 | +1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 32 | Jayce | +0.58 | +1.00 | +1.00 | +1.00 | −0.13 | −1.00 | +0.00 |
| 33 | Graves | +0.54 | +1.00 | +1.00 | −0.29 | +0.01 | +1.00 | +0.00 |
| 34 | Ivern | +0.54 | +0.33 | +0.89 | +1.00 | −0.12 | – | +0.00 |
| 35 | Aphelios | +0.52 | +0.69 | +1.00 | +1.00 | +0.01 | −1.00 | +0.00 |
| 36 | Swain | +0.50 | +0.24 | +0.79 | +1.00 | −0.02 | – | +0.00 |
| 37 | Tahm Kench | +0.48 | +0.73 | +0.85 | +0.01 | +0.11 | +0.62 | +0.00 |
| 38 | Yasuo | +0.42 | +0.68 | +0.81 | −0.04 | −0.06 | +0.68 | +0.00 |
| 39 | Ashe | +0.41 | +1.00 | +1.00 | −1.00 | +0.07 | +1.00 | +0.00 |
| 40 | Miss Fortune | +0.41 | +1.00 | +1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 41 | Tristana | +0.40 | +1.00 | +1.00 | −1.00 | +0.01 | +1.00 | +0.00 |
| 42 | Zac | +0.40 | +0.34 | +0.23 | +0.94 | −0.21 | +0.99 | +0.00 |
| 43 | Kalista | +0.39 | +1.00 | +1.00 | −0.65 | −0.14 | – | +0.00 |
| 44 | Jinx | +0.38 | +0.90 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 45 | Rammus | +0.38 | +1.00 | +1.00 | −1.00 | −0.14 | +1.00 | +0.00 |
| 46 | Vel'Koz | +0.37 | +1.00 | +1.00 | −1.00 | +0.23 | – | +0.00 |
| 47 | Draven | +0.36 | +1.00 | +1.00 | −0.95 | +0.06 | – | +0.00 |
| 48 | Sion | +0.34 | +0.50 | +1.00 | −0.63 | −0.03 | +0.99 | +0.00 |
| 49 | Aurora | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 50 | Anivia | +0.34 | +0.27 | +0.26 | +1.00 | −0.12 | +0.25 | +0.00 |
| 51 | Fiddlesticks | +0.34 | +1.00 | +1.00 | −1.00 | +0.02 | – | +0.00 |
| 52 | Twitch | +0.33 | +1.00 | +1.00 | −1.00 | −0.00 | – | +0.00 |
| 53 | Xayah | +0.33 | +1.00 | +1.00 | −1.00 | −0.02 | – | +0.00 |
| 54 | Malphite | +0.32 | +1.00 | +0.08 | +0.03 | +0.17 | +0.19 | +0.00 |
| 55 | Malzahar | +0.32 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 56 | Olaf | +0.32 | +0.25 | +0.33 | +1.00 | −0.22 | +0.03 | +0.00 |
| 57 | Tryndamere | +0.31 | −0.86 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 58 | Gragas | +0.31 | +1.00 | +1.00 | −1.00 | −0.12 | +0.26 | +0.00 |
| 59 | Milio | +0.28 | +0.90 | +0.88 | −1.00 | +0.06 | – | +0.00 |
| 60 | Yunara | +0.26 | +0.61 | +0.77 | −1.00 | +0.09 | +1.00 | +0.00 |
| 61 | Gnar | +0.24 | +1.00 | +1.00 | −0.73 | −0.08 | −0.99 | +0.00 |
| 62 | Mordekaiser | +0.24 | +0.48 | +0.58 | −0.02 | −0.10 | −0.09 | +0.00 |
| 63 | Volibear | +0.23 | +0.96 | −1.00 | +0.91 | −0.27 | +1.00 | +0.00 |
| 64 | Azir | +0.22 | +1.00 | −1.00 | +1.00 | −0.03 | – | +0.00 |
| 65 | Lillia | +0.21 | +0.07 | +0.14 | +0.72 | −0.04 | +0.19 | +0.00 |
| 66 | Gangplank | +0.20 | +0.94 | +1.00 | −0.96 | −0.09 | −0.76 | +0.00 |
| 67 | Poppy | +0.17 | −0.85 | +1.00 | +1.00 | +0.14 | −0.85 | +0.00 |
| 68 | Caitlyn | +0.16 | +0.51 | +0.65 | −0.78 | +0.06 | +0.18 | +0.00 |
| 69 | Bel'Veth | +0.11 | −1.00 | +1.00 | +1.00 | +0.00 | −0.93 | +0.00 |
| 70 | Master Yi | +0.10 | +1.00 | −1.00 | +0.12 | −0.15 | +1.00 | +0.00 |
| 71 | Gwen | +0.09 | +0.98 | −0.84 | +0.60 | −0.33 | −0.19 | +0.00 |
| 72 | Ziggs | +0.08 | +0.00 | −1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 73 | Sett | +0.07 | +1.00 | −1.00 | +1.00 | −0.18 | −1.00 | +0.00 |
| 74 | Viego | +0.05 | −1.00 | +0.94 | +1.00 | −0.25 | −0.93 | +0.00 |
| 75 | Riven | −0.11 | +1.00 | −1.00 | +0.03 | −0.17 | −0.90 | +0.00 |
| 76 | Diana | −0.12 | −0.04 | −0.90 | −0.01 | +0.13 | +1.00 | +0.00 |
| 77 | Taric | −0.14 | −0.29 | −0.18 | −0.01 | −0.00 | −0.21 | +0.00 |
| 78 | Braum | −0.15 | −0.18 | −0.21 | +0.21 | −0.04 | −0.83 | +0.00 |
| 79 | Maokai | −0.18 | −1.00 | +1.00 | −1.00 | −0.08 | +0.30 | +0.00 |
| 80 | Aurelion Sol | −0.20 | +0.03 | +0.03 | −1.00 | +0.02 | – | +0.00 |
| 81 | Lee Sin | −0.21 | −0.99 | −0.98 | +1.00 | −0.11 | +1.00 | +0.00 |
| 82 | Quinn | −0.21 | −0.77 | −0.77 | +1.00 | −0.06 | – | +0.00 |
| 83 | Karthus | −0.23 | −0.19 | −0.22 | −0.51 | −0.01 | −0.23 | +0.00 |
| 84 | Zilean | −0.26 | −0.14 | +0.00 | −1.00 | −0.03 | – | +0.00 |
| 85 | Briar | −0.29 | +1.00 | −1.00 | −1.00 | −0.28 | −0.49 | +0.00 |
| 86 | Kled | −0.30 | −0.31 | −0.29 | −0.84 | −0.08 | +0.36 | +0.00 |
| 87 | Wukong | −0.31 | −1.00 | +1.00 | −0.97 | −0.14 | −1.00 | +0.00 |
| 88 | Samira | −0.34 | −1.00 | −1.00 | +1.00 | −0.04 | – | +0.00 |
| 89 | Xin Zhao | −0.35 | −0.79 | −0.98 | +1.00 | −0.07 | −1.00 | +0.00 |
| 90 | Elise | −0.37 | −1.00 | −1.00 | +0.90 | −0.09 | – | +0.00 |
| 91 | Brand | −0.39 | −1.00 | −0.71 | +0.40 | −0.02 | – | +0.00 |
| 92 | Kassadin | −0.39 | −0.93 | −1.00 | +0.00 | −0.07 | +1.00 | +0.00 |
| 93 | Darius | −0.49 | −0.05 | −0.86 | −0.76 | −0.15 | −0.88 | +0.00 |
| 94 | Rengar | −0.55 | −1.00 | −1.00 | +0.01 | +0.27 | −0.90 | +0.00 |
| 95 | Cassiopeia | −0.56 | −1.00 | −1.00 | −0.10 | +0.10 | – | +0.00 |
| 96 | Shaco | −0.61 | −1.00 | −1.00 | +0.00 | −0.14 | −0.94 | +0.00 |
| 97 | Nilah | −0.62 | −1.00 | −1.00 | +0.00 | −0.13 | −1.00 | +0.00 |
| 98 | Ornn | −0.62 | −0.97 | −0.48 | −0.86 | −0.07 | −0.73 | +0.00 |
| 99 | Irelia | −0.63 | −0.96 | −1.00 | −0.64 | −0.00 | −0.14 | +0.00 |
| 100 | Hwei | −0.64 | −1.00 | −0.89 | −0.47 | −0.03 | – | +0.00 |
| 101 | Bard | −0.68 | −0.86 | −0.73 | −1.00 | −0.12 | – | +0.00 |
| 102 | Nocturne | −0.72 | −0.89 | −0.84 | −0.88 | −0.15 | −0.89 | +0.00 |
| 103 | Xerath | −0.74 | −1.00 | −0.88 | −1.00 | +0.03 | – | +0.00 |
| 104 | Smolder | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 105 | Senna | −0.77 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 106 | Taliyah | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 107 | Jarvan IV | −0.77 | −0.95 | −1.00 | −0.95 | +0.03 | −0.96 | +0.00 |
| 108 | Zyra | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 109 | Renata Glasc | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 110 | Warwick | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 111 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 112 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 113 | Syndra | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 114 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 115 | Nami | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 116 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 117 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 118 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 119 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 120 | Karma | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 121 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 122 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 123 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 124 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 125 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 126 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 127 | Nidalee | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 128 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 129 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 130 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 131 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 132 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 133 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 134 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 135 | Janna | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 136 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 137 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 138 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 139 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 140 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 141 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 142 | Rakan | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 143 | Kayn | −0.81 | −0.98 | −1.00 | −1.00 | −0.09 | −0.98 | +0.00 |
| 144 | Sejuani | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 145 | Cho'Gath | −0.81 | −0.99 | −0.99 | −1.00 | −0.08 | −1.00 | +0.00 |
| 146 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 147 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 148 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 149 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 150 | Skarner | −0.81 | −1.00 | −0.97 | −1.00 | −0.12 | −1.00 | +0.00 |
| 151 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Kha'Zix | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Morgana | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 154 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 155 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 156 | Garen | −0.82 | −1.00 | −1.00 | −1.00 | −0.18 | −0.98 | +0.00 |
| 157 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 158 | Naafiri | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 159 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 160 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 161 | Hecarim | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 162 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 163 | Yone | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 164 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 165 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 166 | Vi | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 167 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 168 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 169 | Rek'Sai | −0.84 | −1.00 | −1.00 | −0.94 | −0.36 | −1.00 | +0.00 |
| 170 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.00 |
| 171 | Singed | −0.86 | −1.00 | −1.00 | −0.89 | −0.55 | −1.00 | +0.00 |
| 172 | Ambessa | −0.87 | −1.00 | −1.00 | −1.00 | −0.48 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Neeko's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Neeko's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Neeko` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +1.16)

- **0.80** untargetable: Playful makes Fizz untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.75 s; Pop Blossom takes 0.6 s to land, enough to react. (Fizz E Playful → Neeko R Pop Blossom)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.75 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Fizz E Playful → Neeko E Tangle-Barbs)
- **0.11** reveal: Chum the Waters reveals Neeko through Shapesplitter's stealth. (Fizz R Chum the Waters → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range).

#### 2. Morgana (net +1.07)

- **0.80** cc immunity: Black Shield makes Morgana immune to Neeko's Pop Blossom (airborne, stun). Immune for 5 s, long enough to use ahead of Pop Blossom. (Morgana E Black Shield → Neeko R Pop Blossom)
- **0.54** cc immunity: Black Shield makes Morgana immune to Neeko's Tangle-Barbs (root). Immune for 5 s, long enough to use ahead of Tangle-Barbs. (Morgana E Black Shield → Neeko E Tangle-Barbs)
- **0.11** reveal: Soul Shackles reveals Neeko through Shapesplitter's stealth. (Morgana R Soul Shackles → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 100 units farther than Morgana's (550 vs 450 attack range).

#### 3. Kled (net +1.04)

- **0.71** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Neeko's Pop Blossom (airborne, stun). Immune for ?; Pop Blossom takes 0.6 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Neeko R Pop Blossom)
- **0.32** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Neeko's Tangle-Barbs (root). Immune for ?; Tangle-Barbs takes 1.02 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Neeko E Tangle-Barbs)
- **0.11** reveal: Bear Trap on a Rope reveals Neeko through Shapesplitter's stealth. (Kled Q Bear Trap on a Rope → Neeko W Shapesplitter)
- Watch out: Neeko's basic attacks reach 300 units farther than Kled's (550 vs 250 attack range).

#### 4. Fiora (net +1.01)

- **0.90** parry: Riposte parries Neeko's Pop Blossom and stuns back. Parry for 0.75 s; Pop Blossom takes 0.6 s to land, enough to react. Negating Pop Blossom's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko R Pop Blossom)
- **0.64** parry: Riposte parries Neeko's Tangle-Barbs and stuns back. Parry for 0.75 s; Tangle-Barbs takes 1.02 s to land, enough to react. Negating Tangle-Barbs's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Neeko E Tangle-Barbs)
- **0.05** attack speed slow: Riposte cuts Neeko's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Neeko basic attacks)
- Watch out: Neeko's basic attacks reach 400 units farther than Fiora's (550 vs 150 attack range).

#### 5. Bard (net +0.97)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Bard R Tempered Fate → Neeko R Pop Blossom)
- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Bard R Tempered Fate → Neeko E Tangle-Barbs)

#### 6. Lissandra (net +0.97)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Pop Blossom. Untargetable for 2.5 s, long enough to use ahead of Pop Blossom. (Lissandra R Frozen Tomb → Neeko R Pop Blossom)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2.5 s, long enough to use ahead of Tangle-Barbs. (Lissandra R Frozen Tomb → Neeko E Tangle-Barbs)

#### 7. Maokai (net +0.93)

- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Pop Blossom. Untargetable for 1.4 s; Pop Blossom takes 0.6 s to land, enough to react. (Maokai W Twisted Advance → Neeko R Pop Blossom)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 1.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. (Maokai W Twisted Advance → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Maokai's (550 vs 125 attack range).

#### 8. Udyr (net +0.93)

- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Pop Blossom (airborne, stun). Immune for 1.5 s, long enough to use ahead of Pop Blossom. (Udyr E Blazing Stampede → Neeko R Pop Blossom)
- **0.70** cc immunity: Blazing Stampede makes Udyr immune to Neeko's Tangle-Barbs (root). Immune for 1.5 s, long enough to use ahead of Tangle-Barbs. (Udyr E Blazing Stampede → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 425 units farther than Udyr's (550 vs 125 attack range).

#### 9. Aurora (net +0.93)

- **0.75** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Pop Blossom. Untargetable for 0.4 s; Pop Blossom takes 0.6 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko R Pop Blossom)
- **0.32** untargetable: Between Worlds makes Aurora untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 0.4 s; Tangle-Barbs takes 1.02 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Neeko E Tangle-Barbs)
- **0.08** cc immunity: Between Worlds is displacement immune, ignoring Neeko's Pop Blossom (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Neeko R Pop Blossom)

#### 10. Vladimir (net +0.91)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Pop Blossom. Untargetable for 2 s, long enough to use ahead of Pop Blossom. (Vladimir W Sanguine Pool → Neeko R Pop Blossom)
- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Neeko's Tangle-Barbs. Untargetable for 2 s, long enough to use ahead of Tangle-Barbs. (Vladimir W Sanguine Pool → Neeko E Tangle-Barbs)
- Watch out: Neeko's basic attacks reach 100 units farther than Vladimir's (550 vs 450 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +1.16 | 1.26 | 0.10 |  |
| 2 | Morgana | +1.07 | 1.18 | 0.11 |  |
| 3 | Kled | +1.04 | 1.12 | 0.08 |  |
| 4 | Fiora | +1.01 | 1.23 | 0.22 |  |
| 5 | Bard | +0.97 | 0.97 | 0.00 |  |
| 6 | Lissandra | +0.97 | 0.97 | 0.00 |  |
| 7 | Maokai | +0.93 | 1.15 | 0.22 |  |
| 8 | Udyr | +0.93 | 1.15 | 0.22 |  |
| 9 | Aurora | +0.93 | 0.93 | 0.00 |  |
| 10 | Vladimir | +0.91 | 1.07 | 0.16 |  |
| 11 | Xayah | +0.91 | 0.91 | 0.00 |  |
| 12 | Camille | +0.88 | 0.99 | 0.11 |  |
| 13 | Rek'Sai | +0.86 | 1.00 | 0.14 |  |
| 14 | Gwen | +0.84 | 1.06 | 0.22 |  |
| 15 | Zaahen | +0.83 | 0.97 | 0.14 |  |
| 16 | Evelynn | +0.82 | 0.97 | 0.15 |  |
| 17 | Shaco | +0.82 | 0.97 | 0.15 |  |
| 18 | Braum | +0.77 | 0.99 | 0.22 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 19 | Zed | +0.76 | 0.91 | 0.15 |  |
| 20 | Master Yi | +0.74 | 1.06 | 0.32 |  |
| 21 | Milio | +0.72 | 0.72 | 0.00 |  |
| 22 | Yasuo | +0.71 | 0.85 | 0.14 | projectile block (Wind Wall) |
| 23 | Sivir | +0.71 | 0.71 | 0.00 |  |
| 24 | Yuumi | +0.70 | 1.15 | 0.45 |  |
| 25 | Rengar | +0.70 | 1.14 | 0.44 |  |
| 26 | Nocturne | +0.69 | 0.91 | 0.22 |  |
| 27 | Kalista | +0.67 | 0.67 | 0.00 |  |
| 28 | Samira | +0.65 | 0.65 | 0.00 | projectile block (Blade Whirl) |
| 29 | Mel | +0.61 | 0.61 | 0.00 | projectile block (Rebuttal) |
| 30 | Alistar | +0.56 | 0.78 | 0.22 |  |
| 31 | Kayle | +0.56 | 0.56 | 0.00 |  |
| 32 | Olaf | +0.53 | 0.97 | 0.44 |  |
| 33 | Sion | +0.49 | 0.98 | 0.49 |  |
| 34 | Kayn | +0.43 | 0.99 | 0.56 |  |
| 35 | Gangplank | +0.43 | 0.87 | 0.44 |  |
| 36 | Warwick | +0.41 | 1.08 | 0.67 |  |
| 37 | Malzahar | +0.32 | 0.69 | 0.37 |  |
| 38 | Lulu | +0.32 | 0.32 | 0.00 |  |
| 39 | Teemo | +0.29 | 0.29 | 0.00 |  |
| 40 | Xin Zhao | +0.25 | 0.46 | 0.21 |  |
| 41 | Hwei | +0.22 | 0.22 | 0.00 |  |
| 42 | Karma | +0.22 | 0.22 | 0.00 |  |
| 43 | Vex | +0.15 | 0.15 | 0.00 |  |
| 44 | Tristana | +0.14 | 0.14 | 0.00 |  |
| 45 | Elise | +0.11 | 0.11 | 0.00 |  |
| 46 | Kai'Sa | +0.11 | 0.11 | 0.00 |  |
| 47 | LeBlanc | +0.11 | 0.11 | 0.00 |  |
| 48 | Nidalee | +0.11 | 0.11 | 0.00 |  |
| 49 | Renata Glasc | +0.11 | 0.11 | 0.00 |  |
| 50 | Zyra | +0.11 | 0.11 | 0.00 |  |
| 51 | Lee Sin | +0.07 | 0.22 | 0.15 |  |
| 52 | Thresh | +0.07 | 0.11 | 0.04 |  |
| 53 | K'Sante | +0.05 | 0.16 | 0.11 |  |
| 54 | Annie | +0.04 | 0.04 | 0.00 |  |
| 55 | Caitlyn | +0.03 | 0.31 | 0.28 |  |
| 56 | Nilah | +0.02 | 0.20 | 0.18 |  |
| 57 | Jax | +0.01 | 0.23 | 0.22 |  |
| 58 | Sylas | +0.01 | 0.11 | 0.10 |  |
| 59 | Garen | 0.00 | 0.41 | 0.41 |  |
| 60 | Malphite | 0.00 | 0.22 | 0.22 |  |
| 61 | Briar | 0.00 | 0.11 | 0.11 |  |
| 62 | Urgot | 0.00 | 0.11 | 0.11 |  |
| 63 | Ahri | 0.00 | 0.00 | 0.00 |  |
| 64 | Anivia | 0.00 | 0.00 | 0.00 |  |
| 65 | Aphelios | 0.00 | 0.00 | 0.00 |  |
| 66 | Ashe | 0.00 | 0.00 | 0.00 |  |
| 67 | Azir | 0.00 | 0.00 | 0.00 |  |
| 68 | Brand | 0.00 | 0.00 | 0.00 |  |
| 69 | Cassiopeia | 0.00 | 0.00 | 0.00 |  |
| 70 | Corki | 0.00 | 0.00 | 0.00 |  |
| 71 | Draven | 0.00 | 0.00 | 0.00 |  |
| 72 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 73 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 74 | Heimerdinger | 0.00 | 0.00 | 0.00 |  |
| 75 | Jayce | 0.00 | 0.00 | 0.00 |  |
| 76 | Jinx | 0.00 | 0.00 | 0.00 |  |
| 77 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 78 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 79 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 80 | Lux | 0.00 | 0.00 | 0.00 |  |
| 81 | Nami | 0.00 | 0.00 | 0.00 |  |
| 82 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 83 | Senna | 0.00 | 0.00 | 0.00 |  |
| 84 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 85 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 86 | Sona | 0.00 | 0.00 | 0.00 |  |
| 87 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 88 | Swain | 0.00 | 0.00 | 0.00 |  |
| 89 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 90 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 91 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 92 | Veigar | 0.00 | 0.00 | 0.00 |  |
| 93 | Viktor | 0.00 | 0.00 | 0.00 |  |
| 94 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 95 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 96 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 97 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 98 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 99 | Jarvan IV | -0.02 | 0.08 | 0.10 |  |
| 100 | Yone | -0.02 | 0.08 | 0.10 |  |
| 101 | Illaoi | -0.03 | 0.19 | 0.22 |  |
| 102 | Akali | -0.04 | 0.11 | 0.15 |  |
| 103 | Ambessa | -0.04 | 0.11 | 0.15 |  |
| 104 | Graves | -0.05 | 0.00 | 0.05 |  |
| 105 | Varus | -0.05 | 0.00 | 0.05 |  |
| 106 | Hecarim | -0.06 | 0.08 | 0.14 |  |
| 107 | Ornn | -0.06 | 0.08 | 0.14 |  |
| 108 | Aurelion Sol | -0.06 | 0.00 | 0.06 |  |
| 109 | Sett | -0.07 | 0.15 | 0.22 |  |
| 110 | Volibear | -0.07 | 0.08 | 0.15 |  |
| 111 | Pantheon | -0.09 | 0.53 | 0.62 |  |
| 112 | Rakan | -0.09 | 0.00 | 0.09 |  |
| 113 | Aatrox | -0.10 | 0.11 | 0.21 |  |
| 114 | Ivern | -0.11 | 0.00 | 0.11 |  |
| 115 | Lillia | -0.12 | 0.00 | 0.12 |  |
| 116 | Akshan | -0.13 | 0.11 | 0.24 |  |
| 117 | Viego | -0.13 | 0.08 | 0.21 |  |
| 118 | Shyvana | -0.14 | 0.08 | 0.22 |  |
| 119 | Wukong | -0.14 | 0.00 | 0.14 |  |
| 120 | Quinn | -0.14 | 0.00 | 0.14 |  |
| 121 | Rell | -0.14 | 0.00 | 0.14 |  |
| 122 | Rammus | -0.15 | 0.22 | 0.37 |  |
| 123 | Bel'Veth | -0.15 | 0.00 | 0.15 |  |
| 124 | Ekko | -0.15 | 0.00 | 0.15 |  |
| 125 | Qiyana | -0.15 | 0.00 | 0.15 |  |
| 126 | Riven | -0.15 | 0.00 | 0.15 |  |
| 127 | Talon | -0.15 | 0.00 | 0.15 |  |
| 128 | Fiddlesticks | -0.16 | 0.22 | 0.38 |  |
| 129 | Irelia | -0.19 | 0.00 | 0.19 |  |
| 130 | Nautilus | -0.21 | 0.00 | 0.21 |  |
| 131 | Tryndamere | -0.21 | 0.00 | 0.21 |  |
| 132 | Nasus | -0.22 | 0.22 | 0.44 |  |
| 133 | Skarner | -0.22 | 0.22 | 0.44 |  |
| 134 | Vi | -0.22 | 0.15 | 0.37 |  |
| 135 | Amumu | -0.22 | 0.00 | 0.22 |  |
| 136 | Diana | -0.22 | 0.00 | 0.22 |  |
| 137 | Kassadin | -0.22 | 0.00 | 0.22 |  |
| 138 | Kha'Zix | -0.22 | 0.00 | 0.22 |  |
| 139 | Leona | -0.22 | 0.00 | 0.22 |  |
| 140 | Locke | -0.22 | 0.00 | 0.22 |  |
| 141 | Renekton | -0.22 | 0.00 | 0.22 |  |
| 142 | Sejuani | -0.22 | 0.00 | 0.22 |  |
| 143 | Pyke | -0.23 | 0.00 | 0.23 |  |
| 144 | Twisted Fate | -0.24 | 0.11 | 0.35 |  |
| 145 | Vel'Koz | -0.26 | 0.00 | 0.26 |  |
| 146 | Mordekaiser | -0.27 | 0.14 | 0.41 |  |
| 147 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 148 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 149 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 150 | Xerath | -0.31 | 0.00 | 0.31 |  |
| 151 | Gragas | -0.32 | 0.00 | 0.32 |  |
| 152 | Zac | -0.33 | 0.11 | 0.44 |  |
| 153 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 154 | Shen | -0.38 | 0.22 | 0.60 |  |
| 155 | Karthus | -0.39 | 0.00 | 0.39 |  |
| 156 | Janna | -0.40 | 0.00 | 0.40 |  |
| 157 | Darius | -0.41 | 0.00 | 0.41 |  |
| 158 | Katarina | -0.41 | 0.00 | 0.41 |  |
| 159 | Trundle | -0.41 | 0.00 | 0.41 |  |
| 160 | Yorick | -0.41 | 0.00 | 0.41 |  |
| 161 | Naafiri | -0.42 | 0.11 | 0.53 |  |
| 162 | Poppy | -0.42 | 0.00 | 0.42 |  |
| 163 | Blitzcrank | -0.44 | 0.00 | 0.44 |  |
| 164 | Cho'Gath | -0.44 | 0.00 | 0.44 |  |
| 165 | Dr. Mundo | -0.44 | 0.00 | 0.44 |  |
| 166 | Rumble | -0.44 | 0.00 | 0.44 |  |
| 167 | Singed | -0.44 | 0.00 | 0.44 |  |
| 168 | Taric | -0.44 | 0.00 | 0.44 |  |
| 169 | Tahm Kench | -0.47 | 0.00 | 0.47 |  |
| 170 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 171 | Galio | -0.70 | 0.00 | 0.70 |  |
| 172 | Nunu & Willump | -0.81 | 0.00 | 0.81 |  |
