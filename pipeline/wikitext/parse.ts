/**
 * Parser for the subset of MediaWiki wikitext used by the wiki's ability data pages:
 * templates and parser functions ({{name|a|key=b}}), template parameters ({{{1|default}}}),
 * internal links ([[Page|text]]) and plain text. HTML comments and <noinclude> sections
 * are removed first, as MediaWiki does when a page is transcluded.
 */

export type WikiNode = TextNode | TemplateNode | ParamNode | LinkNode;

export interface TextNode {
  type: "text";
  value: string;
}

export interface TemplateNode {
  type: "template";
  name: WikiNode[];
  args: WikiArg[];
}

export interface ParamNode {
  type: "param";
  name: WikiNode[];
  fallback: WikiNode[] | undefined;
}

export interface LinkNode {
  type: "link";
  target: WikiNode[];
  text: WikiNode[] | undefined;
}

export interface WikiArg {
  /** Set for named arguments (key=value). */
  name: string | undefined;
  value: WikiNode[];
}

/** Applies MediaWiki's transclusion view: drops comments and <noinclude>, unwraps include tags. */
export function preprocess(source: string): string {
  return source
    .replace(/<!--[\s\S]*?(?:-->|$)/g, "")
    .replace(/<noinclude>[\s\S]*?(?:<\/noinclude>|$)/g, "")
    .replace(/<\/?(?:includeonly|onlyinclude)>/g, "");
}

type Stop = "|" | "}}" | "}}}" | "]]";

class Parser {
  private position = 0;

  constructor(private readonly source: string) {}

  parseAll(): WikiNode[] {
    const nodes = this.parseNodes([]);
    // Unbalanced closers at the top level are plain text.
    while (this.position < this.source.length) {
      nodes.push({ type: "text", value: this.source[this.position] as string });
      this.position++;
      nodes.push(...this.parseNodes([]));
    }
    return mergeText(nodes);
  }

  private startsWith(token: string): boolean {
    return this.source.startsWith(token, this.position);
  }

  private braceRun(): number {
    let end = this.position;
    while (this.source[end] === "{") end++;
    return end - this.position;
  }

  /** Parses until one of `stops` is at the current position (or the input ends). */
  private parseNodes(stops: readonly Stop[]): WikiNode[] {
    const nodes: WikiNode[] = [];
    let text = "";
    const flush = () => {
      if (text) nodes.push({ type: "text", value: text });
      text = "";
    };
    while (this.position < this.source.length) {
      if (stops.some((stop) => this.startsWith(stop))) break;
      if (this.startsWith("{{")) {
        const node = this.tryBraces();
        if (node) {
          flush();
          nodes.push(node);
          continue;
        }
      }
      if (this.startsWith("[[")) {
        const node = this.tryLink();
        if (node) {
          flush();
          nodes.push(node);
          continue;
        }
      }
      text += this.source[this.position];
      this.position++;
    }
    flush();
    return nodes;
  }

  /** Parses a template or parameter at the current position, or returns undefined if unclosed. */
  private tryBraces(): WikiNode | undefined {
    const start = this.position;
    const run = this.braceRun();
    // A run of five braces is a template whose name starts with a parameter: {{ {{{1}}} |...}}.
    const node = run === 3 || run >= 6 ? this.parseParam() : this.parseTemplate();
    if (!node) this.position = start;
    return node;
  }

  private parseTemplate(): TemplateNode | undefined {
    this.position += 2;
    const name = this.parseNodes(["|", "}}"]);
    const args: WikiArg[] = [];
    while (this.startsWith("|")) {
      this.position++;
      args.push(splitNamedArg(this.parseNodes(["|", "}}"])));
    }
    if (!this.startsWith("}}")) return undefined;
    this.position += 2;
    return { type: "template", name: mergeText(name), args };
  }

  private parseParam(): ParamNode | undefined {
    this.position += 3;
    const name = this.parseNodes(["|", "}}}"]);
    let fallback: WikiNode[] | undefined;
    if (this.startsWith("|")) {
      this.position++;
      fallback = this.parseNodes(["}}}"]);
    }
    if (!this.startsWith("}}}")) return undefined;
    this.position += 3;
    return { type: "param", name: mergeText(name), fallback: fallback && mergeText(fallback) };
  }

  private tryLink(): LinkNode | undefined {
    const start = this.position;
    this.position += 2;
    const target = this.parseNodes(["|", "]]"]);
    let text: WikiNode[] | undefined;
    if (this.startsWith("|")) {
      this.position++;
      text = this.parseNodes(["]]"]);
    }
    if (!this.startsWith("]]")) {
      this.position = start;
      return undefined;
    }
    this.position += 2;
    return { type: "link", target: mergeText(target), text: text && mergeText(text) };
  }
}

function mergeText(nodes: WikiNode[]): WikiNode[] {
  const merged: WikiNode[] = [];
  for (const node of nodes) {
    const last = merged.at(-1);
    if (node.type === "text" && last?.type === "text") last.value += node.value;
    else merged.push(node);
  }
  return merged;
}

/** `key = value` when the text before any nested node contains "=". */
function splitNamedArg(nodes: WikiNode[]): WikiArg {
  const first = nodes[0];
  if (first?.type === "text") {
    const index = first.value.indexOf("=");
    if (index >= 0) {
      const rest = first.value.slice(index + 1);
      const value = rest ? [{ type: "text" as const, value: rest }, ...nodes.slice(1)] : nodes.slice(1);
      return { name: first.value.slice(0, index).trim(), value: trimNodes(value) };
    }
  }
  return { name: undefined, value: mergeText(nodes) };
}

/** Trims whitespace at the edges, as MediaWiki does for named arguments. */
export function trimNodes(nodes: WikiNode[]): WikiNode[] {
  const result = mergeText(nodes.map((node) => (node.type === "text" ? { ...node } : node)));
  const first = result[0];
  if (first?.type === "text") first.value = first.value.trimStart();
  const last = result.at(-1);
  if (last?.type === "text") last.value = last.value.trimEnd();
  return result.filter((node) => node.type !== "text" || node.value !== "");
}

export function parseWikitext(source: string): WikiNode[] {
  return new Parser(preprocess(source)).parseAll();
}

/** The first template in the source, e.g. the outer data template of an ability page. */
export function firstTemplate(nodes: WikiNode[]): TemplateNode | undefined {
  return nodes.find((node): node is TemplateNode => node.type === "template");
}
