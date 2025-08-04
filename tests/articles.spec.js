import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

test('Articles page is reachable after deploy', async ({ page }) => {
  const response = await page.goto('https://parsanaenergy.ir/articles/');
  expect(response?.status(), 'expected HTTP status 200').toBe(200);

  const title = await page.title();
  expect(title, 'expected title to contain the blog heading').toMatch(/Articles|Blog|مقالات/i);
});
