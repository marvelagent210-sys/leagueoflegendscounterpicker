/** The app: header and navigation, the page the URL's hash names, and the attribution footer. */
import { ErrorBox, Loading } from "./components/common";
import { loadAppData } from "./data";
import { SettingsContext, useAsync, useHashRoute, useSettings, useStoredSettings } from "./hooks";
import { KitPage } from "./pages/KitPage";
import { MatchupPage } from "./pages/MatchupPage";
import { PickerPage } from "./pages/PickerPage";
import { SettingsPage } from "./pages/SettingsPage";
import { type Route, routeHash } from "./routes";
import { DEFAULT_APP_SETTINGS, fightsChanged, weightsChanged } from "./settings";

export function App() {
  const settings = useStoredSettings();
  const route = useHashRoute();
  const data = useAsync(loadAppData, []);
  return (
    <SettingsContext.Provider value={settings}>
      <div className="page">
        <Masthead route={route} patch={data.value?.patch} />
        <CustomBanner route={route} />
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
          </p>
          <p>
            This fan project isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot
            Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
          </p>
        </footer>
      </div>
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

function CustomBanner({ route }: { route: Route }) {
  const { settings, setSettings } = useSettings();
  if (route.page === "settings" || (!fightsChanged(settings) && !weightsChanged(settings))) return null;
  return (
    <div className="custom-banner" role="status">
      <span className="tag custom">Your settings</span>
      <span>{fightsChanged(settings) ? "Duels run in your browser with your settings." : "Scores use your scenario weights."}</span>
      <a href={routeHash({ page: "settings" })}>Change</a>
      <button type="button" className="button" onClick={() => setSettings(DEFAULT_APP_SETTINGS)}>
        Reset
      </button>
    </div>
  );
}
