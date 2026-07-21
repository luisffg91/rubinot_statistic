import { test, expect } from '@playwright/test';

// Boosted e streamers ao vivo agora aparecem na HOME (não há mais página dedicada de bosses).
// Nos testes, o TibiaData é inalcançável → usa-se o fallback mock (determinístico).

test('home exibe boss e criatura boostados do dia (US3)', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('boss')).not.toBeEmpty();
  await expect(page.getByTestId('creature')).not.toBeEmpty();
});

test('home exibe streamers ao vivo em destaque (US6)', async ({ page }) => {
  await page.goto('/');
  const live = page.getByTestId('home-live-streamers');
  await expect(live).toBeVisible();
  await expect(live.getByTestId('live-badge').first()).toBeVisible();
});
