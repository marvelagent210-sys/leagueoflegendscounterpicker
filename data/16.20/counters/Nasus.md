# Counters to Nasus (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Nasus: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Nasus wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Nasus --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 2 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 3 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 4 | Vayne | +0.42 | +1.00 | +1.00 | −1.00 | +0.12 | +1.00 | +0.00 |
| 5 | Ashe | +0.09 | −0.01 | +0.68 | −1.00 | +0.14 | +1.00 | +0.00 |
| 6 | Zac | −0.03 | +0.04 | −0.01 | −0.05 | −0.19 | – | +0.00 |
| 7 | Anivia | −0.05 | −0.28 | +0.07 | +0.04 | −0.10 | +0.11 | +0.00 |
| 8 | Yasuo | −0.21 | +1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 9 | Karma | −0.37 | −0.12 | −0.59 | −1.00 | +0.09 | −0.09 | +0.00 |
| 10 | Tahm Kench | −0.41 | −0.24 | −0.26 | −1.00 | +0.13 | −1.00 | +0.00 |
| 11 | Kog'Maw | −0.44 | −1.00 | +0.00 | −1.00 | +0.10 | +0.00 | +0.00 |
| 12 | K'Sante | −0.52 | −1.00 | −1.00 | −1.00 | +0.21 | +1.00 | +1.00 |
| 13 | Fiora | −0.69 | −1.00 | −1.00 | −1.00 | +0.22 | – | +1.00 |
| 14 | Master Yi | −0.72 | −1.00 | −1.00 | −1.00 | +0.01 | – | +1.00 |
| 15 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 16 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | +0.00 |
| 17 | Gwen | −0.75 | −1.00 | −1.00 | −1.00 | +0.16 | – | +0.00 |
| 18 | Ambessa | −0.75 | −1.00 | −1.00 | −1.00 | +0.31 | −1.00 | +0.00 |
| 19 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.14 | – | +0.00 |
| 20 | Gangplank | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 21 | Cho'Gath | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 22 | Zaahen | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 23 | Volibear | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 24 | Hecarim | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 25 | Poppy | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 26 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 27 | Vel'Koz | −0.76 | −1.00 | −1.00 | −1.00 | +0.24 | −1.00 | +0.00 |
| 28 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 29 | Milio | −0.77 | −1.00 | −1.00 | −1.00 | +0.22 | −1.00 | −0.01 |
| 30 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 31 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 32 | Darius | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 33 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 34 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | +0.00 |
| 35 | Lee Sin | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 36 | Jax | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 37 | Jayce | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 38 | Sion | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 39 | Shen | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 40 | Dr. Mundo | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 41 | Illaoi | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 42 | Nocturne | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 43 | Kayle | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 44 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 45 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 46 | Corki | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 47 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 48 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | +0.00 |
| 49 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 50 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 51 | Trundle | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 52 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 53 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 54 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 55 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 56 | Heimerdinger | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 57 | Tryndamere | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 58 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 59 | Garen | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 60 | Xayah | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 61 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 62 | Wukong | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 63 | Maokai | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 64 | Mel | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 65 | Morgana | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 66 | Jhin | −0.78 | −0.99 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 67 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 68 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 69 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 70 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 71 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 72 | Hwei | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 73 | Jinx | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 74 | Bel'Veth | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 75 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 76 | Aurora | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 77 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 78 | Neeko | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 79 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 80 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 81 | Mordekaiser | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 82 | Kennen | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 83 | Lulu | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 84 | Gnar | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 85 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 86 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 87 | Teemo | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 88 | Renekton | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 89 | Annie | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 90 | Kled | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 91 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 92 | Azir | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 93 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 94 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 95 | Singed | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 96 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 97 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 98 | Orianna | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 99 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 100 | Twisted Fate | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 101 | Viktor | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 102 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 103 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 104 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 105 | Varus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 106 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 107 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 108 | Ezreal | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 109 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 110 | LeBlanc | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 112 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 113 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 114 | Soraka | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.02 |
| 115 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 116 | Kayn | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 117 | Locke | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.01 |
| 118 | Bard | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 119 | Lillia | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 120 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 121 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 122 | Warwick | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 123 | Vi | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 124 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 125 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 126 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 127 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 128 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 129 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 130 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 131 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 132 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 133 | Olaf | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 134 | Nilah | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 135 | Shyvana | −0.81 | −1.00 | −1.00 | −1.00 | +0.15 | – | −1.00 |
| 136 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 137 | Braum | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 138 | Aatrox | −0.81 | −1.00 | −1.00 | −1.00 | +0.13 | – | −1.00 |
| 139 | Yone | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | – | −1.00 |
| 140 | Rammus | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 141 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 142 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 143 | Aphelios | −0.82 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −1.00 |
| 144 | Sylas | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 145 | Camille | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −1.00 |
| 146 | Smolder | −0.83 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −1.00 |
| 147 | Yunara | −0.83 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −1.00 |
| 148 | Viego | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −1.00 |
| 149 | Kalista | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |
| 150 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −1.00 |
| 151 | Swain | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 152 | Miss Fortune | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 153 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 154 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −1.00 |
| 155 | Nami | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.94 |
| 156 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −1.00 |
| 157 | Sivir | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 158 | Akshan | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 159 | Tristana | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 160 | Quinn | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 161 | Brand | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 162 | Rell | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 163 | Zeri | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 164 | Kindred | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 165 | Rumble | −0.85 | −1.00 | −1.00 | −1.00 | −0.08 | – | −1.00 |
| 166 | Blitzcrank | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 167 | Nidalee | −0.85 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | −1.00 |
| 168 | Veigar | −0.85 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | −1.00 |
| 169 | Ekko | −0.86 | −1.00 | −1.00 | −1.00 | −0.16 | – | −1.00 |
| 170 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −1.00 |
| 171 | Talon | −0.87 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −1.00 |
| 172 | Briar | −0.87 | −1.00 | −1.00 | −1.00 | −0.22 | – | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Nasus's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Nasus's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Nasus` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +0.93)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Teemo basic attacks → Nasus basic attacks)
- **0.43** blind: Blinding Dart's blind makes Nasus's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Nasus basic attacks)
- **0.36** blind: Blinding Dart's blind makes Nasus's Siphoning Strike, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Nasus Q Siphoning Strike)
- Watch out: Wither cuts Teemo's attack speed by 75% for 5 s.

#### 2. Yuumi (net +0.83)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Nasus's (425 vs 125 attack range). Nasus has no dash or blink to close the gap. (Yuumi basic attacks → Nasus basic attacks)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Nasus's Wither. Untargetable for ?; Wither takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nasus W Wither)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Nasus's Siphoning Strike. Untargetable for ?; Siphoning Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Nasus Q Siphoning Strike)
- Watch out: Wither cuts Yuumi's attack speed by 75% for 5 s.

#### 3. Sivir (net +0.79)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Sivir basic attacks → Nasus basic attacks)
- **0.35** spell shield: Spell Shield's spell shield blocks Nasus's Wither. Spell shield for 1.5 s, long enough to use ahead of Wither. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Nasus W Wither)
- Watch out: Wither cuts Sivir's attack speed by 75% for 5 s.

#### 4. Xayah (net +0.72)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Nasus's (525 vs 125 attack range). Nasus has no dash or blink to close the gap. (Xayah basic attacks → Nasus basic attacks)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Nasus's Siphoning Strike. Untargetable for 1.5 s, long enough to use ahead of Siphoning Strike. (Xayah R Featherstorm → Nasus Q Siphoning Strike)
- **0.21** untargetable: Featherstorm makes Xayah untargetable, dodging Nasus's Wither. Untargetable for 1.5 s, long enough to use ahead of Wither. (Xayah R Featherstorm → Nasus W Wither)
- Watch out: Wither cuts Xayah's attack speed by 75% for 5 s.

#### 5. Bard (net +0.67)

- **0.72** range: Bard's basic attacks reach 375 units farther than Nasus's (500 vs 125 attack range). Nasus has no dash or blink to close the gap. (Bard basic attacks → Nasus basic attacks)
- **0.23** untargetable: Tempered Fate makes Bard untargetable, dodging Nasus's Siphoning Strike. Untargetable for 2.5 s, long enough to use ahead of Siphoning Strike. (Bard R Tempered Fate → Nasus Q Siphoning Strike)
- **0.22** untargetable: Tempered Fate makes Bard untargetable, dodging Nasus's Wither. Untargetable for 2.5 s, long enough to use ahead of Wither. (Bard R Tempered Fate → Nasus W Wither)
- Watch out: Wither cuts Bard's attack speed by 75% for 5 s.

#### 6. Lulu (net +0.66)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Lulu basic attacks → Nasus basic attacks)
- **0.30** disarm: Whimsy disarms Nasus for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Nasus basic attacks)
- Watch out: Wither cuts Lulu's attack speed by 75% for 5 s.

#### 7. Vladimir (net +0.66)

- **0.37** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nasus's Wither. Untargetable for 2 s, long enough to use ahead of Wither. (Vladimir W Sanguine Pool → Nasus W Wither)
- **0.36** range: Vladimir's basic attacks reach 325 units farther than Nasus's (450 vs 125 attack range). Nasus has no dash or blink to close the gap. (Vladimir basic attacks → Nasus basic attacks)
- **0.29** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Nasus's Siphoning Strike. Untargetable for 2 s, long enough to use ahead of Siphoning Strike. (Vladimir W Sanguine Pool → Nasus Q Siphoning Strike)
- Watch out: Wither cuts Vladimir's attack speed by 75% for 5 s.

#### 8. Kayle (net +0.59)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Nasus's (625 vs 125 attack range). Nasus has no dash or blink to close the gap. (Kayle basic attacks → Nasus basic attacks)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Nasus's Siphoning Strike. Invulnerable for 2.5 s, long enough to use ahead of Siphoning Strike. (Kayle R Divine Judgment → Nasus Q Siphoning Strike)
- Watch out: Wither cuts Kayle's attack speed by 75% for 5 s.

#### 9. Aurora (net +0.57)

- **0.58** range: Aurora's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Aurora basic attacks → Nasus basic attacks)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Nasus's Wither. Untargetable for 0.4 s; Wither takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nasus W Wither)
- **0.14** untargetable: Between Worlds makes Aurora untargetable, dodging Nasus's Siphoning Strike. Untargetable for 0.4 s; Siphoning Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Nasus Q Siphoning Strike)
- Watch out: Wither cuts Aurora's attack speed by 75% for 5 s.

#### 10. Lissandra (net +0.56)

- **0.44** range: Lissandra's basic attacks reach 425 units farther than Nasus's (550 vs 125 attack range). Nasus has no dash or blink to close the gap. (Lissandra basic attacks → Nasus basic attacks)
- **0.23** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nasus's Siphoning Strike. Untargetable for 2.5 s, long enough to use ahead of Siphoning Strike. (Lissandra R Frozen Tomb → Nasus Q Siphoning Strike)
- **0.22** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Nasus's Wither. Untargetable for 2.5 s, long enough to use ahead of Wither. (Lissandra R Frozen Tomb → Nasus W Wither)
- Watch out: Wither cuts Lissandra's attack speed by 75% for 5 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +0.93 | 1.29 | 0.36 | range (attacks), blind (Blinding Dart) |
| 2 | Yuumi | +0.83 | 1.26 | 0.43 | range (attacks) |
| 3 | Sivir | +0.79 | 1.29 | 0.50 | range (attacks) |
| 4 | Xayah | +0.72 | 1.11 | 0.39 | range (attacks) |
| 5 | Bard | +0.67 | 1.06 | 0.39 | range (attacks) |
| 6 | Lulu | +0.66 | 1.02 | 0.36 | range (attacks) |
| 7 | Vladimir | +0.66 | 0.88 | 0.22 |  |
| 8 | Kayle | +0.59 | 0.95 | 0.36 | range (attacks) |
| 9 | Aurora | +0.57 | 0.86 | 0.29 | range (attacks) |
| 10 | Lissandra | +0.56 | 0.78 | 0.22 |  |
| 11 | Kindred | +0.44 | 0.94 | 0.50 | range (attacks) |
| 12 | Milio | +0.44 | 0.83 | 0.39 | range (attacks) |
| 13 | Zeri | +0.43 | 0.88 | 0.45 | range (attacks) |
| 14 | Twisted Fate | +0.43 | 0.86 | 0.43 | range (attacks) |
| 15 | Twitch | +0.43 | 0.86 | 0.43 | range (attacks) |
| 16 | Vayne | +0.43 | 0.86 | 0.43 | range (attacks) |
| 17 | Aphelios | +0.43 | 0.82 | 0.39 | range (attacks) |
| 18 | Sona | +0.41 | 0.83 | 0.42 | range (attacks) |
| 19 | Kai'Sa | +0.38 | 0.77 | 0.39 | range (attacks) |
| 20 | Quinn | +0.38 | 0.77 | 0.39 | range (attacks) |
| 21 | Renata Glasc | +0.38 | 0.77 | 0.39 | range (attacks) |
| 22 | Varus | +0.38 | 0.65 | 0.27 | range (attacks) |
| 23 | Ashe | +0.36 | 0.72 | 0.36 | range (attacks) |
| 24 | Caitlyn | +0.36 | 0.72 | 0.36 | range (attacks) |
| 25 | Draven | +0.36 | 0.72 | 0.36 | range (attacks) |
| 26 | Janna | +0.36 | 0.72 | 0.36 | range (attacks) |
| 27 | Tristana | +0.36 | 0.72 | 0.36 | range (attacks) |
| 28 | Yunara | +0.36 | 0.72 | 0.36 | range (attacks) |
| 29 | Kalista | +0.36 | 0.69 | 0.33 | range (attacks) |
| 30 | Lucian | +0.33 | 0.72 | 0.39 | range (attacks) |
| 31 | Akshan | +0.32 | 0.68 | 0.36 | range (attacks) |
| 32 | Gnar | +0.32 | 0.66 | 0.34 | range (attacks) |
| 33 | Corki | +0.32 | 0.65 | 0.33 | range (attacks) |
| 34 | Elise | +0.32 | 0.65 | 0.33 | range (attacks) |
| 35 | Ezreal | +0.32 | 0.65 | 0.33 | range (attacks) |
| 36 | Miss Fortune | +0.32 | 0.65 | 0.33 | range (attacks) |
| 37 | Senna | +0.32 | 0.65 | 0.33 | range (attacks) |
| 38 | Smolder | +0.32 | 0.65 | 0.33 | range (attacks) |
| 39 | Viktor | +0.32 | 0.65 | 0.33 | range (attacks) |
| 40 | Zilean | +0.32 | 0.65 | 0.33 | range (attacks) |
| 41 | Zoe | +0.32 | 0.65 | 0.33 | range (attacks) |
| 42 | Nidalee | +0.30 | 0.60 | 0.30 | range (attacks) |
| 43 | Jinx | +0.29 | 0.58 | 0.29 | range (attacks) |
| 44 | Kennen | +0.29 | 0.58 | 0.29 | range (attacks) |
| 45 | Lux | +0.29 | 0.58 | 0.29 | range (attacks) |
| 46 | Seraphine | +0.29 | 0.58 | 0.29 | range (attacks) |
| 47 | Fizz | +0.29 | 0.56 | 0.27 |  |
| 48 | Jayce | +0.28 | 0.61 | 0.33 | range (attacks) |
| 49 | Samira | +0.28 | 0.61 | 0.33 | range (attacks) |
| 50 | Maokai | +0.28 | 0.55 | 0.27 |  |
| 51 | Azir | +0.26 | 0.53 | 0.27 | range (attacks) |
| 52 | Jhin | +0.26 | 0.53 | 0.27 | range (attacks) |
| 53 | Mel | +0.26 | 0.53 | 0.27 | range (attacks) |
| 54 | Orianna | +0.26 | 0.53 | 0.27 | range (attacks) |
| 55 | Soraka | +0.26 | 0.53 | 0.27 | range (attacks) |
| 56 | Taliyah | +0.26 | 0.53 | 0.27 | range (attacks) |
| 57 | Vel'Koz | +0.26 | 0.53 | 0.27 | range (attacks) |
| 58 | Vex | +0.26 | 0.53 | 0.27 | range (attacks) |
| 59 | Xerath | +0.26 | 0.53 | 0.27 | range (attacks) |
| 60 | Ziggs | +0.26 | 0.53 | 0.27 | range (attacks) |
| 61 | Kog'Maw | +0.25 | 0.54 | 0.29 | range (attacks) |
| 62 | Malzahar | +0.25 | 0.47 | 0.22 |  |
| 63 | Heimerdinger | +0.25 | 0.45 | 0.20 |  |
| 64 | Anivia | +0.24 | 0.48 | 0.24 |  |
| 65 | Morgana | +0.24 | 0.48 | 0.24 |  |
| 66 | Ryze | +0.24 | 0.48 | 0.24 |  |
| 67 | Veigar | +0.24 | 0.48 | 0.24 |  |
| 68 | Zyra | +0.24 | 0.48 | 0.24 |  |
| 69 | Hwei | +0.23 | 0.46 | 0.23 |  |
| 70 | Ahri | +0.22 | 0.44 | 0.22 |  |
| 71 | Annie | +0.22 | 0.44 | 0.22 |  |
| 72 | Aurelion Sol | +0.22 | 0.44 | 0.22 |  |
| 73 | Brand | +0.22 | 0.44 | 0.22 |  |
| 74 | Cassiopeia | +0.22 | 0.44 | 0.22 |  |
| 75 | Karma | +0.22 | 0.44 | 0.22 |  |
| 76 | LeBlanc | +0.22 | 0.44 | 0.22 |  |
| 77 | Nami | +0.22 | 0.44 | 0.22 |  |
| 78 | Neeko | +0.22 | 0.44 | 0.22 |  |
| 79 | Syndra | +0.22 | 0.44 | 0.22 |  |
| 80 | Swain | +0.21 | 0.42 | 0.21 |  |
| 81 | Nilah | +0.19 | 0.69 | 0.50 |  |
| 82 | Jax | +0.19 | 0.52 | 0.33 |  |
| 83 | Fiddlesticks | +0.17 | 0.39 | 0.22 |  |
| 84 | Graves | +0.16 | 0.49 | 0.33 |  |
| 85 | Ivern | +0.16 | 0.38 | 0.22 |  |
| 86 | Fiora | +0.15 | 0.48 | 0.33 |  |
| 87 | Karthus | +0.15 | 0.39 | 0.24 |  |
| 88 | Thresh | +0.15 | 0.39 | 0.24 |  |
| 89 | Master Yi | +0.12 | 0.51 | 0.39 |  |
| 90 | Shen | +0.12 | 0.51 | 0.39 |  |
| 91 | Gwen | +0.08 | 0.44 | 0.36 |  |
| 92 | Kayn | +0.05 | 0.29 | 0.24 |  |
| 93 | Nocturne | +0.04 | 0.43 | 0.39 |  |
| 94 | Rek'Sai | +0.04 | 0.34 | 0.30 |  |
| 95 | Rammus | +0.03 | 0.32 | 0.29 |  |
| 96 | Urgot | +0.03 | 0.30 | 0.27 |  |
| 97 | Evelynn | +0.02 | 0.29 | 0.27 |  |
| 98 | Lillia | 0.00 | 0.22 | 0.22 |  |
| 99 | Zed | -0.01 | 0.28 | 0.29 |  |
| 100 | Shaco | -0.04 | 0.29 | 0.33 |  |
| 101 | Rakan | -0.04 | 0.25 | 0.29 |  |
| 102 | Pantheon | -0.05 | 0.28 | 0.33 |  |
| 103 | Malphite | -0.08 | 0.21 | 0.29 |  |
| 104 | Singed | -0.09 | 0.18 | 0.27 |  |
| 105 | Kled | -0.11 | 0.31 | 0.42 |  |
| 106 | Camille | -0.11 | 0.28 | 0.39 |  |
| 107 | Nunu & Willump | -0.14 | 0.13 | 0.27 |  |
| 108 | Irelia | -0.17 | 0.10 | 0.27 |  |
| 109 | Katarina | -0.21 | 0.12 | 0.33 |  |
| 110 | Gangplank | -0.21 | 0.08 | 0.29 |  |
| 111 | Sion | -0.21 | 0.06 | 0.27 |  |
| 112 | Xin Zhao | -0.22 | 0.23 | 0.45 |  |
| 113 | Kha'Zix | -0.24 | 0.00 | 0.24 |  |
| 114 | Mordekaiser | -0.25 | 0.08 | 0.33 |  |
| 115 | Ambessa | -0.25 | 0.00 | 0.25 |  |
| 116 | Skarner | -0.27 | 0.06 | 0.33 |  |
| 117 | Amumu | -0.27 | 0.00 | 0.27 |  |
| 118 | Diana | -0.27 | 0.00 | 0.27 |  |
| 119 | Galio | -0.27 | 0.00 | 0.27 |  |
| 120 | Lee Sin | -0.27 | 0.00 | 0.27 |  |
| 121 | Ornn | -0.27 | 0.00 | 0.27 |  |
| 122 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 123 | Yone | -0.27 | 0.00 | 0.27 |  |
| 124 | Zaahen | -0.28 | 0.05 | 0.33 |  |
| 125 | Alistar | -0.29 | 0.04 | 0.33 |  |
| 126 | Akali | -0.29 | 0.00 | 0.29 |  |
| 127 | Cho'Gath | -0.29 | 0.00 | 0.29 |  |
| 128 | Gragas | -0.29 | 0.00 | 0.29 |  |
| 129 | Illaoi | -0.29 | 0.00 | 0.29 |  |
| 130 | Kassadin | -0.29 | 0.00 | 0.29 |  |
| 131 | Leona | -0.29 | 0.00 | 0.29 |  |
| 132 | Naafiri | -0.29 | 0.00 | 0.29 |  |
| 133 | Pyke | -0.29 | 0.00 | 0.29 |  |
| 134 | Rumble | -0.29 | 0.00 | 0.29 |  |
| 135 | Shyvana | -0.29 | 0.00 | 0.29 |  |
| 136 | Sylas | -0.29 | 0.00 | 0.29 |  |
| 137 | Tahm Kench | -0.29 | 0.00 | 0.29 |  |
| 138 | Yasuo | -0.29 | 0.00 | 0.29 |  |
| 139 | Zac | -0.29 | 0.00 | 0.29 |  |
| 140 | Rengar | -0.30 | 0.09 | 0.39 |  |
| 141 | Warwick | -0.30 | 0.06 | 0.36 |  |
| 142 | Qiyana | -0.30 | 0.00 | 0.30 |  |
| 143 | Viego | -0.31 | 0.19 | 0.50 |  |
| 144 | Garen | -0.31 | 0.12 | 0.43 |  |
| 145 | Udyr | -0.31 | 0.11 | 0.42 |  |
| 146 | Braum | -0.33 | 0.00 | 0.33 |  |
| 147 | Dr. Mundo | -0.33 | 0.00 | 0.33 |  |
| 148 | Ekko | -0.33 | 0.00 | 0.33 |  |
| 149 | Hecarim | -0.33 | 0.00 | 0.33 |  |
| 150 | Nautilus | -0.33 | 0.00 | 0.33 |  |
| 151 | Renekton | -0.33 | 0.00 | 0.33 |  |
| 152 | Sejuani | -0.33 | 0.00 | 0.33 |  |
| 153 | Sett | -0.33 | 0.00 | 0.33 |  |
| 154 | Volibear | -0.33 | 0.00 | 0.33 |  |
| 155 | Olaf | -0.34 | 0.05 | 0.39 |  |
| 156 | Rell | -0.35 | 0.00 | 0.35 |  |
| 157 | Blitzcrank | -0.36 | 0.00 | 0.36 |  |
| 158 | Darius | -0.36 | 0.00 | 0.36 |  |
| 159 | Jarvan IV | -0.36 | 0.00 | 0.36 |  |
| 160 | Talon | -0.36 | 0.00 | 0.36 |  |
| 161 | Vi | -0.36 | 0.00 | 0.36 |  |
| 162 | Aatrox | -0.39 | 0.00 | 0.39 |  |
| 163 | Bel'Veth | -0.39 | 0.00 | 0.39 |  |
| 164 | Locke | -0.39 | 0.00 | 0.39 |  |
| 165 | Riven | -0.39 | 0.00 | 0.39 |  |
| 166 | Taric | -0.39 | 0.00 | 0.39 |  |
| 167 | Yorick | -0.39 | 0.00 | 0.39 |  |
| 168 | Briar | -0.40 | 0.00 | 0.40 |  |
| 169 | Trundle | -0.42 | 0.00 | 0.42 |  |
| 170 | K'Sante | -0.43 | 0.00 | 0.43 |  |
| 171 | Tryndamere | -0.43 | 0.00 | 0.43 |  |
| 172 | Wukong | -0.50 | 0.00 | 0.50 |  |
