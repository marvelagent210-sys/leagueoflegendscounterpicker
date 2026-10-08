import { describe, expect, it } from "vitest";
import { hasRankChoice, pointsToMax, rankSplits, skillPointsAt } from "../engine/skillPoints";
import { champion, loadDataset } from "./helpers";

const { data } = await loadDataset();
const udyr = champion(data, "Udyr");
const darius = champion(data, "Darius");

describe("skill points", () => {
  it("max every champion but Udyr with exactly 18 points", () => {
    const off = data.champions.filter((c) => c.id !== "Udyr" && pointsToMax(c) !== 18).map((c) => c.id);
    expect(off).toEqual([]);
  });

  it("give Udyr 24 ranks to fill", () => {
    expect(udyr.maxRanks).toEqual({ Q: 6, W: 6, E: 6, R: 6 });
    expect(pointsToMax(udyr)).toBe(24);
  });

  it("keep coming for Udyr at levels 19 and 20", () => {
    expect(skillPointsAt(udyr, 18)).toBe(18);
    expect(skillPointsAt(udyr, 20)).toBe(20);
  });

  it("add Triple Tonic's Elixir of Skill from level 9", () => {
    expect(skillPointsAt(udyr, 8, { tripleTonic: true })).toBe(8);
    expect(skillPointsAt(udyr, 9, { tripleTonic: true })).toBe(10);
    expect(skillPointsAt(udyr, 20, { tripleTonic: true })).toBe(21);
  });

  it("stop at 18 for everyone else, with or without the elixir", () => {
    expect(skillPointsAt(darius, 20)).toBe(18);
    expect(skillPointsAt(darius, 17, { tripleTonic: true })).toBe(18);
    expect(skillPointsAt(darius, 20, { tripleTonic: true })).toBe(18);
  });

  it("leave Udyr a rank choice at level 20, and no one else", () => {
    expect(hasRankChoice(udyr, 20, { tripleTonic: true })).toBe(true);
    expect(data.champions.filter((c) => hasRankChoice(c, 18)).map((c) => c.id)).toEqual(["Udyr"]);
  });
});

describe("rankSplits", () => {
  it("lists every way Udyr can spend his points", () => {
    const splits21 = rankSplits(udyr, 21);
    expect(splits21).toHaveLength(20);
    for (const split of splits21) {
      expect(split.Q + split.W + split.E + split.R).toBe(21);
      expect(Math.max(split.Q, split.W, split.E, split.R)).toBeLessThanOrEqual(6);
    }
    expect(rankSplits(udyr, 20)).toHaveLength(35);
    // Each ability at rank 4 or more: the 3 empty ranks spread with at most 2 per ability.
    expect(rankSplits(udyr, 21, 4)).toHaveLength(16);
  });

  it("counts free ranks for champions who start with an ability learned", () => {
    expect(rankSplits(champion(data, "Jayce"), 18)).toEqual([{ Q: 6, W: 6, E: 6, R: 1 }]);
    expect(rankSplits(champion(data, "Elise"), 18)).toEqual([{ Q: 5, W: 5, E: 5, R: 4 }]);
  });
});
