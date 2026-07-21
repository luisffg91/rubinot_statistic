# CI/CD — Rubibot Statistics

Como funciona a integração contínua (CI) e o deploy contínuo (CD) do projeto. Especificação completa em
`specs/002-ci-cd-pipeline/`.

## Fluxo de trabalho

```text
feature branch  →  Pull Request para a main
     │                    │
     │                    ├─ GitHub Actions (CI): lint · test:unit · build · test:e2e
     │                    └─ Vercel: Preview Deployment (link no PR)
     │
     └─ merge na main (só com CI verde)  →  Vercel: Production Deployment
```

- Desenvolvimento sempre em **feature branches**.
- Merge na `main` **somente com o check `CI` verde** (proteção de branch — ver M2 abaixo).
- **Exceção de bootstrap**: o commit inicial de baseline (MVP US1 + este CI) foi direto para a main; a
  disciplina de PR vale a partir daí.

## CI — GitHub Actions

Workflow: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Roda em **pull requests para a main** e
em **pushes para a main**. Etapas (falha-cedo, `ubuntu-latest`, Node 20):

1. `npm ci`
2. `npm run lint`
3. `npm run test:unit` (regras de domínio — Vitest)
4. `npm run build`
5. `npx playwright install --with-deps chromium`
6. `npm run test:e2e` (Playwright — determinístico, sem depender do Rubinot real)

Não usa segredos: o deploy é responsabilidade do Vercel.

## CD — Vercel (integração Git)

O deploy é feito pela **integração Git do Vercel** (não pelo Actions): preview a cada PR, produção a cada
merge na main. Sem tokens no GitHub.

## Produção

🔗 https://rubinot-statistic.vercel.app/ (atualiza automaticamente ao mergear na `main`).

## Passos manuais (uma vez)

> Detalhes em `specs/002-ci-cd-pipeline/contracts/manual-setup.md`.

### M1 — Conectar o Vercel ✅ concluído

O repositório já está conectado ao Vercel (produção no ar na URL acima). Preview por PR e produção ao merge
na `main` estão ativos.

### M2 — Proteção de branch (main) ✅ concluído

Repo tornado **público** e proteção configurada via `gh api`: a `main` exige o check **`test`** (strict) para
merge. Merge com CI vermelho fica bloqueado (FR-004 / SC-002). `enforce_admins=false` (evita lockout do dono).

> O nome do check exigido é **`test`** (o job do workflow), não "CI" (nome do workflow).

## Rodar o que o CI roda (local)

```bash
npm ci && npm run lint && npm run test:unit && npm run build && npm run test:e2e
```
