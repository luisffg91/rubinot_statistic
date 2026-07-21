# Research — Evolução 1

## R1. Entrega em duas ondas (demo → real)

- **Decisão**: Onda 1 = **modo demonstração** (dados de exemplo rotulados, sem DB), entregável já; Onda 2 = **dados reais** quando os endpoints forem liberados (allowlist).
- **Rationale**: permite mostrar a página completa à staff do Rubinot agora (apoia a proposta) sem depender do allowlist e sem provisionar infraestrutura.
- **Alternativas**: esperar o allowlist para tudo — rejeitado (trava a demonstração, que é justamente o que ajuda a conseguir o allowlist).

## R2. Mock vs. real atrás do mesmo port

- **Decisão**: cada capacidade tem um port (ex.: `RankingRepository`). `infrastructure/mock/*` implementa dados de exemplo; `infrastructure/rubinot/*` implementará o real. Um seletor por env (`config/`) escolhe o adapter.
- **Rationale**: troca mock→real sem reescrever UI (FR-015); isola a decisão na infra (Princípio II).
- **Alternativas**: UI separada para demo — rejeitado (duplicação, viola FR-015).

## R3. Persistência do Power Gamers real (deferida)

- **Decisão**: para o **real**, guardar snapshots diários do ranking e calcular ganho por período como delta. Recomendação: **Postgres serverless (Neon ou Vercel Postgres)** + **Vercel Cron** para o snapshot. **NEEDS CLARIFICATION**: escolha final do provedor.
- **Rationale**: relacional facilita consultar snapshots por data e calcular deltas; Vercel Cron é nativo (sem infra extra).
- **NÃO ativado na Onda 1**: o demo gera deltas de exemplo em memória → zero DB agora (Princípio VI). Registrado em Complexity Tracking.
- **Alternativas**: KV/Redis (Upstash) — viável, mas consultas de delta por data são mais naturais em SQL.

## R4. Gráficos

- **Decisão**: **SVG inline próprio** (sparkline de evolução, barras) — componentes leves e self-contained.
- **Rationale**: sem dependência pesada (YAGNI/perf); combina com a identidade; legível em dark. Segue princípios de dataviz (paleta acessível, contraste). (Ao implementar, consultar a skill de dataviz para cor/rótulos.)
- **Alternativas**: Recharts/Chart.js — rejeitado por ora (peso desnecessário para sparklines simples).

## R5. Cálculo do ganho (domínio)

- **Decisão**: `computeExperienceGain(before, after)` = `after.xp - before.xp`; **delta negativo → 0** (reset/rollback do servidor não é "ganho"). Ordenação do ranking de power gamers por ganho desc. Puro e testável.
- **Rationale**: RG central do produto; consistência dos números (Princípio III).

## R6. Parâmetros

- **Decisão**: períodos dia (24h), semana (7d), mês (30d); top 100; snapshot diário (real). Ajustável.

## Incógnitas remanescentes

| ID | Item | Bloqueia | Responsável |
|----|------|----------|-------------|
| E1 | Endpoint/format do ranking de exp | Power Gamers real | Rubinot/allowlist |
| E2 | Endpoint dos bosses boostados | Bosses real | Rubinot/allowlist |
| D3 | Endpoint de guilds | Guilds real | Rubinot/allowlist |
| D4 | Endpoint/format das News | News real | Rubinot/allowlist |
| DB | Provedor de Postgres (Neon vs. Vercel) | Power Gamers real | Usuário (na Onda 2) |

Nenhuma delas bloqueia a **Onda 1 (demo)**.
