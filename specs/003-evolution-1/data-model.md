# Data Model — Evolução 1

Entidades do domínio (`src/domain`). Puras, independentes do formato da fonte (real ou mock).

## Tipos base

### DataOrigin

Rótulo de origem que acompanha cada conjunto exibido: `'oficial' | 'derivado' | 'exemplo'`.
Base da rastreabilidade (FR-011) e da distinção do modo demonstração.

## Entidades

### RankingEntry (Top Experiência)

| Campo | Tipo | Notas |
|---|---|---|
| `rank` | number | Posição (1..N). |
| `name` | string | Personagem. |
| `level` | number | Nível. |
| `experience` | number | Experiência total. |
| `world` | string | Mundo. |

### RankingSnapshot (histórico — Onda 2)

| Campo | Tipo | Notas |
|---|---|---|
| `takenAt` | Date | Momento do snapshot. |
| `entries` | RankingEntry[] | Estado do ranking naquele instante. |

### ExperienceGain (Power Gamers)

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | Personagem. |
| `world` | string | Mundo. |
| `period` | `'day' \| 'week' \| 'month'` | Janela do ganho. |
| `gained` | number (≥ 0) | Delta de XP no período (RG-E2). |
| `rank` | number | Posição no ranking de power gamers. |

### BoostedOfDay

| Campo | Tipo | Notas |
|---|---|---|
| `boss` | string | Boss do dia. |
| `creature` | string | Criatura do dia. |
| `date` | Date | Dia de referência. |

### Guild

| Campo | Tipo | Notas |
|---|---|---|
| `name` | string | Nome da guild. |
| `world` | string | Mundo. |
| `memberCount` | number | Nº de membros (se disponível). |
| `members` | string[] \| null | Lista (visão de detalhe; opcional). |

### NewsItem

| Campo | Tipo | Notas |
|---|---|---|
| `title` | string | Título. |
| `date` | Date | Data de publicação. |
| `url` | string | Link para o conteúdo completo na origem. |

## Regras de negócio

- **RG-E1 — Ordenação de ranking**: Top Experiência ordena por `experience` desc; empates por `name` asc. `rank` é derivado da ordem.
- **RG-E2 — Ganho de experiência**: `gained = max(0, after.experience - before.experience)`. Delta negativo (reset/rollback) ⇒ 0. Power Gamers ordena por `gained` desc.
- **RG-E3 — Histórico insuficiente**: se não há snapshot no início do período, o ganho do personagem é **indeterminado** (não 0 enganoso) e sinalizado como "coletando dados" (FR-006).
- **RG-E4 — Rotulagem de origem**: todo resultado carrega `DataOrigin`; no modo demonstração é sempre `'exemplo'` (FR-011/FR-013).
- **RG-E5 — Identidade do personagem**: continuidade do ganho depende de identificador estável (nome, na ausência de ID); mudança de nome é caso de borda.

## Envelope

Reutiliza o `DataEnvelope` do MVP (`source`, `fetchedAt`, `stale`) acrescido de `origin: DataOrigin`.
