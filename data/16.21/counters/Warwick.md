# Counters to Warwick (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Warwick: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Warwick wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Warwick --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Xayah | +0.89 | +1.00 | +1.00 | +1.00 | +0.60 | +1.00 | +0.00 |
| 2 | Aphelios | +0.88 | +1.00 | +1.00 | +1.00 | +0.56 | +1.00 | +0.00 |
| 3 | Sivir | +0.88 | +1.00 | +1.00 | +1.00 | +0.55 | +1.00 | +0.00 |
| 4 | Ashe | +0.87 | +1.00 | +1.00 | +1.00 | +0.47 | +1.00 | +0.00 |
| 5 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.36 | +1.00 | +0.00 |
| 6 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.00 | – | +1.00 |
| 7 | Yorick | +0.83 | +1.00 | +1.00 | +1.00 | −0.01 | – | +1.00 |
| 8 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 9 | Bard | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 10 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 11 | Hwei | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 12 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 13 | Cho'Gath | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 14 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 15 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 16 | Ivern | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 17 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 18 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 19 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 20 | Neeko | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 21 | Quinn | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 22 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.22 | +1.00 | +0.00 |
| 23 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 24 | Karma | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 25 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 26 | Lux | +0.76 | +0.93 | +1.00 | +0.90 | +0.03 | +0.94 | +0.00 |
| 27 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | – | +0.42 |
| 28 | Tryndamere | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 29 | Aatrox | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 30 | Ezreal | +0.69 | +0.97 | +0.93 | +0.57 | +0.02 | +0.98 | +0.00 |
| 31 | Zaahen | +0.69 | +0.84 | +0.84 | +1.00 | −0.00 | – | +0.00 |
| 32 | Illaoi | +0.68 | +0.64 | +1.00 | +1.00 | −0.17 | +1.00 | +0.00 |
| 33 | Shyvana | +0.65 | +1.00 | +1.00 | +1.00 | +0.00 | −0.50 | +0.00 |
| 34 | Lulu | +0.63 | +1.00 | +1.00 | +1.00 | +0.21 | −1.00 | +0.00 |
| 35 | Zeri | +0.62 | +1.00 | +1.00 | +0.00 | +0.12 | +1.00 | +0.00 |
| 36 | Singed | +0.59 | +1.00 | +1.00 | +0.18 | −0.04 | – | +0.00 |
| 37 | Jinx | +0.53 | +0.82 | +0.80 | +0.77 | −0.12 | −0.09 | +0.00 |
| 38 | Kayle | +0.48 | +1.00 | +1.00 | −1.00 | +0.52 | +1.00 | +0.00 |
| 39 | Zilean | +0.47 | +1.00 | +1.00 | −1.00 | +0.50 | +1.00 | +0.00 |
| 40 | Anivia | +0.42 | +0.06 | +1.00 | +1.00 | −0.21 | −0.14 | +0.00 |
| 41 | Morgana | +0.39 | +1.00 | +1.00 | −1.00 | −0.05 | +1.00 | +0.00 |
| 42 | Gangplank | +0.29 | +1.00 | −1.00 | +1.00 | +0.06 | – | +1.00 |
| 43 | Twisted Fate | +0.25 | −1.00 | +1.00 | +1.00 | −0.33 | +1.00 | +0.00 |
| 44 | Alistar | +0.25 | +1.00 | −1.00 | +1.00 | +0.14 | – | +0.00 |
| 45 | Poppy | +0.24 | +1.00 | −1.00 | +1.00 | +0.11 | – | +0.00 |
| 46 | Kled | +0.20 | +0.00 | +0.00 | +1.00 | −0.12 | – | +0.00 |
| 47 | Lucian | −0.04 | +1.00 | −1.00 | −1.00 | +0.39 | +1.00 | +0.00 |
| 48 | Malzahar | −0.04 | +0.00 | +1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 49 | Lissandra | −0.09 | −1.00 | +1.00 | −1.00 | +0.08 | +1.00 | +0.00 |
| 50 | Vel'Koz | −0.17 | +0.88 | −1.00 | −1.00 | −0.20 | +0.95 | +0.00 |
| 51 | Master Yi | −0.21 | −1.00 | −1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 52 | Riven | −0.25 | −1.00 | +0.00 | +0.00 | +0.20 | – | +0.00 |
| 53 | Orianna | −0.26 | −1.00 | +1.00 | −1.00 | +0.27 | −1.00 | +0.00 |
| 54 | Yunara | −0.27 | −0.04 | −0.04 | −1.00 | +0.38 | −1.00 | +0.00 |
| 55 | Teemo | −0.30 | −1.00 | −0.95 | +1.00 | +0.56 | −1.00 | +0.00 |
| 56 | Kennen | −0.33 | −1.00 | −1.00 | +1.00 | −0.02 | −0.28 | +0.00 |
| 57 | Gwen | −0.35 | −1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 58 | Graves | −0.36 | −1.00 | +1.00 | −1.00 | −0.06 | −1.00 | −1.00 |
| 59 | Heimerdinger | −0.39 | −1.00 | −1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 60 | Bel'Veth | −0.39 | −1.00 | −1.00 | +1.00 | −0.37 | – | +0.00 |
| 61 | Corki | −0.44 | −1.00 | −0.50 | −1.00 | +0.26 | +1.00 | +0.00 |
| 62 | Irelia | −0.51 | +0.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 63 | Brand | −0.53 | −1.00 | +0.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 64 | Rammus | −0.53 | −1.00 | +0.00 | −1.00 | −0.16 | – | +0.00 |
| 65 | Swain | −0.53 | −0.94 | −0.92 | +0.04 | +0.15 | −0.94 | +0.00 |
| 66 | Aurora | −0.59 | −1.00 | −1.00 | −1.00 | +0.09 | +1.00 | +0.00 |
| 67 | Zac | −0.59 | −0.61 | −0.58 | −1.00 | −0.22 | – | +0.00 |
| 68 | Cassiopeia | −0.59 | −1.00 | −1.00 | −1.00 | +0.04 | +1.00 | +0.00 |
| 69 | Vex | −0.61 | −1.00 | −1.00 | −0.01 | −0.02 | −1.00 | +0.00 |
| 70 | Gnar | −0.62 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | +0.00 |
| 71 | Rell | −0.69 | −1.00 | −1.00 | −1.00 | +0.07 | +0.00 | +0.00 |
| 72 | Miss Fortune | −0.71 | −1.00 | −1.00 | −1.00 | +0.57 | −1.00 | +0.00 |
| 73 | Nami | −0.71 | −0.84 | −0.84 | −0.99 | −0.06 | −0.86 | +0.00 |
| 74 | Aurelion Sol | −0.72 | −1.00 | −1.00 | −1.00 | +0.52 | −1.00 | +0.00 |
| 75 | Fiora | −0.73 | −1.00 | −1.00 | −1.00 | −0.03 | – | +1.00 |
| 76 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 77 | Jayce | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 78 | Galio | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 79 | Malphite | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 80 | Ambessa | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 81 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 82 | Milio | −0.76 | −1.00 | −1.00 | −1.00 | +0.26 | −1.00 | +0.00 |
| 83 | Seraphine | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 84 | Ryze | −0.76 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 85 | Tristana | −0.77 | −1.00 | −1.00 | −1.00 | +0.23 | −1.00 | +0.00 |
| 86 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 87 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 88 | Maokai | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 89 | Ornn | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 90 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 91 | Kassadin | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 92 | Annie | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 93 | Sona | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 94 | Akshan | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 95 | Smolder | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 96 | Tahm Kench | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 97 | Shen | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 98 | Hecarim | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 99 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 100 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 101 | Braum | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 102 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 103 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 104 | Twitch | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 105 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 106 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 107 | Lee Sin | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 108 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 109 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 110 | Vi | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 111 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 112 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 113 | Blitzcrank | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 114 | Karthus | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 115 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 116 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 117 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 118 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 119 | Briar | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 120 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 121 | Caitlyn | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 122 | Sion | −0.80 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 123 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 124 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 125 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 126 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 127 | Udyr | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 128 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 129 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 130 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 131 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 132 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 133 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 134 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 135 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 136 | Camille | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 137 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 138 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 139 | Xin Zhao | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 140 | Nilah | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 141 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 142 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 143 | Ziggs | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 144 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 145 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 146 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 147 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 148 | Amumu | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 149 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 150 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 151 | Nocturne | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 152 | Mel | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 153 | Janna | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 154 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 155 | Dr. Mundo | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 156 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 157 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 158 | Elise | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 159 | Xerath | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 160 | Yone | −0.82 | −1.00 | −1.00 | −1.00 | −0.24 | – | +0.00 |
| 161 | Jhin | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 162 | Draven | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 163 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 164 | Kai'Sa | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 165 | Syndra | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 166 | Viego | −0.83 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.00 |
| 167 | Rakan | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 168 | Taliyah | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 169 | Ahri | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 170 | Senna | −0.86 | −1.00 | −1.00 | −1.00 | −0.39 | −1.00 | +0.00 |
| 171 | Wukong | −0.86 | −1.00 | −1.00 | −1.00 | −0.18 | – | −1.00 |
| 172 | Renata Glasc | −0.91 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Warwick's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Warwick's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Warwick` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +1.74)

- **0.50** interrupt: Ferromancy: Crash Down's airborne interrupts Warwick's Infinite Duress (normal channel). Ferromancy: Crash Down must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell W Ferromancy: Crash Down → Warwick R Infinite Duress)
- **0.50** interrupt: Ferromancy: Mount Up's airborne interrupts Warwick's Infinite Duress (normal channel). Ferromancy: Mount Up must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell W Ferromancy: Mount Up → Warwick R Infinite Duress)
- **0.50** interrupt: Full Tilt's stun interrupts Warwick's Infinite Duress (normal channel). Full Tilt must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rell E Full Tilt → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Rell's Magnet Storm (airborne, kinematics).

#### 2. Singed (net +1.72)

- **0.50** interrupt: Fling's airborne interrupts Warwick's Infinite Duress (normal channel). Fling must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Singed E Fling → Warwick R Infinite Duress)
- **0.49** grounding: Mega Adhesive grounds Warwick, who then can't cast Infinite Duress. Grounded while in the area; 13 s cooldown. (Singed W Mega Adhesive → Warwick R Infinite Duress)
- **0.40** anti-heal: Insanity Potion's Grievous Wounds cuts Warwick's healing from Infinite Duress by 40%. (Singed R Insanity Potion → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Singed's Fling (airborne, root).

#### 3. Rek'Sai (net +1.43)

- **0.93** untargetable: Void Rush makes Rek'Sai untargetable, dodging Warwick's Infinite Duress. Untargetable for 1.5 s, long enough to use ahead of Infinite Duress. (Rek'Sai R Void Rush → Warwick R Infinite Duress)
- **0.50** interrupt: Unburrow's airborne interrupts Warwick's Infinite Duress (normal channel). Unburrow must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Rek'Sai W Unburrow → Warwick R Infinite Duress)
- **0.40** interrupt: Unburrow's airborne interrupts Warwick's Jaws of the Beast (movement channel). Unburrow must land during the channel. (Rek'Sai W Unburrow → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress's knockdown can stop Rek'Sai's Tunnel mid-dash.

#### 4. Nocturne (net +1.43)

- **0.66** spell shield: Shroud of Darkness's spell shield blocks Warwick's Primal Howl. Spell shield for 1.5 s, long enough to use ahead of Primal Howl. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick E Primal Howl)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Warwick's Jaws of the Beast. Spell shield for 1.5 s, long enough to use ahead of Jaws of the Beast. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Warwick Q Jaws of the Beast)
- **0.50** interrupt: Unspeakable Horror's fear interrupts Warwick's Infinite Duress (normal channel). Unspeakable Horror must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Nocturne E Unspeakable Horror → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Nocturne's Paranoia (nearsight).

#### 5. Alistar (net +1.42)

- **0.74** cleanse: Unbreakable Will cleanses Warwick's Infinite Duress (suppression) after it lands. 80 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Alistar R Unbreakable Will → Warwick R Infinite Duress)
- **0.50** interrupt: Pulverize's airborne interrupts Warwick's Infinite Duress (normal channel). Pulverize must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Alistar Q Pulverize → Warwick R Infinite Duress)
- **0.50** interrupt: Trample's stun interrupts Warwick's Infinite Duress (normal channel). Trample must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Alistar E Trample → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Alistar's Headbutt (airborne, stun).

#### 6. Vladimir (net +1.37)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Infinite Duress. Untargetable for 2 s, long enough to use ahead of Infinite Duress. (Vladimir W Sanguine Pool → Warwick R Infinite Duress)
- **0.57** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Primal Howl. Untargetable for 2 s, long enough to use ahead of Primal Howl. (Vladimir W Sanguine Pool → Warwick E Primal Howl)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Warwick's Jaws of the Beast. Untargetable for 2 s, long enough to use ahead of Jaws of the Beast. (Vladimir W Sanguine Pool → Warwick Q Jaws of the Beast)
- Watch out: Primal Howl's fear interrupts Vladimir's Tides of Blood (charge-up).

#### 7. Zaahen (net +1.33)

- **0.56** cc immunity: Grim Deliverance makes Zaahen immune to Warwick's Infinite Duress (knockdown, suppression). Immune for ?; Infinite Duress lands within 0.1 s, faster than a 0.25 s reaction, so it needs prediction. (Zaahen R Grim Deliverance → Warwick R Infinite Duress)
- **0.50** interrupt: Dreaded Return's airborne interrupts Warwick's Infinite Duress (normal channel). Dreaded Return must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Zaahen W Dreaded Return → Warwick R Infinite Duress)
- **0.50** interrupt: The Darkin Glaive's airborne interrupts Warwick's Infinite Duress (normal channel). The Darkin Glaive must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Zaahen Q The Darkin Glaive → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Zaahen's Dreaded Return (airborne, stun).

#### 8. Nilah (net +1.28)

- **1.00** attack dodge: Jubilant Veil dodges Warwick's Infinite Duress, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Warwick R Infinite Duress)
- **0.46** interrupt: Apotheosis's airborne interrupts Warwick's Infinite Duress (normal channel). Apotheosis must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Nilah R Apotheosis → Warwick R Infinite Duress)
- **0.45** attack dodge: Jubilant Veil dodges Warwick's Jaws of the Beast, which applies on-hit effects. Jubilant Veil lasts 2.25 s on a 22 s cooldown. (Nilah W Jubilant Veil → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Nilah's Apotheosis (airborne, slow).

#### 9. Sion (net +1.25)

- **1.00** cc immunity: Unstoppable Onslaught makes Sion immune to Warwick's Infinite Duress (knockdown, suppression). Immune for 8 s, long enough to use ahead of Infinite Duress. (Sion R Unstoppable Onslaught → Warwick R Infinite Duress)
- **0.50** interrupt: Decimating Smash's airborne interrupts Warwick's Infinite Duress (normal channel). Decimating Smash must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Sion Q Decimating Smash → Warwick R Infinite Duress)
- **0.50** interrupt: Unstoppable Onslaught's airborne interrupts Warwick's Infinite Duress (normal channel). Unstoppable Onslaught must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Sion R Unstoppable Onslaught → Warwick R Infinite Duress)
- Watch out: Infinite Duress makes Warwick immune to Sion's Unstoppable Onslaught (airborne, slow, stun).

#### 10. Milio (net +1.25)

- **0.58** cleanse: Breath of Life cleanses Warwick's Infinite Duress (suppression) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Warwick R Infinite Duress)
- **0.50** interrupt: Ultra Mega Fire Kick's airborne interrupts Warwick's Infinite Duress (normal channel). Ultra Mega Fire Kick must land during the channel. If Warwick does not collide with a champion, he will slide a fixed distance past the maximum range during which he is no longer crowd control immune and unable to declare basic attacks or cast movement abilities, including Flash, but being able to cast Jaws of the Beast and Blood Hunt, with the former also interrupting the slide.
  - Warwick is able to cast Primal Howl at any time during the dash. Activating Zhonya's Hourglass during the dash interrupts it. (Milio Q Ultra Mega Fire Kick → Warwick R Infinite Duress)
- **0.30** interrupt: Ultra Mega Fire Kick's airborne interrupts Warwick's Jaws of the Beast (movement channel). Ultra Mega Fire Kick must land during the channel. (Milio Q Ultra Mega Fire Kick → Warwick Q Jaws of the Beast)
- Watch out: Infinite Duress makes Warwick immune to Milio's Ultra Mega Fire Kick (airborne, slow, stun).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +1.74 | 3.16 | 1.42 |  |
| 2 | Singed | +1.72 | 2.19 | 0.47 | grounding (Mega Adhesive) |
| 3 | Rek'Sai | +1.43 | 1.90 | 0.47 |  |
| 4 | Nocturne | +1.43 | 1.77 | 0.34 |  |
| 5 | Alistar | +1.42 | 2.17 | 0.75 |  |
| 6 | Vladimir | +1.37 | 1.53 | 0.16 |  |
| 7 | Zaahen | +1.33 | 2.00 | 0.67 |  |
| 8 | Nilah | +1.28 | 1.94 | 0.66 | attack dodge (Jubilant Veil), attack dodge (Jubilant Veil) |
| 9 | Sion | +1.25 | 2.06 | 0.81 |  |
| 10 | Milio | +1.25 | 1.66 | 0.41 |  |
| 11 | Blitzcrank | +1.24 | 1.94 | 0.70 |  |
| 12 | Udyr | +1.24 | 1.53 | 0.29 |  |
| 13 | Jax | +1.22 | 1.51 | 0.29 | attack dodge (Counter Strike), attack dodge (Counter Strike) |
| 14 | Sivir | +1.22 | 1.22 | 0.00 |  |
| 15 | Xayah | +1.14 | 1.34 | 0.20 |  |
| 16 | Olaf | +1.05 | 1.10 | 0.05 |  |
| 17 | Heimerdinger | +0.97 | 1.49 | 0.52 |  |
| 18 | Malzahar | +0.91 | 2.07 | 1.16 |  |
| 19 | Cho'Gath | +0.89 | 1.36 | 0.47 |  |
| 20 | Evelynn | +0.89 | 1.36 | 0.47 |  |
| 21 | Gangplank | +0.88 | 1.05 | 0.17 |  |
| 22 | Lulu | +0.87 | 1.52 | 0.65 |  |
| 23 | Shaco | +0.87 | 1.35 | 0.48 |  |
| 24 | Viktor | +0.84 | 1.41 | 0.57 |  |
| 25 | Kayle | +0.83 | 0.88 | 0.05 |  |
| 26 | Shen | +0.82 | 2.05 | 1.23 | attack block (Spirit's Refuge), attack block (Spirit's Refuge) |
| 27 | Garen | +0.81 | 0.89 | 0.08 |  |
| 28 | Anivia | +0.78 | 1.47 | 0.69 |  |
| 29 | Morgana | +0.70 | 1.42 | 0.72 |  |
| 30 | Gnar | +0.68 | 1.51 | 0.83 |  |
| 31 | Fiora | +0.67 | 1.01 | 0.34 |  |
| 32 | Thresh | +0.66 | 1.44 | 0.78 |  |
| 33 | Master Yi | +0.63 | 0.95 | 0.32 |  |
| 34 | Rengar | +0.62 | 1.08 | 0.46 |  |
| 35 | Zed | +0.61 | 0.65 | 0.04 |  |
| 36 | Kennen | +0.57 | 0.84 | 0.27 |  |
| 37 | Riven | +0.56 | 1.32 | 0.76 |  |
| 38 | Gwen | +0.56 | 0.83 | 0.27 |  |
| 39 | Pyke | +0.54 | 1.32 | 0.78 |  |
| 40 | Zilean | +0.54 | 0.89 | 0.35 |  |
| 41 | Aurora | +0.54 | 0.84 | 0.30 |  |
| 42 | Kassadin | +0.54 | 0.69 | 0.15 |  |
| 43 | Annie | +0.53 | 0.80 | 0.27 |  |
| 44 | Bard | +0.51 | 1.54 | 1.03 |  |
| 45 | Vex | +0.51 | 0.87 | 0.36 |  |
| 46 | Teemo | +0.51 | 0.69 | 0.18 | blind (Blinding Dart) |
| 47 | Lissandra | +0.48 | 1.45 | 0.97 |  |
| 48 | Draven | +0.46 | 0.88 | 0.42 |  |
| 49 | Elise | +0.46 | 0.87 | 0.41 |  |
| 50 | Brand | +0.46 | 0.85 | 0.39 |  |
| 51 | Sejuani | +0.45 | 1.86 | 1.41 |  |
| 52 | Fiddlesticks | +0.45 | 1.47 | 1.02 |  |
| 53 | Mordekaiser | +0.44 | 0.98 | 0.54 |  |
| 54 | Fizz | +0.43 | 1.46 | 1.03 |  |
| 55 | Taric | +0.43 | 0.64 | 0.21 |  |
| 56 | Yasuo | +0.42 | 1.31 | 0.89 |  |
| 57 | Zoe | +0.42 | 0.85 | 0.43 |  |
| 58 | K'Sante | +0.41 | 1.93 | 1.52 |  |
| 59 | Aurelion Sol | +0.41 | 1.30 | 0.89 |  |
| 60 | Maokai | +0.40 | 1.60 | 1.20 |  |
| 61 | Camille | +0.40 | 1.48 | 1.08 |  |
| 62 | Vayne | +0.40 | 0.93 | 0.53 |  |
| 63 | Soraka | +0.40 | 0.81 | 0.41 |  |
| 64 | Cassiopeia | +0.39 | 1.27 | 0.88 | grounding (Miasma) |
| 65 | Veigar | +0.39 | 0.79 | 0.40 |  |
| 66 | Sett | +0.38 | 1.22 | 0.84 |  |
| 67 | Renekton | +0.37 | 0.67 | 0.30 |  |
| 68 | Yuumi | +0.36 | 1.16 | 0.80 |  |
| 69 | Jayce | +0.36 | 0.85 | 0.49 |  |
| 70 | Swain | +0.33 | 0.79 | 0.46 |  |
| 71 | Seraphine | +0.32 | 1.30 | 0.98 |  |
| 72 | Syndra | +0.32 | 0.78 | 0.46 |  |
| 73 | Nasus | +0.30 | 0.36 | 0.06 |  |
| 74 | Renata Glasc | +0.29 | 1.36 | 1.07 |  |
| 75 | Xin Zhao | +0.28 | 1.42 | 1.14 |  |
| 76 | Quinn | +0.28 | 0.93 | 0.65 |  |
| 77 | Volibear | +0.27 | 0.71 | 0.44 |  |
| 78 | Kalista | +0.26 | 1.09 | 0.83 |  |
| 79 | Yorick | +0.26 | 0.64 | 0.38 |  |
| 80 | Leona | +0.25 | 1.29 | 1.04 |  |
| 81 | Ahri | +0.23 | 0.79 | 0.56 |  |
| 82 | Ezreal | +0.22 | 0.22 | 0.00 |  |
| 83 | Irelia | +0.21 | 0.68 | 0.47 |  |
| 84 | Kayn | +0.20 | 1.38 | 1.18 |  |
| 85 | Twisted Fate | +0.19 | 0.99 | 0.80 |  |
| 86 | Rammus | +0.18 | 1.70 | 1.52 |  |
| 87 | Nami | +0.17 | 1.32 | 1.15 |  |
| 88 | Trundle | +0.17 | 0.63 | 0.46 |  |
| 89 | Darius | +0.16 | 0.63 | 0.47 |  |
| 90 | Urgot | +0.15 | 1.32 | 1.17 |  |
| 91 | Shyvana | +0.15 | 0.67 | 0.52 |  |
| 92 | Twitch | +0.15 | 0.29 | 0.14 |  |
| 93 | Hwei | +0.14 | 0.80 | 0.66 |  |
| 94 | Bel'Veth | +0.14 | 0.67 | 0.53 |  |
| 95 | Kindred | +0.14 | 0.31 | 0.17 |  |
| 96 | Tahm Kench | +0.13 | 1.90 | 1.77 |  |
| 97 | Katarina | +0.12 | 0.62 | 0.50 |  |
| 98 | Kog'Maw | +0.12 | 0.18 | 0.06 |  |
| 99 | Ziggs | +0.10 | 0.82 | 0.72 |  |
| 100 | Zeri | +0.09 | 0.29 | 0.20 |  |
| 101 | Braum | +0.08 | 1.15 | 1.07 |  |
| 102 | Ashe | +0.08 | 0.83 | 0.75 |  |
| 103 | Zac | +0.07 | 1.85 | 1.78 |  |
| 104 | Corki | +0.07 | 0.22 | 0.15 |  |
| 105 | Yunara | +0.06 | 0.24 | 0.18 |  |
| 106 | Nidalee | +0.06 | 0.20 | 0.14 |  |
| 107 | Aatrox | +0.05 | 0.70 | 0.65 |  |
| 108 | Smolder | +0.05 | 0.22 | 0.17 |  |
| 109 | Kled | +0.04 | 1.51 | 1.47 |  |
| 110 | Xerath | 0.00 | 0.83 | 0.83 |  |
| 111 | Amumu | -0.02 | 1.14 | 1.16 |  |
| 112 | Vel'Koz | -0.03 | 0.83 | 0.86 |  |
| 113 | Sona | -0.03 | 0.77 | 0.80 |  |
| 114 | Janna | -0.04 | 1.37 | 1.41 |  |
| 115 | Dr. Mundo | -0.06 | 0.00 | 0.06 |  |
| 116 | Illaoi | -0.07 | 0.06 | 0.13 |  |
| 117 | Rakan | -0.08 | 1.25 | 1.33 |  |
| 118 | Varus | -0.08 | 0.80 | 0.88 |  |
| 119 | Jinx | -0.08 | 0.19 | 0.27 |  |
| 120 | Sylas | -0.13 | 0.65 | 0.78 |  |
| 121 | Galio | -0.14 | 1.75 | 1.89 |  |
| 122 | Kai'Sa | -0.15 | 0.26 | 0.41 |  |
| 123 | Mel | -0.15 | 0.18 | 0.33 |  |
| 124 | Orianna | -0.17 | 0.73 | 0.90 |  |
| 125 | Rumble | -0.17 | 0.00 | 0.17 |  |
| 126 | Lux | -0.18 | 0.19 | 0.37 |  |
| 127 | LeBlanc | -0.18 | 0.15 | 0.33 |  |
| 128 | Taliyah | -0.19 | 1.94 | 2.13 |  |
| 129 | Senna | -0.20 | 0.22 | 0.42 |  |
| 130 | Yone | -0.21 | 1.31 | 1.52 |  |
| 131 | Samira | -0.21 | 0.20 | 0.41 |  |
| 132 | Tryndamere | -0.22 | 0.00 | 0.22 |  |
| 133 | Tristana | -0.24 | 0.74 | 0.98 |  |
| 134 | Graves | -0.25 | 0.16 | 0.41 |  |
| 135 | Gragas | -0.26 | 1.23 | 1.49 |  |
| 136 | Locke | -0.27 | 0.00 | 0.27 |  |
| 137 | Skarner | -0.29 | 0.61 | 0.90 |  |
| 138 | Wukong | -0.30 | 0.52 | 0.82 |  |
| 139 | Kha'Zix | -0.31 | 0.00 | 0.31 |  |
| 140 | Viego | -0.32 | 1.30 | 1.62 |  |
| 141 | Ornn | -0.32 | 1.24 | 1.56 |  |
| 142 | Karma | -0.32 | 0.15 | 0.47 |  |
| 143 | Talon | -0.32 | 0.00 | 0.32 |  |
| 144 | Ekko | -0.33 | 0.00 | 0.33 |  |
| 145 | Azir | -0.36 | 0.70 | 1.06 |  |
| 146 | Lee Sin | -0.37 | 0.59 | 0.96 |  |
| 147 | Miss Fortune | -0.37 | 0.22 | 0.59 |  |
| 148 | Pantheon | -0.39 | 0.74 | 1.13 |  |
| 149 | Lucian | -0.40 | 0.24 | 0.64 |  |
| 150 | Neeko | -0.41 | 0.67 | 1.08 |  |
| 151 | Lillia | -0.42 | 0.55 | 0.97 |  |
| 152 | Diana | -0.44 | 0.55 | 0.99 |  |
| 153 | Akshan | -0.45 | 0.22 | 0.67 |  |
| 154 | Zyra | -0.46 | 0.68 | 1.14 |  |
| 155 | Karthus | -0.46 | 0.13 | 0.59 |  |
| 156 | Malphite | -0.48 | 0.75 | 1.23 |  |
| 157 | Nunu & Willump | -0.51 | 0.68 | 1.19 |  |
| 158 | Akali | -0.54 | 0.00 | 0.54 |  |
| 159 | Ivern | -0.55 | 0.13 | 0.68 |  |
| 160 | Caitlyn | -0.56 | 0.24 | 0.80 |  |
| 161 | Ambessa | -0.59 | 0.50 | 1.09 |  |
| 162 | Vi | -0.60 | 1.23 | 1.83 |  |
| 163 | Jhin | -0.63 | 0.18 | 0.81 |  |
| 164 | Aphelios | -0.65 | 0.33 | 0.98 |  |
| 165 | Nautilus | -0.66 | 0.55 | 1.21 |  |
| 166 | Qiyana | -0.66 | 0.47 | 1.13 |  |
| 167 | Ryze | -0.71 | 0.16 | 0.87 |  |
| 168 | Hecarim | -0.73 | 0.51 | 1.24 |  |
| 169 | Briar | -0.77 | 0.55 | 1.32 |  |
| 170 | Poppy | -0.97 | 0.50 | 1.47 |  |
| 171 | Jarvan IV | -0.98 | 0.54 | 1.52 |  |
| 172 | Naafiri | -1.21 | 0.00 | 1.21 |  |
