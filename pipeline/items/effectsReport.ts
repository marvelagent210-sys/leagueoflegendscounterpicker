/** What the simulator makes of each item's effects, as a readable page: reports/item-effects.md. */
import type { FighterSpec } from "../../engine/sim/spec";
import { equipItems } from "../../items/equip";
import { ITEM_MODULES } from "../../items/modules/index";
import type { ItemCatalog, ItemRecord } from "./records";

/** A plain fighter of each attack type: what an item does differs only by melee or ranged and mana. */
function plain(ranged: boolean): FighterSpec {
  return {
    id: ranged ? "ranged" : "melee",
    name: ranged ? "a ranged champion" : "a melee champion",
    resourceType: "Mana",
    base: { hp: 2000, hpRegen: 10, resource: 1000, resourceRegen: 10, armor: 100, mr: 60, ad: 100, attackSpeed: { base: 0.65, ratio: 0.65, bonus: 0.3 }, windup: { percent: 0.25, modifier: 1 }, moveSpeed: 340, radius: 65, pathingRadius: 35, critDamageModifier: 1 },
    attack: ranged ? { range: 550, ranged: true, missileSpeed: 2000, projectile: true } : { range: 125, ranged: false, projectile: false },
    abilities: [],
  };
}

/** An effect as the page names it: its name, or for an unnamed one its wiki text. */
function effectLabel(record: ItemRecord, name: string): string {
  const effect = record.effects.find((e) => e.name === undefined && e.slot === name);
  return effect ? `the ${effect.slot.startsWith("act") ? "active" : "passive"} "${effect.text.replace(/\.$/, "")}"` : name;
}

function itemSection(record: ItemRecord, catalog: ItemCatalog): string[] {
  const source = { page: catalog.sources.itemData.title, revid: catalog.sources.itemData.revid, rules: catalog.rulePages };
  const fighters = [plain(false), plain(true)].filter((spec) => spec.attack.ranged || !/only be purchased on ranged champions/i.test(record.restriction ?? ""));
  const equipped = fighters.map((spec) => equipItems(spec, [record], { modules: ITEM_MODULES, source }));
  const modeled = [...new Set(equipped.flatMap((e) => e.coverage[0]!.modeled))].map((name) => effectLabel(record, name));
  const left = [...new Set(equipped.flatMap((e) => e.coverage[0]!.unmodeled))];
  const optionList = Object.entries(ITEM_MODULES[record.name]?.options ?? {});
  // Option values are listed as options, not as assumptions.
  const assumptions = [...new Set(equipped.flatMap((e) => e.assumptions))].map((text) => text.replace(`${record.name}: `, "")).filter((text) => !optionList.some(([, option]) => text.startsWith(`${option.label}: `)));
  const options = optionList.map(([key, option]) => `${option.label} (option \`${key}\`, default ${option.default})`);
  const lines = [`### ${record.name}`, ""];
  if (record.effects.length === 0) lines.push("Stats only.");
  if (modeled.length) lines.push(`Modeled: ${modeled.join(", ")}.`);
  for (const text of left) lines.push(`- Left out: ${text}`);
  for (const text of assumptions) lines.push(`- Assumed: ${text}`);
  for (const text of options) lines.push(`- Option: ${text}`);
  lines.push("");
  return lines;
}

export function itemEffectsReport(catalog: ItemCatalog): string {
  const all = [...catalog.items, ...catalog.transforms];
  const covered = all.map((record) => {
    const source = { page: catalog.sources.itemData.title, revid: catalog.sources.itemData.revid, rules: catalog.rulePages };
    const spec = plain(true);
    return equipItems(spec, [record], { modules: ITEM_MODULES, source }).coverage[0]!;
  });
  const statsOnly = all.filter((record) => record.effects.length === 0).length;
  const full = covered.filter((entry, i) => all[i]!.effects.length > 0 && entry.unmodeled.length === 0).length;
  const none = covered.filter((entry) => entry.modeled.length === 0 && entry.unmodeled.length > 0).length;
  const lines = [
    `# Item effects, patch ${catalog.patch}`,
    "",
    "What the duel simulator makes of each item (items/, PLAN.md §13, M8): the effects it models from the item's wiki text, what it leaves out and why, and the simplifications it makes. Every number comes from the wiki's text: a quote that is no longer there fails the build.",
    "",
    `${all.length} items (the ${catalog.items.length} of the catalog and ${catalog.transforms.length} transformed Tear items): ${statsOnly} have stats only, ${full} have every effect modeled, ${none} have none that can act in a duel, and the rest leave part out.`,
    "",
    `The rules the items follow beyond their own text come from pinned wiki pages: ${catalog.rulePages.map((page) => `${page.title} (revision ${page.revid})`).join(", ")}.`,
    "",
    "Actives can be used under any crowd control but knock-ups and stuns (suppression, sleep and stasis count as stuns), and Mercurial Scimitar's Quicksilver under stuns too, never knocked up; a dash not while rooted or grounded either (confirmed on review, 20 October, and for suppression on 1 November; the wiki's own rule stops items under every cast-inhibiting type).",
    "",
  ];
  for (const [title, list] of [["Finished items", catalog.items.filter((r) => r.kind === "legendary")], ["Boots", catalog.items.filter((r) => r.kind === "boots")], ["Transformed items", catalog.transforms]] as const) {
    lines.push(`## ${title}`, "");
    for (const record of list) lines.push(...itemSection(record, catalog));
  }
  return `${lines.join("\n").trimEnd()}\n`;
}
