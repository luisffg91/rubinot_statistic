import { test, expect } from '@playwright/test';

test('/power-gamers (Dia) exibe ranking de ganho com selo de exemplo (US2)', async ({ page }) => {
  await page.goto('/power-gamers');
  await expect(page.getByRole('heading', { name: 'Power Gamers' })).toBeVisible();
  await expect(page.getByTestId('demo-badge')).toBeVisible();
  const table = page.getByTestId('power-gamers-table');
  await expect(table).toBeVisible();
  expect(await table.locator('tbody tr').count()).toBeGreaterThan(10);
});

test('/power-gamers permite escolher um dia específico (US2)', async ({ page }) => {
  await page.goto('/power-gamers');
  await page.locator('#pg-date').fill('2026-05-10');
  await page.getByRole('button', { name: 'Ver' }).click();
  await expect(page).toHaveURL(/date=2026-05-10/);
  await expect(page.getByTestId('power-gamers-table')).toBeVisible();
});

test('/power-gamers modo Período filtra por intervalo (US2)', async ({ page }) => {
  await page.goto('/power-gamers?mode=range');
  await page.locator('#pg-from').fill('2026-05-01');
  await page.locator('#pg-to').fill('2026-05-31');
  await page.getByRole('button', { name: 'Ver' }).click();
  await expect(page).toHaveURL(/from=2026-05-01/);
  await expect(page).toHaveURL(/to=2026-05-31/);
  await expect(page.getByTestId('power-gamers-table')).toBeVisible();
});
