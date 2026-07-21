---
description: "Task list — Evolução 1 (Onda 1: modo demonstração)"
---

# Tasks: Evolução 1 — Onda 1 (Modo Demonstração)

**Input**: Design documents from `/specs/003-evolution-1/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Escopo desta rodada**: **Onda 1 (demo)** — todas as capacidades com **dados de exemplo rotulados** (`origin='exemplo'`) + gráficos. **Sem DB, sem cron.** (Onda 2 = dados reais, ver fim do arquivo.)

**Tests**: INCLUÍDOS (Princípio IV).

**Padrão por capacidade**: port (domínio) → adapter MOCK (infra) → caso de uso → Route Handler BFF → página + componentes. Seleção mock-vs-real por env (`infrastructure/config`).

## Format: `[ID] [P?] [Story?] Description`

---

## Phase 1: Setup (compartilhado da Evolução 1)

- [ ] T001 Definir `DataOrigin` (`'oficial'|'derivado'|'exemplo'`) e estender o envelope em `src/domain/shared/data-origin.ts`
- [ ] T002 [P] Seletor de modo de fonte (mock vs real) por env em `src/infrastructure/config/data-source-mode.ts` (default: mock)
- [ ] T003 [P] Gerador determinístico de dados de exemplo (nomes/mundos/valores fixos, sem aleatoriedade) em `src/infrastructure/mock/demo-data.ts`
- [ ] T004 [P] Componente `DemoBadge` (selo "dados de exemplo") em `src/app/components/demo-badge.tsx`
- [ ] T005 [P] Componentes de gráfico SVG próprios (`Sparkline`, `MiniBars`) em `src/app/components/charts/` (contraste/dark, sem lib)
- [ ] T006 Navegação: adicionar links (Ranking, Power Gamers, Bosses, Guilds, News, Streamers) ao header em `src/app/layout.tsx`, mantendo o MVP intacto

**Checkpoint**: base de demo pronta (origem, seletor, selo, gráficos, navegação).

---

## Phase 2: User Story 1 — Top Experiência (Priority: P1) 🎯

**Goal**: página de ranking por experiência (por mundo/global), populada com dados de exemplo.

**Independent Test**: abrir `/ranking`, ver top 100 ordenado por exp; alternar mundo muda a lista; selo "exemplo".

### Tests (US1)

- [ ] T007 [P] [US1] Teste unitário `sortRanking` (RG-E1: exp desc, empate por nome) em `tests/unit/domain/sort-ranking.test.ts`
- [ ] T008 [P] [US1] Teste unitário do gerador de ranking de exemplo (determinístico, 100 entradas, origin='exemplo') em `tests/unit/mock/ranking-mock.test.ts`
- [ ] T009 [P] [US1] E2E `/ranking` (rede interceptada): lista populada + filtro por mundo + selo "exemplo" em `tests/e2e/ranking.spec.ts`

### Implementation (US1)

- [ ] T010 [P] [US1] Entidade `RankingEntry` em `src/domain/entities/ranking-entry.ts`
- [ ] T011 [P] [US1] Port `RankingRepository` em `src/domain/ports/ranking-repository.ts`
- [ ] T012 [US1] Serviço `sortRanking` (RG-E1) em `src/domain/services/sort-ranking.ts`
- [ ] T013 [US1] `MockRankingRepository` (origin='exemplo') em `src/infrastructure/mock/mock-ranking-repository.ts`
- [ ] T014 [US1] Caso de uso `GetTopExperience` em `src/application/use-cases/get-top-experience.ts`
- [ ] T015 [US1] Route Handler `GET /api/ranking?world=` em `src/app/api/ranking/route.ts` (DTO com origin+fetchedAt)
- [ ] T016 [US1] Página `/ranking` em `src/app/ranking/page.tsx` + componentes `RankingTable`/filtro de mundo + `DemoBadge`

**Checkpoint**: US1 navegável em modo demo.

---

## Phase 3: User Story 2 — Power Gamers (Priority: P2)

**Goal**: ranking de ganho de XP por período (dia/semana/mês) com sparkline — deltas de exemplo, sem DB.

**Independent Test**: abrir Power Gamers, trocar período, ver ranking por ganho + sparkline; selo "exemplo".

### Tests (US2)

- [ ] T017 [P] [US2] Teste unitário `computeExperienceGain` (RG-E2: delta; negativos→0) em `tests/unit/domain/compute-experience-gain.test.ts`
- [ ] T018 [P] [US2] Teste unitário do gerador de power gamers de exemplo (por período, spark) em `tests/unit/mock/power-gamers-mock.test.ts`
- [ ] T019 [P] [US2] E2E Power Gamers (seletor de período dia/semana/mês) em `tests/e2e/power-gamers.spec.ts`

### Implementation (US2)

- [ ] T020 [P] [US2] Entidade `ExperienceGain` em `src/domain/entities/experience-gain.ts`
- [ ] T021 [P] [US2] Port `PowerGamersRepository` em `src/domain/ports/power-gamers-repository.ts`
- [ ] T022 [US2] Serviço `computeExperienceGain` (RG-E2) em `src/domain/services/compute-experience-gain.ts`
- [ ] T023 [US2] `MockPowerGamersRepository` (deltas + spark de exemplo) em `src/infrastructure/mock/mock-power-gamers-repository.ts`
- [ ] T024 [US2] Caso de uso `GetPowerGamers` (por período) em `src/application/use-cases/get-power-gamers.ts`
- [ ] T025 [US2] Route Handler `GET /api/power-gamers?period=` em `src/app/api/power-gamers/route.ts`
- [ ] T026 [US2] UI de Power Gamers (aba/página) com `PeriodSelector` + `Sparkline` em `src/app/ranking/` (ou `src/app/power-gamers/page.tsx`)

**Checkpoint**: US2 navegável em modo demo (deltas de exemplo).

---

## Phase 4: User Story 3 — Bosses boostados (Priority: P2)

**Independent Test**: ver boss + criatura do dia (exemplo) na home e/ou página.

- [ ] T027 [P] [US3] E2E bloco de bosses (exemplo) em `tests/e2e/bosses.spec.ts`
- [ ] T028 [P] [US3] Entidade `BoostedOfDay` em `src/domain/entities/boosted-of-day.ts`
- [ ] T029 [P] [US3] Port `BossRepository` em `src/domain/ports/boss-repository.ts`
- [ ] T030 [US3] `MockBossRepository` (origin='exemplo') em `src/infrastructure/mock/mock-boss-repository.ts`
- [ ] T031 [US3] Caso de uso `GetBoostedOfDay` em `src/application/use-cases/get-boosted-of-day.ts`
- [ ] T032 [US3] Route Handler `GET /api/bosses` em `src/app/api/bosses/route.ts`
- [ ] T033 [US3] Componente/bloco de bosses (home) + página `src/app/bosses/page.tsx`

---

## Phase 5: User Story 4 — Guilds (Priority: P3)

**Independent Test**: ver contagem/lista de guilds; abrir uma guild (exemplo).

- [ ] T034 [P] [US4] E2E guilds (lista + detalhe) em `tests/e2e/guilds.spec.ts`
- [ ] T035 [P] [US4] Entidade `Guild` em `src/domain/entities/guild.ts`
- [ ] T036 [P] [US4] Port `GuildsRepository` em `src/domain/ports/guilds-repository.ts`
- [ ] T037 [US4] `MockGuildsRepository` em `src/infrastructure/mock/mock-guilds-repository.ts`
- [ ] T038 [US4] Caso de uso `GetGuilds` (+ detalhe) em `src/application/use-cases/get-guilds.ts`
- [ ] T039 [US4] Route Handlers `GET /api/guilds` e `GET /api/guilds/[name]` em `src/app/api/guilds/`
- [ ] T040 [US4] Páginas `/guilds` (lista) e `/guilds/[name]` (detalhe) em `src/app/guilds/`

---

## Phase 6: User Story 5 — News (Priority: P3)

**Independent Test**: ver publicações recentes (exemplo) com título/data e link.

- [ ] T041 [P] [US5] E2E news em `tests/e2e/news.spec.ts`
- [ ] T042 [P] [US5] Entidade `NewsItem` em `src/domain/entities/news-item.ts`
- [ ] T043 [P] [US5] Port `NewsRepository` em `src/domain/ports/news-repository.ts`
- [ ] T044 [US5] `MockNewsRepository` em `src/infrastructure/mock/mock-news-repository.ts`
- [ ] T045 [US5] Caso de uso `GetNews` em `src/application/use-cases/get-news.ts`
- [ ] T046 [US5] Route Handler `GET /api/news` + página `src/app/news/page.tsx`

---

## Phase 7: User Story 6 — Streamers & Criadores (Priority: P3)

**Independent Test**: ver streamers "ao vivo" (exemplos fictícios) em destaque + canais de YouTube (exemplo).

- [ ] T047 [P] [US6] E2E streamers (ao vivo em destaque + canais) em `tests/e2e/streamers.spec.ts`
- [ ] T048 [P] [US6] Entidades `SponsoredStreamer` e `SponsoredChannel` em `src/domain/entities/sponsored.ts`
- [ ] T049 [P] [US6] Port `SponsoredStreamersRepository` em `src/domain/ports/sponsored-streamers-repository.ts`
- [ ] T050 [US6] `MockSponsoredStreamersRepository` (streamers/canais FICTÍCIOS rotulados) em `src/infrastructure/mock/mock-sponsored-streamers-repository.ts`
- [ ] T051 [US6] Serviço de ordenação (ao vivo primeiro) em `src/domain/services/sort-streamers.ts`
- [ ] T052 [US6] Caso de uso `GetSponsoredStreamers` em `src/application/use-cases/get-sponsored-streamers.ts`
- [ ] T053 [US6] Route Handler `GET /api/streamers` em `src/app/api/streamers/route.ts`
- [ ] T054 [US6] Página `/streamers` + `StreamerCard` em `src/app/streamers/`

---

## Phase 8: Polish & Cross-Cutting

- [ ] T055 [P] Atualizar `README.md` e `CLAUDE.md` com as páginas da Evolução 1 e o **modo demonstração** (Princípio VII)
- [ ] T056 Passada de responsividade (desktop/mobile) nas novas páginas + selo "exemplo" consistente
- [ ] T057 Rodar suíte completa (`test:unit` + `test:e2e` + build + lint) e validar o quickstart (SC-001..SC-008)

---

## Dependencies & Execution Order

- **Setup (Phase 1)** → base para todas as stories.
- **US1..US6 (Phases 2–7)** → independentes entre si após o Setup; ordem por prioridade (US1 primeiro).
- **Polish (Phase 8)** → após as stories desejadas.
- Dentro de cada story: testes → entidade/port → serviço → mock → use case → BFF → UI.

## Parallel Opportunities

- Setup: T002–T005 em paralelo.
- Em cada story, os `[P]` (entidade/port/testes) rodam em paralelo; use case → BFF → UI são sequenciais.
- Stories diferentes podem ser tocadas em paralelo por pessoas diferentes.

## Estratégia de entrega (incremental)

Entregar por PRs por story (ou grupos): Setup → US1 → US2 → (US3+US4+US5) → US6 → Polish. Cada PR fecha com CI verde.

## ONDA 2 (fora desta rodada — apenas citado)

- Clients reais do Rubinot (E1 ranking, E2 bosses, D3 guilds, D4 news) atrás dos mesmos ports.
- **Persistência** (Postgres) + **Vercel Cron** para snapshots diários → Power Gamers REAL.
- **Twitch Helix** (S2, status ao vivo) e **YouTube Data API** (S3) para streamers reais.
- Ativação por env; troca mock→real sem reescrever a UI (FR-015).
