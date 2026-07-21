import { test, expect } from '@playwright/test';

test('/bosses exibe boss e criatura do dia (US3)', async ({ page }) => {
  await page.goto('/bosses');
  await expect(page.getByRole('heading', { name: 'Bosses Boostados' })).toBeVisible();
  await expect(page.getByTestId('boss')).not.toBeEmpty();
  await expect(page.getByTestId('creature')).not.toBeEmpty();
  await expect(page.getByTestId('demo-badge')).toBeVisible();
});
