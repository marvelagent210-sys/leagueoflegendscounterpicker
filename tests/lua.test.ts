import { describe, expect, it } from "vitest";
import { LuaParseError, parseLuaModule } from "../pipeline/parse/lua";

const parse = (body: string) => parseLuaModule(`return ${body}`);

describe("parseLuaModule", () => {
  it("parses keyed tables into objects", () => {
    expect(parse('{ a = 1, ["b c"] = "x", [3] = true, d = nil }')).toEqual({ a: 1, "b c": "x", "3": true, d: null });
  });

  it("turns sequences into arrays", () => {
    expect(parse('{ "a", "b"; "c", }')).toEqual(["a", "b", "c"]);
    expect(parse('{ [2] = "y", [1] = "x" }')).toEqual(["x", "y"]);
    expect(parse('{ [2] = "y" }')).toEqual({ "2": "y" });
    expect(parse("{}")).toEqual([]);
  });

  it("assigns positional items after keyed fields, as Lua does", () => {
    // The wiki's LeBlanc entry has this shape; Lua keeps only the positional item.
    expect(parse('{ [1] = "Mirror Image", "Mirror Image 2" }')).toEqual(["Mirror Image 2"]);
    expect(parse('{ [1] = "a", [2] = "b", "c" }')).toEqual(["c", "b"]);
  });

  it("evaluates constant arithmetic with Lua precedence", () => {
    expect(parse("84+1000/17")).toBeCloseTo(142.8235294, 6);
    expect(parse("(1 + 2) * 3")).toBe(9);
    expect(parse("-2^2")).toBe(-4);
    expect(parse("2^-1")).toBe(0.5);
    expect(parse("7 % 3")).toBe(1);
    expect(parse("-7 % 3")).toBe(2);
    expect(parse("{ x = -0.1 }")).toEqual({ x: -0.1 });
  });

  it("reads number formats", () => {
    expect(parse("{ 0x10, 1e3, .5, 2.5E-1 }")).toEqual([16, 1000, 0.5, 0.25]);
  });

  it("reads strings with escapes and long brackets", () => {
    expect(parse('"a\\nb\\t\\"q\\" \\65\\x42\\u{43}"')).toBe('a\nb\t"q" ABC');
    expect(parse("'single'")).toBe("single");
    expect(parse("[[\nfirst newline dropped]]")).toBe("first newline dropped");
    expect(parse("[==[contains ]] inside]==]")).toBe("contains ]] inside");
    expect(parse('"a" .. "b" .. 1')).toBe("ab1");
  });

  it("skips comments", () => {
    const source = "-- <pre>\nreturn { --[[ block\n comment ]] a = 1, --[==[ x ]==] b = 2 -- trailing\n}";
    expect(parseLuaModule(source)).toEqual({ a: 1, b: 2 });
  });

  it("rejects code and malformed input with a position", () => {
    expect(() => parse("{ x = foo }")).toThrow(LuaParseError);
    expect(() => parse("{ x = foo }")).toThrow(/Unsupported identifier 'foo' at line 1, column 14/);
    expect(() => parse('{ "a" "b" }')).toThrow(/Expected ',' or '}'/);
    expect(() => parse('"unterminated')).toThrow(/Unterminated string/);
    expect(() => parseLuaModule("return 1 2")).toThrow(/Unexpected content/);
    expect(() => parseLuaModule("{ }")).toThrow(/Expected 'return'/);
  });
});
