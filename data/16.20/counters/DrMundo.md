# Counters to Dr. Mundo (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Dr. Mundo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Dr. Mundo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> DrMundo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Fiora | +0.83 | +1.00 | +1.00 | +1.00 | +0.33 | – | +0.00 |
| 2 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 3 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 4 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 5 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 6 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 7 | Gwen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 8 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 9 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 10 | Yorick | +0.37 | +0.30 | +0.24 | +1.00 | −0.01 | – | +0.00 |
| 11 | Ashe | +0.35 | +0.76 | +1.00 | −0.98 | +0.05 | +1.00 | +0.00 |
| 12 | Mordekaiser | +0.27 | −0.20 | +0.62 | +0.65 | +0.03 | – | +0.00 |
| 13 | Shyvana | +0.24 | −0.96 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 14 | Zac | +0.21 | +0.27 | +0.25 | +0.25 | +0.06 | – | +0.00 |
| 15 | Gnar | +0.13 | −0.14 | −0.10 | +0.87 | +0.05 | +0.02 | +0.00 |
| 16 | Zeri | +0.03 | +0.29 | −0.09 | −0.23 | −0.01 | +0.29 | +0.00 |
| 17 | Taric | +0.00 | −0.03 | −0.02 | −0.02 | +0.12 | – | +0.00 |
| 18 | Ivern | −0.06 | −0.11 | −0.09 | −0.07 | +0.03 | −0.02 | +0.00 |
| 19 | Maokai | −0.09 | −0.15 | −0.11 | −0.18 | +0.12 | – | +0.00 |
| 20 | Anivia | −0.19 | −0.20 | −0.28 | −0.16 | −0.05 | −0.25 | +0.00 |
| 21 | Tahm Kench | −0.23 | −0.28 | −0.28 | −0.31 | −0.01 | – | +0.00 |
| 22 | Lillia | −0.28 | −0.36 | −0.27 | −0.62 | +0.10 | −0.15 | +0.00 |
| 23 | Lee Sin | −0.29 | −0.14 | −0.10 | −1.00 | +0.01 | – | +0.00 |
| 24 | Karma | −0.36 | −0.60 | −0.39 | −0.46 | +0.07 | −0.32 | +0.00 |
| 25 | Aurora | −0.46 | −0.56 | −0.56 | −0.52 | +0.07 | −0.88 | +0.00 |
| 26 | Kled | −0.52 | −0.73 | −0.57 | −0.89 | +0.22 | – | +0.00 |
| 27 | Kalista | −0.58 | −0.74 | −0.84 | −0.96 | +0.10 | −0.09 | +0.00 |
| 28 | Olaf | −0.68 | −1.00 | −0.65 | −1.00 | −0.01 | – | +0.00 |
| 29 | Soraka | −0.69 | −0.88 | −0.69 | −1.00 | −0.01 | −1.00 | +0.00 |
| 30 | Sion | −0.74 | −1.00 | −0.91 | −1.00 | +0.07 | – | +0.00 |
| 31 | Malphite | −0.74 | −1.00 | −1.00 | −1.00 | +0.21 | – | +0.00 |
| 32 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 33 | Riven | −0.75 | −1.00 | −1.00 | −1.00 | +0.19 | – | +0.00 |
| 34 | Jayce | −0.75 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.00 |
| 35 | Diana | −0.75 | −1.00 | −1.00 | −1.00 | +0.17 | – | +0.00 |
| 36 | Sivir | −0.75 | −0.95 | −0.94 | −0.97 | +0.08 | −0.95 | +0.00 |
| 37 | Yone | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 38 | Yasuo | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 39 | Wukong | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 40 | Poppy | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 41 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.13 | – | +0.00 |
| 42 | Morgana | −0.76 | −0.98 | −0.90 | −1.00 | +0.09 | −0.99 | +0.00 |
| 43 | Singed | −0.76 | −0.99 | −0.91 | −0.99 | −0.04 | – | +0.00 |
| 44 | Viego | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 45 | Naafiri | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 46 | Kassadin | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 47 | Irelia | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 48 | Galio | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 49 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 50 | Akali | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 51 | Kayn | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 52 | Bel'Veth | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 53 | Master Yi | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 54 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 55 | Annie | −0.77 | −0.93 | −0.99 | −1.00 | +0.09 | −1.00 | +0.00 |
| 56 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 57 | Rumble | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 58 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 59 | Udyr | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 60 | Hecarim | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 61 | Evelynn | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 62 | Braum | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 63 | Nocturne | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 64 | Mel | −0.77 | −1.00 | −1.00 | −1.00 | +0.19 | −1.00 | +0.00 |
| 65 | Talon | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 66 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 67 | Pantheon | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 68 | Cho'Gath | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 69 | Trundle | −0.77 | −1.00 | −0.99 | −1.00 | +0.01 | – | +0.00 |
| 70 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 71 | Kayle | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 72 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 73 | Vi | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 74 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 75 | Milio | −0.78 | −1.00 | −1.00 | −1.00 | +0.16 | −1.00 | +0.00 |
| 76 | Hwei | −0.78 | −1.00 | −1.00 | −0.98 | +0.05 | −0.89 | +0.00 |
| 77 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 78 | Vel'Koz | −0.78 | −0.99 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 79 | Sejuani | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 80 | Illaoi | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 81 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 82 | Jarvan IV | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 83 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 84 | Graves | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 85 | Zilean | −0.78 | −1.00 | −1.00 | −0.98 | +0.03 | −0.88 | +0.00 |
| 86 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 87 | Lulu | −0.78 | −0.99 | −0.98 | −1.00 | +0.07 | −1.00 | +0.00 |
| 88 | Alistar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 89 | Fizz | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 90 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 91 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 92 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 93 | Ahri | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 94 | Rengar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 95 | Urgot | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 96 | Jinx | −0.78 | −1.00 | −0.99 | −1.00 | +0.10 | −1.00 | +0.00 |
| 97 | Nautilus | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 98 | Caitlyn | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 99 | Quinn | −0.78 | −0.98 | −0.98 | −1.00 | +0.04 | −1.00 | +0.00 |
| 100 | Xayah | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 101 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 102 | Ryze | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 103 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 104 | Samira | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 105 | Teemo | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 106 | Volibear | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 107 | Garen | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 108 | Neeko | −0.79 | −1.00 | −0.99 | −1.00 | +0.05 | −0.98 | +0.00 |
| 109 | Aphelios | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 110 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 111 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 112 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 113 | Katarina | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 114 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 115 | Kog'Maw | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 116 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 117 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 118 | Twisted Fate | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 119 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 120 | Miss Fortune | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 121 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −0.96 | +0.00 |
| 122 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 123 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 124 | Swain | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 125 | Nilah | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 126 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 127 | Fiddlesticks | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 128 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 129 | Yunara | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 130 | Draven | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 131 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 132 | Brand | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 133 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 134 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 135 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 136 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 137 | Jhin | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 138 | Rakan | −0.79 | −1.00 | −1.00 | −0.99 | +0.01 | −1.00 | +0.00 |
| 139 | Orianna | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 140 | Smolder | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 141 | Tryndamere | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 142 | Heimerdinger | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 143 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 144 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 145 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 146 | Kindred | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 147 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 148 | Gragas | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 149 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 150 | Aurelion Sol | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 151 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 152 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 153 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 154 | Corki | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 155 | Seraphine | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 156 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 157 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 158 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 159 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 160 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 161 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 162 | Sona | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 163 | Nidalee | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 164 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 165 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 166 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 167 | Varus | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 168 | Briar | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 169 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 170 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 171 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 172 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Dr. Mundo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Dr. Mundo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> DrMundo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +1.26)

- **0.68** range: Teemo's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Teemo basic attacks → Dr. Mundo basic attacks)
- **0.43** blind: Blinding Dart's blind makes Dr. Mundo's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Dr. Mundo basic attacks)
- **0.30** blind: Blinding Dart's blind makes Dr. Mundo's Blunt Force Trauma, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Dr. Mundo E Blunt Force Trauma)

#### 2. Lulu (net +1.02)

- **0.72** range: Lulu's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Lulu basic attacks → Dr. Mundo basic attacks)
- **0.30** disarm: Whimsy disarms Dr. Mundo for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Dr. Mundo basic attacks)

#### 3. Xayah (net +0.97)

- **0.77** range: Xayah's basic attacks reach 400 units farther than Dr. Mundo's (525 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Xayah basic attacks → Dr. Mundo basic attacks)
- **0.20** untargetable: Featherstorm makes Xayah untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for 1.5 s, long enough to use ahead of Blunt Force Trauma. (Xayah R Featherstorm → Dr. Mundo E Blunt Force Trauma)

#### 4. Kindred (net +0.94)

- **0.94** range: Kindred's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Kindred basic attacks → Dr. Mundo basic attacks)

#### 5. Sivir (net +0.94)

- **0.94** range: Sivir's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Sivir basic attacks → Dr. Mundo basic attacks)

#### 6. Bard (net +0.92)

- **0.72** range: Bard's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Bard basic attacks → Dr. Mundo basic attacks)
- **0.20** untargetable: Tempered Fate makes Bard untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for 2.5 s, long enough to use ahead of Blunt Force Trauma. (Bard R Tempered Fate → Dr. Mundo E Blunt Force Trauma)

#### 7. Kayle (net +0.92)

- **0.72** range: Kayle's basic attacks reach 500 units farther than Dr. Mundo's (625 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Kayle basic attacks → Dr. Mundo basic attacks)
- **0.20** invulnerable: Divine Judgment makes Kayle invulnerable to Dr. Mundo's Blunt Force Trauma. Invulnerable for 2.5 s, long enough to use ahead of Blunt Force Trauma. (Kayle R Divine Judgment → Dr. Mundo E Blunt Force Trauma)

#### 8. Yuumi (net +0.91)

- **0.64** range: Yuumi's basic attacks reach 300 units farther than Dr. Mundo's (425 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Yuumi basic attacks → Dr. Mundo basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Dr. Mundo's Blunt Force Trauma. Untargetable for ?; Blunt Force Trauma lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Dr. Mundo E Blunt Force Trauma)

#### 9. Samira (net +0.89)

- **0.61** range: Samira's basic attacks reach 375 units farther than Dr. Mundo's (500 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Samira basic attacks → Dr. Mundo basic attacks)
- **0.28** projectile block: Blade Whirl blocks Dr. Mundo's Infected Bonesaw, a projectile. Blade Whirl for 0.75 s; Infected Bonesaw takes 0.78 s to land, enough to react. (Samira W Blade Whirl → Dr. Mundo Q Infected Bonesaw)

#### 10. Zeri (net +0.88)

- **0.88** range: Zeri's basic attacks reach 425 units farther than Dr. Mundo's (550 vs 125 attack range). Dr. Mundo has no dash or blink to close the gap. (Zeri basic attacks → Dr. Mundo basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +1.26 | 1.26 | 0.00 | range (attacks), blind (Blinding Dart) |
| 2 | Lulu | +1.02 | 1.02 | 0.00 | range (attacks) |
| 3 | Xayah | +0.97 | 0.97 | 0.00 | range (attacks) |
| 4 | Kindred | +0.94 | 0.94 | 0.00 | range (attacks) |
| 5 | Sivir | +0.94 | 0.94 | 0.00 | range (attacks) |
| 6 | Bard | +0.92 | 0.92 | 0.00 | range (attacks) |
| 7 | Kayle | +0.92 | 0.92 | 0.00 | range (attacks) |
| 8 | Yuumi | +0.91 | 0.91 | 0.00 | range (attacks) |
| 9 | Samira | +0.89 | 0.89 | 0.00 | range (attacks) |
| 10 | Zeri | +0.88 | 0.88 | 0.00 | range (attacks) |
| 11 | Varus | +0.87 | 0.87 | 0.00 | range (attacks) |
| 12 | Twisted Fate | +0.86 | 0.86 | 0.00 | range (attacks) |
| 13 | Twitch | +0.86 | 0.86 | 0.00 | range (attacks) |
| 14 | Vayne | +0.86 | 0.86 | 0.00 | range (attacks) |
| 15 | Milio | +0.84 | 0.84 | 0.00 | range (attacks) |
| 16 | Aphelios | +0.83 | 0.83 | 0.00 | range (attacks) |
| 17 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 18 | Mel | +0.80 | 0.80 | 0.00 | range (attacks) |
| 19 | Kai'Sa | +0.77 | 0.77 | 0.00 | range (attacks) |
| 20 | Quinn | +0.77 | 0.77 | 0.00 | range (attacks) |
| 21 | Renata Glasc | +0.77 | 0.77 | 0.00 | range (attacks) |
| 22 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 23 | Caitlyn | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Draven | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Janna | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Lucian | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 28 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 29 | Aurora | +0.70 | 0.70 | 0.00 | range (attacks) |
| 30 | Kalista | +0.70 | 0.70 | 0.00 | range (attacks) |
| 31 | Akshan | +0.68 | 0.68 | 0.00 | range (attacks) |
| 32 | Nilah | +0.68 | 0.68 | 0.00 |  |
| 33 | Gnar | +0.66 | 0.66 | 0.00 | range (attacks) |
| 34 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 35 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 36 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 37 | Miss Fortune | +0.65 | 0.65 | 0.00 | range (attacks) |
| 38 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 39 | Smolder | +0.65 | 0.65 | 0.00 | range (attacks) |
| 40 | Viktor | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Zilean | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Zoe | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Lissandra | +0.64 | 0.64 | 0.00 |  |
| 44 | Vladimir | +0.64 | 0.64 | 0.00 |  |
| 45 | Jayce | +0.61 | 0.61 | 0.00 | range (attacks) |
| 46 | Nidalee | +0.60 | 0.60 | 0.00 | range (attacks) |
| 47 | Jinx | +0.58 | 0.58 | 0.00 | range (attacks) |
| 48 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Lux | +0.58 | 0.58 | 0.00 | range (attacks) |
| 50 | Seraphine | +0.58 | 0.58 | 0.00 | range (attacks) |
| 51 | Kog'Maw | +0.54 | 0.54 | 0.00 | range (attacks) |
| 52 | Azir | +0.53 | 0.53 | 0.00 | range (attacks) |
| 53 | Jax | +0.53 | 0.53 | 0.00 |  |
| 54 | Jhin | +0.53 | 0.53 | 0.00 | range (attacks) |
| 55 | Orianna | +0.53 | 0.53 | 0.00 | range (attacks) |
| 56 | Soraka | +0.53 | 0.53 | 0.00 | range (attacks) |
| 57 | Taliyah | +0.53 | 0.53 | 0.00 | range (attacks) |
| 58 | Vel'Koz | +0.53 | 0.53 | 0.00 | range (attacks) |
| 59 | Vex | +0.53 | 0.53 | 0.00 | range (attacks) |
| 60 | Xerath | +0.53 | 0.53 | 0.00 | range (attacks) |
| 61 | Ziggs | +0.53 | 0.53 | 0.00 | range (attacks) |
| 62 | Shen | +0.51 | 0.51 | 0.00 |  |
| 63 | Singed | +0.51 | 0.51 | 0.00 |  |
| 64 | Graves | +0.49 | 0.49 | 0.00 |  |
| 65 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 66 | Malzahar | +0.48 | 0.48 | 0.00 |  |
| 67 | Ryze | +0.48 | 0.48 | 0.00 |  |
| 68 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 69 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 70 | Morgana | +0.47 | 0.47 | 0.00 |  |
| 71 | Heimerdinger | +0.46 | 0.46 | 0.00 |  |
| 72 | Hwei | +0.46 | 0.46 | 0.00 |  |
| 73 | Ahri | +0.44 | 0.44 | 0.00 |  |
| 74 | Annie | +0.44 | 0.44 | 0.00 |  |
| 75 | Aurelion Sol | +0.44 | 0.44 | 0.00 |  |
| 76 | Brand | +0.44 | 0.44 | 0.00 |  |
| 77 | Cassiopeia | +0.44 | 0.44 | 0.00 |  |
| 78 | Karma | +0.44 | 0.44 | 0.00 |  |
| 79 | LeBlanc | +0.44 | 0.44 | 0.00 |  |
| 80 | Nami | +0.44 | 0.44 | 0.00 |  |
| 81 | Neeko | +0.44 | 0.44 | 0.00 |  |
| 82 | Syndra | +0.44 | 0.44 | 0.00 |  |
| 83 | Swain | +0.42 | 0.42 | 0.00 |  |
| 84 | Braum | +0.39 | 0.39 | 0.00 |  |
| 85 | Fiddlesticks | +0.39 | 0.39 | 0.00 |  |
| 86 | Karthus | +0.39 | 0.39 | 0.00 |  |
| 87 | Thresh | +0.39 | 0.39 | 0.00 |  |
| 88 | Ivern | +0.38 | 0.38 | 0.00 |  |
| 89 | Katarina | +0.34 | 0.34 | 0.00 |  |
| 90 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 91 | Kled | +0.32 | 0.32 | 0.00 |  |
| 92 | Rammus | +0.32 | 0.32 | 0.00 |  |
| 93 | Urgot | +0.30 | 0.30 | 0.00 |  |
| 94 | Yasuo | +0.30 | 0.30 | 0.00 |  |
| 95 | Pantheon | +0.27 | 0.27 | 0.00 |  |
| 96 | Master Yi | +0.25 | 0.25 | 0.00 |  |
| 97 | Rakan | +0.25 | 0.25 | 0.00 |  |
| 98 | Fizz | +0.23 | 0.23 | 0.00 |  |
| 99 | Lillia | +0.22 | 0.22 | 0.00 |  |
| 100 | Fiora | +0.21 | 0.21 | 0.00 |  |
| 101 | Malphite | +0.21 | 0.21 | 0.00 |  |
| 102 | Maokai | +0.21 | 0.21 | 0.00 |  |
| 103 | Rek'Sai | +0.20 | 0.20 | 0.00 |  |
| 104 | Xin Zhao | +0.20 | 0.20 | 0.00 |  |
| 105 | Viego | +0.19 | 0.19 | 0.00 |  |
| 106 | Gwen | +0.16 | 0.16 | 0.00 |  |
| 107 | Nunu & Willump | +0.14 | 0.14 | 0.00 |  |
| 108 | Camille | +0.12 | 0.12 | 0.00 |  |
| 109 | Evelynn | +0.12 | 0.12 | 0.00 |  |
| 110 | Garen | +0.12 | 0.12 | 0.00 |  |
| 111 | Kayn | +0.12 | 0.12 | 0.00 |  |
| 112 | Shaco | +0.12 | 0.12 | 0.00 |  |
| 113 | Zed | +0.12 | 0.12 | 0.00 |  |
| 114 | Udyr | +0.11 | 0.11 | 0.00 |  |
| 115 | Irelia | +0.10 | 0.10 | 0.00 |  |
| 116 | Mordekaiser | +0.08 | 0.08 | 0.00 |  |
| 117 | Rengar | +0.07 | 0.07 | 0.00 |  |
| 118 | Skarner | +0.07 | 0.07 | 0.00 |  |
| 119 | Gangplank | +0.06 | 0.06 | 0.00 |  |
| 120 | Olaf | +0.06 | 0.06 | 0.00 |  |
| 121 | Sion | +0.06 | 0.06 | 0.00 |  |
| 122 | Warwick | +0.06 | 0.06 | 0.00 |  |
| 123 | Zaahen | +0.06 | 0.06 | 0.00 |  |
| 124 | Alistar | +0.05 | 0.05 | 0.00 |  |
| 125 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 126 | Akali | 0.00 | 0.00 | 0.00 |  |
| 127 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 128 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 129 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 130 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 131 | Briar | 0.00 | 0.00 | 0.00 |  |
| 132 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 133 | Darius | 0.00 | 0.00 | 0.00 |  |
| 134 | Diana | 0.00 | 0.00 | 0.00 |  |
| 135 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 136 | Galio | 0.00 | 0.00 | 0.00 |  |
| 137 | Gragas | 0.00 | 0.00 | 0.00 |  |
| 138 | Hecarim | 0.00 | 0.00 | 0.00 |  |
| 139 | Illaoi | 0.00 | 0.00 | 0.00 |  |
| 140 | Jarvan IV | 0.00 | 0.00 | 0.00 |  |
| 141 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 142 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 143 | K'Sante | 0.00 | 0.00 | 0.00 |  |
| 144 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 145 | Leona | 0.00 | 0.00 | 0.00 |  |
| 146 | Locke | 0.00 | 0.00 | 0.00 |  |
| 147 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 148 | Naafiri | 0.00 | 0.00 | 0.00 |  |
| 149 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 150 | Nocturne | 0.00 | 0.00 | 0.00 |  |
| 151 | Ornn | 0.00 | 0.00 | 0.00 |  |
| 152 | Poppy | 0.00 | 0.00 | 0.00 |  |
| 153 | Pyke | 0.00 | 0.00 | 0.00 |  |
| 154 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 155 | Rell | 0.00 | 0.00 | 0.00 |  |
| 156 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 157 | Riven | 0.00 | 0.00 | 0.00 |  |
| 158 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 159 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 160 | Sett | 0.00 | 0.00 | 0.00 |  |
| 161 | Shyvana | 0.00 | 0.00 | 0.00 |  |
| 162 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 163 | Tahm Kench | 0.00 | 0.00 | 0.00 |  |
| 164 | Talon | 0.00 | 0.00 | 0.00 |  |
| 165 | Taric | 0.00 | 0.00 | 0.00 |  |
| 166 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 167 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 168 | Vi | 0.00 | 0.00 | 0.00 |  |
| 169 | Volibear | 0.00 | 0.00 | 0.00 |  |
| 170 | Yone | 0.00 | 0.00 | 0.00 |  |
| 171 | Yorick | 0.00 | 0.00 | 0.00 |  |
| 172 | Zac | 0.00 | 0.00 | 0.00 |  |
