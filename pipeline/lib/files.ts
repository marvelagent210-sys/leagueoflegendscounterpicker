import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeText(file: string, text: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, text, "utf8");
}

/** Writes pretty-printed JSON with a trailing newline, so committed files diff cleanly. */
export async function writeJson(file: string, value: unknown): Promise<void> {
  await writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

export async function readText(file: string): Promise<string> {
  return readFile(file, "utf8");
}

export async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readText(file)) as T;
}
