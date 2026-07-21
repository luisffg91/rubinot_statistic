import { test, expect } from '@playwright/test';

const emptySnapshot = {
  totalOnline: 0,
  worlds: [],
  fetchedAt: new Date().toISOString(),
  source: 'rubinot:/api/worlds',
  stale: false,
};

test('header exibe o contador de Server Save com relógio HH:MM:SS', async ({ page }) => {
  await page.route('**/api/server-snapshot', (r) => r.fulfill({ json: emptySnapshot }));

  await page.goto('/');

  const pill = page.getByTestId('server-save');
  await expect(pill).toBeVisible();
  await expect(pill).toContainText('Server Save');
  // Após montar no cliente, sai do placeholder e mostra a contagem regressiva.
  await expect(pill.locator('time')).toHaveText(/^\d{2}:\d{2}:\d{2}$/);
});
