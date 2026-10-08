import { EnvHttpProxyAgent, fetch } from "undici";
import { USER_AGENT } from "../config";

// Honors HTTPS_PROXY / NO_PROXY when set and behaves like a plain agent otherwise.
const dispatcher = new EnvHttpProxyAgent();

export class HttpError extends Error {
  constructor(
    readonly url: string,
    readonly status: number,
  ) {
    super(`HTTP ${status} for ${url}`);
  }

  get retryable(): boolean {
    return this.status === 429 || this.status >= 500;
  }
}

export interface FetchOptions {
  /** Extra attempts after the first one. Delays are 2s, 4s, 8s, 16s. */
  retries?: number;
  timeoutMs?: number;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchText(url: string, options: FetchOptions = {}): Promise<string> {
  const { retries = 4, timeoutMs = 120_000 } = options;
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(1000 * 2 ** attempt);
    try {
      const response = await fetch(url, {
        dispatcher,
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (response.ok) return await response.text();
      const error = new HttpError(url, response.status);
      if (!error.retryable) throw error;
      lastError = error;
    } catch (error) {
      if (error instanceof HttpError && !error.retryable) throw error;
      lastError = error;
    }
  }
  throw lastError;
}

export async function fetchJson<T>(url: string, options?: FetchOptions): Promise<T> {
  return JSON.parse(await fetchText(url, options)) as T;
}

/** Runs `task` over `items` with at most `limit` tasks in flight, preserving order. */
export async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  task: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  async function worker(): Promise<void> {
    while (next < items.length) {
      const index = next++;
      results[index] = await task(items[index] as T, index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
