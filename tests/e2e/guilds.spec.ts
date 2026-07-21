import { test, expect } from '@playwright/test';

test('/guilds lista guilds e abre o detalhe (US4)', async ({ page }) => {
  await page.goto('/guilds');
  await expect(page.getByRole('heading', { name: 'Guilds' })).toBeVisible();
  const grid = page.getByTestId('guilds-grid');
  await expect(grid).toBeVisible();
  expect(await grid.locator('li').count()).toBeGreaterThan(5);

  await grid.locator('a').first().click();
  await expect(page).toHaveURL(/\/guilds\/.+/);
  await expect(page.getByTestId('guild-members')).toBeVisible();
});
