# Counters to Sion (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Sion: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Sion wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Sion --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Poppy | +0.83 | +1.00 | +1.00 | +1.00 | +0.27 | – | +0.19 |
| 2 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | +0.37 | – | −0.45 |
| 3 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | +0.08 | – | −0.23 |
| 4 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.06 |
| 5 | Kled | +0.77 | +1.00 | +1.00 | +1.00 | +0.05 | – | −0.20 |
| 6 | Warwick | +0.77 | +1.00 | +1.00 | +1.00 | +0.10 | – | −0.38 |
| 7 | K'Sante | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | −0.48 |
| 8 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.04 | – | −0.21 |
| 9 | Zaahen | +0.75 | +1.00 | +1.00 | +1.00 | −0.07 | – | −0.29 |
| 10 | Ivern | +0.74 | +1.00 | +1.00 | +1.00 | −0.23 | +1.00 | −0.60 |
| 11 | Udyr | +0.74 | +0.95 | +0.93 | +1.00 | −0.05 | – | −0.02 |
| 12 | Vayne | +0.73 | +1.00 | +0.76 | +1.00 | +0.07 | +1.00 | −0.39 |
| 13 | Aatrox | +0.72 | +1.00 | +1.00 | +1.00 | −0.13 | – | −0.69 |
| 14 | Teemo | +0.72 | +0.66 | +1.00 | +1.00 | +0.18 | +1.00 | −0.54 |
| 15 | Aphelios | +0.68 | +1.00 | +1.00 | +0.52 | +0.04 | +1.00 | −0.62 |
| 16 | Morgana | +0.67 | +1.00 | +0.97 | +0.50 | −0.06 | +0.92 | −0.01 |
| 17 | Jax | +0.66 | +1.00 | +1.00 | +0.50 | +0.02 | – | −0.17 |
| 18 | Dr. Mundo | +0.65 | +0.59 | +1.00 | +1.00 | −0.05 | – | −0.12 |
| 19 | Heimerdinger | +0.55 | +0.34 | +0.71 | +1.00 | +0.16 | +0.70 | −0.04 |
| 20 | Kayle | +0.49 | +1.00 | +1.00 | −0.47 | +0.17 | +1.00 | −0.79 |
| 21 | Taric | +0.44 | +0.35 | +0.37 | +1.00 | +0.07 | – | −0.01 |
| 22 | Olaf | +0.42 | +0.51 | +0.56 | +0.57 | −0.02 | – | −0.04 |
| 23 | Kog'Maw | +0.41 | +0.08 | +0.40 | +1.00 | +0.10 | +1.00 | −0.42 |
| 24 | Mordekaiser | +0.36 | +0.15 | +0.35 | +0.97 | +0.03 | – | +0.02 |
| 25 | Zac | +0.28 | +0.32 | +0.33 | +0.67 | −0.29 | – | +0.00 |
| 26 | Lulu | +0.26 | +0.96 | +0.45 | +0.00 | +0.06 | −1.00 | +0.00 |
| 27 | Renekton | +0.23 | +0.00 | +0.47 | +0.50 | −0.01 | – | −0.21 |
| 28 | Malzahar | +0.22 | −0.48 | +1.00 | +1.00 | +0.04 | −1.00 | −0.24 |
| 29 | Sett | +0.22 | −1.00 | +1.00 | +1.00 | +0.04 | – | −0.21 |
| 30 | Xin Zhao | +0.22 | +0.28 | +0.51 | +0.00 | +0.06 | – | −0.24 |
| 31 | Darius | +0.21 | −1.00 | +1.00 | +1.00 | +0.06 | – | −0.43 |
| 32 | Trundle | +0.19 | +0.04 | +0.66 | +0.00 | −0.08 | – | +0.16 |
| 33 | Quinn | +0.19 | +1.00 | +1.00 | −0.97 | +0.09 | −1.00 | −0.61 |
| 34 | Yasuo | +0.18 | +0.00 | +0.17 | +0.50 | +0.12 | – | +0.12 |
| 35 | Kennen | +0.13 | +0.34 | +0.53 | +0.03 | +0.02 | −0.95 | −0.06 |
| 36 | Anivia | +0.11 | +0.19 | +0.17 | +0.10 | −0.06 | +0.08 | −0.03 |
| 37 | Nocturne | +0.11 | +0.46 | +0.00 | +0.00 | +0.02 | – | −0.42 |
| 38 | Tahm Kench | +0.08 | +0.09 | +0.11 | +0.16 | −0.00 | – | −0.27 |
| 39 | Malphite | +0.04 | +0.03 | +0.07 | −0.04 | +0.10 | – | +0.07 |
| 40 | Ambessa | +0.03 | +0.00 | +0.00 | +0.00 | +0.14 | – | +0.17 |
| 41 | Braum | +0.02 | +0.04 | +0.06 | +0.04 | −0.02 | – | −0.28 |
| 42 | Hwei | +0.02 | +0.00 | +0.03 | +0.02 | −0.00 | +0.02 | +0.00 |
| 43 | Volibear | +0.01 | +0.00 | +0.08 | +0.00 | +0.03 | – | −0.37 |
| 44 | Diana | +0.01 | +0.00 | +0.00 | +0.00 | +0.13 | – | −0.28 |
| 45 | Cho'Gath | −0.00 | +0.00 | +0.00 | +0.00 | +0.05 | – | −0.18 |
| 46 | Tryndamere | −0.00 | +0.00 | +0.00 | +0.00 | −0.03 | – | +0.06 |
| 47 | Shyvana | −0.01 | +0.00 | +0.00 | +0.00 | +0.05 | – | −0.40 |
| 48 | Yone | −0.02 | −0.01 | +0.00 | +0.00 | +0.03 | – | −0.38 |
| 49 | Twisted Fate | −0.02 | +1.00 | −1.00 | +0.53 | −0.07 | −1.00 | −0.40 |
| 50 | Ornn | −0.03 | −0.01 | −0.02 | −0.11 | +0.08 | – | −0.14 |
| 51 | Shen | −0.03 | −0.06 | −0.02 | −0.06 | +0.10 | – | −0.13 |
| 52 | Graves | −0.03 | +0.00 | +0.00 | +0.00 | +0.03 | +0.00 | −0.67 |
| 53 | Kalista | −0.03 | +0.21 | +0.05 | −0.91 | +0.06 | +0.98 | −0.43 |
| 54 | Wukong | −0.04 | +0.00 | +0.00 | +0.00 | −0.17 | – | −0.27 |
| 55 | Garen | −0.05 | +0.00 | +0.00 | +0.00 | −0.17 | – | −0.41 |
| 56 | Bel'Veth | −0.06 | −1.00 | +0.00 | +1.00 | +0.11 | – | −0.43 |
| 57 | Sivir | −0.08 | −0.15 | +0.03 | +0.21 | +0.07 | −0.89 | −0.19 |
| 58 | Camille | −0.09 | −0.25 | +0.02 | +0.00 | −0.03 | – | −0.43 |
| 59 | Elise | −0.10 | +0.00 | +0.00 | +0.00 | +0.02 | −1.00 | +0.00 |
| 60 | Gangplank | −0.10 | −0.28 | +0.00 | +0.00 | +0.02 | – | −0.40 |
| 61 | Corki | −0.19 | +0.34 | −0.74 | −0.50 | +0.05 | +0.00 | +0.00 |
| 62 | Jayce | −0.20 | +0.04 | −0.79 | +0.00 | +0.15 | – | −0.25 |
| 63 | Pantheon | −0.27 | −0.48 | −0.48 | +0.00 | +0.11 | – | −0.36 |
| 64 | Alistar | −0.27 | +0.00 | −1.00 | +0.00 | +0.07 | – | −0.06 |
| 65 | Ezreal | −0.31 | −0.34 | −0.52 | −0.04 | +0.05 | −0.99 | +0.09 |
| 66 | Karma | −0.33 | −0.57 | −0.19 | −0.07 | −0.10 | −0.90 | −0.39 |
| 67 | Jinx | −0.34 | −0.53 | −0.59 | −0.22 | +0.07 | −0.01 | −0.42 |
| 68 | Singed | −0.34 | −0.42 | −0.41 | −0.42 | −0.07 | – | −0.10 |
| 69 | Bard | −0.35 | −1.00 | −1.00 | +1.00 | +0.01 | −0.49 | +0.00 |
| 70 | Zeri | −0.35 | −0.75 | −0.27 | −0.84 | −0.05 | +1.00 | −0.37 |
| 71 | Orianna | −0.35 | −1.00 | −1.00 | +0.76 | +0.07 | +0.00 | −0.36 |
| 72 | Neeko | −0.37 | −1.00 | −0.50 | +0.63 | +0.03 | −0.99 | −0.47 |
| 73 | Ashe | −0.40 | +0.09 | −0.48 | −1.00 | +0.08 | −0.93 | −0.39 |
| 74 | Smolder | −0.40 | −0.95 | +0.22 | −0.50 | +0.07 | −1.00 | −0.63 |
| 75 | Irelia | −0.42 | −0.52 | −0.63 | −0.48 | +0.12 | – | −0.34 |
| 76 | Master Yi | −0.42 | −0.50 | −0.50 | −0.50 | −0.13 | – | −0.26 |
| 77 | Gwen | −0.43 | −0.70 | −0.70 | +0.00 | −0.10 | – | −0.53 |
| 78 | Rakan | −0.44 | −1.00 | +0.00 | −1.00 | +0.11 | −0.11 | +0.13 |
| 79 | Varus | −0.46 | −1.00 | +0.00 | −0.47 | +0.02 | −0.97 | −0.34 |
| 80 | Swain | −0.48 | −0.70 | −1.00 | +0.09 | +0.11 | −0.70 | −0.42 |
| 81 | Rek'Sai | −0.52 | −1.00 | +0.00 | −1.00 | −0.11 | – | +0.03 |
| 82 | Viego | −0.53 | −0.96 | −0.96 | +0.00 | +0.14 | – | −0.28 |
| 83 | Lee Sin | −0.53 | −1.00 | −0.10 | −1.00 | +0.06 | – | −0.23 |
| 84 | Milio | −0.56 | −0.86 | −0.83 | −0.23 | +0.10 | −1.00 | +0.00 |
| 85 | Fiddlesticks | −0.56 | +0.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.03 |
| 86 | Annie | −0.58 | −0.77 | −0.45 | −1.00 | +0.12 | −0.90 | −0.06 |
| 87 | Skarner | −0.58 | −1.00 | −1.00 | +0.00 | −0.11 | – | −0.11 |
| 88 | Yunara | −0.59 | −0.90 | −0.98 | −0.04 | +0.06 | −0.94 | −0.51 |
| 89 | Rell | −0.60 | −1.00 | −1.00 | −1.00 | +0.12 | +1.00 | −0.41 |
| 90 | Nami | −0.62 | −0.44 | −1.00 | −0.94 | +0.07 | −0.89 | +0.00 |
| 91 | Lux | −0.67 | −0.83 | −0.64 | −1.00 | +0.11 | −1.00 | −0.32 |
| 92 | Caitlyn | −0.67 | −0.81 | −0.68 | −0.94 | +0.08 | −1.00 | −0.43 |
| 93 | Lillia | −0.68 | −1.00 | −0.93 | −1.00 | +0.00 | +0.16 | −0.17 |
| 94 | Riven | −0.68 | −1.00 | −0.66 | −1.00 | +0.18 | – | −0.42 |
| 95 | Nilah | −0.68 | −0.98 | −0.90 | −0.50 | −0.00 | – | −0.80 |
| 96 | Gnar | −0.68 | −0.86 | −0.82 | −1.00 | +0.10 | −0.80 | +0.03 |
| 97 | Brand | −0.68 | −1.00 | −0.59 | −0.85 | +0.03 | −1.00 | −0.39 |
| 98 | Gragas | −0.69 | −1.00 | −1.00 | −0.50 | +0.06 | −1.00 | +0.04 |
| 99 | Vel'Koz | −0.70 | −0.82 | −0.86 | −1.00 | +0.17 | −0.95 | −0.31 |
| 100 | Azir | −0.71 | −1.00 | −0.67 | −1.00 | +0.04 | −1.00 | +0.02 |
| 101 | Fizz | −0.73 | −1.00 | −0.77 | −1.00 | +0.02 | – | −0.29 |
| 102 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.32 | – | −0.04 |
| 103 | Jarvan IV | −0.73 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.47 |
| 104 | Vi | −0.73 | −0.75 | −1.00 | −1.00 | +0.00 | – | −0.38 |
| 105 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 106 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.22 |
| 107 | Soraka | −0.77 | −1.00 | −0.77 | −1.00 | −0.03 | −1.00 | −0.41 |
| 108 | Aurelion Sol | −0.77 | −1.00 | −1.00 | −1.00 | +0.26 | −0.97 | −0.26 |
| 109 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.21 |
| 110 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 111 | Jhin | −0.78 | −0.99 | −1.00 | −0.88 | +0.06 | −1.00 | −0.33 |
| 112 | Shaco | −0.78 | −1.00 | −0.97 | −1.00 | +0.08 | – | −0.49 |
| 113 | Kai'Sa | −0.78 | −1.00 | −0.86 | −0.99 | +0.05 | −1.00 | −0.58 |
| 114 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.27 |
| 115 | Lucian | −0.79 | −1.00 | −1.00 | −0.99 | +0.05 | −1.00 | +0.09 |
| 116 | Maokai | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.31 |
| 117 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.03 |
| 118 | Janna | −0.79 | −1.00 | −0.91 | −1.00 | +0.09 | −1.00 | −0.48 |
| 119 | Sejuani | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.04 |
| 120 | Mel | −0.79 | −1.00 | −0.87 | −1.00 | +0.01 | −1.00 | −0.47 |
| 121 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.14 |
| 122 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.03 |
| 123 | Vex | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −0.99 | +0.05 |
| 124 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.56 |
| 125 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.04 |
| 126 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.05 |
| 127 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.25 |
| 128 | Xayah | −0.79 | −0.98 | −1.00 | −1.00 | +0.12 | −1.00 | −0.34 |
| 129 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.24 |
| 130 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.47 |
| 131 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.19 |
| 132 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.13 |
| 133 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.34 |
| 134 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.31 |
| 135 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.47 |
| 136 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.51 |
| 137 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.22 |
| 138 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.49 |
| 139 | Zoe | −0.81 | −1.00 | −0.99 | −1.00 | +0.06 | −1.00 | −0.36 |
| 140 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.51 |
| 141 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.29 |
| 142 | Ekko | −0.81 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.22 |
| 143 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.35 |
| 144 | Urgot | −0.81 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.38 |
| 145 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.41 |
| 146 | Blitzcrank | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.21 |
| 147 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.38 |
| 148 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.36 |
| 149 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.41 |
| 150 | Samira | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.48 |
| 151 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.40 |
| 152 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.49 |
| 153 | Akshan | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.49 |
| 154 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.44 |
| 155 | Sona | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.58 |
| 156 | Zilean | −0.82 | −1.00 | −1.00 | −0.98 | +0.03 | −0.99 | −0.64 |
| 157 | Tristana | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −0.98 | −0.69 |
| 158 | Ahri | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 159 | Viktor | −0.83 | −0.99 | −0.99 | −1.00 | +0.02 | −1.00 | −0.63 |
| 160 | Nidalee | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.51 |
| 161 | LeBlanc | −0.83 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.53 |
| 162 | Draven | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.46 |
| 163 | Kindred | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.49 |
| 164 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.78 |
| 165 | Taliyah | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.24 |
| 166 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.31 |
| 167 | Yuumi | −0.85 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | −0.82 |
| 168 | Syndra | −0.85 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | −0.44 |
| 169 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.26 | – | −0.65 |
| 170 | Thresh | −0.86 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | −0.89 |
| 171 | Renata Glasc | −0.87 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | −1.00 |
| 172 | Pyke | −0.88 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | −0.58 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Sion's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Sion's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Sion` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.82)

- **0.81** range: Sivir's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Sivir basic attacks → Sion basic attacks)
- **0.80** spell shield: Spell Shield's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion R Unstoppable Onslaught)
- **0.42** spell shield: Spell Shield's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Sion Q Decimating Smash)

#### 2. Vladimir (net +1.12)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 2 s, long enough to use ahead of Unstoppable Onslaught. (Vladimir W Sanguine Pool → Sion R Unstoppable Onslaught)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Sion's Decimating Smash. Untargetable for 2 s, long enough to use ahead of Decimating Smash. (Vladimir W Sanguine Pool → Sion Q Decimating Smash)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Sion's (450 vs 175 attack range). Sion has no dash or blink to close the gap. (Vladimir basic attacks → Sion basic attacks)
- Watch out: Decimating Smash's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Xayah (net +1.10)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Xayah basic attacks → Sion basic attacks)
- **0.61** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 1.5 s, long enough to use ahead of Unstoppable Onslaught. (Xayah R Featherstorm → Sion R Unstoppable Onslaught)
- **0.31** untargetable: Featherstorm makes Xayah untargetable, dodging Sion's Decimating Smash. Untargetable for 1.5 s, long enough to use ahead of Decimating Smash. (Xayah R Featherstorm → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Xayah's Bladecaller (root).

#### 4. Kayle (net +1.09)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Sion's (625 vs 175 attack range). Sion has no dash or blink to close the gap. (Kayle basic attacks → Sion basic attacks)
- **0.34** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Unstoppable Onslaught (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Unstoppable Onslaught. (Kayle R Divine Judgment → Sion R Unstoppable Onslaught)
- **0.16** invulnerable: Divine Judgment makes Kayle invulnerable to Sion's Decimating Smash (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Decimating Smash. (Kayle R Divine Judgment → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Kayle's Radiant Blast (slow).

#### 5. Milio (net +1.08)

- **0.67** range: Milio's basic attacks reach 350 units farther than Sion's (525 vs 175 attack range). Sion has no dash or blink to close the gap. (Milio basic attacks → Sion basic attacks)
- **0.43** cleanse: Breath of Life cleanses Sion's Unstoppable Onslaught (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion R Unstoppable Onslaught)
- **0.24** cleanse: Breath of Life cleanses Sion's Decimating Smash (slow, stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove airborne. (Milio R Breath of Life → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

#### 6. Nocturne (net +0.81)

- **0.80** spell shield: Shroud of Darkness's spell shield blocks Sion's Unstoppable Onslaught. Spell shield for 1.5 s, long enough to use ahead of Unstoppable Onslaught. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion R Unstoppable Onslaught)
- **0.49** spell shield: Shroud of Darkness's spell shield blocks Sion's Decimating Smash. Spell shield for 1.5 s, long enough to use ahead of Decimating Smash. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Sion Q Decimating Smash)
- **0.13** interrupt: Unspeakable Horror's fear interrupts Sion's Decimating Smash (charge-up). Unspeakable Horror must land during the charge-up. Sion can release Decimating Smash early instead of charging it fully. (Nocturne E Unspeakable Horror → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Nocturne's Unspeakable Horror (fear, slow).

#### 7. Aurora (net +0.80)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Aurora basic attacks → Sion basic attacks)
- **0.36** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Unstoppable Onslaught. Untargetable for 0.4 s; Unstoppable Onslaught lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion R Unstoppable Onslaught)
- **0.18** untargetable: Between Worlds makes Aurora untargetable, dodging Sion's Decimating Smash. Untargetable for 0.4 s; Decimating Smash lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Sion Q Decimating Smash)
- Watch out: Unstoppable Onslaught makes Sion immune to Aurora's Between Worlds (slow).

#### 8. Olaf (net +0.79)

- **0.68** cc immunity: Ragnarok makes Olaf immune to Sion's Unstoppable Onslaught (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Unstoppable Onslaught. (Olaf R Ragnarok → Sion R Unstoppable Onslaught)
- **0.31** cc immunity: Ragnarok makes Olaf immune to Sion's Decimating Smash (airborne, slow, stun). Immune for 3 s, long enough to use ahead of Decimating Smash. (Olaf R Ragnarok → Sion Q Decimating Smash)
- **0.05** cc immunity: Ragnarok makes Olaf immune to Sion's Roar of the Slayer (slow). Immune for 3 s, long enough to use ahead of Roar of the Slayer. (Olaf R Ragnarok → Sion E Roar of the Slayer)
- Watch out: Unstoppable Onslaught makes Sion immune to Olaf's Undertow (slow).

#### 9. Zeri (net +0.78)

- **0.83** range: Zeri's basic attacks reach 375 units farther than Sion's (550 vs 175 attack range). Sion has no dash or blink to close the gap. (Zeri basic attacks → Sion basic attacks)
- Watch out: Unstoppable Onslaught makes Sion immune to Zeri's Ultrashock Laser (slow).

#### 10. Teemo (net +0.76)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Sion's (500 vs 175 attack range). Sion has no dash or blink to close the gap. (Teemo basic attacks → Sion basic attacks)
- **0.35** blind: Blinding Dart's blind makes Sion's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Sion basic attacks)
- Watch out: Unstoppable Onslaught makes Sion immune to Teemo's Blinding Dart (blind).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.82 | 1.82 | 0.00 | range (attacks) |
| 2 | Vladimir | +1.12 | 1.32 | 0.20 |  |
| 3 | Xayah | +1.10 | 1.44 | 0.34 | range (attacks) |
| 4 | Kayle | +1.09 | 1.14 | 0.05 | range (attacks) |
| 5 | Milio | +1.08 | 1.43 | 0.35 | range (attacks) |
| 6 | Nocturne | +0.81 | 1.29 | 0.48 |  |
| 7 | Aurora | +0.80 | 1.02 | 0.22 | range (attacks) |
| 8 | Olaf | +0.79 | 0.85 | 0.06 |  |
| 9 | Zeri | +0.78 | 0.83 | 0.05 | range (attacks) |
| 10 | Teemo | +0.76 | 0.94 | 0.18 | range (attacks) |
| 11 | Kindred | +0.76 | 0.81 | 0.05 | range (attacks) |
| 12 | Twitch | +0.75 | 0.81 | 0.06 | range (attacks) |
| 13 | Udyr | +0.72 | 1.21 | 0.49 |  |
| 14 | Rek'Sai | +0.71 | 1.04 | 0.33 |  |
| 15 | Gangplank | +0.67 | 0.84 | 0.17 |  |
| 16 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 17 | Morgana | +0.64 | 1.37 | 0.73 |  |
| 18 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 19 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 20 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 21 | Vayne | +0.57 | 0.93 | 0.36 | range (attacks) |
| 22 | Bard | +0.56 | 1.48 | 0.92 | range (attacks) |
| 23 | Rengar | +0.53 | 0.88 | 0.35 |  |
| 24 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 25 | Fiora | +0.50 | 0.78 | 0.28 |  |
| 26 | Master Yi | +0.47 | 0.81 | 0.34 |  |
| 27 | Gwen | +0.47 | 0.61 | 0.14 |  |
| 28 | Samira | +0.45 | 0.67 | 0.22 | range (attacks) |
| 29 | Garen | +0.45 | 0.58 | 0.13 |  |
| 30 | Draven | +0.44 | 0.80 | 0.36 | range (attacks) |
| 31 | Smolder | +0.44 | 0.61 | 0.17 | range (attacks) |
| 32 | Kog'Maw | +0.41 | 0.47 | 0.06 |  |
| 33 | Yuumi | +0.40 | 1.23 | 0.83 | range (attacks) |
| 34 | Zilean | +0.39 | 0.76 | 0.37 | range (attacks) |
| 35 | Elise | +0.39 | 0.74 | 0.35 | range (attacks) |
| 36 | Vex | +0.39 | 0.73 | 0.34 | range (attacks) |
| 37 | Kennen | +0.39 | 0.67 | 0.28 | range (attacks) |
| 38 | Zed | +0.39 | 0.45 | 0.06 |  |
| 39 | Zoe | +0.35 | 0.73 | 0.38 | range (attacks) |
| 40 | Graves | +0.34 | 0.41 | 0.07 |  |
| 41 | Singed | +0.31 | 0.72 | 0.41 |  |
| 42 | Zaahen | +0.30 | 0.82 | 0.52 |  |
| 43 | Mel | +0.29 | 0.63 | 0.34 | range (attacks) |
| 44 | Annie | +0.29 | 0.57 | 0.28 |  |
| 45 | Lissandra | +0.28 | 1.27 | 0.99 |  |
| 46 | Alistar | +0.28 | 0.94 | 0.66 |  |
| 47 | Evelynn | +0.28 | 0.64 | 0.36 |  |
| 48 | Jayce | +0.27 | 0.66 | 0.39 | range (attacks) |
| 49 | Senna | +0.26 | 0.65 | 0.39 | range (attacks) |
| 50 | Viktor | +0.23 | 0.77 | 0.54 | range (attacks) |
| 51 | Heimerdinger | +0.22 | 0.76 | 0.54 |  |
| 52 | Nasus | +0.21 | 0.27 | 0.06 |  |
| 53 | Shaco | +0.20 | 0.62 | 0.42 |  |
| 54 | Brand | +0.20 | 0.59 | 0.39 |  |
| 55 | Kalista | +0.19 | 1.17 | 0.98 | range (attacks) |
| 56 | Soraka | +0.19 | 0.61 | 0.42 | range (attacks) |
| 57 | Veigar | +0.19 | 0.57 | 0.38 |  |
| 58 | Lulu | +0.18 | 1.07 | 0.89 | range (attacks) |
| 59 | Anivia | +0.17 | 0.75 | 0.58 |  |
| 60 | Ahri | +0.17 | 0.53 | 0.36 |  |
| 61 | Lux | +0.16 | 0.54 | 0.38 | range (attacks) |
| 62 | Ziggs | +0.15 | 0.62 | 0.47 | range (attacks) |
| 63 | LeBlanc | +0.15 | 0.38 | 0.23 |  |
| 64 | Jinx | +0.13 | 0.51 | 0.38 | range (attacks) |
| 65 | Syndra | +0.10 | 0.52 | 0.42 |  |
| 66 | Quinn | +0.09 | 0.82 | 0.73 | range (attacks) |
| 67 | Swain | +0.09 | 0.49 | 0.40 |  |
| 68 | Twisted Fate | +0.07 | 0.93 | 0.86 | range (attacks) |
| 69 | Gnar | +0.06 | 0.82 | 0.76 | range (attacks) |
| 70 | Lucian | +0.06 | 0.62 | 0.56 | range (attacks) |
| 71 | Illaoi | +0.06 | 0.12 | 0.06 |  |
| 72 | Sona | +0.05 | 0.85 | 0.80 | range (attacks) |
| 73 | Akshan | +0.03 | 0.59 | 0.56 | range (attacks) |
| 74 | Miss Fortune | +0.02 | 0.61 | 0.59 | range (attacks) |
| 75 | Jax | +0.01 | 0.35 | 0.34 |  |
| 76 | Kassadin | 0.00 | 0.16 | 0.16 |  |
| 77 | Cassiopeia | -0.01 | 0.87 | 0.88 |  |
| 78 | Ashe | -0.02 | 0.80 | 0.82 | range (attacks) |
| 79 | Thresh | -0.03 | 0.60 | 0.63 |  |
| 80 | Tristana | -0.04 | 0.80 | 0.84 | range (attacks) |
| 81 | Hwei | -0.04 | 0.56 | 0.60 |  |
| 82 | Talon | -0.05 | 0.00 | 0.05 |  |
| 83 | Akali | -0.06 | 0.00 | 0.06 |  |
| 84 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 85 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 86 | Caitlyn | -0.07 | 0.72 | 0.79 | range (attacks) |
| 87 | Cho'Gath | -0.08 | 0.32 | 0.40 |  |
| 88 | Kha'Zix | -0.08 | 0.00 | 0.08 |  |
| 89 | Renata Glasc | -0.10 | 0.91 | 1.01 | range (attacks) |
| 90 | Fizz | -0.11 | 0.74 | 0.85 |  |
| 91 | Karma | -0.11 | 0.38 | 0.49 |  |
| 92 | Aphelios | -0.14 | 0.85 | 0.99 | range (attacks) |
| 93 | Locke | -0.17 | 0.00 | 0.17 |  |
| 94 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 95 | Renekton | -0.19 | 0.15 | 0.34 |  |
| 96 | Mordekaiser | -0.20 | 0.21 | 0.41 |  |
| 97 | Vel'Koz | -0.21 | 0.60 | 0.81 |  |
| 98 | Blitzcrank | -0.21 | 0.39 | 0.60 |  |
| 99 | Malzahar | -0.22 | 1.21 | 1.43 |  |
| 100 | Bel'Veth | -0.24 | 0.15 | 0.39 |  |
| 101 | Taric | -0.24 | 0.12 | 0.36 |  |
| 102 | Xerath | -0.25 | 0.60 | 0.85 |  |
| 103 | Seraphine | -0.26 | 0.72 | 0.98 | range (attacks) |
| 104 | Karthus | -0.26 | 0.33 | 0.59 |  |
| 105 | Aatrox | -0.26 | 0.18 | 0.44 |  |
| 106 | Yorick | -0.27 | 0.12 | 0.39 |  |
| 107 | Ekko | -0.27 | 0.00 | 0.27 |  |
| 108 | Azir | -0.28 | 0.55 | 0.83 |  |
| 109 | Orianna | -0.28 | 0.55 | 0.83 |  |
| 110 | Irelia | -0.29 | 0.13 | 0.42 |  |
| 111 | Ivern | -0.30 | 0.33 | 0.63 |  |
| 112 | Varus | -0.31 | 0.65 | 0.96 | range (attacks) |
| 113 | Darius | -0.31 | 0.11 | 0.42 |  |
| 114 | Trundle | -0.31 | 0.11 | 0.42 |  |
| 115 | Maokai | -0.32 | 0.82 | 1.14 |  |
| 116 | Jhin | -0.32 | 0.50 | 0.82 | range (attacks) |
| 117 | Nami | -0.33 | 0.64 | 0.97 |  |
| 118 | Shyvana | -0.34 | 0.19 | 0.53 |  |
| 119 | Volibear | -0.38 | 0.25 | 0.63 |  |
| 120 | Kled | -0.39 | 0.78 | 1.17 |  |
| 121 | Katarina | -0.39 | 0.12 | 0.51 |  |
| 122 | Sylas | -0.40 | 0.13 | 0.53 |  |
| 123 | Fiddlesticks | -0.41 | 0.64 | 1.05 |  |
| 124 | Kayn | -0.42 | 0.65 | 1.07 |  |
| 125 | Xin Zhao | -0.42 | 0.57 | 0.99 |  |
| 126 | Zyra | -0.42 | 0.56 | 0.98 |  |
| 127 | Ryze | -0.42 | 0.45 | 0.87 |  |
| 128 | Riven | -0.42 | 0.28 | 0.70 |  |
| 129 | Yasuo | -0.46 | 0.42 | 0.88 |  |
| 130 | Nilah | -0.47 | 0.33 | 0.80 |  |
| 131 | Neeko | -0.49 | 0.49 | 0.98 |  |
| 132 | Aurelion Sol | -0.50 | 0.62 | 1.12 |  |
| 133 | Braum | -0.51 | 0.44 | 0.95 |  |
| 134 | Lillia | -0.59 | 0.24 | 0.83 |  |
| 135 | Pyke | -0.60 | 0.28 | 0.88 |  |
| 136 | Urgot | -0.61 | 0.43 | 1.04 |  |
| 137 | Janna | -0.62 | 0.88 | 1.50 | range (attacks) |
| 138 | Camille | -0.63 | 0.63 | 1.26 |  |
| 139 | Rell | -0.63 | 0.61 | 1.24 |  |
| 140 | Rakan | -0.66 | 0.39 | 1.05 |  |
| 141 | Pantheon | -0.70 | 0.51 | 1.21 |  |
| 142 | Malphite | -0.72 | 0.32 | 1.04 |  |
| 143 | Skarner | -0.72 | 0.24 | 0.96 |  |
| 144 | Diana | -0.72 | 0.08 | 0.80 |  |
| 145 | Wukong | -0.72 | 0.08 | 0.80 |  |
| 146 | Lee Sin | -0.75 | 0.08 | 0.83 |  |
| 147 | Sejuani | -0.77 | 0.38 | 1.15 |  |
| 148 | Shen | -0.79 | 0.40 | 1.19 |  |
| 149 | K'Sante | -0.83 | 0.51 | 1.34 |  |
| 150 | Yone | -0.84 | 0.38 | 1.22 |  |
| 151 | Nunu & Willump | -0.84 | 0.31 | 1.15 |  |
| 152 | Leona | -0.85 | 0.26 | 1.11 |  |
| 153 | Amumu | -0.86 | 0.20 | 1.06 |  |
| 154 | Qiyana | -0.90 | 0.08 | 0.98 |  |
| 155 | Sett | -0.91 | 0.27 | 1.18 |  |
| 156 | Ornn | -0.93 | 0.36 | 1.29 |  |
| 157 | Ambessa | -0.95 | 0.08 | 1.03 |  |
| 158 | Rammus | -0.96 | 0.57 | 1.53 |  |
| 159 | Taliyah | -0.99 | 0.82 | 1.81 |  |
| 160 | Nautilus | -1.00 | 0.08 | 1.08 |  |
| 161 | Naafiri | -1.02 | 0.00 | 1.02 |  |
| 162 | Jarvan IV | -1.06 | 0.14 | 1.20 |  |
| 163 | Gragas | -1.09 | 0.20 | 1.29 |  |
| 164 | Hecarim | -1.09 | 0.14 | 1.23 |  |
| 165 | Briar | -1.18 | 0.08 | 1.26 |  |
| 166 | Poppy | -1.18 | 0.08 | 1.26 |  |
| 167 | Tahm Kench | -1.23 | 0.39 | 1.62 |  |
| 168 | Viego | -1.23 | 0.29 | 1.52 |  |
| 169 | Warwick | -1.25 | 0.81 | 2.06 |  |
| 170 | Zac | -1.29 | 0.37 | 1.66 |  |
| 171 | Vi | -1.47 | 0.32 | 1.79 |  |
| 172 | Galio | -1.66 | 0.35 | 2.01 |  |
