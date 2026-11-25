# Counters to Kayle (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Kayle: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Kayle wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Kayle --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Jax | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.45 |
| 2 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.85 |
| 3 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.99 |
| 4 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | −0.17 | +1.00 | +0.87 |
| 5 | Master Yi | +0.80 | +1.00 | +1.00 | +1.00 | −0.35 | +1.00 | +1.00 |
| 6 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.41 |
| 7 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.05 |
| 8 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.53 | +1.00 | +0.93 |
| 9 | Poppy | +0.76 | +1.00 | +1.00 | +1.00 | −0.33 | +1.00 | +0.22 |
| 10 | Fiora | +0.71 | +1.00 | +1.00 | +1.00 | −0.20 | +0.03 | +0.70 |
| 11 | Diana | +0.62 | +1.00 | +1.00 | +1.00 | +0.15 | −1.00 | −0.04 |
| 12 | Kog'Maw | +0.60 | +1.00 | +1.00 | +0.00 | −0.06 | +1.00 | +0.20 |
| 13 | Tahm Kench | +0.54 | +0.62 | +0.61 | +0.95 | −0.11 | +0.60 | +0.03 |
| 14 | Anivia | +0.49 | −0.04 | +1.00 | +1.00 | −0.16 | – | +0.43 |
| 15 | Kassadin | +0.47 | +1.00 | +0.28 | +1.00 | −0.22 | −0.45 | +0.56 |
| 16 | Camille | +0.44 | +1.00 | −0.36 | +1.00 | −0.22 | +1.00 | +0.32 |
| 17 | Vi | +0.43 | +1.00 | −0.39 | +1.00 | −0.16 | +1.00 | −0.05 |
| 18 | Yasuo | +0.38 | +0.60 | +0.26 | +0.87 | −0.23 | +0.03 | +0.38 |
| 19 | Renekton | +0.34 | +1.00 | −0.26 | +1.00 | −0.19 | −0.46 | +0.53 |
| 20 | Malphite | +0.30 | −1.00 | +1.00 | +1.00 | −0.20 | +1.00 | +0.51 |
| 21 | Lee Sin | +0.29 | −1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.16 |
| 22 | Zeri | +0.26 | +1.00 | −1.00 | +1.00 | +0.05 | – | +0.53 |
| 23 | Gangplank | +0.24 | +0.57 | −0.64 | +1.00 | −0.03 | +0.23 | +0.85 |
| 24 | Udyr | +0.23 | +1.00 | −0.56 | +1.00 | −0.40 | −0.58 | +0.87 |
| 25 | Wukong | +0.06 | +1.00 | −1.00 | +1.00 | −0.42 | −1.00 | +0.49 |
| 26 | Graves | −0.20 | −1.00 | −1.00 | +1.00 | +0.00 | +1.00 | −0.06 |
| 27 | Nocturne | −0.20 | −1.00 | +0.00 | +1.00 | −0.56 | −1.00 | +0.63 |
| 28 | Volibear | −0.21 | +0.41 | −1.00 | +0.41 | −0.44 | −1.00 | +0.31 |
| 29 | Zaahen | −0.27 | −1.00 | −0.04 | +0.49 | −0.39 | −0.58 | +0.10 |
| 30 | Irelia | −0.32 | −0.16 | −1.00 | +0.38 | −0.11 | −1.00 | +0.17 |
| 31 | Pantheon | −0.35 | +0.00 | +0.00 | −1.00 | −0.40 | −1.00 | +0.20 |
| 32 | Heimerdinger | −0.35 | −1.00 | −1.00 | +1.00 | −0.12 | – | +0.02 |
| 33 | Aphelios | −0.39 | −0.63 | −0.65 | +0.00 | −0.09 | – | −0.38 |
| 34 | Rumble | −0.40 | −1.00 | −1.00 | +1.00 | −0.19 | −1.00 | +0.63 |
| 35 | Cho'Gath | −0.44 | −1.00 | −1.00 | +1.00 | −0.24 | −1.00 | −0.02 |
| 36 | Bel'Veth | −0.44 | −1.00 | −1.00 | +1.00 | −0.24 | −1.00 | −0.06 |
| 37 | Warwick | −0.47 | −1.00 | −1.00 | +1.00 | −0.52 | −1.00 | +0.22 |
| 38 | Sion | −0.49 | −1.00 | −1.00 | +0.47 | −0.17 | −1.00 | +0.79 |
| 39 | Mordekaiser | −0.54 | −0.53 | −0.53 | −0.79 | −0.27 | −0.89 | +0.20 |
| 40 | Annie | −0.59 | −1.00 | −1.00 | +0.01 | −0.30 | – | +0.22 |
| 41 | Azir | −0.60 | −1.00 | −1.00 | −1.00 | −0.02 | +1.00 | +0.06 |
| 42 | Riven | −0.60 | −1.00 | −1.00 | +0.00 | −0.15 | −1.00 | +0.38 |
| 43 | Gnar | −0.65 | −1.00 | −1.00 | −0.02 | −0.37 | −1.00 | +0.21 |
| 44 | Gwen | −0.65 | −1.00 | −1.00 | −0.06 | −0.43 | −1.00 | +0.48 |
| 45 | Twitch | −0.69 | −0.61 | −1.00 | −1.00 | −0.07 | – | −0.18 |
| 46 | Aurelion Sol | −0.70 | −1.00 | −1.00 | −1.00 | +0.49 | – | −0.05 |
| 47 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.57 |
| 48 | Teemo | −0.74 | −1.00 | −1.00 | −0.60 | −0.29 | −1.00 | +0.53 |
| 49 | Garen | −0.75 | −0.74 | −1.00 | −1.00 | −0.12 | −1.00 | −0.01 |
| 50 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.71 |
| 51 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.22 |
| 52 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.03 |
| 53 | Corki | −0.76 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.09 |
| 54 | Kennen | −0.77 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.39 |
| 55 | Miss Fortune | −0.77 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.33 |
| 56 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.24 |
| 57 | Tristana | −0.78 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.28 |
| 58 | Varus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.07 |
| 59 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.03 |
| 60 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.09 |
| 61 | Ashe | −0.78 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.31 |
| 62 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.44 |
| 63 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.25 |
| 64 | Lucian | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.54 |
| 65 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.34 |
| 66 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.18 |
| 67 | Jayce | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.59 |
| 68 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.12 |
| 69 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.23 |
| 70 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.12 |
| 71 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.56 |
| 72 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.06 |
| 73 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.30 |
| 74 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.12 |
| 75 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −0.84 | −0.30 |
| 76 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.07 |
| 77 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.06 |
| 78 | Shen | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.19 |
| 79 | Galio | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.16 |
| 80 | Skarner | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.10 |
| 81 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.48 |
| 82 | Neeko | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.04 |
| 83 | Braum | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.11 |
| 84 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.10 |
| 85 | Lulu | −0.80 | −1.00 | −1.00 | −0.90 | −0.28 | – | +0.01 |
| 86 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.23 |
| 87 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.29 |
| 88 | Jhin | −0.80 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.19 |
| 89 | Hwei | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.35 |
| 90 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.07 |
| 91 | Vayne | −0.80 | −1.00 | −1.00 | −1.00 | −0.40 | – | +0.73 |
| 92 | Orianna | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.09 |
| 93 | Nami | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.12 |
| 94 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | −0.22 | – | +0.16 |
| 95 | Nilah | −0.81 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.61 |
| 96 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.04 |
| 97 | Nautilus | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.13 |
| 98 | Maokai | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.02 |
| 99 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.07 |
| 100 | Yunara | −0.81 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.50 |
| 101 | Swain | −0.81 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −0.18 |
| 102 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | −0.13 | – | −0.18 |
| 103 | Sylas | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.08 |
| 104 | Sett | −0.81 | −0.95 | −1.00 | −0.95 | −0.29 | −1.00 | +0.23 |
| 105 | Taric | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.08 |
| 106 | Elise | −0.81 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.17 |
| 107 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.24 |
| 108 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.08 |
| 109 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.19 |
| 110 | Alistar | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.04 |
| 111 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | −0.05 |
| 112 | Malzahar | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.08 |
| 113 | Lillia | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.52 |
| 114 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.04 |
| 115 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.27 |
| 116 | Gragas | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.07 |
| 117 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.07 |
| 118 | Evelynn | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | −0.10 |
| 119 | Rammus | −0.82 | −1.00 | −1.00 | −1.00 | −0.33 | −1.00 | +0.56 |
| 120 | Vel'Koz | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.01 |
| 121 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.24 |
| 122 | Veigar | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | −0.12 |
| 123 | Soraka | −0.82 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.68 |
| 124 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.18 |
| 125 | Sivir | −0.83 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.36 |
| 126 | Ornn | −0.83 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | −0.08 |
| 127 | Amumu | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.02 |
| 128 | Quinn | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | −0.29 |
| 129 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.10 |
| 130 | Karma | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.02 |
| 131 | Rek'Sai | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.04 |
| 132 | Seraphine | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.21 |
| 133 | Xayah | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.20 |
| 134 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | −1.00 | +0.21 |
| 135 | Zac | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.15 |
| 136 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.05 |
| 137 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.61 |
| 138 | Morgana | −0.83 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.26 |
| 139 | Twisted Fate | −0.83 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | −0.18 |
| 140 | Kled | −0.83 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | +0.52 |
| 141 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.10 |
| 142 | Blitzcrank | −0.84 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.11 |
| 143 | Akali | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.02 |
| 144 | Akshan | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.03 |
| 145 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | −0.06 |
| 146 | Zed | −0.84 | −1.00 | −1.00 | −1.00 | −0.47 | −1.00 | +0.60 |
| 147 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | −0.27 |
| 148 | Kalista | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.12 |
| 149 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | −0.38 | – | −0.01 |
| 150 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | −0.22 |
| 151 | Ambessa | −0.84 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.44 |
| 152 | Illaoi | −0.84 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | +0.17 |
| 153 | Hecarim | −0.85 | −1.00 | −1.00 | −1.00 | −0.44 | −1.00 | +0.35 |
| 154 | Urgot | −0.85 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.48 |
| 155 | Kayn | −0.85 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.14 |
| 156 | Ekko | −0.85 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.27 |
| 157 | Ivern | −0.85 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | −0.13 |
| 158 | Fiddlesticks | −0.85 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.48 |
| 159 | Milio | −0.85 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.37 |
| 160 | Qiyana | −0.85 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.04 |
| 161 | Yuumi | −0.86 | −1.00 | −1.00 | −1.00 | −0.44 | −1.00 | +0.20 |
| 162 | Shaco | −0.86 | −1.00 | −1.00 | −1.00 | −0.35 | −1.00 | −0.10 |
| 163 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.40 | −1.00 | +0.04 |
| 164 | Singed | −0.86 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | +0.04 |
| 165 | Pyke | −0.87 | −1.00 | −1.00 | −1.00 | −0.48 | −1.00 | +0.04 |
| 166 | Bard | −0.87 | −1.00 | −1.00 | −1.00 | −0.45 | −1.00 | −0.14 |
| 167 | Olaf | −0.88 | −1.00 | −1.00 | −1.00 | −0.50 | −1.00 | −0.04 |
| 168 | Viego | −0.88 | −1.00 | −1.00 | −1.00 | −0.60 | −1.00 | +0.22 |
| 169 | Shyvana | −0.89 | −1.00 | −1.00 | −1.00 | −0.60 | −1.00 | +0.08 |
| 170 | Xin Zhao | −0.89 | −1.00 | −1.00 | −1.00 | −0.43 | −1.00 | −0.54 |
| 171 | Aatrox | −0.91 | −1.00 | −1.00 | −1.00 | −0.66 | −1.00 | −0.31 |
| 172 | Yone | −0.92 | −1.00 | −1.00 | −1.00 | −0.66 | −1.00 | −0.50 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Kayle's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Kayle's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Kayle` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.11)

- **0.47** blind: Blinding Dart's blind makes Kayle's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Kayle basic attacks)
- **0.15** blind: Blinding Dart's blind makes Kayle's Starfire Spellblade, an empowered attack, miss. Blind for 3 s. Parry interactions:
  - Blind: The main target will never receive damage, but the secondary targets will receive the active's spell damage.
  - Block: Blocking will always negate all damage. Keep in mind that if a secondary target is outside of Spirit's Refuge zone, they won't block damage.
  - Dodge: Dodging will always negate all damage. (Teemo Q Blinding Dart → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Teemo's (625 vs 500 attack range).

#### 2. Lulu (net +0.10)

- **0.34** disarm: Whimsy disarms Kayle for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Kayle basic attacks)
- Watch out: Kayle's basic attacks reach 75 units farther than Lulu's (625 vs 550 attack range).

#### 3. Braum (net +0.06)

- **0.50** projectile block: Unbreakable blocks Kayle's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Kayle basic attacks)
- **0.45** projectile block: Unbreakable blocks Kayle's Radiant Blast, a projectile. Unbreakable for 4 s, long enough to use ahead of Radiant Blast. (Braum E Unbreakable → Kayle Q Radiant Blast)
- **0.38** projectile block: Unbreakable blocks Kayle's Starfire Spellblade, a projectile. Unbreakable for 4 s, long enough to use ahead of Starfire Spellblade. (Braum E Unbreakable → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Braum's Glacial Fissure (its crowd control still applies).

#### 4. Sivir (net +0.05)

- **0.27** spell shield: Spell Shield's spell shield blocks Kayle's Starfire Spellblade. Spell shield for 1.5 s, long enough to use ahead of Starfire Spellblade. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Sivir's (625 vs 500 attack range).

#### 5. Samira (net 0.00)

- **0.30** projectile block: Blade Whirl blocks Kayle's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Kayle basic attacks)
- **0.28** projectile block: Blade Whirl blocks Kayle's Radiant Blast, a projectile. Blade Whirl for 0.75 s; Radiant Blast takes 0.56 s to land, enough to react. (Samira W Blade Whirl → Kayle Q Radiant Blast)
- **0.15** projectile block: Blade Whirl blocks Kayle's Starfire Spellblade, a projectile. Blade Whirl for 0.75 s; Starfire Spellblade lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Samira W Blade Whirl → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Samira's Wild Rush.

#### 6. Yunara (net 0.00)

- No interaction in Yunara's favor.

#### 7. Bard (net -0.01)

- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Kayle's Starfire Spellblade. Untargetable for 2.5 s, long enough to use ahead of Starfire Spellblade. (Bard R Tempered Fate → Kayle E Starfire Spellblade)
- Watch out: Kayle's basic attacks reach 125 units farther than Bard's (625 vs 500 attack range).

#### 8. Shen (net -0.08)

- **0.36** attack block: Spirit's Refuge blocks Kayle's basic attacks (with Divine Ascent). Spirit's Refuge lasts 1.75 s on a 10 s cooldown. (Shen W Spirit's Refuge → Kayle basic attacks)
- **0.17** attack block: Spirit's Refuge blocks Kayle's Starfire Spellblade, an empowered attack. Spirit's Refuge lasts 1.75 s on a 10 s cooldown. Parry interactions:
  - Blind: The main target will never receive damage, but the secondary targets will receive the active's spell damage.
  - Block: Blocking will always negate all damage. Keep in mind that if a secondary target is outside of Spirit's Refuge zone, they won't block damage.
  - Dodge: Dodging will always negate all damage. : All parry interactions are marked for retesting because of patch V11.1 changes. (Shen W Spirit's Refuge → Kayle E Starfire Spellblade)
- Watch out: Divine Judgment makes Kayle invulnerable to Shen's Shadow Dash (its crowd control still applies).

#### 9. Kai'Sa (net -0.09)

- No interaction in Kai'Sa's favor.
- Watch out: Kayle's basic attacks reach 100 units farther than Kai'Sa's (625 vs 525 attack range).

#### 10. Kled (net -0.12)

- **0.05** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Kayle's Radiant Blast (slow). Immune for ?; Radiant Blast takes 0.56 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Kayle Q Radiant Blast)
- Watch out: Kayle's basic attacks reach 375 units farther than Kled's (625 vs 250 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.11 | 0.54 | 0.43 | blind (Blinding Dart) |
| 2 | Lulu | +0.10 | 0.34 | 0.24 |  |
| 3 | Braum | +0.06 | 0.82 | 0.76 | projectile block (Unbreakable), projectile block (Unbreakable) |
| 4 | Sivir | +0.05 | 0.27 | 0.22 |  |
| 5 | Samira | 0.00 | 0.48 | 0.48 |  |
| 6 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 7 | Bard | -0.01 | 0.20 | 0.21 |  |
| 8 | Shen | -0.08 | 0.45 | 0.53 |  |
| 9 | Kai'Sa | -0.09 | 0.00 | 0.09 |  |
| 10 | Kled | -0.12 | 0.05 | 0.17 |  |
| 11 | Twitch | -0.14 | 0.00 | 0.14 |  |
| 12 | Kalista | -0.16 | 0.04 | 0.20 |  |
| 13 | Yasuo | -0.18 | 0.62 | 0.80 |  |
| 14 | Yuumi | -0.19 | 0.27 | 0.46 |  |
| 15 | Kindred | -0.21 | 0.00 | 0.21 |  |
| 16 | Twisted Fate | -0.25 | 0.00 | 0.25 |  |
| 17 | Zoe | -0.25 | 0.00 | 0.25 |  |
| 18 | Aurora | -0.26 | 0.12 | 0.38 |  |
| 19 | Taliyah | -0.27 | 0.00 | 0.27 |  |
| 20 | Caitlyn | -0.28 | 0.00 | 0.28 |  |
| 21 | Milio | -0.29 | 0.06 | 0.35 |  |
| 22 | Mel | -0.30 | 0.47 | 0.77 |  |
| 23 | Zilean | -0.30 | 0.00 | 0.30 |  |
| 24 | Fiora | -0.31 | 0.22 | 0.53 |  |
| 25 | Renata Glasc | -0.32 | 0.00 | 0.32 |  |
| 26 | Soraka | -0.32 | 0.00 | 0.32 |  |
| 27 | Ashe | -0.34 | 0.00 | 0.34 |  |
| 28 | Varus | -0.34 | 0.00 | 0.34 |  |
| 29 | Lissandra | -0.35 | 0.20 | 0.55 |  |
| 30 | Heimerdinger | -0.35 | 0.05 | 0.40 |  |
| 31 | Anivia | -0.35 | 0.00 | 0.35 |  |
| 32 | LeBlanc | -0.35 | 0.00 | 0.35 |  |
| 33 | Akshan | -0.36 | 0.00 | 0.36 |  |
| 34 | Tryndamere | -0.36 | 0.00 | 0.36 |  |
| 35 | Udyr | -0.37 | 0.11 | 0.48 |  |
| 36 | Corki | -0.37 | 0.00 | 0.37 |  |
| 37 | Janna | -0.37 | 0.00 | 0.37 |  |
| 38 | Tristana | -0.38 | 0.14 | 0.52 |  |
| 39 | Ryze | -0.38 | 0.00 | 0.38 |  |
| 40 | Ivern | -0.39 | 0.00 | 0.39 |  |
| 41 | Gnar | -0.40 | 0.00 | 0.40 |  |
| 42 | Karma | -0.41 | 0.00 | 0.41 |  |
| 43 | Elise | -0.42 | 0.00 | 0.42 |  |
| 44 | Vex | -0.42 | 0.00 | 0.42 |  |
| 45 | Jayce | -0.43 | 0.00 | 0.43 |  |
| 46 | Quinn | -0.45 | 0.00 | 0.45 |  |
| 47 | Vayne | -0.45 | 0.00 | 0.45 |  |
| 48 | Nidalee | -0.46 | 0.00 | 0.46 |  |
| 49 | Gwen | -0.48 | 0.16 | 0.64 |  |
| 50 | Kog'Maw | -0.48 | 0.00 | 0.48 |  |
| 51 | Zyra | -0.49 | 0.00 | 0.49 |  |
| 52 | Pantheon | -0.52 | 0.27 | 0.79 |  |
| 53 | Bel'Veth | -0.52 | 0.00 | 0.52 |  |
| 54 | Rammus | -0.53 | 0.36 | 0.89 |  |
| 55 | Thresh | -0.53 | 0.00 | 0.53 |  |
| 56 | Vel'Koz | -0.55 | 0.00 | 0.55 |  |
| 57 | Nilah | -0.56 | 0.40 | 0.96 |  |
| 58 | Master Yi | -0.56 | 0.23 | 0.79 |  |
| 59 | Brand | -0.56 | 0.00 | 0.56 |  |
| 60 | Neeko | -0.56 | 0.00 | 0.56 |  |
| 61 | Viktor | -0.56 | 0.00 | 0.56 |  |
| 62 | Nocturne | -0.58 | 0.32 | 0.90 |  |
| 63 | Aatrox | -0.58 | 0.00 | 0.58 |  |
| 64 | Jhin | -0.58 | 0.00 | 0.58 |  |
| 65 | Lee Sin | -0.58 | 0.00 | 0.58 |  |
| 66 | Smolder | -0.58 | 0.00 | 0.58 |  |
| 67 | Zeri | -0.58 | 0.00 | 0.58 |  |
| 68 | Nasus | -0.59 | 0.36 | 0.95 |  |
| 69 | Fizz | -0.59 | 0.23 | 0.82 |  |
| 70 | Hwei | -0.60 | 0.00 | 0.60 |  |
| 71 | Xayah | -0.61 | 0.20 | 0.81 |  |
| 72 | Morgana | -0.61 | 0.08 | 0.69 |  |
| 73 | Aphelios | -0.61 | 0.05 | 0.66 |  |
| 74 | Veigar | -0.61 | 0.00 | 0.61 |  |
| 75 | Aurelion Sol | -0.62 | 0.00 | 0.62 |  |
| 76 | Azir | -0.62 | 0.00 | 0.62 |  |
| 77 | Lux | -0.62 | 0.00 | 0.62 |  |
| 78 | Shaco | -0.63 | 0.12 | 0.75 |  |
| 79 | Naafiri | -0.63 | 0.00 | 0.63 |  |
| 80 | Tahm Kench | -0.63 | 0.00 | 0.63 |  |
| 81 | Alistar | -0.64 | 0.04 | 0.68 |  |
| 82 | Kayn | -0.65 | 0.12 | 0.77 |  |
| 83 | Sona | -0.65 | 0.00 | 0.65 |  |
| 84 | Katarina | -0.66 | 0.00 | 0.66 |  |
| 85 | Sylas | -0.66 | 0.00 | 0.66 |  |
| 86 | Lillia | -0.67 | 0.00 | 0.67 |  |
| 87 | Riven | -0.67 | 0.00 | 0.67 |  |
| 88 | Seraphine | -0.67 | 0.00 | 0.67 |  |
| 89 | Rek'Sai | -0.68 | 0.20 | 0.88 |  |
| 90 | Cassiopeia | -0.68 | 0.00 | 0.68 |  |
| 91 | Jinx | -0.68 | 0.00 | 0.68 |  |
| 92 | Vladimir | -0.69 | 0.28 | 0.97 |  |
| 93 | Xin Zhao | -0.69 | 0.20 | 0.89 |  |
| 94 | Malzahar | -0.69 | 0.06 | 0.75 |  |
| 95 | Kennen | -0.69 | 0.00 | 0.69 |  |
| 96 | Nami | -0.69 | 0.00 | 0.69 |  |
| 97 | Orianna | -0.69 | 0.00 | 0.69 |  |
| 98 | Senna | -0.69 | 0.00 | 0.69 |  |
| 99 | Ziggs | -0.69 | 0.00 | 0.69 |  |
| 100 | Jax | -0.70 | 0.47 | 1.17 |  |
| 101 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 102 | Maokai | -0.71 | 0.21 | 0.92 |  |
| 103 | Kha'Zix | -0.71 | 0.00 | 0.71 |  |
| 104 | Rakan | -0.71 | 0.00 | 0.71 |  |
| 105 | Annie | -0.72 | 0.00 | 0.72 |  |
| 106 | Graves | -0.72 | 0.00 | 0.72 |  |
| 107 | Camille | -0.73 | 0.12 | 0.85 |  |
| 108 | Ezreal | -0.73 | 0.00 | 0.73 |  |
| 109 | Urgot | -0.73 | 0.00 | 0.73 |  |
| 110 | Ambessa | -0.74 | 0.00 | 0.74 |  |
| 111 | Malphite | -0.75 | 0.24 | 0.99 |  |
| 112 | Lucian | -0.76 | 0.00 | 0.76 |  |
| 113 | Jarvan IV | -0.77 | 0.00 | 0.77 |  |
| 114 | Mordekaiser | -0.79 | 0.09 | 0.88 |  |
| 115 | Yone | -0.79 | 0.00 | 0.79 |  |
| 116 | Viego | -0.80 | 0.00 | 0.80 |  |
| 117 | Miss Fortune | -0.81 | 0.00 | 0.81 |  |
| 118 | Xerath | -0.82 | 0.00 | 0.82 |  |
| 119 | Warwick | -0.83 | 0.05 | 0.88 |  |
| 120 | K'Sante | -0.84 | 0.00 | 0.84 |  |
| 121 | Briar | -0.85 | 0.00 | 0.85 |  |
| 122 | Hecarim | -0.85 | 0.00 | 0.85 |  |
| 123 | Leona | -0.85 | 0.00 | 0.85 |  |
| 124 | Rell | -0.85 | 0.00 | 0.85 |  |
| 125 | Swain | -0.85 | 0.00 | 0.85 |  |
| 126 | Ahri | -0.86 | 0.00 | 0.86 |  |
| 127 | Nautilus | -0.86 | 0.00 | 0.86 |  |
| 128 | Poppy | -0.86 | 0.00 | 0.86 |  |
| 129 | Qiyana | -0.86 | 0.00 | 0.86 |  |
| 130 | Volibear | -0.86 | 0.00 | 0.86 |  |
| 131 | Olaf | -0.87 | 0.05 | 0.92 |  |
| 132 | Karthus | -0.87 | 0.00 | 0.87 |  |
| 133 | Wukong | -0.87 | 0.00 | 0.87 |  |
| 134 | Ornn | -0.88 | 0.00 | 0.88 |  |
| 135 | Singed | -0.88 | 0.00 | 0.88 |  |
| 136 | Amumu | -0.89 | 0.00 | 0.89 |  |
| 137 | Talon | -0.89 | 0.00 | 0.89 |  |
| 138 | Taric | -0.89 | 0.00 | 0.89 |  |
| 139 | Galio | -0.90 | 0.00 | 0.90 |  |
| 140 | Irelia | -0.90 | 0.00 | 0.90 |  |
| 141 | Vi | -0.90 | 0.00 | 0.90 |  |
| 142 | Gragas | -0.91 | 0.00 | 0.91 |  |
| 143 | Kassadin | -0.91 | 0.00 | 0.91 |  |
| 144 | Dr. Mundo | -0.92 | 0.00 | 0.92 |  |
| 145 | Fiddlesticks | -0.92 | 0.00 | 0.92 |  |
| 146 | Zac | -0.92 | 0.00 | 0.92 |  |
| 147 | Sejuani | -0.93 | 0.00 | 0.93 |  |
| 148 | Diana | -0.96 | 0.00 | 0.96 |  |
| 149 | Yorick | -0.96 | 0.00 | 0.96 |  |
| 150 | Syndra | -0.97 | 0.00 | 0.97 |  |
| 151 | Garen | -0.98 | 0.12 | 1.10 |  |
| 152 | Draven | -0.98 | 0.00 | 0.98 |  |
| 153 | Renekton | -0.99 | 0.00 | 0.99 |  |
| 154 | Rumble | -1.00 | 0.00 | 1.00 |  |
| 155 | Sett | -1.00 | 0.00 | 1.00 |  |
| 156 | Rengar | -1.01 | 0.08 | 1.09 |  |
| 157 | Akali | -1.01 | 0.00 | 1.01 |  |
| 158 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 159 | Zed | -1.02 | 0.12 | 1.14 |  |
| 160 | Gangplank | -1.03 | 0.07 | 1.10 |  |
| 161 | Nunu & Willump | -1.04 | 0.13 | 1.17 |  |
| 162 | Locke | -1.06 | 0.00 | 1.06 |  |
| 163 | Illaoi | -1.07 | 0.00 | 1.07 |  |
| 164 | Sion | -1.09 | 0.05 | 1.14 |  |
| 165 | Skarner | -1.12 | 0.06 | 1.18 |  |
| 166 | Ekko | -1.15 | 0.00 | 1.15 |  |
| 167 | Zaahen | -1.21 | 0.05 | 1.26 |  |
| 168 | Evelynn | -1.28 | 0.12 | 1.40 |  |
| 169 | Cho'Gath | -1.31 | 0.00 | 1.31 |  |
| 170 | Darius | -1.32 | 0.00 | 1.32 |  |
| 171 | Trundle | -1.33 | 0.00 | 1.33 |  |
| 172 | Pyke | -1.49 | 0.00 | 1.49 |  |
