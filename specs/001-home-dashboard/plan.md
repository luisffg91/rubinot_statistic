# Implementation Plan: Home Dashboard — Rubibot Statistics (MVP)

**Branch**: `001-home-dashboard` | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-home-dashboard/spec.md`

## Summary

Página inicial do Rubibot Statistics com dois cortes de valor: **US1 (P1)** — vitais do servidor (total de
jogadores online com auto-refresh + lista de mundos e status), e **US2 (P2)** — busca de personagem com dados
principais. Abordagem técnica: aplicação **Next.js (App Router) em TypeScript**, repositório único, com
**arquitetura em camadas** (domínio → aplicação → infraestrutura → UI) onde o domínio é puro e testável, e as
integrações com o Rubinot ficam isoladas atrás de *ports* (interfaces). Sem banco de dados no MVP (YAGNI).

## Technical Context

**Language/Version**: TypeScript 5.x sobre Node.js 20+ (Next.js 15, React 19)

**Primary Dependencies**: Next.js (App Router), React. HTTP via `fetch` nativo. Sem ORM/DB.

**Storage**: N/A no MVP — dados buscados sob demanda no servidor; sem persistência nem cache persistente. "Último valor conhecido" para staleness vive no estado do cliente durante a sessão.

**Testing**: Vitest (unitário — regras de domínio e mappers, sem rede); Playwright (E2E — home e busca, com interceptação de rede para determinismo).

**Target Platform**: Web (renderização no servidor + interatividade no cliente); host Node / Vercel.

**Project Type**: Web application (full-stack, single project).

**Performance Goals**: vitais visíveis em < 5s ao abrir a home (SC-001); auto-refresh do total online a cada ~30s (ajustável). Sem rate limit na fonte (confirmado em docs/data-sources.md, Q4).

**Constraints**: degradação graciosa e independente por bloco (FR-009); indicação de dado desatualizado/stale (FR-010); rastreabilidade de origem oficial vs. derivado (FR-011); sem DB; domínio sem dependência de framework.

**Scale/Scope**: 1 home + 1 visão de personagem; 18 mundos (amostra), ~14k jogadores online (apenas contagem). Escala baixa; sem requisito de concorrência elevada.

### Fontes de dados (docs/data-sources.md)

- **D1/D2 — CONFIRMADO**: `GET https://rubinot.com.br/api/worlds` → `{ worlds: [{ name, pvpType, pvpTypeLabel, worldType, locked, creationDate (unix s), playersOnline }] }`. Total online = soma de `playersOnline`. Sem auth, sem rate limit.
- **D5 — PARCIAL**: endpoint de personagem por nome (URL exata a confirmar), JSON rico (exemplo em docs/character-details.json), 404 estável quando não existe. **NEEDS CLARIFICATION**: (a) caminho/método exatos do endpoint; (b) campo de status online/offline do personagem (ausente no exemplo, que é de personagem oculto).
- **Fora do MVP** (Evolução 1): D3 (guilds), D4 (News).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação | Status |
|---|---|---|
| I. Didática e Legibilidade | Camadas explícitas, nomes de negócio, sem "esperteza". Código serve de treino. | ✅ PASS |
| II. Domínio no Centro | `src/domain` puro (sem HTTP/Next/React); integrações atrás de *ports*; dependências apontam para dentro. | ✅ PASS |
| III. Regras Explícitas e Centralizadas | Cálculo do total online e derivação de status de mundo vivem no domínio, fonte única. | ✅ PASS |
| IV. Testes do Domínio (não-negociável) | Vitest cobre regras de domínio e mappers, sem rede (fixtures dos JSON de exemplo). | ✅ PASS |
| V. Evolução Incremental e Compatível | Fatia MVP (US1+US2); guilds/News fora; spec→plan seguido; sem quebrar nada (projeto novo). | ✅ PASS |
| VI. Simplicidade Deliberada (YAGNI) | Sem DB, sem cache persistente, `fetch` nativo, 1 app. | ✅ PASS |
| VII. Documentação Viva e Transparência | README + CLAUDE.md previstos; endpoints em data-sources.md; rastreabilidade de origem (FR-011). | ✅ PASS |

**Resultado**: nenhuma violação. Complexity Tracking vazio.

## Project Structure

### Documentation (this feature)

```text
specs/001-home-dashboard/
├── plan.md              # Este arquivo
├── research.md          # Phase 0 — decisões técnicas
├── data-model.md        # Phase 1 — entidades e regras
├── quickstart.md        # Phase 1 — como rodar e validar
├── contracts/           # Phase 1 — contratos externos e internos (BFF)
│   ├── rubinot-worlds.md
│   ├── rubinot-character.md
│   └── internal-bff.md
└── tasks.md             # (gerado por /speckit-tasks — ainda não)
```

### Source Code (repository root)

```text
src/
├── domain/                     # PURO — sem HTTP/Next/React
│   ├── entities/               # World, ServerSnapshot, Character
│   ├── services/               # computeTotalOnline, deriveWorldStatus
│   └── ports/                  # WorldsRepository, CharacterRepository (interfaces)
├── application/
│   └── use-cases/              # GetServerSnapshot, SearchCharacter
├── infrastructure/
│   └── rubinot/                # RubinotWorldsClient, RubinotCharacterClient (implementam ports)
│       └── mappers/            # JSON externo → entidades de domínio
└── app/                        # Next.js App Router (UI + BFF)
    ├── page.tsx                # Home (Server Component)
    ├── character/[name]/       # Visão do personagem
    ├── api/
    │   ├── server-snapshot/    # Route Handler (proxy do /api/worlds) p/ polling do cliente
    │   └── character/          # Route Handler p/ busca de personagem
    └── components/             # OnlineCounter (client), WorldsList, CharacterSearch, CharacterCard

tests/
├── unit/                       # Vitest — domain/ e mappers (fixtures: docs/*.json)
└── e2e/                        # Playwright — home + busca (rede interceptada)
```

**Structure Decision**: aplicação web full-stack Next.js em projeto único (Option 2 "web" do template,
implementada como monólito Next). As camadas de negócio ficam em `src/domain`, `src/application` e
`src/infrastructure` (independentes do Next), e `src/app` contém a UI e os *Route Handlers* que atuam como
BFF — o cliente nunca chama o Rubinot diretamente, o que preserva rastreabilidade de origem, evita CORS e
centraliza o tratamento de erro/staleness.

## Complexity Tracking

> Nenhuma violação da constituição a justificar. Seção intencionalmente vazia.
