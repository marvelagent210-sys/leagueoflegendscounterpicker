# Counters to Yorick (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Yorick: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Yorick wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Yorick --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Sivir | +0.53 | +0.82 | +1.00 | +1.00 | +0.05 | −0.82 | −0.96 |
| 2 | K'Sante | +0.30 | +1.00 | +1.00 | −1.00 | +0.09 | – | −0.81 |
| 3 | Zaahen | +0.18 | −1.00 | +1.00 | +1.00 | +0.04 | – | −0.82 |
| 4 | Vayne | −0.16 | −1.00 | +0.82 | −1.00 | +0.15 | +1.00 | −0.73 |
| 5 | Shyvana | −0.25 | +1.00 | −1.00 | −1.00 | +0.06 | – | −0.57 |
| 6 | Darius | −0.35 | −1.00 | +0.82 | −1.00 | −0.20 | – | −0.86 |
| 7 | Trundle | −0.36 | −1.00 | −0.90 | +1.00 | −0.10 | – | −0.68 |
| 8 | Dr. Mundo | −0.38 | −0.24 | −0.30 | −1.00 | +0.01 | – | −0.19 |
| 9 | Ambessa | −0.74 | −1.00 | −1.00 | −1.00 | +0.18 | – | +0.09 |
| 10 | Poppy | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.13 |
| 11 | Jarvan IV | −0.76 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.37 |
| 12 | Zeri | −0.76 | −1.00 | −0.73 | −1.00 | −0.04 | −1.00 | −0.49 |
| 13 | Tryndamere | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.08 |
| 14 | Swain | −0.78 | −1.00 | −0.78 | −1.00 | −0.00 | −1.00 | −0.58 |
| 15 | Sion | −0.78 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.06 |
| 16 | Zed | −0.78 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.25 |
| 17 | Aurelion Sol | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | −0.10 |
| 18 | Malphite | −0.78 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.20 |
| 19 | Kassadin | −0.78 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.13 |
| 20 | Corki | −0.78 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.12 |
| 21 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.11 |
| 22 | Lucian | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.06 |
| 23 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.03 |
| 24 | Tahm Kench | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | – | −0.45 |
| 25 | Gnar | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.12 |
| 26 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.08 |
| 27 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.21 |
| 28 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.09 |
| 29 | Rengar | −0.79 | −1.00 | −1.00 | −1.00 | +0.12 | – | −0.61 |
| 30 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.22 |
| 31 | Jax | −0.79 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.19 |
| 32 | Ornn | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | – | −0.46 |
| 33 | Pantheon | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.15 |
| 34 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.46 |
| 35 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.10 |
| 36 | Viego | −0.80 | −1.00 | −1.00 | −1.00 | +0.16 | – | −0.80 |
| 37 | Ezreal | −0.80 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.12 |
| 38 | Anivia | −0.80 | −1.00 | −0.95 | −1.00 | +0.02 | −1.00 | −0.26 |
| 39 | Lillia | −0.80 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.34 |
| 40 | Yasuo | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.03 |
| 41 | Wukong | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.02 |
| 42 | Vex | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.12 |
| 43 | Mordekaiser | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.66 |
| 44 | Diana | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.68 |
| 45 | Twisted Fate | −0.80 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.28 |
| 46 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.36 |
| 47 | Renekton | −0.81 | −1.00 | −1.00 | −1.00 | +0.04 | – | −0.60 |
| 48 | Annie | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.27 |
| 49 | Elise | −0.81 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.30 |
| 50 | Singed | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.34 |
| 51 | Hwei | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.35 |
| 52 | Illaoi | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.83 |
| 53 | Jayce | −0.81 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.58 |
| 54 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.54 |
| 55 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.86 |
| 56 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | +0.09 | – | −0.88 |
| 57 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | −0.01 |
| 58 | Yone | −0.81 | −1.00 | −1.00 | −1.00 | +0.10 | – | −0.91 |
| 59 | Skarner | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | – | −0.33 |
| 60 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.84 |
| 61 | Gangplank | −0.81 | −1.00 | −1.00 | −1.00 | +0.07 | – | −0.88 |
| 62 | Lulu | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.33 |
| 63 | Udyr | −0.82 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.10 |
| 64 | Aphelios | −0.82 | −1.00 | −1.00 | −1.00 | +0.20 | −1.00 | −0.94 |
| 65 | Taric | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.46 |
| 66 | Fizz | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.69 |
| 67 | Karma | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.57 |
| 68 | Milio | −0.82 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.54 |
| 69 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.81 |
| 70 | Nasus | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.72 |
| 71 | Akali | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.79 |
| 72 | Galio | −0.82 | −1.00 | −1.00 | −1.00 | +0.05 | – | −0.88 |
| 73 | Karthus | −0.82 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.66 |
| 74 | Braum | −0.82 | −1.00 | −1.00 | −1.00 | −0.01 | – | −0.71 |
| 75 | Kalista | −0.82 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.74 |
| 76 | Nunu & Willump | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | – | −0.85 |
| 77 | Heimerdinger | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.80 |
| 78 | Qiyana | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.33 |
| 79 | Camille | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.44 |
| 80 | Naafiri | −0.82 | −1.00 | −1.00 | −1.00 | +0.02 | – | −0.81 |
| 81 | Riven | −0.82 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.59 |
| 82 | Warwick | −0.82 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.80 |
| 83 | Syndra | −0.82 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.67 |
| 84 | Sejuani | −0.82 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.53 |
| 85 | Fiddlesticks | −0.82 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.56 |
| 86 | Kog'Maw | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.86 |
| 87 | Yunara | −0.82 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | −0.86 |
| 88 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.00 | – | −0.80 |
| 89 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.74 |
| 90 | Taliyah | −0.82 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.57 |
| 91 | Maokai | −0.83 | −1.00 | −1.00 | −1.00 | −0.12 | – | −0.48 |
| 92 | Nocturne | −0.83 | −1.00 | −1.00 | −1.00 | −0.06 | – | −0.69 |
| 93 | Neeko | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.74 |
| 94 | Vel'Koz | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.81 |
| 95 | Ashe | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.87 |
| 96 | Gwen | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.80 |
| 97 | Kayle | −0.83 | −1.00 | −1.00 | −1.00 | +0.15 | −1.00 | −0.99 |
| 98 | Xin Zhao | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.69 |
| 99 | Rek'Sai | −0.83 | −1.00 | −1.00 | −1.00 | −0.34 | – | +0.12 |
| 100 | Mel | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.81 |
| 101 | Graves | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.94 |
| 102 | Gragas | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.69 |
| 103 | Xayah | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.93 |
| 104 | Blitzcrank | −0.83 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.67 |
| 105 | Varus | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.78 |
| 106 | Bel'Veth | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | – | −0.97 |
| 107 | Zilean | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.75 |
| 108 | Xerath | −0.83 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.75 |
| 109 | Cassiopeia | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −0.95 |
| 110 | Evelynn | −0.83 | −1.00 | −1.00 | −1.00 | +0.02 | – | −1.00 |
| 111 | Tristana | −0.83 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.79 |
| 112 | Malzahar | −0.83 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.65 |
| 113 | Sylas | −0.83 | −1.00 | −1.00 | −1.00 | −0.09 | – | −0.70 |
| 114 | Miss Fortune | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.94 |
| 115 | Kayn | −0.83 | −1.00 | −1.00 | −1.00 | −0.05 | – | −0.82 |
| 116 | Irelia | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.74 |
| 117 | Brand | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.86 |
| 118 | Senna | −0.83 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.92 |
| 119 | Jinx | −0.83 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | −0.98 |
| 120 | Urgot | −0.83 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.88 |
| 121 | Nilah | −0.83 | −1.00 | −1.00 | −1.00 | −0.08 | – | −0.76 |
| 122 | Garen | −0.83 | −1.00 | −1.00 | −1.00 | −0.03 | – | −0.92 |
| 123 | Locke | −0.83 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.81 |
| 124 | Olaf | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.90 |
| 125 | Volibear | −0.83 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.91 |
| 126 | Aatrox | −0.83 | −1.00 | −1.00 | −1.00 | −0.02 | – | −0.96 |
| 127 | Ryze | −0.83 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −0.98 |
| 128 | Lux | −0.83 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.95 |
| 129 | Caitlyn | −0.84 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | −1.00 |
| 130 | Renata Glasc | −0.84 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | −0.98 |
| 131 | Janna | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.96 |
| 132 | Shaco | −0.84 | −1.00 | −1.00 | −1.00 | −0.04 | – | −0.92 |
| 133 | Draven | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.95 |
| 134 | Morgana | −0.84 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | −0.93 |
| 135 | Kai'Sa | −0.84 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | −0.97 |
| 136 | Seraphine | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.93 |
| 137 | Sona | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.90 |
| 138 | Nami | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.87 |
| 139 | Fiora | −0.84 | −1.00 | −1.00 | −1.00 | −0.07 | – | −0.86 |
| 140 | Viktor | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.94 |
| 141 | Sett | −0.84 | −1.00 | −1.00 | −1.00 | −0.14 | – | −0.70 |
| 142 | Alistar | −0.84 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.58 |
| 143 | Bard | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.98 |
| 144 | Rell | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.86 |
| 145 | Akshan | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −0.98 |
| 146 | Kennen | −0.84 | −1.00 | −1.00 | −1.00 | −0.30 | −1.00 | +0.10 |
| 147 | Ivern | −0.84 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | −1.00 |
| 148 | Thresh | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.95 |
| 149 | Smolder | −0.84 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | −0.98 |
| 150 | Samira | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −0.96 |
| 151 | Zoe | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.81 |
| 152 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −0.95 |
| 153 | Veigar | −0.84 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −0.93 |
| 154 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.80 |
| 155 | Nidalee | −0.84 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | −1.00 |
| 156 | Zyra | −0.85 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | −0.95 |
| 157 | Nautilus | −0.85 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | −0.83 |
| 158 | Orianna | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.87 |
| 159 | Jhin | −0.85 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | −0.88 |
| 160 | Briar | −0.85 | −1.00 | −1.00 | −1.00 | −0.11 | – | −0.98 |
| 161 | Teemo | −0.85 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | −0.98 |
| 162 | Vi | −0.85 | −1.00 | −1.00 | −1.00 | −0.18 | – | −0.82 |
| 163 | Kindred | −0.86 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.77 |
| 164 | LeBlanc | −0.86 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | −0.98 |
| 165 | Pyke | −0.86 | −1.00 | −1.00 | −1.00 | −0.19 | – | −0.98 |
| 166 | Lissandra | −0.86 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | −0.76 |
| 167 | Talon | −0.86 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.88 |
| 168 | Katarina | −0.86 | −1.00 | −1.00 | −1.00 | −0.22 | – | −0.89 |
| 169 | Quinn | −0.86 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | −0.91 |
| 170 | Ekko | −0.87 | −1.00 | −1.00 | −1.00 | −0.21 | – | −0.99 |
| 171 | Zac | −0.87 | −1.00 | −1.00 | −1.00 | −0.26 | – | −0.85 |
| 172 | Soraka | −0.88 | −1.00 | −1.00 | −1.00 | −0.24 | −1.00 | −0.85 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Yorick's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Yorick's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Yorick` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Teemo (net +1.27)

- **0.59** range: Teemo's basic attacks reach 325 units farther than Yorick's (500 vs 175 attack range). Yorick has no dash or blink to close the gap. (Teemo basic attacks → Yorick basic attacks)
- **0.50** blind: Blinding Dart's blind makes Yorick's basic attacks miss for 3 s. Blind for 3 s on a 7 s cooldown. (Teemo Q Blinding Dart → Yorick basic attacks)
- **0.36** blind: Blinding Dart's blind makes Yorick's Last Rites, an empowered attack, miss. Blind for 3 s. (Teemo Q Blinding Dart → Yorick Q Last Rites)

#### 2. Xayah (net +1.12)

- **0.67** range: Xayah's basic attacks reach 350 units farther than Yorick's (525 vs 175 attack range). Yorick has no dash or blink to close the gap. (Xayah basic attacks → Yorick basic attacks)
- **0.33** untargetable: Featherstorm makes Xayah untargetable, dodging Yorick's Dark Procession. Untargetable for 1.5 s, long enough to use ahead of Dark Procession. (Xayah R Featherstorm → Yorick W Dark Procession)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Yorick's Last Rites. Untargetable for 1.5 s, long enough to use ahead of Last Rites. (Xayah R Featherstorm → Yorick Q Last Rites)

#### 3. Bard (net +1.08)

- **0.62** range: Bard's basic attacks reach 325 units farther than Yorick's (500 vs 175 attack range). Yorick has no dash or blink to close the gap. (Bard basic attacks → Yorick basic attacks)
- **0.34** untargetable: Tempered Fate makes Bard untargetable, dodging Yorick's Dark Procession. Untargetable for 2.5 s, long enough to use ahead of Dark Procession. (Bard R Tempered Fate → Yorick W Dark Procession)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Yorick's Last Rites. Untargetable for 2.5 s, long enough to use ahead of Last Rites. (Bard R Tempered Fate → Yorick Q Last Rites)

#### 4. Lulu (net +1.04)

- **0.68** range: Lulu's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Lulu basic attacks → Yorick basic attacks)
- **0.36** disarm: Whimsy disarms Yorick for 2 s: no basic attacks. Disarm for 2 s on a 18 s cooldown. (Lulu W Whimsy → Yorick basic attacks)

#### 5. Vladimir (net +0.98)

- **0.60** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yorick's Dark Procession. Untargetable for 2 s, long enough to use ahead of Dark Procession. (Vladimir W Sanguine Pool → Yorick W Dark Procession)
- **0.30** range: Vladimir's basic attacks reach 275 units farther than Yorick's (450 vs 175 attack range). Yorick has no dash or blink to close the gap. (Vladimir basic attacks → Yorick basic attacks)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Yorick's Last Rites. Untargetable for 2 s, long enough to use ahead of Last Rites. (Vladimir W Sanguine Pool → Yorick Q Last Rites)
- Watch out: Dark Procession's airborne interrupts Vladimir's Tides of Blood (charge-up).

#### 6. Morgana (net +0.97)

- **0.60** cc immunity: Black Shield makes Morgana immune to Yorick's Dark Procession (airborne). Immune for 5 s, long enough to use ahead of Dark Procession. (Morgana E Black Shield → Yorick W Dark Procession)
- **0.33** range: Morgana's basic attacks reach 275 units farther than Yorick's (450 vs 175 attack range). Yorick has no dash or blink to close the gap. (Morgana basic attacks → Yorick basic attacks)
- **0.08** cc immunity: Black Shield makes Morgana immune to Yorick's Mourning Mist (slow). Immune for 5 s, long enough to use ahead of Mourning Mist. (Morgana E Black Shield → Yorick E Mourning Mist)

#### 7. Kayle (net +0.96)

- **0.72** range: Kayle's basic attacks reach 450 units farther than Yorick's (625 vs 175 attack range). Yorick has no dash or blink to close the gap. (Kayle basic attacks → Yorick basic attacks)
- **0.24** invulnerable: Divine Judgment makes Kayle invulnerable to Yorick's Last Rites. Invulnerable for 2.5 s, long enough to use ahead of Last Rites. (Kayle R Divine Judgment → Yorick Q Last Rites)

#### 8. Lissandra (net +0.87)

- **0.41** range: Lissandra's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Lissandra basic attacks → Yorick basic attacks)
- **0.34** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yorick's Dark Procession. Untargetable for 2.5 s, long enough to use ahead of Dark Procession. (Lissandra R Frozen Tomb → Yorick W Dark Procession)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Yorick's Last Rites. Untargetable for 2.5 s, long enough to use ahead of Last Rites. (Lissandra R Frozen Tomb → Yorick Q Last Rites)

#### 9. Aurora (net +0.85)

- **0.54** range: Aurora's basic attacks reach 375 units farther than Yorick's (550 vs 175 attack range). Yorick has no dash or blink to close the gap. (Aurora basic attacks → Yorick basic attacks)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Yorick's Dark Procession. Untargetable for 0.4 s; Dark Procession lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Yorick W Dark Procession)
- **0.14** cc immunity: Between Worlds is displacement immune, ignoring Yorick's Dark Procession (airborne) during it. Only during Between Worlds (0.4 s). (Aurora R Between Worlds → Yorick W Dark Procession)

#### 10. Kalista (net +0.85)

- **0.57** range: Kalista's basic attacks reach 350 units farther than Yorick's (525 vs 175 attack range). Yorick has no dash or blink to close the gap. (Kalista basic attacks → Yorick basic attacks)
- **0.26** cleanse: Fate's Call cleanses Yorick's Dark Procession (airborne) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Yorick W Dark Procession)
- **0.04** cleanse: Fate's Call cleanses Yorick's Mourning Mist (slow) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Yorick E Mourning Mist)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Teemo | +1.27 | 1.27 | 0.00 | range (attacks), blind (Blinding Dart) |
| 2 | Xayah | +1.12 | 1.12 | 0.00 | range (attacks) |
| 3 | Bard | +1.08 | 1.08 | 0.00 | range (attacks) |
| 4 | Lulu | +1.04 | 1.04 | 0.00 | range (attacks) |
| 5 | Vladimir | +0.98 | 1.05 | 0.07 |  |
| 6 | Morgana | +0.97 | 0.97 | 0.00 |  |
| 7 | Kayle | +0.96 | 0.96 | 0.00 | range (attacks) |
| 8 | Lissandra | +0.87 | 0.87 | 0.00 |  |
| 9 | Aurora | +0.85 | 0.85 | 0.00 | range (attacks) |
| 10 | Kalista | +0.85 | 0.85 | 0.00 | range (attacks) |
| 11 | Zeri | +0.83 | 0.83 | 0.00 | range (attacks) |
| 12 | Kindred | +0.81 | 0.81 | 0.00 | range (attacks) |
| 13 | Samira | +0.81 | 0.81 | 0.00 | range (attacks) |
| 14 | Sivir | +0.81 | 0.81 | 0.00 | range (attacks) |
| 15 | Twitch | +0.81 | 0.81 | 0.00 | range (attacks) |
| 16 | Vayne | +0.81 | 0.81 | 0.00 | range (attacks) |
| 17 | Aphelios | +0.77 | 0.77 | 0.00 | range (attacks) |
| 18 | Sona | +0.77 | 0.77 | 0.00 | range (attacks) |
| 19 | Mel | +0.76 | 0.76 | 0.00 | range (attacks) |
| 20 | Udyr | +0.76 | 0.76 | 0.00 |  |
| 21 | Yuumi | +0.73 | 1.13 | 0.40 | range (attacks) |
| 22 | Milio | +0.73 | 0.73 | 0.00 | range (attacks) |
| 23 | Ashe | +0.72 | 0.72 | 0.00 | range (attacks) |
| 24 | Renata Glasc | +0.72 | 0.72 | 0.00 | range (attacks) |
| 25 | Tristana | +0.72 | 0.72 | 0.00 | range (attacks) |
| 26 | Yunara | +0.72 | 0.72 | 0.00 | range (attacks) |
| 27 | Draven | +0.68 | 0.68 | 0.00 | range (attacks) |
| 28 | Kai'Sa | +0.67 | 0.67 | 0.00 | range (attacks) |
| 29 | Senna | +0.65 | 0.65 | 0.00 | range (attacks) |
| 30 | Varus | +0.64 | 0.75 | 0.11 | range (attacks) |
| 31 | Vex | +0.64 | 0.64 | 0.00 | range (attacks) |
| 32 | Corki | +0.61 | 0.61 | 0.00 | range (attacks) |
| 33 | Elise | +0.61 | 0.61 | 0.00 | range (attacks) |
| 34 | Ezreal | +0.61 | 0.61 | 0.00 | range (attacks) |
| 35 | Smolder | +0.61 | 0.61 | 0.00 | range (attacks) |
| 36 | Zilean | +0.61 | 0.61 | 0.00 | range (attacks) |
| 37 | Zoe | +0.61 | 0.61 | 0.00 | range (attacks) |
| 38 | Jax | +0.60 | 0.60 | 0.00 | attack dodge (Counter Strike) |
| 39 | Rengar | +0.60 | 0.60 | 0.00 |  |
| 40 | Fiora | +0.57 | 0.57 | 0.00 |  |
| 41 | Gnar | +0.57 | 0.57 | 0.00 | range (attacks) |
| 42 | Viktor | +0.57 | 0.57 | 0.00 | range (attacks) |
| 43 | Gangplank | +0.55 | 0.55 | 0.00 |  |
| 44 | Fizz | +0.54 | 0.54 | 0.00 |  |
| 45 | Kennen | +0.54 | 0.54 | 0.00 | range (attacks) |
| 46 | Lux | +0.54 | 0.54 | 0.00 | range (attacks) |
| 47 | Jayce | +0.53 | 0.53 | 0.00 | range (attacks) |
| 48 | Maokai | +0.53 | 0.53 | 0.00 |  |
| 49 | Nidalee | +0.53 | 0.53 | 0.00 | range (attacks) |
| 50 | Jinx | +0.51 | 0.51 | 0.00 | range (attacks) |
| 51 | Seraphine | +0.51 | 0.51 | 0.00 | range (attacks) |
| 52 | Rek'Sai | +0.50 | 0.50 | 0.00 |  |
| 53 | Soraka | +0.50 | 0.50 | 0.00 | range (attacks) |
| 54 | Ziggs | +0.50 | 0.50 | 0.00 | range (attacks) |
| 55 | Quinn | +0.49 | 0.67 | 0.18 | range (attacks) |
| 56 | Nilah | +0.49 | 0.49 | 0.00 |  |
| 57 | Anivia | +0.48 | 0.48 | 0.00 |  |
| 58 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 59 | Azir | +0.47 | 0.47 | 0.00 |  |
| 60 | Kog'Maw | +0.47 | 0.47 | 0.00 |  |
| 61 | Orianna | +0.47 | 0.47 | 0.00 |  |
| 62 | Braum | +0.45 | 0.45 | 0.00 | projectile block (Unbreakable) |
| 63 | Veigar | +0.45 | 0.45 | 0.00 |  |
| 64 | Caitlyn | +0.44 | 0.72 | 0.28 | range (attacks) |
| 65 | Annie | +0.44 | 0.44 | 0.00 |  |
| 66 | Gwen | +0.43 | 0.43 | 0.00 |  |
| 67 | Hwei | +0.43 | 0.43 | 0.00 |  |
| 68 | Heimerdinger | +0.42 | 0.42 | 0.00 |  |
| 69 | Ahri | +0.41 | 0.41 | 0.00 |  |
| 70 | Brand | +0.41 | 0.41 | 0.00 |  |
| 71 | Cassiopeia | +0.41 | 0.41 | 0.00 |  |
| 72 | Graves | +0.41 | 0.41 | 0.00 |  |
| 73 | Nami | +0.41 | 0.41 | 0.00 |  |
| 74 | Neeko | +0.41 | 0.41 | 0.00 |  |
| 75 | Syndra | +0.41 | 0.41 | 0.00 |  |
| 76 | Twisted Fate | +0.40 | 0.75 | 0.35 | range (attacks) |
| 77 | Malphite | +0.39 | 0.39 | 0.00 |  |
| 78 | Nasus | +0.39 | 0.39 | 0.00 |  |
| 79 | Karma | +0.38 | 0.38 | 0.00 |  |
| 80 | Kled | +0.38 | 0.38 | 0.00 |  |
| 81 | LeBlanc | +0.38 | 0.38 | 0.00 |  |
| 82 | Olaf | +0.37 | 0.37 | 0.00 |  |
| 83 | Swain | +0.36 | 0.36 | 0.00 |  |
| 84 | Malzahar | +0.34 | 0.74 | 0.40 |  |
| 85 | Lucian | +0.34 | 0.62 | 0.28 | range (attacks) |
| 86 | Miss Fortune | +0.33 | 0.61 | 0.28 | range (attacks) |
| 87 | Aurelion Sol | +0.33 | 0.41 | 0.08 |  |
| 88 | Singed | +0.33 | 0.33 | 0.00 |  |
| 89 | Thresh | +0.33 | 0.33 | 0.00 |  |
| 90 | Akshan | +0.31 | 0.59 | 0.28 | range (attacks) |
| 91 | Camille | +0.31 | 0.31 | 0.00 |  |
| 92 | Yasuo | +0.31 | 0.31 | 0.00 |  |
| 93 | Master Yi | +0.30 | 0.50 | 0.20 |  |
| 94 | Alistar | +0.29 | 0.29 | 0.00 |  |
| 95 | Janna | +0.28 | 0.68 | 0.40 | range (attacks) |
| 96 | Evelynn | +0.28 | 0.28 | 0.00 |  |
| 97 | K'Sante | +0.28 | 0.28 | 0.00 |  |
| 98 | Shaco | +0.28 | 0.28 | 0.00 |  |
| 99 | Sion | +0.27 | 0.39 | 0.12 |  |
| 100 | Zed | +0.27 | 0.27 | 0.00 |  |
| 101 | Zaahen | +0.24 | 0.24 | 0.00 |  |
| 102 | Urgot | +0.23 | 0.23 | 0.00 |  |
| 103 | Xin Zhao | +0.23 | 0.23 | 0.00 |  |
| 104 | Jhin | +0.22 | 0.50 | 0.28 | range (attacks) |
| 105 | Vel'Koz | +0.19 | 0.47 | 0.28 |  |
| 106 | Ivern | +0.19 | 0.33 | 0.14 |  |
| 107 | Rakan | +0.18 | 0.18 | 0.00 |  |
| 108 | Lillia | +0.16 | 0.16 | 0.00 |  |
| 109 | Xerath | +0.15 | 0.47 | 0.32 |  |
| 110 | Hecarim | +0.15 | 0.15 | 0.00 |  |
| 111 | Rammus | +0.14 | 0.38 | 0.24 |  |
| 112 | Illaoi | +0.14 | 0.14 | 0.00 |  |
| 113 | Jarvan IV | +0.14 | 0.14 | 0.00 |  |
| 114 | Nocturne | +0.14 | 0.14 | 0.00 |  |
| 115 | Ornn | +0.14 | 0.14 | 0.00 |  |
| 116 | Sett | +0.14 | 0.14 | 0.00 |  |
| 117 | Shyvana | +0.14 | 0.14 | 0.00 |  |
| 118 | Volibear | +0.14 | 0.14 | 0.00 |  |
| 119 | Yone | +0.14 | 0.14 | 0.00 |  |
| 120 | Garen | +0.12 | 0.12 | 0.00 |  |
| 121 | Shen | +0.11 | 0.56 | 0.45 |  |
| 122 | Ryze | +0.10 | 0.45 | 0.35 |  |
| 123 | Mordekaiser | +0.09 | 0.09 | 0.00 |  |
| 124 | Skarner | +0.06 | 0.06 | 0.00 |  |
| 125 | Karthus | +0.05 | 0.33 | 0.28 |  |
| 126 | Aatrox | 0.00 | 0.00 | 0.00 |  |
| 127 | Akali | 0.00 | 0.00 | 0.00 |  |
| 128 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 129 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 130 | Bel'Veth | 0.00 | 0.00 | 0.00 |  |
| 131 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 132 | Briar | 0.00 | 0.00 | 0.00 |  |
| 133 | Cho'Gath | 0.00 | 0.00 | 0.00 |  |
| 134 | Darius | 0.00 | 0.00 | 0.00 |  |
| 135 | Diana | 0.00 | 0.00 | 0.00 |  |
| 136 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 137 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 138 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 139 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 140 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 141 | Lee Sin | 0.00 | 0.00 | 0.00 |  |
| 142 | Leona | 0.00 | 0.00 | 0.00 |  |
| 143 | Locke | 0.00 | 0.00 | 0.00 |  |
| 144 | Wukong | 0.00 | 0.00 | 0.00 |  |
| 145 | Nautilus | 0.00 | 0.00 | 0.00 |  |
| 146 | Qiyana | 0.00 | 0.00 | 0.00 |  |
| 147 | Rell | 0.00 | 0.00 | 0.00 |  |
| 148 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 149 | Riven | 0.00 | 0.00 | 0.00 |  |
| 150 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 151 | Sejuani | 0.00 | 0.00 | 0.00 |  |
| 152 | Sylas | 0.00 | 0.00 | 0.00 |  |
| 153 | Talon | 0.00 | 0.00 | 0.00 |  |
| 154 | Taric | 0.00 | 0.00 | 0.00 |  |
| 155 | Trundle | 0.00 | 0.00 | 0.00 |  |
| 156 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 157 | Taliyah | -0.01 | 0.47 | 0.48 |  |
| 158 | Katarina | -0.06 | 0.22 | 0.28 |  |
| 159 | Viego | -0.06 | 0.14 | 0.20 |  |
| 160 | Fiddlesticks | -0.10 | 0.34 | 0.44 |  |
| 161 | Pyke | -0.14 | 0.00 | 0.14 |  |
| 162 | Gragas | -0.15 | 0.00 | 0.15 |  |
| 163 | Kayn | -0.17 | 0.28 | 0.45 |  |
| 164 | Poppy | -0.20 | 0.00 | 0.20 |  |
| 165 | Pantheon | -0.21 | 0.29 | 0.50 |  |
| 166 | Vi | -0.21 | 0.14 | 0.35 |  |
| 167 | Warwick | -0.26 | 0.38 | 0.64 |  |
| 168 | Nunu & Willump | -0.36 | 0.13 | 0.49 |  |
| 169 | Zac | -0.43 | 0.00 | 0.43 |  |
| 170 | Naafiri | -0.45 | 0.00 | 0.45 |  |
| 171 | Tahm Kench | -0.50 | 0.00 | 0.50 |  |
| 172 | Galio | -0.59 | 0.00 | 0.59 |  |
