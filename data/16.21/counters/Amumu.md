# Counters to Amumu (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Amumu: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Amumu wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Amumu --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Olaf | +0.87 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +1.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.12 | – | +1.00 |
| 3 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 4 | Kayle | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 5 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 6 | Gnar | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 7 | Teemo | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 8 | Rell | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 9 | Morgana | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 10 | Jhin | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 11 | Gangplank | +0.82 | +1.00 | +1.00 | +1.00 | +0.24 | – | +0.00 |
| 12 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 13 | Corki | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 14 | Quinn | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 15 | Gwen | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 16 | Graves | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 17 | Mel | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 18 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 19 | Sylas | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 20 | Neeko | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 21 | Samira | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 22 | Ambessa | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 23 | Kled | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 24 | Lucian | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 25 | Malphite | +0.81 | +1.00 | +1.00 | +1.00 | +0.18 | – | +0.00 |
| 26 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 27 | Kog'Maw | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 28 | Janna | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 29 | Aurora | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 30 | Orianna | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 31 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 32 | Ezreal | +0.80 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 33 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 34 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 35 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 36 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 37 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 38 | Ashe | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 39 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 40 | Smolder | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 41 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 42 | Jayce | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 43 | Nasus | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 44 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 45 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 46 | Yone | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 47 | Udyr | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 48 | Karma | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 49 | Akshan | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 50 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 51 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 52 | Yunara | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 53 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 54 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 55 | Trundle | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.05 |
| 56 | Jarvan IV | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 57 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 58 | Viego | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 59 | Shen | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 60 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 61 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 62 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 63 | Bel'Veth | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 64 | Alistar | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 65 | Zeri | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 66 | Rek'Sai | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 67 | Sion | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 68 | Maokai | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 69 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 70 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 71 | Nocturne | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 72 | Gragas | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 73 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 74 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 75 | Renekton | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 76 | Fizz | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 77 | Lee Sin | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 78 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 79 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 80 | Bard | +0.78 | +0.94 | +0.96 | +1.00 | +0.01 | +1.00 | +0.00 |
| 81 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 82 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 83 | Rumble | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 84 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 85 | Xin Zhao | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 86 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 87 | Zac | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 88 | Skarner | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 89 | Sejuani | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 90 | Rammus | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 91 | Vi | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 92 | Ryze | +0.76 | +0.90 | +0.89 | +1.00 | +0.07 | +1.00 | +0.00 |
| 93 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 94 | Tahm Kench | +0.69 | +0.69 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 95 | Irelia | +0.69 | +0.83 | +0.83 | +1.00 | +0.05 | – | +0.00 |
| 96 | Lulu | +0.65 | +1.00 | +1.00 | +1.00 | +0.05 | −0.53 | +0.00 |
| 97 | Zilean | +0.64 | +0.43 | +1.00 | +1.00 | +0.07 | +0.71 | +0.00 |
| 98 | Elise | +0.63 | +1.00 | +1.00 | +1.00 | +0.10 | −0.83 | +0.00 |
| 99 | Jinx | +0.58 | +0.69 | +0.98 | +0.81 | +0.01 | +0.03 | +0.00 |
| 100 | Urgot | +0.57 | +0.79 | +1.00 | +1.00 | +0.15 | −1.00 | +0.00 |
| 101 | Varus | +0.55 | +0.16 | +1.00 | +1.00 | −0.04 | +0.62 | +0.00 |
| 102 | Wukong | +0.51 | +1.00 | +0.00 | +1.00 | +0.06 | – | +0.00 |
| 103 | Lux | +0.50 | +0.17 | +0.90 | +0.97 | +0.08 | +0.24 | +0.00 |
| 104 | Twisted Fate | +0.42 | +1.00 | +0.08 | +1.00 | +0.05 | −0.55 | +0.00 |
| 105 | Draven | +0.41 | +1.00 | +1.00 | −0.88 | +0.06 | +0.74 | +0.00 |
| 106 | Master Yi | +0.36 | +0.00 | +1.00 | +0.00 | +0.06 | +1.00 | +0.06 |
| 107 | Nautilus | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 108 | Galio | +0.34 | +1.00 | +1.00 | −1.00 | +0.04 | – | +0.00 |
| 109 | Nilah | +0.31 | +1.00 | −0.24 | +0.00 | +0.14 | +1.00 | +0.00 |
| 110 | Kayn | +0.29 | −0.76 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 111 | Pantheon | +0.26 | +1.00 | −0.86 | +1.00 | −0.02 | – | +0.00 |
| 112 | Hwei | +0.25 | +0.14 | +0.04 | +0.96 | −0.00 | +0.19 | +0.00 |
| 113 | Azir | +0.20 | +1.00 | −0.66 | +1.00 | −0.05 | −0.82 | +0.00 |
| 114 | Briar | +0.18 | −1.00 | +1.00 | +1.00 | −0.23 | – | +0.00 |
| 115 | Swain | +0.13 | +0.15 | +0.14 | +0.22 | +0.01 | +0.15 | +0.00 |
| 116 | Soraka | +0.10 | +0.13 | +0.15 | +0.14 | +0.02 | +0.03 | +0.00 |
| 117 | Singed | +0.08 | +0.09 | +0.10 | +0.14 | −0.00 | – | +0.00 |
| 118 | Ornn | +0.08 | −1.00 | +0.44 | +0.96 | +0.11 | – | +0.00 |
| 119 | Nami | +0.04 | +0.01 | +0.06 | +0.05 | +0.00 | +0.12 | +0.00 |
| 120 | Syndra | +0.03 | +0.07 | +0.07 | −0.00 | +0.01 | −0.01 | +0.00 |
| 121 | Brand | +0.03 | +0.04 | +0.03 | +0.03 | −0.01 | +0.10 | +0.00 |
| 122 | Lissandra | +0.01 | +0.01 | +0.01 | −0.07 | +0.11 | +0.02 | +0.00 |
| 123 | Anivia | −0.04 | +0.05 | −0.03 | −0.12 | −0.09 | −0.10 | +0.00 |
| 124 | Tristana | −0.05 | +0.79 | −0.58 | −1.00 | +0.01 | +1.00 | +0.00 |
| 125 | Senna | −0.13 | +0.09 | +0.12 | −0.62 | +0.07 | −0.63 | +0.00 |
| 126 | Heimerdinger | −0.21 | −0.52 | −0.88 | +0.78 | +0.14 | −0.35 | +0.00 |
| 127 | Leona | −0.21 | −0.01 | +0.04 | −1.00 | +0.01 | – | +0.00 |
| 128 | Ekko | −0.22 | +1.00 | −1.00 | −0.95 | −0.02 | – | +0.00 |
| 129 | Viktor | −0.22 | +0.07 | +0.04 | −0.90 | −0.01 | −0.67 | +0.00 |
| 130 | Zyra | −0.26 | −0.36 | −0.34 | −0.10 | +0.00 | −0.63 | +0.00 |
| 131 | Ziggs | −0.26 | +1.00 | −0.91 | −1.00 | +0.10 | −0.99 | +0.00 |
| 132 | Vex | −0.28 | −0.54 | −0.90 | +0.88 | −0.00 | −0.98 | +0.00 |
| 133 | Twitch | −0.29 | −0.02 | −0.04 | −1.00 | −0.03 | −0.74 | +0.00 |
| 134 | Aurelion Sol | −0.31 | −0.18 | −0.19 | −1.00 | +0.01 | −0.16 | +0.00 |
| 135 | Sona | −0.33 | −0.09 | −0.10 | −1.00 | +0.02 | −0.90 | +0.00 |
| 136 | Veigar | −0.34 | −0.10 | −0.10 | −0.97 | +0.03 | −0.97 | +0.00 |
| 137 | Fiddlesticks | −0.36 | −1.00 | −0.07 | −1.00 | +0.04 | +1.00 | +0.00 |
| 138 | Zoe | −0.48 | −0.20 | −0.82 | −1.00 | −0.02 | −0.20 | +0.00 |
| 139 | Kindred | −0.48 | −0.94 | −0.61 | −1.00 | +0.03 | +1.00 | +0.00 |
| 140 | Vel'Koz | −0.50 | +0.01 | −0.98 | −0.94 | +0.12 | −0.88 | +0.00 |
| 141 | Karthus | −0.53 | −0.97 | +0.00 | −1.00 | +0.05 | −0.95 | +0.00 |
| 142 | Malzahar | −0.58 | −0.89 | −0.33 | −1.00 | +0.06 | −0.84 | +0.00 |
| 143 | Rengar | −0.61 | −0.92 | −0.69 | −1.00 | +0.36 | – | +0.00 |
| 144 | Seraphine | −0.68 | −0.55 | −0.98 | −1.00 | −0.02 | −0.96 | +0.00 |
| 145 | Miss Fortune | −0.72 | −1.00 | −1.00 | −1.00 | +0.07 | −0.26 | +0.00 |
| 146 | Xerath | −0.72 | −1.00 | −0.71 | −1.00 | +0.03 | −0.95 | +0.00 |
| 147 | Akali | −0.74 | −0.85 | −0.99 | −1.00 | −0.02 | – | +0.00 |
| 148 | Evelynn | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 149 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 150 | Ahri | −0.76 | −0.97 | −0.97 | −1.00 | +0.12 | −0.97 | +0.00 |
| 151 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 152 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 153 | Blitzcrank | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 154 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 155 | Talon | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 156 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 157 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 158 | LeBlanc | −0.78 | −1.00 | −0.97 | −1.00 | +0.02 | −0.95 | +0.00 |
| 159 | Zed | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 160 | Cassiopeia | −0.79 | −1.00 | −1.00 | −0.98 | +0.06 | −1.00 | +0.00 |
| 161 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 162 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 163 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 164 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 165 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −0.99 | +0.00 |
| 166 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 167 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 168 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 169 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −0.98 | +0.00 |
| 170 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 171 | Kai'Sa | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 172 | Vladimir | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Amumu's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Amumu's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Amumu` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.47)

- **0.80** spell shield: Spell Shield's spell shield blocks Amumu's Curse of the Sad Mummy. Spell shield for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Amumu R Curse of the Sad Mummy)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Amumu's (500 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Sivir basic attacks → Amumu basic attacks)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Amumu's Bandage Toss. Spell shield for 1.5 s, long enough to use ahead of Bandage Toss. A spell shield blocks only the first enemy ability that reaches it. Amumu is still able to dash even if Bandage Toss is blocked by spell shield. (Sivir E Spell Shield → Amumu Q Bandage Toss)

#### 2. Morgana (net +1.44)

- **0.85** cc immunity: Black Shield makes Morgana immune to Amumu's Bandage Toss (stun). Immune for 5 s, long enough to use ahead of Bandage Toss. (Morgana E Black Shield → Amumu Q Bandage Toss)
- **0.80** cc immunity: Black Shield makes Morgana immune to Amumu's Curse of the Sad Mummy (knockdown, stun). Immune for 5 s, long enough to use ahead of Curse of the Sad Mummy. (Morgana E Black Shield → Amumu R Curse of the Sad Mummy)
- **0.19** range: Morgana's basic attacks reach 325 units farther than Amumu's (450 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Morgana basic attacks → Amumu basic attacks)

#### 3. Xayah (net +1.42)

- **0.80** untargetable: Featherstorm makes Xayah untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. (Xayah R Featherstorm → Amumu R Curse of the Sad Mummy)
- **0.47** untargetable: Featherstorm makes Xayah untargetable, dodging Amumu's Bandage Toss. Untargetable for 1.5 s, long enough to use ahead of Bandage Toss. (Xayah R Featherstorm → Amumu Q Bandage Toss)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Amumu's (525 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Xayah basic attacks → Amumu basic attacks)

#### 4. Maokai (net +1.40)

- **1.00** untargetable: Twisted Advance makes Maokai untargetable, dodging Amumu's Bandage Toss. Untargetable for 1.4 s; Bandage Toss takes 0.8 s to land, enough to react. (Maokai W Twisted Advance → Amumu Q Bandage Toss)
- **0.80** untargetable: Twisted Advance makes Maokai untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 1.4 s; Curse of the Sad Mummy takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Amumu R Curse of the Sad Mummy)

#### 5. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Amumu's Bandage Toss (stun). Immune for 1.5 s, long enough to use ahead of Bandage Toss. (Udyr E Blazing Stampede → Amumu Q Bandage Toss)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Amumu's Curse of the Sad Mummy (knockdown, stun). Immune for 1.5 s, long enough to use ahead of Curse of the Sad Mummy. (Udyr E Blazing Stampede → Amumu R Curse of the Sad Mummy)

#### 6. Lissandra (net +1.33)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2.5 s, long enough to use ahead of Curse of the Sad Mummy. (Lissandra R Frozen Tomb → Amumu R Curse of the Sad Mummy)
- **0.49** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Amumu's Bandage Toss. Untargetable for 2.5 s, long enough to use ahead of Bandage Toss. (Lissandra R Frozen Tomb → Amumu Q Bandage Toss)
- **0.25** dash stop: Frozen Tomb's knockdown can stop Amumu's Bandage Toss mid-dash. Must land during the dash. Fails if the dashing unit is crowd control immune, displacement immune, untargetable or spell shielded. (Lissandra R Frozen Tomb → Amumu Q Bandage Toss)

#### 7. Vladimir (net +1.31)

- **0.85** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Amumu's Bandage Toss. Untargetable for 2 s, long enough to use ahead of Bandage Toss. (Vladimir W Sanguine Pool → Amumu Q Bandage Toss)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2 s, long enough to use ahead of Curse of the Sad Mummy. (Vladimir W Sanguine Pool → Amumu R Curse of the Sad Mummy)
- **0.18** range: Vladimir's basic attacks reach 325 units farther than Amumu's (450 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Vladimir basic attacks → Amumu basic attacks)
- Watch out: Bandage Toss's stun interrupts Vladimir's Tides of Blood (charge-up).

#### 8. Bard (net +1.25)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Amumu's Curse of the Sad Mummy. Untargetable for 2.5 s, long enough to use ahead of Curse of the Sad Mummy. (Bard R Tempered Fate → Amumu R Curse of the Sad Mummy)
- **0.49** untargetable: Tempered Fate makes Bard untargetable, dodging Amumu's Bandage Toss. Untargetable for 2.5 s, long enough to use ahead of Bandage Toss. (Bard R Tempered Fate → Amumu Q Bandage Toss)
- **0.36** range: Bard's basic attacks reach 375 units farther than Amumu's (500 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Bard basic attacks → Amumu basic attacks)
- Watch out: Curse of the Sad Mummy's knockdown can stop Bard's Magical Journey mid-dash.

#### 9. Fiora (net +1.24)

- **0.95** parry: Riposte parries Amumu's Bandage Toss and stuns back. Parry for 0.75 s; Bandage Toss takes 0.8 s to land, enough to react. Negating Bandage Toss's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Amumu Q Bandage Toss)
- **0.90** parry: Riposte parries Amumu's Curse of the Sad Mummy and stuns back. Parry for 0.75 s; Curse of the Sad Mummy takes 0.25 s to land, enough to react. Negating Curse of the Sad Mummy's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Amumu R Curse of the Sad Mummy)
- **0.06** attack speed slow: Riposte cuts Amumu's attack speed by 25% for 2 s. 2 s on a 16 s cooldown. (Fiora W Riposte → Amumu basic attacks)
- Watch out: Curse of the Sad Mummy's knockdown can stop Fiora's Lunge mid-dash.

#### 10. Milio (net +1.21)

- **0.55** cleanse: Breath of Life cleanses Amumu's Curse of the Sad Mummy (stun) after it lands. 130 s cooldown; usable while crowd controlled. Doesn't remove knockdown. (Milio R Breath of Life → Amumu R Curse of the Sad Mummy)
- **0.38** range: Milio's basic attacks reach 400 units farther than Amumu's (525 vs 125 attack range). Amumu closes the gap with Bandage Toss. (Milio basic attacks → Amumu basic attacks)
- **0.36** cleanse: Breath of Life cleanses Amumu's Bandage Toss (stun) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Amumu Q Bandage Toss)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.47 | 1.47 | 0.00 |  |
| 2 | Morgana | +1.44 | 1.44 | 0.00 |  |
| 3 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 4 | Maokai | +1.40 | 1.40 | 0.00 |  |
| 5 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 6 | Lissandra | +1.33 | 1.33 | 0.00 |  |
| 7 | Vladimir | +1.31 | 1.43 | 0.12 |  |
| 8 | Bard | +1.25 | 1.40 | 0.15 |  |
| 9 | Fiora | +1.24 | 1.41 | 0.17 |  |
| 10 | Milio | +1.21 | 1.21 | 0.00 |  |
| 11 | Fizz | +1.13 | 1.40 | 0.27 |  |
| 12 | Aurora | +1.12 | 1.34 | 0.22 |  |
| 13 | Nocturne | +1.10 | 1.10 | 0.00 |  |
| 14 | Gangplank | +1.05 | 1.05 | 0.00 |  |
| 15 | Olaf | +1.05 | 1.05 | 0.00 |  |
| 16 | Shaco | +1.05 | 1.05 | 0.00 |  |
| 17 | Zed | +1.04 | 1.04 | 0.00 |  |
| 18 | Gwen | +1.01 | 1.20 | 0.19 |  |
| 19 | Kalista | +0.99 | 1.09 | 0.10 |  |
| 20 | Rengar | +0.97 | 1.12 | 0.15 |  |
| 21 | Yuumi | +0.95 | 1.72 | 0.77 |  |
| 22 | Mel | +0.95 | 0.95 | 0.00 | projectile block (Rebuttal) |
| 23 | Master Yi | +0.90 | 1.20 | 0.30 |  |
| 24 | Kayle | +0.89 | 0.89 | 0.00 |  |
| 25 | Rek'Sai | +0.87 | 1.06 | 0.19 |  |
| 26 | Evelynn | +0.87 | 1.05 | 0.18 |  |
| 27 | Zaahen | +0.87 | 1.05 | 0.18 |  |
| 28 | Kled | +0.86 | 1.13 | 0.27 |  |
| 29 | Sion | +0.86 | 1.06 | 0.20 |  |
| 30 | Samira | +0.84 | 1.03 | 0.19 | projectile block (Blade Whirl) |
| 31 | Braum | +0.82 | 1.00 | 0.18 | projectile block (Unbreakable) |
| 32 | Viktor | +0.80 | 0.80 | 0.00 | dash stop (Gravity Field) |
| 33 | Jinx | +0.79 | 0.79 | 0.00 | dash stop (Flame Chompers!) |
| 34 | Vex | +0.75 | 0.75 | 0.00 | dash stop (Doom 'n Gloom) |
| 35 | Hwei | +0.73 | 0.73 | 0.00 | dash stop (Grim Visage) |
| 36 | Camille | +0.72 | 1.05 | 0.33 |  |
| 37 | Cassiopeia | +0.70 | 0.70 | 0.00 | grounding (Miasma) |
| 38 | Veigar | +0.70 | 0.70 | 0.00 | dash stop (Event Horizon) |
| 39 | Teemo | +0.69 | 0.69 | 0.00 |  |
| 40 | Alistar | +0.66 | 0.84 | 0.18 |  |
| 41 | Yasuo | +0.64 | 0.82 | 0.18 | projectile block (Wind Wall) |
| 42 | Lulu | +0.61 | 0.61 | 0.00 |  |
| 43 | Singed | +0.49 | 0.49 | 0.00 | grounding (Mega Adhesive) |
| 44 | Twitch | +0.43 | 0.43 | 0.00 |  |
| 45 | Malzahar | +0.41 | 1.16 | 0.75 |  |
| 46 | Sona | +0.41 | 0.41 | 0.00 |  |
| 47 | Aphelios | +0.38 | 0.38 | 0.00 |  |
| 48 | Renata Glasc | +0.38 | 0.38 | 0.00 |  |
| 49 | Ahri | +0.37 | 0.72 | 0.35 | dash stop (Charm) |
| 50 | Garen | +0.37 | 0.37 | 0.00 |  |
| 51 | Ashe | +0.36 | 0.36 | 0.00 |  |
| 52 | Draven | +0.36 | 0.36 | 0.00 |  |
| 53 | Xin Zhao | +0.33 | 0.52 | 0.19 |  |
| 54 | Kindred | +0.33 | 0.47 | 0.14 |  |
| 55 | Ezreal | +0.32 | 0.32 | 0.00 |  |
| 56 | Senna | +0.32 | 0.32 | 0.00 |  |
| 57 | Smolder | +0.32 | 0.32 | 0.00 |  |
| 58 | Zilean | +0.32 | 0.32 | 0.00 |  |
| 59 | Zoe | +0.32 | 0.32 | 0.00 |  |
| 60 | Zeri | +0.29 | 0.44 | 0.15 |  |
| 61 | Vayne | +0.29 | 0.43 | 0.14 |  |
| 62 | Kennen | +0.29 | 0.29 | 0.00 |  |
| 63 | Lux | +0.29 | 0.29 | 0.00 |  |
| 64 | Seraphine | +0.29 | 0.29 | 0.00 |  |
| 65 | Kog'Maw | +0.27 | 0.27 | 0.00 |  |
| 66 | Nasus | +0.27 | 0.27 | 0.00 |  |
| 67 | Orianna | +0.27 | 0.27 | 0.00 |  |
| 68 | Soraka | +0.27 | 0.27 | 0.00 |  |
| 69 | Anivia | +0.24 | 0.24 | 0.00 |  |
| 70 | Zyra | +0.24 | 0.24 | 0.00 |  |
| 71 | Malphite | +0.23 | 0.23 | 0.00 |  |
| 72 | Yunara | +0.22 | 0.36 | 0.14 |  |
| 73 | Annie | +0.22 | 0.22 | 0.00 |  |
| 74 | Brand | +0.22 | 0.22 | 0.00 |  |
| 75 | Karma | +0.22 | 0.22 | 0.00 |  |
| 76 | Nami | +0.22 | 0.22 | 0.00 |  |
| 77 | Neeko | +0.22 | 0.22 | 0.00 |  |
| 78 | Syndra | +0.22 | 0.22 | 0.00 |  |
| 79 | Tristana | +0.21 | 0.36 | 0.15 |  |
| 80 | Swain | +0.21 | 0.21 | 0.00 |  |
| 81 | Heimerdinger | +0.20 | 0.20 | 0.00 |  |
| 82 | Nilah | +0.19 | 0.38 | 0.19 |  |
| 83 | Elise | +0.19 | 0.32 | 0.13 |  |
| 84 | Corki | +0.18 | 0.32 | 0.14 |  |
| 85 | Jayce | +0.17 | 0.30 | 0.13 |  |
| 86 | Nidalee | +0.17 | 0.30 | 0.13 |  |
| 87 | Poppy | +0.14 | 0.63 | 0.49 | dash stop (Steadfast Presence) |
| 88 | Gnar | +0.12 | 0.33 | 0.21 |  |
| 89 | Kayn | +0.11 | 1.05 | 0.94 |  |
| 90 | Jax | +0.11 | 0.28 | 0.17 |  |
| 91 | Varus | +0.11 | 0.27 | 0.16 |  |
| 92 | Kai'Sa | +0.09 | 0.38 | 0.29 |  |
| 93 | Yone | +0.09 | 0.30 | 0.21 |  |
| 94 | Azir | +0.08 | 0.27 | 0.19 |  |
| 95 | Ziggs | +0.07 | 0.27 | 0.20 |  |
| 96 | Mordekaiser | +0.06 | 0.06 | 0.00 |  |
| 97 | Sett | +0.05 | 0.05 | 0.00 |  |
| 98 | Shyvana | +0.05 | 0.05 | 0.00 |  |
| 99 | LeBlanc | +0.03 | 0.22 | 0.19 |  |
| 100 | Warwick | +0.02 | 1.16 | 1.14 |  |
| 101 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 102 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 103 | Darius | 0.00 | 0.00 | 0.00 |  |
| 104 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 105 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 106 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 107 | Skarner | 0.00 | 0.00 | 0.00 |  |
| 108 | Taric | 0.00 | 0.00 | 0.00 |  |
| 109 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 110 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 111 | Lillia | -0.03 | 0.11 | 0.14 |  |
| 112 | Aurelion Sol | -0.04 | 0.22 | 0.26 |  |
| 113 | Thresh | -0.04 | 0.19 | 0.23 |  |
| 114 | Hecarim | -0.05 | 0.05 | 0.10 |  |
| 115 | Illaoi | -0.05 | 0.05 | 0.10 |  |
| 116 | Quinn | -0.06 | 0.38 | 0.44 |  |
| 117 | Urgot | -0.06 | 0.15 | 0.21 |  |
| 118 | Volibear | -0.07 | 0.05 | 0.12 |  |
| 119 | K'Sante | -0.08 | 0.10 | 0.18 |  |
| 120 | Graves | -0.10 | 0.24 | 0.34 |  |
| 121 | Rammus | -0.12 | 0.27 | 0.39 |  |
| 122 | Irelia | -0.12 | 0.05 | 0.17 |  |
| 123 | Ambessa | -0.15 | 0.00 | 0.15 |  |
| 124 | Jarvan IV | -0.17 | 0.05 | 0.22 |  |
| 125 | Aatrox | -0.17 | 0.00 | 0.17 |  |
| 126 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 127 | Locke | -0.18 | 0.00 | 0.18 |  |
| 128 | Nautilus | -0.18 | 0.00 | 0.18 |  |
| 129 | Renekton | -0.18 | 0.00 | 0.18 |  |
| 130 | Tryndamere | -0.18 | 0.00 | 0.18 |  |
| 131 | Ivern | -0.19 | 0.19 | 0.38 |  |
| 132 | Diana | -0.19 | 0.00 | 0.19 |  |
| 133 | Kha'Zix | -0.19 | 0.00 | 0.19 |  |
| 134 | Rakan | -0.20 | 0.13 | 0.33 |  |
| 135 | Leona | -0.22 | 0.00 | 0.22 |  |
| 136 | Bel'Veth | -0.23 | 0.00 | 0.23 |  |
| 137 | Akshan | -0.24 | 0.34 | 0.58 |  |
| 138 | Miss Fortune | -0.24 | 0.32 | 0.56 |  |
| 139 | Sejuani | -0.24 | 0.00 | 0.24 |  |
| 140 | Caitlyn | -0.25 | 0.36 | 0.61 |  |
| 141 | Vel'Koz | -0.25 | 0.27 | 0.52 |  |
| 142 | Lucian | -0.26 | 0.36 | 0.62 |  |
| 143 | Twisted Fate | -0.27 | 0.43 | 0.70 |  |
| 144 | Jhin | -0.27 | 0.27 | 0.54 |  |
| 145 | Briar | -0.27 | 0.00 | 0.27 |  |
| 146 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 147 | Qiyana | -0.27 | 0.00 | 0.27 |  |
| 148 | Zac | -0.28 | 0.50 | 0.78 | dash stop (Stretching Strikes) |
| 149 | Talon | -0.28 | 0.00 | 0.28 |  |
| 150 | Wukong | -0.29 | 0.00 | 0.29 |  |
| 151 | Rell | -0.29 | 0.00 | 0.29 |  |
| 152 | Riven | -0.33 | 0.00 | 0.33 |  |
| 153 | Viego | -0.34 | 0.14 | 0.48 |  |
| 154 | Xerath | -0.35 | 0.27 | 0.62 |  |
| 155 | Sylas | -0.36 | 0.00 | 0.36 |  |
| 156 | Karthus | -0.37 | 0.19 | 0.56 |  |
| 157 | Pyke | -0.41 | 0.00 | 0.41 |  |
| 158 | Akali | -0.43 | 0.00 | 0.43 |  |
| 159 | Janna | -0.44 | 0.36 | 0.80 |  |
| 160 | Gragas | -0.44 | 0.00 | 0.44 |  |
| 161 | Pantheon | -0.45 | 0.60 | 1.05 |  |
| 162 | Ryze | -0.46 | 0.24 | 0.70 |  |
| 163 | Katarina | -0.46 | 0.00 | 0.46 |  |
| 164 | Ornn | -0.55 | 0.05 | 0.60 |  |
| 165 | Fiddlesticks | -0.60 | 0.20 | 0.80 |  |
| 166 | Vi | -0.63 | 0.05 | 0.68 |  |
| 167 | Shen | -0.75 | 0.27 | 1.02 |  |
| 168 | Tahm Kench | -0.75 | 0.00 | 0.75 |  |
| 169 | Nunu & Willump | -0.84 | 0.00 | 0.84 |  |
| 170 | Taliyah | -0.93 | 0.27 | 1.20 |  |
| 171 | Naafiri | -1.10 | 0.00 | 1.10 |  |
| 172 | Galio | -1.16 | 0.00 | 1.16 |  |
