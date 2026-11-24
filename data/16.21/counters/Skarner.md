# Counters to Skarner (patch 26.21)

## Simulated duels

The duel simulator played each of the 172 other champions with a simulator kit against Skarner: both at level 20 with 15,000 gold of plain stats, each side's spent against the other's, through six scenarios (PLAN.md §6). Scores run from −1 (Skarner wins every time) to +1 (the champion does). Run `npm run duel -- <champion> Skarner --log brawl` to watch a fight.

| # | Champion | Score | You engage | Enemy engages | Brawl | Short trade | Spacing | Escape |
|--:|---|--:|--:|--:|--:|--:|--:|--:|
| 1 | Vayne | +0.84 | +1.00 | +1.00 | +1.00 | +0.24 | +1.00 | +0.00 |
| 2 | Twisted Fate | +0.83 | +1.00 | +1.00 | +1.00 | +0.17 | +1.00 | +0.00 |
| 3 | Aphelios | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 4 | Poppy | +0.82 | +1.00 | +1.00 | +1.00 | +0.25 | – | +0.00 |
| 5 | Udyr | +0.82 | +1.00 | +1.00 | +1.00 | +0.13 | +1.00 | +0.00 |
| 6 | Bard | +0.82 | +1.00 | +1.00 | +1.00 | +0.11 | +1.00 | +0.00 |
| 7 | Rakan | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 8 | Quinn | +0.82 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 9 | Olaf | +0.81 | +1.00 | +1.00 | +1.00 | +0.10 | +1.00 | +0.00 |
| 10 | Nilah | +0.81 | +1.00 | +1.00 | +1.00 | +0.21 | – | +0.00 |
| 11 | Neeko | +0.81 | +0.97 | +1.00 | +1.00 | +0.12 | +1.00 | +0.00 |
| 12 | Fiora | +0.81 | +1.00 | +1.00 | +1.00 | +0.20 | – | +0.00 |
| 13 | Morgana | +0.81 | +1.00 | +1.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 14 | Nasus | +0.81 | +1.00 | +1.00 | +1.00 | +0.06 | +1.00 | +0.00 |
| 15 | Milio | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 16 | Corki | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 17 | Warwick | +0.81 | +1.00 | +1.00 | +1.00 | +0.17 | – | +0.00 |
| 18 | Ivern | +0.81 | +1.00 | +1.00 | +1.00 | +0.04 | +1.00 | +0.00 |
| 19 | Kled | +0.80 | +1.00 | +1.00 | +1.00 | +0.16 | – | +0.00 |
| 20 | Gangplank | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 21 | Kayle | +0.80 | +1.00 | +1.00 | +1.00 | +0.02 | +1.00 | +0.00 |
| 22 | Jarvan IV | +0.80 | +1.00 | +1.00 | +1.00 | +0.15 | – | +0.00 |
| 23 | Riven | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 24 | Illaoi | +0.80 | +1.00 | +1.00 | +1.00 | +0.01 | +1.00 | +0.00 |
| 25 | Shyvana | +0.80 | +1.00 | +1.00 | +1.00 | +0.00 | +1.00 | +0.00 |
| 26 | Zac | +0.80 | +1.00 | +1.00 | +1.00 | +0.14 | – | +0.00 |
| 27 | Kog'Maw | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 28 | Aurora | +0.80 | +1.00 | +1.00 | +1.00 | −0.01 | +1.00 | +0.00 |
| 29 | Graves | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 30 | Sivir | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 31 | Trundle | +0.80 | +1.00 | +1.00 | +1.00 | −0.02 | +1.00 | +0.00 |
| 32 | Ambessa | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 33 | K'Sante | +0.80 | +1.00 | +1.00 | +1.00 | +0.11 | – | +0.00 |
| 34 | Yorick | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 35 | Garen | +0.79 | +1.00 | +1.00 | +1.00 | +0.10 | – | +0.00 |
| 36 | Sett | +0.79 | +1.00 | +1.00 | +1.00 | +0.09 | – | +0.00 |
| 37 | Hecarim | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 38 | Gnar | +0.79 | +1.00 | +1.00 | +1.00 | −0.06 | +1.00 | +0.00 |
| 39 | Cho'Gath | +0.79 | +1.00 | +1.00 | +1.00 | +0.08 | – | +0.00 |
| 40 | Varus | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 41 | Teemo | +0.79 | +1.00 | +1.00 | +1.00 | −0.07 | +1.00 | +0.00 |
| 42 | Smolder | +0.79 | +1.00 | +1.00 | +1.00 | −0.08 | +1.00 | +0.00 |
| 43 | Kalista | +0.79 | +1.00 | +1.00 | +1.00 | −0.09 | +1.00 | +0.00 |
| 44 | Zeri | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 45 | Mordekaiser | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 46 | Kai'Sa | +0.78 | +1.00 | +1.00 | +1.00 | −0.10 | +1.00 | +0.00 |
| 47 | Pantheon | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 48 | Alistar | +0.78 | +1.00 | +1.00 | +1.00 | +0.04 | – | +0.00 |
| 49 | Yunara | +0.78 | +1.00 | +1.00 | +1.00 | −0.11 | +1.00 | +0.00 |
| 50 | Taric | +0.78 | +1.00 | +1.00 | +1.00 | +0.03 | – | +0.00 |
| 51 | Jax | +0.78 | +1.00 | +1.00 | +1.00 | −0.12 | +1.00 | +0.00 |
| 52 | Zaahen | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 53 | Dr. Mundo | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 54 | Orianna | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 55 | Yone | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 56 | Camille | +0.78 | +1.00 | +1.00 | +1.00 | +0.02 | – | +0.00 |
| 57 | Lulu | +0.78 | +1.00 | +1.00 | +1.00 | −0.13 | +1.00 | +0.00 |
| 58 | Darius | +0.78 | +1.00 | +1.00 | +1.00 | +0.01 | – | +0.00 |
| 59 | Yasuo | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 60 | Volibear | +0.78 | +1.00 | +1.00 | +1.00 | +0.00 | – | +0.00 |
| 61 | Diana | +0.78 | +1.00 | +1.00 | +1.00 | −0.00 | – | +0.00 |
| 62 | Fizz | +0.78 | +1.00 | +1.00 | +1.00 | −0.01 | – | +0.00 |
| 63 | Ashe | +0.78 | +1.00 | +1.00 | +1.00 | −0.16 | +1.00 | +0.00 |
| 64 | Briar | +0.77 | +1.00 | +1.00 | +1.00 | −0.05 | – | +0.00 |
| 65 | Bel'Veth | +0.77 | +1.00 | +1.00 | +1.00 | −0.06 | – | +0.00 |
| 66 | Renekton | +0.77 | +1.00 | +1.00 | +1.00 | −0.07 | – | +0.00 |
| 67 | Viego | +0.76 | +1.00 | +1.00 | +1.00 | −0.08 | – | +0.00 |
| 68 | Rek'Sai | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 69 | Braum | +0.76 | +1.00 | +1.00 | +1.00 | −0.09 | – | +0.00 |
| 70 | Vi | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 71 | Karma | +0.76 | +0.98 | +0.96 | +1.00 | −0.17 | +1.00 | +0.00 |
| 72 | Zilean | +0.76 | +1.00 | +1.00 | +0.92 | −0.16 | +1.00 | +0.00 |
| 73 | Lee Sin | +0.76 | +1.00 | +1.00 | +1.00 | −0.11 | – | +0.00 |
| 74 | Gwen | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 75 | Aatrox | +0.76 | +1.00 | +1.00 | +1.00 | −0.13 | – | +0.00 |
| 76 | Xin Zhao | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 77 | Tryndamere | +0.75 | +1.00 | +1.00 | +1.00 | −0.15 | – | +0.00 |
| 78 | Wukong | +0.75 | +1.00 | +1.00 | +1.00 | −0.17 | – | +0.00 |
| 79 | Kayn | +0.73 | +0.91 | +0.91 | +0.91 | +0.13 | – | +0.00 |
| 80 | Annie | +0.73 | +1.00 | +1.00 | +0.52 | +0.14 | +1.00 | +0.00 |
| 81 | Elise | +0.70 | +1.00 | +1.00 | +1.00 | +0.03 | −0.04 | +0.00 |
| 82 | Malphite | +0.68 | +1.00 | +1.00 | +0.50 | +0.09 | – | +0.00 |
| 83 | Urgot | +0.62 | +1.00 | +1.00 | +1.00 | +0.13 | −1.00 | +0.00 |
| 84 | Sion | +0.57 | +1.00 | +1.00 | +0.00 | +0.11 | – | +0.00 |
| 85 | Xayah | +0.56 | +1.00 | +0.00 | +1.00 | +0.07 | +1.00 | +0.00 |
| 86 | Shen | +0.52 | +0.00 | +1.00 | +1.00 | +0.12 | – | +0.00 |
| 87 | Janna | +0.42 | +1.00 | +1.00 | −0.95 | +0.07 | +1.00 | +0.00 |
| 88 | Ezreal | +0.38 | +1.00 | +1.00 | −1.00 | −0.11 | +1.00 | +0.00 |
| 89 | Lillia | +0.37 | +0.96 | +0.96 | −0.99 | −0.06 | +1.00 | +0.00 |
| 90 | Gragas | +0.35 | +1.00 | +1.00 | −1.00 | +0.13 | – | +0.00 |
| 91 | Master Yi | +0.34 | +0.00 | +1.00 | +0.00 | −0.10 | +1.00 | +0.00 |
| 92 | Rammus | +0.33 | +1.00 | +1.00 | −1.00 | −0.02 | – | +0.00 |
| 93 | Rumble | +0.31 | +1.00 | +1.00 | −1.00 | −0.12 | – | +0.00 |
| 94 | Hwei | +0.25 | −0.13 | −0.13 | +0.97 | +0.12 | +1.00 | +0.00 |
| 95 | Kassadin | +0.23 | +1.00 | −1.00 | +1.00 | +0.05 | – | +0.00 |
| 96 | Jayce | +0.23 | +1.00 | −1.00 | +1.00 | +0.04 | – | +0.00 |
| 97 | Fiddlesticks | +0.21 | +1.00 | +1.00 | −1.00 | +0.09 | −1.00 | +0.00 |
| 98 | Irelia | +0.18 | +1.00 | −0.43 | +0.14 | −0.04 | – | +0.00 |
| 99 | Jinx | +0.17 | +0.90 | +0.90 | −0.92 | −0.14 | −0.76 | +0.00 |
| 100 | Tristana | +0.14 | +0.51 | +0.51 | −1.00 | −0.10 | +1.00 | +0.00 |
| 101 | Tahm Kench | +0.11 | +0.17 | +0.17 | +0.02 | +0.06 | – | +0.00 |
| 102 | Lux | +0.06 | +0.08 | +0.08 | +0.00 | +0.11 | +0.06 | +0.00 |
| 103 | Caitlyn | +0.04 | −0.30 | +1.00 | −1.00 | +0.13 | +0.47 | +0.00 |
| 104 | Singed | +0.04 | +0.08 | +0.06 | +0.09 | −0.11 | – | +0.00 |
| 105 | Anivia | −0.00 | +0.04 | +0.03 | −0.06 | −0.08 | +0.05 | +0.00 |
| 106 | Lucian | −0.00 | +1.00 | −0.55 | −1.00 | −0.12 | +1.00 | +0.00 |
| 107 | Nocturne | −0.06 | −1.00 | +0.00 | +1.00 | −0.01 | – | +0.00 |
| 108 | Soraka | −0.08 | −0.09 | −0.09 | −0.10 | +0.04 | −0.23 | +0.00 |
| 109 | Swain | −0.10 | +0.90 | −0.99 | −0.85 | +0.04 | +0.90 | +0.00 |
| 110 | Malzahar | −0.14 | +0.00 | −0.97 | +0.01 | +0.03 | +1.00 | +0.00 |
| 111 | Veigar | −0.16 | −0.02 | −0.59 | −0.10 | +0.11 | −0.01 | +0.00 |
| 112 | Nami | −0.19 | +0.05 | +0.05 | −0.58 | −0.17 | −0.78 | +0.00 |
| 113 | Maokai | −0.22 | −1.00 | +1.00 | −1.00 | −0.01 | – | +0.00 |
| 114 | Galio | −0.23 | −1.00 | +1.00 | −1.00 | −0.07 | – | +0.00 |
| 115 | Heimerdinger | −0.24 | +0.11 | +0.07 | −1.00 | +0.12 | −1.00 | +0.00 |
| 116 | Brand | −0.24 | −0.69 | +0.08 | −1.00 | +0.10 | +1.00 | +0.00 |
| 117 | Zyra | −0.27 | −0.16 | −0.15 | −0.93 | +0.07 | −0.13 | +0.00 |
| 118 | Viktor | −0.32 | +0.01 | −0.52 | −0.83 | −0.12 | −0.05 | +0.00 |
| 119 | Azir | −0.37 | −0.20 | +0.00 | −1.00 | −0.17 | −1.00 | +0.00 |
| 120 | Draven | −0.47 | −0.83 | −0.68 | −0.97 | +0.04 | +1.00 | +0.00 |
| 121 | Mel | −0.50 | −0.96 | +0.04 | −0.98 | +0.08 | −0.90 | +0.00 |
| 122 | Syndra | −0.54 | −0.85 | −1.00 | +0.04 | +0.13 | −1.00 | +0.00 |
| 123 | Jhin | −0.56 | −0.91 | −0.91 | −0.57 | −0.05 | +0.19 | +0.00 |
| 124 | Rell | −0.58 | −1.00 | −1.00 | −1.00 | +0.14 | +1.00 | +0.00 |
| 125 | Senna | −0.59 | −1.00 | −1.00 | +0.01 | +0.05 | −1.00 | +0.00 |
| 126 | Kennen | −0.60 | −0.95 | −1.00 | −1.00 | −0.08 | +1.00 | +0.00 |
| 127 | Ryze | −0.61 | −1.00 | −1.00 | −1.00 | +0.07 | +0.78 | +0.00 |
| 128 | Vel'Koz | −0.67 | −0.90 | −0.90 | −0.94 | +0.10 | −0.52 | +0.00 |
| 129 | Rengar | −0.73 | −1.00 | −1.00 | −1.00 | +0.27 | – | +0.00 |
| 130 | Blitzcrank | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 131 | Ornn | −0.76 | −1.00 | −1.00 | −1.00 | +0.10 | – | +0.00 |
| 132 | Vex | −0.76 | −0.96 | −0.96 | −0.81 | −0.13 | −1.00 | +0.00 |
| 133 | Amumu | −0.77 | −1.00 | −1.00 | −1.00 | +0.07 | – | +0.00 |
| 134 | Nautilus | −0.77 | −1.00 | −1.00 | −1.00 | +0.06 | – | +0.00 |
| 135 | Nunu & Willump | −0.77 | −1.00 | −1.00 | −1.00 | +0.05 | – | +0.00 |
| 136 | Zed | −0.77 | −1.00 | −1.00 | −1.00 | +0.03 | – | +0.00 |
| 137 | Ahri | −0.77 | −1.00 | −1.00 | −1.00 | +0.14 | −0.95 | +0.00 |
| 138 | Shaco | −0.78 | −1.00 | −1.00 | −1.00 | −0.01 | – | +0.00 |
| 139 | Ziggs | −0.78 | −1.00 | −1.00 | −1.00 | +0.14 | −1.00 | +0.00 |
| 140 | Lissandra | −0.78 | −1.00 | −1.00 | −1.00 | +0.13 | −1.00 | +0.00 |
| 141 | Leona | −0.78 | −1.00 | −1.00 | −1.00 | −0.03 | – | +0.00 |
| 142 | Cassiopeia | −0.78 | −1.00 | −1.00 | −1.00 | +0.11 | −1.00 | +0.00 |
| 143 | Naafiri | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 144 | Pyke | −0.78 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 145 | Sylas | −0.79 | −1.00 | −1.00 | −1.00 | −0.04 | – | +0.00 |
| 146 | Xerath | −0.79 | −1.00 | −1.00 | −1.00 | +0.10 | −1.00 | +0.00 |
| 147 | Zoe | −0.79 | −1.00 | −1.00 | −1.00 | +0.07 | −1.00 | +0.00 |
| 148 | Evelynn | −0.79 | −1.00 | −1.00 | −1.00 | −0.07 | – | +0.00 |
| 149 | Renata Glasc | −0.79 | −1.00 | −1.00 | −1.00 | +0.06 | −1.00 | +0.00 |
| 150 | Sejuani | −0.80 | −1.00 | −1.00 | −1.00 | −0.12 | – | +0.00 |
| 151 | Akshan | −0.80 | −1.00 | −1.00 | −1.00 | +0.01 | −1.00 | +0.00 |
| 152 | Ekko | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 153 | Kha'Zix | −0.80 | −1.00 | −1.00 | −1.00 | −0.13 | – | +0.00 |
| 154 | LeBlanc | −0.80 | −1.00 | −1.00 | −1.00 | −0.01 | −1.00 | +0.00 |
| 155 | Locke | −0.80 | −1.00 | −1.00 | −1.00 | −0.16 | – | +0.00 |
| 156 | Taliyah | −0.81 | −1.00 | −1.00 | −1.00 | −0.04 | −1.00 | +0.00 |
| 157 | Talon | −0.81 | −1.00 | −1.00 | −1.00 | −0.17 | – | +0.00 |
| 158 | Thresh | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 159 | Katarina | −0.81 | −1.00 | −1.00 | −1.00 | −0.18 | – | +0.00 |
| 160 | Samira | −0.81 | −1.00 | −1.00 | −1.00 | −0.05 | −1.00 | +0.00 |
| 161 | Karthus | −0.81 | −1.00 | −0.98 | −1.00 | −0.10 | −1.00 | +0.00 |
| 162 | Akali | −0.81 | −1.00 | −1.00 | −1.00 | −0.19 | – | +0.00 |
| 163 | Qiyana | −0.81 | −1.00 | −1.00 | −1.00 | −0.20 | – | +0.00 |
| 164 | Aurelion Sol | −0.81 | −1.00 | −1.00 | −1.00 | −0.09 | −1.00 | +0.00 |
| 165 | Twitch | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 166 | Miss Fortune | −0.82 | −1.00 | −1.00 | −1.00 | −0.13 | −1.00 | +0.00 |
| 167 | Seraphine | −0.82 | −1.00 | −1.00 | −1.00 | −0.14 | −1.00 | +0.00 |
| 168 | Nidalee | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 169 | Kindred | −0.82 | −1.00 | −1.00 | −1.00 | −0.15 | −1.00 | +0.00 |
| 170 | Sona | −0.83 | −1.00 | −1.00 | −1.00 | −0.18 | −1.00 | +0.00 |
| 171 | Vladimir | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |
| 172 | Yuumi | −0.84 | −1.00 | −1.00 | −1.00 | −0.29 | −1.00 | +0.00 |

## Interaction ledger estimates

Every champion ranked by what its kit does against Skarner's, from the interaction ledger: projectile blocks, spell shields,
parries, dash stops, crowd control and its defenses, range and more (PLAN.md §5). This ranking is **partial**: it weighs the
interactions but doesn't play the fight out. The duel simulator replaces it as each champion's behavior is verified.

"For" sums the interactions in the champion's favor, "against" those in Skarner's; net = for − against.
A hard counter shuts down part of a kit every time it is used (projectile block, attack dodge, attack block, blind, disarm, attack speed slow, attack reflect, dash stop, grounding, range) with an impact of 0.4 or more (0.5 for range).
Run `npm run matchup -- <champion> Skarner` for the full ledger of a matchup, with sources.

### Top 10

#### 1. Sivir (net +1.91)

- **0.88** range: Sivir's basic attacks reach 350 units farther than Skarner's (500 vs 150 attack range). Skarner has no dash or blink to close the gap. (Sivir basic attacks → Skarner basic attacks)
- **0.80** spell shield: Spell Shield's spell shield blocks Skarner's Impale. Spell shield for 1.5 s, long enough to use ahead of Impale. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Skarner R Impale)
- **0.45** spell shield: Spell Shield's spell shield blocks Skarner's Ixtal's Impact. Spell shield for 1.5 s, long enough to use ahead of Ixtal's Impact. A spell shield blocks only the first enemy ability that reaches it. (Sivir E Spell Shield → Skarner E Ixtal's Impact)

#### 2. Xayah (net +1.59)

- **0.75** untargetable: Featherstorm makes Xayah untargetable, dodging Skarner's Impale. Untargetable for 1.5 s, long enough to use ahead of Impale. (Xayah R Featherstorm → Skarner R Impale)
- **0.72** range: Xayah's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Xayah basic attacks → Skarner basic attacks)
- **0.23** untargetable: Featherstorm makes Xayah untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 1.5 s, long enough to use ahead of Ixtal's Impact. (Xayah R Featherstorm → Skarner E Ixtal's Impact)

#### 3. Bard (net +1.51)

- **0.80** untargetable: Tempered Fate makes Bard untargetable, dodging Skarner's Impale. Untargetable for 2.5 s, long enough to use ahead of Impale. (Bard R Tempered Fate → Skarner R Impale)
- **0.67** range: Bard's basic attacks reach 350 units farther than Skarner's (500 vs 150 attack range). Skarner has no dash or blink to close the gap. (Bard basic attacks → Skarner basic attacks)
- **0.24** untargetable: Tempered Fate makes Bard untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2.5 s, long enough to use ahead of Ixtal's Impact. (Bard R Tempered Fate → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Bard's Cosmic Binding (slow).

#### 4. Morgana (net +1.35)

- **0.80** cc immunity: Black Shield makes Morgana immune to Skarner's Impale (suppression). Immune for 5 s, long enough to use ahead of Impale. (Morgana E Black Shield → Skarner R Impale)
- **0.45** cc immunity: Black Shield makes Morgana immune to Skarner's Ixtal's Impact (stun, suppression). Immune for 5 s, long enough to use ahead of Ixtal's Impact. (Morgana E Black Shield → Skarner E Ixtal's Impact)
- **0.36** range: Morgana's basic attacks reach 300 units farther than Skarner's (450 vs 150 attack range). Skarner has no dash or blink to close the gap. (Morgana basic attacks → Skarner basic attacks)
- Watch out: Ixtal's Impact makes Skarner immune to Morgana's Soul Shackles (slow).

#### 5. Milio (net +1.28)

- **0.72** range: Milio's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Milio basic attacks → Skarner basic attacks)
- **0.52** cleanse: Breath of Life cleanses Skarner's Impale (suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Skarner R Impale)
- **0.17** cleanse: Breath of Life cleanses Skarner's Ixtal's Impact (stun, suppression) after it lands. 130 s cooldown; usable while crowd controlled. (Milio R Breath of Life → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Milio's Ultra Mega Fire Kick (slow).

#### 6. Vladimir (net +1.22)

- **0.80** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Skarner's Impale. Untargetable for 2 s, long enough to use ahead of Impale. (Vladimir W Sanguine Pool → Skarner R Impale)
- **0.45** untargetable: Sanguine Pool makes Vladimir untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2 s, long enough to use ahead of Ixtal's Impact. (Vladimir W Sanguine Pool → Skarner E Ixtal's Impact)
- **0.33** range: Vladimir's basic attacks reach 300 units farther than Skarner's (450 vs 150 attack range). Skarner has no dash or blink to close the gap. (Vladimir basic attacks → Skarner basic attacks)
- Watch out: Ixtal's Impact makes Skarner immune to Vladimir's Sanguine Pool (slow).

#### 7. Lissandra (net +1.21)

- **0.80** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Skarner's Impale. Untargetable for 2.5 s, long enough to use ahead of Impale. (Lissandra R Frozen Tomb → Skarner R Impale)
- **0.44** range: Lissandra's basic attacks reach 400 units farther than Skarner's (550 vs 150 attack range). Skarner has no dash or blink to close the gap. (Lissandra basic attacks → Skarner basic attacks)
- **0.24** untargetable: Frozen Tomb makes Lissandra untargetable, dodging Skarner's Ixtal's Impact. Untargetable for 2.5 s, long enough to use ahead of Ixtal's Impact. (Lissandra R Frozen Tomb → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Lissandra's Frozen Tomb (slow).

#### 8. Kalista (net +1.20)

- **0.61** range: Kalista's basic attacks reach 375 units farther than Skarner's (525 vs 150 attack range). Skarner has no dash or blink to close the gap. (Kalista basic attacks → Skarner basic attacks)
- **0.54** cleanse: Fate's Call cleanses Skarner's Impale (suppression) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Skarner R Impale)
- **0.18** cleanse: Fate's Call cleanses Skarner's Ixtal's Impact (stun, suppression) after it lands. 120 s cooldown; usable while crowd controlled. (Kalista R Fate's Call → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Kalista's Rend (slow).

#### 9. Kayle (net +1.12)

- **0.72** range: Kayle's basic attacks reach 475 units farther than Skarner's (625 vs 150 attack range). Skarner has no dash or blink to close the gap. (Kayle basic attacks → Skarner basic attacks)
- **0.40** invulnerable: Divine Judgment makes Kayle invulnerable to Skarner's Impale (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Impale. (Kayle R Divine Judgment → Skarner R Impale)
- **0.12** invulnerable: Divine Judgment makes Kayle invulnerable to Skarner's Ixtal's Impact (its crowd control still applies). Invulnerable for 2.5 s, long enough to use ahead of Ixtal's Impact. (Kayle R Divine Judgment → Skarner E Ixtal's Impact)
- Watch out: Ixtal's Impact makes Skarner immune to Kayle's Radiant Blast (slow).

#### 10. Yuumi (net +1.05)

- **0.80** untargetable: You and Me! makes Yuumi untargetable, dodging Skarner's Impale. Untargetable for ?; Impale takes 0.75 s to land, enough to react. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Skarner R Impale)
- **0.59** range: Yuumi's basic attacks reach 275 units farther than Skarner's (425 vs 150 attack range). Skarner has no dash or blink to close the gap. (Yuumi basic attacks → Skarner basic attacks)
- **0.27** untargetable: You and Me! makes Yuumi untargetable, dodging Skarner's Ixtal's Impact. Untargetable for ?; Ixtal's Impact lands within 0 s, faster than a 0.25 s reaction, so it needs prediction. Does not destroy inbound projectiles, special cased to be targetable to turrets. (Yuumi W You and Me! → Skarner E Ixtal's Impact)
- Watch out: Impale's suppression interrupts Yuumi's Final Chapter (normal channel).

### Full ranking

| # | Champion | Net | For | Against | Hard counters |
|--:|---|--:|--:|--:|---|
| 1 | Sivir | +1.91 | 1.91 | 0.00 | range (attacks) |
| 2 | Xayah | +1.59 | 1.59 | 0.00 | range (attacks) |
| 3 | Bard | +1.51 | 1.59 | 0.08 | range (attacks) |
| 4 | Morgana | +1.35 | 1.42 | 0.07 |  |
| 5 | Milio | +1.28 | 1.37 | 0.09 | range (attacks) |
| 6 | Vladimir | +1.22 | 1.36 | 0.14 |  |
| 7 | Lissandra | +1.21 | 1.36 | 0.15 |  |
| 8 | Kalista | +1.20 | 1.26 | 0.06 | range (attacks) |
| 9 | Kayle | +1.12 | 1.18 | 0.06 | range (attacks) |
| 10 | Yuumi | +1.05 | 1.53 | 0.48 | range (attacks) |
| 11 | Aurora | +1.04 | 1.40 | 0.36 | range (attacks) |
| 12 | Fiora | +1.02 | 1.11 | 0.09 |  |
| 13 | Udyr | +1.00 | 1.07 | 0.07 |  |
| 14 | Nocturne | +0.94 | 1.03 | 0.09 |  |
| 15 | Master Yi | +0.93 | 1.04 | 0.11 |  |
| 16 | Kled | +0.92 | 1.01 | 0.09 |  |
| 17 | Rek'Sai | +0.92 | 0.92 | 0.00 |  |
| 18 | Zaahen | +0.89 | 0.89 | 0.00 |  |
| 19 | Olaf | +0.88 | 0.94 | 0.06 |  |
| 20 | Lulu | +0.87 | 1.02 | 0.15 | range (attacks) |
| 21 | Gwen | +0.87 | 0.94 | 0.07 |  |
| 22 | Samira | +0.87 | 0.87 | 0.00 | range (attacks) |
| 23 | Teemo | +0.86 | 1.06 | 0.20 | range (attacks), blind (Blinding Dart) |
| 24 | Sona | +0.83 | 0.83 | 0.00 | range (attacks) |
| 25 | Maokai | +0.82 | 0.94 | 0.12 |  |
| 26 | Kindred | +0.82 | 0.88 | 0.06 | range (attacks) |
| 27 | Zeri | +0.82 | 0.88 | 0.06 | range (attacks) |
| 28 | Camille | +0.81 | 0.87 | 0.06 |  |
| 29 | Fizz | +0.79 | 0.94 | 0.15 |  |
| 30 | Gangplank | +0.75 | 0.85 | 0.10 |  |
| 31 | Zed | +0.75 | 0.82 | 0.07 |  |
| 32 | Alistar | +0.75 | 0.75 | 0.00 |  |
| 33 | Sion | +0.72 | 0.96 | 0.24 |  |
| 34 | Mel | +0.72 | 0.81 | 0.09 | range (attacks) |
| 35 | Aphelios | +0.71 | 0.87 | 0.16 | range (attacks) |
| 36 | Renata Glasc | +0.71 | 0.77 | 0.06 | range (attacks) |
| 37 | Ashe | +0.68 | 0.72 | 0.04 | range (attacks) |
| 38 | Evelynn | +0.66 | 0.87 | 0.21 |  |
| 39 | Tristana | +0.65 | 0.72 | 0.07 | range (attacks) |
| 40 | Corki | +0.65 | 0.65 | 0.00 | range (attacks) |
| 41 | Elise | +0.65 | 0.65 | 0.00 | range (attacks) |
| 42 | Ezreal | +0.65 | 0.65 | 0.00 | range (attacks) |
| 43 | Draven | +0.63 | 0.72 | 0.09 | range (attacks) |
| 44 | Yunara | +0.63 | 0.72 | 0.09 | range (attacks) |
| 45 | Twitch | +0.61 | 0.86 | 0.25 | range (attacks) |
| 46 | Zilean | +0.59 | 0.65 | 0.06 | range (attacks) |
| 47 | Vayne | +0.58 | 0.86 | 0.28 | range (attacks) |
| 48 | Kennen | +0.58 | 0.58 | 0.00 | range (attacks) |
| 49 | Zoe | +0.56 | 0.65 | 0.09 | range (attacks) |
| 50 | Nidalee | +0.56 | 0.56 | 0.00 | range (attacks) |
| 51 | Malzahar | +0.55 | 0.92 | 0.37 |  |
| 52 | Smolder | +0.55 | 0.65 | 0.10 | range (attacks) |
| 53 | Rengar | +0.53 | 0.86 | 0.33 |  |
| 54 | Viktor | +0.52 | 0.61 | 0.09 | range (attacks) |
| 55 | Lux | +0.52 | 0.58 | 0.06 | range (attacks) |
| 56 | Kai'Sa | +0.50 | 0.72 | 0.22 | range (attacks) |
| 57 | Jayce | +0.50 | 0.57 | 0.07 | range (attacks) |
| 58 | Quinn | +0.48 | 0.72 | 0.24 | range (attacks) |
| 59 | Veigar | +0.48 | 0.48 | 0.00 |  |
| 60 | Zyra | +0.48 | 0.48 | 0.00 |  |
| 61 | Jinx | +0.47 | 0.54 | 0.07 | range (attacks) |
| 62 | Ziggs | +0.47 | 0.53 | 0.06 | range (attacks) |
| 63 | Gnar | +0.46 | 0.62 | 0.16 | range (attacks) |
| 64 | Soraka | +0.46 | 0.53 | 0.07 | range (attacks) |
| 65 | Kog'Maw | +0.45 | 0.51 | 0.06 | range (attacks) |
| 66 | Azir | +0.44 | 0.50 | 0.06 | range (attacks) |
| 67 | Orianna | +0.44 | 0.50 | 0.06 | range (attacks) |
| 68 | Annie | +0.44 | 0.44 | 0.00 |  |
| 69 | Vex | +0.43 | 0.53 | 0.10 | range (attacks) |
| 70 | Varus | +0.42 | 0.53 | 0.11 | range (attacks) |
| 71 | Shaco | +0.41 | 0.87 | 0.46 |  |
| 72 | Senna | +0.40 | 0.65 | 0.25 | range (attacks) |
| 73 | Lucian | +0.39 | 0.67 | 0.28 | range (attacks) |
| 74 | Seraphine | +0.39 | 0.54 | 0.15 | range (attacks) |
| 75 | Nilah | +0.39 | 0.49 | 0.10 |  |
| 76 | Graves | +0.39 | 0.45 | 0.06 |  |
| 77 | Twisted Fate | +0.37 | 0.81 | 0.44 | range (attacks) |
| 78 | Caitlyn | +0.37 | 0.72 | 0.35 | range (attacks) |
| 79 | Brand | +0.37 | 0.44 | 0.07 |  |
| 80 | Kayn | +0.36 | 0.87 | 0.51 |  |
| 81 | Heimerdinger | +0.36 | 0.50 | 0.14 |  |
| 82 | Anivia | +0.35 | 0.48 | 0.13 |  |
| 83 | Ahri | +0.35 | 0.44 | 0.09 |  |
| 84 | Jax | +0.35 | 0.35 | 0.00 |  |
| 85 | Nami | +0.34 | 0.44 | 0.10 |  |
| 86 | Yasuo | +0.34 | 0.34 | 0.00 |  |
| 87 | Braum | +0.32 | 0.45 | 0.13 | projectile block (Unbreakable) |
| 88 | Syndra | +0.32 | 0.44 | 0.12 |  |
| 89 | Karma | +0.32 | 0.41 | 0.09 |  |
| 90 | Miss Fortune | +0.31 | 0.65 | 0.34 | range (attacks) |
| 91 | Hwei | +0.31 | 0.46 | 0.15 |  |
| 92 | Cassiopeia | +0.31 | 0.44 | 0.13 |  |
| 93 | Xin Zhao | +0.31 | 0.44 | 0.13 |  |
| 94 | Garen | +0.30 | 0.30 | 0.00 |  |
| 95 | Warwick | +0.29 | 0.90 | 0.61 |  |
| 96 | Swain | +0.29 | 0.39 | 0.10 |  |
| 97 | Aurelion Sol | +0.28 | 0.44 | 0.16 |  |
| 98 | Nasus | +0.27 | 0.33 | 0.06 |  |
| 99 | Janna | +0.26 | 0.72 | 0.46 | range (attacks) |
| 100 | LeBlanc | +0.25 | 0.41 | 0.16 |  |
| 101 | Ivern | +0.23 | 0.36 | 0.13 |  |
| 102 | Thresh | +0.23 | 0.36 | 0.13 |  |
| 103 | Neeko | +0.22 | 0.44 | 0.22 |  |
| 104 | Akshan | +0.18 | 0.63 | 0.45 | range (attacks) |
| 105 | Jhin | +0.15 | 0.53 | 0.38 | range (attacks) |
| 106 | Malphite | +0.15 | 0.21 | 0.06 |  |
| 107 | Vel'Koz | +0.14 | 0.50 | 0.36 | range (attacks) |
| 108 | Urgot | +0.14 | 0.27 | 0.13 |  |
| 109 | Xerath | +0.13 | 0.50 | 0.37 | range (attacks) |
| 110 | Rakan | +0.12 | 0.22 | 0.10 |  |
| 111 | Lillia | +0.06 | 0.19 | 0.13 |  |
| 112 | Ryze | +0.04 | 0.48 | 0.44 |  |
| 113 | Karthus | +0.02 | 0.36 | 0.34 |  |
| 114 | Rammus | +0.01 | 0.32 | 0.31 |  |
| 115 | Mordekaiser | +0.01 | 0.08 | 0.07 |  |
| 116 | Amumu | 0.00 | 0.00 | 0.00 |  |
| 117 | Blitzcrank | 0.00 | 0.00 | 0.00 |  |
| 118 | Rell | 0.00 | 0.00 | 0.00 |  |
| 119 | Renekton | 0.00 | 0.00 | 0.00 |  |
| 120 | Riven | 0.00 | 0.00 | 0.00 |  |
| 121 | Taric | 0.00 | 0.00 | 0.00 |  |
| 122 | Yone | 0.00 | 0.00 | 0.00 |  |
| 123 | Aatrox | -0.06 | 0.00 | 0.06 |  |
| 124 | Ambessa | -0.06 | 0.00 | 0.06 |  |
| 125 | Illaoi | -0.06 | 0.00 | 0.06 |  |
| 126 | Jarvan IV | -0.06 | 0.00 | 0.06 |  |
| 127 | Kassadin | -0.06 | 0.00 | 0.06 |  |
| 128 | Lee Sin | -0.06 | 0.00 | 0.06 |  |
| 129 | Nautilus | -0.06 | 0.00 | 0.06 |  |
| 130 | Singed | -0.06 | 0.00 | 0.06 |  |
| 131 | Sylas | -0.06 | 0.00 | 0.06 |  |
| 132 | Tryndamere | -0.06 | 0.00 | 0.06 |  |
| 133 | Yorick | -0.06 | 0.00 | 0.06 |  |
| 134 | Pantheon | -0.07 | 0.52 | 0.59 |  |
| 135 | Dr. Mundo | -0.07 | 0.00 | 0.07 |  |
| 136 | Irelia | -0.07 | 0.00 | 0.07 |  |
| 137 | Ekko | -0.09 | 0.00 | 0.09 |  |
| 138 | Diana | -0.10 | 0.00 | 0.10 |  |
| 139 | K'Sante | -0.10 | 0.00 | 0.10 |  |
| 140 | Leona | -0.10 | 0.00 | 0.10 |  |
| 141 | Locke | -0.10 | 0.00 | 0.10 |  |
| 142 | Rumble | -0.10 | 0.00 | 0.10 |  |
| 143 | Taliyah | -0.11 | 0.50 | 0.61 | range (attacks) |
| 144 | Darius | -0.12 | 0.00 | 0.12 |  |
| 145 | Hecarim | -0.12 | 0.00 | 0.12 |  |
| 146 | Cho'Gath | -0.13 | 0.00 | 0.13 |  |
| 147 | Sejuani | -0.13 | 0.00 | 0.13 |  |
| 148 | Trundle | -0.13 | 0.00 | 0.13 |  |
| 149 | Fiddlesticks | -0.14 | 0.36 | 0.50 |  |
| 150 | Volibear | -0.14 | 0.00 | 0.14 |  |
| 151 | Briar | -0.15 | 0.00 | 0.15 |  |
| 152 | Shyvana | -0.15 | 0.00 | 0.15 |  |
| 153 | Bel'Veth | -0.16 | 0.00 | 0.16 |  |
| 154 | Gragas | -0.16 | 0.00 | 0.16 |  |
| 155 | Ornn | -0.16 | 0.00 | 0.16 |  |
| 156 | Sett | -0.16 | 0.00 | 0.16 |  |
| 157 | Shen | -0.18 | 0.33 | 0.51 |  |
| 158 | Katarina | -0.19 | 0.00 | 0.19 |  |
| 159 | Vi | -0.22 | 0.00 | 0.22 |  |
| 160 | Akali | -0.26 | 0.00 | 0.26 |  |
| 161 | Poppy | -0.27 | 0.00 | 0.27 |  |
| 162 | Nunu & Willump | -0.30 | 0.19 | 0.49 |  |
| 163 | Pyke | -0.31 | 0.00 | 0.31 |  |
| 164 | Talon | -0.31 | 0.00 | 0.31 |  |
| 165 | Viego | -0.34 | 0.00 | 0.34 |  |
| 166 | Tahm Kench | -0.35 | 0.00 | 0.35 |  |
| 167 | Zac | -0.38 | 0.00 | 0.38 |  |
| 168 | Wukong | -0.40 | 0.00 | 0.40 |  |
| 169 | Qiyana | -0.41 | 0.00 | 0.41 |  |
| 170 | Kha'Zix | -0.44 | 0.00 | 0.44 |  |
| 171 | Naafiri | -0.53 | 0.00 | 0.53 |  |
| 172 | Galio | -0.64 | 0.00 | 0.64 |  |
