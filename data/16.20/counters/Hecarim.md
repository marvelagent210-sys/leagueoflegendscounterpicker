# Counters to Hecarim (patch 26.20)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Hecarim: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Hecarim wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Hecarim --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Kayle | +0.87 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | +0.00 |
| 2 | Kog'Maw | +0.87 | +1.00 | +1.00 | +1.00 | +0.44 | +1.00 | +0.00 |
| 3 | Zeri | +0.86 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +1.00 |
| 4 | Vel'Koz | +0.84 | +1.00 | +1.00 | +1.00 | +0.29 | +1.00 | +0.00 |
| 5 | Camille | +0.84 | +1.00 | +1.00 | +1.00 | +0.04 | – | +1.00 |
| 6 | Syndra | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 7 | Urgot | +0.83 | +1.00 | +1.00 | +1.00 | +0.23 | +1.00 | +0.00 |
| 8 | K'Sante | +0.83 | +1.00 | +1.00 | +1.00 | +0.22 | +1.00 | +0.00 |
| 9 | Twisted Fate | +0.83 | +1.00 | +1.00 | +1.00 | +0.21 | +1.00 | +0.00 |
| 10 | Milio | +0.83 | +1.00 | +1.00 | +1.00 | +0.20 | +1.00 | +0.00 |
| 11 | Neeko | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 12 | Annie | +0.83 | +1.00 | +1.00 | +1.00 | +0.19 | +1.00 | +0.00 |
| 13 | Ryze | +0.83 | +1.00 | +1.00 | +1.00 | +0.18 | +1.00 | +0.00 |
| 14 | Smolder | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 15 | Ashe | +0.82 | +1.00 | +1.00 | +1.00 | +0.16 | +1.00 | +0.00 |
| 16 | Morgana | +0.82 | +1.00 | +1.00 | +1.00 | +0.15 | +1.00 | +0.00 |
| 17 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.14 | +1.00 | +0.00 |
| 18 | Master Yi | +0.82 | +1.00 | +1.00 | +1.00 | −0.08 | – | +1.00 |
| 19 | Ivern | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 20 | Yorick | +0.82 | +1.00 | +1.00 | +1.00 | −0.09 | – | +1.00 |
| 21 | Xayah | +0.82 | +1.00 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 22 | Yunara | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 23 | Lissandra | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 24 | Ambessa | +0.82 | +1.00 | +1.00 | +1.00 | +0.22 | – | +0.00 |
| 25 | Teemo | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 26 | Bard | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 27 | Lucian | +0.81 | +1.00 | +1.00 | +1.00 | +0.09 | +1.00 | +0.00 |
| 28 | Akshan | +0.81 | +1.00 | +1.00 | +1.00 | +0.08 | +1.00 | +0.00 |
| 29 | Varus | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 30 | Swain | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 31 | Cassiopeia | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 32 | Vayne | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 33 | Brand | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 34 | Janna | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 35 | Ahri | +0.81 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 36 | Tristana | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +1.00 | +0.00 |
| 37 | Malphite | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 38 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.18 | – | +1.00 |
| 39 | Quinn | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 40 | Azir | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 41 | Lux | +0.80 | +1.00 | +1.00 | +1.00 | +0.03 | +0.99 | +0.00 |
| 42 | Heimerdinger | +0.80 | +0.97 | +0.98 | +1.00 | +0.09 | +1.00 | +0.00 |
| 43 | Gnar | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 44 | Rakan | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 45 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 46 | Corki | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 47 | Maokai | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 48 | Lulu | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 49 | Rell | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 50 | Nautilus | +0.80 | +1.00 | +1.00 | +1.00 | −0.00 | +1.00 | +0.00 |
| 51 | Fiora | +0.80 | +1.00 | +1.00 | +1.00 | −0.20 | – | +1.00 |
| 52 | Vex | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 53 | Kalista | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 54 | Lillia | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 55 | Hwei | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 56 | Taric | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 57 | Sivir | +0.79 | +1.00 | +1.00 | +1.00 | −0.03 | +1.00 | +0.00 |
| 58 | Mel | +0.79 | +0.97 | +1.00 | +0.96 | +0.06 | +1.00 | +0.00 |
| 59 | Samira | +0.79 | +1.00 | +1.00 | +1.00 | −0.05 | +1.00 | +0.00 |
| 60 | Jinx | +0.79 | +1.00 | +1.00 | +0.98 | +0.02 | +0.92 | +0.00 |
| 61 | Diana | +0.79 | +1.00 | +1.00 | +1.00 | +0.07 | – | +0.00 |
| 62 | Ezreal | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 63 | Kennen | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 64 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 65 | Kai'Sa | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 66 | Ornn | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 67 | Jayce | +0.79 | +1.00 | +1.00 | +1.00 | +0.05 | – | +0.00 |
| 68 | Poppy | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 69 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 70 | Garen | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 71 | Bel'Veth | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 72 | Karma | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 73 | Akali | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 74 | Sejuani | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 75 | Rek'Sai | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 76 | Warwick | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 77 | Sett | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 78 | Mordekaiser | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 79 | Illaoi | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 80 | Viego | +0.77 | +1.00 | +1.00 | +1.00 | −0.02 | – | +0.00 |
| 81 | Volibear | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 82 | Leona | +0.77 | +1.00 | +1.00 | +1.00 | −0.03 | – | +0.00 |
| 83 | Shen | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 84 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.04 | – | +0.00 |
| 85 | Darius | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 86 | Senna | +0.77 | +0.95 | +0.95 | +0.95 | +0.06 | +0.95 | +0.00 |
| 87 | Dr. Mundo | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 88 | Tahm Kench | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 89 | Shyvana | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 90 | Rammus | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 91 | Amumu | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 92 | Galio | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 93 | Singed | +0.77 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 94 | Kayn | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 95 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 96 | Yone | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 97 | Olaf | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 98 | Udyr | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 99 | Zaahen | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 100 | Shaco | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 101 | Vi | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 102 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 103 | Nasus | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 104 | Sion | +0.76 | +1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 105 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 106 | Rumble | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 107 | Lee Sin | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 108 | Kled | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 109 | Irelia | +0.76 | +1.00 | +1.00 | +1.00 | −0.12 | – | +0.00 |
| 110 | Zed | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 111 | Graves | +0.76 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | −1.00 |
| 112 | Zac | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 113 | Alistar | +0.75 | +1.00 | +1.00 | +1.00 | −0.14 | – | +0.00 |
| 114 | Jax | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 115 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 116 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.16 | – | +0.00 |
| 117 | Nocturne | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 118 | Xin Zhao | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 119 | Jhin | +0.71 | +1.00 | +1.00 | +1.00 | −0.00 | +0.06 | +0.00 |
| 120 | Elise | +0.61 | +1.00 | +1.00 | +1.00 | +0.09 | −1.00 | +0.00 |
| 121 | Miss Fortune | +0.56 | +1.00 | +0.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 122 | Soraka | +0.53 | +0.98 | −0.04 | +1.00 | −0.03 | +0.99 | +0.00 |
| 123 | Rengar | +0.38 | +1.00 | +1.00 | −1.00 | +0.29 | – | +0.00 |
| 124 | Viktor | +0.35 | +0.00 | +1.00 | +1.00 | +0.02 | −1.00 | +0.00 |
| 125 | Kassadin | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 126 | Fizz | +0.32 | +1.00 | +1.00 | −1.00 | −0.06 | – | +0.00 |
| 127 | Zilean | +0.30 | −1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 128 | Nami | +0.28 | −0.76 | +1.00 | +1.00 | +0.03 | +0.12 | +0.00 |
| 129 | Gangplank | +0.24 | +1.00 | −1.00 | +1.00 | +0.10 | – | +0.00 |
| 130 | Jarvan IV | +0.23 | +1.00 | −1.00 | +1.00 | +0.07 | – | +0.00 |
| 131 | Nilah | +0.23 | −1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 132 | Riven | +0.21 | −1.00 | +1.00 | +1.00 | −0.10 | – | +0.00 |
| 133 | Ekko | +0.20 | +1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 134 | Malzahar | +0.20 | +1.00 | −1.00 | +1.00 | −0.01 | +0.00 | +0.00 |
| 135 | Draven | +0.16 | +0.00 | +1.00 | −1.00 | +0.06 | +1.00 | +0.00 |
| 136 | Orianna | +0.11 | −1.00 | +1.00 | +1.00 | +0.10 | −1.00 | +0.00 |
| 137 | Zoe | +0.10 | −1.00 | +1.00 | +1.00 | −0.01 | −1.00 | +0.00 |
| 138 | Anivia | +0.07 | +0.13 | +0.12 | +0.08 | −0.12 | +0.08 | +0.00 |
| 139 | Karthus | +0.01 | +0.00 | +0.00 | +0.00 | +0.06 | +0.00 | +0.00 |
| 140 | Nidalee | −0.11 | −1.00 | +1.00 | −1.00 | −0.04 | +0.96 | +0.00 |
| 141 | Kindred | −0.19 | −1.00 | +1.00 | −1.00 | +0.08 | +0.00 | +0.00 |
| 142 | Xerath | −0.20 | +1.00 | −1.00 | −1.00 | +0.00 | +0.00 | +0.00 |
| 143 | LeBlanc | −0.20 | −1.00 | −1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 144 | Twitch | −0.29 | +0.00 | +0.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 145 | Zyra | −0.29 | −1.00 | −1.00 | +1.00 | +0.08 | −0.03 | +0.00 |
| 146 | Ziggs | −0.35 | −1.00 | −1.00 | +0.00 | +0.36 | +1.00 | +0.00 |
| 147 | Pantheon | −0.35 | −1.00 | −1.00 | +1.00 | −0.12 | – | +0.00 |
| 148 | Gragas | −0.45 | −0.48 | −0.48 | −1.00 | −0.09 | +0.00 | +0.00 |
| 149 | Naafiri | −0.49 | +0.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 150 | Sona | −0.49 | −1.00 | −1.00 | +0.50 | +0.05 | −1.00 | +0.00 |
| 151 | Briar | −0.68 | −1.00 | −1.00 | −0.38 | −0.26 | – | +0.00 |
| 152 | Veigar | −0.68 | −1.00 | −1.00 | −1.00 | +0.12 | −0.02 | +0.00 |
| 153 | Caitlyn | −0.69 | −0.60 | −1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 154 | Aurelion Sol | −0.73 | −1.00 | −1.00 | −1.00 | +0.47 | −1.00 | +0.00 |
| 155 | Sylas | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 156 | Evelynn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 157 | Kha'Zix | −0.79 | −1.00 | −1.00 | −1.00 | −0.05 | – | +0.00 |
| 158 | Qiyana | −0.79 | −1.00 | −1.00 | −1.00 | −0.06 | – | +0.00 |
| 159 | Seraphine | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 160 | Nunu & Willump | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 161 | Skarner | −0.79 | −1.00 | −1.00 | −1.00 | −0.08 | – | +0.00 |
| 162 | Taliyah | −0.79 | −1.00 | −1.00 | −1.00 | +0.04 | −1.00 | +0.00 |
| 163 | Blitzcrank | −0.80 | −1.00 | −1.00 | −1.00 | +0.02 | −1.00 | +0.00 |
| 164 | Talon | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 165 | Vladimir | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 166 | Fiddlesticks | −0.80 | −1.00 | −1.00 | −1.00 | −0.00 | −1.00 | +0.00 |
| 167 | Katarina | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 168 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.14 | – | +0.00 |
| 169 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 170 | Yuumi | −0.81 | −1.00 | −1.00 | −1.00 | −0.08 | −1.00 | +0.00 |
| 171 | Pyke | −0.83 | −1.00 | −1.00 | −1.00 | −0.20 | −1.00 | +0.00 |
| 172 | Renata Glasc | −0.83 | −1.00 | −1.00 | −1.00 | +0.12 | −1.00 | −1.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Hecarim's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Hecarim's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Hecarim` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.65)

- **1.00** spell shield: Spell Shield's spell shield blocks Hecarim's Onslaught of Shadows. Spell shield for 1.5 s, long enough to use ahead of Onslaught of Shadows. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hecarim R Onslaught of Shadows)
- **0.75** spell shield: Spell Shield's spell shield blocks Hecarim's Devastating Charge. Spell shield for 1.5 s, long enough to use ahead of Devastating Charge. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Hecarim E Devastating Charge)
- **0.27** range: Sivir's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Sivir basic attacks → Hecarim basic attacks)

#### 2. Morgana (net +1.51)

- **1.00** cc immunity: Black Shield makes Morgana immune to Hecarim's Onslaught of Shadows (fear, slow). Immune for 5 s, long enough to use ahead of Onslaught of Shadows. (Morgana E Black Shield → Hecarim R Onslaught of Shadows)
- **0.80** cc immunity: Black Shield makes Morgana immune to Hecarim's Devastating Charge (airborne, stun). Immune for 5 s, long enough to use ahead of Devastating Charge. (Morgana E Black Shield → Hecarim E Devastating Charge)
- **0.11** range: Morgana's basic attacks reach 275 units farther than Hecarim's (450 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Morgana basic attacks → Hecarim basic attacks)

#### 3. Nocturne (net +1.48)

- **1.00** spell shield: Shroud of Darkness's spell shield blocks Hecarim's Onslaught of Shadows. Spell shield for 1.5 s, long enough to use ahead of Onslaught of Shadows. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hecarim R Onslaught of Shadows)
- **0.80** spell shield: Shroud of Darkness's spell shield blocks Hecarim's Devastating Charge. Spell shield for 1.5 s, long enough to use ahead of Devastating Charge. A spell shield blocks only the first enemy ability that reaches it. (Nocturne W Shroud of Darkness → Hecarim E Devastating Charge)
- **0.08** cc immunity: Paranoia is displacement immune, ignoring Hecarim's Devastating Charge (airborne) during it. Only during Paranoia. (Nocturne R Paranoia → Hecarim E Devastating Charge)

#### 4. Vladimir (net +1.45)

- **1.00** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2 s, long enough to use ahead of Onslaught of Shadows. (Vladimir W Sanguine Pool → Hecarim R Onslaught of Shadows)
- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2 s, long enough to use ahead of Devastating Charge. (Vladimir W Sanguine Pool → Hecarim E Devastating Charge)
- **0.10** range: Vladimir's basic attacks reach 275 units farther than Hecarim's (450 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Vladimir basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows's fear interrupts Vladimir's Tides of Blood (charge-up).

#### 5. Xayah (net +1.42)

- **1.00** untargetable: Featherstorm makes Xayah untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 1.5 s, long enough to use ahead of Onslaught of Shadows. (Xayah R Featherstorm → Hecarim R Onslaught of Shadows)
- **0.40** untargetable: Featherstorm makes Xayah untargetable, dodging Hecarim's Devastating Charge. Untargetable for 1.5 s, long enough to use ahead of Devastating Charge. (Xayah R Featherstorm → Hecarim E Devastating Charge)
- **0.22** range: Xayah's basic attacks reach 350 units farther than Hecarim's (525 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Xayah basic attacks → Hecarim basic attacks)

#### 6. Udyr (net +1.40)

- **1.00** cc immunity: Blazing Stampede makes Udyr immune to Hecarim's Onslaught of Shadows (fear, slow). Immune for 1.5 s, long enough to use ahead of Onslaught of Shadows. (Udyr E Blazing Stampede → Hecarim R Onslaught of Shadows)
- **0.80** cc immunity: Blazing Stampede makes Udyr immune to Hecarim's Devastating Charge (airborne, stun). Immune for 1.5 s, long enough to use ahead of Devastating Charge. (Udyr E Blazing Stampede → Hecarim E Devastating Charge)

#### 7. Master Yi (net +1.38)

- **1.00** untargetable: Alpha Strike makes Master Yi untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for ?; Onslaught of Shadows takes 1.37 s to land, enough to react. (Master Yi Q Alpha Strike → Hecarim R Onslaught of Shadows)
- **0.45** untargetable: Alpha Strike makes Master Yi untargetable, dodging Hecarim's Devastating Charge. Untargetable for ?; Devastating Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. (Master Yi Q Alpha Strike → Hecarim E Devastating Charge)
- **0.20** cleanse: Highlander cleanses Hecarim's Onslaught of Shadows (slow) after it lands. 85 s cooldown; usable while crowd controlled. Doesn't remove fear. (Master Yi R Highlander → Hecarim R Onslaught of Shadows)
- Watch out: Onslaught of Shadows's fear interrupts Master Yi's Meditate (normal channel).

#### 8. Bard (net +1.34)

- **1.00** untargetable: Tempered Fate makes Bard untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Bard R Tempered Fate → Hecarim R Onslaught of Shadows)
- **0.42** untargetable: Tempered Fate makes Bard untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2.5 s, long enough to use ahead of Devastating Charge. (Bard R Tempered Fate → Hecarim E Devastating Charge)
- **0.21** range: Bard's basic attacks reach 325 units farther than Hecarim's (500 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Bard basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Bard's Tempered Fate (stasis) during it.

#### 9. Lissandra (net +1.33)

- **1.00** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 2.5 s, long enough to use ahead of Onslaught of Shadows. (Lissandra R Frozen Tomb → Hecarim R Onslaught of Shadows)
- **0.42** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Hecarim's Devastating Charge. Untargetable for 2.5 s, long enough to use ahead of Devastating Charge. (Lissandra R Frozen Tomb → Hecarim E Devastating Charge)
- **0.14** range: Lissandra's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Lissandra basic attacks → Hecarim basic attacks)
- Watch out: Onslaught of Shadows is displacement immune, ignoring Lissandra's Frozen Tomb (knockdown) during it.

#### 10. Aurora (net +1.32)

- **1.00** untargetable: Between Worlds makes Aurora untargetable, dodging Hecarim's Onslaught of Shadows. Untargetable for 0.4 s; Onslaught of Shadows takes 1.37 s to land, enough to react. Does not destroy inbound projectiles. (Aurora R Between Worlds → Hecarim R Onslaught of Shadows)
- **0.24** untargetable: Between Worlds makes Aurora untargetable, dodging Hecarim's Devastating Charge. Untargetable for 0.4 s; Devastating Charge lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles. (Aurora R Between Worlds → Hecarim E Devastating Charge)
- **0.18** range: Aurora's basic attacks reach 375 units farther than Hecarim's (550 vs 175 attack range). Hecarim closes the gap with Devastating Charge, Onslaught of Shadows. (Aurora basic attacks → Hecarim basic attacks)

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.65 | 1.65 | 0.00 |  |
| 2 | Morgana | +1.51 | 1.51 | 0.00 |  |
| 3 | Nocturne | +1.48 | 1.48 | 0.00 |  |
| 4 | Vladimir | +1.45 | 1.50 | 0.05 |  |
| 5 | Xayah | +1.42 | 1.42 | 0.00 |  |
| 6 | Udyr | +1.40 | 1.40 | 0.00 |  |
| 7 | Master Yi | +1.38 | 1.48 | 0.10 |  |
| 8 | Bard | +1.34 | 1.42 | 0.08 |  |
| 9 | Lissandra | +1.33 | 1.38 | 0.05 |  |
| 10 | Aurora | +1.32 | 1.32 | 0.00 |  |
| 11 | Fiora | +1.31 | 1.31 | 0.00 |  |
| 12 | Gwen | +1.23 | 1.23 | 0.00 |  |
| 13 | Olaf | +1.21 | 1.21 | 0.00 |  |
| 14 | Maokai | +1.17 | 1.24 | 0.07 |  |
| 15 | Mel | +1.17 | 1.17 | 0.00 | projectile block (Rebuttal) |
| 16 | Fizz | +1.16 | 1.24 | 0.08 |  |
| 17 | Evelynn | +1.13 | 1.13 | 0.00 |  |
| 18 | Shaco | +1.13 | 1.13 | 0.00 |  |
| 19 | Gangplank | +1.12 | 1.12 | 0.00 |  |
| 20 | Rengar | +1.12 | 1.12 | 0.00 |  |
| 21 | Zed | +1.12 | 1.12 | 0.00 |  |
| 22 | Sion | +1.09 | 1.23 | 0.14 |  |
| 23 | Samira | +1.09 | 1.18 | 0.09 | projectile block (Blade Whirl) |
| 24 | Milio | +1.09 | 1.16 | 0.07 |  |
| 25 | Rek'Sai | +1.06 | 1.23 | 0.17 |  |
| 26 | Yuumi | +1.04 | 1.42 | 0.38 |  |
| 27 | Camille | +0.99 | 1.14 | 0.15 |  |
| 28 | Zaahen | +0.94 | 1.13 | 0.19 |  |
| 29 | Braum | +0.92 | 1.00 | 0.08 | projectile block (Unbreakable) |
| 30 | Kled | +0.87 | 1.12 | 0.25 |  |
| 31 | Kalista | +0.87 | 1.07 | 0.20 |  |
| 32 | Alistar | +0.85 | 0.97 | 0.12 |  |
| 33 | Kayle | +0.85 | 0.85 | 0.00 |  |
| 34 | Singed | +0.79 | 0.86 | 0.07 | grounding (Mega Adhesive) |
| 35 | Warwick | +0.73 | 1.24 | 0.51 |  |
| 36 | Cassiopeia | +0.72 | 0.72 | 0.00 | grounding (Miasma) |
| 37 | Yasuo | +0.70 | 1.00 | 0.30 | projectile block (Wind Wall) |
| 38 | Kayn | +0.69 | 1.13 | 0.44 |  |
| 39 | Mordekaiser | +0.69 | 0.84 | 0.15 |  |
| 40 | Teemo | +0.62 | 0.62 | 0.00 | blind (Blinding Dart) |
| 41 | Jax | +0.57 | 0.57 | 0.00 | attack dodge (Counter Strike) |
| 42 | Garen | +0.56 | 0.56 | 0.00 |  |
| 43 | Malzahar | +0.54 | 0.92 | 0.38 |  |
| 44 | Lulu | +0.44 | 0.52 | 0.08 |  |
| 45 | Vex | +0.42 | 0.45 | 0.03 |  |
| 46 | Xin Zhao | +0.41 | 0.60 | 0.19 |  |
| 47 | Nilah | +0.40 | 0.48 | 0.08 |  |
| 48 | Viktor | +0.35 | 0.39 | 0.04 |  |
| 49 | Aphelios | +0.34 | 0.34 | 0.00 |  |
| 50 | Jinx | +0.33 | 0.37 | 0.04 |  |
| 51 | Nasus | +0.33 | 0.33 | 0.00 |  |
| 52 | Varus | +0.31 | 0.36 | 0.05 |  |
| 53 | Veigar | +0.31 | 0.35 | 0.04 |  |
| 54 | Ahri | +0.30 | 0.34 | 0.04 |  |
| 55 | Zeri | +0.28 | 0.28 | 0.00 |  |
| 56 | Hwei | +0.27 | 0.34 | 0.07 |  |
| 57 | Kindred | +0.27 | 0.27 | 0.00 |  |
| 58 | Twitch | +0.27 | 0.27 | 0.00 |  |
| 59 | Sona | +0.26 | 0.26 | 0.00 |  |
| 60 | Ashe | +0.24 | 0.24 | 0.00 |  |
| 61 | Yunara | +0.24 | 0.24 | 0.00 |  |
| 62 | Heimerdinger | +0.22 | 0.22 | 0.00 |  |
| 63 | Kai'Sa | +0.22 | 0.22 | 0.00 |  |
| 64 | Senna | +0.22 | 0.22 | 0.00 |  |
| 65 | Pantheon | +0.21 | 0.69 | 0.48 |  |
| 66 | Vayne | +0.20 | 0.27 | 0.07 |  |
| 67 | Corki | +0.20 | 0.20 | 0.00 |  |
| 68 | Elise | +0.20 | 0.20 | 0.00 |  |
| 69 | Ezreal | +0.20 | 0.20 | 0.00 |  |
| 70 | Smolder | +0.20 | 0.20 | 0.00 |  |
| 71 | Zilean | +0.20 | 0.20 | 0.00 |  |
| 72 | Kennen | +0.18 | 0.18 | 0.00 |  |
| 73 | Lux | +0.18 | 0.18 | 0.00 |  |
| 74 | Nidalee | +0.18 | 0.18 | 0.00 |  |
| 75 | Renata Glasc | +0.17 | 0.24 | 0.07 |  |
| 76 | Seraphine | +0.17 | 0.17 | 0.00 |  |
| 77 | Soraka | +0.17 | 0.17 | 0.00 |  |
| 78 | Tristana | +0.16 | 0.24 | 0.08 |  |
| 79 | Kog'Maw | +0.16 | 0.16 | 0.00 |  |
| 80 | Draven | +0.15 | 0.22 | 0.07 |  |
| 81 | Annie | +0.15 | 0.15 | 0.00 |  |
| 82 | Brand | +0.14 | 0.14 | 0.00 |  |
| 83 | Graves | +0.14 | 0.14 | 0.00 |  |
| 84 | Zoe | +0.13 | 0.20 | 0.07 |  |
| 85 | Karma | +0.13 | 0.13 | 0.00 |  |
| 86 | LeBlanc | +0.13 | 0.13 | 0.00 |  |
| 87 | Shen | +0.12 | 0.57 | 0.45 | attack block (Spirit's Refuge) |
| 88 | Skarner | +0.12 | 0.12 | 0.00 |  |
| 89 | Rammus | +0.11 | 0.32 | 0.21 |  |
| 90 | Gnar | +0.11 | 0.19 | 0.08 |  |
| 91 | Jayce | +0.11 | 0.18 | 0.07 |  |
| 92 | Malphite | +0.08 | 0.29 | 0.21 |  |
| 93 | Orianna | +0.08 | 0.16 | 0.08 |  |
| 94 | Illaoi | +0.08 | 0.08 | 0.00 |  |
| 95 | Shyvana | +0.08 | 0.08 | 0.00 |  |
| 96 | Volibear | +0.08 | 0.08 | 0.00 |  |
| 97 | Poppy | +0.07 | 0.38 | 0.31 |  |
| 98 | Syndra | +0.07 | 0.14 | 0.07 |  |
| 99 | Neeko | +0.06 | 0.14 | 0.08 |  |
| 100 | Swain | +0.05 | 0.12 | 0.07 |  |
| 101 | Amumu | +0.05 | 0.10 | 0.05 |  |
| 102 | Ivern | +0.04 | 0.11 | 0.07 |  |
| 103 | Quinn | +0.03 | 0.22 | 0.19 |  |
| 104 | Aurelion Sol | +0.02 | 0.14 | 0.12 |  |
| 105 | Anivia | +0.01 | 0.16 | 0.15 |  |
| 106 | Sett | +0.01 | 0.08 | 0.07 |  |
| 107 | Katarina | 0.00 | 0.18 | 0.18 |  |
| 108 | Akali | 0.00 | 0.00 | 0.00 |  |
| 109 | Ambessa | 0.00 | 0.00 | 0.00 |  |
| 110 | Dr. Mundo | 0.00 | 0.00 | 0.00 |  |
| 111 | Ekko | 0.00 | 0.00 | 0.00 |  |
| 112 | Irelia | 0.00 | 0.00 | 0.00 |  |
| 113 | Kassadin | 0.00 | 0.00 | 0.00 |  |
| 114 | Kha'Zix | 0.00 | 0.00 | 0.00 |  |
| 115 | Leona | 0.00 | 0.00 | 0.00 |  |
| 116 | Locke | 0.00 | 0.00 | 0.00 |  |
| 117 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 118 | Rumble | 0.00 | 0.00 | 0.00 |  |
| 119 | Talon | 0.00 | 0.00 | 0.00 |  |
| 120 | Taric | 0.00 | 0.00 | 0.00 |  |
| 121 | Tryndamere | 0.00 | 0.00 | 0.00 |  |
| 122 | Ziggs | -0.01 | 0.17 | 0.18 |  |
| 123 | Azir | -0.01 | 0.16 | 0.17 |  |
| 124 | K'Sante | -0.01 | 0.16 | 0.17 |  |
| 125 | Zyra | -0.01 | 0.16 | 0.17 |  |
| 126 | Urgot | -0.01 | 0.08 | 0.09 |  |
| 127 | Caitlyn | -0.02 | 0.24 | 0.26 |  |
| 128 | Thresh | -0.02 | 0.11 | 0.13 |  |
| 129 | Lillia | -0.03 | 0.05 | 0.08 |  |
| 130 | Akshan | -0.04 | 0.19 | 0.23 |  |
| 131 | Nunu & Willump | -0.05 | 0.31 | 0.36 |  |
| 132 | Lucian | -0.05 | 0.21 | 0.26 |  |
| 133 | Nami | -0.05 | 0.14 | 0.19 |  |
| 134 | Briar | -0.05 | 0.00 | 0.05 |  |
| 135 | Bel'Veth | -0.07 | 0.00 | 0.07 |  |
| 136 | Cho'Gath | -0.07 | 0.00 | 0.07 |  |
| 137 | Darius | -0.07 | 0.00 | 0.07 |  |
| 138 | Trundle | -0.07 | 0.00 | 0.07 |  |
| 139 | Miss Fortune | -0.08 | 0.20 | 0.28 |  |
| 140 | Yone | -0.08 | 0.18 | 0.26 |  |
| 141 | Ornn | -0.08 | 0.08 | 0.16 |  |
| 142 | Viego | -0.08 | 0.08 | 0.16 |  |
| 143 | Diana | -0.08 | 0.00 | 0.08 |  |
| 144 | Lee Sin | -0.08 | 0.00 | 0.08 |  |
| 145 | Qiyana | -0.08 | 0.00 | 0.08 |  |
| 146 | Jhin | -0.09 | 0.17 | 0.26 |  |
| 147 | Twisted Fate | -0.10 | 0.25 | 0.35 |  |
| 148 | Sylas | -0.10 | 0.00 | 0.10 |  |
| 149 | Zac | -0.11 | 0.20 | 0.31 |  |
| 150 | Vel'Koz | -0.12 | 0.16 | 0.28 |  |
| 151 | Nautilus | -0.12 | 0.00 | 0.12 |  |
| 152 | Pyke | -0.12 | 0.00 | 0.12 |  |
| 153 | Xerath | -0.15 | 0.16 | 0.31 |  |
| 154 | Rakan | -0.15 | 0.06 | 0.21 |  |
| 155 | Yorick | -0.15 | 0.00 | 0.15 |  |
| 156 | Karthus | -0.17 | 0.11 | 0.28 |  |
| 157 | Wukong | -0.17 | 0.00 | 0.17 |  |
| 158 | Aatrox | -0.18 | 0.00 | 0.18 |  |
| 159 | Blitzcrank | -0.19 | 0.00 | 0.19 |  |
| 160 | Ryze | -0.20 | 0.15 | 0.35 |  |
| 161 | Riven | -0.21 | 0.00 | 0.21 |  |
| 162 | Jarvan IV | -0.22 | 0.08 | 0.30 |  |
| 163 | Fiddlesticks | -0.25 | 0.11 | 0.36 |  |
| 164 | Gragas | -0.25 | 0.00 | 0.25 |  |
| 165 | Rell | -0.25 | 0.00 | 0.25 |  |
| 166 | Sejuani | -0.25 | 0.00 | 0.25 |  |
| 167 | Vi | -0.27 | 0.08 | 0.35 |  |
| 168 | Janna | -0.30 | 0.22 | 0.52 |  |
| 169 | Tahm Kench | -0.34 | 0.00 | 0.34 |  |
| 170 | Naafiri | -0.40 | 0.00 | 0.40 |  |
| 171 | Taliyah | -0.47 | 0.16 | 0.63 |  |
| 172 | Galio | -0.67 | 0.00 | 0.67 |  |
