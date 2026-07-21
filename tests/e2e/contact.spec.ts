import { test, expect } from '@playwright/test';

// O formulário envia direto ao Web3Forms (client-side). Interceptamos essa chamada.
const WEB3FORMS = '**api.web3forms.com/submit';

test('envia mensagem de contato com sucesso', async ({ page }) => {
  await page.route(WEB3FORMS, (r) => r.fulfill({ json: { success: true, message: 'ok' } }));
  await page.goto('/contato');
  await page.getByTestId('contact-name').fill('Luis');
  await page.getByTestId('contact-email').fill('luis@example.com');
  await page.getByTestId('contact-message').fill('Gostaria de propor uma parceria com o fansite.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByTestId('contact-ok')).toBeVisible();
});

test('valida a entrada e não envia (mensagem curta / e-mail inválido)', async ({ page }) => {
  let called = false;
  await page.route(WEB3FORMS, (r) => {
    called = true;
    return r.fulfill({ json: { success: true } });
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
  await page.route(WEB3FORMS, (r) =>
    r.fulfill({ status: 403, json: { success: false, message: 'not allowed' } }),
  );
  await page.goto('/contato');
  await page.getByTestId('contact-name').fill('Luis');
  await page.getByTestId('contact-email').fill('luis@example.com');
  await page.getByTestId('contact-message').fill('Mensagem com conteúdo suficiente.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByTestId('contact-unavailable')).toBeVisible();
});
