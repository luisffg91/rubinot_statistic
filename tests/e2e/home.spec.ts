import { test, expect } from '@playwright/test';

// O dev server sobe com RUBINOT_WORLDS_URL inalcançável (ver playwright.config.ts),
// então o SSR começa "indisponível" e o conteúdo é dirigido pelo polling do cliente,
// que interceptamos aqui — tornando os testes independentes do Rubinot real.

const snapshot = {
  totalOnline: 2241,
  worlds: [
    {
      name: 'Auroria',
      pvpTypeLabel: 'Open PvP',
      worldType: 'yellow',
      locked: false,
      status: 'online',
      playersOnline: 972,
      createdAt: null,
    },
    {
      name: 'Elysian',
      pvpTypeLabel: 'Optional PvP',
      worldType: 'yellow',
      locked: true,
      status: 'online',
      playersOnline: 1269,
      createdAt: null,
    },
  ],
  fetchedAt: new Date().toISOString(),
  source: 'rubinot:/api/worlds',
  stale: false,
};

test('home exibe total online e mundos (US1 / SC-001)', async ({ page }) => {
  await page.route('**/api/server-snapshot', (route) => route.fulfill({ json: snapshot }));
  await page.goto('/');

  await expect(page.getByTestId('online-counter')).toContainText('2.241');
  const worlds = page.getByTestId('worlds-list');
  await expect(worlds).toContainText('Elysian');
  await expect(worlds).toContainText('travado'); // selo de locked
});

test('fonte indisponível degrada sem quebrar a página (FR-009)', async ({ page }) => {
  await page.route('**/api/server-snapshot', (route) =>
    route.fulfill({ status: 503, json: { error: 'unavailable' } }),
  );
  await page.goto('/');

  await expect(page.getByText(/temporariamente indisponíveis/i).first()).toBeVisible();
  // A página continua de pé (tagline da hero visível).
  await expect(page.getByRole('heading', { name: 'As estatísticas do Rubinot' })).toBeVisible();
});

test('home é utilizável em viewport mobile (375px), sem overflow horizontal (T050)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.route('**/api/server-snapshot', (route) => route.fulfill({ json: snapshot }));
  await page.goto('/');

  await expect(page.getByTestId('online-counter')).toContainText('2.241');
  await expect(page.getByTestId('worlds-list')).toContainText('Elysian');
  // A página não deve rolar horizontalmente no mobile.
  const noHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth <= window.innerWidth + 1,
  );
  expect(noHorizontalOverflow).toBe(true);
});
