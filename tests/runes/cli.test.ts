import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";
import type { RuneCatalog } from "../../runes/catalog";
import { REPO_ROOT } from "../../pipeline/config";
import * as catalogSource from "../../pipeline/runes/catalog";
import { main } from "../../pipeline/runes/page";

const directory = mkdtempSync(path.join(os.tmpdir(), "counter-rune-page-"));
afterAll(() => rmSync(directory, { recursive: true, force: true }));

function run(page: unknown) {
  const file = path.join(directory, "page.json");
  writeFileSync(file, JSON.stringify(page));
  return spawnSync(process.execPath, ["--import", path.join(REPO_ROOT, "node_modules/tsx/dist/loader.mjs"),
    path.join(REPO_ROOT, "pipeline/runes/page.ts"), "--dataset", "16.21", "--file", file],
  { cwd: REPO_ROOT, encoding: "utf8", timeout: 20_000 });
}

const valid = {
  primaryPathId: 8000,
  secondaryPathId: 8400,
  primary: [8010, 9111, 9104, 8299],
  secondary: [8444, 8453],
  shards: [5005, 5001, 5001],
};

describe("rune page command", () => {
  it("reads the pinned sources and accepts a real page without claiming combat effects", () => {
    const result = run(valid);
    expect(result.stderr).toBe("");
    expect(result.status).toBe(0);
    expect(JSON.parse(result.stdout)).toEqual({ dataset: "16.21", scope: "structural-only", effectsApplied: false,
      valid: true, page: valid, issues: [] });
  });

  it("fails an illegal secondary-row pairing with actionable diagnostics", () => {
    const result = run({ ...valid, secondary: [8429, 8444] });
    expect(result.status).toBe(1);
    const output = JSON.parse(result.stdout);
    expect(output.valid).toBe(false);
    expect(output.effectsApplied).toBe(false);
    expect(output.issues.join(" ")).toMatch(/different rows/i);
  });

  it("rejects untrusted JSON shapes rather than inventing defaults", () => {
    const result = run(null);
    expect(result.status).toBe(1);
    expect(JSON.parse(result.stdout).valid).toBe(false);
  });

  it("rejects a valid source bundle copied under a different dataset directory", async () => {
    const catalog = JSON.parse(readFileSync(path.join(REPO_ROOT, "data/16.21/rune-catalog.json"), "utf8")) as RuneCatalog;
    const load = vi.spyOn(catalogSource, "loadRuneCatalog").mockResolvedValue({ ...catalog, dataset: "16.20" });
    try {
      await expect(main(["--dataset", "16.21", "--file", "not-read.json"]))
        .rejects.toThrow(/source dataset 16\.20 differs from 16\.21/);
    } finally {
      load.mockRestore();
    }
  });
});
