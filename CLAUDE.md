# CLAUDE.md — Guia de desenvolvimento (Rubibot Statistics)

Orientações essenciais para evoluir este projeto com o Claude Code. Leia junto com
`.specify/memory/constitution.md` (princípios não-negociáveis) e `README.md`.

## O que é

Plataforma didática de dados/estatísticas do servidor **Rubinot** (Tibia), inspirada no GuildStats.
Objetivo educativo: código legível o suficiente para treinamento técnico.

## Stack e comandos

- **Next.js (App Router) + TypeScript**, repositório único.
- **Vitest** (unit, regras de domínio) · **Playwright** (E2E).

```bash
npm run dev          # servidor de desenvolvimento (localhost:3000)
npm run build        # build de produção
npm run test:unit    # Vitest — domínio (sem rede)
npm run test:e2e     # Playwright — E2E (rede interceptada)
npm run lint         # ESLint (next/core-web-vitals)
```

## Arquitetura em camadas (Princípio II — domínio no centro)

```text
src/
├── domain/            # PURO. Sem imports de next/react/fetch. Fonte das regras.
│   ├── entities/      # World, ServerSnapshot, (Character na US2)
│   ├── services/      # regras: computeTotalOnline (RG-1), deriveWorldStatus (RG-2),
│   │                  #         sortWorlds (RG-3), isStale (RG-4)
│   ├── ports/         # interfaces implementadas pela infra (WorldsRepository, ...)
│   └── shared/        # DataEnvelope (origem+timestamp), Result (ok/not-found/unavailable)
├── application/
│   └── use-cases/     # GetServerSnapshot (compõe port + regras)
├── infrastructure/
│   ├── http/          # http-client (timeout, no-store, erro tipado)
│   └── rubinot/       # RubinotWorldsClient + mappers/ (JSON externo → domínio)
└── app/               # Next.js: UI (React) + BFF
    ├── api/           # Route Handlers (BFF): /api/server-snapshot
    ├── components/    # ServerVitals (client, polling), DataBlock, OnlineCounter, WorldsList
    ├── _lib/          # DTOs da fronteira BFF↔UI + toSnapshotDto
    └── styles/        # tokens.css (identidade visual própria)
```

### Regras de ouro

1. **O domínio não conhece HTTP, Next nem React.** Toda integração externa entra por um *port* e é
   implementada na `infrastructure`.
2. **Regras de negócio no domínio, uma única vez** (Princípio III). Ex.: total online = `computeTotalOnline`,
   nunca somado na UI.
3. **O cliente nunca chama o Rubinot direto** — sempre via BFF (`/api/*`). Preserva rastreabilidade de
   origem (FR-011) e trata erro/staleness num só lugar.
4. **Todo dado exibido carrega `source` + `fetchedAt`** (FR-011) e degrada de forma graciosa por bloco
   (FR-009), sinalizando staleness (FR-010).

## Testes (Princípio IV — obrigatório para regras de domínio)

- Escreva o teste da regra **antes** da implementação. Testes de domínio **não** usam rede/DOM (Vitest node).
- Fixtures reais em `tests/fixtures/` (ex.: `worlds-response.json`). Invariância âncora: `computeTotalOnline`
  da fixture = **14167**.
- E2E: intercepte a rede (`page.route`). O `playwright.config.ts` sobe o dev server com
  `RUBINOT_WORLDS_URL` inalcançável, então o conteúdo é dirigido pelo BFF interceptado (determinístico,
  sem depender do Rubinot real).

## Convenções

- Código e identificadores em **inglês**; comentários/artefatos de produto em **PT-BR**.
- Nomes claros de negócio (Princípio I). Prefira código óbvio a código "esperto".
- Seletores de teste E2E: preferir `getByRole`/`getByText`; `data-testid` como apoio (`online-counter`,
  `worlds-list`).
- Sem banco de dados / cache persistente no MVP (Princípio VI — YAGNI).

## Escopo por fase

- **MVP (`specs/001-home-dashboard`)**: US1 (online + mundos) ✅ e US2 (busca de personagem) ✅ implementadas.
- **Evolução 1 (`specs/003-evolution-1`)**: Top Experiência, Power Gamers, Bosses, Guilds, News e
  Streamers/Criadores — implementadas em **modo demonstração** (dados de exemplo rotulados, sem DB). Cada
  capacidade tem um *port* + adapter `MockXRepository` em `src/infrastructure/mock/`; o seletor em
  `src/infrastructure/config/repositories.ts` troca para o client real (Onda 2) sem tocar na UI.
  Onda 2 (pós-allowlist): clients reais, persistência (Postgres) + Vercel Cron para Power Gamers, Twitch/YouTube.
- **Evolução 2**: hunt finder + **página de ferramentas** (`/ferramentas`): calculadoras client-side —
  treino de skill com varinha/exercise, simulador de roda de habilidade (Wheel of Destiny), divisão de loot,
  stamina, imbuements, blessings. Majoritariamente offline (fórmulas do jogo), independem do allowlist.
- Cada evolução é **especificada antes** de planejada/implementada (Princípio V). Não adicionar itens fora
  do escopo da fase atual.

## Pendências rastreadas (ver `docs/data-sources.md`)

- ⚠️ **Allowlist do Rubinot**: a API está atrás do Cloudflare e bloqueia fetch server-side (403). Os dados
  reais em produção dependem do Rubinot allowlistar o app (User-Agent `RubibotStatistics/1.0`). Cobre US1 e US2.
- **C2**: a fonte não expõe status online/offline do personagem → `Character.status = 'unknown'`.

## CI/CD e fluxo de branches

- **CI**: `.github/workflows/ci.yml` roda lint + `test:unit` + build + `test:e2e` em PRs e pushes para a main.
- **CD**: Vercel via integração Git (preview por PR, produção ao merge). Sem secrets no Actions.
- **Disciplina**: trabalho em **feature branches** → PR → **CI verde** → merge na main. Não commitar direto
  na main (exceto o bootstrap inicial, já feito). Ver `docs/ci-cd.md`.
- Antes de abrir PR, rode localmente: `npm run lint && npm run test:unit && npm run build && npm run test:e2e`.
- **Produção**: https://rubinot-statistic.vercel.app/ (Vercel, atualiza ao mergear na main).

## Convenções de commit e branch (OBRIGATÓRIO)

- **Commits seguem [Conventional Commits](https://www.conventionalcommits.org/)**: `<tipo>[escopo]: descrição`
  no imperativo. Tipos: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `style`, `build`, `ci`, `chore`, `revert`.
  Ex.: `feat(character): adiciona busca de personagem`.
- **Branches**: `<tipo>/<descrição-kebab>` (ou `<tipo>/<NNN>-<slug>` para features do Spec Kit).
  Ex.: `feat/003-character-search`, `docs/repo-organization`.
- Detalhes e exemplos em **`CONTRIBUTING.md`**.

## Fluxo Spec Kit

`/speckit-constitution` → `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` →
`/speckit-analyze` → `/speckit-implement`. Os artefatos de cada feature ficam em `specs/<feature>/`.
