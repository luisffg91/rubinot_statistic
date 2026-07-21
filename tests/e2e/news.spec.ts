import { test, expect } from '@playwright/test';

test('/news lista publicações recentes (US5)', async ({ page }) => {
  await page.goto('/news');
  await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();
  const list = page.getByTestId('news-list');
  await expect(list).toBeVisible();
  expect(await list.locator('li').count()).toBeGreaterThan(0);
  await expect(page.getByTestId('demo-badge')).toBeVisible();
});
