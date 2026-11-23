/** The build matrices' file names (pipeline/sim/builds.ts), apart from the code fights run so that naming them changes no pairing's inputs. */
/**
 * Each build format's matrix and report (npm run build:builds -- --format ...): six items in
 * simulated-builds.json and reports/builds.md, five items and boots beside them.
 */
export const BUILDS_FILES = {
  sixItems: { matrix: "simulated-builds.json", report: "builds.md" },
  fiveItemsWithBoots: { matrix: "simulated-builds-boots.json", report: "builds-boots.md" },
} as const;
export type MatrixBuildFormat = keyof typeof BUILDS_FILES;
