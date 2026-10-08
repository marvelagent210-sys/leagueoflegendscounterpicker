import { WIKI_API } from "../config";
import { fetchJson, sleep } from "../lib/http";

// MediaWiki API etiquette: one request at a time, at most one per second,
// and back off when the servers report replication lag.
const MIN_INTERVAL_MS = 1000;
const MAXLAG_RETRIES = 6;
const MAX_TITLES_PER_REQUEST = 50;

let lastRequestAt = 0;

interface ApiResponse {
  error?: { code: string; info: string };
  continue?: Record<string, string>;
}

interface AllPagesResponse extends ApiResponse {
  query: { allpages: Array<{ title: string }> };
}

interface RevisionsResponse extends ApiResponse {
  query: {
    pages: Array<{
      title: string;
      pageid?: number;
      missing?: boolean;
      invalid?: boolean;
      revisions?: Array<{ revid: number; timestamp: string; slots: { main: { content: string } } }>;
    }>;
  };
}

interface ParseResponse extends ApiResponse {
  parse: { title: string; revid: number; text: string };
}

export interface WikiPage {
  title: string;
  pageid: number;
  revid: number;
  timestamp: string;
  content: string;
}

async function call<T extends ApiResponse>(params: Record<string, string>): Promise<T> {
  const query = new URLSearchParams({ format: "json", formatversion: "2", maxlag: "5", ...params });
  for (let attempt = 0; attempt < MAXLAG_RETRIES; attempt++) {
    const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();
    const response = await fetchJson<T>(`${WIKI_API}?${query}`);
    if (response.error?.code === "maxlag") {
      await sleep(5000);
      continue;
    }
    if (response.error) {
      throw new Error(`Wiki API error ${response.error.code}: ${response.error.info}`);
    }
    return response;
  }
  throw new Error(`Wiki API still lagged after ${MAXLAG_RETRIES} attempts`);
}

/** Lists every page title in a namespace that starts with `prefix`. */
export async function listPages(namespace: number, prefix: string): Promise<string[]> {
  const titles: string[] = [];
  let continuation: Record<string, string> = {};
  for (;;) {
    const response = await call<AllPagesResponse>({
      action: "query",
      list: "allpages",
      apnamespace: String(namespace),
      apprefix: prefix,
      aplimit: "500",
      ...continuation,
    });
    titles.push(...response.query.allpages.map((page) => page.title));
    if (!response.continue) return titles;
    continuation = response.continue;
  }
}

/** Fetches the current wikitext and revision of each title, 50 titles per request. */
export async function getPages(
  titles: readonly string[],
  onBatch?: (done: number, total: number) => void,
): Promise<{ pages: WikiPage[]; missing: string[] }> {
  // Keyed by title: a continuation response can list pages from earlier responses again.
  const pages = new Map<string, WikiPage>();
  const missing = new Set<string>();
  for (let start = 0; start < titles.length; start += MAX_TITLES_PER_REQUEST) {
    const batch = titles.slice(start, start + MAX_TITLES_PER_REQUEST);
    let continuation: Record<string, string> = {};
    for (;;) {
      const response = await call<RevisionsResponse>({
        action: "query",
        prop: "revisions",
        rvprop: "content|ids|timestamp",
        rvslots: "main",
        titles: batch.join("|"),
        ...continuation,
      });
      for (const page of response.query.pages) {
        const revision = page.revisions?.[0];
        if (page.missing || page.invalid || page.pageid === undefined) {
          missing.add(page.title);
        } else if (revision) {
          pages.set(page.title, {
            title: page.title,
            pageid: page.pageid,
            revid: revision.revid,
            timestamp: revision.timestamp,
            content: revision.slots.main.content,
          });
        }
        // A page without a revision here is delivered in another response of the batch.
      }
      if (!response.continue) break;
      continuation = response.continue;
    }
    onBatch?.(Math.min(start + MAX_TITLES_PER_REQUEST, titles.length), titles.length);
  }
  return { pages: [...pages.values()], missing: [...missing] };
}

/** Returns the rendered HTML of a page, for content that only exists after Lua modules run. */
export async function parsePage(title: string): Promise<{ revid: number; html: string }> {
  const response = await call<ParseResponse>({
    action: "parse",
    page: title,
    prop: "text|revid",
    disablelimitreport: "1",
  });
  return { revid: response.parse.revid, html: response.parse.text };
}
