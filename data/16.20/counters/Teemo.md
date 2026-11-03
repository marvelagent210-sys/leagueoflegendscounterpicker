# Counters to Teemo (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Teemo: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Teemo wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Teemo --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Yorick | +0.85 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +1.00 |
| 2 | Kayle | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 3 | K'Sante | +0.84 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +1.00 |
| 4 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | −0.24 | +1.00 | +1.00 |
| 5 | Annie | +0.81 | +1.00 | +1.00 | +1.00 | +0.05 | +1.00 | +0.00 |
| 6 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 7 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 8 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 9 | Heimerdinger | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 10 | Nasus | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 11 | Dr. Mundo | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 12 | Cassiopeia | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 13 | Ashe | +0.78 | +0.94 | +0.97 | +1.00 | −0.00 | +0.99 | +0.00 |
| 14 | Malzahar | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 15 | Trundle | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 16 | Ivern | +0.75 | +1.00 | +1.00 | +1.00 | −0.18 | – | +0.00 |
| 17 | Yasuo | +0.67 | +0.96 | +0.96 | +0.46 | −0.03 | +0.97 | +0.00 |
| 18 | Kog'Maw | +0.56 | +1.00 | +1.00 | +0.00 | −0.00 | – | +0.00 |
| 19 | Samira | +0.41 | +1.00 | +0.20 | +0.30 | +0.06 | – | +0.00 |
| 20 | Rammus | +0.37 | +1.00 | +1.00 | −1.00 | −0.19 | +1.00 | +0.00 |
| 21 | Varus | +0.33 | +0.94 | −0.54 | +1.00 | −0.02 | – | +0.00 |
| 22 | Warwick | +0.30 | +0.95 | +1.00 | −1.00 | −0.56 | +1.00 | +0.00 |
| 23 | Zac | +0.20 | +0.90 | −0.09 | +0.14 | −0.14 | −0.08 | +0.00 |
| 24 | Yunara | +0.13 | +0.42 | +0.80 | −1.00 | +0.08 | – | +0.00 |
| 25 | Anivia | +0.05 | +0.13 | +0.07 | −0.02 | −0.08 | +0.13 | +0.00 |
| 26 | Tahm Kench | +0.01 | +0.00 | +0.03 | +0.05 | −0.07 | +0.07 | +0.00 |
| 27 | Morgana | −0.16 | −1.00 | −0.37 | +1.00 | −0.02 | – | +0.00 |
| 28 | Fizz | −0.19 | −1.00 | +1.00 | −1.00 | +0.05 | +0.00 | +0.00 |
| 29 | Fiddlesticks | −0.22 | +1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 30 | Karma | −0.26 | −1.00 | −0.79 | +1.00 | +0.07 | – | +0.00 |
| 31 | Vel'Koz | −0.30 | −1.00 | −1.00 | +1.00 | +0.22 | – | +0.00 |
| 32 | Zeri | −0.32 | −1.00 | −1.00 | +1.00 | +0.06 | – | +0.00 |
| 33 | Elise | −0.35 | −1.00 | −1.00 | +0.92 | −0.01 | – | +0.00 |
| 34 | Gragas | −0.40 | −1.00 | −1.00 | +1.00 | −0.02 | −1.00 | +0.00 |
| 35 | Renekton | −0.41 | −1.00 | −1.00 | +1.00 | −0.04 | −1.00 | +0.00 |
| 36 | Bel'Veth | −0.42 | −1.00 | −1.00 | +1.00 | −0.12 | −1.00 | +0.00 |
| 37 | Aurelion Sol | −0.43 | +0.00 | −1.00 | −1.00 | +0.41 | – | +0.00 |
| 38 | Garen | −0.45 | +0.00 | −1.00 | −0.50 | −0.01 | −1.00 | +0.00 |
| 39 | Lulu | −0.46 | −1.00 | −1.00 | +0.37 | +0.06 | – | +0.00 |
| 40 | Taric | −0.49 | −1.00 | −0.33 | −0.66 | −0.01 | −0.23 | +0.00 |
| 41 | Senna | −0.52 | −0.19 | −0.73 | −1.00 | +0.06 | −1.00 | +0.00 |
| 42 | Zyra | −0.54 | −0.14 | −1.00 | −1.00 | −0.00 | – | +0.00 |
| 43 | Sejuani | −0.63 | −0.31 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 44 | Jayce | −0.65 | −1.00 | −1.00 | −0.27 | +0.05 | −1.00 | +0.00 |
| 45 | Mordekaiser | −0.68 | −0.94 | −0.80 | −0.65 | −0.18 | −0.93 | +0.00 |
| 46 | Swain | −0.73 | −0.93 | −0.93 | −1.00 | +0.05 | – | +0.00 |
| 47 | Sion | −0.74 | −1.00 | −0.66 | −1.00 | −0.18 | −1.00 | +0.00 |
| 48 | Rengar | −0.75 | −1.00 | −1.00 | −1.00 | +0.32 | −1.00 | +0.00 |
| 49 | Jhin | −0.75 | −1.00 | −0.96 | −1.00 | +0.08 | – | +0.00 |
| 50 | Ziggs | −0.76 | −1.00 | −1.00 | −1.00 | +0.12 | – | +0.00 |
| 51 | Mel | −0.76 | −1.00 | −1.00 | −1.00 | +0.11 | – | +0.00 |
| 52 | Syndra | −0.76 | −1.00 | −1.00 | −1.00 | +0.08 | – | +0.00 |
| 53 | Jinx | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 54 | Ryze | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 55 | Janna | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 56 | Nami | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 57 | Orianna | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 58 | Smolder | −0.77 | −1.00 | −1.00 | −1.00 | +0.04 | – | +0.00 |
| 59 | Xerath | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 60 | Lux | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 61 | Brand | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 62 | Azir | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 63 | Sona | −0.77 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 64 | Miss Fortune | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 65 | LeBlanc | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 66 | Nunu & Willump | −0.78 | −1.00 | −1.00 | −1.00 | +0.17 | −1.00 | +0.00 |
| 67 | Zoe | −0.78 | −1.00 | −1.00 | −1.00 | +0.02 | – | +0.00 |
| 68 | Corki | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 69 | Aphelios | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 70 | Xayah | −0.78 | −1.00 | −1.00 | −1.00 | +0.01 | – | +0.00 |
| 71 | Hwei | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 72 | Taliyah | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 73 | Graves | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 74 | Soraka | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 75 | Milio | −0.78 | −1.00 | −1.00 | −1.00 | +0.00 | – | +0.00 |
| 76 | Vex | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 77 | Neeko | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 78 | Aurora | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 79 | Draven | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 80 | Ezreal | −0.78 | −1.00 | −1.00 | −1.00 | −0.02 | – | +0.00 |
| 81 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 82 | Seraphine | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 83 | Veigar | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 84 | Karthus | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 85 | Renata Glasc | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 86 | Twisted Fate | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 87 | Nidalee | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 88 | Viktor | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 89 | Diana | −0.78 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 90 | Zilean | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 91 | Ahri | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 92 | Vayne | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 93 | Twitch | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 94 | Akshan | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 95 | Kindred | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 96 | Sivir | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 97 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 98 | Quinn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 99 | Rell | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 100 | Kai'Sa | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 101 | Nautilus | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 102 | Caitlyn | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 103 | Lucian | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 104 | Kennen | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 105 | Irelia | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 106 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 107 | Rakan | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 108 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.15 | – | +0.00 |
| 109 | Braum | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 110 | Urgot | −0.80 | −1.00 | −1.00 | −1.00 | −0.02 | −1.00 | +0.00 |
| 111 | Sylas | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 112 | Alistar | −0.80 | −1.00 | −1.00 | −1.00 | −0.03 | −1.00 | +0.00 |
| 113 | Gnar | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 114 | Master Yi | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 115 | Kalista | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 116 | Jarvan IV | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 117 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 118 | Shen | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 119 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 120 | Nilah | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 121 | Galio | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 122 | Rek'Sai | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 123 | Naafiri | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 124 | Rumble | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 125 | Lee Sin | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 126 | Malphite | −0.81 | −1.00 | −1.00 | −1.00 | −0.07 | −1.00 | +0.00 |
| 127 | Sett | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 128 | Lillia | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 129 | Tristana | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 130 | Riven | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 131 | Pantheon | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 132 | Vi | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 133 | Evelynn | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 134 | Leona | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 135 | Hecarim | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 136 | Udyr | −0.81 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 137 | Kayn | −0.82 | −1.00 | −1.00 | −1.00 | −0.10 | −1.00 | +0.00 |
| 138 | Katarina | −0.82 | −1.00 | −1.00 | −1.00 | −0.11 | −1.00 | +0.00 |
| 139 | Talon | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 140 | Xin Zhao | −0.82 | −1.00 | −1.00 | −1.00 | −0.12 | −1.00 | +0.00 |
| 141 | Camille | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 142 | Ornn | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 143 | Locke | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 144 | Amumu | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 145 | Cho'Gath | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 146 | Blitzcrank | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 147 | Shaco | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 148 | Ekko | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 149 | Viego | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 150 | Illaoi | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 151 | Kassadin | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 152 | Kled | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 153 | Zaahen | −0.82 | −1.00 | −1.00 | −1.00 | −0.16 | −1.00 | +0.00 |
| 154 | Tryndamere | −0.82 | −1.00 | −1.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 155 | Yuumi | −0.83 | −1.00 | −1.00 | −1.00 | −0.30 | – | +0.00 |
| 156 | Darius | −0.83 | −1.00 | −1.00 | −1.00 | −0.19 | −1.00 | +0.00 |
| 157 | Qiyana | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 158 | Zed | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 159 | Shyvana | −0.83 | −1.00 | −1.00 | −1.00 | −0.21 | −1.00 | +0.00 |
| 160 | Bard | −0.83 | −1.00 | −1.00 | −1.00 | −0.33 | – | +0.00 |
| 161 | Nocturne | −0.83 | −1.00 | −1.00 | −1.00 | −0.22 | −1.00 | +0.00 |
| 162 | Yone | −0.84 | −1.00 | −1.00 | −1.00 | −0.25 | −1.00 | +0.00 |
| 163 | Volibear | −0.84 | −1.00 | −1.00 | −1.00 | −0.26 | −1.00 | +0.00 |
| 164 | Aatrox | −0.84 | −1.00 | −1.00 | −1.00 | −0.27 | −1.00 | +0.00 |
| 165 | Gangplank | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 166 | Ambessa | −0.85 | −1.00 | −1.00 | −1.00 | −0.31 | −1.00 | +0.00 |
| 167 | Wukong | −0.85 | −1.00 | −1.00 | −1.00 | −0.32 | −1.00 | +0.00 |
| 168 | Pyke | −0.85 | −1.00 | −1.00 | −1.00 | −0.34 | −1.00 | +0.00 |
| 169 | Olaf | −0.86 | −1.00 | −1.00 | −1.00 | −0.38 | −1.00 | +0.00 |
| 170 | Gwen | −0.86 | −1.00 | −1.00 | −1.00 | −0.41 | −1.00 | +0.00 |
| 171 | Singed | −0.87 | −1.00 | −1.00 | −1.00 | −0.49 | −1.00 | +0.00 |
| 172 | Briar | −0.88 | −1.00 | −1.00 | −1.00 | −0.51 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Teemo's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Teemo's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Teemo` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Vladimir (net +0.41)

- **0.55** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Teemo's Noxious Trap. Untargetable for 2 s, long enough to use ahead of Noxious Trap. (Vladimir W Sanguine Pool → Teemo R Noxious Trap)
- **0.30** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Teemo's Blinding Dart. Untargetable for 2 s, long enough to use ahead of Blinding Dart. (Vladimir W Sanguine Pool → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Vladimir's basic attacks miss for 3 s.

#### 2. Mel (net +0.40)

- **0.54** projectile block: Rebuttal blocks Teemo's Noxious Trap, a projectile. Rebuttal for 0.75 s; Noxious Trap takes 0.25 s to land, enough to react. (Mel W Rebuttal → Teemo R Noxious Trap)
- **0.30** projectile block: Rebuttal blocks Teemo's basic attacks, which are projectiles. Rebuttal lasts 0.75 s on a 26 s cooldown. (Mel W Rebuttal → Teemo basic attacks)
- **0.25** projectile block: Rebuttal blocks Teemo's Blinding Dart, a projectile. Rebuttal for 0.75 s; Blinding Dart takes 0.52 s to land, enough to react. (Mel W Rebuttal → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Mel's basic attacks miss for 3 s.

#### 3. Samira (net +0.34)

- **0.55** projectile block: Blade Whirl blocks Teemo's Noxious Trap, a projectile. Blade Whirl for 0.75 s; Noxious Trap takes 0.25 s to land, enough to react. (Samira W Blade Whirl → Teemo R Noxious Trap)
- **0.30** projectile block: Blade Whirl blocks Teemo's basic attacks, which are projectiles. Blade Whirl lasts 0.75 s on a 22 s cooldown. (Samira W Blade Whirl → Teemo basic attacks)
- **0.27** projectile block: Blade Whirl blocks Teemo's Blinding Dart, a projectile. Blade Whirl for 0.75 s; Blinding Dart takes 0.52 s to land, enough to react. (Samira W Blade Whirl → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Samira's basic attacks miss for 3 s.

#### 4. Yasuo (net +0.33)

- **0.55** projectile block: Wind Wall blocks Teemo's Noxious Trap, a projectile. Wind Wall for 4 s, long enough to use ahead of Noxious Trap. (Yasuo W Wind Wall → Teemo R Noxious Trap)
- **0.39** projectile block: Wind Wall blocks Teemo's basic attacks, which are projectiles. Wind Wall lasts 4 s on a 17 s cooldown. (Yasuo W Wind Wall → Teemo basic attacks)
- **0.29** projectile block: Wind Wall blocks Teemo's Blinding Dart, a projectile. Wind Wall for 4 s, long enough to use ahead of Blinding Dart. (Yasuo W Wind Wall → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Yasuo's basic attacks miss for 3 s.

#### 5. Fizz (net +0.25)

- **0.55** untargetable: Playful makes Fizz untargetable, dodging Teemo's Noxious Trap. Untargetable for 0.75 s; Noxious Trap takes 0.25 s to land, enough to react. (Fizz E Playful → Teemo R Noxious Trap)
- **0.42** untargetable: Playful makes Fizz untargetable, dodging Teemo's Blinding Dart. Untargetable for 0.75 s; Blinding Dart takes 0.52 s to land, enough to react. (Fizz E Playful → Teemo Q Blinding Dart)
- **0.08** reveal: Chum the Waters reveals Teemo through Guerrilla Warfare's stealth. (Fizz R Chum the Waters → Teemo I Guerrilla Warfare)
- Watch out: Blinding Dart's blind makes Fizz's basic attacks miss for 3 s.

#### 6. Braum (net +0.14)

- **0.55** projectile block: Unbreakable blocks Teemo's Noxious Trap, a projectile. Unbreakable for 4 s, long enough to use ahead of Noxious Trap. (Braum E Unbreakable → Teemo R Noxious Trap)
- **0.50** projectile block: Unbreakable blocks Teemo's basic attacks, which are projectiles. Unbreakable lasts 4 s on a 8 s cooldown. (Braum E Unbreakable → Teemo basic attacks)
- **0.42** projectile block: Unbreakable blocks Teemo's Blinding Dart, a projectile. Unbreakable for 4 s, long enough to use ahead of Blinding Dart. (Braum E Unbreakable → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Braum's basic attacks miss for 3 s.

#### 7. Yuumi (net +0.14)

- **0.55** untargetable: You and Me! makes Yuumi untargetable, dodging Teemo's Noxious Trap. Untargetable for ?; Noxious Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Teemo R Noxious Trap)
- **0.45** untargetable: You and Me! makes Yuumi untargetable, dodging Teemo's Blinding Dart. Untargetable for ?; Blinding Dart takes 0.52 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Yuumi's basic attacks miss for 3 s.

#### 8. Lissandra (net +0.13)

- **0.32** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Teemo's Noxious Trap. Untargetable for 2.5 s, long enough to use ahead of Noxious Trap. (Lissandra R Frozen Tomb → Teemo R Noxious Trap)
- **0.20** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Teemo's Blinding Dart. Untargetable for 2.5 s, long enough to use ahead of Blinding Dart. (Lissandra R Frozen Tomb → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Lissandra's basic attacks miss for 3 s.

#### 9. Maokai (net +0.05)

- **0.55** untargetable: Twisted Advance makes Maokai untargetable, dodging Teemo's Noxious Trap. Untargetable for 1.4 s; Noxious Trap takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Teemo R Noxious Trap)
- **0.37** untargetable: Twisted Advance makes Maokai untargetable, dodging Teemo's Blinding Dart. Untargetable for 1.4 s; Blinding Dart takes 0.52 s to land, enough to react. (Maokai W Twisted Advance → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Maokai's basic attacks miss for 3 s.

#### 10. Aurora (net +0.02)

- **0.30** untargetable: Between Worlds makes Aurora untargetable, dodging Teemo's Noxious Trap. Untargetable for 0.4 s; Noxious Trap takes 0.25 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Teemo R Noxious Trap)
- **0.20** untargetable: Between Worlds makes Aurora untargetable, dodging Teemo's Blinding Dart. Untargetable for 0.4 s; Blinding Dart takes 0.52 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Teemo Q Blinding Dart)
- Watch out: Blinding Dart's blind makes Aurora's basic attacks miss for 3 s.

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Vladimir | +0.41 | 0.70 | 0.29 |  |
| 2 | Mel | +0.40 | 0.75 | 0.35 | projectile block (Rebuttal) |
| 3 | Samira | +0.34 | 0.77 | 0.43 | projectile block (Blade Whirl) |
| 4 | Yasuo | +0.33 | 0.90 | 0.57 | projectile block (Wind Wall) |
| 5 | Fizz | +0.25 | 0.84 | 0.59 |  |
| 6 | Braum | +0.14 | 0.91 | 0.77 | projectile block (Unbreakable), projectile block (Unbreakable), projectile block (Unbreakable) |
| 7 | Yuumi | +0.14 | 0.78 | 0.64 |  |
| 8 | Lissandra | +0.13 | 0.42 | 0.29 |  |
| 9 | Maokai | +0.05 | 0.74 | 0.69 |  |
| 10 | Aurora | +0.02 | 0.40 | 0.38 |  |
| 11 | Morgana | +0.02 | 0.33 | 0.31 |  |
| 12 | Master Yi | -0.01 | 0.78 | 0.79 |  |
| 13 | Malzahar | -0.03 | 0.26 | 0.29 |  |
| 14 | Caitlyn | -0.04 | 0.43 | 0.47 |  |
| 15 | Lulu | -0.05 | 0.42 | 0.47 |  |
| 16 | Kayn | -0.06 | 0.44 | 0.50 |  |
| 17 | Bard | -0.08 | 0.42 | 0.50 |  |
| 18 | Gwen | -0.10 | 0.69 | 0.79 |  |
| 19 | Xayah | -0.10 | 0.40 | 0.50 |  |
| 20 | Fiora | -0.11 | 0.72 | 0.83 |  |
| 21 | Kayle | -0.11 | 0.43 | 0.54 |  |
| 22 | Tristana | -0.11 | 0.36 | 0.47 |  |
| 23 | Fiddlesticks | -0.13 | 0.16 | 0.29 |  |
| 24 | Karma | -0.13 | 0.16 | 0.29 |  |
| 25 | Zyra | -0.14 | 0.17 | 0.31 |  |
| 26 | Hwei | -0.14 | 0.16 | 0.30 |  |
| 27 | Evelynn | -0.15 | 0.42 | 0.57 |  |
| 28 | Annie | -0.15 | 0.14 | 0.29 |  |
| 29 | Anivia | -0.19 | 0.12 | 0.31 |  |
| 30 | Zed | -0.20 | 0.40 | 0.60 |  |
| 31 | Heimerdinger | -0.20 | 0.06 | 0.26 |  |
| 32 | LeBlanc | -0.21 | 0.08 | 0.29 |  |
| 33 | Rek'Sai | -0.23 | 0.44 | 0.67 |  |
| 34 | Thresh | -0.23 | 0.08 | 0.31 |  |
| 35 | Sivir | -0.24 | 0.42 | 0.66 |  |
| 36 | Varus | -0.25 | 0.10 | 0.35 |  |
| 37 | Senna | -0.27 | 0.16 | 0.43 |  |
| 38 | Vex | -0.27 | 0.08 | 0.35 |  |
| 39 | Swain | -0.27 | 0.00 | 0.27 |  |
| 40 | Ashe | -0.29 | 0.18 | 0.47 |  |
| 41 | Ahri | -0.29 | 0.00 | 0.29 |  |
| 42 | Aurelion Sol | -0.29 | 0.00 | 0.29 |  |
| 43 | Brand | -0.29 | 0.00 | 0.29 |  |
| 44 | Cassiopeia | -0.29 | 0.00 | 0.29 |  |
| 45 | Ivern | -0.29 | 0.00 | 0.29 |  |
| 46 | Nami | -0.29 | 0.00 | 0.29 |  |
| 47 | Neeko | -0.29 | 0.00 | 0.29 |  |
| 48 | Syndra | -0.29 | 0.00 | 0.29 |  |
| 49 | Kled | -0.31 | 0.34 | 0.65 |  |
| 50 | Kalista | -0.31 | 0.12 | 0.43 |  |
| 51 | Nidalee | -0.31 | 0.08 | 0.39 |  |
| 52 | Karthus | -0.31 | 0.00 | 0.31 |  |
| 53 | Ryze | -0.31 | 0.00 | 0.31 |  |
| 54 | Veigar | -0.31 | 0.00 | 0.31 |  |
| 55 | Yunara | -0.33 | 0.14 | 0.47 |  |
| 56 | Milio | -0.35 | 0.15 | 0.50 |  |
| 57 | Elise | -0.35 | 0.08 | 0.43 |  |
| 58 | Azir | -0.35 | 0.00 | 0.35 |  |
| 59 | Jhin | -0.35 | 0.00 | 0.35 |  |
| 60 | Orianna | -0.35 | 0.00 | 0.35 |  |
| 61 | Soraka | -0.35 | 0.00 | 0.35 |  |
| 62 | Taliyah | -0.35 | 0.00 | 0.35 |  |
| 63 | Vel'Koz | -0.35 | 0.00 | 0.35 |  |
| 64 | Xerath | -0.35 | 0.00 | 0.35 |  |
| 65 | Ziggs | -0.35 | 0.00 | 0.35 |  |
| 66 | Nocturne | -0.36 | 0.48 | 0.84 |  |
| 67 | Rammus | -0.36 | 0.36 | 0.72 |  |
| 68 | Jinx | -0.38 | 0.00 | 0.38 |  |
| 69 | Kennen | -0.38 | 0.00 | 0.38 |  |
| 70 | Kog'Maw | -0.38 | 0.00 | 0.38 |  |
| 71 | Lux | -0.38 | 0.00 | 0.38 |  |
| 72 | Seraphine | -0.38 | 0.00 | 0.38 |  |
| 73 | Akshan | -0.39 | 0.08 | 0.47 |  |
| 74 | Camille | -0.41 | 0.41 | 0.82 |  |
| 75 | Lee Sin | -0.41 | 0.16 | 0.57 |  |
| 76 | Urgot | -0.41 | 0.08 | 0.49 |  |
| 77 | Kai'Sa | -0.42 | 0.08 | 0.50 |  |
| 78 | Renata Glasc | -0.42 | 0.08 | 0.50 |  |
| 79 | Corki | -0.43 | 0.00 | 0.43 |  |
| 80 | Miss Fortune | -0.43 | 0.00 | 0.43 |  |
| 81 | Smolder | -0.43 | 0.00 | 0.43 |  |
| 82 | Zilean | -0.43 | 0.00 | 0.43 |  |
| 83 | Zoe | -0.43 | 0.00 | 0.43 |  |
| 84 | Sylas | -0.45 | 0.08 | 0.53 |  |
| 85 | Gnar | -0.45 | 0.00 | 0.45 |  |
| 86 | Lillia | -0.45 | 0.00 | 0.45 |  |
| 87 | Ambessa | -0.47 | 0.08 | 0.55 |  |
| 88 | Naafiri | -0.47 | 0.08 | 0.55 |  |
| 89 | Janna | -0.47 | 0.00 | 0.47 |  |
| 90 | Graves | -0.48 | 0.00 | 0.48 |  |
| 91 | Lucian | -0.50 | 0.00 | 0.50 |  |
| 92 | Quinn | -0.50 | 0.00 | 0.50 |  |
| 93 | Rakan | -0.50 | 0.00 | 0.50 |  |
| 94 | Yone | -0.50 | 0.00 | 0.50 |  |
| 95 | Shen | -0.51 | 0.36 | 0.87 |  |
| 96 | Warwick | -0.51 | 0.18 | 0.69 |  |
| 97 | Ezreal | -0.51 | 0.00 | 0.51 |  |
| 98 | Akali | -0.52 | 0.08 | 0.60 |  |
| 99 | Udyr | -0.54 | 0.34 | 0.88 |  |
| 100 | Aphelios | -0.54 | 0.06 | 0.60 |  |
| 101 | Ornn | -0.54 | 0.00 | 0.54 |  |
| 102 | Sona | -0.54 | 0.00 | 0.54 |  |
| 103 | Shaco | -0.55 | 0.42 | 0.97 |  |
| 104 | Galio | -0.56 | 0.00 | 0.56 |  |
| 105 | Jax | -0.57 | 0.38 | 0.95 |  |
| 106 | Twitch | -0.57 | 0.00 | 0.57 |  |
| 107 | Nilah | -0.58 | 0.33 | 0.91 |  |
| 108 | Jayce | -0.58 | 0.00 | 0.58 |  |
| 109 | Viktor | -0.58 | 0.00 | 0.58 |  |
| 110 | Zeri | -0.58 | 0.00 | 0.58 |  |
| 111 | Pantheon | -0.59 | 0.35 | 0.94 |  |
| 112 | Pyke | -0.59 | 0.00 | 0.59 |  |
| 113 | Qiyana | -0.60 | 0.00 | 0.60 |  |
| 114 | Draven | -0.62 | 0.00 | 0.62 |  |
| 115 | Hecarim | -0.62 | 0.00 | 0.62 |  |
| 116 | Irelia | -0.62 | 0.00 | 0.62 |  |
| 117 | Jarvan IV | -0.62 | 0.00 | 0.62 |  |
| 118 | Malphite | -0.63 | 0.24 | 0.87 |  |
| 119 | Kha'Zix | -0.65 | 0.00 | 0.65 |  |
| 120 | Kindred | -0.66 | 0.00 | 0.66 |  |
| 121 | Diana | -0.67 | 0.00 | 0.67 |  |
| 122 | Tahm Kench | -0.67 | 0.00 | 0.67 |  |
| 123 | Amumu | -0.69 | 0.00 | 0.69 |  |
| 124 | Poppy | -0.69 | 0.00 | 0.69 |  |
| 125 | Talon | -0.69 | 0.00 | 0.69 |  |
| 126 | Shyvana | -0.70 | 0.00 | 0.70 |  |
| 127 | Zaahen | -0.71 | 0.16 | 0.87 |  |
| 128 | Aatrox | -0.71 | 0.08 | 0.79 |  |
| 129 | Bel'Veth | -0.71 | 0.00 | 0.71 |  |
| 130 | Twisted Fate | -0.72 | 0.08 | 0.80 |  |
| 131 | Leona | -0.72 | 0.00 | 0.72 |  |
| 132 | Nautilus | -0.72 | 0.00 | 0.72 |  |
| 133 | Riven | -0.72 | 0.00 | 0.72 |  |
| 134 | K'Sante | -0.73 | 0.00 | 0.73 |  |
| 135 | Sejuani | -0.75 | 0.00 | 0.75 |  |
| 136 | Sion | -0.76 | 0.18 | 0.94 |  |
| 137 | Alistar | -0.76 | 0.13 | 0.89 |  |
| 138 | Vi | -0.76 | 0.08 | 0.84 |  |
| 139 | Briar | -0.77 | 0.08 | 0.85 |  |
| 140 | Sett | -0.77 | 0.08 | 0.85 |  |
| 141 | Katarina | -0.77 | 0.00 | 0.77 |  |
| 142 | Kassadin | -0.78 | 0.00 | 0.78 |  |
| 143 | Illaoi | -0.79 | 0.08 | 0.87 |  |
| 144 | Vayne | -0.80 | 0.00 | 0.80 |  |
| 145 | Viego | -0.80 | 0.00 | 0.80 |  |
| 146 | Gangplank | -0.85 | 0.21 | 1.06 |  |
| 147 | Skarner | -0.86 | 0.20 | 1.06 |  |
| 148 | Nunu & Willump | -0.86 | 0.17 | 1.03 |  |
| 149 | Zac | -0.86 | 0.08 | 0.94 |  |
| 150 | Tryndamere | -0.86 | 0.00 | 0.86 |  |
| 151 | Gragas | -0.87 | 0.00 | 0.87 |  |
| 152 | Mordekaiser | -0.89 | 0.13 | 1.02 |  |
| 153 | Xin Zhao | -0.90 | 0.20 | 1.10 |  |
| 154 | Nasus | -0.93 | 0.36 | 1.29 |  |
| 155 | Rengar | -0.96 | 0.40 | 1.36 |  |
| 156 | Ekko | -0.97 | 0.00 | 0.97 |  |
| 157 | Locke | -0.97 | 0.00 | 0.97 |  |
| 158 | Wukong | -1.00 | 0.00 | 1.00 |  |
| 159 | Olaf | -1.02 | 0.16 | 1.18 |  |
| 160 | Renekton | -1.02 | 0.00 | 1.02 |  |
| 161 | Garen | -1.03 | 0.28 | 1.31 |  |
| 162 | Singed | -1.03 | 0.00 | 1.03 |  |
| 163 | Cho'Gath | -1.06 | 0.00 | 1.06 |  |
| 164 | Rumble | -1.06 | 0.00 | 1.06 |  |
| 165 | Rell | -1.08 | 0.00 | 1.08 |  |
| 166 | Volibear | -1.09 | 0.00 | 1.09 |  |
| 167 | Taric | -1.13 | 0.00 | 1.13 |  |
| 168 | Darius | -1.21 | 0.00 | 1.21 |  |
| 169 | Trundle | -1.22 | 0.00 | 1.22 |  |
| 170 | Dr. Mundo | -1.26 | 0.00 | 1.26 |  |
| 171 | Yorick | -1.27 | 0.00 | 1.27 |  |
| 172 | Blitzcrank | -1.38 | 0.00 | 1.38 |  |
