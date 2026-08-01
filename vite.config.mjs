import { resolve } from "node:path";

import { defineConfig } from "vite";

import { ALL_PAGES } from "./scripts/site-config.mjs";

const pageInputs = Object.fromEntries(
  ALL_PAGES.map((page) => [page.key, resolve(import.meta.dirname, page.file)]),
);

export default defineConfig({
  appType: "mpa",
  publicDir: ".vite-public",

  build: {
    outDir: "dist",
    assetsDir: "build",
    emptyOutDir: true,
    rolldownOptions: {
      input: pageInputs,
    },
  },
});
