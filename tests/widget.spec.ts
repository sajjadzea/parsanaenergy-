import { test, expect } from '@playwright/test';

test('Decision-Tree widget loads', async ({ page }) => {
  await page.goto('http://localhost:4173/parsanaenergy/');
  const iframe = page.frameLocator('#decision-tree-widget');
  await expect(iframe.locator('#widget-root')).toBeVisible();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await expect(errors).toHaveLength(0);
});
