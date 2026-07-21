---
description: "Task list para Home Dashboard — Rubibot Statistics (MVP)"
---

# Tasks: Home Dashboard — Rubibot Statistics (MVP)

**Input**: Design documents from `/specs/001-home-dashboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: INCLUÍDOS — o Princípio IV da constituição torna testes de regra de domínio **obrigatórios**.

**Organização**: por user story (US1 = MVP; US2 = busca de personagem), independentemente testáveis.

**Stack**: Next.js (App Router) + TypeScript, Vitest (unit), Playwright (E2E). Camadas: `src/domain` (puro) → `src/application` → `src/infrastructure` → `src/app`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: pode rodar em paralelo (arquivos diferentes, sem dependência pendente)
- **[Story]**: US1 / US2 (fases de user story)

---

## Phase 1: Setup (infraestrutura compartilhada)

- [X] T001 Inicializar projeto Next.js (App Router) + TypeScript na raiz do repositório (`package.json`, `tsconfig.json`, `next.config.ts`)
- [X] T002 [P] Configurar Vitest para testes unitários em `vitest.config.ts` (script `test:unit`)
- [X] T003 [P] Configurar Playwright para E2E em `playwright.config.ts` (script `test:e2e`; baseURL localhost:3000)
- [X] T004 [P] Configurar ESLint + Prettier (`.eslintrc`, `.prettierrc`) alinhados às convenções de nomes claros (Princípio I)
- [X] T005 Criar a estrutura de pastas em camadas: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/app/`, `tests/unit/`, `tests/e2e/`
- [X] T006 [P] Copiar fixtures de teste para `tests/fixtures/worlds-response.json` e `tests/fixtures/character-details.json` (a partir de `docs/`)

---

## Phase 2: Foundational (pré-requisitos bloqueantes)

**⚠️ Nenhuma user story começa antes desta fase.**

- [X] T007 Definir tipos de domínio compartilhados de rastreabilidade em `src/domain/shared/data-envelope.ts`: envelope com `source`, `fetchedAt`, `stale` (FR-011, FR-010)
- [X] T008 [P] Definir `Result`/erros de domínio (ok/indisponível/não-encontrado) em `src/domain/shared/result.ts` (base para FR-009)
- [X] T009 [P] Implementar helper HTTP resiliente em `src/infrastructure/http/http-client.ts` (timeout, `cache: 'no-store'`, mapeamento de erro sem vazar detalhe técnico)
- [X] T010 [P] Definir tokens de **identidade visual própria** (paleta inspirada — não copiada — no Rubinot) em `src/app/globals.css` + `src/app/styles/tokens.css` (cores, tipografia, espaçamento); documentar a decisão de "familiar, não idêntico"
- [X] T011 Criar shell/layout base em `src/app/layout.tsx` aplicando os tokens (responsivo, acessível — FR-012)
- [X] T012 [P] Criar componente genérico de bloco com estados de carregando/indisponível/stale em `src/app/components/data-block.tsx` (base de FR-009/FR-010 na UI)

**Checkpoint**: fundação pronta — US1 e US2 podem começar.

---

## Phase 3: User Story 1 — Vitais do servidor (Priority: P1) 🎯 MVP

**Goal**: total de jogadores online (auto-refresh) + lista de mundos com status na home.

**Independent Test**: abrir `/` e ver total online + mundos coerentes; o contador se atualiza sozinho; falha da fonte degrada o bloco sem quebrar a página.

### Tests for User Story 1 (escrever ANTES da implementação; devem falhar primeiro) ⚠️

- [X] T013 [P] [US1] Teste unitário `computeTotalOnline` (RG-1) esperando **14167** com a fixture em `tests/unit/domain/compute-total-online.test.ts`
- [X] T014 [P] [US1] Teste unitário `deriveWorldStatus` (RG-2: presente=online; `locked` ≠ offline) em `tests/unit/domain/derive-world-status.test.ts`
- [X] T015 [P] [US1] Teste unitário do world mapper (unix→Date; valores ausentes→0; tolerância a campos extras) em `tests/unit/mappers/world-mapper.test.ts`
- [X] T016 [P] [US1] Teste unitário da regra de staleness (RG-4) em `tests/unit/domain/staleness.test.ts`
- [X] T017 [P] [US1] E2E da home em `tests/e2e/home.spec.ts` com `page.route` interceptando `/api/server-snapshot`: (a) exibe total+mundos; (b) auto-refresh atualiza o contador; (c) fonte indisponível → bloco com estado claro + selo de "desatualizado", página intacta

### Implementation for User Story 1

- [X] T018 [P] [US1] Entidade `World` em `src/domain/entities/world.ts` (name, pvpType, pvpTypeLabel, worldType, locked, createdAt, playersOnline, status)
- [X] T019 [P] [US1] Entidade `ServerSnapshot` em `src/domain/entities/server-snapshot.ts` (worlds, totalOnline, fetchedAt, source)
- [X] T020 [P] [US1] Port `WorldsRepository` em `src/domain/ports/worlds-repository.ts`
- [X] T021 [US1] Serviço de domínio `computeTotalOnline` em `src/domain/services/compute-total-online.ts` (RG-1) — faz T013 passar
- [X] T022 [US1] Serviço `deriveWorldStatus` em `src/domain/services/derive-world-status.ts` (RG-2) — faz T014 passar
- [X] T023 [P] [US1] Serviço `sortWorlds` (RG-3, por playersOnline desc) em `src/domain/services/sort-worlds.ts`
- [X] T024 [US1] Serviço de staleness em `src/domain/services/staleness.ts` (RG-4) — faz T016 passar
- [X] T025 [US1] Mapper `worldMapper` em `src/infrastructure/rubinot/mappers/world-mapper.ts` — faz T015 passar
- [X] T026 [US1] `RubinotWorldsClient` (implementa `WorldsRepository`, consome `GET /api/worlds`) em `src/infrastructure/rubinot/rubinot-worlds-client.ts` (usa T009, T025)
- [X] T027 [US1] Caso de uso `GetServerSnapshot` em `src/application/use-cases/get-server-snapshot.ts` (compõe repo + serviços; anexa source/fetchedAt — FR-011)
- [X] T028 [US1] Route Handler BFF `GET /api/server-snapshot` em `src/app/api/server-snapshot/route.ts` (contrato internal-bff.md; degradação 503/stale — FR-009/010)
- [X] T029 [US1] Home (Server Component) em `src/app/page.tsx`: SSR do snapshot inicial + composição dos blocos
- [X] T030 [US1] Componente `OnlineCounter` (client) em `src/app/components/online-counter.tsx` (polling ~30s ao BFF; mantém último valor; selo "atualizado há X" — FR-002/003/010)
- [X] T031 [P] [US1] Componente `WorldsList` em `src/app/components/worlds-list.tsx` (lista ordenada, selo `locked`, status — FR-004)
- [X] T032 [US1] Ligar degradação graciosa por bloco na home usando `data-block` (FR-009) e verificar E2E T017 verde

**Checkpoint**: US1 funcional e testável isoladamente — **MVP entregável**.

---

## Phase 4: User Story 2 — Busca de personagem (Priority: P2)

**Goal**: buscar personagem e exibir dados principais (nível, vocação, mundo, guild, status).

**Independent Test**: buscar personagem existente → dados principais; inexistente → "não encontrado"; entrada inválida → orientação; fonte indisponível → mensagem, sem quebrar a home.

### Tests for User Story 2 (escrever ANTES da implementação) ⚠️

- [X] T033 [P] [US2] Teste unitário do character mapper (extrai só name/level/vocation/world/guild; guild null) em `tests/unit/mappers/character-mapper.test.ts`
- [X] T034 [P] [US2] Teste unitário `SearchCharacter`: validação de entrada (FR-008) e não-encontrado (RG-5) em `tests/unit/domain/search-character.test.ts`
- [X] T035 [P] [US2] Teste unitário de `NotConfiguredCharacterRepository` retornando "indisponível" (FR-009) em `tests/unit/infrastructure/not-configured-character.test.ts`
- [X] T036 [P] [US2] E2E de busca em `tests/e2e/character-search.spec.ts` (rede interceptada): encontrado, 404→não-encontrado, entrada inválida, indisponível

### Implementation for User Story 2

- [X] T037 [P] [US2] Entidade `Character` em `src/domain/entities/character.ts` (name, level, vocation, world, guild|null, status opcional/unknown — ver C2)
- [X] T038 [P] [US2] Port `CharacterRepository` em `src/domain/ports/character-repository.ts`
- [X] T039 [US2] Caso de uso `SearchCharacter` em `src/application/use-cases/search-character.ts` (valida entrada FR-008; mapeia 404→not found RG-5) — faz T034 passar
- [X] T040 [US2] `NotConfiguredCharacterRepository` em `src/infrastructure/rubinot/not-configured-character-repository.ts` (resposta "indisponível" enquanto C1 pendente) — faz T035 passar
- [X] T041 [US2] Mapper `characterMapper` em `src/infrastructure/rubinot/mappers/character-mapper.ts` (subconjunto MVP) — faz T033 passar
- [X] T042 [US2] ⚠️ BLOQUEADA POR C1 — `RubinotCharacterClient` (implementa `CharacterRepository`) em `src/infrastructure/rubinot/rubinot-character-client.ts`. Só implementar quando o endpoint de personagem (C1) e o status online (C2) forem confirmados em `docs/data-sources.md`. Até lá, a aplicação usa `NotConfiguredCharacterRepository`.
- [X] T043 [US2] Route Handler BFF `GET /api/character?name=` em `src/app/api/character/route.ts` (contrato internal-bff.md; 200 found/not-found, 400 inválido, 503 indisponível)
- [X] T044 [US2] Componente `CharacterSearch` (client) na home em `src/app/components/character-search.tsx` (validação FR-008, submit)
- [X] T045 [US2] Visão do personagem em `src/app/character/[name]/page.tsx` (dados principais; status omitido enquanto C2 pendente)
- [X] T046 [US2] ⚠️ DEPENDE DE PRINT — estilização fina da visão de personagem conforme referência visual correta. `docs/references/character-details.png` está incorreto (duplicata do GuildStats, confirmado por SHA-256). Aguardar print correto para finalizar layout; manter identidade visual própria (T010)

**Checkpoint**: US1 + US2 funcionam independentemente (US2 degrada graciosamente enquanto C1/C2 pendentes).

---

## Phase 5: Polish & Cross-Cutting (documentação e qualidade)

- [X] T047 [P] Criar/atualizar `README.md` (visão do produto, stack, como rodar, scripts de teste, estrutura de camadas, link para docs/data-sources.md) — Princípio VII
- [X] T048 [P] Criar `CLAUDE.md` na raiz (stack, comandos, arquitetura em camadas, convenções de código/seletores/testes, o que está no MVP vs. evoluções) para uso do Claude Code — Princípio VII
- [X] T049 [P] Atualizar o "Registro de decisões sobre dados" em `docs/data-sources.md` (D1/D2 confirmados; C1/C2 pendentes)
- [X] T050 Responsividade (desktop/mobile) na home — ✅ CSS responsivo + teste E2E em viewport 375px sem overflow (FR-012, SC-005). Acessibilidade fora de escopo por decisão do usuário.
- [X] T051 Validação da US1 — ✅ `test:unit` (11) + `test:e2e` verdes + build ok; SC-001/002/003/005 cobertos por testes. SC-004 (busca de personagem) fica para a US2. ⚠️ Validação de dados em PRODUÇÃO depende do allowlist do Rubinot (bloqueio Cloudflare — ver docs/data-sources.md).

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → sem dependências.
- **Foundational (Phase 2)** → depende do Setup; **bloqueia** US1 e US2.
- **US1 (Phase 3)** → depende da Foundational; entrega o MVP sozinha.
- **US2 (Phase 4)** → depende da Foundational; independente da US1 (integra o `data-block` e o layout base). T042/T046 bloqueadas por C1/C2 e pelo print correto.
- **Polish (Phase 5)** → depende das stories desejadas concluídas (T047/T048 podem começar em paralelo assim que a estrutura existir).

### Dentro de cada user story

- Testes escritos e falhando antes da implementação (Princípio IV).
- Domínio → mappers/infra → use case → BFF → UI.

## Parallel Opportunities

- Setup: T002, T003, T004, T006 em paralelo.
- Foundational: T008, T009, T010, T012 em paralelo (após T007).
- US1 testes: T013–T017 em paralelo. Entidades T018/T019/T020 em paralelo.
- US2 testes: T033–T036 em paralelo. Entidades T037/T038 em paralelo.
- Docs: T047/T048/T049 em paralelo.

## Implementation Strategy

1. **MVP primeiro**: Phase 1 → Phase 2 → **Phase 3 (US1)** → validar isoladamente → demo. Já é um produto útil (vitais do servidor).
2. **Incremento**: Phase 4 (US2) com degradação graciosa; implementar `RubinotCharacterClient` (T042) e finalizar UI (T046) quando C1/C2/print chegarem.
3. **Polish**: documentação (README + CLAUDE.md) e validação final.

## Bloqueios conhecidos (rastrear em docs/data-sources.md)

- **C1**: ✅ RESOLVIDO — endpoint `GET /api/characters/search?name={nome}` confirmado; `RubinotCharacterClient` implementado.
- **C2**: ⏳ pendente — a fonte não expõe status online/offline do personagem; `Character.status` fica `unknown` e o selo é omitido.
- **Print de personagem**: ✅ resolvido — `docs/character-details.json` usado como referência dos dados; UI com identidade visual própria.
- ⚠️ **Dados em produção**: dependem do allowlist do Rubinot (bloqueio Cloudflare — mesmo do `/api/worlds`). Ver docs/data-sources.md.
