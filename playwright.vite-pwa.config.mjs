import { defineConfig } from "@playwright/test";

const BASE_URL = "http://127.0.0.1:4274";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "vite-pwa.spec.mjs",
  outputDir: "test-results/vite-pwa",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [["line"]],
  use: {
    baseURL: BASE_URL,
    browserName: "chromium",
    serviceWorkers: "allow",
    screenshot: "off",
    trace: "off",
    video: "off",
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },
  webServer: {
    command: `npm exec vite -- preview --host 127.0.0.1 --port ${new URL(BASE_URL).port} --strictPort`,
    url: `${BASE_URL}/index.html`,
    reuseExistingServer: false,
    timeout: 30_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [
    {
      name: "chromium-vite-pwa",
      use: {
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
