# Counters to Viego (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Viego: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Viego wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Viego --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.92 | +1.00 | +1.00 | +1.00 | +0.50 | – | +1.00 |
| 2 | Kayle | +0.89 | +1.00 | +1.00 | +1.00 | +0.60 | +1.00 | +0.00 |
| 3 | K'Sante | +0.88 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +1.00 |
| 4 | Vayne | +0.87 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +1.00 |
| 5 | Kog'Maw | +0.86 | +1.00 | +1.00 | +1.00 | +0.39 | +1.00 | +0.00 |
| 6 | Malphite | +0.84 | +1.00 | +1.00 | +1.00 | +0.35 | – | +0.00 |
| 7 | Gnar | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 8 | Master Yi | +0.84 | +1.00 | +1.00 | +1.00 | +0.01 | – | +1.00 |
| 9 | Warwick | +0.83 | +1.00 | +1.00 | +1.00 | +0.34 | – | +0.00 |
| 10 | Nasus | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +1.00 |
| 11 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 12 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 13 | Sivir | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 14 | Aurora | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 15 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 16 | Ashe | +0.82 | +1.00 | +1.00 | +0.84 | +0.31 | +1.00 | +0.00 |
| 17 | Annie | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 18 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 19 | Trundle | +0.81 | +1.00 | +1.00 | +1.00 | −0.15 | – | +1.00 |
| 20 | Yorick | +0.81 | +1.00 | +1.00 | +1.00 | −0.16 | – | +1.00 |
| 21 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 22 | Taric | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 23 | Karma | +0.79 | +1.00 | +1.00 | +0.99 | −0.08 | +1.00 | +0.00 |
| 24 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 25 | Wukong | +0.78 | +1.00 | +1.00 | +1.00 | +0.19 | – | −0.50 |
| 26 | Olaf | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 27 | Aatrox | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 28 | Graves | +0.78 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | −1.00 |
| 29 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 30 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 31 | Nocturne | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 32 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 33 | Tahm Kench | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 34 | Camille | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 35 | Jax | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 36 | Dr. Mundo | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 37 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 38 | Xin Zhao | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 39 | Illaoi | +0.75 | +1.00 | +0.87 | +1.00 | +0.07 | – | +0.00 |
| 40 | Darius | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 41 | Zaahen | +0.74 | +1.00 | +1.00 | +0.83 | +0.03 | – | +0.00 |
| 42 | Cho'Gath | +0.74 | +1.00 | +1.00 | +1.00 | −0.23 | – | +0.00 |
| 43 | Volibear | +0.73 | +1.00 | +0.78 | +1.00 | −0.16 | – | +0.74 |
| 44 | Lulu | +0.68 | +1.00 | +1.00 | +1.00 | +0.09 | −0.31 | +0.00 |
| 45 | Mordekaiser | +0.67 | +0.82 | +0.88 | +0.98 | −0.12 | – | +0.00 |
| 46 | Elise | +0.62 | +1.00 | +1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 47 | Irelia | +0.57 | +1.00 | +1.00 | +0.00 | +0.07 | – | +0.00 |
| 48 | Sion | +0.51 | +0.96 | +0.96 | +0.00 | −0.14 | – | +0.00 |
| 49 | Braum | +0.49 | +1.00 | +0.04 | +1.00 | −0.10 | – | +0.00 |
| 50 | Corki | +0.49 | −0.31 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 51 | Zeri | +0.49 | +0.50 | +1.00 | +0.00 | +0.07 | +1.00 | +0.00 |
| 52 | Jayce | +0.45 | +1.00 | −0.22 | +1.00 | +0.06 | – | +0.00 |
| 53 | Milio | +0.45 | +1.00 | +1.00 | −1.00 | +0.33 | +1.00 | +0.00 |
| 54 | Cassiopeia | +0.44 | +1.00 | +1.00 | −1.00 | +0.24 | +1.00 | +0.00 |
| 55 | Twisted Fate | +0.42 | +1.00 | +1.00 | −1.00 | +0.14 | +1.00 | +0.00 |
| 56 | Heimerdinger | +0.42 | +1.00 | −0.17 | +1.00 | +0.25 | −0.28 | +0.00 |
| 57 | Udyr | +0.39 | +1.00 | −0.65 | +1.00 | +0.08 | – | +1.00 |
| 58 | Yone | +0.35 | +1.00 | +1.00 | −1.00 | −0.07 | – | +0.49 |
| 59 | Rammus | +0.30 | +1.00 | +1.00 | −1.00 | −0.18 | – | +0.00 |
| 60 | Sett | +0.29 | +1.00 | −0.73 | +1.00 | −0.04 | – | +0.00 |
| 61 | Kalista | +0.23 | +1.00 | +0.93 | −1.00 | +0.12 | −0.67 | +0.00 |
| 62 | Brand | +0.22 | +1.00 | +1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 63 | Varus | +0.16 | +0.11 | +1.00 | −1.00 | +0.03 | +0.80 | +0.00 |
| 64 | Samira | +0.13 | +0.00 | +1.00 | −1.00 | +0.12 | +0.59 | +0.00 |
| 65 | Ezreal | +0.12 | +0.35 | −0.24 | +0.30 | −0.01 | +0.30 | +0.00 |
| 66 | Neeko | −0.05 | −0.94 | +1.00 | −1.00 | +0.25 | +0.93 | +0.00 |
| 67 | Orianna | −0.08 | −1.00 | +1.00 | +0.00 | +0.16 | −1.00 | +0.00 |
| 68 | Anivia | −0.08 | −0.71 | +1.00 | −1.00 | −0.21 | +0.81 | +0.00 |
| 69 | Zilean | −0.09 | −1.00 | −0.15 | +1.00 | +0.05 | −0.14 | +0.00 |
| 70 | Bel'Veth | −0.10 | −0.96 | −0.46 | +1.00 | +0.07 | – | +0.98 |
| 71 | Kai'Sa | −0.16 | −1.00 | +0.07 | +0.00 | −0.17 | +1.00 | +0.00 |
| 72 | Twitch | −0.17 | +1.00 | −0.55 | −1.00 | +0.11 | −1.00 | +0.00 |
| 73 | Gangplank | −0.17 | −1.00 | +1.00 | −1.00 | −0.04 | – | +1.00 |
| 74 | Caitlyn | −0.23 | +0.04 | +0.08 | −1.00 | +0.06 | −0.65 | +0.00 |
| 75 | Xayah | −0.26 | −0.56 | −1.00 | +0.00 | +0.16 | +1.00 | +0.00 |
| 76 | Miss Fortune | −0.28 | +1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 77 | Malzahar | −0.29 | −0.48 | +0.24 | −1.00 | +0.04 | −0.40 | +0.00 |
| 78 | Azir | −0.29 | −1.00 | +1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 79 | Yasuo | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 80 | Pantheon | −0.34 | −1.00 | −1.00 | +1.00 | −0.01 | – | +0.00 |
| 81 | Gwen | −0.37 | −1.00 | −1.00 | +1.00 | −0.24 | – | +0.00 |
| 82 | Nilah | −0.41 | −1.00 | −1.00 | +0.50 | +0.22 | – | +0.00 |
| 83 | Hwei | −0.48 | −1.00 | −0.53 | −0.03 | +0.02 | −0.91 | +0.00 |
| 84 | Rakan | −0.49 | −1.00 | −1.00 | +0.00 | +0.06 | +0.01 | +0.00 |
| 85 | Karthus | −0.54 | +0.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 86 | Jinx | −0.59 | −0.17 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 87 | Tristana | −0.59 | −1.00 | −1.00 | −1.00 | +0.05 | +1.00 | +0.00 |
| 88 | Bard | −0.59 | −0.62 | −0.63 | −1.00 | +0.13 | −1.00 | +0.00 |
| 89 | Yunara | −0.60 | −1.00 | −1.00 | −1.00 | +0.21 | +0.69 | +0.00 |
| 90 | Lillia | −0.61 | −1.00 | −1.00 | −1.00 | −0.09 | +1.00 | +0.00 |
| 91 | Nami | −0.62 | −1.00 | −0.31 | −1.00 | +0.04 | −1.00 | +0.00 |
| 92 | Mel | −0.64 | −0.47 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 93 | Lucian | −0.65 | −1.00 | −1.00 | −1.00 | +0.03 | +0.49 | +0.00 |
| 94 | Draven | −0.66 | −1.00 | −0.32 | −1.00 | −0.20 | −1.00 | +0.00 |
| 95 | Kennen | −0.70 | −1.00 | −1.00 | −1.00 | −0.06 | +0.09 | +0.00 |
| 96 | Rengar | −0.72 | −1.00 | −1.00 | −1.00 | +0.34 | – | +0.00 |
| 97 | Aurelion Sol | −0.72 | −1.00 | −1.00 | −1.00 | +0.51 | −1.00 | +0.00 |
| 98 | Singed | −0.73 | −1.00 | −0.74 | −1.00 | −0.12 | – | +0.00 |
| 99 | Vi | −0.74 | −1.00 | −0.78 | −1.00 | −0.11 | – | +0.00 |
| 100 | Sylas | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 101 | Maokai | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 102 | Vel'Koz | −0.75 | −0.91 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 103 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 104 | Riven | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 105 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 106 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 107 | Morgana | −0.76 | −1.00 | −1.00 | −1.00 | +0.14 | −0.86 | +0.00 |
| 108 | Skarner | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 109 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 110 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 111 | Ambessa | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 112 | Alistar | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 113 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 114 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 115 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 116 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 117 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 118 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 119 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 120 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 121 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 122 | Zac | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 123 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 124 | Jhin | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 125 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 126 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 127 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 128 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 129 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 130 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 131 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 132 | Rek'Sai | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 133 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 134 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 135 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 136 | Galio | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 137 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 138 | Amumu | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 139 | Vex | −0.79 | −0.99 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 140 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 141 | Briar | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 142 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 143 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 144 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 145 | Swain | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 146 | Akali | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 147 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 148 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 149 | Smolder | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | −0.72 | −1.00 |
| 150 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 151 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 152 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 153 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 154 | Lee Sin | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 155 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 156 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 157 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 158 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 159 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 160 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 161 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 162 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 163 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 164 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 165 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 166 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 167 | Fiddlesticks | −0.83 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 168 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 169 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 170 | Ryze | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 171 | Yuumi | −0.86 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −1.00 |
| 172 | Thresh | −0.89 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Viego's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Viego's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Viego` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Nocturne (net +1.62)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Viego's Heartbreaker. Spell shield for 1.5 s, long enough to use ahead of Heartbreaker. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viego R Heartbreaker)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Viego's Spectral Maw. Spell shield for 1.5 s, long enough to use ahead of Spectral Maw. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Viego W Spectral Maw)
- **0.21** interrupt: Unspeakable Horror's fear interrupts Viego's Spectral Maw (charge-up). Unspeakable Horror must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Nocturne E Unspeakable Horror → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Nocturne's (200 vs 125 attack range).

#### 2. Fizz (net +1.60)

- **1.00** untargetable: Playful makes Fizz untargetable, dodging Viego's Heartbreaker. Untargetable for 0.75 s; Heartbreaker takes 0.5 s to land, enough to react. (Fizz E Playful → Viego R Heartbreaker)
- **1.00** untargetable: Playful makes Fizz untargetable, dodging Viego's Spectral Maw. Untargetable for 0.75 s; Spectral Maw takes 0.5 s to land, enough to react. (Fizz E Playful → Viego W Spectral Maw)
- **0.12** interrupt: Chum the Waters's airborne interrupts Viego's Spectral Maw (charge-up). Chum the Waters must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Fizz R Chum the Waters → Viego W Spectral Maw)
- Watch out: Heartbreaker is displacement immune, ignoring Fizz's Chum the Waters (airborne) during it.

#### 3. Maokai (net +1.53)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Viego's Heartbreaker. Untargetable for 1.4 s; Heartbreaker takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Viego R Heartbreaker)
- **0.88** untargetable: Twisted Advance makes Maokai untargetable, dodging Viego's Spectral Maw. Untargetable for 1.4 s; Spectral Maw takes 0.5 s to land, enough to react. (Maokai W Twisted Advance → Viego W Spectral Maw)
- **0.25** interrupt: Bramble Smash's airborne interrupts Viego's Spectral Maw (charge-up). Bramble Smash must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Maokai Q Bramble Smash → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Maokai's (200 vs 125 attack range).

#### 4. Morgana (net +1.53)

- **1.00** cc immunity: Black Shield makes Morgana immune to Viego's Heartbreaker (airborne, slow). Immune for 5 s, long enough to use ahead of Heartbreaker. (Morgana E Black Shield → Viego R Heartbreaker)
- **0.70** cc immunity: Black Shield makes Morgana immune to Viego's Spectral Maw (stun). Immune for 5 s, long enough to use ahead of Spectral Maw. (Morgana E Black Shield → Viego W Spectral Maw)
- **0.11** reveal: Soul Shackles reveals Viego through Harrowed Path's stealth. (Morgana R Soul Shackles → Viego E Harrowed Path)

#### 5. Sivir (net +1.53)

- **1.00** spell shield: Spell Shield's spell shield blocks Viego's Heartbreaker. Spell shield for 1.5 s, long enough to use ahead of Heartbreaker. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viego R Heartbreaker)
- **0.67** spell shield: Spell Shield's spell shield blocks Viego's Spectral Maw. Spell shield for 1.5 s, long enough to use ahead of Spectral Maw. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Viego W Spectral Maw)
- **0.19** range: Sivir's basic attacks reach 300 units farther than Viego's (500 vs 200 attack range). Viego closes the gap with Heartbreaker, Sovereign's Domination, Spectral Maw. (Sivir basic attacks → Viego basic attacks)

#### 6. Zaahen (net +1.50)

- **1.00** cc immunity: Grim Deliverance makes Zaahen immune to Viego's Heartbreaker (airborne, slow). Immune for ?; Heartbreaker takes 0.5 s to land, enough to react. (Zaahen R Grim Deliverance → Viego R Heartbreaker)
- **0.46** cc immunity: Grim Deliverance makes Zaahen immune to Viego's Spectral Maw (stun). Immune for ?; Spectral Maw takes 0.5 s to land, enough to react. (Zaahen R Grim Deliverance → Viego W Spectral Maw)
- **0.25** interrupt: The Darkin Glaive's airborne interrupts Viego's Spectral Maw (charge-up). The Darkin Glaive must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Zaahen Q The Darkin Glaive → Viego W Spectral Maw)
- Watch out: Heartbreaker is displacement immune, ignoring Zaahen's The Darkin Glaive (airborne) during it.

#### 7. Udyr (net +1.47)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Viego's Heartbreaker (airborne, slow). Immune for 1.5 s, long enough to use ahead of Heartbreaker. (Udyr E Blazing Stampede → Viego R Heartbreaker)
- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Viego's Spectral Maw (stun). Immune for 1.5 s, long enough to use ahead of Spectral Maw. (Udyr E Blazing Stampede → Viego W Spectral Maw)
- **0.25** interrupt: Blazing Stampede's stun interrupts Viego's Spectral Maw (charge-up). Blazing Stampede must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Udyr E Blazing Stampede → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Udyr's (200 vs 125 attack range).

#### 8. Fiora (net +1.43)

- **1.00** parry: Riposte parries Viego's Heartbreaker and stuns back. Parry for 0.75 s; Heartbreaker takes 0.5 s to land, enough to react. Negating Heartbreaker's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Viego R Heartbreaker)
- **0.80** parry: Riposte parries Viego's Spectral Maw and stuns back. Parry for 0.75 s; Spectral Maw takes 0.5 s to land, enough to react. Negating Spectral Maw's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Viego W Spectral Maw)
- **0.12** attack speed slow: Riposte cuts Viego's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Viego basic attacks)

#### 9. Evelynn (net +1.38)

- **1.00** untargetable: Last Caress makes Evelynn untargetable, dodging Viego's Heartbreaker. Untargetable for ?; Heartbreaker takes 0.5 s to land, enough to react. (Evelynn R Last Caress → Viego R Heartbreaker)
- **0.46** untargetable: Last Caress makes Evelynn untargetable, dodging Viego's Spectral Maw. Untargetable for ?; Spectral Maw takes 0.5 s to land, enough to react. (Evelynn R Last Caress → Viego W Spectral Maw)
- **0.21** interrupt: Allure's charm interrupts Viego's Spectral Maw (charge-up). Allure must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Evelynn W Allure → Viego W Spectral Maw)
- Watch out: Viego's basic attacks reach 75 units farther than Evelynn's (200 vs 125 attack range).

#### 10. Rek'Sai (net +1.36)

- **1.00** untargetable: Void Rush makes Rek'Sai untargetable, dodging Viego's Heartbreaker. Untargetable for 1.5 s, long enough to use ahead of Heartbreaker. (Rek'Sai R Void Rush → Viego R Heartbreaker)
- **0.46** untargetable: Void Rush makes Rek'Sai untargetable, dodging Viego's Spectral Maw. Untargetable for 1.5 s, long enough to use ahead of Spectral Maw. (Rek'Sai R Void Rush → Viego W Spectral Maw)
- **0.25** interrupt: Unburrow's airborne interrupts Viego's Spectral Maw (charge-up). Unburrow must land during the charge-up. Viego can release Spectral Maw early instead of charging it fully. (Rek'Sai W Unburrow → Viego W Spectral Maw)
- Watch out: Heartbreaker is displacement immune, ignoring Rek'Sai's Unburrow (airborne) during it.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Nocturne | +1.62 | 1.71 | 0.09 |  |
| 2 | Fizz | +1.60 | 1.68 | 0.08 |  |
| 3 | Maokai | +1.53 | 1.69 | 0.16 |  |
| 4 | Morgana | +1.53 | 1.53 | 0.00 |  |
| 5 | Sivir | +1.53 | 1.53 | 0.00 |  |
| 6 | Zaahen | +1.50 | 1.68 | 0.18 |  |
| 7 | Udyr | +1.47 | 1.56 | 0.09 |  |
| 8 | Fiora | +1.43 | 1.43 | 0.00 |  |
| 9 | Evelynn | +1.38 | 1.44 | 0.06 |  |
| 10 | Rek'Sai | +1.36 | 1.52 | 0.16 |  |
| 11 | Shaco | +1.35 | 1.41 | 0.06 |  |
| 12 | Lissandra | +1.35 | 1.40 | 0.05 |  |
| 13 | Gwen | +1.34 | 1.34 | 0.00 |  |
| 14 | Bard | +1.32 | 1.40 | 0.08 |  |
| 15 | Singed | +1.28 | 1.54 | 0.26 | grounding (Mega Adhesive), grounding (Mega Adhesive) |
| 16 | Kled | +1.28 | 1.52 | 0.24 |  |
| 17 | Vladimir | +1.28 | 1.42 | 0.14 |  |
| 18 | Aurora | +1.26 | 1.26 | 0.00 |  |
| 19 | Xayah | +1.26 | 1.26 | 0.00 |  |
| 20 | Master Yi | +1.24 | 1.58 | 0.34 |  |
| 21 | Sion | +1.23 | 1.52 | 0.29 |  |
| 22 | Alistar | +1.22 | 1.43 | 0.21 |  |
| 23 | Camille | +1.22 | 1.42 | 0.20 |  |
| 24 | Rengar | +1.18 | 1.37 | 0.19 |  |
| 25 | Braum | +1.16 | 1.33 | 0.17 | projectile block (Unbreakable) |
| 26 | Zed | +1.05 | 1.11 | 0.06 |  |
| 27 | Olaf | +1.04 | 1.23 | 0.19 |  |
| 28 | Cassiopeia | +0.94 | 0.94 | 0.00 | grounding (Miasma), grounding (Miasma) |
| 29 | Gangplank | +0.91 | 1.10 | 0.19 |  |
| 30 | Lulu | +0.87 | 0.95 | 0.08 | disarm (Whimsy) |
| 31 | Yasuo | +0.85 | 1.13 | 0.28 | projectile block (Wind Wall) |
| 32 | Milio | +0.84 | 0.91 | 0.07 |  |
| 33 | Yuumi | +0.83 | 1.62 | 0.79 |  |
| 34 | Nilah | +0.80 | 0.88 | 0.08 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 35 | Hwei | +0.80 | 0.87 | 0.07 | dash stop (Grim Visage) |
| 36 | Kayle | +0.80 | 0.80 | 0.00 |  |
| 37 | Teemo | +0.80 | 0.80 | 0.00 | blind (Blinding Dart) |
| 38 | Kalista | +0.78 | 0.97 | 0.19 |  |
| 39 | Rell | +0.77 | 1.01 | 0.24 |  |
| 40 | Jax | +0.77 | 0.86 | 0.09 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 41 | Garen | +0.76 | 0.76 | 0.00 |  |
| 42 | Mel | +0.70 | 0.70 | 0.00 | projectile block (Rebuttal) |
| 43 | Viktor | +0.69 | 0.73 | 0.04 |  |
| 44 | Vex | +0.69 | 0.72 | 0.03 |  |
| 45 | Xin Zhao | +0.65 | 0.83 | 0.18 |  |
| 46 | Samira | +0.65 | 0.74 | 0.09 | projectile block (Blade Whirl) |
| 47 | Heimerdinger | +0.61 | 0.61 | 0.00 |  |
| 48 | Malzahar | +0.57 | 1.40 | 0.83 |  |
| 49 | Ahri | +0.56 | 0.60 | 0.04 | dash stop (Charm) |
| 50 | Kayn | +0.55 | 1.49 | 0.94 |  |
| 51 | K'Sante | +0.52 | 0.69 | 0.17 |  |
| 52 | Jinx | +0.52 | 0.56 | 0.04 | dash stop (Flame Chompers!) |
| 53 | Veigar | +0.52 | 0.56 | 0.04 |  |
| 54 | Renata Glasc | +0.45 | 0.52 | 0.07 |  |
| 55 | Thresh | +0.44 | 0.57 | 0.13 |  |
| 56 | Gnar | +0.44 | 0.52 | 0.08 |  |
| 57 | Seraphine | +0.44 | 0.44 | 0.00 |  |
| 58 | Elise | +0.42 | 0.42 | 0.00 |  |
| 59 | Anivia | +0.40 | 0.54 | 0.14 |  |
| 60 | Yone | +0.39 | 0.64 | 0.25 |  |
| 61 | Zilean | +0.39 | 0.39 | 0.00 |  |
| 62 | Brand | +0.35 | 0.35 | 0.00 |  |
| 63 | Kennen | +0.35 | 0.35 | 0.00 |  |
| 64 | Rammus | +0.34 | 0.95 | 0.61 | attack reflect (Defensive Ball Curl) |
| 65 | Amumu | +0.34 | 0.48 | 0.14 |  |
| 66 | Skarner | +0.34 | 0.34 | 0.00 |  |
| 67 | Varus | +0.33 | 0.50 | 0.17 |  |
| 68 | Urgot | +0.33 | 0.42 | 0.09 |  |
| 69 | Annie | +0.33 | 0.33 | 0.00 |  |
| 70 | Warwick | +0.32 | 1.62 | 1.30 |  |
| 71 | Sejuani | +0.32 | 0.56 | 0.24 |  |
| 72 | Vayne | +0.32 | 0.39 | 0.07 |  |
| 73 | Volibear | +0.32 | 0.32 | 0.00 |  |
| 74 | Nasus | +0.31 | 0.50 | 0.19 | attack speed slow (Wither) |
| 75 | Karma | +0.31 | 0.31 | 0.00 |  |
| 76 | Ornn | +0.30 | 0.46 | 0.16 |  |
| 77 | Ashe | +0.30 | 0.30 | 0.00 |  |
| 78 | Soraka | +0.30 | 0.30 | 0.00 |  |
| 79 | Mordekaiser | +0.29 | 0.43 | 0.14 |  |
| 80 | Draven | +0.29 | 0.36 | 0.07 |  |
| 81 | Sona | +0.29 | 0.29 | 0.00 |  |
| 82 | Nami | +0.28 | 0.46 | 0.18 |  |
| 83 | Leona | +0.28 | 0.37 | 0.09 |  |
| 84 | Jayce | +0.27 | 0.34 | 0.07 |  |
| 85 | Aphelios | +0.27 | 0.27 | 0.00 |  |
| 86 | Kai'Sa | +0.27 | 0.27 | 0.00 |  |
| 87 | Shyvana | +0.27 | 0.27 | 0.00 |  |
| 88 | Sett | +0.26 | 0.42 | 0.16 |  |
| 89 | Zoe | +0.26 | 0.33 | 0.07 |  |
| 90 | Kassadin | +0.25 | 0.25 | 0.00 |  |
| 91 | Sylas | +0.23 | 0.33 | 0.10 |  |
| 92 | Swain | +0.23 | 0.30 | 0.07 |  |
| 93 | Nidalee | +0.23 | 0.23 | 0.00 |  |
| 94 | Blitzcrank | +0.22 | 0.59 | 0.37 |  |
| 95 | Cho'Gath | +0.22 | 0.48 | 0.26 |  |
| 96 | Aurelion Sol | +0.22 | 0.43 | 0.21 |  |
| 97 | Irelia | +0.22 | 0.22 | 0.00 |  |
| 98 | Poppy | +0.21 | 0.80 | 0.59 | dash stop (Steadfast Presence) |
| 99 | Tristana | +0.21 | 0.29 | 0.08 |  |
| 100 | Syndra | +0.21 | 0.28 | 0.07 |  |
| 101 | Malphite | +0.20 | 0.49 | 0.29 |  |
| 102 | Lee Sin | +0.20 | 0.34 | 0.14 |  |
| 103 | LeBlanc | +0.20 | 0.20 | 0.00 |  |
| 104 | Taric | +0.20 | 0.20 | 0.00 |  |
| 105 | Aatrox | +0.19 | 0.36 | 0.17 |  |
| 106 | Kindred | +0.19 | 0.19 | 0.00 |  |
| 107 | Twitch | +0.19 | 0.19 | 0.00 |  |
| 108 | Zeri | +0.19 | 0.19 | 0.00 |  |
| 109 | Zac | +0.18 | 0.99 | 0.81 | dash stop (Stretching Strikes) |
| 110 | Riven | +0.18 | 0.44 | 0.26 |  |
| 111 | Bel'Veth | +0.18 | 0.25 | 0.07 |  |
| 112 | Rakan | +0.17 | 0.37 | 0.20 |  |
| 113 | Zyra | +0.17 | 0.33 | 0.16 |  |
| 114 | Yunara | +0.17 | 0.17 | 0.00 |  |
| 115 | Pyke | +0.16 | 0.46 | 0.30 |  |
| 116 | Renekton | +0.16 | 0.25 | 0.09 |  |
| 117 | Senna | +0.16 | 0.16 | 0.00 |  |
| 118 | Ziggs | +0.15 | 0.32 | 0.17 |  |
| 119 | Orianna | +0.15 | 0.23 | 0.08 |  |
| 120 | Corki | +0.14 | 0.14 | 0.00 |  |
| 121 | Ezreal | +0.14 | 0.14 | 0.00 |  |
| 122 | Smolder | +0.14 | 0.14 | 0.00 |  |
| 123 | Neeko | +0.13 | 0.21 | 0.08 |  |
| 124 | Lux | +0.13 | 0.13 | 0.00 |  |
| 125 | Illaoi | +0.12 | 0.21 | 0.09 |  |
| 126 | Darius | +0.11 | 0.18 | 0.07 |  |
| 127 | Trundle | +0.11 | 0.18 | 0.07 |  |
| 128 | Ambessa | +0.11 | 0.17 | 0.06 |  |
| 129 | Kog'Maw | +0.11 | 0.11 | 0.00 |  |
| 130 | Graves | +0.09 | 0.09 | 0.00 |  |
| 131 | Briar | +0.08 | 0.18 | 0.10 |  |
| 132 | Hecarim | +0.08 | 0.16 | 0.08 |  |
| 133 | Shen | +0.06 | 1.02 | 0.96 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 134 | Azir | +0.06 | 0.22 | 0.16 |  |
| 135 | Yorick | +0.06 | 0.20 | 0.14 |  |
| 136 | Lillia | +0.06 | 0.14 | 0.08 |  |
| 137 | Akali | +0.05 | 0.11 | 0.06 |  |
| 138 | Diana | +0.04 | 0.12 | 0.08 |  |
| 139 | Qiyana | +0.03 | 0.11 | 0.08 |  |
| 140 | Quinn | +0.02 | 0.41 | 0.39 |  |
| 141 | Nautilus | 0.00 | 0.12 | 0.12 |  |
| 142 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 143 | Wukong | -0.05 | 0.11 | 0.16 |  |
| 144 | Ekko | -0.06 | 0.00 | 0.06 |  |
| 145 | Talon | -0.06 | 0.00 | 0.06 |  |
| 146 | Kha'Zix | -0.09 | 0.00 | 0.09 |  |
| 147 | Locke | -0.09 | 0.00 | 0.09 |  |
| 148 | Jarvan IV | -0.12 | 0.16 | 0.28 |  |
| 149 | Fiddlesticks | -0.13 | 0.74 | 0.87 |  |
| 150 | Ivern | -0.14 | 0.08 | 0.22 |  |
| 151 | Caitlyn | -0.16 | 0.40 | 0.56 |  |
| 152 | Twisted Fate | -0.17 | 0.53 | 0.70 |  |
| 153 | Gragas | -0.18 | 0.32 | 0.50 |  |
| 154 | Dr. Mundo | -0.19 | 0.00 | 0.19 |  |
| 155 | Rumble | -0.19 | 0.00 | 0.19 |  |
| 156 | Katarina | -0.20 | 0.37 | 0.57 |  |
| 157 | Tahm Kench | -0.25 | 0.59 | 0.84 |  |
| 158 | Vel'Koz | -0.27 | 0.33 | 0.60 |  |
| 159 | Akshan | -0.28 | 0.25 | 0.53 |  |
| 160 | Pantheon | -0.31 | 0.67 | 0.98 |  |
| 161 | Xerath | -0.31 | 0.32 | 0.63 |  |
| 162 | Vi | -0.40 | 0.44 | 0.84 |  |
| 163 | Lucian | -0.42 | 0.14 | 0.56 |  |
| 164 | Miss Fortune | -0.42 | 0.14 | 0.56 |  |
| 165 | Taliyah | -0.44 | 0.66 | 1.10 |  |
| 166 | Jhin | -0.44 | 0.12 | 0.56 |  |
| 167 | Janna | -0.46 | 0.46 | 0.92 |  |
| 168 | Karthus | -0.49 | 0.07 | 0.56 |  |
| 169 | Ryze | -0.60 | 0.10 | 0.70 |  |
| 170 | Galio | -0.70 | 0.55 | 1.25 |  |
| 171 | Nunu & Willump | -0.71 | 0.36 | 1.07 |  |
| 172 | Naafiri | -0.84 | 0.11 | 0.95 |  |
