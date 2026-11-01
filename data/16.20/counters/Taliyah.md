# Counters to Taliyah (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Taliyah: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Taliyah wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Taliyah --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Sylas | +0.86 | +1.00 | +1.00 | +1.00 | +0.38 | +1.00 | +0.00 |
| 2 | Fiora | +0.85 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.50 |
| 3 | Rengar | +0.85 | +1.00 | +1.00 | +1.00 | +0.31 | +1.00 | +0.00 |
| 4 | Warwick | +0.84 | +1.00 | +1.00 | +1.00 | +0.26 | +1.00 | +0.00 |
| 5 | Malphite | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 6 | Rell | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 7 | Sion | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 8 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.50 |
| 9 | Kayle | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 10 | Viego | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 11 | Maokai | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 12 | Skarner | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 13 | Vel'Koz | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 14 | Tristana | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 15 | Kassadin | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 16 | Annie | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 17 | Jarvan IV | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 18 | Naafiri | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 19 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 20 | Garen | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 21 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 22 | Rammus | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 23 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.15 | +1.00 | +0.50 |
| 24 | Galio | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 25 | Zaahen | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 26 | Nilah | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 27 | Fizz | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 28 | Katarina | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 29 | Yasuo | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 30 | Singed | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 31 | Evelynn | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 32 | Wukong | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 33 | Olaf | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 34 | Volibear | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 35 | Dr. Mundo | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 36 | Irelia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 37 | Caitlyn | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 38 | Sejuani | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 39 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 40 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 41 | Swain | +0.80 | +1.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 42 | Akali | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 43 | Bel'Veth | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 44 | Sett | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 45 | Urgot | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +0.98 | +0.00 |
| 46 | Poppy | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 47 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 48 | Kha'Zix | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 49 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 50 | Jax | +0.80 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 51 | Ziggs | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 52 | Ekko | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 53 | Master Yi | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 54 | Hecarim | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 55 | Amumu | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 56 | Nocturne | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 57 | Mordekaiser | +0.79 | +1.00 | +1.00 | +1.00 | −0.04 | +1.00 | +0.00 |
| 58 | Nautilus | +0.79 | +1.00 | +1.00 | +1.00 | −0.01 | +0.94 | +0.00 |
| 59 | Shaco | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 60 | Riven | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 61 | Briar | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 62 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 63 | Darius | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 64 | Udyr | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 65 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 66 | Camille | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 67 | Tryndamere | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 68 | Kayn | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 69 | Zed | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 70 | Renekton | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 71 | Talon | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 72 | Rumble | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 73 | Rakan | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 74 | Graves | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 75 | Leona | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 76 | Qiyana | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 77 | Lee Sin | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 78 | Shyvana | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 79 | Xayah | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 80 | Jhin | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 81 | Xin Zhao | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 82 | Illaoi | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 83 | Locke | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 84 | Heimerdinger | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 85 | Gragas | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 86 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | +0.12 | +0.64 | +0.00 |
| 87 | Gwen | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 88 | Morgana | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 89 | Jinx | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 90 | Nasus | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 91 | Sivir | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 92 | Corki | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 93 | Cho'Gath | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 94 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | −0.14 | +1.00 | +0.00 |
| 95 | Smolder | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 96 | Zilean | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 97 | Teemo | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 98 | Draven | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 99 | Zoe | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 100 | Syndra | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 101 | Azir | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 102 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 103 | Vayne | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 104 | Viktor | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 105 | Aphelios | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 106 | Vi | +0.77 | +1.00 | +1.00 | +1.00 | −0.18 | +1.00 | +0.00 |
| 107 | Rek'Sai | +0.77 | +1.00 | +1.00 | +1.00 | −0.10 | +0.87 | +0.00 |
| 108 | Miss Fortune | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 109 | Aurora | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 110 | Kai'Sa | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 111 | Varus | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 112 | Sona | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 113 | Yone | +0.77 | +1.00 | +1.00 | +1.00 | −0.21 | +1.00 | +0.00 |
| 114 | Janna | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 115 | Ryze | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 116 | Lucian | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 117 | Nami | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 118 | Orianna | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 119 | Elise | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 120 | Zeri | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 121 | Kalista | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 122 | Ezreal | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 123 | Kennen | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 124 | Neeko | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 125 | Mel | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 126 | Cassiopeia | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 127 | Samira | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 128 | Karma | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 129 | Ahri | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 130 | Hwei | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 131 | Ivern | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 132 | Akshan | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 133 | Yunara | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 134 | Milio | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 135 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.26 | +1.00 | +0.00 |
| 136 | Twisted Fate | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 137 | Nidalee | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 138 | Lux | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 139 | Kindred | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 140 | Brand | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 141 | Seraphine | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 142 | Ashe | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 143 | Kog'Maw | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 144 | Alistar | +0.76 | +1.00 | +1.00 | +1.00 | −0.02 | +0.58 | +0.00 |
| 145 | Quinn | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 146 | Twitch | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 147 | Vladimir | +0.75 | +1.00 | +1.00 | +1.00 | −0.19 | – | +0.00 |
| 148 | Bard | +0.74 | +1.00 | +1.00 | +1.00 | −0.22 | – | +0.00 |
| 149 | Fiddlesticks | +0.74 | +1.00 | +1.00 | +1.00 | −0.24 | – | +0.00 |
| 150 | Braum | +0.73 | +1.00 | +1.00 | +1.00 | −0.05 | +0.35 | +0.00 |
| 151 | Taric | +0.73 | +1.00 | +1.00 | +1.00 | −0.03 | +0.30 | +0.00 |
| 152 | Shen | +0.71 | +1.00 | +1.00 | +1.00 | −0.04 | +0.15 | +0.00 |
| 153 | Senna | +0.71 | +0.87 | +0.89 | +1.00 | −0.02 | – | +0.00 |
| 154 | Zyra | +0.70 | +0.88 | +0.86 | +1.00 | −0.06 | – | +0.00 |
| 155 | Renata Glasc | +0.68 | +0.84 | +0.84 | +1.00 | −0.08 | – | +0.00 |
| 156 | Lissandra | +0.67 | +1.00 | +0.56 | +1.00 | +0.12 | – | +0.00 |
| 157 | LeBlanc | +0.47 | +0.33 | +0.54 | +1.00 | +0.02 | – | +0.00 |
| 158 | Yuumi | +0.44 | +0.82 | +0.81 | +0.77 | −0.12 | −1.00 | +0.00 |
| 159 | Tahm Kench | +0.43 | +0.29 | +0.28 | +1.00 | −0.07 | +0.97 | +0.00 |
| 160 | Ornn | +0.39 | +0.23 | +0.22 | +1.00 | −0.05 | +0.84 | +0.00 |
| 161 | Vex | +0.38 | +0.11 | +0.54 | +1.00 | −0.12 | – | +0.00 |
| 162 | Veigar | +0.37 | +0.26 | +0.29 | +1.00 | −0.03 | – | +0.00 |
| 163 | Soraka | +0.29 | +0.13 | +0.13 | +1.00 | −0.04 | – | +0.00 |
| 164 | Nunu & Willump | +0.28 | +0.21 | +0.57 | +0.20 | +0.17 | +0.17 | +0.00 |
| 165 | Anivia | +0.25 | +0.07 | +0.10 | +1.00 | −0.10 | – | +0.00 |
| 166 | Xerath | +0.13 | −1.00 | +0.69 | +1.00 | −0.01 | – | +0.00 |
| 167 | Blitzcrank | +0.12 | +0.28 | +0.09 | +0.11 | +0.01 | +0.02 | +0.00 |
| 168 | Pyke | +0.11 | +1.00 | −0.90 | +1.00 | −0.13 | −1.00 | +0.00 |
| 169 | Aurelion Sol | +0.10 | +0.05 | +0.03 | +0.02 | +0.43 | – | +0.00 |
| 170 | Karthus | −0.02 | −0.01 | −0.04 | −0.02 | +0.01 | – | +0.00 |
| 171 | Malzahar | −0.28 | −0.93 | −0.83 | +1.00 | −0.07 | – | +0.00 |
| 172 | Thresh | −0.35 | −0.98 | −0.98 | +1.00 | −0.18 | – | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Taliyah's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Taliyah's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Taliyah` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Rell (net +2.24)

- **0.48** interrupt: Ferromancy: Crash Down's airborne interrupts Taliyah's Weaver's Wall (movement channel). Ferromancy: Crash Down must land during the channel. (Rell W Ferromancy: Crash Down → Taliyah R Weaver's Wall)
- **0.48** interrupt: Ferromancy: Mount Up's airborne interrupts Taliyah's Weaver's Wall (movement channel). Ferromancy: Mount Up must land during the channel. (Rell W Ferromancy: Mount Up → Taliyah R Weaver's Wall)
- **0.48** interrupt: Full Tilt's stun interrupts Taliyah's Weaver's Wall (movement channel). Full Tilt must land during the channel. (Rell E Full Tilt → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 350 units farther than Rell's (525 vs 175 attack range).

#### 2. Zaahen (net +2.01)

- **0.95** cc immunity: Grim Deliverance makes Zaahen immune to Taliyah's Weaver's Wall (airborne). Immune for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Zaahen R Grim Deliverance → Taliyah R Weaver's Wall)
- **0.48** interrupt: Dreaded Return's airborne interrupts Taliyah's Weaver's Wall (movement channel). Dreaded Return must land during the channel. (Zaahen W Dreaded Return → Taliyah R Weaver's Wall)
- **0.48** interrupt: The Darkin Glaive's airborne interrupts Taliyah's Weaver's Wall (movement channel). The Darkin Glaive must land during the channel. (Zaahen Q The Darkin Glaive → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 350 units farther than Zaahen's (525 vs 175 attack range).

#### 3. Yasuo (net +1.97)

- **0.95** projectile block: Wind Wall blocks Taliyah's Weaver's Wall, a projectile. Wind Wall for 4 s, long enough to use ahead of Weaver's Wall. (Yasuo W Wind Wall → Taliyah R Weaver's Wall)
- **0.48** interrupt: Last Breath's airborne interrupts Taliyah's Weaver's Wall (movement channel). Last Breath must land during the channel. (Yasuo R Last Breath → Taliyah R Weaver's Wall)
- **0.48** interrupt: Steel Tempest's airborne interrupts Taliyah's Weaver's Wall (movement channel). Steel Tempest must land during the channel. (Yasuo Q Steel Tempest → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 350 units farther than Yasuo's (525 vs 175 attack range).

#### 4. Braum (net +1.91)

- **0.95** projectile block: Unbreakable blocks Taliyah's Weaver's Wall, a projectile. Unbreakable for 4 s, long enough to use ahead of Weaver's Wall. (Braum E Unbreakable → Taliyah R Weaver's Wall)
- **0.48** interrupt: Concussive Blows's stun interrupts Taliyah's Weaver's Wall (movement channel). Concussive Blows must land during the channel. (Braum I Concussive Blows → Taliyah R Weaver's Wall)
- **0.48** interrupt: Glacial Fissure's airborne interrupts Taliyah's Weaver's Wall (movement channel). Glacial Fissure must land during the channel. (Braum R Glacial Fissure → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 400 units farther than Braum's (525 vs 125 attack range).

#### 5. Fizz (net +1.83)

- **0.95** untargetable: Playful makes Fizz untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 0.75 s; Weaver's Wall takes 4.33 s to land, enough to react. (Fizz E Playful → Taliyah R Weaver's Wall)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Taliyah's Seismic Shove. Untargetable for 0.75 s; Seismic Shove takes 0.25 s to land, enough to react. (Fizz E Playful → Taliyah W Seismic Shove)
- **0.70** untargetable: Playful makes Fizz untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 0.75 s; Unraveled Earth takes 0.25 s to land, enough to react. (Fizz E Playful → Taliyah E Unraveled Earth)
- Watch out: Taliyah's basic attacks reach 350 units farther than Fizz's (525 vs 175 attack range).

#### 6. Kled (net +1.71)

- **0.95** cc immunity: Chaaaaaaaarge!!! makes Kled immune to Taliyah's Weaver's Wall (airborne). Immune for ?; Weaver's Wall takes 4.33 s to land, enough to react. (Kled R Chaaaaaaaarge!!! → Taliyah R Weaver's Wall)
- **0.48** interrupt: Bear Trap on a Rope's airborne interrupts Taliyah's Weaver's Wall (movement channel). Bear Trap on a Rope must land during the channel. (Kled Q Bear Trap on a Rope → Taliyah R Weaver's Wall)
- **0.48** interrupt: Chaaaaaaaarge!!!'s airborne interrupts Taliyah's Weaver's Wall (movement channel). Chaaaaaaaarge!!! must land during the channel. (Kled R Chaaaaaaaarge!!! → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 275 units farther than Kled's (525 vs 250 attack range).

#### 7. Camille (net +1.68)

- **0.95** untargetable: The Hextech Ultimatum makes Camille untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 0.5 s; Weaver's Wall takes 4.33 s to land, enough to react. (Camille R The Hextech Ultimatum → Taliyah R Weaver's Wall)
- **0.48** interrupt: The Hextech Ultimatum's airborne interrupts Taliyah's Weaver's Wall (movement channel). The Hextech Ultimatum must land during the channel. (Camille R The Hextech Ultimatum → Taliyah R Weaver's Wall)
- **0.48** interrupt: Wall Dive's airborne interrupts Taliyah's Weaver's Wall (movement channel). Wall Dive must land during the channel. (Camille E Wall Dive → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 400 units farther than Camille's (525 vs 125 attack range).

#### 8. Alistar (net +1.66)

- **0.76** cleanse: Unbreakable Will cleanses Taliyah's Weaver's Wall (airborne) after it lands. 80 s cooldown; usable while crowd controlled. (Alistar R Unbreakable Will → Taliyah R Weaver's Wall)
- **0.48** interrupt: Pulverize's airborne interrupts Taliyah's Weaver's Wall (movement channel). Pulverize must land during the channel. (Alistar Q Pulverize → Taliyah R Weaver's Wall)
- **0.48** interrupt: Trample's stun interrupts Taliyah's Weaver's Wall (movement channel). Trample must land during the channel. (Alistar E Trample → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 400 units farther than Alistar's (525 vs 125 attack range).

#### 9. Maokai (net +1.66)

- **0.95** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Weaver's Wall. Untargetable for 1.4 s; Weaver's Wall takes 4.33 s to land, enough to react. (Maokai W Twisted Advance → Taliyah R Weaver's Wall)
- **0.70** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Unraveled Earth. Untargetable for 1.4 s; Unraveled Earth takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Taliyah E Unraveled Earth)
- **0.62** untargetable: Twisted Advance makes Maokai untargetable, dodging Taliyah's Seismic Shove. Untargetable for 1.4 s; Seismic Shove takes 0.25 s to land, enough to react. (Maokai W Twisted Advance → Taliyah W Seismic Shove)
- Watch out: Taliyah's basic attacks reach 400 units farther than Maokai's (525 vs 125 attack range).

#### 10. K'Sante (net +1.59)

- **0.48** interrupt: All Out's airborne interrupts Taliyah's Weaver's Wall (movement channel). All Out must land during the channel. (K'Sante R All Out → Taliyah R Weaver's Wall)
- **0.48** interrupt: Ntofo Strikes's airborne interrupts Taliyah's Weaver's Wall (movement channel). Ntofo Strikes must land during the channel. (K'Sante Q Ntofo Strikes → Taliyah R Weaver's Wall)
- **0.48** interrupt: Path Maker's airborne interrupts Taliyah's Weaver's Wall (movement channel). Path Maker must land during the channel. (K'Sante W Path Maker → Taliyah R Weaver's Wall)
- Watch out: Taliyah's basic attacks reach 375 units farther than K'Sante's (525 vs 150 attack range).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Rell | +2.24 | 2.40 | 0.16 |  |
| 2 | Zaahen | +2.01 | 2.17 | 0.16 |  |
| 3 | Yasuo | +1.97 | 2.13 | 0.16 | projectile block (Wind Wall) |
| 4 | Braum | +1.91 | 2.18 | 0.27 | projectile block (Unbreakable) |
| 5 | Fizz | +1.83 | 1.95 | 0.12 |  |
| 6 | Kled | +1.71 | 1.80 | 0.09 |  |
| 7 | Camille | +1.68 | 1.81 | 0.13 |  |
| 8 | Alistar | +1.66 | 1.93 | 0.27 |  |
| 9 | Maokai | +1.66 | 1.93 | 0.27 |  |
| 10 | K'Sante | +1.59 | 1.72 | 0.13 |  |
| 11 | Rek'Sai | +1.56 | 1.72 | 0.16 |  |
| 12 | Evelynn | +1.51 | 1.69 | 0.18 |  |
| 13 | Shaco | +1.51 | 1.69 | 0.18 |  |
| 14 | Nocturne | +1.47 | 1.74 | 0.27 |  |
| 15 | Lissandra | +1.37 | 1.37 | 0.00 | dash stop (Frozen Tomb) |
| 16 | Yone | +1.36 | 1.48 | 0.12 | dash stop (Fate Sealed) |
| 17 | Bard | +1.32 | 1.32 | 0.00 |  |
| 18 | Morgana | +1.31 | 1.41 | 0.10 |  |
| 19 | Fiora | +1.28 | 1.53 | 0.25 |  |
| 20 | Udyr | +1.27 | 1.54 | 0.27 |  |
| 21 | Aurora | +1.23 | 1.23 | 0.00 |  |
| 22 | Viktor | +1.20 | 1.20 | 0.00 | dash stop (Gravity Field) |
| 23 | Xayah | +1.20 | 1.20 | 0.00 |  |
| 24 | Sejuani | +1.19 | 1.44 | 0.25 |  |
| 25 | Mel | +1.14 | 1.14 | 0.00 | projectile block (Rebuttal) |
| 26 | Samira | +1.14 | 1.14 | 0.00 | projectile block (Blade Whirl) |
| 27 | Gwen | +1.12 | 1.37 | 0.25 |  |
| 28 | Kalista | +1.10 | 1.10 | 0.00 |  |
| 29 | Vladimir | +1.09 | 1.40 | 0.31 |  |
| 30 | Lulu | +1.09 | 1.09 | 0.00 |  |
| 31 | Ornn | +1.08 | 1.24 | 0.16 |  |
| 32 | Heimerdinger | +1.06 | 1.06 | 0.00 |  |
| 33 | Zed | +1.02 | 1.20 | 0.18 |  |
| 34 | Anivia | +1.00 | 1.00 | 0.00 |  |
| 35 | Vex | +1.00 | 1.00 | 0.00 | dash stop (Doom 'n Gloom) |
| 36 | Sion | +0.99 | 1.81 | 0.82 |  |
| 37 | Gnar | +0.96 | 0.96 | 0.00 |  |
| 38 | Nami | +0.96 | 0.96 | 0.00 |  |
| 39 | Renata Glasc | +0.96 | 0.96 | 0.00 |  |
| 40 | Seraphine | +0.96 | 0.96 | 0.00 |  |
| 41 | Amumu | +0.93 | 1.20 | 0.27 | dash stop (Curse of the Sad Mummy) |
| 42 | Thresh | +0.93 | 0.96 | 0.03 |  |
| 43 | Blitzcrank | +0.91 | 1.44 | 0.53 |  |
| 44 | Rakan | +0.86 | 0.96 | 0.10 |  |
| 45 | Milio | +0.85 | 0.85 | 0.00 |  |
| 46 | Sivir | +0.85 | 0.85 | 0.00 |  |
| 47 | Urgot | +0.84 | 0.96 | 0.12 |  |
| 48 | Malzahar | +0.83 | 1.95 | 1.12 | dash stop (Nether Grasp) |
| 49 | Sett | +0.83 | 1.10 | 0.27 |  |
| 50 | Xin Zhao | +0.82 | 1.05 | 0.23 |  |
| 51 | Riven | +0.78 | 0.96 | 0.18 |  |
| 52 | Master Yi | +0.76 | 1.51 | 0.75 |  |
| 53 | Aurelion Sol | +0.74 | 0.96 | 0.22 |  |
| 54 | Ahri | +0.72 | 0.72 | 0.00 | dash stop (Charm) |
| 55 | Hwei | +0.72 | 0.72 | 0.00 | dash stop (Grim Visage) |
| 56 | Veigar | +0.72 | 0.72 | 0.00 | dash stop (Event Horizon) |
| 57 | Cassiopeia | +0.71 | 0.71 | 0.00 |  |
| 58 | Leona | +0.69 | 0.96 | 0.27 |  |
| 59 | Olaf | +0.68 | 1.21 | 0.53 |  |
| 60 | Rengar | +0.64 | 1.17 | 0.53 |  |
| 61 | Tristana | +0.64 | 0.64 | 0.00 |  |
| 62 | Gangplank | +0.62 | 1.15 | 0.53 |  |
| 63 | Volibear | +0.59 | 0.76 | 0.17 |  |
| 64 | Ashe | +0.55 | 0.55 | 0.00 |  |
| 65 | Malphite | +0.53 | 0.80 | 0.27 |  |
| 66 | Nilah | +0.53 | 0.73 | 0.20 |  |
| 67 | Annie | +0.53 | 0.53 | 0.00 |  |
| 68 | Jarvan IV | +0.50 | 0.62 | 0.12 |  |
| 69 | Azir | +0.48 | 0.48 | 0.00 |  |
| 70 | Brand | +0.48 | 0.48 | 0.00 |  |
| 71 | Draven | +0.48 | 0.48 | 0.00 |  |
| 72 | Elise | +0.48 | 0.48 | 0.00 |  |
| 73 | Jayce | +0.48 | 0.48 | 0.00 |  |
| 74 | Jinx | +0.48 | 0.48 | 0.00 | dash stop (Flame Chompers!) |
| 75 | Kennen | +0.48 | 0.48 | 0.00 |  |
| 76 | Neeko | +0.48 | 0.48 | 0.00 |  |
| 77 | Orianna | +0.48 | 0.48 | 0.00 |  |
| 78 | Sona | +0.48 | 0.48 | 0.00 |  |
| 79 | Soraka | +0.48 | 0.48 | 0.00 |  |
| 80 | Swain | +0.48 | 0.48 | 0.00 |  |
| 81 | Syndra | +0.48 | 0.48 | 0.00 |  |
| 82 | Vayne | +0.48 | 0.48 | 0.00 |  |
| 83 | Ziggs | +0.48 | 0.48 | 0.00 |  |
| 84 | Zilean | +0.48 | 0.48 | 0.00 |  |
| 85 | Zoe | +0.48 | 0.48 | 0.00 |  |
| 86 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 87 | Hecarim | +0.47 | 0.63 | 0.16 |  |
| 88 | Viego | +0.44 | 1.10 | 0.66 |  |
| 89 | Cho'Gath | +0.43 | 0.96 | 0.53 |  |
| 90 | Pyke | +0.40 | 0.96 | 0.56 |  |
| 91 | Shyvana | +0.37 | 0.62 | 0.25 |  |
| 92 | Sylas | +0.36 | 0.48 | 0.12 |  |
| 93 | Jax | +0.35 | 0.62 | 0.27 |  |
| 94 | Briar | +0.35 | 0.48 | 0.13 |  |
| 95 | Lillia | +0.35 | 0.48 | 0.13 |  |
| 96 | Teemo | +0.35 | 0.35 | 0.00 |  |
| 97 | Zac | +0.34 | 1.68 | 1.34 | dash stop (Stretching Strikes) |
| 98 | Wukong | +0.32 | 0.48 | 0.16 |  |
| 99 | Bel'Veth | +0.31 | 0.48 | 0.17 |  |
| 100 | Qiyana | +0.31 | 0.48 | 0.17 |  |
| 101 | Garen | +0.30 | 0.77 | 0.47 |  |
| 102 | Ambessa | +0.30 | 0.48 | 0.18 |  |
| 103 | Lee Sin | +0.30 | 0.48 | 0.18 |  |
| 104 | Rammus | +0.28 | 1.23 | 0.95 |  |
| 105 | Gragas | +0.28 | 0.96 | 0.68 |  |
| 106 | Kayn | +0.27 | 1.69 | 1.42 |  |
| 107 | Kayle | +0.27 | 0.27 | 0.00 |  |
| 108 | Yuumi | +0.26 | 1.48 | 1.22 |  |
| 109 | Irelia | +0.26 | 0.48 | 0.22 |  |
| 110 | Aatrox | +0.25 | 0.48 | 0.23 |  |
| 111 | Nautilus | +0.25 | 0.48 | 0.23 |  |
| 112 | Diana | +0.23 | 0.48 | 0.25 |  |
| 113 | Kassadin | +0.23 | 0.48 | 0.25 |  |
| 114 | Renekton | +0.21 | 0.48 | 0.27 |  |
| 115 | Warwick | +0.19 | 2.13 | 1.94 | dash stop (Infinite Duress) |
| 116 | Singed | +0.18 | 0.71 | 0.53 |  |
| 117 | Poppy | +0.17 | 1.02 | 0.85 | dash stop (Steadfast Presence) |
| 118 | Skarner | +0.11 | 0.61 | 0.50 |  |
| 119 | Aphelios | +0.10 | 0.10 | 0.00 |  |
| 120 | Mordekaiser | +0.07 | 0.54 | 0.47 |  |
| 121 | Senna | +0.06 | 0.06 | 0.00 |  |
| 122 | Darius | +0.01 | 0.48 | 0.47 |  |
| 123 | Trundle | +0.01 | 0.48 | 0.47 |  |
| 124 | Yorick | +0.01 | 0.48 | 0.47 |  |
| 125 | Illaoi | +0.01 | 0.28 | 0.27 |  |
| 126 | Corki | 0.00 | 0.00 | 0.00 |  |
| 127 | Ezreal | 0.00 | 0.00 | 0.00 |  |
| 128 | Kai'Sa | 0.00 | 0.00 | 0.00 |  |
| 129 | Karma | 0.00 | 0.00 | 0.00 |  |
| 130 | Kindred | 0.00 | 0.00 | 0.00 |  |
| 131 | Kog'Maw | 0.00 | 0.00 | 0.00 |  |
| 132 | LeBlanc | 0.00 | 0.00 | 0.00 |  |
| 133 | Lux | 0.00 | 0.00 | 0.00 |  |
| 134 | Nidalee | 0.00 | 0.00 | 0.00 |  |
| 135 | Smolder | 0.00 | 0.00 | 0.00 |  |
| 136 | Twitch | 0.00 | 0.00 | 0.00 |  |
| 137 | Yunara | 0.00 | 0.00 | 0.00 |  |
| 138 | Zeri | 0.00 | 0.00 | 0.00 |  |
| 139 | Quinn | -0.02 | 0.48 | 0.50 |  |
| 140 | Taric | -0.02 | 0.48 | 0.50 |  |
| 141 | Tahm Kench | -0.03 | 1.44 | 1.47 |  |
| 142 | Graves | -0.04 | 0.00 | 0.04 |  |
| 143 | Vi | -0.06 | 1.10 | 1.16 |  |
| 144 | Akali | -0.18 | 0.00 | 0.18 |  |
| 145 | Ekko | -0.18 | 0.00 | 0.18 |  |
| 146 | Talon | -0.18 | 0.00 | 0.18 |  |
| 147 | Janna | -0.20 | 0.96 | 1.16 |  |
| 148 | Tryndamere | -0.23 | 0.00 | 0.23 |  |
| 149 | Nasus | -0.26 | 0.27 | 0.53 |  |
| 150 | Varus | -0.26 | 0.00 | 0.26 |  |
| 151 | Fiddlesticks | -0.27 | 0.96 | 1.23 |  |
| 152 | Kha'Zix | -0.27 | 0.00 | 0.27 |  |
| 153 | Locke | -0.27 | 0.00 | 0.27 |  |
| 154 | Vel'Koz | -0.30 | 0.48 | 0.78 |  |
| 155 | Ivern | -0.34 | 0.00 | 0.34 |  |
| 156 | Xerath | -0.44 | 0.48 | 0.92 |  |
| 157 | Galio | -0.50 | 1.39 | 1.89 |  |
| 158 | Dr. Mundo | -0.53 | 0.00 | 0.53 |  |
| 159 | Rumble | -0.53 | 0.00 | 0.53 |  |
| 160 | Twisted Fate | -0.55 | 0.48 | 1.03 |  |
| 161 | Caitlyn | -0.68 | 0.11 | 0.79 |  |
| 162 | Akshan | -0.77 | 0.00 | 0.77 |  |
| 163 | Shen | -0.78 | 0.75 | 1.53 |  |
| 164 | Jhin | -0.79 | 0.00 | 0.79 |  |
| 165 | Lucian | -0.79 | 0.00 | 0.79 |  |
| 166 | Miss Fortune | -0.81 | 0.00 | 0.81 |  |
| 167 | Karthus | -0.94 | 0.00 | 0.94 |  |
| 168 | Katarina | -1.00 | 0.00 | 1.00 |  |
| 169 | Ryze | -1.05 | 0.00 | 1.05 |  |
| 170 | Nunu & Willump | -1.22 | 0.60 | 1.82 |  |
| 171 | Pantheon | -1.33 | 0.30 | 1.63 |  |
| 172 | Naafiri | -1.39 | 0.00 | 1.39 |  |
