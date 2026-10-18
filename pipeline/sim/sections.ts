/** Replace one generated level-two section while retaining the audited source/ledger text. */
export function replaceSimulatorSection(page: string, heading: string, lines: string[], beforeFirstSection = false): string {
  const rows = page.split("\n");
  const start = rows.findIndex((row) => row.startsWith(heading));
  if (start >= 0) {
    const next = rows.findIndex((row, index) => index > start && row.startsWith("## "));
    const end = next >= 0 ? next : rows.length;
    return `${rows.slice(0, start).join("\n").trimEnd()}\n\n${lines.join("\n").trimEnd()}\n${next >= 0 ? `\n${rows.slice(end).join("\n").trimEnd()}\n` : ""}`;
  }
  const first = beforeFirstSection ? rows.findIndex((row) => row.startsWith("## ")) : -1;
  if (first >= 0) return `${rows.slice(0, first).join("\n").trimEnd()}\n\n${lines.join("\n").trimEnd()}\n\n${rows.slice(first).join("\n").trimEnd()}\n`;
  return `${page.trimEnd()}\n\n${lines.join("\n").trimEnd()}\n`;
}
