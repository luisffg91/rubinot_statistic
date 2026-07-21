# Feature Specification: Pipeline de CI e Deploy Contínuo (CI/CD)

**Feature Branch**: `002-ci-cd-pipeline`

**Created**: 2026-07-21

**Status**: Draft

**Input**: User description: "Pipeline de CI (GitHub Actions: lint, testes unitários, build, E2E) em PRs e pushes para a main; deploy contínuo no Vercel via integração Git (preview por PR, produção ao mergear na main); merge para a main somente com CI verde (branch protection); baseline inicial na main (bootstrap), depois feature branches."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Bloquear código quebrado antes da main (Priority: P1)

Como mantenedor/QA, quero que toda alteração proposta (pull request) para a main seja verificada
automaticamente — lint, testes unitários, build e testes E2E — de modo que código com falha não seja
mesclado. A branch main é protegida: o merge só é permitido com o pipeline verde.

**Why this priority**: É a proteção mínima de confiança do repositório. Sem isso, regressões chegam à main
e ao deploy. É a fatia que já entrega valor sozinha (qualidade garantida na fronteira da main).

**Independent Test**: Abrir um PR com um teste falhando e verificar que o check de CI fica vermelho e o merge
é bloqueado; corrigir e verificar que o check fica verde e o merge é liberado.

**Acceptance Scenarios**:

1. **DADO** um pull request aberto para a main, **QUANDO** o pipeline executa, **ENTÃO** ele roda lint, testes unitários, build e testes E2E, e reporta um status (sucesso/falha) no PR.
2. **DADO** um pull request com qualquer etapa do pipeline falhando, **QUANDO** o autor tenta mesclar, **ENTÃO** o merge é bloqueado pela proteção de branch.
3. **DADO** um pull request com o pipeline verde, **QUANDO** o autor solicita o merge, **ENTÃO** o merge para a main é permitido.
4. **DADO** um push direto na main, **QUANDO** o pipeline executa, **ENTÃO** as mesmas verificações rodam e o resultado fica visível no histórico.

---

### User Story 2 - Publicar automaticamente (Priority: P2)

Como mantenedor, quero que cada PR gere um ambiente de preview navegável e que o merge na main publique
automaticamente a versão de produção, sem passos manuais de deploy.

**Why this priority**: Fecha o ciclo entrega→publicação e permite revisar visualmente cada mudança antes do
merge. Depende do repositório estar conectado ao provedor de deploy.

**Independent Test**: Abrir um PR e verificar que um link de preview é gerado com a mudança; mergear na main
e verificar que a URL de produção reflete a nova versão.

**Acceptance Scenarios**:

1. **DADO** um pull request aberto, **QUANDO** o provedor de deploy processa o commit, **ENTÃO** um deploy de preview é criado e o link fica acessível.
2. **DADO** um merge na main, **QUANDO** o provedor processa o commit, **ENTÃO** um deploy de produção é publicado automaticamente.
3. **DADO** um deploy de produção concluído, **QUANDO** um usuário acessa a URL de produção, **ENTÃO** vê a versão correspondente ao último commit da main.

---

### Edge Cases

- **Pipeline instável/falha de infra** (ex.: download do browser E2E): a falha deve ser reportada como falha do check (não passar silenciosamente); reexecução deve ser possível.
- **E2E dependente de rede externa**: os testes E2E MUST ser determinísticos no CI, sem depender do servidor real do Rubinot.
- **Push direto na main (bootstrap)**: o commit inicial de baseline é permitido diretamente; após ele, a proteção de branch passa a exigir PR + CI verde.
- **Deploy de produção falha após merge**: deve ser visível (status de deploy) e não deve corromper a versão anterior já publicada.
- **Segredos**: o pipeline de CI NÃO MUST exigir segredos do provedor de deploy (o deploy é responsabilidade da integração Git do provedor).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O pipeline de CI MUST executar automaticamente em pull requests direcionados à main e em pushes para a main.
- **FR-002**: O pipeline MUST executar, no mínimo: instalação de dependências, lint, testes unitários, build e testes E2E.
- **FR-003**: O pipeline MUST reportar um status de sucesso/falha visível no pull request.
- **FR-004**: A main MUST ser protegida de forma que o merge só ocorra com o check de CI aprovado (verde).
- **FR-005**: Os testes E2E MUST rodar de forma determinística no CI, sem depender de serviços externos (ex.: API real do Rubinot).
- **FR-006**: Cada pull request MUST gerar um deploy de preview acessível por link.
- **FR-007**: O merge na main MUST disparar um deploy de produção automaticamente.
- **FR-008**: O deploy MUST ocorrer via integração Git do provedor (Vercel), sem exigir segredos de deploy no CI.
- **FR-009**: O fluxo de trabalho MUST ser baseado em feature branches; após o baseline inicial, alterações na main só entram por pull request.
- **FR-010**: A configuração do pipeline e os passos manuais de setup (conectar o repositório ao provedor de deploy; ativar a proteção de branch) MUST estar documentados no repositório.

*Fora do escopo desta fase*: testes de carga/performance, ambientes de staging além do preview, automação de
versionamento/release e políticas de rollback automatizado.

### Key Entities *(include if feature involves data)*

- **Pipeline de CI**: conjunto de etapas (lint, unit, build, E2E) executadas por um gatilho (PR/push) com um resultado agregado (verde/vermelho).
- **Deploy de Preview**: publicação efêmera associada a um pull request, com URL própria.
- **Deploy de Produção**: publicação associada ao estado atual da main, com URL estável.
- **Regra de Proteção de Branch**: política que condiciona o merge na main à aprovação do check de CI.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos pull requests para a main executam o pipeline completo (lint + unit + build + E2E) antes de qualquer merge.
- **SC-002**: Nenhum merge na main ocorre com o check de CI vermelho (bloqueio efetivo pela proteção de branch).
- **SC-003**: 100% dos pull requests recebem um link de deploy de preview navegável.
- **SC-004**: Todo merge na main resulta em um deploy de produção sem intervenção manual.
- **SC-005**: O pipeline completo conclui em tempo hábil para não travar o fluxo (meta: até ~10 minutos por execução em condições normais).
- **SC-006**: Um desenvolvedor novo consegue, seguindo apenas a documentação do repositório, reproduzir o fluxo (abrir PR, ver CI e preview) sem ajuda externa.

## Assumptions

- **Provedor de deploy**: Vercel, via **integração Git** (conexão feita no painel do Vercel). Preview por PR e produção ao mergear na main são comportamentos padrão dessa integração.
- **CI**: GitHub Actions (o repositório está hospedado no GitHub — `origin` já configurado).
- **Sem segredos de deploy no CI**: como o deploy é responsabilidade do Vercel (integração Git), o GitHub Actions não precisa de tokens do Vercel.
- **E2E determinístico**: já garantido pelo projeto (Playwright intercepta a rede e sobe o dev server com `RUBINOT_WORLDS_URL` inalcançável), então roda no CI sem o Rubinot real.
- **Bootstrap**: o primeiro commit (baseline com o MVP US1 + a configuração de CI) vai direto para a main; a proteção de branch passa a valer depois.
- **Runner**: `ubuntu-latest` com Node 20+; o browser do Playwright é instalado no runner durante o pipeline.

### Dependências e passos manuais (do usuário)

Alguns passos dependem de acesso a painéis externos e **não podem ser automatizados** nesta máquina (o `gh`
CLI não está instalado):

- **Conectar o repositório ao Vercel** (importar o projeto no painel do Vercel) — habilita preview/produção.
- **Ativar a proteção de branch** na main no GitHub (exigir o check de CI para merge).
- Ambos serão documentados em um passo-a-passo no repositório (FR-010).
