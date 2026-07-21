# Research — CI/CD (002)

## R1. Plataforma de CI

- **Decisão**: GitHub Actions.
- **Rationale**: o repositório já está no GitHub (`origin`); integração nativa com PRs e status checks; sem custo extra de setup.
- **Alternativas**: CircleCI/GitLab CI — rejeitados (fora do ecossistema atual, sem ganho).

## R2. Estratégia de deploy (Vercel)

- **Decisão**: **integração Git do Vercel** (importar o repo no painel do Vercel). Preview por PR e produção ao mergear na main.
- **Rationale**: zero segredos no CI (FR-008), preview deploys automáticos, menos peças móveis (Princípio VI). Vercel é o alvo do projeto (Next.js).
- **Alternativas**: deploy via `vercel` CLI dentro do Actions (job de deploy com `VERCEL_TOKEN`/`ORG_ID`/`PROJECT_ID`) — rejeitado nesta fase por adicionar segredos e complexidade sem necessidade; fica registrado como opção futura se quisermos gate de deploy no próprio pipeline.

## R3. Estrutura do pipeline

- **Decisão**: 1 workflow (`ci.yml`), 1 job (`test`) com etapas sequenciais: checkout → setup-node (cache npm) → `npm ci` → `lint` → `test:unit` → `build` → instalar Chromium do Playwright → `test:e2e`.
- **Rationale**: simples e legível (Princípios I/VI); ordem falha-cedo (lint/unit antes do build/e2e, mais caros).
- **Alternativas**: jobs paralelos (unit | e2e) — rejeitado por ora (overhead de setup duplicado > ganho, com a suíte pequena atual). Reavaliar se o tempo passar de ~10 min (SC-005).

## R4. E2E no CI

- **Decisão**: instalar somente Chromium (`npx playwright install --with-deps chromium`); o dev server sobe pelo próprio `playwright.config.ts` (webServer) com `RUBINOT_WORLDS_URL` inalcançável.
- **Rationale**: determinístico e independente do Rubinot real (FR-005); `--with-deps` cobre libs do runner Linux.
- **Alternativas**: rodar contra deploy de preview — rejeitado (acopla CI ao deploy; perde determinismo).

## R5. Cache e performance

- **Decisão**: `actions/setup-node` com `cache: 'npm'`; `npm ci` para instalação reprodutível.
- **Rationale**: acelera execuções (SC-005) sem complexidade.

## R6. Proteção de branch e bootstrap

- **Decisão**: baseline (MVP US1 + `ci.yml`) vai direto para a main (bootstrap); depois, ativar branch protection exigindo o check de CI. Trabalho novo só entra por PR.
- **Rationale**: o workflow precisa existir na main para servir de check; após o baseline, a disciplina de PR passa a valer (FR-009).
- **Passo manual (usuário)**: ativar a regra de proteção no GitHub — não automatizável aqui (sem `gh`).

## Incógnitas remanescentes

| ID | Item | Bloqueia? | Responsável |
|----|------|-----------|-------------|
| M1 | Conectar o repositório ao Vercel (painel) | Deploy (US2) | Usuário |
| M2 | Ativar branch protection exigindo o check "CI" | Bloqueio de merge (FR-004) | Usuário |

Ambos são passos de painel externos, documentados em `contracts/manual-setup.md` e `docs/ci-cd.md`.
