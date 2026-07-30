import { expect, test } from "@playwright/test";

import {
  collectRuntimeDiagnostics,
  expectCleanDiagnostics,
} from "./helpers/runtime.mjs";

test.beforeEach(async ({ page }) => {
  await page.goto("/materialy.html", { waitUntil: "domcontentloaded" });
});

test("enhances the canonical catalogue and resets combined filters", async ({
  page,
}) => {
  const diagnostics = collectRuntimeDiagnostics(page);
  const filters = page.getByRole("form", {
    name: "Filtry katalogu materiałów",
  });
  const cards = page.locator("[data-material-id]");
  const count = page.locator("[data-materials-count]");
  const emptyState = page.locator("[data-materials-empty]");
  const reset = page.getByRole("button", { name: "Wyczyść filtry" });

  await expect(filters).toBeVisible();
  await expect(cards).toHaveCount(15);
  await expect(count).toHaveText("Znaleziono 15 materiałów");
  await expect(emptyState).toBeHidden();
  await expect(reset).toBeDisabled();

  await page.getByLabel("Kategoria").selectOption("business");
  await page.getByLabel("Poziom").selectOption("B2");
  await page.getByLabel("Dostępność").selectOption("premium");
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAttribute("data-material-id", "business-meetings");
  await expect(count).toHaveText("Znaleziono 1 materiał");
  await expect(reset).toBeEnabled();

  await page.getByLabel("Poziom").selectOption("C1");
  await page.getByLabel("Dostępność").selectOption("free");
  await expect(cards).toHaveCount(0);
  await expect(count).toHaveText("Znaleziono 0 materiałów");
  await expect(emptyState).toBeVisible();

  await reset.click();
  await expect(page.getByLabel("Kategoria")).toHaveValue("all");
  await expect(page.getByLabel("Poziom")).toHaveValue("all");
  await expect(page.getByLabel("Dostępność")).toHaveValue("all");
  await expect(cards).toHaveCount(15);
  await expect(count).toHaveText("Znaleziono 15 materiałów");
  await expect(emptyState).toBeHidden();
  await expect(reset).toBeDisabled();
  expectCleanDiagnostics(diagnostics);
});

test("keeps meaningful canonical catalogue content without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/materialy.html", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: "Katalog materiałów" }),
  ).toBeVisible();
  await expect(page.locator("[data-materials-filters]")).toBeHidden();
  await expect(page.locator("[data-material-id]")).toHaveCount(15);
  await expect(
    page.getByRole("heading", {
      name: "Gramatyka bez chaosu – kluczowe czasy",
    }),
  ).toBeVisible();

  await context.close();
});
