import { test, expect } from '@playwright/test';

test('envia mensagem de contato com sucesso', async ({ page }) => {
  await page.route('**/api/contact', (r) => r.fulfill({ json: { ok: true } }));
  await page.goto('/contato');
  await page.getByTestId('contact-name').fill('Luis');
  await page.getByTestId('contact-email').fill('luis@example.com');
  await page.getByTestId('contact-message').fill('Gostaria de propor uma parceria com o fansite.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByTestId('contact-ok')).toBeVisible();
});

test('valida a entrada e não envia (mensagem curta / e-mail inválido)', async ({ page }) => {
  let called = false;
  await page.route('**/api/contact', (r) => {
    called = true;
    return r.fulfill({ json: { ok: true } });
  });
  await page.goto('/contato');
  await page.getByTestId('contact-name').fill('L');
  await page.getByTestId('contact-email').fill('invalido');
  await page.getByTestId('contact-message').fill('curta');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByTestId('err-email')).toBeVisible();
  expect(called).toBe(false);
});

test('degrada quando o envio está indisponível (FR-009)', async ({ page }) => {
  await page.route('**/api/contact', (r) => r.fulfill({ status: 503, json: { error: 'unavailable' } }));
  await page.goto('/contato');
  await page.getByTestId('contact-name').fill('Luis');
  await page.getByTestId('contact-email').fill('luis@example.com');
  await page.getByTestId('contact-message').fill('Mensagem com conteúdo suficiente.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByTestId('contact-unavailable')).toBeVisible();
});
