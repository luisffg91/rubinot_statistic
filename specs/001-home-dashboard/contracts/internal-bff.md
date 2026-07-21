# Contrato — BFF interno (Route Handlers do Next)

Endpoints internos que a UI consome. O cliente **nunca** chama o Rubinot direto (Princípio II + FR-011).
Estes contratos são a fronteira estável entre a UI e a infraestrutura.

## GET /api/server-snapshot  (US1)

Usado no SSR inicial e no polling do total online (~30s).

### Response 200

```jsonc
{
  "totalOnline": 14167,                 // derivado (RG-1)
  "worlds": [
    {
      "name": "Auroria",
      "pvpTypeLabel": "Open PvP",
      "worldType": "yellow",
      "locked": false,
      "status": "online",               // derivado (RG-2)
      "playersOnline": 972,
      "createdAt": "2024-11-11T04:00:00.000Z"
    }
    // ...
  ],
  "fetchedAt": "2026-07-20T12:00:00.000Z", // FR-003 / FR-010
  "source": "rubinot:/api/worlds",         // FR-011
  "stale": false                           // true se a coleta falhou e devolve último conhecido
}
```

### Response 503 (fonte indisponível e sem valor anterior)

```jsonc
{ "error": "unavailable", "source": "rubinot:/api/worlds", "fetchedAt": "…" }
```

- A UI trata 503/`stale:true` por bloco, sem derrubar a página (FR-009).

## GET /api/character?name={nome}  (US2)

### Response 200 — encontrado

```jsonc
{
  "found": true,
  "character": {
    "name": "Minlek Tanker",
    "level": 1000,
    "vocation": "Elite Knight",
    "world": "Lunarian",
    "guild": null,
    "status": "unknown"          // até C2 ser resolvido (pode ser "online"|"offline"|"unknown")
  },
  "source": "rubinot:character",
  "fetchedAt": "…"
}
```

### Response 200 — não encontrado

```jsonc
{ "found": false }
```

### Response 400 — entrada inválida (FR-008)

```jsonc
{ "error": "invalid_name", "message": "Informe um nome de personagem válido." }
```

### Response 503 — fonte indisponível / não configurada (C1 pendente)

```jsonc
{ "error": "unavailable" }
```

## Regras transversais

- Toda resposta de dados carrega `source` e `fetchedAt` (FR-011).
- Erros da fonte externa **nunca** vazam stack/detalhe técnico para o cliente (FR-007, FR-009).
