import { test, expect } from '@playwright/test';

// Snapshot vazio para a home não gerar ruído nos testes de busca.
const emptySnapshot = {
  totalOnline: 0,
  worlds: [],
  fetchedAt: new Date().toISOString(),
  source: 'rubinot:/api/worlds',
  stale: false,
};

const foundResponse = {
  found: true,
  character: {
    name: 'Minlek Tanker',
    level: 1000,
    vocation: 'Elite Knight',
    world: 'Lunarian',
    guild: null,
    status: 'unknown',
  },
  source: 'rubinot:/api/characters/search',
  fetchedAt: new Date().toISOString(),
};

test('busca leva aos dados principais do personagem (US2 / FR-005/006)', async ({ page }) => {
  await page.route('**/api/server-snapshot', (r) => r.fulfill({ json: emptySnapshot }));
  await page.route('**/api/character**', (r) => r.fulfill({ json: foundResponse }));

  await page.goto('/');
  await page.getByTestId('character-search-input').fill('Minlek Tanker');
  await page.getByRole('button', { name: 'Buscar' }).click();

  await expect(page).toHaveURL(/\/character\/Minlek/);
  const card = page.getByTestId('character-card');
  await expect(card).toContainText('Elite Knight');
  await expect(card).toContainText('Lunarian');
  await expect(card).toContainText('sem guild');
});

test('busca vazia orienta o formato e não navega (FR-008)', async ({ page }) => {
  await page.route('**/api/server-snapshot', (r) => r.fulfill({ json: emptySnapshot }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await expect(page.getByTestId('search-error')).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test('personagem inexistente mostra "não encontrado" (FR-007)', async ({ page }) => {
  await page.route('**/api/character**', (r) => r.fulfill({ json: { found: false } }));
  await page.goto('/character/NaoExiste');
  await expect(page.getByTestId('not-found')).toBeVisible();
});

test('fonte de personagem indisponível degrada sem quebrar (FR-009)', async ({ page }) => {
  await page.route('**/api/character**', (r) =>
    r.fulfill({ status: 503, json: { error: 'unavailable' } }),
  );
  await page.goto('/character/Minlek%20Tanker');
  await expect(page.getByTestId('unavailable')).toBeVisible();
});

// Sem interceptar a rede: o BFF usa o adapter mock (demo) e devolve o personagem de exemplo.
test('modo demonstração exibe perfil completo com selo de dados de exemplo', async ({ page }) => {
  await page.goto('/character/Dejairzin');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dejairzin');
  await expect(page.getByTestId('demo-badge')).toBeVisible();

  const card = page.getByTestId('character-card');
  await expect(card).toContainText('Elder Druid');
  await expect(card).toContainText('Ferobra');
  await expect(card).toContainText('United');
  await expect(card).toContainText('Premium Account');
});

test('aba Experiência mostra o histórico de XP (FR-014, modo demonstração)', async ({ page }) => {
  await page.goto('/character/Dejairzin');

  await page.getByRole('tab', { name: 'Experiência' }).click();

  const table = page.getByTestId('xp-history');
  await expect(table).toBeVisible();
  await expect(table).toContainText('2026-07-03'); // melhor dia registrado
  await expect(page.getByTestId('character-experience')).toContainText('Melhor dia');
});
