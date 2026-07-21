# Implementation Plan: Evolução 1 — Rankings, Power Gamers, Bosses, Guilds, News

**Branch**: `003-evolution-1` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-evolution-1/spec.md`

## Summary

Ampliar a plataforma com Top Experiência, Power Gamers (ganho de XP por dia/semana/mês), bosses boostados,
guilds e News. Estratégia de entrega em duas ondas: **(1) Modo demonstração** — todas as páginas populadas
com **dados de exemplo rotulados** (incluindo gráficos), entregável **já** e sem banco de dados; **(2) Dados
reais** — quando o Rubinot liberar os endpoints (allowlist), os adapters mock são trocados por clients reais
atrás dos **mesmos ports**, e o Power Gamers real ganha um datastore + coletor agendado.

## Technical Context

**Language/Version**: TypeScript 5 / Next.js 15 (App Router), React 19 — continuidade do MVP.

**Primary Dependencies**: Next.js, React. Gráficos via **SVG inline próprio** (sparklines/barras) — sem lib pesada. Sem novas deps para o modo demonstração.

**Storage**: **Nenhum no modo demonstração** (dados de exemplo sintéticos, in-memory). Para Power Gamers **real**: Postgres serverless (Neon/Vercel Postgres) — **NEEDS CLARIFICATION** (escolha final), implementação gated no endpoint real.

**Testing**: Vitest (domínio: cálculo de delta de ganho, ordenação de ranking, geração/rotulagem de exemplo) + Playwright (E2E: páginas em modo demo populadas, rede interceptada).

**Target Platform**: Web (SSR + client), Vercel.

**Project Type**: Web app (continuação do monólito Next em camadas).

**Performance Goals**: páginas de ranking legíveis < 2.5s; gráficos leves (SVG). Coleta real (futuro) 1x/dia.

**Constraints**: cliente nunca chama o Rubinot direto (BFF); degradação graciosa por bloco; rastreabilidade de origem `oficial|derivado|exemplo` (FR-011); compatibilidade total com o MVP.

**Scale/Scope**: top 100 por ranking; ~18 mundos; 5 capacidades; volume baixo.

### Fontes de dados (docs/data-sources.md)

- **E1** ranking de exp, **E2** bosses, **D3** guilds, **D4** news → **NEEDS CLARIFICATION** (endpoints/formatos desconhecidos; mesmo bloqueio Cloudflare; allowlist cobre). Contratos internos do BFF definidos agora; contratos externos marcados como pendentes.
- **Power Gamers**: derivado de E1 + histórico (não é endpoint novo).
- **Streamers/Criadores** (S1/S2/S3): lista curada de patrocinados (config, não é API do Rubinot) + **Twitch Helix** (status ao vivo, credenciais próprias) + **YouTube Data API** opcional. **Fora** do bloqueio Cloudflare; **sem DB** (chamadas de API + lista curada). Onda 2 gated por env; demo usa mocks fictícios.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Avaliação | Status |
|---|---|---|
| I. Didática e Legibilidade | Componentes/serviços com nomes de negócio; gráficos SVG simples e comentados. | ✅ PASS |
| II. Domínio no Centro | Cada capacidade atrás de um port; mock e real são adapters da infra. | ✅ PASS |
| III. Regras Centralizadas | Cálculo de ganho (delta), ordenação e rotulagem de origem no domínio. | ✅ PASS |
| IV. Testes do Domínio | Vitest para delta/ordenções/geração de exemplo (sem rede). | ✅ PASS |
| V. Incremental e Compatível | Entrega em ondas; MVP intacto; troca mock→real sem reescrever UI. | ✅ PASS |
| VI. Simplicidade (YAGNI) | Modo demo **sem DB**; SVG sem lib de chart. DB só quando houver dado real. | ✅ PASS (ver Complexity) |
| VII. Documentação e Transparência | Origem `exemplo` rotulada; data-sources.md atualizado; README/CLAUDE na impl. | ✅ PASS |

**Resultado**: sem violações imediatas. A persistência futura é rastreada em Complexity Tracking (não é ativada agora).

## Project Structure

### Documentation (this feature)

```text
specs/003-evolution-1/
├── plan.md · research.md · data-model.md · quickstart.md
├── contracts/
│   ├── internal-bff.md         # DTOs BFF↔UI (com DataOrigin) — definidos agora
│   ├── mock-data.md            # shape dos dados de exemplo
│   └── rubinot-endpoints.md    # E1/E2/D3/D4 — pendentes (NEEDS CLARIFICATION)
└── tasks.md                    # (via /speckit-tasks)
```

### Source Code (repository root) — adições

```text
src/
├── domain/
│   ├── entities/      # RankingEntry, ExperienceGain, BoostedOfDay, Guild, NewsItem, DataOrigin
│   ├── services/      # computeExperienceGain (delta), sortRanking, buildDemoLabel
│   └── ports/         # RankingRepository, PowerGamersRepository, BossRepository, GuildsRepository, NewsRepository, SponsoredStreamersRepository
├── application/use-cases/   # GetTopExperience, GetPowerGamers, GetBoostedOfDay, GetGuilds, GetNews, GetSponsoredStreamers
├── infrastructure/
│   ├── mock/          # adapters MOCK (dados de exemplo rotulados) — onda 1
│   ├── rubinot/       # clients reais (onda 2, gated) + mappers
│   └── config/        # seleção mock vs real por env
└── app/
    ├── ranking/       # Top Experiência + Power Gamers (seletor de período)
    ├── bosses/ guilds/ news/ streamers/     # páginas
    ├── api/           # BFF: /api/ranking, /api/power-gamers, /api/bosses, /api/guilds, /api/news, /api/streamers
    └── components/    # Sparkline, RankingTable, StatTile, PeriodSelector, DemoBadge, StreamerCard

infrastructure/streamers/   # (Onda 2) TwitchHelixClient + lista curada; YouTube opcional
```

**Structure Decision**: reaproveita o padrão do MVP. A novidade é a pasta `infrastructure/mock/` com adapters
que implementam os mesmos ports dos clients reais; um seletor por env decide qual usar (FR-013/FR-015). Assim
o modo demonstração é entregue sem tocar em banco, e a troca para real é local à infra.

## Complexity Tracking

| Violação | Por que é necessária | Alternativa simples rejeitada porque |
|---|---|---|
| Datastore (Postgres) + coletor agendado (Vercel Cron) — futuro | Power Gamers **real** precisa de histórico para calcular ganho por período (delta entre snapshots); a fonte só expõe XP total atual. | Sem histórico é impossível calcular ganho. **Não ativado agora**: o modo demonstração usa deltas de exemplo (sem DB). A complexidade só entra quando houver endpoint real (pós-allowlist). |
