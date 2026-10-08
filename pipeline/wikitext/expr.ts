/**
 * Evaluator for MediaWiki's {{#expr:}} language (ParserFunctions' ExprParser): numbers,
 * + - * / div mod fmod ^, the binary operators e (x e y = x * 10^y) and round,
 * comparisons, and/or/not, unary functions (abs, floor, ceil, trunc, ln, exp, sqrt,
 * trigonometry) and the constants e and pi. Throws ExprError on invalid input.
 */

export class ExprError extends Error {}

type Token = { kind: "number"; value: number } | { kind: "op"; value: string };

const WORD_OPERATORS = [
  "round",
  "div",
  "mod",
  "fmod",
  "and",
  "or",
  "not",
  "abs",
  "floor",
  "ceil",
  "trunc",
  "ln",
  "exp",
  "sqrt",
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "pi",
  "e",
];
const SYMBOL_OPERATORS = ["<=", ">=", "!=", "<>", "+", "-", "*", "/", "^", "(", ")", "=", "<", ">", "−", "×", "÷"];
const SYMBOL_ALIASES: Record<string, string> = { "−": "-", "×": "*", "÷": "/", "<>": "!=" };

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const text = source.toLowerCase();
  while (i < text.length) {
    const ch = text[i] as string;
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    const number = /^(?:\d+\.?\d*|\.\d+)/.exec(text.slice(i));
    if (number) {
      tokens.push({ kind: "number", value: Number(number[0]) });
      i += number[0].length;
      continue;
    }
    const word = /^[a-z]+/.exec(text.slice(i))?.[0];
    if (word) {
      if (!WORD_OPERATORS.includes(word)) throw new ExprError(`Unrecognized word "${word}"`);
      tokens.push({ kind: "op", value: word });
      i += word.length;
      continue;
    }
    const symbol = SYMBOL_OPERATORS.find((s) => text.startsWith(s, i));
    if (!symbol) throw new ExprError(`Unrecognized character "${ch}"`);
    tokens.push({ kind: "op", value: SYMBOL_ALIASES[symbol] ?? symbol });
    i += symbol.length;
  }
  return tokens;
}

const BINARY_PRECEDENCE: Record<string, number> = {
  or: 2,
  and: 3,
  "=": 4,
  "<": 4,
  ">": 4,
  "<=": 4,
  ">=": 4,
  "!=": 4,
  round: 5,
  "+": 6,
  "-": 6,
  "*": 7,
  "/": 7,
  div: 7,
  mod: 7,
  fmod: 7,
  "^": 8,
  e: 10,
};
const UNARY_FUNCTIONS: Record<string, (x: number) => number> = {
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  trunc: Math.trunc,
  ln: (x) => {
    if (x <= 0) throw new ExprError("Invalid argument for ln");
    return Math.log(x);
  },
  exp: Math.exp,
  sqrt: (x) => {
    if (x < 0) throw new ExprError("Invalid argument for sqrt");
    return Math.sqrt(x);
  },
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
};
const UNARY_PRECEDENCE = 9;

/** PHP's round(): half away from zero. */
function roundTo(value: number, digits: number): number {
  const factor = 10 ** Math.trunc(digits);
  const scaled = Math.abs(value) * factor;
  const rounded = Math.floor(scaled + 0.5 + 1e-9 * Math.max(1, scaled)) / factor;
  return Math.sign(value) * rounded;
}

function applyBinary(operator: string, a: number, b: number): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
    case "div":
      if (b === 0) throw new ExprError("Division by zero");
      return a / b;
    case "mod": {
      const divisor = Math.trunc(b);
      if (divisor === 0) throw new ExprError("Division by zero");
      return Math.trunc(a) % divisor;
    }
    case "fmod":
      if (b === 0) throw new ExprError("Division by zero");
      return a % b;
    case "^":
      return a ** b;
    case "e":
      return a * 10 ** b;
    case "round":
      return roundTo(a, b);
    case "=":
      return a === b ? 1 : 0;
    case "!=":
      return a !== b ? 1 : 0;
    case "<":
      return a < b ? 1 : 0;
    case ">":
      return a > b ? 1 : 0;
    case "<=":
      return a <= b ? 1 : 0;
    case ">=":
      return a >= b ? 1 : 0;
    case "and":
      return a !== 0 && b !== 0 ? 1 : 0;
    case "or":
      return a !== 0 || b !== 0 ? 1 : 0;
    default:
      throw new ExprError(`Unknown operator ${operator}`);
  }
}

class ExprParser {
  private position = 0;

  constructor(private readonly tokens: Token[]) {}

  parse(): number {
    if (this.tokens.length === 0) throw new ExprError("Empty expression");
    const value = this.parseExpression(0);
    if (this.position < this.tokens.length) throw new ExprError("Unexpected token");
    return value;
  }

  private peekOp(): string | undefined {
    const token = this.tokens[this.position];
    return token?.kind === "op" ? token.value : undefined;
  }

  private parseExpression(minPrecedence: number): number {
    let left = this.parseUnary();
    for (;;) {
      const operator = this.peekOp();
      const precedence = operator === undefined ? undefined : BINARY_PRECEDENCE[operator];
      if (operator === undefined || precedence === undefined || precedence < minPrecedence) return left;
      this.position++;
      // MediaWiki evaluates every binary operator left to right, ^ included.
      const right = this.parseExpression(precedence + 1);
      left = applyBinary(operator, left, right);
    }
  }

  private parseUnary(): number {
    const token = this.tokens[this.position];
    if (!token) throw new ExprError("Unexpected end of expression");
    if (token.kind === "number") {
      this.position++;
      return token.value;
    }
    this.position++;
    switch (token.value) {
      case "(": {
        const value = this.parseExpression(0);
        if (this.peekOp() !== ")") throw new ExprError("Missing closing parenthesis");
        this.position++;
        return value;
      }
      case "-":
        return -this.parseExpression(UNARY_PRECEDENCE);
      case "+":
        return this.parseExpression(UNARY_PRECEDENCE);
      case "not":
        return this.parseExpression(UNARY_PRECEDENCE) === 0 ? 1 : 0;
      case "pi":
        return Math.PI;
      case "e":
        return Math.E;
      default: {
        const fn = UNARY_FUNCTIONS[token.value];
        if (!fn) throw new ExprError(`Unexpected operator ${token.value}`);
        return fn(this.parseExpression(UNARY_PRECEDENCE));
      }
    }
  }
}

export function evaluateExpr(source: string): number {
  const value = new ExprParser(tokenize(source)).parse();
  if (!Number.isFinite(value)) throw new ExprError("Result is not a finite number");
  return value;
}

/** The value of `source`, or undefined when it isn't a valid expression. */
export function tryExpr(source: string): number | undefined {
  try {
    return evaluateExpr(source);
  } catch (error) {
    if (error instanceof ExprError) return undefined;
    throw error;
  }
}

/** MediaWiki-style number formatting: up to 10 significant decimals, no trailing zeros. */
export function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toPrecision(12)));
}
