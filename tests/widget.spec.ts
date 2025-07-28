import { test, expect } from '@playwright/test';

test('Decision-Tree widget loads', async ({ page }) => {
  await page.goto('http://localhost:4173/parsanaenergy/');
  const iframe = page.frameLocator('#decision-tree-widget');
  await expect(iframe.locator('#widget-root')).toBeVisible();
  page.on('pageerror', e => expect(e.message).not.toContain('React error #299'));
});
