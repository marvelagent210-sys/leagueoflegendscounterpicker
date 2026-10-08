/**
 * Parser for Lua data modules of the form `return { ... }`, as used by the wiki's
 * Module:ChampionData/data. Supports table constructors, strings (quoted and long
 * brackets), numbers, booleans, nil, comments, and constant arithmetic such as
 * `84+1000/17`. It does not execute code: identifiers other than true/false/nil
 * are rejected.
 */

export type LuaValue = null | boolean | number | string | LuaValue[] | LuaTable;
export interface LuaTable {
  [key: string]: LuaValue;
}

export class LuaParseError extends Error {
  constructor(message: string, source: string, offset: number) {
    const before = source.slice(0, offset);
    const line = before.split("\n").length;
    const column = offset - before.lastIndexOf("\n");
    super(`${message} at line ${line}, column ${column}`);
  }
}

type Token =
  | { kind: "string"; value: string; offset: number }
  | { kind: "number"; value: number; offset: number }
  | { kind: "name"; value: string; offset: number }
  | { kind: "symbol"; value: string; offset: number }
  | { kind: "eof"; offset: number };

const SYMBOLS = ["..", "{", "}", "[", "]", "=", ",", ";", "+", "-", "*", "/", "%", "^", "(", ")"];

function longBracketLevel(source: string, offset: number): number {
  // Returns the number of '=' in an opening long bracket at offset, or -1 if none.
  if (source[offset] !== "[") return -1;
  let level = 0;
  let i = offset + 1;
  while (source[i] === "=") {
    level++;
    i++;
  }
  return source[i] === "[" ? level : -1;
}

function readLongBracket(source: string, offset: number, level: number): { text: string; end: number } {
  const open = level + 2;
  const close = `]${"=".repeat(level)}]`;
  const end = source.indexOf(close, offset + open);
  if (end < 0) throw new LuaParseError("Unterminated long bracket", source, offset);
  let text = source.slice(offset + open, end);
  if (text.startsWith("\r\n")) text = text.slice(2);
  else if (text.startsWith("\n")) text = text.slice(1);
  return { text, end: end + close.length };
}

const ESCAPES: Record<string, string> = {
  n: "\n",
  t: "\t",
  r: "\r",
  a: "\x07",
  b: "\b",
  f: "\f",
  v: "\v",
  "\\": "\\",
  '"': '"',
  "'": "'",
  "\n": "\n",
};

function readQuoted(source: string, offset: number): { text: string; end: number } {
  const quote = source[offset];
  let text = "";
  let i = offset + 1;
  for (;;) {
    const ch = source[i];
    if (ch === undefined || ch === "\n") throw new LuaParseError("Unterminated string", source, offset);
    if (ch === quote) return { text, end: i + 1 };
    if (ch !== "\\") {
      text += ch;
      i++;
      continue;
    }
    const next = source[i + 1];
    if (next === undefined) throw new LuaParseError("Unterminated string", source, offset);
    if (next in ESCAPES) {
      text += ESCAPES[next];
      i += 2;
    } else if (next === "x") {
      const hex = source.slice(i + 2, i + 4);
      if (!/^[0-9a-fA-F]{2}$/.test(hex)) throw new LuaParseError("Bad \\x escape", source, i);
      text += String.fromCharCode(parseInt(hex, 16));
      i += 4;
    } else if (next === "u") {
      const match = /^\{([0-9a-fA-F]+)\}/.exec(source.slice(i + 2));
      if (!match?.[1]) throw new LuaParseError("Bad \\u escape", source, i);
      text += String.fromCodePoint(parseInt(match[1], 16));
      i += 2 + match[0].length;
    } else if (next === "z") {
      i += 2;
      while (/\s/.test(source[i] ?? "")) i++;
    } else if (/\d/.test(next)) {
      const digits = /^\d{1,3}/.exec(source.slice(i + 1))?.[0] ?? "";
      text += String.fromCharCode(Number(digits));
      i += 1 + digits.length;
    } else {
      throw new LuaParseError(`Unknown escape \\${next}`, source, i);
    }
  }
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i] as string;
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (source.startsWith("--", i)) {
      const level = longBracketLevel(source, i + 2);
      if (level >= 0) {
        i = readLongBracket(source, i + 2, level).end;
      } else {
        const newline = source.indexOf("\n", i);
        i = newline < 0 ? source.length : newline + 1;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      const { text, end } = readQuoted(source, i);
      tokens.push({ kind: "string", value: text, offset: i });
      i = end;
      continue;
    }
    const level = longBracketLevel(source, i);
    if (level >= 0) {
      const { text, end } = readLongBracket(source, i, level);
      tokens.push({ kind: "string", value: text, offset: i });
      i = end;
      continue;
    }
    const number = /^(?:0[xX][0-9a-fA-F]+|(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)/.exec(source.slice(i, i + 64));
    if (number && /[\d.]/.test(ch)) {
      tokens.push({ kind: "number", value: Number(number[0]), offset: i });
      i += number[0].length;
      continue;
    }
    const name = /^[A-Za-z_]\w*/.exec(source.slice(i, i + 256));
    if (name) {
      tokens.push({ kind: "name", value: name[0], offset: i });
      i += name[0].length;
      continue;
    }
    const symbol = SYMBOLS.find((s) => source.startsWith(s, i));
    if (symbol) {
      tokens.push({ kind: "symbol", value: symbol, offset: i });
      i += symbol.length;
      continue;
    }
    throw new LuaParseError(`Unexpected character ${JSON.stringify(ch)}`, source, i);
  }
  tokens.push({ kind: "eof", offset: source.length });
  return tokens;
}

class Parser {
  private position = 0;

  constructor(
    private readonly source: string,
    private readonly tokens: Token[],
  ) {}

  private peek(): Token {
    return this.tokens[this.position] as Token;
  }

  private next(): Token {
    const token = this.peek();
    if (token.kind !== "eof") this.position++;
    return token;
  }

  private fail(message: string, token: Token = this.peek()): never {
    throw new LuaParseError(message, this.source, token.offset);
  }

  private isSymbol(value: string): boolean {
    const token = this.peek();
    return token.kind === "symbol" && token.value === value;
  }

  /** True when the token after the current one is '=' (a `name = value` table field). */
  private isAssignmentAhead(): boolean {
    const ahead = this.tokens[this.position + 1];
    return ahead?.kind === "symbol" && ahead.value === "=";
  }

  private expectSymbol(value: string): void {
    if (!this.isSymbol(value)) this.fail(`Expected '${value}'`);
    this.next();
  }

  parseModule(): LuaValue {
    const first = this.next();
    if (first.kind !== "name" || first.value !== "return") this.fail("Expected 'return'", first);
    const value = this.parseExpression();
    if (this.peek().kind !== "eof") this.fail("Unexpected content after the returned value");
    return value;
  }

  // Precedence, lowest first: '..' (right assoc), '+ -', '* / %', unary '-', '^' (right assoc).
  private parseExpression(): LuaValue {
    const left = this.parseAdditive();
    if (this.isSymbol("..")) {
      this.next();
      const right = this.parseExpression();
      if (!["string", "number"].includes(typeof left) || !["string", "number"].includes(typeof right)) {
        this.fail("'..' needs strings or numbers");
      }
      return `${left as string | number}${right as string | number}`;
    }
    return left;
  }

  private parseAdditive(): LuaValue {
    let value = this.parseMultiplicative();
    while (this.isSymbol("+") || this.isSymbol("-")) {
      const operator = this.next();
      const right = this.parseMultiplicative();
      value = this.arithmetic(operator, value, right);
    }
    return value;
  }

  private parseMultiplicative(): LuaValue {
    let value = this.parseUnary();
    while (this.isSymbol("*") || this.isSymbol("/") || this.isSymbol("%")) {
      const operator = this.next();
      const right = this.parseUnary();
      value = this.arithmetic(operator, value, right);
    }
    return value;
  }

  private parseUnary(): LuaValue {
    if (this.isSymbol("-")) {
      const operator = this.next();
      const operand = this.parseUnary();
      if (typeof operand !== "number") this.fail("Unary '-' needs a number", operator);
      return -operand;
    }
    return this.parsePower();
  }

  private parsePower(): LuaValue {
    const base = this.parsePrimary();
    if (this.isSymbol("^")) {
      const operator = this.next();
      const exponent = this.parseUnary();
      return this.arithmetic(operator, base, exponent);
    }
    return base;
  }

  private arithmetic(operator: Token, left: LuaValue, right: LuaValue): number {
    if (typeof left !== "number" || typeof right !== "number") {
      this.fail("Arithmetic needs numbers", operator);
    }
    switch (operator.kind === "symbol" ? operator.value : "") {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "%":
        return left - Math.floor(left / right) * right;
      case "^":
        return left ** right;
      default:
        return this.fail("Unknown operator", operator);
    }
  }

  private parsePrimary(): LuaValue {
    const token = this.peek();
    switch (token.kind) {
      case "string":
      case "number":
        this.next();
        return token.value;
      case "name":
        this.next();
        if (token.value === "true") return true;
        if (token.value === "false") return false;
        if (token.value === "nil") return null;
        return this.fail(`Unsupported identifier '${token.value}'`, token);
      case "symbol":
        if (token.value === "{") return this.parseTable();
        if (token.value === "(") {
          this.next();
          const value = this.parseExpression();
          this.expectSymbol(")");
          return value;
        }
        return this.fail(`Unexpected '${token.value}'`, token);
      case "eof":
        return this.fail("Unexpected end of input", token);
    }
  }

  private parseTable(): LuaValue {
    this.expectSymbol("{");
    const positional: LuaValue[] = [];
    const keyed = new Map<string | number, LuaValue>();
    while (!this.isSymbol("}")) {
      const token = this.peek();
      if (this.isSymbol("[")) {
        this.next();
        const key = this.parseExpression();
        if (typeof key !== "string" && typeof key !== "number") this.fail("Table keys must be strings or numbers", token);
        this.expectSymbol("]");
        this.expectSymbol("=");
        keyed.set(key, this.parseExpression());
      } else if (token.kind === "name" && this.isAssignmentAhead()) {
        this.next();
        this.next();
        keyed.set(token.value, this.parseExpression());
      } else {
        positional.push(this.parseExpression());
      }
      if (this.isSymbol(",") || this.isSymbol(";")) this.next();
      else if (!this.isSymbol("}")) this.fail("Expected ',' or '}'");
    }
    this.next();
    return toJsValue(positional, keyed);
  }
}

/**
 * Converts a Lua table to JSON-friendly form: a sequence (keys exactly 1..n) becomes
 * an array, anything else an object with string keys. As in Lua, positional items are
 * assigned after keyed fields, so `{[1] = "a", "b"}` holds only "b".
 */
function toJsValue(positional: LuaValue[], keyed: Map<string | number, LuaValue>): LuaValue {
  const entries = new Map(keyed);
  positional.forEach((value, index) => entries.set(index + 1, value));
  const keys = [...entries.keys()];
  if (keys.every((key): key is number => typeof key === "number")) {
    const sorted = keys.slice().sort((a, b) => a - b);
    if (sorted.every((key, index) => key === index + 1)) return sorted.map((key) => entries.get(key) as LuaValue);
  }
  const table: LuaTable = {};
  for (const [key, value] of entries) table[String(key)] = value;
  return table;
}

export function parseLuaModule(source: string): LuaValue {
  return new Parser(source, tokenize(source)).parseModule();
}
