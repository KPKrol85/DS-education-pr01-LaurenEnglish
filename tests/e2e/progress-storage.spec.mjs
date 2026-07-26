import { expect, test } from "@playwright/test";

import { STORAGE_KEY } from "../../js/data/progress.js";

const FROZEN_TIMESTAMP = new Date(2026, 6, 26, 15, 30, 45).getTime();

test.beforeEach(async ({ page }) => {
  await page.addInitScript((timestamp) => {
    const NativeDate = Date;

    class FrozenDate extends NativeDate {
      constructor(...args) {
        super(...(args.length ? args : [timestamp]));
      }

      static now() {
        return timestamp;
      }
    }

    globalThis.Date = FrozenDate;
  }, FROZEN_TIMESTAMP);
  await page.goto("/postepy.html", { waitUntil: "domcontentloaded" });
  await page.evaluate((storageKey) => localStorage.removeItem(storageKey), STORAGE_KEY);
});

test("retains exactly fourteen consecutive local progress dates", async ({
  page,
}) => {
  const result = await page.evaluate(async () => {
    const { getRecentDateKeys, loadProgressState, saveProgressState } =
      await import("/js/state/storage.js");
    const dateKeys = getRecentDateKeys(15);
    const saved = saveProgressState({
      checkIns: Object.fromEntries(
        dateKeys.map((dateKey, index) => [
          dateKey,
          {
            grammar: false,
            speaking: true,
            vocab: index % 2 === 0,
          },
        ]),
      ),
      goals: { grammar: 3, speaking: 2, vocab: 4 },
    });
    const reloaded = loadProgressState();

    return {
      fifteenthOldestKey: dateKeys[14],
      reloadedKeys: Object.keys(reloaded.checkIns),
      retainedKeys: dateKeys.slice(0, 14),
      savedKeys: Object.keys(saved.checkIns),
    };
  });

  expect(result.savedKeys).toEqual(result.retainedKeys);
  expect(result.reloadedKeys).toEqual(result.retainedKeys);
  expect(result.savedKeys).not.toContain(result.fifteenthOldestKey);
});

test("rejects impossible and future progress date keys", async ({ page }) => {
  const result = await page.evaluate(async () => {
    const { getRecentDateKeys, loadProgressState, saveProgressState } =
      await import("/js/state/storage.js");
    const currentDateKey = getRecentDateKeys(1)[0];
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const futureDateKey = `${futureDate.getFullYear()}-${String(
      futureDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;
    const saved = saveProgressState({
      checkIns: {
        "2026-02-29": { grammar: false, speaking: true, vocab: true },
        "2026-04-31": { grammar: false, speaking: true, vocab: true },
        [currentDateKey]: { grammar: false, speaking: true, vocab: true },
        [futureDateKey]: { grammar: false, speaking: true, vocab: true },
      },
      goals: { grammar: 3, speaking: 2, vocab: 4 },
    });
    const reloaded = loadProgressState();

    return {
      currentDateKey,
      reloadedKeys: Object.keys(reloaded.checkIns),
      savedKeys: Object.keys(saved.checkIns),
    };
  });

  expect(result.savedKeys).toEqual([result.currentDateKey]);
  expect(result.reloadedKeys).toEqual([result.currentDateKey]);
});
