/**
 * Reads the wiki's crowd control summary table ("Types of Crowd Control/Summary"): for each
 * type, whether the target can move, attack and cast, whether it interrupts channels,
 * whether tenacity shortens it, and which abilities remove it.
 */
import { parseWikitext, preprocess, type WikiNode } from "../wikitext/parse";
import { type AbilityMention, plainText } from "./lists";

export interface CrowdControlRow {
  types: string[];
  movement: string;
  attacking: string;
  abilities: string;
  interruptsChannels: string;
  tenacity: boolean;
  removedBy: AbilityMention[];
}

function cellValue(nodes: WikiNode[]): string {
  return plainText(nodes).replace(/\s+/g, " ").trim().toLowerCase();
}

/** Crowd control types named in the first cell: "{{tip|Stun}} and {{tip|Suspension}}" -> stun, suspension. */
function typesOf(nodes: WikiNode[]): string[] {
  const types: string[] = [];
  for (const node of nodes) {
    if (node.type !== "template" || plainText(node.name).trim().toLowerCase() !== "tip") continue;
    const name = plainText(node.args[0]?.value ?? []).trim().toLowerCase();
    // "Forced Action" is the group heading for berserk, charm, flee and taunt, listed after it.
    if (name && name !== "forced action") types.push(name === "flee" ? "fear" : name);
  }
  return types;
}

function removersOf(nodes: WikiNode[]): AbilityMention[] {
  const mentions: AbilityMention[] = [];
  for (const node of nodes) {
    if (node.type !== "template" || plainText(node.name).trim().toLowerCase() !== "ai") continue;
    const positional = node.args.filter((arg) => arg.name === undefined);
    const ability = plainText(positional[0]?.value ?? []).trim();
    const champion = plainText(positional[1]?.value ?? []).trim();
    if (ability && champion) mentions.push({ ability, champion, qualifier: "", note: "" });
  }
  return mentions;
}

export function parseCrowdControlTable(content: string): CrowdControlRow[] {
  const table = preprocess(content);
  const rows = table.split(/\n\|-[^\n]*\n/).slice(1);
  const parsed: CrowdControlRow[] = [];
  for (const row of rows) {
    // Each cell starts a line with "|"; the table's closing "|}" ends the last row.
    const cells = row
      .replace(/\n\|\}[\s\S]*$/, "")
      .split(/\n(?=\|)/)
      .map((cell) => parseWikitext(cell.replace(/^\|\s?/, "")));
    if (cells.length < 8) continue;
    const [name, movement, attacking, abilities, interrupts, , tenacity, removal] = cells as WikiNode[][];
    const types = typesOf(name as WikiNode[]);
    if (types.length === 0) continue;
    parsed.push({
      types,
      movement: cellValue(movement as WikiNode[]),
      attacking: cellValue(attacking as WikiNode[]),
      abilities: cellValue(abilities as WikiNode[]),
      interruptsChannels: cellValue(interrupts as WikiNode[]),
      tenacity: cellValue(tenacity as WikiNode[]) === "yes",
      removedBy: removersOf(removal as WikiNode[]),
    });
  }
  return parsed;
}
