# Counters to Rammus (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Rammus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Rammus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Rammus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.43 | – | +0.00 |
| 2 | Udyr | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.57 |
| 3 | Olaf | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.06 |
| 4 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.41 |
| 5 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.33 | +1.00 | −0.56 |
| 6 | Vayne | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | −0.06 |
| 7 | Nasus | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.10 |
| 8 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.10 |
| 9 | Rell | +0.81 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | −0.11 |
| 10 | Master Yi | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.00 |
| 11 | Yasuo | +0.81 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.17 |
| 12 | Volibear | +0.81 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.03 |
| 13 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | −0.54 |
| 14 | Shen | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.06 |
| 15 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.19 |
| 16 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.24 | – | −0.29 |
| 17 | Kennen | +0.80 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | −0.28 |
| 18 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | −0.40 |
| 19 | Darius | +0.80 | +1.00 | +1.00 | +1.00 | +0.21 | – | −0.28 |
| 20 | Sion | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.24 |
| 21 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | −0.43 |
| 22 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.16 |
| 23 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.21 | – | −0.40 |
| 24 | Aphelios | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | −0.49 |
| 25 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.06 |
| 26 | Illaoi | +0.79 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | −0.14 |
| 27 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.13 | – | −0.15 |
| 28 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.15 | – | −0.24 |
| 29 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.14 |
| 30 | Yone | +0.79 | +1.00 | +1.00 | +1.00 | +0.20 | – | −0.43 |
| 31 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.03 |
| 32 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | −0.12 |
| 33 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.12 |
| 34 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.17 |
| 35 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.11 | – | −0.19 |
| 36 | Rek'Sai | +0.78 | +1.00 | +1.00 | +1.00 | +0.16 | – | −0.35 |
| 37 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | +0.06 | – | −0.12 |
| 38 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.32 |
| 39 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.12 | – | −0.35 |
| 40 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | +0.14 | – | −0.42 |
| 41 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.05 |
| 42 | Tahm Kench | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.19 |
| 43 | Garen | +0.77 | +1.00 | +1.00 | +1.00 | +0.09 | – | −0.36 |
| 44 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | +0.04 | – | −0.24 |
| 45 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.00 | – | −0.18 |
| 46 | Rumble | +0.76 | +1.00 | +1.00 | +1.00 | +0.01 | – | −0.42 |
| 47 | Zac | +0.72 | +1.00 | +0.99 | +1.00 | −0.29 | – | −0.13 |
| 48 | Graves | +0.69 | +1.00 | +1.00 | +1.00 | +0.15 | +0.00 | −0.68 |
| 49 | Shyvana | +0.64 | +1.00 | +1.00 | +1.00 | +0.25 | −1.00 | +0.06 |
| 50 | Vel'Koz | +0.63 | +1.00 | +1.00 | +1.00 | +0.21 | −1.00 | −0.05 |
| 51 | Lulu | +0.60 | +1.00 | +1.00 | +1.00 | +0.10 | −1.00 | −0.22 |
| 52 | Warwick | +0.54 | +0.00 | +1.00 | +1.00 | +0.16 | – | +0.17 |
| 53 | Swain | +0.53 | +0.96 | +0.01 | +1.00 | +0.05 | +0.96 | −0.23 |
| 54 | Diana | +0.52 | +1.00 | +0.00 | +1.00 | +0.19 | – | −0.12 |
| 55 | Karma | +0.50 | +0.78 | +0.96 | +1.00 | −0.10 | −1.00 | −0.42 |
| 56 | Ezreal | +0.50 | +0.54 | +0.72 | +0.61 | −0.02 | +0.96 | −0.58 |
| 57 | Quinn | +0.49 | +0.82 | +0.82 | +1.00 | +0.05 | −1.00 | −0.54 |
| 58 | Morgana | +0.49 | +0.43 | +0.43 | +0.93 | +0.11 | +0.88 | −0.37 |
| 59 | Zeri | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | −0.14 |
| 60 | Rakan | +0.33 | −1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.29 |
| 61 | Kog'Maw | +0.31 | +0.00 | +0.00 | +1.00 | +0.23 | +1.00 | −0.39 |
| 62 | Nocturne | +0.25 | −1.00 | +1.00 | +1.00 | +0.09 | – | +0.22 |
| 63 | Bel'Veth | +0.24 | +1.00 | −1.00 | +1.00 | +0.25 | – | −0.47 |
| 64 | Sett | +0.23 | +1.00 | −1.00 | +1.00 | +0.07 | – | −0.05 |
| 65 | Ashe | +0.17 | −0.24 | −0.40 | +1.00 | +0.22 | +1.00 | −0.00 |
| 66 | Samira | +0.16 | −0.12 | −0.39 | +1.00 | +0.10 | +1.00 | −0.46 |
| 67 | Orianna | +0.11 | +1.00 | −1.00 | +1.00 | +0.10 | −1.00 | −0.06 |
| 68 | Malphite | +0.10 | +0.09 | +0.09 | +0.09 | +0.12 | – | +0.17 |
| 69 | Singed | +0.07 | +0.06 | +0.12 | +0.12 | −0.02 | – | −0.12 |
| 70 | Braum | +0.03 | +0.05 | +0.05 | +0.07 | −0.06 | – | −0.07 |
| 71 | Ornn | +0.01 | +0.01 | −0.04 | −0.01 | +0.20 | – | −0.23 |
| 72 | Jinx | +0.01 | −0.19 | −0.19 | +0.68 | +0.06 | −0.21 | −0.32 |
| 73 | Jarvan IV | −0.00 | +0.00 | −1.00 | +1.00 | +0.20 | – | +0.36 |
| 74 | Anivia | −0.05 | −0.13 | −0.13 | +0.06 | −0.06 | +0.17 | −0.12 |
| 75 | Janna | −0.06 | +0.04 | +0.09 | +0.08 | +0.06 | −1.00 | −0.43 |
| 76 | Lillia | −0.07 | −0.41 | −1.00 | +0.88 | +0.09 | +1.00 | −0.15 |
| 77 | Annie | −0.11 | +0.94 | −1.00 | +0.00 | +0.13 | −1.00 | −0.19 |
| 78 | Soraka | −0.11 | −0.09 | −0.12 | +0.02 | −0.03 | −0.47 | −0.24 |
| 79 | Nilah | −0.17 | −1.00 | −1.00 | +1.00 | +0.19 | +1.00 | −0.02 |
| 80 | Gnar | −0.18 | −1.00 | −1.00 | +1.00 | +0.28 | +1.00 | −0.44 |
| 81 | Aurora | −0.18 | −1.00 | −1.00 | +1.00 | +0.19 | +1.00 | −0.26 |
| 82 | Twisted Fate | −0.19 | −1.00 | −1.00 | +1.00 | +0.12 | +1.00 | −0.25 |
| 83 | Smolder | −0.20 | −1.00 | −1.00 | +1.00 | +0.16 | +1.00 | −0.46 |
| 84 | Hwei | −0.21 | −1.00 | −1.00 | +1.00 | +0.01 | +1.00 | −0.21 |
| 85 | Kai'Sa | −0.23 | −1.00 | −1.00 | +1.00 | −0.02 | +1.00 | −0.50 |
| 86 | Lee Sin | −0.23 | −1.00 | +1.00 | −1.00 | +0.00 | – | −0.13 |
| 87 | Ambessa | −0.26 | −1.00 | −1.00 | +1.00 | +0.37 | – | +0.17 |
| 88 | Irelia | −0.27 | −0.61 | −0.23 | −0.09 | +0.01 | – | −0.33 |
| 89 | Sejuani | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.11 |
| 90 | Viego | −0.32 | −1.00 | −1.00 | +1.00 | +0.18 | – | −0.25 |
| 91 | Skarner | −0.34 | −1.00 | −1.00 | +1.00 | +0.02 | – | −0.12 |
| 92 | Fizz | −0.34 | −1.00 | −1.00 | +1.00 | +0.00 | – | −0.21 |
| 93 | Pantheon | −0.35 | −1.00 | −1.00 | +1.00 | +0.07 | – | −0.45 |
| 94 | Elise | −0.38 | −1.00 | −1.00 | +1.00 | +0.19 | −1.00 | −0.26 |
| 95 | Teemo | −0.39 | −1.00 | −1.00 | +1.00 | +0.19 | −1.00 | −0.28 |
| 96 | Heimerdinger | −0.39 | −1.00 | −1.00 | +1.00 | +0.18 | −1.00 | −0.31 |
| 97 | Lissandra | −0.39 | −0.28 | −0.07 | −1.00 | +0.09 | −1.00 | −0.34 |
| 98 | Caitlyn | −0.39 | −1.00 | −1.00 | +1.00 | +0.18 | −1.00 | −0.38 |
| 99 | Neeko | −0.39 | −1.00 | −1.00 | +1.00 | +0.14 | −1.00 | −0.30 |
| 100 | Xayah | −0.40 | −1.00 | −1.00 | +1.00 | +0.17 | −1.00 | −0.49 |
| 101 | Urgot | −0.40 | −1.00 | −1.00 | +1.00 | +0.21 | −1.00 | −0.70 |
| 102 | Milio | −0.40 | −1.00 | −1.00 | +0.95 | +0.14 | −1.00 | −0.30 |
| 103 | Bard | −0.41 | −1.00 | −1.00 | +0.96 | +0.08 | −1.00 | −0.28 |
| 104 | Malzahar | −0.41 | −1.00 | −1.00 | +1.00 | +0.04 | −1.00 | −0.33 |
| 105 | Karthus | −0.42 | −1.00 | −0.10 | −0.13 | +0.01 | −1.00 | −0.36 |
| 106 | Sivir | −0.42 | −1.00 | −1.00 | +1.00 | +0.07 | −1.00 | −0.62 |
| 107 | Yunara | −0.44 | −1.00 | −1.00 | +0.73 | +0.22 | −1.00 | −0.47 |
| 108 | Riven | −0.54 | −1.00 | −1.00 | +0.00 | +0.17 | – | −0.24 |
| 109 | Nami | −0.55 | −0.80 | −0.80 | −0.23 | +0.02 | −0.93 | −0.32 |
| 110 | Lux | −0.61 | −1.00 | −1.00 | +0.00 | +0.09 | −1.00 | −0.45 |
| 111 | Brand | −0.62 | −1.00 | −0.52 | −0.63 | +0.07 | −1.00 | −0.39 |
| 112 | Sylas | −0.72 | −1.00 | −1.00 | −1.00 | +0.38 | – | −0.03 |
| 113 | Aurelion Sol | −0.72 | −1.00 | −1.00 | −1.00 | +0.03 | −0.23 | −0.10 |
| 114 | Kassadin | −0.75 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.16 |
| 115 | Amumu | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.10 |
| 116 | Nautilus | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.06 |
| 117 | Galio | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | – | −0.28 |
| 118 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.31 |
| 119 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.16 |
| 120 | Qiyana | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.12 |
| 121 | Kha'Zix | −0.77 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.28 |
| 122 | Blitzcrank | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | – | −0.25 |
| 123 | Jhin | −0.77 | −1.00 | −1.00 | −0.87 | +0.13 | −1.00 | −0.36 |
| 124 | Rengar | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.06 |
| 125 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.01 |
| 126 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | −0.15 |
| 127 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.23 |
| 128 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.29 |
| 129 | Kayn | −0.78 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.27 |
| 130 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.20 |
| 131 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.26 |
| 132 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.11 |
| 133 | Leona | −0.79 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.10 |
| 134 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | −0.32 |
| 135 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.28 |
| 136 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.24 |
| 137 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.44 |
| 138 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.19 |
| 139 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.12 |
| 140 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.20 |
| 141 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.29 |
| 142 | Tristana | −0.80 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.42 |
| 143 | Syndra | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.13 |
| 144 | Ahri | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.25 |
| 145 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.25 |
| 146 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.30 |
| 147 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.29 |
| 148 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.40 |
| 149 | Evelynn | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | – | −0.49 |
| 150 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.39 |
| 151 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.34 |
| 152 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.35 |
| 153 | Pyke | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.62 |
| 154 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.34 |
| 155 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.36 |
| 156 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | −0.18 |
| 157 | Zyra | −0.81 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.31 |
| 158 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.44 |
| 159 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.44 |
| 160 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −0.26 |
| 161 | Zilean | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.38 |
| 162 | Mel | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.40 |
| 163 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.39 |
| 164 | Ryze | −0.82 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.69 |
| 165 | Senna | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.49 |
| 166 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.30 |
| 167 | Fiddlesticks | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.40 |
| 168 | Briar | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | – | −0.22 |
| 169 | LeBlanc | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.45 |
| 170 | Renata Glasc | −0.82 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | −0.85 |
| 171 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.45 |
| 172 | Yuumi | −0.82 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.44 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Rammus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Rammus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Rammus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Maokai (net +1.41)

- **0.90** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.4 s; Soaring Slam takes 0.89 s to land, enough to react. (Maokai W Twisted Advance → Rammus R Soaring Slam)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.4 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Rammus E Frenzying Taunt)
- **0.35** interrupt: Bramble Smash's airborne interrupts Rammus's Powerball (normal channel). Bramble Smash must land during the channel. (Maokai Q Bramble Smash → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Maokai for each basic attack.

#### 2. Zaahen (net +1.39)

- **0.90** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Soaring Slam (airborne, slow). Immune for ?; Soaring Slam takes 0.89 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus R Soaring Slam)
- **0.35** interrupt: The Darkin Glaive's airborne interrupts Rammus's Powerball (normal channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Rammus Q Powerball)
- **0.34** cc immunity: Grim Deliverance makes Zaahen immune to Rammus's Frenzying Taunt (taunt). Immune for ?; Frenzying Taunt takes 0.25 s to land, enough to react. (Zaahen R Grim Deliverance → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Zaahen for each basic attack.

#### 3. Morgana (net +1.26)

- **0.90** cc immunity: Black Shield makes Morgana immune to Rammus's Soaring Slam (airborne, slow). Immune for 5 s, long enough to use ahead of Soaring Slam. (Morgana E Black Shield → Rammus R Soaring Slam)
- **0.60** cc immunity: Black Shield makes Morgana immune to Rammus's Frenzying Taunt (taunt). Immune for 5 s, long enough to use ahead of Frenzying Taunt. (Morgana E Black Shield → Rammus E Frenzying Taunt)
- **0.44** cc immunity: Black Shield makes Morgana immune to Rammus's Powerball (airborne, slow, stun). Immune for 5 s, long enough to use ahead of Powerball. (Morgana E Black Shield → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Morgana for each basic attack.

#### 4. Fizz (net +1.23)

- **0.90** untargetable: Playful makes Fizz untargetable, dodging Rammus's Soaring Slam. Untargetable for 0.75 s; Soaring Slam takes 0.89 s to land, enough to react. (Fizz E Playful → Rammus R Soaring Slam)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 0.75 s; Frenzying Taunt takes 0.25 s to land, enough to react. (Fizz E Playful → Rammus E Frenzying Taunt)
- **0.36** untargetable: Playful makes Fizz untargetable, dodging Rammus's Powerball. Untargetable for 0.75 s; Powerball lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Fizz for each basic attack.

#### 5. Rek'Sai (net +1.21)

- **0.90** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Soaring Slam. Untargetable for 1.5 s, long enough to use ahead of Soaring Slam. (Rek'Sai R Void Rush → Rammus R Soaring Slam)
- **0.35** interrupt: Unburrow's airborne interrupts Rammus's Powerball (normal channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Rammus Q Powerball)
- **0.34** untargetable: Void Rush makes Rek'Sai untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 1.5 s, long enough to use ahead of Frenzying Taunt. (Rek'Sai R Void Rush → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Rek'Sai for each basic attack.

#### 6. Lissandra (net +1.17)

- **0.90** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Lissandra R Frozen Tomb → Rammus R Soaring Slam)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Lissandra R Frozen Tomb → Rammus E Frenzying Taunt)
- **0.31** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Rammus's Powerball. Untargetable for 2.5 s, long enough to use ahead of Powerball. (Lissandra R Frozen Tomb → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Lissandra for each basic attack.

#### 7. Bard (net +1.15)

- **0.90** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Soaring Slam. Untargetable for 2.5 s, long enough to use ahead of Soaring Slam. (Bard R Tempered Fate → Rammus R Soaring Slam)
- **0.36** range: Bard's basic attacks reach 375 units farther than Rammus's (500 vs 125 attack range). Rammus closes the gap with Soaring Slam. (Bard basic attacks → Rammus basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2.5 s, long enough to use ahead of Frenzying Taunt. (Bard R Tempered Fate → Rammus E Frenzying Taunt)
- Watch out: Defensive Ball Curl deals damage back to Bard for each basic attack.

#### 8. Alistar (net +1.14)

- **0.72** cleanse: Unbreakable Will cleanses Rammus's Soaring Slam (airborne, slow) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Rammus R Soaring Slam)
- **0.27** cleanse: Unbreakable Will cleanses Rammus's Frenzying Taunt (taunt) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Rammus E Frenzying Taunt)
- **0.27** interrupt: Pulverize's airborne interrupts Rammus's Powerball (normal channel). Pulverize must land during the channel. (Alistar Q Pulverize → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Alistar for each basic attack.

#### 9. Fiora (net +1.13)

- **1.00** parry: Riposte parries Rammus's Soaring Slam and stuns back. Parry for 0.75 s; Soaring Slam takes 0.89 s to land, enough to react. Negating Soaring Slam's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus R Soaring Slam)
- **0.70** parry: Riposte parries Rammus's Frenzying Taunt and stuns back. Parry for 0.75 s; Frenzying Taunt takes 0.25 s to land, enough to react. Negating Frenzying Taunt's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus E Frenzying Taunt)
- **0.36** parry: Riposte parries Rammus's Powerball and stuns back. Parry for 0.75 s; Powerball lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Negating Powerball's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Fiora for each basic attack.

#### 10. Vladimir (net +1.10)

- **0.90** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Soaring Slam. Untargetable for 2 s, long enough to use ahead of Soaring Slam. (Vladimir W Sanguine Pool → Rammus R Soaring Slam)
- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Frenzying Taunt. Untargetable for 2 s, long enough to use ahead of Frenzying Taunt. (Vladimir W Sanguine Pool → Rammus E Frenzying Taunt)
- **0.44** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Rammus's Powerball. Untargetable for 2 s, long enough to use ahead of Powerball. (Vladimir W Sanguine Pool → Rammus Q Powerball)
- Watch out: Defensive Ball Curl deals damage back to Vladimir for each basic attack.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Maokai | +1.41 | 1.68 | 0.27 |  |
| 2 | Zaahen | +1.39 | 1.71 | 0.32 |  |
| 3 | Morgana | +1.26 | 1.50 | 0.24 |  |
| 4 | Fizz | +1.23 | 1.50 | 0.27 |  |
| 5 | Rek'Sai | +1.21 | 1.51 | 0.30 |  |
| 6 | Lissandra | +1.17 | 1.39 | 0.22 |  |
| 7 | Bard | +1.15 | 1.53 | 0.38 |  |
| 8 | Alistar | +1.14 | 1.46 | 0.32 |  |
| 9 | Fiora | +1.13 | 1.45 | 0.32 |  |
| 10 | Vladimir | +1.10 | 1.49 | 0.39 |  |
| 11 | Evelynn | +1.10 | 1.37 | 0.27 |  |
| 12 | Xayah | +1.09 | 1.47 | 0.38 |  |
| 13 | Aurora | +1.08 | 1.37 | 0.29 |  |
| 14 | Kled | +1.07 | 1.48 | 0.41 |  |
| 15 | Udyr | +1.06 | 1.47 | 0.41 |  |
| 16 | Nocturne | +1.05 | 1.43 | 0.38 |  |
| 17 | Camille | +1.03 | 1.41 | 0.38 |  |
| 18 | Shaco | +1.02 | 1.34 | 0.32 |  |
| 19 | Sion | +0.96 | 1.53 | 0.57 |  |
| 20 | Rell | +0.90 | 1.25 | 0.35 |  |
| 21 | Gwen | +0.88 | 1.24 | 0.36 |  |
| 22 | Sivir | +0.86 | 1.36 | 0.50 |  |
| 23 | Kalista | +0.82 | 1.14 | 0.32 |  |
| 24 | Gangplank | +0.78 | 1.07 | 0.29 |  |
| 25 | Olaf | +0.77 | 1.15 | 0.38 |  |
| 26 | Zed | +0.77 | 1.06 | 0.29 |  |
| 27 | Milio | +0.73 | 1.11 | 0.38 |  |
| 28 | Rengar | +0.73 | 1.11 | 0.38 |  |
| 29 | Master Yi | +0.69 | 1.50 | 0.81 |  |
| 30 | Heimerdinger | +0.63 | 0.83 | 0.20 |  |
| 31 | Cassiopeia | +0.59 | 0.81 | 0.22 | grounding (Miasma) |
| 32 | Lulu | +0.54 | 0.90 | 0.36 |  |
| 33 | Kayle | +0.53 | 0.89 | 0.36 |  |
| 34 | Anivia | +0.53 | 0.77 | 0.24 |  |
| 35 | Thresh | +0.50 | 0.74 | 0.24 |  |
| 36 | Gnar | +0.49 | 0.83 | 0.34 |  |
| 37 | K'Sante | +0.48 | 0.91 | 0.43 |  |
| 38 | Singed | +0.47 | 0.74 | 0.27 | grounding (Mega Adhesive) |
| 39 | Nami | +0.45 | 0.67 | 0.22 |  |
| 40 | Xin Zhao | +0.44 | 0.88 | 0.44 |  |
| 41 | Yuumi | +0.43 | 1.68 | 1.25 |  |
| 42 | Sejuani | +0.42 | 0.74 | 0.32 |  |
| 43 | Malzahar | +0.41 | 1.43 | 1.02 |  |
| 44 | Blitzcrank | +0.41 | 0.77 | 0.36 |  |
| 45 | Viktor | +0.40 | 0.72 | 0.32 |  |
| 46 | Seraphine | +0.40 | 0.69 | 0.29 |  |
| 47 | Renata Glasc | +0.37 | 0.75 | 0.38 |  |
| 48 | Yone | +0.37 | 0.64 | 0.27 |  |
| 49 | Teemo | +0.36 | 0.72 | 0.36 |  |
| 50 | Vex | +0.35 | 0.62 | 0.27 |  |
| 51 | Brand | +0.35 | 0.57 | 0.22 |  |
| 52 | Cho'Gath | +0.34 | 0.63 | 0.29 |  |
| 53 | Ornn | +0.33 | 0.60 | 0.27 |  |
| 54 | Zilean | +0.30 | 0.62 | 0.32 |  |
| 55 | Garen | +0.28 | 0.71 | 0.43 |  |
| 56 | Mordekaiser | +0.28 | 0.60 | 0.32 |  |
| 57 | Elise | +0.27 | 0.59 | 0.32 |  |
| 58 | Kennen | +0.27 | 0.56 | 0.29 |  |
| 59 | Urgot | +0.27 | 0.54 | 0.27 |  |
| 60 | Hwei | +0.27 | 0.50 | 0.23 |  |
| 61 | Annie | +0.27 | 0.49 | 0.22 |  |
| 62 | Swain | +0.27 | 0.48 | 0.21 |  |
| 63 | Kayn | +0.26 | 1.40 | 1.14 |  |
| 64 | Rakan | +0.26 | 0.55 | 0.29 |  |
| 65 | Jayce | +0.25 | 0.57 | 0.32 |  |
| 66 | Vayne | +0.24 | 0.67 | 0.43 |  |
| 67 | Aurelion Sol | +0.24 | 0.64 | 0.40 |  |
| 68 | Draven | +0.24 | 0.60 | 0.36 |  |
| 69 | Yasuo | +0.24 | 0.53 | 0.29 |  |
| 70 | Ziggs | +0.24 | 0.51 | 0.27 |  |
| 71 | Ahri | +0.24 | 0.46 | 0.22 |  |
| 72 | Zoe | +0.23 | 0.55 | 0.32 |  |
| 73 | Veigar | +0.23 | 0.47 | 0.24 |  |
| 74 | Leona | +0.22 | 0.51 | 0.29 |  |
| 75 | Soraka | +0.22 | 0.49 | 0.27 |  |
| 76 | Syndra | +0.22 | 0.44 | 0.22 |  |
| 77 | Riven | +0.18 | 0.56 | 0.38 |  |
| 78 | Sett | +0.17 | 0.49 | 0.32 |  |
| 79 | Ashe | +0.16 | 0.52 | 0.36 |  |
| 80 | Orianna | +0.16 | 0.43 | 0.27 |  |
| 81 | Sona | +0.15 | 0.56 | 0.41 |  |
| 82 | Tristana | +0.15 | 0.51 | 0.36 |  |
| 83 | Azir | +0.15 | 0.42 | 0.27 |  |
| 84 | Zyra | +0.15 | 0.39 | 0.24 |  |
| 85 | Neeko | +0.15 | 0.37 | 0.22 |  |
| 86 | Aphelios | +0.13 | 0.51 | 0.38 |  |
| 87 | Jax | +0.13 | 0.45 | 0.32 |  |
| 88 | Amumu | +0.12 | 0.39 | 0.27 |  |
| 89 | Malphite | +0.11 | 0.40 | 0.29 |  |
| 90 | Braum | +0.10 | 0.42 | 0.32 |  |
| 91 | Volibear | +0.08 | 0.40 | 0.32 |  |
| 92 | Nilah | +0.06 | 0.56 | 0.50 |  |
| 93 | Irelia | +0.05 | 0.32 | 0.27 |  |
| 94 | Shyvana | +0.04 | 0.33 | 0.29 |  |
| 95 | Lillia | +0.04 | 0.26 | 0.22 |  |
| 96 | Kassadin | +0.03 | 0.32 | 0.29 |  |
| 97 | Zeri | 0.00 | 0.44 | 0.44 |  |
| 98 | Twitch | 0.00 | 0.43 | 0.43 |  |
| 99 | Kai'Sa | 0.00 | 0.38 | 0.38 |  |
| 100 | Yunara | 0.00 | 0.36 | 0.36 |  |
| 101 | Corki | 0.00 | 0.32 | 0.32 |  |
| 102 | Ezreal | 0.00 | 0.32 | 0.32 |  |
| 103 | Senna | 0.00 | 0.32 | 0.32 |  |
| 104 | Smolder | 0.00 | 0.32 | 0.32 |  |
| 105 | Nidalee | 0.00 | 0.30 | 0.30 |  |
| 106 | Jinx | 0.00 | 0.29 | 0.29 |  |
| 107 | Lux | 0.00 | 0.29 | 0.29 |  |
| 108 | Mel | 0.00 | 0.27 | 0.27 |  |
| 109 | Karma | 0.00 | 0.22 | 0.22 |  |
| 110 | LeBlanc | 0.00 | 0.22 | 0.22 |  |
| 111 | Skarner | -0.01 | 0.31 | 0.32 |  |
| 112 | Renekton | -0.02 | 0.30 | 0.32 |  |
| 113 | Samira | -0.02 | 0.30 | 0.32 |  |
| 114 | Kog'Maw | -0.02 | 0.27 | 0.29 |  |
| 115 | Sylas | -0.02 | 0.27 | 0.29 |  |
| 116 | Kindred | -0.03 | 0.47 | 0.50 |  |
| 117 | Aatrox | -0.03 | 0.35 | 0.38 |  |
| 118 | Nasus | -0.03 | 0.29 | 0.32 |  |
| 119 | Pyke | -0.06 | 0.55 | 0.61 |  |
| 120 | Bel'Veth | -0.08 | 0.30 | 0.38 |  |
| 121 | Graves | -0.08 | 0.24 | 0.32 |  |
| 122 | Ambessa | -0.10 | 0.15 | 0.25 |  |
| 123 | Quinn | -0.11 | 0.68 | 0.79 |  |
| 124 | Hecarim | -0.11 | 0.21 | 0.32 |  |
| 125 | Diana | -0.11 | 0.16 | 0.27 |  |
| 126 | Lee Sin | -0.11 | 0.16 | 0.27 |  |
| 127 | Taric | -0.14 | 0.24 | 0.38 |  |
| 128 | Yorick | -0.14 | 0.24 | 0.38 |  |
| 129 | Darius | -0.14 | 0.22 | 0.36 |  |
| 130 | Jarvan IV | -0.15 | 0.21 | 0.36 |  |
| 131 | Qiyana | -0.15 | 0.15 | 0.30 |  |
| 132 | Nautilus | -0.16 | 0.16 | 0.32 |  |
| 133 | Illaoi | -0.16 | 0.13 | 0.29 |  |
| 134 | Warwick | -0.18 | 1.52 | 1.70 |  |
| 135 | Trundle | -0.19 | 0.22 | 0.41 |  |
| 136 | Varus | -0.22 | 0.27 | 0.49 |  |
| 137 | Gragas | -0.24 | 0.40 | 0.64 |  |
| 138 | Briar | -0.24 | 0.16 | 0.40 |  |
| 139 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 140 | Taliyah | -0.28 | 0.95 | 1.23 |  |
| 141 | Vel'Koz | -0.29 | 0.54 | 0.83 |  |
| 142 | Akali | -0.29 | 0.00 | 0.29 |  |
| 143 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 144 | Ivern | -0.32 | 0.19 | 0.51 |  |
| 145 | Dr. Mundo | -0.32 | 0.00 | 0.32 |  |
| 146 | Ekko | -0.32 | 0.00 | 0.32 |  |
| 147 | Fiddlesticks | -0.34 | 0.79 | 1.13 |  |
| 148 | Viego | -0.34 | 0.61 | 0.95 |  |
| 149 | Twisted Fate | -0.35 | 0.78 | 1.13 |  |
| 150 | Wukong | -0.35 | 0.15 | 0.50 |  |
| 151 | Talon | -0.36 | 0.00 | 0.36 |  |
| 152 | Locke | -0.38 | 0.00 | 0.38 |  |
| 153 | Xerath | -0.40 | 0.52 | 0.92 |  |
| 154 | Janna | -0.42 | 0.74 | 1.16 |  |
| 155 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 156 | Zac | -0.49 | 0.73 | 1.22 |  |
| 157 | Tahm Kench | -0.51 | 0.78 | 1.29 |  |
| 158 | Poppy | -0.52 | 0.15 | 0.67 |  |
| 159 | Caitlyn | -0.56 | 0.36 | 0.92 |  |
| 160 | Miss Fortune | -0.56 | 0.32 | 0.88 |  |
| 161 | Jhin | -0.56 | 0.27 | 0.83 |  |
| 162 | Lucian | -0.58 | 0.36 | 0.94 |  |
| 163 | Akshan | -0.58 | 0.34 | 0.92 |  |
| 164 | Karthus | -0.61 | 0.19 | 0.80 |  |
| 165 | Vi | -0.65 | 0.56 | 1.21 |  |
| 166 | Ryze | -0.70 | 0.24 | 0.94 |  |
| 167 | Shen | -0.72 | 0.56 | 1.28 |  |
| 168 | Galio | -0.75 | 0.70 | 1.45 |  |
| 169 | Pantheon | -0.76 | 0.56 | 1.32 |  |
| 170 | Nunu & Willump | -0.86 | 0.39 | 1.25 |  |
| 171 | Katarina | -0.88 | 0.00 | 0.88 |  |
| 172 | Naafiri | -1.19 | 0.00 | 1.19 |  |
