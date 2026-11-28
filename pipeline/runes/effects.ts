/** Compile supported manual combat effects from complete, reviewed Wiki and client inputs. */
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { RuneCatalog, RuneWikiSource } from "../../runes/catalog";
import type { CombatRuneRules, RuneEffectEvidence } from "../../runes/effectRules";
import { TOP_LANE_MAX_LEVEL } from "../../engine/stats";
import { datasetDir } from "../config";
import { loadRuneCatalog } from "./catalog";

export interface CombatRuneSourceBundle {
  schema: 1;
  dataset: string;
  patch: string;
  pages: RuneWikiSource[];
  gameData: { url: string; sha256: string };
}

export const COMBAT_RUNE_GAME_URL = "https://raw.communitydragon.org/16.21/game/perks.cdtb.bin.json";
const GAME_SHA256 = "f0212502bb1180c0920a1be7074af8de2e6d4cefe3fc51f2a0ca9e08116a2c9f";
const REVIEWED: Readonly<Record<string, { revid: number; timestamp: string; sha256: string }>> = {
  "Absorb Life": {
    "revid": 3980915,
    "timestamp": "2026-01-02T12:22:36Z",
    "sha256": "66bdc1876b2f0fe619f648366e4d9a521602d62d1b93ec285e994ac73aa95e3d"
  },
  "Champion ability": {
    "revid": 4086204,
    "timestamp": "2026-10-18T01:31:34Z",
    "sha256": "9a842b853ac7df583520b0928169b19090c7c1dd755e6bd6cb7b56024562058b"
  },
  "Champion summoned units": {
    "revid": 4023248,
    "timestamp": "2026-05-28T12:29:08Z",
    "sha256": "466db9a514495259e6601adc83ea3916f98b368d6774be572a878846fa44021a"
  },
  "Cooldown": {
    "revid": 4050188,
    "timestamp": "2026-08-05T12:42:06Z",
    "sha256": "2f8a8e06693d8513310eaa0650661c0899b8e3a31c8906c46ba83e3eee38ede7"
  },
  "Coup de Grace": {
    "revid": 3860002,
    "timestamp": "2025-02-06T18:25:06Z",
    "sha256": "84df929d8cf6ebbd382d6bb5461528b53f6cb3200d449e2918f330e82e516cd4"
  },
  "Cut Down": {
    "revid": 4014921,
    "timestamp": "2026-05-01T13:54:08Z",
    "sha256": "4fd3f69ad4524623dc6d35a5d87f99118000048c04546ac52d763fbf8b8c6638"
  },
  "Damage": {
    "revid": 4084890,
    "timestamp": "2026-10-13T21:42:38Z",
    "sha256": "14423dac41fd45509e3c186dc6a6ea9833e78b976e01d3b2817b3d7584a87236"
  },
  "Damage modifier": {
    "revid": 4050138,
    "timestamp": "2026-08-04T23:17:04Z",
    "sha256": "450a1a563c78a2ed0f82411d17ec654ece5b1a5ec3f6bcbf990a819d483a2856"
  },
  "Haste": {
    "revid": 4070414,
    "timestamp": "2026-09-29T20:47:34Z",
    "sha256": "927ef62dbdbfc70cdc10c78d245991e714c83f457306d73d285d21a487d27ceb"
  },
  "Haste/Reducing ability cooldowns": {
    "revid": 4039444,
    "timestamp": "2026-07-04T04:07:14Z",
    "sha256": "d98ec7aaff167b448d7b74fb89b9352ee987263ca66093f8a7520bc61dd29df3"
  },
  "Healing": {
    "revid": 4041638,
    "timestamp": "2026-07-10T06:45:09Z",
    "sha256": "ca0a5ee26be2bea722614b78de604547314e8b0a92fa1ba08c087382ad99c9d4"
  },
  "Health regeneration": {
    "revid": 4073061,
    "timestamp": "2026-10-02T13:17:00Z",
    "sha256": "3dafb693e2297ad5f7c8f8ab4fab6eff20507f03cbc2822a99455f177b61779a"
  },
  "Kill": {
    "revid": 4053216,
    "timestamp": "2026-08-23T01:05:22Z",
    "sha256": "8568c501e84f3e775932fd0282a3c7d94794f962f81792820b1803a903a984b2"
  },
  "Last Stand": {
    "revid": 3926332,
    "timestamp": "2025-07-12T00:22:31Z",
    "sha256": "0d253f4a535df029f52d93b99df56bfb70a24861edaaf1707bd80241c6994b6b"
  },
  "Legend: Alacrity": {
    "revid": 3980881,
    "timestamp": "2026-01-02T11:57:29Z",
    "sha256": "ffc62c0f8a1008ec2a2fb97f78fc1d9920213fcf313ab55dbd4659e55f01bdaa"
  },
  "Legend: Haste": {
    "revid": 3980882,
    "timestamp": "2026-01-02T11:57:55Z",
    "sha256": "da7a292238cff3554e3888f68ef81e4203abfb2b85c7e41d1618684a6d06fbd3"
  },
  "Second Wind": {
    "revid": 4012933,
    "timestamp": "2026-04-27T18:00:51Z",
    "sha256": "41854e8f0f75189d5bb725f460616874bffd9b38b1ef1b4eac35522418dbe98b"
  },
  "Takedown": {
    "revid": 4081718,
    "timestamp": "2026-10-09T12:20:53Z",
    "sha256": "d8a5380cd2e742f6f76b0a0b63040f67e89c181eb27c25c48a1443cbde36229b"
  },
  "Template:Data Udyr/Bridge Between": {
    "revid": 3983420,
    "timestamp": "2026-01-12T02:24:27Z",
    "sha256": "91a9df8f18aee2b6a796592d098eeff24b5e7b34773ee98bc7a10caccc83988e"
  },
  "Template:Data Udyr/Wingborne Storm": {
    "revid": 4008208,
    "timestamp": "2026-04-14T05:41:32Z",
    "sha256": "f7283a8ebc94c8a1dfcba79840251ac13a314d2bfb478eb307bb1f60732d73b6"
  },
  "Template:Rune data Absorb Life": {
    "revid": 3997095,
    "timestamp": "2026-03-06T17:27:29Z",
    "sha256": "d494e4a0c5f9b2262e2426108789ea4da00007d7b3ebf9b4323fa29dfe5aa538"
  },
  "Template:Rune data Coup de Grace": {
    "revid": 3859780,
    "timestamp": "2025-02-06T03:21:10Z",
    "sha256": "655a20b9492a1379d2f5606565b21f4ce4836070021bf2e887a4c7e9996418b5"
  },
  "Template:Rune data Cut Down": {
    "revid": 3859781,
    "timestamp": "2025-02-06T03:21:31Z",
    "sha256": "a31f78f4e97fa4e2b9b1484a3bf25f9d9cfdb8dc275bfbee41be2848636cfa0c"
  },
  "Template:Rune data Last Stand": {
    "revid": 3859782,
    "timestamp": "2025-02-06T03:22:08Z",
    "sha256": "669d1b6c2f5b77093f61ab19ffec1b17b4ba770badb6a7c082eea6ed296f877e"
  },
  "Template:Rune data Legend: Alacrity": {
    "revid": 3958705,
    "timestamp": "2025-10-10T09:39:17Z",
    "sha256": "7813d6e3c06cfdceec4e376be6909ccc618ea41ee52d21ed904010a09868056e"
  },
  "Template:Rune data Legend: Haste": {
    "revid": 3958696,
    "timestamp": "2025-10-10T09:26:49Z",
    "sha256": "892804ab9e9eb64530b55b4b89b2cc7df78b7dee878eb2119d65de9d713711be"
  },
  "Template:Rune data Second Wind": {
    "revid": 3960974,
    "timestamp": "2025-10-24T16:06:20Z",
    "sha256": "b51dc3b87c2cbf6dbf23723d33d3dc05093d3ba1026d4b3d1fa0246df5215e4f"
  },
  "True damage": {
    "revid": 4052642,
    "timestamp": "2026-08-19T15:41:09Z",
    "sha256": "a2beab5644f87926658a3e991ee31f647934b6a7bf372a669a00b47fdadb381f"
  },
  "Udyr": {
    "revid": 3991262,
    "timestamp": "2026-02-12T19:03:05Z",
    "sha256": "0e696537af66bb2e5371d2af96458fe9d5b1f6e4b87cc29e252eea0192104fc0"
  },
  "Unit": {
    "revid": 4085583,
    "timestamp": "2026-10-15T15:33:50Z",
    "sha256": "1d753f71725a446cbb4fe8d2c0e7866fc46a9077f032f10ecea1db2fe12c253a"
  },
  "Health": {
    "revid": 4073062,
    "timestamp": "2026-10-02T13:19:01Z",
    "sha256": "c78ab307b179e0d780c33cf8abfc31dadb091be2cead0fc264d0d1632351a664"
  },
  "Legend: Bloodline": {
    "revid": 4021767,
    "timestamp": "2026-05-21T06:14:37Z",
    "sha256": "3df918a5ed1b563451a00945316905df648dce25788cb248b31cd5ff510ce42f"
  },
  "Life steal": {
    "revid": 4060425,
    "timestamp": "2026-09-09T23:47:53Z",
    "sha256": "af41dac470d9a2171ae000c03326fb7e5cc8a7fffe13dfabb3e45ccf95313ea9"
  },
  "Template:Data Galio/Shield of Durand": {
    "revid": 3990299,
    "timestamp": "2026-02-07T07:08:21Z",
    "sha256": "de0eb4c03d6bbff6a2803dd6e4ff3bdd7ffd58fe59c45da1c3d5be4a3feac22d"
  },
  "Template:Data K'Sante/All Out": {
    "revid": 4051537,
    "timestamp": "2026-08-12T20:43:25Z",
    "sha256": "4ba35fd0d46bd5d6c982b4ed6ddc6f73664e9f571e1e5c1fa41a6b12ef45dd58"
  },
  "Template:Data Kled/Dismounted Skaarl the Cowardly Lizard": {
    "revid": 4038397,
    "timestamp": "2026-06-30T09:32:46Z",
    "sha256": "12b043731a0f2d4bd116fcf4ceb4b76d5b5c44b1cf2733687b54a29d0bdd303c"
  },
  "Template:Data Kled/Skaarl the Cowardly Lizard": {
    "revid": 4058479,
    "timestamp": "2026-09-03T17:35:19Z",
    "sha256": "320e8686665acf32777cc82dff12256979ad812bf2a7955b8cd54715e2eb6390"
  },
  "Template:Data Malphite/Granite Shield": {
    "revid": 3973718,
    "timestamp": "2025-12-12T09:23:57Z",
    "sha256": "33c5435118fc69603feb6b583c803932dc969251fd76766705ce79ab85428de9"
  },
  "Template:Data Ornn/Living Forge": {
    "revid": 4089066,
    "timestamp": "2026-10-22T20:31:26Z",
    "sha256": "19e82b0d0f97583306d0f2abea77bd335e480e5664c70b9e7d87cc9829457da3"
  },
  "Template:Data Pyke/Gift of the Drowned Ones": {
    "revid": 4007005,
    "timestamp": "2026-04-09T16:09:25Z",
    "sha256": "fb56ad11ff45c4ef612b81209c3aa57633b1b475645cb16cfcb8253cbb186401"
  },
  "Template:Data Vladimir/Crimson Pact": {
    "revid": 4073468,
    "timestamp": "2026-10-02T20:04:37Z",
    "sha256": "83b1db52ff54ad799021a0cadcabc0e8211db8141550dab4ef885a9f4a3e0d6c"
  },
  "Template:Rune data Legend: Bloodline": {
    "revid": 3971359,
    "timestamp": "2025-12-02T21:39:42Z",
    "sha256": "c9f5c1ca762b135a41c6be7f42555b471231b304ad7761237d89c9ad229e13c7"
  },
  "Assist": {
    "revid": 4016680,
    "timestamp": "2026-05-12T09:59:03Z",
    "sha256": "f65310a33c1eb7496b86af7b46a28cd465b43fe7884d9c6745bf9b3b76494d1e"
  },
  "Heal and shield power": {
    "revid": 4021804,
    "timestamp": "2026-05-21T15:27:59Z",
    "sha256": "4ed9bf176a6c83956f5fc9997ec035b55b37b7d0d2e1bebe420b21367d44c87c"
  },
  "Template:Rune data Triumph": {
    "revid": 3825924,
    "timestamp": "2024-11-27T23:39:48Z",
    "sha256": "45f9059f1e4828ca23955f2eacf7a8555f5589e2aec5f29f7b89937a3e9d13f6"
  },
  "Triumph": {
    "revid": 3980916,
    "timestamp": "2026-01-02T12:22:57Z",
    "sha256": "686cf579e3adf19602275258eba63dfee2404c807c9218693ad7b8d45121f651"
  },
  "Template:Healing modifiers": {
    "revid": 4021803,
    "timestamp": "2026-05-21T15:27:06Z",
    "sha256": "be12d5fbff797a03e87385dd2fc92bb56582f70ce0f82bed0f03261bbb908d5c"
  },
  "Ability resource": {
    "revid": 4093317,
    "timestamp": "2026-11-10T22:02:13Z",
    "sha256": "a25540aad294adc61c942d8071c66cd0ac595b876d28540edd1897d43022a32e"
  },
  "Cast time": {
    "revid": 4090549,
    "timestamp": "2026-10-26T14:49:26Z",
    "sha256": "6e5c2b18ef24935edb05090e7c0c2451241c12916d884f05bc107cf4d5c2dc81"
  },
  "Death": {
    "revid": 4051174,
    "timestamp": "2026-08-11T19:32:59Z",
    "sha256": "ac192938b561e2366201c933d5c994df066f7cba066c42cad213bfa1d72bec94"
  },
  "Energy": {
    "revid": 4073066,
    "timestamp": "2026-10-02T13:28:44Z",
    "sha256": "6828fe156eb9fcb87806fee0595d894cbca953561d5e5aaaf8ce6ab5ffe715cc"
  },
  "Mana": {
    "revid": 4073064,
    "timestamp": "2026-10-02T13:25:43Z",
    "sha256": "a5dd25958594c62602bbbecdce25b037b5465afdf4957d02bc0171fb5fd728c6"
  },
  "Mana regeneration": {
    "revid": 4073055,
    "timestamp": "2026-10-02T12:31:09Z",
    "sha256": "4e8e750a493d910f365359d6ebcf4c2a5f0e48fa9b9ff0d77bbb270e47538425"
  },
  "Presence of Mind": {
    "revid": 4062635,
    "timestamp": "2026-09-14T07:25:56Z",
    "sha256": "4faf5879ca809975068629d16cfd6fc868a7a3ac37495aaa4590e337bc5afee9"
  },
  "Range type": {
    "revid": 4089646,
    "timestamp": "2026-10-23T20:01:32Z",
    "sha256": "469d1a163786e084a9282fc857bd75192f47029f70a419363b20ee03fb153c8a"
  },
  "Rune": {
    "revid": 4091810,
    "timestamp": "2026-11-01T20:58:39Z",
    "sha256": "a9b4ad8e0885e65fd73e7926eaf608c5312a4507d7f115bcd2bf0c0c222a8e31"
  },
  "Template:Data Akali/Twilight Shroud": {
    "revid": 4007406,
    "timestamp": "2026-04-11T16:41:19Z",
    "sha256": "09a69f0868e18443f3c1fa90ddff8593eff82caed316e8792e04fd46c8f06563"
  },
  "Template:Data Ryze/Arcane Mastery": {
    "revid": 4059875,
    "timestamp": "2026-09-08T14:46:22Z",
    "sha256": "02a531127cbace37c720b800fe4c6ae4f56e40647b598e63425a71be8ad7f753"
  },
  "Template:Range difference": {
    "revid": 4060743,
    "timestamp": "2026-09-10T03:46:16Z",
    "sha256": "e6ef4b7de64c37cd48efa036e9d69e0caba571f236833916d06ab810f27676cf"
  },
  "Template:Rune data Presence of Mind": {
    "revid": 3985219,
    "timestamp": "2026-01-18T23:26:04Z",
    "sha256": "a27418c682b63ac7087aeae94dd4aaf7c30fa058ec5aed57f982ae223285351f"
  },
  "Template:Tip data/Resurrection": {
    "revid": 4060644,
    "timestamp": "2026-09-10T03:45:41Z",
    "sha256": "764f4ca9fe8af8c8f4e741f2691e4cd72fc21218a2ee4825ca84fb9607fe2285"
  },
  "Template:Tip data/Zombie state": {
    "revid": 4060726,
    "timestamp": "2026-09-10T03:46:10Z",
    "sha256": "58dc1d2a189000a33b39233af916c3aa4c86bc12094fb495b1e85253aea51ef6"
  },
  "Template:Zombie state info": {
    "revid": 3905023,
    "timestamp": "2025-06-02T04:27:53Z",
    "sha256": "9786c845163dd3c1418cc16448f8944f4b5576ac4cf56aa082079af70ab55ef7"
  },
  "Adaptive force": {
    "revid": 4063874,
    "timestamp": "2026-09-17T20:36:35Z",
    "sha256": "3db1c68a2d28fb1570203918f3f02e18724065911ba3832bcdc1abf5e053708b"
  },
  "Attack effects": {
    "revid": 4084301,
    "timestamp": "2026-10-13T02:56:42Z",
    "sha256": "c789bc2c8ffae848f7b0882bb0bdc46f4e0f88c9c9cf8553e1cb9c35bdbeb2c0"
  },
  "Basic attack": {
    "revid": 4091314,
    "timestamp": "2026-10-29T18:18:28Z",
    "sha256": "f6a02b147181862349bcfb50c0d6a3c3ca5fd6f818b185d520273d2d66718b6e"
  },
  "Combat status": {
    "revid": 4058480,
    "timestamp": "2026-09-03T17:39:48Z",
    "sha256": "90fe1f465d87fdaf961a805703cdbde6ad6cfc52158e696aca771d36316fd6dd"
  },
  "Press the Attack": {
    "revid": 4082445,
    "timestamp": "2026-10-10T14:32:08Z",
    "sha256": "071358e3f6ac230a1391ffc82a0c654fd006bad8c60a82b872e9ebedeadcb538"
  },
  "Stack": {
    "revid": 4093072,
    "timestamp": "2026-11-07T14:05:14Z",
    "sha256": "3dafc6fe95d3bf95835c49fc1c7f4592650abf2e7bf7a59be5324f8d8bdbdd55"
  },
  "Template:Rune data Press the Attack": {
    "revid": 4015574,
    "timestamp": "2026-05-05T16:25:24Z",
    "sha256": "97024c78c4ac7f912a2856a3c0218df4b958b3a5cebe7dcb2c2a3e3652b859d2"
  },
  "Template:Tip data/Adaptive damage": {
    "revid": 4015091,
    "timestamp": "2026-05-02T21:25:29Z",
    "sha256": "1e6109ce72ea7e500e6f136cfca0757d9701758978546b0a26a51344d46e3f3f"
  },
  "Attack effects/Abilities": {
    "revid": 4003212,
    "timestamp": "2026-03-28T22:10:22Z",
    "sha256": "31ae08c8750ee9d97dea081162f588b88c0c76de97162571cfc3bf09fc1841e0"
  },
  "Blink": {
    "revid": 4047228,
    "timestamp": "2026-07-29T11:41:10Z",
    "sha256": "3ecfeddeb6efc6fd79adbc45c8669fc600e325051956a7955c2c173cfb282173"
  },
  "Dash": {
    "revid": 4091669,
    "timestamp": "2026-10-31T06:10:15Z",
    "sha256": "ac07bd2e56b93fa624db69e95371a4a668d39fa9f572d8e31949309ad3fcd9ed"
  },
  "Fleet Footwork": {
    "revid": 4052588,
    "timestamp": "2026-08-19T14:23:50Z",
    "sha256": "936b3ed2431620e7502d95e55a9096497d7ed2b538e9cc343750b179cd44da19"
  },
  "Movement speed": {
    "revid": 4064468,
    "timestamp": "2026-09-21T20:55:09Z",
    "sha256": "e197b159aeec0deb715c4f8d4bf1eca38c2337448fb79da9776c516b2737589f"
  },
  "Named item effect": {
    "revid": 4045631,
    "timestamp": "2026-07-25T03:45:22Z",
    "sha256": "460d35f1cf80455c942798e466202ab673142c575a8f64e8490e19e873beb6fe"
  },
  "Template:Energized info": {
    "revid": 4064669,
    "timestamp": "2026-09-22T15:19:09Z",
    "sha256": "6d9d824c3d258b188a593ad5307a3439ae66b0f9b1e7537ea2407e43192f7781"
  },
  "Template:Rune data Fleet Footwork": {
    "revid": 4051351,
    "timestamp": "2026-08-12T12:30:53Z",
    "sha256": "ccd55ed138876771618b0a5691a952bc43f76d83a3a391034a59a506a129943e"
  },
  "Template:Tip data/Energized": {
    "revid": 4013385,
    "timestamp": "2026-04-29T06:29:08Z",
    "sha256": "5fea1a662db366a60b32f3f3c043c11143250cb2feca815803b2ae3c20411795"
  },
  "Lethal Tempo": {
    revid: 4060427,
    timestamp: "2026-09-10T00:13:01Z",
    sha256: "ef02af32b0ccd61c559446203b86e1a81ad63ddfc6fe66a5e79423a61bdca7e4",
  },
  "Template:Rune data Lethal Tempo": {
    revid: 4065934,
    timestamp: "2026-09-24T08:48:40Z",
    sha256: "360eb66df82e0fe0c92ba4c0fb2714225147916404eccd9e8c53a38d677dde27",
  },
  "Conqueror": {
    revid: 4091967,
    timestamp: "2026-11-03T16:08:14Z",
    sha256: "7fdccf950155b634b57bb9349bf8462e0bfd8166ca8f3a4dae3d7d1c1fdcb0c2",
  },
  "Template:Rune data Conqueror": {
    revid: 4060685,
    timestamp: "2026-09-10T03:45:55Z",
    sha256: "32841990cc6ba88c6299c5739d5e2a82c95c94cdf9d74fefa84a5d2db2b0f0b0",
  },
  "Cast instance": {
    revid: 4069908,
    timestamp: "2026-09-29T13:24:00Z",
    sha256: "2b6a0d8be6b60ad772037d6dcdd5b7a8b4e70127adca1061f3069bebb4ab462d",
  },
  "Template:Tip data/Cast instance": {
    revid: 4069909,
    timestamp: "2026-09-29T13:25:07Z",
    sha256: "ccb7e6b7c51ea5cde94409ac62403eaf9d8ae56376bd016cd24406eb0aa43da1",
  },
  "Template:Data Kayle/Divine Ascent": {
    revid: 4051190,
    timestamp: "2026-08-12T00:12:54Z",
    sha256: "e1053a6a440e6cca9e3557f0dcd1e25801e601e9c47398d6f9ccf3ae929a9497",
  },
  "Template:Data Garen/Judgment": {
    revid: 4009435,
    timestamp: "2026-04-17T11:45:04Z",
    sha256: "7b959d744e3382571260f04570f76fd38a7341f8b29df7a1cf287af519f3d653",
  },
  "Template:Data Wukong/Cyclone": {
    revid: 4021867,
    timestamp: "2026-05-21T18:57:24Z",
    sha256: "0bbb3d0d0bd4167d85e259226363e28139f5c45934e52bfa15076c8f3646a912",
  },
  "Template:Data Mordekaiser/Darkness Rise": {
    revid: 4070051,
    timestamp: "2026-09-29T15:58:08Z",
    sha256: "75bc4ca811810d9bedff72499a8f873f0b070ef9284628d126db3636a2d19059",
  },
  "Grasp of the Undying": {
    revid: 4052352,
    timestamp: "2026-08-17T17:14:06Z",
    sha256: "a93d99e197cde0c8e8df17b9499f2a1a5d43879b7627f919f8c38379ed7130bf",
  },
  "Template:Rune data Grasp of the Undying": {
    revid: 4058228,
    timestamp: "2026-09-02T10:12:14Z",
    sha256: "016d11d96f6099062907667bfe767ec5c911a96695615c34fc0eff39e8d955a1",
  },
  "Template:Data Azir/Arise!": {
    revid: 4044339,
    timestamp: "2026-07-18T20:38:42Z",
    sha256: "94825341999ef7f4cb7009f69535b875ac9d6bb6241e04badfdec411e6dd3e22",
  },
  "Template:Data Gangplank/Parrrley": {
    revid: 4063653,
    timestamp: "2026-09-17T13:58:15Z",
    sha256: "399077794d28ea27308cb2761127b6fc4f1911290c464df00f6f34ea43c0ba2a",
  },
  "Template:Data Urgot/Purge": {
    revid: 4058781,
    timestamp: "2026-09-05T11:51:40Z",
    sha256: "7528f996881e3024fe7addddb17b28f9b3099bec6a501f9afd2faf7a66c0e098",
  },
  "Template:Rune data Bone Plating": {
    revid: 3985159,
    timestamp: "2026-01-18T21:02:07Z",
    sha256: "cee96bd9ecf4c9cc4c31e2085f3d8dfbfd1ad3022fd18542a75b52fce840f54e",
  },
  "Bone Plating": {
    revid: 4072632,
    timestamp: "2026-10-01T20:18:04Z",
    sha256: "eaf489d01150a070dc9ec2108a625dc756d1ced1168cb6d9d6f24858baaba141",
  },
  "Template:Data Braum/Unbreakable": {
    revid: 4012056,
    timestamp: "2026-04-24T20:26:56Z",
    sha256: "b44209c9b58c80dff9b0860869e98566d8f133188ec0419737194c8b81982388",
  },
  "Template:Data Kled/Violent Tendencies": {
    revid: 4072987,
    timestamp: "2026-10-02T01:03:31Z",
    sha256: "16dd5bc02a7f0f51737374531ca38ee0d667e7c434623160cdeb353255f517b5",
  },
  "Template:Rune data Shield Bash": {
    revid: 4044093,
    timestamp: "2026-07-17T22:53:29Z",
    sha256: "ca2f9a6467c1de3f2d7a69356ba0dec2bc69b6130d3f1c215c5d2b65b22bba7a",
  },
  "Shield Bash": {
    revid: 4015237,
    timestamp: "2026-05-03T20:19:16Z",
    sha256: "e60123c2c6716a6cab2b7c18c9a8d7c209ddafc14854125025e4dd9ceeafd8ec",
  },
  "Shield": {
    revid: 4021810,
    timestamp: "2026-05-21T15:37:58Z",
    sha256: "d18459fb18c073e493b78c6825b281923ddef98541361c85b11b2588b900a5d9",
  },
  "Template:Data Hwei/Pool of Reflection": {
    revid: 3992645,
    timestamp: "2026-02-18T20:35:25Z",
    sha256: "a817fea3d0626c3cbacb545cde65dc0fc91f3da6a5e80075e7a2685f38f367ea",
  },
  "Template:Data Kled/Chaaaaaaaarge!!!": {
    revid: 4070347,
    timestamp: "2026-09-29T19:28:37Z",
    sha256: "498d9f9d182d79b52eec0121bcc0824221fd8de4f8f7cd593dd8569984abe78a",
  },
  "Template:Data Nunu/Absolute Zero": {
    revid: 4088349,
    timestamp: "2026-10-20T23:32:39Z",
    sha256: "485ea4c83a0d28058966744a8cb19f516eac090d8f06f5331ab71724a85b128d",
  },
  "Template:Data Mordekaiser/Indestructible": {
    revid: 4016354,
    timestamp: "2026-05-10T19:48:19Z",
    sha256: "933c39900fbc3c94fdf6e0d33a4ac3fcb5f41b67ef9b224cb0fc748711a6e07c",
  },
  "Template:Data Camille/Adaptive Defenses": {
    revid: 4051341,
    timestamp: "2026-08-12T12:00:14Z",
    sha256: "dbe847462ae2df531c7fbd7193311d5cd7a1240177bba3dea886546a9f56f89a",
  },
  "Template:Rune data Overgrowth": {
    revid: 3825902,
    timestamp: "2024-11-27T23:37:55Z",
    sha256: "55957f17d94a3bd2875606453fc089977fb650ece00d22bfab6cc31086143363",
  },
  "Overgrowth": {
    revid: 4002405,
    timestamp: "2026-03-24T19:50:20Z",
    sha256: "324ce9361daac6728b5a274fec6f3b9f8b635c3827545034cdfd4ad56065c656",
  },
  "Template:Rune data Aftershock": {
    revid: 4022990,
    timestamp: "2026-05-27T21:25:51Z",
    sha256: "7484070a7ee08dd8940edc74607ae1e8b0afec2d3b795b1765aede073dcf4d50",
  },
  "Aftershock": {
    revid: 4023199,
    timestamp: "2026-05-28T04:08:28Z",
    sha256: "bfe92ae4abdb292f4cb3535a9bf72c31dc273dd92be32204cc6da0d3e06d95a5",
  },
  "Template:Tip data/Immobilize": {
    revid: 4060567,
    timestamp: "2026-09-10T03:45:12Z",
    sha256: "5151bf6443223f85ecede8e540339edd9acc3b4c34d41f613b625939e57b2b22",
  },
  "Armor": {
    revid: 4073057,
    timestamp: "2026-10-02T13:08:38Z",
    sha256: "278ad79d85ed55150552c9599b6c39f07e7bb7f709941ff8c914ada5cee910d1",
  },
  "Magic resistance": {
    revid: 4073058,
    timestamp: "2026-10-02T13:08:45Z",
    sha256: "3e16564289ff10442dc1ba99d013470dcb244645948cad11f6c992a77ff43f77",
  },
  "Range": {
    revid: 4058499,
    timestamp: "2026-09-03T19:42:39Z",
    sha256: "c1d87fc751c5fb9feb7a4fb84dd19774016b347ee64afa45902a931a49fe4453",
  },
  "Spell shield": {
    revid: 3981674,
    timestamp: "2026-01-07T21:48:25Z",
    sha256: "33e6a05e8d59a42daf15ed1f41b0e6ce0715dec2aa2e13783079f3c32e2bdfe5",
  },
  "Template:Rune data Font of Life": {
    revid: 3996429,
    timestamp: "2026-03-04T16:57:40Z",
    sha256: "fca775707e709fe845743ce422de697386857bb3d9e5edce8203610272535119",
  },
  "Font of Life": {
    revid: 4015111,
    timestamp: "2026-05-03T01:57:12Z",
    sha256: "34296640fb89948671b0996a2ba56ce8a82ae94c9e716142c7200fb644fbc065",
  },
  "Template:Tip data/Slow": {
    revid: 4060507,
    timestamp: "2026-09-10T03:44:51Z",
    sha256: "1b86523d3b689ca2c9e0cf76fa08eabf56140f7e1b1a5660c453b93cbaa0c93e",
  },
  "Template:Tip data/Drowsy": {
    revid: 3308207,
    timestamp: "2021-07-08T13:35:46Z",
    sha256: "b218e97f8d5891677c7a8224cb3f5d7ae2ee577cf302adf584ee726cd5af7020",
  },
  "Template:Rune data Taste of Blood": {
    revid: 3997097,
    timestamp: "2026-03-06T17:28:40Z",
    sha256: "54581e5030c0120ad313bd7cebd899ad39bdf83dd81f68bf51460b1cf7a40c18",
  },
  "Taste of Blood": {
    revid: 3997098,
    timestamp: "2026-03-06T17:28:48Z",
    sha256: "cfc94beda265254eb2ce70015fa5b91b102817e21dac1d559c78daf7baeaa94b",
  },
  "Template:Rune data Scorch": {
    revid: 3985169,
    timestamp: "2026-01-18T21:40:49Z",
    sha256: "e9a01bb5a987ae6331c33370765b91b629f4b4e685965b6f03b3d8c58e401e77",
  },
  "Scorch": {
    revid: 4024859,
    timestamp: "2026-06-03T19:05:03Z",
    sha256: "74fdf392b2ded1dc27f5084b94f4c307cc789f23d12bee91cda1b7f02c0d499d",
  },
  "Template:Tip data/Ability damage": {
    revid: 4060550,
    timestamp: "2026-09-10T03:45:06Z",
    sha256: "187eaa9f1f61ea19b03c38bef733a23173f99701405605ae2d39b3eb43dbf24e",
  },
  "Template:Data Bel'Veth/Royal Maelstrom": {
    revid: 4046605,
    timestamp: "2026-07-28T20:21:57Z",
    sha256: "2d4a90f48b9226a06f0ce34af1233d2b6bcf9d7beae9d2fd2a021e5f1ce8aada",
  },
  "Template:Rune data Cheap Shot": {
    revid: 3992989,
    timestamp: "2026-02-20T14:45:45Z",
    sha256: "5ba0e564f6f207fe54748eb9ae56e32d8d7d372bcd61d96f885328b195a4480c",
  },
  "Cheap Shot": {
    revid: 4023785,
    timestamp: "2026-05-29T16:28:17Z",
    sha256: "8e40041283249c5dbf9545ed0ab37b71aca024a9dfd38af2387f289b7c876fd7",
  },
};
const RUNE_SOURCES = [
  { id: 8126, name: "Cheap Shot", path: 8100, slot: 1, game: "Perks/Styles/Domination/CheapShot" },
  { id: 8237, name: "Scorch", path: 8200, slot: 3, game: "Perks/Styles/Sorcery/Scorch" },
  { id: 8139, name: "Taste of Blood", path: 8100, slot: 1, game: "Perks/Styles/Domination/TasteOfBlood" },
  { id: 8463, name: "Font of Life", path: 8400, slot: 1, game: "Perks/Styles/Resolve/FontOfLife" },
  { id: 8439, name: "Aftershock", path: 8400, slot: 0, game: "Perks/Styles/Resolve/Aftershock" },
  { id: 8451, name: "Overgrowth", path: 8400, slot: 3, game: "Perks/Styles/Resolve/Overgrowth" },
  { id: 8401, name: "Shield Bash", path: 8400, slot: 1, game: "Perks/Styles/Resolve/ShieldBash" },
  { id: 8473, name: "Bone Plating", path: 8400, slot: 2, game: "Perks/Styles/Resolve/BonePlating" },
  { id: 8437, name: "Grasp of the Undying", path: 8400, slot: 0, game: "Perks/Styles/Resolve/GraspOfTheUndying" },
  { id: 8010, name: "Conqueror", path: 8000, slot: 0, game: "Perks/Styles/Precision/Conqueror" },
  { id: 8008, name: "Lethal Tempo", path: 8000, slot: 0, game: "Perks/Styles/Precision/LethalTempo" },
  { id: 8021, name: "Fleet Footwork", path: 8000, slot: 0, game: "Perks/Styles/Precision/FleetFootwork" },
  { id: 8005, name: "Press the Attack", path: 8000, slot: 0, game: "Perks/Styles/Precision/PressTheAttack" },
  { id: 9101, name: "Absorb Life", path: 8000, slot: 1, game: "Perks/Styles/Precision/AbsorbLife" },
  { id: 9111, name: "Triumph", path: 8000, slot: 1, game: "Perks/Styles/Precision/Triumph" },
  { id: 8009, name: "Presence of Mind", path: 8000, slot: 1, game: "Perks/Styles/Precision/PresenceOfMind" },
  { id: 8014, name: "Coup de Grace", path: 8000, slot: 3, game: "Perks/Styles/Precision/CoupDeGrace" },
  { id: 8017, name: "Cut Down", path: 8000, slot: 3, game: "Perks/Styles/Precision/CutDown" },
  { id: 8299, name: "Last Stand", path: 8000, slot: 3, game: "Perks/Styles/Precision/LastStand" },
  { id: 9103, name: "Legend: Bloodline", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendBloodline" },
  { id: 9104, name: "Legend: Alacrity", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendAlacrity" },
  { id: 9105, name: "Legend: Haste", path: 8000, slot: 2, game: "Perks/Styles/Precision/LegendHaste" },
  { id: 8444, name: "Second Wind", path: 8400, slot: 2, game: "Perks/Styles/Resolve/SecondWind" },
] as const;
const TEMPO_PERK = "Perks/Styles/Precision/LethalTempo";
const TEMPO_BOLT_HASHES = {
  "{6f0c6028}": "a3e7635d0e8ad6e452d6c9ae82c0e37ac2f5f93e3eacfb0b6d6d187e870a8687",
  "{720c64e1}": "eaacf0534014a32ab90edf17ffad55b658a16177b5f23bd0d707bfd0309a17c0",
  "{f7b50373}": "68ed2d8f373f0b79ebed2ee325c3f1dbb4a10a2c0e59e1e78b7fc27432bcb9f3",
  "{f8b50506}": "33e24ce42c27c525de01e585a908ddc80f0901aa06e160e3d3ac52dd9bd56f0f",
} as const;
const FLEET_REVIEWED_GAME_HASHES: Readonly<Record<string, string>> = {
  "Perks/Styles/Precision": "a2a9d7627cd2a88bea99d5f94e7ed2597b6e6fded407dc7c3be0cabd17b4864e",
  "Perks/Styles/Precision/FleetFootwork": "6acb0bb449c7ebfee00480418e9c6e916ebbc4cec6245ed5404ea1e54a255bd3",
  "Perks/Styles/Precision/FleetFootwork/Spells/FleetFootwork_HealMis": "fb7519ec4e0bc7c739e546aa16ad0ac2aea3cc2bb5242cf0d8f8ad86c08bafae",
  "Perks/Styles/Precision/FleetFootwork/Particles/Perks_FleetFootwork_Heal": "ba4a19b1092164420d551c80a7fa7ea37d6e21f20a6ea4106eac9f06047d6255",
  "Perks/Styles/Precision/FleetFootwork/Particles/Perks_FleetFootwork_Cas": "4752c0379fa2cb27ca355dd0933d14120d77720da92d4a7e1e561bc0fca37968",
  "Perks/Styles/Precision/FleetFootwork/Particles/Perks_FleetFootwork_Heal_Mis": "b3eed6799bbff3d5a0610353a6879b2538a78d906920c6851d73434c44d7a86b",
  "Perks/Styles/Precision/FleetFootwork/Particles/Perks_FleetFootwork_Buff": "5b24f382ebce3516790e12a7deb9d204dc28ebdf5bf890d9bff8462c3d5a3ff4",
  "Perks/Styles/Precision/FleetFootwork/Particles/Perks_FleetFootwork_Haste": "d35f2991cd6e4d2403acdc851fa300f9132bb7f37a9329c8b0087edf41b92e50"
};
const FLEET_REVIEWED_CALCULATION_HASHES: Readonly<Record<string, string>> = {
  "HealAmount": "43de2f1b232e7cb4e5a3ebfdc63affac1da88e3aaae24a1bc1ce91d3bd31810c",
  "{ad820ad4}": "859a23f7f7a73cf8cb66bc3ee404f81cf74b8af146d21555efa6f47aa4a58036",
  "MoveSpeedCalc": "316830656d8e01f4e55d089950fb6528b0d4b44f71de222bef06e75e8abff114"
};
const sha256 = (text: string) => createHash("sha256").update(text).digest("hex");
function requireThat(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`Combat runes: ${message}`);
}
function record(value: unknown, name: string): Record<string, unknown> {
  requireThat(value !== null && typeof value === "object" && !Array.isArray(value), `${name} must be an object`);
  return value as Record<string, unknown>;
}

/** Numeric reads and evidence only; this neither equips effects nor certifies a full page. */
export function buildCombatRuneRules(catalog: RuneCatalog, bundle: CombatRuneSourceBundle, gameText: string): CombatRuneRules {
  const input = record(bundle, "source bundle");
  requireThat(input.schema === 1 && input.dataset === "16.21" && input.patch === "26.21", "source dataset or patch needs review");
  requireThat(catalog?.schema === 1 && catalog.dataset === input.dataset && catalog.patch === input.patch
    && catalog.ddragonVersion === "16.21.1" && catalog.communityDragonVersion === "16.21", "catalog versions differ from the reviewed inputs");
  const gameSource = record(input.gameData, "game source");
  requireThat(gameSource.url === COMBAT_RUNE_GAME_URL && gameSource.sha256 === GAME_SHA256, "game source version or hash needs review");
  requireThat(Array.isArray(input.pages) && input.pages.length === Object.keys(REVIEWED).length, `all ${Object.keys(REVIEWED).length} complete Wiki sources are required`);
  const pages = new Map<string, RuneWikiSource>();
  for (const value of input.pages) {
    const page = record(value, "Wiki source");
    requireThat(typeof page.title === "string" && REVIEWED[page.title], "unexpected Wiki source title");
    const reviewed = REVIEWED[page.title]!;
    requireThat(!pages.has(page.title), `duplicate Wiki source ${page.title}`);
    requireThat(page.revid === reviewed.revid && page.timestamp === reviewed.timestamp, `${page.title} revision or timestamp needs review`);
    requireThat(typeof page.content === "string" && page.content.trim().length > 0
      && typeof page.sha256 === "string" && sha256(page.content) === page.sha256, `${page.title} content hash differs`);
    pages.set(page.title, page as unknown as RuneWikiSource);
  }
  for (const name of Object.keys(REVIEWED)) requireThat(pages.has(name), `missing Wiki source ${name}`);
  requireThat(Array.isArray(catalog.runes), "catalog rune inventory is required");
  for (const rule of RUNE_SOURCES) {
    const entries = catalog.runes.filter((rune) => rune.id === rule.id);
    requireThat(entries.length === 1, `catalog needs exactly one ${rule.name} entry`);
    const entry = entries[0]!, source = pages.get(`Template:Rune data ${rule.name}`)!;
    requireThat(entry.name === rule.name && entry.pathId === rule.path && entry.slot === rule.slot,
      `${rule.name} catalog identity or position differs`);
    requireThat(entry.wiki && entry.wiki.title === source.title && entry.wiki.revid === source.revid
      && entry.wiki.timestamp === source.timestamp && entry.wiki.content === source.content
      && entry.wiki.sha256 === source.sha256, `${rule.name} template differs from the catalog's exact source`);
  }
  let game: Record<string, unknown>;
  requireThat(typeof gameText === "string" && gameText.length > 0, "complete game source text is required");
  try { game = record(JSON.parse(gameText), "game data"); }
  catch (error) { throw new Error("Combat runes: invalid game data JSON", { cause: error }); }
  const evidence: RuneEffectEvidence[] = [];
  const quote = (page: RuneWikiSource, text: string) => {
    requireThat(page.content.includes(text), `${page.title} reviewed rule changed: ${text}`);
    if (!evidence.some((entry) => entry.title === page.title && entry.text === text)) evidence.push({ title: page.title, revid: page.revid, text });
  };
  const description = (name: string): { page: RuneWikiSource; text: string } => {
    const page = pages.get(`Template:Rune data ${name}`)!;
    const rows = page.content.split("\n").filter((line) => /^\|description\s*=/.test(line));
    requireThat(rows.length === 1, `${name} needs its complete current description`);
    quote(page, rows[0]!);
    return { page, text: rows[0]! };
  };
  const matchNumbers = (name: string, text: string, pattern: RegExp): number[] => {
    const match = pattern.exec(text);
    requireThat(match && match.length > 1, `${name} reviewed formula changed`);
    const values = match.slice(1).map(Number);
    requireThat(values.every(Number.isFinite), `${name} contains an invalid formula value`);
    return values;
  };
  const clientData = (name: typeof RUNE_SOURCES[number]["name"]): Record<string, unknown> => {
    const rule = RUNE_SOURCES.find((entry) => entry.name === name)!;
    const perk = record(game[rule.game], `${name} game perk`);
    requireThat(perk.mPerkId === rule.id, `${name} game ID differs`);
    return record(record(perk.mScript, `${name} game script`).mSpellScriptData, `${name} game script data`);
  };
  const client = (name: typeof RUNE_SOURCES[number]["name"]): Record<string, unknown> =>
    record(clientData(name).mEffectAmount, `${name} game amounts`);
  const agree = (name: string, amounts: Record<string, unknown>, key: string, expected: number): void => {
    const actual = amounts[key];
    // Client numbers are stored as float32; this is representation error, not a balance tolerance.
    requireThat(typeof actual === "number" && Number.isFinite(actual) && Math.abs(actual - expected) < 1e-6,
      `${name} Wiki/game ${key} disagree`);
  };

  const cheap = description("Cheap Shot");
  quote(cheap.page, "Non-{{tip|proc damage|proc}} damage sources deal");
  quote(cheap.page, "{{sbc|Valid Crowd Control:}}\n* {{tip|Immobilize|Immobilizes}}\n* {{tip|Blind}}\n* {{tip|Disarm}}\n* {{tip|Ground}}\n* {{tip|Nearsight}}\n* {{tip|Polymorph}}\n* {{tip|Silence}}\n* {{tip|Slow}}");
  quote(cheap.page, "The target must already be impaired prior to the damaging attack or spell");
  const [cheapMin, cheapMax, cheapSteps, cheapLevel] = matchNumbers("Cheap Shot level curve", cheap.text,
    /\{\{pp\|(\d+) \+ \((\d+)-\1\)\/(\d+)\*\(x-1\)\|1 to (\d+) by 1\}\}\|true damage\}\} \{\{as\|'''bonus''' true damage\}\}/);
  const [cheapCooldown] = matchNumbers("Cheap Shot cooldown", cheap.page.content, /^\|cooldown\s*=\s*(\d+)[ \t]*$/m);
  requireThat(cheapLevel === TOP_LANE_MAX_LEVEL && cheapSteps === 17 && cheapMax! > cheapMin!, "Cheap Shot level curve changed");
  const cheapAmounts = client("Cheap Shot");
  for (const [field, value] of Object.entries({ DamageIncMin: cheapMin!, DamageIncMax: cheapMax!, Cooldown: cheapCooldown! })) {
    agree("Cheap Shot", cheapAmounts, field, value);
  }
  const cheapCalculations = record(clientData("Cheap Shot").mCalculations, "Cheap Shot client calculations");
  const cheapParts = record(cheapCalculations.DamageCalc, "Cheap Shot DamageCalc").mFormulaParts;
  requireThat(Array.isArray(cheapParts) && cheapParts.length === 1, "Cheap Shot needs one level interpolation");
  const cheapCurve = record(cheapParts[0], "Cheap Shot level interpolation");
  requireThat(cheapCurve.__type === "ByCharLevelInterpolationCalculationPart" && cheapCurve.mStartValue === cheapMin
    && cheapCurve.mEndValue === cheapMax, "Cheap Shot client level interpolation changed");
  const cheapNotes = pages.get("Cheap Shot")!;
  for (const excerpt of [
    "deals {{tip|proc damage}}, and thus will not trigger [[spell effects]]",
    "{{tip|Cripple}} does '''not''' count as a valid crowd control",
    "during the damage event's on-deal-pre-drain phase",
    "on the same game tick as a crowd control effect from the same {{tip|cast instance}}",
    "If the target is already under the effects of crowd control, this does not apply.",
    "can apply a crowd control effect themselves and deal damage at a delay",
    "it clears this marker for the next time the same cast instance applies a crowd control effect",
    "All {{tip|Basic damage}} (''Note: All damage with this damage tag, not only damage from basic attacks'') is considered the same {{tip|cast instance}}",
    "her next basic attack on that target will trigger '''Cheap Shot''', regardless of the target being slowed or not",
    "effects applied before a crowd control may also trigger '''Cheap Shot''' on a damage tick",
    "Damage is no longer affected by on-attack damage modifiers.",
  ]) quote(cheapNotes, excerpt);

  const scorch = description("Scorch");
  quote(scorch.page, "Dealing {{tip|ability damage}} to an enemy {{tip|champion|champion}} sets them on fire");
  const [scorchMin, scorchMax, scorchSteps, scorchLevel, scorchDelay] = matchNumbers("Scorch level curve and delay", scorch.text,
    /\{\{pp\|(\d+) \+ \((\d+)-\1\)\/(\d+)\*\(x-1\)\|1 to (\d+) by 1\}\}\|magic damage\}\} \{\{as\|'''bonus''' magic damage\}\} after ([\d.]+) second/);
  const [scorchCooldown] = matchNumbers("Scorch cooldown", scorch.page.content, /^\|cooldown\s*=\s*(\d+)[ \t]*$/m);
  requireThat(scorchLevel === TOP_LANE_MAX_LEVEL && scorchSteps === 17 && scorchMax! > scorchMin!, "Scorch level curve changed");
  const scorchAmounts = client("Scorch");
  for (const [field, value] of Object.entries({ Damage: scorchMin!, DamageMax: scorchMax!, DotDuration: scorchDelay!,
    BurnlockoutDuration: scorchCooldown! })) agree("Scorch", scorchAmounts, field, value);
  const scorchCalculations = record(clientData("Scorch").mCalculations, "Scorch client calculations");
  const scorchParts = record(scorchCalculations.DamageCalc, "Scorch DamageCalc").mFormulaParts;
  requireThat(Array.isArray(scorchParts) && scorchParts.length === 1, "Scorch needs one level interpolation");
  const scorchCurve = record(scorchParts[0], "Scorch level interpolation");
  requireThat(scorchCurve.__type === "ByCharLevelInterpolationCalculationPart" && scorchCurve.mStartValue === scorchMin
    && scorchCurve.mEndValue === scorchMax, "Scorch client level interpolation changed");
  const scorchNotes = pages.get("Scorch")!;
  for (const excerpt of [
    "deals {{tip|proc damage}} and is tagged as {{tip|indirect damage}} and {{tip|persistent damage|periodic}} without applying {{tip|spell effects}}",
    "only affects one champion",
    "triggered as an {{tip|on-attack}} effect (via {{ai|Arise!|Azir}}, {{ai|Royal Maelstrom|Bel'Veth}}), the damage dealt will be affected by on-attack damage modifiers",
  ]) quote(scorchNotes, excerpt);
  quote(pages.get("Template:Tip data/Ability damage")!, "(internally, ActiveSpell) is a primary damage tag");
  quote(pages.get("Template:Data Azir/Arise!")!, "attack applies both {{tip|on-hit}} and {{tip|on-attack}} effects, the damage of which is reduced to 50% effectiveness");
  const maelstrom = pages.get("Template:Data Bel'Veth/Royal Maelstrom")!;
  quote(maelstrom, "formula=0.12% per 1% of target's '''missing''' health");
  quote(maelstrom, "the on-attack modifier also incorrectly applies to various other damaging effects triggered by the same damage instance");
  quote(maelstrom, "{{ri|Scorch}}, {{ii|Blackfire Torch}}");

  const taste = description("Taste of Blood");
  quote(taste.page, "Damaging an enemy {{tip|champion}} {{tip|heal|heals}} you");
  quote(taste.page, "Does not trigger at full health.");
  const [tasteMin, tasteMax, tasteSteps, tasteLevel, tasteAd, tasteAp] = matchNumbers("Taste of Blood healing", taste.text,
    /\{\{pp\|(\d+) \+ \((\d+)-\1\)\/(\d+)\*\(x-1\)\|1 to (\d+) by 1\|color=heal\}\} \{\{as\|\(\+ (\d+)% '''bonus''' AD\)\}\} \{\{as\|\(\+ (\d+)% AP\)\}\}/);
  const [tasteCooldown] = matchNumbers("Taste of Blood cooldown", taste.page.content, /^\|cooldown\s*=\s*(\d+)[ \t]*$/m);
  requireThat(tasteSteps === 17 && tasteLevel === TOP_LANE_MAX_LEVEL && tasteMax! > tasteMin!, "Taste of Blood level curve changed");
  const tasteAdRatio = tasteAd! / 100;
  const tasteApRatio = tasteAp! / 100;
  const tasteAmounts = client("Taste of Blood");
  for (const [field, value] of Object.entries({ HealAmount: tasteMin!, HealAmountMax: tasteMax!, Cooldown: tasteCooldown!,
    ADRatio: tasteAdRatio, APRatio: tasteApRatio })) agree("Taste of Blood", tasteAmounts, field, value);
  const tasteCalc = record(clientData("Taste of Blood").mCalculations, "Taste of Blood client calculations");
  const tasteParts = record(tasteCalc.HealCalc, "Taste of Blood HealCalc").mFormulaParts;
  requireThat(Array.isArray(tasteParts) && tasteParts.length === 3, "Taste of Blood needs its level, AP and bonus AD calculation parts");
  const tasteCurve = record(tasteParts[0], "Taste of Blood level interpolation");
  const tasteApPart = record(tasteParts[1], "Taste of Blood AP scaling");
  const tasteAdPart = record(tasteParts[2], "Taste of Blood bonus AD scaling");
  requireThat(tasteCurve.__type === "ByCharLevelInterpolationCalculationPart" && tasteCurve.mStartValue === tasteMin
    && tasteCurve.mEndValue === tasteMax, "Taste of Blood client level interpolation changed");
  requireThat(tasteApPart.__type === "StatByNamedDataValueCalculationPart" && tasteApPart.mDataValue === "APRatio"
    && tasteApPart.mStat === undefined && tasteApPart.mStatFormula === undefined, "Taste of Blood AP scaling changed");
  requireThat(tasteAdPart.__type === "StatByNamedDataValueCalculationPart" && tasteAdPart.mDataValue === "ADRatio"
    && tasteAdPart.mStat === 2 && tasteAdPart.mStatFormula === 2, "Taste of Blood bonus AD scaling changed");
  quote(pages.get("Taste of Blood")!, "If triggered whenever available");

  const font = description("Font of Life");
  quote(font.page, "{{tip|slow|Slowing}} or {{tip|immobilize|immobilizing}} an enemy {{tip|champion}} {{tip|heals}} you");
  const [fontRadius, fontMin, fontMax, fontSteps, fontLevel, fontRangedRatio] = matchNumbers("Font of Life healing", font.text,
    /within \{\{tip\|cr\|icononly=true\}\} (\d+) units for \{\{rd\|(\d+) \+ \((\d+)-\2\)\/(\d+)\*\(x-1\) for (\d+)\|\2\*([\d.]+) \+ \(\3\*\6-\2\*\6\)\/\4\*\(x-1\) for \5\|pp=true\|type=your level\|color=heal\}\}/);
  const [fontCooldown] = matchNumbers("Font of Life cooldown", font.page.content, /^\|cooldown\s*=\s*(\d+)[ \t]*$/m);
  requireThat(fontSteps === 17 && fontLevel === TOP_LANE_MAX_LEVEL && fontMax! > fontMin!, "Font of Life level curve changed");
  const fontAmounts = client("Font of Life");
  agree("Font of Life", fontAmounts, "Cooldown", fontCooldown!);
  agree("Font of Life", fontAmounts, "RangedMod", fontRangedRatio!);
  const fontCalculations = record(clientData("Font of Life").mCalculations, "Font of Life client calculations");
  const fontBase = record(fontCalculations.BaseHeal, "Font of Life BaseHeal");
  requireThat(Array.isArray(fontBase.mFormulaParts) && fontBase.mFormulaParts.length === 1, "Font of Life needs one level interpolation");
  const fontCurve = record(fontBase.mFormulaParts[0], "Font of Life level interpolation");
  requireThat(fontCurve.__type === "ByCharLevelInterpolationCalculationPart" && fontCurve.mStartValue === fontMin
    && fontCurve.mEndValue === fontMax, "Font of Life client level interpolation changed");
  const fontRanged = record(fontBase.mRangedMultiplier, "Font of Life ranged multiplier");
  requireThat(fontRanged.__type === "NamedDataValueCalculationPart" && fontRanged.mDataValue === "RangedMod", "Font of Life ranged multiplier changed");
  const fontNotes = pages.get("Font of Life")!;
  for (const excerpt of [
    "will trigger if the user has no allies nearby, and triggers even while {{as|100% '''maximum''' health}}",
    "{{ci|Corki}} in particular always exchanges '''Font of Life''' with {{ri|Demolish}}",
    "Interacts like expected with healing-modifiers like {{tip|Grievous Wounds}}",
    "will not grant [[assist]] credit",
  ]) quote(fontNotes, excerpt);
  quote(pages.get("Template:Tip data/Slow")!, "Negative ''slow'' values will increase the unit's");
  const drowsyNotes = pages.get("Template:Tip data/Drowsy")!;
  quote(drowsyNotes, "A unit that is ''drowsy'' is {{tip|slow|slowed}}, and afterwards will fall {{tip|sleep|asleep}}");
  quote(drowsyNotes, "prevent or remove the associated ''slow'', however, it does not prevent from falling asleep");

  const aftershock = description("Aftershock");
  const [aftershockFlat, aftershockResistPercent, aftershockFlatMR, aftershockMRPercent, aftershockDuration, aftershockResistMin, aftershockResistMax] =
    matchNumbers("Aftershock resistance grants", aftershock.text,
      /grants you a static \{\{as\|(\d+)\|armor\}\} \{\{as\|\(\+ (\d+)% '''bonus''' armor\)\}\} \{\{as\|'''bonus''' armor\}\} and \{\{as\|(\d+)\|mr\}\} \{\{as\|\(\+ (\d+)% '''bonus''' magic resistance\)\}\} \{\{as\|'''bonus''' magic resistance\}\} for \{\{fd\|([\d.]+)\}\} seconds\. The '''bonus''' resistances are each capped at \{\{pp\|(\d+) to (\d+)\}\}/);
  quote(aftershock.page, "{{tip|Immobilize|Immobilizing}} an enemy {{tip|champion}}");
  const shockwave = aftershock.page.content.split("\n").find(line => /^\|description2\s*=/.test(line))!;
  const [aftershockDamageMin, aftershockDamageMax, aftershockHealthPercent, aftershockRadius] =
    matchNumbers("Aftershock shockwave", shockwave,
      /After the duration, you release a shockwave that deals \{\{as\|\{\{pp\|(\d+) to (\d+)\}\}\|magic damage\}\} \{\{as\|\(\+ (\d+)% of your '''bonus''' health\)\}\} \{\{as\|magic damage\}\} to enemy champions and \{\{tip\|monster\|monsters\}\} within a \{\{tip\|cr\|icononly=true\}\} (\d+) radius/);
  quote(aftershock.page, shockwave);
  const [aftershockCooldown] = matchNumbers("Aftershock cooldown", aftershock.page.content, /^\|cooldown\s*=\s*(\d+)[ \t]*$/m);
  requireThat(aftershockFlat === aftershockFlatMR && aftershockResistPercent === aftershockMRPercent
    && aftershockDamageMax! > aftershockDamageMin! && aftershockResistMax! > aftershockResistMin!, "Aftershock grant symmetry or endpoints changed");
  const aftershockAmounts = client("Aftershock");
  const aftershockResistRatio = aftershockResistPercent! / 100, aftershockHealthRatio = aftershockHealthPercent! / 100;
  for (const [key, value] of Object.entries({ DamageRadius: aftershockRadius!, Cooldown: aftershockCooldown!,
    StartingBaseDamage: aftershockDamageMin!, MaxBaseDamage: aftershockDamageMax!, DelayBeforeBurst: aftershockDuration!,
    HealthRatio: aftershockHealthRatio, FlatResists: aftershockFlat!, BonusResistMin: aftershockResistMin!,
    BonusResistMax: aftershockResistMax!, PercentBonusResist: aftershockResistRatio })) agree("Aftershock", aftershockAmounts, key, value);
  const aftershockCalculations = record(clientData("Aftershock").mCalculations, "Aftershock client calculations");
  for (const [key, minimum, maximum, count] of [
    ["MaxResistCalc", aftershockResistMin!, aftershockResistMax!, 1], ["DamageCalc", aftershockDamageMin!, aftershockDamageMax!, 2],
  ] as const) {
    const parts = record(aftershockCalculations[key], "Aftershock " + key).mFormulaParts;
    requireThat(Array.isArray(parts) && parts.length === count, "Aftershock " + key + " formula length differs");
    const level = record(parts[0], "Aftershock level interpolation");
    requireThat(level.__type === "ByCharLevelInterpolationCalculationPart" && level.mStartValue === minimum && level.mEndValue === maximum,
      "Aftershock " + key + " level interpolation changed");
  }
  for (const [key, stat, field] of [
    ["ArmorBuff", 1, "PercentBonusResist"], ["MagicResistBuff", 6, "PercentBonusResist"], ["DamageCalc", 12, "HealthRatio"],
  ] as const) {
    const parts = record(aftershockCalculations[key], "Aftershock " + key).mFormulaParts;
    requireThat(Array.isArray(parts) && parts.length === 2, "Aftershock " + key + " formula length differs");
    if (key !== "DamageCalc") {
      const flat = record(parts[0], "Aftershock flat resistance");
      requireThat(flat.__type === "NamedDataValueCalculationPart" && flat.mDataValue === "FlatResists", "Aftershock " + key + " flat resistance changed");
    }
    const ratio = record(parts[1], "Aftershock bonus stat scaling");
    requireThat(ratio.__type === "StatByNamedDataValueCalculationPart" && ratio.mStat === stat
      && ratio.mStatFormula === 2 && ratio.mDataValue === field, "Aftershock " + key + " bonus stat scaling changed");
  }
  const aftershockNotes = pages.get("Aftershock")!;
  for (const excerpt of [
    "deals {{tip|area damage}}, additionally tagged as {{tip|proc damage|proc}}, and thus will apply {{tip|spell effects}}",
    "On champions without immobilizing effects and {{ci|Yorick}}, '''Aftershock''' is exchanged with {{ri|Grasp of the Undying}}",
    "resistances do not scale dynamically; it only benefits from the bonus at the time of its trigger",
    "will not activate if the immobilizing effect was applied to a target that is {{tip|displacement immune}}",
    "the owning champion's death would cause the damage effect to apply early",
  ]) quote(aftershockNotes, excerpt);
  const immobilize = pages.get("Template:Tip data/Immobilize")!;
  for (const excerpt of [
    "{{tip|Airborne}}", "{{tip|Forced Action}} ({{tip|Berserk}}, {{tip|Charm}}, {{tip|Flee}}, {{tip|Taunt}})",
    "{{tip|Root}}", "{{tip|Sleep}}", "{{tip|Stasis}}", "{{tip|Stun}} ({{tip|Suspension}})", "{{tip|Suppression}}",
  ]) quote(immobilize, excerpt);
  quote(pages.get("Armor")!, "'''Runes''' = {{ri|Aftershock|158}} + {{ri|Conditioning|8}} + {{ri|Unflinching|10}} = 176 armor");
  quote(pages.get("Magic resistance")!, "{{tt|{{ri|Aftershock|158}}|Level 20 from Top Lane Quest}}");
  quote(pages.get("Range")!, "[[Aura]]s (self-centered areas-of-effect) use centered range");
  quote(pages.get("Spell shield")!, "but not ones coming from [[rune]]s and [[summoner spell]]s. The exceptions for the latter two are {{ri|Arcane Comet}}");
  // Both client curves use the same endpoints convention. The resistance examples
  // confirm the cap grows past level 18. Apply that convention to burst damage too.
  const aftershockCap = aftershockResistMin! + (aftershockResistMax! - aftershockResistMin!) * (TOP_LANE_MAX_LEVEL - 1) / 17;
  const aftershockBaseDamage = aftershockDamageMin! + (aftershockDamageMax! - aftershockDamageMin!) * (TOP_LANE_MAX_LEVEL - 1) / 17;

  const overgrowth = description("Overgrowth");
  const [overgrowthUnits, overgrowthFlatHp] = matchNumbers("Overgrowth stack progress", overgrowth.text,
    /Every (\d+) \{\{tip\|monster\|monsters\}\} or enemy \{\{tip\|minion\|minions\}\} that die near you permanently generates a \[\[stack\]\]\. Each stack grants \{\{as\|(\d+) '''bonus''' health\}\}/);
  quote(overgrowth.page, "This effect can stack indefinitely.");
  const [overgrowthThresholdStacks, overgrowthThresholdUnits, overgrowthHealthPercent] = matchNumbers("Overgrowth threshold", overgrowth.page.content,
    /^\|description2\s*=\s*After reaching (\d+) stacks \((\d+) monsters or minions\), your \{\{as\|'''base'''\|health\}\} and \{\{as\|'''bonus''' health\}\} are permanently increased by \{\{fd\|([\d.]+)\}\}%\.$/m);
  const [overgrowthRadius] = matchNumbers("Overgrowth radius", overgrowth.page.content, /^\|range\s*=\s*(\d+)[ \t]*$/m);
  requireThat(overgrowthUnits! > 0 && overgrowthFlatHp! > 0 && overgrowthThresholdStacks! > 0
    && overgrowthThresholdUnits === overgrowthUnits! * overgrowthThresholdStacks!
    && overgrowthHealthPercent! > 0 && overgrowthRadius! > 0, "Overgrowth threshold or gain differs from the reviewed stack structure");
  const overgrowthHealthRatio = overgrowthHealthPercent! / 100;
  const overgrowthAmounts = client("Overgrowth");
  for (const [key, value] of Object.entries({ UnitsPerTier: overgrowthUnits!, FlatHealthPerTier: overgrowthFlatHp!,
    ThresholdUnits: overgrowthThresholdUnits!, ThresholdMaxHealthRatio: overgrowthHealthRatio, Range: overgrowthRadius! })) {
    agree("Overgrowth", overgrowthAmounts, key, value);
  }
  const overgrowthNotes = pages.get("Overgrowth")!;
  for (const text of [
    "only counts unit deaths the champion has direct line of {{tip|sight}} on",
    "Shared vision with other allied units observing the dying units is ignored",
    "split into a {{as|'''base'''|health}} and {{as|'''bonus''' health}} portion",
    "base''' health scalings",
    "users may still gain the effect while [[death|dead]]",
  ]) quote(overgrowthNotes, text);
  quote(pages.get("Template:Data Pyke/Gift of the Drowned Ones")!,
    "Game elements that increase health based on the champion's health (e.g {{ri|Overgrowth}}) will increase the health before getting converted");

  const shieldBash = description("Shield Bash");
  const [shieldBase, shieldMax, shieldBaseRepeat, shieldInterval, shieldOffset, shieldLevelStart, shieldLevelEnd, shieldLevelStep] =
    matchNumbers("Shield Bash base damage", shieldBash.text,
      /\{\{pp\|(\d+) \+ \((\d+)-(\d+)\)\/(\d+)\*\(x-(\d+)\)\|(\d+) to (\d+) by (\d+)\}\}/);
  const [shieldHealthRatio, shieldAmountRatio] = matchNumbers("Shield Bash damage ratios", shieldBash.text,
    /\{\{as\|\(\+ \{\{fd\|([\d.]+)\}\}% '''bonus''' health\)\}\} \{\{as\|\(\+ ([\d.]+)% shield amount\)\}\} '''bonus''' \{\{tip\|adaptive damage\}\} \[\[on-hit\]\]/);
  const [shieldLinger] = matchNumbers("Shield Bash grace period", shieldBash.text,
    /The empowered attack lasts for up to ([\d.]+) seconds after the shield expires\./);
  quote(shieldBash.page, "Whenever you gain a {{tip|shield}}, your next attack against an enemy {{tip|champion}} is empowered");
  requireThat(shieldBase! > 0 && shieldBase === shieldBaseRepeat && shieldMax! > shieldBase!
    && shieldInterval === 17 && shieldOffset === 1 && shieldLevelStart === shieldOffset
    && shieldLevelEnd === TOP_LANE_MAX_LEVEL && shieldLevelStep === 1,
  "Shield Bash needs the reviewed formula through level 20");
  const shieldBashAmounts = client("Shield Bash");
  for (const [key, value] of Object.entries({ ProcBaseMin: shieldBase!, ProcBaseMax: shieldMax!,
    BonusHealthRatio: shieldHealthRatio!, ShieldRatio: shieldAmountRatio!, ProcDuration: shieldLinger! })) {
    agree("Shield Bash", shieldBashAmounts, key, value);
  }
  const shieldBashNotes = pages.get("Shield Bash")!;
  for (const text of [
    "deals {{tip|proc damage}}, and thus will not trigger [[spell effects]].",
    "highest value of shield that is either currently active or has expired within the last 2 seconds",
    "all previously applied shield instances become invalid",
    "calculated with the initial maximum value of the shield",
    "the highest instance of shielding that has been achieved",
    "can only trigger once per gained shield",
    "triggers from all shield types, including magic and physical ones",
    "No longer grants {{pp|1 to 10}} {{sti|{{as|'''bonus''' armor}}}} and {{sti|{{as|'''bonus''' magic resistance}}}} while shielded.",
  ]) quote(shieldBashNotes, text);
  quote(pages.get("Shield")!, "mitigate the damage before being absorbed by '''shielding'''");
  quote(pages.get("Template:Data Hwei/Pool of Reflection")!, "The shield refreshes and increases in strength");
  quote(pages.get("Template:Data Kled/Chaaaaaaaarge!!!")!, "the duo gain an initial {{tip|shield}}, plus an additional amount");
  quote(pages.get("Template:Data Nunu/Absolute Zero")!, "any of the duo's remaining shield will decay over 3 seconds");
  quote(pages.get("Template:Data Mordekaiser/Indestructible")!, "consumes the remaining shield, {{tip|healing}} for a portion of the amount");
  quote(pages.get("Template:Data Camille/Adaptive Defenses")!, "next {{tip|basic attack}} {{tip|on-hit}} against an enemy champion grants her a {{tip|shield}}");
  const shieldBashDamage = shieldBase! + (shieldMax! - shieldBase!) * (shieldLevelEnd - shieldOffset) / shieldInterval;

  const bone = description("Bone Plating");
  const [boneDuration, boneCharges] = matchNumbers("Bone Plating duration and charges", bone.text,
    /activate ''Bone Plating'' for \{\{fd\|([\d.]+)\}\} seconds\. While active, the next (\d+) spells or attacks you receive from the enemy champion that triggered this effect/);
  const [boneBase, boneMax, boneBaseRepeat, boneInterval, boneOffset, boneLevelStart, boneLevelEnd, boneLevelStep] = matchNumbers("Bone Plating true-inclusive reduction", bone.text,
    /\{\{pp\|(\d+) \+ \((\d+)-(\d+)\)\/(\d+)\*\(x-(\d+)\)\|(\d+) to (\d+) by (\d+)\}\} less damage \(including \{\{tip\|true damage\}\}\)/);
  const boneCooldownRows = bone.page.content.split("\n").filter(line => /^\|cooldown\s*=/.test(line));
  requireThat(boneCooldownRows.length === 1, "Bone Plating needs its cooldown field");
  const [boneCooldown] = matchNumbers("Bone Plating cooldown", boneCooldownRows[0]!, /^\|cooldown\s*=\s*([\d.]+)\s*$/);
  quote(bone.page, boneCooldownRows[0]!);
  requireThat(boneCharges === 3 && boneDuration! > 0 && boneCooldown! > 0
    && boneBase! > 0 && boneBase === boneBaseRepeat && boneMax! > boneBase!
    && boneInterval === 17 && boneOffset === 1 && boneLevelStart === boneOffset
    && boneLevelEnd === TOP_LANE_MAX_LEVEL && boneLevelStep === 1,
  "Bone Plating needs three plates and the reviewed formula through level 20");
  const boneAmounts = client("Bone Plating");
  for (const [key, value] of Object.entries({ BlockBase: boneBase!, BlockMax: boneMax!, BlockCount: boneCharges,
    BlockDuration: boneDuration!, Cooldown: boneCooldown! })) agree("Bone Plating", boneAmounts, key, value);
  const boneCalcs = record(clientData("Bone Plating").mCalculations, "Bone Plating calculations");
  const boneCalc = record(boneCalcs.BlockCalc, "Bone Plating reduction calculation");
  requireThat(boneCalc.__type === "GameCalculation" && Array.isArray(boneCalc.mFormulaParts) && boneCalc.mFormulaParts.length === 1,
    "Bone Plating needs its client interpolation calculation");
  const bonePart = record(boneCalc.mFormulaParts[0], "Bone Plating interpolation");
  requireThat(bonePart.__type === "ByCharLevelInterpolationCalculationPart", "Bone Plating interpolation type changed");
  agree("Bone Plating", bonePart, "mStartValue", boneBase!);
  agree("Bone Plating", bonePart, "mEndValue", boneMax!);
  const boneNotes = pages.get("Bone Plating")!;
  for (const text of [
    "The triggering instance of damage will not have its damage reduced by '''Bone Plating'''.",
    "will still go on cooldown after its duration even if it does not block any damage.",
    "only blocks damage from the champion who triggered it",
    "damage reduction can only occur once per {{tip|cast instance}}.",
    "This can be the same cast instance as the one that initially triggers '''Bone Plating''', if it deals multiple instances of damage (e.g {{cai|W|Kled}}).",
    "Reduced to or equal to [[Damage#0_Damage_Instances|0 damage]].",
    "Dealt to {{tip|shield|shields}}.",
    "Absorbed by {{tip|invulnerable|invulnerability}}.",
    "{{tt|post-mitigation damage|Damage calculated after modifiers or resistances}}",
    "the cooldown was incorrectly reset when revive effects were triggered",
  ]) quote(boneNotes, text);
  quote(pages.get("Template:Data Braum/Unbreakable")!, "negates the first instance of damage dealt by a champion completely from this direction");
  quote(pages.get("Template:Data Kled/Violent Tendencies")!, "The fourth attack is empowered to deal {{as|'''additional''' physical damage}}");
  const boneReduction = boneBase! + (boneMax! - boneBase!) * (boneLevelEnd - boneOffset) / boneInterval;

  const grasp = description("Grasp of the Undying");
  const [graspCombatWindow, graspCap, graspReadyWindow] = matchNumbers("Grasp stack and ready windows", grasp.text,
    /generates 1 \[\[stack\]\] every second for the next (\d+) seconds, refreshing the duration with each instance of combat and stacking the effect up to (\d+) times\. At maximum stacks, your next \[\[basic attack\]\] \{\{tip\|on-hit\}\} within (\d+) seconds/);
  const [graspMeleeDamage, graspRangedDamage] = matchNumbers("Grasp damage ratio", grasp.text,
    /'''bonus''' magic damage\}\} equal to \{\{as\|\{\{rd\|\{\{fd\|([\d.]+)\}\}%\|\{\{fd\|([\d.]+)\}\}%\}\} of your '''maximum''' health/);
  const [graspMeleeHeal, graspRangedHeal] = matchNumbers("Grasp heal ratio", grasp.text,
    /\{\{tip\|heal\}\} you for \{\{as\|\{\{rd\|\{\{fd\|([\d.]+)\}\}%\|\{\{fd\|([\d.]+)\}\}%\}\} of your '''maximum''' health/);
  const [graspMeleeHealth, graspRangedHealth] = matchNumbers("Grasp bonus health", grasp.text,
    /permanently grant you \{\{as\|\{\{rd\|(\d+)\|(\d+)\}\} '''bonus''' health/);
  const graspInterval = 1;
  const graspRanged = 0.4;
  const graspHealDelay = 0.4;
  requireThat(graspCap === 4 && graspCombatWindow === 3 && graspReadyWindow === 5
    && Math.abs(graspRangedDamage! - graspMeleeDamage! * graspRanged) < 1e-12
    && Math.abs(graspRangedHeal! - graspMeleeHeal! * graspRanged) < 1e-12
    && graspRangedHealth === graspMeleeHealth! * graspRanged,
  "Grasp needs the reviewed charge windows and consistent ranged effects");
  const graspAmounts = client("Grasp of the Undying");
  for (const [key, value] of Object.entries({ PercentHealthDamage: graspMeleeDamage! / 100, Window: graspReadyWindow,
    TriggerTime: graspCap * graspInterval, PercentHealthHeal: graspMeleeHeal! / 100,
    MaxHealthPerProc: graspMeleeHealth!, RangedPenaltyMod: graspRanged, RangedHealthPerProc: graspRangedHealth!, MeleeFlatHeal: 0 })) {
    agree("Grasp of the Undying", graspAmounts, key, value);
  }
  const graspMissile = record(game["Perks/Styles/Resolve/GraspOfTheUndying/Spells/RuinedKing_HealMis"], "Grasp heal missile");
  const graspSpell = record(graspMissile.mSpell, "Grasp heal missile spell");
  const graspMissileSpec = record(graspSpell.mMissileSpec, "Grasp heal missile specification");
  const graspMovement = record(graspMissileSpec.movementComponent, "Grasp heal missile movement");
  requireThat(graspMissile.mScriptName === "RuinedKing_HealMis" && graspMovement.__type === "FixedTimeMovement"
    && Array.isArray(graspMissileSpec.behaviors) && graspMissileSpec.behaviors.length === 2
    && record(graspMissileSpec.behaviors[0], "Grasp heal missile arrival").__type === "CastOnMovementComplete"
    && record(graspMissileSpec.behaviors[1], "Grasp heal missile end").__type === "DestroyOnMovementComplete",
  "Grasp needs the reviewed fixed-time heal missile and arrival behavior");
  agree("Grasp heal missile", graspMovement, "mTravelTime", graspHealDelay);
  const graspNotes = pages.get("Grasp of the Undying")!;
  quote(graspNotes, "'''Grasp of the Undying''' deals {{tip|proc damage}}");
  quote(graspNotes, "The damage dealt by '''Grasp of the Undying''' is not affected by on-hit damage modifiers.");
  quote(graspNotes, "No longer apply its effect if the attack that would apply it is blocked.");
  quote(graspNotes, "The empowered attack is primed for 5 seconds, refreshing whenever you deal or receive damage.");
  quote(pages.get("Combat status")!, "* {{ri|Grasp of the Undying}}<!--damage-->");
  quote(pages.get("Template:Data Gangplank/Parrrley")!, "applies {{tip|on-hit}} effects as a {{tip|ranged}} attack");
  quote(pages.get("Template:Data Azir/Arise!")!, "the damage of which is reduced to 50% effectiveness");
  quote(pages.get("Template:Data Urgot/Purge")!, "on-hit and on-attack damage reduced to 50% effectiveness");

  const conqueror = description("Conqueror");
  const [conqDuration, conqCap, conqMelee, conqRanged, conqSpell, conqCooldown] = matchNumbers("Conqueror stack gain", conqueror.text,
    /lasting for (\d+) seconds, refreshing on subsequent damage against champions, and stacking up to (\d+) times\. Gain \{\{rd\|(\d+)\|(\d+)\}\} stacks.*Otherwise, gain (\d+) stacks.*up to once every (\d+) seconds per \{\{tip\|cast instance\}\}/);
  const conqStatRows = conqueror.page.content.split("\n").filter(line => /^\|description2\s*=/.test(line));
  requireThat(conqStatRows.length === 1, "Conqueror needs its complete adaptive and healing description");
  const conqStatRow = conqStatRows[0]!;
  quote(conqueror.page, conqStatRow);
  const [conqMin, conqMax, conqGrowth, conqStart, conqLevel] = matchNumbers("Conqueror adaptive force growth", conqStatRow,
    /\{\{adaptive\|([\d.]+) \+ \(([\d.]+)-\1\)\/(\d+)\*\(x-(\d+)\)\|(\d+)\}\}/);
  const [conqHeal, conqRangedHeal] = matchNumbers("Conqueror healing", conqStatRow, /\{\{tip\|heal\}\} for \{\{rd\|(\d+)%\|(\d+)%\}\}/);
  const adaptiveSource = pages.get("Adaptive force")!;
  const conversion = adaptiveSource.content.split("\n").filter(line => line.includes("point of Adaptive Force provides"));
  requireThat(conversion.length === 1, "Conqueror requires the exact adaptive force conversion");
  quote(adaptiveSource, conversion[0]!);
  const [conqAD, conqAP] = matchNumbers("Conqueror adaptive force conversion", conversion[0]!,
    /adaptiveAdRatio\|([\d.]+).*adaptiveApRatio\|([\d.]+)/);
  requireThat(conqCap === 12 && conqMelee === 2 && conqRanged === 1 && conqSpell === 2
    && conqLevel === TOP_LANE_MAX_LEVEL && conqStart === 1 && conqGrowth === 17 && conqMin! > 0 && conqMax! > conqMin!
    && conqCooldown! > 0 && conqCooldown! < conqDuration! && conqHeal! >= conqRangedHeal! && conqRangedHeal! > 0
    && conqAD === 0.6 && conqAP === 1, "Conqueror needs consistent stack, adaptive force and healing values");
  const conqClient = client("Conqueror");
  for (const [key, value] of Object.entries({ MinAdaptivePerStack: conqMin!, MaxAdaptivePerStack: conqMax!,
    MaxStacks: conqCap, BuffDuration: conqDuration!, TimeUntilNextStackFromSameSpell: conqCooldown!,
    HealingPercent: conqHeal! / 100, RangedHealingPercent: conqRangedHeal! / 100 })) agree("Conqueror", conqClient, key, value);
  requireThat(sha256(JSON.stringify(game["Perks/Styles/Precision/Conqueror"])) === "c518745288bc82b9618ebaea81226c6e4a9a9d33b0b7a6119888ee75691654bd",
    "Conqueror complete client perk changed");
  const conqEvidence: readonly [string, string][] = [
    ["Conqueror", "stacking can only occur once per {{tip|cast instance}}."],
    ["Conqueror", "generate 1 stack of '''Conqueror''' per attack."],
    ["Damage", "basic attacks ''not'' tagged '''BasicAttack'''"],
    ["Cast instance", "all [[basic attack]]s (which are active by design)"],
    ["Template:Tip data/Cast instance", "the game's method of associating multiple effects"],
    ["Template:Data Kayle/Divine Ascent", "stacks gained will be {{rd|2|1}} if the basic attack deals damage first or 2 if the wave does so."],
    ["Template:Data Garen/Judgment", "Each spin triggers a stack of {{ri|Conqueror}}."],
    ["Template:Data Wukong/Cyclone", "special cased to grant stacks of {{ri|Conqueror}} for each tick of damage."],
    ["Template:Data Mordekaiser/Darkness Rise", "it will be treated as the same {{tip|cast instance}} as the triggering spell."],
  ];
  for (const [title, text] of conqEvidence) quote(pages.get(title)!, text);
  const conqForce = conqMin! + (conqMax! - conqMin!) * (TOP_LANE_MAX_LEVEL - conqStart) / conqGrowth;

  const tempo = description("Lethal Tempo");
  const tempoRow = (index: number): string => {
    const rows = tempo.page.content.split("\n").filter(line => line.startsWith("|description" + index + " "));
    requireThat(rows.length === 1, "Lethal Tempo needs the complete reviewed description row " + index);
    quote(tempo.page, rows[0]!);
    return rows[0]!;
  };
  const tempoBoltText = tempoRow(2);
  const [tempoDuration, tempoCap, tempoAS, tempoASRepeated, tempoRangedAS, tempoMaxAS, tempoMaxRepeated, tempoMaxRangedAS]
    = matchNumbers("Lethal Tempo stack and speed", tempo.text,
      /grant a \{\{tip\|stack\}\} for (\d+) seconds, refreshing on subsequent attacks and stacking up to (\d+) times\. Gain \{\{as\|\{\{rd\|([\d.]+)%\|\{\{ap\|([\d.]+)\*([\d.]+)\}\}%\}\} '''bonus''' attack speed\|as\}\} for each stack, up to \{\{as\|\{\{rd\|([\d.]+)%\|\{\{ap\|([\d.]+)\*([\d.]+)\}\}%/);
  const [tempoBase, tempoMax, tempoBaseRepeated, tempoInterval, tempoStart, tempoLevel, tempoRangedBolt]
    = matchNumbers("Lethal Tempo bolt growth", tempoBoltText,
      /\{\{rd\|(\d+) \+ \((\d+)-(\d+)\)\/(\d+)\*\(x-(\d+)\) for (\d+)\|\(\1 \+ \(\2-\3\)\/\4\*\(x-\5\)\)\*([\d.]+) for \6\|pp=true\}\}/);
  const [tempoScaling, tempoPer] = matchNumbers("Lethal Tempo bonus attack speed scaling", tempoBoltText,
    /upon arrival, increased by ([\d.]+)% per \{\{as\|([\d.]+)% '''bonus''' attack speed\}\}/);
  const [tempoDecay] = matchNumbers("Lethal Tempo stack decay", tempoRow(3),
    /one stack expires immediately and the rest expire one by one every \{\{fd\|([\d.]+)\}\} seconds/);
  requireThat(tempoCap === 6 && tempoDuration! > 0 && tempoDecay! > 0 && tempoAS! > 0 && tempoAS === tempoASRepeated
    && tempoMaxAS === tempoMaxRepeated && tempoMaxAS === tempoCap * tempoAS!
    && tempoRangedAS === tempoMaxRangedAS && tempoRangedAS! > 0 && tempoRangedAS! <= 1
    && tempoLevel === TOP_LANE_MAX_LEVEL && tempoStart === 1 && tempoInterval === 17
    && tempoBase === tempoBaseRepeated && tempoBase! > 0 && tempoMax! > tempoBase!
    && tempoRangedBolt! > 0 && tempoRangedBolt! <= 1 && tempoScaling === 1 && tempoPer === 1,
  "Lethal Tempo needs consistent stack, decay, melee and ranged bolt formula terms");
  const tempoAmounts = client("Lethal Tempo");
  for (const [key, value] of Object.entries({ Duration: tempoDuration!, MaxStacks: tempoCap,
    TTASPerStackMelee: tempoAS! / 100, TTMinNoteDamageMelee: tempoBase!, TTMaxNoteDamageMelee: tempoMax!,
    TTASPerStackRanged: 0.04, TTMinNoteDamageRanged: 6, TTMaxNoteDamageRanged: 24, PerfectlyTimedForgivance: 0.25 })) {
    agree("Lethal Tempo", tempoAmounts, key, value);
  }
  // The ranged display fields above disagree with the current calculations.
  // Qualify the complete calculations, then read the multipliers used there.
  const tempoCalcs = record(clientData("Lethal Tempo").mCalculations, "Lethal Tempo calculations");
  const tempoSpeedCalc = record(tempoCalcs.ASPerStack, "Lethal Tempo ASPerStack");
  const tempoBoltCalc = record(tempoCalcs.NoteDamage, "Lethal Tempo NoteDamage");
  agree("Lethal Tempo", record(tempoSpeedCalc.mRangedMultiplier, "ASPerStack modifier"), "mNumber", tempoRangedAS!);
  agree("Lethal Tempo", record(tempoBoltCalc.mRangedMultiplier, "NoteDamage modifier"), "mNumber", tempoRangedBolt!);
  requireThat(sha256(JSON.stringify(game[TEMPO_PERK])) === "fc1df73c3b6016d4b7d3203a21c951b0d4159edf9e41ef10f7cd75ed0372e8a6",
    "Lethal Tempo complete client perk or calculation changed");
  const tempoSpeeds = Object.entries(TEMPO_BOLT_HASHES).map(([key, hash]) => {
    const bolt = record(game[key], "Lethal Tempo bolt " + key);
    requireThat(sha256(JSON.stringify(bolt)) === hash, "Lethal Tempo complete bolt object changed " + key);
    const spell = record(bolt.mSpell, "Lethal Tempo bolt spell");
    const missile = record(spell.mMissileSpec, "Lethal Tempo bolt missile");
    const movement = record(missile.movementComponent, "Lethal Tempo bolt movement");
    requireThat(movement.__type === "FixedSpeedSplineMovement" && movement.mTracksTarget === false
      && typeof movement.mSpeed === "number" && Number.isFinite(movement.mSpeed) && movement.mSpeed > 0,
    "Lethal Tempo bolt needs a positive reviewed nontracking spline speed");
    return movement.mSpeed;
  });
  const tempoBoltSpeed = tempoSpeeds[0]!;
  requireThat(tempoSpeeds.every(speed => speed === tempoBoltSpeed), "Lethal Tempo bolt speed disagrees across client variants");
  const tempoNoteSources: readonly [string, RegExp][] = [
    ["Lethal Tempo", /will not trigger \[\[spell effects\]\]/],
    ["Lethal Tempo", /switching between Hammer and Cannon changes them immediately/],
    ["Lethal Tempo", /values above are the ones actually dealt/],
    ["Lethal Tempo", /own attack speed stacks count/],
    ["Lethal Tempo", /Attack speed above the attack speed cap still increases the damage/],
    ["Lethal Tempo", /grants stacks when attacking champion clones/],
    ["Lethal Tempo", /no longer incorrectly destroys spell shields/],
    ["Attack effects", /^The following effects trigger when a champion ''completes''/],
    ["Attack effects", /^The following trigger on-attack effects upon/],
    ["Template:Tip data/Adaptive damage", /^\|description\s*=/],
  ];
  for (const [title, pattern] of tempoNoteSources) {
    const page = pages.get(title)!;
    const rows = page.content.split("\n").filter(line => pattern.test(line));
    requireThat(rows.length === 1, "Lethal Tempo needs the reviewed contextual rule from " + title + ": " + pattern);
    quote(page, rows[0]!);
  }
  const tempoBoltDamage = tempoBase! + (tempoMax! - tempoBase!) * (TOP_LANE_MAX_LEVEL - tempoStart) / tempoInterval;

  const fleet = description("Fleet Footwork");
  const fleetDescriptionRows = fleet.page.content.split("\n").filter(line => /^\|description2\s*=/.test(line));
  requireThat(fleetDescriptionRows.length === 1, "Fleet Footwork needs its complete current heal and movement description");
  const fleetText = fleetDescriptionRows[0]!;
  quote(fleet.page, fleetText);
  const fleetFormula = /\{\{rd\|([^|]+)\|([^|]+)\|color=heal\|pp=true\}\}/.exec(fleetText);
  requireThat(fleetFormula, "Fleet Footwork needs both explicit level20 growth expressions");
  const [fleetBase, fleetGrowth, fleetInterval, fleetStart, fleetGrowthBase, fleetGrowthRate, fleetGrowthStart, fleetLevel] = matchNumbers("Fleet Footwork melee growth", fleetFormula[1]!,
    /^([\d.]+)\+\(([\d.]+)\/([\d.]+)\)\*\(x-([\d.]+)\)\*\(([\d.]+)\+([\d.]+)\*\(x-([\d.]+)\)\) for (\d+)$/);
  const [fleetRangedBase, fleetRangedRatio, fleetRangedGrowth, fleetRangedGrowthRatio, fleetRangedInterval,
    fleetRangedStart, fleetRangedGrowthBase, fleetRangedGrowthRate, fleetRangedGrowthStart, fleetRangedLevel] = matchNumbers("Fleet Footwork ranged growth", fleetFormula[2]!,
    /^([\d.]+)\*([\d.]+)\+\(\(([\d.]+)\*([\d.]+)\)\/([\d.]+)\)\*\(x-([\d.]+)\)\*\(([\d.]+)\+([\d.]+)\*\(x-([\d.]+)\)\) for (\d+)$/);
  requireThat(TOP_LANE_MAX_LEVEL === 20 && fleetLevel === TOP_LANE_MAX_LEVEL && fleetRangedLevel === fleetLevel
    && fleetStart === 1 && fleetGrowthStart === 1 && fleetRangedStart === fleetStart && fleetRangedGrowthStart === fleetGrowthStart
    && fleetBase! > 0 && fleetGrowth! > 0 && fleetInterval! > 0 && fleetGrowthBase! > 0 && fleetGrowthRate! > 0
    && fleetRangedBase === fleetBase && fleetRangedGrowth === fleetGrowth && fleetRangedInterval === fleetInterval
    && fleetRangedGrowthBase === fleetGrowthBase && fleetRangedGrowthRate === fleetGrowthRate
    && fleetRangedRatio! > 0 && fleetRangedRatio! <= 1 && fleetRangedGrowthRatio === fleetRangedRatio,
  "Fleet Footwork requires the reviewed matching positive level20 growth curves");
  const [fleetADPercent, fleetRangedADPercent] = matchNumbers("Fleet Footwork bonus AD", fleetText,
    /\{\{rd\|([\d.]+)%\|([\d.]+)%\}\} '''bonus''' AD/);
  const [fleetAPPercent, fleetRangedAPPercent] = matchNumbers("Fleet Footwork AP", fleetText,
    /\{\{rd\|([\d.]+)%\|([\d.]+)%\}\} AP/);
  const [fleetMSPercent, fleetRangedMSPercent, fleetDuration, fleetMinionPercent] = matchNumbers("Fleet Footwork speed and minion heal", fleetText,
    /grant \{\{as\|\{\{rd\|([\d.]+)%\|([\d.]+)%\}\}\|ms\}\}[\s\S]*for ([\d.]+) second\. Against \{\{tip\|minion\|minions\}\}, the healing is ([\d.]+)% effective\./);
  const [fleetMaximum] = matchNumbers("Fleet Footwork maximum charges", fleet.text, /up to (\d+)\./);
  const [fleetReady] = matchNumbers("Fleet Footwork ready threshold", fleetText, /At (\d+) ''Charges'', become \{\{tip\|Energized\}\}/);
  const fleetTip = pages.get("Template:Tip data/Energized")!;
  const [genericMaximum, genericAttackCharges, genericDistance] = matchNumbers("Energized charge generation", fleetTip.content,
    /up to (\d+)\. Champions with '''Energized''' gain (\d+) ''Charges'' per basic attack and 1 ''Charge'' for every (\d+) units travelled/);
  const [genericReady] = matchNumbers("Energized on-hit consumption", fleetTip.content,
    /At (\d+) charges, they become fully '''Energized''', empowering their next basic attack to consume the charges on-hit/);
  requireThat(fleetMaximum === fleetReady && fleetReady === genericReady && fleetMaximum === genericMaximum,
    "Fleet Footwork and Energized charge caps and consumption thresholds disagree");
  const fleetNotes = pages.get("Template:Energized info")!;
  const fleetChargeRows = fleetNotes.content.split("\n").filter(line => /^\* Each \[\[basic attack\]\]/.test(line));
  requireThat(fleetChargeRows.length === 1, "Fleet Footwork needs complete movement and basic charge notes");
  quote(fleetNotes, fleetChargeRows[0]!);
  const [fleetAttackCharges, fleetDistance] = matchNumbers("Fleet Footwork charge generation", fleetChargeRows[0]!,
    /\[\[on-attack\]\] generates ([\d.]+) ''Energize'' stacks while 1 is generated for every ([\d.]+) in-game units traveled\./);
  const fleetAbilityRows = fleetNotes.content.split("\n").filter(line => /^\*\* Hitting abilities/.test(line));
  requireThat(fleetAbilityRows.length === 1, "Fleet Footwork needs its on-hit ability charge note");
  quote(fleetNotes, fleetAbilityRows[0]!);
  const [fleetAbilityCharges] = matchNumbers("Fleet Footwork ability charges", fleetAbilityRows[0]!, /will also generate ([\d.]+) stacks/);
  requireThat(fleetAttackCharges! > 0 && fleetAttackCharges === fleetAbilityCharges && fleetAttackCharges === genericAttackCharges
    && fleetDistance! > 0 && fleetDistance === genericDistance && fleetMaximum! > fleetAttackCharges!
    && [fleetADPercent, fleetAPPercent, fleetMSPercent, fleetRangedMSPercent, fleetMinionPercent].every(value => value! > 0 && value! <= 100)
    && fleetDuration! > 0 && Math.abs(fleetRangedADPercent! - fleetADPercent! * fleetRangedRatio!) < 1e-12
    && Math.abs(fleetRangedAPPercent! - fleetAPPercent! * fleetRangedRatio!) < 1e-12,
  "Fleet Footwork requires positive matching charge, speed and melee/ranged healing rules");
  const fleetPerk = record(game["Perks/Styles/Precision/FleetFootwork"], "Fleet Footwork game perk");
  requireThat(fleetPerk.__type === "Perk" && fleetPerk.mPerkName === "FleetFootwork"
    && record(fleetPerk.mScript, "Fleet Footwork game script").mSpellScriptName === "ASSETS/Perks/Styles/Precision/FleetFootwork/FleetFootwork.lua",
  "Fleet Footwork game name, type or script path differs");
  const fleetData = clientData("Fleet Footwork"), fleetGame = client("Fleet Footwork");
  requireThat(fleetData.__type === "PerkScriptData" && fleetData.mEffectAmountGameMode === undefined,
    "Fleet Footwork requires reviewed normal-mode script data without unreviewed overrides");
  requireThat(catalog.runes.find(rune => rune.id === 8021)!.clientDescription === "Attacking and moving builds Energy stacks. At 100 stacks, your next attack is Energized<br><br>Energized attacks heal you for 15 - 160 (+0.1 Bonus AD, +0.05 AP) and grant <speed>20% Move Speed</speed> for 1s.<br><br>For Ranged Champions, Healing is 60% effective and Move Speed is 75% effective. All healing is 15% effective against Minions.",
    "Fleet Footwork retained client description changed");
  for (const [key, value] of Object.entries({ HealBase: fleetBase!, HealMax: fleetBase! + fleetGrowth!,
    HealBonusADRatio: fleetADPercent! / 100, HealAPRatio: fleetAPPercent! / 100,
    MSBuff: fleetMSPercent! / 100, MSDuration: fleetDuration!, RangedMSMod: fleetRangedMSPercent! / fleetMSPercent!,
    RangedHealMod: fleetRangedRatio!, MinionHealMod: fleetMinionPercent! / 100 })) agree("Fleet Footwork", fleetGame, key, value);
  const fleetCalculations = record(fleetData.mCalculations, "Fleet Footwork game calculations");
  for (const [name, hash] of Object.entries(FLEET_REVIEWED_CALCULATION_HASHES)) {
    const calculation = record(fleetCalculations[name], "Fleet Footwork " + name + " calculation");
    requireThat(sha256(JSON.stringify(calculation)) === hash, `Fleet Footwork reviewed ${name} calculation changed`);
  }
  // Retain the complete style/perk/spell/particle records. The HealMis travel
  // metadata and unnamed calculation are evidence, not HP-delivery or Lua proof.
  for (const [name, hash] of Object.entries(FLEET_REVIEWED_GAME_HASHES)) {
    const value = record(game[name], "Fleet Footwork complete client object " + name);
    requireThat(sha256(JSON.stringify(value)) === hash, "Fleet Footwork full reviewed client object changed: " + name);
  }
  // Evaluate the template at the model level. The client supplies the level-18
  // endpoint and stat progression flag, but no observed level-20 heal.
  const levelsGained = TOP_LANE_MAX_LEVEL - fleetStart!;
  const growthMultiplier = levelsGained * fleetGrowthBase! + levelsGained * levelsGained * fleetGrowthRate!;
  const fleetHealBase = fleetBase! + fleetGrowth! * growthMultiplier / fleetInterval!;
  requireThat(Number.isFinite(fleetHealBase) && fleetHealBase > 0, "Fleet Footwork requires finite positive model-level healing");
  const fleetContext: [string, RegExp][] = [
    ["Fleet Footwork", /^\* '''Fleet Footwork''' will not be consumed/],
    ["Fleet Footwork", /^\* Melee base healing increased to/],
    ["Fleet Footwork", /^\* Energized stacks per movement increased to/],
    ["Fleet Footwork", /^\* \{\{sbc\|New Effect:\}\} Energized effects now also work on structures/],
    ["Attack effects", /^The following effects trigger when a champion ''completes''/],
    ["Attack effects", /^''Hits'' do not occur/],
    ["Attack effects/Abilities", /^The following abilities apply both/],
    ["Blink", /^A '''blink''' is/],
    ["Dash", /^A '''dash''' is/],
    ["Movement speed", /^: \(Base MS \+ Flat MS bonuses\)/],
    ["Named item effect", /^\|Gain stacks from moving and attacking/],
    ["Template:Tip data/Energized", /^\|description\s*=/],
    ["Template:Tip data/Energized", /^\|description2\s*=/],
  ];
  for (const [title, pattern] of fleetContext) {
    const page = pages.get(title)!;
    const rows = page.content.split("\n").filter(line => pattern.test(line));
    requireThat(rows.length === 1, `${title} needs its complete reviewed Fleet Footwork context: ${pattern}`);
    quote(page, rows[0]!);
  }

  const press = description("Press the Attack");
  const [pressStackDuration, pressHits, pressMinimum, pressMaximum, pressFormulaMinimum, pressLevelInterval,
    pressFormulaStart, pressFormulaEnd, pressPercent, pressCombatDuration] = matchNumbers("Press the Attack", press.text,
    /^\|description\s*= \{\{sbc\|Passive:\}\} \{\{tip\|Basic attacks\}\} \{\{tip\|on-hit\}\} against enemy \{\{tip\|champion\|champions\}\} apply a \{\{tip\|stack\}\} for ([\d.]+) seconds, refreshing on subsequent applications, expiring upon attacking a new champion, and stacking up to ([\d.]+) times\. The third stack consumes all stacks to deal \{\{pp\|([\d.]+) \+ \(([\d.]+)-([\d.]+)\)\/([\d.]+)\*\(x-1\)\|([\d.]+) to ([\d.]+) by 1\}\} '''bonus''' \{\{tip\|adaptive damage\}\} and grant you ([\d.]+)% increased damage against champions until ([\d.]+) seconds after exiting \[\[combat status\|combat\]\] with them\.$/);
  requireThat(TOP_LANE_MAX_LEVEL === 20 && pressFormulaStart === 1 && pressFormulaEnd === TOP_LANE_MAX_LEVEL
    && pressMinimum! > 0 && pressMinimum === pressFormulaMinimum && pressMaximum! > pressMinimum! && pressLevelInterval! > 0
    && pressHits === 3
    && pressStackDuration! > 0 && pressPercent! > 0 && pressPercent! < 100 && pressCombatDuration! > 0,
  "Press the Attack needs the explicit positive level-20 formula, stack and amplification rules");
  const pressCooldownRows = press.page.content.split("\n").filter(line => /^\|cooldown\s*=/.test(line));
  requireThat(pressCooldownRows.length === 1, "Press the Attack needs its complete post-consumption cooldown");
  quote(press.page, pressCooldownRows[0]!);
  const [pressCooldown] = matchNumbers("Press the Attack cooldown", pressCooldownRows[0]!,
    /^\|cooldown\s*= \{\{tt\|([\d.]+)\|Starts after consuming a target's stacks\}\}$/);
  requireThat(pressCooldown! > 0, "Press the Attack needs a positive post-consumption cooldown");
  const pressPerk = record(game["Perks/Styles/Precision/PressTheAttack"], "Press the Attack game perk");
  requireThat(pressPerk.__type === "Perk" && pressPerk.mPerkName === "PressTheAttack"
    && record(pressPerk.mScript, "Press the Attack game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/PressTheAttack/PressTheAttack.lua",
  "Press the Attack game name, type or script path differs");
  const pressData = clientData("Press the Attack"), pressGame = client("Press the Attack");
  requireThat(pressData.__type === "PerkScriptData" && pressData.mCalculations === undefined
    && pressData.mEffectAmountGameMode === undefined,
  "Press the Attack retained client has no reviewed level calculation or mode overrides");
  const pressCatalog = catalog.runes.find(rune => rune.id === 8005)!;
  requireThat(pressCatalog.clientDescription === "Hitting an enemy champion with 3 consecutive basic attacks deals 40 - 160 bonus <lol-uikit-tooltipped-keyword key='LinkTooltip_Description_AdaptiveDmg'><font color='#48C4B7'>adaptive damage</font></lol-uikit-tooltipped-keyword> (based on level) and amplifies your damage dealt by 8% until you leave combat with champions.",
    "Press the Attack retained abbreviated client description changed");
  for (const [key, value] of Object.entries({
    MinDamage: pressMinimum!, MaxDamage: pressMaximum!, BonusADRatio: 0, APRatio: 0, LethalityRatio: 0,
    HitsRequired: pressHits!, TimeBetweenHits: pressStackDuration!, Cooldown: pressCooldown!,
    AmpPotencyMaxSelf: pressPercent! / 100, AmpPotencyMaxOthers: pressPercent! / 100,
    AmpPotencyStartSelf: pressPercent! / 100, AmpPotencyStartOthers: pressPercent! / 100,
    BonusPercentDamage: pressPercent! / 100, AmpDuration: pressCombatDuration!, OutOfCombatTimer: pressCombatDuration!,
  })) agree("Press the Attack", pressGame, key, value);
  // The template expressly includes levels1to20. Named client Min/MaxDamage
  // endpoints contain no executable level formula or hidden cap proof: 160 is
  // the formula's level18 value, never silently substituted for level20.
  const pressDamage = pressMinimum! + (pressMaximum! - pressMinimum!) / pressLevelInterval! * (TOP_LANE_MAX_LEVEL - 1);
  requireThat(Number.isFinite(pressDamage) && pressDamage > 0, "Press the Attack needs finite positive model-level damage");
  // Guard the complete current notes as well as relevant patch context. The
  // generic combat page retains unresolved old/modern-system comments; these
  // excerpts do not prove exact server phases, pet inheritance or two timers.
  const pressContext: [string, RegExp][] = [
    ["Press the Attack", /^\* '''Press the Attack's''' \{\{tip\|adaptive damage\}\} deals/],
    ["Press the Attack", /^\* '''Press the Attack's''' \{\{tip\|adaptive damage\}\} is not affected/],
    ["Press the Attack", /^\* The damage dealt by/],
    ["Press the Attack", /^\* Application is individually/],
    ["Press the Attack", /^\* Effects that allow/],
    ["Press the Attack", /^\* With the exception of/],
    ["Press the Attack", /^\*\* In addition/],
    ["Press the Attack", /^\* The basic attack that triggers/],
    ["Press the Attack", /^\*\* However, any/],
    ["Press the Attack", /^\*\* Damage dealt on the same frame/],
    ["Press the Attack", /^\*\* The triggering/],
    ["Press the Attack", /^\* Now affects/],
    ["Press the Attack", /^\* \{\{sbc\|Removed:\}\} Stack consumption/],
    ["Press the Attack", /^\* \{\{sbc\|New Effect:\}\} Stack consumption/],
    ["Adaptive force", /^== Adaptive damage ==$/],
    ["Attack effects", /^''Hits'' do not occur/],
    ["Basic attack", /^Innately, '''basic attacks''' apply/],
    ["Combat status", /^'''Combat status'''/],
    ["Combat status", /^<!--There's an "old" system/],
    ["Combat status", /^\{\{tip\|Clones\}\} enter combat independently/],
    ["Combat status", /^"Dealing damage" includes/],
    ["Combat status", /^\* \{\{cai\|Hemoplague/],
    ["Combat status", /^The following effects '''do not''' trigger/],
    ["Stack", /^A '''stack''' refers/],
    ["Stack", /^Stacking effects that time out/],
    ["Template:Tip data/Adaptive damage", /^\|description\s*=/],
  ];
  for (const [title, pattern] of pressContext) {
    const page = pages.get(title)!;
    const rows = page.content.split("\n").filter(line => pattern.test(line));
    requireThat(rows.length === 1, `${title} needs its complete reviewed Press the Attack context: ${pattern}`);
    quote(page, rows[0]!);
  }

  const alacrity = description("Legend: Alacrity");
  const [alacrityBase, alacrityPerStack, alacrityMaxStacks] = matchNumbers("Legend: Alacrity", alacrity.text,
    /\{\{#vardefineecho:basealacrity\|([\d.]+)\}\}[\s\S]*\{\{#vardefineecho:scalingalacrity\|([\d.]+)\}\}[\s\S]*\{\{#var:scalingalacrity\}\}\*(\d+)/);
  const legendDescriptions = alacrity.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(legendDescriptions.length === 1, "Legend: Alacrity needs its complete current point description");
  quote(alacrity.page, legendDescriptions[0]!);
  const [legendPointsPerStack, legendMaximum] = matchNumbers("Legend: Alacrity points", legendDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  requireThat(alacrityMaxStacks === legendMaximum, "Legend: Alacrity maximum stack descriptions disagree");
  const legendReward = (name: string, pattern: RegExp): number => {
    const rows = alacrity.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Alacrity needs its current ${name} point rule`);
    quote(alacrity.page, rows[0]!);
    return matchNumbers(`Legend: Alacrity ${name}`, rows[0]!, pattern)[0]!;
  };
  const championKillPoints = legendReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const epicPoints = legendReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const largeMonsterPoints = legendReward("large monster", /^\* (\d+) points for large monster kills$/);
  const minionPoints = legendReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([legendPointsPerStack, legendMaximum, championKillPoints, epicPoints, largeMonsterPoints, minionPoints]
    .every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(legendPointsPerStack! * legendMaximum!), "Legend: Alacrity needs positive safe integer point and stack rules");
  const alacrityGame = client("Legend: Alacrity");
  agree("Legend: Alacrity", alacrityGame, "AttackSpeedBase", alacrityBase! / 100);
  agree("Legend: Alacrity", alacrityGame, "AttackSpeedPerStack", alacrityPerStack! / 100);
  agree("Legend: Alacrity", alacrityGame, "MaxLegendStacks", alacrityMaxStacks!);
  agree("Legend: Alacrity", alacrityGame, "LargeMonsterKillValue", largeMonsterPoints);
  agree("Legend: Alacrity", alacrityGame, "MinionKillValue", minionPoints);
  // The client retains three opaque 100-valued keys. They are covered by the
  // complete client hash, not relabeled as decoded reward/threshold semantics.
  // The exact Wiki point rules above establish the champion/epic/stack values.

  const haste = description("Legend: Haste");
  const [hastePerStack, hasteMaximum] = matchNumbers("Legend: Haste", haste.text,
    /\{\{fd\|([\d.]+)\}\} basic ability haste[\s\S]*up to \{\{as\|([\d.]+)\|ability haste\}\} at maximum stacks/);
  const hastePointDescriptions = haste.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(hastePointDescriptions.length === 1, "Legend: Haste needs its complete current point description");
  quote(haste.page, hastePointDescriptions[0]!);
  const [hastePointsPerStack, hasteMaxStacks] = matchNumbers("Legend: Haste points", hastePointDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  const hasteReward = (name: string, pattern: RegExp): number => {
    const rows = haste.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Haste needs its current ${name} point rule`);
    quote(haste.page, rows[0]!);
    return matchNumbers(`Legend: Haste ${name}`, rows[0]!, pattern)[0]!;
  };
  const hasteChampionPoints = hasteReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const hasteEpicPoints = hasteReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const hasteLargeMonsterPoints = hasteReward("large monster", /^\* (\d+) points for large monster kills$/);
  const hasteMinionPoints = hasteReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([hastePointsPerStack, hasteMaxStacks, hasteChampionPoints, hasteEpicPoints, hasteLargeMonsterPoints, hasteMinionPoints]
    .every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(hastePointsPerStack! * hasteMaxStacks!), "Legend: Haste needs positive safe integer point and stack rules");
  requireThat(hastePerStack! > 0 && hastePerStack! * hasteMaxStacks! === hasteMaximum, "Legend: Haste maximum haste and stack descriptions disagree");
  const hasteGame = client("Legend: Haste");
  agree("Legend: Haste", hasteGame, "HasteBase", 0);
  agree("Legend: Haste", hasteGame, "HastePerStack", hastePerStack!);
  agree("Legend: Haste", hasteGame, "MaxLegendStacks", hasteMaxStacks!);
  agree("Legend: Haste", hasteGame, "LargeMonsterKillValue", hasteLargeMonsterPoints);
  agree("Legend: Haste", hasteGame, "MinionKillValue", hasteMinionPoints);
  // Haste's three opaque 100-valued fields remain hash-sealed, just as Alacrity's do.
  // Its complete Wiki template establishes the threshold and champion/epic awards.

  const bloodline = description("Legend: Bloodline");
  const [bloodlinePerStackPercent, bloodlineDescriptionStacks, bloodlineBonusHealth] = matchNumbers("Legend: Bloodline", bloodline.text,
    /\{\{#vardefineecho:scalingbloodline\|([\d.]+)\}\}% life steal[\s\S]*\{\{#var:scalingbloodline\}\}\*(\d+)\}\}[\s\S]*at maximum stacks, at which you also gain \{\{as\|\{\{#vardefineecho:hpbloodline\|([\d.]+)\}\} '''bonus''' health\}\}/);
  const bloodlinePointDescriptions = bloodline.page.content.split("\n").filter((line) => /^\|description2\s*=/.test(line));
  requireThat(bloodlinePointDescriptions.length === 1, "Legend: Bloodline needs its complete current point description");
  quote(bloodline.page, bloodlinePointDescriptions[0]!);
  const [bloodlinePointsPerStack, bloodlineMaxStacks] = matchNumbers("Legend: Bloodline points", bloodlinePointDescriptions[0]!,
    /Gain ''Legend'' stacks for every (\d+) points earned, up to (\d+):/);
  requireThat(bloodlineDescriptionStacks === bloodlineMaxStacks, "Legend: Bloodline maximum stack descriptions disagree");
  const bloodlineReward = (name: string, pattern: RegExp): number => {
    const rows = bloodline.page.content.split("\n").filter((line) => pattern.test(line));
    requireThat(rows.length === 1, `Legend: Bloodline needs its current ${name} point rule`);
    quote(bloodline.page, rows[0]!);
    return matchNumbers(`Legend: Bloodline ${name}`, rows[0]!, pattern)[0]!;
  };
  const bloodlineChampionPoints = bloodlineReward("champion", /^\* (\d+) points for champion \{\{tip\|takedown\|takedowns\}\}$/);
  const bloodlineEpicPoints = bloodlineReward("epic monster", /^\* (\d+) points for epic monster \{\{tip\|takedown\|takedowns\}\}$/);
  const bloodlineLargeMonsterPoints = bloodlineReward("large monster", /^\* (\d+) points for large monster kills$/);
  const bloodlineMinionPoints = bloodlineReward("minion", /^\* (\d+) points for minion kills$/);
  requireThat([bloodlinePointsPerStack, bloodlineMaxStacks, bloodlineChampionPoints, bloodlineEpicPoints,
    bloodlineLargeMonsterPoints, bloodlineMinionPoints].every((value) => Number.isSafeInteger(value) && value! > 0)
    && Number.isSafeInteger(bloodlinePointsPerStack! * bloodlineMaxStacks!), "Legend: Bloodline needs positive safe integer point and stack rules");
  requireThat(bloodlinePerStackPercent! > 0 && bloodlineBonusHealth! > 0
    && Number.isFinite(bloodlinePerStackPercent! * bloodlineMaxStacks!), "Legend: Bloodline needs finite positive life steal and cap health");
  const bloodlinePerk = record(game["Perks/Styles/Precision/LegendBloodline"], "Legend: Bloodline game perk");
  requireThat(bloodlinePerk.mPerkName === "LegendBloodline"
    && record(bloodlinePerk.mScript, "Legend: Bloodline game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/LegendBloodline/LegendBloodline.lua", "Legend: Bloodline game name or script path differs");
  const bloodlineGame = client("Legend: Bloodline");
  agree("Legend: Bloodline", bloodlineGame, "LifeStealBase", 0);
  // Unlike Alacrity's fraction-valued client fields, these values are percentages.
  agree("Legend: Bloodline", bloodlineGame, "LifeStealPerStack", bloodlinePerStackPercent!);
  agree("Legend: Bloodline", bloodlineGame, "MaxLegendStacks", bloodlineMaxStacks!);
  agree("Legend: Bloodline", bloodlineGame, "BonusHealth", bloodlineBonusHealth!);
  agree("Legend: Bloodline", bloodlineGame, "LargeMonsterKillValue", bloodlineLargeMonsterPoints);
  agree("Legend: Bloodline", bloodlineGame, "MinionKillValue", bloodlineMinionPoints);
  // The three opaque 100-valued client fields remain unnamed. The complete Wiki
  // point description establishes champion/epic rewards and the stack threshold.

  const absorb = description("Absorb Life");
  const [healBase, firstRate, firstLevels, secondRate, secondLevels, finalRate, formulaMaximum] = matchNumbers("Absorb Life", absorb.text,
    /Killing an enemy \{\{tip\|heals\}\} you for \{\{pp\|([\d.]+); then \+([\d.]+)\*x for (\d+);then \+([\d.]+)\*x for (\d+); then \+([\d.]+)\*x\|1 to (\d+) by 1\|/);
  requireThat(TOP_LANE_MAX_LEVEL === 20 && formulaMaximum === TOP_LANE_MAX_LEVEL
    && firstLevels! > 0 && secondLevels! > 0 && firstLevels! + secondLevels! < formulaMaximum! - 1,
  "Absorb Life needs its explicit level-20 formula and reviewed breakpoints");
  const healAt = (level: number) => healBase!
    + Math.min(level - 1, firstLevels!) * firstRate!
    + Math.min(Math.max(0, level - 1 - firstLevels!), secondLevels!) * secondRate!
    + Math.max(0, level - 1 - firstLevels! - secondLevels!) * finalRate!;
  const absorbData = clientData("Absorb Life");
  const calculation = record(record(absorbData.mCalculations, "Absorb Life game calculations").HealAmount, "Absorb Life HealAmount calculation");
  requireThat(calculation.__type === "GameCalculation" && Array.isArray(calculation.mFormulaParts)
    && calculation.mFormulaParts.length === 1, "Absorb Life needs exactly one reviewed HealAmount calculation part");
  const part = record(calculation.mFormulaParts[0], "Absorb Life HealAmount formula part");
  requireThat(part.__type === "ByCharLevelBreakpointsCalculationPart" && Array.isArray(part.mBreakpoints)
    && part.mBreakpoints.length === 2, "Absorb Life needs the reviewed character-level breakpoint calculation");
  agree("Absorb Life", part, "mLevel1Value", healBase!);
  agree("Absorb Life", part, "mInitialBonusPerLevel", firstRate!);
  const firstBreakpoint = record(part.mBreakpoints[0], "Absorb Life first breakpoint");
  const secondBreakpoint = record(part.mBreakpoints[1], "Absorb Life second breakpoint");
  requireThat(firstBreakpoint.__type === "Breakpoint" && secondBreakpoint.__type === "Breakpoint",
    "Absorb Life needs reviewed level breakpoint types");
  agree("Absorb Life first breakpoint", firstBreakpoint, "mLevel", firstLevels! + 2);
  agree("Absorb Life first breakpoint", firstBreakpoint, "mBonusPerLevelAtAndAfter", secondRate!);
  agree("Absorb Life second breakpoint", secondBreakpoint, "mLevel", firstLevels! + secondLevels! + 2);
  agree("Absorb Life second breakpoint", secondBreakpoint, "mBonusPerLevelAtAndAfter", finalRate!);
  // TooltipMaxHeal is a level-18 display endpoint, not a level-20 formula cap.
  // The explicit Wiki level domain and complete client breakpoint calculation
  // supply the actual rule used by this level-20 simulator.
  const absorbHeal = healAt(TOP_LANE_MAX_LEVEL);
  requireThat(Number.isFinite(absorbHeal) && absorbHeal > 0, "Absorb Life needs finite positive level-20 healing");

  const triumph = description("Triumph");
  const [triumphMaximumPercent, triumphMissingPercent, triumphBonusGold, triumphDelay] = matchNumbers("Triumph", triumph.text,
    /^\|description\s*= \{\{sbc\|Passive:\}\} Scoring a \{\{tip\|takedown\}\} against an enemy champion \{\{tip\|heals\}\} you for \{\{as\|\{\{fd\|([\d.]+)\}\}% of your '''maximum''' health\}\} \{\{as\|\(\+ ([\d.]+)% of your '''missing''' health\)\}\} and grants you an additional \{\{g\|([\d.]+)\}\}, both after a ([\d.]+)-second delay\.$/);
  requireThat(triumphMaximumPercent! > 0 && triumphMaximumPercent! < 100
    && triumphMissingPercent! > 0 && triumphMissingPercent! < 100 && triumphDelay! > 0
    && Number.isSafeInteger(triumphBonusGold) && triumphBonusGold! > 0,
  "Triumph needs finite positive healing ratios, delay and integer economic gold");
  const triumphPerk = record(game["Perks/Styles/Precision/Triumph"], "Triumph game perk");
  requireThat(triumphPerk.__type === "Perk" && triumphPerk.mPerkName === "Triumph"
    && record(triumphPerk.mScript, "Triumph game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/Triumph.lua", "Triumph game name, type or script path differs");
  // Only the normal mode effect amounts establish this Summoner's Rift rule.
  // ARAM/KINGPORO overrides and the short tooltip are not formula inputs.
  const triumphGame = client("Triumph");
  agree("Triumph", triumphGame, "TriumphMaxHealthRestored", triumphMaximumPercent! / 100);
  agree("Triumph", triumphGame, "MissingHealthRestored", triumphMissingPercent! / 100);
  agree("Triumph", triumphGame, "BonusGold", triumphBonusGold!);
  const triumphMissilePath = "Perks/Styles/Precision/Triumph/Spells/PerkSoulFeastVisualMissile";
  const triumphMissile = record(game[triumphMissilePath], "Triumph visual missile");
  requireThat(triumphMissile.__type === "SpellObject" && triumphMissile.objectPath === triumphMissilePath
    && triumphMissile.ObjectName === "PerkSoulFeastVisualMissile" && triumphMissile.mScriptName === "PerkSoulFeastVisualMissile",
  "Triumph visual missile identity differs");
  const triumphMissileSpell = record(triumphMissile.mSpell, "Triumph visual missile spell");
  const triumphMissileSpec = record(triumphMissileSpell.mMissileSpec, "Triumph visual missile specification");
  const triumphMovement = record(triumphMissileSpec.movementComponent, "Triumph visual missile movement");
  requireThat(triumphMissileSpell.__type === "SpellDataResource" && triumphMissileSpec.__type === "MissileSpecification"
    && triumphMovement.__type === "FixedTimeMovement", "Triumph needs the reviewed fixed-time visual missile");
  // Visual timing corroborates the complete template's delay; the client does
  // not contain executable server Lua or prove the simulation's event phase.
  agree("Triumph delay", triumphMovement, "mTravelTime", triumphDelay!);

  const presence = description("Presence of Mind");
  const [presenceManaPercent, presenceEnergyPercent, presenceDelay] = matchNumbers("Presence of Mind takedown", presence.text,
    /^\|description\s*= \{\{sbc\|Passive:\}\} Scoring a \{\{tip\|takedown\}\} against an enemy champion restores \{\{as\|([\d.]+)% of your '''maximum''' mana\}\} or \{\{as\|([\d.]+)% of your '''maximum''' energy\}\} after a ([\d.]+)-second delay\.$/);
  requireThat(presenceManaPercent! > 0 && presenceManaPercent! < 100
    && presenceManaPercent === presenceEnergyPercent && presenceDelay! > 0,
  "Presence of Mind needs matching positive maximum-Mana/Energy ratios and a delay");
  const presenceDamageRows = presence.page.content.split("\n").filter(line => /^\|description2\s*=/.test(line));
  requireThat(presenceDamageRows.length === 1, "Presence of Mind needs its complete damage-restoration description");
  const presenceDamageText = presenceDamageRows[0]!; quote(presence.page, presenceDamageText);
  const presenceDamage = /^\|description2\s*= Damaging an enemy champion restores \{\{as\|\{\{rd\|([^|]+)\|([^|]+)\|pp=true\}\} mana\}\} or \{\{as\|([\d.]+) energy\}\} \(([\d.]+) second cooldown\)\.$/.exec(presenceDamageText);
  requireThat(presenceDamage, "Presence of Mind damage-restoration formula changed");
  // Parse only the reviewed finite piecewise-addition grammar, never arbitrary
  // Wiki expressions. All31 client entries stay retained; runtime remains level20.
  const presenceCurve = (source: string, label: string): number[] => {
    const product = (term: string): number => {
      const factors = term.split("*");
      requireThat(factors.length >= 1 && factors.length <= 2
        && factors.every(value => /^\d+(?:\.\d+)?$/.test(value) && Number(value) > 0),
      label + " needs the reviewed positive numeric factors");
      const value = factors.map(Number).reduce((left, right) => left * right, 1);
      requireThat(Number.isFinite(value), label + " contains an invalid product");
      return Number(value.toPrecision(12));
    };
    const pieces = source.split(";").map(value => value.trim());
    requireThat(pieces.length === 7, label + " needs the reviewed seven piecewise terms");
    const values = [product(pieces[0]!)];
    for (const piece of pieces.slice(1)) {
      const match = /^then \+([\d.*]+?)(?:\*x for (\d+))?$/.exec(piece);
      requireThat(match, label + " needs the reviewed incremental formula");
      const increment = product(match[1]!), count = match[2] === undefined ? 1 : Number(match[2]);
      requireThat(Number.isSafeInteger(count) && count > 0 && count <= 20, label + " has an invalid level interval");
      for (let step = 0; step < count; step++) values.push(Number((values.at(-1)! + increment).toPrecision(12)));
    }
    requireThat(values.length === 20 && values.every(value => Number.isFinite(value) && value > 0),
      label + " needs all twenty supported model levels");
    return values;
  };
  const presenceManaLevels = presenceCurve(presenceDamage[1]!, "Presence of Mind Mana curve");
  const presenceRangedLevels = presenceCurve(presenceDamage[2]!, "Presence of Mind ranged Mana curve");
  const rangedFactor = /^\d+(?:\.\d+)?\*([\d.]+)$/.exec(presenceDamage[2]!.split(";")[0]!);
  requireThat(rangedFactor, "Presence of Mind needs a separate Mana-only ranged multiplier");
  const presenceRangedRatio = Number(rangedFactor[1]);
  requireThat(Number.isFinite(presenceRangedRatio) && presenceRangedRatio > 0 && presenceRangedRatio <= 1
    && presenceRangedLevels.every((value, index) => Math.abs(value - presenceManaLevels[index]! * presenceRangedRatio) < 1e-10),
  "Presence of Mind ranged and melee Mana curves disagree");
  const presenceEnergyRestore = Number(presenceDamage[3]), presenceCooldown = Number(presenceDamage[4]);
  requireThat(Number.isFinite(presenceEnergyRestore) && presenceEnergyRestore > 0
    && Number.isFinite(presenceCooldown) && presenceCooldown > 0,
  "Presence of Mind needs positive flat Energy and damage cooldown rules");
  requireThat(TOP_LANE_MAX_LEVEL === 20, "Presence of Mind model-level domain needs review");
  const presenceManaRestore = presenceManaLevels[TOP_LANE_MAX_LEVEL - 1]!;
  const presencePerk = record(game["Perks/Styles/Precision/PresenceOfMind"], "Presence of Mind game perk");
  requireThat(presencePerk.__type === "Perk" && presencePerk.mPerkName === "PresenceOfMind"
    && record(presencePerk.mScript, "Presence of Mind game script").mSpellScriptName
      === "ASSETS/Perks/Styles/Precision/PresenceOfMind/PresenceOfMind.lua",
  "Presence of Mind game name, type or script path differs");
  const presenceData = clientData("Presence of Mind"), presenceGame = client("Presence of Mind");
  requireThat(presenceData.__type === "PerkScriptData", "Presence of Mind needs reviewed script-data type");
  agree("Presence of Mind normal-mode", presenceGame, "PercentManaRestore", presenceManaPercent! / 100);
  agree("Presence of Mind", presenceGame, "CooldownDuration", presenceCooldown);
  agree("Presence of Mind", presenceGame, "EnergyRestore", presenceEnergyRestore);
  requireThat(presenceGame.MinFlatRestore === 6 && presenceGame.MaxFlatRestore === 50,
    "Presence of Mind retained abbreviated 6-50 tooltip fields changed");
  const presenceModes = record(presenceData.mEffectAmountGameMode, "Presence of Mind game-mode overrides");
  for (const modeName of ["ARAM", "KINGPORO"]) {
    const mode = record(presenceModes[modeName], "Presence of Mind " + modeName + " override");
    requireThat(mode.__type === "PerkEffectAmountPerMode", "Presence of Mind needs reviewed mode-override type");
    agree("Presence of Mind " + modeName + " reference", record(mode.mEffectAmountPerMode, "Presence of Mind alternate-mode amounts"),
      "PercentManaRestore", 0.1);
  }
  const presenceCalculation = record(record(presenceData.mCalculations, "Presence of Mind calculations").RegenAmount,
    "Presence of Mind detailed level calculation");
  requireThat(presenceCalculation.__type === "GameCalculation" && presenceCalculation.mPrecision === 1
    && Array.isArray(presenceCalculation.mFormulaParts) && presenceCalculation.mFormulaParts.length === 1,
  "Presence of Mind needs its single reviewed level table");
  const presencePart = record(presenceCalculation.mFormulaParts[0], "Presence of Mind level-table part");
  requireThat(presencePart.__type === "ByCharLevelFormulaCalculationPart"
    && Array.isArray(presencePart.values) && presencePart.values.length === 31,
  "Presence of Mind needs all31 values in the reviewed level-zero-indexed table");
  // The client-only plateau after model level20 is retained and checked, not
  // extended as a Wiki formula or exposed as support for higher game stages.
  const presenceExpectedTable = [presenceManaLevels[0]!, ...presenceManaLevels, ...Array<number>(10).fill(60)];
  for (let level = 0; level < presenceExpectedTable.length; level++) {
    requireThat(typeof presencePart.values[level] === "number" && Number.isFinite(presencePart.values[level])
      && presencePart.values[level] === Math.fround(presenceExpectedTable[level]!),
    "Presence of Mind level table disagrees at index " + level);
  }
  const presenceCatalog = catalog.runes.find(rune => rune.id === 8009)!;
  requireThat(presenceCatalog.clientDescription === "Damaging an enemy champion restores 6-50 (80% for ranged) mana or 6 energy.<br><br>Takedowns restore 15% of your maximum mana or energy. <br><br>Cooldown for damage restoration: 8s",
    "Presence of Mind reviewed abbreviated client description changed");
  const presenceClientRange = /\(([\d.]+)% for ranged\)/.exec(presenceCatalog.clientDescription);
  requireThat(presenceClientRange && presenceRangedRatio === Number(presenceClientRange[1]) / 100,
    "Presence of Mind ranged Wiki/client multiplier disagree");
  // Min/MaxFlatRestore and the6-50 tooltip do not agree with the detailed table
  // (44 at18,52 at19,56 at20). They are retained evidence, never interpolation
  // endpoints or runtime caps. The legacy name RegenAmount is not regeneration.
  const presenceMissilePath = "Perks/Styles/Precision/PresenceOfMind/spells/PerkPresenceOfMindVisualMissile";
  const presenceMissile = record(game[presenceMissilePath], "Presence of Mind visual missile");
  requireThat(presenceMissile.__type === "SpellObject" && presenceMissile.objectPath === presenceMissilePath
    && presenceMissile.ObjectName === "PerkPresenceOfMindVisualMissile"
    && presenceMissile.mScriptName === "PerkPresenceOfMindVisualMissile", "Presence of Mind visual missile identity differs");
  const presenceMissileSpell = record(presenceMissile.mSpell, "Presence of Mind visual missile spell");
  const presenceMissileSpec = record(presenceMissileSpell.mMissileSpec, "Presence of Mind visual missile specification");
  const presenceMovement = record(presenceMissileSpec.movementComponent, "Presence of Mind visual missile movement");
  requireThat(presenceMissileSpell.__type === "SpellDataResource" && presenceMissileSpec.__type === "MissileSpecification"
    && presenceMovement.__type === "FixedTimeMovement", "Presence of Mind needs the reviewed fixed-time visual missile");
  agree("Presence of Mind delay", presenceMovement, "mTravelTime", presenceDelay!);
  requireThat(Array.isArray(presenceMissileSpec.behaviors)
    && presenceMissileSpec.behaviors.length === 2
    && record(presenceMissileSpec.behaviors[0], "Presence of Mind arrival behavior").__type === "CastOnMovementComplete"
    && record(presenceMissileSpec.behaviors[1], "Presence of Mind destruction behavior").__type === "DestroyOnMovementComplete",
  "Presence of Mind visual arrival behaviors changed");
  // Complete-source context guards document boundaries; none establishes the
  // chosen resource sampling, recipient lifecycle or packet eligibility policy.
  const presenceContext: [string, RegExp][] = [
    ["Ability resource", /^'''Ability resources'''/],
    ["Cast time", /^A majority of/],
    ["Death", /^Death does not mean that every ongoing effect/],
    ["Energy", /^<onlyinclude>/],
    ["Mana", /^Champions that are mana users/],
    ["Mana regeneration", /^''Mana Restoration''/],
    ["Presence of Mind", /^\* '''Presence of Mind''' will be consumed/],
    ["Range type", /^'''Range type'''/],
    ["Rune", /^\* For champions without/],
    ["Template:Data Akali/Twilight Shroud", /^\|description\s*=/],
    ["Template:Data Ryze/Arcane Mastery", /^\|description\s*=/],
    ["Template:Range difference", /^true -->/],
    ["Template:Tip data/Resurrection", /^\|description\s*=/],
    ["Template:Tip data/Zombie state", /^\|description\s*=/],
    ["Template:Zombie state info", /^\* A champion that enters a zombie state/],
  ];
  for (const [title, pattern] of presenceContext) {
    const page = pages.get(title)!;
    const line = page.content.split("\n").find(value => pattern.test(value));
    requireThat(line, title + " reviewed Presence context is required"); quote(page, line);
  }
  quote(presence.page, "|cooldown     = <!--formula=6 base, then +0.8 per level until level 6, then +2 per level until level 11, then +3.2 per level until level 16, then +4 per level until level 18, then +8 per level until level 19, then +4 per level.-->");
  quote(pages.get("Presence of Mind")!, "* {{sbc|Undocumented:}} No longer increases the resource beyond the maximum amount if the champion takedowns were made while dead.");

  const coup = description("Coup de Grace"), cut = description("Cut Down"), last = description("Last Stand"), wind = description("Second Wind");
  const [coupPercent, coupHealth] = matchNumbers("Coup de Grace", coup.text, /Deal ([\d.]+)% increased damage to champions below \{\{as\|([\d.]+)%/);
  const [cutPercent, cutHealth] = matchNumbers("Cut Down", cut.text, /Deal ([\d.]+)% increased damage to champions above \{\{as\|([\d.]+)%/);
  const [lastMin, lastHealth, lastMax, lastMaxHealth] = matchNumbers("Last Stand", last.text,
    /Deal ([\d.]+)% increased damage to champions while below \{\{as\|([\d.]+)%[\s\S]*up to ([\d.]+)% increased damage while below \{\{as\|([\d.]+)%/);
  const [windPercent, windSeconds] = matchNumbers("Second Wind", wind.text, /regenerate\}\} \{\{as\|([\d.]+)% of your '''missing''' health\}\} over ([\d.]+) seconds/);
  const coupGame = client("Coup de Grace"), cutGame = client("Cut Down"), lastGame = client("Last Stand"), windGame = client("Second Wind");
  agree("Coup de Grace", coupGame, "BonusPercentDamage", coupPercent! / 100);
  agree("Coup de Grace", coupGame, "EnemyHealthPercentageThreshold", coupHealth! / 100);
  // Cut Down's old max-health-difference fields remain in the client record. They are not its current rule.
  agree("Cut Down", cutGame, "BonusPercentDamage", cutPercent! / 100);
  agree("Cut Down", cutGame, "EnemyHealthPercentageThreshold", cutHealth! / 100);
  agree("Last Stand", lastGame, "MinBonusDamagePercent", lastMin! / 100);
  agree("Last Stand", lastGame, "MaxBonusDamagePercent", lastMax! / 100);
  agree("Last Stand", lastGame, "HealthThresholdStart", lastHealth! / 100);
  agree("Last Stand", lastGame, "HealthThresholdEnd", lastMaxHealth! / 100);
  agree("Second Wind", windGame, "RegenSeconds", windSeconds!);
  agree("Second Wind", windGame, "RegenPercentMax", windPercent! / 100);
  agree("Second Wind", windGame, "RegenFlat", 0);

  quote(pages.get("Legend: Alacrity")!, "* {{sbc|Bug Fix:}} Killing the first {{ui|Voidgrub}} in a spawn group as well as any {{ui|Rift Herald}} no longer grants Legend stacks as if the user has slain both an epic and a large monster, for a total of 100+25 stacks instead of the correct 100.");
  const takedown = pages.get("Takedown")!;
  quote(takedown, "A '''{{tip|takedown}}''' is the term used for situations where either a [[kill]] or an [[assist]] is acceptable, such as to trigger a passive effect. Some effects have a limit time in which kills or assists will qualify.");
  quote(takedown, "* {{ri|Legend: Alacrity}}");
  const summons = pages.get("Champion summoned units")!;
  quote(summons, "{{Outdated|Last updated: [[V14.22]] - Making sure everything is current}}");
  quote(summons, "A '''clone''' is a copy of a champion that is considered a champion for the purposes of targeting and interacting with most non-{{tip|takedown}} effects, but otherwise considered a {{tip|pet}}.");
  quote(summons, "[[Takedown]]s scored by '''clones''', including those against non-champions, are attributed to their owner.");
  quote(summons, "Clones do not generally interact with [[rune]]s, but may inherit some buffs granted by runes on a case-by-case basis.");
  quote(pages.get("Absorb Life")!, "* {{sbc|Bug Fix:}} Shared minions killed through {{iis|World Atlas}} and {{iis|Runic Compass}} execute effects now properly count as a unit kill for the ally.");
  const kill = pages.get("Kill")!;
  const killDefinition = kill.content.split("\n").find((line) => line.startsWith("A '''kill''' is the event of inflicting the final blow on an enemy unit"));
  requireThat(killDefinition, "Kill's hostile-unit definition is required"); quote(kill, killDefinition);
  quote(kill, "If the champion is protected by certain effects (e.g. {{tip|resurrection}}), reducing their health to zero does <u>not</u> count as a kill.");
  quote(kill, "* [[Ward]] kills grant no experience and only dispense gold to the killer.");
  quote(kill, "=== Runes ===\n* {{ri|Absorb Life}}");
  quote(pages.get("Unit")!, "* {{tip|Champion}}\n* {{tip|Minion}}\n* {{tip|Monster}}\n* {{tip|Ward}}\n* [[Champion summoned units|Summon]] ([[Terrain#Player-Generated|champion-generated terrain]] and {{tip|pets}})");
  quote(pages.get("Healing")!, "'''Healing''' cannot increase a unit's current health over its maximum.");
  quote(pages.get("Healing")!, "* {{ri|Absorb Life}}");
  quote(takedown, "* {{ri|Triumph}}");
  const assist = pages.get("Assist")!;
  quote(assist, "An '''assist''' takes place when an ally has helped a teammate score a [[kill]] on an enemy [[champion]] recently before that enemy's [[death]].");
  quote(assist, "* Granting a {{tip|heal}}, {{tip|shield}}, or otherwise form of [[buff]] to the killer or another assistor.");
  const triumphArticle = pages.get("Triumph")!;
  quote(triumphArticle, "* The healing is calculated based on your missing health at the moment the takedown happened.");
  quote(triumphArticle, "** If during the delay another takedown is achieved, all pending '''Triumph''' heals have their calculated value updated to the new amount, which is of course based on your missing health at the moment the latest takedown happened.{{bug|2}}");
  quote(triumphArticle, "* A missile with a fixed travel time of 1 seconds handles the delay and functionally triggers the benefits.");
  quote(triumphArticle, "** The missile is set as ''unblockable'', which means that it isn't destroyed by colliding with effects such as {{cai|Wind Wall|Yasuo}}.");
  quote(triumphArticle, "** The missile can be {{tip|Homing_projectile_destruction|popped}} by effects that (unintentionally) destroy missiles from their own team aimed at them such as {{cai|Trickster|Fizz}}<!--Fizz E2 specifically--> or {{cai|Frozen Tomb|Lissandra}}<!--both of these's missile pops are bugged in this way at the time of this note's creation in late 2023-->. This will prevent both the bonus gold and healing from being received.{{bug}}");
  quote(triumphArticle, "* Heal health ratio reduced to {{as|5% '''missing''' health}} from {{as|10%|health}}.");
  quote(triumphArticle, "* {{sbc|New Effect:}} Now has a base heal of {{as|{{fd|2.5}}% '''maximum''' health}}.");
  quote(triumphArticle, "* Bonus gold on takedown reduced to {{g|20}} from {{g|25}}.");
  quote(triumphArticle, "* {{sbc|Bug Fix:}} Gold and healing are now properly granted to units in stasis when a takedown is earned.");
  quote(pages.get("Healing")!, "* {{ri|Triumph}}");
  quote(pages.get("Healing")!, "* {{tip|Grievous Wounds}} is a debuff that reduces all healing received by 40%.");
  quote(pages.get("Healing")!, "* {{cai|Lamb's Respite|Kindred}} negates all healing effects on a unit once they've reached a certain health threshold.");
  quote(pages.get("Heal and shield power")!, "'''{{sti|Heal and shield power|Heal and shield power}}''' is a [[champion statistic]] that increases the effectiveness of self and outgoing [[Healing|heal]]s and [[shield]]s. It {{tip|stacks additively}}.");
  quote(pages.get("Heal and shield power")!, "* Heal Power stacks additively with itself, but multiplicatively with other heal modifiers.");
  quote(pages.get("Template:Healing modifiers")!, "| {{tt|Self heals|Healing source is the user}} || {{a|Yes}} || {{a|Yes}} || {{a|Yes}} || {{a|Yes}} || {{a|No}}");
  quote(pages.get("Template:Healing modifiers")!, "| {{stil|Bonus health}} || {{a|No}} || {{a|No}} || {{a|No}} || {{a|No}} || {{a|No}}");

  quote(pages.get("Coup de Grace")!, "* '''Coup de Grace''' only triggers on damage dealt after the champion is brought {{as|below 40% health}}.");
  const trueAmplification = "* Now affects {{sti|true damage}} dealt, excluding {{si|Smite}}.";
  for (const name of ["Coup de Grace", "Cut Down", "Last Stand"]) quote(pages.get(name)!, trueAmplification);
  quote(pages.get("Cut Down")!, "* {{sbc|Bug Fix:}} No longer applies its damage amplification twice.");
  quote(pages.get("Last Stand")!, "* '''Last Stand''' increases your damage output by {{pp|type='''missing''' health|key=%|key1=%|0;0;0;0;5 to 11;11;11;11|0 to 90 for 10; 99|color=health}}.");
  const trueDamage = pages.get("True damage")!;
  const trueLine = trueDamage.content.split("\n").find((line) => line.startsWith("As of patch [[V25.S1.3]]"));
  requireThat(trueLine, "True damage amplification paragraph is required"); quote(trueDamage, trueLine);
  quote(trueDamage, "True damage dealt by Jungle items ({{ii|Gustwalker Hatchling|icononly=true}}{{ii|Mosstomper Seedling|icononly=true}}{{ii|Scorchclaw Pup|icononly=true}}), {{si|Smite}} (including its upgrades), and {{si|Ignite}} cannot be amplified under any circumstance.");
  const secondWind = pages.get("Second Wind")!, regen = pages.get("Health regeneration")!;
  const hp5Line = secondWind.content.split("\n").find((line) => line.startsWith("* '''Second Wind''' grants"));
  requireThat(hp5Line, "Second Wind's HP5 rule is required"); quote(secondWind, hp5Line);
  const [hpPeriod, hpPercent, hpDuration] = matchNumbers("Second Wind HP5", hp5Line, /\{\{ap\|([\d.]+)\*([\d.]+)\/([\d.]+)\}\}%/);
  requireThat(hpPeriod === 5 && hpPercent === windPercent && hpDuration === windSeconds, "Second Wind HP5 and duration disagree");
  for (const text of ["** Reduced to or equal to [[Damage#0_Damage_Instances|0 damage]].", "** Dealt to {{tip|shield|shields}}.", "** Absorbed by {{tip|invulnerable|invulnerability}}."]) quote(secondWind, text);
  const [tickInterval] = matchNumbers("Health regeneration", regen.content, /Health regeneration occurs in \{\{fd\|([\d.]+)\}\}-second intervals/);
  requireThat(tickInterval === 0.5, "health regeneration interval needs review");
  quote(regen, "Health regeneration occurs in {{fd|0.5}}-second intervals");
  quote(regen, "Note that {{ri|Revitalize}} and {{sti|Heal and Shield Power}} do not affect health regeneration");
  quote(pages.get("Damage")!, "* '''Pet:''' Represents all damage originating from [[champion summoned units]], also to defer attribution to their summoner.");
  const modifiers = pages.get("Damage modifier")!;
  quote(modifiers, "* {{sbc|Undocumented:}} Modifiers to damage dealt now stack additively instead of multiplicatively.");
  quote(modifiers, "** {{note}} Modifiers to damage received still stack multiplicatively.");
  quote(modifiers, "* {{sbc|Undocumented:}} Damage amplifiers are now dealt as a separate damage instance, interacting with pre-modifier effects (e.g {{cai|E|Illaoi}}, {{cai|R|Zed}}).");
  // Complete general and champion-specific sources retain the distinction between
  // basic/ultimate effect classes, static/target clocks and flat/total refunds.
  quote(pages.get("Legend: Haste")!, "* {{sbc|Bug Fix:}} Basic ability haste is now properly granted.");
  quote(pages.get("Legend: Haste")!, "* {{sbc|Bug Fix:}} Killing the first {{ui|Voidgrub}} in a spawn group as well as any {{ui|Rift Herald}} no longer grants Legend stacks as if the user has slain both an epic and a large monster, for a total of 100+25 stacks instead of the correct 100.");
  quote(pages.get("Haste")!, "{{Tocright}}'''Haste''' is a category of [[champion statistic|stats]] that reduce the '''total''' cooldown of non-[[basic attack]] [[Terminology#Spell|spells]], and thus improves their '''casting rate'''. It is the analog to [[attack speed]] for basic attacks. '''Haste''' does not affect static cooldowns nor target immunity cooldowns, unless otherwise stated. Haste is categorized based on the spell it affects; [[#Ability haste|champion ability haste]] ([[#Basic ability haste|basic]], [[#Ultimate haste|ultimate]]), [[#Item haste|item haste]], [[#Summoner spell haste|summoner spell haste]], and [[#Trinket haste|trinket haste]].");
  quote(pages.get("Haste")!, "{{as|{{sti|'''Ability haste'''}}|ability haste}}, or {{as|{{sti|'''AH'''}}|ability haste}} reduces the cooldowns of [[champion ability|champion abilities]] by a percentage. It is the most common form of '''haste''' and it is the only '''haste''' stat that is displayed by the game client in the HUD's player stat overview. It is capped at '''500''', which is equivalent to {{fd|83.{{recurring|3}}}}% cooldown reduction.");
  quote(pages.get("Haste")!, "'''Basic ability haste''' reduces the cooldowns of champion basic abilities. It stacks additively with ability haste. The resulting additive '''total haste''' is capped at '''500''', which is equivalent to {{fd|83.{{recurring|3}}}}% cooldown reduction.");
  quote(pages.get("Haste")!, "<math>\\pagecolor{Black}\\color{White}{\\rm New\\ Cooldown}={\\rm Base\\ Cooldown}\\times\\frac{100}{100+{\\rm Haste}}</math>");
  quote(pages.get("Haste")!, "'''''Last updated:''' April 19th, 2026, patch [[V26.08]]''");
  quote(pages.get("Cooldown")!, "''Normal Cooldowns'' are the most basic form of cooldowns. Abilities or Items that have normal cooldowns get reduced by the respective haste. The cooldown associated with runes is considered a normal cooldown, but there are currently no sources of haste that affects runes.");
  quote(pages.get("Cooldown")!, "''Static Cooldowns'' are cooldowns that can not be reduced by any means of ability haste, unless it has a way to reduce itself or by an associated effect.");
  quote(pages.get("Cooldown")!, "''Recharge'' is not technically a cooldown but is usually affected by ability haste. An effect with a recharge will cost a ''charge'' to cast. The effect stores multiple charges up to a maximum, and generates one after the recharge is complete (e.g. {{cai|Hawkshot|Ashe}}).");
  quote(pages.get("Cooldown")!, "* {{cai|Terrify|Fiddlesticks}}{{tt|*|Affected by ability haste}}");
  quote(pages.get("Cooldown")!, "* {{cai|Assassin's Path|Talon}}{{tt|*|Affected by ability haste}}");
  quote(pages.get("Champion ability")!, "All of a champion's abilities together is called their '''kit'''. Most champions' '''kit''' follows a similar structure. An innate ability, a number of basic abilities—typically three—and an ultimate ability. Each ability may grant a number of effects or even have different behaviors.");
  quote(pages.get("Champion ability")!, "* {{sbc|Basic ability:}} A ''basic ability'' is part of a champion's common and repeatable move set.");
  quote(pages.get("Champion ability")!, "* {{sbc|Ultimate:}} The ''ultimate'' ability is a champion's signature ability. It involves high-potency effects that can change the game.");
  quote(pages.get("Champion ability")!, "* {{sbc|Pseudo-Ultimate}}: A ''pseudo-ultimate'' is an ability classified as an ultimate for effects that interact with ultimate abilities (\"ultimate effects\"), such as {{cai|Hijack|Sylas}} and {{ri|Axiom Arcanist}}, but deviates greatly from the typical design. This includes transforming champions' transformation ability, low-cooldown abilities like {{cai|Portal Jump|Zoe}}, as well as abilities that upgrade other abilities to new ones upon casting the pseudo-ultimate.");
  quote(pages.get("Champion ability")!, "* {{cai|Wingborne Storm|Udyr}}");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "Some champions have abilities that decrease their cooldowns by a flat amount, or by a percentage, affecting either their '''base''' cooldown or '''current''' cooldown. Some abilities can also completely refresh their cooldown. '''Base''' reduction occurs before ability haste takes effect while flat reduction occurs after ability haste takes effect.");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Base (applies before AH)");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Flat (applies after AH)");
  quote(pages.get("Haste/Reducing ability cooldowns")!, "* Percent (applies to '''base''' / '''current''' / '''total''' cooldown)");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "|description  = {{sbc|Innate - Awakened Spirit:}} '''Udyr''' has no {{tip|ability|ultimate ability}} and instead has 4 {{tip|ability|basic abilities}} that each incur a {{sti|cd|{{tt|{{fd|1.5}}-second global cooldown|Affected by ability haste}}}} when cast. Each ability grants a ''Stance'' that empowers his basic attacks, and switching ''Stances'' will replace the empowered attacks of the previous ''Stance''.");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "|customlabel  = {{tt|Cooldown|Unaffected by ability haste, but affected by ultimate haste}}");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "* ''Awakened Spirit's'' cooldown is affected by {{sti|ah|icononly=true}} {{as|ultimate haste|ah}}.");
  quote(pages.get("Template:Data Udyr/Bridge Between")!, "* {{iis|Axiom Arc}} {{nie|Flux}} does not count neither ''Awakened Spirit'' nor ''{{ai|Wingborne Storm|Udyr}}'' as ultimate abilities.");
  quote(pages.get("Template:Data Udyr/Wingborne Storm")!, "|skill        = R");
  quote(pages.get("Template:Data Udyr/Wingborne Storm")!, "|cooldown     = {{tt|6|Starts on-cast, but recasting refreshes the cooldown}}");
  quote(pages.get("Udyr")!, "* He is one of the few characters without an ultimate along with {{ci|Jayce}}. Udyr has 4 skills that can be leveled up to the maximum rank of 6.");
  // The direct cap award composes the general maximum/current-health rule with
  // champion-specific conversion and fixed-cap rules. These sources do not prove
  // dead/fallen restoration timing or immediate resizing of existing shields.
  quote(pages.get("Legend: Bloodline")!, "* Life steal per stack increased to {{fd|0.45}}% from {{fd|0.4}}%.");
  quote(pages.get("Legend: Bloodline")!, "* Life steal per stack increased to {{fd|0.4}}% from {{fd|0.35}}%.");
  quote(pages.get("Legend: Bloodline")!, "* Bonus health reduced to 85 from 100.");
  quote(pages.get("Life steal")!, "{{as|{{sti|'''Life steal'''}}}} is a [[Champion statistic|stat]] that grants {{tip|heal|healing}} equal to a percentage of the {{tip|basic damage}} dealt. It applies to [[basic attack]]s, including those that are modified (such as {{ai|Siphoning Strike|Nasus}} or {{tip|Spellblade}}), and abilities that are considered by the game engine to act as one (usually those which trigger [[on-hit]] effects e.g. {{ai|Mystic Shot|Ezreal}}, {{ai|Parrrley|Gangplank}}, {{ai|Steel Tempest|Yasuo}}). Life steal does not benefit from {{sti|Heal Power|link=Heal and shield power}}. The damage of most item {{tip|on-hit}} effects benefits from life steal, denoted by the icon.");
  quote(pages.get("Life steal")!, "* Life steal '''{{tip|stacks additively}}'''.");
  quote(pages.get("Life steal")!, "* Life steal does not apply to damage dealt to [[structures]] nor {{ai|H-28G Evolution Turret|Heimerdinger}} or {{ai|H-28Q Apex Turret|Heimerdinger}}.");
  quote(pages.get("Life steal")!, "* Life steal applies on damage to [[wards]] ''after'' the damage is reduced to 1, restoring effectively no health.");
  quote(pages.get("Life steal")!, "The healing is based on the post-mitigation damage dealt, meaning after sources of [[armor]], [[magic resistance]], and {{tt|some sources|see interactions with damage modifiers}} of [[damage modifier|damage reduction]] are taken into account.");
  quote(pages.get("Life steal")!, "Generally speaking, all {{tip|basic damage}} applies '''life steal''' by default, regardless of subtype: {{tip|physical damage}} dealt by {{tip|basic attack|basic attacks}}, {{tip|true damage}} dealt by {{cai|Hextech Munitions|Corki}} basic attacks and {{tip|true damage}} dealt by {{cai|Precision Protocol|Camille}} all trigger '''life steal''' based on the damage dealt.");
  quote(pages.get("Life steal")!, "Some pets basic attacks also apply '''life steal''' ({{cis|Annie}} {{ui|Tibbers}}, {{cis|Ivern}} {{ui|Daisy}}, {{cis|Malzahar}} {{ui|Voidling}}). {{bug|2|Expectation since V13.14's Yorick ghoul leap and R basic attacks change to stop applying life steal}}");
  quote(pages.get("Life steal")!, "The following effects do not reduce the effectiveness of healing granted by lifesteal.");
  quote(pages.get("Life steal")!, "* {{cai|Riposte|Fiora}}");
  quote(pages.get("Health")!, "Every champion has a certain amount of base health that increases through [[Champion statistic#Growing statistics|growth per level]]. '''Maximum''' health refers to '''base''' plus '''bonus''' health, and is the largest value that health can be restored to, not counting [[Shield|shields]]. '''Bonus''' health can be gained from any source other than levels, for example from [[Champion ability|abilities]], [[Buff|buffs]], [[Item (League of Legends)|items]], [[Rune (League of Legends)|runes]], and others.");
  quote(pages.get("Health")!, "An increase to the maximum health also affects current health by the same amount. A decrease in maximum health does not change current health, unless it would exceed the reduction of maximum health, in which case the champion's current health would be equal to 100% of the new maximum.");
  quote(pages.get("Health")!, "* Units alive at 0 current health {{tt|cannot be damaged|Not invulnerability, on-hit effects and damage events are completely negated while a unit is at 0 health to prevent interactions such as life stealing from a dead target}} in any way and are ignored by {{tip|turrets}} (unless the unit damages a {{tip|champion}} while within their range) and {{tip|minions}}.");
  quote(pages.get("Healing")!, "'''Healing''' cannot increase a unit's current health over its maximum. The act of [[Experience (champion)|leveling up]] and certain [[Health#Champion abilities|champion abilities]] (such as {{cai|Wild Growth|Lulu}}) will increase a unit's current health by the same amount as the increase to their maximum health, but this is not considered a form of healing. As a result, they are not affected by healing reduction.");
  quote(pages.get("Template:Data Ornn/Living Forge")!, "|description2 = {{sbc|Innate - Master Craftsman:}} '''Ornn''' uses his craftsmanship in forgery to upgrade {{tt|most|See notes}} [[Legendary item]]s that he and his teammates own into {{sbc|Masterwork}} items, increasing the [[Gold efficiency (League of Legends)|gold value]] of all {{tt|upgradeable stats|See notes}} on the item by exactly {{g|1000}}, shared equally among them. When '''Ornn''' reaches [[Experience (champion)|level]] 13, the first eligible [[Legendary item]] in his inventory is upgraded automatically. For each level after 13 and before 18 (levels 14–17, total of 4, once per ally per game), '''Ornn''' can upgrade the first eligible [[Legendary item]] in an allied champion's inventory into its {{sbc|Masterwork}} variant. He can do so by selecting the ally while within 600 range, and forges the item's upgrade by performing ''Living Forge's'' {{tip|channel}}.<br><br>Additionally, '''Ornn''' increases his {{sti|{{as|'''bonus''' armor}}}}, {{sti|{{as|'''bonus''' magic resistance}}}} and {{sti|{{as|'''bonus''' health}}}} by 10% from all sources, further increased by 4% each time he upgrades a ''Legendary'' item into a {{sbc|Masterwork}} item, for a total increase of 30% to each stat after the maximum of 5 upgrades.");
  quote(pages.get("Template:Data Pyke/Gift of the Drowned Ones")!, "|description  = {{sbc|Innate:}} '''Pyke's''' {{sti|health|{{as|'''maximum''' health}}}} cannot increase except through [[Growth#Increasing_Statistics|growth (per level)]], instead he gains{{ft|{{sti|{{as|1 '''bonus''' attack damage}}}} {{as|per 14 '''bonus''' health}}.|{{sti|{{as|'''bonus''' attack damage}}}} equal to {{as|{{fd|7.143}}% of '''bonus''' health}}.}}");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "-->{{#vardefine:cp1|3.333}}<!-- Crimson's Pact 3.33% bonus health as ability power");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "|description  = {{sbc|Innate:}} '''Vladimir''' gains {{as|({{fd|{{#var:cp1}}}}% '''bonus''' health)}} as {{sti|ap|{{as|ability power}}}} and {{as|({{#var:cp2}}% AP)}} as {{sti|health|{{as|'''bonus''' health}}}}. These two bonuses do not stack with each other.");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "* ''Crimson Pact'' only affects '''Vladimir's''' {{as|'''maximum''' health}} and will not increase '''Vladimir's''' {{as|'''current''' health}} to prevent '''Vladimir''' from restoring health whenever his {{as|ability power}} fluctuates.");
  quote(pages.get("Template:Data Vladimir/Crimson Pact")!, "** '''Vladimir's''' {{as|'''current''' health}} can decrease to match his {{as|'''maximum''' health}} if ''Crimson Pact's'' {{as|'''bonus''' health}} is lost.");
  quote(pages.get("Template:Data Kled/Skaarl the Cowardly Lizard")!, "|description  = {{sbc|Innate:}} '''Kled''' rides his semi-trusty mount, '''{{ui|Skaarl|nolink=true}}'''. While {{sbc|Mounted}}, all damage dealt to the duo is suffered by '''{{ui|Skaarl|nolink=true}}''', who has {{pplevel|color=health|{{#expr:{{ccd|Kled & Skaarl|hp_base}}-{{ccd|Kled|hp_base}}}}+{{#expr:{{ccd|Kled & Skaarl|hp_lvl}}-{{ccd|Kled|hp_lvl}}}}*(x-1)*(0.7025+0.0175*(x-1))|formula={{#expr:{{ccd|Kled & Skaarl|hp_base}}-{{ccd|Kled|hp_base}}}}+{{#expr:({{ccd|Kled & Skaarl|hp_lvl}}-{{ccd|Kled|hp_lvl}})*17 round 1}}/17*(x-1)*(0.7025+0.0175*(x-1))}} {{as|'''base''' health}}; additional sources of health are applied to '''{{uis|Skaarl|nolink=true}}''' {{as|'''maximum''' health}}. Effects based on percentage health consider '''Kled''' and '''{{uis|Skaarl|nolink=true}}''' combined {{as|'''maximum''' health}}.");
  quote(pages.get("Template:Data Kled/Skaarl the Cowardly Lizard")!, "|description4 = While {{sbc|Mounted}}, {{tip|heal|healing}} and {{as|{{sti|health regeneration}}}} will first replenish '''{{uis|Skaarl|nolink=true}}''' health and will only apply to '''Kled's''' health while '''{{ui|Skaarl|nolink=true}}''' is at ''full'' health.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description  = {{sbc|Innate:}} '''Kled''' is only vulnerable to {{tip|death}} while {{sbc|Dismounted}}. '''Kled''' has {{sti|health|{{as|{{pplevel|{{ccd|Kled|hp_base}}+{{ccd|Kled|hp_lvl}}*(x-1)*(0.7025+0.0175*(x-1))}} '''base''' health}}}}, which is not improved by sources of {{as|'''bonus''' health}}, his {{as|movement speed}} is reduced{{ft|by {{as|{{#expr:{{ccd|Kled & Skaarl|ms}}-{{ccd|Kled|ms}}}}|movement speed}}|to {{as|{{ccd|Kled|ms}}|movement speed}}}}, and he gains {{sti|attack range|{{#expr:{{ccd|Kled|range}}-{{ccd|Kled & Skaarl|range}}}} '''total'''<!--not base, but possibly not bonus either because it doesn't affect acquisition range--> attack range}}. Effects based on percentage health consider '''Kled''' and '''{{uis|Skaarl|nolink=true}}''' combined {{as|'''maximum''' health}}, meaning that a {{sbc|Dismounted}} '''Kled''' is never considered to be at ''full'' health.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description3 = {{sbc|Innate - Courage:}} '''Kled''' gains 15 {{as|Courage|buzzword}} after completing a basic attack against a champion and 5 {{as|Courage|buzzword}} for lane {{tip|minion}} kills and when basic attacking {{tip|structures}} or epic {{tip|monsters}}. He can also restore {{as|Courage|buzzword}} from hitting enemies with ''{{ai|Pocket Pistol|Kled}}''. Upon reaching 100 {{as|Courage|buzzword}}, '''{{ui|Skaarl|nolink=true}}''' instantly restores {{as|{{pp|key=%|40 to 70 for 4|1 to 16}} of her '''maximum''' health}} and reunites with '''Kled''' over {{fd|0.25}} seconds, after which he consumes all {{as|Courage|buzzword}} to become {{sbc|Mounted}} and the duo become {{tip|lockout|unable}} to declare basic attacks or cast their {{tip|abilities}} for {{fd|0.25}} seconds. ''Mounting up'' resets the {{sti|cooldowns}} of ''{{ai|Bear Trap on a Rope|Kled}}'' and ''{{ai|Jousting|Kled}}''.");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "|description5 = ''The current status of '''Kled's''' own health is preserved between subsequent dismounts.''");
  quote(pages.get("Template:Data Kled/Dismounted Skaarl the Cowardly Lizard")!, "* Sources of increased {{as|'''maximum''' health}} that additionally restore {{as|'''current''' health}} will restore '''Kled's''' {{as|'''current''' health}} even if he is '''DISMOUNTED'''.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "|description4     = {{sbc|All Out:}} '''K'Sante''' gains a [[Health#Health_threshold|health threshold]] equal to {{sti|{{as|65% '''maximum''' health}}}} which cannot be {{tt|modified|By increases or decreases to maximum health}} nor {{tt|exceeded|By healing and health regeneration}} by any means. Upon entering ''All Out'', his {{as|'''current''' health}} is reduced to this threshold if it is above it. Additionally, his {{sti|armor|{{as|'''base''' armor}}}} and {{sti|mr|{{as|'''base''' magic resistance}}}} are reduced by {{as|85% '''bonus''' armor}} and {{as|85% '''bonus''' magic resistance}}, respectively. In return, he gains {{sti|{{as|'''bonus''' attack speed}}}}, {{sti|lethality|{{as|50% {{tt|'''bonus'''-armor penetration|Affects bonus armor only}}}}}}, and {{sti|{{as|20% omnivamp}}}}, and modifies his {{tip|ability|basic abilities}} which can be cast at no cost.<br><br>Upon entering ''All Out'', '''K'Sante''' is restored to {{as|100% '''maximum''' mana}}. His {{as|mana}} then decays to {{as|0|mana}} over the duration of the buff, after which the {{tt|amount of {{as|mana}}|Preserves the exact amount of mana, not his mana percentage at the time}} he had {{tt|prior to entering ''All Out''|After paying All Out's mana cost}} is restored.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "|description5     = '''''K'Sante''' retains his {{as|'''maximum''' health}} and '''bonus''' resistances during All Out. Health lost from gaining the health threshold is '''not''' restored after the effect ends. If the target is pulled over terrain, '''K'Sante''' will {{tip|vanish}} during their displacement and reappear near the end of it.''");
  quote(pages.get("Template:Data K'Sante/All Out")!, "* Gaining '''bonus''' health during ''All Out'' causes the health threshold to be briefly increased then reset back to its original value.");
  quote(pages.get("Template:Data K'Sante/All Out")!, "** The '''bonus''' health is still applied to his '''current''' health.");
  quote(pages.get("Template:Data Malphite/Granite Shield")!, "|description2 = {{sbc|Innate - Granite Shield:}} '''Malphite''' grants himself a {{tip|shield}} equal to {{as|10% of his '''maximum''' health}}. The shield lasts until it is broken, and replenishes to full strength after a few seconds of not taking damage.");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "|description  = {{sbc|Passive:}} '''Galio''' gains ''Anti-Magic Bulwark'', and restores it after {{pp|12 to 8 for 3|1;6;11}} seconds without taking damage.<br/><br/>{{sbc|Anti-Magic Bulwark:}} Gain a {{tip|shield}} that absorbs {{as|magic damage}}.");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "|leveling    = {{st|Magic Shield Strength|{{as|{{ap|7.5 to 13.5}}% of '''maximum''' health}}}}");
  quote(pages.get("Template:Data Galio/Shield of Durand")!, "* Since ''Anti-Magic Bulwark'' is instantly granted upon learning the ability, the {{tip|shield}} may be gained once per game while in combat.");
  // Reject edits elsewhere too: a reviewed revision is retained in full, not reduced to favorable excerpts.
  for (const page of pages.values()) requireThat(page.sha256 === REVIEWED[page.title]!.sha256, `${page.title} full reviewed revision changed`);
  requireThat(sha256(gameText) === GAME_SHA256, "complete reviewed game source changed");
  return {
    schema: 1, dataset: "16.21", patch: "26.21",
    cheapShot: { modelLevel: 20, damage: (cheapMin! * cheapSteps + (cheapMax! - cheapMin!) * (cheapLevel - 1)) / cheapSteps, cooldown: cheapCooldown! },
    scorch: { modelLevel: 20, damage: (scorchMin! * scorchSteps + (scorchMax! - scorchMin!) * (scorchLevel - 1)) / scorchSteps,
      delay: scorchDelay!, cooldown: scorchCooldown! },
    tasteOfBlood: { modelLevel: 20, heal: (tasteMin! * tasteSteps + (tasteMax! - tasteMin!) * (tasteLevel - 1)) / tasteSteps,
      bonusAdRatio: tasteAdRatio, apRatio: tasteApRatio, cooldown: tasteCooldown! },
    fontOfLife: { modelLevel: 20, heal: fontMin! + (fontMax! - fontMin!) * (fontLevel - 1) / fontSteps,
      rangedRatio: fontRangedRatio!, cooldown: fontCooldown!, allyRadius: fontRadius! },
    aftershock: { modelLevel: 20, flatResistance: aftershockFlat!, bonusResistanceRatio: aftershockResistRatio,
      maxResistance: aftershockCap, baseDamage: aftershockBaseDamage, bonusHealthRatio: aftershockHealthRatio,
      duration: aftershockDuration!, cooldown: aftershockCooldown!, radius: aftershockRadius! },
    overgrowth: { unitsPerStack: overgrowthUnits!, healthPerStack: overgrowthFlatHp!,
      thresholdUnits: overgrowthThresholdUnits!, healthRatio: overgrowthHealthRatio, radius: overgrowthRadius! },
    shieldBash: { modelLevel: 20, baseDamage: shieldBashDamage, bonusHealthRatio: shieldHealthRatio! / 100,
      shieldRatio: shieldAmountRatio! / 100, linger: shieldLinger! },
    bonePlating: { modelLevel: 20, reduction: boneReduction, charges: boneCharges, duration: boneDuration!, cooldown: boneCooldown! },
    grasp: { maxStacks: graspCap, stackInterval: graspInterval, combatWindow: graspCombatWindow,
      readyWindow: graspReadyWindow, meleeDamageRatio: graspMeleeDamage! / 100, rangedDamageRatio: graspRangedDamage! / 100,
      meleeHealRatio: graspMeleeHeal! / 100, rangedHealRatio: graspRangedHeal! / 100,
      meleeHealth: graspMeleeHealth!, rangedHealth: graspRangedHealth!, healDelay: graspHealDelay },
    conqueror: { modelLevel: 20, maxStacks: conqCap, stackDuration: conqDuration!, castCooldown: conqCooldown!,
      meleeBasicStacks: conqMelee, rangedBasicStacks: conqRanged, spellStacks: conqSpell,
      adaptiveForcePerStack: conqForce, adaptiveADRatio: conqAD, adaptiveAPRatio: conqAP,
      meleeHealingRatio: conqHeal! / 100, rangedHealingRatio: conqRangedHeal! / 100 },
    lethalTempo: { modelLevel: 20, maxStacks: tempoCap, stackDuration: tempoDuration!, decayInterval: tempoDecay!,
      attackSpeedPerStack: tempoAS! / 100, rangedAttackSpeedRatio: tempoRangedAS!, boltDamage: tempoBoltDamage,
      rangedBoltRatio: tempoRangedBolt!, bonusAttackSpeedRatio: tempoScaling / tempoPer, boltSpeed: tempoBoltSpeed,
      boltGate: "max-stacks-before-attack", boltStatModel: "at-launch", boltTravelModel: "fixed-endpoint" },
    fleetFootwork: { modelLevel: 20, healBase: fleetHealBase, bonusADRatio: fleetADPercent! / 100, apRatio: fleetAPPercent! / 100,
      rangedHealRatio: fleetRangedRatio!, minionHealRatio: fleetMinionPercent! / 100, moveSpeedIncrease: fleetMSPercent! / 100,
      rangedMoveSpeedRatio: fleetRangedMSPercent! / fleetMSPercent!, moveSpeedDuration: fleetDuration!,
      maxCharges: fleetMaximum!, attackCharges: fleetAttackCharges!, unitsPerCharge: fleetDistance!,
      // Explicit simulator policies: source wording does not establish these phases.
      chargeModel: "current-at-connected-on-hit", chargePrecision: "continuous",
      healDeliveryModel: "immediate-at-consumption", statSamplingModel: "current-at-consumption" },
    absorbLife: { heal: absorbHeal },
    pressTheAttack: { modelLevel: 20, damage: pressDamage, hitsRequired: pressHits!, stackDuration: pressStackDuration!,
      cooldown: pressCooldown!, damageIncrease: pressPercent! / 100, combatDuration: pressCombatDuration!,
      // These three phases are explicit simulator policies, not live-script proof.
      combatExpiryModel: "last-qualified-activity", adaptiveDamageModel: "current-derived-bonus-ad-vs-ap",
      activationFrameModel: "simulation-tick" },
    presenceOfMind: { modelLevel: 20, manaRestore: presenceManaRestore, rangedManaRatio: presenceRangedRatio,
      energyRestore: presenceEnergyRestore, damageCooldown: presenceCooldown,
      takedownResourceRatio: presenceManaPercent! / 100, takedownDelay: presenceDelay!,
      // Delivery-time maximum is a declared local policy; no native resource
      // snapshot or exact server phase is established by the retained sources.
      maximumResourceModel: "current-at-delivery" },
    triumph: {
      maximumHealthRatio: triumphMaximumPercent! / 100, missingHealthRatio: triumphMissingPercent! / 100,
      delay: triumphDelay!,
      // Reference economic value only: the fixed-loadout duel does not award or spend it.
      bonusGold: triumphBonusGold!,
      // The source establishes missing HP at takedown, not this exact native
      // callback phase. Both HP terms use the chosen immutable credit frame;
      // maximum-HP timing and current modifiers at delivery remain assumptions.
      missingHealthModel: "at-native-kill-credit",
    },
    legendAlacrity: { baseAttackSpeed: alacrityBase! / 100, attackSpeedPerStack: alacrityPerStack! / 100,
      pointsPerStack: legendPointsPerStack!, maxStacks: alacrityMaxStacks!, championKillPoints },
    legendHaste: { baseHaste: 0, hastePerStack: hastePerStack!, pointsPerStack: hastePointsPerStack!,
      maxStacks: hasteMaxStacks!, championKillPoints: hasteChampionPoints },
    legendBloodline: { baseLifeSteal: 0, lifeStealPerStack: Number((bloodlinePerStackPercent! / 100).toPrecision(15)),
      pointsPerStack: bloodlinePointsPerStack!, maxStacks: bloodlineMaxStacks!,
      championKillPoints: bloodlineChampionPoints, bonusHealth: bloodlineBonusHealth! },
    coupDeGrace: { healthThreshold: coupHealth! / 100, damageIncrease: coupPercent! / 100 },
    cutDown: { healthThreshold: cutHealth! / 100, damageIncrease: cutPercent! / 100 },
    lastStand: { healthThreshold: lastHealth! / 100, maximumHealthThreshold: lastMaxHealth! / 100,
      minimumDamageIncrease: lastMin! / 100, maximumDamageIncrease: lastMax! / 100 },
    secondWind: {
      duration: windSeconds!, missingHealthPerSecond: hpPercent! / 100 / hpDuration!, tickInterval,
      // The HP5 article does not establish snapshot or pulse-phase timing. This is an explicit model interpretation.
      missingHealthModel: "current-at-regeneration-tick",
    }, evidence,
  };
}

/** Offline committed inputs only; a directory cannot relabel sources from another patch. */
export async function loadCombatRuneRules(dataset: string, catalog?: RuneCatalog): Promise<CombatRuneRules> {
  requireThat(dataset === "16.21", "expected the reviewed dataset 16.21");
  const source = catalog ?? await loadRuneCatalog(path.join(datasetDir(dataset), "rune-sources"));
  const [wikiText, gameText] = await Promise.all([
    readFile(path.join(datasetDir(dataset), "rune-combat-sources.json"), "utf8"),
    readFile(path.join(datasetDir(dataset), "rune-game-perks.json"), "utf8"),
  ]);
  return buildCombatRuneRules(source, JSON.parse(wikiText) as CombatRuneSourceBundle, gameText);
}
