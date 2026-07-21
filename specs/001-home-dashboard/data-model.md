# Data Model — Home Dashboard (MVP)

Entidades e regras do **domínio** (`src/domain`). São modelos de negócio puros, independentes do formato da
fonte externa — o mapeamento do JSON do Rubinot para estes tipos ocorre na infraestrutura
(`src/infrastructure/rubinot/mappers`).

## Entidades

### World (Mundo)

| Campo | Tipo | Origem | Notas |
|---|---|---|---|
| `name` | string | `worlds[].name` | Identificador exibível do mundo. |
| `pvpType` | string | `worlds[].pvpType` | ex.: `pvp`, `no-pvp`, `pvp-enforced`. |
| `pvpTypeLabel` | string | `worlds[].pvpTypeLabel` | Rótulo legível (ex.: "Open PvP"). |
| `worldType` | string | `worlds[].worldType` | ex.: `green`, `yellow`. |
| `locked` | boolean | `worlds[].locked` | Mundo travado p/ novos personagens (**≠ offline**). |
| `createdAt` | Date | `worlds[].creationDate` | Origem em **unix segundos**; converter no mapper. |
| `playersOnline` | number (≥ 0) | `worlds[].playersOnline` | Jogadores online no mundo. |
| `status` | `'online' \| 'offline'` | **derivado** | Ver regra RG-2. |

**Identidade**: `name` (único no feed).

### ServerSnapshot (Snapshot do servidor)

| Campo | Tipo | Origem | Notas |
|---|---|---|---|
| `worlds` | `World[]` | feed `/api/worlds` | Lista completa de mundos. |
| `totalOnline` | number (≥ 0) | **derivado** | Ver regra RG-1. |
| `fetchedAt` | Date | infraestrutura | Momento da coleta (FR-003, FR-010). |
| `source` | string | infraestrutura | ex.: `rubinot:/api/worlds` (FR-011). |

### Character (Personagem) — dados principais (US2)

| Campo | Tipo | Origem | Notas |
|---|---|---|---|
| `name` | string | `player.name` | Nome do personagem. |
| `level` | number | `player.level` | Nível. |
| `vocation` | string | `player.vocation` | ex.: "Elite Knight". |
| `world` | string | `player.world` | Mundo do personagem. |
| `guild` | string \| null | `player.guild` | Pode ser `null`. |
| `status` | `'online' \| 'offline'` \| **unknown** | `player.*` (⚠) | **NEEDS CLARIFICATION (C2)** — campo ausente no exemplo. Opcional até confirmar. |

**Identidade**: `name`. Escopo MVP = apenas os campos acima (sem deaths, otherCharacters, achievements etc.).

### SearchResult (resultado da busca) — value object

- `found: true` → `character: Character`.
- `found: false` → sem dados (dispara mensagem "não encontrado", FR-007).
- Falha de fonte → não é `found:false`; é erro de disponibilidade tratado pelo caso de uso (FR-009).

## Regras de negócio (domínio)

- **RG-1 — Total online**: `totalOnline = Σ world.playersOnline` para todos os mundos do snapshot. Puro e testável (fixture `docs/worlds-response.json` → esperado **14167**).
- **RG-2 — Status de mundo**: mundo presente no feed ⇒ `status = 'online'`. `locked` é atributo independente (selo), **não** implica offline. Se a fonte futuramente indicar offline/manutenção, a regra é o único ponto a alterar (ver research R4/C3).
- **RG-3 — Ordenação de mundos**: exibir mundos por `playersOnline` desc (mais movimentados primeiro) — decisão de apresentação, derivável no domínio/aplicação para manter a UI burra.
- **RG-4 — Staleness**: um snapshot é "possivelmente desatualizado" quando o último refresh bem-sucedido excede o intervalo de atualização esperado (FR-010). `fetchedAt` é a base do cálculo.
- **RG-5 — Personagem não encontrado**: 404 da fonte ⇒ `SearchResult{found:false}`; nunca erro técnico exposto (FR-007).

## Validações

- `playersOnline` e `totalOnline`: inteiros ≥ 0; valores ausentes/negativos no feed → tratados como 0 pelo mapper, com log (defensivo, já que a fonte é externa e não versionada).
- `creationDate`: número unix (segundos). Mapper valida e converte para `Date`; valor inválido → `createdAt` nulo (não quebra o card).
- Nome de personagem (entrada de busca): não-vazio após trim; caracteres permitidos conforme regra da fonte (FR-008). Rejeição orienta o formato, sem chamar a fonte.

## Notas de tipos da fonte (defensivo)

O JSON do Rubinot mistura tipos: `creationDate`/`created` são números, mas `lastlogin`/`deaths[].time` vêm
como **string**. Os mappers isolam essa inconsistência — o domínio só vê tipos limpos (`number`, `Date`).
