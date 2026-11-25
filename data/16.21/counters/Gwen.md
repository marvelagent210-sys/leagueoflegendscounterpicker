# Counters to Gwen (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Gwen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Gwen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Gwen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jax | +0.88 | +1.00 | +1.00 | +1.00 | +0.47 | – | +0.38 |
| 2 | Nilah | +0.87 | +1.00 | +1.00 | +1.00 | +0.52 | – | +0.11 |
| 3 | Master Yi | +0.86 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.95 |
| 4 | Teemo | +0.86 | +1.00 | +1.00 | +1.00 | +0.41 | +1.00 | −0.03 |
| 5 | Vayne | +0.85 | +1.00 | +1.00 | +1.00 | +0.34 | +1.00 | +0.04 |
| 6 | Poppy | +0.84 | +1.00 | +1.00 | +1.00 | +0.28 | – | +0.28 |
| 7 | Fiora | +0.84 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.56 |
| 8 | Sivir | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | −0.05 |
| 9 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.80 |
| 10 | Gnar | +0.81 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | −0.93 |
| 11 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.08 |
| 12 | Pantheon | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.04 |
| 13 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | −0.70 |
| 14 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.57 |
| 15 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | +0.17 | – | −0.28 |
| 16 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.07 |
| 17 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.46 |
| 18 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.44 |
| 19 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.28 |
| 20 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.99 |
| 21 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.50 |
| 22 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.01 | – | −0.36 |
| 23 | Volibear | +0.75 | +0.96 | +0.96 | +0.96 | +0.14 | – | −0.42 |
| 24 | Gangplank | +0.75 | +1.00 | +1.00 | +1.00 | −0.09 | – | −0.26 |
| 25 | Nasus | +0.74 | +1.00 | +1.00 | +1.00 | −0.16 | – | −0.20 |
| 26 | Xin Zhao | +0.74 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.62 |
| 27 | Garen | +0.73 | +1.00 | +1.00 | +1.00 | −0.03 | – | −0.75 |
| 28 | Wukong | +0.72 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.66 |
| 29 | Aatrox | +0.72 | +1.00 | +1.00 | +1.00 | −0.10 | – | −0.77 |
| 30 | Olaf | +0.72 | +1.00 | +1.00 | +1.00 | −0.14 | – | −0.68 |
| 31 | Kayle | +0.65 | +1.00 | +1.00 | +0.06 | +0.43 | +1.00 | −0.48 |
| 32 | Aurora | +0.61 | +1.00 | +1.00 | +1.00 | +0.07 | −1.00 | −0.03 |
| 33 | Elise | +0.60 | +1.00 | +1.00 | +1.00 | +0.30 | −1.00 | −0.93 |
| 34 | Milio | +0.57 | +0.98 | +1.00 | −0.01 | +0.44 | +0.49 | −0.86 |
| 35 | Yone | +0.56 | +1.00 | +1.00 | +0.08 | +0.06 | – | −0.37 |
| 36 | Mordekaiser | +0.54 | +0.83 | +0.97 | +0.45 | −0.25 | – | −0.35 |
| 37 | Morgana | +0.53 | +0.87 | +0.86 | +0.18 | +0.20 | +0.40 | −0.08 |
| 38 | Twisted Fate | +0.50 | +1.00 | +1.00 | −0.71 | +0.36 | +1.00 | −0.27 |
| 39 | Anivia | +0.48 | +1.00 | +0.58 | +0.12 | −0.32 | +0.86 | +0.43 |
| 40 | Singed | +0.47 | +0.01 | +1.00 | +1.00 | −0.16 | – | −0.14 |
| 41 | Sion | +0.43 | +0.70 | +0.70 | +0.00 | +0.10 | – | +0.53 |
| 42 | Zilean | +0.42 | +0.45 | +0.39 | +1.00 | +0.23 | −0.18 | −0.07 |
| 43 | Braum | +0.39 | −0.04 | +0.79 | +1.00 | −0.10 | – | −0.45 |
| 44 | Warwick | +0.36 | +1.00 | +1.00 | −1.00 | +0.12 | – | +0.13 |
| 45 | Camille | +0.34 | +1.00 | +1.00 | −1.00 | −0.15 | – | +0.61 |
| 46 | Viego | +0.33 | +1.00 | +1.00 | −1.00 | +0.24 | – | −0.70 |
| 47 | Kog'Maw | +0.33 | +1.00 | +0.21 | +0.00 | +0.36 | +0.00 | −0.63 |
| 48 | Nocturne | +0.29 | +0.12 | +0.12 | +1.00 | −0.15 | – | +0.47 |
| 49 | Ashe | +0.29 | +1.00 | +1.00 | −1.00 | +0.47 | −1.00 | +0.29 |
| 50 | Rakan | +0.27 | +0.11 | +0.75 | −0.33 | +0.07 | +1.00 | +0.17 |
| 51 | Bard | +0.27 | +1.00 | +1.00 | −0.96 | +0.44 | −1.00 | −0.11 |
| 52 | Miss Fortune | +0.25 | +1.00 | +1.00 | −1.00 | +0.47 | −1.00 | −0.42 |
| 53 | Udyr | +0.23 | +1.00 | −1.00 | +1.00 | +0.07 | – | −0.00 |
| 54 | Bel'Veth | +0.21 | +1.00 | −1.00 | +1.00 | −0.00 | – | −0.27 |
| 55 | Karma | +0.19 | +0.92 | +0.98 | −1.00 | +0.16 | −1.00 | −0.16 |
| 56 | Lulu | +0.18 | +0.02 | +0.21 | +1.00 | +0.14 | −1.00 | +0.01 |
| 57 | Xayah | +0.17 | −1.00 | +1.00 | +0.07 | +0.41 | +1.00 | −0.21 |
| 58 | Renekton | +0.16 | +1.00 | −1.00 | +1.00 | −0.22 | – | −0.51 |
| 59 | Graves | +0.10 | −1.00 | +1.00 | +1.00 | +0.29 | −1.00 | −0.95 |
| 60 | Brand | +0.09 | +0.85 | +0.86 | −1.00 | +0.00 | −1.00 | −0.82 |
| 61 | Corki | +0.08 | −0.65 | −0.33 | +1.00 | +0.42 | +1.00 | −0.74 |
| 62 | Zac | −0.07 | −0.70 | +0.32 | +0.23 | −0.13 | – | +0.05 |
| 63 | Neeko | −0.11 | +0.84 | −0.98 | −0.60 | +0.33 | +0.19 | −0.56 |
| 64 | Kalista | −0.12 | +1.00 | −1.00 | −1.00 | +0.13 | +1.00 | −0.90 |
| 65 | Heimerdinger | −0.15 | −1.00 | −0.91 | +1.00 | +0.17 | +1.00 | +0.00 |
| 66 | Jayce | −0.16 | +1.00 | −0.99 | −0.95 | +0.40 | – | −0.33 |
| 67 | Vi | −0.29 | −1.00 | +1.00 | −1.00 | −0.18 | – | −0.63 |
| 68 | Vel'Koz | −0.30 | −0.79 | +0.58 | −1.00 | +0.42 | −1.00 | −0.28 |
| 69 | Quinn | −0.34 | −0.61 | −0.61 | −0.63 | +0.24 | +1.00 | −0.97 |
| 70 | Hwei | −0.44 | −1.00 | −1.00 | −0.14 | +0.08 | +0.93 | −0.34 |
| 71 | Varus | −0.44 | −0.84 | +0.27 | −1.00 | +0.04 | −1.00 | −0.10 |
| 72 | Syndra | −0.47 | −0.55 | −0.55 | −0.55 | +0.09 | −0.59 | −0.84 |
| 73 | Taric | −0.50 | +0.00 | −1.00 | −1.00 | +0.04 | – | −0.04 |
| 74 | Kled | −0.53 | −0.46 | −0.45 | −1.00 | −0.14 | – | −0.46 |
| 75 | Ahri | −0.59 | −0.85 | −0.51 | −1.00 | +0.33 | −1.00 | +0.04 |
| 76 | Orianna | −0.62 | −1.00 | −0.72 | −0.44 | +0.21 | −1.00 | −0.58 |
| 77 | Tristana | −0.64 | −1.00 | −1.00 | −0.91 | −0.10 | +1.00 | −0.88 |
| 78 | Cho'Gath | −0.65 | −0.71 | −0.70 | −1.00 | +0.03 | – | −0.73 |
| 79 | Janna | −0.66 | −0.94 | −0.60 | −1.00 | +0.28 | −0.96 | −0.34 |
| 80 | Cassiopeia | −0.67 | −0.78 | −1.00 | −0.88 | +0.30 | −1.00 | +0.06 |
| 81 | Annie | −0.71 | −0.89 | −0.99 | −0.94 | +0.28 | −1.00 | +0.16 |
| 82 | Jarvan IV | −0.73 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.46 |
| 83 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.32 |
| 84 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.46 | −1.00 | −0.20 |
| 85 | Kennen | −0.74 | −1.00 | −0.95 | −1.00 | +0.20 | −0.90 | +0.06 |
| 86 | Azir | −0.75 | −0.99 | −0.94 | −1.00 | +0.23 | −0.99 | −0.11 |
| 87 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.01 |
| 88 | Yunara | −0.76 | −1.00 | −1.00 | −1.00 | +0.50 | −1.00 | −0.67 |
| 89 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.18 | – | −0.21 |
| 90 | Lissandra | −0.76 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.32 |
| 91 | Sett | −0.76 | −1.00 | −1.00 | −0.89 | +0.05 | – | −0.31 |
| 92 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.10 |
| 93 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.21 |
| 94 | Ziggs | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.03 |
| 95 | Tahm Kench | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.01 |
| 96 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.43 |
| 97 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.02 |
| 98 | Ezreal | −0.77 | −0.92 | −0.92 | −1.00 | +0.15 | −1.00 | −0.66 |
| 99 | Jinx | −0.77 | −1.00 | −1.00 | −0.99 | +0.27 | −1.00 | −0.33 |
| 100 | Ryze | −0.77 | −0.95 | −1.00 | −1.00 | +0.12 | −1.00 | −0.10 |
| 101 | Malphite | −0.77 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.10 |
| 102 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.36 |
| 103 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.17 |
| 104 | Sylas | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.26 |
| 105 | Lillia | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.37 |
| 106 | Gragas | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.08 |
| 107 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.21 | −1.00 | −0.23 |
| 108 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | – | −0.40 |
| 109 | Senna | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.20 |
| 110 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.20 |
| 111 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.14 |
| 112 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.25 |
| 113 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | −0.46 |
| 114 | Veigar | −0.79 | −0.99 | −1.00 | −1.00 | +0.07 | −1.00 | −0.03 |
| 115 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.45 |
| 116 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.38 |
| 117 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.16 |
| 118 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.25 |
| 119 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.18 |
| 120 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.44 |
| 121 | Nunu & Willump | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.62 |
| 122 | Samira | −0.80 | −0.99 | −0.99 | −1.00 | +0.15 | −1.00 | −0.48 |
| 123 | Briar | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.18 |
| 124 | Dr. Mundo | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.03 |
| 125 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | −0.33 |
| 126 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.29 | −1.00 | −0.83 |
| 127 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.10 |
| 128 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | +0.30 | −1.00 | −0.90 |
| 129 | Jhin | −0.80 | −1.00 | −1.00 | −0.99 | +0.22 | −1.00 | −0.65 |
| 130 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.32 |
| 131 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.35 |
| 132 | Lux | −0.80 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.57 |
| 133 | Zyra | −0.80 | −0.99 | −0.99 | −1.00 | +0.14 | −1.00 | −0.55 |
| 134 | Rek'Sai | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.40 |
| 135 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.43 |
| 136 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.21 |
| 137 | Zeri | −0.80 | −0.99 | −0.95 | −1.00 | −0.02 | −0.95 | −0.39 |
| 138 | Mel | −0.80 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.69 |
| 139 | Nami | −0.81 | −1.00 | −0.98 | −1.00 | +0.23 | −0.98 | −0.99 |
| 140 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.28 |
| 141 | Irelia | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.53 |
| 142 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.28 |
| 143 | Kayn | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.01 |
| 144 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.53 |
| 145 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.74 |
| 146 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.25 |
| 147 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.41 |
| 148 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.71 |
| 149 | Karthus | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.14 |
| 150 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.54 |
| 151 | Rell | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.38 |
| 152 | Zed | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.17 |
| 153 | Fizz | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.60 |
| 154 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.74 |
| 155 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.70 |
| 156 | Nautilus | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | −0.23 |
| 157 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.82 |
| 158 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.93 |
| 159 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.27 | – | −0.06 |
| 160 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | – | −0.41 |
| 161 | Talon | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.74 |
| 162 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.96 |
| 163 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.91 |
| 164 | Zoe | −0.84 | −1.00 | −0.99 | −1.00 | −0.00 | −1.00 | −0.79 |
| 165 | Kindred | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.96 |
| 166 | Blitzcrank | −0.85 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.55 |
| 167 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.27 | – | −0.60 |
| 168 | Qiyana | −0.86 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.79 |
| 169 | Akali | −0.86 | −1.00 | −1.00 | −1.00 | −0.33 | – | −0.54 |
| 170 | Thresh | −0.86 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.68 |
| 171 | Vladimir | −0.86 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | −0.54 |
| 172 | Ekko | −0.87 | −1.00 | −1.00 | −1.00 | −0.34 | – | −0.66 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Gwen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Gwen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Gwen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.72)

- **0.44** range: Sivir's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Sivir basic attacks → Gwen basic attacks)
- **0.28** spell shield: Spell Shield's spell shield blocks part of Gwen's Needlework. Spell shield for 1.5 s, long enough to use ahead of Needlework. A spell shield blocks only the first enemy ability that reaches it. Spell shield blocks only one needle. (Sivir E Spell Shield → Gwen R Needlework)

#### 2. Kayle (net +0.48)

- **0.36** range: Kayle's basic attacks reach 475 units farther than Gwen's (625 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kayle basic attacks → Gwen basic attacks)
- **0.28** invulnerable: Divine Judgment makes Kayle invulnerable to Gwen's Needlework (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Needlework. (Kayle R Divine Judgment → Gwen R Needlework)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Kayle's Starfire Spellblade.

#### 3. Twitch (net +0.43)

- **0.43** range: Twitch's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Twitch basic attacks → Gwen basic attacks)

#### 4. Xayah (net +0.37)

- **0.48** untargetable: Featherstorm makes Xayah untargetable, dodging Gwen's Needlework. Untargetable for 1.5 s, long enough to use ahead of Needlework. (Xayah R Featherstorm → Gwen R Needlework)
- **0.36** range: Xayah's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Xayah basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Xayah's Featherstorm.

#### 5. Kai'Sa (net +0.36)

- **0.36** range: Kai'Sa's basic attacks reach 375 units farther than Gwen's (525 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Kai'Sa basic attacks → Gwen basic attacks)

#### 6. Yunara (net +0.36)

- **0.36** range: Yunara's basic attacks reach 425 units farther than Gwen's (575 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yunara basic attacks → Gwen basic attacks)

#### 7. Aurora (net +0.35)

- **0.48** untargetable: Between Worlds makes Aurora untargetable, dodging Gwen's Needlework. Untargetable for 0.4 s; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Gwen R Needlework)
- **0.29** range: Aurora's basic attacks reach 400 units farther than Gwen's (550 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Aurora basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Aurora's Between Worlds.

#### 8. Yuumi (net +0.30)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Gwen's Needlework. Untargetable for ?; Needlework takes 0.31 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Gwen R Needlework)
- **0.30** range: Yuumi's basic attacks reach 275 units farther than Gwen's (425 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Yuumi basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Yuumi's Final Chapter.

#### 9. Samira (net +0.26)

- **0.55** projectile block: Blade Whirl blocks Gwen's Needlework, a projectile. Blade Whirl for 0.75 s; Needlework takes 0.31 s to land, enough to react. (Samira W Blade Whirl → Gwen R Needlework)
- **0.28** range: Samira's basic attacks reach 350 units farther than Gwen's (500 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Samira basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Samira's Wild Rush.

#### 10. Vladimir (net +0.25)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Gwen's Needlework. Untargetable for 2 s, long enough to use ahead of Needlework. (Vladimir W Sanguine Pool → Gwen R Needlework)
- **0.16** range: Vladimir's basic attacks reach 300 units farther than Gwen's (450 vs 150 attack range). Gwen closes the gap with Skip 'n Slash. (Vladimir basic attacks → Gwen basic attacks)
- Watch out: Hallowed Mist makes Gwen untargetable, dodging Vladimir's Hemoplague.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.72 | 0.72 | 0.00 |  |
| 2 | Kayle | +0.48 | 0.64 | 0.16 |  |
| 3 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 4 | Xayah | +0.37 | 0.84 | 0.47 |  |
| 5 | Kai'Sa | +0.36 | 0.36 | 0.00 |  |
| 6 | Yunara | +0.36 | 0.36 | 0.00 |  |
| 7 | Aurora | +0.35 | 0.77 | 0.42 |  |
| 8 | Yuumi | +0.30 | 0.85 | 0.55 |  |
| 9 | Samira | +0.26 | 0.83 | 0.57 | projectile block (Blade Whirl) |
| 10 | Vladimir | +0.25 | 0.71 | 0.46 |  |
| 11 | Master Yi | +0.21 | 0.69 | 0.48 |  |
| 12 | Twisted Fate | +0.15 | 0.40 | 0.25 |  |
| 13 | Kindred | +0.14 | 0.44 | 0.30 |  |
| 14 | Teemo | +0.10 | 0.79 | 0.69 | blind (Blinding Dart) |
| 15 | Fiora | +0.09 | 0.60 | 0.51 |  |
| 16 | Bard | +0.02 | 0.89 | 0.87 |  |
| 17 | Mel | +0.02 | 0.82 | 0.80 | projectile block (Rebuttal) |
| 18 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 19 | Nidalee | -0.02 | 0.28 | 0.30 |  |
| 20 | Kog'Maw | -0.03 | 0.25 | 0.28 |  |
| 21 | Jinx | -0.04 | 0.67 | 0.71 | dash stop (Flame Chompers!) |
| 22 | Zilean | -0.04 | 0.32 | 0.36 |  |
| 23 | Lulu | -0.05 | 0.70 | 0.75 |  |
| 24 | Milio | -0.05 | 0.46 | 0.51 |  |
| 25 | Zed | -0.06 | 0.48 | 0.54 |  |
| 26 | Lissandra | -0.07 | 0.87 | 0.94 |  |
| 27 | Kayn | -0.08 | 0.55 | 0.63 |  |
| 28 | Nasus | -0.08 | 0.36 | 0.44 |  |
| 29 | Singed | -0.09 | 0.57 | 0.66 |  |
| 30 | Vex | -0.10 | 0.60 | 0.70 |  |
| 31 | Quinn | -0.10 | 0.36 | 0.46 |  |
| 32 | Zeri | -0.11 | 0.44 | 0.55 |  |
| 33 | Olaf | -0.14 | 0.14 | 0.28 |  |
| 34 | Miss Fortune | -0.15 | 0.32 | 0.47 |  |
| 35 | Dr. Mundo | -0.16 | 0.00 | 0.16 |  |
| 36 | Akshan | -0.23 | 0.32 | 0.55 |  |
| 37 | Corki | -0.23 | 0.32 | 0.55 |  |
| 38 | Malzahar | -0.24 | 0.45 | 0.69 |  |
| 39 | Braum | -0.25 | 0.55 | 0.80 | projectile block (Unbreakable) |
| 40 | Viktor | -0.26 | 0.66 | 0.92 |  |
| 41 | LeBlanc | -0.28 | 0.21 | 0.49 |  |
| 42 | Kalista | -0.29 | 0.39 | 0.68 |  |
| 43 | Zoe | -0.29 | 0.32 | 0.61 |  |
| 44 | Veigar | -0.30 | 0.59 | 0.89 |  |
| 45 | Vayne | -0.30 | 0.43 | 0.73 |  |
| 46 | Udyr | -0.32 | 0.14 | 0.46 |  |
| 47 | Shaco | -0.34 | 0.55 | 0.89 |  |
| 48 | Lucian | -0.34 | 0.34 | 0.68 |  |
| 49 | Taric | -0.34 | 0.00 | 0.34 |  |
| 50 | Yasuo | -0.35 | 0.55 | 0.90 | projectile block (Wind Wall) |
| 51 | Katarina | -0.35 | 0.12 | 0.47 |  |
| 52 | Hwei | -0.36 | 0.63 | 0.99 | dash stop (Grim Visage) |
| 53 | Smolder | -0.37 | 0.32 | 0.69 |  |
| 54 | Karthus | -0.37 | 0.18 | 0.55 |  |
| 55 | Ahri | -0.38 | 0.60 | 0.98 |  |
| 56 | Ezreal | -0.38 | 0.32 | 0.70 |  |
| 57 | Jayce | -0.38 | 0.28 | 0.66 |  |
| 58 | Soraka | -0.38 | 0.27 | 0.65 |  |
| 59 | Ryze | -0.39 | 0.24 | 0.63 |  |
| 60 | Varus | -0.41 | 0.39 | 0.80 |  |
| 61 | Pantheon | -0.43 | 0.28 | 0.71 |  |
| 62 | Vel'Koz | -0.43 | 0.25 | 0.68 |  |
| 63 | Yorick | -0.43 | 0.00 | 0.43 |  |
| 64 | Fizz | -0.44 | 0.55 | 0.99 |  |
| 65 | Ashe | -0.44 | 0.36 | 0.80 |  |
| 66 | Elise | -0.44 | 0.32 | 0.76 |  |
| 67 | Caitlyn | -0.45 | 0.36 | 0.81 |  |
| 68 | Shen | -0.45 | 0.36 | 0.81 |  |
| 69 | Nilah | -0.46 | 0.42 | 0.88 |  |
| 70 | Kennen | -0.46 | 0.29 | 0.75 |  |
| 71 | Xerath | -0.46 | 0.25 | 0.71 |  |
| 72 | Cassiopeia | -0.47 | 0.60 | 1.07 |  |
| 73 | Sion | -0.47 | 0.14 | 0.61 |  |
| 74 | Sona | -0.48 | 0.41 | 0.89 |  |
| 75 | Graves | -0.48 | 0.22 | 0.70 |  |
| 76 | Karma | -0.48 | 0.21 | 0.69 |  |
| 77 | Kha'Zix | -0.48 | 0.00 | 0.48 |  |
| 78 | Morgana | -0.49 | 0.32 | 0.81 |  |
| 79 | Jax | -0.50 | 0.38 | 0.88 |  |
| 80 | Draven | -0.52 | 0.36 | 0.88 |  |
| 81 | Lux | -0.52 | 0.29 | 0.81 |  |
| 82 | Sylas | -0.52 | 0.00 | 0.52 |  |
| 83 | Ivern | -0.53 | 0.18 | 0.71 |  |
| 84 | Garen | -0.53 | 0.15 | 0.68 |  |
| 85 | Camille | -0.54 | 0.51 | 1.05 |  |
| 86 | Tristana | -0.54 | 0.36 | 0.90 |  |
| 87 | Heimerdinger | -0.55 | 0.26 | 0.81 |  |
| 88 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 89 | Rek'Sai | -0.56 | 0.55 | 1.11 |  |
| 90 | Janna | -0.56 | 0.36 | 0.92 |  |
| 91 | Warwick | -0.56 | 0.27 | 0.83 |  |
| 92 | Gangplank | -0.57 | 0.11 | 0.68 |  |
| 93 | Rengar | -0.57 | 0.11 | 0.68 |  |
| 94 | Poppy | -0.60 | 0.50 | 1.10 | dash stop (Steadfast Presence) |
| 95 | Aatrox | -0.60 | 0.00 | 0.60 |  |
| 96 | Brand | -0.62 | 0.22 | 0.84 |  |
| 97 | Senna | -0.63 | 0.32 | 0.95 |  |
| 98 | Annie | -0.63 | 0.22 | 0.85 |  |
| 99 | Kassadin | -0.65 | 0.00 | 0.65 |  |
| 100 | Talon | -0.65 | 0.00 | 0.65 |  |
| 101 | Jhin | -0.66 | 0.27 | 0.93 |  |
| 102 | Aphelios | -0.67 | 0.44 | 1.11 |  |
| 103 | Aurelion Sol | -0.67 | 0.22 | 0.89 |  |
| 104 | Wukong | -0.67 | 0.00 | 0.67 |  |
| 105 | Ziggs | -0.69 | 0.27 | 0.96 |  |
| 106 | Bel'Veth | -0.69 | 0.00 | 0.69 |  |
| 107 | Renekton | -0.69 | 0.00 | 0.69 |  |
| 108 | Swain | -0.70 | 0.20 | 0.90 |  |
| 109 | Fiddlesticks | -0.70 | 0.18 | 0.88 |  |
| 110 | Lillia | -0.70 | 0.10 | 0.80 |  |
| 111 | Mordekaiser | -0.70 | 0.09 | 0.79 |  |
| 112 | Illaoi | -0.70 | 0.00 | 0.70 |  |
| 113 | Gnar | -0.71 | 0.31 | 1.02 |  |
| 114 | Orianna | -0.71 | 0.25 | 0.96 |  |
| 115 | Maokai | -0.72 | 0.55 | 1.27 |  |
| 116 | Azir | -0.72 | 0.25 | 0.97 |  |
| 117 | Syndra | -0.73 | 0.22 | 0.95 |  |
| 118 | Renata Glasc | -0.75 | 0.38 | 1.13 |  |
| 119 | Anivia | -0.76 | 0.24 | 1.00 |  |
| 120 | Nocturne | -0.78 | 0.28 | 1.06 |  |
| 121 | Seraphine | -0.80 | 0.27 | 1.07 |  |
| 122 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 123 | Alistar | -0.81 | 0.11 | 0.92 |  |
| 124 | Shyvana | -0.81 | 0.00 | 0.81 |  |
| 125 | Evelynn | -0.82 | 0.55 | 1.37 |  |
| 126 | Thresh | -0.82 | 0.18 | 1.00 |  |
| 127 | Nunu & Willump | -0.82 | 0.17 | 0.99 |  |
| 128 | Riven | -0.82 | 0.00 | 0.82 |  |
| 129 | Zyra | -0.83 | 0.24 | 1.07 |  |
| 130 | Neeko | -0.84 | 0.22 | 1.06 |  |
| 131 | Zac | -0.87 | 0.40 | 1.27 | dash stop (Stretching Strikes) |
| 132 | Skarner | -0.87 | 0.07 | 0.94 |  |
| 133 | Irelia | -0.87 | 0.00 | 0.87 |  |
| 134 | Locke | -0.87 | 0.00 | 0.87 |  |
| 135 | Rammus | -0.88 | 0.36 | 1.24 |  |
| 136 | Cho'Gath | -0.88 | 0.00 | 0.88 |  |
| 137 | Sett | -0.89 | 0.00 | 0.89 |  |
| 138 | Nami | -0.90 | 0.22 | 1.12 |  |
| 139 | Akali | -0.90 | 0.00 | 0.90 |  |
| 140 | Naafiri | -0.90 | 0.00 | 0.90 |  |
| 141 | Diana | -0.91 | 0.00 | 0.91 |  |
| 142 | Xin Zhao | -0.93 | 0.24 | 1.17 |  |
| 143 | Malphite | -0.95 | 0.24 | 1.19 |  |
| 144 | Trundle | -0.95 | 0.00 | 0.95 |  |
| 145 | Blitzcrank | -0.96 | 0.00 | 0.96 |  |
| 146 | Darius | -0.96 | 0.00 | 0.96 |  |
| 147 | Kled | -1.00 | 0.22 | 1.22 |  |
| 148 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 149 | Amumu | -1.01 | 0.19 | 1.20 |  |
| 150 | Galio | -1.02 | 0.00 | 1.02 |  |
| 151 | Urgot | -1.04 | 0.13 | 1.17 |  |
| 152 | Rakan | -1.06 | 0.11 | 1.17 |  |
| 153 | Yone | -1.08 | 0.19 | 1.27 |  |
| 154 | Zaahen | -1.10 | 0.14 | 1.24 |  |
| 155 | Nautilus | -1.10 | 0.00 | 1.10 |  |
| 156 | Taliyah | -1.12 | 0.25 | 1.37 |  |
| 157 | Leona | -1.16 | 0.00 | 1.16 |  |
| 158 | Ekko | -1.17 | 0.00 | 1.17 |  |
| 159 | Qiyana | -1.18 | 0.00 | 1.18 |  |
| 160 | Volibear | -1.19 | 0.00 | 1.19 |  |
| 161 | Tahm Kench | -1.20 | 0.00 | 1.20 |  |
| 162 | Vi | -1.22 | 0.00 | 1.22 |  |
| 163 | Hecarim | -1.23 | 0.00 | 1.23 |  |
| 164 | Gragas | -1.24 | 0.00 | 1.24 |  |
| 165 | Jarvan IV | -1.24 | 0.00 | 1.24 |  |
| 166 | Pyke | -1.25 | 0.00 | 1.25 |  |
| 167 | Sejuani | -1.29 | 0.00 | 1.29 |  |
| 168 | Viego | -1.34 | 0.00 | 1.34 |  |
| 169 | Rell | -1.36 | 0.00 | 1.36 |  |
| 170 | Briar | -1.37 | 0.00 | 1.37 |  |
| 171 | Ornn | -1.43 | 0.00 | 1.43 |  |
| 172 | K'Sante | -1.47 | 0.00 | 1.47 |  |
