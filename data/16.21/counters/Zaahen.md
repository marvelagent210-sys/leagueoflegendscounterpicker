# Counters to Zaahen (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Zaahen: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Zaahen wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Zaahen --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Sivir | +0.85 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.35 |
| 2 | Teemo | +0.85 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.29 |
| 3 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | −0.08 |
| 4 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.19 |
| 5 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.68 |
| 6 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.05 |
| 7 | Karma | +0.76 | +0.99 | +0.98 | +0.95 | −0.05 | +0.92 | −0.05 |
| 8 | Olaf | +0.75 | +1.00 | +1.00 | +1.00 | −0.11 | – | −0.09 |
| 9 | Aphelios | +0.75 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | −0.74 |
| 10 | Quinn | +0.73 | +1.00 | +1.00 | +0.85 | −0.01 | +0.85 | −0.55 |
| 11 | Morgana | +0.72 | +1.00 | +1.00 | +0.92 | −0.09 | +0.58 | −0.23 |
| 12 | Nocturne | +0.56 | +0.19 | +1.00 | +1.00 | −0.17 | – | +0.68 |
| 13 | Xayah | +0.53 | +1.00 | +1.00 | −0.06 | +0.34 | −0.06 | −0.07 |
| 14 | Lulu | +0.49 | +0.65 | +1.00 | +0.81 | +0.23 | −1.00 | −0.28 |
| 15 | Viktor | +0.45 | +1.00 | +1.00 | +0.28 | +0.09 | −1.00 | −0.36 |
| 16 | Jax | +0.38 | +0.23 | +1.00 | +0.00 | +0.10 | – | +0.40 |
| 17 | Nilah | +0.35 | +1.00 | +0.00 | +0.00 | +0.39 | – | +0.14 |
| 18 | Kayle | +0.27 | +0.04 | +1.00 | −0.49 | +0.39 | +0.58 | −0.10 |
| 19 | Wukong | +0.14 | +1.00 | −1.00 | +1.00 | −0.30 | – | −0.50 |
| 20 | Trundle | +0.09 | +1.00 | −1.00 | +0.23 | −0.01 | – | +0.71 |
| 21 | Singed | +0.06 | +0.11 | +0.12 | +0.12 | −0.09 | – | −0.16 |
| 22 | Fiora | +0.04 | −0.01 | −0.20 | −0.01 | +0.35 | – | +0.88 |
| 23 | Aurora | +0.02 | −1.00 | +0.15 | +1.00 | +0.16 | +0.23 | −0.28 |
| 24 | Gangplank | −0.02 | −1.00 | +0.10 | +1.00 | +0.07 | – | −0.14 |
| 25 | Darius | −0.04 | +1.00 | −0.53 | −0.73 | −0.00 | – | −0.12 |
| 26 | Kennen | −0.05 | −0.11 | −1.00 | +0.69 | −0.00 | +1.00 | −0.24 |
| 27 | Kalista | −0.13 | −0.39 | −0.04 | −0.63 | +0.13 | +1.00 | −0.33 |
| 28 | Yorick | −0.18 | −1.00 | +1.00 | −1.00 | −0.04 | – | +0.82 |
| 29 | Zilean | −0.19 | +0.22 | +0.19 | −1.00 | +0.12 | −1.00 | −0.15 |
| 30 | Draven | −0.20 | +0.37 | +0.07 | −1.00 | +0.03 | −1.00 | −0.27 |
| 31 | Anivia | −0.22 | −0.07 | −0.49 | −0.13 | −0.15 | −0.07 | −0.45 |
| 32 | Shyvana | −0.25 | −0.46 | +0.28 | −1.00 | +0.06 | – | +0.20 |
| 33 | Zeri | −0.26 | −1.00 | +0.41 | −1.00 | −0.11 | +1.00 | +0.18 |
| 34 | Brand | −0.30 | +0.09 | −0.04 | −1.00 | +0.07 | −1.00 | −0.38 |
| 35 | Azir | −0.30 | −1.00 | +1.00 | −1.00 | +0.08 | −1.00 | −0.25 |
| 36 | Twisted Fate | −0.30 | −0.12 | −0.21 | −1.00 | +0.12 | −0.25 | −0.25 |
| 37 | Illaoi | −0.33 | −1.00 | −1.00 | +1.00 | +0.01 | – | −0.03 |
| 38 | Yunara | −0.37 | −0.27 | −0.24 | −1.00 | +0.32 | −0.58 | −0.73 |
| 39 | Corki | −0.38 | −0.68 | +0.21 | −1.00 | +0.26 | −1.00 | −0.08 |
| 40 | Bel'Veth | −0.40 | −1.00 | −1.00 | +0.97 | −0.20 | – | −0.38 |
| 41 | Milio | −0.42 | −1.00 | +0.68 | −1.00 | +0.00 | −1.00 | −0.72 |
| 42 | Ashe | −0.45 | −0.53 | −0.27 | −1.00 | +0.26 | −1.00 | +0.16 |
| 43 | Kai'Sa | −0.46 | −0.21 | −0.33 | −1.00 | −0.25 | −0.65 | −0.41 |
| 44 | Annie | −0.46 | −1.00 | +0.28 | −1.00 | +0.23 | −1.00 | −0.29 |
| 45 | Vel'Koz | −0.49 | −0.63 | −0.21 | −1.00 | +0.22 | −1.00 | −0.19 |
| 46 | Udyr | −0.49 | −1.00 | −0.17 | −1.00 | +0.05 | – | +0.83 |
| 47 | Cassiopeia | −0.50 | +0.07 | −1.00 | −1.00 | +0.16 | −1.00 | +0.14 |
| 48 | Varus | −0.53 | −0.67 | −0.33 | −1.00 | +0.11 | −1.00 | −0.03 |
| 49 | Rakan | −0.54 | −1.00 | −0.28 | −0.98 | +0.08 | −0.64 | +0.45 |
| 50 | Kog'Maw | −0.58 | −1.00 | −0.27 | −1.00 | +0.34 | −1.00 | −0.24 |
| 51 | Elise | −0.59 | −0.53 | −0.53 | −1.00 | −0.14 | −1.00 | −0.01 |
| 52 | Riven | −0.59 | −0.76 | −1.00 | −0.66 | +0.17 | – | +0.28 |
| 53 | Lillia | −0.59 | −1.00 | −1.00 | −1.00 | −0.10 | +1.00 | +0.43 |
| 54 | Tristana | −0.61 | −1.00 | −1.00 | −0.60 | +0.27 | +0.10 | −0.74 |
| 55 | Ambessa | −0.62 | −1.00 | −0.56 | −1.00 | +0.13 | – | +0.33 |
| 56 | Vex | −0.62 | −1.00 | −1.00 | −0.17 | +0.10 | −1.00 | +0.02 |
| 57 | Heimerdinger | −0.63 | −1.00 | −1.00 | −0.50 | +0.15 | −0.33 | −0.31 |
| 58 | Yone | −0.63 | −1.00 | −0.53 | −1.00 | −0.06 | – | +0.43 |
| 59 | Yasuo | −0.65 | −0.92 | −0.80 | −1.00 | +0.14 | – | +0.43 |
| 60 | Xin Zhao | −0.66 | −0.71 | −0.88 | −1.00 | −0.01 | – | +0.14 |
| 61 | Zyra | −0.67 | −0.49 | −0.91 | −1.00 | −0.14 | −1.00 | +0.06 |
| 62 | Warwick | −0.68 | −0.84 | −0.84 | −1.00 | −0.02 | – | +0.23 |
| 63 | Poppy | −0.69 | −1.00 | −1.00 | −1.00 | +0.40 | – | +0.37 |
| 64 | Bard | −0.70 | −1.00 | −0.47 | −1.00 | +0.08 | −1.00 | −0.99 |
| 65 | Rengar | −0.70 | −1.00 | −1.00 | −1.00 | +0.26 | – | +0.53 |
| 66 | Master Yi | −0.72 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.81 |
| 67 | Neeko | −0.73 | −0.85 | −0.78 | −1.00 | −0.05 | −1.00 | −0.20 |
| 68 | Malphite | −0.73 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.65 |
| 69 | Jinx | −0.73 | −0.79 | −0.79 | −1.00 | +0.00 | −1.00 | −0.77 |
| 70 | Pantheon | −0.73 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.34 |
| 71 | Jarvan IV | −0.73 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.54 |
| 72 | Viego | −0.73 | −1.00 | −1.00 | −0.83 | −0.03 | – | +0.19 |
| 73 | Graves | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | −0.27 | −0.92 |
| 74 | Jayce | −0.74 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.23 |
| 75 | Hecarim | −0.74 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.18 |
| 76 | Ornn | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.04 |
| 77 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.22 |
| 78 | Diana | −0.75 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.21 |
| 79 | Naafiri | −0.75 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.35 |
| 80 | Sion | −0.75 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.29 |
| 81 | Camille | −0.75 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.74 |
| 82 | Sett | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.03 |
| 83 | Sylas | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.03 |
| 84 | Aurelion Sol | −0.76 | −1.00 | −1.00 | −1.00 | +0.44 | −1.00 | −0.48 |
| 85 | Kled | −0.76 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.43 |
| 86 | Hwei | −0.77 | −1.00 | −0.87 | −1.00 | +0.07 | −1.00 | −0.18 |
| 87 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.68 |
| 88 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.31 |
| 89 | Cho'Gath | −0.77 | −1.00 | −0.99 | −1.00 | +0.13 | – | −0.27 |
| 90 | Volibear | −0.77 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.30 |
| 91 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.17 |
| 92 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.52 |
| 93 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.31 |
| 94 | Garen | −0.77 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.18 |
| 95 | Lucian | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.35 |
| 96 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.44 |
| 97 | Taric | −0.77 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.02 |
| 98 | Gnar | −0.78 | −1.00 | −1.00 | −1.00 | +0.27 | −1.00 | −0.31 |
| 99 | Mordekaiser | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.17 |
| 100 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.01 |
| 101 | Irelia | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.15 |
| 102 | Dr. Mundo | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.17 |
| 103 | Gwen | −0.78 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.46 |
| 104 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.14 |
| 105 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.12 |
| 106 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.21 |
| 107 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.06 |
| 108 | Tryndamere | −0.78 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.38 |
| 109 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.13 |
| 110 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.28 |
| 111 | Aatrox | −0.78 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.50 |
| 112 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.18 |
| 113 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.04 |
| 114 | Akali | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.10 |
| 115 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.10 |
| 116 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.28 |
| 117 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.12 |
| 118 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.07 |
| 119 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.23 |
| 120 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.04 |
| 121 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.21 | – | +0.40 |
| 122 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.30 |
| 123 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.28 |
| 124 | Orianna | −0.79 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.43 |
| 125 | Rumble | −0.79 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.13 |
| 126 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.21 |
| 127 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.03 |
| 128 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.23 |
| 129 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.03 |
| 130 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.17 |
| 131 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.35 |
| 132 | Tahm Kench | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.08 |
| 133 | Jhin | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.32 |
| 134 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.07 |
| 135 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.50 |
| 136 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.17 |
| 137 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.28 |
| 138 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.06 |
| 139 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.09 |
| 140 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.31 |
| 141 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.20 |
| 142 | Nami | −0.80 | −0.98 | −1.00 | −1.00 | +0.10 | −1.00 | −0.46 |
| 143 | Lissandra | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.01 |
| 144 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.17 |
| 145 | Zac | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | −0.01 |
| 146 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.46 |
| 147 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.53 |
| 148 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.32 |
| 149 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.14 |
| 150 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.29 |
| 151 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.45 |
| 152 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.31 |
| 153 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.33 |
| 154 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.05 |
| 155 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.34 |
| 156 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.34 |
| 157 | Janna | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.34 |
| 158 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.67 |
| 159 | Malzahar | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.61 |
| 160 | Senna | −0.83 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −0.13 |
| 161 | Vi | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.34 |
| 162 | Briar | −0.84 | −1.00 | −1.00 | −1.00 | −0.35 | – | +0.02 |
| 163 | Lux | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.23 |
| 164 | Urgot | −0.84 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.56 |
| 165 | Mel | −0.84 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.44 |
| 166 | Taliyah | −0.84 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.29 |
| 167 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.18 |
| 168 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.42 |
| 169 | Ryze | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.90 |
| 170 | Fiddlesticks | −0.85 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | +0.12 |
| 171 | Renata Glasc | −0.88 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.91 |
| 172 | Thresh | −0.92 | −1.00 | −1.00 | −1.00 | −0.63 | −1.00 | −0.57 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Zaahen's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Zaahen's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Zaahen` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Kayle (net +1.21)

- **0.90** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Grim Deliverance. Invulnerable for 2.5 s, long enough to use ahead of Grim Deliverance. (Kayle R Divine Judgment → Zaahen R Grim Deliverance)
- **0.24** range: Kayle's basic attacks reach 450 units farther than Zaahen's (625 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Kayle basic attacks → Zaahen basic attacks)
- **0.17** invulnerable: Divine Judgment makes Kayle invulnerable to Zaahen's Dreaded Return (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Dreaded Return. (Kayle R Divine Judgment → Zaahen W Dreaded Return)
- Watch out: Grim Deliverance makes Zaahen immune to Kayle's Radiant Blast (slow).

#### 2. Vladimir (net +1.18)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 2 s, long enough to use ahead of Grim Deliverance. (Vladimir W Sanguine Pool → Zaahen R Grim Deliverance)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's Dreaded Return. Untargetable for 2 s, long enough to use ahead of Dreaded Return. (Vladimir W Sanguine Pool → Zaahen W Dreaded Return)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 2 s, long enough to use ahead of The Darkin Glaive. (Vladimir W Sanguine Pool → Zaahen Q The Darkin Glaive)
- Watch out: The Darkin Glaive's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Sivir (net +1.11)

- **0.56** spell shield: Spell Shield's spell shield blocks Zaahen's Dreaded Return. Spell shield for 1.5 s, long enough to use ahead of Dreaded Return. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Zaahen W Dreaded Return)
- **0.45** spell shield: Spell Shield's spell shield blocks part of Zaahen's Grim Deliverance. Spell shield for 1.5 s, long enough to use ahead of Grim Deliverance. A spell shield blocks only the first enemy ability that reaches it. Spell shield will block the damage but not the heal. (Sivir E Spell Shield → Zaahen R Grim Deliverance)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Zaahen's (500 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Sivir basic attacks → Zaahen basic attacks)

#### 4. Fiora (net +1.10)

- **0.90** parry: Riposte parries Zaahen's Grim Deliverance. Parry for 0.75 s; Grim Deliverance takes 0.5 s to land, enough to react. (Fiora W Riposte → Zaahen R Grim Deliverance)
- **0.70** parry: Riposte parries Zaahen's Dreaded Return and stuns back. Parry for 0.75 s; Dreaded Return takes 0.79 s to land, enough to react. Negating Dreaded Return's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen W Dreaded Return)
- **0.36** parry: Riposte parries Zaahen's The Darkin Glaive and stuns back. Parry for 0.75 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating The Darkin Glaive's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Fiora's Riposte (cripple, slow, stun).

#### 5. Gwen (net +1.10)

- **0.90** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Grim Deliverance. Untargetable for ?; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen R Grim Deliverance)
- **0.56** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's Dreaded Return. Untargetable for ?; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen W Dreaded Return)
- **0.25** untargetable: Hallowed Mist makes Gwen untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for ?; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Gwen's Needlework (slow).

#### 6. Xayah (net +1.06)

- **0.79** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 1.5 s, long enough to use ahead of Grim Deliverance. (Xayah R Featherstorm → Zaahen R Grim Deliverance)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's Dreaded Return. Untargetable for 1.5 s, long enough to use ahead of Dreaded Return. (Xayah R Featherstorm → Zaahen W Dreaded Return)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 1.5 s, long enough to use ahead of The Darkin Glaive. (Xayah R Featherstorm → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Xayah's Bladecaller (root).

#### 7. Aurora (net +1.05)

- **0.79** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.4 s; Grim Deliverance takes 0.5 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen R Grim Deliverance)
- **0.33** untargetable: Between Worlds makes Aurora untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.4 s; Dreaded Return takes 0.79 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Zaahen W Dreaded Return)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Zaahen's (550 vs 175 attack range). Zaahen closes the gap with Aureate Rush, Grim Deliverance. (Aurora basic attacks → Zaahen basic attacks)
- Watch out: Grim Deliverance makes Zaahen immune to Aurora's Between Worlds (slow).

#### 8. Singed (net +1.00)

- **0.44** grounding: Mega Adhesive grounds Zaahen, who then can't cast Grim Deliverance. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Zaahen R Grim Deliverance)
- **0.39** grounding: Mega Adhesive grounds Zaahen, who then can't cast Aureate Rush. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Zaahen E Aureate Rush)
- **0.36** anti-heal: Insanity Potion's Grievous Wounds cuts Zaahen's healing from Grim Deliverance by 40%. (Singed R Insanity Potion → Zaahen R Grim Deliverance)
- Watch out: Grim Deliverance makes Zaahen immune to Singed's Fling (airborne, root).

#### 9. Rek'Sai (net +0.97)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 1.5 s, long enough to use ahead of Grim Deliverance. (Rek'Sai R Void Rush → Zaahen R Grim Deliverance)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's Dreaded Return. Untargetable for 1.5 s, long enough to use ahead of Dreaded Return. (Rek'Sai R Void Rush → Zaahen W Dreaded Return)
- **0.31** untargetable: Void Rush makes Rek'Sai untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 1.5 s, long enough to use ahead of The Darkin Glaive. (Rek'Sai R Void Rush → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Rek'Sai's Unburrow (airborne).

#### 10. Zed (net +0.97)

- **0.79** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's Grim Deliverance. Untargetable for 0.6 s; Grim Deliverance takes 0.5 s to land, enough to react. (Zed R Death Mark → Zaahen R Grim Deliverance)
- **0.33** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's Dreaded Return. Untargetable for 0.6 s; Dreaded Return takes 0.79 s to land, enough to react. (Zed R Death Mark → Zaahen W Dreaded Return)
- **0.18** untargetable: Death Mark makes Zed untargetable, dodging Zaahen's The Darkin Glaive. Untargetable for 0.6 s; The Darkin Glaive lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Zed R Death Mark → Zaahen Q The Darkin Glaive)
- Watch out: Grim Deliverance makes Zaahen immune to Zed's Shadow Slash (slow).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Kayle | +1.21 | 1.26 | 0.05 |  |
| 2 | Vladimir | +1.18 | 1.41 | 0.23 |  |
| 3 | Sivir | +1.11 | 1.11 | 0.00 |  |
| 4 | Fiora | +1.10 | 1.35 | 0.25 |  |
| 5 | Gwen | +1.10 | 1.24 | 0.14 |  |
| 6 | Xayah | +1.06 | 1.25 | 0.19 |  |
| 7 | Aurora | +1.05 | 1.20 | 0.15 |  |
| 8 | Singed | +1.00 | 1.39 | 0.39 | grounding (Mega Adhesive) |
| 9 | Rek'Sai | +0.97 | 1.17 | 0.20 |  |
| 10 | Zed | +0.97 | 1.00 | 0.03 |  |
| 11 | Nocturne | +0.83 | 1.16 | 0.33 |  |
| 12 | Master Yi | +0.81 | 1.24 | 0.43 |  |
| 13 | Evelynn | +0.78 | 1.12 | 0.34 |  |
| 14 | Udyr | +0.76 | 1.05 | 0.29 |  |
| 15 | Shaco | +0.73 | 1.12 | 0.39 |  |
| 16 | Teemo | +0.71 | 0.87 | 0.16 | blind (Blinding Dart), blind (Blinding Dart) |
| 17 | Yuumi | +0.55 | 1.54 | 0.99 |  |
| 18 | Jax | +0.54 | 0.74 | 0.20 | attack dodge (Counter Strike) |
| 19 | Gangplank | +0.53 | 0.70 | 0.17 |  |
| 20 | Fizz | +0.51 | 1.34 | 0.83 |  |
| 21 | Samira | +0.48 | 0.69 | 0.21 | projectile block (Blade Whirl) |
| 22 | Rengar | +0.45 | 0.78 | 0.33 |  |
| 23 | Olaf | +0.45 | 0.50 | 0.05 |  |
| 24 | Bard | +0.44 | 1.36 | 0.92 |  |
| 25 | Lissandra | +0.39 | 1.31 | 0.92 |  |
| 26 | Mel | +0.31 | 0.64 | 0.33 | projectile block (Rebuttal) |
| 27 | Vex | +0.31 | 0.63 | 0.32 |  |
| 28 | Jinx | +0.29 | 0.52 | 0.23 |  |
| 29 | Nasus | +0.28 | 0.33 | 0.05 |  |
| 30 | Milio | +0.24 | 0.57 | 0.33 |  |
| 31 | Camille | +0.23 | 1.08 | 0.85 |  |
| 32 | Zeri | +0.23 | 0.28 | 0.05 |  |
| 33 | Kindred | +0.22 | 0.27 | 0.05 |  |
| 34 | Twitch | +0.22 | 0.27 | 0.05 |  |
| 35 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 36 | Morgana | +0.21 | 0.93 | 0.72 |  |
| 37 | Maokai | +0.20 | 1.33 | 1.13 |  |
| 38 | Corki | +0.20 | 0.20 | 0.00 |  |
| 39 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 40 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 41 | Yunara | +0.16 | 0.24 | 0.08 |  |
| 42 | Ahri | +0.12 | 0.46 | 0.34 |  |
| 43 | Illaoi | +0.12 | 0.18 | 0.06 |  |
| 44 | Garen | +0.11 | 0.18 | 0.07 |  |
| 45 | Veigar | +0.10 | 0.45 | 0.35 |  |
| 46 | Kog'Maw | +0.10 | 0.16 | 0.06 |  |
| 47 | Graves | +0.08 | 0.14 | 0.06 |  |
| 48 | Nilah | +0.06 | 0.54 | 0.48 |  |
| 49 | Yasuo | +0.03 | 0.58 | 0.55 | projectile block (Wind Wall) |
| 50 | Xin Zhao | -0.01 | 0.91 | 0.92 |  |
| 51 | Viktor | -0.02 | 0.50 | 0.52 |  |
| 52 | Kalista | -0.03 | 0.57 | 0.60 |  |
| 53 | Akali | -0.03 | 0.00 | 0.03 |  |
| 54 | Lulu | -0.04 | 0.52 | 0.56 |  |
| 55 | Talon | -0.05 | 0.00 | 0.05 |  |
| 56 | Katarina | -0.06 | 0.50 | 0.56 |  |
| 57 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 58 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 59 | Vayne | -0.07 | 0.27 | 0.34 |  |
| 60 | Kha'Zix | -0.07 | 0.00 | 0.07 |  |
| 61 | Hwei | -0.08 | 0.49 | 0.57 |  |
| 62 | Kennen | -0.08 | 0.18 | 0.26 |  |
| 63 | LeBlanc | -0.09 | 0.13 | 0.22 |  |
| 64 | Kayn | -0.11 | 1.12 | 1.23 |  |
| 65 | Cassiopeia | -0.11 | 0.76 | 0.87 | grounding (Miasma) |
| 66 | Annie | -0.11 | 0.15 | 0.26 |  |
| 67 | Elise | -0.13 | 0.20 | 0.33 |  |
| 68 | Zilean | -0.14 | 0.20 | 0.34 |  |
| 69 | Senna | -0.15 | 0.22 | 0.37 |  |
| 70 | Zoe | -0.15 | 0.20 | 0.35 |  |
| 71 | Kassadin | -0.15 | 0.00 | 0.15 |  |
| 72 | Jayce | -0.17 | 0.18 | 0.35 |  |
| 73 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 74 | Lux | -0.18 | 0.18 | 0.36 |  |
| 75 | Renekton | -0.19 | 0.00 | 0.19 |  |
| 76 | Pantheon | -0.20 | 1.09 | 1.29 |  |
| 77 | Alistar | -0.20 | 0.40 | 0.60 |  |
| 78 | Taric | -0.21 | 0.00 | 0.21 |  |
| 79 | Soraka | -0.22 | 0.17 | 0.39 |  |
| 80 | Braum | -0.24 | 0.70 | 0.94 | projectile block (Unbreakable) |
| 81 | Varus | -0.24 | 0.68 | 0.92 |  |
| 82 | Smolder | -0.24 | 0.20 | 0.44 |  |
| 83 | Volibear | -0.24 | 0.18 | 0.42 |  |
| 84 | Brand | -0.24 | 0.14 | 0.38 |  |
| 85 | Yorick | -0.24 | 0.00 | 0.24 |  |
| 86 | Swain | -0.26 | 0.12 | 0.38 |  |
| 87 | Ekko | -0.26 | 0.00 | 0.26 |  |
| 88 | Ziggs | -0.28 | 0.17 | 0.45 |  |
| 89 | Sion | -0.30 | 0.52 | 0.82 |  |
| 90 | Mordekaiser | -0.31 | 0.08 | 0.39 |  |
| 91 | Shyvana | -0.33 | 0.18 | 0.51 |  |
| 92 | Karma | -0.33 | 0.13 | 0.46 |  |
| 93 | Lucian | -0.35 | 0.21 | 0.56 |  |
| 94 | Akshan | -0.37 | 0.19 | 0.56 |  |
| 95 | Bel'Veth | -0.37 | 0.00 | 0.37 |  |
| 96 | Anivia | -0.38 | 0.16 | 0.54 |  |
| 97 | Darius | -0.38 | 0.00 | 0.38 |  |
| 98 | Trundle | -0.38 | 0.00 | 0.38 |  |
| 99 | Heimerdinger | -0.39 | 0.12 | 0.51 |  |
| 100 | Cho'Gath | -0.39 | 0.00 | 0.39 |  |
| 101 | Irelia | -0.40 | 0.00 | 0.40 |  |
| 102 | Miss Fortune | -0.42 | 0.20 | 0.62 |  |
| 103 | Aatrox | -0.42 | 0.00 | 0.42 |  |
| 104 | Quinn | -0.45 | 0.22 | 0.67 |  |
| 105 | Ashe | -0.46 | 0.24 | 0.70 |  |
| 106 | Riven | -0.47 | 0.00 | 0.47 |  |
| 107 | Wukong | -0.48 | 0.00 | 0.48 |  |
| 108 | Gnar | -0.49 | 0.19 | 0.68 |  |
| 109 | Thresh | -0.49 | 0.11 | 0.60 |  |
| 110 | Blitzcrank | -0.49 | 0.00 | 0.49 |  |
| 111 | Karthus | -0.51 | 0.11 | 0.62 |  |
| 112 | Sylas | -0.51 | 0.00 | 0.51 |  |
| 113 | Malzahar | -0.52 | 0.82 | 1.34 |  |
| 114 | Sona | -0.54 | 0.26 | 0.80 |  |
| 115 | Draven | -0.56 | 0.22 | 0.78 |  |
| 116 | Sett | -0.59 | 0.18 | 0.77 |  |
| 117 | Tristana | -0.60 | 0.24 | 0.84 |  |
| 118 | Ivern | -0.60 | 0.11 | 0.71 |  |
| 119 | Locke | -0.61 | 0.00 | 0.61 |  |
| 120 | Malphite | -0.64 | 0.39 | 1.03 |  |
| 121 | Twisted Fate | -0.64 | 0.25 | 0.89 |  |
| 122 | Orianna | -0.66 | 0.16 | 0.82 |  |
| 123 | Azir | -0.67 | 0.16 | 0.83 |  |
| 124 | Syndra | -0.68 | 0.14 | 0.82 |  |
| 125 | Kled | -0.69 | 0.47 | 1.16 |  |
| 126 | Caitlyn | -0.69 | 0.24 | 0.93 |  |
| 127 | Shen | -0.70 | 0.70 | 1.40 | attack block (Spirit's Refuge) |
| 128 | Lee Sin | -0.70 | 0.00 | 0.70 |  |
| 129 | Aphelios | -0.74 | 0.24 | 0.98 |  |
| 130 | Renata Glasc | -0.75 | 0.24 | 0.99 |  |
| 131 | Vel'Koz | -0.78 | 0.16 | 0.94 |  |
| 132 | Lillia | -0.78 | 0.05 | 0.83 |  |
| 133 | Seraphine | -0.80 | 0.17 | 0.97 |  |
| 134 | Diana | -0.80 | 0.00 | 0.80 |  |
| 135 | Zyra | -0.81 | 0.16 | 0.97 |  |
| 136 | Jhin | -0.82 | 0.17 | 0.99 |  |
| 137 | Nami | -0.82 | 0.14 | 0.96 |  |
| 138 | Poppy | -0.83 | 0.57 | 1.40 | dash stop (Steadfast Presence) |
| 139 | Neeko | -0.83 | 0.14 | 0.97 |  |
| 140 | Xerath | -0.85 | 0.16 | 1.01 |  |
| 141 | Yone | -0.86 | 0.36 | 1.22 |  |
| 142 | Amumu | -0.87 | 0.18 | 1.05 |  |
| 143 | Ryze | -0.88 | 0.15 | 1.03 |  |
| 144 | Urgot | -0.89 | 0.08 | 0.97 |  |
| 145 | Skarner | -0.89 | 0.00 | 0.89 |  |
| 146 | Hecarim | -0.94 | 0.19 | 1.13 |  |
| 147 | Leona | -0.95 | 0.00 | 0.95 |  |
| 148 | Qiyana | -0.97 | 0.00 | 0.97 |  |
| 149 | K'Sante | -0.98 | 0.35 | 1.33 |  |
| 150 | Rakan | -0.98 | 0.06 | 1.04 |  |
| 151 | Jarvan IV | -1.01 | 0.18 | 1.19 |  |
| 152 | Ambessa | -1.01 | 0.00 | 1.01 |  |
| 153 | Nautilus | -1.06 | 0.00 | 1.06 |  |
| 154 | Aurelion Sol | -1.08 | 0.14 | 1.22 |  |
| 155 | Ornn | -1.10 | 0.18 | 1.28 |  |
| 156 | Naafiri | -1.13 | 0.00 | 1.13 |  |
| 157 | Sejuani | -1.13 | 0.00 | 1.13 |  |
| 158 | Rell | -1.17 | 0.00 | 1.17 |  |
| 159 | Fiddlesticks | -1.21 | 0.11 | 1.32 |  |
| 160 | Briar | -1.22 | 0.00 | 1.22 |  |
| 161 | Janna | -1.25 | 0.22 | 1.47 |  |
| 162 | Warwick | -1.33 | 0.67 | 2.00 |  |
| 163 | Gragas | -1.35 | 0.00 | 1.35 |  |
| 164 | Rammus | -1.39 | 0.32 | 1.71 |  |
| 165 | Viego | -1.50 | 0.18 | 1.68 |  |
| 166 | Pyke | -1.51 | 0.00 | 1.51 |  |
| 167 | Nunu & Willump | -1.52 | 0.00 | 1.52 |  |
| 168 | Zac | -1.65 | 0.40 | 2.05 | dash stop (Stretching Strikes) |
| 169 | Vi | -1.81 | 0.18 | 1.99 |  |
| 170 | Taliyah | -2.01 | 0.16 | 2.17 |  |
| 171 | Galio | -2.06 | 0.00 | 2.06 |  |
| 172 | Tahm Kench | -2.07 | 0.00 | 2.07 |  |
