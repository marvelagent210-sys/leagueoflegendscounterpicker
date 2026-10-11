import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Relative asset URLs work both on GitHub Pages (under the repository's path) and locally;
// pages are addressed by the URL's hash, so the app is always served from index.html.
export default defineConfig({
  base: "./",
  plugins: [react()],
  worker: { format: "es" },
  build: { outDir: "dist", emptyOutDir: true, target: "es2022" },
});
