import { test, expect } from '@playwright/test';

test.use({ ignoreHTTPSErrors: true });

const base = process.env.DEPLOY_URL || 'https://parsanaenergy.ir/';
const routes = ['','articles/','404.html'];

for (const route of routes) {
  test(`"${route || '/'}" returns 200`, async ({ request }) => {
    const response = await request.get(base + route);
    expect(response.status()).toBe(200);
  });
}
