# Counters to Fizz (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Fizz: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Fizz wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Fizz --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | K'Sante | +0.86 | +1.00 | +1.00 | +1.00 | +0.16 | – | +1.00 |
| 2 | Kog'Maw | +0.85 | +1.00 | +1.00 | +1.00 | +0.30 | +1.00 | +0.00 |
| 3 | Trundle | +0.84 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +1.00 |
| 4 | Udyr | +0.84 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +1.00 |
| 5 | Gnar | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 6 | Corki | +0.83 | +1.00 | +1.00 | +1.00 | +0.24 | +0.98 | +0.00 |
| 7 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 8 | Yunara | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 9 | Shyvana | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 10 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 11 | Twisted Fate | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 12 | Ambessa | +0.81 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 13 | Karma | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 14 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 15 | Tahm Kench | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 16 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.19 | – | +0.00 |
| 17 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 18 | Aphelios | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 19 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.15 | – | +1.00 |
| 20 | Poppy | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 21 | Garen | +0.81 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 22 | Samira | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 23 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 24 | Aatrox | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 25 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 26 | Orianna | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 27 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 28 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | +0.13 | – | +0.00 |
| 29 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 30 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 31 | Rakan | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 32 | Zaahen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 33 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 34 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 35 | Jax | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 36 | Gangplank | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 37 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 38 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 39 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 40 | Maokai | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 41 | Jayce | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 42 | Viego | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 43 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 44 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 45 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 46 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 47 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 48 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 49 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 50 | Zac | +0.78 | +0.99 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 51 | Kled | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 52 | Camille | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 53 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 54 | Lee Sin | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 55 | Taric | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 56 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 57 | Tryndamere | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 58 | Braum | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 59 | Wukong | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 60 | Darius | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 61 | Rek'Sai | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 62 | Volibear | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 63 | Nocturne | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 64 | Ornn | +0.76 | +1.00 | +0.94 | +0.87 | +0.17 | – | +0.00 |
| 65 | Alistar | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 66 | Sion | +0.71 | +0.77 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 67 | Morgana | +0.71 | +0.87 | +0.91 | +0.61 | +0.28 | +1.00 | +0.00 |
| 68 | Xayah | +0.62 | +1.00 | +1.00 | +0.00 | +0.15 | +1.00 | +0.00 |
| 69 | Aurora | +0.62 | +1.00 | +1.00 | +1.00 | +0.12 | −1.00 | +0.00 |
| 70 | Elise | +0.62 | +1.00 | +1.00 | +1.00 | +0.11 | −1.00 | +0.00 |
| 71 | Milio | +0.57 | +1.00 | +0.73 | +0.00 | +0.23 | +1.00 | +0.00 |
| 72 | Kennen | +0.56 | +1.00 | +1.00 | +0.78 | +0.05 | −1.00 | +0.00 |
| 73 | Heimerdinger | +0.51 | −0.11 | +0.96 | +0.98 | +0.08 | +0.95 | +0.00 |
| 74 | Sejuani | +0.49 | +1.00 | +0.00 | +1.00 | −0.05 | – | +0.00 |
| 75 | Vi | +0.49 | +1.00 | +0.00 | +1.00 | −0.07 | – | +0.00 |
| 76 | Rammus | +0.33 | +1.00 | +1.00 | −1.00 | +0.00 | – | +0.00 |
| 77 | Kalista | +0.32 | +0.00 | +0.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 78 | Quinn | +0.30 | +1.00 | −1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 79 | Rengar | +0.29 | −1.00 | +1.00 | +1.00 | +0.39 | – | +0.00 |
| 80 | Malphite | +0.23 | −1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 81 | Galio | +0.20 | +1.00 | +0.50 | −1.00 | +0.05 | – | +0.00 |
| 82 | Teemo | +0.19 | −1.00 | +1.00 | +1.00 | −0.05 | +0.00 | +0.00 |
| 83 | Rumble | +0.18 | +0.95 | −1.00 | +0.91 | −0.02 | – | +0.00 |
| 84 | Brand | +0.10 | +0.76 | +0.78 | −1.00 | +0.10 | −1.00 | +0.00 |
| 85 | Zilean | +0.09 | +1.00 | +0.50 | −1.00 | +0.08 | −1.00 | +0.00 |
| 86 | Anivia | +0.09 | +0.05 | +0.13 | +0.21 | −0.10 | +0.16 | +0.00 |
| 87 | Singed | +0.01 | −0.00 | −0.02 | +0.12 | −0.05 | – | +0.00 |
| 88 | Master Yi | −0.13 | −1.00 | −1.00 | +1.00 | +0.10 | +1.00 | +1.00 |
| 89 | Gragas | −0.14 | +1.00 | −0.71 | −1.00 | +0.01 | – | +0.00 |
| 90 | Zeri | −0.15 | −1.00 | +0.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 91 | Kayn | −0.17 | +0.72 | −0.57 | −1.00 | +0.07 | – | +0.00 |
| 92 | Ashe | −0.17 | −1.00 | −1.00 | +1.00 | +0.21 | +0.98 | +0.00 |
| 93 | Neeko | −0.18 | −1.00 | −1.00 | +1.00 | +0.19 | +0.94 | +0.00 |
| 94 | Smolder | −0.19 | +1.00 | −1.00 | −0.50 | +0.07 | −1.00 | +0.00 |
| 95 | Sylas | −0.19 | +0.00 | +0.00 | −1.00 | +0.17 | – | +0.00 |
| 96 | Vel'Koz | −0.22 | +0.91 | −0.65 | −1.00 | +0.13 | −1.00 | +0.00 |
| 97 | Nautilus | −0.31 | −1.00 | −1.00 | +1.00 | +0.14 | – | +0.00 |
| 98 | Shen | −0.32 | −1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 99 | Hecarim | −0.32 | −1.00 | −1.00 | +1.00 | +0.06 | – | +0.00 |
| 100 | Shaco | −0.34 | −1.00 | −1.00 | +1.00 | −0.06 | – | +0.00 |
| 101 | Tristana | −0.35 | +0.00 | −1.00 | −1.00 | −0.02 | +1.00 | +0.00 |
| 102 | Jhin | −0.35 | −0.92 | −0.96 | +1.00 | +0.06 | −0.92 | +0.00 |
| 103 | Draven | −0.38 | −1.00 | −1.00 | +1.00 | +0.14 | −1.00 | +0.00 |
| 104 | Vex | −0.39 | −1.00 | −1.00 | +1.00 | +0.08 | −1.00 | +0.00 |
| 105 | Varus | −0.40 | −1.00 | −1.00 | +1.00 | +0.03 | −1.00 | +0.00 |
| 106 | Lillia | −0.41 | −1.00 | +0.53 | −1.00 | +0.03 | −1.00 | +0.00 |
| 107 | Kai'Sa | −0.45 | −1.00 | +0.00 | −1.00 | −0.02 | +0.00 | +0.00 |
| 108 | Lux | −0.45 | −1.00 | −0.20 | −0.31 | +0.07 | −1.00 | +0.00 |
| 109 | Annie | −0.53 | +0.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 110 | Lissandra | −0.54 | −1.00 | +0.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 111 | Nidalee | −0.60 | −1.00 | −0.19 | −1.00 | −0.02 | −1.00 | +0.00 |
| 112 | Irelia | −0.61 | −0.45 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 113 | Briar | −0.61 | −1.00 | −1.00 | −0.15 | −0.13 | – | +0.00 |
| 114 | Ezreal | −0.71 | −0.73 | −1.00 | −1.00 | +0.05 | −0.87 | +0.00 |
| 115 | Sivir | −0.73 | −1.00 | −1.00 | −1.00 | +0.13 | −0.50 | +0.00 |
| 116 | Nunu & Willump | −0.74 | −1.00 | −1.00 | −1.00 | +0.20 | – | +0.00 |
| 117 | Swain | −0.76 | −0.95 | −0.91 | −1.00 | −0.02 | −0.95 | +0.00 |
| 118 | Naafiri | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 119 | Seraphine | −0.77 | −1.00 | −1.00 | −1.00 | +0.18 | −1.00 | +0.00 |
| 120 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 121 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 122 | Amumu | −0.78 | −1.00 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 123 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 124 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 125 | Akali | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 126 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 127 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 128 | Ryze | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 129 | Locke | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 130 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 131 | Senna | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 132 | Yuumi | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 133 | Mel | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 134 | Kassadin | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 135 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 136 | Sona | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 137 | Cassiopeia | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 138 | Malzahar | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 139 | Janna | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 140 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 141 | Talon | −0.79 | −1.00 | −1.00 | −1.00 | −0.09 | – | +0.00 |
| 142 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 143 | Hwei | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 144 | Nami | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 145 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 146 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 147 | Thresh | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 148 | Twitch | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 149 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | −0.11 | – | +0.00 |
| 150 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 151 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 152 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 153 | Jarvan IV | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 154 | Zed | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 155 | Aurelion Sol | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 156 | Taliyah | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 157 | Viktor | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 158 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 159 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 160 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 161 | Veigar | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 162 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 163 | Pyke | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 164 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 165 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 166 | Zoe | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 167 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 168 | Syndra | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 169 | LeBlanc | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 170 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 171 | Karthus | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 172 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Fizz's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Fizz's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Fizz` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +0.95)

- **0.48** spell shield: Spell Shield's spell shield blocks Fizz's Urchin Strike. Spell shield for 1.5 s, long enough to use ahead of Urchin Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz Q Urchin Strike)
- **0.40** spell shield: Spell Shield's spell shield blocks part of Fizz's Chum the Waters. Spell shield for 1.5 s, long enough to use ahead of Chum the Waters. A spell shield blocks only the first enemy ability that reaches it. Chum the Waters will not attach the lure to an enemy champion if they have a spell shield as well as against an enemy Malzahar with his Void Shift active (mitigation effect is consumed in both cases).
  - The area of effect for the eruption will be at the target's location at the time of the attachment being blocked; the target will intercept the lure without getting attached to it. (Sivir E Spell Shield → Fizz R Chum the Waters)
- **0.28** spell shield: Spell Shield's spell shield blocks Fizz's Seastone Trident. Spell shield for 1.5 s, long enough to use ahead of Seastone Trident. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Fizz W Seastone Trident)

#### 2. Vladimir (net +0.64)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Chum the Waters. Untargetable for 2 s, long enough to use ahead of Chum the Waters. (Vladimir W Sanguine Pool → Fizz R Chum the Waters)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Urchin Strike. Untargetable for 2 s, long enough to use ahead of Urchin Strike. (Vladimir W Sanguine Pool → Fizz Q Urchin Strike)
- **0.28** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Fizz's Seastone Trident. Untargetable for 2 s, long enough to use ahead of Seastone Trident. (Vladimir W Sanguine Pool → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Vladimir's Transfusion.

#### 3. Master Yi (net +0.62)

- **0.80** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. (Master Yi Q Alpha Strike → Fizz R Chum the Waters)
- **0.29** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz Q Urchin Strike)
- **0.17** untargetable: Alpha Strike makes Master Yi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Master Yi's Alpha Strike.

#### 4. Kayle (net +0.59)

- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Chum the Waters (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Chum the Waters. (Kayle R Divine Judgment → Fizz R Chum the Waters)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Urchin Strike. Invulnerable for 2.5 s, long enough to use ahead of Urchin Strike. (Kayle R Divine Judgment → Fizz Q Urchin Strike)
- **0.23** invulnerable: Divine Judgment makes Kayle invulnerable to Fizz's Seastone Trident. Invulnerable for 2.5 s, long enough to use ahead of Seastone Trident. (Kayle R Divine Judgment → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Kayle's Starfire Spellblade.

#### 5. Fiora (net +0.53)

- **0.90** parry: Riposte parries Fizz's Chum the Waters and stuns back. Parry for 0.75 s; Chum the Waters takes 1.25 s to land, enough to react. Negating Chum the Waters's immobilizing effect turns Riposte's slow into a stun (2 s). (Fiora W Riposte → Fizz R Chum the Waters)
- **0.30** parry: Riposte parries Fizz's Urchin Strike. Parry for 0.75 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz Q Urchin Strike)
- **0.17** parry: Riposte parries Fizz's Seastone Trident. Parry for 0.75 s; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Fiora W Riposte → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Fiora's Riposte.

#### 6. Xayah (net +0.51)

- **0.70** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Chum the Waters. Untargetable for 1.5 s, long enough to use ahead of Chum the Waters. (Xayah R Featherstorm → Fizz R Chum the Waters)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Urchin Strike. Untargetable for 1.5 s, long enough to use ahead of Urchin Strike. (Xayah R Featherstorm → Fizz Q Urchin Strike)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Fizz's Seastone Trident. Untargetable for 1.5 s, long enough to use ahead of Seastone Trident. (Xayah R Featherstorm → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Xayah's Bladecaller.

#### 7. Gwen (net +0.44)

- **0.80** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz R Chum the Waters)
- **0.29** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz Q Urchin Strike)
- **0.17** untargetable: Hallowed Mist makes Gwen untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles for non-champion missiles but does so for champion missiles that attempt to pass through the mist, special cased to be targetable to turrets and monsters as well as enemies inside the mist. (Gwen W Hallowed Mist → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Gwen's Needlework.

#### 8. Olaf (net +0.43)

- **0.80** cc immunity: Ragnarok makes Olaf immune to Fizz's Chum the Waters (airborne, slow). Immune for 3 s, long enough to use ahead of Chum the Waters. (Olaf R Ragnarok → Fizz R Chum the Waters)
- **0.09** cc immunity: Ragnarok makes Olaf immune to Fizz's Playful (slow). Immune for 3 s, long enough to use ahead of Playful. (Olaf R Ragnarok → Fizz E Playful)
- Watch out: Playful makes Fizz untargetable, dodging Olaf's Reckless Swing.

#### 9. Aurora (net +0.42)

- **0.70** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Chum the Waters. Untargetable for 0.4 s; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz R Chum the Waters)
- **0.21** untargetable: Between Worlds makes Aurora untargetable, dodging Fizz's Urchin Strike. Untargetable for 0.4 s; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Fizz Q Urchin Strike)
- **0.14** range: Aurora's basic attacks reach 375 units farther than Fizz's (550 vs 175 attack range). Fizz closes the gap with Playful, Trickster, Urchin Strike. (Aurora basic attacks → Fizz basic attacks)
- Watch out: Playful makes Fizz untargetable, dodging Aurora's Between Worlds.

#### 10. Yuumi (net +0.32)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Chum the Waters. Untargetable for ?; Chum the Waters takes 1.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz R Chum the Waters)
- **0.48** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Urchin Strike. Untargetable for ?; Urchin Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz Q Urchin Strike)
- **0.33** untargetable: You and Me! makes Yuumi untargetable, dodging Fizz's Seastone Trident. Untargetable for ?; Seastone Trident lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Fizz W Seastone Trident)
- Watch out: Playful makes Fizz untargetable, dodging Yuumi's Final Chapter.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +0.95 | 0.95 | 0.00 |  |
| 2 | Vladimir | +0.64 | 1.20 | 0.56 |  |
| 3 | Master Yi | +0.62 | 1.21 | 0.59 |  |
| 4 | Kayle | +0.59 | 0.82 | 0.23 |  |
| 5 | Fiora | +0.53 | 1.10 | 0.57 |  |
| 6 | Xayah | +0.51 | 1.10 | 0.59 |  |
| 7 | Gwen | +0.44 | 0.99 | 0.55 |  |
| 8 | Olaf | +0.43 | 0.85 | 0.42 |  |
| 9 | Aurora | +0.42 | 0.99 | 0.57 |  |
| 10 | Yuumi | +0.32 | 1.25 | 0.93 |  |
| 11 | Zed | +0.30 | 0.84 | 0.54 |  |
| 12 | Bard | +0.29 | 1.20 | 0.91 |  |
| 13 | Udyr | +0.25 | 0.90 | 0.65 |  |
| 14 | Yunara | +0.18 | 0.18 | 0.00 |  |
| 15 | Lissandra | +0.16 | 1.17 | 1.01 |  |
| 16 | Sion | +0.11 | 0.85 | 0.74 |  |
| 17 | Twitch | +0.09 | 0.20 | 0.11 |  |
| 18 | Kai'Sa | +0.06 | 0.17 | 0.11 |  |
| 19 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 20 | Gangplank | -0.02 | 0.70 | 0.72 |  |
| 21 | Morgana | -0.03 | 0.95 | 0.98 |  |
| 22 | Kalista | -0.03 | 0.69 | 0.72 |  |
| 23 | Vex | -0.06 | 0.64 | 0.70 |  |
| 24 | Jinx | -0.08 | 0.68 | 0.76 | dash stop (Flame Chompers!) |
| 25 | Rek'Sai | -0.12 | 1.05 | 1.17 |  |
| 26 | Kog'Maw | -0.19 | 0.12 | 0.31 |  |
| 27 | Nocturne | -0.20 | 0.91 | 1.11 |  |
| 28 | Samira | -0.20 | 0.53 | 0.73 | projectile block (Blade Whirl) |
| 29 | Dr. Mundo | -0.23 | 0.00 | 0.23 |  |
| 30 | Singed | -0.25 | 0.68 | 0.93 |  |
| 31 | Teemo | -0.25 | 0.59 | 0.84 |  |
| 32 | Kindred | -0.25 | 0.20 | 0.45 |  |
| 33 | Jax | -0.27 | 0.82 | 1.09 | attack dodge (Counter Strike) |
| 34 | Rengar | -0.29 | 0.71 | 1.00 |  |
| 35 | Nasus | -0.29 | 0.27 | 0.56 |  |
| 36 | Nidalee | -0.30 | 0.13 | 0.43 |  |
| 37 | Shaco | -0.31 | 0.94 | 1.25 |  |
| 38 | Cassiopeia | -0.32 | 0.77 | 1.09 |  |
| 39 | Zeri | -0.34 | 0.21 | 0.55 |  |
| 40 | Zilean | -0.34 | 0.15 | 0.49 |  |
| 41 | Kayn | -0.35 | 0.94 | 1.29 |  |
| 42 | Lulu | -0.35 | 0.42 | 0.77 |  |
| 43 | Milio | -0.36 | 0.34 | 0.70 |  |
| 44 | Malzahar | -0.37 | 0.82 | 1.19 |  |
| 45 | Braum | -0.40 | 0.40 | 0.80 | projectile block (Unbreakable) |
| 46 | Corki | -0.40 | 0.15 | 0.55 |  |
| 47 | Veigar | -0.41 | 0.57 | 0.98 |  |
| 48 | Garen | -0.42 | 0.32 | 0.74 |  |
| 49 | Taric | -0.42 | 0.00 | 0.42 |  |
| 50 | Warwick | -0.43 | 1.03 | 1.46 |  |
| 51 | Camille | -0.43 | 0.90 | 1.33 |  |
| 52 | Nilah | -0.43 | 0.61 | 1.04 | attack dodge (Jubilant Veil) |
| 53 | Viktor | -0.44 | 0.62 | 1.06 |  |
| 54 | Ahri | -0.45 | 0.60 | 1.05 |  |
| 55 | Mel | -0.45 | 0.53 | 0.98 | projectile block (Rebuttal) |
| 56 | Pantheon | -0.50 | 0.75 | 1.25 |  |
| 57 | Maokai | -0.51 | 1.03 | 1.54 |  |
| 58 | Zaahen | -0.51 | 0.83 | 1.34 |  |
| 59 | Twisted Fate | -0.52 | 0.19 | 0.71 |  |
| 60 | Yorick | -0.54 | 0.00 | 0.54 |  |
| 61 | Zoe | -0.55 | 0.15 | 0.70 |  |
| 62 | Rumble | -0.55 | 0.00 | 0.55 |  |
| 63 | Alistar | -0.57 | 0.68 | 1.25 |  |
| 64 | Yasuo | -0.57 | 0.40 | 0.97 | projectile block (Wind Wall) |
| 65 | Soraka | -0.57 | 0.13 | 0.70 |  |
| 66 | Smolder | -0.58 | 0.15 | 0.73 |  |
| 67 | Kled | -0.59 | 0.74 | 1.33 |  |
| 68 | Hwei | -0.60 | 0.66 | 1.26 | dash stop (Grim Visage) |
| 69 | Graves | -0.60 | 0.10 | 0.70 |  |
| 70 | Ashe | -0.62 | 0.18 | 0.80 |  |
| 71 | LeBlanc | -0.62 | 0.10 | 0.72 |  |
| 72 | Ezreal | -0.63 | 0.15 | 0.78 |  |
| 73 | Miss Fortune | -0.64 | 0.15 | 0.79 |  |
| 74 | Quinn | -0.65 | 0.17 | 0.82 |  |
| 75 | Illaoi | -0.66 | 0.08 | 0.74 |  |
| 76 | Evelynn | -0.67 | 0.94 | 1.61 |  |
| 77 | Kennen | -0.69 | 0.14 | 0.83 |  |
| 78 | Xin Zhao | -0.70 | 0.58 | 1.28 |  |
| 79 | Poppy | -0.71 | 0.69 | 1.40 | dash stop (Steadfast Presence), dash stop (Steadfast Presence) |
| 80 | Sylas | -0.71 | 0.00 | 0.71 |  |
| 81 | Akshan | -0.72 | 0.15 | 0.87 |  |
| 82 | Varus | -0.73 | 0.13 | 0.86 |  |
| 83 | Tristana | -0.74 | 0.18 | 0.92 |  |
| 84 | Sona | -0.75 | 0.19 | 0.94 |  |
| 85 | Karthus | -0.75 | 0.08 | 0.83 |  |
| 86 | Lillia | -0.76 | 0.04 | 0.80 |  |
| 87 | Renekton | -0.76 | 0.00 | 0.76 |  |
| 88 | Shen | -0.77 | 0.79 | 1.56 | attack block (Spirit's Refuge) |
| 89 | Jayce | -0.78 | 0.13 | 0.91 |  |
| 90 | Katarina | -0.78 | 0.00 | 0.78 |  |
| 91 | Skarner | -0.79 | 0.15 | 0.94 |  |
| 92 | Lee Sin | -0.80 | 0.00 | 0.80 |  |
| 93 | Kassadin | -0.82 | 0.00 | 0.82 |  |
| 94 | Karma | -0.83 | 0.10 | 0.93 |  |
| 95 | Aatrox | -0.83 | 0.00 | 0.83 |  |
| 96 | Heimerdinger | -0.84 | 0.21 | 1.05 |  |
| 97 | Vayne | -0.84 | 0.20 | 1.04 |  |
| 98 | Lux | -0.84 | 0.14 | 0.98 |  |
| 99 | Lucian | -0.85 | 0.16 | 1.01 |  |
| 100 | Annie | -0.85 | 0.11 | 0.96 |  |
| 101 | Azir | -0.86 | 0.12 | 0.98 |  |
| 102 | Kha'Zix | -0.86 | 0.00 | 0.86 |  |
| 103 | Draven | -0.87 | 0.17 | 1.04 |  |
| 104 | Brand | -0.89 | 0.10 | 0.99 |  |
| 105 | Elise | -0.90 | 0.15 | 1.05 |  |
| 106 | Orianna | -0.91 | 0.12 | 1.03 |  |
| 107 | Aphelios | -0.92 | 0.30 | 1.22 |  |
| 108 | Mordekaiser | -0.92 | 0.06 | 0.98 |  |
| 109 | Diana | -0.92 | 0.00 | 0.92 |  |
| 110 | Syndra | -0.94 | 0.10 | 1.04 |  |
| 111 | Bel'Veth | -0.94 | 0.00 | 0.94 |  |
| 112 | Wukong | -0.96 | 0.00 | 0.96 |  |
| 113 | Renata Glasc | -0.97 | 0.18 | 1.15 |  |
| 114 | Ivern | -0.97 | 0.08 | 1.05 |  |
| 115 | Sett | -0.97 | 0.08 | 1.05 |  |
| 116 | Yone | -0.99 | 0.36 | 1.35 |  |
| 117 | Gnar | -0.99 | 0.14 | 1.13 |  |
| 118 | Talon | -0.99 | 0.00 | 0.99 |  |
| 119 | Ziggs | -1.00 | 0.13 | 1.13 |  |
| 120 | Ambessa | -1.00 | 0.00 | 1.00 |  |
| 121 | Akali | -1.01 | 0.00 | 1.01 |  |
| 122 | Blitzcrank | -1.01 | 0.00 | 1.01 |  |
| 123 | Seraphine | -1.02 | 0.13 | 1.15 |  |
| 124 | Swain | -1.02 | 0.09 | 1.11 |  |
| 125 | Malphite | -1.03 | 0.26 | 1.29 |  |
| 126 | Anivia | -1.03 | 0.12 | 1.15 |  |
| 127 | Vel'Koz | -1.03 | 0.12 | 1.15 |  |
| 128 | Zyra | -1.03 | 0.12 | 1.15 |  |
| 129 | Darius | -1.03 | 0.00 | 1.03 |  |
| 130 | Trundle | -1.03 | 0.00 | 1.03 |  |
| 131 | Shyvana | -1.04 | 0.08 | 1.12 |  |
| 132 | Cho'Gath | -1.04 | 0.00 | 1.04 |  |
| 133 | Xerath | -1.05 | 0.12 | 1.17 |  |
| 134 | Irelia | -1.06 | 0.00 | 1.06 |  |
| 135 | Caitlyn | -1.07 | 0.18 | 1.25 |  |
| 136 | Aurelion Sol | -1.07 | 0.10 | 1.17 |  |
| 137 | Senna | -1.08 | 0.16 | 1.24 |  |
| 138 | Locke | -1.08 | 0.00 | 1.08 |  |
| 139 | Riven | -1.09 | 0.00 | 1.09 |  |
| 140 | Ryze | -1.10 | 0.11 | 1.21 |  |
| 141 | Amumu | -1.13 | 0.27 | 1.40 |  |
| 142 | Nami | -1.16 | 0.10 | 1.26 |  |
| 143 | Neeko | -1.16 | 0.10 | 1.26 |  |
| 144 | Hecarim | -1.16 | 0.08 | 1.24 |  |
| 145 | Urgot | -1.19 | 0.06 | 1.25 |  |
| 146 | Nautilus | -1.20 | 0.00 | 1.20 |  |
| 147 | Volibear | -1.21 | 0.08 | 1.29 |  |
| 148 | Rammus | -1.23 | 0.27 | 1.50 |  |
| 149 | Zac | -1.24 | 0.57 | 1.81 | dash stop (Stretching Strikes) |
| 150 | Ekko | -1.24 | 0.00 | 1.24 |  |
| 151 | Jhin | -1.25 | 0.13 | 1.38 |  |
| 152 | Nunu & Willump | -1.26 | 0.31 | 1.57 |  |
| 153 | Jarvan IV | -1.26 | 0.08 | 1.34 |  |
| 154 | Thresh | -1.26 | 0.08 | 1.34 |  |
| 155 | Janna | -1.27 | 0.17 | 1.44 |  |
| 156 | Leona | -1.33 | 0.00 | 1.33 |  |
| 157 | Rakan | -1.35 | 0.05 | 1.40 |  |
| 158 | Naafiri | -1.35 | 0.00 | 1.35 |  |
| 159 | Fiddlesticks | -1.36 | 0.08 | 1.44 |  |
| 160 | Vi | -1.46 | 0.08 | 1.54 |  |
| 161 | K'Sante | -1.47 | 0.16 | 1.63 |  |
| 162 | Ornn | -1.48 | 0.08 | 1.56 |  |
| 163 | Briar | -1.50 | 0.00 | 1.50 |  |
| 164 | Sejuani | -1.50 | 0.00 | 1.50 |  |
| 165 | Qiyana | -1.53 | 0.00 | 1.53 |  |
| 166 | Gragas | -1.55 | 0.00 | 1.55 |  |
| 167 | Pyke | -1.55 | 0.00 | 1.55 |  |
| 168 | Viego | -1.60 | 0.08 | 1.68 |  |
| 169 | Tahm Kench | -1.60 | 0.00 | 1.60 |  |
| 170 | Rell | -1.68 | 0.00 | 1.68 |  |
| 171 | Taliyah | -1.83 | 0.12 | 1.95 |  |
| 172 | Galio | -1.88 | 0.00 | 1.88 |  |
