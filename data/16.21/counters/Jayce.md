# Counters to Jayce (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Jayce: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jayce wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jayce --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Trundle | +0.83 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +1.00 |
| 2 | Kayle | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 3 | Fiora | +0.82 | +1.00 | +1.00 | +1.00 | −0.10 | – | +1.00 |
| 4 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 5 | Ashe | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 6 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 7 | K'Sante | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 8 | Poppy | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 9 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 10 | Yorick | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 11 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.19 | +1.00 | +0.00 |
| 12 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 13 | Gangplank | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 14 | Renekton | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 15 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 16 | Warwick | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 17 | Dr. Mundo | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 18 | Kled | +0.74 | +1.00 | +1.00 | +1.00 | −0.20 | – | +0.00 |
| 19 | Braum | +0.74 | +1.00 | +1.00 | +0.93 | −0.11 | – | +0.00 |
| 20 | Wukong | +0.74 | +1.00 | +1.00 | +1.00 | −0.21 | – | +0.00 |
| 21 | Zac | +0.73 | +1.00 | +1.00 | +1.00 | −0.28 | – | +0.00 |
| 22 | Lulu | +0.70 | +1.00 | +1.00 | +0.49 | +0.03 | +1.00 | +0.00 |
| 23 | Graves | +0.69 | +1.00 | +1.00 | +0.45 | −0.02 | +1.00 | +0.00 |
| 24 | Teemo | +0.65 | +1.00 | +1.00 | +0.27 | −0.05 | +1.00 | +0.00 |
| 25 | Irelia | +0.64 | +0.85 | +1.00 | +0.67 | −0.13 | – | +0.00 |
| 26 | Vayne | +0.62 | +1.00 | +1.00 | +0.00 | +0.12 | +1.00 | +0.00 |
| 27 | Urgot | +0.61 | +1.00 | +1.00 | +1.00 | +0.06 | −1.00 | +0.00 |
| 28 | Jax | +0.59 | +1.00 | +1.00 | +1.00 | −0.06 | −1.00 | +0.00 |
| 29 | Shyvana | +0.58 | +1.00 | +1.00 | +1.00 | −0.14 | −1.00 | +0.00 |
| 30 | Diana | +0.55 | +1.00 | +1.00 | +0.00 | −0.03 | – | +0.00 |
| 31 | Cho'Gath | +0.55 | +1.00 | +1.00 | +0.00 | −0.05 | – | +0.00 |
| 32 | Camille | +0.54 | +1.00 | +1.00 | +0.00 | −0.07 | – | +0.00 |
| 33 | Mordekaiser | +0.54 | +1.00 | +0.23 | +1.00 | −0.14 | – | +0.00 |
| 34 | Garen | +0.53 | +1.00 | +1.00 | +0.00 | −0.17 | – | +0.00 |
| 35 | Corki | +0.34 | +0.95 | +0.72 | −0.93 | +0.03 | +1.00 | +0.00 |
| 36 | Illaoi | +0.33 | −0.26 | +1.00 | +0.31 | −0.15 | +1.00 | +0.00 |
| 37 | Bel'Veth | +0.32 | +0.68 | +1.00 | −0.84 | +0.25 | – | +0.00 |
| 38 | Aphelios | +0.29 | +1.00 | −1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 39 | Yone | +0.27 | +1.00 | +0.00 | +0.09 | −0.19 | – | +0.00 |
| 40 | Riven | +0.25 | +1.00 | +0.00 | +0.05 | −0.20 | – | +0.00 |
| 41 | Tryndamere | +0.20 | +1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 42 | Volibear | +0.19 | +0.14 | −0.09 | +1.00 | −0.27 | – | +0.00 |
| 43 | Elise | +0.16 | +0.06 | +1.00 | −0.06 | +0.06 | −1.00 | +0.00 |
| 44 | Anivia | +0.13 | +0.00 | +0.28 | +0.21 | −0.11 | +0.32 | +0.00 |
| 45 | Kalista | +0.10 | −1.00 | +1.00 | +0.07 | −0.10 | +1.00 | +0.00 |
| 46 | Ivern | +0.09 | +0.56 | −1.00 | +1.00 | +0.01 | −0.04 | +0.00 |
| 47 | Sion | +0.04 | +0.28 | −0.06 | +0.00 | −0.15 | – | +0.00 |
| 48 | Xin Zhao | +0.00 | +1.00 | −1.00 | +0.11 | −0.14 | – | +0.00 |
| 49 | Maokai | −0.00 | +0.00 | +0.00 | +0.00 | −0.01 | – | +0.00 |
| 50 | Vi | −0.01 | +1.00 | −1.00 | +0.00 | −0.05 | – | +0.00 |
| 51 | Lee Sin | −0.02 | +1.00 | −0.97 | +0.00 | −0.19 | – | +0.00 |
| 52 | Gwen | −0.02 | +0.99 | −1.00 | +0.16 | −0.35 | – | +0.00 |
| 53 | Tahm Kench | −0.05 | +0.03 | −0.53 | +0.47 | −0.12 | – | +0.00 |
| 54 | Sylas | −0.07 | +0.00 | −1.00 | +1.00 | −0.08 | – | +0.00 |
| 55 | Zeri | −0.10 | +1.00 | −1.00 | −1.00 | +0.00 | +1.00 | +0.00 |
| 56 | Yunara | −0.11 | +1.00 | −1.00 | −1.00 | −0.06 | +1.00 | +0.00 |
| 57 | Tristana | −0.12 | −1.00 | +0.00 | +1.00 | −0.11 | −0.51 | +0.00 |
| 58 | Gnar | −0.21 | +1.00 | −1.00 | −1.00 | −0.04 | −0.01 | +0.00 |
| 59 | Malphite | −0.23 | +1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 60 | Varus | −0.23 | +0.33 | −1.00 | +0.00 | −0.09 | −0.53 | +0.00 |
| 61 | Pantheon | −0.24 | +1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 62 | Nocturne | −0.25 | +1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 63 | Annie | −0.25 | −0.04 | +0.00 | −1.00 | +0.04 | −0.48 | +0.00 |
| 64 | Ambessa | −0.26 | +1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 65 | Skarner | −0.27 | +0.88 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 66 | Rengar | −0.27 | +0.64 | −1.00 | −1.00 | +0.28 | – | +0.00 |
| 67 | Fiddlesticks | −0.29 | +1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 68 | Twisted Fate | −0.31 | +1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 69 | Master Yi | −0.31 | +0.00 | −1.00 | +0.00 | −0.08 | −1.00 | +1.00 |
| 70 | Neeko | −0.33 | −1.00 | +0.00 | −1.00 | +0.15 | +1.00 | +0.00 |
| 71 | Sett | −0.33 | −1.00 | −1.00 | +1.00 | +0.03 | – | +0.00 |
| 72 | Smolder | −0.34 | +0.00 | −1.00 | −1.00 | +0.04 | +1.00 | +0.00 |
| 73 | Viego | −0.45 | +0.22 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 74 | Samira | −0.47 | −0.26 | −1.00 | −0.25 | −0.05 | −1.00 | +0.00 |
| 75 | Quinn | −0.50 | −1.00 | −1.00 | −0.53 | +0.02 | +1.00 | +0.00 |
| 76 | Rakan | −0.50 | +0.23 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 77 | Xayah | −0.60 | −1.00 | −1.00 | −1.00 | −0.01 | +1.00 | +0.00 |
| 78 | Nilah | −0.61 | −1.00 | −1.00 | +0.00 | −0.06 | −1.00 | +0.00 |
| 79 | Swain | −0.62 | −1.00 | −1.00 | −1.00 | +0.04 | +0.75 | +0.00 |
| 80 | Rell | −0.62 | −1.00 | −1.00 | −1.00 | −0.15 | +1.00 | +0.00 |
| 81 | Karma | −0.63 | −0.95 | −1.00 | −1.00 | −0.03 | +0.61 | +0.00 |
| 82 | Aurora | −0.63 | −1.00 | −1.00 | −1.00 | −0.07 | +0.76 | +0.00 |
| 83 | Mel | −0.64 | −1.00 | −1.00 | −1.00 | +0.01 | +0.54 | +0.00 |
| 84 | Senna | −0.69 | −0.94 | −1.00 | −1.00 | −0.05 | −0.02 | +0.00 |
| 85 | Aatrox | −0.71 | −0.59 | −1.00 | −0.98 | −0.29 | – | +0.00 |
| 86 | Draven | −0.71 | −1.00 | −1.00 | −1.00 | +0.11 | −0.26 | +0.00 |
| 87 | Olaf | −0.73 | −0.57 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |
| 88 | Milio | −0.73 | −1.00 | −1.00 | −0.78 | +0.12 | −0.91 | +0.00 |
| 89 | Hwei | −0.74 | −1.00 | −1.00 | −1.00 | +0.00 | −0.36 | +0.00 |
| 90 | Morgana | −0.75 | −1.00 | −0.87 | −0.92 | −0.02 | −0.97 | +0.00 |
| 91 | Jarvan IV | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 92 | Aurelion Sol | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | +0.00 |
| 93 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.16 | −0.91 | +0.00 |
| 94 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 95 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 96 | Lux | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 97 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 98 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 99 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 100 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 101 | Heimerdinger | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 102 | Hecarim | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 103 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 104 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 105 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 106 | Zyra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 107 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 108 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 109 | Orianna | −0.79 | −1.00 | −1.00 | −1.00 | +0.00 | −0.92 | +0.00 |
| 110 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Naafiri | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 112 | Jhin | −0.79 | −1.00 | −1.00 | −1.00 | −0.01 | −0.93 | +0.00 |
| 113 | Nautilus | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 114 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 115 | Ziggs | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 116 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.08 | −0.87 | +0.00 |
| 117 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 118 | Renata Glasc | −0.80 | −1.00 | −1.00 | −1.00 | −0.04 | −0.94 | +0.00 |
| 119 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 120 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | −0.07 | −0.91 | +0.00 |
| 121 | Shaco | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 122 | Kayn | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 123 | Singed | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 124 | Ornn | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 125 | Qiyana | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 126 | Rammus | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 127 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 128 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 129 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 130 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 131 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 132 | Rumble | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 133 | Lissandra | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 134 | Brand | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 135 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 136 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 137 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 138 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 139 | Soraka | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 140 | Zed | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 141 | Xerath | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 142 | Ezreal | −0.81 | −0.98 | −0.99 | −0.99 | −0.10 | −1.00 | +0.00 |
| 143 | Cassiopeia | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 144 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 145 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 146 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 147 | Locke | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 148 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 149 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 150 | Gragas | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 151 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 152 | Caitlyn | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 153 | Sivir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 154 | Lucian | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 155 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 156 | Veigar | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 157 | Azir | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 158 | Kha'Zix | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 159 | Vladimir | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 160 | Rek'Sai | −0.82 | −1.00 | −1.00 | −1.00 | −0.23 | – | +0.00 |
| 161 | Bard | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 162 | Zilean | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 163 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 164 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.26 | – | +0.00 |
| 165 | Lillia | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 166 | Thresh | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 167 | Ekko | −0.83 | −1.00 | −1.00 | −1.00 | −0.28 | – | +0.00 |
| 168 | Katarina | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.00 |
| 169 | Alistar | −0.83 | −1.00 | −1.00 | −1.00 | −0.32 | – | +0.00 |
| 170 | Udyr | −0.83 | −1.00 | −1.00 | −1.00 | −0.23 | −1.00 | +0.00 |
| 171 | Pyke | −0.84 | −1.00 | −1.00 | −1.00 | −0.39 | – | +0.00 |
| 172 | Briar | −0.86 | −1.00 | −1.00 | −1.00 | −0.51 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Jayce's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jayce's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jayce` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Fizz (net +0.78)

- **0.70** untargetable: Playful makes Fizz untargetable, dodging Jayce's Thundering Blow. Untargetable for 0.75 s; Thundering Blow takes 0.25 s to land, enough to react. (Fizz E Playful → Jayce E Thundering Blow)
- **0.31** untargetable: Playful makes Fizz untargetable, dodging Jayce's To the Skies!. Untargetable for 0.75 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Jayce Q To the Skies!)
- **0.21** untargetable: Playful makes Fizz untargetable, dodging Jayce's Hyper Charge. Untargetable for 0.75 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fizz E Playful → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 325 units farther than Fizz's (500 vs 175 attack range).

#### 2. Vladimir (net +0.72)

- **0.54** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's Thundering Blow. Untargetable for 2 s, long enough to use ahead of Thundering Blow. (Vladimir W Sanguine Pool → Jayce E Thundering Blow)
- **0.38** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's To the Skies!. Untargetable for 2 s, long enough to use ahead of To the Skies!. (Vladimir W Sanguine Pool → Jayce Q To the Skies!)
- **0.26** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jayce's Hyper Charge. Untargetable for 2 s, long enough to use ahead of Hyper Charge. (Vladimir W Sanguine Pool → Jayce W Hyper Charge)
- Watch out: Thundering Blow's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 3. Sivir (net +0.69)

- **0.51** spell shield: Spell Shield's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce E Thundering Blow)
- **0.36** spell shield: Spell Shield's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jayce Q To the Skies!)

#### 4. Nocturne (net +0.61)

- **0.63** spell shield: Shroud of Darkness's spell shield blocks Jayce's Thundering Blow. Spell shield for 1.5 s, long enough to use ahead of Thundering Blow. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce E Thundering Blow)
- **0.42** spell shield: Shroud of Darkness's spell shield blocks Jayce's To the Skies!. Spell shield for 1.5 s, long enough to use ahead of To the Skies!. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jayce Q To the Skies!)
- **0.07** cc immunity: Paranoia is displacement immune, ignoring Jayce's Thundering Blow (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Jayce E Thundering Blow)
- Watch out: Jayce's basic attacks reach 375 units farther than Nocturne's (500 vs 125 attack range).

#### 5. Morgana (net +0.59)

- **0.54** cc immunity: Black Shield makes Morgana immune to Jayce's Thundering Blow (airborne, root). Immune for 5 s, long enough to use ahead of Thundering Blow. (Morgana E Black Shield → Jayce E Thundering Blow)
- **0.09** cc immunity: Black Shield makes Morgana immune to Jayce's To the Skies! (slow). Immune for 5 s, long enough to use ahead of To the Skies!. (Morgana E Black Shield → Jayce Q To the Skies!)

#### 6. Maokai (net +0.58)

- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's Thundering Blow. Untargetable for 1.4 s; Thundering Blow takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Jayce E Thundering Blow)
- **0.27** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's To the Skies!. Untargetable for 1.4 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jayce Q To the Skies!)
- **0.19** untargetable: Twisted Advance makes Maokai untargetable, dodging Jayce's Hyper Charge. Untargetable for 1.4 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 375 units farther than Maokai's (500 vs 125 attack range).

#### 7. Teemo (net +0.58)

- **0.43** blind: Blinding Dart's blind makes Jayce's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Jayce basic attacks)
- **0.30** blind: Blinding Dart's blind makes Jayce's Hyper Charge, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Jayce W Hyper Charge)

#### 8. Lissandra (net +0.53)

- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Lissandra R Frozen Tomb → Jayce E Thundering Blow)
- **0.27** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Lissandra R Frozen Tomb → Jayce Q To the Skies!)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jayce's Hyper Charge. Untargetable for 2.5 s, long enough to use ahead of Hyper Charge. (Lissandra R Frozen Tomb → Jayce W Hyper Charge)

#### 9. Fiora (net +0.52)

- **0.64** parry: Riposte parries Jayce's Thundering Blow and stuns back. Parry for 0.75 s; Thundering Blow takes 0.25 s to land, enough to react. Negating Thundering Blow's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Jayce E Thundering Blow)
- **0.22** parry: Riposte parries Jayce's To the Skies!. Parry for 0.75 s; To the Skies! lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Jayce Q To the Skies!)
- **0.16** parry: Riposte parries Jayce's Hyper Charge. Parry for 0.75 s; Hyper Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Jayce W Hyper Charge)
- Watch out: Jayce's basic attacks reach 350 units farther than Fiora's (500 vs 150 attack range).

#### 10. Bard (net +0.52)

- **0.33** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's Thundering Blow. Untargetable for 2.5 s, long enough to use ahead of Thundering Blow. (Bard R Tempered Fate → Jayce E Thundering Blow)
- **0.27** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's To the Skies!. Untargetable for 2.5 s, long enough to use ahead of To the Skies!. (Bard R Tempered Fate → Jayce Q To the Skies!)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Jayce's Hyper Charge. Untargetable for 2.5 s, long enough to use ahead of Hyper Charge. (Bard R Tempered Fate → Jayce W Hyper Charge)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Fizz | +0.78 | 0.91 | 0.13 |  |
| 2 | Vladimir | +0.72 | 0.80 | 0.08 |  |
| 3 | Sivir | +0.69 | 0.69 | 0.00 |  |
| 4 | Nocturne | +0.61 | 0.91 | 0.30 |  |
| 5 | Morgana | +0.59 | 0.59 | 0.00 |  |
| 6 | Maokai | +0.58 | 0.88 | 0.30 |  |
| 7 | Teemo | +0.58 | 0.58 | 0.00 | blind (Blinding Dart) |
| 8 | Lissandra | +0.53 | 0.53 | 0.00 |  |
| 9 | Fiora | +0.52 | 0.80 | 0.28 |  |
| 10 | Bard | +0.52 | 0.52 | 0.00 |  |
| 11 | Xayah | +0.50 | 0.50 | 0.00 |  |
| 12 | Yuumi | +0.48 | 0.95 | 0.47 |  |
| 13 | Udyr | +0.47 | 0.77 | 0.30 |  |
| 14 | Aurora | +0.44 | 0.44 | 0.00 |  |
| 15 | Kayle | +0.43 | 0.43 | 0.00 |  |
| 16 | Gwen | +0.38 | 0.66 | 0.28 |  |
| 17 | Milio | +0.36 | 0.36 | 0.00 |  |
| 18 | Samira | +0.35 | 0.35 | 0.00 |  |
| 19 | Rek'Sai | +0.34 | 0.52 | 0.18 |  |
| 20 | Mel | +0.33 | 0.33 | 0.00 |  |
| 21 | Camille | +0.30 | 0.45 | 0.15 |  |
| 22 | Lulu | +0.30 | 0.30 | 0.00 |  |
| 23 | Cassiopeia | +0.29 | 0.29 | 0.00 |  |
| 24 | Kalista | +0.28 | 0.28 | 0.00 |  |
| 25 | Braum | +0.27 | 0.57 | 0.30 | projectile block (Unbreakable) |
| 26 | Master Yi | +0.26 | 0.75 | 0.49 |  |
| 27 | Vex | +0.26 | 0.26 | 0.00 |  |
| 28 | Evelynn | +0.24 | 0.44 | 0.20 |  |
| 29 | Shaco | +0.24 | 0.44 | 0.20 |  |
| 30 | Kled | +0.24 | 0.34 | 0.10 |  |
| 31 | Zed | +0.23 | 0.43 | 0.20 |  |
| 32 | Hwei | +0.23 | 0.23 | 0.00 |  |
| 33 | Jinx | +0.23 | 0.23 | 0.00 |  |
| 34 | Jax | +0.22 | 0.52 | 0.30 |  |
| 35 | Yasuo | +0.22 | 0.40 | 0.18 |  |
| 36 | Ahri | +0.21 | 0.21 | 0.00 |  |
| 37 | Nilah | +0.20 | 0.42 | 0.22 |  |
| 38 | Veigar | +0.20 | 0.20 | 0.00 |  |
| 39 | Viktor | +0.20 | 0.20 | 0.00 |  |
| 40 | Tristana | +0.18 | 0.18 | 0.00 |  |
| 41 | Zaahen | +0.17 | 0.35 | 0.18 |  |
| 42 | Malzahar | +0.12 | 0.52 | 0.40 |  |
| 43 | Ashe | +0.09 | 0.09 | 0.00 |  |
| 44 | Senna | +0.08 | 0.08 | 0.00 |  |
| 45 | Yone | +0.07 | 0.20 | 0.13 |  |
| 46 | Annie | +0.07 | 0.07 | 0.00 |  |
| 47 | Yunara | +0.07 | 0.07 | 0.00 |  |
| 48 | Anivia | +0.06 | 0.06 | 0.00 |  |
| 49 | Aphelios | +0.06 | 0.06 | 0.00 |  |
| 50 | Heimerdinger | +0.06 | 0.06 | 0.00 |  |
| 51 | Xin Zhao | +0.04 | 0.30 | 0.26 |  |
| 52 | Zyra | +0.04 | 0.04 | 0.00 |  |
| 53 | Rengar | 0.00 | 0.61 | 0.61 |  |
| 54 | Alistar | 0.00 | 0.30 | 0.30 |  |
| 55 | K'Sante | 0.00 | 0.14 | 0.14 |  |
| 56 | Azir | 0.00 | 0.00 | 0.00 |  |
| 57 | Brand | 0.00 | 0.00 | 0.00 |  |
| 58 | Corki | 0.00 | 0.00 | 0.00 |  |
| 59 | Draven | 0.00 | 0.00 | 0.00 |  |
| 60 | Elise | 0.00 | 0.00 | 0.00 |  |
| 61 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 62 | Gnar | 0.00 | 0.00 | 0.00 |  |
| 63 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 64 | Karma | 0.00 | 0.00 | 0.00 |  |
| 65 | Kennen | 0.00 | 0.00 | 0.00 |  |
| 66 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 67 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 68 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 69 | Lux | 0.00 | 0.00 | 0.00 |  |
| 70 | Nami | 0.00 | 0.00 | 0.00 |  |
| 71 | Neeko | 0.00 | 0.00 | 0.00 |  |
| 72 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 73 | Orianna | 0.00 | 0.00 | 0.00 |  |
| 74 | Renata Glasc | 0.00 | 0.00 | 0.00 |  |
| 75 | Seraphine | 0.00 | 0.00 | 0.00 |  |
| 76 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 77 | Sona | 0.00 | 0.00 | 0.00 |  |
| 78 | Soraka | 0.00 | 0.00 | 0.00 |  |
| 79 | Swain | 0.00 | 0.00 | 0.00 |  |
| 80 | Syndra | 0.00 | 0.00 | 0.00 |  |
| 81 | Thresh | 0.00 | 0.00 | 0.00 |  |
| 82 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 83 | Vayne | 0.00 | 0.00 | 0.00 |  |
| 84 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 85 | Ziggs | 0.00 | 0.00 | 0.00 |  |
| 86 | Zilean | 0.00 | 0.00 | 0.00 |  |
| 87 | Zoe | 0.00 | 0.00 | 0.00 |  |
| 88 | Malphite | -0.02 | 0.28 | 0.30 |  |
| 89 | Graves | -0.04 | 0.00 | 0.04 |  |
| 90 | Jarvan IV | -0.06 | 0.07 | 0.13 |  |
| 91 | Varus | -0.06 | 0.05 | 0.11 |  |
| 92 | Aurelion Sol | -0.08 | 0.00 | 0.08 |  |
| 93 | Gangplank | -0.11 | 0.50 | 0.61 |  |
| 94 | Hecarim | -0.11 | 0.07 | 0.18 |  |
| 95 | Ornn | -0.11 | 0.07 | 0.18 |  |
| 96 | Rakan | -0.11 | 0.00 | 0.11 |  |
| 97 | Poppy | -0.12 | 0.38 | 0.50 |  |
| 98 | Volibear | -0.12 | 0.07 | 0.19 |  |
| 99 | Urgot | -0.12 | 0.00 | 0.12 |  |
| 100 | Sylas | -0.13 | 0.00 | 0.13 |  |
| 101 | Caitlyn | -0.14 | 0.14 | 0.28 |  |
| 102 | Lillia | -0.14 | 0.00 | 0.14 |  |
| 103 | Briar | -0.15 | 0.00 | 0.15 |  |
| 104 | Ivern | -0.15 | 0.00 | 0.15 |  |
| 105 | Shen | -0.16 | 0.49 | 0.65 |  |
| 106 | Amumu | -0.17 | 0.13 | 0.30 |  |
| 107 | Wukong | -0.18 | 0.00 | 0.18 |  |
| 108 | Rell | -0.18 | 0.00 | 0.18 |  |
| 109 | Kayn | -0.19 | 0.44 | 0.63 |  |
| 110 | Bel'Veth | -0.19 | 0.00 | 0.19 |  |
| 111 | Qiyana | -0.19 | 0.00 | 0.19 |  |
| 112 | Quinn | -0.19 | 0.00 | 0.19 |  |
| 113 | Akali | -0.20 | 0.00 | 0.20 |  |
| 114 | Ambessa | -0.20 | 0.00 | 0.20 |  |
| 115 | Ekko | -0.20 | 0.00 | 0.20 |  |
| 116 | Lee Sin | -0.20 | 0.00 | 0.20 |  |
| 117 | Riven | -0.20 | 0.00 | 0.20 |  |
| 118 | Talon | -0.20 | 0.00 | 0.20 |  |
| 119 | Shyvana | -0.21 | 0.07 | 0.28 |  |
| 120 | Garen | -0.23 | 0.30 | 0.53 |  |
| 121 | Illaoi | -0.23 | 0.07 | 0.30 |  |
| 122 | Sett | -0.23 | 0.07 | 0.30 |  |
| 123 | Pantheon | -0.24 | 0.44 | 0.68 |  |
| 124 | Olaf | -0.24 | 0.37 | 0.61 |  |
| 125 | Irelia | -0.24 | 0.00 | 0.24 |  |
| 126 | Rammus | -0.25 | 0.32 | 0.57 |  |
| 127 | Aatrox | -0.26 | 0.00 | 0.26 |  |
| 128 | Nautilus | -0.26 | 0.00 | 0.26 |  |
| 129 | Tryndamere | -0.26 | 0.00 | 0.26 |  |
| 130 | Sion | -0.27 | 0.39 | 0.66 |  |
| 131 | Viego | -0.27 | 0.07 | 0.34 |  |
| 132 | Nasus | -0.28 | 0.33 | 0.61 |  |
| 133 | Akshan | -0.28 | 0.00 | 0.28 |  |
| 134 | Diana | -0.28 | 0.00 | 0.28 |  |
| 135 | Jhin | -0.28 | 0.00 | 0.28 |  |
| 136 | Karthus | -0.28 | 0.00 | 0.28 |  |
| 137 | Kassadin | -0.28 | 0.00 | 0.28 |  |
| 138 | Lucian | -0.28 | 0.00 | 0.28 |  |
| 139 | Miss Fortune | -0.28 | 0.00 | 0.28 |  |
| 140 | Sejuani | -0.28 | 0.00 | 0.28 |  |
| 141 | Vel'Koz | -0.28 | 0.00 | 0.28 |  |
| 142 | Kha'Zix | -0.30 | 0.00 | 0.30 |  |
| 143 | Leona | -0.30 | 0.00 | 0.30 |  |
| 144 | Locke | -0.30 | 0.00 | 0.30 |  |
| 145 | Renekton | -0.30 | 0.00 | 0.30 |  |
| 146 | Singed | -0.31 | 0.30 | 0.61 |  |
| 147 | Xerath | -0.32 | 0.00 | 0.32 |  |
| 148 | Pyke | -0.34 | 0.00 | 0.34 |  |
| 149 | Ryze | -0.35 | 0.00 | 0.35 |  |
| 150 | Twisted Fate | -0.35 | 0.00 | 0.35 |  |
| 151 | Warwick | -0.36 | 0.49 | 0.85 |  |
| 152 | Janna | -0.40 | 0.00 | 0.40 |  |
| 153 | Mordekaiser | -0.45 | 0.08 | 0.53 |  |
| 154 | Fiddlesticks | -0.45 | 0.00 | 0.45 |  |
| 155 | Gragas | -0.46 | 0.00 | 0.46 |  |
| 156 | Zac | -0.47 | 0.26 | 0.73 |  |
| 157 | Taliyah | -0.48 | 0.00 | 0.48 |  |
| 158 | Skarner | -0.50 | 0.07 | 0.57 |  |
| 159 | Vi | -0.51 | 0.07 | 0.58 |  |
| 160 | Darius | -0.53 | 0.00 | 0.53 |  |
| 161 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 162 | Yorick | -0.53 | 0.00 | 0.53 |  |
| 163 | Taric | -0.57 | 0.00 | 0.57 |  |
| 164 | Katarina | -0.58 | 0.00 | 0.58 |  |
| 165 | Naafiri | -0.60 | 0.00 | 0.60 |  |
| 166 | Blitzcrank | -0.61 | 0.00 | 0.61 |  |
| 167 | Cho'Gath | -0.61 | 0.00 | 0.61 |  |
| 168 | Dr. Mundo | -0.61 | 0.00 | 0.61 |  |
| 169 | Rumble | -0.61 | 0.00 | 0.61 |  |
| 170 | Tahm Kench | -0.76 | 0.00 | 0.76 |  |
| 171 | Galio | -0.78 | 0.00 | 0.78 |  |
| 172 | Nunu & Willump | -0.94 | 0.16 | 1.10 |  |
