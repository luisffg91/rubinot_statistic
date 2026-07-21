import { test, expect } from '@playwright/test';

test('/streamers exibe streamers ao vivo e canais (US6)', async ({ page }) => {
  await page.goto('/streamers');
  await expect(page.getByRole('heading', { name: 'Streamers & Criadores' })).toBeVisible();
  await expect(page.getByTestId('demo-badge')).toBeVisible();
  // Pelo menos um "AO VIVO" em destaque
  await expect(page.getByTestId('live-badge').first()).toBeVisible();
  // Grade de streamers e lista de canais populadas
  await expect(page.getByTestId('streamers-grid').locator('a').first()).toBeVisible();
  await expect(page.getByTestId('channels-list').locator('li').first()).toBeVisible();
});
