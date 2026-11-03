# Counters to Jax (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Jax: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Jax wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Jax --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 2 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 3 | Ivern | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +0.96 | +0.00 |
| 4 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 5 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | +0.06 | – | +0.00 |
| 6 | Yasuo | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 7 | Yorick | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 8 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 9 | Trundle | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 10 | Nasus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 11 | Shyvana | +0.76 | +0.98 | +0.96 | +1.00 | −0.00 | – | +0.00 |
| 12 | Illaoi | +0.75 | +0.96 | +0.95 | +1.00 | −0.03 | – | +0.00 |
| 13 | Quinn | +0.61 | +1.00 | +1.00 | +1.00 | +0.06 | −1.00 | +0.00 |
| 14 | Lulu | +0.61 | +1.00 | +1.00 | +1.00 | +0.05 | −1.00 | +0.00 |
| 15 | Karma | +0.58 | +0.13 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 16 | Cho'Gath | +0.56 | +1.00 | +1.00 | +0.00 | +0.04 | – | +0.00 |
| 17 | Zac | +0.49 | +0.00 | +0.97 | +0.98 | +0.01 | – | +0.00 |
| 18 | Kalista | +0.40 | +1.00 | +1.00 | −1.00 | +0.02 | +1.00 | +0.00 |
| 19 | Olaf | +0.28 | +0.50 | +0.50 | +0.00 | +0.02 | – | +0.00 |
| 20 | Ashe | +0.19 | +1.00 | +1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 21 | Hwei | +0.08 | −1.00 | +0.96 | +0.48 | −0.05 | +0.00 | +0.00 |
| 22 | Singed | +0.06 | +0.09 | +0.06 | +0.09 | −0.01 | – | +0.00 |
| 23 | Anivia | +0.02 | +0.11 | +0.10 | −0.02 | −0.20 | +0.01 | +0.00 |
| 24 | Malphite | −0.09 | +0.00 | +0.00 | +0.00 | +0.10 | −1.00 | +0.00 |
| 25 | K'Sante | −0.12 | −1.00 | +0.00 | +0.00 | +0.19 | +1.00 | +0.00 |
| 26 | Kled | −0.22 | +1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 27 | Corki | −0.29 | −1.00 | +1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 28 | Twisted Fate | −0.31 | +1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 29 | Zaahen | −0.32 | −1.00 | −0.16 | +0.00 | −0.01 | – | +0.00 |
| 30 | Aphelios | −0.45 | −1.00 | +0.00 | −1.00 | −0.03 | +0.00 | +0.00 |
| 31 | Bel'Veth | −0.55 | −1.00 | −1.00 | −0.02 | +0.06 | – | +0.00 |
| 32 | Jayce | −0.59 | −1.00 | −1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 33 | Orianna | −0.60 | −1.00 | −1.00 | +0.00 | −0.03 | −1.00 | +0.00 |
| 34 | Gnar | −0.61 | −1.00 | −1.00 | −1.00 | −0.03 | +0.99 | +0.00 |
| 35 | Volibear | −0.61 | −1.00 | −0.30 | −1.00 | −0.15 | – | +0.00 |
| 36 | Kog'Maw | −0.63 | −1.00 | −0.50 | −1.00 | −0.01 | −0.50 | +0.00 |
| 37 | Mordekaiser | −0.66 | −1.00 | −0.70 | −0.69 | +0.04 | −1.00 | +0.00 |
| 38 | Sion | −0.67 | −1.00 | −1.00 | −0.50 | −0.02 | – | +0.00 |
| 39 | Braum | −0.71 | −1.00 | −1.00 | −1.00 | −0.02 | −0.06 | +0.00 |
| 40 | Ezreal | −0.72 | −1.00 | −1.00 | −1.00 | +0.09 | −0.35 | +0.00 |
| 41 | Rengar | −0.74 | −1.00 | −1.00 | −1.00 | +0.22 | – | +0.00 |
| 42 | Aurelion Sol | −0.74 | −1.00 | −1.00 | −1.00 | +0.38 | −1.00 | +0.00 |
| 43 | Kennen | −0.75 | −1.00 | −0.83 | −0.91 | −0.04 | −1.00 | +0.00 |
| 44 | Hecarim | −0.75 | −1.00 | −1.00 | −1.00 | +0.15 | – | +0.00 |
| 45 | Viego | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 46 | Garen | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 47 | Shen | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 48 | Nunu & Willump | −0.76 | −1.00 | −1.00 | −1.00 | +0.09 | – | +0.00 |
| 49 | Pantheon | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 50 | Jarvan IV | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 51 | Rek'Sai | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 52 | Sett | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 53 | Diana | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 54 | Riven | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 55 | Akali | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 56 | Sylas | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 57 | Camille | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 58 | Master Yi | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 59 | Sejuani | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 60 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 61 | Gangplank | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 62 | Kayn | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 63 | Urgot | −0.77 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 64 | Renekton | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 65 | Rumble | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 66 | Lee Sin | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 67 | Udyr | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 68 | Galio | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 69 | Ambessa | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 70 | Yone | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 71 | Blitzcrank | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 72 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 73 | Briar | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 74 | Janna | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 75 | Skarner | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 76 | Ornn | −0.78 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | +0.00 |
| 77 | Rell | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 78 | Vel'Koz | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 79 | Kha'Zix | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 80 | Nocturne | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 81 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 82 | Warwick | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 83 | Annie | −0.79 | −1.00 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 84 | Shaco | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 85 | Aatrox | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 86 | Neeko | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 87 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.08 | −1.00 | +0.00 |
| 88 | Xin Zhao | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 89 | Lissandra | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 90 | Rakan | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 91 | Vi | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 92 | Alistar | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 93 | Elise | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 94 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 95 | Yunara | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 96 | Fiora | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 97 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 98 | Syndra | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 99 | Ekko | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 100 | Fizz | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 101 | Gragas | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 102 | Rammus | −0.79 | −1.00 | −1.00 | −1.00 | +0.05 | −1.00 | +0.00 |
| 103 | Tryndamere | −0.79 | −1.00 | −1.00 | −1.00 | −0.10 | – | +0.00 |
| 104 | Ziggs | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 105 | Lux | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 106 | Veigar | −0.79 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 107 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 108 | Amumu | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 109 | Morgana | −0.80 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | +0.00 |
| 110 | Lillia | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 111 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 112 | Kassadin | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 113 | Bard | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 114 | Senna | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 115 | Maokai | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 116 | Cassiopeia | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 117 | Draven | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 118 | Varus | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 119 | Mel | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 120 | Xerath | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 121 | Teemo | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 122 | Soraka | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 123 | Zoe | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 124 | Heimerdinger | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 125 | Zilean | −0.80 | −1.00 | −1.00 | −1.00 | +0.00 | −1.00 | +0.00 |
| 126 | Aurora | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 127 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 128 | Ryze | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 129 | Sivir | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 130 | Zyra | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 131 | Malzahar | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 132 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 133 | Karthus | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 134 | Leona | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 135 | Jinx | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 136 | Brand | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 137 | Jhin | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 138 | Xayah | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 139 | Kai'Sa | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 140 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 141 | Samira | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 142 | Swain | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 143 | Yuumi | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 144 | Azir | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 145 | Viktor | −0.81 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 146 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 147 | Smolder | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 148 | Twitch | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 149 | Seraphine | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 150 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 151 | Vex | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 152 | Sona | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 153 | Nami | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 154 | Milio | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 155 | Tahm Kench | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 156 | Kayle | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 157 | Vladimir | −0.81 | −1.00 | −1.00 | −1.00 | −0.06 | −1.00 | +0.00 |
| 158 | Miss Fortune | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 159 | Zeri | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 160 | Fiddlesticks | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 161 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 162 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 163 | Nidalee | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 164 | Kindred | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 165 | Pyke | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 166 | Evelynn | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 167 | Nilah | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 168 | Graves | −0.85 | −1.00 | −1.00 | −1.00 | +0.03 | −1.00 | −1.00 |
| 169 | Renata Glasc | −0.85 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | −1.00 |
| 170 | Thresh | −0.85 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | −0.50 |
| 171 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.47 | – | +0.00 |
| 172 | Wukong | −0.87 | −1.00 | −1.00 | −1.00 | −0.40 | – | −0.50 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Jax's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Jax's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Jax` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.88)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2 s, long enough to use ahead of Grandmaster-at-Arms. (Vladimir W Sanguine Pool → Jax R Grandmaster-at-Arms)
- **0.52** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Counter Strike. Untargetable for 2 s, long enough to use ahead of Counter Strike. (Vladimir W Sanguine Pool → Jax E Counter Strike)
- **0.50** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Jax's Leap Strike. Untargetable for 2 s, long enough to use ahead of Leap Strike. (Vladimir W Sanguine Pool → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Vladimir's basic attacks.

#### 2. Yuumi (net +0.87)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Leap Strike. Untargetable for ?, timed to Leap Strike. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax Q Leap Strike)
- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for ?; Grandmaster-at-Arms takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax R Grandmaster-at-Arms)
- **0.42** untargetable: You and Me! makes Yuumi untargetable, dodging Jax's Counter Strike. Untargetable for ?; Counter Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Jax E Counter Strike)
- Watch out: Counter Strike dodges Yuumi's basic attacks (with Feline Friendship).

#### 3. Lissandra (net +0.84)

- **0.55** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Lissandra R Frozen Tomb → Jax R Grandmaster-at-Arms)
- **0.36** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Leap Strike. Untargetable for 2.5 s, long enough to use ahead of Leap Strike. (Lissandra R Frozen Tomb → Jax Q Leap Strike)
- **0.33** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Jax's Counter Strike. Untargetable for 2.5 s, long enough to use ahead of Counter Strike. (Lissandra R Frozen Tomb → Jax E Counter Strike)
- Watch out: Counter Strike dodges Lissandra's basic attacks.

#### 4. Bard (net +0.79)

- **0.55** untargetable: Tempered Fate makes Bard untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Bard R Tempered Fate → Jax R Grandmaster-at-Arms)
- **0.36** range: Bard's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range). Jax closes the gap with Leap Strike. (Bard basic attacks → Jax basic attacks)
- **0.36** untargetable: Tempered Fate makes Bard untargetable, dodging Jax's Leap Strike. Untargetable for 2.5 s, long enough to use ahead of Leap Strike. (Bard R Tempered Fate → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Bard's basic attacks (with Traveler's Call).

#### 5. Sivir (net +0.78)

- **0.49** spell shield: Spell Shield's spell shield blocks Jax's Counter Strike. Spell shield for 1.5 s, long enough to use ahead of Counter Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jax E Counter Strike)
- **0.48** spell shield: Spell Shield's spell shield blocks Jax's Leap Strike. Spell shield for 1.5 s, long enough to use ahead of Leap Strike. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Jax Q Leap Strike)
- **0.47** range: Sivir's basic attacks reach 375 units farther than Jax's (500 vs 125 attack range). Jax closes the gap with Leap Strike. (Sivir basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Sivir's basic attacks (with Fleet of Foot).

#### 6. Xayah (net +0.77)

- **0.52** untargetable: Featherstorm makes Xayah untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 1.5 s, long enough to use ahead of Grandmaster-at-Arms. (Xayah R Featherstorm → Jax R Grandmaster-at-Arms)
- **0.38** range: Xayah's basic attacks reach 400 units farther than Jax's (525 vs 125 attack range). Jax closes the gap with Leap Strike. (Xayah basic attacks → Jax basic attacks)
- **0.35** untargetable: Featherstorm makes Xayah untargetable, dodging Jax's Leap Strike. Untargetable for 1.5 s, long enough to use ahead of Leap Strike. (Xayah R Featherstorm → Jax Q Leap Strike)
- Watch out: Counter Strike dodges Xayah's basic attacks (with Clean Cuts).

#### 7. Aurora (net +0.74)

- **0.52** untargetable: Between Worlds makes Aurora untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 0.4 s; Grandmaster-at-Arms takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jax R Grandmaster-at-Arms)
- **0.35** untargetable: Between Worlds makes Aurora untargetable, dodging Jax's Leap Strike. Untargetable for 0.4 s, timed to Leap Strike. Does not destroy inbound projectiles. (Aurora R Between Worlds → Jax Q Leap Strike)
- **0.29** range: Aurora's basic attacks reach 425 units farther than Jax's (550 vs 125 attack range). Jax closes the gap with Leap Strike. (Aurora basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Aurora's basic attacks (with Spirit Abjuration).

#### 8. Maokai (net +0.73)

- **0.61** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Leap Strike. Untargetable for 1.4 s, timed to Leap Strike. (Maokai W Twisted Advance → Jax Q Leap Strike)
- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Grandmaster-at-Arms. Untargetable for 1.4 s; Grandmaster-at-Arms takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Jax R Grandmaster-at-Arms)
- **0.39** untargetable: Twisted Advance makes Maokai untargetable, dodging Jax's Counter Strike. Untargetable for 1.4 s; Counter Strike lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Maokai W Twisted Advance → Jax E Counter Strike)
- Watch out: Counter Strike dodges Maokai's basic attacks (with Sap Magic).

#### 9. Kayle (net +0.70)

- **0.55** invulnerable: Divine Judgment makes Kayle invulnerable to Jax's Grandmaster-at-Arms. Invulnerable for 2.5 s, long enough to use ahead of Grandmaster-at-Arms. (Kayle R Divine Judgment → Jax R Grandmaster-at-Arms)
- **0.36** invulnerable: Divine Judgment makes Kayle invulnerable to Jax's Leap Strike. Invulnerable for 2.5 s, long enough to use ahead of Leap Strike. (Kayle R Divine Judgment → Jax Q Leap Strike)
- **0.36** range: Kayle's basic attacks reach 500 units farther than Jax's (625 vs 125 attack range). Jax closes the gap with Leap Strike. (Kayle basic attacks → Jax basic attacks)
- Watch out: Counter Strike dodges Kayle's basic attacks (with Divine Ascent).

#### 10. Nocturne (net +0.58)

- **0.60** spell shield: Shroud of Darkness's spell shield blocks Jax's Counter Strike. Spell shield for 1.5 s, long enough to use ahead of Counter Strike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jax E Counter Strike)
- **0.56** spell shield: Shroud of Darkness's spell shield blocks Jax's Leap Strike. Spell shield for 1.5 s, long enough to use ahead of Leap Strike. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jax Q Leap Strike)
- **0.30** spell shield: Shroud of Darkness's spell shield blocks Jax's Empower. Spell shield for 1.5 s, long enough to use ahead of Empower. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Jax W Empower)
- Watch out: Counter Strike dodges Nocturne's basic attacks (with Umbra Blades).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.88 | 1.15 | 0.27 |  |
| 2 | Yuumi | +0.87 | 1.54 | 0.67 |  |
| 3 | Lissandra | +0.84 | 1.07 | 0.23 |  |
| 4 | Bard | +0.79 | 1.20 | 0.41 |  |
| 5 | Sivir | +0.78 | 1.31 | 0.53 |  |
| 6 | Xayah | +0.77 | 1.18 | 0.41 |  |
| 7 | Aurora | +0.74 | 1.05 | 0.31 |  |
| 8 | Maokai | +0.73 | 1.01 | 0.28 |  |
| 9 | Kayle | +0.70 | 1.17 | 0.47 |  |
| 10 | Nocturne | +0.58 | 0.99 | 0.41 |  |
| 11 | Teemo | +0.57 | 0.95 | 0.38 | blind (Blinding Dart) |
| 12 | Gwen | +0.50 | 0.88 | 0.38 |  |
| 13 | Morgana | +0.46 | 0.71 | 0.25 |  |
| 14 | Zed | +0.45 | 0.76 | 0.31 |  |
| 15 | Rek'Sai | +0.44 | 0.84 | 0.40 |  |
| 16 | Evelynn | +0.41 | 0.80 | 0.39 |  |
| 17 | Fiora | +0.37 | 0.93 | 0.56 |  |
| 18 | Cassiopeia | +0.37 | 0.60 | 0.23 |  |
| 19 | Milio | +0.32 | 0.73 | 0.41 |  |
| 20 | Hwei | +0.29 | 0.53 | 0.24 |  |
| 21 | Lulu | +0.28 | 0.66 | 0.38 |  |
| 22 | Jinx | +0.28 | 0.59 | 0.31 |  |
| 23 | Fizz | +0.27 | 1.09 | 0.82 |  |
| 24 | Ahri | +0.27 | 0.50 | 0.23 |  |
| 25 | Veigar | +0.25 | 0.50 | 0.25 |  |
| 26 | Vex | +0.24 | 0.52 | 0.28 |  |
| 27 | Kayn | +0.23 | 0.80 | 0.57 |  |
| 28 | Camille | +0.22 | 0.79 | 0.57 |  |
| 29 | Malzahar | +0.22 | 0.74 | 0.52 |  |
| 30 | Master Yi | +0.21 | 0.88 | 0.67 |  |
| 31 | Kalista | +0.12 | 0.57 | 0.45 |  |
| 32 | Poppy | +0.12 | 0.50 | 0.38 | dash stop (Steadfast Presence) |
| 33 | Singed | +0.11 | 0.39 | 0.28 |  |
| 34 | Viktor | +0.07 | 0.59 | 0.52 |  |
| 35 | Xin Zhao | +0.02 | 0.77 | 0.75 |  |
| 36 | Nilah | +0.02 | 0.64 | 0.62 |  |
| 37 | Sion | -0.01 | 0.34 | 0.35 |  |
| 38 | Mel | -0.01 | 0.27 | 0.28 |  |
| 39 | Orianna | -0.01 | 0.27 | 0.28 |  |
| 40 | Soraka | -0.01 | 0.27 | 0.28 |  |
| 41 | Ziggs | -0.01 | 0.27 | 0.28 |  |
| 42 | Anivia | -0.01 | 0.24 | 0.25 |  |
| 43 | Zyra | -0.01 | 0.24 | 0.25 |  |
| 44 | Annie | -0.01 | 0.22 | 0.23 |  |
| 45 | Brand | -0.01 | 0.22 | 0.23 |  |
| 46 | Karma | -0.01 | 0.22 | 0.23 |  |
| 47 | LeBlanc | -0.01 | 0.22 | 0.23 |  |
| 48 | Nami | -0.01 | 0.22 | 0.23 |  |
| 49 | Neeko | -0.01 | 0.22 | 0.23 |  |
| 50 | Syndra | -0.01 | 0.22 | 0.23 |  |
| 51 | Swain | -0.01 | 0.21 | 0.22 |  |
| 52 | Heimerdinger | -0.01 | 0.20 | 0.21 |  |
| 53 | Ashe | -0.02 | 0.36 | 0.38 |  |
| 54 | Yunara | -0.02 | 0.36 | 0.38 |  |
| 55 | Nidalee | -0.02 | 0.30 | 0.32 |  |
| 56 | Kennen | -0.02 | 0.29 | 0.31 |  |
| 57 | Lux | -0.02 | 0.29 | 0.31 |  |
| 58 | Seraphine | -0.02 | 0.29 | 0.31 |  |
| 59 | Twitch | -0.03 | 0.43 | 0.46 |  |
| 60 | Sona | -0.03 | 0.41 | 0.44 |  |
| 61 | Kai'Sa | -0.03 | 0.38 | 0.41 |  |
| 62 | Renata Glasc | -0.03 | 0.38 | 0.41 |  |
| 63 | Gnar | -0.03 | 0.33 | 0.36 |  |
| 64 | Corki | -0.03 | 0.32 | 0.35 |  |
| 65 | Zilean | -0.03 | 0.32 | 0.35 |  |
| 66 | Zoe | -0.03 | 0.32 | 0.35 |  |
| 67 | Gangplank | -0.04 | 0.44 | 0.48 |  |
| 68 | Udyr | -0.05 | 0.70 | 0.75 |  |
| 69 | Samira | -0.05 | 0.30 | 0.35 |  |
| 70 | Aurelion Sol | -0.05 | 0.22 | 0.27 |  |
| 71 | Kindred | -0.06 | 0.47 | 0.53 |  |
| 72 | Thresh | -0.06 | 0.19 | 0.25 |  |
| 73 | Olaf | -0.08 | 0.33 | 0.41 |  |
| 74 | Graves | -0.11 | 0.24 | 0.35 |  |
| 75 | Amumu | -0.11 | 0.17 | 0.28 |  |
| 76 | Kled | -0.12 | 0.32 | 0.44 |  |
| 77 | Smolder | -0.12 | 0.32 | 0.44 |  |
| 78 | Ivern | -0.12 | 0.19 | 0.31 |  |
| 79 | Lillia | -0.12 | 0.11 | 0.23 |  |
| 80 | Quinn | -0.13 | 0.38 | 0.51 |  |
| 81 | Rammus | -0.13 | 0.32 | 0.45 |  |
| 82 | Tristana | -0.14 | 0.36 | 0.50 |  |
| 83 | Elise | -0.15 | 0.32 | 0.47 |  |
| 84 | Vel'Koz | -0.15 | 0.27 | 0.42 |  |
| 85 | Caitlyn | -0.16 | 0.36 | 0.52 |  |
| 86 | Xerath | -0.17 | 0.27 | 0.44 |  |
| 87 | Shaco | -0.18 | 0.80 | 0.98 |  |
| 88 | Shen | -0.18 | 0.56 | 0.74 |  |
| 89 | Senna | -0.18 | 0.32 | 0.50 |  |
| 90 | Rakan | -0.18 | 0.13 | 0.31 |  |
| 91 | Lucian | -0.19 | 0.36 | 0.55 |  |
| 92 | Nasus | -0.19 | 0.33 | 0.52 |  |
| 93 | Vayne | -0.22 | 0.43 | 0.65 |  |
| 94 | Jayce | -0.22 | 0.30 | 0.52 |  |
| 95 | Karthus | -0.22 | 0.19 | 0.41 |  |
| 96 | Rengar | -0.23 | 0.53 | 0.76 |  |
| 97 | Janna | -0.23 | 0.36 | 0.59 |  |
| 98 | Pantheon | -0.24 | 0.89 | 1.13 |  |
| 99 | Ezreal | -0.24 | 0.32 | 0.56 |  |
| 100 | Jhin | -0.24 | 0.27 | 0.51 |  |
| 101 | Ryze | -0.24 | 0.24 | 0.48 |  |
| 102 | Urgot | -0.24 | 0.15 | 0.39 |  |
| 103 | Draven | -0.25 | 0.36 | 0.61 |  |
| 104 | Kha'Zix | -0.25 | 0.00 | 0.25 |  |
| 105 | Alistar | -0.26 | 0.26 | 0.52 |  |
| 106 | Miss Fortune | -0.27 | 0.32 | 0.59 |  |
| 107 | Mordekaiser | -0.27 | 0.08 | 0.35 |  |
| 108 | Ambessa | -0.27 | 0.00 | 0.27 |  |
| 109 | Diana | -0.28 | 0.00 | 0.28 |  |
| 110 | Lee Sin | -0.28 | 0.00 | 0.28 |  |
| 111 | Ornn | -0.28 | 0.00 | 0.28 |  |
| 112 | Yone | -0.29 | 0.18 | 0.47 |  |
| 113 | Akali | -0.31 | 0.00 | 0.31 |  |
| 114 | Cho'Gath | -0.31 | 0.00 | 0.31 |  |
| 115 | Leona | -0.31 | 0.00 | 0.31 |  |
| 116 | Rumble | -0.31 | 0.00 | 0.31 |  |
| 117 | Shyvana | -0.31 | 0.00 | 0.31 |  |
| 118 | Sylas | -0.31 | 0.00 | 0.31 |  |
| 119 | Qiyana | -0.32 | 0.00 | 0.32 |  |
| 120 | Kog'Maw | -0.34 | 0.27 | 0.61 |  |
| 121 | Azir | -0.35 | 0.27 | 0.62 |  |
| 122 | Taliyah | -0.35 | 0.27 | 0.62 |  |
| 123 | Varus | -0.35 | 0.27 | 0.62 |  |
| 124 | Braum | -0.35 | 0.00 | 0.35 |  |
| 125 | Nautilus | -0.35 | 0.00 | 0.35 |  |
| 126 | Sejuani | -0.35 | 0.00 | 0.35 |  |
| 127 | Skarner | -0.35 | 0.00 | 0.35 |  |
| 128 | Malphite | -0.36 | 0.21 | 0.57 |  |
| 129 | Fiddlesticks | -0.38 | 0.20 | 0.58 |  |
| 130 | Jarvan IV | -0.38 | 0.00 | 0.38 |  |
| 131 | Talon | -0.38 | 0.00 | 0.38 |  |
| 132 | Aphelios | -0.39 | 0.38 | 0.77 |  |
| 133 | Pyke | -0.39 | 0.00 | 0.39 |  |
| 134 | Aatrox | -0.41 | 0.00 | 0.41 |  |
| 135 | Kassadin | -0.41 | 0.00 | 0.41 |  |
| 136 | Riven | -0.41 | 0.00 | 0.41 |  |
| 137 | Taric | -0.41 | 0.00 | 0.41 |  |
| 138 | Zeri | -0.43 | 0.44 | 0.87 |  |
| 139 | Sett | -0.44 | 0.00 | 0.44 |  |
| 140 | Twisted Fate | -0.45 | 0.43 | 0.88 |  |
| 141 | Yasuo | -0.45 | 0.00 | 0.45 |  |
| 142 | Illaoi | -0.46 | 0.00 | 0.46 |  |
| 143 | K'Sante | -0.46 | 0.00 | 0.46 |  |
| 144 | Tryndamere | -0.46 | 0.00 | 0.46 |  |
| 145 | Garen | -0.49 | 0.18 | 0.67 |  |
| 146 | Akshan | -0.52 | 0.34 | 0.86 |  |
| 147 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 148 | Gragas | -0.53 | 0.00 | 0.53 |  |
| 149 | Trundle | -0.53 | 0.00 | 0.53 |  |
| 150 | Zaahen | -0.54 | 0.20 | 0.74 |  |
| 151 | Darius | -0.55 | 0.00 | 0.55 |  |
| 152 | Nunu & Willump | -0.56 | 0.00 | 0.56 |  |
| 153 | Hecarim | -0.57 | 0.00 | 0.57 |  |
| 154 | Yorick | -0.60 | 0.00 | 0.60 |  |
| 155 | Locke | -0.61 | 0.00 | 0.61 |  |
| 156 | Naafiri | -0.61 | 0.00 | 0.61 |  |
| 157 | Katarina | -0.63 | 0.00 | 0.63 |  |
| 158 | Zac | -0.64 | 0.34 | 0.98 |  |
| 159 | Tahm Kench | -0.66 | 0.00 | 0.66 |  |
| 160 | Briar | -0.67 | 0.00 | 0.67 |  |
| 161 | Galio | -0.69 | 0.00 | 0.69 |  |
| 162 | Bel'Veth | -0.71 | 0.00 | 0.71 |  |
| 163 | Wukong | -0.71 | 0.00 | 0.71 |  |
| 164 | Vi | -0.72 | 0.00 | 0.72 |  |
| 165 | Irelia | -0.73 | 0.05 | 0.78 |  |
| 166 | Viego | -0.77 | 0.09 | 0.86 |  |
| 167 | Blitzcrank | -0.77 | 0.00 | 0.77 |  |
| 168 | Renekton | -0.83 | 0.00 | 0.83 |  |
| 169 | Ekko | -0.87 | 0.00 | 0.87 |  |
| 170 | Rell | -1.19 | 0.00 | 1.19 |  |
| 171 | Warwick | -1.22 | 0.29 | 1.51 |  |
| 172 | Volibear | -1.22 | 0.00 | 1.22 |  |
