/** The app: header and navigation, the page the URL's hash names, and the attribution footer. */
import { wikiUrl } from "../../engine/abilityText";
import type { PrecomputedBuilds } from "../../engine/sim/precomputed";
import { type ResultsMode, buildsApply, shownResults } from "./builds";
import { ErrorBox, Loading } from "./components/common";
import { loadAppData } from "./data";
import { ResultsContext, SettingsContext, useAsync, useHashRoute, useResults, useSettings, useStoredResults, useStoredSettings } from "./hooks";
import { KitPage } from "./pages/KitPage";
import { MatchupPage } from "./pages/MatchupPage";
import { PickerPage } from "./pages/PickerPage";
import { SettingsPage } from "./pages/SettingsPage";
import { type Route, routeHash } from "./routes";
import { type AppSettings, DEFAULT_APP_SETTINGS, fightsChanged, weightsChanged } from "./settings";

export function App() {
  const settings = useStoredSettings();
  const results = useStoredResults();
  const route = useHashRoute();
  const data = useAsync(loadAppData, []);
  const items = data.value?.itemSources;
  return (
    <SettingsContext.Provider value={settings}>
      <ResultsContext.Provider value={results}>
        <div className="page">
          <Masthead route={route} patch={data.value?.patch} />
          <CustomBanner route={route} builds={data.value?.builds} />
          <main className="section">
            {data.error ? <ErrorBox error={data.error} /> : null}
            {!data.value && !data.error ? <Loading>Loading the champions…</Loading> : null}
            {data.value ? (
              route.page === "matchup" ? (
                <MatchupPage key={`${route.you}|${route.enemy}`} data={data.value} youId={route.you} enemyId={route.enemy} />
              ) : route.page === "kit" ? (
                <KitPage key={route.champion} data={data.value} championId={route.champion} />
              ) : route.page === "settings" ? (
                <SettingsPage data={data.value} />
              ) : (
                <PickerPage data={data.value} {...(route.enemy ? { enemyId: route.enemy } : {})} />
              )
            ) : null}
          </main>
          <footer className="foot">
            <p>
              Rankings come only from what each champion's kit does: no win rates. Ability data from the League of Legends Wiki (CC BY-SA 3.0), read at the revisions
              linked on each kit page.
              {items ? (
                <>
                  {" "}
                  Item data from the wiki's{" "}
                  <a href={wikiUrl(items.title, items.revid)} target="_blank" rel="noreferrer">
                    {items.title}
                  </a>{" "}
                  (revision {items.revid}) and Data Dragon {items.ddragon}.
                  {items.spellData ? (
                    <>
                      {" "}
                      Summoner spell data from the wiki's{" "}
                      <a href={wikiUrl(items.spellData.title, items.spellData.revid)} target="_blank" rel="noreferrer">
                        {items.spellData.title}
                      </a>{" "}
                      (revision {items.spellData.revid}).
                    </>
                  ) : null}
                  {items.cdragon ? <> Rune data from the wiki's rune data templates, checked against Community Dragon {items.cdragon}.</> : null}
                </>
              ) : null}
            </p>
            <p>
              This fan project isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot
              Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
            </p>
          </footer>
        </div>
      </ResultsContext.Provider>
    </SettingsContext.Provider>
  );
}

function Masthead({ route, patch }: { route: Route; patch: string | undefined }) {
  const current = (page: Route["page"]) => (route.page === page ? "page" : undefined);
  return (
    <header className="masthead">
      <a className="brand" href={routeHash({ page: "picker" })}>
        <span className="eyebrow">Top lane · level 20{patch ? ` · patch ${patch}` : ""}</span>
        <h1>Kit Counter Picker</h1>
      </a>
      <nav className="nav" aria-label="Pages">
        <a href={routeHash({ page: "picker" })} aria-current={current("picker")}>
          Picker
        </a>
        <a href={routeHash({ page: "settings" })} aria-current={current("settings")}>
          Settings
        </a>
      </nav>
    </header>
  );
}

/** What the visitor's settings change, for the results shown. */
function customText(settings: AppSettings, builds: PrecomputedBuilds | undefined, wanted: ResultsMode): string | undefined {
  if (shownResults(builds, wanted, settings) === "builds") {
    if (weightsChanged(settings)) return "Scores use your scenario weights; the builds were searched with the default ones.";
    return fightsChanged(settings) ? "Your gold is for plain stats: the item builds buy their own items." : undefined;
  }
  if (fightsChanged(settings)) return builds && wanted === "builds" && !buildsApply(settings) ? "Duels run in your browser with your settings, on plain stats: the item builds hold for the default fight settings." : "Duels run in your browser with your settings.";
  return weightsChanged(settings) ? "Scores use your scenario weights." : undefined;
}

function CustomBanner({ route, builds }: { route: Route; builds: PrecomputedBuilds | undefined }) {
  const { settings, setSettings } = useSettings();
  const { wanted } = useResults();
  const text = customText(settings, builds, wanted);
  if (route.page === "settings" || !text) return null;
  return (
    <div className="custom-banner" role="status">
      <span className="tag custom">Your settings</span>
      <span>{text}</span>
      <a href={routeHash({ page: "settings" })}>Change</a>
      <button type="button" className="button" onClick={() => setSettings(DEFAULT_APP_SETTINGS)}>
        Reset
      </button>
    </div>
  );
}
