import { describe, expect, it } from "vitest";
import { evaluateExpr, tryExpr } from "../pipeline/wikitext/expr";
import { firstTemplate, parseWikitext, preprocess, type WikiNode } from "../pipeline/wikitext/parse";
import { abilityProgression, passiveProgression } from "../pipeline/wikitext/progression";

const close = (values: Array<number | string>, expected: number[]) => {
  expect(values).toHaveLength(expected.length);
  values.forEach((value, index) => expect(value as number).toBeCloseTo(expected[index] as number, 9));
};

describe("parseWikitext", () => {
  it("parses templates with positional and named arguments", () => {
    const [node] = parseWikitext("{{st|Physical Damage|{{ap|20 to 120}} {{as|(+ 105% AD)}}|key = %}}");
    expect(node?.type).toBe("template");
    if (node?.type !== "template") return;
    expect(node.name).toEqual([{ type: "text", value: "st" }]);
    expect(node.args.map((a) => a.name)).toEqual([undefined, undefined, "key"]);
    expect(node.args[2]?.value).toEqual([{ type: "text", value: "%" }]);
    const value = node.args[1]?.value as WikiNode[];
    expect(value.map((n) => n.type)).toEqual(["template", "text", "template"]);
  });

  it("parses the data page wrapper, whose name is a parameter", () => {
    const source = "{{{{{1<noinclude>|Ability data</noinclude>}}}|Steel Tempest|{{{2|}}}\n|champion = Yasuo\n|skill = Q\n}}";
    const outer = firstTemplate(parseWikitext(source));
    expect(outer?.name[0]?.type).toBe("param");
    expect(outer?.args.filter((a) => a.name).map((a) => [a.name, a.value])).toEqual([
      ["champion", [{ type: "text", value: "Yasuo" }]],
      ["skill", [{ type: "text", value: "Q" }]],
    ]);
  });

  it("keeps link pipes inside links and drops comments", () => {
    const [node] = parseWikitext("{{dv|[[Direction-targeted|Direction]]|[[Auto-targeted|Auto]]<!-- c -->}}");
    if (node?.type !== "template") throw new Error("expected template");
    expect(node.args).toHaveLength(2);
    expect(node.args[0]?.value[0]).toMatchObject({ type: "link", text: [{ type: "text", value: "Direction" }] });
    expect(preprocess("a<!-- x -->b<includeonly>c</includeonly>")).toBe("abc");
  });

  it("treats unbalanced braces as text", () => {
    expect(parseWikitext("a }} b {{ c")).toEqual([{ type: "text", value: "a }} b {{ c" }]);
  });
});

describe("evaluateExpr", () => {
  it("follows MediaWiki's operators and precedence", () => {
    expect(evaluateExpr("20 + (70-20)/17*(18-1)")).toBeCloseTo(70, 12);
    expect(evaluateExpr("2^3^2")).toBe(64);
    expect(evaluateExpr("-2^2")).toBe(4);
    expect(evaluateExpr("7 mod 3")).toBe(1);
    expect(evaluateExpr("2.5 round 0")).toBe(3);
    expect(evaluateExpr("-2.5 round 0")).toBe(-3);
    expect(evaluateExpr("1.005 round 2")).toBe(1.01);
    expect(evaluateExpr("2e3")).toBe(2000);
    expect(evaluateExpr("ceil(0.31/0.033)*0.033")).toBeCloseTo(0.33, 12);
    expect(evaluateExpr("3 > 2 and 1 = 1")).toBe(1);
    expect(evaluateExpr("abs -3 + 1")).toBe(4);
  });

  it("rejects text that isn't an expression", () => {
    expect(tryExpr("20 to 120")).toBeUndefined();
    expect(tryExpr("")).toBeUndefined();
    expect(tryExpr("1/0")).toBeUndefined();
    expect(tryExpr("5 +")).toBeUndefined();
  });
});

describe("abilityProgression ({{ap}})", () => {
  it("spreads 'a to b' over 5 ranks, or the given count", () => {
    close(abilityProgression(["20 to 120"]).values, [20, 45, 70, 95, 120]);
    close(abilityProgression(["9 to 5"]).values, [9, 8, 7, 6, 5]);
    close(abilityProgression(["3 to 8 6"]).values, [3, 4, 5, 6, 7, 8]);
    close(abilityProgression(["20 to 120"], { skill: "R" }).values, [20, 70, 120]);
  });

  it("evaluates expressions and explicit lists", () => {
    close(abilityProgression(["50*0.35 to 170*0.35"]).values, [17.5, 28, 38.5, 49, 59.5]);
    close(abilityProgression(["60", "85", "110"]).values, [60, 85, 110]);
    close(abilityProgression(["25*0.6"]).values, [15]);
  });

  it("keeps non-numeric items as text", () => {
    expect(abilityProgression(["N/A"]).values).toEqual(["N/A"]);
  });
});

describe("passiveProgression ({{pp}}, {{pplevel}})", () => {
  it("fills 'a to b' linearly across levels 1-18", () => {
    const pp = passiveProgression("40 to 100");
    expect(pp.byLevel).toBe(true);
    expect(pp.values).toHaveLength(18);
    expect(pp.values[0]).toBe(40);
    expect(pp.values[17]).toBeCloseTo(100, 12);
  });

  it("evaluates formulas for the given number of levels (Udyr's awakened attack speed)", () => {
    const pp = passiveProgression("20 + (70-20)/17*(x-1) for 20");
    expect(pp.values).toHaveLength(20);
    expect(pp.values[17]).toBeCloseTo(70, 12);
    expect(pp.values[19]).toBeCloseTo(75.882353, 5);
  });

  it("supports a custom top row (Darius's Decimate heal per target hit)", () => {
    const pp = passiveProgression("17 to 51 for 3", "1;2;3+", { type: "number of targets hit", key: "%" });
    close(pp.values, [17, 34, 51]);
    expect(pp.top).toEqual([1, 2, "3+"]);
    expect(pp.topLabel).toBe("number of targets hit");
    expect(pp.byLevel).toBe(false);
  });

  it("continues 'then' formulas from the previous value (Mini Gnar's bonus movement speed)", () => {
    const pp = passiveProgression("0+1*(x-1) for 15;then +2*x");
    expect(pp.values).toHaveLength(18);
    expect(pp.values[14]).toBe(14);
    expect(pp.values[15]).toBe(16);
    expect(pp.values[17]).toBe(20);
  });

  it("extrapolates past level 18 for {{pplevel}} (Mini Gnar's bonus range)", () => {
    const pp = passiveProgression("225 to 325", "", { tooltipSize: 41 });
    expect(pp.values).toHaveLength(41);
    expect(pp.values[17]).toBeCloseTo(325, 12);
    expect(pp.values[19]).toBeCloseTo(225 + (100 * 19) / 17, 9);
  });

  it("continues a 'for' segment from the previous value without repeating it", () => {
    // The second segment starts where the first ends, so it adds 13 new values.
    const pp = passiveProgression("10 to 20 for 6;20 to 50 for 13");
    expect(pp.values).toHaveLength(19);
    expect(pp.values[5]).toBe(20);
    expect(pp.values[6]).toBeCloseTo(20 + 30 / 13, 12);
    expect(pp.values[18]).toBeCloseTo(50, 12);
  });
});
