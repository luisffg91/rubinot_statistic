import { test, expect } from '@playwright/test';

// Modo demonstração: dados de exemplo são gerados no servidor (determinísticos),
// então a página renderiza populada sem depender de rede externa.

test('/ranking exibe o Top Experiência populado com selo de exemplo (US1)', async ({ page }) => {
  await page.goto('/ranking');
  await expect(page.getByRole('heading', { name: 'Top Experiência' })).toBeVisible();
  await expect(page.getByTestId('demo-badge')).toBeVisible();
  const table = page.getByTestId('ranking-table');
  await expect(table).toBeVisible();
  // Cabeçalho + várias linhas de dados
  await expect(table.locator('tbody tr').first()).toBeVisible();
  expect(await table.locator('tbody tr').count()).toBeGreaterThan(10);
});

test('/ranking filtra por mundo (US1)', async ({ page }) => {
  await page.goto('/ranking');
  await page.getByRole('link', { name: 'Auroria', exact: true }).first().click();
  await expect(page).toHaveURL(/world=Auroria/);
  await expect(page.getByTestId('ranking-table')).toBeVisible();
});
