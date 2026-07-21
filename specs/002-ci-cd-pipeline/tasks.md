---
description: "Task list para CI/CD Pipeline — Rubibot Statistics"
---

# Tasks: Pipeline de CI e Deploy Contínuo (CI/CD)

**Input**: Design documents from `/specs/002-ci-cd-pipeline/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organização**: por user story (US1 = CI que bloqueia código quebrado; US2 = deploy contínuo no Vercel).

**Legenda**: 🧑 = **passo manual do usuário** (painel externo; não automatizável aqui, sem `gh` CLI).

## Format: `[ID] [P?] [Story?] Description`

---

## Phase 1: Setup

- [X] T001 Verificar que os scripts npm usados pelo CI existem e rodam localmente: `lint`, `test:unit`, `build`, `test:e2e` (em `package.json`)
- [X] T002 Confirmar que o `.gitignore` cobre `node_modules/`, `.next/`, `playwright-report/`, `test-results/` (evitar sujeira no baseline)

---

## Phase 2: Foundational (pré-requisitos)

- [X] T003 Criar o diretório `.github/workflows/` no repositório

---

## Phase 3: User Story 1 — CI que bloqueia código quebrado (Priority: P1) 🎯 MVP

**Goal**: todo PR/push para a main roda lint + unit + build + E2E; merge bloqueado sem CI verde.

**Independent Test**: abrir um PR com um teste falhando → check **CI** vermelho e merge bloqueado; corrigir → verde e merge liberado.

### Implementation for User Story 1

- [X] T004 [US1] Criar `.github/workflows/ci.yml` conforme `contracts/ci-workflow.md`: gatilhos `pull_request` (base `main`) e `push` (`main`); `concurrency` com `cancel-in-progress`
- [X] T005 [US1] No `ci.yml`, job `test` em `ubuntu-latest`: checkout (`actions/checkout@v4`) + `actions/setup-node@v4` (node 20, `cache: npm`)
- [X] T006 [US1] No `ci.yml`, etapas sequenciais (falha-cedo): `npm ci` → `npm run lint` → `npm run test:unit` → `npm run build`
- [X] T007 [US1] No `ci.yml`, etapas de E2E: `npx playwright install --with-deps chromium` → `npm run test:e2e` (RG-CI-2: E2E determinístico, sem Rubinot real)
- [X] T008 [US1] Garantir que nenhuma etapa usa `continue-on-error` e que não há segredos de deploy no workflow (RG-CI-1 / RG-CI-3 / FR-008)
- [ ] T009 🧑 [US1] **M2 — Passo manual**: ativar branch protection na `main` exigindo o check **CI** (ver `contracts/manual-setup.md`). Só é possível após a 1ª execução do workflow.

**Checkpoint**: CI operacional e main protegida — proteção mínima de confiança entregue.

---

## Phase 4: User Story 2 — Deploy contínuo no Vercel (Priority: P2)

**Goal**: preview por PR e produção ao mergear na main, via integração Git do Vercel (sem secrets no CI).

**Independent Test**: abrir um PR → link de preview acessível; mergear → URL de produção atualizada.

### Implementation for User Story 2

- [ ] T010 🧑 [US2] **M1 — Passo manual**: conectar o repositório `luisffg91/rubinot_statistic` ao Vercel (importar projeto, framework Next.js) — ver `contracts/manual-setup.md`
- [ ] T011 [US2] (Opcional) Adicionar `vercel.json` apenas se algum override for necessário; caso contrário, confiar nos defaults do Vercel para Next.js (Princípio VI — não criar se não precisar)

**Checkpoint**: entrega→publicação fechada (preview + produção automáticos).

---

## Phase 5: Documentação, Bootstrap & Validação

- [X] T012 [P] Criar `docs/ci-cd.md`: fluxo (feature branch → PR → CI → merge → deploy), descrição do `ci.yml` e os passos manuais M1/M2 (FR-010)
- [X] T013 [P] Atualizar `README.md` e `CLAUDE.md` com uma seção de CI/CD (como o pipeline roda; disciplina de feature branch → PR → merge com CI verde)
- [X] T014 **Bootstrap** — commit do baseline (MVP US1 + `ci.yml` + `docs/` + specs) **direto na `main`** como marco inicial; `git push origin main`
- [ ] T015 🧑 **Validação (US1)** — abrir um PR de teste: confirmar CI verde libera merge e CI vermelho bloqueia (SC-001/SC-002)
- [ ] T016 🧑 **Validação (US2)** — no PR de teste, abrir o preview do Vercel (SC-003); após merge, conferir a produção (SC-004)

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → sem dependências.
- **Foundational (Phase 2)** → antes da US1.
- **US1 (Phase 3)** → T004–T008 (workflow) antes de T009 (branch protection, que exige a 1ª execução).
- **US2 (Phase 4)** → T010 (conectar Vercel) independente do CI; T011 opcional.
- **Phase 5** → T012/T013 podem ser feitas em paralelo; **T014 (bootstrap) deve incluir `ci.yml` + docs**; T015/T016 dependem de T014 + M1/M2.

### Ordem prática recomendada

1. T001–T008 (criar `ci.yml`) + T012/T013 (docs).
2. **T014**: commitar baseline na main (leva o `ci.yml` para a main → primeira execução do CI).
3. **T010 (M1)** conectar Vercel + **T009 (M2)** branch protection.
4. **T015/T016**: PR de teste validando CI + preview/produção.

## Parallel Opportunities

- T012 e T013 (docs) em paralelo.
- T010 (Vercel) em paralelo com a autoria do `ci.yml` (T004–T008).

## Implementation Strategy

- **MVP (US1)**: `ci.yml` + branch protection já garantem qualidade na fronteira da main.
- **US2**: deploy é quase todo "painel" (M1); o código do repo praticamente não muda.
- **Bootstrap**: T014 leva tudo (MVP + CI) para a main de uma vez; a disciplina de PR passa a valer depois.

## Passos manuais do usuário (resumo)

- 🧑 **T009 / M2**: branch protection na main exigindo o check **CI**.
- 🧑 **T010 / M1**: conectar o repo ao Vercel.
- 🧑 **T015 / T016**: validação via PR de teste.

> Automatizável no futuro instalando o `gh` CLI (`brew install gh`) — aí a branch protection e a abertura de
> PRs poderiam ser feitas por comando.
