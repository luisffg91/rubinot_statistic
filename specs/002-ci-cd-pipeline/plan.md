# Implementation Plan: Pipeline de CI e Deploy Contínuo (CI/CD)

**Branch**: `002-ci-cd-pipeline` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-ci-cd-pipeline/spec.md`

## Summary

Garantir qualidade na fronteira da main e publicação automática. **CI** em GitHub Actions (lint, testes
unitários, build e E2E) roda em PRs para a main e em pushes na main; a main é protegida exigindo o check
verde. **CD** via **integração Git do Vercel** (preview por PR, produção ao mergear), sem segredos no CI.
Fluxo em feature branches; baseline inicial (MVP US1 + CI) vai direto para a main (bootstrap).

## Technical Context

**Language/Version**: YAML (GitHub Actions); Node.js 20 no runner.

**Primary Dependencies**: GitHub Actions (`actions/checkout`, `actions/setup-node`); scripts npm já existentes (`lint`, `test:unit`, `build`, `test:e2e`); Playwright (browser instalado no runner). Vercel (integração Git, externa ao CI).

**Storage**: N/A.

**Testing**: o próprio pipeline É a verificação; validação da feature = abrir um PR de teste e observar check + preview.

**Target Platform**: GitHub-hosted runner `ubuntu-latest`.

**Project Type**: Infraestrutura/DevOps do projeto web existente.

**Performance Goals**: pipeline completo em ~10 min (SC-005); usar cache de npm para acelerar.

**Constraints**: sem segredos de deploy no CI (FR-008); E2E determinístico (FR-005); `gh` CLI ausente na máquina local → passos de painel (Vercel, branch protection) são manuais e documentados (FR-010).

**Scale/Scope**: 1 workflow (`ci.yml`), 1 job com etapas sequenciais; sem matriz de versões (YAGNI).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação | Status |
|---|---|---|
| I. Didática e Legibilidade | Workflow simples e comentado; nomes de etapas claros. | ✅ PASS |
| II. Domínio no Centro | N/A (infra) — não afeta as camadas do app. | ✅ N/A |
| III. Regras Centralizadas | Reusa os scripts npm existentes; sem duplicar comandos de teste. | ✅ PASS |
| IV. Testes do Domínio | O CI executa `test:unit` (regras de domínio) e `test:e2e` em toda mudança. | ✅ PASS |
| V. Evolução Incremental e Compatível | Feature branches + PR + CI verde; baseline preserva o que já existe. | ✅ PASS |
| VI. Simplicidade (YAGNI) | Um único workflow, um job, sem matriz nem staging extra. | ✅ PASS |
| VII. Documentação Viva | README/CLAUDE.md atualizados + doc de setup CI/CD (quickstart + checklist de config manual). | ✅ PASS |

**Resultado**: nenhuma violação. Complexity Tracking vazio.

## Project Structure

### Documentation (this feature)

```text
specs/002-ci-cd-pipeline/
├── plan.md              # Este arquivo
├── research.md          # Decisões (Actions vs. alternativas; Vercel Git vs. CLI)
├── data-model.md        # Entidades de processo (pipeline, preview, produção, branch rule)
├── quickstart.md        # Como validar o CI/CD + passos manuais
├── contracts/
│   ├── ci-workflow.md         # Contrato do .github/workflows/ci.yml (gatilhos + etapas)
│   └── manual-setup.md        # Checklist: conectar Vercel + branch protection
└── tasks.md             # (gerado por /speckit-tasks)
```

### Source (repository root)

```text
.github/
└── workflows/
    └── ci.yml           # pipeline de CI (pull_request → main; push → main)

docs/
└── ci-cd.md             # documentação do fluxo + passos manuais (FR-010)
```

**Structure Decision**: adição de infraestrutura ao repositório existente — um workflow de CI em
`.github/workflows/ci.yml` e documentação em `docs/ci-cd.md`. O deploy não gera arquivos no repo (é
responsabilidade da integração Git do Vercel).

## Complexity Tracking

> Nenhuma violação da constituição a justificar. Seção intencionalmente vazia.
