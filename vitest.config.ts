import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    fsModuleCache: true,
    testTimeout: 30_000,
    include: ["tests/**/*.test.ts"],
  },
});
