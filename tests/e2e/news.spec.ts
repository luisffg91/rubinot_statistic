import { test, expect } from '@playwright/test';

// News agora vive na HOME (não há mais página dedicada).
test('home exibe a seção de News (US5)', async ({ page }) => {
  await page.goto('/');
  const list = page.getByTestId('news-list');
  await expect(list).toBeVisible();
  expect(await list.locator('li').count()).toBeGreaterThan(0);
});
