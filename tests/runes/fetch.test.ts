import { createHash } from "node:crypto";
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { REPO_ROOT } from "../../pipeline/config";
import { fetchText } from "../../pipeline/lib/http";
import { getPages } from "../../pipeline/sources/wiki";
import { fetchRuneCatalogSources, promoteRuneSources } from "../../pipeline/runes/fetch";

vi.mock("../../pipeline/lib/http", () => ({ fetchText: vi.fn() }));
vi.mock("../../pipeline/sources/wiki", () => ({ getPages: vi.fn() }));

const directory = path.join(REPO_ROOT, "data/16.21/rune-sources");
const input = (name: string) => readFileSync(path.join(directory, name), "utf8");
const pages = JSON.parse(input("wiki-pages.json"));
function hashes() {
  return Object.fromEntries(readdirSync(directory).sort().map((name) =>
    [name, createHash("sha256").update(readFileSync(path.join(directory, name))).digest("hex")]));
}

beforeEach(() => {
  vi.mocked(fetchText).mockReset().mockImplementation(async (url) => {
    const name = new URL(url).pathname.split("/").at(-1)!;
    return input(name);
  });
  vi.mocked(getPages).mockReset().mockResolvedValue({ pages: structuredClone(pages), missing: [] });
});

describe("whole-bundle rune source promotion", () => {
  it("restores all previous source bytes when the new directory cannot be promoted", async () => {
    const temp = mkdtempSync(path.join(os.tmpdir(), "rune-promotion-"));
    const destination = path.join(temp, "sources");
    mkdirSync(destination);
    writeFileSync(path.join(destination, "manifest.json"), "old manifest\n");
    writeFileSync(path.join(destination, "wiki-pages.json"), "old wiki revisions\n");
    try {
      await expect(promoteRuneSources(path.join(temp, "missing-staging"), destination)).rejects.toThrow();
      expect(readFileSync(path.join(destination, "manifest.json"), "utf8")).toBe("old manifest\n");
      expect(readFileSync(path.join(destination, "wiki-pages.json"), "utf8")).toBe("old wiki revisions\n");
      expect(readdirSync(temp)).toEqual(["sources"]);
    } finally { rmSync(temp, { recursive: true, force: true }); }
  });

  it("publishes the complete new bundle together and removes the old backup", async () => {
    const temp = mkdtempSync(path.join(os.tmpdir(), "rune-promotion-"));
    const destination = path.join(temp, "sources"), staging = path.join(temp, "staging");
    mkdirSync(destination); mkdirSync(staging);
    writeFileSync(path.join(destination, "old.json"), "old\n");
    writeFileSync(path.join(staging, "manifest.json"), "new manifest\n");
    writeFileSync(path.join(staging, "wiki-pages.json"), "new wiki revisions\n");
    try {
      await promoteRuneSources(staging, destination);
      expect(readdirSync(destination).sort()).toEqual(["manifest.json", "wiki-pages.json"]);
      expect(readFileSync(path.join(destination, "manifest.json"), "utf8")).toBe("new manifest\n");
      expect(readFileSync(path.join(destination, "wiki-pages.json"), "utf8")).toBe("new wiki revisions\n");
      expect(readdirSync(temp)).toEqual(["sources"]);
    } finally { rmSync(temp, { recursive: true, force: true }); }
  });
});

describe("rune source fetch failures", () => {
  it("preserves every previous input if one required wiki page is missing", async () => {
    const before = hashes();
    vi.mocked(getPages).mockResolvedValue({ pages: pages.filter((page: { title: string }) => page.title !== "Rune"), missing: ["Rune"] });
    await expect(fetchRuneCatalogSources("16.21")).rejects.toThrow(/Incomplete rune wiki sources: Rune/);
    expect(hashes()).toEqual(before);
    expect(vi.mocked(getPages).mock.calls[0]![0]).toContain("Template:Rune data Jack of All Trades");
    expect(vi.mocked(getPages).mock.calls[0]![0]).toHaveLength(63);
  });

  it("preserves previous inputs if the versioned client and Data Dragon layouts disagree", async () => {
    const before = hashes();
    const client = JSON.parse(input("perkstyles.json"));
    client.styles[0].slots[0].perks.reverse();
    vi.mocked(fetchText).mockImplementation(async (url) =>
      url.endsWith("perkstyles.json") ? JSON.stringify(client) : input(new URL(url).pathname.split("/").at(-1)!));
    await expect(fetchRuneCatalogSources("16.21")).rejects.toThrow(/differs between official sources/);
    expect(hashes()).toEqual(before);
  });

  it("rejects a dataset path before making a request or touching inputs", async () => {
    const before = hashes();
    await expect(fetchRuneCatalogSources("../16.21")).rejects.toThrow(/Expected a dataset/);
    expect(fetchText).not.toHaveBeenCalled();
    expect(getPages).not.toHaveBeenCalled();
    expect(hashes()).toEqual(before);
  });
});
