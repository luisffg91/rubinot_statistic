import { defineConfig } from '@playwright/test';

// E2E determinístico: o dev server sobe com RUBINOT_WORLDS_URL apontando para um host
// inalcançável, de modo que o SSR sempre começa "indisponível" e o conteúdo é dirigido
// pelo polling do cliente (interceptado via page.route em cada teste). Assim os testes
// não dependem do servidor real do Rubinot.
export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      RUBINOT_WORLDS_URL: 'http://127.0.0.1:9/api/worlds',
      // TibiaData inalcançável nos testes → boosted usa o fallback mock (determinístico).
      TIBIADATA_URL_BOSSES: 'http://127.0.0.1:9/boostablebosses',
      TIBIADATA_URL_CREATURES: 'http://127.0.0.1:9/creatures',
      // Chave fictícia p/ o formulário tentar o envio ao Web3Forms (interceptado nos testes).
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: 'e2e-test-key',
    },
  },
});
