# Contrato — Workflow de CI (`.github/workflows/ci.yml`)

## Gatilhos

- `pull_request` com base na `main`.
- `push` na `main`.

## Job `test` (runner `ubuntu-latest`)

Etapas, em ordem (falha-cedo):

| # | Etapa | Comando |
|---|-------|---------|
| 1 | Checkout | `actions/checkout@v4` |
| 2 | Setup Node 20 + cache npm | `actions/setup-node@v4` (`node-version: 20`, `cache: npm`) |
| 3 | Instalar deps | `npm ci` |
| 4 | Lint | `npm run lint` |
| 5 | Testes unitários | `npm run test:unit` |
| 6 | Build | `npm run build` |
| 7 | Browser E2E | `npx playwright install --with-deps chromium` |
| 8 | E2E | `npm run test:e2e` |

## Regras

- Qualquer etapa que falhar reprova o job (sem `continue-on-error`) — RG-CI-1.
- Nome do check exibido no PR: **CI** (usado na branch protection — M2).
- Sem `secrets` de deploy — RG-CI-3 / FR-008.
- Concurrency: cancelar execuções antigas da mesma branch (evita fila) — opcional, recomendado.

## Esboço (referência para implementação)

```yaml
name: CI
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run build
      - run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
```
