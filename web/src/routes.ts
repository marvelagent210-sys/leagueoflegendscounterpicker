/** The app's pages, addressed by the URL's hash so that a static host serves every page from index.html. */

export type Route =
  | { page: "picker"; enemy?: string }
  | { page: "matchup"; you: string; enemy: string }
  | { page: "kit"; champion: string }
  | { page: "settings" };

export function parseRoute(hash: string): Route {
  const parts = hash
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));
  const [page, a, b] = parts;
  if (page === "vs" && a) return { page: "picker", enemy: a };
  if (page === "matchup" && a && b) return { page: "matchup", you: a, enemy: b };
  if (page === "kit" && a) return { page: "kit", champion: a };
  if (page === "settings") return { page: "settings" };
  return { page: "picker" };
}

export function routeHash(route: Route): string {
  switch (route.page) {
    case "picker":
      return route.enemy ? `#/vs/${encodeURIComponent(route.enemy)}` : "#/";
    case "matchup":
      return `#/matchup/${encodeURIComponent(route.you)}/${encodeURIComponent(route.enemy)}`;
    case "kit":
      return `#/kit/${encodeURIComponent(route.champion)}`;
    case "settings":
      return "#/settings";
  }
}
